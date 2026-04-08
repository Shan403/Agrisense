from fastapi import APIRouter
from pydantic import BaseModel
from ..services.profit_service import ProfitService

router = APIRouter()
service = ProfitService()

class ProfitRequest(BaseModel):
    estimated_yield: float
    market_price: float
    cost: float

@router.post("/profit")
def calculate_profit(req: ProfitRequest):
    return service.calculate_profit(req.estimated_yield, req.market_price, req.cost)
