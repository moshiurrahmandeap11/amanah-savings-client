"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Moon, Sun, Download, Share2, Copy, Check } from "lucide-react";

// Translations
const translations = {
  en: {
    // Navbar
    appName: "Sanchoy",
    dashboard: "Dashboard",
    
    // Hero
    pageTitle: "🏅 Your Badge Collection",
    pageSubtitle: "Select any badge to generate a beautiful shareable card. Show your achievements on WhatsApp, Facebook, and Instagram!",
    
    // Share Preview
    shareCardPreview: "📤 Share Card Preview",
    clickBadgeToUpdate: "Click a badge below to update",
    sonchoyBondhu: "🌿 Sonchoy Bondhu",
    
    // Buttons
    whatsapp: "WhatsApp",
    facebook: "Facebook",
    copyLink: "🔗 Copy Link",
    saveImage: "💾 Save Image",
    
    // Badges
    yourBadges: "🏅 Your Badges",
    earned: "earned",
    clickAnyBadge: "Click any badge to create share card",
    locked: "🔒 Locked",
    earnedLabel: "Earned",
    
    // Toast Messages
    badgeLocked: "🔒 This badge is locked! Complete more achievements to unlock.",
    shareCardUpdated: "🎨 Share card updated for {name}!",
    badgeLinkCopied: "✅ Badge link copied!",
    imageSaved: "💾 Image saved! Check your downloads folder.",
    
    // Rarity
    common: "common",
    rare: "rare",
    epic: "epic",
    legendary: "legendary",
    
    // Filters
    allBadges: "All Badges",
    streak: "🔥 Streak",
    goals: "🎯 Goals",
    savings: "💰 Savings",
    seasonal: "🌙 Seasonal",
    social: "👥 Social",
    special: "⭐ Special",
  },
  bn: {
    // Navbar
    appName: "সঞ্চয়",
    dashboard: "ড্যাশবোর্ড",
    
    // Hero
    pageTitle: "🏅 আপনার ব্যাজ সংগ্রহ",
    pageSubtitle: "যেকোনো ব্যাজ নির্বাচন করে একটি সুন্দর শেয়ারযোগ্য কার্ড তৈরি করুন। আপনার অর্জন WhatsApp, Facebook এবং Instagram-এ দেখান!",
    
    // Share Preview
    shareCardPreview: "📤 শেয়ার কার্ড প্রিভিউ",
    clickBadgeToUpdate: "আপডেট করতে নিচের ব্যাজে ক্লিক করুন",
    sonchoyBondhu: "🌿 সঞ্চয় বন্ধু",
    
    // Buttons
    whatsapp: "হোয়াটসঅ্যাপ",
    facebook: "ফেসবুক",
    copyLink: "🔗 লিংক কপি",
    saveImage: "💾 ছবি সংরক্ষণ",
    
    // Badges
    yourBadges: "🏅 আপনার ব্যাজ",
    earned: "অর্জিত",
    clickAnyBadge: "শেয়ার কার্ড তৈরি করতে যেকোনো ব্যাজে ক্লিক করুন",
    locked: "🔒 লক করা",
    earnedLabel: "অর্জিত",
    
    // Toast Messages
    badgeLocked: "🔒 এই ব্যাজটি লক করা! আনলক করতে আরও অর্জন সম্পূর্ণ করুন।",
    shareCardUpdated: "🎨 {name}-এর জন্য শেয়ার কার্ড আপডেট করা হয়েছে!",
    badgeLinkCopied: "✅ ব্যাজ লিংক কপি করা হয়েছে!",
    imageSaved: "💾 ছবি সংরক্ষণ করা হয়েছে! আপনার ডাউনলোড ফোল্ডার চেক করুন।",
    
    // Rarity
    common: "সাধারণ",
    rare: "বিরল",
    epic: "এপিক",
    legendary: "লিজেন্ডারি",
    
    // Filters
    allBadges: "সব ব্যাজ",
    streak: "🔥 স্ট্রিক",
    goals: "🎯 লক্ষ্য",
    savings: "💰 সঞ্চয়",
    seasonal: "🌙 মৌসুমি",
    social: "👥 সামাজিক",
    special: "⭐ বিশেষ",
  }
};

const BadgeSharePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [lang, setLang] = useState("en");

  // Translation function
  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  const badges = [
    {
      emoji: "🏆",
      name: "Champion Saver",
      nameBn: "চ্যাম্পিয়ন সেভার",
      sub: "Saved ৳1 Lakh+ across all goals",
      subBn: "সব লক্ষ্যে ৳১ লক্ষ+ সঞ্চয়",
      rarity: "legendary",
      earned: true,
      date: "May 2026",
      dateBn: "মে ২০২৬",
      bg: "linear-gradient(135deg,#f59e0b,#d97706)",
      filter: "savings"
    },
    {
      emoji: "🔥",
      name: "30-Day Streak",
      nameBn: "৩০-দিনের স্ট্রিক",
      sub: "Saved every day for 30 days",
      subBn: "৩০ দিন প্রতিদিন সঞ্চয় করেছেন",
      rarity: "rare",
      earned: true,
      date: "Apr 2026",
      dateBn: "এপ্রিল ২০২৬",
      bg: "linear-gradient(135deg,#ef4444,#f97316)",
      filter: "streak"
    },
    {
      emoji: "🌱",
      name: "First Goal",
      nameBn: "প্রথম লক্ষ্য",
      sub: "Created your very first savings goal",
      subBn: "আপনার প্রথম সঞ্চয় লক্ষ্য তৈরি করেছেন",
      rarity: "common",
      earned: true,
      date: "Jan 2026",
      dateBn: "জানুয়ারি ২০২৬",
      bg: "linear-gradient(135deg,#059669,#34d399)",
      filter: "goals"
    },
    {
      emoji: "💰",
      name: "Big Saver",
      nameBn: "বড় সেভার",
      sub: "Single deposit of ৳10,000 or more",
      subBn: "৳১০,০০০ বা তার বেশি একক জমা",
      rarity: "rare",
      earned: true,
      date: "Mar 2026",
      dateBn: "মার্চ ২০২৬",
      bg: "linear-gradient(135deg,#f59e0b,#059669)",
      filter: "savings"
    },
    {
      emoji: "🌙",
      name: "Ramadan Starter",
      nameBn: "রমজান স্টার্টার",
      sub: "Completed first 7 days of Ramadan",
      subBn: "রমজানের প্রথম ৭ দিন সম্পন্ন করেছেন",
      rarity: "common",
      earned: true,
      date: "May 2026",
      dateBn: "মে ২০২৬",
      bg: "linear-gradient(135deg,#1a0a4a,#7c3aed)",
      filter: "seasonal"
    },
    {
      emoji: "⭐",
      name: "Halfway There",
      nameBn: "অর্ধেক পথ",
      sub: "Reached 50% on any goal",
      subBn: "যেকোনো লক্ষ্যে ৫০% পৌঁছেছেন",
      rarity: "common",
      earned: true,
      date: "Apr 2026",
      dateBn: "এপ্রিল ২০২৬",
      bg: "linear-gradient(135deg,#6366f1,#0891b2)",
      filter: "goals"
    },
    {
      emoji: "👥",
      name: "First Referral",
      nameBn: "প্রথম রেফারেল",
      sub: "Successfully referred a friend",
      subBn: "সফলভাবে একজন বন্ধুকে রেফার করেছেন",
      rarity: "common",
      earned: true,
      date: "Feb 2026",
      dateBn: "ফেব্রুয়ারি ২০২৬",
      bg: "linear-gradient(135deg,#ec4899,#8b5cf6)",
      filter: "social"
    },
    {
      emoji: "🛡️",
      name: "KYC Verified",
      nameBn: "কেওয়াইসি যাচাইকৃত",
      sub: "Completed full identity verification",
      subBn: "সম্পূর্ণ পরিচয় যাচাই সম্পন্ন করেছেন",
      rarity: "common",
      earned: true,
      date: "Jan 2026",
      dateBn: "জানুয়ারি ২০২৬",
      bg: "linear-gradient(135deg,#0891b2,#059669)",
      filter: "special"
    },
    {
      emoji: "🏠",
      name: "Circle Founder",
      nameBn: "সার্কেল প্রতিষ্ঠাতা",
      sub: "Created a family savings circle",
      subBn: "একটি পারিবারিক সঞ্চয় সার্কেল তৈরি করেছেন",
      rarity: "rare",
      earned: true,
      date: "Mar 2026",
      dateBn: "মার্চ ২০২৬",
      bg: "linear-gradient(135deg,#059669,#0891b2)",
      filter: "social"
    },
    {
      emoji: "📱",
      name: "Goal Achieved",
      nameBn: "লক্ষ্য অর্জিত",
      sub: "Completed a savings goal — first time!",
      subBn: "একটি সঞ্চয় লক্ষ্য সম্পন্ন করেছেন — প্রথমবার!",
      rarity: "rare",
      earned: true,
      date: "Apr 2026",
      dateBn: "এপ্রিল ২০২৬",
      bg: "linear-gradient(135deg,#8b5cf6,#6366f1)",
      filter: "goals"
    },
    {
      emoji: "🌟",
      name: "Ramadan Hero",
      nameBn: "রমজান হিরো",
      sub: "Completed 25 days of Ramadan",
      subBn: "রমজানের ২৫ দিন সম্পন্ন করেছেন",
      rarity: "epic",
      earned: true,
      date: "May 2026",
      dateBn: "মে ২০২৬",
      bg: "linear-gradient(135deg,#7c3aed,#f59e0b)",
      filter: "seasonal"
    },
    {
      emoji: "🔗",
      name: "5 Referrals",
      nameBn: "৫ রেফারেল",
      sub: "Referred 5+ friends successfully",
      subBn: "৫+ বন্ধুকে সফলভাবে রেফার করেছেন",
      rarity: "epic",
      earned: true,
      date: "May 2026",
      dateBn: "মে ২০২৬",
      bg: "linear-gradient(135deg,#059669,#ec4899)",
      filter: "social"
    },
    {
      emoji: "👑",
      name: "100-Day Legend",
      nameBn: "১০০-দিনের লিজেন্ড",
      sub: "100-day unbroken streak",
      subBn: "১০০ দিন অবিচ্ছিন্ন স্ট্রিক",
      rarity: "legendary",
      earned: false,
      date: null,
      dateBn: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
      filter: "streak"
    },
    {
      emoji: "🌲",
      name: "Forest Level",
      nameBn: "ফরেস্ট লেভেল",
      sub: "Reached Forest saver level",
      subBn: "ফরেস্ট সেভার লেভেলে পৌঁছেছেন",
      rarity: "epic",
      earned: false,
      date: null,
      dateBn: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
      filter: "special"
    },
    {
      emoji: "🎓",
      name: "Goal Master",
      nameBn: "গোল মাস্টার",
      sub: "Completed 10+ savings goals",
      subBn: "১০+ সঞ্চয় লক্ষ্য সম্পন্ন করেছেন",
      rarity: "legendary",
      earned: false,
      date: null,
      dateBn: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
      filter: "goals"
    },
    {
      emoji: "💎",
      name: "Platinum Member",
      nameBn: "প্লাটিনাম সদস্য",
      sub: "Upgraded to Platinum plan",
      subBn: "প্লাটিনাম প্ল্যানে আপগ্রেড করেছেন",
      rarity: "legendary",
      earned: false,
      date: null,
      dateBn: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
      filter: "special"
    },
    {
      emoji: "🌙",
      name: "Ramadan Champion",
      nameBn: "রমজান চ্যাম্পিয়ন",
      sub: "Completed all 30 Ramadan days",
      subBn: "রমজানের সব ৩০ দিন সম্পন্ন করেছেন",
      rarity: "epic",
      earned: false,
      date: null,
      dateBn: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
      filter: "seasonal"
    },
    {
      emoji: "🏅",
      name: "Top 10",
      nameBn: "শীর্ষ ১০",
      sub: "Reached top 10 on leaderboard",
      subBn: "লিডারবোর্ডে শীর্ষ ১০-এ পৌঁছেছেন",
      rarity: "legendary",
      earned: false,
      date: null,
      dateBn: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
      filter: "special"
    },
  ];

  const filters = [
    { key: "all", label: "All Badges", labelBn: "সব ব্যাজ" },
    { key: "streak", label: "🔥 Streak", labelBn: "🔥 স্ট্রিক" },
    { key: "goals", label: "🎯 Goals", labelBn: "🎯 লক্ষ্য" },
    { key: "savings", label: "💰 Savings", labelBn: "💰 সঞ্চয়" },
    { key: "seasonal", label: "🌙 Seasonal", labelBn: "🌙 মৌসুমি" },
    { key: "social", label: "👥 Social", labelBn: "👥 সামাজিক" },
    { key: "special", label: "⭐ Special", labelBn: "⭐ বিশেষ" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    
    // Get language from localStorage
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
    
    // Set first earned badge as default selected
    const firstEarnedBadge = badges.find((b) => b.earned);
    setSelectedBadge(firstEarnedBadge);
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const selectBadge = (badge) => {
    if (!badge.earned) {
      showToast(t('badgeLocked'));
      return;
    }
    setSelectedBadge(badge);
    const name = lang === "bn" ? badge.nameBn : badge.name;
    showToast(t('shareCardUpdated').replace('{name}', name));
  };

  const shareOnWhatsApp = () => {
    if (!selectedBadge) return;
    const name = lang === "bn" ? selectedBadge.nameBn : selectedBadge.name;
    const sub = lang === "bn" ? selectedBadge.subBn : selectedBadge.sub;
    const msg = encodeURIComponent(
      `🏅 I earned "${name}" badge on Sonchoy Bondhu Community!\n\n${selectedBadge.emoji} ${sub}\n\nStart saving today: sanchoybondhu.com 🌿`,
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=https://sanchoybondhu.com.bd&quote=I+earned+a+new+badge+on+Sanchoy+Bondhu!",
    );
  };

  const copyBadgeLink = () => {
    if (!selectedBadge) return;
    navigator.clipboard.writeText(
      `https://sanchoybondhu.com/badges?share=${encodeURIComponent(selectedBadge.name)}`,
    );
    showToast(t('badgeLinkCopied'));
  };

  const saveBadgeImage = () => {
    showToast(t('imageSaved'));
  };

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case "common":
        return "bg-primary/15 text-primary";
      case "rare":
        return "bg-blue-500/15 text-blue-500";
      case "epic":
        return "bg-pink-500/15 text-pink-500";
      case "legendary":
        return "bg-amber-500/15 text-amber-500";
      default:
        return "bg-primary/15 text-primary";
    }
  };

  const getRarityLabel = (rarity) => {
    switch (rarity) {
      case "common": return t('common');
      case "rare": return t('rare');
      case "epic": return t('epic');
      case "legendary": return t('legendary');
      default: return rarity;
    }
  };

  const earnedCount = badges.filter((b) => b.earned).length;
  const totalCount = badges.length;

  // Filter badges
  const filteredBadges = activeFilter === "all" 
    ? badges 
    : badges.filter(b => b.filter === activeFilter);

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white text-lg">
            আ
          </div>
          <span className="font-bold text-lg text-foreground">{t('appName')}</span>
        </Link>
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              const newLang = lang === "bn" ? "en" : "bn";
              setLang(newLang);
              localStorage.setItem('appLanguage', newLang);
            }}
            className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:bg-card transition"
          >
            {lang === "bn" ? "EN" : "বাংলা"}
          </button>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-card transition"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-semibold"
          >
            {t('dashboard')}
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-linear-to-r from-primary to-primary-light py-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          {t('pageTitle')}
        </h1>
        <p className="text-white/90 text-sm max-w-md mx-auto">
          {t('pageSubtitle')}
        </p>
      </div>

      {/* Share Preview */}
      <div className="max-w-2xl mx-auto px-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-foreground">
            {t('shareCardPreview')}
          </span>
          <span className="text-xs text-foreground/50">
            {t('clickBadgeToUpdate')}
          </span>
        </div>
        {selectedBadge && (
          <div className="rounded-xl overflow-hidden shadow-xl">
            <div
              className="relative p-8 text-center"
              style={{ background: selectedBadge.bg }}
            >
              <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_2px,transparent_2px,transparent_8px)]" />
              <div className="relative z-10">
                <div className="text-xs font-extrabold text-white/60 tracking-wider mb-4">
                  {t('sonchoyBondhu')}
                </div>
                <div className="text-7xl mb-4 animate-bounce">
                  {selectedBadge.emoji}
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {lang === "bn" ? selectedBadge.nameBn : selectedBadge.name}
                </div>
                <div className="text-sm text-white/75 mb-5">
                  {lang === "bn" ? selectedBadge.subBn : selectedBadge.sub}
                </div>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                    আ
                  </div>
                  <div className="text-sm font-bold text-white">
                    Albi Rahman · {lang === "bn" ? selectedBadge.dateBn : selectedBadge.date}
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-card p-4 flex flex-wrap gap-2">
              <button
                onClick={shareOnWhatsApp}
                className="flex-1 min-w-25 py-3 rounded-lg bg-[#25D366] text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                {t('whatsapp')}
              </button>
              <button
                onClick={shareOnFacebook}
                className="flex-1 min-w-25 py-3 rounded-lg bg-[#1877F2] text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                📘 {t('facebook')}
              </button>
              <button
                onClick={copyBadgeLink}
                className="flex-1 min-w-25 py-3 rounded-lg bg-surface2 border border-border text-foreground text-sm font-bold flex items-center justify-center gap-2 hover:border-primary transition"
              >
                {t('copyLink')}
              </button>
              <button
                onClick={saveBadgeImage}
                className="flex-1 min-w-25 py-3 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                {t('saveImage')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Category Filter */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.key}
              onClick={() => setActiveFilter(filter.key)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                activeFilter === filter.key
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {lang === "bn" ? filter.labelBn : filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
          <div className="font-bold text-xl text-foreground">
            {t('yourBadges')} ({earnedCount}/{totalCount} {t('earned')})
          </div>
          <div className="text-sm text-foreground/50">
            {t('clickAnyBadge')}
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {filteredBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.02 }}
              onClick={() => selectBadge(badge)}
              className={`rounded-xl p-4 text-center cursor-pointer transition-all border-2 ${
                !badge.earned
                  ? "opacity-50 grayscale cursor-not-allowed"
                  : "hover:shadow-lg hover:-translate-y-1"
              } ${selectedBadge?.name === badge.name ? "border-primary shadow-lg shadow-primary/20" : "border-border"}`}
            >
              <div className="text-5xl mb-2">{badge.emoji}</div>
              <div className="font-bold text-sm text-foreground">
                {lang === "bn" ? badge.nameBn : badge.name}
              </div>
              <div
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${getRarityColor(badge.rarity)}`}
              >
                {getRarityLabel(badge.rarity)}
              </div>
              <div className="text-[9px] text-foreground/40 mt-2">
                {badge.earned 
                  ? `${t('earnedLabel')} ${lang === "bn" ? badge.dateBn : badge.date}` 
                  : t('locked')}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BadgeSharePage;