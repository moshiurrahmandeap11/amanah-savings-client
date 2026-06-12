"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Trophy,
  Lock,
  Star,
  Award,
  Flame,
  Users,
  Gift,
  Crown,
  Rocket,
  Target,
  Diamond,
  Globe,
} from "lucide-react";

const AchievementsPage = () => {
  const [hoveredBadge, setHoveredBadge] = useState(null);

  const stats = [
    {
      icon: "🏅",
      value: "6",
      label: "Badges Earned",
      color: "green",
      bg: "bg-primary/10",
    },
    {
      icon: "🔒",
      value: "6",
      label: "Locked Badges",
      color: "blue",
      bg: "bg-blue-500/10",
    },
    {
      icon: "⭐",
      value: "1,450",
      label: "Total Points",
      color: "warning",
      bg: "bg-amber-500/10",
    },
    {
      icon: "🌟",
      value: "7",
      label: "Level",
      color: "info",
      bg: "bg-cyan-500/10",
    },
  ];

  const earnedBadges = [
    {
      emoji: "🔥",
      name: "90-Day Streak",
      desc: "90 consecutive days",
      requirement: "90 days streak",
      progress: null,
    },
    {
      emoji: "🌟",
      name: "Super Saver",
      desc: "৳2L saved",
      requirement: "Total savings ৳2,00,000",
      progress: null,
    },
    {
      emoji: "🤝",
      name: "Referral Hero",
      desc: "5+ referrals",
      requirement: "5 friends referred",
      progress: null,
    },
    {
      emoji: "🏆",
      name: "Top Saver",
      desc: "Top 5 monthly",
      requirement: "Monthly top 5",
      progress: null,
    },
    {
      emoji: "🌙",
      name: "Ramadan Saver",
      desc: "Active in Ramadan",
      requirement: "Ramadan challenge",
      progress: null,
    },
    {
      emoji: "💎",
      name: "Gold Member",
      desc: "Level 7 achieved",
      requirement: "Reach Level 7",
      progress: null,
    },
  ];

  const lockedBadges = [
    {
      emoji: "💫",
      name: "100-Day Streak",
      desc: "10 more days to go",
      requirement: "100 days streak",
      progress: 90,
      target: 100,
    },
    {
      emoji: "👑",
      name: "Circle Leader",
      desc: "Create a circle",
      requirement: "Create a savings circle",
      progress: 0,
      target: 1,
    },
    {
      emoji: "🚀",
      name: "Goal Master",
      desc: "Complete 3 goals",
      requirement: "3 goals completed",
      progress: 1,
      target: 3,
    },
    {
      emoji: "🎯",
      name: "Target Hit",
      desc: "Complete a goal",
      requirement: "Reach any goal target",
      progress: 0,
      target: 1,
    },
    {
      emoji: "🦁",
      name: "Diamond Saver",
      desc: "Level 10 required",
      requirement: "Reach Level 10",
      progress: 7,
      target: 10,
    },
    {
      emoji: "🌍",
      name: "Community Hero",
      desc: "15+ referrals",
      requirement: "15 friends referred",
      progress: 7,
      target: 15,
    },
  ];

  const quickLinks = [
    { icon: "⬆️", label: "Level Up Guide", href: "/dashboard/levelup" },
    { icon: "🎊", label: "Milestone", href: "/dashboard/milestone" },
    { icon: "🏅", label: "Share Badge", href: "/dashboard/badge-share" },
    {
      icon: "📋",
      label: "Transparency Report",
      href: "/dashboard/transparency",
    },
  ];

  const getStatColorClass = (color) => {
    switch (color) {
      case "green":
        return "border-t-primary";
      case "blue":
        return "border-t-blue-500";
      case "warning":
        return "border-t-amber-500";
      case "info":
        return "border-t-cyan-500";
      default:
        return "border-t-primary";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5">
        🎖️ Achievements & Badges
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-card border border-border rounded-xl p-4 hover:shadow-lg transition border-t-4 ${getStatColorClass(stat.color)}`}
          >
            <div
              className={`w-11 h-11 rounded-xl ${stat.bg} flex items-center justify-center text-xl mb-3`}
            >
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Earned Badges */}
      <div className="bg-card border border-border rounded-xl p-5 mb-5">
        <div className="font-bold text-foreground mb-4 flex items-center gap-2">
          ✅ Badges Earned
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {earnedBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              onMouseEnter={() => setHoveredBadge(badge.name)}
              onMouseLeave={() => setHoveredBadge(null)}
              className="text-center p-3 rounded-xl bg-background hover:bg-primary/5 transition cursor-pointer"
            >
              <div className="text-3xl mb-1">{badge.emoji}</div>
              <div className="text-xs font-bold text-foreground">
                {badge.name}
              </div>
              <div className="text-[10px] text-foreground/50 mt-1">
                {badge.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Locked Badges */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="font-bold text-foreground mb-4 flex items-center gap-2">
          🔒 Unlock More
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
          {lockedBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className="text-center p-3 rounded-xl bg-background opacity-60 grayscale cursor-not-allowed"
            >
              <div className="text-3xl mb-1">{badge.emoji}</div>
              <div className="text-xs font-bold text-foreground">
                {badge.name}
              </div>
              <div className="text-[10px] text-foreground/50 mt-1">
                {badge.desc}
              </div>
              {badge.progress && (
                <div className="mt-2">
                  <div className="h-1 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full"
                      style={{
                        width: `${(badge.progress / badge.target) * 100}%`,
                      }}
                    />
                  </div>
                  <div className="text-[8px] text-foreground/40 mt-1">
                    {badge.progress}/{badge.target}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-wrap gap-3 mt-5">
        {quickLinks.map((link, idx) => (
          <Link
            key={idx}
            href={link.href}
            className="px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm font-semibold hover:border-primary hover:text-primary transition"
          >
            {link.icon} {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AchievementsPage;
