import React from 'react';

const About = () => {
    return (
        <main>
            <header className="page-header" style={{ padding: '8rem 2rem 4rem', textAlign: 'center' }}>
                <h1 className="page-title">Innovating <span className="text-gradient">Industrial IoT</span></h1>
            </header>

            <section className="about-content" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem 6rem', fontSize: '1.1rem', color: 'var(--text-secondary)' }}>
                <p>VoltEdge Technologies Pvt Ltd is an emerging technology company based in Hyderabad, Telangana. We are focused on developing advanced Industrial IoT solutions and smart monitoring systems designed to push the boundaries of embedded systems innovation.</p>
                
                <div className="mission-box" style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--accent-purple)', margin: '2rem 0', boxShadow: '0 0 20px rgba(138,43,226,0.1)', position: 'relative', overflow: 'hidden' }}>
                    <h2 style={{ marginTop: 0, color: 'var(--text-primary)', marginBottom: '1rem' }}>Our Mission</h2>
                    <p>To deliver reliable and scalable technology that helps industries monitor their systems in real time, improve operational efficiency, and prevent equipment failures through predictive insights.</p>
                </div>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Our Specialization</h2>
                <p>We specialize in designing intelligent hardware devices catering specifically to core industrial needs. Our primary focus areas include:</p>
                <ul style={{ listStyleType: 'disc', paddingLeft: '2rem', marginTop: '1rem', color: 'var(--text-primary)' }}>
                    <li><strong>Electrical Monitoring:</strong> Precision tracking of power metrics.</li>
                    <li><strong>Machine Health Analysis:</strong> Predictive diagnostics for heavy machinery.</li>
                    <li><strong>Energy Management:</strong> Optimizing industrial power consumption.</li>
                    <li><strong>Logistics Tracking:</strong> Real-time visibility into asset movement.</li>
                </ul>

                <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem', marginBottom: '1rem' }}>Built for Extremes</h2>
                <p>Designed for the harshest industrial environments, from rapid thermal fluctuations to heavy vibration zones, VoltEdge hardware delivers uninterrupted performance.</p>
            </section>
        </main>
    );
};

export default About;
