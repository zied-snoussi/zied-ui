import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Fade } from './fade-animation';
import { SectionHeader } from './section-header';
import { ScrollToTop } from './scroll-to-top';

const meta = {
  title: 'Shared/SectionHeader',
  component: SectionHeader,
  parameters: { docs: { description: { component: 'Badge + title + subtitle header used at the top of each section, with a fade-in on scroll.' } } },
  args: { badge: 'Projects', title: 'Things I have built', subtitle: 'AI products, SaaS platforms and tools, most of them in production.' },
} satisfies Meta<typeof SectionHeader>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithoutSubtitle: Story = { args: { subtitle: undefined } };

export const FadeAnimation: StoryObj<typeof Fade> = {
  name: 'Fade (reveal on scroll)',
  render: () => (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      <Fade top><div className="rounded-lg border bg-card p-6 text-center">top</div></Fade>
      <Fade bottom delay={100}><div className="rounded-lg border bg-card p-6 text-center">bottom</div></Fade>
      <Fade left delay={200}><div className="rounded-lg border bg-card p-6 text-center">left</div></Fade>
      <Fade right delay={300}><div className="rounded-lg border bg-card p-6 text-center">right</div></Fade>
    </div>
  ),
  parameters: { docs: { description: { story: '`Fade` reveals its children with an opacity and translate transition when they enter the viewport. Pick a direction (`top`, `bottom`, `left`, `right`) and an optional `delay` in ms.' } } },
};

export const ScrollToTopButton: StoryObj<typeof ScrollToTop> = {
  name: 'ScrollToTop',
  render: () => (
    <div>
      <p className="text-sm text-muted-foreground">Scroll down this canvas: the button appears after the first screen.</p>
      <div style={{ height: 2000 }} />
      <ScrollToTop />
    </div>
  ),
};
