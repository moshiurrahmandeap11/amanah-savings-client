"use client";

import { motion } from "framer-motion";
import {
  Bike,
  CircleCheck,
  Flame,
  Gem,
  GraduationCap,
  Landmark,
  Play,
  Rocket,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Translations
const translations = {
  en: {
    // Hero Badge
    heroBadge: "Bangladesh's #1 Digital Savings Community",
    
    // Hero Title
    heroTitle1: "Save Together.",
    heroTitle2: "Achieve Goals.",
    heroTitle3: "Build Your Future.",
    
    // Hero Description
    heroDesc: "Join thousands of members saving money together in secure, goal-based savings circles. No bank, no gimmicks — just disciplined community savings for real goals.",
    
    // Buttons
    btnStartSaving: "Start Saving Free",
    btnSeeHow: "See How It Works",
    
    // Stats
    statMembers: "Active Members",
    statSavings: "Total Savings",
    statCompletion: "Goal Completion",
    
    // Floating Cards
    cardWeddingGoal: "Wedding Goal",
    cardSavingsStreak: "Savings Streak",
    cardPaymentConfirmed: "Payment confirmed",
    cardDeposited: "deposited",
    
    // Phone Mockup
    mockupGreeting: "Good Morning,",
    mockupBalance: "Total Savings Balance",
    mockupGoal: "Goal",
    
    // Goal Titles
    goalWedding: "Wedding",
    goalHajj: "Hajj",
    goalEducation: "Education",
    goalBike: "Bike",
  },
  bn: {
    // Hero Badge
    heroBadge: "বাংলাদেশের #১ ডিজিটাল সঞ্চয় কমিউনিটি",
    
    // Hero Title
    heroTitle1: "একসাথে সঞ্চয় করুন।",
    heroTitle2: "লক্ষ্য অর্জন করুন।",
    heroTitle3: "আপনার ভবিষ্যত গড়ুন।",
    
    // Hero Description
    heroDesc: "হাজার হাজার সদস্যের সাথে নিরাপদ, লক্ষ্য-ভিত্তিক সঞ্চয় সার্কেলে একসাথে টাকা সঞ্চয় করুন। কোন ব্যাংক নয়, কোন গিমিক নয় — শুধু বাস্তব লক্ষ্যের জন্য সুশৃঙ্খল কমিউনিটি সঞ্চয়।",
    
    // Buttons
    btnStartSaving: "বিনামূল্যে সঞ্চয় শুরু করুন",
    btnSeeHow: "কীভাবে কাজ করে দেখুন",
    
    // Stats
    statMembers: "সক্রিয় সদস্য",
    statSavings: "মোট সঞ্চয়",
    statCompletion: "লক্ষ্য সম্পূর্ণ",
    
    // Floating Cards
    cardWeddingGoal: "বিয়ে লক্ষ্য",
    cardSavingsStreak: "সঞ্চয় ধারা",
    cardPaymentConfirmed: "পেমেন্ট নিশ্চিত হয়েছে",
    cardDeposited: "জমা হয়েছে",
    
    // Phone Mockup
    mockupGreeting: "শুভ সকাল,",
    mockupBalance: "মোট সঞ্চয় ব্যালেন্স",
    mockupGoal: "লক্ষ্য",
    
    // Goal Titles
    goalWedding: "বিয়ে",
    goalHajj: "হজ",
    goalEducation: "শিক্ষা",
    goalBike: "বাইক",
  }
};

const Banner = () => {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return 'en';
    return localStorage.getItem('appLanguage') || 'en';
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (typeof window === 'undefined') return false;
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    return !!(token && user);
  });

  // Listen for storage changes (login/logout in other tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      setIsLoggedIn(!!(token && user));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Stats with translations
  const stats = [
    { value: "12,400+", label: t('statMembers') },
    { value: "৳4,800Cr+", label: t('statSavings') },
    { value: "98%", label: t('statCompletion') },
  ];

  // Goals with translations
  const goals = [
    { icon: Gem, title: t('goalWedding'), amount: "৳1,80k", progress: 72 },
    { icon: Landmark, title: t('goalHajj'), amount: "৳65k", progress: 26 },
    { icon: GraduationCap, title: t('goalEducation'), amount: "৳50k", progress: 50 },
    { icon: Bike, title: t('goalBike'), amount: "৳30k", progress: 60 },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] px-0 py-20 pt-35 dark:bg-[linear-gradient(135deg,#022c22_0%,#0c1a3a_100%)]"
    >
      <style jsx>{`
        @keyframes heroFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes floatCard {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes heroPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.5);
          }
        }

        .hero-orb {
          animation: heroFloat 8s ease-in-out infinite;
        }

        .phone-mockup {
          animation: floatCard 6s ease-in-out infinite;
        }

        .float-card-1 {
          animation: floatCard 7s ease-in-out infinite;
        }

        .float-card-2 {
          animation: floatCard 5s ease-in-out infinite reverse;
        }

        .float-card-3 {
          animation: floatCard 6s ease-in-out infinite 2s;
        }

        .hero-label-dot {
          animation: heroPulse 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .hero-orb,
          .float-card-1,
          .float-card-3 {
            display: none;
          }
        }
      `}</style>

      <div className="hero-orb absolute -right-25 -top-25 z-0 h-125 w-125 rounded-full bg-[radial-gradient(circle,#059669_0%,transparent_70%)] opacity-40 blur-[80px]" />
      <div className="hero-orb absolute -bottom-12 -left-20 z-0 h-100 w-100 rounded-full bg-[radial-gradient(circle,#3b82f6_0%,transparent_70%)] opacity-40 blur-[80px] [animation-delay:-4s]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[13px] font-semibold text-primary">
              <span className="hero-label-dot h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{t('heroBadge')}</span>
            </div>

            <h1 className="mb-6 text-[36px] font-black leading-[1.1] tracking-normal text-foreground max-[480px]:text-[30px] md:text-[clamp(36px,5vw,60px)]">
              {t('heroTitle1')}
              <br />
              <span className="bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] bg-clip-text text-transparent">
                {t('heroTitle2')}
              </span>
              <br />
              {t('heroTitle3')}
            </h1>

            <p className="mx-auto mb-9 max-w-[520px] text-lg leading-[1.7] text-slate-600 dark:text-slate-400 md:mx-0">
              {t('heroDesc')}
            </p>

            <div className="mb-12 flex flex-wrap justify-center gap-3.5 md:justify-start">
              <Link
                href={isLoggedIn ? "/dashboard/goals" : "/dashboard"}
                className="inline-flex items-center gap-2 rounded-[14px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] px-8 py-4 text-base font-semibold text-white shadow-[0_4px_15px_rgba(5,150,105,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(5,150,105,0.45)]"
              >
                <Rocket size={18} aria-hidden="true" />
                {t('btnStartSaving')}
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-[14px] border border-border bg-transparent px-8 py-4 text-base font-semibold text-foreground transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                <Play size={18} aria-hidden="true" />
                {t('btnSeeHow')}
              </Link>
            </div>

            <div className="flex justify-center gap-8 md:justify-start max-[480px]:w-full max-[480px]:justify-between max-[480px]:gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="max-[480px]:min-w-0 max-[480px]:flex-1">
                  <div className="text-[26px] font-extrabold text-foreground max-[480px]:whitespace-nowrap max-[480px]:text-xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[13px] text-slate-400 max-[480px]:text-[11px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto flex justify-center md:mx-0"
          >
            {/* Floating Card 1 - Wedding Goal */}
            <div className="float-card-1 absolute left-[-70px] top-[30px] z-30 rounded-[14px] border border-border bg-card px-4 py-3 text-[13px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-md dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Target className="mb-1 text-primary" size={20} aria-hidden="true" />
              <div className="text-[10px] text-slate-400">{t('cardWeddingGoal')}</div>
              <div className="text-sm font-bold text-primary">৳1,80,000</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-[10px] bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                74% done
              </div>
            </div>

            {/* Floating Card 2 - Savings Streak */}
            <div className="float-card-2 absolute bottom-[60px] right-[-60px] z-30 rounded-[14px] border border-border bg-card px-4 py-3 text-[13px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-md max-md:right-[-10px] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Flame className="mb-1 text-primary" size={20} aria-hidden="true" />
              <div className="text-[10px] text-slate-400">{t('cardSavingsStreak')}</div>
              <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                90 Days
                <Trophy size={14} className="text-primary" aria-hidden="true" />
              </div>
            </div>

            {/* Floating Card 3 - Payment Confirmed */}
            <div className="float-card-3 absolute right-[-50px] top-40 z-30 rounded-[14px] border border-border bg-card px-4 py-3 text-[13px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-md dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5">
                <CircleCheck size={18} className="text-primary" aria-hidden="true" />
                <div>
                  <div className="text-[10px] text-slate-400">{t('cardPaymentConfirmed')}</div>
                  <div className="text-xs font-bold text-foreground">৳5,000 {t('cardDeposited')}</div>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="phone-mockup relative z-20 w-[280px] rounded-[36px] border border-border bg-card p-4 shadow-[0_40px_100px_rgba(0,0,0,0.15)] max-[480px]:w-[240px]">
              <div className="mx-auto mb-4 h-[22px] w-20 rounded-b-xl bg-background" />
              <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] p-4 dark:bg-[linear-gradient(135deg,#022c22_0%,#0c1a3a_100%)]">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    <span>{t('mockupGreeting')}</span>
                    <strong className="flex items-center gap-1 text-[13px] font-bold text-foreground">
                      Fatema Akter
                      <Sparkles size={12} className="text-primary" aria-hidden="true" />
                    </strong>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] text-sm font-semibold text-white">
                    F
                  </div>
                </div>

                {/* Balance Card */}
                <div className="mb-3 rounded-2xl bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] p-4 text-white">
                  <div className="mb-1 text-[10px] opacity-80">{t('mockupBalance')}</div>
                  <div className="text-[22px] font-extrabold">৳ 2,45,500</div>
                  <div className="mt-2.5 flex items-center justify-between text-[10px]">
                    <span>{t('mockupGoal')}: ৳5,00,000</span>
                    <span>49%</span>
                  </div>
                  <div className="mt-1.5 h-1 rounded-sm bg-white/25">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "49%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-sm bg-white"
                    />
                  </div>
                </div>

                {/* Goals Grid */}
                <div className="grid grid-cols-2 gap-2">
                  {goals.map((goal, index) => (
                    <GoalTile
                      key={goal.title}
                      goal={goal}
                      index={index}
                      language={language}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const GoalTile = ({ goal, index, language }) => {
  const Icon = goal.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 * index }}
      className="rounded-[10px] border border-border bg-card p-2.5"
    >
      <Icon className="mb-1 text-primary" size={18} aria-hidden="true" />
      <div className="text-[9px] font-medium text-slate-600 dark:text-slate-400">
        {goal.title}
      </div>
      <div className="text-[11px] font-bold text-foreground">{goal.amount}</div>
      <div className="mt-1 h-[3px] rounded-sm bg-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${goal.progress}%` }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.1 }}
          className="h-full rounded-sm bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)]"
        />
      </div>
    </motion.div>
  );
};

export default Banner;