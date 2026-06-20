"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Wallet, TrendingUp, Clock, ArrowUp, ArrowDown, Banknote, Calendar, CheckCircle, AlertCircle, Target, Smartphone, Building, Send, User, ArrowRightLeft } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Page Title
    pageTitle: "Transaction History",
    
    // Stats Labels
    totalDeposit: "Total Deposit",
    totalDeposits: "Total Deposits",
    pendingDeposits: "Pending Deposits",
    totalWithdrawn: "Total Withdrawn",
    netSavings: "Net Savings",
    totalTransferred: "Total Transferred",
    totalTransfers: "Total Transfers",
    
    // Tabs
    all: "All",
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    transfer: "Transfer",
    
    // Status
    approved: "Approved",
    pending: "Pending",
    rejected: "Rejected",
    completed: "Completed",
    unknown: "Unknown",
    inProgress: "In Progress",
    
    // Messages
    noTransactions: "No transactions found",
    loadingTransactions: "Loading transactions...",
    
    // Deposit Summary
    depositSummary: "Deposit Summary",
    totalDepositsCount: "Total Deposits:",
    totalAmount: "Total Amount:",
    averageDeposit: "Average Deposit:",
    pendingApproval: "Pending Approval:",
    
    // Withdrawal Summary
    withdrawalSummary: "Withdrawal Summary",
    totalWithdrawals: "Total Withdrawals:",
    totalAmountWithdrawn: "Total Amount:",
    pendingWithdrawals: "Pending Withdrawals:",
    netSaved: "Net Saved:",
    
    // Transfer Summary
    transferSummary: "Transfer Summary",
    totalTransfersCount: "Total Transfers:",
    totalTransferredAmount: "Total Transferred:",
    goalToGoalTransfers: "Goal to Goal:",
    userToUserTransfers: "User to User:",
    
    // Deposit Summary Section
    reason: "Reason:",
    transactionId: "ID:",
    from: "From:",
    to: "To:",
    note: "Note:",
    
    // Pagination
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",

    // Transfer labels
    sentTo: "Sent to",
    receivedFrom: "Received from",
    you: "You",
    unknownUser: "Unknown User",
  },
  bn: {
    // Page Title
    pageTitle: "লেনদেনের ইতিহাস",
    
    // Stats Labels
    totalDeposit: "মোট ডিপোজিট",
    totalDeposits: "মোট ডিপোজিট",
    pendingDeposits: "প্রক্রিয়াধীন ডিপোজিট",
    totalWithdrawn: "মোট উত্তোলন",
    netSavings: "নিট সঞ্চয়",
    totalTransferred: "মোট স্থানান্তর",
    totalTransfers: "মোট স্থানান্তর",
    
    // Tabs
    all: "সব",
    deposit: "ডিপোজিট",
    withdrawal: "উত্তোলন",
    transfer: "স্থানান্তর",
    
    // Status
    approved: "অনুমোদিত",
    pending: "প্রক্রিয়াধীন",
    rejected: "বাতিল",
    completed: "সম্পন্ন",
    unknown: "অজানা",
    inProgress: "চলমান",
    
    // Messages
    noTransactions: "কোন লেনদেন পাওয়া যায়নি",
    loadingTransactions: "লেনদেন লোড হচ্ছে...",
    
    // Deposit Summary
    depositSummary: "ডিপোজিট সারাংশ",
    totalDepositsCount: "মোট ডিপোজিট:",
    totalAmount: "মোট পরিমাণ:",
    averageDeposit: "গড় ডিপোজিট:",
    pendingApproval: "প্রক্রিয়াধীন:",
    
    // Withdrawal Summary
    withdrawalSummary: "উত্তোলন সারাংশ",
    totalWithdrawals: "মোট উত্তোলন:",
    totalAmountWithdrawn: "মোট পরিমাণ:",
    pendingWithdrawals: "প্রক্রিয়াধীন উত্তোলন:",
    netSaved: "নিট সঞ্চয়:",
    
    // Transfer Summary
    transferSummary: "স্থানান্তর সারাংশ",
    totalTransfersCount: "মোট স্থানান্তর:",
    totalTransferredAmount: "মোট স্থানান্তরিত:",
    goalToGoalTransfers: "গোল টু গোল:",
    userToUserTransfers: "ইউজার টু ইউজার:",
    
    // Deposit Summary Section
    reason: "কারণ:",
    transactionId: "আইডি:",
    from: "থেকে:",
    to: "প্রতি:",
    note: "নোট:",
    
    // Pagination
    previous: "পূর্ববর্তী",
    next: "পরবর্তী",
    page: "পৃষ্ঠা",
    of: "এর",

    // Transfer labels
    sentTo: "পাঠানো হয়েছে",
    receivedFrom: "প্রাপ্ত হয়েছে",
    you: "আপনি",
    unknownUser: "অজানা ব্যবহারকারী",
  }
};

const TransactionsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [depositStats, setDepositStats] = useState({
    totalDeposited: 0,
    totalDeposits: 0,
  });
  const [withdrawalStats, setWithdrawalStats] = useState({
    totalWithdrawn: 0,
    totalWithdrawals: 0,
  });
  const [transferStats, setTransferStats] = useState({
    totalTransferred: 0,
    totalTransfers: 0,
  });
  console.log("transfer state :", transferStats);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });
  const [lang, setLang] = useState("bn");
  const [currentUser, setCurrentUser] = useState(null);
  const [userCache, setUserCache] = useState({});
  console.log("user cache :", userCache); // Cache for fetched users

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Load language preference and user
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'bn';
    setLang(savedLang);
    
    // Get current user from localStorage
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        setCurrentUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  // Fetch user by ID
  const fetchUserById = async (userId) => {
    if (!userId) return null;
    
    // Check cache first
    if (userCache[userId]) {
      return userCache[userId];
    }

    try {
      const response = await axiosInstance.get(`/users/users/${userId}`);
      if (response.data.success) {
        const userData = response.data.data;
        // Cache the user data
        setUserCache(prev => ({
          ...prev,
          [userId]: userData
        }));
        return userData;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      return null;
    }
    return null;
  };

  // Fetch multiple users
  const fetchUsersForTransfers = async (transfersData) => {
    const userIds = new Set();
    transfersData.forEach(transfer => {
      if (transfer.fromUserId) userIds.add(transfer.fromUserId);
      if (transfer.toUserId) userIds.add(transfer.toUserId);
    });

    // Fetch all users in parallel
    const fetchPromises = Array.from(userIds).map(id => fetchUserById(id));
    await Promise.all(fetchPromises);
  };

  // Fetch deposits
  const fetchDeposits = async (page = 1) => {
    try {
      const response = await axiosInstance.get(`/deposits?page=${page}&limit=10`);
      if (response.data.success) {
        setDeposits(response.data.data.deposits);
        setDepositStats(response.data.data.summary);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching deposits:", error);
    }
  };

  // Fetch withdrawals
  const fetchWithdrawals = async () => {
    try {
      const response = await axiosInstance.get("/withdrawals");
      if (response.data.success) {
        setWithdrawals(response.data.data.withdrawals);
        setWithdrawalStats(response.data.data.summary);
      }
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      setWithdrawals([]);
      setWithdrawalStats({ totalWithdrawn: 0, totalWithdrawals: 0 });
    }
  };

  // Fetch transfers
  const fetchTransfers = async () => {
    try {
      const response = await axiosInstance.get("/transfers");
      if (response.data.success) {
        const transferData = response.data.data.transfers || [];
        setTransfers(transferData);
        
        // Fetch user details for all transfers
        await fetchUsersForTransfers(transferData);
        
        // Calculate transfer stats
        const totalTransferred = transferData.reduce((sum, t) => sum + (t.amount || 0), 0);
        setTransferStats({
          totalTransferred: totalTransferred,
          totalTransfers: transferData.length,
        });
      }
    } catch (error) {
      console.error("Error fetching transfers:", error);
      setTransfers([]);
      setTransferStats({ totalTransferred: 0, totalTransfers: 0 });
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchDeposits(),
        fetchWithdrawals(),
        fetchTransfers(),
      ]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  const getStatusBadge = (status, type = "deposit") => {
    const statusMap = {
      approved: { text: t('approved'), class: "bg-green-500/10 text-green-500", icon: <CheckCircle size={12} /> },
      pending: { text: t('pending'), class: "bg-amber-500/10 text-amber-500", icon: <Clock size={12} /> },
      rejected: { text: t('rejected'), class: "bg-red-500/10 text-red-500", icon: <AlertCircle size={12} /> },
      completed: { text: t('completed'), class: "bg-blue-500/10 text-blue-500", icon: <CheckCircle size={12} /> },
    };
    return statusMap[status] || { text: status || t('unknown'), class: "bg-primary/10 text-primary", icon: null };
  };

  const formatAmount = (amount) => {
    if (!amount && amount !== 0) return "৳0";
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount).replace('BDT', '৳');
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getPaymentIcon = (method) => {
    const icons = {
      bkash: <Smartphone size={16} />,
      nagad: <Smartphone size={16} />,
      bank: <Building size={16} />,
      rocket: <Smartphone size={16} />,
    };
    return icons[method?.toLowerCase()] || <Wallet size={16} />;
  };

  const getPaymentIconColor = (method) => {
    const colors = {
      bkash: "text-pink-600",
      nagad: "text-orange-500",
      bank: "text-blue-600",
      rocket: "text-purple-600",
    };
    return colors[method?.toLowerCase()] || "text-primary";
  };

  const getGoalIcon = (goalType) => {
    const icons = {
      wedding: "💒",
      education: "📚",
      travel: "✈️",
      hajj: "🕌",
      home: "🏠",
      business: "💼",
      emergency: "🚨",
      other: "🎯",
    };
    return icons[goalType?.toLowerCase()] || "🎯";
  };

  const getTransferIcon = (type) => {
    if (type === "goal_to_goal") {
      return <ArrowRightLeft size={16} />;
    }
    return <Send size={16} />;
  };

  const getTransferIconColor = (type) => {
    if (type === "goal_to_goal") {
      return "text-purple-500";
    }
    return "text-blue-500";
  };

  const getTransferTypeLabel = (type) => {
    if (type === "goal_to_goal") {
      return "Goal → Goal";
    }
    return "User → User (P2P)";
  };

  // Get user name from cache or return null
  const getUserName = (userId) => {
    if (!userId) return null;
    const user = userCache[userId];
    if (user) {
      return user.name || user.fullName || user.firstName || t('unknownUser');
    }
    return null;
  };

  // Get user phone from cache
  const getUserPhone = (userId) => {
    if (!userId) return null;
    const user = userCache[userId];
    if (user) {
      return user.phone;
    }
    return null;
  };

  const getAllTransactions = () => {
    const depositTransactions = deposits.map(deposit => ({
      id: deposit._id,
      type: "deposit",
      icon: getPaymentIcon(deposit.paymentMethod),
      iconColor: getPaymentIconColor(deposit.paymentMethod),
      name: `${getGoalIcon(deposit.goalType)} ${deposit.goalName} — ${deposit.paymentMethod?.toUpperCase() || "N/A"}`,
      date: deposit.createdAt,
      amount: deposit.depositAmount,
      amountFormatted: `+${formatAmount(deposit.depositAmount)}`,
      status: deposit.status,
      badge: getStatusBadge(deposit.status).text,
      badgeClass: getStatusBadge(deposit.status).class,
      badgeIcon: getStatusBadge(deposit.status).icon,
      transactionId: deposit.transactionReference,
      screenshot: deposit.screenshot?.url,
      isTransfer: false,
    }));

    const withdrawalTransactions = withdrawals.map(withdrawal => ({
      id: withdrawal._id,
      type: "withdrawal",
      icon: <ArrowDown size={16} />,
      iconColor: "text-red-500",
      name: `${getGoalIcon(withdrawal.goalType)} ${withdrawal.goalName} — ${withdrawal.paymentMethod?.toUpperCase() || "N/A"}`,
      date: withdrawal.createdAt,
      amount: withdrawal.withdrawalAmount,
      amountFormatted: `-${formatAmount(withdrawal.withdrawalAmount)}`,
      status: withdrawal.status,
      badge: getStatusBadge(withdrawal.status, "withdrawal").text,
      badgeClass: getStatusBadge(withdrawal.status, "withdrawal").class,
      badgeIcon: getStatusBadge(withdrawal.status, "withdrawal").icon,
      transactionId: withdrawal.transactionId || withdrawal.transactionReference,
      reason: withdrawal.reason,
      isTransfer: false,
    }));

    const transferTransactions = transfers.map(transfer => {
      // Get user details from cache
      const fromUser = userCache[transfer.fromUserId];
      const toUser = userCache[transfer.toUserId];
      
      // Determine the display name based on transfer type
      let displayName = "";
      let fromDisplay = "";
      let toDisplay = "";
      let isIncoming = false;
      
      if (transfer.type === "goal_to_goal") {
        // Goal to Goal transfer
        fromDisplay = transfer.fromGoalName || 'Unknown Goal';
        toDisplay = transfer.toGoalName || 'Unknown Goal';
        displayName = `${getGoalIcon('other')} ${fromDisplay} → ${toDisplay}`;
      } else {
        // User to User (P2P) transfer
        const currentUserId = currentUser?._id;
        
        // Get user names from cache or use fallbacks
        const fromName = fromUser?.name || fromUser?.fullName || fromUser?.firstName || transfer.fromUserName || t('unknownUser');
        const toName = toUser?.name || toUser?.fullName || toUser?.firstName || transfer.toUserName || t('unknownUser');
        const fromPhone = fromUser?.phone || transfer.fromUserPhone;
        const toPhone = toUser?.phone || transfer.toUserPhone;
        
        // Check if current user is sender or receiver
        const isSender = transfer.fromUserId === currentUserId;
        const isReceiver = transfer.toUserId === currentUserId;
        
        if (isSender) {
          // User is the sender
          fromDisplay = t('you');
          toDisplay = toName || t('unknownUser');
          displayName = `${t('sentTo')} ${toDisplay}${toPhone ? ` (${toPhone})` : ''}`;
          isIncoming = false;
        } else if (isReceiver) {
          // User is the receiver
          fromDisplay = fromName || t('unknownUser');
          toDisplay = t('you');
          displayName = `${t('receivedFrom')} ${fromDisplay}${fromPhone ? ` (${fromPhone})` : ''}`;
          isIncoming = true;
        } else {
          // User is neither sender nor receiver (shouldn't happen for user's own transactions)
          fromDisplay = fromName || t('unknownUser');
          toDisplay = toName || t('unknownUser');
          displayName = `${fromDisplay} → ${toDisplay}`;
          isIncoming = false;
        }
      }

      return {
        id: transfer._id,
        type: "transfer",
        icon: getTransferIcon(transfer.type),
        iconColor: getTransferIconColor(transfer.type),
        name: displayName,
        date: transfer.createdAt,
        amount: transfer.amount,
        amountFormatted: transfer.type === "goal_to_goal" 
          ? `-${formatAmount(transfer.amount)}`
          : (transfer.fromUserId === currentUser?._id || transfer.fromUserId?.toString() === currentUser?._id?.toString()
              ? `-${formatAmount(transfer.amount)}`
              : `+${formatAmount(transfer.amount)}`),
        status: transfer.status,
        badge: getStatusBadge(transfer.status, "transfer").text,
        badgeClass: getStatusBadge(transfer.status, "transfer").class,
        badgeIcon: getStatusBadge(transfer.status, "transfer").icon,
        transactionId: transfer.referenceNumber || transfer.transactionId,
        note: transfer.note,
        from: fromDisplay,
        to: toDisplay,
        transferType: getTransferTypeLabel(transfer.type),
        isTransfer: true,
        isIncoming: isIncoming,
        fromUserId: transfer.fromUserId,
        toUserId: transfer.toUserId,
        fromUser: fromUser,
        toUser: toUser,
      };
    });

    const all = [...depositTransactions, ...withdrawalTransactions, ...transferTransactions];
    return all.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const filteredTransactions = () => {
    const all = getAllTransactions();
    if (activeTab === "all") return all;
    if (activeTab === "deposit") return all.filter(t => t.type === "deposit");
    if (activeTab === "withdrawal") return all.filter(t => t.type === "withdrawal");
    if (activeTab === "transfer") return all.filter(t => t.type === "transfer");
    return all;
  };

  const pendingDeposits = deposits.filter(d => d.status === "pending").length;
  const totalDeposited = depositStats.totalDeposited;
  const totalDepositCount = depositStats.totalDeposits;
  const totalWithdrawn = withdrawalStats.totalWithdrawn;
  const totalWithdrawalCount = withdrawalStats.totalWithdrawals;
  const totalTransferred = transferStats.totalTransferred;
  const totalTransferCount = transferStats.totalTransfers;
  const netSaved = totalDeposited - totalWithdrawn - totalTransferred;

  // Count transfers by type
  const goalToGoalCount = transfers.filter(t => t.type === "goal_to_goal").length;
  const userToUserCount = transfers.filter(t => t.type === "user_to_user").length;

  const stats = [
    { 
      icon: <ArrowUp size={20} />, 
      value: formatAmount(totalDeposited), 
      label: t('totalDeposit'), 
      color: "green",
      bg: "bg-primary/10"
    },
    { 
      icon: <Wallet size={20} />, 
      value: totalDepositCount.toString(), 
      label: t('totalDeposits'), 
      color: "blue",
      bg: "bg-blue-500/10"
    },
    { 
      icon: <Clock size={20} />, 
      value: pendingDeposits.toString(), 
      label: t('pendingDeposits'), 
      color: "warning",
      bg: "bg-amber-500/10"
    },
    { 
      icon: <ArrowDown size={20} />, 
      value: formatAmount(totalWithdrawn), 
      label: t('totalWithdrawn'), 
      color: "info",
      bg: "bg-red-500/10"
    },
    { 
      icon: <Send size={20} />, 
      value: formatAmount(totalTransferred), 
      label: t('totalTransferred'), 
      color: "purple",
      bg: "bg-purple-500/10"
    },
  ];

  const getStatBorderColor = (color) => {
    switch(color) {
      case "green": return "border-t-primary";
      case "blue": return "border-t-blue-500";
      case "warning": return "border-t-amber-500";
      case "info": return "border-t-red-500";
      case "purple": return "border-t-purple-500";
      default: return "border-t-primary";
    }
  };

  const getStatIconBg = (color) => {
    switch(color) {
      case "green": return "bg-primary/10 text-primary";
      case "blue": return "bg-blue-500/10 text-blue-500";
      case "warning": return "bg-amber-500/10 text-amber-500";
      case "info": return "bg-red-500/10 text-red-500";
      case "purple": return "bg-purple-500/10 text-purple-500";
      default: return "bg-primary/10 text-primary";
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">{t('loadingTransactions')}</p>
        </div>
      </div>
    );
  }

  const transactions = filteredTransactions();

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
        <Wallet size={28} className="text-primary" /> {t('pageTitle')}
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-card border border-border rounded-xl p-4 hover:shadow-lg transition border-t-4 ${getStatBorderColor(stat.color)}`}
          >
            <div className={`w-11 h-11 rounded-xl ${getStatIconBg(stat.color)} flex items-center justify-center mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Net Savings Card */}
      <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 border border-primary/20 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            <span className="font-semibold text-foreground">{t('netSavings')}</span>
          </div>
          <div className="text-2xl font-bold text-primary">{formatAmount(netSaved)}</div>
        </div>
        <div className="mt-2 h-1.5 bg-border rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
            style={{ width: `${totalDeposited > 0 ? (netSaved / totalDeposited) * 100 : 0}%` }}
          />
        </div>
      </div>

      {/* Transactions Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex gap-1 p-4 pb-0 border-b border-border flex-wrap">
          {[
            { id: "all", label: `${t('all')} (${getAllTransactions().length})`, icon: <Wallet size={14} /> },
            { id: "deposit", label: `${t('deposit')} (${getAllTransactions().filter(t => t.type === "deposit").length})`, icon: <ArrowUp size={14} /> },
            { id: "withdrawal", label: `${t('withdrawal')} (${getAllTransactions().filter(t => t.type === "withdrawal").length})`, icon: <ArrowDown size={14} /> },
            { id: "transfer", label: `${t('transfer')} (${getAllTransactions().filter(t => t.type === "transfer").length})`, icon: <Send size={14} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-t-lg text-sm font-semibold transition flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-foreground/60 hover:text-primary"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="p-4">
          {transactions.length === 0 ? (
            <div className="text-center py-12">
              <Wallet size={48} className="text-foreground/30 mx-auto mb-4" />
              <div className="text-foreground/50">{t('noTransactions')}</div>
            </div>
          ) : (
            <div className="space-y-3">
              {transactions.map((txn, idx) => (
                <motion.div
                  key={`${txn.id}-${idx}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="flex items-start gap-3 pb-3 border-b border-border last:border-0"
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center bg-primary/10 ${txn.iconColor}`}>
                    {txn.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground truncate" title={txn.name}>
                      {txn.name}
                    </div>
                    <div className="text-xs text-foreground/50 flex items-center gap-1">
                      <Calendar size={10} /> {formatDate(txn.date)}
                    </div>
                    
                    {/* Transfer specific details */}
                    {txn.isTransfer && (
                      <>
                        {txn.transferType && (
                          <div className="text-[10px] text-foreground/40 mt-0.5 flex items-center gap-1">
                            <ArrowRightLeft size={10} /> {txn.transferType}
                          </div>
                        )}
                        {/* Show from/to for goal-to-goal or P2P details */}
                        {txn.transferType === "Goal → Goal" ? (
                          <>
                            <div className="text-[10px] text-foreground/40 mt-0.5 flex items-center gap-1">
                              <Target size={10} /> {t('from')} {txn.from}
                            </div>
                            <div className="text-[10px] text-foreground/40 mt-0.5 flex items-center gap-1">
                              <Target size={10} /> {t('to')} {txn.to}
                            </div>
                          </>
                        ) : (
                          // P2P transfer - show recipient/sender info
                          <>
                            {txn.from && txn.from !== 'You' && txn.from !== t('you') && (
                              <div className="text-[10px] text-foreground/40 mt-0.5 flex items-center gap-1">
                                <User size={10} /> {t('from')} {txn.from}
                              </div>
                            )}
                            {txn.to && txn.to !== 'You' && txn.to !== t('you') && (
                              <div className="text-[10px] text-foreground/40 mt-0.5 flex items-center gap-1">
                                <User size={10} /> {t('to')} {txn.to}
                              </div>
                            )}
                            {/* Show if it's incoming or outgoing */}
                            {txn.isIncoming !== undefined && (
                              <div className={`text-[10px] mt-0.5 flex items-center gap-1 ${txn.isIncoming ? 'text-green-500' : 'text-red-500'}`}>
                                {txn.isIncoming ? '⬇️' : '⬆️'} {txn.isIncoming ? 'Received' : 'Sent'}
                              </div>
                            )}
                          </>
                        )}
                        {txn.note && (
                          <div className="text-[10px] text-foreground/40 mt-0.5 truncate">
                            {t('note')} {txn.note}
                          </div>
                        )}
                      </>
                    )}

                    {!txn.isTransfer && txn.transactionId && (
                      <div className="text-[10px] text-foreground/30 font-mono mt-0.5 flex items-center gap-1 truncate">
                        <Banknote size={10} /> {t('transactionId')} {txn.transactionId}
                      </div>
                    )}
                    {!txn.isTransfer && txn.reason && (
                      <div className="text-[10px] text-foreground/40 mt-0.5 truncate">
                        {t('reason')} {txn.reason}
                      </div>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${txn.badgeClass}`}>
                      {txn.badgeIcon}
                      {txn.badge}
                    </span>
                  </div>
                  <div className={`font-bold text-sm shrink-0 ${
                    txn.type === "deposit" 
                      ? "text-primary" 
                      : txn.type === "transfer"
                      ? txn.isIncoming ? "text-green-500" : "text-purple-500"
                      : "text-red-500"
                  }`}>
                    {txn.amountFormatted}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Pagination for deposits */}
        {activeTab === "deposit" && pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 p-4 border-t border-border">
            <button
              onClick={() => {
                fetchDeposits(pagination.currentPage - 1);
                setPagination({ ...pagination, currentPage: pagination.currentPage - 1 });
              }}
              disabled={pagination.currentPage === 1}
              className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
            >
              {t('previous')}
            </button>
            <span className="px-4 py-2 text-foreground">
              {t('page')} {pagination.currentPage} {t('of')} {pagination.totalPages}
            </span>
            <button
              onClick={() => {
                fetchDeposits(pagination.currentPage + 1);
                setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
              }}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
            >
              {t('next')}
            </button>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <ArrowUp size={16} className="text-primary" /> {t('depositSummary')}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('totalDepositsCount')}</span>
              <span className="font-semibold text-primary">{totalDepositCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('totalAmount')}</span>
              <span className="font-semibold text-primary">{formatAmount(totalDeposited)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('averageDeposit')}</span>
              <span className="font-semibold">
                {totalDepositCount > 0 
                  ? formatAmount(totalDeposited / totalDepositCount)
                  : formatAmount(0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('pendingApproval')}</span>
              <span className="font-semibold text-amber-500 flex items-center gap-1">
                <Clock size={12} /> {pendingDeposits}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <ArrowDown size={16} className="text-red-500" /> {t('withdrawalSummary')}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('totalWithdrawals')}</span>
              <span className="font-semibold text-red-500">{totalWithdrawalCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('totalAmountWithdrawn')}</span>
              <span className="font-semibold text-red-500">{formatAmount(totalWithdrawn)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('pendingWithdrawals')}</span>
              <span className="font-semibold text-amber-500 flex items-center gap-1">
                <Clock size={12} /> {withdrawals.filter(w => w.status === "pending").length}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Send size={16} className="text-purple-500" /> {t('transferSummary')}
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('totalTransfersCount')}</span>
              <span className="font-semibold text-purple-500">{totalTransferCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('totalTransferredAmount')}</span>
              <span className="font-semibold text-purple-500">{formatAmount(totalTransferred)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('goalToGoalTransfers')}</span>
              <span className="font-semibold">{goalToGoalCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('userToUserTransfers')}</span>
              <span className="font-semibold">{userToUserCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;