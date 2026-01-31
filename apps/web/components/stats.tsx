import { Building2, Clock, GraduationCap, Users } from "lucide-react"

const stats = [
  {
    value: "50+",
    label: "Global Partners",
    description: "Industry connections",
    icon: Building2,
  },
  {
    value: "120+",
    label: "Expert Mentors",
    description: "From top companies",
    icon: Users,
  },
  {
    value: "24/7",
    label: "Student Support",
    description: "Always available",
    icon: Clock,
  },
  {
    value: "15k",
    label: "Graduates",
    description: "Career-ready alumni",
    icon: GraduationCap,
  },
]

export function Stats() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="relative text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <stat.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                {stat.value}
              </p>
              <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-foreground">
                {stat.label}
              </p>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
