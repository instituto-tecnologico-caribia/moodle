"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { GraduationCap, Menu, X, Globe, ChevronDown } from "lucide-react"
import { useState } from "react"
import { useLanguage } from "@/lib/language-context"
import type { Locale } from "@/lib/translations"

const languages = [
	{ code: "es" as Locale, name: "Español", flag: "ES" },
	{ code: "en" as Locale, name: "English", flag: "EN" },
]

export function Header() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
	const { locale, setLocale, t } = useLanguage()

	const currentLanguage = languages.find((l) => l.code === locale) || languages[0]

	return (
		<header className="sticky top-0 z-50 w-full border-b border-border/40 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
			<div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
				<div className="flex items-center gap-2">
					<Link href="/" className="flex items-center gap-2">
						<div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
							<GraduationCap className="h-5 w-5 text-primary-foreground" />
						</div>
						<span className="text-lg font-semibold tracking-tight text-foreground">
							Caribia
						</span>
					</Link>
				</div>

				<nav className="hidden items-center gap-8 md:flex">
					<Link href="/programs" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
						{t.header.programs}
					</Link>
					<Link href="/how-it-works" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
						{t.header.howItWorks}
					</Link>
					<Link href="/#testimonials" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
						{t.header.successStories}
					</Link>
					<Link href="/admissions" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
						{t.header.admissions}
					</Link>
				</nav>

				<div className="hidden items-center gap-3 md:flex">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground">
								<Globe className="h-4 w-4" />
								<span>{currentLanguage.flag}</span>
								<ChevronDown className="h-3 w-3" />
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							{languages.map((lang) => (
								<DropdownMenuItem
									key={lang.code}
									onClick={() => setLocale(lang.code)}
									className={locale === lang.code ? "bg-muted" : ""}
								>
									<span className="mr-2 font-medium">{lang.flag}</span>
									{lang.name}
								</DropdownMenuItem>
							))}
						</DropdownMenuContent>
					</DropdownMenu>
					<Button variant="ghost" size="sm" className="text-muted-foreground">
						{t.header.studentLogin}
					</Button>
					<Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
						{t.header.applyNow}
					</Button>
				</div>

				<button
					type="button"
					className="md:hidden"
					onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
				>
					{mobileMenuOpen ? (
						<X className="h-6 w-6 text-foreground" />
					) : (
						<Menu className="h-6 w-6 text-foreground" />
					)}
				</button>
			</div>

			{mobileMenuOpen && (
				<div className="border-t border-border bg-card md:hidden">
					<nav className="flex flex-col gap-1 px-4 py-4">
						<Link href="/programs" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
							{t.header.programs}
						</Link>
						<Link href="/how-it-works" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
							{t.header.howItWorks}
						</Link>
						<Link href="/#testimonials" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
							{t.header.successStories}
						</Link>
						<Link href="/admissions" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground">
							{t.header.admissions}
						</Link>

						{/* Language Selector Mobile */}
						<div className="mt-3 border-t border-border pt-3">
							<p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
								{locale === "es" ? "Idioma" : "Language"}
							</p>
							<div className="flex gap-2 px-3">
								{languages.map((lang) => (
									<Button
										key={lang.code}
										variant={locale === lang.code ? "default" : "outline"}
										size="sm"
										onClick={() => setLocale(lang.code)}
										className={locale === lang.code ? "bg-primary text-primary-foreground" : "bg-transparent"}
									>
										{lang.flag}
									</Button>
								))}
							</div>
						</div>

						<div className="mt-3 flex flex-col gap-2 border-t border-border pt-3">
							<Button variant="ghost" size="sm" className="justify-start text-muted-foreground">
								{t.header.studentLogin}
							</Button>
							<Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90">
								{t.header.applyNow}
							</Button>
						</div>
					</nav>
				</div>
			)}
		</header>
	)
}
