import { Bell } from "lucide-react";
import { useNotifications, store } from "@/hooks/useStore";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

interface NotificationBellProps {
  role: "admin" | "leader" | "worker";
  targetId?: string;
}

export function NotificationBell({ role, targetId }: NotificationBellProps) {
  const [open, setOpen] = useState(false);
  const notifs = useNotifications(role, targetId);
  const unreadCount = notifs.filter((n) => !n.read).length;

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Notifications"
      >
        <Bell className="h-6 w-6 text-foreground" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-urgent text-urgent-foreground text-xs font-bold">
            {unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-12 z-50 w-80 max-h-96 overflow-y-auto rounded-lg border bg-card shadow-lg">
          <div className="p-3 border-b">
            <h3 className="font-semibold text-card-foreground">Notifications</h3>
          </div>
          {notifs.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground">No notifications</p>
          ) : (
            notifs.map((n) => (
              <div
                key={n.id}
                className={`p-3 border-b last:border-0 cursor-pointer transition-colors ${
                  n.read ? "bg-card" : "bg-primary/5"
                }`}
                onClick={() => store.markNotificationRead(n.id)}
              >
                <p className={`text-sm ${n.read ? "text-muted-foreground" : "text-card-foreground font-medium"}`}>
                  {n.message}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {n.createdAt.toLocaleTimeString()}
                </p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
