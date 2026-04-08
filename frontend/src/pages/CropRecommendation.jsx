import React, { useState } from 'react';
import { recommendCrop } from '../api/api';
import AIInsightButton from '../components/AIInsightButton';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#2e7d32', '#81c784', '#ffb300'];

const CropRecommendation = () => {
    const [formData, setFormData] = useState({
        N: 90, P: 42, K: 43, temperature: 20.8, humidity: 82, ph: 6.5, rainfall: 202.9
    });
    const [results, setResults] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await recommendCrop(formData);
            setResults(res.data.top_3);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Crop Recommendation</h1>
                <p style={{ color: 'var(--text-muted)' }}>Predict the top 3 best matching crops based on soil and climate.</p>
            </div>

            <div className="dashboard-grid">
                <div className="glass-card">
                    <h3>Input Parameters</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                            <div className="form-group">
                                <label>Nitrogen (N)</label>
                                <input type="number" name="N" value={formData.N} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Phosphorous (P)</label>
                                <input type="number" name="P" value={formData.P} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Potassium (K)</label>
                                <input type="number" name="K" value={formData.K} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Temperature (°C)</label>
                                <input type="number" step="0.1" name="temperature" value={formData.temperature} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>Humidity (%)</label>
                                <input type="number" step="0.1" name="humidity" value={formData.humidity} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group">
                                <label>pH</label>
                                <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} className="form-control" />
                            </div>
                            <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                                <label>Rainfall (mm)</label>
                                <input type="number" step="0.1" name="rainfall" value={formData.rainfall} onChange={handleChange} className="form-control" />
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Predict Crops</button>
                    </form>
                </div>

                {results && (
                    <div className="glass-card">
                        <h3>Prediction Results</h3>
                        <div className="chart-container">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={results}
                                        dataKey="probability"
                                        nameKey="crop"
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        label
                                    >
                                        {results.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip formatter={(value) => `${(value * 100).toFixed(1)}%`} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            {results.map((r, i) => (
                                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem', borderBottom: '1px solid var(--glass-border)' }}>
                                    <span>{i + 1}. {r.crop}</span>
                                    <span style={{ fontWeight: 'bold', color: COLORS[i] }}>{(r.probability * 100).toFixed(1)}%</span>
                                </div>
                            ))}
                        </div>

                        <AIInsightButton
                            prompt={`Explain why ${results[0].crop} is the most recommended crop based on N:${formData.N} P:${formData.P} K:${formData.K}, temp:${formData.temperature}°C, humidity:${formData.humidity}%, ph:${formData.ph}, and rainfall:${formData.rainfall}mm.`}
                            contextData={results}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default CropRecommendation;
