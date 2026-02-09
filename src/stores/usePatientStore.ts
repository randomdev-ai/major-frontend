import { create } from 'zustand';

interface PatientState {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  setPatient: (payload: Partial<PatientState>) => void;
}

export const usePatientStore = create<PatientState>((set) => ({
  name: 'Jordan Blake',
  age: 42,
  gender: 'Female',
  bloodGroup: 'O+',
  setPatient: (payload) => set((state) => ({ ...state, ...payload })),
}));
