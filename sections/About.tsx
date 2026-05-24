'use client'

import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { TextGradientScroll } from '@/components/ui/text-gradient-scroll'
import { MagneticText } from '@/components/ui/morphing-cursor'

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

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })
  // Scroll distance = 350vh - 100vh = 250vh. Animation completes at 150vh (first 60%),
  // leaving 100vh (40%) as dwell where text is fully revealed but section stays stuck.
  const animProgress = useTransform(scrollYProgress, [0, 0.6], [0, 1], { clamp: true })

  return (
    <div id="about" ref={containerRef} style={{ height: '350vh' }}>
    <section className="relative sticky top-0 h-screen bg-black overflow-hidden">
      {/* ── Two-column layout ── */}
      <div className="flex items-stretch h-full">

        {/* Left — text content */}
        <Reveal className="flex flex-col justify-center px-6 md:px-12 pt-16 pb-16 w-full md:w-3/5 z-10 h-full">
          <span
            className="text-[10px] font-semibold tracking-[0.2em] uppercase mb-4"
            style={{ color: '#FF5E19' }}
          >
            Who I am
          </span>
          <h2
            className="text-[clamp(2rem,4.5vw,3.5rem)] font-bold text-white leading-none"
            style={{ letterSpacing: '-0.03em' }}
          >
            About me
          </h2>
          <MagneticText
            text={
              <>
                <span className="block text-white">Strategy First,</span>
                <span className="block" style={{ color: '#FF5E19' }}>Data Driven</span>
              </>
            }
            hoverText={<><span className="block">Charm</span><span className="block">Preserved</span></>}
            textClassName="text-[clamp(4.4rem,8.8vw,6.4rem)] font-semibold leading-tight tracking-[-0.03em]"
            hoverTextClassName="text-[clamp(4.4rem,8.8vw,6.4rem)] font-semibold leading-tight tracking-[-0.03em] text-white"
            hoverAlign="start"
            circleColor="#FF5E19"
            circleSize={240}
            className="mt-4 flex-col items-start"
          />
          <div
            className="mt-6"
            style={{ fontSize: 'clamp(1rem,1.5vw,1.25rem)', letterSpacing: '0.01em', maxWidth: '42ch' }}
          >
            <TextGradientScroll
              text="Product Marketing Specialist at Ubisoft Da Nang with 4+ years shipping titles and moving metrics across the full PMM stack — from competitive intelligence and GTM strategy to A/B testing and post-launch retention. Creative range, analytical rigor, and currently expanding into SaaS growth and PLG."
              type="letter"
              textOpacity="soft"
              className="text-white leading-relaxed"
              scrollYProgress={animProgress}
            />
          </div>
        </Reveal>

        {/* Background — portrait, anchored right */}
        <div className="hidden md:block absolute top-0 bottom-0 w-3/5" style={{ right: '-5%' }}>
          <Image
            src="/images/about-portrait.png"
            alt="Portrait"
            fill
            className="object-cover object-center-top grayscale opacity-70"
            priority
          />
          {/* Seamless left fade */}
          <div
            className="absolute inset-y-0 left-0 w-2/5 pointer-events-none"
            style={{ background: 'linear-gradient(to right, #000, transparent)' }}
          />
          {/* Bottom fade */}
          <div
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none"
            style={{ background: 'linear-gradient(to top, #000, transparent)' }}
          />
        </div>
      </div>

      {/* Thin rule */}
      <div
        className="absolute bottom-0 left-6 right-6 md:left-12 md:right-12"
        style={{ height: '1px', background: 'rgba(255,255,255,0.06)' }}
      />
    </section>
    </div>
  )
}
