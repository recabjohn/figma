# Vite + Vanilla JS Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the 3-page HTML insurance wizard into a Vite + vanilla JS SPA preserving all visual styling and interactive behavior exactly.

**Architecture:** Single `index.html` shell; `router.js` swaps `#app` innerHTML on navigation; each view exports `render()` + `attach()`; shared components return HTML strings; `state.js` replaces localStorage.

**Tech Stack:** Vite 5, vanilla JS (ES modules), pure CSS, Font Awesome 6.4.0 CDN, Google Fonts CDN

**Spec:** `docs/superpowers/specs/2026-03-19-vite-vanilla-js-migration-design.md`

---

## File Map

| File | Action | Responsibility |
|------|--------|----------------|
| `package.json` | Create | Vite project config + scripts |
| `index.html` | Replace | Thin shell with `#app` mount point |
| `public/download.jfif` | Move from root | Static logo asset |
| `src/main.js` | Create | Entry: import CSS + boot router |
| `src/router.js` | Create | `navigate(viewName)` — sets innerHTML + calls attach |
| `src/state.js` | Create | Shared in-memory state (`selectedGL`, `selectedCA`) |
| `src/styles/main.css` | Create | All CSS merged from 3 original HTML files |
| `src/components/header.js` | Create | `renderHeader({ showTools })` |
| `src/components/sidebar.js` | Create | `renderSidebar()` |
| `src/components/detailsPanel.js` | Create | `renderDetailsPanel(details)` + `attachDetailsToggle()` |
| `src/views/view1.js` | Create | Program Selection — render + attach |
| `src/views/view2.js` | Create | Risk/Coverage — render + attach |
| `src/views/view3.js` | Create | Rate Indication — render + attach |
| `page2.html`, `page3.html` | Keep | Reference only (do not delete) |

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`
- Replace: `index.html`
- Run: `mv download.jfif public/download.jfif` (create `public/` dir first)

- [ ] **Step 1: Create `public/` directory and move logo**

```bash
mkdir -p public
cp download.jfif public/download.jfif
```

- [ ] **Step 2: Create `package.json`**

Write exactly:

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

- [ ] **Step 3: Replace `index.html` with SPA shell**

Write exactly (replaces original index.html):

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

- [ ] **Step 4: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

---

## Task 2: CSS — Merged Stylesheet

**Files:**
- Create: `src/styles/main.css`

This is a direct merge of all `<style>` blocks from `index.html`, `page2.html`, and `page3.html` with duplicates removed. Do not invent new CSS — copy from source files exactly.

- [ ] **Step 1: Create `src/styles/` directory and write `main.css`**

```bash
mkdir -p src/styles
```

Write `src/styles/main.css` with the exact content below:

```css
/* ===========================
   CSS VARIABLES
   =========================== */
:root {
  --blue-primary: #1e3a62;
  --sidebar-bg: #22374C;
  --sidebar-active: #405D7C;
  --bg-canvas: #edf0f3;
  --green-success: #209E51;
  --text-main: #333333;
  --text-muted: #5d6773;
  --border-color: #d1d9df;
  --details-header: #4F6F8E;
  --btn-bg: #375471;
  --light-blue: #3e9fdd;
}

/* ===========================
   RESET
   =========================== */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* ===========================
   BODY
   =========================== */
body {
  font-family: "Roboto", sans-serif;
  background-color: var(--bg-canvas);
  color: var(--text-main);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  height: 100vh;
}

/* ===========================
   TOP HEADER
   =========================== */
.top-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 60px;
  background-color: #ffffff;
  padding: 0 24px;
  border-bottom: 2px solid #dde1e5;
  z-index: 20;
}
.logo {
  display: flex;
  align-items: center;
  user-select: none;
}
.header-tools {
  display: flex;
  align-items: center;
  gap: 24px;
  color: var(--text-muted);
  font-size: 18px;
}
.avatar {
  width: 32px;
  height: 32px;
  background-color: #55279b;
  color: #ffffff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
}

/* ===========================
   LAYOUT
   =========================== */
.main-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* ===========================
   SIDEBAR
   =========================== */
.sidebar {
  width: 60px;
  background: var(--sidebar-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
  gap: 12px;
  z-index: 10;
}
.side-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
}
.side-icon.active {
  background-color: var(--sidebar-active);
}

/* ===========================
   PAGE CONTENT
   =========================== */
.page-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}
.inner-canvas {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
}

/* ===========================
   STEPPER
   =========================== */
.stepper-wrapper {
  display: flex;
  flex-direction: column;
}
.stepper-card {
  background-color: #ffffff;
  padding: 16px 24px;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  display: flex;
  align-items: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  z-index: 2;
}
.step {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  color: #444;
  font-weight: 500;
  position: relative;
}
.step.completed {
  color: var(--green-success);
}
.step.completed i {
  font-size: 16px;
}
.step.active span {
  border-bottom: 2px solid var(--details-header);
  padding-bottom: 4px;
  color: #333;
}

/* ===========================
   SECONDARY TABS (view2)
   =========================== */
.secondary-tabs {
  display: flex;
  background: #fff;
  border-bottom: 1px solid var(--border-color);
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  width: fit-content;
  margin-top: -1px;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.03);
  padding: 0 8px;
}
.sec-tab {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-muted);
  cursor: pointer;
}
.sec-tab.active {
  color: var(--details-header);
}
.sec-tab.active span {
  text-decoration: underline;
  text-underline-offset: 4px;
}
.sec-tab i {
  font-size: 14px;
}

