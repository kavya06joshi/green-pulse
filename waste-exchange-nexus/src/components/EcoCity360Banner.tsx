import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Leaf, Droplets, Car, Wrench, ExternalLink } from "lucide-react";

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

export default function EcoCity360Banner() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary mb-3">
            <Globe className="h-3 w-3" />
            EcoCity360
          </div>
          <h2 className="text-2xl font-bold text-foreground">
            Part of EcoCity360 Ecosystem
          </h2>
          <p className="text-muted-foreground mt-2 max-w-lg mx-auto">
            Connected platforms working together for a sustainable city
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {ecosystemApps.map((app) => (
            <Card
              key={app.name}
              className="text-center p-6 h-full border-2 hover:border-primary/30 transition-all duration-300 hover:shadow-md"
            >
              <CardContent className="p-0 flex flex-col items-center gap-3">
                <div className={`w-12 h-12 rounded-full ${app.bgColor} flex items-center justify-center`}>
                  <app.icon className={`h-6 w-6 ${app.color}`} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">{app.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {app.description}
                  </p>
                </div>
                {!app.isComingSoon ? (
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-auto gap-1.5"
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
}
