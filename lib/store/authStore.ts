// lib/store/authStore.ts

import { create } from 'zustand';
import type { User } from '@/types/user';

// ✔️ Тип стора залишився без змін
type AuthStore = {
  isAuthenticated: boolean;
  user: User | null;
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
};

// ❗ Головна зміна:
// було ➜ create<AuthStore>(...)
// стало ➜ create<AuthStore>()(...)
// Це відповідає рекомендованому TS-патерну Zustand
export const useAuthStore = create<AuthStore>()(set => ({
  isAuthenticated: false,
  user: null,

  // Без змін — логіка коректна
  setUser: (user: User) =>
    set(() => ({
      user,
      isAuthenticated: true,
    })),

  // Без змін — все правильно
  clearIsAuthenticated: () =>
    set(() => ({
      user: null,
      isAuthenticated: false,
    })),
}));
