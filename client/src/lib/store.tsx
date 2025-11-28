import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  role: string;
  taxId: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  
  // Actions
  login: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      login: (user, token) => {
        // 1. Save to State
        set({ user, token, isAuthenticated: true });
        // 2. Save to LocalStorage for Axios to pick up
        localStorage.setItem('nafeza_token', token);
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false });
        localStorage.removeItem('nafeza_token');
      }
    }),
    {
      name: 'nafeza-storage', // Key in localStorage
    }
  )
);