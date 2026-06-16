"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  Shield,
  CreditCard,
  DollarSign,
  AlertTriangle,
  Bell,
  Settings,
  FileText,
  Wallet,
  Receipt,
  LogOut,
  Database,
  Eye,
  UserCheck,
  PieChart,
  Newspaper,
  HelpCircle,
} from "lucide-react";

const AdminSidebar = ({ closeSidebar }) => {
  const pathname = usePathname();
  const [isDark, setIsDark] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    const savedLang = localStorage.getItem("admin_lang") || "en";
    setCurrentLang(savedLang);
  }, []);

  const navItems = [
    {
      section: "Overview",
      items: [
        {
          name: "Dashboard",
          icon: <LayoutDashboard size={18} />,
          href: "/admin",
          id: "overview",
        },
        {
          name: "Analytics",
          icon: <TrendingUp size={18} />,
          href: "/admin/analytics",
          id: "analytics",
        },
      ],
    },
    {
      section: "Members",
      items: [
        {
          name: "User Management",
          icon: <Users size={18} />,
          href: "/admin/users",
          id: "users",
          badge: "",
          badgeColor: "green",
        },
        {
          name: "KYC Review",
          icon: <Shield size={18} />,
          href: "/admin/kyc",
          id: "kyc",
          badge: "",
          badgeColor: "yellow",
        },
      ],
    },
    {
      section: "Financial",
      items: [
        {
          name: "Savings Management",
          icon: <Database size={18} />,
          href: "/admin/savings",
          id: "savings",
        },
        {
          name: "Deposit Approvals",
          icon: <CreditCard size={18} />,
          href: "/admin/deposits",
          id: "deposits",
          badge: "",
          badgeColor: "yellow",
        },
        {
          name: "Withdrawals",
          icon: <Wallet size={18} />,
          href: "/admin/withdrawals",
          id: "withdrawals",
          badge: "",
          badgeColor: "yellow",
        },
        {
          name: "Revenue",
          icon: <DollarSign size={18} />,
          href: "/admin/revenue",
          id: "revenue",
        },
      ],
    },
    {
      section: "Security",
      items: [
        {
          name: "Fraud Alerts",
          icon: <AlertTriangle size={18} />,
          href: "/admin/fraud",
          id: "fraud",
          badge: "",
          badgeColor: "red",
        },
        {
          name: "Security Logs",
          icon: <Eye size={18} />,
          href: "/admin/security",
          id: "security",
        },
      ],
    },
    {
      section: "Operations",
      items: [
        {
          name: "Notifications",
          icon: <Bell size={18} />,
          href: "/admin/notifications",
          id: "notifications",
        },
        {
          name: "CMS",
          icon: <FileText size={18} />,
          href: "/admin/cms",
          id: "cms",
        },
        {
          name: "Reports",
          icon: <PieChart size={18} />,
          href: "/admin/reports",
          id: "reports",
        },
        {
          name: "Support Tickets",
          icon: <HelpCircle size={18} />,
          href: "/admin/support",
          id: "support",
          badge: "",
          badgeColor: "red",
        },
        {
          name: "Blog Management",
          icon: <Newspaper size={18} />,
          href: "/admin/blog",
          id: "blog",
        },
        {
          name: "Withdrawal Approvals",
          icon: <Receipt size={18} />,
          href: "/admin/withdrawal-approvals",
          id: "withdrawal-approvals",
          badge: "",
          badgeColor: "yellow",
        },
        {
          name: "Settings",
          icon: <Settings size={18} />,
          href: "/admin/settings",
          id: "settings",
        },
      ],
    },
  ];

  const isActive = (href) => {
    if (href === "/admin") return pathname === href;
    return pathname.startsWith(href);
  };

  const getBadgeClass = (color) => {
    switch (color) {
      case "green":
        return "bg-green-500/20 text-green-400";
      case "yellow":
        return "bg-amber-500/20 text-amber-400";
      case "red":
        return "bg-red-500/20 text-red-400";
      default:
        return "bg-primary/20 text-primary-light";
    }
  };

  return (
    <aside className="w-64 h-full bg-sidebar text-sidebar-text flex flex-col shadow-xl">
      {/* Logo */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white">
              🏦
            </div>
            <div className="font-bold text-white text-sm">
              Sanchoy <span className="text-primary-light">Bondhu</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold">
            ADMIN
          </span>
        </div>
        <div className="mt-3 px-2 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-1.5 text-xs font-semibold text-red-400">
          <Shield size={12} /> Admin Control Panel
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        {navItems.map((section, idx) => (
          <div key={idx}>
            <div className="px-4 py-2 text-[10px] font-bold text-sidebar-text/40 uppercase tracking-wider">
              {section.section}
            </div>
            {section.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center gap-2 px-4 py-2 mx-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? "bg-primary/20 text-primary-light"
                    : "text-sidebar-text hover:bg-sidebar-hover hover:text-white"
                }`}
              >
                <span className="w-4">{item.icon}</span>
                <span className="flex-1">{item.name}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full ${getBadgeClass(item.badgeColor)}`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full py-2 rounded-lg bg-sidebar-hover text-sidebar-text text-xs font-medium flex items-center justify-center gap-2 hover:text-white transition">
          <LogOut size={14} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
