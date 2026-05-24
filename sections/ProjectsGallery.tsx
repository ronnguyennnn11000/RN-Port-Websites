'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ── Project data ───────────────────────────────────────────── */
type Project = {
  title: string
  category: string
  accentColor: string
  aspect: string
  imageMaxWidth?: string
  images: string[]
}

const PROJECTS: Project[] = [
  {
    title: 'Skull and Bones',
    category: 'Game Art · Liberty',
    accentColor: '#FF5E19',
    aspect: '16/9',
    images: [
      '/images/liberty/LTY_ILL_For_Honor_Collab_Poster.jpg',
      '/images/liberty/LTY_ILL_Waterspout_Final.jpg',
      '/images/liberty/LTY_ILL_Y2S2_Smuggler_Pass_Poster.png',
      '/images/liberty/LTY_ILL_Y2S4_Smuggler_Pass_Poster_Final_16x9.jpg',
    ],
  },
  {
    title: 'U-Home',
    category: 'Freelance',
    accentColor: '#3ab5a0',
    aspect: '1/1',
    imageMaxWidth: '640px',
    images: [
      '/images/u-home/Promotion_1.png',
      '/images/u-home/Promotion_2.png',
      '/images/u-home/Promotion_3.png',
      '/images/u-home/Promotion_4.png',
    ],
  },
]

/* ── Slide variants ─────────────────────────────────────────── */
const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '6%' : '-6%',
    opacity: 0,
  }),
  center: {
    x: '0%',
    opacity: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir: number) => ({
    x: dir > 0 ? '-6%' : '6%',
    opacity: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  }),
}

/* ── Arrow button ───────────────────────────────────────────── */
function ArrowBtn({
  dir,
  onClick,
  accentColor,
}: {
  dir: 'left' | 'right'
  onClick: () => void
  accentColor: string
}) {
  return (
    <button
      onClick={onClick}
      aria-label={dir === 'left' ? 'Previous image' : 'Next image'}
      className="group/btn flex-shrink-0 relative flex items-center justify-center
                 w-11 h-11 rounded-full
                 border border-white/[0.1] bg-white/[0.05]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40
                 active:scale-95"
      style={{ transition: 'background-color 0.2s ease, transform 0.15s ease' }}
      onMouseEnter={e => {
        ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = `${accentColor}22`
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = `${accentColor}55`
      }}
      onMouseLeave={e => {
        ;(e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.05)'
        ;(e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.1)'
      }}
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
        className="w-4 h-4 text-white/50 group-hover/btn:text-white"
        style={{ transition: 'color 0.2s ease' }}
      >
        {dir === 'left' ? (
          <path
            d="M10 3L5 8l5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M6 3l5 5-5 5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  )
}

/* ── Shared scroll-reveal wrapper ───────────────────────────── */
function Reveal({
  children,
  delay = 0,
}: {
  children: React.ReactNode
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-8% 0px' })

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 28 },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1], delay },
        },
      }}
      initial="hidden"
      animate={inView ? 'show' : 'hidden'}
    >
      {children}
    </motion.div>
  )
}

