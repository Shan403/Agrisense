"""
Generate realistic synthetic agricultural datasets for AgriSense paper.
Regions: Virudhunagar (college area), Palani (Dindigul), Salem — Tamil Nadu, India.

Matches the feature schema used in the paper:
  1. crop_recommendation_synthetic.csv — N, P, K, temperature, humidity, ph, rainfall, label
  2. crop_yield_synthetic.csv — Crop, Season, State, Area, Annual_Rainfall, Fertilizer, Pesticide, Yield
"""

import csv
import random
import os

random.seed(42)

# ========================================================================
# CROP RECOMMENDATION DATA
# Realistic ranges for crops actually grown in Virudhunagar / Palani / Salem
# Sources: TNAU Agritech Portal, India Meteorological Department, ICAR Reports
# ========================================================================

# Each crop: (N_min, N_max, P_min, P_max, K_min, K_max,
#             temp_min, temp_max, hum_min, hum_max, ph_min, ph_max,
#             rain_min, rain_max)
crop_profiles = {
    # ---- Cereals & Millets (Virudhunagar / Salem staples) ----
    "Rice": (60, 100, 35, 60, 35, 55, 22, 32, 75, 92, 5.5, 7.0, 180, 280),
    "Maize": (60, 100, 35, 55, 30, 50, 22, 33, 55, 75, 5.5, 7.5, 65, 115),
    "Millet": (50, 85, 25, 45, 20, 40, 26, 36, 45, 65, 6.0, 7.5, 40, 80),
    "Sorghum": (50, 80, 20, 40, 20, 35, 26, 37, 40, 60, 6.0, 8.0, 50, 100),

    # ---- Pulses (common in Virudhunagar black soil belt) ----
    "Blackgram": (15, 40, 55, 75, 15, 30, 25, 35, 60, 80, 6.0, 7.5, 60, 110),
    "Greengram": (15, 35, 50, 70, 15, 30, 26, 36, 55, 75, 6.0, 7.5, 40, 90),
    "Chickpea": (30, 55, 55, 75, 70, 85, 18, 28, 14, 35, 6.0, 7.5, 60, 100),
    "Pigeonpea": (10, 35, 55, 70, 15, 30, 25, 35, 55, 75, 5.5, 7.0, 100, 175),

    # ---- Oilseeds (Virudhunagar / Salem dryland belt) ----
    "Groundnut": (15, 40, 40, 65, 15, 30, 25, 35, 55, 75, 5.5, 7.0, 60, 120),
    "Sesame": (25, 50, 35, 55, 25, 40, 27, 37, 50, 70, 5.5, 7.5, 50, 90),

    # ---- Cash Crops (commercial in all three regions) ----
    "Cotton": (100, 140, 40, 60, 15, 30, 24, 36, 60, 80, 6.0, 8.0, 50, 110),
    "Sugarcane": (70, 120, 20, 40, 25, 50, 24, 34, 70, 90, 6.0, 7.5, 150, 230),
    "Turmeric": (45, 70, 50, 70, 190, 210, 22, 32, 70, 90, 5.5, 7.0, 140, 220),
    "Chilli": (100, 130, 50, 70, 40, 55, 24, 35, 55, 75, 6.0, 7.5, 55, 100),

    # ---- Fruits (Salem mango belt / Palani hill area) ----
    "Mango": (15, 35, 15, 30, 25, 45, 26, 38, 45, 65, 5.5, 7.5, 80, 150),
    "Banana": (80, 120, 70, 95, 45, 60, 24, 33, 75, 90, 5.5, 7.0, 90, 170),
    "Papaya": (40, 65, 55, 75, 45, 60, 25, 35, 80, 92, 6.0, 7.0, 130, 200),
    "Coconut": (15, 35, 10, 25, 25, 50, 25, 34, 75, 92, 5.5, 7.0, 100, 180),

    # ---- Palani hills specialty ----
    "Coffee": (80, 110, 15, 30, 25, 40, 18, 28, 55, 80, 5.5, 6.5, 130, 220),
    "Cardamom": (60, 90, 20, 35, 40, 55, 16, 26, 70, 90, 5.0, 6.5, 180, 280),

    # ---- Salem specialty ----
    "Tapioca": (60, 90, 30, 50, 40, 55, 25, 35, 50, 70, 5.5, 7.0, 60, 130),
    "Pomegranate": (15, 30, 10, 25, 30, 50, 24, 36, 30, 50, 6.5, 7.5, 40, 80),
}

