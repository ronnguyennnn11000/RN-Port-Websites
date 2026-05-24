import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume — Ron Nguyen",
  description:
    "Product Marketing Specialist with 4+ years at Ubisoft driving GTM strategy, player acquisition, and retention.",
};

// ── Data ──────────────────────────────────────────────────────────

const experience = [
  {
    company: "Ubisoft Da Nang",
    role: "Product Marketing Specialist",
    period: "Mar 2022 – Present",
    bullets: [
      <>Engineered end-to-end GTM strategies for <strong className="text-white/90 font-medium">5+ title launches</strong>, developing messaging frameworks and player persona models that reduced CAC and drove a <strong className="text-white/90 font-medium">15% increase in Day-1 player acquisition</strong>.</>,
      <>Designed and owned <strong className="text-white/90 font-medium">A/B testing programs</strong> across onboarding flows and in-game marketing touchpoints, improving conversion rate and feature adoption by <strong className="text-white/90 font-medium">10%</strong> and reducing early churn through data-driven iteration.</>,
      <>Conducted mixed-method <strong className="text-white/90 font-medium">user research</strong> (playtesting, surveys, cohort analysis) to build segmentation strategies and onboarding optimization plans, improving D30 retention.</>,
      <>Partnered with Product, Engineering, and Design in <strong className="text-white/90 font-medium">Agile sprints</strong> to align alpha-phase feature roadmaps with player LTV data and market sizing insights, ensuring highest-impact features shipped on schedule.</>,
      <>Led <strong className="text-white/90 font-medium">win/loss analysis and competitive intelligence tracking</strong> across multiple genres (Metroidvania, RPG, Auto battler), producing battlecards and positioning briefs that sharpened differentiation.</>,
      <>Developed sales enablement and influencer/community marketing assets — store page copy, pitch decks, trailer briefs — contributing to <strong className="text-white/90 font-medium">&gt;10% increase in organic discoverability</strong> and pre-launch registration growth.</>,
      <>Negotiated strategic partnerships and vendor contracts, <strong className="text-white/90 font-medium">compressing GTM timelines by 10%</strong> while maintaining compliance with global brand standards.</>,
    ],
  },
  {
    company: "Self-Employed",
    role: "Multi-functional Designer",
    period: "Oct 2020 – Jan 2022",
    bullets: [
      <>Delivered full <strong className="text-white/90 font-medium">brand identity systems</strong> and CRO-optimized landing pages for <strong className="text-white/90 font-medium">10+ clients</strong> in gaming and entertainment, reducing CAC and improving click-to-signup conversion rates by <strong className="text-white/90 font-medium">25–40%</strong>.</>,
      <>Developed content strategy frameworks and social campaign creative that drove <strong className="text-white/90 font-medium">30% average audience engagement growth</strong>; introduced NPS/CSAT feedback loops to continuously refine retention messaging.</>,
      <>Advised clients on user onboarding optimization and feature adoption pathways, reducing time-to-value and improving <strong className="text-white/90 font-medium">90-day retention benchmarks</strong> across client products.</>,
      <>Streamlined creative briefing and revision workflows, reducing average <strong className="text-white/90 font-medium">project delivery time by 15%</strong>.</>,
    ],
  },
  {
    company: "Liberzy Agency",
    role: "Marketing Intern",
    period: "Nov 2020 – May 2021",
    bullets: [
      <>Contributed to multi-channel social and email campaigns that increased <strong className="text-white/90 font-medium">qualified lead volume by 10% QoQ</strong>, tracked against revenue growth KPIs via weekly performance dashboards.</>,
      <>Designed A/B-tested landing page creatives within an Agile sprint cadence, iterating on messaging and visual hierarchy to improve campaign-to-signup conversion rates.</>,
      <>Analyzed campaign performance data across <strong className="text-white/90 font-medium">3+ client accounts</strong> to generate actionable CRO insights, supporting iterative strategy optimization.</>,
    ],
  },
];

