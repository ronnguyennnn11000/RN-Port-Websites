import Hero from '@/sections/Hero'
import About from '@/sections/About'
import Services from '@/sections/Services'
import ProjectMarquee from '@/sections/ProjectMarquee'
import HowItWorks from '@/sections/HowItWorks'
import TimelineSection from '@/sections/TimelineSection'
import CTA from '@/sections/CTA'
import Footer from '@/sections/Footer'
import PageTransition from '@/components/PageTransition'

export default function Home() {
  return (
    <PageTransition>
      <main>
        <Hero />
        <About />
        <Services />
        <ProjectMarquee />
        <HowItWorks />
        <TimelineSection />
        <CTA />
        <Footer />
      </main>
    </PageTransition>
  )
}
