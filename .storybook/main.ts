import type { StorybookConfig } from '@storybook/nextjs-vite';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  framework: { name: '@storybook/nextjs-vite', options: {} },
  stories: ['../stories/**/*.mdx', '../src/**/*.stories.@(ts|tsx)'],
  addons: [
    { name: '@storybook/addon-docs', options: { mdxPluginOptions: { mdxCompileOptions: { remarkPlugins: [remarkGfm] } } } },
    '@storybook/addon-a11y',
    '@storybook/addon-themes',
    '@storybook/addon-vitest',
    '@storybook/addon-mcp',
  ],
  staticDirs: ['../public'],
  docs: { defaultName: 'Docs' },
  core: { disableTelemetry: true },
  typescript: { reactDocgen: 'react-docgen-typescript' },
  async viteFinal(viteConfig) {
    viteConfig.plugins = [...(viteConfig.plugins ?? []), tailwindcss()];
    viteConfig.resolve = {
      ...viteConfig.resolve,
      alias: { ...(viteConfig.resolve?.alias ?? {}), '@': fileURLToPath(new URL('../src', import.meta.url)) },
    };
    return viteConfig;
  },
};

export default config;
