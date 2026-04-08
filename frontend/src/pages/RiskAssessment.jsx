import React, { useState } from 'react';
import { assessRisk } from '../api/api';
import AIInsightButton from '../components/AIInsightButton';

const RiskAssessment = () => {
    const [formData, setFormData] = useState({
        rainfall: 1500, fertilizer: 100
    });
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await assessRisk(formData);
            setResult(res.data.risk_level);
        } catch (err) {
            console.error(err);
        }
    };

    const getRiskColor = (level) => {
        if (level === 'High') return 'var(--danger)';
        if (level === 'Medium') return 'var(--accent)';
        return 'var(--success)';
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Risk Assessment</h1>
                <p style={{ color: 'var(--text-muted)' }}>Display a risk level indicator based on field factors.</p>
            </div>

            <div className="dashboard-grid">
                <div className="glass-card">
                    <h3>Input Parameters</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                        <div className="form-group">
                            <label>Annual Rainfall (mm)</label>
                            <input type="number" step="0.1" name="rainfall" value={formData.rainfall} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Fertilizer Input (kg)</label>
                            <input type="number" step="0.1" name="fertilizer" value={formData.fertilizer} onChange={handleChange} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Assess Risk</button>
                    </form>
                </div>

                {result && (
                    <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h3>Risk Indicator</h3>

                        <div style={{
                            width: '150px', height: '150px', borderRadius: '50%',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            border: `10px solid ${getRiskColor(result)}`,
                            marginTop: '2rem', marginBottom: '2rem',
                            boxShadow: `0 0 20px ${getRiskColor(result)}50`
                        }}>
                            <span style={{ fontSize: '2rem', fontWeight: 'bold', color: getRiskColor(result) }}>{result}</span>
                        </div>

                        <AIInsightButton
                            prompt={`Explain why an agricultural risk assessment tool would return a ${result} risk level for a crop receiving ${formData.rainfall}mm of rainfall and ${formData.fertilizer}kg of fertilizer.`}
                            contextData={{ result, formData }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default RiskAssessment;
