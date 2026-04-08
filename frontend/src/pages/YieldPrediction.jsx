import React, { useState } from 'react';
import { predictYield } from '../api/api';
import AIInsightButton from '../components/AIInsightButton';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const YieldPrediction = () => {
    const [formData, setFormData] = useState({
        crop: 'Rice', season: 'Kharif     ', state: 'Assam', area: 100000,
        rainfall: 2000.0, fertilizer: 7000000, pesticide: 20000
    });
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        let value = e.target.value;
        if (e.target.type === 'number') {
            value = Number(value);
        }
        setFormData({ ...formData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await predictYield(formData);
            setResult(res.data.estimated_yield);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Yield Prediction</h1>
                <p style={{ color: 'var(--text-muted)' }}>Estimate your crop yield based on field data.</p>
            </div>

            <div className="dashboard-grid">
                <div className="glass-card">
                    <h3>Input Parameters</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label>Crop</label>
                                <input type="text" name="crop" value={formData.crop} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Season</label>
                                <input type="text" name="season" value={formData.season} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>State</label>
                                <input type="text" name="state" value={formData.state} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Area (Hectares)</label>
                                <input type="number" name="area" value={formData.area} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Annual Rainfall (mm)</label>
                                <input type="number" name="rainfall" value={formData.rainfall} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Fertilizer (kg)</label>
                                <input type="number" name="fertilizer" value={formData.fertilizer} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Pesticide (kg)</label>
                                <input type="number" name="pesticide" value={formData.pesticide} onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Predict Yield</button>
                    </form>
                </div>

                {result !== null && (
                    <div className="glass-card">
                        <h3>Estimated Yield</h3>
                        <p className="result-display" style={{ color: 'var(--accent)', fontSize: '2.5rem', fontWeight: 'bold' }}>
                            {result} <span style={{ fontSize: '1rem', color: 'var(--text-muted)' }}>metric tons</span>
                        </p>

                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={[{ name: 'Yield', value: result }]}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                    <XAxis dataKey="name" stroke="white" />
                                    <YAxis stroke="white" />
                                    <Tooltip wrapperStyle={{ backgroundColor: '#1e1e1e', border: 'none' }} />
                                    <Bar dataKey="value" fill="var(--secondary-color)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>

                        <AIInsightButton
                            prompt={`Explain what an estimated yield of ${result} metric tons means for ${formData.crop} over an area of ${formData.area} hectares in ${formData.state} during ${formData.season}. Are there any tips to improve this?`}
                            contextData={{ result, formData }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default YieldPrediction;
