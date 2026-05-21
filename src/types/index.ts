export interface TenantInfo {
  id: string;
  slug: string;
  role: "owner" | "admin" | "user";
  name: string;
}

export interface UserWithTenants {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  imageUrl: string;
  tenants: TenantInfo[];
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email?: string;
  tenantId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  id: string;
  patientId: string;
  content: string;
  status: "pending" | "sent" | "delivered" | "failed";
  scheduledFor?: Date;
  sentAt?: Date;
  tenantId: string;
  createdAt: Date;
}
