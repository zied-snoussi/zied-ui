/**
 * @file constants/routes.ts
 * @description Route constants for the application
 */

export const ROUTES = {
  HOME: '/',
  ABOUT: '#about',
  PROJECTS: '#projects',
  EDUCATION: '#education',
  WORK: '#work',
  SKILLS: '#skills',
  GITHUB_STATS: '#github',
  CONTACT: '#contact',
  CONFIDENTIAL: '/confidential',
  PROJECT_DETAIL: (id: string) => `/projects/${id}`,
} as const

export const NAV_ITEMS = [
  { key: 'home', link: ROUTES.HOME },
  { key: 'about', link: ROUTES.ABOUT },
  { key: 'projects', link: ROUTES.PROJECTS },
  { key: 'education', link: ROUTES.EDUCATION },
  { key: 'work', link: ROUTES.WORK },
  { key: 'skills', link: ROUTES.SKILLS },
  { key: 'githubStats', link: ROUTES.GITHUB_STATS },
  { key: 'contact', link: ROUTES.CONTACT },
] as const
