import { useData } from "@/context/DataContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { CheckCircle, XCircle } from "lucide-react";
import { toast } from "sonner";

import { useAuth } from "@/context/AuthContext";

export default function AdminOrders() {
  const { allOrders, updateOrderStatus } = useData();
  const { role } = useAuth();

  if (role !== "admin") return <div className="p-8 text-center text-destructive font-bold">Access Denied</div>;

  const statusColor = (s: string) => {
    if (s === "accepted") return "bg-green-500/10 text-green-500 border-green-500/20";
    if (s === "rejected") return "bg-red-500/10 text-red-500 border-red-500/20";
    if (s === "placed") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    return "bg-muted text-muted-foreground";
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  const handleAction = async (order: any, status: "accepted" | "rejected") => {
    try {
      await updateOrderStatus(order.id, status, order);
      toast.success(`Order ${status}`);
    } catch (error: any) {
      toast.error("Failed to update order");
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Incoming Orders</h2>
        <p className="text-sm text-muted-foreground">Review and manage industry orders in real-time</p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Industry</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Lots Ordered</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allOrders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-medium">
                  <div>{o.companyName}</div>
                  <div className="text-xs text-muted-foreground font-mono">{o.userId}</div>
                </TableCell>
                <TableCell>{o.wasteType}</TableCell>
                <TableCell>{o.lotsOrdered} lots</TableCell>
                <TableCell>₹{(o.totalPrice || 0).toLocaleString()}</TableCell>
                <TableCell><Badge className={statusColor(o.status)} variant="outline">{o.status}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(o.timestamp)}</TableCell>
                <TableCell className="text-right">
                  {o.status === "placed" && (
                    <div className="flex justify-end gap-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-green-500 hover:text-green-600"
                      onClick={() => handleAction(o, "accepted")}
                    >
                      <CheckCircle className="mr-1 h-4 w-4" /> Accept
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="text-red-500 hover:text-red-600"
                      onClick={() => handleAction(o, "rejected")}
                    >
                      <XCircle className="mr-1 h-4 w-4" /> Reject
                    </Button>
                  </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {allOrders.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No orders yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
