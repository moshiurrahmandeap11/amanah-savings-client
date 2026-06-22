"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
import { Loader2, Users, Activity, Wallet, UserPlus, TrendingUp, Smartphone, Monitor, Globe } from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    analytics: "📈 Analytics",
    totalUsers: "Total Users",
    activeToday: "Active Today",
    todaysDeposit: "Today's Deposit",
    newUsers: "New Users",
    avgSessionsPerUser: "Avg Sessions per User (14d)",
    activeUsersLast7Days: "Active Users (Last 7 days)",
    retentionRate: "Retention Rate",
    dailyActiveUsers: "📊 Daily Active Users (Last 14 days)",
    deviceBreakdown: "🔵 Device Breakdown",
    topDivisions: "🌍 Top Divisions",
    android: "Android",
    ios: "iOS",
    desktop: "Desktop",
    dhaka: "Dhaka",
    chittagong: "Chittagong",
    rajshahi: "Rajshahi",
    khulna: "Khulna",
    sylhet: "Sylhet",
    others: "Others",
    users: "users",
    loading: "Loading analytics...",
  },
  bn: {
    analytics: "📈 অ্যানালিটিক্স",
    totalUsers: "মোট ব্যবহারকারী",
    activeToday: "আজ সক্রিয়",
    todaysDeposit: "আজকের ডিপোজিট",
    newUsers: "নতুন ব্যবহারকারী",
    avgSessionsPerUser: "প্রতি ব্যবহারকারীর গড় সেশন (১৪ দিন)",
    activeUsersLast7Days: "সক্রিয় ব্যবহারকারী (গত ৭ দিন)",
    retentionRate: "ধারণ হার",
    dailyActiveUsers: "📊 দৈনিক সক্রিয় ব্যবহারকারী (গত ১৪ দিন)",
    deviceBreakdown: "🔵 ডিভাইস বিভাজন",
    topDivisions: "🌍 শীর্ষ বিভাগ",
    android: "অ্যান্ড্রয়েড",
    ios: "আইওএস",
    desktop: "ডেস্কটপ",
    dhaka: "ঢাকা",
    chittagong: "চট্টগ্রাম",
    rajshahi: "রাজশাহী",
    khulna: "খুলনা",
    sylhet: "সিলেট",
    others: "অন্যান্য",
    users: "ব্যবহারকারী",
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

  const dauCanvasRef = useRef(null);
  const trafficCanvasRef = useRef(null);
  const dauChartRef = useRef(null);
  const trafficChartRef = useRef(null);

  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "bn";
    setLang(savedLang);
  }, []);

  const destroyCharts = useCallback(() => {
    if (dauChartRef.current) { dauChartRef.current.destroy(); dauChartRef.current = null; }
    if (trafficChartRef.current) { trafficChartRef.current.destroy(); trafficChartRef.current = null; }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/analytics", {
        headers: getAuthHeaders(),
      });
      if (res.data.success) {
        const data = res.data.data;

        // Build stats cards from real data
        const realStats = [
          {
            icon: <Users size={20} />,
            value: String(data.totalUsers || 0),
            label: t('totalUsers'),
            bg: "bg-primary/10",
            color: "text-primary",
          },
          {
            icon: <Activity size={20} />,
            value: String(data.sessionStats?.activeUsersLast7Days || 0),
            label: t('activeToday'),
            bg: "bg-blue-500/10",
            color: "text-blue-500",
          },
          {
            icon: <Wallet size={20} />,
            value: `৳${(data.todaysDeposits || 0).toLocaleString("en-BD")}`,
            label: t('todaysDeposit'),
            bg: "bg-green-500/10",
            color: "text-green-500",
          },
          {
            icon: <UserPlus size={20} />,
            value: String(data.newUsersToday || 0),
            label: t('newUsers'),
            bg: "bg-amber-500/10",
            color: "text-amber-500",
          },
        ];

        setStats(realStats);
        setDeviceBreakdown(Array.isArray(data.deviceBreakdown) ? data.deviceBreakdown : []);
        setDivisionBreakdown(Array.isArray(data.divisionBreakdown) ? data.divisionBreakdown : []);
        setDauData(data.dau || { labels: [], values: [] });
        setAdditionalStats(data.sessionStats || {});
      }
    } catch (err) {
      console.error("Error fetching analytics:", err);
    } finally {
      setLoading(false);
    }
  }, [lang]);

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
          datasets: [{
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
          }],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (c) => `${c.raw} ${t('users')}` } },
          },
          scales: {
            x: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: gridColor } },
            y: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: gridColor }, beginAtZero: true },
          },
        },
      });
    }

    // Device Doughnut Chart
    const deviceData = deviceBreakdown.length > 0 ? deviceBreakdown : [];
    if (trafficCanvasRef.current && deviceData.length > 0) {
      const ctx = trafficCanvasRef.current.getContext("2d");
      trafficChartRef.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: deviceData.map((d) => d.name),
          datasets: [{
            data: deviceData.map((d) => d.percentage),
            backgroundColor: deviceData.map((d) => d.color || "#059669"),
            borderWidth: 0,
            borderRadius: 4,
          }],
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, dauData, deviceBreakdown]);

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
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">{stat.value}</div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Additional Stats Row */}
      {Object.keys(additionalStats).length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
          <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="text-xs text-foreground/50">{t('avgSessionsPerUser')}</div>
            <div className="text-2xl font-bold text-foreground mt-1">{additionalStats.avgSessionsPerUser || 0}</div>
          </div>
          <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="text-xs text-foreground/50">{t('activeUsersLast7Days')}</div>
            <div className="text-2xl font-bold text-foreground mt-1">{additionalStats.activeUsersLast7Days?.toLocaleString() || 0}</div>
          </div>
          <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-4 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div className="text-xs text-foreground/50">{t('retentionRate')}</div>
            <div className="text-2xl font-bold text-foreground mt-1">{additionalStats.retentionRate || 0}%</div>
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* DAU Chart */}
        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
          <div className="font-bold text-foreground mb-4">{t('dailyActiveUsers')}</div>
          <div className="h-64 relative">
            <canvas ref={dauCanvasRef} />
          </div>
        </div>

        {/* Device Doughnut Chart */}
        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
          <div className="font-bold text-foreground mb-4">{t('deviceBreakdown')}</div>
          <div className="h-64 relative">
            <canvas ref={trafficCanvasRef} />
          </div>
        </div>
      </div>

      {/* Device & Divisions Progress Bars */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Device Breakdown */}
        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
          <div className="font-bold text-foreground mb-4">📱 {t('deviceBreakdown')}</div>
          <div className="space-y-4">
            {deviceBreakdown.length > 0 ? (
              deviceBreakdown.map((device, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-20 text-sm text-foreground font-medium">{device.name}</span>
                  <div className="flex-1 h-2 bg-border/50 dark:bg-border/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${device.percentage}%`,
                        background: `linear-gradient(90deg, ${device.color || '#059669'}, ${device.color || '#059669'}cc)`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-foreground/60">{device.percentage}%</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-foreground/50 text-center py-4">No device data available</p>
            )}
          </div>
        </div>

        {/* Top Divisions */}
        <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
          <div className="font-bold text-foreground mb-4">🌍 {t('topDivisions')}</div>
          <div className="space-y-4">
            {divisionBreakdown.length > 0 ? (
              divisionBreakdown.map((division, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <span className="w-24 text-sm text-foreground font-medium truncate">{division.name}</span>
                  <div className="flex-1 h-2 bg-border/50 dark:bg-border/30 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${division.percentage}%`,
                        background: `linear-gradient(90deg, ${division.color || '#059669'}, ${division.color || '#059669'}cc)`,
                      }}
                    />
                  </div>
                  <span className="text-xs font-semibold text-foreground/60">{division.percentage}%</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-foreground/50 text-center py-4">No division data available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
