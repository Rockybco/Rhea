# Sulaiman Mariam Opeyemi: portfolio website

Four pages: index.html (Home), about.html, work.html, contact.html.

## Structure
    index.html, about.html, work.html, contact.html
    css/style.css     design tokens (CSS variables), typography, components
    js/main.js        shared header/footer, all editable content (SITE), filters, project dialog, form
    assets/images     portrait and project screenshots (not yet supplied)
    assets/documents  CV PDF (placeholder path, not yet supplied)
    assets/icons      reserved for icons

## Running it
Open index.html in a browser, or serve the folder with any static server (e.g. `python3 -m http.server`).
Serving from a folder is recommended so the project dialog and links behave as they would live.

## Tailwind
Tailwind is loaded from the CDN with the brand colours registered in each page's head script.
Most styling lives in css/style.css for this prototype. To migrate to a build, install Tailwind, point its content config at the HTML and JS files, and move the tokens into tailwind.config.

## Replacing placeholders
- Portrait: assets/images/portrait.png (index.html, about.html)
- Project thumbnails: assets/images/project-N.jpg and SITE.projects in js/main.js
- CV: rename the path `assets/documents/CV-PLACEHOLDER.pdf` in index.html and drop the real PDF there
- Testimonials: SITE.testimonials in js/main.js (keep the "Placeholder" tag until replaced with genuine feedback)
- Contact details: contact.html (contact list) and the footer in js/main.js
- Story placeholder paragraph: about.html

## Contact form
The form validates input but does not send anything until an endpoint is set.
Set `data-endpoint` on `#contact-form` in contact.html to a form-handling URL, for example a Formspree or similar endpoint that accepts POST and returns a 2xx status. Until then, visitors see a "not connected yet" message instead of a fake success.
