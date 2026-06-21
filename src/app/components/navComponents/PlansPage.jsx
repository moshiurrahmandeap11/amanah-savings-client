"use client";

import React, { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bot,
  Check,
  ChevronDown,
  CreditCard,
  Gem,
  Medal,
  Moon,
  ShieldCheck,
  Star,
  Trophy,
  Users,
  Wallet,
  X,
} from "lucide-react";
import usePublicCms from "../shared/usePublicCms";

// Translations
const translations = {
  en: {
    // Hero
    heroBadge: "Transparent Savings Plans",
    heroTitle: "Pick Your Savings Journey",
    heroDesc: "From your first ৳500 deposit to building a ৳10 lakh emergency fund, we have a plan that grows with your ambitions.",
    heroStat1: "৳500",
    heroStat1Label: "Minimum to start",
    heroStat2: "4 Tiers",
    heroStat2Label: "Plans available",
    heroStat3: "0%",
    heroStat3Label: "Hidden fees",
    heroStat4: "Free",
    heroStat4Label: "Upgrade anytime",

    // Plans Section
    plansLabel: "Savings Plans",
    plansTitle: "Choose Your Tier",
    plansSubtitle: "No investment products, no guaranteed returns, just a powerful community savings platform built for your goals.",
    monthly: "Monthly",
    yearly: "Yearly",
    yearlySave: "Save 20%",
    mostPopular: "Most Popular",
    mostMembersChoose: "Most members choose Gold",
    perMonth: "/month",
    startFree: "Start Free",
    chooseSilver: "Choose Silver",
    chooseGold: "Choose Gold",
    choosePlatinum: "Choose Platinum",

    // Plan Names
    bronze: "Bronze",
    silver: "Silver",
    gold: "Gold",
    platinum: "Platinum",
    starter: "Starter",
    essential: "Essential",
    growth: "Growth",
    elite: "Elite",

    // Plan Features
    featureGoals: "Active savings goals",
    featureMinDeposit: "Min monthly deposit",
    featureMaxDeposit: "Max single deposit",
    featureLockPeriod: "Goal lock period",
    featurePayments: "Payments",
    featureBkash: "bKash & Nagad",
    featureBankTransfer: "Bank Transfer",
    featureWithdrawalTime: "Withdrawal time",
    featureEarlyWithdrawal: "Early withdrawal",
    featureCommunity: "Community Circles",
    featureJoinCircles: "Join circles",
    featureCreateCircles: "Create circles",
    featureCircleAdmin: "Circle admin tools",
    featureAI: "AI & Insights",
    featureInsightsReport: "Savings insights report",
    featureAIAssistant: "AI financial assistant",
    featureGoalProjections: "Goal projections",
    featureGamification: "Gamification",
    featureStreakTracking: "Streak tracking",
    featureBadges: "Achievement badges",
    featureLeaderboard: "Community leaderboard",
    featureChallenges: "Savings challenges",
    featureSecurity: "Security & Support",
    featureKYC: "KYC verification",
    feature2FA: "2-factor auth",
    featureSupport: "Customer support",
    featureManager: "Account manager",
    featureIslamic: "Islamic Mode",
    featureRibaFree: "Riba-free savings",
    featureHalalGoals: "Halal goal categories",

    // Feature Values
    upTo3: "Up to 3",
    upTo6: "Up to 6",
    unlimited: "Unlimited",
    custom: "Custom",
    min500: "৳500",
    min1000: "৳1,000",
    min2000: "৳2,000",
    min5000: "৳5,000",
    max10000: "৳10,000",
    max25000: "৳25,000",
    max100000: "৳1,00,000",
    max500000: "৳5,00,000",
    months3_12: "3-12 months",
    months3_24: "3-24 months",
    months3_60: "3-60 months",
    days7_10: "7-10 days",
    days5_7: "5-7 days",
    days3: "3 days",
    hours24: "24 hours",
    withFee: "With fee",
    freeOnceYear: "Free once/yr",
    no: "No",
    oneCircle: "1 circle",
    threeCircles: "3 circles",
    tenCircles: "10 circles",
    createOne: "1 circle",
    createThree: "3 circles",
    viewOnly: "View only",
    fullAccess: "Full access",
    featuredProfile: "Featured profile",
    monthly: "Monthly",
    weekly: "Weekly",
    daily: "Daily",
    advanced: "Advanced",
    advancedPlus: "Advanced+",
    basic: "Basic",
    standard: "Standard",
    enhanced: "Enhanced",
    premium: "Premium",
    email: "Email",
    emailChat: "Email + Chat",
    priorityChat: "Priority chat",
    dedicatedManager: "Dedicated manager",
    fiveBadges: "5 badges",
    twentyBadges: "20 badges",
    allBadges: "All badges",
    allExclusive: "All + exclusive",
    yes: "Yes",

    // Islamic Mode Banner
    islamicBannerTitle: "Islamic Savings Mode Available on All Plans",
    islamicBannerDesc: "Enable riba-free savings across all tiers. Amanah's Islamic mode ensures every transaction, goal, and circle operates without interest, fully compliant with Halal finance principles.",
    islamicBannerButton: "Enable Islamic Mode",

    // Comparison
    compareLabel: "Feature Comparison",
    compareTitle: "Everything Side by Side",
    compareSubtitle: "Compare every feature so you pick the right plan with confidence.",
    compareFeature: "Feature",
    compareFree: "Free",
    comparePrice: "৳{price}/mo",

    // Calculator
    calcLabel: "Savings Calculator",
    calcTitle: "See Your Goal Timeline",
    calcSubtitle: "Adjust the sliders and watch your savings projection update instantly.",
    calcConfigure: "Configure Your Plan",
    calcEstimate: "Estimate how fast you'll reach your goal with consistent monthly saving.",
    calcPlan: "Savings Plan",
    calcMonthlyDeposit: "Monthly Deposit",
    calcDuration: "Goal Duration",
    calcTarget: "Goal Target (optional)",
    calcTargetPlaceholder: "e.g. 100000",
    calcYouWillSave: "You will save",
    calcMonthly: "Monthly",
    calcDurationLabel: "Duration",
    calcGoalReached: "Goal reached",
    calcStartSaving: "Start Saving Now",
    calcDisclaimer: "This calculator shows projected savings totals based on your inputs. Amanah Savings Community is not an investment platform and does not offer any guaranteed returns, fixed profits, or interest.",
    calcReachTarget: "You will reach your target in {months} months with this monthly deposit.",
    calcNeedMonths: "You need {months} months total to reach your target. Increase your deposit to finish sooner.",

    // Testimonials
    testimonialLabel: "Member Stories",
    testimonialTitle: "What Our Members Say",

    // FAQ
    faqLabel: "Common Questions",
    faqTitle: "Plans FAQ",
    faq1: "Can I change my plan later?",
    faq1Answer: "Yes! You can upgrade your plan at any time from your dashboard settings. Downgrading is also possible at the end of your current billing cycle, though features like additional circles or AI access will be removed if you move to a lower tier.",
    faq2: "Is there a free trial for paid plans?",
    faq2Answer: "Silver and Gold plans include a 30-day free trial with full features. Platinum offers a 14-day trial with a dedicated account manager. No credit card required to start, just KYC verification.",
    faq3: "What happens if I miss a monthly deposit?",
    faq3Answer: "Missing a deposit breaks your savings streak but does not cancel your plan. Your goal timeline adjusts automatically. We send SMS reminders 3 days before your deposit date. There are no late fees.",
    faq4: "How is this different from a bank savings account?",
    faq4Answer: "Amanah is a digital savings community, not a bank. We do not offer interest, FDIC-style insurance, or banking services. We are a goal-tracking and community savings platform.",
    faq5: "Can I withdraw before my goal date?",
    faq5Answer: "Yes, but early withdrawals may incur a small processing fee to cover administrative costs. Bronze members cannot make early withdrawals. Platinum members get one free early withdrawal per year.",
    faq6: "Is Islamic Mode available on all plans?",
    faq6Answer: "Yes, Islamic savings mode is available on every plan including Bronze. Toggle it on during registration or in your profile settings for riba-free goal and circle calculations.",
    faq7: "What payment methods are accepted?",
    faq7Answer: "Bronze members can use bKash and Nagad. Silver, Gold, and Platinum members also have access to bank transfer. Deposits are manually verified within 24 hours by our finance team.",
    faq8: "Are there any hidden fees?",
    faq8Answer: "No hidden fees, ever. The platform fee for Silver, Gold, and Platinum is clearly stated. We will always give notice before any fee changes.",

    // CTA
    ctaTitle: "Ready to Start Saving?",
    ctaDesc: "Join 47,000+ members already building their savings goals with Amanah.",
    ctaButton: "Open Free Account",
    ctaButton2: "Talk to Us",

    // Disclaimer
    disclaimer: "Disclaimer",
  },
  bn: {
    // Hero
    heroBadge: "স্বচ্ছ সঞ্চয় প্ল্যান",
    heroTitle: "আপনার সঞ্চয় যাত্রা বেছে নিন",
    heroDesc: "আপনার প্রথম ৳৫০০ জমা থেকে ৳১০ লক্ষ জরুরি তহবিল গঠন পর্যন্ত, আমাদের একটি প্ল্যান রয়েছে যা আপনার উচ্চাকাঙ্ক্ষার সাথে বাড়ে।",
    heroStat1: "৳৫০০",
    heroStat1Label: "শুরু করতে ন্যূনতম",
    heroStat2: "৪ টিয়ার",
    heroStat2Label: "প্ল্যান উপলব্ধ",
    heroStat3: "০%",
    heroStat3Label: "লুকানো ফি",
    heroStat4: "বিনামূল্যে",
    heroStat4Label: "যেকোনো সময় আপগ্রেড",

    // Plans Section
    plansLabel: "সঞ্চয় প্ল্যান",
    plansTitle: "আপনার টিয়ার বেছে নিন",
    plansSubtitle: "কোন বিনিয়োগ পণ্য নয়, কোন গ্যারান্টেড রিটার্ন নয়, শুধুমাত্র আপনার লক্ষ্যের জন্য তৈরি একটি শক্তিশালী কমিউনিটি সঞ্চয় প্ল্যাটফর্ম।",
    monthly: "মাসিক",
    yearly: "বার্ষিক",
    yearlySave: "২০% সাশ্রয়",
    mostPopular: "সবচেয়ে জনপ্রিয়",
    mostMembersChoose: "বেশিরভাগ সদস্য গোল্ড বেছে নেন",
    perMonth: "/মাস",
    startFree: "বিনামূল্যে শুরু করুন",
    chooseSilver: "সিলভার বেছে নিন",
    chooseGold: "গোল্ড বেছে নিন",
    choosePlatinum: "প্লাটিনাম বেছে নিন",

    // Plan Names
    bronze: "ব্রোঞ্জ",
    silver: "সিলভার",
    gold: "গোল্ড",
    platinum: "প্লাটিনাম",
    starter: "স্টার্টার",
    essential: "এসেনশিয়াল",
    growth: "গ্রোথ",
    elite: "এলিট",

    // Plan Features
    featureGoals: "সক্রিয় সঞ্চয় লক্ষ্য",
    featureMinDeposit: "ন্যূনতম মাসিক জমা",
    featureMaxDeposit: "সর্বোচ্চ এককালীন জমা",
    featureLockPeriod: "লক্ষ্য লক সময়কাল",
    featurePayments: "পেমেন্ট",
    featureBkash: "বিকাশ ও নগদ",
    featureBankTransfer: "ব্যাংক ট্রান্সফার",
    featureWithdrawalTime: "উত্তোলনের সময়",
    featureEarlyWithdrawal: "অকাল উত্তোলন",
    featureCommunity: "কমিউনিটি সার্কেল",
    featureJoinCircles: "সার্কেলে যোগ দিন",
    featureCreateCircles: "সার্কেল তৈরি করুন",
    featureCircleAdmin: "সার্কেল অ্যাডমিন টুলস",
    featureAI: "এআই ও অন্তর্দৃষ্টি",
    featureInsightsReport: "সঞ্চয় অন্তর্দৃষ্টি প্রতিবেদন",
    featureAIAssistant: "এআই আর্থিক সহায়ক",
    featureGoalProjections: "লক্ষ্য পূর্বাভাস",
    featureGamification: "গ্যামিফিকেশন",
    featureStreakTracking: "স্ট্রেক ট্র্যাকিং",
    featureBadges: "অর্জন ব্যাজ",
    featureLeaderboard: "কমিউনিটি লিডারবোর্ড",
    featureChallenges: "সঞ্চয় চ্যালেঞ্জ",
    featureSecurity: "নিরাপত্তা ও সাপোর্ট",
    featureKYC: "কেওয়াইসি যাচাইকরণ",
    feature2FA: "২-ফ্যাক্টর অথেনটিকেশন",
    featureSupport: "গ্রাহক সাপোর্ট",
    featureManager: "অ্যাকাউন্ট ম্যানেজার",
    featureIslamic: "ইসলামিক মোড",
    featureRibaFree: "রিবা-মুক্ত সঞ্চয়",
    featureHalalGoals: "হালাল লক্ষ্য বিভাগ",

    // Feature Values
    upTo3: "৩টি পর্যন্ত",
    upTo6: "৬টি পর্যন্ত",
    unlimited: "আনলিমিটেড",
    custom: "কাস্টম",
    min500: "৳৫০০",
    min1000: "৳১,০০০",
    min2000: "৳২,০০০",
    min5000: "৳৫,০০০",
    max10000: "৳১০,০০০",
    max25000: "৳২৫,০০০",
    max100000: "৳১,০০,০০০",
    max500000: "৳৫,০০,০০০",
    months3_12: "৩-১২ মাস",
    months3_24: "৩-২৪ মাস",
    months3_60: "৩-৬০ মাস",
    days7_10: "৭-১০ দিন",
    days5_7: "৫-৭ দিন",
    days3: "৩ দিন",
    hours24: "২৪ ঘন্টা",
    withFee: "ফি সহ",
    freeOnceYear: "বছরে একবার বিনামূল্যে",
    no: "না",
    oneCircle: "১টি সার্কেল",
    threeCircles: "৩টি সার্কেল",
    tenCircles: "১০টি সার্কেল",
    createOne: "১টি সার্কেল",
    createThree: "৩টি সার্কেল",
    viewOnly: "শুধু দেখুন",
    fullAccess: "পূর্ণ প্রবেশাধিকার",
    featuredProfile: "বৈশিষ্ট্যযুক্ত প্রোফাইল",
    monthly: "মাসিক",
    weekly: "সাপ্তাহিক",
    daily: "দৈনিক",
    advanced: "অ্যাডভান্সড",
    advancedPlus: "অ্যাডভান্সড+",
    basic: "বেসিক",
    standard: "স্ট্যান্ডার্ড",
    enhanced: "এনহ্যান্সড",
    premium: "প্রিমিয়াম",
    email: "ইমেইল",
    emailChat: "ইমেইল + চ্যাট",
    priorityChat: "প্রায়োরিটি চ্যাট",
    dedicatedManager: "ডেডিকেটেড ম্যানেজার",
    fiveBadges: "৫টি ব্যাজ",
    twentyBadges: "২০টি ব্যাজ",
    allBadges: "সব ব্যাজ",
    allExclusive: "সব + এক্সক্লুসিভ",
    yes: "হ্যাঁ",

    // Islamic Mode Banner
    islamicBannerTitle: "ইসলামিক সঞ্চয় মোড সব প্ল্যানে উপলব্ধ",
    islamicBannerDesc: "সব টিয়ারে রিবা-মুক্ত সঞ্চয় সক্রিয় করুন। আমানাহের ইসলামিক মোড নিশ্চিত করে যে প্রতিটি লেনদেন, লক্ষ্য এবং সার্কেল সুদ ছাড়াই পরিচালিত হয়, যা হালাল ফাইন্যান্স নীতির সাথে সম্পূর্ণ সঙ্গতিপূর্ণ।",
    islamicBannerButton: "ইসলামিক মোড সক্রিয় করুন",

    // Comparison
    compareLabel: "বৈশিষ্ট্য তুলনা",
    compareTitle: "পাশাপাশি সবকিছু",
    compareSubtitle: "আত্মবিশ্বাসের সাথে সঠিক প্ল্যান বেছে নিতে প্রতিটি বৈশিষ্ট্য তুলনা করুন।",
    compareFeature: "বৈশিষ্ট্য",
    compareFree: "বিনামূল্যে",
    comparePrice: "৳{price}/মাস",

    // Calculator
    calcLabel: "সঞ্চয় ক্যালকুলেটর",
    calcTitle: "আপনার লক্ষ্য সময়রেখা দেখুন",
    calcSubtitle: "স্লাইডারগুলি সামঞ্জস্য করুন এবং আপনার সঞ্চয় প্রজেকশন তাৎক্ষণিকভাবে আপডেট দেখুন।",
    calcConfigure: "আপনার প্ল্যান কনফিগার করুন",
    calcEstimate: "নিয়মিত মাসিক সঞ্চয়ের মাধ্যমে আপনি কত দ্রুত আপনার লক্ষ্যে পৌঁছাবেন তা অনুমান করুন।",
    calcPlan: "সঞ্চয় প্ল্যান",
    calcMonthlyDeposit: "মাসিক জমা",
    calcDuration: "লক্ষ্য মেয়াদ",
    calcTarget: "লক্ষ্য পরিমাণ (ঐচ্ছিক)",
    calcTargetPlaceholder: "যেমন: ১০০০০০",
    calcYouWillSave: "আপনি সঞ্চয় করবেন",
    calcMonthly: "মাসিক",
    calcDurationLabel: "মেয়াদ",
    calcGoalReached: "লক্ষ্য পৌঁছেছে",
    calcStartSaving: "এখনই সঞ্চয় শুরু করুন",
    calcDisclaimer: "এই ক্যালকুলেটর আপনার ইনপুটের উপর ভিত্তি করে প্রক্ষিপ্ত সঞ্চয় মোট দেখায়। আমানাহ সঞ্চয় সম্প্রদায় একটি বিনিয়োগ প্ল্যাটফর্ম নয় এবং কোন গ্যারান্টেড রিটার্ন, নির্দিষ্ট মুনাফা বা সুদ অফার করে না।",
    calcReachTarget: "আপনি এই মাসিক জমার সাথে {months} মাসে আপনার লক্ষ্যে পৌঁছাবেন।",
    calcNeedMonths: "আপনার লক্ষ্যে পৌঁছাতে মোট {months} মাস প্রয়োজন। দ্রুত শেষ করতে আপনার জমা বাড়ান।",

    // Testimonials
    testimonialLabel: "সদস্য গল্প",
    testimonialTitle: "আমাদের সদস্যরা যা বলেন",

    // FAQ
    faqLabel: "সাধারণ প্রশ্ন",
    faqTitle: "প্ল্যান প্রশ্নোত্তর",
    faq1: "আমি কি পরে আমার প্ল্যান পরিবর্তন করতে পারি?",
    faq1Answer: "হ্যাঁ! আপনি যেকোনো সময় আপনার ড্যাশবোর্ড সেটিংস থেকে আপনার প্ল্যান আপগ্রেড করতে পারেন। ডাউনগ্রেডিং আপনার বর্তমান বিলিং চক্রের শেষেও সম্ভব, তবে আপনি যদি নিম্ন টিয়ারে যান তবে অতিরিক্ত সার্কেল বা এআই অ্যাক্সেসের মতো বৈশিষ্ট্যগুলি সরানো হবে।",
    faq2: "পেইড প্ল্যানের জন্য কি বিনামূল্যে ট্রায়াল আছে?",
    faq2Answer: "সিলভার এবং গোল্ড প্ল্যানে ৩০-দিনের বিনামূল্যে ট্রায়াল রয়েছে। প্লাটিনামে একটি ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার সহ ১৪-দিনের ট্রায়াল রয়েছে। শুরু করতে কোন ক্রেডিট কার্ডের প্রয়োজন নেই, শুধু কেওয়াইসি যাচাইকরণ।",
    faq3: "যদি আমি মাসিক জমা মিস করি তাহলে কী হবে?",
    faq3Answer: "জমা মিস করলে আপনার সঞ্চয় স্ট্রিক ভেঙে যায় কিন্তু আপনার প্ল্যান বাতিল হয় না। আপনার লক্ষ্য সময়রেখা স্বয়ংক্রিয়ভাবে সামঞ্জস্য হয়। আপনার জমার তারিখের ৩ দিন আগে আমরা এসএমএস রিমাইন্ডার পাঠাই। কোন বিলম্ব ফি নেই।",
    faq4: "এটি ব্যাংক সঞ্চয় অ্যাকাউন্ট থেকে কীভাবে আলাদা?",
    faq4Answer: "আমানাহ একটি ডিজিটাল সঞ্চয় সম্প্রদায়, ব্যাংক নয়। আমরা সুদ, এফডিআইসি-স্টাইল বীমা বা ব্যাংকিং পরিষেবা অফার করি না। আমরা একটি লক্ষ্য-ট্র্যাকিং এবং কমিউনিটি সঞ্চয় প্ল্যাটফর্ম।",
    faq5: "আমি কি আমার লক্ষ্য তারিখের আগে উত্তোলন করতে পারি?",
    faq5Answer: "হ্যাঁ, কিন্তু অকাল উত্তোলনে প্রশাসনিক খরচ কভার করতে সামান্য প্রসেসিং ফি লাগতে পারে। ব্রোঞ্জ সদস্যরা অকাল উত্তোলন করতে পারেন না। প্লাটিনাম সদস্যরা বছরে একটি বিনামূল্যে অকাল উত্তোলন পায়।",
    faq6: "ইসলামিক মোড কি সব প্ল্যানে উপলব্ধ?",
    faq6Answer: "হ্যাঁ, ইসলামিক সঞ্চয় মোড ব্রোঞ্জ সহ সব প্ল্যানে উপলব্ধ। নিবন্ধনের সময় বা আপনার প্রোফাইল সেটিংসে এটি সক্রিয় করুন রিবা-মুক্ত লক্ষ্য এবং সার্কেল গণনার জন্য।",
    faq7: "কোন পেমেন্ট পদ্ধতি গ্রহণ করা হয়?",
    faq7Answer: "ব্রোঞ্জ সদস্যরা বিকাশ এবং নগদ ব্যবহার করতে পারেন। সিলভার, গোল্ড এবং প্লাটিনাম সদস্যরা ব্যাংক ট্রান্সফারও ব্যবহার করতে পারেন। আমাদের ফাইন্যান্স টিম দ্বারা ২৪ ঘন্টার মধ্যে জমা ম্যানুয়ালি যাচাই করা হয়।",
    faq8: "কোন লুকানো ফি আছে?",
    faq8Answer: "কখনও কোন লুকানো ফি নেই। সিলভার, গোল্ড এবং প্লাটিনামের জন্য প্ল্যাটফর্ম ফি স্পষ্টভাবে উল্লেখ করা আছে। কোন ফি পরিবর্তনের আগে আমরা সর্বদা নোটিশ দেব।",

    // CTA
    ctaTitle: "সঞ্চয় শুরু করতে প্রস্তুত?",
    ctaDesc: "৪৭,০০০+ সদস্য ইতিমধ্যে আমানাহের সাথে তাদের সঞ্চয় লক্ষ্য তৈরি করছে।",
    ctaButton: "বিনামূল্যে অ্যাকাউন্ট খুলুন",
    ctaButton2: "আমাদের সাথে কথা বলুন",

    // Disclaimer
    disclaimer: "সতর্কতা",
  }
};

