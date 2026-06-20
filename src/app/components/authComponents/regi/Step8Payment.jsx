"use client";

import React from "react";
import { motion } from "framer-motion";

// Translations
const translations = {
  en: {
    // Step Header
    stepLabel: "Step 8 / 8",
    paymentDetails: "Payment Details",
    paymentDesc: "Your savings withdrawals will be sent to this account",
    
    // Payment Methods
    bkash: "bKash",
    nagad: "Nagad",
    rocket: "Rocket",
    bank: "Bank",
    
    // Wallet Fields
    mobileWalletNumber: "Mobile Wallet Number *",
    accountHolderName: "Account Holder Name *",
    
    // Bank Fields
    bankName: "Bank Name *",
    selectBank: "Select Bank",
    dutchBanglaBank: "Dutch-Bangla Bank (DBBL)",
    bracBank: "BRAC Bank",
    islamiBank: "Islami Bank Bangladesh",
    sonaliBank: "Sonali Bank",
    janataBank: "Janata Bank",
    agraniBank: "Agrani Bank",
    rupaliBank: "Rupali Bank",
    pubaliBank: "Pubali Bank",
    uttaraBank: "Uttara Bank",
    mutualTrustBank: "Mutual Trust Bank",
    dhakaBank: "Dhaka Bank",
    easternBank: "Eastern Bank",
    cityBank: "City Bank",
    primeBank: "Prime Bank",
    trustBank: "Trust Bank",
    other: "Other",
    accountNumber: "Account Number *",
    branchName: "Branch Name",
    routingNumber: "Routing Number (Optional)",
    
    // Buttons
    createAccount: "🚀 Create Account",
    creatingAccount: "Creating account...",
    previous: "← Previous",
    
    // Validation
    selectPaymentMethod: "Please select a payment method",
  },
  bn: {
    // Step Header
    stepLabel: "ধাপ ৮ / ৮",
    paymentDetails: "পেমেন্ট তথ্য",
    paymentDesc: "আপনার সঞ্চয় উত্তোলন এই অ্যাকাউন্টে পাঠানো হবে",
    
    // Payment Methods
    bkash: "বিকাশ",
    nagad: "নগদ",
    rocket: "রকেট",
    bank: "ব্যাংক",
    
    // Wallet Fields
    mobileWalletNumber: "মোবাইল ওয়ালেট নম্বর *",
    accountHolderName: "অ্যাকাউন্ট হোল্ডারের নাম *",
    
    // Bank Fields
    bankName: "ব্যাংকের নাম *",
    selectBank: "ব্যাংক নির্বাচন",
    dutchBanglaBank: "ডাচ-বাংলা ব্যাংক (ডিবিবিএল)",
    bracBank: "ব্র্যাক ব্যাংক",
    islamiBank: "ইসলামী ব্যাংক বাংলাদেশ",
    sonaliBank: "সোনালী ব্যাংক",
    janataBank: "জনতা ব্যাংক",
    agraniBank: "অগ্রণী ব্যাংক",
    rupaliBank: "রূপালী ব্যাংক",
    pubaliBank: "পুবালী ব্যাংক",
    uttaraBank: "উত্তরা ব্যাংক",
    mutualTrustBank: "মিউচুয়াল ট্রাস্ট ব্যাংক",
    dhakaBank: "ঢাকা ব্যাংক",
    easternBank: "ইস্টার্ন ব্যাংক",
    cityBank: "সিটি ব্যাংক",
    primeBank: "প্রাইম ব্যাংক",
    trustBank: "ট্রাস্ট ব্যাংক",
    other: "অন্যান্য",
    accountNumber: "অ্যাকাউন্ট নম্বর *",
    branchName: "শাখার নাম",
    routingNumber: "রাউটিং নম্বর (ঐচ্ছিক)",
    
    // Buttons
    createAccount: "🚀 অ্যাকাউন্ট তৈরি করুন",
    creatingAccount: "অ্যাকাউন্ট তৈরি হচ্ছে...",
    previous: "← পূর্ববর্তী",
    
    // Validation
    selectPaymentMethod: "দয়া করে একটি পেমেন্ট পদ্ধতি নির্বাচন করুন",
  }
};

