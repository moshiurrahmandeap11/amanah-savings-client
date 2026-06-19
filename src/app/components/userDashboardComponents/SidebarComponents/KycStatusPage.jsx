"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Moon,
  Sun,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";

// Translations
const translations = {
  en: {
    // Navigation
    backDashboard: "← Dashboard",
    backTitle: "KYC Status",
    
    // Header
    header: "🪪 KYC Verification",
    
    // Tabs
    pending: "⏳ Pending",
    reviewing: "🔍 Reviewing",
    approved: "✅ Approved",
    rejected: "❌ Rejected",
    
    // Section Titles
    verificationProgress: "📍 Verification Progress",
    submittedDocuments: "📄 Submitted Documents",
    accountLimits: "📊 Account Limits",
    
    // Steps
    step1Title: "Registration Complete",
    step1Sub: "Phone number and OTP verified",
    step1Time: "✅ Completed — May 2, 2026 10:23 AM",
    
    step2Title: "NID Uploaded",
    step2Sub: "Front and back images of the national ID",
    step2Time: "✅ Completed — May 2, 2026 10:31 AM",
    
    step3Title: "Selfie Verification",
    step3Sub: "Liveness detection and face matching",
    step3Time: "✅ Completed — May 2, 2026 10:34 AM",
    
    step4Title: "Manual Review",
    step4Sub: "Our team is checking the documents",
    step4Time: "⏱️ In progress — about 2-4 hours",
    
    step5Title: "Account Activation",
    step5Sub: "Full benefits will be unlocked",
    step5Time: "⏳ Pending",
    
    // Documents
    docOk: "✓ OK",
    docChecking: "⏱️ Checking",
    docNidFront: "NID front side",
    docNidBack: "NID back side",
    docSelfie: "Selfie photo",
    docApplication: "Application form",
    
    // Limits Headers
    benefit: "Benefit",
    currentLimit: "Current Limit",
    afterKyc: "After KYC",
    
    // Limits Data
    dailyDeposit: "Daily Deposit",
    monthlyWithdrawal: "Monthly Withdrawal",
    activeGoals: "Active Goals",
    referralBonus: "Referral Bonus",
    familyCircle: "Family Circle",
    
    // State: Pending
    pendingBadge: "📋 Submitted",
    pendingTitle: "Your documents have been submitted",
    pendingSub: "Our team will start reviewing your KYC soon.",
    pendingInfoTitle: "Waiting for review",
    pendingInfoText: "Your application was submitted successfully. Review will start within 24 hours.",
    pendingDot4Icon: "🔍",
    pendingDot5Icon: "🔓",
    pendingDot4Time: "⏳ Pending",
    pendingDot5Time: "⏳ Pending",
    
    // State: Reviewing
    reviewingBadge: "🔍 Under review",
    reviewingTitle: "Your KYC is being verified",
    reviewingSub: "Our team is reviewing your documents. This usually takes 24-48 hours.",
    reviewingInfoTitle: "Review in progress",
    reviewingInfoText: "Your NID and selfie are being checked by our AI system. No action is required.",
    reviewingDot4Time: "⏱️ In progress — about 2-4 hours",
    
    // State: Approved
    approvedBadge: "✅ Approved",
    approvedTitle: "KYC verified successfully!",
    approvedSub: "Congratulations! Your identity verification is complete. Full benefits are now available.",
    approvedInfoTitle: "Account fully active!",
    approvedInfoText: "Your KYC has been approved. All limits are unlocked and you can use every feature.",
    approvedDot4Time: "✅ Approved",
    approvedDot5Time: "✅ Account active",
    
    // State: Rejected
    rejectedBadge: "❌ Rejected",
    rejectedTitle: "Verification was not successful",
    rejectedSub: "Sorry, your documents were not accepted. Please submit them again.",
    rejectedInfoTitle: "Reason: image is blurry",
    rejectedInfoText: "Your NID image is not clear. Please retake it in good light and submit again.",
    rejectedDot4Time: "❌ Rejected",
    
    // Buttons
    getHelp: "Get Help",
    getUpdates: "Get Updates",
    
    // Toast
    supportNumber: "📞 Support: 01700-000000",
    updatesSent: "📧 Updates will be sent",
    
    // Status Icons
    pendingIcon: "📋",
    reviewingIcon: "⏳",
    approvedIcon: "✅",
    rejectedIcon: "❌",
  },
  bn: {
    // Navigation
    backDashboard: "← ড্যাশবোর্ড",
    backTitle: "KYC স্ট্যাটাস",
    
    // Header
    header: "🪪 KYC যাচাইকরণ",
    
    // Tabs
    pending: "⏳ অপেক্ষমাণ",
    reviewing: "🔍 পর্যালোচনা",
    approved: "✅ অনুমোদিত",
    rejected: "❌ প্রত্যাখ্যাত",
    
    // Section Titles
    verificationProgress: "📍 যাচাইকরণ অগ্রগতি",
    submittedDocuments: "📄 জমাকৃত কাগজপত্র",
    accountLimits: "📊 অ্যাকাউন্ট সীমা",
    
    // Steps
    step1Title: "নিবন্ধন সম্পন্ন",
    step1Sub: "ফোন নম্বর ও OTP যাচাইকৃত",
    step1Time: "✅ সম্পন্ন — ২ মে, ২০২৬ সকাল ১০:২৩",
    
    step2Title: "NID আপলোড",
    step2Sub: "জাতীয় পরিচয়পত্রের সামনে ও পিছনের ছবি",
    step2Time: "✅ সম্পন্ন — ২ মে, ২০২৬ সকাল ১০:৩১",
    
    step3Title: "সেলফি যাচাই",
    step3Sub: "লাইভনেস ডিটেকশন ও ফেস ম্যাচিং",
    step3Time: "✅ সম্পন্ন — ২ মে, ২০২৬ সকাল ১০:৩৪",
    
    step4Title: "ম্যানুয়াল পর্যালোচনা",
    step4Sub: "আমাদের দল কাগজপত্র যাচাই করছে",
    step4Time: "⏱️ প্রক্রিয়াধীন — আনুমানিক ২-৪ ঘণ্টা",
    
    step5Title: "অ্যাকাউন্ট সক্রিয়করণ",
    step5Sub: "সম্পূর্ণ সুবিধা আনলক হবে",
    step5Time: "⏳ অপেক্ষমাণ",
    
    // Documents
    docOk: "✓ ঠিক আছে",
    docChecking: "⏱️ যাচাই",
    docNidFront: "NID সামনের দিক",
    docNidBack: "NID পিছনের দিক",
    docSelfie: "সেলফি ছবি",
    docApplication: "আবেদনপত্র",
    
    // Limits Headers
    benefit: "সুবিধা",
    currentLimit: "বর্তমান সীমা",
    afterKyc: "KYC পরে",
    
    // Limits Data
    dailyDeposit: "দৈনিক জমা",
    monthlyWithdrawal: "মাসিক উত্তোলন",
    activeGoals: "সক্রিয় লক্ষ্য",
    referralBonus: "রেফারেল বোনাস",
    familyCircle: "পারিবারিক সার্কেল",
    
    // State: Pending
    pendingBadge: "📋 জমা দেওয়া হয়েছে",
    pendingTitle: "আপনার কাগজপত্র জমা হয়েছে",
    pendingSub: "আমাদের দল শীঘ্রই আপনার KYC পর্যালোচনা শুরু করবে।",
    pendingInfoTitle: "পর্যালোচনার অপেক্ষায়",
    pendingInfoText: "আপনার আবেদন সফলভাবে জমা হয়েছে। ২৪ ঘণ্টার মধ্যে পর্যালোচনা শুরু হবে।",
    pendingDot4Icon: "🔍",
    pendingDot5Icon: "🔓",
    pendingDot4Time: "⏳ অপেক্ষমাণ",
    pendingDot5Time: "⏳ অপেক্ষমাণ",
    
    // State: Reviewing
    reviewingBadge: "🔍 পর্যালোচনা চলছে",
    reviewingTitle: "আপনার KYC যাচাই হচ্ছে",
    reviewingSub: "আমাদের দল আপনার কাগজপত্র পর্যালোচনা করছে। সাধারণত ২৪-৪৮ ঘণ্টা সময় লাগে।",
    reviewingInfoTitle: "পর্যালোচনা চলছে",
    reviewingInfoText: "আপনার NID এবং সেলফি আমাদের AI সিস্টেম দ্বারা পরীক্ষা করা হচ্ছে। কোনো পদক্ষেপ নেওয়ার প্রয়োজন নেই।",
    reviewingDot4Time: "⏱️ প্রক্রিয়াধীন — আনুমানিক ২-৪ ঘণ্টা",
    
    // State: Approved
    approvedBadge: "✅ অনুমোদিত",
    approvedTitle: "KYC সফলভাবে যাচাইকৃত!",
    approvedSub: "অভিনন্দন! আপনার পরিচয় যাচাই সম্পন্ন হয়েছে। সম্পূর্ণ সুবিধা এখন উপলব্ধ।",
    approvedInfoTitle: "অ্যাকাউন্ট সম্পূর্ণ সক্রিয়!",
    approvedInfoText: "আপনার KYC অনুমোদিত হয়েছে। সকল সীমা আনলক হয়েছে এবং আপনি সম্পূর্ণ সুবিধা উপভোগ করতে পারবেন।",
    approvedDot4Time: "✅ অনুমোদিত",
    approvedDot5Time: "✅ অ্যাকাউন্ট সক্রিয়",
    
    // State: Rejected
    rejectedBadge: "❌ প্রত্যাখ্যাত",
    rejectedTitle: "যাচাই সফল হয়নি",
    rejectedSub: "দুঃখিত, আপনার কাগজপত্র গ্রহণযোগ্য হয়নি। নতুনভাবে জমা দিন।",
    rejectedInfoTitle: "কারণ: ছবি অস্পষ্ট",
    rejectedInfoText: "আপনার NID ছবি স্পষ্ট নয়। দয়া করে ভালো আলোতে পুনরায় ছবি তুলুন এবং জমা দিন।",
    rejectedDot4Time: "❌ প্রত্যাখ্যাত",
    
    // Buttons
    getHelp: "সাহায্য নিন",
    getUpdates: "আপডেট পান",
    
    // Toast
    supportNumber: "📞 সাপোর্ট: 01700-000000",
    updatesSent: "📧 আপডেট পাঠানো হবে",
    
    // Status Icons
    pendingIcon: "📋",
    reviewingIcon: "⏳",
    approvedIcon: "✅",
    rejectedIcon: "❌",
  }
};

const KycStatusPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [currentState, setCurrentState] = useState("reviewing");
  const [toast, setToast] = useState({ show: false, message: "" });

  // Translation function
  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  const states = ["pending", "reviewing", "approved", "rejected"];

  // Build content dynamically using translation function
  const getContent = () => ({
    back: t('backDashboard'),
    backTitle: t('backTitle'),
    header: t('header'),
    tabs: [t('pending'), t('reviewing'), t('approved'), t('rejected')],
    sectionTitles: [
      t('verificationProgress'),
      t('submittedDocuments'),
      t('accountLimits'),
    ],
    steps: [
      {
        title: t('step1Title'),
        sub: t('step1Sub'),
        time: t('step1Time'),
      },
      {
        title: t('step2Title'),
        sub: t('step2Sub'),
        time: t('step2Time'),
      },
      {
        title: t('step3Title'),
        sub: t('step3Sub'),
        time: t('step3Time'),
      },
      {
        title: t('step4Title'),
        sub: t('step4Sub'),
        time: t('step4Time'),
      },
      {
        title: t('step5Title'),
        sub: t('step5Sub'),
        time: t('step5Time'),
      },
    ],
    docs: [
      { badge: t('docOk'), badgeClass: "ok", icon: "🪪", name: t('docNidFront') },
      { badge: t('docOk'), badgeClass: "ok", icon: "🪪", name: t('docNidBack') },
      { badge: t('docOk'), badgeClass: "ok", icon: "🤳", name: t('docSelfie') },
      { badge: t('docChecking'), badgeClass: "pending", icon: "📋", name: t('docApplication') },
    ],
    limitsHead: [t('benefit'), t('currentLimit'), t('afterKyc')],
    limits: [
      [t('dailyDeposit'), "৳৫,০০০", "৳৫০,০০০"],
      [t('monthlyWithdrawal'), "৳২০,০০০", "৳২,০০,০০০"],
      [t('activeGoals'), "৩টি", "অসীমিত"],
      [t('referralBonus'), "৳২৫০", "৳৫০০"],
      [t('familyCircle'), "❌", "✅"],
    ],
    stateData: {
      pending: {
        icon: t('pendingIcon'),
        circleClass: "pending",
        badgeClass: "pending",
        badge: t('pendingBadge'),
        title: t('pendingTitle'),
        sub: t('pendingSub'),
        infoType: "warning",
        infoIcon: "⏳",
        infoTitle: t('pendingInfoTitle'),
        infoText: t('pendingInfoText'),
        trackPct: "55%",
        dot4Icon: t('pendingDot4Icon'),
        dot5Icon: t('pendingDot5Icon'),
        dot4Time: t('pendingDot4Time'),
        dot5Time: t('pendingDot5Time'),
      },
      reviewing: {
        icon: t('reviewingIcon'),
        circleClass: "reviewing",
        badgeClass: "reviewing",
        badge: t('reviewingBadge'),
        title: t('reviewingTitle'),
        sub: t('reviewingSub'),
        infoType: "info",
        infoIcon: "🔍",
        infoTitle: t('reviewingInfoTitle'),
        infoText: t('reviewingInfoText'),
        trackPct: "75%",
        dot4Class: "active",
        dot4Icon: "🔍",
        dot4Time: t('reviewingDot4Time'),
        dot5Icon: "🔓",
        dot5Time: t('pendingDot5Time'),
      },
      approved: {
        icon: t('approvedIcon'),
        circleClass: "approved",
        badgeClass: "approved",
        badge: t('approvedBadge'),
        title: t('approvedTitle'),
        sub: t('approvedSub'),
        infoType: "success",
        infoIcon: "🎉",
        infoTitle: t('approvedInfoTitle'),
        infoText: t('approvedInfoText'),
        trackPct: "100%",
        dot4Class: "done",
        dot4Icon: "✓",
        dot4Time: t('approvedDot4Time'),
        dot5Class: "done",
        dot5Icon: "✓",
        dot5Time: t('approvedDot5Time'),
      },
      rejected: {
        icon: t('rejectedIcon'),
        circleClass: "rejected",
        badgeClass: "rejected",
        badge: t('rejectedBadge'),
        title: t('rejectedTitle'),
        sub: t('rejectedSub'),
        infoType: "error",
        infoIcon: "⚠️",
        infoTitle: t('rejectedInfoTitle'),
        infoText: t('rejectedInfoText'),
        trackPct: "55%",
        dot4Class: "failed",
        dot4Icon: "✗",
        dot4Time: t('rejectedDot4Time'),
        dot5Icon: "🔓",
        dot5Time: t('pendingDot5Time'),
      },
    },
  });

  const data = getContent();
  const stateData = data.stateData[currentState];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");

    // Get language from localStorage
    const savedLang = localStorage.getItem('appLanguage') || 'bn';
    setLang(savedLang);
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

  const getStatusIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertCircle size={24} className="text-amber-500" />;
      case "info":
        return <HelpCircle size={24} className="text-blue-500" />;
      case "success":
        return <CheckCircle size={24} className="text-green-500" />;
      case "error":
        return <XCircle size={24} className="text-red-500" />;
      default:
        return <Clock size={24} className="text-primary" />;
    }
  };

  const getDotClass = (stepClass) => {
    if (stepClass === "done") return "bg-success text-white border-success";
    if (stepClass === "active")
      return "bg-white border-warning text-warning animate-pulse";
    if (stepClass === "failed") return "bg-danger text-white border-danger";
    return "bg-card border-border";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15 sticky top-0 z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> {data.back}
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">
          {data.backTitle}
        </span>
      </div>

      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary-light px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1">{data.header}</h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => {
            const newLang = lang === "bn" ? "en" : "bn";
            setLang(newLang);
            localStorage.setItem('appLanguage', newLang);
          }}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
      </div>

      {/* Status Hero */}
      <div className="bg-linear-to-r from-primary to-primary-light px-5 pb-6 text-center">
        <div
          className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl border-4 border-white/40
          ${
            stateData.circleClass === "reviewing"
              ? "bg-blue-500/30 animate-pulse"
              : stateData.circleClass === "approved"
                ? "bg-green-500/30"
                : stateData.circleClass === "rejected"
                  ? "bg-red-500/30"
                  : "bg-amber-500/30"
          }`}
        >
          {stateData.icon}
        </div>
        <div
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-2
          ${
            stateData.badgeClass === "pending"
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
              : stateData.badgeClass === "reviewing"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : stateData.badgeClass === "approved"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {stateData.badge}
        </div>
        <div className="text-white text-xl font-bold mb-1">
          {stateData.title}
        </div>
        <div className="text-white/80 text-sm whitespace-pre-line">
          {stateData.sub}
        </div>
      </div>

      {/* Demo Tabs */}
      <div className="flex gap-0 bg-card border-b border-border overflow-x-auto">
        {states.map((state, idx) => (
          <button
            key={state}
            onClick={() => setCurrentState(state)}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition ${
              currentState === state
                ? "text-primary border-primary"
                : "text-foreground/50 border-transparent"
            }`}
          >
            {data.tabs[idx]}
          </button>
        ))}
      </div>

      <div className="p-4 pb-24">
        {/* Info Banner */}
        <div
          className={`rounded-xl p-4 mb-4 flex gap-3 ${
            stateData.infoType === "warning"
              ? "bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800"
              : stateData.infoType === "info"
                ? "bg-blue-50 border border-blue-200 dark:bg-blue-950/30 dark:border-blue-800"
                : stateData.infoType === "success"
                  ? "bg-green-50 border border-green-200 dark:bg-green-950/30 dark:border-green-800"
                  : "bg-red-50 border border-red-200 dark:bg-red-950/30 dark:border-red-800"
          }`}
        >
          <div className="text-2xl">{stateData.infoIcon}</div>
          <div>
            <div className="font-bold text-foreground text-sm">
              {stateData.infoTitle}
            </div>
            <div className="text-sm text-foreground/60">
              {stateData.infoText}
            </div>
          </div>
        </div>

        {/* Progress Track */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow">
          <div className="font-bold text-foreground mb-4">
            {data.sectionTitles[0]}
          </div>
          <div className="relative pl-6">
            <div className="absolute left-4.5 top-0 bottom-0 w-0.5 bg-border" />
            <div
              className="absolute left-4.5 top-0 w-0.5 bg-linear-to-b from-primary to-primary-light transition-all duration-700"
              style={{ height: stateData.trackPct }}
            />

            {data.steps.map((step, idx) => {
              let dotClass =
                "w-9 h-9 rounded-full border-3 flex items-center justify-center text-sm relative z-10 bg-card";
              let dotContent = "";
              let timeClass = "text-xs text-foreground/50";

              if (idx === 3 && stateData.dot4Class) {
                if (stateData.dot4Class === "done") {
                  dotClass += " bg-success border-success text-white";
                  dotContent = "✓";
                  timeClass = "text-success";
                } else if (stateData.dot4Class === "active") {
                  dotClass += " border-warning text-warning animate-pulse";
                  dotContent = stateData.dot4Icon;
                  timeClass = "text-warning";
                } else if (stateData.dot4Class === "failed") {
                  dotClass += " bg-danger border-danger text-white";
                  dotContent = "✗";
                  timeClass = "text-danger";
                } else {
                  dotClass += " border-border";
                  dotContent = stateData.dot4Icon;
                }
              } else if (idx === 4 && stateData.dot5Class === "done") {
                dotClass += " bg-success border-success text-white";
                dotContent = "✓";
                timeClass = "text-success";
              } else if (idx < 3) {
                dotClass += " bg-success border-success text-white";
                dotContent = "✓";
                timeClass = "text-success";
              } else {
                dotClass += " border-border";
                dotContent =
                  idx === 3
                    ? stateData.dot4Icon || "🔍"
                    : stateData.dot5Icon || "🔓";
              }

              let timeText = step.time;
              if (idx === 3 && stateData.dot4Time)
                timeText = stateData.dot4Time;
              if (idx === 4 && stateData.dot5Time)
                timeText = stateData.dot5Time;

              return (
                <div key={idx} className="flex gap-4 pb-6 last:pb-0 relative">
                  <div className={dotClass}>{dotContent}</div>
                  <div className="flex-1 pt-1">
                    <div className="font-bold text-sm text-foreground">
                      {step.title}
                    </div>
                    <div className="text-xs text-foreground/60 mt-0.5">
                      {step.sub}
                    </div>
                    <div
                      className={`text-xs mt-1.5 ${timeClass === "text-success" ? "text-green-500" : timeClass === "text-warning" ? "text-amber-500" : timeClass === "text-danger" ? "text-red-500" : "text-foreground/50"}`}
                    >
                      {timeText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submitted Documents */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow">
          <div className="font-bold text-foreground mb-4">
            {data.sectionTitles[1]}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {data.docs.map((doc, idx) => (
              <div
                key={idx}
                className="border-2 border-border rounded-xl p-3 text-center relative"
              >
                <div
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold
                  ${
                    doc.badgeClass === "ok"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {doc.badge}
                </div>
                <div className="text-3xl mb-2">{doc.icon}</div>
                <div className="font-semibold text-xs text-foreground">
                  {doc.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Limits */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow">
          <div className="font-bold text-foreground mb-4">
            {data.sectionTitles[2]}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {data.limitsHead.map((head, idx) => (
                    <th
                      key={idx}
                      className="py-2 px-3 text-left text-xs font-semibold text-foreground/60 uppercase"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.limits.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-3 px-3 text-sm text-foreground">
                      {row[0]}
                    </td>
                    <td
                      className={`py-3 px-3 text-sm ${currentState !== "approved" ? "text-red-500" : "text-green-500"}`}
                    >
                      {row[1]}
                    </td>
                    <td className="py-3 px-3 text-sm text-green-500">
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => showToast(t('supportNumber'))}
            className="flex-1 py-3 rounded-xl border-2 border-border text-foreground text-sm font-bold hover:border-primary transition"
          >
            {t('getHelp')}
          </button>
          <button
            onClick={() => showToast(t('updatesSent'))}
            className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold"
          >
            {t('getUpdates')}
          </button>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KycStatusPage;