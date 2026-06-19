"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Fingerprint,
  Lock,
  ScanFace,
  Smartphone,
  Vault,
} from "lucide-react";
import { useState, useEffect } from "react";

// Translations
const translations = {
  en: {
    // Section Header
    sectionBadge: "Security & Trust",
    sectionTitle: "Your Savings Are ",
    sectionTitleHighlight: "Safe With Us",
    sectionDesc: "We built Amanah with security at its core. Multiple layers of protection keep your money and identity secure.",

    // Security Items
    item1Title: "NID + Selfie Verification",
    item1Desc: "Every member is verified with their National ID card and live selfie before activating savings. No anonymous accounts.",
    
    item2Title: "256-bit SSL Encryption",
    item2Desc: "All data transmitted and stored is encrypted with bank-grade 256-bit AES encryption. Your data never leaves secured servers.",
    
    item3Title: "2-Factor Authentication",
    item3Desc: "Enable 2FA for an extra layer of account security. OTP via SMS + authenticator app support for maximum protection.",
    
    item4Title: "Fraud Detection AI",
    item4Desc: "Our AI monitors for suspicious activity, multi-account creation, and unusual login patterns — protecting the whole community.",
    
    item5Title: "Locked Savings Vault",
    item5Desc: "Savings are locked until goal maturity. Early withdrawals require admin review and are strictly restricted to prevent impulsive spending.",
    
    item6Title: "Full Transparency Ledger",
    item6Desc: "Every deposit, transaction, and movement is logged and viewable in your personal ledger. Complete transparency, zero hidden actions.",
  },
  bn: {
    // Section Header
    sectionBadge: "নিরাপত্তা ও বিশ্বাস",
    sectionTitle: "আপনার সঞ্চয় ",
    sectionTitleHighlight: "আমাদের সাথে নিরাপদ",
    sectionDesc: "আমরা নিরাপত্তাকে কেন্দ্র করে আমানাহ তৈরি করেছি। প্রতিরক্ষার একাধিক স্তর আপনার অর্থ এবং পরিচয় সুরক্ষিত রাখে।",

    // Security Items
    item1Title: "এনআইডি + সেলফি যাচাইকরণ",
    item1Desc: "সঞ্চয় সক্রিয় করার আগে প্রতিটি সদস্যকে তাদের জাতীয় পরিচয়পত্র এবং লাইভ সেলফি দিয়ে যাচাই করা হয়। কোন বেনামী অ্যাকাউন্ট নেই।",
    
    item2Title: "২৫৬-বিট এসএসএল এনক্রিপশন",
    item2Desc: "সমস্ত প্রেরিত এবং সংরক্ষিত ডেটা ব্যাংক-গ্রেড ২৫৬-বিট AES এনক্রিপশন দিয়ে এনক্রিপ্ট করা হয়। আপনার ডেটা কখনও সুরক্ষিত সার্ভার ছেড়ে যায় না।",
    
    item3Title: "২-ফ্যাক্টর অথেনটিকেশন",
    item3Desc: "অতিরিক্ত অ্যাকাউন্ট নিরাপত্তার জন্য ২FA সক্রিয় করুন। সর্বোচ্চ সুরক্ষার জন্য এসএমএস + অথেনটিকেটর অ্যাপের মাধ্যমে ওটিপি সমর্থন।",
    
    item4Title: "জালিয়াতি সনাক্তকরণ এআই",
    item4Desc: "আমাদের এআই সন্দেহজনক কার্যকলাপ, বহু-অ্যাকাউন্ট তৈরি এবং অস্বাভাবিক লগইন প্যাটার্নের জন্য মনিটর করে — পুরো সম্প্রদায়কে রক্ষা করে।",
    
    item5Title: "লক করা সঞ্চয় ভল্ট",
    item5Desc: "লক্ষ্য পরিপক্কতা পর্যন্ত সঞ্চয় লক থাকে। অকাল উত্তোলনের জন্য প্রশাসকের পর্যালোচনা প্রয়োজন এবং আবেগপ্রবণ খরচ রোধ করতে কঠোরভাবে সীমাবদ্ধ।",
    
    item6Title: "সম্পূর্ণ স্বচ্ছ লেজার",
    item6Desc: "প্রতিটি জমা, লেনদেন এবং চলাচল লগ করা হয় এবং আপনার ব্যক্তিগত লেজারে দেখার যোগ্য। সম্পূর্ণ স্বচ্ছতা, শূন্য লুকানো কাজ।",
  }
};

const HomeSecurityTrust = () => {
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

  // Get security items with translations
  const securityItems = [
    {
      Icon: ScanFace,
      title: t('item1Title'),
      description: t('item1Desc'),
    },
    {
      Icon: Lock,
      title: t('item2Title'),
      description: t('item2Desc'),
    },
    {
      Icon: Smartphone,
      title: t('item3Title'),
      description: t('item3Desc'),
    },
    {
      Icon: Fingerprint,
      title: t('item4Title'),
      description: t('item4Desc'),
    },
    {
      Icon: Vault,
      title: t('item5Title'),
      description: t('item5Desc'),
    },
    {
      Icon: Eye,
      title: t('item6Title'),
      description: t('item6Desc'),
    },
  ];

  return (
    <section
      id="security"
      className="bg-white py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9] md:py-24"
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

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, index) => (
            <SecurityCard key={item.title} item={item} index={index} language={language} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SecurityCard = ({ item, index, language }) => {
  const { Icon } = item;

  // Check if language is Bangla for RTL support
  const isBangla = language === 'bn';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group rounded-2xl border border-[#e2e8f0] bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#1a2235]"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#059669]/10 text-[#059669]">
        <Icon size={22} strokeWidth={2.1} aria-hidden="true" />
      </div>

      <h3 className={`mb-2 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9] ${isBangla ? 'font-noto' : ''}`}>
        {item.title}
      </h3>

      <p className={`text-sm leading-[1.6] text-[#475569] dark:text-[#94a3b8] ${isBangla ? 'font-noto' : ''}`}>
        {item.description}
      </p>
    </motion.div>
  );
};

export default HomeSecurityTrust;