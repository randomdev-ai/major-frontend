import { useAuth } from '../context/AuthContext';

const Topbar = () => {
  const { user, logout } = useAuth();

  return (
    <header className="topbar">
      <div>
        <p className="muted">Signed in as</p>
        <strong>{user?.name || user?.email || 'Authenticated User'}</strong>
      </div>
      <button type="button" className="btn btn-secondary" onClick={logout}>
        Logout
      </button>
    </header>
  );
};

export default Topbar;
