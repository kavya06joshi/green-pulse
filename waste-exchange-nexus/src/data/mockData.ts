import { WasteItem, Order } from "@/types";

const today = new Date();
const d = (daysOffset: number) => {
  const date = new Date(today);
  date.setDate(date.getDate() + daysOffset);
  return date.toISOString().split("T")[0];
};

export const initialInventory: WasteItem[] = [
  { id: "w1", type: "Plastic", quantity: 120, unit: "tons", qualityGrade: "A", pricePerUnit: 450, location: "Ward 12, Mumbai", expiryDate: d(30), status: "Available", createdAt: d(-10) },
  { id: "w2", type: "Paper", quantity: 85, unit: "tons", qualityGrade: "B", pricePerUnit: 320, location: "Zone 3, Delhi", expiryDate: d(20), status: "Available", createdAt: d(-8) },
  { id: "w3", type: "Metal", quantity: 45, unit: "tons", qualityGrade: "A", pricePerUnit: 1200, location: "Sector 9, Pune", expiryDate: d(45), status: "Available", createdAt: d(-15) },
  { id: "w4", type: "E-waste", quantity: 12, unit: "tons", qualityGrade: "C", pricePerUnit: 2800, location: "Ward 5, Bangalore", expiryDate: d(15), status: "Available", createdAt: d(-5) },
  { id: "w5", type: "Glass", quantity: 60, unit: "tons", qualityGrade: "B", pricePerUnit: 280, location: "Zone 7, Chennai", expiryDate: d(25), status: "Available", createdAt: d(-12) },
  { id: "w6", type: "Plastic", quantity: 200, unit: "tons", qualityGrade: "B", pricePerUnit: 400, location: "Ward 8, Hyderabad", expiryDate: d(35), status: "Available", createdAt: d(-3) },
  { id: "w7", type: "Metal", quantity: 30, unit: "tons", qualityGrade: "B", pricePerUnit: 1100, location: "Sector 2, Ahmedabad", expiryDate: d(40), status: "Available", createdAt: d(-7) },
  { id: "w8", type: "Paper", quantity: 150, unit: "tons", qualityGrade: "A", pricePerUnit: 380, location: "Ward 14, Kolkata", expiryDate: d(18), status: "Available", createdAt: d(-9) },
];

export const initialOrders: Order[] = [
  { id: "o1", wasteItemId: "w1", wasteType: "Plastic", quantity: 50, unit: "tons", pricePerUnit: 450, totalPrice: 22500, location: "Ward 12, Mumbai", companyName: "GreenRecycle Industries", status: "Completed", orderedAt: d(-20), pickupDeadline: d(-17), completedAt: d(-18) },
  { id: "o2", wasteItemId: "w3", wasteType: "Metal", quantity: 15, unit: "tons", pricePerUnit: 1200, totalPrice: 18000, location: "Sector 9, Pune", companyName: "MetalWorks Corp", status: "Completed", orderedAt: d(-15), pickupDeadline: d(-12), completedAt: d(-13) },
];

export const monthlyRevenue = [
  { month: "Sep", revenue: 185000 },
  { month: "Oct", revenue: 220000 },
  { month: "Nov", revenue: 195000 },
  { month: "Dec", revenue: 310000 },
  { month: "Jan", revenue: 275000 },
  { month: "Feb", revenue: 340000 },
];

export const wasteTypeRevenue = [
  { type: "Plastic", revenue: 425000 },
  { type: "Paper", revenue: 280000 },
  { type: "Metal", revenue: 390000 },
  { type: "E-waste", revenue: 185000 },
  { type: "Glass", revenue: 145000 },
];

export const wasteTrends = [
  { month: "Sep", Plastic: 80, Paper: 60, Metal: 30, "E-waste": 8, Glass: 40 },
  { month: "Oct", Plastic: 95, Paper: 70, Metal: 35, "E-waste": 10, Glass: 45 },
  { month: "Nov", Plastic: 110, Paper: 65, Metal: 40, "E-waste": 12, Glass: 50 },
  { month: "Dec", Plastic: 130, Paper: 85, Metal: 45, "E-waste": 15, Glass: 55 },
  { month: "Jan", Plastic: 120, Paper: 90, Metal: 42, "E-waste": 11, Glass: 58 },
  { month: "Feb", Plastic: 150, Paper: 95, Metal: 50, "E-waste": 14, Glass: 62 },
];