/* ===========================
   DETAILS PANEL
   =========================== */
.details-panel {
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  position: relative;
  transition: all 0.3s;
}
.details-panel.collapsed {
  border: none;
  box-shadow: none;
  background: transparent;
}
.details-header {
  background-color: var(--details-header);
  color: #ffffff;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 700;
  border-radius: 4px 4px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  user-select: none;
  gap: 16px;
}
.details-panel.collapsed .details-header {
  border-radius: 4px;
  padding: 8px 16px;
}
.details-grid {
  display: flex;
  justify-content: space-between;
  padding: 20px 24px;
}
.detail-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.detail-item .label {
  font-size: 12px;
  color: #4e5a66;
  font-weight: 700;
}
.detail-item .val {
  font-size: 13px;
  color: #222222;
  font-weight: 700;
}

/* ===========================
   PROGRAM INFO (view1)
   =========================== */
.program-info {
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}
.program-info h2 {
  font-size: 22px;
  color: #6c7682;
  font-weight: 700;
  margin-bottom: 12px;
}
.program-info .subtitle {
  font-size: 14px;
  color: #444;
  margin-bottom: 24px;
}
.checkbox-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.custom-check-row {
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  font-size: 13px;
  color: #444;
}
.custom-checkbox {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #a4afb7;
  border-radius: 2px;
  background-color: #ffffff;
  position: relative;
  outline: none;
  cursor: pointer;
}
.custom-checkbox:checked {
  background-color: #ffffff;
  border-color: #a4afb7;
}
.custom-checkbox:checked::after {
  content: "\f00c";
  font-family: "Font Awesome 5 Free";
  font-weight: 900;
  color: #5d6773;
  font-size: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* ===========================
   ACCORDION (view2)
   =========================== */
.accordion-card {
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  margin-bottom: auto;
}
.acc-row {
  display: flex;
  align-items: center;
  padding: 20px 24px;
  font-size: 14px;
  font-weight: 700;
  color: #222;
  cursor: pointer;
}
.acc-row:not(:last-child) {
  border-bottom: 2px solid #f0f3f6;
  padding-bottom: 40px;
}
.acc-icon {
  color: var(--text-muted);
  margin-right: 12px;
  font-size: 12px;
}
.plus-icon {
  color: var(--light-blue);
  margin-left: 12px;
  font-size: 16px;
}
.state-form-container {
  padding: 0 24px 32px 48px;
}
.form-group {
  margin-bottom: 24px;
}

/* ===========================
   FORM ELEMENTS
   =========================== */
.custom-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 13px;
  color: #555;
  outline: none;
  appearance: none;
  background: #fff url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="%23555" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>') no-repeat right 12px center;
  cursor: pointer;
}
.custom-select:disabled,
.custom-input:disabled {
  background-color: #f7f9fa;
  color: #999;
  cursor: not-allowed;
}
.custom-input {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 13px;
  color: #333;
  outline: none;
  background-color: #fff;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
}
.btn-save {
  background-color: var(--sidebar-bg);
  color: #ffffff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
.radio-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  font-size: 13px;
  color: #333;
}
.radio-labels {
  flex: 0 0 50%;
}
.radio-options {
  flex: 1;
  display: flex;
  gap: 120px;
}
.radio-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #333;
  cursor: pointer;
}
.custom-radio {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid var(--blue-primary);
  border-radius: 50%;
  position: relative;
  cursor: pointer;
  margin: 0;
}
.custom-radio:checked::after {
  content: "";
  width: 8px;
  height: 8px;
  background-color: var(--blue-primary);
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.floating-group {
  position: relative;
  margin-bottom: 24px;
}
.floating-group label {
  font-size: 11px;
  color: #5d6773;
  position: absolute;
  top: -16px;
  left: 0;
}
.subheader {
  font-size: 14px;
  font-weight: 700;
  color: #444;
  margin-top: 32px;
  margin-bottom: 16px;
}
.inner-card {
  border: 1px solid var(--border-color);
  border-radius: 4px;
  padding: 24px;
  margin-bottom: 24px;
  background-color: #fdfdfd;
}
.icon-input {
  position: relative;
}
.icon-input i {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #aeb6be;
  pointer-events: none;
}

/* ===========================
   VEHICLE TABLE (view2)
   =========================== */
.vehicle-table-container {
  margin: 0 24px 24px 44px;
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

/* ===========================
   DATA TABLE (view2 + view3)
   =========================== */
.table-container {
  background: #ffffff;
  border-radius: 6px;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 24px;
}
.v-table-header {
  display: flex;
  background-color: #dceaf4;
  padding: 12px 16px;
  font-size: 11px;
  font-weight: 500;
  color: #333;
}
.v-col {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.v-line {
  height: 1px;
  background-color: #a4b3c0;
  width: 80%;
}
.v-table-body {
  padding: 16px;
  text-align: center;
  font-size: 11px;
  font-weight: 700;
  color: #111;
  background-color: #ffffff;
}

/* ===========================
   WHITE CARD (view3)
   =========================== */
.white-card {
  background-color: #ffffff;
  border-radius: 4px;
  border: 1px solid var(--border-color);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
  padding: 24px;
  margin-bottom: 24px;
}
.card-title {
  font-size: 20px;
  color: #727a85;
  font-weight: 700;
  margin-bottom: 24px;
}
.grid-2col {
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
  row-gap: 32px;
}
.section-header {
  font-size: 16px;
  font-weight: 500;
  color: #727a85;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  gap: 12px;
}
.sub-plus {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  font-size: 10px;
  background-color: #8c97a3;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
}

/* ===========================
   TOGGLE SWITCH (view3)
   =========================== */
.toggle-row {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
  margin-bottom: 16px;
}
.toggle-label {
  font-size: 16px;
  font-weight: 500;
  color: #727a85;
  min-width: 200px;
}
.switch {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: .4s;
  border-radius: 20px;
}
.slider:before {
  position: absolute;
  content: "";
  height: 14px;
  width: 14px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: .4s;
  border-radius: 50%;
}
input:checked + .slider {
  background-color: #2196F3;
}
input:checked + .slider:before {
  transform: translateX(16px);
}

/* ===========================
   BUTTONS
   =========================== */
.bottom-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
}
.btn {
  border: none;
  padding: 8px 24px;
  border-radius: 4px;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
}
.btn-prev,
.btn-next {
  background-color: var(--btn-bg);
  color: #ffffff;
}

/* ===========================
   FOOTER
   =========================== */
.footer {
  height: 48px;
  background-color: #e6e9eb;
  border-top: 1px solid #d5dade;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  font-size: 12px;
  color: #6e7782;
  z-index: 10;
}
.footer .brand {
  color: var(--light-blue);
  font-weight: 500;
}
```

---

## Task 3: Core Modules

**Files:**
- Create: `src/state.js`
- Create: `src/router.js`
- Create: `src/main.js`

- [ ] **Step 1: Create `src/` directory structure**

```bash
mkdir -p src/components src/views src/styles
```

- [ ] **Step 2: Create `src/state.js`**

```js
export const state = {
  selectedGL: false,
  selectedCA: false,
};
```

- [ ] **Step 3: Create `src/router.js`**

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

- [ ] **Step 4: Create `src/main.js`**

```js
import './styles/main.css';
import { navigate } from './router.js';
navigate('view1');
```

---

## Task 4: Shared Components

**Files:**
- Create: `src/components/header.js`
- Create: `src/components/sidebar.js`
- Create: `src/components/detailsPanel.js`

- [ ] **Step 1: Create `src/components/header.js`**

```js
export function renderHeader({ showTools = false } = {}) {
  return `
    <header class="top-header">
      <div class="logo">
        <img src="/download.jfif" alt="Solartis" style="height: 28px; width: auto;" />
      </div>
      ${showTools ? `
        <div class="header-tools">
          <i class="fa-regular fa-file-lines" style="cursor: pointer"></i>
          <i class="fa-regular fa-bell" style="cursor: pointer"></i>
          <div class="avatar" style="cursor: pointer">U</div>
        </div>
      ` : ''}
    </header>
  `;
}
```

- [ ] **Step 2: Create `src/components/sidebar.js`**

```js
export function renderSidebar() {
  return `
    <aside class="sidebar">
      <div class="side-icon">
        <i class="fa-solid fa-home"></i>
      </div>
      <div class="side-icon active">
        <i class="fa-solid fa-edit"></i>
      </div>
      <div class="side-icon">
        <i class="fa-solid fa-search"></i>
      </div>
      <div class="side-icon">
        <i class="fa-solid fa-cog"></i>
      </div>
    </aside>
  `;
}
```

- [ ] **Step 3: Create `src/components/detailsPanel.js`**

```js
export function renderDetailsPanel(details) {
  const { agencyName, agentName, submissionNumber, submissionStatus, insuredName } = details;
  return `
    <div class="details-panel">
      <div class="details-header">
        <span>DETAILS</span>
        <i class="fa-solid fa-chevron-down" id="details-chevron"></i>
      </div>
      <div class="details-grid">
        <div class="detail-item">
          <span class="label">Agency Name</span>
          <span class="val">${agencyName}</span>
        </div>
        <div class="detail-item">
          <span class="label">Agent Name</span>
          <span class="val">${agentName}</span>
        </div>
        <div class="detail-item">
          <span class="label">Submission Number</span>
          <span class="val">${submissionNumber}</span>
        </div>
        <div class="detail-item">
          <span class="label">Submission Status</span>
          <span class="val">${submissionStatus}</span>
        </div>
        <div class="detail-item">
          <span class="label">Insured Name</span>
          <span class="val">${insuredName}</span>
        </div>
      </div>
    </div>
  `;
}

export function attachDetailsToggle() {
  const header = document.querySelector('.details-header');
  if (!header) return;
  header.addEventListener('click', () => {
    const panel = document.querySelector('.details-panel');
    const grid = document.querySelector('.details-grid');
    const icon = document.getElementById('details-chevron');
    if (!panel || !grid || !icon) return;
    if (panel.classList.contains('collapsed')) {
      panel.classList.remove('collapsed');
      grid.style.display = 'flex';
      icon.classList.remove('fa-chevron-right');
      icon.classList.add('fa-chevron-down');
    } else {
      panel.classList.add('collapsed');
      grid.style.display = 'none';
      icon.classList.remove('fa-chevron-down');
      icon.classList.add('fa-chevron-right');
    }
  });
}
```

---

## Task 5: view1.js — Program Selection

**Files:**
- Create: `src/views/view1.js`

This is a port of the original `index.html` content. Preserve the HTML structure exactly.

- [ ] **Step 1: Create `src/views/view1.js`**

```js
import { renderHeader } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderDetailsPanel, attachDetailsToggle } from '../components/detailsPanel.js';
import { state } from '../state.js';
import { navigate } from '../router.js';

const details = {
  agencyName: 'TestAgency9590',
  agentName: 'testagent1003',
  submissionNumber: 'SN131907',
  submissionStatus: 'In Progress',
  insuredName: 'test test',
};

export function render() {
  return `
    <div style="display:flex;flex-direction:column;height:100vh;">
      ${renderHeader({ showTools: false })}
      <div class="main-container">
        ${renderSidebar()}
        <main class="page-content">
          <div class="inner-canvas">

            <!-- STEPPER CARD -->
            <div class="stepper-card" style="gap:100px;">
              <div class="step completed">
                <i class="fa-solid fa-check-circle"></i>
                <span>Agency &amp; Agent</span>
              </div>
              <div class="step completed">
                <i class="fa-solid fa-check-circle"></i>
                <span>Insured Details</span>
              </div>
              <div class="step active">
                <i class="fa-solid fa-file-alt"></i>
                <span>Program Selection</span>
              </div>
              <div class="step">
                <i class="fa-solid fa-file-alt"></i>
                <span>Risk/Coverage</span>
              </div>
            </div>

            <!-- DETAILS PANEL -->
            ${renderDetailsPanel(details)}

            <!-- MAIN PROGRAM INFO CARD -->
            <div class="program-info">
              <h2>Program Information</h2>
              <div class="subtitle">Select Program</div>
              <div class="checkbox-container">
                <label class="custom-check-row">
                  <input type="checkbox" class="custom-checkbox" id="gl-check" ${state.selectedGL ? 'checked' : ''} />
                  General Liability
                </label>
                <label class="custom-check-row">
                  <input type="checkbox" class="custom-checkbox" id="ca-check" ${state.selectedCA ? 'checked' : ''} />
                  Commercial Automobile
                </label>
              </div>
            </div>

            <!-- BOTTOM BUTTONS -->
            <div class="bottom-actions">
              <button class="btn btn-prev">Previous</button>
              <button class="btn btn-next" id="nextBtn">Next</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  `;
}

export function attach() {
  const nextBtn = document.getElementById('nextBtn');
  nextBtn.addEventListener('click', () => {
    const glCheck = document.getElementById('gl-check');
    const caCheck = document.getElementById('ca-check');
    if (glCheck.checked && caCheck.checked) {
      state.selectedGL = glCheck.checked;
      state.selectedCA = caCheck.checked;
      navigate('view2');
    } else {
      alert('Please click both General Liability and Commercial Automobile to proceed.');
    }
  });
  attachDetailsToggle();
}
```

---

## Task 6: view2.js — Risk/Coverage

**Files:**
- Create: `src/views/view2.js`

This is a port of `page2.html`. The policy details form is very long — include every field verbatim from the original.

- [ ] **Step 1: Create `src/views/view2.js`**

```js
import { renderHeader } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderDetailsPanel, attachDetailsToggle } from '../components/detailsPanel.js';
import { navigate } from '../router.js';

