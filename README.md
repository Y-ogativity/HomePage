This is an HTML code collection for my academic homepage.

Open `index.html` directly in a browser to preview the site, including News,
without starting a local server.

Edit News entries in `update_Mishima.js`. Each entry contains a date, Japanese
and English text (`ja` / `en`), and optional detail links (`url` / `urlEn`).
This data file is loaded before `script.js` so direct local previews and the
published site use the same entries.

The HTML pages include a Content Security Policy that allows local scripts,
styles, images, and videos, and blocks inline scripts, inline styles, network
requests from JavaScript, forms, frames, and workers. The `file:` sources preserve
direct local-file previews. Keep event handlers in `script.js` and styles in
`style_v2.css`; do not add inline `onclick` or `style` attributes.

News links must use HTTPS. Mac `.DS_Store` files are ignored and should not be
committed. Hosting-level protections such as HSTS and `frame-ancestors` require
HTTP response headers and cannot be enabled by this HTML meta policy.
