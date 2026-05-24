'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'

// ── Project data ──────────────────────────────────────────────────

const PROJECTS = [
  { name: 'Grido',      thumb: 'https://placehold.co/220x130/0f1a0f/FF5E19?text=Grido' },
  { name: 'Stickify',   thumb: 'https://placehold.co/220x130/0f0f1a/5E9AFF?text=Stickify' },
  { name: 'Agentify',   thumb: 'https://placehold.co/220x130/1a0f1a/B05EFF?text=Agentify' },
  { name: 'AI Nest',    thumb: 'https://placehold.co/220x130/0f141a/3AB5FF?text=AI+Nest' },
  { name: 'Brandora',   thumb: 'https://placehold.co/220x130/1a0f0f/FF3E5E?text=Brandora' },
  { name: 'Codify',     thumb: 'https://placehold.co/220x130/0f1a14/5EFF9A?text=Codify' },
  { name: 'Dailyhub',   thumb: 'https://placehold.co/220x130/1a1a0f/FFD05E?text=Dailyhub' },
  { name: 'Flexify',    thumb: 'https://placehold.co/220x130/0f1a1a/5EFFEF?text=Flexify' },
  { name: 'StudyFlow',  thumb: 'https://placehold.co/220x130/1a120f/FF9A5E?text=StudyFlow' },
  { name: 'Gradia',     thumb: 'https://placehold.co/220x130/0f0f1a/A05EFF?text=Gradia' },
] as const

// Two copies for seamless loop
const ITEMS = [...PROJECTS, ...PROJECTS]

// ── Separator glyph between names ────────────────────────────────

function Dot() {
  return (
    <span
      aria-hidden
      className="mx-6 select-none text-[0.5rem] leading-none"
      style={{ color: '#FF5E19', opacity: 0.5 }}
    >
      ◆
    </span>
  )
}

// ── Single marquee item ───────────────────────────────────────────

function MarqueeItem({ name, thumb }: { name: string; thumb: string }) {
  return (
    <span className="group/item relative inline-flex items-center flex-shrink-0">
      {/* Thumbnail — floats above on hover */}
      <span
        className="
          pointer-events-none absolute bottom-[calc(100%+12px)] left-1/2 z-30
          w-[200px] -translate-x-1/2
          rounded-xl overflow-hidden
          border border-white/[0.1]
          opacity-0 translate-y-2
          transition-[opacity,transform] duration-300 ease-out
          group-hover/item:opacity-100 group-hover/item:translate-y-0
        "
        style={{
          boxShadow:
            '0 4px 6px rgba(0,0,0,0.4), 0 16px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
        }}
      >
        <Image
          src={thumb}
          alt={name}
          width={200}
          height={120}
          className="block w-full h-auto"
          draggable={false}
        />
        {/* Bottom label strip */}
        <span
          className="block px-3 py-2 text-[11px] font-semibold tracking-[0.06em] text-white/70"
          style={{ background: '#111111' }}
        >
          {name}
        </span>
      </span>

      {/* Name */}
      <span
        className="
          text-[1.375rem] font-bold text-white/40 leading-none cursor-default select-none
          transition-colors duration-200
          group-hover/item:text-white
        "
        style={{ letterSpacing: '-0.025em' }}
      >
        {name}
      </span>
    </span>
  )
}

// ── Marquee section ───────────────────────────────────────────────

export default function ProjectMarquee() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      id="notable-work"
      ref={ref}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative overflow-hidden"
      style={{
        background: '#060606',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Edge fade — left */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-20 w-24"
        style={{
          background: 'linear-gradient(to right, #060606 0%, transparent 100%)',
        }}
      />
      {/* Edge fade — right */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-20 w-24"
        style={{
          background: 'linear-gradient(to left, #060606 0%, transparent 100%)',
        }}
      />

      {/* Track */}
      <div
        className="flex items-center py-5 will-change-transform hover:[animation-play-state:paused]"
        style={{ animation: 'marquee 32s linear infinite' }}
      >
        {ITEMS.map((p, i) => (
          <span key={i} className="inline-flex items-center flex-shrink-0">
            <MarqueeItem name={p.name} thumb={p.thumb} />
            <Dot />
          </span>
        ))}
      </div>
    </motion.div>
  )
}
