"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const AutoSavePage = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [selGoal, setSelGoal] = useState("");
  const [selFreq, setSelFreq] = useState("weekly");
  const [selDays, setSelDays] = useState(new Set([1]));
  const [selDate, setSelDate] = useState(1);
  const [selMethod, setSelMethod] = useState("bkash");
  const [amount, setAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [goals, setGoals] = useState([]);
  const [activeRules, setActiveRules] = useState([]);
  const [statistics, setStatistics] = useState({
    totalSaved: 0,
    totalRules: 0,
    activeRules: 0,
  });

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const daysBn = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];

  // Fetch user's goals
  const fetchGoals = async () => {
    try {
      const response = await axiosInstance.get("/goals?status=active");
      if (response.data.success) {
        const activeGoals = response.data.data.goals.filter(
          goal => goal.status === "active"
        );
        setGoals(activeGoals);
        if (activeGoals.length > 0) {
          setSelGoal(activeGoals[0]._id);
        }
      }
    } catch (error) {
      console.error("Fetch goals error:", error);
      if (error.response?.status === 401) {
        router.push("/login");
      }
    }
  };

  // Fetch auto-save rules
  const fetchAutoSaveRules = async () => {
    try {
      const response = await axiosInstance.get("/auto-save");
      if (response.data.success) {
        setActiveRules(response.data.data.rules);
        setStatistics(response.data.data.statistics);
      }
    } catch (error) {
      console.error("Fetch auto-save rules error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const init = async () => {
      await fetchGoals();
      await fetchAutoSaveRules();
    };
    init();

    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");

    const today = new Date();
    today.setDate(today.getDate() + 1);
    setStartDate(today.toISOString().slice(0, 10));
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message, type = "error") => {
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

  const toggleRule = async (ruleId, isActive) => {
    try {
      if (isActive) {
        await axiosInstance.patch(`/auto-save/${ruleId}/resume`);
        showToast("✅ Auto-save enabled", "success");
      } else {
        await axiosInstance.patch(`/auto-save/${ruleId}/pause`);
        showToast("⏸️ Auto-save paused", "success");
      }
      await fetchAutoSaveRules();
    } catch (error) {
      console.error("Toggle rule error:", error);
      showToast(error.response?.data?.message || "Failed to update rule", "error");
    }
  };

  const setFrequency = (freq) => {
    setSelFreq(freq);
  };

  const toggleDay = (day) => {
    const newDays = new Set(selDays);
    if (newDays.has(day)) {
      if (newDays.size > 1) newDays.delete(day);
    } else {
      newDays.add(day);
    }
    setSelDays(newDays);
  };

  const setDateValue = (date) => {
    setSelDate(date);
  };

  const selectGoal = (goal) => {
    setSelGoal(goal);
  };

  const setPresetAmount = (amt) => {
    setAmount(amt);
  };

  const setPaymentMethod = (method) => {
    setSelMethod(method);
  };

  const updateProjection = () => {
    const amt = parseFloat(amount) || 0;
    let timesPerMonth = 1;
    if (selFreq === "daily") timesPerMonth = 30;
    else if (selFreq === "weekly") timesPerMonth = selDays.size * 4.3;
    else timesPerMonth = 1;

    const monthly = amt * timesPerMonth;
    const yearly = monthly * 12;
    return { per: amt, monthly, yearly };
  };

  const submitAutoSave = async () => {
    const amt = parseFloat(amount) || 0;
    
    if (amt < 10) {
      showToast("⚠️ Minimum amount is ৳10", "error");
      return;
    }

    if (!selGoal) {
      showToast("⚠️ Please select a goal", "error");
      return;
    }

    if (!startDate) {
      showToast("⚠️ Please select start date", "error");
      return;
    }

    setSubmitting(true);

    try {
      const requestData = {
        goalId: selGoal,
        frequency: selFreq,
        amount: amt,
        paymentMethod: selMethod,
        startDate,
      };

      if (selFreq === "weekly") {
        requestData.weeklyDays = Array.from(selDays);
      }

      if (selFreq === "monthly") {
        requestData.monthlyDate = selDate;
      }

      const response = await axiosInstance.post("/auto-save", requestData);

      if (response.data.success) {
        setShowModal(true);
        await fetchAutoSaveRules();
        Swal.fire({
          title: "Auto-Save Enabled!",
          text: `${formatCurrency(amt)} will be auto-saved ${selFreq === "daily" ? "daily" : selFreq === "weekly" ? "weekly" : "monthly"}`,
          icon: "success",
          confirmButtonColor: "#059669",
        });
      }
    } catch (error) {
      console.error("Create auto-save error:", error);
      showToast(error.response?.data?.message || "Failed to create auto-save rule", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setAmount("");
  };

  const formatCurrency = (value) => {
    if (!value && value !== 0) return "৳0";
    const formatted = Math.round(value).toLocaleString("en-IN");
    if (lang === "bn") {
      return `৳${formatted.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d])}`;
    }
    return `৳${formatted}`;
  };

  const getFrequencyText = (frequency, rule) => {
    if (frequency === "daily") return lang === "bn" ? "প্রতিদিন" : "Daily";
    if (frequency === "weekly") {
      if (rule?.weeklyDays) {
        const dayNames = rule.weeklyDays.map(d => lang === "bn" ? daysBn[d] : days[d]).join(", ");
        return lang === "bn" ? `সাপ্তাহিক (${dayNames})` : `Weekly (${dayNames})`;
      }
      return lang === "bn" ? "সাপ্তাহিক" : "Weekly";
    }
    if (frequency === "monthly") {
      const date = rule?.monthlyDate || selDate;
      return lang === "bn" 
        ? `মাসিক (${date} তারিখে)` 
        : `Monthly (on ${date}th)`;
    }
    return frequency;
  };

  const getNextExecutionText = (nextDate) => {
    if (!nextDate) return lang === "bn" ? "বন্ধ" : "Paused";
    const date = new Date(nextDate);
    const today = new Date();
    const diff = date - today;
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return lang === "bn" ? "আজ" : "Today";
    if (days === 1) return lang === "bn" ? "আগামীকাল" : "Tomorrow";
    if (days < 7) return lang === "bn" ? `${days} দিন পরে` : `in ${days} days`;
    
    return date.toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const getText = (key) => {
    const texts = {
      bn: {
        pageTitle: "⚡ অটো-সেভ",
        heroTitle: "স্বয়ংক্রিয় সঞ্চয়",
        heroSub: "একবার সেট করুন — Amanah বাকিটা করবে",
        secActive: "চলমান অটো-সেভ",
        secNew: "নতুন অটো-সেভ তৈরি করুন",
        statSaved: "মোট জমা",
        statTimes: "বার সম্পন্ন",
        statNext: "পরবর্তী",
        ctGoal: "🎯 কোন লক্ষ্যে জমা হবে?",
        ctFreq: "🔁 কত ঘন ঘন জমা হবে?",
        ctAmount: "💰 কত টাকা জমা হবে?",
        ctMethod: "💳 কোন পদ্ধতিতে কাটবে?",
        freqDaily: "প্রতিদিন",
        freqWeekly: "সাপ্তাহিক",
        freqMonthly: "মাসিক",
        pickDay: "কোন দিন?",
        pickDate: "কোন তারিখে?",
        formStart: "শুরুর তারিখ",
        projTitle: "📈 প্রজেকশন",
        projPer: "প্রতি জমা",
        projMonthly: "মাসে আনুমানিক",
        projYearly: "বছরে আনুমানিক",
        btnSubmit: "⚡ অটো-সেভ চালু করুন",
        modalTitle: "অটো-সেভ চালু!",
        modalDash: "ড্যাশবোর্ডে যান",
        modalAnother: "আরেকটি তৈরি করুন",
        daySun: "রবি",
        dayMon: "সোম",
        dayTue: "মঙ্গল",
        dayWed: "বুধ",
        dayThu: "বৃহঃ",
        dayFri: "শুক্র",
        daySat: "শনি",
      },
      en: {
        pageTitle: "⚡ Auto-Save",
        heroTitle: "Automatic Savings",
        heroSub: "Set it once — Amanah does the rest",
        secActive: "Active Auto-Saves",
        secNew: "Create New Auto-Save",
        statSaved: "Total Saved",
        statTimes: "Times Run",
        statNext: "Next",
        ctGoal: "🎯 Which goal?",
        ctFreq: "🔁 How often?",
        ctAmount: "💰 How much each time?",
        ctMethod: "💳 Payment method?",
        freqDaily: "Daily",
        freqWeekly: "Weekly",
        freqMonthly: "Monthly",
        pickDay: "Which day?",
        pickDate: "Which date?",
        formStart: "Start date",
        projTitle: "📈 Projection",
        projPer: "Per save",
        projMonthly: "Est. monthly",
        projYearly: "Est. yearly",
        btnSubmit: "⚡ Enable Auto-Save",
        modalTitle: "Auto-Save Enabled!",
        modalDash: "Go to Dashboard",
        modalAnother: "Create Another",
        daySun: "Sun",
        dayMon: "Mon",
        dayTue: "Tue",
        dayWed: "Wed",
        dayThu: "Thu",
        dayFri: "Fri",
        daySat: "Sat",
      },
    };
    return texts[lang][key] || key;
  };

  const projection = updateProjection();
  const selectedGoal = goals.find(g => g._id === selGoal);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-40">
      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary-light px-5 py-4 flex items-center gap-3 sticky top-0 z-50 flex-wrap">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1 min-w-0 wrap-break-word">
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
      <div className="bg-linear-to-r from-primary to-primary-light px-5 pb-7 text-center">
        <div className="text-5xl mb-2">⚡</div>
        <div className="text-white text-xl font-bold mb-1">
          {getText("heroTitle")}
        </div>
        <div className="text-white/80 text-xs">{getText("heroSub")}</div>
      </div>

      <div className="px-4 py-5 max-w-5xl mx-auto">
        {/* Statistics Summary */}
        <div className="grid grid-cols-3 gap-3 mb-5">
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-primary">{formatCurrency(statistics.totalSaved)}</div>
            <div className="text-[10px] text-foreground/50">{getText("statSaved")}</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-foreground">{statistics.totalRules}</div>
            <div className="text-[10px] text-foreground/50">Total Rules</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-green-500">{statistics.activeRules}</div>
            <div className="text-[10px] text-foreground/50">Active Rules</div>
          </div>
        </div>

        {/* Active Rules */}
        {activeRules.length > 0 && (
          <>
            <div className="font-bold text-foreground mb-3">
              {getText("secActive")}
            </div>
            {activeRules.map((rule) => (
              <div
                key={rule._id}
                className={`bg-card border rounded-xl p-4 mb-3 transition ${rule.status === "active" ? "border-primary" : "opacity-70"}`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-xl bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-xl">
                    {rule.goalType === "wedding" ? "💒" : rule.goalType === "education" ? "📚" : "🎯"}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-foreground">
                      {rule.goalName}
                    </div>
                    <div className="text-xs text-foreground/50">
                      {getFrequencyText(rule.frequency, rule)} · {formatCurrency(rule.amount)} · {rule.paymentMethod === "bkash" ? "bKash" : "Nagad"}
                    </div>
                  </div>
                  <label className="relative inline-block w-11 h-6">
                    <input
                      type="checkbox"
                      checked={rule.status === "active"}
                      onChange={(e) => toggleRule(rule._id, e.target.checked)}
                      className="opacity-0 w-0 h-0"
                    />
                    <span
                      className={`absolute inset-0 rounded-full cursor-pointer transition ${
                        rule.status === "active" ? "bg-primary" : "bg-border"
                      } after:content-[''] after:absolute after:w-4 after:h-4 after:rounded-full after:bg-white after:top-1 after:left-1 after:transition ${
                        rule.status === "active" ? "after:translate-x-5" : ""
                      }`}
                    />
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                  <div className="text-center">
                    <div className="font-bold text-sm text-foreground">
                      {formatCurrency(rule.totalSaved)}
                    </div>
                    <div className="text-[10px] text-foreground/50">
                      {getText("statSaved")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm text-foreground">
                      {rule.timesRun}
                    </div>
                    <div className="text-[10px] text-foreground/50">
                      {getText("statTimes")}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="font-bold text-sm text-foreground">
                      {getNextExecutionText(rule.nextExecutionDate)}
                    </div>
                    <div className="text-[10px] text-foreground/50">
                      {getText("statNext")}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}

        {/* New Rule Setup */}
        <div className="font-bold text-foreground mb-3 mt-5">
          {getText("secNew")}
        </div>

        {/* Goal Selection */}
        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">
            {getText("ctGoal")}
          </div>
          {goals.map((goal) => (
            <div
              key={goal._id}
              onClick={() => selectGoal(goal._id)}
              className={`flex items-center gap-3 p-3 border-2 rounded-xl mb-2 cursor-pointer transition ${
                selGoal === goal._id ? "border-primary bg-primary/5" : "border-border hover:border-primary"
              }`}
            >
              <span className="text-2xl">{goal.goalType === "wedding" ? "💒" : goal.goalType === "education" ? "📚" : "🎯"}</span>
              <div className="flex-1">
                <div className="font-bold text-sm text-foreground">
                  {goal.goalName}
                </div>
                <div className="text-xs text-foreground/50">
                  {formatCurrency(goal.currentSaved)} / {formatCurrency(goal.targetAmount)}
                </div>
              </div>
              {selGoal === goal._id && (
                <span className="text-primary text-xl">✓</span>
              )}
            </div>
          ))}
        </div>

        {/* Frequency Selection */}
        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">
            {getText("ctFreq")}
          </div>
          <div className="flex gap-2 mb-4">
            {["daily", "weekly", "monthly"].map((freq) => (
              <button
                key={freq}
                onClick={() => setFrequency(freq)}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition ${
                  selFreq === freq ? "border-primary text-primary bg-primary/5" : "border-border text-foreground/60"
                }`}
              >
                {freq === "daily" && getText("freqDaily")}
                {freq === "weekly" && getText("freqWeekly")}
                {freq === "monthly" && getText("freqMonthly")}
              </button>
            ))}
          </div>

          {/* Weekly Day Picker */}
          {selFreq === "weekly" && (
            <div>
              <div className="text-xs font-semibold text-foreground/60 mb-2">
                {getText("pickDay")}
              </div>
              <div className="flex gap-2 flex-wrap">
                {days.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleDay(idx)}
                    className={`w-10 h-10 rounded-full border-2 text-xs font-bold transition ${
                      selDays.has(idx) ? "border-primary bg-primary text-white" : "border-border text-foreground/60"
                    }`}
                  >
                    {lang === "bn" ? daysBn[idx] : day}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Monthly Date Picker */}
          {selFreq === "monthly" && (
            <div>
              <div className="text-xs font-semibold text-foreground/60 mb-2">
                {getText("pickDate")}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 28 }, (_, i) => i + 1).map((date) => (
                  <button
                    key={date}
                    onClick={() => setDateValue(date)}
                    className={`aspect-square rounded-lg border-2 text-xs font-bold transition ${
                      selDate === date ? "border-primary bg-primary text-white" : "border-border text-foreground/60"
                    }`}
                  >
                    {lang === "bn"
                      ? date.toString().replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d])
                      : date}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Amount Selection */}
        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">
            {getText("ctAmount")}
          </div>
          <div className="relative mb-3">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-2xl font-bold">
              ৳
            </span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              min="10"
              className="w-full py-4 pl-12 pr-4 text-right text-2xl font-bold border-2 border-border rounded-xl text-foreground bg-background outline-none focus:border-primary"
            />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[100, 250, 500, 1000].map((amt) => (
              <button
                key={amt}
                onClick={() => setPresetAmount(amt)}
                className={`py-2 rounded-lg border-2 text-sm font-semibold transition ${
                  parseFloat(amount) === amt ? "border-primary text-primary bg-primary/5" : "border-border text-foreground/60"
                }`}
              >
                {formatCurrency(amt)}
              </button>
            ))}
          </div>
        </div>

        {/* Payment Method */}
        <div className="bg-card border border-border rounded-xl p-4 mb-3">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">
            {getText("ctMethod")}
          </div>
          <div className="flex gap-2 mb-3">
            {["bkash", "nagad"].map((method) => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition ${
                  selMethod === method ? "border-primary text-primary bg-primary/5" : "border-border text-foreground/60"
                }`}
              >
                {method === "bkash" ? "💜 bKash" : "🟠 Nagad"}
              </button>
            ))}
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              {getText("formStart")}
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* Projection */}
        <div className="bg-linear-to-r from-primary/10 to-primary-light/10 border border-primary/20 rounded-xl p-4 mb-4">
          <div className="font-bold text-foreground mb-3">
            {getText("projTitle")}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{getText("projPer")}</span>
              <span className="font-semibold">
                {formatCurrency(projection.per)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{getText("projMonthly")}</span>
              <span className="font-semibold">
                {formatCurrency(projection.monthly)}
              </span>
            </div>
            <div className="flex justify-between text-base">
              <span className="text-foreground/60">{getText("projYearly")}</span>
              <span className="font-bold text-primary">
                {formatCurrency(projection.yearly)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border z-50">
        <button
          onClick={submitAutoSave}
          disabled={submitting || !amount || parseFloat(amount) < 10}
          className="w-full max-w-5xl mx-auto block py-4 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : getText("btnSubmit")}
        </button>
      </div>
    </div>
  );
};

export default AutoSavePage;