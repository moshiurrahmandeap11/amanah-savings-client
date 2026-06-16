"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  ChevronDown,
  HelpCircle,
  Banknote,
  Wallet,
  Calendar,
  Users,
  CheckCircle,
  Shield,
  ArrowRight,
} from "lucide-react";
import { FaMosque } from "react-icons/fa";
import Link from "next/link";

const HomeGeneralInquiries = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "Is Sanchoy Bondhu a bank or investment company?",
      answer:
        "No, Sanchoy Bondhu is not a bank or investment company. It's a digital savings community that helps members save money together toward specific goals. We don't lend money or invest your savings. We simply help you stay disciplined and connected with your savings journey.",
      icon: <Banknote size={20} />,
    },
    {
      question: "Can I withdraw money at any time?",
      answer:
        "Savings are locked until your selected goal maturity date to maintain discipline. However, emergency withdrawals are possible with admin review and may incur a small penalty. This policy helps all members stay committed to their savings goals.",
      icon: <Wallet size={20} />,
    },
    {
      question: "How do I deposit money into savings?",
      answer:
        "You can deposit via bKash, Nagad, Rocket, or bank transfer. Simply go to your dashboard, select your active goal, and choose the payment method. You'll receive instant confirmation and your savings progress will update automatically.",
      icon: <MessageCircle size={20} />,
    },
    {
      question: "Is this platform Halal or Islamic Finance-compliant?",
      answer:
        "Yes, Sanchoy Bondhu operates on Islamic principles. We don't charge interest (riba), we don't invest in haram activities, and all transactions are transparent. Our savings circles are based on mutual cooperation (ta'awun), making them Shariah-compliant.",
      icon: <FaMosque size={20} />,
    },
    {
      question: "What happens if I miss a monthly deposit?",
      answer:
        "You'll receive reminder notifications 3 days before your due date. If you miss a deposit, you have a 7-day grace period. After that, your streak resets, but your savings remain safe. Multiple missed deposits may affect your goal timeline.",
      icon: <Calendar size={20} />,
    },
    {
      question: "How does the referral system work?",
      answer:
        "Refer friends and family to Sanchoy Bondhu. When they complete their first month of savings, you both earn bonus rewards. Top referrers get featured on our leaderboard and receive additional benefits like reduced fees or exclusive badges.",
      icon: <Users size={20} />,
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section className="min-h-screen bg-background py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Background Effects */}
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
            <HelpCircle size={14} className="text-primary" />
            <span className="text-xs sm:text-sm font-medium tracking-wider text-primary">
              General Inquiries
            </span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
            General Questions & Answers
          </h2>

          <p className="text-base sm:text-lg text-foreground/70 max-w-2xl">
            What you need to know before joining the Sanchoy Bondhucommunity.
          </p>
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-3 sm:space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-card border border-border rounded-xl sm:rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left hover:bg-primary/5 transition-colors duration-200 group"
              >
                <div className="flex items-start gap-3 sm:gap-4 flex-1">
                  <div className="text-primary mt-0.5 group-hover:scale-110 transition-transform duration-200">
                    {faq.icon}
                  </div>
                  <span className="text-foreground font-semibold text-sm sm:text-base md:text-lg">
                    {faq.question}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-primary shrink-0"
                >
                  <ChevronDown size={20} />
                </motion.div>
              </button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="border-t border-border"
                  >
                    <div className="px-5 sm:px-6 py-4 sm:py-5">
                      <p className="text-foreground/70 text-sm sm:text-base leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Still Have Questions Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 bg-linear-to-r from-primary/10 to-primary-light/10 rounded-2xl sm:rounded-3xl border border-primary/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex-1">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <Shield size={24} className="text-primary" />
                <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                  Still have questions?
                </h3>
              </div>
              <p className="text-foreground/70 text-sm sm:text-base">
                Our support team is here to help you 24/7. Get in touch with us
                anytime.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="group inline-flex items-center gap-2 bg-linear-to-r from-primary to-primary-light text-white px-6 py-3 rounded-xl font-semibold text-sm sm:text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all whitespace-nowrap"
            >
              <Link href={"/register"} className="flex items-center justify-center gap-4">
              
              Contact Support
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
              </Link>
            </motion.button>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        >
          {[
            {
              value: "24/7",
              label: "Support Available",
              icon: <MessageCircle size={16} />,
            },
            {
              value: "< 2hrs",
              label: "Avg Response Time",
              icon: <CheckCircle size={16} />,
            },
            {
              value: "50,000+",
              label: "Questions Answered",
              icon: <HelpCircle size={16} />,
            },
            {
              value: "98%",
              label: "Satisfaction Rate",
              icon: <Users size={16} />,
            },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 + idx * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="bg-card border border-border rounded-xl p-4"
            >
              <div className="text-primary mb-1 flex justify-center">
                {stat.icon}
              </div>
              <h4 className="text-lg sm:text-xl font-bold text-foreground">
                {stat.value}
              </h4>
              <p className="text-xs text-foreground/60">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HomeGeneralInquiries;
