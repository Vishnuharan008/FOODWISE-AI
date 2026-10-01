from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from pathlib import Path
from datetime import datetime
import pandas as pd, numpy as np, joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_absolute_error, mean_squared_error
from xgboost import XGBRegressor

router = APIRouter()
BASE = Path(__file__).resolve().parents[2]
DATA = BASE / "data" / "food_history.csv"
MODEL = BASE / "app" / "ml"
MODEL.mkdir(exist_ok=True)
FEATURES = ["day_of_week", "holiday", "event", "exam", "expected_attendance", "temperature", "rain_probability", "previous_consumption"]

# Global caches to eliminate unnecessary repeated disk I/O
_df_cache = None
_df_mtime = None
_models_cache = {}

# Demo Recipe Master (Quantity per portion)
DEMO_RECIPES = {
    "Rice": [
        {"ingredient": "Rice", "qty_per_portion": 0.10, "unit": "kg"},
        {"ingredient": "Water", "qty_per_portion": 0.15, "unit": "L"},
        {"ingredient": "Salt", "qty_per_portion": 0.002, "unit": "kg"}
    ],
    "Chapati": [
        {"ingredient": "Wheat Flour", "qty_per_portion": 0.08, "unit": "kg"},
        {"ingredient": "Cooking Oil", "qty_per_portion": 0.01, "unit": "L"},
        {"ingredient": "Salt", "qty_per_portion": 0.001, "unit": "kg"}
    ],
    "Curd": [
        {"ingredient": "Milk", "qty_per_portion": 0.12, "unit": "L"},
        {"ingredient": "Starter Curd", "qty_per_portion": 0.01, "unit": "kg"}
    ],
    "Sambar": [
        {"ingredient": "Toor Dal", "qty_per_portion": 0.04, "unit": "kg"},
        {"ingredient": "Mixed Vegetables", "qty_per_portion": 0.05, "unit": "kg"},
        {"ingredient": "Tamarind", "qty_per_portion": 0.005, "unit": "kg"},
        {"ingredient": "Sambar Powder", "qty_per_portion": 0.003, "unit": "kg"},
        {"ingredient": "Cooking Oil", "qty_per_portion": 0.005, "unit": "L"}
    ],
    "Vegetables": [
        {"ingredient": "Mixed Vegetables", "qty_per_portion": 0.12, "unit": "kg"},
        {"ingredient": "Cooking Oil", "qty_per_portion": 0.01, "unit": "L"},
        {"ingredient": "Spices", "qty_per_portion": 0.004, "unit": "kg"},
        {"ingredient": "Salt", "qty_per_portion": 0.002, "unit": "kg"}
    ]
}

# Demo Inventory Master (Available stock & unit)
DEMO_INVENTORY = {
    "Rice": {"available": 60.0, "unit": "kg", "reorder_level": 20.0},
    "Water": {"available": 500.0, "unit": "L", "reorder_level": 50.0},
    "Salt": {"available": 10.0, "unit": "kg", "reorder_level": 2.0},
    "Wheat Flour": {"available": 45.0, "unit": "kg", "reorder_level": 15.0},
    "Cooking Oil": {"available": 15.0, "unit": "L", "reorder_level": 5.0},
    "Milk": {"available": 80.0, "unit": "L", "reorder_level": 20.0},
    "Starter Curd": {"available": 5.0, "unit": "kg", "reorder_level": 1.0},
    "Toor Dal": {"available": 25.0, "unit": "kg", "reorder_level": 10.0},
    "Mixed Vegetables": {"available": 50.0, "unit": "kg", "reorder_level": 15.0},
    "Tamarind": {"available": 3.0, "unit": "kg", "reorder_level": 1.0},
    "Sambar Powder": {"available": 4.0, "unit": "kg", "reorder_level": 1.0},
    "Spices": {"available": 5.0, "unit": "kg", "reorder_level": 1.0}
}

# In-memory Waste Audit Store (Demo Prototype Data Layer)
DEMO_WASTE_RECORDS = [
    {"id": 1, "date": "2026-09-20", "food_item": "Rice", "quantity": 25.5, "reason": "Over-preparation", "cost": 1275.0},
    {"id": 2, "date": "2026-09-19", "food_item": "Chapati", "quantity": 18.0, "reason": "Low attendance", "cost": 900.0},
    {"id": 3, "date": "2026-09-18", "food_item": "Sambar", "quantity": 12.0, "reason": "Menu preference", "cost": 600.0},
    {"id": 4, "date": "2026-09-17", "food_item": "Curd", "quantity": 15.0, "reason": "Weather impact", "cost": 750.0}
]

