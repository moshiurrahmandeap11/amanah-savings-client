"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Chart from "chart.js/auto";
import useAuth from "../../../hooks/useAuth";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import {
  User,
  Wallet,
  Flame,
  Trophy,
  TrendingUp,
  Calendar,
  Target,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
  DollarSign,
  CreditCard,
  Send,
  RefreshCw,
  Shield,
  Mail,
  Phone,
  Users,
  Gift,
  Copy,
  Award,
  XCircle,
  Heart,
  Star,
  GraduationCap,
  Smartphone,
  Car,
  Briefcase,
  Plane,
  Banknote,
} from "lucide-react";

// Translations
const translations = {
  en: {
    // Dashboard
    dashboard: "Dashboard",
    loadingDashboard: "Loading dashboard...",
    
    // Header
    goodMorning: "Good Morning",
    goodAfternoon: "Good Afternoon", 
    goodEvening: "Good Evening",
    nextDepositDue: "Your next deposit is due in",
    days: "days",
    keepStreakAlive: "Keep your streak alive!",
    
    // Quick Actions
    deposit: "Deposit",
    withdraw: "Withdraw",
    transfer: "Transfer",
    autoSave: "Auto-Save",
    
    // Balance Cards
    totalBalance: "Total Balance",
    totalWithdrawal: "Total Withdrawal",
    referralBonus: "Referral Bonus",
    available: "Available",
    earned: "Earned",
    withdrawn: "Withdrawn",
    withdrawReferral: "Withdraw Referral Bonus",
    noReferralBonus: "No referral bonus available",
    referralBonusDesc: "Bonus earned from referring friends",
    totalBalanceDesc: "Your total savings balance",
    totalWithdrawalDesc: "Total amount withdrawn",
    
    // Stats
    totalSavings: "Total Savings",
    activeCircles: "Active Circles",
    dayStreak: "Day Streak",
    saverLevel: "Saver Level",
    startSavingToday: "Start saving today!",
    joinCircle: "Join a circle!",
    topSaver: "Top saver!",
    keepGoing: "Keep going!",
    startYourStreak: "Start your streak!",
    member: "Member",
    thisMonth: "This Month",
    
    // Savings Hero
    totalSavingsBalance: "Total Savings Balance",
    goal: "Goal",
    complete: "Complete",
    saved: "Saved",
    remaining: "Remaining",
    thisMonthLabel: "This Month",
    totalSavedLabel: "Total Saved",
    dayStreakLabel: "Day Streak",
    
    // Chart
    savingsHistory: "Savings History",
    
    // Goals
    mySavingsGoals: "My Savings Goals",
    viewAll: "View all",
    loadingGoals: "Loading goals...",
    noGoalsYet: "No goals yet",
    createFirstGoal: "Create your first savings goal to get started",
    createGoal: "Create Goal",
    active: "Active",
    paused: "Paused",
    inProgress: "In progress",
    
    // Transactions
    recentTransactions: "Recent Transactions",
    viewAllTransactions: "View all",
    noTransactions: "No transactions yet",
    pending: "Pending",
    rejected: "Rejected",
    approved: "Approved",
    
    // AI Assistant
    aiAssistant: "Sanchoy Bondhu AI Assistant",
    askAboutSavings: "Ask about savings...",
    send: "Send",
    
    // Goal Progress
    goalProgress: "Goal Progress",
    details: "Details",
    noGoalsForProgress: "No goals yet. Create one to see progress!",
    
    // KYC Status
    verificationStatus: "Verification Status",
    emailVerified: "Email Verified",
    phoneVerified: "Phone Verified",
    kycVerified: "KYC Verified",
    profilePicture: "Profile Picture",
    verificationSteps: "verification steps completed",
    completeVerification: "Complete Verification →",
    
    // Referral
    referAndEarn: "Refer & Earn",
    referBonus: "Get ৳500 bonus for each friend who joins and makes their first deposit.",
    copy: "Copy",
    friendsReferred: "Friends Referred",
    bonusEarned: "Bonus Earned",
    referralLinkCopied: "Referral link copied!",
    
    // Savings Plan
    yourSavingsPlan: "Your Savings Plan",
    currentPlan: "Current Plan",
    memberSince: "Member Since",
    totalSavedPlan: "Total Saved",
    currentLevel: "Current Level",
    
    // Greeting Fallback
    user: "User",
    
    // Alerts
    error: "Error",
    failedToFetch: "Failed to fetch data",
  },
  bn: {
    // Dashboard
    dashboard: "ড্যাশবোর্ড",
    loadingDashboard: "ড্যাশবোর্ড লোড হচ্ছে...",
    
    // Header
    goodMorning: "সুপ্রভাত",
    goodAfternoon: "শুভ অপরাহ্ন",
    goodEvening: "শুভ সন্ধ্যা",
    nextDepositDue: "আপনার পরবর্তী জমা বাকি আছে",
    days: "দিন",
    keepStreakAlive: "আপনার স্ট্রিক বজায় রাখুন!",
    
    // Quick Actions
    deposit: "জমা করেছেন",
    withdraw: "তোলার অনুরোধ",
    transfer: "ট্রান্সফার",
    autoSave: "অটো-সেভ",
    
    // Balance Cards
    totalBalance: "মোট ব্যালেন্স",
    totalWithdrawal: "মোট উত্তোলন",
    referralBonus: "রেফারেল বোনাস",
    available: "উপলব্ধ",
    earned: "অর্জিত",
    withdrawn: "উত্তোলিত",
    withdrawReferral: "রেফারেল বোনাস উত্তোলন করুন",
    noReferralBonus: "কোন রেফারেল বোনাস উপলব্ধ নেই",
    referralBonusDesc: "বন্ধুদের রেফার করার মাধ্যমে অর্জিত বোনাস",
    totalBalanceDesc: "আপনার মোট সঞ্চয় ব্যালেন্স",
    totalWithdrawalDesc: "মোট উত্তোলিত পরিমাণ",
    
    // Stats
    totalSavings: "মোট সঞ্চয়",
    activeCircles: "সক্রিয় সার্কেল",
    dayStreak: "দিনের স্ট্রিক",
    saverLevel: "সেভার লেভেল",
    startSavingToday: "আজই সঞ্চয় শুরু করুন!",
    joinCircle: "একটি সার্কেলে যোগ দিন!",
    topSaver: "শীর্ষ সেভার!",
    keepGoing: "চালিয়ে যান!",
    startYourStreak: "আপনার স্ট্রিক শুরু করুন!",
    member: "সদস্য",
    thisMonth: "এই মাস",
    
    // Savings Hero
    totalSavingsBalance: "মোট সঞ্চয় ব্যালেন্স",
    goal: "লক্ষ্য",
    complete: "সম্পূর্ণ",
    saved: "সঞ্চিত",
    remaining: "বাকি",
    thisMonthLabel: "এই মাস",
    totalSavedLabel: "মোট সঞ্চয়",
    dayStreakLabel: "দিনের স্ট্রিক",
    
    // Chart
    savingsHistory: "সঞ্চয়ের ইতিহাস",
    
    // Goals
    mySavingsGoals: "আমার সঞ্চয় লক্ষ্য",
    viewAll: "সব দেখুন",
    loadingGoals: "লক্ষ্য লোড হচ্ছে...",
    noGoalsYet: "কোন লক্ষ্য নেই",
    createFirstGoal: "শুরু করতে আপনার প্রথম সঞ্চয় লক্ষ্য তৈরি করুন",
    createGoal: "লক্ষ্য তৈরি করুন",
    active: "সক্রিয়",
    paused: "বিরতি",
    inProgress: "চলমান",
    
    // Transactions
    recentTransactions: "সাম্প্রতিক লেনদেন",
    viewAllTransactions: "সব দেখুন",
    noTransactions: "কোন লেনদেন নেই",
    pending: "বিচারাধীন",
    rejected: "বাতিল",
    approved: "অনুমোদিত",
    
    // AI Assistant
    aiAssistant: "সঞ্চয় বন্ধু এআই সহায়ক",
    askAboutSavings: "সঞ্চয় সম্পর্কে জিজ্ঞাসা করুন...",
    send: "পাঠান",
    
    // Goal Progress
    goalProgress: "লক্ষ্যের অগ্রগতি",
    details: "বিস্তারিত",
    noGoalsForProgress: "কোন লক্ষ্য নেই। অগ্রগতি দেখতে একটি তৈরি করুন!",
    
    // KYC Status
    verificationStatus: "যাচাইকরণ অবস্থা",
    emailVerified: "ইমেইল যাচাইকৃত",
    phoneVerified: "ফোন যাচাইকৃত",
    kycVerified: "কেওয়াইসি যাচাইকৃত",
    profilePicture: "প্রোফাইল ছবি",
    verificationSteps: "যাচাইকরণ ধাপ সম্পন্ন",
    completeVerification: "যাচাইকরণ সম্পন্ন করুন →",
    
    // Referral
    referAndEarn: "রেফার করুন ও উপার্জন করুন",
    referBonus: "প্রতিটি বন্ধু যারা যোগ দেয় এবং প্রথম জমা করে তাদের জন্য ৳৫০০ বোনাস পান।",
    copy: "কপি",
    friendsReferred: "রেফার করা বন্ধু",
    bonusEarned: "অর্জিত বোনাস",
    referralLinkCopied: "রেফারেল লিংক কপি করা হয়েছে!",
    
    // Savings Plan
    yourSavingsPlan: "আপনার সঞ্চয় পরিকল্পনা",
    currentPlan: "বর্তমান পরিকল্পনা",
    memberSince: "সদস্য থেকে",
    totalSavedPlan: "মোট সঞ্চয়",
    currentLevel: "বর্তমান লেভেল",
    
    // Greeting Fallback
    user: "ব্যবহারকারী",
    
    // Alerts
    error: "ত্রুটি",
    failedToFetch: "ডেটা আনতে ব্যর্থ হয়েছে",
  }
};

