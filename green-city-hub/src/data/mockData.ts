export const areas = [
  "Green Valley - Zone A",
  "Sunrise Colony - Zone B",
  "Lake View - Zone C",
  "Industrial Park - Zone D",
  "Old Town - Zone E",
  "Riverside - Zone F",
  "Hilltop Heights - Zone G",
  "Market District - Zone H",
];

export type WasteType = "Organic" | "Plastic" | "E-waste" | "Hazardous" | "Mixed";

export interface ScheduleEntry {
  area: string;
  day: string;
  time: string;
  wasteType: WasteType;
}

export const schedules: ScheduleEntry[] = [
  { area: "Green Valley - Zone A", day: "Monday", time: "7:00 AM – 9:00 AM", wasteType: "Organic" },
  { area: "Green Valley - Zone A", day: "Wednesday", time: "7:00 AM – 9:00 AM", wasteType: "Plastic" },
  { area: "Green Valley - Zone A", day: "Friday", time: "8:00 AM – 10:00 AM", wasteType: "E-waste" },
  { area: "Sunrise Colony - Zone B", day: "Tuesday", time: "6:30 AM – 8:30 AM", wasteType: "Organic" },
  { area: "Sunrise Colony - Zone B", day: "Thursday", time: "6:30 AM – 8:30 AM", wasteType: "Mixed" },
  { area: "Sunrise Colony - Zone B", day: "Saturday", time: "7:00 AM – 9:00 AM", wasteType: "Hazardous" },
  { area: "Lake View - Zone C", day: "Monday", time: "9:00 AM – 11:00 AM", wasteType: "Plastic" },
  { area: "Lake View - Zone C", day: "Wednesday", time: "9:00 AM – 11:00 AM", wasteType: "Organic" },
  { area: "Lake View - Zone C", day: "Friday", time: "9:00 AM – 11:00 AM", wasteType: "Mixed" },
  { area: "Industrial Park - Zone D", day: "Tuesday", time: "10:00 AM – 12:00 PM", wasteType: "E-waste" },
  { area: "Industrial Park - Zone D", day: "Thursday", time: "10:00 AM – 12:00 PM", wasteType: "Hazardous" },
  { area: "Industrial Park - Zone D", day: "Saturday", time: "8:00 AM – 10:00 AM", wasteType: "Organic" },
  { area: "Old Town - Zone E", day: "Monday", time: "8:00 AM – 10:00 AM", wasteType: "Mixed" },
  { area: "Old Town - Zone E", day: "Wednesday", time: "8:00 AM – 10:00 AM", wasteType: "Plastic" },
  { area: "Old Town - Zone E", day: "Friday", time: "7:00 AM – 9:00 AM", wasteType: "Organic" },
  { area: "Riverside - Zone F", day: "Tuesday", time: "7:00 AM – 9:00 AM", wasteType: "Organic" },
  { area: "Riverside - Zone F", day: "Thursday", time: "7:00 AM – 9:00 AM", wasteType: "Plastic" },
  { area: "Riverside - Zone F", day: "Saturday", time: "9:00 AM – 11:00 AM", wasteType: "E-waste" },
  { area: "Hilltop Heights - Zone G", day: "Monday", time: "6:00 AM – 8:00 AM", wasteType: "Organic" },
  { area: "Hilltop Heights - Zone G", day: "Wednesday", time: "6:00 AM – 8:00 AM", wasteType: "Hazardous" },
  { area: "Hilltop Heights - Zone G", day: "Friday", time: "6:00 AM – 8:00 AM", wasteType: "Mixed" },
  { area: "Market District - Zone H", day: "Tuesday", time: "5:30 AM – 7:30 AM", wasteType: "Organic" },
  { area: "Market District - Zone H", day: "Thursday", time: "5:30 AM – 7:30 AM", wasteType: "Plastic" },
  { area: "Market District - Zone H", day: "Saturday", time: "6:00 AM – 8:00 AM", wasteType: "Mixed" },
];

export interface Announcement {
  id: number;
  title: string;
  description: string;
  date: string;
  type: "info" | "warning" | "success";
}

export const announcements: Announcement[] = [
  { id: 1, title: "E-Waste Collection Drive", description: "Special e-waste collection drive at City Park this Saturday. Bring old electronics for safe disposal.", date: "Feb 28, 2026", type: "info" },
  { id: 2, title: "New Recycling Center Open", description: "Our new recycling center in Zone C is now operational 24/7. Drop off recyclables anytime.", date: "Feb 25, 2026", type: "success" },
  { id: 3, title: "Hazardous Waste Alert", description: "Do not dispose of batteries in regular waste bins. Use designated hazardous waste points.", date: "Feb 22, 2026", type: "warning" },
  { id: 4, title: "Green Points Double Weekend", description: "Earn 2x green points for all segregation reports submitted this weekend!", date: "Feb 20, 2026", type: "success" },
];

export interface LeaderboardEntry {
  rank: number;
  name: string;
  area: string;
  points: number;
  activities: number;
}

export const leaderboard: LeaderboardEntry[] = [
  { rank: 1, name: "Priya Sharma", area: "Zone A", points: 2450, activities: 87 },
  { rank: 2, name: "Rahul Patel", area: "Zone C", points: 2180, activities: 72 },
  { rank: 3, name: "Anita Desai", area: "Zone B", points: 1920, activities: 65 },
  { rank: 4, name: "Vikram Singh", area: "Zone F", points: 1750, activities: 58 },
  { rank: 5, name: "Meera Nair", area: "Zone E", points: 1680, activities: 54 },
  { rank: 6, name: "Arjun Reddy", area: "Zone D", points: 1520, activities: 49 },
  { rank: 7, name: "Sunita Gupta", area: "Zone G", points: 1410, activities: 45 },
  { rank: 8, name: "Kiran Joshi", area: "Zone H", points: 1350, activities: 42 },
];

export const cityStats = {
  totalWasteCollected: "12,450 tons",
  recyclingRate: 68,
  activeUsers: "24,380",
  greenPointsAwarded: "1.2M",
  areasServed: 8,
  complaintsResolved: 94,
  treesPlanted: "3,200",
  co2Reduced: "850 tons",
};

export const wasteGuides: { type: WasteType; color: string; icon: string; items: string[]; tips: string }[] = [
  { type: "Organic", color: "eco-organic", icon: "🥬", items: ["Food scraps", "Garden waste", "Paper napkins", "Tea bags", "Fruit peels"], tips: "Compost at home or use green bins. Keep dry and wet waste separate." },
  { type: "Plastic", color: "eco-plastic", icon: "♻️", items: ["Bottles", "Containers", "Bags", "Packaging", "Caps & lids"], tips: "Rinse containers before disposal. Remove labels when possible." },
  { type: "E-waste", color: "eco-ewaste", icon: "🔌", items: ["Old phones", "Batteries", "Cables", "Circuit boards", "Light bulbs"], tips: "Never throw in regular bins. Use designated e-waste collection points." },
  { type: "Hazardous", color: "eco-hazardous", icon: "⚠️", items: ["Chemicals", "Paints", "Pesticides", "Medical waste", "Aerosol cans"], tips: "Handle with care. Store separately and use hazardous waste pickup service." },
  { type: "Mixed", color: "eco-mixed", icon: "🗑️", items: ["Ceramics", "Diapers", "Sanitary items", "Broken glass", "Miscellaneous"], tips: "Only for items that don't fit other categories. Always try to segregate first." },
];
