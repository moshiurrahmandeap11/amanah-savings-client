"use client";

import React from "react";
import { motion } from "framer-motion";

const Step3Personal = ({ formData, updateField, errors, districts, handleNext, handleBack }) => {
  const validateStep = () => {
    const newErrors = {};
    if (!formData.occupation) newErrors.occupation = "Please select occupation";
    if (!formData.income) newErrors.income = "Please select income range";
    if (Object.keys(newErrors).length === 0) handleNext();
    else return;
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">Step 3 / 8</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Tell us about you</h2>
      <p className="text-foreground/60 mb-6">We need this to personalize your savings experience</p>

      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Date of Birth *</label><input type="date" value={formData.dob} onChange={(e) => updateField("dob", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div>
      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Gender</label><select value={formData.gender} onChange={(e) => updateField("gender", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option><option>Prefer not to say</option></select></div>

      <div className="grid grid-cols-2 gap-4 mb-4"><div><label className="block text-sm font-semibold text-foreground/70 mb-1">Division</label><select value={formData.division} onChange={(e) => { updateField("division", e.target.value); updateField("district", ""); }} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"><option value="">Select Division</option>{Object.keys(districts).map((d) => <option key={d}>{d}</option>)}</select></div>
      <div><label className="block text-sm font-semibold text-foreground/70 mb-1">District</label><select value={formData.district} onChange={(e) => updateField("district", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"><option value="">Select District</option>{formData.division && districts[formData.division]?.map((d) => <option key={d}>{d}</option>)}</select></div></div>

      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Upazila / Area</label><input type="text" value={formData.upazila} onChange={(e) => updateField("upazila", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder="e.g. Gulshan, Mirpur" /></div>

      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Occupation *</label><select value={formData.occupation} onChange={(e) => updateField("occupation", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"><option value="">Select Occupation</option><option>Student</option><option>Govt. Employee</option><option>Private Employee</option><option>Business Owner</option><option>Freelancer</option><option>Homemaker</option><option>Farmer</option><option>Engineer</option><option>Doctor</option><option>Teacher</option><option>Other</option></select>{errors.occupation && <p className="text-xs text-red-500 mt-1">{errors.occupation}</p>}</div>

      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Monthly Income Range *</label><select value={formData.income} onChange={(e) => updateField("income", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"><option value="">Select Income Range</option><option>Below ৳10,000</option><option>৳10,000 – ৳25,000</option><option>৳25,000 – ৳50,000</option><option>৳50,000 – ৳1,00,000</option><option>Above ৳1,00,000</option><option>Prefer not to say</option></select>{errors.income && <p className="text-xs text-red-500 mt-1">{errors.income}</p>}</div>

      <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Referral Code (Optional)</label><input type="text" value={formData.referralCode} onChange={(e) => updateField("referralCode", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary uppercase" placeholder="e.g. FATEMA2024" /></div>

      <div className="border-t border-border pt-4 mt-2"><h3 className="text-sm font-bold text-foreground/70 mb-3">Current Address</h3>
        <div className="mb-4"><label className="block text-sm font-semibold text-foreground/70 mb-1">Village / Area / Street</label><input type="text" value={formData.village} onChange={(e) => updateField("village", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div>
        <div className="grid grid-cols-2 gap-4"><div><label className="block text-sm font-semibold text-foreground/70 mb-1">Post Office</label><input type="text" value={formData.postOffice} onChange={(e) => updateField("postOffice", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div>
        <div><label className="block text-sm font-semibold text-foreground/70 mb-1">Post Code</label><input type="text" value={formData.postCode} onChange={(e) => updateField("postCode", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" /></div></div>
      </div>

      <button onClick={validateStep} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3">Next — Nominee Person →</button>
      <button onClick={handleBack} className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition">← Previous</button>
    </motion.div>
  );
};

export default Step3Personal;