SAMPLES_PER_CROP = 100

def jitter(val, pct=0.05):
    """Add slight randomness to make data look more natural."""
    return val * (1 + random.uniform(-pct, pct))

def generate_crop_recommendation_csv(filepath):
    rows = []
    for crop, profile in crop_profiles.items():
        (n_lo, n_hi, p_lo, p_hi, k_lo, k_hi,
         t_lo, t_hi, h_lo, h_hi, ph_lo, ph_hi,
         r_lo, r_hi) = profile

        for _ in range(SAMPLES_PER_CROP):
            n = round(random.uniform(n_lo, n_hi) + random.gauss(0, 3), 2)
            p = round(random.uniform(p_lo, p_hi) + random.gauss(0, 2.5), 2)
            k = round(random.uniform(k_lo, k_hi) + random.gauss(0, 2), 2)
            temp = round(random.uniform(t_lo, t_hi) + random.gauss(0, 0.8), 2)
            hum = round(random.uniform(h_lo, h_hi) + random.gauss(0, 1.5), 2)
            ph = round(random.uniform(ph_lo, ph_hi) + random.gauss(0, 0.15), 2)
            rain = round(random.uniform(r_lo, r_hi) + random.gauss(0, 8), 2)

            # Clamp to valid ranges
            n = max(0, n)
            p = max(0, p)
            k = max(0, k)
            temp = max(10, min(45, temp))
            hum = max(10, min(99, hum))
            ph = max(3.5, min(9.5, ph))
            rain = max(10, rain)

            rows.append([n, p, k, temp, hum, ph, rain, crop])

    random.shuffle(rows)

    with open(filepath, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["N", "P", "K", "temperature", "humidity", "ph", "rainfall", "label"])
        writer.writerows(rows)

    print(f"[OK] Crop recommendation data: {len(rows)} rows → {filepath}")


# ========================================================================
# CROP YIELD DATA
# Realistic yield values for Tamil Nadu districts
# Area in hectares, rainfall in mm, fertilizer/pesticide in kg
# ========================================================================

# Areas near the three regions
districts = [
    "Virudhunagar", "Sivakasi", "Rajapalayam",   # College area
    "Palani", "Dindigul", "Kodaikanal",           # Palani belt
    "Salem", "Namakkal", "Attur",                  # Salem belt
    "Madurai", "Theni", "Karur",                   # Nearby districts
]

seasons = ["Kharif", "Rabi", "Whole Year"]

# Each crop: (season_options, area_min, area_max, rain_min, rain_max,
#             fert_min, fert_max, pest_min, pest_max, yield_min, yield_max)
yield_profiles = {
    "Rice":       (["Kharif", "Rabi"],    500,  80000,  800, 1400, 2000000, 9000000, 5000, 30000, 1.0, 3.8),
    "Maize":      (["Kharif", "Rabi"],    300,  50000,  600, 1100, 1000000, 5000000, 3000, 15000, 1.5, 4.2),
    "Millet":     (["Kharif"],            200,  30000,  500,  900,  500000, 3000000, 1000,  8000, 0.6, 2.0),
    "Sorghum":    (["Kharif", "Rabi"],    200,  25000,  400,  850,  400000, 2500000, 1000,  7000, 0.5, 1.8),
    "Blackgram":  (["Rabi"],              200,  20000,  500,  900,  300000, 2000000,  800,  5000, 0.4, 1.2),
    "Greengram":  (["Kharif"],            150,  15000,  400,  800,  250000, 1500000,  600,  4000, 0.3, 1.0),
    "Chickpea":   (["Rabi"],              200,  18000,  500,  900,  300000, 1800000,  700,  4500, 0.5, 1.4),
    "Pigeonpea":  (["Kharif"],            150,  12000,  600, 1000,  200000, 1200000,  500,  3500, 0.4, 1.1),
    "Groundnut":  (["Kharif", "Rabi"],    500,  60000,  500, 1000, 1500000, 7000000, 4000, 20000, 1.0, 3.0),
    "Sesame":     (["Kharif"],            100,  10000,  400,  800,  200000, 1000000,  500,  3000, 0.3, 0.9),
    "Cotton":     (["Kharif"],            500,  70000,  500, 1000, 2000000, 8000000, 5000, 25000, 0.8, 2.5),
    "Sugarcane":  (["Whole Year"],       1000, 100000,  900, 1500, 5000000,15000000,10000, 50000, 50.0, 95.0),
    "Turmeric":   (["Kharif"],            200,  15000,  800, 1300, 1000000, 4000000, 2000, 10000, 3.0, 8.0),
    "Chilli":     (["Kharif", "Rabi"],    150,  12000,  500, 1000,  800000, 3500000, 2000, 12000, 1.0, 3.5),
    "Mango":      (["Whole Year"],        500,  40000,  600, 1100, 1000000, 5000000, 3000, 15000, 3.0, 10.0),
    "Banana":     (["Whole Year"],        300,  50000,  800, 1400, 2000000, 8000000, 5000, 25000, 15.0, 40.0),
    "Papaya":     (["Whole Year"],        100,   8000,  800, 1300,  500000, 2500000, 1500,  8000, 20.0, 50.0),
    "Coconut":    (["Whole Year"],        500,  60000,  700, 1300, 1500000, 6000000, 3000, 15000, 5.0, 12.0),
    "Coffee":     (["Whole Year"],        100,   5000,  900, 1600,  400000, 2000000, 1000,  6000, 0.5, 2.0),
    "Tapioca":    (["Whole Year"],        300,  30000,  600, 1100, 1000000, 4000000, 2000, 10000, 20.0, 40.0),
    "Pomegranate":(["Whole Year"],        100,   5000,  400,  800,  300000, 1500000,  800,  5000, 4.0, 12.0),
}

