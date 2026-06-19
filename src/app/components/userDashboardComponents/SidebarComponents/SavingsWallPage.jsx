"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2 } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Hero
    pageTitle: "🌿 Savings Wall",
    pageSubtitle: "See what your community is saving for. Share your goal anonymously and inspire others. Every dream matters!",
    
    // Compose
    shareYourGoal: "✍️ Share your savings goal",
    composePlaceholder: "What are you saving for? e.g., 'InshaAllah saving for Hajj in 2027 🕌'",
    anonymous: "Anonymous",
    showName: "Show name",
    postToWall: "🌿 Post to Wall",
    
    // Filters
    allGoals: "🌿 All Goals",
    hajjUmrah: "🕌 Hajj/Umrah",
    travel: "✈️ Travel",
    education: "🎓 Education",
    home: "🏡 Home",
    milestones: "🎉 Milestones",
    
    // Post Labels
    progress: "Progress",
    support: "Support",
    progressBar: "Progress Bar",
    encourage: "Encourage",
    share: "Share",
    linkCopied: "🔗 Link copied!",
    
    // Toast Messages
    writeMore: "⚠️ Please write a bit more (at least 10 characters)",
    posted: "🌿 Your goal has been posted to the Savings Wall!",
    encouragement: "❤️ Your encouragement will give them strength!",
    randomEncouragement1: "💪 Great! You can do it!",
    randomEncouragement2: "🌿 Stay committed to your goal!",
    randomEncouragement3: "⭐ Amazing saving mindset!",
    randomEncouragement4: "🔥 Keep going!",
    
    // Empty State
    noPosts: "No posts yet. Be the first to share your savings goal!",
    
    // Loading
    loading: "Loading...",
    
    // Post Labels
    goalLabel: "Goal",
    anonymousUser: "Anonymous",
    
    // Location
    location: "Location",
    
    // Time
    justNow: "Just now",
    minutesAgo: "{m}m ago",
    hoursAgo: "{h}h ago",
    daysAgo: "{d}d ago",
    recently: "Recently",
    
    // Emoji Labels
    hajjLabel: "Hajj/Umrah",
    travelLabel: "Travel",
    educationLabel: "Education",
    techLabel: "Tech",
    homeLabel: "Home",
    weddingLabel: "Wedding",
    vehicleLabel: "Vehicle",
    businessLabel: "Business",
    healthcareLabel: "Healthcare",
    otherLabel: "Other",
  },
  bn: {
    // Hero
    pageTitle: "🌿 সঞ্চয় ওয়াল",
    pageSubtitle: "আপনার কমিউনিটি কী জন্য সঞ্চয় করছে তা দেখুন। বেনামে আপনার লক্ষ্য শেয়ার করুন এবং অন্যদের অনুপ্রাণিত করুন। প্রতিটি স্বপ্ন গুরুত্বপূর্ণ!",
    
    // Compose
    shareYourGoal: "✍️ আপনার সঞ্চয়ের লক্ষ্য শেয়ার করুন",
    composePlaceholder: "আপনি কী জন্য সঞ্চয় করছেন? যেমন: 'ইনশাআল্লাহ ২০২৭ সালে হজ্জ করার জন্য সঞ্চয় করছি 🕌'",
    anonymous: "বেনামে",
    showName: "নাম দেখান",
    postToWall: "🌿 ওয়ালে পোস্ট করুন",
    
    // Filters
    allGoals: "🌿 সব লক্ষ্য",
    hajjUmrah: "🕌 হজ/ওমরাহ",
    travel: "✈️ ভ্রমণ",
    education: "🎓 শিক্ষা",
    home: "🏡 ঘর",
    milestones: "🎉 মাইলফলক",
    
    // Post Labels
    progress: "অগ্রগতি",
    support: "সাপোর্ট",
    progressBar: "অগ্রগতি বার",
    encourage: "উৎসাহ দিন",
    share: "শেয়ার",
    linkCopied: "🔗 লিংক কপি করা হয়েছে!",
    
    // Toast Messages
    writeMore: "⚠️ অনুগ্রহ করে একটু বেশি লিখুন (কমপক্ষে ১০ অক্ষর)",
    posted: "🌿 আপনার লক্ষ্য সঞ্চয় ওয়ালে পোস্ট হয়েছে!",
    encouragement: "❤️ আপনার অনুপ্রেরণা তাকে শক্তি দেবে!",
    randomEncouragement1: "💪 দারুণ! আপনি পারবেন!",
    randomEncouragement2: "🌿 লক্ষ্যে অবিচল থাকুন!",
    randomEncouragement3: "⭐ অসাধারণ সঞ্চয় মনোভাব!",
    randomEncouragement4: "🔥 চালিয়ে যান!",
    
    // Empty State
    noPosts: "কোন পোস্ট নেই। প্রথম আপনার সঞ্চয় লক্ষ্য শেয়ার করুন!",
    
    // Loading
    loading: "লোড হচ্ছে...",
    
    // Post Labels
    goalLabel: "লক্ষ্য",
    anonymousUser: "নাম প্রকাশে অনিচ্ছুক",
    
    // Location
    location: "অবস্থান",
    
    // Time
    justNow: "এইমাত্র",
    minutesAgo: "{m} মিনিট আগে",
    hoursAgo: "{h} ঘণ্টা আগে",
    daysAgo: "{d} দিন আগে",
    recently: "সম্প্রতি",
    
    // Emoji Labels
    hajjLabel: "হজ/ওমরাহ",
    travelLabel: "ভ্রমণ",
    educationLabel: "শিক্ষা",
    techLabel: "টেক",
    homeLabel: "ঘর",
    weddingLabel: "বিয়ে",
    vehicleLabel: "গাড়ি",
    businessLabel: "ব্যবসা",
    healthcareLabel: "স্বাস্থ্যসেবা",
    otherLabel: "অন্যান্য",
  }
};

const SavingsWallPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [selectedEmoji, setSelectedEmoji] = useState("🕌");
  const [postText, setPostText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [wallPosts, setWallPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState({});
  const [tickerItems, setTickerItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
  }, []);

  const emojis = [
    { emoji: "🕌", label: t('hajjLabel') },
    { emoji: "✈️", label: t('travelLabel') },
    { emoji: "🎓", label: t('educationLabel') },
    { emoji: "📱", label: t('techLabel') },
    { emoji: "🏡", label: t('homeLabel') },
    { emoji: "💍", label: t('weddingLabel') },
    { emoji: "🚗", label: t('vehicleLabel') },
    { emoji: "💼", label: t('businessLabel') },
    { emoji: "🏥", label: t('healthcareLabel') },
    { emoji: "🌟", label: t('otherLabel') },
  ];

  const filters = [
    { id: "all", label: t('allGoals') },
    { id: "hajj", label: t('hajjUmrah') },
    { id: "travel", label: t('travel') },
    { id: "education", label: t('education') },
    { id: "home", label: t('home') },
    { id: "milestone", label: t('milestones') },
  ];

  const getGoalEmoji = (goalType) => {
    const map = {
      hajj: "🕌",
      umrah: "🕌",
      travel: "✈️",
      education: "🎓",
      tech: "📱",
      home: "🏡",
      wedding: "💍",
      vehicle: "🚗",
      business: "💼",
      healthcare: "🏥",
    };
    return map[goalType?.toLowerCase()] || "🌟";
  };

  const getGoalColor = (goalType) => {
    const map = {
      hajj: "from-purple-700 to-indigo-900",
      umrah: "from-purple-700 to-indigo-900",
      travel: "from-amber-500 to-red-500",
      education: "from-cyan-600 to-primary",
      tech: "from-indigo-600 to-cyan-600",
      home: "from-primary to-primary-light",
      wedding: "from-pink-500 to-amber-500",
      vehicle: "from-blue-600 to-cyan-600",
      business: "from-amber-600 to-primary",
      healthcare: "from-teal-600 to-cyan-600",
    };
    return map[goalType?.toLowerCase()] || "from-primary to-primary-light";
  };

  const getGoalColorHex = (goalType) => {
    const map = {
      hajj: "#a78bfa",
      umrah: "#a78bfa",
      travel: "#fbbf24",
      education: "#34d399",
      tech: "#a5b4fc",
      home: "#34d399",
      wedding: "#f9a8d4",
      vehicle: "#93c5fd",
      business: "#fcd34d",
      healthcare: "#5eead4",
    };
    return map[goalType?.toLowerCase()] || "#34d399";
  };

  const timeAgo = (dateString) => {
    if (!dateString) return t('recently');
    const now = new Date();
    const then = new Date(dateString);
    const diffMs = now - then;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return t('justNow');
    if (diffMins < 60) return t('minutesAgo', { m: diffMins });
    if (diffHours < 24) return t('hoursAgo', { h: diffHours });
    if (diffDays < 30) return t('daysAgo', { d: diffDays });
    return t('recently');
  };

  const fetchWallData = useCallback(async () => {
    setLoading(true);
    try {
      const [goalsRes, depositsRes] = await Promise.all([
        axiosInstance.get("/goals?limit=20").catch(() => ({ data: { success: false } })),
        axiosInstance.get("/deposits?limit=20&status=approved").catch(() => ({ data: { success: false } })),
      ]);

      const posts = [];
      const tickers = [];

      // Build wall posts from goals
      if (goalsRes.data.success) {
        const goals = goalsRes.data.data?.goals || goalsRes.data.data || [];
        goals.forEach((g) => {
          const emoji = getGoalEmoji(g.goalType || g.type || "other");
          const progress = g.progress || Math.round(((g.currentSaved || 0) / (g.targetAmount || 1)) * 100) || 0;
          posts.push({
            id: `goal_${g._id || g.id || Math.random()}`,
            emoji,
            user: g.userName || t('anonymousUser'),
            location: g.location || "Bangladesh",
            time: timeAgo(g.createdAt || g.updatedAt),
            message: g.description || `Saving for ${g.goalName || g.name || "a goal"}`,
            goal: g.goalName || g.name || t('goalLabel'),
            progress: Math.min(progress, 100),
            likes: g.likes || Math.floor(Math.random() * 50),
            bg: getGoalColor(g.goalType || g.type || "other"),
            color: getGoalColorHex(g.goalType || g.type || "other"),
          });
        });
      }

      // Build ticker from recent deposits
      if (depositsRes.data.success) {
        const deposits = depositsRes.data.data?.deposits || depositsRes.data.data || [];
        deposits.slice(0, 5).forEach((d) => {
          const name = d.userName || d.fullName || "A member";
          const amount = d.amount || d.depositAmount || 0;
          const goalName = d.goalName || "savings";
          tickers.push(`${name} deposited ৳${amount.toLocaleString()} toward ${goalName}`);
        });
      }

      setWallPosts(posts);
      setTickerItems(tickers);
    } catch (err) {
      console.error("SavingsWall fetch error:", err);
      setWallPosts([]);
      setTickerItems([]);
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    fetchWallData();
  }, [fetchWallData]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const handleLike = (postId, currentLikes) => {
    if (likedPosts[postId]) {
      setWallPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes: p.likes - 1 } : p)),
      );
      setLikedPosts((prev) => ({ ...prev, [postId]: false }));
    } else {
      setWallPosts((prev) =>
        prev.map((p) => (p.id === postId ? { ...p, likes: p.likes + 1 } : p)),
      );
      setLikedPosts((prev) => ({ ...prev, [postId]: true }));
      showToast(t('encouragement'));
    }
  };

  const handleEncourage = () => {
    const messages = [
      t('randomEncouragement1'),
      t('randomEncouragement2'),
      t('randomEncouragement3'),
      t('randomEncouragement4'),
    ];
    showToast(messages[Math.floor(Math.random() * messages.length)]);
  };

  const handlePost = () => {
    if (postText.length < 10) {
      showToast(t('writeMore'));
      return;
    }

    const newPost = {
      id: Date.now(),
      emoji: selectedEmoji,
      user: isAnonymous ? t('anonymousUser') : "আপনি",
      location: "Dhaka",
      time: t('justNow'),
      message: postText,
      goal: t('goalLabel'),
      progress: 5,
      likes: 0,
      bg: "from-primary to-primary-light",
      color: "#34d399",
    };

    setWallPosts((prev) => [newPost, ...prev]);
    setPostText("");
    showToast(t('posted'));
  };

  const filteredPosts = wallPosts.filter((post) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "hajj") return post.emoji === "🕌";
    if (activeFilter === "travel") return post.emoji === "✈️";
    if (activeFilter === "education") return post.emoji === "🎓";
    if (activeFilter === "home") return post.emoji === "🏡";
    if (activeFilter === "milestone")
      return post.goal.includes("Milestone") || post.goal.includes("Streak");
    return true;
  });

  return (
    <div className="min-h-screen bg-background overflow-x-hidden w-full">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-primary to-primary-light py-16 text-center relative overflow-hidden w-full">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[200px] md:text-[300px] font-bold text-white/5 leading-none">
            🌿
          </span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            {t('pageTitle')}
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto">
            {t('pageSubtitle')}
          </p>
        </div>
      </div>

      {/* Live Ticker - hidden if no real data */}
      {tickerItems.length > 0 && (
        <div className="bg-black/15 backdrop-blur-sm py-3 w-full">
          <div className="flex items-center gap-3 px-4">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse shrink-0" />
            <span className="text-xs font-bold text-white/60 shrink-0">LIVE</span>
            <div className="flex-1 overflow-hidden">
              <marquee
                behavior="scroll"
                direction="left"
                scrollamount="3"
                className="text-xs text-white/85"
                onMouseEnter={(e) => e.target.stop()}
                onMouseLeave={(e) => e.target.start()}
              >
                {tickerItems.map((item, idx) => (
                  <span key={idx} className="mx-4">
                    {item}
                  </span>
                ))}
                {/* Duplicate for seamless loop */}
                {tickerItems.map((item, idx) => (
                  <span key={`dup-${idx}`} className="mx-4">
                    {item}
                  </span>
                ))}
              </marquee>
            </div>
          </div>
        </div>
      )}

      {/* Compose Section */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2 text-base">
            {t('shareYourGoal')}
          </div>
          <div className="flex gap-2 flex-wrap mb-4">
            {emojis.map((item) => (
              <button
                key={item.emoji}
                onClick={() => setSelectedEmoji(item.emoji)}
                className={`w-10 h-10 rounded-xl border-2 transition flex items-center justify-center text-xl ${
                  selectedEmoji === item.emoji
                    ? "border-primary bg-primary/10 scale-110"
                    : "border-border hover:border-primary"
                }`}
                title={item.label}
              >
                {item.emoji}
              </button>
            ))}
          </div>
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value.slice(0, 200))}
            rows={3}
            maxLength={200}
            placeholder={t('composePlaceholder')}
            className="w-full p-3 rounded-xl border border-border bg-surface2 text-foreground outline-none focus:border-primary transition resize-none text-sm"
          />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-3">
            <div className="text-xs text-foreground/50">
              {postText.length}/200
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                <div
                  onClick={() => setIsAnonymous(!isAnonymous)}
                  className={`relative w-9 h-5 rounded-full transition cursor-pointer ${isAnonymous ? "bg-primary" : "bg-border"}`}
                >
                  <div
                    className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition ${isAnonymous ? "left-4" : "left-0.5"}`}
                  />
                </div>
                <span className="text-sm">
                  {isAnonymous ? t('anonymous') : t('showName')}
                </span>
              </label>
              <button
                onClick={handlePost}
                className="px-5 py-2 bg-linear-to-r from-primary to-primary-light text-white rounded-lg font-semibold text-sm"
              >
                {t('postToWall')}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-6xl mx-auto px-4 mt-6">
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border-2 transition ${
                activeFilter === filter.id
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Wall Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-12 text-foreground/50">{t('loading')}</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🌿</div>
            <div className="text-lg font-semibold text-foreground/70">
              {t('noPosts')}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnimatePresence>
              {filteredPosts.map((post, idx) => (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: Math.min(idx * 0.05, 0.5) }}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="p-4 flex items-start gap-3">
                    <div
                      className={`w-14 h-14 rounded-full bg-linear-to-r ${post.bg} flex items-center justify-center text-white text-xl shrink-0`}
                    >
                      {post.emoji}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground wrap-break-word">
                        👤 {post.user}
                      </div>
                      <div className="text-xs text-foreground/50 wrap-break-word">
                        📍 {post.location}
                      </div>
                      <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                        {post.emoji} {post.goal}
                      </div>
                    </div>
                    <div className="text-xs text-foreground/40 shrink-0">
                      {post.time}
                    </div>
                  </div>
                  <div className="px-4 pb-3">
                    <div className="text-sm text-foreground/70 leading-relaxed wrap-break-word italic">
                      &quot;{post.message}&quot;
                    </div>
                  </div>
                  <div className="bg-surface2 p-3 flex">
                    <div className="flex-1 text-center">
                      <div className="text-base font-bold text-primary">
                        {post.progress}%
                      </div>
                      <div className="text-[10px] text-foreground/50 font-semibold">
                        {t('progress')}
                      </div>
                    </div>
                    <div className="flex-1 text-center border-l border-border">
                      <div className="text-base font-bold text-primary">
                        {post.likes}
                      </div>
                      <div className="text-[10px] text-foreground/50 font-semibold">
                        {t('support')}
                      </div>
                    </div>
                    <div className="flex-1 text-center border-l border-border">
                      <div className="text-base font-bold text-primary pt-2">
                        <div className="h-1.5 w-full bg-surface2 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-linear-to-r ${post.bg}`}
                            style={{ width: `${post.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-[10px] text-foreground/50 font-semibold mt-1">
                        {t('progressBar')}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 p-3 border-t border-border">
                    <button
                      onClick={() => handleLike(post.id, post.likes)}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1 ${
                        likedPosts[post.id]
                          ? "bg-primary/10 text-primary"
                          : "bg-surface2 text-foreground/60 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      <Heart
                        size={14}
                        fill={likedPosts[post.id] ? "#ef4444" : "none"}
                      />
                      {likedPosts[post.id] ? post.likes + 1 : post.likes}
                    </button>
                    <button
                      onClick={handleEncourage}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold bg-surface2 text-foreground/60 hover:bg-primary/10 hover:text-primary transition flex items-center justify-center gap-1"
                    >
                      <span>💪</span>
                      {t('encourage')}
                    </button>
                    <button
                      onClick={() => showToast(t('linkCopied'))}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold bg-linear-to-r from-primary to-primary-light text-white flex items-center justify-center gap-1"
                    >
                      <Share2 size={14} />
                      {t('share')}
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
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

export default SavingsWallPage;