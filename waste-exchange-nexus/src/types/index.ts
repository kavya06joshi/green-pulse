export type WasteType = "Plastic" | "Paper" | "Metal" | "E-waste" | "Glass";

export type QualityGrade = "A" | "B" | "C";

export type StockStatus = "Available" | "Reserved" | "Sold";

export type OrderStatus = "Reserved" | "Completed" | "Cancelled";

export interface WasteItem {
  id: string;
  type: WasteType;
  quantity: number;
  unit: "tons" | "kg";
  qualityGrade: QualityGrade;
  pricePerUnit: number;
  location: string;
  expiryDate: string;
  status: StockStatus;
  createdAt: string;
}

export interface Order {
  id: string;
  wasteItemId: string;
  wasteType: WasteType;
  quantity: number;
  unit: "tons" | "kg";
  pricePerUnit: number;
  totalPrice: number;
  location: string;
  companyName: string;
  status: OrderStatus;
  orderedAt: string;
  pickupDeadline: string;
  completedAt?: string;
  cancelledAt?: string;
}

export interface UserProfile {
  uid: string;
  userId: string;
  role: "business" | "admin";
  companyName: string;
  location: string;
}

export type UserRole = "business" | "admin" | null;
