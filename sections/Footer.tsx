'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// ── Social icons ───────────────────────────────────────────────────

function IconLinkedIn() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

// ── Social link button ────────────────────────────────────────────

function SocialLink({
  href,
  label,
  children,
}: {
  href: string
  label: string
  children: React.ReactNode
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative inline-flex items-center justify-center w-9 h-9 rounded-full
                 border border-white/[0.08] bg-white/[0.03]
                 text-white/40
                 transition-[color,border-color,background-color,box-shadow]
                 duration-200 ease-out
                 hover:text-white hover:border-white/[0.18] hover:bg-white/[0.07]
                 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5E19]
                 active:scale-95"
    >
      {children}
    </a>
  )
}

// ── Nav link ──────────────────────────────────────────────────────

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      className="group relative inline-block text-[0.8125rem] font-medium
                 text-white/40 leading-none
                 transition-colors duration-200 hover:text-white
                 focus-visible:outline-none focus-visible:text-white"
    >
      {children}
      {/* Underline on hover */}
      <span
        className="absolute -bottom-px left-0 right-0 h-px origin-left scale-x-0
                   bg-[#FF5E19] transition-transform duration-300 ease-out
                   group-hover:scale-x-100"
        aria-hidden
      />
    </a>
  )
}

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
  const inView = useInView(ref, { once: true, margin: '-5% 0px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ── Outlined marquee text ─────────────────────────────────────────

const MARQUEE_ITEMS = Array.from({ length: 8 }, (_, i) => i)

function MarqueeTrack() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '0px' })

  return (
    <div
      ref={ref}
      className="relative overflow-hidden"
      style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}
      aria-hidden
    >
      {/* Edge fades */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24"
        style={{ background: 'linear-gradient(to right, #000000 0%, transparent 100%)' }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24"
        style={{ background: 'linear-gradient(to left, #000000 0%, transparent 100%)' }}
      />

      {/* Scrolling track */}
      <div
        className="flex items-center will-change-transform select-none"
        style={{ animation: inView ? 'marquee 22s linear infinite' : 'none' }}
      >
        {MARQUEE_ITEMS.map((i) => (
          <span
            key={i}
            className="flex-shrink-0 inline-block font-bold leading-none whitespace-nowrap
                       pr-[0.35em]"
            style={{
              fontSize: 'clamp(5rem, 14vw, 11rem)',
              letterSpacing: '-0.04em',
              color: 'transparent',
              WebkitTextStroke: '1px rgba(255,255,255,0.1)',
              paddingTop: '0.1em',
              paddingBottom: '0.08em',
            }}
          >
            Ron Nguyen&nbsp;
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* ── Main grid ──────────────────────────────────────────── */}
      <div className="px-8 md:px-12 lg:px-16 pt-20 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

          {/* Col 1 — Brand / Contact info ─────────────────────── */}
          <Reveal delay={0}>
            <div className="flex flex-col gap-6">
              {/* Logo wordmark */}
              <div>
                <span
                  className="text-[1.375rem] font-bold text-white leading-none tracking-tight"
                  style={{ letterSpacing: '-0.03em' }}
                >
                  Ron Nguyen
                </span>
                <span
                  className="block mt-1 text-[0.7rem] tracking-[0.12em] uppercase font-medium"
                  style={{ color: '#FF5E19' }}
                >
                  Product Marketing Specialist
                </span>
              </div>

            </div>
          </Reveal>

          {/* Col 2 — Navigation ──────────────────────────────── */}
          <Reveal delay={0.07}>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.12em] uppercase font-semibold text-white/25">
                Menu
              </span>
              <nav aria-label="Footer navigation">
                <ul className="flex flex-col gap-4">
                  {[
                    { label: 'About',        href: '#about'    },
                    { label: 'Notable Work', href: '#notable-work' },
                    { label: 'Resume',       href: '#timeline' },
                    { label: 'Contact',      href: '#cta'      },
                  ].map(({ label, href }) => (
                    <li key={label}>
                      <NavLink href={href}>{label}</NavLink>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </Reveal>

          {/* Col 3 — Contact emails ──────────────────────────── */}
          <Reveal delay={0.14}>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.12em] uppercase font-semibold text-white/25">
                Contact
              </span>
              <div className="flex flex-col gap-4">
                {['Ronnguyen1100@gmail.com'].map((email) => (
                  <a
                    key={email}
                    href={`mailto:${email}`}
                    className="group relative inline-block w-fit text-[0.8125rem] font-medium
                               text-white/40 leading-none
                               transition-colors duration-200 hover:text-white
                               focus-visible:outline-none focus-visible:text-white"
                  >
                    {email}
                    <span
                      className="absolute -bottom-px left-0 right-0 h-px origin-left scale-x-0
                                 bg-[#FF5E19] transition-transform duration-300 ease-out
                                 group-hover:scale-x-100"
                      aria-hidden
                    />
                  </a>
                ))}
                <a
                  href="tel:+84948017555"
                  className="text-[0.8125rem] text-white/40 hover:text-white
                             transition-colors duration-200 leading-none font-medium"
                >
                  +84 948 017-555
                </a>
              </div>
            </div>
          </Reveal>

          {/* Col 4 — Social ──────────────────────────────────── */}
          <Reveal delay={0.21}>
            <div className="flex flex-col gap-6">
              <span className="text-[10px] tracking-[0.12em] uppercase font-semibold text-white/25">
                Follow
              </span>
              <div className="flex items-center gap-2">
                <SocialLink href="https://linkedin.com" label="LinkedIn">
                  <IconLinkedIn />
                </SocialLink>
              </div>
            </div>
          </Reveal>

        </div>
      </div>

      {/* ── Divider ────────────────────────────────────────────── */}
      <div
        className="mx-8 md:mx-12 lg:mx-16"
        style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
        aria-hidden
      />

      {/* ── Bottom bar ─────────────────────────────────────────── */}
      <div className="px-8 md:px-12 lg:px-16 py-6" />

      {/* ── Outlined marquee ───────────────────────────────────── */}
      <MarqueeTrack />
    </footer>
  )
}
