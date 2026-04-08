class CompareService:
    def compare_crops(self, crop1, crop2):
        profit1 = (crop1['estimated_yield'] * crop1['market_price']) - crop1['cost']
        profit2 = (crop2['estimated_yield'] * crop2['market_price']) - crop2['cost']
        
        diff = abs(profit1 - profit2)
        better_crop = crop1['name'] if profit1 > profit2 else crop2['name']
        
        return {
            "crop1": {"name": crop1['name'], "profit": round(profit1, 2)},
            "crop2": {"name": crop2['name'], "profit": round(profit2, 2)},
            "comparison": {
                "better_crop": better_crop,
                "profit_difference": round(diff, 2)
            }
        }
