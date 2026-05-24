"use client";
import Image from "next/image";
import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Timeline } from "@/components/ui/timeline"
import { InteractiveHoverButton } from "@/components/ui/interactive-hover-button";

// ── Reveal wrapper ────────────────────────────────────────────────

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8% 0px" });

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
  );
}

// ── Image grid helper ─────────────────────────────────────────────

function ImageGrid({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {images.map((img, i) => (
        <div
          key={i}
          className="relative overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03]"
          style={{
            boxShadow:
              "0 0 0 1px rgba(255,255,255,0.04), 0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <Image
            src={img.src}
            alt={img.alt}
            width={500}
            height={500}
            className="w-full h-20 md:h-44 lg:h-60 object-cover opacity-80 hover:opacity-100 transition-opacity duration-300"
          />
          {/* color overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </div>
      ))}
    </div>
  );
}

// ── Timeline data ─────────────────────────────────────────────────

const timelineData = [
  {
    title: "MAR 2022 – PRESENT",
    content: (
      <div>
        <p
          className="text-white font-semibold text-base md:text-lg mb-1"
          style={{ letterSpacing: "-0.02em" }}
        >
          Product Marketing Specialist
        </p>
        <p className="text-white/40 text-xs md:text-sm mb-6">
          Ubisoft Da Nang · Da Nang, Vietnam
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Engineered end-to-end <strong className="text-white/90 font-medium">GTM strategies for 5+ title launches</strong>, building messaging frameworks aligned to player personas — driving above-target Day-1 acquisition across mobile and PC platforms.
            </span>
          </div>
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Designed and owned <strong className="text-white/90 font-medium">A/B testing programs</strong> across onboarding flows and in-game touchpoints, improving activation rates and measurably reducing early churn through iterative data analysis.
            </span>
          </div>
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Conducted mixed-method <strong className="text-white/90 font-medium">user research</strong> (surveys, playtesting, cohort analysis) to build player segmentation models that informed positioning, feature prioritization, and retention campaigns.
            </span>
          </div>
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Led <strong className="text-white/90 font-medium">competitive intelligence tracking</strong> across key gaming genres, producing positioning battlecards and win/loss frameworks used by Product and Marketing teams.
            </span>
          </div>
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Collaborated cross-functionally with Product, Engineering, and Design in <strong className="text-white/90 font-medium">Agile sprints</strong>, aligning alpha-phase feature roadmaps to high-LTV player segment data.
            </span>
          </div>
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Negotiated strategic <strong className="text-white/90 font-medium">partner agreements</strong>, compressing GTM timelines by <strong className="text-white/90 font-medium">10%</strong> while maintaining full Ubisoft global brand compliance.
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "OCT 2020 – JAN 2022",
    content: (
      <div>
        <p
          className="text-white font-semibold text-base md:text-lg mb-1"
          style={{ letterSpacing: "-0.02em" }}
        >
          Freelance Brand &amp; Marketing Consultant
        </p>
        <p className="text-white/40 text-xs md:text-sm mb-6">
          Self-Employed · Remote
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Delivered <strong className="text-white/90 font-medium">brand identity systems</strong> and <strong className="text-white/90 font-medium">CRO-optimized landing pages</strong> for 10+ clients in gaming and entertainment, improving campaign conversion rates by <strong className="text-white/90 font-medium">25–40%</strong>.
            </span>
          </div>
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Developed <strong className="text-white/90 font-medium">content strategy frameworks</strong> and social campaign creative that drove a <strong className="text-white/90 font-medium">30% average increase in audience engagement</strong> within 90 days of launch.
            </span>
          </div>
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Advised clients on <strong className="text-white/90 font-medium">user onboarding optimization</strong> and feature adoption pathways, reducing time-to-value and improving 90-day retention benchmarks.
            </span>
          </div>
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Reduced average project delivery time by <strong className="text-white/90 font-medium">15%</strong> through structured creative briefing and revision workflow design.
            </span>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "NOV 2020 – MAY 2021",
    content: (
      <div>
        <p
          className="text-white font-semibold text-base md:text-lg mb-1"
          style={{ letterSpacing: "-0.02em" }}
        >
          Marketing Intern
        </p>
        <p className="text-white/40 text-xs md:text-sm mb-6">
          Liberzy Agency · Da Nang, Vietnam
        </p>
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Contributed to <strong className="text-white/90 font-medium">multi-channel campaigns</strong> (social, email, paid) that increased qualified lead volume by <strong className="text-white/90 font-medium">10% QoQ</strong>, tracked against revenue KPIs.
            </span>
          </div>
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Designed <strong className="text-white/90 font-medium">A/B-tested landing page creatives</strong> within an Agile sprint cadence, iterating on messaging and visual hierarchy to improve conversion rates across 3+ client accounts.
            </span>
          </div>
          <div className="flex gap-2 items-start text-white/60 text-xs md:text-sm">
            <span className="mt-0.5 text-accent flex-shrink-0">✦</span>
            <span>
              Analyzed campaign performance data to generate actionable <strong className="text-white/90 font-medium">CRO insights</strong>, directly supporting iterative strategy optimization.
            </span>
          </div>
        </div>
      </div>
    ),
  },
];

// ── Section ───────────────────────────────────────────────────────

export default function TimelineSection() {
  return (
    <section
      id="timeline"
      className="relative overflow-hidden"
    >
      {/* Ambient glow */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse, rgba(255,94,25,0.04) 0%, transparent 65%)",
            filter: "blur(80px)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 pt-12 md:pt-16">
        {/* ── Section header ────────────────────────────── */}
        <Reveal delay={0} className="mb-6 md:mb-8">
          <div className="flex flex-col items-center text-center gap-4">
            <p className="text-white/35 text-sm font-mono tracking-[0.18em] uppercase">
              Career Journey
            </p>
            <h2
              className="text-[clamp(2rem,5vw,3.75rem)] font-bold text-white leading-none"
              style={{ letterSpacing: "-0.035em" }}
            >
              My{" "}
              <span style={{ color: "#FF5E19" }}>Timeline</span>
            </h2>
            <p className="text-white/45 text-[1.125rem] md:text-xl leading-[1.7] max-w-[40ch]">
              3+ years building GTM infrastructure and player growth systems at scale.
            </p>
          </div>
        </Reveal>
      </div>

      {/* ── Timeline ──────────────────────────────────────────── */}
      <Timeline data={timelineData} />

      {/* ── Resume CTA ────────────────────────────────────────── */}
      <div className="flex justify-center pb-16 md:pb-24">
        <InteractiveHoverButton
          text="View my resume"
          href="/resume"
        />
      </div>
    </section>
  );
}
