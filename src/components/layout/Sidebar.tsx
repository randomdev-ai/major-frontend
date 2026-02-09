import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar: React.FC = () => (
  <aside className="flex flex-col gap-6 bg-slate-900 px-6 py-8 text-white">
    <div>
      <div className="text-lg font-semibold">HealthIntel AI</div>
      <div className="text-xs text-slate-300">Decision Support</div>
    </div>
    <nav className="flex flex-col gap-2 text-sm">
      <NavLink to="/patients/123/risk" className="rounded-xl px-3 py-2 hover:bg-slate-800">
        Dashboard
      </NavLink>
      <NavLink to="/patients/123/profile" className="rounded-xl px-3 py-2 hover:bg-slate-800">
        Patient Profile
      </NavLink>
      <NavLink to="/cases/new/symptoms" className="rounded-xl px-3 py-2 hover:bg-slate-800">
        Risk Analysis
      </NavLink>
      <NavLink to="/history" className="rounded-xl px-3 py-2 hover:bg-slate-800">
        History & Logs
      </NavLink>
      <NavLink to="/settings" className="rounded-xl px-3 py-2 hover:bg-slate-800">
        Settings
      </NavLink>
    </nav>
    <div className="mt-auto text-xs text-slate-300">For informational use only.</div>
  </aside>
);

export default Sidebar;
