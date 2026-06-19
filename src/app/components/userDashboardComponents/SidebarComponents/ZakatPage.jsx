"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun, Loader2, Calculator, TrendingUp, Wallet, Target, Share2, RefreshCw, Copy, Camera, MessageCircle, Award, Coins, Gem, Landmark, HandCoins } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

// Translations
const translations = {
  en: {
    // Header
    zakatCalculator: "Zakat Calculator",
    
    // Hero
    calculateYourZakat: "Calculate Your Zakat",
    findZakatAmount: "Find your annual Zakat amount according to Islamic Shariah",
    
    // Rates
    todaysGoldRate: "Today's Gold Rate (per gram):",
    todaysSilverRate: "Today's Silver Rate (per gram):",
    ratesNote: "* Rates are user-provided. Please check current market rates.",
    
    // Nisab
    nisab: "Nisab (Gold 85g)",
    
    // Assets
    assets: "Assets",
    cashSavings: "Cash & Savings",
    cash: "Cash",
    cashSub: "In hand & bank",
    sanchoy: "Sonchoy Bondhu",
    sanchoySub: "Total across all goals",
    mobile: "bKash / Nagad",
    mobileSub: "Mobile banking balance",
    investments: "Investments",
    investmentsSub: "Shares, mutual funds",
    goldSilver: "Gold & Silver",
    goldGrams: "Gold (grams)",
    goldSub: "Excluding jewelry in use",
    silverGrams: "Silver (grams)",
    silverSub: "595g = 1 Nisab",
    businessAssets: "Business Assets",
    businessStock: "Business Stock",
    businessStockSub: "At market value",
    receivables: "Receivables",
    receivablesSub: "Money owed to you",
    
    // Liabilities
    liabilities: "Liabilities",
    debtsPayables: "Debts & Payables",
    loans: "Loans",
    loansSub: "Annual repayment amount",
    outstandingBills: "Outstanding Bills",
    billsSub: "Rent, utilities etc.",
    otherDebts: "Other Debts",
    otherDebtsSub: "Personal loans",
    
    // Results
    yourZakatThisYear: "Your Zakat This Year",
    zakatRateInfo: "2.5% of net wealth · May Allah accept it",
    belowNisab: "Your wealth is below Nisab",
    belowNisabDesc: "Your total wealth is below the Nisab of {nisab} — Zakat is not obligatory this year.",
    
    // Breakdown
    breakdown: "Breakdown",
    totalAssets: "Total Assets",
    totalLiabilities: "Total Liabilities",
    zakatableWealth: "Zakatable Wealth",
    zakatDue: "Zakat Due",
    zakatRate: "Zakat Rate",
    
    // Buttons
    reset: "Reset",
    share: "Share",
    calculateZakat: "Calculate Zakat",
    createGoal: "Create Goal",
    createZakatGoal: "Create a Zakat Goal",
    setAsideZakat: "Set aside your Zakat amount separately",
    close: "Close",
    goToDashboard: "Go to Dashboard",
    
    // Share Modal
    copy: "Copy",
    screenshot: "Screenshot",
    whatsapp: "WhatsApp",
    copied: "Copied!",
    takeScreenshot: "Take a screenshot",
    
    // Toast Messages
    resetDone: "Reset done",
    cannotCreateGoal: "Cannot create goal when zakat amount is zero",
    zakatGoalCreated: "Zakat Goal Created!",
    zakatGoalDesc: "A new goal has been created to save your zakat separately.",
    amount: "Amount",
    failedToCalculate: "Failed to calculate zakat",
    failedToCreateGoal: "Failed to create zakat goal",
    success: "Success!",
    error: "Error!",
  },
  bn: {
    // Header
    zakatCalculator: "যাকাত ক্যালকুলেটর",
    
    // Hero
    calculateYourZakat: "আপনার যাকাত গণনা করুন",
    findZakatAmount: "ইসলামি শরীয়াহ অনুযায়ী আপনার বার্ষিক যাকাতের পরিমাণ নির্ণয় করুন",
    
    // Rates
    todaysGoldRate: "আজকের সোনার দাম (প্রতি গ্রাম):",
    todaysSilverRate: "আজকের রূপার দাম (প্রতি গ্রাম):",
    ratesNote: "* দাম ব্যবহারকারী প্রদত্ত। বর্তমান বাজার দর যাচাই করুন।",
    
    // Nisab
    nisab: "নিসাব (সোনা ৮৫ গ্রাম)",
    
    // Assets
    assets: "সম্পত্তি",
    cashSavings: "নগদ ও সঞ্চয়",
    cash: "নগদ",
    cashSub: "হাতে ও ব্যাংকে",
    sanchoy: "সঞ্চয় বন্ধু",
    sanchoySub: "সব গোলের মোট সঞ্চয়",
    mobile: "বিকাশ / নগদ",
    mobileSub: "মোবাইল ব্যাংকিং ব্যালেন্স",
    investments: "বিনিয়োগ",
    investmentsSub: "শেয়ার, মিউচুয়াল ফান্ড",
    goldSilver: "সোনা ও রূপা",
    goldGrams: "সোনা (গ্রাম)",
    goldSub: "ব্যবহৃত গহনা বাদে",
    silverGrams: "রূপা (গ্রাম)",
    silverSub: "৫৯৫ গ্রাম = ১ নিসাব",
    businessAssets: "ব্যবসায়িক সম্পদ",
    businessStock: "ব্যবসায়িক পণ্য",
    businessStockSub: "বাজার মূল্যে",
    receivables: "প্রাপ্য",
    receivablesSub: "আপনার পাওনা টাকা",
    
    // Liabilities
    liabilities: "দায়",
    debtsPayables: "ঋণ ও প্রদেয়",
    loans: "ঋণ",
    loansSub: "বার্ষিক পরিশোধের পরিমাণ",
    outstandingBills: "বকেয়া বিল",
    billsSub: "ভাড়া, ইউটিলিটি ইত্যাদি",
    otherDebts: "অন্যান্য ঋণ",
    otherDebtsSub: "ব্যক্তিগত ঋণ",
    
    // Results
    yourZakatThisYear: "আপনার যাকাত এই বছর",
    zakatRateInfo: "নিট সম্পদের ২.৫% · আল্লাহ কবুল করুন",
    belowNisab: "আপনার সম্পদ নিসাবের নিচে",
    belowNisabDesc: "আপনার মোট সম্পদ {nisab} এর নিচে — এই বছর যাকাত দেয়া আবশ্যক নয়।",
    
    // Breakdown
    breakdown: "বিবরণী",
    totalAssets: "মোট সম্পদ",
    totalLiabilities: "মোট দায়",
    zakatableWealth: "যাকাতযোগ্য সম্পদ",
    zakatDue: "যাকাত প্রদেয়",
    zakatRate: "যাকাতের হার",
    
    // Buttons
    reset: "রিসেট",
    share: "শেয়ার",
    calculateZakat: "যাকাত গণনা করুন",
    createGoal: "গোল তৈরি করুন",
    createZakatGoal: "যাকাত গোল তৈরি করুন",
    setAsideZakat: "আপনার যাকাতের পরিমাণ আলাদা রাখুন",
    close: "বন্ধ করুন",
    goToDashboard: "ড্যাশবোর্ডে যান",
    
    // Share Modal
    copy: "কপি",
    screenshot: "স্ক্রিনশট",
    whatsapp: "হোয়াটসঅ্যাপ",
    copied: "কপি হয়েছে!",
    takeScreenshot: "স্ক্রিনশট নিন",
    
    // Toast Messages
    resetDone: "রিসেট সম্পন্ন",
    cannotCreateGoal: "যাকাতের পরিমাণ শূন্য হলে গোল তৈরি করা যাবে না",
    zakatGoalCreated: "যাকাত গোল তৈরি হয়েছে!",
    zakatGoalDesc: "আপনার যাকাত আলাদাভাবে সংরক্ষণের জন্য একটি নতুন গোল তৈরি করা হয়েছে।",
    amount: "পরিমাণ",
    failedToCalculate: "যাকাত গণনা করতে ব্যর্থ হয়েছে",
    failedToCreateGoal: "যাকাত গোল তৈরি করতে ব্যর্থ হয়েছে",
    success: "সফল!",
    error: "ত্রুটি!",
  }
};

