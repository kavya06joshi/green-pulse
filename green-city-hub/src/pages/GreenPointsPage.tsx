import { leaderboard } from "@/data/mockData";
import { Award, Medal, Star, TrendingUp } from "lucide-react";

const rankColors = [
  "bg-eco-warning/15 border-eco-warning/40 text-eco-earth",
  "bg-muted border-border text-muted-foreground",
  "bg-eco-earth/10 border-eco-earth/30 text-eco-earth",
];

const GreenPointsPage = () => (
  <div className="container mx-auto px-4 py-8 lg:px-8 max-w-3xl">
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-2">
        <Award className="h-6 w-6 text-eco-warning" />
        <h1 className="text-3xl font-bold text-foreground">Green Points</h1>
      </div>
      <p className="text-muted-foreground">Earn points for eco-friendly actions. Top contributors are recognized!</p>
    </div>

    {/* How to earn */}
    <div className="bg-card rounded-xl border p-6 shadow-soft mb-8">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
        <TrendingUp className="h-5 w-5 text-primary" /> How to Earn Points
      </h2>
      <div className="grid sm:grid-cols-3 gap-4">
        {[
          { label: "Segregation Report", pts: "+10 pts", desc: "Report proper waste sorting" },
          { label: "Dumping Report", pts: "+25 pts", desc: "Report illegal dumping" },
          { label: "Eco Drive", pts: "+50 pts", desc: "Join community eco drives" },
        ].map((item) => (
          <div key={item.label} className="bg-accent/50 rounded-lg p-4 text-center">
            <p className="text-xl font-bold text-primary">{item.pts}</p>
            <p className="text-sm font-semibold text-foreground mt-1">{item.label}</p>
            <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>

    {/* Leaderboard */}
    <div className="bg-card rounded-xl border shadow-soft overflow-hidden">
      <div className="p-5 border-b">
        <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <Medal className="h-5 w-5 text-eco-warning" /> Leaderboard
        </h2>
      </div>
      <div className="divide-y">
        {leaderboard.map((entry, i) => (
          <div key={entry.rank} className={`flex items-center gap-4 px-5 py-4 ${i < 3 ? rankColors[i] : ""}`}>
            <span className="w-8 text-center font-bold text-lg">
              {i < 3 ? <Star className="h-5 w-5 mx-auto fill-current" /> : `#${entry.rank}`}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">{entry.name}</p>
              <p className="text-xs text-muted-foreground">{entry.area} · {entry.activities} activities</p>
            </div>
            <span className="font-bold text-primary text-lg">{entry.points.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Sign up CTA */}
    <div className="mt-8 bg-accent rounded-xl p-6 text-center border">
      <p className="text-lg font-semibold text-foreground mb-2">Want to earn Green Points?</p>
      <p className="text-sm text-muted-foreground mb-4">Sign up to start tracking your eco contributions and climb the leaderboard.</p>
      <p className="text-xs text-muted-foreground">Account system coming in Phase 2</p>
    </div>
  </div>
);

export default GreenPointsPage;
