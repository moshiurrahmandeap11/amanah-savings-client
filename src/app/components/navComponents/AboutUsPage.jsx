"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle,
  Code,
  Globe,
  Handshake,
  Leaf,
  Lock,
  Moon,
  Palette,
  Target,
  Users,
} from "lucide-react";

// ==================== TRANSLATIONS ====================
const translations = {
  en: {
    // Hero Section
    heroBadge: "Our Story",
    heroTitle: "Built for Bangladesh's Savers",
    heroDesc: "We started Amanah because we believed every Bangladeshi deserves a trusted, transparent, and community-powered way to save for what matters most.",
    
    // Stats
    statsMembers: "Active Members",
    statsSaved: "Total Saved",
    statsCircles: "Savings Circles",
    statsDistricts: "Districts Covered",
    
    // Mission
    missionLabel: "Our Mission",
    missionTitle: "Savings for Every Dream",
    missionP1: "Amanah Savings Community was founded in 2024 with a single belief: that saving money should be simple, social, and accessible to every Bangladeshi, whether they live in Dhaka or a remote village.",
    missionP2: "We are not a bank, an investment platform, or a financial institution. We are a digital savings community that helps members set goals, track progress, and stay accountable through the power of community circles.",
    missionP3: "Every feature we build, from the AI savings assistant to the gamified streak system, is designed with one purpose: to help you reach your financial goals, one deposit at a time.",
    missionBadge: "Amanah Savings",
    missionSub: "Trusted savings community",
    missionTransparent: "100% Transparent",
    
    // Values
    valuesLabel: "Our Values",
    valuesTitle: "What We Stand For",
    value1Title: "Amanah (Trust)",
    value1Desc: "We operate with complete transparency. No hidden fees, no unclear terms, no surprise deductions. Every taka you deposit is tracked and accounted for.",
    value2Title: "Inclusive Access",
    value2Desc: "From a ৳500 starter plan to a ৳5,000/month Platinum tier, we built Amanah so that anyone, at any income level, can start saving today.",
    value3Title: "Halal First",
    value3Desc: "Islamic savings mode is available on every plan. We operate without interest (riba) and ensure all features comply with Halal finance principles.",
    value4Title: "Community Power",
    value4Desc: "Savings circles, leaderboards, referrals, and streaks, we believe saving together is more powerful than saving alone.",
    value5Title: "Privacy & Security",
    value5Desc: "256-bit encryption, NID-verified KYC, and 2FA on all accounts. Your data and savings information stay private, always.",
    value6Title: "Goal-Focused",
    value6Desc: "Every feature is built around your goals, not ours. The AI assistant, streak system, and progress tracking all exist to keep you on track.",
    
    // Team
    teamLabel: "Meet the Team",
    teamTitle: "The People Behind Amanah",
    teamDesc: "A small, passionate team from Bangladesh, building the savings platform we wished we had.",
    team1Name: "Rafiqul Islam",
    team1Role: "Co-Founder & CEO",
    team1Bio: "Former fintech analyst at BRAC Bank. Passionate about financial inclusion for rural Bangladesh.",
    team2Name: "Nusrat Jahan",
    team2Role: "Co-Founder & CTO",
    team2Bio: "10 years in software engineering. Built scalable platforms used by millions across South Asia.",
    team3Name: "Arif Hossain",
    team3Role: "Head of Design",
    team3Bio: "UX designer with a love for building products that feel as good as they work.",
    team4Name: "Fatema Khanam",
    team4Role: "Head of Operations",
    team4Bio: "Oversees member relations, KYC processes, and community circle management across all 64 districts.",
    
    // Timeline
    timelineLabel: "Our Journey",
    timelineTitle: "From Idea to 47,000 Members",
    timeline1Year: "January 2024",
    timeline1Title: "The Idea",
    timeline1Desc: "Rafiqul and Nusrat sketch the first concept of Amanah over tea in Dhaka.",
    timeline2Year: "April 2024",
    timeline2Title: "Beta Launch",
    timeline2Desc: "First 200 beta members join, all from word of mouth. ৳8 lakh saved in first month.",
    timeline3Year: "August 2024",
    timeline3Title: "Circles Launch",
    timeline3Desc: "Savings Circles feature goes live, 100 circles formed in first 48 hours.",
    timeline4Year: "January 2025",
    timeline4Title: "10,000 Members",
    timeline4Desc: "Crossed 10,000 active members. Launched AI savings assistant for Gold/Platinum.",
    timeline5Year: "May 2026",
    timeline5Title: "47,000 Members & Growing",
    timeline5Desc: "৳2.4 crore saved. Present in all 64 districts. Islamic mode launched nationwide.",
    
    // CTA
    ctaTitle: "Join Our Community",
    ctaDesc: "Start your savings journey today, it takes less than 5 minutes to open a free account.",
    ctaButton: "Open Free Account",
    ctaButton2: "Talk to Us",
    footer: "© 2026 Amanah Savings Community. All rights reserved.",
  },
  
  bn: {
    // Hero Section
    heroBadge: "আমাদের গল্প",
    heroTitle: "বাংলাদেশের সঞ্চয়কারীদের জন্য",
    heroDesc: "আমরা আমানাহ শুরু করেছিলাম এই বিশ্বাসে যে প্রতিটি বাংলাদেশী একটি বিশ্বস্ত, স্বচ্ছ এবং সম্প্রদায়-চালিত উপায়ে সঞ্চয় করার সুযোগ পায়, যা তাদের জীবনের গুরুত্বপূর্ণ লক্ষ্যগুলো অর্জনে সহায়তা করে।",
    
    // Stats
    statsMembers: "সক্রিয় সদস্য",
    statsSaved: "মোট সঞ্চয়",
    statsCircles: "সঞ্চয় সার্কেল",
    statsDistricts: "জেলা কভার করা হয়েছে",
    
    // Mission
    missionLabel: "আমাদের লক্ষ্য",
    missionTitle: "প্রতিটি স্বপ্নের জন্য সঞ্চয়",
    missionP1: "আমানাহ সঞ্চয় সম্প্রদায় ২০২৪ সালে প্রতিষ্ঠিত হয়েছিল একটি বিশ্বাস নিয়ে: যে টাকা সঞ্চয় করা সহজ, সামাজিক এবং প্রতিটি বাংলাদেশীর জন্য সহজলভ্য হওয়া উচিত, তারা ঢাকায় থাকুক বা প্রত্যন্ত গ্রামে।",
    missionP2: "আমরা কোনো ব্যাংক, বিনিয়োগ প্ল্যাটফর্ম বা আর্থিক প্রতিষ্ঠান নই। আমরা একটি ডিজিটাল সঞ্চয় সম্প্রদায় যা সদস্যদের লক্ষ্য নির্ধারণ, অগ্রগতি ট্র্যাক এবং কমিউনিটি সার্কেলের মাধ্যমে দায়বদ্ধ থাকতে সহায়তা করে।",
    missionP3: "আমরা যে প্রতিটি ফিচার তৈরি করি, এআই সঞ্চয় সহায়ক থেকে গ্যামিফাইড স্ট্রিক সিস্টেম পর্যন্ত, একটি উদ্দেশ্যে ডিজাইন করা: আপনাকে আপনার আর্থিক লক্ষ্য অর্জনে সহায়তা করা, এক জমা থেকে আরেক জমা।",
    missionBadge: "আমানাহ সঞ্চয়",
    missionSub: "বিশ্বস্ত সঞ্চয় সম্প্রদায়",
    missionTransparent: "১০০% স্বচ্ছ",
    
    // Values
    valuesLabel: "আমাদের মূল্যবোধ",
    valuesTitle: "আমরা যা বিশ্বাস করি",
    value1Title: "আমানাহ (বিশ্বাস)",
    value1Desc: "আমরা সম্পূর্ণ স্বচ্ছতার সাথে কাজ করি। কোনো লুকানো ফি নেই, কোনো অস্পষ্ট শর্ত নেই, কোনো অপ্রত্যাশিত কর্তন নেই। আপনি যে প্রতিটি টাকা জমা দেন তা ট্র্যাক এবং হিসাব করা হয়।",
    value2Title: "সবার জন্য প্রবেশাধিকার",
    value2Desc: "৫০০ টাকার স্টার্টার প্ল্যান থেকে ৫,০০০ টাকা/মাসের প্লাটিনাম টিয়ার পর্যন্ত, আমরা আমানাহ তৈরি করেছি যাতে যে কেউ, যেকোনো আয়ের স্তরে, আজই সঞ্চয় শুরু করতে পারে।",
    value3Title: "হালাল প্রথম",
    value3Desc: "ইসলামিক সঞ্চয় মোড প্রতিটি প্ল্যানে উপলব্ধ। আমরা সুদ (রিবা) ছাড়াই কাজ করি এবং নিশ্চিত করি যে সমস্ত ফিচার হালাল ফাইন্যান্স নীতির সাথে সঙ্গতিপূর্ণ।",
    value4Title: "কমিউনিটি শক্তি",
    value4Desc: "সঞ্চয় সার্কেল, লিডারবোর্ড, রেফারেল এবং স্ট্রিক, আমরা বিশ্বাস করি একসাথে সঞ্চয় করা একা সঞ্চয় করার চেয়ে বেশি শক্তিশালী।",
    value5Title: "গোপনীয়তা ও নিরাপত্তা",
    value5Desc: "২৫৬-বিট এনক্রিপশন, এনআইডি-ভেরিফাইড কেওয়াইসি, এবং সব অ্যাকাউন্টে ২এফএ। আপনার ডেটা এবং সঞ্চয় তথ্য সবসময় গোপন থাকে।",
    value6Title: "লক্ষ্য-কেন্দ্রিক",
    value6Desc: "প্রতিটি ফিচার আপনার লক্ষ্যের চারপাশে তৈরি, আমাদের নয়। এআই সহায়ক, স্ট্রেক সিস্টেম এবং অগ্রগতি ট্র্যাকিং সবই আপনাকে ট্র্যাকে রাখতে বিদ্যমান।",
    
    // Team
    teamLabel: "দলের সাথে পরিচিত হোন",
    teamTitle: "আমানার পিছনের মানুষ",
    teamDesc: "বাংলাদেশ থেকে একটি ছোট, উদ্যমী দল, সেই সঞ্চয় প্ল্যাটফর্ম তৈরি করছে যা আমরা চাইতাম।",
    team1Name: "রফিকুল ইসলাম",
    team1Role: "সহ-প্রতিষ্ঠাতা ও সিইও",
    team1Bio: "ব্র্যাক ব্যাংকে প্রাক্তন ফিনটেক বিশ্লেষক। গ্রামীণ বাংলাদেশের জন্য আর্থিক অন্তর্ভুক্তি সম্পর্কে আগ্রহী।",
    team2Name: "নুসরাত জাহান",
    team2Role: "সহ-প্রতিষ্ঠাতা ও সিটিও",
    team2Bio: "সফটওয়্যার ইঞ্জিনিয়ারিংয়ে ১০ বছর। দক্ষিণ এশিয়া জুড়ে লক্ষ লক্ষ মানুষ ব্যবহার করে এমন স্কেলেবল প্ল্যাটফর্ম তৈরি করেছেন।",
    team3Name: "আরিফ হোসেন",
    team3Role: "প্রধান ডিজাইনার",
    team3Bio: "ইউএক্স ডিজাইনার যিনি এমন পণ্য তৈরি করতে ভালোবাসেন যা দেখতে যেমন ভালো, কাজও তেমন ভালো করে।",
    team4Name: "ফাতেমা খানম",
    team4Role: "প্রধান অপারেশন অফিসার",
    team4Bio: "সদস্য সম্পর্ক, কেওয়াইসি প্রক্রিয়া এবং সমস্ত ৬৪ জেলায় কমিউনিটি সার্কেল ব্যবস্থাপনা তত্ত্বাবধান করেন।",
    
    // Timeline
    timelineLabel: "আমাদের যাত্রা",
    timelineTitle: "আইডিয়া থেকে ৪৭,০০০ সদস্য",
    timeline1Year: "জানুয়ারি ২০২৪",
    timeline1Title: "আইডিয়া",
    timeline1Desc: "রফিকুল ও নুসরাত ঢাকায় চায়ের কাপে আমানাহ-এর প্রথম কনসেপ্ট স্কেচ করেন।",
    timeline2Year: "এপ্রিল ২০২৪",
    timeline2Title: "বেটা লঞ্চ",
    timeline2Desc: "প্রথম ২০০ বেটা সদস্য যোগ দেন, সবাই মুখের কথায়। প্রথম মাসে ৮ লক্ষ টাকা সঞ্চয় হয়।",
    timeline3Year: "আগস্ট ২০২৪",
    timeline3Title: "সার্কেল লঞ্চ",
    timeline3Desc: "সঞ্চয় সার্কেল ফিচার চালু হয়, প্রথম ৪৮ ঘন্টায় ১০০টি সার্কেল গঠিত হয়।",
    timeline4Year: "জানুয়ারি ২০২৫",
    timeline4Title: "১০,০০০ সদস্য",
    timeline4Desc: "১০,০০০ সক্রিয় সদস্য অতিক্রম করে। গোল্ড/প্লাটিনামের জন্য এআই সঞ্চয় সহায়ক চালু হয়।",
    timeline5Year: "মে ২০২৬",
    timeline5Title: "৪৭,০০০ সদস্য ও ক্রমবর্ধমান",
    timeline5Desc: "২.৪ কোটি টাকা সঞ্চয় হয়েছে। সব ৬৪ জেলায় উপস্থিত। ইসলামিক মোড জাতীয়ভাবে চালু হয়েছে।",
    
    // CTA
    ctaTitle: "আমাদের কমিউনিটিতে যোগ দিন",
    ctaDesc: "আজই আপনার সঞ্চয় যাত্রা শুরু করুন, একটি ফ্রি অ্যাকাউন্ট খুলতে ৫ মিনিটেরও কম সময় লাগে।",
    ctaButton: "ফ্রি অ্যাকাউন্ট খুলুন",
    ctaButton2: "আমাদের সাথে কথা বলুন",
    footer: "© ২০২৬ আমানাহ সঞ্চয় সম্প্রদায়। সর্বস্বত্ব সংরক্ষিত।",
  }
};

