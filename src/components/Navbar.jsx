import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [cartCount] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <nav className="navbar">
        <div className="nav-container">
            <Link to="/" className="brand-logo" onClick={closeMenu}>
                <div className="logo-icon"></div>
                Volt<span>Edge</span>
            </Link>
            <ul className={`nav-links ${isMenuOpen ? 'nav-active' : ''}`}>
                <li><Link to="/" onClick={closeMenu} className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
                <li><Link to="/products" onClick={closeMenu} className={location.pathname === '/products' ? 'active' : ''}>Products</Link></li>
                <li><Link to="/about" onClick={closeMenu} className={location.pathname === '/about' ? 'active' : ''}>About</Link></li>
                <li><Link to="/contact" onClick={closeMenu} className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link></li>
            </ul>
            <div className="nav-actions">
                <button className="btn btn-outline" id="cart-btn">Cart ({cartCount})</button>
                <div className="hamburger" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        </div>
    </nav>
  );
};

export default Navbar;
