"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, AlertTriangle } from "lucide-react";

const LiftingPage = () => {
  const [selectedGoal, setSelectedGoal] = useState("wedding");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [reason, setReason] = useState("medical");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const goals = [
    { id: "wedding", emoji: "", name: "Wedding Fund", saved: "৳1,80,000", maturity: "November 2026", amount: 180000 },
    { id: "hajj", emoji: "", name: "Hajj Fund", saved: "৳39,000", maturity: "June 2028", amount: 39000 },
    { id: "education", emoji: "", name: "Education Fund", saved: "৳18,000", maturity: "March 2027", amount: 18000 },
  ];

  const reasons = [
    { value: "medical", label: "Medical Emergency" },
    { value: "family", label: "Family Emergency" },
    { value: "goal_change", label: "Goal Change" },
    { value: "other", label: "Other" },
  ];

  const paymentMethods = [
    { id: "bkash", name: "bKash", icon: "" },
    { id: "nagad", name: "Nagad", icon: "" },
    { id: "bank", name: "Bank", icon: "" },
  ];

  const showToast = (message, duration = 4000) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), duration);
  };

  const handleSubmit = () => {
    const amount = parseFloat(withdrawAmount);
    const phone = phoneNumber.trim();

    if (!withdrawAmount || amount < 100) {
      showToast("⚠️ Please withdraw at least ৳100");
      return;
    }

    if (!phone || phone.length < 11) {
      showToast("⚠️ Please enter a valid phone number");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast(" Withdrawal request sent. Admin will review it.", 4000);
      setWithdrawAmount("");
      setPhoneNumber("");
    }, 1000);
  };

  const selectedGoalData = goals.find(g => g.id === selectedGoal);

  return (
    <>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground mb-2">Withdrawal Request</h2>

        {/* Warning Box */}
        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl mb-5">
          <div className="flex gap-2">
            <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/70 leading-relaxed">
              <strong>Important:</strong> Savings are locked until goal maturity. 
              Early withdrawal requires admin approval and takes 5-7 working days.
            </div>
          </div>
        </div>

        {/* Goals List Card */}
        <div className="bg-card border border-border rounded-xl p-5 mb-5">
          <div className="font-bold text-foreground mb-4">Your Goals</div>
          <div className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal.id}
                className="p-3 bg-background rounded-lg border border-border flex items-center gap-3"
              >
                <span className="text-2xl">{goal.emoji}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{goal.name}</div>
                  <div className="text-xs text-foreground/50">
                    Saved: {goal.saved} · Maturity: {goal.maturity}
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-500 rounded-md font-semibold">
                  Locked
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal Request Form */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">🆘 Emergency Withdrawal Request</div>

          {/* Select Goal */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
              Select Goal
            </label>
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
            >
              {goals.map((goal) => (
                <option key={goal.id} value={goal.id}>
                  {goal.emoji} {goal.name} — {goal.saved}
                </option>
              ))}
            </select>
          </div>

          {/* Withdrawal Amount */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
              Withdrawal Amount (BDT)
            </label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              min="100"
              placeholder="Enter amount"
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
            />
            {selectedGoalData && withdrawAmount > selectedGoalData.amount && (
              <p className="text-xs text-red-500 mt-1">
                Amount exceeds your saved balance of {selectedGoalData.saved}
              </p>
            )}
          </div>

          {/* Reason */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
              Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
            >
              {reasons.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`py-3 rounded-xl border-2 text-center transition ${
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <div className="text-2xl mb-1">{method.icon}</div>
                  <div className={`text-xs font-semibold ${paymentMethod === method.id ? "text-primary" : "text-foreground/70"}`}>
                    {method.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number (for mobile banking) */}
          {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
            <div className="mb-5">
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                {paymentMethod === "bkash" ? "bKash" : "Nagad"} Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-background text-foreground/60 text-sm">
                  +880
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="1XXXXXXXXX"
                  className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
            </div>
          )}

          {/* Bank Fields (if bank selected) */}
          {paymentMethod === "bank" && (
            <div className="mb-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  Bank Name
                </label>
                <select className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition">
                  <option>Dutch-Bangla Bank (DBBL)</option>
                  <option>BRAC Bank</option>
                  <option>Islami Bank Bangladesh</option>
                  <option>Sonali Bank</option>
                  <option>Janata Bank</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  Account Number
                </label>
                <input
                  type="text"
                  placeholder="Enter account number"
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  placeholder="Enter account holder name"
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Sending...
              </span>
            ) : (
              "Send Withdrawal Request"
            )}
          </button>

          <p className="text-center text-xs text-foreground/50 mt-3">
            Admin will review within 5-7 working days
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-card border border-border rounded-xl px-5 py-3 shadow-lg">
            <p className="text-sm text-foreground">{toast.message}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default LiftingPage;