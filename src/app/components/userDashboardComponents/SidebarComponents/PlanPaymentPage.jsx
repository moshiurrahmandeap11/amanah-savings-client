"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Crown,
  Gem,
  Medal,
  Star,
  Trophy,
  Loader2,
  Smartphone,
  Building,
  Banknote,
  Upload,
  AlertCircle,
  Clock,
  CreditCard,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

// Plan configuration (same as PlanUpgradePage)
const PLAN_CONFIG = {
  bronze: {
    name: "Bronze",
    nameBn: "ব্রোঞ্জ",
    icon: Medal,
    color: "from-amber-600 to-amber-700",
    bgColor: "bg-amber-50 dark:bg-amber-950/20",
    borderColor: "border-amber-200 dark:border-amber-800/30",
    textColor: "text-amber-700 dark:text-amber-400",
    monthlyFee: 0,
    yearlyFee: 0,
    features: ["Save up to ৳10,000 per deposit", "Monthly savings: ৳500–৳2,000", "Basic goal tracking", "Community access"],
    featuresBn: ["প্রতি জমায় সর্বোচ্চ ৳১০,০০০", "মাসিক সঞ্চয়: ৳৫০০–৳২,০০০", "বেসিক গোল ট্র্যাকিং", "কমিউনিটি অ্যাক্সেস"],
  },
  silver: {
    name: "Silver",
    nameBn: "সিলভার",
    icon: Star,
    color: "from-gray-400 to-gray-500",
    bgColor: "bg-gray-50 dark:bg-gray-950/20",
    borderColor: "border-gray-200 dark:border-gray-800/30",
    textColor: "text-gray-600 dark:text-gray-400",
    monthlyFee: 199,
    yearlyFee: 159,
    features: ["Save up to ৳25,000 per deposit", "Monthly savings: ৳2,000–৳10,000", "Advanced goal tracking", "Priority support", "Streak bonuses"],
    featuresBn: ["প্রতি জমায় সর্বোচ্চ ৳২৫,০০০", "মাসিক সঞ্চয়: ৳২,০০০–৳১০,০০০", "অ্যাডভান্সড গোল ট্র্যাকিং", "প্রায়োরিটি সাপোর্ট", "স্ট্রিক বোনাস"],
  },
  gold: {
    name: "Gold",
    nameBn: "গোল্ড",
    icon: Trophy,
    color: "from-yellow-400 to-yellow-600",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    borderColor: "border-yellow-200 dark:border-yellow-800/30",
    textColor: "text-yellow-600 dark:text-yellow-400",
    monthlyFee: 499,
    yearlyFee: 399,
    features: ["Save up to ৳100,000 per deposit", "Monthly savings: ৳10,000–৳50,000", "Premium goal tracking", "VIP support", "Streak bonuses", "Achievement rewards", "Referral bonuses"],
    featuresBn: ["প্রতি জমায় সর্বোচ্চ ৳১,০০,০০০", "মাসিক সঞ্চয়: ৳১০,০০০–৳৫০,০০০", "প্রিমিয়াম গোল ট্র্যাকিং", "ভিআইপি সাপোর্ট", "স্ট্রিক বোনাস", "অ্যাচিভমেন্ট রিওয়ার্ড", "রেফারেল বোনাস"],
  },
  platinum: {
    name: "Platinum",
    nameBn: "প্লatinum",
    icon: Crown,
    color: "from-purple-500 to-purple-700",
    bgColor: "bg-purple-50 dark:bg-purple-950/20",
    borderColor: "border-purple-200 dark:border-purple-800/30",
    textColor: "text-purple-600 dark:text-purple-400",
    monthlyFee: 999,
    yearlyFee: 799,
    features: ["Save up to ৳500,000 per deposit", "Monthly savings: ৳50,000+", "Elite goal tracking", "Dedicated support", "Maximum streak bonuses", "Exclusive achievement rewards", "Highest referral bonuses", "Early access to new features"],
    featuresBn: ["প্রতি জমায় সর্বোচ্চ ৳৫,০০,০০০", "মাসিক সঞ্চয়: ৳৫০,০০০+", "এলিট গোল ট্র্যাকিং", "ডেডিকেটেড সাপোর্ট", "সর্বোচ্চ স্ট্রিক বোনাস", "এক্সক্লুসিভ অ্যাচিভমেন্ট রিওয়ার্ড", "সর্বোচ্চ রেফারেল বোনাস", "নতুন ফিচারে আর্লি অ্যাক্সেস"],
  },
};

