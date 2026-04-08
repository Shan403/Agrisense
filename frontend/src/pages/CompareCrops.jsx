import React, { useState } from 'react';
import { compareCrops } from '../api/api';
import AIInsightButton from '../components/AIInsightButton';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';

const CompareCrops = () => {
    const [formData, setFormData] = useState({
        crop1: { name: 'Rice', estimated_yield: 25, market_price: 200, cost: 2000 },
        crop2: { name: 'Maize', estimated_yield: 30, market_price: 150, cost: 1800 }
    });
    const [result, setResult] = useState(null);

    const handleCrop1Change = (e) => {
        let value = e.target.value;
        if (e.target.type === 'number') value = Number(value);
        setFormData({ ...formData, crop1: { ...formData.crop1, [e.target.name]: value } });
    };

    const handleCrop2Change = (e) => {
        let value = e.target.value;
        if (e.target.type === 'number') value = Number(value);
        setFormData({ ...formData, crop2: { ...formData.crop2, [e.target.name]: value } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await compareCrops(formData);
            setResult(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const chartData = result ? [
        {
            name: 'Profit Comparison',
            [result.crop1.name]: result.crop1.profit,
            [result.crop2.name]: result.crop2.profit
        }
    ] : [];

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Compare Crops</h1>
                <p style={{ color: 'var(--text-muted)' }}>Compare the profitability of two crops side-by-side.</p>
            </div>

            <div className="dashboard-grid">
                <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
                    <form onSubmit={handleSubmit}>
                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>

                            {/* Crop 1 */}
                            <div style={{ flex: 1, minWidth: '300px', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Crop 1</h3>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" value={formData.crop1.name} onChange={handleCrop1Change} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Estimated Yield</label>
                                    <input type="number" step="0.1" name="estimated_yield" value={formData.crop1.estimated_yield} onChange={handleCrop1Change} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Market Price</label>
                                    <input type="number" step="0.1" name="market_price" value={formData.crop1.market_price} onChange={handleCrop1Change} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Total Cost</label>
                                    <input type="number" step="0.1" name="cost" value={formData.crop1.cost} onChange={handleCrop1Change} className="form-control" />
                                </div>
                            </div>

                            {/* Crop 2 */}
                            <div style={{ flex: 1, minWidth: '300px', padding: '1rem', border: '1px solid var(--glass-border)', borderRadius: '8px' }}>
                                <h3 style={{ marginBottom: '1rem' }}>Crop 2</h3>
                                <div className="form-group">
                                    <label>Name</label>
                                    <input type="text" name="name" value={formData.crop2.name} onChange={handleCrop2Change} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Estimated Yield</label>
                                    <input type="number" step="0.1" name="estimated_yield" value={formData.crop2.estimated_yield} onChange={handleCrop2Change} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Market Price</label>
                                    <input type="number" step="0.1" name="market_price" value={formData.crop2.market_price} onChange={handleCrop2Change} className="form-control" />
                                </div>
                                <div className="form-group">
                                    <label>Total Cost</label>
                                    <input type="number" step="0.1" name="cost" value={formData.crop2.cost} onChange={handleCrop2Change} className="form-control" />
                                </div>
                            </div>

                        </div>
                        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                            <button type="submit" className="btn btn-primary" style={{ padding: '1rem 3rem' }}>Compare Profitability</button>
                        </div>
                    </form>
                </div>

                {result && (
                    <div className="glass-card" style={{ gridColumn: '1 / -1' }}>
                        <h3>Comparison Results</h3>

                        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
                            <div style={{ flex: 1 }}>
                                <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                                    Status: <strong>{result.comparison.better_crop}</strong> is more profitable by <strong>${result.comparison.profit_difference}</strong>.
                                </p>

                                <AIInsightButton
                                    prompt={`Act as an agricultural economics expert. Compare ${result.crop1.name} (Profit: $${result.crop1.profit}) and ${result.crop2.name} (Profit: $${result.crop2.profit}). Explain the economic factors behind this difference and give advice on which one a farmer should plant.`}
                                    contextData={result}
                                />
                            </div>

                            <div style={{ flex: 1, minWidth: '300px' }} className="chart-container">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={chartData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                        <XAxis dataKey="name" stroke="white" />
                                        <YAxis stroke="white" />
                                        <Tooltip wrapperStyle={{ backgroundColor: '#1e1e1e', border: 'none' }} />
                                        <Legend />
                                        <Bar dataKey={result.crop1.name} fill="var(--primary-color)" radius={[4, 4, 0, 0]} />
                                        <Bar dataKey={result.crop2.name} fill="#4db6ac" radius={[4, 4, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompareCrops;
