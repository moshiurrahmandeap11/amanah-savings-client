"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Loader2, Wallet, TrendingUp, Clock, ArrowUp, ArrowDown, Banknote, Calendar, CheckCircle, AlertCircle, Target, Smartphone, Building } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

const TransactionsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [deposits, setDeposits] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [depositStats, setDepositStats] = useState({
    totalDeposited: 0,
    totalDeposits: 0,
  });
  const [withdrawalStats, setWithdrawalStats] = useState({
    totalWithdrawn: 0,
    totalWithdrawals: 0,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  });

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

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      await Promise.all([
        fetchDeposits(),
        fetchWithdrawals(),
      ]);
      setLoading(false);
    };
    fetchAllData();
  }, []);

  const getStatusBadge = (status, type = "deposit") => {
    switch(status) {
      case "approved":
        return { text: "Approved", class: "bg-green-500/10 text-green-500", icon: <CheckCircle size={12} /> };
      case "pending":
        return { text: "Pending", class: "bg-amber-500/10 text-amber-500", icon: <Clock size={12} /> };
      case "rejected":
        return { text: "Rejected", class: "bg-red-500/10 text-red-500", icon: <AlertCircle size={12} /> };
      case "completed":
        return { text: "Completed", class: "bg-blue-500/10 text-blue-500", icon: <CheckCircle size={12} /> };
      default:
        return { text: status || "Unknown", class: "bg-primary/10 text-primary", icon: null };
    }
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
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
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

  const getApprovedDepositsTotal = () => {
    return deposits
      .filter(d => d.status === "approved")
      .reduce((sum, d) => sum + (d.depositAmount || 0), 0);
  };

  const getApprovedWithdrawalsTotal = () => {
    return withdrawals
      .filter(w => w.status === "completed" || w.status === "approved")
      .reduce((sum, w) => sum + (w.withdrawalAmount || 0), 0);
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
    }));

    const all = [...depositTransactions, ...withdrawalTransactions];
    return all.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const filteredTransactions = () => {
    const all = getAllTransactions();
    if (activeTab === "all") return all;
    if (activeTab === "deposit") return all.filter(t => t.type === "deposit");
    if (activeTab === "withdrawal") return all.filter(t => t.type === "withdrawal");
    return all;
  };

  const pendingDeposits = deposits.filter(d => d.status === "pending").length;
  const totalDeposited = depositStats.totalDeposited;
  const totalDepositCount = depositStats.totalDeposits;
  const totalWithdrawn = withdrawalStats.totalWithdrawn;
  const totalWithdrawalCount = withdrawalStats.totalWithdrawals;
  const netSaved = totalDeposited - totalWithdrawn;

  const stats = [
    { 
      icon: <ArrowUp size={20} />, 
      value: formatAmount(totalDeposited), 
      label: "Total Deposit", 
      color: "green",
      bg: "bg-primary/10"
    },
    { 
      icon: <Wallet size={20} />, 
      value: totalDepositCount.toString(), 
      label: "Total Deposits", 
      color: "blue",
      bg: "bg-blue-500/10"
    },
    { 
      icon: <Clock size={20} />, 
      value: pendingDeposits.toString(), 
      label: "Pending Deposits", 
      color: "warning",
      bg: "bg-amber-500/10"
    },
    { 
      icon: <ArrowDown size={20} />, 
      value: formatAmount(totalWithdrawn), 
      label: "Total Withdrawn", 
      color: "info",
      bg: "bg-red-500/10"
    },
  ];

  const getStatBorderColor = (color) => {
    switch(color) {
      case "green": return "border-t-primary";
      case "blue": return "border-t-blue-500";
      case "warning": return "border-t-amber-500";
      case "info": return "border-t-red-500";
      default: return "border-t-primary";
    }
  };

  const getStatIconBg = (color) => {
    switch(color) {
      case "green": return "bg-primary/10 text-primary";
      case "blue": return "bg-blue-500/10 text-blue-500";
      case "warning": return "bg-amber-500/10 text-amber-500";
      case "info": return "bg-red-500/10 text-red-500";
      default: return "bg-primary/10 text-primary";
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading transactions...</p>
        </div>
      </div>
    );
  }

  const transactions = filteredTransactions();

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5 flex items-center gap-2">
        <Wallet size={28} className="text-primary" /> Transaction History
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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
            <span className="font-semibold text-foreground">Net Savings</span>
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
            { id: "all", label: `All (${getAllTransactions().length})`, icon: <Wallet size={14} /> },
            { id: "deposit", label: `Deposit (${getAllTransactions().filter(t => t.type === "deposit").length})`, icon: <ArrowUp size={14} /> },
            { id: "withdrawal", label: `Withdrawal (${getAllTransactions().filter(t => t.type === "withdrawal").length})`, icon: <ArrowDown size={14} /> },
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
              <div className="text-foreground/50">No transactions found</div>
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
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">{txn.name}</div>
                    <div className="text-xs text-foreground/50 flex items-center gap-1">
                      <Calendar size={10} /> {formatDate(txn.date)}
                    </div>
                    {txn.transactionId && (
                      <div className="text-[10px] text-foreground/30 font-mono mt-0.5 flex items-center gap-1">
                        <Banknote size={10} /> ID: {txn.transactionId}
                      </div>
                    )}
                    {txn.reason && (
                      <div className="text-[10px] text-foreground/40 mt-0.5">
                        Reason: {txn.reason}
                      </div>
                    )}
                    <span className={`text-xs px-2 py-0.5 rounded-full inline-flex items-center gap-1 mt-1 ${txn.badgeClass}`}>
                      {txn.badgeIcon}
                      {txn.badge}
                    </span>
                  </div>
                  <div className={`font-bold text-sm ${
                    txn.type === "deposit" 
                      ? "text-primary" 
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
              Previous
            </button>
            <span className="px-4 py-2 text-foreground">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => {
                fetchDeposits(pagination.currentPage + 1);
                setPagination({ ...pagination, currentPage: pagination.currentPage + 1 });
              }}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Summary Section */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <ArrowUp size={16} className="text-primary" /> Deposit Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Total Deposits:</span>
              <span className="font-semibold text-primary">{totalDepositCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Total Amount:</span>
              <span className="font-semibold text-primary">{formatAmount(totalDeposited)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Average Deposit:</span>
              <span className="font-semibold">
                {totalDepositCount > 0 
                  ? formatAmount(totalDeposited / totalDepositCount)
                  : formatAmount(0)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Pending Approval:</span>
              <span className="font-semibold text-amber-500 flex items-center gap-1">
                <Clock size={12} /> {pendingDeposits}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <ArrowDown size={16} className="text-red-500" /> Withdrawal Summary
          </h3>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Total Withdrawals:</span>
              <span className="font-semibold text-red-500">{totalWithdrawalCount}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Total Amount:</span>
              <span className="font-semibold text-red-500">{formatAmount(totalWithdrawn)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Pending Withdrawals:</span>
              <span className="font-semibold text-amber-500 flex items-center gap-1">
                <Clock size={12} /> {withdrawals.filter(w => w.status === "pending").length}
              </span>
            </div>
            <div className="flex justify-between text-sm border-t border-border pt-2 mt-2">
              <span className="text-foreground/60 font-semibold">Net Saved:</span>
              <span className="font-semibold text-primary text-base">{formatAmount(netSaved)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;