// ==================== HELPER FUNCTIONS ====================
const useLanguage = () => {
  const [language, setLanguage] = useState('en');
  
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLanguage(savedLang);
  }, []);
  
  return language;
};

const t = (key, lang) => {
  return translations[lang]?.[key] || translations.en[key] || key;
};

// ==================== COMPONENTS ====================
function SectionLabel({ children, lang }) {
  return (
    <div className="mb-3 inline-flex rounded-full bg-[#0596691f] px-3.5 py-1 text-xs font-bold uppercase tracking-[.5px] text-[#059669]">
      {children}
    </div>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-tight text-[#0f172a] dark:text-[#f1f5f9] ${className}`}
    >
      {children}
    </h2>
  );
}

const AboutUsPage = () => {
  const lang = useLanguage();

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Segoe_UI',system-ui,sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#059669,#0891b2)] px-6 py-20 text-center">
        <div className="absolute inset-0 opacity-100 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.08)_1px,transparent_0)] [background-size:60px_60px]" />
        <div className="relative z-10 mx-auto max-w-[960px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[13px] font-semibold text-white">
            <Leaf className="h-4 w-4" />
            {t('heroBadge', lang)}
          </div>
          <h1 className="mb-4 text-[clamp(32px,5vw,56px)] font-black leading-tight text-white">
            {t('heroTitle', lang)}
          </h1>
          <p className="mx-auto mb-8 max-w-[560px] text-[17px] leading-relaxed text-white/85">
            {t('heroDesc', lang)}
          </p>
          <div className="mx-auto grid max-w-[900px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            <div className="min-w-0 rounded-2xl border border-white/20 bg-white/15 p-4 text-center backdrop-blur md:p-6">
              <div className="whitespace-nowrap text-[28px] font-black leading-tight text-white md:text-4xl">47,000+</div>
              <div className="mt-1 text-xs text-white/80 md:text-[13px]">{t('statsMembers', lang)}</div>
            </div>
            <div className="min-w-0 rounded-2xl border border-white/20 bg-white/15 p-4 text-center backdrop-blur md:p-6">
              <div className="whitespace-nowrap text-[28px] font-black leading-tight text-white md:text-4xl">৳2.4 Cr+</div>
              <div className="mt-1 text-xs text-white/80 md:text-[13px]">{t('statsSaved', lang)}</div>
            </div>
            <div className="min-w-0 rounded-2xl border border-white/20 bg-white/15 p-4 text-center backdrop-blur md:p-6">
              <div className="whitespace-nowrap text-[28px] font-black leading-tight text-white md:text-4xl">1,200+</div>
              <div className="mt-1 text-xs text-white/80 md:text-[13px]">{t('statsCircles', lang)}</div>
            </div>
            <div className="min-w-0 rounded-2xl border border-white/20 bg-white/15 p-4 text-center backdrop-blur md:p-6">
              <div className="whitespace-nowrap text-[28px] font-black leading-tight text-white md:text-4xl">64</div>
              <div className="mt-1 text-xs text-white/80 md:text-[13px]">{t('statsDistricts', lang)}</div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-[60px] w-full">
            <path className="fill-[#f8fafc] dark:fill-[#0a0f1e]" d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>{t('missionLabel', lang)}</SectionLabel>
              <SectionTitle>{t('missionTitle', lang)}</SectionTitle>
              <div className="space-y-4 text-base leading-[1.8] text-[#64748b] dark:text-[#94a3b8]">
                <p>{t('missionP1', lang)}</p>
                <p>{t('missionP2', lang)}</p>
                <p>{t('missionP3', lang)}</p>
              </div>
            </div>
            <div className="rounded-3xl bg-[linear-gradient(135deg,#059669,#0891b2)] p-12 text-center">
              <Leaf className="mx-auto mb-4 h-20 w-20 text-white" strokeWidth={1.6} />
              <div className="text-xl font-bold text-white">{t('missionBadge', lang)}</div>
              <div className="mt-2 text-sm text-white/70">{t('missionSub', lang)}</div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/85">
                <CheckCircle className="h-4 w-4" />
                {t('missionTransparent', lang)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-y border-[#e2e8f0] bg-white px-6 py-20 dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <SectionLabel>{t('valuesLabel', lang)}</SectionLabel>
            <SectionTitle>{t('valuesTitle', lang)}</SectionTitle>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Handshake, title: t('value1Title', lang), desc: t('value1Desc', lang) },
              { icon: Globe, title: t('value2Title', lang), desc: t('value2Desc', lang) },
              { icon: Moon, title: t('value3Title', lang), desc: t('value3Desc', lang) },
              { icon: Users, title: t('value4Title', lang), desc: t('value4Desc', lang) },
              { icon: Lock, title: t('value5Title', lang), desc: t('value5Desc', lang) },
              { icon: Target, title: t('value6Title', lang), desc: t('value6Desc', lang) },
            ].map((value, idx) => {
              const Icon = value.icon;
              return (
                <article
                  key={idx}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-8 transition hover:-translate-y-1 hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#131e2e]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0596691f] text-[#059669]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#0f172a] dark:text-[#f1f5f9]">{value.title}</h3>
                  <p className="text-sm leading-[1.7] text-[#64748b] dark:text-[#94a3b8]">{value.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <SectionLabel>{t('teamLabel', lang)}</SectionLabel>
            <SectionTitle>{t('teamTitle', lang)}</SectionTitle>
            <p className="mx-auto max-w-[600px] text-base leading-[1.7] text-[#64748b] dark:text-[#94a3b8]">
              {t('teamDesc', lang)}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Briefcase, name: t('team1Name', lang), role: t('team1Role', lang), bio: t('team1Bio', lang) },
              { icon: Code, name: t('team2Name', lang), role: t('team2Role', lang), bio: t('team2Bio', lang) },
              { icon: Palette, name: t('team3Name', lang), role: t('team3Role', lang), bio: t('team3Bio', lang) },
              { icon: BarChart3, name: t('team4Name', lang), role: t('team4Role', lang), bio: t('team4Bio', lang) },
            ].map((member, idx) => {
              const Icon = member.icon;
              return (
                <article
                  key={idx}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-7 text-center transition hover:-translate-y-1 hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#131e2e]"
                >
                  <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#059669,#0891b2)] text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-1 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">{member.name}</h3>
                  <p className="mb-2 text-[13px] font-semibold text-[#059669]">{member.role}</p>
                  <p className="text-xs leading-[1.6] text-[#64748b] dark:text-[#94a3b8]">{member.bio}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="border-y border-[#e2e8f0] bg-white px-6 py-20 dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel>{t('timelineLabel', lang)}</SectionLabel>
              <SectionTitle>{t('timelineTitle', lang)}</SectionTitle>
            </div>
            <div className="relative pl-8">
              <div className="absolute bottom-0 left-2 top-0 w-0.5 bg-[linear-gradient(135deg,#059669,#0891b2)]" />
              {[
                { year: t('timeline1Year', lang), title: t('timeline1Title', lang), desc: t('timeline1Desc', lang) },
                { year: t('timeline2Year', lang), title: t('timeline2Title', lang), desc: t('timeline2Desc', lang) },
                { year: t('timeline3Year', lang), title: t('timeline3Title', lang), desc: t('timeline3Desc', lang) },
                { year: t('timeline4Year', lang), title: t('timeline4Title', lang), desc: t('timeline4Desc', lang) },
                { year: t('timeline5Year', lang), title: t('timeline5Title', lang), desc: t('timeline5Desc', lang) },
              ].map((item, idx) => (
                <div key={idx} className="relative mb-10 last:mb-0">
                  <div className="absolute left-[-28px] top-1 h-4 w-4 rounded-full border-[3px] border-white bg-[linear-gradient(135deg,#059669,#0891b2)] dark:border-[#131e2e]" />
                  <div className="mb-1 text-xs font-bold text-[#059669]">{item.year}</div>
                  <h3 className="mb-1 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">{item.title}</h3>
                  <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl bg-[linear-gradient(135deg,#059669,#0891b2)] p-8 text-center text-white md:p-[60px]">
            <h2 className="mb-3 text-[clamp(24px,3vw,36px)] font-black">{t('ctaTitle', lang)}</h2>
            <p className="mb-8 text-base text-white/85">{t('ctaDesc', lang)}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-[15px] font-bold text-[#059669] transition hover:shadow-lg"
              >
                {t('ctaButton', lang)} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="rounded-xl  border-2 border-white/60 px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10"
              >
                {t('ctaButton2', lang)}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e2e8f0] bg-white px-6 py-8 text-center dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <p className="text-[13px] text-[#64748b] dark:text-[#94a3b8]">
          {t('footer', lang)}
        </p>
      </footer>
    </div>
  );
};

export default AboutUsPage;