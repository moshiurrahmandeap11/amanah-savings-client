"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, Target, Wallet, Banknote, Smartphone, Building, CreditCard, AlertCircle, CheckCircle } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

// Translations
const translations = {
  en: {
    // Page Title
    pageTitle: "💰 Withdrawal Request",
    pageSubtitle: "Request early withdrawal from your savings goal",
    
    // Warning Box
    important: "Important:",
    earlyWithdrawalWarning: "Savings are locked until goal maturity. Early withdrawal requires admin approval and takes 5-7 working days.",
    
    // Goals Section
    yourGoals: "Your Goals",
    saved: "Saved:",
    target: "Target:",
    locked: "Locked",
    
    // Form Labels
    withdrawalRequest: "Emergency Withdrawal Request",
    selectGoal: "Select Goal",
    withdrawalAmount: "Withdrawal Amount (BDT)",
    amountExceeds: "Amount exceeds your saved balance of",
    availableBalance: "Available balance:",
    reason: "Reason",
    paymentMethod: "Payment Method",
    phoneNumber: "Number",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    accountHolderName: "Account Holder Name",
    sendRequest: "Send Withdrawal Request",
    submitting: "Submitting...",
    adminReview: "Admin will review within 5-7 working days",
    
    // Reasons
    medicalEmergency: "Medical Emergency",
    familyEmergency: "Family Emergency",
    goalChange: "Goal Change",
    other: "Other",
    
    // Placeholders
    enterAmount: "Enter amount",
    enterPhone: "1XXXXXXXXXX",
    enterAccountNumber: "Enter account number",
    enterHolderName: "Enter account holder name",
    selectBank: "Select Bank",
    
    // Banks
    bankDbbl: "Dutch-Bangla Bank (DBBL)",
    bankBrac: "BRAC Bank",
    bankIslami: "Islami Bank Bangladesh",
    bankSonali: "Sonali Bank",
    bankJanata: "Janata Bank",
    bankOther: "Other",
    
    // Validation Messages
    selectGoalError: "Please select a goal",
    minAmountError: "Please withdraw at least ৳100",
    amountExceedsError: "Amount exceeds your saved balance of ৳{amount}",
    selectReasonError: "Please select a reason",
    validPhoneError: "Please enter a valid {method} number (11 digits)",
    selectBankError: "Please select a bank",
    enterAccountError: "Please enter account number",
    enterHolderError: "Please enter account holder name",
    
    // Success Modal
    requestSubmitted: "Request Submitted!",
    requestSuccess: "Your withdrawal request has been submitted. Admin will review within 5-7 working days.",
    ok: "OK",
    
    // Error Modal
    error: "Error!",
    failedToSubmit: "Failed to submit withdrawal request",
    
    // Empty State
    noActiveGoals: "No Active Goals",
    noActiveGoalsDesc: "You don't have any active savings goals with funds to withdraw.",
    createGoal: "Create a Goal",
    loadingGoals: "Loading your goals...",
    
    // Payment Methods
    bkash: "bKash",
    nagad: "Nagad",
    bank: "Bank",
    
    // Toast
    phoneHint: "Enter 11-digit number (e.g., 01712345678 or 1712345678)",
  },
  bn: {
    // Page Title
    pageTitle: "💰 উত্তোলন অনুরোধ",
    pageSubtitle: "আপনার সঞ্চয় লক্ষ্য থেকে আগাম উত্তোলনের অনুরোধ করুন",
    
    // Warning Box
    important: "গুরুত্বপূর্ণ:",
    earlyWithdrawalWarning: "লক্ষ্য পরিপক্ক না হওয়া পর্যন্ত সঞ্চয় লক করা থাকে। আগাম উত্তোলনের জন্য প্রশাসকের অনুমোদন প্রয়োজন এবং ৫-৭ কার্যদিবস সময় লাগে।",
    
    // Goals Section
    yourGoals: "আপনার লক্ষ্য",
    saved: "সঞ্চিত:",
    target: "লক্ষ্য:",
    locked: "লক করা",
    
    // Form Labels
    withdrawalRequest: "জরুরি উত্তোলন অনুরোধ",
    selectGoal: "লক্ষ্য নির্বাচন করুন",
    withdrawalAmount: "উত্তোলনের পরিমাণ (বিডিটি)",
    amountExceeds: "পরিমাণ আপনার সঞ্চিত ব্যালেন্স ৳{amount} অতিক্রম করেছে",
    availableBalance: "উপলব্ধ ব্যালেন্স:",
    reason: "কারণ",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    phoneNumber: "নম্বর",
    bankName: "ব্যাংকের নাম",
    accountNumber: "অ্যাকাউন্ট নম্বর",
    accountHolderName: "অ্যাকাউন্ট ধারকের নাম",
    sendRequest: "উত্তোলন অনুরোধ পাঠান",
    submitting: "জমা হচ্ছে...",
    adminReview: "প্রশাসক ৫-৭ কার্যদিবসের মধ্যে পর্যালোচনা করবেন",
    
    // Reasons
    medicalEmergency: "মেডিকেল জরুরি অবস্থা",
    familyEmergency: "পারিবারিক জরুরি অবস্থা",
    goalChange: "লক্ষ্য পরিবর্তন",
    other: "অন্যান্য",
    
    // Placeholders
    enterAmount: "পরিমাণ লিখুন",
    enterPhone: "১XXXXXXXXXX",
    enterAccountNumber: "অ্যাকাউন্ট নম্বর লিখুন",
    enterHolderName: "অ্যাকাউন্ট ধারকের নাম লিখুন",
    selectBank: "ব্যাংক নির্বাচন করুন",
    
    // Banks
    bankDbbl: "ডাচ-বাংলা ব্যাংক (ডিবিবিএল)",
    bankBrac: "ব্র্যাক ব্যাংক",
    bankIslami: "ইসলামী ব্যাংক বাংলাদেশ",
    bankSonali: "সোনালী ব্যাংক",
    bankJanata: "জনতা ব্যাংক",
    bankOther: "অন্যান্য",
    
    // Validation Messages
    selectGoalError: "অনুগ্রহ করে একটি লক্ষ্য নির্বাচন করুন",
    minAmountError: "অনুগ্রহ করে কমপক্ষে ৳১০০ উত্তোলন করুন",
    amountExceedsError: "পরিমাণ আপনার সঞ্চিত ব্যালেন্স ৳{amount} অতিক্রম করেছে",
    selectReasonError: "অনুগ্রহ করে একটি কারণ নির্বাচন করুন",
    validPhoneError: "অনুগ্রহ করে একটি বৈধ {method} নম্বর লিখুন (১১ সংখ্যা)",
    selectBankError: "অনুগ্রহ করে একটি ব্যাংক নির্বাচন করুন",
    enterAccountError: "অনুগ্রহ করে অ্যাকাউন্ট নম্বর লিখুন",
    enterHolderError: "অনুগ্রহ করে অ্যাকাউন্ট ধারকের নাম লিখুন",
    
    // Success Modal
    requestSubmitted: "অনুরোধ জমা দেওয়া হয়েছে!",
    requestSuccess: "আপনার উত্তোলন অনুরোধ জমা দেওয়া হয়েছে। প্রশাসক ৫-৭ কার্যদিবসের মধ্যে পর্যালোচনা করবেন।",
    ok: "ঠিক আছে",
    
    // Error Modal
    error: "ত্রুটি!",
    failedToSubmit: "উত্তোলন অনুরোধ জমা দিতে ব্যর্থ হয়েছে",
    
    // Empty State
    noActiveGoals: "কোন সক্রিয় লক্ষ্য নেই",
    noActiveGoalsDesc: "আপনার কাছে উত্তোলনের জন্য কোন সক্রিয় সঞ্চয় লক্ষ্য নেই।",
    createGoal: "একটি লক্ষ্য তৈরি করুন",
    loadingGoals: "আপনার লক্ষ্য লোড হচ্ছে...",
    
    // Payment Methods
    bkash: "বিকাশ",
    nagad: "নগদ",
    bank: "ব্যাংক",
    
    // Toast
    phoneHint: "১১-সংখ্যার নম্বর লিখুন (যেমন: ০১৭১২৩৪৫৬৭৮ অথবা ১৭১২৩৪৫৬৭৮)",
  }
};

const LiftingPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [reason, setReason] = useState("medical");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [lang, setLang] = useState("en");

  // Translation function
  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
  }, []);

  const reasons = [
    { value: "medical", label: t('medicalEmergency') },
    { value: "family", label: t('familyEmergency') },
    { value: "goal_change", label: t('goalChange') },
    { value: "other", label: t('other') },
  ];

  const paymentMethods = [
    { id: "bkash", name: t('bkash'), icon: <Smartphone size={20} />, color: "text-pink-600" },
    { id: "nagad", name: t('nagad'), icon: <Smartphone size={20} />, color: "text-orange-500" },
    { id: "bank", name: t('bank'), icon: <Building size={20} />, color: "text-blue-600" },
  ];

  // Function to validate and format phone number
  const validatePhoneNumber = (number) => {
    // Remove all non-digit characters
    const cleaned = number.replace(/\D/g, '');
    
    // Check if it's exactly 11 digits
    if (cleaned.length !== 10) {
      return { valid: false, formatted: cleaned };
    }
    
    // Check if it starts with 0 (0XXXXXXXXX) or 1 (1XXXXXXXXX)
    // For Bangladesh, valid numbers start with 01 or 1
    const firstDigit = cleaned[0];
    const secondDigit = cleaned[1];
    
    // Valid if starts with 0 and second digit is 1, or starts with 1 directly
    const isValid = (firstDigit === '0' && secondDigit === '1') || firstDigit === '1';
    
    return { valid: isValid, formatted: cleaned };
  };

  // Function to format phone number for display/storage
  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 11) {
      // If starts with 0, keep as is (0XXXXXXXXX)
      if (cleaned[0] === '0') {
        return cleaned;
      }
      // If starts with 1, add 0 prefix (1XXXXXXXXX -> 01XXXXXXXXX)
      if (cleaned[0] === '1') {
        return '0' + cleaned;
      }
    }
    return cleaned;
  };

  // Handle phone number input
  const handlePhoneChange = (e) => {
    const input = e.target.value;
    // Allow only digits
    const digits = input.replace(/\D/g, '');
    // Limit to 11 digits (max length for BD phone numbers with 0)
    const limited = digits.slice(0, 11);
    setPhoneNumber(limited);
  };

  // Fetch user's goals
  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/goals?status=active");
      if (response.data.success) {
        const activeGoals = response.data.data.goals.filter(
          goal => goal.status === "active" && goal.currentSaved > 0
        );
        setGoals(activeGoals);
        if (activeGoals.length > 0) {
          setSelectedGoal(activeGoals[0]._id);
        }
      }
    } catch (error) {
      console.error("Fetch goals error:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  const handleSubmit = async () => {
    const amount = parseFloat(withdrawAmount);
    const selectedGoalData = goals.find(g => g._id === selectedGoal);

    if (!selectedGoal) {
      showToast(t('selectGoalError'));
      return;
    }

    if (!withdrawAmount || amount < 100) {
      showToast(t('minAmountError'));
      return;
    }

    if (amount > selectedGoalData?.currentSaved) {
      showToast(t('amountExceedsError').replace('{amount}', selectedGoalData.currentSaved.toLocaleString()));
      return;
    }

    if (!reason) {
      showToast(t('selectReasonError'));
      return;
    }

    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      // Validate phone number
      const phoneValidation = validatePhoneNumber(phoneNumber);
      
      if (!phoneNumber || !phoneValidation.valid) {
        const methodName = paymentMethod === "bkash" ? t('bkash') : t('nagad');
        showToast(t('validPhoneError').replace('{method}', methodName));
        return;
      }
      
      // Format the phone number for submission (add 0 prefix if missing)
      const formattedPhone = formatPhoneNumber(phoneNumber);
      // Store the formatted number in a variable to use in the request
      requestData.phoneNumber = formattedPhone;
    }

    if (paymentMethod === "bank") {
      if (!bankName) {
        showToast(t('selectBankError'));
        return;
      }
      if (!accountNumber) {
        showToast(t('enterAccountError'));
        return;
      }
      if (!accountHolderName) {
        showToast(t('enterHolderError'));
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        goalId: selectedGoal,
        withdrawalAmount: amount,
        reason,
        paymentMethod,
      };

      if (paymentMethod === "bkash" || paymentMethod === "nagad") {
        // Format phone number (ensure 0 prefix)
        const formattedPhone = formatPhoneNumber(phoneNumber);
        requestData.phoneNumber = formattedPhone;
      }

      if (paymentMethod === "bank") {
        requestData.bankName = bankName;
        requestData.accountNumber = accountNumber;
        requestData.accountHolderName = accountHolderName;
      }

      const response = await axiosInstance.post("/withdrawals", requestData);

      if (response.data.success) {
        Swal.fire({
          title: t('requestSubmitted'),
          text: t('requestSuccess'),
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: t('ok'),
        }).then(() => {
          setWithdrawAmount("");
          setPhoneNumber("");
          setBankName("");
          setAccountNumber("");
          setAccountHolderName("");
          setReason("medical");
        });
      }
    } catch (error) {
      console.error("Submit withdrawal error:", error);
      Swal.fire({
        title: t('error'),
        text: error.response?.data?.message || t('failedToSubmit'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Declare requestData outside the try block for access
  let requestData = {};

  const selectedGoalData = goals.find(g => g._id === selectedGoal);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">{t('loadingGoals')}</p>
        </div>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="max-w-3xl">
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Target size={64} className="text-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">{t('noActiveGoals')}</h3>
          <p className="text-foreground/60 mb-4">
            {t('noActiveGoalsDesc')}
          </p>
          <button
            onClick={() => window.location.href = "/dashboard/goals"}
            className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            {t('createGoal')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
          <Wallet size={28} className="text-primary" /> {t('pageTitle')}
        </h2>
        <p className="text-sm text-foreground/60 mb-4">{t('pageSubtitle')}</p>

        {/* Warning Box */}
        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl mb-5">
          <div className="flex gap-2">
            <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/70 leading-relaxed">
              <strong>{t('important')}</strong> {t('earlyWithdrawalWarning')}
            </div>
          </div>
        </div>

        {/* Goals List Card */}
        <div className="bg-card border border-border rounded-xl p-5 mb-5">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Target size={18} /> {t('yourGoals')}
          </div>
          <div className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal._id}
                className="p-3 bg-background rounded-lg border border-border flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  <Target size={18} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{goal.goalName}</div>
                  <div className="text-xs text-foreground/50">
                    {t('saved')} ৳{goal.currentSaved.toLocaleString()} · {t('target')} ৳{goal.targetAmount.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-500 rounded-md font-semibold flex items-center gap-1">
                  <AlertTriangle size={10} /> {t('locked')}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal Request Form */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">
            <AlertCircle size={18} className="text-primary" /> {t('withdrawalRequest')}
          </div>

          {/* Select Goal */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide flex items-center gap-1">
              <Target size={12} /> {t('selectGoal')}
            </label>
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
            >
              {goals.map((goal) => (
                <option key={goal._id} value={goal._id}>
                  {goal.goalName} — ৳{goal.currentSaved.toLocaleString()} {t('saved')}
                </option>
              ))}
            </select>
          </div>

          {/* Withdrawal Amount */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide flex items-center gap-1">
              <Banknote size={12} /> {t('withdrawalAmount')}
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">৳</span>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                min="100"
                max={selectedGoalData?.currentSaved}
                placeholder={t('enterAmount')}
                className="w-full p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
              />
            </div>
            {selectedGoalData && withdrawAmount > selectedGoalData.currentSaved && (
              <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {t('amountExceeds').replace('{amount}', selectedGoalData.currentSaved.toLocaleString())}
              </p>
            )}
            {selectedGoalData && (
              <p className="text-xs text-foreground/50 mt-1">
                {t('availableBalance')} ৳{selectedGoalData.currentSaved.toLocaleString()}
              </p>
            )}
          </div>

          {/* Reason */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
              {t('reason')}
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
            >
              {reasons.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
              {t('paymentMethod')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`py-3 rounded-xl border-2 text-center transition ${
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  <div className={`flex justify-center mb-1 ${paymentMethod === method.id ? method.color : "text-foreground/50"}`}>
                    {method.icon}
                  </div>
                  <div className={`text-xs font-semibold ${paymentMethod === method.id ? "text-primary" : "text-foreground/70"}`}>
                    {method.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number (for mobile banking) */}
          {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
            <div className="mb-5">
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                {paymentMethod === "bkash" ? t('bkash') : t('nagad')} {t('phoneNumber')}
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-background text-foreground/60 text-sm">
                  +880
                </span>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder={t('enterPhone')}
                  className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
              <p className="text-xs text-foreground/50 mt-1">{t('phoneHint')}</p>
            </div>
          )}

          {/* Bank Fields */}
          {paymentMethod === "bank" && (
            <div className="mb-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  {t('bankName')}
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                >
                  <option value="">{t('selectBank')}</option>
                  <option value="DBBL">{t('bankDbbl')}</option>
                  <option value="BRAC">{t('bankBrac')}</option>
                  <option value="Islami">{t('bankIslami')}</option>
                  <option value="Sonali">{t('bankSonali')}</option>
                  <option value="Janata">{t('bankJanata')}</option>
                  <option value="Other">{t('bankOther')}</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  {t('accountNumber')}
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder={t('enterAccountNumber')}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  {t('accountHolderName')}
                </label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  placeholder={t('enterHolderName')}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t('submitting')}
              </>
            ) : (
              <>
                <CreditCard size={18} />
                {t('sendRequest')}
              </>
            )}
          </button>

          <p className="text-center text-xs text-foreground/50 mt-3 flex items-center justify-center gap-1">
            <AlertCircle size={12} /> {t('adminReview')}
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg shadow-lg text-sm ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white flex items-center gap-2`}
        >
          {toast.type === "error" ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
          {toast.message}
        </motion.div>
      )}
    </>
  );
};

export default LiftingPage;