// Plan data with translations
const getPlans = (t) => [
  {
    id: "bronze",
    tier: t('bronze'),
    name: t('starter'),
    icon: Medal,
    monthly: 0,
    yearly: 0,
    color: "#c2694f",
    iconClass: "bg-gradient-to-br from-[#fef3c7] to-[#fde68a] text-[#b45309]",
    cta: t('startFree'),
    desc: "Perfect for beginners. Save at your own pace with no platform fee, forever.",
    features: [
      [t('featureGoals'), t('upTo3')],
      [`${t('featureMinDeposit')}: ${t('min500')}/month`, true],
      [t('featureBkash'), true],
      ["Basic progress tracking", true],
      ["Community access (read)", true],
      [t('featureJoinCircles'), false],
      [t('featureAIAssistant'), false],
      ["Priority withdrawals", false],
    ],
  },
  {
    id: "silver",
    tier: t('silver'),
    name: t('essential'),
    icon: Award,
    monthly: 199,
    yearly: 159,
    color: "#94a3b8",
    iconClass: "bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] text-[#64748b]",
    cta: t('chooseSilver'),
    desc: "For regular savers building serious momentum with community features.",
    features: [
      [t('featureGoals'), t('upTo6')],
      [`${t('featureMinDeposit')}: ${t('min1000')}/month`, true],
      [t('featureBkash') + " + " + t('featureBankTransfer'), true],
      [`${t('featureJoinCircles')}: ${t('oneCircle')}`, true],
      ["Streak tracking + badges", true],
      ["Monthly insights report", true],
      [t('featureAIAssistant'), false],
      ["Priority withdrawals", false],
    ],
  },
  {
    id: "gold",
    tier: t('gold'),
    name: t('growth'),
    icon: Trophy,
    monthly: 499,
    yearly: 399,
    color: "#f59e0b",
    iconClass: "bg-gradient-to-br from-[#fef9c3] to-[#fde047] text-[#a16207]",
    popular: true,
    cta: t('chooseGold'),
    desc: "Our flagship plan with AI assistant, unlimited goals, and full circle access.",
    features: [
      [t('featureGoals'), t('unlimited')],
      [`${t('featureMinDeposit')}: ${t('min2000')}/month`, true],
      [t('featureBkash') + " + " + t('featureBankTransfer'), true],
      [`${t('featureJoinCircles')}: ${t('threeCircles')}`, true],
      [t('featureAIAssistant'), true],
      ["Weekly insights report", true],
      [t('featureLeaderboard'), true],
      ["Priority withdrawal (3 days)", true],
    ],
  },
  {
    id: "platinum",
    tier: t('platinum'),
    name: t('elite'),
    icon: Gem,
    monthly: 999,
    yearly: 799,
    color: "#7c3aed",
    iconClass: "bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] text-[#6d28d9]",
    cta: t('choosePlatinum'),
    desc: "For power savers who want exclusive features, dedicated support & elite status.",
    features: [
      [t('featureGoals'), t('unlimited')],
      [`${t('featureMinDeposit')}: ${t('min5000')}/month`, true],
      [t('featureBkash') + " + " + t('featureBankTransfer'), true],
      [`${t('featureJoinCircles')}: ${t('tenCircles')}`, true],
      [`${t('featureAIAssistant')}`, true],
      ["Daily personalized report", true],
      ["Priority withdrawal (24h)", true],
      [t('featureManager'), true],
    ],
  },
];

