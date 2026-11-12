// Beispielzahlen für Bildschirmfotos und die Darstellungsprüfung, keine echten Daten.
// Start: node tests/attrappe/erzeugen.js  (schreibt hits.json, total.json, toprefs.json, locations.json)
'use strict';
const fs = require('fs');
const path = require('path');
const KACHELN = [['spectroton', 'Spectroton', 41], ['wingetarium', 'Wingetarium', 33], ['ram', 'Real_RAM_cooler', 29],
  ['ticker', 'Besucher-Ticker', 22], ['prisma', 'Prismatical', 18], ['wifi', 'WiFi QR Card', 14], ['pocketsum', 'Pocketsum', 11],
  ['hourbridge', 'Hourbridge', 9], ['follower', 'Follower-Log', 6], ['rad', 'Dreh das Rad', 4], ['bigday', 'bigday', 2]];
const hits = [{ path_id: 1, path: '/', title: 'Werkstatt', event: false, count: 120 }];
KACHELN.forEach(([k, t, n], i) => {
  hits.push({ path_id: 10 + i, path: 'kachel-' + k, title: t, event: true, count: n });
  hits.push({ path_id: 40 + i, path: 'kachel-' + k + '-readme', title: t, event: true, count: Math.round(n / 4) });
});
const daten = {
  'hits.json': { hits, more: false },
  'total.json': { total: 400, total_events: 230 },
  'toprefs.json': { stats: [{ name: '', count: 60 }, { name: 'github.com', count: 31 }, { name: 'reddit.com', count: 12 }, { name: 'news.ycombinator.com', count: 5 }] },
  'locations.json': { stats: [{ name: 'Germany', count: 70 }, { name: 'Austria', count: 14 }, { name: 'United States', count: 11 }, { name: '', count: 3 }] },
};
for (const [datei, inhalt] of Object.entries(daten)) fs.writeFileSync(path.join(__dirname, datei), JSON.stringify(inhalt, null, 1) + '\n');
console.log('Attrappe geschrieben.');
