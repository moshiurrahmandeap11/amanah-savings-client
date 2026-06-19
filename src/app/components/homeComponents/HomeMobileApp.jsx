"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Bot,
  CalendarDays,
  Flame,
  Handshake,
  Landmark,
  Lightbulb,
  Moon,
  Smartphone,
  Star,
  Target,
  Trophy,
  Wifi,
  Zap,
} from "lucide-react";
import { useState, useEffect } from "react";

// Translations
const translations = {
  en: {
    // Section Header
    sectionBadge: "Mobile App",
    sectionTitle: "Your Savings",
    sectionTitleHighlight: "In Your Pocket",
    sectionDesc: "Manage all your savings goals, track progress, receive smart reminders, and stay connected with your savings circles — all from your phone.",

    // Features
    feature1Title: "PWA — No Install Needed",
    feature1Desc: "Add to home screen directly from your browser. Instant access, no app store required.",
    feature2Title: "Smart Payment Reminders",
    feature2Desc: "Never miss a deposit. Personalized reminders before your savings due date.",
    feature3Title: "Dark Mode + Bangla UI",
    feature3Desc: "Full Bangla language support with beautiful dark mode for comfortable nighttime use.",
    feature4Title: "Offline Access",
    feature4Desc: "View your savings goals and history even without an internet connection.",

    // Buttons
    btnAddToHome: "Add to Home Screen",
    btnAndroidAPK: "Android APK",

    // Achievements
    achievementsTitle: "Achievements",
    achievementStreak: "90-Day Streak",
    achievementSaver: "Super Saver",
    achievementReferral: "Referral Hero",
    achievementLocked: "Locked",

    // Progress
    progressTitle: "Progress",
    progressWedding: "Wedding Goal",
    progressHajj: "Hajj Fund",

    // AI Assistant
    aiTitle: "AI Assistant",
    aiMessage1: "Save ৳500 more/week to finish 2 months early!",
    aiQuestion: "How much do I need to save for Hajj?",
    aiResponse: "Hajj 2026 package avg ৳6.5 Lakh. With your current ৳10k/mo, you'll be ready in 42 months.",

    // Reminders
    remindersTitle: "Reminders",
    reminder1: "Wed deposit due in 2 days",
    reminder2: "Wedding goal: 72% complete",
  },
  bn: {
    // Section Header
    sectionBadge: "মোবাইল অ্যাপ",
    sectionTitle: "আপনার সঞ্চয়",
    sectionTitleHighlight: "আপনার পকেটে",
    sectionDesc: "আপনার সব সঞ্চয় লক্ষ্য পরিচালনা করুন, অগ্রগতি ট্র্যাক করুন, স্মার্ট রিমাইন্ডার পান এবং আপনার সঞ্চয় সার্কেলের সাথে সংযুক্ত থাকুন — সব আপনার ফোন থেকে।",

    // Features
    feature1Title: "পিডব্লিউএ — ইনস্টল করার প্রয়োজন নেই",
    feature1Desc: "ব্রাউজার থেকে সরাসরি হোম স্ক্রিনে যোগ করুন। তাত্ক্ষণিক অ্যাক্সেস, অ্যাপ স্টোরের প্রয়োজন নেই।",
    feature2Title: "স্মার্ট পেমেন্ট রিমাইন্ডার",
    feature2Desc: "কখনও জমা মিস করবেন না। আপনার সঞ্চয় নির্ধারিত তারিখের আগে ব্যক্তিগতকৃত রিমাইন্ডার।",
    feature3Title: "ডার্ক মোড + বাংলা ইউআই",
    feature3Desc: "সম্পূর্ণ বাংলা ভাষা সমর্থন সহ সুন্দর ডার্ক মোড আরামদায়ক রাতের ব্যবহারের জন্য।",
    feature4Title: "অফলাইন অ্যাক্সেস",
    feature4Desc: "ইন্টারনেট সংযোগ ছাড়াই আপনার সঞ্চয় লক্ষ্য এবং ইতিহাস দেখুন।",

    // Buttons
    btnAddToHome: "হোম স্ক্রিনে যোগ করুন",
    btnAndroidAPK: "অ্যান্ড্রয়েড এপিকে",

    // Achievements
    achievementsTitle: "অর্জন",
    achievementStreak: "৯০-দিনের ধারা",
    achievementSaver: "সুপার সেভার",
    achievementReferral: "রেফারেল হিরো",
    achievementLocked: "লক করা",

    // Progress
    progressTitle: "অগ্রগতি",
    progressWedding: "বিয়ে লক্ষ্য",
    progressHajj: "হজ তহবিল",

    // AI Assistant
    aiTitle: "এআই সহায়ক",
    aiMessage1: "২ মাস আগে শেষ করতে সাপ্তাহিক ৳৫০০ বেশি সঞ্চয় করুন!",
    aiQuestion: "হজের জন্য আমার কত টাকা সঞ্চয় করতে হবে?",
    aiResponse: "হজ ২০২৬ প্যাকেজ গড় ৳৬.৫ লাখ। আপনার বর্তমান ৳১০ক/মাসে, আপনি ৪২ মাসে প্রস্তুত হবেন।",

    // Reminders
    remindersTitle: "রিমাইন্ডার",
    reminder1: "বুধবার জমা বাকি ২ দিন",
    reminder2: "বিয়ে লক্ষ্য: ৭২% সম্পূর্ণ",
  }
};

const HomeMobileApp = () => {
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

  // Get features with translations
  const features = [
    {
      Icon: Smartphone,
      title: t('feature1Title'),
      description: t('feature1Desc'),
    },
    {
      Icon: Bell,
      title: t('feature2Title'),
      description: t('feature2Desc'),
    },
    {
      Icon: Moon,
      title: t('feature3Title'),
      description: t('feature3Desc'),
    },
    {
      Icon: Zap,
      title: t('feature4Title'),
      description: t('feature4Desc'),
    },
  ];

  // Get achievements with translations
  const achievements = [
    { Icon: Flame, label: t('achievementStreak'), locked: false },
    { Icon: Star, label: t('achievementSaver'), locked: false },
    { Icon: Handshake, label: t('achievementReferral'), locked: false },
    { Icon: Trophy, label: t('achievementLocked'), locked: true },
  ];

  return (
    <section
      id="app"
      className="bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[linear-gradient(135deg,#022c22_0%,#0c1a3a_100%)] dark:text-[#f1f5f9] md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
              {t('sectionBadge')}
            </span>

            <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
              {t('sectionTitle')}
              <br />
              <span className="text-[#059669]">{t('sectionTitleHighlight')}</span>
            </h2>

            <p className="mb-2 max-w-[580px] text-base leading-[1.7] text-[#475569] dark:text-[#94a3b8]">
              {t('sectionDesc')}
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {features.map(({ Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  viewport={{ once: true, margin: "-60px" }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#059669]/10 text-[#059669]">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-[15px] font-bold">{title}</h4>
                    <p className="text-[13px] leading-[1.5] text-[#475569] dark:text-[#94a3b8]">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#app"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-85 dark:bg-[#f1f5f9] dark:text-[#0a0f1e]"
              >
                <Smartphone size={17} aria-hidden="true" />
                {t('btnAddToHome')}
              </a>
              <a
                href="#app"
                className="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-2.5 text-sm font-semibold text-[#0f172a] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-85 dark:border-[#1e2d3d] dark:bg-[#111827] dark:text-[#f1f5f9]"
              >
                <Bot size={17} aria-hidden="true" />
                {t('btnAndroidAPK')}
              </a>
            </div>
          </motion.div>

          {/* Right Column - Phone Frames */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center justify-center gap-5 max-md:hidden"
          >
            <PhoneFrame className="-rotate-[5deg] -translate-y-2.5">
              <AchievementsScreen language={language} t={t} />
            </PhoneFrame>
            <PhoneFrame className="z-10 rotate-[5deg] translate-y-2.5">
              <AssistantScreen language={language} t={t} />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PhoneFrame = ({ children, className = "" }) => {
  return (
    <div
      className={`w-[200px] rounded-[32px] border border-[#e2e8f0] bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="mx-auto mb-2.5 h-[22px] w-20 rounded-b-xl bg-[#f8fafc] dark:bg-[#0a0f1e]" />
      <div className="h-[360px] overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] p-3 dark:bg-[linear-gradient(135deg,#022c22_0%,#0c1a3a_100%)]">
        {children}
      </div>
    </div>
  );
};

const AchievementsScreen = ({ language, t }) => {
  // Get achievements with translations
  const achievements = [
    { Icon: Flame, label: t('achievementStreak'), locked: false },
    { Icon: Star, label: t('achievementSaver'), locked: false },
    { Icon: Handshake, label: t('achievementReferral'), locked: false },
    { Icon: Trophy, label: t('achievementLocked'), locked: true },
  ];

  return (
    <div className="p-2">
      <div className="mb-3 flex items-center gap-1.5 text-xs font-bold">
        <Trophy size={14} className="text-[#059669]" aria-hidden="true" />
        {t('achievementsTitle')}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {achievements.map(({ Icon, label, locked }) => (
          <div
            key={label}
            className={
              locked
                ? "rounded-lg border border-dashed border-[#059669]/30 bg-[#059669]/5 p-2.5 text-center"
                : "rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-center dark:border-[#1e2d3d] dark:bg-[#1a2235]"
            }
          >
            <Icon
              size={22}
              className={`mx-auto ${locked ? "text-[#94a3b8] opacity-40" : "text-[#059669]"}`}
              aria-hidden="true"
            />
            <div
              className={`mt-1 text-[9px] font-bold ${locked ? "text-[#94a3b8]" : ""}`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-[#e2e8f0] bg-white p-2.5 dark:border-[#1e2d3d] dark:bg-[#1a2235]">
        <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold">
          <Target size={12} className="text-[#059669]" aria-hidden="true" />
          {t('progressTitle')}
        </div>
        <ProgressRow label={t('progressWedding')} width="72%" />
        <div className="mt-2" />
        <ProgressRow label={t('progressHajj')} width="26%" />
      </div>
    </div>
  );
};

const ProgressRow = ({ label, width }) => {
  return (
    <>
      <div className="mb-1 text-[9px] text-[#94a3b8]">{label}</div>
      <div className="h-1 rounded-sm bg-[#e2e8f0] dark:bg-[#1e2d3d]">
        <div
          className="h-full rounded-sm bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)]"
          style={{ width }}
        />
      </div>
    </>
  );
};

const AssistantScreen = ({ language, t }) => {
  return (
    <div className="p-2">
      <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold">
        <Bot size={14} className="text-[#059669]" aria-hidden="true" />
        {t('aiTitle')}
      </div>

      <div className="flex flex-col gap-2">
        <div className="rounded-[10px_10px_10px_2px] border border-[#e2e8f0] bg-white p-2 text-[9px] leading-[1.4] text-[#475569] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#94a3b8]">
          <Lightbulb size={11} className="mr-1 inline text-[#059669]" aria-hidden="true" />
          {t('aiMessage1')}
        </div>
        <div className="rounded-[10px_10px_2px_10px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] p-2 text-right text-[9px] leading-[1.4] text-white">
          {t('aiQuestion')}
        </div>
        <div className="rounded-[10px_10px_10px_2px] border border-[#e2e8f0] bg-white p-2 text-[9px] leading-[1.4] text-[#475569] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#94a3b8]">
          <Landmark size={11} className="mr-1 inline text-[#059669]" aria-hidden="true" />
          {t('aiResponse')}
        </div>
      </div>

      <div className="mt-2.5 rounded-lg border border-[#e2e8f0] bg-white p-2 dark:border-[#1e2d3d] dark:bg-[#1a2235]">
        <div className="mb-1.5 flex items-center gap-1.5 text-[9px] font-bold">
          <Bell size={11} className="text-[#059669]" aria-hidden="true" />
          {t('remindersTitle')}
        </div>
        <div className="flex items-center gap-1 border-b border-[#e2e8f0] py-1 text-[8px] text-[#94a3b8] dark:border-[#1e2d3d]">
          <CalendarDays size={9} aria-hidden="true" />
          {t('reminder1')}
        </div>
        <div className="flex items-center gap-1 py-1 text-[8px] text-[#94a3b8]">
          <Target size={9} aria-hidden="true" />
          {t('reminder2')}
        </div>
      </div>
    </div>
  );
};

export default HomeMobileApp;