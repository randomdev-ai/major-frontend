import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

const ProfilePage = () => {
  const { user, logout } = useAuth();

  return (
    <Card title="Profile" subtitle="Account details synced from backend profile endpoint">
      <div className="profile-grid">
        <p><strong>Name</strong><span>{user?.name || 'Not available'}</span></p>
        <p><strong>Email</strong><span>{user?.email || 'Not available'}</span></p>
        <p><strong>Account ID</strong><span>{user?.id || user?.uid || 'Not available'}</span></p>
      </div>
      <button type="button" className="btn btn-secondary" onClick={logout}>Logout</button>
    </Card>
  );
};

export default ProfilePage;
