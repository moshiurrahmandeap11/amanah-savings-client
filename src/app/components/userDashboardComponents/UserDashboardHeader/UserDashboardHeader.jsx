// components/userDashboardComponents/UserDashboardHeader/UserDashboardHeader.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Bell, Search, Moon, Sun, Flame, Sparkles } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useSocket from "../../../hooks/useSocket";
import Image from "next/image";

const UserDashboardHeader = ({ openSidebar }) => {
  const { user } = useAuth();
  const { unreadCount: socketUnreadCount, isConnected } = useSocket(user?._id || user?.id, "user");
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [currentDate, setCurrentDate] = useState("");
  const [streak, setStreak] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  // Sync user streak from auth context
  useEffect(() => {
    if (user?.streak) {
      setStreak(user.streak);
    }
  }, [user?.streak]);

  // Sync socket unread count
  useEffect(() => {
    if (socketUnreadCount > 0) {
      setUnreadCount(socketUnreadCount);
    }
  }, [socketUnreadCount]);

  // Dynamic title mapping based on pathname
  const getPageTitle = () => {
    const path = pathname || "";
    
    const titleMap = {
      "/dashboard": "Dashboard",
      "/dashboard/goals": "My Goals",
      "/dashboard/circles": "My Circles",
      "/dashboard/submit": "Submit Savings",
      "/dashboard/lifting": "Lifting Request",
      "/dashboard/transactions": "Transactions",
      "/dashboard/transfer": "Transfer Funds",
      "/dashboard/auto-save": "Auto-Save Settings",
      "/dashboard/zakat": "Zakat Calculator",
      "/dashboard/leaderboard": "Leaderboard",
      "/dashboard/achievements": "Achievements",
      "/dashboard/referral": "Referral Program",
      "/dashboard/notifications": "Notifications",
      "/dashboard/profile": "Profile & KYC",
      "/dashboard/security": "Security Settings",
      "/dashboard/settings": "Settings",
      "/dashboard/help": "Help Center",
      "/dashboard/search": "Search",
    };
    
    // Check for exact match first
    if (titleMap[path]) {
      return titleMap[path];
    }
    
    // Check for nested routes (e.g., /dashboard/goals/123)
    for (const [route, title] of Object.entries(titleMap)) {
      if (path.startsWith(route) && route !== "/dashboard") {
        return title;
      }
    }
    
    return "Dashboard";
  };

  // Get page icon based on pathname
  const getPageIcon = () => {
    const path = pathname || "";
    
    const iconMap = {
      "/dashboard": "",
      "/dashboard/goals": "",
      "/dashboard/circles": "",
      "/dashboard/submit": "",
      "/dashboard/lifting": "",
      "/dashboard/transactions": "",
      "/dashboard/transfer": "",
      "/dashboard/auto-save": "",
      "/dashboard/zakat": "",
      "/dashboard/leaderboard": "",
      "/dashboard/achievements": "",
      "/dashboard/referral": "",
      "/dashboard/notifications": "",
      "/dashboard/profile": "",
      "/dashboard/security": "",
      "/dashboard/settings": "",
      "/dashboard/help": "",
      "/dashboard/search": "",
    };
    
    return iconMap[path] || "";
  };

  useEffect(() => {
    // Set current date
    const now = new Date();
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const formattedDate = `${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
    setCurrentDate(formattedDate);

    // Check theme
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  // Get user initial
  const getUserInitial = () => {
    if (user?.firstName) return user.firstName[0].toUpperCase();
    if (user?.fullName) return user.fullName[0].toUpperCase();
    if (user?.email) return user.email[0].toUpperCase();
    return "U";
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.firstName) return user.firstName;
    if (user?.fullName) return user.fullName.split(" ")[0];
    return "User";
  };

  // Get profile picture
  const getProfilePicture = () => {
    return user?.profilePicture || null;
  };

  const pageTitle = getPageTitle();
  const pageIcon = getPageIcon();

  return (
    <header className="sticky top-0 z-30 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="flex items-center justify-between px-4 sm:px-6 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Menu Button for Mobile */}
          <button
            onClick={openSidebar}
            className="md:hidden w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
            aria-label="Open menu"
          >
            <Menu size={18} />
          </button>

          {/* Logo - Only on Mobile */}
          <Link href="/dashboard" className="flex items-center gap-2 md:hidden">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white text-base sm:text-lg shadow-lg">
              🌿
            </div>
          </Link>

          {/* Dynamic Page Title */}
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl">{pageIcon}</span>
            <div>
              <h1 className="text-base sm:text-lg md:text-xl font-bold text-foreground">
                {pageTitle}
              </h1>
              <p className="text-xs text-foreground/50 hidden sm:block">
                {currentDate}
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Streak Chip */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20">
            <Flame size={14} className="text-amber-500" />
            <span className="text-xs font-bold text-amber-500">
              {streak} Day Streak
            </span>
          </div>

          {/* AI Insights Chip */}
          <Link
            href="/dashboard"
            className="hidden lg:flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-primary/10 border border-primary/20 hover:bg-primary hover:text-white transition group"
          >
            <Sparkles size={14} className="text-primary group-hover:text-white" />
            <span className="text-xs font-semibold text-primary group-hover:text-white">
              AI Insights
            </span>
          </Link>

          {/* Search Button */}
          <Link
            href="/dashboard/search"
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
          >
            <Search size={16} />
          </Link>

          {/* Notifications */}
          <Link
            href="/dashboard/notifications"
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
          >
            <Bell size={16} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center">
                {unreadCount > 99 ? "99+" : unreadCount}
              </span>
            )}
          </Link>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* User Avatar */}
          <Link
            href="/dashboard/profile"
            className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-semibold text-sm overflow-hidden"
          >
            {getProfilePicture() ? (
              <Image
                src={getProfilePicture()}
                alt={getUserDisplayName()}
                width={100}
                height={100}
                className="w-full h-full object-cover"
              />
            ) : (
              getUserInitial()
            )}
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-card"></span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default UserDashboardHeader;