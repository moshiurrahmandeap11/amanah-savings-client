"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Moon,
  Sun,
  Search,
  Eye,
  Check,
  X,
  MessageSquare,
  AlertCircle,
} from "lucide-react";
import Link from "next/link";

const WithDrawalsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activeTab, setActiveTab] = useState("pending");
  const [searchQuery, setSearchQuery] = useState("");
  const [showNoteSheet, setShowNoteSheet] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const [transactions, setTransactions] = useState([
    {
      id: 1,
      name: "Rahela Begum",
      avatar: "র",
      phone: "+8801711234567",
      type: "deposit",
      goal: "Home Purchase",
      method: "bKash",
      amount: 5000,
      txid: "BK20260524123",
      date: "May 25, 2026, 10:32",
      status: "pending",
      hasScreenshot: true,
    },
    {
      id: 2,
      name: "Karim Mia",
      avatar: "ক",
      phone: "+8801812345678",
      type: "deposit",
      goal: "New Phone",
      method: "Nagad",
      amount: 2000,
      txid: "NG20260524456",
      date: "May 25, 2026, 09:15",
      status: "pending",
      hasScreenshot: true,
    },
    {
      id: 3,
      name: "Farhan Ahmed",
      avatar: "ফ",
      phone: "+8801912345678",
      type: "withdraw",
      goal: "Travel Fund",
      method: "bKash",
      amount: 5000,
      txid: "WD20260523789",
      date: "May 23, 2026, 14:00",
      status: "pending",
      hasScreenshot: false,
    },
    {
      id: 4,
      name: "Sumaiya Khanam",
      avatar: "স",
      phone: "+8801611234567",
      type: "deposit",
      goal: "Emergency Fund",
      method: "bKash",
      amount: 10000,
      txid: "BK20260522999",
      date: "May 22, 2026, 11:45",
      status: "approved",
      hasScreenshot: true,
    },
    {
      id: 5,
      name: "Arif Hossain",
      avatar: "আ",
      phone: "+8801511234567",
      type: "deposit",
      goal: "Car Purchase",
      method: "Nagad",
      amount: 3000,
      txid: "NG20260521111",
      date: "May 21, 2026, 16:20",
      status: "rejected",
      hasScreenshot: true,
    },
  ]);

  const stats = [
    { icon: "⏳", value: "12", label: "Pending", color: "yellow" },
    { icon: "✅", value: "385", label: "Approved", color: "green" },
    { icon: "💰", value: "৳38.5L", label: "Total Deposits", color: "blue" },
    { icon: "⬇️", value: "৳5L", label: "Total Withdrawals", color: "red" },
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

  const approveTransaction = (id) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "approved" } : t)),
    );
    showToast(
      lang === "bn" ? "✅ লেনদেন অনুমোদিত!" : "✅ Transaction approved!",
    );
  };

  const rejectTransaction = (id) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "rejected" } : t)),
    );
    showToast(
      lang === "bn" ? "❌ লেনদেন বাতিল করা হয়েছে" : "❌ Transaction rejected",
    );
  };

  const openNoteSheet = (transaction) => {
    setSelectedTransaction(transaction);
    setShowNoteSheet(true);
    document.body.style.overflow = "hidden";
  };

  const closeNoteSheet = () => {
    setShowNoteSheet(false);
    setSelectedTransaction(null);
    setNoteText("");
    document.body.style.overflow = "auto";
  };

  const sendNote = () => {
    closeNoteSheet();
    showToast(lang === "bn" ? "📤 নোট পাঠানো হয়েছে" : "📤 Note sent");
  };

  const formatAmount = (amount) => {
    const formatted = amount.toLocaleString();
    return lang === "bn"
      ? `৳${formatted.replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d])}`
      : `৳${formatted}`;
  };

  const getStatusBadge = (status) => {
    if (status === "pending") return "bg-amber-500/15 text-amber-500";
    if (status === "approved") return "bg-green-500/15 text-green-500";
    return "bg-red-500/15 text-red-500";
  };

  const getStatusIcon = (status) => {
    if (status === "pending") return "⏳";
    if (status === "approved") return "✅";
    return "❌";
  };

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === "pending" && t.status !== "pending") return false;
    if (activeTab === "approved" && t.status !== "approved") return false;
    if (activeTab === "rejected" && t.status !== "rejected") return false;
    if (activeTab === "withdraw" && t.type !== "withdraw") return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchText =
        `${t.name} ${t.txid} ${t.phone} ${t.goal}`.toLowerCase();
      if (!searchText.includes(query)) return false;
    }
    return true;
  });

  const pendingCount = transactions.filter(
    (t) => t.status === "pending",
  ).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Back Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15 sticky top-0 z-50">
        <Link
          href="/admin"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> Admin
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">
          {lang === "bn" ? "লেনদেন" : "Transactions"}
        </span>
      </div>

      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-12 z-40">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-bold text-foreground flex-1">
          💳 {lang === "bn" ? "লেনদেন ব্যবস্থাপনা" : "Transaction Management"}
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-3 flex items-center gap-2"
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${
                stat.color === "yellow"
                  ? "bg-amber-500/15"
                  : stat.color === "green"
                    ? "bg-green-500/15"
                    : stat.color === "blue"
                      ? "bg-blue-500/15"
                      : "bg-red-500/15"
              }`}
            >
              {stat.icon}
            </div>
            <div>
              <div className="text-base font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-[10px] text-foreground/50">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {[
          { id: "pending", label: "⏳ Pending", count: pendingCount },
          { id: "approved", label: "✅ Approved", count: null },
          { id: "rejected", label: "❌ Rejected", count: null },
          { id: "withdraw", label: "⬇️ Withdrawals", count: null },
          { id: "all", label: "All", count: null },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border-2 whitespace-nowrap transition ${
              activeTab === tab.id
                ? "bg-primary text-white border-primary"
                : "border-border bg-card text-foreground/60 hover:border-primary"
            }`}
          >
            {tab.label} {tab.count ? `(${tab.count})` : ""}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 bg-card border border-border rounded-xl px-3 py-2">
          <Search size={16} className="text-foreground/50" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              lang === "bn"
                ? "নাম বা TxID দিয়ে খুঁজুন..."
                : "Search by name or TxID..."
            }
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>
      </div>

      {/* Transactions List */}
      <div className="px-4 pb-20 space-y-3">
        {filteredTransactions.length === 0 ? (
          <div className="text-center py-12 text-foreground/50">
            📭{" "}
            {lang === "bn"
              ? "কোনো লেনদেন পাওয়া যায়নি"
              : "No transactions found"}
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <motion.div
              key={tx.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              {/* Transaction Header */}
              <div className="p-3 flex items-start gap-2">
                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {tx.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-semibold text-sm text-foreground">
                      {tx.name}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${getStatusBadge(tx.status)}`}
                    >
                      {getStatusIcon(tx.status)} {tx.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-foreground/50 mt-0.5">
                    {tx.phone} · {tx.date}
                  </div>
                </div>
                <div
                  className={`text-base font-bold ${tx.type === "deposit" ? "text-green-500" : "text-red-500"}`}
                >
                  {tx.type === "deposit" ? "+" : "-"}
                  {formatAmount(tx.amount)}
                </div>
              </div>

              {/* Details */}
              <div className="grid grid-cols-2 gap-1.5 px-3 pb-2">
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">
                    {lang === "bn" ? "লক্ষ্য" : "Goal"}
                  </div>
                  <div className="text-xs font-semibold text-foreground">
                    {tx.goal}
                  </div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">
                    {lang === "bn" ? "মাধ্যম" : "Method"}
                  </div>
                  <div className="text-xs font-semibold text-foreground">
                    {tx.method}
                  </div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">TxID</div>
                  <div className="text-[10px] font-mono text-foreground/70">
                    {tx.txid}
                  </div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">
                    {lang === "bn" ? "ধরন" : "Type"}
                  </div>
                  <div className="text-xs font-semibold text-foreground">
                    {tx.type === "deposit" ? "⬆️ Deposit" : "⬇️ Withdrawal"}
                  </div>
                </div>
              </div>

              {/* Screenshot */}
              {tx.hasScreenshot && (
                <div className="px-3 pb-2">
                  <div
                    onClick={() =>
                      showToast(
                        lang === "bn"
                          ? "🖼️ স্ক্রিনশট দেখছেন..."
                          : "🖼️ Viewing screenshot...",
                      )
                    }
                    className="bg-background border border-border rounded-lg p-2 flex items-center gap-2 cursor-pointer"
                  >
                    <span className="text-xl">🖼️</span>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-foreground">
                        {lang === "bn"
                          ? "পেমেন্ট স্ক্রিনশট"
                          : "Payment Screenshot"}
                      </div>
                      <div className="text-[9px] text-foreground/50">
                        {lang === "bn"
                          ? "ট্যাপ করে যাচাই করুন"
                          : "Tap to verify"}
                      </div>
                    </div>
                    <span className="text-xs text-primary font-semibold">
                      {lang === "bn" ? "দেখুন →" : "View →"}
                    </span>
                  </div>
                </div>
              )}

              {/* Actions */}
              {tx.status === "pending" && (
                <div className="flex gap-2 p-3 pt-0">
                  <button
                    onClick={() => approveTransaction(tx.id)}
                    className="flex-1 py-2 rounded-lg border border-green-500/30 bg-green-500/10 text-green-500 text-xs font-bold hover:bg-green-500/20 transition"
                  >
                    ✅ {lang === "bn" ? "অনুমোদন" : "Approve"}
                  </button>
                  <button
                    onClick={() => rejectTransaction(tx.id)}
                    className="flex-1 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20 transition"
                  >
                    ❌ {lang === "bn" ? "বাতিল" : "Reject"}
                  </button>
                  <button
                    onClick={() => openNoteSheet(tx)}
                    className="px-3 py-2 rounded-lg border border-border text-foreground/60 text-xs font-bold hover:border-primary transition"
                  >
                    📝
                  </button>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Note Sheet Modal */}
      <AnimatePresence>
        {showNoteSheet && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-50"
              onClick={closeNoteSheet}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl z-50 p-5"
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
              <div className="font-bold text-foreground mb-3">
                📝 {lang === "bn" ? "নোট পাঠান" : "Send Note"}
              </div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
                placeholder={
                  lang === "bn"
                    ? "সদস্যকে কারণ জানান..."
                    : "Tell the member the reason..."
                }
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition resize-none"
              />
              <button
                onClick={sendNote}
                className="w-full py-3 mt-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-bold text-sm"
              >
                📤 {lang === "bn" ? "পাঠান" : "Send"}
              </button>
              <button
                onClick={closeNoteSheet}
                className="w-full py-2 mt-2 rounded-xl border-2 border-border text-foreground/60 text-sm font-semibold"
              >
                {lang === "bn" ? "বাতিল" : "Cancel"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WithDrawalsPage;
