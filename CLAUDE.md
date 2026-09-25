# Andrew Denty Portfolio – Codebase Notes

## Architecture

Static HTML site. No build process, templating engine or package manager.

- **`index.html`**: one-page homepage (intro, about, work, experience, writing). Contact lives in the shared footer.
- **Case studies**: one `.html` file per project in the root (`thingtesting-overview.html`, `airtame-homescreen.html`, …)
- **`work.html`, `portfolio.html`**: redirects to `/#work`
- **`404.html`**: GitHub Pages not-found page
- **`assets/css/style.css`**: the only stylesheet
- **`assets/js/shared.js`**: loaded on every page; renders the header, footer, work cards and "More work", plus the lightbox and small interactions
- **`assets/img/`**: all images
- **`assets/fonts/`**: Inter 4 variable font (weight + optical size, Latin subset) and its OFL licence

No third-party CSS or JS. Analytics: Google Analytics 4 (`G-NEJHC6WCBP`) on every page.

Use root-relative paths (`/assets/...`, `/page.html`) so pages also work when served as `404.html`.

## Shared components

```html
<div id="Header"></div>   <script>renderHeader();</script>
<div id="Work"></div>     <script>renderWork();</script>           <!-- homepage only -->
<div id="MoreWork"></div> <script>renderMoreWork('Key');</script>  <!-- case studies -->
<div id="Footer"></div>   <script>renderFooter();</script>
```

- **Projects** are defined once in the `projects` array at the top of `shared.js`. `featured: true` projects appear as cards on the homepage; the rest appear in the "Earlier work" list. `renderMoreWork('Key')` shows the next three projects after `Key`.
- **Contact details and footer links** live in the `contact` object in `shared.js`.
- **Experience and writing** are plain HTML in `index.html`.
- **To add JS that runs on every page:** add an `init…` function to `shared.js` and call it from the `DOMContentLoaded` handler.

## Design system

Minimal, resumé-style layout on a 12-column grid (`.wrap` + `.grid`). From 900px up, section labels sit on columns 1–3 and content on 4–12; below that everything stacks.

**Themes:** light and dark follow `prefers-color-scheme`; there is no toggle. Every colour is a custom property on `:root`, redefined in the dark media query. Don't hard-code colours in HTML.

| Token | Light | Dark | Usage |
|-------|-------|------|-------|
| `--bg` | `#fafafa` | `#0e0e0e` | Page background |
| `--surface` | `#f0f0ef` | `#191919` | Image wells, `.light-grey` bands |
| `--text` | `#141414` | `#ededed` | Headings, primary text |
| `--text-body` | `#3b3b3b` | `#c4c4c4` | Case study paragraphs |
| `--text-2` | `#6b6b6b` | `#8f8f8f` | Labels, meta, captions |
| `--line` | 10% black | 10% white | Hairlines |
| `--band` | `#161616` | `#191919` | `.dark-grey` bands |
| `--accent` | `#22bee3` | same | Brand cyan, used only for text selection |

**Typography:** Inter Variable. Optical sizing is automatic, so large text gets Inter's display cut. Sizes are `--fs-*` tokens: 14px labels and meta, 16px lists, 18–22px lead text, 24–36px contact email, 34–68px page titles. Weights 400, 450 and 500, with negative tracking on large sizes.

**Motion:** homepage sections fade in (`[data-reveal]`), case study images reveal on scroll, and all of it is skipped with `prefers-reduced-motion`.

## Case study markup

Case studies keep their original markup and `style.css` maps it onto the grid:

- Text (`h3`, `h4`, `p`, lists, captions) sits on columns 4–10; bare images, `.row`s and bands run full width. Images wrapped in `<p>` stay in the text column.
- `.page-intro` holds the title, meta caption and intro. Add `dark-grey` or `page-intro--honeycomb` for a coloured opening band; the header joins the band automatically.
- `.row` / `.col-md-{3,4,5,6,7,9}` are a small replacement for the Bootstrap grid.
- Utility classes: `.caption`, `.tight`, `.small`, `.spacer`, `.light-grey`, `.dark-grey`, `.lg-divider`, `.shadow`, `.tv`, `.img-fluid`.

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
- Dark overlay `rgba(0,0,0,0.95)`, Inter captions in `#b6b6b6`