const details = {
  agencyName: 'TestAgency9590',
  agentName: 'testagent1003',
  submissionNumber: 'SN131907',
  submissionStatus: 'In Progress',
  insuredName: 'test test',
};

export function render() {
  return `
    <div style="display:flex;flex-direction:column;height:100vh;">
      ${renderHeader({ showTools: true })}
      <div class="main-container">
        ${renderSidebar()}
        <main class="page-content">
          <div class="inner-canvas">

            <!-- STEPPER WRAPPER -->
            <div class="stepper-wrapper">
              <div class="stepper-card" style="gap:80px;">
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Agency &amp; Agent</span>
                </div>
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Insured Details</span>
                </div>
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Program Selection</span>
                </div>
                <div class="step active">
                  <i class="fa-solid fa-file-alt"></i>
                  <span>Risk/Coverage</span>
                </div>
                <div class="step">
                  <i class="fa-solid fa-file-alt"></i>
                  <span>Program Selection</span>
                </div>
              </div>
              <div class="secondary-tabs">
                <div class="sec-tab active" id="tab-gl">
                  <i class="fa-regular fa-circle-down"></i>
                  <span>General Liability</span>
                </div>
                <div class="sec-tab" id="tab-ca">
                  <i class="fa-regular fa-circle-down"></i>
                  <span>Commercial Automobile</span>
                </div>
              </div>
            </div>

            <!-- DETAILS PANEL -->
            ${renderDetailsPanel(details)}

            <!-- GL CONTENT -->
            <div id="content-gl">
              <div class="accordion-card">
                <div class="acc-row" id="state-row">
                  <i class="fa-solid fa-chevron-down acc-icon"></i>
                  STATE
                  <i class="fa-solid fa-circle-plus plus-icon" id="add-state-btn" style="cursor:pointer;"></i>
                </div>

                <div class="state-form-container" id="state-form" style="display:none;">
                  <div class="form-group" style="position:relative;margin-top:16px;">
                    <label id="lbl-state" style="display:none;font-size:11px;color:#5d6773;position:absolute;top:-16px;left:0;">State *</label>
                    <select class="custom-select" id="state-select">
                      <option value="" disabled selected hidden>State *</option>
                      <option value="AK">Alaska</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                    </select>
                  </div>
                  <div class="form-group" id="subline-group" style="display:none;position:relative;margin-top:28px;">
                    <label style="font-size:11px;color:#5d6773;position:absolute;top:-16px;left:0;">Subline *</label>
                    <select class="custom-select" id="subline-select">
                      <option value="" disabled selected hidden>Select</option>
                      <option value="1">Premises/Operations and Products/Completed Operations</option>
                      <option value="2">Premises/Operations</option>
                      <option value="3">Products/Completed Operations</option>
                      <option value="4">Liquor</option>
                      <option value="5">Owners and Contractors</option>
                      <option value="6">Pollution</option>
                      <option value="7">Product Withdrawal</option>
                      <option value="8">Railroad</option>
                      <option value="9">Underground Storage Tank</option>
                      <option value="10">Electronic Data Liability</option>
                    </select>
                  </div>
                  <div class="form-actions">
                    <button class="btn btn-save">Save</button>
                  </div>
                </div>

                <div class="acc-row" style="border-top:2px solid #f0f3f6;">
                  <i class="fa-solid fa-chevron-right acc-icon"></i>
                  RISK SCHEDULE
                </div>
              </div>
            </div>

            <!-- CA CONTENT -->
            <div id="content-ca" style="display:none;">
              <div class="accordion-card">
                <div class="acc-row" id="policy-row" style="border-bottom:2px solid #f0f3f6;">
                  <i class="fa-solid fa-chevron-down acc-icon"></i>
                  POLICY
                  <i class="fa-solid fa-circle-plus plus-icon" id="add-policy-btn" style="cursor:pointer;"></i>
                </div>

                <div class="state-form-container" id="policy-form-container" style="display:none;padding-bottom:24px;">
                  <div class="form-group" style="position:relative;">
                    <label id="lbl-policy-state" style="display:none;font-size:11px;color:#5d6773;position:absolute;top:-16px;left:0;">State *</label>
                    <select class="custom-select" id="policy-state-select">
                      <option value="" disabled selected hidden>State *</option>
                      <option value="AL">Alabama</option>
                      <option value="AK">Alaska</option>
                      <option value="CA">California</option>
                    </select>
                    <p id="policy-state-error" style="color:#d9534f;font-size:11px;margin-top:4px;display:none;">State is required.</p>
                  </div>

                  <div id="policy-details" style="display:none;margin-top:24px;">
                    <div class="floating-group">
                      <label>NAICS Code *</label>
                      <select class="custom-select"><option>111110</option></select>
                    </div>
                    <div class="floating-group">
                      <label>NAICS Definition *</label>
                      <select class="custom-select"><option>Soybean Farming</option></select>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">Symbol Rating Applies *</div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="sym" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="sym" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">Rate With RACA *</div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="raca" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="raca" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="floating-group">
                      <label>Policy Type *</label>
                      <select class="custom-select"><option>Business Auto Coverage Form</option></select>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">Individual Named Insured On The Policy *</div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="indi" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="indi" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="floating-group">
                      <label>Legal Entity</label>
                      <select class="custom-select"><option>Corporation</option></select>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">Accept Certified Acts Of Terrorism Coverage *</div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="terr" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="terr" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="floating-group">
                      <label>Liability Deductible *</label>
                      <select class="custom-select"><option>No Deductible</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Ride Sharing Arrangements Endorsement Indicator *</label>
                      <select class="custom-select"><option>Not Applicable</option></select>
                    </div>

                    <div class="subheader">Uninsured Motorists Coverage</div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Uninsured Motorists Coverage Type *</option></select>
                    </div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Uninsured Motorists Coverage Combined Single Limit *</option></select>
                    </div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Uninsured Motorists Coverage Split Limit *</option></select>
                    </div>

                    <div class="radio-row">
                      <div class="radio-labels">
                        <div>Gross Receipts Basis Or Mileage Basis</div>
                        <div style="font-size:11px;margin-top:4px;">Gross Receipts Basis Or Mileage Basis *</div>
                      </div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="gross" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="gross" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">
                        <div>Experience Rating</div>
                        <div style="font-size:11px;margin-top:4px;">Experience Rating</div>
                      </div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="exp" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="exp" class="custom-radio"> Yes</label>
                      </div>
                    </div>
                    <div class="radio-row">
                      <div class="radio-labels">
                        <div>Schedule Rating</div>
                        <div style="font-size:11px;margin-top:4px;">Schedule Rating Applies</div>
                      </div>
                      <div class="radio-options">
                        <label class="radio-option"><input type="radio" name="sch" checked class="custom-radio"> No</label>
                        <label class="radio-option"><input type="radio" name="sch" class="custom-radio"> Yes</label>
                      </div>
                    </div>

                    <div class="subheader">Minimum Premiums</div>
                    <div style="font-size:11px;color:#5d6773;margin-bottom:12px;">Auto Dealers Liability Premium To Reach Minimum Coverage</div>
                    <div style="font-size:11px;color:#5d6773;margin-bottom:24px;">Special Types Repossessed Auto Liability Premium To Reach Minimum Coverage</div>

                    <div class="inner-card">
                      <div class="subheader" style="margin-top:0;">Non-Truckers Liability Coverage</div>
                      <div class="floating-group">
                        <label>Liability Coverage Type *</label>
                        <select class="custom-select"><option>Combined Single Limit</option></select>
                      </div>
                      <div class="floating-group">
                        <p style="font-size:11px;color:#5d6773;margin-bottom:4px;">Liability Premium</p>
                        <label>Liability Limit *</label>
                        <select class="custom-select"><option>500,000</option></select>
                      </div>
                      <div style="font-size:11px;color:#5d6773;margin-bottom:4px;">Liability Deductible</div>
                      <div class="radio-row">
                        <div class="radio-labels">With Hold Harmless Agreement *</div>
                        <div class="radio-options">
                          <label class="radio-option"><input type="radio" name="hold" checked class="custom-radio"> No</label>
                          <label class="radio-option"><input type="radio" name="hold" class="custom-radio"> Yes</label>
                        </div>
                      </div>
                      <div class="floating-group">
                        <label>Cost Of Hire - Insured Providing Primary *</label>
                        <input type="text" class="custom-input" value="0">
                      </div>
                      <div class="floating-group">
                        <label>Cost Of Hire - Insured Providing Excess *</label>
                        <input type="text" class="custom-input" value="0">
                      </div>
                    </div>

                    <div class="subheader">Physical Damage Coverages</div>
                    <div class="floating-group">
                      <label>Other Than Collision Coverage Type *</label>
                      <select class="custom-select"><option>No Coverage</option></select>
                    </div>
                    <div class="floating-group">
                      <p style="font-size:11px;color:#5d6773;margin-bottom:4px;">Other Than Collision Premium</p>
                      <label>Deductible *</label>
                      <select class="custom-select"><option>Not Applicable</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Collision Coverage Type *</label>
                      <select class="custom-select"><option>No Coverage</option></select>
                    </div>
                    <div class="floating-group">
                      <p style="font-size:11px;color:#5d6773;margin-bottom:4px;">Collision Premium</p>
                      <label>Deductible *</label>
                      <select class="custom-select"><option>Not Applicable</option></select>
                    </div>
                    <div class="floating-group">
                      <input type="text" class="custom-input" placeholder="Zip Code">
                    </div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Non-Ownership Risk Type *</option></select>
                    </div>
                    <div class="floating-group">
                      <label>Number Of Employees *</label>
                      <input type="text" class="custom-input" value="0">
                    </div>
                    <div class="floating-group">
                      <input type="text" class="custom-input" placeholder="Garaging Location">
                    </div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Zip Code *</option></select>
                    </div>
                    <div class="floating-group">
                      <select class="custom-select"><option disabled selected hidden>Territory *</option></select>
                    </div>
                  </div>

                  <div class="form-actions" style="margin-top:24px;">
                    <button class="btn btn-save" id="policy-save-btn">Save</button>
                  </div>
                </div>

                <div class="acc-row" style="padding-bottom:24px;border-top:2px solid #f0f3f6;border-bottom:none;">
                  <i class="fa-solid fa-chevron-down acc-icon"></i>
                  VEHICLE
                  <i class="fa-solid fa-circle-plus plus-icon" style="cursor:pointer;"></i>
                </div>

                <div class="vehicle-table-container">
                  <div class="v-table-header">
                    <div class="v-col">Unit<div class="v-line"></div></div>
                    <div class="v-col">Class Code<div class="v-line"></div></div>
                    <div class="v-col">Original Cost New<div class="v-line"></div></div>
                    <div class="v-col">State<div class="v-line"></div></div>
                    <div class="v-col">Year<div class="v-line"></div></div>
                    <div class="v-col">Make<div class="v-line"></div></div>
                    <div class="v-col">Model<div class="v-line"></div></div>
                    <div class="v-col">VIN<div class="v-line"></div></div>
                    <div class="v-col">Vehicle Sub Types<div class="v-line"></div></div>
                    <div class="v-col" style="flex:0.5;">Action</div>
                  </div>
                  <div class="v-table-body">No Records To Display.</div>
                </div>
              </div>
            </div>

            <!-- BOTTOM BUTTONS -->
            <div class="bottom-actions">
              <button class="btn btn-prev" id="prevBtn2">Previous</button>
              <button class="btn btn-next" id="nextBtn2">Next</button>
            </div>

          </div>

          <footer class="footer">
            <div><span class="brand">Solartis</span> &copy; 2026</div>
            <div>Powered by <span class="brand">Solartis</span></div>
          </footer>
        </main>
      </div>
    </div>
  `;
}

export function attach() {
  // Tab switching
  const tabGL = document.getElementById('tab-gl');
  const tabCA = document.getElementById('tab-ca');
  const contentGL = document.getElementById('content-gl');
  const contentCA = document.getElementById('content-ca');

  tabGL.addEventListener('click', () => {
    tabGL.classList.add('active');
    tabCA.classList.remove('active');
    contentGL.style.display = 'block';
    contentCA.style.display = 'none';
  });
  tabCA.addEventListener('click', () => {
    tabCA.classList.add('active');
    tabGL.classList.remove('active');
    contentCA.style.display = 'block';
    contentGL.style.display = 'none';
  });

  // STATE accordion
  const addStateBtn = document.getElementById('add-state-btn');
  const stateForm = document.getElementById('state-form');
  const stateRow = document.getElementById('state-row');
  const stateSelect = document.getElementById('state-select');
  const lblState = document.getElementById('lbl-state');
  const sublineGroup = document.getElementById('subline-group');

  addStateBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (stateForm.style.display === 'none') {
      stateForm.style.display = 'block';
      stateRow.style.paddingBottom = '20px';
      stateRow.style.borderBottom = 'none';
    } else {
      stateForm.style.display = 'none';
      stateRow.style.paddingBottom = '40px';
      stateRow.style.borderBottom = '2px solid #f0f3f6';
    }
  });

  stateSelect.addEventListener('change', () => {
    if (stateSelect.value) {
      lblState.style.display = 'block';
      sublineGroup.style.display = 'block';
    } else {
      lblState.style.display = 'none';
      sublineGroup.style.display = 'none';
    }
  });

  // POLICY accordion
  const addPolicyBtn = document.getElementById('add-policy-btn');
  const policyFormContainer = document.getElementById('policy-form-container');
  const policyRow = document.getElementById('policy-row');
  const policyStateSelect = document.getElementById('policy-state-select');
  const policyDetails = document.getElementById('policy-details');
  const lblPolicyState = document.getElementById('lbl-policy-state');
  const policySaveBtn = document.getElementById('policy-save-btn');
  const policyStateError = document.getElementById('policy-state-error');

  addPolicyBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (policyFormContainer.style.display === 'none') {
      policyFormContainer.style.display = 'block';
      policyRow.style.paddingBottom = '20px';
      policyRow.style.borderBottom = 'none';
    } else {
      policyFormContainer.style.display = 'none';
      policyRow.style.paddingBottom = '40px';
      policyRow.style.borderBottom = '2px solid #f0f3f6';
    }
  });

  policyStateSelect.addEventListener('change', () => {
    if (policyStateSelect.value) {
      lblPolicyState.style.display = 'block';
      policyDetails.style.display = 'block';
      policyStateError.style.display = 'none';
    } else {
      lblPolicyState.style.display = 'none';
      policyDetails.style.display = 'none';
    }
  });

  policySaveBtn.addEventListener('click', () => {
    if (!policyStateSelect.value) {
      policyStateError.style.display = 'block';
    }
  });

  // Navigation
  document.getElementById('prevBtn2').addEventListener('click', () => navigate('view1'));
  document.getElementById('nextBtn2').addEventListener('click', () => navigate('view3'));

  attachDetailsToggle();
}
```

---

## Task 7: view3.js — Rate Indication

**Files:**
- Create: `src/views/view3.js`

This is a port of `page3.html`. GL and CA sections are conditionally shown from `state`.

- [ ] **Step 1: Create `src/views/view3.js`**

```js
import { renderHeader } from '../components/header.js';
import { renderSidebar } from '../components/sidebar.js';
import { renderDetailsPanel, attachDetailsToggle } from '../components/detailsPanel.js';
import { state } from '../state.js';
import { navigate } from '../router.js';

