import { create } from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  userName: string;
  login: (name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  userName: 'Jordan Blake',
  login: (name) => set({ isAuthenticated: true, userName: name }),
  logout: () => set({ isAuthenticated: false }),
}));
