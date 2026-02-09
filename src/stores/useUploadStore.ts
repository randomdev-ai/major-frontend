import { create } from 'zustand';

export type UploadStatus = 'idle' | 'uploading' | 'validated' | 'error';

interface UploadState {
  status: UploadStatus;
  progress: number;
  file?: File;
  setStatus: (status: UploadStatus) => void;
  setProgress: (progress: number) => void;
  setFile: (file?: File) => void;
  reset: () => void;
}

export const useUploadStore = create<UploadState>((set) => ({
  status: 'idle',
  progress: 0,
  file: undefined,
  setStatus: (status) => set({ status }),
  setProgress: (progress) => set({ progress }),
  setFile: (file) => set({ file }),
  reset: () => set({ status: 'idle', progress: 0, file: undefined }),
}));
