import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Home from './home';
import About from './about';
import Work from './work';
import Education from './education';
import Skills from './skills';
import Projects from './projects';
import GithubStats from './github-stats';
import AskBot from './ask-bot';
import Contact from './contact';

const meta = {
  title: 'Sections/Home',
  component: Home,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Page sections of zied-snoussi.vercel.app. They compose the primitives, effects and shared components with the portfolio data (`src/data`) and translations (`src/messages`). They are reference implementations: they live in Storybook but are not part of the npm package.',
      },
    },
  },
} satisfies Meta<typeof Home>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Hero: Story = {};
export const AboutSection: Story = { name: 'About', render: () => <About /> };
export const WorkSection: Story = { name: 'Work', render: () => <Work /> };
export const EducationSection: Story = { name: 'Education', render: () => <Education /> };
export const SkillsSection: Story = { name: 'Skills', render: () => <Skills /> };
export const ProjectsSection: Story = { name: 'Projects', render: () => <Projects /> };
export const GithubSection: Story = { name: 'GitHub stats', render: () => <GithubStats /> };
export const AskBotSection: Story = { name: 'Ask the bot', render: () => <AskBot /> };
export const ContactSection: Story = {
  name: 'Contact',
  render: () => <Contact />,
  parameters: { docs: { description: { story: 'Contact form with zod validation. `/api/contact` is mocked: submitting shows the success toast.' } } },
};
