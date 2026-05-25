export type UserRole = "commercial" | "society" | "admin" | null;

export interface UserProfile {
  uid: string;
  userId: string;
  role: UserRole;
  name: string;
  location: string;
}

export interface OilSubmission {
  id?: string;
  uid: string;
  userId: string;
  type: "commercial" | "society";
  quantity: number;
  note: string;
  status: "pending" | "collected" | "completed";
  timestamp: any;
}
