import { ArrowRight, Leaf } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const HeroBanner = () => (
  <section className="relative overflow-hidden rounded-2xl eco-gradient px-6 py-12 md:px-12 md:py-16 text-primary-foreground">
    <div className="absolute inset-0 opacity-10">
      <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-primary-foreground/20" />
      <div className="absolute -left-10 -bottom-10 h-60 w-60 rounded-full bg-primary-foreground/10" />
    </div>
    <div className="relative max-w-2xl">
      <div className="flex items-center gap-2 mb-4">
        <Leaf className="h-6 w-6" />
        <span className="text-sm font-semibold uppercase tracking-wider opacity-90">Smart Waste Management</span>
      </div>
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-4 text-balance">
        Together for a Cleaner, Greener City
      </h1>
      <p className="text-base md:text-lg opacity-90 mb-8 max-w-lg">
        Check collection schedules, learn proper waste segregation, earn green points, and help build a sustainable future for our community.
      </p>
      <div className="flex flex-wrap gap-3">
        <Button asChild size="lg" variant="secondary" className="font-semibold">
          <Link to="/schedule">
            Find Your Schedule <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="font-semibold border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
          <Link to="/guidelines">
            Segregation Guide
          </Link>
        </Button>
      </div>
    </div>
  </section>
);

export default HeroBanner;
