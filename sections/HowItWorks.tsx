'use client'

import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { GlowCard } from '@/components/ui/spotlight-card'

// ── Step data ─────────────────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    label: 'Strategy Over Tactics',
    description:
      'Every asset, campaign, and test starts with a clear "why." Execution without positioning is noise.',
  },
  {
    number: '02',
    label: 'Data, Then Instinct',
    description:
      'Lead with numbers. Use instinct when data runs out. Know the difference.',
  },
  {
    number: '03',
    label: 'Simple Always Wins',
    description:
      'If you can\'t explain the positioning in one sentence, it isn\'t ready. Clarity is a competitive advantage.',
  },
  {
    number: '04',
    label: 'Learn in Public',
    description:
      'Every project — win or miss — is documented, analyzed, and fed back into the next iteration.',
  },
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

// ── Connector arrow (desktop only) ───────────────────────────────

function Connector() {
  return (
    <div
      aria-hidden
      className="hidden lg:flex items-center flex-shrink-0 w-12 xl:w-16 mt-[-1.5rem]"
    >
      {/* Dashed line */}
      <div
        className="flex-1 border-t-[1.5px] border-dashed"
        style={{ borderColor: 'rgba(255,94,25,0.22)' }}
      />
      {/* Arrow head */}
      <svg
        viewBox="0 0 8 10"
        fill="none"
        className="w-2 h-2.5 flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 1l6 4-6 4"
          stroke="#FF5E19"
          strokeOpacity="0.4"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

// ── Step card ─────────────────────────────────────────────────────

function StepCard({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof STEPS)[number]
  index: number
  scrollYProgress: MotionValue<number>
}) {
  const segment = 1 / STEPS.length          // 0.25 per card
  const cardEntry = index * segment * 0.6   // compress to first 60% of scroll; remainder is dwell

  const y = useTransform(
    scrollYProgress,
    [Math.max(0, cardEntry - 0.02), cardEntry + segment * 0.8],
    ['68px', '0px'],
  )
  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, cardEntry), cardEntry + segment * 0.7],
    [0, 1],
  )

  return (
    <motion.div style={{ y, opacity }} className="flex-1 min-w-0 flex">
      <GlowCard
        customSize
        glowColor="orange"
        className="w-full h-full group transition-transform duration-300 hover:-translate-y-1"
      >
        {/* Hover accent bloom */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(ellipse at 50% 0%, rgba(255,94,25,0.09) 0%, transparent 70%)',
          }}
        />

        {/* Card content */}
        <div className="relative flex flex-col h-full">
          {/* Number pill */}
          <div className="mb-5 flex items-center gap-3">
            <span
              className="inline-flex items-center justify-center w-9 h-9 rounded-full
                         border border-white/[0.08] bg-white/[0.03]
                         font-mono text-[11px] font-semibold tracking-[0.15em]"
              style={{ color: '#FF5E19' }}
            >
              {step.number}
            </span>

            {/* Top rule */}
            <div
              className="flex-1 h-px"
              style={{
                background:
                  'linear-gradient(to right, rgba(255,94,25,0.3), transparent)',
              }}
            />
          </div>

          {/* Label */}
          <h3
            className="text-[1.25rem] xl:text-[1.375rem] font-bold text-white mb-3 leading-tight"
            style={{ letterSpacing: '-0.025em' }}
          >
            {step.label}
          </h3>

          {/* Description */}
          <p className="mt-3 text-[0.875rem] leading-[1.75] text-white/45">
            {step.description}
          </p>
        </div>
      </GlowCard>
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────

export default function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // 4 cards + 1.4 buffer screens = 540vh total; each card gets ~1 screen of scroll
  const sectionHeight = `${(STEPS.length + 1.4) * 100}vh`

  return (
    <section
      ref={containerRef}
      id="how-it-works"
      className="relative"
      style={{ height: sectionHeight }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Ambient glow */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                       w-[900px] h-[500px] rounded-full"
            style={{
              background:
                'radial-gradient(ellipse, rgba(255,94,25,0.05) 0%, transparent 65%)',
              filter: 'blur(60px)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto w-full px-6 md:px-10">

          {/* ── Header ──────────────────────────────────────────── */}
          <Reveal delay={0} className="mb-14 md:mb-16">
            <div className="flex flex-col items-center text-center gap-4">
              {/* Heading */}
              <h2
                className="text-[clamp(2rem,5vw,3.75rem)] font-bold text-white leading-none"
                style={{ letterSpacing: '-0.035em' }}
              >
                What Make Me{' '}
                <span style={{ color: '#FF5E19' }}>Special</span>
              </h2>

              {/* Subtitle */}
              <p
                className="text-white/45 text-[1.125rem] md:text-xl leading-[1.7] max-w-[40ch]"
              >
                As a{' '}
                <span className="text-white text-[1.375rem] md:text-2xl font-semibold">Product Marketer</span>
              </p>
            </div>
          </Reveal>

          {/* ── Steps row ───────────────────────────────────────── */}
          <div className="flex flex-col gap-4 lg:flex-row lg:items-stretch lg:gap-0">
            {STEPS.map((step, i) => (
              <React.Fragment key={step.number}>
                <StepCard step={step} index={i} scrollYProgress={scrollYProgress} />
                {i < STEPS.length - 1 && <Connector />}
              </React.Fragment>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}
