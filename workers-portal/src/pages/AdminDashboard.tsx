import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTasks, store } from "@/hooks/useStore";
import { teamLeaders } from "@/data/mockData";
import { TaskType, TaskPriority } from "@/types";
import { NotificationBell } from "@/components/NotificationBell";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, ClipboardList, CheckCircle2, Clock, Users, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const taskTypes: TaskType[] = ["Street Cleaning", "Waste Collection", "Emergency Cleanup", "Illegal Dump", "Drain Cleaning"];

const statusColor: Record<string, string> = {
  Assigned: "bg-warning/15 text-warning-foreground border-warning/30",
  "In Progress": "bg-primary/15 text-primary border-primary/30",
  Completed: "bg-success/15 text-success border-success/30",
};

export default function AdminDashboard() {
  const navigate = useNavigate();
  const tasks = useTasks();
  const [type, setType] = useState<TaskType>("Street Cleaning");
  const [ward, setWard] = useState("");
  const [location, setLocation] = useState("");
  const [leaderId, setLeaderId] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("Normal");

  const active = tasks.filter((t) => t.status !== "Completed").length;
  const completed = tasks.filter((t) => t.status === "Completed").length;
  const pending = tasks.filter((t) => t.status === "Assigned").length;
  const teamsWorking = new Set(tasks.filter((t) => t.status === "In Progress").map((t) => t.teamLeaderId)).size;

  const stats = [
    { label: "Active", value: active, icon: ClipboardList, color: "text-primary" },
    { label: "Completed", value: completed, icon: CheckCircle2, color: "text-success" },
    { label: "Pending", value: pending, icon: Clock, color: "text-warning" },
    { label: "Teams", value: teamsWorking, icon: Users, color: "text-secondary" },
  ];

  const handleCreate = () => {
    if (!ward || !location || !leaderId) {
      toast({ title: "Missing fields", description: "Please fill all fields", variant: "destructive" });
      return;
    }
    store.createTask(type, ward, location, leaderId, priority);
    toast({ title: "Task Created", description: `${type} assigned to ${teamLeaders.find((l) => l.id === leaderId)?.name}` });
    setWard("");
    setLocation("");
    setLeaderId("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-md">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-1 hover:opacity-80"><ArrowLeft className="h-5 w-5" /></button>
            <div>
              <h1 className="font-bold text-lg">Admin Dashboard</h1>
              <p className="text-xs opacity-80">Municipality Officer</p>
            </div>
          </div>
          <NotificationBell role="admin" targetId="admin" />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-5">
        {/* Stats */}
        <div className="grid grid-cols-4 gap-2">
          {stats.map((s) => (
            <Card key={s.label} className="text-center p-3">
              <s.icon className={`h-5 w-5 mx-auto ${s.color}`} />
              <p className="text-2xl font-bold text-card-foreground mt-1">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </Card>
          ))}
        </div>

        {/* Create Task */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-base">
              <Plus className="h-4 w-4" /> Create New Task
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Select value={type} onValueChange={(v) => setType(v as TaskType)}>
              <SelectTrigger><SelectValue placeholder="Task Type" /></SelectTrigger>
              <SelectContent>
                {taskTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Ward (e.g. Ward 2)" value={ward} onChange={(e) => setWard(e.target.value)} />
              <Input placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <Select value={leaderId} onValueChange={setLeaderId}>
              <SelectTrigger><SelectValue placeholder="Assign Team Leader" /></SelectTrigger>
              <SelectContent>
                {teamLeaders.map((l) => <SelectItem key={l.id} value={l.id}>{l.name}</SelectItem>)}
              </SelectContent>
            </Select>

            <div className="flex gap-2">
              <Button
                variant={priority === "Normal" ? "default" : "outline"}
                size="sm"
                onClick={() => setPriority("Normal")}
                className="flex-1"
              >Normal</Button>
              <Button
                variant={priority === "Urgent" ? "destructive" : "outline"}
                size="sm"
                onClick={() => setPriority("Urgent")}
                className="flex-1"
              >🚨 Urgent</Button>
            </div>

            <Button className="w-full" onClick={handleCreate}>Assign Task</Button>
          </CardContent>
        </Card>

        {/* Task List */}
        <div className="space-y-2">
          <h2 className="font-semibold text-foreground">All Tasks</h2>
          {tasks.map((task) => (
            <Card key={task.id} className={`${task.priority === "Urgent" ? "border-urgent/40" : ""}`}>
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-card-foreground">{task.type}</h3>
                      {task.priority === "Urgent" && <Badge className="bg-urgent text-urgent-foreground text-xs">Urgent</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {task.ward} — {task.location}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Leader: {teamLeaders.find((l) => l.id === task.teamLeaderId)?.name}
                    </p>
                  </div>
                  <Badge variant="outline" className={statusColor[task.status]}>
                    {task.status}
                  </Badge>
                </div>
                {task.subTasks.length > 0 && (
                  <div className="mt-3 pt-2 border-t">
                    <p className="text-xs text-muted-foreground mb-1">
                      Sub-tasks: {task.subTasks.filter((s) => s.status === "Completed").length}/{task.subTasks.length} done
                    </p>
                    <div className="w-full bg-muted rounded-full h-1.5">
                      <div
                        className="bg-success h-1.5 rounded-full transition-all"
                        style={{ width: `${(task.subTasks.filter((s) => s.status === "Completed").length / task.subTasks.length) * 100}%` }}
                      />
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
