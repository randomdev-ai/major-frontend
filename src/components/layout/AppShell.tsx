import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import Button from '../ui/Button';
import { useAuthStore } from '../../stores/useAuthStore';

interface AppShellProps {
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const logout = useAuthStore((state) => state.logout);
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => setLocked(true), 3 * 60 * 1000);
    };

    resetTimer();
    window.addEventListener('mousemove', resetTimer);
    window.addEventListener('keydown', resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('mousemove', resetTimer);
      window.removeEventListener('keydown', resetTimer);
    };
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex flex-1 flex-col">
        <Topbar />
        <main className="flex flex-1 flex-col gap-6 p-6">{children}</main>
      </div>
      {locked && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 p-6">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-card">
            <h2 className="text-lg font-semibold text-slate-900">Session locked</h2>
            <p className="mt-2 text-sm text-slate-600">
              For security, your session is locked after inactivity. Unlock to continue or log out.
            </p>
            <div className="mt-6 flex gap-3">
              <Button onClick={() => setLocked(false)}>Unlock session</Button>
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppShell;
