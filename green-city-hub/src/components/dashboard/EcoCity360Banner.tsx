import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Recycle, Droplets, Car, Wrench, ExternalLink } from "lucide-react";

const ecosystemApps = [
  {
    name: "Waste Exchange Nexus",
    description: "Your collected waste gets sold to industries",
    icon: Recycle,
    url: "https://waste-exchange-nexus-28fd0.web.app",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-500/10",
  },
  {
    name: "Oil Good Deeds",
    description: "Used cooking oil recycled into clean biodiesel",
    icon: Droplets,
    url: "https://oil-good-deeds-28fd0.web.app",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-500/10",
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
    <section className="mt-8 mb-2">
      <div className="rounded-2xl border bg-accent/40 p-6 md:p-8">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Globe className="h-3 w-3" />
            EcoCity360
          </div>
          <h3 className="text-lg font-bold text-foreground">
            Part of EcoCity360 Ecosystem
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            Connected platforms working together for a sustainable city
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {ecosystemApps.map((app) => (
            <Card
              key={app.name}
              className="group border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-300"
            >
              <CardContent className="p-4 flex flex-col items-center text-center gap-3">
                <div className={`w-10 h-10 rounded-full ${app.bgColor} flex items-center justify-center`}>
                  <app.icon className={`h-5 w-5 ${app.color}`} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">{app.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                    {app.description}
                  </p>
                </div>
                {!app.isComingSoon ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto text-xs gap-1.5 h-8"
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EcoCity360Banner;
