# Rozcestník — app.sachytynec.cz

## Přidání / úprava aplikace
Uprav pouze `apps.json`. Každá aplikace = jeden objekt:

```json
{ "name": "Název", "url": "https://neco.sachytynec.cz", "desc": "Krátký popis" }
```

Pořadí v souboru = pořadí dlaždic. HTML ani CSS se nedotýkáš.

## Zpětný odkaz z aplikací
Do každé aplikace vlož jediný řádek:

```html
<script src="https://app.sachytynec.cz/back.js" defer></script>
```

Vykreslí plovoucí odznak „♞ Rozcestník" vlevo dole. Na samotném
rozcestníku se skryje sám. Vzhled i cíl měníš v `back.js`.

Odznak se přizpůsobí stránce:

- krátká stránka (obsah do 90 % výšky okna) → celý nápis „♞ Rozcestník"
- vyšší nebo scrollovatelná stránka → jen ikonka ♞, ať nepřekáží obsahu
- najetí myší nebo zaměření klávesnicí → nápis se rozbalí
- scrollování → nápis se rozbalí a po 1,4 s se zase sbalí

Práh `TALL_RATIO` i prodlevu `OPEN_MS` přenastavíš nahoře v `back.js`.

## Nasazení na Cloudflare Pages
Běží automaticky. Repozitář `ccgeek3274/app-sachytynec` je napojený na Pages
projekt `app-sachytynec` přes nativní git integraci Cloudflare — žádný build,
žádná GitHub Action.

```
push do main → Cloudflare Pages → app.sachytynec.cz
```

Přidání aplikace = úprava `apps.json`, commit, push. Nic víc.

Push do jiné větve vytvoří preview deploy na vlastní URL, produkci se nedotkne.

Build command: žádný. Output directory: kořen (`/`).

## Lokální náhled
`apps.json` se načítá přes fetch, takže přes `file://` to neběží. Spusť malý server:

```bash
python3 -m http.server 8000
# → http://localhost:8000
```
