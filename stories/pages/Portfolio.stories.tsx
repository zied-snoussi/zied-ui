import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Navbar from '@/components/layout/navbar';
import Footer from '@/components/layout/footer';
import { AIChatbot } from '@/components/features/ai-chatbot';
import { ScrollToTop } from '@/components/shared';
import { About, AskBot, Contact, Education, GithubStats, HomeSection as Home, Projects, Skills, Work } from '@/components/sections';

function PortfolioPage() {
  return (
    <>
      <Navbar />
      <main>
        <Home />
        <About />
        <Work />
        <Education />
        <Skills />
        <Projects />
        <GithubStats />
        <AskBot />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
      <AIChatbot />
    </>
  );
}

const meta = {
  title: 'Pages/Portfolio',
  component: PortfolioPage,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'The full one-page portfolio assembled from the library, as deployed on zied-snoussi.vercel.app.' } },
  },
} satisfies Meta<typeof PortfolioPage>;
export default meta;
type Story = StoryObj<typeof meta>;

export const FullPage: Story = {};
