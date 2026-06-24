"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Check,
  Crown,
  Gem,
  Medal,
  Star,
  Trophy,
  Loader2,
  Calendar,
  Wallet,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";

// Plan configuration
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
    maxDeposit: 10000,
    minMonthly: 500,
    maxMonthly: 2000,
    features: [
      "Save up to ৳10,000 per deposit",
      "Monthly savings: ৳500–৳2,000",
      "Basic goal tracking",
      "Community access",
    ],
    featuresBn: [
      "প্রতি জমায় সর্বোচ্চ ৳১০,০০০",
      "মাসিক সঞ্চয়: ৳৫০০–৳২,০০০",
      "বেসিক গোল ট্র্যাকিং",
      "কমিউনিটি অ্যাক্সেস",
    ],
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
    maxDeposit: 25000,
    minMonthly: 2000,
    maxMonthly: 10000,
    features: [
      "Save up to ৳25,000 per deposit",
      "Monthly savings: ৳2,000–৳10,000",
      "Advanced goal tracking",
      "Priority support",
      "Streak bonuses",
    ],
    featuresBn: [
      "প্রতি জমায় সর্বোচ্চ ৳২৫,০০০",
      "মাসিক সঞ্চয়: ৳২,০০০–৳১০,০০০",
      "অ্যাডভান্সড গোল ট্র্যাকিং",
      "প্রায়োরিটি সাপোর্ট",
      "স্ট্রিক বোনাস",
    ],
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
    maxDeposit: 100000,
    minMonthly: 10000,
    maxMonthly: 50000,
    features: [
      "Save up to ৳100,000 per deposit",
      "Monthly savings: ৳10,000–৳50,000",
      "Premium goal tracking",
      "VIP support",
      "Streak bonuses",
      "Achievement rewards",
      "Referral bonuses",
    ],
    featuresBn: [
      "প্রতি জমায় সর্বোচ্চ ৳১,০০,০০০",
      "মাসিক সঞ্চয়: ৳১০,০০০–৳৫০,০০০",
      "প্রিমিয়াম গোল ট্র্যাকিং",
      "ভিআইপি সাপোর্ট",
      "স্ট্রিক বোনাস",
      "অ্যাচিভমেন্ট রিওয়ার্ড",
      "রেফারেল বোনাস",
    ],
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
    maxDeposit: 500000,
    minMonthly: 50000,
    maxMonthly: Infinity,
    features: [
      "Save up to ৳500,000 per deposit",
      "Monthly savings: ৳50,000+",
      "Elite goal tracking",
      "Dedicated support",
      "Maximum streak bonuses",
      "Exclusive achievement rewards",
      "Highest referral bonuses",
      "Early access to new features",
    ],
    featuresBn: [
      "প্রতি জমায় সর্বোচ্চ ৳৫,০০,০০০",
      "মাসিক সঞ্চয়: ৳৫০,০০০+",
      "এলিট গোল ট্র্যাকিং",
      "ডেডিকেটেড সাপোর্ট",
      "সর্বোচ্চ স্ট্রিক বোনাস",
      "এক্সক্লুসিভ অ্যাচিভমেন্ট রিওয়ার্ড",
      "সর্বোচ্চ রেফারেল বোনাস",
      "নতুন ফিচারে আর্লি অ্যাক্সেস",
    ],
  },
};

