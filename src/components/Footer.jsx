import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer" style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--border-color)' }}>
        <div className="footer-grid">
            <div className="footer-brand" style={{ textAlign: 'left' }}>
                <Link to="/" className="brand-logo">Volt<span>Edge</span></Link>
                <p>VoltEdge Technologies Pvt Ltd. Advanced Industrial IoT solutions and smart monitoring systems.</p>
                <p style={{ marginTop: '0.5rem', color: 'var(--text-secondary)' }}>📍 Hyderabad, Telangana</p>
                <p style={{ marginTop: '0.2rem', color: 'var(--text-secondary)' }}>📞 <a href="tel:+919492176036" style={{ color: 'var(--accent-cyan)' }}>+91 9492176036</a></p>
            </div>
            <div className="footer-links" style={{ textAlign: 'left' }}>
                <h4>Focus Areas</h4>
                <ul>
                    <li><Link to="/products">Electrical Monitoring</Link></li>
                    <li><Link to="/products">Machine Health</Link></li>
                    <li><Link to="/products">Energy Management</Link></li>
                    <li><Link to="/products">Logistics Tracking</Link></li>
                </ul>
            </div>
            <div className="footer-links" style={{ textAlign: 'left' }}>
                <h4>Company</h4>
                <ul>
                    <li><Link to="/about">About Us</Link></li>
                    <li><a href="https://www.linkedin.com/company/voltedge-technologies-pvt-ltd/" target="_blank" rel="noreferrer">LinkedIn</a></li>
                    <li><Link to="/contact">Contact</Link></li>
                </ul>
            </div>

        </div>
    </footer>
  );
};

export default Footer;
