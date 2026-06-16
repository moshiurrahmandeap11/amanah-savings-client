"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Sparkles,
  TrendingUp,
  Shield,
  Crown,
  Check,
  Loader2,
  Star,
  Diamond,
} from "lucide-react";
import axiosInstance from "../../components/shared/AxiosInstance/AxiosInstance";

const SavingsPlanSection = () => {
  const [billingMode, setBillingMode] = useState("monthly");
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cmsData, setCmsData] = useState(null);

  // Complete plan pricing and metadata
  const planMetadata = {
    Bronze: {
      monthly: 0,
      yearly: 0,
      tier: "Starter",
      popular: false,
      description: "Perfect for beginners. Save at your own pace with no platform fee.",
      icon: <TrendingUp size={24} />,
      color: "from-orange-600 to-orange-700",
      priceLabel: "Free Forever",
      minDeposit: 500,
      maxDeposit: 4999,
    },
    Silver: {
      monthly: 199,
      yearly: 159,
      tier: "Essential",
      popular: false,
      description: "For regular savers building serious momentum with community features.",
      icon: <Shield size={24} />,
      color: "from-gray-400 to-gray-600",
      priceLabel: "৳199/month",
      minDeposit: 5000,
      maxDeposit: 14999,
    },
    Gold: {
      monthly: 499,
      yearly: 399,
      tier: "Growth",
      popular: true,
      description: "Our flagship plan with AI assistant, unlimited goals, and full circle access.",
      icon: <Crown size={24} />,
      color: "from-primary to-primary-light",
      priceLabel: "৳499/month",
      minDeposit: 15000,
      maxDeposit: 49999,
    },
    Platinum: {
      monthly: 999,
      yearly: 799,
      tier: "Elite",
      popular: false,
      description: "For power savers who want exclusive features, dedicated support & elite status.",
      icon: <Diamond size={24} />,
      color: "from-sky-400 to-blue-600",
      priceLabel: "৳999/month",
      minDeposit: 50000,
      maxDeposit: null,
    },
  };

  // Default features for each plan
  const defaultFeatures = {
    Bronze: [
      "Monthly savings deposit",
      "1 active savings goal",
      "Basic progress tracking",
      "Community badge",
      "Mobile notifications",
    ],
    Silver: [
      "Weekly or monthly deposits",
      "Up to 3 active goals",
      "Advanced analytics",
      "AI savings insights",
      "Priority support",
    ],
    Gold: [
      "Flexible weekly deposits",
      "Up to 5 active goals",
      "Family savings mode",
      "Leaderboard access",
      "Referral rewards",
      "Early goal refresh",
    ],
    Platinum: [
      "Unlimited active goals",
      "Circle leadership role",
      "Dedicated account manager",
      "Custom savings vault",
      "VIP community access",
      "Early maturity options",
    ],
  };

  // Fetch CMS data
  useEffect(() => {
    const fetchCMSData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/cms");
        if (res.data.success) {
          setCmsData(res.data.data);
          const cmsPlans = res.data.data?.plans || [];
          
          if (cmsPlans.length > 0) {
            // Merge CMS plans with metadata
            const mergedPlans = cmsPlans.map(plan => {
              const metadata = planMetadata[plan.name] || {
                monthly: 0,
                yearly: 0,
                tier: "Standard",
                popular: false,
                description: `Start your savings journey with our ${plan.name} plan.`,
                icon: <Sparkles size={24} />,
                color: "from-primary to-primary-light",
                priceLabel: "Contact Us",
                minDeposit: plan.min || 500,
                maxDeposit: plan.max,
              };
              
              return {
                name: plan.name,
                min: plan.min,
                max: plan.max,
                color: plan.color,
                features: plan.features || defaultFeatures[plan.name] || [],
                monthlyPrice: metadata.monthly,
                yearlyPrice: metadata.yearly,
                tier: metadata.tier,
                popular: metadata.popular,
                description: metadata.description,
                icon: metadata.icon,
                gradientColor: metadata.color,
                priceLabel: metadata.priceLabel,
                minDeposit: metadata.minDeposit,
                maxDeposit: metadata.maxDeposit,
              };
            });
            setPlans(mergedPlans);
          } else {
            // Use default plans
            setPlans(getDefaultPlans());
          }
        } else {
          setPlans(getDefaultPlans());
        }
      } catch (error) {
        console.error("Failed to fetch CMS data:", error);
        setPlans(getDefaultPlans());
      } finally {
        setLoading(false);
      }
    };

    fetchCMSData();
  }, []);

  const getDefaultPlans = () => {
    return Object.keys(planMetadata).map(name => ({
      name,
      min: planMetadata[name].minDeposit,
      max: planMetadata[name].maxDeposit,
      color: planMetadata[name].color.includes("primary") ? "#059669" : 
             name === "Bronze" ? "#cd7f32" :
             name === "Silver" ? "#c0c0c0" :
             name === "Gold" ? "#ffd700" : "#e5e4e2",
      features: defaultFeatures[name],
      monthlyPrice: planMetadata[name].monthly,
      yearlyPrice: planMetadata[name].yearly,
      tier: planMetadata[name].tier,
      popular: planMetadata[name].popular,
      description: planMetadata[name].description,
      icon: planMetadata[name].icon,
      gradientColor: planMetadata[name].color,
      priceLabel: planMetadata[name].priceLabel,
      minDeposit: planMetadata[name].minDeposit,
      maxDeposit: planMetadata[name].maxDeposit,
    }));
  };

  const getPrice = (plan) => {
    return billingMode === "monthly" ? (plan.monthlyPrice || 0) : (plan.yearlyPrice || 0);
  };

  const getSavingsPercent = (plan) => {
    if (billingMode !== "yearly") return 0;
    const monthlyTotal = (plan.monthlyPrice || 0) * 12;
    const yearlyPrice = plan.yearlyPrice || 0;
    if (monthlyTotal === 0) return 0;
    return Math.round(((monthlyTotal - yearlyPrice) / monthlyTotal) * 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="flex items-center justify-center">
          <Loader2 size={48} className="animate-spin text-primary" />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 sm:mb-16 lg:mb-20 text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary">
            <Sparkles size={14} />
            <span>Savings Plans</span>
          </div>

          <h2 className="mt-5 sm:mt-6 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Choose Your{" "}
            <span className="bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
              Savings Tier
            </span>
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-foreground/60">
            Start small or save big — flexible plans for every income level. All
            plans are locked until maturity.
          </p>
        </motion.div>

        {/* Billing Toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex bg-card border border-border rounded-xl p-1">
            <button
              onClick={() => setBillingMode("monthly")}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${
                billingMode === "monthly"
                  ? "bg-primary text-white"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingMode("yearly")}
              className={`px-6 py-2 rounded-lg text-sm font-semibold transition ${
                billingMode === "yearly"
                  ? "bg-primary text-white"
                  : "text-foreground/70 hover:text-primary"
              }`}
            >
              Yearly <span className="text-primary-400 text-xs ml-1">Save 20%</span>
            </button>
          </div>
        </div>

        {/* CARDS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
              className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                plan.popular
                  ? "border-primary bg-card shadow-xl shadow-primary/10"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <motion.div
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="absolute right-4 top-4 z-10"
                >
                  <div className="rounded-full bg-linear-to-r from-primary to-primary-light px-3 py-1 text-xs font-semibold text-white shadow-lg">
                    Most Popular
                  </div>
                </motion.div>
              )}

              {/* Card Content */}
              <div className="p-5 sm:p-6">
                {/* Icon Circle */}
                <motion.div
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={`mb-4 sm:mb-5 h-14 w-14 rounded-xl bg-linear-to-r ${plan.gradientColor} flex items-center justify-center text-white shadow-lg`}
                >
                  {plan.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <div className="text-xs text-primary mt-0.5">{plan.tier}</div>

                {/* Price */}
                <div className="mt-3">
                  {getPrice(plan) === 0 ? (
                    <span className="text-2xl sm:text-3xl font-bold text-primary">Free</span>
                  ) : (
                    <>
                      <span className="text-2xl sm:text-3xl font-bold text-primary">
                        ৳{getPrice(plan).toLocaleString()}
                      </span>
                      <span className="ml-1 text-xs sm:text-sm text-foreground/50">/month</span>
                    </>
                  )}
                  {billingMode === "yearly" && getPrice(plan) > 0 && (
                    <div className="text-xs text-green-500 mt-1">
                      Save {getSavingsPercent(plan)}% annually
                    </div>
                  )}
                </div>

                {/* Min Deposit */}
                <div className="mt-2 text-xs text-foreground/50">
                  Min deposit: ৳{plan.minDeposit.toLocaleString()}/month
                </div>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-foreground/60">
                  {plan.description}
                </p>

                {/* Features */}
                <ul className="mt-4 sm:mt-5 space-y-2">
                  {plan.features.slice(0, 6).map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + i * 0.05 }}
                      className="flex items-start gap-2 text-xs sm:text-sm text-foreground/70"
                    >
                      <Check size={14} className="text-primary mt-0.5 shrink-0" />
                      <span>{typeof feature === 'string' ? feature : feature.text || feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Button */}
                <Link href="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`mt-6 w-full rounded-xl py-2.5 sm:py-3 font-semibold transition-all duration-300 ${
                      plan.popular
                        ? "bg-linear-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/30 hover:shadow-primary/50"
                        : "border border-border bg-background text-foreground hover:border-primary hover:bg-primary/5"
                    }`}
                  >
                    Choose {plan.name}
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FOOTNOTE */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 text-center text-xs text-foreground/40"
        >
          All savings are member-owned and locked until goal maturity. Sanchoy Bondhu
          is a savings community, not a bank or investment firm.
        </motion.p>
      </div>

      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary-light/5 blur-3xl" />
      </div>
    </section>
  );
};

export default SavingsPlanSection;