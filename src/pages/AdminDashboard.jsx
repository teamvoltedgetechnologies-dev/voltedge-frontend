import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || 'https://voltedge-api.onrender.com/api';

    // Form State
    const [newProduct, setNewProduct] = useState({
        type: 'Electrical',
        category: '',
        name: '',
        desc: '',
        price: 'Inquire',
        bgClass: 'bg-blue',
        iconClass: 'node'
    });

    const fetchProducts = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/products`);
            const data = await res.json();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error('Failed to fetch products', err);
        }
    }, [API_URL]);

    useEffect(() => {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            navigate('/admin'); // Redirect if no token
            return;
        }
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchProducts();
    }, [navigate, fetchProducts]);

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/');
    };

    const handleChange = (e) => setNewProduct({ ...newProduct, [e.target.name]: e.target.value });

    const handleAddProduct = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('adminToken');
        
        try {
            const res = await fetch(`${API_URL}/products`, {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` 
                },
                body: JSON.stringify(newProduct)
            });

            if (res.ok) {
                // Reset form and reload list
                setNewProduct({ ...newProduct, name: '', category: '', desc: '' });
                fetchProducts();
            } else {
                alert('Failed to add product (unauthorized or server error)');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure you want to permanently delete this product?")) return;
        
        const token = localStorage.getItem('adminToken');
        try {
            const res = await fetch(`${API_URL}/products/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {
                fetchProducts(); // Refresh list
            } else {
                alert('Deletion failed (unauthorized or server error)');
            }
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '10rem 2rem' }}>Loading secure panel...</div>;

    return (
        <main style={{ padding: '8rem 2rem 4rem', maxWidth: '1200px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem' }}>
                <h1 style={{ color: 'var(--accent-cyan)' }}>Admin Control Panel</h1>
                <button onClick={handleLogout} className="btn btn-outline" style={{ padding: '0.5rem 1rem' }}>Logout</button>
            </div>

            <section style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 350px) 1fr', gap: '3rem' }}>
                {/* Form Column */}
                <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', height: 'fit-content' }}>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Add New Hardware</h3>
                    
                    <form onSubmit={handleAddProduct}>
                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '0.3rem' }}>Type Filter</label>
                            <select name="type" value={newProduct.type} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }}>
                                <option>Electrical</option>
                                <option>Machine Health</option>
                                <option>Energy</option>
                                <option>Connectivity</option>
                                <option>Logistics</option>
                                <option>Environmental</option>
                            </select>
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Category Label</label>
                            <input name="category" value={newProduct.category} onChange={handleChange} required style={{ width: '100%', padding: '0.6rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }} placeholder="e.g. GPS Tracking" />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Hardware Name</label>
                            <input name="name" value={newProduct.name} onChange={handleChange} required style={{ width: '100%', padding: '0.6rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }} placeholder="e.g. Sentinel X1" />
                        </div>

                        <div style={{ marginBottom: '1rem' }}>
                            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Description</label>
                            <textarea name="desc" value={newProduct.desc} onChange={handleChange} required style={{ width: '100%', padding: '0.6rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px', minHeight: '80px', resize: 'vertical' }} placeholder="Technical specs..."></textarea>
                        </div>

                        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Color</label>
                                <select name="bgClass" value={newProduct.bgClass} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }}>
                                    <option value="bg-blue">Blue (Power/Energy)</option>
                                    <option value="bg-purple">Purple (Health/Env)</option>
                                    <option value="bg-cyan">Cyan (Gateway/Log)</option>
                                </select>
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', display: 'block' }}>Icon</label>
                                <select name="iconClass" value={newProduct.iconClass} onChange={handleChange} style={{ width: '100%', padding: '0.6rem', background: 'rgba(0,0,0,0.5)', border: '1px solid var(--border-color)', color: '#fff', borderRadius: '4px' }}>
                                    <option value="node">Node</option>
                                    <option value="sensor">Sensor</option>
                                    <option value="hub">Hub</option>
                                </select>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>+ Add Product</button>
                    </form>
                </div>

                {/* List Column */}
                <div>
                    <h3 style={{ marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>Live Catalog ({products.length})</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {products.map(p => (
                            <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.1)', padding: '1rem', borderRadius: '8px' }}>
                                <div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>{p.type} • {p.category}</div>
                                    <h4 style={{ margin: '0.2rem 0', fontSize: '1.1rem' }}>{p.name}</h4>
                                    <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '300px' }}>{p.desc}</div>
                                </div>
                                <button 
                                    onClick={() => handleDelete(p._id)} 
                                    style={{ background: 'rgba(255,0,0,0.1)', color: '#ff4d4d', border: '1px solid #ff4d4d', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.2s' }}
                                    onMouseOver={(e) => { e.target.style.background = '#ff4d4d'; e.target.style.color = '#fff'; }}
                                    onMouseOut={(e) => { e.target.style.background = 'rgba(255,0,0,0.1)'; e.target.style.color = '#ff4d4d'; }}
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
};

export default AdminDashboard;
