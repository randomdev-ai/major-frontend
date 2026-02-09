import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import InfoBanner from '../components/ui/InfoBanner';
import { useAuthStore } from '../stores/useAuthStore';

const SettingsPage: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <div className="space-y-6">
      <InfoBanner />
      <div>
        <h1 className="text-2xl font-semibold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Manage your profile preferences and privacy information.</p>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Profile</h3>
          <div className="grid gap-3 text-sm">
            <div>
              <p className="text-xs text-slate-500">Name</p>
              <p className="font-semibold text-slate-900">Jordan Blake</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Email</p>
              <p className="font-semibold text-slate-900">jordan@example.com</p>
            </div>
            <div>
              <p className="text-xs text-slate-500">Status</p>
              <p className="font-semibold text-slate-900">Read-only</p>
            </div>
          </div>
        </Card>
        <Card className="space-y-4">
          <h3 className="text-sm font-semibold text-slate-700">Privacy Notice</h3>
          <p className="text-sm text-slate-500">
            HealthIntel AI stores only session-based information locally for this demo. No real data is
            transmitted or shared.
          </p>
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default SettingsPage;
