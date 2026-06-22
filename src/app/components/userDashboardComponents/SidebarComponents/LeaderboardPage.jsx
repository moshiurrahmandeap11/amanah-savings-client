"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2, Trophy, TrendingUp, Users, Calendar, Award, Medal, Star, Flame, Crown, ChevronUp, ChevronDown } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Translations
const translations = {
  en: {
    // Page Title
    pageTitle: "🏆 Savings Leaderboard",
    pageSubtitle: "Top savers this month — keep saving to climb the ranks!",
    
    // Statistics
    totalSavers: "Total Savers",
    totalSaved: "Total Saved",
    average: "Average",
    topSaver: "Top Saver",
    
    // Tabs
    monthly: "Monthly",
    allTime: "All Time",
    
    // Leaderboard Headers
    rank: "Rank",
    saver: "Saver",
    streak: "Streak",
    amountSaved: "Amount Saved",
    days: "days",
    tier: "Tier",
    you: "(You)",
    
    // User Position
    yourPosition: "Your Position",
    totalSavedLabel: "Total Saved",
    topPercent: "Top {percent}% of savers",
    
    // Empty State
    noData: "No data available",
    
    // Info Note
    leaderboardInfo: "🏆 Leaderboard updates daily based on approved deposits. Keep saving to climb the ranks!",
    
    // Loading
    loading: "Loading leaderboard...",
    
    // Months
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  },
  bn: {
    // Page Title
    pageTitle: "🏆 সঞ্চয় লিডারবোর্ড",
    pageSubtitle: "এই মাসের শীর্ষ সঞ্চয়কারী — র্যাঙ্ক বাড়াতে সঞ্চয় চালিয়ে যান!",
    
    // Statistics
    totalSavers: "মোট সঞ্চয়কারী",
    totalSaved: "মোট সঞ্চয়",
    average: "গড়",
    topSaver: "শীর্ষ সঞ্চয়কারী",
    
    // Tabs
    monthly: "মাসিক",
    allTime: "সর্বকাল",
    
    // Leaderboard Headers
    rank: "র্যাঙ্ক",
    saver: "সঞ্চয়কারী",
    streak: "স্ট্রিক",
    amountSaved: "সঞ্চয়ের পরিমাণ",
    days: "দিন",
    tier: "টিয়ার",
    you: "(আপনি)",
    
    // User Position
    yourPosition: "আপনার অবস্থান",
    totalSavedLabel: "মোট সঞ্চয়",
    topPercent: "শীর্ষ {percent}% সঞ্চয়কারীদের মধ্যে",
    
    // Empty State
    noData: "কোন তথ্য পাওয়া যায়নি",
    
    // Info Note
    leaderboardInfo: "🏆 লিডারবোর্ড প্রতিদিন অনুমোদিত জমার ভিত্তিতে আপডেট হয়। র্যাঙ্ক বাড়াতে সঞ্চয় চালিয়ে যান!",
    
    // Loading
    loading: "লিডারবোর্ড লোড হচ্ছে...",
    
    // Months
    january: "জানুয়ারি",
    february: "ফেব্রুয়ারি",
    march: "মার্চ",
    april: "এপ্রিল",
    may: "মে",
    june: "জুন",
    july: "জুলাই",
    august: "আগস্ট",
    september: "সেপ্টেম্বর",
    october: "অক্টোবর",
    november: "নভেম্বর",
    december: "ডিসেম্বর",
  }
};

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState("monthly");
  const [loading, setLoading] = useState(true);
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userRank, setUserRank] = useState(null);
  const [statistics, setStatistics] = useState({
    totalSavers: 0,
    totalSaved: "৳0",
    averageSaved: "৳0",
    topSaver: "N/A",
    topAmount: "৳0"
  });
  const [period, setPeriod] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("appLanguage") || "en";
  });

  // Translation function
  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  // Fetch leaderboard data
  const fetchLeaderboard = async (type) => {
    setLoading(true);
    try {
      let response;
      if (type === "monthly") {
        response = await axiosInstance.get("/leaderboard/monthly", {
          headers: getAuthHeaders(),
        });
      } else {
        response = await axiosInstance.get("/leaderboard/all-time", {
          headers: getAuthHeaders(),
        });
      }
      
      if (response.data.success) {
        setLeaderboardData(response.data.data.leaderboard);
        setUserRank(response.data.data.userRank);
        setStatistics(response.data.data.statistics);
        if (response.data.data.period) {
          setPeriod(response.data.data.period);
        }
      }
    } catch (error) {
      console.error("Fetch leaderboard error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      fetchLeaderboard(activeTab);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [activeTab]);

  const getMonthName = (month) => {
    const months = [
      t('january'), t('february'), t('march'), t('april'), 
      t('may'), t('june'), t('july'), t('august'), 
      t('september'), t('october'), t('november'), t('december')
    ];
    return months[month - 1];
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return <Crown size={20} className="text-amber-500" />;
    if (rank === 2) return <Medal size={20} className="text-gray-400" />;
    if (rank === 3) return <Medal size={20} className="text-amber-600" />;
    return <Star size={16} className="text-foreground/30" />;
  };

  const getRankBadge = (rank) => {
    if (rank === 1) return "bg-amber-500/20 text-amber-500";
    if (rank === 2) return "bg-gray-400/20 text-gray-400";
    if (rank === 3) return "bg-amber-600/20 text-amber-600";
    return "bg-primary/10 text-primary";
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">{t('loading')}</p>
        </div>
      </div>
    );
  }

  const hasPodium = leaderboardData.length >= 3;
  const topThree = hasPodium ? leaderboardData.slice(0, 3) : [];
  const listLeaderboard = hasPodium ? leaderboardData.slice(3) : leaderboardData;
  const topPercent = userRank && statistics.totalSavers > 0
    ? (userRank.percentile || ((userRank.position / statistics.totalSavers) * 100).toFixed(1))
    : "0.0";

  return (
    <div className="max-w-full mx-auto">
      {/* Page Title */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy size={28} className="text-amber-500" /> {t('pageTitle')}
        </h2>
        <p className="text-sm text-foreground/60 mt-1">
          {t('pageSubtitle')}
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-primary" />
            <span className="text-xs text-foreground/50">{t('totalSavers')}</span>
          </div>
          <div className="text-xl font-bold text-foreground">{statistics.totalSavers.toLocaleString()}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-amber-500" />
            <span className="text-xs text-foreground/50">{t('totalSaved')}</span>
          </div>
          <div className="text-xl font-bold text-primary">{statistics.totalSaved}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-xs text-foreground/50">{t('average')}</span>
          </div>
          <div className="text-xl font-bold text-foreground">{statistics.averageSaved}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs text-foreground/50 mb-1">{t('topSaver')}</div>
          <div className="font-semibold text-sm text-foreground truncate">{statistics.topSaver}</div>
          <div className="text-xs text-primary">{statistics.topAmount}</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-background rounded-xl p-1 border border-border mb-6">
        <button
          onClick={() => setActiveTab("monthly")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
            activeTab === "monthly"
              ? "bg-card text-foreground shadow-sm"
              : "text-foreground/50 hover:text-primary"
          }`}
        >
          <Calendar size={14} />
          {activeTab === "monthly" ? `${getMonthName(period.month)} ${period.year}` : t('monthly')}
        </button>
        <button
          onClick={() => setActiveTab("allTime")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition flex items-center justify-center gap-2 ${
            activeTab === "allTime"
              ? "bg-card text-foreground shadow-sm"
              : "text-foreground/50 hover:text-primary"
          }`}
        >
          <Trophy size={14} />
          {t('allTime')}
        </button>
      </div>

      {/* Top 3 Podium */}
      {hasPodium && (
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* 2nd Place */}
          <div className="flex flex-col items-center">
            <div className="text-2xl mb-1">🥈</div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white text-xl font-bold mb-2">
              {topThree[1]?.avatar || "2"}
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground text-sm">{topThree[1]?.name}</div>
              <div className="text-xs text-primary font-semibold">{topThree[1]?.amount}</div>
              <div className="text-[10px] text-foreground/50 flex items-center justify-center gap-1 mt-1">
                <Flame size={10} /> {topThree[1]?.streak || 0} {t('days')}
              </div>
            </div>
          </div>

          {/* 1st Place */}
          <div className="flex flex-col items-center -mt-4">
            <div className="text-3xl mb-1">👑</div>
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white text-2xl font-bold mb-2 ring-4 ring-amber-500/30">
              {topThree[0]?.avatar || "1"}
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground text-base">{topThree[0]?.name}</div>
              <div className="text-sm text-primary font-bold">{topThree[0]?.amount}</div>
              <div className="text-xs text-foreground/50 flex items-center justify-center gap-1 mt-1">
                <Flame size={12} /> {topThree[0]?.streak || 0} {t('days')} {t('streak').toLowerCase()}
              </div>
            </div>
          </div>

          {/* 3rd Place */}
          <div className="flex flex-col items-center">
            <div className="text-2xl mb-1">🥉</div>
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-700 to-amber-800 flex items-center justify-center text-white text-xl font-bold mb-2">
              {topThree[2]?.avatar || "3"}
            </div>
            <div className="text-center">
              <div className="font-bold text-foreground text-sm">{topThree[2]?.name}</div>
              <div className="text-xs text-primary font-semibold">{topThree[2]?.amount}</div>
              <div className="text-[10px] text-foreground/50 flex items-center justify-center gap-1 mt-1">
                <Flame size={10} /> {topThree[2]?.streak || 0} {t('days')}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Position Card */}
      {userRank && (
        <div className="p-5 bg-gradient-to-r from-primary to-primary-light rounded-xl text-white text-center mb-6">
          <div className="text-xs opacity-85 mb-1">{t('yourPosition')}</div>
          <div className="text-4xl font-bold flex items-center justify-center gap-2">
            {userRank.rankIcon === "🥇" ? "👑" : userRank.rankIcon} #{userRank.position}
          </div>
          <div className="text-sm opacity-90 mt-1">
            {t('totalSavedLabel')}: {userRank.totalSaved?.toLocaleString() || 0}
            {activeTab === "monthly" && userRank.tier && ` · ${t('tier')}: ${userRank.tier}`}
          </div>
          <div className="text-xs opacity-75 mt-2">
            {t('topPercent').replace('{percent}', topPercent)}
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-background">
          <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-foreground/60">
            <div className="col-span-1">{t('rank')}</div>
            <div className="col-span-5">{t('saver')}</div>
            <div className="col-span-3">{t('streak')}</div>
            <div className="col-span-3 text-right">{t('amountSaved')}</div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {listLeaderboard.map((user, idx) => (
            <motion.div
              key={user.userId || idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
              whileHover={{ backgroundColor: "rgba(5,150,105,0.05)" }}
              className={`grid grid-cols-12 gap-2 p-3 transition ${
                user.isMe ? "bg-primary/5" : ""
              }`}
            >
              <div className="col-span-1 flex items-center">
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${getRankBadge(user.rankNumber)}`}>
                  {user.rank}
                </span>
              </div>
              <div className="col-span-5 flex items-center gap-2 min-w-0">
                {user.profilePicture ? (
                  <img src={user.profilePicture} alt={user.name} className="w-8 h-8 rounded-full object-cover shrink-0" />
                ) : (
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                    {user.avatar}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="font-semibold text-sm text-foreground truncate">
                    {user.name} {user.isMe && <span className="text-primary text-xs ml-1">{t('you')}</span>}
                  </div>
                  <div className="text-[10px] text-foreground/50">{user.tier}</div>
                </div>
              </div>
              <div className="col-span-3 flex items-center gap-1">
                <Flame size={12} className="text-orange-500" />
                <span className="text-sm text-foreground">{user.streak || 0}</span>
                <span className="text-[10px] text-foreground/50">{t('days')}</span>
              </div>
              <div className="col-span-3 flex items-center justify-end">
                <span className="font-bold text-sm text-primary">{user.amount}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {leaderboardData.length === 0 && (
        <div className="text-center py-12 bg-card rounded-xl border border-border">
          <Trophy size={48} className="text-foreground/30 mx-auto mb-3" />
          <div className="text-foreground/50">{t('noData')}</div>
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/15 rounded-lg text-center">
        <p className="text-xs text-foreground/60">
          {t('leaderboardInfo')}
        </p>
      </div>
    </div>
  );
};

export default LeaderboardPage;
