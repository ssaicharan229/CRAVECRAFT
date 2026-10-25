import React, { useState } from "react";
import { X, CheckCircle2, Clock, MapPin, CreditCard, ShieldCheck, Truck, Sparkles, ChefHat } from "lucide-react";
import confetti from "canvas-confetti";
import { playClickSound, playSuccessChime } from "../utils/audioAmbiance";

export default function CheckoutModal({ orderData, onClose, onOrderCompleted }) {
  const [step, setStep] = useState("form"); // 'form' | 'tracking'
  const [name, setName] = useState("Alexander Vance");
  const [address, setAddress] = useState("450 Lexington Ave, Penthouse 4B, New York, NY");
  const [phone, setPhone] = useState("+1 (212) 555-0198");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [timeSlot, setTimeSlot] = useState("priority");
  const [trackingStage, setTrackingStage] = useState(1);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    playSuccessChime();

    // Trigger celebratory confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#f59e0b", "#ea580c", "#10b981", "#ffffff"]
    });

    setStep("tracking");

    // Advance order tracker dynamically
    setTimeout(() => setTrackingStage(2), 2500);
    setTimeout(() => setTrackingStage(3), 6000);
  };

  const handleDone = () => {
    playClickSound();
    onOrderCompleted();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-xl p-4 animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0f141d] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold font-syne text-white">
                {step === "form" ? "Artisanal Dispatch Checkout" : "Live Kitchen Tracking"}
              </h3>
              <span className="text-xs text-white/50">
                {step === "form" ? "Direct from CraveCraft Kitchen" : "Order #CC-98241 Confirmed"}
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Mode */}
        {step === "form" ? (
          <form onSubmit={handlePlaceOrder} className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            
            {/* Delivery Details */}
            <div>
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-2">
                Delivery Destination
              </label>
              <div className="space-y-2">
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Recipient Full Name"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Street Address, Apt / Suite"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
                />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Contact Mobile Number"
                  className="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-xs text-white placeholder-white/30 focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            {/* Time Slot */}
            <div>
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-2">
                Dispatch Schedule
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: "priority", label: "Priority Hot Dispatch", desc: "20 - 30 mins" },
                  { id: "standard", label: "Evening Feast Slot", desc: "6:30 PM — 7:00 PM" }
                ].map((slot) => (
                  <button
                    type="button"
                    key={slot.id}
                    onClick={() => setTimeSlot(slot.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      timeSlot === slot.id
                        ? "bg-amber-500/20 border-amber-400 text-white"
                        : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                    }`}
                  >
                    <span className="text-xs font-bold block">{slot.label}</span>
                    <span className="text-[11px] text-amber-400 font-mono">{slot.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <label className="text-xs font-semibold text-white/80 uppercase tracking-wider block mb-2">
                Select Payment Method
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: "card", label: "Credit Card (Demo)" },
                  { id: "apple", label: "Apple Pay" },
                  { id: "cod", label: "Cash on Delivery" }
                ].map((pay) => (
                  <button
                    type="button"
                    key={pay.id}
                    onClick={() => setPaymentMethod(pay.id)}
                    className={`p-2.5 rounded-xl border text-xs font-semibold transition-all text-center ${
                      paymentMethod === pay.id
                        ? "bg-amber-500 text-slate-950 border-amber-400 font-bold"
                        : "bg-white/5 border-white/10 text-white/70 hover:text-white"
                    }`}
                  >
                    {pay.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Total Summary */}
            <div className="p-4 bg-white/[0.03] border border-white/10 rounded-2xl flex items-center justify-between">
              <div>
                <span className="text-[10px] text-white/40 uppercase tracking-wider block">
                  Amount Due (Sample Checkout)
                </span>
                <span className="text-xl font-bold font-syne text-amber-400">
                  ${orderData.grandTotal.toFixed(2)}
                </span>
              </div>
              <span className="text-[11px] text-white/50 font-mono">
                {orderData.items.length} dishes
              </span>
            </div>

            {/* Submit CTA */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold font-syne text-sm rounded-2xl shadow-xl shadow-amber-500/25 transition-all transform active:scale-95"
            >
              Confirm Order & Launch Kitchen (${orderData.grandTotal.toFixed(2)})
            </button>
          </form>
        ) : (
          /* Live Order Tracking Mode */
          <div className="p-8 space-y-8 text-center animate-fade-in">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-mono text-amber-400 uppercase tracking-widest block font-bold mb-1">
                Order Placed Successfully
              </span>
              <h3 className="text-2xl font-bold font-syne text-white">
                CraveCraft Kitchen is in Action
              </h3>
              <p className="text-xs text-white/60 mt-1 max-w-sm mx-auto">
                Your order is registered. Ingredients are being prepped, seared, and assembled in accordance with chef specifications.
              </p>
            </div>

            {/* 3-Stage Progress Timeline */}
            <div className="space-y-4 max-w-md mx-auto text-left">
              {[
                {
                  stage: 1,
                  title: "Order Verified & Ticket Sent",
                  desc: "Station 4 - Cast Iron & Wood Oven",
                  icon: Sparkles
                },
                {
                  stage: 2,
                  title: "Executive Chef Assembling",
                  desc: "Layering brioche, searing Angus & infusing truffle",
                  icon: ChefHat
                },
                {
                  stage: 3,
                  title: "Hot Thermal Courier En Route",
                  desc: "Estimated arrival in 22 minutes",
                  icon: Truck
                }
              ].map((s) => {
                const Icon = s.icon;
                const isComplete = trackingStage >= s.stage;
                const isCurrent = trackingStage === s.stage;

                return (
                  <div
                    key={s.stage}
                    className={`p-3.5 rounded-2xl border transition-all flex items-center gap-3.5 ${
                      isCurrent
                        ? "bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10"
                        : isComplete
                        ? "bg-white/5 border-white/10 text-white/80"
                        : "bg-white/[0.02] border-white/5 text-white/30"
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isComplete ? "bg-amber-500 text-slate-950 font-bold" : "bg-white/10 text-white/40"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold font-syne">{s.title}</h4>
                      <p className="text-[11px] text-white/50">{s.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={handleDone}
              className="py-3 px-8 bg-white/10 hover:bg-white/20 text-white font-syne font-semibold rounded-2xl transition-colors text-xs"
            >
              Done & Return to CraveCraft
            </button>

          </div>
        )}

      </div>
    </div>
  );
}
