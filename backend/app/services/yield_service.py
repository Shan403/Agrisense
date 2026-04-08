import pickle
import os
import pandas as pd

class YieldService:
    def __init__(self):
        self.model_path = os.path.join(os.path.dirname(__file__), '../models/yield_model.pkl')
        self.model = None

        if os.path.exists(self.model_path):
            with open(self.model_path, 'rb') as f:
                self.model = pickle.load(f)

    def predict_yield(self, crop, season, state, area, rainfall, fertilizer, pesticide):
        if not self.model:
            return {"error": "Yield model not found. Train model first."}
        
        input_df = pd.DataFrame([{
            "Crop": crop,
            "Season": season,
            "State": state,
            "Area": area,
            "Annual_Rainfall": rainfall,
            "Fertilizer": fertilizer,
            "Pesticide": pesticide
        }])
        
        pred = self.model.predict(input_df)[0]
        return {"estimated_yield": round(float(pred), 2)}
