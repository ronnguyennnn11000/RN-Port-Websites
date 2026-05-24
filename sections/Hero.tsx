'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import { motion, useScroll, useMotionValueEvent, useTransform } from 'framer-motion'
import { MagneticText } from '@/components/ui/morphing-cursor'
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button'

// ── Frame sequence config ────────────────────────────────────────
const TOTAL_FRAMES = 192
// Hero unsticks at this frame; animation keeps going as it scrolls away
const EXIT_FRAME = 129
// px-per-frame — preserved from original 4800px / 191 frames
const PX_PER_FRAME = 4800 / (TOTAL_FRAMES - 1)
// Sticky phase ends here — after this, user scrolls naturally
const SCROLL_EXTRA = Math.round(EXIT_FRAME * PX_PER_FRAME)
// Hold at EXIT_FRAME for this many px before section unsticks
const HOLD_PX = 600

const FRAME_PATHS: string[] = Array.from({ length: TOTAL_FRAMES }, (_, i) => {
  const n = String(i).padStart(3, '0')
  return `/ezgif-split/frame_${n}_delay-0.042s.webp`
})

// ── object-fit: contain helper for canvas ───────────────────────
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  w: number,
  h: number
) {
  const iw = img.naturalWidth
  const ih = img.naturalHeight
  if (!iw || !ih) return
  const scale = Math.min(w / iw, h / ih)
  const dw = iw * scale
  const dh = ih * scale
  const dx = (w - dw) / 2
  const dy = (h - dh) / 2
  ctx.clearRect(0, 0, w, h)
  ctx.drawImage(img, 0, 0, iw, ih, dx, dy, dw, dh)
}

// ── Shared animation variant ─────────────────────────────────────
function fadeUp(delay: number) {
  return {
    hidden: { opacity: 0, y: 32 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1], delay },
    },
  }
}

// ── Arrow icon ───────────────────────────────────────────────────
function ArrowRight({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1 7h12M8 2l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ── Hero ─────────────────────────────────────────────────────────
export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imagesRef = useRef<(HTMLImageElement | null)[]>(
    new Array(TOTAL_FRAMES).fill(null)
  )
  const [loadedCount, setLoadedCount] = useState(0)
  const [allLoaded, setAllLoaded] = useState(false)
  const [firstFrameReady, setFirstFrameReady] = useState(false)
  const currentFrameRef = useRef(0)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })
  const { scrollY } = useScroll()

  // Scroll indicator fades out as soon as scrolling begins
  const scrollIndicatorOpacity = useTransform(scrollYProgress, [0, 0.04], [1, 0])

  // ── Draw a single frame to canvas ───────────────────────────
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current
    const img = imagesRef.current[index]
    if (!canvas || !img || !img.complete || !img.naturalWidth) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    drawCover(ctx, img, canvas.offsetWidth, canvas.offsetHeight)
  }, [])

  // ── Sync canvas pixel dimensions to its CSS size ─────────────
  const syncSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const dpr = window.devicePixelRatio || 1
    const w = canvas.offsetWidth
    const h = canvas.offsetHeight
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr
      canvas.height = h * dpr
      const ctx = canvas.getContext('2d')
      ctx?.scale(dpr, dpr)
    }
    drawFrame(currentFrameRef.current)
  }, [drawFrame])

  // ── Preload all frames, draw first one immediately ───────────
  useEffect(() => {
    let count = 0
    FRAME_PATHS.forEach((src, i) => {
      const img = new Image()
      img.onload = () => {
        count++
        setLoadedCount(count)
        // Draw the very first frame as soon as it's ready and show hero
        if (i === 0) { drawFrame(0); setFirstFrameReady(true) }
        if (count === TOTAL_FRAMES) setAllLoaded(true)
      }
      img.onerror = () => {
        count++
        if (count === TOTAL_FRAMES) setAllLoaded(true)
      }
      img.src = src
      imagesRef.current[i] = img
    })
  }, [drawFrame])

  // ── Keep canvas sized to its container ──────────────────────
  useEffect(() => {
    syncSize()
    const ro = new ResizeObserver(syncSize)
    const canvas = canvasRef.current
    if (canvas) ro.observe(canvas)
    return () => ro.disconnect()
  }, [syncSize])

  // ── Scroll → frame index (global scrollY so it keeps going after unstick) ──
  useMotionValueEvent(scrollY, 'change', (y) => {
    let next: number
    if (y <= SCROLL_EXTRA) {
      next = Math.round(y / PX_PER_FRAME)
    } else if (y <= SCROLL_EXTRA + HOLD_PX) {
      next = EXIT_FRAME
    } else {
      next = EXIT_FRAME + Math.round((y - SCROLL_EXTRA - HOLD_PX) / PX_PER_FRAME)
    }
    next = Math.min(TOTAL_FRAMES - 1, Math.max(0, next))
    if (next !== currentFrameRef.current) {
      currentFrameRef.current = next
      drawFrame(next)
    }
  })

  const loadProgress = (loadedCount / TOTAL_FRAMES) * 100

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{ height: `calc(100vh + ${SCROLL_EXTRA + HOLD_PX}px)` }}
      className="relative"
    >
      {/* ── Sticky viewport with rounded bottom ──────────────── */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden"
        style={{ borderRadius: '0 0 2.5rem 2.5rem' }}
      >
        {/* ── Canvas: scroll-driven frame sequence ─────────── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full z-0"
          style={{ display: 'block' }}
        />

        {/* ── Preload progress overlay ─────────────────────── */}
        <motion.div
          className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-end pb-16 gap-3"
          animate={{ opacity: firstFrameReady ? 0 : 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ pointerEvents: firstFrameReady ? 'none' : 'auto' }}
        >
          <span className="text-[10px] tracking-[0.2em] uppercase text-white/25 font-medium">
            Loading
          </span>
          <div
            className="w-48 overflow-hidden"
            style={{ height: '1px', background: 'rgba(255,255,255,0.08)' }}
          >
            <motion.div
              className="h-full bg-accent origin-left"
              animate={{ scaleX: loadProgress / 100 }}
              style={{ transformOrigin: 'left' }}
              transition={{ duration: 0.12 }}
            />
          </div>
        </motion.div>

        {/* ── Gradient overlays for legibility ─────────────── */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 50%, rgba(0,0,0,0.10) 100%)',
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 55% at 50% 50%, rgba(255,94,25,0.05) 0%, transparent 70%)',
          }}
        />

        {/* ── Hero content ─────────────────────────────────── */}
        <div className="absolute inset-0 z-20">
        <div className="h-full flex flex-col items-center justify-center max-w-6xl mx-auto w-full px-6 md:px-10 text-center">

          {/* Tagline */}
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center gap-3 mb-10"
          >
            <p className="text-white/55 text-sm md:text-[0.9375rem] max-w-[34ch] leading-[1.7] tracking-[0.02em] font-light">
              Turn player insights into GTM strategies
            </p>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </motion.div>

          {/* Heading with morphing cursor */}
          <motion.div variants={fadeUp(0.1)} initial="hidden" animate="show">
            <h1 aria-label="Hi, I am Ron Nguyen">
              <MagneticText
                text={
                  <span className="flex flex-col items-center">
                    <span className="leading-none">Hi, I am</span>
                    <em className="not-italic text-accent relative pb-3" style={{ lineHeight: 1 }}>
                      Ron Nguyen
                      <span
                        aria-hidden
                        className="absolute -bottom-2 left-0 right-0 h-px
                                   bg-gradient-to-r from-transparent via-accent/60 to-transparent"
                      />
                    </em>
                  </span>
                }
                hoverText={
                  <>
                    <span className="leading-none">Product</span>
                    <span className="leading-none">Marketing</span>
                  </>
                }
                textClassName="text-[clamp(3.5rem,10.5vw,9rem)] font-bold tracking-[-0.04em] text-white"
                hoverTextClassName="text-[clamp(3.5rem,10.5vw,9rem)] font-bold tracking-[-0.04em] text-white leading-none flex flex-col items-center"
                circleColor="#FF5E19"
                circleSize={240}
                className="mb-8"
              />
            </h1>
          </motion.div>

          {/* Stats row */}
          <motion.div variants={fadeUp(0.2)} initial="hidden" animate="show">
            <div className="flex items-center gap-0 mb-12">
              {[
                { value: '10+', label: 'Projects' },
                { value: '5+', label: 'Shipped Titles' },
                { value: '300K', label: 'Early Access Players' },
                { value: '4+', label: 'Years at Ubisoft' },
              ].map((stat, i, arr) => (
                <div key={stat.label} className="flex items-center">
                  <div className="flex flex-col items-center px-6 md:px-8 gap-1">
                    <span
                      className="text-[clamp(1.75rem,4vw,2.5rem)] font-bold leading-none tracking-[-0.03em]"
                      style={{ color: '#FF5E19' }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-white/35 whitespace-nowrap">
                      {stat.label}
                    </span>
                  </div>
                  {i < arr.length - 1 && (
                    <div className="w-px h-8 bg-white/[0.1] shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTA button */}
          <InteractiveHoverButton
            text="Get in touch"
            href="#cta"
            style={{ boxShadow: '0 0 50px rgba(255,94,25,0.28)' }}
          />
        </div>
        </div>

        {/* ── Scroll indicator ─────────────────────────────── */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
          style={{ opacity: scrollIndicatorOpacity }}
        >
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-1.5 text-white/25"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
            <svg width="14" height="20" viewBox="0 0 14 20" fill="none" aria-hidden>
              <rect x="1" y="1" width="12" height="18" rx="6" stroke="currentColor" strokeWidth="1.2" />
              <motion.rect
                x="6" y="4" width="2" height="4" rx="1" fill="currentColor"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
