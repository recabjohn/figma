# Package Policy Flow Improvements — Design Spec

**Date:** 2026-03-23
**Status:** Approved (Prototype)
**Scope:** Additive changes only — no existing UI elements removed or restructured

---

## Problem

When a user selects both General Liability (GL) and Commercial Automobile (CA) on the Program Selection step, the system creates a Commercial Package Policy. The Rate Indication page (view3) and Quote Details page (view4) do not visually reflect the combined nature of the package:

- There is no premium breakdown showing GL vs CA contribution to the total on view3
- The Quote Details page (view4) shows only a flat total with no per-line visibility

**Note — auto-show behavior is already implemented:** `view3.js` `attach()` lines 239–240 already set `#gl-section` and `#ca-section` to `display:block` independently based on `state.selectedGL` / `state.selectedCA`. This behavior is correct and requires no change.

**Known existing issue (out of scope):** The view3 stepper shows "Program Selection" twice (steps 4 and 5). This is a pre-existing label bug and is intentionally left unchanged per user decision.

---

## Decisions

| Question | Answer |
|---|---|
| Premium display style | Breakdown per line (GL + CA = Total) |
| Quote record structure | One quote covers the whole package |
| Subjectivities grouping | Single mixed table with a "Line" column (existing behavior) |
| Stepper labels | Leave as-is |

---

## Changes

### 1. view3 — Premium Breakdown Summary bar (new element)

**File:** `src/views/view3.js` — `render()` function
**Position:** Insert as a sibling `<div>` immediately after the closing `</div>` of `#ca-section` (line 174), before the Taxes and Fees `<div class="section-header">` (line 177). The existing `style="margin-top:8px"` on the Taxes and Fees header is unchanged.
**Type:** New HTML element only — no existing elements modified

A read-only horizontal summary bar with three labeled cells:

| GL Premium | CA Premium | Total Package Premium |
|---|---|---|
| $300.00 | $500.00 | $800.00 |

- Only rendered when `state.selectedGL && state.selectedCA` (Package Policy). When only one line is selected, this element is not rendered — no impact on single-line flows.
- Styled: `background:#fff; border:1px solid #e1e6eb; border-radius:6px; padding:12px 16px; display:flex; gap:24px; margin-bottom:16px; font-size:13px;`
- CA value `$500.00` is consistent with the `$500.00` figure already shown in the CA Vehicle Schedule table row on the same page
- GL value `$300.00` is a hardcoded prototype value
- This bar represents the **rated premium** (pre-carrier-selection), which is distinct from the post-rating `$0.00` shown in the carrier row below. These are two different data points and intentionally show different values.

---

### 2. view4 — Per-line breakdown under Total Premium (new element)

**File:** `src/views/view4.js` — `render()` function and `attach()` function
**Position:** Directly below the existing `Total Premium $21.57` line (currently at view4.js line 55)
**Type:** New HTML elements; new click handler added in `attach()`

A collapsible inline row:

- **Collapsed state (default):** `▶ View line breakdown` rendered as `<span id="premium-breakdown-toggle">` in `font-size:13px; color:#2196f3; cursor:pointer`
- **Expanded state:** Chevron icon switches from `fa-chevron-right` to `fa-chevron-down`; a sibling `<span id="premium-breakdown-detail">` becomes visible showing `GL: $12.00   CA: $9.57` in `font-size:13px; color:#23282c`
- Hardcoded prototype values: GL = `$12.00`, CA = `$9.57` — sum = `$21.57`, matching the existing Total Premium figure on this page
- The view3 rated total (`$800.00`) and the view4 quoted total (`$21.57`) differ intentionally: view3 shows a pre-carrier-selection rated estimate; view4 shows the final quoted amount after carrier pricing. This is existing prototype data behavior and is not introduced by this change.
- Toggle state does **not** persist across navigation — resets to collapsed on each page load
- Only rendered when `state.selectedGL && state.selectedCA`

The `attach()` addition:
```js
const toggle = document.getElementById('premium-breakdown-toggle');
const detail = document.getElementById('premium-breakdown-detail');
if (toggle && detail) {
  toggle.addEventListener('click', () => {
    const isOpen = detail.style.display !== 'none';
    detail.style.display = isOpen ? 'none' : 'inline';
    toggle.querySelector('i').className = isOpen
      ? 'fa-solid fa-chevron-right'
      : 'fa-solid fa-chevron-down';
  });
}
```

---

## Constraints

- No existing HTML elements in any view are modified, removed, or reordered
- No existing labels, values, or field structures are changed
- New elements follow the existing inline-style pattern used throughout the codebase
- Changes are confined to `src/views/view3.js` and `src/views/view4.js`

---

## Files Changed

| File | Function | Change |
|---|---|---|
| `src/views/view3.js` | `render()` | Add premium breakdown summary bar after `#ca-section`, before Taxes & Fees |
| `src/views/view4.js` | `render()` | Add collapsible `#premium-breakdown-toggle` row below Total Premium line |
| `src/views/view4.js` | `attach()` | Add click handler for `#premium-breakdown-toggle` / `#premium-breakdown-detail` |
