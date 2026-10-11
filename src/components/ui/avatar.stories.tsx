import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, within } from 'storybook/test';
import { Avatar, AvatarFallback, AvatarImage } from './avatar';

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  parameters: { docs: { description: { component: 'Radix avatar with image and initials fallback.' } } },
} satisfies Meta<typeof Avatar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const WithImage: Story = {
  render: () => (
    <Avatar className="size-16">
      <AvatarImage src="/assets/profile1.png" alt="Zied Snoussi" />
      <AvatarFallback>ZS</AvatarFallback>
    </Avatar>
  ),
};

export const Fallback: Story = {
  render: () => (
    <Avatar className="size-16">
      <AvatarImage src="/does-not-exist.png" alt="" />
      <AvatarFallback>ZS</AvatarFallback>
    </Avatar>
  ),
  play: async ({ canvasElement }) => {
    await expect(await within(canvasElement).findByText('ZS')).toBeVisible();
  },
};
