"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, TrendingUp, Users, Award, Zap, Play, Pause } from "lucide-react";

const LiveFeedPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [paused, setPaused] = useState(false);
  const [feedItems, setFeedItems] = useState([]);
  const [currentFilter, setCurrentFilter] = useState("all");
  const [stats, setStats] = useState({
    members: 47284,
    todayDeposits: 1247,
    amountToday: 4567890,
    goalsToday: 89,
    activeNow: 342,
    depositHour: 234000,
    goalsHour: 15,
    newToday: 38,
  });

  const intervalRef = useRef(null);
  let itemId = useRef(0);

  const names = [
    "Rahima B.",
    "Kamal H.",
    "Nasrin A.",
    "Farhan R.",
    "Sumaiya I.",
    "Arif H.",
    "Fatema K.",
    "Shakil A.",
    "Riya C.",
    "Moshiur R.",
    "Nusrat J.",
    "Tanvir H.",
    "Ayesha S.",
    "Rahim U.",
    "Bilkis B.",
  ];
  const cities = [
    { bn: "ঢাকা", en: "Dhaka" },
    { bn: "চট্টগ্রাম", en: "Chittagong" },
    { bn: "সিলেট", en: "Sylhet" },
    { bn: "রাজশাহী", en: "Rajshahi" },
    { bn: "খুলনা", en: "Khulna" },
    { bn: "বরিশাল", en: "Barisal" },
    { bn: "ময়মনসিংহ", en: "Mymensingh" },
    { bn: "রংপুর", en: "Rangpur" },
    { bn: "কুমিল্লা", en: "Cumilla" },
  ];
  const goals = [
    { bn: "💒 বিবাহ তহবিল", en: "💒 Wedding Fund" },
    { bn: "🕌 হজ সঞ্চয়", en: "🕌 Hajj Savings" },
    { bn: "🎓 শিক্ষা তহবিল", en: "🎓 Education Fund" },
    { bn: "🛡️ জরুরি তহবিল", en: "🛡️ Emergency Fund" },
    { bn: "📱 গ্যাজেট লক্ষ্য", en: "📱 Gadget Goal" },
    { bn: "💼 ব্যবসা শুরু", en: "💼 Business Startup" },
    { bn: "🏠 বাড়ির তহবিল", en: "🏠 Home Fund" },
    { bn: "✈️ ভ্রমণ তহবিল", en: "✈️ Travel Fund" },
  ];
  const badgeNames = [
    { bn: "🔥 ৩০ দিনের স্ট্রিক", en: "🔥 30-Day Streak" },
    { bn: "💎 ডায়মন্ড সেভার", en: "💎 Diamond Saver" },
    { bn: "🥇 প্রথম লক্ষ্য", en: "🥇 First Goal" },
    { bn: "🚀 লক্ষ্য চ্যাম্পিয়ন", en: "🚀 Goal Crusher" },
    { bn: "⭐ সেরা ৫% সেভার", en: "⭐ Top 5% Saver" },
    { bn: "🕌 হজ সেভার", en: "🕌 Hajj Saver" },
  ];
  const amounts = [500, 1000, 1500, 2000, 2500, 3000, 5000, 7500, 10000];
  const avatarColors = [
    "#059669",
    "#0891b2",
    "#7c3aed",
    "#f59e0b",
    "#ef4444",
    "#ec4899",
    "#06b6d4",
    "#84cc16",
  ];

  const randItem = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randInt = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min;

  const generateEvent = useCallback(() => {
    const types = ["deposit", "goal_complete", "badge", "join", "streak"];
    const weights = [50, 10, 15, 15, 10];
    const total = weights.reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    let typeIndex = 0;
    for (let i = 0; i < types.length; i++) {
      r -= weights[i];
      if (r <= 0) {
        typeIndex = i;
        break;
      }
    }
    const type = types[typeIndex];
    const name = randItem(names);
    const city = randItem(cities);
    const goal = randItem(goals);
    const amount = randItem(amounts);
    const badgeName = randItem(badgeNames);
    const days = randInt(30, 365);
    const initial = name[0].toUpperCase();
    const color = randItem(avatarColors);
    const badgeClass = {
      deposit: "bg-primary/15 text-primary",
      goal_complete: "bg-amber-500/15 text-amber-500",
      badge: "bg-purple-500/15 text-purple-500",
      join: "bg-blue-500/15 text-blue-500",
      streak: "bg-red-500/15 text-red-500",
    }[type];
    return {
      id: ++itemId.current,
      type,
      name,
      city,
      goal,
      amount,
      badgeName,
      days,
      initial,
      color,
      badge: badgeClass,
      ageMin: 0,
    };
  }, []);

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
              `<strong>${item.name}</strong> (<span class="text-xs text-foreground/50">${item.city[lang]}</span>) - <span class="text-accent font-semibold">${item.goal[lang]}</span>-এ <span class="text-primary font-bold">৳${item.amount.toLocaleString()}</span> জমা দিয়েছেন`,
            goal_complete: (item) =>
              `<strong>${item.name}</strong> তার <span class="text-accent font-semibold">${item.goal[lang]}</span> সম্পন্ন করেছেন! <strong class="text-amber-500">অভিনন্দন! 🎉</strong>`,
            badge: (item) =>
              `<strong>${item.name}</strong> "<span class="text-purple-600 font-bold">${item.badgeName[lang]}</span>" ব্যাজ অর্জন করেছেন!`,
            join: (item) =>
              `<strong>${item.name}</strong> (<span class="text-foreground/50">${item.city[lang]}</span>) Amanah-তে <strong>নতুন সদস্য</strong> হিসেবে যোগ দিয়েছেন!`,
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
              `<strong>${item.name}</strong> (<span class="text-xs text-foreground/50">${item.city[lang]}</span>) added <span class="text-primary font-bold">৳${item.amount.toLocaleString()}</span> to <span class="text-accent font-semibold">${item.goal[lang]}</span>`,
            goal_complete: (item) =>
              `<strong>${item.name}</strong> completed <span class="text-accent font-semibold">${item.goal[lang]}</span>! <strong class="text-amber-500">Congratulations! 🎉</strong>`,
            badge: (item) =>
              `<strong>${item.name}</strong> earned the "<span class="text-purple-600 font-bold">${item.badgeName[lang]}</span>" badge!`,
            join: (item) =>
              `<strong>${item.name}</strong> (<span class="text-foreground/50">${item.city[lang]}</span>) joined Amanah as a <strong>new member</strong>!`,
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
    item.ageMin
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
          onClick={() => showNotification(item)}
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
              📍 {item.city[lang]} · {timeLabel(item)}
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

  const showNotification = (item) => {
    const icons = {
      deposit: "💰",
      goal_complete: "🎯",
      badge: "🏆",
      join: "👋",
      streak: "🔥",
    };
    const plainText = getText("eventText")
      [item.type](item)
      .replace(/<[^>]+>/g, "");
    // Toast notification handled by component state
    alert(
      `${icons[item.type]} ${getText("badges")[item.type]}: ${plainText.substring(0, 70)}`,
    );
  };

  const addNewEvent = useCallback(() => {
    if (paused) return;
    const newEvent = generateEvent();
    setFeedItems((prev) => {
      const newItems = [newEvent, ...prev];
      return newItems.slice(0, 30);
    });
    // Update stats
    setStats((prev) => ({
      ...prev,
      members: prev.members + (Math.random() < 0.3 ? 1 : 0),
      todayDeposits: prev.todayDeposits + 1,
      amountToday: prev.amountToday + randInt(500, 5000),
      goalsToday: Math.random() < 0.1 ? prev.goalsToday + 1 : prev.goalsToday,
      activeNow: Math.max(300, prev.activeNow + randInt(-5, 8)),
      depositHour: prev.depositHour + randInt(1000, 5000),
      goalsHour: Math.random() < 0.05 ? prev.goalsHour + 1 : prev.goalsHour,
      newToday: Math.random() < 0.1 ? prev.newToday + 1 : prev.newToday,
    }));
  }, [paused, generateEvent]);

  useEffect(() => {
    const initialItems = [];
    for (let i = 0; i < 12; i++) {
      const item = generateEvent();
      item.ageMin = randInt(1, 60);
      initialItems.push(item);
    }
    setFeedItems(initialItems);

    intervalRef.current = setInterval(addNewEvent, 2500);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [generateEvent, addNewEvent]);

  const filteredItems = feedItems.filter(
    (item) => currentFilter === "all" || item.type === currentFilter,
  );

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
              {filteredItems.map((item) => renderFeedItem(item))}
            </AnimatePresence>
          </div>
          <div className="p-4 text-center border-t border-border">
            <button className="px-6 py-2 rounded-full bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold hover:opacity-90 transition">
              {getText("loadMore")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveFeedPage;
