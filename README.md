# Yi Wei - Academic Website

A dependency-free static website designed for GitHub Pages.

## Files You Normally Edit

Website content is separated into clearly named files inside `content/`:

- `site-settings.js` — name, email, address, portrait, shared links, and footer;
- `edit-homepage-here.js` — introduction, biography, timeline, research, and recruitment;
- `edit-team-here.js` — team members, photos, emails, and personal websites;
- `edit-news-here.js` — news and acceptance rates;
- `edit-publications-here.js` — selected publications and publication links;
- `edit-teaching-and-service-here.js` — courses and academic service;
- `edit-gallery-here.js` — gallery photos, captions, alt text, and dates.

News and Selected Work are sorted automatically by their `YYYY-MM-DD` dates. Only the
newest six news entries and newest five selected publications appear on the website.
Older entries remain in their content files as an archive. Change each section's
`visibleItems` value if a different display count is preferred.

### `design-config.js`

Edit this file to update:

- theme colors;
- body, navigation, heading, and card-title sizes;
- line height;
- content width;
- section spacing and card gaps;
- desktop and mobile header heights.

Every editable file contains English instructions. Normally, the files in `content/` and
`design-config.js` are the only files that need to be changed.

## Adding or Replacing Images

Use lowercase file names with words separated by hyphens. Do not use spaces.

Examples:

```text
correct: jane-doe.jpg
incorrect: Jane Doe Final Photo.jpg
```

Place files in the matching folder:

```text
assets/images/profile/   Main profile portrait
assets/images/team/      Team member photos
assets/images/gallery/   Lab group and activity photos
assets/images/brand/     University and lab logos
assets/fonts/            Local website fonts
```

After adding a team photo, enter its path in `content/edit-team-here.js`, for example:

```js
photo: "assets/images/team/jane-doe.jpg"
```

Recommended image formats are `.jpg`, `.png`, and `.webp`.

## Project Structure

```text
.
├── content/                              Clearly named content editors
│   ├── site-settings.js                  Shared identity and contact details
│   ├── edit-homepage-here.js             Homepage and research
│   ├── edit-team-here.js                 Team members
│   ├── edit-news-here.js                 News archive
│   ├── edit-publications-here.js         Selected publications
│   ├── edit-teaching-and-service-here.js Teaching and academic service
│   └── edit-gallery-here.js              Gallery photos
├── design-config.js                      Visual settings editor
├── index.html                            Website page structure
├── assets/
│   ├── fonts/                 Local font files
│   └── images/
│       ├── brand/             SLU and WNIS Lab logos
│       ├── profile/           Profile portraits
│       ├── team/              Team member photos
│       └── gallery/           Lab group and activity photos
├── css/                                  Website styles
├── js/                                   Website rendering and interaction
└── .github/workflows/                    GitHub Pages publishing workflow
```

## Preview Locally

Open `index.html` directly in a browser. No installation, build command, or internet connection is required.

## Publish with GitHub Pages

1. Push the repository to the `main` branch on GitHub.
2. Open **Settings → Pages** in the repository.
3. Under **Build and deployment**, select **GitHub Actions**.
4. The included workflow publishes the website automatically.
