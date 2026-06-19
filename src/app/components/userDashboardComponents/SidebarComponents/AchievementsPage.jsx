"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2, TrendingUp, Medal, Star, Award, Trophy, Target, Zap, Crown, Sparkles, Gift, Rocket, Shield, Heart, CheckCircle, Lock, ArrowUp, Share, FileText } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Page Title
    pageTitle: "Achievements & Badges",
    pageSubtitle: "Track your progress and unlock rewards",
    
    // Stats Labels
    statBadgesEarned: "Badges Earned",
    statLockedBadges: "Locked Badges",
    statTotalPoints: "Total Points",
    statLevel: "Level",
    
    // Level Progress
    levelCurrent: "Current Level",
    levelNext: "Next Level",
    levelProgress: "Progress to Level {level}",
    levelPointsToNext: "points to next level",
    levelNextBadges: "Next Badges to Unlock:",
    
    // Badges Sections
    earnedBadgesTitle: "Badges Earned ({count})",
    lockedBadgesTitle: "Locked Badges ({count})",
    
    // Empty States
    noEarnedBadges: "No badges earned yet",
    noEarnedBadgesDesc: "Start saving to earn your first badge!",
    noLockedBadges: "You've unlocked all badges!",
    noLockedBadgesDesc: "What an amazing achievement!",
  },
  bn: {
    // Page Title
    pageTitle: "অর্জন ও ব্যাজ",
    pageSubtitle: "আপনার অগ্রগতি ট্র্যাক করুন এবং পুরস্কার আনলক করুন",
    
    // Stats Labels
    statBadgesEarned: "অর্জিত ব্যাজ",
    statLockedBadges: "লক করা ব্যাজ",
    statTotalPoints: "মোট পয়েন্ট",
    statLevel: "লেভেল",
    
    // Level Progress
    levelCurrent: "বর্তমান লেভেল",
    levelNext: "পরবর্তী লেভেল",
    levelProgress: "লেভেল {level} এ অগ্রগতি",
    levelPointsToNext: "পয়েন্ট বাকি পরবর্তী লেভেলে",
    levelNextBadges: "আনলক করার জন্য পরবর্তী ব্যাজ:",
    
    // Badges Sections
    earnedBadgesTitle: "অর্জিত ব্যাজ ({count})",
    lockedBadgesTitle: "লক করা ব্যাজ ({count})",
    
    // Empty States
    noEarnedBadges: "কোন ব্যাজ অর্জিত হয়নি",
    noEarnedBadgesDesc: "আপনার প্রথম ব্যাজ অর্জন করতে সঞ্চয় শুরু করুন!",
    noLockedBadges: "আপনি সব ব্যাজ আনলক করেছেন!",
    noLockedBadgesDesc: "কি অসাধারণ অর্জন!",
  }
};

