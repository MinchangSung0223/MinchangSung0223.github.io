# Astro research notes: first migration stage

## Existing repository

- Base branch: `test`, starting commit `a2fa330330c107ecf71982d7893f407a29a7f572`.
- Jekyll RTD theme: `_config.yml`, `_layouts/`, `_includes/`, `_sass/`.
- Legacy Markdown: `etc/` and `post/` (27 files, including their indexes).
- Legacy assets: `assets/`; original images in the migrated notes use remote GitHub URLs.
- Original npm build compiled Jekyll theme assets through Webpack.
- Existing `ci.yml` runs on `develop` and publishes theme releases; it is retained.

## New structure

```text
astro.config.mjs                Starlight, math rendering, navigation
src/content.config.ts          Markdown content collection
src/content/docs/
  index.md                     Minimal home metadata
  mathematics/
    linear-algebra/index.md
    matrix-calculus/index.md
    lie-group/index.md
    lie-group/introduction.md  Migrated note
    cga/index.md
  robotics/
    kinematics/index.md
    dynamics/index.md
    calibration/index.md
    control/index.md
    control/pybullet-pd-control.md
  engineering/
    ros2/index.md
    ethercat/index.md
    real-time/index.md
    simulation/index.md
  programming/
    c-cpp/index.md
    python/index.md
    matlab/index.md
    matlab/modern-robotics.md
src/components/NotesHome.astro  Categories and dated recent notes
src/styles/custom.css          Neutral/zinc theme and readable layout
scripts/remark-legacy-notes.mjs Rendering compatibility only
scripts/migration-manifest.json Source/destination mapping
scripts/verify-build.mjs        Original-body and output checks
.github/workflows/astro-pages.yml
package.json / package-lock.json
legacy-package.json            Previous npm manifest retained
```

Category indexes are navigation placeholders, not newly written technical notes.
All old Markdown, Jekyll files and assets remain at their original paths.

## Migrated notes

| Original | New route |
| --- | --- |
| `post/chapter10.md` | `/mathematics/lie-group/introduction/` |
| `etc/2022-03-12-Modern_Robotics_Example.md` | `/programming/matlab/modern-robotics/` |
| `etc/2021-03-10-PID_CONTROL_WITH_PYBULLET.md` | `/robotics/control/pybullet-pd-control/` |

Only frontmatter metadata is added. Migrated Markdown bodies are identical to the originals, including equations, symbols, code and image URLs.

At rendering time only:
- Legacy `note` code fences become quotations with Markdown/math rendering.
- The MATLAB and Python notes originally marked `bash` receive the correct syntax highlighting.
- The first duplicate H1 in the Lie Group note is omitted because Starlight renders the same title above the body.

## Features

- Astro + Starlight with neutral custom CSS inspired by minimal documentation sites.
- Light/Dark/Auto, responsive navigation, left sidebar and right contents panel.
- Pagefind searches all documents migrated into `src/content/docs/`; untouched legacy files are not indexed yet.
- KaTeX with inline `$...$` and display `$$...$$` math; invalid TeX fails the build.
- Expressive Code/Shiki for C, C++, Python, MATLAB and Bash.
- Self-hosted Noto Sans KR and KaTeX fonts.
- Home contains the requested title, description, category links and Recently Updated list.

## Authoring

Add `.md` files under the appropriate category/subcategory. Frontmatter example:

```yaml
---
title: Your note title
lastUpdated: 2026-09-30
---
```

Maintain `lastUpdated` when updating a note to control the home list. The three migrated notes use their original file's latest Git commit date, not the migration date.
The sidebar discovers new notes automatically. Use fenced languages `c`, `cpp`, `python`, `matlab`, `bash`.
Local images may be placed in `public/images/` and referenced as `/images/name.png`, or referenced relative to Markdown through Astro's asset support.

## Local development and verification

```bash
npm ci
npm run dev
npx astro check
npm run build
npm run verify
npm run preview
```

Validated locally:
- Production build succeeds.
- Astro check: 0 errors, 0 warnings, 0 hints.
- Migrated body equality, inline/display math, legacy note math, highlighted code and search output.
- Temporary fixture tested C/C++/Python/MATLAB/Bash and local image output; fixture is removed from the final site.
- Browser checks: Light/Dark selection, 390px mobile layout without horizontal page overflow, search query returning notes.
- Remote MATLAB GIF and PyBullet PNG URLs return HTTP 200.

Known inherited issue: the Lie Group note's triangle image URL returns HTTP 404:
`https://github.com/MinchangSung0223/MinchangSung0223.github.io/assets/53217819/f9e30619-0dae-4a2c-a985-59a29b87b7a8`
The original reference is retained. Restoring that image requires the original image file or a valid replacement URL.

## GitHub Pages

The `astro-migration` branch builds and uploads an artifact; it does not deploy.
Pushes to the default `test` branch build and deploy through GitHub Pages Actions after this migration is merged.
Pull requests into `test` run validation only. Manual runs deploy only when run on `test`.
Before the future merge, select **Settings → Pages → Build and deployment → Source: GitHub Actions**.
This first stage does not change Pages settings, merge branches, deploy the site or redirect old URLs.
The user-site domain uses `/` as its base; no repository-name base path is added.

References:
- https://starlight.astro.build/reference/configuration/
- https://starlight.astro.build/guides/authoring-content/
- https://docs.astro.build/en/guides/deploy/github/
- https://github.com/remarkjs/remark-math
