import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Home from './pages/Home';
import CropRecommendation from './pages/CropRecommendation';
import YieldPrediction from './pages/YieldPrediction';
import ProfitAnalysis from './pages/ProfitAnalysis';
import RiskAssessment from './pages/RiskAssessment';
import CompareCrops from './pages/CompareCrops';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem('agrisense_auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    localStorage.setItem('agrisense_auth', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('agrisense_auth');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <div className="app-container">
          <Navbar logout={logout} />
          <div className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recommend" element={<CropRecommendation />} />
              <Route path="/yield" element={<YieldPrediction />} />
              <Route path="/profit" element={<ProfitAnalysis />} />
              <Route path="/risk" element={<RiskAssessment />} />
              <Route path="/compare" element={<CompareCrops />} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </div>
      ) : (
        <Routes>
          <Route path="/login" element={<Login onLogin={login} />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      )}
    </Router>
  );
}

export default App;
