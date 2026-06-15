"use client";

import React from "react";
import { motion } from "framer-motion";

const Step8Payment = ({ formData, updateField, errors, isLoading, handleSubmit, handleBack }) => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">Step 8 / 8</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Payment Details</h2>
      <p className="text-foreground/60 mb-6">Your savings withdrawals will be sent to this account</p>

      <div className="grid grid-cols-2 gap-3 mb-6">{["bkash", "nagad", "rocket", "bank"].map((method) => (<div key={method} onClick={() => updateField("paymentMethod", method)} className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${formData.paymentMethod === method ? "border-primary bg-primary/5" : "border-border"}`}><div className="font-semibold capitalize">{method === "bkash" ? "bKash" : method === "nagad" ? "Nagad" : method === "rocket" ? "Rocket" : "Bank"}</div></div>))}</div>
      {errors.paymentMethod && <p className="text-xs text-red-500 mb-4">{errors.paymentMethod}</p>}

      {formData.paymentMethod && formData.paymentMethod !== "bank" ? (
        <div><div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Mobile Wallet Number *</label><div className="flex"><span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border">+880</span><input type="tel" value={formData.walletNumber} onChange={(e) => updateField("walletNumber", e.target.value.replace(/\D/g, "").slice(0, 11))} className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div>{errors.walletNumber && <p className="text-xs text-red-500 mt-1">{errors.walletNumber}</p>}</div>
        <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Account Holder Name *</label><input type="text" value={formData.walletName} onChange={(e) => updateField("walletName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" />{errors.walletName && <p className="text-xs text-red-500 mt-1">{errors.walletName}</p>}</div></div>
      ) : formData.paymentMethod === "bank" ? (
        <div><div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Bank Name *</label><select value={formData.bankName} onChange={(e) => updateField("bankName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"><option value="">Select Bank</option><option>Dutch-Bangla Bank (DBBL)</option><option>BRAC Bank</option><option>Islami Bank Bangladesh</option><option>Sonali Bank</option><option>Janata Bank</option><option>Agrani Bank</option><option>Rupali Bank</option><option>Pubali Bank</option><option>Uttara Bank</option><option>Mutual Trust Bank</option><option>Dhaka Bank</option><option>Eastern Bank</option><option>City Bank</option><option>Prime Bank</option><option>Trust Bank</option><option>Other</option></select>{errors.bankName && <p className="text-xs text-red-500 mt-1">{errors.bankName}</p>}</div>
        <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Account Number *</label><input type="text" value={formData.bankAccNum} onChange={(e) => updateField("bankAccNum", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" />{errors.bankAccNum && <p className="text-xs text-red-500 mt-1">{errors.bankAccNum}</p>}</div>
        <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Account Holder Name *</label><input type="text" value={formData.bankAccName} onChange={(e) => updateField("bankAccName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" />{errors.bankAccName && <p className="text-xs text-red-500 mt-1">{errors.bankAccName}</p>}</div>
        <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Branch Name</label><input type="text" value={formData.bankBranch} onChange={(e) => updateField("bankBranch", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div>
        <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Routing Number (Optional)</label><input type="text" value={formData.bankRouting} onChange={(e) => updateField("bankRouting", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div></div>
      ) : null}

      <button onClick={handleSubmit} disabled={isLoading} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60">{isLoading ? <span className="inline-flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Creating account...</span> : "🚀 Create Account"}</button>
      <button onClick={handleBack} className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition mt-3">← Previous</button>
    </motion.div>
  );
};

export default Step8Payment;