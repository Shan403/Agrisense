from fastapi import APIRouter
from pydantic import BaseModel
from ..services.recommendation_service import RecommendationService

router = APIRouter()
service = RecommendationService()

class RecommendRequest(BaseModel):
    N: float
    P: float
    K: float
    temperature: float
    humidity: float
    ph: float
    rainfall: float

@router.post("/recommend")
def recommend_crop(req: RecommendRequest):
    return service.recommend_crop(
        req.N, req.P, req.K,
        req.temperature, req.humidity, req.ph, req.rainfall
    )
