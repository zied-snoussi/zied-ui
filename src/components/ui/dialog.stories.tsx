import type { Meta, StoryObj } from '@storybook/nextjs-vite';
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
};
