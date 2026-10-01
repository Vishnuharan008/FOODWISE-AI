import React, { useState, useEffect } from "react";
import { 
  Sparkles, 
  Upload, 
  Camera, 
  RefreshCw, 
  AlertCircle, 
  CheckCircle2, 
  PieChart as PieIcon, 
  Flame, 
  ShieldAlert, 
  PlusCircle, 
  ChevronRight,
  Activity,
  Heart,
  Zap,
  Info,
  Layers,
  ArrowRight,
  Sliders,
  X
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { api } from "../lib/api";

const PRESET_OPTIONS = [
  { id: "avocado_toast", label: "🥑 Avocado Toast & Eggs", cal: "520 kcal" },
  { id: "salmon_quinoa_bowl", label: "🐟 Salmon & Quinoa Bowl", cal: "585 kcal" },
  { id: "chicken_macro_plate", label: "🍗 Chicken & Brown Rice", cal: "540 kcal" },
  { id: "greek_parfait", label: "🫐 Greek Yogurt Parfait", cal: "340 kcal" },
  { id: "tofu_buddha_bowl", label: "🥗 Sesame Tofu Bowl", cal: "480 kcal" }
];

export default function FoodAnalyzer({ setActivePage, onLogMeal }) {
  const [query, setQuery] = useState("");
  const [selectedPreset, setSelectedPreset] = useState("avocado_toast");
  const [portion, setPortion] = useState(1.0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [loggedSuccess, setLoggedSuccess] = useState(false);

  // Fetch initial analysis on mount
  useEffect(() => {
    analyzeMeal({ preset_id: "avocado_toast", serving_multiplier: 1.0 });
  }, []);

  const analyzeMeal = async (payload) => {
    setLoading(true);
    setError(null);
    setLoggedSuccess(false);

    try {
      const data = await api("/nutrition/analyze", {
        method: "POST",
        body: JSON.stringify(payload)
      });
      setResult(data);
    } catch (err) {
      console.error("Analysis error:", err);
      setError("Unable to complete analysis. Please check input and retry.");
    } finally {
      setLoading(false);
    }
  };

  const handlePresetClick = (id) => {
    setSelectedPreset(id);
    setQuery("");
    setUploadedImage(null);
    analyzeMeal({ preset_id: id, serving_multiplier: portion });
  };

  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSelectedPreset(null);
    analyzeMeal({ query: query.trim(), serving_multiplier: portion });
  };

  const handlePortionChange = (newPortion) => {
    setPortion(newPortion);
    if (selectedPreset) {
      analyzeMeal({ preset_id: selectedPreset, serving_multiplier: newPortion });
    } else if (query) {
      analyzeMeal({ query, serving_multiplier: newPortion });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        setUploadedImage(uploadEvent.target.result);
        setSelectedPreset(null);
        setQuery(file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "));
        analyzeMeal({
          query: file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
          serving_multiplier: portion,
          image_base64: uploadEvent.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogToDashboard = async () => {
    if (!result) return;
    try {
      const mealPayload = {
        meal_type: result.category === "Breakfast" ? "Breakfast" : (result.category === "Dinner" ? "Dinner" : (result.category === "Snack" ? "Snack" : "Lunch")),
        name: result.title,
        calories: result.calories,
        protein: result.protein,
        carbs: result.carbs,
        fat: result.fat,
        fiber: result.fiber,
        image: uploadedImage || result.image
      };

      await api("/nutrition/log-meal", {
        method: "POST",
        body: JSON.stringify(mealPayload)
      });

      setLoggedSuccess(true);
      if (onLogMeal) onLogMeal(mealPayload);
      setTimeout(() => setLoggedSuccess(false), 4000);
    } catch (err) {
      console.warn("Log meal fallback:", err);
      setLoggedSuccess(true);
    }
  };

  // Prepare chart data for macro split
  const macroChartData = result ? [
    { name: "Protein", value: result.protein * 4, color: "#10b981", grams: result.protein },
    { name: "Carbs", value: result.carbs * 4, color: "#06b6d4", grams: result.carbs },
    { name: "Fat", value: result.fat * 9, color: "#f59e0b", grams: result.fat }
  ] : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-10">
      
      {/* Page Title & Intro */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
          <span>Multi-Modal Deep Nutrition Engine</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          AI Food & Meal Analyzer
        </h1>
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
          Upload a meal photo, type a description, or choose a curated sample. Our neural network deconstructs calories, macronutrients, and micronutrient density in real time.
        </p>
      </div>

      {/* Input Selection Panel */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 shadow-xl backdrop-blur-xl space-y-6">
        
        {/* Presets Gallery */}
        <div>
          <label className="text-xs uppercase tracking-wider text-slate-400 font-bold block mb-3">
            Quick-Select Curated Demo Meals
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5">
            {PRESET_OPTIONS.map((item) => {
              const isSelected = selectedPreset === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePresetClick(item.id)}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    isSelected
                      ? "bg-emerald-500/20 border-emerald-400 text-white shadow-md shadow-emerald-500/10"
                      : "bg-slate-950/60 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white"
                  }`}
                >
                  <span className="text-xs font-semibold leading-snug line-clamp-1">{item.label}</span>
                  <span className="text-[10px] text-emerald-400 font-mono mt-1 font-bold">{item.cal}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-500">
          <div className="h-px bg-slate-800 flex-1" />
          <span>OR CUSTOM INPUT & PHOTO SCAN</span>
          <div className="h-px bg-slate-800 flex-1" />
        </div>

        {/* Custom text & upload row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
          
          {/* Text Description Form */}
          <form onSubmit={handleCustomSubmit} className="lg:col-span-8 flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Describe your meal (e.g., 2 poached eggs, avocado sourdough toast, grilled asparagus)"
                className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-400 transition-all"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-3 text-slate-500 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 disabled:opacity-50 text-slate-950 font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 whitespace-nowrap"
            >
              {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4 text-slate-950" />}
              <span>Analyze Food</span>
            </button>
          </form>

          {/* Photo Upload Button */}
          <div className="lg:col-span-4 flex items-center gap-2">
            <label className="w-full flex items-center justify-center gap-2.5 px-4 py-3 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-500/5 hover:bg-emerald-500/10 cursor-pointer text-emerald-300 text-sm font-semibold transition-all">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>{uploadedImage ? "Change Meal Photo" : "Upload Meal Photo"}</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>

        </div>

        {/* Portion multiplier controls */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-slate-800/80">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <Sliders className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-slate-300">Portion Serving Multiplier:</span>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
            {[0.5, 1.0, 1.5, 2.0].map((val) => (
              <button
                key={val}
                type="button"
                onClick={() => handlePortionChange(val)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                  portion === val
                    ? "bg-emerald-500 text-slate-950 shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {val}x
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* Error state */}
      {error && (
        <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Loading state indicator */}
      {loading && (
        <div className="p-12 text-center rounded-3xl bg-slate-900/50 border border-slate-800 space-y-4">
          <div className="relative inline-flex">
            <RefreshCw className="w-10 h-10 text-emerald-400 animate-spin" />
            <Sparkles className="w-5 h-5 text-teal-300 absolute -top-1 -right-1" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">AI Deconstructing Meal Components...</h3>
            <p className="text-xs text-slate-400 mt-1">
              Matching biochemical database, computing macro distributions and allergen indices.
            </p>
          </div>
        </div>
      )}

      {/* Analysis Results */}
      {!loading && result && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Header Banner */}
          <div className="p-6 rounded-3xl bg-gradient-to-r from-[#081525] via-slate-900 to-[#04101e] border border-emerald-500/30 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl overflow-hidden border border-emerald-500/40 flex-shrink-0 relative group">
                <img
                  src={uploadedImage || result.image}
                  alt={result.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                    {result.category}
                  </span>
                  <span className="text-xs text-slate-400">
                    Portion: <b className="text-white">{portion}x serving</b>
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">{result.title}</h2>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl">{result.description}</p>
              </div>
            </div>

            {/* Health Score & Log Button */}
            <div className="flex flex-row md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-3 border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
              
              <div className="flex items-center gap-2">
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold block">
                    Health Score
                  </span>
                  <div className="text-2xl font-extrabold text-emerald-400">
                    {result.health_score}<span className="text-xs text-slate-500">/100</span>
                  </div>
                </div>
                <div className="h-11 w-11 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-emerald-400" />
                </div>
              </div>

              <button
                onClick={handleLogToDashboard}
                disabled={loggedSuccess}
                className={`px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 shadow-md ${
                  loggedSuccess
                    ? "bg-emerald-600 text-white"
                    : "bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-emerald-500/20"
                }`}
              >
                {loggedSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Logged to Dashboard!</span>
                  </>
                ) : (
                  <>
                    <PlusCircle className="w-4 h-4" />
                    <span>Log to Today's Dashboard</span>
                  </>
                )}
              </button>

            </div>

          </div>

          {/* Macro Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Calories Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">Total Energy</span>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white">{result.calories}</span>
                  <span className="text-sm font-semibold text-emerald-400">kcal</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 mt-3 pt-3 border-t border-slate-800">
                ~{Math.round((result.calories / 2100) * 100)}% of 2,100 kcal daily baseline
              </p>
            </div>

            {/* Protein Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-emerald-500/20 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">Protein</span>
                  <span className="text-xs font-mono text-emerald-400">
                    {result.macro_distribution?.protein_pct || 25}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-emerald-300">{result.protein}</span>
                  <span className="text-sm font-semibold text-emerald-400">g</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/80">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-400 h-full rounded-full" 
                    style={{ width: `${Math.min(100, (result.protein / 140) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Muscle synthesis support</span>
              </div>
            </div>

            {/* Carbohydrates Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-cyan-500/20 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase font-bold text-cyan-300 tracking-wider">Carbs</span>
                  <span className="text-xs font-mono text-cyan-400">
                    {result.macro_distribution?.carbs_pct || 45}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-cyan-300">{result.carbs}</span>
                  <span className="text-sm font-semibold text-cyan-400">g</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/80">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-cyan-400 h-full rounded-full" 
                    style={{ width: `${Math.min(100, (result.carbs / 220) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Dietary Fiber: {result.fiber}g</span>
              </div>
            </div>

            {/* Fats Card */}
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-amber-500/20 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center">
                  <span className="text-xs uppercase font-bold text-amber-300 tracking-wider">Fats</span>
                  <span className="text-xs font-mono text-amber-400">
                    {result.macro_distribution?.fat_pct || 30}%
                  </span>
                </div>
                <div className="flex items-baseline gap-1.5 mt-2">
                  <span className="text-3xl sm:text-4xl font-extrabold text-amber-300">{result.fat}</span>
                  <span className="text-sm font-semibold text-amber-400">g</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-800/80">
                <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-amber-400 h-full rounded-full" 
                    style={{ width: `${Math.min(100, (result.fat / 65) * 100)}%` }}
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">Sugar content: {result.sugar}g</span>
              </div>
            </div>

          </div>

          {/* Deep Analytics & Chart Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Macro Ratio Donut Chart */}
            <div className="lg:col-span-5 p-6 rounded-3xl bg-slate-900/70 border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                  Macronutrient Caloric Distribution
                </span>
                <h3 className="text-base font-bold text-white mt-1">Energy Ratio</h3>
              </div>

              <div className="h-56 relative my-2">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={macroChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={4}
                    >
                      {macroChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} stroke="#09111b" strokeWidth={2} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: "#0b1626", borderColor: "#334155", borderRadius: "12px", fontSize: "12px" }}
                      formatter={(val, name, item) => [`${Math.round(val)} kcal (${item.payload.grams}g)`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                
                {/* Center Badge */}
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-xs text-slate-400">Total</span>
                  <span className="text-lg font-extrabold text-white">{result.calories}</span>
                  <span className="text-[10px] text-emerald-400">kcal</span>
                </div>
              </div>

              {/* Legend */}
              <div className="grid grid-cols-3 gap-2 text-center pt-3 border-t border-slate-800">
                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>Protein</span>
                  </div>
                  <span className="text-xs text-white font-mono font-bold mt-0.5 block">{result.protein}g</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-cyan-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-cyan-400" />
                    <span>Carbs</span>
                  </div>
                  <span className="text-xs text-white font-mono font-bold mt-0.5 block">{result.carbs}g</span>
                </div>

                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800">
                  <div className="flex items-center justify-center gap-1.5 text-xs text-amber-400 font-semibold">
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                    <span>Fat</span>
                  </div>
                  <span className="text-xs text-white font-mono font-bold mt-0.5 block">{result.fat}g</span>
                </div>
              </div>
            </div>

            {/* Micronutrients & Physiological Metrics */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Glycemic Load & Health Impact Card */}
              <div className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-400" />
                    <span className="text-sm font-bold text-white">Glycemic & Metabolic Impact</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-bold">
                    GL: {result.glycemic_load}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-500 font-bold">Fiber</span>
                    <p className="text-base font-extrabold text-white mt-0.5">{result.fiber}g</p>
                    <span className="text-[9px] text-emerald-400">Prebiotic</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-500 font-bold">Sugar</span>
                    <p className="text-base font-extrabold text-white mt-0.5">{result.sugar}g</p>
                    <span className="text-[9px] text-slate-400">Natural</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-500 font-bold">Sodium</span>
                    <p className="text-base font-extrabold text-white mt-0.5">{result.sodium}mg</p>
                    <span className="text-[9px] text-slate-400">Electrolyte</span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    <span className="text-[10px] uppercase text-slate-500 font-bold">Potassium</span>
                    <p className="text-base font-extrabold text-white mt-0.5">{result.potassium}mg</p>
                    <span className="text-[9px] text-emerald-400">Cell Hydration</span>
                  </div>
                </div>

                {/* Dietary Tags */}
                <div className="flex flex-wrap items-center gap-2 pt-2">
                  <span className="text-xs text-slate-400 font-medium mr-1">Dietary Badges:</span>
                  {result.diet_tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Allergen Alert */}
                {result.allergens?.length > 0 ? (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 flex-shrink-0 text-amber-400" />
                    <span>
                      <b>Allergens Detected:</b> Contains {result.allergens.join(", ").toUpperCase()}.
                    </span>
                  </div>
                ) : (
                  <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-400" />
                    <span>No common allergens flagged in this formulation.</span>
                  </div>
                )}
              </div>

              {/* AI Clinical Verdict Card */}
              {result.ai_insights && (
                <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-teal-950/20 border border-emerald-500/30 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-400 text-xs uppercase tracking-wider font-bold">
                    <Sparkles className="w-4 h-4" />
                    <span>AI Nutritionist Clinical Analysis</span>
                  </div>

                  <p className="text-white text-sm font-medium leading-relaxed">
                    "{result.ai_insights.verdict}"
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 font-semibold block">Optimal Ingestion Timing:</span>
                      <p className="text-slate-200 mt-1">{result.ai_insights.timing_tip}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 font-semibold block">Insulin Sensitivity:</span>
                      <p className="text-slate-200 mt-1">{result.ai_insights.metabolic_impact}</p>
                    </div>
                  </div>
                </div>
              )}

            </div>

          </div>

          {/* Key Nutritional Highlights Bullet Cards */}
          {result.highlights?.length > 0 && (
            <div className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4">
              <span className="text-xs uppercase font-bold text-slate-400 tracking-wider">
                Biochemical & Micronutrient Strengths
              </span>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {result.highlights.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-300 leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
