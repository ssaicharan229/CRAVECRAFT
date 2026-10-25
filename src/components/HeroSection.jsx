import React from "react";
import { Sparkles, ChevronDown, Layers, ArrowRight, Laptop, Award } from "lucide-react";
import { playClickSound } from "../utils/audioAmbiance";

export default function HeroSection({ dishes, onSelectDish, onOpen3DStudio, onToggleDeskMode }) {
  const scrollToFirstDish = () => {
    playClickSound();
    const el = document.getElementById("dish-burger");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-[92vh] pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-between items-center text-center overflow-hidden bg-[#fdfbf7] border-b border-[#292524]/10">
      
      {/* Subtle Warm Amber/Caramel Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#d97706]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Editorial Hero Header */}
      <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center mt-4">
        
        {/* Editorial Sub-badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f2ede4] border border-[#292524]/15 text-[#854d0e] text-xs font-mono font-medium uppercase tracking-[0.2em] mb-8 animate-fade-in shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
          <span>Cinematic Food Transformations • Volume 01</span>
        </div>

        {/* Large Editorial Serif Headline (Reference Style) */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-[#1c1917] tracking-tight leading-[1.08] mb-6">
          The Architectural <br />
          <span className="italic font-normal text-[#b45309]">
            Transformation
          </span>{" "}
          of Flavor.
        </h1>

        {/* Minimalist Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-[#57534e] font-sans font-normal leading-relaxed mb-10">
          Welcome to BiteVerse. An immersive study of gastronomic geometry and motion.
          Watch raw ingredients separate, rotate, and assemble into culinary perfection on an ivory canvas.
        </p>

        {/* Editorial Actions */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            onClick={scrollToFirstDish}
            className="py-4 px-8 bg-[#1c1917] hover:bg-[#292524] text-[#fdfbf7] font-serif font-bold rounded-2xl shadow-xl shadow-black/15 transition-all transform hover:scale-105 active:scale-95 flex items-center gap-2.5 text-sm"
          >
            <span>Explore Dish Transformations</span>
            <ArrowRight className="w-4 h-4 text-[#d97706]" />
          </button>

          <button
            onClick={() => {
              playClickSound();
              const el = document.getElementById("animation-techniques");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="py-4 px-8 bg-[#f2ede4] hover:bg-[#e7e1d5] border border-[#292524]/15 text-[#1c1917] font-serif font-semibold rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center gap-2.5 text-sm shadow-sm"
          >
            <Sparkles className="w-4 h-4 text-[#d97706]" />
            <span>Animation Styles & Tech Stack</span>
          </button>

          <button
            onClick={onToggleDeskMode}
            className="py-4 px-6 bg-gradient-to-r from-[#d97706]/15 to-[#b45309]/15 hover:bg-[#d97706]/25 border border-[#d97706]/30 text-[#854d0e] font-mono text-xs rounded-2xl transition-all flex items-center gap-2"
            title="View Inside 3D Laptop on Dark Desk"
          >
            <Laptop className="w-4 h-4 text-[#d97706]" />
            <span>Reference Desk View</span>
          </button>
        </div>

        {/* 4 Signature Masterpiece Dishes - Editorial Ivory Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl">
          {dishes.map((dish) => (
            <div
              key={dish.id}
              onClick={() => {
                playClickSound();
                const el = document.getElementById(`dish-${dish.id}`);
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="group p-3.5 bg-[#f8f5ee] hover:bg-[#f2ede4] border border-[#292524]/10 hover:border-[#d97706]/40 rounded-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 text-left flex flex-col justify-between shadow-sm"
            >
              <div className="relative aspect-square w-full rounded-xl overflow-hidden mb-3 bg-[#e8e2d6]">
                <img
                  src={dish.heroImage}
                  alt={dish.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 right-2 px-2 py-0.5 bg-[#1c1917]/85 backdrop-blur-sm rounded-md text-[10px] font-mono text-[#fdfbf7]">
                  ${dish.price.toFixed(2)}
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#b45309] block">
                  {dish.category}
                </span>
                <h3 className="font-serif font-bold text-[#1c1917] text-xs sm:text-sm line-clamp-1 group-hover:text-[#b45309] transition-colors">
                  {dish.name}
                </h3>
                <span className="text-[11px] text-[#78716c] block mt-0.5">
                  {dish.prepTime} • {dish.calories} kcal
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Bottom Scroll Indicator */}
      <div className="relative z-10 mt-12 flex flex-col items-center">
        <button
          onClick={scrollToFirstDish}
          className="flex flex-col items-center text-[#78716c] hover:text-[#1c1917] transition-colors group"
        >
          <span className="text-[10px] font-mono uppercase tracking-widest mb-1">
            Scroll To Transform
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce text-[#b45309]" />
        </button>
      </div>

    </section>
  );
}