VALID_WASTE_REASONS = [
    "Over-preparation",
    "Low attendance",
    "Menu preference",
    "Weather impact",
    "Event cancellation",
    "Food quality issue",
    "Other"
]

DEMO_COST_PER_PORTION = 50.0  # ₹50 per portion benchmark

class PredictionIn(BaseModel):
    date: str = Field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))
    expected_attendance: float = Field(..., ge=0.0, le=100000.0, description="Expected attendance count")
    food_item: str = Field(default="Rice", min_length=1)
    temperature: float = Field(default=30.0, ge=-50.0, le=60.0)
    rain_probability: float = Field(default=20.0, ge=0.0, le=100.0)
    previous_consumption: float = Field(default=700.0, ge=0.0, le=100000.0)
    holiday: int = Field(default=0, ge=0, le=1)
    event: int = Field(default=0, ge=0, le=1)
    exam: int = Field(default=0, ge=0, le=1)
    food_prepared: float = Field(default=750.0, ge=0.0, le=100000.0)

class SimulationIn(BaseModel):
    expected_attendance: float = Field(..., ge=0.0, le=100000.0)
    temperature: float = Field(default=30.0, ge=-50.0, le=60.0)
    rain_probability: float = Field(default=20.0, ge=0.0, le=100.0)
    previous_consumption: float = Field(default=700.0, ge=0.0, le=100000.0)
    holiday: int = Field(default=0, ge=0, le=1)
    event: int = Field(default=0, ge=0, le=1)
    exam: int = Field(default=0, ge=0, le=1)
    food_prepared: float = Field(default=750.0, ge=0.0, le=100000.0)

class PrepCalcIn(BaseModel):
    food_item: str = Field(..., min_length=1, description="Food menu item name")
    recommended_preparation: int = Field(..., ge=0, description="Recommended preparation quantity (portions)")

class ConsumptionIn(BaseModel):
    food_item: str = Field(default="Rice", min_length=1)
    food_prepared: float = Field(..., ge=0.0, le=100000.0, description="Quantity prepared")
    food_consumed: float = Field(..., ge=0.0, le=100000.0, description="Quantity consumed")

class ActualObservationIn(BaseModel):
    date: str = Field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))
    expected_attendance: float = Field(default=750.0, ge=0.0, le=100000.0)
    actual_attendance: float = Field(default=745.0, ge=0.0, le=100000.0)
    food_item: str = Field(default="Rice", min_length=1)
    food_prepared: float = Field(..., ge=0.0, le=100000.0)
    food_consumed: float = Field(..., ge=0.0, le=100000.0)
    temperature: float = Field(default=30.0, ge=-50.0, le=60.0)
    rain_probability: float = Field(default=20.0, ge=0.0, le=100.0)
    holiday: int = Field(default=0, ge=0, le=1)
    event: int = Field(default=0, ge=0, le=1)
    exam: int = Field(default=0, ge=0, le=1)

class WasteRecordIn(BaseModel):
    date: str = Field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d"))
    food_item: str = Field(..., min_length=1)
    quantity: float = Field(..., gt=0.0, description="Wasted quantity")
    reason: str = Field(..., min_length=1, description="Reason for food waste")
    unit_cost: float = Field(default=50.0, ge=0.0, description="Cost per unit in ₹")

def parse_date_to_weekday(date_str: str) -> int:
    """Robustly parse date strings into day_of_week integer (0=Monday, 6=Sunday)."""
    if not date_str or not isinstance(date_str, str):
        return datetime.now().weekday()
    cleaned = date_str.strip()
    try:
        return datetime.fromisoformat(cleaned).weekday()
    except ValueError:
        pass
    try:
        dt = pd.to_datetime(cleaned)
        if not pd.isna(dt):
            return int(dt.weekday())
    except Exception:
        pass
    raise HTTPException(status_code=400, detail=f"Invalid date format '{date_str}'. Expected YYYY-MM-DD or ISO 8601 format.")

def load():
    """Load historical data with caching based on file modification timestamp."""
    global _df_cache, _df_mtime
    if not DATA.exists():
        raise HTTPException(status_code=500, detail=f"Dataset file missing at {DATA}")
    
    mtime = DATA.stat().st_mtime
    if _df_cache is None or _df_mtime != mtime:
        df = pd.read_csv(DATA)
        df["date"] = pd.to_datetime(df["date"])
        df["day_of_week"] = df["date"].dt.dayofweek
        _df_cache = df
        _df_mtime = mtime
    return _df_cache.copy()

