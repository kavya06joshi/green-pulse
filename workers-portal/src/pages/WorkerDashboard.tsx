import { useNavigate, useParams } from "react-router-dom";
import { useTasks, store } from "@/hooks/useStore";
import { workers, teamLeaders } from "@/data/mockData";
import { NotificationBell } from "@/components/NotificationBell";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Eye, CheckCircle2, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function WorkerDashboard() {
  const { workerId = "w1" } = useParams();
  const navigate = useNavigate();
  const tasks = useTasks();
  const worker = workers.find((w) => w.id === workerId);
  const leader = teamLeaders.find((l) => l.id === worker?.teamLeaderId);

  // Get all sub-tasks for this worker
  const mySubTasks = tasks.flatMap((t) =>
    t.subTasks
      .filter((st) => st.workerId === workerId)
      .map((st) => ({ ...st, task: t }))
  );

  const handleSeen = (subTaskId: string) => {
    store.markSubTaskSeen(subTaskId);
    toast({ title: "✅ Marked as Seen" });
  };

  const handleCompleted = (subTaskId: string) => {
    store.markSubTaskCompleted(subTaskId);
    toast({ title: "✅ Task Completed!" });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-success text-success-foreground shadow-md">
        <div className="flex items-center justify-between px-4 py-3 max-w-2xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate("/")} className="p-1 hover:opacity-80"><ArrowLeft className="h-5 w-5" /></button>
            <div>
              <h1 className="font-bold text-lg">{worker?.name || "Worker"}</h1>
              <p className="text-xs opacity-80">Team: {leader?.name}</p>
            </div>
          </div>
          <NotificationBell role="worker" targetId={workerId} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto p-4 space-y-4">
        <h2 className="font-semibold text-lg text-foreground">Today's Tasks</h2>

        {mySubTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <p className="text-muted-foreground text-lg">No tasks assigned yet</p>
              <p className="text-sm text-muted-foreground mt-1">Your team leader will assign tasks soon</p>
            </CardContent>
          </Card>
        ) : (
          mySubTasks.map((st) => (
            <Card key={st.id} className="overflow-hidden">
              <CardContent className="p-0">
                {/* Task info */}
                <div className="p-5">
                  <h3 className="text-xl font-bold text-card-foreground">{st.description}</h3>
                  <div className="flex items-center gap-1.5 mt-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{st.task.ward} — {st.task.location}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Assigned by: {leader?.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Type: {st.task.type}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="border-t p-4">
                  {st.status === "Pending" && (
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full h-14 text-lg border-success text-success hover:bg-success hover:text-success-foreground"
                      onClick={() => handleSeen(st.id)}
                    >
                      <Eye className="h-6 w-6 mr-2" />
                      Seen
                    </Button>
                  )}
                  {st.status === "Seen" && (
                    <Button
                      size="lg"
                      className="w-full h-14 text-lg bg-success text-success-foreground hover:bg-success/90"
                      onClick={() => handleCompleted(st.id)}
                    >
                      <CheckCircle2 className="h-6 w-6 mr-2" />
                      Completed
                    </Button>
                  )}
                  {st.status === "Completed" && (
                    <div className="flex items-center justify-center gap-2 h-14 text-success font-semibold text-lg">
                      <CheckCircle2 className="h-6 w-6" />
                      Done
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </main>
    </div>
  );
}
