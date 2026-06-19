"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Page Title
    analytics: "📈 Analytics",
    
    // Stats
    totalUsers: "Total Users",
    activeToday: "Active Today",
    todaysDeposit: "Today's Deposit",
    newUsers: "New Users",
    
    // Additional Stats
    avgSessionsPerUser: "Avg Sessions per User (14d)",
    activeUsersLast7Days: "Active Users (Last 7 days)",
    retentionRate: "Retention Rate",
    
    // Charts
    dailyActiveUsers: "📊 Daily Active Users (Last 14 days)",
    deviceBreakdown: "🔵 Device Breakdown",
    
    // Device Names
    android: "Android",
    ios: "iOS",
    desktop: "Desktop",
    
    // Divisions
    dhaka: "Dhaka",
    chittagong: "Chittagong",
    rajshahi: "Rajshahi",
    khulna: "Khulna",
    sylhet: "Sylhet",
    others: "Others",
    
    // Tooltips
    users: "users",
    
    // Loading
    loading: "Loading analytics...",
  },
  bn: {
    // Page Title
    analytics: "📈 অ্যানালিটিক্স",
    
    // Stats
    totalUsers: "মোট ব্যবহারকারী",
    activeToday: "আজ সক্রিয়",
    todaysDeposit: "আজকের ডিপোজিট",
    newUsers: "নতুন ব্যবহারকারী",
    
    // Additional Stats
    avgSessionsPerUser: "প্রতি ব্যবহারকারীর গড় সেশন (১৪ দিন)",
    activeUsersLast7Days: "সক্রিয় ব্যবহারকারী (গত ৭ দিন)",
    retentionRate: "ধারণ হার",
    
    // Charts
    dailyActiveUsers: "📊 দৈনিক সক্রিয় ব্যবহারকারী (গত ১৪ দিন)",
    deviceBreakdown: "🔵 ডিভাইস বিভাজন",
    
    // Device Names
    android: "অ্যান্ড্রয়েড",
    ios: "আইওএস",
    desktop: "ডেস্কটপ",
    
    // Divisions
    dhaka: "ঢাকা",
    chittagong: "চট্টগ্রাম",
    rajshahi: "রাজশাহী",
    khulna: "খুলনা",
    sylhet: "সিলেট",
    others: "অন্যান্য",
    
    // Tooltips
    users: "ব্যবহারকারী",
    
    // Loading
    loading: "অ্যানালিটিক্স লোড হচ্ছে...",
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AnalyticsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [stats, setStats] = useState([]);
  const [deviceBreakdown, setDeviceBreakdown] = useState([]);
  const [divisionBreakdown, setDivisionBreakdown] = useState([]);
  const [dauData, setDauData] = useState({ labels: [], values: [] });
  const [additionalStats, setAdditionalStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("bn");

  // canvas ref
  const dauCanvasRef = useRef(null);
  const trafficCanvasRef = useRef(null);
  const dauChartRef = useRef(null);
  const trafficChartRef = useRef(null);

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "bn";
    setLang(savedLang);
  }, []);

  const destroyCharts = useCallback(() => {
    if (dauChartRef.current) {
      dauChartRef.current.destroy();
      dauChartRef.current = null;
    }
    if (trafficChartRef.current) {
      trafficChartRef.current.destroy();
      trafficChartRef.current = null;
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/analytics", {
        headers: getAuthHeaders(),
      });
      if (res.data.success) {
        const data = res.data.data;
        setStats(Array.isArray(data.sessionStats) ? data.sessionStats : []);
        setDeviceBreakdown(
          Array.isArray(data.deviceBreakdown) ? data.deviceBreakdown : []
        );
        setDivisionBreakdown(
          Array.isArray(data.divisionBreakdown) ? data.divisionBreakdown : []
        );
        setDauData(data.dau || { labels: [], values: [] });
        setAdditionalStats(data.additionalStats || {});
      } else {
        console.error("API returned error:", res.data.message);
        setFallbackData();
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
      setFallbackData();
    } finally {
      setLoading(false);
    }
  }, []);

  const setFallbackData = () => {
    setStats(getFallbackStats());
    setDeviceBreakdown(getFallbackDeviceData());
    setDivisionBreakdown(getFallbackDivisionData());
    setDauData(getFallbackDauData());
  };

  const getFallbackStats = () => [
    {
      icon: "👥",
      value: "0",
      label: t('totalUsers'),
      trend: "0%",
      trendUp: true,
      bg: "bg-primary/10",
    },
    {
      icon: "📱",
      value: "0",
      label: t('activeToday'),
      trend: "0%",
      trendUp: true,
      bg: "bg-blue-500/10",
    },
    {
      icon: "💰",
      value: "৳0",
      label: t('todaysDeposit'),
      trend: "0%",
      trendUp: true,
      bg: "bg-green-500/10",
    },
    {
      icon: "🆕",
      value: "0",
      label: t('newUsers'),
      trend: "0%",
      trendUp: true,
      bg: "bg-amber-500/10",
    },
  ];

  const getFallbackDeviceData = () => [
    { name: t('android'), percentage: 58, color: "#10b981" },
    { name: t('ios'), percentage: 26, color: "#3b82f6" },
    { name: t('desktop'), percentage: 16, color: "#8b5cf6" },
  ];

  const getFallbackDivisionData = () => [
    { name: t('dhaka'), percentage: 42, color: "#059669" },
    { name: t('chittagong'), percentage: 18, color: "#3b82f6" },
    { name: t('rajshahi'), percentage: 12, color: "#f59e0b" },
    { name: t('khulna'), percentage: 10, color: "#ef4444" },
    { name: t('sylhet'), percentage: 8, color: "#8b5cf6" },
    { name: t('others'), percentage: 10, color: "#6b7280" },
  ];

  const getFallbackDauData = () => ({
    labels: [
      "Day 1","Day 2","Day 3","Day 4","Day 5","Day 6","Day 7",
      "Day 8","Day 9","Day 10","Day 11","Day 12","Day 13","Day 14",
    ],
    values: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    fetchAnalytics();

    return () => destroyCharts();
  }, [fetchAnalytics, destroyCharts]);

  // Chart init
  useEffect(() => {
    if (loading) return;

    destroyCharts();

    const isDarkMode = document.documentElement.classList.contains("dark");
    const textColor = isDarkMode ? "#94a3b8" : "#64748b";
    const gridColor = isDarkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

    // DAU Chart
    if (dauCanvasRef.current && dauData.labels?.length > 0) {
      const ctx = dauCanvasRef.current.getContext("2d");
      dauChartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: dauData.labels,
          datasets: [
            {
              label: t('dailyActiveUsers').replace("📊 ", ""),
              data: dauData.values,
              borderColor: "#059669",
              backgroundColor: "rgba(5,150,105,0.1)",
              borderWidth: 2,
              fill: true,
              tension: 0.4,
              pointRadius: 3,
              pointBackgroundColor: "#059669",
              pointBorderColor: isDarkMode ? "#1e293b" : "#fff",
              pointBorderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: { label: (c) => `${c.raw} ${t('users')}` },
            },
          },
          scales: {
            x: {
              ticks: { color: textColor, font: { size: 10 } },
              grid: { color: gridColor },
            },
            y: {
              ticks: { color: textColor, font: { size: 10 } },
              grid: { color: gridColor },
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Device Doughnut Chart
    const deviceData =
      deviceBreakdown.length > 0
        ? deviceBreakdown
        : getFallbackDeviceData();

    if (trafficCanvasRef.current && deviceData.length > 0) {
      const ctx = trafficCanvasRef.current.getContext("2d");
      trafficChartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: deviceData.map((d) => d.name),
          datasets: [
            {
              data: deviceData.map((d) => d.percentage),
              backgroundColor: deviceData.map((d) => d.color || "#059669"),
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
              labels: {
                color: textColor,
                font: { size: 11 },
                padding: 12,
              },
            },
          },
          cutout: "60%",
        },
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, dauData, deviceBreakdown]);

  const displayStats =
    Array.isArray(stats) && stats.length > 0 ? stats : getFallbackStats();

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-5">{t('analytics')}</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {displayStats.map((stat, idx) => (
          <div 
            key={idx} 
            className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex justify-between items-start">
              <div
                className={`w-10 h-10 rounded-xl ${
                  stat.bg || "bg-primary/10"
                } flex items-center justify-center text-xl`}
              >
                {stat.icon}
              </div>
              {stat.trend && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    stat.trendUp
                      ? "bg-green-500/20 dark:bg-green-500/30 text-green-500 dark:text-green-400"
                      : "bg-red-500/20 dark:bg-red-500/30 text-red-500 dark:text-red-400"
                  }`}
                >
                  {stat.trend}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">
              {stat.value}
            </div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
            <div className="h-1 bg-border/50 dark:bg-border/30 rounded-full mt-3 overflow-hidden">
              <div className="h-full w-[78%] bg-gradient-to-r from-primary to-primary-light rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Additional Stats Row */}
      {additionalStats.avgSessionsPerUser > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="text-xs text-foreground/50">
              {t('avgSessionsPerUser')}
            </div>
            <div className="text-2xl font-bold text-foreground mt-1">
              {additionalStats.avgSessionsPerUser}
            </div>
            <div className="h-1 bg-border/50 dark:bg-border/30 rounded-full mt-3 overflow-hidden">
              <div className="h-full w-[65%] bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
            </div>
          </div>
          <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="text-xs text-foreground/50">
              {t('activeUsersLast7Days')}
            </div>
            <div className="text-2xl font-bold text-foreground mt-1">
              {additionalStats.activeUsersLast7Days?.toLocaleString() || 0}
            </div>
            <div className="h-1 bg-border/50 dark:bg-border/30 rounded-full mt-3 overflow-hidden">
              <div className="h-full w-[85%] bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full" />
            </div>
          </div>
          <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="text-xs text-foreground/50">{t('retentionRate')}</div>
            <div className="text-2xl font-bold text-foreground mt-1">
              {additionalStats.retentionRate || 0}%
            </div>
            <div className="h-1 bg-border/50 dark:bg-border/30 rounded-full mt-3 overflow-hidden">
              <div className="h-full w-[70%] bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
            </div>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* DAU Chart */}
        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
          <div className="font-bold text-foreground mb-4">
            {t('dailyActiveUsers')}
          </div>
          <div className="h-64 relative">
            <canvas ref={dauCanvasRef} />
          </div>
        </div>

        {/* Device Doughnut Chart */}
        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
          <div className="font-bold text-foreground mb-4">
            {t('deviceBreakdown')}
          </div>
          <div className="h-64 relative">
            <canvas ref={trafficCanvasRef} />
          </div>
        </div>
      </div>

      {/* Device & Divisions Progress Bars */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Device Breakdown */}
        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
          <div className="font-bold text-foreground mb-4">
            📱 {t('deviceBreakdown')}
          </div>
          <div className="space-y-4">
            {(deviceBreakdown.length > 0
              ? deviceBreakdown
              : getFallbackDeviceData()
            ).map((device, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-20 text-sm text-foreground font-medium">
                  {device.name}
                </span>
                <div className="flex-1 h-2 bg-border/50 dark:bg-border/30 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${device.percentage}%`,
                      background: `linear-gradient(90deg, ${device.color || '#059669'}, ${device.color || '#059669'}cc)`,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground/60">
                  {device.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Divisions */}
        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
          <div className="font-bold text-foreground mb-4">
            🌍 {t('topDivisions') || "Top Divisions"}
          </div>
          <div className="space-y-4">
            {(divisionBreakdown.length > 0
              ? divisionBreakdown
              : getFallbackDivisionData()
            ).map((division, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-24 text-sm text-foreground font-medium truncate">
                  {division.name}
                </span>
                <div className="flex-1 h-2 bg-border/50 dark:bg-border/30 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${division.percentage}%`,
                      background: `linear-gradient(90deg, ${division.color || '#059669'}, ${division.color || '#059669'}cc)`,
                    }}
                  />
                </div>
                <span className="text-xs font-semibold text-foreground/60">
                  {division.percentage}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;