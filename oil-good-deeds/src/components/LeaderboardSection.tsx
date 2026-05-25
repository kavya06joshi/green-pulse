import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";

const societies = [
  { rank: 1, name: "Green Valley Society", city: "Pune", litres: 1240, icon: Trophy },
  { rank: 2, name: "Sunrise Apartments", city: "Mumbai", litres: 980, icon: Medal },
  { rank: 3, name: "Lake View Complex", city: "Bangalore", litres: 870, icon: Award },
  { rank: 4, name: "Palm Heights", city: "Delhi", litres: 720 },
  { rank: 5, name: "Royal Enclave", city: "Hyderabad", litres: 650 },
];

const rankColors = [
  "bg-gradient-hero text-primary-foreground",
  "bg-secondary/15 text-secondary",
  "bg-primary/10 text-primary",
];

const LeaderboardSection = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Leaderboard</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Top Contributing Societies
          </h2>
        </motion.div>

        <div className="space-y-3">
          {societies.map((society, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border/50 rounded-xl p-4 flex items-center gap-4 shadow-card"
            >
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-display font-bold text-sm ${
                i < 3 ? rankColors[i] : "bg-muted text-muted-foreground"
              }`}>
                {society.icon ? <society.icon className="w-5 h-5" /> : `#${society.rank}`}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-display font-semibold text-foreground truncate">{society.name}</div>
                <div className="text-xs text-muted-foreground">{society.city}</div>
              </div>
              <div className="text-right">
                <div className="font-display font-bold text-foreground">{society.litres.toLocaleString()}L</div>
                <div className="text-xs text-muted-foreground">collected</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeaderboardSection;