const planIcons = [Medal, Award, Trophy, Gem];
const planIconClasses = [
  "bg-gradient-to-br from-[#fef3c7] to-[#fde68a] text-[#b45309]",
  "bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] text-[#64748b]",
  "bg-gradient-to-br from-[#fef9c3] to-[#fde047] text-[#a16207]",
  "bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] text-[#6d28d9]",
];

const normalizeCmsPlan = (plan, index, t) => {
  const id = (plan.id || plan.name || `plan-${index}`).toLowerCase().replace(/\s+/g, "-");
  const monthly = Number(plan.monthly ?? plan.monthlyFee ?? plan.price ?? plan.fee) || 0;
  const yearly = Number(plan.yearly ?? plan.yearlyFee) || Math.round(monthly * 0.8);
  const min = Number(plan.min) || 0;
  const max = plan.max === null || plan.max === undefined || plan.max === "" ? null : Number(plan.max);
  const rangeText = max
    ? `Save ৳${min.toLocaleString("en-BD")} - ৳${max.toLocaleString("en-BD")}`
    : `Save ৳${min.toLocaleString("en-BD")}+`;

  return {
    id,
    tier: plan.name || `Plan ${index + 1}`,
    name: plan.title || plan.name || `Plan ${index + 1}`,
    icon: planIcons[index % planIcons.length],
    monthly,
    yearly,
    color: plan.color || "#059669",
    iconClass: plan.iconClass || planIconClasses[index % planIconClasses.length],
    popular: Boolean(plan.popular),
    cta: plan.cta || t('startFree'),
    desc: plan.description || rangeText,
    features: (plan.features || []).map((feature) =>
      Array.isArray(feature) ? feature : [feature, true],
    ),
  };
};

