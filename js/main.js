/**
 * ==============================================================================
 * CRAVECRAFT — CINEMATIC LUXURY FOOD EXPERIENCE
 * Master Application & Motion Engine (Vanilla JS + GSAP 3.12.5)
 * ==============================================================================
 * 
 * AUDITED & DEBUGGED ARCHITECTURE:
 * - CHANGE 1: Typography: Bodoni Moda (Headlines/Eyebrow) & DM Sans (Body/Nav/Buttons)
 * - CHANGE 2: Dynamic CSS variable themes (light, burger, pizza, biryani, pasta, dark)
 *             with smooth 0.6s GSAP variable tweening and bidirectional scroll sync
 * - CHANGE 3: Left-anchored layout across all hero scenes (including Scene 7) and
 *             all pinned dish panels (no right panels), with right-shifted video
 * - QA & PERFORMANCE: Autoplay policy handling, font-ready ScrollTrigger refresh,
 *                     safe localStorage try/catch, throttled video scrubbing,
 *                     reduced motion detection, and inline SVG currentColor injection.
 * ==============================================================================
 */

"use strict";

/* ==============================================================================
   1. CENTRAL CONFIGURATION OBJECT (CONFIG)
   ============================================================================== */
const CONFIG = {
  // Brand & Founder Identity
  brand: {
    name: "CRAVECRAFT",
    tagline: "Every layer, crafted to be craved.",
    founder: "Gampa Sai Charan",
    founderRole: "Founder & Creative Technologist (B.Tech CSE AI/ML student)",
    email: "ssaicharan229@gmail.com",
    instagram: "@__sai__8055_",
    instagramUrl: "https://instagram.com/__sai__8055_",
    github: "ssaicharan229",
    githubUrl: "https://github.com/ssaicharan229"
  },

  // CHANGE 2: Exact Palette Presets matching user specification (No Scrims)
  themes: {
    light: {
      bg: "#F6F1EA",
      text: "#111111",
      textMuted: "rgba(17, 17, 17, 0.7)",
      accent: "#C98B3C",
      btnBg: "#111111",
      btnText: "#FFFFFF"
    },
    burger: {
      bg: "#0B0907",
      text: "#FFFFFF",
      textMuted: "rgba(255, 255, 255, 0.8)",
      accent: "#F4B860",
      btnBg: "#FFFFFF",
      btnText: "#0B0907"
    },
    pizza: {
      bg: "#2A1308",
      text: "#FFF4E8",
      textMuted: "rgba(255, 244, 232, 0.8)",
      accent: "#FF8A3D",
      btnBg: "#FFF4E8",
      btnText: "#2A1308"
    },
    biryani: {
      bg: "#1A0F08",
      text: "#FFF6E0",
      textMuted: "rgba(255, 246, 224, 0.8)",
      accent: "#F2C14E",
      btnBg: "#FFF6E0",
      btnText: "#1A0F08"
    },
    pasta: {
      bg: "#06101A",
      text: "#EAF6F5",
      textMuted: "rgba(234, 246, 245, 0.8)",
      accent: "#7FD1C7",
      btnBg: "#EAF6F5",
      btnText: "#06101A"
    },
    dark: {
      bg: "#0B0907",
      text: "#FFFFFF",
      textMuted: "rgba(255, 255, 255, 0.8)",
      accent: "#D9A441",
      btnBg: "#FFFFFF",
      btnText: "#0B0907"
    }
  },

  // 7 Hero Story Scenes (Rhythm of Reference Video)
  heroStory: {
    advanceDurationMs: 4000, // Cinematic 4.0s rhythm (3.2s dwell + 0.8s transition)
    scenes: [
      {
        id: "hero-1",
        theme: "light", // Bright cream scene, dough texture
        eyebrow: "The Texture",
        line1: "CRAFTED",
        line2: "IN LAYERS.",
        description: "Pure flour, cold water, and time — the primal foundation.",
        video: "assets/videos/hero-1.mp4",
        poster: "assets/posters/hero-1.webp"
      },
      {
        id: "hero-2",
        theme: "light", // Bright cream scene, key ingredient drops in
        eyebrow: "The Fusion",
        line1: "CRAFTED",
        line2: "IN LAYERS.",
        description: "Farm-churned cultured butter and rich velvety emulsion infuse the stack.",
        video: "assets/videos/hero-2.mp4",
        poster: "assets/posters/hero-2.webp"
      },
      {
        id: "hero-3",
        theme: "light", // Layers fold and stack
        eyebrow: "The Fold",
        line1: "LAYER",
        line2: "BY LAYER.",
        description: "Folded repeatedly to millimeter precision for airy crispness.",
        video: "assets/videos/hero-3.mp4",
        poster: "assets/posters/hero-3.webp"
      },
      {
        id: "hero-4",
        theme: "light", // Layers roll and assemble
        eyebrow: "The Assembly",
        line1: "LAYER",
        line2: "BY LAYER.",
        description: "Kinetic harmony of garden produce, cheeses, and delicate seasonings.",
        video: "assets/videos/hero-4.mp4",
        poster: "assets/posters/hero-4.webp"
      },
      {
        id: "hero-5",
        theme: "dark", // Roaring flames (DARK THEME)
        eyebrow: "The Fire",
        line1: "BAKED",
        line2: "TO RISE.",
        description: "Seared over roaring charcoal embers to lock in intense smoky aromas.",
        video: "assets/videos/hero-5.mp4",
        poster: "assets/posters/hero-5.webp"
      },
      {
        id: "hero-6",
        theme: "dark", // Crumbs falling on dark surface (DARK THEME)
        eyebrow: "The Crunch",
        line1: "MADE",
        line2: "TO FLAKE.",
        description: "Golden shattering exterior yielding to deeply savory juices.",
        video: "assets/videos/hero-6.mp4",
        poster: "assets/posters/hero-6.webp"
      },
      {
        id: "hero-7",
        theme: "light", // Dish cut open showing inside (BRIGHT THEME, LEFT-ALIGNED)
        eyebrow: "The Reveal",
        line1: "LAYERS WORTH",
        line2: "BREAKING.",
        description: "Every cross-section reveals our obsession with culinary architecture.",
        video: "assets/videos/hero-7.mp4",
        poster: "assets/posters/hero-7.webp"
      }
    ]
  },

  // 4 Full-Screen Signature Dishes
  signatureDishes: [
    {
      id: "burger",
      theme: "burger",
      name: "CLASSIC BURGER",
      price: "₹349",
      rawPrice: 349,
      poster: "assets/posters/burger.webp"
    },
    {
      id: "pizza",
      theme: "pizza",
      name: "PIZZA",
      price: "₹429",
      rawPrice: 429,
      poster: "assets/posters/pizza.webp"
    },
    {
      id: "biryani",
      theme: "biryani",
      name: "CHICKEN BIRYANI",
      price: "₹389",
      rawPrice: 389,
      poster: "assets/posters/biryani.webp"
    },
    {
      id: "pasta",
      theme: "pasta",
      name: "PASTA",
      price: "₹369",
      rawPrice: 369,
      poster: "assets/posters/pasta.webp"
    }
  ],

  // Signature Menu Catalogue Items
  menuCatalog: [
    {
      id: "menu-burger-classic",
      category: "burger",
      name: "Prime Wagyu Burger",
      desc: "Double flame-grilled patties, aged cheddar, crisp iceberg, house relish.",
      price: "₹349",
      rawPrice: 349,
      badge: "Best Seller",
      image: "assets/posters/burger.webp",
      video: "assets/videos/burger.mp4"
    },
    {
      id: "menu-burger-smoky",
      category: "burger",
      name: "Smoky Chipotle Burger",
      desc: "Chipotle aioli, caramelized shallots, smoked gouda, toasted brioche.",
      price: "₹369",
      rawPrice: 369,
      badge: "Chef's Pick",
      image: "assets/posters/burger.webp",
      video: "assets/videos/burger.mp4"
    },
    {
      id: "menu-pizza-margherita",
      category: "pizza",
      name: "Artisan Margherita",
      desc: "San Marzano D.O.P. pomodoro, fior di latte, cold-pressed olive oil, fresh basil.",
      price: "₹399",
      rawPrice: 399,
      badge: "Classic",
      image: "assets/posters/pizza.webp",
      video: "assets/videos/pizza.mp4"
    },
    {
      id: "menu-pizza-pepperoni",
      category: "pizza",
      name: "Fire-Roasted Pepperoni",
      desc: "Crispy beef pepperoni cups, hot honey drizzle, aged mozzarella, oregano.",
      price: "₹429",
      rawPrice: 429,
      badge: "Crispy Crust",
      image: "assets/posters/pizza.webp",
      video: "assets/videos/pizza.mp4"
    },
    {
      id: "menu-biryani-dum",
      category: "biryani",
      name: "Royal Chicken Dum Biryani",
      desc: "Slow-cooked in sealed clay handi with saffron basmati and aromatic spices.",
      price: "₹389",
      rawPrice: 389,
      badge: "Signature",
      image: "assets/posters/biryani.webp",
      video: "assets/videos/biryani.mp4"
    },
    {
      id: "menu-biryani-special",
      category: "biryani",
      name: "Nawabi Saffron Gosht Biryani",
      desc: "Rich tender cuts infused with Kashmiri rose water, golden fried shallots.",
      price: "₹449",
      rawPrice: 449,
      badge: "Limited Batch",
      image: "assets/posters/biryani.webp",
      video: "assets/videos/biryani.mp4"
    },
    {
      id: "menu-pasta-truffle",
      category: "pasta",
      name: "Truffle Tagliatelle",
      desc: "Hand-rolled egg ribbons bathed in black truffle emulsion and aged parmesan.",
      price: "₹369",
      rawPrice: 369,
      badge: "Handmade",
      image: "assets/posters/pasta.webp",
      video: "assets/videos/pasta.mp4"
    },
    {
      id: "menu-pasta-arrabbiata",
      category: "pasta",
      name: "Fire Pomodoro Penne",
      desc: "Slow-simmered Calabrian chili sauce, roasted garlic, wild oregano, basil.",
      price: "₹339",
      rawPrice: 339,
      badge: "Spicy",
      image: "assets/posters/pasta.webp",
      video: "assets/videos/pasta.mp4"
    }
  ]
};

