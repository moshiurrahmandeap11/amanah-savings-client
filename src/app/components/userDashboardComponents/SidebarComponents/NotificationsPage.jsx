// app/dashboard/notifications/page.jsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Settings,
  CheckCircle,
  Bell,
  Loader2,
  Trash2,
  ArrowRight,
  Wallet,
  TrendingUp,
  Send,
  X,
  ArrowDown,
  Building,
  Smartphone,
  Calendar,
  Hash,
  AlertCircle,
  Clock,
  Check,
  Banknote,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

// Translations
const translations = {
  en: {
    pageTitle: "Notifications",
    new: "new",
    markAllAsRead: "Mark all as read",
    depositNow: "Deposit Now",
    viewDetails: "View Details",
    previous: "Previous",
    next: "Next",
    all: "All",
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    transfer: "Transfer",
    streak: "Streak",
    bonus: "Bonus",
    achievement: "Achievement",
    noNotifications: "No notifications",
    allCaughtUp: "You're all caught up!",
    markAllReadTitle: "Mark all as read?",
    markAllReadText: "This will mark all your notifications as read.",
    confirmMarkAll: "Yes, mark all",
    markAllSuccess: "All notifications marked as read",
    markAllError: "Failed to mark notifications as read",
    deleteTitle: "Delete notification?",
    deleteText: "This action cannot be undone.",
    confirmDelete: "Yes, delete",
    deleteSuccess: "Notification deleted",
    deleteError: "Failed to delete notification",
    loading: "Loading...",
    pageOf: "Page {current} of {total}",
    success: "Success!",
    error: "Error!",
    markedAsRead: "Marked as read",
    // Withdrawal Modal
    withdrawalDetails: "Withdrawal Details",
    amount: "Amount",
    goal: "Goal",
    method: "Method",
    reason: "Reason",
    status: "Status",
    date: "Date",
    transactionId: "Transaction ID",
    phoneNumber: "Phone Number",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    accountHolder: "Account Holder",
    paymentDetails: "Payment Details",
    rejectionReason: "Rejection Reason",
    remarks: "Remarks",
    close: "Close",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    completed: "Completed",
  },
  bn: {
    pageTitle: "বিজ্ঞপ্তি",
    new: "নতুন",
    markAllAsRead: "সব পঠিত হিসেবে চিহ্নিত করুন",
    depositNow: "এখনই জমা দিন",
    viewDetails: "বিস্তারিত দেখুন",
    previous: "পূর্ববর্তী",
    next: "পরবর্তী",
    all: "সব",
    deposit: "জমা",
    withdrawal: "উত্তোলন",
    transfer: "স্থানান্তর",
    streak: "স্ট্রিক",
    bonus: "বোনাস",
    achievement: "অর্জন",
    noNotifications: "কোন বিজ্ঞপ্তি নেই",
    allCaughtUp: "আপনি সব আপডেট পড়েছেন!",
    markAllReadTitle: "সব পঠিত হিসেবে চিহ্নিত করবেন?",
    markAllReadText: "এটি আপনার সব বিজ্ঞপ্তি পঠিত হিসেবে চিহ্নিত করবে।",
    confirmMarkAll: "হ্যাঁ, সব চিহ্নিত করুন",
    markAllSuccess: "সব বিজ্ঞপ্তি পঠিত হিসেবে চিহ্নিত করা হয়েছে",
    markAllError: "বিজ্ঞপ্তি পঠিত হিসেবে চিহ্নিত করতে ব্যর্থ হয়েছে",
    deleteTitle: "বিজ্ঞপ্তি মুছে ফেলবেন?",
    deleteText: "এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।",
    confirmDelete: "হ্যাঁ, মুছে ফেলুন",
    deleteSuccess: "বিজ্ঞপ্তি মুছে ফেলা হয়েছে",
    deleteError: "বিজ্ঞপ্তি মুছে ফেলতে ব্যর্থ হয়েছে",
    loading: "লোড হচ্ছে...",
    pageOf: "পৃষ্ঠা {current} / {total}",
    success: "সফল!",
    error: "ত্রুটি!",
    markedAsRead: "পঠিত হিসেবে চিহ্নিত করা হয়েছে",
    // Withdrawal Modal
    withdrawalDetails: "উত্তোলনের বিবরণ",
    amount: "পরিমাণ",
    goal: "গোল",
    method: "পদ্ধতি",
    reason: "কারণ",
    status: "স্ট্যাটাস",
    date: "তারিখ",
    transactionId: "লেনদেন আইডি",
    phoneNumber: "ফোন নম্বর",
    bankName: "ব্যাংকের নাম",
    accountNumber: "অ্যাকাউন্ট নম্বর",
    accountHolder: "অ্যাকাউন্ট ধারক",
    paymentDetails: "পেমেন্ট বিবরণ",
    rejectionReason: "বাতিলের কারণ",
    remarks: "মন্তব্য",
    close: "বন্ধ করুন",
    pending: "পেন্ডিং",
    approved: "অনুমোদিত",
    rejected: "প্রত্যাখ্যাত",
    completed: "সম্পন্ন",
  }
};

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [lang, setLang] = useState("en");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });
  // Withdrawal detail modal state
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);
  const [withdrawalLoading, setWithdrawalLoading] = useState(false);

  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
  }, []);

  const fetchNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const url = `/notifications?page=${page}&limit=20${activeTab !== "all" ? `&type=${activeTab}` : ""}`;
      const response = await axiosInstance.get(url);
      if (response.data.success) {
        setNotifications(response.data.data.notifications);
        setUnreadCount(response.data.data.unreadCount);
        setCounts(response.data.data.counts);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error("Fetch notifications error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [activeTab]);

  const markAsRead = async (id) => {
    try {
      await axiosInstance.put(`/notifications/${id}/read`);
      fetchNotifications(pagination.currentPage);
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const result = await Swal.fire({
        title: t('markAllReadTitle'),
        text: t('markAllReadText'),
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#059669",
        cancelButtonColor: "#d33",
        confirmButtonText: t('confirmMarkAll'),
      });

      if (result.isConfirmed) {
        await axiosInstance.put("/notifications/read-all");
        Swal.fire({
          title: t('success'),
          text: t('markAllSuccess'),
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchNotifications();
      }
    } catch (error) {
      console.error("Mark all as read error:", error);
      Swal.fire({
        title: t('error'),
        text: t('markAllError'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  const deleteNotification = async (id, e) => {
    e.stopPropagation();
    try {
      const result = await Swal.fire({
        title: t('deleteTitle'),
        text: t('deleteText'),
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: t('confirmDelete'),
      });

      if (result.isConfirmed) {
        await axiosInstance.delete(`/notifications/${id}`);
        Swal.fire({
          title: t('success'),
          text: t('deleteSuccess'),
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchNotifications();
      }
    } catch (error) {
      console.error("Delete notification error:", error);
      Swal.fire({
        title: t('error'),
        text: t('deleteError'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  // Fetch withdrawal details and open modal
  const openWithdrawalModal = async (notif) => {
    const withdrawalId = notif?.actionData?.withdrawalId || notif?.metadata?.withdrawalId;
    if (!withdrawalId) {
      // Fallback: try to extract from message or use notification data
      setSelectedWithdrawal({
        title: notif.title,
        message: notif.message,
        amount: notif.metadata?.amount,
        goalName: notif.metadata?.goalName,
        status: notif.metadata?.status,
        createdAt: notif.createdAt,
        remarks: notif.metadata?.remarks || notif.message,
      });
      setShowWithdrawalModal(true);
      if (!notif.read) markAsRead(notif._id);
      return;
    }

    setWithdrawalLoading(true);
    setShowWithdrawalModal(true);
    if (!notif.read) markAsRead(notif._id);

    try {
      const response = await axiosInstance.get(`/withdrawals`);
      if (response.data.success) {
        const withdrawals = response.data.data || [];
        const withdrawal = withdrawals.find(w => w._id === withdrawalId || w._id?.toString() === withdrawalId?.toString());
        if (withdrawal) {
          setSelectedWithdrawal(withdrawal);
        } else {
          // Fallback to notification data
          setSelectedWithdrawal({
            title: notif.title,
            message: notif.message,
            amount: notif.metadata?.amount,
            goalName: notif.metadata?.goalName,
            status: notif.metadata?.status,
            createdAt: notif.createdAt,
            remarks: notif.metadata?.remarks,
            _id: withdrawalId,
          });
        }
      }
    } catch (error) {
      console.error("Fetch withdrawal details error:", error);
      setSelectedWithdrawal({
        title: notif.title,
        message: notif.message,
        amount: notif.metadata?.amount,
        goalName: notif.metadata?.goalName,
        status: notif.metadata?.status,
        createdAt: notif.createdAt,
        remarks: notif.metadata?.remarks,
        _id: withdrawalId,
      });
    } finally {
      setWithdrawalLoading(false);
    }
  };

  const closeWithdrawalModal = () => {
    setShowWithdrawalModal(false);
    setSelectedWithdrawal(null);
  };

  const formatAmount = (amount) => {
    return `৳${Number(amount || 0).toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleString(lang === 'bn' ? 'bn-BD' : 'en-US', {
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
    switch(status) {
      case "pending":
        return { icon: <Clock size={14} />, text: t('pending'), color: "text-amber-500 bg-amber-500/10", border: "border-amber-500/20" };
      case "approved":
        return { icon: <Check size={14} />, text: t('approved'), color: "text-green-500 bg-green-500/10", border: "border-green-500/20" };
      case "rejected":
        return { icon: <AlertCircle size={14} />, text: t('rejected'), color: "text-red-500 bg-red-500/10", border: "border-red-500/20" };
      case "completed":
        return { icon: <CheckCircle size={14} />, text: t('completed'), color: "text-blue-500 bg-blue-500/10", border: "border-blue-500/20" };
      default:
        return { icon: <AlertCircle size={14} />, text: status || "Unknown", color: "text-gray-500 bg-gray-500/10", border: "border-gray-500/20" };
    }
  };

  const getPaymentMethodIcon = (method) => {
    if (method === "bank") return <Building size={14} className="text-blue-500" />;
    if (method === "bkash") return <Smartphone size={14} className="text-pink-500" />;
    if (method === "nagad") return <Smartphone size={14} className="text-orange-500" />;
    return <Banknote size={14} className="text-gray-500" />;
  };

  const tabs = [
    { id: "all", label: t('all'), count: counts.all || 0 },
    { id: "deposit", label: t('deposit'), count: counts.deposit || 0 },
    { id: "withdrawal", label: t('withdrawal'), count: counts.withdrawal || 0 },
    { id: "transfer", label: t('transfer'), count: counts.transfer || 0 },
    { id: "streak", label: t('streak'), count: counts.streak || 0 },
    { id: "bonus", label: t('bonus'), count: counts.bonus || 0 },
    { id: "achievement", label: t('achievement'), count: counts.achievement || 0 },
  ];

  const getActionButton = (notif) => {
    if (notif.actionType === "deposit") {
      return (
        <Link href="/dashboard/deposit" className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold hover:opacity-90 transition">
          {t('depositNow')}
        </Link>
      );
    } else if (notif.actionType === "transfer") {
      return (
        <Link href="/dashboard/transfer" className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs font-semibold hover:opacity-90 transition">
          View Transfer
        </Link>
      );
    } else if (notif.actionType === "withdrawal") {
      return (
        <button
          onClick={(e) => {
            e.stopPropagation();
            openWithdrawalModal(notif);
          }}
          className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold hover:opacity-90 transition"
        >
          {t('viewDetails')}
        </button>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Bell size={24} /> {t('pageTitle')}
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs">
              {unreadCount} {t('new')}
            </span>
          )}
        </h2>
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 rounded-lg bg-primary/15 text-primary border border-primary/30 text-sm font-semibold hover:bg-primary/25 transition flex items-center gap-2"
            >
              <CheckCircle size={14} /> {t('markAllAsRead')}
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-background rounded-xl p-1 border border-border mb-5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-md"
                : "text-foreground/60 hover:text-primary"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-primary/20 text-primary"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <div className="text-6xl mb-3">🔔</div>
              <div className="font-bold text-foreground mb-1">{t('noNotifications')}</div>
              <div className="text-sm text-foreground/50">
                {t('allCaughtUp')}
              </div>
            </div>
          ) : (
            notifications.map((notif, idx) => (
              <motion.div
                key={notif._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => !notif.read && markAsRead(notif._id)}
                className={`rounded-xl p-4 cursor-pointer transition-all ${
                  !notif.read
                    ? "bg-card border-l-4 border-primary border"
                    : "bg-card border border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${notif.color || "bg-primary/15"} flex items-center justify-center text-xl shrink-0`}
                  >
                    {notif.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-foreground mb-1">
                      {notif.title}
                    </div>
                    <div
                      className="text-sm text-foreground/60 leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: notif.message }}
                    />
                    {getActionButton(notif) && (
                      <div className="mt-2">
                        {getActionButton(notif)}
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className={`text-xs font-semibold ${notif.timeColor || "text-primary"}`}>
                        {notif.icon} {notif.badge} · {notif.timeAgo}
                      </div>
                      <button
                        onClick={(e) => deleteNotification(notif._id, e)}
                        className="text-foreground/30 hover:text-red-500 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => fetchNotifications(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
          >
            {t('previous')}
          </button>
          <span className="px-4 py-2 text-foreground">
            {t('pageOf', { current: pagination.currentPage, total: pagination.totalPages })}
          </span>
          <button
            onClick={() => fetchNotifications(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
          >
            {t('next')}
          </button>
        </div>
      )}

      {/* Withdrawal Details Modal */}
      <AnimatePresence>
        {showWithdrawalModal && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeWithdrawalModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-4 rounded-t-2xl flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-foreground flex items-center gap-2">
                    <ArrowDown size={20} className="text-red-500" />
                    {t('withdrawalDetails')}
                  </h3>
                </div>
                <button
                  onClick={closeWithdrawalModal}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-5 space-y-4">
                {withdrawalLoading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 size={32} className="animate-spin text-primary" />
                  </div>
                ) : selectedWithdrawal ? (
                  <>
                    {/* Status Badge */}
                    <div className="flex justify-center">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 ${getStatusBadge(selectedWithdrawal.status).color} border ${getStatusBadge(selectedWithdrawal.status).border}`}>
                        {getStatusBadge(selectedWithdrawal.status).icon}
                        {getStatusBadge(selectedWithdrawal.status).text}
                      </span>
                    </div>

                    {/* Amount */}
                    <div className="bg-background rounded-xl p-4 text-center">
                      <div className="text-[10px] text-foreground/50 mb-1">{t('amount')}</div>
                      <div className="text-2xl font-bold text-red-500">
                        -{formatAmount(selectedWithdrawal.withdrawalAmount || selectedWithdrawal.amount)}
                      </div>
                    </div>

                    {/* Details Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-background rounded-xl p-3">
                        <div className="text-[10px] text-foreground/50">{t('goal')}</div>
                        <div className="font-semibold text-foreground text-sm">
                          {selectedWithdrawal.goalName || "N/A"}
                        </div>
                      </div>
                      <div className="bg-background rounded-xl p-3">
                        <div className="text-[10px] text-foreground/50">{t('method')}</div>
                        <div className="font-semibold text-foreground text-sm flex items-center gap-1">
                          {getPaymentMethodIcon(selectedWithdrawal.paymentMethod)}
                          {selectedWithdrawal.paymentMethod?.toUpperCase() || "N/A"}
                        </div>
                      </div>
                      <div className="bg-background rounded-xl p-3">
                        <div className="text-[10px] text-foreground/50">{t('reason')}</div>
                        <div className="font-semibold text-foreground text-sm">
                          {selectedWithdrawal.reason || "—"}
                        </div>
                      </div>
                      <div className="bg-background rounded-xl p-3">
                        <div className="text-[10px] text-foreground/50">{t('date')}</div>
                        <div className="font-semibold text-foreground text-sm flex items-center gap-1">
                          <Calendar size={12} className="text-foreground/50" />
                          {formatDate(selectedWithdrawal.createdAt)}
                        </div>
                      </div>
                    </div>

                    {/* Payment Details */}
                    {selectedWithdrawal.paymentDetails && (
                      <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/30 rounded-xl p-4">
                        <div className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                          <Banknote size={16} className="text-blue-500" />
                          {t('paymentDetails')}
                        </div>
                        <div className="space-y-2 text-sm">
                          {selectedWithdrawal.paymentMethod === "bkash" || selectedWithdrawal.paymentMethod === "nagad" ? (
                            <div className="flex justify-between">
                              <span className="text-foreground/50">{t('phoneNumber')}</span>
                              <span className="font-semibold text-foreground">
                                {selectedWithdrawal.paymentDetails?.phoneNumber || selectedWithdrawal.phoneNumber || "N/A"}
                              </span>
                            </div>
                          ) : selectedWithdrawal.paymentMethod === "bank" ? (
                            <>
                              <div className="flex justify-between">
                                <span className="text-foreground/50">{t('bankName')}</span>
                                <span className="font-semibold text-foreground">{selectedWithdrawal.paymentDetails?.bankName || "N/A"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/50">{t('accountNumber')}</span>
                                <span className="font-semibold text-foreground">{selectedWithdrawal.paymentDetails?.accountNumber || "N/A"}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-foreground/50">{t('accountHolder')}</span>
                                <span className="font-semibold text-foreground">{selectedWithdrawal.paymentDetails?.accountHolderName || "N/A"}</span>
                              </div>
                            </>
                          ) : null}
                        </div>
                      </div>
                    )}

                    {/* Rejection Reason / Remarks */}
                    {(selectedWithdrawal.remarks || selectedWithdrawal.message) && (
                      <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800/30 rounded-xl p-4">
                        <div className="text-xs font-semibold text-red-500 mb-1 flex items-center gap-1">
                          <AlertCircle size={14} />
                          {t('rejectionReason')}
                        </div>
                        <div className="text-sm text-foreground">
                          {selectedWithdrawal.remarks || (typeof selectedWithdrawal.message === 'string' ? selectedWithdrawal.message.replace(/<[^>]*>/g, '') : '')}
                        </div>
                      </div>
                    )}

                    {/* Transaction ID */}
                    {selectedWithdrawal._id && (
                      <div className="bg-background rounded-xl p-3">
                        <div className="text-[10px] text-foreground/50">{t('transactionId')}</div>
                        <div className="font-mono text-xs text-foreground/70 break-all">
                          {selectedWithdrawal._id}
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-8 text-foreground/50">
                    No details available
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4 rounded-b-2xl">
                <button
                  onClick={closeWithdrawalModal}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition"
                >
                  {t('close')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationsPage;
