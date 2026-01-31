import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Stats } from "@/components/stats"
import { Programs } from "@/components/programs"
import { Features } from "@/components/features"
import { Testimonials } from "@/components/testimonials"
import { CTAForm } from "@/components/cta-form"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        {/* <Stats /> */}
        <Programs />
        <Features />
        <Testimonials />
        <CTAForm />
      </main>
      <Footer />
    </div>
  )
}
