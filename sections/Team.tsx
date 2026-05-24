'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import DisplayCards from '@/components/ui/display-cards'
import { cn } from '@/lib/utils'

// ── Team data ─────────────────────────────────────────────────────

const MEMBERS = [
  { name: 'Liam',   role: 'Product Designer',  img: 'https://placehold.co/320x320/1a1a1a/2a2a2a' },
  { name: 'Ethan',  role: 'Design Engineer',   img: 'https://placehold.co/320x320/1c1310/2e1e12' },
  { name: 'Morgan', role: 'Creative Director', img: 'https://placehold.co/320x320/10141c/121e2e' },
  { name: 'Sofia',  role: 'Lead Designer',     img: 'https://placehold.co/320x320/1a1a1a/2a2a2a' },
  { name: 'Noah',   role: 'Framer Developer',  img: 'https://placehold.co/320x320/1c1310/2e1e12' },
  { name: 'Olivia', role: 'Project Manager',   img: 'https://placehold.co/320x320/10141c/121e2e' },
] as const

// ── Reveal wrapper ────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Avatar icon for DisplayCard ────────────────────────────────────

function MemberAvatar({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-5 w-5 overflow-hidden rounded-full border border-white/20">
      <Image src={src} alt={alt} fill className="object-cover" />
    </div>
  )
}

// ── Build card props for a group of 3 ────────────────────────────

function buildGroupCards(members: readonly (typeof MEMBERS)[number][]) {
  const stackClasses = [
    "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:h-[100%] before:content-[''] before:bg-black/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:h-[100%] before:content-[''] before:bg-black/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration-700 hover:grayscale-0 before:left-0 before:top-0",
    "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
  ]

  return members.map((m, i) => ({
    icon: <MemberAvatar src={m.img} alt={m.name} />,
    title: m.name,
    description: m.role,
    date: 'Team member',
    iconClassName: 'text-orange-400',
    titleClassName: 'text-white',
    className: stackClasses[i],
  }))
}

// ── Team section ──────────────────────────────────────────────────

export default function Team() {
  const group1 = MEMBERS.slice(0, 3)

  return (
    <section id="team" className="relative pt-24 md:pt-32 pb-56 md:pb-64 px-6 md:px-10">

      {/* ── Ambient glow ────────────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(255,94,25,0.04) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">

        {/* ── Section header ───────────────────────────────────── */}
        <Reveal className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-2">
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#FF5E19' }}
            >
              What do people
            </span>
            <h2
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-none"
              style={{ letterSpacing: '-0.03em' }}
            >
              Think about me
            </h2>
          </div>
        </Reveal>

        {/* Thin rule */}
        <div
          className="mb-20"
          style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
        />

        {/* ── Card group ──────────────────────────────────────── */}
        <div className="flex justify-center">
          <Reveal delay={0.1}>
            <div style={{ transform: 'scale(1.35)', transformOrigin: 'center top' }}>
              <DisplayCards cards={buildGroupCards(group1)} />
            </div>
          </Reveal>
        </div>

      </div>
    </section>
  )
}