const ZakatPage = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [loading, setLoading] = useState(false);
  const [goldRate, setGoldRate] = useState(11000);
  const [silverRate, setSilverRate] = useState(130);
  const [assets, setAssets] = useState({
    cash: 0,
    sanchoy: 0,
    mobile: 0,
    invest: 0,
    gold_g: 0,
    silver_g: 0,
    stock: 0,
    recv: 0,
  });
  const [liabilities, setLiabilities] = useState({
    loan: 0,
    bills: 0,
    other: 0,
  });
  const [result, setResult] = useState({
    totalAssets: 0,
    totalLiabilities: 0,
    net: 0,
    zakat: 0,
    aboveNisab: false,
  });
  const [showShareModal, setShowShareModal] = useState(false);
  const [saving, setSaving] = useState(false);

  const ZAKAT_RATE = 0.025;

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
    
    const savedCalculation = localStorage.getItem("zakatCalculation");
    if (savedCalculation) {
      const data = JSON.parse(savedCalculation);
      setAssets(data.assets || assets);
      setLiabilities(data.liabilities || liabilities);
      setGoldRate(data.goldRate || 11000);
      setSilverRate(data.silverRate || 130);
    }
  }, []);

  useEffect(() => {
    const savedCalculation = localStorage.getItem("zakatCalculation");
    const data = savedCalculation ? JSON.parse(savedCalculation) : {};
    localStorage.setItem("zakatCalculation", JSON.stringify({
      ...data,
      goldRate,
      silverRate,
    }));
  }, [goldRate, silverRate]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message, type = "success") => {
    Swal.fire({
      title: type === "success" ? t('success') : t('error'),
      text: message,
      icon: type,
      timer: 2000,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  };

  const getNisab = useCallback(() => {
    return goldRate * 85;
  }, [goldRate]);

  const calculateZakat = useCallback(async () => {
    setLoading(true);
    
    try {
      const response = await axiosInstance.post("/zakat/calculate", {
        goldRate,
        silverRate,
        assets,
        liabilities,
      });
      
      if (response.data.success) {
        setResult(response.data.data);
        
        localStorage.setItem("zakatCalculation", JSON.stringify({
          assets,
          liabilities,
          goldRate,
          silverRate,
          result: response.data.data,
          timestamp: new Date().toISOString(),
        }));
        
        await axiosInstance.post("/zakat/save", {
          goldRate,
          silverRate,
          assets,
          liabilities,
          ...response.data.data,
        });
      }
    } catch (error) {
      console.error("Calculate zakat error:", error);
      showToast(error.response?.data?.message || t('failedToCalculate'), "error");
    } finally {
      setLoading(false);
    }
  }, [goldRate, silverRate, assets, liabilities]);

  const updateAsset = useCallback((field, value) => {
    setAssets((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  }, []);

  const updateLiability = useCallback((field, value) => {
    setLiabilities((prev) => ({ ...prev, [field]: parseFloat(value) || 0 }));
  }, []);

  const resetCalculator = useCallback(() => {
    setAssets({
      cash: 0,
      sanchoy: 0,
      mobile: 0,
      invest: 0,
      gold_g: 0,
      silver_g: 0,
      stock: 0,
      recv: 0,
    });
    setLiabilities({ loan: 0, bills: 0, other: 0 });
    setGoldRate(11000);
    setSilverRate(130);
    setResult({
      totalAssets: 0,
      totalLiabilities: 0,
      net: 0,
      zakat: 0,
      aboveNisab: false,
    });
    showToast(t('resetDone'), "success");
  }, [lang]);

  const createZakatGoal = async () => {
    if (result.zakat <= 0) {
      showToast(t('cannotCreateGoal'), "error");
      return;
    }
    
    setSaving(true);
    
    try {
      const response = await axiosInstance.post("/zakat/create-goal", {
        zakatAmount: result.zakat,
        description: `Zakat savings for ${new Date().getFullYear()}`,
      });
      
      if (response.data.success) {
        Swal.fire({
          title: t('zakatGoalCreated'),
          html: lang === "bn"
            ? `${t('zakatGoalDesc')}<br/><strong>${t('amount')}: ৳${result.zakat.toLocaleString()}</strong>`
            : `${t('zakatGoalDesc')}<br/><strong>${t('amount')}: ৳${result.zakat.toLocaleString()}</strong>`,
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: t('goToDashboard'),
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/dashboard/goals");
          }
        });
      }
    } catch (error) {
      console.error("Create zakat goal error:", error);
      showToast(error.response?.data?.message || t('failedToCreateGoal'), "error");
    } finally {
      setSaving(false);
    }
  };

  const openShareModal = useCallback(() => {
    setShowShareModal(true);
  }, []);

  const closeShareModal = useCallback(() => {
    setShowShareModal(false);
  }, []);

  const shareAction = useCallback(
    (type) => {
      const amt = Math.round(result.zakat).toLocaleString("en-IN");
      const msg =
        lang === "bn"
          ? `আমার যাকাত এই বছর: ৳${amt}\n\nসঞ্চয় বন্ধু দিয়ে আপনার যাকাত গণনা করুন`
          : `My Zakat this year: ৳${amt}\n\nCalculate yours with Sanchoy Bondhu`;

      if (type === "copy") {
        navigator.clipboard.writeText(msg);
        showToast(t('copied'), "success");
      } else if (type === "whatsapp") {
        window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank");
      } else {
        showToast(t('takeScreenshot'), "info");
      }
      closeShareModal();
    },
    [result.zakat, lang, showToast, closeShareModal],
  );

  useEffect(() => {
    calculateZakat();
  }, []);

  const nisab = getNisab();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 px-5 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1 flex items-center gap-2">
          <Calculator size={20} /> {t('zakatCalculator')}
        </h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-emerald-700 to-emerald-800 px-5 pb-7 text-center">
        <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-3">
          <HandCoins size={32} className="text-white" />
        </div>
        <div className="text-white text-xl font-bold mb-1">
          {t('calculateYourZakat')}
        </div>
        <div className="text-white/80 text-sm">
          {t('findZakatAmount')}
        </div>
      </div>

      <div className="px-4 py-5 pb-32 max-w-full mx-auto">
        {/* Rate Inputs Section */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mb-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm text-foreground font-medium flex items-center gap-1">
                <Gem size={14} className="text-emerald-600" /> {t('todaysGoldRate')}
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={goldRate}
                  onChange={(e) => setGoldRate(parseFloat(e.target.value) || 0)}
                  className="w-24 p-1.5 rounded-lg border border-border bg-background text-foreground text-right text-sm font-bold outline-none focus:border-emerald-500"
                />
                <span className="text-sm font-semibold">৳/g</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-foreground font-medium flex items-center gap-1">
                <Coins size={14} className="text-gray-500" /> {t('todaysSilverRate')}
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={silverRate}
                  onChange={(e) => setSilverRate(parseFloat(e.target.value) || 0)}
                  className="w-24 p-1.5 rounded-lg border border-border bg-background text-foreground text-right text-sm font-bold outline-none focus:border-emerald-500"
                />
                <span className="text-sm font-semibold">৳/g</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-foreground/50 mt-3 pt-2 border-t border-emerald-200 dark:border-emerald-800">
            {t('ratesNote')}
          </div>
        </div>

        {/* Nisab Banner */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-emerald-600" />
              <div>
                <div className="text-xs text-foreground/60">{t('nisab')}</div>
                <div className="font-bold text-emerald-600 text-lg">
                  ৳ {nisab.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assets Section */}
        <div className="text-xs font-bold text-foreground/60 uppercase tracking-wide mb-2 flex items-center gap-2">
          <Wallet size={14} /> {t('assets')}
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Landmark size={16} /> {t('cashSavings')}
          </div>
          {[
            { id: "cash", label: t('cash'), sub: t('cashSub'), value: assets.cash },
            { id: "sanchoy", label: t('sanchoy'), sub: t('sanchoySub'), value: assets.sanchoy },
            { id: "mobile", label: t('mobile'), sub: t('mobileSub'), value: assets.mobile },
            { id: "invest", label: t('investments'), sub: t('investmentsSub'), value: assets.invest },
          ].map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
              <div>
                <div className="text-sm text-foreground">{item.label}</div>
                <div className="text-xs text-foreground/50">{item.sub}</div>
              </div>
              <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
                <span className="px-2 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-r border-border">৳</span>
                <input type="number" value={item.value} onChange={(e) => updateAsset(item.id, e.target.value)} className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none" />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Gem size={16} /> {t('goldSilver')}
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <div>
              <div className="text-sm text-foreground">{t('goldGrams')}</div>
              <div className="text-xs text-foreground/50">{t('goldSub')}</div>
            </div>
            <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
              <span className="px-2 py-1 text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-r border-border">g</span>
              <input type="number" value={assets.gold_g} onChange={(e) => updateAsset("gold_g", e.target.value)} className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none" step="0.1" />
            </div>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
            <div>
              <div className="text-sm text-foreground">{t('silverGrams')}</div>
              <div className="text-xs text-foreground/50">{t('silverSub')}</div>
            </div>
            <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
              <span className="px-2 py-1 text-xs font-bold text-gray-500 border-r border-border">g</span>
              <input type="number" value={assets.silver_g} onChange={(e) => updateAsset("silver_g", e.target.value)} className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none" step="0.1" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp size={16} /> {t('businessAssets')}
          </div>
          {[
            { id: "stock", label: t('businessStock'), sub: t('businessStockSub'), value: assets.stock },
            { id: "recv", label: t('receivables'), sub: t('receivablesSub'), value: assets.recv },
          ].map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
              <div>
                <div className="text-sm text-foreground">{item.label}</div>
                <div className="text-xs text-foreground/50">{item.sub}</div>
              </div>
              <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
                <span className="px-2 py-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border-r border-border">৳</span>
                <input type="number" value={item.value} onChange={(e) => updateAsset(item.id, e.target.value)} className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Liabilities Section */}
        <div className="text-xs font-bold text-foreground/60 uppercase tracking-wide mb-2 flex items-center gap-2 mt-4">
          <HandCoins size={14} /> {t('liabilities')}
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            <HandCoins size={16} /> {t('debtsPayables')}
          </div>
          {[
            { id: "loan", label: t('loans'), sub: t('loansSub'), value: liabilities.loan },
            { id: "bills", label: t('outstandingBills'), sub: t('billsSub'), value: liabilities.bills },
            { id: "other", label: t('otherDebts'), sub: t('otherDebtsSub'), value: liabilities.other },
          ].map((item) => (
            <div key={item.id} className="flex justify-between items-center py-2 border-b border-border last:border-0">
              <div>
                <div className="text-sm text-foreground">{item.label}</div>
                <div className="text-xs text-foreground/50">{item.sub}</div>
              </div>
              <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
                <span className="px-2 py-1 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/30 border-r border-border">৳</span>
                <input type="number" value={item.value} onChange={(e) => updateLiability(item.id, e.target.value)} className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Result Section */}
        {loading ? (
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-600 mx-auto" />
          </div>
        ) : result.aboveNisab ? (
          <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-xl p-6 text-center relative overflow-hidden mb-3">
            <div className="absolute right-0 top-0 text-8xl opacity-10 pointer-events-none">☪️</div>
            <div className="text-white/85 text-sm mb-1">{t('yourZakatThisYear')}</div>
            <div className="text-4xl font-bold text-white mb-1">
              ৳ {Math.round(result.zakat).toLocaleString()}
            </div>
            <div className="text-white/80 text-xs">{t('zakatRateInfo')}</div>
          </div>
        ) : (
          <div className="bg-card border-2 border-border rounded-xl p-5 text-center mb-3">
            <Award size={48} className="text-foreground/30 mx-auto mb-2" />
            <div className="text-base font-bold text-foreground mb-1">
              {t('belowNisab')}
            </div>
            <div className="text-sm text-foreground/60 leading-relaxed">
              {t('belowNisabDesc', { nisab: nisab.toLocaleString() })}
            </div>
          </div>
        )}

        {/* Breakdown Card */}
        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Calculator size={16} /> {t('breakdown')}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('totalAssets')}</span>
              <span className="font-semibold text-green-600">৳ {result.totalAssets.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('totalLiabilities')}</span>
              <span className="font-semibold text-red-500">−৳ {result.totalLiabilities.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm pt-1 border-t border-dashed border-border">
              <span className="text-foreground/60">{t('zakatableWealth')}</span>
              <span className="font-bold text-emerald-600">৳ {result.net.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('nisab')}</span>
              <span className="text-foreground/50">৳ {nisab.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('zakatRate')}</span>
              <span className="text-foreground/50">2.5%</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t-2 border-border">
              <span className="font-bold text-foreground">{t('zakatDue')}</span>
              <span className="font-bold text-emerald-600 text-lg">৳ {Math.round(result.zakat).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-3">
          <button
            onClick={resetCalculator}
            className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/60 font-bold hover:border-emerald-500 hover:text-emerald-600 transition flex items-center justify-center gap-2"
          >
            <RefreshCw size={16} /> {t('reset')}
          </button>
          {result.aboveNisab && (
            <button
              onClick={openShareModal}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <Share2 size={16} /> {t('share')}
            </button>
          )}
        </div>

        {/* Save to Goal Prompt */}
        {result.aboveNisab && result.zakat > 0 && (
          <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <Target size={24} className="text-emerald-600" />
              <div className="flex-1">
                <div className="font-bold text-foreground text-sm">
                  {t('createZakatGoal')}
                </div>
                <div className="text-xs text-foreground/50">
                  {t('setAsideZakat')}
                </div>
              </div>
              <button
                onClick={createZakatGoal}
                disabled={saving}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg text-xs font-bold whitespace-nowrap disabled:opacity-50 hover:opacity-90 transition flex items-center gap-1"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target size={14} />}
                {t('createGoal')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border z-50">
        <button
          onClick={calculateZakat}
          disabled={loading}
          className="w-full max-w-4xl mx-auto block py-4 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-xl font-bold text-base disabled:opacity-50 hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Calculator size={18} />}
          {t('calculateZakat')}
        </button>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center" onClick={closeShareModal}>
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-md p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
              <div className="text-4xl font-bold text-emerald-600 mb-1">
                ৳ {Math.round(result.zakat).toLocaleString()}
              </div>
              <div className="text-sm text-foreground/60 mb-5">{t('yourZakatThisYear')}</div>
              <div className="flex justify-center gap-4 mb-5">
                {[
                  { icon: <Copy size={24} />, label: t('copy'), action: "copy" },
                  { icon: <Camera size={24} />, label: t('screenshot'), action: "screenshot" },
                  { icon: <MessageCircle size={24} />, label: t('whatsapp'), action: "whatsapp" },
                ].map((opt) => (
                  <button key={opt.action} onClick={() => shareAction(opt.action)} className="flex flex-col items-center gap-1">
                    <div className="w-14 h-14 rounded-xl border border-border bg-background flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600 transition">{opt.icon}</div>
                    <div className="text-xs text-foreground/60">{opt.label}</div>
                  </button>
                ))}
              </div>
              <button onClick={closeShareModal} className="w-full py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition">{t('close')}</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZakatPage;