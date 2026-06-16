"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  UserPlus,
  ShieldCheck,
  Target,
  CreditCard,
  Trophy,
  ArrowRight,
  Sparkles,
  CheckCircle,
} from "lucide-react";

const steps = [
  {
    id: 1,
    icon: <UserPlus size={28} />,
    title: "Register",
    description: "Create your account with phone or email in under 2 minutes",
  },
  {
    id: 2,
    icon: <ShieldCheck size={28} />,
    title: "Verify",
    description: "Complete NID & phone verification for maximum security",
  },
  {
    id: 3,
    icon: <Target size={28} />,
    title: "Choose Goal",
    description: "Pick a savings goal or join an active community circle",
  },
  {
    id: 4,
    icon: <CreditCard size={28} />,
    title: "Deposit",
    description: "Send weekly or monthly via bKash, Nagad, or bank transfer",
  },
  {
    id: 5,
    icon: <Trophy size={28} />,
    title: "Complete",
    description: "Reach your goal maturity and withdraw your full savings",
  },
];

const HowItWorksPage = () => {
  return (
    <section className="relative overflow-hidden bg-background py-16 sm:py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 sm:mb-16 lg:mb-24 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 sm:px-6 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary">
            <Sparkles size={14} />
            <span>Simple Process</span>
          </div>

          <h2 className="mt-6 sm:mt-8 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            How <span className="text-primary">Amanah</span> Works
          </h2>

          <p className="mt-4 sm:mt-6 max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-foreground/60">
            Five simple steps to start your savings journey with community
            discipline and digital security.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Horizontal Line - Hidden on mobile/tablet */}
          <div className="absolute left-0 right-0 top-9 hidden h-0.5 bg-primary/20 lg:block" />

          <div className="grid gap-10 md:gap-12 lg:gap-6 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative flex flex-col items-center text-center group"
              >
                {/* Step Number Badge - Mobile */}
                <div className="lg:hidden absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-white shadow-lg">
                  {step.id}
                </div>

                {/* Circle */}
                <div className="relative z-10 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary-dark text-white shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Desktop Step Number */}
                <div className="hidden lg:block absolute -top-8 left-1/2 -translate-x-1/2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Step {step.id}
                </div>

                {/* Content */}
                <h3 className="mt-5 sm:mt-6 text-xl sm:text-2xl font-bold text-foreground">
                  {step.title}
                </h3>

                <p className="mt-2 sm:mt-3 max-w-xs text-sm sm:text-base leading-relaxed sm:leading-7 text-foreground/60">
                  {step.description}
                </p>

                {/* Connector Line - Mobile/Tablet */}
                {index < steps.length - 1 && (
                  <div className="lg:hidden absolute -bottom-6 left-1/2 h-8 w-0.5 bg-primary/20 transform -translate-x-1/2" />
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Features Highlight */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {[
            { icon: <ShieldCheck size={20} />, text: "100% Secure & Encrypted" },
            { icon: <CheckCircle size={20} />, text: "No Hidden Fees" },
            { icon: <Sparkles size={20} />, text: "24/7 Community Support" },
          ].map((feature, idx) => (
            <div key={idx} className="flex items-center justify-center gap-2 text-sm text-foreground/60">
              <span className="text-primary">{feature.icon}</span>
              <span>{feature.text}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 lg:mt-20 text-center"
        >
          <Link
            href="/register"
            className="group relative inline-flex items-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r from-primary to-primary-dark px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            Start Your Journey Today
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </motion.div>
      </div>

      {/* Glow Effects */}
      <div className="absolute left-1/2 top-0 h-64 sm:h-80 lg:h-96 w-64 sm:w-80 lg:w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-56 sm:h-64 lg:h-80 w-56 sm:w-64 lg:w-80 rounded-full bg-primary-light/5 blur-3xl" />
      <div className="absolute top-1/4 left-0 h-48 sm:h-56 lg:h-64 w-48 sm:w-56 lg:w-64 rounded-full bg-primary/5 blur-3xl" />
    </section>
  );
};

export default HowItWorksPage;