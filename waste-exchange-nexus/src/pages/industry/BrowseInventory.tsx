import { useState, useMemo } from "react";
import { useData } from "@/context/DataContext";
import { WasteType, WasteItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

const wasteTypes: WasteType[] = ["Plastic", "Paper", "Metal", "E-waste", "Glass"];

import { useAuth } from "@/context/AuthContext";

export default function BrowseInventory() {
  const { inventory, placeOrder, loading } = useData();
  const { role } = useAuth();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [maxPrice, setMaxPrice] = useState<string>("");
  const [orderQty, setOrderQty] = useState<Record<string, number>>({});
  const [sortBy, setSortBy] = useState<string>("none");

  const filtered = useMemo(() => {
    let result = inventory.filter((i) => {
      if (typeFilter !== "all" && i.type !== typeFilter) return false;
      if (locationFilter && !i.location.toLowerCase().includes(locationFilter.toLowerCase())) return false;
      if (maxPrice && (i.pricePerUnit || (i as any).price || 0) > Number(maxPrice)) return false;
      return true;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => (a.pricePerUnit || (a as any).price || 0) - (b.pricePerUnit || (b as any).price || 0));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.pricePerUnit || (b as any).price || 0) - (a.pricePerUnit || (a as any).price || 0));
    } else if (sortBy === "qty-high") {
      result.sort((a, b) => b.quantity - a.quantity);
    }

    return result;
  }, [inventory, typeFilter, locationFilter, maxPrice, sortBy]);

  const handleOrder = async (item: any) => {
    const lots = orderQty[item.id] || 1;
    
    if (lots <= 0) {
      toast.error("Please select at least one lot");
      return;
    }

    if (lots > item.totalLotsAvailable) {
      toast.error(`Cannot order more than available lots (${item.totalLotsAvailable})`);
      return;
    }

    try {
      await placeOrder(item, lots);
      toast.success("Order placed successfully!");
      setOrderQty(prev => {
        const next = { ...prev };
        delete next[item.id];
        return next;
      });
    } catch (error: any) {
      toast.error("Failed to place order: " + error.message);
    }
  };

  const updateLots = (id: string, delta: number, max: number) => {
    setOrderQty(prev => {
      const current = prev[id] || 1;
      const next = Math.max(1, Math.min(max, current + delta));
      return { ...prev, [id]: next };
    });
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-muted-foreground">Loading listings...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground">Browse Waste Inventory</h2>
        <p className="text-sm text-muted-foreground">Find and order recycled materials in lots</p>
      </div>

      <Card className="p-4 mb-6">
        <div className="flex flex-wrap gap-4 items-end">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Waste Type</label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {wasteTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">City/Location</label>
            <Input placeholder="Search city..." value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} className="w-[160px]" />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground">Sort By</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Default</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Lot Size</TableHead>
              <TableHead>Price / Lot</TableHead>
              <TableHead>Available Lots</TableHead>
              <TableHead>Location</TableHead>
              {role === "business" && <TableHead className="w-32">Select Lots</TableHead>}
              {role === "business" && <TableHead>Total Price</TableHead>}
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.type}</TableCell>
                <TableCell>{item.lotSize} kg</TableCell>
                <TableCell>₹{(item.pricePerLot || 0).toLocaleString()}</TableCell>
                <TableCell>{item.totalLotsAvailable}</TableCell>
                <TableCell>{item.location}</TableCell>
                {role === "business" && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateLots(item.id, -1, item.totalLotsAvailable)} disabled={item.totalLotsAvailable <= 0}>-</Button>
                      <span className="w-6 text-center font-medium">{orderQty[item.id] || (item.totalLotsAvailable > 0 ? 1 : 0)}</span>
                      <Button variant="outline" size="icon" className="h-7 w-7" onClick={() => updateLots(item.id, 1, item.totalLotsAvailable)} disabled={item.totalLotsAvailable <= 0}>+</Button>
                    </div>
                  </TableCell>
                )}
                {role === "business" && (
                  <TableCell className="font-bold">
                    ₹{((orderQty[item.id] || (item.totalLotsAvailable > 0 ? 1 : 0)) * (item.pricePerLot || 0)).toLocaleString()}
                  </TableCell>
                )}
                <TableCell className="text-right">
                  {role === "business" && (
                    <Button size="sm" onClick={() => handleOrder(item)} disabled={item.totalLotsAvailable <= 0}>
                      <ShoppingCart className="mr-1 h-4 w-4" /> Place Order
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {filtered.length === 0 && (
              <TableRow><TableCell colSpan={8} className="text-center text-muted-foreground py-8">No listings available</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
