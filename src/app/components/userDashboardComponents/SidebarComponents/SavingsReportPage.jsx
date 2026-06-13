"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Moon,
  Sun,
  Download,
  Share2,
  Printer,
  FileText,
  FileSpreadsheet,
} from "lucide-react";

const SavingsReportPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentDate, setCurrentDate] = useState({ month: 4, year: 2026 });
  const [toast, setToast] = useState({ show: false, message: "" });

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

  const dailyData = [
    0, 5000, 0, 0, 0, 2000, 0, 0, 0, 0, 3750, 0, 0, 0, 0, 1250, 0, 0, 0, 0, 500,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  const goals = [
    {
      icon: "🏠",
      name: "Home Purchase",
      amount: "৳8,750",
      percent: 70,
      color: "from-primary to-primary-light",
    },
    {
      icon: "📱",
      name: "New Phone",
      amount: "৳2,500",
      percent: 28,
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: "✈️",
      name: "Travel Fund",
      amount: "৳1,250",
      percent: 14,
      color: "from-amber-500 to-orange-500",
    },
  ];

  const transactions = [
    {
      goal: "🏠 Home Purchase",
      method: "bKash",
      date: "25 May",
      txid: "BK20260524",
      amount: "+৳5,000",
    },
    {
      goal: "📱 New Phone",
      method: "Nagad",
      date: "20 May",
      txid: "NG20260520",
      amount: "+৳2,000",
    },
    {
      goal: "🏠 Home Purchase",
      method: "bKash",
      date: "15 May",
      txid: "BK20260515",
      amount: "+৳3,750",
    },
    {
      goal: "✈️ Travel Fund",
      method: "bKash",
      date: "10 May",
      txid: "BK20260510",
      amount: "+৳1,250",
    },
    {
      goal: "📱 New Phone",
      method: "Nagad",
      date: "5 May",
      txid: "NG20260505",
      amount: "+৳500",
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

  const changeMonth = (delta) => {
    setCurrentDate((prev) => {
      let newMonth = prev.month + delta;
      let newYear = prev.year;
      if (newMonth < 0) {
        newMonth = 11;
        newYear--;
      } else if (newMonth > 11) {
        newMonth = 0;
        newYear++;
      }
      return { month: newMonth, year: newYear };
    });
  };

  const maxValue = Math.max(...dailyData, 1);
  const toBangla = (num) =>
    num.toString().replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
  const monthName = months[currentDate.month];
  const yearDisplay = toBangla(currentDate.year);

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Back Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15 sticky top-0 z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">
          Savings Report
        </span>
      </div>

      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary-light px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1">
          📊 Monthly Savings Report
        </h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="p-4">
        {/* Month Selector */}
        <div className="flex items-center justify-between bg-card border border-border rounded-xl p-4 mb-4 shadow">
          <button
            onClick={() => changeMonth(-1)}
            className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-lg hover:border-primary transition"
          >
            ‹
          </button>
          <div className="text-center">
            <div className="text-base font-bold text-foreground">
              {monthName} {yearDisplay}
            </div>
            <div className="text-xs text-foreground/50">Monthly Statement</div>
          </div>
          <button
            onClick={() => changeMonth(1)}
            className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-lg hover:border-primary transition"
          >
            ›
          </button>
        </div>

        {/* Summary Grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-card border border-border rounded-xl p-4 shadow">
            <div className="text-2xl mb-2">⬆️</div>
            <div className="text-2xl font-bold text-primary">৳12,500</div>
            <div className="text-xs text-foreground/50 mt-1">Total Deposit</div>
            <div className="text-xs text-primary mt-1 font-semibold">
              ↑ 15% from last month
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 shadow">
            <div className="text-2xl mb-2">⬇️</div>
            <div className="text-2xl font-bold text-cyan-500">৳0</div>
            <div className="text-xs text-foreground/50 mt-1">
              Total Withdrawal
            </div>
            <div className="text-xs text-primary mt-1 font-semibold">
              ↓ Good!
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 shadow">
            <div className="text-2xl mb-2">🔢</div>
            <div className="text-2xl font-bold text-amber-500">8</div>
            <div className="text-xs text-foreground/50 mt-1">
              Total Transactions
            </div>
            <div className="text-xs text-primary mt-1 font-semibold">
              ↑ 3 more
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-4 shadow">
            <div className="text-2xl mb-2">🔥</div>
            <div className="text-2xl font-bold text-purple-500">18</div>
            <div className="text-xs text-foreground/50 mt-1">Max Streak</div>
            <div className="text-xs text-primary mt-1 font-semibold">
              ↑ Personal record!
            </div>
          </div>
        </div>

        {/* Bar Chart */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow">
          <div className="flex justify-between items-center mb-4">
            <div className="font-bold text-foreground">📈 Daily Savings</div>
            <span className="text-xs text-foreground/50">May 2026</span>
          </div>
          <div className="flex items-end gap-1 h-24">
            {dailyData.map((value, idx) => (
              <div
                key={idx}
                className="flex-1 flex flex-col items-center gap-1"
              >
                <div
                  className={`w-full rounded-t-md transition-all cursor-pointer ${value > 0 ? "bg-linear-to-t from-primary to-primary-light" : "bg-primary/20"}`}
                  style={{
                    height: `${Math.max(4, Math.round((value / maxValue) * 90))}px`,
                  }}
                  onClick={() =>
                    showToast(`${toBangla(idx + 1)} May: ৳${toBangla(value)}`)
                  }
                />
                <div className="text-[9px] text-foreground/50">
                  {toBangla(idx + 1)}
                </div>
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[10px] text-foreground/50">1 May</span>
            <span className="text-[10px] text-foreground/50">15 May</span>
            <span className="text-[10px] text-foreground/50">31 May</span>
          </div>
        </div>

        {/* Goal Breakdown */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow">
          <div className="font-bold text-foreground mb-4">
            🎯 Deposits by Goal
          </div>
          {goals.map((goal, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 py-3 border-b border-border last:border-0"
            >
              <span className="text-xl">{goal.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-sm text-foreground">
                  {goal.name}
                </div>
                <div className="h-1.5 bg-border rounded-full mt-1 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${goal.color}`}
                    style={{ width: `${goal.percent}%` }}
                  />
                </div>
              </div>
              <span className="font-bold text-sm text-primary shrink-0">
                {goal.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Transaction List */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow">
          <div className="font-bold text-foreground mb-4">
            📋 Transaction List
          </div>
          {transactions.map((tx, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 py-3 border-b border-border last:border-0"
            >
              <div className="w-2 h-2 rounded-full bg-primary" />
              <div className="flex-1">
                <div className="font-semibold text-sm text-foreground">
                  {tx.goal} — {tx.method}
                </div>
                <div className="text-xs text-foreground/50">
                  {tx.date} · TxID: {tx.txid}
                </div>
              </div>
              <span className="font-bold text-sm text-primary">
                {tx.amount}
              </span>
            </div>
          ))}
        </div>

        {/* Download Buttons */}
        <div className="bg-card border border-border rounded-xl p-5 shadow">
          <div className="font-bold text-foreground mb-4">
            📥 Download Report
          </div>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => showToast("📄 PDF is being prepared...")}
              className="py-3 rounded-xl bg-linear-to-r from-red-600 to-red-700 text-white text-sm font-bold flex flex-col items-center gap-1"
            >
              <FileText size={22} /> PDF
            </button>
            <button
              onClick={() => showToast("📊 Excel is being prepared...")}
              className="py-3 rounded-xl bg-linear-to-r from-green-600 to-green-700 text-white text-sm font-bold flex flex-col items-center gap-1"
            >
              <FileSpreadsheet size={22} /> Excel
            </button>
            <button
              onClick={() => showToast("📤 Sharing...")}
              className="py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold flex flex-col items-center gap-1"
            >
              <Share2 size={22} /> Share
            </button>
            <button
              onClick={() => showToast("🖨️ Printing...")}
              className="py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm font-bold flex flex-col items-center gap-1"
            >
              <Printer size={22} /> Print
            </button>
          </div>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap"
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
};

export default SavingsReportPage;
