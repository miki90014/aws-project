import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post(`/signup`,
        {
          username,
          password,
          email
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('User signed up:', username);
      console.log(response.data);
      setMessage('Signup successful!');
      } catch (error) {
        console.log(`Error during signup: ${error.message}`);
        setMessage(`Error during signup: ${error.response.data.error}`);
      }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`/login`,
        {
          username,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log('User login:', username);
      console.log(response.data);
      setMessage('Logged successful!');
      localStorage.setItem('accessToken', response.data.AccessToken);
      } catch (error) {
        console.log(`Error during signup: ${error.message}`);
        setMessage(`Error during signup: ${error.response.data.error}`);
      }
  };

  const handleLogout = async () => {
    if (!localStorage.getItem('accessToken')) {
      setMessage('No user logged in');
      return;
    }
    try {
      const response = await axios.post(`/logout`,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('accessToken'),
          }
        }
      );
      localStorage.removeItem('accessToken');
      setMessage('Logged out successfully');
      console.log(response.data);
    } catch (error) {
      setMessage(`Logout failed: ${error.response.data.error}`);
    }
  };

  return (
    <div className="App">
      <h1>Cognito Auth Frontend</h1>
      <div id="auth-section">
            <form id="login-form">
                <input type="text" id="login-username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                <input type="password" id="login-password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <button type="button" onClick={handleLogin}>Log In</button>
            </form>
            <form id="signup-form">
                <input type="text" id="signup-username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
                <input type="password" id="signup-password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                <input type="email" id="signup-email" placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                <button type="button" onClick={handleSignup}>Sign Up</button>
            </form>
            <button type="button" onClick={handleLogout}>Log Out</button>
        </div>
      <p>{message}</p>
    </div>
  );
}

export default App;