// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleLogin = () => {
    // Dummy authentication logic (replace with your actual authentication logic)
    if (username === 'user' && password === 'password') {
      localStorage.setItem('authToken', 'yourAuthToken'); // Save the auth token in localStorage
      localStorage.setItem('isAdmin', 'false'); // Regular user
      history.push('/dashboard'); // Redirect to dashboard for user
    } else if (username === 'admin' && password === 'admin') {
      localStorage.setItem('authToken', 'yourAuthToken'); // Save the auth token
      localStorage.setItem('isAdmin', 'true'); // Admin user
      history.push('/admin'); // Redirect to admin page
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default LoginPage;
