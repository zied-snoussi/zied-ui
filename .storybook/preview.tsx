import type { Preview, Decorator } from '@storybook/nextjs-vite';
import { NextIntlClientProvider } from 'next-intl';
import { Toaster } from 'sonner';
import { useEffect } from 'react';

import { ThemeProvider } from '../src/components/providers/theme-provider';
import en from '../src/messages/en.json';
import fr from '../src/messages/fr.json';
import ar from '../src/messages/ar.json';
import { installApiMocks } from './mocks/api';
import '../src/styles/globals.css';

installApiMocks();

const messages = { en, fr, ar } as const;
type Locale = keyof typeof messages;

/** Sets <html lang/dir> and the dark class from the toolbar globals. */
function DocumentSync({ locale, theme }: { locale: Locale; theme: string }) {
  useEffect(() => {
    const html = document.documentElement;
    html.lang = locale;
    html.dir = locale === 'ar' ? 'rtl' : 'ltr';
    html.classList.toggle('dark', theme === 'dark');
    html.style.colorScheme = theme;
  }, [locale, theme]);
  return null;
}

const withProviders: Decorator = (Story, context) => {
  const locale = (context.globals.locale ?? 'en') as Locale;
  const theme = (context.globals.theme ?? 'light') as string;
  return (
    <NextIntlClientProvider locale={locale} messages={messages[locale]} timeZone="Africa/Tunis">
      <ThemeProvider attribute="class" forcedTheme={theme} enableSystem={false} disableTransitionOnChange>
        <DocumentSync locale={locale} theme={theme} />
        <div className="bg-background text-foreground font-sans antialiased">
          <Story />
        </div>
        <Toaster richColors position="bottom-right" />
      </ThemeProvider>
    </NextIntlClientProvider>
  );
};

const preview: Preview = {
  decorators: [withProviders],
  globalTypes: {
    locale: {
      description: 'Language (next-intl)',
      toolbar: {
        title: 'Locale',
        icon: 'globe',
        items: [
          { value: 'en', title: 'English' },
          { value: 'fr', title: 'Français' },
          { value: 'ar', title: 'العربية (RTL)' },
        ],
        dynamicTitle: true,
      },
    },
    theme: {
      description: 'Color theme',
      toolbar: {
        title: 'Theme',
        icon: 'mirror',
        items: [
          { value: 'light', title: 'Light', icon: 'sun' },
          { value: 'dark', title: 'Dark', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { locale: 'en', theme: 'light' },
  parameters: {
    nextjs: { appDirectory: true, navigation: { pathname: '/en', segments: [['locale', 'en']] } },
    layout: 'padded',
    controls: { expanded: true, matchers: { color: /(background|color)$/i, date: /Date$/i } },
    a11y: { test: 'error' },
    options: {
      storySort: {
        order: ['Introduction', 'Getting Started', 'Foundations', 'UI', 'Effects', 'Shared', 'Layout', 'Features', 'Sections', 'Pages'],
      },
    },
  },
  tags: ['autodocs'],
};

export default preview;
