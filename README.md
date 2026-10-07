# Kartičky – italština

Hotová česká aplikace pro učení italštiny. Mobile-first, bez účtu, bez serverové databáze, bez externích knihoven, fontů nebo CDN. 24 startovních A0 slov a frází. Běží jako statický web a instalovatelná PWA.

## Nasazení na GitHub Pages (bez programování)

1. Rozbal `italiano-pwa.zip` do počítače.
2. Přihlas se na GitHub a vytvoř nový **veřejný** repozitář, například `italiano`. Bezplatný GitHub Pages můžeš použít s veřejným repozitářem.
3. V repozitáři zvol **Add file → Upload files**. Nahraj **obsah složky `italiano-pwa`**, včetně složky `icons`. Soubor `index.html` musí být přímo v kořeni repozitáře, ne ve vnořené složce `italiano-pwa`. Složka `tests` a `package.json` jsou volitelné pro nasazení. Pokud nahrávací dialog skryje `.nojekyll`, můžeš ho vytvořit přes **Add file → Create new file**, název `.nojekyll`, bez obsahu.
4. Potvrď nahrání pomocí **Commit changes** do větve `main`.
5. Otevři **Settings → Pages**. V části **Build and deployment** vyber **Source: Deploy from a branch**. Jako větev vyber `main` a složku **/ (root)**. Klikni **Save**.
6. Počkej na dokončení nasazení. Stav najdeš v **Actions**, výsledný odkaz v **Settings → Pages**. Obvyklá adresa je `https://TVUJ-UCET.github.io/italiano/` (použij přesný odkaz z GitHubu).
7. Otevři odkaz, ověř startovní slova a počkej, až v záhlaví uvidíš **Připraveno offline**.

Při nahrávání přes Git můžeš do kořene repozitáře zkopírovat celou složku včetně skrytého souboru `.nojekyll`, commitnout a pushnout. Není potřeba sestavení ani GitHub Actions konfigurace. Všechny odkazy, manifest i service worker používají relativní cesty, takže fungují na doméně i v cestě `/nazev-repozitare/`.

