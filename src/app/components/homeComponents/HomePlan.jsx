"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Award,
  Check,
  Crown,
  Gem,
  Medal,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

// Translations
const translations = {
  en: {
    // Section Header
    sectionBadge: "Savings Plans",
    sectionTitle: "Choose Your ",
    sectionTitleHighlight: "Savings Tier",
    sectionDesc: "Start small or save big — flexible plans for every income level. All plans are locked until maturity.",
    
    // Disclaimer
    disclaimer: "All savings are member-owned and locked until goal maturity. Amanah is a savings community, not a bank or investment firm.",
    
    // Plan Names
    planBronze: "Bronze",
    planSilver: "Silver",
    planGold: "Gold",
    planPlatinum: "Platinum",
    
    // Plan Ranges
    bronzeRange: "৳500 – ৳2,000",
    silverRange: "৳2,000 – ৳10,000",
    goldRange: "৳10,000 – ৳50,000",
    platinumRange: "৳50,000+",
    
    // Plan Period
    perMonth: "/ month",
    
    // Plan Descriptions
    bronzeDesc: "Perfect for students and beginners starting their savings journey",
    silverDesc: "Ideal for young professionals building multiple goals simultaneously",
    goldDesc: "For families and serious savers with big goals and community leadership",
    platinumDesc: "Premium tier for high-discipline savers and community circle leaders",
    
    // Bronze Features
    bronzeFeature1: "Monthly savings deposit",
    bronzeFeature2: "1 active savings goal",
    bronzeFeature3: "Basic progress tracking",
    bronzeFeature4: "Community badge",
    bronzeFeature5: "Mobile notifications",
    
    // Silver Features
    silverFeature1: "Weekly or monthly deposits",
    silverFeature2: "Up to 3 active goals",
    silverFeature3: "Advanced analytics",
    silverFeature4: "AI savings insights",
    silverFeature5: "Priority support",
    
    // Gold Features
    goldFeature1: "Flexible weekly deposits",
    goldFeature2: "Up to 5 active goals",
    goldFeature3: "Family savings mode",
    goldFeature4: "Leaderboard access",
    goldFeature5: "Referral rewards",
    goldFeature6: "Early goal refresh",
    
    // Platinum Features
    platinumFeature1: "Unlimited active goals",
    platinumFeature2: "Circle leadership role",
    platinumFeature3: "Dedicated account manager",
    platinumFeature4: "Custom savings vault",
    platinumFeature5: "VIP community access",
    platinumFeature6: "Early maturity options",
    
    // Badges
    mostPopular: "Most Popular",
    
    // Buttons
    getStarted: "Get Started",
  },
  bn: {
    // Section Header
    sectionBadge: "সঞ্চয় প্ল্যান",
    sectionTitle: "আপনার ",
    sectionTitleHighlight: "সঞ্চয় টিয়ার বেছে নিন",
    sectionDesc: "ছোট শুরু করুন বা বড় সঞ্চয় করুন — প্রতিটি আয় স্তরের জন্য নমনীয় প্ল্যান। সব প্ল্যান পরিপক্কতা পর্যন্ত লক থাকে।",
    
    // Disclaimer
    disclaimer: "সব সঞ্চয় সদস্য-মালিকানাধীন এবং লক্ষ্য পরিপক্কতা পর্যন্ত লক থাকে। আমানাহ একটি সঞ্চয় সম্প্রদায়, ব্যাংক বা বিনিয়োগ ফার্ম নয়।",
    
    // Plan Names
    planBronze: "ব্রোঞ্জ",
    planSilver: "সিলভার",
    planGold: "গোল্ড",
    planPlatinum: "প্লাটিনাম",
    
    // Plan Ranges
    bronzeRange: "৳৫০০ – ৳২,০০০",
    silverRange: "৳২,০০০ – ৳১০,০০০",
    goldRange: "৳১০,০০০ – ৳৫০,০০০",
    platinumRange: "৳৫০,০০০+",
    
    // Plan Period
    perMonth: "/ মাস",
    
    // Plan Descriptions
    bronzeDesc: "ছাত্র এবং শিক্ষানবিসদের জন্য তাদের সঞ্চয় যাত্রা শুরু করার জন্য উপযুক্ত",
    silverDesc: "তরুণ পেশাদারদের জন্য যারা একই সাথে একাধিক লক্ষ্য তৈরি করছেন তাদের জন্য আদর্শ",
    goldDesc: "পরিবার এবং গুরুতর সঞ্চয়কারীদের জন্য যাদের বড় লক্ষ্য এবং কমিউনিটি নেতৃত্ব রয়েছে",
    platinumDesc: "উচ্চ-শৃঙ্খলাবদ্ধ সঞ্চয়কারী এবং কমিউনিটি সার্কেল নেতাদের জন্য প্রিমিয়াম টিয়ার",
    
    // Bronze Features
    bronzeFeature1: "মাসিক সঞ্চয় জমা",
    bronzeFeature2: "১টি সক্রিয় সঞ্চয় লক্ষ্য",
    bronzeFeature3: "মৌলিক অগ্রগতি ট্র্যাকিং",
    bronzeFeature4: "কমিউনিটি ব্যাজ",
    bronzeFeature5: "মোবাইল নোটিফিকেশন",
    
    // Silver Features
    silverFeature1: "সাপ্তাহিক বা মাসিক জমা",
    silverFeature2: "৩টি পর্যন্ত সক্রিয় লক্ষ্য",
    silverFeature3: "উন্নত বিশ্লেষণ",
    silverFeature4: "এআই সঞ্চয় অন্তর্দৃষ্টি",
    silverFeature5: "প্রায়োরিটি সাপোর্ট",
    
    // Gold Features
    goldFeature1: "নমনীয় সাপ্তাহিক জমা",
    goldFeature2: "৫টি পর্যন্ত সক্রিয় লক্ষ্য",
    goldFeature3: "পরিবার সঞ্চয় মোড",
    goldFeature4: "লিডারবোর্ড অ্যাক্সেস",
    goldFeature5: "রেফারেল পুরস্কার",
    goldFeature6: "আগাম লক্ষ্য রিফ্রেশ",
    
    // Platinum Features
    platinumFeature1: "আনলিমিটেড সক্রিয় লক্ষ্য",
    platinumFeature2: "সার্কেল নেতৃত্বের ভূমিকা",
    platinumFeature3: "ডেডিকেটেড অ্যাকাউন্ট ম্যানেজার",
    platinumFeature4: "কাস্টম সঞ্চয় ভল্ট",
    platinumFeature5: "ভিআইপি কমিউনিটি অ্যাক্সেস",
    platinumFeature6: "আগাম পরিপক্কতার বিকল্প",
    
    // Badges
    mostPopular: "সবচেয়ে জনপ্রিয়",
    
    // Buttons
    getStarted: "শুরু করুন",
  }
};

