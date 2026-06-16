"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun, Loader2, Calculator, TrendingUp, Wallet, Target, Share2, RefreshCw, Copy, Camera, MessageCircle, Award, Coins, Gem, Landmark, HandCoins } from "lucide-react";
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

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    
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
    showToast(lang === "bn" ? "Reset done" : "Reset done", "success");
  }, [lang]);

  const createZakatGoal = async () => {
    if (result.zakat <= 0) {
      showToast(
        lang === "bn" 
          ? "Cannot create goal when zakat amount is zero" 
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
          title: lang === "bn" ? "Zakat Goal Created!" : "Zakat Goal Created!",
          html: lang === "bn"
            ? `A new goal has been created to save your zakat separately.<br/><strong>Amount: ৳${result.zakat.toLocaleString()}</strong>`
            : `A new goal has been created to save your zakat separately.<br/><strong>Amount: ৳${result.zakat.toLocaleString()}</strong>`,
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: lang === "bn" ? "Go to Dashboard" : "Go to Dashboard",
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
          ? `My Zakat this year: ৳${amt}\n\nCalculate yours with sanchoy`
          : `My Zakat this year: ৳${amt}\n\nCalculate yours with sanchoy`;

      if (type === "copy") {
        navigator.clipboard.writeText(msg);
        showToast(lang === "bn" ? "Copied!" : "Copied!", "success");
      } else if (type === "whatsapp") {
        window.open("https://wa.me/?text=" + encodeURIComponent(msg), "_blank");
      } else {
        showToast(
          lang === "bn" ? "Take a screenshot" : "Take a screenshot",
          "info"
        );
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
          <Calculator size={20} /> Zakat Calculator
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
          Calculate Your Zakat
        </div>
        <div className="text-white/80 text-sm">
          Find your annual Zakat amount according to Islamic Shariah
        </div>
      </div>

      <div className="px-4 py-5 pb-32 max-w-full mx-auto">
        {/* Rate Inputs Section */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mb-4">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <div className="text-sm text-foreground font-medium flex items-center gap-1">
                <Gem size={14} className="text-emerald-600" /> Today's Gold Rate (per gram):
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
                <Coins size={14} className="text-gray-500" /> Today's Silver Rate (per gram):
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
            * Rates are user-provided. Please check current market rates.
          </div>
        </div>

        {/* Nisab Banner */}
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xl p-4 mb-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Award size={18} className="text-emerald-600" />
              <div>
                <div className="text-xs text-foreground/60">Nisab (Gold 85g)</div>
                <div className="font-bold text-emerald-600 text-lg">
                  ৳ {nisab.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Assets Section */}
        <div className="text-xs font-bold text-foreground/60 uppercase tracking-wide mb-2 flex items-center gap-2">
          <Wallet size={14} /> Assets
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Landmark size={16} /> Cash & Savings
          </div>
          {[
            { id: "cash", label: "Cash", sub: "In hand & bank", value: assets.cash },
            { id: "sanchoy", label: "Sonchoy Bondhu", sub: "Total across all goals", value: assets.sanchoy },
            { id: "mobile", label: "bKash / Nagad", sub: "Mobile banking balance", value: assets.mobile },
            { id: "invest", label: "Investments", sub: "Shares, mutual funds", value: assets.invest },
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
            <Gem size={16} /> Gold & Silver
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border">
            <div>
              <div className="text-sm text-foreground">Gold (grams)</div>
              <div className="text-xs text-foreground/50">Excluding jewelry in use</div>
            </div>
            <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
              <span className="px-2 py-1 text-xs font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/30 border-r border-border">g</span>
              <input type="number" value={assets.gold_g} onChange={(e) => updateAsset("gold_g", e.target.value)} className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none" step="0.1" />
            </div>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-border last:border-0">
            <div>
              <div className="text-sm text-foreground">Silver (grams)</div>
              <div className="text-xs text-foreground/50">595g = 1 Nisab</div>
            </div>
            <div className="flex items-center border border-border rounded-lg bg-background overflow-hidden">
              <span className="px-2 py-1 text-xs font-bold text-gray-500 border-r border-border">g</span>
              <input type="number" value={assets.silver_g} onChange={(e) => updateAsset("silver_g", e.target.value)} className="w-28 p-1 text-right text-sm font-semibold bg-transparent text-foreground outline-none" step="0.1" />
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            <TrendingUp size={16} /> Business Assets
          </div>
          {[
            { id: "stock", label: "Business Stock", sub: "At market value", value: assets.stock },
            { id: "recv", label: "Receivables", sub: "Money owed to you", value: assets.recv },
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
          <HandCoins size={14} /> Liabilities
        </div>

        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            <HandCoins size={16} /> Debts & Payables
          </div>
          {[
            { id: "loan", label: "Loans", sub: "Annual repayment amount", value: liabilities.loan },
            { id: "bills", label: "Outstanding Bills", sub: "Rent, utilities etc.", value: liabilities.bills },
            { id: "other", label: "Other Debts", sub: "Personal loans", value: liabilities.other },
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
            <div className="text-white/85 text-sm mb-1">Your Zakat This Year</div>
            <div className="text-4xl font-bold text-white mb-1">
              ৳ {Math.round(result.zakat).toLocaleString()}
            </div>
            <div className="text-white/80 text-xs">2.5% of net wealth · May Allah accept it</div>
          </div>
        ) : (
          <div className="bg-card border-2 border-border rounded-xl p-5 text-center mb-3">
            <Award size={48} className="text-foreground/30 mx-auto mb-2" />
            <div className="text-base font-bold text-foreground mb-1">
              Your wealth is below Nisab
            </div>
            <div className="text-sm text-foreground/60 leading-relaxed">
              Your total wealth is below the Nisab of {nisab.toLocaleString()} — Zakat is not obligatory this year.
            </div>
          </div>
        )}

        {/* Breakdown Card */}
        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-3 flex items-center gap-2">
            <Calculator size={16} /> Breakdown
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Total Assets</span>
              <span className="font-semibold text-green-600">৳ {result.totalAssets.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Total Liabilities</span>
              <span className="font-semibold text-red-500">−৳ {result.totalLiabilities.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm pt-1 border-t border-dashed border-border">
              <span className="text-foreground/60">Zakatable Wealth</span>
              <span className="font-bold text-emerald-600">৳ {result.net.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Nisab</span>
              <span className="text-foreground/50">৳ {nisab.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Zakat Rate</span>
              <span className="text-foreground/50">2.5%</span>
            </div>
            <div className="flex justify-between text-base pt-2 border-t-2 border-border">
              <span className="font-bold text-foreground">Zakat Due</span>
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
            <RefreshCw size={16} /> Reset
          </button>
          {result.aboveNisab && (
            <button
              onClick={openShareModal}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <Share2 size={16} /> Share
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
                  Create a Zakat Goal
                </div>
                <div className="text-xs text-foreground/50">
                  Set aside your Zakat amount separately
                </div>
              </div>
              <button
                onClick={createZakatGoal}
                disabled={saving}
                className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-emerald-700 text-white rounded-lg text-xs font-bold whitespace-nowrap disabled:opacity-50 hover:opacity-90 transition flex items-center gap-1"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target size={14} />}
                Create Goal
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
          Calculate Zakat
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
              <div className="text-sm text-foreground/60 mb-5">Your Zakat this year</div>
              <div className="flex justify-center gap-4 mb-5">
                {[
                  { icon: <Copy size={24} />, label: "Copy", action: "copy" },
                  { icon: <Camera size={24} />, label: "Screenshot", action: "screenshot" },
                  { icon: <MessageCircle size={24} />, label: "WhatsApp", action: "whatsapp" },
                ].map((opt) => (
                  <button key={opt.action} onClick={() => shareAction(opt.action)} className="flex flex-col items-center gap-1">
                    <div className="w-14 h-14 rounded-xl border border-border bg-background flex items-center justify-center hover:border-emerald-500 hover:text-emerald-600 transition">{opt.icon}</div>
                    <div className="text-xs text-foreground/60">{opt.label}</div>
                  </button>
                ))}
              </div>
              <button onClick={closeShareModal} className="w-full py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold hover:border-emerald-500 hover:text-emerald-600 transition">Close</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZakatPage;