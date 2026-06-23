"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2, Gift, Smartphone, Building, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";
import Link from "next/link";

// Translations
const translations = {
  en: {
    pageTitle: "🎁 Referral Bonus Withdrawal",
    pageSubtitle: "Withdraw your earned referral bonus",
    backToDashboard: "Back to Dashboard",
    important: "Important:",
    referralWithdrawalWarning: "Referral bonus withdrawals require admin approval and take 5-7 working days. Minimum withdrawal amount is ৳100.",
    availableBonus: "Available Referral Bonus",
    earned: "Earned",
    withdrawn: "Withdrawn",
    pending: "Pending",
    withdrawalAmount: "Withdrawal Amount (BDT)",
    enterAmount: "Enter amount",
    amountExceeds: "Amount exceeds available bonus of",
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
    ok: "OK",
    error: "Error!",
    failedToSubmit: "Failed to submit withdrawal request",
    insufficientBonus: "Insufficient bonus balance",
    noBonusAvailable: "No Referral Bonus Available",
    noBonusDesc: "You don't have any referral bonus available for withdrawal. Refer friends to earn bonus!",
    referFriends: "Refer Friends",
    phoneHint: "Enter 11-digit number (e.g., 01712345678 or 1712345678)",
  },
  bn: {
    pageTitle: "🎁 রেফারেল বোনাস উত্তোলন",
    pageSubtitle: "আপনার অর্জিত রেফারেল বোনাস উত্তোলন করুন",
    backToDashboard: "ড্যাশবোর্ডে ফিরে যান",
    important: "গুরুত্বপূর্ণ:",
    referralWithdrawalWarning: "রেফারেল বোনাস উত্তোলনের জন্য প্রশাসকের অনুমোদন প্রয়োজন এবং ৫-৭ কার্যদিবস সময় লাগে। ন্যূনতম উত্তোলনের পরিমাণ ৳১০০।",
    availableBonus: "উপলব্ধ রেফারেল বোনাস",
    earned: "অর্জিত",
    withdrawn: "উত্তোলিত",
    pending: "বিচারাধীন",
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
    ok: "ঠিক আছে",
    error: "ত্রুটি!",
    failedToSubmit: "উত্তোলন অনুরোধ জমা দিতে ব্যর্থ হয়েছে",
    insufficientBonus: "অপর্যাপ্ত বোনাস ব্যালেন্স",
    noBonusAvailable: "কোন রেফারেল বোনাস উপলব্ধ নেই",
    noBonusDesc: "উত্তোলনের জন্য আপনার কাছে কোন রেফারেল বোনাস নেই। বোনাস অর্জনের জন্য বন্ধুদের রেফার করুন!",
    referFriends: "বন্ধুদের রেফার করুন",
    phoneHint: "১১-সংখ্যার নম্বর লিখুন (যেমন: ০১৭১২৩৪৫৬৭৮ অথবা ১৭১২৩৪৫৬৭৮)",
  }
};

