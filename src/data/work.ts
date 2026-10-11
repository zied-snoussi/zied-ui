import { Briefcase } from 'lucide-react';

export interface WorkItem {
  id: string;
  translationKey: string;
  tags: string[];
  logo: string;
  icon?: typeof Briefcase;
}

export const workData: WorkItem[] = [
  {
    id: 'bysur',
    translationKey: 'Work.items.bysur',
    tags: ['Next.js', 'React.js', 'Angular', 'NestJS', 'TypeScript', 'tRPC', 'Drizzle ORM', 'PostgreSQL', 'OpenAI', 'Payload CMS', 'React Native', 'Storybook', 'Turborepo', 'Playwright', 'Jenkins', 'SonarQube', 'Docker', 'Claude Code'],
    logo: '/assets/bysur.png',
    icon: Briefcase,
  },
  {
    id: 'rooly',
    translationKey: 'Work.items.rooly',
    tags: ['Next.js', 'NestJS', 'TypeScript', 'MongoDB', 'Redux', 'Redis', 'AWS S3', 'PWA', 'Jest'],
    logo: '/assets/Rooly.png',
    icon: Briefcase,
  },
  {
    id: 'msg',
    translationKey: 'Work.items.msg',
    tags: ['Next.js', 'React.js', 'TypeScript', 'MongoDB', 'Node.js', 'Prisma', 'PostgreSQL', 'Tailwind CSS'],
    logo: '/assets/MSGLOGO.png',
    icon: Briefcase,
  },
  {
    id: 'ipLabel',
    translationKey: 'Work.items.ipLabel',
    tags: ['React.js', 'Redux', 'Express.js', 'Prisma', 'PostgreSQL', 'K6', 'JMeter', 'Selenium', 'Grafana', 'Figma'],
    logo: '/assets/ip-label.jpg',
    icon: Briefcase,
  },
  {
    id: 'b2s',
    translationKey: 'Work.items.b2s',
    tags: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Redux', 'PayPal', 'Bootstrap'],
    logo: '/assets/b2s.png',
    icon: Briefcase,
  },
];
