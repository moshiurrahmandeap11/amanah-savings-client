"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Eye, EyeOff, AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import axiosInstance from "../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Step Header
    stepLabel: "Step 1 / 8",
    createAccount: "Create Account",
    joinCommunity: "Join Bangladesh's most trusted savings community",
    
    // Labels
    firstName: "First Name *",
    firstNamePlaceholder: "Fatema",
    lastName: "Last Name",
    lastNamePlaceholder: "Akter",
    mobileNumber: "Mobile Number *",
    mobilePlaceholder: "1XXXXXXXXX",
    email: "Email (Optional)",
    emailPlaceholder: "you@example.com",
    password: "Password *",
    passwordPlaceholder: "At least 8 characters",
    confirmPassword: "Confirm Password *",
    confirmPasswordPlaceholder: "Type again",
    
    // Islamic Mode
    islamicSavingsMode: "Islamic Savings Mode",
    islamicModeDesc: "Enable interest-free (halal) savings",
    
    // Checkboxes
    termsText: "I have read and agree to the {terms} and {privacy}. Sanchoy Bondhu is a savings community, not a bank.",
    terms: "Terms",
    privacy: "Privacy Policy",
    withdrawalText: "I understand that early withdrawal before reaching a savings goal requires admin approval.",
    marketingText: "I agree to receive promotional messages via SMS and email. (Optional)",
    
    // Buttons
    nextButton: "Next — Verify Email →",
    
    // Validation
    firstNameRequired: "First name is required",
    validPhoneRequired: "Valid phone number required",
    passwordRequired: "Password is required",
    passwordMinLength: "Password must be at least 8 characters",
    passwordsDoNotMatch: "Passwords do not match",
    agreeTerms: "You must agree to the terms",
    agreeWithdrawal: "You must agree to the withdrawal policy",
    
    // Real-time validation
    phoneAlreadyRegistered: "This phone number is already registered",
    emailAlreadyRegistered: "This email is already registered",
    checking: "Checking...",
    phoneAvailable: "Phone number is available",
    emailAvailable: "Email is available",
  },
  bn: {
    // Step Header
    stepLabel: "ধাপ ১ / ৮",
    createAccount: "অ্যাকাউন্ট তৈরি করুন",
    joinCommunity: "বাংলাদেশের সবচেয়ে বিশ্বস্ত সঞ্চয় কমিউনিটিতে যোগ দিন",
    
    // Labels
    firstName: "নামের প্রথম অংশ *",
    firstNamePlaceholder: "ফাতেমা",
    lastName: "নামের শেষ অংশ",
    lastNamePlaceholder: "আক্তার",
    mobileNumber: "মোবাইল নম্বর *",
    mobilePlaceholder: "১XXXXXXXXX",
    email: "ইমেইল (ঐচ্ছিক)",
    emailPlaceholder: "আপনার@ইমেইল.কম",
    password: "পাসওয়ার্ড *",
    passwordPlaceholder: "কমপক্ষে ৮ অক্ষর",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন *",
    confirmPasswordPlaceholder: "আবার টাইপ করুন",
    
    // Islamic Mode
    islamicSavingsMode: "ইসলামিক সঞ্চয় মোড",
    islamicModeDesc: "সুদমুক্ত (হালাল) সঞ্চয় সক্রিয় করুন",
    
    // Checkboxes
    termsText: "আমি {terms} এবং {privacy} পড়েছি এবং সম্মতি দিচ্ছি। সঞ্চয় বন্ধু একটি সঞ্চয় কমিউনিটি, ব্যাংক নয়।",
    terms: "শর্তাবলী",
    privacy: "গোপনীয়তা নীতি",
    withdrawalText: "আমি বুঝতে পারছি যে সঞ্চয় লক্ষ্য পূরণের আগে উত্তোলনের জন্য প্রশাসকের অনুমোদন প্রয়োজন।",
    marketingText: "আমি এসএমএস এবং ইমেইলের মাধ্যমে প্রচারমূলক বার্তা পেতে সম্মতি দিচ্ছি। (ঐচ্ছিক)",
    
    // Buttons
    nextButton: "পরবর্তী — ইমেইল যাচাই →",
    
    // Validation
    firstNameRequired: "নামের প্রথম অংশ প্রয়োজন",
    validPhoneRequired: "বৈধ ফোন নম্বর প্রয়োজন",
    passwordRequired: "পাসওয়ার্ড প্রয়োজন",
    passwordMinLength: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
    passwordsDoNotMatch: "পাসওয়ার্ড মিলছে না",
    agreeTerms: "আপনাকে শর্তাবলীতে সম্মত হতে হবে",
    agreeWithdrawal: "আপনাকে উত্তোলন নীতিতে সম্মত হতে হবে",
    
    // Real-time validation
    phoneAlreadyRegistered: "এই ফোন নম্বরটি ইতিমধ্যে নিবন্ধিত",
    emailAlreadyRegistered: "এই ইমেইলটি ইতিমধ্যে নিবন্ধিত",
    checking: "যাচাই করা হচ্ছে...",
    phoneAvailable: "ফোন নম্বরটি ব্যবহারযোগ্য",
    emailAvailable: "ইমেইলটি ব্যবহারযোগ্য",
  }
};

