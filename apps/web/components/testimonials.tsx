"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Quote, Star } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Testimonials() {
  const { t } = useLanguage()

  const testimonials = [
    {
      quote: t.testimonials.quote1,
      name: "Jane Doe",
      role: t.testimonials.securityAnalyst,
      company: "PayShield",
      rating: 5,
      avatar: "JD",
      avatarBg: "bg-rose-500",
    },
    {
      quote: t.testimonials.quote2,
      name: "Mark Chen",
      role: t.testimonials.frontendDeveloper,
      company: "Google",
      rating: 5,
      avatar: "MC",
      avatarBg: "bg-blue-600",
    },
    {
      quote: t.testimonials.quote3,
      name: "Sarah Jenkins",
      role: t.testimonials.dataScientist,
      company: "Amazon",
      rating: 5,
      avatar: "SJ",
      avatarBg: "bg-emerald-600",
    },
  ]

  return (
    <section id="testimonials" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.testimonials.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            {t.testimonials.description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="relative border-border bg-card">
              <CardContent className="p-6">
                <Quote className="absolute right-6 top-6 h-8 w-8 text-muted/30" />
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3 border-t border-border pt-6">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-full ${testimonial.avatarBg} text-sm font-semibold text-primary-foreground`}>
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
