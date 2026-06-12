"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Moon,
  Sun,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Banknote,
  CreditCard,
  Flag,
  Shield,
} from "lucide-react";

const WithdrawalApprovalsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [pendingCount, setPendingCount] = useState(8);
  const [toast, setToast] = useState({ show: false, message: "" });

  const stats = [
    { value: pendingCount, label: "Pending", color: "yellow" },
    { value: "৳ 4.2L", label: "Approved Today", color: "green" },
    { value: "2", label: "Flagged", color: "red" },
    { value: "3.1h", label: "Avg Process Time", color: "blue" },
  ];

  const [withdrawals, setWithdrawals] = useState([
    {
      id: "wd-1",
      avatar: "F",
      avatarBg: "from-primary to-primary-light",
      name: "Fatema Akhter",
      phone: "01712-345678",
      method: "bKash",
      methodIcon: "💜",
      refId: "WD-20260605-4821",
      time: "20 min ago",
      amount: "৳8,500",
      goal: "Home",
      goalIcon: "🏠",
      kyc: "Verified",
      kycColor: "success",
      balanceAfter: "৳29,500",
      fee: "৳153",
      netPayout: "৳8,347",
      riskScore: 12,
      riskLevel: "low",
      flagged: false,
    },
    {
      id: "wd-2",
      avatar: "X",
      avatarBg: "from-red-500 to-orange-500",
      name: "Unknown User #4821",
      phone: "01999-XXXXXX",
      method: "bKash",
      methodIcon: "💜",
      refId: "WD-20260605-9991",
      time: "45 min ago",
      amount: "৳50,000",
      goal: "Unknown",
      goalIcon: "⚠️",
      kyc: "Pending",
      kycColor: "warning",
      balanceAfter: "৳2,000",
      fee: "৳900",
      netPayout: "৳49,100",
      riskScore: 92,
      riskLevel: "high",
      flagged: true,
      prevFlags: "3 flags",
      accountAge: "2 days",
      totalDeposits: "৳52,000",
      pattern: "Suspicious",
    },
    {
      id: "wd-3",
      avatar: "R",
      avatarBg: "from-purple-500 to-indigo-500",
      name: "Rahim Islam",
      phone: "01911-000111",
      method: "Bank Transfer",
      methodIcon: "🏦",
      refId: "WD-20260605-3344",
      time: "1 hour ago",
      amount: "৳1,20,000",
      goal: "Hajj Fund",
      goalIcon: "🕌",
      kyc: "Verified",
      kycColor: "success",
      balanceAfter: "৳30,000",
      fee: "Free",
      netPayout: "৳1,20,000",
      riskScore: 5,
      riskLevel: "low",
      flagged: false,
      plan: "Platinum",
    },
  ]);

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

  const approveWithdrawal = (id) => {
    setWithdrawals((prev) => prev.filter((w) => w.id !== id));
    setPendingCount((prev) => Math.max(0, prev - 1));
    showToast(
      lang === "bn"
        ? "✅ উত্তোলন অনুমোদিত — ট্রান্সফার প্রসেস হচ্ছে"
        : "✅ Withdrawal approved — processing transfer",
    );
  };

  const rejectWithdrawal = (id) => {
    if (
      confirm(
        lang === "bn"
          ? "এই উত্তোলন প্রত্যাখ্যান করবেন? সদস্যকে জানানো হবে।"
          : "Reject this withdrawal? Member will be notified.",
      )
    ) {
      setWithdrawals((prev) => prev.filter((w) => w.id !== id));
      setPendingCount((prev) => Math.max(0, prev - 1));
      showToast(
        lang === "bn"
          ? "❌ উত্তোলন প্রত্যাখ্যান হয়েছে। সদস্যকে জানানো হয়েছে।"
          : "❌ Withdrawal rejected. Member notified.",
      );
    }
  };

  const holdWithdrawal = (id) => {
    showToast(
      lang === "bn"
        ? "⏸️ উত্তোলন আরও রিভিউর জন্য রাখা হয়েছে"
        : "⏸️ Withdrawal put on hold for further review",
    );
  };

  const bulkApprove = () => {
    const safeWithdrawals = withdrawals.filter(
      (w) => w.riskLevel === "low" && !w.flagged,
    );
    setWithdrawals((prev) =>
      prev.filter((w) => w.riskLevel !== "low" || w.flagged),
    );
    setPendingCount((prev) => prev - safeWithdrawals.length);
    showToast(
      lang === "bn"
        ? "✅ সব কম ঝুঁকির উত্তোলন একসাথে অনুমোদিত হয়েছে"
        : "✅ All low-risk withdrawals approved in bulk",
    );
  };

  const getRiskClass = (level) => {
    if (level === "low") return "risk-low bg-green-500";
    if (level === "medium") return "risk-med bg-amber-500";
    return "risk-high bg-red-500";
  };

  const getRiskLabelClass = (level) => {
    if (level === "low") return "text-green-500";
    if (level === "medium") return "text-amber-500";
    return "text-red-500";
  };

  const filteredWithdrawals = withdrawals.filter((w) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "flagged" && w.flagged) ||
      (activeFilter === "bkash" && w.method === "bKash") ||
      (activeFilter === "nagad" && w.method === "Nagad") ||
      (activeFilter === "bank" && w.method === "Bank Transfer");
    const matchesSearch =
      searchQuery === "" ||
      w.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.refId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.amount.includes(searchQuery);
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-50 flex-wrap">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-bold text-foreground flex-1">
          🏧 {lang === "bn" ? "উত্তোলন অনুমোদন" : "Withdrawal Approvals"}
        </h1>
        <span className="px-2 py-1 rounded-md bg-red-500/15 text-red-400 text-[10px] font-bold">
          ADMIN
        </span>
        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-3 py-1.5 rounded-lg border border-border text-xs font-bold hover:border-primary transition"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 max-w-6xl mx-auto">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-3 text-center"
          >
            <div
              className={`text-xl font-bold ${stat.color === "yellow" ? "text-amber-400" : stat.color === "green" ? "text-green-400" : stat.color === "red" ? "text-red-400" : "text-blue-400"}`}
            >
              {stat.value}
            </div>
            <div className="text-[10px] text-foreground/50 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide max-w-6xl mx-auto">
        {[
          { id: "all", label: `All (${withdrawals.length})` },
          { id: "flagged", label: "🔴 Flagged" },
          { id: "bkash", label: "💜 bKash" },
          { id: "nagad", label: "🟠 Nagad" },
          { id: "bank", label: "🏦 Bank Transfer" },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 whitespace-nowrap transition ${
              activeFilter === filter.id
                ? "bg-primary text-white border-primary"
                : "border-border bg-card text-foreground/60 hover:border-primary"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 px-4 pb-3 max-w-6xl mx-auto">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === "bn"
                ? "সদস্য, TxID বা পরিমাণ দিয়ে খুঁজুন..."
                : "Search by user, TxID, amount..."
            }
            className="w-full py-2 pl-9 pr-3 rounded-lg border border-border bg-card text-foreground text-sm outline-none focus:border-primary transition"
          />
        </div>
        <button
          onClick={bulkApprove}
          className="px-4 py-2 rounded-lg bg-primary/15 text-primary text-sm font-semibold hover:bg-primary hover:text-white transition"
        >
          ✅ {lang === "bn" ? "নিরাপদ সব অনুমোদন" : "Approve All Safe"}
        </button>
      </div>

      {/* Withdrawals List */}
      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-3">
        {filteredWithdrawals.map((wd) => (
          <div
            key={wd.id}
            className={`bg-card border rounded-xl overflow-hidden transition ${wd.flagged ? "border-l-4 border-l-red-500 border-border" : "border-border"}`}
          >
            <div className="p-4">
              <div className="flex flex-wrap gap-3">
                <div
                  className={`w-10 h-10 rounded-lg bg-linear-to-r ${wd.avatarBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                >
                  {wd.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground">
                    {wd.name}{" "}
                    {wd.flagged && (
                      <span className="text-xs text-red-400 ml-1">
                        ⚠️ FLAGGED
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-foreground/50">
                    {wd.phone} · {wd.methodIcon} {wd.method} · Ref: {wd.refId} ·{" "}
                    {wd.time}
                  </div>
                </div>
                <div className="text-xl font-bold text-red-500">
                  {wd.amount}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-3">
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">Method</div>
                  <div className="text-xs font-semibold">
                    {wd.methodIcon} {wd.method}
                  </div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">Goal</div>
                  <div className="text-xs font-semibold">
                    {wd.goalIcon} {wd.goal}
                  </div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">KYC</div>
                  <div
                    className={`text-xs font-semibold ${wd.kycColor === "success" ? "text-green-500" : "text-amber-500"}`}
                  >
                    {wd.kyc}
                  </div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">
                    Balance After
                  </div>
                  <div className="text-xs font-semibold">{wd.balanceAfter}</div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">Fee</div>
                  <div className="text-xs font-semibold">{wd.fee}</div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">
                    Net Payout
                  </div>
                  <div className="text-xs font-semibold text-green-500">
                    {wd.netPayout}
                  </div>
                </div>
              </div>

              {wd.flagged && (
                <div className="mt-2 p-2 bg-red-500/10 rounded-lg">
                  <div className="flex flex-wrap gap-3 text-xs">
                    <span>⚠️ Prev. Flags: {wd.prevFlags}</span>
                    <span>📅 Account Age: {wd.accountAge}</span>
                    <span>💰 Total Deposits: {wd.totalDeposits}</span>
                    <span className="text-red-400">
                      🔍 Pattern: {wd.pattern}
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-foreground/50">
                    {lang === "bn" ? "ঝুঁকি স্কোর:" : "Risk Score:"}
                  </span>
                  <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getRiskClass(wd.riskLevel)}`}
                      style={{ width: `${wd.riskScore}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-bold ${getRiskLabelClass(wd.riskLevel)}`}
                  >
                    {wd.riskLevel === "low"
                      ? "Low"
                      : wd.riskLevel === "medium"
                        ? "Medium"
                        : "High"}{" "}
                    ({wd.riskScore})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                <button
                  onClick={() => approveWithdrawal(wd.id)}
                  className={`py-2 rounded-lg border border-green-500/30 text-green-500 text-xs font-semibold hover:bg-green-500 hover:text-white transition ${wd.flagged ? "opacity-50" : ""}`}
                >
                  ✅ {lang === "bn" ? "অনুমোদন" : "Approve"}
                </button>
                <button
                  onClick={() => rejectWithdrawal(wd.id)}
                  className={`py-2 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500 hover:text-white transition ${wd.flagged ? "bg-red-500 text-white" : ""}`}
                >
                  ❌ {lang === "bn" ? "প্রত্যাখ্যান" : "Reject"}
                </button>
                <button
                  onClick={() => holdWithdrawal(wd.id)}
                  className="py-2 rounded-lg border border-amber-500/30 text-amber-500 text-xs font-semibold hover:bg-amber-500 hover:text-white transition"
                >
                  ⏸️ {lang === "bn" ? "হোল্ড" : "Hold"}
                </button>
                <button
                  onClick={() =>
                    showToast(
                      lang === "bn"
                        ? "👤 সদস্য প্রোফাইল খোলা হচ্ছে..."
                        : "👤 Opening user profile...",
                    )
                  }
                  className="py-2 rounded-lg border border-border text-foreground/60 text-xs font-semibold hover:border-primary transition"
                >
                  👤 {lang === "bn" ? "সদস্য" : "User"}
                </button>
              </div>
            </div>
          </div>
        ))}
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

export default WithdrawalApprovalsPage;