const SavingsPlanSection = () => {
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

  // Get plans with translations
  const plans = [
    {
      name: t('planBronze'),
      Icon: Medal,
      range: t('bronzeRange'),
      period: t('perMonth'),
      description: t('bronzeDesc'),
      features: [
        t('bronzeFeature1'),
        t('bronzeFeature2'),
        t('bronzeFeature3'),
        t('bronzeFeature4'),
        t('bronzeFeature5'),
      ],
      accent: "linear-gradient(90deg, #cd7f32, #e8a96a)",
      iconColor: "#cd7f32",
      button: "outline",
    },
    {
      name: t('planSilver'),
      Icon: Award,
      range: t('silverRange'),
      period: t('perMonth'),
      description: t('silverDesc'),
      features: [
        t('silverFeature1'),
        t('silverFeature2'),
        t('silverFeature3'),
        t('silverFeature4'),
        t('silverFeature5'),
      ],
      accent: "linear-gradient(90deg, #94a3b8, #cbd5e1)",
      iconColor: "#94a3b8",
      button: "outline",
    },
    {
      name: t('planGold'),
      Icon: Crown,
      range: t('goldRange'),
      period: t('perMonth'),
      description: t('goldDesc'),
      features: [
        t('goldFeature1'),
        t('goldFeature2'),
        t('goldFeature3'),
        t('goldFeature4'),
        t('goldFeature5'),
        t('goldFeature6'),
      ],
      accent: "linear-gradient(90deg, #f59e0b, #fcd34d)",
      iconColor: "#f59e0b",
      popular: true,
      button: "primary",
    },
    {
      name: t('planPlatinum'),
      Icon: Gem,
      range: t('platinumRange'),
      period: t('perMonth'),
      description: t('platinumDesc'),
      features: [
        t('platinumFeature1'),
        t('platinumFeature2'),
        t('platinumFeature3'),
        t('platinumFeature4'),
        t('platinumFeature5'),
        t('platinumFeature6'),
      ],
      accent: "linear-gradient(135deg, #059669 0%, #0891b2 100%)",
      iconColor: "#059669",
      button: "primary",
    },
  ];

  return (
    <section
      id="plans"
      className="bg-[#f8fafc] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#111827] dark:text-[#f1f5f9] md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
          {t('sectionBadge')}
        </span>

        <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
          {t('sectionTitle')}
          <span className="text-[#059669]">{t('sectionTitleHighlight')}</span>
        </h2>

        <p className="mx-auto max-w-[580px] text-lg leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
          {t('sectionDesc')}
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} language={language} t={t} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-6 flex max-w-3xl items-start justify-center gap-2 text-[13px] leading-[1.6] text-[#94a3b8]"
        >
          <AlertTriangle
            size={15}
            className="mt-0.5 shrink-0 text-[#f59e0b]"
            aria-hidden="true"
          />
          <span>
            {t('disclaimer')}
          </span>
        </motion.p>
      </div>
    </section>
  );
};

