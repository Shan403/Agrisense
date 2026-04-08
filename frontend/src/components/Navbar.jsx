import React from 'react';
import { NavLink } from 'react-router-dom';
import { Leaf, Navigation, ArrowRight, DollarSign, Umbrella, ArrowLeftRight, LogOut, Home } from 'lucide-react';

const Navbar = ({ logout }) => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <Leaf style={{ marginRight: '10px' }} />
                Agrisense
            </div>
            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <Home size={20} />
                    Home
                </NavLink>
                <NavLink to="/recommend" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <Navigation size={20} />
                    Recommendation
                </NavLink>
                <NavLink to="/yield" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <ArrowRight size={20} />
                    Yield Prediction
                </NavLink>
                <NavLink to="/profit" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <DollarSign size={20} />
                    Profit Analysis
                </NavLink>
                <NavLink to="/risk" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <Umbrella size={20} />
                    Risk Assessment
                </NavLink>
                <NavLink to="/compare" className={({ isActive }) => isActive ? "nav-item active" : "nav-item"}>
                    <ArrowLeftRight size={20} />
                    Compare Crops
                </NavLink>

                <a href="#" onClick={logout} className="nav-item logout">
                    <LogOut size={20} />
                    Logout
                </a>
            </div>
        </div>
    );
};

export default Navbar;
