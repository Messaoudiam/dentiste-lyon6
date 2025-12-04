import Hero from '@/components/sections/Hero'
import TrustBanner from '@/components/sections/TrustBanner'
import Services from '@/components/sections/Services'
import About from '@/components/sections/About'
import WhyChooseUs from '@/components/sections/WhyChooseUs'
import Technologies from '@/components/sections/Technologies'
import Testimonials from '@/components/sections/Testimonials'
import FAQ from '@/components/sections/FAQ'
import Contact from '@/components/sections/Contact'

// Section divider component
function SectionDivider({ variant = 'default' }: { variant?: 'default' | 'accent' }) {
  return (
    <div
      className={`w-full h-px bg-gradient-to-r ${
        variant === 'accent'
          ? 'from-transparent via-accent/30 to-transparent'
          : 'from-transparent via-gray-light to-transparent'
      }`}
      aria-hidden="true"
    />
  )
}

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBanner />
      <Services />
      <SectionDivider variant="accent" />
      <About />
      <SectionDivider />
      <WhyChooseUs />
      {/* Technologies has its own visual transition */}
      <Technologies />
      <SectionDivider variant="accent" />
      <Testimonials />
      <SectionDivider />
      <FAQ />
      <SectionDivider variant="accent" />
      <Contact />
    </main>
  )
}
