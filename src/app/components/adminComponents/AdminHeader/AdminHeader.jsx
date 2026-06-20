// src/app/components/adminComponents/AdminHeader/AdminHeader.jsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Moon,
  Sun,
  Bell,
  AlertTriangle,
  Globe,
  Menu,
} from "lucide-react";
import Link from "next/link";
import useSocket from "../../../hooks/useSocket";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";
import LanguageSwitcher from "../../shared/LanguageSwitcher";

// Translations
const translations = {
  en: {
    adminDashboard: "Admin Dashboard",
    fraudAlerts: "Fraud Alerts",
    notifications: "Notifications",
    noAlerts: "No Alerts",
    themeToggle: "Theme",
    adminAvatar: "Admin",
    // Days
    sunday: "Sunday",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    // Months
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  },
  bn: {
    adminDashboard: "অ্যাডমিন ড্যাশবোর্ড",
    fraudAlerts: "জালিয়াতি সতর্কতা",
    notifications: "বিজ্ঞপ্তি",
    noAlerts: "কোন সতর্কতা নেই",
    themeToggle: "থিম",
    adminAvatar: "অ্যাডমিন",
    // Days
    sunday: "রবিবার",
    monday: "সোমবার",
    tuesday: "মঙ্গলবার",
    wednesday: "বুধবার",
    thursday: "বৃহস্পতিবার",
    friday: "শুক্রবার",
    saturday: "শনিবার",
    // Months
    january: "জানুয়ারি",
    february: "ফেব্রুয়ারি",
    march: "মার্চ",
    april: "এপ্রিল",
    may: "মে",
    june: "জুন",
    july: "জুলাই",
    august: "আগস্ট",
    september: "সেপ্টেম্বর",
    october: "অক্টোবর",
    november: "নভেম্বর",
    december: "ডিসেম্বর",
  }
};

const AdminHeader = ({ openSidebar, toggleTheme, isDark }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentLang, setCurrentLang] = useState("en");
  const [fraudCount, setFraudCount] = useState(0);
  const [currentAdminId, setCurrentAdminId] = useState(null);
  
  // Get admin user ID
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setCurrentAdminId(parsed._id || parsed.id);
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
  }, []);

  // Translation function
  const t = (key) => {
    return translations[currentLang]?.[key] || translations.en[key] || key;
  };

  // Socket for real-time alerts
  const { 
    notifications: adminNotifications = [], 
    isConnected 
  } = useSocket(currentAdminId, "admin");
  
  const [alertCount, setAlertCount] = useState(0);

  // Safely handle notifications
  useEffect(() => {
    // Ensure adminNotifications is an array before accessing length
    if (adminNotifications && Array.isArray(adminNotifications)) {
      const unreadCount = adminNotifications.filter(n => !n.read).length;
      setAlertCount(unreadCount);
    } else {
      setAlertCount(0);
    }
  }, [adminNotifications]);

  // Fetch real fraud count
  useEffect(() => {
    const fetchFraudCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        
        const res = await axiosInstance.get("/admin/fraud/alerts", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        if (res.data.success && res.data.data?.alerts) {
          const highRiskCount = res.data.data.alerts.filter(
            (a) => a.severity === "high" || a.severity === "danger"
          ).length;
          setFraudCount(highRiskCount);
        }
      } catch (err) {
        console.error("Fraud alerts fetch error:", err);
      }
    };
    fetchFraudCount();
  }, []);

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "en";
    setCurrentLang(savedLang);
  }, []);

  useEffect(() => {
    const now = new Date();
    const days = [
      t('sunday'), t('monday'), t('tuesday'), t('wednesday'),
      t('thursday'), t('friday'), t('saturday'),
    ];
    const months = [
      t('january'), t('february'), t('march'), t('april'),
      t('may'), t('june'), t('july'), t('august'),
      t('september'), t('october'), t('november'), t('december'),
    ];
    const formattedDate = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, [currentLang]);

  return (
    <header className="sticky top-0 z-40 bg-card border-b border-border">
      <div className="px-4 sm:px-6 py-3 flex items-center justify-between gap-3 flex-wrap">
        {/* Left Section */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={openSidebar}
            className="md:hidden w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
          >
            <Menu size={18} />
          </button>
          <div className="min-w-0">
            <div className="text-sm font-bold text-foreground truncate">
              {t('adminDashboard')}
            </div>
            <div className="text-xs text-foreground/50">{currentDate}</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Socket Status */}
          <div className="hidden sm:flex items-center gap-1.5 px-2 py-1 rounded-full text-[10px]">
            <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
            <span className="text-foreground/50">
              {isConnected ? "Online" : "Offline"}
            </span>
          </div>

          {/* Fraud Alert Chip */}
          <button
            onClick={() => (window.location.href = "/admin/fraud")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold hover:bg-red-500/20 transition"
          >
            <AlertTriangle size={12} />
            {fraudCount > 0 ? (
              <span>{fraudCount} {t('fraudAlerts')}</span>
            ) : (
              <span>{t('fraudAlerts')}</span>
            )}
          </button>

          {/* Notifications Button */}
          <Link href="/admin/notifications" className="relative w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition">
            <Bell size={16} />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center">
                {alertCount > 99 ? "99+" : alertCount}
              </span>
            )}
          </Link>

          {/* Language Switcher (Imported Component) */}
          <LanguageSwitcher />

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
            title={t('themeToggle')}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Admin Avatar */}
          <div 
            className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm"
            title={t('adminDashboard')}
          >
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;