// Translations
const translations = {
  en: {
    pageTitle: "Upgrade Plan",
    currentPlan: "Current Plan",
    billingCycle: "Billing Cycle",
    monthly: "Monthly",
    yearly: "Yearly",
    save: "Save 20%",
    perMonth: "/month",
    perYear: "/year",
    free: "Free",
    selectPlan: "Select Plan",
    current: "Current",
    upgradeTo: "Upgrade to",
    downgradeTo: "Downgrade to",
    confirmTitle: "Confirm Plan Change?",
    confirmText: "You are about to change your plan to {plan} ({cycle}). The new plan will take effect immediately.",
    confirmButton: "Yes, Change Plan",
    cancel: "Cancel",
    successTitle: "Plan Updated!",
    successText: "Your plan has been updated to {plan} ({cycle}).",
    back: "Back",
    planFeatures: "Plan Features",
    maxDeposit: "Max Deposit",
    monthlyRange: "Monthly Savings Range",
    paymentNote: "Payment for plan fees should be made via bKash/Nagad to admin.",
  },
  bn: {
    pageTitle: "প্ল্যান আপগ্রেড",
    currentPlan: "বর্তমান প্ল্যান",
    billingCycle: "বিলিং সাইকেল",
    monthly: "মাসিক",
    yearly: "বার্ষিক",
    save: "২০% সেভ করুন",
    perMonth: "/মাস",
    perYear: "/বছর",
    free: "ফ্রি",
    selectPlan: "প্ল্যান সিলেক্ট করুন",
    current: "বর্তমান",
    upgradeTo: "আপগ্রেড করুন",
    downgradeTo: "ডাউনগ্রেড করুন",
    confirmTitle: "প্ল্যান পরিবর্তন নিশ্চিত করবেন?",
    confirmText: "আপনি আপনার প্ল্যান {plan} ({cycle})-এ পরিবর্তন করতে চলেছেন। নতুন প্ল্যান তৎক্ষণাৎ কার্যকর হবে।",
    confirmButton: "হ্যাঁ, প্ল্যান পরিবর্তন করুন",
    cancel: "বাতিল",
    successTitle: "প্ল্যান আপডেট হয়েছে!",
    successText: "আপনার প্ল্যান {plan} ({cycle})-এ আপডেট করা হয়েছে।",
    back: "পিছনে",
    planFeatures: "প্ল্যানের ফিচার",
    maxDeposit: "সর্বোচ্চ জমা",
    monthlyRange: "মাসিক সঞ্চয়ের পরিসর",
    paymentNote: "প্ল্যান ফি বিকাশ/নগদ-এর মাধ্যমে অ্যাডমিনকে পেমেন্ট করতে হবে।",
  },
};

