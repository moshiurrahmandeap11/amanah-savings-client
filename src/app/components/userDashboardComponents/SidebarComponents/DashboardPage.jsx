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
} from "lucide-react";

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
  const [insights, setInsights] = useState([]);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const [userData, setUserData] = useState(null);
  const [savingsHistory, setSavingsHistory] = useState([]);
  const [recentTransactions, setRecentTransactions] = useState([]);
  const [loadingTransactions, setLoadingTransactions] = useState(false);
  
  const chartRef = useRef(null);
  let savingsChart = useRef(null);

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
      const res = await axiosInstance.get("/goals");
      if (res.data.success) {
        const goals = res.data.data?.goals || res.data.data || [];
        setUserGoals(
          goals.map((g) => ({
            id: g._id,
            icon: getGoalIcon(g.goalType || g.type || "other"),
            name: g.goalName || g.name || "Savings Goal",
            status: g.status || "active",
            timeLeft: calculateTimeLeft(g),
            saved: formatCurrency(g.currentSaved || g.currentAmount || 0),
            target: formatCurrency(g.targetAmount || 0),
            progress: calculateProgress(g),
            color: getGoalColor(g.goalType || g.type || "other"),
            monthlyDeposit: g.monthlyDeposit || 0,
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

  // Fetch insights from backend or generate
  const fetchInsights = useCallback(async () => {
    if (!userData) return;
    
    const insightsList = [];
    
    const totalSaved = userData.totalSaved || userData.goal?.currentSaved || 0;
    const streak = userData.streak || 0;
    const activeGoals = userData.activeGoals || userGoals.length;
    const monthlyDeposit = userData.goal?.monthlyDeposit || 0;
    const targetAmount = userData.goal?.targetAmount || 0;
    
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
  }, [userData, userGoals]);

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
    const totalSaved = userData?.totalSaved || 0;
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
        axiosInstance.get("/deposits?limit=5"),
        axiosInstance.get("/withdrawals?limit=5"),
      ]);
      
      const transactions = [];
      
      if (depositsRes.data.success) {
        const deposits = depositsRes.data.data?.deposits || depositsRes.data.data || [];
        deposits.forEach(d => {
          transactions.push({
            id: d._id,
            type: "deposit",
            amount: d.depositAmount || d.amount || 0,
            status: d.status,
            date: d.createdAt,
            color: "text-green-500",
          });
        });
      }
      
      if (withdrawalsRes.data.success) {
        const withdrawals = withdrawalsRes.data.data?.withdrawals || withdrawalsRes.data.data || [];
        withdrawals.forEach(w => {
          transactions.push({
            id: w._id,
            type: "withdrawal",
            amount: w.withdrawalAmount || w.amount || 0,
            status: w.status,
            date: w.createdAt,
            color: "text-red-500",
          });
        });
      }
      
      transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      setRecentTransactions(transactions.slice(0, 5));
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
      setRecentTransactions([]);
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

  // Fetch all data when user is available
  useEffect(() => {
    if (userId) {
      fetchUserData();
      fetchGoals();
      fetchSavingsHistory();
      fetchRecentTransactions();
    }
  }, [userId, fetchUserData, fetchGoals, fetchSavingsHistory, fetchRecentTransactions]);

  // Update insights when userData or goals change
  useEffect(() => {
    if (userData) {
      fetchInsights();
    }
  }, [userData, userGoals, fetchInsights]);

  // Set greeting
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

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

  // Helper functions
  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "৳0";
    if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(1)}Cr`;
    if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `৳${(amount / 1000).toFixed(1)}K`;
    return `৳${amount.toLocaleString()}`;
  };

  const calculateTimeLeft = (goal) => {
    if (goal.duration) {
      return `${goal.duration} months left`;
    }
    if (goal.targetDate) {
      const monthsLeft = Math.max(0, Math.ceil((new Date(goal.targetDate) - new Date()) / (1000 * 60 * 60 * 24 * 30)));
      return `${monthsLeft} months left`;
    }
    return "In progress";
  };

  const calculateProgress = (goal) => {
    if (goal.progress) return goal.progress;
    const saved = goal.currentSaved || goal.currentAmount || 0;
    const target = goal.targetAmount || 1;
    return Math.min(100, Math.round((saved / target) * 100));
  };

  const getGoalIcon = (goalType) => {
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

    let labels = history.map(h => h.month);
    let values = history.map(h => h.amount);

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
      const responses = [
        `Based on your savings pattern, you're doing great! Keep up the ${userData?.streak || 0}-day streak!`,
        `Your ${userGoals.length} active goals are on track. Consider increasing monthly deposits to reach them faster.`,
        `At your current rate, you'll reach your goal in approximately ${Math.ceil((userData?.goal?.targetAmount - userData?.goal?.currentSaved) / (userData?.goal?.monthlyDeposit || 1))} months.`,
        `You've saved ${formatCurrency(userData?.totalSaved || 0)} so far. That's impressive progress!`,
      ];
      setAiMessages(prev => [...prev, { text: responses[Math.floor(Math.random() * responses.length)], isBot: true }]);
    }, 800);
  };

  // Calculate dynamic stats
  const getStats = () => {
    const totalSaved = userData?.totalSaved || userData?.goal?.currentSaved || 0;
    const monthlySaved = userData?.goal?.monthlyDeposit || 0;
    const streak = userData?.streak || 0;
    const level = userData?.level || 1;
    const activeCircles = userData?.activeCircles || userData?.circles?.length || 0;

    return [
      { icon: <Wallet size={24} />, value: formatCurrency(totalSaved), label: "Total Savings", change: monthlySaved > 0 ? `+${formatCurrency(monthlySaved)} this month` : "Start saving today!", color: "green" },
      { icon: <Users size={24} />, value: activeCircles.toString(), label: "Active Circles", change: activeCircles > 0 ? "↑ Goals on track" : "Join a circle!", color: "blue" },
      { icon: <Flame size={24} />, value: streak.toString(), label: "Day Streak", change: streak >= 30 ? "Top saver!" : streak > 0 ? "Keep going!" : "Start your streak!", color: "warning" },
      { icon: <Trophy size={24} />, value: level.toString(), label: "Saver Level", change: userData?.selectedPlan ? `${userData.selectedPlan} Saver` : "Member", color: "info" },
    ];
  };

  const getUserDisplayName = () => {
    if (userData?.firstName) return userData.firstName;
    if (authUser?.firstName) return authUser.firstName;
    if (userData?.fullName) return userData.fullName.split(" ")[0];
    return "User";
  };

  const getKycProgress = () => {
    let completed = 0;
    if (authUser?.email || userData?.email) completed++;
    if (authUser?.phone) completed++;
    if (userData?.kyc?.status === "approved" || userData?.kycCompleted) completed += 2;
    if (userData?.profilePicture) completed++;
    return { completed, total: 5 };
  };

  const stats = getStats();
  const userName = getUserDisplayName();
  const kycProgress = getKycProgress();
  const totalSaved = userData?.totalSaved || userData?.goal?.currentSaved || 0;
  const targetAmount = userData?.goal?.targetAmount || userGoals.reduce((sum, g) => sum + parseFloat(g.target.replace(/[^0-9]/g, "")), 0);
  const progressPercent = targetAmount > 0 ? Math.min(100, Math.round((totalSaved / targetAmount) * 100)) : 0;
  const nextDueDays = 7;

  if (authLoading) {
    return (
      <div className={`${dashboardColorScope} flex items-center justify-center`}>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading dashboard...</p>
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
            Your next deposit is due in <strong className="text-amber-500">{nextDueDays} days</strong>. Keep your streak alive!
          </p>
        </div>
        <Link href="/dashboard/submit" className="px-5 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition w-full sm:w-auto text-center inline-flex items-center justify-center gap-2">
          <DollarSign size={16} /> Make Deposit
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: <CreditCard size={20} />, label: "Deposit", href: "/dashboard/submit", primary: true },
          { icon: <Send size={20} />, label: "Withdraw", href: "/dashboard/lifting", primary: false },
          { icon: <RefreshCw size={20} />, label: "Transfer", href: "/dashboard/transfer", primary: false },
          { icon: <Sparkles size={20} />, label: "Auto-Save", href: "/dashboard/auto-save", primary: false },
        ].map((action) => (
          <Link key={action.label} href={action.href} className={`rounded-xl p-4 text-center transition-all ${action.primary ? "bg-linear-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20" : "bg-card border border-border text-foreground hover:border-primary"}`}>
            <div className="flex justify-center mb-1">{action.icon}</div>
            <div className="text-xs font-bold">{action.label}</div>
          </Link>
        ))}
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
                <div className="text-xs opacity-75">Total Savings Balance</div>
                <div className="text-3xl font-bold">{formatCurrency(totalSaved)}</div>
                <div className="text-xs opacity-75 mt-1">Goal: {formatCurrency(targetAmount)} across all goals</div>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-1 text-sm font-semibold">{progressPercent}% Complete</div>
            </div>
            <div className="h-2 bg-white/20 rounded-full mb-2">
              <div className="h-full bg-white rounded-full" style={{ width: `${progressPercent}%` }} />
            </div>
            <div className="flex justify-between text-xs opacity-75 mb-4">
              <span>{formatCurrency(totalSaved)} Saved</span>
              <span>{formatCurrency(Math.max(0, targetAmount - totalSaved))} Remaining</span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{formatCurrency(userData?.goal?.monthlyDeposit || 0)}</div>
                <div className="text-xs opacity-75">This Month</div>
              </div>
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{formatCurrency(totalSaved)}</div>
                <div className="text-xs opacity-75">Total Saved</div>
              </div>
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{userData?.streak || 0}</div>
                <div className="text-xs opacity-75">Day Streak</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground flex items-center gap-2">
                <TrendingUp size={18} /> Savings History
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
                <Target size={18} /> My Savings Goals
              </h2>
              <Link href="/dashboard/goals" className="text-sm text-primary font-semibold flex items-center gap-1">View all <ArrowRight size={14} /></Link>
            </div>
            {loadingGoals ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-foreground/50 text-sm">Loading goals...</p>
              </div>
            ) : userGoals.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <Target size={48} className="text-foreground/30 mx-auto mb-2" />
                <div className="text-foreground font-semibold mb-1">No goals yet</div>
                <div className="text-foreground/50 text-sm mb-4">Create your first savings goal to get started</div>
                <Link href="/dashboard/goals" className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition inline-flex items-center gap-2">
                  <Target size={14} /> Create Goal
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {userGoals.slice(0, 4).map((goal, idx) => (
                  <div key={idx} className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition">
                    <div className="flex justify-between items-start mb-2">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {goal.icon}
                      </div>
                      <span className={`text-xs font-semibold px-2 py-1 rounded-full ${goal.status === "active" ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-500"}`}>
                        {goal.status === "active" ? "Active" : "Paused"}
                      </span>
                    </div>
                    <div className="font-bold text-foreground">{goal.name}</div>
                    <div className="text-xs text-foreground/50 mb-2">{formatCurrency(goal.monthlyDeposit)} · {goal.timeLeft}</div>
                    <div className="h-1.5 bg-border rounded-full mb-2 overflow-hidden">
                      <div className={`h-full rounded-full bg-linear-to-r ${goal.color}`} style={{ width: `${goal.progress}%` }} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary font-semibold">{goal.saved}</span>
                      <span className="text-foreground/50">/ {goal.target}</span>
                    </div>
                  </div>
                ))}
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
                <Clock size={18} /> Recent Transactions
              </div>
              <Link href="/dashboard/transactions" className="text-xs text-primary">View all</Link>
            </div>
            {loadingTransactions ? (
              <div className="text-center py-4">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto"></div>
              </div>
            ) : recentTransactions.length === 0 ? (
              <div className="text-center py-6 text-foreground/50 text-sm">No transactions yet</div>
            ) : (
              <div className="space-y-3">
                {recentTransactions.map((tx, idx) => (
                  <div key={idx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg ${tx.type === "deposit" ? "bg-green-500/10" : "bg-red-500/10"} flex items-center justify-center`}>
                        {tx.type === "deposit" ? <DollarSign size={14} className="text-green-500" /> : <Send size={14} className="text-red-500" />}
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-foreground capitalize">{tx.type}</div>
                        <div className="text-xs text-foreground/50">{new Date(tx.date).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-sm font-bold ${tx.type === "deposit" ? "text-green-500" : "text-red-500"}`}>{tx.type === "deposit" ? "+" : "-"}{formatCurrency(tx.amount)}</div>
                      <div className={`text-xs ${tx.status === "pending" ? "text-amber-500" : "text-green-500"}`}>{tx.status}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI Assistant */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-primary" /> Sanchoy Bondhu AI Assistant
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
              <input type="text" value={aiMessage} onChange={(e) => setAiMessage(e.target.value)} onKeyPress={(e) => e.key === "Enter" && sendAiMessage()} placeholder="Ask about savings..." className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary" />
              <button onClick={sendAiMessage} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90">Send</button>
            </div>
          </div>

          {/* Goal Progress Rings */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground flex items-center gap-2">
                <Target size={18} /> Goal Progress
              </div>
              <Link href="/dashboard/goals" className="text-xs text-primary">Details</Link>
            </div>
            {userGoals.length === 0 ? (
              <div className="text-center py-4 text-foreground/50 text-sm">No goals yet. Create one to see progress!</div>
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
              <Shield size={18} /> Verification Status
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><Mail size={12} /> Email Verified</span>
                <span className="text-primary">{authUser?.email ? <CheckCircle size={16} /> : <XCircle size={16} />}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><Phone size={12} /> Phone Verified</span>
                <span className="text-primary">{authUser?.phone ? <CheckCircle size={16} /> : <XCircle size={16} />}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><Shield size={12} /> KYC Verified</span>
                <span className="text-primary">{userData?.kyc?.status === "approved" || userData?.kycCompleted ? <CheckCircle size={16} /> : <Clock size={16} />}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2"><User size={12} /> Profile Picture</span>
                <span className="text-primary">{userData?.profilePicture ? <CheckCircle size={16} /> : <XCircle size={16} />}</span>
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              {[...Array(kycProgress.total)].map((_, i) => (
                <div key={i} className={`flex-1 h-1 rounded-full ${i < kycProgress.completed ? "bg-primary" : "bg-amber-500"}`} />
              ))}
            </div>
            <div className="text-xs text-foreground/50 mt-2">{kycProgress.completed}/{kycProgress.total} verification steps completed</div>
            {kycProgress.completed < kycProgress.total && (
              <Link href="/profile/kyc" className="block mt-3 text-center text-xs text-primary font-semibold hover:underline">Complete Verification →</Link>
            )}
          </div>
        </div>
      </div>

      {/* Referral Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        <div className="bg-linear-to-r from-emerald-900 to-cyan-900 rounded-xl p-5 text-white">
          <div className="font-bold text-lg mb-1 flex items-center gap-2"><Gift size={18} /> Refer & Earn</div>
          <div className="text-sm opacity-80 mb-4">Get ৳500 bonus for each friend who joins and makes their first deposit.</div>
          <div className="flex items-center gap-2 bg-white/15 rounded-lg p-3 mb-4">
            <span className="flex-1 font-mono text-sm">sanchoybondhu.com/ref/{authUser?.referralCode || "USER"}</span>
            <button onClick={() => { navigator.clipboard.writeText(`sanchoybondhu.com/ref/${authUser?.referralCode || "USER"}`); alert("Referral link copied!"); }} className="px-3 py-1 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition inline-flex items-center gap-1"><Copy size={12} /> Copy</button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-xl font-bold">{userData?.referrals?.count || 0}</div>
              <div className="text-xs opacity-75">Friends Referred</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-xl font-bold">{formatCurrency((userData?.referrals?.count || 0) * 500)}</div>
              <div className="text-xs opacity-75">Bonus Earned</div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-foreground flex items-center gap-2"><Award size={18} /> Your Savings Plan</div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">Current Plan</span>
              <span className="font-bold text-primary capitalize">{userData?.selectedPlan || authUser?.selectedPlan || "Silver"}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">Member Since</span>
              <span className="font-bold text-primary">
                {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" }) : "2024"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">Total Saved</span>
              <span className="font-bold text-primary">{formatCurrency(totalSaved)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">Current Level</span>
              <span className="font-bold text-primary">Level {userData?.level || 1}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
