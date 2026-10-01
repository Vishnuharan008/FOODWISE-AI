# FOODWISE AI — Precision Food & Nutrition Intelligence Platform

**FOODWISE AI** is a complete, modern, production-grade AI-powered food, nutrition, and dietary intelligence web application. It combines deep nutritional analysis, multi-modal meal deconstruction, personalized bio-algorithmic diet recommendations, interactive metabolic tracking, and institutional food demand & waste mitigation.

---

## 🌟 Key Application Pages & Capabilities

### 1. Home (Landing Page)
- **Hero Showcase**: High-impact startup hero section with animated gradient headline, feature pills, dynamic stats counters (98.4% AI accuracy, 100+ foods, <2.5s inference), and direct action buttons.
- **Interactive Live Meal Preview**: Instant deconstruction demo comparing Wild Salmon, Avocado Toast, and Herb Chicken with live macro donut charts and health scores.
- **Comprehensive Feature Grid**: Highlighting Computer Vision, Metabolic Tracking, Food Factsheets, Adaptive Dietary Engine, Allergen Auditing, and Waste Sustainability.
- **How It Works**: 3-step pipeline (1. Snap or Describe, 2. Deep Deconstruction, 3. Optimize Health & Satiety).
- **Why Traditional Tracking Fails**: Explaining the science of eliminating manual logging fatigue.
- **Final CTA & Modern Footer**: Direct launchpad with newsletter subscription, system health status, and scientific disclaimers.

### 2. AI Food Analyzer
- **Multi-Modal Meal Input**: Upload meal photographs with live preview, or describe meals using natural language (e.g. *"2 poached eggs on avocado sourdough toast with olive oil"*).
- **Curated Meal Preset Gallery**: 1-click presets for instant evaluation (Avocado Sourdough Toast, Salmon & Quinoa Bowl, Herb Chicken & Brown Rice, Greek Yogurt Berry Parfait, Sesame Tofu Buddha Bowl).
- **Portion Multiplier**: Dynamic slider/buttons (0.5x, 1x, 1.5x, 2.0x serving).
- **Rich Results Deconstruction**:
  - Calorie energy density vs daily target percentage
  - Recharts Macro Split Donut Chart (Protein, Carbs, Fat)
  - Micronutrient meters: Prebiotic Fiber, Natural Sugars, Sodium, Potassium
  - Composite Health Score (1–100)
  - Glycemic Load ranking with insulin sensitivity impact
  - Allergen safety alerts (dairy, gluten, nuts, soy, etc.)
  - AI Nutritionist Clinical Verdict card (optimal ingestion timing & metabolic insights)
- **1-Click Dashboard Sync**: Directly log the analyzed meal into today's timeline.

### 3. Nutrition & Bio-Metabolic Dashboard
- **Caloric Budget Ring**: Live progress indicator tracking consumed vs target vs remaining calories.
- **Macronutrient Progress Bars**: Protein synthesis goal, complex carbs, and healthy fats.
- **Interactive Hydration Tracker**: Real-time water tracker with `+1 Glass` (+250ml) and `-250ml` controls.
- **Meal Timeline Summary**: Chronological timeline of Breakfast, Lunch, Dinner, and Snacks with dish photos, macros, timestamps, and delete controls.
- **Log Custom Meal Dialog**: Modal to manually add any custom dish to today's log.
- **7-Day Trend Chart**: Responsive Recharts AreaChart plotting daily caloric consumption against the 2,100 kcal target.

### 4. Food Search & Factsheet Directory
- **Fast Search Engine**: Instant search across 100+ verified whole foods, grains, cooked dishes, and beverages.
- **Category Filter Pills**: Proteins, Whole Grains, Vegetables, Fruits, Dairy & Plant Milks, Healthy Fats, Beverages.
- **Dietary Filter Chips**: High Protein, Low Carb, Keto, Vegan, Vegetarian, Gluten Free, Heart Healthy.
- **Dynamic Sorting**: Highest Health Score, Highest Protein, Lowest Calories.
- **Interactive Factsheet Modal**: Opens comprehensive % Daily Value (% DV) breakdown for Calcium, Iron, Vitamin A, Vitamin C, Potassium, Fiber, and biochemical rationale.
- **Quick-Add**: 1-click button to add any searched item directly to the active meal log.

