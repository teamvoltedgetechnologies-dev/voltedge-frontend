import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL || 'https://voltedge-api.onrender.com/api';

    useEffect(() => {
        fetch(`${API_URL}/products`)
            .then(res => res.json())
            .then(data => {
                // Grab the first 3 products dynamically from MongoDB for the featured section
                setFeaturedProducts(data.slice(0, 3));
                setLoading(false);
                setError(null);
            })
            .catch(err => {
                console.error(err);
                setError('Unable to load featured products from database. Please check your connection.');
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

    return (
        <main>
            {/* 1. Hero Section */}
            <header className="hero" id="home" style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                <div className="hero-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '900px', margin: '0 auto' }}>
                    <div className="tagline" style={{ color: 'var(--accent-cyan)', fontSize: '1rem', letterSpacing: '3px' }}>VoltEdge Technologies Pvt Ltd • Industrial IoT</div>
                    <h1 className="hero-title">Embedded Systems <br/><span className="text-gradient">Innovation</span></h1>
                    <p className="hero-subtitle">
                        We deliver advanced hardware solutions for precise electrical monitoring, predictive machine health analysis, and comprehensive enterprise energy management. Shift your infrastructure from reactive maintenance to proactive, real-time control.
                    </p>
                    <div className="hero-cta" style={{ justifyContent: 'center', gap: '1.5rem' }}>
                        <Link to="/products" className="btn btn-primary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>Explore Solutions</Link>
                        <a href="#featured" className="btn btn-secondary" style={{ padding: '0.8rem 2rem', fontSize: '1.1rem' }}>Learn More</a>
                    </div>
                </div>
            </header>

            {/* 3. Industries/Tailored Solutions Grid */}
            <section className="industries-section" style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
                <div className="section-header">
                    <h2>Tailored Solutions for Every Need</h2>
                    <p>VoltEdge architecture scales seamlessly across heavy enterprise applications.</p>
                </div>
                <div className="industry-grid">
                    <div className="industry-card">
                        <div className="ind-icon">⚡</div>
                        <h3>Electrical Grids</h3>
                        <p>High voltage substation monitoring and precise energy optimization.</p>
                    </div>
                    <div className="industry-card">
                        <div className="ind-icon">🏭</div>
                        <h3>Manufacturing</h3>
                        <p>Predictive analytics for heavy motors and advanced conveyor systems.</p>
                    </div>
                    <div className="industry-card">
                        <div className="ind-icon">❄️</div>
                        <h3>Cold Chain Logistics</h3>
                        <p>GPS and thermal tracking to protect sensitive pharmaceutical shipments.</p>
                    </div>
                    <div className="industry-card">
                        <div className="ind-icon">🏢</div>
                        <h3>Smart Infrastructure</h3>
                        <p>Cloud-connected energy management for sprawling commercial real estate.</p>
                    </div>
                </div>
            </section>

            {/* 4. Featured Products Showcase */}
            <section className="featured" id="featured">
                <div className="section-header">
                    <h2>Featured Hardware</h2>
                    <p style={{ color: 'var(--accent-blue)' }}>Live from MongoDB • Designed for real-time industrial intelligence.</p>
                    {error && <p style={{color: '#ff4d4d', marginTop: '1rem', fontSize: '0.9rem'}}>⚠️ {error}</p>}
                </div>
                {loading ? (
                    <div style={{textAlign: 'center', color: 'var(--accent-blue)', padding: '2rem'}}>Loading database clusters...</div>
                ) : error ? (
                    <div style={{textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem'}}>
                        <p>No featured products available at the moment.</p>
                    </div>
                ) : (
                    <div className="grid-container">
                        {featuredProducts.map((product) => (
                            <div className="product-card" key={product._id || product.id}>
                                <div className={`card-image ${product.bgClass}`}><div className={`device-icon ${product.iconClass}`}></div></div>
                                <div className="card-details">
                                    <span className="category">{product.category}</span>
                                    <h3>{product.name}</h3>
                                    <p>{product.desc}</p>
                                    <div className="price-action">
                                        <Link to="/contact" className="add-to-cart" onClick={handleAddToCart} style={{padding:'0.5rem 1rem'}}>Request Quote</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* 5. Value Proposition / Why Choose Us */}
            <section className="features-section" style={{ backgroundColor: 'rgba(3, 8, 22, 0.8)', padding: '6rem 2rem', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div className="section-header">
                    <h2>Why Choose VoltEdge?</h2>
                    <p>Enterprise-ready platforms trusted globally.</p>
                </div>
                <div className="features-grid" style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div className="feature-item">
                        <h4 style={{color: 'var(--accent-cyan)', marginBottom: '0.5rem'}}>Cloud-Based Real-Time Monitoring</h4>
                        <p style={{color: 'var(--text-secondary)'}}>End-to-end encrypted dashboards with 100% uptime SLA.</p>
                    </div>
                    <div className="feature-item">
                        <h4 style={{color: 'var(--accent-cyan)', marginBottom: '0.5rem'}}>ISO Certified Quality</h4>
                        <p style={{color: 'var(--text-secondary)'}}>Rigorous physical tolerance testing for intense industrial stress.</p>
                    </div>
                    <div className="feature-item">
                        <h4 style={{color: 'var(--accent-cyan)', marginBottom: '0.5rem'}}>Multiple Connectivity Options</h4>
                        <p style={{color: 'var(--text-secondary)'}}>LTE, Wi-Fi, LoRaWAN, and Ethernet integration right out of the box.</p>
                    </div>
                    <div className="feature-item">
                        <h4 style={{color: 'var(--accent-cyan)', marginBottom: '0.5rem'}}>High Precision Sensors</h4>
                        <p style={{color: 'var(--text-secondary)'}}>Calibrated multi-channel telemetry for micro-metric structural shifts.</p>
                    </div>
                </div>
            </section>

            {/* 6. Pre-Footer CTA */}
            <section className="cta-section" style={{ textAlign: 'center', padding: '6rem 2rem', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Ready to Implement IoT Monitoring in Your Organization?</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', fontSize: '1.1rem' }}>Connect with our engineering team to design a pilot program tailored exactly to your electrical or mechanical infrastructure.</p>
                <Link to="/contact" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>Contact Engineering Team</Link>
            </section>

        </main>
    );
};

export default Home;
