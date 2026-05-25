import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Globe, Leaf, Recycle, Car, Wrench, ExternalLink } from "lucide-react";

const ecosystemApps = [
  {
    name: "Green City Hub",
    description: "Check waste collection timings in your city",
    icon: Leaf,
    url: "https://green-city-hub-28fd0.web.app",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-500/10",
  },
  {
    name: "Waste Exchange Nexus",
    description: "Your collected waste gets sold to industries",
    icon: Recycle,
    url: "https://waste-exchange-nexus-28fd0.web.app",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    name: "Green Sathi",
    description: "Carpool with neighbors to save fuel",
    icon: Car,
    url: "https://green-sathi-aac37.web.app",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-500/10",
  },
  {
    name: "Workers Portal",
    description: "Empowering city waste workers to manage routes and track collections",
    icon: Wrench,
    url: null,
    color: "text-orange-600 dark:text-orange-400",
    bgColor: "bg-orange-500/10",
    isComingSoon: true,
  },
];

const EcoCity360Banner = () => {
  return (
    <section className="py-16 px-6">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary mb-3">
            <Globe className="h-3.5 w-3.5" />
            EcoCity360
          </div>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Part of EcoCity360 Ecosystem
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Connected platforms working together for a sustainable city
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
          {ecosystemApps.map((app, index) => (
            <motion.div
              key={app.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="group rounded-2xl border bg-card p-6 text-center hover:border-primary/30 hover:shadow-card transition-all duration-300 h-full flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${app.bgColor} flex items-center justify-center`}>
                  <app.icon className={`h-6 w-6 ${app.color}`} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">{app.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                    {app.description}
                  </p>
                </div>
                {!app.isComingSoon ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto gap-1.5 rounded-xl"
                    asChild
                  >
                    <a href={app.url} target="_blank" rel="noopener noreferrer">
                      Visit <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                ) : (
                  <div className="mt-auto text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    Coming Soon
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcoCity360Banner;
