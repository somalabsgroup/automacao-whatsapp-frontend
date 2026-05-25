import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface UserData {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  imageUrl?: string;
}

export interface TenantData {
  id: string;
  slug: string;
  name: string;
}

interface UserState {
  user: UserData | null;
  tenant: TenantData | null;
  setUser: (user: UserData | null) => void;
  setTenant: (tenant: TenantData | null) => void;
  clearSession: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      user: null,
      tenant: null,
      setUser: (user) => set({ user }),
      setTenant: (tenant) => set({ tenant }),
      clearSession: () => set({ user: null, tenant: null }),
    }),
    {
      name: 'user-session-storage',
    }
  )
);
