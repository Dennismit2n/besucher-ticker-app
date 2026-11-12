"""Erzeugt die App-Symbole aus demselben Bild wie das Tray-Symbol des Overlays:
schwarzer Grund, drei blaue Säulen, ein pinker Punkt.

Aufruf:  python tools/icons.py
Schreibt icon-192.png, icon-512.png, icon-maskable.png und favicon.svg in den Repo-Ordner.
"""
import pathlib

from PIL import Image, ImageDraw

ZIEL = pathlib.Path(__file__).resolve().parent.parent
SCHWARZ, BLAU, PINK = "#000000", "#2f6bff", "#ff2d95"
# Im Raster 64 x 64 wie favicon.svg: drei Säulen (x, oben) und der Punkt.
SAEULEN = [(11, 30), (27, 20), (43, 38)]
BREITE, UNTEN, PUNKT = 10, 53, (48, 15, 6.5)


def zeichne(groesse: int, rand: float = 0.0, rund: bool = True) -> Image.Image:
    """rand: Anteil der Kantenlänge, der frei bleibt (maskierbare Symbole brauchen eine Schutzzone)."""
    s = 4                                            # vierfach zeichnen, dann glatt verkleinern
    g = groesse * s
    bild = Image.new("RGBA", (g, g), (0, 0, 0, 0))
    d = ImageDraw.Draw(bild)
    if rund:
        d.rounded_rectangle([0, 0, g - 1, g - 1], radius=round(g * 14 / 64), fill=SCHWARZ)
    else:
        d.rectangle([0, 0, g - 1, g - 1], fill=SCHWARZ)
    innen = g * (1 - 2 * rand)
    k = innen / 64
    o = g * rand

    def p(v):
        return o + v * k

    for x, oben in SAEULEN:
        d.rounded_rectangle([p(x), p(oben), p(x + BREITE), p(UNTEN)], radius=1.5 * k, fill=BLAU)
    cx, cy, r = PUNKT
    d.ellipse([p(cx - r), p(cy - r), p(cx + r), p(cy + r)], fill=PINK)
    return bild.resize((groesse, groesse), Image.LANCZOS)


def main() -> None:
    zeichne(192).save(ZIEL / "icon-192.png", optimize=True)
    zeichne(512).save(ZIEL / "icon-512.png", optimize=True)
    zeichne(512, rand=0.1, rund=False).save(ZIEL / "icon-maskable.png", optimize=True)
    svg = ('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">'
           f'<rect width="64" height="64" rx="14" fill="{SCHWARZ}"/>'
           + "".join(f'<rect x="{x}" y="{o}" width="{BREITE}" height="{UNTEN - o}" rx="1.5" fill="{BLAU}"/>'
                     for x, o in SAEULEN)
           + f'<circle cx="{PUNKT[0]}" cy="{PUNKT[1]}" r="{PUNKT[2]}" fill="{PINK}"/></svg>\n')
    (ZIEL / "favicon.svg").write_text(svg, encoding="utf-8", newline="\n")
    print("Symbole geschrieben.")


if __name__ == "__main__":
    main()
