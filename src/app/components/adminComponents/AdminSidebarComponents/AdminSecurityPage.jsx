"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Clock,
  Server,
  Loader2,
} from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Page Title
    securityLogs: "🔐 Security Logs",
    
    // Stats
    uptime: "Uptime (30d)",
    failedLoginsToday: "Failed Logins (today)",
    suspiciousIPs: "Suspicious IPs",
    
    // Table
    recentSecurityEvents: "📋 Recent Security Events",
    time: "Time",
    event: "Event",
    ip: "IP",
    status: "Status",
    
    // Status
    danger: "Danger",
    success: "Success",
    warning: "Warning",
    info: "Info",
    
    // Messages
    failedToLoad: "Failed to load security events",
    noEvents: "No security events found",
    showing: "Showing",
    of: "of",
    previous: "Previous",
    next: "Next",
    page: "Page",
  },
  bn: {
    // Page Title
    securityLogs: "🔐 নিরাপত্তা লগ",
    
    // Stats
    uptime: "আপটাইম (৩০ দিন)",
    failedLoginsToday: "ব্যর্থ লগইন (আজ)",
    suspiciousIPs: "সন্দেহজনক আইপি",
    
    // Table
    recentSecurityEvents: "📋 সাম্প্রতিক নিরাপত্তা ইভেন্ট",
    time: "সময়",
    event: "ইভেন্ট",
    ip: "আইপি",
    status: "অবস্থা",
    
    // Status
    danger: "বিপজ্জনক",
    success: "সফল",
    warning: "সতর্কতা",
    info: "তথ্য",
    
    // Messages
    failedToLoad: "নিরাপত্তা ইভেন্ট লোড করতে ব্যর্থ হয়েছে",
    noEvents: "কোন নিরাপত্তা ইভেন্ট পাওয়া যায়নি",
    showing: "দেখানো হচ্ছে",
    of: "মোট",
    previous: "পূর্ববর্তী",
    next: "পরবর্তী",
    page: "পৃষ্ঠা",
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getInitialAdminLang = () => {
  if (typeof window === "undefined") return "bn";
  return localStorage.getItem("admin_lang") || "bn";
};

const AdminSecurityPage = () => {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [stats, setStats] = useState([]);
  const [securityEvents, setSecurityEvents] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState(getInitialAdminLang);

  // Translation function
  const t = useCallback((key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  }, [lang]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const fetchEvents = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const limit = pagination.itemsPerPage;
      const res = await axiosInstance.get(`/admin/security/events?page=${page}&limit=${limit}`, {
        headers: getAuthHeaders(),
      });
      if (res.data.success) {
        setSecurityEvents(res.data.data.events || []);
        setPagination(
          res.data.data.pagination || {
            currentPage: page,
            totalPages: 1,
            totalItems: 0,
            itemsPerPage: limit,
          },
        );
        const s = res.data.data.stats || {};
        setStats([
          {
            icon: "✅",
            value: s.uptime || "99.9%",
            label: t('uptime'),
            trend: s.uptimeTrend || "+99.9%",
            trendUp: true,
            bg: "bg-primary/10",
            iconBg: "bg-primary/10",
          },
          {
            icon: "🚫",
            value: String(s.failedLogins24h || 0),
            label: t('failedLoginsToday'),
            trend: s.failedLoginsTrend || "-12%",
            trendUp: false,
            bg: "bg-red-500/10",
            iconBg: "bg-red-500/10",
          },
          {
            icon: "⚠️",
            value: String(s.suspiciousIPs || 0),
            label: t('suspiciousIPs'),
            trend: null,
            bg: "bg-amber-500/10",
            iconBg: "bg-amber-500/10",
          },
        ]);
      }
    } catch (err) {
      showToast(err.response?.data?.message || t('failedToLoad'));
    } finally {
      setLoading(false);
    }
  }, [pagination.itemsPerPage, t]);

  useEffect(() => {
    queueMicrotask(() => {
      fetchEvents(1);
    });
  }, [fetchEvents]);

  const getStatusColor = (statusColor) => {
    switch (statusColor) {
      case "danger":
        return "text-red-500";
      case "success":
        return "text-primary";
      case "warning":
        return "text-amber-500";
      default:
        return "text-foreground";
    }
  };

  const getStatusTranslation = (status) => {
    const statusMap = {
      "danger": t('danger'),
      "success": t('success'),
      "warning": t('warning'),
      "info": t('info'),
    };
    return statusMap[status] || status;
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-5">
        {t('securityLogs')}
      </h2>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex justify-between items-start">
              <div
                className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center text-xl`}
              >
                {stat.icon}
              </div>
              {stat.trend && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
                >
                  {stat.trend}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">
              {stat.value}
            </div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Security Events Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="font-bold text-foreground">
            {t('recentSecurityEvents')}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-125">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('time')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('event')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('ip')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('status')}
                </th>
              </tr>
            </thead>
            <tbody>
              {securityEvents.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-sm text-foreground/50">
                    {t('noEvents')}
                  </td>
                </tr>
              ) : (
                securityEvents.map((event, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border last:border-0 hover:bg-primary/5 transition"
                  >
                    <td className="px-4 py-3 text-sm text-foreground">
                      {event.time || new Date(event.createdAt).toLocaleTimeString(
                        lang === 'bn' ? 'bn-BD' : 'en-US'
                      )}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {event.event}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono text-foreground/70">
                      {event.ip}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-sm font-bold ${getStatusColor(event.statusColor)}`}
                      >
                        {getStatusTranslation(event.status)}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="mt-4 bg-card border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs sm:text-sm text-foreground/60">
            {t('showing')} {securityEvents.length} {t('of')} {pagination.totalItems}
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => fetchEvents(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1 || loading}
              className="px-3 py-1.5 rounded-lg border border-border text-xs sm:text-sm font-semibold hover:border-primary/50 hover:bg-primary/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('previous')}
            </button>
            <span className="text-xs sm:text-sm text-foreground/70 px-2">
              {t('page')} {pagination.currentPage} / {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchEvents(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages || loading}
              className="px-3 py-1.5 rounded-lg border border-border text-xs sm:text-sm font-semibold hover:border-primary/50 hover:bg-primary/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {t('next')}
            </button>
          </div>
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
};

export default AdminSecurityPage;