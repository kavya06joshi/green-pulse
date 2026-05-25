import { wasteGuides, type WasteType } from "@/data/mockData";
import { BookOpen } from "lucide-react";

const colorMap: Record<WasteType, string> = {
  Organic: "border-eco-organic/30 bg-eco-organic/5",
  Plastic: "border-eco-plastic/30 bg-eco-plastic/5",
  "E-waste": "border-eco-ewaste/30 bg-eco-ewaste/5",
  Hazardous: "border-eco-hazardous/30 bg-eco-hazardous/5",
  Mixed: "border-eco-mixed/30 bg-eco-mixed/5",
};

const badgeMap: Record<WasteType, string> = {
  Organic: "bg-eco-organic text-eco-leaf-foreground",
  Plastic: "bg-eco-plastic text-eco-sky-foreground",
  "E-waste": "bg-eco-ewaste text-eco-leaf-foreground",
  Hazardous: "bg-eco-hazardous text-eco-leaf-foreground",
  Mixed: "bg-eco-mixed text-eco-earth-foreground",
};

const GuidelinesPage = () => (
  <div className="container mx-auto px-4 py-8 lg:px-8 max-w-4xl">
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-6 w-6 text-primary" />
        <h1 className="text-3xl font-bold text-foreground">Waste Segregation Guidelines</h1>
      </div>
      <p className="text-muted-foreground">Learn how to properly sort your waste for a cleaner environment.</p>
    </div>

    <div className="space-y-6">
      {wasteGuides.map((guide) => (
        <div key={guide.type} className={`rounded-xl border-2 p-6 ${colorMap[guide.type]}`}>
          <div className="flex items-center gap-3 mb-4">
            <span className="text-3xl">{guide.icon}</span>
            <span className={`px-3 py-1 rounded-full text-sm font-bold ${badgeMap[guide.type]}`}>
              {guide.type}
            </span>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">What to include</h3>
              <ul className="space-y-1.5">
                {guide.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="text-sm font-semibold text-foreground mb-2 uppercase tracking-wide">💡 Tip</h3>
              <p className="text-sm text-muted-foreground">{guide.tips}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default GuidelinesPage;
