"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState("may2026");

  const quickLinks = [
    { name: "🏅 Challenges", href: "/dashboard/challenges" },
    { name: "🧱 Savings Wall", href: "/dashboard/savings-wall" },
    { name: "📡 Live Feed", href: "/dashboard/live-feed" },
    { name: "⭐ Success Stories", href: "/dashboard/success-stories" }
  ];

  const leaderboardData = {
    may2026: [
      { rank: "🥇", name: "Rahima Khatun", streak: "192 days", tier: "Gold", amount: "৳1,24,000", avatar: "R", color: "from-amber-500 to-orange-500", isMe: false },
      { rank: "🥈", name: "Karim Ahmed", streak: "145 days", tier: "Silver", amount: "৳98,500", avatar: "K", color: "from-gray-400 to-gray-500", isMe: false },
      { rank: "🌟", name: "Fatema Akter (You)", streak: "90 days", tier: "Gold", amount: "৳87,000", avatar: "F", color: "from-primary to-primary-light", isMe: true },
      { rank: "4", name: "Nasrin Begum", streak: "78 days", tier: "Silver", amount: "৳72,000", avatar: "N", color: "from-purple-500 to-indigo-500", isMe: false },
      { rank: "5", name: "Mohammad Hasan", streak: "65 days", tier: "Bronze", amount: "৳65,500", avatar: "M", color: "from-primary to-primary-light", isMe: false },
      { rank: "6", name: "Sumaiya Islam", streak: "55 days", tier: "Bronze", amount: "৳58,000", avatar: "S", color: "from-pink-500 to-rose-500", isMe: false },
      { rank: "7", name: "Anwar Hossain", streak: "48 days", tier: "Bronze", amount: "৳52,000", avatar: "A", color: "from-cyan-500 to-blue-500", isMe: false },
      { rank: "8", name: "Tahmina Akter", streak: "38 days", tier: "Bronze", amount: "৳45,000", avatar: "T", color: "from-amber-600 to-orange-600", isMe: false }
    ],
    allTime: [
      { rank: "🥇", name: "Rahima Khatun", streak: "450 days", tier: "Platinum", amount: "৳5,80,000", avatar: "R", color: "from-amber-500 to-orange-500", isMe: false },
      { rank: "🥈", name: "Karim Ahmed", streak: "320 days", tier: "Gold", amount: "৳3,50,000", avatar: "K", color: "from-gray-400 to-gray-500", isMe: false },
      { rank: "🥉", name: "Nasrin Begum", streak: "280 days", tier: "Gold", amount: "৳2,90,000", avatar: "N", color: "from-purple-500 to-indigo-500", isMe: false },
      { rank: "4", name: "Fatema Akter (You)", streak: "250 days", tier: "Gold", amount: "৳2,45,000", avatar: "F", color: "from-primary to-primary-light", isMe: true },
      { rank: "5", name: "Mohammad Hasan", streak: "210 days", tier: "Silver", amount: "৳2,10,000", avatar: "M", color: "from-primary to-primary-light", isMe: false }
    ]
  };

  const currentData = leaderboardData[activeTab];
  const userRank = currentData.find(item => item.isMe);
  const rankNumber = userRank?.rank === "🥇" ? "1" : userRank?.rank === "🥈" ? "2" : userRank?.rank === "🥉" ? "3" : userRank?.rank === "🌟" ? "3" : userRank?.rank || "4";

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Quick Links */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-2xl font-bold text-foreground">🏆 Leaderboard</h2>
        <div className="flex gap-2 flex-wrap">
          {quickLinks.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground/70 text-xs font-semibold hover:border-primary hover:text-primary transition"
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-background rounded-xl p-1 border border-border mb-6">
        <button
          onClick={() => setActiveTab("may2026")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
            activeTab === "may2026"
              ? "bg-card text-foreground shadow-sm"
              : "text-foreground/50 hover:text-primary"
          }`}
        >
          May 2026
        </button>
        <button
          onClick={() => setActiveTab("allTime")}
          className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
            activeTab === "allTime"
              ? "bg-card text-foreground shadow-sm"
              : "text-foreground/50 hover:text-primary"
          }`}
        >
          All Time
        </button>
      </div>

      {/* User Position Card */}
      <div className="p-5 bg-linear-to-r from-primary to-primary-light rounded-xl text-white text-center mb-6">
        <div className="text-xs opacity-85 mb-1">Your Position</div>
        <div className="text-4xl font-bold">🌟 #{rankNumber}</div>
        <div className="text-sm opacity-90 mt-1">
          {activeTab === "may2026" 
            ? "This month: ৳87,000 saved · Top 5%" 
            : "Total: ৳2,45,000 saved · Top 10%"}
        </div>
      </div>

      {/* Leaderboard List */}
      <div className="space-y-2">
        {currentData.map((user, idx) => (
          <motion.div
            key={idx}
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
            <div className={`w-9 h-9 rounded-full bg-linear-to-r ${user.color} flex items-center justify-center text-white font-bold text-sm shrink-0`}>
              {user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm text-foreground">{user.name}</div>
              <div className="text-xs text-foreground/50 flex items-center gap-1">
                🔥 {user.streak} · {user.tier}
              </div>
            </div>
            <div className="font-bold text-sm text-primary whitespace-nowrap">{user.amount}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default LeaderboardPage;