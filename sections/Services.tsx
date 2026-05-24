'use client'

import { useRef } from 'react'
import Image from 'next/image'
import { motion, useScroll, useTransform, useInView, MotionValue } from 'framer-motion'

// ── Service data ─────────────────────────────────────────────────

type ServiceSection = { label: string; text: string }
type ServiceStat = { value: string; label: string }

type ServiceItem = {
  number: string
  title: string
  tagline?: string
  description?: string
  sections?: ServiceSection[]
  stats?: ServiceStat[]
  tags: string[]
  image: string
  imageAlt: string
  imagePosition?: string
}

// Renders text with **bold** markers as <strong> elements
function renderRichText(text: string) {
  const parts = text.split(/\*\*(.*?)\*\*/g)
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-white/80">
        {part}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  )
}

const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: 'Prince of Persia: The Lost Crown Mobile',
    sections: [
      {
        label: 'Problem',
        text: 'Prince of Persia needed a mobile launch strategy for a premium IP in a market crowded with F2P titles. The challenge: how to convert legacy brand equity into day-one mobile installs without cannibalizing the console audience.',
      },
      {
        label: 'Insight',
        text: "By analyzing **Dead Cells' multi-platform rollout** (iOS 2019 → Android 2020 → Apple Arcade 2022 → Netflix 2023) across 20+ competitive sources including Reddit and X community data, I identified that **community-first pre-launch seeding** — not paid UA — was the primary driver of Dead Cells' 5M mobile sales.",
      },
      {
        label: 'Strategy',
        text: 'Built a GTM playbook centered on **owned community activation + cross-platform player segmentation**, with messaging frameworks tailored to console converts vs. mobile-first players. Aligned creative direction, positioning, and channel mix across teams.',
      },
    ],
    stats: [
      { value: '300K', label: 'Early access target players' },
      { value: '20+', label: 'Competitive intel sources' },
      { value: '5M', label: 'Benchmark: Dead Cells mobile' },
    ],
    tags: ['GTM Strategy', 'Win/Loss Analysis', 'Competitive Intel', 'Persona Dev'],
    tagline: 'Building a mobile GTM playbook from competitive benchmarking to pre-launch community strategy',
    image: '/images/prince-of-persia-hd.jpg',
    imageAlt: 'Prince of Persia: The Lost Crown Mobile showcase',
    imagePosition: 'center 15%',
  },
  {
    number: '02',
    title: 'Hungry Shark Area: Halloween Launch',
    tagline: 'Transforming a NANO bundle minigame into a standalone title through seasonal repositioning',
    sections: [
      {
        label: 'Problem',
        text: "Hungry Shark Area was Ubisoft's top-performing NANO bundle minigame but had plateaued in engagement as a bundled product. The business objective: expand its addressable audience by repositioning it as a standalone title during the high-revenue Q4 season.",
      },
      {
        label: 'Insight',
        text: 'Player behavior data and seasonal trend analysis showed that **Halloween-themed content drove the highest engagement spikes in Q4** across comparable mobile titles, while Horror as a genre was systematically underserved in the casual gaming segment.',
      },
      {
        label: 'Strategy',
        text: 'Orchestrated a full **brand refresh and repositioning campaign** — new visual identity, messaging framework, and partner-aligned promotional strategy — targeting both existing players and new horror-casual segments during the Halloween window.',
      },
    ],
    stats: [
      { value: '#2', label: 'Launch performer in NANO bundle' },
      { value: 'Q4', label: 'High-revenue seasonal window' },
      { value: '↑', label: 'Engagement vs. prior release' },
    ],
    tags: ['Repositioning', 'Seasonal GTM', 'Brand Identity', 'Partner Comms'],
    image: '/images/hungry-shark-halloween.jpg',
    imageAlt: 'Hungry Shark Area Halloween Launch showcase',
    imagePosition: 'center center',
  },
  {
    number: '03',
    title: 'Skull & Bones',
    tagline: 'Translating a pirate-adventure USP into cohesive cross-channel acquisition assets',
    sections: [
      {
        label: 'Challenge',
        text: "Skull & Bones had one of the longest development cycles in Ubisoft history, creating a positioning challenge: how to rebuild player anticipation and clearly communicate a differentiated USP to an audience that had grown skeptical about the title's promise.",
      },
      {
        label: 'Approach',
        text: "Collaborated with Product and Brand teams to **define and codify the game's core USP** — the strategic naval simulation fantasy — and build a messaging framework that could be consistently applied across all asset types: social, in-store, promotional, and in-game monetization surfaces.",
      },
      {
        label: 'Execution',
        text: 'Produced the full suite of launch marketing assets — **posters, screenshots, video trailers, and monetization creatives** — all anchored to the validated USP and reviewed for brand compliance before multi-channel deployment.',
      },
    ],
    stats: [
      { value: 'AAA', label: 'Global Ubisoft release' },
      { value: '4+', label: 'Asset types delivered' },
      { value: '100%', label: 'Brand compliance' },
    ],
    tags: ['USP Messaging', 'Asset Production', 'Monetization Copy', 'Brand Compliance'],
    image: '/images/skull-and-bones.avif',
    imageAlt: 'Skull & Bones launch marketing showcase',
    imagePosition: 'center center',
  },
]

