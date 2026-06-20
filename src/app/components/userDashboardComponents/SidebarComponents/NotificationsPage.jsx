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
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

// Translations
const translations = {
  en: {
    // Page Title
    pageTitle: "Notifications",
    new: "new",
    
    // Buttons
    markAllAsRead: "Mark all as read",
    depositNow: "Deposit Now",
    viewDetails: "View Details",
    previous: "Previous",
    next: "Next",
    
    // Tabs
    all: "All",
    deposit: "Deposit",
    withdrawal: "Withdrawal",
    transfer: "Transfer",
    streak: "Streak",
    bonus: "Bonus",
    achievement: "Achievement",
    
    // Empty State
    noNotifications: "No notifications",
    allCaughtUp: "You're all caught up!",
    
    // Modals
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
    
    // Loading
    loading: "Loading...",
    
    // Pagination
    pageOf: "Page {current} of {total}",
    
    // Toast
    success: "Success!",
    error: "Error!",
    markedAsRead: "Marked as read",
  },
  bn: {
    // Page Title
    pageTitle: "বিজ্ঞপ্তি",
    new: "নতুন",
    
    // Buttons
    markAllAsRead: "সব পঠিত হিসেবে চিহ্নিত করুন",
    depositNow: "এখনই জমা দিন",
    viewDetails: "বিস্তারিত দেখুন",
    previous: "পূর্ববর্তী",
    next: "পরবর্তী",
    
    // Tabs
    all: "সব",
    deposit: "জমা",
    withdrawal: "উত্তোলন",
    transfer: "স্থানান্তর",
    streak: "স্ট্রিক",
    bonus: "বোনাস",
    achievement: "অর্জন",
    
    // Empty State
    noNotifications: "কোন বিজ্ঞপ্তি নেই",
    allCaughtUp: "আপনি সব আপডেট পড়েছেন!",
    
    // Modals
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
    
    // Loading
    loading: "লোড হচ্ছে...",
    
    // Pagination
    pageOf: "পৃষ্ঠা {current} / {total}",
    
    // Toast
    success: "সফল!",
    error: "ত্রুটি!",
    markedAsRead: "পঠিত হিসেবে চিহ্নিত করা হয়েছে",
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

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
  }, []);

  // Fetch notifications
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
        <Link href="/dashboard/withdraw" className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold hover:opacity-90 transition">
          View Withdrawal
        </Link>
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
    </div>
  );
};

export default NotificationsPage;