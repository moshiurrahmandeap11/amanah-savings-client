"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "৳০";
  if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(1)} কোটি`;
  if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)} লাখ`;
  if (amount >= 1000) return `৳${(amount / 1000).toFixed(1)}K`;
  return `৳${amount.toLocaleString("en-BD")}`;
};

// backend থেকে plan name অনুযায়ী color
const PLAN_COLORS = {
  bronze: "#cd7f32",
  silver: "#94a3b8",
  gold: "#f59e0b",
  platinum: "#8b5cf6",
  unknown: "#6b7280",
};

const getPlanColor = (planName = "") =>
  PLAN_COLORS[planName.toLowerCase()] || PLAN_COLORS.unknown;

const RevenuePage = () => {
  const dauCanvasRef = useRef(null);
  const planCanvasRef = useRef(null);
  const dauChartRef = useRef(null);
  const planChartRef = useRef(null);

  const [stats, setStats] = useState([]);
  const [monthlyBreakdown, setMonthlyBreakdown] = useState([]);
  const [chartLabels, setChartLabels] = useState([]);
  const [chartDeposits, setChartDeposits] = useState([]);
  const [planLabels, setPlanLabels] = useState([]);
  const [planValues, setPlanValues] = useState([]);
  const [planColors, setPlanColors] = useState([]);
  const [loading, setLoading] = useState(false);

  const destroyCharts = useCallback(() => {
    if (dauChartRef.current) { dauChartRef.current.destroy(); dauChartRef.current = null; }
    if (planChartRef.current) { planChartRef.current.destroy(); planChartRef.current = null; }
  }, []);

  const fetchRevenue = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/revenue", { headers: getAuthHeaders() });
      if (res.data.success) {
        const data = res.data.data;

        // backend: { monthlyBreakdown, planRevenue, totalRevenue, totalDeposits }
        const mb = data.monthlyBreakdown || [];
        const planRev = data.planRevenue || [];

        // stats cards — backend এ actual revenue = deposits * 1%
        setStats([
          {
            icon: "💵",
            value: formatCurrency(data.totalRevenue || 0),
            label: "Total Revenue (5 months)",
            trend: "+12%",
            trendUp: true,
            bg: "bg-primary/10",
          },
          {
            icon: "💰",
            value: formatCurrency(data.totalDeposits || 0),
            label: "Total Deposits",
            trend: "+18%",
            trendUp: true,
            bg: "bg-blue-500/10",
          },
          {
            icon: "📋",
            value: mb.reduce((s, m) => s + (m.depositCount || 0), 0).toLocaleString(),
            label: "Total Transactions",
            trend: "+9%",
            trendUp: true,
            bg: "bg-amber-500/10",
          },
          {
            icon: "🆕",
            value: mb.reduce((s, m) => s + (m.newUsers || 0), 0).toLocaleString(),
            label: "New Users (5 months)",
            trend: "+22%",
            trendUp: true,
            bg: "bg-cyan-500/10",
          },
        ]);

        // chart data — deposits per month
        setChartLabels(mb.map((m) => m.month));
        setChartDeposits(mb.map((m) => m.deposits || 0));

        // plan doughnut
        setPlanLabels(planRev.map((p) => p.plan || "Unknown"));
        setPlanValues(planRev.map((p) => p.count || 0));
        setPlanColors(planRev.map((p) => getPlanColor(p.plan)));

        // table — calculate MoM growth
        const formatted = mb.map((item, idx) => {
          const prev = mb[idx - 1];
          const growth =
            prev && prev.revenue > 0
              ? (((item.revenue - prev.revenue) / prev.revenue) * 100).toFixed(1)
              : null;
          return {
            month: item.month,
            deposits: formatCurrency(item.deposits),
            depositCount: item.depositCount || 0,
            newUsers: item.newUsers || 0,
            revenue: formatCurrency(item.revenue),
            growth: growth !== null ? `${Math.abs(growth)}%` : "—",
            growthUp: growth === null || parseFloat(growth) >= 0,
          };
        });
        setMonthlyBreakdown(formatted);
      }
    } catch (err) {
      console.error("Revenue fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRevenue();
    return () => destroyCharts();
  }, [fetchRevenue, destroyCharts]);

  // Charts — loading শেষ হলে init
  useEffect(() => {
    if (loading) return;
    destroyCharts();

    const isDarkMode = document.documentElement.classList.contains("dark");
    const textColor = isDarkMode ? "#94a3b8" : "#64748b";
    const gridColor = isDarkMode ? "#1e2d3d" : "#e2e8f0";

    // Monthly Deposits Bar Chart
    if (dauCanvasRef.current && chartLabels.length > 0) {
      dauChartRef.current = new Chart(dauCanvasRef.current.getContext("2d"), {
        type: "bar",
        data: {
          labels: chartLabels,
          datasets: [
            {
              label: "Deposits (৳)",
              data: chartDeposits,
              backgroundColor: "rgba(5,150,105,0.8)",
              borderRadius: 6,
              barPercentage: 0.6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (c) => `Deposits: ${formatCurrency(c.raw)}`,
              },
            },
          },
          scales: {
            x: { ticks: { color: textColor, font: { size: 11 } }, grid: { color: gridColor } },
            y: {
              ticks: { color: textColor, font: { size: 11 }, callback: (v) => formatCurrency(v) },
              grid: { color: gridColor },
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Plan Doughnut Chart
    if (planCanvasRef.current && planLabels.length > 0) {
      planChartRef.current = new Chart(planCanvasRef.current.getContext("2d"), {
        type: "doughnut",
        data: {
          labels: planLabels,
          datasets: [
            {
              data: planValues,
              backgroundColor: planColors,
              borderWidth: 0,
              borderRadius: 4,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: { color: textColor, font: { size: 11 }, padding: 12 },
            },
            tooltip: {
              callbacks: { label: (c) => `${c.label}: ${c.raw} users` },
            },
          },
          cutout: "60%",
        },
      });
    }
  }, [loading, chartLabels, chartDeposits, planLabels, planValues, planColors, destroyCharts]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-5">💵 Revenue Reports</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-card border border-border rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">{stat.value}</div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">📈 Monthly Deposit Trend</div>
          <div className="h-64 relative">
            <canvas ref={dauCanvasRef} />
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">💎 Active Users by Plan</div>
          <div className="h-64 relative">
            <canvas ref={planCanvasRef} />
          </div>
          {/* Plan legend with percentage */}
          <div className="mt-3 space-y-1">
            {planLabels.map((label, idx) => (
              <div key={idx} className="flex items-center justify-between text-xs text-foreground/60">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full" style={{ background: planColors[idx] }} />
                  <span className="capitalize">{label}</span>
                </div>
                <span>{planValues[idx]?.toLocaleString()} users</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Breakdown Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="font-bold text-foreground">📊 Monthly Breakdown</div>
        </div>

        {monthlyBreakdown.length === 0 ? (
          <div className="py-12 text-center text-foreground/40 text-sm">কোনো data পাওয়া যায়নি</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Month</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Total Deposits</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Transactions</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">New Users</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Revenue (1%)</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">MoM Growth</th>
                </tr>
              </thead>
              <tbody>
                {monthlyBreakdown.map((item, idx) => (
                  <tr key={idx} className="border-b border-border last:border-0 hover:bg-primary/5 transition">
                    <td className="px-4 py-3 text-sm font-semibold text-foreground">{item.month}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.deposits}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.depositCount.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm text-foreground">{item.newUsers.toLocaleString()}</td>
                    <td className="px-4 py-3 text-sm font-bold text-primary">{item.revenue}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold ${item.growthUp ? "text-green-500" : "text-red-500"}`}>
                        {item.growth === "—" ? "—" : `${item.growthUp ? "↑" : "↓"} ${item.growth}`}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RevenuePage;