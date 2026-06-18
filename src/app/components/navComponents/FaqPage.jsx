"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  BadgeHelp,
  ChevronDown,
  CircleDollarSign,
  Gem,
  Mail,
  MessageCircle,
  Moon,
  Search,
  ShieldCheck,
  UserRoundCheck,
  Users,
} from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: BadgeHelp },
  { id: "account", label: "Account", icon: UserRoundCheck },
  { id: "savings", label: "Savings", icon: CircleDollarSign },
  { id: "plans", label: "Plans", icon: Gem },
  { id: "circles", label: "Circles", icon: Users },
  { id: "islamic", label: "Islamic", icon: Moon },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const tagStyles = {
  account: "bg-[#0891b21f] text-[#0891b2]",
  savings: "bg-[#0596691f] text-[#059669]",
  plans: "bg-[#8b5cf61f] text-[#8b5cf6]",
  circles: "bg-[#0596691f] text-[#059669]",
  islamic: "bg-[#f59e0b1f] text-[#d97706]",
  security: "bg-[#ef44441f] text-[#ef4444]",
};

const faqs = [
  {
    id: 1,
    category: "account",
    tag: "Account",
    question: "How do I open an account?",
    answer:
      "Go to the register page and complete registration in 9 easy steps. You need your National ID (NID), a selfie, and your mobile number. It is completely free and takes about 5 minutes.",
  },
  {
    id: 2,
    category: "account",
    tag: "Account",
    question: "How long does KYC verification take?",
    answer:
      "KYC verification is usually completed within 2-4 hours. Applications submitted during working hours (Sun-Thu, 9am-8pm) are processed faster. Applications submitted at night or on holidays will be verified the next working day.",
  },
  {
    id: 3,
    category: "account",
    tag: "Account",
    question: "How do I close my account?",
    answer:
      "You can request account closure from Dashboard > Settings > Danger Zone. Before that, you must close all active savings goals and withdraw all your balance.",
  },
  {
    id: 4,
    category: "savings",
    tag: "Savings",
    question: "What is the minimum deposit amount?",
    answer:
      "The Bronze plan starts from just ৳500 per month. Silver requires ৳1,000, Gold requires ৳2,000, and Platinum requires ৳5,000 minimum monthly deposit. You can always deposit more than the minimum anytime.",
  },
  {
    id: 5,
    category: "savings",
    tag: "Savings",
    question: "How long until my balance updates after deposit?",
    answer:
      "After sending a deposit via bKash or Nagad, our finance team verifies the screenshot and TxID within 2-4 hours and updates your balance. Bank transfers may take up to 24 hours.",
  },
  {
    id: 6,
    category: "savings",
    tag: "Savings",
    question: "How long does withdrawal take?",
    answer:
      "After goal completion: Bronze takes 7 working days, Silver 5 days, Gold 3 days, and Platinum within 24 hours.",
  },
  {
    id: 7,
    category: "savings",
    tag: "Savings",
    question: "Can I withdraw before my goal date?",
    answer:
      "Yes, but early withdrawal incurs a 3-5% processing fee. Bronze members cannot make early withdrawals. Platinum members get one free early withdrawal per year.",
  },
  {
    id: 8,
    category: "plans",
    tag: "Plans",
    question: "Can I change my plan?",
    answer:
      "Yes! You can upgrade anytime from your dashboard and it takes effect immediately. Downgrading takes effect at the end of your current billing cycle, higher-tier features will be removed then.",
  },
  {
    id: 9,
    category: "plans",
    tag: "Plans",
    question: "Is there a free trial?",
    answer:
      "Silver and Gold plans include a 30-day free trial. Platinum has a 14-day trial. No credit card needed, just complete KYC verification to start your trial.",
  },
  {
    id: 10,
    category: "plans",
    tag: "Plans",
    question: "What happens if I miss a monthly deposit?",
    answer:
      "Missing a deposit breaks your savings streak but does not cancel your plan. Your goal timeline adjusts automatically. There are no late fees, Amanah is a savings community, not a loan company. You will receive an SMS reminder 3 days before your deposit date.",
  },
  {
    id: 11,
    category: "circles",
    tag: "Circles",
    question: "What is a savings circle and how does it work?",
    answer:
      "A savings circle is a group savings system with friends, family or colleagues. Everyone deposits monthly toward a shared goal and keeps each other accountable. Silver members can join 1 circle, Gold 3, and Platinum 10.",
  },
  {
    id: 12,
    category: "circles",
    tag: "Circles",
    question: "Can I create my own circle?",
    answer:
      "Silver members can join existing circles. Gold members can create circles and invite others. Platinum members can create and manage up to 10 circles.",
  },
  {
    id: 13,
    category: "islamic",
    tag: "Islamic",
    question: "Is Islamic mode available on all plans?",
    answer:
      "Yes, riba-free (interest-free) Islamic savings mode is available on all plans including Bronze, completely free. It can be enabled during registration or later from your profile settings.",
  },
  {
    id: 14,
    category: "islamic",
    tag: "Islamic",
    question: "Does Islamic mode offer interest or profit?",
    answer:
      "No. Amanah is a digital savings community, not a bank or investment platform. We do not offer any interest (riba), guaranteed profit, or fixed returns. Islamic mode only ensures your goals and circles operate in a fully halal manner.",
  },
  {
    id: 15,
    category: "security",
    tag: "Security",
    question: "Is my money safe?",
    answer:
      "We use 256-bit SSL encryption, NID-verified KYC, and 2FA on all accounts. However, importantly: we are NOT a bank, deposits are not covered by government insurance. We are a digital savings tracking platform.",
  },
  {
    id: 16,
    category: "security",
    tag: "Security",
    question: "What if I forget my PIN?",
    answer:
      "Click the 'Forgot PIN?' link on the login page. An OTP will be sent to your registered mobile number and you can set a new PIN after NID verification.",
  },
  {
    id: 17,
    category: "security",
    tag: "Security",
    question: "What payment methods are accepted?",
    answer:
      "Bronze members can use bKash and Nagad. Silver, Gold and Platinum members can also use bank transfer (BRAC, Dutch-Bangla, Islami Bank, and any other bank). All deposits are manually verified by our team.",
  },
];

