'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

// ── FAQ data ───────────────────────────────────────────────────────

const FAQS = [
  {
    id: 'q1',
    question: 'What services are offered?',
    answer:
      'We offer end-to-end web design and development — from wireframes and brand identity to full Framer or custom-coded builds. Every engagement is scoped to your specific goals, so you only pay for what you actually need.',
  },
  {
    id: 'q2',
    question: 'Who is this for?',
    answer:
      'Founders, startups, and growing businesses who need a website that does more than look good. If you\'re tired of templates that look like everyone else\'s site, we\'re built for you.',
  },
  {
    id: 'q3',
    question: 'How do projects start?',
    answer:
      'We kick off with a discovery call to understand your goals, audience, and timeline. From there we send a scoped proposal — usually within 48 hours. Once approved, design begins the following week.',
  },
  {
    id: 'q4',
    question: 'How long does delivery take?',
    answer:
      'Most projects wrap in 2–4 weeks depending on scope. A single landing page can be done in under a week; a full multi-page site with CMS usually takes 3–4 weeks. We\'ll give you a firm timeline before we start.',
  },
  {
    id: 'q5',
    question: 'Is Framer required?',
    answer:
      'Not at all. We work in Framer, Next.js, and plain HTML/CSS — whatever fits your workflow and hosting setup. We\'ll recommend the best tool for your project during the discovery phase.',
  },
  {
    id: 'q6',
    question: 'Can we customize after delivery?',
    answer:
      'Yes. Every project is handed off with full documentation and, where applicable, a CMS so your team can update content without touching code. We also offer ongoing retainer packages for deeper changes.',
  },
  {
    id: 'q7',
    question: 'Do you offer support?',
    answer:
      'All projects include a 30-day post-launch support window for bug fixes and minor tweaks at no extra charge. Longer-term support is available via a monthly retainer.',
  },
  {
    id: 'q8',
    question: 'What about updates after launch?',
    answer:
      'We offer flexible update packages — from a simple hours bank you can draw on anytime, to a dedicated monthly retainer for teams that ship fast. Either way, you\'re never on your own after go-live.',
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

// ── Plus / Minus icon ─────────────────────────────────────────────

function ToggleIcon({ open }: { open: boolean }) {
  return (
    <motion.div
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-shrink-0 w-8 h-8 rounded-full border border-white/[0.1]
                 bg-white/[0.04] flex items-center justify-center"
      style={{
        boxShadow: open
          ? '0 0 0 1px rgba(255,94,25,0.3), 0 0 16px rgba(255,94,25,0.08)'
          : 'none',
        borderColor: open ? 'rgba(255,94,25,0.35)' : 'rgba(255,255,255,0.08)',
        transition: 'border-color 0.35s ease, box-shadow 0.35s ease',
      }}
    >
      {/* Horizontal bar — always visible */}
      <span
        className="absolute block w-3.5 h-px rounded-full"
        style={{ background: open ? '#FF5E19' : 'rgba(255,255,255,0.5)' }}
      />
      {/* Vertical bar — fades out when open */}
      <motion.span
        animate={{ opacity: open ? 0 : 1, scaleY: open ? 0 : 1 }}
        transition={{ duration: 0.25, ease: 'easeInOut' }}
        className="absolute block w-px h-3.5 rounded-full"
        style={{ background: 'rgba(255,255,255,0.5)' }}
      />
    </motion.div>
  )
}

// ── Accordion item ────────────────────────────────────────────────

function AccordionItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[number]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <Reveal delay={0.05 + index * 0.06}>
      <div
        className="relative rounded-xl border overflow-hidden"
        style={{
          borderColor: isOpen
            ? 'rgba(255,94,25,0.2)'
            : 'rgba(255,255,255,0.07)',
          background: isOpen
            ? 'linear-gradient(145deg, #161616 0%, #111111 100%)'
            : 'linear-gradient(145deg, #0f0f0f 0%, #0a0a0a 100%)',
          boxShadow: isOpen
            ? '0 2px 4px rgba(0,0,0,0.3), 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,94,25,0.06)'
            : '0 1px 2px rgba(0,0,0,0.2)',
          transition: 'border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease',
        }}
      >
        {/* Accent bloom — visible when open */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background:
              'radial-gradient(ellipse at 0% 50%, rgba(255,94,25,0.05) 0%, transparent 60%)',
            opacity: isOpen ? 1 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />

        {/* Trigger button */}
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="relative z-10 w-full flex items-center justify-between gap-4
                     px-6 py-5 text-left group"
        >
          <span
            className="text-[0.9375rem] md:text-[1rem] font-semibold leading-snug"
            style={{
              color: isOpen ? '#ffffff' : 'rgba(255,255,255,0.75)',
              letterSpacing: '-0.01em',
              transition: 'color 0.3s ease',
            }}
          >
            {faq.question}
          </span>
          <ToggleIcon open={isOpen} />
        </button>

        {/* Expandable answer */}
        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              key="answer"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div
                className="relative z-10 px-6 pb-6"
                style={{
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  paddingTop: '1.125rem',
                }}
              >
                <p
                  className="text-[0.875rem] leading-[1.75]"
                  style={{ color: 'rgba(255,255,255,0.45)' }}
                >
                  {faq.answer}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Reveal>
  )
}

// ── Section ───────────────────────────────────────────────────────

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null)

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      id="faq"
      className="relative py-24 md:py-32 px-6 md:px-10 overflow-hidden"
    >
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                     w-[800px] h-[600px] rounded-full"
          style={{
            background:
              'radial-gradient(ellipse, rgba(255,94,25,0.04) 0%, transparent 65%)',
            filter: 'blur(80px)',
          }}
        />
      </div>

      <div className="relative z-10 max-w-3xl mx-auto">

        {/* ── Header ──────────────────────────────────────────── */}
        <Reveal delay={0} className="mb-14 md:mb-16">
          <div className="flex flex-col items-center text-center gap-4">
            {/* Eyebrow */}
            <span
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full
                         border border-white/[0.09] bg-white/[0.04]
                         text-[10px] font-semibold tracking-[0.15em] text-white/45 uppercase select-none"
            >
              <span
                className="block w-1.5 h-1.5 rounded-full"
                style={{
                  background: '#FF5E19',
                  boxShadow: '0 0 6px rgba(255,94,25,0.8)',
                }}
                aria-hidden
              />
              FAQ
            </span>

            {/* Heading */}
            <h2
              className="text-[clamp(1.75rem,4.5vw,3.25rem)] font-bold text-white leading-none"
              style={{ letterSpacing: '-0.035em' }}
            >
              FREQUENTLY ASKED
              <br />
              <span style={{ color: 'rgba(255,255,255,0.5)' }}>QUESTIONS</span>
            </h2>

            {/* Subtitle */}
            <p
              className="text-white/45 text-[0.9375rem] md:text-base leading-[1.7] max-w-[44ch]"
            >
              This is different — we get that. You may have questions,{' '}
              <span className="text-white/65">here are some answers.</span>
            </p>
          </div>
        </Reveal>

        {/* ── Accordion ───────────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <AccordionItem
              key={faq.id}
              faq={faq}
              index={i}
              isOpen={openId === faq.id}
              onToggle={() => toggle(faq.id)}
            />
          ))}
        </div>

      </div>
    </section>
  )
}
