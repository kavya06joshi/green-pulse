import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Clock } from "lucide-react";

const AreaSearch = () => {
  const [area, setArea] = useState("");
  const [showTimings, setShowTimings] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (area.trim()) {
      setShowTimings(true);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-primary/20 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Check Waste Collection Timing
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              placeholder="Enter your area (e.g., City Center, Greenwood)"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Search</Button>
          </form>

          {showTimings && (
            <div className="mt-6 p-4 rounded-lg bg-primary/5 border border-primary/10 animate-fade-in">
              <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Collection Schedule for "{area}"
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Morning</p>
                  <p className="font-bold text-lg">8:00 AM</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Evening</p>
                  <p className="font-bold text-lg">6:00 PM</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-3 italic">
                * Note: Timings are approximate and subject to traffic conditions.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AreaSearch;
