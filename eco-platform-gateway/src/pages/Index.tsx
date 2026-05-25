import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Leaf, Recycle, Users, Droplet, AlertTriangle, Trash2, Wrench, TreeDeciduous,
  Activity, Store, ClipboardList, ShieldCheck, ArrowRight, UserPlus, BadgeCheck,
  UserCog, Lock, Sparkles, Globe2, Building2, Mail
} from "lucide-react";

const MODULES = [
  {
    icon: Leaf,
    name: "City Bloom",
    audience: "For Citizens",
    purpose: ["Report waste & cleanliness issues", "Track city cleanliness in real time", "Engage with the urban ecosystem"],
    cta: "Open City Bloom",
    href: "https://green-city-hub-28fd0.web.app",
  },
  {
    icon: Recycle,
    name: "Waste Exchange Nexus",
    audience: "For Citizens + Recyclers",
    purpose: ["Citizens list recyclable waste", "Recyclers browse & collect materials", "Powers a true circular economy"],
    cta: "Open Waste Exchange",
    href: "https://waste-exchange-nexus-28fd0.web.app",
  },
  {
    icon: Droplet,
    name: "Oil Good Deeds",
    audience: "For Oil Donors + Admin",
    purpose: ["Submit used cooking oil safely", "Track pickups & collection", "Prevent harmful environmental disposal"],
    cta: "Open Oil Platform",
    href: "https://oil-good-deeds-28fd0.web.app",
  },
  {
    icon: Users,
    name: "Green Sathi",
    audience: "For City Residents",
    purpose: ["Share commutes with coworkers", "Reduce fuel consumption", "Build community through carpooling"],
    cta: "Open Green Sathi",
    href: "https://green-sathi-aac37.web.app",
  },
  {
    icon: Wrench,
    name: "Workers Portal",
    audience: "For Sanitation Workers",
    purpose: ["View assigned daily tasks", "Update work status on the go", "Improve coordination & efficiency"],
    cta: "Coming Soon",
    badge: true,
    href: "#",
  },
];

const PROBLEMS = [
  { icon: Trash2, title: "No structured waste system", text: "Cities lack a unified workflow for handling daily waste." },
  { icon: Recycle, title: "Recyclables go to landfill", text: "Tons of valuable materials are lost every single day." },
  { icon: Users, title: "Poor worker coordination", text: "Sanitation teams operate without clear, trackable tasks." },
  { icon: AlertTriangle, title: "Environmental damage", text: "Improper waste & oil disposal harms soil, water and air." },
];

const SOLUTIONS = [
  { icon: Activity, title: "Digital waste tracking", text: "Real-time visibility into reports, pickups and progress." },
  { icon: Store, title: "Waste exchange marketplace", text: "Match recyclable supply with verified recycler demand." },
  { icon: ClipboardList, title: "Worker task system", text: "Assign, track and verify sanitation work end-to-end." },
  { icon: Droplet, title: "Oil recycling system", text: "Safe channel for used cooking oil collection & reuse." },
];

