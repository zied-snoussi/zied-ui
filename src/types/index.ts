/**
 * @file types/index.ts
 * @description Central type definitions for the portfolio application
 * @author Zied Snoussi
 */

/**
 * Project type definition
 */
export interface Project {
  title: string
  photoUrl: string
  date: string
  description: string
  skills: string[]
  githubUrl: string
  demoUrl: string
}

/**
 * Education entry type
 */
export interface Education {
  title: string
  subTitle: string
  time: string
  description: string
  logo: string
}

/**
 * Work experience type
 */
export interface WorkExperience {
  logo: string
  title: string
  company: string
  time: string
  location: string
  description: string
  tags: string[]
}

/**
 * Skill category type
 */
export interface SkillCategory {
  id: number
  name: string
}

/**
 * Individual skill type
 */
export interface Skill {
  name: string
  icon: React.ReactNode
  categoryId: number
}

/**
 * Social media link type
 */
export interface SocialLink {
  icon: React.ComponentType<{ size?: number }>
  href: string
  label: string
  color?: string
}

/**
 * Contact information type
 */
export interface ContactInfo {
  icon: React.ComponentType<{ className?: string }>
  title: string
  value: string
  action: () => void
}

/**
 * Navigation item type
 */
export interface NavItem {
  name: string
  link: string
}

/**
 * Section header props
 */
export interface SectionHeaderProps {
  badge: string
  title: string
  subtitle?: string
}

/**
 * Tech stack item
 */
export interface TechStackItem {
  icon: React.ComponentType<{ size?: number }>
  name: string
  color: string
  href: string
}

/**
 * GitHub API types
 */
export * from './github';
