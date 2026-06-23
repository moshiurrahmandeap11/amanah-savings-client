"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Loader2,
  Banknote,
  Building,
  Smartphone,
  User,
  Calendar,
  Hash,
  FileText,
  CreditCard,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    transactions: "💳 Transactions",
    transactionManagement: "Transaction Management",
    all: "All",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    withdrawals: "Withdrawals",
    deposits: "Deposits",
    searchPlaceholder: "Search by name or TxID...",
    noTransactions: "No transactions found",
    approve: "Approve",
    reject: "Reject",
    sendNote: "Send Note",
    notePlaceholder: "Tell the member the reason...",
    send: "Send",
    cancel: "Cancel",
    transactionApproved: "✅ Transaction approved!",
    transactionRejected: "❌ Transaction rejected",
    noteSent: "📤 Note sent",
    failedToLoad: "Failed to load transactions",
    admin: "ADMIN",
    view: "View",
    pendingText: "⏳ Pending",
    approvedText: "✅ Approved",
    rejectedText: "❌ Rejected",
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    transactionDetails: "Transaction Details",
    close: "Close",
    amount: "Amount",
    reason: "Reason",
    paymentMethod: "Payment Method",
    goal: "Goal",
    status: "Status",
    createdAt: "Created At",
    updatedAt: "Updated At",
    approvedAt: "Approved At",
    processedAt: "Processed At",
    remarks: "Remarks",
    transactionId: "Transaction ID",
    approvedBy: "Approved By",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    accountHolderName: "Account Holder Name",
    phoneNumber: "Phone Number",
    withdrawalDetails: "Withdrawal Details",
    depositDetails: "Deposit Details",
    screenshot: "Screenshot",
    viewScreenshot: "View Screenshot",
    noScreenshot: "No Screenshot",
    completed: "Completed",
    processing: "Processing",
    unknown: "Unknown",
    user: "User",
    method: "Method",
    type: "Type",
  },
  bn: {
    transactions: "💳 লেনদেন",
    transactionManagement: "লেনদেন ব্যবস্থাপনা",
    all: "সব",
    pending: "পেন্ডিং",
    approved: "অনুমোদিত",
    rejected: "প্রত্যাখ্যাত",
    withdrawals: "উত্তোলন",
    deposits: "ডিপোজিট",
    searchPlaceholder: "নাম বা TxID দিয়ে খুঁজুন...",
    noTransactions: "কোনো লেনদেন পাওয়া যায়নি",
    approve: "অনুমোদন",
    reject: "বাতিল",
    sendNote: "নোট পাঠান",
    notePlaceholder: "সদস্যকে কারণ জানান...",
    send: "পাঠান",
    cancel: "বাতিল",
    transactionApproved: "✅ লেনদেন অনুমোদিত হয়েছে!",
    transactionRejected: "❌ লেনদেন বাতিল করা হয়েছে",
    noteSent: "📤 নোট পাঠানো হয়েছে",
    failedToLoad: "লেনদেন লোড করতে ব্যর্থ হয়েছে",
    admin: "অ্যাডমিন",
    view: "দেখুন",
    pendingText: "⏳ পেন্ডিং",
    approvedText: "✅ অনুমোদিত",
    rejectedText: "❌ প্রত্যাখ্যাত",
    deposit: "ডিপোজিট",
    withdrawal: "উত্তোলন",
    transactionDetails: "লেনদেনের বিবরণ",
    close: "বন্ধ করুন",
    amount: "পরিমাণ",
    reason: "কারণ",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    goal: "লক্ষ্য",
    status: "অবস্থা",
    createdAt: "তৈরির তারিখ",
    updatedAt: "আপডেটের তারিখ",
    approvedAt: "অনুমোদনের তারিখ",
    processedAt: "প্রক্রিয়াকরণের তারিখ",
    remarks: "মন্তব্য",
    transactionId: "লেনদেন আইডি",
    approvedBy: "অনুমোদনকারী",
    bankName: "ব্যাংকের নাম",
    accountNumber: "অ্যাকাউন্ট নম্বর",
    accountHolderName: "অ্যাকাউন্ট ধারকের নাম",
    phoneNumber: "ফোন নম্বর",
    withdrawalDetails: "উত্তোলনের বিবরণ",
    depositDetails: "ডিপোজিটের বিবরণ",
    screenshot: "স্ক্রিনশট",
    viewScreenshot: "স্ক্রিনশট দেখুন",
    noScreenshot: "কোন স্ক্রিনশট নেই",
    completed: "সম্পন্ন",
    processing: "প্রক্রিয়াকরণ",
    unknown: "অজানা",
    user: "ব্যবহারকারী",
    method: "পদ্ধতি",
    type: "ধরন",
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const defaultStats = {
  pending: 0,
  approved: 0,
  totalDeposits: 0,
  totalWithdrawals: 0,
};

const getInitialAdminLang = () => {
  if (typeof window === "undefined") return "bn";
  return localStorage.getItem("admin_lang") || "bn";
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("theme") === "dark";
};

const WithDrawalsPage = ({ initialTab = "pending" }) => {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [lang] = useState(getInitialAdminLang);
  const [activeTab, setActiveTab] = useState(initialTab);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNoteSheet, setShowNoteSheet] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [noteText, setNoteText] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(false);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  }, []);

  const fetchTransactions = useCallback(async () => {
    setLoading(true);
    try {
      let type = "all";
      if (activeTab === "withdraw") type = "withdrawal";
      else if (activeTab === "deposit") type = "deposit";

      const params = new URLSearchParams();
      params.append("type", type);
      params.append("status", activeTab === "pending" || activeTab === "approved" || activeTab === "rejected" ? activeTab : "");
      params.append("page", "1");
      params.append("limit", "20");
      if (searchQuery) params.append("search", searchQuery);

      const res = await axiosInstance.get(`/admin/transactions?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (res.data.success) {
        // Transform data to ensure paymentDetails is properly structured
        const transformedTransactions = (res.data.data.transactions || []).map(tx => {
          // If paymentDetails exists as a string, parse it
          let paymentDetails = tx.paymentDetails || {};
          if (typeof paymentDetails === 'string') {
            try {
              paymentDetails = JSON.parse(paymentDetails);
            } catch (e) {
              paymentDetails = {};
            }
          }
          
          // If bank data is directly on the transaction object, move it to paymentDetails
          if (tx.bankName || tx.accountNumber || tx.accountHolderName) {
            paymentDetails = {
              ...paymentDetails,
              bankName: tx.bankName || paymentDetails.bankName,
              accountNumber: tx.accountNumber || paymentDetails.accountNumber,
              accountHolderName: tx.accountHolderName || paymentDetails.accountHolderName,
            };
          }
          
          return {
            ...tx,
            paymentDetails,
          };
        });
        
        setTransactions(transformedTransactions);
        setStats(res.data.data.stats || defaultStats);
      }
    } catch (err) {
      const fallbackMessage = translations[lang]?.failedToLoad || translations.en.failedToLoad;
      showToast(err.response?.data?.message || fallbackMessage);
    } finally {
      setLoading(false);
    }
  }, [activeTab, searchQuery, lang, showToast]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    queueMicrotask(() => {
      fetchTransactions();
    });
  }, [fetchTransactions, isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const getTransactionActionBasePath = (transaction) => {
    const id = transaction?.id || transaction?._id;
    const type = transaction?.type === "withdrawal" ? "withdrawals" : "deposits";
    return `/${type}/${id}`;
  };

  const approveTransaction = async (transaction) => {
    try {
      const res = await axiosInstance.patch(
        `${getTransactionActionBasePath(transaction)}/approve`,
        {},
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToast(t('transactionApproved'));
        fetchTransactions();
      }
    } catch (err) {
      showToast(err.response?.data?.message || t('failedToLoad'));
    }
  };

  const rejectTransaction = async (transaction) => {
    try {
      const res = await axiosInstance.patch(
        `${getTransactionActionBasePath(transaction)}/reject`,
        { remarks: noteText || "Rejected by admin" },
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToast(t('transactionRejected'));
        fetchTransactions();
      }
    } catch (err) {
      showToast(err.response?.data?.message || t('failedToLoad'));
    }
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
    showToast(t('noteSent'));
  };

  const openDetailsModal = (transaction) => {
    setSelectedTransaction(transaction);
    setShowDetailsModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedTransaction(null);
    document.body.style.overflow = "auto";
  };

  const formatAmount = (amount) => {
    const formatted = Number(amount || 0).toLocaleString();
    return `৳${formatted}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  const getStatusBadge = (status) => {
    if (status === "pending") return "bg-amber-500/15 text-amber-500";
    if (status === "approved") return "bg-green-500/15 text-green-500";
    if (status === "completed") return "bg-blue-500/15 text-blue-500";
    if (status === "rejected") return "bg-red-500/15 text-red-500";
    return "bg-gray-500/15 text-gray-500";
  };

  const getStatusIcon = (status) => {
    if (status === "pending") return "⏳";
    if (status === "approved") return "✅";
    if (status === "completed") return "✅";
    if (status === "rejected") return "❌";
    return "❓";
  };

  const getPaymentMethodIcon = (method) => {
    if (method === "bank") return <Building size={14} className="text-blue-500" />;
    if (method === "bkash") return <Smartphone size={14} className="text-pink-500" />;
    if (method === "nagad") return <Smartphone size={14} className="text-orange-500" />;
    if (method === "rocket") return <Smartphone size={14} className="text-purple-500" />;
    return <Banknote size={14} className="text-gray-500" />;
  };

  const hasBankDetails = (tx) => {
    const details = tx.paymentDetails || {};
    return !!(details.bankName || details.accountNumber || details.accountHolderName);
  };

  const hasMobileDetails = (tx) => {
    const details = tx.paymentDetails || {};
    return !!(details.phoneNumber || tx.phoneNumber || tx.phone);
  };

  const filteredTransactions = transactions.filter((t) => {
    if (activeTab === "pending" && t.status !== "pending") return false;
    if (activeTab === "approved" && t.status !== "approved" && t.status !== "completed") return false;
    if (activeTab === "rejected" && t.status !== "rejected") return false;
    if (activeTab === "withdraw" && t.type !== "withdrawal") return false;
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchText = `${t.userName || ""} ${t.txid || ""} ${t.phone || ""} ${t.goal || ""}`.toLowerCase();
      if (!searchText.includes(query)) return false;
    }
    return true;
  });

  const pendingCount = transactions.filter((t) => t.status === "pending").length;

  const statCards = [
    { icon: "⏳", value: String(stats.pending || pendingCount), label: t('pending'), color: "yellow" },
    { icon: "✅", value: String(stats.approved || 0), label: t('approved'), color: "green" },
    { icon: "💰", value: `৳${stats.totalDeposits || 0}`, label: "Total Deposits", color: "blue" },
    { icon: "⬇️", value: `৳${stats.totalWithdrawals || 0}`, label: "Total Withdrawals", color: "red" },
  ];

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
          {t('transactions')}
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
          💳 {t('transactionManagement')}
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
        {statCards.map((stat, idx) => (
          <div key={idx} className="bg-card border border-border rounded-xl p-3 flex items-center gap-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0 ${stat.color === "yellow" ? "bg-amber-500/15" : stat.color === "green" ? "bg-green-500/15" : stat.color === "blue" ? "bg-blue-500/15" : "bg-red-500/15"}`}>
              {stat.icon}
            </div>
            <div>
              <div className="text-base font-bold text-foreground">{stat.value}</div>
              <div className="text-[10px] text-foreground/50">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Bar */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide">
        {[
          { id: "pending", label: `⏳ ${t('pending')}` },
          { id: "approved", label: `✅ ${t('approved')}` },
          { id: "rejected", label: `❌ ${t('rejected')}` },
          { id: "withdraw", label: `⬇️ ${t('withdrawals')}` },
          { id: "all", label: t('all') },
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
            {tab.label}
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
            onKeyDown={(e) => e.key === "Enter" && fetchTransactions()}
            placeholder={t('searchPlaceholder')}
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      {/* Transactions List */}
      <div className="px-4 pb-20 space-y-3">
        {!loading && filteredTransactions.length === 0 ? (
          <div className="text-center py-12 text-foreground/50">
            📭 {t('noTransactions')}
          </div>
        ) : (
          filteredTransactions.map((tx) => (
            <motion.div
              key={tx.id || tx._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card border border-border rounded-xl overflow-hidden"
            >
              <div className="p-3 flex items-start gap-2">
                <div className="w-10 h-10 rounded-lg bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shrink-0">
                  {tx.userName ? tx.userName[0] : "?"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="font-semibold text-sm text-foreground">
                      {tx.userName || "Unknown"}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${getStatusBadge(tx.status)}`}>
                      {getStatusIcon(tx.status)} {tx.status}
                    </span>
                  </div>
                  <div className="text-[10px] text-foreground/50 mt-0.5">
                    {tx.phone || ""} · {tx.date || formatDate(tx.createdAt)}
                  </div>
                </div>
                <div className={`text-base font-bold ${tx.type === "deposit" ? "text-green-500" : "text-red-500"}`}>
                  {tx.type === "deposit" ? "+" : "-"}
                  {formatAmount(tx.amount || tx.withdrawalAmount || tx.depositAmount)}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-1.5 px-3 pb-2">
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">{t('goal')}</div>
                  <div className="text-xs font-semibold text-foreground">
                    {tx.goalName || "N/A"}
                  </div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">{t('method')}</div>
                  <div className="text-xs font-semibold text-foreground flex items-center gap-1">
                    {getPaymentMethodIcon(tx.paymentMethod || tx.method)}
                    {tx.paymentMethod || tx.method || "N/A"}
                  </div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">{t('transactionId')}</div>
                  <div className="text-[10px] font-mono text-foreground/70 truncate">
                    {tx.txid || tx.transactionId || tx.id || "N/A"}
                  </div>
                </div>
                <div className="bg-background rounded-lg p-2">
                  <div className="text-[9px] text-foreground/50">{t('reason')}</div>
                  <div className="text-xs font-semibold text-foreground truncate">
                    {tx.reason || t('unknown')}
                  </div>
                </div>
              </div>

              {/* Withdrawal Details (Bank Info) */}
              {tx.type === "withdrawal" && tx.paymentMethod === "bank" && hasBankDetails(tx) && (
                <div className="px-3 pb-2">
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 rounded-lg p-2">
                    <div className="text-[9px] text-foreground/50 mb-1 flex items-center gap-1">
                      <Building size={12} /> 🏦 Bank Details
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-[10px]">
                      <div>
                        <span className="text-foreground/50">{t('bankName')}:</span>
                        <span className="font-semibold text-foreground ml-1">{tx.paymentDetails?.bankName || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-foreground/50">{t('accountNumber')}:</span>
                        <span className="font-semibold text-foreground ml-1">{tx.paymentDetails?.accountNumber || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-foreground/50">{t('accountHolderName')}:</span>
                        <span className="font-semibold text-foreground ml-1">{tx.paymentDetails?.accountHolderName || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Withdrawal Details (Mobile Banking) */}
              {tx.type === "withdrawal" && (tx.paymentMethod === "bkash" || tx.paymentMethod === "nagad") && hasMobileDetails(tx) && (
                <div className="px-3 pb-2">
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-lg p-2">
                    <div className="text-[9px] text-foreground/50 mb-1 flex items-center gap-1">
                      <Smartphone size={12} /> 📱 Mobile Banking Details
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[10px]">
                      <div>
                        <span className="text-foreground/50">{t('phoneNumber')}:</span>
                        <span className="font-semibold text-foreground ml-1">{tx.paymentDetails?.phoneNumber || tx.phoneNumber || tx.phone || "N/A"}</span>
                      </div>
                      <div>
                        <span className="text-foreground/50">{t('method')}:</span>
                        <span className="font-semibold text-foreground ml-1">{tx.paymentMethod?.toUpperCase() || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {tx.hasScreenshot && (
                <div className="px-3 pb-2">
                  <div className="bg-background border border-border rounded-lg p-2 flex items-center gap-2 cursor-pointer" onClick={() => showToast("🖼️ Viewing screenshot...")}>
                    <span className="text-xl">🖼️</span>
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-foreground">{t('screenshot')}</div>
                      <div className="text-[9px] text-foreground/50">{t('viewScreenshot')}</div>
                    </div>
                    <span className="text-xs text-primary font-semibold">{t('view')} →</span>
                  </div>
                </div>
              )}

              <div className="flex gap-2 p-3 pt-0">
                {tx.status === "pending" && (
                  <>
                    <button
                      onClick={() => approveTransaction(tx)}
                      className="flex-1 py-2 rounded-lg border border-green-500/30 bg-green-500/10 text-green-500 text-xs font-bold hover:bg-green-500/20 transition"
                    >
                      ✅ {t('approve')}
                    </button>
                    <button
                      onClick={() => rejectTransaction(tx)}
                      className="flex-1 py-2 rounded-lg border border-red-500/30 bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20 transition"
                    >
                      ❌ {t('reject')}
                    </button>
                    <button
                      onClick={() => openNoteSheet(tx)}
                      className="px-3 py-2 rounded-lg border border-border text-foreground/60 text-xs font-bold hover:border-primary transition"
                    >
                      📝
                    </button>
                  </>
                )}
                <button
                  onClick={() => openDetailsModal(tx)}
                  className={`${tx.status === "pending" ? "flex-1" : "w-full"} py-2 rounded-lg border border-primary/30 text-primary text-xs font-bold hover:bg-primary/10 transition`}
                >
                  👁️ {t('view')}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Note Sheet Modal */}
      <AnimatePresence>
        {showNoteSheet && (
          <>
            <div className="fixed inset-0 bg-black/60 z-50" onClick={closeNoteSheet} />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl z-50 p-5"
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
              <div className="font-bold text-foreground mb-3">📝 {t('sendNote')}</div>
              <textarea
                value={noteText}
                onChange={(e) => setNoteText(e.target.value)}
                rows={4}
                placeholder={t('notePlaceholder')}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition resize-none"
              />
              <button
                onClick={sendNote}
                className="w-full py-3 mt-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-bold text-sm"
              >
                📤 {t('send')}
              </button>
              <button
                onClick={closeNoteSheet}
                className="w-full py-2 mt-2 rounded-xl border-2 border-border text-foreground/60 text-sm font-semibold"
              >
                {t('cancel')}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Transaction Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedTransaction && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeDetailsModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-4 rounded-t-2xl flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <FileText size={20} className="text-primary" />
                    {t('transactionDetails')}
                  </h3>
                  <p className="text-xs text-foreground/50">{selectedTransaction.id || selectedTransaction._id}</p>
                </div>
                <button
                  onClick={closeDetailsModal}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4">
                {/* User & Status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-lg">
                      {selectedTransaction.userName ? selectedTransaction.userName[0] : "?"}
                    </div>
                    <div>
                      <div className="font-bold text-foreground">{selectedTransaction.userName || "Unknown"}</div>
                      <div className="text-xs text-foreground/50">{selectedTransaction.phone || "N/A"}</div>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusBadge(selectedTransaction.status)}`}>
                    {getStatusIcon(selectedTransaction.status)} {selectedTransaction.status}
                  </span>
                </div>

                {/* Transaction Info */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-background rounded-xl p-3">
                    <div className="text-[10px] text-foreground/50">{t('type')}</div>
                    <div className="font-semibold text-foreground capitalize">
                      {selectedTransaction.type === "deposit" ? "⬆️ Deposit" : "⬇️ Withdrawal"}
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-3">
                    <div className="text-[10px] text-foreground/50">{t('amount')}</div>
                    <div className={`font-bold ${selectedTransaction.type === "deposit" ? "text-green-500" : "text-red-500"}`}>
                      {selectedTransaction.type === "deposit" ? "+" : "-"}
                      {formatAmount(selectedTransaction.amount || selectedTransaction.withdrawalAmount || selectedTransaction.depositAmount)}
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-3">
                    <div className="text-[10px] text-foreground/50">{t('paymentMethod')}</div>
                    <div className="font-semibold text-foreground flex items-center gap-1">
                      {getPaymentMethodIcon(selectedTransaction.paymentMethod || selectedTransaction.method)}
                      {selectedTransaction.paymentMethod || selectedTransaction.method || "N/A"}
                    </div>
                  </div>
                  <div className="bg-background rounded-xl p-3">
                    <div className="text-[10px] text-foreground/50">{t('reason')}</div>
                    <div className="font-semibold text-foreground">{selectedTransaction.reason || t('unknown')}</div>
                  </div>
                  <div className="bg-background rounded-xl p-3">
                    <div className="text-[10px] text-foreground/50">{t('goal')}</div>
                    <div className="font-semibold text-foreground">{selectedTransaction.goalName || "N/A"}</div>
                  </div>
                  <div className="bg-background rounded-xl p-3">
                    <div className="text-[10px] text-foreground/50">{t('transactionId')}</div>
                    <div className="font-mono text-xs text-foreground">{selectedTransaction.txid || selectedTransaction.transactionId || selectedTransaction.id || "N/A"}</div>
                  </div>
                </div>

                {/* Withdrawal Details - Bank */}
                {selectedTransaction.type === "withdrawal" && selectedTransaction.paymentMethod === "bank" && hasBankDetails(selectedTransaction) && (
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4">
                    <div className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                      <Building size={16} className="text-blue-500" />
                      {t('bankName')} Details
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/50">{t('bankName')}</span>
                        <span className="font-semibold text-foreground">{selectedTransaction.paymentDetails?.bankName || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/50">{t('accountNumber')}</span>
                        <span className="font-semibold text-foreground">{selectedTransaction.paymentDetails?.accountNumber || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/50">{t('accountHolderName')}</span>
                        <span className="font-semibold text-foreground">{selectedTransaction.paymentDetails?.accountHolderName || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Withdrawal Details - Mobile Banking */}
                {selectedTransaction.type === "withdrawal" && (selectedTransaction.paymentMethod === "bkash" || selectedTransaction.paymentMethod === "nagad") && hasMobileDetails(selectedTransaction) && (
                  <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800/30 rounded-xl p-4">
                    <div className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                      <Smartphone size={16} className="text-purple-500" />
                      Mobile Banking Details
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/50">{t('phoneNumber')}</span>
                        <span className="font-semibold text-foreground">{selectedTransaction.paymentDetails?.phoneNumber || selectedTransaction.phoneNumber || selectedTransaction.phone || "N/A"}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/50">{t('method')}</span>
                        <span className="font-semibold text-foreground">{selectedTransaction.paymentMethod?.toUpperCase() || "N/A"}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="bg-background rounded-xl p-4 space-y-2">
                  <div className="text-xs font-semibold text-foreground/50 mb-2">📅 Timestamps</div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-foreground/50">{t('createdAt')}:</span>
                      <span className="text-foreground ml-1">{formatDate(selectedTransaction.createdAt)}</span>
                    </div>
                    <div>
                      <span className="text-foreground/50">{t('updatedAt')}:</span>
                      <span className="text-foreground ml-1">{formatDate(selectedTransaction.updatedAt)}</span>
                    </div>
                    {selectedTransaction.approvedAt && (
                      <div>
                        <span className="text-foreground/50">{t('approvedAt')}:</span>
                        <span className="text-foreground ml-1">{formatDate(selectedTransaction.approvedAt)}</span>
                      </div>
                    )}
                    {selectedTransaction.processedAt && (
                      <div>
                        <span className="text-foreground/50">{t('processedAt')}:</span>
                        <span className="text-foreground ml-1">{formatDate(selectedTransaction.processedAt)}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Remarks */}
                {selectedTransaction.remarks && (
                  <div className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/30 rounded-xl p-4">
                    <div className="text-xs font-semibold text-foreground/50 mb-1">{t('remarks')}</div>
                    <div className="text-sm text-foreground">{selectedTransaction.remarks}</div>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4 rounded-b-2xl">
                <button
                  onClick={closeDetailsModal}
                  className="w-full py-2.5 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition"
                >
                  {t('close')}
                </button>
              </div>
            </motion.div>
          </div>
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