const details = {
  agencyName: 'TestAgency9590',
  agentName: 'testagent1003',
  submissionNumber: 'SN13203B',
  submissionStatus: 'In Progress',
  insuredName: 't t',
};

export function render() {
  return `
    <div style="display:flex;flex-direction:column;height:100vh;">
      ${renderHeader({ showTools: true })}
      <div class="main-container">
        ${renderSidebar()}
        <main class="page-content">
          <div class="inner-canvas">

            <!-- STEPPER WRAPPER -->
            <div class="stepper-wrapper">
              <div class="stepper-card" style="justify-content:space-between;">
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Agency &amp; Agent</span>
                </div>
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Insured Details</span>
                </div>
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Program Selection</span>
                </div>
                <div class="step completed">
                  <i class="fa-solid fa-check-circle"></i>
                  <span>Risk/Coverage</span>
                </div>
                <div class="step active">
                  <i class="fa-solid fa-file-alt"></i>
                  <span>Program Selection</span>
                </div>
              </div>
            </div>

            <!-- DETAILS PANEL -->
            ${renderDetailsPanel(details)}

            <!-- RATE INDICATION CARD -->
            <div class="white-card">
              <div class="card-title">Rate Indication</div>
              <div class="grid-2col">
                <div class="floating-group">
                  <label>Subline *</label>
                  <select class="custom-select" id="page3-subline-select">
                    <option>Package Policy</option>
                  </select>
                </div>
                <div class="floating-group">
                  <label>State *</label>
                  <select class="custom-select"><option>AL</option></select>
                </div>
                <div class="floating-group">
                  <label>State *</label>
                  <select class="custom-select"><option>AK-Premises/Operations and Products/Completed Operations</option></select>
                </div>
                <div class="floating-group">
                  <label>Effective Date</label>
                  <div class="icon-input">
                    <input type="text" class="custom-input" value="03/21/2026">
                    <i class="fa-regular fa-calendar" style="position:absolute;right:12px;top:18px;"></i>
                  </div>
                </div>
                <div class="floating-group">
                  <label>Expiration Date</label>
                  <div class="icon-input">
                    <input type="text" class="custom-input" value="03/21/2027">
                    <i class="fa-regular fa-calendar" style="position:absolute;right:12px;top:18px;"></i>
                  </div>
                </div>
                <div class="floating-group">
                  <label>Billing Type</label>
                  <select class="custom-select"><option>Agency Bill</option></select>
                </div>
                <div class="floating-group">
                  <label>Quote Type</label>
                  <select class="custom-select" disabled><option>New Business</option></select>
                </div>
              </div>
            </div>

            <!-- GL SECTION -->
            <div id="gl-section" style="display:none;">
              <div class="toggle-row">
                <div class="toggle-label">General liability</div>
                <label class="switch">
                  <input type="checkbox" checked id="gl-toggle">
                  <span class="slider"></span>
                </label>
              </div>
              <div id="gl-content">
                <div class="section-header">Risk Schedule</div>
                <div class="table-container">
                  <div class="v-table-header">
                    <div class="v-col">Subline</div>
                    <div class="v-col">State</div>
                    <div class="v-col">Location Number</div>
                  </div>
                  <div class="v-table-body">No Records To Display.</div>
                </div>
              </div>
            </div>

            <!-- CA SECTION -->
            <div id="ca-section" style="display:none;">
              <div class="toggle-row">
                <div class="toggle-label">Commercial Automobile</div>
                <label class="switch">
                  <input type="checkbox" checked id="ca-toggle">
                  <span class="slider"></span>
                </label>
              </div>
              <div id="ca-content">
                <div class="section-header" style="margin-top:8px;">Vehicle Schedule</div>
                <div class="table-container">
                  <div class="v-table-header">
                    <div class="v-col" style="flex:0.5">Unit</div>
                    <div class="v-col" style="flex:1.5">VehicleSubTypes</div>
                    <div class="v-col" style="flex:1">ClassCode</div>
                    <div class="v-col" style="flex:1.5">OriginalClassNew</div>
                    <div class="v-col" style="flex:0.8">State</div>
                    <div class="v-col" style="flex:0.8">City</div>
                    <div class="v-col" style="flex:1">VIN</div>
                    <div class="v-col" style="flex:0.8">Year</div>
                    <div class="v-col" style="flex:1">Make</div>
                    <div class="v-col" style="flex:1">Model</div>
                    <div class="v-col" style="flex:1">Premium</div>
                  </div>
                  <div class="v-table-body">No Records To Display.</div>
                </div>
              </div>
            </div>

            <!-- TAXES AND FEES -->
            <div class="section-header" style="margin-top:8px;">
              Taxes and Fees <span class="sub-plus"><i class="fa-solid fa-plus"></i></span>
            </div>
            <div class="table-container" style="margin-bottom:24px;">
              <div class="v-table-header">
                <div class="v-col">TAX</div>
                <div class="v-col">PERCENTAGE</div>
                <div class="v-col">Amount</div>
                <div class="v-col">Action</div>
              </div>
              <div class="v-table-body">No Records To Display.</div>
            </div>

            <!-- BOTTOM BUTTONS -->
            <div class="bottom-actions" style="margin-bottom:24px;">
              <button class="btn btn-prev" id="prevBtn3">Previous</button>
              <button class="btn btn-next" style="padding:8px 32px;">Save</button>
            </div>

          </div>
        </main>
      </div>
    </div>
  `;
}

