"""Régénère les captures d'écran du README.

Prérequis (une seule fois) :
    pip install playwright
    playwright install chromium

Usage (depuis la racine du dépôt, avec Internet pour charger polices et icônes) :
    python scripts/screenshots.py            # écrit dans screenshots/
    python scripts/screenshots.py --offline  # sans ressources externes (rendu dégradé)
"""
import functools, http.server, pathlib, sys, threading
from playwright.sync_api import sync_playwright

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "screenshots"
OFFLINE = "--offline" in sys.argv
args = [a for a in sys.argv[1:] if not a.startswith("--")]
if args:
    OUT = pathlib.Path(args[0])
OUT.mkdir(parents=True, exist_ok=True)

# (fichier, page, viewport, sélecteur d'élément ou None, clic préalable ou None)
SHOTS = [
    ("home-desktop.png",     "index.html",   (1440, 780), None,            None),
    ("projects.png",         "propos.html",  (1440, 780), "section.section4", None),
    ("loisir-thumb.png",     "loisir.html",  (1280, 800), None,            None),
    ("contact-thumb.png",    "contact.html", (1280, 900), ".form",         None),
    ("mobile-home.png",      "index.html",   (390, 844),  None,            None),
    ("mobile-menu-open.png", "index.html",   (390, 844),  None,            ".menu-toggle"),
]

class Quiet(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *a): pass

handler = functools.partial(Quiet, directory=str(ROOT))
server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), handler)
threading.Thread(target=server.serve_forever, daemon=True).start()
base = f"http://127.0.0.1:{server.server_address[1]}"

with sync_playwright() as p:
    browser = p.chromium.launch()
    for name, page_file, (w, h), selector, click in SHOTS:
        page = browser.new_page(viewport={"width": w, "height": h})
        if OFFLINE:
            page.route("**/*", lambda r: r.continue_() if r.request.url.startswith(base) else r.abort())
        page.goto(f"{base}/{page_file}", wait_until="load")
        page.evaluate("document.fonts.ready")
        page.add_style_tag(content=".back-to-top{display:none!important}")
        if click:
            page.click(click)
            page.wait_for_timeout(600)
        target = OUT / name
        if selector:
            page.locator(selector).first.screenshot(path=str(target))
        else:
            page.screenshot(path=str(target))
        print("OK", target.name)
        page.close()
    browser.close()
server.shutdown()
