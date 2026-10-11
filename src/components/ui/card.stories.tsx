import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';
import { Badge } from './badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card';

const meta = {
  title: 'UI/Card',
  component: Card,
  parameters: { docs: { description: { component: 'Surface container with header, content and footer slots.' } } },
} satisfies Meta<typeof Card>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardHeader>
        <CardTitle>Agentic QA Platform</CardTitle>
        <CardDescription>AI test agents with mutation-testing quality gates.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-2">
        {['TypeScript', 'Claude Agent SDK', 'MCP'].map((s) => (
          <Badge key={s} variant="secondary">{s}</Badge>
        ))}
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm">Details</Button>
        <Button size="sm" variant="outline">Repository</Button>
      </CardFooter>
    </Card>
  ),
};

export const ContentOnly: Story = {
  render: () => (
    <Card className="max-w-sm">
      <CardContent className="pt-6 text-sm text-muted-foreground">A card with content only.</CardContent>
    </Card>
  ),
};
