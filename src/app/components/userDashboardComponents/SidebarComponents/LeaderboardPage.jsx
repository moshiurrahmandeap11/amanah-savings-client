"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2, Trophy, TrendingUp, Users, Calendar, Award, Medal, Star, Flame, Crown, ChevronUp, ChevronDown } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

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

  // Fetch leaderboard data
  const fetchLeaderboard = async (type) => {
    setLoading(true);
    try {
      let response;
      if (type === "monthly") {
        response = await axiosInstance.get("/leaderboard/monthly");
      } else {
        response = await axiosInstance.get("/leaderboard/all-time");
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
    fetchLeaderboard(activeTab);
  }, [activeTab]);

  const getMonthName = (month) => {
    const months = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];
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
          <p className="text-foreground/60">Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  const topThree = leaderboardData.slice(0, 3);
  const restLeaderboard = leaderboardData.slice(3);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Page Title */}
      <div className="mb-5">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Trophy size={28} className="text-amber-500" /> Savings Leaderboard
        </h2>
        <p className="text-sm text-foreground/60 mt-1">
          Top savers this month — keep saving to climb the ranks!
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-primary" />
            <span className="text-xs text-foreground/50">Total Savers</span>
          </div>
          <div className="text-xl font-bold text-foreground">{statistics.totalSavers.toLocaleString()}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-amber-500" />
            <span className="text-xs text-foreground/50">Total Saved</span>
          </div>
          <div className="text-xl font-bold text-primary">{statistics.totalSaved}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp size={16} className="text-green-500" />
            <span className="text-xs text-foreground/50">Average</span>
          </div>
          <div className="text-xl font-bold text-foreground">{statistics.averageSaved}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="text-xs text-foreground/50 mb-1">Top Saver</div>
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
          {activeTab === "monthly" ? `${getMonthName(period.month)} ${period.year}` : "Monthly"}
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
          All Time
        </button>
      </div>

      {/* Top 3 Podium */}
      {topThree.length >= 3 && (
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
                <Flame size={10} /> {topThree[1]?.streak || 0} days
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
                <Flame size={12} /> {topThree[0]?.streak || 0} days streak
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
                <Flame size={10} /> {topThree[2]?.streak || 0} days
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Position Card */}
      {userRank && (
        <div className="p-5 bg-gradient-to-r from-primary to-primary-light rounded-xl text-white text-center mb-6">
          <div className="text-xs opacity-85 mb-1">Your Position</div>
          <div className="text-4xl font-bold flex items-center justify-center gap-2">
            {userRank.rankIcon === "🥇" ? "👑" : userRank.rankIcon} #{userRank.position}
          </div>
          <div className="text-sm opacity-90 mt-1">
            Total Saved: {userRank.totalSaved?.toLocaleString() || 0}
            {activeTab === "monthly" && userRank.tier && ` · Tier: ${userRank.tier}`}
          </div>
          <div className="text-xs opacity-75 mt-2">
            Top {userRank.percentile || ((userRank.position / statistics.totalSavers) * 100).toFixed(1)}% of savers
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-border bg-background">
          <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-foreground/60">
            <div className="col-span-1">Rank</div>
            <div className="col-span-5">Saver</div>
            <div className="col-span-3">Streak</div>
            <div className="col-span-3 text-right">Amount Saved</div>
          </div>
        </div>

        <div className="divide-y divide-border">
          {restLeaderboard.map((user, idx) => (
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
                <span className={`inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold ${getRankBadge(user.rank)}`}>
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
                    {user.name} {user.isMe && <span className="text-primary text-xs ml-1">(You)</span>}
                  </div>
                  <div className="text-[10px] text-foreground/50">{user.tier}</div>
                </div>
              </div>
              <div className="col-span-3 flex items-center gap-1">
                <Flame size={12} className="text-orange-500" />
                <span className="text-sm text-foreground">{user.streak || 0}</span>
                <span className="text-[10px] text-foreground/50">days</span>
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
          <div className="text-foreground/50">No data available</div>
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/15 rounded-lg text-center">
        <p className="text-xs text-foreground/60">
          🏆 Leaderboard updates daily based on approved deposits. 
          Keep saving to climb the ranks!
        </p>
      </div>
    </div>
  );
};

export default LeaderboardPage;