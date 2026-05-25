import { motion } from "framer-motion";
import { Navigation, Bell, CreditCard, BarChart3, MapPinned, Shield } from "lucide-react";

const features = [
  {
    icon: MapPinned,
    title: "Smart Pickup Confirmation",
    description: "Society leaders send live confirmed locations. Trucks follow only verified stops.",
  },
  {
    icon: Navigation,
    title: "Live Vehicle Tracking",
    description: "Track collection trucks in real-time. Know exactly when your pickup arrives.",
  },
  {
    icon: Bell,
    title: "Schedule Notifications",
    description: "Weekly reminders for collection days. Never miss a pickup window.",
  },
  {
    icon: BarChart3,
    title: "Community Leaderboard",
    description: "Compete with other societies. Top contributors earn bonus rewards.",
  },
  {
    icon: CreditCard,
    title: "Instant Payments",
    description: "Commercial partners receive digital payments and receipts instantly.",
  },
  {
    icon: Shield,
    title: "FSSAI Compliant",
    description: "Fully aligned with RUCO initiative guidelines and food safety standards.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 px-6 bg-muted/30">
      <div className="container max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Platform Features</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Built for <span className="text-gradient-primary">Efficiency</span>
          </h2>
          <p className="text-muted-foreground mt-4 max-w-xl mx-auto">
            Everything communities & commercial partners need — in one platform.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="group bg-card border border-border/50 rounded-2xl p-7 shadow-card hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center mb-5 group-hover:bg-primary/10 transition-colors">
                <feature.icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
