"use client"

import Image from "next/image"
import { Code, Briefcase, Users } from "lucide-react"
import { useLanguage } from "@/lib/language-context"

export function Features() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Code,
      title: t.features.sandbox.title,
      description: t.features.sandbox.description,
      color: "bg-rose-100 text-rose-600",
    },
    {
      icon: Users,
      title: t.features.collaborative.title,
      description: t.features.collaborative.description,
      color: "bg-blue-100 text-blue-600",
    },
    {
      icon: Briefcase,
      title: t.features.career.title,
      description: t.features.career.description,
      color: "bg-emerald-100 text-emerald-600",
    },
  ]

  return (
    <section id="features" className="bg-secondary/30 py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t.features.title}{" "}
              <span className="text-primary">{t.features.titleHighlight}</span>
            </h2>
            <div className="mt-10 space-y-8">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${feature.color}`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg sm:translate-y-8">
              <Image
                src="/images/feature-sandbox.jpg"
                alt="Student coding in sandbox environment"
                fill
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/images/feature-collab.jpg"
                alt="Team collaborating on project"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
