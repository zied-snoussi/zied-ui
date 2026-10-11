import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './badge';

const meta = {
  title: 'UI/Badge',
  component: Badge,
  parameters: { docs: { description: { component: 'Small status or tag label, used for skills and project tags.' } } },
  argTypes: { variant: { control: 'select', options: ['default', 'secondary', 'destructive', 'outline'] } },
  args: { children: 'TypeScript', variant: 'default' },
} satisfies Meta<typeof Badge>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-wrap gap-2">
      {(['default', 'secondary', 'outline', 'destructive'] as const).map((v) => (
        <Badge key={v} {...args} variant={v}>{v}</Badge>
      ))}
    </div>
  ),
};

export const SkillTags: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {['Next.js', 'NestJS', 'Spring Boot', 'RAG', 'MCP', 'PostgreSQL', 'Docker'].map((s) => (
        <Badge key={s} variant="secondary">{s}</Badge>
      ))}
    </div>
  ),
};
