"use client";

import React from "react";
import { motion } from "framer-motion";

const Step5Plan = ({ formData, updateField, handleNext, handleBack }) => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">Step 5 / 8</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Choose Savings Plan</h2>
      <p className="text-foreground/60 mb-6">Select a plan based on your monthly savings capacity. Upgrade anytime.</p>

      <div className="grid grid-cols-2 gap-3 mb-6">{["bronze", "silver", "gold", "platinum"].map((plan) => (<div key={plan} onClick={() => updateField("selectedPlan", plan)} className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${formData.selectedPlan === plan ? "border-primary bg-primary/5" : "border-border"}`}><div className="font-bold capitalize">{plan}</div><div className="text-xs text-foreground/50">{plan === "bronze" ? "৳500–৳2,000/mo" : plan === "silver" ? "৳2,000–৳10,000/mo" : plan === "gold" ? "৳10,000–৳50,000/mo" : "৳50,000+/mo"}</div>{formData.selectedPlan === plan && <div className="text-primary text-xs mt-1">✓ Selected</div>}</div>))}</div>

      <div className="border-t border-border pt-4"><h3 className="text-sm font-bold text-foreground/70 mb-3">Set Your First Savings Goal</h3>
        <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Goal Type</label><select value={formData.goalType} onChange={(e) => updateField("goalType", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"><option value="">Choose your first goal</option><option>Home Fund</option><option>Wedding Fund</option><option>Hajj Fund</option><option>Education Fund</option><option>Emergency Fund</option><option>Gadget Fund</option><option>Car Fund</option><option>Business Fund</option><option>Children's Future</option><option>Travel Fund</option><option>Custom Goal</option></select></div>
        <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Target Amount (BDT)</label><input type="number" value={formData.targetAmount} onChange={(e) => updateField("targetAmount", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder="e.g. 200000" /></div>
        <div className="grid grid-cols-2 gap-4 mb-4"><div><label className="block text-sm font-semibold text-foreground/70 mb-1">Monthly Deposit</label><input type="number" value={formData.monthlyDeposit} onChange={(e) => updateField("monthlyDeposit", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder="e.g. 5000" /></div>
        <div><label className="block text-sm font-semibold text-foreground/70 mb-1">Duration (months)</label><input type="number" value={formData.duration} onChange={(e) => updateField("duration", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder="e.g. 24" /></div></div>
      </div>

      <button onClick={handleNext} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3">Next — Set PIN →</button>
      <button onClick={handleBack} className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition">← Previous</button>
    </motion.div>
  );
};

export default Step5Plan;