import React, { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, query, where, orderBy, onSnapshot } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ListChecks } from "lucide-react";

interface Complaint {
  id: string;
  description: string;
  imageURL: string;
  status: "pending" | "ongoing" | "completed";
  timestamp: any;
}

const ComplaintList = () => {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    const q = query(
      collection(db, "complaints"),
      where("userId", "==", user.uid),
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
      toast.error("Query failed: " + error.message);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  if (loading) return <div className="text-center py-8">Loading your reports...</div>;

  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl flex items-center gap-2 font-bold">
          <ListChecks className="h-5 w-5 text-primary" />
          Track My Complaints
        </CardTitle>
      </CardHeader>
      <CardContent>
        {complaints.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground bg-muted/20 rounded-xl border border-dashed">
            No complaints reported yet. Your active reports will appear here.
          </p>
        ) : (
          <div className="space-y-4">
            {complaints.map((c) => (
              <div key={c.id} className="flex gap-4 p-4 rounded-xl border border-border bg-card shadow-sm hover:shadow-md transition-all duration-300">
                <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 border-2 border-muted bg-muted flex items-center justify-center">
                  {c.imageURL ? (
                    <img src={c.imageURL} alt="Issue" className="w-full h-full object-cover" />
                  ) : (
                    <span className="text-[10px] text-muted-foreground font-bold">IMAGE MISSING</span>
                  )}
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <div className="flex justify-between items-start mb-1">
                      <p className="text-sm font-bold text-foreground line-clamp-2 leading-tight">
                        {c.description}
                      </p>
                    </div>
                    <p className="text-[11px] text-muted-foreground font-medium">
                      Reported: {c.timestamp?.toDate() ? new Date(c.timestamp.toDate()).toLocaleString() : "Real-time sync..."}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-3 mt-2">
                    <span className="text-[10px] font-black uppercase text-muted-foreground tracking-tighter">Current Status</span>
                    <Badge 
                      className={`px-3 py-1 text-[11px] font-black uppercase tracking-wider rounded-full border-none ${
                        c.status === "pending" ? "bg-orange-600 text-white" : 
                        c.status === "ongoing" ? "bg-blue-600 text-white" : 
                        "bg-green-600 text-white"
                      }`}
                    >
                      {c.status || "PENDING"}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ComplaintList;
