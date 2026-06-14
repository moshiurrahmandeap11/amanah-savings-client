"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Chart from "chart.js/auto";
import {
  Download,
} from "lucide-react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://server-amanah-savings.onrender.com/api";

const AdminDashboardPage = () => {
  const router = useRouter();
  const [currentDate, setCurrentDate] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    pendingKyc: 0,
    pendingDeposits: 0,
    pendingWithdrawals: 0,
    totalDepositsAmount: 0,
    totalWithdrawalsAmount: 0,
    todayDeposits: 0,
    todayWithdrawals: 0,
    monthDeposits: 0,
    monthWithdrawals: 0,
    bannedUsers: 0,
    newUsersToday: 0,
    newUsersThisWeek: 0,
    newUsersThisMonth: 0,
  });
  const [recent, setRecent] = useState({ users: [], deposits: [], withdrawals: [] });
  const [loading, setLoading] = useState(true);
  const growthChartRef = useRef(null);
  let growthChart = useRef(null);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchDashboard = useCallback(async () => {
    try {
      const res = await axios.get(`${API_BASE}/admin/dashboard`, {
        headers: getAuthHeaders(),
      });
      if (res.data.success) {
        setStats(res.data.data.stats);
        setRecent(res.data.data.recent);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    setCurrentDate(`${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`);
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    const canvas = document.getElementById("growthChart");
    if (canvas && !loading) {
      const ctx = canvas.getContext("2d");
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const tickColor = isDark ? "#64748b" : "#94a3b8";
      const gridColor = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)";

      if (growthChart.current) growthChart.current.destroy();
      growthChart.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          datasets: [
            {
              label: "New Members",
              data: [stats.newUsersThisWeek > 0 ? Math.round(stats.newUsersThisWeek * 0.2) : 10, stats.newUsersThisWeek > 0 ? Math.round(stats.newUsersThisWeek * 0.25) : 15, stats.newUsersThisWeek > 0 ? Math.round(stats.newUsersThisWeek * 0.3) : 20, stats.newUsersThisWeek > 0 ? Math.round(stats.newUsersThisWeek * 0.25) : 12],
              backgroundColor: "rgba(5,150,105,0.75)",
              borderColor: "#059669",
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
            y: { beginAtZero: true, grid: { color: gridColor }, ticks: { font: { size: 11 }, color: tickColor } },
            x: { grid: { display: false }, ticks: { font: { size: 11 }, color: tickColor } },
          },
        },
      });
    }
    return () => { if (growthChart.current) growthChart.current.destroy(); };
  }, [loading, stats.newUsersThisWeek]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const navigateTo = (page) => {
    router.push(`/admin/${page}`);
  };

  const formatCurrency = (amount) => {
    if (!amount) return "৳0";
    if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(1)} Cr`;
    if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)}L`;
    if (amount >= 1000) return `৳${(amount / 1000).toFixed(1)}K`;
    return `৳${amount.toLocaleString("en-IN")}`;
  };

  const statCards = [
    { icon: "👥", value: stats.totalUsers.toLocaleString("en-IN"), label: "Total Members", trend: `+${stats.newUsersToday} today`, trendUp: true, bg: "bg-primary/10", onClick: "users" },
    { icon: "💰", value: formatCurrency(stats.totalDepositsAmount - stats.totalWithdrawalsAmount), label: "Net Savings", trend: `+${formatCurrency(stats.todayDeposits)} today`, trendUp: true, bg: "bg-blue-500/10", onClick: "savings" },
    { icon: "⭕", value: stats.activeUsers.toLocaleString("en-IN"), label: "Active Users", trend: `${((stats.activeUsers / Math.max(stats.totalUsers, 1)) * 100).toFixed(1)}% active`, trendUp: true, bg: "bg-amber-500/10", onClick: "users" },
    { icon: "✅", value: `${((stats.activeUsers / Math.max(stats.totalUsers, 1)) * 100).toFixed(1)}%`, label: "Activation Rate", trend: `${stats.pendingKyc} KYC pending`, trendUp: stats.pendingKyc === 0, bg: "bg-purple-500/10", onClick: "kyc" },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h1 className="text-xl font-bold text-foreground">Platform Overview</h1>
          <p className="text-sm text-foreground/50">Real-time metrics as of {currentDate}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => showToast("📅 Date range picker coming soon")} className="px-4 py-2 rounded-lg border border-border bg-card text-foreground/70 text-xs font-semibold hover:border-primary transition">
            📅 Last 30 Days
          </button>
          <button onClick={() => showToast("⬇️ Generating report...")} className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs font-semibold flex items-center gap-1">
            <Download size={12} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {statCards.map((stat, idx) => (
          <div key={idx} onClick={() => navigateTo(stat.onClick)} className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-lg transition">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center text-xl`}>{stat.icon}</div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>{stat.trend}</span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">{stat.value}</div>
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
              <div className="font-bold text-foreground">📈 Platform Growth</div>
              <div className="flex gap-2">
                <button className="px-3 py-1 rounded-lg text-xs font-semibold bg-primary text-white">Members</button>
                <button className="px-3 py-1 rounded-lg text-xs font-semibold bg-card border border-border text-foreground/70 hover:border-primary transition">Savings</button>
                <button className="px-3 py-1 rounded-lg text-xs font-semibold bg-card border border-border text-foreground/70 hover:border-primary transition">Revenue</button>
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
                <div className="font-bold text-foreground">🏧 Pending Withdrawals</div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500">{stats.pendingWithdrawals} pending</span>
              </div>
              <div className="space-y-3">
                {recent.withdrawals.length === 0 ? (
                  <div className="text-sm text-foreground/50 text-center py-4">No pending withdrawals</div>
                ) : (
                  recent.withdrawals.map((wd, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-background border border-border">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="font-bold text-lg text-primary">{formatCurrency(wd.amount)}</div>
                          <div className="text-sm text-foreground">User ID: {wd.userId}</div>
                          <span className="text-xs font-semibold px-2 py-0.5 rounded-full mt-1 inline-block bg-amber-500/20 text-amber-500">⏳ Pending</span>
                        </div>
                        <div className="flex flex-col gap-2">
                          <button onClick={() => navigateTo("withdrawals")} className="px-3 py-1 rounded-lg text-xs font-bold bg-primary/10 text-primary border border-primary/30 hover:bg-primary hover:text-white transition">Review</button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* KYC Queue */}
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="font-bold text-foreground">🪪 KYC Queue</div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-500">{stats.pendingKyc} pending</span>
              </div>
              <div className="space-y-3">
                {recent.users.filter(u => u.kycStatus === "pending").length === 0 ? (
                  <div className="text-sm text-foreground/50 text-center py-4">No pending KYC</div>
                ) : (
                  recent.users.filter(u => u.kycStatus === "pending").slice(0, 5).map((kyc, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border">
                      <div className="w-9 h-9 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold">
                        {kyc.name?.[0] || "?"}
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-foreground">{kyc.name}</div>
                        <div className="text-xs text-foreground/50">Submitted {new Date(kyc.createdAt).toLocaleDateString()}</div>
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => navigateTo("kyc")} className="w-8 h-8 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition">✓</button>
                        <button onClick={() => navigateTo("kyc")} className="w-8 h-8 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition">✗</button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Fraud Alerts - Static for now */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground">🚨 Fraud Alerts</div>
              <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-500">{stats.bannedUsers} banned</span>
            </div>
            <div className="space-y-3">
              <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5">
                <div className="flex items-start gap-2">
                  <span className="text-xl">🟡</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">Account Monitoring</div>
                    <div className="text-xs text-foreground/60">{stats.bannedUsers} users currently banned</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Today's Deposits */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground">📥 Today&apos;s Deposits</div>
              <button onClick={() => navigateTo("deposits")} className="text-xs text-primary font-semibold">View all →</button>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">{formatCurrency(stats.todayDeposits)}</div>
                <div className="text-xs text-foreground/50">Total Today</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-foreground">{stats.pendingDeposits}</div>
                <div className="text-xs text-foreground/50">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-amber-500">{stats.monthDeposits > 0 ? formatCurrency(stats.monthDeposits) : "৳0"}</div>
                <div className="text-xs text-foreground/50">This Month</div>
              </div>
            </div>
            <div className="space-y-2">
              {recent.deposits.length === 0 ? (
                <div className="text-sm text-foreground/50 text-center py-2">No deposits today</div>
              ) : (
                recent.deposits.map((deposit, idx) => (
                  <div key={idx} className="flex items-center gap-3 py-2 border-b border-border last:border-0">
                    <span>💳</span>
                    <span className="flex-1 text-sm">User {deposit.userId?.toString().slice(-4)}</span>
                    <span className="font-bold text-primary">{formatCurrency(deposit.amount)}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500">Pending</span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground">💵 Revenue Streams</div>
              <span className="text-xs text-foreground/50">This Month</span>
            </div>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Deposits</span>
                  <span className="font-bold">{formatCurrency(stats.monthDeposits)}</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-linear-to-r from-primary to-primary-light" style={{ width: "60%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Withdrawals</span>
                  <span className="font-bold">{formatCurrency(stats.monthWithdrawals)}</span>
                </div>
                <div className="h-1.5 bg-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full bg-linear-to-r from-blue-500 to-cyan-500" style={{ width: "35%" }} />
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-primary/5 border border-primary/15 rounded-lg flex justify-between items-center">
              <span className="text-sm font-semibold">Net Flow</span>
              <span className="text-xl font-bold text-primary">{formatCurrency(stats.monthDeposits - stats.monthWithdrawals)}</span>
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
