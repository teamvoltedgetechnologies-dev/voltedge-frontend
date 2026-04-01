import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminAuth = () => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'https://voltedge-api.onrender.com/api';

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const res = await fetch(`${API_URL}/admin/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                localStorage.setItem('adminToken', data.token);
                navigate('/admin/dashboard');
            } else {
                setError(data.error || 'Login failed.');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('Error connecting to server.');
        }
    };

    return (
        <main style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ maxWidth: '400px', width: '100%', background: 'var(--bg-card)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--accent-cyan)' }}>Admin Portal</h2>
                
                <form onSubmit={handleLogin}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Master Password</label>
                        <input 
                            type="password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                            style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: '#fff' }} 
                            placeholder="Enter password..."
                        />
                    </div>
                    
                    {error && <p style={{ color: '#ff4d4d', fontSize: '0.9rem', marginBottom: '1rem', textAlign: 'center' }}>{error}</p>}
                    
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '1rem' }}>Secure Login</button>
                </form>
            </div>
        </main>
    );
};

export default AdminAuth;
