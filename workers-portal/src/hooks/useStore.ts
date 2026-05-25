import { useSyncExternalStore, useCallback } from "react";
import { store } from "@/data/mockData";
import { Task, Notification } from "@/types";

export function useTasks(): Task[] {
  return useSyncExternalStore(store.subscribe, store.getTasks);
}

export function useNotifications(role?: string, targetId?: string): Notification[] {
  const all = useSyncExternalStore(store.subscribe, store.getNotifications);
  if (!role) return all;
  return all.filter((n) => n.role === role && (!targetId || n.targetId === targetId));
}

export { store };