// Comparison groups with translations
const getComparisonGroups = (t) => [
  {
    label: t('featureGoals'),
    icon: Wallet,
    rows: [
      [t('featureGoals'), t('upTo3'), t('upTo6'), t('unlimited'), t('unlimited')],
      [t('featureMinDeposit'), t('min500'), t('min1000'), t('min2000'), t('min5000')],
      [t('featureMaxDeposit'), t('max10000'), t('max25000'), t('max100000'), t('max500000')],
      [t('featureLockPeriod'), t('months3_12'), t('months3_24'), t('months3_60'), t('custom')],
    ],
  },
  {
    label: t('featurePayments'),
    icon: CreditCard,
    rows: [
      [t('featureBkash'), true, true, true, true],
      [t('featureBankTransfer'), false, true, true, true],
      [t('featureWithdrawalTime'), t('days7_10'), t('days5_7'), t('days3'), t('hours24')],
      [t('featureEarlyWithdrawal'), false, t('withFee'), t('withFee'), t('freeOnceYear')],
    ],
  },
  {
    label: t('featureCommunity'),
    icon: Users,
    rows: [
      [t('featureJoinCircles'), false, t('oneCircle'), t('threeCircles'), t('tenCircles')],
      [t('featureCreateCircles'), false, false, t('createOne'), t('createThree')],
      [t('featureCircleAdmin'), false, false, true, true],
    ],
  },
  {
    label: t('featureAI'),
    icon: Bot,
    rows: [
      [t('featureInsightsReport'), false, t('monthly'), t('weekly'), t('daily')],
      [t('featureAIAssistant'), false, false, true, t('advanced')],
      [t('featureGoalProjections'), t('basic'), t('standard'), t('advanced'), t('advancedPlus')],
    ],
  },
  {
    label: t('featureGamification'),
    icon: Trophy,
    rows: [
      [t('featureStreakTracking'), true, true, true, true],
      [t('featureBadges'), t('fiveBadges'), t('twentyBadges'), t('allBadges'), t('allExclusive')],
      [t('featureLeaderboard'), false, t('viewOnly'), t('fullAccess'), t('featuredProfile')],
      [t('featureChallenges'), false, true, true, true],
    ],
  },
  {
    label: t('featureSecurity'),
    icon: ShieldCheck,
    rows: [
      [t('featureKYC'), t('standard'), t('standard'), t('enhanced'), t('premium')],
      [t('feature2FA'), true, true, true, true],
      [t('featureSupport'), t('email'), t('emailChat'), t('priorityChat'), t('dedicatedManager')],
      [t('featureManager'), false, false, false, true],
    ],
  },
  {
    label: t('featureIslamic'),
    icon: Moon,
    rows: [
      [t('featureRibaFree'), true, true, true, true],
      [t('featureHalalGoals'), true, true, true, true],
    ],
  },
];

