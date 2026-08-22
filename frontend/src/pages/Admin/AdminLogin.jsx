import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password
      });
      localStorage.setItem('adminToken', res.data.token);
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed');
    }
  };

  return (
    <div className="admin-login-container" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212', color: 'white' }}>
      <div className="login-box" style={{ padding: '2rem', backgroundColor: '#1e1e1e', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Admin Portal</h2>
        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
            <input 
              type="text" 
              value={username} 
              onChange={(e) => setUsername(e.target.value)} 
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: 'white' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required
              style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', border: '1px solid #333', backgroundColor: '#2a2a2a', color: 'white' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.75rem', backgroundColor: '#ff4d4d', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', marginTop: '1rem', fontWeight: 'bold' }}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
