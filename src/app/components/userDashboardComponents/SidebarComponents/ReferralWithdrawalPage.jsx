"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Gift,
  Loader2,
  CheckCircle,
  AlertCircle,
  Target,
  ArrowRightLeft,
  Wallet,
  Smartphone,
  Building,
  Banknote,
  TrendingUp,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";
import Link from "next/link";

// Translations
const translations = {
  en: {
    pageTitle: "🎁 Referral Bonus",
    pageSubtitle: "Withdraw or transfer your earned referral bonus",
    backToDashboard: "Back to Dashboard",
    availableBonus: "Available Referral Bonus",
    earned: "Earned",
    withdrawn: "Withdrawn",
    pending: "Pending",
    whatToDo: "What would you like to do?",
    withdrawToWallet: "Withdraw to Wallet",
    withdrawToWalletDesc: "Withdraw to bKash, Nagad, or Bank account",
    transferToGoal: "Transfer to Goal",
    transferToGoalDesc: "Add referral bonus to one of your savings goals",
    // Withdraw Form
    withdrawalAmount: "Withdrawal Amount (BDT)",
    enterAmount: "Enter amount",
    amountExceeds: "Amount exceeds available bonus of ৳{amount}",
    minAmountError: "Please withdraw at least ৳100",
    paymentMethod: "Payment Method",
    phoneNumber: "Number",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    accountHolderName: "Account Holder Name",
    sendRequest: "Send Withdrawal Request",
    submitting: "Submitting...",
    adminReview: "Admin will review within 5-7 working days",
    bkash: "bKash",
    nagad: "Nagad",
    bank: "Bank",
    selectBank: "Select Bank",
    bankDbbl: "Dutch-Bangla Bank (DBBL)",
    bankBrac: "BRAC Bank",
    bankIslami: "Islami Bank Bangladesh",
    bankSonali: "Sonali Bank",
    bankJanata: "Janata Bank",
    bankOther: "Other",
    enterPhone: "1XXXXXXXXX",
    enterAccountNumber: "Enter account number",
    enterHolderName: "Enter account holder name",
    validPhoneError: "Please enter a valid {method} number (11 digits)",
    selectBankError: "Please select a bank",
    enterAccountError: "Please enter account number",
    enterHolderError: "Please enter account holder name",
    requestSubmitted: "Request Submitted!",
    requestSuccess: "Your referral bonus withdrawal request has been submitted. Admin will review within 5-7 working days.",
    // Transfer to Goal
    selectGoal: "Select Goal",
    selectGoalDesc: "Choose which goal to add the bonus to",
    transferAmount: "Transfer Amount (BDT)",
    transferButton: "Transfer to Goal",
    transferring: "Transferring...",
    transferSuccess: "Bonus transferred successfully!",
    transferSuccessDesc: "৳{amount} has been added to your {goalName} goal.",
    goalProgress: "Goal Progress",
    currentSaved: "Current",
    targetAmount: "Target",
    noGoals: "No Active Goals",
    noGoalsDesc: "Create a savings goal first to transfer your referral bonus.",
    createGoal: "Create Goal",
    // Errors
    error: "Error!",
    failedToSubmit: "Failed to submit",
    insufficientBonus: "Insufficient bonus balance",
    noBonusAvailable: "No Referral Bonus Available",
    noBonusDesc: "You don't have any referral bonus available. Refer friends to earn bonus!",
    referFriends: "Refer Friends",
    phoneHint: "Enter 11-digit number (e.g., 01712345678 or 1712345678)",
  },
  bn: {
    pageTitle: "🎁 রেফারেল বোনাস",
    pageSubtitle: "আপনার অর্জিত রেফারেল বোনাস উত্তোলন বা ট্রান্সফার করুন",
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    availableBonus: "উপলব্ধ রেফারেল বোনাস",
    earned: "অর্জিত",
    withdrawn: "উত্তোলিত",
    pending: "বিচারাধীন",
    whatToDo: "আপনি কী করতে চান?",
    withdrawToWallet: "ওয়ালেটে উত্তোলন করুন",
    withdrawToWalletDesc: "বিকাশ, নগদ বা ব্যাংক অ্যাকাউন্টে উত্তোলন করুন",
    transferToGoal: "গোলে ট্রান্সফার করুন",
    transferToGoalDesc: "আপনার সঞ্চয় গোলে রেফারেল বোনাস যোগ করুন",
    // Withdraw Form
    withdrawalAmount: "উত্তোলনের পরিমাণ (বিডিটি)",
    enterAmount: "পরিমাণ লিখুন",
    amountExceeds: "পরিমাণ উপলব্ধ বোনাস ৳{amount} অতিক্রম করেছে",
    minAmountError: "অনুগ্রহ করে কমপক্ষে ৳১০০ উত্তোলন করুন",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    phoneNumber: "নম্বর",
    bankName: "ব্যাংকের নাম",
    accountNumber: "অ্যাকাউন্ট নম্বর",
    accountHolderName: "অ্যাকাউন্ট ধারকের নাম",
    sendRequest: "উত্তোলন অনুরোধ পাঠান",
    submitting: "জমা হচ্ছে...",
    adminReview: "প্রশাসক ৫-৭ কার্যদিবসের মধ্যে পর্যালোচনা করবেন",
    bkash: "বিকাশ",
    nagad: "নগদ",
    bank: "ব্যাংক",
    selectBank: "ব্যাংক নির্বাচন করুন",
    bankDbbl: "ডাচ-বাংলা ব্যাংক (ডিবিবিএল)",
    bankBrac: "ব্র্যাক ব্যাংক",
    bankIslami: "ইসলামী ব্যাংক বাংলাদেশ",
    bankSonali: "সোনালী ব্যাংক",
    bankJanata: "জনতা ব্যাংক",
    bankOther: "অন্যান্য",
    enterPhone: "১XXXXXXXXX",
    enterAccountNumber: "অ্যাকাউন্ট নম্বর লিখুন",
    enterHolderName: "অ্যাকাউন্ট ধারকের নাম লিখুন",
    validPhoneError: "অনুগ্রহ করে একটি বৈধ {method} নম্বর লিখুন (১১ সংখ্যা)",
    selectBankError: "অনুগ্রহ করে একটি ব্যাংক নির্বাচন করুন",
    enterAccountError: "অনুগ্রহ করে অ্যাকাউন্ট নম্বর লিখুন",
    enterHolderError: "অনুগ্রহ করে অ্যাকাউন্ট ধারকের নাম লিখুন",
    requestSubmitted: "অনুরোধ জমা দেওয়া হয়েছে!",
    requestSuccess: "আপনার রেফারেল বোনাস উত্তোলন অনুরোধ জমা দেওয়া হয়েছে। প্রশাসক ৫-৭ কার্যদিবসের মধ্যে পর্যালোচনা করবেন।",
    // Transfer to Goal
    selectGoal: "গোল নির্বাচন করুন",
    selectGoalDesc: "কোন গোলে বোনাস যোগ করবেন তা নির্বাচন করুন",
    transferAmount: "ট্রান্সফার পরিমাণ (বিডিটি)",
    transferButton: "গোলে ট্রান্সফার করুন",
    transferring: "ট্রান্সফার হচ্ছে...",
    transferSuccess: "বোনাস সফলভাবে ট্রান্সফার হয়েছে!",
    transferSuccessDesc: "৳{amount} আপনার {goalName} গোলে যোগ করা হয়েছে।",
    goalProgress: "গোলের অগ্রগতি",
    currentSaved: "বর্তমান",
    targetAmount: "লক্ষ্য",
    noGoals: "কোনো সক্রিয় গোল নেই",
    noGoalsDesc: "রেফারেল বোনাস ট্রান্সফার করতে প্রথমে একটি সঞ্চয় গোল তৈরি করুন।",
    createGoal: "গোল তৈরি করুন",
    // Errors
    error: "ত্রুটি!",
    failedToSubmit: "জমা দিতে ব্যর্থ হয়েছে",
    insufficientBonus: "অপর্যাপ্ত বোনাস ব্যালেন্স",
    noBonusAvailable: "কোন রেফারেল বোনাস উপলব্ধ নেই",
    noBonusDesc: "উত্তোলনের জন্য আপনার কাছে কোন রেফারেল বোনাস নেই। বোনাস অর্জনের জন্য বন্ধুদের রেফার করুন!",
    referFriends: "বন্ধুদের রেফার করুন",
    phoneHint: "১১-সংখ্যার নম্বর লিখুন (যেমন: ০১৭১২৩৪৫৬৭৮ অথবা ১৭১২৩৪৫৬৭৮)",
  }
};

