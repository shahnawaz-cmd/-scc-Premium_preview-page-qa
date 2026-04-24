# Test Plan — SCC Preview Page
**Jira Tickets:** V2-4765 · V2-4836
**Project:** V2 — SCC Preview Page (Next.js)
**Environment:** Production (smartcarcheck.uk / mrexplainervideos.com)
**Prepared By:** Muhammad Shahnawaz (QA Engineer)
**Date:** 24 April 2026
**Sprint:** V2 Sprint 89 / V2 Sprint 90

---

## 1. Objective

Verify the SCC Preview Page built in Next.js is fully functional, integrated with the CWA checkout, and meets all requirements defined in V2-4765 and V2-4836 — including API integrations, coupon logic, plan selection, Search Again, email popup, checkout flow, responsive design, and site settings.

---

## 2. Scope

### In Scope
- Preview page sections (Vehicle Specs, MOT/Tax, Fuel, Performance, Check Summary)
- Plan selection (Premium plans, Save tags, default plan from site settings)
- Coupon code application and price display
- Email popup (Access Records / Upgrade flow)
- Register API → Checkout navigation
- Search Again feature (REG and VIN)
- Exit intent banner
- UTM params tracking
- Responsive layout (mobile, tablet, desktop)
- Checkout page (plan match, REG/VIN display, gateway, colors)
- Post-payment member area redirect
- Site settings integration (gateway, colors, plan defaults)
- Multi-site support (SCC UK, MRE EU, VIN UK)

### Out of Scope
- Payment processing (card transactions)
- Admin panel backend logic
- Third-party API internals (DVLA, ULEZ)

---

## 3. Test Types

| Type | Coverage |
|------|---------|
| Functional | All user flows end-to-end |
| UI/UX | Layout, labels, pricing display, responsive |
| API | Register API, Coupon API, Preview Analysis API, Decode API |
| Integration | Preview → Checkout → Member Area |
| Regression | Re-test all issues from DEV CIT R1 and R2 |

---

## 4. Test URLs

| Site | URL |
|------|-----|
| SCC UK (REG) | `https://smartcarcheck.uk/members/preview?type=vhr&reg=YA66FTX` |
| SCC UK (VIN) | `https://smartcarcheck.uk/landing/preview?type=vhr&vin=WF0AXXWPMADG19130` |
| MRE EU (VIN) | `https://mrexplainervideos.com/members/preview?type=vhr&vin=W0L0AHL70A8090303` |
| Test REG | `LG64YBK` (has ULEZ data, fuel/running cost data) |

---

## 5. Issues Found in QA Cycles (Source: V2-4836 Comments)

### DEV CIT R1 — FAILED (1 Sep 2025) — 14 Issues
| # | Issue |
|---|-------|
| P#1 | Coupon applied — Plan 1 total price displayed incorrectly |
| P#2 | Upgrade banner shows actual price instead of discounted price |
| P#3 | Search Again — works with REG only; email input gets stuck; button stays "Searching" after cancel |
| P#4 | Running Costs – 6 Months Tax Values showing incorrect values for all VINs/REGs |
| P#5 | Email popup buttons (Access / Later) invisible on screens below 1600px |
| P#6 | ULEZ data missing for plates that have it (e.g. LG64YBK) |
| P#7 | VIN input field shows "Reg num" placeholder instead of "VIN num" |
| P#8 | Default plan from site settings not applied — plan pre-selected ignoring settings |
| P#9 | Checkout page — REG/VIN label below YMM should be dynamic (REG vs VIN) |
| P#10 | Order summary shows only report — should show Basic and Premium options |
| P#11 | Paystack shown even when only Stripe is active in site settings |
| P#12 | Post-payment progress bar popup cancels on outside click; Check Vehicle button locked |
| P#13 | Checkout error page → Back → redirects to preview instead of checkout |
| P#14 | Premium upgrade price not updated when discount applied |
| P#15 | Checkout page colors not fetched from site settings |

### DEV CIT R2 — 3 Sep 2025 (3rd Build Verification)
| # | Status |
|---|--------|
| P#1 | ✅ Fixed |
| P#2 | ✅ Fixed |
| P#3 | ❌ Not Fixed |
| P#4 | ✅ Fixed |
| P#5 | ✅ Fixed |
| P#7 | ✅ Fixed |
| P#8 | ❌ Broken (default plan works but breaks tab switch) |
| P#9 | ✅ Fixed |
| P#10 | ✅ Fixed |
| P#11 | ✅ Fixed |
| P#12 | ✅ Fixed |
| P#13 | ❌ Not Fixed |
| P#14 | ✅ Fixed |
| P#15 | ✅ Fixed |

### Additional Issues Found (3 Sep 2025 — 2nd Build Verification)
- Plan 1 coupon representation missing (before/after price not shown)
- Top banner price static after coupon applied
- Vehicle First Registered Date section calls basic plan instead of premium
- P#3 close button closes window instead of terminating process
- P#8 still selects Plan 1 by default

### Savings Inconsistency (8 Sep 2025)
- Upgrade banner says "Save 15%" but plan card shows "Saved 28%" — mismatch

### PRODUCTION CIT — PASSED (5 Sep 2025)

---

## 6. Entry & Exit Criteria

### Entry
- Build deployed on target environment
- All P1 issues from previous cycle resolved
- Test URLs accessible

### Exit
- All test cases executed
- No P1/P2 open bugs
- Production CIT passed

---

## 7. Risk Assessment

| Risk | Level |
|------|-------|
| Register API intermittent 500 | 🔴 High |
| Coupon price calculation errors | 🔴 High |
| Default plan site settings not applied | 🟡 Medium |
| UTM params not persisted | 🟡 Medium |
| Responsive layout below 1600px | 🟡 Medium |

---

## 8. Sign-off

| Role | Name | Status |
|------|------|--------|
| QA Engineer | Muhammad Shahnawaz | ✅ |
| Developer | Sebghatullah Yusuf Wakily | ⏳ |
| Product Owner | Zain Khan | ⏳ |