const AchievementsPage = () => {
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('en');
  const [stats, setStats] = useState({
    totalEarned: 0,
    totalLocked: 0,
    totalPoints: 0,
    level: 1,
    nextLevelPoints: 0,
    pointsToNextLevel: 0,
  });
  const [earnedBadges, setEarnedBadges] = useState([]);
  const [lockedBadges, setLockedBadges] = useState([]);
  const [levelInfo, setLevelInfo] = useState(null);

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Fetch achievements
  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/achievements");
      if (response.data.success) {
        setStats(response.data.data.stats);
        setEarnedBadges(response.data.data.earnedBadges);
        setLockedBadges(response.data.data.lockedBadges);
      }
    } catch (error) {
      console.error("Fetch achievements error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch level info
  const fetchLevelInfo = async () => {
    try {
      const response = await axiosInstance.get("/achievements/level");
      if (response.data.success) {
        setLevelInfo(response.data.data);
      }
    } catch (error) {
      console.error("Fetch level info error:", error);
    }
  };

  useEffect(() => {
    fetchAchievements();
    fetchLevelInfo();
  }, []);

  const displayStats = [
    { icon: <Award size={20} />, value: stats.totalEarned, label: t('statBadgesEarned'), color: "green", bg: "bg-primary/10", textColor: "text-primary" },
    { icon: <Lock size={20} />, value: stats.totalLocked, label: t('statLockedBadges'), color: "blue", bg: "bg-blue-500/10", textColor: "text-blue-500" },
    { icon: <Star size={20} />, value: stats.totalPoints.toLocaleString(), label: t('statTotalPoints'), color: "warning", bg: "bg-amber-500/10", textColor: "text-amber-500" },
    { icon: <Crown size={20} />, value: stats.level, label: t('statLevel'), color: "info", bg: "bg-cyan-500/10", textColor: "text-cyan-500" },
  ];

  const getStatColorClass = (color) => {
    switch (color) {
      case "green": return "border-t-primary";
      case "blue": return "border-t-blue-500";
      case "warning": return "border-t-amber-500";
      case "info": return "border-t-cyan-500";
      default: return "border-t-primary";
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
        <Trophy size={28} className="text-amber-500" /> {t('pageTitle')}
      </h2>
      <p className="text-sm text-foreground/60 mb-5">{t('pageSubtitle')}</p>

      {/* Level Progress Card */}
      {levelInfo && (
        <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 border border-primary/20 rounded-xl p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="text-xs text-foreground/50">{t('levelCurrent')}</div>
              <div className="flex items-center gap-2">
                <Crown size={24} className="text-primary" />
                <div className="text-3xl font-bold text-primary">Level {levelInfo.level}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-foreground/50">{t('levelNext')}</div>
              <div className="text-2xl font-bold text-foreground">Level {levelInfo.level + 1}</div>
            </div>
          </div>
          <div className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-foreground/60">
                {t('levelProgress').replace('{level}', levelInfo.level + 1)}
              </span>
              <span className="text-primary font-semibold">{levelInfo.progressToNextLevel?.toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500"
                style={{ width: `${levelInfo.progressToNextLevel}%` }}
              />
            </div>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-foreground/50">{levelInfo.totalPoints?.toLocaleString()} points</span>
            <span className="text-foreground/50">{levelInfo.pointsToNextLevel} {t('levelPointsToNext')}</span>
          </div>
          {levelInfo.nextBadges && levelInfo.nextBadges.length > 0 && (
            <div className="mt-4 pt-3 border-t border-primary/20">
              <div className="text-xs text-foreground/50 mb-2 flex items-center gap-1">
                <Target size={12} /> {t('levelNextBadges')}
              </div>
              <div className="flex gap-3 flex-wrap">
                {levelInfo.nextBadges.map((badge, idx) => (
                  <div key={idx} className="flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                    <span>{badge.emoji}</span>
                    <span>{badge.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {displayStats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-card border border-border rounded-xl p-4 hover:shadow-lg transition border-t-4 ${getStatColorClass(stat.color)}`}
          >
            <div className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center mb-3 ${stat.textColor}`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Earned Badges */}
      <div className="bg-card border border-border rounded-xl p-5 mb-5">
        <div className="font-bold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle size={18} className="text-green-500" /> 
          {t('earnedBadgesTitle').replace('{count}', earnedBadges.length)}
        </div>
        {earnedBadges.length === 0 ? (
          <div className="text-center py-8">
            <Target size={48} className="text-foreground/30 mx-auto mb-2" />
            <p className="text-foreground/50">{t('noEarnedBadges')}</p>
            <p className="text-xs text-foreground/40 mt-1">{t('noEarnedBadgesDesc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {earnedBadges.map((badge, idx) => (
              <motion.div
                key={badge.id || idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="text-center p-3 rounded-xl bg-background hover:bg-primary/5 transition cursor-pointer group relative"
              >
                <div className="text-3xl mb-1">{badge.emoji}</div>
                <div className="text-xs font-bold text-foreground">{badge.name}</div>
                <div className="text-[10px] text-foreground/50 mt-1 line-clamp-2">{badge.description}</div>
                <div className="absolute -top-1 -right-1">
                  <div className="bg-green-500 rounded-full px-1.5 py-0.5">
                    <span className="text-[8px] text-white font-bold">+{badge.points}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Locked Badges */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="font-bold text-foreground mb-4 flex items-center gap-2">
          <Lock size={18} className="text-amber-500" /> 
          {t('lockedBadgesTitle').replace('{count}', lockedBadges.length)}
        </div>
        {lockedBadges.length === 0 ? (
          <div className="text-center py-8">
            <Trophy size={48} className="text-foreground/30 mx-auto mb-2" />
            <p className="text-foreground/50">{t('noLockedBadges')}</p>
            <p className="text-xs text-foreground/40 mt-1">{t('noLockedBadgesDesc')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {lockedBadges.map((badge, idx) => (
              <motion.div
                key={badge.id || idx}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ y: -4 }}
                className="text-center p-3 rounded-xl bg-background opacity-70 grayscale hover:grayscale-0 transition-all duration-300 cursor-not-allowed group relative"
              >
                <div className="text-3xl mb-1 opacity-50">{badge.emoji}</div>
                <div className="text-xs font-bold text-foreground/70">{badge.name}</div>
                <div className="text-[10px] text-foreground/40 mt-1 line-clamp-2">{badge.description}</div>
                {badge.progress && badge.target && (
                  <div className="mt-2">
                    <div className="h-1 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${(badge.progress / badge.target) * 100}%` }}
                      />
                    </div>
                    <div className="text-[8px] text-foreground/40 mt-1">
                      {badge.progress}/{badge.target}
                    </div>
                  </div>
                )}
                <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition">
                  <div className="bg-amber-500 rounded-full px-1.5 py-0.5 whitespace-nowrap">
                    <span className="text-[8px] text-white font-bold">{badge.requirement}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AchievementsPage;