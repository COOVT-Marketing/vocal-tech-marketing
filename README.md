# Vocal Tech Marketing site

Static SPA (no build step). Clean URLs via the History API.

## Deploy on GitHub Pages
1. Push this folder to the repo root (`main` branch).
2. Settings > Pages > Deploy from branch > `main` / root.
3. Custom domain: `CNAME` is already included. Enforce HTTPS.
4. Deep links like `/medicare` work through `404.html`, which hands the path back to `index.html`.
   This only works when the site is served from the domain root (custom domain or `username.github.io`), not from `/repo-name/`.

## Form
`assets/js/config.js` holds the webhook URL. Paste `Code.gs` into the Apps Script editor of the target Sheet and redeploy as a web app (Anyone). After editing the script, create a new deployment version.

## Link previews and per-page SEO
Social image: `assets/img/og-image.png` (1200x630). After deploying, refresh cached previews with the Facebook Sharing Debugger / LinkedIn Post Inspector.

## Private profile pages
`/syed-ali-sajjad-rizvi` and `/syed-shayan-abbas-rizvi` are not linked from anywhere, are left out of the sitemap, and carry `noindex, nofollow`. They open only when the URL is typed. To add a photo, put it in `assets/img/team/` and set `photo: '/assets/img/team/name.jpg'` in the `PEOPLE` list in `assets/js/pages.js`.
