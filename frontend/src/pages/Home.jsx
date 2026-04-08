import React from 'react';
import { Activity, Server, Layout } from 'lucide-react';

const Home = () => {
    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Dashboard Overview</h1>
                <p style={{ color: 'var(--text-muted)' }}>Welcome to your AI-powered agricultural intelligence platform.</p>
            </div>

            <div className="dashboard-grid">
                <div className="glass-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Activity color="var(--accent)" size={28} />
                        <h3>Active Models</h3>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>2</p>
                    <p style={{ color: 'var(--text-muted)' }}>Random Forest models deployed</p>
                </div>

                <div className="glass-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Server color="var(--success)" size={28} />
                        <h3>System Status</h3>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--success)' }}>Online</p>
                    <p style={{ color: 'var(--text-muted)' }}>FastAPI backend connected</p>
                </div>

                <div className="glass-card">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                        <Layout color="#4a00e0" size={28} />
                        <h3>Modules Available</h3>
                    </div>
                    <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>5</p>
                    <p style={{ color: 'var(--text-muted)' }}>Prediction, Analysis, Compare tools</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