const dashboardColorScope =
  "min-h-screen bg-background text-foreground [--background:#f1f5f9] [--foreground:#0f172a] [--card:#ffffff] [--card-hover:#f1f5f9] [--border:#e2e8f0] [--primary:#059669] [--primary-hover:#047857] [--primary-light:#10b981] dark:[--background:#0a0f1e] dark:[--foreground:#f1f5f9] dark:[--card:#131e2e] dark:[--card-hover:#1e2d3d] dark:[--border:#1e2d3d] dark:[--primary:#059669] dark:[--primary-hover:#047857] dark:[--primary-light:#10b981]";

const DashboardPage = () => {
  const { user: authUser, isLoading: authLoading } = useAuth();
  const router = useRouter();
  
  const [greeting, setGreeting] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [aiMessages, setAiMessages] = useState([]);
  const [chartPeriod, setChartPeriod] = useState("6m");
  const [userGoals, setUserGoals] = useState([]);
  const [userCircles, setUserCircles] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [userData, setUserData] = useState(null);
  const [savingsHistory, setSavingsHistory] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [approvedDepositDates, setApprovedDepositDates] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  const [lang, setLang] = useState("en");
  const [balanceSummary, setBalanceSummary] = useState(null);
  const [loadingBalance, setLoadingBalance] = useState(true);
  
  const chartRef = useRef(null);
  let savingsChart = useRef(null);

  // Translation function
  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
  }, []);

  const userId = authUser?.id || authUser?._id;
  
  // Fetch complete user data
  const fetchUserData = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axiosInstance.get(`/users/${userId}`);
      if (res.data.success) {
        setUserData(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, [userId]);

  // Fetch user goals
  const fetchGoals = useCallback(async () => {
    if (!userId) return;
    setLoadingGoals(true);
    try {
      const res = await axiosInstance.get("/goals/my");
      if (res.data.success) {
        const goals = res.data.data?.goals || res.data.data || [];
        // Filter out "Referral Bonus" goals - they should not be shown as user goals
        const filteredGoals = goals.filter((g) => {
          const name = g.goalName || g.name || "";
          const type = g.goalType || g.type || "";
          return name !== "Referral Bonus" && type !== "bonus";
        });
        setUserGoals(
          filteredGoals.map((g) => ({
            id: g._id || g.id || String(Math.random()),
            _id: g._id || g.id,
            icon: getGoalIcon(g.goalType || g.type || "other"),
            name: g.goalName || g.name || "Savings Goal",
            status: g.status || "active",
            timeLeft: calculateTimeLeft(g),
            savedAmount: safeNumber(g.currentSaved || g.currentAmount, 0),
            targetAmount: safeNumber(g.targetAmount, 0),
            saved: formatCurrency(safeNumber(g.currentSaved || g.currentAmount, 0)),
            target: formatCurrency(safeNumber(g.targetAmount, 0)),
            progress: calculateProgress(g),
            color: getGoalColor(g.goalType || g.type || "other"),
            monthlyDeposit: safeNumber(g.monthlyDeposit, 0),
          }))
        );
      }
    } catch (error) {
      console.error("Failed to fetch goals:", error);
      setUserGoals([]);
    } finally {
      setLoadingGoals(false);
    }
  }, [userId]);

  const fetchCircles = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axiosInstance.get("/circles?limit=100");
      if (res.data.success) {
        const circles = res.data.data?.circles || res.data.data || [];
        setUserCircles(circles);
      }
    } catch (error) {
      console.error("Failed to fetch circles:", error);
      setUserCircles([]);
    }
  }, [userId]);

  // Fetch insights from backend or generate
  const fetchInsights = useCallback(async () => {
    if (!userData) return;
    
    const insightsList = [];
    
    const totalSaved = userGoals.reduce((sum, goal) => sum + Number(goal.savedAmount || 0), 0);
    const streak = Math.max(
      Number(userData?.streak || userData?.dayStreak || userData?.currentStreak || 0),
      calculateDayStreak(approvedDepositDates),
    );
    const activeGoals = userGoals.filter((goal) => goal.status === "active").length;
    const monthlyDeposit = userGoals.reduce((sum, goal) => goal.status === "active" ? sum + Number(goal.monthlyDeposit || 0) : sum, 0);
    const targetAmount = userGoals.reduce((sum, goal) => sum + Number(goal.targetAmount || 0), 0);
    
    if (totalSaved > 0) {
      insightsList.push({
        text: `You've saved ${formatCurrency(totalSaved)} so far! ${targetAmount > 0 ? `That's ${Math.round((totalSaved / targetAmount) * 100)}% of your goal.` : "Great progress!"}`,
        isBot: true,
        isHighlight: totalSaved > 50000,
      });
    }
    
    if (streak > 0) {
      insightsList.push({
        text: `You're on a ${streak}-day savings streak! ${streak >= 30 ? "Outstanding consistency!" : "Keep it going!"}`,
        isBot: true,
        isHighlight: streak >= 30,
      });
    }
    
    if (monthlyDeposit > 0) {
      insightsList.push({
        text: `Your monthly commitment is ${formatCurrency(monthlyDeposit)}. ${monthlyDeposit >= 10000 ? "That's impressive!" : "Every deposit counts toward your goal!"}`,
        isBot: true,
        isHighlight: monthlyDeposit >= 10000,
      });
    }
    
    if (activeGoals === 0) {
      insightsList.push({
        text: "Create your first savings goal to start your journey! Click 'Create Goal' to get started.",
        isBot: true,
        isHighlight: true,
      });
    }
    
    if (insightsList.length === 0) {
      insightsList.push({
        text: "Welcome to Sonchoy Bondhu! Start by creating a goal or making your first deposit.",
        isBot: true,
        isHighlight: true,
      });
    }
    
    setInsights(insightsList);
  }, [userData, userGoals, approvedDepositDates]);

  // Fetch savings history for chart
  const fetchSavingsHistory = useCallback(async () => {
    if (!userId) return;
    try {
      const res = await axiosInstance.get(`/users/${userId}/savings-history`);
      if (res.data.success) {
        setSavingsHistory(res.data.data || []);
      } else {
        generateDemoHistory();
      }
    } catch (error) {
      console.error("Failed to fetch savings history:", error);
      generateDemoHistory();
    }
  }, [userId]);

  const generateDemoHistory = () => {
    const totalSaved = userGoals.reduce((sum, goal) => sum + Number(goal.savedAmount || 0), 0);
    if (totalSaved === 0) {
      setSavingsHistory([]);
      return;
    }
    
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const currentMonth = new Date().getMonth();
    const history = [];
    
    for (let i = 5; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const value = Math.round(totalSaved * (0.1 + Math.random() * 0.2) * (i + 1) / 6);
      history.push({
        month: months[monthIndex],
        amount: Math.min(value, totalSaved),
      });
    }
    setSavingsHistory(history);
  };

  // Fetch recent transactions
  const fetchRecentTransactions = useCallback(async () => {
    if (!userId) return;
    setLoadingTransactions(true);
    try {
      const [depositsRes, withdrawalsRes] = await Promise.all([
        axiosInstance.get("/deposits?limit=100"),
        axiosInstance.get("/withdrawals?limit=5"),
      ]);
      
      const transactions = [];
      
      if (depositsRes.data.success) {
        const deposits = depositsRes.data.data?.deposits || depositsRes.data.data || [];
        setApprovedDepositDates(
          deposits
            .filter((d) => String(d.status || "").toLowerCase() === "approved")
            .map((d) => d.createdAt)
            .filter(Boolean),
        );
        deposits.forEach(d => {
          const isReferralBonus = d.isBonus === true || d.bonusType === "referral" || d.paymentMethod === "referral";
          transactions.push({
            id: d._id || d.id || String(Math.random()),
            type: isReferralBonus ? "referral_bonus" : "deposit",
            amount: safeNumber(d.depositAmount || d.amount, 0),
            status: d.status || "pending",
            date: d.createdAt || new Date().toISOString(),
            color: d.status === "rejected" ? "text-red-500" : d.status === "approved" ? "text-green-500" : "text-amber-500",
            name: isReferralBonus 
              ? (d.remarks || (lang === 'bn' ? 'রেফারেল বোনাস' : 'Referral Bonus'))
              : (d.goalName || d.name || (lang === 'bn' ? 'জমা' : 'Deposit')),
            isReferralBonus,
            referrerName: d.remarks?.includes('inviting') 
              ? d.remarks.match(/inviting (.+)$/)?.[1] 
              : null,
            referredBy: d.remarks?.includes('joining via') 
              ? d.remarks.match(/joining via (.+)$/)?.[1] 
              : null,
          });
        });
      }
      if (!depositsRes.data.success) {
        setApprovedDepositDates([]);
      }
      
      if (withdrawalsRes.data.success) {
        const withdrawals = withdrawalsRes.data.data?.withdrawals || withdrawalsRes.data.data || [];
        withdrawals.forEach(w => {
          transactions.push({
            id: w._id || w.id || String(Math.random()),
            type: "withdrawal",
            amount: safeNumber(w.withdrawalAmount || w.amount, 0),
            status: w.status || "pending",
            date: w.createdAt || new Date().toISOString(),
            color: w.status === "rejected" ? "text-red-500" : w.status === "approved" ? "text-green-500" : "text-amber-500",
          });
        });
      }
      
      transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecentTransactions(transactions.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setRecentTransactions([]);
      setApprovedDepositDates([]);
    } finally {
      setLoadingTransactions(false);
    }
  }, [userId]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !authUser) {
      router.push("/login");
    }
  }, [authUser, authLoading, router]);

  // Fetch balance summary
  const fetchBalanceSummary = useCallback(async () => {
    if (!userId) return;
    setLoadingBalance(true);
    try {
      const res = await axiosInstance.get("/balance/summary");
      if (res.data.success) {
        setBalanceSummary(res.data.data);
      }
    } catch (error) {
      console.error("Failed to fetch balance summary:", error);
    } finally {
      setLoadingBalance(false);
    }
  }, [userId]);

  // Fetch all data when user is available
  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchGoals();
      fetchCircles();
      fetchSavingsHistory();
      fetchRecentTransactions();
      fetchBalanceSummary();
    }
  }, [userId, fetchUserData, fetchGoals, fetchCircles, fetchSavingsHistory, fetchRecentTransactions, fetchBalanceSummary]);

  // Update insights when userData or goals change
  useEffect(() => {
    if (userData) {
      fetchInsights();
    }
  }, [userData, userGoals, fetchInsights]);

  // Set greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting(t('goodMorning'));
    else if (hour < 17) setGreeting(t('goodAfternoon'));
    else setGreeting(t('goodEvening'));
  }, [lang]);

  // Initialize chart
  useEffect(() => {
    if (typeof window !== "undefined" && savingsHistory.length > 0) {
      initChart();
    }
    return () => {
      if (savingsChart.current) {
        savingsChart.current.destroy();
      }
    };
  }, [savingsHistory]);

  // Update chart when period changes
  useEffect(() => {
    updateChart();
  }, [chartPeriod, savingsHistory]);

  // Helper functions - Safe formatCurrency that handles NaN, null, undefined
  const formatCurrency = (amount) => {
    // Handle null, undefined, NaN
    if (amount === null || amount === undefined || Number.isNaN(Number(amount))) {
      return "৳0";
    }
    const num = Number(amount);
    if (num === 0) return "৳0";
    if (num >= 10000000) return `৳${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `৳${(num / 100000).toFixed(1)}L`;
    if (num >= 1000) return `৳${(num / 1000).toFixed(1)}K`;
    return `৳${num.toLocaleString()}`;
  };

  const calculateTimeLeft = (goal) => {
    if (!goal) return t('inProgress');
    if (goal.duration && !Number.isNaN(Number(goal.duration))) {
      return `${goal.duration} months left`;
    }
    if (goal.targetDate) {
      try {
        const targetDate = new Date(goal.targetDate);
        if (Number.isNaN(targetDate.getTime())) return t('inProgress');
        const monthsLeft = Math.max(0, Math.ceil((targetDate - new Date()) / (1000 * 60 * 60 * 24 * 30)));
        return `${monthsLeft} months left`;
      } catch {
        return t('inProgress');
      }
    }
    return t('inProgress');
  };

  const calculateProgress = (goal) => {
    if (!goal) return 0;
    if (goal.progress) return goal.progress;
    const saved = Number(goal.currentSaved || goal.currentAmount || 0);
    const target = Number(goal.targetAmount || 1);
    if (target === 0 || Number.isNaN(saved) || Number.isNaN(target)) return 0;
    return Math.min(100, Math.round((saved / target) * 100));
  };

  const getGoalIcon = (goalType) => {
    if (!goalType) return <Target size={24} />;
    const map = {
      home: <Target size={24} />,
      wedding: <Heart size={24} />,
      hajj: <Star size={24} />,
      education: <GraduationCap size={24} />,
      emergency: <Shield size={24} />,
      gadget: <Smartphone size={24} />,
      car: <Car size={24} />,
      business: <Briefcase size={24} />,
      travel: <Plane size={24} />,
      health: <Heart size={24} />,
      investment: <TrendingUp size={24} />,
      other: <Target size={24} />,
    };
    return map[goalType?.toLowerCase()] || <Target size={24} />;
  };

  const getGoalColor = (type) => {
    if (!type) return "from-primary to-primary-light";
    const map = {
      home: "from-primary to-primary-light",
      wedding: "from-pink-500 to-rose-500",
      hajj: "from-amber-500 to-orange-500",
      education: "from-purple-500 to-indigo-500",
      emergency: "from-red-500 to-orange-500",
      gadget: "from-blue-500 to-cyan-500",
      car: "from-cyan-500 to-teal-500",
      business: "from-emerald-500 to-green-500",
      travel: "from-amber-500 to-yellow-500",
      health: "from-green-500 to-emerald-500",
      investment: "from-indigo-500 to-purple-500",
      other: "from-primary to-primary-light",
    };
    return map[type?.toLowerCase()] || "from-primary to-primary-light";
  };

  const initChart = () => {
    const canvas = document.getElementById("savingsChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (savingsChart.current) savingsChart.current.destroy();

    savingsChart.current = new Chart(ctx, {
      type: "line",
      data: getChartData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: (c) => formatCurrency(c.raw) } },
        },
        scales: {
          y: { grid: { color: "rgba(128,128,128,0.08)" }, ticks: { callback: (v) => formatCurrency(v), font: { size: 11 } } },
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        },
      },
    });
  };

  const getChartData = () => {
    let history = [...savingsHistory];
    if (history.length === 0) {
      history = [
        { month: "Jan", amount: 0 }, { month: "Feb", amount: 0 },
        { month: "Mar", amount: 0 }, { month: "Apr", amount: 0 },
        { month: "May", amount: 0 }, { month: "Jun", amount: 0 },
      ];
    }

    let labels = history.map(h => h.month || "N/A");
    let values = history.map(h => safeNumber(h.amount, 0));

    if (chartPeriod === "6m") {
      labels = labels.slice(-6);
      values = values.slice(-6);
    } else if (chartPeriod === "1y" && labels.length > 12) {
      labels = labels.slice(-12);
      values = values.slice(-12);
    }

    return {
      labels,
      datasets: [{
        label: "Savings",
        data: values,
        borderColor: "#059669",
        backgroundColor: "rgba(5,150,105,0.1)",
        borderWidth: 2.5,
        pointBackgroundColor: "#059669",
        pointBorderColor: "#fff",
        pointBorderWidth: 2,
        pointRadius: 4,
        tension: 0.4,
        fill: true,
      }],
    };
  };

  const updateChart = () => {
    if (savingsChart.current) {
      const newData = getChartData();
      savingsChart.current.data.labels = newData.labels;
      savingsChart.current.data.datasets[0].data = newData.datasets[0].data;
      savingsChart.current.update();
    }
  };

  const sendAiMessage = () => {
    if (!aiMessage.trim()) return;
    setAiMessages(prev => [...prev, { text: aiMessage, isBot: false }]);
    setAiMessage("");
    
    setTimeout(() => {
      const monthsToGoal = targetAmount > 0 && monthlySaved > 0
        ? Math.ceil((targetAmount - totalSaved) / monthlySaved)
        : 0;
      
      const responses = [
        `Based on your savings pattern, you're doing great! Keep up the ${dayStreak}-day streak!`,
        `Your ${userGoals.length} active goals are on track. Consider increasing monthly deposits to reach them faster.`,
        monthsToGoal > 0 
          ? `At your current rate, you'll reach your goal in approximately ${monthsToGoal} months.`
          : `Keep saving to reach your goals faster!`,
        `You've saved ${formatCurrency(totalSaved)} so far. That's impressive progress!`,
      ];
      setAiMessages(prev => [...prev, { text: responses[Math.floor(Math.random() * responses.length)], isBot: true }]);
    }, 800);
  };

  const getUserDisplayName = () => {
    if (userData?.firstName) return userData.firstName;
    if (authUser?.firstName) return authUser.firstName;
    if (userData?.fullName) return userData.fullName.split(" ")[0];
    return t('user');
  };

  const getKycProgress = () => {
    let completed = 0;
    if (authUser?.email || userData?.email) completed++;
    if (authUser?.phone) completed++;
    if (userData?.kyc?.status === "approved" || userData?.kycCompleted) completed += 2;
    if (userData?.profilePicture) completed++;
    return { completed, total: 5 };
  };

  // Safe number helper
  const safeNumber = (val, fallback = 0) => {
    const num = Number(val);
    if (val === null || val === undefined || val === "" || Number.isNaN(num)) {
      return fallback;
    }
    return num;
  };

  const calculateDayStreak = (dates = []) => {
    const uniqueDays = new Set(
      dates
        .map((value) => {
          const date = new Date(value);
          if (Number.isNaN(date.getTime())) return null;
          return date.toISOString().slice(0, 10);
        })
        .filter(Boolean),
    );

    if (uniqueDays.size === 0) return 0;

    const cursor = new Date();
    cursor.setHours(0, 0, 0, 0);

    if (!uniqueDays.has(cursor.toISOString().slice(0, 10))) {
      cursor.setDate(cursor.getDate() - 1);
      if (!uniqueDays.has(cursor.toISOString().slice(0, 10))) return 0;
    }

    let streak = 0;
    while (uniqueDays.has(cursor.toISOString().slice(0, 10))) {
      streak += 1;
      cursor.setDate(cursor.getDate() - 1);
    }

    return streak;
  };

  // Calculate totalSaved from user document, or fallback to sum of all goals
  const calculatedTotalSaved = userGoals.reduce((sum, g) => {
    const goalSaved = safeNumber(g.savedAmount, 0);
    return sum + goalSaved;
  }, 0);
  const activeGoals = userGoals.filter((goal) => goal.status === "active");
  const activeCirclesCount = userCircles.filter((circle) => {
    if (circle.status !== "active") return false;
    const creatorMember = (circle.membersList || []).find(
      (member) => String(member.userId) === String(userId) && member.role === "admin",
    );
    return Boolean(creatorMember);
  }).length;
  const totalSaved = calculatedTotalSaved;
  const targetAmount = userGoals.reduce((sum, g) => sum + safeNumber(g.targetAmount, 0), 0);
  const monthlySaved = activeGoals.reduce((sum, goal) => sum + safeNumber(goal.monthlyDeposit, 0), 0);
  const dayStreak = Math.max(
    safeNumber(userData?.streak || userData?.dayStreak || userData?.currentStreak, 0),
    calculateDayStreak(approvedDepositDates),
  );
  const activeCircles = activeCirclesCount;
  const streak = dayStreak;
  const progressPercent = targetAmount > 0 ? Math.min(100, Math.round((totalSaved / targetAmount) * 100)) : 0;
  const nextDueDays = 7;

  // Calculate dynamic stats - safe version
  const getStats = () => {
    const level = Number(userData?.level || 1);

    return [
      { icon: <Wallet size={24} />, value: formatCurrency(totalSaved), label: t('totalSavings'), change: monthlySaved > 0 ? `+${formatCurrency(monthlySaved)} ${t('thisMonth')}` : t('startSavingToday'), color: "green" },
      { icon: <Users size={24} />, value: String(activeCircles), label: t('activeCircles'), change: activeCircles > 0 ? "↑ Goals on track" : t('joinCircle'), color: "blue" },
      { icon: <Flame size={24} />, value: String(streak), label: t('dayStreak'), change: streak >= 30 ? t('topSaver') : streak > 0 ? t('keepGoing') : t('startYourStreak'), color: "warning" },
      { icon: <Trophy size={24} />, value: String(level), label: t('saverLevel'), change: userData?.selectedPlan ? `${userData.selectedPlan} ${userData?.billingCycle === 'yearly' ? '(Yearly)' : '(Monthly)'} — ৳${userData?.planFee || 0}` : t('member'), color: "info" },
    ];
  };

  const stats = getStats();
  const userName = getUserDisplayName();
  const kycProgress = getKycProgress();

  // Get status display text - safe version
  const getStatusText = (status) => {
    if (!status) return t('pending');
    switch(String(status).toLowerCase()) {
      case "pending": return t('pending');
      case "rejected": return t('rejected');
      case "approved": return t('approved');
      default: return String(status);
    }
  };

  // Get status color class - safe version
  const getStatusColorClass = (status) => {
    if (!status) return "text-foreground/50";
    switch(String(status).toLowerCase()) {
      case "pending": return "text-amber-500";
      case "rejected": return "text-red-500";
      case "approved": return "text-green-500";
      default: return "text-foreground/50";
    }
  };

  if (authLoading) {
    return (
      <div className={`${dashboardColorScope} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">{t('loadingDashboard')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={dashboardColorScope}>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">{greeting}, {userName}!</h1>
          <p className="text-sm text-foreground/60 mt-1">
            {t('nextDepositDue')} <strong className="text-amber-500">{nextDueDays} {t('days')}</strong>. {t('keepStreakAlive')}
          </p>
        </div>
        <Link href="/dashboard/submit" className="px-5 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition w-full sm:w-auto text-center inline-flex items-center justify-center gap-2">
          <Banknote size={16} /> {t('deposit')}
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: <CreditCard size={20} />, label: t('deposit'), href: "/dashboard/submit", primary: true },
          { icon: <Send size={20} />, label: t('withdraw'), href: "/dashboard/lifting", primary: false },
          { icon: <RefreshCw size={20} />, label: t('transfer'), href: "/dashboard/transfer", primary: false },
          { icon: <Sparkles size={20} />, label: t('autoSave'), href: "/dashboard/auto-save", primary: false },
        ].map((action) => (
          <Link key={action.label} href={action.href} className={`rounded-xl p-4 text-center transition-all ${action.primary ? "bg-linear-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20" : "bg-card border border-border text-foreground hover:border-primary"}`}>
            <div className="flex justify-center mb-1">{action.icon}</div>
            <div className="text-xs font-bold">{action.label}</div>
          </Link>
        ))}
      </div>

      {/* Balance Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {/* Total Balance Card */}
        <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -mr-8 -mt-8"></div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
              <Wallet size={20} />
            </div>
            <div>
              <div className="text-xs text-foreground/50">{t('totalBalance')}</div>
              <div className="text-xl font-bold text-foreground">
                {loadingBalance ? "..." : formatCurrency(balanceSummary?.totalBalance?.amount || 0)}
              </div>
            </div>
          </div>
          <div className="text-xs text-foreground/40 mt-2">{t('totalBalanceDesc')}</div>
          <div className="flex justify-between mt-3 text-xs">
            <span className="text-foreground/50">{t('deposit')}: <span className="text-primary font-semibold">{loadingBalance ? "..." : formatCurrency(balanceSummary?.totalBalance?.totalDeposits || 0)}</span></span>
            <span className="text-foreground/50">{t('withdraw')}: <span className="text-red-500 font-semibold">{loadingBalance ? "..." : formatCurrency(balanceSummary?.totalBalance?.totalWithdrawn || 0)}</span></span>
          </div>
        </div>

        {/* Total Withdrawal Card */}
        <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/5 rounded-full -mr-8 -mt-8"></div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
              <Send size={20} />
            </div>
            <div>
              <div className="text-xs text-foreground/50">{t('totalWithdrawal')}</div>
              <div className="text-xl font-bold text-foreground">
                {loadingBalance ? "..." : formatCurrency(balanceSummary?.totalWithdrawal?.amount || 0)}
              </div>
            </div>
          </div>
          <div className="text-xs text-foreground/40 mt-2">{t('totalWithdrawalDesc')}</div>
          <div className="mt-3 text-xs text-foreground/50">
            {t('totalWithdrawal')}: <span className="text-red-500 font-semibold">{loadingBalance ? "..." : balanceSummary?.totalWithdrawal?.count || 0}</span> {lang === 'bn' ? 'টি লেনদেন' : 'transactions'}
          </div>
        </div>

        {/* Referral Bonus Card */}
        <div className="bg-card border border-border rounded-xl p-5 hover:shadow-lg transition relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-full -mr-8 -mt-8"></div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500">
              <Gift size={20} />
            </div>
            <div>
              <div className="text-xs text-foreground/50">{t('referralBonus')}</div>
              <div className="text-xl font-bold text-foreground">
                {loadingBalance ? "..." : formatCurrency(balanceSummary?.referralBonus?.available || 0)}
              </div>
            </div>
          </div>
          <div className="text-xs text-foreground/40 mt-2">{t('referralBonusDesc')}</div>
          <div className="flex justify-between mt-3 text-xs">
            <span className="text-foreground/50">{t('earned')}: <span className="text-amber-500 font-semibold">{loadingBalance ? "..." : formatCurrency(balanceSummary?.referralBonus?.earned || 0)}</span></span>
            <span className="text-foreground/50">{t('withdrawn')}: <span className="text-red-500 font-semibold">{loadingBalance ? "..." : formatCurrency(balanceSummary?.referralBonus?.withdrawn || 0)}</span></span>
          </div>
          {balanceSummary?.referralBonus?.available > 0 && (
            <Link href="/dashboard/referral-withdrawal" className="mt-3 block w-full py-2 bg-amber-500/10 text-amber-600 rounded-lg text-xs font-semibold text-center hover:bg-amber-500/20 transition">
              {t('withdrawReferral')}
            </Link>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition">
            <div className={`w-11 h-11 rounded-xl bg-${stat.color === "green" ? "primary" : stat.color === "blue" ? "blue-500" : stat.color === "warning" ? "amber-500" : "cyan-500"}/10 flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
            <div className="text-xs text-primary mt-2">{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Savings Hero Card */}
          <div className="bg-linear-to-r from-primary to-primary-light rounded-xl p-5 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs opacity-75">{t('totalSavingsBalance')}</div>
                <div className="text-3xl font-bold">{formatCurrency(totalSaved)}</div>
                <div className="text-xs opacity-75 mt-1">{t('goal')}: {formatCurrency(targetAmount)} {t('saved')}</div>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-1 text-sm font-semibold">{progressPercent}% {t('complete')}</div>
            </div>
            <div className="h-2 bg-white/20 rounded-full mb-2">
              <div className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="flex justify-between text-xs opacity-75 mb-4">
              <span>{formatCurrency(totalSaved)} {t('saved')}</span>
              <span>{formatCurrency(Math.max(0, targetAmount - totalSaved))} {t('remaining')}</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{formatCurrency(monthlySaved)}</div>
                <div className="text-xs opacity-75">{t('thisMonthLabel')}</div>
              </div>
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{formatCurrency(totalSaved)}</div>
                <div className="text-xs opacity-75">{t('totalSavedLabel')}</div>
              </div>
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{dayStreak}</div>
                <div className="text-xs opacity-75">{t('dayStreakLabel')}</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground flex items-center gap-2">
                <TrendingUp size={18} /> {t('savingsHistory')}
              </div>
              <div className="flex gap-2">
                {["6m", "1y", "all"].map((period) => (
                  <button key={period} onClick={() => setChartPeriod(period)} className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${chartPeriod === period ? "bg-primary text-white" : "bg-background text-foreground/60 hover:bg-primary/10"}`}>
                    {period.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
            <div className="h-64">
              <canvas id="savingsChart"></canvas>
            </div>
          </div>

          {/* Goals Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-bold text-foreground flex items-center gap-2">
                <Target size={18} /> {t('mySavingsGoals')}
              </h2>
              <Link href="/dashboard/goals" className="text-sm text-primary font-semibold flex items-center gap-1">{t('viewAll')} <ArrowRight size={14} /></Link>
            </div>
            {loadingGoals ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-foreground/50 text-sm">{t('loadingGoals')}</p>
              </div>
            ) : userGoals.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <Target size={48} className="text-foreground/30 mx-auto mb-2" />
                <div className="text-foreground font-semibold mb-1">{t('noGoalsYet')}</div>
                <div className="text-foreground/50 text-sm mb-4">{t('createFirstGoal')}</div>
                <Link href="/dashboard/goals" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition inline-flex items-center gap-2">
                  <Target size={14} /> {t('createGoal')}
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {userGoals.slice(0, 4).map((goal, idx) => {
                  const isGoalCompleted = goal.progress >= 100 || goal.status === "completed";
                  return (
                  <div key={idx} className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {goal.icon}
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        isGoalCompleted 
                          ? "bg-green-500/10 text-green-500" 
                          : goal.status === "active" 
                            ? "bg-primary/10 text-primary" 
                            : "bg-amber-500/10 text-amber-500"
                      }`}>
                        {isGoalCompleted 
                          ? (lang === 'bn' ? 'সম্পন্ন' : 'Completed') 
                          : goal.status === "active" 
                            ? t('active') 
                            : t('paused')
                        }
                      </span>
                    </div>
                    <div className="font-bold text-foreground">{goal.name}</div>
                    <div className="text-xs text-foreground/50 mb-2">{formatCurrency(goal.monthlyDeposit)} · {goal.timeLeft}</div>
                    <div className="h-1.5 bg-border rounded-full mb-2 overflow-hidden">
                      <div className={`h-full rounded-full bg-linear-to-r ${goal.color}`} style={{ width: `${Math.min(goal.progress, 100)}%` }} />
                    </div>
                    <div className="flex justify-between text-sm mb-3">
                      <span className="text-primary font-semibold">{goal.saved}</span>
                      <span className="text-foreground/50">/ {goal.target}</span>
                    </div>
                    {isGoalCompleted && (
                      <Link 
                        href={`/dashboard/lifting?goalId=${goal._id}`} 
                        className="block w-full py-2 bg-red-500/10 text-red-500 rounded-lg text-xs font-semibold text-center hover:bg-red-500/20 transition"
                      >
                        {lang === 'bn' ? 'তোলার অনুরোধ' : 'Withdraw Funds'}
                      </Link>
                    )}
                  </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Recent Transactions */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground flex items-center gap-2">
                <Clock size={18} /> {t('recentTransactions')}
              </div>
              <Link href="/dashboard/transactions" className="text-xs text-primary">{t('viewAllTransactions')}</Link>
            </div>
            {loadingTransactions ? (
              <div className="text-center py-4">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
              </div>
            ) : recentTransactions.length === 0 ? (
              <div className="text-center py-6 text-foreground/50 text-sm">{t('noTransactions')}</div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((tx, idx) => {
                  const isDeposit = tx.type === "deposit";
                  const isReferralBonus = tx.type === "referral_bonus";
                  const isWithdrawal = tx.type === "withdrawal";
                  const isRejected = tx.status === "rejected";
                  const isPending = tx.status === "pending";
                  const isApproved = tx.status === "approved";
                  
                  let bgColor = "bg-green-500/10";
                  let iconColor = "text-green-500";
                  let amountColor = "text-green-500";
                  let amountPrefix = "+";
                  let icon = <Banknote size={14} className={iconColor} />;
                  let txLabel = tx.type;
                  let txSubLabel = new Date(tx.date).toLocaleDateString();
                  
                  if (isReferralBonus) {
                    bgColor = "bg-amber-500/10";
                    iconColor = "text-amber-500";
                    amountColor = "text-amber-500";
                    amountPrefix = "+";
                    icon = <Gift size={14} className={iconColor} />;
                    txLabel = lang === 'bn' ? 'রেফারেল বোনাস' : 'Referral Bonus';
                    // Show who referred or who was referred
                    if (tx.referrerName) {
                      txSubLabel = (lang === 'bn' ? 'বন্ধু: ' : 'Friend: ') + tx.referrerName;
                    } else if (tx.referredBy) {
                      txSubLabel = (lang === 'bn' ? 'রেফারার: ' : 'Referrer: ') + tx.referredBy;
                    }
                  } else if (isWithdrawal) {
                    bgColor = isRejected ? "bg-red-500/10" : isPending ? "bg-amber-500/10" : "bg-red-500/10";
                    iconColor = isRejected ? "text-red-500" : isPending ? "text-amber-500" : "text-red-500";
                    amountColor = isRejected ? "text-red-500" : isPending ? "text-amber-500" : "text-red-500";
                    amountPrefix = "-";
                    icon = <Send size={14} className={iconColor} />;
                    txLabel = lang === 'bn' ? 'উত্তোলন' : 'Withdrawal';
                  } else if (isDeposit) {
                    bgColor = isRejected ? "bg-red-500/10" : isPending ? "bg-amber-500/10" : "bg-green-500/10";
                    iconColor = isRejected ? "text-red-500" : isPending ? "text-amber-500" : "text-green-500";
                    amountColor = isRejected ? "text-red-500" : isPending ? "text-amber-500" : "text-green-500";
                    amountPrefix = isRejected ? "✕ " : "+";
                    icon = <Banknote size={14} className={iconColor} />;
                    txLabel = tx.name || (lang === 'bn' ? 'জমা' : 'Deposit');
                  }
                  
                  if (isRejected && !isReferralBonus) {
                    bgColor = "bg-red-500/10";
                    iconColor = "text-red-500";
                    amountColor = "text-red-500";
                    amountPrefix = "✕ ";
                  } else if (isPending && !isReferralBonus) {
                    bgColor = "bg-amber-500/10";
                    iconColor = "text-amber-500";
                    amountColor = "text-amber-500";
                  }
                  
                  return (
                    <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg ${bgColor} flex items-center justify-center`}>
                          {icon}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-foreground capitalize">{txLabel}</div>
                          <div className="text-xs text-foreground/50">{txSubLabel}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-bold ${amountColor}`}>
                          {isRejected && !isReferralBonus ? "✕ " : amountPrefix}{formatCurrency(tx.amount)}
                        </div>
                        <div className={`text-xs ${getStatusColorClass(tx.status)}`}>
                          {getStatusText(tx.status)}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* AI Assistant */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-primary" /> {t('aiAssistant')}
            </div>
            <div className="h-32 overflow-y-auto mb-3 space-y-2 text-sm">
              {insights.slice(0, 3).map((insight, idx) => (
                <div key={idx} className={`p-2 rounded-lg ${insight.isHighlight ? "bg-primary/10 border border-primary/20" : "bg-background"}`}>
                  <span className="text-xs">{insight.isHighlight ? <Sparkles size={10} className="inline mr-1" /> : <TrendingUp size={10} className="inline mr-1" />} {insight.text}</span>
                </div>
              ))}
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`p-2 rounded-lg ${msg.isBot ? "bg-primary/5" : "bg-amber-500/10 ml-4"}`}>
                  <span className="text-xs">{msg.isBot ? <Sparkles size={10} className="inline mr-1" /> : <User size={10} className="inline mr-1" />}{msg.text}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input type="text" value={aiMessage} onChange={(e) => setAiMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendAiMessage()} placeholder={t('askAboutSavings')} className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary" />
              <button onClick={sendAiMessage} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90">{t('send')}</button>
            </div>
          </div>

          {/* Goal Progress Rings */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground flex items-center gap-2">
                <Target size={18} /> {t('goalProgress')}
              </div>
              <Link href="/dashboard/goals" className="text-xs text-primary">{t('details')}</Link>
            </div>
            {userGoals.length === 0 ? (
              <div className="text-center py-4 text-foreground/50 text-sm">{t('noGoalsForProgress')}</div>
            ) : (
              <div className="space-y-4">
                {userGoals.slice(0, 3).map((goal, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 shrink-0">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 72 72">
                        <circle cx="36" cy="36" r="30" fill="none" stroke="var(--border)" strokeWidth="6" />
                        <circle cx="36" cy="36" r="30" fill="none" stroke="#059669" strokeWidth="6" strokeDasharray="188.4" strokeDashoffset={188.4 * (1 - Math.min(goal.progress, 100) / 100)} strokeLinecap="round" />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">{Math.min(goal.progress, 100)}%</div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">{goal.name}</div>
                      <div className="text-xs text-foreground/50">{goal.saved} / {goal.target}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KYC Status */}
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-5">
            <div className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Shield size={18} /> {t('verificationStatus')}
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><Mail size={12} /> {t('emailVerified')}</span>
                <span className="text-primary">{authUser?.email ? <CheckCircle size={16} /> : <XCircle size={16} />}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><Phone size={12} /> {t('phoneVerified')}</span>
                <span className="text-primary">{authUser?.phone ? <CheckCircle size={16} /> : <XCircle size={16} />}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><Shield size={12} /> {t('kycVerified')}</span>
                <span className="text-primary">{userData?.kyc?.status === "approved" || userData?.kycCompleted ? <CheckCircle size={16} /> : <Clock size={16} />}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><User size={12} /> {t('profilePicture')}</span>
                <span className="text-primary">{userData?.profilePicture ? <CheckCircle size={16} /> : <XCircle size={16} />}</span>
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              {[...Array(kycProgress.total)].map((_, i) => (
                <div key={i} className={`flex-1 h-1 rounded-full ${i < kycProgress.completed ? "bg-primary" : "bg-amber-500"}`} />
              ))}
            </div>
            <div className="text-xs text-foreground/50 mt-2">{kycProgress.completed}/{kycProgress.total} {t('verificationSteps')}</div>
            {kycProgress.completed < kycProgress.total && (
              <Link href="/profile/kyc" className="block mt-3 text-center text-xs text-primary font-semibold hover:underline">{t('completeVerification')}</Link>
            )}
          </div>
        </div>
      </div>

      {/* Referral Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-linear-to-r from-emerald-900 to-cyan-900 rounded-xl p-5 text-white">
          <div className="font-bold text-lg mb-1 flex items-center gap-2"><Gift size={18} /> {t('referAndEarn')}</div>
          <div className="text-sm opacity-80 mb-4">{t('referBonus')}</div>
          <div className="flex items-center gap-2 bg-white/15 rounded-lg p-3 mb-4">
            <span className="flex-1 font-mono text-sm">sanchoybondhu.com/ref/{authUser?.referralCode || "USER"}</span>
            <button onClick={() => { navigator.clipboard.writeText(`sanchoybondhu.com/ref/${authUser?.referralCode || "USER"}`); alert(t('referralLinkCopied')); }} className="px-3 py-1 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition inline-flex items-center gap-1"><Copy size={12} /> {t('copy')}</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-xl font-bold">{userData?.totalReferrals || 0}</div>
              <div className="text-xs opacity-75">{t('friendsReferred')}</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-xl font-bold">{formatCurrency(userData?.totalReferralBonus || 0)}</div>
              <div className="text-xs opacity-75">{t('bonusEarned')}</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-foreground flex items-center gap-2"><Award size={18} /> {t('yourSavingsPlan')}</div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">{t('currentPlan')}</span>
              <span className="font-bold text-primary capitalize">{userData?.selectedPlan || authUser?.selectedPlan || "Silver"}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">{t('memberSince')}</span>
              <span className="font-bold text-primary">
                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "2024"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">{t('totalSavedPlan')}</span>
              <span className="font-bold text-primary">{formatCurrency(totalSaved)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">{t('currentLevel')}</span>
              <span className="font-bold text-primary">{t('saverLevel')} {userData?.level || 1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
