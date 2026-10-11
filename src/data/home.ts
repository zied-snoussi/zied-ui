import { FaGithub, FaLinkedin, FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';
import { FaMedium, FaSquareXTwitter } from "react-icons/fa6";
import { IoLogoYoutube } from 'react-icons/io';
import { SiTypescript, SiNestjs, SiNextdotjs, SiDocker, SiPython, SiSpringboot, SiClaude, SiLangchain } from 'react-icons/si';
import { IconType } from 'react-icons';

export interface SocialLink {
  icon: IconType;
  href: string;
  color: string;
  label: string;
}

export interface TechStackItem {
  icon: IconType;
  name: string;
  color: string;
  href: string;
}

export const socialLinks: SocialLink[] = [
  { icon: FaLinkedin, href: 'https://www.linkedin.com/in/zied-snoussi/', color: 'hover:text-[#0077B5]', label: 'LinkedIn' },
  { icon: FaGithub, href: 'https://github.com/zied-snoussi', color: 'hover:text-primary', label: 'GitHub' },
  { icon: IoLogoYoutube, href: 'https://youtube.com/@ziedsnoussi', color: 'hover:text-[#FF0000]', label: 'YouTube' },
  { icon: FaFacebook, href: 'https://www.facebook.com/zied.snoussi.792/', color: 'hover:text-[#1877F2]', label: 'Facebook' },
  { icon: FaInstagram, href: 'https://www.instagram.com/ziedalsnoussi/', color: 'hover:text-[#E4405F]', label: 'Instagram' },
  { icon: FaWhatsapp, href: 'https://wa.me/21625822514', color: 'hover:text-[#25D366]', label: 'WhatsApp' },
  { icon: FaMedium, href: 'https://medium.com/@ziedsnoussi.tn', color: 'hover:text-foreground', label: 'Medium' },
  { icon: FaSquareXTwitter, href: 'https://twitter.com/ziedalsnoussi', color: 'hover:text-foreground', label: 'Twitter' },
];

export const techStack: TechStackItem[] = [
  { icon: SiNextdotjs, name: 'Next.js', color: 'text-foreground', href: "https://nextjs.org/" },
  { icon: SiNestjs, name: 'NestJS', color: 'text-[#E0234E]', href: "https://nestjs.com/" },
  { icon: SiSpringboot, name: 'Spring Boot', color: 'text-[#6DB33F]', href: "https://spring.io/projects/spring-boot" },
  { icon: SiTypescript, name: 'TypeScript', color: 'text-[#3178C6]', href: "https://www.typescriptlang.org/" },
  { icon: SiPython, name: 'Python', color: 'text-[#3776AB]', href: "https://www.python.org/" },
  { icon: SiClaude, name: 'Claude & MCP agents', color: 'text-[#D97757]', href: "https://www.anthropic.com/claude" },
  { icon: SiLangchain, name: 'LangChain · RAG', color: 'text-foreground', href: "https://www.langchain.com/" },
  { icon: SiDocker, name: 'Docker · Kubernetes', color: 'text-[#2496ED]', href: "https://www.docker.com/" },
];
