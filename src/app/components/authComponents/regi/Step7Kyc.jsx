"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Check } from "lucide-react";

const Step7Kyc = ({ formData, updateField, errors, handleNext, handleBack }) => {
  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">Step 7 / 8</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Verify Identity</h2>
      <p className="text-foreground/60 mb-6">KYC is mandatory to activate your account. Our team will verify within 4 hours.</p>

      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">NID Number *</label><input type="text" value={formData.nidNumber} onChange={(e) => updateField("nidNumber", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder="Enter 10 or 17 digit NID" /></div>

      <div className="mb-4"><div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl cursor-pointer" onClick={() => updateField("kycConsent", !formData.kycConsent)}><div className="flex items-center gap-3"><Shield size={24} className="text-primary" /><div><h4 className="font-semibold">KYC Consent</h4><p className="text-xs text-foreground/60">I confirm that the documents provided are my own and the information is accurate.</p></div></div><div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${formData.kycConsent ? "bg-primary border-primary" : "border-border"}`}>{formData.kycConsent && <Check size={14} className="text-white" />}</div></div>{errors.kycConsent && <p className="text-xs text-red-500 mt-1">{errors.kycConsent}</p>}</div>

      <div className="info-box p-3 bg-primary/5 border border-primary/20 rounded-xl text-xs text-foreground/60 flex gap-2 mb-6"><Shield size={16} className="text-primary shrink-0" /><span>Your documents are completely secure. All KYC files are encrypted. Never shared with third parties.</span></div>

      <button onClick={handleNext} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3">Next — Payment Info →</button>
      <button onClick={handleBack} className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition">← Previous</button>
    </motion.div>
  );
};

export default Step7Kyc;