import React, { useState } from 'react';
import { signup, login, refreshToken, logout } from './AuthService';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [authData, setAuthData] = useState(null);
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    const response = await signup(username, password, email);
    if (response.error) {
      setMessage(`Signup failed: ${response.error}`);
    } else {
      setMessage('Signup successful!');
    }
  };

  const handleLogin = async () => {
    const response = await login(username, password);
    if (response.error) {
      setMessage(`Login failed: ${response.error}`);
    } else {
      setAuthData(response);
      setMessage('Login successful!');
    }
  };

  const handleRefreshToken = async () => {
    if (!authData) {
      setMessage('No refresh token found');
      return;
    }
    const response = await refreshToken(authData.RefreshToken);
    if (response.error) {
      setMessage(`Token refresh failed: ${response.error}`);
    } else {
      setAuthData(response);
      setMessage('Token refreshed successfully!');
    }
  };

  const handleLogout = async () => {
    if (!authData) {
      setMessage('No user logged in');
      return;
    }
    const response = await logout(authData.AccessToken);
    if (response.error) {
      setMessage(`Logout failed: ${response.error}`);
    } else {
      setAuthData(null);
      setMessage('Logged out successfully');
    }
  };

  return (
    <div className="App">
      <h1>Cognito Auth Frontend</h1>
      <div id="auth-section">
            <form id="login-form">
                <input type="text" id="login-username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                <input type="password" id="login-password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <button onClick={handleLogin}>Log In</button>
            </form>
            <form id="signup-form">
                <input type="text" id="signup-username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                <input type="password" id="signup-password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type="email" id="signup-email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <button onClick={handleSignup}>Sign Up</button>
            </form>
            <button onClick={handleLogout}>Log Out</button>
            <button onClick={handleRefreshToken}>Refresh Token</button>
        </div>
      <p>{message}</p>
    </div>
  );
}

export default App;