const ReferralWithdrawalPage = () => {
  const [loading, setLoading] = useState(true);
  const [balanceSummary, setBalanceSummary] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [lang, setLang] = useState("en");

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
  }, []);

  const paymentMethods = [
    { id: "bkash", name: t('bkash'), icon: <Smartphone size={20} />, color: "text-pink-600" },
    { id: "nagad", name: t('nagad'), icon: <Smartphone size={20} />, color: "text-orange-500" },
    { id: "bank", name: t('bank'), icon: <Building size={20} />, color: "text-blue-600" },
  ];

  const fetchBalanceSummary = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/balance/summary");
      if (res.data.success) {
        setBalanceSummary(res.data.data);
      }
    } catch (error) {
      console.error("Fetch balance summary error:", error);
      showToast(t('failedToSubmit'), "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalanceSummary();
  }, []);

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  const validatePhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length !== 10 && cleaned.length !== 11) {
      return { valid: false, formatted: cleaned };
    }
    const firstDigit = cleaned[0];
    const secondDigit = cleaned[1];
    const isValid = (firstDigit === '0' && secondDigit === '1') || firstDigit === '1';
    return { valid: isValid && (cleaned.length === 10 || cleaned.length === 11), formatted: cleaned };
  };

  const formatPhoneNumber = (number) => {
    const cleaned = number.replace(/\D/g, '');
    if (cleaned.length === 11 && cleaned[0] === '0') {
      return cleaned;
    }
    if (cleaned.length === 10 && cleaned[0] === '1') {
      return '0' + cleaned;
    }
    return cleaned;
  };

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/\D/g, '').slice(0, 11);
    setPhoneNumber(digits);
  };

  const handleSubmit = async () => {
    const amount = parseFloat(withdrawAmount);
    const availableBonus = balanceSummary?.referralBonus?.available || 0;

    if (!withdrawAmount || amount < 100) {
      showToast(t('minAmountError'));
      return;
    }

    if (amount > availableBonus) {
      showToast(t('amountExceeds').replace('{amount}', availableBonus.toLocaleString()));
      return;
    }

    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      const phoneValidation = validatePhoneNumber(phoneNumber);
      if (!phoneNumber || !phoneValidation.valid) {
        const methodName = paymentMethod === "bkash" ? t('bkash') : t('nagad');
        showToast(t('validPhoneError').replace('{method}', methodName));
        return;
      }
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

      const response = await axiosInstance.post("/balance/referral-withdrawal", requestData);

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
          fetchBalanceSummary();
        });
      }
    } catch (error) {
      console.error("Submit referral withdrawal error:", error);
      const errorMsg = error.response?.data?.message || t('failedToSubmit');
      Swal.fire({
        title: t('error'),
        text: errorMsg,
        icon: "error",
        confirmButtonColor: "#dc2626",
        confirmButtonText: t('ok'),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatCurrency = (amount) => {
    return "৳" + (amount || 0).toLocaleString();
  };

  const availableBonus = balanceSummary?.referralBonus?.available || 0;
  const earnedBonus = balanceSummary?.referralBonus?.earned || 0;
  const withdrawnBonus = balanceSummary?.referralBonus?.withdrawn || 0;
  const pendingBonus = balanceSummary?.referralBonus?.pendingWithdrawals || 0;

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
          <Link href="/dashboard" className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary mb-6 transition">
            <ArrowLeft size={18} /> {t('backToDashboard')}
          </Link>

          <div className="bg-card border border-border rounded-2xl p-8 text-center">
            <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gift size={36} className="text-amber-500" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{t('noBonusAvailable')}</h2>
            <p className="text-foreground/60 mb-6">{t('noBonusDesc')}</p>
            <Link href="/dashboard/referral" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition">
              <Gift size={18} /> {t('referFriends')}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-6">
      <div className="max-w-2xl mx-auto">
        {/* Back Link */}
        <Link href="/dashboard" className="inline-flex items-center gap-2 text-foreground/60 hover:text-primary mb-6 transition">
          <ArrowLeft size={18} /> {t('backToDashboard')}
        </Link>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{t('pageTitle')}</h1>
          <p className="text-foreground/60">{t('pageSubtitle')}</p>
        </motion.div>

        {/* Warning Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-6"
        >
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-amber-600">{t('important')}</p>
              <p className="text-sm text-amber-600/80">{t('referralWithdrawalWarning')}</p>
            </div>
          </div>
        </motion.div>

        {/* Balance Summary Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-card border border-border rounded-2xl p-6 mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
              <Gift size={24} className="text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-foreground/50">{t('availableBonus')}</p>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(availableBonus)}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
            <div className="text-center">
              <p className="text-xs text-foreground/50">{t('earned')}</p>
              <p className="text-lg font-semibold text-foreground">{formatCurrency(earnedBonus)}</p>
            </div>
            <div className="text-center border-x border-border">
              <p className="text-xs text-foreground/50">{t('withdrawn')}</p>
              <p className="text-lg font-semibold text-red-500">{formatCurrency(withdrawnBonus)}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-foreground/50">{t('pending')}</p>
              <p className="text-lg font-semibold text-amber-500">{formatCurrency(pendingBonus)}</p>
            </div>
          </div>
        </motion.div>

        {/* Withdrawal Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">{t('pageTitle')}</h3>

          {/* Amount Input */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('withdrawalAmount')}
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 font-semibold">৳</span>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                placeholder={t('enterAmount')}
                min="100"
                max={availableBonus}
                className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
            <p className="text-xs text-foreground/40 mt-1">
              {t('availableBonus')}: {formatCurrency(availableBonus)}
            </p>
          </div>

          {/* Payment Method */}
          <div className="mb-5">
            <label className="block text-sm font-medium text-foreground mb-2">
              {t('paymentMethod')}
            </label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30"
                  }`}
                >
                  <span className={method.color}>{method.icon}</span>
                  <span className="text-sm font-medium text-foreground">{method.name}</span>
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
                {paymentMethod === "bkash" ? t('bkash') : t('nagad')} {t('phoneNumber')}
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder={t('enterPhone')}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
              <p className="text-xs text-foreground/40 mt-1">{t('phoneHint')}</p>
            </motion.div>
          )}

          {paymentMethod === "bank" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="space-y-4 mb-5"
            >
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('bankName')}</label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
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
                <label className="block text-sm font-medium text-foreground mb-2">{t('accountNumber')}</label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder={t('enterAccountNumber')}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t('accountHolderName')}</label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  placeholder={t('enterHolderName')}
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !withdrawAmount}
            className="w-full py-3.5 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                {t('submitting')}
              </>
            ) : (
              <>
                <Gift size={18} />
                {t('sendRequest')}
              </>
            )}
          </button>
          <p className="text-xs text-center text-foreground/40 mt-3">{t('adminReview')}</p>
        </motion.div>
      </div>

      {/* Toast */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 ${
            toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          {toast.type === "success" ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-medium">{toast.message}</span>
        </motion.div>
      )}
    </div>
  );
};

export default ReferralWithdrawalPage;