const PlanCard = ({ plan, index, language, t }) => {
  const { Icon } = plan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      className={`group relative overflow-hidden rounded-[20px] bg-white px-5 py-7 text-center shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:bg-[#1a2235] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${
        plan.popular
          ? "scale-[1.03] border-2 border-[#059669] max-lg:scale-100"
          : "border border-[#e2e8f0] dark:border-[#1e2d3d]"
      }`}
    >
      <div
        className="absolute left-0 right-0 top-0 h-1"
        style={{ background: plan.accent }}
      />

      {plan.popular && (
        <div className="absolute right-3.5 top-4 rounded-[10px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] px-2.5 py-[3px] text-[10px] font-bold text-white">
          {t('mostPopular')}
        </div>
      )}

      <Icon
        size={36}
        strokeWidth={1.9}
        className="mx-auto mb-3"
        style={{ color: plan.iconColor }}
        aria-hidden="true"
      />

      <h3 className="mb-1 text-lg font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">
        {plan.name}
      </h3>

      <div className="mb-2 text-[22px] font-black leading-tight text-[#059669]">
        {plan.range}{" "}
        <span className="text-[13px] font-medium text-[#94a3b8]">
          {plan.period}
        </span>
      </div>

      <p className="mb-4 text-[13px] leading-[1.5] text-[#475569] dark:text-[#94a3b8]">
        {plan.description}
      </p>

      <ul className="mb-5 space-y-0 text-left">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 py-[5px] text-[13px] text-[#475569] dark:text-[#94a3b8]"
          >
            <Check
              size={14}
              strokeWidth={3}
              className="shrink-0 text-[#059669]"
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/register"
        className={
          plan.button === "primary"
            ? "inline-flex w-full items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_4px_15px_rgba(5,150,105,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(5,150,105,0.45)]"
            : "inline-flex w-full items-center justify-center rounded-[10px] border border-[#e2e8f0] bg-transparent px-6 py-3 text-[15px] font-semibold text-[#0f172a] transition-all duration-200 hover:border-[#059669] hover:bg-[#059669]/5 hover:text-[#059669] dark:border-[#1e2d3d] dark:text-[#f1f5f9]"
        }
      >
        {t('getStarted')}
      </Link>
    </motion.div>
  );
};

export default SavingsPlanSection;