import { defineConfig } from 'tsup';
import { copyFileSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';

/**
 * Library build.
 * - 3 entry points (see package.json "exports")
 * - ESM with type declarations
 * - every chunk starts with "use client" so the components work in the Next.js App Router
 * - theme.css = the design tokens (globals.css without the Tailwind import) + an @source
 *   that makes Tailwind v4 scan this package's compiled classes.
 */
export default defineConfig({
  entry: {
    index: 'src/entries/index.ts',
    effects: 'src/entries/effects.ts',
    next: 'src/entries/next.ts',
  },
  format: ['esm'], // ESM only: CommonJS output cannot carry the "use client" directive
  dts: true,
  sourcemap: true,
  clean: true,
  treeshake: false, // rollup tree-shaking strips the "use client" directive; esbuild still removes dead code
  splitting: true,
  target: 'es2020',
  outDir: 'dist',
  tsconfig: 'tsconfig.build.json',
  banner: { js: '"use client";' },
  external: [/^next(\/|$)/, /^next-intl/, /^next-themes/, 'react', 'react-dom'],
  async onSuccess() {
    const css = readFileSync('src/styles/globals.css', 'utf8')
      .replace(/^@import\s+["']tailwindcss["'];?\s*$/m, '/* Import Tailwind CSS v4 in your app before this file: @import "tailwindcss"; */\n@source "./";');
    writeFileSync('dist/theme.css', css);
    mkdirSync('dist/messages', { recursive: true });
    for (const locale of ['en', 'fr', 'ar']) copyFileSync(`src/messages/${locale}.json`, `dist/messages/${locale}.json`);
  },
});
