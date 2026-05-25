import { useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Users, HardHat } from "lucide-react";

const roles = [
  {
    key: "admin",
    title: "Admin",
    subtitle: "Municipality Officer",
    description: "Create tasks, assign team leaders, track completion",
    icon: Shield,
    path: "/admin",
    color: "bg-primary text-primary-foreground",
  },
  {
    key: "leader",
    title: "Team Leader",
    subtitle: "Field Supervisor",
    description: "Receive tasks, assign workers, monitor progress",
    icon: Users,
    path: "/leader/tl1",
    color: "bg-secondary text-secondary-foreground",
  },
  {
    key: "worker",
    title: "Worker",
    subtitle: "Sanitation Staff",
    description: "View tasks, mark as seen and completed",
    icon: HardHat,
    path: "/worker/w1",
    color: "bg-success text-success-foreground",
  },
];

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-2">
            🏛️ Municipal Corporation
          </div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            Sanitation Task Manager
          </h1>
          <p className="text-muted-foreground">
            Select your role to continue
          </p>
        </div>

        <div className="space-y-3">
          {roles.map((role) => (
            <Card
              key={role.key}
              className="cursor-pointer hover:shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
              onClick={() => navigate(role.path)}
            >
              <CardHeader className="flex-row items-center gap-4 p-5">
                <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${role.color}`}>
                  <role.icon className="h-7 w-7" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mt-0.5">
                    {role.subtitle}
                  </p>
                  <CardDescription className="mt-1">{role.description}</CardDescription>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Prototype Mode — No login required
        </p>
      </div>
    </div>
  );
};

export default Index;
