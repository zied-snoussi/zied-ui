import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ScrollArea } from './scroll-area';

const meta = {
  title: 'UI/ScrollArea',
  component: ScrollArea,
  parameters: { docs: { description: { component: 'Custom-styled scroll container (Radix).' } } },
} satisfies Meta<typeof ScrollArea>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <ScrollArea className="h-48 w-64 rounded-md border p-4 text-sm">
      {Array.from({ length: 30 }, (_, i) => (
        <p key={i} className="py-1">Item {i + 1}</p>
      ))}
    </ScrollArea>
  ),
};
