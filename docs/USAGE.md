# Using `@zied-snoussi/ui` in a project

## 1. Registry access

The package lives on GitHub Packages (private). Create a token (classic) with `read:packages`, then add `.npmrc` to the consuming project:

```ini
@zied-snoussi:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

- Locally: `export GITHUB_TOKEN=ghp_xxx` (or `setx GITHUB_TOKEN ghp_xxx` on Windows).
- Vercel: add `GITHUB_TOKEN` as an environment variable (Build).
- GitHub Actions in another repo: use a token secret with `read:packages`; `secrets.GITHUB_TOKEN` only works inside this repository.

## 2. Install

```bash
pnpm add @zied-snoussi/ui
```

| You use | Also install |
|---|---|
| `@zied-snoussi/ui`, `@zied-snoussi/ui/effects` | `react@19 react-dom@19`, `tailwindcss@4` |
| `@zied-snoussi/ui/next` | the above + `next@16 next-intl@4 next-themes@0.4` |

## 3. Styles

```css
/* app/globals.css */
@import "tailwindcss";
@import "@zied-snoussi/ui/theme.css";
```

Fonts (Next.js):

```tsx
import { Inter, JetBrains_Mono } from 'next/font/google';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains-mono' });
// <body className={`${inter.variable} ${mono.variable} font-sans`}>
```

Plain React (Vite): load Inter and JetBrains Mono from Google Fonts and set the two variables on `:root`.

## 4. Primitives and effects (any React app)

```tsx
import { Button, Dialog, DialogContent, DialogTrigger, DialogTitle } from '@zied-snoussi/ui';
import { Particles, SectionHeading } from '@zied-snoussi/ui/effects';

<div className="relative h-96">
  <Particles particleCount={200} particleColors={['#3b5bdb', '#7c3aed', '#06b6d4']} />
</div>
```

## 5. Next.js components

```tsx
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider, Navbar, Footer, AIChatbot, ScrollToTop } from '@zied-snoussi/ui/next';

export default async function Layout({ children, params }) {
  const { locale } = await params;
  const messages = await getMessages();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'} suppressHydrationWarning>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            {children}
            <Footer />
            <ScrollToTop />
            <AIChatbot />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Translations

Merge the package messages into yours (they contain the `Navbar`, `Footer`, `Common`, `Projects`, `AskBot`… namespaces):

```ts
// i18n/request.ts
import uiMessages from '@zied-snoussi/ui/messages/en.json';
const messages = { ...uiMessages, ...(await import(`../messages/${locale}.json`)).default };
```

### Chatbot API

`AIChatbot` sends `POST /api/chat` with `{ messages: {role, content}[], language }` and expects `200 { message: string }`. A `429` with `{ retryAfter }` shows a rate-limit message. Open it from anywhere with `askChatbot('What do you build?')`.

## Troubleshooting

| Problem | Fix |
|---|---|
| `401 Unauthorized` on install | Check the token scope (`read:packages`) and the `.npmrc` scope line. |
| Components have no styles | Import `theme.css` **after** `@import "tailwindcss"`; restart the dev server. |
| `MISSING_MESSAGE` from next-intl | Merge `@zied-snoussi/ui/messages/<locale>.json` into your messages. |
| Theme toggle does nothing | Wrap the app in `ThemeProvider attribute="class"`. |
