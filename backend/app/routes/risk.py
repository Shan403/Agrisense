from fastapi import APIRouter
from pydantic import BaseModel
from ..services.risk_service import RiskService

router = APIRouter()
service = RiskService()

class RiskRequest(BaseModel):
    rainfall: float
    fertilizer: float

@router.post("/risk")
def calculate_risk(req: RiskRequest):
    return service.calculate_risk(req.rainfall, req.fertilizer)
