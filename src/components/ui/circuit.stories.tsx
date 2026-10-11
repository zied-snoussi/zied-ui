import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { CircuitDefs, NodeCluster, SectionHeading, Trace, elbowPath } from './circuit';

const meta = {
  title: 'Effects/Circuit',
  component: SectionHeading,
  parameters: {
    docs: {
      description: {
        component:
          'The portfolio\'s "circuit" design language: numbered section headings, decorative node clusters and elbow connector traces (`elbowPath` builds the SVG path, `Trace` draws it, `CircuitDefs` provides the gradients).',
      },
    },
  },
  args: {
    index: '02',
    label: 'Experience',
    title: 'Where I have shipped production software',
    description: 'Insurtech SaaS, IoT platforms and load-testing tools, from the UI to the API and CI.',
    align: 'left',
  },
  argTypes: { align: { control: 'inline-radio', options: ['left', 'center'] } },
} satisfies Meta<typeof SectionHeading>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Heading: Story = {
  parameters: { a11y: { test: 'todo' } }, // known issue, see docs/ACCESSIBILITY.md
};
export const HeadingCentered: Story = {
  args: { align: 'center' },
  parameters: { a11y: { test: 'todo' } }, // known issue, see docs/ACCESSIBILITY.md
};

export const NodeClusterDecoration: Story = {
  render: () => (
    <div className="relative h-56 w-full overflow-hidden rounded-xl border bg-card">
      <NodeCluster className="absolute inset-0 h-full w-full" />
    </div>
  ),
};

export const Traces: Story = {
  render: () => (
    <svg viewBox="0 0 480 200" className="h-52 w-full max-w-xl rounded-xl border bg-card">
      <CircuitDefs />
      <Trace d={elbowPath({ x: 20, y: 30 }, { x: 460, y: 170 }, 'x')} />
      <Trace d={elbowPath({ x: 20, y: 170 }, { x: 460, y: 30 }, 'y')} highlight />
      <Trace d={elbowPath({ x: 240, y: 20 }, { x: 240, y: 180 }, 'y')} active={false} />
    </svg>
  ),
};
