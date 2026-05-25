import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Droplets, IndianRupee, Send, Clock, CheckCircle2, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, addDoc, query, where, onSnapshot, orderBy, serverTimestamp, Timestamp } from "firebase/firestore";
import { OilSubmission } from "@/types";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const RATE_PER_LITRE = 20;

const Dashboard = () => {
  const { user, userProfile } = useAuth();
  const [quantity, setQuantity] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [submissions, setSubmissions] = useState<OilSubmission[]>([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "oil_submissions"),
      where("uid", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as OilSubmission[];
      
      // Sort on client side to avoid index requirement
      const sortedData = data.sort((a, b) => {
        const timeA = a.timestamp?.seconds || 0;
        const timeB = b.timestamp?.seconds || 0;
        return timeB - timeA;
      });
      
      setSubmissions(sortedData);
    }, (error) => {
      console.error("Firestore onSnapshot error:", error);
      toast.error("Failed to sync data. Please check connection.");
    });

    return () => unsubscribe();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !userProfile) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "oil_submissions"), {
        uid: user.uid,
        userId: userProfile.userId,
        type: userProfile.role,
        quantity: parseFloat(quantity),
        note,
        status: "pending",
        timestamp: serverTimestamp()
      });
      toast.success("Submission received! We will contact you for collection.");
      setQuantity("");
      setNote("");
    } catch (error) {
      console.error("Error submitting oil:", error);
      toast.error("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const totalQuantity = submissions.reduce((acc, curr) => acc + curr.quantity, 0);
  
  const totalEarned = submissions
    .filter(sub => sub.status === "completed")
    .reduce((acc, curr) => acc + curr.quantity * RATE_PER_LITRE, 0);
    
  const pendingPayment = submissions
    .filter(sub => sub.status !== "completed")
    .reduce((acc, curr) => acc + curr.quantity * RATE_PER_LITRE, 0);

  const nextDriveInfo = userProfile?.role === "commercial" 
    ? "Collection every 3 days" 
    : "Collection every 5–6 days at fixed points";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 px-6">
        <div className="container max-w-6xl mx-auto space-y-8">
          
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">User Dashboard</h1>
              <p className="text-muted-foreground mt-1">Welcome back, {userProfile?.name}</p>
            </div>
            <Card className="bg-secondary/5 border-secondary/20 flex items-center gap-3 px-4 py-2">
              <Calendar className="w-4 h-4 text-secondary" />
              <div className="text-sm">
                <span className="text-muted-foreground">Next Drive Info: </span>
                <span className="font-semibold text-foreground">{nextDriveInfo}</span>
              </div>
            </Card>
          </header>

          <div className="grid md:grid-cols-3 gap-8">
            
            {/* Section A: Submission Form */}
            <div className="md:col-span-1">
              <Card className="border-border/50 shadow-card sticky top-24">
                <CardHeader>
                  <CardTitle className="font-display text-2xl flex items-center gap-2">
                    <Droplets className="w-5 h-5 text-secondary" /> Submit Oil
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Quantity (Litres)</label>
                      <Input
                        type="number"
                        step="0.1"
                        placeholder="e.g. 5.5"
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        required
                        className="bg-muted/30"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Optional Note</label>
                      <Textarea
                        placeholder="Any specific instructions..."
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="resize-none bg-muted/30 h-24"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-gradient-hero text-primary-foreground font-semibold shadow-lg hover:shadow-xl transition-all" disabled={loading}>
                      <Send className="w-4 h-4 mr-2" />
                      {loading ? "Submitting..." : "Submit for Collection"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Section B & C: Stats & List */}
            <div className="md:col-span-2 space-y-8">
              
              {/* Section B: User Stats */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <Card className="bg-card shadow-card border-border/50 overflow-hidden group hover:border-blue-500/30 transition-colors">
                  <div className="h-1 bg-blue-500 w-full" />
                  <CardContent className="pt-6">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Total Submitted</p>
                    <h3 className="text-2xl font-bold mt-1 group-hover:text-blue-500 transition-colors">{totalQuantity.toFixed(1)} L</h3>
                  </CardContent>
                </Card>
                <Card className="bg-card shadow-card border-border/50 overflow-hidden group hover:border-green-500/30 transition-colors">
                  <div className="h-1 bg-green-500 w-full" />
                  <CardContent className="pt-6">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-green-600/80">Earned (Paid)</p>
                    <h3 className="text-2xl font-bold mt-1 flex items-center group-hover:text-green-500 transition-colors text-green-600">
                      <IndianRupee className="w-5 h-5 mr-0.5" />
                      {totalEarned.toLocaleString()}
                    </h3>
                  </CardContent>
                </Card>
                <Card className="bg-card shadow-card border-border/50 overflow-hidden group hover:border-orange-500/30 transition-colors">
                  <div className="h-1 bg-orange-500 w-full" />
                  <CardContent className="pt-6">
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-orange-600/80">Pending Payment</p>
                    <h3 className="text-2xl font-bold mt-1 flex items-center group-hover:text-orange-500 transition-colors text-orange-600">
                      <IndianRupee className="w-5 h-5 mr-0.5" />
                      {pendingPayment.toLocaleString()}
                    </h3>
                  </CardContent>
                </Card>
              </div>

              {/* Section C: Submission List */}
              <Card className="border-border/50 shadow-card">
                <CardHeader className="border-b border-border/50 pb-4">
                  <CardTitle className="font-display text-xl flex items-center gap-2">
                    Recent Submissions
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {submissions.length === 0 ? (
                      <div className="text-center py-16 text-muted-foreground">
                        <Clock className="w-12 h-12 mx-auto mb-4 opacity-10" />
                        <p className="text-lg font-medium">No submissions yet.</p>
                        <p className="text-sm opacity-60">Your oil donations will appear here.</p>
                      </div>
                    ) : (
                      submissions.map((sub, i) => (
                        <motion.div 
                          key={sub.id} 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05 }}
                          className="flex items-center justify-between p-5 rounded-2xl border border-border/50 bg-muted/20 hover:bg-muted/40 hover:border-border transition-all"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${sub.status === 'completed' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
                              {sub.status === 'completed' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6" />}
                            </div>
                            <div>
                              <p className="font-bold text-lg">{sub.quantity} Litres</p>
                              <p className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {sub.timestamp ? (sub.timestamp as Timestamp).toDate().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : 'Processing...'}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 text-right">
                            <span className={`text-[10px] uppercase tracking-widest font-black px-3 py-1 rounded-lg ${sub.status === 'completed' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-orange-500/10 text-orange-500 border border-orange-500/20'}`}>
                              {sub.status === 'completed' ? 'Paid' : 'Pending'}
                            </span>
                            {sub.note && <p className="text-xs text-muted-foreground mt-1 truncate max-w-[200px] italic">"{sub.note}"</p>}
                          </div>
                        </motion.div>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
