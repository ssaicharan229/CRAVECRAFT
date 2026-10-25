import React, { useEffect, useRef, useState } from "react";
import {
  Sparkles,
  Layers,
  Play,
  Pause,
  Clock,
  Flame,
  Check,
  Plus,
  Eye,
  Compass,
  Activity,
  Crosshair,
  Award
} from "lucide-react";
import { playClickSound } from "../utils/audioAmbiance";

export default function CinematicScene({
  dish,
  index,
  onOpen3DStudio,
  onOpenCinema,
  onOpenCustomizer,
  onAddToCart
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showHUD, setShowHUD] = useState(true);

  // 1. Preload image frames for 60fps instant scrubbing
  useEffect(() => {
    let isMounted = true;
    const loadedImages = [];
    let loadCount = 0;
    const total = dish.frameCount;

    for (let i = 0; i < total; i++) {
      const img = new Image();
      const numStr = String(i).padStart(3, "0");
      img.src = `${dish.framesFolder}/frame_${numStr}.webp`;

      img.onload = () => {
        loadCount++;
        if (loadCount >= total && isMounted) {
          setImages(loadedImages);
          setIsLoaded(true);
        }
      };
      loadedImages.push(img);
    }

    return () => {
      isMounted = false;
    };
  }, [dish.framesFolder, dish.frameCount]);

  // 2. Draw current frame on canvas with smooth radial edge blending
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !images.length) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[currentFrame];
    if (img && img.complete) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Subtle edge darkening on the perimeter to guarantee zero harsh borders
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.28,
        canvas.width / 2,
        canvas.height / 2,
        canvas.width * 0.49
      );
      gradient.addColorStop(0, "rgba(10, 11, 14, 0)");
      gradient.addColorStop(0.85, "rgba(10, 11, 14, 0.45)");
      gradient.addColorStop(1, "rgba(10, 11, 14, 0.95)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }, [currentFrame, images]);

  // 3. Scroll-Driven Frame Scrubbing
  useEffect(() => {
    const container = containerRef.current;
    if (!container || !images.length) return;

    const handleScroll = () => {
      if (isPlaying) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const totalDistance = rect.height + windowHeight;
      const currentProgress = (windowHeight - rect.top) / totalDistance;
      const clampedProgress = Math.max(0, Math.min(1, currentProgress));

      const targetFrame = Math.floor(clampedProgress * (dish.frameCount - 1));
      setCurrentFrame(targetFrame);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [images.length, isPlaying, dish.frameCount]);

  // 4. Auto-Play Animation Loop
  useEffect(() => {
    if (!isPlaying || !images.length) return;

    let animId;
    let lastTime = performance.now();
    const frameInterval = 1000 / 24;

    const loop = (now) => {
      if (now - lastTime >= frameInterval) {
        lastTime = now;
        setCurrentFrame((prev) => (prev + 1) % dish.frameCount);
      }
      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, images.length, dish.frameCount]);

  // 5. 3D Mouse Parallax
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const progressPct = Math.round((currentFrame / (dish.frameCount - 1)) * 100);

  // Dynamic Kinetic Word based on current phase
  const wordIdx = Math.min(
    dish.kineticWords.length - 1,
    Math.floor((progressPct / 100) * dish.kineticWords.length)
  );
  const activeWord = dish.kineticWords[wordIdx] || dish.kineticWords[0];

  // Dynamic height measurement calculation
  const currentStackHeight = (
    dish.motionTelemetry.stackHeight * (1.28 - (progressPct / 100) * 0.28)
  ).toFixed(1);

  // Shockwave impact active when approaching key assembly stages
  const isImpactMoment =
    (progressPct > 20 && progressPct < 32) ||
    (progressPct > 48 && progressPct < 60) ||
    (progressPct > 80 && progressPct < 92);

  const isEven = index % 2 === 0;

  return (
    <section
      ref={containerRef}
      id={`dish-${dish.id}`}
      className={`relative min-h-[130vh] py-24 px-4 sm:px-6 lg:px-12 flex flex-col justify-center overflow-hidden border-b border-[#292524]/10 ${
        isEven ? "bg-[#fdfbf7]" : "bg-[#f8f5ee]"
      }`}
    >
      {/* Background Kinetic Typography with Editorial Styling */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden select-none z-0">
        <div
          className="stroke-text font-serif tracking-tighter"
          style={{
            transform: `translate3d(${mousePos.x * 35 - (progressPct - 50) * 2}px, ${
              mousePos.y * 25
            }px, 0)`,
            opacity: 0.14 + (progressPct % 20) * 0.01,
            color: "transparent",
            WebkitTextStroke: "1.5px rgba(41, 37, 36, 0.15)",
            fontSize: "clamp(3.5rem, 11vw, 11rem)"
          }}
        >
          {activeWord}
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left Column: Dish Editorial Story, Typography, Specs & Ordering */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
          
          {/* Dish Number & Category Badge */}
          <div className="flex items-center gap-3 mb-3">
            <span className="font-mono text-xs font-bold text-[#b45309] tracking-widest px-2.5 py-1 bg-[#d97706]/10 border border-[#d97706]/20 rounded-md">
              0{index + 1} / 04
            </span>
            <span className="text-[#78716c] text-xs uppercase tracking-widest font-mono font-semibold flex items-center gap-1.5">
              <Crosshair className="w-3 h-3 text-[#d97706]" />
              {dish.titlePrefix}
            </span>
          </div>

          {/* Dish Editorial Serif Name */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#1c1917] tracking-tight leading-[1.1] mb-3">
            {dish.name}
          </h2>

          <p className="text-[#854d0e] text-sm font-medium tracking-wide mb-4">
            {dish.tagline}
          </p>

          <p className="text-[#57534e] text-sm leading-relaxed mb-6 font-sans">
            {dish.description}
          </p>

          {/* Motion Graphics Mini Telemetry Bar - Warm Parchment Surface */}
          <div className="grid grid-cols-3 gap-2.5 p-3 bg-[#f2ede4] border border-[#292524]/10 rounded-2xl mb-6 shadow-sm">
            <div className="text-center p-2 rounded-xl bg-[#fdfbf7]">
              <span className="text-[10px] text-[#78716c] uppercase block tracking-wider font-mono">
                Thermal Sear
              </span>
              <span className="text-xs font-semibold text-[#b45309] flex items-center justify-center gap-1 mt-0.5 font-mono">
                <Flame className="w-3 h-3 text-[#d97706]" />
                {dish.motionTelemetry.thermal}
              </span>
            </div>

            <div className="text-center p-2 rounded-xl bg-[#fdfbf7]">
              <span className="text-[10px] text-[#78716c] uppercase block tracking-wider font-mono">
                Stack Height
              </span>
              <span className="text-xs font-semibold text-[#1c1917] mt-0.5 block font-mono">
                {currentStackHeight}mm
              </span>
            </div>

            <div className="text-center p-2 rounded-xl bg-[#fdfbf7]">
              <span className="text-[10px] text-[#78716c] uppercase block tracking-wider font-mono">
                Pressure Cohesion
              </span>
              <span className="text-xs font-semibold text-[#15803d] mt-0.5 block font-mono">
                {dish.motionTelemetry.pressure}
              </span>
            </div>
          </div>

          {/* Dietary & Allergen Badges */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {dish.dietary.map((d, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 bg-[#f2ede4] border border-[#292524]/10 rounded-full text-[#44403c] font-medium flex items-center gap-1"
              >
                <Check className="w-2.5 h-2.5 text-[#15803d]" />
                {d}
              </span>
            ))}
            {dish.allergens.map((a, i) => (
              <span
                key={i}
                className="text-[11px] px-2.5 py-1 bg-rose-100 border border-rose-300 text-rose-800 rounded-full font-mono"
              >
                Allergen: {a}
              </span>
            ))}
          </div>

          {/* Chef's Secret Note */}
          <div className="p-3.5 bg-gradient-to-r from-[#d97706]/10 to-transparent border-l-2 border-[#d97706] rounded-r-xl mb-6">
            <span className="text-[10px] text-[#854d0e] uppercase font-mono tracking-wider block font-semibold mb-0.5">
              Chef de Cuisine Note
            </span>
            <p className="text-[#44403c] text-xs italic leading-relaxed">
              "{dish.chefNotes}"
            </p>
          </div>

          {/* Price & Primary Order Actions */}
          <div className="flex items-center gap-4 pt-2">
            <div>
              <span className="text-[10px] text-[#78716c] uppercase tracking-wider block font-mono">
                Price
              </span>
              <span className="text-2xl sm:text-3xl font-serif font-bold text-[#b45309]">
                ${dish.price.toFixed(2)}
              </span>
            </div>

            <button
              onClick={() => onOpenCustomizer(dish)}
              className="flex-1 py-3.5 px-5 bg-[#1c1917] hover:bg-[#292524] text-[#fdfbf7] font-serif font-bold rounded-2xl shadow-lg shadow-black/15 transition-all transform active:scale-95 flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4 text-amber-400" />
              Craft & Add to Cart
            </button>

            <button
              onClick={() => {
                playClickSound();
                const el = document.getElementById("animation-techniques");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="p-3.5 bg-[#f2ede4] hover:bg-[#e7e1d5] border border-[#292524]/15 text-[#1c1917] rounded-2xl transition-all hover:scale-105 shadow-sm"
              title="Explore Animation Style & Tech Stack"
            >
              <Sparkles className="w-5 h-5 text-[#d97706]" />
            </button>
          </div>

        </div>

        {/* Right Column: The 3D Floating Cinematic Canvas Assembly */}
        <div className="lg:col-span-7 flex flex-col items-center order-1 lg:order-2">
          
          <div
            className="relative w-full aspect-[16/10] max-w-2xl flex items-center justify-center rounded-3xl transition-transform duration-300 ease-out bg-[#0c0d12] border border-[#292524]/20 shadow-[0_30px_60px_rgba(0,0,0,0.25)] overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
              transform: `perspective(1000px) rotateX(${-mousePos.y * 10}deg) rotateY(${
                mousePos.x * 10
              }deg) scale3d(1.01, 1.01, 1.01)`
            }}
          >
            {/* Walnut Wooden Accent Base Line (Reference Mood) */}
            <div
              className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none opacity-40 z-0"
              style={{
                background: "linear-gradient(to top, #1f140e 0%, transparent 100%)"
              }}
            />

            {/* Shockwave Rings on Impact */}
            {showHUD && isImpactMoment && (
              <>
                <div className="shockwave-ring" style={{ borderColor: "#d97706" }} />
                <div className="shockwave-ring shockwave-ring-delayed" style={{ borderColor: "#b45309" }} />
              </>
            )}

            {/* Falling Velocity Streak Lines */}
            {showHUD && (
              <>
                <div className="velocity-line" style={{ top: "18%", left: "32%", animationDelay: "0.2s" }} />
                <div className="velocity-line" style={{ top: "12%", left: "68%", animationDelay: "0.5s" }} />
                <div className="velocity-line" style={{ top: "15%", left: "50%", animationDelay: "0.8s" }} />
              </>
            )}

            {/* The Floating Canvas */}
            <canvas
              ref={canvasRef}
              width={1280}
              height={720}
              className="w-full h-full object-contain filter drop-shadow-[0_20px_30px_rgba(0,0,0,0.85)] pointer-events-none relative z-10"
              style={{
                maskImage:
                  "radial-gradient(ellipse 65% 65% at 50% 50%, black 50%, rgba(0,0,0,0.85) 75%, transparent 100%)",
                WebkitMaskImage:
                  "radial-gradient(ellipse 65% 65% at 50% 50%, black 50%, rgba(0,0,0,0.85) 75%, transparent 100%)"
              }}
            />

            {/* Architectural Calipers & HUD Overlays */}
            {showHUD && (
              <div className="absolute inset-0 pointer-events-none z-20">
                {/* Corner Caliper Brackets */}
                <div className="hud-corner-bracket hud-top-left" style={{ borderColor: "#d97706" }} />
                <div className="hud-corner-bracket hud-top-right" style={{ borderColor: "#d97706" }} />
                <div className="hud-corner-bracket hud-bottom-left" style={{ borderColor: "#d97706" }} />
                <div className="hud-corner-bracket hud-bottom-right" style={{ borderColor: "#d97706" }} />

                {/* Left Vertical Dimension Caliper Ruler */}
                <div className="absolute left-4 top-1/4 bottom-1/4 flex items-center gap-1.5 text-[9px] font-mono text-[#d97706]">
                  <div className="h-full w-[2px] bg-gradient-to-b from-[#d97706]/10 via-[#d97706]/60 to-[#d97706]/10 relative">
                    <div
                      className="absolute left-[-4px] w-3 h-[2px] bg-[#d97706] transition-all duration-150"
                      style={{ top: `${100 - progressPct}%` }}
                    />
                  </div>
                  <div className="writing-vertical -rotate-90 origin-left tracking-wider">
                    Z-HEIGHT: {currentStackHeight}mm
                  </div>
                </div>

                {/* Bottom Horizontal Diameter Caliper */}
                <div className="absolute bottom-4 left-1/4 right-1/4 flex flex-col items-center text-[9px] font-mono text-white/50">
                  <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#d97706]/40 to-transparent relative mb-1">
                    <span className="absolute left-0 top-[-3px] w-[1px] h-2 bg-[#d97706]/60" />
                    <span className="absolute right-0 top-[-3px] w-[1px] h-2 bg-[#d97706]/60" />
                  </div>
                  <span className="tracking-widest text-[#d97706]">
                    Ø 164mm • {dish.motionTelemetry.code}
                  </span>
                </div>

                {/* Top-Right Rotating Radar Compass Reticle */}
                <div className="absolute top-14 right-5 w-14 h-14 rounded-full border border-[#d97706]/20 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full border border-dashed border-[#d97706]/40 radar-ring" />
                  <div className="w-6 h-6 rounded-full border border-[#d97706]/30 radar-ring-reverse" />
                  <div className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-ping" />
                  <span className="absolute -bottom-4 text-[8px] font-mono text-white/40">
                    360° ORBIT
                  </span>
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {!isLoaded && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 backdrop-blur-md rounded-3xl z-30">
                <div className="w-10 h-10 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mb-3" />
                <span className="text-xs text-white/70 font-mono tracking-wider">
                  Rendering 3D Motion Graphics...
                </span>
              </div>
            )}

            {/* Interactive Floating Hotspots Pins on Food Layers */}
            {dish.ingredients.map((ing, idx) => {
              const isVisible = Math.abs(progressPct / 100 - ing.stage) < 0.28;
              if (!isVisible) return null;

              const posX = 20 + ((idx * 37) % 60);
              const posY = 20 + idx * 12;

              return (
                <div
                  key={idx}
                  className="absolute z-30 transition-all duration-500 animate-fade-in"
                  style={{ left: `${posX}%`, top: `${posY}%` }}
                >
                  <button
                    onClick={() => setActiveHotspot(activeHotspot === idx ? null : idx)}
                    className="group relative flex items-center justify-center p-2 focus:outline-none"
                  >
                    <span className="absolute w-7 h-7 rounded-full bg-amber-400/20 animate-ping" />
                    <span className="w-3.5 h-3.5 rounded-full bg-[#d97706] border-2 border-white shadow-lg shadow-[#d97706]/50 group-hover:scale-125 transition-transform" />
                  </button>

                  {/* Hotspot Info Popup Card */}
                  {activeHotspot === idx && (
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3.5 bg-[#1c1917]/95 border border-[#d97706]/40 rounded-2xl shadow-2xl backdrop-blur-xl z-40 animate-scale-up text-left">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-mono text-amber-400 uppercase font-bold">
                          {ing.badge}
                        </span>
                        <span className="text-[9px] text-white/40">{ing.origin}</span>
                      </div>
                      <h4 className="text-xs font-bold font-serif text-[#fdfbf7] mb-1">
                        {ing.name}
                      </h4>
                      <p className="text-[11px] text-stone-300 leading-normal">
                        {ing.detail}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Floating Top Controls HUD */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <div className="flex items-center gap-2 pointer-events-auto">
                <span className="px-3 py-1 bg-black/70 border border-white/10 rounded-full text-[11px] text-amber-400 font-mono backdrop-blur-md flex items-center gap-1.5 shadow-lg">
                  <Compass className="w-3 h-3 text-amber-400 animate-spin-slow" />
                  Scroll To Assemble
                </span>

                {/* Motion Graphics HUD Toggle Button */}
                <button
                  onClick={() => {
                    playClickSound();
                    setShowHUD(!showHUD);
                  }}
                  className={`px-3 py-1 rounded-full text-[10px] font-mono border backdrop-blur-md transition-all flex items-center gap-1.5 shadow-lg ${
                    showHUD
                      ? "bg-amber-500/20 border-amber-400/60 text-amber-300 font-bold"
                      : "bg-black/60 border-white/10 text-white/50 hover:text-white"
                  }`}
                  title="Toggle Motion Graphics HUD Overlay"
                >
                  <Activity className="w-3 h-3 text-amber-400" />
                  HUD: {showHUD ? "ON" : "OFF"}
                </button>
              </div>

              <div className="flex items-center gap-2 pointer-events-auto">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="p-2 bg-black/70 hover:bg-black/90 border border-white/10 rounded-full text-white backdrop-blur-md transition-all shadow-lg"
                  title={isPlaying ? "Pause Motion" : "Auto-Play Motion"}
                >
                  {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                </button>

                <button
                  onClick={() => onOpenCinema(dish)}
                  className="p-2 bg-black/70 hover:bg-black/90 border border-white/10 rounded-full text-white backdrop-blur-md transition-all shadow-lg"
                  title="Watch 4K Cinematic Film"
                >
                  <Eye className="w-3.5 h-3.5 text-amber-400" />
                </button>
              </div>
            </div>



          </div>

          {/* Interactive Scrubbing Slider & Stage Bar */}
          <div className="w-full max-w-xl mt-6 px-4">
            <div className="flex items-center justify-between text-xs text-[#57534e] mb-2 font-mono">
              <span className="flex items-center gap-1.5 text-[#b45309] font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                {progressPct < 25
                  ? "Phase 01: Foundation & Base"
                  : progressPct < 55
                  ? "Phase 02: Thermal Fusion & Sear"
                  : progressPct < 85
                  ? "Phase 03: Crown & Seasoning"
                  : "Phase 04: Masterpiece Finished"}
              </span>
              <span className="text-[#b45309] font-bold">{progressPct}% ASSEMBLED</span>
            </div>

            <div className="relative flex items-center">
              <input
                type="range"
                min="0"
                max={dish.frameCount - 1}
                value={currentFrame}
                onChange={(e) => {
                  setIsPlaying(false);
                  setCurrentFrame(parseInt(e.target.value));
                }}
                className="w-full h-2 bg-[#292524]/15 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />
            </div>

            <div className="flex justify-between text-[10px] text-[#78716c] mt-1.5 font-mono">
              <span>0% Deconstructed</span>
              <span>Layer Drop</span>
              <span>Thermal Sear</span>
              <span>100% Finished</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
