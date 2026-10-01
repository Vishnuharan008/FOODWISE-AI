import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./components/Home";
import FoodAnalyzer from "./components/FoodAnalyzer";
import NutritionDashboard from "./components/NutritionDashboard";
import FoodSearch from "./components/FoodSearch";
import AIRecommendations from "./components/AIRecommendations";
import About from "./components/About";
import Contact from "./components/Contact";
import EnterpriseHub from "./components/EnterpriseHub";

export default function App() {
  const [activePage, setActivePage] = useState("home");

  // Sync with browser hash if present (e.g. #analyzer, #dashboard)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "").toLowerCase();
      if (["home", "analyzer", "dashboard", "search", "recommendations", "about", "contact", "enterprise"].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handlePageChange = (page) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#04070d] text-slate-100 font-sans selection:bg-emerald-500 selection:text-black">
      
      {/* Top Main Navigation */}
      <Navbar activePage={activePage} setActivePage={handlePageChange} />

      {/* Main Page Content Body */}
      <main className="flex-1 w-full relative">
        {activePage === "home" && <Home setActivePage={handlePageChange} />}
        {activePage === "analyzer" && <FoodAnalyzer setActivePage={handlePageChange} />}
        {activePage === "dashboard" && <NutritionDashboard setActivePage={handlePageChange} />}
        {activePage === "search" && <FoodSearch setActivePage={handlePageChange} />}
        {activePage === "recommendations" && <AIRecommendations setActivePage={handlePageChange} />}
        {activePage === "about" && <About setActivePage={handlePageChange} />}
        {activePage === "contact" && <Contact />}
        {activePage === "enterprise" && <EnterpriseHub />}
      </main>

      {/* Modern Startup Footer */}
      <Footer setActivePage={handlePageChange} />

    </div>
  );
}