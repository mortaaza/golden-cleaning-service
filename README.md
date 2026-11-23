# Golden Cleaning Service website

A one-page static site: `index.html`, `styles.css`, `script.js`. No build step. Free to host on GitHub Pages.

## 1. Put in your real details

Search `index.html` for these placeholders and replace them:

| Placeholder | Where |
| --- | --- |
| `(416) 555-0123` and `+14165550123` | Booking and Contact sections |
| `hello@goldencleaning.example` | Contact section, and `FALLBACK_EMAIL` in `script.js` |
| "Serving the Greater Toronto Area" and the city list | Hero and Contact sections |
| Prices `$120`, `$220`, `$90` | Pricing section |
| `500+`, `4.9★`, "family-run" story | About section. Use only true figures. |

## 2. Make the booking form deliver to your inbox

GitHub Pages cannot run server code, so the form posts to Formspree (free for 50 bookings a month).

1. Sign up at https://formspree.io and create a form.
2. Copy the form ID, which looks like `xyzabcde`.
3. In `index.html`, replace `YOUR_FORM_ID` in the `<form action=...>` line.

Until you do this, the form opens the visitor's email app with the booking details pre-filled.

Alternative: replace the form with a Calendly or Google Calendar appointment embed if you want visitors to pick an exact time slot.

## 3. Publish free on GitHub Pages

```bash
cd golden-cleaning-site
git init -b main
git add .
git commit -m "Golden Cleaning Service website"
gh repo create golden-cleaning-service --public --source=. --push
gh api -X POST repos/{owner}/golden-cleaning-service/pages -f "source[branch]=main" -f "source[path]=/"
```

The site appears within a few minutes at `https://<your-github-username>.github.io/golden-cleaning-service/`.

Without the command line: create a public repository on github.com, upload the files, then open Settings, Pages, and choose "Deploy from a branch", `main`, `/ (root)`.

## 4. Optional: your own domain

Buy a domain (about $15 a year), then enter it under Settings, Pages, Custom domain and follow GitHub's DNS instructions. Hosting stays free.
