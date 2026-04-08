<div align="center">
  <h1>🌱 Agrisense</h1>
  <p><strong>An Enterprise-Grade AI-Powered Agricultural Intelligence Platform</strong></p>
  
  [![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
  [![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
  [![Scikit-Learn](https://img.shields.io/badge/scikit--learn-%23F7931E.svg?style=for-the-badge&logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
  [![Gemini AI](https://img.shields.io/badge/Google%20Gemini-8E75B2?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
</div>

<br />

## 📖 Overview

**Agrisense** is a comprehensive, full-stack predictive intelligence platform designed to revolutionize modern farming. By seamlessly ingesting environmental, geospatial, and climatic data telemetry, Agrisense delivers highly accurate, action-oriented recommendations directly to farmers and agronomists. 

By combining physical metrics (Nitrogen, Phosphorous, Potassium soil ratios, humidity, pH levels, and rainfall) with custom-trained Machine Learning models, Agrisense helps predict optimal crop varieties, forecast harvest yields, and project profitability. It extends its predictive capabilities by leveraging Large Language Models (Google Gemini) to transform rigid quantitative forecasts into easily digestible, qualitative agricultural insights.

## ✨ Key Features

- 🌾 **Smart Crop Recommendation Engine**: Predicts the highest-yielding crop variety based on current soil parameters using a trained Random Forest classifier.
- 📈 **Predictive Yield Forecasting**: Accurately estimates anticipated crop yields per acre (in tons) depending on specialized nutrient ratios via regression modeling.
- 💰 **Economic Profit Analysis**: Helps project future farming revenue and absolute profitability tailored to acreage dimensions and current market conditions.
- ⚠️ **Dynamic Risk Assessment**: Evaluates physical environmental boundaries (e.g., suboptimal soil Ph, high precipitation) to actively warn farmers against acute agricultural risks.
- 📊 **Comparative Crop Analysis**: Features side-by-side diagnostic visualization for contrasting the profitability, water usage, and viability of two completely different crops.
- 🧠 **Generative AI Analyst Insights**: Integrates natively with the Google Gemini GenAI SDK to distill mathematical crop predictions into rich, human-readable insights.
- 🎨 **Unified Data Dashboard**: A premium React dashboard featuring Recharts-powered interactive analytics and a highly optimized User Experience.

## 🛠️ Technology Stack

**Frontend (Client)**
- React.js + Vite
- Axios (API Communication)
- Recharts (Data Visualization)
- Modern Vanilla CSS UI/UX Components

**Backend (Server)**
- FastAPI (Python REST Architecture)
- Scikit-learn, Pandas, NumPy (Machine Learning)
- `google-generativeai` (LLM Integration)
- Random Forest Classifier & Regressor (Model Backing)

## ⚙️ Architecture & Data Pipelines
Agrisense is built to independently validate structured historical CSV profiles for prediction. Running backend initialization scripts cleanly trains models entirely locally. Once serialized (`.joblib`), they act as robust local analytical inference layers natively called by the REST architecture, allowing instantaneous processing speed to query inputs delivered by the client application.

## 🚀 Installation & Setup

Ensure that your local environment has **Python 3.9+** and **Node.js 18+** installed.

### 1. Server Configuration
```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Pre-train the ML models on the CSV dataset
python training/train_classifier.py
python training/train_regressor.py

# Boot the FastAPI server instance
python run.py
```
> The API layer runs locally at `http://localhost:8000`.

### 2. Client Configuration
Open a secondary terminal:
```bash
# Navigate to frontend directory
cd frontend

# Install Node requirements
npm install

# Build and start the development server
npm run dev
```
> Explore the platform interface automatically at `http://localhost:5173`.
