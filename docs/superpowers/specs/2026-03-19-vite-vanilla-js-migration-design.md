# Vite + Vanilla JS Migration Design

**Date:** 2026-03-19
**Project:** figma (Enterprise UI Replica / Solartis insurance submission wizard)

---

## Overview

Convert a 3-file plain HTML project into a Vite + vanilla JS single-page application. No React, no TypeScript. All existing visual behavior, styling, and functionality must be preserved exactly.

---

## Current State

- 3 HTML files: `index.html`, `page2.html`, `page3.html`
- Multi-step insurance submission wizard: Program Selection → Risk/Coverage → Rate Indication
- Navigation via `window.location.href` between pages
- Cross-page state via `localStorage` (`selectedGL`, `selectedCA`)
- CSS copy-pasted across all 3 files (~90% identical)
- Shared JS functions (`toggleDetails`) duplicated in all 3 files
- 1 static asset: `download.jfif` (logo)
- External CDN deps: Google Fonts (Roboto), Font Awesome 6.4.0

---

## Architecture

### Approach: innerHTML Template Strings + Simple Router

Each view and shared component is a JS function returning an HTML string. A `router.js` module replaces `document.getElementById('app').innerHTML` on navigation and re-attaches event listeners.

---

## Project Structure

```
figma/
├── index.html
├── public/
│   └── download.jfif          # Vite serves this at /download.jfif (public dir convention)
├── src/
│   ├── main.js
│   ├── router.js
│   ├── state.js
│   ├── styles/
│   │   └── main.css
│   ├── components/
│   │   ├── header.js
│   │   ├── sidebar.js
│   │   └── detailsPanel.js
│   └── views/
│       ├── view1.js
│       ├── view2.js
│       └── view3.js
└── package.json
```

### Logo asset convention
`download.jfif` is placed in `public/` — Vite's static asset directory. Vite serves it directly at `/download.jfif`. The header component references it as `src="/download.jfif"`. No import or processing needed.

---

## package.json

```json
{
  "name": "figma",
  "private": true,
  "version": "1.0.0",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  }
}
```

---

## index.html Shell (complete, verbatim)

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Enterprise UI Replica</title>
  <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700;900&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/src/main.js"></script>
</body>
</html>
```

---

## Vite Config

No `vite.config.js` needed. Default config applies:
- Dev server: `http://localhost:5173`
- Static assets: `public/` directory
- No plugins, no PostCSS, no CSS preprocessor — pure CSS only
- No `base` path (served from root)

---

## Components

### `src/components/header.js`

Exports `renderHeader({ showTools = false })` → HTML string.

- **Always renders:** top white bar with `<img src="/download.jfif" alt="Solartis" style="height: 28px; width: auto;" />`
- **`showTools: false`** (view1): right side empty
- **`showTools: true`** (view2, view3): right side renders:
  - `<i class="fa-regular fa-file-lines" style="cursor: pointer"></i>`
  - `<i class="fa-regular fa-bell" style="cursor: pointer"></i>`
  - `<div class="avatar" style="cursor: pointer">U</div>` (purple background `#55279b`, white text)

### `src/components/sidebar.js`

Exports `renderSidebar()` → HTML string. Static.

4 icon buttons in `.sidebar`:
- `fa-solid fa-home` — not active
- `fa-solid fa-edit` — active (has `sidebar-active` background)
- `fa-solid fa-search` — not active
- `fa-solid fa-cog` — not active

### `src/components/detailsPanel.js`

Exports:
1. `renderDetailsPanel(details)` → HTML string
2. `attachDetailsToggle()` — exported and imported into each view's `attach()`

**`renderDetailsPanel(details)`:**
- `details`: `{ agencyName, agentName, submissionNumber, submissionStatus, insuredName }`
- Panel renders **expanded by default**: `.details-panel` has no `collapsed` class, `.details-grid` has `display:flex`
- Required elements and IDs:
  - `.details-header` — click target for toggle
  - `.details-panel` — receives/loses `collapsed` class
  - `.details-grid` — toggled between `display:flex` and `display:none`
  - `#details-chevron` — icon swapped between `fa-chevron-down` (expanded) and `fa-chevron-right` (collapsed)

