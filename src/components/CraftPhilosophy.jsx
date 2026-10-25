import React from "react";
import { Sparkles, Flame, ShieldCheck, Award } from "lucide-react";
import { BRAND_CONFIG } from "../data/dishesData";

export default function CraftPhilosophy() {
  const pillars = [
    {
      title: "Layered Gastronomic Architecture",
      desc: "Every dish is structurally engineered to preserve thermal gradients, moisture boundaries, and progressive flavor release across each individual stratum.",
      icon: Sparkles
    },
    {
      title: "Flame & Fermentation Integrity",
      desc: "48-hour cold sourdough ferments, 620°F cast iron Maillard crusts, and sealed copper handi vessels capturing pure aromatic saffron vapors.",
      icon: Flame
    },
    {
      title: "Artisanal Source Traceability",
      desc: "Halal Black Angus, San Marzano D.O.P. plum tomatoes, Ligurian sweet basil, and single-origin Malabar spices sourced directly from heritage growers.",
      icon: ShieldCheck
    }
  ];

  return (
    <section className="py-28 px-4 sm:px-6 lg:px-8 border-b border-[#292524]/10 bg-[#fdfbf7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ede4] border border-[#292524]/10 text-[#854d0e] text-xs font-mono font-semibold uppercase tracking-wider mb-4">
            <Award className="w-3.5 h-3.5 text-[#d97706]" />
            BiteVerse Principles
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight mb-4">
            The Geometry of Taste
          </h2>
          <p className="text-[#57534e] text-sm sm:text-base leading-relaxed font-sans font-light">
            Food is culinary architecture in motion. When precision heat meets pure provenance,
            dining transforms from sustenance into an editorial sensory experience.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={i}
                className="p-8 bg-[#f8f5ee] border border-[#292524]/10 hover:border-[#d97706]/30 rounded-3xl transition-all duration-300 hover:-translate-y-1 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#d97706]/15 border border-[#d97706]/30 flex items-center justify-center text-[#b45309] mb-6">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-[#1c1917] mb-2">
                    {p.title}
                  </h3>
                  <p className="text-[#57534e] text-xs sm:text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
                <div className="pt-6 mt-6 border-t border-[#292524]/10 text-[10px] font-mono text-[#b45309] uppercase tracking-widest">
                  Pillar 0{i + 1}
                </div>
              </div>
            );
          })}
        </div>

        {/* Brand Metric Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-8 bg-[#f2ede4] border border-[#292524]/10 rounded-3xl shadow-sm">
          {BRAND_CONFIG.stats.map((s, idx) => (
            <div key={idx} className="text-center p-3">
              <span className="text-3xl sm:text-4xl font-serif font-bold text-[#b45309] block mb-1">
                {s.value}
              </span>
              <span className="text-xs font-bold text-[#1c1917] uppercase tracking-wider block font-serif">
                {s.label}
              </span>
              <span className="text-[11px] text-[#78716c] block mt-0.5 font-sans">
                {s.detail}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
