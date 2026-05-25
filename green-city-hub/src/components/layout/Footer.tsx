import { Leaf } from "lucide-react";

const Footer = () => (
  <footer className="border-t bg-card mt-auto">
    <div className="container mx-auto px-4 py-8 lg:px-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Leaf className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-foreground">Eco City Portal v2.0</span>
        </div>
        <p className="text-xs text-muted-foreground text-center">
          © 2026 Smart City Municipal Corporation. Building a cleaner, greener future together.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
