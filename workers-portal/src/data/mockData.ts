import { Task, TeamLeader, Worker, Notification, SubTask, TaskType, TaskPriority } from "@/types";

export const teamLeaders: TeamLeader[] = [
  { id: "tl1", name: "Ramesh Kumar" },
  { id: "tl2", name: "Suresh Patel" },
  { id: "tl3", name: "Anil Sharma" },
];

export const workers: Worker[] = [
  { id: "w1", name: "Raju", teamLeaderId: "tl1" },
  { id: "w2", name: "Mohan", teamLeaderId: "tl1" },
  { id: "w3", name: "Kiran", teamLeaderId: "tl1" },
  { id: "w4", name: "Deepak", teamLeaderId: "tl2" },
  { id: "w5", name: "Sunil", teamLeaderId: "tl2" },
  { id: "w6", name: "Ganesh", teamLeaderId: "tl2" },
  { id: "w7", name: "Vijay", teamLeaderId: "tl3" },
  { id: "w8", name: "Prakash", teamLeaderId: "tl3" },
  { id: "w9", name: "Manoj", teamLeaderId: "tl3" },
];

let taskIdCounter = 4;
let subTaskIdCounter = 10;
let notifIdCounter = 3;

const initialTasks: Task[] = [
  {
    id: "t1",
    type: "Street Cleaning",
    location: "Patel Street",
    ward: "Ward 2",
    teamLeaderId: "tl1",
    priority: "Normal",
    status: "In Progress",
    createdAt: new Date(Date.now() - 3600000),
    subTasks: [
      { id: "st1", taskId: "t1", description: "Sweep street", workerId: "w1", status: "Seen", seenAt: new Date() },
      { id: "st2", taskId: "t1", description: "Collect waste bags", workerId: "w2", status: "Pending" },
      { id: "st3", taskId: "t1", description: "Load tractor", workerId: "w3", status: "Pending" },
    ],
  },
  {
    id: "t2",
    type: "Waste Collection",
    location: "Main Road",
    ward: "Ward 3",
    teamLeaderId: "tl2",
    priority: "Normal",
    status: "Assigned",
    createdAt: new Date(Date.now() - 7200000),
    subTasks: [],
  },
  {
    id: "t3",
    type: "Emergency Cleanup",
    location: "Gandhi Chowk",
    ward: "Ward 1",
    teamLeaderId: "tl1",
    priority: "Urgent",
    status: "Completed",
    createdAt: new Date(Date.now() - 86400000),
    completedAt: new Date(Date.now() - 43200000),
    subTasks: [
      { id: "st4", taskId: "t3", description: "Remove dead animal", workerId: "w1", status: "Completed", seenAt: new Date(), completedAt: new Date() },
    ],
  },
];

const initialNotifications: Notification[] = [
  { id: "n1", message: "New task: Street Cleaning at Patel Street", role: "leader", targetId: "tl1", read: false, createdAt: new Date(Date.now() - 3600000), taskId: "t1" },
  { id: "n2", message: "New task: Waste Collection at Main Road", role: "leader", targetId: "tl2", read: false, createdAt: new Date(Date.now() - 7200000), taskId: "t2" },
];

// In-memory reactive store
let tasks = [...initialTasks];
let notifications = [...initialNotifications];
let listeners: (() => void)[] = [];

function notify() {
  listeners.forEach((fn) => fn());
}

export const store = {
  subscribe(fn: () => void) {
    listeners.push(fn);
    return () => { listeners = listeners.filter((l) => l !== fn); };
  },

  getTasks: () => tasks,
  getNotifications: () => notifications,

  createTask(type: TaskType, ward: string, location: string, teamLeaderId: string, priority: TaskPriority): Task {
    const id = `t${taskIdCounter++}`;
    const task: Task = {
      id, type, location, ward, teamLeaderId, priority,
      status: "Assigned",
      createdAt: new Date(),
      subTasks: [],
    };
    tasks = [task, ...tasks];
    const notif: Notification = {
      id: `n${notifIdCounter++}`,
      message: `New task: ${type} at ${location}`,
      role: "leader",
      targetId: teamLeaderId,
      read: false,
      createdAt: new Date(),
      taskId: id,
    };
    notifications = [notif, ...notifications];
    notify();
    return task;
  },

  assignSubTask(taskId: string, workerId: string, description: string): SubTask {
    const stId = `st${subTaskIdCounter++}`;
    const subTask: SubTask = { id: stId, taskId, description, workerId, status: "Pending" };
    tasks = tasks.map((t) => {
      if (t.id === taskId) {
        const updated = { ...t, subTasks: [...t.subTasks, subTask], status: "In Progress" as const };
        return updated;
      }
      return t;
    });
    const workerObj = workers.find((w) => w.id === workerId);
    const taskObj = tasks.find((t) => t.id === taskId);
    const notif: Notification = {
      id: `n${notifIdCounter++}`,
      message: `Task assigned: ${description} at ${taskObj?.location || ""}`,
      role: "worker",
      targetId: workerId,
      read: false,
      createdAt: new Date(),
      taskId,
    };
    notifications = [notif, ...notifications];
    notify();
    return subTask;
  },

  markSubTaskSeen(subTaskId: string) {
    tasks = tasks.map((t) => ({
      ...t,
      subTasks: t.subTasks.map((st) =>
        st.id === subTaskId ? { ...st, status: "Seen" as const, seenAt: new Date() } : st
      ),
    }));
    notify();
  },

  markSubTaskCompleted(subTaskId: string) {
    tasks = tasks.map((t) => {
      const updatedSubs = t.subTasks.map((st) =>
        st.id === subTaskId ? { ...st, status: "Completed" as const, completedAt: new Date() } : st
      );
      const allDone = updatedSubs.length > 0 && updatedSubs.every((st) => st.status === "Completed");
      return {
        ...t,
        subTasks: updatedSubs,
        status: allDone ? ("Completed" as const) : t.status,
        completedAt: allDone ? new Date() : t.completedAt,
      };
    });

    // Find the task and notify leader
    const task = tasks.find((t) => t.subTasks.some((st) => st.id === subTaskId));
    if (task) {
      const sub = task.subTasks.find((st) => st.id === subTaskId);
      const worker = workers.find((w) => w.id === sub?.workerId);
      notifications = [{
        id: `n${notifIdCounter++}`,
        message: `${worker?.name || "Worker"} completed: ${sub?.description || "task"}`,
        role: "leader",
        targetId: task.teamLeaderId,
        read: false,
        createdAt: new Date(),
        taskId: task.id,
      }, ...notifications];

      if (task.status === "Completed") {
        notifications = [{
          id: `n${notifIdCounter++}`,
          message: `Task completed: ${task.type} at ${task.location}`,
          role: "admin",
          targetId: "admin",
          read: false,
          createdAt: new Date(),
          taskId: task.id,
        }, ...notifications];
      }
    }
    notify();
  },

  markNotificationRead(notifId: string) {
    notifications = notifications.map((n) => n.id === notifId ? { ...n, read: true } : n);
    notify();
  },
};