**`attachDetailsToggle()`:**
- Exported from `detailsPanel.js`, imported and called inside each view's `attach()`
- Binds a `click` listener to `.details-header`
- On click:
  - If currently expanded: adds `collapsed` to `.details-panel`, sets `.details-grid` `display:none`, swaps `#details-chevron` to `fa-chevron-right`
  - If currently collapsed: removes `collapsed`, sets `.details-grid` `display:flex`, swaps `#details-chevron` to `fa-chevron-down`

---

## Router

### `src/router.js`

```js
import * as view1 from './views/view1.js';
import * as view2 from './views/view2.js';
import * as view3 from './views/view3.js';

const views = { view1, view2, view3 };

export function navigate(viewName) {
  const view = views[viewName] ?? views['view1'];
  document.getElementById('app').innerHTML = view.render();
  view.attach();
}
```

- Calls the **view-specific** `attach()` (e.g. `view2.attach()` when navigating to view2)
- `main.js` calls `navigate('view1')` on load

### `src/main.js`

```js
import './styles/main.css';
import { navigate } from './router.js';
navigate('view1');
```

---

## State

### `src/state.js`

```js
export const state = {
  selectedGL: false,
  selectedCA: false,
};
```

- Module singleton — values persist for the browser session
- **On full page reload:** resets to `false, false` (matches original behavior)
- **On back-navigation (navigate('view1')):** view1 re-renders with checkboxes pre-checked to match current `state.selectedGL` / `state.selectedCA`
- **`view1.attach()`** writes `state.selectedGL` and `state.selectedCA` from checkbox values when Next is clicked
- **`view3.attach()`** reads state on render to populate subline and show/hide GL/CA sections

---

## Views

Each view exports `render()` and `attach()`.

`render()` builds the full page HTML string:
```js
export function render() {
  return `
    <div style="display:flex; flex-direction:column; height:100vh;">
      ${renderHeader({ showTools: false })}
      <div class="main-container">
        ${renderSidebar()}
        <main class="page-content">
          <div class="inner-canvas">
            <!-- view-specific content -->
          </div>
        </main>
      </div>
    </div>
  `;
}
```

`attach()` binds all event listeners and always calls `attachDetailsToggle()` at the end.

---

## Stepper Steps (5 total, used across all views)

| # | Label |
|---|-------|
| 1 | Agency & Agent |
| 2 | Insured Details |
| 3 | Program Selection |
| 4 | Risk/Coverage |
| 5 | Program Selection *(preserved verbatim from original code)* |

---

## view1.js — Program Selection

**Stepper:** steps 1 & 2 completed (green check + `completed` class), step 3 active (`active` class, underlined text), steps 4 & 5 inactive

**Header:** `renderHeader({ showTools: false })`

**Details panel data:**
```js
{ agencyName: 'TestAgency9590', agentName: 'testagent1003',
  submissionNumber: 'SN131907', submissionStatus: 'In Progress', insuredName: 'test test' }
```

**Program Info card:**
- Heading: "Program Information"
- Subtitle: "Select Program"
- Checkbox `#gl-check`: "General Liability" — `checked` attribute set from `state.selectedGL`
- Checkbox `#ca-check`: "Commercial Automobile" — `checked` attribute set from `state.selectedCA`

**Buttons:**
- Previous: rendered but no-op (no click handler)
- `#nextBtn`: on click, if both `#gl-check` and `#ca-check` are checked → write state → `navigate('view2')`; else → `alert('Please click both General Liability and Commercial Automobile to proceed.')`

**`attach()`:** binds Next button click, calls `attachDetailsToggle()`

---

## view2.js — Risk/Coverage

**Stepper:** steps 1–3 completed, step 4 active, step 5 inactive

