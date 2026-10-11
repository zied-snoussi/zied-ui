import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';
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

export const Hero: Story = {
  parameters: { a11y: { test: 'todo' } }, // known issue, see docs/ACCESSIBILITY.md
};
export const AboutSection: Story = {
  name: 'About',
  render: () => <About />,
  parameters: { a11y: { test: 'todo' } }, // known issue, see docs/ACCESSIBILITY.md
};
export const WorkSection: Story = { name: 'Work', render: () => <Work /> };
export const EducationSection: Story = { name: 'Education', render: () => <Education /> };
export const SkillsSection: Story = {
  name: 'Skills',
  render: () => <Skills />,
  parameters: { a11y: { test: 'todo' } }, // known issue, see docs/ACCESSIBILITY.md
};
export const ProjectsSection: Story = { name: 'Projects', render: () => <Projects /> };
export const GithubSection: Story = { name: 'GitHub stats', render: () => <GithubStats /> };
export const AskBotSection: Story = { name: 'Ask the bot', render: () => <AskBot /> };
export const ContactSection: Story = {
  name: 'Contact',
  render: () => <Contact />,
  parameters: { docs: { description: { story: 'Contact form with zod validation. `/api/contact` is mocked: submitting shows the success toast.' } } },
};

/** Submitting an empty form shows the zod validation messages. */
export const ContactValidation: Story = {
  name: 'Contact · validation',
  render: () => <Contact />,
  parameters: { a11y: { test: 'todo' } }, // known issue (color-contrast), see docs/ACCESSIBILITY.md
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole('button', { name: /send message/i }));
    // The form sits inside a Fade reveal, so assert presence rather than visibility.
    await expect(await canvas.findByText(/invalid email address/i)).toBeInTheDocument();
    await expect(canvas.getByText(/message must be at least 20 characters/i)).toBeInTheDocument();
  },
};

/** A valid form is sent to the (mocked) API and the success state appears. */
export const ContactSubmit: Story = {
  name: 'Contact · submit',
  render: () => <Contact />,
  parameters: { a11y: { test: 'todo' } }, // known issue (color-contrast), see docs/ACCESSIBILITY.md
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const field = (id: string) => canvasElement.querySelector<HTMLInputElement | HTMLTextAreaElement>(`#${id}`)!;
    await userEvent.type(field('name'), 'Amira Ben Ali');
    await userEvent.type(field('email'), 'amira@example.com');
    await userEvent.type(field('subject'), 'Freelance project');
    await userEvent.type(field('message'), 'Hello Zied, I would like to discuss a Next.js project with you.');
    await userEvent.click(canvas.getByRole('button', { name: /send message/i }));
    await waitFor(() => expect(canvas.getByRole('button', { name: /send another message/i })).toBeVisible(), { timeout: 5000 });
  },
};
