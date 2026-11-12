/*
 * Besucher-Ticker App · Rechenlogik
 * ==================================
 * Übertragung der Rechen- und Abruflogik aus dem Windows-Overlay
 * (github.com/Dennismit2n/besucher-ticker, besucher_ticker.py 1.4.0) nach JavaScript.
 * Die Funktionen tragen dieselben Namen in camelCase: auswertenKlicks = auswerten_klicks usw.
 * Ohne Fenster und ohne DOM, damit tests/selbsttest.js sie mit Node prüfen kann.
 *
 * Zu den Zahlen, was hier was bedeutet (wie im Overlay):
 *   GoatCounter speichert Besucher je Pfad (`count` in /stats/hits). /stats/total liefert die
 *   Summe über alle Pfade (`total`) und davon den Anteil der Ereignisse (`total_events`).
 *   * Seitenbesuche: große Zahl = total - total_events, Balken = Seiten je Werkzeug.
 *   * Kachel-Klicks: nur Ereignisse, deren Pfad mit "kachel-" beginnt ("kachel-ram",
 *     "kachel-ram-anleitung"), je Werkzeug zusammengefasst, beschriftet mit dem Titel.
 *   * automatisch: Kachel-Klicks, sobald es auf der Seite je einen gab, sonst Seitenbesuche.
 *
 * Die App selbst zählt nichts und schickt nichts außer Leseanfragen an die eigene
 * GoatCounter-Seite.
 */
