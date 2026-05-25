import React, { useEffect, useState } from "react";
import { db } from "../lib/firebase";
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShieldAlert, CheckCircle, Clock } from "lucide-react";
import { toast } from "sonner";

interface Complaint {
  id: string;
  description: string;
  imageURL: string;
  status: "pending" | "ongoing" | "completed";
  timestamp: any;
  userId?: string;
}

const AdminPortal = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Fetch all complaints without filtering by userId
    const q = query(
      collection(db, "complaints"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const docs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Complaint[];
      setComplaints(docs);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Query Error:", error);
      toast.error("Failed to fetch complaints");
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const updateStatus = async (complaintId: string, newStatus: "ongoing" | "completed") => {
    try {
      const complaintRef = doc(db, "complaints", complaintId);
      await updateDoc(complaintRef, {
        status: newStatus
      });
      toast.success(`Complaint marked as ${newStatus}`);
    } catch (error: any) {
      console.error("Error updating status:", error);
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="text-center py-8 mt-20">Loading citizen complaints...</div>;

  return (
    <div className="container mx-auto px-4 py-8 mt-16 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <ShieldAlert className="h-8 w-8 text-primary" />
          Admin Portal
        </h1>
        <p className="text-muted-foreground mt-2">Manage and update citizen complaints here.</p>
      </div>

      <Card className="border-border shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl font-bold">All Citizen Complaints</CardTitle>
        </CardHeader>
        <CardContent>
          {complaints.length === 0 ? (
            <p className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
              No complaints found in the system.
            </p>
          ) : (
            <div className="space-y-4">
              {complaints.map((c) => (
                <div key={c.id} className="flex flex-col md:flex-row gap-4 p-4 rounded-xl border border-border bg-card shadow-sm">
                  <div className="w-full md:w-32 h-32 rounded-lg overflow-hidden shrink-0 border-2 border-muted bg-muted flex items-center justify-center">
                    {c.imageURL ? (
                      <img src={c.imageURL} alt="Issue" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-[10px] text-muted-foreground font-bold">NO IMAGE</span>
                    )}
                  </div>
                  
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <p className="text-base font-medium text-foreground mb-2">
                        {c.description}
                      </p>
                      <p className="text-xs text-muted-foreground mb-3">
                        Reported: {c.timestamp?.toDate() ? new Date(c.timestamp.toDate()).toLocaleString() : "Real-time sync..."}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 mr-4">
                        <span className="text-xs font-bold uppercase text-muted-foreground">Status:</span>
                        <Badge 
                          className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border-none ${
                            c.status === "pending" ? "bg-orange-600 text-white" : 
                            c.status === "ongoing" ? "bg-blue-600 text-white" : 
                            "bg-green-600 text-white"
                          }`}
                        >
                          {c.status || "PENDING"}
                        </Badge>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        {c.status === "pending" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 border-blue-200"
                            onClick={() => updateStatus(c.id, "ongoing")}
                          >
                            <Clock className="w-4 h-4 mr-1" />
                            Mark Working
                          </Button>
                        )}
                        {c.status !== "completed" && (
                          <Button 
                            size="sm" 
                            variant="outline"
                            className="bg-green-50 text-green-700 hover:bg-green-100 border-green-200"
                            onClick={() => updateStatus(c.id, "completed")}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Mark Completed
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPortal;
