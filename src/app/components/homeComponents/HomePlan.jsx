"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, TrendingUp, Shield, Crown } from "lucide-react";

const plans = [
  {
    name: "Bronze",
    price: "৳500 - ৳2,000",
    period: "/ month",
    desc: "Perfect for students and beginners starting their savings journey",
    features: [
      "Monthly savings deposit",
      "1 active savings goal",
      "Basic progress tracking",
      "Community badge",
      "Mobile notifications",
    ],
    button: "Get Started",
    highlight: false,
    color: "from-orange-600 to-orange-700",
    icon: <TrendingUp size={20} />,
  },
  {
    name: "Silver",
    price: "৳2,000 - ৳10,000",
    period: "/ month",
    desc: "Ideal for young professionals building multiple goals simultaneously",
    features: [
      "Weekly or monthly deposits",
      "Up to 3 active goals",
      "Advanced analytics",
      "AI savings insights",
      "Priority support",
    ],
    button: "Get Started",
    highlight: false,
    color: "from-gray-400 to-gray-600",
    icon: <Shield size={20} />,
  },
  {
    name: "Gold",
    price: "৳10,000 - ৳50,000",
    period: "/ month",
    desc: "For families and serious savers with big goals and community leadership",
    features: [
      "Flexible weekly deposits",
      "Up to 5 active goals",
      "Family savings mode",
      "Leaderboard access",
      "Referral rewards",
      "Early goal refresh",
    ],
    button: "Get Started",
    highlight: true,
    color: "from-primary to-primary-light",
    icon: <Crown size={20} />,
  },
  {
    name: "Platinum",
    price: "৳50,000+",
    period: "/ month",
    desc: "Premium tier for high-discipline savers and community leaders",
    features: [
      "Unlimited active goals",
      "Circle leadership role",
      "Dedicated account manager",
      "Custom savings vault",
      "VIP community access",
      "Early maturity options",
    ],
    button: "Get Started",
    highlight: false,
    color: "from-sky-400 to-blue-600",
    icon: <Sparkles size={20} />,
  },
];

const HomePlan = () => {
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
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary">
            Savings Plans
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
              key={idx}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
              className={`relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                plan.highlight
                  ? "border-primary bg-card shadow-xl shadow-primary/10"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              {/* Glow Effect */}
              {plan.highlight && (
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}

              {/* Popular Badge */}
              {plan.highlight && (
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
                  className={`mb-4 sm:mb-5 h-12 w-12 rounded-xl bg-linear-to-r ${plan.color} flex items-center justify-center text-white shadow-lg`}
                >
                  {plan.icon}
                </motion.div>

                {/* Title */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="mt-3">
                  <span className="text-2xl sm:text-3xl font-bold text-primary">
                    {plan.price}
                  </span>
                  <span className="ml-1 text-xs sm:text-sm text-foreground/50">
                    {plan.period}
                  </span>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs sm:text-sm leading-relaxed text-foreground/60">
                  {plan.desc}
                </p>

                {/* Features */}
                <ul className="mt-4 sm:mt-5 space-y-2">
                  {plan.features.map((feature, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 + i * 0.05 }}
                      className="flex items-start gap-2 text-xs sm:text-sm text-foreground/70"
                    >
                      <span className="text-primary mt-0.5">✓</span>
                      <span>{feature}</span>
                    </motion.li>
                  ))}
                </ul>

                {/* Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className={`mt-6 w-full rounded-xl py-2.5 sm:py-3 font-semibold transition-all duration-300 ${
                    plan.highlight
                      ? "bg-linear-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/30 hover:shadow-primary/50"
                      : "border border-border bg-background text-foreground hover:border-primary hover:bg-primary/5"
                  }`}
                >
                  {plan.button}
                </motion.button>
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
          ⚠️ All savings are member-owned and locked until goal maturity. Amanah
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

export default HomePlan;
