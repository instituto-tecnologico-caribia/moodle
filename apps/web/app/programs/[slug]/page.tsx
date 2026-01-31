import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, Award, Users, CheckCircle2, PhoneCall, ChevronRight, GraduationCapIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { programs, getProgramBySlug, getAllProgramSlugs } from "@/lib/programs"
import { Header } from "@/components/header"

export function generateStaticParams() {
	return getAllProgramSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const program = getProgramBySlug(slug)
	if (!program) return { title: "Program Not Found" }

	return {
		title: `${program.title} | Nexus Institute of Technology`,
		description: program.description,
	}
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
	const { slug } = await params
	const program = getProgramBySlug(slug)

	if (!program) {
		notFound()
	}

	const otherPrograms = programs.filter(p => p.slug !== slug).slice(0, 2)

	return (
		<main className="min-h-screen bg-background">
			<Header showApplyButton={false} />
			{/* Hero Section */}
			<section className="relative">
				<div className="absolute inset-0 h-[400px] sm:h-[500px]">
					<Image
						src={program.image || "/placeholder.svg"}
						alt={program.title}
						fill
						className="object-cover"
						priority
					/>
					<div className="absolute inset-0 bg-gradient-to-b from-foreground/80 via-foreground/70 to-foreground/90" />
				</div>

				<div className="relative mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
					<div className="mt-12 max-w-3xl pb-24 sm:mt-16 sm:pb-32">
						<Badge className={`${program.tagColor} border-0 text-primary-foreground`}>
							{program.tag}
						</Badge>
						<h1 className="mt-4 font-serif text-4xl font-bold tracking-tight text-card sm:text-5xl lg:text-6xl">
							{program.title}
						</h1>
						<p className="mt-6 text-lg leading-relaxed text-card/90 sm:text-xl">
							{program.description}
						</p>

						<div className="mt-8 flex flex-wrap items-center gap-6">
							<div className="flex items-center gap-2 text-card/80">
								<Clock className="h-5 w-5" />
								<span>{program.duration}</span>
							</div>
							<div className="flex items-center gap-2 text-card/80">
								<Award className="h-5 w-5" />
								<span>{program.certification}</span>
							</div>
						</div>

						<div className="mt-10 flex flex-wrap gap-4">

							<Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:cursor-pointer">
								<PhoneCall /> Programa una Llamada
							</Button>
							<Button size="lg" variant="outline" className="border-primary-foreground/30 bg-primary text-primary-foreground  hover:bg-primary/80 hover:cursor-pointer">
								Ver Curriculum
							</Button>
						</div>
					</div>
				</div>
			</section>

			{/* Overview Section */}
			<section className="pb-15">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
						<div className="lg:col-span-2">
							<h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
								Program Overview
							</h2>
							<p className="mt-6 text-lg leading-relaxed text-muted-foreground">
								{program.fullDescription}
							</p>

							<h3 className="mt-12 text-xl font-semibold text-foreground">What You&apos;ll Gain</h3>
							<ul className="mt-6 grid gap-4 sm:grid-cols-2">
								{program.highlights.map((highlight) => (
									<li key={highlight} className="flex items-start gap-3">
										<CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
										<span className="text-muted-foreground">{highlight}</span>
									</li>
								))}
							</ul>
						</div>

						<div className="lg:col-span-1">
							<Card className="sticky top-24 border-border bg-card">
								<CardContent className="p-6">
									<h3 className="text-lg font-semibold text-foreground">Program Details</h3>

									<div className="mt-6 space-y-4">
										<div className="flex justify-between border-b border-border pb-4">
											<span className="text-muted-foreground capitalize">duración</span>
											<span className="font-medium text-foreground">{program.duration}</span>
										</div>
										<div className="flex justify-between border-b border-border pb-4">
											<span className="text-muted-foreground">Precio</span>
											<span className="font-medium text-foreground capitalize">{program.tuition} mensual</span>
										</div>
										<div className="flex">
											<GraduationCapIcon className="text-muted-foreground mr-2" />
											<span className="text-right font-medium text-foreground">{program.certification}</span>
										</div>
									</div>
									<Button size="lg" className="mt-8 w-full capitalize bg-primary text-primary-foreground hover:bg-primary/80 hover:cursor-pointer ">
										Aplicar ahora
									</Button>
									<p className="mt-4 text-center text-xs text-muted-foreground">
										Applications close {program.applicationDeadline}
									</p>
								</CardContent>
							</Card>
						</div>
					</div>
				</div>
			</section>

			{/* Curriculum Section */}
			<section className="bg-muted/50 py-16 sm:py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
						Curriculum
					</h2>
					<p className="mt-4 max-w-2xl text-lg text-muted-foreground">
						A comprehensive learning path designed to take you from fundamentals to industry-ready expertise.
					</p>

					<div className="mt-12 space-y-6">
						{program.curriculum.map((module, index) => (
							<Card key={module.title} className="border-border bg-card">
								<CardContent className="p-6">
									<div className="flex flex-wrap items-start justify-between gap-4">
										<div className="flex items-start gap-4">
											<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">
												{index + 1}
											</div>
											<div>
												<h3 className="text-lg font-semibold text-foreground">{module.title}</h3>
												<p className="mt-1 text-sm text-muted-foreground">{module.weeks}</p>
											</div>
										</div>
									</div>
									<div className="mt-6 flex flex-wrap gap-2">
										{module.topics.map((topic) => (
											<Badge key={topic} variant="secondary" className="bg-secondary text-secondary-foreground">
												{topic}
											</Badge>
										))}
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* Mentors Section */}
			<section className="py-16 sm:py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<div className="flex items-center gap-3">
						<Users className="h-6 w-6 text-primary" />
						<h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
							Learn from Industry Leaders
						</h2>
					</div>
					<p className="mt-4 max-w-2xl text-lg text-muted-foreground">
						Our mentors bring years of experience from the world&apos;s top technology companies.
					</p>

					<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{program.mentors.map((mentor) => (
							<Card key={mentor.name} className="border-border bg-card">
								<CardContent className="p-6">
									<div className="flex items-center gap-4">
										<div className="relative h-16 w-16 overflow-hidden rounded-full">
											<Image
												src={mentor.image || "/placeholder.svg"}
												alt={mentor.name}
												fill
												className="object-cover"
											/>
										</div>
										<div>
											<h3 className="font-semibold text-foreground">{mentor.name}</h3>
											<p className="text-sm text-muted-foreground">{mentor.role}</p>
											<p className="text-sm font-medium text-primary">{mentor.company}</p>
										</div>
									</div>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="bg-primary py-16 sm:py-20">
				<div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
					<h2 className="font-serif text-3xl font-bold text-primary-foreground sm:text-4xl">
						Ready to Start Your Journey?
					</h2>
					<p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/90">
						Applications for the {program.nextCohort} cohort are now open. Secure your spot today.
					</p>
					<div className="mt-10 flex flex-wrap justify-center gap-4">
						<Button size="lg" className="bg-card text-foreground hover:bg-card/90">
							Apply Now
						</Button>
						<Button size="lg" variant="outline" className="border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
							Schedule a Call
						</Button>
					</div>
				</div>
			</section>

			{/* Other Programs */}
			<section className="py-16 sm:py-20">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<h2 className="font-serif text-2xl font-bold text-foreground sm:text-3xl">
						Explore Other Programs
					</h2>

					<div className="mt-8 grid gap-6 sm:grid-cols-2">
						{otherPrograms.map((p) => (
							<Link key={p.slug} href={`/programs/${p.slug}`}>
								<Card className="group h-full border-border bg-card transition-all hover:shadow-lg">
									<CardContent className="flex items-center gap-6 p-6">
										<div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
											<Image
												src={p.image || "/placeholder.svg"}
												alt={p.title}
												fill
												className="object-cover transition-transform group-hover:scale-105"
											/>
										</div>
										<div className="flex-1">
											<Badge className={`${p.tagColor} border-0 text-xs text-primary-foreground`}>
												{p.tag}
											</Badge>
											<h3 className="mt-2 font-semibold text-foreground">{p.title}</h3>
											<p className="mt-1 text-sm text-muted-foreground">{p.duration}</p>
										</div>
										<ChevronRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
									</CardContent>
								</Card>
							</Link>
						))}
					</div>
				</div>
			</section>
		</main>
	)
}
