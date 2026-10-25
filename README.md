# CRAVECRAFT — CINEMATIC FULL-SCREEN LUXURY FOOD EXPERIENCE

> **"Every layer, crafted to be craved."**  
> An edge-to-edge (100vw × 100vh / 100svh), luxury cinematic food experience featuring 3D exploded animations of handcrafted burgers, artisan wood-fired pizza, royal dum biryani, and al dente handmade pasta.

Designed & Crafted by **Gampa Sai Charan** (B.Tech CSE AI/ML student)  
- **Email**: [ssaicharan229@gmail.com](mailto:ssaicharan229@gmail.com)  
- **Instagram**: [@__sai__8055_](https://instagram.com/__sai__8055_)  
- **GitHub**: [github.com/ssaicharan229](https://github.com/ssaicharan229)

---

## 📁 PROJECT FOLDER TREE

```text
food website/
├── index.html                     # Full-screen cinematic web experience
├── css/
│   └── style.css                  # Vanilla CSS3 luxury design system (Bodoni Moda & DM Sans, dynamic theme variables)
├── js/
│   └── main.js                    # Central CONFIG, ThemeController, 7-scene hero engine, ScrollTrigger pin & cart
├── assets/
│   ├── videos/                    # 1080p full-screen H.264 video assets (edge-to-edge, right-shifted)
│   │   ├── hero-1.mp4             # Scene 1: Crafted in Layers (Bright cream dough texture - light theme)
│   │   ├── hero-2.mp4             # Scene 2: Crafted in Layers (Key ingredient drop - light theme)
│   │   ├── hero-3.mp4             # Scene 3: Layer by Layer (Layers fold & stack - light theme)
│   │   ├── hero-4.mp4             # Scene 4: Layer by Layer (Layers roll & assemble - light theme)
│   │   ├── hero-5.mp4             # Scene 5: Baked to Rise (Roaring flame embers — dark theme)
│   │   ├── hero-6.mp4             # Scene 6: Made to Flake (Dish on dark surface — dark theme)
│   │   ├── hero-7.mp4             # Scene 7: Layers Worth Breaking (Dish cut open — light theme, left-anchored)
│   │   ├── burger.mp4             # Signature Dish 1: Classic Burger (exploded scrub)
│   │   ├── pizza.mp4              # Signature Dish 2: Artisan Pizza (exploded scrub)
│   │   ├── biryani.mp4            # Signature Dish 3: Chicken Biryani (exploded scrub)
│   │   └── pasta.mp4              # Signature Dish 4: Handmade Pasta (exploded scrub)
│   ├── posters/                   # Instant first-frame high-res fallback jpgs (Ken-Burns zoom)
│   │   ├── hero-1.jpg … hero-7.jpg
│   │   ├── burger.jpg, pizza.jpg, biryani.jpg, pasta.jpg
│   └── icons/                     # 24 custom 1.5px stroke currentColor SVG line icons
│       ├── bun.svg, lettuce.svg, tomato.svg, onion.svg, cheese.svg, patty.svg, sauce.svg
│       ├── dough.svg, tomato_sauce.svg, mozzarella.svg, pepperoni.svg, olives.svg, capsicum.svg, oregano.svg
│       ├── rice.svg, chicken.svg, spices.svg, herbs.svg, saffron.svg, mushroom.svg, basil.svg, pepper.svg …
└── README.md
```

---

## 🎨 CORE DESIGN & MOTION SYSTEM

### 1. New Font System (Theme-Based)
- **Display / Headlines / Dish Titles**: `Bodoni Moda` (weights 500, 600, 700; italic for eyebrows).
  - Headlines: UPPERCASE, line-height 0.95, letter-spacing -0.01em, size `clamp(48px, 9vw, 150px)`.
  - Eyebrows: `Bodoni Moda` italic, 16–20px (`clamp(16px, 1.8vw, 20px)`), font-weight: 500.
  - Dish Titles: `Bodoni Moda`, UPPERCASE, line-height 0.95, letter-spacing -0.01em, `clamp(40px, 5.5vw, 64px)`.
- **Body / Nav / Buttons / Labels**: `DM Sans` (weights 400, 500, 600).
  - Body text & descriptions: `DM Sans` 14–16px, line-height 1.6, max 34ch.
  - Ingredient labels & Nav links: `DM Sans` 14–15px, letter-spacing 0.02em, font-weight: 500.
  - Buttons: `DM Sans` 600, 12px, uppercase, letter-spacing 0.14em.
- Defined as CSS variables: `--font-display` and `--font-body` with proper fallback stacks (`Georgia, serif` and `system-ui, sans-serif`).

### 2. Font Colors Follow Website Theme
All text colors, background colors, accents, and buttons are driven by CSS custom properties and smoothly tweened with GSAP (0.6s) as themes switch:
- **`theme "light"`** (Bright cream scenes: Hero 1–4 and 7):
  `--bg: #F6F1EA; --text: #111111; --text-muted: rgba(17,17,17,.7); --accent: #C98B3C; --btn-bg: #111111; --btn-text: #FFFFFF;`
- **`theme "burger"`**:
  `--bg: #0B0907; --text: #FFFFFF; --text-muted: rgba(255,255,255,.8); --accent: #F4B860; --btn-bg: #FFFFFF; --btn-text: #0B0907;`
- **`theme "pizza"`**:
  `--bg: #2A1308; --text: #FFF4E8; --text-muted: rgba(255,244,232,.8); --accent: #FF8A3D; --btn-bg: #FFF4E8; --btn-text: #2A1308;`
- **`theme "biryani"`**:
  `--bg: #1A0F08; --text: #FFF6E0; --text-muted: rgba(255,246,224,.8); --accent: #F2C14E; --btn-bg: #FFF6E0; --btn-text: #1A0F08;`
- **`theme "pasta"`**:
  `--bg: #06101A; --text: #EAF6F5; --text-muted: rgba(234,246,245,.8); --accent: #7FD1C7; --btn-bg: #EAF6F5; --btn-text: #06101A;`
- **`theme "dark"`** (Hero scenes 5–6, flames):
  `--bg: #0B0907; --text: #FFFFFF; --text-muted: rgba(255,255,255,.8); --accent: #D9A441; --btn-bg: #FFFFFF; --btn-text: #0B0907;`
- All SVGs strictly use `stroke: currentColor;` to adapt instantly.
- Soft text-shadows (`0 2px 18px rgba(0,0,0,.45)` on dark scenes and `0 2px 18px rgba(255,255,255,.35)` on bright scenes) guarantee WCAG AA contrast (4.5:1 body, 3:1 large text) with ZERO video washes or overlays.
- Navbar colors update automatically during scrolling and hero scene transitions.

### 3. All Text Left-Anchored & Zero Scrims
- Every text element (eyebrow, headline, paragraph, button, dish title, underline, ingredient list) is left-aligned and anchored to the left of the screen: `padding-left: clamp(24px, 6vw, 96px);` with paragraphs constrained to `max-width: 34ch;`.
- Full clarity edge-to-edge: all gradient scrims, white fades, film-grain overlays, and backdrop-filter blurs are completely removed.
- Hero scene 7 is left-aligned like all other hero scenes (no longer centered).
- Dish sections: text panels are ALWAYS on the left for Burger, Pizza, Biryani, and Pasta (alternating right panels removed).
- Dish videos/images are positioned with `object-position: 70% center`, placing the floating dish subject to the right of the screen so text and food never collide.
- Mobile (≤768px): text is docked bottom-left over clean video with text-shadow (`object-position: center 25%`).

---

## ⚡ PERFORMANCE & SMOOTH SCROLLING ARCHITECTURE

### 1. Lenis Smooth Scroll Engine
- Pinned `lenis@1.1.18` synchronized directly to GSAP's ticker:
  ```javascript
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  ```
- Native touch scrolling preserved on mobile devices (`syncTouch: false`).
- Automatically disabled under `prefers-reduced-motion: reduce`.

### 2. Elimination of Video Scrub Seeking
- Replaced `video.currentTime` seeking on scroll with normal looping playback controlled by `IntersectionObserver` (threshold: 0.4).
- Only ONE video plays at any moment; off-screen videos pause and reset (`currentTime = 0`).
- ScrollTrigger uses GPU-accelerated transforms (`translate3d`, `scaleX`) and opacity exclusively with `scrub: 0.5`.

### 3. GPU Containment & Content Visibility
- Added `contain: layout paint` on full-screen scenes (`100svh`).
- Added `content-visibility: auto; contain-intrinsic-size: 100vh;` on below-the-fold catalogue, ingredients, story, and contact sections.

---

## 🎥 FFMPEG OPTIMIZATION COMMANDS

### 1. Lightweight 720p H.264 Video (<3 MB, No Audio)
```bash
ffmpeg -i in.mp4 -vf "scale=-2:720,fps=30" -c:v libx264 -crf 26 -preset slow -movflags +faststart -an out.mp4
```

### 2. Pre-Rendered WebP Frame Sequence (60–90 Frames for Canvas Scrubbing)
```bash
ffmpeg -i in.mp4 -vf "fps=24,scale=1280:-2" -c:v libwebp -quality 75 frames/f_%03d.webp
```

---

## 🚀 HOW TO RUN LOCALLY

### Option A: VS Code Live Server (Zero-Install)
1. Open the project folder `food website` in VS Code.
2. Install the **Live Server** extension by Ritwick Dey.
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The site will open at `http://127.0.0.1:5500/index.html`.

### Option B: Python Local Server
```bash
python -m http.server 3000
```
Open your browser at `http://localhost:3000/index.html`.

---

## 🌐 DEPLOYMENT TO GITHUB PAGES

1. Commit and push:
   ```bash
   git add .
   git commit -m "feat: updated CraveCraft with Bodoni Moda, theme color tweening, and left-anchored layout"
   git push origin main
   ```
2. On GitHub: **Repository Settings** → **Pages** → Source: **Deploy from a branch (`main` / root)**.
3. Live URL: `https://<username>.github.io/<repo>/`
