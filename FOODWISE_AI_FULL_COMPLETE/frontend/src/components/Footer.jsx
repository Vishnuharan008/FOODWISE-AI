import React, { useState } from "react";
import { 
  Flame, 
  ArrowRight, 
  Heart, 
  ShieldCheck, 
  Activity, 
  CheckCircle2, 
  Github, 
  Twitter, 
  Linkedin,
  Mail
} from "lucide-react";

export default function Footer({ setActivePage }) {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const navTo = (page) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#03060c] border-t border-slate-800/80 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-slate-800/70">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div 
              onClick={() => navTo("home")}
              className="flex items-center gap-3 cursor-pointer inline-flex"
            >
              <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-[1.5px]">
                <div className="h-full w-full bg-[#050b14] rounded-2xl flex items-center justify-center">
                  <Flame className="w-5 h-5 text-emerald-400" />
                </div>
              </div>
              <div>
                <span className="text-xl font-bold tracking-tight text-white font-sans">FOODWISE AI</span>
                <p className="text-[10px] tracking-[0.25em] text-emerald-400 uppercase font-medium">Nutrition Intelligence</p>
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Empowering individuals and food institutions with clinical-grade nutritional breakdown, predictive demand modeling, and personalized dietary guidance through state-of-the-art AI.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>All AI Models Active</span>
              </div>
              <div className="text-xs text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>Verified USDA Standards</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navTo("home")} className="hover:text-emerald-400 transition-colors">
                  Home Overview
                </button>
              </li>
              <li>
                <button onClick={() => navTo("analyzer")} className="hover:text-emerald-400 transition-colors flex items-center gap-1.5">
                  <span>AI Food Analyzer</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 font-bold">New</span>
                </button>
              </li>
              <li>
                <button onClick={() => navTo("dashboard")} className="hover:text-emerald-400 transition-colors">
                  Nutrition Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => navTo("search")} className="hover:text-emerald-400 transition-colors">
                  Food Search Directory
                </button>
              </li>
              <li>
                <button onClick={() => navTo("recommendations")} className="hover:text-emerald-400 transition-colors">
                  Dietary Recommender
                </button>
              </li>
            </ul>
          </div>

          {/* Technology & Company */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Intelligence</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button onClick={() => navTo("about")} className="hover:text-emerald-400 transition-colors">
                  About & Science
                </button>
              </li>
              <li>
                <button onClick={() => navTo("enterprise")} className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 text-slate-300">
                  <span>Kitchen & Demand ML</span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-300 font-bold">Enterprise</span>
                </button>
              </li>
              <li>
                <button onClick={() => navTo("contact")} className="hover:text-emerald-400 transition-colors">
                  Contact & Support
                </button>
              </li>
              <li>
                <span className="text-slate-500 hover:text-slate-400 cursor-default">
                  Multi-Modal Vision Engine
                </span>
              </li>
              <li>
                <span className="text-slate-500 hover:text-slate-400 cursor-default">
                  Bio-Energetic NLP
                </span>
              </li>
            </ul>
          </div>

          {/* Newsletter Subscribe */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Stay Ahead</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Receive weekly research briefings on nutritional biochemistry, smart metabolism, and AI food tech.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white placeholder-slate-500 text-xs focus:outline-none focus:border-emerald-500 transition-all pr-9"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 p-1.5 rounded-lg bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
                  aria-label="Subscribe"
                >
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <div className="flex items-center gap-1.5 text-emerald-400 text-xs animate-fadeIn">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed! Welcome to FoodWise AI.</span>
                </div>
              )}
            </form>
          </div>

        </div>

        {/* Bottom Disclaimers & Copyright */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} FOODWISE AI Inc. All rights reserved. Precision Nutrition and Sustainable Food Intelligence.
          </p>

          <div className="flex items-center gap-6">
            <span className="text-slate-500 text-[11px]">
              Disclaimer: Nutritional metrics are AI approximations; consult a physician for clinical dietary treatment.
            </span>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="hover:text-white cursor-pointer transition-colors"><Twitter className="w-4 h-4" /></span>
              <span className="hover:text-white cursor-pointer transition-colors"><Github className="w-4 h-4" /></span>
              <span className="hover:text-white cursor-pointer transition-colors"><Linkedin className="w-4 h-4" /></span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
