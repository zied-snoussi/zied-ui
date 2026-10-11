import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { Button } from './button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from './sheet';

const meta = {
  title: 'UI/Sheet',
  component: Sheet,
  parameters: { docs: { description: { component: 'Side panel built on Radix Dialog. Used for the mobile navigation menu.' } } },
} satisfies Meta<typeof Sheet>;
export default meta;
type Story = StoryObj<typeof meta>;

function Demo({ side }: { side: 'left' | 'right' | 'top' | 'bottom' }) {
  return (
    <Sheet>
      <SheetTrigger asChild><Button variant="outline">Open {side}</Button></SheetTrigger>
      <SheetContent side={side}>
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>Home · About · Work · Projects · Contact</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export const Right: Story = {
  render: () => <Demo side="right" />,
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open right' }));
    const panel = await screen.findByRole('dialog');
    await expect(within(panel).getByText('Menu')).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  },
};
export const AllSides: Story = {
  render: () => (
    <div className="flex gap-2">
      {(['left', 'right', 'top', 'bottom'] as const).map((s) => <Demo key={s} side={s} />)}
    </div>
  ),
};
