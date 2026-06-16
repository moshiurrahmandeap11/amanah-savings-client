"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, TrendingUp, Users, Award, Zap, Play, Pause } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import useSocket from "../../../hooks/useSocket";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000api";

const LiveFeedPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [paused, setPaused] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [stats, setStats] = useState({
    members: 0,
    todayDeposits: 0,
    amountToday: 0,
    goalsToday: 0,
    activeNow: 0,
    depositHour: 0,
    goalsHour: 0,
    newToday: 0,
  });
  const [loading, setLoading] = useState(true);

  const intervalRef = useRef(null);

  // Get user ID for socket
  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUserId(parsed._id || parsed.id);
    }
  }, []);

  // Socket for real-time deposit/goal events
  const { notifications } = useSocket(userId, "user");

  // Fetch public stats from API
  const fetchStats = useCallback(async () => {
    try {
      const res = await axiosInstance.get("/admin/dashboard");
      if (res.data.success) {
        const s = res.data.data.stats || {};
        setStats({
          members: s.totalUsers || 0,
          todayDeposits: s.todayDeposits || 0,
          amountToday: s.todayDepositsAmount || 0,
          goalsToday: s.activeGoals || 0,
          activeNow: s.activeUsers || 0,
          depositHour: Math.round((s.todayDepositsAmount || 0) / 24),
          goalsHour: Math.round((s.activeGoals || 0) / 24),
          newToday: s.newUsersToday || 0,
        });
      }
    } catch (err) {
      console.error("Live feed stats error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch recent activity feed
  const fetchFeed = useCallback(async () => {
    try {
      const [depositsRes, goalsRes] = await Promise.all([
        axiosInstance.get("/deposits?limit=20&status=approved").catch(() => ({ data: { success: false } })),
        axiosInstance.get("/goals?limit=20").catch(() => ({ data: { success: false } })),
      ]);

      const items = [];

      if (depositsRes.data.success) {
        const deposits = depositsRes.data.data?.deposits || depositsRes.data.data || [];
        deposits.slice(0, 10).forEach((d) => {
          items.push({
            id: `dep_${d._id || d.id || Math.random()}`,
            type: "deposit",
            name: d.userName || d.fullName || "Member",
            city: { bn: "বাংলাদেশ", en: "Bangladesh" },
            goal: { bn: `💰 ${d.goalName || "সঞ্চয়"}`, en: `💰 ${d.goalName || "Savings"}` },
            amount: d.amount || d.depositAmount || 1000,
            badgeName: "",
            days: 0,
            initial: (d.userName || d.fullName || "M")[0]?.toUpperCase() || "M",
            color: "#059669",
            badge: "bg-primary/15 text-primary",
            ageMin: Math.floor((Date.now() - new Date(d.createdAt || Date.now()).getTime()) / 60000),
          });
        });
      }

      if (goalsRes.data.success) {
        const goals = goalsRes.data.data?.goals || goalsRes.data.data || [];
        goals.filter((g) => g.progress >= 100).slice(0, 5).forEach((g) => {
          items.push({
            id: `goal_${g._id || g.id || Math.random()}`,
            type: "goal_complete",
            name: g.userName || "Member",
            city: { bn: "বাংলাদেশ", en: "Bangladesh" },
            goal: { bn: `🎯 ${g.goalName || "লক্ষ্য"}`, en: `🎯 ${g.goalName || "Goal"}` },
            amount: g.targetAmount || 0,
            badgeName: "",
            days: 0,
            initial: (g.userName || "M")[0]?.toUpperCase() || "M",
            color: "#f59e0b",
            badge: "bg-amber-500/15 text-amber-500",
            ageMin: Math.floor((Date.now() - new Date(g.updatedAt || Date.now()).getTime()) / 60000),
          });
        });
      }

      // Sort by most recent, limit to 30
      items.sort((a, b) => (a.ageMin || 0) - (b.ageMin || 0));
      setFeedItems(items.slice(0, 30));
    } catch (err) {
      console.error("Live feed fetch error:", err);
    }
  }, []);

  // Add real-time socket notification as feed item
  useEffect(() => {
    if (notifications.length > 0) {
      const lastNotif = notifications[notifications.length - 1];
      if (lastNotif.type === "deposit" || lastNotif.type === "milestone") {
        const newItem = {
          id: `socket_${Date.now()}`,
          type: lastNotif.type === "deposit" ? "deposit" : "goal_complete",
          name: "Member",
          city: { bn: "বাংলাদেশ", en: "Bangladesh" },
          goal: { bn: "💰 সঞ্চয়", en: "💰 Savings" },
          amount: lastNotif.metadata?.amount || 1000,
          badgeName: "",
          days: 0,
          initial: "M",
          color: "#059669",
          badge: "bg-primary/15 text-primary",
          ageMin: 0,
        };
        setFeedItems((prev) => [newItem, ...prev].slice(0, 30));
      }
    }
  }, [notifications]);

  useEffect(() => {
    fetchStats();
    fetchFeed();

    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");

    // Refresh feed every 30 seconds
    intervalRef.current = setInterval(() => {
      if (!paused) fetchFeed();
    }, 30000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchStats, fetchFeed, paused]);

  const getText = useCallback(
    (key, params = {}) => {
      const texts = {
        bn: {
          title: "লাইভ ফিড",
          live: "লাইভ",
          totalMembers: "মোট সদস্য",
          todayDeposits: "আজকের জমা",
          todaySaved: "আজ জমেছে",
          todayGoals: "আজকের লক্ষ্য সম্পন্ন",
          activeNow: "এখন সক্রিয়",
          lastHour: "গত ১ ঘন্টায়",
          goalsCompleteToday: "আজ লক্ষ্য সম্পন্ন",
          newMembersToday: "আজ নতুন সদস্য",
          feedTitle: "লাইভ কার্যক্রম",
          loadMore: "আরও দেখুন ↓",
          filters: {
            all: "সব",
            deposit: "💰 জমা",
            goal_complete: "🎯 লক্ষ্য",
            badge: "🏆 ব্যাজ",
            join: "👋 যোগদান",
            streak: "🔥 স্ট্রিক",
          },
          badges: {
            deposit: "💰 জমা",
            goal_complete: "🎯 লক্ষ্য সম্পন্ন",
            badge: "🏆 ব্যাজ",
            join: "👋 নতুন সদস্য",
            streak: "🔥 স্ট্রিক",
          },
          eventText: {
            deposit: (item) =>
              `<strong>${item.name}</strong> - <span class="text-accent font-semibold">${item.goal[lang]}</span>-এ <span class="text-primary font-bold">৳${item.amount.toLocaleString()}</span> জমা দিয়েছেন`,
            goal_complete: (item) =>
              `<strong>${item.name}</strong> তার <span class="text-accent font-semibold">${item.goal[lang]}</span> সম্পন্ন করেছেন! <strong class="text-amber-500">অভিনন্দন! 🎉</strong>`,
            badge: (item) =>
              `<strong>${item.name}</strong> "<span class="text-purple-600 font-bold">${item.badgeName}</span>" ব্যাজ অর্জন করেছেন!`,
            join: (item) =>
              `<strong>${item.name}</strong> Sanchoy Bondhu-তে <strong>নতুন সদস্য</strong> হিসেবে যোগ দিয়েছেন!`,
            streak: (item) =>
              `<strong>${item.name}</strong> টানা <strong class="text-red-500">${item.days} দিনের</strong> সঞ্চয় স্ট্রিক বজায় রাখছেন! 🔥`,
          },
          timeNow: "এইমাত্র",
          minutesAgo: (n) => `${n} মিনিট আগে`,
        },
        en: {
          title: "Live Feed",
          live: "LIVE",
          totalMembers: "Total members",
          todayDeposits: "Today's deposits",
          todaySaved: "Saved today",
          todayGoals: "Goals completed today",
          activeNow: "Active now",
          lastHour: "In the last hour",
          goalsCompleteToday: "Goals completed today",
          newMembersToday: "New members today",
          feedTitle: "Live Activity Feed",
          loadMore: "Load more ↓",
          filters: {
            all: "All",
            deposit: "💰 Deposit",
            goal_complete: "🎯 Goal",
            badge: "🏆 Badge",
            join: "👋 Join",
            streak: "🔥 Streak",
          },
          badges: {
            deposit: "💰 Deposit",
            goal_complete: "🎯 Goal Done",
            badge: "🏆 Badge",
            join: "👋 New Member",
            streak: "🔥 Streak",
          },
          eventText: {
            deposit: (item) =>
              `<strong>${item.name}</strong> added <span class="text-primary font-bold">৳${item.amount.toLocaleString()}</span> to <span class="text-accent font-semibold">${item.goal[lang]}</span>`,
            goal_complete: (item) =>
              `<strong>${item.name}</strong> completed <span class="text-accent font-semibold">${item.goal[lang]}</span>! <strong class="text-amber-500">Congratulations! 🎉</strong>`,
            badge: (item) =>
              `<strong>${item.name}</strong> earned the "<span class="text-purple-600 font-bold">${item.badgeName}</span>" badge!`,
            join: (item) =>
              `<strong>${item.name}</strong> joined Sanchoy Bondhu as a <strong>new member</strong>!`,
            streak: (item) =>
              `<strong>${item.name}</strong> is keeping a <strong class="text-red-500">${item.days} day</strong> savings streak alive! 🔥`,
          },
          timeNow: "Just now",
          minutesAgo: (n) => `${n} min ago`,
        },
      };
      if (params.n) return texts[lang][key](params.n);
      return texts[lang][key] || key;
    },
    [lang],
  );

  const timeLabel = (item) =>
    item.ageMin > 0
      ? getText("minutesAgo", { n: item.ageMin })
      : getText("timeNow");

  const renderFeedItem = useCallback(
    (item) => {
      const eventText = getText("eventText")[item.type](item);
      return (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex items-center gap-3 p-3 border-b border-border hover:bg-secondary/20 transition cursor-pointer"
        >
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shrink-0"
            style={{ background: item.color }}
          >
            {item.initial}
          </div>
          <div className="flex-1 min-w-0">
            <div
              className="text-sm text-foreground/80"
              dangerouslySetInnerHTML={{ __html: eventText }}
            />
            <div className="text-xs text-foreground/50 mt-1">
              {timeLabel(item)}
            </div>
          </div>
          <div
            className={`px-2 py-1 rounded-full text-[10px] font-semibold whitespace-nowrap ${item.badge}`}
          >
            {getText("badges")[item.type]}
          </div>
        </motion.div>
      );
    },
    [getText, lang, timeLabel],
  );

  const filteredItems = feedItems.filter(
    (item) => currentFilter === "all" || item.type === currentFilter,
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p className="text-foreground/60">Loading live feed...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-primary to-primary-light py-12 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
          {getText("title")}
        </h1>
        <p className="text-white/85 text-sm">
          বাংলাদেশ জুড়ে হাজারো মানুষ একসাথে সঞ্চয় করছে — লাইভ দেখুন!
        </p>
      </div>

      {/* Live Counter Banner */}
      <div className="bg-linear-to-r from-primary to-primary-light px-4 py-5 flex flex-wrap justify-center gap-6">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 border border-white/30">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white text-xs font-bold">
            {getText("live")}
          </span>
        </div>
        <div className="text-center">
          <div className="text-white text-2xl font-bold">
            {stats.members.toLocaleString()}
          </div>
          <div className="text-white/75 text-[11px]">
            {getText("totalMembers")}
          </div>
        </div>
        <div className="text-center">
          <div className="text-white text-2xl font-bold">
            {stats.todayDeposits.toLocaleString()}
          </div>
          <div className="text-white/75 text-[11px]">
            {getText("todayDeposits")}
          </div>
        </div>
        <div className="text-center">
          <div className="text-white text-2xl font-bold">
            ৳{stats.amountToday.toLocaleString()}
          </div>
          <div className="text-white/75 text-[11px]">
            {getText("todaySaved")}
          </div>
        </div>
        <div className="text-center">
          <div className="text-white text-2xl font-bold">
            🎯 {stats.goalsToday}
          </div>
          <div className="text-white/75 text-[11px]">
            {getText("todayGoals")}
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">🔥</div>
            <div className="text-2xl font-bold text-foreground">
              {stats.activeNow}
            </div>
            <div className="text-xs text-foreground/50">
              {getText("activeNow")}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">💰</div>
            <div className="text-2xl font-bold text-foreground">
              ৳{stats.depositHour.toLocaleString()}
            </div>
            <div className="text-xs text-foreground/50">
              {getText("lastHour")}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">🏆</div>
            <div className="text-2xl font-bold text-foreground">
              {stats.goalsHour}
            </div>
            <div className="text-xs text-foreground/50">
              {getText("goalsCompleteToday")}
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-3xl mb-1">👥</div>
            <div className="text-2xl font-bold text-foreground">
              {stats.newToday}
            </div>
            <div className="text-xs text-foreground/50">
              {getText("newMembersToday")}
            </div>
          </div>
        </div>
      </div>

      {/* Feed Section */}
      <div className="max-w-4xl mx-auto px-4 pb-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_0_3px_rgba(5,150,105,0.2)]" />
            <span className="font-bold text-foreground">
              {getText("feedTitle")}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(getText("filters")).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setCurrentFilter(key)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${currentFilter === key ? "border-primary bg-primary/10 text-primary" : "border-border bg-card text-foreground/60 hover:border-primary"}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="divide-y divide-border">
            <AnimatePresence>
              {filteredItems.length === 0 ? (
                <div className="p-8 text-center text-foreground/50">
                  <div className="text-4xl mb-2">📭</div>
                  <div>{lang === "bn" ? "কোন কার্যক্রম পাওয়া যায়নি" : "No activity yet"}</div>
                </div>
              ) : (
                filteredItems.map((item) => renderFeedItem(item))
              )}
            </AnimatePresence>
          </div>
          <div className="p-4 text-center border-t border-border">
            <button
              onClick={fetchFeed}
              className="px-6 py-2 rounded-full bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold hover:opacity-90 transition"
            >
              {getText("loadMore")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeedPage;
