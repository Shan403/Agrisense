import React, { useState } from 'react';
import { Leaf } from 'lucide-react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            onLogin();
        }
    };

    return (
        <div className="auth-page">
            <div className="glass-card auth-card">
                <Leaf size={48} color="#81c784" style={{ marginBottom: '1rem' }} />
                <h1 style={{ marginBottom: '2rem' }}>Agrisense Login</h1>
                <form onSubmit={handleSubmit} autoComplete="off">
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>Username</label>
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={e => setUsername(e.target.value)}
                            placeholder="Enter any username"
                            autoComplete="new-password"
                        />
                    </div>
                    <div className="form-group" style={{ textAlign: 'left' }}>
                        <label>Password</label>
                        <input
                            type="password"
                            className="form-control"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            placeholder="Enter any password"
                            autoComplete="new-password"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                        Login to Dashboard
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
