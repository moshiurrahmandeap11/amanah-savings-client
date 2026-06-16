"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const categories = [
    { id: "all", label: "All", icon: "" },
    { id: "account", label: "Account", icon: "" },
    { id: "savings", label: "Savings", icon: "" },
    { id: "plans", label: "Plans", icon: "" },
    { id: "circles", label: "Circles", icon: "" },
    { id: "islamic", label: "Islamic", icon: "" },
    { id: "security", label: "Security", icon: "" },
  ];

  const faqs = [
    {
      id: 1,
      category: "account",
      question: "How do I open an account?",
      answer:
        "Go to the registration page and complete the signup process. You'll need your National ID (NID), a selfie, and your mobile number. It's completely free and takes about 5 minutes.",
      tag: "Account",
    },
    {
      id: 2,
      category: "account",
      question: "How long does KYC verification take?",
      answer:
        "KYC verification is usually completed within 2–4 hours. Applications submitted during working hours (Sun–Thu, 9am–8pm) are processed faster. Applications submitted at night or on holidays will be verified the next working day.",
      tag: "Account",
    },
    {
      id: 3,
      category: "account",
      question: "How do I close my account?",
      answer:
        "You can request account closure from Dashboard → Settings → Danger Zone. Before that, you must close all active savings goals and withdraw all your balance.",
      tag: "Account",
    },
    {
      id: 4,
      category: "savings",
      question: "What is the minimum deposit amount?",
      answer:
        "The Bronze plan starts from just ৳500 per month. Silver requires ৳1,000, Gold requires ৳2,000, and Platinum requires ৳5,000 minimum monthly deposit. You can always deposit more than the minimum anytime.",
      tag: "Savings",
    },
    {
      id: 5,
      category: "savings",
      question: "How long until my balance updates after deposit?",
      answer:
        "After sending a deposit via bKash or Nagad, our finance team verifies the screenshot and TxID within 2–4 hours and updates your balance. Bank transfers may take up to 24 hours.",
      tag: "Savings",
    },
    {
      id: 6,
      category: "savings",
      question: "How long does withdrawal take?",
      answer:
        "After goal completion: Bronze takes 7 working days, Silver 5 days, Gold 3 days, and Platinum within 24 hours.",
      tag: "Savings",
    },
    {
      id: 7,
      category: "savings",
      question: "Can I withdraw before my goal date?",
      answer:
        "Yes, but early withdrawal incurs a 3–5% processing fee. Bronze members cannot make early withdrawals. Platinum members get one free early withdrawal per year.",
      tag: "Savings",
    },
    {
      id: 8,
      category: "plans",
      question: "Can I change my plan?",
      answer:
        "Yes! You can upgrade anytime from your dashboard and it takes effect immediately. Downgrading takes effect at the end of your current billing cycle — higher-tier features will be removed then.",
      tag: "Plans",
    },
    {
      id: 9,
      category: "plans",
      question: "Is there a free trial?",
      answer:
        "Silver and Gold plans include a 30-day free trial. Platinum has a 14-day trial. No credit card needed — just complete KYC verification to start your trial.",
      tag: "Plans",
    },
    {
      id: 10,
      category: "plans",
      question: "What happens if I miss a monthly deposit?",
      answer:
        "Missing a deposit breaks your savings streak but does not cancel your plan. Your goal timeline adjusts automatically. There are no late fees — Amanah is a savings community, not a loan company. You will receive an SMS reminder 3 days before your deposit date.",
      tag: "Plans",
    },
    {
      id: 11,
      category: "circles",
      question: "What is a savings circle and how does it work?",
      answer:
        "A savings circle is a group savings system with friends, family or colleagues. Everyone deposits monthly toward a shared goal and keeps each other accountable. Silver members can join 1 circle, Gold 3, and Platinum 10.",
      tag: "Circles",
    },
    {
      id: 12,
      category: "circles",
      question: "Can I create my own circle?",
      answer:
        "Silver members can join existing circles. Gold members can create circles and invite others. Platinum members can create and manage up to 10 circles.",
      tag: "Circles",
    },
    {
      id: 13,
      category: "islamic",
      question: "Is Islamic mode available on all plans?",
      answer:
        "Yes, riba-free (interest-free) Islamic savings mode is available on all plans including Bronze, completely free. It can be enabled during registration or later from your profile settings.",
      tag: "Islamic",
    },
    {
      id: 14,
      category: "islamic",
      question: "Does Islamic mode offer interest or profit?",
      answer:
        "No. Amanah is a digital savings community — not a bank or investment platform. We do not offer any interest (riba), guaranteed profit, or fixed returns. Islamic mode only ensures your goals and circles operate in a fully halal manner.",
      tag: "Islamic",
    },
    {
      id: 15,
      category: "security",
      question: "Is my money safe?",
      answer:
        "We use 256-bit SSL encryption, NID-verified KYC, and 2FA on all accounts. However, importantly: we are NOT a bank — deposits are not covered by government insurance. We are a digital savings tracking platform.",
      tag: "Security",
    },
    {
      id: 16,
      category: "security",
      question: "What if I forget my PIN?",
      answer:
        "Click the 'Forgot PIN?' link on the login page. An OTP will be sent to your registered mobile number and you can set a new PIN after NID verification.",
      tag: "Security",
    },
    {
      id: 17,
      category: "security",
      question: "What payment methods are accepted?",
      answer:
        "Bronze members can use bKash and Nagad. Silver, Gold and Platinum members can also use bank transfer (BRAC, Dutch-Bangla, Islami Bank, and any other bank). All deposits are manually verified by our team.",
      tag: "Security",
    },
  ];

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id);
  };

  const filteredFaqs = faqs
    .filter(
      (faq) => activeCategory === "all" || faq.category === activeCategory,
    )
    .filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    );

  const getTagColor = (tag) => {
    const colors = {
      Account: "bg-cyan-500/10 text-cyan-500",
      Savings: "bg-primary/10 text-primary",
      Plans: "bg-purple-500/10 text-purple-500",
      Circles: "bg-emerald-500/10 text-emerald-500",
      Islamic: "bg-amber-500/10 text-amber-500",
      Security: "bg-red-500/10 text-red-500",
    };
    return colors[tag] || "bg-primary/10 text-primary";
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-primary to-primary-light pt-20 pb-16 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm mb-6">
            Frequently Asked Questions
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Find Answers to Everything
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
            Browse answers to our most frequently asked questions
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="w-full h-12"
          >
            <path
              d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </section>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto px-4 -mt-6 relative z-10">
        <div className="relative">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-4 pl-12 pr-4 rounded-xl bg-card border border-border text-foreground outline-none focus:border-primary transition shadow-lg"
          />
          {searchQuery && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-foreground/40">
              {filteredFaqs.length} found
            </span>
          )}
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                  activeCategory === cat.id
                    ? "bg-linear-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20"
                    : "border border-border text-foreground/70 hover:border-primary"
                }`}
              >
                {cat.icon} {cat.label}
              </button>
            ))}
          </div>

          {/* FAQ List */}
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-3">🔍</div>
              <p className="text-foreground/60">
                No questions found. Try a different search term.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredFaqs.map((faq, idx) => (
                <motion.div
                  key={faq.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`bg-card border rounded-xl overflow-hidden transition-all ${
                    openFaq === faq.id
                      ? "border-primary"
                      : "border-border hover:border-primary/40"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-primary/5 transition"
                  >
                    <span className="font-semibold text-foreground pr-4">
                      {faq.question}
                    </span>
                    <span
                      className={`text-primary text-xl transition-transform shrink-0 ${openFaq === faq.id ? "rotate-45" : ""}`}
                    >
                      +
                    </span>
                  </button>
                  <AnimatePresence>
                    {openFaq === faq.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-border"
                      >
                        <div className="px-5 py-4">
                          <p className="text-foreground/70 text-sm leading-relaxed">
                            {faq.answer}
                          </p>
                          <span
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full mt-3 ${getTagColor(faq.tag)}`}
                          >
                            {faq.tag === "Account" && ""}
                            {faq.tag === "Savings" && ""}
                            {faq.tag === "Plans" && ""}
                            {faq.tag === "Circles" && ""}
                            {faq.tag === "Islamic" && ""}
                            {faq.tag === "Security" && ""} {faq.tag}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          )}

          {/* Help Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 bg-linear-to-r from-primary to-primary-light rounded-2xl p-8 text-center text-white"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-2">
              Still have questions?
            </h2>
            <p className="text-white/90 text-sm mb-6">
              Our support team is active Sun–Thu 9am–8pm and on WhatsApp 24/7.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="https://wa.me/8801700262624"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-[#25D366] text-white rounded-xl font-semibold hover:opacity-90 transition"
              >
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="px-6 py-3 bg-white/20 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/30 transition"
              >
                Send a Message
              </Link>
            </div>
          </motion.div>
        </div>
      </section>


    </div>
  );
};

export default FaqPage;