const FaqPage = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const filteredFaqs = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return faqs.filter((faq) => {
      const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
      const matchesSearch =
        !query ||
        faq.question.toLowerCase().includes(query) ||
        faq.answer.toLowerCase().includes(query) ||
        faq.tag.toLowerCase().includes(query);
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Segoe_UI',system-ui,sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#059669,#0891b2)] px-6 pb-20 pt-16 text-center">
        <div className="relative z-10">
          <div className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[13px] font-semibold text-white">
            <BadgeHelp className="h-4 w-4" />
            Frequently Asked Questions
          </div>
          <h1 className="mb-2.5 text-[clamp(26px,4vw,44px)] font-black text-white">
            Find Answers to Everything
          </h1>
          <p className="mx-auto max-w-[480px] text-[15px] text-white/85">
            Browse answers to our most frequently asked questions
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-[60px] w-full">
            <path className="fill-[#f8fafc] dark:fill-[#0a0f1e]" d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      <div className="relative z-10 mx-auto -mt-7 max-w-[700px] px-6">
        <div className="relative">
          <Search className="absolute left-[18px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#64748b] dark:text-[#94a3b8]" />
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-[14px] border-[1.5px] border-[#e2e8f0] bg-white py-4 pl-[52px] pr-24 text-[15px] text-[#0f172a] shadow-[0_8px_32px_rgba(0,0,0,.16)] outline-none transition focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#131e2e] dark:text-[#f1f5f9] dark:shadow-[0_8px_32px_rgba(0,0,0,.2)]"
          />
          {searchQuery && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#64748b] dark:text-[#94a3b8]">
              {filteredFaqs.length} found
            </span>
          )}
        </div>
      </div>

      <section className="px-6 py-12 pb-[72px]">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-8 flex flex-wrap gap-2">
            {categories.map((category) => {
              const Icon = category.icon;
              const active = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => {
                    setActiveCategory(category.id);
                    setOpenFaq(null);
                  }}
                  className={`inline-flex items-center gap-1.5 rounded-full border-[1.5px] px-[18px] py-2 text-[13px] font-semibold transition ${
                    active
                      ? "border-transparent bg-[linear-gradient(135deg,#059669,#0891b2)] text-white"
                      : "border-[#e2e8f0] bg-transparent text-[#64748b] hover:border-transparent hover:bg-[linear-gradient(135deg,#059669,#0891b2)] hover:text-white dark:border-[#1e2d3d] dark:text-[#94a3b8]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {category.label}
                </button>
              );
            })}
          </div>

          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-[#64748b] dark:text-[#94a3b8]">
              <Search className="mx-auto mb-3 h-12 w-12 opacity-70" />
              <p>No questions found.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-2.5">
              {filteredFaqs.map((faq) => {
                const open = openFaq === faq.id;
                const TagIcon =
                  faq.category === "account"
                    ? UserRoundCheck
                    : faq.category === "savings"
                      ? CircleDollarSign
                      : faq.category === "plans"
                        ? Gem
                        : faq.category === "circles"
                          ? Users
                          : faq.category === "islamic"
                            ? Moon
                            : ShieldCheck;
                return (
                  <article
                    key={faq.id}
                    className={`overflow-hidden rounded-[14px] border bg-white transition hover:border-[#059669] dark:bg-[#131e2e] ${
                      open ? "border-[#059669]" : "border-[#e2e8f0] dark:border-[#1e2d3d]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : faq.id)}
                      className="flex w-full items-start justify-between gap-3 px-5 py-[18px] text-left"
                    >
                      <span className="flex-1 text-[15px] font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`h-5 w-5 shrink-0 text-[#059669] transition ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-[max-height] duration-300 ${
                        open ? "max-h-[600px]" : "max-h-0"
                      }`}
                    >
                      <div className="border-t border-[#e2e8f0] px-5 pb-5 pt-3.5 text-sm leading-[1.8] text-[#64748b] dark:border-[#1e2d3d] dark:text-[#94a3b8]">
                        <p>{faq.answer}</p>
                        <span
                          className={`mt-2.5 inline-flex items-center gap-1 rounded-md px-2 py-1 text-[11px] font-bold ${
                            tagStyles[faq.category]
                          }`}
                        >
                          <TagIcon className="h-3 w-3" />
                          {faq.tag}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          <div className="mt-12 rounded-[20px] bg-[linear-gradient(135deg,#059669,#0891b2)] p-10 text-center text-white">
            <h2 className="mb-2 text-[22px] font-extrabold">Still have questions?</h2>
            <p className="mb-6 text-sm text-white/85">
              Our support team is active Sun-Thu 9am-8pm and on WhatsApp 24/7.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/8801700262624"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#25D366] px-[22px] py-3 text-sm font-bold text-white"
              >
                <MessageCircle className="h-4 w-4" />
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/40 bg-white/20 px-[22px] py-3 text-sm font-semibold text-white"
              >
                <Mail className="h-4 w-4" />
                Send a Message
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2e8f0] bg-white px-6 py-7 text-center dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <p className="text-[13px] text-[#64748b] dark:text-[#94a3b8]">
          © 2026 Amanah Savings Community. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default FaqPage;
