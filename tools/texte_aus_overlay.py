"""Übernimmt die Texte des Windows-Overlays (besucher_ticker.py) in texte.js.

Aufruf:  python tools/texte_aus_overlay.py ../besucher-ticker
Ersetzt in texte.js den Block zwischen OVERLAY-ANFANG und OVERLAY-ENDE. Übernommen werden nur
die Schlüssel, die die App braucht; sie bleiben Wort für Wort wie im Overlay.
"""
import importlib.util
import json
import pathlib
import re
import sys

SCHLUESSEL = [
    "titel", "lade", "heuteN", "gesamtN", "jeWerkzeug", "jeKachel", "artAuto", "artSeiten", "artKlicks",
    "setZaehlart", "startseite", "zeitHeute", "zeit7", "zeit30", "zeitGesamt", "zusAus", "zusLaender",
    "zusVerweise", "standard", "themeSPB", "themeSPE", "themeTMI", "mJetzt", "mZeitraum", "mEinstellungen",
    "mZugang", "setFreq", "setFreqHinweis", "setZeitraum", "setZusatz", "setBalken", "balkenAlle",
    "setNullen", "setDicht", "setZusatzZeilen", "setGroesse", "grKlein", "grNormal", "grGross",
    "grSehrGross", "setFarben", "schliessen", "abbrechen", "aktualisiert", "netzFehler", "ratePause",
    "tokenUngueltig", "unbekannt", "direkt",
]


def main() -> int:
    quelle = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "../besucher-ticker") / "besucher_ticker.py"
    spec = importlib.util.spec_from_file_location("besucher_ticker", quelle)
    modul = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(modul)
    texte = {code: {k: tab[k] for k in SCHLUESSEL if k in tab} for code, tab in modul.TEXTE.items()}
    fehlt = [(c, k) for c, t in texte.items() for k in SCHLUESSEL if k not in t]
    if fehlt:
        print("Fehlt im Overlay:", fehlt)
        return 1
    zeilen = ["  const OVERLAY = {"]
    for code, tab in texte.items():
        zeilen.append(f"    {code}: {json.dumps(tab, ensure_ascii=False)},")
    zeilen.append("  };")
    ziel = pathlib.Path(__file__).resolve().parent.parent / "texte.js"
    alt = ziel.read_text(encoding="utf-8")
    neu = re.sub(r"(/\* OVERLAY-ANFANG \*/\n).*?(\n  /\* OVERLAY-ENDE \*/)",
                 lambda m: m.group(1) + "\n".join(zeilen) + m.group(2), alt, flags=re.S)
    ziel.write_text(neu, encoding="utf-8", newline="\n")
    print(f"{len(texte)} Sprachen, je {len(SCHLUESSEL)} Texte aus {quelle.name} übernommen.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