// Testimonials with translations
const getTestimonials = (t) => [
  {
    quote: "Started on Bronze, upgraded to Gold after 2 months. The AI assistant showed me I was overspending ৳800/month. I redirected it to my Hajj goal and now I'm on track 6 months early!",
    name: "Rashida Begum",
    plan: `${t('gold')} Member · Dhaka`,
    avatar: "R",
    stars: 5,
  },
  {
    quote: "Platinum is worth every taka. My account manager helped me set up 4 goals at once: wedding fund, emergency savings, a laptop goal, and business startup savings.",
    name: "Kamal Hossain",
    plan: `${t('platinum')} Member · Chittagong`,
    avatar: "K",
    stars: 5,
  },
  {
    quote: "Silver is exactly what I needed. The savings circle with my cousins keeps me accountable. We're saving together for a family trip to Cox's Bazar next Eid.",
    name: "Nasrin Akter",
    plan: `${t('silver')} Member · Sylhet`,
    avatar: "N",
    stars: 4,
  },
];

// FAQs with translations
const getFaqs = (t) => [
  [t('faq1'), t('faq1Answer')],
  [t('faq2'), t('faq2Answer')],
  [t('faq3'), t('faq3Answer')],
  [t('faq4'), t('faq4Answer')],
  [t('faq5'), t('faq5Answer')],
  [t('faq6'), t('faq6Answer')],
  [t('faq7'), t('faq7Answer')],
  [t('faq8'), t('faq8Answer')],
];

