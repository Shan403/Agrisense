class RiskService:
    def calculate_risk(self, rainfall, fertilizer):
        # A simple dummy heuristic for risk calculation
        risk_score = 0

        # Excessive or very low rainfall might induce risk
        if rainfall < 500 or rainfall > 2500:
            risk_score += 2
        elif rainfall < 1000 or rainfall > 2000:
            risk_score += 1
            
        # Too little fertilizer could mean lower yield, thus higher risk
        if fertilizer < 50:
            risk_score += 2
        elif fertilizer < 100:
            risk_score += 1
            
        if risk_score >= 3:
            return {"risk_level": "High"}
        elif risk_score == 2:
            return {"risk_level": "Medium"}
        else:
            return {"risk_level": "Low"}
