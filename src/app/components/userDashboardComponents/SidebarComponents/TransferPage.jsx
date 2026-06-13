"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun, Globe } from "lucide-react";
import { useRouter } from "next/navigation";

const TransferPage = () => {
  const router = useRouter();
  const [trType, setTrType] = useState("goal2goal");
  const [selFrom, setSelFrom] = useState("from-g1");
  const [selTo, setSelTo] = useState(null);
  const [recipientFound, setRecipientFound] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhoneText, setRecipientPhoneText] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");

  const goalData = {
    "from-g1": { name: "🏠 Home Purchase Dream", balance: 38000, emoji: "🏠" },
    "from-g2": { name: "📚 Children's Education", balance: 12500, emoji: "📚" },
    "from-g3": { name: "🚗 Car Purchase", balance: 8400, emoji: "🚗" },
  };

  const toGoalData = {
    "to-g1": "🏠 Home Purchase Dream",
    "to-g2": "📚 Children's Education",
    "to-g3": "🚗 Car Purchase",
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const selectType = (type) => {
    setTrType(type);
    setActiveStep(1);
  };

  const selectFrom = (id) => {
    setSelFrom(id);
    setActiveStep(2);
  };

  const selectTo = (id) => {
    const fromKey = selFrom.replace("from-", "");
    const toKey = id.replace("to-", "");
    if (fromKey === toKey) {
      showToast("⚠️ Cannot transfer to the same goal");
      return;
    }
    setSelTo(id);
    setActiveStep(3);
  };

  const searchRecipient = () => {
    if (recipientPhone.length < 11) {
      showToast("⚠️ Please enter a valid phone number");
      return;
    }
    setRecipientName("Rahim Uddin");
    setRecipientPhoneText(recipientPhone);
    setRecipientFound(true);
    setActiveStep(3);
    showToast("✅ User found!");
  };

  const setPresetAmount = (amt, btn) => {
    setAmount(amt);
    setActiveStep(4);
  };

  const updateSummary = () => {
    if (amount > 0) setActiveStep(4);
  };

  const submitTransfer = () => {
    const amt = parseFloat(amount) || 0;
    if (amt < 10) {
      showToast("⚠️ Minimum transfer amount is ৳10");
      return;
    }

    if (trType === "goal2goal") {
      if (!selTo) {
        showToast("⚠️ Please select destination goal");
        return;
      }
      const balance = goalData[selFrom].balance;
      if (amt > balance) {
        showToast("⚠️ Insufficient balance");
        return;
      }
    } else {
      if (!recipientFound) {
        showToast("⚠️ Please search for a user first");
        return;
      }
    }

    setShowModal(true);
  };

  const resetTransfer = () => {
    setShowModal(false);
    setAmount("");
    setNote("");
    setRecipientPhone("");
    setRecipientFound(false);
    setSelTo(null);
    setActiveStep(1);
  };

  const getAmountDisplay = () => {
    const amt = parseFloat(amount) || 0;
    return amt > 0 ? `৳${amt.toLocaleString("en-IN")}` : "৳0";
  };

  const getSummaryTo = () => {
    if (trType === "goal2goal" && selTo) {
      return toGoalData[selTo];
    } else if (trType === "user2user" && recipientFound) {
      return `👤 ${recipientName} (${recipientPhoneText})`;
    }
    return "—";
  };

  const getSummaryFrom = () => {
    if (trType === "goal2goal") {
      return goalData[selFrom]?.name || "—";
    }
    return "—";
  };

  const getTypeLabel = () => {
    if (trType === "goal2goal")
      return lang === "bn" ? "🎯 লক্ষ্য → লক্ষ্য" : "🎯 Goal → Goal";
    return lang === "bn" ? "👤 অন্য ব্যবহারকারী" : "👤 Another User";
  };

  const getTypeInfo = () => {
    if (trType === "goal2goal") {
      return lang === "bn"
        ? "লক্ষ্য থেকে লক্ষ্যে টাকা সরান — সম্পূর্ণ বিনামূল্যে এবং তাৎক্ষণিক।"
        : "Move money between your goals — completely free and instant.";
    }
    return lang === "bn"
      ? "অন্য Amanah ব্যবহারকারীকে সরাসরি টাকা পাঠান।"
      : "Send money directly to another Amanah user.";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary-light px-5 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1">🔄 Transfer</h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-2 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
      </div>

      {/* Step Progress */}
      <div className="bg-linear-to-r from-primary to-primary-light px-5 pb-6">
        <div className="flex gap-2">
          {["Type", "Source", "Destination", "Amount"].map((label, idx) => (
            <div
              key={idx}
              className={`flex-1 py-2 rounded-full flex flex-col items-center gap-1 transition ${
                activeStep > idx
                  ? "bg-white/40"
                  : activeStep === idx + 1
                    ? "bg-white/30"
                    : "bg-white/15"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeStep > idx || activeStep === idx + 1
                    ? "bg-white text-primary"
                    : "bg-white/30 text-white"
                }`}
              >
                {idx + 1}
              </div>
              <div
                className={`text-[10px] ${activeStep === idx + 1 ? "text-white font-semibold" : "text-white/80"}`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 pb-32">
        {/* Step 1: Transfer Type */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">
            🔀 What type of transfer?
          </div>
          <div className="flex border border-border rounded-xl overflow-hidden">
            <button
              onClick={() => selectType("goal2goal")}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition ${
                trType === "goal2goal"
                  ? "bg-linear-to-r from-primary to-primary-light text-white"
                  : "bg-background text-foreground/60"
              }`}
            >
              <span className="text-2xl">🎯</span>
              <span className="text-xs font-semibold">Goal → Goal</span>
            </button>
            <button
              onClick={() => selectType("user2user")}
              className={`flex-1 py-4 flex flex-col items-center gap-1 transition ${
                trType === "user2user"
                  ? "bg-linear-to-r from-primary to-primary-light text-white"
                  : "bg-background text-foreground/60"
              }`}
            >
              <span className="text-2xl">👤</span>
              <span className="text-xs font-semibold">Another User</span>
            </button>
          </div>
          <div className="mt-4 p-3 bg-primary/5 border border-primary/15 rounded-lg flex gap-2 text-xs text-foreground/60">
            <span>ℹ️</span>
            <span>{getTypeInfo()}</span>
          </div>
        </div>

        {/* Step 2: Source Goal */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">
            📤 Transfer from which goal?
          </div>
          {trType === "goal2goal" && (
            <div className="space-y-3">
              {Object.entries(goalData).map(([id, goal]) => (
                <div
                  key={id}
                  onClick={() => selectFrom(id)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-center gap-3 ${
                    selFrom === id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-xl">
                    {goal.emoji}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">
                      {goal.name}
                    </div>
                    <div className="text-xs text-foreground/50">
                      Balance: ৳{goal.balance.toLocaleString()}
                    </div>
                    <div className="h-1.5 bg-border rounded-full mt-2 overflow-hidden">
                      <div className="h-full w-[19%] bg-linear-to-r from-primary to-primary-light rounded-full" />
                    </div>
                  </div>
                  {selFrom === id && (
                    <div className="text-primary text-xl">✓</div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Recipient section for user-to-user */}
          {trType === "user2user" && (
            <div>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-sm">
                  🇧🇩
                </span>
                <input
                  type="tel"
                  value={recipientPhone}
                  onChange={(e) => {
                    setRecipientPhone(e.target.value);
                    setRecipientFound(false);
                  }}
                  placeholder="01XXXXXXXXX"
                  maxLength="11"
                  className="w-full py-4 pl-12 pr-4 border-2 border-border rounded-xl text-base font-semibold text-foreground bg-background outline-none focus:border-primary"
                />
              </div>
              {recipientFound && (
                <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-xl">
                    👤
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">
                      {recipientName}
                    </div>
                    <div className="text-xs text-foreground/50">
                      {recipientPhoneText}
                    </div>
                  </div>
                  <div className="text-xs font-bold text-primary">
                    ✓ Verified
                  </div>
                </div>
              )}
              <button
                onClick={searchRecipient}
                className="w-full mt-3 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-bold text-sm"
              >
                🔍 Find User
              </button>
            </div>
          )}
        </div>

        {/* Step 3: Destination Goal (goal2goal only) */}
        {trType === "goal2goal" && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              📥 Transfer to which goal?
            </div>
            <div className="space-y-3">
              {Object.entries(toGoalData).map(([id, name]) => {
                const fromKey = selFrom.replace("from-", "");
                const toKey = id.replace("to-", "");
                const isDisabled = fromKey === toKey;
                return (
                  <div
                    key={id}
                    onClick={() => !isDisabled && selectTo(id)}
                    className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-center gap-3 ${
                      !isDisabled && selTo === id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary"
                    } ${isDisabled ? "opacity-40 pointer-events-none" : ""}`}
                  >
                    <div className="w-11 h-11 rounded-xl bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-xl">
                      {name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">
                        {name}
                      </div>
                    </div>
                    {selTo === id && (
                      <div className="text-primary text-xl">✓</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Amount */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">
            💰 How much to transfer?
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-2xl font-bold">
              ৳
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
                updateSummary();
              }}
              placeholder="0"
              min="10"
              className="w-full py-5 pl-12 pr-4 text-right text-3xl font-bold border-2 border-border rounded-xl text-foreground bg-background outline-none focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3">
            {[500, 1000, 2000, 5000, 10000, 20000].map((amt) => (
              <button
                key={amt}
                onClick={() => setPresetAmount(amt, null)}
                className={`py-2 rounded-lg border-2 text-sm font-semibold transition ${
                  parseFloat(amount) === amt
                    ? "border-primary text-primary bg-primary/5"
                    : "border-border text-foreground/60 hover:border-primary"
                }`}
              >
                ৳{amt.toLocaleString()}
              </button>
            ))}
          </div>

          <div className="mt-4">
            <label className="block text-sm font-semibold text-foreground mb-2">
              📝 Note (Optional)
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={2}
              placeholder="Why are you sending? e.g., For Hajj fund"
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary resize-none"
            />
            <div className="text-xs text-foreground/50 mt-1">
              Max 100 characters
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-linear-to-r from-primary/10 to-primary-light/10 border border-primary/20 rounded-xl p-4 mb-4">
          <div className="flex justify-between text-sm py-2 border-b border-dashed border-border">
            <span className="text-foreground/60">Type</span>
            <span className="font-semibold text-foreground">
              {getTypeLabel()}
            </span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-dashed border-border">
            <span className="text-foreground/60">From</span>
            <span className="font-semibold text-foreground">
              {getSummaryFrom()}
            </span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-dashed border-border">
            <span className="text-foreground/60">To</span>
            <span className="font-semibold text-foreground">
              {getSummaryTo()}
            </span>
          </div>
          <div className="flex justify-between text-lg py-3">
            <span className="text-foreground/60">Amount</span>
            <span className="font-bold text-primary">{getAmountDisplay()}</span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span className="text-foreground/60">Fee</span>
            <span className="font-semibold text-primary">Free ✓</span>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
        <button
          onClick={submitTransfer}
          className="w-full py-4 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-bold text-base"
        >
          🔄 Confirm Transfer
        </button>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-md p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-7xl mb-4">✅</div>
              <div className="text-2xl font-bold text-foreground mb-2">
                Transfer Complete!
              </div>
              <div className="text-sm text-foreground/60 mb-4">
                Your transfer has been successfully completed.
              </div>
              <div className="bg-background border border-border rounded-xl p-3 flex justify-between text-sm mb-5">
                <span className="text-foreground/60">Reference Number</span>
                <span className="font-mono font-bold text-foreground">
                  TRF-{new Date().toISOString().slice(0, 10).replace(/-/g, "")}-
                  {Math.floor(1000 + Math.random() * 9000)}
                </span>
              </div>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
              >
                Go to Dashboard
              </button>
              <button
                onClick={resetTransfer}
                className="w-full py-3 border-2 border-border text-foreground rounded-xl font-semibold"
              >
                Make Another Transfer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm whitespace-nowrap"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransferPage;
