const { test, expect } = require('@playwright/test');
const path = require('path');

const BASE_URL = 'https://mrexplainervideos.com/members/preview?reg=RE09XC0';
const DIR = path.join(__dirname, '..', 'test-results', 'MREX-preview-page');

test('TC-12: Exit Intent Banner — Take 10% off adds offer=preview10 to URL', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Trigger exit intent by moving mouse to top of viewport (simulates leaving to URL bar)
  await page.mouse.move(400, 400);
  await page.waitForTimeout(500);
  await page.mouse.move(400, 0); // move toward top/URL bar
  await page.waitForTimeout(2000);

  // Check if banner appeared
  const banner = page.locator('text=Don\'t Leave Yet').or(page.locator('text=Get 10% OFF'));
  const bannerVisible = await banner.isVisible({ timeout: 5000 }).catch(() => false);

  if (!bannerVisible) {
    // Force via JS event as fallback
    await page.evaluate(() => {
      document.dispatchEvent(new MouseEvent('mouseleave', { bubbles: true, clientY: 0 }));
    });
    await page.waitForTimeout(2000);
  }

  await page.screenshot({ path: `${DIR}\\TC12-exit-intent-banner.png` });
  console.log('Banner visible:', await banner.isVisible().catch(() => false));

  // Click "Take 10% off" button
  await page.locator('text=Take 10% off').click();
  await page.waitForTimeout(2000);
  await page.screenshot({ path: `${DIR}\\TC12-after-take-10-off.png` });

  const currentURL = page.url();
  console.log('URL after click:', currentURL);

  // Verify offer=preview10 in URL
  const hasOffer = currentURL.includes('offer=preview10');
  console.log(`${hasOffer ? '✅' : '❌'} offer=preview10 in URL: ${hasOffer}`);
  expect(currentURL).toContain('offer=preview10');
  console.log('✅ TC-12 PASS: Exit intent banner clicked, URL contains offer=preview10');

  await context.close();
});

test('TC-13: Manual Coupon &offer=get20 — 1 Premium Report shows Saved 80%', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Navigate with coupon applied
  const couponURL = `${BASE_URL}&offer=get20`;
  await page.goto(couponURL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(2000);

  console.log('URL loaded:', page.url());

  // Scroll to Premium Plans section
  await page.evaluate(() => {
    const el = document.querySelector('[class*="plan"], [class*="pricing"], [class*="package"]');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  });
  await page.locator('text=Get Premium').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.screenshot({ path: `${DIR}\\TC13-coupon-plans-section.png`, fullPage: false });

  // Verify Saved 80% tag on 1 Premium Report plan
  const saved80 = page.locator('text=Saved 80%').or(page.locator('text=Save 80%')).first();
  const isSaved80Visible = await saved80.isVisible({ timeout: 10000 }).catch(() => false);

  await page.screenshot({ path: `${DIR}\\TC13-coupon-save-tag.png`, fullPage: false });

  if (isSaved80Visible) {
    console.log('✅ TC-13 PASS: Saved 80% tag visible on 1 Premium Report plan');
  } else {
    // Capture what save tags ARE visible
    const allSaveTags = await page.locator('text=/Save|Saved/i').allInnerTexts();
    console.log('❌ TC-13 FAIL: Saved 80% not found. Visible save tags:', allSaveTags);
  }

  expect(isSaved80Visible).toBe(true);

  await context.close();
});