/* ==============================================================================
   2. DYNAMIC THEME CONTROLLER (Dual Stacked Background Layers, 0-Repaint Blending)
   ============================================================================== */
class ThemeController {
  constructor(themes) {
    this.themes = themes;
    this.activeTheme = null;
    this.baseLayer = document.getElementById("themeBgBase");
    this.incomingLayer = document.getElementById("themeBgIncoming");
    this.themeTween = null;
  }

  setTheme(themeName, animate = true, duration = 0.8) {
    if (this.activeTheme === themeName) return;
    const theme = this.themes[themeName];
    if (!theme) return;

    const prevTheme = this.activeTheme;
    this.activeTheme = themeName;
    document.body.setAttribute("data-theme", themeName);

    if (!this.baseLayer || !this.incomingLayer) return;

    if (!animate || typeof gsap === "undefined" || !prevTheme) {
      this.baseLayer.style.backgroundColor = theme.bg;
      this.baseLayer.style.opacity = "1";
      this.incomingLayer.style.opacity = "0";
      return;
    }

    if (this.themeTween) {
      this.themeTween.kill();
    }

    // Set incoming layer background color, start at opacity 0, crossfade to 1
    this.incomingLayer.style.backgroundColor = theme.bg;
    gsap.set(this.incomingLayer, { opacity: 0 });

    this.themeTween = gsap.to(this.incomingLayer, {
      opacity: 1,
      duration: duration,
      ease: "power2.inOut",
      overwrite: "auto",
      onComplete: () => {
        // Swap: base adopts new color, incoming resets to 0
        this.baseLayer.style.backgroundColor = theme.bg;
        this.baseLayer.style.opacity = "1";
        gsap.set(this.incomingLayer, { opacity: 0 });
      }
    });
  }
}

/* ==============================================================================
   3. HERO STORY AUTO-PLAYING ENGINE (Seamless Blended Crossfade, Transform/Opacity Only)
   ============================================================================== */
