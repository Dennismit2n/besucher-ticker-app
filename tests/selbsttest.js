/*
 * Selbsttest der Rechenlogik, ohne Netz und ohne Fenster.
 * Übertragen aus selbsttest() in besucher_ticker.py 1.4.0, dazu die Fälle der App.
 * Start:  node tests/selbsttest.js
 */
'use strict';
process.env.TZ = 'UTC';            // 'heute' rechnet in der Zeitzone des Geräts; der Test in UTC
const BT = require('../logik.js');
const T = require('../texte.js');

const fehler = [];
let anzahl = 0;
function gleich(a, b) { return JSON.stringify(a) === JSON.stringify(b); }
function pruefe(name, ist, soll) {
  anzahl += 1;
  if (!gleich(ist, soll)) fehler.push(`${name}: ${JSON.stringify(ist)} statt ${JSON.stringify(soll)}`);
}
const paar = l => l.map(b => [b.label, b.count]);

(async function () {
  /* Pfad-Zuordnung */
  pruefe('pfad /', BT.pfadLabel('/'), 'Startseite');
  pruefe('pfad werkstatt', BT.pfadLabel('/werkstatt.html'), 'Werkstatt');
  pruefe('pfad wifi', BT.pfadLabel('/wifi-qr/'), 'wifi-qr');
  pruefe('pfad unterseite', BT.pfadLabel('/zaehlwerk/hilfe.html'), 'Zählwerk');
  pruefe('pfad unbekannt', BT.pfadLabel('/neues-tool/'), 'neues-tool');

  /* Seitenbesuche: Ereignisse dürfen NICHT als Werkzeug-Balken erscheinen. */
  const payload = { hits: [
    { path: '/wifi-qr/', count: 10, event: false },
    { path: '/wifi-qr/hilfe', count: 5, event: false },
    { path: 'werkstatt-wifi-open', count: 99, event: true },
    { path: '/bigday/', count: 7, event: false },
    { path: '/leer/', count: 0, event: false },
  ] };
  const balken = BT.auswertenHits(payload, 8);
  pruefe('balken anzahl', balken.length, 2);
  pruefe('balken erster', balken[0], { label: 'wifi-qr', count: 15 });
  pruefe('balken zweiter', balken[1], { label: 'bigday', count: 7 });

  const viele = { hits: Array.from({ length: 19 }, (_, k) => ({ path: `/t${k + 1}/`, count: k + 1, event: false })) };
  pruefe('balken grenze', BT.auswertenHits(viele, 3).map(b => b.count), [19, 18, 17]);
  pruefe('balken liste', BT.auswertenHits(payload.hits, 8), balken);

  pruefe('seiten ohne events', BT.besucherSeiten({ total: 50, total_events: 12 }), 38);
  pruefe('seiten alt', BT.besucherSeiten({ total: 50 }), 50);
  pruefe('seiten leer', BT.besucherSeiten({}), 0);

  /* Kachel-Klicks: Schlüssel aus dem Ereignispfad */
  pruefe('kachel gross', BT.kachelSchluessel('kachel-ram'), 'ram');
  pruefe('kachel mini', BT.kachelSchluessel('kachel-ram-anleitung'), 'ram');
  pruefe('kachel slash', BT.kachelSchluessel('/kachel-wifi-readme'), 'wifi');
  pruefe('kachel fremd', BT.kachelSchluessel('werkstatt-ram-news'), null);
  pruefe('kachel leer', BT.kachelSchluessel('kachel-'), null);
  pruefe('kachel seite', BT.kachelSchluessel('/kachel/'), null);

  const klicks = { hits: [
    { path: '/', count: 40, event: false, title: 'Werkstatt' },
    { path: 'kachel-ram', count: 9, event: true, title: 'Real_RAM_cooler' },
    { path: 'kachel-ram-anleitung', count: 3, event: true, title: 'Real_RAM_cooler' },
    { path: 'kachel-ram-news', count: 1, event: true, title: 'kachel-ram-news' },
    { path: 'kachel-wifi-readme', count: 4, event: true, title: 'WiFi QR Card' },
    { path: 'kachel-bigday', count: 2, event: true, title: '' },
    { path: 'kachel-leer', count: 0, event: true, title: 'Leer' },
    { path: 'werkstatt-ram-news', count: 77, event: true, title: 'x' },
    { path: 'kachel-seite', count: 5, event: false, title: 'keine Kachel' },
  ] };
  const [kb, ksum] = BT.auswertenKlicks(klicks, 8);
  pruefe('klicks balken', paar(kb), [['Real_RAM_cooler', 13], ['WiFi QR Card', 4], ['bigday', 2]]);
  pruefe('klicks summe', ksum, 19);
  const [kb1, ksum1] = BT.auswertenKlicks(klicks.hits, 1);
  pruefe('klicks grenze', [kb1.length, ksum1], [1, 19]);
  pruefe('klicks keine', BT.auswertenKlicks({ hits: [] }, 8), [[], 0]);
  const vorrang = [{ path: 'kachel-ram-news', count: 5, event: true, title: 'Alt' },
    { path: 'kachel-ram', count: 1, event: true, title: 'Real_RAM_cooler' }];
  pruefe('klicks titel', BT.auswertenKlicks(vorrang, 8)[0][0].label, 'Real_RAM_cooler');
  pruefe('hat klicks', BT.hatKachelKlicks(klicks), true);
  pruefe('hat keine', BT.hatKachelKlicks({ hits: [
    { path: 'kachel-ram', count: 0, event: true },
    { path: 'werkstatt-ram-news', count: 3, event: true },
    { path: 'kachel-x', count: 3, event: false }] }), false);

  /* Blättern: exclude_paths sammelt die IDs, Schluss bei more = false. */
  function falschesNetz(antworten) {
    const anfragen = [];
    const holen = async url => {
      anfragen.push(Object.fromEntries(new URL(url).searchParams));
      const a = antworten(anfragen.length, url);
      return { status: a.status || 200, ok: !a.status || a.status < 400, json: async () => a.body };
    };
    return { anfragen, holen };
  }
  const seiten = n => ({ body: n === 1 ? { hits: [{ path_id: 1 }, { path_id: 2 }], more: true }
    : n === 2 ? { hits: [{ path_id: 3 }], more: true } : { hits: [{ path_id: 4 }], more: false } });
  const ohneWarten = { abstand: 0, schlafe: async () => {} };
  const n1 = falschesNetz(seiten);
  const api1 = new BT.GoatCounterAPI('deinname', 't', { ...ohneWarten, holen: n1.holen });
  const alle = await api1.hitsAlle('a', 'b');
  pruefe('blaettern anzahl', alle.map(h => h.path_id), [1, 2, 3, 4]);
  pruefe('blaettern exclude', n1.anfragen.map(a => a.exclude_paths || null), [null, '1,2', '1,2,3']);
  const n2 = falschesNetz(seiten);
  const api2 = new BT.GoatCounterAPI('deinname', 't', { ...ohneWarten, holen: n2.holen });
  pruefe('blaettern grenze', (await api2.hitsAlle('a', 'b', 2)).length, 3);

  /* Ratenbremse: zwischen zwei Anfragen liegt mindestens API_ABSTAND, auch wenn zwei
     Teile der App gleichzeitig fragen. */
  let zeit = 0;
  const pausen = [];
  const n3 = falschesNetz(() => ({ body: {} }));
  const api3 = new BT.GoatCounterAPI('deinname', 't', {
    holen: n3.holen, uhr: () => zeit, schlafe: async s => { pausen.push(Math.round(s * 100) / 100); zeit += s; },
  });
  await Promise.all([api3.total('a', 'b'), api3.total('a', 'b'), api3.total('a', 'b')]);
  pruefe('abstand pausen', pausen, [0.55, 0.55]);
  pruefe('abstand mindestens 0,52', BT.API_ABSTAND >= 0.52, true);

  /* Statuscodes werden zu Fehlerarten */
  const art = async status => {
    const n = falschesNetz(() => ({ status, body: {} }));
    const api = new BT.GoatCounterAPI('deinname', 't', { ...ohneWarten, holen: n.holen });
    try { await api.total('a', 'b'); return 'ok'; } catch (e) { return e.constructor.name; }
  };
  pruefe('status 401', await art(401), 'ZugangFehler');
  pruefe('status 403', await art(403), 'ZugangFehler');
  pruefe('status 404', await art(404), 'NichtGefunden');
  pruefe('status 429', await art(429), 'RateLimit');
  pruefe('status 500', await art(500), 'NetzFehler');
  const apiWeg = new BT.GoatCounterAPI('deinname', 't', { ...ohneWarten, holen: async () => { throw new TypeError('Failed to fetch'); } });
  pruefe('kein netz', await apiWeg.total('a', 'b').then(() => 'ok', e => e.constructor.name), 'NetzFehler');
  const n4 = falschesNetz(() => ({ body: {} }));
  const api4 = new BT.GoatCounterAPI('https://deinname.goatcounter.com/', 'geheim', { ...ohneWarten, holen: n4.holen });
  let gesehen = null;
  api4.holen = async (url, opt) => { gesehen = [url, opt.headers.Authorization, opt.credentials]; return n4.holen(url); };
  await api4.total('2026-08-01T00:00:00Z', '2026-08-01T15:00:00Z');
  pruefe('anfrage url', gesehen, ['https://deinname.goatcounter.com/api/v0/stats/total?start=2026-08-01T00%3A00%3A00Z&end=2026-08-01T15%3A00%3A00Z', 'Bearer geheim', 'omit']);

  /* Ganze Durchläufe: eine API, die nach Zeitraum antwortet ('2020…' = seit Anbeginn). */
  class ZeitAPI {
    constructor(anbeginn, heute, kaputt) { this.anbeginn = anbeginn; this.heute = heute; this.kaputt = !!kaputt; this.abrufe = 0; }
    liste(start) {
      this.abrufe += 1;
      if (this.kaputt) throw new BT.NetzFehler('weg');
      return start === BT.ALLTIME_START ? this.anbeginn : this.heute;
    }
    async hitsAlle(start) { return [...this.liste(start)]; }
    async hits(start) { return { hits: this.liste(start) }; }
    async total(start) {
      const l = this.liste(start);
      return { total: l.reduce((s, h) => s + h.count, 0), total_events: l.filter(h => h.event).reduce((s, h) => s + h.count, 0) };
    }
    async seite() { return { stats: [] }; }
  }
  let uhr = 1000;
  const app = (api, zaehlart, zeitraum) => new BT.Ticker(api, { zaehlart: zaehlart || 'auto', zeitraum: zeitraum || 'heute', zusatz: 'aus', maxBalken: 8 }, { uhr: () => uhr });

  const alt = [{ path: '/', count: 50, event: false, title: '' },
    { path: 'kachel-ram', count: 4, event: true, title: 'Real_RAM_cooler' }];
  const neu = [{ path: 'kachel-ram-news', count: 2, event: true, title: 'Real_RAM_cooler' },
    { path: 'kachel-wifi', count: 1, event: true, title: 'WiFi QR Card' }];
  const a1 = app(new ZeitAPI([...alt, ...neu], neu));
  pruefe('auto kacheln', await a1.zaehlartWirksam('x'), 'klicks');
  const n = a1.api.abrufe;
  await a1.zaehlartWirksam('x');
  pruefe('auto zwischenspeicher', a1.api.abrufe, n);
  pruefe('auto ohne kacheln', await app(new ZeitAPI(alt.slice(0, 1), alt.slice(0, 1))).zaehlartWirksam('x'), 'seiten');
  pruefe('auto netzfehler', await app(new ZeitAPI([], [], true)).zaehlartWirksam('x'), 'seiten');
  uhr += BT.ALLTIME_CACHE_SECONDS + 1;              // Liste veraltet
  a1.api.kaputt = true;
  pruefe('auto merkt kacheln', await a1.zaehlartWirksam('x'), 'klicks');
  a1.zugangNeu();
  pruefe('zugang vergisst', [a1.alltimeHits, a1.autoKlicks, a1.zugangGen], [null, false, 1]);

  const jetzt = new Date(Date.UTC(2026, 7, 1, 14, 30));
  const a4 = app(new ZeitAPI([...alt, ...neu], neu), 'auto', 'gesamt');
  let r = await a4.einmal(jetzt);
  pruefe('durchlauf klicks ok', r.ok, true);
  let d = r.daten;
  pruefe('durchlauf klicks', [d.art, d.zeitraum, d.heute, d.zeitraumTotal, d.gesamt, d.balken.map(b => b.label)],
    ['klicks', 'gesamt', 3, 7, 7, ['Real_RAM_cooler', 'WiFi QR Card']]);
  d = (await app(new ZeitAPI([...alt, ...neu], neu), 'seiten', '7t').einmal(jetzt)).daten;
  pruefe('durchlauf seiten', [d.art, d.heute, d.gesamt, d.balken], ['seiten', 0, 50, []]);
  const a6 = app(new ZeitAPI([...alt, ...neu], neu.slice(1)), 'klicks');
  a6.nullen = true; a6.maxBalken = 0;
  d = (await a6.einmal(jetzt)).daten;
  pruefe('durchlauf nullen', [d.zeitraumTotal, d.gesamt, paar(d.balken)], [1, 7, [['WiFi QR Card', 1], ['Real_RAM_cooler', 0]]]);
  const a7 = app(new ZeitAPI([...alt, ...neu], alt.slice(0, 1)), 'seiten');
  a7.nullen = true; a7.maxBalken = 0;
  d = (await a7.einmal(jetzt)).daten;
  pruefe('durchlauf seiten alle', paar(d.balken), [['Startseite', 50]]);
  // Fehlerarten im Durchlauf
  pruefe('durchlauf netz', (await app(new ZeitAPI([], [], true), 'seiten').einmal(jetzt)).art, 'netz');
  const zu = app(new ZeitAPI([], []), 'seiten');
  zu.api.total = async () => { throw new BT.ZugangFehler('x'); };
  pruefe('durchlauf zugang', (await zu.einmal(jetzt)).art, 'zugang');
  const ra = app(new ZeitAPI([], []), 'seiten');
  ra.api.total = async () => { throw new BT.RateLimit(null); };
  pruefe('durchlauf rate', (await ra.einmal(jetzt)).art, 'rate');
  // Zusatzblock: 404 schadet dem Durchlauf nicht, ein leerer Name heißt bei Verweisen "(direkt)"
  const zs = app(new ZeitAPI(alt, alt), 'seiten');
  zs.zusatz = 'verweise';
  zs.api.seite = async () => ({ stats: [{ name: '', count: 3 }, { name: 'github.com', count: 5 }] });
  pruefe('durchlauf verweise', paar((await zs.einmal(jetzt)).daten.zusatz), [['github.com', 5], ['(direkt)', 3]]);
  zs.zusatz = 'laender';
  zs.api.seite = async () => { throw new BT.NichtGefunden('alt'); };
  r = await zs.einmal(jetzt);
  pruefe('durchlauf zusatz 404', [r.ok, r.daten.zusatz], [true, []]);
  // Zwei Durchläufe zugleich: der zweite kehrt sofort leer zurück
  const dp = app(new ZeitAPI(alt, alt), 'seiten');
  const [p1, p2] = await Promise.all([dp.einmal(jetzt), dp.einmal(jetzt)]);
  pruefe('kein doppelter lauf', [p1.daten !== null, p2.daten], [true, null]);

  /* 1.4.0: "alle" (0) schneidet nichts ab, Nullen aus der Liste seit Anbeginn. */
  pruefe('alle seiten', BT.auswertenHits(viele, 0).length, 19);
  pruefe('alle klicks', BT.auswertenKlicks(klicks, 0), BT.auswertenKlicks(klicks, 8));
  const nb = BT.auswertenHits({ hits: [{ path: '/wifi-qr/', count: 3, event: false }] }, 0,
    [{ path: '/', count: 5, event: false }, { path: '/bigday/', count: 1, event: false }, { path: 'kachel-ram', count: 9, event: true }]);
  pruefe('nullen seiten', paar(nb), [['wifi-qr', 3], ['bigday', 0], ['Startseite', 0]]);
  pruefe('nullen grenze', BT.auswertenHits({ hits: [] }, 2, viele).length, 2);
  const [kn, ks] = BT.auswertenKlicks([{ path: 'kachel-wifi', count: 2, event: true, title: 'WiFi QR Card' }], 0, klicks);
  pruefe('nullen klicks', paar(kn), [['WiFi QR Card', 2], ['bigday', 0], ['Leer', 0], ['Real_RAM_cooler', 0]]);
  pruefe('nullen summe', ks, 2);

  /* Zusatzliste */
  const stats = { stats: [{ name: 'Germany', count: 4 }, { name: '', count: 9 }, { name: 'France', count: 1 }] };
  pruefe('zusatz', paar(BT.auswertenStats(stats, 2)), [['(unbekannt)', 9], ['Germany', 4]]);
  pruefe('zusatz direkt', BT.auswertenStats(stats, 1, '(direkt)')[0].label, '(direkt)');

  /* Zeitfenster: 'heute' beginnt an Mitternacht des Geräts (hier UTC), 7 Tage davor. */
  const [s0, e0] = BT.zeitfenster('heute', jetzt);
  pruefe('heute start', s0, '2026-08-01T00:00:00Z');
  pruefe('heute ende', e0, '2026-08-01T15:00:00Z');
  pruefe('7t start', BT.zeitfenster('7t', jetzt)[0], '2026-07-25T00:00:00Z');
  pruefe('30t start', BT.zeitfenster('30t', jetzt)[0], '2026-07-02T00:00:00Z');
  pruefe('gesamt start', BT.zeitfenster('gesamt', jetzt)[0], BT.ALLTIME_START);

  /* Adress-Normalisierung */
  for (const eingabe of ['deinname', 'deinname.goatcounter.com', 'https://deinname.goatcounter.com/', 'http://deinname.goatcounter.com']) {
    pruefe(`site ${eingabe}`, BT.normalisiereSite(eingabe), 'https://deinname.goatcounter.com');
  }
  pruefe('site eigene domain', BT.normalisiereSite('stats.example.org'), 'https://stats.example.org');
  pruefe('site leer', BT.normalisiereSite('  '), '');

  pruefe('zahl de', BT.zahlKurz(1234567, 'de'), '1.234.567');
  pruefe('zahl en', BT.zahlKurz(1234567, 'en'), '1,234,567');
  pruefe('zahl fr', BT.zahlKurz(12345, 'fr'), '12 345');
  pruefe('zahl klein', BT.zahlKurz(999, 'de'), '999');
  pruefe('zahl null', BT.zahlKurz(0, 'de'), '0');

  /* Texte: jede Sprache kennt jeden Text, keine Gedankenstriche, Anzeige übersetzt. */
  const deKeys = Object.keys(T.texte('de'));
  for (const code of T.SPRACHEN) {
    const tab = T.texte(code);
    pruefe(`texte ${code}`, deKeys.filter(k => !(k in tab)), []);
    const strich = new RegExp('[' + String.fromCharCode(0x2013, 0x2014) + ']|\\s-\\s');   // Halbgeviert, Geviert, " - "
    const striche = Object.entries(tab).filter(([, v]) => strich.test(JSON.stringify(v))).map(([k]) => k);
    pruefe(`striche ${code}`, striche, []);
  }
  pruefe('anzeige direkt', T.anzeige('(direkt)', 'de'), '(direkt)');
  pruefe('anzeige start', T.anzeige('Startseite', 'en'), 'Home page');
  pruefe('takt standard', T.taktName(60, 'de'), '60 s (Standard)');
  pruefe('takt minuten', T.taktName(120, 'de'), '2 min');
  pruefe('balken name', [T.balkenName(0, 'de'), T.balkenName(8, 'de')], ['alle', '8']);

  if (fehler.length) {
    console.log('SELBSTTEST FEHLGESCHLAGEN:');
    for (const f of fehler) console.log('  -', f);
    process.exit(1);
  }
  console.log(`Selbsttest bestanden (${anzahl} Prüfungen).`);
})().catch(e => { console.error(e); process.exit(1); });