### 5. Personalized AI Recommendations
- **Biometric Goal Customizer**:
  - Primary Goal: Fat Loss & Definition, Hypertrophy & Muscle Gain, Longevity & Heart Health, Ketogenic / Low-Carb, Plant-Based Synergy
  - Activity Level: Sedentary, Moderately Active, Highly Active, Athletic
  - Dietary Restrictions: Omnivore, Vegetarian, Vegan, Pescatarian, Gluten-Free
  - Weight & target calorie tuning
- **Custom 4-Meal Daily Blueprint**: Breakfast, Lunch, Afternoon Snack, and Dinner schedules with ingredient checklists, macro breakdowns, and clinical benefits.
- **Smart AI Food Swaps**: Actionable ingredient substitutions (e.g. white rice → tricolor quinoa, mayonnaise → avocado mash, sugary cereal → chia oats).
- **Micronutrient Focus Tags**: Highlighting key compounds (BCAAs, Omega-3, Sulforaphane, Prebiotics).
- **Apply Entire Plan**: 1-click action to log all 4 meals to the daily dashboard.

### 6. About & Scientific Foundation
- **Mission & Origin**: The story behind computational nutrition and clinical data integrity.
- **4 Technology Pillars**: Multi-modal vision, bio-chemical NLP, precision metabolic modeling, and institutional waste ML.
- **Core Principles**: Scientific veracity, zero fabrication, and planetary harmony.
- **Interactive FAQ Accordion**: Answers to accuracy, restaurant meals, privacy, and models.

### 7. Contact & Support
- **Professional Form**: Full name, email address with regex validation, subject category dropdown, and message textarea.
- **Client & Server Validation**: Real-time error alerts, character validation, and loading indicators.
- **Ticket Generation**: Generates official reference ticket numbers (e.g., `FW-261001-001`).
- **Direct Correspondence**: Support email, operating hours, research lab address, and privacy pledge.

### 8. Kitchen & Waste AI (Preserved Institutional ML Suite)
- **Demand Forecasting**: Random Forest model predicting cafeteria attendance and portion demand.
- **Preparation & Ingredient Queue**: Dynamic recipe scaling calculating shortages and purchase orders.
- **Kitchen Inventory Stock**: Real-time ingredient stock and reorder levels.
- **Live Service Stream**: Trays-in-service tracking and surplus redistribution warnings.
- **XGBoost Waste Intelligence**: Pre-service risk scoring and cost estimations.
- **What-If Scenario Lab**: Simulating weather dips, rain, and event cancellations.
- **Explainable AI (XAI)**: Feature impact decomposition for transparency.
- **Continuous Self-Learning**: Live model retraining endpoint (`POST /api/retrain`) with MAE and RMSE metrics.
- **Historical Data Vault**: View historical records from `food_history.csv`.

---

## 🛠 Tech Stack

- **Frontend**: React 18, Vite 5, Tailwind CSS v4, Framer Motion, Lucide React, Recharts.
- **Backend**: FastAPI, Uvicorn, Pydantic, Python 3.10+, Scikit-Learn (Random Forest, Linear Regression), XGBoost, Pandas, NumPy, Joblib.

---

## 🚀 Running the Application

### 1. Start the Backend API (FastAPI)
```bash
cd backend
python -m venv .venv
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

pip install -r requirements.txt
python -m uvicorn app.main:app --reload --port 8000
```
Backend runs at: `http://127.0.0.1:8000` (Interactive API docs at `http://127.0.0.1:8000/docs`).

### 2. Start the Frontend (Vite)
```bash
cd frontend
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`.

### 3. Production Build
```bash
cd frontend
npm run build
```
Generates optimized, minified production assets in `frontend/dist`.
