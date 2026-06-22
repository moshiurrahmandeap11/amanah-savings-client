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
  Contact,
  Target // Goals & Circles এর জন্য আইকন
} from "lucide-react";

// Translations
const translations = {
  en: {
    // App Name
    sanchoyBondhu: "Sanchoy Bondhu",
    admin: "ADMIN",
    adminControlPanel: "Admin Control Panel",
    
    // Sections
    overview: "Overview",
    members: "Members",
    financial: "Financial",
    security: "Security",
    operations: "Operations",
    
    // Nav Items - Overview
    dashboard: "Dashboard",
    analytics: "Analytics",
    contact: "Contact",
    goalsCircles: "Goals & Circles",
    allTransaction: "All Transaction",
    
    // Nav Items - Members
    userManagement: "User Management",
    kycReview: "KYC Review",
    
    // Nav Items - Financial
    savingsManagement: "Savings Management",
    depositApprovals: "Deposit Approvals",
    withdrawals: "Withdrawals",
    revenue: "Revenue",
    
    // Nav Items - Security
    fraudAlerts: "Fraud Alerts",
    securityLogs: "Security Logs",
    
    // Nav Items - Operations
    notifications: "Notifications",
    cms: "CMS",
    reports: "Reports",
    supportTickets: "Support Tickets",
    blogManagement: "Blog Management",
    withdrawalApprovals: "Withdrawal Approvals",
    settings: "Settings",
    
    // Footer
    logout: "Logout",
  },
  bn: {
    // App Name
    sanchoyBondhu: "সঞ্চয় বন্ধু",
    admin: "অ্যাডমিন",
    adminControlPanel: "অ্যাডমিন নিয়ন্ত্রণ প্যানেল",
    
    // Sections
    overview: "ওভারভিউ",
    members: "সদস্য",
    financial: "আর্থিক",
    security: "নিরাপত্তা",
    operations: "অপারেশন",
    
    // Nav Items - Overview
    dashboard: "ড্যাশবোর্ড",
    analytics: "বিশ্লেষণ",
    contact: "যোগাযোগ",
    goalsCircles: "লক্ষ্য ও সার্কেল",
    
    // Nav Items - Members
    userManagement: "ব্যবহারকারী ব্যবস্থাপনা",
    kycReview: "কেওয়াইসি পর্যালোচনা",
    
    // Nav Items - Financial
    savingsManagement: "সঞ্চয় ব্যবস্থাপনা",
    depositApprovals: "ডিপোজিট অনুমোদন",
    withdrawals: "উত্তোলন",
    revenue: "আয়",
    
    // Nav Items - Security
    fraudAlerts: "জালিয়াতি সতর্কতা",
    securityLogs: "নিরাপত্তা লগ",
    
    // Nav Items - Operations
    notifications: "বিজ্ঞপ্তি",
    cms: "সিএমএস",
    reports: "প্রতিবেদন",
    supportTickets: "সাপোর্ট টিকেট",
    blogManagement: "ব্লগ ব্যবস্থাপনা",
    withdrawalApprovals: "উত্তোলন অনুমোদন",
    settings: "সেটিংস",
    
    // Footer
    logout: "লগআউট",
  }
};

const getInitialAdminLang = () => {
  if (typeof window === "undefined") return "en";
  return localStorage.getItem("admin_lang") || "en";
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("theme") === "dark";
};

