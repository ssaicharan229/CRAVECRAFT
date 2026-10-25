import React, { useState, useEffect, useRef } from "react";
import { Laptop, Monitor, Maximize2, Sparkles, RotateCw, Eye } from "lucide-react";

export default function LaptopDeskStudio({ children, isDeskMode, onToggleDeskMode }) {
  const [mouseTilt, setMouseTilt] = useState({ x: 0, y: 0 });
  const [anglePreset, setAnglePreset] = useState("cinematic"); // 'cinematic' | 'straight' | 'wide'

  const handleMouseMove = (e) => {
    if (!isDeskMode) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 8; // -4 to +4 deg
    const y = (e.clientY / window.innerHeight - 0.5) * 6; // -3 to +3 deg
    setMouseTilt({ x, y });
  };

  const getPresetTransform = () => {
    if (anglePreset === "straight") {
      return `rotateX(${10 - mouseTilt.y * 0.5}deg) rotateY(${mouseTilt.x * 0.5}deg) scale(0.92)`;
    }
    if (anglePreset === "wide") {
      return `rotateX(${14 - mouseTilt.y * 0.5}deg) rotateY(${-12 + mouseTilt.x * 0.5}deg) rotateZ(2deg) scale(0.85)`;
    }
    // 'cinematic' - angled laptop view matching reference video
    return `rotateX(${12 - mouseTilt.y * 0.6}deg) rotateY(${-7 + mouseTilt.x * 0.6}deg) rotateZ(1deg) scale(0.88)`;
  };

  if (!isDeskMode) {
    return <>{children}</>;
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#07080b] flex flex-col items-center justify-center overflow-x-hidden select-none py-10 px-4"
      style={{
        background: "radial-gradient(ellipse at 50% 30%, #161820 0%, #07080b 80%)"
      }}
    >
      {/* Studio Top Control Strip */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 p-2 bg-black/80 border border-white/10 rounded-full backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-2 px-3 text-xs font-mono text-amber-400 font-semibold border-r border-white/10">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Cinematic Desk Studio</span>
        </div>

        {/* Angle Presets */}
        <div className="flex items-center gap-1">
          {[
            { id: "cinematic", label: "Reference Angled" },
            { id: "straight", label: "Straight Focus" },
            { id: "wide", label: "Wide Desk" }
          ].map((preset) => (
            <button
              key={preset.id}
              onClick={() => setAnglePreset(preset.id)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                anglePreset === preset.id
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-white/60 hover:text-white hover:bg-white/10"
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>

        {/* Exit to Full Website */}
        <button
          onClick={onToggleDeskMode}
          className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold font-syne rounded-full shadow-lg shadow-amber-500/20 transition-all flex items-center gap-1.5 ml-2"
        >
          <Maximize2 className="w-3 h-3" />
          <span>Full Web View</span>
        </button>
      </div>

      {/* 3D Perspective Stage */}
      <div
        className="relative w-full max-w-[1400px] flex flex-col items-center justify-center transition-transform duration-300 ease-out"
        style={{
          perspective: "1600px",
          transformStyle: "preserve-3d"
        }}
      >
        {/* =========================================================================
            THE 3D LAPTOP HARDWARE CHASSIS
            ========================================================================= */}
        <div
          className="relative w-full max-w-5xl transition-transform duration-300 ease-out origin-bottom"
          style={{
            transform: getPresetTransform(),
            transformStyle: "preserve-3d"
          }}
        >
          {/* Laptop Screen Lid */}
          <div className="relative rounded-t-[28px] p-3.5 bg-gradient-to-b from-[#2a2c34] to-[#14151b] border border-white/20 shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
            
            {/* Screen Bezel & FaceTime Camera */}
            <div className="relative w-full rounded-t-[20px] overflow-hidden bg-[#0c0d12] border border-black/80 flex flex-col">
              
              {/* Top Bezel Notch */}
              <div className="h-5 w-full bg-[#0c0d12] flex items-center justify-center relative">
                <div className="w-2 h-2 rounded-full bg-[#1e2029] border border-white/10 flex items-center justify-center">
                  <div className="w-1 h-1 rounded-full bg-[#0e7490] animate-pulse" />
                </div>
              </div>

              {/* LIVE WEBPAGE VIEWPORT (Inside the laptop screen) */}
              <div className="relative w-full h-[620px] overflow-y-auto bg-[#fdfbf7] custom-laptop-screen">
                {children}
              </div>

            </div>
          </div>

          {/* Laptop Hinge & Base Keyboard Deck (Perspective Lower Body) */}
          <div className="relative h-24 bg-gradient-to-b from-[#1e2028] via-[#16171f] to-[#0f1016] rounded-b-[32px] border-t-2 border-[#373a46] border-x border-b border-black shadow-[0_30px_60px_rgba(0,0,0,0.95)] px-12 pt-3 flex flex-col justify-between">
            
            {/* Keyboard Well Outline */}
            <div className="w-full h-8 bg-black/60 rounded-xl border border-white/5 flex items-center justify-center">
              <div className="w-3/4 h-2 bg-white/5 rounded-full" />
            </div>

            {/* Glass Trackpad */}
            <div className="w-44 h-8 mx-auto rounded-lg bg-black/40 border border-white/10 -mt-1" />

            {/* Front Lip Chamfer & Thumb Notch */}
            <div className="w-24 h-1.5 mx-auto bg-gradient-to-r from-transparent via-[#3a3d4a] to-transparent rounded-full mb-1" />
          </div>

          {/* Subdued Laptop Shadow on Wooden Desk */}
          <div className="absolute -bottom-8 left-10 right-10 h-16 bg-black/90 blur-2xl -z-10 rounded-full" />
        </div>

        {/* =========================================================================
            THE WARM POLISHED WOODEN DESK SURFACE (From the Reference Video)
            ========================================================================= */}
        <div
          className="w-full h-72 -mt-20 rounded-[40px] border-t border-[#3d2716]/60 shadow-[0_-20px_50px_rgba(0,0,0,0.95)] overflow-hidden relative"
          style={{
            background:
              "linear-gradient(to bottom, #1f140e 0%, #150d09 30%, #0d0805 100%)",
            boxShadow: "inset 0 10px 40px rgba(0,0,0,0.8)"
          }}
        >
          {/* Walnut Wood Grain Texture Overlay */}
          <div
            className="absolute inset-0 opacity-25 pointer-events-none"
            style={{
              backgroundImage:
                "repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(217, 119, 6, 0.04) 52px, transparent 54px)",
              filter: "blur(0.5px)"
            }}
          />

          {/* Subdued Screen Glow Reflection on Wood */}
          <div className="absolute top-0 left-1/4 right-1/4 h-24 bg-gradient-to-b from-amber-500/10 via-amber-400/5 to-transparent blur-2xl pointer-events-none" />

          {/* Studio Caption */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-xs text-white/30 font-mono tracking-widest">
            BITEVERSE CINEMATIC STUDIO • POLISHED WALNUT ACOUSTIC DESK
          </div>
        </div>

      </div>
    </div>
  );
}