// ── Single card ───────────────────────────────────────────────────

function ServiceCard({
  service,
  index,
  total,
  scrollYProgress,
}: {
  service: ServiceItem
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const segment = 1 / total
  const cardEntry = index * segment * 0.6

  // ── Slide up from below on entry ──────────────────────────────
  const y = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 1]
      : [Math.max(0, cardEntry - 0.04), cardEntry + segment * 0.22],
    index === 0 ? ['0px', '0px'] : ['68px', '0px'],
  )

  // ── Fade in on entry ──────────────────────────────────────────
  const opacity = useTransform(
    scrollYProgress,
    index === 0
      ? [0, 0.001]
      : [Math.max(0, cardEntry - 0.02), cardEntry + segment * 0.16],
    index === 0 ? [1, 1] : [0, 1],
  )

  // ── Scale down when cards stack on top ────────────────────────
  // Each card that enters above this one reduces its scale by 0.04.
  // Build a stepped keyframe array so each reduction is crisp.
  const scaleInputs: number[] = [0]
  const scaleOutputs: number[] = [1]

  for (let j = index + 1; j < total; j++) {
    const nextEntry = j * segment * 0.6
    scaleInputs.push(nextEntry - 0.01, nextEntry + segment * 0.2)
    scaleOutputs.push(
      1 - (j - index - 1) * 0.04, // scale just before card j finishes entering
      1 - (j - index) * 0.04,     // scale just after
    )
  }
  // Hold the final value through the end of scroll
  scaleInputs.push(1)
  scaleOutputs.push(scaleOutputs[scaleOutputs.length - 1])

  const scale = useTransform(scrollYProgress, scaleInputs, scaleOutputs)

  return (
    <motion.div
      style={{ y, opacity, scale, zIndex: 10 + index }}
      className="absolute inset-0 flex items-center justify-center px-4 sm:px-6 md:px-8"
    >
      {/* ── Card shell ────────────────────────────────────────── */}
      <div
        className="w-full max-w-7xl overflow-hidden rounded-[2rem] border border-white/[0.06]"
        style={{
          background: 'linear-gradient(145deg, #161616 0%, #111111 55%, #0e0e0e 100%)',
          boxShadow:
            '0 4px 6px rgba(0,0,0,0.3), 0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.05)',
        }}
      >
        <div className="flex min-h-[540px] flex-col lg:flex-row">

          {/* ── Left: content ────────────────────────────────── */}
          <div className="flex flex-1 flex-col justify-between gap-6 p-8 md:p-10 lg:p-12">
            <div className="flex flex-col gap-5">

              {/* Number + title */}
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span
                    className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase flex-shrink-0"
                    style={{ color: '#FF5E19', opacity: 0.75 }}
                  >
                    {service.number}
                  </span>
                  <h3
                    className="text-[clamp(1rem,1.8vw,1.5rem)] font-bold text-white leading-none whitespace-nowrap"
                    style={{ letterSpacing: '-0.03em' }}
                  >
                    {service.title}
                  </h3>
                </div>
                {service.tagline && (
                  <p
                    className="text-[0.8125rem] leading-[1.6] text-white/40 pl-[calc(1ch+12px)]"
                    style={{ maxWidth: '52ch' }}
                  >
                    {service.tagline}
                  </p>
                )}
              </div>

              {/* Rich sections (PROBLEM / INSIGHT / STRATEGY) */}
              {service.sections ? (
                <div className="flex flex-col gap-3.5">
                  {service.sections.map((section) => (
                    <div key={section.label} className="flex flex-col gap-1">
                      <span
                        className="text-[0.625rem] font-semibold tracking-[0.18em] uppercase"
                        style={{ color: '#FF5E19' }}
                      >
                        {section.label}
                      </span>
                      <p className="text-[0.875rem] leading-[1.7] text-white/[0.45]">
                        {renderRichText(section.text)}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                /* Plain description */
                <p
                  className="text-[0.9375rem] leading-[1.75] text-white/[0.45]"
                  style={{ maxWidth: '38ch' }}
                >
                  {service.description}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4">
              {/* Stats row */}
              {service.stats && (
                <div className="flex gap-8 pb-1">
                  {service.stats.map((stat) => (
                    <div key={stat.value} className="flex flex-col gap-0.5">
                      <span
                        className="text-[1.75rem] font-bold leading-none text-white"
                        style={{ letterSpacing: '-0.03em' }}
                      >
                        {stat.value}
                      </span>
                      <span className="text-[0.6875rem] text-white/[0.35] leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/[0.09] bg-white/[0.03] px-3 py-1.5 text-[0.6875rem] font-medium tracking-[0.06em] text-white/50"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right: image ─────────────────────────────────── */}
          <div className="relative min-h-[200px] overflow-hidden rounded-b-[2rem] lg:min-h-0 lg:w-[44%] lg:rounded-b-none lg:rounded-r-[2rem]">
            <Image
              src={service.image}
              alt={service.imageAlt}
              fill
              className="object-cover"
              style={{ objectPosition: service.imagePosition ?? 'center center' }}
            />

            {/* Left-to-right gradient fades image into card bg */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(to right, #111111 0%, rgba(17,17,17,0.35) 35%, transparent 65%)',
              }}
            />

            {/* Bottom vignette */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 50%)',
              }}
            />

            {/* Subtle accent colour wash */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{ background: '#FF5E19', mixBlendMode: 'overlay' }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ── Reveal wrapper for Services header ────────────────────────────

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
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Services section ──────────────────────────────────────────────

export default function Services() {
  const containerRef = useRef<HTMLDivElement>(null)

  // scrollYProgress: 0 when section top hits viewport top,
  //                  1 when section bottom hits viewport bottom.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Section is tall enough so each card gets ~100vh of scroll distance.
  // 3 cards → (3 + 1.4) * 100vh = 440vh; total scroll = 440vh - 100vh = 340vh.
  const sectionHeight = `${(SERVICES.length + 1.4) * 100}vh`

  return (
    <section
      ref={containerRef}
      id="services"
      className="relative"
      style={{ height: sectionHeight }}
    >
      {/* ── Sticky viewport ─────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

        {/* Ambient glow — subtle accent bloom at bottom */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div
            className="absolute bottom-[-80px] left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full"
            style={{
              background:
                'radial-gradient(ellipse, rgba(255,94,25,0.05) 0%, transparent 68%)',
              filter: 'blur(40px)',
            }}
          />
        </div>

        {/* ── Section header ───────────────────────────────────── */}
        <Reveal className="relative z-20 flex items-end justify-between px-6 md:px-12 pt-16 pb-4">
          <div className="flex flex-col gap-1.5">
            <span
              className="text-[10px] font-semibold tracking-[0.2em] uppercase"
              style={{ color: '#FF5E19' }}
            >
              What I have
            </span>
            <h2
              className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-none"
              style={{ letterSpacing: '-0.03em' }}
            >
              Achieved
            </h2>
          </div>

          {/* Card number indicators */}
          <div className="hidden items-center gap-3 pb-1 md:flex">
            {SERVICES.map((s) => (
              <span
                key={s.number}
                className="font-mono text-[11px] text-white/[0.2] tracking-widest"
              >
                {s.number}
              </span>
            ))}
          </div>
        </Reveal>

        {/* Thin rule below header */}
        <div
          className="mx-6 md:mx-12"
          style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
        />

        {/* ── Cards stack area ─────────────────────────────────── */}
        <div className="relative flex-1">
          {SERVICES.map((service, i) => (
            <ServiceCard
              key={service.number}
              service={service}
              index={i}
              total={SERVICES.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
