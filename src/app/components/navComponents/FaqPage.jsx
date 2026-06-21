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
import usePublicCms from "../shared/usePublicCms";

// Translations
const translations = {
  en: {
    // Hero
    heroBadge: "Frequently Asked Questions",
    heroTitle: "Find Answers to Everything",
    heroDesc: "Browse answers to our most frequently asked questions",
    
    // Search
    searchPlaceholder: "Search questions...",
    found: "found",
    
    // Categories
    categoryAll: "All",
    categoryAccount: "Account",
    categorySavings: "Savings",
    categoryPlans: "Plans",
    categoryCircles: "Circles",
    categoryIslamic: "Islamic",
    categorySecurity: "Security",
    
    // No results
    noQuestions: "No questions found.",
    
    // CTA
    ctaTitle: "Still have questions?",
    ctaDesc: "Our support team is active Sun-Thu 9am-8pm and on WhatsApp 24/7.",
    ctaWhatsApp: "Chat on WhatsApp",
    ctaMessage: "Send a Message",
    
    // Footer
    footer: "© 2026 Amanah Savings Community. All rights reserved.",
    
    // FAQ Questions
    q1: "How do I open an account?",
    a1: "Go to the register page and complete registration in 9 easy steps. You need your National ID (NID), a selfie, and your mobile number. It is completely free and takes about 5 minutes.",
    
    q2: "How long does KYC verification take?",
    a2: "KYC verification is usually completed within 2-4 hours. Applications submitted during working hours (Sun-Thu, 9am-8pm) are processed faster. Applications submitted at night or on holidays will be verified the next working day.",
    
    q3: "How do I close my account?",
    a3: "You can request account closure from Dashboard > Settings > Danger Zone. Before that, you must close all active savings goals and withdraw all your balance.",
    
    q4: "What is the minimum deposit amount?",
    a4: "The Bronze plan starts from just ৳500 per month. Silver requires ৳1,000, Gold requires ৳2,000, and Platinum requires ৳5,000 minimum monthly deposit. You can always deposit more than the minimum anytime.",
    
    q5: "How long until my balance updates after deposit?",
    a5: "After sending a deposit via bKash or Nagad, our finance team verifies the screenshot and TxID within 2-4 hours and updates your balance. Bank transfers may take up to 24 hours.",
    
    q6: "How long does withdrawal take?",
    a6: "After goal completion: Bronze takes 7 working days, Silver 5 days, Gold 3 days, and Platinum within 24 hours.",
    
    q7: "Can I withdraw before my goal date?",
    a7: "Yes, but early withdrawal incurs a 3-5% processing fee. Bronze members cannot make early withdrawals. Platinum members get one free early withdrawal per year.",
    
    q8: "Can I change my plan?",
    a8: "Yes! You can upgrade anytime from your dashboard and it takes effect immediately. Downgrading takes effect at the end of your current billing cycle, higher-tier features will be removed then.",
    
    q9: "Is there a free trial?",
    a9: "Silver and Gold plans include a 30-day free trial. Platinum has a 14-day trial. No credit card needed, just complete KYC verification to start your trial.",
    
    q10: "What happens if I miss a monthly deposit?",
    a10: "Missing a deposit breaks your savings streak but does not cancel your plan. Your goal timeline adjusts automatically. There are no late fees, Amanah is a savings community, not a loan company. You will receive an SMS reminder 3 days before your deposit date.",
    
    q11: "What is a savings circle and how does it work?",
    a11: "A savings circle is a group savings system with friends, family or colleagues. Everyone deposits monthly toward a shared goal and keeps each other accountable. Silver members can join 1 circle, Gold 3, and Platinum 10.",
    
    q12: "Can I create my own circle?",
    a12: "Silver members can join existing circles. Gold members can create circles and invite others. Platinum members can create and manage up to 10 circles.",
    
    q13: "Is Islamic mode available on all plans?",
    a13: "Yes, riba-free (interest-free) Islamic savings mode is available on all plans including Bronze, completely free. It can be enabled during registration or later from your profile settings.",
    
    q14: "Does Islamic mode offer interest or profit?",
    a14: "No. Amanah is a digital savings community, not a bank or investment platform. We do not offer any interest (riba), guaranteed profit, or fixed returns. Islamic mode only ensures your goals and circles operate in a fully halal manner.",
    
    q15: "Is my money safe?",
    a15: "We use 256-bit SSL encryption, NID-verified KYC, and 2FA on all accounts. However, importantly: we are NOT a bank, deposits are not covered by government insurance. We are a digital savings tracking platform.",
    
    q16: "What if I forget my PIN?",
    a16: "Click the 'Forgot PIN?' link on the login page. An OTP will be sent to your registered mobile number and you can set a new PIN after NID verification.",
    
    q17: "What payment methods are accepted?",
    a17: "Bronze members can use bKash and Nagad. Silver, Gold and Platinum members can also use bank transfer (BRAC, Dutch-Bangla, Islami Bank, and any other bank). All deposits are manually verified by our team.",
    
    // Tags
    tagAccount: "Account",
    tagSavings: "Savings",
    tagPlans: "Plans",
    tagCircles: "Circles",
    tagIslamic: "Islamic",
    tagSecurity: "Security",
  },
  bn: {
    // Hero
    heroBadge: "প্রায়শই জিজ্ঞাসিত প্রশ্ন",
    heroTitle: "সবকিছুর উত্তর খুঁজুন",
    heroDesc: "আমাদের সবচেয়ে প্রায়শই জিজ্ঞাসিত প্রশ্নের উত্তর দেখুন",
    
    // Search
    searchPlaceholder: "প্রশ্ন খুঁজুন...",
    found: "পাওয়া গেছে",
    
    // Categories
    categoryAll: "সব",
    categoryAccount: "অ্যাকাউন্ট",
    categorySavings: "সঞ্চয়",
    categoryPlans: "প্ল্যান",
    categoryCircles: "সার্কেল",
    categoryIslamic: "ইসলামিক",
    categorySecurity: "নিরাপত্তা",
    
    // No results
    noQuestions: "কোন প্রশ্ন পাওয়া যায়নি।",
    
    // CTA
    ctaTitle: "এখনও প্রশ্ন আছে?",
    ctaDesc: "আমাদের সাপোর্ট টিম সক্রিয় রবি-বৃহ ৯AM-৮PM এবং হোয়াটসঅ্যাপে ২৪/৭।",
    ctaWhatsApp: "হোয়াটসঅ্যাপে চ্যাট করুন",
    ctaMessage: "বার্তা পাঠান",
    
    // Footer
    footer: "© ২০২৬ আমানাহ সঞ্চয় সম্প্রদায়। সর্বস্বত্ব সংরক্ষিত।",
    
    // FAQ Questions
    q1: "আমি কীভাবে একটি অ্যাকাউন্ট খুলব?",
    a1: "রেজিস্টার পৃষ্ঠায় যান এবং ৯টি সহজ ধাপে নিবন্ধন সম্পূর্ণ করুন। আপনার জাতীয় পরিচয়পত্র (এনআইডি), একটি সেলফি এবং আপনার মোবাইল নম্বর প্রয়োজন। এটি সম্পূর্ণ বিনামূল্যে এবং প্রায় ৫ মিনিট সময় নেয়।",
    
    q2: "কেওয়াইসি যাচাইকরণ করতে কত সময় লাগে?",
    a2: "কেওয়াইসি যাচাইকরণ সাধারণত ২-৪ ঘন্টার মধ্যে সম্পন্ন হয়। কার্যদিবসে (রবি-বৃহ, সকাল ৯টা-রাত ৮টা) জমা দেওয়া আবেদনগুলি দ্রুত প্রক্রিয়া করা হয়। রাতে বা ছুটির দিনে জমা দেওয়া আবেদনগুলি পরবর্তী কার্যদিবসে যাচাই করা হবে।",
    
    q3: "আমি কীভাবে আমার অ্যাকাউন্ট বন্ধ করব?",
    a3: "আপনি ড্যাশবোর্ড > সেটিংস > বিপদ অঞ্চল থেকে অ্যাকাউন্ট বন্ধের অনুরোধ করতে পারেন। তার আগে, আপনাকে সব সক্রিয় সঞ্চয় লক্ষ্য বন্ধ করতে হবে এবং আপনার সমস্ত ব্যালেন্স উত্তোলন করতে হবে।",
    
    q4: "ন্যূনতম জমার পরিমাণ কত?",
    a4: "ব্রোঞ্জ প্ল্যান শুরু হয় মাত্র ৳৫০০ প্রতি মাসে। সিলভারে প্রয়োজন ৳১,০০০, গোল্ডে প্রয়োজন ৳২,০০০, এবং প্লাটিনামে প্রয়োজন ৳৫,০০০ ন্যূনতম মাসিক জমা। আপনি যেকোনো সময় ন্যূনতমের চেয়ে বেশি জমা করতে পারেন।",
    
    q5: "জমা দেওয়ার পর আমার ব্যালেন্স আপডেট হতে কত সময় লাগে?",
    a5: "বিকাশ বা নগদের মাধ্যমে জমা পাঠানোর পর, আমাদের ফাইন্যান্স টিম ২-৪ ঘন্টার মধ্যে স্ক্রিনশট এবং টিএক্সআইডি যাচাই করে এবং আপনার ব্যালেন্স আপডেট করে। ব্যাংক ট্রান্সফার ২৪ ঘন্টা পর্যন্ত সময় নিতে পারে।",
    
    q6: "উত্তোলন করতে কত সময় লাগে?",
    a6: "লক্ষ্য সম্পূর্ণ হওয়ার পর: ব্রোঞ্জে ৭ কার্যদিবস, সিলভারে ৫ দিন, গোল্ডে ৩ দিন, এবং প্লাটিনামে ২৪ ঘন্টার মধ্যে।",
    
    q7: "আমি কি আমার লক্ষ্য তারিখের আগে উত্তোলন করতে পারি?",
    a7: "হ্যাঁ, কিন্তু অকাল উত্তোলনে ৩-৫% প্রসেসিং ফি লাগে। ব্রোঞ্জ সদস্যরা অকাল উত্তোলন করতে পারেন না। প্লাটিনাম সদস্যরা বছরে একটি বিনামূল্যে অকাল উত্তোলন পায়।",
    
    q8: "আমি কি আমার প্ল্যান পরিবর্তন করতে পারি?",
    a8: "হ্যাঁ! আপনি যেকোনো সময় আপনার ড্যাশবোর্ড থেকে আপগ্রেড করতে পারেন এবং এটি অবিলম্বে কার্যকর হয়। ডাউনগ্রেড আপনার বর্তমান বিলিং চক্রের শেষে কার্যকর হয়, উচ্চ-স্তরের বৈশিষ্ট্যগুলি তখন সরানো হবে।",
    
    q9: "কোন বিনামূল্যে ট্রায়াল আছে?",
    a9: "সিলভার এবং গোল্ড প্ল্যানে ৩০-দিনের বিনামূল্যে ট্রায়াল রয়েছে। প্লাটিনামে ১৪-দিনের ট্রায়াল রয়েছে। কোন ক্রেডিট কার্ডের প্রয়োজন নেই, শুধু আপনার ট্রায়াল শুরু করতে কেওয়াইসি যাচাইকরণ সম্পূর্ণ করুন।",
    
    q10: "যদি আমি মাসিক জমা মিস করি তাহলে কী হবে?",
    a10: "জমা মিস করলে আপনার সঞ্চয় স্ট্রিক ভেঙে যায় কিন্তু আপনার প্ল্যান বাতিল হয় না। আপনার লক্ষ্য সময়রেখা স্বয়ংক্রিয়ভাবে সামঞ্জস্য হয়। কোন বিলম্ব ফি নেই, আমানাহ একটি সঞ্চয় সম্প্রদায়, ঋণ কোম্পানি নয়। আপনার জমার তারিখের ৩ দিন আগে আপনি একটি এসএমএস রিমাইন্ডার পাবেন।",
    
    q11: "সঞ্চয় সার্কেল কি এবং এটি কীভাবে কাজ করে?",
    a11: "সঞ্চয় সার্কেল হল বন্ধু, পরিবার বা সহকর্মীদের সাথে একটি গ্রুপ সঞ্চয় ব্যবস্থা। সবাই একটি shared লক্ষ্যের দিকে মাসিক জমা দেয় এবং একে অপরকে দায়বদ্ধ রাখে। সিলভার সদস্যরা ১টি সার্কেলে যোগ দিতে পারেন, গোল্ড ৩টি, এবং প্লাটিনাম ১০টি।",
    
    q12: "আমি কি আমার নিজের সার্কেল তৈরি করতে পারি?",
    a12: "সিলভার সদস্যরা বিদ্যমান সার্কেলে যোগ দিতে পারেন। গোল্ড সদস্যরা সার্কেল তৈরি করতে এবং অন্যদের আমন্ত্রণ জানাতে পারেন। প্লাটিনাম সদস্যরা ১০টি পর্যন্ত সার্কেল তৈরি এবং পরিচালনা করতে পারেন।",
    
    q13: "ইসলামিক মোড কি সব প্ল্যানে উপলব্ধ?",
    a13: "হ্যাঁ, রিবা-মুক্ত (সুদ-মুক্ত) ইসলামিক সঞ্চয় মোড ব্রোঞ্জ সহ সব প্ল্যানে সম্পূর্ণ বিনামূল্যে উপলব্ধ। এটি নিবন্ধনের সময় বা পরে আপনার প্রোফাইল সেটিংস থেকে সক্রিয় করা যেতে পারে।",
    
    q14: "ইসলামিক মোড কি সুদ বা মুনাফা দেয়?",
    a14: "না। আমানাহ একটি ডিজিটাল সঞ্চয় সম্প্রদায়, ব্যাংক বা বিনিয়োগ প্ল্যাটফর্ম নয়। আমরা কোন সুদ (রিবা), গ্যারান্টিড মুনাফা, বা নির্দিষ্ট রিটার্ন অফার করি না। ইসলামিক মোড শুধুমাত্র নিশ্চিত করে যে আপনার লক্ষ্য এবং সার্কেল সম্পূর্ণ হালাল উপায়ে পরিচালিত হয়।",
    
    q15: "আমার টাকা কি নিরাপদ?",
    a15: "আমরা ২৫৬-বিট এসএসএল এনক্রিপশন, এনআইডি-ভেরিফাইড কেওয়াইসি এবং সব অ্যাকাউন্টে ২এফএ ব্যবহার করি। তবে, গুরুত্বপূর্ণভাবে: আমরা একটি ব্যাংক নই, জমা সরকারী বীমা দ্বারা আচ্ছাদিত নয়। আমরা একটি ডিজিটাল সঞ্চয় ট্র্যাকিং প্ল্যাটফর্ম।",
    
    q16: "যদি আমি আমার পিন ভুলে যাই?",
    a16: "লগইন পৃষ্ঠায় 'পিন ভুলে গেছেন?' লিংকে ক্লিক করুন। আপনার নিবন্ধিত মোবাইল নম্বরে একটি ওটিপি পাঠানো হবে এবং এনআইডি যাচাইয়ের পর আপনি একটি নতুন পিন সেট করতে পারেন।",
    
    q17: "কোন পেমেন্ট পদ্ধতি গ্রহণ করা হয়?",
    a17: "ব্রোঞ্জ সদস্যরা বিকাশ এবং নগদ ব্যবহার করতে পারেন। সিলভার, গোল্ড এবং প্লাটিনাম সদস্যরা ব্যাংক ট্রান্সফারও ব্যবহার করতে পারেন (ব্র্যাক, ডাচ-বাংলা, ইসলামী ব্যাংক, এবং অন্যান্য ব্যাংক)। সব জমা আমাদের টিম দ্বারা ম্যানুয়ালি যাচাই করা হয়।",
    
    // Tags
    tagAccount: "অ্যাকাউন্ট",
    tagSavings: "সঞ্চয়",
    tagPlans: "প্ল্যান",
    tagCircles: "সার্কেল",
    tagIslamic: "ইসলামিক",
    tagSecurity: "নিরাপত্তা",
  }
};

