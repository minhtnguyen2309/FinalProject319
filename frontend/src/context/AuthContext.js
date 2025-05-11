import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(null); // Store userId separately for CartContext
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Check if user is logged in via backend
  useEffect(() => {
    const checkToken = async () => {
      try {
        const response = await fetch('http://localhost:8800/api/auth/verifyToken', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) throw new Error("Token invalid or expired");

        const data = await response.json();
        setUser(data.user);
        setUserId(data.user.userId); // Set userId here after login or token verification
      } catch (error) {
        setUser(null);
        setUserId(null);  // Reset userId if error occurs
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    checkToken();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:8800/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Invalid credentials');

      const data = await response.json();
      setUser(data.user);
      setUserId(data.user.userId);  // Set the userId after successful login
      navigate('/');  // Redirect after successful login
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setUser(null);
    setUserId(null);  // Reset userId on logout
    // Cookies.remove('user');
    navigate('/login');

    await fetch('http://localhost:8800/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  };

  return (
    <AuthContext.Provider value={{ user, userId, login, logout, loading, error }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};
