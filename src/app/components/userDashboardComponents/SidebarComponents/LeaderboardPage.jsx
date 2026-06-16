"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2, Trophy, TrendingUp, Users } from "lucide-react";
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

  const getRankDisplay = (rank) => {
    if (rank === "🥇") return "1st";
    if (rank === "🥈") return "2nd";
    if (rank === "🥉") return "3rd";
    return `${rank}th`;
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

  return (
    <div className="max-w-7xl mx-auto">

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-primary" />
            <span className="text-xs text-foreground/50">Total Savers</span>
          </div>
          <div className="text-xl font-bold text-foreground">{statistics.totalSavers}</div>
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
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
            activeTab === "monthly"
              ? "bg-card text-foreground shadow-sm"
              : "text-foreground/50 hover:text-primary"
          }`}
        >
          {activeTab === "monthly" ? `📅 ${getMonthName(period.month)} ${period.year}` : "Monthly"}
        </button>
        <button
          onClick={() => setActiveTab("allTime")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
            activeTab === "allTime"
              ? "bg-card text-foreground shadow-sm"
              : "text-foreground/50 hover:text-primary"
          }`}
        >
          🏆 All Time
        </button>
      </div>

      {/* User Position Card */}
      {userRank && (
        <div className="p-5 bg-linear-to-r from-primary to-primary-light rounded-xl text-white text-center mb-6">
          <div className="text-xs opacity-85 mb-1">Your Position</div>
          <div className="text-4xl font-bold">
            {userRank.rankIcon} #{userRank.position}
          </div>
          <div className="text-sm opacity-90 mt-1">
            Total Saved: ৳{userRank.totalSaved?.toLocaleString() || 0}
            {activeTab === "monthly" && ` · Tier: ${userRank.tier}`}
          </div>
          <div className="text-xs opacity-75 mt-2">
            Top {((userRank.position / statistics.totalSavers) * 100).toFixed(1)}% of savers
          </div>
        </div>
      )}

      {/* Leaderboard List */}
      <div className="space-y-2">
        {leaderboardData.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <div className="text-4xl mb-3">🏆</div>
            <div className="text-foreground/50">No data available</div>
          </div>
        ) : (
          leaderboardData.map((user, idx) => (
            <motion.div
              key={user.userId || idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ scale: 1.01 }}
              className={`flex items-center gap-3 p-3 rounded-xl border transition ${
                user.isMe
                  ? "border-primary bg-primary/5"
                  : "border-border bg-card hover:border-primary/40"
              }`}
            >
              <span className="text-2xl w-10 text-center">{user.rank}</span>
              {user.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={user.name}
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
              ) : (
                <div className={`w-9 h-9 rounded-full bg-linear-to-r ${user.tierColor || "from-primary to-primary-light"} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
                  {user.avatar}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground">
                  {user.name} {user.isMe && <span className="text-primary text-xs ml-1">(You)</span>}
                </div>
                <div className="text-xs text-foreground/50 flex items-center gap-2">
                  <span>🔥 {user.streak || 0} days streak</span>
                  <span>· {user.tier}</span>
                  {user.depositCount && <span>· {user.depositCount} deposits</span>}
                </div>
              </div>
              <div className="font-bold text-sm text-primary whitespace-nowrap">{user.amount}</div>
            </motion.div>
          ))
        )}
      </div>

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