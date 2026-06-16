"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun, Loader2, ArrowRightLeft, Target, User, Wallet, Banknote, CheckCircle, AlertCircle, Users, Send } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const TransferPage = () => {
  const router = useRouter();
  const [trType, setTrType] = useState("goal2goal");
  const [selFrom, setSelFrom] = useState(null);
  const [selTo, setSelTo] = useState(null);
  const [recipientFound, setRecipientFound] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientData, setRecipientData] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [transferResult, setTransferResult] = useState(null);

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
          setSelFrom(activeGoals[0]._id);
        }
      }
    } catch (error) {
      console.error("Fetch goals error:", error);
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const selectType = (type) => {
    setTrType(type);
    setActiveStep(2);
    setSelTo(null);
    setRecipientFound(false);
    setRecipientData(null);
    setRecipientPhone("");
  };

  const selectFrom = (id) => {
    setSelFrom(id);
    setActiveStep(3);
  };

  const selectTo = (id) => {
    if (selFrom === id) {
      showToast("Cannot transfer to the same goal", "error");
      return;
    }
    setSelTo(id);
    setActiveStep(4);
  };

  const searchRecipient = async () => {
    if (recipientPhone.length < 11) {
      showToast("Please enter a valid phone number", "error");
      return;
    }

    setSubmitting(true);
    try {
      const response = await axiosInstance.get(`/transfers/search-user?phone=${recipientPhone}`);
      if (response.data.success) {
        setRecipientData(response.data.data);
        setRecipientFound(true);
        setActiveStep(4);
        showToast("User found!", "success");
      }
    } catch (error) {
      console.error("Search user error:", error);
      showToast(error.response?.data?.message || "User not found", "error");
      setRecipientFound(false);
      setRecipientData(null);
    } finally {
      setSubmitting(false);
    }
  };

  const submitTransfer = async () => {
    const amt = parseFloat(amount) || 0;
    
    if (amt < 10) {
      showToast("Minimum transfer amount is ৳10", "error");
      return;
    }

    const selectedGoal = goals.find(g => g._id === selFrom);
    if (amt > selectedGoal?.currentSaved) {
      showToast(`Insufficient balance. Available: ৳${selectedGoal?.currentSaved?.toLocaleString()}`, "error");
      return;
    }

    if (trType === "goal2goal" && !selTo) {
      showToast("Please select destination goal", "error");
      return;
    }

    if (trType === "user2user" && !recipientFound) {
      showToast("Please search for a user first", "error");
      return;
    }

    setSubmitting(true);

    try {
      let response;
      if (trType === "goal2goal") {
        response = await axiosInstance.post("/transfers/goal-to-goal", {
          fromGoalId: selFrom,
          toGoalId: selTo,
          amount: amt,
          note: note || null,
        });
      } else {
        response = await axiosInstance.post("/transfers/user-to-user", {
          toUserPhone: recipientPhone,
          amount: amt,
          note: note || null,
          fromGoalId: selFrom,
        });
      }

      if (response.data.success) {
        setTransferResult(response.data.data);
        setShowModal(true);
        await fetchGoals();
      }
    } catch (error) {
      console.error("Transfer error:", error);
      showToast(error.response?.data?.message || "Transfer failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const resetTransfer = () => {
    setShowModal(false);
    setAmount("");
    setNote("");
    setRecipientPhone("");
    setRecipientFound(false);
    setRecipientData(null);
    setSelTo(null);
    setActiveStep(1);
    setTransferResult(null);
  };

  const getAmountDisplay = () => {
    const amt = parseFloat(amount) || 0;
    return amt > 0 ? `৳${amt.toLocaleString("en-IN")}` : "৳0";
  };

  const getSummaryTo = () => {
    if (trType === "goal2goal" && selTo) {
      const goal = goals.find(g => g._id === selTo);
      return goal?.goalName || "—";
    } else if (trType === "user2user" && recipientFound) {
      return `${recipientData?.name} (${recipientPhone})`;
    }
    return "—";
  };

  const getSummaryFrom = () => {
    const goal = goals.find(g => g._id === selFrom);
    return goal?.goalName || "—";
  };

  const getTypeLabel = () => {
    if (trType === "goal2goal")
      return lang === "bn" ? "Goal → Goal" : "Goal → Goal";
    return lang === "bn" ? "Another User" : "Another User";
  };

  const getTypeInfo = () => {
    if (trType === "goal2goal") {
      return lang === "bn"
        ? "Move money between your goals — completely free and instant."
        : "Move money between your goals — completely free and instant.";
    }
    return lang === "bn"
      ? "Send money directly to another Sanchoy Bondhu user."
      : "Send money directly to another Sanchoy Bondhu user.";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Target size={48} className="text-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No Active Goals</h3>
          <p className="text-foreground/60 mb-4">
            Create a goal first to make transfers
          </p>
          <button
            onClick={() => router.push("/dashboard/goals")}
            className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold"
          >
            Create a Goal
          </button>
        </div>
      </div>
    );
  }

  const selectedFromGoal = goals.find(g => g._id === selFrom);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark px-5 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1 flex items-center gap-2">
          <ArrowRightLeft size={20} /> Transfer
        </h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-2 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold hover:bg-white/30 transition"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
      </div>

      {/* Step Progress */}
      <div className="bg-gradient-to-br from-primary to-primary-dark px-5 pb-6">
        <div className="flex gap-2">
          {["Type", "Source", "Destination", "Amount"].map((label, idx) => (
            <div
              key={idx}
              className={`flex-1 py-2 rounded-full flex flex-col items-center gap-1 transition ${
                activeStep > idx
                  ? "bg-white/40"
                  : activeStep === idx + 1
                    ? "bg-white/30"
                    : "bg-white/15"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeStep > idx || activeStep === idx + 1
                    ? "bg-white text-primary"
                    : "bg-white/30 text-white"
                }`}
              >
                {idx + 1}
              </div>
              <div
                className={`text-[10px] ${activeStep === idx + 1 ? "text-white font-semibold" : "text-white/80"}`}
              >
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 pb-32">
        {/* Step 1: Transfer Type */}
        {activeStep === 1 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              <ArrowRightLeft size={18} /> What type of transfer?
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => selectType("goal2goal")}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  trType === "goal2goal"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <Target size={24} className={`mx-auto mb-2 ${trType === "goal2goal" ? "text-primary" : "text-foreground/50"}`} />
                <span className="text-sm font-semibold">Goal → Goal</span>
              </button>
              <button
                onClick={() => selectType("user2user")}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  trType === "user2user"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <Users size={24} className={`mx-auto mb-2 ${trType === "user2user" ? "text-primary" : "text-foreground/50"}`} />
                <span className="text-sm font-semibold">Another User</span>
              </button>
            </div>
            <div className="mt-4 p-3 bg-primary/5 border border-primary/15 rounded-lg flex gap-2 text-xs text-foreground/60">
              <AlertCircle size={14} className="text-primary shrink-0 mt-0.5" />
              <span>{getTypeInfo()}</span>
            </div>
          </div>
        )}

        {/* Step 2: Source Goal */}
        {activeStep === 2 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Send size={18} className="text-primary" /> Transfer from which goal?
            </div>
            <div className="space-y-3">
              {goals.map((goal) => (
                <div
                  key={goal._id}
                  onClick={() => selectFrom(goal._id)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-center gap-3 ${
                    selFrom === goal._id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Target size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">
                      {goal.goalName}
                    </div>
                    <div className="text-xs text-foreground/50">
                      Balance: ৳{goal.currentSaved.toLocaleString()} / ৳{goal.targetAmount.toLocaleString()}
                    </div>
                    <div className="h-1.5 bg-border rounded-full mt-2 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                  {selFrom === goal._id && (
                    <CheckCircle size={18} className="text-primary shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Destination */}
        {activeStep === 3 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              {trType === "goal2goal" ? <Target size={18} /> : <User size={18} />}
              {trType === "goal2goal" ? "Transfer to which goal?" : "Who are you sending to?"}
            </div>
            
            {trType === "goal2goal" && (
              <div className="space-y-3">
                {goals
                  .filter(goal => goal._id !== selFrom)
                  .map((goal) => (
                    <div
                      key={goal._id}
                      onClick={() => selectTo(goal._id)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-center gap-3 ${
                        selTo === goal._id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Target size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-foreground">
                          {goal.goalName}
                        </div>
                        <div className="text-xs text-foreground/50">
                          Current: ৳{goal.currentSaved.toLocaleString()}
                        </div>
                      </div>
                      {selTo === goal._id && (
                        <CheckCircle size={18} className="text-primary shrink-0" />
                      )}
                    </div>
                  ))}
              </div>
            )}

            {trType === "user2user" && (
              <div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-sm">
                    +880
                  </span>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => {
                      setRecipientPhone(e.target.value.replace(/\D/g, "").slice(0, 11));
                      setRecipientFound(false);
                      setRecipientData(null);
                    }}
                    placeholder="1XXXXXXXXXX"
                    maxLength="11"
                    className="w-full py-4 pl-20 pr-4 border-2 border-border rounded-xl text-base font-semibold text-foreground bg-background outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                {recipientFound && recipientData && (
                  <div className="mt-3 p-3 bg-primary/5 border border-primary/20 rounded-xl flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      <User size={20} />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">
                        {recipientData.name}
                      </div>
                      <div className="text-xs text-foreground/50">
                        {recipientData.phone}
                      </div>
                    </div>
                    <CheckCircle size={18} className="text-primary shrink-0" />
                  </div>
                )}
                <button
                  onClick={searchRecipient}
                  disabled={submitting}
                  className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search size={16} />}
                  Find User
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Amount */}
        {activeStep === 4 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Wallet size={18} className="text-primary" /> How much to transfer?
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-2xl font-bold">
                ৳
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="10"
                className="w-full py-5 pl-12 pr-4 text-right text-3xl font-bold border-2 border-border rounded-xl text-foreground bg-background outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[500, 1000, 2000, 5000, 10000, 20000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className={`py-2 rounded-lg border-2 text-sm font-semibold transition ${
                    parseFloat(amount) === amt
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-foreground/60 hover:border-primary/50"
                  }`}
                >
                  ৳{amt.toLocaleString()}
                </button>
              ))}
            </div>

            {selectedFromGoal && amount && parseFloat(amount) > selectedFromGoal.currentSaved && (
              <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> Insufficient balance. Available: ৳{selectedFromGoal.currentSaved.toLocaleString()}
              </p>
            )}

            <div className="mt-4">
              <label className="block text-sm font-semibold text-foreground mb-2">
                Note (Optional)
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 100))}
                rows={2}
                placeholder="Why are you sending? e.g., For Hajj fund"
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
              <div className="text-xs text-foreground/50 mt-1">
                {note.length}/100 characters
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {activeStep === 4 && (
          <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 border border-primary/20 rounded-xl p-4 mb-4">
            <div className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
              <Wallet size={14} /> Transfer Summary
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-dashed border-border">
              <span className="text-foreground/60">Type</span>
              <span className="font-semibold text-foreground">
                {getTypeLabel()}
              </span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-dashed border-border">
              <span className="text-foreground/60">From</span>
              <span className="font-semibold text-foreground">
                {getSummaryFrom()}
              </span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-dashed border-border">
              <span className="text-foreground/60">To</span>
              <span className="font-semibold text-foreground">
                {getSummaryTo()}
              </span>
            </div>
            <div className="flex justify-between text-lg py-3">
              <span className="text-foreground/60">Amount</span>
              <span className="font-bold text-primary">{getAmountDisplay()}</span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span className="text-foreground/60">Fee</span>
              <span className="font-semibold text-green-500 flex items-center gap-1">Free <CheckCircle size={12} /></span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      {activeStep === 4 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          <button
            onClick={submitTransfer}
            disabled={submitting || !amount || parseFloat(amount) < 10}
            className="w-full py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send size={18} />}
            Confirm Transfer
          </button>
        </div>
      )}

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && transferResult && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-md p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">
                Transfer Complete!
              </div>
              <div className="text-sm text-foreground/60 mb-4">
                {trType === "goal2goal" 
                  ? "Your transfer has been successfully completed."
                  : `${getAmountDisplay()} sent to ${transferResult.toUser}`}
              </div>
              <div className="bg-background border border-border rounded-xl p-3 space-y-2 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-foreground/60">Amount</span>
                  <span className="font-bold text-primary">{getAmountDisplay()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">From</span>
                  <span className="font-semibold">{getSummaryFrom()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">To</span>
                  <span className="font-semibold">{getSummaryTo()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">Transaction ID</span>
                  <span className="font-mono text-xs">{transferResult.transactionId?.slice(-8)}</span>
                </div>
              </div>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
              >
                Go to Dashboard
              </button>
              <button
                onClick={resetTransfer}
                className="w-full py-3 border-2 border-border text-foreground rounded-xl font-semibold hover:border-primary/50 transition"
              >
                Make Another Transfer
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm flex items-center gap-2 ${
              toast.type === "error" ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {toast.type === "error" ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransferPage;