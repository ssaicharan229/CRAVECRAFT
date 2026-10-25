import React, { useState } from "react";
import { X, Trash2, Plus, Minus, ArrowRight, Tag, ShoppingBag, Sparkles } from "lucide-react";
import { playClickSound } from "../utils/audioAmbiance";

export default function CartDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout
}) {
  const [promoCode, setPromoCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState(null);

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    playClickSound();
    const clean = promoCode.trim().toUpperCase();
    if (clean === "CRAVE3D" || clean === "CRAVE15") {
      setDiscountPercent(15);
      setPromoMessage({ success: true, text: "15% VIP 3D Craft Discount Applied!" });
    } else if (clean === "CHEF20") {
      setDiscountPercent(20);
      setPromoMessage({ success: true, text: "20% Master Chef Discount Applied!" });
    } else {
      setPromoMessage({ success: false, text: "Invalid promo code. Try 'CRAVE3D'" });
    }
  };

  const subtotal = items.reduce((sum, item) => sum + (item.totalPrice || item.price * (item.quantity || 1)), 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 50 || items.length === 0 ? 0 : 3.99;
  const tax = (subtotal - discountAmount) * 0.08875;
  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee + tax);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d1118] border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold font-syne text-white">Your Crave Cart</h3>
                <span className="text-xs text-white/50">{items.length} Culinary Item(s)</span>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-white/30 mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="text-base font-bold font-syne text-white mb-1">
                  Your Cart is Empty
                </h4>
                <p className="text-xs text-white/50 max-w-xs mb-6">
                  Explore our 3D interactive dishes and customize your first gourmet masterpiece.
                </p>
                <button
                  onClick={onClose}
                  className="py-2.5 px-6 bg-amber-500 text-slate-950 font-bold font-syne text-xs rounded-xl shadow-lg shadow-amber-500/20"
                >
                  Explore Dishes
                </button>
              </div>
            ) : (
              items.map((item, idx) => {
                const itemTotal = item.totalPrice || item.price * (item.quantity || 1);
                return (
                  <div
                    key={idx}
                    className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex flex-col gap-3 relative group"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-14 h-14 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                        <img
                          src={item.heroImage}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <h4 className="font-syne font-bold text-white text-sm">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => onRemoveItem(idx)}
                            className="text-white/30 hover:text-rose-400 transition-colors p-1"
                            title="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {item.portion && (
                          <span className="text-[11px] text-amber-400 font-medium block">
                            {item.portion.name}
                          </span>
                        )}

                        {item.addons && item.addons.length > 0 && (
                          <div className="text-[10px] text-white/50 mt-1 flex flex-wrap gap-1">
                            {item.addons.map((a, i) => (
                              <span key={i} className="bg-white/5 px-1.5 py-0.5 rounded">
                                +{a.name}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.specialInstructions && (
                          <p className="text-[10px] text-white/40 italic mt-1">
                            Note: "{item.specialInstructions}"
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl p-1">
                        <button
                          onClick={() => onUpdateQuantity(idx, (item.quantity || 1) - 1)}
                          className="p-1 text-white/60 hover:text-white rounded transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-5 text-center text-xs font-mono font-bold text-white">
                          {item.quantity || 1}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(idx, (item.quantity || 1) + 1)}
                          className="p-1 text-white/60 hover:text-white rounded transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-syne font-bold text-amber-400 text-sm">
                        ${itemTotal.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer & Checkout Total */}
          {items.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-[#0a0d14] space-y-4">
              
              {/* Promo Code Input */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code (try 'CRAVE3D')"
                    className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400 uppercase font-mono"
                  />
                </div>
                <button
                  onClick={handleApplyPromo}
                  className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl transition-colors font-syne"
                >
                  Apply
                </button>
              </div>

              {promoMessage && (
                <p
                  className={`text-[11px] font-medium ${
                    promoMessage.success ? "text-emerald-400" : "text-rose-400"
                  }`}
                >
                  {promoMessage.text}
                </p>
              )}

              {/* Order Breakdown */}
              <div className="space-y-1.5 text-xs text-white/70">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-white">${subtotal.toFixed(2)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>VIP Promo Discount ({discountPercent}%)</span>
                    <span className="font-mono">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Courier Delivery</span>
                  <span className="font-mono text-white">
                    {deliveryFee === 0 ? "FREE (Order > $50)" : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes (8.875%)</span>
                  <span className="font-mono text-white">${tax.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-sm font-bold font-syne text-white pt-2 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span className="font-syne text-amber-400 text-base">
                    ${grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={() => {
                  playClickSound();
                  onProceedToCheckout({
                    items,
                    subtotal,
                    discountAmount,
                    deliveryFee,
                    tax,
                    grandTotal
                  });
                }}
                className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold font-syne text-sm rounded-2xl shadow-xl shadow-amber-500/25 transition-all transform active:scale-95 flex items-center justify-center gap-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