**Header:** `renderHeader({ showTools: true })`

**Details panel data:** same values as view1

**Secondary tabs** (always shown regardless of state — both tabs visible always):
- `#tab-gl` "General Liability" — active by default on every render (no persistence across navigations)
- `#tab-ca` "Commercial Automobile" — inactive by default
- Clicking a tab: switches active class, shows corresponding content, hides the other
- GL tab active → `#content-gl` visible, `#content-ca` hidden
- CA tab active → `#content-ca` visible, `#content-gl` hidden

**GL content (`#content-gl`):**

STATE accordion (`#state-row`):
- `#add-state-btn` (plus icon): toggles `#state-form` between `display:none` and `display:block`
- `#state-select` options (verbatim from original):
  - placeholder: "State *" (disabled, selected, hidden)
  - Alaska (AK), California (CA), New York (NY), Texas (TX)
- On state select change: show `#lbl-state` label and `#subline-group`
- `#subline-select` options (verbatim from original):
  - placeholder: "Select" (disabled, selected, hidden)
  - Premises/Operations and Products/Completed Operations
  - Premises/Operations
  - Products/Completed Operations
  - Liquor
  - Owners and Contractors
  - Pollution
  - Product Withdrawal
  - Railroad
  - Underground Storage Tank
  - Electronic Data Liability
- Save button: no-op

RISK SCHEDULE row: static accordion row, no toggle behavior

**CA content (`#content-ca`):**

POLICY accordion (`#policy-row`):
- `#add-policy-btn` (plus icon): toggles `#policy-form-container` between `display:none` and `display:block`
- `#policy-state-select` options (verbatim from original):
  - placeholder: "State *" (disabled, selected, hidden)
  - Alabama (AL), Alaska (AK), California (CA)
- On state select change: show `#lbl-policy-state` label, show `#policy-details`, hide `#policy-state-error`
- `#policy-save-btn`: if no state selected → show `#policy-state-error`; else no-op
- `#policy-details` contents: all form fields and radio groups as per original page2.html (NAICS, Symbol Rating, Rate With RACA, Policy Type, Individual Named Insured, Legal Entity, Accept Terrorism, Liability Deductible, Ride Sharing, Uninsured Motorists section, Gross Receipts, Experience Rating, Schedule Rating, Minimum Premiums section, Non-Truckers Liability Coverage inner card, Physical Damage Coverages section)
- All fields in `#policy-details` are editable inputs/selects with default values as in the original HTML

VEHICLE section:
- VEHICLE accordion row with plus icon (no-op toggle)
- Vehicle table: headers: Unit, Class Code, Original Cost New, State, Year, Make, Model, VIN, Vehicle Sub Types, Action
- Body: "No Records To Display."

**Buttons:** Previous → `navigate('view1')`, Next → `navigate('view3')`

**Footer:** `<footer class="footer"><div><span class="brand">Solartis</span> © 2026</div><div>Powered by <span class="brand">Solartis</span></div></footer>`

**`attach()`:** tab switching, add-state-btn toggle, state-select change, add-policy-btn toggle, policy-state-select change, policy-save-btn click, prev/next buttons, calls `attachDetailsToggle()`

---

## view3.js — Rate Indication

**Stepper:** steps 1–4 completed, step 5 active

**Header:** `renderHeader({ showTools: true })`

**Details panel data:**
```js
{ agencyName: 'TestAgency9590', agentName: 'testagent1003',
  submissionNumber: 'SN13203B', submissionStatus: 'In Progress', insuredName: 't t' }
```

**Rate Indication card** (2-column grid layout):

All fields are editable (standard inputs/selects) unless noted as `disabled`:

| Field | Type | Default value |
|-------|------|---------------|
| Subline (`#page3-subline-select`) | `<select>` | see subline logic below |
| State | `<select>` | "AL" |
| Second State | `<select>` | "AK-Premises/Operations and Products/Completed Operations" |
| Effective Date | `<input type="text">` | "03/21/2026" (with calendar icon) |
| Expiration Date | `<input type="text">` | "03/21/2027" (with calendar icon) |
| Billing Type | `<select>` | "Agency Bill" |
| Quote Type | `<select disabled>` | "New Business" |