class HeroStoryEngine {
  constructor(config, themeController) {
    this.config = config.heroStory;
    this.scenes = this.config.scenes;
    this.themeController = themeController;
    this.currentIndex = 0;
    this.totalScenes = this.scenes.length;
    this.timer = null;
    this.isPaused = false;
    this.isTransitioning = false;
    this.canNavigate = true;
    this.masterTimeline = null;
    this.layers = [];
    this.prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // DOM Elements
    this.heroSection = document.getElementById("heroStorySection");
    this.videoStage = document.getElementById("heroVideoStage");
    this.textStage = document.getElementById("heroTextStage");
    this.textContainer = document.getElementById("heroTextContainer");
    this.eyebrowElem = document.getElementById("heroEyebrow");
    this.line1Elem = document.getElementById("heroLine1");
    this.line2Elem = document.getElementById("heroLine2");
    this.descElem = document.getElementById("heroDescription");
    this.dotsContainer = document.getElementById("heroDotsContainer");
    this.prevBtn = document.getElementById("heroPrevBtn");
    this.nextBtn = document.getElementById("heroNextBtn");
    this.loopStatusText = document.querySelector("#heroLoopStatus .status-text");

    this.init();
  }

  init() {
    if (!this.heroSection || !this.videoStage) return;

    this.renderVideoLayers();
    this.renderDots();
    this.bindEvents();
    this.displayScene(0, false);

    if (!this.prefersReducedMotion) {
      this.startAutoAdvance();
    } else if (this.loopStatusText) {
      this.loopStatusText.textContent = "MANUAL";
    }
  }

  renderVideoLayers() {
    this.videoStage.innerHTML = "";
    this.layers = [];

    this.scenes.forEach((scene, index) => {
      const layer = document.createElement("div");
      layer.className = `hero-video-layer ${index === 0 ? "active" : ""}`;
      layer.dataset.index = index;
      layer.style.opacity = index === 0 ? "1" : "0";
      layer.style.transform = "scale(1)";
      layer.style.zIndex = index === 0 ? "2" : "1";

      const video = document.createElement("video");
      video.className = "hero-bg-video";
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.poster = scene.poster;

      if (index === 0) {
        // Preload only scene 0 first frame initially
        video.preload = "auto";
        const source = document.createElement("source");
        source.src = scene.video;
        source.type = "video/mp4";
        video.appendChild(source);
      } else {
        // Defer next scenes to on-demand preload
        video.preload = "none";
        video.dataset.src = scene.video;
      }

      // Fallback poster display if video fails
      video.addEventListener("error", () => {
        video.style.display = "none";
        const fallbackImg = document.createElement("div");
        fallbackImg.className = "hero-bg-image";
        fallbackImg.style.backgroundImage = `url('${scene.poster}')`;
        fallbackImg.style.backgroundSize = "cover";
        fallbackImg.style.backgroundPosition = "70% center";
        layer.appendChild(fallbackImg);
      });

      layer.appendChild(video);
      this.videoStage.appendChild(layer);
      this.layers.push(layer);
    });

    // Lazy-preload next upcoming scene video (scene 1)
    setTimeout(() => {
      this.preloadSceneVideo(1);
    }, 600);
  }

  preloadSceneVideo(index) {
    const layer = this.layers[index];
    if (!layer) return;
    const video = layer.querySelector("video");
    if (!video) return;

    if (!video.src && !video.querySelector("source") && video.dataset.src) {
      const source = document.createElement("source");
      source.src = video.dataset.src;
      source.type = "video/mp4";
      video.appendChild(source);
      video.preload = "auto";
      video.load();
    }
  }

