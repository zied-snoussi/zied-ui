import { defineConfig } from 'vitest/config';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
import { fileURLToPath } from 'node:url';

/**
 * Every story is a test: it must render without errors, its `play` function
 * (interaction test) must pass and, for stories with `a11y.test: 'error'`,
 * axe must report no violations. Tests run in a real Chromium (Playwright).
 */
export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [storybookTest({ configDir: fileURLToPath(new URL('./.storybook', import.meta.url)) })],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: playwright({}),
            instances: [{ browser: 'chromium' }],
          },
        },
      },
    ],
    coverage: {
      provider: 'v8',
      include: ['src/components/**/*.tsx'],
      exclude: ['**/*.stories.tsx'],
      reporter: ['text-summary', 'html', 'lcov'],
    },
  },
});
