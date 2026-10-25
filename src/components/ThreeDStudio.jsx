import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { X, RotateCcw, Play, Pause, Sparkles, Layers, Sun, ShieldAlert, Award } from "lucide-react";

export default function ThreeDStudio({ dish, onClose, onAddToCart }) {
  const mountRef = useRef(null);
  const [explodeFactor, setExplodeFactor] = useState(0.4);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingMode, setLightingMode] = useState("amber"); // 'amber', 'cyber', 'studio'
  const [selectedLayerIndex, setSelectedLayerIndex] = useState(null);

  // References to keep Three.js state
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const meshesRef = useRef([]);
  const lightsRef = useRef({});
  const particlesRef = useRef(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  const objectGroupRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x08090d, 0.08);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.0);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = "";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 4. Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffecd2, 2.2);
    mainLight.position.set(4, 7, 5);
    mainLight.castShadow = true;
    mainLight.shadow.mapSize.width = 1024;
    mainLight.shadow.mapSize.height = 1024;
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0xf59e0b, 2.8);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(0xea580c, 1.4, 15);
    fillLight.position.set(0, -2, 3);
    scene.add(fillLight);

    lightsRef.current = { ambientLight, mainLight, rimLight, fillLight };

    // 5. Contact Shadow Plane
    const shadowGeo = new THREE.CircleGeometry(2.2, 48);
    const shadowMat = new THREE.MeshBasicMaterial({
      color: 0x030406,
      transparent: true,
      opacity: 0.65
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -1.6;
    scene.add(shadowMesh);

    // 6. Object Root Group
    const rootGroup = new THREE.Group();
    scene.add(rootGroup);
    objectGroupRef.current = rootGroup;

    // 7. Build Procedural 3D Mesh for Selected Dish
    const createdLayers = [];

    if (dish.id === "burger") {
      // 1. Bottom Bun
      const bBunGeo = new THREE.CylinderGeometry(1.2, 1.15, 0.35, 36);
      const bBunMat = new THREE.MeshStandardMaterial({
        color: 0xc88232,
        roughness: 0.7,
        metalness: 0.05
      });
      const bBun = new THREE.Mesh(bBunGeo, bBunMat);
      bBun.castShadow = true;
      bBun.receiveShadow = true;
      createdLayers.push({ mesh: bBun, baseY: -1.2, name: "Brioche Base Bun" });

      // 2. Secret Truffle Sauce
      const sauceGeo = new THREE.CylinderGeometry(1.1, 1.15, 0.08, 32);
      const sauceMat = new THREE.MeshStandardMaterial({
        color: 0xe6a86c,
        roughness: 0.3,
        metalness: 0.1
      });
      const sauce = new THREE.Mesh(sauceGeo, sauceMat);
      createdLayers.push({ mesh: sauce, baseY: -0.9, name: "Truffle Umami Aioli" });

      // 3. Black Angus Patty
      const pattyGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.45, 36);
      const pattyMat = new THREE.MeshStandardMaterial({
        color: 0x3d2012,
        roughness: 0.9,
        metalness: 0.0
      });
      const patty = new THREE.Mesh(pattyGeo, pattyMat);
      patty.castShadow = true;
      createdLayers.push({ mesh: patty, baseY: -0.5, name: "Prime Black Angus Patty (220g)" });

      // 4. Melted Cheddar
      const cheeseGeo = new THREE.BoxGeometry(1.8, 0.1, 1.8);
      const cheeseMat = new THREE.MeshStandardMaterial({
        color: 0xffaa00,
        roughness: 0.35,
        metalness: 0.05
      });
      const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
      cheese.rotation.y = Math.PI / 4;
      createdLayers.push({ mesh: cheese, baseY: -0.1, name: "18-Month Aged Wisconsin Cheddar" });

      // 5. Red Onions & Tomato Slices
      const onionGroup = new THREE.Group();
      const tomatoMat = new THREE.MeshStandardMaterial({
        color: 0xcc2211,
        roughness: 0.25,
        metalness: 0.1
      });
      const tom1 = new THREE.Mesh(new THREE.CylinderGeometry(0.7, 0.7, 0.12, 24), tomatoMat);
      tom1.position.set(-0.35, 0, 0.15);
      const tom2 = new THREE.Mesh(new THREE.CylinderGeometry(0.65, 0.65, 0.12, 24), tomatoMat);
      tom2.position.set(0.35, 0, -0.15);
      onionGroup.add(tom1, tom2);

      const onionMat = new THREE.MeshStandardMaterial({ color: 0x8b1c62, roughness: 0.4 });
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.06, 12, 32), onionMat);
      ring1.rotation.x = Math.PI / 2;
      onionGroup.add(ring1);
      createdLayers.push({ mesh: onionGroup, baseY: 0.3, name: "Heirloom Tomato & Shallots" });

      // 6. Curly Lettuce
      const lettuceGeo = new THREE.TorusGeometry(1.15, 0.22, 16, 40);
      const lettuceMat = new THREE.MeshStandardMaterial({
        color: 0x38a169,
        roughness: 0.6,
        metalness: 0.05
      });
      const lettuce = new THREE.Mesh(lettuceGeo, lettuceMat);
      lettuce.rotation.x = Math.PI / 2;
      lettuce.scale.set(1.1, 1.1, 0.4);
      createdLayers.push({ mesh: lettuce, baseY: 0.65, name: "Crisp Batavia Lettuce" });

      // 7. Top Crown Bun with Sesame
      const topBunGroup = new THREE.Group();
      const crownGeo = new THREE.SphereGeometry(1.28, 36, 24, 0, Math.PI * 2, 0, Math.PI * 0.48);
      const crownMat = new THREE.MeshStandardMaterial({
        color: 0xc87d2b,
        roughness: 0.65,
        metalness: 0.05
      });
      const crown = new THREE.Mesh(crownGeo, crownMat);
      crown.castShadow = true;
      topBunGroup.add(crown);

      // Sesame seeds
      const sesameGeo = new THREE.SphereGeometry(0.025, 8, 8);
      const sesameMat = new THREE.MeshStandardMaterial({ color: 0xfffdd0, roughness: 0.5 });
      for (let i = 0; i < 48; i++) {
        const seed = new THREE.Mesh(sesameGeo, sesameMat);
        const phi = Math.random() * Math.PI * 0.35;
        const theta = Math.random() * Math.PI * 2;
        seed.position.set(
          1.27 * Math.sin(phi) * Math.cos(theta),
          1.27 * Math.cos(phi) - 0.08,
          1.27 * Math.sin(phi) * Math.sin(theta)
        );
        seed.scale.set(1, 1.8, 0.8);
        seed.lookAt(0, 0, 0);
        topBunGroup.add(seed);
      }
      createdLayers.push({ mesh: topBunGroup, baseY: 1.1, name: "Brioche Sesame Crown" });

    } else if (dish.id === "pizza") {
      // Wood-fired pizza layers
      const crustGeo = new THREE.TorusGeometry(1.6, 0.22, 20, 48);
      const crustMat = new THREE.MeshStandardMaterial({
        color: 0xd29054,
        roughness: 0.8,
        metalness: 0.05
      });
      const crust = new THREE.Mesh(crustGeo, crustMat);
      crust.rotation.x = Math.PI / 2;
      const baseDisk = new THREE.Mesh(
        new THREE.CylinderGeometry(1.6, 1.6, 0.08, 48),
        crustMat
      );
      const crustGroup = new THREE.Group();
      crustGroup.add(crust, baseDisk);
      createdLayers.push({ mesh: crustGroup, baseY: -0.9, name: "48H Sourdough Crust" });

      const sauceGeo = new THREE.CylinderGeometry(1.48, 1.48, 0.06, 40);
      const sauceMat = new THREE.MeshStandardMaterial({
        color: 0xb91c1c,
        roughness: 0.3,
        metalness: 0.1
      });
      const sauce = new THREE.Mesh(sauceGeo, sauceMat);
      createdLayers.push({ mesh: sauce, baseY: -0.55, name: "San Marzano D.O.P. Sauce" });

      const cheeseGeo = new THREE.CylinderGeometry(1.42, 1.42, 0.08, 40);
      const cheeseMat = new THREE.MeshStandardMaterial({
        color: 0xfffbeb,
        roughness: 0.45,
        metalness: 0.05
      });
      const cheese = new THREE.Mesh(cheeseGeo, cheeseMat);
      createdLayers.push({ mesh: cheese, baseY: -0.2, name: "Fior di Latte Mozzarella" });

      // Pepperoni slices
      const pepGroup = new THREE.Group();
      const pepMat = new THREE.MeshStandardMaterial({
        color: 0x991b1b,
        roughness: 0.4,
        metalness: 0.15
      });
      for (let i = 0; i < 9; i++) {
        const rad = 0.5 + Math.random() * 0.7;
        const ang = (i * Math.PI * 2) / 9 + Math.random() * 0.2;
        const pep = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.04, 20), pepMat);
        pep.position.set(Math.cos(ang) * rad, 0, Math.sin(ang) * rad);
        pepGroup.add(pep);
      }
      createdLayers.push({ mesh: pepGroup, baseY: 0.25, name: "Artisanal Pepperoni" });

      // Basil Leaves & Olives
      const basilGroup = new THREE.Group();
      const basilMat = new THREE.MeshStandardMaterial({
        color: 0x15803d,
        roughness: 0.4,
        side: THREE.DoubleSide
      });
      for (let i = 0; i < 6; i++) {
        const leaf = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.5), basilMat);
        leaf.rotation.x = -Math.PI / 2 + (Math.random() - 0.5) * 0.4;
        leaf.rotation.z = Math.random() * Math.PI * 2;
        const rad = 0.4 + Math.random() * 0.6;
        const ang = (i * Math.PI * 2) / 6;
        leaf.position.set(Math.cos(ang) * rad, 0, Math.sin(ang) * rad);
        basilGroup.add(leaf);
      }
      createdLayers.push({ mesh: basilGroup, baseY: 0.75, name: "Genovese Basil & Olives" });

    } else if (dish.id === "biryani") {
      // Biryani Handi
      const handiGeo = new THREE.CylinderGeometry(1.6, 1.2, 0.8, 36, 1, true);
      const handiMat = new THREE.MeshStandardMaterial({
        color: 0xb45309,
        roughness: 0.35,
        metalness: 0.85
      });
      const handi = new THREE.Mesh(handiGeo, handiMat);
      createdLayers.push({ mesh: handi, baseY: -1.1, name: "Hammered Brass Handi Pot" });

      // Spiced Chicken Thighs
      const chickenGroup = new THREE.Group();
      const chickMat = new THREE.MeshStandardMaterial({
        color: 0x78350f,
        roughness: 0.75,
        metalness: 0.1
      });
      const drum1 = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.5, 0.9, 16), chickMat);
      drum1.rotation.z = Math.PI / 4;
      drum1.position.set(-0.4, 0, 0);
      const drum2 = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.45, 0.8, 16), chickMat);
      drum2.rotation.z = -Math.PI / 3;
      drum2.position.set(0.4, 0, 0);
      chickenGroup.add(drum1, drum2);
      createdLayers.push({ mesh: chickenGroup, baseY: -0.6, name: "Dum Braised Chicken Pieces" });

      // Fluffy Basmati Rice Grains Mound
      const riceGeo = new THREE.CylinderGeometry(1.45, 1.4, 0.45, 36);
      const riceMat = new THREE.MeshStandardMaterial({
        color: 0xfef9c3,
        roughness: 0.9,
        metalness: 0.05
      });
      const rice = new THREE.Mesh(riceGeo, riceMat);
      createdLayers.push({ mesh: rice, baseY: -0.1, name: "Saffron Basmati Grain Layer" });

      // Whole Spices (Star Anise, Cinnamon, Cardamom)
      const spiceGroup = new THREE.Group();
      const spiceMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.8 });
      for (let i = 0; i < 4; i++) {
        const star = new THREE.Mesh(new THREE.TorusGeometry(0.18, 0.05, 8, 8), spiceMat);
        star.position.set((Math.random() - 0.5) * 1.6, 0, (Math.random() - 0.5) * 1.6);
        star.rotation.x = Math.PI / 2;
        spiceGroup.add(star);
      }
      createdLayers.push({ mesh: spiceGroup, baseY: 0.4, name: "Whole Malabar Spices" });

      // Crispy Caramelized Birista & Fresh Mint
      const biristaGroup = new THREE.Group();
      const biristaMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.6 });
      const mintMat = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.4 });
      for (let i = 0; i < 16; i++) {
        const flake = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.03, 0.04), biristaMat);
        flake.position.set((Math.random() - 0.5) * 1.8, 0, (Math.random() - 0.5) * 1.8);
        flake.rotation.y = Math.random() * Math.PI;
        biristaGroup.add(flake);
      }
      for (let i = 0; i < 5; i++) {
        const mint = new THREE.Mesh(new THREE.PlaneGeometry(0.2, 0.25), mintMat);
        mint.position.set((Math.random() - 0.5) * 1.4, 0.05, (Math.random() - 0.5) * 1.4);
        mint.rotation.x = -Math.PI / 2;
        biristaGroup.add(mint);
      }
      createdLayers.push({ mesh: biristaGroup, baseY: 0.85, name: "Golden Birista Onions & Mint" });

    } else {
      // Pasta
      const bowlGeo = new THREE.CylinderGeometry(1.6, 0.9, 0.6, 36);
      const bowlMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.4,
        metalness: 0.1
      });
      const bowl = new THREE.Mesh(bowlGeo, bowlMat);
      createdLayers.push({ mesh: bowl, baseY: -1.0, name: "Matte Slate Ceramic Bowl" });

      // Fettuccine Pasta Nest
      const pastaGroup = new THREE.Group();
      const pastaMat = new THREE.MeshStandardMaterial({
        color: 0xfef08a,
        roughness: 0.6,
        metalness: 0.05
      });
      for (let i = 0; i < 6; i++) {
        const ring = new THREE.Mesh(new THREE.TorusGeometry(0.75 + i * 0.12, 0.12, 12, 32), pastaMat);
        ring.rotation.x = Math.PI / 2 + (Math.random() - 0.5) * 0.2;
        ring.rotation.y = (Math.random() - 0.5) * 0.2;
        ring.position.y = i * 0.1;
        pastaGroup.add(ring);
      }
      createdLayers.push({ mesh: pastaGroup, baseY: -0.45, name: "Bronze-Cut Fettuccine Nest" });

      // Truffle Alfredo Cream
      const sauceGeo = new THREE.CylinderGeometry(1.3, 1.25, 0.18, 32);
      const sauceMat = new THREE.MeshStandardMaterial({
        color: 0xffedd5,
        roughness: 0.25,
        metalness: 0.1
      });
      const sauce = new THREE.Mesh(sauceGeo, sauceMat);
      createdLayers.push({ mesh: sauce, baseY: 0.05, name: "Truffle Alfredo Velouté" });

      // Parmigiano Snow
      const cheeseGroup = new THREE.Group();
      const cheeseMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
      for (let i = 0; i < 40; i++) {
        const flake = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.02, 0.04), cheeseMat);
        flake.position.set((Math.random() - 0.5) * 1.5, 0, (Math.random() - 0.5) * 1.5);
        cheeseGroup.add(flake);
      }
      createdLayers.push({ mesh: cheeseGroup, baseY: 0.5, name: "24-Month Parmigiano Flakes" });

      // Basil Bouquet
      const basilGroup = new THREE.Group();
      const leafMat = new THREE.MeshStandardMaterial({
        color: 0x15803d,
        roughness: 0.4,
        side: THREE.DoubleSide
      });
      const leaf1 = new THREE.Mesh(new THREE.PlaneGeometry(0.4, 0.5), leafMat);
      leaf1.rotation.set(-Math.PI / 3, 0.2, 0.3);
      const leaf2 = new THREE.Mesh(new THREE.PlaneGeometry(0.35, 0.45), leafMat);
      leaf2.rotation.set(-Math.PI / 3, -0.4, -0.2);
      basilGroup.add(leaf1, leaf2);
      createdLayers.push({ mesh: basilGroup, baseY: 0.95, name: "Fresh Herb Bouquet" });
    }

    createdLayers.forEach((layer) => {
      rootGroup.add(layer.mesh);
    });
    meshesRef.current = createdLayers;

    // 8. Floating Steam & Dust Particles
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4.0;
      positions[i + 1] = Math.random() * 3.5 - 1.0;
      positions[i + 2] = (Math.random() - 0.5) * 4.0;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.05,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 9. Interactive Drag Orbit
    const handleMouseDown = (e) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current || !rootGroup) return;
      const deltaX = e.clientX - previousMousePositionRef.current.x;
      const deltaY = e.clientY - previousMousePositionRef.current.y;

      rootGroup.rotation.y += deltaX * 0.008;
      rootGroup.rotation.x += deltaY * 0.008;
      rootGroup.rotation.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rootGroup.rotation.x));

      previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    const handleWheel = (e) => {
      e.preventDefault();
      camera.position.z += e.deltaY * 0.003;
      camera.position.z = Math.max(2.5, Math.min(8.0, camera.position.z));
    };

    container.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("wheel", handleWheel, { passive: false });

    // Touch support for mobile/tablets
    let touchStart = { x: 0, y: 0 };
    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const handleTouchMove = (e) => {
      if (e.touches.length === 1 && rootGroup) {
        const deltaX = e.touches[0].clientX - touchStart.x;
        const deltaY = e.touches[0].clientY - touchStart.y;
        rootGroup.rotation.y += deltaX * 0.008;
        rootGroup.rotation.x += deltaY * 0.008;
        touchStart = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    // 10. Animation Loop
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (autoRotate && !isDraggingRef.current && rootGroup) {
        rootGroup.rotation.y += delta * 0.35;
      }

      // Animate particles rising
      if (particlesRef.current) {
        const pos = particlesRef.current.geometry.attributes.position.array;
        for (let i = 1; i < pos.length; i += 3) {
          pos[i] += delta * 0.4;
          if (pos[i] > 2.5) pos[i] = -1.2;
        }
        particlesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("wheel", handleWheel);
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      renderer.dispose();
    };
  }, [dish.id]);

  // Handle Explode Slider (separating layers along Y-axis)
  useEffect(() => {
    if (!meshesRef.current) return;
    const layers = meshesRef.current;
    layers.forEach((layer, idx) => {
      // spread outwards based on layer index and explodeFactor
      const centerIdx = (layers.length - 1) / 2;
      const offset = (idx - centerIdx) * (explodeFactor * 1.8);
      layer.mesh.position.y = layer.baseY + offset;
    });
  }, [explodeFactor]);

  // Handle Lighting Switch
  useEffect(() => {
    const lights = lightsRef.current;
    if (!lights.mainLight) return;

    if (lightingMode === "amber") {
      lights.mainLight.color.setHex(0xffecd2);
      lights.rimLight.color.setHex(0xf59e0b);
      lights.fillLight.color.setHex(0xea580c);
    } else if (lightingMode === "cyber") {
      lights.mainLight.color.setHex(0x38bdf8);
      lights.rimLight.color.setHex(0xa855f7);
      lights.fillLight.color.setHex(0x06b6d4);
    } else {
      // Studio White
      lights.mainLight.color.setHex(0xffffff);
      lights.rimLight.color.setHex(0xfffbeb);
      lights.fillLight.color.setHex(0x94a3b8);
    }
  }, [lightingMode]);

  const handleResetCamera = () => {
    if (objectGroupRef.current) {
      objectGroupRef.current.rotation.set(0.2, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(0, 1.2, 5.0);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 md:p-8 animate-fade-in">
      <div className="relative w-full max-w-6xl h-[90vh] bg-gradient-to-b from-[#0f141d] to-[#08090d] border border-amber-500/25 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row">
        
        {/* Top Control Bar (Mobile & Desktop) */}
        <div className="absolute top-4 left-6 right-6 z-20 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <span className="px-3 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-full text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              Real-Time Three.js 3D Studio
            </span>
            <span className="hidden sm:inline-block text-white/60 text-xs font-medium">
              360° Interactive Orbit & Deconstruction
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors pointer-events-auto backdrop-blur-md"
            title="Close 3D Studio"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D WebGL Canvas Viewport */}
        <div className="relative flex-1 h-full min-h-[350px]">
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Orbit Helper Tooltip */}
          <div className="absolute bottom-6 left-6 z-10 hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/50 border border-white/10 rounded-full text-xs text-white/70 backdrop-blur-md pointer-events-none">
            <RotateCcw className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
            <span>Click & Drag to rotate • Scroll to zoom</span>
          </div>

          {/* Quick HUD controls overlay */}
          <div className="absolute bottom-6 right-6 z-10 flex items-center gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-2.5 rounded-full backdrop-blur-md text-xs font-medium flex items-center gap-1.5 transition-all ${
                autoRotate
                  ? "bg-amber-500 text-black shadow-lg shadow-amber-500/30"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
              title="Toggle Auto-Rotation"
            >
              {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>

            <button
              onClick={handleResetCamera}
              className="p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors"
              title="Reset Camera View"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Sidebar Controls & Deconstruction Inspector */}
        <div className="w-full md:w-96 border-t md:border-t-0 md:border-l border-white/10 bg-[#0c1017]/80 backdrop-blur-xl p-6 flex flex-col justify-between overflow-y-auto z-10">
          <div>
            <div className="mb-4">
              <span className="text-amber-400 text-xs uppercase tracking-widest font-semibold">
                {dish.titlePrefix}
              </span>
              <h2 className="text-2xl font-bold font-syne text-white mt-1">
                {dish.name}
              </h2>
              <p className="text-white/60 text-xs mt-1 leading-relaxed">
                {dish.tagline}
              </p>
            </div>

            {/* Exploded Layers Slider */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-semibold text-white/90 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-amber-400" />
                  Deconstruct Layers
                </span>
                <span className="text-xs font-mono font-bold text-amber-400">
                  {Math.round(explodeFactor * 100)}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodeFactor}
                onChange={(e) => setExplodeFactor(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1.5 font-mono">
                <span>0% Assembled</span>
                <span>50% Exploded</span>
                <span>100% Deconstructed</span>
              </div>
            </div>

            {/* Studio Lighting Mood */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
              <span className="text-xs font-semibold text-white/90 flex items-center gap-1.5 mb-2.5">
                <Sun className="w-4 h-4 text-amber-400" />
                Studio Illumination
              </span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "amber", label: "Chef Amber", color: "from-amber-600 to-amber-400" },
                  { id: "cyber", label: "Cyber Noir", color: "from-sky-500 to-purple-500" },
                  { id: "studio", label: "Pure Light", color: "from-slate-200 to-white" }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setLightingMode(m.id)}
                    className={`py-1.5 px-2 rounded-xl text-xs font-medium border transition-all ${
                      lightingMode === m.id
                        ? "border-amber-400 bg-amber-500/20 text-white"
                        : "border-white/10 bg-white/5 text-white/60 hover:text-white"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Dissected Ingredient Stack */}
            <div className="mb-4">
              <span className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-2">
                Architectural Ingredient Stack ({dish.layers3D.length} Layers)
              </span>
              <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                {dish.layers3D.map((layer, idx) => (
                  <div
                    key={idx}
                    onClick={() => setSelectedLayerIndex(idx)}
                    className={`p-2 rounded-xl border text-xs cursor-pointer transition-all flex items-center justify-between ${
                      selectedLayerIndex === idx
                        ? "bg-amber-500/20 border-amber-400 text-white"
                        : "bg-white/5 border-white/5 text-white/70 hover:bg-white/10"
                    }`}
                  >
                    <span className="font-medium">{layer.name}</span>
                    <span className="text-[10px] text-amber-400/80 font-mono">
                      L-{idx + 1}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Order Action */}
          <div className="pt-4 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-white/50 block">
                  Artisanal Price
                </span>
                <span className="text-2xl font-bold font-syne text-amber-400">
                  ${dish.price.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-white/70">
                <Award className="w-4 h-4 text-emerald-400" />
                <span>{dish.rating}★ ({dish.reviewsCount})</span>
              </div>
            </div>

            <button
              onClick={() => {
                onAddToCart(dish);
                onClose();
              }}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold font-syne rounded-2xl shadow-lg shadow-amber-500/30 transition-all transform active:scale-95"
            >
              Order This Masterpiece (${dish.price.toFixed(2)})
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
