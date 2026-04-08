class ProfitService:
    def calculate_profit(self, estimated_yield, market_price, cost):
        profit = (estimated_yield * market_price) - cost
        return {
            "estimated_yield": estimated_yield,
            "market_price": market_price,
            "cost": cost,
            "profit": round(profit, 2)
        }
