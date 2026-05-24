'use client'

import { useRef, useState, useEffect, useMemo } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'

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
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Section ───────────────────────────────────────────────────────

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null)

  // Animated cycling words
  const titles = useMemo(() => ['Great', 'Awesome', 'Impactful', 'Magnificent'], [])
  const [titleNumber, setTitleNumber] = useState(0)

  useEffect(() => {
    const id = setTimeout(() => {
      setTitleNumber(n => (n === titles.length - 1 ? 0 : n + 1))
    }, 2200)
    return () => clearTimeout(id)
  }, [titleNumber, titles])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  // Slow parallax on decorative text
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <section
      ref={sectionRef}
      id="cta"
      className="relative py-28 md:py-40 px-6 md:px-10 overflow-hidden"
    >
      {/* ── Multi-layer background glows ──────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* Bottom-center warm bloom */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px]"
          style={{
            background:
              'radial-gradient(ellipse at center bottom, rgba(255,94,25,0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
        />
        {/* Top subtle cool layer */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px]"
          style={{
            background:
              'radial-gradient(ellipse at center top, rgba(255,255,255,0.015) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Top rule */}
        <div
          className="absolute top-0 inset-x-0 h-px"
          style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.07), transparent)' }}
        />
      </div>

      {/* ── Decorative outlined text (parallax) ───────────── */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none"
        style={{ y: bgTextY }}
      >
        <span
          className="text-[clamp(5rem,18vw,16rem)] font-black leading-none whitespace-nowrap"
          style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.04)',
            color: 'transparent',
            letterSpacing: '-0.04em',
          }}
        >
          LET&apos;S TALK
        </span>
      </motion.div>

      {/* ── Content ───────────────────────────────────────── */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center gap-6">

        {/* Availability badge */}
        <Reveal delay={0}>
          <span
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                       border border-white/[0.09] bg-white/[0.04]
                       text-[10px] font-semibold tracking-[0.15em] text-white/50 uppercase select-none"
          >
            {/* Pulsing green dot */}
            <span className="relative flex h-1.5 w-1.5">
              <span
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                style={{ background: '#22c55e' }}
              />
              <span
                className="relative inline-flex rounded-full h-1.5 w-1.5"
                style={{ background: '#22c55e' }}
              />
            </span>
            AVAILABLE FOR WORK
          </span>
        </Reveal>

        {/* Heading */}
        <Reveal delay={0.08}>
          <h2
            className="text-[clamp(2.5rem,6.5vw,5rem)] font-bold text-white leading-[1.05] text-center"
            style={{ letterSpacing: '-0.04em' }}
          >
            <span className="block">Let&apos;s build something</span>
            <span
              className="relative flex justify-center overflow-hidden"
              style={{ height: '1.15em' }}
            >
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute"
                  style={{ color: '#FF5E19' }}
                  initial={{ opacity: 0, y: '-100%' }}
                  transition={{ type: 'spring', stiffness: 50, damping: 14 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? '-100%' : '100%', opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </h2>
        </Reveal>

        {/* Subtext */}
        <Reveal delay={0.16}>
          <p
            className="text-white/45 text-[1rem] md:text-[1.125rem] leading-[1.75] max-w-[38ch]"
          >
            Open to full-time roles and select contract work.
            <br />
            Let&apos;s find something worth building.
          </p>
        </Reveal>

        {/* Buttons */}
        <Reveal delay={0.24} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
          <InteractiveHoverButton
            text="Start a Project"
            href="mailto:hello@ronnguyen.com"
          />

          <a
            href="/resume"
            className="group inline-flex items-center gap-1.5 text-[0.9rem] font-medium
                       text-white/45 hover:text-white/80 transition-colors duration-200"
            style={{ letterSpacing: '-0.01em' }}
          >
            or view my full resume
            <svg
              viewBox="0 0 16 16"
              fill="none"
              className="w-3.5 h-3.5 translate-x-0 group-hover:translate-x-0.5 transition-transform duration-200"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8h10M9 4l4 4-4 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </Reveal>

      </div>

      {/* ── Scrolling marquee at bottom ────────────────────── */}
      <div className="absolute bottom-0 inset-x-0 overflow-hidden py-5 border-t border-white/[0.06]">
        <div
          className="flex gap-12 whitespace-nowrap"
          style={{
            animation: 'marquee-scroll 24s linear infinite',
            width: 'max-content',
          }}
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="flex items-center gap-12 text-[0.75rem] font-semibold tracking-[0.2em] uppercase select-none"
              style={{ color: 'rgba(255,255,255,0.18)' }}
            >
              <span>Available for work</span>
              <span style={{ color: '#FF5E19', fontSize: '0.6rem' }}>◆</span>
              <span>Open to collaboration</span>
              <span style={{ color: '#FF5E19', fontSize: '0.6rem' }}>◆</span>
              <span>Let&apos;s build together</span>
              <span style={{ color: '#FF5E19', fontSize: '0.6rem' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