// Translations
const translations = {
  en: {
    pageTitle: "Plan Payment",
    payForPlan: "Pay for your plan upgrade",
    selectedPlan: "Selected Plan",
    billingCycle: "Billing Cycle",
    amountToPay: "Amount to Pay",
    paymentMethod: "Payment Method",
    bkash: "bKash",
    nagad: "Nagad",
    bank: "Bank Transfer",
    phoneNumber: "Phone Number",
    enterPhone: "01XXXXXXXXX",
    bankName: "Bank Name",
    selectBank: "Select Bank",
    bankDbbl: "Dutch-Bangla Bank (DBBL)",
    bankBrac: "BRAC Bank",
    bankIslami: "Islami Bank Bangladesh",
    bankSonali: "Sonali Bank",
    bankJanata: "Janata Bank",
    bankOther: "Other",
    accountNumber: "Account Number",
    enterAccountNumber: "Enter account number",
    accountHolderName: "Account Holder Name",
    enterHolderName: "Enter account holder name",
    transactionId: "Transaction ID",
    enterTransactionId: "Enter transaction ID from payment",
    screenshot: "Payment Screenshot (Optional)",
    uploadScreenshot: "Click to upload screenshot",
    submitPayment: "Submit Payment",
    submitting: "Submitting...",
    paymentSubmitted: "Payment Submitted!",
    paymentPendingText: "Your payment is pending admin approval. You will be notified once approved. Your current plan remains active until then.",
    backToPlans: "Back to Plans",
    goToDashboard: "Go to Dashboard",
    error: "Error!",
    failedToSubmit: "Failed to submit payment",
    invalidPhone: "Invalid phone number format",
    pendingRequestTitle: "Pending Request Found",
    pendingRequestText: "You already have a pending plan upgrade request. Please wait for admin approval.",
    freePlanNoPayment: "Bronze plan is free. No payment required.",
    paymentInstructions: "Please send the payment via bKash/Nagad to admin number: 017XXXXXXXX. After payment, enter the transaction ID below.",
  },
  bn: {
    pageTitle: "প্ল্যান পেমেন্ট",
    payForPlan: "আপনার প্ল্যান আপগ্রেডের জন্য পেমেন্ট করুন",
    selectedPlan: "নির্বাচিত প্ল্যান",
    billingCycle: "বিলিং সাইকেল",
    amountToPay: "প্রদেয় পরিমাণ",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    bkash: "বিকাশ",
    nagad: "নগদ",
    bank: "ব্যাংক ট্রান্সফার",
    phoneNumber: "ফোন নম্বর",
    enterPhone: "01XXXXXXXXX",
    bankName: "ব্যাংকের নাম",
    selectBank: "ব্যাংক নির্বাচন করুন",
    bankDbbl: "ডাচ-বাংলা ব্যাংক (ডিবিবিএল)",
    bankBrac: "ব্র্যাক ব্যাংক",
    bankIslami: "ইসলামী ব্যাংক বাংলাদেশ",
    bankSonali: "সোনালী ব্যাংক",
    bankJanata: "জনতা ব্যাংক",
    bankOther: "অন্যান্য",
    accountNumber: "অ্যাকাউন্ট নম্বর",
    enterAccountNumber: "অ্যাকাউন্ট নম্বর লিখুন",
    accountHolderName: "অ্যাকাউন্ট ধারকের নাম",
    enterHolderName: "অ্যাকাউন্ট ধারকের নাম লিখুন",
    transactionId: "ট্রানজেকশন আইডি",
    enterTransactionId: "পেমেন্ট থেকে ট্রানজেকশন আইডি লিখুন",
    screenshot: "পেমেন্ট স্ক্রিনশট (ঐচ্ছিক)",
    uploadScreenshot: "স্ক্রিনশট আপলোড করতে ক্লিক করুন",
    submitPayment: "পেমেন্ট জমা দিন",
    submitting: "জমা হচ্ছে...",
    paymentSubmitted: "পেমেন্ট জমা দেওয়া হয়েছে!",
    paymentPendingText: "আপনার পেমেন্ট অ্যাডমিন অনুমোদনের জন্য অপেক্ষমান। অনুমোদন হলে আপনাকে জানানো হবে। ততক্ষণ পর্যন্ত আপনার বর্তমান প্ল্যান সক্রিয় থাকবে।",
    backToPlans: "প্ল্যানে ফিরে যান",
    goToDashboard: "ড্যাশবোর্ডে যান",
    error: "ত্রুটি!",
    failedToSubmit: "পেমেন্ট জমা দিতে ব্যর্থ হয়েছে",
    invalidPhone: "অবৈধ ফোন নম্বর ফরম্যাট",
    pendingRequestTitle: "অপেক্ষমান অনুরোধ পাওয়া গেছে",
    pendingRequestText: "আপনার ইতিমধ্যে একটি অপেক্ষমান প্ল্যান আপগ্রেড অনুরোধ রয়েছে। অনুগ্রহ করে অ্যাডমিন অনুমোদনের জন্য অপেক্ষা করুন।",
    freePlanNoPayment: "ব্রোঞ্জ প্ল্যান ফ্রি। কোনো পেমেন্টের প্রয়োজন নেই।",
    paymentInstructions: "অনুগ্রহ করে বিকাশ/নগদ-এর মাধ্যমে অ্যাডমিন নম্বরে পেমেন্ট করুন: 017XXXXXXXX। পেমেন্ট করার পর, নিচে ট্রানজেকশন আইডি লিখুন।",
  },
};

const PlanPaymentPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();
  const [lang, setLang] = useState("en");
  const [loading, setLoading] = useState(false);
  const [checkingPending, setCheckingPending] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [hasPending, setHasPending] = useState(false);

  // Form state
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [screenshot, setScreenshot] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [paymentMethods, setPaymentMethods] = useState(null);

  const planKey = searchParams.get("plan")?.toLowerCase() || "bronze";
  const cycleKey = searchParams.get("cycle")?.toLowerCase() || "monthly";
  const plan = PLAN_CONFIG[planKey];
  const fee = cycleKey === "yearly" ? plan?.yearlyFee : plan?.monthlyFee;

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage") || "en";
    setLang(savedLang);
  }, []);

  // Check for existing pending plan upgrade
  useEffect(() => {
    const checkPending = async () => {
      try {
        const res = await axiosInstance.get("/plan-upgrades/my");
        if (res.data.success && res.data.data.length > 0) {
          const pending = res.data.data.find((r) => r.status === "pending");
          if (pending) {
            setHasPending(true);
          }
        }
      } catch (error) {
        console.error("Check pending error:", error);
      } finally {
        setCheckingPending(false);
      }
    };
    checkPending();
  }, []);

  // Fetch payment methods from settings
  useEffect(() => {
    const fetchPaymentMethods = async () => {
      try {
        const response = await axiosInstance.get("/payment-instructions");
        if (response.data?.success) {
          setPaymentMethods(response.data.data?.methods || null);
        }
      } catch (error) {
        console.error("Fetch payment methods error:", error);
      }
    };
    fetchPaymentMethods();
  }, []);

  const handleScreenshotChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setScreenshot(file);
      const reader = new FileReader();
      reader.onloadend = () => setScreenshotPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const validatePhone = (number) => {
    const cleaned = number.replace(/\D/g, "");
    const phoneRegex = /^(0?1[3-9]\d{8})$/;
    return phoneRegex.test(cleaned);
  };

  const handleSubmit = async () => {
    // Validation
    if (planKey === "bronze" || fee === 0) {
      Swal.fire({
        title: t("error"),
        text: t("freePlanNoPayment"),
        icon: "info",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!transactionId || transactionId.trim().length < 3) {
      Swal.fire({
        title: t("error"),
        text: "Transaction ID is required",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      if (!phoneNumber || !validatePhone(phoneNumber)) {
        Swal.fire({
          title: t("error"),
          text: t("invalidPhone"),
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
        return;
      }
    }

    if (paymentMethod === "bank") {
      if (!bankName || !accountNumber || !accountHolderName) {
        Swal.fire({
          title: t("error"),
          text: "All bank fields are required",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
        return;
      }
    }

    setLoading(true);

    try {
      // Upload screenshot if provided
      let screenshotUrl = null;
      if (screenshot) {
        const formData = new FormData();
        formData.append("file", screenshot);
        const uploadRes = await axiosInstance.post("/upload", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        if (uploadRes.data.success) {
          screenshotUrl = uploadRes.data.data.url;
        }
      }

      const requestData = {
        selectedPlan: planKey,
        billingCycle: cycleKey,
        paymentMethod,
        transactionId: transactionId.trim(),
        screenshot: screenshotUrl,
      };

      if (paymentMethod === "bkash" || paymentMethod === "nagad") {
        requestData.phoneNumber = phoneNumber.replace(/\D/g, "");
      }

      if (paymentMethod === "bank") {
        requestData.bankName = bankName;
        requestData.accountNumber = accountNumber;
        requestData.accountHolderName = accountHolderName;
      }

      const response = await axiosInstance.post("/plan-upgrades/", requestData);

      if (response.data.success) {
        setSubmitted(true);
      }
    } catch (error) {
      console.error("Submit payment error:", error);
      const msg = error.response?.data?.message || t("failedToSubmit");
      Swal.fire({
        title: t("error"),
        text: msg,
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  if (checkingPending) {
    return (
      <div className="max-w-2xl mx-auto flex items-center justify-center py-20">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  // Show pending request state
  if (hasPending && !submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-card border border-border rounded-2xl p-8 text-center">
          <div className="w-20 h-20 bg-amber-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock size={36} className="text-amber-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t("pendingRequestTitle")}</h2>
          <p className="text-foreground/60 mb-6">{t("pendingRequestText")}</p>
          <button
            onClick={() => router.push("/dashboard/plan")}
            className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            {t("backToPlans")}
          </button>
        </div>
      </div>
    );
  }

  // Show success state after submission
  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-2xl p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check size={36} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t("paymentSubmitted")}</h2>
          <p className="text-foreground/60 mb-6">{t("paymentPendingText")}</p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => router.push("/dashboard/plan")}
              className="px-6 py-3 border border-border text-foreground rounded-xl font-semibold hover:bg-primary/5 transition"
            >
              {t("backToPlans")}
            </button>
            <button
              onClick={() => router.push("/dashboard")}
              className="px-6 py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              {t("goToDashboard")}
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  // Invalid plan
  if (!plan) {
    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <p className="text-foreground/60">Invalid plan selected</p>
        <button
          onClick={() => router.push("/dashboard/plan")}
          className="mt-4 px-6 py-3 bg-primary text-white rounded-xl font-semibold"
        >
          {t("backToPlans")}
        </button>
      </div>
    );
  }

  const Icon = plan.icon;

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/dashboard/plan")}
          className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary/10 transition"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t("pageTitle")}</h2>
          <p className="text-sm text-foreground/60">{t("payForPlan")}</p>
        </div>
      </div>

      {/* Plan Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl border p-6 mb-6 ${plan.borderColor} ${plan.bgColor}`}
      >
        <div className="flex items-center gap-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-white`}>
            <Icon size={32} />
          </div>
          <div className="flex-1">
            <div className="text-sm text-foreground/60">{t("selectedPlan")}</div>
            <div className="text-2xl font-bold text-foreground">
              {lang === "bn" ? plan.nameBn : plan.name}
            </div>
            <div className="text-sm text-foreground/60">
              {cycleKey === "yearly" ? (lang === "bn" ? "বার্ষিক" : "Yearly") : (lang === "bn" ? "মাসিক" : "Monthly")}
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-foreground">
              ৳{fee.toLocaleString()}
            </div>
            <div className="text-xs text-foreground/50">{t("amountToPay")}</div>
          </div>
        </div>
      </motion.div>

      {/* Payment Instructions - Per Method */}
      {fee > 0 && (() => {
        const methodData = paymentMethods?.[paymentMethod];
        if (!methodData?.enabled) {
          return (
            <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4 mb-6 text-sm text-foreground/70">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-amber-500 shrink-0" />
                {lang === "bn" ? "এই পেমেন্ট পদ্ধতি বর্তমানে অনুপলব্ধ।" : "This payment method is currently unavailable."}
              </div>
            </div>
          );
        }

        return (
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-4 mb-6">
            <div className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <AlertCircle size={16} className="text-primary" />
              {lang === "bn" ? "পেমেন্ট নির্দেশনা" : "Payment Instructions"}
            </div>
            
            {methodData?.instructions?.[lang] && (
              <div className="text-sm text-foreground/70 mb-3">
                {methodData.instructions[lang]}
              </div>
            )}

            <div className="space-y-2 text-sm">
              {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
                <>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">{lang === "bn" ? "নম্বর:" : "Number:"}</span>
                    <strong className="text-primary font-mono">{methodData.number || "N/A"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">{lang === "bn" ? "অ্যাকাউন্টের নাম:" : "Account Name:"}</span>
                    <strong className="text-primary">{methodData.accountName || "N/A"}</strong>
                  </div>
                </>
              )}

              {paymentMethod === "bank" && (
                <>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">{lang === "bn" ? "ব্যাংকের নাম:" : "Bank Name:"}</span>
                    <strong className="text-primary">{methodData.bankName || "N/A"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">{lang === "bn" ? "অ্যাকাউন্ট নম্বর:" : "Account Number:"}</span>
                    <strong className="text-primary font-mono">{methodData.accountNumber || "N/A"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">{lang === "bn" ? "অ্যাকাউন্ট ধারক:" : "Account Holder:"}</span>
                    <strong className="text-primary">{methodData.accountHolderName || "N/A"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-foreground/60">{lang === "bn" ? "শাখা:" : "Branch:"}</span>
                    <strong className="text-primary">{methodData.branch || "N/A"}</strong>
                  </div>
                </>
              )}

              <div className="flex justify-between pt-2 border-t border-border/50">
                <span className="text-foreground/60">{lang === "bn" ? "পরিমাণ:" : "Amount:"}</span>
                <strong className="text-primary">৳{fee.toLocaleString()}</strong>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Payment Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-card border border-border rounded-2xl p-6"
      >
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <CreditCard size={20} className="text-primary" />
          {t("paymentMethod")}
        </h3>

        {/* Payment Method Selection */}
        <div className="grid grid-cols-3 gap-3 mb-5">
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
              <span className="text-sm font-medium text-foreground">{method.name}</span>
            </button>
          ))}
        </div>

        {/* Phone Number (bKash/Nagad) */}
        {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">{t("phoneNumber")}</label>
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
          </motion.div>
        )}

        {/* Bank Fields */}
        {paymentMethod === "bank" && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="space-y-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("bankName")}</label>
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
              <label className="block text-sm font-medium text-foreground mb-2">{t("accountNumber")}</label>
              <input
                type="text"
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                placeholder={t("enterAccountNumber")}
                className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">{t("accountHolderName")}</label>
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

        {/* Transaction ID */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">{t("transactionId")}</label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => setTransactionId(e.target.value)}
            placeholder={t("enterTransactionId")}
            className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          />
        </div>

        {/* Screenshot Upload */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-foreground mb-2">{t("screenshot")}</label>
          <div
            onClick={() => document.getElementById("screenshot-input").click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
              screenshotPreview ? "border-primary bg-primary/5" : "border-border hover:border-primary/30"
            }`}
          >
            {screenshotPreview ? (
              <img src={screenshotPreview} alt="Screenshot preview" className="max-h-40 mx-auto rounded-lg" />
            ) : (
              <div className="flex flex-col items-center gap-2">
                <Upload size={24} className="text-foreground/40" />
                <span className="text-sm text-foreground/50">{t("uploadScreenshot")}</span>
              </div>
            )}
          </div>
          <input
            id="screenshot-input"
            type="file"
            accept="image/*"
            onChange={handleScreenshotChange}
            className="hidden"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading || fee === 0}
          className="w-full py-3.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              {t("submitting")}
            </>
          ) : (
            <>
              <Banknote size={18} />
              {t("submitPayment")}
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default PlanPaymentPage;
