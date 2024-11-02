import React, { useState } from 'react';
import api from '../api';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState(null);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/signup', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  username,
                  password,
                  email
                })
              });
        
              const data = await response.json();
        
              if (response.ok) {
                console.log('User signed up:', req.body.username);
                setMessage("User signed up! Check your e-mail");
                window.location.href = '/login';
              } else {
                setMessage(data.error);
              }
            } catch (error) {
              console.error('Error during signup:', error);
              setMessage('An error occurred. Please try again later. ' + error.response.data.error);
            }
    };

    return (
        <div>
          <h2>Sign Up</h2>
          <form onSubmit={handleSignup}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      );
    };

export default Signup;
