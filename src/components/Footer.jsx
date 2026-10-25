import React, { useState } from "react";
import { Sparkles, MapPin, Phone, Mail, Clock, Send, Check } from "lucide-react";
import { BRAND_CONFIG } from "../data/dishesData";
import { playClickSound } from "../utils/audioAmbiance";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    playClickSound();
    setSubscribed(true);
    setTimeout(() => {
      setEmail("");
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#1c1917] border-t border-[#292524] pt-20 pb-12 px-4 sm:px-6 lg:px-8 text-[#fdfbf7] relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#d97706] to-[#b45309] flex items-center justify-center shadow-lg shadow-[#d97706]/20">
                <span className="font-serif font-extrabold text-white text-xl tracking-tighter">
                  BV
                </span>
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                BITE<span className="text-amber-400 font-light">VERSE</span>
              </span>
            </div>

            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              {BRAND_CONFIG.description}
            </p>

            <div className="pt-2 flex items-center gap-2.5 text-xs text-stone-400 font-mono">
              <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10">
                Halal Certified
              </span>
              <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10">
                HACCP High Standard
              </span>
              <span className="px-2.5 py-1 bg-white/5 rounded-md border border-white/10">
                100% Artisanal
              </span>
            </div>
          </div>

          {/* Quick Concierge Info */}
          <div className="md:col-span-3 space-y-3 text-xs text-stone-300">
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-sm mb-4">
              Culinary Atelier
            </h4>
            <div className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{BRAND_CONFIG.contact.address}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{BRAND_CONFIG.contact.phone}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{BRAND_CONFIG.contact.email}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{BRAND_CONFIG.contact.hours}</span>
            </div>
          </div>

          {/* VIP Newsletter */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-serif font-bold text-white uppercase tracking-wider text-sm mb-2">
              Chef's Private Reserve
            </h4>
            <p className="text-stone-300 text-xs leading-relaxed">
              Receive secret tasting menu drops, 3D culinary preview access, and private chef invitations.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your VIP email..."
                className="flex-1 px-4 py-2.5 bg-white/10 border border-white/15 rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 font-mono"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#d97706] hover:bg-amber-500 text-slate-950 font-bold font-serif text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-1.5"
              >
                {subscribed ? <Check className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </button>
            </form>

            {subscribed && (
              <span className="text-[11px] text-emerald-400 block font-medium">
                Welcome to the BiteVerse Circle. Check your inbox!
              </span>
            )}
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <p>© {new Date().getFullYear()} BiteVerse Culinary Dimensions. All Rights Reserved.</p>
          <p className="font-mono text-[11px]">
            Engineered with React • Three.js • GSAP • Ivory Editorial System
          </p>
        </div>

      </div>
    </footer>
  );
}
