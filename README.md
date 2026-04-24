# SCC Preview Page — QA Automation

Playwright automation suite for the **SCC Premium Preview Page** (`mrexplainervideos.com`).
Covers section validation, responsive testing, plan selection, exit intent banner, coupon verification, UTM tracking, and preview-to-checkout flow — with screenshot & video evidence.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install @playwright/test
npx playwright install chromium

# Run all tests
npx playwright test

# Run a specific test file
npx playwright test code/MREX-preview-page.spec.js
```

---

## 📁 Project Structure

```
scc-preview-page-qa/
├── code/
│   ├── MREX-preview-page.spec.js       # TC-01 to TC-10 — core sections + responsive
│   ├── MREX-search-again.spec.js       # TC-11 — Search Again with new VIN
│   ├── MREX-coupon-exit-intent.spec.js # TC-12, TC-13 — exit intent & coupon
│   ├── MREX-plan-checkout.spec.js      # TC-14a, TC-14b — plan selection & checkout
│   └── MREX-utm-cookies.spec.js        # TC-15 — UTM params in cookies
├── reports/
│   ├── MREX-SCC-QA-Report.html         # Full HTML report with embedded screenshots
│   └── MREX-SCC-Preview-Page-QA-Report.md
├── test-results/
│   └── MREX-preview-page/              # Screenshots & videos
└── playwright.config.js
```

---

## 🧪 Test Coverage

| TC | Test | Status |
|----|------|--------|
| TC-01 | Vehicle Specifications present with data | ✅ Pass |
| TC-02 | MOT and Tax Status section present | ✅ Pass |
| TC-03 | Fuel Consumption & Vehicle Performance | ✅ Pass |
| TC-04 | Vehicle Check Summary — Reveal All & View Sample Report | ✅ Pass |
| TC-05 | Premium Plans — pricing, Save tag, plan options | ✅ Pass |
| TC-06 | Access Records button interaction | ✅ Pass |
| TC-07 | What We Check For section | ✅ Pass |
| TC-08 | View Plans button clickable | ✅ Pass |
| TC-09 | Search Again link present | ✅ Pass |
| TC-10 | Responsive — Desktop / Tablet / Mobile | ✅ Pass |
| TC-11 | Search Again — new VIN (1999 Yamaha YZF R1) | ✅ Pass |
| TC-12 | Exit Intent Banner → offer=preview10 in URL | ✅ Pass |
| TC-13 | Coupon &offer=get20 → Saved 80% on 1 Premium Report | ✅ Pass |
| TC-14a | Plan radio buttons movable (all 3 selectable) | ✅ Pass |
| TC-14b | Preview → Checkout plan matches selected plan | ✅ Pass |
| TC-15 | UTM params saved in cookies/storage | ❌ Fail — BUG-03 |

**16/17 Passed · 3 Bugs Found**

---

## 🐛 Bugs Found

| ID | Severity | Summary |
|----|----------|---------|
| BUG-01 | 🟡 Medium | Exit intent "Take 10% off" shows "Invalid coupon code" — discount not applied |
| BUG-02 | 🔴 High | Register API intermittently returns 500 — blocks preview → checkout navigation |
| BUG-03 | 🔴 High | UTM params (`utm_details`, `traffic_source`) not saved in cookies or storage |

---

## 🌐 Test URL

```
https://mrexplainervideos.com/members/preview?reg=RE09XC0
```

---

## 📊 Reports

Open the HTML report for full results with embedded screenshots:

```
reports/MREX-SCC-QA-Report.html
```

---

## 🛠 Tech Stack

| Tool | Purpose |
|------|---------|
| Playwright v1.59.1 | Test automation |
| Chromium | Browser |
| Node.js | Runtime |

---

*QA Engineer: Shahnawaz · 24 April 2026*
