import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { WasteItem, Order, OrderStatus } from "@/types";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, where, addDoc, serverTimestamp, doc, updateDoc, orderBy, getDoc } from "firebase/firestore";
import { useAuth } from "./AuthContext";

interface DataContextType {
  inventory: WasteItem[];
  orders: any[];
  allOrders: any[];
  loading: boolean;
  addItem: (item: any) => Promise<void>;
  updateItem: (id: string, updates: any) => Promise<void>;
  deleteItem: (id: string) => Promise<void>;
  placeOrder: (item: WasteItem, quantity: number) => Promise<void>;
  updateOrderStatus: (orderId: string, status: string, orderData?: any) => Promise<void>;
}

const DataContext = createContext<DataContextType | null>(null);

export function DataProvider({ children }: { children: React.ReactNode }) {
  const [inventory, setInventory] = useState<WasteItem[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [allOrders, setAllOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user, userProfile, role } = useAuth();

  // Listen for inventory (waste_listings)
  useEffect(() => {
    const q = query(collection(db, "waste_listings"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as WasteItem[];
      // Sort in memory by timestamp desc
      items.sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setInventory(items);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Listen for personal orders (for business users)
  useEffect(() => {
    if (!user || role !== "business") {
      setOrders([]);
      return;
    }
    const q = query(
      collection(db, "orders"),
      where("uid", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const userOrders = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort in memory
      userOrders.sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setOrders(userOrders);
    });
    return () => unsubscribe();
  }, [user, role]);

  // Listen for all orders (for admins)
  useEffect(() => {
    if (!user || role !== "admin") {
      setAllOrders([]);
      return;
    }
    const q = query(collection(db, "orders"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ordersData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort in memory
      ordersData.sort((a: any, b: any) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
      setAllOrders(ordersData);
    });
    return () => unsubscribe();
  }, [user, role]);

  const addItem = useCallback(async (item: any) => {
    if (!user || role !== "admin") return;
    await addDoc(collection(db, "waste_listings"), {
      type: item.type,
      lotSize: Number(item.lotSize),
      pricePerLot: Number(item.pricePerLot),
      totalLotsAvailable: Number(item.totalLotsAvailable),
      location: item.location,
      createdBy: user.uid,
      timestamp: serverTimestamp(),
      status: "Available"
    });
  }, [user, role]);

  const updateItem = useCallback(async (id: string, updates: any) => {
    if (role !== "admin") return;
    await updateDoc(doc(db, "waste_listings", id), updates);
  }, [role]);

  const deleteItem = useCallback(async (id: string) => {
    // Optional delete logic
  }, []);

  const placeOrder = useCallback(async (item: WasteItem, lotsOrdered: number) => {
    if (!user || !userProfile || role !== "business") return;

    // Just create the order, do NOT reduce inventory yet
    await addDoc(collection(db, "orders"), {
      uid: user.uid,
      userId: userProfile.userId,
      companyName: userProfile.companyName,
      wasteType: item.type,
      listingId: item.id, // Track which listing this order is for
      lotSize: (item as any).lotSize || 0,
      lotsOrdered: Number(lotsOrdered),
      totalPrice: Number(lotsOrdered) * ((item as any).pricePerLot || 0),
      status: "placed",
      timestamp: serverTimestamp(),
    });
  }, [user, userProfile, role]);

  const updateOrderStatus = useCallback(async (orderId: string, status: string, orderData?: any) => {
    if (role !== "admin") return;
    
    // 1. Update order status
    await updateDoc(doc(db, "orders", orderId), { status });

    // 2. If accepted, reduce inventory
    if (status === "accepted" && orderData) {
      const listingRef = doc(db, "waste_listings", orderData.listingId);
      const listingSnap = await getDoc(listingRef);
      
      if (listingSnap.exists()) {
        const listing = listingSnap.data();
        const newLots = (listing.totalLotsAvailable || 0) - (orderData.lotsOrdered || 0);
        await updateDoc(listingRef, {
          totalLotsAvailable: Math.max(0, newLots),
          status: newLots <= 0 ? "Sold" : "Available"
        });
      }
    }
  }, [role]);

  return (
    <DataContext.Provider value={{ 
      inventory, 
      orders, 
      allOrders,
      loading, 
      addItem, 
      updateItem, 
      deleteItem, 
      placeOrder, 
      updateOrderStatus 
    }}>
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
