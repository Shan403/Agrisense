from fastapi import APIRouter
from pydantic import BaseModel
from ..services.compare_service import CompareService

router = APIRouter()
service = CompareService()

class CropDetail(BaseModel):
    name: str
    estimated_yield: float
    market_price: float
    cost: float

class CompareRequest(BaseModel):
    crop1: CropDetail
    crop2: CropDetail

@router.post("/compare")
def compare_crops(req: CompareRequest):
    return service.compare_crops(req.crop1.dict(), req.crop2.dict())
