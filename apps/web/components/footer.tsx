"use client"

import Link from "next/link"
import { GraduationCap, Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/lib/language-context"

const socialLinks = [
  { name: "Twitter", icon: "X" },
  { name: "LinkedIn", icon: "in" },
  { name: "Instagram", icon: "IG" },
  { name: "GitHub", icon: "GH" },
]

export function Footer() {
  const { t } = useLanguage()

  const footerLinks = {
    programs: [
      { name: t.footer.softwareEngineering, href: "/programs/software-engineering" },
      { name: t.footer.dataScience, href: "/programs/artificial-intelligence-data-science" },
      { name: t.footer.cloudComputing, href: "#" },
      { name: t.footer.productManagement, href: "#" },
    ],
    resources: [
      { name: t.footer.scholarships, href: "#" },
      { name: t.footer.studentBlog, href: "#" },
      { name: t.footer.virtualCampus, href: "#" },
      { name: t.footer.helpCenter, href: "#" },
    ],
  }

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <GraduationCap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-semibold tracking-tight text-foreground">
                Caribia
              </span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {t.footer.tagline}
            </p>
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <Button
                  key={social.name}
                  variant="outline"
                  size="icon"
                  className="h-9 w-9 border-border bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <span className="text-xs font-medium">{social.icon}</span>
                  <span className="sr-only">{social.name}</span>
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {t.footer.programs}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {t.footer.resources}
            </h3>
            <ul className="mt-4 space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-foreground">
              {t.footer.contact}
            </h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 text-primary" />
                admissions@caribia.edu.do
              </li>
              <li className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 text-primary" />
                +1 (809) 500-0123
              </li>
              {/* <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                Santo Domingo, Dominican Republic
              </li> */}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            {t.footer.copyright}
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              {t.footer.privacyPolicy}
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              {t.footer.termsOfService}
            </Link>
            <Link href="#" className="text-xs text-muted-foreground hover:text-foreground">
              {t.footer.cookiePolicy}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
