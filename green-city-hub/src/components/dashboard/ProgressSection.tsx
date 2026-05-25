import { Progress } from "@/components/ui/progress";

const metrics = [
  { label: "Recycling Target (75%)", value: 68, target: 75 },
  { label: "Waste Reduction Goal", value: 54, target: 100 },
  { label: "Citizen Participation", value: 82, target: 100 },
  { label: "Complaints Resolved", value: 94, target: 100 },
];

const ProgressSection = () => (
  <section className="py-12">
    <h2 className="text-2xl font-bold text-foreground mb-2">Environmental Goals</h2>
    <p className="text-muted-foreground mb-8">Tracking our progress toward a cleaner city</p>
    <div className="grid md:grid-cols-2 gap-6">
      {metrics.map((m) => (
        <div key={m.label} className="bg-card rounded-xl border p-5 shadow-soft">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-medium text-foreground">{m.label}</span>
            <span className="text-sm font-bold text-primary">{m.value}%</span>
          </div>
          <Progress value={m.value} className="h-2.5" />
        </div>
      ))}
    </div>
  </section>
);

export default ProgressSection;
