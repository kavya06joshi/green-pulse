import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTasks, store } from "@/hooks/useStore";
import { teamLeaders, workers } from "@/data/mockData";
import { NotificationBell } from "@/components/NotificationBell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ChevronDown, ChevronUp, UserPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const statusColor: Record<string, string> = {
  Assigned: "bg-warning/15 text-warning-foreground border-warning/30",
  "In Progress": "bg-primary/15 text-primary border-primary/30",
  Completed: "bg-success/15 text-success border-success/30",
};

const subStatusColor: Record<string, string> = {
  Pending: "text-muted-foreground",
  Seen: "text-primary",
  Completed: "text-success",
};

export default function TeamLeaderDashboard() {
  const { leaderId = "tl1" } = useParams();
  const navigate = useNavigate();
  const allTasks = useTasks();
  const tasks = allTasks.filter((t) => t.teamLeaderId === leaderId);
  const leader = teamLeaders.find((l) => l.id === leaderId);
  const teamWorkers = workers.filter((w) => w.teamLeaderId === leaderId);

  const [expandedTask, setExpandedTask] = useState<string | null>(null);
  const [subTaskDesc, setSubTaskDesc] = useState("");
  const [selectedWorker, setSelectedWorker] = useState("");

  const handleAssign = (taskId: string) => {
    if (!subTaskDesc || !selectedWorker) {
      toast({ title: "Fill all fields", variant: "destructive" });
      return;
    }
    store.assignSubTask(taskId, selectedWorker, subTaskDesc);
    toast({ title: "Worker assigned", description: `${workers.find((w) => w.id === selectedWorker)?.name}: ${subTaskDesc}` });
    setSubTaskDesc("");
    setSelectedWorker("");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-secondary text-secondary-foreground shadow-md">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-1 hover:opacity-80"><ArrowLeft className="h-5 w-5" /></button>
            <div>
              <h1 className="font-bold text-lg">Team Leader</h1>
              <p className="text-xs opacity-80">{leader?.name}</p>
            </div>
          </div>
          <NotificationBell role="leader" targetId={leaderId} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground">My Tasks ({tasks.length})</h2>
          <Badge variant="outline">{teamWorkers.length} workers</Badge>
        </div>

        {tasks.map((task) => {
          const isExpanded = expandedTask === task.id;
          return (
            <Card key={task.id} className={task.priority === "Urgent" ? "border-urgent/40" : ""}>
              <CardContent className="p-4">
                <div
                  className="flex items-start justify-between cursor-pointer"
                  onClick={() => setExpandedTask(isExpanded ? null : task.id)}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-card-foreground">{task.type}</h3>
                      {task.priority === "Urgent" && <Badge className="bg-urgent text-urgent-foreground text-xs">Urgent</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground">{task.ward} — {task.location}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={statusColor[task.status]}>{task.status}</Badge>
                    {isExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
                  </div>
                </div>

                {isExpanded && (
                  <div className="mt-4 pt-3 border-t space-y-3">
                    {/* Existing sub-tasks */}
                    {task.subTasks.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground uppercase">Assigned Workers</p>
                        {task.subTasks.map((st) => (
                          <div key={st.id} className="flex items-center justify-between bg-muted/50 rounded-lg p-2.5">
                            <div>
                              <p className="text-sm font-medium text-card-foreground">{st.description}</p>
                              <p className="text-xs text-muted-foreground">{workers.find((w) => w.id === st.workerId)?.name}</p>
                            </div>
                            <Badge variant="outline" className={subStatusColor[st.status]}>{st.status}</Badge>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Assign new worker */}
                    {task.status !== "Completed" && (
                      <div className="space-y-2 bg-muted/30 rounded-lg p-3">
                        <p className="text-xs font-medium text-muted-foreground uppercase flex items-center gap-1">
                          <UserPlus className="h-3 w-3" /> Assign Worker
                        </p>
                        <Input
                          placeholder="Task description (e.g. Sweep street)"
                          value={subTaskDesc}
                          onChange={(e) => setSubTaskDesc(e.target.value)}
                        />
                        <Select value={selectedWorker} onValueChange={setSelectedWorker}>
                          <SelectTrigger><SelectValue placeholder="Select Worker" /></SelectTrigger>
                          <SelectContent>
                            {teamWorkers.map((w) => <SelectItem key={w.id} value={w.id}>{w.name}</SelectItem>)}
                          </SelectContent>
                        </Select>
                        <Button size="sm" className="w-full" onClick={() => handleAssign(task.id)}>
                          Assign
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </main>
    </div>
  );
}
