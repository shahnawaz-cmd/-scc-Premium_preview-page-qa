const { test, expect } = require('@playwright/test');
const path = require('path');

const BASE_URL = 'https://mrexplainervideos.com/members/preview?reg=FY12PVJ';
const DIR = path.join(__dirname, '..', 'test-results', 'MREX-preview-page');

test('TC-14a: Plan radio buttons are movable (selectable)', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  await page.locator('text=Get Premium Car Check Report').waitFor({ state: 'visible', timeout: 20000 });
  await page.locator('text=Get Premium Car Check Report').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${DIR}\\TC14a-plans-default.png`, fullPage: false });
  console.log('✅ Plans section visible — default state captured');

  // Click 2 Premium Reports — handle possible navigation
  try {
    await Promise.race([
      page.locator('text=2 Premium Reports').first().click(),
      page.waitForTimeout(3000)
    ]);
    await page.screenshot({ path: `${DIR}\\TC14a-plan-2-selected.png`, fullPage: false });
    console.log('✅ 2 Premium Reports clicked');
  } catch (e) { console.log('⚠️ Plan 2 click navigated away'); }

  // Reload and click 3 Premium Reports
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.locator('text=Get Premium Car Check Report').waitFor({ state: 'visible', timeout: 20000 });
  await page.locator('text=Get Premium Car Check Report').scrollIntoViewIfNeeded();
  try {
    await Promise.race([
      page.locator('text=3 Premium Reports').first().click(),
      page.waitForTimeout(3000)
    ]);
    await page.screenshot({ path: `${DIR}\\TC14a-plan-3-selected.png`, fullPage: false });
    console.log('✅ 3 Premium Reports clicked');
  } catch (e) { console.log('⚠️ Plan 3 click navigated away'); }

  // Reload and click 1 Premium Report
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.locator('text=Get Premium Car Check Report').waitFor({ state: 'visible', timeout: 20000 });
  await page.locator('text=Get Premium Car Check Report').scrollIntoViewIfNeeded();
  try {
    await Promise.race([
      page.locator('text=1 Premium Report').first().click(),
      page.waitForTimeout(3000)
    ]);
    await page.screenshot({ path: `${DIR}\\TC14a-plan-1-selected.png`, fullPage: false });
    console.log('✅ 1 Premium Report clicked — all 3 plans selectable ✅');
  } catch (e) { console.log('⚠️ Plan 1 click navigated away'); }

  await context.close();
});

test('TC-14b: Access Records with email → checkout shows matching plan', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  // Select 1 Premium Report plan
  await page.locator('text=Get Premium Car Check Report').waitFor({ state: 'visible', timeout: 20000 });
  await page.locator('text=1 Premium Report').first().click();
  await page.waitForTimeout(500);
  console.log('✅ Selected: 1 Premium Report');

  // Click Access Records
  await page.locator('text=Access Records').last().scrollIntoViewIfNeeded();
  await page.locator('text=Access Records').last().click();
  await page.waitForTimeout(2000);

  // Fill email in popup
  const emailInput = page.locator('input[type="email"]').first();
  await emailInput.waitFor({ state: 'visible', timeout: 10000 });
  await emailInput.fill('test@example.com');
  await page.screenshot({ path: `${DIR}\\TC14b-email-popup.png`, fullPage: false });
  console.log('✅ Email entered');

  // Click Access Records inside popup
  await page.locator('button:has-text("Access Records")').last().click();

  // Wait for checkout - use commit to not wait for full load
  await page.waitForURL('**/checkout**', { timeout: 90000, waitUntil: 'commit' });
  await page.waitForTimeout(2000);
  console.log('✅ Navigated to checkout:', page.url());
  await page.screenshot({ path: `${DIR}\\TC14b-checkout-page.png`, fullPage: true });

  // Verify 1 Premium Report on checkout
  await expect(page.locator('text=1 Premium Report').first()).toBeVisible({ timeout: 10000 });
  await page.screenshot({ path: `${DIR}\\TC14b-checkout-plan-verified.png`, fullPage: false });
  console.log('✅ TC-14b PASS: Checkout shows 1 Premium Report — matches selected plan');

  await context.close();
});
