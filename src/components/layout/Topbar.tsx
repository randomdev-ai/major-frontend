import React from 'react';
import { Bell } from 'lucide-react';
import { useAuthStore } from '../../stores/useAuthStore';

const Topbar: React.FC = () => {
  const userName = useAuthStore((state) => state.userName);
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 bg-white px-6 py-4">
      <input
        type="search"
        placeholder="Search health profiles, reports..."
        className="w-full max-w-md rounded-xl border border-slate-200 bg-slate-50 px-4 py-2 text-sm"
        aria-label="Search"
      />
      <div className="flex items-center gap-3">
        <button className="rounded-xl bg-slate-50 p-2" aria-label="Notifications">
          <Bell size={18} />
        </button>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-500 text-sm font-semibold text-white">
          {userName
            .split(' ')
            .map((word) => word[0])
            .join('')}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
