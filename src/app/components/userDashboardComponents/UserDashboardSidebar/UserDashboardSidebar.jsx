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
    const shouldUseDark =
      savedTheme === "dark" ||
      (!savedTheme && document.documentElement.classList.contains("dark"));

    document.documentElement.classList.toggle("dark", shouldUseDark);
    const frame = window.requestAnimationFrame(() => setIsDark(shouldUseDark));

    return () => window.cancelAnimationFrame(frame);
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
    <aside className="flex h-full w-64 flex-col border-r border-[#e2e8f0] bg-[#f8fafc] text-[#475569] shadow-xl dark:border-white/[0.06] dark:bg-[#070d1a] dark:text-white/70 sm:w-72">
      {/* Logo Section - Fixed/Sticky Top */}
      <div className="sticky top-0 z-10 border-b border-[#e2e8f0] bg-[#f8fafc]/95 p-4 backdrop-blur dark:border-white/[0.06] dark:bg-[#070d1a]/95 sm:p-2.5">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#059669,#0891b2)] text-lg text-white shadow-lg shadow-emerald-950/10 transition-transform group-hover:scale-105 sm:h-10 sm:w-10 sm:text-xl dark:shadow-black/30">
            🌿
          </div>
          <div>
            <span className="text-base font-bold text-[#0f172a] dark:text-white sm:text-lg">
              Sanchoy
            </span>
            <span className="block text-xs text-[#059669] dark:text-[#6ee7b7]">
              Bondhu
            </span>
          </div>
        </Link>
      </div>

      {/* User Info Section - Sticky below logo */}
      <div className="sticky top-14 z-10 border-b border-[#e2e8f0] bg-[#f8fafc]/95 p-4 backdrop-blur dark:border-white/[0.06] dark:bg-[#070d1a]/95">
        <div className="flex items-center gap-3">
          {/* Profile Picture or Initial */}
          <div className="relative">
            <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#059669,#0891b2)] text-base font-bold text-white sm:h-12 sm:w-12 sm:text-lg">
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
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[#f8fafc] bg-[#10b981] dark:border-[#070d1a]"></span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="truncate text-sm font-semibold text-[#0f172a] dark:text-white sm:text-base">
              {getUserDisplayName()}
            </div>
            <div className="flex items-center gap-1 text-xs text-[#64748b] dark:text-white/70">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#059669]"></span>
              {user?.selectedPlan
                ? `${user.selectedPlan.charAt(0).toUpperCase() + user.selectedPlan.slice(1)} Saver`
                : "Member"}
            </div>
          </div>
          <div className="text-xs text-[#10b981]" title="Verified">
            ✓
          </div>
        </div>
      </div>

      {/* Navigation Section - Scrollable independently */}
      <nav className="flex-1 overflow-y-auto py-4 custom-scrollbar">
        {navSections.map((section, idx) => (
          <div key={idx} className="mb-4">
            <div className="px-5 py-2 text-xs font-bold uppercase tracking-wider text-[#94a3b8] dark:text-white/30">
              {section.title}
            </div>
            {section.items.map((item) => (
              <Link
                key={item.id}
                href={item.path}
                onClick={closeSidebar}
                className={`flex items-center gap-3 px-5 py-2.5 mx-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(item.path)
                    ? "border border-[#bbf7d0] bg-[#ecfdf5] text-[#047857] dark:border-transparent dark:bg-[rgba(5,150,105,0.2)] dark:text-[#6ee7b7]"
                    : "text-[#475569] hover:bg-[#ecfdf5] hover:text-[#047857] dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
                }`}
              >
                <span className="w-5 shrink-0">{item.icon}</span>
                <span className="flex-1 truncate">{item.name}</span>
                {item.badge && (
                  <span
                    className={`text-xs px-1.5 py-0.5 rounded-full shrink-0 ${
                      item.badge === "4"
                        ? "bg-[#059669]/20 text-[#047857] dark:bg-[#059669]/30 dark:text-[#6ee7b7]"
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
      <div className="sticky bottom-0 border-t border-[#e2e8f0] bg-[#f8fafc]/95 p-4 backdrop-blur dark:border-white/[0.06] dark:bg-[#070d1a]/95">
        <div className="flex gap-2">
          <button
            onClick={toggleTheme}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#e2e8f0] bg-white py-2 text-[#475569] transition hover:border-[#059669] hover:text-[#047857] dark:border-transparent dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white"
          >
            {isDark ? <Sun size={14} /> : <Moon size={14} />}
            <span className="text-xs hidden sm:inline">Theme</span>
          </button>
          <button className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#e2e8f0] bg-white py-2 text-[#475569] transition hover:border-[#059669] hover:text-[#047857] dark:border-transparent dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-white">
            <Globe size={14} />
            <span className="text-xs hidden sm:inline">EN</span>
          </button>
          <button
            onClick={handleLogout}
            className="flex flex-1 items-center justify-center gap-1 rounded-lg border border-[#e2e8f0] bg-white py-2 text-[#475569] transition hover:border-red-500/40 hover:text-red-500 dark:border-transparent dark:bg-white/5 dark:text-white/70 dark:hover:bg-white/10 dark:hover:text-red-400"
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
