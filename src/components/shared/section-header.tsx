/**
 * @file components/shared/section-header.tsx
 * @description Reusable section header component
 */

import React from 'react'
import { Fade } from './fade-animation'
import type { SectionHeaderProps } from '@/types'

export function SectionHeader({ badge, title, subtitle }: SectionHeaderProps) {
  return (
    <div className='text-center mb-20'>
      <Fade top delay={100}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-muted text-sm font-medium mb-6">
          {badge}
        </div>
      </Fade>
      <Fade top delay={200}>
        <h2 className="text-4xl lg:text-5xl font-bold mb-4 tracking-tight">{title}</h2>
        {subtitle && (
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </Fade>
    </div>
  )
}
