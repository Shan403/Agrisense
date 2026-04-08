import React, { useState } from 'react';
import { Sparkles, Loader } from 'lucide-react';
import { getAIInsight } from '../api/api';

const AIInsightButton = ({ prompt, contextData }) => {
    const [insight, setInsight] = useState('');
    const [loading, setLoading] = useState(false);

    const fetchInsight = async () => {
        setLoading(true);
        try {
            const fullPrompt = `${prompt} Context data: ${JSON.stringify(contextData)}`;
            const response = await getAIInsight(fullPrompt);
            setInsight(response.data.insight);
        } catch (error) {
            setInsight('Failed to load AI insight. Please check your backend connection and API key.');
        }
        setLoading(false);
    };

    return (
        <div style={{ marginTop: '2rem' }}>
            <button className="btn btn-insight" onClick={fetchInsight} disabled={loading}>
                {loading ? <Loader className="spin" size={18} /> : <Sparkles size={18} />}
                Get AI Insight
            </button>

            {insight && (
                <div className="insight-box">
                    <strong>AI Insight:</strong>
                    <p style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>{insight}</p>
                </div>
            )}
        </div>
    );
};

export default AIInsightButton;