const ReferralBonusPage = () => {
  const [loading, setLoading] = useState(true);
  const [balanceSummary, setBalanceSummary] = useState(null);
  const [activeTab, setActiveTab] = useState("withdraw"); // "withdraw" or "transfer"
  const [lang, setLang] = useState("en");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Withdraw form state
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Transfer to goal state
  const [goals, setGoals] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [transferAmount, setTransferAmount] = useState("");
  const [isTransferring, setIsTransferring] = useState(false);
  const [loadingGoals, setLoadingGoals] = useState(false);

  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach((param) => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage") || "en";
    setLang(savedLang);
  }, []);

  const fetchBalanceSummary = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/balance/summary");
      if (res.data.success) {
        setBalanceSummary(res.data.data);
      }
    } catch (error) {
      console.error("Fetch balance summary error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchGoals = async () => {
    setLoadingGoals(true);
    try {
      const res = await axiosInstance.get("/goals/my?status=active");
      if (res.data.success) {
        const activeGoals = res.data.data.goals.filter(
          (goal) => goal.status === "active"
        );
        setGoals(activeGoals);
        if (activeGoals.length > 0) {
          setSelectedGoal(activeGoals[0]._id);
        }
      }
    } catch (error) {
      console.error("Fetch goals error:", error);
    } finally {
      setLoadingGoals(false);
    }
  };

  useEffect(() => {
    fetchBalanceSummary();
  }, []);

  useEffect(() => {
    if (activeTab === "transfer") {
      fetchGoals();
    }
  }, [activeTab]);

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  const availableBonus = balanceSummary?.referralBonus?.available || 0;
  const earnedBonus = balanceSummary?.referralBonus?.earned || 0;
  const withdrawnBonus = balanceSummary?.referralBonus?.withdrawn || 0;
  const pendingBonus = balanceSummary?.referralBonus?.pendingWithdrawals || 0;

  const formatCurrency = (amount) => {
    return "৳" + (amount || 0).toLocaleString();
  };

  // ==================== WITHDRAW LOGIC ====================
  const validatePhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.length !== 10 && cleaned.length !== 11) {
      return { valid: false, formatted: cleaned };
    }
    const firstDigit = cleaned[0];
    const secondDigit = cleaned[1];
    const isValid =
      (firstDigit === "0" && secondDigit === "1") || firstDigit === "1";
    return {
      valid: isValid && (cleaned.length === 10 || cleaned.length === 11),
      formatted: cleaned,
    };
  };

  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, "");
    if (cleaned.length === 11 && cleaned[0] === "0") {
      return cleaned;
    }
    if (cleaned.length === 10 && cleaned[0] === "1") {
      return "0" + cleaned;
    }
    return cleaned;
  };

  const handleWithdrawSubmit = async () => {
    const amount = parseFloat(withdrawAmount);

    if (!withdrawAmount || amount < 100) {
      showToast(t("minAmountError"));
      return;
    }

    if (amount > availableBonus) {
      showToast(t("amountExceeds", { amount: availableBonus.toLocaleString() }));
      return;
    }

    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      const phoneValidation = validatePhoneNumber(phoneNumber);
      if (!phoneNumber || !phoneValidation.valid) {
        const methodName = paymentMethod === "bkash" ? t("bkash") : t("nagad");
        showToast(t("validPhoneError").replace("{method}", methodName));
        return;
      }
    }

    if (paymentMethod === "bank") {
      if (!bankName) {
        showToast(t("selectBankError"));
        return;
      }
      if (!accountNumber) {
        showToast(t("enterAccountError"));
        return;
      }
      if (!accountHolderName) {
        showToast(t("enterHolderError"));
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        withdrawalAmount: amount,
        reason: "Referral Bonus Withdrawal",
        paymentMethod,
      };

      if (paymentMethod === "bkash" || paymentMethod === "nagad") {
        requestData.phoneNumber = formatPhoneNumber(phoneNumber);
      }

      if (paymentMethod === "bank") {
        requestData.bankName = bankName;
        requestData.accountNumber = accountNumber;
        requestData.accountHolderName = accountHolderName;
      }

      const response = await axiosInstance.post(
        "/balance/referral-withdrawal",
        requestData
      );

      if (response.data.success) {
        Swal.fire({
          title: t("requestSubmitted"),
          text: t("requestSuccess"),
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        }).then(() => {
          setWithdrawAmount("");
          setPhoneNumber("");
          setBankName("");
          setAccountNumber("");
          setAccountHolderName("");
          fetchBalanceSummary();
        });
      }
    } catch (error) {
      console.error("Submit referral withdrawal error:", error);
      const errorMsg = error.response?.data?.message || t("failedToSubmit");
      Swal.fire({
        title: t("error"),
        text: errorMsg,
        icon: "error",
        confirmButtonColor: "#dc2626",
        confirmButtonText: "OK",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==================== TRANSFER TO GOAL LOGIC ====================
  const handleTransferToGoal = async () => {
    const amount = parseFloat(transferAmount);

    if (!transferAmount || amount <= 0) {
      showToast("Please enter a valid amount");
      return;
    }

    if (amount > availableBonus) {
      showToast(t("amountExceeds", { amount: availableBonus.toLocaleString() }));
      return;
    }

    if (!selectedGoal) {
      showToast(t("selectGoal"));
      return;
    }

    setIsTransferring(true);

    try {
      const response = await axiosInstance.post("/balance/referral-to-goal", {
        amount,
        goalId: selectedGoal,
      });

      if (response.data.success) {
        const goal = goals.find((g) => g._id === selectedGoal);
        Swal.fire({
          title: t("transferSuccess"),
          text: t("transferSuccessDesc", {
            amount: amount.toLocaleString(),
            goalName: goal?.goalName || "Savings",
          }),
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        }).then(() => {
          setTransferAmount("");
          fetchBalanceSummary();
          fetchGoals();
        });
      }
    } catch (error) {
      console.error("Transfer to goal error:", error);
      const errorMsg = error.response?.data?.message || t("failedToSubmit");
      Swal.fire({
        title: t("error"),
        text: errorMsg,
        icon: "error",
        confirmButtonColor: "#dc2626",
        confirmButtonText: "OK",
      });
    } finally {
      setIsTransferring(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

  // No bonus available state
  if (availableBonus <= 0) {
    return (
      <div className="min-h-screen bg-background p-4 md:p-6">
        <div className="max-w-2xl mx-auto">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary mb-6 transition"
          >
            <ArrowLeft size={18} /> {t("backToDashboard")}
          </Link>

          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift size={36} className="text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {t("noBonusAvailable")}
            </h2>
            <p className="text-foreground/60 mb-6">{t("noBonusDesc")}</p>
            <Link
              href="/dashboard/referral"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              <Gift size={18} /> {t("referFriends")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const selectedGoalData = goals.find((g) => g._id === selectedGoal);

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary mb-6 transition"
        >
          <ArrowLeft size={18} /> {t("backToDashboard")}
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
            {t("pageTitle")}
          </h1>
          <p className="text-foreground/60">{t("pageSubtitle")}</p>
        </motion.div>

        {/* Balance Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Gift size={24} className="text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-foreground/50">
                {t("availableBonus")}
              </p>
              <p className="text-2xl font-bold text-foreground">
                {formatCurrency(availableBonus)}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-foreground/50">{t("earned")}</p>
              <p className="text-lg font-semibold text-foreground">
                {formatCurrency(earnedBonus)}
              </p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-xs text-foreground/50">{t("withdrawn")}</p>
              <p className="text-lg font-semibold text-red-500">
                {formatCurrency(withdrawnBonus)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-xs text-foreground/50">{t("pending")}</p>
              <p className="text-lg font-semibold text-amber-500">
                {formatCurrency(pendingBonus)}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Selection Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-4 mb-6"
        >
          <div className="text-sm font-semibold text-foreground mb-3">
            {t("whatToDo")}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setActiveTab("withdraw")}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                activeTab === "withdraw"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <Wallet
                  size={20}
                  className={
                    activeTab === "withdraw"
                      ? "text-primary"
                      : "text-foreground/50"
                  }
                />
                <span className="font-semibold text-sm">{t("withdrawToWallet")}</span>
              </div>
              <p className="text-xs text-foreground/50">
                {t("withdrawToWalletDesc")}
              </p>
            </button>
            <button
              onClick={() => setActiveTab("transfer")}
              className={`p-4 rounded-xl border-2 text-left transition-all ${
                activeTab === "transfer"
                  ? "border-primary bg-primary/5"
                  : "border-border hover:border-primary/30"
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                <ArrowRightLeft
                  size={20}
                  className={
                    activeTab === "transfer"
                      ? "text-primary"
                      : "text-foreground/50"
                  }
                />
                <span className="font-semibold text-sm">{t("transferToGoal")}</span>
              </div>
              <p className="text-xs text-foreground/50">
                {t("transferToGoalDesc")}
              </p>
            </button>
          </div>
        </motion.div>

        {/* Withdraw Form */}
        <AnimatePresence mode="wait">
          {activeTab === "withdraw" && (
            <motion.div
              key="withdraw"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-foreground mb-4">
                {t("withdrawToWallet")}
              </h3>

              {/* Amount Input */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("withdrawalAmount")}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 font-semibold">
                    ৳
                  </span>
                  <input
                    type="number"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                    placeholder={t("enterAmount")}
                    min="100"
                    max={availableBonus}
                    className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  />
                </div>
                <p className="text-xs text-foreground/40 mt-1">
                  {t("availableBonus")}: {formatCurrency(availableBonus)}
                </p>
              </div>

              {/* Payment Method */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-foreground mb-2">
                  {t("paymentMethod")}
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "bkash", name: t("bkash"), icon: Smartphone, color: "text-pink-600" },
                    { id: "nagad", name: t("nagad"), icon: Smartphone, color: "text-orange-500" },
                    { id: "bank", name: t("bank"), icon: Building, color: "text-blue-600" },
                  ].map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === method.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/30"
                      }`}
                    >
                      <method.icon size={20} className={method.color} />
                      <span className="text-sm font-medium text-foreground">
                        {method.name}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Payment Details */}
              {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mb-5"
                >
                  <label className="block text-sm font-medium text-foreground mb-2">
                    {paymentMethod === "bkash" ? t("bkash") : t("nagad")}{" "}
                    {t("phoneNumber")}
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) => {
                      const digits = e.target.value.replace(/\D/g, "").slice(0, 11);
                      setPhoneNumber(digits);
                    }}
                    placeholder={t("enterPhone")}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  />
                  <p className="text-xs text-foreground/40 mt-1">{t("phoneHint")}</p>
                </motion.div>
              )}

              {paymentMethod === "bank" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="space-y-4 mb-5"
                >
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("bankName")}
                    </label>
                    <select
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    >
                      <option value="">{t("selectBank")}</option>
                      <option value="DBBL">{t("bankDbbl")}</option>
                      <option value="BRAC">{t("bankBrac")}</option>
                      <option value="Islami">{t("bankIslami")}</option>
                      <option value="Sonali">{t("bankSonali")}</option>
                      <option value="Janata">{t("bankJanata")}</option>
                      <option value="Other">{t("bankOther")}</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("accountNumber")}
                    </label>
                    <input
                      type="text"
                      value={accountNumber}
                      onChange={(e) => setAccountNumber(e.target.value)}
                      placeholder={t("enterAccountNumber")}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("accountHolderName")}
                    </label>
                    <input
                      type="text"
                      value={accountHolderName}
                      onChange={(e) => setAccountHolderName(e.target.value)}
                      placeholder={t("enterHolderName")}
                      className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    />
                  </div>
                </motion.div>
              )}

              {/* Submit Button */}
              <button
                onClick={handleWithdrawSubmit}
                disabled={isSubmitting || !withdrawAmount}
                className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    {t("submitting")}
                  </>
                ) : (
                  <>
                    <Banknote size={18} />
                    {t("sendRequest")}
                  </>
                )}
              </button>
              <p className="text-xs text-center text-foreground/40 mt-3">
                {t("adminReview")}
              </p>
            </motion.div>
          )}

          {/* Transfer to Goal Form */}
          {activeTab === "transfer" && (
            <motion.div
              key="transfer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <h3 className="text-lg font-bold text-foreground mb-4">
                {t("transferToGoal")}
              </h3>

              {loadingGoals ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 size={24} className="animate-spin text-primary" />
                </div>
              ) : goals.length === 0 ? (
                <div className="text-center py-8">
                  <Target size={48} className="text-foreground/30 mx-auto mb-3" />
                  <div className="font-bold text-foreground mb-2">
                    {t("noGoals")}
                  </div>
                  <div className="text-sm text-foreground/60 mb-4">
                    {t("noGoalsDesc")}
                  </div>
                  <Link
                    href="/dashboard/goals"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition"
                  >
                    <Target size={18} /> {t("createGoal")}
                  </Link>
                </div>
              ) : (
                <>
                  {/* Amount Input */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("transferAmount")}
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 font-semibold">
                        ৳
                      </span>
                      <input
                        type="number"
                        value={transferAmount}
                        onChange={(e) => setTransferAmount(e.target.value)}
                        placeholder={t("enterAmount")}
                        min="1"
                        max={availableBonus}
                        className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                      />
                    </div>
                    <p className="text-xs text-foreground/40 mt-1">
                      {t("availableBonus")}: {formatCurrency(availableBonus)}
                    </p>
                  </div>

                  {/* Goal Selection */}
                  <div className="mb-5">
                    <label className="block text-sm font-medium text-foreground mb-2">
                      {t("selectGoal")}
                    </label>
                    <p className="text-xs text-foreground/50 mb-3">
                      {t("selectGoalDesc")}
                    </p>
                    <div className="space-y-3">
                      {goals.map((goal) => (
                        <div
                          key={goal._id}
                          onClick={() => setSelectedGoal(goal._id)}
                          className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedGoal === goal._id
                              ? "border-primary bg-primary/5"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                              <Target size={20} />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-sm text-foreground">
                                {goal.goalName}
                              </div>
                              <div className="text-xs text-foreground/50">
                                {t("currentSaved")}: ৳
                                {goal.currentSaved.toLocaleString()} / ৳
                                {goal.targetAmount.toLocaleString()}
                              </div>
                              <div className="h-1.5 bg-border rounded-full mt-2 overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                                  style={{ width: `${goal.progress}%` }}
                                />
                              </div>
                            </div>
                            {selectedGoal === goal._id && (
                              <CheckCircle size={20} className="text-primary shrink-0" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Selected Goal Preview */}
                  {selectedGoalData && transferAmount && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className="mb-5 p-4 bg-primary/5 border border-primary/20 rounded-xl"
                    >
                      <div className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
                        <TrendingUp size={16} className="text-primary" />
                        {t("goalProgress")}
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-foreground/60">
                          {selectedGoalData.goalName}
                        </span>
                        <span className="font-semibold text-foreground">
                          {Math.min(
                            100,
                            Math.round(
                              ((selectedGoalData.currentSaved +
                                parseFloat(transferAmount || 0)) /
                                selectedGoalData.targetAmount) *
                                100
                            )
                          )}
                          %
                        </span>
                      </div>
                      <div className="h-2 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all"
                          style={{
                            width: `${Math.min(
                              100,
                              ((selectedGoalData.currentSaved +
                                parseFloat(transferAmount || 0)) /
                                selectedGoalData.targetAmount) *
                                100
                            )}%`,
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-foreground/50 mt-1">
                        <span>
                          ৳
                          {(
                            selectedGoalData.currentSaved +
                            parseFloat(transferAmount || 0)
                          ).toLocaleString()}
                        </span>
                        <span>
                          ৳{selectedGoalData.targetAmount.toLocaleString()}
                        </span>
                      </div>
                    </motion.div>
                  )}

                  {/* Transfer Button */}
                  <button
                    onClick={handleTransferToGoal}
                    disabled={isTransferring || !transferAmount}
                    className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isTransferring ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        {t("transferring")}
                      </>
                    ) : (
                      <>
                        <ArrowRightLeft size={18} />
                        {t("transferButton")}
                      </>
                    )}
                  </button>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 ${
              toast.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {toast.type === "success" ? (
              <CheckCircle size={18} />
            ) : (
              <AlertCircle size={18} />
            )}
            <span className="text-sm font-medium">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReferralBonusPage;
