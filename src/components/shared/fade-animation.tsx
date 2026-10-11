/**
 * @file components/shared/fade-animation.tsx
 * @description Animation wrapper component with CSS-based animations
 */

'use client'

import React, { useEffect, useRef, useState } from 'react'

interface FadeAnimationProps {
  children: React.ReactNode
  top?: boolean
  bottom?: boolean
  left?: boolean
  right?: boolean
  delay?: number
  className?: string
}

export function Fade({ children, top, bottom, left, right, delay = 0, className }: FadeAnimationProps) {
  const [isVisible, setIsVisible] = useState(false)
  const elementRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true)
            }, delay)
          }
        })
      },
      { threshold: 0.1 }
    )

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [delay])

  // Determine animation direction
  const getTransform = () => {
    if (top) return 'translateY(-10px)'
    if (bottom) return 'translateY(10px)'
    if (left) return 'translateX(-10px)'
    if (right) return 'translateX(10px)'
    return 'translateY(10px)' // default
  }

  return (
    <div
      ref={elementRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translate(0, 0)' : getTransform(),
        transition: 'opacity 0.3s ease-out, transform 0.3s ease-out',
      }}
    >
      {children}
    </div>
  )
}
