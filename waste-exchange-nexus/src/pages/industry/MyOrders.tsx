import { useData } from "@/context/DataContext";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MyOrders() {
  const { orders, loading } = useData();

  const statusColor = (s: string) => {
    if (s === "placed") return "bg-yellow-500/10 text-yellow-500 border-yellow-500/20";
    if (s === "accepted") return "bg-green-500/10 text-green-500 border-green-500/20";
    if (s === "rejected") return "bg-red-500/10 text-red-500 border-red-500/20";
    return "bg-muted text-muted-foreground text-xs";
  };

  const formatDate = (timestamp: any) => {
    if (!timestamp) return "N/A";
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-muted-foreground">
        Loading orders...
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">My Orders</h2>
        <p className="text-sm text-muted-foreground">Track your order history and status in real-time</p>
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Waste Type</TableHead>
              <TableHead>Lots Ordered</TableHead>
              <TableHead>Total Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date & Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((o) => (
              <TableRow key={o.id}>
                <TableCell className="font-mono text-xs">{o.id}</TableCell>
                <TableCell className="font-medium">{o.wasteType}</TableCell>
                <TableCell>{o.lotsOrdered} lots</TableCell>
                <TableCell>₹{(o.totalPrice || 0).toLocaleString()}</TableCell>
                <TableCell><Badge className={statusColor(o.status)} variant="outline">{o.status}</Badge></TableCell>
                <TableCell className="text-sm text-muted-foreground">{formatDate(o.timestamp)}</TableCell>
              </TableRow>
            ))}
            {orders.length === 0 && (
              <TableRow><TableCell colSpan={6} className="text-center text-muted-foreground py-8">No orders placed yet</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
