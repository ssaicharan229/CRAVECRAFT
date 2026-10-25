import React, { useState } from "react";
import { Search, Sparkles, Layers, Eye, Plus, Clock, ChefHat } from "lucide-react";
import { EXTENDED_CATALOGUE } from "../data/dishesData";
import { playClickSound } from "../utils/audioAmbiance";

export default function MenuCatalogue({ dishes, onOpen3DStudio, onOpenCustomizer, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", label: "All Creations" },
    { id: "burgers", label: "Burgers" },
    { id: "pizza", label: "Pizza" },
    { id: "biryani", label: "Biryani" },
    { id: "pasta", label: "Pasta & Noodles" },
    { id: "sandwiches", label: "Sandwiches & Wraps" },
    { id: "desserts", label: "Desserts" },
    { id: "drinks", label: "Ice Cream & Drinks" }
  ];

  // Combine signature animated dishes and extended culinary creations
  const allMenuItems = [
    ...dishes.map((d) => ({ ...d, isSignature3D: true })),
    ...EXTENDED_CATALOGUE.map((d) => ({ ...d, isSignature3D: false }))
  ];

  const filteredDishes = allMenuItems.filter((dish) => {
    const matchesCategory = selectedCategory === "all" || dish.category === selectedCategory;
    const matchesSearch =
      dish.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const scrollToDish = (id) => {
    playClickSound();
    const el = document.getElementById(`dish-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="menu-catalogue" className="py-28 px-4 sm:px-6 lg:px-8 border-b border-[#292524]/10 bg-[#f8f5ee]">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ede4] border border-[#292524]/10 text-[#854d0e] text-xs font-mono font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
              The BiteVerse Anthology
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight">
              Gourmet Menu & Reserve
            </h2>
            <p className="text-[#57534e] text-sm mt-2 max-w-lg font-sans">
              From charcoal-sealed Awadhi dum biryanis to wood-fired Neapolitan sourdough and bronze-die pastas,
              explore our complete culinary selection.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#78716c]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="w-full pl-10 pr-4 py-3 bg-[#fdfbf7] border border-[#292524]/15 rounded-2xl text-xs text-[#1c1917] placeholder-[#78716c] focus:outline-none focus:border-[#d97706] transition-colors shadow-sm"
            />
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                playClickSound();
                setSelectedCategory(cat.id);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-serif transition-all ${
                selectedCategory === cat.id
                  ? "bg-[#1c1917] text-[#fdfbf7] shadow-md shadow-black/10 font-bold"
                  : "bg-[#fdfbf7] border border-[#292524]/10 text-[#57534e] hover:text-[#1c1917] hover:bg-[#ede7dc]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Dish Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredDishes.map((dish) => (
            <div
              key={dish.id}
              className="group bg-[#fdfbf7] border border-[#292524]/10 hover:border-[#d97706]/40 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Image Container with 3D button overlay */}
                <div className="relative aspect-[4/3] w-full bg-[#e8e2d6] overflow-hidden">
                  <img
                    src={dish.heroImage}
                    alt={dish.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  <div className="absolute top-3 left-3 px-2.5 py-1 bg-[#1c1917]/85 backdrop-blur-md rounded-lg text-[10px] font-mono text-[#fdfbf7] uppercase tracking-wider">
                    {dish.category}
                  </div>



                  {/* Jump to Cinematic Section on click image */}
                  {dish.isSignature3D && (
                    <div
                      onClick={() => scrollToDish(dish.id)}
                      className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4 cursor-pointer"
                    >
                      <span className="text-xs font-serif text-amber-200 flex items-center gap-1.5 font-bold">
                        <Eye className="w-3.5 h-3.5" />
                        View 3D Transformation
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-[#78716c] mb-1 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#d97706]" />
                      {dish.prepTime}
                    </span>
                    <span className="text-[#b45309] font-bold">{dish.rating}★</span>
                  </div>

                  <h3 className="font-serif font-bold text-[#1c1917] text-base mb-1 group-hover:text-[#b45309] transition-colors">
                    {dish.name}
                  </h3>

                  <p className="text-[#57534e] text-xs line-clamp-2 leading-relaxed mb-4">
                    {dish.description}
                  </p>
                </div>
              </div>

              {/* Price & Add Action */}
              <div className="p-5 pt-0 border-t border-[#292524]/10 flex items-center justify-between mt-auto">
                <span className="font-serif font-bold text-[#b45309] text-lg">
                  ${dish.price.toFixed(2)}
                </span>

                <button
                  onClick={() => {
                    playClickSound();
                    if (dish.isSignature3D) {
                      onOpenCustomizer(dish);
                    } else {
                      onAddToCart(dish);
                    }
                  }}
                  className="py-2 px-3.5 bg-[#1c1917] hover:bg-[#292524] text-[#fdfbf7] font-bold font-serif text-xs rounded-xl transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-amber-400" />
                  <span>{dish.isSignature3D ? "Craft & Order" : "Add to Cart"}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
