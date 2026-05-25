import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Droplets, 
  IndianRupee, 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Search, 
  Building2, 
  Users, 
  MapPin, 
  ArrowUpDown, 
  AlertCircle 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, doc, updateDoc, Timestamp } from "firebase/firestore";
import { OilSubmission, UserProfile } from "@/types";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";

const RATE_PER_LITRE = 20;

export default function AdminDashboard() {
  const { user, userProfile } = useAuth();
  const [submissions, setSubmissions] = useState<OilSubmission[]>([]);
  const [usersMap, setUsersMap] = useState<Record<string, UserProfile>>({});
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  
  // Filters and search
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState<"all" | "commercial" | "society">("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "pending" | "completed">("all");

  useEffect(() => {
    // 1. Listen to users to map uids to profiles (name, location, role)
    const unsubscribeUsers = onSnapshot(
      collection(db, "users"),
      (snapshot) => {
        const uMap: Record<string, UserProfile> = {};
        snapshot.docs.forEach((doc) => {
          uMap[doc.id] = { uid: doc.id, ...doc.data() } as UserProfile;
        });
        setUsersMap(uMap);
      },
      (error) => {
        console.error("Error fetching users:", error);
        toast.error("Failed to load user profiles.");
      }
    );

    // 2. Listen to all oil submissions
    const unsubscribeSubmissions = onSnapshot(
      collection(db, "oil_submissions"),
      (snapshot) => {
        const data = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as OilSubmission[];

        // Sort on client side by timestamp descending
        const sortedData = data.sort((a, b) => {
          const timeA = a.timestamp?.seconds || 0;
          const timeB = b.timestamp?.seconds || 0;
          return timeB - timeA;
        });

        setSubmissions(sortedData);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching submissions:", error);
        toast.error("Failed to load oil submissions.");
        setLoading(false);
      }
    );

    return () => {
      unsubscribeUsers();
      unsubscribeSubmissions();
    };
  }, []);

  const handleMarkAsCompleted = async (id: string) => {
    setActionLoading(id);
    try {
      const submissionRef = doc(db, "oil_submissions", id);
      await updateDoc(submissionRef, {
        status: "completed"
      });
      toast.success("Submission marked as completed and paid!");
    } catch (error) {
      console.error("Error updating submission status:", error);
      toast.error("Failed to update status. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  // Stats calculations
  const totalSubmissions = submissions.length;
  
  const totalQuantity = submissions.reduce((acc, curr) => acc + curr.quantity, 0);
  
  const totalPaid = submissions
    .filter((sub) => sub.status === "completed")
    .reduce((acc, curr) => acc + curr.quantity * RATE_PER_LITRE, 0);

  const totalPending = submissions
    .filter((sub) => sub.status !== "completed")
    .reduce((acc, curr) => acc + curr.quantity * RATE_PER_LITRE, 0);

  // Filtered submissions
  const filteredSubmissions = submissions.filter((sub) => {
    // Resolve profile details
    const profile = usersMap[sub.uid];
    const userName = profile?.name || "";
    const userId = sub.userId || "";
    const userRole = profile?.role || sub.type || "society";

    // 1. Search term match (name, ID, or note)
    const matchesSearch = 
      userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (sub.note && sub.note.toLowerCase().includes(searchTerm.toLowerCase()));

    // 2. Tab role filter
    const matchesTab = activeTab === "all" || userRole === activeTab;

    // 3. Status filter
    const matchesStatus = 
      statusFilter === "all" || 
      (statusFilter === "completed" && sub.status === "completed") ||
      (statusFilter === "pending" && sub.status !== "completed");

    return matchesSearch && matchesTab && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-12 px-6">
        <div className="container max-w-6xl mx-auto space-y-8">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold font-display tracking-tight text-foreground">Admin Control Panel</h1>
              <p className="text-muted-foreground mt-1">Manage and verify oil collections, complete payouts for commercial & society givers.</p>
            </div>
          </header>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-card shadow-card border-border/50 overflow-hidden group hover:border-primary/30 transition-colors">
              <div className="h-1 bg-primary w-full" />
              <CardContent className="pt-6">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Total Collections</p>
                <h3 className="text-2xl font-bold mt-1 group-hover:text-primary transition-colors">{totalSubmissions} requests</h3>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card border-border/50 overflow-hidden group hover:border-blue-500/30 transition-colors">
              <div className="h-1 bg-blue-500 w-full" />
              <CardContent className="pt-6">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">Total Oil Received</p>
                <h3 className="text-2xl font-bold mt-1 group-hover:text-blue-500 transition-colors">{totalQuantity.toFixed(1)} L</h3>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card border-border/50 overflow-hidden group hover:border-green-500/30 transition-colors">
              <div className="h-1 bg-green-500 w-full" />
              <CardContent className="pt-6">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-green-600/80">Completed Payments</p>
                <h3 className="text-2xl font-bold mt-1 flex items-center group-hover:text-green-500 transition-colors text-green-600">
                  <IndianRupee className="w-5 h-5 mr-0.5" />
                  {totalPaid.toLocaleString()}
                </h3>
              </CardContent>
            </Card>

            <Card className="bg-card shadow-card border-border/50 overflow-hidden group hover:border-orange-500/30 transition-colors">
              <div className="h-1 bg-orange-500 w-full" />
              <CardContent className="pt-6">
                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest text-orange-600/80">Pending Payments</p>
                <h3 className="text-2xl font-bold mt-1 flex items-center group-hover:text-orange-500 transition-colors text-orange-600">
                  <IndianRupee className="w-5 h-5 mr-0.5" />
                  {totalPending.toLocaleString()}
                </h3>
              </CardContent>
            </Card>
          </div>

          {/* Submissions Section */}
          <Card className="border-border/50 shadow-card">
            <CardHeader className="border-b border-border/50 pb-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <CardTitle className="font-display text-xl">Collection Requests</CardTitle>
                  <CardDescription>Verify requests, track giver locations, and update payment status.</CardDescription>
                </div>
                {/* Search */}
                <div className="relative w-full md:w-72">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search name, ID, or notes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-muted/30"
                  />
                </div>
              </div>

              {/* Filters / Tabs */}
              <div className="flex flex-wrap items-center justify-between gap-4 mt-6 pt-2 border-t border-border/20">
                <div className="flex items-center gap-2 bg-muted/40 p-1 rounded-xl">
                  <button
                    onClick={() => setActiveTab("all")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${activeTab === "all" ? "bg-background shadow text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    All Givers
                  </button>
                  <button
                    onClick={() => setActiveTab("commercial")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${activeTab === "commercial" ? "bg-background shadow text-primary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Building2 className="w-3.5 h-3.5" /> Commercial
                  </button>
                  <button
                    onClick={() => setActiveTab("society")}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${activeTab === "society" ? "bg-background shadow text-secondary" : "text-muted-foreground hover:text-foreground"}`}
                  >
                    <Users className="w-3.5 h-3.5" /> Society
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground font-medium">Status:</span>
                  <select
                    value={statusFilter}
                    onChange={(e: any) => setStatusFilter(e.target.value)}
                    className="bg-muted/40 border-0 rounded-lg text-xs font-semibold px-2 py-1.5 text-foreground focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    <option value="all">All Statuses</option>
                    <option value="pending">Pending Payment</option>
                    <option value="completed">Completed / Paid</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              {loading ? (
                <div className="text-center py-20 text-muted-foreground">
                  <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm font-medium">Syncing database requests...</p>
                </div>
              ) : filteredSubmissions.length === 0 ? (
                <div className="text-center py-20 text-muted-foreground">
                  <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p className="text-lg font-medium">No requests found</p>
                  <p className="text-sm opacity-60">Try adjusting your filters or search query.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <AnimatePresence mode="popLayout">
                    {filteredSubmissions.map((sub, i) => {
                      const profile = usersMap[sub.uid];
                      const userName = profile?.name || "Loading User...";
                      const userLocation = profile?.location || "No location provided";
                      const subType = profile?.role || sub.type || "society";
                      const isCompleted = sub.status === "completed";
                      const payout = sub.quantity * RATE_PER_LITRE;

                      return (
                        <motion.div
                          key={sub.id}
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          transition={{ duration: 0.2, delay: Math.min(i * 0.03, 0.3) }}
                          className={`flex flex-col md:flex-row md:items-center justify-between p-5 rounded-2xl border transition-all ${
                            isCompleted 
                              ? "bg-green-500/[0.01] hover:bg-green-500/[0.03] border-border/50" 
                              : "bg-orange-500/[0.02] hover:bg-orange-500/[0.04] border-orange-500/20 hover:border-orange-500/30"
                          }`}
                        >
                          <div className="flex flex-col md:flex-row md:items-center gap-4 flex-1">
                            {/* Icon Indicator */}
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                              isCompleted ? 'bg-green-500/10 text-green-600' : 'bg-orange-500/10 text-orange-600'
                            }`}>
                              {subType === "commercial" ? (
                                <Building2 className="w-6 h-6" />
                              ) : (
                                <Users className="w-6 h-6" />
                              )}
                            </div>

                            {/* Details */}
                            <div className="space-y-1 min-w-0">
                              <div className="flex items-center flex-wrap gap-2">
                                <h4 className="font-bold text-base text-foreground leading-none">{userName}</h4>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
                                  subType === "commercial" 
                                    ? "bg-primary/10 text-primary" 
                                    : "bg-secondary/10 text-secondary"
                                }`}>
                                  {subType}
                                </span>
                                <span className="text-[10px] text-muted-foreground font-mono">{sub.userId}</span>
                              </div>

                              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                <span className="flex items-center gap-1">
                                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                                  {userLocation}
                                </span>
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3.5 h-3.5 shrink-0" />
                                  {sub.timestamp ? (sub.timestamp as Timestamp).toDate().toLocaleDateString('en-IN', { 
                                    day: 'numeric', 
                                    month: 'short', 
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                  }) : 'Processing...'}
                                </span>
                              </div>

                              {sub.note && (
                                <p className="text-xs text-muted-foreground/80 italic mt-1.5 border-l-2 border-border pl-2 py-0.5">
                                  "{sub.note}"
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Stats and Payout Actions */}
                          <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-4 mt-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-border/50">
                            <div className="text-left md:text-right">
                              <div className="flex items-center md:justify-end gap-1.5">
                                <Droplets className="w-4 h-4 text-blue-500" />
                                <span className="font-bold text-lg">{sub.quantity} L</span>
                              </div>
                              <div className="flex items-center md:justify-end gap-0.5 text-xs font-semibold text-muted-foreground">
                                <IndianRupee className="w-3.5 h-3.5" />
                                <span>{payout.toLocaleString()} payout</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              {isCompleted ? (
                                <span className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-lg bg-green-500/10 text-green-600 border border-green-500/20 flex items-center gap-1">
                                  <CheckCircle2 className="w-3.5 h-3.5" /> Paid & Completed
                                </span>
                              ) : (
                                <div className="flex items-center gap-2">
                                  <span className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-lg bg-orange-500/10 text-orange-600 border border-orange-500/20 flex items-center gap-1">
                                    <Clock className="w-3.5 h-3.5" /> Pending Payment
                                  </span>
                                  <Button 
                                    size="sm"
                                    onClick={() => handleMarkAsCompleted(sub.id!)}
                                    disabled={actionLoading === sub.id}
                                    className="bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-sm hover:shadow transition-all text-xs font-semibold px-3.5"
                                  >
                                    {actionLoading === sub.id ? "Updating..." : "Mark Completed"}
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
