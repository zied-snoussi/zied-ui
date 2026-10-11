import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ProjectCard from './project-card';
import ProjectDetail from './project-detail';
import { projectsData } from '@/data';

const all = projectsData.flatMap((group) => group.data.map((project, i) => ({ project, id: `${group.id}-${i}` })));
const sample = all.find(({ project }) => project.title.toLowerCase().includes('agentic')) ?? all[0];

const meta = {
  title: 'Features/ProjectCard',
  component: ProjectCard,
  parameters: { docs: { description: { component: 'Project tile used in the Projects grid: cover image, date, description, skills and links to the repository, demo and detail page.' } } },
  decorators: [(Story) => <div style={{ maxWidth: 420 }}><Story /></div>],
  args: { project: sample.project, projectId: sample.id },
} satisfies Meta<typeof ProjectCard>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Grid: Story = {
  decorators: [(Story) => <div style={{ maxWidth: 1200 }}><Story /></div>],
  render: () => (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {all.slice(0, 6).map(({ project, id }) => <ProjectCard key={id} project={project} projectId={id} />)}
    </div>
  ),
};

export const Detail: StoryObj<typeof ProjectDetail> = {
  name: 'ProjectDetail (page)',
  render: () => <ProjectDetail project={sample.project} projectId={sample.id} />,
  decorators: [(Story) => <div style={{ maxWidth: 'none' }}><Story /></div>],
  parameters: { layout: 'fullscreen', docs: { description: { story: 'Full project page: gallery, highlights, stack and links.' } } },
};
