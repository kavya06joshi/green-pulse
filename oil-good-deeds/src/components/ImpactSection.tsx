import { motion } from "framer-motion";
import { Leaf, Heart, Users, Fuel } from "lucide-react";

const impacts = [
  { icon: Leaf, value: "12K tons", label: "CO₂ Emissions Prevented", color: "text-primary" },
  { icon: Heart, value: "5M+", label: "People Protected from Reused Oil", color: "text-destructive" },
  { icon: Users, value: "800+", label: "Communities Engaged", color: "text-secondary" },
  { icon: Fuel, value: "25K L", label: "Biodiesel Produced Monthly", color: "text-primary" },
];

const ImpactSection = () => {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-sm font-medium text-primary uppercase tracking-wider">Our Impact</span>
          <h2 className="font-display text-4xl md:text-5xl font-bold mt-3 text-foreground">
            Making India <span className="text-gradient-primary">Cleaner</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {impacts.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
                <item.icon className={`w-6 h-6 ${item.color}`} />
              </div>
              <div className="font-display text-2xl md:text-3xl font-bold text-foreground">{item.value}</div>
              <div className="text-sm text-muted-foreground mt-1">{item.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
