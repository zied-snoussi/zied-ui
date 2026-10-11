import { GraduationCap } from 'lucide-react';

export interface EducationItem {
  id: string;
  translationKey: string;
  status: 'completed' | 'ongoing';
  logo: string;
  icon?: typeof GraduationCap;
}

export const educationData: EducationItem[] = [
  {
    id: 'esprit',
    translationKey: 'Education.items.esprit',
    status: 'ongoing',
    logo: '/assets/EspritLogo.png',
    icon: GraduationCap,
  },
  {
    id: 'isimsf',
    translationKey: 'Education.items.isimsf',
    status: 'completed',
    logo: '/assets/Isims.png',
    icon: GraduationCap,
  },
  {
    id: 'highSchool',
    translationKey: 'Education.items.highSchool',
    status: 'completed',
    logo: '/assets/ZouietElmeggayez.jpg',
    icon: GraduationCap,
  },
  {
    id: 'cesar',
    translationKey: 'Education.items.cesar',
    status: 'completed',
    logo: '/assets/Cesar.png',
    icon: GraduationCap,
  },
];
