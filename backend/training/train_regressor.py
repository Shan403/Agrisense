import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestRegressor
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder
from sklearn.pipeline import Pipeline
import pickle
import os

def train():
    data_path = os.path.join(os.path.dirname(__file__), '../app/data/crop_yield.csv')
    model_dir = os.path.join(os.path.dirname(__file__), '../app/models')

    if not os.path.exists(model_dir):
        os.makedirs(model_dir)

    df = pd.read_csv(data_path)
    
    # We predict Yield based on other features except Production and Crop_Year
    categorical_features = ['Crop', 'Season', 'State']
    numeric_features = ['Area', 'Annual_Rainfall', 'Fertilizer', 'Pesticide']
    
    X = df[categorical_features + numeric_features]
    y = df['Yield']

    preprocessor = ColumnTransformer(
        transformers=[
            ('cat', OneHotEncoder(handle_unknown='ignore'), categorical_features)
        ],
        remainder='passthrough'
    )

    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('regressor', RandomForestRegressor(n_estimators=50, random_state=42))
    ])

    pipeline.fit(X, y)

    with open(os.path.join(model_dir, 'yield_model.pkl'), 'wb') as f:
        pickle.dump(pipeline, f)

    print("Regressor trained successfully!")

if __name__ == "__main__":
    train()
