import React from 'react';
import { useNavigate } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout.jsx';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../utils/AuthContext.jsx';

const Settings = () => {
  const { logout, session } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <AppLayout>
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your profile preferences and privacy information.</p>
      </div>
      <section className="grid-two">
        <Card>
          <h3>Profile</h3>
          <div className="summary-grid">
            <div>
              <span>Name</span>
              <strong>{session?.user?.name || 'Jordan Blake'}</strong>
            </div>
            <div>
              <span>Email</span>
              <strong>{session?.user?.email || 'jordan@example.com'}</strong>
            </div>
            <div>
              <span>Status</span>
              <strong>Read-only</strong>
            </div>
          </div>
        </Card>
        <Card>
          <h3>Privacy Notice</h3>
          <p className="muted">
            HealthIntel AI stores only session-based information locally for this demo. No real data is
            transmitted or shared. Always consult professional guidance for medical decisions.
          </p>
          <Button onClick={handleLogout}>Logout</Button>
        </Card>
      </section>
    </AppLayout>
  );
};

export default Settings;