const Step1Account = ({ formData, updateField, errors, setErrors, handleNext, lang = "bn" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Real-time validation states
  const [phoneStatus, setPhoneStatus] = useState("idle"); // idle | checking | exists | available
  const [emailStatus, setEmailStatus] = useState("idle"); // idle | checking | exists | available
  const phoneTimerRef = useRef(null);
  const emailTimerRef = useRef(null);

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Check phone availability (debounced)
  const checkPhone = useCallback(async (phone) => {
    if (!phone || phone.length < 10) {
      setPhoneStatus("idle");
      return;
    }
    
    setPhoneStatus("checking");
    try {
      const response = await axiosInstance.get(`/users/check-exists?phone=${encodeURIComponent(phone)}`);
      if (response.data.success) {
        if (response.data.data.phoneExists) {
          setPhoneStatus("exists");
          setErrors((prev) => ({ ...prev, phone: t("phoneAlreadyRegistered") }));
        } else {
          setPhoneStatus("available");
          setErrors((prev) => { const { phone, ...rest } = prev; return rest; });
        }
      }
    } catch (error) {
      console.error("Phone check error:", error);
      setPhoneStatus("idle");
    }
  }, [t, setErrors]);

  // Check email availability (debounced)
  const checkEmail = useCallback(async (email) => {
    if (!email || !email.includes("@")) {
      setEmailStatus("idle");
      return;
    }
    
    setEmailStatus("checking");
    try {
      const response = await axiosInstance.get(`/users/check-exists?email=${encodeURIComponent(email)}`);
      if (response.data.success) {
        if (response.data.data.emailExists) {
          setEmailStatus("exists");
          setErrors((prev) => ({ ...prev, email: t("emailAlreadyRegistered") }));
        } else {
          setEmailStatus("available");
          setErrors((prev) => { const { email, ...rest } = prev; return rest; });
        }
      }
    } catch (error) {
      console.error("Email check error:", error);
      setEmailStatus("idle");
    }
  }, [t, setErrors]);

  // Debounced phone change handler
  const handlePhoneChange = (value) => {
    updateField("phone", value);
    setPhoneStatus("idle");
    
    // Clear previous timer
    if (phoneTimerRef.current) clearTimeout(phoneTimerRef.current);
    
    // Set new timer (1 second debounce)
    phoneTimerRef.current = setTimeout(() => {
      checkPhone(value);
    }, 800);
  };

  // Debounced email change handler
  const handleEmailChange = (value) => {
    updateField("email", value);
    setEmailStatus("idle");
    
    // Clear previous timer
    if (emailTimerRef.current) clearTimeout(emailTimerRef.current);
    
    // Set new timer (1 second debounce)
    emailTimerRef.current = setTimeout(() => {
      checkEmail(value);
    }, 800);
  };

  // Cleanup timers on unmount
  useEffect(() => {
    return () => {
      if (phoneTimerRef.current) clearTimeout(phoneTimerRef.current);
      if (emailTimerRef.current) clearTimeout(emailTimerRef.current);
    };
  }, []);

  const validateStep = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = t('firstNameRequired');
    if (!formData.phone || formData.phone.length < 10) newErrors.phone = t('validPhoneRequired');
    if (phoneStatus === "exists") newErrors.phone = t('phoneAlreadyRegistered');
    if (emailStatus === "exists") newErrors.email = t('emailAlreadyRegistered');
    if (!formData.password) newErrors.password = t('passwordRequired');
    if (formData.password.length < 8) newErrors.password = t('passwordMinLength');
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = t('passwordsDoNotMatch');
    if (!formData.terms) newErrors.terms = t('agreeTerms');
    if (!formData.withdrawalPolicy) newErrors.withdrawalPolicy = t('agreeWithdrawal');
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

  // Status indicator component
  const StatusIndicator = ({ status }) => {
    if (status === "checking") {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-foreground/50 mt-1">
          <Loader2 size={12} className="animate-spin" />
          {t("checking")}
        </span>
      );
    }
    if (status === "exists") {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-red-500 mt-1">
          <AlertCircle size={12} />
          {t("phoneAlreadyRegistered")}
        </span>
      );
    }
    if (status === "available") {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-green-500 mt-1">
          <CheckCircle size={12} />
          {t("phoneAvailable")}
        </span>
      );
    }
    return null;
  };

  // Email status indicator
  const EmailStatusIndicator = ({ status }) => {
    if (status === "checking") {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-foreground/50 mt-1">
          <Loader2 size={12} className="animate-spin" />
          {t("checking")}
        </span>
      );
    }
    if (status === "exists") {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-red-500 mt-1">
          <AlertCircle size={12} />
          {t("emailAlreadyRegistered")}
        </span>
      );
    }
    if (status === "available") {
      return (
        <span className="inline-flex items-center gap-1 text-xs text-green-500 mt-1">
          <CheckCircle size={12} />
          {t("emailAvailable")}
        </span>
      );
    }
    return null;
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">{t('stepLabel')}</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{t('createAccount')}</h2>
      <p className="text-foreground/60 mb-6">{t('joinCommunity')}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('firstName')}</label>
          <input type="text" value={formData.firstName} onChange={(e) => updateField("firstName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder={t('firstNamePlaceholder')} />
          {errors.firstName && <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('lastName')}</label>
          <input type="text" value={formData.lastName} onChange={(e) => updateField("lastName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder={t('lastNamePlaceholder')} />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('mobileNumber')}</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-background text-foreground/60">+880</span>
          <input 
            type="tel" 
            value={formData.phone} 
            onChange={(e) => handlePhoneChange(e.target.value.replace(/\D/g, "").slice(0, 11))} 
            className={`flex-1 p-3 rounded-r-xl border bg-background text-foreground outline-none focus:border-primary ${
              phoneStatus === "exists" ? "border-red-500" : phoneStatus === "available" ? "border-green-500" : "border-border"
            }`} 
            placeholder={t('mobilePlaceholder')} 
          />
        </div>
        {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        {!errors.phone && <StatusIndicator status={phoneStatus} />}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('email')}</label>
        <input 
          type="email" 
          value={formData.email} 
          onChange={(e) => handleEmailChange(e.target.value)} 
          className={`w-full p-3 rounded-xl border bg-background text-foreground outline-none focus:border-primary ${
            emailStatus === "exists" ? "border-red-500" : emailStatus === "available" ? "border-green-500" : "border-border"
          }`} 
          placeholder={t('emailPlaceholder')} 
        />
        {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        {!errors.email && <EmailStatusIndicator status={emailStatus} />}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('password')}</label>
        <div className="relative">
          <input type={showPassword ? "text" : "password"} value={formData.password} onChange={(e) => updateField("password", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10" placeholder={t('passwordPlaceholder')} />
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
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('confirmPassword')}</label>
        <div className="relative">
          <input type={showConfirmPassword ? "text" : "password"} value={formData.confirmPassword} onChange={(e) => updateField("confirmPassword", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10" placeholder={t('confirmPasswordPlaceholder')} />
          <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50">
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
      </div>

      <div className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl mb-4 cursor-pointer" onClick={() => updateField("islamicMode", !formData.islamicMode)}>
        <div>
          <h4 className="font-semibold">{t('islamicSavingsMode')}</h4>
          <p className="text-xs text-foreground/60">{t('islamicModeDesc')}</p>
        </div>
        <div className={`w-12 h-6 rounded-full transition-all ${formData.islamicMode ? "bg-primary" : "bg-border"} relative`}>
          <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.islamicMode ? "right-1" : "left-1"}`} />
        </div>
      </div>

      <label className="flex items-start gap-3 mb-3 cursor-pointer">
        <input type="checkbox" checked={formData.terms} onChange={(e) => updateField("terms", e.target.checked)} className="mt-1" />
        <span className="text-sm text-foreground/70">
          {lang === "bn" ? (
            <>
              আমি <Link href="/terms" className="text-primary">শর্তাবলী</Link> এবং <Link href="/privacy" className="text-primary">গোপনীয়তা নীতি</Link> পড়েছি এবং সম্মতি দিচ্ছি। সঞ্চয় বন্ধু একটি সঞ্চয় কমিউনিটি, ব্যাংক নয়।
            </>
          ) : (
            <>
              I have read and agree to the <Link href="/terms" className="text-primary">Terms</Link> and <Link href="/privacy" className="text-primary">Privacy Policy</Link>. Sanchoy Bondhu is a savings community, not a bank.
            </>
          )}
        </span>
      </label>
      {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}

      <label className="flex items-start gap-3 mb-3 cursor-pointer">
        <input type="checkbox" checked={formData.withdrawalPolicy} onChange={(e) => updateField("withdrawalPolicy", e.target.checked)} className="mt-1" />
        <span className="text-sm text-foreground/70">
          {lang === "bn" 
            ? "আমি বুঝতে পারছি যে সঞ্চয় লক্ষ্য পূরণের আগে উত্তোলনের জন্য প্রশাসকের অনুমোদন প্রয়োজন।"
            : "I understand that early withdrawal before reaching a savings goal requires admin approval."
          }
        </span>
      </label>
      {errors.withdrawalPolicy && <p className="text-xs text-red-500 mt-1">{errors.withdrawalPolicy}</p>}

      <label className="flex items-start gap-3 mb-6 cursor-pointer">
        <input type="checkbox" checked={formData.marketing} onChange={(e) => updateField("marketing", e.target.checked)} className="mt-1" />
        <span className="text-sm text-foreground/70">
          {lang === "bn"
            ? "আমি এসএমএস এবং ইমেইলের মাধ্যমে প্রচারমূলক বার্তা পেতে সম্মতি দিচ্ছি। (ঐচ্ছিক)"
            : "I agree to receive promotional messages via SMS and email. (Optional)"
          }
        </span>
      </label>

      <button onClick={validateStep} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition">{t('nextButton')}</button>
    </motion.div>
  );
};

export default Step1Account;
