"use client";

import React, { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import { TrendingUp, TrendingDown } from "lucide-react";

const RevenuePage = () => {
  const [isDark, setIsDark] = useState(false);
  const revenueChartRef = useRef(null);
  const planRevenueChartRef = useRef(null);
  let revenueChart = useRef(null);
  let planRevenueChart = useRef(null);

  const stats = [
    {
      icon: "💵",
      value: "৳৮৪ লাখ",
      label: "Total Revenue (YTD)",
      trend: "+22%",
      trendUp: true,
      bg: "bg-primary/10",
    },
    {
      icon: "💎",
      value: "৳৬২ লাখ",
      label: "Subscription Revenue",
      trend: "+15%",
      trendUp: true,
      bg: "bg-purple-500/10",
    },
    {
      icon: "🤝",
      value: "৳১৮ লাখ",
      label: "Affiliate Revenue",
      trend: "+31%",
      trendUp: true,
      bg: "bg-amber-500/10",
    },
    {
      icon: "📈",
      value: "৳৪ লাখ",
      label: "API Revenue",
      trend: "+8%",
      trendUp: true,
      bg: "bg-cyan-500/10",
    },
  ];

  const revenueData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May"],
    subscriptions: [5.8, 6.3, 6.8, 7.2, 7.8],
    affiliate: [1.5, 1.7, 1.9, 2.1, 2.4],
    api: [0.38, 0.43, 0.48, 0.52, 0.58],
  };

  const planRevenueData = {
    labels: ["Bronze", "Silver", "Gold", "Platinum"],
    values: [0, 22, 48, 30],
    colors: ["#94a3b8", "#60a5fa", "#f59e0b", "#8b5cf6"],
  };

  const monthlyBreakdown = [
    {
      month: "May 2026",
      subscriptions: "৳৭.২ লাখ",
      affiliate: "৳২.৪ লাখ",
      api: "৳৫৮ হাজার",
      total: "৳১০.২ লাখ",
      growth: "+8.5%",
      growthUp: true,
    },
    {
      month: "April 2026",
      subscriptions: "৳৬.৮ লাখ",
      affiliate: "৳২.১ লাখ",
      api: "৳৫২ হাজার",
      total: "৳৯.৪ লাখ",
      growth: "+8.0%",
      growthUp: true,
    },
    {
      month: "March 2026",
      subscriptions: "৳৬.৩ লাখ",
      affiliate: "৳১.৯ লাখ",
      api: "৳৪৮ হাজার",
      total: "৳৮.৭ লাখ",
      growth: "+7.4%",
      growthUp: true,
    },
    {
      month: "February 2026",
      subscriptions: "৳৫.৮ লাখ",
      affiliate: "৳১.৭ লাখ",
      api: "৳৪৩ হাজার",
      total: "৳৮.১ লাখ",
      growth: "+5.2%",
      growthUp: true,
    },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    initCharts();
    return () => {
      if (revenueChart.current) revenueChart.current.destroy();
      if (planRevenueChart.current) planRevenueChart.current.destroy();
    };
  }, []);

  const initCharts = () => {
    const isDarkMode =
      document.documentElement.getAttribute("data-theme") === "dark";
    const textColor = isDarkMode ? "#94a3b8" : "#64748b";
    const gridColor = isDarkMode ? "#1e2d3d" : "#e2e8f0";

    // Revenue Chart
    const revCtx = document.getElementById("revenueChart");
    if (revCtx && !revenueChart.current) {
      revenueChart.current = new Chart(revCtx, {
        type: "bar",
        data: {
          labels: revenueData.labels,
          datasets: [
            {
              label: "Subscriptions",
              data: revenueData.subscriptions,
              backgroundColor: "rgba(5,150,105,0.8)",
              borderRadius: 4,
              barPercentage: 0.7,
            },
            {
              label: "Affiliate",
              data: revenueData.affiliate,
              backgroundColor: "rgba(8,145,178,0.8)",
              borderRadius: 4,
              barPercentage: 0.7,
            },
            {
              label: "API",
              data: revenueData.api,
              backgroundColor: "rgba(139,92,246,0.8)",
              borderRadius: 4,
              barPercentage: 0.7,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "top",
              labels: { color: textColor, font: { size: 11 } },
            },
            tooltip: {
              callbacks: { label: (c) => `${c.dataset.label}: ৳${c.raw} লাখ` },
            },
          },
          scales: {
            x: {
              ticks: { color: textColor, font: { size: 11 } },
              grid: { color: gridColor },
            },
            y: {
              ticks: { color: textColor, font: { size: 11 } },
              grid: { color: gridColor },
              title: { display: true, text: "লাখ ৳", color: textColor },
            },
          },
        },
      });
    }

    // Plan Revenue Chart
    const planCtx = document.getElementById("planRevenueChart");
    if (planCtx && !planRevenueChart.current) {
      planRevenueChart.current = new Chart(planCtx, {
        type: "doughnut",
        data: {
          labels: planRevenueData.labels,
          datasets: [
            {
              data: planRevenueData.values,
              backgroundColor: planRevenueData.colors,
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
          },
          cutout: "60%",
        },
      });
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-5">
        💵 Revenue Reports
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4"
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
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* Monthly Revenue Trend */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">
            📈 Monthly Revenue Trend
          </div>
          <div className="h-64 relative">
            <canvas id="revenueChart" />
          </div>
        </div>

        {/* Revenue by Plan */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">
            💎 Revenue by Plan
          </div>
          <div className="h-64 relative">
            <canvas id="planRevenueChart" />
          </div>
        </div>
      </div>

      {/* Monthly Revenue Breakdown Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="font-bold text-foreground">
            📊 Monthly Revenue Breakdown
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-150">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Month
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Subscriptions
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Affiliate
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  API
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Total
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  MoM Growth
                </th>
              </tr>
            </thead>
            <tbody>
              {monthlyBreakdown.map((item, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition"
                >
                  <td className="px-4 py-3 text-sm font-semibold text-foreground">
                    {item.month}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {item.subscriptions}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {item.affiliate}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {item.api}
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-primary">
                    {item.total}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold ${item.growthUp ? "text-green-500" : "text-red-500"}`}
                    >
                      {item.growthUp ? "↑" : "↓"} {item.growth}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RevenuePage;