const PlanPage = () => {
  const [language] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("appLanguage") || "en";
  });
  const [billingMode, setBillingMode] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("gold");
  const [deposit, setDeposit] = useState(3000);
  const [duration, setDuration] = useState(12);
  const [target, setTarget] = useState("");
  const [openFaq, setOpenFaq] = useState(null);
  const { cms } = usePublicCms();

  // Translation function
  const t = useCallback((key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  }, [language]);

  // Get dynamic data with translations
  const fallbackPlans = getPlans(t);
  const cmsPlans = useMemo(
    () => (cms?.plans || []).map((plan, index) => normalizeCmsPlan(plan, index, t)),
    [cms, t],
  );
  const plans = cmsPlans.length ? cmsPlans : fallbackPlans;
  const comparisonGroups = getComparisonGroups(t);
  const testimonials = getTestimonials(t);
  const faqs = getFaqs(t);

  const selectedPlanData = {
    label: t(selectedPlan),
    min: { bronze: 500, silver: 1000, gold: 2000, platinum: 5000 }[selectedPlan]
  };
  const totalSaved = deposit * duration;
  const targetAmount = Number(target) || 0;
  const monthsNeeded = targetAmount > 0 ? Math.ceil(targetAmount / deposit) : null;

  const goalMessage = useMemo(() => {
    if (!targetAmount) return "";
    if (totalSaved >= targetAmount) {
      return t('calcReachTarget').replace('{months}', monthsNeeded);
    }
    return t('calcNeedMonths').replace('{months}', monthsNeeded);
  }, [monthsNeeded, targetAmount, totalSaved, t]);

  const formatBDT = (value) => `৳${Number(value).toLocaleString("en-US")}`;

  const handlePlanChange = (value) => {
    const nextMin = { bronze: 500, silver: 1000, gold: 2000, platinum: 5000 }[value];
    setSelectedPlan(value);
    setDeposit((current) => Math.max(current, nextMin));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-['Inter',sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#059669] to-[#0891b2] px-6 pb-[100px] pt-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06)_0%,transparent_40%)]" />
        <div className="relative z-10 mx-auto max-w-[700px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[13px] font-semibold text-white backdrop-blur">
            <Gem className="h-4 w-4" />
            {t('heroBadge')}
          </div>
          <h1 className="mb-4 text-[clamp(32px,5vw,52px)] font-black leading-[1.1] text-white">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mb-8 max-w-[520px] text-[17px] leading-relaxed text-white/85">
            {t('heroDesc')}
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            {[
              [t('heroStat1'), t('heroStat1Label')],
              [t('heroStat2'), t('heroStat2Label')],
              [t('heroStat3'), t('heroStat3Label')],
              [t('heroStat4'), t('heroStat4Label')],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <div className="text-[28px] font-extrabold text-white">{value}</div>
                <div className="mt-0.5 text-xs text-white/75">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[60px]">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-full w-full">
            <path className="fill-white dark:fill-[#0a0f1e]" d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Plans Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[1.5px] text-[#059669]">
              {t('plansLabel')}
            </div>
            <h2 className="mb-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-tight text-[#0f172a] dark:text-[#f1f5f9]">
              {t('plansTitle')}
            </h2>
            <p className="mx-auto max-w-[560px] text-base leading-relaxed text-[#475569] dark:text-[#94a3b8]">
              {t('plansSubtitle')}
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="mb-12 flex justify-center">
            <div className="flex gap-1 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-1 dark:border-[#1e2d3d] dark:bg-[#111827]">
              {["monthly", "yearly"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setBillingMode(mode)}
                  className={`rounded-[9px] px-6 py-2 text-sm font-semibold transition ${
                    billingMode === mode
                      ? "bg-white text-[#059669] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:bg-[#1a2235] dark:text-[#10b981]"
                      : "text-[#475569] hover:text-[#059669] dark:text-[#94a3b8]"
                  }`}
                >
                  {mode === "monthly" ? t('monthly') : t('yearly')}
                  {mode === "yearly" && (
                    <span className="ml-1 text-[11px] text-[#059669]">{t('yearlySave')}</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Plan Cards */}
          <div className="mb-[60px] grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const price = billingMode === "monthly" ? plan.monthly : plan.yearly;
              return (
                <article
                  key={plan.id}
                  className={`relative cursor-pointer rounded-2xl border-2 bg-white px-7 py-8 transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10),0_24px_64px_rgba(0,0,0,0.08)] dark:bg-[#1a2235] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${
                    plan.popular
                      ? "border-[#059669] shadow-[0_0_0_1px_#059669,0_8px_24px_rgba(0,0,0,0.10),0_24px_64px_rgba(0,0,0,0.08)]"
                      : "border-[#e2e8f0] dark:border-[#1e2d3d]"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute left-1/2 top-[-14px] flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-br from-[#059669] to-[#0891b2] px-4 py-1 text-[11px] font-bold tracking-[0.5px] text-white">
                      <Star className="h-3 w-3 fill-white" />
                      {t('mostPopular')}
                    </div>
                  )}
                  <div className={`mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] ${plan.iconClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div
                    className="mb-1.5 text-[11px] font-bold uppercase tracking-[1px]"
                    style={{ color: plan.color }}
                  >
                    {plan.tier}
                  </div>
                  <h3 className="mb-2 text-[22px] font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">{plan.name}</h3>
                  {plan.popular && (
                    <div className="mb-4 rounded-lg bg-[#d1fae5] px-3 py-2 text-center text-xs font-semibold text-[#059669]">
                      {t('mostMembersChoose')}
                    </div>
                  )}
                  <div className="mb-1 flex items-baseline gap-1">
                    <span className="text-xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">৳</span>
                    <span className="text-[40px] font-black leading-none text-[#0f172a] dark:text-[#f1f5f9]">{price}</span>
                    <span className="text-sm text-[#94a3b8]">{t('perMonth')}</span>
                  </div>
                  <p className="mb-6 text-[13px] leading-normal text-[#475569] dark:text-[#94a3b8]">{plan.desc}</p>
                  <Link
                    href="/register"
                    className={`block w-full rounded-xl px-3 py-3 text-center text-sm font-bold transition ${
                      plan.id === "gold"
                        ? "bg-gradient-to-br from-[#059669] to-[#0891b2] text-white hover:opacity-90"
                        : plan.id === "platinum"
                          ? "bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white hover:opacity-90"
                          : "border-2 border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] hover:border-current dark:border-[#1e2d3d] dark:bg-[#111827]"
                    }`}
                    style={plan.id === "bronze" || plan.id === "silver" ? { color: plan.color } : undefined}
                  >
                    {plan.cta}
                  </Link>
                  <hr className="my-5 border-[#e2e8f0] dark:border-[#1e2d3d]" />
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map(([feature, enabled]) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-snug text-[#475569] dark:text-[#94a3b8]">
                        <span
                          className={`mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                            enabled === true ? "bg-[#d1fae5] text-[#059669]" : 
                            enabled === false ? "bg-[#fee2e2] text-[#ef4444]" :
                            "bg-[#d1fae5] text-[#059669]"
                          }`}
                        >
                          {enabled === true || enabled === "true" ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </span>
                        <span className={enabled === true || enabled === "true" ? "" : "text-[#94a3b8] line-through"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          {/* Islamic Mode Banner */}
          <div className="flex flex-col items-center gap-8 rounded-2xl bg-gradient-to-br from-[#065f46] to-[#047857] px-6 py-10 text-center text-white md:flex-row md:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Moon className="h-10 w-10" />
            </div>
            <div>
              <h3 className="mb-2 text-[22px] font-extrabold">{t('islamicBannerTitle')}</h3>
              <p className="text-sm leading-relaxed text-white/85">
                {t('islamicBannerDesc')}
              </p>
            </div>
            <Link
              href="/register"
              className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#065f46] transition hover:bg-[#d1fae5] md:ml-auto"
            >
              {t('islamicBannerButton')}
            </Link>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="bg-[#f8fafc] px-6 py-20 dark:bg-[#111827]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[1.5px] text-[#059669]">
              {t('compareLabel')}
            </div>
            <h2 className="mb-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-tight text-[#0f172a] dark:text-[#f1f5f9]">
              {t('compareTitle')}
            </h2>
            <p className="mx-auto max-w-[560px] text-base leading-relaxed text-[#475569] dark:text-[#94a3b8]">
              {t('compareSubtitle')}
            </p>
          </div>

          <div className="w-full overflow-x-auto rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <table className="w-full min-w-[840px] border-collapse bg-white dark:bg-[#1a2235]">
              <thead>
                <tr>
                  <th className="w-[34%] border-b-2 border-[#e2e8f0] px-6 py-5 text-left text-[13px] font-bold text-[#475569] dark:border-[#1e2d3d] dark:text-[#94a3b8]">
                    {t('compareFeature')}
                  </th>
                  {[
                    [t('bronze'), t('compareFree'), "bg-[#fef3c7] text-[#b45309]"],
                    [t('silver'), t('comparePrice').replace('{price}', '199'), "bg-[#f1f5f9] text-[#64748b]"],
                    [t('gold'), t('comparePrice').replace('{price}', '499'), "bg-[#fef9c3] text-[#a16207]"],
                    [t('platinum'), t('comparePrice').replace('{price}', '999'), "bg-[#ede9fe] text-[#6d28d9]"],
                  ].map(([name, price, className], index) => (
                    <th
                      key={name}
                      className={`border-b-2 border-[#e2e8f0] px-6 py-5 text-center text-[13px] font-bold text-[#475569] dark:border-[#1e2d3d] dark:text-[#94a3b8] ${
                        index === 2 ? "bg-[#0596690a] dark:bg-[#10b98114]" : ""
                      }`}
                    >
                      <div className="text-base font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">{name}</div>
                      <span className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${className}`}>
                        {price}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonGroups.map((group) => {
                  const Icon = group.icon;
                  return (
                    <React.Fragment key={group.label}>
                      <tr>
                        <td
                          colSpan={5}
                          className="bg-[#f8fafc] px-6 py-3 text-[11px] font-bold uppercase tracking-[1px] text-[#94a3b8] dark:bg-[#111827]"
                        >
                          <span className="inline-flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {group.label}
                          </span>
                        </td>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={`${group.label}-${row[0]}`} className="border-b border-[#e2e8f0] transition hover:bg-[#f8fafc] dark:border-[#1e2d3d] dark:hover:bg-[#111827]">
                          <td className="px-6 py-4 text-left text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9]">{row[0]}</td>
                          {row.slice(1).map((value, index) => (
                            <ValueCell key={`${row[0]}-${index}`} value={value} highlight={index === 2} />
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[1.5px] text-[#059669]">
              {t('calcLabel')}
            </div>
            <h2 className="mb-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-tight text-[#0f172a] dark:text-[#f1f5f9]">
              {t('calcTitle')}
            </h2>
            <p className="mx-auto max-w-[560px] text-base leading-relaxed text-[#475569] dark:text-[#94a3b8]">
              {t('calcSubtitle')}
            </p>
          </div>

          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-9">
              <h3 className="mb-1.5 text-[22px] font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">{t('calcConfigure')}</h3>
              <p className="mb-7 text-sm text-[#475569] dark:text-[#94a3b8]">
                {t('calcEstimate')}
              </p>

              <div className="mb-5">
                <label className="mb-2 flex justify-between text-[13px] font-semibold text-[#475569] dark:text-[#94a3b8]">
                  {t('calcPlan')} <span className="font-bold text-[#059669]">{t(selectedPlan)}</span>
                </label>
                <select
                  value={selectedPlan}
                  onChange={(event) => handlePlanChange(event.target.value)}
                  className="w-full rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#111827] dark:text-[#f1f5f9]"
                >
                  <option value="bronze">{t('bronze')} - {t('startFree')} ({t('min500')} {t('featureMinDeposit')})</option>
                  <option value="silver">{t('silver')} - ৳199/mo ({t('min1000')} {t('featureMinDeposit')})</option>
                  <option value="gold">{t('gold')} - ৳499/mo ({t('min2000')} {t('featureMinDeposit')})</option>
                  <option value="platinum">{t('platinum')} - ৳999/mo ({t('min5000')} {t('featureMinDeposit')})</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="mb-2 flex justify-between text-[13px] font-semibold text-[#475569] dark:text-[#94a3b8]">
                  {t('calcMonthlyDeposit')} <span className="font-bold text-[#059669]">{formatBDT(deposit)}</span>
                </label>
                <input
                  type="range"
                  min={selectedPlanData.min}
                  max="50000"
                  step="500"
                  value={deposit}
                  onChange={(event) => setDeposit(Number(event.target.value))}
                  className="w-full accent-[#059669]"
                />
              </div>

              <div className="mb-5">
                <label className="mb-2 flex justify-between text-[13px] font-semibold text-[#475569] dark:text-[#94a3b8]">
                  {t('calcDuration')} <span className="font-bold text-[#059669]">{duration} months</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="60"
                  step="1"
                  value={duration}
                  onChange={(event) => setDuration(Number(event.target.value))}
                  className="w-full accent-[#059669]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-[#475569] dark:text-[#94a3b8]">
                  {t('calcTarget')}
                </label>
                <input
                  type="number"
                  value={target}
                  onChange={(event) => setTarget(event.target.value)}
                  placeholder={t('calcTargetPlaceholder')}
                  className="w-full rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#111827] dark:text-[#f1f5f9]"
                />
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-gradient-to-br from-[#059669] to-[#0891b2] p-7 text-white">
                <h4 className="mb-2 text-sm text-white/85">{t('calcYouWillSave')}</h4>
                <div className="mb-5 text-[40px] font-black">{formatBDT(totalSaved)}</div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    [t('calcMonthly'), formatBDT(deposit)],
                    [t('calcDurationLabel'), `${duration} mo`],
                    [t('calcGoalReached'), monthsNeeded ? `${monthsNeeded} mo` : "-"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[10px] bg-white/15 p-3 text-center">
                      <div className="mb-1 text-[11px] text-white/80">{label}</div>
                      <div className="text-lg font-bold">{value}</div>
                    </div>
                  ))}
                </div>
                {goalMessage && <p className="mt-4 text-[13px] leading-relaxed text-white/85">{goalMessage}</p>}
                <Link
                  href="/register"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white p-3.5 text-center text-[15px] font-bold text-[#059669] transition hover:bg-[#d1fae5]"
                >
                  {t('calcStartSaving')} <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-5 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5 dark:border-[#1e2d3d] dark:bg-[#111827]">
                <p className="text-xs leading-relaxed text-[#94a3b8]">
                  <strong>{t('disclaimer')}:</strong> {t('calcDisclaimer')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-[#f8fafc] px-6 py-20 dark:bg-[#111827]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[1.5px] text-[#059669]">
              {t('testimonialLabel')}
            </div>
            <h2 className="mb-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-tight text-[#0f172a] dark:text-[#f1f5f9]">
              {t('testimonialTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((story) => (
              <article
                key={story.name}
                className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.06)] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="mb-3.5 flex gap-1 text-[#f59e0b]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={`${story.name}-${index}`}
                      className={`h-4 w-4 ${index < story.stars ? "fill-[#f59e0b]" : ""}`}
                    />
                  ))}
                </div>
                <p className="mb-5 text-sm italic leading-[1.7] text-[#475569] dark:text-[#94a3b8]">&quot;{story.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#059669] to-[#0891b2] text-base font-bold text-white">
                    {story.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0f172a] dark:text-[#f1f5f9]">{story.name}</div>
                    <div className="text-xs text-[#94a3b8]">{story.plan}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <div className="mb-3 text-[13px] font-bold uppercase tracking-[1.5px] text-[#059669]">
              {t('faqLabel')}
            </div>
            <h2 className="mb-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-tight text-[#0f172a] dark:text-[#f1f5f9]">
              {t('faqTitle')}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {faqs.map(([question, answer], index) => {
              const open = openFaq === index;
              return (
                <div key={question} className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white dark:border-[#1e2d3d] dark:bg-[#1a2235]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-3 px-6 py-5 text-left text-sm font-semibold text-[#0f172a] transition hover:bg-[#f8fafc] dark:text-[#f1f5f9] dark:hover:bg-[#111827]"
                  >
                    {question}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#94a3b8] transition ${open ? "rotate-180 text-[#059669]" : ""}`}
                    />
                  </button>
                  {open && <p className="px-6 pb-5 text-[13px] leading-[1.7] text-[#475569] dark:text-[#94a3b8]">{answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-gradient-to-br from-[#059669] to-[#0891b2] px-6 py-10 text-center md:flex-row md:px-12 md:py-16 md:text-left">
            <div>
              <h2 className="mb-2 text-[clamp(22px,3vw,34px)] font-black text-white">
                {t('ctaTitle')}
              </h2>
              <p className="text-[15px] text-white/80">
                {t('ctaDesc')}
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-bold text-[#059669] transition hover:bg-[#d1fae5]"
              >
                {t('ctaButton')} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border-2 border-white/50 px-7 py-3.5 text-[15px] font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                {t('ctaButton2')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

// Helper Components
function ValueCell({ value, highlight }) {
  if (value === true) {
    return (
      <td className={`px-4 py-4 text-center text-sm ${highlight ? "bg-[#0596690a] dark:bg-[#10b98114]" : ""}`}>
        <Check className="mx-auto h-[18px] w-[18px] text-[#059669]" strokeWidth={3} />
      </td>
    );
  }

  if (value === false) {
    return (
      <td className={`px-4 py-4 text-center text-sm ${highlight ? "bg-[#0596690a] dark:bg-[#10b98114]" : ""}`}>
        <X className="mx-auto h-[18px] w-[18px] text-[#ef4444]" strokeWidth={3} />
      </td>
    );
  }

  return (
    <td
      className={`px-4 py-4 text-center text-sm text-[#475569] ${
        highlight ? "bg-[#0596690a] font-bold text-[#0f172a] dark:bg-[#10b98114] dark:text-[#f1f5f9]" : "dark:text-[#94a3b8]"
      }`}
    >
      {value}
    </td>
  );
}

export default PlanPage;
