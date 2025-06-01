import { Hero } from '@/components/home/Hero'
import { FeaturedPhotographers } from '@/components/home/FeaturedPhotographers'
import { HowItWorks } from '@/components/home/HowItWorks'
import { Categories } from '@/components/home/Categories'
import { Testimonials } from '@/components/home/Testimonials'
import { Stats } from '@/components/home/Stats'
import { CTA } from '@/components/home/CTA'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Hero />
      <Stats />
      <Categories />
      <FeaturedPhotographers />
      <HowItWorks />
      <Testimonials />
      <CTA />
    </div>
  )
}
