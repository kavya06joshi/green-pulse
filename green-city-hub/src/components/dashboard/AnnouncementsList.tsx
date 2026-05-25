import { announcements } from "@/data/mockData";
import { Bell, AlertTriangle, CheckCircle2, Info } from "lucide-react";

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  success: CheckCircle2,
};

const colorMap = {
  info: "bg-eco-sky/10 text-eco-sky border-eco-sky/20",
  warning: "bg-eco-warning/10 text-eco-earth border-eco-warning/20",
  success: "bg-primary/10 text-primary border-primary/20",
};

const AnnouncementsList = () => (
  <section className="py-12">
    <div className="flex items-center gap-2 mb-6">
      <Bell className="h-5 w-5 text-primary" />
      <h2 className="text-2xl font-bold text-foreground">City Announcements</h2>
    </div>
    <div className="space-y-4">
      {announcements.map((a) => {
        const Icon = iconMap[a.type];
        return (
          <div
            key={a.id}
            className={`flex items-start gap-4 rounded-xl border p-5 ${colorMap[a.type]}`}
          >
            <Icon className="h-5 w-5 mt-0.5 shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                <h3 className="font-semibold text-foreground">{a.title}</h3>
                <span className="text-xs text-muted-foreground">{a.date}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">{a.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  </section>
);

export default AnnouncementsList;
