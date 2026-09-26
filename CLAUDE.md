# Andrew Denty Portfolio – Codebase Notes

## Architecture

Static HTML site. No build process, templating engine or package manager.

- **`index.html`**: one-page homepage. Sections, in nav order: Intro, Work, Approach, Background, Writing, About, and Contact (the shared footer).
- **Case studies**: one `.html` file per project in the root (`thingtesting-overview.html`, `airtame-homescreen.html`, …)
- **`work.html`, `portfolio.html`**: redirects to `/#work`
- **`404.html`**: GitHub Pages not-found page
- **`assets/css/style.css`**: the only stylesheet
- **`assets/js/shared.js`**: loaded on every page; renders the monogram and section nav, work thumbnails, "More work" and the contact footer, plus the interactions and the lightbox
- **`assets/img/`**: all images
- **`assets/fonts/`**: Satoshi variable font (weight 300–900) by Indian Type Foundry, from Fontshare. Free for personal and commercial use under the ITF Free Font License (fontshare.com/terms); the footer credits ITF as the licence asks. Don't modify or subset the file

No third-party CSS or JS. Analytics: Google Analytics 4 (`G-NEJHC6WCBP`) on every page.

Use root-relative paths (`/assets/...`, `/page.html`) so pages also work when served as `404.html`.

## Shared components

```html
<div id="Header"></div>   <script>renderHeader();</script>             <!-- '' on 404 for no current section -->
<div id="Work"></div>     <script>renderWork();</script>               <!-- homepage only -->
<div id="MoreWork"></div> <script>renderMoreWork('Key');</script>      <!-- case studies -->
<div id="Footer"></div>   <script>renderFooter();</script>
```

- **Nav sections** are the `sections` array in `shared.js`; each id must match a section on the homepage. On the homepage the current section follows the scroll; case studies mark Work as current.
- **Projects** are the `projects` array. Only `featured: true` projects are shown: as thumbnails on the homepage and in "More work" on case studies. The Redgate projects are kept but not featured.
- **Contact details and footer links** live in the `contact` object.
- **Intro headlines** for each audience button are the `data-line` attributes in `index.html`. Write `&#10;` for a deliberate line break (the headline uses `white-space: pre-line`) and `&nbsp;` to keep words together.
- **Experience roles** are plain HTML in `index.html`. The circle shows an initial; to use a logo, replace the letter with an `<img>` (it is sized to half the circle).
- **To add JS that runs on every page:** add an `init…` function to `shared.js` and call it from the `DOMContentLoaded` handler.

## Design system

Modelled on billysweeney.com: a calm, exhibition-like page on a 12-column grid (`.frame` + `.grid`).

- From 900px up the monogram and nav are fixed on column 1 and all content starts at column 5. Content sits in deliberate blocks: `.c-main` (5–12), `.c-wide` (5–10, headlines), `.c-left` (5–8) and `.c-right` (9–12).
- Below 900px the nav is hidden, everything stacks, and each section shows a small `.room-label`.
- Each homepage section is a `.room` with generous vertical padding. The intro fills the first screen.
- **No rules, borders or rounded corners.** Whitespace separates things. Circles (role marks) are the only curves.

**Themes:** light and dark follow `prefers-color-scheme`; there is no toggle. Every colour is a custom property on `:root`, redefined in the dark media query. Don't hard-code colours in HTML.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg` | `#ffffff` | `#0b0b0b` | Page background |
| `--text` | `#0a0a0a` | `#f2f2f2` | Almost all text |
| `--text-2` | `#767676` | `#8c8c8c` | Inactive nav and buttons, meta, descriptions (lightest grey that passes WCAG AA) |
| `--well` | `#f2f2f2` | `#1c1c1c` | Role circles, image wells |
| `--brand` | `#22bee3` | `#22bee3` | The name only: the signature blue from the old site. It's a logotype, so it's exempt from contrast minimums; don't use it for other text |

**Typography:** Satoshi. One display size (`--display`, about 5.15vw, weight 500, line-height 0.98, tracking -0.025em) is used for every big statement: the intro, values, role titles, about, contact and case study titles. Everything else is `--title` (23–32px), `--body` (17–18px, line-height 1.22), `--read` (case study reading text) or `--meta` (17px).

- Satoshi's lowercase is small for its size, so text sizes run a step larger than usual. Text is weight 450 (`--weight-text`), which matches the stroke of a typical regular; Satoshi's own 400 looks thin, especially in grey. Bold is 700 (`--weight-strong`); the name is 600.
- Satoshi's en dash is as long as an em dash, so date ranges use a hyphen: `2022-2025`, `2025-Now`.
- The display size is set so the longest role title, "Product Marketing Manager", fits on one line in `.c-main`. Check it if you change `--display` or `--track-display`.

**Motion:** the intro fades up on load, homepage sections and roles fade in as they scroll into view (`[data-reveal]`), case study images reveal on scroll, and all of it is skipped with `prefers-reduced-motion`.

**Monogram:** `markHTML()` in `shared.js` renders the initial plus each remaining letter of the name as its own span (`--i` sets the order out, `--r` the order back in). On hover (pointer devices only) or keyboard focus the letters stream out from behind the initial and settle with a slight spring; the rest of the name sits in a `0fr` → `1fr` grid track so the link and its focus ring grow with it. With reduced motion the name simply fades in.

## Case study markup

Case studies keep their original markup and `style.css` maps it onto the frame:

- The title (`.page-intro h1`) uses the display size on columns 5–10, with the meta caption beneath and intro copy as a block on 5–8.
- Body text (`h3`, `h4`, `p`, lists, captions) sits on columns 5–10; bare images and `.row`s run 5–12. Images wrapped in `<p>` stay in the text column.
- The old `.light-grey`, `.dark-grey` and `.page-intro--honeycomb` bands render as plain page.
- `.row` / `.col-md-{3,4,5,6,7,9}` are a small replacement for the Bootstrap grid.
- Utility classes: `.caption`, `.tight`, `.small`, `.spacer`, `.shadow`, `.tv`, `.img-fluid`.

## Image patterns on case studies

| Pattern | HTML structure | Lightbox behaviour |
|---------|---------------|-------------------|
| A | `<p><img class="img-fluid"></p>` | Opens img src |
| B | Pattern A + `<p class="caption [tight]">` sibling | Opens img src, shows caption |
| C | `<img class="img-fluid">` in external `<a href="https://...">` | Link is preserved, no lightbox |
| D | `<a href="assets/img/large.png"><img class="img-fluid" src="small.png">` | Opens the **href** (large version) |
| E | `<img class="img-fluid tv">` | Excluded from lightbox (device frames) |

Images inside `#Header`, `#MoreWork`, `#Footer` are excluded from the lightbox.

## Lightbox

Implemented in `shared.js` + `style.css`. No external library.

- Click any eligible `.img-fluid` image to open
- Captions pulled from adjacent `<p class="caption">` sibling, fallback to `alt` text
- Keyboard: `Esc` closes, `←`/`→` navigate
- Mobile: swipe left/right to navigate, tap backdrop to close
- Dark overlay `rgba(0,0,0,0.95)`, captions in `#b6b6b6`
