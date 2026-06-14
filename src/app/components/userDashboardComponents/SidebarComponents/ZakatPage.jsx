"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const ZakatPage = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [loading, setLoading] = useState(false);
  const [goldRate, setGoldRate] = useState(11000);
  const [silverRate, setSilverRate] = useState(130);
  const [assets, setAssets] = useState({
    cash: 0,
    amanah: 0,
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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    
    // Load saved calculation from localStorage
    const savedCalculation = localStorage.getItem("zakatCalculation");
    if (savedCalculation) {
      const data = JSON.parse(savedCalculation);
      setAssets(data.assets || assets);
      setLiabilities(data.liabilities || liabilities);
      setGoldRate(data.goldRate || 11000);
      setSilverRate(data.silverRate || 130);
    }
  }, []);

  // Save rates to localStorage whenever they change
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
      title: type === "success" ? "Success!" : "Error!",
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
        
        // Save to localStorage
        localStorage.setItem("zakatCalculation", JSON.stringify({
          assets,
          liabilities,
          goldRate,
          silverRate,
          result: response.data.data,
          timestamp: new Date().toISOString(),
        }));
        
        // Auto-save to backend
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
      showToast(error.response?.data?.message || "Failed to calculate zakat", "error");
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
      amanah: 0,
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
    showToast(lang === "bn" ? "🔄 রিসেট হয়েছে" : "🔄 Reset done", "success");
  }, [lang]);

  const createZakatGoal = async () => {
    if (result.zakat <= 0) {
      showToast(
        lang === "bn" 
          ? "যাকাতের পরিমাণ শূন্য থাকলে লক্ষ্য তৈরি করা যাবে না" 
          : "Cannot create goal when zakat amount is zero",
        "error"
      );
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
          title: lang === "bn" ? "🎯 যাকাত লক্ষ্য তৈরি!" : "🎯 Zakat Goal Created!",
          html: lang === "bn"
            ? `আপনার যাকাতের টাকা আলাদা রাখার জন্য একটি নতুন লক্ষ্য তৈরি করা হয়েছে।<br/><strong>পরিমাণ: ৳${result.zakat.toLocaleString()}</strong>`
            : `A new goal has been created to save your zakat separately.<br/><strong>Amount: ৳${result.zakat.toLocaleString()}</strong>`,
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: lang === "bn" ? "ড্যাশবোর্ডে যান" : "Go to Dashboard",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/dashboard/goals");
          }
        });
      }
    } catch (error) {
      console.error("Create zakat goal error:", error);
      showToast(error.response?.data?.message || "Failed to create zakat goal", "error");
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
          ? `আমার এই বছরের যাকাত: ৳${amt}\n\nAmanah যাকাত ক্যালকুলেটর দিয়ে হিসাব করুন`
          : `My Zakat this year: ৳${amt}\n\nCalculate yours with Amanah`;

      if (type === "copy") {
        navigator.clipboard.writeText(msg);
        showToast(lang === "bn" ? "📋 কপি হয়েছে" : "📋 Copied!", "success");
      } else if (type === "whatsapp") {
        window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank");
      } else {
        showToast(
          lang === "bn" ? "📸 স্ক্রিনশট নিন" : "📸 Take a screenshot",
          "info"
        );
      }
      closeShareModal();
    },
    [result.zakat, lang, showToast, closeShareModal],
  );

  // Auto-calculate on mount
  useEffect(() => {
    calculateZakat();
  }, []);

  const nisab = getNisab();

  const getText = useCallback(
    (key) => {
      const texts = {
        bn: {
          pageTitle: "🌙 যাকাত ক্যালকুলেটর",
          heroTitle: "যাকাত হিসাব করুন",
          heroSub:
            "ইসলামিক শরিয়াহ অনুযায়ী আপনার বার্ষিক যাকাতের সঠিক পরিমাণ জানুন",
          nisabLabel: "নিসাব (স্বর্ণ ৮৫গ্রাম)",
          goldRateLabel: "আজকের স্বর্ণের দর (প্রতি গ্রাম):",
          silverRateLabel: "আজকের রুপার দর (প্রতি গ্রাম):",
          rateNote: "* দর ব্যবহারকারী দ্বারা প্রদত্ত। বর্তমান বাজার দর যাচাই করুন।",
          secAssets: "সম্পদ (Assets)",
          secLiabilities: "দেনা (Liabilities)",
          ctSavings: "🏦 নগদ ও সঞ্চয়",
          ctGold: "💛 স্বর্ণ ও রুপা",
          ctBusiness: "🏪 ব্যবসায়িক সম্পদ",
          ctDebts: "💳 দেনা ও বকেয়া",
          lblCash: "নগদ টাকা",
          lblCashSub: "হাতে ও ব্যাংকে",
          lblAmanah: "Amanah সঞ্চয়",
          lblAmanahSub: "সব লক্ষ্যের মোট",
          lblBkash: "bKash / Nagad",
          lblBkashSub: "মোবাইল ব্যাংকিং ব্যালেন্স",
          lblInvest: "বিনিয়োগ",
          lblInvestSub: "শেয়ার, মিউচুয়াল ফান্ড",
          lblGold: "স্বর্ণ (গ্রামে)",
          lblGoldSub: "গহনা বাদে ব্যবহারযোগ্য স্বর্ণ",
          lblSilver: "রুপা (গ্রামে)",
          lblSilverSub: "৫৯৫ গ্রাম = ১ নিসাব",
          lblStock: "পণ্য মজুদ",
          lblStockSub: "বাজার মূল্যে",
          lblReceivable: "পাওনা টাকা",
          lblReceivableSub: "অন্যের কাছে দেওয়া ঋণ",
          lblLoan: "ঋণ / লোন",
          lblLoanSub: "পরিশোধযোগ্য বার্ষিক কিস্তি",
          lblPayable: "বকেয়া বিল",
          lblPayableSub: "ভাড়া, ইউটিলিটি ইত্যাদি",
          lblOtherDebt: "অন্যান্য দেনা",
          lblOtherDebtSub: "ব্যক্তিগত ঋণ",
          bkTitle: "📊 হিসাবের বিবরণ",
          bkAssets: "মোট সম্পদ",
          bkLiab: "মোট দেনা",
          bkNet: "যাকাতযোগ্য সম্পদ",
          bkNisab: "নিসাব",
          bkRate: "যাকাতের হার",
          bkZakat: "প্রদেয় যাকাত",
          resLabel: "🌙 এই বছর আপনার যাকাত",
          resNote: "নেটওয়ার্থের ২.৫% · আল্লাহ কবুল করুন",
          resBelowTitle: "আপনার সম্পদ নিসাবের নিচে",
          resBelowSub: `আপনার মোট সম্পদ ${nisab.toLocaleString()} নিসাবের কম — এই বছর যাকাত ফরজ হয়নি।`,
          goalPromptTitle: "যাকাত লক্ষ্য তৈরি করুন",
          goalPromptSub: "আপনার যাকাতের টাকা আলাদা করে রাখুন",
          goalPromptBtn: "লক্ষ্য তৈরি →",
          btnReset: "🔄 রিসেট",
          btnShare: "📤 শেয়ার করুন",
          btnCalc: "☪️ যাকাত হিসাব করুন",
          shareLabel: "আপনার এই বছরের যাকাত",
          shareCopy: "কপি",
          shareScreenshot: "স্ক্রিনশট",
          shareClose: "বন্ধ করুন",
        },
        en: {
          pageTitle: "🌙 Zakat Calculator",
          heroTitle: "Calculate Your Zakat",
          heroSub: "Find your annual Zakat amount according to Islamic Shariah",
          nisabLabel: "Nisab (Gold 85g)",
          goldRateLabel: "Today's Gold Rate (per gram):",
          silverRateLabel: "Today's Silver Rate (per gram):",
          rateNote: "* Rates are user-provided. Please check current market rates.",
          secAssets: "Assets",
          secLiabilities: "Liabilities",
          ctSavings: "🏦 Cash & Savings",
          ctGold: "💛 Gold & Silver",
          ctBusiness: "🏪 Business Assets",
          ctDebts: "💳 Debts & Payables",
          lblCash: "Cash",
          lblCashSub: "In hand & bank",
          lblAmanah: "Amanah Savings",
          lblAmanahSub: "Total across all goals",
          lblBkash: "bKash / Nagad",
          lblBkashSub: "Mobile banking balance",
          lblInvest: "Investments",
          lblInvestSub: "Shares, mutual funds",
          lblGold: "Gold (grams)",
          lblGoldSub: "Excluding jewelry in use",
          lblSilver: "Silver (grams)",
          lblSilverSub: "595g = 1 Nisab",
          lblStock: "Business Stock",
          lblStockSub: "At market value",
          lblReceivable: "Receivables",
          lblReceivableSub: "Money owed to you",
          lblLoan: "Loans",
          lblLoanSub: "Annual repayment amount",
          lblPayable: "Outstanding Bills",
          lblPayableSub: "Rent, utilities etc.",
          lblOtherDebt: "Other Debts",
          lblOtherDebtSub: "Personal loans",
          bkTitle: "📊 Breakdown",
          bkAssets: "Total Assets",
          bkLiab: "Total Liabilities",
          bkNet: "Zakatable Wealth",
          bkNisab: "Nisab",
          bkRate: "Zakat Rate",
          bkZakat: "Zakat Due",
          resLabel: "🌙 Your Zakat This Year",
          resNote: "2.5% of net wealth · May Allah accept it",
          resBelowTitle: "Your wealth is below Nisab",
          resBelowSub: `Your total wealth is below the Nisab of ${nisab.toLocaleString()} — Zakat is not obligatory this year.`,
          goalPromptTitle: "Create a Zakat Goal",
          goalPromptSub: "Set aside your Zakat amount separately",
          goalPromptBtn: "Create Goal →",
          btnReset: "🔄 Reset",
          btnShare: "📤 Share",
          btnCalc: "☪️ Calculate Zakat",
          shareLabel: "Your Zakat this year",
          shareCopy: "Copy",
          shareScreenshot: "Screenshot",
          shareClose: "Close",
        },
      };
      return texts[lang][key] || key;
    },
    [lang, nisab],
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-linear-to-r from-primary to-amber-600 px-5 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1">
          {getText("pageTitle")}
        </h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
      </div>

      {/* Hero */}
      <div className="bg-linear-to-r from-primary to-amber-600 px-5 pb-7 text-center">
        <div className="text-2xl text-white/90 mb-1 tracking-wider">
          بِسْمِ اللَّهِ
        </div>
        <div className="text-white text-xl font-bold mb-1">
          {getText("heroTitle")}
        </div>
        <div className="text-white/80 text-xs leading-relaxed">
          {getText("heroSub")}
        </div>
      </div>

      <div className="px-4 py-5 pb-32 max-w-full mx-auto">
        {/* Rate Inputs Section */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl p-4 mb-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm text-foreground font-medium">
                {getText("goldRateLabel")}
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={goldRate}
                  onChange={(e) => setGoldRate(parseFloat(e.target.value) || 0)}
                  className="w-24 p-1.5 rounded-lg border border-border bg-background text-foreground text-right text-sm font-bold outline-none focus:border-primary"
                />
                <span className="text-sm font-semibold">৳/গ্রাম</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-sm text-foreground font-medium">
                {getText("silverRateLabel")}
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  value={silverRate}
                  onChange={(e) => setSilverRate(parseFloat(e.target.value) || 0)}
                  className="w-24 p-1.5 rounded-lg border border-border bg-background text-foreground text-right text-sm font-bold outline-none focus:border-primary"
                />
                <span className="text-sm font-semibold">৳/গ্রাম</span>
              </div>
            </div>
          </div>
          <div className="text-xs text-foreground/50 mt-3 pt-2 border-t border-amber-200 dark:border-amber-800">
            {getText("rateNote")}
          </div>
        </div>

        {/* Nisab Banner */}
        <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center">
            <div>
              <div className="text-xs text-foreground/60">
                {getText("nisabLabel")}
              </div>
              <div className="font-bold text-amber-600 text-base">
                ৳ {nisab.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* Assets Section */}
        <div className="text-xs font-bold text-foreground/60 uppercase tracking-wide mb-2 flex items-center gap-2">
          💰 {getText("secAssets")}
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            {getText("ctSavings")}
          </div>
          {[
            {
              id: "cash",
              label: "lblCash",
              sub: "lblCashSub",
              value: assets.cash,
            },
            {
              id: "amanah",
              label: "lblAmanah",
              sub: "lblAmanahSub",
              value: assets.amanah,
            },
            {
              id: "mobile",
              label: "lblBkash",
              sub: "lblBkashSub",
              value: assets.mobile,
            },
            {
              id: "invest",
              label: "lblInvest",
              sub: "lblInvestSub",
              value: assets.invest,
            },
          ].map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-border last:border-0"
            >
              <div>
                <div className="text-sm text-foreground">
                  {getText(item.label)}
                </div>
                <div className="text-xs text-foreground/50">
                  {getText(item.sub)}
                </div>
              </div>
              <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
                <span className="px-2 py-1 text-xs font-bold text-primary bg-primary/5 border-r border-border">
                  ৳
                </span>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => updateAsset(item.id, e.target.value)}
                  className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            {getText("ctGold")}
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <div>
              <div className="text-sm text-foreground">
                {getText("lblGold")}
              </div>
              <div className="text-xs text-foreground/50">
                {getText("lblGoldSub")}
              </div>
            </div>
            <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
              <span className="px-2 py-1 text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-r border-border">
                গ্রা
              </span>
              <input
                type="number"
                value={assets.gold_g}
                onChange={(e) => updateAsset("gold_g", e.target.value)}
                className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none"
                step="0.1"
              />
            </div>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
            <div>
              <div className="text-sm text-foreground">
                {getText("lblSilver")}
              </div>
              <div className="text-xs text-foreground/50">
                {getText("lblSilverSub")}
              </div>
            </div>
            <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
              <span className="px-2 py-1 text-xs font-bold text-gray-500 border-r border-border">
                গ্রা
              </span>
              <input
                type="number"
                value={assets.silver_g}
                onChange={(e) => updateAsset("silver_g", e.target.value)}
                className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none"
                step="0.1"
              />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            {getText("ctBusiness")}
          </div>
          {[
            {
              id: "stock",
              label: "lblStock",
              sub: "lblStockSub",
              value: assets.stock,
            },
            {
              id: "recv",
              label: "lblReceivable",
              sub: "lblReceivableSub",
              value: assets.recv,
            },
          ].map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-border last:border-0"
            >
              <div>
                <div className="text-sm text-foreground">
                  {getText(item.label)}
                </div>
                <div className="text-xs text-foreground/50">
                  {getText(item.sub)}
                </div>
              </div>
              <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
                <span className="px-2 py-1 text-xs font-bold text-primary bg-primary/5 border-r border-border">
                  ৳
                </span>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => updateAsset(item.id, e.target.value)}
                  className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Liabilities Section */}
        <div className="text-xs font-bold text-foreground/60 uppercase tracking-wide mb-2 flex items-center gap-2 mt-4">
          📉 {getText("secLiabilities")}
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            {getText("ctDebts")}
          </div>
          {[
            {
              id: "loan",
              label: "lblLoan",
              sub: "lblLoanSub",
              value: liabilities.loan,
            },
            {
              id: "bills",
              label: "lblPayable",
              sub: "lblPayableSub",
              value: liabilities.bills,
            },
            {
              id: "other",
              label: "lblOtherDebt",
              sub: "lblOtherDebtSub",
              value: liabilities.other,
            },
          ].map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-border last:border-0"
            >
              <div>
                <div className="text-sm text-foreground">
                  {getText(item.label)}
                </div>
                <div className="text-xs text-foreground/50">
                  {getText(item.sub)}
                </div>
              </div>
              <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
                <span className="px-2 py-1 text-xs font-bold text-red-500 bg-red-50 dark:bg-red-950/30 border-r border-border">
                  ৳
                </span>
                <input
                  type="number"
                  value={item.value}
                  onChange={(e) => updateLiability(item.id, e.target.value)}
                  className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Result Section */}
        {loading ? (
          <div className="bg-card border border-border rounded-xl p-6 text-center">
            <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          </div>
        ) : result.aboveNisab ? (
          <div className="bg-linear-to-r from-primary to-amber-600 rounded-xl p-6 text-center relative overflow-hidden mb-3">
            <div className="absolute right-0 top-0 text-8xl opacity-10 pointer-events-none">
              ☪️
            </div>
            <div className="text-white/85 text-sm mb-1">
              {getText("resLabel")}
            </div>
            <div className="text-4xl font-bold text-white mb-1">
              ৳ {Math.round(result.zakat).toLocaleString()}
            </div>
            <div className="text-white/80 text-xs">{getText("resNote")}</div>
          </div>
        ) : (
          <div className="bg-card border-2 border-border rounded-xl p-5 text-center mb-3">
            <div className="text-5xl mb-2">🌙</div>
            <div className="text-base font-bold text-foreground mb-1">
              {getText("resBelowTitle")}
            </div>
            <div className="text-sm text-foreground/60 leading-relaxed">
              {getText("resBelowSub")}
            </div>
          </div>
        )}

        {/* Breakdown Card */}
        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            {getText("bkTitle")}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{getText("bkAssets")}</span>
              <span className="font-semibold text-green-600">
                ৳ {result.totalAssets.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{getText("bkLiab")}</span>
              <span className="font-semibold text-red-500">
                −৳ {result.totalLiabilities.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm pt-1 border-t border-dashed border-border">
              <span className="text-foreground/60">{getText("bkNet")}</span>
              <span className="font-bold text-amber-600">
                ৳ {result.net.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{getText("bkNisab")}</span>
              <span className="text-foreground/50">
                ৳ {nisab.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{getText("bkRate")}</span>
              <span className="text-foreground/50">2.5%</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t-2 border-border">
              <span className="font-bold text-foreground">
                {getText("bkZakat")}
              </span>
              <span className="font-bold text-primary text-lg">
                ৳ {Math.round(result.zakat).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mb-3 text-sm text-foreground/60">
          <strong className="text-foreground">☪️ যাকাতের হার:</strong> মোট
          যাকাতযোগ্য সম্পদের <strong className="text-primary">২.৫%</strong>{" "}
          (১/৪০ ভাগ)। যাকাত ফরজ হয় যখন নিসাব পরিমাণ সম্পদ পূর্ণ এক চন্দ্রবছর
          (হাওল) ধরে থাকে।
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 mb-3">
          <button
            onClick={resetCalculator}
            className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/60 font-bold hover:border-primary hover:text-primary transition"
          >
            {getText("btnReset")}
          </button>
          {result.aboveNisab && (
            <button
              onClick={openShareModal}
              className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-amber-600 text-white font-bold"
            >
              {getText("btnShare")}
            </button>
          )}
        </div>

        {/* Save to Goal Prompt */}
        {result.aboveNisab && result.zakat > 0 && (
          <div className="bg-primary/5 border border-primary/30 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <div className="text-3xl">🎯</div>
              <div className="flex-1">
                <div className="font-bold text-foreground text-sm">
                  {getText("goalPromptTitle")}
                </div>
                <div className="text-xs text-foreground/50">
                  {getText("goalPromptSub")}
                </div>
              </div>
              <button
                onClick={createZakatGoal}
                disabled={saving}
                className="px-4 py-2 bg-linear-to-r from-primary to-amber-600 text-white rounded-lg text-xs font-bold whitespace-nowrap disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : getText("goalPromptBtn")}
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
          className="w-full max-w-4xl mx-auto block py-4 bg-linear-to-r from-primary to-amber-600 text-white rounded-xl font-bold text-base disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : getText("btnCalc")}
        </button>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={closeShareModal}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-md p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-5" />
              <div className="text-4xl font-bold text-amber-600 mb-1">
                ৳ {Math.round(result.zakat).toLocaleString()}
              </div>
              <div className="text-sm text-foreground/60 mb-5">
                {getText("shareLabel")}
              </div>
              <div className="flex justify-center gap-4 mb-5">
                {[
                  { icon: "📋", label: "shareCopy", action: "copy" },
                  {
                    icon: "📸",
                    label: "shareScreenshot",
                    action: "screenshot",
                  },
                  { icon: "💬", label: "WhatsApp", action: "whatsapp" },
                ].map((opt) => (
                  <button
                    key={opt.action}
                    onClick={() => shareAction(opt.action)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-14 h-14 rounded-xl border border-border bg-background flex items-center justify-center text-2xl hover:border-primary transition">
                      {opt.icon}
                    </div>
                    <div className="text-xs text-foreground/60">
                      {opt.label === "shareCopy"
                        ? getText("shareCopy")
                        : opt.label === "shareScreenshot"
                          ? getText("shareScreenshot")
                          : opt.label}
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={closeShareModal}
                className="w-full py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold"
              >
                {getText("shareClose")}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZakatPage;
