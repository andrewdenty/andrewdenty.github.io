# Andrew Denty Portfolio – Codebase Notes

## Architecture

Static HTML site — no build process, no templating engine, no package manager.

- **17 portfolio project pages** — individual `.html` files in the root
- **`index.html`** — homepage
- **`portfolio.html`** — portfolio listing/grid
- **`assets/css/style.css`** — single stylesheet, all custom styles (overrides Bootstrap)
- **`assets/js/shared.js`** — loaded on every page; injects header, nav, footer, and the lightbox
- **`assets/img/`** — all images (PNG, JPG, SVG, GIF)

External dependencies loaded from CDN on every page:
- jQuery 3.2.1
- Bootstrap 4.5 (CSS + JS)
- DM Sans (Google Fonts, weights 400/500/700)

## Shared Components

`shared.js` provides three functions called inline in each HTML page:

```html
<div id="Header"></div>   <script>renderHeader();</script>
<div id="MoreWork"></div> <script>renderMoreWork('PageName');</script>
<div id="Footer"></div>   <script>renderFooter();</script>
```

**To add JS that runs on every page:** add it to `shared.js` inside `$(document).ready()`.

## Styles

`style.css` is the single source of truth for all custom styles. Bootstrap is used for the grid and responsive utilities only; everything else is overridden here.

**Color palette:**
| Token | Hex | Usage |
|-------|-----|-------|
| Cyan | `#22bee3` | Brand, headings, logo |
| Coral | `#F6714F` | Hover states |
| Charcoal | `#222` | Dark section backgrounds, headings |
| Body grey | `#707070` | Body text, nav links |
| Border grey | `#b6b6b6` | Link underlines, subtle borders |
| Light bg | `#f4f4f4` | Alternate section backgrounds |
| Off-white | `#fafafa` | Primary page background |

**Typography:** DM Sans throughout. Base 18px body. Headings h2–h4 use `font-weight: 700`.

**Key utility classes:** `.caption`, `.tight`, `.shadow`, `.spacer`, `.light-grey`, `.dark-grey`, `.tv`, `.img-fluid` (Bootstrap).

## Image Patterns on Portfolio Pages

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
- Dark overlay `rgba(0,0,0,0.95)`, DM Sans captions in `#b6b6b6`
