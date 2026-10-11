// @ts-check
import tseslint from 'typescript-eslint';
import storybook from 'eslint-plugin-storybook';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';

export default tseslint.config(
  { ignores: ['dist/**', 'storybook-static/**', 'node_modules/**', '!.storybook'] },
  ...tseslint.configs.recommended,
  ...storybook.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx}'],
    plugins: { 'react-hooks': reactHooks, '@next/next': nextPlugin },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },
);