const ACCESS = [
  { icon: UserPlus, title: "Citizens", text: "Sign up directly — instant access to City Bloom & Nexus." },
  { icon: BadgeCheck, title: "Recyclers", text: "Apply and get verified before accessing the marketplace." },
  { icon: UserCog, title: "Workers & Oil Donors", text: "Onboarded and managed directly by city administrators." },
  { icon: Lock, title: "Restricted access", text: "Unauthorized users cannot enter protected modules." },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50 backdrop-blur-lg bg-background/70 border-b border-border/60">
        <nav className="container flex items-center justify-between py-4">
          <a href="#top" className="flex items-center gap-2 font-bold text-lg">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-gradient-hero text-primary-foreground shadow-soft">
              <Leaf className="w-5 h-5" />
            </span>
            <span>EcoCity</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#problem" className="hover:text-foreground transition-smooth">Problem</a>
            <a href="#solution" className="hover:text-foreground transition-smooth">Solution</a>
            <a href="#modules" className="hover:text-foreground transition-smooth">Modules</a>
            <a href="#access" className="hover:text-foreground transition-smooth">Access</a>
            <a href="#vision" className="hover:text-foreground transition-smooth">Vision</a>
          </div>
          <Button asChild size="sm" className="rounded-full bg-primary hover:bg-primary/90">
            <a href="#contact">Contact</a>
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative pt-32 pb-24 md:pt-40 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-gradient-soft" />
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary-glow/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl" />

        <div className="container relative grid md:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-secondary border border-border text-xs font-semibold text-secondary-foreground mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              Environmental Technology Platform
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.05] mb-6">
              Smart Waste Management Platform for{" "}
              <span className="text-gradient">Modern Cities</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Connecting citizens, workers, recyclers, carpoolers, and oil donors in one ecosystem —
              built to make every city cleaner, smarter and circular.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 shadow-elegant">
                <a href="#modules">Explore Modules <ArrowRight className="ml-1 w-4 h-4" /></a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full border-2">
                <a href="#contact">Collaborate / Contact</a>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-6 mt-12 max-w-md">
              {[
                { n: "6", l: "Platforms" },
                { n: "5", l: "User types" },
                { n: "1", l: "Ecosystem" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="text-3xl font-bold text-primary">{s.n}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative animate-fade-up" style={{ animationDelay: "150ms" }}>
            <div className="relative aspect-square max-w-md ml-auto">
              <div className="absolute inset-0 bg-gradient-hero rounded-[3rem] rotate-6 shadow-glow" />
              <div className="absolute inset-0 bg-card rounded-[3rem] -rotate-3 shadow-elegant border border-border grid place-items-center p-8">
                <div className="grid grid-cols-2 gap-4 w-full">
                  {MODULES.map((m, i) => (
                    <div
                      key={m.name}
                      className="aspect-square rounded-2xl bg-gradient-card border border-border grid place-items-center shadow-soft animate-float"
                      style={{ animationDelay: `${i * 0.4}s` }}
                    >
                      <m.icon className="w-10 h-10 text-primary" strokeWidth={1.6} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section id="problem" className="py-24 bg-background">
        <div className="container">
          <SectionHeader eyebrow="The Problem" title="Cities are drowning in waste — without a system" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {PROBLEMS.map((p) => (
              <Card key={p.title} className="p-6 border-border bg-gradient-card hover:shadow-soft transition-smooth hover:-translate-y-1">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 grid place-items-center mb-4">
                  <p.icon className="w-6 h-6 text-destructive" />
                </div>
                <h3 className="font-semibold mb-2">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION */}
      <section id="solution" className="py-24 bg-gradient-soft">
        <div className="container">
          <SectionHeader eyebrow="Our Solution" title="One ecosystem. Four working systems." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {SOLUTIONS.map((s, i) => (
              <div key={s.title} className="relative">
                <Card className="p-6 h-full border-border bg-card hover:shadow-elegant transition-smooth hover:-translate-y-1">
                  <div className="w-12 h-12 rounded-xl bg-gradient-hero grid place-items-center mb-4 shadow-soft">
                    <s.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div className="text-xs font-bold text-primary mb-2">STEP {i + 1}</div>
                  <h3 className="font-semibold mb-2">{s.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.text}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section id="modules" className="py-24 bg-background">
        <div className="container">
          <SectionHeader
            eyebrow="The Platform"
            title="Six platforms. Built for changemakers across the city."
            subtitle="Each platform solves a specific problem, for a specific audience — together they form one connected city system."
          />
          <div className="grid md:grid-cols-3 gap-6 mt-14">
            {MODULES.map((m) => (
              <Card key={m.name} className="group p-8 border-border bg-gradient-card hover:shadow-elegant transition-smooth hover:-translate-y-1 flex flex-col">
                <div className="flex items-start justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-hero grid place-items-center shadow-soft group-hover:shadow-glow transition-smooth">
                    <m.icon className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground">
                      {m.audience}
                    </span>
                    {m.badge && (
                      <span className="text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                        Coming Soon
                      </span>
                    )}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-4">{m.name}</h3>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {m.purpose.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-glow shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                {!m.badge && (
                  <Button asChild className="rounded-full bg-primary hover:bg-primary/90 self-start">
                    <a href={m.href} target="_blank" rel="noopener noreferrer">
                      {m.cta} <ArrowRight className="ml-1 w-4 h-4" />
                    </a>
                  </Button>
                )}
                {m.badge && (
                  <div className="text-xs font-semibold px-4 py-2 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400 self-start">
                    {m.cta}
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ACCESS */}
      <section id="access" className="py-24 bg-gradient-soft">
        <div className="container">
          <SectionHeader eyebrow="How Access Works" title="Open where it should be. Protected where it must be." />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14">
            {ACCESS.map((a, i) => (
              <Card key={a.title} className="p-6 border-border bg-card hover:shadow-soft transition-smooth relative">
                <div className="absolute -top-3 -left-3 w-9 h-9 rounded-full bg-primary text-primary-foreground grid place-items-center text-sm font-bold shadow-soft">
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-secondary grid place-items-center mb-4 mt-2">
                  <a.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{a.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{a.text}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* VISION */}
      <section id="vision" className="py-24 bg-background">
        <div className="container">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-hero p-10 md:p-16 shadow-elegant">
            <div className="absolute top-10 right-10 opacity-20">
              <TreeDeciduous className="w-48 h-48 text-primary-foreground" />
            </div>
            <div className="relative max-w-3xl text-primary-foreground">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-foreground/15 backdrop-blur text-xs font-semibold mb-6">
                <Globe2 className="w-3.5 h-3.5" /> Our Vision
              </div>
              <h2 className="text-3xl md:text-5xl font-bold leading-tight mb-6">
                Building smart, circular cities — scalable for every Indian city.
              </h2>
              <p className="text-lg opacity-90 leading-relaxed mb-8">
                We believe sustainability shouldn't depend on guesswork. By bringing citizens,
                workers, recyclers and donors onto one platform, we lay the foundation for
                cleaner streets, smarter operations, and a truly circular economy.
              </p>
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Building2, t: "Smart Cities" },
                  { icon: Recycle, t: "Circular Economy" },
                  { icon: ShieldCheck, t: "Real Sustainability" },
                ].map((v) => (
                  <div key={v.t} className="flex items-center gap-3 p-4 rounded-2xl bg-primary-foreground/10 backdrop-blur border border-primary-foreground/20">
                    <v.icon className="w-5 h-5 shrink-0" />
                    <span className="font-semibold text-sm">{v.t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="py-24 bg-gradient-soft">
        <div className="container max-w-3xl text-center">
          <SectionHeader eyebrow="Get Involved" title="Want to collaborate?" />
          <p className="text-lg text-muted-foreground mt-6 mb-10 max-w-2xl mx-auto leading-relaxed">
            Are you a recycler, NGO, organization, or city authority? Let's build a cleaner
            future together. Reach out and join the ecosystem.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button asChild size="lg" className="rounded-full bg-primary hover:bg-primary/90 shadow-elegant">
              <a href="mailto:hello@ecocity.app"><Mail className="mr-1 w-4 h-4" /> Contact the team</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-2">
              <a href="#modules">Explore Modules</a>
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10 bg-background">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 font-semibold text-foreground">
            <Leaf className="w-4 h-4 text-primary" />
            EcoCity Platform
          </div>
          <div>© {new Date().getFullYear()} EcoCity. Building cleaner cities, together.</div>
        </div>
      </footer>
    </div>
  );
};

const SectionHeader = ({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) => (
  <div className="text-center max-w-3xl mx-auto">
    <div className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-primary mb-4">
      {eyebrow}
    </div>
    <h2 className="text-3xl md:text-5xl font-bold tracking-tight leading-tight">{title}</h2>
    {subtitle && <p className="text-lg text-muted-foreground mt-5 leading-relaxed">{subtitle}</p>}
  </div>
);

export default Index;
