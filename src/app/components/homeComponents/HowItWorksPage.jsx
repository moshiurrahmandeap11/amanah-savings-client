"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  FilePenLine,
  IdCard,
  Target,
  Trophy,
} from "lucide-react";
import { useState, useEffect } from "react";

// Translations
const translations = {
  en: {
    // Hero Section
    heroBadge: "Simple Process",
    heroTitle: "How ",
    heroTitleHighlight: "Sanchoy Bondhu",
    heroTitleEnd: " Works",
    heroDesc: "Five simple steps to start your savings journey with community discipline and digital security.",

    // Steps
    step1Title: "1. Register",
    step1Desc: "Create your account with phone or email in under 2 minutes",
    step2Title: "2. Verify",
    step2Desc: "Complete NID & phone verification for maximum security",
    step3Title: "3. Choose Goal",
    step3Desc: "Pick a savings goal or join an active community circle",
    step4Title: "4. Deposit",
    step4Desc: "Send weekly or monthly via bKash, Nagad, or bank transfer",
    step5Title: "5. Complete",
    step5Desc: "Reach your goal maturity and withdraw your full savings",

    // Stats
    stat1Value: "12,400+",
    stat1Label: "Verified member",
    stat2Value: "৳48 Cr+",
    stat2Label: "Community savings",
    stat3Value: "1,240+",
    stat3Label: "Active circle",
    stat4Value: "98%",
    stat4Label: "Completion rate",
  },
  bn: {
    // Hero Section
    heroBadge: "সহজ প্রক্রিয়া",
    heroTitle: "",
    heroTitleHighlight: "সঞ্চয় বন্ধু",
    heroTitleEnd: " কীভাবে কাজ করে",
    heroDesc: "কমিউনিটি শৃঙ্খলা এবং ডিজিটাল নিরাপত্তার সাথে আপনার সঞ্চয় যাত্রা শুরু করতে পাঁচটি সহজ ধাপ।",

    // Steps
    step1Title: "১. নিবন্ধন",
    step1Desc: "২ মিনিটের মধ্যে ফোন বা ইমেইলের মাধ্যমে আপনার অ্যাকাউন্ট তৈরি করুন",
    step2Title: "২. যাচাইকরণ",
    step2Desc: "সর্বোচ্চ নিরাপত্তার জন্য এনআইডি ও ফোন যাচাইকরণ সম্পূর্ণ করুন",
    step3Title: "৩. লক্ষ্য নির্বাচন",
    step3Desc: "একটি সঞ্চয় লক্ষ্য বেছে নিন বা একটি সক্রিয় কমিউনিটি সার্কেলে যোগ দিন",
    step4Title: "৪. জমা",
    step4Desc: "বিকাশ, নগদ বা ব্যাংক ট্রান্সফারের মাধ্যমে সাপ্তাহিক বা মাসিক পাঠান",
    step5Title: "৫. সম্পূর্ণ",
    step5Desc: "আপনার লক্ষ্য পরিপক্কতায় পৌঁছান এবং আপনার সম্পূর্ণ সঞ্চয় উত্তোলন করুন",

    // Stats
    stat1Value: "১২,৪০০+",
    stat1Label: "যাচাইকৃত সদস্য",
    stat2Value: "৳৪৮ কোটি+",
    stat2Label: "কমিউনিটি সঞ্চয়",
    stat3Value: "১,২৪০+",
    stat3Label: "সক্রিয় সার্কেল",
    stat4Value: "৯৮%",
    stat4Label: "সম্পূর্ণতার হার",
  }
};

const HowItWorksPage = () => {
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

  // Get steps with translations
  const steps = [
    {
      id: 1,
      Icon: FilePenLine,
      title: t('step1Title'),
      description: t('step1Desc'),
    },
    {
      id: 2,
      Icon: IdCard,
      title: t('step2Title'),
      description: t('step2Desc'),
    },
    {
      id: 3,
      Icon: Target,
      title: t('step3Title'),
      description: t('step3Desc'),
    },
    {
      id: 4,
      Icon: CreditCard,
      title: t('step4Title'),
      description: t('step4Desc'),
    },
    {
      id: 5,
      Icon: Trophy,
      title: t('step5Title'),
      description: t('step5Desc'),
    },
  ];

  // Stats with translations
  const stats = [
    { value: t('stat1Value'), label: t('stat1Label') },
    { value: t('stat2Value'), label: t('stat2Label') },
    { value: t('stat3Value'), label: t('stat3Label') },
    { value: t('stat4Value'), label: t('stat4Label') },
  ];

  return (
    <>
      <section
        id="how-it-works"
        className="bg-white py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9] md:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
            {t('heroBadge')}
          </span>

          <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
            {t('heroTitle')}
            <span className="text-[#059669]">{t('heroTitleHighlight')}</span>
            {t('heroTitleEnd')}
          </h2>

          <p className="mx-auto max-w-[580px] text-lg leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
            {t('heroDesc')}
          </p>

          <div className="relative mt-14 flex items-start justify-between gap-4 max-md:flex-col max-md:items-center max-md:gap-6">
            <div className="absolute left-[10%] right-[10%] top-7 z-0 h-0.5 bg-[linear-gradient(90deg,#059669,#3b82f6)] opacity-30 max-md:hidden" />

            {steps.map((step, index) => (
              <StepItem key={step.id} step={step} index={index} language={language} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-6 text-center md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="text-[34px] font-black leading-none tracking-normal sm:text-[42px]">
                {stat.value}
              </div>
              <div className="mt-4 text-sm leading-none text-white/80 sm:text-[14px]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

const StepItem = ({ step, index, language }) => {
  const { Icon } = step;

  // Check if language is Bangla for RTL support
  const isBangla = language === 'bn';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group relative z-10 flex-1 text-center max-md:w-full max-md:max-w-[320px]"
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] text-white shadow-[0_8px_24px_rgba(5,150,105,0.3)] transition-transform duration-300 group-hover:scale-110">
        <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
      </div>

      <h3 className={`mb-2 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9] ${isBangla ? 'font-noto' : ''}`}>
        {step.title}
      </h3>

      <p className={`text-[13px] leading-[1.5] text-[#475569] dark:text-[#94a3b8] ${isBangla ? 'font-noto' : ''}`}>
        {step.description}
      </p>
    </motion.div>
  );
};

export default HowItWorksPage;