  renderDots() {
    if (!this.dotsContainer) return;
    this.dotsContainer.innerHTML = "";
    this.scenes.forEach((_, idx) => {
      const dot = document.createElement("button");
      dot.className = `hero-dot ${idx === 0 ? "active" : ""}`;
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Scene ${idx + 1}`);
      dot.addEventListener("click", () => {
        if (this.canNavigate) this.goToScene(idx);
      });
      this.dotsContainer.appendChild(dot);
    });
  }

  bindEvents() {
    if (this.prevBtn) {
      this.prevBtn.addEventListener("click", () => {
        if (this.canNavigate) this.prevScene();
      });
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener("click", () => {
        if (this.canNavigate) this.nextScene();
      });
    }

    // Pause on Hover
    this.heroSection.addEventListener("mouseenter", () => {
      this.isPaused = true;
      if (this.loopStatusText && !this.prefersReducedMotion) {
        this.loopStatusText.textContent = "PAUSED";
      }
    });

    this.heroSection.addEventListener("mouseleave", () => {
      this.isPaused = false;
      if (this.loopStatusText && !this.prefersReducedMotion) {
        this.loopStatusText.textContent = "AUTO-PLAYING";
      }
    });

    // Keyboard navigation (ArrowLeft / ArrowRight) with navigation lock check
    document.addEventListener("keydown", (e) => {
      if (document.activeElement && ["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) return;
      if (this.isSectionInView === false) return;

      if (e.key === "ArrowRight") {
        if (this.canNavigate) this.nextScene();
      } else if (e.key === "ArrowLeft") {
        if (this.canNavigate) this.prevScene();
      }
    });

    // Touch Swipe & Pointer Drag Navigation
    let startX = 0;
    let isDragging = false;

    this.heroSection.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });

    this.heroSection.addEventListener("touchend", (e) => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40 && this.canNavigate) {
        if (diff > 0) this.nextScene();
        else this.prevScene();
      }
    }, { passive: true });

    this.heroSection.addEventListener("mousedown", (e) => {
      if (e.target.closest("button, a")) return;
      startX = e.clientX;
      isDragging = true;
    });

    this.heroSection.addEventListener("mouseup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      const diff = startX - e.clientX;
      if (Math.abs(diff) > 40 && this.canNavigate) {
        if (diff > 0) this.nextScene();
        else this.prevScene();
      }
    });
  }

  startAutoAdvance() {
    this.stopAutoAdvance();
    this.timer = setInterval(() => {
      if (!this.isPaused && !this.isTransitioning && this.canNavigate) {
        this.nextScene();
      }
    }, this.config.advanceDurationMs);
  }

  stopAutoAdvance() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  prevScene() {
    if (!this.canNavigate) return;
    const prevIdx = (this.currentIndex - 1 + this.totalScenes) % this.totalScenes;
    this.goToScene(prevIdx);
  }

  nextScene() {
    if (!this.canNavigate) return;
    const nextIdx = (this.currentIndex + 1) % this.totalScenes;
    this.goToScene(nextIdx);
  }

  prepareVideo(video) {
    return new Promise((resolve) => {
      if (!video) {
        resolve();
        return;
      }

      // Ensure source is loaded
      if (!video.src && !video.querySelector("source") && video.dataset.src) {
        const source = document.createElement("source");
        source.src = video.dataset.src;
        source.type = "video/mp4";
        video.appendChild(source);
        video.load();
      }

      let resolved = false;
      const finish = () => {
        if (!resolved) {
          resolved = true;
          cleanup();
          resolve();
        }
      };

      // 450ms safety timeout: hold current scene until frame is ready, never lock permanently
      const timeoutId = setTimeout(finish, 450);

      const cleanup = () => {
        clearTimeout(timeoutId);
        video.removeEventListener("playing", onPlaying);
        video.removeEventListener("canplay", onCanPlay);
      };

      const onFrame = () => {
        finish();
      };

      const onPlaying = () => {
        if ("requestVideoFrameCallback" in video) {
          video.requestVideoFrameCallback(onFrame);
        } else {
          requestAnimationFrame(onFrame);
        }
      };

      const onCanPlay = () => {
        video.currentTime = 0;
        const p = video.play();
        if (p !== undefined) {
          p.then(() => {
            if ("requestVideoFrameCallback" in video) {
              video.requestVideoFrameCallback(onFrame);
            } else {
              requestAnimationFrame(onFrame);
            }
          }).catch(finish);
        } else {
          finish();
        }
      };

      if (video.readyState >= 3) {
        video.currentTime = 0;
        const p = video.play();
        if (p !== undefined) {
          p.then(() => {
            if ("requestVideoFrameCallback" in video) {
              video.requestVideoFrameCallback(onFrame);
            } else {
              requestAnimationFrame(onFrame);
            }
          }).catch(finish);
        } else {
          finish();
        }
      } else {
        video.addEventListener("canplay", onCanPlay, { once: true });
        video.addEventListener("playing", onPlaying, { once: true });
        video.load();
      }
    });
  }

  goToScene(index) {
    if (index === this.currentIndex || !this.canNavigate) return;
    this.displayScene(index, true);
  }

  displayScene(index, animate = true) {
    const prevIndex = this.currentIndex;
    this.currentIndex = index;
    const scene = this.scenes[index];

    // Navigation locked immediately until 60% of transition
    this.canNavigate = false;
    this.isTransitioning = true;

    // Trigger SFX & ambient sound
    if (animate) {
      window.soundManager?.playSfx("swoosh");
    }
    if (this.isSectionInView !== false) {
      this.playSceneAmbient(index);
    }

    // Preload next ambient audio
    if (window.soundManager) {
      if (index === 2 || index === 3) window.soundManager.preloadAmbient("fire");
      if (index === 4 || index === 5) window.soundManager.preloadAmbient("airy");
      if (index === 6) window.soundManager.preloadAmbient("burger");
    }

    // Update Dots
    const dots = this.dotsContainer ? this.dotsContainer.querySelectorAll(".hero-dot") : [];
    dots.forEach((dot, idx) => {
      dot.classList.toggle("active", idx === index);
    });

    const incomingLayer = this.layers[index];
    const outgoingLayer = this.layers[prevIndex];
    const incomingVid = incomingLayer ? incomingLayer.querySelector("video") : null;
    const outgoingVid = outgoingLayer ? outgoingLayer.querySelector("video") : null;

    if (!animate || typeof gsap === "undefined" || this.prefersReducedMotion) {
      this.themeController.setTheme(scene.theme, false);

      this.layers.forEach((layer, idx) => {
        const vid = layer.querySelector("video");
        if (idx === index) {
          layer.classList.add("active");
          layer.style.opacity = "1";
          layer.style.transform = "scale(1)";
          layer.style.zIndex = "2";
          if (vid) {
            vid.currentTime = 0;
            vid.play().catch(() => {});
          }
        } else {
          layer.classList.remove("active");
          layer.style.opacity = "0";
          layer.style.zIndex = "1";
          if (vid) {
            vid.pause();
            vid.currentTime = 0;
          }
        }
      });

      this.eyebrowElem.textContent = scene.eyebrow;
      this.line1Elem.textContent = scene.line1;
      this.line2Elem.textContent = scene.line2;
      this.descElem.textContent = scene.description;

      this.canNavigate = true;
      this.isTransitioning = false;
      this.preloadSceneVideo((index + 1) % this.totalScenes);
      return;
    }

    // PRE-FLIGHT CHECK: Hold current scene until incoming video is decoded and playing
    this.prepareVideo(incomingVid).then(() => {
      if (this.masterTimeline) {
        this.masterTimeline.kill();
        this.masterTimeline = null;
      }

      // Sync background and nav theme crossfade over 0.8s
      this.themeController.setTheme(scene.theme, true, 0.8);

      // Prepare DOM for overlapping headline lines
      const mask1 = this.line1Elem.closest(".line-mask");
      const mask2 = this.line2Elem.closest(".line-mask");

      const oldSpan1 = this.line1Elem;
      const oldSpan2 = this.line2Elem;

      // Create new line elements
      const newSpan1 = document.createElement("span");
      newSpan1.className = "line-inner";
      newSpan1.id = "heroLine1";
      newSpan1.textContent = scene.line1;

      const newSpan2 = document.createElement("span");
      newSpan2.className = "line-inner";
      newSpan2.id = "heroLine2";
      newSpan2.textContent = scene.line2;

      oldSpan1.id = "";
      oldSpan2.id = "";
      oldSpan1.style.position = "absolute";
      oldSpan1.style.top = "0";
      oldSpan1.style.left = "0";
      oldSpan2.style.position = "absolute";
      oldSpan2.style.top = "0";
      oldSpan2.style.left = "0";

      mask1.appendChild(newSpan1);
      mask2.appendChild(newSpan2);

      this.line1Elem = newSpan1;
      this.line2Elem = newSpan2;

      // Set initial states
      gsap.set([newSpan1, newSpan2], { y: "100%", opacity: 1 });
      gsap.set(incomingLayer, { opacity: 0, scale: 1.04, zIndex: 3 });
      if (outgoingLayer) gsap.set(outgoingLayer, { zIndex: 2 });

      const masterTl = gsap.timeline({
        overwrite: "auto",
        onComplete: () => {
          // Release outgoing scene
          if (outgoingVid) {
            outgoingVid.pause();
            outgoingVid.currentTime = 0;
          }
          if (outgoingLayer) {
            outgoingLayer.classList.remove("active");
            gsap.set(outgoingLayer, { opacity: 0, scale: 1, zIndex: 1 });
          }
          incomingLayer.classList.add("active");
          incomingLayer.style.zIndex = "2";

          // Remove old text spans
          if (oldSpan1.parentNode) oldSpan1.parentNode.removeChild(oldSpan1);
          if (oldSpan2.parentNode) oldSpan2.parentNode.removeChild(oldSpan2);

          this.isTransitioning = false;
          this.canNavigate = true;

          // Preload next scene video
          this.preloadSceneVideo((index + 1) % this.totalScenes);
        }
      });

      this.masterTimeline = masterTl;

      // 1. Crossfade Videos: incoming (0 -> 1, scale 1.04 -> 1), outgoing (1 -> 0, scale 1 -> 0.98)
      masterTl.to(incomingLayer, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.inOut"
      }, 0);

      if (outgoingLayer) {
        masterTl.to(outgoingLayer, {
          opacity: 0,
          scale: 0.98,
          duration: 0.8,
          ease: "power2.inOut"
        }, 0);
      }

      // 2. Outgoing Headlines: slide up and fade (0.45s)
      masterTl.to([oldSpan1, oldSpan2], {
        y: "-100%",
        opacity: 0,
        duration: 0.45,
        ease: "power2.in"
      }, 0);

      masterTl.to([this.eyebrowElem, this.descElem], {
        opacity: 0,
        y: -10,
        duration: 0.3,
        ease: "power2.in"
      }, 0);

      // 3. Incoming Headlines: slide up from mask with 0.08s stagger starting at 0.25s (smooth overlap)
      masterTl.to([newSpan1, newSpan2], {
        y: "0%",
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.08,
        onStart: () => {
          window.soundManager?.playSfx("whoosh", { randomPitch: true });
        }
      }, 0.25);

      masterTl.add(() => {
        this.eyebrowElem.textContent = scene.eyebrow;
        this.descElem.textContent = scene.description;
      }, 0.25);

      masterTl.fromTo([this.eyebrowElem, this.descElem], 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" },
        0.3
      );

      // 4. Unlock navigation at 60% of transition (0.48s into 0.8s timeline)
      masterTl.add(() => {
        this.canNavigate = true;
      }, 0.48);
    });
  }

  playSceneAmbient(index) {
    if (!window.soundManager) return;
    if (index >= 0 && index <= 3) {
      window.soundManager.playAmbient("bright", 0.8);
    } else if (index === 4) {
      window.soundManager.playAmbient("fire", 0.8);
    } else if (index === 5) {
      window.soundManager.fadeAmbient(0.8);
    } else if (index === 6) {
      window.soundManager.playAmbient("airy", 0.8);
    }
  }

  playCurrentAmbient() {
    this.playSceneAmbient(this.currentIndex);
  }
}

/* ==============================================================================
   4. TOP-LINE PRELOADER (Thin Progress Line, Waits for Fonts + First Video Frame)
   ============================================================================== */
class TopLinePreloader {
  constructor() {
    this.preloader = document.getElementById("topPreloader");
    this.bar = document.getElementById("topPreloaderBar");
    this.progress = 0;
    this.isDone = false;
    this.init();
  }

  setProgress(p) {
    if (this.isDone) return;
    this.progress = Math.min(100, Math.max(this.progress, p));
    if (this.bar) {
      this.bar.style.width = `${this.progress}%`;
    }
    if (this.progress >= 100) {
      this.complete();
    }
  }

  complete() {
    if (this.isDone) return;
    this.isDone = true;
    if (this.bar) this.bar.style.width = "100%";
    setTimeout(() => {
      if (this.preloader) {
        this.preloader.classList.add("done");
        setTimeout(() => {
          if (this.preloader && this.preloader.parentNode) {
            this.preloader.parentNode.removeChild(this.preloader);
          }
        }, 500);
      }
    }, 200);
  }

  init() {
    if (!this.preloader || !this.bar) return;
    this.setProgress(20);

    // Font ready check (up to 60%)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        this.setProgress(60);
      });
    } else {
      this.setProgress(60);
    }

    // First hero video first frame check (up to 100%)
    const firstLayer = document.querySelector(".hero-video-layer[data-index='0']");
    const firstVideo = firstLayer ? firstLayer.querySelector("video") : null;

    if (firstVideo) {
      const onFrame = () => {
        this.setProgress(100);
      };

      if (firstVideo.readyState >= 3) {
        onFrame();
      } else {
        if ("requestVideoFrameCallback" in firstVideo) {
          firstVideo.requestVideoFrameCallback(onFrame);
        } else {
          firstVideo.addEventListener("playing", onFrame, { once: true });
          firstVideo.addEventListener("canplay", onFrame, { once: true });
        }
      }
    } else {
      this.setProgress(100);
    }

    // Safety timeout fallback
    setTimeout(() => {
      this.setProgress(100);
    }, 1200);
  }
}

/* ==============================================================================
   5. FULL-SCREEN PINNED SIGNATURE DISHES (Seamless Overlap Blend, Zero Black Gap)
   ============================================================================== */
class SignatureDishScrollEngine {
  constructor(config, themeController) {
    this.dishes = config.signatureDishes;
    this.themeController = themeController;
    this.init();
  }

  init() {
    if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
      console.warn("GSAP/ScrollTrigger not detected. Scrubbing fallback.");
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    this.dishes.forEach((dish) => {
      this.setupDishScrollTrigger(dish);
    });

    // Section Theme Triggers for catalogue, story, and contact
    this.setupSectionThemeTrigger("#signatureMenu", "dark");
    this.setupSectionThemeTrigger("#storySection", "dark");
    this.setupSectionThemeTrigger("#contactSection", "dark");
  }

  setupSectionThemeTrigger(selector, themeName) {
    const elem = document.querySelector(selector);
    if (!elem) return;

    ScrollTrigger.create({
      trigger: elem,
      start: "top 60%",
      end: "bottom 40%",
      onEnter: () => this.themeController.setTheme(themeName, true, 0.8),
      onEnterBack: () => this.themeController.setTheme(themeName, true, 0.8)
    });
  }

  setupDishScrollTrigger(dish) {
    const section = document.getElementById(`dish-${dish.id}`);
    if (!section) return;

    const video = section.querySelector(".dish-scrub-video");
    const fallback = section.querySelector(".dish-video-fallback");
    const title = section.querySelector(".dish-title");
    const underline = section.querySelector(".dish-gold-underline");
    const ingredientRows = section.querySelectorAll(".dish-ingredient-row");
    const contentPanel = section.querySelector(".dish-content-panel");
    const videoContainer = section.querySelector(".dish-video-container");

    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
      video.pause();

      video.addEventListener("error", () => {
        if (fallback) fallback.style.opacity = "1";
        video.style.display = "none";
      });
    }

    // Pinned Timeline: scrub: 0.5 for text transform/opacity ONLY (No video.currentTime seeking)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        start: "top top",
        end: "+=120%",
        scrub: 0.5,
        onEnter: () => this.themeController.setTheme(dish.theme, true, 0.8),
        onEnterBack: () => this.themeController.setTheme(dish.theme, true, 0.8),
        onUpdate: (self) => {
          // Active ingredient gold glow highlighting without layout thrash
          const totalRows = ingredientRows.length;
          ingredientRows.forEach((row, i) => {
            const rowProgress = (i + 1) / (totalRows + 1);
            if (self.progress >= rowProgress * 0.65) {
              if (!row.classList.contains("active-ingredient")) {
                row.classList.add("active-ingredient");
                window.soundManager?.playSfx("tick");
              }
            } else {
              row.classList.remove("active-ingredient");
            }
          });
        }
      }
    });

    if (title) {
      tl.from(title, {
        y: "100%",
        duration: 0.35,
        ease: "power2.out"
      }, 0);
    }

    if (underline) {
      tl.from(underline, {
        scaleX: 0,
        transformOrigin: "left",
        duration: 0.3,
        ease: "power2.out"
      }, 0.1);
    }

    // Stagger in from left: x: -20 -> 0 with sfx-tick (max 1 per 70ms)
    if (ingredientRows.length > 0) {
      tl.from(ingredientRows, {
        x: -20,
        opacity: 0,
        duration: 0.4,
        stagger: {
          each: 0.06,
          onStart: function() {
            window.soundManager?.playSfx("tick");
          }
        },
        ease: "power2.out"
      }, 0.15);

      // Ingredient row hover sound: sfx-tick
      ingredientRows.forEach((row) => {
        row.addEventListener("mouseenter", () => {
          window.soundManager?.playSfx("tick");
        });
      });
    }

    // Seamless overlap exit: between 0.75 and 1.0, fade out content and video gently so next dish blends in underneath
    if (contentPanel) {
      tl.to(contentPanel, {
        opacity: 0,
        y: -25,
        duration: 0.25,
        ease: "power2.in"
      }, 0.75);
    }

    if (videoContainer) {
      tl.to(videoContainer, {
        opacity: 0.2,
        scale: 0.98,
        duration: 0.25,
        ease: "power2.in"
      }, 0.75);
    }
  }
}

/* ==============================================================================
   5. SIGNATURE MENU CATALOGUE & VIDEO PREVIEWS
   ============================================================================== */
class MenuCatalogueEngine {
  constructor(config, cartEngine) {
    this.menu = config.menuCatalog;
    this.cartEngine = cartEngine;
    this.grid = document.getElementById("menuGrid");
    this.filterButtons = document.querySelectorAll(".filter-btn");

    this.init();
  }

  init() {
    if (!this.grid) return;
    this.renderMenu("all");
    this.bindFilterEvents();
  }

  bindFilterEvents() {
    this.filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        this.filterButtons.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        this.renderMenu(btn.dataset.filter || "all");
      });
    });
  }

  renderMenu(filter = "all") {
    this.grid.innerHTML = "";
    const items = filter === "all" ? this.menu : this.menu.filter((i) => i.category === filter);

    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "menu-card";
      card.dataset.id = item.id;

      card.innerHTML = `
        <div class="menu-card-media">
          <span class="menu-card-badge">${item.badge}</span>
          <img src="${item.image}" alt="${item.name}" class="menu-card-img" loading="lazy">
          <video class="menu-card-video" muted loop playsinline preload="none">
            <source src="${item.video}" type="video/mp4">
          </video>
        </div>
        <div class="menu-card-content">
          <h3 class="menu-card-title">${item.name}</h3>
          <p class="menu-card-desc">${item.desc}</p>
          <div class="menu-card-footer">
            <span class="menu-card-price">${item.price}</span>
            <button class="btn-add-cart" data-id="${item.id}">ADD TO CART</button>
          </div>
        </div>
      `;

      // Seamless video preview on hover
      const media = card.querySelector(".menu-card-media");
      const video = card.querySelector(".menu-card-video");

      if (media && video) {
        media.addEventListener("mouseenter", () => {
          video.currentTime = 0;
          const p = video.play();
          if (p !== undefined) p.catch(() => {});
        });
        media.addEventListener("mouseleave", () => {
          video.pause();
        });
      }

      card.querySelector(".btn-add-cart").addEventListener("click", () => {
        this.cartEngine.addItem({
          id: item.id,
          name: item.name,
          price: item.price,
          rawPrice: item.rawPrice,
          image: item.image
        });
      });

      this.grid.appendChild(card);
    });
  }
}

/* ==============================================================================
   6. SLIDE-IN CART DRAWER (With LocalStorage Try/Catch)
   ============================================================================== */
class CartEngine {
  constructor() {
    this.storageKey = "cravecraft_cart_items";
    this.cartItems = this.loadCart();

    // DOM Elements
    this.overlay = document.getElementById("cartDrawerOverlay");
    this.cartBtn = document.getElementById("navCartBtn");
    this.closeBtn = document.getElementById("cartCloseBtn");
    this.itemsContainer = document.getElementById("cartDrawerItems");
    this.subtotalAmount = document.getElementById("cartSubtotalAmount");
    this.countBadge = document.getElementById("cartCountBadge");
    this.checkoutBtn = document.getElementById("cartCheckoutBtn");
    this.toastContainer = document.getElementById("toastContainer");

    this.init();
  }

  init() {
    this.bindEvents();
    this.updateUI();
  }

  loadCart() {
    try {
      const data = localStorage.getItem(this.storageKey);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Storage access restricted:", e);
      return [];
    }
  }

  saveCart() {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
    } catch (e) {
      console.warn("Could not write to localStorage:", e);
    }
    this.updateUI();
  }

  bindEvents() {
    if (this.cartBtn) this.cartBtn.addEventListener("click", () => this.open());
    if (this.closeBtn) this.closeBtn.addEventListener("click", () => this.close());
    if (this.overlay) {
      this.overlay.addEventListener("click", (e) => {
        if (e.target === this.overlay) this.close();
      });
    }
    if (this.checkoutBtn) this.checkoutBtn.addEventListener("click", () => this.checkout());

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.overlay.classList.contains("active")) {
        this.close();
      }
    });
  }

  open(silent = false) {
    if (!this.overlay) return;
    if (!silent) {
      window.soundManager?.playSfx("slide");
    }
    this.overlay.classList.add("active");
    this.overlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  close() {
    if (!this.overlay) return;
    window.soundManager?.playSfx("slide");
    this.overlay.classList.remove("active");
    this.overlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  addItem(item) {
    // Add to cart sound: sfx-pop then sfx-chime
    window.soundManager?.playSfx("pop");
    setTimeout(() => {
      window.soundManager?.playSfx("chime");
    }, 160);

    const existing = this.cartItems.find((i) => i.id === item.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.cartItems.push({
        id: item.id,
        name: item.name,
        price: item.price,
        rawPrice: item.rawPrice || parseInt(String(item.price).replace(/[^0-9]/g, ""), 10),
        image: item.image,
        quantity: 1
      });
    }

    this.saveCart();
    this.showToast(`Added ${item.name} to order.`);
    this.open(true);
  }

  changeQuantity(id, delta) {
    const item = this.cartItems.find((i) => i.id === id);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      this.cartItems = this.cartItems.filter((i) => i.id !== id);
    }

    this.saveCart();
  }

  updateUI() {
    const totalCount = this.cartItems.reduce((acc, item) => acc + item.quantity, 0);
    if (this.countBadge) {
      this.countBadge.textContent = totalCount;
      this.countBadge.style.display = totalCount > 0 ? "block" : "none";
    }

    if (!this.itemsContainer) return;
    this.itemsContainer.innerHTML = "";

    if (this.cartItems.length === 0) {
      this.itemsContainer.innerHTML = `
        <div class="cart-empty-message">
          <p>Your culinary order is empty.</p>
          <p style="margin-top:8px; font-size:13px; opacity:0.7;">Select craft dishes to build your order.</p>
        </div>
      `;
    } else {
      this.cartItems.forEach((item) => {
        const row = document.createElement("div");
        row.className = "cart-item-row";
        row.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-details">
            <h4 class="cart-item-name">${item.name}</h4>
            <span class="cart-item-price">₹${item.rawPrice * item.quantity}</span>
          </div>
          <div class="cart-qty-controls">
            <button class="qty-btn" data-action="minus" aria-label="Decrease quantity">−</button>
            <span class="qty-val">${item.quantity}</span>
            <button class="qty-btn" data-action="plus" aria-label="Increase quantity">+</button>
          </div>
        `;

        row.querySelector('[data-action="minus"]').addEventListener("click", () => {
          this.changeQuantity(item.id, -1);
        });

        row.querySelector('[data-action="plus"]').addEventListener("click", () => {
          this.changeQuantity(item.id, 1);
        });

        this.itemsContainer.appendChild(row);
      });
    }

