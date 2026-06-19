"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Moon, Sun, Download, Share2, Camera } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import useAuth from "../../../hooks/useAuth";

// Translations
const translations = {
  en: {
    // Navigation
    dashboard: "Dashboard",
    taxCertificate: "Tax Certificate",
    
    // Header
    annualSavingsCertificate: "🏅 Annual Savings Certificate",
    
    // Year Selector
    financialYear: "Financial Year",
    
    // Certificate
    certificateTitle: "Annual Savings Certificate",
    certificateSubtitle: "Annual Savings Certificate",
    presentedTo: "This certificate is presented to",
    recognition: "In recognition of consistent savings during the financial year",
    totalAnnualSavings: "Total Annual Savings",
    noSavingsData: "No savings data for this year",
    maxStreak: "Max Streak",
    totalDeposits: "Total Deposits",
    tier: "Tier",
    savingsByGoal: "Savings by Goal",
    noGoalsFound: "No goals found",
    community: "Sanchoy Bondhu Community",
    digitalSignature: "Digital Signature",
    certificateNo: "Certificate No.",
    issueDate: "Issue Date",
    
    // Buttons
    pdfDownload: "PDF Download",
    share: "Share",
    saveAsImage: "Save as Image",
    
    // Toast Messages
    printing: "🖨️ Printing...",
    sharing: "📤 Sharing...",
    savingImage: "🖼️ Image is being saved...",
  },
  bn: {
    // Navigation
    dashboard: "ড্যাশবোর্ড",
    taxCertificate: "ট্যাক্স সার্টিফিকেট",
    
    // Header
    annualSavingsCertificate: "🏅 বার্ষিক সঞ্চয় সার্টিফিকেট",
    
    // Year Selector
    financialYear: "আর্থিক বছর",
    
    // Certificate
    certificateTitle: "বার্ষিক সঞ্চয় সার্টিফিকেট",
    certificateSubtitle: "বার্ষিক সঞ্চয় সার্টিফিকেট",
    presentedTo: "এই সার্টিফিকেটটি প্রদান করা হলো",
    recognition: "আর্থিক বছরে ধারাবাহিক সঞ্চয়ের স্বীকৃতিস্বরূপ",
    totalAnnualSavings: "মোট বার্ষিক সঞ্চয়",
    noSavingsData: "এই বছরের জন্য কোন সঞ্চয়ের তথ্য নেই",
    maxStreak: "সর্বোচ্চ ধারা",
    totalDeposits: "মোট ডিপোজিট",
    tier: "স্তর",
    savingsByGoal: "লক্ষ্য অনুযায়ী সঞ্চয়",
    noGoalsFound: "কোন লক্ষ্য পাওয়া যায়নি",
    community: "সঞ্চয় বন্ধু কমিউনিটি",
    digitalSignature: "ডিজিটাল স্বাক্ষর",
    certificateNo: "সার্টিফিকেট নং",
    issueDate: "প্রকাশের তারিখ",
    
    // Buttons
    pdfDownload: "পিডিএফ ডাউনলোড",
    share: "শেয়ার",
    saveAsImage: "ছবি হিসেবে সেভ করুন",
    
    // Toast Messages
    printing: "🖨️ প্রিন্ট হচ্ছে...",
    sharing: "📤 শেয়ার হচ্ছে...",
    savingImage: "🖼️ ছবি সংরক্ষণ করা হচ্ছে...",
  }
};

const TaxCertificatePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [year, setYear] = useState(2025);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [streak, setStreak] = useState(0);
  const [depositCount, setDepositCount] = useState(0);
  const [tier, setTier] = useState("—");
  const [lang, setLang] = useState("bn");
  const certificateRef = useRef(null);

  const { user } = useAuth();

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");

    const savedLang = localStorage.getItem('appLanguage') || 'bn';
    setLang(savedLang);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (token) {
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        const [goalsRes, depositsRes, userRes] = await Promise.all([
          axiosInstance.get("/goals").catch(() => ({ data: { success: false, data: [] } })),
          axiosInstance.get("/deposits").catch(() => ({ data: { success: false, data: [] } })),
          axiosInstance.get("/users/me").catch(() => ({ data: { success: false, data: {} } })),
        ]);

        const goalsData = goalsRes.data.success ? goalsRes.data.data : [];
        const depositsData = depositsRes.data.success ? depositsRes.data.data : [];
        const userData = userRes.data.success ? userRes.data.data : {};

        setGoals(goalsData);
        setDeposits(depositsData);
        setStreak(userData.streak || 0);
        setDepositCount(depositsData.length || 0);
        setTier(userData.tier || "—");
      } catch (error) {
        console.error("Error fetching certificate data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [year]);

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

  const toBangla = (num) => {
    return num.toString().replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
  };

  const changeYear = (delta) => {
    setYear((prev) => prev + delta);
  };

  const printDocument = () => {
    document.body.setAttribute(
      "data-print-date",
      new Date().toLocaleDateString(),
    );
    window.print();
    showToast(t('printing'));
  };

  const shareCertificate = () => {
    showToast(t('sharing'));
  };

  const saveAsImage = () => {
    showToast(t('savingImage'));
  };

  const currentYear = year;
  const nextYear = year + 1;
  const banglaYear = toBangla(currentYear);
  const banglaNextYear = toBangla(nextYear);

  const financialYearStart = `July ${currentYear}`;
  const financialYearEnd = `June ${nextYear}`;

  const startDate = new Date(`${currentYear}-07-01T00:00:00`);
  const endDate = new Date(`${nextYear}-06-30T23:59:59`);

  const yearDeposits = deposits.filter((d) => {
    const date = new Date(d.createdAt || d.date);
    return date >= startDate && date <= endDate;
  });

  const totalAnnualSavings = yearDeposits.reduce(
    (sum, d) => sum + (parseFloat(d.amount) || 0),
    0
  );

  const hasData = yearDeposits.length > 0;

  const userName = user?.name || "—";
  const userId = user?._id || user?.id || "UNKNOWN";
  const certificateNumber = `AMN-CERT-${currentYear}-${userId.toString().slice(-6).toUpperCase()}`;
  const issueDate = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const goalSavings = goals.map((goal) => {
    const goalDeposits = yearDeposits.filter((d) => d.goalId === goal._id || d.goal === goal._id);
    const amount = goalDeposits.reduce((sum, d) => sum + (parseFloat(d.amount) || 0), 0);
    return {
      icon: goal.icon || "🎯",
      name: goal.name || "Goal",
      amount,
    };
  });

  const activeGoals = goalSavings.filter((g) => g.amount > 0);
  const displayGoals = activeGoals.length > 0 ? activeGoals : goalSavings;
  const maxGoalAmount = Math.max(...displayGoals.map((g) => g.amount), 1);

  const formatBDT = (amount) => {
    if (!amount || amount === 0) return "৳0";
    return `৳${amount.toLocaleString("en-IN")}`;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15 sticky top-0 z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> {t('dashboard')}
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">
          {t('taxCertificate')}
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
        <h1 className="text-white text-lg font-bold flex-1">
          {t('annualSavingsCertificate')}
        </h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="p-4 pb-24">
        {/* Year Selector */}
        <div className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-4 mb-4 shadow">
          <button
            onClick={() => changeYear(-1)}
            className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-lg hover:border-primary transition"
          >
            ‹
          </button>
          <div className="text-center">
            <div className="text-xl font-bold text-foreground">
              {banglaYear}-{banglaNextYear}
            </div>
            <div className="text-xs text-foreground/50">{t('financialYear')}</div>
          </div>
          <button
            onClick={() => changeYear(1)}
            className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-lg hover:border-primary transition"
          >
            ›
          </button>
        </div>

        {/* Certificate */}
        <div className="bg-card rounded-xl border-2 border-primary shadow-lg overflow-hidden relative mb-4">
          <div className="absolute inset-1 border border-dashed border-primary/30 rounded-lg pointer-events-none" />

          {/* Certificate Header */}
          <div className="bg-linear-to-r from-primary to-primary-light pt-7 pb-6 text-center">
            <div className="text-white/80 text-[10px] tracking-wider uppercase mb-1">
              {t('community')}
            </div>
            <div className="text-white text-xl font-bold mb-1">
              {t('certificateTitle')}
            </div>
            <div className="text-white/75 text-xs">
              {t('certificateSubtitle')}
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 mx-auto mt-3 flex items-center justify-center text-2xl">
              🌿
            </div>
          </div>

          {/* Certificate Body */}
          <div className="p-5">
            <div className="text-xs text-foreground/60 text-center mb-1">
              {t('presentedTo')}
            </div>
            <div className="text-2xl font-bold text-primary text-center mb-1 italic">
              {userName}
            </div>
            <div className="text-xs text-foreground/60 text-center leading-relaxed mb-5">
              {t('recognition')} {banglaYear}-{banglaNextYear}
            </div>

            <div className="bg-linear-to-r from-primary/10 to-primary-light/10 border border-primary/30 rounded-xl p-4 text-center mb-5">
              <div className="text-[10px] text-foreground/60 mb-1">
                {t('totalAnnualSavings')}
              </div>
              <div className="text-3xl font-bold text-primary">
                {formatBDT(totalAnnualSavings)}
              </div>
              <div className="text-xs text-foreground/60 mt-1">
                {financialYearStart} — {financialYearEnd}
              </div>
              {!hasData && (
                <div className="text-xs text-foreground/40 mt-2">
                  {t('noSavingsData')}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="bg-background rounded-lg p-2 text-center border border-border">
                <div className="text-base font-bold text-foreground">{streak}</div>
                <div className="text-[9px] text-foreground/50">{t('maxStreak')}</div>
              </div>
              <div className="bg-background rounded-lg p-2 text-center border border-border">
                <div className="text-base font-bold text-foreground">{depositCount}</div>
                <div className="text-[9px] text-foreground/50">
                  {t('totalDeposits')}
                </div>
              </div>
              <div className="bg-background rounded-lg p-2 text-center border border-border">
                <div className="text-base font-bold text-foreground">{tier}</div>
                <div className="text-[9px] text-foreground/50">{t('tier')}</div>
              </div>
            </div>

            <div className="mb-5">
              <div className="text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">
                {t('savingsByGoal')}
              </div>
              {displayGoals.length === 0 ? (
                <div className="text-xs text-foreground/40 text-center py-4">
                  {t('noGoalsFound')}
                </div>
              ) : (
                displayGoals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2 py-2 border-b border-border last:border-0"
                  >
                    <span className="text-base">{goal.icon}</span>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-foreground">
                        {goal.name}
                      </div>
                      <div className="h-1 bg-border rounded-full mt-1 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-primary to-primary-light"
                          style={{ width: `${(goal.amount / maxGoalAmount) * 100}%` }}
                        />
                      </div>
                    </div>
                    <span className="text-xs font-bold text-primary">
                      {formatBDT(goal.amount)}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="border-t border-dashed border-border py-4 px-5 flex justify-between items-end">
            <div className="text-center">
              <div className="w-16 h-px bg-foreground/50 mx-auto mb-1" />
              <div className="text-[9px] text-foreground/50">
                {t('community')}
              </div>
              <div className="text-[8px] text-foreground/50">
                {t('digitalSignature')}
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-[9px] text-foreground/50">
                {certificateNumber}
              </div>
              <div className="text-[8px] text-foreground/50">
                {t('certificateNo')}
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-px bg-foreground/50 mx-auto mb-1" />
              <div className="text-[9px] text-foreground/50">{issueDate}</div>
              <div className="text-[8px] text-foreground/50">{t('issueDate')}</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={printDocument}
            className="py-3.5 rounded-xl bg-linear-to-r from-red-600 to-red-700 text-white text-sm font-bold flex items-center justify-center gap-2"
          >
            <Download size={16} /> {t('pdfDownload')}
          </button>
          <button
            onClick={shareCertificate}
            className="py-3.5 rounded-xl bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold flex items-center justify-center gap-2"
          >
            <Share2 size={16} /> {t('share')}
          </button>
        </div>
        <button
          onClick={saveAsImage}
          className="w-full py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm font-bold flex items-center justify-center gap-2"
        >
          <Camera size={16} /> {t('saveAsImage')}
        </button>
      </div>

      {/* Toast */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap"
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
};

export default TaxCertificatePage;