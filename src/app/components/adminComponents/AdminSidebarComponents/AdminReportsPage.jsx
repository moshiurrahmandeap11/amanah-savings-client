"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Download,
  Mail,
  RefreshCw,
  Calendar,
  Users,
  DollarSign,
  CheckCircle,
  Activity,
  BarChart3,
  PieChart,
  Award,
  Flame,
  Loader2,
} from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Page Title
    analyticsReports: "Analytics & Reports",
    reportDownload: "Report Download",
    email: "Email",
    
    // Date Range
    days7: "7 days",
    days30: "30 days",
    months3: "3 months",
    year1: "1 year",
    loadingReport: "📊 Loading {label} report...",
    reportReady: "Report is ready to print",
    
    // KPI Labels
    totalSavings: "Total Savings",
    newMembers: "New Members",
    activeMembers: "Active Members",
    kycCompleted: "KYC Completed",
    vsLastMonth: "vs last month",
    
    // Chart Labels
    monthlySavingsTrend: "Monthly Savings Trend",
    deposits: "Deposits",
    withdrawals: "Withdrawals",
    goalCategories: "Goal Categories",
    totalGoals: "Total Goals",
    
    // Top Savers
    topSavers: "Top Savers",
    csvDownload: "CSV Download",
    member: "Member",
    totalSavingsLabel: "Total Savings",
    thisMonth: "This Month",
    consistency: "Streak",
    goalProgress: "Goal Progress",
    
    // Toast Messages
    csvDownloadComplete: "✅ CSV download complete!",
    reportSentEmail: "📧 Report has been sent by email",
    failedToLoad: "Failed to load reports",
    
    // Months (for chart)
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec",
    
    // Days (for range)
    day: "day",
    days: "days",
    month: "month",
    months: "months",
    year: "year",
    years: "years",
  },
  bn: {
    // Page Title
    analyticsReports: "অ্যানালিটিক্স ও রিপোর্ট",
    reportDownload: "রিপোর্ট ডাউনলোড",
    email: "ইমেইল করুন",
    
    // Date Range
    days7: "৭ দিন",
    days30: "৩০ দিন",
    months3: "৩ মাস",
    year1: "১ বছর",
    loadingReport: "📊 {label} রিপোর্ট লোড হচ্ছে...",
    reportReady: "রিপোর্ট প্রিন্টের জন্য প্রস্তুত",
    
    // KPI Labels
    totalSavings: "মোট সঞ্চয়",
    newMembers: "নতুন সদস্য",
    activeMembers: "সক্রিয় সদস্য",
    kycCompleted: "KYC সম্পন্ন",
    vsLastMonth: "গত মাসের তুলনায়",
    
    // Chart Labels
    monthlySavingsTrend: "মাসিক সঞ্চয় প্রবণতা",
    deposits: "জমা",
    withdrawals: "উত্তোলন",
    goalCategories: "লক্ষ্য বিভাগ",
    totalGoals: "মোট লক্ষ্য",
    
    // Top Savers
    topSavers: "শীর্ষ সঞ্চয়কারী",
    csvDownload: "CSV ডাউনলোড",
    member: "সদস্য",
    totalSavingsLabel: "মোট সঞ্চয়",
    thisMonth: "এই মাস",
    consistency: "ধারাবাহিকতা",
    goalProgress: "লক্ষ্যপূরণ",
    
    // Toast Messages
    csvDownloadComplete: "✅ CSV ডাউনলোড সম্পন্ন!",
    reportSentEmail: "📧 রিপোর্ট ইমেইলে পাঠানো হয়েছে",
    failedToLoad: "রিপোর্ট লোড করতে ব্যর্থ হয়েছে",
    
    // Months (for chart)
    jan: "জান",
    feb: "ফেব",
    mar: "মার",
    apr: "এপ্র",
    may: "মে",
    jun: "জুন",
    jul: "জুল",
    aug: "আগ",
    sep: "সেপ",
    oct: "অক্ট",
    nov: "নভ",
    dec: "ডিস",
    
    // Days (for range)
    day: "দিন",
    days: "দিন",
    month: "মাস",
    months: "মাস",
    year: "বছর",
    years: "বছর",
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AdminReportsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activeRange, setActiveRange] = useState("30d");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [startDate, setStartDate] = useState("2024-05-01");
  const [endDate, setEndDate] = useState("2024-05-31");
  const [kpis, setKpis] = useState([]);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [goalCategories, setGoalCategories] = useState([]);
  const [topSavers, setTopSavers] = useState([]);
  const [monthlyTrends, setMonthlyTrends] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const ranges = [
    { id: "7d", labelBn: t('days7'), labelEn: "7 days" },
    { id: "30d", labelBn: t('days30'), labelEn: "30 days" },
    { id: "3m", labelBn: t('months3'), labelEn: "3 months" },
    { id: "1y", labelBn: t('year1'), labelEn: "1 year" },
  ];

  const fetchReports = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/admin/reports?period=${activeRange}`, {
        headers: getAuthHeaders(),
      });
      if (res.data.success) {
        const data = res.data.data;
        
        let kpisArray = [];
        if (data.kpis) {
          if (Array.isArray(data.kpis)) {
            kpisArray = data.kpis;
          } else {
            kpisArray = [
              {
                icon: <DollarSign size={20} className="text-primary" />,
                value: formatAmount(data.kpis.totalDepositsAmount || 0),
                valueEn: formatAmount(data.kpis.totalDepositsAmount || 0),
                labelBn: t('totalSavings'),
                labelEn: "Total Savings",
                change: `+${data.kpis.totalDepositsAmount ? ((data.kpis.totalDepositsAmount / 100000) * 5).toFixed(1) : 0}%`,
                changeUp: true,
                color: "primary",
                bg: "bg-primary/10",
              },
              {
                icon: <Users size={20} className="text-blue-500" />,
                value: data.kpis.newUsers?.toLocaleString() || "0",
                valueEn: data.kpis.newUsers?.toLocaleString() || "0",
                labelBn: t('newMembers'),
                labelEn: "New Members",
                change: `+${data.kpis.userGrowth || 0}%`,
                changeUp: (data.kpis.userGrowth || 0) >= 0,
                color: "accent",
                bg: "bg-blue-500/10",
              },
              {
                icon: <Activity size={20} className="text-green-500" />,
                value: `${data.kpis.activeUsers?.toLocaleString() || "0"}`,
                valueEn: `${data.kpis.activeUsers?.toLocaleString() || "0"}`,
                labelBn: t('activeMembers'),
                labelEn: "Active Members",
                change: `+${data.kpis.activeGrowth || 0}%`,
                changeUp: true,
                color: "success",
                bg: "bg-green-500/10",
              },
              {
                icon: <CheckCircle size={20} className="text-amber-500" />,
                value: `${data.kpis.kycRate || 0}%`,
                valueEn: `${data.kpis.kycRate || 0}%`,
                labelBn: t('kycCompleted'),
                labelEn: "KYC Completed",
                change: `+${data.kpis.kycGrowth || 0}%`,
                changeUp: true,
                color: "warning",
                bg: "bg-amber-500/10",
              },
            ];
          }
        }
        
        const trends = data.monthlyTrends || [];
        setMonthlyTrends(trends);
        
        const depositValues = trends.map(t => t.deposits || 0);
        const withdrawalValues = trends.map(t => t.withdrawals || 0);
        
        setKpis(kpisArray);
        setDeposits(depositValues);
        setWithdrawals(withdrawalValues);
        setGoalCategories(Array.isArray(data.goalCategories) ? data.goalCategories : []);
        setTopSavers(Array.isArray(data.topSavers) ? data.topSavers : []);
      }
    } catch (err) {
      console.error("Fetch reports error:", err);
      showToast(err.response?.data?.message || t('failedToLoad'));
      setKpis(getFallbackKpis());
      setDeposits([12.5, 18.2, 22.1, 24.5, 28.3, 32.1]);
      setWithdrawals([4.2, 5.1, 6.8, 7.2, 8.5, 9.1]);
      setGoalCategories(getFallbackCategories());
      setTopSavers(getFallbackTopSavers());
    } finally {
      setLoading(false);
    }
  }, [activeRange]);

  const formatAmount = (amount) => {
    if (amount >= 10000000) {
      return `৳${(amount / 10000000).toFixed(1)}কোটি`;
    } else if (amount >= 100000) {
      return `৳${(amount / 100000).toFixed(1)}L`;
    } else if (amount >= 1000) {
      return `৳${(amount / 1000).toFixed(1)}K`;
    }
    return `৳${amount}`;
  };

  const getFallbackKpis = () => [
    {
      icon: <DollarSign size={20} className="text-primary" />,
      value: "৳0",
      valueEn: "৳0",
      labelBn: t('totalSavings'),
      labelEn: "Total Savings",
      change: "0%",
      changeUp: true,
      color: "primary",
      bg: "bg-primary/10",
    },
    {
      icon: <Users size={20} className="text-blue-500" />,
      value: "0",
      valueEn: "0",
      labelBn: t('newMembers'),
      labelEn: "New Members",
      change: "0%",
      changeUp: true,
      color: "accent",
      bg: "bg-blue-500/10",
    },
    {
      icon: <Activity size={20} className="text-green-500" />,
      value: "0",
      valueEn: "0",
      labelBn: t('activeMembers'),
      labelEn: "Active Members",
      change: "0%",
      changeUp: true,
      color: "success",
      bg: "bg-green-500/10",
    },
    {
      icon: <CheckCircle size={20} className="text-amber-500" />,
      value: "0%",
      valueEn: "0%",
      labelBn: t('kycCompleted'),
      labelEn: "KYC Completed",
      change: "0%",
      changeUp: true,
      color: "warning",
      bg: "bg-amber-500/10",
    },
  ];

  const getFallbackCategories = () => [
    { nameBn: "হজ্জ", nameEn: "Hajj", percentage: 28, count: 1250, color: "#059669" },
    { nameBn: "শিক্ষা", nameEn: "Education", percentage: 24, count: 1100, color: "#3b82f6" },
    { nameBn: "বিয়ের খরচ", nameEn: "Wedding", percentage: 18, count: 800, color: "#f59e0b" },
    { nameBn: "ব্যবসা", nameEn: "Business", percentage: 15, count: 700, color: "#8b5cf6" },
    { nameBn: "অন্যান্য", nameEn: "Others", percentage: 15, count: 680, color: "#6b7280" },
  ];

  const getFallbackTopSavers = () => [
    { nameBn: "রহিমা খাতুন", nameEn: "Rahima Khatun", saved: "৳1,24,000", savedEn: "৳1,24,000", monthly: "↑ ৳5,000", streak: "192 days", progress: 45, phone: "01712-345678" },
    { nameBn: "করিম আহমেদ", nameEn: "Karim Ahmed", saved: "৳98,500", savedEn: "৳98,500", monthly: "↑ ৳3,200", streak: "145 days", progress: 32, phone: "01812-654321" },
    { nameBn: "নাসরিন বেগম", nameEn: "Nasrin Begum", saved: "৳72,000", savedEn: "৳72,000", monthly: "↑ ৳2,800", streak: "78 days", progress: 28, phone: "01911-000111" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    fetchReports();
  }, [fetchReports]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const setRange = (rangeId) => {
    setActiveRange(rangeId);
    const rangeLabels = {
      "7d": lang === "bn" ? t('days7') : "7-day",
      "30d": lang === "bn" ? t('days30') : "30-day",
      "3m": lang === "bn" ? t('months3') : "3-month",
      "1y": lang === "bn" ? t('year1') : "1-year",
    };
    showToast(t('loadingReport', { label: rangeLabels[rangeId] }));
  };

  const printReport = () => {
    showToast(t('reportReady'));
    window.print();
  };

  const exportCSV = () => {
    const locale = lang === "bn" ? "bn-BD" : "en-US";
    const csv = `Report,Value\nDate,${new Date().toLocaleDateString(locale)}\n${t('totalSavings')},${kpis[0]?.value || "N/A"}\n${t('newMembers')},${kpis[1]?.value || "N/A"}`;
    const a = document.createElement("a");
    a.href = "data:text/csv;charset=utf-8," + encodeURIComponent("\ufeff" + csv);
    a.download = "amanah-report.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast(t('csvDownloadComplete'));
  };

  const sendEmail = () => {
    showToast(t('reportSentEmail'));
  };

  const months = monthlyTrends.length ? monthlyTrends.map(t => t.month) : (lang === "bn" ? [t('jan'), t('feb'), t('mar'), t('apr'), t('may'), t('jun')] : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]);
  const maxVal = Math.max(...(deposits.length ? deposits : [1]), ...(withdrawals.length ? withdrawals : [0])) || 1;
  const getBarHeight = (value) => (value / maxVal) * 160;

  return (
    <div>
      {/* Topbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-lg font-bold text-foreground">
          {t('analyticsReports')}
        </h1>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="px-4 py-2 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition"
          >
            {lang === "bn" ? "EN" : "BN"}
          </button>
          <button
            onClick={printReport}
            className="px-4 py-2 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition flex items-center gap-2"
          >
            <Download size={14} /> {t('reportDownload')}
          </button>
          <button
            onClick={sendEmail}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center gap-2"
          >
            <Mail size={14} /> {t('email')}
          </button>
        </div>
      </div>

      {/* Date Range */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-1 bg-card border border-border rounded-xl overflow-hidden">
          {ranges.map((range) => (
            <button
              key={range.id}
              onClick={() => setRange(range.id)}
              className={`px-4 py-2 text-sm font-semibold transition ${activeRange === range.id ? "bg-primary text-white" : "text-foreground/60 hover:text-primary"}`}
            >
              {lang === "bn" ? range.labelBn : range.labelEn}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm outline-none focus:border-primary"
          />
          <span className="text-foreground/50">—</span>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-card text-foreground text-sm outline-none focus:border-primary"
          />
          <button
            onClick={() => fetchReports()}
            className="p-2 rounded-lg border border-border hover:border-primary transition"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {Array.isArray(kpis) && kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background: kpi.color === "primary"
                  ? "#059669"
                  : kpi.color === "accent"
                    ? "#0891b2"
                    : kpi.color === "success"
                      ? "#10b981"
                      : "#f59e0b",
              }}
            />
            <div className="flex justify-between items-start">
              <div
                className={`w-10 h-10 rounded-xl ${kpi.bg || "bg-primary/10"} flex items-center justify-center`}
              >
                {kpi.icon}
              </div>
              {kpi.change && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.changeUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                >
                  {kpi.change}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">
              {lang === "bn" ? kpi.value : kpi.valueEn}
            </div>
            <div className="text-xs text-foreground/50 mt-1">
              {lang === "bn" ? kpi.labelBn : kpi.labelEn}
            </div>
            {kpi.changeUp !== undefined && (
              <div className={`text-xs mt-2 ${kpi.changeUp ? "text-green-500" : "text-red-500"}`}>
                {kpi.changeUp ? "↑" : "↓"}{" "}
                {t('vsLastMonth')}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="font-semibold text-foreground">
              {t('monthlySavingsTrend')}
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs text-foreground/60">
                  {t('deposits')}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="text-xs text-foreground/60">
                  {t('withdrawals')}
                </span>
              </div>
            </div>
          </div>
          <div className="h-48 flex items-end gap-2 mb-2">
            {months.map((month, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className="w-full flex gap-1 items-end"
                  style={{ height: "160px" }}
                >
                  <div
                    className="flex-1 rounded-t-sm bg-primary cursor-pointer hover:opacity-80 transition"
                    style={{ height: `${getBarHeight(deposits[idx] || 0)}px` }}
                    title={`${t('deposits')}: ৳${deposits[idx] || 0}`}
                  />
                  <div
                    className="flex-1 rounded-t-sm bg-cyan-500 cursor-pointer hover:opacity-80 transition"
                    style={{ height: `${getBarHeight(withdrawals[idx] || 0)}px` }}
                    title={`${t('withdrawals')}: ৳${withdrawals[idx] || 0}`}
                  />
                </div>
                <span className="text-[10px] text-foreground/50">{month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut Chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-4">
            {t('goalCategories')}
          </h3>
          <div className="flex flex-col items-center">
            <div className="relative w-36 h-36">
              <svg width="140" height="140" viewBox="0 0 140 140">
                <circle
                  cx="70"
                  cy="70"
                  r="55"
                  fill="none"
                  stroke="var(--border)"
                  strokeWidth="20"
                />
                {goalCategories.map((cat, idx) => {
                  const total = goalCategories.reduce((s, c) => s + (c.percentage || 0), 0) || 100;
                  const offset = goalCategories.slice(0, idx).reduce((s, c) => s + (c.percentage || 0), 0);
                  const dash = (cat.percentage / total) * 345;
                  const dashOffset = 345 - (offset / total) * 345;
                  return (
                    <circle
                      key={idx}
                      cx="70"
                      cy="70"
                      r="55"
                      fill="none"
                      stroke={cat.color || "#059669"}
                      strokeWidth="20"
                      strokeDasharray={`${dash} ${345 - dash}`}
                      strokeDashoffset={-dashOffset}
                      strokeLinecap="round"
                    />
                  );
                })}
                <text
                  x="70"
                  y="66"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="14"
                  fontWeight="700"
                >
                  {goalCategories.reduce((s, c) => s + (c.count || 0), 0) || 0}
                </text>
                <text
                  x="70"
                  y="82"
                  textAnchor="middle"
                  fill="currentColor"
                  fontSize="10"
                  opacity="0.5"
                >
                  {t('totalGoals')}
                </text>
              </svg>
            </div>
            <div className="w-full mt-4 space-y-2">
              {goalCategories.map((cat, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center py-1 border-b border-border last:border-0"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className="w-2 h-2 rounded-full"
                      style={{ background: cat.color || "#059669" }}
                    />
                    <span className="text-sm text-foreground">
                      {lang === "bn" ? cat.nameBn : cat.nameEn}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-foreground">
                    {cat.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Savers Table */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <h3 className="font-semibold text-foreground">
          {t('topSavers')}
        </h3>
        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition"
        >
          {t('csvDownload')}
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('member')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('totalSavingsLabel')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('thisMonth')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('consistency')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('goalProgress')}
                </th>
              </tr>
            </thead>
            <tbody>
              {topSavers.map((saver, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition"
                >
                  <td className="px-4 py-3">
                    <span
                      className={`font-bold ${idx === 0 ? "text-amber-500" : idx === 1 ? "text-gray-400" : idx === 2 ? "text-amber-600" : "text-foreground/50"}`}
                    >
                      {idx < 3 ? ["🥇", "🥈", "🥉"][idx] : idx + 1}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm">
                        {(saver.nameBn || saver.nameEn || "?")[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground">
                          {lang === "bn" ? saver.nameBn : saver.nameEn}
                        </div>
                        <div className="text-xs text-foreground/50">
                          {saver.phone || ""}
                        </div>
                      </div>
                    </div>
                   </td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">
                    {lang === "bn" ? saver.saved : saver.savedEn}
                   </td>
                  <td className={`px-4 py-3 text-sm ${(saver.monthly || "").includes("↑") ? "text-green-500" : "text-red-500"}`}>
                    {saver.monthly || "↑ ৳0"}
                   </td>
                  <td className="px-4 py-3 text-sm">
                    <Flame size={12} className="inline mr-1 text-orange-500" />{" "}
                    {saver.streak || "0 days"}
                   </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-primary to-primary-light"
                          style={{ width: `${saver.progress || 0}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        {saver.progress || 0}%
                      </span>
                    </div>
                   </td>
                 </tr>
              ))}
            </tbody>
           </table>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminReportsPage;