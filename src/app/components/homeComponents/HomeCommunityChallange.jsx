"use client";

import {
  ArrowRight,
  Bot,
  Crown,
  Flame,
  Lightbulb,
  Medal,
  Moon,
  Trophy,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Translations
const translations = {
  en: {
    // Section Header
    sectionBadge: "Community Challenges",
    sectionTitle: "Save More, ",
    sectionTitleHighlight: "Earn Badges",
    sectionDesc: "Stay motivated with savings streaks, community challenges, achievement badges, and leaderboards. Every deposit keeps your streak alive.",
    
    // Challenges
    challenge1Title: "30-Day Savings Streak",
    challenge1Desc: "Save every day for 30 days and earn a Gold Streak Badge",
    challenge1Badge: "Active",
    challenge2Title: "Ramadan Savings Challenge",
    challenge2Desc: "Special 30-day Ramadan challenge with community milestones",
    challenge2Badge: "Seasonal",
    challenge3Title: "Daily ৳100 Challenge",
    challenge3Desc: "Save just ৳100 every day — small steps, big dreams",
    challenge3Badge: "Popular",
    
    // Buttons
    btnJoinChallenge: "Join a Challenge",
    
    // Leaderboard
    leaderboardTitle: "Top Savers This Month",
    leaderboardSubtitle: "Community Leaderboard",
    leaderboard1Name: "Rahima K.",
    leaderboard1Streak: "192-day streak",
    leaderboard1Amount: "৳1,24,000",
    leaderboard2Name: "Karim A.",
    leaderboard2Streak: "145-day streak",
    leaderboard2Amount: "৳98,500",
    leaderboard3Name: "Nadia H.",
    leaderboard3Streak: "120-day streak",
    leaderboard3Amount: "৳87,000",
    
    // AI Assistant
    aiTitle: "AI Savings Assistant",
    aiBadge: "Beta",
    aiInsight1: "<strong>{name},</strong> you can complete your Hajj goal <strong>2 months earlier</strong> by saving ৳500 more per week.",
    aiInsight2: "Your savings streak reached <strong>90 days</strong>! You're in the top 5% of savers this month.",
    aiInsight3: "You saved <strong>28% more consistently</strong> this month compared to last month.",
  },
  bn: {
    // Section Header
    sectionBadge: "কমিউনিটি চ্যালেঞ্জ",
    sectionTitle: "আরও সঞ্চয় করুন, ",
    sectionTitleHighlight: "ব্যাজ অর্জন করুন",
    sectionDesc: "সঞ্চয় ধারা, কমিউনিটি চ্যালেঞ্জ, অর্জন ব্যাজ এবং লিডারবোর্ডের মাধ্যমে অনুপ্রাণিত থাকুন। প্রতিটি জমা আপনার ধারা বজায় রাখে।",
    
    // Challenges
    challenge1Title: "৩০-দিনের সঞ্চয় ধারা",
    challenge1Desc: "৩০ দিন প্রতিদিন সঞ্চয় করুন এবং একটি গোল্ড স্ট্রিক ব্যাজ অর্জন করুন",
    challenge1Badge: "সক্রিয়",
    challenge2Title: "রমজান সঞ্চয় চ্যালেঞ্জ",
    challenge2Desc: "কমিউনিটি মাইলফলক সহ বিশেষ ৩০-দিনের রমজান চ্যালেঞ্জ",
    challenge2Badge: "মৌসুমি",
    challenge3Title: "দৈনিক ৳১০০ চ্যালেঞ্জ",
    challenge3Desc: "প্রতিদিন মাত্র ৳১০০ সঞ্চয় করুন — ছোট পদক্ষেপ, বড় স্বপ্ন",
    challenge3Badge: "জনপ্রিয়",
    
    // Buttons
    btnJoinChallenge: "চ্যালেঞ্জে যোগ দিন",
    
    // Leaderboard
    leaderboardTitle: "এই মাসের শীর্ষ সঞ্চয়কারী",
    leaderboardSubtitle: "কমিউনিটি লিডারবোর্ড",
    leaderboard1Name: "রাহিমা কে.",
    leaderboard1Streak: "১৯২-দিনের ধারা",
    leaderboard1Amount: "৳১,২৪,০০০",
    leaderboard2Name: "করিম এ.",
    leaderboard2Streak: "১৪৫-দিনের ধারা",
    leaderboard2Amount: "৳৯৮,৫০০",
    leaderboard3Name: "নাদিয়া এইচ.",
    leaderboard3Streak: "১২০-দিনের ধারা",
    leaderboard3Amount: "৳৮৭,০০০",
    
    // AI Assistant
    aiTitle: "এআই সঞ্চয় সহায়ক",
    aiBadge: "বিটা",
    aiInsight1: "<strong>{name},</strong> আপনি সাপ্তাহিক ৳৫০০ বেশি সঞ্চয় করে আপনার হজ লক্ষ্য <strong>২ মাস আগে</strong> সম্পূর্ণ করতে পারেন।",
    aiInsight2: "আপনার সঞ্চয় ধারা <strong>৯০ দিনে</strong> পৌঁছেছে! আপনি এই মাসের শীর্ষ ৫% সঞ্চয়কারীদের মধ্যে আছেন।",
    aiInsight3: "আপনি গত মাসের তুলনায় এই মাসে <strong>২৮% বেশি ধারাবাহিকভাবে</strong> সঞ্চয় করেছেন।",
  }
};

const HomeCommunityChallenge = () => {
  const [language, setLanguage] = useState('en');

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Get challenges with translations
  const challenges = [
    {
      Icon: Flame,
      title: t('challenge1Title'),
      description: t('challenge1Desc'),
      badge: t('challenge1Badge'),
    },
    {
      Icon: Moon,
      title: t('challenge2Title'),
      description: t('challenge2Desc'),
      badge: t('challenge2Badge'),
    },
    {
      Icon: Wallet,
      title: t('challenge3Title'),
      description: t('challenge3Desc'),
      badge: t('challenge3Badge'),
    },
  ];

  // Get leaderboard with translations
  const leaderboard = [
    {
      Icon: Crown,
      iconColor: "#f59e0b",
      rowClass: "border-[rgba(245,158,11,0.15)] bg-[rgba(245,158,11,0.06)]",
      name: t('leaderboard1Name'),
      streak: t('leaderboard1Streak'),
      amount: t('leaderboard1Amount'),
    },
    {
      Icon: Medal,
      iconColor: "#94a3b8",
      rowClass: "border-[#e2e8f0] bg-[rgba(148,163,184,0.06)] dark:border-[#1e2d3d]",
      name: t('leaderboard2Name'),
      streak: t('leaderboard2Streak'),
      amount: t('leaderboard2Amount'),
    },
    {
      Icon: Medal,
      iconColor: "#cd7f32",
      rowClass: "border-[rgba(205,127,50,0.15)] bg-[rgba(205,127,50,0.06)]",
      name: t('leaderboard3Name'),
      streak: t('leaderboard3Streak'),
      amount: t('leaderboard3Amount'),
    },
  ];

  // Get AI insights with translations
  const insights = [
    {
      Icon: Lightbulb,
      content: t('aiInsight1').replace('{name}', 'Rahima'),
    },
    {
      Icon: Flame,
      content: t('aiInsight2'),
    },
    {
      Icon: TrendingUp,
      content: t('aiInsight3'),
    },
  ];

  return (
    <section className="bg-[#f8fafc] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#111827] dark:text-[#f1f5f9] md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left Column */}
          <div>
            <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
              {t('sectionBadge')}
            </span>

            <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
              {t('sectionTitle')}
              <span className="text-[#059669]">{t('sectionTitleHighlight')}</span>
            </h2>

            <p className="mb-7 max-w-[580px] text-base leading-[1.7] text-[#475569] dark:text-[#94a3b8]">
              {t('sectionDesc')}
            </p>

            <div className="mb-7 flex flex-col gap-3.5">
              {challenges.map(({ Icon, title, description, badge }) => (
                <div
                  key={title}
                  className="flex items-center gap-3.5 rounded-xl border border-[#e2e8f0] bg-white p-3.5 dark:border-[#1e2d3d] dark:bg-[#1a2235]"
                >
                  <Icon
                    size={28}
                    className="shrink-0 text-[#059669]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-bold">{title}</div>
                    <div className="text-[13px] leading-[1.5] text-[#475569] dark:text-[#94a3b8]">
                      {description}
                    </div>
                  </div>
                  <span className="ml-auto inline-flex shrink-0 items-center rounded-full border border-[#059669]/20 bg-[#059669]/10 px-3 py-1 text-xs font-semibold text-[#059669]">
                    {badge}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_4px_15px_rgba(5,150,105,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(5,150,105,0.45)]"
            >
              {t('btnJoinChallenge')}
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4">
            {/* Leaderboard */}
            <div className="rounded-[16px] border border-[#e2e8f0] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-base font-bold">
                  <Trophy size={20} className="text-[#059669]" aria-hidden="true" />
                  {t('leaderboardTitle')}
                </div>
                <span className="text-xs text-[#94a3b8]">{t('leaderboardSubtitle')}</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {leaderboard.map(({ Icon, iconColor, rowClass, name, streak, amount }) => (
                  <div
                    key={name}
                    className={`flex items-center gap-3 rounded-[10px] border p-2.5 ${rowClass}`}
                  >
                    <Icon
                      size={20}
                      className="shrink-0"
                      style={{ color: iconColor }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold">{name}</div>
                      <div className="text-xs text-[#94a3b8]">{streak}</div>
                    </div>
                    <div className="shrink-0 text-sm font-bold text-[#059669]">
                      {amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant */}
            <div className="rounded-[16px] border border-[#059669]/20 bg-[linear-gradient(135deg,rgba(5,150,105,0.05),rgba(59,130,246,0.05))] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:bg-[linear-gradient(135deg,rgba(5,150,105,0.08),rgba(59,130,246,0.08))] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="mb-3 flex items-center gap-2.5">
                <Bot size={24} className="text-[#059669]" aria-hidden="true" />
                <div className="font-bold">{t('aiTitle')}</div>
                <span className="inline-flex items-center rounded-full border border-[#059669]/20 bg-[#059669]/10 px-3 py-1 text-xs font-semibold text-[#059669]">
                  {t('aiBadge')}
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {insights.map(({ Icon, content }, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 rounded-[10px] border border-[#e2e8f0] bg-white px-3.5 py-2.5 text-[13px] leading-[1.6] text-[#475569] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#94a3b8]"
                  >
                    <Icon
                      size={16}
                      className="mt-0.5 shrink-0 text-[#059669]"
                      aria-hidden="true"
                    />
                    <div dangerouslySetInnerHTML={{ __html: content }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCommunityChallenge;