"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const AdminReportsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activeRange, setActiveRange] = useState("30d");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [startDate, setStartDate] = useState("2024-05-01");
  const [endDate, setEndDate] = useState("2024-05-31");

  const ranges = [
    { id: "7d", labelBn: "৭ দিন", labelEn: "7 days" },
    { id: "30d", labelBn: "৩০ দিন", labelEn: "30 days" },
    { id: "3m", labelBn: "৩ মাস", labelEn: "3 months" },
    { id: "1y", labelBn: "১ বছর", labelEn: "1 year" },
  ];

  const kpis = [
    {
      icon: <DollarSign size={20} />,
      value: "৳৩৪.২ লাখ",
      valueEn: "BDT 34.2 lakh",
      labelBn: "মোট সঞ্চয় (এই মাস)",
      labelEn: "Total Savings (This Month)",
      change: "+18.3%",
      changeUp: true,
      color: "primary",
      bg: "bg-primary/10",
    },
    {
      icon: <Users size={20} />,
      value: "৪৭ জন",
      valueEn: "47 members",
      labelBn: "নতুন সদস্য (এই মাস)",
      labelEn: "New Members (This Month)",
      change: "+23.7%",
      changeUp: true,
      color: "accent",
      bg: "bg-cyan-500/10",
    },
    {
      icon: <Activity size={20} />,
      value: "১,২৮৪ টি",
      valueEn: "1,284 items",
      labelBn: "মোট লেনদেন",
      labelEn: "Total Transactions",
      change: "+9.1%",
      changeUp: true,
      color: "success",
      bg: "bg-green-500/10",
    },
    {
      icon: <CheckCircle size={20} />,
      value: "৭৮.৯%",
      valueEn: "78.9%",
      labelBn: "KYC সম্পন্নের হার",
      labelEn: "KYC Completion Rate",
      change: "+5.2%",
      changeUp: true,
      color: "warning",
      bg: "bg-amber-500/10",
    },
  ];

  const deposits = [18, 24, 31, 28, 34, 41];
  const withdrawals = [8, 10, 12, 9, 14, 16];
  const months =
    lang === "bn"
      ? ["জান", "ফেব", "মার", "এপ্র", "মে", "জুন"]
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const maxVal = Math.max(...deposits, ...withdrawals);

  const goalCategories = [
    { nameBn: "বাড়ি", nameEn: "Home", percentage: 40, color: "#059669" },
    { nameBn: "শিক্ষা", nameEn: "Education", percentage: 24, color: "#0891b2" },
    { nameBn: "বিবাহ", nameEn: "Marriage", percentage: 18, color: "#f59e0b" },
    { nameBn: "অন্যান্য", nameEn: "Other", percentage: 18, color: "#8b5cf6" },
  ];

  const topSavers = [
    {
      rank: "🥇",
      nameBn: "নাজমুন নাহার",
      nameEn: "Nazmun Nahar",
      phone: "+880 1700-112233",
      saved: "৳৩,২০,০০০",
      savedEn: "BDT 320,000",
      monthly: "↑ ৳২৫,০০০",
      streak: "24 days",
      progress: 87,
    },
    {
      rank: "🥈",
      nameBn: "মোহাম্মদ ইকবাল",
      nameEn: "Mohammad Iqbal",
      phone: "+880 1612-3456",
      saved: "৳২,৩৪,০০০",
      savedEn: "BDT 234,000",
      monthly: "↑ ৳১৮,০০০",
      streak: "18 days",
      progress: 72,
    },
    {
      rank: "🥉",
      nameBn: "রাহেলা বেগম",
      nameEn: "Rahela Begum",
      phone: "+880 1712-3456",
      saved: "৳১,২৫,০০০",
      savedEn: "BDT 125,000",
      monthly: "↑ ৳১২,৫০০",
      streak: "15 days",
      progress: 63,
    },
    {
      rank: "4",
      nameBn: "করিম সাহেব",
      nameEn: "Karim Saheb",
      phone: "+880 1823-4567",
      saved: "৳৮৭,৫০০",
      savedEn: "BDT 87,500",
      monthly: "↓ ৳৩,০০০",
      streak: "12 days",
      progress: 51,
    },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);

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
      "7d": lang === "bn" ? "৭ দিনের" : "7-day",
      "30d": lang === "bn" ? "৩০ দিনের" : "30-day",
      "3m": lang === "bn" ? "৩ মাসের" : "3-month",
      "1y": lang === "bn" ? "১ বছরের" : "1-year",
    };
    showToast(
      lang === "bn"
        ? `📊 ${rangeLabels[rangeId]} রিপোর্ট লোড হচ্ছে...`
        : `📊 Loading ${rangeLabels[rangeId]} report...`,
    );
  };

  const printReport = () => {
    showToast(
      lang === "bn"
        ? "রিপোর্ট প্রিন্টের জন্য প্রস্তুত"
        : "Report is ready to print",
    );
    window.print();
  };

  const exportCSV = () => {
    const locale = lang === "bn" ? "bn-BD" : "en-US";
    const csv =
      lang === "bn"
        ? `রিপোর্ট,মান\nতারিখ,${new Date().toLocaleDateString(locale)}\nমোট সঞ্চয়,৳৩৪.২ লাখ\nনতুন সদস্য,৪৭ জন`
        : `Report,Value\nDate,${new Date().toLocaleDateString(locale)}\nTotal Savings,BDT 34.2 lakh\nNew Members,47 members`;
    const a = document.createElement("a");
    a.href =
      "data:text/csv;charset=utf-8," + encodeURIComponent("\ufeff" + csv);
    a.download = "amanah-report.csv";
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast(
      lang === "bn" ? "✅ CSV ডাউনলোড সম্পন্ন!" : "✅ CSV download complete!",
    );
  };

  const sendEmail = () => {
    showToast(
      lang === "bn"
        ? "📧 রিপোর্ট ইমেইলে পাঠানো হয়েছে"
        : "📧 Report has been sent by email",
    );
  };

  const getBarHeight = (value) => (value / maxVal) * 160;

  return (
    <div>
      {/* Topbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-lg font-bold text-foreground">
          {lang === "bn" ? "অ্যানালিটিক্স ও রিপোর্ট" : "Analytics & Reports"}
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
            <Download size={14} />{" "}
            {lang === "bn" ? "রিপোর্ট ডাউনলোড" : "Report Download"}
          </button>
          <button
            onClick={sendEmail}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center gap-2"
          >
            <Mail size={14} /> {lang === "bn" ? "ইমেইল করুন" : "Email"}
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
            onClick={() =>
              showToast(
                lang === "bn"
                  ? "🔄 ডেটা রিফ্রেশ হচ্ছে..."
                  : "🔄 Refreshing data...",
              )
            }
            className="p-2 rounded-lg border border-border hover:border-primary transition"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {kpis.map((kpi, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4 relative overflow-hidden"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1"
              style={{
                background:
                  kpi.color === "primary"
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
                className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center`}
              >
                {kpi.icon}
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${kpi.changeUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
              >
                {kpi.change}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">
              {lang === "bn" ? kpi.value : kpi.valueEn}
            </div>
            <div className="text-xs text-foreground/50 mt-1">
              {lang === "bn" ? kpi.labelBn : kpi.labelEn}
            </div>
            <div
              className={`text-xs mt-2 ${kpi.changeUp ? "text-green-500" : "text-red-500"}`}
            >
              {kpi.changeUp ? "↑" : "↓"}{" "}
              {lang === "bn" ? "গত মাসের তুলনায়" : "vs last month"}
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-5 mb-6">
        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <h3 className="font-semibold text-foreground">
              {lang === "bn" ? "মাসিক সঞ্চয় প্রবণতা" : "Monthly Savings Trend"}
            </h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-xs text-foreground/60">
                  {lang === "bn" ? "জমা" : "Deposits"}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-cyan-500" />
                <span className="text-xs text-foreground/60">
                  {lang === "bn" ? "উত্তোলন" : "Withdrawals"}
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
                    style={{ height: `${getBarHeight(deposits[idx])}px` }}
                    title={`${lang === "bn" ? "জমা" : "Deposits"}: ৳${deposits[idx]} ${lang === "bn" ? "লাখ" : "lakh"}`}
                  />
                  <div
                    className="flex-1 rounded-t-sm bg-cyan-500 cursor-pointer hover:opacity-80 transition"
                    style={{ height: `${getBarHeight(withdrawals[idx])}px` }}
                    title={`${lang === "bn" ? "উত্তোলন" : "Withdrawals"}: ৳${withdrawals[idx]} ${lang === "bn" ? "লাখ" : "lakh"}`}
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
            {lang === "bn" ? "লক্ষ্য বিভাগ" : "Goal Categories"}
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
                <circle
                  cx="70"
                  cy="70"
                  r="55"
                  fill="none"
                  stroke="#059669"
                  strokeWidth="20"
                  strokeDasharray="138 207"
                  strokeDashoffset="-52"
                  strokeLinecap="round"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="55"
                  fill="none"
                  stroke="#0891b2"
                  strokeWidth="20"
                  strokeDasharray="83 262"
                  strokeDashoffset="86"
                  strokeLinecap="round"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="55"
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="20"
                  strokeDasharray="62 283"
                  strokeDashoffset="-31"
                  strokeLinecap="round"
                />
                <circle
                  cx="70"
                  cy="70"
                  r="55"
                  fill="none"
                  stroke="#8b5cf6"
                  strokeWidth="20"
                  strokeDasharray="62 283"
                  strokeDashoffset="-93"
                  strokeLinecap="round"
                />
                <text
                  x="70"
                  y="66"
                  textAnchor="middle"
                  fill="var(--text)"
                  fontSize="14"
                  fontWeight="700"
                >
                  ৩,৮৪১
                </text>
                <text
                  x="70"
                  y="82"
                  textAnchor="middle"
                  fill="var(--muted)"
                  fontSize="10"
                >
                  {lang === "bn" ? "মোট লক্ষ্য" : "Total Goals"}
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
                      style={{ background: cat.color }}
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
          {lang === "bn" ? "শীর্ষ সঞ্চয়কারী" : "Top Savers"}
        </h3>
        <button
          onClick={exportCSV}
          className="px-4 py-2 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition"
        >
          {lang === "bn" ? "CSV ডাউনলোড" : "CSV Download"}
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-175">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {lang === "bn" ? "সদস্য" : "Member"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {lang === "bn" ? "মোট সঞ্চয়" : "Total Savings"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {lang === "bn" ? "এই মাস" : "This Month"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {lang === "bn" ? "ধারাবাহিকতা" : "Streak"}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {lang === "bn" ? "লক্ষ্যপূরণ" : "Goal Progress"}
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
                      className={`font-bold ${saver.rank === "🥇" ? "text-amber-500" : saver.rank === "🥈" ? "text-gray-400" : saver.rank === "🥉" ? "text-amber-600" : "text-foreground/50"}`}
                    >
                      {saver.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm">
                        {saver.nameBn[0]}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground">
                          {lang === "bn" ? saver.nameBn : saver.nameEn}
                        </div>
                        <div className="text-xs text-foreground/50">
                          {saver.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">
                    {lang === "bn" ? saver.saved : saver.savedEn}
                  </td>
                  <td
                    className={`px-4 py-3 text-sm ${saver.monthly.includes("↑") ? "text-green-500" : "text-red-500"}`}
                  >
                    {saver.monthly}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    <Flame size={12} className="inline mr-1 text-orange-500" />{" "}
                    {saver.streak}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-linear-to-r from-primary to-primary-light"
                          style={{ width: `${saver.progress}%` }}
                        />
                      </div>
                      <span className="text-xs font-semibold text-foreground">
                        {saver.progress}%
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