export function attach() {
  // Populate subline from state
  const sublineSelect = document.getElementById('page3-subline-select');
  if (state.selectedGL && state.selectedCA) {
    sublineSelect.innerHTML = '<option>Commercial Package Policy</option>';
  } else if (state.selectedCA) {
    sublineSelect.innerHTML = '<option>Commercial Automobile</option>';
  } else if (state.selectedGL) {
    sublineSelect.innerHTML = '<option>General Liability</option>';
  } else {
    sublineSelect.innerHTML = '<option>Package Policy</option>';
  }

  // Show/hide GL and CA sections
  const glSection = document.getElementById('gl-section');
  const caSection = document.getElementById('ca-section');
  if (state.selectedGL) glSection.style.display = 'block';
  if (state.selectedCA) caSection.style.display = 'block';

  // Toggle switches
  const glToggle = document.getElementById('gl-toggle');
  const glContent = document.getElementById('gl-content');
  const caToggle = document.getElementById('ca-toggle');
  const caContent = document.getElementById('ca-content');

  if (glToggle) {
    glToggle.addEventListener('change', (e) => {
      glContent.style.display = e.target.checked ? 'block' : 'none';
    });
  }
  if (caToggle) {
    caToggle.addEventListener('change', (e) => {
      caContent.style.display = e.target.checked ? 'block' : 'none';
    });
  }

  // Navigation
  document.getElementById('prevBtn3').addEventListener('click', () => navigate('view2'));

  attachDetailsToggle();
}
```

---

## Task 8: Final Integration Verification

**Files:** None (verification only)

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

Expected output:
```
  VITE v5.x.x  ready in Xms
  ➜  Local:   http://localhost:5173/
