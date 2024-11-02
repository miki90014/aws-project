import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/login', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  username,
                  password
                })
              });
            console.log(response.data)
            localStorage.setItem('accessToken', response.data.AccessToken);
            setMessage("Login successful!");
            window.location.href = '/dashboard';
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} required />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
                <button type="submit">Login</button>
            </form>
            <br></br>
            <p>
                You don't have an account? <Link to="/signup">Sign Up</Link>
            </p>
            <br></br>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Login;