Oficiální návod: [GitHub Pages – nastavení zdroje](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Přidání na plochu iPhonu

1. Otevři nasazenou HTTPS adresu **v Safari**.
2. Klepni na **Sdílet** a zvol **Přidat na plochu**. Pokud volba není vidět, uprav dostupné akce v nabídce Sdílet.
3. Pokud je dostupný přepínač **Otevřít jako webovou aplikaci / Open as Web App**, zapni ho. Potvrď **Přidat**.
4. Otevři ikonu **Kartičky** z plochy s internetem a počkej na **Připraveno offline**.
5. Vyzkoušej režim Letadlo: zavři a znovu spusť aplikaci. Kartičky, import i procvičování fungují offline.

Oficiální postup: [Apple – web jako aplikace na iPhonu](https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios).

## Používání

- **Moje kartičky:** přidávání, úpravy a mazání s potvrzením; hledání a filtrování kategorií. Úprava textu resetuje hodnocení kartičky, historické odpovědi zůstávají.
- **Hromadný import:** vlož text a klikni Importovat. Platné řádky se importují i při chybách v jiných řádcích. Chybné řádky jsou označené číslem; po opravě můžeš import zopakovat. Duplicity se přeskočí podle dvojice IT/CZ (bez ohledu na velikost písmen a nadbytečné mezery). Kategorie existujícího duplikátu se nemění.
- **Telefon:** po otevření uvidíš rovnou velkou kartičku. Kategorie, směr a režim jsou v tlačítku **Nastavení** nahoře. Spodní navigace vede ke sbírce a přehledu. Na plochu stačí přidat web ze Safari; není třeba nic stahovat z App Storu.
- **Procvičovat:** kartičky s odkrytím, psaní, výběr ze až čtyř unikátních překladů, Mix. Výběr bere rušivé možnosti z celé sbírky; s jediným unikátním překladem použije kartičku. Mix náhodně střídá tři režimy.
- **Směr:** italština → čeština nebo čeština → italština.
- **Psaní:** ignoruje velikost písmen, okrajové mezery, opakované vnitřní mezery a rozdílný Unicode zápis stejného znaku. Rozdíl jednoho znaku u odpovědí od čtyř znaků (dvou u odpovědí od devíti znaků) se zobrazí jako „Skoro“. U kratších slov je kontrola přísnější. „Skoro“ se nepočítá do plně správných odpovědí. Diakritika a interpunkce se zachovávají; aplikace neposuzuje synonyma. Uvidíš svou chybnou odpověď i správný překlad.
- **Hodnocení:** po odpovědi vyber Nevím / Těžké / Umím. Výběr má relativní váhy 7 / 4 / 1; nové kartičky váhu 3. Předchozí kartička se neopakuje bezprostředně, pokud existuje jiná. Jde o průběžné vážené opakování, nikoli kalendářní SRS. Hodnocení je společné pro oba směry. Série pokračuje, dokud nepřestaneš; její počítadlo se po obnovení stránky resetuje.
- **Přehled:** počet kartiček, poslední hodnocení, odpovědi celkem, dnešní odpovědi podle místního dne a úspěšnost ověřených odpovědí. Samohodnocení kartiček se do úspěšnosti nepočítá.

### Blok připravený k importu

```text
vorrei questo | chtěl/a bych toto | nakupování
quanto costa? | kolik to stojí? | nakupování
posso pagare con la carta? | mohu zaplatit kartou? | nakupování
ho bisogno di aiuto | potřebuji pomoc | cestování
```

ChatGPT můžeš napsat: „Připrav 20 italských A0 slov a frází na téma restaurace, ve formátu italština | čeština | kategorie, jeden řádek na kartičku, bez tabulky a bez číslování.“ Prázdné řádky a značky kódového bloku se ignorují. Oddělovač `|` není možné použít uvnitř textu. Maxima: 300 znaků na slovo/překlad, 60 na kategorii.

## Data a zálohy

Vše je v `localStorage`; nic se neposílá na server. Klíč obsahuje cestu aplikace, aby se instalace v různých repozitářích na stejné doméně nemíchaly. Data zůstávají při obnovení stránky a běžných aktualizacích. Soukromé prohlížení, smazání dat webu, vyčištění úložiště systémem nebo změna domény/cesty mohou data odstranit nebo znepřístupnit. Prohlížeč a aplikace z plochy mohou používat oddělená úložiště. Nespoléhej na automatickou synchronizaci mezi zařízeními.

V **Přehled → Stáhnout zálohu** uložíš JSON s celou sbírkou a pokrokem. **Obnovit ze zálohy** po validaci a potvrzení nahradí současná data. Před obnovou si stáhni aktuální zálohu. Prázdná sbírka se po restartu znovu nenaplní startovními slovy. Poškozená uložená data se automaticky nepřepíší; aplikace umožní obnovit platnou zálohu. Při plném nebo zakázaném úložišti aplikace oznámí neúspěšné uložení.

## Offline a aktualizace

Service worker uloží celý shell aplikace a ikony. Offline podpora vyžaduje HTTPS (GitHub Pages jej používá) nebo localhost; pouhé otevření `index.html` jako lokálního souboru nestačí. První načtení potřebuje internet. Režim offline je připravený po instalaci a aktivaci workeru.

Při změně souborů **zvyš `VERSION` v `sw.js`**, například z `v3` na `v4`, a nahraj změněné soubory. Nová verze se připraví při online návštěvě a aktivuje po zavření všech panelů a aplikace. Potom ji znovu otevři. Cache starých verzí stejné aplikace se odstraní; localStorage zůstává. Není použit agresivní `skipWaiting`, aby se nekombinovaly soubory různých verzí.

## Místní spuštění a testy

V této složce spusť:

```sh
python3 -m http.server 8000
```

Otevři `http://localhost:8000/`. Pro test umístění v podcestě spusť server o složku výše a otevři `http://localhost:8000/italiano-pwa/`.

Automatické testy vyžadují Node.js 20 nebo novější, bez instalace závislostí:

```sh
npm test
```

Testy ověřují import, duplicity, Unicode/mezerovou normalizaci, překlepy, vážené opakování, unikátní možnosti a validaci záloh. Výsledky ověření pro dodanou verzi jsou v `TESTOVANI.md`.

## Soubory

- `index.html`, `style.css`: přístupné české rozhraní a responzivní vzhled.
- `app.js`: interakce, lokální ukládání, zálohy a registrace PWA.
- `core.js`: data a samostatně testovatelná logika.
- `manifest.webmanifest`, `sw.js`, `icons/`: instalace a offline shell.
- `.nojekyll`: statické publikování na GitHub Pages.
- `tests/core.test.js`, `package.json`: testy, bez produkčních závislostí.

Skutečné nasazení do vašeho účtu GitHub a zkouška na fyzickém iPhonu nejsou součástí lokálního ověření.
