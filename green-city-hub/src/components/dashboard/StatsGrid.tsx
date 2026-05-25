import { Recycle, Users, TreePine, Award, MapPin, CheckCircle, Trash2, Wind } from "lucide-react";
import { cityStats } from "@/data/mockData";

const stats = [
  { label: "Waste Collected", value: cityStats.totalWasteCollected, icon: Trash2, color: "text-eco-earth" },
  { label: "Recycling Rate", value: `${cityStats.recyclingRate}%`, icon: Recycle, color: "text-primary" },
  { label: "Active Citizens", value: cityStats.activeUsers, icon: Users, color: "text-eco-sky" },
  { label: "Green Points Given", value: cityStats.greenPointsAwarded, icon: Award, color: "text-eco-warning" },
  { label: "Areas Served", value: cityStats.areasServed, icon: MapPin, color: "text-eco-leaf" },
  { label: "Issues Resolved", value: `${cityStats.complaintsResolved}%`, icon: CheckCircle, color: "text-primary" },
  { label: "Trees Planted", value: cityStats.treesPlanted, icon: TreePine, color: "text-eco-organic" },
  { label: "CO₂ Reduced", value: cityStats.co2Reduced, icon: Wind, color: "text-eco-sky" },
];

const StatsGrid = () => (
  <section className="py-12">
    <h2 className="text-2xl font-bold text-foreground mb-2">City Environmental Progress</h2>
    <p className="text-muted-foreground mb-8">Real-time statistics for our city's sustainability efforts</p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-card rounded-xl p-5 shadow-soft border border-border/50 hover:shadow-card transition-shadow"
        >
          <stat.icon className={`h-6 w-6 ${stat.color} mb-3`} />
          <p className="text-2xl font-bold text-foreground">{stat.value}</p>
          <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
        </div>
      ))}
    </div>
  </section>
);

export default StatsGrid;