/* ── Project row ────────────────────────────────────────────── */
function ProjectRow({
  title,
  category,
  accentColor,
  aspect,
  imageMaxWidth,
  images,
  revealDelay,
}: Project & { revealDelay: number }) {
  const [current, setCurrent] = useState(0)
  const [dir, setDir] = useState(1)

  const go = (d: 1 | -1) => {
    setDir(d)
    setCurrent(c => (c + d + images.length) % images.length)
  }

  return (
    <Reveal delay={revealDelay}>
      <div className="flex flex-col gap-4">

        {/* Row header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span
              className="block w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: accentColor, boxShadow: `0 0 6px ${accentColor}` }}
            />
            <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-white/30 select-none">
              {category}
            </span>
            <span className="text-white/10 select-none">·</span>
            <h3 className="text-[0.9375rem] font-semibold tracking-[-0.02em] text-white/80">
              {title}
            </h3>
          </div>

          {/* Counter */}
          <span className="text-[11px] tabular-nums text-white/25 select-none font-medium tracking-[0.04em]">
            {String(current + 1).padStart(2, '0')}&thinsp;/&thinsp;{String(images.length).padStart(2, '0')}
          </span>
        </div>

        {/* Arrows + image */}
        <div className={`flex items-center gap-3 md:gap-4 ${imageMaxWidth ? 'justify-center' : ''}`}>

          <ArrowBtn dir="left" onClick={() => go(-1)} accentColor={accentColor} />

          {/* Image frame */}
          <div
            className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black ${imageMaxWidth ? 'w-full' : 'flex-1'}`}
            style={{
              aspectRatio: aspect,
              ...(imageMaxWidth ? { maxWidth: imageMaxWidth } : {}),
              boxShadow: '0 12px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03)',
            }}
          >
            {/* Bottom gradient */}
            <div
              aria-hidden
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.45) 0%, transparent 40%)',
              }}
            />

            {/* Accent glow at bottom */}
            <div
              aria-hidden
              className="absolute inset-0 z-10 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at 50% 100%, ${accentColor}10 0%, transparent 55%)`,
              }}
            />

            {/* Sliding image */}
            <AnimatePresence custom={dir} mode="wait">
              <motion.div
                key={current}
                custom={dir}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <Image
                  src={images[current]}
                  alt={`${title} — ${current + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 90vw"
                  priority={current === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Dot indicators */}
            <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDir(i > current ? 1 : -1); setCurrent(i) }}
                  aria-label={`Go to image ${i + 1}`}
                  className="focus-visible:outline-none"
                  style={{
                    width: i === current ? '18px' : '5px',
                    height: '5px',
                    borderRadius: '9999px',
                    backgroundColor: i === current ? '#fff' : 'rgba(255,255,255,0.3)',
                    transition: 'width 0.3s ease, background-color 0.25s ease',
                    flexShrink: 0,
                  }}
                />
              ))}
            </div>
          </div>

          <ArrowBtn dir="right" onClick={() => go(1)} accentColor={accentColor} />

        </div>
      </div>
    </Reveal>
  )
}

/* ── Section ────────────────────────────────────────────────── */
export default function ProjectsGallery() {
  return (
    <section id="gallery" className="relative section-padding overflow-hidden">

      {/* ── Ambient glows ─────────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-[30%] left-[5%] -translate-y-1/2
                     w-[600px] h-[600px] rounded-full
                     bg-accent/[0.04] blur-[150px]"
        />
        <div
          className="absolute bottom-[10%] right-[5%]
                     w-[400px] h-[400px] rounded-full"
          style={{ background: 'rgba(58,181,160,0.025)', filter: 'blur(130px)' }}
        />
      </div>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10">

        {/* Section header */}
        <div className="mb-14 md:mb-20">
          <Reveal delay={0}>
            <span
              className="inline-flex items-center gap-2 mb-5
                         text-[10px] font-bold tracking-[0.18em] uppercase
                         text-white/32 select-none"
            >
              <span
                aria-hidden
                className="block w-5 h-px"
                style={{
                  background: 'linear-gradient(90deg, #FF5E19, transparent)',
                  boxShadow: '0 0 6px rgba(255,94,25,0.55)',
                }}
              />
              Gallery
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h2
              className="text-[clamp(2.5rem,5.5vw,4.25rem)] font-bold
                         leading-[1.03] tracking-[-0.04em] text-white
                         mb-6 max-w-[20ch]"
            >
              Art&nbsp;Pieces
            </h2>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="text-white/44 text-[0.9375rem] leading-[1.78] max-w-[52ch]">
              Translate data, insight, metric and talk to customer via Art pieces
            </p>
          </Reveal>
        </div>

        {/* Rows */}
        <div className="flex flex-col gap-14 md:gap-20">
          {PROJECTS.map((project, i) => (
            <ProjectRow
              key={project.title}
              {...project}
              revealDelay={i * 0.1}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
