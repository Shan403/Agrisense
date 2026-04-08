import pickle
import os
import numpy as np

class RecommendationService:
    def __init__(self):
        self.model_path = os.path.join(os.path.dirname(__file__), '../models/crop_model.pkl')
        self.le_path = os.path.join(os.path.dirname(__file__), '../models/label_encoder.pkl')
        self.model = None
        self.le = None

        if os.path.exists(self.model_path) and os.path.exists(self.le_path):
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)
            with open(self.le_path, 'rb') as f:
                self.le = pickle.load(f)

    def recommend_crop(self, N, P, K, temperature, humidity, ph, rainfall):
        if not self.model or not self.le:
            return {"error": "Models not found. Train models first."}
        
        features = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
        
        # Use predict_proba
        probabilities = self.model.predict_proba(features)[0]
        
        # Get top 3 indices
        top_indices = probabilities.argsort()[-3:][::-1]
        
        top_3 = []
        for idx in top_indices:
            crop = self.le.inverse_transform([idx])[0]
            prob = round(float(probabilities[idx]), 4)
            top_3.append({
                "crop": str(crop).capitalize(),
                "probability": prob
            })
            
        return {"top_3": top_3}