YIELD_SAMPLES_PER_CROP = 500

def generate_crop_yield_csv(filepath):
    rows = []
    for crop, profile in yield_profiles.items():
        (season_opts, area_lo, area_hi, rain_lo, rain_hi,
         fert_lo, fert_hi, pest_lo, pest_hi, yld_lo, yld_hi) = profile

        for _ in range(YIELD_SAMPLES_PER_CROP):
            season = random.choice(season_opts)
            district = random.choice(districts)

            area = round(random.uniform(area_lo, area_hi))

            # Rainfall varies by district — hilly areas get more
            rain_bonus = 0
            if district in ["Palani", "Kodaikanal", "Theni"]:
                rain_bonus = random.uniform(100, 300)
            elif district in ["Virudhunagar", "Sivakasi"]:
                rain_bonus = random.uniform(-100, 0)  # drier belt

            rainfall = round(random.uniform(rain_lo, rain_hi) + rain_bonus + random.gauss(0, 30), 1)
            rainfall = max(200, rainfall)

            # Fertilizer scales roughly with area
            area_ratio = area / area_hi
            fert = round(random.uniform(fert_lo, fert_hi) * (0.3 + 0.7 * area_ratio) + random.gauss(0, 50000))
            fert = max(10000, fert)

            pest = round(random.uniform(pest_lo, pest_hi) * (0.3 + 0.7 * area_ratio) + random.gauss(0, 500))
            pest = max(100, pest)

            # Yield influenced by rainfall and fertilizer
            base_yield = random.uniform(yld_lo, yld_hi)
            rain_norm = (rainfall - rain_lo) / max(rain_hi - rain_lo, 1)
            fert_norm = (fert - fert_lo) / max(fert_hi - fert_lo, 1)
            yield_val = base_yield * (0.7 + 0.15 * rain_norm + 0.15 * fert_norm)
            yield_val = round(yield_val + random.gauss(0, base_yield * 0.05), 2)
            yield_val = max(0.1, yield_val)

            rows.append([crop, season, district, area, rainfall, fert, pest, yield_val])

    random.shuffle(rows)

    with open(filepath, "w", newline="") as f:
        writer = csv.writer(f)
        writer.writerow(["Crop", "Season", "State", "Area", "Annual_Rainfall", "Fertilizer", "Pesticide", "Yield"])
        writer.writerows(rows)

    print(f"[OK] Crop yield data: {len(rows)} rows → {filepath}")


# ========================================================================
# MAIN
# ========================================================================
if __name__ == "__main__":
    output_dir = os.path.dirname(os.path.abspath(__file__))

    rec_path = os.path.join(output_dir, "crop_recommendation_synthetic.csv")
    yld_path = os.path.join(output_dir, "crop_yield_synthetic.csv")

    generate_crop_recommendation_csv(rec_path)
    generate_crop_yield_csv(yld_path)

    print("\nDone! Both datasets generated.")
