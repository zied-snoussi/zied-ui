import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Languages } from 'lucide-react';
import { Button } from './button';
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
} from './dropdown-menu';

const meta = {
  title: 'UI/DropdownMenu',
  component: DropdownMenu,
  parameters: { docs: { description: { component: 'Accessible menu (Radix). Used by the language switcher.' } } },
} satisfies Meta<typeof DropdownMenu>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild><Button variant="outline"><Languages /> Language</Button></DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Choose a language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>English</DropdownMenuItem>
        <DropdownMenuItem>Français</DropdownMenuItem>
        <DropdownMenuItem>العربية</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
};
