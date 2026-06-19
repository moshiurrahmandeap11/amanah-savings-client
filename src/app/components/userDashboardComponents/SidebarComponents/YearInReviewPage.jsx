"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Header
    dashboard: "Dashboard",
    yearInReview: "Year in Review",
    
    // Slide 1 - Intro
    savingsSummary: "Savings Summary",
    youveBeenAmazing: "You've been",
    amazing: "amazing",
    thisYear: "this year!",
    seeYourJourney: "see your savings journey summary for",
    totalSaved: "Total Saved",
    keepUpGreatWork: "Keep up the great work!",
    startYourJourney: "Start your savings journey today!",
    dayStreak: "Day Streak",
    goalsCompleted: "Goals Completed",
    deposits: "Deposits",
    times: "Times",
    badges: "Badges",
    earned: "Earned",
    
    // Slide 2 - Goals
    yourSavingsGoals: "Your Savings Goals",
    goalsCompletedLabel: "Goals Completed!",
    seeProgress: "See how far you've progressed in each goal",
    target: "Target",
    noGoalsYet: "No goals yet. Create your first goal to start tracking!",
    
    // Slide 3 - Streak
    savingsStreak: "Savings Streak",
    yourConsistency: "Your",
    consistency: "Consistency",
    isAmazing: "is Amazing!",
    daySavingsStreak: "Day Savings Streak",
    streakStatus: "Streak Status",
    active: "Active",
    startNow: "Start Now",
    goalsDone: "Goals Done",
    keepGoing: "Keep Going",
    neverGiveUp: "Never Give Up",
    youEarned: "🎖️ You earned",
    badgesThisYear: "badge(s) this year!",
    startEarningBadges: "🎖️ Start saving consistently to earn your first badge!",
    
    // Slide 4 - Badges
    badgesEarned: "Badges Earned",
    earnedBadges: "Earned",
    badgesThisYearLabel: "Badge(s) This Year!",
    eachBadgeRecognition: "Each badge is recognition of your effort",
    noBadgesYet: "No badges earned yet. Keep saving to unlock badges!",
    
    // Slide 5 - Rank
    yourPosition: "Your Position",
    dedicatedSaver: "Dedicated Saver!",
    topSaver: "Top Saver",
    risingStar: "Rising Star",
    amongMembers: "Among Sonchoy Bondhu members",
    goalsCompletedLabel2: "Goals Completed",
    totalDeposits: "Total Deposits",
    saverStatus: "Saver Status",
    new: "New",
    keepSaving: "Keep saving in",
    saveMore: "Save more to reach your goals 🚀",
    
    // Slide 6 - Share
    yourSavingsCard: "Your Savings Card",
    shareWithFriends: "Share with",
    friendsAndFamily: "Friends & Family!",
    summary: "Summary",
    savedThisYear: "Saved this year 💪 — Keep it up!",
    goalsComplete: "Goals Complete",
    whatsapp: "📱 WhatsApp",
    facebook: "📘 Facebook",
    instagram: "📸 Instagram",
    downloadImage: "Download Image",
    friendsWillBeInspired: "Your friends will be inspired and start too!",
    
    // Navigation
    next: "Next →",
    goToDashboard: "🏠 Go to Dashboard",
    
    // Toast
    imageSaved: "✅ Year in Review card saved!",
    shareInstagram: "📸 Download the image and share on Instagram story!",
  },
  bn: {
    // Header
    dashboard: "ড্যাশবোর্ড",
    yearInReview: "বছরের সারসংক্ষেপ",
    
    // Slide 1 - Intro
    savingsSummary: "সঞ্চয় সারসংক্ষেপ",
    youveBeenAmazing: "আপনি এই বছর",
    amazing: "অসাধারণ",
    thisYear: "ছিলেন!",
    seeYourJourney: "আপনার সঞ্চয় যাত্রার সারসংক্ষেপ দেখুন",
    totalSaved: "মোট সঞ্চয়",
    keepUpGreatWork: "শানদার কাজ চালিয়ে যান!",
    startYourJourney: "আজই আপনার সঞ্চয় যাত্রা শুরু করুন!",
    dayStreak: "দিনের ধারা",
    goalsCompleted: "লক্ষ্য পূরণ",
    deposits: "ডিপোজিট",
    times: "বার",
    badges: "ব্যাজ",
    earned: "অর্জিত",
    
    // Slide 2 - Goals
    yourSavingsGoals: "আপনার সঞ্চয় লক্ষ্য",
    goalsCompletedLabel: "লক্ষ্য পূরণ হয়েছে!",
    seeProgress: "প্রতিটি লক্ষ্যে আপনার অগ্রগতি দেখুন",
    target: "লক্ষ্য",
    noGoalsYet: "এখনো কোন লক্ষ্য নেই। ট্র্যাকিং শুরু করতে আপনার প্রথম লক্ষ্য তৈরি করুন!",
    
    // Slide 3 - Streak
    savingsStreak: "সঞ্চয় ধারা",
    yourConsistency: "আপনার",
    consistency: "ধারাবাহিকতা",
    isAmazing: "অসাধারণ!",
    daySavingsStreak: "দিনের সঞ্চয় ধারা",
    streakStatus: "ধারার অবস্থা",
    active: "সক্রিয়",
    startNow: "এখন শুরু করুন",
    goalsDone: "লক্ষ্য পূরণ",
    keepGoing: "চালিয়ে যান",
    neverGiveUp: "কখনো হার মানবেন না",
    youEarned: "🎖️ আপনি এই বছর",
    badgesThisYear: "টি ব্যাজ অর্জন করেছেন!",
    startEarningBadges: "🎖️ আপনার প্রথম ব্যাজ পেতে নিয়মিত সঞ্চয় শুরু করুন!",
    
    // Slide 4 - Badges
    badgesEarned: "অর্জিত ব্যাজ",
    earnedBadges: "অর্জিত",
    badgesThisYearLabel: "টি ব্যাজ এই বছর!",
    eachBadgeRecognition: "প্রতিটি ব্যাজ আপনার প্রচেষ্টার স্বীকৃতি",
    noBadgesYet: "এখনো কোন ব্যাজ অর্জিত হয়নি। ব্যাজ আনলক করতে সঞ্চয় চালিয়ে যান!",
    
    // Slide 5 - Rank
    yourPosition: "আপনার অবস্থান",
    dedicatedSaver: "নিবেদিত সেভার!",
    topSaver: "শীর্ষ সেভার",
    risingStar: "উদীয়মান তারকা",
    amongMembers: "সঞ্চয় বন্ধু সদস্যদের মধ্যে",
    goalsCompletedLabel2: "লক্ষ্য পূরণ",
    totalDeposits: "মোট ডিপোজিট",
    saverStatus: "সেভার অবস্থা",
    new: "নতুন",
    keepSaving: "সঞ্চয় চালিয়ে যান",
    saveMore: "আপনার লক্ষ্যে পৌঁছাতে আরও সঞ্চয় করুন 🚀",
    
    // Slide 6 - Share
    yourSavingsCard: "আপনার সঞ্চয় কার্ড",
    shareWithFriends: "বন্ধুদের সাথে",
    friendsAndFamily: "শেয়ার করুন!",
    summary: "সারাংশ",
    savedThisYear: "এই বছর সঞ্চয় করেছেন 💪 — চালিয়ে যান!",
    goalsComplete: "লক্ষ্য পূরণ",
    whatsapp: "📱 হোয়াটসঅ্যাপ",
    facebook: "📘 ফেসবুক",
    instagram: "📸 ইনস্টাগ্রাম",
    downloadImage: "ছবি ডাউনলোড করুন",
    friendsWillBeInspired: "আপনার বন্ধুরাও অনুপ্রাণিত হবে এবং শুরু করবে!",
    
    // Navigation
    next: "পরবর্তী →",
    goToDashboard: "🏠 ড্যাশবোর্ডে যান",
    
    // Toast
    imageSaved: "✅ বছরের সারসংক্ষেপ কার্ড সংরক্ষণ করা হয়েছে!",
    shareInstagram: "📸 ছবিটি ডাউনলোড করে ইনস্টাগ্রাম স্টোরিতে শেয়ার করুন!",
  }
};

