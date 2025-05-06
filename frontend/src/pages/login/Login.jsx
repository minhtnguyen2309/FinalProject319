import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.js';
import './login.css';

const Login = () => {
  const { login, loading, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    // e.preventDefault();

    if (!email || !password) {
      setFormError('Email and password are required');
      return;
    }

    setFormError(''); // Clear local form error

    await login(email, password); // Context handles error + navigation
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>

        {formError && <p className="error">{formError}</p>}
        {error && <p className="error">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="signup-link">
          <p>Don't have an account? <a href="/register">Sign Up</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