const PlanUpgradePage = () => {
  const { user, updatePlan } = useAuth();
  const router = useRouter();
  const [lang, setLang] = useState("en");
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage") || "en";
    setLang(savedLang);
  }, []);

  useEffect(() => {
    if (user?.billingCycle) {
      setBillingCycle(user.billingCycle);
    }
  }, [user]);

  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach((param) => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const currentPlan = user?.selectedPlan?.toLowerCase() || "bronze";

  const handlePlanSelect = async (planKey) => {
    if (planKey === currentPlan) return;

    const plan = PLAN_CONFIG[planKey];
    const isUpgrade =
      Object.keys(PLAN_CONFIG).indexOf(planKey) >
      Object.keys(PLAN_CONFIG).indexOf(currentPlan);

    const result = await Swal.fire({
      title: t("confirmTitle"),
      text: t("confirmText", {
        plan: lang === "bn" ? plan.nameBn : plan.name,
        cycle: t(billingCycle),
      }),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#6c757d",
      confirmButtonText: isUpgrade ? t("upgradeTo") : t("downgradeTo"),
      cancelButtonText: t("cancel"),
    });

    if (result.isConfirmed) {
      // Navigate to payment page instead of instant upgrade
      router.push(`/dashboard/plan-payment?plan=${planKey}&cycle=${billingCycle}`);
    }
  };

  const formatFee = (fee) => {
    if (fee === 0) return t("free");
    return `৳${fee}`;
  };

  const formatAmount = (amount) => {
    if (amount === Infinity) return "∞";
    return `৳${amount.toLocaleString()}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/dashboard/settings")}
          className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-primary/10 transition"
        >
          <ArrowLeft size={20} className="text-foreground" />
        </button>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Sparkles size={28} className="text-primary" />
          {t("pageTitle")}
        </h2>
      </div>

      {/* Current Plan Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-2xl p-6 mb-6 border ${PLAN_CONFIG[currentPlan].borderColor} ${PLAN_CONFIG[currentPlan].bgColor}`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${PLAN_CONFIG[currentPlan].color} flex items-center justify-center text-white`}
          >
            {React.createElement(PLAN_CONFIG[currentPlan].icon, { size: 32 })}
          </div>
          <div className="flex-1">
            <div className="text-sm text-foreground/60">{t("currentPlan")}</div>
            <div className="text-2xl font-bold text-foreground">
              {lang === "bn"
                ? PLAN_CONFIG[currentPlan].nameBn
                : PLAN_CONFIG[currentPlan].name}
            </div>
            <div className="text-sm text-foreground/60">
              {user?.billingCycle === "yearly" ? t("yearly") : t("monthly")} —{" "}
              {formatFee(
                user?.billingCycle === "yearly"
                  ? PLAN_CONFIG[currentPlan].yearlyFee
                  : PLAN_CONFIG[currentPlan].monthlyFee
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Billing Cycle Toggle */}
      <div className="flex justify-center mb-6">
        <div className="bg-card border border-border rounded-xl p-1 flex gap-1">
          <button
            onClick={() => setBillingCycle("monthly")}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${
              billingCycle === "monthly"
                ? "bg-primary text-white"
                : "text-foreground/60 hover:text-primary"
            }`}
          >
            {t("monthly")}
          </button>
          <button
            onClick={() => setBillingCycle("yearly")}
            className={`px-6 py-2 rounded-lg text-sm font-semibold transition flex items-center gap-2 ${
              billingCycle === "yearly"
                ? "bg-primary text-white"
                : "text-foreground/60 hover:text-primary"
            }`}
          >
            {t("yearly")}
            <span className="text-xs bg-green-500 text-white px-1.5 py-0.5 rounded-full">
              {t("save")}
            </span>
          </button>
        </div>
      </div>

      {/* Plan Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {Object.entries(PLAN_CONFIG).map(([planKey, plan], idx) => {
          const isCurrent = planKey === currentPlan;
          const fee =
            billingCycle === "yearly" ? plan.yearlyFee : plan.monthlyFee;
          const Icon = plan.icon;

          return (
            <motion.div
              key={planKey}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`rounded-2xl border p-5 transition-all ${
                isCurrent
                  ? `${plan.borderColor} ${plan.bgColor} ring-2 ring-primary/30`
                  : "border-border bg-card hover:border-primary/30"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-r ${plan.color} flex items-center justify-center text-white shrink-0`}
                >
                  <Icon size={24} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-foreground">
                      {lang === "bn" ? plan.nameBn : plan.name}
                    </h3>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs font-bold">
                        {t("current")}
                      </span>
                    )}
                  </div>
                  <div className="text-2xl font-bold text-foreground mt-1">
                    {formatFee(fee)}
                    <span className="text-sm font-normal text-foreground/50">
                      {fee > 0
                        ? billingCycle === "yearly"
                          ? t("perYear")
                          : t("perMonth")
                        : ""}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="mt-4 space-y-2">
                {(lang === "bn" ? plan.featuresBn : plan.features).map(
                  (feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <Check size={14} className="text-primary shrink-0" />
                      <span className="text-foreground/70">{feature}</span>
                    </div>
                  )
                )}
              </div>

              {/* Limits */}
              <div className="mt-4 pt-4 border-t border-border/50 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">{t("maxDeposit")}</span>
                  <span className="font-semibold text-foreground">
                    {formatAmount(plan.maxDeposit)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-foreground/50">
                    {t("monthlyRange")}
                  </span>
                  <span className="font-semibold text-foreground">
                    {formatAmount(plan.minMonthly)} —{" "}
                    {formatAmount(plan.maxMonthly)}
                  </span>
                </div>
              </div>

              {/* Select Button */}
              <button
                onClick={() => handlePlanSelect(planKey)}
                disabled={isCurrent || loading}
                className={`w-full mt-4 py-2.5 rounded-xl font-semibold text-sm transition ${
                  isCurrent
                    ? "bg-foreground/10 text-foreground/40 cursor-not-allowed"
                    : "bg-gradient-to-r from-primary to-primary-light text-white hover:opacity-90"
                }`}
              >
                {loading ? (
                  <Loader2 size={16} className="animate-spin mx-auto" />
                ) : isCurrent ? (
                  t("current")
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    {t("selectPlan")}
                    <ArrowRight size={14} />
                  </span>
                )}
              </button>
            </motion.div>
          );
        })}
      </div>

      {/* Payment Note */}
      <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4 text-sm text-foreground/70">
        <div className="flex items-center gap-2">
          <Wallet size={16} className="text-amber-500" />
          {t("paymentNote")}
        </div>
      </div>
    </div>
  );
};

export default PlanUpgradePage;
