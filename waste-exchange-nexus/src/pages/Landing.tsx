import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Recycle, Building2, Factory, TrendingUp, Users, DollarSign, ArrowRight, Leaf, Shield } from "lucide-react";
import EcoCity360Banner from "@/components/EcoCity360Banner";

const stats = [
  { label: "Total Waste Processed", value: "12,450 tons", icon: Recycle, color: "text-primary" },
  { label: "Active Industries", value: "87", icon: Factory, color: "text-secondary" },
  { label: "Revenue Generated", value: "₹1.42 Cr", icon: DollarSign, color: "text-primary" },
  { label: "Municipalities Active", value: "24", icon: Building2, color: "text-secondary" },
];

const steps = [
  { icon: Users, title: "Citizen Segregation", desc: "Households segregate waste into recyclable categories at source" },
  { icon: Building2, title: "Municipal Collection", desc: "Municipal bodies collect, grade, and list waste inventory online" },
  { icon: Factory, title: "Industrial Purchase", desc: "Industries browse, order, and pick up raw materials at fixed prices" },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/80 backdrop-blur sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Recycle className="h-7 w-7 text-primary" />
            <span className="text-xl font-bold text-foreground">WasteXchange</span>
          </div>
          <div className="flex gap-3">
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 lg:py-28">
        <div className="container text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border bg-accent px-4 py-1.5 text-sm text-accent-foreground mb-6">
            <Leaf className="h-4 w-4" />
            Building a Circular Economy
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl text-foreground mb-6">
            Municipal Circular Waste Exchange Portal
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            A transparent platform connecting municipalities with recycling industries. 
            Transform waste into valuable resources through structured, fixed-price exchanges.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link to="/login">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16 bg-muted/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-4 text-foreground">How It Works</h2>
          <p className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            A simple three-step process that converts waste into resources
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {steps.map((step, i) => (
              <div key={step.title} className="relative">
                <Card className="text-center p-6 h-full border-2 hover:border-primary/30 transition-colors">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <step.icon className="h-7 w-7 text-primary" />
                    </div>
                    <div className="text-sm font-semibold text-primary mb-1">Step {i + 1}</div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </CardContent>
                </Card>
                {i < 2 && (
                  <ArrowRight className="hidden md:block absolute top-1/2 -right-5 h-5 w-5 text-muted-foreground -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">Platform Impact</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((s) => (
              <Card key={s.label} className="p-6">
                <CardContent className="p-0 flex flex-col items-center text-center">
                  <s.icon className={`h-8 w-8 ${s.color} mb-3`} />
                  <div className="text-3xl font-bold text-foreground">{s.value}</div>
                  <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted/50">
        <div className="container text-center max-w-2xl">
          <Shield className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-4">Transparent & Secure</h2>
          <p className="text-muted-foreground mb-6">
            Fixed pricing, structured timelines, and full transparency. No auctions, no bidding — just straightforward circular economy.
          </p>
          <div className="flex gap-4 justify-center">
            <Button asChild>
              <Link to="/login">Access Portal</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* EcoCity360 Ecosystem */}
      <EcoCity360Banner />

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container text-center text-sm text-muted-foreground">
          © 2026 WasteXchange — Municipal Circular Waste Exchange Portal. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
