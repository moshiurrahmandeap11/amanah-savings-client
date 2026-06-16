"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Moon, Sun, Download, Share2, Copy, Check } from "lucide-react";

const BadgeSharePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [selectedBadge, setSelectedBadge] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  const badges = [
    {
      emoji: "🏆",
      name: "Champion Saver",
      sub: "Saved ৳1 Lakh+ across all goals",
      rarity: "legendary",
      earned: true,
      date: "May 2026",
      bg: "linear-gradient(135deg,#f59e0b,#d97706)",
    },
    {
      emoji: "🔥",
      name: "30-Day Streak",
      sub: "Saved every day for 30 days",
      rarity: "rare",
      earned: true,
      date: "Apr 2026",
      bg: "linear-gradient(135deg,#ef4444,#f97316)",
    },
    {
      emoji: "🌱",
      name: "First Goal",
      sub: "Created your very first savings goal",
      rarity: "common",
      earned: true,
      date: "Jan 2026",
      bg: "linear-gradient(135deg,#059669,#34d399)",
    },
    {
      emoji: "💰",
      name: "Big Saver",
      sub: "Single deposit of ৳10,000 or more",
      rarity: "rare",
      earned: true,
      date: "Mar 2026",
      bg: "linear-gradient(135deg,#f59e0b,#059669)",
    },
    {
      emoji: "🌙",
      name: "Ramadan Starter",
      sub: "Completed first 7 days of Ramadan",
      rarity: "common",
      earned: true,
      date: "May 2026",
      bg: "linear-gradient(135deg,#1a0a4a,#7c3aed)",
    },
    {
      emoji: "⭐",
      name: "Halfway There",
      sub: "Reached 50% on any goal",
      rarity: "common",
      earned: true,
      date: "Apr 2026",
      bg: "linear-gradient(135deg,#6366f1,#0891b2)",
    },
    {
      emoji: "👥",
      name: "First Referral",
      sub: "Successfully referred a friend",
      rarity: "common",
      earned: true,
      date: "Feb 2026",
      bg: "linear-gradient(135deg,#ec4899,#8b5cf6)",
    },
    {
      emoji: "🛡️",
      name: "KYC Verified",
      sub: "Completed full identity verification",
      rarity: "common",
      earned: true,
      date: "Jan 2026",
      bg: "linear-gradient(135deg,#0891b2,#059669)",
    },
    {
      emoji: "🏠",
      name: "Circle Founder",
      sub: "Created a family savings circle",
      rarity: "rare",
      earned: true,
      date: "Mar 2026",
      bg: "linear-gradient(135deg,#059669,#0891b2)",
    },
    {
      emoji: "📱",
      name: "Goal Achieved",
      sub: "Completed a savings goal — first time!",
      rarity: "rare",
      earned: true,
      date: "Apr 2026",
      bg: "linear-gradient(135deg,#8b5cf6,#6366f1)",
    },
    {
      emoji: "🌟",
      name: "Ramadan Hero",
      sub: "Completed 25 days of Ramadan",
      rarity: "epic",
      earned: true,
      date: "May 2026",
      bg: "linear-gradient(135deg,#7c3aed,#f59e0b)",
    },
    {
      emoji: "🔗",
      name: "5 Referrals",
      sub: "Referred 5+ friends successfully",
      rarity: "epic",
      earned: true,
      date: "May 2026",
      bg: "linear-gradient(135deg,#059669,#ec4899)",
    },
    {
      emoji: "👑",
      name: "100-Day Legend",
      sub: "100-day unbroken streak",
      rarity: "legendary",
      earned: false,
      date: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
    },
    {
      emoji: "🌲",
      name: "Forest Level",
      sub: "Reached Forest saver level",
      rarity: "epic",
      earned: false,
      date: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
    },
    {
      emoji: "🎓",
      name: "Goal Master",
      sub: "Completed 10+ savings goals",
      rarity: "legendary",
      earned: false,
      date: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
    },
    {
      emoji: "💎",
      name: "Platinum Member",
      sub: "Upgraded to Platinum plan",
      rarity: "legendary",
      earned: false,
      date: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
    },
    {
      emoji: "🌙",
      name: "Ramadan Champion",
      sub: "Completed all 30 Ramadan days",
      rarity: "epic",
      earned: false,
      date: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
    },
    {
      emoji: "🏅",
      name: "Top 10",
      sub: "Reached top 10 on leaderboard",
      rarity: "legendary",
      earned: false,
      date: null,
      bg: "linear-gradient(135deg,#64748b,#475569)",
    },
  ];

  const filters = [
    "All Badges",
    "🔥 Streak",
    "🎯 Goals",
    "💰 Savings",
    "🌙 Seasonal",
    "👥 Social",
    "⭐ Special",
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
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
      showToast(
        "🔒 This badge is locked! Complete more achievements to unlock.",
      );
      return;
    }
    setSelectedBadge(badge);
    showToast(`🎨 Share card updated for ${badge.name}!`);
  };

  const shareOnWhatsApp = () => {
    if (!selectedBadge) return;
    const msg = encodeURIComponent(
      `🏅 I earned "${selectedBadge.name}" badge on Sonchoy Bondhu Community!\n\n${selectedBadge.emoji} ${selectedBadge.sub}\n\nStart saving today: sanchoybondhu.com 🌿`,
    );
    window.open(`https://wa.me/?text=${msg}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=https://sanchoybondhu.com.bd&quote=I+earned+a+new+badge+on+Sanchoy+Bondhu!",
  )};

  const copyBadgeLink = () => {
    if (!selectedBadge) return;
    navigator.clipboard.writeText(
      `https://sanchoybondhu.com/badges?share=${encodeURIComponent(selectedBadge.name)}`,
    );
    showToast("✅ Badge link copied!");
  };

  const saveBadgeImage = () => {
    showToast("💾 Image saved! Check your downloads folder.");
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

  const earnedCount = badges.filter((b) => b.earned).length;
  const totalCount = badges.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-background/90 backdrop-blur-md border-b border-border px-4 sm:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white text-lg">
            আ
          </div>
          <span className="font-bold text-lg text-foreground">Sanchoy</span>
        </Link>
        <div className="flex items-center gap-3">
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
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-linear-to-r from-primary to-primary-light py-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          🏅 Your Badge Collection
        </h1>
        <p className="text-white/90 text-sm max-w-md mx-auto">
          Select any badge to generate a beautiful shareable card. Show your
          achievements on WhatsApp, Facebook, and Instagram!
        </p>
      </div>

      {/* Share Preview */}
      <div className="max-w-2xl mx-auto px-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-foreground">
            📤 Share Card Preview
          </span>
          <span className="text-xs text-foreground/50">
            Click a badge below to update
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
                  🌿 Sonchoy Bondhu
                </div>
                <div className="text-7xl mb-4 animate-bounce">
                  {selectedBadge.emoji}
                </div>
                <div className="text-2xl font-bold text-white mb-1">
                  {selectedBadge.name}
                </div>
                <div className="text-sm text-white/75 mb-5">
                  {selectedBadge.sub}
                </div>
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/25 rounded-full px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                    আ
                  </div>
                  <div className="text-sm font-bold text-white">
                    Albi Rahman · {selectedBadge.date}
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
                WhatsApp
              </button>
              <button
                onClick={shareOnFacebook}
                className="flex-1 min-w-25 py-3 rounded-lg bg-[#1877F2] text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                📘 Facebook
              </button>
              <button
                onClick={copyBadgeLink}
                className="flex-1 min-w-25 py-3 rounded-lg bg-surface2 border border-border text-foreground text-sm font-bold flex items-center justify-center gap-2 hover:border-primary transition"
              >
                🔗 Copy Link
              </button>
              <button
                onClick={saveBadgeImage}
                className="flex-1 min-w-25 py-3 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
              >
                💾 Save Image
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
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition ${
                activeFilter === filter
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Badges Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-5 flex-wrap gap-3">
          <div className="font-bold text-xl text-foreground">
            🏅 Your Badges ({earnedCount}/{totalCount} earned)
          </div>
          <div className="text-sm text-foreground/50">
            Click any badge to create share card
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {badges.map((badge, idx) => (
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
                {badge.name}
              </div>
              <div
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full mt-1 ${getRarityColor(badge.rarity)}`}
              >
                {badge.rarity}
              </div>
              <div className="text-[9px] text-foreground/40 mt-2">
                {badge.earned ? `Earned ${badge.date}` : "🔒 Locked"}
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
