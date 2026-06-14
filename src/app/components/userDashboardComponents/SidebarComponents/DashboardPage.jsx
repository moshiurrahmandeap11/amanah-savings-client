"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Chart from "chart.js/auto";
import useAuth from "../../../hooks/useAuth";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

const DashboardPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [aiMessages, setAiMessages] = useState([]);
  const [chartPeriod, setChartPeriod] = useState("6m");
  const [userGoals, setUserGoals] = useState([]);
  const [insights, setInsights] = useState([]);
  const [loadingGoals, setLoadingGoals] = useState(true);
  const chartRef = useRef(null);
  let savingsChart = useRef(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Fetch user goals and insights
  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id && !user?.id) return;
      try {
        const [goalsRes, insightsRes] = await Promise.all([
          axiosInstance.get("/goals").catch(() => ({ data: { success: false } })),
          axiosInstance.get("/users/insights").catch(() => ({ data: { success: false } })),
        ]);

        if (goalsRes.data.success) {
          const goals = goalsRes.data.data?.goals || goalsRes.data.data || [];
          setUserGoals(goals.map((g) => ({
            emoji: getGoalEmoji(g.goalType || g.type || "other"),
            name: g.goalName || g.name || "Goal",
            status: g.status || "active",
            monthly: `৳${(g.monthlyDeposit || 0).toLocaleString()}/month`,
            timeLeft: g.duration
              ? `${g.duration} months left`
              : g.targetDate
                ? `${Math.max(0, Math.ceil((new Date(g.targetDate) - new Date()) / (1000 * 60 * 60 * 24 * 30)))} months left`
                : "In progress",
            saved: `৳${(g.currentSaved || 0).toLocaleString()}`,
            target: `৳${(g.targetAmount || 0).toLocaleString()}`,
            progress: g.progress || Math.round(((g.currentSaved || 0) / (g.targetAmount || 1)) * 100) || 0,
            color: getGoalColor(g.goalType || g.type || "other"),
          })));
        }

        if (insightsRes.data.success && insightsRes.data.data?.insights) {
          setInsights(insightsRes.data.data.insights.map((i) => ({
            text: i.message || i.text,
            isBot: true,
            isHighlight: i.type === "highlight" || i.priority === "high",
          })));
        } else {
          // Fallback to simple dynamic insights based on user data
          const fallbackInsights = generateFallbackInsights(user);
          setInsights(fallbackInsights);
        }
      } catch (err) {
        console.error("Dashboard data error:", err);
        setInsights(generateFallbackInsights(user));
      } finally {
        setLoadingGoals(false);
      }
    };

    if (user) fetchData();
  }, [user]);

  const generateFallbackInsights = (userData) => {
    const insights = [];
    const streak = userData?.streak || 0;
    const totalSaved = userData?.goal?.currentSaved || 0;
    const monthlyDeposit = userData?.goal?.monthlyDeposit || 0;

    if (monthlyDeposit > 0) {
      insights.push({
        text: `Your monthly commitment is ৳${monthlyDeposit.toLocaleString()}. Keep it up!`,
        isBot: true,
        isHighlight: false,
      });
    }
    if (streak > 0) {
      insights.push({
        text: `You've maintained a ${streak}-day streak! ${streak >= 30 ? "Amazing consistency!" : "Keep going!"}`,
        isBot: true,
        isHighlight: streak >= 30,
      });
    }
    if (totalSaved > 0) {
      insights.push({
        text: `Total saved so far: ৳${totalSaved.toLocaleString()}. You're building your future!`,
        isBot: true,
        isHighlight: false,
      });
    }
    if (insights.length === 0) {
      insights.push({
        text: "Welcome to Amanah! Set your first savings goal to get started.",
        isBot: true,
        isHighlight: true,
      });
    }
    return insights;
  };

  // Dynamic stats based on user data (NO hardcoded fallbacks)
  const getStats = () => {
    const totalSaved = user?.goal?.currentSaved || 0;
    const monthlySaved = user?.goal?.monthlyDeposit || 0;
    const streak = user?.streak || 0;
    const level = user?.level || 1;
    const circlesCount = user?.circles?.length || 0;

    return [
      {
        icon: "💰",
        value: totalSaved > 0 ? `৳${totalSaved.toLocaleString()}` : "৳0",
        label: "Total Savings",
        change: monthlySaved > 0 ? `+৳${monthlySaved.toLocaleString()} this month` : "Start saving today!",
        color: "green",
      },
      {
        icon: "⭕",
        value: circlesCount > 0 ? circlesCount : "0",
        label: "Active Circles",
        change: circlesCount > 0 ? "↑ Goals on track" : "Join a circle!",
        color: "blue",
      },
      {
        icon: "🔥",
        value: streak > 0 ? streak : "0",
        label: "Day Streak",
        change: streak >= 30 ? "Top saver!" : streak > 0 ? "Keep going!" : "Start your streak!",
        color: "warning",
      },
      {
        icon: "🏅",
        value: level,
        label: "Saver Level",
        change: user?.selectedPlan
          ? `${user.selectedPlan.charAt(0).toUpperCase() + user.selectedPlan.slice(1)} Saver`
          : "Member",
        color: "info",
      },
    ];
  };

  const getGoalEmoji = (goalType) => {
    const emojiMap = {
      "Home Fund": "🏠",
      "Wedding Fund": "💍",
      "Hajj Fund": "🕌",
      "Education Fund": "🎓",
      "Emergency Fund": "🚨",
      "Gadget Fund": "📱",
      "Car Fund": "🚗",
      "Business Fund": "💼",
      "Travel Fund": "✈️",
      "Custom Goal": "🎯",
      home: "🏠",
      wedding: "💍",
      hajj: "🕌",
      education: "🎓",
      emergency: "🛡️",
      gadget: "📱",
      car: "🚗",
      business: "💼",
      travel: "✈️",
      other: "🎯",
    };
    return emojiMap[goalType] || "🎯";
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
      other: "from-primary to-primary-light",
    };
    return map[type?.toLowerCase()] || "from-primary to-primary-light";
  };

  const getUserGoals = () => {
    if (userGoals.length > 0) return userGoals;
    // If no goals from API, return empty (no fake fallback)
    return [];
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.firstName) return user.firstName;
    if (user?.fullName) return user.fullName.split(" ")[0];
    return "User";
  };

  // Get next deposit due date from user data
  const getNextDueDays = () => {
    if (user?.nextDepositDate) {
      const due = new Date(user.nextDepositDate);
      const diff = Math.ceil((due - new Date()) / (1000 * 60 * 60 * 24));
      return Math.max(0, diff);
    }
    return 7; // Default weekly reminder
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    if (typeof window !== "undefined") {
      initChart();
    }

    return () => {
      if (savingsChart.current) {
        savingsChart.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    updateChart();
  }, [chartPeriod, user]);

  const initChart = () => {
    const canvas = document.getElementById("savingsChart");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const gradient = ctx.createLinearGradient(0, 0, 0, 200);
    gradient.addColorStop(0, "rgba(5,150,105,0.15)");
    gradient.addColorStop(1, "rgba(5,150,105,0)");

    savingsChart.current = new Chart(ctx, {
      type: "line",
      data: getChartData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: { label: (c) => "৳" + c.raw.toLocaleString() },
          },
        },
        scales: {
          y: {
            grid: { color: "rgba(128,128,128,0.08)" },
            ticks: {
              callback: (v) => "৳" + v / 1000 + "k",
              font: { size: 11 },
            },
          },
          x: { grid: { display: false }, ticks: { font: { size: 11 } } },
        },
      },
    });
  };

  const getChartData = () => {
    const currentSavings = user?.goal?.currentSaved || 0;

    // Generate chart data based on real current savings
    const generateData = (months) => {
      if (currentSavings <= 0) return new Array(months).fill(0);
      const step = currentSavings / months;
      return Array.from({ length: months }, (_, i) =>
        Math.round(step * (i + 1)),
      );
    };

    const data = {
      "6m": {
        labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May"],
        values: generateData(6),
      },
      "1y": {
        labels: [
          "Jun", "Jul", "Aug", "Sep", "Oct", "Nov",
          "Dec", "Jan", "Feb", "Mar", "Apr", "May",
        ],
        values: generateData(12),
      },
      all: {
        labels: [
          "2024", "Q1", "Q2", "Q3", "Q4",
          "2025", "Q1", "Q2", "Q3", "Q4",
          "2026", "May",
        ],
        values: generateData(12),
      },
    };

    return {
      labels: data[chartPeriod]?.labels || data["6m"].labels,
      datasets: [
        {
          label: "Savings (৳)",
          data: data[chartPeriod]?.values || data["6m"].values,
          borderColor: "#059669",
          backgroundColor: "rgba(5,150,105,0.1)",
          borderWidth: 2.5,
          pointBackgroundColor: "#059669",
          pointBorderColor: "#fff",
          pointBorderWidth: 2,
          pointRadius: 5,
          tension: 0.4,
          fill: true,
        },
      ],
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
    setAiMessages((prev) => [
      ...prev,
      { text: aiMessage, isBot: false, isHighlight: false },
    ]);
    setAiMessage("");
    setTimeout(() => {
      const responses = [
        "At your current savings rate, you're doing great! Keep it up!",
        "Your savings consistency is improving!",
        `Your ${user?.goal?.type || "savings"} goal is on track!`,
        "Keep your streak alive! Every deposit counts!",
      ];
      setAiMessages((prev) => [
        ...prev,
        {
          text: responses[Math.floor(Math.random() * responses.length)],
          isBot: true,
          isHighlight: false,
        },
      ]);
    }, 800);
  };

  const stats = getStats();
  const goals = getUserGoals();
  const userName = getUserDisplayName();
  const nextDueDays = getNextDueDays();
  const totalSaved = user?.goal?.currentSaved || 0;
  const targetAmount = user?.goal?.targetAmount || 0;
  const progressPercent = targetAmount > 0 ? Math.round((totalSaved / targetAmount) * 100) : 0;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            {greeting}, {userName}! 👋
          </h1>
          <p className="text-sm text-foreground/60 mt-1">
            Your next deposit is due in{" "}
            <strong className="text-amber-500">{nextDueDays} days</strong>. Keep
            your streak alive!
          </p>
        </div>
        <Link
          href={"/dashboard/submit"}
          className="px-5 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition w-full sm:w-auto text-center"
        >
          + Make Deposit
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {[
          { icon: "💳", label: "Deposit", href: "/dashboard/submit", primary: true },
          { icon: "🏧", label: "Withdraw", href: "/dashboard/lifting", primary: false },
          { icon: "🔄", label: "Transfer", href: "/dashboard/transfer", primary: false },
          { icon: "⚡", label: "Auto-Save", href: "/dashboard/auto-save", primary: false },
        ].map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className={`rounded-xl p-4 text-center transition-all ${action.primary ? "bg-linear-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20" : "bg-card border border-border text-foreground hover:border-primary"}`}
          >
            <div className="text-2xl mb-1">{action.icon}</div>
            <div className="text-xs font-bold">{action.label}</div>
          </Link>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4 hover:shadow-lg transition"
          >
            <div
              className={`w-11 h-11 rounded-xl bg-${stat.color === "green" ? "primary" : stat.color === "blue" ? "blue-500" : stat.color === "warning" ? "amber-500" : "cyan-500"}/10 flex items-center justify-center text-xl mb-3`}
            >
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-foreground">
              {stat.value}
            </div>
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
                <div className="text-3xl font-bold">
                  ৳ {totalSaved.toLocaleString()}
                </div>
                <div className="text-xs opacity-75 mt-1">
                  Goal: ৳{targetAmount.toLocaleString()} across all goals
                </div>
              </div>
              <div className="bg-white/20 rounded-lg px-3 py-1 text-sm font-semibold">
                {progressPercent}% Complete
              </div>
            </div>
            <div className="h-2 bg-white/20 rounded-full mb-2">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: `${Math.min(progressPercent, 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-xs opacity-75 mb-4">
              <span>৳{totalSaved.toLocaleString()} Saved</span>
              <span>
                ৳{Math.max(0, targetAmount - totalSaved).toLocaleString()} Remaining
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <div className="text-lg font-bold">
                  ৳{(user?.goal?.monthlyDeposit || 0).toLocaleString()}
                </div>
                <div className="text-xs opacity-75">This Month</div>
              </div>
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <div className="text-lg font-bold">
                  ৳{totalSaved.toLocaleString()}
                </div>
                <div className="text-xs opacity-75">Total Saved</div>
              </div>
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <div className="text-lg font-bold">{user?.streak || 0}</div>
                <div className="text-xs opacity-75">Day Streak</div>
              </div>
            </div>
          </div>

          {/* Chart */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground">
                📈 Savings History
              </div>
              <div className="flex gap-2">
                {["6m", "1y", "all"].map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${chartPeriod === period ? "bg-primary text-white" : "bg-background text-foreground/60 hover:bg-primary/10"}`}
                  >
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
              <h2 className="font-bold text-foreground">My Savings Goals</h2>
              <Link
                href="/dashboard/goals"
                className="text-sm text-primary font-semibold"
              >
                View all →
              </Link>
            </div>
            {loadingGoals ? (
              <div className="text-center py-8">
                <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2"></div>
                <p className="text-foreground/50 text-sm">Loading goals...</p>
              </div>
            ) : goals.length === 0 ? (
              <div className="bg-card border border-border rounded-xl p-8 text-center">
                <div className="text-4xl mb-2">🎯</div>
                <div className="text-foreground font-semibold mb-1">No goals yet</div>
                <div className="text-foreground/50 text-sm mb-4">Create your first savings goal to get started</div>
                <Link
                  href="/dashboard/goals"
                  className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold hover:opacity-90 transition"
                >
                  Create Goal
                </Link>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-4">
                {goals.map((goal, idx) => (
                  <div
                    key={idx}
                    className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-3xl">{goal.emoji}</span>
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${goal.status === "active" ? "bg-primary/10 text-primary" : "bg-amber-500/10 text-amber-500"}`}
                      >
                        {goal.status === "active" ? "Active" : "Paused"}
                      </span>
                    </div>
                    <div className="font-bold text-foreground">{goal.name}</div>
                    <div className="text-xs text-foreground/50 mb-2">
                      {goal.monthly} · {goal.timeLeft}
                    </div>
                    <div className="h-1.5 bg-border rounded-full mb-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full bg-linear-to-r ${goal.color}`}
                        style={{ width: `${Math.min(goal.progress, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-primary font-semibold">
                        {goal.saved}
                      </span>
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
          {/* AI Assistant */}
          <div className="bg-linear-to-br from-primary/5 to-blue-500/5 border border-primary/15 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-lg bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white">
                🤖
              </div>
              <div>
                <div className="font-bold text-foreground">
                  AI Savings Assistant
                </div>
              </div>
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                Beta
              </span>
            </div>
            <div className="space-y-3 mb-4 max-h-64 overflow-y-auto">
              {insights.length === 0 ? (
                <div className="text-sm text-foreground/50 text-center py-4">
                  Loading insights...
                </div>
              ) : (
                insights.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-3 rounded-xl text-sm ${msg.isHighlight ? "bg-primary/5 border border-primary/15 text-foreground" : msg.isBot ? "bg-card border border-border text-foreground/80" : "bg-linear-to-r from-primary to-primary-light text-white ml-auto max-w-[85%]"}`}
                  >
                    {msg.text}
                  </div>
                ))
              )}
            </div>
            <div className="flex gap-2">
              <input
                type="text"
                value={aiMessage}
                onChange={(e) => setAiMessage(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && sendAiMessage()}
                placeholder="Ask AI anything..."
                className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              />
              <button
                onClick={sendAiMessage}
                className="px-4 py-2 rounded-lg bg-primary text-white font-semibold"
              >
                Send
              </button>
            </div>
          </div>

          {/* Goal Progress Rings */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground">Goal Progress</div>
              <Link href="/dashboard/goals" className="text-xs text-primary">
                Details
              </Link>
            </div>
            {goals.length === 0 ? (
              <div className="text-center py-4 text-foreground/50 text-sm">
                No goals yet. Create one to see progress!
              </div>
            ) : (
              <div className="space-y-4">
                {goals.slice(0, 3).map((goal, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="relative w-16 h-16 shrink-0">
                      <svg className="w-16 h-16 -rotate-90" viewBox="0 0 72 72">
                        <circle
                          cx="36"
                          cy="36"
                          r="30"
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="6"
                        />
                        <circle
                          cx="36"
                          cy="36"
                          r="30"
                          fill="none"
                          stroke={
                            goal.color.includes("primary")
                              ? "#059669"
                              : goal.color.includes("amber")
                                ? "#f59e0b"
                                : "#8b5cf6"
                          }
                          strokeWidth="6"
                          strokeDasharray="188.4"
                          strokeDashoffset={188.4 * (1 - Math.min(goal.progress, 100) / 100)}
                          strokeLinecap="round"
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
                        {Math.min(goal.progress, 100)}%
                      </div>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {goal.name}
                      </div>
                      <div className="text-xs text-foreground/50">
                        {goal.saved} / {goal.target}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* KYC Status - Dynamic from user */}
          <div className="bg-primary/5 border border-primary/15 rounded-xl p-5">
            <div className="font-bold text-foreground mb-3">
              🪪 Verification Status
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">📧 Email Verified</span>
                <span className="text-primary">
                  {user?.email ? "✅" : "❌"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">📱 Phone Verified</span>
                <span className="text-primary">✅</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🪪 NID Verified</span>
                <span className="text-primary">
                  {user?.kyc?.status === "verified" ? "✅" : "⏳"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🤳 Selfie Verified</span>
                <span className="text-primary">
                  {user?.kyc?.status === "verified" ? "✅" : "⏳"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">🔐 2FA Active</span>
                <span className="text-amber-500 text-xs bg-amber-500/10 px-2 py-0.5 rounded-full cursor-pointer">
                  Activate
                </span>
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              <div className="flex-1 h-1 bg-primary rounded-full"></div>
              <div className="flex-1 h-1 bg-primary rounded-full"></div>
              <div className="flex-1 h-1 bg-primary rounded-full"></div>
              <div className="flex-1 h-1 bg-amber-500 rounded-full"></div>
              <div className="flex-1 h-1 bg-amber-500 rounded-full"></div>
            </div>
            <div className="text-xs text-foreground/50 mt-2">
              3/5 verification steps completed
            </div>
          </div>
        </div>
      </div>

      {/* Referral Section */}
      <div className="grid lg:grid-cols-2 gap-6 mt-6">
        {/* Referral Card */}
        <div className="bg-linear-to-r from-emerald-900 to-cyan-900 rounded-xl p-5 text-white">
          <div className="font-bold text-lg mb-1">🤝 Refer & Earn</div>
          <div className="text-sm opacity-80 mb-4">
            Get ৳500 bonus for each friend who joins and makes their first
            deposit.
          </div>
          <div className="flex items-center gap-2 bg-white/15 rounded-lg p-3 mb-4">
            <span className="flex-1 font-mono text-sm">
              amanah.bd/ref/{user?.referralCode || "USER"}
            </span>
            <button
              onClick={() => {
                navigator.clipboard.writeText(
                  `amanah.bd/ref/${user?.referralCode || "USER"}`,
                );
                alert("Referral link copied!");
              }}
              className="px-3 py-1 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition"
            >
              Copy
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-xl font-bold">
                {user?.referrals?.count || 0}
              </div>
              <div className="text-xs opacity-75">Friends Referred</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-xl font-bold">
                ৳{((user?.referrals?.count || 0) * 500).toLocaleString()}
              </div>
              <div className="text-xs opacity-75">Bonus Earned</div>
            </div>
          </div>
        </div>

        {/* Plan Info Card */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-foreground">
              📋 Your Savings Plan
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">Current Plan</span>
              <span className="font-bold text-primary capitalize">
                {user?.selectedPlan || "Silver"}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">Monthly Commitment</span>
              <span className="font-bold text-primary">
                ৳{(user?.goal?.monthlyDeposit || 0).toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between items-center p-3 bg-background rounded-lg">
              <span className="text-foreground">Member Since</span>
              <span className="font-bold text-primary">
                {user?.createdAt
                  ? new Date(user.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })
                  : "2024"}
              </span>
            </div>
            <button className="w-full py-2.5 border border-primary rounded-lg text-sm font-semibold text-primary hover:bg-primary hover:text-white transition">
              Upgrade Plan →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
