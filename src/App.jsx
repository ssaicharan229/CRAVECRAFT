import React, { useState, useEffect } from "react";
import { DISHES } from "./data/dishesData";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import CinematicScene from "./components/CinematicScene";
import AnimationTechniquesSection from "./components/AnimationTechniquesSection";
import CraftPhilosophy from "./components/CraftPhilosophy";
import MenuCatalogue from "./components/MenuCatalogue";
import Footer from "./components/Footer";
import ThreeDStudio from "./components/ThreeDStudio";
import CinemaModal from "./components/CinemaModal";
import DishCustomizerModal from "./components/DishCustomizerModal";
import CartDrawer from "./components/CartDrawer";
import CheckoutModal from "./components/CheckoutModal";
import LaptopDeskStudio from "./components/LaptopDeskStudio";

export default function App() {
  const [activeDishId, setActiveDishId] = useState(DISHES[0].id);
  const [active3DStudioDish, setActive3DStudioDish] = useState(null);
  const [activeCinemaDish, setActiveCinemaDish] = useState(null);
  const [activeCustomizerDish, setActiveCustomizerDish] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutOrderData, setCheckoutOrderData] = useState(null);
  const [isDeskMode, setIsDeskMode] = useState(false); // Toggle between Direct Web and 3D Laptop on Wooden Desk

  // Track active dish on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.45;
      for (const dish of DISHES) {
        const el = document.getElementById(`dish-${dish.id}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveDishId(dish.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Cart actions
  const handleAddToCart = (item) => {
    if (!item.dishId) {
      const existingIdx = cartItems.findIndex((ci) => ci.dishId === item.id && !ci.portion);
      if (existingIdx >= 0) {
        const updated = [...cartItems];
        updated[existingIdx].quantity = (updated[existingIdx].quantity || 1) + 1;
        setCartItems(updated);
      } else {
        setCartItems([
          ...cartItems,
          {
            dishId: item.id,
            name: item.name,
            unitPrice: item.price,
            totalPrice: item.price,
            quantity: 1,
            heroImage: item.heroImage
          }
        ]);
      }
    } else {
      setCartItems([...cartItems, item]);
    }
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (idx, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(idx);
      return;
    }
    const updated = [...cartItems];
    updated[idx].quantity = newQty;
    updated[idx].totalPrice = updated[idx].unitPrice * newQty;
    setCartItems(updated);
  };

  const handleRemoveItem = (idx) => {
    setCartItems(cartItems.filter((_, i) => i !== idx));
  };

  const handleProceedToCheckout = (orderData) => {
    setIsCartOpen(false);
    setCheckoutOrderData(orderData);
  };

  const handleOrderCompleted = () => {
    setCartItems([]);
    setCheckoutOrderData(null);
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);

  const websiteContent = (
    <div className="min-h-screen bg-[#fdfbf7] text-[#1c1917] selection:bg-[#d97706] selection:text-white">
      
      {/* 1. Header Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        activeDishId={activeDishId}
        dishes={DISHES}
        isDeskMode={isDeskMode}
        onToggleDeskMode={() => setIsDeskMode(!isDeskMode)}
      />

      {/* 2. Full-Screen Editorial Hero */}
      <HeroSection
        dishes={DISHES}
        onSelectDish={(id) => {
          const el = document.getElementById(`dish-${id}`);
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onOpen3DStudio={(dish) => setActive3DStudioDish(dish)}
        onToggleDeskMode={() => setIsDeskMode(!isDeskMode)}
      />

      {/* 3. The 4 Cinematic 3D Scroll Transformation Scenes */}
      <main>
        {DISHES.map((dish, idx) => (
          <CinematicScene
            key={dish.id}
            dish={dish}
            index={idx}
            onOpen3DStudio={(d) => setActive3DStudioDish(d)}
            onOpenCinema={(d) => setActiveCinemaDish(d)}
            onOpenCustomizer={(d) => setActiveCustomizerDish(d)}
            onAddToCart={handleAddToCart}
          />
        ))}
      </main>

      {/* 4. Animation Names & Software Specification (Requested Reference Style) */}
      <AnimationTechniquesSection />

      {/* 5. BiteVerse Gastronomic Philosophy */}
      <CraftPhilosophy />

      {/* 5. Complete Menu Catalogue with Search & Filter */}
      <MenuCatalogue
        dishes={DISHES}
        onOpen3DStudio={(d) => setActive3DStudioDish(d)}
        onOpenCustomizer={(d) => setActiveCustomizerDish(d)}
        onAddToCart={handleAddToCart}
      />

      {/* 6. Footer */}
      <Footer />

      {/* ================= MODALS & DRAWERS ================= */}

      {/* A. Real-Time Three.js 3D Studio & Exploded Layer View */}
      {active3DStudioDish && (
        <ThreeDStudio
          dish={active3DStudioDish}
          onClose={() => setActive3DStudioDish(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* B. 4K Masterpiece Cinema Theater */}
      {activeCinemaDish && (
        <CinemaModal
          dish={activeCinemaDish}
          onClose={() => setActiveCinemaDish(null)}
        />
      )}

      {/* C. Dish Customizer Modal */}
      {activeCustomizerDish && (
        <DishCustomizerModal
          dish={activeCustomizerDish}
          onClose={() => setActiveCustomizerDish(null)}
          onAddToCart={handleAddToCart}
        />
      )}

      {/* D. Slide-Over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* E. Interactive Checkout Modal & Live Kitchen Tracker */}
      {checkoutOrderData && (
        <CheckoutModal
          orderData={checkoutOrderData}
          onClose={() => setCheckoutOrderData(null)}
          onOrderCompleted={handleOrderCompleted}
        />
      )}

    </div>
  );

  return (
    <LaptopDeskStudio
      isDeskMode={isDeskMode}
      onToggleDeskMode={() => setIsDeskMode(!isDeskMode)}
    >
      {websiteContent}
    </LaptopDeskStudio>
  );
}
