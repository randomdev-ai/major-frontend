import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '../layouts/AuthLayout.jsx';
import Button from '../components/Button.jsx';
import { useAuth } from '../utils/AuthContext.jsx';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    password: '',
    accepted: false,
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormState((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    login({ name: formState.name || 'New Member', email: formState.email });
    navigate('/dashboard');
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start your HealthIntel AI workspace in minutes."
      footer={
        <p>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <label>
          Full Name
          <input type="text" name="name" value={formState.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input
            type="email"
            name="email"
            value={formState.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password
          <div className="password-field">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={formState.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              className="text-link"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </label>
        <label className="checkbox-field">
          <input type="checkbox" name="accepted" checked={formState.accepted} onChange={handleChange} />
          I agree to the Terms & Privacy Policy
        </label>
        <Button type="submit">Create Account</Button>
      </form>
    </AuthLayout>
  );
};

export default Register;
