"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

const Step1Account = ({ formData, updateField, errors, setErrors, handleNext }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const validateStep = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = "Valid phone number required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    if (!formData.terms) newErrors.terms = "You must agree to the terms";
    if (!formData.withdrawalPolicy) newErrors.withdrawalPolicy = "You must agree to the withdrawal policy";
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) handleNext();
  };

  const getStrengthColor = () => {
    const pwd = formData.password;
    if (!pwd) return "";
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-green-500";
    return "bg-primary";
  };

  const getStrengthBarColor = (index) => {
    const pwd = formData.password;
    if (!pwd) return "bg-border";
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    
    const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500", "bg-primary"];
    if (strength <= index) return "bg-border";
    return colors[index];
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">Step 1 / 8</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Create Account</h2>
      <p className="text-foreground/60 mb-6">Join Bangladesh's most trusted savings community</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-foreground/70 mb-1">First Name *</label>
          <input type="text" value={formData.firstName} onChange={(e) => updateField("firstName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder="Fatema" />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground/70 mb-1">Last Name</label>
          <input type="text" value={formData.lastName} onChange={(e) => updateField("lastName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder="Akter" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">Mobile Number *</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-background text-foreground/60">+880</span>
          <input type="tel" value={formData.phone} onChange={(e) => updateField("phone", e.target.value.replace(/\D/g, "").slice(0, 11))} className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder="1XXXXXXXXX" />
        </div>
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">Email (Optional)</label>
        <input type="email" value={formData.email} onChange={(e) => updateField("email", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder="you@example.com" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">Password *</label>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => updateField("password", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10" placeholder="At least 8 characters" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50">
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <div className="flex gap-1 mt-2">
          <div className={`flex-1 h-1 rounded-full transition-all ${getStrengthBarColor(0)}`} />
          <div className={`flex-1 h-1 rounded-full transition-all ${getStrengthBarColor(1)}`} />
          <div className={`flex-1 h-1 rounded-full transition-all ${getStrengthBarColor(2)}`} />
          <div className={`flex-1 h-1 rounded-full transition-all ${getStrengthBarColor(3)}`} />
        </div>
        {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">Confirm Password *</label>
        <div className="relative">
          <input type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10" placeholder="Type again" />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50">
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
      </div>

      <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl mb-4 cursor-pointer" onClick={() => updateField("islamicMode", !formData.islamicMode)}>
        <div>
          <h4 className="font-semibold">Islamic Savings Mode</h4>
          <p className="text-xs text-foreground/60">Enable interest-free (halal) savings</p>
        </div>
        <div className={`w-12 h-6 rounded-full transition-all ${formData.islamicMode ? "bg-primary" : "bg-border"} relative`}>
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.islamicMode ? "right-1" : "left-1"}`} />
        </div>
      </div>

      <label className="flex items-start gap-3 mb-3 cursor-pointer">
        <input type="checkbox" checked={formData.terms} onChange={(e) => updateField("terms", e.target.checked)} className="mt-1" />
        <span className="text-sm text-foreground/70">I have read and agree to the <Link href="/terms" className="text-primary">Terms</Link> and <Link href="/privacy" className="text-primary">Privacy Policy</Link>. Sanchoy Bondhu is a savings community, not a bank.</span>
      </label>
      {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}

      <label className="flex items-start gap-3 mb-3 cursor-pointer">
        <input type="checkbox" checked={formData.withdrawalPolicy} onChange={(e) => updateField("withdrawalPolicy", e.target.checked)} className="mt-1" />
        <span className="text-sm text-foreground/70">I understand that early withdrawal before reaching a savings goal requires admin approval.</span>
      </label>
      {errors.withdrawalPolicy && <p className="text-xs text-red-500 mt-1">{errors.withdrawalPolicy}</p>}

      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input type="checkbox" checked={formData.marketing} onChange={(e) => updateField("marketing", e.target.checked)} className="mt-1" />
        <span className="text-sm text-foreground/70">I agree to receive promotional messages via SMS and email. (Optional)</span>
      </label>

      <button onClick={validateStep} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition">Next — Verify Email →</button>
    </motion.div>
  );
};

export default Step1Account;