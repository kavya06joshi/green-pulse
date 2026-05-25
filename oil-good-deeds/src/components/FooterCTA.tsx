import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const FooterCTA = () => {
  return (
    <section className="py-24 px-6">
      <div className="container max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-hero rounded-3xl p-12 md:p-16 text-center text-primary-foreground shadow-elevated"
        >
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Ready to Join the Movement?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-xl mx-auto mb-8">
            Register your society or commercial outlet today. Start earning rewards while making India healthier.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-card text-foreground hover:bg-card/90 text-base px-8 py-6 rounded-xl">
              Get Started <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 text-base px-8 py-6 rounded-xl">
              Contact Us
            </Button>
          </div>
        </motion.div>

        <div className="mt-16 text-center text-sm text-muted-foreground">
          <p>SUCO System — An initiative under FSSAI's RUCO Programme</p>
          <p className="mt-1">© 2026 Smart Used Cooking Oil Collection System. All rights reserved.</p>
        </div>
      </div>
    </section>
  );
};

export default FooterCTA;
