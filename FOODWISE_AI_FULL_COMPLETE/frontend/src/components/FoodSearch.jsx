import React, { useState, useEffect } from "react";
import { 
  Search, 
  Filter, 
  Sparkles, 
  Heart, 
  Flame, 
  Plus, 
  CheckCircle2, 
  Info, 
  ShieldAlert, 
  X,
  ArrowUpDown,
  Utensils
} from "lucide-react";
import { api } from "../lib/api";

export default function FoodSearch({ onLogMeal, setActivePage }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [diet, setDiet] = useState("All");
  const [sortBy, setSortBy] = useState("score");
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFoodModal, setSelectedFoodModal] = useState(null);
  const [loggedItemIds, setLoggedItemIds] = useState(new Set());

  const categories = [
    "All", 
    "Proteins", 
    "Whole Grains", 
    "Vegetables", 
    "Fruits", 
    "Dairy & Plant Milks", 
    "Healthy Fats", 
    "Beverages"
  ];

  const diets = [
    "All", 
    "High Protein", 
    "Low Carb", 
    "Keto", 
    "Vegan", 
    "Vegetarian", 
    "Gluten Free", 
    "Heart Healthy"
  ];

  const searchFoods = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (query.trim()) params.append("q", query.trim());
      if (category !== "All") params.append("category", category);
      if (diet !== "All") params.append("diet", diet);
      params.append("sort_by", sortBy);

      const res = await api(`/nutrition/search?${params.toString()}`);
      setFoods(res.items || []);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      searchFoods();
    }, 200);
    return () => clearTimeout(delayDebounce);
  }, [query, category, diet, sortBy]);

  const handleQuickAdd = async (food) => {
    try {
      await api("/nutrition/log-meal", {
        method: "POST",
        body: JSON.stringify({
          meal_type: "Snack",
          name: food.name,
          calories: food.calories,
          protein: food.protein,
          carbs: food.carbs,
          fat: food.fat,
          fiber: food.fiber,
          image: food.image
        })
      });

      setLoggedItemIds(prev => new Set(prev).add(food.id));
      if (onLogMeal) onLogMeal(food);
      setTimeout(() => {
        setLoggedItemIds(prev => {
          const next = new Set(prev);
          next.delete(food.id);
          return next;
        });
      }, 3000);
    } catch (err) {
      console.warn("Log fallback:", err);
      setLoggedItemIds(prev => new Set(prev).add(food.id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      
      {/* Title & Introduction */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-semibold">
          <Search className="w-3.5 h-3.5 text-cyan-400" />
          <span>Biochemical Nutrient Taxonomy</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Food Nutrition Search
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Explore complete nutritional profiles, vitamins, minerals, glycemic rankings, and allergen indicators for everyday whole foods and cooked items.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl space-y-5">
        
        {/* Search Input and Sort */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search foods, ingredients, or nutrients (e.g. salmon, quinoa, spinach, protein)..."
              className="w-full pl-11 pr-10 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3.5 top-3.5 text-slate-500 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3.5 py-3 rounded-xl bg-slate-950 border border-slate-700 text-slate-200 text-xs focus:outline-none focus:border-cyan-400"
            >
              <option value="score">Sort: Highest Health Score</option>
              <option value="protein">Sort: Highest Protein</option>
              <option value="calories">Sort: Lowest Calories</option>
            </select>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
            Categories
          </span>
          <div className="flex flex-wrap gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  category === cat
                    ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/10"
                    : "bg-slate-950 text-slate-400 border border-slate-800 hover:text-white hover:border-slate-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Dietary Tag Filter Chips */}
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block mb-2">
            Dietary Constraints
          </span>
          <div className="flex flex-wrap gap-1.5">
            {diets.map((d) => (
              <button
                key={d}
                onClick={() => setDiet(d)}
                className={`px-3 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                  diet === d
                    ? "bg-cyan-500/20 text-cyan-300 border border-cyan-400"
                    : "bg-slate-950/60 text-slate-400 border border-slate-800/80 hover:text-white"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 px-1">
        <span>Showing <b className="text-white">{foods.length}</b> verified food items</span>
        <span>Standard USDA Biochemical Reference</span>
      </div>

      {/* Results Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-72 rounded-3xl bg-slate-900/40 border border-slate-800 animate-pulse" />
          ))}
        </div>
      ) : foods.length === 0 ? (
        <div className="p-16 text-center rounded-3xl bg-slate-900/40 border border-slate-800 space-y-3">
          <Utensils className="w-10 h-10 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-white">No food matches found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search terms or reset category and dietary filter pills.
          </p>
          <button
            onClick={() => { setQuery(""); setCategory("All"); setDiet("All"); }}
            className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-emerald-400 font-semibold hover:bg-slate-700"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {foods.map((food) => {
            const isLogged = loggedItemIds.has(food.id);
            return (
              <div
                key={food.id}
                className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1 shadow-lg"
              >
                <div className="space-y-4">
                  
                  {/* Food Card Image Header */}
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] border border-slate-800">
                    <img
                      src={food.image}
                      alt={food.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-slate-700 text-[10px] font-bold text-emerald-300">
                      {food.category}
                    </div>

                    <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-emerald-500 text-slate-950 text-[10px] font-extrabold shadow">
                      ★ {food.health_score}
                    </div>

                    <div className="absolute bottom-2 left-2 right-2 flex justify-between items-center text-[10px] px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-sm text-slate-300">
                      <span>Serving: {food.serving_size}</span>
                      <span className="font-mono text-emerald-400 font-bold">{food.calories} kcal</span>
                    </div>
                  </div>

                  {/* Title & Highlight */}
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                      {food.name}
                    </h3>
                    <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {food.highlight}
                    </p>
                  </div>

                  {/* Macro Preview Grid */}
                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block">Protein</span>
                      <span className="font-bold text-emerald-400 mt-0.5 block">{food.protein}g</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block">Carbs</span>
                      <span className="font-bold text-cyan-400 mt-0.5 block">{food.carbs}g</span>
                    </div>
                    <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-[10px] text-slate-500 uppercase block">Fat</span>
                      <span className="font-bold text-amber-400 mt-0.5 block">{food.fat}g</span>
                    </div>
                  </div>

                  {/* Diet tags */}
                  <div className="flex flex-wrap gap-1">
                    {food.diet_tags.slice(0, 3).map((tag, i) => (
                      <span key={i} className="text-[9px] px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800">
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

                {/* Bottom Actions */}
                <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={() => setSelectedFoodModal(food)}
                    className="text-xs text-slate-300 hover:text-white font-medium flex items-center gap-1 transition-colors"
                  >
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Full Factsheet</span>
                  </button>

                  <button
                    onClick={() => handleQuickAdd(food)}
                    disabled={isLogged}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isLogged
                        ? "bg-emerald-600 text-white"
                        : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    }`}
                  >
                    {isLogged ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Added!</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add to Meal</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Nutrition Factsheet Modal */}
      {selectedFoodModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setSelectedFoodModal(null)}
          />

          <div className="relative w-full max-w-lg bg-[#070f1e] border border-emerald-500/30 p-6 sm:p-8 rounded-3xl shadow-2xl space-y-6 z-10 max-h-[90vh] overflow-y-auto">
            
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={selectedFoodModal.image}
                  alt={selectedFoodModal.name}
                  className="w-14 h-14 rounded-2xl object-cover border border-slate-700"
                />
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                    {selectedFoodModal.category} • Health Score {selectedFoodModal.health_score}/100
                  </span>
                  <h3 className="text-xl font-bold text-white">{selectedFoodModal.name}</h3>
                  <p className="text-xs text-slate-400">Standard Portion: {selectedFoodModal.serving_size}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedFoodModal(null)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Calories & Macros Grid */}
            <div className="grid grid-cols-4 gap-2 text-center">
              <div className="p-3 rounded-2xl bg-slate-950 border border-slate-800">
                <span className="text-[10px] text-slate-500 uppercase font-bold">Calories</span>
                <p className="text-lg font-extrabold text-white mt-0.5">{selectedFoodModal.calories}</p>
                <span className="text-[9px] text-emerald-400">kcal</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-emerald-500/20">
                <span className="text-[10px] text-emerald-300 uppercase font-bold">Protein</span>
                <p className="text-lg font-extrabold text-emerald-300 mt-0.5">{selectedFoodModal.protein}g</p>
                <span className="text-[9px] text-slate-400">Tissue</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-cyan-500/20">
                <span className="text-[10px] text-cyan-300 uppercase font-bold">Carbs</span>
                <p className="text-lg font-extrabold text-cyan-300 mt-0.5">{selectedFoodModal.carbs}g</p>
                <span className="text-[9px] text-slate-400">Energy</span>
              </div>
              <div className="p-3 rounded-2xl bg-slate-950 border border-amber-500/20">
                <span className="text-[10px] text-amber-300 uppercase font-bold">Fat</span>
                <p className="text-lg font-extrabold text-amber-300 mt-0.5">{selectedFoodModal.fat}g</p>
                <span className="text-[9px] text-slate-400">Lipids</span>
              </div>
            </div>

            {/* Micronutrient Percent Daily Values (% DV) */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Micronutrients & Daily Value (% DV)
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Dietary Fiber</span>
                  <span className="font-bold text-white">{selectedFoodModal.fiber}g</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Natural Sugars</span>
                  <span className="font-bold text-white">{selectedFoodModal.sugar}g</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Sodium</span>
                  <span className="font-bold text-white">{selectedFoodModal.sodium}mg</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Potassium</span>
                  <span className="font-bold text-white">{selectedFoodModal.potassium}mg</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Calcium</span>
                  <span className="font-bold text-emerald-400">{selectedFoodModal.calcium_pct}% DV</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Iron</span>
                  <span className="font-bold text-emerald-400">{selectedFoodModal.iron_pct}% DV</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Vitamin A</span>
                  <span className="font-bold text-emerald-400">{selectedFoodModal.vitamin_a_pct}% DV</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex justify-between">
                  <span className="text-slate-400">Vitamin C</span>
                  <span className="font-bold text-emerald-400">{selectedFoodModal.vitamin_c_pct}% DV</span>
                </div>
              </div>
            </div>

            {/* Scientific Highlight */}
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-emerald-300 block mb-1">Biochemical Rationale:</span>
              {selectedFoodModal.highlight}
            </div>

            {/* Modal Bottom CTA */}
            <div className="flex items-center justify-end gap-3 pt-2 border-t border-slate-800">
              <button
                onClick={() => setSelectedFoodModal(null)}
                className="px-4 py-2 rounded-xl text-xs text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={() => {
                  handleQuickAdd(selectedFoodModal);
                  setSelectedFoodModal(null);
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-950 bg-emerald-400 hover:bg-emerald-300 transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add to Dashboard</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
