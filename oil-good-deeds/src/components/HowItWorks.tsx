import { motion } from "framer-motion";
import { Users, MapPin, Truck, Gift } from "lucide-react";

const steps = [
  {
    icon: Users,
    title: "Society Registers",
    description: "Housing society signs up and appoints a coordinator to manage oil collection.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MapPin,
    title: "Confirm Pickup Point",
    description: "On collection day, the leader confirms the exact pickup location via the app.",
    color: "bg-secondary/10 text-secondary",
  },
  {
    icon: Truck,
    title: "Zero-Waste Pickup",
    description: "Government truck follows only confirmed stops — no delays, no fuel waste.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Gift,
    title: "Earn Rewards",
    description: "Choose between ₹20/litre cash or sports equipment for your community.",
    color: "bg-secondary/10 text-secondary",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">How It Works</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Four Simple Steps
          </h2>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden md:block absolute top-16 left-[10%] right-[10%] h-0.5 bg-border" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="text-center relative"
              >
                <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mx-auto mb-5 relative z-10`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
