import React, { useState } from "react";
import { 
  Sparkles, 
  ArrowRight, 
  PieChart, 
  Search, 
  Flame, 
  ShieldCheck, 
  Zap, 
  Activity, 
  CheckCircle2, 
  Scale, 
  Leaf, 
  ChevronRight,
  TrendingUp,
  Apple,
  Dumbbell,
  Heart,
  Cpu,
  Layers,
  Utensils
} from "lucide-react";

export default function Home({ setActivePage }) {
  const [selectedDemoMeal, setSelectedDemoMeal] = useState("salmon");

  const demoMeals = {
    salmon: {
      name: "Wild Alaskan Salmon & Quinoa Bowl",
      tag: "High Protein • Anti-Inflammatory",
      cal: 585,
      protein: 42,
      carbs: 48,
      fat: 22,
      healthScore: 98,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=700&q=80",
      vitamins: "Omega-3: 2,200mg • Vit D: 85% DV • Magnesium: 35% DV"
    },
    avocado: {
      name: "Avocado Sourdough & Poached Eggs",
      tag: "Nutrient-Dense • Satiety Max",
      cal: 520,
      protein: 24.5,
      carbs: 42,
      fat: 28.5,
      healthScore: 94,
      image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=700&q=80",
      vitamins: "Lutein: High • Potassium: 680mg • Fiber: 9.2g"
    },
    chicken: {
      name: "Herb-Crusted Chicken & Brown Rice",
      tag: "Hypertrophy • Low Saturated Fat",
      cal: 540,
      protein: 52,
      carbs: 49,
      fat: 12.5,
      healthScore: 96,
      image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=700&q=80",
      vitamins: "Niacin: 92% DV • Selenium: 74% DV • Fiber: 6.8g"
    }
  };

  const currentMeal = demoMeals[selectedDemoMeal];

  const features = [
    {
      icon: Sparkles,
      title: "AI Visual Meal Analyzer",
      description: "Upload any meal photo or type its ingredients. Our multi-modal vision engine deconstructs exact calories, protein, carbohydrates, fats, and micronutrients in seconds.",
      tag: "Computer Vision",
      accent: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30"
    },
    {
      icon: PieChart,
      title: "Intelligent Daily Dashboard",
      description: "Track your real-time daily metabolic budget with dynamic progress rings, hydration tracking, and automatic meal timeline logging.",
      tag: "Live Tracking",
      accent: "from-teal-500/20 to-cyan-500/10",
      border: "border-teal-500/30"
    },
    {
      icon: Search,
      title: "100+ Food Nutrition Factsheets",
      description: "Instant searchable directory of raw staples, whole grains, cooked dishes, and superfoods with clinical-grade USDA nutritional breakdowns.",
      tag: "Database",
      accent: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30"
    },
    {
      icon: Zap,
      title: "Adaptive AI Recommendations",
      description: "Personalized meal scheduling and smart ingredient swaps custom-tailored to your exact biometric targets: Fat Loss, Lean Bulk, Keto, or Heart Health.",
      tag: "Bio-Algorithms",
      accent: "from-purple-500/20 to-indigo-500/10",
      border: "border-purple-500/30"
    },
    {
      icon: ShieldCheck,
      title: "Allergen & Glycemic Auditing",
      description: "Automatic detection of hidden food allergens (gluten, dairy, soy, nuts) and predictive glycemic load curves for sustained insulin stability.",
      tag: "Clinical Safety",
      accent: "from-amber-500/20 to-orange-500/10",
      border: "border-amber-500/30"
    },
    {
      icon: Leaf,
      title: "Kitchen & Waste Intelligence",
      description: "Built-in institutional machine learning models that predict cafeteria demand, forecast food waste, and compute dynamic purchasing requirements.",
      tag: "Sustainability ML",
      accent: "from-emerald-500/20 to-cyan-500/10",
      border: "border-emerald-500/30"
    }
  ];

  const steps = [
    {
      step: "01",
      title: "Snap or Describe",
      desc: "Upload a plate photograph or describe your meal in plain English. Our multi-modal AI immediately parses every ingredient.",
      badge: "Input Stream"
    },
    {
      step: "02",
      title: "Nutritional Deconstruction",
      desc: "Our neural network computes calories, protein, carbs, healthy fats, fiber, vitamins, and an overall health score (0-100).",
      badge: "Deep Analysis"
    },
    {
      step: "03",
      title: "Action & Optimize",
      desc: "Sync directly to your daily metabolic dashboard or receive instant AI food swaps to hit your health and fitness targets.",
      badge: "Personalized Guidance"
    }
  ];

  const stats = [
    { value: "98.4%", label: "AI Nutrition Accuracy", sub: "USDA Verified Standard" },
    { value: "100+", label: "Verified Food Profiles", sub: "Micronutrient Indexed" },
    { value: "< 2.5s", label: "Deconstruction Speed", sub: "Real-time AI Inference" },
    { value: "35%+", label: "Waste Reduction", sub: "Institutional Model" }
  ];

  return (
    <div className="space-y-24 md:space-y-32 pb-16 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-12 md:pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* Glow ambient backgrounds */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-emerald-500/15 via-teal-500/10 to-transparent blur-[120px] pointer-events-none rounded-full" />
        <div className="absolute top-10 right-10 w-[300px] h-[250px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
            <span>Next-Gen Artificial Intelligence for Nutrition</span>
            <span className="h-1 w-1 rounded-full bg-emerald-400" />
            <span className="text-emerald-400/90 font-mono">v2.0 Production</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
            Understand What You Eat with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
              Clinical Precision
            </span>
          </h1>

          {/* Short Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-300 leading-relaxed font-normal max-w-2xl mx-auto">
            FOODWISE AI instantly deconstructs meals, computes exact calories and macronutrients, tracks daily metabolic goals, and delivers personalized dietary guidance in seconds.
          </p>

          {/* Hero CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setActivePage("analyzer")}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl font-bold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all duration-300 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2.5 text-base group"
            >
              <Sparkles className="w-5 h-5 text-slate-950" />
              <span>Analyze a Meal Now</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActivePage("dashboard")}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl font-semibold text-white bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 transition-all duration-200 flex items-center justify-center gap-2 text-base hover:border-slate-500"
            >
              <PieChart className="w-5 h-5 text-emerald-400" />
              <span>Live Dashboard</span>
            </button>

            <button
              onClick={() => setActivePage("search")}
              className="w-full sm:w-auto px-5 py-3.5 rounded-xl font-semibold text-slate-300 hover:text-white transition-colors flex items-center justify-center gap-1.5 text-sm"
            >
              <Search className="w-4 h-4 text-cyan-400" />
              <span>Search Food Database</span>
            </button>
          </div>

          {/* Trust points */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>No Manual Logging Fatigue</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>USDA Standard Facts</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Zero Fabrication</span>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE HERO VISUAL SHOWCASE */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="rounded-3xl border border-emerald-500/20 bg-gradient-to-b from-[#091322]/90 to-[#040913]/95 p-4 sm:p-6 lg:p-8 backdrop-blur-2xl shadow-2xl shadow-emerald-950/40 relative overflow-hidden">
            
            {/* Top switcher bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-semibold">
                  LIVE AI MEAL PREVIEW
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Real-time Multi-Modal Deconstruction
                </h3>
              </div>

              {/* Meal Selector Tabs */}
              <div className="flex items-center gap-2 p-1 rounded-xl bg-slate-900/90 border border-slate-800 self-stretch sm:self-auto overflow-x-auto">
                <button
                  onClick={() => setSelectedDemoMeal("salmon")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedDemoMeal === "salmon"
                      ? "bg-emerald-500 text-slate-950 font-bold shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Salmon Bowl
                </button>
                <button
                  onClick={() => setSelectedDemoMeal("avocado")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedDemoMeal === "avocado"
                      ? "bg-emerald-500 text-slate-950 font-bold shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Avocado Toast
                </button>
                <button
                  onClick={() => setSelectedDemoMeal("chicken")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    selectedDemoMeal === "chicken"
                      ? "bg-emerald-500 text-slate-950 font-bold shadow"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Herb Chicken
                </button>
              </div>
            </div>

            {/* Showcase Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6 items-center">
              
              {/* Food Image with AI Scan Overlay */}
              <div className="lg:col-span-6 relative rounded-2xl overflow-hidden group border border-slate-700/60 shadow-lg aspect-video sm:aspect-[4/3]">
                <img
                  src={currentMeal.image}
                  alt={currentMeal.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* AI HUD Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent flex flex-col justify-between p-4">
                  <div className="flex justify-between items-start">
                    <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md border border-emerald-500/40 text-[11px] font-mono text-emerald-300 flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
                      AI Confidence: 98.6%
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500 text-slate-950 text-xs font-bold shadow">
                      Score: {currentMeal.healthScore}/100
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-emerald-300 tracking-wider uppercase">
                      {currentMeal.tag}
                    </span>
                    <h4 className="text-lg font-bold text-white">{currentMeal.name}</h4>
                  </div>
                </div>
              </div>

              {/* Nutrients Metrics Breakdown */}
              <div className="lg:col-span-6 space-y-4">
                
                {/* Total Calories Banner */}
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider">Total Energy Density</span>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="text-3xl font-extrabold text-white">{currentMeal.cal}</span>
                      <span className="text-sm font-semibold text-emerald-400">kcal</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Daily Target Share</span>
                    <p className="text-base font-bold text-cyan-300 mt-0.5">~{Math.round((currentMeal.cal / 2100) * 100)}%</p>
                  </div>
                </div>

                {/* Macro Split Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-emerald-500/20 text-center">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Protein</span>
                    <p className="text-xl font-bold text-emerald-300 mt-1">{currentMeal.protein}g</p>
                    <span className="text-[10px] text-slate-500">
                      {Math.round((currentMeal.protein * 4 / currentMeal.cal) * 100)}% calories
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-cyan-500/20 text-center">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Carbs</span>
                    <p className="text-xl font-bold text-cyan-300 mt-1">{currentMeal.carbs}g</p>
                    <span className="text-[10px] text-slate-500">
                      {Math.round((currentMeal.carbs * 4 / currentMeal.cal) * 100)}% calories
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-amber-500/20 text-center">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Fat</span>
                    <p className="text-xl font-bold text-amber-300 mt-1">{currentMeal.fat}g</p>
                    <span className="text-[10px] text-slate-500">
                      {Math.round((currentMeal.fat * 9 / currentMeal.cal) * 100)}% calories
                    </span>
                  </div>
                </div>

                {/* Micronutrients Snippet */}
                <div className="p-3.5 rounded-xl bg-slate-900/40 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>{currentMeal.vitamins}</span>
                  </div>
                </div>

                {/* Try Full Analyzer CTA */}
                <button
                  onClick={() => setActivePage("analyzer")}
                  className="w-full py-3 rounded-xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 font-semibold text-sm transition-all flex items-center justify-center gap-2"
                >
                  <span>Deconstruct Your Own Meal</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>

          </div>
        </div>

      </section>

      {/* 3. NUMERICAL STATS RIBBON */}
      <section className="border-y border-slate-800/80 bg-slate-950/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">
                  {item.value}
                </div>
                <div className="text-sm font-semibold text-white">{item.label}</div>
                <div className="text-xs text-slate-400">{item.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
          <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
            COMPREHENSIVE CAPABILITIES
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Engineered for Precision Health & Satiety
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            From single-dish visual analysis to institutional food waste mitigation, FoodWise AI delivers the complete modern food intelligence stack.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className={`p-6 rounded-2xl bg-gradient-to-b ${f.accent} bg-slate-950/70 border ${f.border} hover:border-emerald-400/50 transition-all duration-300 group hover:-translate-y-1 flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-11 w-11 rounded-xl bg-slate-900 border border-slate-700/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5 text-emerald-400" />
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                      {f.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {f.title}
                  </h3>

                  <p className="text-slate-400 text-sm mt-2 leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="pt-5 mt-4 border-t border-slate-800/80 flex items-center text-xs font-semibold text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>Explore Feature</span>
                  <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. HOW IT WORKS WORKFLOW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#07101e] to-[#040810] border border-slate-800 relative overflow-hidden">
          
          <div className="text-center max-w-xl mx-auto space-y-3 mb-14">
            <span className="text-xs uppercase tracking-widest text-teal-400 font-bold">
              SEAMLESS 3-STEP PIPELINE
            </span>
            <h2 className="text-3xl font-extrabold text-white">
              How FoodWise AI Operates
            </h2>
            <p className="text-slate-400 text-sm">
              Instantaneous nutrition quantification without the burden of manual database lookups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((st, i) => (
              <div key={i} className="relative p-6 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-4xl font-extrabold text-emerald-400/30 font-mono">
                    {st.step}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    {st.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white pt-2">{st.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => setActivePage("analyzer")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-slate-950 font-bold text-sm hover:bg-emerald-400 transition-colors shadow-lg shadow-emerald-500/20"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Test The AI Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

      {/* 6. BENEFITS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
              MEASURABLE ADVANTAGE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              Why Traditional Calorie Tracking Fails
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Manual calorie counting apps require 15 minutes of tedious weighing, barcode searching, and guesswork per meal. Over 78% of people abandon tracking within two weeks.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              FoodWise AI replaces friction with instant intelligence. Deconstruct recipes, analyze restaurant takeout, and gain actionable biochemical recommendations in seconds.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setActivePage("about")}
                className="px-5 py-2.5 rounded-xl border border-slate-700 bg-slate-900 text-white text-sm font-semibold hover:border-emerald-500 hover:text-emerald-300 transition-colors inline-flex items-center gap-2"
              >
                <span>Read The Science Behind FoodWise</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="h-9 w-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Dumbbell className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Effortless Macro Target Sync</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Automatically verify protein requirements for lean tissue synthesis without manual arithmetic.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="h-9 w-9 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Glycemic & Heart Wellness</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Mitigate postprandial glucose spikes with our predictive glycemic load modeling.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="h-9 w-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Leaf className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Reduce Domestic & Kitchen Waste</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Plan accurate portion quantities to prevent surplus preparation and unnecessary food spoilage.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-2">
              <div className="h-9 w-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-white text-base">Smart Food Swaps</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Receive instant healthy food substitutes that taste great while elevating fiber, vitamins, and minerals.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 7. FINAL CALL-TO-ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-teal-950/80 border border-emerald-500/30 p-8 sm:p-14 text-center relative overflow-hidden shadow-2xl">
          
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold">
              <Flame className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ready to transform your relationship with food?</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Start Analyzing Your Meals with FoodWise AI
            </h2>

            <p className="text-slate-300 text-base sm:text-lg">
              Experience the future of nutritional intelligence today. Free to explore, instant to use, and backed by verifiable biochemical models.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setActivePage("analyzer")}
                className="w-full sm:w-auto px-8 py-4 rounded-xl font-extrabold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 transition-all shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 text-base"
              >
                <Sparkles className="w-5 h-5 text-slate-950" />
                <span>Launch Food Analyzer</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setActivePage("dashboard")}
                className="w-full sm:w-auto px-7 py-4 rounded-xl font-bold text-white bg-slate-900 border border-slate-700 hover:bg-slate-800 transition-all text-base"
              >
                Open Nutrition Dashboard
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
