"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Chart from "chart.js/auto";
import {
  Users,
  DollarSign,
  Target,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Eye,
  Shield,
  Wallet,
  CreditCard,
  Clock,
  Calendar,
  Download,
  RefreshCw,
} from "lucide-react";

const AdminDashboardPage = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const growthChartRef = useRef(null);
  let growthChart = useRef(null);

  const stats = [
    {
      icon: "👥",
      value: "12,456",
      label: "Total Members",
      trend: "+124 today",
      trendUp: true,
      bg: "bg-primary/10",
      onClick: "users",
    },
    {
      icon: "💰",
      value: "৳48.7 Cr",
      label: "Total Savings",
      trend: "+৳8.4L today",
      trendUp: true,
      bg: "bg-blue-500/10",
      onClick: "savings",
    },
    {
      icon: "⭕",
      value: "1,247",
      label: "Active Circles",
      trend: "+18 this week",
      trendUp: true,
      bg: "bg-amber-500/10",
      onClick: "savings",
    },
    {
      icon: "✅",
      value: "98.2%",
      label: "Goal Completion",
      trend: "↑ 98.2%",
      trendUp: true,
      bg: "bg-purple-500/10",
      onClick: "analytics",
    },
  ];

  const pendingWithdrawals = [
    {
      amount: "৳1,80,000",
      user: "Fatema A.",
      goal: "Wedding Fund",
      reason: "Early withdrawal requested",
      isEarly: true,
    },
    {
      amount: "৳85,000",
      user: "Karim H.",
      goal: "Bike Fund",
      reason: "Goal matured",
      isEarly: false,
    },
  ];

  const kycQueue = [
    {
      initial: "N",
      name: "Nasrin Begum",
      time: "2 hrs ago",
      docs: ["NID", "Selfie", "Phone"],
    },
    {
      initial: "R",
      name: "Rahim Khan",
      time: "4 hrs ago",
      docs: ["NID", "Selfie mismatch"],
      color: "from-amber-500 to-orange-500",
    },
  ];

  const fraudAlerts = [
    {
      type: "high",
      icon: "🔴",
      title: "Multi-account Detected",
      desc: "User ID #4821 — 3 accounts from same device",
      risk: 92,
      color: "red",
    },
    {
      type: "medium",
      icon: "🟡",
      title: "Suspicious Login",
      desc: "User #2341 — Login from new country",
      risk: 58,
      color: "amber",
    },
    {
      type: "medium",
      icon: "🟡",
      title: "Unusual Deposit Pattern",
      desc: "User #7720 — 12 deposits in 1 hour",
      risk: 67,
      color: "amber",
    },
  ];

  const todayDeposits = [
    {
      method: "💳",
      user: "Fatema A.",
      goal: "Wedding",
      amount: "+৳10,000",
      status: "done",
    },
    {
      method: "💳",
      user: "Karim H.",
      goal: "Hajj",
      amount: "+৳20,000",
      status: "done",
    },
    {
      method: "⏳",
      user: "Nadia S.",
      goal: "Education",
      amount: "+৳5,000",
      status: "pending",
    },
    {
      method: "💳",
      user: "Rashed M.",
      goal: "Bike",
      amount: "+৳3,000",
      status: "done",
    },
  ];

  const revenueStreams = [
    {
      label: "Membership Fees",
      value: "৳2,40,000",
      percent: 60,
      color: "from-primary to-primary-light",
    },
    {
      label: "Deposit Processing",
      value: "৳1,40,000",
      percent: 35,
      color: "from-blue-500 to-cyan-500",
    },
    {
      label: "Referral Commissions",
      value: "৳80,000",
      percent: 20,
      color: "from-amber-500 to-orange-500",
    },
    {
      label: "Early Withdrawal Fee",
      value: "৳40,000",
      percent: 10,
      color: "from-purple-500 to-indigo-500",
    },
  ];

  const GROWTH_DATA = {
    members: {
      label: "New Members",
      data: [820, 1240, 1580, 1890, 2100, 2456],
      color: "rgba(5,150,105,0.75)",
      borderColor: "#059669",
    },
    savings: {
      label: "Total Savings (Lakh ৳)",
      data: [42, 58, 74, 88, 96, 112],
      color: "rgba(59,130,246,0.75)",
      borderColor: "#3b82f6",
    },
    revenue: {
      label: "Revenue (Thousand ৳)",
      data: [280, 340, 410, 490, 560, 720],
      color: "rgba(139,92,246,0.75)",
      borderColor: "#8b5cf6",
    },
  };
  const GROWTH_LABELS = [
    "Dec 25",
    "Jan 26",
    "Feb 26",
    "Mar 26",
    "Apr 26",
    "May 26",
  ];

  useEffect(() => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    setCurrentDate(
      `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`,
    );

    // Initialize chart
    const canvas = document.getElementById("growthChart");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      const isDark =
        document.documentElement.getAttribute("data-theme") === "dark";
      const tickColor = isDark ? "#64748b" : "#94a3b8";
      const gridColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)";
      const d = GROWTH_DATA.members;

      if (growthChart.current) growthChart.current.destroy();
      growthChart.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: GROWTH_LABELS,
          datasets: [
            {
              label: d.label,
              data: d.data,
              backgroundColor: d.color,
              borderColor: d.borderColor,
              borderWidth: 1,
              borderRadius: 6,
              borderSkipped: false,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { display: false } },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: gridColor },
              ticks: { font: { size: 11 }, color: tickColor },
            },
            x: {
              grid: { display: false },
              ticks: { font: { size: 11 }, color: tickColor },
            },
          },
        },
      });
    }

    return () => {
      if (growthChart.current) growthChart.current.destroy();
    };
  }, []);

  const switchGrowthChart = (type) => {
    const d = GROWTH_DATA[type];
    if (growthChart.current && d) {
      growthChart.current.data.datasets[0].label = d.label;
      growthChart.current.data.datasets[0].data = d.data;
      growthChart.current.data.datasets[0].backgroundColor = d.color;
      growthChart.current.data.datasets[0].borderColor = d.borderColor;
      growthChart.current.update();
    }
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const navigateTo = (page) => {
    router.push(`/admin/${page}`);
  };

  const approveWithdrawal = (btn) => {
    const item = btn.closest(".wd-item");
    if (item) item.style.opacity = "0.5";
    showToast("✅ Withdrawal approved — processing transfer");
  };

  const rejectWithdrawal = () => {
    showToast("❌ Withdrawal rejected — member notified");
  };

  const approveKYC = (btn) => {
    const item = btn.closest(".kyc-item");
    if (item) item.style.opacity = "0.5";
    showToast("✅ KYC approved");
  };

  const rejectKYC = () => {
    showToast("❌ KYC rejected — member notified");
  };

  const reviewFraud = (btn) => {
    btn.textContent = "Reviewing...";
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = "Reviewed ✓";
      btn.className =
        "px-3 py-1 rounded-lg text-xs font-bold bg-green-500/20 text-green-400";
    }, 1000);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-foreground">
            Platform Overview
          </h1>
          <p className="text-sm text-foreground/50">
            Real-time metrics as of {currentDate}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => showToast("📅 Date range picker coming soon")}
            className="px-4 py-2 rounded-lg border border-border bg-card text-foreground/70 text-xs font-semibold hover:border-primary transition"
          >
            📅 Last 30 Days
          </button>
          <button
            onClick={() => showToast("⬇️ Generating report...")}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs font-semibold flex items-center gap-1"
          >
            <Download size={12} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            onClick={() => navigateTo(stat.onClick)}
            className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start">
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center text-xl`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
              >
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">
              {stat.value}
            </div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
            <div className="h-1 bg-border rounded-full mt-3 overflow-hidden">
              <div className="h-full w-[78%] bg-linear-to-r from-primary to-primary-light rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid lg:grid-cols-3 gap-5 mb-5">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-5">
          {/* Growth Chart Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground">
                📈 Platform Growth
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => switchGrowthChart("members")}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-primary text-white"
                >
                  Members
                </button>
                <button
                  onClick={() => switchGrowthChart("savings")}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-card border border-border text-foreground/70 hover:border-primary transition"
                >
                  Savings
                </button>
                <button
                  onClick={() => switchGrowthChart("revenue")}
                  className="px-3 py-1 rounded-lg text-xs font-semibold bg-card border border-border text-foreground/70 hover:border-primary transition"
                >
                  Revenue
                </button>
              </div>
            </div>
            <div className="h-64">
              <canvas id="growthChart" />
            </div>
          </div>

          {/* Action Queue Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            {/* Pending Withdrawals */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-foreground">
                  🏧 Pending Withdrawals
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500">
                  8 pending
                </span>
              </div>
              <div className="space-y-3">
                {pendingWithdrawals.map((wd, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-background border border-border"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-bold text-lg text-primary">
                          {wd.amount}
                        </div>
                        <div className="text-sm text-foreground">
                          {wd.user} · {wd.goal}
                        </div>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${wd.isEarly ? "bg-amber-500/20 text-amber-500" : "bg-green-500/20 text-green-500"}`}
                        >
                          {wd.isEarly
                            ? "⚠️ Early withdrawal requested"
                            : "✅ Goal matured"}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={(e) => approveWithdrawal(e.target)}
                          className="px-3 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white transition"
                        >
                          ✓ Approve
                        </button>
                        <button
                          onClick={rejectWithdrawal}
                          className="px-3 py-1 rounded-lg text-xs font-bold bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500 hover:text-white transition"
                        >
                          ✗ Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* KYC Queue */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-foreground">🪪 KYC Queue</div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-500">
                  23 pending
                </span>
              </div>
              <div className="space-y-3">
                {kycQueue.map((kyc, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border"
                  >
                    <div
                      className={`w-9 h-9 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold ${kyc.color ? kyc.color : ""}`}
                    >
                      {kyc.initial}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">
                        {kyc.name}
                      </div>
                      <div className="text-xs text-foreground/50">
                        Submitted {kyc.time}
                      </div>
                      <div className="flex gap-1 mt-1">
                        {kyc.docs.map((doc, i) => (
                          <span
                            key={i}
                            className={`text-[10px] px-2 py-0.5 rounded-full ${doc === "Selfie mismatch" ? "bg-amber-500/20 text-amber-500" : "bg-blue-500/20 text-blue-500"}`}
                          >
                            {doc}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={approveKYC}
                        className="w-8 h-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition"
                      >
                        ✓
                      </button>
                      <button
                        onClick={rejectKYC}
                        className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition"
                      >
                        ✗
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Fraud Alerts */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground">🚨 Fraud Alerts</div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-500">
                5 HIGH
              </span>
            </div>
            <div className="space-y-3">
              {fraudAlerts.map((alert, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-lg border ${alert.type === "high" ? "border-red-500/30 bg-red-500/5" : "border-amber-500/30 bg-amber-500/5"}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-xl">{alert.icon}</span>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">
                        {alert.title}
                      </div>
                      <div className="text-xs text-foreground/60">
                        {alert.desc}
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${alert.color === "red" ? "bg-red-500" : "bg-amber-500"}`}
                            style={{ width: `${alert.risk}%` }}
                          />
                        </div>
                        <span
                          className={`text-xs font-bold ${alert.color === "red" ? "text-red-500" : "text-amber-500"}`}
                        >
                          Risk: {alert.risk}%
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={(e) => reviewFraud(e.target)}
                      className="px-3 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary hover:bg-primary hover:text-white transition"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Deposits */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground">
                📥 Today&apos;s Deposits
              </div>
              <button
                onClick={() => navigateTo("deposits")}
                className="text-xs text-primary font-semibold"
              >
                View all →
              </button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">৳8,40,000</div>
                <div className="text-xs text-foreground/50">Total Today</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">47</div>
                <div className="text-xs text-foreground/50">Deposits</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-500">8</div>
                <div className="text-xs text-foreground/50">Pending</div>
              </div>
            </div>
            <div className="space-y-2">
              {todayDeposits.map((deposit, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                >
                  <span>{deposit.method}</span>
                  <span className="flex-1 text-sm">
                    {deposit.user} — {deposit.goal}
                  </span>
                  <span className="font-bold text-primary">
                    {deposit.amount}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${deposit.status === "done" ? "bg-green-500/20 text-green-500" : "bg-amber-500/20 text-amber-500"}`}
                  >
                    {deposit.status === "done" ? "Done" : "Pending"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground">
                💵 Revenue Streams
              </div>
              <span className="text-xs text-foreground/50">May 2026</span>
            </div>
            <div className="space-y-3">
              {revenueStreams.map((stream, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{stream.label}</span>
                    <span className="font-bold">{stream.value}</span>
                  </div>
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full bg-linear-to-r ${stream.color}`}
                      style={{ width: `${stream.percent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-primary/5 border border-primary/15 rounded-lg flex justify-between items-center">
              <span className="text-sm font-semibold">
                Total Monthly Revenue
              </span>
              <span className="text-xl font-bold text-primary">৳5,00,000</span>
            </div>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg animate-in fade-in slide-in-from-bottom-4">
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;
