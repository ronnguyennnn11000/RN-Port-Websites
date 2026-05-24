'use client'

import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InteractiveHoverButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string
  href?: string
  target?: string
}

const InteractiveHoverButton = React.forwardRef<
  HTMLButtonElement,
  InteractiveHoverButtonProps
>(({ text = 'Button', className, href, target, style, ...props }, ref) => {
  const sharedClass = cn(
    'group relative cursor-pointer overflow-hidden rounded-full',
    'border border-white/[0.12] bg-black',
    'px-8 py-4 text-center font-medium text-sm md:text-base',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-black',
    'active:scale-[0.97]',
    className,
  )

  const sharedStyle: React.CSSProperties = {
    transition: 'border-color 0.3s ease, transform 0.15s ease',
    ...style,
  }

  const inner = (
    <>
      {/* Default text — slides right and fades out on hover */}
      <span className="relative z-10 inline-block text-white/80 transition-all duration-300 group-hover:translate-x-12 group-hover:opacity-0">
        {text}
      </span>

      {/* Hover text + arrow — slides in from right */}
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-2 translate-x-12 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
        <span>{text}</span>
        <ArrowRight className="w-4 h-4" />
      </div>

      {/* Expanding accent fill */}
      <div
        className="absolute left-[20%] top-[40%] h-2 w-2 rounded-full bg-accent
                   transition-all duration-300 ease-in-out
                   group-hover:left-0 group-hover:top-0
                   group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:rounded-none"
      />
    </>
  )

  if (href) {
    return (
      <Link href={href} target={target} className={sharedClass} style={sharedStyle}>
        {inner}
      </Link>
    )
  }

  return (
    <button ref={ref} className={sharedClass} style={sharedStyle} {...props}>
      {inner}
    </button>
  )
})

InteractiveHoverButton.displayName = 'InteractiveHoverButton'

export { InteractiveHoverButton }
