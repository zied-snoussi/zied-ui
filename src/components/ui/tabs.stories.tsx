import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs';

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  parameters: { docs: { description: { component: 'Radix tabs, used to filter project and skill categories.' } } },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="ai" className="max-w-md">
      <TabsList>
        <TabsTrigger value="ai">AI</TabsTrigger>
        <TabsTrigger value="web">Web</TabsTrigger>
        <TabsTrigger value="data">Data</TabsTrigger>
      </TabsList>
      <TabsContent value="ai" className="text-sm text-muted-foreground">RAG assistants, AI agents, LLM evaluation.</TabsContent>
      <TabsContent value="web" className="text-sm text-muted-foreground">Next.js, NestJS, Spring Boot.</TabsContent>
      <TabsContent value="data" className="text-sm text-muted-foreground">PostgreSQL, dbt, Airflow.</TabsContent>
    </Tabs>
  ),
};
