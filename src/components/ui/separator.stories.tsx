import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Separator } from './separator';

const meta = {
  title: 'UI/Separator',
  component: Separator,
  parameters: { docs: { description: { component: 'Visual divider (Radix), horizontal or vertical.' } } },
} satisfies Meta<typeof Separator>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Horizontal: Story = {
  render: () => (
    <div className="max-w-sm space-y-3 text-sm">
      <p>Full-Stack AI Engineer</p>
      <Separator />
      <p className="text-muted-foreground">Tunis, Tunisia</p>
    </div>
  ),
};

export const Vertical: Story = {
  render: () => (
    <div className="flex h-6 items-center gap-3 text-sm">
      <span>GitHub</span>
      <Separator orientation="vertical" />
      <span>LinkedIn</span>
      <Separator orientation="vertical" />
      <span>Portfolio</span>
    </div>
  ),
};
