# Wiki — SCC Preview Page QA Automation

## Table of Contents
1. [Project Overview](#1-project-overview)
2. [Test Environment](#2-test-environment)
3. [How to Run Tests](#3-how-to-run-tests)
4. [Test Cases Detail](#4-test-cases-detail)
5. [Bug Reports](#5-bug-reports)
6. [Evidence & Reports](#6-evidence--reports)
7. [Folder Structure](#7-folder-structure)

---

## 1. Project Overview

This repo contains the full Playwright automation suite for the **SCC Premium Preview Page** on `mrexplainervideos.com`.

The preview page is the entry point for users to check a vehicle's history before purchasing a premium report. It shows vehicle specs, MOT/tax status, fuel data, check summary, pricing plans, and leads users to checkout.

**Goal of this QA suite:**
- Verify all page sections render correctly
- Validate interactive elements (buttons, plans, popups)
- Test responsive layout across 3 viewports
- Verify coupon and exit intent flows
- Confirm UTM tracking is working
- Validate the full preview → checkout journey

---

## 2. Test Environment

| Item | Detail |
|------|--------|
| Site | mrexplainervideos.com (SCC — Smart Car Check) |
| Test URL | `https://mrexplainervideos.com/members/preview?reg=RE09XC0` |
| Vehicle | Volkswagen Golf GTI S-A DSG (REG: RE09XC0) |
| Environment | Production |
| Browser | Chromium (Playwright) |
| Tool | Playwright v1.59.1 |
| Test Date | 24 April 2026 |
| QA Engineer | Shahnawaz |

---

## 3. How to Run Tests

### Prerequisites
```bash
node -v        # Node.js required
npm install @playwright/test
npx playwright install chromium
```

### Run all tests
```bash
npx playwright test
```

### Run individual spec files
```bash
# Core sections + responsive
npx playwright test code/MREX-preview-page.spec.js

# Search Again with new VIN
npx playwright test code/MREX-search-again.spec.js

# Exit intent banner + coupon
npx playwright test code/MREX-coupon-exit-intent.spec.js

# Plan selection + checkout verification
npx playwright test code/MREX-plan-checkout.spec.js

# UTM params in cookies
npx playwright test code/MREX-utm-cookies.spec.js
```

### Run from VS Code
Press `F5` — uses `.vscode/launch.json` config.

### Screenshots & Videos
All evidence is auto-saved to:
```
test-results/MREX-preview-page/
```

---

## 4. Test Cases Detail

### TC-01 — Vehicle Specifications
**File:** `MREX-preview-page.spec.js`
Verifies the Vehicle Specifications section is present and shows correct data:
- Make, Model, Number of cylinders, Fuel type, Gears
- Vehicle First Registered Date

---

### TC-02 — MOT and Tax Status
Verifies the MOT and Tax Status section is present with status data.
For REG RE09XC0: MOT Exempt (Historic vehicle over 40 years old).

---

### TC-03 — Fuel Consumption & Vehicle Performance
Scrolls to verify both sections are visible:
- Fuel Consumption: Combined, Extra Urban, Urban Cold (mpg)
- Vehicle Performance: Power (BHP), Max Speed (mph)

---

### TC-04 — Vehicle Check Summary
Verifies the Vehicle Check Summary section with all check items.
Confirms **View Sample Report** and **Reveal All Records** buttons are visible and clickable.

---

### TC-05 — Premium Plans
Verifies the "Get Premium Car Check Report" section:
- All plan options visible
- Save tags present
- Plan options are clickable/selectable

---

### TC-06 — Access Records Button
Clicks the Access Records button and verifies interaction (scrolls to plans or opens popup).

---

### TC-07 — What We Check For
Scrolls to and verifies the "What We Check For" feature table is present.

---

### TC-08 — View Plans Button
Verifies the View Plans button is visible and responds to click.

---

### TC-09 — Search Again Link
Verifies the "Search Again!" link is present in the page header area.

---

### TC-10 — Responsive Testing
Tests layout at 3 viewports:
- Desktop: 1440 x 900
- Tablet: 768 x 1024
- Mobile: 375 x 812

Verifies key sections render without breakage at each size.

---

### TC-11 — Search Again Feature
Clicks "Search Again!", enters VIN `JYARN011000016647` (1999 Yamaha YZF R1), and verifies all sections on the new vehicle page.

Note: Fuel Consumption and Vehicle Performance are N/A for motorcycles — this is expected behaviour.

---

### TC-12 — Exit Intent Banner
Triggers the exit intent banner by moving mouse to top of viewport.
Clicks "Take 10% off" and verifies URL contains `offer=preview10`.

**Bug found:** "Invalid coupon code" toast shown — discount not applied (BUG-01).

---

### TC-13 — Manual Coupon
Navigates to URL with `&offer=get20` appended.
Verifies the 1 Premium Report plan shows **Saved 80%** tag.

---

### TC-14a — Plan Radio Buttons Movable
Clicks each plan option (1 Report, 3 Reports, 10 Reports) and verifies selection changes.

---

### TC-14b — Preview to Checkout Plan Match
1. Selects **1 Premium Report** on preview page
2. Clicks Access Records → enters email → submits
3. Verifies checkout page shows **1 Premium Report** at matching price (£14.99)

---

### TC-15 — UTM Params in Cookies
Navigates to URL with `&utm_details=copilot&traffic_source=chatgpt`.
Checks cookies, localStorage, and sessionStorage for UTM values.

**Result: FAIL** — UTM params not persisted anywhere (BUG-03).

---

## 5. Bug Reports

### BUG-01 — Medium | Exit Intent Coupon Invalid
- **Where:** Exit intent banner → "Take 10% off" button
- **Expected:** Plans show 10% discounted prices
- **Actual:** "Invalid coupon code" toast shown, prices unchanged
- **URL param added:** `offer=preview10` ✅ (URL correct, backend validation failing)

---

### BUG-02 — High | Register API 500 (Intermittent)
- **Where:** Preview → Access Records popup → submit email
- **Expected:** Navigate to checkout page
- **Actual:** `/register` API returns HTTP 500, user stuck on preview
- **Impact:** Blocks entire purchase flow
- **Status:** Intermittent — fixed during testing session, may recur

---

### BUG-03 — High | UTM Params Not Saved
- **Where:** Page load with UTM params in URL
- **Expected:** `utm_details` and `traffic_source` saved in cookies or localStorage
- **Actual:** No UTM data found in any browser storage
- **Impact:** All marketing attribution broken — can't track campaign conversions

---

## 6. Evidence & Reports

| File | Description |
|------|-------------|
| `reports/MREX-SCC-QA-Report.html` | Full HTML report — open in browser, all screenshots embedded |
| `reports/MREX-SCC-Preview-Page-QA-Report.md` | Markdown QA report |
| `test-results/MREX-preview-page/TC*.png` | Individual test screenshots |
| `test-results/MREX-preview-page/*.webm` | Video recordings per test |

---

## 7. Folder Structure

```
scc-preview-page-qa/
├── README.md
├── WIKI.md                              ← this file
├── playwright.config.js
├── .vscode/
│   └── launch.json                      # Run tests from VS Code with F5
├── code/
│   ├── MREX-preview-page.spec.js
│   ├── MREX-search-again.spec.js
│   ├── MREX-coupon-exit-intent.spec.js
│   ├── MREX-plan-checkout.spec.js
│   └── MREX-utm-cookies.spec.js
├── reports/
│   ├── MREX-SCC-QA-Report.html
│   └── MREX-SCC-Preview-Page-QA-Report.md
└── test-results/
    └── MREX-preview-page/
        ├── TC01-vehicle-specs.png
        ├── TC02-mot-tax.png
        ├── ...
        └── *.webm
```

---

*Last updated: 24 April 2026 · QA Engineer: Shahnawaz*
