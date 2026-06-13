"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Chart from "chart.js/auto";
import useAuth from "../../../hooks/useAuth";

const DashboardPage = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();
  const [greeting, setGreeting] = useState("");
  const [aiMessage, setAiMessage] = useState("");
  const [aiMessages, setAiMessages] = useState([
    {
      text: "Save an extra ৳500 per week to complete your goal 2 months early!",
      isBot: true,
      isHighlight: true,
    },
    {
      text: "You've maintained a 90-day streak! You're in the top 5% of savers this month.",
      isBot: true,
      isHighlight: false,
    },
    {
      text: "You saved 28% more consistently this month compared to last month.",
      isBot: true,
      isHighlight: false,
    },
  ]);
  const [chartPeriod, setChartPeriod] = useState("6m");
  const chartRef = useRef(null);
  let savingsChart = useRef(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  // Dynamic stats based on user data
  const getStats = () => {
    const totalSaved = user?.goal?.currentSaved || 245500;
    const monthlySaved = user?.goal?.monthlyDeposit || 15000;
    const streak = user?.streak || 90;
    const level = user?.level || 7;

    return [
      {
        icon: "💰",
        value: `৳${totalSaved.toLocaleString()}`,
        label: "Total Savings",
        change: `+৳${monthlySaved.toLocaleString()} this month`,
        color: "green",
      },
      {
        icon: "⭕",
        value: user?.circles?.length || "4",
        label: "Active Circles",
        change: "↑ Goals on track",
        color: "blue",
      },
      {
        icon: "🔥",
        value: streak,
        label: "Day Streak",
        change: streak >= 90 ? "Top 5% saver!" : "Keep going!",
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

  // Get user goals from API or use default
  const getUserGoals = () => {
    if (user?.goal?.type) {
      return [
        {
          emoji: getGoalEmoji(user.goal.type),
          name: user.goal.type,
          status: "active",
          monthly: `৳${(user.goal.monthlyDeposit || 0).toLocaleString()}/month`,
          timeLeft: user.goal.duration
            ? `${user.goal.duration} months left`
            : "In progress",
          saved: `৳${(user.goal.currentSaved || 0).toLocaleString()}`,
          target: `৳${(user.goal.targetAmount || 0).toLocaleString()}`,
          progress: user.goal.progress || 0,
          color: "from-primary to-primary-light",
        },
        // Add more goals if available from API
      ];
    }

    // Fallback goals
    return [
      {
        emoji: "💍",
        name: "Wedding Fund",
        status: "active",
        monthly: "৳10,000/month",
        timeLeft: "6 months left",
        saved: "৳1,80,000",
        target: "৳2,50,000",
        progress: 72,
        color: "from-primary to-primary-light",
      },
      {
        emoji: "🕌",
        name: "Hajj Fund",
        status: "active",
        monthly: "৳5,000/month",
        timeLeft: "30 months left",
        saved: "৳39,000",
        target: "৳1,50,000",
        progress: 26,
        color: "from-amber-500 to-orange-500",
      },
      {
        emoji: "🎓",
        name: "Education Fund",
        status: "active",
        monthly: "৳3,000/month",
        timeLeft: "10 months left",
        saved: "৳18,000",
        target: "৳36,000",
        progress: 50,
        color: "from-purple-500 to-indigo-500",
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
    };
    return emojiMap[goalType] || "🎯";
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.firstName) return user.firstName;
    if (user?.fullName) return user.fullName.split(" ")[0];
    return "User";
  };

  // Get next deposit due date (mock data - replace with API)
  const getNextDueDays = () => {
    // This should come from API
    return 3;
  };

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 17) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");

    // Initialize chart
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
    // Use real user data if available
    const currentSavings = user?.goal?.currentSaved || 245500;

    // Generate realistic chart data based on current savings
    const generateData = (months, startValue) => {
      const step = currentSavings / months;
      return Array.from({ length: months }, (_, i) =>
        Math.round(step * (i + 1)),
      );
    };

    const data = {
      "6m": {
        labels: ["Dec", "Jan", "Feb", "Mar", "Apr", "May"],
        values: generateData(6, currentSavings - 150000),
      },
      "1y": {
        labels: [
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
        ],
        values: generateData(12, currentSavings - 220000),
      },
      all: {
        labels: [
          "2024",
          "Q1",
          "Q2",
          "Q3",
          "Q4",
          "2025",
          "Q1",
          "Q2",
          "Q3",
          "Q4",
          "2026",
          "May",
        ],
        values: generateData(12, currentSavings - 245000),
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
    setAiMessages([
      ...aiMessages,
      { text: aiMessage, isBot: false, isHighlight: false },
    ]);
    setAiMessage("");
    setTimeout(() => {
      const responses = [
        "At your current savings rate, increasing by ৳500/week would help you reach your goal faster!",
        "Your savings consistency score is 94% — excellent!",
        `Your ${user?.goal?.type || "savings"} goal is on track to be completed soon!`,
        "Keep your streak alive! Only 10 more days until the 100-day badge!",
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
  const totalSaved = user?.goal?.currentSaved || 245500;
  const targetAmount = user?.goal?.targetAmount || 500000;
  const progressPercent = Math.round((totalSaved / targetAmount) * 100) || 49;

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
          {
            icon: "💳",
            label: "Deposit",
            href: "/dashboard/submit",
            primary: true,
          },
          {
            icon: "🏧",
            label: "Withdraw",
            href: "/dashboard/lifting",
            primary: false,
          },
          {
            icon: "🔄",
            label: "Transfer",
            href: "/dashboard/transfer",
            primary: false,
          },
          {
            icon: "⚡",
            label: "Auto-Save",
            href: "/dashboard/auto-save",
            primary: false,
          },
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
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-xs opacity-75 mb-4">
              <span>৳{totalSaved.toLocaleString()} Saved</span>
              <span>
                ৳{(targetAmount - totalSaved).toLocaleString()} Remaining
              </span>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/15 rounded-lg p-2 text-center">
                <div className="text-lg font-bold">
                  ৳{user?.goal?.monthlyDeposit?.toLocaleString() || 15000}
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
                <div className="text-lg font-bold">{user?.streak || 90}</div>
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
                      style={{ width: `${goal.progress}%` }}
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
              {aiMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl text-sm ${msg.isHighlight ? "bg-primary/5 border border-primary/15 text-foreground" : msg.isBot ? "bg-card border border-border text-foreground/80" : "bg-linear-to-r from-primary to-primary-light text-white ml-auto max-w-[85%]"}`}
                >
                  {msg.text}
                </div>
              ))}
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
                        strokeDashoffset={188.4 * (1 - goal.progress / 100)}
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-sm font-bold text-foreground">
                      {goal.progress}%
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
                ৳{user?.goal?.monthlyDeposit?.toLocaleString() || 5000}
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
