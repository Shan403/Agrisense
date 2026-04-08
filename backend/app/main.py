from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import recommend, profit, risk, compare
# 'yield' is a reserved keyword in Python, so the file might be named yield.py but we import it differently or rename it.
# Wait, 'yield' is a keyword, we cannot import it as 'yield'. We can import it as yield_route and use importlib or name it yield_route.py. But the user asked for 'yield.py'.
# We can import it using: from .routes import yield_route (if we rename it), but user specified `yield.py`. 
# To import a module named `yield.py`, we can use importlib.
import importlib

yield_module = importlib.import_module('.routes.yield', package='app')

app = FastAPI(title="Agrisense API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

import os
import google.generativeai as genai
from pydantic import BaseModel
from dotenv import load_dotenv

load_dotenv(os.path.join(os.path.dirname(__file__), '../../.env'))
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

app.include_router(recommend.router, prefix="/api")
app.include_router(yield_module.router, prefix="/api")
app.include_router(profit.router, prefix="/api")
app.include_router(risk.router, prefix="/api")
app.include_router(compare.router, prefix="/api")

class InsightRequest(BaseModel):
    prompt: str

@app.post("/api/insight")
def get_ai_insight(req: InsightRequest):
    try:
        model = genai.GenerativeModel("gemini-2.5-flash")
        response = model.generate_content(req.prompt)
        return {"insight": response.text}
    except Exception as e:
        return {"insight": f"AI Insight is currently unavailable: {str(e)}"}

@app.get("/")
def read_root():
    return {"message": "Welcome to Agrisense API"}
