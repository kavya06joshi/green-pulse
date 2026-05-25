export type TaskType = 
  | "Street Cleaning"
  | "Waste Collection"
  | "Emergency Cleanup"
  | "Illegal Dump"
  | "Drain Cleaning";

export type TaskPriority = "Normal" | "Urgent";

export type TaskStatus = "Assigned" | "In Progress" | "Completed";

export type SubTaskStatus = "Pending" | "Seen" | "Completed";

export interface TeamLeader {
  id: string;
  name: string;
}

export interface Worker {
  id: string;
  name: string;
  teamLeaderId: string;
}

export interface SubTask {
  id: string;
  taskId: string;
  description: string;
  workerId: string;
  status: SubTaskStatus;
  seenAt?: Date;
  completedAt?: Date;
}

export interface Task {
  id: string;
  type: TaskType;
  location: string;
  ward: string;
  teamLeaderId: string;
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  completedAt?: Date;
  subTasks: SubTask[];
}

export interface Notification {
  id: string;
  message: string;
  role: "admin" | "leader" | "worker";
  targetId: string; // leader or worker id
  read: boolean;
  createdAt: Date;
  taskId: string;
}

export type UserRole = "admin" | "leader" | "worker";
