# Test Cases — SCC Preview Page
**Jira:** V2-4765 · V2-4836
**Prepared By:** Muhammad Shahnawaz
**Date:** 24 April 2026

---

## Module 1 — Page Sections

| TC | Title | Steps | Expected | Status |
|----|-------|-------|----------|--------|
| TC-01 | Vehicle Specifications present | Open preview URL → check section | Make, Model, Cylinders, Fuel Type, Gears visible | ✅ |
| TC-02 | MOT and Tax Status present | Open preview URL → scroll to MOT section | MOT status and expiry date shown | ✅ |
| TC-03 | Fuel Consumption present | Scroll to Fuel section | Combined, Extra Urban, Urban Cold mpg values shown | ✅ |
| TC-04 | Vehicle Performance present | Scroll to Performance section | Power (BHP) and Max Speed (mph) shown | ✅ |
| TC-05 | Vehicle Check Summary present | Scroll to Check Summary | All check items visible with Reveal buttons | ✅ |
| TC-06 | What We Check For section present | Scroll to bottom | Feature table with Premium Report column visible | ✅ |
| TC-07 | ULEZ data shown for eligible plates | Open with REG `LG64YBK` | ULEZ section visible with correct data | ⬜ |
| TC-08 | Running Costs – 6 Months Tax correct | Open with any REG/VIN | 6-month tax value correct for the vehicle | ⬜ |
| TC-09 | Vehicle First Registered Date | Open preview | Date shown or "N/A" for historic vehicles | ✅ |

---

## Module 2 — Plan Selection & Pricing

| TC | Title | Steps | Expected | Status |
|----|-------|-------|----------|--------|
| TC-10 | All 3 premium plans visible | Scroll to plans section | 1 Report, 2 Reports, 3 Reports all shown | ✅ |
| TC-11 | Plan radio buttons selectable | Click each plan option | Selection changes correctly between plans | ✅ |
| TC-12 | Save tags visible on plans | Check plan cards | Save % tags shown on applicable plans | ✅ |
| TC-13 | Default plan from site settings applied | Open page without selecting plan | Plan pre-selected matches site settings default | ⬜ |
| TC-14 | Tab switch not broken by default plan | Select default plan → switch tabs | Tab switching works without breaking | ⬜ |
| TC-15 | Only Premium version shown | Open preview | No Basic plan option visible — Premium only | ⬜ |
| TC-16 | Upgrade banner shows correct savings % | Check upgrade banner text vs plan card | Banner % matches plan card % (no mismatch) | ⬜ |

---

## Module 3 — Coupon Code

| TC | Title | Steps | Expected | Status |
|----|-------|-------|----------|--------|
| TC-17 | Coupon applied — Plan 1 price correct | Apply coupon → check Plan 1 | Before price (strikethrough) + after price both shown | ⬜ |
| TC-18 | Coupon applied — all plans show before/after | Apply coupon → check all plans | All 3 plans show original and discounted price | ⬜ |
| TC-19 | Top banner price updates after coupon | Apply coupon → check top banner | Banner shows discounted price, not original | ⬜ |
| TC-20 | Upgrade banner price updates after coupon | Apply coupon → check upgrade banner | Upgrade banner shows discounted price | ✅ |
| TC-21 | Vehicle First Registered Date section price updates | Apply coupon → check date section | Discounted price shown, premium plan called | ⬜ |
| TC-22 | Coupon via URL param (&offer=get20) | Open URL with &offer=get20 | Plans show correct discounted prices (e.g. Saved 80%) | ✅ |
| TC-23 | Exit intent coupon (offer=preview10) | Trigger exit intent → click Take 10% off | URL contains offer=preview10, discount applied to plans | ⬜ |
| TC-24 | Invalid coupon shows error | Enter invalid coupon code | Error message shown, prices unchanged | ⬜ |

---

## Module 4 — Email Popup & Register API

| TC | Title | Steps | Expected | Status |
|----|-------|-------|----------|--------|
| TC-25 | Access Records opens email popup | Click Access Records button | "Secure Your Report" popup appears | ✅ |
| TC-26 | Email popup buttons visible below 1600px | Open on 1280px screen → click Access Records | Access and Later buttons fully visible | ⬜ |
| TC-27 | Enter email and submit → Register API called | Enter email → click Access Records in popup | Register API called, no 500 error | ⬜ |
| TC-28 | After email submit → navigate to checkout | Enter email → submit | Redirected to checkout page | ✅ |
| TC-29 | Upgrade option popup → email → checkout | Click Upgrade → enter email → submit | Register API called → redirected to checkout | ⬜ |
| TC-30 | Continue button works | Click Continue button | Proceeds to next step without error | ⬜ |
| TC-31 | Popup close button terminates process | Open popup → click X | Popup closes AND process terminates (not just closes window) | ⬜ |

---

## Module 5 — Search Again

