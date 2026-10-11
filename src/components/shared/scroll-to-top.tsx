/**
 * @file components/shared/scroll-to-top.tsx
 * @description Scroll to top button component
 */

'use client'

import { ArrowUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useScrollToTop } from '@/lib/hooks'
import { useTranslations } from 'next-intl'

export function ScrollToTop() {
  const { scrollToTop } = useScrollToTop()
  const t = useTranslations('Common')

  return (
    <Button
      variant="outline"
      size="icon"
      className='fixed bottom-8 right-8 rounded-full shadow-lg hover:shadow-xl hover:bg-primary hover:text-primary-foreground transition-all z-50 border-2'
      onClick={scrollToTop}
      aria-label={t('scrollToTop')}
    >
      <ArrowUp className='h-5 w-5' />
    </Button>
  )
}
