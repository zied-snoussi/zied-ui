import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, screen, userEvent, waitFor, within } from 'storybook/test';
import { Button } from './button';
import {
  Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger,
} from './dialog';

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  parameters: { docs: { description: { component: 'Modal dialog (Radix) with focus trap and Escape to close.' } } },
} satisfies Meta<typeof Dialog>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild><Button>Open dialog</Button></DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confidential project</DialogTitle>
          <DialogDescription>This project is under NDA. Details are available on request.</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild><Button variant="outline">Close</Button></DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  play: async ({ canvasElement }) => {
    await userEvent.click(within(canvasElement).getByRole('button', { name: 'Open dialog' }));
    const dialog = await screen.findByRole('dialog');
    await expect(within(dialog).getByText('Confidential project')).toBeVisible();
    await userEvent.keyboard('{Escape}');
    await waitFor(() => expect(screen.queryByRole('dialog')).not.toBeInTheDocument());
  },
};