    const subtotal = this.cartItems.reduce((acc, item) => acc + item.rawPrice * item.quantity, 0);
    if (this.subtotalAmount) {
      this.subtotalAmount.textContent = `₹${subtotal}`;
    }
  }

  showToast(message) {
    if (!this.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "crave-toast";
    toast.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
      <span>${message}</span>
    `;

    this.toastContainer.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(10px)";
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert("Your order is empty. Please select signature dishes first.");
      return;
    }

    const summary = this.cartItems
      .map((i) => `${i.name} (x${i.quantity}) - ₹${i.rawPrice * i.quantity}`)
      .join("%0D%0A");
    const subtotal = this.cartItems.reduce((acc, item) => acc + item.rawPrice * item.quantity, 0);

    const emailSubject = encodeURIComponent("CraveCraft Order Inquiry - Gampa Sai Charan");
    const emailBody = `Hello CraveCraft Team,%0D%0A%0D%0AI would like to place an order:%0D%0A${summary}%0D%0A%0D%0ATotal Subtotal: ₹${subtotal}%0D%0A%0D%0APlease confirm delivery details.`;

    window.location.href = `mailto:ssaicharan229@gmail.com?subject=${emailSubject}&body=${emailBody}`;
  }
}

/* ==============================================================================
   7. MAIN APPLICATION ENGINE & INITIALIZATION
   ============================================================================== */
class CraveCraftApp {
  constructor() {
    this.config = CONFIG;
    this.theme = new ThemeController(CONFIG.themes);
    this.cart = new CartEngine();
    this.hero = new HeroStoryEngine(CONFIG, this.theme);
    this.preloader = new TopLinePreloader();
    this.dishes = new SignatureDishScrollEngine(CONFIG, this.theme);
    this.catalogue = new MenuCatalogueEngine(CONFIG, this.cart);
    this.lenis = null;

    this.initSmoothScroll();
    this.initNavbar();
    this.initSearch();
    this.initPerformanceObserver();
    this.initSoundEffects();
    this.injectInlineSVGs();
    this.handleAutoplayPolicyUnlock();
  }

  addToCart(dishId) {
    const dish = this.config.signatureDishes.find((d) => d.id === dishId);
    if (dish) {
      this.cart.addItem({
        id: dish.id,
        name: dish.name,
        price: dish.price,
        rawPrice: dish.rawPrice,
        image: dish.poster
      });
    }
  }

  initSmoothScroll() {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Connect Lenis Smooth Scroll to GSAP ScrollTrigger
    if (!prefersReducedMotion && typeof Lenis !== "undefined") {
      this.lenis = new Lenis({
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false // Preserve natural responsive touch scrolling on mobile
      });

      this.lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        this.lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);
    }

    // Single smooth scroll link delegation
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        const targetId = anchor.getAttribute("href");
        if (targetId === "#") return;
        const targetElem = document.querySelector(targetId);
        if (targetElem) {
          e.preventDefault();
          if (this.lenis) {
            this.lenis.scrollTo(targetElem, { offset: 0, duration: 1.2 });
          } else {
            targetElem.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  }

  initNavbar() {
    const header = document.getElementById("siteHeader");
    const mobileToggle = document.getElementById("mobileMenuToggle");
    const navMenu = document.getElementById("navMenu");

    if (this.lenis) {
      this.lenis.on('scroll', ({ scroll }) => {
        if (scroll > 40) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });
    } else {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 40) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }, { passive: true });
    }

    if (mobileToggle && navMenu) {
      mobileToggle.addEventListener("click", () => {
        navMenu.classList.toggle("open");
      });

      navMenu.querySelectorAll(".nav-link, .dropdown-link").forEach((link) => {
        link.addEventListener("click", () => navMenu.classList.remove("open"));
      });
    }
  }

  initSearch() {
    const searchBtn = document.getElementById("searchToggleBtn");
    const searchBar = document.getElementById("quickSearchBar");
    const searchClose = document.getElementById("searchCloseBtn");
    const searchInput = document.getElementById("searchInput");

    if (!searchBtn || !searchBar) return;

    searchBtn.addEventListener("click", () => {
      searchBar.classList.toggle("active");
      if (searchBar.classList.contains("active") && searchInput) {
        searchInput.focus();
      }
    });

    if (searchClose) {
      searchClose.addEventListener("click", () => searchBar.classList.remove("active"));
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        const query = e.target.value.toLowerCase().trim();
        const menuSection = document.getElementById("signatureMenu");
        if (menuSection && query.length > 1) {
          if (this.lenis) {
            this.lenis.scrollTo(menuSection, { offset: 0, duration: 1.0 });
          } else {
            menuSection.scrollIntoView({ behavior: "smooth" });
          }
          document.querySelectorAll(".menu-card").forEach((card) => {
            const match = card.textContent.toLowerCase().includes(query);
            card.style.display = match ? "flex" : "none";
          });
        } else {
          document.querySelectorAll(".menu-card").forEach((card) => {
            card.style.display = "flex";
          });
        }
      });
    }
  }

  initPerformanceObserver() {
    if (!("IntersectionObserver" in window)) return;

    // Dishes: Play visible dish video and switch ambient audio per section (threshold 0.5)
    const dishSections = document.querySelectorAll(".dish-scene-section");
    const dishObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const section = entry.target;
        const video = section.querySelector(".dish-scrub-video");
        const dishId = section.id.replace("dish-", ""); // burger, pizza, biryani, pasta

        // Preload ambient audio just before section appears
        if (entry.isIntersecting && entry.intersectionRatio > 0 && entry.intersectionRatio < 0.5) {
          window.soundManager?.preloadAmbient(dishId);
        }

        // Section in view (threshold 0.5): play corresponding ambient audio
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          if (["burger", "pizza", "biryani", "pasta"].includes(dishId)) {
            window.soundManager?.playAmbient(dishId, 0.8);
          }
        }

        // Scrub video playback (strictly muted)
        if (video) {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {});
            }
          } else {
            video.pause();
            video.currentTime = 0;
          }
        }
      });
    }, { threshold: [0, 0.4, 0.5] });

    dishSections.forEach((section) => dishObserver.observe(section));

    // Hero: Pause hero auto-advance and video when off-screen to eliminate CPU/GPU drain, restore hero ambient
    const heroSection = document.getElementById("heroStorySection");
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            this.hero.isSectionInView = false;
            this.hero.stopAutoAdvance();
            const activeVideo = document.querySelector(".hero-video-layer.active video");
            if (activeVideo) activeVideo.pause();
          } else {
            this.hero.isSectionInView = true;
            if (!this.hero.prefersReducedMotion && !this.hero.isPaused) {
              this.hero.startAutoAdvance();
            }
            const activeVideo = document.querySelector(".hero-video-layer.active video");
            if (activeVideo) activeVideo.play().catch(() => {});

            // Restore active Hero scene ambient
            this.hero.playCurrentAmbient();
          }
        });
      }, { threshold: 0.3 });

      heroObserver.observe(heroSection);
    }

    // Lower sections: fade out ambient when browsing catalogue, story, or contact
    const lowerSections = document.querySelectorAll("#signatureMenu, #storySection, #contactSection");
    const lowerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
          window.soundManager?.stopAmbient(0.8);
        }
      });
    }, { threshold: [0.2] });
    lowerSections.forEach((sec) => lowerObserver.observe(sec));
  }

  // Interactive Button Hover & Click SFX
  initSoundEffects() {
    // 1. Button / interactive element hover SFX (sfx-click)
    document.addEventListener("mouseover", (e) => {
      const btn = e.target.closest(
        "button, .btn-hero-order, .btn-dish-order, .btn-add-cart, .btn-checkout, .hero-arrow-btn, .hero-dot, .nav-link, .dropdown-link, .filter-btn, .floating-chat-button"
      );
      if (btn && (!e.relatedTarget || !btn.contains(e.relatedTarget))) {
        window.soundManager?.playSfx("click");
      }
    });

    // 2. Order Now button click SFX (sfx-pop)
    const heroOrderBtn = document.getElementById("heroOrderBtn");
    if (heroOrderBtn) {
      heroOrderBtn.addEventListener("click", () => {
        window.soundManager?.playSfx("pop");
      });
    }
  }

  // Inject SVGs inline so stroke="currentColor" adapts seamlessly to dynamic themes
  injectInlineSVGs() {
    document.querySelectorAll(".ingredient-icon-box[data-icon]").forEach((box) => {
      const url = box.dataset.icon;
      if (!url) return;

      fetch(url)
        .then((res) => {
          if (!res.ok) throw new Error("Icon not found");
          return res.text();
        })
        .then((svgText) => {
          box.innerHTML = svgText;
          const svg = box.querySelector("svg");
          if (svg) {
            svg.setAttribute("width", "24");
            svg.setAttribute("height", "24");
            svg.style.stroke = "currentColor";
          }
        })
        .catch(() => {
          // Gracefully keeps the fallback <img> inside
        });
    });
  }

  // Handle Autoplay Policy: if browser blocked autoplay, unlock on first user gesture
  handleAutoplayPolicyUnlock() {
    const unlockAutoplay = () => {
      const activeVideo = document.querySelector(".hero-video-layer.active video");
      if (activeVideo && activeVideo.paused) {
        activeVideo.play().catch(() => {});
      }
      window.removeEventListener("click", unlockAutoplay);
      window.removeEventListener("touchstart", unlockAutoplay);
      window.removeEventListener("scroll", unlockAutoplay);
    };

    window.addEventListener("click", unlockAutoplay, { once: true });
    window.addEventListener("touchstart", unlockAutoplay, { once: true });
    window.addEventListener("scroll", unlockAutoplay, { once: true });
  }
}

// Ensure Web Fonts and Layout are completely ready before ScrollTrigger calculates markers
window.addEventListener("DOMContentLoaded", () => {
  window.craveApp = new CraveCraftApp();

  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(() => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    });
  }

  // Refresh ScrollTrigger on window resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      if (typeof ScrollTrigger !== "undefined") {
        ScrollTrigger.refresh();
      }
    }, 200);
  }, { passive: true });
});