const YearInReviewPage = () => {
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [goals, setGoals] = useState([]);
  const [badges, setBadges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("bn");
  const totalSlides = 6;
  const canvasRef = useRef(null);

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Derived real data (fallback to 0 / generic)
  const userName = user?.name || user?.fullName || "Saver";
  const totalSaved = user?.totalSaved || user?.goal?.currentSaved || 0;
  const streak = user?.streak || 0;
  const depositsCount = user?.depositsCount || user?.totalDeposits || 0;
  const goalsCompleted = goals.filter((g) => (g.progress || 0) >= 100).length;
  const badgesCount = badges.length;

  // Fetch real data on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");

    const savedLang = localStorage.getItem('appLanguage') || 'bn';
    setLang(savedLang);

    const fetchData = async () => {
      setLoading(true);
      try {
        const [goalsRes, achievementsRes] = await Promise.all([
          axiosInstance.get("/goals").catch(() => ({ data: { success: false } })),
          axiosInstance.get("/achievements").catch(() => ({ data: { success: false } })),
        ]);

        if (goalsRes.data.success) {
          const rawGoals = goalsRes.data.data?.goals || goalsRes.data.data || [];
          setGoals(
            rawGoals.map((g) => ({
              icon: getGoalEmoji(g.goalType || g.type || "other"),
              name: g.goalName || g.name || "Goal",
              progress: g.progress || Math.round(((g.currentSaved || 0) / (g.targetAmount || 1)) * 100) || 0,
              saved: `৳${(g.currentSaved || 0).toLocaleString()}`,
              target: `৳${(g.targetAmount || 0).toLocaleString()}`,
              status: g.status === "completed" || (g.progress || 0) >= 100 ? "Completed ✓" : "In Progress",
            }))
          );
        }

        if (achievementsRes.data.success) {
          const earned = achievementsRes.data.data?.earnedBadges || [];
          setBadges(
            earned.map((b) => `${b.emoji || "🏅"} ${b.name || "Badge"}`)
          );
        }
      } catch (error) {
        console.error("Year in Review fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Counter animation using real totalSaved
  useEffect(() => {
    if (loading) return;
    const target = totalSaved;
    if (target <= 0) {
      setCounterValue(0);
      return;
    }
    const step = target / 60;
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setCounterValue(Math.floor(current));
      if (current >= target) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, [loading, totalSaved]);

  const getGoalEmoji = (type) => {
    const map = {
      wedding: "💒",
      emergency: "🛡️",
      hajj: "🕌",
      phone: "📱",
      education: "📚",
      travel: "✈️",
      business: "💼",
      home: "🏠",
      car: "🚗",
      health: "🏥",
      other: "🎯",
    };
    return map[type?.toLowerCase()] || "🎯";
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      `আমি এই বছর Sonchoy Bondhu-এ ৳${totalSaved.toLocaleString()} জমিয়েছি! 🎉 আপনিও শুরু করুন: sanchoybondhu.com`,
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=https://sanchoybondhu.com&quote=আমার+২০২৪+সঞ্চয়+যাত্রা+দেখুন!",
      "_blank",
    );
  };

  const shareOnInstagram = () => {
    showToast(t('shareInstagram'));
    downloadImage();
  };

  const downloadImage = () => {
    showToast(t('imageSaved'));
  };

  // Particle animation for canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const slides = [
    // Slide 1 - Intro
    <div key={1} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        {t('savingsSummary')}
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-3">
        {t('youveBeenAmazing')}{" "}
        <span className="bg-linear-to-r from-primary-light to-accent bg-clip-text text-transparent">
          {t('amazing')}
        </span>{" "}
        {t('thisYear')}
      </h1>
      <p className="text-sm text-foreground/60 mb-8">
        <span className="text-primary-light font-semibold">{userName}</span>,
        {t('seeYourJourney')} 2024.
      </p>
      <div className="bg-linear-to-r from-primary to-primary-light rounded-2xl p-6 w-full mb-5">
        <div className="text-xs text-white/75 mb-1">{t('totalSaved')}</div>
        <div className="text-4xl sm:text-5xl font-bold text-white">
          ৳{counterValue.toLocaleString()}
        </div>
        <div className="text-xs text-white/70 mt-1">
          {totalSaved > 0 ? t('keepUpGreatWork') : t('startYourJourney')}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">📅</div>
          <div className="text-xl font-bold">{streak}</div>
          <div className="text-xs text-foreground/50">{t('dayStreak')}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">🎯</div>
          <div className="text-xl font-bold">{goalsCompleted}</div>
          <div className="text-xs text-foreground/50">{t('goalsCompleted')}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">💳</div>
          <div className="text-xl font-bold">{depositsCount} {t('times')}</div>
          <div className="text-xs text-foreground/50">{t('deposits')}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">🏆</div>
          <div className="text-xl font-bold">{badgesCount}</div>
          <div className="text-xs text-foreground/50">{t('badges')} {t('earned')}</div>
        </div>
      </div>
    </div>,

    // Slide 2 - Goals Progress
    <div key={2} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        {t('yourSavingsGoals')}
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        {goalsCompleted}{" "}<span className="text-primary-light">{t('goalsCompletedLabel')}</span>
      </h1>
      <p className="text-sm text-foreground/60 mb-5">
        {t('seeProgress')}
      </p>
      <div className="w-full space-y-4">
        {goals.length > 0 ? (
          goals.map((goal, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-4"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span>{goal.icon}</span> {goal.name}
                </div>
                <div className="text-sm font-bold text-primary-light">
                  {goal.progress}% {goal.progress === 100 && "✓"}
                </div>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-primary to-primary-light"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-foreground/50 mt-2">
                <span>{goal.saved}</span>
                <span>
                  {goal.progress === 100 ? goal.status : `${t('target')}: ${goal.target}`}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm text-foreground/60">{t('noGoalsYet')}</p>
          </div>
        )}
      </div>
    </div>,

    // Slide 3 - Streak
    <div key={3} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        {t('savingsStreak')}
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        {t('yourConsistency')}{" "}<span className="text-amber-500">{t('consistency')}</span> {t('isAmazing')}
      </h1>
      <div className="bg-linear-to-r from-purple-600 to-primary-light rounded-2xl p-5 flex items-center gap-4 w-full mb-5 text-left">
        <div className="text-6xl animate-pulse">🔥</div>
        <div>
          <div className="text-5xl font-bold text-white">{streak}</div>
          <div className="text-sm text-white/80">{t('daySavingsStreak')}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full mb-5">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">📆</div>
          <div className="font-bold">{streak > 0 ? t('active') : t('startNow')}</div>
          <div className="text-xs text-foreground/50">{t('streakStatus')}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">🏆</div>
          <div className="font-bold">{goalsCompleted}</div>
          <div className="text-xs text-foreground/50">{t('goalsDone')}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">✅</div>
          <div className="font-bold">{depositsCount} {t('times')}</div>
          <div className="text-xs text-foreground/50">{t('deposits')}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">❌</div>
          <div className="font-bold">{t('keepGoing')}</div>
          <div className="text-xs text-foreground/50">{t('neverGiveUp')}</div>
        </div>
      </div>
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 w-full">
        <p className="text-sm text-amber-400 text-center">
          {badgesCount > 0
            ? `${t('youEarned')} ${badgesCount} ${t('badgesThisYear')}`
            : t('startEarningBadges')}
        </p>
      </div>
    </div>,

    // Slide 4 - Badges
    <div key={4} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        {t('badgesEarned')}
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        {t('earnedBadges')}{" "}<span className="text-purple-400">{badgesCount} {t('badgesThisYearLabel')}</span>
      </h1>
      <p className="text-sm text-foreground/60 mb-5">
        {t('eachBadgeRecognition')}
      </p>
      <div className="grid grid-cols-4 gap-3 w-full">
        {badges.length > 0 ? (
          badges.map((badge, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:scale-105 transition transform"
            >
              <div className="text-2xl mb-1">{badge[0]}</div>
              <div className="text-[9px] font-medium text-foreground/60">
                {badge.slice(2)}
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-4 bg-white/5 border border-white/10 rounded-xl p-6 text-center">
            <div className="text-3xl mb-2">🏅</div>
            <p className="text-sm text-foreground/60">{t('noBadgesYet')}</p>
          </div>
        )}
      </div>
    </div>,

    // Slide 5 - Rank
    <div key={5} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        {t('yourPosition')}
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        {t('dedicatedSaver')}
      </h1>
      <div className="bg-linear-to-r from-amber-500/20 to-amber-600/10 border-2 border-amber-500/40 rounded-2xl p-5 flex items-center gap-4 w-full mb-5 text-left">
        <div className="text-6xl">🏆</div>
        <div>
          <div className="text-4xl font-bold text-amber-400">{badgesCount > 0 ? t('topSaver') : t('risingStar')}</div>
          <div className="text-sm text-white/75">{t('amongMembers')}</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full mb-5">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">🇧🇩</div>
          <div className="font-bold">{goalsCompleted}</div>
          <div className="text-xs text-foreground/50">{t('goalsCompletedLabel2')}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">🏙️</div>
          <div className="font-bold">{streak}</div>
          <div className="text-xs text-foreground/50">{t('dayStreak')}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">👥</div>
          <div className="font-bold">{depositsCount}</div>
          <div className="text-xs text-foreground/50">{t('totalDeposits')}</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">💫</div>
          <div className="font-bold">{badgesCount > 0 ? t('active') : t('new')}</div>
          <div className="text-xs text-foreground/50">{t('saverStatus')}</div>
        </div>
      </div>
      <div className="bg-primary/20 border border-primary/30 rounded-xl p-4 text-center w-full">
        <p className="text-sm text-foreground/60 mb-1">
          {t('keepSaving')} 2025
        </p>
        <p className="text-sm font-bold text-primary-light">
          {t('saveMore')}
        </p>
      </div>
    </div>,

    // Slide 6 - Share Card
    <div key={6} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        {t('yourSavingsCard')}
      </div>
      <h1 className="text-xl sm:text-2xl font-bold mb-2">
        {t('shareWithFriends')}{" "}<span className="text-primary-light">{t('friendsAndFamily')}</span>
      </h1>
      <div className="bg-linear-to-r from-primary to-primary-light via-purple-600 rounded-2xl p-5 w-full mb-5 text-white text-left">
        <div className="flex justify-between items-start mb-4">
          <div className="text-xs font-semibold">🌿 Sonchoy Bondhu</div>
          <div className="text-[10px] bg-white/20 px-2 py-1 rounded-full">
            2024 {t('summary')}
          </div>
        </div>
        <div className="text-lg font-bold mb-1">{userName}</div>
        <div className="text-3xl font-bold mb-2">৳{totalSaved.toLocaleString()}</div>
        <div className="text-xs mb-4">{t('savedThisYear')}</div>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
            <div className="text-base font-bold">{streak}</div>
            <div className="text-[9px] opacity-75">{t('dayStreak')}</div>
          </div>
          <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
            <div className="text-base font-bold">{goalsCompleted}</div>
            <div className="text-[9px] opacity-75">{t('goalsComplete')}</div>
          </div>
          <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
            <div className="text-base font-bold">{badgesCount}</div>
            <div className="text-[9px] opacity-75">{t('badges')}</div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 w-full mb-3">
        <button
          onClick={shareOnWhatsApp}
          className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold"
        >
          {t('whatsapp')}
        </button>
        <button
          onClick={shareOnFacebook}
          className="flex-1 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold"
        >
          {t('facebook')}
        </button>
        <button
          onClick={shareOnInstagram}
          className="flex-1 py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white text-sm font-bold"
        >
          {t('instagram')}
        </button>
      </div>
      <button
        onClick={downloadImage}
        className="w-full py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm font-bold flex items-center justify-center gap-2"
      >
        <Download size={16} /> {t('downloadImage')}
      </button>
      <p className="text-xs text-foreground/50 mt-3">
        {t('friendsWillBeInspired')}
      </p>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Back Bar */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> {t('dashboard')}
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">
          {t('yearInReview')}
        </span>
      </div>

      {/* Slides */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              {slides[currentSlide - 1]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-background/90 backdrop-blur-xl border-t border-white/10 p-4">
        <div className="flex justify-center gap-2 mb-3">
          {[...Array(totalSlides)].map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${currentSlide === i + 1 ? "w-6 bg-primary-light" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="w-11 h-11 rounded-full bg-white/10 border border-white/15 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>
          {currentSlide === totalSlides ? (
            <button
              onClick={goToDashboard}
              className="px-6 py-2 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold"
            >
              {t('goToDashboard')}
            </button>
          ) : (
            <button
              onClick={nextSlide}
              className="px-6 py-2 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold"
            >
              {t('next')}
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YearInReviewPage;