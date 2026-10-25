import React, { useState } from "react";
import { X, Check, Flame, Plus, Minus, Sparkles, ChefHat } from "lucide-react";
import { playClickSound, playSuccessChime } from "../utils/audioAmbiance";

export default function DishCustomizerModal({ dish, onClose, onAddToCart }) {
  const [selectedPortion, setSelectedPortion] = useState(dish.portions[0]);
  const [spiceLevel, setSpiceLevel] = useState(dish.spiceLevel);
  const [selectedAddons, setSelectedAddons] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState("");

  const toggleAddon = (addon) => {
    playClickSound();
    if (selectedAddons.some((a) => a.id === addon.id)) {
      setSelectedAddons(selectedAddons.filter((a) => a.id !== addon.id));
    } else {
      setSelectedAddons([...selectedAddons, addon]);
    }
  };

  const addonsTotal = selectedAddons.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = (dish.price * selectedPortion.multiplier) + addonsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    playSuccessChime();
    const customizedItem = {
      dishId: dish.id,
      name: dish.name,
      basePrice: dish.price,
      portion: selectedPortion,
      spiceLevel,
      addons: selectedAddons,
      specialInstructions,
      quantity,
      unitPrice,
      totalPrice,
      heroImage: dish.heroImage
    };
    onAddToCart(customizedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-[#0f141d] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="relative p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl overflow-hidden bg-black/50 border border-white/10">
              <img src={dish.heroImage} alt={dish.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <span className="text-[10px] font-mono text-amber-400 uppercase tracking-widest block">
                Craft Your Masterpiece
              </span>
              <h3 className="text-xl font-bold font-syne text-white">
                {dish.name}
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/60 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body / Customization Form */}
        <div className="p-6 overflow-y-auto space-y-6">
          
          {/* 1. Portion Selection */}
          <div>
            <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-3">
              1. Choose Portion & Serving Size
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {dish.portions.map((portion) => {
                const isSelected = selectedPortion.id === portion.id;
                const portionPrice = dish.price * portion.multiplier;
                return (
                  <button
                    key={portion.id}
                    onClick={() => {
                      playClickSound();
                      setSelectedPortion(portion);
                    }}
                    className={`p-3 rounded-2xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-amber-500/20 border-amber-400 text-white shadow-lg shadow-amber-500/10"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <span className="text-xs font-semibold">{portion.name}</span>
                    <span className="text-xs font-mono font-bold text-amber-400 mt-2">
                      ${portionPrice.toFixed(2)}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Spice Index */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider">
                2. Kitchen Spice Meter
              </label>
              <span className="text-xs font-mono text-amber-400 font-bold">
                Level {spiceLevel} of 4 (
                {spiceLevel === 1
                  ? "Mild Delicate"
                  : spiceLevel === 2
                  ? "Warm Gourmet"
                  : spiceLevel === 3
                  ? "Chef's Heat"
                  : "Volcanic Fire"}
                )
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((level) => (
                <button
                  key={level}
                  onClick={() => {
                    playClickSound();
                    setSpiceLevel(level);
                  }}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    spiceLevel === level
                      ? "bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/25"
                      : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>Lvl {level}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Gourmet Add-ons & Sauces */}
          <div>
            <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-3">
              3. Architectural Enhancements & Add-ons
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dish.customizations.map((addon) => {
                const isChecked = selectedAddons.some((a) => a.id === addon.id);
                return (
                  <div
                    key={addon.id}
                    onClick={() => toggleAddon(addon)}
                    className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                      isChecked
                        ? "bg-amber-500/20 border-amber-400 text-white"
                        : "bg-white/5 border-white/10 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                          isChecked
                            ? "bg-amber-400 border-amber-400 text-slate-950"
                            : "border-white/30"
                        }`}
                      >
                        {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                      </div>
                      <span className="text-xs font-medium">{addon.name}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      +${addon.price.toFixed(2)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 4. Special Kitchen Request */}
          <div>
            <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-2">
              4. Chef Instructions / Allergies
            </label>
            <input
              type="text"
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder="e.g., Dressing on the side, extra crispy crust, no onions..."
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

        </div>

        {/* Modal Footer: Quantity & Add To Order */}
        <div className="p-6 border-t border-white/10 bg-[#0c1017] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-xs text-white/50 hidden sm:inline">Quantity:</span>
            <div className="flex items-center gap-2 p-1 bg-white/5 border border-white/10 rounded-xl">
              <button
                onClick={() => {
                  playClickSound();
                  setQuantity(Math.max(1, quantity - 1));
                }}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="w-6 text-center text-xs font-bold font-mono text-white">
                {quantity}
              </span>
              <button
                onClick={() => {
                  playClickSound();
                  setQuantity(quantity + 1);
                }}
                className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <button
            onClick={handleAdd}
            className="py-3.5 px-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold font-syne rounded-2xl shadow-xl shadow-amber-500/25 transition-all transform active:scale-95 flex items-center gap-2 text-sm"
          >
            <span>Add to Cart</span>
            <span className="px-2 py-0.5 bg-black/20 rounded-lg text-xs font-mono font-bold">
              ${totalPrice.toFixed(2)}
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