```

- [ ] **Step 2: Verify view1 (Program Selection)**

Open `http://localhost:5173/` in browser.

Check:
- [ ] Logo image loads (white header, Solartis logo)
- [ ] Dark sidebar visible with edit icon highlighted
- [ ] Stepper shows: ✓ Agency & Agent | ✓ Insured Details | Program Selection (active, underlined) | Risk/Coverage
- [ ] DETAILS panel expanded with correct data (TestAgency9590, testagent1003, SN131907, In Progress, test test)
- [ ] DETAILS panel collapses/expands on click
- [ ] General Liability and Commercial Automobile checkboxes visible
- [ ] Clicking Next without both checked shows alert
- [ ] Checking both and clicking Next navigates to view2

- [ ] **Step 3: Verify view2 (Risk/Coverage)**

After navigating from view1:
- [ ] Stepper shows steps 1-3 completed, Risk/Coverage active
- [ ] Header shows file/bell icons and avatar
- [ ] GL and CA tabs visible, GL tab active by default
- [ ] GL tab: STATE accordion visible, clicking + expands state form
- [ ] Selecting a state in state form shows Subline dropdown
- [ ] Clicking CA tab: shows Policy and Vehicle content
- [ ] Clicking + on Policy expands policy form
- [ ] Selecting a state in policy form shows full policy details
- [ ] Clicking Save without state selected shows error message
- [ ] Previous button navigates back to view1 with checkboxes still checked
- [ ] Next button navigates to view3

- [ ] **Step 4: Verify view3 (Rate Indication)**

After navigating from view2:
- [ ] Stepper shows all 4 steps completed, step 5 active
- [ ] Subline dropdown shows "Commercial Package Policy" (both were checked)
- [ ] GL and CA sections visible with toggle switches
- [ ] Toggling GL switch hides/shows Risk Schedule table
- [ ] Toggling CA switch hides/shows Vehicle Schedule table
- [ ] Taxes and Fees table visible with "No Records To Display."
- [ ] Previous button navigates back to view2

- [ ] **Step 5: Build for production**

```bash
npm run build
```

Expected: `dist/` folder created, no errors.
