from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes.api import router as core_router
from .routes.nutrition import router as nutrition_router, submit_contact, ContactMessageIn

app = FastAPI(title="FOODWISE AI — Full Intelligence API", version="2.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

# Core demand, preparation, waste ML routes
app.include_router(core_router, prefix="/api")

# Modern AI Nutrition, Food Analyzer, Search & Recommendation routes
app.include_router(nutrition_router, prefix="/api")

# Top-level contact endpoint
@app.post("/api/contact")
def direct_contact(msg: ContactMessageIn):
    return submit_contact(msg)

@app.get("/")
def root():
    return {
        "project": "FOODWISE AI",
        "status": "online",
        "version": "2.0.0",
        "features": [
            "AI Food & Meal Analyzer",
            "USDA-Standard Nutrition Intelligence",
            "Personalized Macro & Calorie Planning",
            "Smart Dietary Recommendations",
            "Real-Time Food Search Engine",
            "Enterprise Demand & Waste ML Models"
        ]
    }
