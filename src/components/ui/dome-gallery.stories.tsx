import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import DomeGallery from './dome-gallery';

const images = [
  'AcademyExpert.png', 'ReUsedTN.png', 'PFMPlatform.png', 'LoadPilot.png', 'HealthInsurance.png', 'Resvilo.png',
  'SmartSea.jpg', 'PokemonApp.png', 'IntelliScrape.png', 'TexBuilder.png', 'Moviora.jpg', 'EventManagement.png',
].map((file) => ({ src: `/assets/${file}`, alt: file.replace(/\.(png|jpg)$/, '') }));

const meta = {
  title: 'Effects/DomeGallery',
  component: DomeGallery,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'Draggable 3D dome of images (`@use-gesture/react`). Click an image to enlarge it.' } },
  },
  decorators: [(Story) => <div style={{ height: 560, position: 'relative' }}><Story /></div>],
  args: { images, grayscale: false, segments: 34, imageBorderRadius: '18px', dragSensitivity: 20 },
} satisfies Meta<typeof DomeGallery>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Grayscale: Story = { args: { grayscale: true } };
