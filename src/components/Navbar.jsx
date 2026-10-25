import React, { useState } from "react";
import { ShoppingBag, Volume2, VolumeX, Sparkles, Laptop, Monitor } from "lucide-react";
import { toggleKitchenAmbiance, playClickSound } from "../utils/audioAmbiance";

export default function Navbar({
  cartCount,
  onOpenCart,
  activeDishId,
  dishes,
  isDeskMode,
  onToggleDeskMode
}) {
  const [isAudioActive, setIsAudioActive] = useState(false);

  const handleAudioToggle = () => {
    playClickSound();
    const newState = toggleKitchenAmbiance();
    setIsAudioActive(newState);
  };

  const scrollToDish = (id) => {
    playClickSound();
    const el = document.getElementById(`dish-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-40 bg-[#fdfbf7]/90 backdrop-blur-xl border-b border-[#292524]/10 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Emblem */}
        <a href="#" className="flex items-center gap-3.5 group focus:outline-none">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d97706] to-[#b45309] flex items-center justify-center shadow-lg shadow-[#d97706]/20 group-hover:scale-105 transition-transform">
            <span className="font-serif font-extrabold text-[#fdfbf7] text-xl tracking-tighter">
              BV
            </span>
          </div>
          <div>
            <span className="font-serif text-2xl font-bold tracking-tight text-[#1c1917] block group-hover:text-[#d97706] transition-colors">
              BITE<span className="text-[#d97706] font-light">VERSE</span>
            </span>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#78716c] block -mt-1 font-mono">
              Editorial 3D Dining
            </span>
          </div>
        </a>

        {/* Minimalist Navigation with Generous Whitespace (Reference Style) */}
        <nav className="hidden md:flex items-center gap-1.5 p-1 bg-[#f2ede4] border border-[#292524]/10 rounded-full">
          {dishes.map((dish) => {
            const isActive = activeDishId === dish.id;
            return (
              <button
                key={dish.id}
                onClick={() => scrollToDish(dish.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-serif transition-all ${
                  isActive
                    ? "bg-[#1c1917] text-[#fdfbf7] shadow-md shadow-black/10 font-bold"
                    : "text-[#57534e] hover:text-[#1c1917] hover:bg-[#e7e1d5]"
                }`}
              >
                {dish.name.replace("The ", "").replace("Napoli Fire ", "").replace("Shahi Dum ", "").replace("Tartufo ", "")}
              </button>
            );
          })}
          <button
            onClick={() => {
              playClickSound();
              const el = document.getElementById("animation-techniques");
              if (el) el.scrollIntoView({ behavior: "smooth" });
            }}
            className="px-4 py-1.5 rounded-full text-xs font-serif text-[#b45309] hover:text-[#1c1917] hover:bg-[#e7e1d5] font-semibold"
          >
            Animation Styles & Tech
          </button>
        </nav>

        {/* Right Action Cluster */}
        <div className="flex items-center gap-2.5">
          
          {/* Laptop 3D Studio Desk Mode Toggle */}
          <button
            onClick={() => {
              playClickSound();
              onToggleDeskMode();
            }}
            className={`px-3 py-1.5 rounded-xl border text-xs font-mono font-medium flex items-center gap-1.5 transition-all ${
              isDeskMode
                ? "bg-[#1c1917] text-[#fdfbf7] border-[#1c1917] shadow-md"
                : "bg-[#f2ede4] border-[#292524]/15 text-[#44403c] hover:bg-[#e8e2d6]"
            }`}
            title="Toggle Reference Laptop Desk Studio View"
          >
            {isDeskMode ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Exit Desk</span>
              </>
            ) : (
              <>
                <Laptop className="w-3.5 h-3.5 text-[#d97706]" />
                <span className="hidden sm:inline">Desk Studio</span>
              </>
            )}
          </button>

          {/* Ambiance Audio Toggle */}
          <button
            onClick={handleAudioToggle}
            className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-1.5 transition-all ${
              isAudioActive
                ? "bg-[#d97706]/15 border-[#d97706]/40 text-[#b45309]"
                : "bg-[#f2ede4] border-[#292524]/15 text-[#57534e] hover:bg-[#e8e2d6]"
            }`}
            title="Toggle Open Kitchen Sound Atmosphere"
          >
            {isAudioActive ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#d97706] animate-pulse" />
                <span className="hidden sm:inline">Flame ON</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sound</span>
              </>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => {
              playClickSound();
              onOpenCart();
            }}
            className="relative py-2 px-3.5 bg-[#1c1917] hover:bg-[#292524] text-[#fdfbf7] rounded-xl shadow-md transition-all flex items-center gap-2"
            title="View BiteVerse Cart"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline font-bold font-serif text-xs">
              Cart
            </span>
            {cartCount > 0 && (
              <span className="w-5 h-5 bg-[#d97706] text-white text-[11px] font-bold rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

        </div>

      </div>
    </header>
  );
}
