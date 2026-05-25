import { useState } from "react";
import { areas, schedules, type WasteType } from "@/data/mockData";
import { CalendarDays, Clock, MapPin } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const wasteColorMap: Record<WasteType, string> = {
  Organic: "bg-eco-organic/15 text-eco-organic border-eco-organic/30",
  Plastic: "bg-eco-plastic/15 text-eco-plastic border-eco-plastic/30",
  "E-waste": "bg-eco-ewaste/15 text-eco-ewaste border-eco-ewaste/30",
  Hazardous: "bg-eco-hazardous/15 text-eco-hazardous border-eco-hazardous/30",
  Mixed: "bg-eco-mixed/15 text-eco-mixed border-eco-mixed/30",
};

const SchedulePage = () => {
  const [selectedArea, setSelectedArea] = useState<string>("");
  const filtered = selectedArea ? schedules.filter((s) => s.area === selectedArea) : [];

  return (
    <div className="container mx-auto px-4 py-8 lg:px-8 max-w-3xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Collection Schedule</h1>
        <p className="text-muted-foreground">Select your area to view waste collection times and accepted types.</p>
      </div>

      <div className="bg-card rounded-xl border p-6 shadow-soft mb-8">
        <label className="block text-sm font-medium text-foreground mb-2">
          <MapPin className="inline h-4 w-4 mr-1" /> Select Your Area
        </label>
        <Select value={selectedArea} onValueChange={setSelectedArea}>
          <SelectTrigger className="w-full text-base">
            <SelectValue placeholder="Choose your zone..." />
          </SelectTrigger>
          <SelectContent>
            {areas.map((area) => (
              <SelectItem key={area} value={area}>{area}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedArea && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-foreground">
            Schedule for {selectedArea}
          </h2>
          {filtered.map((entry, i) => (
            <div key={i} className="bg-card rounded-xl border p-5 shadow-soft flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="flex items-center gap-3 flex-1">
                <CalendarDays className="h-5 w-5 text-primary shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{entry.day}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" /> {entry.time}
                  </p>
                </div>
              </div>
              <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border ${wasteColorMap[entry.wasteType]}`}>
                {entry.wasteType}
              </span>
            </div>
          ))}
        </div>
      )}

      {!selectedArea && (
        <div className="text-center py-16 text-muted-foreground">
          <CalendarDays className="h-12 w-12 mx-auto mb-4 opacity-40" />
          <p className="text-lg">Select an area above to view the collection schedule</p>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
