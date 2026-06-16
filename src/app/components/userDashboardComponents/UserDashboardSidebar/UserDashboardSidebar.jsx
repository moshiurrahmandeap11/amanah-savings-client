// components/userDashboardComponents/UserDashboardSidebar/UserDashboardSidebar.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Target,
  CircleDot,
  ArrowUpCircle,
  ArrowDownCircle,
  History,
  RefreshCw,
  Zap,
  Calculator,
  Trophy,
  Award,
  Gift,
  Bell,
  User,
  Shield,
  Settings,
  HelpCircle,
  LogOut,
  Moon,
  Sun,
  Globe,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import Image from "next/image";

const UserDashboardSidebar = ({ closeSidebar }) => {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
  }, []);

  const navSections = [
    {
      title: "Overview",
      items: [
        {
          name: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          path: "/dashboard",
          id: "dashboard",
        },
        {
          name: "My Goals",
          icon: <Target size={18} />,
          path: "/dashboard/goals",
          id: "goals",
          badge: "",
        },
        {
          name: "My Circles",
          icon: <CircleDot size={18} />,
          path: "/dashboard/circles",
          id: "circles",
        },
      ],
    },
    {
      title: "Savings",
      items: [
        {
          name: "Submit",
          icon: <ArrowUpCircle size={18} />,
          path: "/dashboard/submit",
          id: "deposit",
        },
        {
          name: "Lifting",
          icon: <ArrowDownCircle size={18} />,
          path: "/dashboard/lifting",
          id: "withdraw",
        },
        {
          name: "Transactions",
          icon: <History size={18} />,
          path: "/dashboard/transactions",
          id: "transactions",
        },
        {
          name: "Transfer",
          icon: <RefreshCw size={18} />,
          path: "/dashboard/transfer",
          id: "transfer",
        },
        {
          name: "Auto-Save",
          icon: <Zap size={18} />,
          path: "/dashboard/auto-save",
          id: "autosave",
        },
        {
          name: "Zakat Calculator",
          icon: <Calculator size={18} />,
          path: "/dashboard/zakat",
          id: "zakat",
        },
      ],
    },
    {
      title: "Community",
      items: [
        {
          name: "Leaderboard",
          icon: <Trophy size={18} />,
          path: "/dashboard/leaderboard",
          id: "leaderboard",
        },
        {
          name: "Achievements",
          icon: <Award size={18} />,
          path: "/dashboard/achievements",
          id: "achievements",
        },
        {
          name: "Referral",
          icon: <Gift size={18} />,
          path: "/dashboard/referral",
          id: "referral",
          badge: "",
        },
      ],
    },
    {
      title: "Account",
      items: [
        {
          name: "Notifications",
          icon: <Bell size={18} />,
          path: "/dashboard/notifications",
          id: "notifications",
          badge: "",
        },
        {
          name: "Profile & KYC",
          icon: <User size={18} />,
          path: "/dashboard/profile",
          id: "profile",
        },
        {
          name: "Security",
          icon: <Shield size={18} />,
          path: "/dashboard/security",
          id: "security",
        },
        {
          name: "Settings",
          icon: <Settings size={18} />,
          path: "/dashboard/settings",
          id: "settings",
        },
        {
          name: "Help Center",
          icon: <HelpCircle size={18} />,
          path: "/dashboard/help",
          id: "help",
        },
      ],
    },
  ];

  const isActive = (path) => {
    if (path === "/dashboard") return pathname === path;
    return pathname.startsWith(path);
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const handleLogout = async () => {
    await logout(true);
    router.push("/");
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

  return (
    <aside className="w-64 sm:w-72 h-full bg-sidebar text-sidebar-text flex flex-col shadow-xl">
      {/* Logo Section - Fixed/Sticky Top */}
      <div className="sticky top-0 z-10 bg-sidebar p-4 sm:p-2.5 border-b border-gray-700">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white text-lg sm:text-xl shadow-lg group-hover:scale-105 transition-transform">
            🌿
          </div>
          <div>
            <span className="font-bold text-white text-base sm:text-lg">
              Sanchoy
            </span>
            <span className="block text-xs text-primary-light">Bondhu</span>
          </div>
        </Link>
      </div>

      {/* User Info Section - Sticky below logo */}
      <div className="sticky top-14 z-10 bg-sidebar p-4 border-b border-gray-700">
        <div className="flex items-center gap-3">
          {/* Profile Picture or Initial */}
          <div className="relative">
            <div className="w-11 h-15 sm:w-12 sm:h-12 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-base sm:text-lg overflow-hidden">
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
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar"></span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-white text-sm sm:text-base truncate">
              {getUserDisplayName()}
            </div>
            <div className="text-xs text-sidebar-text flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary"></span>
              {user?.selectedPlan
                ? `${user.selectedPlan.charAt(0).toUpperCase() + user.selectedPlan.slice(1)} Saver`
                : "Member"}
            </div>
          </div>
          <div className="text-xs text-green-400" title="Verified">
            ✓
          </div>
        </div>
      </div>

      {/* Navigation Section - Scrollable independently */}
      <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {navSections.map((section, idx) => (
          <div key={idx} className="mb-4">
            <div className="px-5 py-2 text-xs font-bold text-sidebar-text/50 uppercase tracking-wider">
              {section.title}
            </div>
            {section.items.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-5 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "bg-primary/20 text-primary-light"
                    : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
                }`}
              >
                <span className="w-5 shrink-0">{item.icon}</span>
                <span className="flex-1 truncate">{item.name}</span>
                {item.badge && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${
                      item.badge === "4"
                        ? "bg-primary/30 text-primary-light"
                        : item.badge === "৳500"
                          ? "bg-amber-500/20 text-amber-400"
                          : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer Actions - Sticky Bottom */}
      <div className="sticky bottom-0 bg-sidebar p-4 border-t border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-sidebar-hover text-sidebar-text hover:text-white transition"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
            <span className="text-xs hidden sm:inline">Theme</span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-sidebar-hover text-sidebar-text hover:text-white transition">
            <Globe size={14} />
            <span className="text-xs hidden sm:inline">EN</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-1 py-2 rounded-lg bg-sidebar-hover text-sidebar-text hover:text-red-400 transition"
          >
            <LogOut size={14} />
            <span className="text-xs hidden sm:inline">Exit</span>
          </button>
        </div>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
      `}</style>
    </aside>
  );
};

export default UserDashboardSidebar;
