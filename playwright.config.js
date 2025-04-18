import { defineConfig } from '@playwright/test';

export default defineConfig({
    timeout: 30000, // ⏱️ общий таймаут для теста (включая все действия)
    expect: {
        timeout: 15000, // ⏱️ таймаут для expect(locator).toBeVisible(), toHaveText() и т.п.
    },
});