**Subline (`#page3-subline-select`) population logic** — set in `attach()`, not `render()`:
- `state.selectedGL && state.selectedCA` → sole option: "Commercial Package Policy"
- `state.selectedCA` only → sole option: "Commercial Automobile"
- `state.selectedGL` only → sole option: "General Liability"
- Neither → sole option: "Package Policy"

Each case sets the dropdown to a single `<option>` which is auto-selected by default.

**GL section (`#gl-section`):**
- Rendered in HTML but initially `display:none`
- `attach()` sets `style.display = 'block'` if `state.selectedGL`
- `#gl-toggle` (checkbox): on change, sets `#gl-content` to `display:block` or `display:none`
- Risk Schedule table: headers Subline, State, Location Number; body "No Records To Display."

**CA section (`#ca-section`):**
- Rendered in HTML but initially `display:none`
- `attach()` sets `style.display = 'block'` if `state.selectedCA`
- `#ca-toggle` (checkbox): on change, sets `#ca-content` to `display:block` or `display:none`
- Vehicle Schedule table: headers Unit, VehicleSubTypes, ClassCode, OriginalClassNew, State, City, VIN, Year, Make, Model, Premium; body "No Records To Display."

**Taxes and Fees section:**
- Section header: "Taxes and Fees" with small plus circle icon (no-op)
- Table: headers TAX, PERCENTAGE, Amount, Action; body "No Records To Display."

**Buttons:** Previous → `navigate('view2')`, Save → no-op

**`attach()`:** populates `#page3-subline-select`, shows/hides GL/CA sections, binds toggle switches, binds prev button, calls `attachDetailsToggle()`

---

## CSS

- **Source:** copy the `<style>` block contents from each of the 3 existing HTML files, merge into `src/styles/main.css`, remove duplicate rules
- Pure CSS — no PostCSS, no preprocessor, no `postcss.config.js`
- `:root` variables defined once (deduplicated)
- Organized with section comments
- Imported in `main.js`: `import './styles/main.css'`
- Google Fonts and Font Awesome remain as CDN `<link>` tags in `index.html`

---

## What Is Preserved

- All visual styling (pixel-identical to originals)
- All interactive behavior: details panel collapse, tab switching, accordion forms, state/subline reveal, policy form reveal, vehicle table, GL/CA toggle switches
- All validation: Next on view1 requires both checkboxes; Save on view2 policy form validates state selection
- Logo asset (`download.jfif`)
- Font Awesome icons (CDN)
- Roboto font (CDN)
- Step 5 label "Program Selection" (preserved verbatim even though it duplicates step 3)

## What Changes

| Before | After |
|--------|-------|
| 3 HTML files | 1 `index.html` shell |
| `window.location.href` navigation | `navigate()` JS function |
| `localStorage` for cross-page state | `state.js` in-memory object |
| CSS copy-pasted 3x | 1 `main.css` |
| `toggleDetails()` duplicated 3x | 1 exported `attachDetailsToggle()` |
| No build tool | Vite 5, port 5173 |

## Stepper Rendering

The stepper is **inlined per view** — not a shared component. Each view's `render()` outputs its own stepper HTML with the correct `completed`/`active` classes for that step. The 5-step labels table above is the canonical source.

## Routing Strategy

Navigation is **in-memory only** — no browser History API, no URL hash changes. Clicking Previous/Next calls `navigate()` which swaps innerHTML. The browser back/forward buttons are not supported. "Back-navigation" in this spec always means clicking the Previous button, which is a `navigate()` call that keeps `state` intact.

## Out of Scope

- Browser back/forward button support
- Persistent state across page reloads
- Server-side rendering
- Unknown view name handling (falls back to view1)
