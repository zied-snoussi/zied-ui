/**
 * @file lib/config/site.ts
 * @description Site-wide configuration
 */

import { SITE_METADATA, CONTACT_INFO } from '@/constants/metadata'

export const siteConfig = {
  name: 'Zied Snoussi Portfolio',
  description: SITE_METADATA.description,
  url: SITE_METADATA.siteUrl,
  author: {
    name: SITE_METADATA.author,
    email: CONTACT_INFO.email,
    location: CONTACT_INFO.location,
  },
  links: {
    github: CONTACT_INFO.github,
    linkedin: CONTACT_INFO.linkedIn,
    twitter: CONTACT_INFO.twitter,
  },
  theme: {
    defaultMode: 'system' as const,
    enableSystem: true,
    disableTransitionOnChange: true,
  },
} as const

export type SiteConfig = typeof siteConfig
