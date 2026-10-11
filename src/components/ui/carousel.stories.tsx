import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './carousel';

const meta = {
  title: 'UI/Carousel',
  component: Carousel,
  parameters: { docs: { description: { component: 'Embla-based carousel with previous/next controls. Used for project galleries.' } } },
} satisfies Meta<typeof Carousel>;
export default meta;
type Story = StoryObj<typeof meta>;

const images = ['AcademyExpert.png', 'ReUsedTN.png', 'PFMPlatform.png', 'LoadPilot.png'];

export const Gallery: Story = {
  render: () => (
    <div className="mx-auto max-w-xl px-12">
      <Carousel>
        <CarouselContent>
          {images.map((img) => (
            <CarouselItem key={img}>
              <img src={`/assets/${img}`} alt={img.replace('.png', '')} className="aspect-video w-full rounded-lg object-cover" />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  ),
};
