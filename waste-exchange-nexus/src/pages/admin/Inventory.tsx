import { useState } from "react";
import { useData } from "@/context/DataContext";
import { WasteItem, WasteType } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Pencil, Trash2, Package, Loader2 } from "lucide-react";
import { toast } from "sonner";

const wasteTypes: WasteType[] = ["Plastic", "Paper", "Metal", "E-waste", "Glass"];

const emptyForm = { 
  type: "Plastic" as WasteType, 
  lotSize: 0, 
  pricePerLot: 0, 
  totalLotsAvailable: 0,
  location: "" 
};

import { useAuth } from "@/context/AuthContext";

export default function AdminInventory() {
  const { inventory, addItem, updateItem, loading } = useData();
  const { role } = useAuth();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  if (role !== "admin") return <div className="p-8 text-center text-destructive font-bold">Access Denied</div>;

  const openAdd = () => { 
    setEditingId(null); 
    setForm(emptyForm); 
    setDialogOpen(true); 
  };

  const openEdit = (item: WasteItem | any) => {
    setEditingId(item.id);
    setForm({ 
      type: item.type, 
      lotSize: item.lotSize || 0, 
      pricePerLot: item.pricePerLot || 0, 
      totalLotsAvailable: item.totalLotsAvailable || 0,
      location: item.location 
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    if (!form.location || form.lotSize <= 0 || form.pricePerLot <= 0 || form.totalLotsAvailable <= 0) {
      toast.error("Please fill all fields correctly");
      return;
    }

    try {
      if (editingId) {
        await updateItem(editingId, form);
        toast.success("Item updated");
      } else {
        await addItem(form);
        toast.success("Item added");
      }
      setDialogOpen(false);
    } catch (error: any) {
      toast.error("Error saving listing");
    }
  };

  const statusColor = (s: string) => {
    if (s === "Available") return "bg-primary/10 text-primary border-primary/20";
    if (s === "Reserved") return "bg-warning/10 text-warning border-warning/20";
    return "bg-muted text-muted-foreground";
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-2" />
        <p className="text-muted-foreground">Loading inventory...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Waste Inventory</h2>
          <p className="text-sm text-muted-foreground">Manage available waste lots</p>
        </div>
        <Button onClick={openAdd}><Plus className="mr-2 h-4 w-4" /> Add New Listing</Button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-6">
        {(["Available", "Reserved", "Sold"] as const).map((s) => (
          <Card key={s}>
            <CardContent className="p-4 flex items-center gap-3">
              <Package className="h-8 w-8 text-muted-foreground" />
              <div>
                <div className="text-2xl font-bold text-foreground">{inventory.filter((i) => i.status === s).length}</div>
                <div className="text-sm text-muted-foreground">{s}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Lot Size</TableHead>
              <TableHead>Price / Lot</TableHead>
              <TableHead>Available Lots</TableHead>
              <TableHead>Location</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventory.map((item: any) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.type}</TableCell>
                <TableCell>{item.lotSize} kg</TableCell>
                <TableCell>₹{(item.pricePerLot || 0).toLocaleString()}</TableCell>
                <TableCell>{item.totalLotsAvailable}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell><Badge className={statusColor(item.status)}>{item.status}</Badge></TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => openEdit(item)}><Pencil className="h-4 w-4" /></Button>
                </TableCell>
              </TableRow>
            ))}
            {inventory.length === 0 && (
              <TableRow><TableCell colSpan={7} className="text-center text-muted-foreground py-8">No inventory listings found</TableCell></TableRow>
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Listing" : "Add New Listing"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Waste Type</Label>
              <Select value={form.type} onValueChange={(v) => setForm((f) => ({ ...f, type: v as WasteType }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>{wasteTypes.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Lot Size (kg)</Label>
                <Input type="number" value={form.lotSize} onChange={(e) => setForm((f) => ({ ...f, lotSize: Number(e.target.value) }))} />
              </div>
              <div className="space-y-2">
                <Label>Price per Lot (₹)</Label>
                <Input type="number" value={form.pricePerLot} onChange={(e) => setForm((f) => ({ ...f, pricePerLot: Number(e.target.value) }))} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Total Lots Available</Label>
                <Input type="number" value={form.totalLotsAvailable} onChange={(e) => setForm((f) => ({ ...f, totalLotsAvailable: Number(e.target.value) }))} />
              </div>
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={form.location} onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))} placeholder="e.g. Ward 5, Mumbai" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>{editingId ? "Update" : "Add"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