const skills = [
  {
    label: "Product Marketing",
    items: [
      "GTM Strategy",
      "Positioning & Messaging Frameworks",
      "Product Lifecycle Management",
      "Sales Enablement",
      "Win/Loss Analysis",
      "Market Sizing (TAM/SAM)",
      "Competitive Intelligence",
      "Player/User Persona Dev.",
    ],
  },
  {
    label: "Growth & Analytics",
    items: [
      "A/B Testing",
      "CRO",
      "Funnel Analysis",
      "CAC/LTV Optimization",
      "Feature Adoption",
      "Onboarding Optimization",
      "NPS/CSAT",
      "Cohort Analysis",
      "Google Analytics",
      "OKR/KPI Ownership",
    ],
  },
  {
    label: "Gaming Domain",
    items: [
      "Player Behavior Analysis",
      "Playtesting",
      "Monetization Strategy (ARPU/IAP)",
      "D1/D7/D30 Retention",
      "Community & Influencer Marketing",
      "Product-Led Growth",
    ],
  },
  {
    label: "Tools & Design",
    items: [
      "Adobe Creative Suite",
      "Figma",
      "Agile/Scrum",
      "Google Analytics",
      "Notion",
      "Jira",
      "Claude Code",
      "ComfyUI",
    ],
  },
];

const certifications = [
  {
    name: "PMM School Certification",
    issuer: "PMM School",
    year: "2025",
    detail: "Positioning, Messaging Architecture, GTM, Competitive Analysis",
  },
  {
    name: "Google Analytics Individual Qualification",
    issuer: "Google",
    year: "2022",
    detail: null,
  },
  {
    name: "HubSpot Inbound Marketing Certification",
    issuer: "HubSpot",
    year: "2022",
    detail: null,
  },
];

// ── Component ─────────────────────────────────────────────────────

