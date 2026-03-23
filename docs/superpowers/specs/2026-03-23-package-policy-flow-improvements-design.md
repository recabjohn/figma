# Package Policy Flow Improvements — Design Spec

**Date:** 2026-03-23
**Status:** Approved
**Scope:** Additive changes only — no existing UI elements removed or restructured

---

## Problem

When a user selects both General Liability (GL) and Commercial Automobile (CA) on the Program Selection step, the system creates a Commercial Package Policy. However the Rate Indication page (view3) and Quote Details page (view4) do not visually reflect the combined nature of the package:

- GL and CA sections are hidden by default and must be manually toggled open
- There is no premium breakdown showing GL vs CA contribution to the total
- The Quote Details page shows only a flat total with no per-line visibility

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

### 1. view3 — Auto-show GL and CA sections on load (behavior fix)

**File:** `src/views/view3.js` — `attach()` function
**Type:** Behavior only, no HTML change

When the page loads, if both `state.selectedGL` and `state.selectedCA` are true (Package Policy), remove `display:none` from `#gl-section` and `#ca-section` so both are visible immediately without requiring the user to toggle them open.

**Condition:** Only when both GL and CA are selected. If only one line is selected, current behavior (hidden by default) is preserved.

---

### 2. view3 — Premium Breakdown Summary bar (new element)

**File:** `src/views/view3.js` — `render()` function
**Position:** Between the CA section (`#ca-section`) and the Taxes and Fees section header
**Type:** New HTML element, no existing elements modified

A read-only horizontal summary bar with three cells:

| GL Premium | CA Premium | Total Package Premium |
|---|---|---|
| $300.00 | $221.57 | $521.57 |

- Only rendered when `state.selectedGL && state.selectedCA` (Package Policy context)
- Styled consistently with the existing carrier row (white card, border, same font sizes)
- Values are static/hardcoded for prototype purposes (matching existing prototype data pattern)

---

### 3. view4 — Per-line breakdown under Total Premium (new element)

**File:** `src/views/view4.js` — `render()` function
**Position:** Directly below the existing `Total Premium $21.57` line
**Type:** New HTML element, no existing elements modified

A single collapsible row showing:

```
▶ GL: $300.00   CA: $221.57
```

- Collapsed by default; clicking the `▶` chevron expands to show the two line amounts inline
- Only rendered when `state.selectedGL && state.selectedCA`
- Uses existing chevron icon pattern (`fa-solid fa-chevron-right` / `fa-chevron-down`) already present in the codebase
- Font size and color match the existing premium row style (`font-size:13px`, `color:#23282c`)

---

## Constraints

- No existing HTML elements in any view are modified, removed, or reordered
- No existing labels, values, or field structures are changed
- New elements follow the existing inline-style pattern used throughout the codebase
- Changes are confined to `src/views/view3.js` and `src/views/view4.js`

---

## Files Changed

| File | Change |
|---|---|
| `src/views/view3.js` | Add premium breakdown bar in `render()`; auto-show GL/CA sections in `attach()` |
| `src/views/view4.js` | Add collapsible per-line breakdown row in `render()` and toggle handler in `attach()` |
