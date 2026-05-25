import { motion } from "framer-motion";
import { MapPin, Droplets, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-gradient-glass" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
        backgroundSize: '32px 32px'
      }} />
      
      <div className="container relative z-10 px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground">
              <Droplets className="w-4 h-4" />
              FSSAI RUCO Initiative — Reimagined
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-6"
          >
            Turn Used Oil Into{" "}
            <span className="text-gradient-primary">Community Power</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Smart collection. Zero waste pickups. Sports kits & cash rewards. 
            India's first community-driven used cooking oil recycling platform.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="lg" className="bg-gradient-hero text-primary-foreground shadow-soft hover:opacity-90 transition-opacity text-base px-8 py-6 rounded-xl">
              Register Your Society
            </Button>
            <Button size="lg" variant="outline" className="border-primary/20 text-foreground hover:bg-accent transition-colors text-base px-8 py-6 rounded-xl">
              I'm a Commercial Partner
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: MapPin, label: "Smart Pickup Points", value: "1,200+" },
              { icon: Droplets, label: "Litres Collected", value: "50,000+" },
              { icon: Trophy, label: "Sports Kits Awarded", value: "340+" },
            ].map((stat, i) => (
              <div key={i} className="bg-card rounded-2xl p-6 shadow-card border border-border/50">
                <stat.icon className="w-6 h-6 text-primary mb-3 mx-auto" />
                <div className="font-display text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
