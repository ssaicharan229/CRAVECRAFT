import React from "react";
import {
  Sparkles,
  Layers,
  Box,
  RotateCw,
  Camera,
  Scroll,
  Cpu,
  Code2,
  Workflow,
  CheckCircle2,
  Terminal,
  Maximize2
} from "lucide-react";

export default function AnimationTechniquesSection() {
  const animationStyles = [
    {
      number: "01",
      name: "3D Product Animation",
      badge: "The Main Technique",
      description: "Realistic 3D food objects rotate, move, and transform into different shapes.",
      icon: Box,
      accent: "#d97706"
    },
    {
      number: "02",
      name: "3D Morphing / Shape Transformation",
      badge: "Core Visual Shift",
      description: "One food shape smoothly changes into another. This is the closest term when the object itself changes form.",
      icon: RotateCw,
      accent: "#b45309"
    },
    {
      number: "03",
      name: "Cinematic Camera Animation",
      badge: "Dynamic Perspective",
      description: "Smooth camera orbiting, zooming, panning, and changing perspective around the food.",
      icon: Camera,
      accent: "#854d0e"
    },
    {
      number: "04",
      name: "Exploded-View Animation",
      badge: "Layer Deconstruction",
      description: "Ingredients separate into floating layers and assemble into the completed dish.",
      icon: Layers,
      accent: "#c28e46"
    },
    {
      number: "05",
      name: "Scroll-Driven Animation",
      badge: "User Choreography",
      description: "The object and camera move through a sequence as the user scrolls down the webpage.",
      icon: Scroll,
      accent: "#d97706"
    }
  ];

  const toolsAndTechniques = [
    {
      tool: "Blender",
      whatItDoes: "Creates and animates realistic 3D food models",
      category: "3D Modeling & Simulation",
      badge: "Foundational Asset"
    },
    {
      tool: "Three.js",
      whatItDoes: "Displays interactive 3D objects in a website",
      category: "WebGL Library",
      badge: "Real-Time 3D"
    },
    {
      tool: "React Three Fiber",
      whatItDoes: "Integrates Three.js into a React website",
      category: "React Framework Integration",
      badge: "Component Architecture"
    },
    {
      tool: "GSAP + ScrollTrigger",
      whatItDoes: "Controls smooth animation sequences linked to scrolling",
      category: "Motion Choreography",
      badge: "Scroll Scrubbing"
    },
    {
      tool: "GLB / GLTF",
      whatItDoes: "3D model formats used to bring food objects into the website",
      category: "Asset Optimization",
      badge: "Web Delivery Format"
    },
    {
      tool: "WebGL",
      whatItDoes: "Enables hardware-accelerated 3D graphics in the browser",
      category: "Graphics Pipeline",
      badge: "GPU Accelerated"
    },
    {
      tool: "Spline",
      whatItDoes: "Visual tool for creating interactive 3D web scenes",
      category: "Interactive 3D Tool",
      badge: "Web 3D Authoring"
    },
    {
      tool: "Morph Targets / Shape Keys",
      whatItDoes: "Techniques for animating changes in a 3D object's shape",
      category: "Geometry Deformation",
      badge: "Organic Transformation"
    }
  ];

  return (
    <section
      id="animation-techniques"
      className="py-28 px-4 sm:px-6 lg:px-8 border-b border-[#292524]/10 bg-[#f8f5ee] relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Section 1 Header: Animation Names */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ede4] border border-[#292524]/10 text-[#854d0e] text-xs font-mono font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#d97706]" />
            Animation Nomenclature
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight mb-4">
            Animation Names Used in This Style
          </h2>
          <p className="text-[#57534e] text-sm sm:text-base leading-relaxed font-sans font-light">
            The reference video presents a distinct cinematic vocabulary. Below are the precise
            animation disciplines and principles powering this interactive gastronomic experience.
          </p>
        </div>

        {/* 5 Animation Styles Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {animationStyles.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-8 bg-[#fdfbf7] border border-[#292524]/10 hover:border-[#d97706]/40 rounded-3xl transition-all duration-300 hover:-translate-y-1.5 shadow-sm flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-xs font-bold text-[#b45309] tracking-widest px-2.5 py-1 bg-[#d97706]/10 border border-[#d97706]/20 rounded-md">
                      {item.number}
                    </span>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#78716c] px-2.5 py-1 bg-[#f2ede4] rounded-full border border-[#292524]/10">
                      {item.badge}
                    </span>
                  </div>

                  <div className="w-12 h-12 rounded-2xl bg-[#d97706]/10 border border-[#d97706]/20 flex items-center justify-center text-[#d97706] mb-5 group-hover:scale-110 group-hover:bg-[#d97706] group-hover:text-white transition-all">
                    <Icon className="w-6 h-6" />
                  </div>

                  <h3 className="text-xl font-serif font-bold text-[#1c1917] mb-2.5 group-hover:text-[#b45309] transition-colors">
                    {item.name}
                  </h3>

                  <p className="text-[#57534e] text-xs sm:text-sm leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-[#292524]/10 flex items-center justify-between text-[11px] font-mono text-[#854d0e]">
                  <span>Discipline {item.number}</span>
                  <span className="text-[#15803d] font-semibold">Active in BiteVerse</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Section 2 Header: Graphics and Software Names */}
        <div className="text-center max-w-3xl mx-auto mb-16 pt-8 border-t border-[#292524]/10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f2ede4] border border-[#292524]/10 text-[#854d0e] text-xs font-mono font-semibold uppercase tracking-wider mb-4 shadow-sm">
            <Cpu className="w-3.5 h-3.5 text-[#d97706]" />
            Graphics & Software Specification
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1c1917] tracking-tight mb-4">
            Graphics and Software Names
          </h2>
          <p className="text-[#57534e] text-sm sm:text-base leading-relaxed font-sans font-light">
            These are the recommended tools and techniques for recreating this style,
            pairing offline 3D modeling precision with high-performance real-time web execution.
          </p>
        </div>

        {/* Rich Table Presentation */}
        <div className="bg-[#fdfbf7] border border-[#292524]/10 rounded-3xl overflow-hidden shadow-sm mb-16">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#292524]/10 bg-[#f2ede4]/70 text-[11px] font-mono uppercase tracking-wider text-[#78716c]">
                  <th className="py-4 px-6 font-semibold">Tool or Technique</th>
                  <th className="py-4 px-6 font-semibold">Classification</th>
                  <th className="py-4 px-6 font-semibold">What It Does</th>
                  <th className="py-4 px-6 font-semibold text-right">Implementation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#292524]/10 text-xs font-sans">
                {toolsAndTechniques.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-[#f2ede4]/50 transition-colors group"
                  >
                    <td className="py-4 px-6 font-serif font-bold text-sm text-[#1c1917] group-hover:text-[#b45309]">
                      {row.tool}
                    </td>
                    <td className="py-4 px-6 text-[#78716c] font-mono text-[11px]">
                      {row.category}
                    </td>
                    <td className="py-4 px-6 text-[#44403c] font-medium leading-relaxed">
                      {row.whatItDoes}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className="inline-block px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#d97706]/10 text-[#854d0e] border border-[#d97706]/20">
                        {row.badge}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Callout Card */}
        <div className="p-8 bg-[#1c1917] text-[#fdfbf7] rounded-3xl border border-[#292524] flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-mono text-[#d97706]">
              <Workflow className="w-4 h-4" />
              <span>Full Technological Synergy</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold">
              Blender Simulation $\rightarrow$ Three.js WebGL $\rightarrow$ GSAP ScrollTrigger
            </h4>
            <p className="text-stone-300 text-xs sm:text-sm max-w-2xl leading-relaxed">
              By combining Blender model baking, GLTF/GLB optimization, and GSAP-governed frame sequence
              transforms, BiteVerse delivers photorealistic 3D interaction at full 60 FPS across all devices.
            </p>
          </div>

          <div className="shrink-0 flex items-center gap-2 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl font-mono text-xs text-amber-400">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Production Verified</span>
          </div>
        </div>

      </div>
    </section>
  );
}
