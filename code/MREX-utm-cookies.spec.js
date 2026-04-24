const { test, expect } = require('@playwright/test');
const path = require('path');

const URL = 'https://mrexplainervideos.com/members/preview?reg=RE09XC0&utm_details=copilot&traffic_source=chatgpt';
const DIR = path.join(__dirname, '..', 'test-results', 'MREX-preview-page');

test('TC-15: UTM params utm_details=copilot & traffic_source=chatgpt saved in cookies', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto(URL, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  // Get all cookies
  const cookies = await context.cookies();
  console.log('\n--- All Cookies ---');
  cookies.forEach(c => console.log(`${c.name} = ${c.value}`));

  // Get localStorage and sessionStorage
  const storage = await page.evaluate(() => {
    const local = {};
    const session = {};
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      local[k] = localStorage.getItem(k);
    }
    for (let i = 0; i < sessionStorage.length; i++) {
      const k = sessionStorage.key(i);
      session[k] = sessionStorage.getItem(k);
    }
    return { local, session };
  });

  console.log('\n--- LocalStorage ---');
  Object.entries(storage.local).forEach(([k, v]) => console.log(`${k} = ${v}`));
  console.log('\n--- SessionStorage ---');
  Object.entries(storage.session).forEach(([k, v]) => console.log(`${k} = ${v}`));

  await page.screenshot({ path: `${DIR}\\TC15-utm-page-loaded.png`, fullPage: false });

  // Check cookies for UTM values
  const allCookieValues = cookies.map(c => `${c.name}=${c.value}`).join(' | ');
  const allStorageValues = JSON.stringify(storage);

  const utmInCookies = cookies.some(c =>
    c.value.includes('copilot') || c.value.includes('chatgpt') ||
    c.name.toLowerCase().includes('utm') || c.name.toLowerCase().includes('traffic')
  );

  const utmInStorage = allStorageValues.includes('copilot') || allStorageValues.includes('chatgpt') ||
    allStorageValues.includes('utm_details') || allStorageValues.includes('traffic_source');

  console.log(`\nUTM in Cookies: ${utmInCookies}`);
  console.log(`UTM in Storage: ${utmInStorage}`);

  await page.screenshot({ path: `${DIR}\\TC15-utm-cookies-verified.png`, fullPage: false });

  if (utmInCookies) {
    console.log('✅ TC-15 PASS: UTM params found in Cookies');
  } else if (utmInStorage) {
    console.log('✅ TC-15 PASS: UTM params found in LocalStorage/SessionStorage');
  } else {
    console.log('❌ TC-15 FAIL: UTM params NOT found in Cookies or Storage');
    console.log('All cookies:', allCookieValues);
  }

  expect(utmInCookies || utmInStorage).toBe(true);

  await context.close();
});
