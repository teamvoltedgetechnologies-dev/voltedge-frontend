import React, { useState, useEffect } from 'react';

const Products = () => {
    const [filter, setFilter] = useState('All');
    const [productsList, setProductsList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const API_URL = import.meta.env.VITE_API_URL || 'https://voltedge-api.onrender.com/api';

    useEffect(() => {
        console.log('🔍 Fetching products from:', `${API_URL}/products`);
        fetch(`${API_URL}/products`)
            .then(res => {
                console.log('📦 Response status:', res.status, res.ok);
                if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
                return res.json();
            })
            .then(data => {
                console.log('✅ Products loaded:', data.length, 'items');
                setProductsList(data);
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                console.error('❌ Fetch error:', err.message);
                setError(`Error: ${err.message}. Please check your database connection.`);
                setLoading(false);
            });
    }, [API_URL]);

    const handleAddToCart = (e) => {
        const btn = e.target;
        const originalText = btn.textContent;
        btn.textContent = 'Message Sent!';
        btn.style.background = 'var(--accent-blue)';
        btn.style.color = '#000';
        btn.style.borderColor = 'var(--accent-blue)';
        
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = 'transparent';
            btn.style.color = 'var(--text-primary)';
            btn.style.borderColor = 'var(--border-color)';
        }, 1000);
    };

    const filtered = filter === 'All' ? productsList : productsList.filter(p => p.type === filter);

    return (
        <main>
            <header className="page-header" style={{
                padding: '8rem 2rem 4rem',
                textAlign: 'center',
                background: 'linear-gradient(to bottom, rgba(3,8,22,0.8), var(--bg-dark))'
            }}>
                <h1 className="page-title">Hardware <span className="text-gradient">Catalog</span></h1>
                <p>Industrial IoT solutions built for scalability, reliability, and precision.</p>
                {error && <p style={{color: '#ff4d4d', marginTop: '1rem', fontSize: '0.9rem'}}>⚠️ {error}</p>}
            </header>

            <section className="products-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 6rem' }}>
                <div className="filter-nav" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
                    {['All', 'Electrical', 'Machine Health', 'Energy', 'Connectivity', 'Logistics', 'Environmental'].map(f => (
                        <button 
                            key={f} 
                            onClick={() => setFilter(f)} 
                            className={`filter-btn ${filter === f ? 'active' : ''}`}
                            style={{
                                background: 'transparent',
                                border: '1px solid var(--border-color)',
                                color: filter === f ? 'var(--accent-blue)' : 'var(--text-secondary)',
                                padding: '0.5rem 1.5rem',
                                borderRadius: '20px',
                                cursor: 'pointer',
                                transition: 'var(--transition)',
                                borderColor: filter === f ? 'var(--accent-blue)' : 'var(--border-color)'
                            }}
                        >{f}</button>
                    ))}
                </div>

                {loading ? (
                    <div style={{textAlign: 'center', color: 'var(--accent-blue)', padding: '4rem'}}>Loading components from database...</div>
                ) : filtered.length === 0 ? (
                    <div style={{textAlign: 'center', color: 'var(--text-secondary)', padding: '4rem'}}>
                        <p>No products available at the moment.</p>
                        {error && <p style={{color: '#ff4d4d', marginTop: '1rem'}}>⚠️ {error}</p>}
                    </div>
                ) : (
                    <div className="grid-container">
                        {filtered.map(product => (
                            <div className="product-card" key={product._id || product.id}>
                                <div className={`card-image ${product.bgClass}`}><div className={`device-icon ${product.iconClass}`}></div></div>
                                <div className="card-details">
                                    <span className="category">{product.category}</span>
                                    <h3>{product.name}</h3>
                                    <p>{product.desc}</p>
                                    <div className="price-action">
                                        <span className="price">{product.price}</span>
                                        <button className="add-to-cart" onClick={handleAddToCart} style={{ padding: '0.5rem 1rem', background: 'transparent', border: '1px solid var(--border-color)', color: 'var(--text-primary)', borderRadius: '4px', cursor: 'pointer', transition: 'var(--transition)' }}>Request Quote</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
};

export default Products;
