const { test, expect, chromium } = require('@playwright/test');
const path = require('path');

const URL = 'https://mrexplainervideos.com/members/preview?reg=RE09XC0';
const NEW_VIN = 'JYARN011000016647';
const DIR = path.join(__dirname, '..', 'test-results', 'MREX-preview-page');

test('TC-11: Search Again popup — enter VIN and verify new vehicle page', async ({ browser }) => {
  // Fresh context to avoid session/cookie issues
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  // Step 1: Click Search Again and wait for popup
  await page.locator('text=Search Again').first().dispatchEvent('click');
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${DIR}\\TC11-search-again-popup.png` });

  const popupVisible = await page.locator('text=Search Another Vehicle').isVisible().catch(() => false);
  console.log('Popup visible:', popupVisible);

  if (!popupVisible) {
    // Try regular click as fallback
    await page.locator('a:has-text("Search Again"), button:has-text("Search Again"), [href*="search"]').first().click();
    await page.waitForTimeout(3000);
    await page.screenshot({ path: `${DIR}\\TC11-search-again-popup-retry.png` });
  }

  // Step 2: Fill VIN input
  const vinInput = page.locator('input').first();
  await vinInput.waitFor({ state: 'visible', timeout: 15000 });
  await vinInput.fill(NEW_VIN);
  await page.screenshot({ path: `${DIR}\\TC11-vin-entered.png` });
  console.log(`✅ VIN entered: ${NEW_VIN}`);

  // Step 3: Click Search Vehicle
  await page.getByRole('button', { name: /search vehicle/i }).click();
  await page.waitForLoadState('domcontentloaded');
  await page.waitForTimeout(4000);
  console.log('URL after search:', page.url());

  // Step 4: Full page screenshot
  await page.screenshot({ path: `${DIR}\\TC11-new-vehicle-top.png`, fullPage: false });

  // Step 5: Verify all sections
  await expect(page.getByRole('heading', { name: 'Vehicle Specifications' })).toBeVisible({ timeout: 15000 });
  await page.screenshot({ path: `${DIR}\\TC11-section-vehicle-specs.png`, fullPage: false });
  console.log('✅ Vehicle Specifications present');

  await expect(page.getByRole('heading', { name: 'MOT and Tax Status' })).toBeVisible({ timeout: 10000 });
  await page.screenshot({ path: `${DIR}\\TC11-section-mot.png`, fullPage: false });
  console.log('✅ MOT and Tax Status present');

  await page.evaluate(() => window.scrollBy(0, 800));
  const hasFuel = await page.locator('text=Fuel Consumption').first().isVisible({ timeout: 8000 }).catch(() => false);
  const hasPerf = await page.locator('text=Vehicle Performance').first().isVisible({ timeout: 8000 }).catch(() => false);
  await page.screenshot({ path: `${DIR}\\TC11-section-fuel-performance.png`, fullPage: false });
  console.log(`${hasFuel ? '✅' : '⚠️'} Fuel Consumption: ${hasFuel ? 'present' : 'N/A for this vehicle'}`);
  console.log(`${hasPerf ? '✅' : '⚠️'} Vehicle Performance: ${hasPerf ? 'present' : 'N/A for this vehicle'}`);

  await page.evaluate(() => window.scrollBy(0, 800));
  await expect(page.locator('text=Vehicle Check Summary').first()).toBeVisible({ timeout: 10000 });
  await page.screenshot({ path: `${DIR}\\TC11-section-check-summary.png`, fullPage: false });
  console.log('✅ Vehicle Check Summary present');

  await page.evaluate(() => window.scrollBy(0, 800));
  await expect(page.locator('text=Get Premium').first()).toBeVisible({ timeout: 10000 });
  await expect(page.locator('text=Save').first()).toBeVisible({ timeout: 10000 });
  await page.screenshot({ path: `${DIR}\\TC11-section-plans.png`, fullPage: false });
  console.log('✅ Premium Plans present');

  await page.evaluate(() => window.scrollBy(0, 800));
  await expect(page.locator('text=What We Check For').first()).toBeVisible({ timeout: 10000 });
  await page.screenshot({ path: `${DIR}\\TC11-section-what-we-check.png`, fullPage: false });
  console.log('✅ What We Check For present');

  // Full page final screenshot
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: `${DIR}\\TC11-full-page-new-vehicle.png`, fullPage: true });
  console.log('✅ Full page screenshot captured');

  await context.close();
});
