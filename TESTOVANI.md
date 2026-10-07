# Ověření dodané verze

Ověřeno 7. října 2026.

## Automatické testy logiky

7 testů prošlo, 0 selhalo. Spuštěno pomocí `node --test tests/core.test.js`. Kontrola syntaxe `app.js` také prošla.

## Testy v prohlížeči

Ověřeno v headless Chromium přes Playwright v čistém profilu, na místním HTTP serveru (localhost je pro service worker důvěryhodný origin).

- Mobilní zobrazení 390 × 844 bez vodorovného posunu; startovní sbírka 24 kartiček.
- Přidání, úprava, hledání, filtr a uchování kartičky po reloadu.
- Import z bloku ChatGPT včetně duplicity a hlášení chybného řádku.
- Kartičky, odkrytí, hodnocení; psaní CZ→IT s normalizací; výběr a Mix.
- Statistiky, stažení JSON zálohy, obnova, zachování prázdné sbírky bez automatického znovunaplnění.
- Smazání kartičky s potvrzením.
- Service worker: offline reload i nové otevření v podcestě /italiano-pwa/, offline procvičování a data.
- Bez zachycených JavaScript chyb; desktop 1280 × 900 bez vodorovného posunu.

Pro offline test byl testovací HTTP server skutečně zastaven. Pouhé přepnutí emulované sítě nebylo použito jako jediný důkaz, protože nezablokovalo připojení service workeru. Po zastavení serveru selhal požadavek na necachovaný soubor, zatímco aplikace se z cache načetla i v novém panelu a dovolila další odpověď.

## Vizuální kontrola

Prohlédnuty snímky mobilního rozhraní 390 × 844 a desktopu 1280 × 900. Hlavní kartička i tlačítko pro odkrytí jsou na běžném mobilním rozlišení dostupné na první obrazovce.

## Co ověřit po nasazení

- Skutečná instalace na fyzickém iPhonu, ikona a standalone režim v Safari.
- Skutečné GitHub Pages HTTPS nasazení ve vašem účtu. Relativní cesty byly ověřeny lokálně v podcestě `/italiano-pwa/`.
- Aktualizace z verze v1 na v2 po zavření všech klientů.
- Podle potřeby další prohlížeče, zoom a asistivní technologie; neproběhl úplný audit přístupnosti.

Doporučená závěrečná zkouška: přidej aplikaci na plochu, počkej na Připraveno offline, přidej vlastní slovo, zavři aplikaci, zapni režim Letadlo a znovu ji otevři. Pak vyzkoušej stažení a obnovu zálohy.

## Aktualizace v2 – kartička jako hlavní obrazovka

Ověřeno: výchozí nastavení je skryté v dialogu; velká kartička a hodnocení se vejdou na mobilní obrazovku 390 × 844; dialog Nastavení dovoluje změnit kategorii, režim a směr; zavření tlačítkem i Escape; spodní navigace na mobilu; bez vodorovného posunu na šířce 320 px a 1280 px; offline reload po zastavení serveru. Bez zachycených JavaScript chyb. Service worker verze v2.

## Aktualizace v3 – praktické texty

Odstraněny viditelný název, logo, slogany a motivační texty. Hlavičky a zpětná vazba používají věcné popisky. Názvem ikony a panelu jsou Kartičky. Beze změny datového formátu a úložiště.