export default function ResumePage() {
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 pb-32">
      <div className="max-w-3xl mx-auto px-6 md:px-10">

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-white/40 hover:text-white/80 text-sm mb-12 transition-colors duration-200"
          style={{ letterSpacing: "-0.01em" }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M13 8H3M7 12l-4-4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Back
        </Link>

        {/* ── Header ──────────────────────────────────────────── */}
        <div className="mb-14 pb-14 border-b border-white/[0.08]">
          <p className="text-white/35 text-xs font-mono tracking-[0.18em] uppercase mb-5">
            Resume
          </p>

          <h1
            className="text-[clamp(2.5rem,6vw,4rem)] font-bold text-white leading-none mb-3"
            style={{ letterSpacing: "-0.04em" }}
          >
            Ron{" "}
            <span style={{ color: "#FF5E19" }}>Nguyen</span>
          </h1>

          <p
            className="text-white/50 text-base font-mono tracking-[0.06em] uppercase mb-7"
            style={{ letterSpacing: "0.08em" }}
          >
            Product Marketing Specialist · Gaming &amp; SaaS Growth
          </p>

          {/* Summary */}
          <p className="text-white/55 text-[0.9375rem] leading-[1.8] mb-8 max-w-[62ch]">
            Product Marketing Specialist with 4+ years at Ubisoft driving GTM strategy, player acquisition, and retention for gaming titles across multiple platforms. Expert in building positioning &amp; messaging frameworks, executing A/B testing programs, and translating user research into product-led growth strategies that improve activation, feature adoption, and LTV. Proven cross-functional leader with experience aligning Product, Engineering, and Design teams around shared OKRs and launch KPIs.
          </p>

          {/* Contact row */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/40">
            <a
              href="tel:+84948017555"
              className="hover:text-white/80 transition-colors duration-200"
            >
              +84 948 017 555
            </a>
            <span aria-hidden className="text-white/20">·</span>
            <a
              href="mailto:ronnguyen1100@gmail.com"
              className="hover:text-white/80 transition-colors duration-200"
            >
              ronnguyen1100@gmail.com
            </a>
            <span aria-hidden className="text-white/20">·</span>
            <a
              href="https://linkedin.com/in/ronnguyen"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors duration-200 inline-flex items-center gap-1.5"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </a>
            <span aria-hidden className="text-white/20">·</span>
            <a
              href="https://ronnguyen.me"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80 transition-colors duration-200"
            >
              ronnguyen.me
            </a>
          </div>
        </div>

        {/* ── Key Metrics ─────────────────────────────────────── */}
        <div className="grid grid-cols-3 gap-3 mb-14">
          {[
            { stat: "4+", label: "Years at Ubisoft" },
            { stat: "5+", label: "Game title launches" },
            { stat: "10+", label: "Clients served" },
          ].map(({ stat, label }) => (
            <div
              key={label}
              className="rounded-xl px-5 py-4 border border-white/[0.07]"
              style={{
                background: "rgba(255,255,255,0.025)",
                boxShadow: "0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <p
                className="text-2xl font-bold text-white mb-0.5"
                style={{ letterSpacing: "-0.04em", color: "#FF5E19" }}
              >
                {stat}
              </p>
              <p className="text-white/40 text-xs leading-snug">{label}</p>
            </div>
          ))}
        </div>

        {/* ── Experience ──────────────────────────────────────── */}
        <section className="mb-14">
          <SectionLabel>Professional Experience</SectionLabel>

          <div className="flex flex-col gap-12">
            {experience.map(({ company, role, period, bullets }) => (
              <div key={company}>
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                  <div>
                    <p
                      className="text-white font-semibold text-base"
                      style={{ letterSpacing: "-0.02em" }}
                    >
                      {role}
                    </p>
                    <p className="text-white/40 text-sm mt-0.5">{company}</p>
                  </div>
                  <p
                    className="text-white/30 text-xs font-mono tracking-wide shrink-0 pt-0.5"
                    style={{ letterSpacing: "0.04em" }}
                  >
                    {period}
                  </p>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 items-start text-white/55 text-sm leading-[1.75]">
                      <span
                        className="shrink-0 mt-[0.35em] w-1 h-1 rounded-full"
                        style={{ background: "#FF5E19", minWidth: "4px" }}
                        aria-hidden
                      />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education ───────────────────────────────────────── */}
        <section className="mb-14">
          <SectionLabel>Education</SectionLabel>

          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
            <div>
              <p
                className="text-white font-semibold text-base"
                style={{ letterSpacing: "-0.02em" }}
              >
                Da Nang University of Economics
              </p>
              <p className="text-white/40 text-sm mt-0.5">
                Bachelor of Marketing Communication
              </p>
              <p className="text-white/35 text-xs mt-2 leading-[1.6]">
                <span className="text-white/50 font-medium">Relevant coursework: </span>
                Consumer Behavior, Digital Marketing Strategy, Brand Management, Market Research
              </p>
            </div>
            <p
              className="text-white/30 text-xs font-mono tracking-wide shrink-0"
              style={{ letterSpacing: "0.04em" }}
            >
              Aug 2018 – Jun 2022
            </p>
          </div>
        </section>

        {/* ── Skills ──────────────────────────────────────────── */}
        <section className="mb-14">
          <SectionLabel>Skills</SectionLabel>

          <div className="flex flex-col gap-7">
            {skills.map(({ label, items }) => (
              <div key={label}>
                <p
                  className="text-white/70 text-xs font-semibold mb-3"
                  style={{ letterSpacing: "0.06em" }}
                >
                  {label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item}
                      className="text-xs text-white/55 px-3 py-1 rounded-full border border-white/[0.09]"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        letterSpacing: "0.01em",
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Certifications ──────────────────────────────────── */}
        <section className="mb-14">
          <SectionLabel>Certifications</SectionLabel>

          <div className="flex flex-col gap-5">
            {certifications.map(({ name, issuer, year, detail }) => (
              <div key={name} className="flex items-start gap-4">
                <span
                  className="shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                  style={{ background: "#FF5E19" }}
                  aria-hidden
                />
                <div>
                  <p className="text-white/80 text-sm font-medium" style={{ letterSpacing: "-0.01em" }}>
                    {name}
                    <span className="text-white/30 font-normal ml-2">— {year}</span>
                  </p>
                  <p className="text-white/35 text-xs mt-0.5">
                    {issuer}{detail ? ` · ${detail}` : ""}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Download CTA ────────────────────────────────────── */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            Da Nang, Vietnam · Available for remote &amp; hybrid roles
          </p>
          <a
            href="/RESUME_HIEU_NGUYEN_MINH_PRDMKTG.pdf"
            download
            className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full text-sm font-medium text-white border border-white/[0.12] hover:border-white/[0.25] hover:bg-white/[0.04] transition-colors duration-200"
            style={{ letterSpacing: "-0.01em" }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v9M4 8l4 4 4-4M2 13h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            Download PDF
          </a>
        </div>

      </div>
    </main>
  );
}

// ── Section label helper ──────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-xs font-mono tracking-[0.18em] uppercase text-white/35 mb-7">
      {children}
    </h2>
  );
}
