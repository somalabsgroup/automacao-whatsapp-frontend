/**
 * Tipos compartilhados do sistema
 */

export interface Tenant {
  id: string;
  slug: string;
  name: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
}

export interface TenantMember {
  id: string;
  tenantId: string;
  userId: string;
  role: "owner" | "admin" | "user";
  createdAt: string;
}

export interface Patient {
  id: string;
  tenantId: string;
  name: string;
  phone: string;
  email?: string;
  birthDate?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  tenantId: string;
  patientId: string;
  content: string;
  status: "pending" | "sent" | "delivered" | "read" | "failed";
  scheduledFor?: string;
  sentAt?: string;
  createdAt: string;
  createdBy: string;
}

export interface MessageTemplate {
  id: string;
  tenantId: string;
  name: string;
  content: string;
  variables: string[];
  createdAt: string;
  updatedAt: string;
}
