import { motion } from "framer-motion";
import { IndianRupee, Trophy } from "lucide-react";
import { useState } from "react";

const sportsRewards = [
  { emoji: "🏏", name: "Cricket Bat", litres: 50 },
  { emoji: "⚽", name: "Football", litres: 30 },
  { emoji: "🏸", name: "Badminton Kit", litres: 40 },
  { emoji: "🏀", name: "Basketball", litres: 35 },
  { emoji: "🎾", name: "Tennis Balls (6)", litres: 20 },
];

const RewardSection = () => {
  const [selectedOption, setSelectedOption] = useState<"cash" | "sports">("sports");

  return (
    <section className="py-24 px-6">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="text-sm font-medium text-secondary uppercase tracking-wider">Incentive Model</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Choose Your <span className="text-gradient-warm">Reward</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-lg mx-auto">
            Societies pick what motivates them most — cash payouts or sports equipment for the community.
          </p>
        </motion.div>

        {/* Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-muted rounded-xl p-1.5 flex gap-1">
            <button
              onClick={() => setSelectedOption("cash")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                selectedOption === "cash"
                  ? "bg-card shadow-card text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <IndianRupee className="w-4 h-4" />
              Cash Payout
            </button>
            <button
              onClick={() => setSelectedOption("sports")}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-medium transition-all ${
                selectedOption === "sports"
                  ? "bg-card shadow-card text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Trophy className="w-4 h-4" />
              Sports Equipment
            </button>
          </div>
        </div>

        {/* Content */}
        {selectedOption === "cash" ? (
          <motion.div
            key="cash"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto bg-card border border-border/50 rounded-2xl p-10 shadow-card text-center"
          >
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-6">
              <IndianRupee className="w-10 h-10 text-secondary" />
            </div>
            <div className="font-display text-5xl font-bold text-foreground mb-2">₹20</div>
            <div className="text-muted-foreground">per litre of used cooking oil</div>
            <div className="mt-6 text-sm text-muted-foreground">
              Direct bank transfer to society account after each collection cycle.
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="sports"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-3xl mx-auto"
          >
            {sportsRewards.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="bg-card border border-border/50 rounded-2xl p-5 text-center shadow-card hover:shadow-elevated hover:-translate-y-1 transition-all cursor-default"
              >
                <div className="text-4xl mb-3">{item.emoji}</div>
                <div className="font-display text-sm font-semibold text-foreground">{item.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{item.litres}L required</div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default RewardSection;