def get_model(name: str):
    """Retrieve model from cache or load from disk if missing."""
    global _models_cache
    path = MODEL / f"{name}.pkl"
    if not path.exists():
        train()
    
    mtime = path.stat().st_mtime if path.exists() else 0
    cache_key = (name, mtime)
    if cache_key not in _models_cache:
        _models_cache[cache_key] = joblib.load(path)
    return _models_cache[cache_key]

def train():
    """Train RF, LR, and XGB models on historical dataset."""
    global _models_cache, _df_cache, _df_mtime
    try:
        _df_cache = None
        _df_mtime = None
        df = load()
        split = int(len(df) * 0.8)
        X = df[FEATURES]
        y = df["food_consumed"]
        
        rf = RandomForestRegressor(n_estimators=300, min_samples_leaf=2, random_state=42).fit(X.iloc[:split], y.iloc[:split])
        lr = LinearRegression().fit(X.iloc[:split], y.iloc[:split])
        xw = df[FEATURES + ["food_prepared"]]
        xgb = XGBRegressor(n_estimators=220, max_depth=4, learning_rate=0.05, subsample=0.9, colsample_bytree=0.9, objective="reg:squarederror", random_state=42).fit(xw.iloc[:split], df["food_wasted"].iloc[:split])
        
        joblib.dump(rf, MODEL / "demand.pkl")
        joblib.dump(lr, MODEL / "baseline.pkl")
        joblib.dump(xgb, MODEL / "waste.pkl")
        _models_cache.clear()
        
        pr = rf.predict(X.iloc[split:])
        br = lr.predict(X.iloc[split:])
        actual = y.iloc[split:]
        mape_val = float(np.mean(np.abs((actual - pr) / np.maximum(actual, 1.0))) * 100)
        
        return {
            "rf_mae": float(round(mean_absolute_error(actual, pr), 2)),
            "rf_rmse": float(round(np.sqrt(mean_squared_error(actual, pr)), 2)),
            "rf_mape": float(round(mape_val, 2)),
            "baseline_mae": float(round(mean_absolute_error(actual, br), 2)),
            "trained_records": len(df),
            "trained_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "model_version": "v1.0"
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Model training failed: {str(e)}")

def ensure():
    """Ensure trained models are present."""
    if not (MODEL / "demand.pkl").exists() or not (MODEL / "waste.pkl").exists():
        return train()
    return {"model_version": "v1.0", "status": "ready"}

def vector(d):
    return pd.DataFrame([{k: d[k] for k in FEATURES}])

def predict_core(d):
    ensure()
    df = load()
    rf = get_model("demand")
    v = max(0.0, float(rf.predict(vector(d))[0]))
    errors = np.abs(df["food_consumed"] - rf.predict(df[FEATURES]))
    margin = max(10.0, float(np.quantile(errors, 0.75)))
    prep = int(np.ceil(v + 0.35 * margin))
    return {
        "predicted_demand": round(v, 2),
        "range_low": round(max(0.0, v - margin), 2),
        "range_high": round(v + margin, 2),
        "recommended_preparation": prep,
        "uncertainty_margin": round(margin, 2),
        "model": "Random Forest v1.0"
    }

def waste_core(d):
    ensure()
    m = get_model("waste")
    row = vector(d).copy()
    row["food_prepared"] = d.get("food_prepared", 750)
    w = max(0.0, float(m.predict(row)[0]))
    risk = "LOW" if w < 20 else ("MEDIUM" if w < 50 else "HIGH")
    return {"predicted_waste": round(w, 2), "risk": risk, "model": "XGBoost v1.0"}

def calculate_prep_and_purchase(food_item: str, recommended_prep: int):
    """Dynamically compute ingredient requirements & purchase queue based on recipe master."""
    if recommended_prep < 0:
        raise HTTPException(status_code=400, detail="Recommended preparation quantity cannot be negative.")
        
    matched_key = None
    for k in DEMO_RECIPES.keys():
        if k.lower() == food_item.strip().lower():
            matched_key = k
            break
            
    if not matched_key:
        raise HTTPException(status_code=400, detail=f"Recipe not found for '{food_item}'. Available items: {list(DEMO_RECIPES.keys())}")
        
    recipe = DEMO_RECIPES[matched_key]
    ingredient_requirements = []
    purchase_queue = []
    
    for item in recipe:
        ing_name = item["ingredient"]
        unit = item["unit"]
        qty_per_portion = item["qty_per_portion"]
        
        req_qty = round(recommended_prep * qty_per_portion, 2)
        inv = DEMO_INVENTORY.get(ing_name, {"available": 0.0, "unit": unit, "reorder_level": 0.0})
        avail_qty = inv["available"]
        shortage = max(0.0, round(req_qty - avail_qty, 2))
        
        ing_info = {
            "ingredient": ing_name,
            "qty_per_portion": qty_per_portion,
            "required_quantity": req_qty,
            "available_quantity": avail_qty,
            "shortage": shortage,
            "purchase_recommended": shortage,
            "unit": unit,
            "is_sufficient": avail_qty >= req_qty
        }
        ingredient_requirements.append(ing_info)
        
        if shortage > 0:
            purchase_queue.append({
                "ingredient": ing_name,
                "required": req_qty,
                "available": avail_qty,
                "shortage": shortage,
                "purchase_recommended": shortage,
                "unit": unit,
                "action": f"Buy {shortage} {unit} {ing_name}"
            })
            
    return {
        "food_item": matched_key,
        "recommended_preparation": recommended_prep,
        "ingredients": ingredient_requirements,
        "purchase_queue": purchase_queue,
        "is_demo_data": True
    }

def waste_analysis_core(d: dict):
    """Full waste evaluation combining XGBoost ML, pre-service risk rules, cost, & preventive actions."""
    demand_res = predict_core(d)
    predicted_demand = demand_res["predicted_demand"]
    food_prepared = float(d.get("food_prepared", demand_res["recommended_preparation"]))
    
    if food_prepared < 0:
        raise HTTPException(status_code=400, detail="Food prepared quantity cannot be negative.")
        
    waste_res = waste_core(d)
    predicted_waste = waste_res["predicted_waste"]
    ml_risk = waste_res["risk"]
    
    overshoot = food_prepared - predicted_demand
    overshoot_pct = round((overshoot / predicted_demand) * 100 if predicted_demand > 0 else 0.0, 1)
    
    if overshoot_pct > 15 or ml_risk == "HIGH":
        pre_service_risk = "HIGH"
    elif overshoot_pct > 5 or ml_risk == "MEDIUM":
        pre_service_risk = "MEDIUM"
    else:
        pre_service_risk = "LOW"
        
    waste_pct = round((predicted_waste / food_prepared) * 100 if food_prepared > 0 else 0.0, 1)
    estimated_cost = round(predicted_waste * DEMO_COST_PER_PORTION, 2)
    
    preventive_actions = []
    if pre_service_risk == "HIGH":
        preventive_actions.append(f"High over-preparation risk (+{max(0.0, overshoot_pct)}% over demand). Reduce batch quantity.")
        preventive_actions.append("Prepare in staggered batches (50% initial service batch).")
        preventive_actions.append("Hold back reserve raw ingredients.")
    elif pre_service_risk == "MEDIUM":
        preventive_actions.append(f"Moderate preparation buffer (+{max(0.0, overshoot_pct)}% over demand). Monitor service stream.")
        preventive_actions.append("Keep reserve preparation on hold until peak service.")
    else:
        preventive_actions.append("Optimal preparation level aligned with predicted demand.")
        preventive_actions.append("Standard service protocol — log actual consumption post-service.")
        
    return {
        "food_item": d.get("food_item", "Rice"),
        "date": d.get("date", datetime.now().strftime("%Y-%m-%d")),
        "predicted_demand": predicted_demand,
        "food_prepared": food_prepared,
        "predicted_waste": predicted_waste,
        "waste_percentage": waste_pct,
        "overshoot_quantity": round(max(0.0, overshoot), 2),
        "overshoot_percentage": max(0.0, overshoot_pct),
        "risk_level": pre_service_risk,
        "estimated_waste_cost": estimated_cost,
        "unit_cost_benchmark": DEMO_COST_PER_PORTION,
        "preventive_actions": preventive_actions,
        "is_demo_cost_benchmark": True,
        "model": "XGBoost v1.0 + Demand Rules"
    }

def process_live_consumption(food_item: str, food_prepared: float, food_consumed: float):
    """Calculate remaining food, remaining demand, live risk & suggested actions."""
    if food_consumed > food_prepared:
        raise HTTPException(status_code=400, detail=f"Consumed quantity ({food_consumed}) cannot exceed prepared quantity ({food_prepared}).")
        
    remaining = round(food_prepared - food_consumed, 2)
    remaining_pct = round((remaining / food_prepared) * 100 if food_prepared > 0 else 0.0, 1)
    
    if remaining > 50 or remaining_pct > 20:
        risk = "HIGH"
        action = "Pause additional cooking immediately. Repackage untouched surplus for donation/cold storage."
    elif remaining > 20 or remaining_pct > 10:
        risk = "MEDIUM"
        action = "Monitor final 30 mins of service stream. Hold back reserve heating."
    else:
        risk = "LOW"
        action = "Optimal consumption stream. Minimal remaining surplus detected."
        
    return {
        "food_item": food_item,
        "food_prepared": food_prepared,
        "food_consumed": food_consumed,
        "food_remaining": remaining,
        "remaining_percentage": remaining_pct,
        "live_waste_risk": risk,
        "suggested_action": action
    }

@router.get("/health")
def health():
    try:
        return {"status": "ok", "models": ensure()}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/history")
def history():
    try:
        df = load()
        records = df.to_dict(orient="records")
        for r in records:
            if isinstance(r.get("date"), (pd.Timestamp, datetime)):
                r["date"] = r["date"].strftime("%Y-%m-%d")
        return {"records": records}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/analytics")
def analytics():
    try:
        df = load()
        return {
            "records": len(df),
            "total_prepared": float(df["food_prepared"].sum()),
            "total_consumed": float(df["food_consumed"].sum()),
            "total_wasted": float(df["food_wasted"].sum()),
            "waste_cost": float((df["food_wasted"] * 50).sum())
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/recipes")
def get_recipes():
    return {"recipes": DEMO_RECIPES, "is_demo_data": True}

@router.get("/inventory")
def get_inventory():
    return {"inventory": DEMO_INVENTORY, "is_demo_data": True}

@router.post("/preparation/calculate")
def calculate_prep(p: PrepCalcIn):
    try:
        return calculate_prep_and_purchase(p.food_item, p.recommended_preparation)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Calculation error: {str(e)}")

@router.post("/predict")
def predict(p: PredictionIn):
    try:
        d = p.model_dump()
        d["day_of_week"] = parse_date_to_weekday(p.date)
        pred_res = predict_core(d)
        prep_breakdown = calculate_prep_and_purchase(p.food_item, pred_res["recommended_preparation"])
        waste_breakdown = waste_analysis_core(d)
        return {
            **pred_res,
            "date": p.date,
            "food_item": p.food_item,
            "preparation_breakdown": prep_breakdown,
            "waste_analysis": waste_breakdown
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Prediction error: {str(e)}")
def explain_core(d):
    ensure()

    df = load()
    rf = joblib.load(MODEL / "demand.pkl")

    current_row = vector(d)
    current_prediction = float(rf.predict(current_row)[0])

    names = {
        "day_of_week": "Day of week",
        "holiday": "Holiday",
        "event": "Event",
        "exam": "Exam",
        "expected_attendance": "Expected attendance",
        "temperature": "Temperature",
        "rain_probability": "Rain probability",
        "previous_consumption": "Previous consumption"
    }

    explanations = []

    for feature in FEATURES:
        test_row = current_row.copy()

        baseline = float(df[feature].median())
        test_row[feature] = baseline

        test_prediction = float(rf.predict(test_row)[0])

        impact = current_prediction - test_prediction

        explanations.append({
            "feature": feature,
            "name": names.get(feature, feature),
            "value": float(current_row.iloc[0][feature]),
            "baseline": round(baseline, 2),
            "impact": round(impact, 2)
        })

    explanations.sort(
        key=lambda x: abs(x["impact"]),
        reverse=True
    )

    return {
        "prediction": round(current_prediction, 2),
        "explanations": explanations,
        "method": "Random Forest local feature impact"
    }


@router.post("/explain")
def explain(p: PredictionIn):
    d = p.model_dump()
    d["day_of_week"] = parse_date_to_weekday(p.date)

    return explain_core(d)
@router.post("/waste-risk")
def waste(p: PredictionIn):
    try:
        d = p.model_dump()
        d["day_of_week"] = parse_date_to_weekday(p.date)
        return waste_analysis_core(d)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Waste prediction error: {str(e)}")

@router.post("/waste-analysis")
def waste_analysis(p: PredictionIn):
    try:
        d = p.model_dump()
        d["day_of_week"] = parse_date_to_weekday(p.date)
        return waste_analysis_core(d)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Waste analysis error: {str(e)}")

@router.post("/consumption")
def consumption(c: ConsumptionIn):
    try:
        return process_live_consumption(c.food_item, c.food_prepared, c.food_consumed)
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Consumption tracking error: {str(e)}")

@router.get("/waste-reasons")
def get_waste_reasons():
    """Return recorded waste reasons distribution."""
    try:
        reasons_count = {}
        for r in DEMO_WASTE_RECORDS:
            reas = r["reason"]
            reasons_count[reas] = reasons_count.get(reas, 0) + r["quantity"]
            
        total = sum(reasons_count.values()) or 1.0
        breakdown = [
            {"reason": r, "quantity": round(q, 1), "percentage": round((q / total) * 100, 1)}
            for r, q in sorted(reasons_count.items(), key=lambda x: x[1], reverse=True)
        ]
        return {
            "valid_reasons": VALID_WASTE_REASONS,
            "breakdown": breakdown,
            "total_wasted_recorded": round(total, 1),
            "is_demo_data": True
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Waste reasons error: {str(e)}")

@router.post("/waste-record")
def record_waste(w: WasteRecordIn):
    try:
        reason_clean = w.reason.strip()
        matched = None
        for vr in VALID_WASTE_REASONS:
            if vr.lower() == reason_clean.lower():
                matched = vr
                break
        if not matched:
            raise HTTPException(status_code=400, detail=f"Invalid waste reason '{w.reason}'. Options: {VALID_WASTE_REASONS}")
            
        cost = round(w.quantity * w.unit_cost, 2)
        new_rec = {
            "id": len(DEMO_WASTE_RECORDS) + 1,
            "date": w.date,
            "food_item": w.food_item,
            "quantity": w.quantity,
            "reason": matched,
            "cost": cost
        }
        DEMO_WASTE_RECORDS.append(new_rec)
        return {"status": "success", "record": new_rec, "total_records": len(DEMO_WASTE_RECORDS)}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Record waste error: {str(e)}")

@router.post("/simulate")
def simulate(p: SimulationIn):
    try:
        d = p.model_dump()
        d["day_of_week"] = datetime.now().weekday()
        q = predict_core(d)
        d["food_prepared"] = q["recommended_preparation"]
        return {"demand": q, "waste": waste_core(d)}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Simulation error: {str(e)}")

@router.post("/retrain")
def retrain():
    try:
        return train()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Retraining error: {str(e)}")

@router.post("/log-actual")
def log_actual(obs: ActualObservationIn):
    """Log actual consumption observation into historical dataset."""
    try:
        global _df_cache, _df_mtime
        df = load()
        food_remaining = max(0.0, round(obs.food_prepared - obs.food_consumed, 2))
        food_wasted = max(0.0, round(obs.food_prepared - obs.food_consumed, 2))
        
        day_name = "Monday"
        try:
            day_name = datetime.fromisoformat(obs.date).strftime("%A")
        except Exception:
            pass
            
        prev_cons = float(df["food_consumed"].iloc[-1]) if len(df) > 0 else obs.food_consumed
        
        new_row = {
            "date": obs.date,
            "day": day_name,
            "expected_attendance": obs.expected_attendance,
            "actual_attendance": obs.actual_attendance,
            "food_item": obs.food_item,
            "food_prepared": obs.food_prepared,
            "food_consumed": obs.food_consumed,
            "food_remaining": food_remaining,
            "food_wasted": food_wasted,
            "holiday": obs.holiday,
            "event": obs.event,
            "exam": obs.exam,
            "temperature": obs.temperature,
            "rain_probability": obs.rain_probability,
            "previous_consumption": prev_cons
        }
        
        # Append row to CSV
        new_df = pd.DataFrame([new_row])
        new_df.to_csv(DATA, mode="a", header=False, index=False)
        
        # Invalidate cache
        _df_cache = None
        _df_mtime = None
        
        error_margin = round(abs(obs.food_prepared - obs.food_consumed), 2)
        
        return {
            "status": "success",
            "message": "Actual consumption logged successfully into training dataset.",
            "record": new_row,
            "error_margin": error_margin,
            "total_records": len(df) + 1
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Log actual consumption error: {str(e)}")

@router.get("/model-metrics")
def metrics():
    try:
        return train()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Metrics error: {str(e)}")
