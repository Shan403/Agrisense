# Agrisense
Agrisense is an AI-powered agricultural platform that transforms soil and environmental data into actionable insights. Using ML models, it recommends optimal crops, predicts yield, analyzes profit, and assesses risks. Built with FastAPI and React, it integrates GenAI to deliver clear, strategic farming guidance.

## Project Structure
- backend: FastAPI + Scikit-learn + Gemini GenAI
- frontend: React + Vite + Axios + Recharts
- models: Random Forest based inference
- data: Agriculture datasets

## Features
- **Crop Recommendation**: Predict best matching crops based on soil and climate
- **Yield Prediction**: Estimate crop yield based on field data
- **Profit Analysis**: Calculate estimated farming profit
- **Risk Assessment**: Display a risk level indicator based on field factors
- **Compare Crops**: Compare the profitability of two crops side-by-side
- **AI Insights**: Generate insights directly from results using Gemini AI

## Requirements
- Python 3.9+
- Node.js 18+

## Setup & Run
### Backend
```bash
cd backend
pip install -r requirements.txt
python run.py
```
*Note: Before running the server, please train the models using files in `backend/training/`*
```bash
python backend/training/train_classifier.py
python backend/training/train_regressor.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
