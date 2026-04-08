import pandas as pd
import numpy as np
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
import pickle
import os

def train():
    data_path = os.path.join(os.path.dirname(__file__), '../app/data/crop_recommendation.csv')
    model_dir = os.path.join(os.path.dirname(__file__), '../app/models')
    
    if not os.path.exists(model_dir):
        os.makedirs(model_dir)

    df = pd.read_csv(data_path)
    X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
    y = df['label']

    le = LabelEncoder()
    y_encoded = le.fit_transform(y)

    clf = RandomForestClassifier(n_estimators=100, random_state=42)
    clf.fit(X, y_encoded)

    with open(os.path.join(model_dir, 'crop_model.pkl'), 'wb') as f:
        pickle.dump(clf, f)

    with open(os.path.join(model_dir, 'label_encoder.pkl'), 'wb') as f:
        pickle.dump(le, f)
        
    print("Classifier trained successfully!")

if __name__ == "__main__":
    train()
