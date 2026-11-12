// Bildschirmfotos für die README und das Vorschaubild og.png, mit den Beispielzahlen aus
// tests/attrappe (keine echten Daten, kein echtes Token, keine Anfrage an GoatCounter).
//
//   node tools/bilder.cjs [basis-url]      Standard: http://localhost:8625/besucher-ticker-app/
//
// Braucht Playwright; wie in den anderen Werkstatt-Repos aus collective-calc geliehen.
'use strict';
const path = require('path');
const fs = require('fs');
const REPO = path.resolve(__dirname, '..');
// Playwright aus dem Nachbar-Repo collective-calc (liegt neben diesem Repo).
const { chromium } = require(path.join(REPO, '..', 'collective-calc', 'node_modules', 'playwright'));

const BASIS = process.argv[2] || 'http://localhost:8625/besucher-ticker-app/';
const ATTRAPPE = path.join(REPO, 'tests', 'attrappe');
const DOCS = path.join(REPO, 'docs');
fs.mkdirSync(DOCS, { recursive: true });

async function handy(browser, sprache, datei, einst) {
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, colorScheme: 'dark', locale: sprache, serviceWorkers: 'block', reducedMotion: 'reduce' });
  await ctx.route(/goatcounter\.com/, r => {
    const url = new URL(r.request().url());
    const p = path.join(ATTRAPPE, url.pathname.split('/').pop() + '.json');
    if (!fs.existsSync(p)) return r.fulfill({ status: 404, body: '' });
    // Die Beispielzahlen gelten für 7 Tage; heute ein Viertel, 30 Tage dreimal, gesamt neunmal so viel.
    const start = url.searchParams.get('start') || '';
    const tage = (Date.now() - Date.parse(start)) / 864e5;
    const f = start.startsWith('2020') ? 9 : tage < 1.5 ? 0.25 : tage < 10 ? 1 : 3;
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    for (const z of d.hits || d.stats || []) z.count = Math.round(z.count * f);
    for (const k of ['total', 'total_events']) if (k in d) d[k] = Math.round(d[k] * f);
    return r.fulfill({ status: 200, contentType: 'application/json', headers: { 'access-control-allow-origin': '*' }, body: JSON.stringify(d) });
  });
  const seite = await ctx.newPage();
  await seite.goto(BASIS);
  await seite.evaluate(([l, e]) => {
    localStorage.setItem('besucherticker.zugang', JSON.stringify({ site: 'https://deinname.goatcounter.com', token: 'attrappe' }));
    localStorage.setItem('besucherticker.einst', JSON.stringify(e));
    localStorage.setItem('besucherticker.lang', l);
    localStorage.removeItem('besucherticker.letzte');
  }, [sprache, einst]);
  await seite.reload();
  await seite.waitForFunction(() => /\d/.test(document.getElementById('status').textContent) && document.querySelectorAll('#balken li').length > 0);
  // Feste Uhrzeit im Status, damit die Bilder nicht bei jedem Lauf anders aussehen.
  await seite.evaluate(() => { const s = document.getElementById('status'); s.textContent = s.textContent.replace(/\d{1,2}:\d{2}(:\d{2})?(\s?[AP]M)?/, '21:42:07'); });
  await seite.screenshot({ path: path.join(DOCS, datei) });
  await ctx.close();
}

async function og(browser) {
  const bild = fs.readFileSync(path.join(DOCS, 'handy-en.png')).toString('base64');
  const symbol = fs.readFileSync(path.join(REPO, 'favicon.svg'), 'utf8');
  const ctx = await browser.newContext({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  const seite = await ctx.newPage();
  await seite.setContent(`<!doctype html><meta charset="utf-8"><style>
    body { margin: 0; width: 1200px; height: 630px; background: #0a0710; color: #ff8ac6; font-family: "Segoe UI", system-ui, sans-serif; overflow: hidden; position: relative; }
    .text { position: absolute; left: 72px; top: 88px; width: 640px; }
    .marke { display: flex; align-items: center; gap: 18px; }
    .marke svg { width: 72px; height: 72px; border-radius: 16px; }
    h1 { margin: 0; font-size: 58px; line-height: 1.05; color: #ff2d95; letter-spacing: .01em; }
    p { margin: 26px 0 0; font-size: 30px; line-height: 1.35; color: #ff8ac6; }
    .klein { margin-top: 34px; font-size: 22px; color: #b86592; }
    .telefon { position: absolute; right: 70px; top: 46px; width: 330px; height: 714px; border-radius: 34px; overflow: hidden; border: 2px solid #3a2433; box-shadow: -18px 22px 40px rgba(0,0,0,.8); }
    .telefon img { width: 100%; display: block; }
  </style>
  <div class="text">
    <div class="marke">${symbol}<h1>Besucher-Ticker</h1></div>
    <p>Your own GoatCounter numbers on your phone.<br>Deine GoatCounter-Zahlen am Handy.</p>
    <p class="klein">Page visits or tile clicks · today, 7 days, 30 days, all time · counts nothing itself · 14 languages</p>
  </div>
  <div class="telefon"><img src="data:image/png;base64,${bild}"></div>`);
  await seite.screenshot({ path: path.join(REPO, 'og.png') });
  await ctx.close();
}

(async () => {
  const browser = await chromium.launch();
  const einst = { maxBalken: 8, nullen: false, zeitraum: '7t', zusatz: 'verweise' };
  await handy(browser, 'de', 'handy-de.png', einst);
  await handy(browser, 'en', 'handy-en.png', einst);
  await og(browser);
  await browser.close();
  console.log('Bilder geschrieben: docs/handy-de.png, docs/handy-en.png, og.png');
})().catch(e => { console.error(e); process.exit(1); });
