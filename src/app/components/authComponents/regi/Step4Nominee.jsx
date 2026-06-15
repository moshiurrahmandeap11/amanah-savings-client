"use client";

import React from "react";
import { motion } from "framer-motion";

const Step4Nominee = ({ formData, updateField, errors, handleNext, handleBack }) => {
  const validateStep = () => {
    const newErrors = {};
    if (!formData.nomineeFirstName) newErrors.nomineeFirstName = "Nominee first name required";
    if (!formData.nomineeRelation) newErrors.nomineeRelation = "Please select relationship";
    if (!formData.nomineePhone || formData.nomineePhone.length < 10) newErrors.nomineePhone = "Valid nominee phone required";
    if (Object.keys(newErrors).length === 0) handleNext();
    else return;
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">Step 4 / 8</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Nominee Person</h2>
      <p className="text-foreground/60 mb-6">The person who will receive your savings in your absence.</p>

      <div className="grid grid-cols-2 gap-4 mb-4"><div><label className="block text-sm font-semibold text-foreground/70 mb-1">First Name *</label><input type="text" value={formData.nomineeFirstName} onChange={(e) => updateField("nomineeFirstName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div>
      <div><label className="block text-sm font-semibold text-foreground/70 mb-1">Last Name</label><input type="text" value={formData.nomineeLastName} onChange={(e) => updateField("nomineeLastName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div></div>

      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Relationship *</label><select value={formData.nomineeRelation} onChange={(e) => updateField("nomineeRelation", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"><option value="">Select Relationship</option><option>Spouse</option><option>Father</option><option>Mother</option><option>Son</option><option>Daughter</option><option>Brother</option><option>Sister</option><option>Other</option></select>{errors.nomineeRelation && <p className="text-xs text-red-500 mt-1">{errors.nomineeRelation}</p>}</div>

      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Mobile Number *</label><div className="flex"><span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-background">+880</span><input type="tel" value={formData.nomineePhone} onChange={(e) => updateField("nomineePhone", e.target.value.replace(/\D/g, "").slice(0, 11))} className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div>{errors.nomineePhone && <p className="text-xs text-red-500 mt-1">{errors.nomineePhone}</p>}</div>

      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">NID Number (Optional)</label><input type="text" value={formData.nomineeNid} onChange={(e) => updateField("nomineeNid", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div>

      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Share of Savings (%)</label><select value={formData.nomineeShare} onChange={(e) => updateField("nomineeShare", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"><option value="100">100% — Full savings</option><option value="75">75%</option><option value="50">50%</option><option value="25">25%</option></select></div>

      <button onClick={validateStep} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3">Next — Choose Plan →</button>
      <button onClick={handleBack} className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition">← Previous</button>
    </motion.div>
  );
};

export default Step4Nominee;