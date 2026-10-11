import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { ArrowRight, Download, GitBranch } from 'lucide-react';
import { Button } from './button';

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    docs: { description: { component: 'Primary action control (shadcn/ui, `cva` variants). Use `asChild` to render a link with button styles.' } },
  },
  argTypes: {
    variant: { control: 'select', options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'] },
    size: { control: 'select', options: ['default', 'sm', 'lg', 'icon'] },
  },
  args: { children: 'View projects', variant: 'default', size: 'default', onClick: fn() },
} satisfies Meta<typeof Button>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement, args }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'View projects' }));
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-3">
      {(['default', 'secondary', 'outline', 'ghost', 'destructive', 'link'] as const).map((v) => (
        <Button key={v} {...args} variant={v}>
          {v}
        </Button>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex items-center gap-3">
      <Button {...args} size="sm">Small</Button>
      <Button {...args} size="default">Default</Button>
      <Button {...args} size="lg">Large</Button>
      <Button {...args} size="icon" aria-label="GitHub"><GitBranch /></Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: (args) => (
    <div className="flex gap-3">
      <Button {...args}><Download /> Download CV</Button>
      <Button {...args} variant="outline">Contact me <ArrowRight /></Button>
    </div>
  ),
};

export const AsLink: Story = {
  render: (args) => (
    <Button {...args} asChild>
      <a href="https://github.com/zied-snoussi" target="_blank" rel="noreferrer"><GitBranch /> GitHub</a>
    </Button>
  ),
};

export const Disabled: Story = {
  args: { disabled: true, children: 'Sending…' },
  play: async ({ canvasElement, args }) => {
    const button = within(canvasElement).getByRole('button', { name: 'Sending…' });
    await expect(button).toBeDisabled();
    await userEvent.click(button, { pointerEventsCheck: 0 });
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};
