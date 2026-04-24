const { test } = require('@playwright/test');
const path = require('path');
const DIR = path.join(__dirname, '..', 'test-results', 'MREX-preview-page');

test('debug search again', async ({ page }) => {
  await page.goto('https://mrexplainervideos.com/members/preview?reg=RE09XC0', { waitUntil: 'domcontentloaded' });
  await page.locator('text=Search Again').first().click();
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${DIR}\\debug-search-again.png`, fullPage: true });
  console.log('URL after click:', page.url());
  const buttons = await page.getByRole('button').allInnerTexts();
  console.log('BUTTONS:', buttons);
  const inputs = await page.locator('input').all();
  for (const i of inputs) {
    console.log('INPUT placeholder:', await i.getAttribute('placeholder'));
  }
});
