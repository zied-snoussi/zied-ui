import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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

export const Right: Story = { render: () => <Demo side="right" /> };
export const AllSides: Story = {
  render: () => (
    <div className="flex gap-2">
      {(['left', 'right', 'top', 'bottom'] as const).map((s) => <Demo key={s} side={s} />)}
    </div>
  ),
};