const Step8Payment = ({ 
  formData, 
  updateField, 
  errors, 
  isLoading, 
  handleSubmit, 
  handleBack,
  lang = "bn" 
}) => {
  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Get payment method options with translations
  const getPaymentMethods = () => [
    { id: "bkash", label: t('bkash') },
    { id: "nagad", label: t('nagad') },
    { id: "rocket", label: t('rocket') },
    { id: "bank", label: t('bank') },
  ];

  // Get bank options with translations
  const getBankOptions = () => [
    { value: "", label: t('selectBank') },
    { value: "Dutch-Bangla Bank (DBBL)", label: t('dutchBanglaBank') },
    { value: "BRAC Bank", label: t('bracBank') },
    { value: "Islami Bank Bangladesh", label: t('islamiBank') },
    { value: "Sonali Bank", label: t('sonaliBank') },
    { value: "Janata Bank", label: t('janataBank') },
    { value: "Agrani Bank", label: t('agraniBank') },
    { value: "Rupali Bank", label: t('rupaliBank') },
    { value: "Pubali Bank", label: t('pubaliBank') },
    { value: "Uttara Bank", label: t('uttaraBank') },
    { value: "Mutual Trust Bank", label: t('mutualTrustBank') },
    { value: "Dhaka Bank", label: t('dhakaBank') },
    { value: "Eastern Bank", label: t('easternBank') },
    { value: "City Bank", label: t('cityBank') },
    { value: "Prime Bank", label: t('primeBank') },
    { value: "Trust Bank", label: t('trustBank') },
    { value: "Other", label: t('other') },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">{t('stepLabel')}</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{t('paymentDetails')}</h2>
      <p className="text-foreground/60 mb-6">{t('paymentDesc')}</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {getPaymentMethods().map((method) => (
          <div 
            key={method.id} 
            onClick={() => updateField("paymentMethod", method.id)} 
            className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${formData.paymentMethod === method.id ? "border-primary bg-primary/5" : "border-border"}`}
          >
            <div className="font-semibold capitalize">{method.label}</div>
          </div>
        ))}
      </div>
      {errors.paymentMethod && <p className="text-xs text-red-500 mb-4">{errors.paymentMethod}</p>}

      {formData.paymentMethod && formData.paymentMethod !== "bank" ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('mobileWalletNumber')}</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border">+880</span>
              <input 
                type="tel" 
                value={formData.walletNumber} 
                onChange={(e) => updateField("walletNumber", e.target.value.replace(/\D/g, "").slice(0, 11))} 
                className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary" 
              />
            </div>
            {errors.walletNumber && <p className="text-xs text-red-500 mt-1">{errors.walletNumber}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('accountHolderName')}</label>
            <input 
              type="text" 
              value={formData.walletName} 
              onChange={(e) => updateField("walletName", e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" 
            />
            {errors.walletName && <p className="text-xs text-red-500 mt-1">{errors.walletName}</p>}
          </div>
        </div>
      ) : formData.paymentMethod === "bank" ? (
        <div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('bankName')}</label>
            <select 
              value={formData.bankName} 
              onChange={(e) => updateField("bankName", e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
            >
              {getBankOptions().map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.bankName && <p className="text-xs text-red-500 mt-1">{errors.bankName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('accountNumber')}</label>
            <input 
              type="text" 
              value={formData.bankAccNum} 
              onChange={(e) => updateField("bankAccNum", e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" 
            />
            {errors.bankAccNum && <p className="text-xs text-red-500 mt-1">{errors.bankAccNum}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('accountHolderName')}</label>
            <input 
              type="text" 
              value={formData.bankAccName} 
              onChange={(e) => updateField("bankAccName", e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" 
            />
            {errors.bankAccName && <p className="text-xs text-red-500 mt-1">{errors.bankAccName}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('branchName')}</label>
            <input 
              type="text" 
              value={formData.bankBranch} 
              onChange={(e) => updateField("bankBranch", e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" 
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('routingNumber')}</label>
            <input 
              type="text" 
              value={formData.bankRouting} 
              onChange={(e) => updateField("bankRouting", e.target.value)} 
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" 
            />
          </div>
        </div>
      ) : null}

      <button 
        onClick={handleSubmit} 
        disabled={isLoading} 
        className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
      >
        {isLoading ? (
          <span className="inline-flex items-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            {t('creatingAccount')}
          </span>
        ) : t('createAccount')}
      </button>
      <button 
        onClick={handleBack} 
        className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition mt-3"
      >
        {t('previous')}
      </button>
    </motion.div>
  );
};

export default Step8Payment;