import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', subject: 'Sales Inquiry', message: '' });
    const [status, setStatus] = useState('');
    const [isOtpStep, setIsOtpStep] = useState(false);
    const [otp, setOtp] = useState('');
    
    const API_URL = import.meta.env.VITE_API_URL || 'https://voltedge-api.onrender.com/api';

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleRequestOtp = async (e) => {
        e.preventDefault();
        setStatus('Sending verification code to your email...');
        
        try {
            const res = await fetch(`${API_URL}/contact/request-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            
            if (res.ok) {
                setStatus('Verification code sent! Please check your inbox.');
                setIsOtpStep(true);
            } else {
                const data = await res.json();
                let errMsg = data.error || 'Failed to request OTP.';
                if (data.details) errMsg += ` (${data.details})`;
                if (data.suggestion) errMsg += ` - ${data.suggestion}`;
                throw new Error(errMsg);
            }
        } catch (err) {
            console.error(err);
            setStatus(`Error: ${err.message}`);
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        setStatus('Verifying code...');
        
        try {
            const res = await fetch(`${API_URL}/contact/verify-otp`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, otp })
            });
            
            const data = await res.json();
            
            if (res.ok) {
                setStatus('Message sent successfully!');
                setFormData({ name: '', email: '', subject: 'Sales Inquiry', message: '' });
                setOtp('');
                setIsOtpStep(false);
            } else {
                setStatus(`Error: ${data.error || 'Invalid or expired OTP code. Please try again.'}`);
            }
        } catch (err) {
            console.error(err);
            setStatus('Error verifying code. Please try again.');
        }
    };

    return (
        <main>
            <header className="page-header" style={{ padding: '8rem 2rem 2rem', textAlign: 'center' }}>
                <h1 className="page-title">Get in <span className="text-gradient">Touch</span></h1>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>For enterprise orders, support, or general inquiries.</p>
                <div style={{ display: 'inline-block', background: 'rgba(0,123,255,0.1)', padding: '0.8rem 2rem', borderRadius: '30px', border: '1px solid var(--accent-blue)', boxShadow: '0 0 15px rgba(0,123,255,0.2)' }}>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 600, marginRight: '0.5rem' }}>📞 Direct Line:</span>
                    <a href="tel:+919492176036" style={{ color: 'var(--accent-cyan)', fontWeight: 700, fontSize: '1.1rem' }}>+91 9492176036</a>
                </div>
            </header>

            <section className="contact-container" style={{ maxWidth: '600px', margin: '0 auto 6rem', padding: '2.5rem', background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
                
                {!isOtpStep ? (
                    <form onSubmit={handleRequestOtp}>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Name</label>
                            <input type="text" name="name" value={formData.name} onChange={handleChange} className="form-control" required placeholder="John Doe" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Email</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} className="form-control" required placeholder="john@enterprise.com" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }} />
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Subject</label>
                            <select name="subject" value={formData.subject} onChange={handleChange} className="form-control" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)' }}>
                                <option>Sales Inquiry</option>
                                <option>Technical Support</option>
                                <option>Partnership</option>
                            </select>
                        </div>
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>Message</label>
                            <textarea name="message" value={formData.message} onChange={handleChange} className="form-control" required placeholder="How can we help you power the edge?" style={{ width: '100%', padding: '0.8rem 1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '6px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', resize: 'vertical', minHeight: '120px' }}></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary btn-submit" style={{ width: '100%', padding: '1rem', fontSize: '1.1rem', marginTop: '1rem' }}>Send Verification Code</button>
                        {status && !isOtpStep && <div style={{ marginTop: '1.5rem', padding: '1rem', background: status.includes('Error') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,128,0.1)', border: `1px solid ${status.includes('Error') ? 'red' : 'green'}`, borderRadius: '6px', color: '#fff', textAlign: 'center' }}>{status}</div>}
                    </form>
                ) : (
                    <form onSubmit={handleVerifyOtp}>
                        <h3 style={{ color: 'var(--text-primary)', textAlign: 'center', marginBottom: '1rem', marginTop: 0 }}>Enter Verification Code</h3>
                        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '2rem' }}>A 6-digit code has been sent to <strong>{formData.email}</strong> to verify this submission.</p>
                        
                        <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                            <input type="text" name="otp" value={otp} onChange={(e) => setOtp(e.target.value)} className="form-control" required placeholder="Enter 6-digit OTP" maxLength="6" style={{ width: '100%', padding: '1rem', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--accent-cyan)', borderRadius: '6px', color: 'var(--text-primary)', fontFamily: 'var(--font-body)', fontSize: '1.2rem', textAlign: 'center', letterSpacing: '4px' }} />
                        </div>
                        
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button type="button" onClick={() => setIsOtpStep(false)} className="btn" style={{ width: '50%', padding: '1rem', fontSize: '1rem', marginTop: '1rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'var(--text-primary)', borderRadius: '30px' }}>Cancel</button>
                            <button type="submit" className="btn btn-primary btn-submit" style={{ width: '50%', padding: '1rem', fontSize: '1rem', marginTop: '1rem' }}>Verify & Send</button>
                        </div>

                        {status && <div style={{ marginTop: '1.5rem', padding: '1rem', background: status.includes('Error') ? 'rgba(255,0,0,0.1)' : 'rgba(0,255,128,0.1)', border: `1px solid ${status.includes('Error') ? 'red' : 'green'}`, borderRadius: '6px', color: '#fff', textAlign: 'center' }}>{status}</div>}
                    </form>
                )}
            </section>
        </main>
    );
};

export default Contact;
