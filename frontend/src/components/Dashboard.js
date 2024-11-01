import React, { useState } from 'react';
import api from '../api';

function Dashboard() {
    const [message, setMessage] = useState('');

    const handleRefreshToken = async () => {
        const refreshToken = localStorage.getItem('refreshToken');
        try {
            const response = await api.post('/refresh_token', { refreshToken });
            localStorage.setItem('accessToken', response.data.AccessToken);
            setMessage("Token refreshed successfully!");
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    const handleLogout = async () => {
        const accessToken = localStorage.getItem('accessToken');
        try {
            await api.post('/logout', {}, {
                headers: { Authorization: accessToken }
            });
            localStorage.removeItem('accessToken');
            setMessage("Logged out successfully");
            window.location.href = '/';
        } catch (error) {
            setMessage(error.response.data.error);
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={handleRefreshToken}>Refresh Token</button>
            <button onClick={handleLogout}>Logout</button>
            {message && <p>{message}</p>}
        </div>
    );
}

export default Dashboard;
