/**
 * @file lib/hooks/use-scroll-to-top.ts
 * @description Hook for scroll to top functionality
 */

'use client'

import { useCallback } from 'react'

export function useScrollToTop() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return { scrollToTop }
}
