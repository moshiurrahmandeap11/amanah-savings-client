"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  Fingerprint,
  Brain,
  Vault,
  Eye,
  BadgeCheck,
  Sparkles,
  UserCheck,
  Database,
  Smartphone,
  AlertTriangle,
  TrendingUp,
  Clock,
} from "lucide-react";
import Link from "next/link";

const HomeSecurityTrust = () => {
  const securityCards = [
    {
      icon: <UserCheck size={24} />,
      title: "NID + Selfie Verification",
      desc: "Each member's NID and live selfie are verified before savings are activated. No anonymous accounts.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      delay: 0,
    },
    {
      icon: <Lock size={24} />,
      title: "256-bit SSL encryption",
      desc: "All data sent and stored is protected with bank-grade 256-bit AES encryption. Your data never leaves our secure servers.",
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10",
      delay: 0.1,
    },
    {
      icon: <Smartphone size={24} />,
      title: "Two-factor authentication",
      desc: "Enable 2FA for extra security. SMS OTP + authenticator app support for maximum security.",
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10",
      delay: 0.2,
    },
    {
      icon: <Brain size={24} />,
      title: "Fraud Detection AI",
      desc: "Our AI monitors suspicious activity, multiple accounts, and unusual login patterns — keeping the entire community safe.",
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      delay: 0.3,
    },
    {
      icon: <Vault size={24} />,
      title: "Locked savings vault",
      desc: "Savings are locked until the target period is completed. Early withdrawals require admin review to prevent unnecessary spending.",
      color: "from-orange-500 to-orange-600",
      bgColor: "bg-orange-500/10",
      delay: 0.4,
    },
    {
      icon: <Eye size={24} />,
      title: "Completely transparent ledger",
      desc: "Every deposit, transaction, and movement is visible in your personal ledger. Complete transparency, no hidden work.",
      color: "from-cyan-500 to-cyan-600",
      bgColor: "bg-cyan-500/10",
      delay: 0.5,
    },
  ];

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen bg-background py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-linear-to-b from-background via-primary/5 to-background"></div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 right-10 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col items-center text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.4, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-md px-4 sm:px-5 py-1.5 sm:py-2 rounded-full border border-primary/20 mb-5 sm:mb-6"
          >
            <Shield size={14} className="text-primary" />
            <span className="text-xs sm:text-sm font-medium tracking-wider text-primary">
              Security & Trust
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl text-foreground">
            Your savings{" "}
            <span className="bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
              are safe with us.
            </span>
          </h2>

          <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl">
            Amanah is built with security in mind. Multiple layers of security
            keep your money and identity safe.
          </p>
        </motion.div>

        {/* Security Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
        >
          {securityCards.map((card, idx) => (
            <motion.div
              key={idx}
              variants={cardVariants}
              whileHover={{
                y: -8,
                transition: { duration: 0.2 },
              }}
              className="group bg-card border border-border rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 hover:border-primary/40 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              {/* Hover gradient effect */}
              <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-primary-light/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              {/* Icon */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 ${card.bgColor} rounded-xl sm:rounded-2xl flex items-center justify-center mb-5 sm:mb-6 text-primary`}
              >
                {card.icon}
              </motion.div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-foreground mb-2 sm:mb-3">
                {card.title}
              </h3>

              {/* Description */}
              <p className="text-foreground/60 text-sm sm:text-base leading-relaxed">
                {card.desc}
              </p>

              {/* Decorative line */}
              <motion.div
                initial={{ width: 0 }}
                whileHover={{ width: "100%" }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 left-0 h-0.5 bg-linear-to-r from-primary to-primary-light"
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Trust Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 sm:mt-20 pt-8 sm:pt-10 border-t border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              {
                value: "50,000+",
                label: "Active Users",
                icon: <BadgeCheck size={20} />,
              },
              {
                value: "৳500Cr+",
                label: "Total Savings Protected",
                icon: <Database size={20} />,
              },
              {
                value: "99.9%",
                label: "Uptime Guarantee",
                icon: <Clock size={20} />,
              },
              {
                value: "24/7",
                label: "Security Monitoring",
                icon: <AlertTriangle size={20} />,
              },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="text-primary mb-2 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-1">
                  {stat.value}
                </h3>
                <p className="text-xs sm:text-sm text-foreground/60">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            className="group inline-flex items-center gap-2 bg-linear-to-r from-primary to-primary-light text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold text-sm sm:text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
          >
            <Link href={"/register"} className="flex items-center justify-center gap-4">
            <Shield size={18} />
            Learn about our security
            </Link>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="inline-block"
            >
              →
            </motion.span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HomeSecurityTrust;