"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Moon, Sun, Search, X } from "lucide-react";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const pages = [
    {
      icon: "🏠",
      type: "Page",
      title: "Dashboard",
      sub: "Your savings summary",
      url: "/dashboard",
      tags: ["dashboard", "home", "summary"],
    },
    {
      icon: "🎯",
      type: "Page",
      title: "Savings Goals",
      sub: "View all your savings goals",
      url: "/dashboard/goals",
      tags: ["goal", "goals", "savings"],
    },
    {
      icon: "💵",
      type: "Page",
      title: "Make Deposit",
      sub: "Save via bKash/Nagad",
      url: "/dashboard/deposit",
      tags: ["deposit", "bkash", "nagad", "money"],
    },
    {
      icon: "💸",
      type: "Page",
      title: "Withdrawal",
      sub: "Withdraw your savings",
      url: "/dashboard/withdraw",
      tags: ["withdraw", "withdrawal"],
    },
    {
      icon: "🧮",
      type: "Page",
      title: "Savings Calculator",
      sub: "Calculate goal timeline",
      url: "/dashboard/calculator",
      tags: ["calculator", "calculate"],
    },
    {
      icon: "☪️",
      type: "Page",
      title: "Islamic Savings",
      sub: "Interest-free savings",
      url: "/dashboard/plans",
      tags: ["islamic", "halal", "interest-free"],
    },
    {
      icon: "👥",
      type: "Page",
      title: "Referral Program",
      sub: "Invite friends, get ৳500",
      url: "/dashboard/referral",
      tags: ["referral", "bonus", "invite"],
    },
    {
      icon: "🪪",
      type: "Page",
      title: "KYC Verification",
      sub: "Verify your identity",
      url: "/dashboard/kyc-status",
      tags: ["kyc", "verify", "nid"],
    },
    {
      icon: "🤖",
      type: "Page",
      title: "AI Advisor",
      sub: "AI-powered savings planning",
      url: "/dashboard/ai-advisor",
      tags: ["ai", "advisor", "assistant"],
    },
    {
      icon: "🏆",
      type: "Page",
      title: "Leaderboard",
      sub: "Top savers ranking",
      url: "/dashboard/leaderboard",
      tags: ["leaderboard", "ranking", "level"],
    },
    {
      icon: "🌙",
      type: "Page",
      title: "Ramadan Savings",
      sub: "Special Ramadan challenge",
      url: "/dashboard/ramadan",
      tags: ["ramadan", "challenge"],
    },
    {
      icon: "📊",
      type: "Page",
      title: "Savings Insights",
      sub: "View your savings trends",
      url: "/dashboard/insights",
      tags: ["insights", "analytics", "trends"],
    },
    {
      icon: "🎓",
      type: "Academy",
      title: "Financial Literacy",
      sub: "Free financial education",
      url: "/dashboard/academy",
      tags: ["academy", "education", "learning"],
    },
    {
      icon: "✍️",
      type: "Blog",
      title: "Savings Tips Blog",
      sub: "Weekly financial advice",
      url: "/dashboard/blog",
      tags: ["blog", "tips", "advice"],
    },
    {
      icon: "🏆",
      type: "Page",
      title: "Challenges",
      sub: "Join savings challenges",
      url: "/dashboard/challenges",
      tags: ["challenge", "competition"],
    },
    {
      icon: "🎊",
      type: "Page",
      title: "Milestone",
      sub: "Your savings milestones",
      url: "/dashboard/milestone",
      tags: ["milestone", "achievement"],
    },
    {
      icon: "🧱",
      type: "Page",
      title: "Savings Wall",
      sub: "Community savings showcase",
      url: "/dashboard/savings-wall",
      tags: ["wall", "showcase"],
    },
    {
      icon: "📡",
      type: "Page",
      title: "Live Feed",
      sub: "Real-time community activity",
      url: "/dashboard/live-feed",
      tags: ["live", "feed", "activity"],
    },
    {
      icon: "👨‍👩‍👧",
      type: "Page",
      title: "Family Goals",
      sub: "Save together with family",
      url: "/dashboard/family-goals",
      tags: ["family", "together"],
    },
    {
      icon: "⭐",
      type: "Page",
      title: "Success Stories",
      sub: "Inspiring member stories",
      url: "/dashboard/success-stories",
      tags: ["success", "story", "inspiring"],
    },
    {
      icon: "📋",
      type: "Page",
      title: "Transparency Report",
      sub: "Amanah financial transparency",
      url: "/dashboard/transparency",
      tags: ["transparency", "report"],
    },
    {
      icon: "🏅",
      type: "Page",
      title: "Share Badge",
      sub: "Share your achievements",
      url: "/dashboard/badge-share",
      tags: ["badge", "share", "achievement"],
    },
    {
      icon: "👥",
      type: "Page",
      title: "Community",
      sub: "Join Amanah community",
      url: "/dashboard/community",
      tags: ["community", "members"],
    },
    {
      icon: "💼",
      type: "Page",
      title: "Corporate Savings",
      sub: "Savings solutions for businesses",
      url: "/dashboard/corporate",
      tags: ["corporate", "business"],
    },
    {
      icon: "🤝",
      type: "Page",
      title: "Affiliate Program",
      sub: "Earn through affiliate",
      url: "/dashboard/affiliate",
      tags: ["affiliate", "earn"],
    },
    {
      icon: "🔌",
      type: "Page",
      title: "Developer API",
      sub: "Amanah API documentation",
      url: "/dashboard/api-docs",
      tags: ["api", "developer"],
    },
    {
      icon: "🆙",
      type: "Page",
      title: "Level Up Guide",
      sub: "How to increase level",
      url: "/dashboard/levelup",
      tags: ["level", "upgrade"],
    },
    {
      icon: "💎",
      type: "Page",
      title: "Subscription Plans",
      sub: "View premium plans",
      url: "/dashboard/subscription",
      tags: ["subscription", "premium"],
    },
    {
      icon: "📄",
      type: "Page",
      title: "Transaction History",
      sub: "All transaction details",
      url: "/dashboard/transactions",
      tags: ["transaction", "history"],
    },
    {
      icon: "🎯",
      type: "Page",
      title: "Create Goal",
      sub: "Create new savings goal",
      url: "/dashboard/goal-create",
      tags: ["goal", "create", "new"],
    },
    {
      icon: "🔐",
      type: "Page",
      title: "Security Settings",
      sub: "2FA & security settings",
      url: "/dashboard/security",
      tags: ["security", "2fa"],
    },
    {
      icon: "📊",
      type: "Page",
      title: "Savings Report",
      sub: "Detailed savings analysis",
      url: "/dashboard/savings-report",
      tags: ["report", "analysis"],
    },
  ];

  const trendingSearches = [
    { icon: "🏠", label: "Home Savings", query: "home savings" },
    { icon: "☪️", label: "Islamic Mode", query: "islamic mode" },
    { icon: "👥", label: "Referral", query: "referral" },
    { icon: "🧮", label: "Calculator", query: "calculator" },
    { icon: "🪪", label: "KYC", query: "kyc" },
    { icon: "💜", label: "bKash", query: "bkash" },
    { icon: "🏆", label: "Level", query: "level" },
    { icon: "🌙", label: "Ramadan", query: "ramadan" },
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");

    // Get query from URL
    const query = searchParams.get("q");
    if (query) {
      setSearchQuery(query);
      performSearch(query);
    }
  }, [searchParams]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToastMessage = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const performSearch = (query) => {
    const q = query.toLowerCase().trim();
    if (!q) {
      setShowResults(false);
      setResults([]);
      return;
    }

    const filteredResults = pages.filter(
      (page) =>
        page.tags.some((tag) => tag.includes(q)) ||
        page.title.toLowerCase().includes(q) ||
        page.sub.toLowerCase().includes(q),
    );
    setResults(filteredResults);
    setShowResults(true);
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    performSearch(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
    setResults([]);
  };

  const setSearch = (query) => {
    setSearchQuery(query);
    performSearch(query);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15 sticky top-0 z-50">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> Home
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">Search</span>
      </div>

      {/* Search Header */}
      <div className="bg-linear-to-r from-primary to-primary-light px-4 py-4 flex items-center gap-3 sticky top-12 z-50">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search pages, goals, blog..."
            className="w-full py-2.5 px-4 pr-10 rounded-full bg-white/95 text-black outline-none text-sm"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50"
            >
              <X size={14} />
            </button>
          )}
        </div>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="p-4 pb-20">
        {/* Trending Section */}
        {!showResults && (
          <div>
            <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">
              🔥 Popular Searches
            </div>
            <div className="flex flex-wrap gap-2">
              {trendingSearches.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setSearch(item.query)}
                  className="px-3 py-1.5 rounded-full bg-card border border-border text-foreground/60 text-xs hover:border-primary hover:text-primary transition"
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results Section */}
        {showResults && (
          <div>
            <div className="text-sm text-foreground/50 mb-3">
              Found {results.length} results for "{searchQuery}"
            </div>
            <div className="space-y-2">
              {results.map((result, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => (window.location.href = result.url)}
                  className="bg-card border border-border rounded-xl p-3 flex items-center gap-3 cursor-pointer hover:shadow-md transition"
                >
                  <div className="w-11 h-11 rounded-xl bg-linear-to-r from-primary/10 to-primary-light/10 flex items-center justify-center text-xl shrink-0">
                    {result.icon}
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      {result.type}
                    </div>
                    <div className="font-bold text-sm text-foreground">
                      {result.title}
                    </div>
                    <div className="text-xs text-foreground/50">
                      {result.sub}
                    </div>
                  </div>
                  <span className="text-foreground/40 text-lg">›</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Empty State */}
        {showResults && results.length === 0 && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <div className="text-lg font-bold text-foreground mb-1">
              Nothing found
            </div>
            <div className="text-sm text-foreground/50">
              Try searching for something else
            </div>
          </div>
        )}
      </div>

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

export default SearchPage;
