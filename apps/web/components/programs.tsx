"use client"

import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock } from "lucide-react"
import { programs } from "@/lib/programs"
import { useLanguage } from "@/lib/language-context"

export function Programs() {
  const { t, locale } = useLanguage()

  const programNames: Record<string, { es: string; en: string }> = {
    "english-immersive": { es: "Ingles Inmersivo", en: "English Immersive" },
    "software-engineering": { es: "Ingenieria de Software", en: "Software Engineering" },
    "artificial-intelligence-data-science": { es: "Inteligencia Artificial y Ciencia de Datos", en: "Artificial Intelligence & Data Science" },
  }

  const programDescriptions: Record<string, { es: string; en: string }> = {
    "english-immersive": {
      es: "Desarrolla habilidades de comunicacion en ingles del mundo real a traves de practica inmersiva, instruccion guiada e interaccion constante.",
      en: "Develop real-world English communication skills through immersive practice, guided instruction, and constant interaction.",
    },
    "software-engineering": {
      es: "Aprende a disenar y construir software escalable utilizando patrones de arquitectura del mundo real, tecnologias modernas y mejores practicas de la industria.",
      en: "Learn to design and build scalable software using real-world architecture patterns, modern technologies, and industry best practices.",
    },
    "artificial-intelligence-data-science": {
      es: "Aprende a construir redes neuronales y gestionar ecosistemas de Big Data desde cero con proyectos practicos.",
      en: "Learn to build neural networks and manage Big Data ecosystems from scratch with hands-on projects.",
    },
  }

  return (
    <section id="programs" className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {t.programs.title}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            {t.programs.description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => (
            <Link key={program.slug} href={`/programs/${program.slug}`} className="block">
              <Card className="group h-full overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-xl">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={programNames[program.slug]?.[locale] || program.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 flex items-center gap-3">
                    <Badge className={`${program.tagColor} border-0 text-primary-foreground`}>
                      {program.tag}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-card">
                      <Clock className="h-3.5 w-3.5" />
                      {program.duration}
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-foreground">
                    {programNames[program.slug]?.[locale] || program.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {programDescriptions[program.slug]?.[locale] || program.description}
                  </p>
                </CardContent>
                <CardFooter className="border-t border-border px-6 py-4">
                  <span className="group/btn flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80">
                    {t.programs.viewDetails}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
