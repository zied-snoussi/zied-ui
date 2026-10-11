import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Navbar from './navbar';
import Footer from './footer';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';

const meta = {
  title: 'Layout/Navbar',
  component: Navbar,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Sticky top navigation: section links, language switcher, theme toggle and a mobile sheet menu. Labels come from the `Navbar` messages namespace (next-intl). Switch the **Locale** toolbar to see French and Arabic (RTL).' } },
  },
  decorators: [(Story) => <div style={{ minHeight: 260 }}><Story /></div>],
} satisfies Meta<typeof Navbar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {};
export const Mobile: Story = { globals: { viewport: { value: 'mobile2', isRotated: false } } };

export const FooterBlock: StoryObj<typeof Footer> = {
  name: 'Footer',
  render: () => <Footer />,
  parameters: { docs: { description: { story: 'Site footer with social links and copyright (`Footer` messages namespace).' } } },
};

export const Language: StoryObj<typeof LanguageSwitcher> = {
  name: 'LanguageSwitcher',
  render: () => <div className="flex justify-end p-6"><LanguageSwitcher /></div>,
  parameters: { layout: 'padded', docs: { description: { story: 'Dropdown that switches between English, French and Arabic through the next-intl router.' } } },
};

export const Theme: StoryObj<typeof ThemeToggle> = {
  name: 'ThemeToggle',
  render: () => <div className="p-6"><ThemeToggle /></div>,
  parameters: { layout: 'padded', docs: { description: { story: 'Light/dark toggle (next-themes). In Storybook the theme is driven by the **Theme** toolbar.' } } },
};
