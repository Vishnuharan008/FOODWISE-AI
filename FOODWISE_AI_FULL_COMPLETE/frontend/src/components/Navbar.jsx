import React, { useState } from "react";
import { 
  Sparkles, 
  UtensilsCrossed, 
  PieChart, 
  Search, 
  Sparkle, 
  Info, 
  Mail, 
  Menu, 
  X, 
  Flame, 
  ArrowRight,
  Cpu,
  ChefHat
} from "lucide-react";

export default function Navbar({ activePage, setActivePage }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home", icon: UtensilsCrossed },
    { id: "analyzer", label: "Food Analyzer", icon: Sparkles, badge: "AI Core" },
    { id: "dashboard", label: "Dashboard", icon: PieChart },
    { id: "search", label: "Food Search", icon: Search },
    { id: "recommendations", label: "AI Recommendations", icon: Sparkle },
    { id: "about", label: "About", icon: Info },
    { id: "contact", label: "Contact", icon: Mail },
  ];

  const handleNav = (id) => {
    setActivePage(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-emerald-500/20 bg-[#040810]/85 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          
          {/* Logo & Brand */}
          <div 
            onClick={() => handleNav("home")}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="relative">
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 p-[1.5px] shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-all duration-300">
                <div className="h-full w-full bg-[#050b14] rounded-2xl flex items-center justify-center">
                  <Flame className="w-6 h-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className="absolute -top-1 -right-1 flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-sans">FOODWISE</span>
                <span className="text-xs px-2 py-0.5 rounded-full font-extrabold bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-300 border border-emerald-400/30 tracking-wider">
                  AI
                </span>
              </div>
              <p className="text-[10px] tracking-[0.25em] text-slate-400 uppercase font-medium">
                Nutrition Intelligence
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNav(item.id)}
                  className={`relative px-3.5 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
                    isActive
                      ? "text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                      : "text-slate-300 hover:text-white hover:bg-white/[0.04]"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-emerald-400/20 text-emerald-300 font-semibold border border-emerald-400/30">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Enterprise Demand / Waste ML switcher */}
            <button
              onClick={() => handleNav("enterprise")}
              className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all flex items-center gap-1.5 ${
                activePage === "enterprise"
                  ? "bg-cyan-500/20 border-cyan-400 text-cyan-200"
                  : "bg-slate-900/60 border-slate-700/60 text-slate-300 hover:border-slate-500 hover:text-white"
              }`}
              title="Access the Institutional Kitchen & Food Waste ML Command Center"
            >
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Kitchen & Waste AI</span>
              <span className="text-[9px] px-1 rounded bg-cyan-400/20 text-cyan-300">ML</span>
            </button>

            {/* Quick Action */}
            <button
              onClick={() => handleNav("analyzer")}
              className="relative group overflow-hidden px-4 py-2 rounded-xl text-sm font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 hover:to-teal-200 transition-all shadow-md shadow-emerald-500/20 hover:shadow-emerald-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-slate-950" />
              <span>Analyze Meal</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNav("enterprise")}
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-900 border border-slate-700 text-cyan-300 flex items-center gap-1"
            >
              <ChefHat className="w-3.5 h-3.5" />
              <span>Kitchen AI</span>
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl border border-slate-700 bg-slate-900/80 text-slate-200 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#070e1a] border-l border-emerald-500/20 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center">
                    <Flame className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div>
                    <span className="font-bold text-white text-base">FOODWISE AI</span>
                    <p className="text-[9px] tracking-wider text-emerald-400">NUTRITION SYSTEM</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation list */}
              <div className="mt-6 space-y-1.5">
                {navLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = activePage === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleNav(item.id)}
                      className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                        isActive
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/30"
                          : "text-slate-300 hover:bg-white/[0.04] hover:text-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}

                <div className="pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => handleNav("enterprise")}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      activePage === "enterprise"
                        ? "bg-cyan-500/20 text-cyan-200 border border-cyan-400/40"
                        : "text-cyan-300 bg-cyan-950/20 border border-cyan-900/40 hover:bg-cyan-950/40"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>Kitchen & Waste AI</span>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/20 text-cyan-300 font-semibold">
                      Enterprise ML
                    </span>
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom button in mobile drawer */}
            <div className="pt-6 border-t border-slate-800">
              <button
                onClick={() => handleNav("analyzer")}
                className="w-full py-3 px-4 rounded-xl font-semibold text-slate-950 bg-gradient-to-r from-emerald-400 to-teal-300 hover:from-emerald-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20"
              >
                <Sparkles className="w-4 h-4 text-slate-950" />
                <span>Launch Food Analyzer</span>
              </button>
              <div className="mt-3 text-center">
                <span className="text-[11px] text-slate-500">v2.0.0 • AI-Powered Production Edition</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
