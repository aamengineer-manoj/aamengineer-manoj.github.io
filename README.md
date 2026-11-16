# aamengineer

Personal site of **Manoj Chauhan**, Member of Technical Staff at PayPal, who offers 1:1 mock interviews for Java, DSA and system design.

**Live site:** https://aamengineer-manoj.github.io

## What is on the site

| Page | File | What it shows |
| --- | --- | --- |
| Home | `index.html` | Mock interview offer, session flow, topics, services and pricing, free checklist, writing, about, FAQ |
| My story | `story.html` | How Manoj moved from a service company to PayPal |
| Resume | `resume.html` | Experience, skills, certifications, awards and education |
| Hobbies | `hobbies.html` | Strength training, travelling, Vedic astrology, numerology, crystals and creating content |

Bookings go through [Topmate](https://topmate.io/manoj_chauhan/).

## Files

```
index.html                       Home page
resume.html                      Resume page
hobbies.html                     Hobbies page
story.html                       My story page
styles.css                       Shared styles (graphite and gold, light and dark mode)
effects.js                       Network background animation and count-up numbers
og.png                           Share preview image for LinkedIn, WhatsApp and Instagram
Backend_Interview_Checklist.pdf  Free download linked from the home page
Manoj_Chauhan_Resume.pdf         Resume download (add this file to enable the button)
```

## How it is built

- Plain HTML, CSS and a little JavaScript. No framework and no build step.
- Fonts: Bricolage Grotesque, IBM Plex Sans and IBM Plex Mono from Google Fonts.
- Hosted on GitHub Pages from the `main` branch, root folder.
- Visitor analytics with Google Analytics 4. Clicks on Book buttons are sent as a `book_click` event.
- Motion respects the visitor's reduced-motion setting.

## Updating the site

1. Edit the file you want to change.
2. On GitHub, use **Add file**, then **Upload files**, choose the changed files, and click **Commit changes**.
3. GitHub Pages redeploys in about a minute.

Common edits:

- **Booking link:** change `BOOK_URL` in the script at the bottom of each HTML file, and the `href` on the Book buttons.
- **Prices and services:** edit the "Pick the session that fits" section in `index.html`.
- **Colors:** change the variables at the top of `styles.css`.
- **Resume PDF:** add `Manoj_Chauhan_Resume.pdf` to the repo root so the Download button works.

## Contact

- Email: aamengineer.manoj@gmail.com
- LinkedIn: https://www.linkedin.com/in/manojchauhan28/
- Instagram: https://www.instagram.com/themanojsphere

&copy; Manoj Chauhan. All rights reserved.
