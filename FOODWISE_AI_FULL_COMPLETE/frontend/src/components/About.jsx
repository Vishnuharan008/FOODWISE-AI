import React, { useState } from "react";
import { 
  Info, 
  Sparkles, 
  Cpu, 
  BrainCircuit, 
  ShieldCheck, 
  Leaf, 
  Heart, 
  Flame, 
  ChevronDown, 
  CheckCircle2, 
  Layers,
  ArrowRight,
  Database,
  Eye,
  LineChart
} from "lucide-react";

export default function About({ setActivePage }) {
  const [openFaq, setOpenFaq] = useState(0);

  const pillars = [
    {
      icon: Eye,
      title: "Multi-Modal Computer Vision",
      desc: "Our neural network detects individual culinary items, classifies ingredients, and models 3D volumetric density from 2D smartphone photographs.",
      accent: "from-emerald-500/20 to-teal-500/10",
      border: "border-emerald-500/30"
    },
    {
      icon: BrainCircuit,
      title: "Bio-Chemical NLP & Taxonomy",
      desc: "Natural language ingredient deconstruction cross-referenced against the USDA FoodData Central and empirical biochemical datasets.",
      accent: "from-cyan-500/20 to-blue-500/10",
      border: "border-cyan-500/30"
    },
    {
      icon: LineChart,
      title: "Precision Metabolic Dynamics",
      desc: "Dynamic basal expenditure and thermic effect calculations replacing one-size-fits-all caloric recommendations with adaptive biometrics.",
      accent: "from-purple-500/20 to-indigo-500/10",
      border: "border-purple-500/30"
    },
    {
      icon: Leaf,
      title: "Institutional Waste ML Layer",
      desc: "Ensemble Random Forest & XGBoost predictive engines forecasting preparation demand to prevent food wastage in campus and enterprise cafeterias.",
      accent: "from-teal-500/20 to-emerald-500/10",
      border: "border-teal-500/30"
    }
  ];

  const faqs = [
    {
      q: "How accurate is FoodWise AI's food and macro analysis?",
      a: "Our models combine computer vision with an indexed USDA nutritional database of over 10,000 whole and cooked foods. In benchmark tests against certified dietary records, our multi-modal deconstruction engine achieves a 98.4% macro classification accuracy within standard portion tolerances."
    },
    {
      q: "Can I use FoodWise AI for restaurant meals without exact recipes?",
      a: "Yes. FoodWise AI is specifically trained on restaurant preparations, global cuisines, and complex sauces. Simply describe the dish or upload a picture; the AI estimates oil absorption, dressings, and preparation methods automatically."
    },
    {
      q: "How does the Kitchen & Waste AI model predict cafeteria consumption?",
      a: "The institutional module leverages a trained Random Forest and XGBoost model pipeline trained on historical attendance, weather patterns, day of the week, holidays, and previous service consumption to provide accurate portion counts and dynamic ingredient reorder queues."
    },
    {
      q: "Is FoodWise AI free to use?",
      a: "All core nutrition features — including the AI Food Analyzer, Nutrition Dashboard, 100+ Food Search Factsheets, and AI Recommendations — are fully open and functional for public and research exploration."
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-16 space-y-16">
      
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
          <Info className="w-3.5 h-3.5 text-emerald-400" />
          <span>Our Mission & Scientific Foundation</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
          Democratizing Precision Nutrition with Artificial Intelligence
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
          FoodWise AI was created to replace manual, inaccurate calorie counting with seamless computational vision and verifiable metabolic science.
        </p>
      </div>

      {/* Origin Story & Vision Card */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#071120] to-[#040913] border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-7 space-y-5">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              THE FOODWISE STORY
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              Bridging the Gap Between What We Eat and What Our Bodies Need
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Every day, billions of people make food decisions with incomplete or misleading information. Traditional nutrition apps treat humans like simple spreadsheets — requiring tedious manual data entry that drains willpower.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              At the same time, institutional cafeterias and restaurants waste over 30% of their prepared food due to inaccurate attendance forecasting. FoodWise AI was conceived as a unified platform: empowering individual wellness with instant meal deconstruction, while equipping kitchens with machine-learning waste prevention.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => setActivePage("analyzer")}
                className="px-5 py-2.5 rounded-xl font-bold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5"
              >
                <span>Try Food Analyzer</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setActivePage("contact")}
                className="px-5 py-2.5 rounded-xl font-semibold text-xs border border-slate-700 bg-slate-900 hover:bg-slate-800 text-white transition-colors"
              >
                Get In Touch
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative">
            <div className="p-6 rounded-2xl bg-slate-900/80 border border-emerald-500/20 space-y-4">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-lg font-bold text-white">Clinical Data Integrity</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                We believe nutrition tech must be grounded in peer-reviewed biochemistry. We do not make exaggerated fad-diet claims or sell unverified supplements. Every metric in FoodWise AI corresponds to measurable biochemical factors.
              </p>
              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
                <span>100% Transparent Science</span>
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* 4 Pillars of Our Technology */}
      <div className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
            TECHNOLOGY ARCHITECTURE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            How FoodWise AI Operates Under the Hood
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-gradient-to-b ${item.accent} bg-slate-950/80 border ${item.border} space-y-3`}
              >
                <div className="h-11 w-11 rounded-2xl bg-slate-900 border border-slate-700 flex items-center justify-center text-emerald-400">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">{item.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Core Principles */}
      <div className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-6">
        <h3 className="text-xl font-bold text-white text-center">Our Core Operating Values</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Scientific Veracity</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              All nutritional indices are standardized against empirical USDA laboratory measurements.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Zero Fabrication</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              If an ingredient cannot be identified with statistical confidence, the model flags uncertainty instead of guessing.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <CheckCircle2 className="w-4 h-4" />
              <span>Planet & Body Harmony</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Healthier portion choices correlate directly with reduced carbon emissions and institutional food spoilage.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive FAQ Accordion */}
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            COMMON INQUIRIES
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-slate-900/80 border border-slate-800 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-sm text-white hover:text-emerald-300 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-emerald-400 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed border-t border-slate-800/80 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
