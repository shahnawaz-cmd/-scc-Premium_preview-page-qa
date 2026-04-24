const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './code',
  timeout: 60000,
  use: {
    headless: false,
    video: { mode: 'on', dir: './test-results/MREX-preview-page' },
  },
  outputDir: './test-results/MREX-preview-page',
});
