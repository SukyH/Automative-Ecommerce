import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../service/ApiService';  // Import your ApiService

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useNavigate();

  const handleLogin = async () => {
    try {
   
      const response = await ApiService.loginUser({ email: username, password });

      
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);

      // Redirect based on user role
      if (response.role === 'ADMIN') {
        history('/admin');  // Redirect to Admin Dashboard
      } else {
        history('/');  // Redirect to Home Page (regular user)
      }
    } catch (error) {
      setError('Invalid credentials');
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
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
