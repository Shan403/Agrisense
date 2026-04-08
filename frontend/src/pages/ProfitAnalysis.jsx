import React, { useState } from 'react';
import { calculateProfit } from '../api/api';
import AIInsightButton from '../components/AIInsightButton';

const ProfitAnalysis = () => {
    const [formData, setFormData] = useState({
        estimated_yield: 10, market_price: 2000, cost: 5000
    });
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: Number(e.target.value) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await calculateProfit(formData);
            setResult(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div className="page-header">
                <h1 className="page-title">Profit Analysis</h1>
                <p style={{ color: 'var(--text-muted)' }}>Calculate estimated farming profit.</p>
            </div>

            <div className="dashboard-grid">
                <div className="glass-card">
                    <h3>Input Parameters</h3>
                    <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                        <div className="form-group">
                            <label>Estimated Yield (units)</label>
                            <input type="number" step="0.1" name="estimated_yield" value={formData.estimated_yield} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Market Price (per unit)</label>
                            <input type="number" step="0.1" name="market_price" value={formData.market_price} onChange={handleChange} className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Total Cost</label>
                            <input type="number" step="0.1" name="cost" value={formData.cost} onChange={handleChange} className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }}>Calculate Profit</button>
                    </form>
                </div>

                {result && (
                    <div className="glass-card">
                        <h3>Calculated Result</h3>
                        <div style={{ marginTop: '2rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span>Gross Revenue:</span>
                                <span style={{ fontWeight: 'bold' }}>${(result.estimated_yield * result.market_price).toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                <span>Total Cost:</span>
                                <span style={{ fontWeight: 'bold', color: 'var(--danger)' }}>-${result.cost.toFixed(2)}</span>
                            </div>
                            <hr style={{ borderColor: 'var(--glass-border)', margin: '1rem 0' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem' }}>
                                <span>Net Profit:</span>
                                <span className={result.profit >= 0 ? "profit-positive" : "profit-negative"} style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
                                    ${result.profit.toFixed(2)}
                                </span>
                            </div>
                        </div>

                        <AIInsightButton
                            prompt={`Provide agricultural insights on a simulated profit of $${result.profit} based on an estimated yield of ${result.estimated_yield}, market price $${result.market_price}, and production cost of $${result.cost}.`}
                            contextData={result}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfitAnalysis;
