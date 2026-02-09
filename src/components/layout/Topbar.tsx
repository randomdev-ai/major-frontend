import React from 'react';
import { Bell } from 'lucide-react';
import Button from '../ui/Button';

const Topbar: React.FC = () => {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white px-6 py-4">
      <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-500 lg:flex">
        <span className="text-slate-900">Dashboard</span>
        <span>Patients</span>
        <span>Analytics</span>
        <span>Settings</span>
      </nav>
      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="relative w-full max-w-xs">
          <input
            type="search"
            placeholder="Search patients..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
            aria-label="Search"
          />
        </div>
        <Button className="hidden md:inline-flex">New Case</Button>
        <button className="rounded-xl bg-slate-50 p-2" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500 text-sm font-semibold text-white">
          JD
        </div>
      </div>
    </header>
  );
};

export default Topbar;