const AdminSidebar = ({ closeSidebar, isDark }) => {
  const pathname = usePathname();
  const [currentLang, setCurrentLang] = useState(getInitialAdminLang);
  const [langLoaded] = useState(true);

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[currentLang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Language change listener
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "admin_lang") {
        setCurrentLang(e.newValue || "en");
      }
    };

    const handleLangChange = (e) => {
      setCurrentLang(e.detail || "en");
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("languageChanged", handleLangChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("languageChanged", handleLangChange);
    };
  }, []);

  // Get nav items with translations - currentLang এর উপর ভিত্তি করে
  const getNavItems = () => [
    {
      section: t('overview'),
      items: [
        {
          name: t('dashboard'),
          icon: <LayoutDashboard size={18} />,
          href: "/admin",
          id: "overview",
        },
        {
          name: t('analytics'),
          icon: <TrendingUp size={18} />,
          href: "/admin/analytics",
          id: "analytics",
        },
        {
          name: t('contact'),
          icon: <Contact size={18} />,
          href: "/admin/contacts",
          id: "contacts",
        },
        {
          name: t('goalsCircles'), // Goals & Circles যোগ করা হলো
          icon: <Target size={18} />,
          href: "/admin/goals-and-circles",
          id: "goals-circles",
        },
        {
          name: t('allTransaction'),
          icon: <Receipt size={18} />,
          href: "/admin/transactions",
          id: "transactions",
        }
      ],
    },
    {
      section: t('members'),
      items: [
        {
          name: t('userManagement'),
          icon: <Users size={18} />,
          href: "/admin/users",
          id: "users",
          badge: "",
          badgeColor: "green",
        },
        {
          name: t('kycReview'),
          icon: <Shield size={18} />,
          href: "/admin/kyc",
          id: "kyc",
          badge: "",
          badgeColor: "yellow",
        },
      ],
    },
    {
      section: t('financial'),
      items: [
        {
          name: t('savingsManagement'),
          icon: <Database size={18} />,
          href: "/admin/savings",
          id: "savings",
        },
        {
          name: t('depositApprovals'),
          icon: <CreditCard size={18} />,
          href: "/admin/deposits",
          id: "deposits",
          badge: "",
          badgeColor: "yellow",
        },
        {
          name: t('withdrawals'),
          icon: <Wallet size={18} />,
          href: "/admin/withdrawals",
          id: "withdrawals",
          badge: "",
          badgeColor: "yellow",
        },
        {
          name: t('revenue'),
          icon: <DollarSign size={18} />,
          href: "/admin/revenue",
          id: "revenue",
        },
      ],
    },
    {
      section: t('security'),
      items: [
        {
          name: t('fraudAlerts'),
          icon: <AlertTriangle size={18} />,
          href: "/admin/fraud",
          id: "fraud",
          badge: "",
          badgeColor: "red",
        },
        {
          name: t('securityLogs'),
          icon: <Eye size={18} />,
          href: "/admin/security",
          id: "security",
        },
      ],
    },
    {
      section: t('operations'),
      items: [
        {
          name: t('notifications'),
          icon: <Bell size={18} />,
          href: "/admin/notifications",
          id: "notifications",
        },
        {
          name: t('cms'),
          icon: <FileText size={18} />,
          href: "/admin/cms",
          id: "cms",
        },
        {
          name: t('reports'),
          icon: <PieChart size={18} />,
          href: "/admin/reports",
          id: "reports",
        },
        {
          name: t('supportTickets'),
          icon: <HelpCircle size={18} />,
          href: "/admin/support",
          id: "support",
          badge: "",
          badgeColor: "red",
        },
        {
          name: t('blogManagement'),
          icon: <Newspaper size={18} />,
          href: "/admin/blog",
          id: "blog",
        },
        {
          name: t('withdrawalApprovals'),
          icon: <Receipt size={18} />,
          href: "/admin/withdrawal-approvals",
          id: "withdrawal-approvals",
          badge: "",
          badgeColor: "yellow",
        },
        {
          name: t('settings'),
          icon: <Settings size={18} />,
          href: "/admin/settings",
          id: "settings",
        },
      ],
    },
  ];

  // প্রতিবার currentLang পরিবর্তন হলে navItems রি-জেনারেট হবে
  const navItems = getNavItems();

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

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <aside className={`w-64 h-full flex flex-col shadow-xl ${
      isDark 
        ? 'bg-sidebar text-sidebar-text' 
        : 'bg-white text-gray-800 border-r border-gray-200'
    }`}>
      {/* Logo */}
      <div className={`p-4 border-b ${
        isDark ? 'border-sidebar-border' : 'border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white">
              🏦
            </div>
            <div className={`font-bold text-sm ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {t('sanchoyBondhu')}
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 text-[10px] font-bold">
            {t('admin')}
          </span>
        </div>
        <div className="mt-3 px-2 py-1.5 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center gap-1.5 text-xs font-semibold text-red-400">
          <Shield size={12} /> {t('adminControlPanel')}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 admin-scroll">
        {navItems.map((section, idx) => (
          <div key={idx}>
            <div className={`px-4 py-2 text-[10px] font-bold uppercase tracking-wider ${
              isDark ? 'text-sidebar-text/40' : 'text-gray-400'
            }`}>
              {section.section}
            </div>
            {section.items.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={closeSidebar}
                className={`flex items-center gap-2 px-4 py-2 mx-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                  isActive(item.href)
                    ? isDark 
                      ? 'bg-primary/20 text-primary-light' 
                      : 'bg-primary/10 text-primary'
                    : isDark
                      ? 'text-sidebar-text hover:bg-sidebar-hover hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
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
      <div className={`p-4 border-t ${
        isDark ? 'border-sidebar-border' : 'border-gray-200'
      }`}>
        <button 
          onClick={handleLogout}
          className={`w-full py-2 rounded-lg text-xs font-medium flex items-center justify-center gap-2 transition ${
            isDark 
              ? 'bg-sidebar-hover text-sidebar-text hover:text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900'
          }`}
        >
          <LogOut size={14} /> {t('logout')}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
