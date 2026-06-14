"use client";

import React, { useState, useEffect } from "react";
import { Menu, Moon, Sun, Bell, AlertTriangle, Globe } from "lucide-react";
import Link from "next/link";
import useSocket from "../../../hooks/useSocket";

const AdminHeader = ({ openSidebar, toggleTheme, isDark }) => {
  const [currentDate, setCurrentDate] = useState("");
  const [currentLang, setCurrentLang] = useState("en");
  const [fraudCount, setFraudCount] = useState(0);
  
  // Fetch real fraud count from API
  useEffect(() => {
    const fetchFraudCount = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const res = await fetch("https://server-amanah-savings.onrender.com/api/admin/security", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success && data.data?.securityEvents) {
          const count = data.data.securityEvents.filter(
            (e) => e.severity === "high" || e.severity === "critical"
          ).length;
          setFraudCount(count);
        }
      } catch (err) {
        console.error("Fraud count fetch error:", err);
      }
    };
    fetchFraudCount();
  }, []);
  
  // Admin socket for real-time alerts (admin role, no specific userId needed for admin room)
  const { notifications: adminNotifications, isConnected } = useSocket("admin", "admin");
  const [alertCount, setAlertCount] = useState(0);

  useEffect(() => {
    if (adminNotifications.length > 0) {
      setAlertCount(adminNotifications.length);
    }
  }, [adminNotifications]);

  useEffect(() => {
    const now = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
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
    const formattedDate = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    setCurrentDate(formattedDate);
  }, []);

  const toggleLang = () => {
    const newLang = currentLang === "en" ? "bn" : "en";
    setCurrentLang(newLang);
    document.documentElement.lang = newLang;
    localStorage.setItem("admin_lang", newLang);
  };

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
            <div
              className="text-sm font-bold text-foreground truncate"
              id="adminPageTitle"
            >
              Admin Dashboard
            </div>
            <div className="text-xs text-foreground/50">{currentDate}</div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Fraud Alert Chip */}
          <button
            onClick={() => (window.location.href = "/admin/fraud")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold hover:bg-red-500/20 transition"
          >
            <AlertTriangle size={12} />
            {currentLang === "bn"
              ? `${fraudCount} জালিয়াতি সতর্কতা`
              : `${fraudCount} Fraud Alerts`}
          </button>

          {/* Notifications Button */}
          <Link href={"/admin/notifications"} className="relative w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition">
            <Bell size={16} />
            {alertCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center">
                {alertCount > 99 ? "99+" : alertCount}
              </span>
            )}
          </Link>

          {/* Language Toggle */}
          <button
            onClick={toggleLang}
            className="px-3 py-1.5 rounded-lg border border-border text-xs font-bold hover:border-primary transition"
          >
            {currentLang === "en" ? "BN" : "EN"}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Admin Avatar */}
          <div className="w-8 h-8 rounded-lg bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm">
            A
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