| TC | Title | Steps | Expected | Status |
|----|-------|-------|----------|--------|
| TC-32 | Search Again popup opens | Click Search Again link | "Search Another Vehicle" popup appears | ✅ |
| TC-33 | Search with REG number | Enter REG in popup → click Search Vehicle | New vehicle page loads with correct data | ✅ |
| TC-34 | Search with VIN number | Enter VIN in popup → click Search Vehicle | New vehicle page loads with correct data | ✅ |
| TC-35 | VIN input shows correct placeholder | Click VIN input field | Placeholder shows "VIN num" not "Reg num" | ⬜ |
| TC-36 | Search Again decodes new vehicle (not cached) | Enter different REG → search | New vehicle data loaded, not previous result | ⬜ |
| TC-37 | Cancel and reopen resets button text | Start search → cancel → reopen | Button shows "Search Vehicle" not "Searching" | ⬜ |

---

## Module 6 — Preview to Checkout Flow

| TC | Title | Steps | Expected | Status |
|----|-------|-------|----------|--------|
| TC-38 | Selected plan carried to checkout | Select Plan 2 → submit email → checkout | Checkout shows Plan 2 with matching price | ✅ |
| TC-39 | Checkout shows REG when REG used | Open with REG → go to checkout | Checkout displays REG label and number | ⬜ |
| TC-40 | Checkout shows VIN when VIN used | Open with VIN → go to checkout | Checkout displays VIN label and number | ⬜ |
| TC-41 | Checkout error page → Back → returns to checkout | Trigger card error → click Back | Returns to checkout, not preview | ⬜ |
| TC-42 | Checkout uses CWA checkout (not SCC old) | Complete flow to checkout | CWA checkout page loads | ✅ |
| TC-43 | Checkout colors from site settings | Check checkout page colors | Primary/secondary colors match site settings | ⬜ |
| TC-44 | Only active gateway shown on checkout | Set only Stripe in site settings → checkout | Only Stripe shown, Paystack hidden | ⬜ |

---

## Module 7 — Post-Payment & Member Area

| TC | Title | Steps | Expected | Status |
|----|-------|-------|----------|--------|
| TC-45 | Progress bar popup stays on outside click | Complete payment → click outside popup | Popup remains open, not dismissed | ⬜ |
| TC-46 | Check Vehicle button works after payment | Complete payment → click Check Vehicle | Vehicle check initiates successfully | ⬜ |

---

## Module 8 — Responsive Design

| TC | Title | Steps | Expected | Status |
|----|-------|-------|----------|--------|
| TC-47 | Desktop layout (1440px) | Open at 1440px | All sections render correctly | ✅ |
| TC-48 | Tablet layout (768px) | Open at 768px | All sections render correctly | ✅ |
| TC-49 | Mobile layout (375px) | Open at 375px | All sections render correctly | ✅ |
| TC-50 | Email popup at 1280px | Open at 1280px → trigger popup | Access and Later buttons fully visible | ⬜ |

---

## Module 9 — Multi-Site & Site Settings

| TC | Title | Steps | Expected | Status |
|----|-------|-------|----------|--------|
| TC-51 | SCC UK REG URL works | Open SCC UK REG URL | Preview page loads with correct vehicle | ✅ |
| TC-52 | SCC UK VIN URL works | Open SCC UK VIN URL | Preview page loads with correct vehicle | ✅ |
| TC-53 | MRE EU VIN URL works | Open MRE EU VIN URL | Preview page loads with correct vehicle | ✅ |
| TC-54 | Sample report URLs distinct | Click Basic sample → click Premium sample | Each opens different sample report URL | ⬜ |
| TC-55 | Site settings — Premium/Basic page type | Configure in site settings | Correct page type loaded per setting | ⬜ |

---

## Module 10 — UTM & Tracking

| TC | Title | Steps | Expected | Status |
|----|-------|-------|----------|--------|
| TC-56 | UTM params saved in cookies | Open URL with utm_details + traffic_source | Values saved in cookies or localStorage | ❌ BUG-03 |
| TC-57 | UTM params passed to checkout | Open with UTM → go to checkout | UTM values present in checkout URL or payload | ⬜ |

---

## Summary

| Module | Total | ✅ Pass | ❌ Fail | ⬜ Not Tested |
|--------|-------|---------|---------|--------------|
| Page Sections | 9 | 6 | 0 | 3 |
| Plan Selection | 7 | 3 | 0 | 4 |
| Coupon Code | 8 | 2 | 1 | 5 |
| Email Popup | 7 | 3 | 0 | 4 |
| Search Again | 6 | 3 | 0 | 3 |
| Preview → Checkout | 7 | 3 | 0 | 4 |
| Post-Payment | 2 | 0 | 0 | 2 |
| Responsive | 4 | 3 | 0 | 1 |
| Multi-Site | 5 | 3 | 0 | 2 |
| UTM & Tracking | 2 | 0 | 1 | 1 |
| **Total** | **57** | **26** | **2** | **29** |
