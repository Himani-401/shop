import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('shopper'); // Ensure you're using 'role'
  const [error, setError] = useState(null);
  const [redirect, setRedirect] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/login', { email, password, role }); // Make sure you're passing 'role' correctly
      const { token, userId, role } = response.data;

      // Store the token, userId, and role in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role);

      // Redirect based on the user role
      if (role === 'shopper') {
        setRedirect('/home');
      } else {
        setRedirect('/seller-dashboard');
      }
    } catch (err) {
      console.error('Login error:', err);
    
      // Check if error has a response (for server-side errors like 400, 500, etc.)
      if (err.response) {
        console.error('Response error:', err.response);
        setError(`Error: ${err.response.status} - ${err.response.data.message || 'No message'}`);
      } 
      // Check if error is related to a network issue (e.g., no internet, server down)
      else if (err.request) {
        console.error('Request error:', err.request);
        setError('Network error: The server did not respond. Please check your connection.');
      } 
      // For any other errors
      else {
        console.error('Error details:', err.message);
        setError('An unexpected error occurred. Please try again later.');
      }
    }
    
  };

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="shopper">shopper</option>
          <option value="seller">seller</option>
        </select>
        <button type="submit">Login</button>
      </form>
      {error && <p>{error}</p>}
      <p>Don't have an account? <a href="/signup">Register here</a></p>
    </div>
  );
}

export default Login;
