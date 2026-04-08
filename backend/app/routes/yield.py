from fastapi import APIRouter
from pydantic import BaseModel
from ..services.yield_service import YieldService

router = APIRouter()
service = YieldService()

class YieldRequest(BaseModel):
    crop: str
    season: str
    state: str
    area: float
    rainfall: float
    fertilizer: float
    pesticide: float

@router.post("/yield")
def predict_yield(req: YieldRequest):
    return service.predict_yield(
        req.crop, req.season, req.state,
        req.area, req.rainfall, req.fertilizer, req.pesticide
    )