const FaqPage = () => {
  const [language] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("appLanguage") || "en";
  });
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const { cms } = usePublicCms();

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Categories with translations
  const categories = [
    { id: "all", label: t('categoryAll'), icon: BadgeHelp },
    { id: "account", label: t('categoryAccount'), icon: UserRoundCheck },
    { id: "savings", label: t('categorySavings'), icon: CircleDollarSign },
    { id: "plans", label: t('categoryPlans'), icon: Gem },
    { id: "circles", label: t('categoryCircles'), icon: Users },
    { id: "islamic", label: t('categoryIslamic'), icon: Moon },
    { id: "security", label: t('categorySecurity'), icon: ShieldCheck },
  ];

  // FAQ Data with translations
  const fallbackFaqs = [
    {
      id: 1,
      category: "account",
      tag: t('tagAccount'),
      question: t('q1'),
      answer: t('a1'),
    },
    {
      id: 2,
      category: "account",
      tag: t('tagAccount'),
      question: t('q2'),
      answer: t('a2'),
    },
    {
      id: 3,
      category: "account",
      tag: t('tagAccount'),
      question: t('q3'),
      answer: t('a3'),
    },
    {
      id: 4,
      category: "savings",
      tag: t('tagSavings'),
      question: t('q4'),
      answer: t('a4'),
    },
    {
      id: 5,
      category: "savings",
      tag: t('tagSavings'),
      question: t('q5'),
      answer: t('a5'),
    },
    {
      id: 6,
      category: "savings",
      tag: t('tagSavings'),
      question: t('q6'),
      answer: t('a6'),
    },
    {
      id: 7,
      category: "savings",
      tag: t('tagSavings'),
      question: t('q7'),
      answer: t('a7'),
    },
    {
      id: 8,
      category: "plans",
      tag: t('tagPlans'),
      question: t('q8'),
      answer: t('a8'),
    },
    {
      id: 9,
      category: "plans",
      tag: t('tagPlans'),
      question: t('q9'),
      answer: t('a9'),
    },
    {
      id: 10,
      category: "plans",
      tag: t('tagPlans'),
      question: t('q10'),
      answer: t('a10'),
    },
    {
      id: 11,
      category: "circles",
      tag: t('tagCircles'),
      question: t('q11'),
      answer: t('a11'),
    },
    {
      id: 12,
      category: "circles",
      tag: t('tagCircles'),
      question: t('q12'),
      answer: t('a12'),
    },
    {
      id: 13,
      category: "islamic",
      tag: t('tagIslamic'),
      question: t('q13'),
      answer: t('a13'),
    },
    {
      id: 14,
      category: "islamic",
      tag: t('tagIslamic'),
      question: t('q14'),
      answer: t('a14'),
    },
    {
      id: 15,
      category: "security",
      tag: t('tagSecurity'),
      question: t('q15'),
      answer: t('a15'),
    },
    {
      id: 16,
      category: "security",
      tag: t('tagSecurity'),
      question: t('q16'),
      answer: t('a16'),
    },
    {
      id: 17,
      category: "security",
      tag: t('tagSecurity'),
      question: t('q17'),
      answer: t('a17'),
    },
  ];

  const cmsFaqs = useMemo(
    () =>
      (cms?.faq || [])
        .filter((item) => item.question && item.answer)
        .map((item, index) => ({
          id: item.id || `cms-${index}`,
          category: item.category || "account",
          tag: item.tag || translations[language]?.tagAccount || translations.en.tagAccount,
          question: item.question,
          answer: item.answer,
        })),
    [cms, language],
  );

  const faqs = cmsFaqs.length ? cmsFaqs : fallbackFaqs;

  const tagStyles = {
    account: "bg-[#0891b21f] text-[#0891b2]",
    savings: "bg-[#0596691f] text-[#059669]",
    plans: "bg-[#8b5cf61f] text-[#8b5cf6]",
    circles: "bg-[#0596691f] text-[#059669]",
    islamic: "bg-[#f59e0b1f] text-[#d97706]",
    security: "bg-[#ef44441f] text-[#ef4444]",
  };

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
  }, [activeCategory, searchQuery, faqs]);

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Segoe_UI',system-ui,sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#059669,#0891b2)] px-6 pb-20 pt-16 text-center">
        <div className="relative z-10">
          <div className="mb-[18px] inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[13px] font-semibold text-white">
            <BadgeHelp className="h-4 w-4" />
            {t('heroBadge')}
          </div>
          <h1 className="mb-2.5 text-[clamp(26px,4vw,44px)] font-black text-white">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto max-w-[480px] text-[15px] text-white/85">
            {t('heroDesc')}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-[60px] w-full">
            <path className="fill-[#f8fafc] dark:fill-[#0a0f1e]" d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Search Section */}
      <div className="relative z-10 mx-auto -mt-7 max-w-[700px] px-6">
        <div className="relative">
          <Search className="absolute left-[18px] top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-[#64748b] dark:text-[#94a3b8]" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="w-full rounded-[14px] border-[1.5px] border-[#e2e8f0] bg-white py-4 pl-[52px] pr-24 text-[15px] text-[#0f172a] shadow-[0_8px_32px_rgba(0,0,0,.16)] outline-none transition focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#131e2e] dark:text-[#f1f5f9] dark:shadow-[0_8px_32px_rgba(0,0,0,.2)]"
          />
          {searchQuery && (
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-[#64748b] dark:text-[#94a3b8]">
              {filteredFaqs.length} {t('found')}
            </span>
          )}
        </div>
      </div>

      {/* Main Section */}
      <section className="px-6 py-12 pb-[72px]">
        <div className="mx-auto max-w-[900px]">
          {/* Categories */}
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

          {/* FAQ List */}
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-[#64748b] dark:text-[#94a3b8]">
              <Search className="mx-auto mb-3 h-12 w-12 opacity-70" />
              <p>{t('noQuestions')}</p>
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

          {/* CTA Section */}
          <div className="mt-12 rounded-[20px] bg-[linear-gradient(135deg,#059669,#0891b2)] p-10 text-center text-white">
            <h2 className="mb-2 text-[22px] font-extrabold">{t('ctaTitle')}</h2>
            <p className="mb-6 text-sm text-white/85">
              {t('ctaDesc')}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href="https://wa.me/8801700262624"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-[10px] bg-[#25D366] px-[22px] py-3 text-sm font-bold text-white transition hover:shadow-lg hover:scale-105"
              >
                <MessageCircle className="h-4 w-4" />
                {t('ctaWhatsApp')}
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-[10px] border border-white/40 bg-white/20 px-[22px] py-3 text-sm font-semibold text-white transition hover:bg-white/30"
              >
                <Mail className="h-4 w-4" />
                {t('ctaMessage')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e2e8f0] bg-white px-6 py-7 text-center dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <p className="text-[13px] text-[#64748b] dark:text-[#94a3b8]">
          {t('footer')}
        </p>
      </footer>
    </div>
  );
};

export default FaqPage;
