# CXclusives – WordPress-pagina's

Custom HTML voor de vier pagina's uit `CXclusives website.fig`:

| Bestand | WordPress-pagina | Slug |
|---|---|---|
| `wordpress/home.html` | Home | `/` |
| `wordpress/aanbod.html` | Aanbod (Onze collectie) | `/aanbod/` |
| `wordpress/lease.html` | Lease | `/lease/` |
| `wordpress/contact.html` | Contact | `/contact/` |

Screenshots van het resultaat staan in `preview/`.

## Zo zet je het in WordPress

1. Maak de pagina aan (of open hem) en geef hem de slug uit de tabel.
2. Kies een paginasjabloon **zonder titel, header, footer en zijbalk**, bijvoorbeeld
   "Canvas", "Blank", "Full width – no header/footer" of "Elementor Canvas".
   Header, footer en de WhatsApp-knop zitten al in de HTML.
3. Voeg één blok **Aangepaste HTML** (Custom HTML) toe en plak de **volledige** inhoud van het bestand erin.
4. Zet onder *Instellingen → Lezen* de pagina "Home" als statische voorpagina.

Alle CSS begint met `.cxc`, zodat het niet botst met je thema. De lettertypes
(Anton, Audiowide, Inter, Crimson Text, Source Serif) worden via Google Fonts geladen.

## Nog in te vullen

Zoek in de bestanden op deze plaatshouders:

- `#INSTAGRAM-URL`, `#FACEBOOK-URL`, `#GOOGLE-REVIEWS-URL`: de echte links.
- `JOUW-WEB3FORMS-ACCESS-KEY` (contact.html): maak gratis een key aan op web3forms.com.
  Gebruik je liever Contact Form 7 of WPForms? Vervang dan het `<form>` door de shortcode.
- Foto's: vervang de grijze vakken (`cxc-photo`) door `<img src="..." alt="...">`.
- Autokaarten: het zijn nu voorbeeldauto's. Vervang ze door de Mobilox-widget/shortcode,
  of vervang per auto de `<svg>` door een `<img>`.
- `Bekijk voertuig` linkt nu naar `#`.

## Aanpassen

Header, footer en stijlen staan één keer in `bron/build.js`. Pas ze daar aan en
draai `node bron/build.js`, dan worden alle vier de bestanden in `wordpress/` opnieuw gemaakt.
