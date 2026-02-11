import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Loader from '../components/Loader';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { loginWithToken } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!token.trim()) {
      setError('Firebase Bearer token is required.');
      return;
    }

    setError('');
    setLoading(true);
    try {
      await loginWithToken(token.trim());
      const destination = location.state?.from?.pathname || '/app/dashboard';
      navigate(destination, { replace: true });
    } catch (err) {
      setError(err.response?.status === 401 ? 'Token validation failed. Please provide a valid Firebase token.' : 'Unable to authenticate at this time.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <Card title="Secure Sign In" subtitle="Authenticate using your Firebase token">
        <form onSubmit={onSubmit} className="form-stack">
          <label htmlFor="firebaseToken">Firebase Bearer Token</label>
          <textarea id="firebaseToken" rows={7} value={token} onChange={(e) => setToken(e.target.value)} placeholder="Paste your Firebase ID token" required />
          {error && <p className="error-text">{error}</p>}
          <button className="btn" type="submit" disabled={loading}>
            {loading ? <Loader label="Signing in securely..." /> : 'Sign In'}
          </button>
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;
