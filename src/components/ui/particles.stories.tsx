import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import Particles from './particles';

const meta = {
  title: 'Effects/Particles',
  component: Particles,
  parameters: {
    layout: 'fullscreen',
    docs: { description: { component: 'WebGL particle field (OGL) used behind the hero section. Reacts to the pointer when `moveParticlesOnHover` is on.' } },
  },
  decorators: [(Story) => <div style={{ position: 'relative', height: 420 }}><Story /></div>],
  args: {
    particleCount: 200,
    particleSpread: 10,
    speed: 0.1,
    particleColors: ['#3b5bdb', '#7c3aed', '#06b6d4'],
    moveParticlesOnHover: true,
    particleHoverFactor: 1,
    alphaParticles: true,
    particleBaseSize: 100,
    sizeRandomness: 1,
    cameraDistance: 20,
    disableRotation: false,
  },
} satisfies Meta<typeof Particles>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Dense: Story = { args: { particleCount: 600, particleBaseSize: 60 } };
export const Static: Story = { args: { disableRotation: true, moveParticlesOnHover: false, speed: 0 } };