(function (wurzel, fabrik) {
  'use strict';
  const m = fabrik();
  if (typeof module === 'object' && module.exports) module.exports = m;
  else wurzel.BT = m;
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ------------------------------ Konstanten ------------------------------ */

  // GoatCounter erlaubt 4 Anfragen je Sekunde. Im Browser schickt jede Leseanfrage mit
  // Authorization-Kopf vorher eine OPTIONS-Anfrage (Preflight), und die zählt aufs selbe
  // Limit (am 12.11.2026 gemessen). Darum doppelt so viel Abstand wie im Overlay (0,26 s).
  const API_ABSTAND = 0.55;
  // Der Browser darf X-Rate-Limit-Reset und Retry-After nicht lesen (GoatCounter gibt die
  // Kopfzeilen nicht frei). Nach 429 gilt deshalb diese feste Pausenfolge.
  const RETRY_BACKOFF = [10, 30, 60];
  const RATE_LIMIT_BACKOFF = [30, 120, 300];

  const REFRESH_CHOICES = [15, 30, 60, 120, 300, 900, 3600];
  const DEFAULT_REFRESH = 60;

  // Schlüssel, Textschlüssel, Tage (null = alles)
  const ZEITRAEUME = [
    ['heute', 'zeitHeute', 0],
    ['7t', 'zeit7', 7],
    ['30t', 'zeit30', 30],
    ['gesamt', 'zeitGesamt', null],
  ];
  const ZUSATZ_CHOICES = [
    ['aus', 'zusAus', null],
    ['laender', 'zusLaender', 'locations'],
    ['verweise', 'zusVerweise', 'toprefs'],
  ];
  const ZAEHLARTEN = [['auto', 'artAuto'], ['seiten', 'artSeiten'], ['klicks', 'artKlicks']];
  const MAX_BALKEN_CHOICES = [3, 5, 8, 10, 12, 15, 20, 0];   // 0 = alle
  const ZUSATZ_ZEILEN_CHOICES = [3, 4, 5, 8, 10];
  const GROESSEN = [[90, 'grKlein'], [100, 'grNormal'], [120, 'grGross'], [140, 'grSehrGross']];

  // Weit genug vor dem ersten Seitenaufruf; GoatCounter kennt kein "seit Anbeginn".
  const ALLTIME_START = '2020-01-01T00:00:00Z';
  const ALLTIME_CACHE_SECONDS = 600;     // die Liste seit Anbeginn ändert sich träge
  const FRISCH_SEKUNDEN = 10;            // "frisch" = aus demselben Durchlauf

  const KACHEL_PRAEFIX = 'kachel-';
  // /stats/hits liefert höchstens 100 Pfade je Anfrage; weiter geblättert wird höchstens
  // so viele Seiten (2000 Pfade).
  const HITS_SEITEN_MAX = 20;

  const PFAD_NAMEN = {
    '/': 'Startseite',
    '/werkstatt.html': 'Werkstatt',
    '/wifi-qr': 'wifi-qr',
    '/shrinkling': 'shrinkling',
    '/bigday': 'bigday',
    '/dreh-das-rad': 'Dreh das Rad',
    '/collective-calc': 'Collective-Calc',
    '/zaehlwerk': 'Zählwerk',
    '/fontART-demo': 'fontART',
    '/fontart-demo': 'fontART',
  };

  /* ------------------------------ Fehlerarten ----------------------------- */

  class ZugangFehler extends Error {}          // 401/403: Token falsch oder ohne Leserecht
  class NichtGefunden extends Error {}         // 404: Seite oder Endpunkt gibt es nicht
  class NetzFehler extends Error {}            // kein Netz, Zeitüberschreitung, 5xx
  class RateLimit extends Error {              // 429
    constructor(warte) { super('Rate-Limit erreicht (429)'); this.warte = warte == null ? null : warte; }
  }
  // Entspricht (RequestException, ValueError, LookupError) im Overlay.
  function weichesProblem(e) {
    return e instanceof NetzFehler || e instanceof NichtGefunden || e instanceof SyntaxError;
  }

  /* ------------------------------ Zeit ------------------------------------ */

  function zweistellig(n) { return String(n).padStart(2, '0'); }

  /** GoatCounter will UTC, auf die volle Stunde abgerundet. */
  function utcStempel(d) {
    return `${d.getUTCFullYear()}-${zweistellig(d.getUTCMonth() + 1)}-${zweistellig(d.getUTCDate())}` +
      `T${zweistellig(d.getUTCHours())}:00:00Z`;
  }

  /** [start, ende] für einen Zeitraum-Schlüssel, in UTC. 'heute' meint den Tag in der
   *  Zeitzone des Geräts; die laufende Stunde wird mitgenommen. */
  function zeitfenster(schluessel, jetzt) {
    jetzt = jetzt ? new Date(jetzt) : new Date();
    const ende = new Date(jetzt.getTime() + 3600e3);
    const eintrag = ZEITRAEUME.find(z => z[0] === schluessel);
    const tage = eintrag ? eintrag[2] : 0;
    if (tage === null) return [ALLTIME_START, utcStempel(ende)];
    const start = new Date(jetzt);
    start.setHours(0, 0, 0, 0);
    start.setDate(start.getDate() - tage);
    return [utcStempel(start), utcStempel(ende)];
  }

  /* ------------------------------ Auswertung ------------------------------ */

  function zahl(v) {
    if (typeof v === 'boolean') return v ? 1 : 0;
    if (typeof v === 'number') return Number.isFinite(v) ? Math.trunc(v) : 0;
    if (typeof v === 'string' && /^\s*[+-]?\d+\s*$/.test(v)) return parseInt(v, 10);
    return 0;
  }

  /** Ordnet einen Pfad einem Werkzeug zu; Unterseiten landen beim Werkzeug. */
  function pfadLabel(pfad) {
    let p = String(pfad == null || pfad === '' ? '/' : pfad).trim();
    if (!p.startsWith('/')) p = '/' + p;
    if (Object.prototype.hasOwnProperty.call(PFAD_NAMEN, p)) return PFAD_NAMEN[p];
    const erster = '/' + p.replace(/^\/+/, '').split('/')[0];
    if (Object.prototype.hasOwnProperty.call(PFAD_NAMEN, erster)) return PFAD_NAMEN[erster];
    if (erster === '/' || erster === '') return PFAD_NAMEN['/'];
    return erster.replace(/^\/+/, '') || 'Startseite';
  }

  /** Nimmt die Antwort von /stats/hits oder schon die Liste daraus. */
  function hitliste(hits) {
    if (hits && !Array.isArray(hits) && typeof hits === 'object') hits = hits.hits;
    return (Array.isArray(hits) ? hits : []).filter(h => h && typeof h === 'object' && !Array.isArray(h));
  }

  function klein(s) { return String(s).toLowerCase(); }

  /** Sortiert nach Zahl, dann Name; maxBalken 0 heißt alle. */
  function kappen(reihen, maxBalken) {
    reihen.sort((a, b) => (b.count - a.count) || (klein(a.label) < klein(b.label) ? -1 : klein(a.label) > klein(b.label) ? 1 : 0));
    return maxBalken <= 0 ? reihen : reihen.slice(0, maxBalken);
  }

  /** Zählweise Seitenbesuche: Pfadliste zu Werkzeug-Balken zusammenfassen. Ereignisse
   *  fliegen raus. Mit `bekannt` (Liste seit Anbeginn) bekommt jedes Werkzeug einen Balken,
   *  auch mit 0 im gewählten Zeitraum. */
  function auswertenHits(hits, maxBalken, bekannt) {
    const summen = new Map();
    for (const hit of hitliste(hits)) {
      if (hit.event) continue;
      const label = pfadLabel(hit.path == null ? '/' : hit.path);
      summen.set(label, (summen.get(label) || 0) + zahl(hit.count));
    }
    const reihen = [...summen].filter(([, v]) => v > 0).map(([k, v]) => ({ label: k, count: v }));
    if (bekannt != null) {
      const da = new Set(reihen.map(r => r.label));
      for (const hit of hitliste(bekannt)) {
        const label = pfadLabel(hit.path == null ? '/' : hit.path);
        if (!hit.event && !da.has(label)) { da.add(label); reihen.push({ label, count: 0 }); }
      }
    }
    return kappen(reihen, maxBalken);
  }

  /** Zählweise Seitenbesuche: `total` zählt die Ereignisse mit, die gehören nicht dazu. */
  function besucherSeiten(total) {
    const t = total || {};
    return Math.max(0, zahl(t.total) - zahl(t.total_events));
  }

  /** 'kachel-ram' und 'kachel-ram-anleitung' -> 'ram', sonst null. */
  function kachelSchluessel(pfad) {
    const p = String(pfad || '').trim().replace(/^\/+/, '');
    if (!p.startsWith(KACHEL_PRAEFIX)) return null;
    return p.slice(KACHEL_PRAEFIX.length).split('-')[0] || null;
  }

  function istKachelKlick(hit) {
    return Boolean(hit.event) && kachelSchluessel(hit.path || '') !== null;
  }

  function hatKachelKlicks(hits) {
    return hitliste(hits).some(h => istKachelKlick(h) && zahl(h.count) > 0);
  }

  /** Trägt die Namen der Kacheln ein und liefert alle Schlüssel der Liste. Die große Kachel
   *  hat Vorrang; ein Titel, der nur der Pfad ist, taugt nicht als Name. */
  function kachelNamen(hits, namen) {
    const schluessel = new Set();
    for (const hit of hitliste(hits)) {
      if (!istKachelKlick(hit)) continue;
      const pfad = String(hit.path || '').trim().replace(/^\/+/, '');
      const key = kachelSchluessel(pfad);
      schluessel.add(key);
      const titel = String(hit.title || '').trim();
      if (titel && titel !== pfad && (!namen.has(key) || pfad === KACHEL_PRAEFIX + key)) namen.set(key, titel);
    }
    return schluessel;
  }

  /** Zählweise Kachel-Klicks: [Balken je Werkzeug, Summe aller Kacheln]. */
  function auswertenKlicks(hits, maxBalken, bekannt) {
    const summen = new Map();
    const namen = new Map();
    let alleKeys = new Set();
    if (bekannt != null) alleKeys = kachelNamen(bekannt, namen);
    kachelNamen(hits, namen);
    for (const hit of hitliste(hits)) {
      if (istKachelKlick(hit)) {
        const key = kachelSchluessel(hit.path || '');
        summen.set(key, (summen.get(key) || 0) + zahl(hit.count));
      }
    }
    const name = k => (namen.has(k) ? namen.get(k) : k);
    const reihen = [...summen].filter(([, v]) => v > 0).map(([k, v]) => ({ label: name(k), count: v }));
    const mitZahl = new Set([...summen].filter(([, v]) => v > 0).map(([k]) => k));
    for (const key of alleKeys) if (!mitZahl.has(key)) reihen.push({ label: name(key), count: 0 });
    let summe = 0;
    for (const v of summen.values()) summe += v;
    return [kappen(reihen, maxBalken), summe];
  }

  /** Länder- oder Verweisliste; ein leerer Name heißt bei Verweisen "(direkt)". */
  function auswertenStats(payload, maxZeilen, leerLabel) {
    if (maxZeilen == null) maxZeilen = 4;
    if (leerLabel == null) leerLabel = '(unbekannt)';
    const reihen = [];
    for (const s of (payload && payload.stats) || []) {
      if (!s || typeof s !== 'object') continue;
      const name = String(s.name || '').trim() || leerLabel;
      reihen.push({ label: name, count: zahl(s.count) });
    }
    reihen.sort((a, b) => b.count - a.count);
    return reihen.slice(0, maxZeilen);
  }

  /** 'deinname', 'deinname.goatcounter.com' oder die volle URL -> Basis-URL ohne / am Ende. */
  function normalisiereSite(eingabe) {
    let s = String(eingabe || '').trim();
    if (!s) return '';
    s = s.replace(/\/+$/, '');
    if (s.startsWith('http://')) s = 'https://' + s.slice(7);
    if (!s.startsWith('https://')) {
      if (!s.includes('.')) s = `${s}.goatcounter.com`;
      s = 'https://' + s;
    }
    return s;
  }

  const TRENNER = { en: ',', hi: ',', zh: ',', ja: ',', ko: ',', fr: ' ', ru: ' ', pl: ' ' };
  /** Tausendertrennung in der Schreibweise der Sprache. */
  function zahlKurz(n, sprache) {
    const s = String(Math.trunc(Math.abs(n) || 0)).replace(/\B(?=(\d{3})+(?!\d))/g, '|');
    return (n < 0 ? '-' : '') + s.split('|').join(TRENNER[sprache] || '.');
  }

  /* ------------------------------ Abruf ----------------------------------- */

  function schlafe(sek) { return new Promise(r => setTimeout(r, sek * 1000)); }
  function uhrSek() {
    return (typeof performance !== 'undefined' && performance.now ? performance.now() : Date.now()) / 1000;
  }

  class GoatCounterAPI {
    /** optionen: holen (fetch-Ersatz), abstand, uhr, schlafe: für Tests austauschbar. */
    constructor(site, token, optionen) {
      const o = optionen || {};
      this.holen = o.holen || ((...a) => fetch(...a));
      this.abstand = o.abstand == null ? API_ABSTAND : o.abstand;
      this.uhr = o.uhr || uhrSek;
      this.schlafe = o.schlafe || schlafe;
      this.letzteAnfrage = -Infinity;
      this.kette = Promise.resolve();
      this.setZugang(site, token);
    }

    setZugang(site, token) {
      this.site = normalisiereSite(site);
      this.token = String(token || '').trim();
    }

    /** Anfragen laufen immer nacheinander und mit Abstand, auch wenn zwei Teile der App
     *  gleichzeitig fragen. */
    get(pfad, params) {
      const lauf = this.kette.then(() => this._get(pfad, params));
      this.kette = lauf.catch(() => {});
      return lauf;
    }

    async _get(pfad, params) {
      const warten = this.abstand - (this.uhr() - this.letzteAnfrage);
      if (warten > 0) await this.schlafe(warten);
      this.letzteAnfrage = this.uhr();
      const q = new URLSearchParams();
      for (const [k, v] of Object.entries(params || {})) q.set(k, String(v));
      const url = `${this.site}/api/v0${pfad}` + (q.toString() ? '?' + q : '');
      let r;
      try {
        r = await this.holen(url, {
          method: 'GET',
          headers: { Authorization: `Bearer ${this.token}`, Accept: 'application/json' },
          cache: 'no-store',
          credentials: 'omit',
          referrerPolicy: 'no-referrer',
        });
      } catch (e) {
        throw new NetzFehler(String(e && e.message || e));
      }
      if (r.status === 401 || r.status === 403) throw new ZugangFehler('Token ungültig oder ohne Leserecht');
      if (r.status === 404) throw new NichtGefunden('Nicht gefunden: ' + pfad);
      if (r.status === 429) throw new RateLimit(null);
      if (!r.ok) throw new NetzFehler('HTTP ' + r.status);
      return r.json();
    }

    total(start, end) { return this.get('/stats/total', { start, end }); }
    hits(start, end, limit) { return this.get('/stats/hits', { start, end, limit: limit || 100 }); }

    /** Alle Pfade des Zeitraums, je Anfrage höchstens 100. Weitergeblättert wird, wie
     *  GoatCounter es vorsieht: die schon gelieferten path_id gehen als exclude_paths in die
     *  nächste Anfrage, bis `more` falsch ist. */
    async hitsAlle(start, end, maxSeiten) {
      if (maxSeiten == null) maxSeiten = HITS_SEITEN_MAX;
      const alle = [];
      const gesehen = [];
      for (let i = 0; i < maxSeiten; i++) {
        const params = { start, end, limit: 100 };
        if (gesehen.length) params.exclude_paths = gesehen.join(',');
        const antwort = (await this.get('/stats/hits', params)) || {};
        const neu = (antwort.hits || []).filter(h => h && typeof h === 'object');
        alle.push(...neu);
        const ids = neu.filter(h => h.path_id != null).map(h => String(h.path_id));
        if (!antwort.more || !ids.length) break;
        gesehen.push(...ids);
      }
      return alle;
    }

    seite(page, start, end, limit) { return this.get(`/stats/${page}`, { start, end, limit: limit || 10 }); }
  }

  /* ------------------------------ Durchlauf ------------------------------- */

  /** Hält die Einstellungen und das Gemerkte und holt mit `einmal()` einen Satz Zahlen.
   *  Entspricht dem Datenteil von TickerApp im Overlay. */
  class Ticker {
    constructor(api, einst, optionen) {
      const o = optionen || {};
      const e = einst || {};
      this.api = api;
      this.zaehlart = e.zaehlart || 'auto';
      this.zeitraum = e.zeitraum || 'heute';
      this.maxBalken = e.maxBalken == null ? 8 : e.maxBalken;
      this.nullen = Boolean(e.nullen);
      this.zusatz = e.zusatz || 'verweise';
      this.zusatzZeilen = e.zusatzZeilen || 4;
      this.uhr = o.uhr || uhrSek;
      this.alltimeWert = null; this.alltimeZeit = -Infinity;
      this.alltimeHits = null; this.alltimeHitsZeit = -Infinity;
      this.zugangGen = 0;
      this.autoKlicks = false;
      this.laeuft = false;
    }

    zusatzPage() {
      const z = ZUSATZ_CHOICES.find(c => c[0] === this.zusatz);
      return z ? z[2] : null;
    }

    /** Andere Seite oder anderes Token: alles Gemerkte gehört zur alten. */
    zugangNeu() {
      this.zugangGen += 1;
      this.alltimeWert = null;
      this.alltimeHits = null;
      this.autoKlicks = false;
    }

    /** Gesamtsumme der Seitenbesuche, höchstens alle 10 Minuten frisch. */
    async gesamtHolen(ende) {
      if (this.alltimeWert !== null && this.uhr() - this.alltimeZeit < ALLTIME_CACHE_SECONDS) return this.alltimeWert;
      const gen = this.zugangGen;
      let wert;
      try {
        wert = besucherSeiten(await this.api.total(ALLTIME_START, ende));
      } catch (e) {
        if (weichesProblem(e)) return this.alltimeWert;   // alter Wert ist besser als keiner
        throw e;
      }
      if (gen !== this.zugangGen) return wert;
      this.alltimeWert = wert;
      this.alltimeZeit = this.uhr();
      return wert;
    }

    /** Alle Pfade seit Anbeginn, höchstens alle 10 Minuten frisch geholt. frisch=true
     *  (Zeitraum "Gesamt") nimmt nur eine Liste aus demselben Durchlauf. */
    async alltimeHitsHolen(ende, frisch) {
      const alter = this.uhr() - this.alltimeHitsZeit;
      if (this.alltimeHits !== null && alter < (frisch ? FRISCH_SEKUNDEN : ALLTIME_CACHE_SECONDS)) return this.alltimeHits;
      const gen = this.zugangGen;
      let hits;
      try {
        hits = await this.api.hitsAlle(ALLTIME_START, ende);
      } catch (e) {
        if (!weichesProblem(e) || this.alltimeHits === null) throw e;
        return this.alltimeHits;
      }
      if (gen !== this.zugangGen) return hits;
      this.alltimeHits = hits;
      this.alltimeHitsZeit = this.uhr();
      return hits;
    }

    /** 'seiten' oder 'klicks'. Bei "automatisch": Kachel-Klicks, sobald die Seite je einen
     *  gemeldet hat. Das kippt nicht hin und her. */
    async zaehlartWirksam(ende) {
      if (this.zaehlart === 'seiten' || this.zaehlart === 'klicks') return this.zaehlart;
      try {
        if (hatKachelKlicks(await this.alltimeHitsHolen(ende))) this.autoKlicks = true;
      } catch (e) {
        if (!weichesProblem(e)) throw e;
      }
      return this.autoKlicks ? 'klicks' : 'seiten';
    }

    /** Ein Durchlauf. Liefert {ok: true, daten} oder {ok: false, art: 'zugang'|'rate'|'netz'|
     *  'fehlt', fehler}. Läuft schon einer, kommt {ok: true, daten: null}. */
    async einmal(jetzt) {
      if (this.laeuft) return { ok: true, daten: null };
      this.laeuft = true;
      try {
        const zeitraum = this.zeitraum;      // einmal lesen: die Oberfläche darf sie
        const maxBalken = this.maxBalken;    // währenddessen ändern
        const nullen = this.nullen;
        const zeilen = this.zusatzZeilen;
        const page = this.zusatzPage();
        const [heuteStart, heuteEnde] = zeitfenster('heute', jetzt);
        const [zrStart, zrEnde] = zeitfenster(zeitraum, jetzt);
        const art = await this.zaehlartWirksam(heuteEnde);
        let heuteTotal, zeitraumTotal, balken, gesamt;

        if (art === 'klicks') {
          const heuteHits = await this.api.hitsAlle(heuteStart, heuteEnde);
          heuteTotal = auswertenKlicks(heuteHits, 1)[1];
          let zrHits;
          if (zeitraum === 'heute') zrHits = heuteHits;
          else if (zeitraum === 'gesamt') zrHits = await this.alltimeHitsHolen(heuteEnde, true);
          else zrHits = await this.api.hitsAlle(zrStart, zrEnde);
          // Die Liste seit Anbeginn kennt jede Kachel, die je geklickt wurde: daraus die Nullen.
          const alleHits = await this.alltimeHitsHolen(heuteEnde);
          [balken, zeitraumTotal] = auswertenKlicks(zrHits, maxBalken, nullen ? alleHits : null);
          gesamt = auswertenKlicks(alleHits, 1)[1];
        } else {
          heuteTotal = besucherSeiten(await this.api.total(heuteStart, heuteEnde));
          zeitraumTotal = zeitraum === 'heute' ? heuteTotal : besucherSeiten(await this.api.total(zrStart, zrEnde));
          // Bei "alle" reicht die erste Seite mit 100 Pfaden nicht.
          const zrListe = maxBalken <= 0 ? await this.api.hitsAlle(zrStart, zrEnde) : await this.api.hits(zrStart, zrEnde, 100);
          let bekannt = null;
          if (nullen) {
            try { bekannt = await this.alltimeHitsHolen(heuteEnde); } catch (e) { if (!weichesProblem(e)) throw e; bekannt = null; }
          }
          balken = auswertenHits(zrListe, maxBalken, bekannt);
          gesamt = await this.gesamtHolen(heuteEnde);
        }

        let zusatz = [];
        if (page) {
          try {
            zusatz = auswertenStats(await this.api.seite(page, zrStart, zrEnde, Math.max(10, zeilen)), zeilen,
              page === 'toprefs' ? '(direkt)' : '(unbekannt)');
          } catch (e) {
            // Ältere GoatCounter-Fassungen kennen die Seite nicht: kein Grund zum Scheitern.
            if (!(e instanceof NichtGefunden)) throw e;
            zusatz = [];
          }
        }
        return { ok: true, daten: { art, zeitraum, heute: heuteTotal, zeitraumTotal, balken, zusatz, zusatzArt: page, gesamt } };
      } catch (e) {
        if (e instanceof ZugangFehler) return { ok: false, art: 'zugang', fehler: e };
        if (e instanceof RateLimit) return { ok: false, art: 'rate', fehler: e };
        if (e instanceof NichtGefunden) return { ok: false, art: 'fehlt', fehler: e };
        if (weichesProblem(e)) return { ok: false, art: 'netz', fehler: e };
        return { ok: false, art: 'netz', fehler: e };
      } finally {
        this.laeuft = false;
      }
    }
  }

  return {
    API_ABSTAND, RETRY_BACKOFF, RATE_LIMIT_BACKOFF, REFRESH_CHOICES, DEFAULT_REFRESH, ZEITRAEUME, ZUSATZ_CHOICES,
    ZAEHLARTEN, MAX_BALKEN_CHOICES, ZUSATZ_ZEILEN_CHOICES, GROESSEN, ALLTIME_START, ALLTIME_CACHE_SECONDS,
    FRISCH_SEKUNDEN, KACHEL_PRAEFIX, HITS_SEITEN_MAX, PFAD_NAMEN,
    ZugangFehler, NichtGefunden, NetzFehler, RateLimit,
    utcStempel, zeitfenster, zahl, pfadLabel, hitliste, kappen, auswertenHits, besucherSeiten, kachelSchluessel,
    istKachelKlick, hatKachelKlicks, auswertenKlicks, auswertenStats, normalisiereSite, zahlKurz,
    GoatCounterAPI, Ticker,
  };
});
