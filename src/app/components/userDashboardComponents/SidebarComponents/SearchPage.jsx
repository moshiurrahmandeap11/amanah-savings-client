"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft, Moon, Sun, Search, X } from "lucide-react";

// Translations
const translations = {
  en: {
    // Navigation
    backHome: "Home",
    search: "Search",
    
    // Search Header
    searchPlaceholder: "Search pages, goals, blog...",
    
    // Trending
    popularSearches: "🔥 Popular Searches",
    
    // Results
    foundResults: "Found {count} results for \"{query}\"",
    
    // Empty State
    nothingFound: "Nothing found",
    trySearching: "Try searching for something else",
    
    // Page Types
    page: "Page",
    academy: "Academy",
    blog: "Blog",
    
    // Page Titles (English)
    dashboard: "Dashboard",
    savingsGoals: "Savings Goals",
    makeDeposit: "Make Deposit",
    withdrawal: "Withdrawal",
    savingsCalculator: "Savings Calculator",
    islamicSavings: "Islamic Savings",
    referralProgram: "Referral Program",
    kycVerification: "KYC Verification",
    aiAdvisor: "AI Advisor",
    leaderboard: "Leaderboard",
    ramadanSavings: "Ramadan Savings",
    savingsInsights: "Savings Insights",
    financialLiteracy: "Financial Literacy",
    savingsTipsBlog: "Savings Tips Blog",
    challenges: "Challenges",
    milestone: "Milestone",
    savingsWall: "Savings Wall",
    liveFeed: "Live Feed",
    familyGoals: "Family Goals",
    successStories: "Success Stories",
    transparencyReport: "Transparency Report",
    shareBadge: "Share Badge",
    community: "Community",
    corporateSavings: "Corporate Savings",
    affiliateProgram: "Affiliate Program",
    developerApi: "Developer API",
    levelUpGuide: "Level Up Guide",
    subscriptionPlans: "Subscription Plans",
    transactionHistory: "Transaction History",
    createGoal: "Create Goal",
    securitySettings: "Security Settings",
    savingsReport: "Savings Report",
    
    // Page Subtitles (English)
    dashboardSub: "Your savings summary",
    savingsGoalsSub: "View all your savings goals",
    makeDepositSub: "Save via bKash/Nagad",
    withdrawalSub: "Withdraw your savings",
    savingsCalculatorSub: "Calculate goal timeline",
    islamicSavingsSub: "Interest-free savings",
    referralProgramSub: "Invite friends, get ৳500",
    kycVerificationSub: "Verify your identity",
    aiAdvisorSub: "AI-powered savings planning",
    leaderboardSub: "Top savers ranking",
    ramadanSavingsSub: "Special Ramadan challenge",
    savingsInsightsSub: "View your savings trends",
    financialLiteracySub: "Free financial education",
    savingsTipsBlogSub: "Weekly financial advice",
    challengesSub: "Join savings challenges",
    milestoneSub: "Your savings milestones",
    savingsWallSub: "Community savings showcase",
    liveFeedSub: "Real-time community activity",
    familyGoalsSub: "Save together with family",
    successStoriesSub: "Inspiring member stories",
    transparencyReportSub: "Sanchoy Bondhu financial transparency",
    shareBadgeSub: "Share your achievements",
    communitySub: "Join Sanchoy Bondhu community",
    corporateSavingsSub: "Savings solutions for businesses",
    affiliateProgramSub: "Earn through affiliate",
    developerApiSub: "Sanchoy Bondhu API documentation",
    levelUpGuideSub: "How to increase level",
    subscriptionPlansSub: "View premium plans",
    transactionHistorySub: "All transaction details",
    createGoalSub: "Create new savings goal",
    securitySettingsSub: "2FA & security settings",
    savingsReportSub: "Detailed savings analysis",
  },
  bn: {
    // Navigation
    backHome: "হোম",
    search: "অনুসন্ধান",
    
    // Search Header
    searchPlaceholder: "পেজ, লক্ষ্য, ব্লগ অনুসন্ধান করুন...",
    
    // Trending
    popularSearches: "🔥 জনপ্রিয় অনুসন্ধান",
    
    // Results
    foundResults: "\"{query}\" এর জন্য {count} টি ফলাফল পাওয়া গেছে",
    
    // Empty State
    nothingFound: "কিছু পাওয়া যায়নি",
    trySearching: "অনুগ্রহ করে অন্য কিছু অনুসন্ধান করুন",
    
    // Page Types
    page: "পেজ",
    academy: "একাডেমি",
    blog: "ব্লগ",
    
    // Page Titles (Bengali)
    dashboard: "ড্যাশবোর্ড",
    savingsGoals: "সঞ্চয় লক্ষ্য",
    makeDeposit: "জমা দিন",
    withdrawal: "উত্তোলন",
    savingsCalculator: "সঞ্চয় ক্যালকুলেটর",
    islamicSavings: "ইসলামী সঞ্চয়",
    referralProgram: "রেফারেল প্রোগ্রাম",
    kycVerification: "কেওয়াইসি যাচাই",
    aiAdvisor: "এআই উপদেষ্টা",
    leaderboard: "লিডারবোর্ড",
    ramadanSavings: "রমজান সঞ্চয়",
    savingsInsights: "সঞ্চয় অন্তর্দৃষ্টি",
    financialLiteracy: "আর্থিক সাক্ষরতা",
    savingsTipsBlog: "সঞ্চয় টিপস ব্লগ",
    challenges: "চ্যালেঞ্জ",
    milestone: "মাইলফলক",
    savingsWall: "সঞ্চয় ওয়াল",
    liveFeed: "লাইভ ফিড",
    familyGoals: "পারিবারিক লক্ষ্য",
    successStories: "সাফল্যের গল্প",
    transparencyReport: "স্বচ্ছতা রিপোর্ট",
    shareBadge: "ব্যাজ শেয়ার",
    community: "কমিউনিটি",
    corporateSavings: "কর্পোরেট সঞ্চয়",
    affiliateProgram: "অ্যাফিলিয়েট প্রোগ্রাম",
    developerApi: "ডেভেলপার এপিআই",
    levelUpGuide: "লেভেল আপ গাইড",
    subscriptionPlans: "সাবস্ক্রিপশন প্ল্যান",
    transactionHistory: "লেনদেনের ইতিহাস",
    createGoal: "লক্ষ্য তৈরি করুন",
    securitySettings: "নিরাপত্তা সেটিংস",
    savingsReport: "সঞ্চয় রিপোর্ট",
    
    // Page Subtitles (Bengali)
    dashboardSub: "আপনার সঞ্চয় সারাংশ",
    savingsGoalsSub: "আপনার সব সঞ্চয় লক্ষ্য দেখুন",
    makeDepositSub: "বিকাশ/নগদ এর মাধ্যমে সঞ্চয় করুন",
    withdrawalSub: "আপনার সঞ্চয় উত্তোলন করুন",
    savingsCalculatorSub: "লক্ষ্যের সময়সীমা গণনা করুন",
    islamicSavingsSub: "সুদ-মুক্ত সঞ্চয়",
    referralProgramSub: "বন্ধুদের আমন্ত্রণ জানান, পান ৳৫০০",
    kycVerificationSub: "আপনার পরিচয় যাচাই করুন",
    aiAdvisorSub: "এআই-চালিত সঞ্চয় পরিকল্পনা",
    leaderboardSub: "শীর্ষ সঞ্চয়কারী র্যাঙ্কিং",
    ramadanSavingsSub: "বিশেষ রমজান চ্যালেঞ্জ",
    savingsInsightsSub: "আপনার সঞ্চয়ের প্রবণতা দেখুন",
    financialLiteracySub: "বিনামূল্যে আর্থিক শিক্ষা",
    savingsTipsBlogSub: "সাপ্তাহিক আর্থিক পরামর্শ",
    challengesSub: "সঞ্চয় চ্যালেঞ্জে যোগ দিন",
    milestoneSub: "আপনার সঞ্চয় মাইলফলক",
    savingsWallSub: "কমিউনিটি সঞ্চয় শোকেস",
    liveFeedSub: "রিয়েল-টাইম কমিউনিটি কার্যক্রম",
    familyGoalsSub: "পরিবারের সাথে একসাথে সঞ্চয় করুন",
    successStoriesSub: "অনুপ্রেরণাদায়ক সদস্য গল্প",
    transparencyReportSub: "সঞ্চয় বন্ধু আর্থিক স্বচ্ছতা",
    shareBadgeSub: "আপনার অর্জন শেয়ার করুন",
    communitySub: "সঞ্চয় বন্ধু কমিউনিটিতে যোগ দিন",
    corporateSavingsSub: "ব্যবসার জন্য সঞ্চয় সমাধান",
    affiliateProgramSub: "অ্যাফিলিয়েটের মাধ্যমে উপার্জন করুন",
    developerApiSub: "সঞ্চয় বন্ধু এপিআই ডকুমেন্টেশন",
    levelUpGuideSub: "লেভেল কীভাবে বাড়াবেন",
    subscriptionPlansSub: "প্রিমিয়াম প্ল্যান দেখুন",
    transactionHistorySub: "সব লেনদেনের বিবরণ",
    createGoalSub: "নতুন সঞ্চয় লক্ষ্য তৈরি করুন",
    securitySettingsSub: "২এফএ ও নিরাপত্তা সেটিংস",
    savingsReportSub: "বিস্তারিত সঞ্চয় বিশ্লেষণ",
  }
};

const SearchPage = () => {
  const searchParams = useSearchParams();
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [lang, setLang] = useState("en");

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

  const pages = [
    {
      icon: "🏠",
      type: t('page'),
      title: t('dashboard'),
      sub: t('dashboardSub'),
      url: "/dashboard",
      tags: ["dashboard", "home", "summary"],
    },
    {
      icon: "🎯",
      type: t('page'),
      title: t('savingsGoals'),
      sub: t('savingsGoalsSub'),
      url: "/dashboard/goals",
      tags: ["goal", "goals", "savings"],
    },
    {
      icon: "💵",
      type: t('page'),
      title: t('makeDeposit'),
      sub: t('makeDepositSub'),
      url: "/dashboard/deposit",
      tags: ["deposit", "bkash", "nagad", "money"],
    },
    {
      icon: "💸",
      type: t('page'),
      title: t('withdrawal'),
      sub: t('withdrawalSub'),
      url: "/dashboard/withdraw",
      tags: ["withdraw", "withdrawal"],
    },
    {
      icon: "🧮",
      type: t('page'),
      title: t('savingsCalculator'),
      sub: t('savingsCalculatorSub'),
      url: "/dashboard/calculator",
      tags: ["calculator", "calculate"],
    },
    {
      icon: "☪️",
      type: t('page'),
      title: t('islamicSavings'),
      sub: t('islamicSavingsSub'),
      url: "/dashboard/plans",
      tags: ["islamic", "halal", "interest-free"],
    },
    {
      icon: "👥",
      type: t('page'),
      title: t('referralProgram'),
      sub: t('referralProgramSub'),
      url: "/dashboard/referral",
      tags: ["referral", "bonus", "invite"],
    },
    {
      icon: "🪪",
      type: t('page'),
      title: t('kycVerification'),
      sub: t('kycVerificationSub'),
      url: "/dashboard/kyc-status",
      tags: ["kyc", "verify", "nid"],
    },
    {
      icon: "🤖",
      type: t('page'),
      title: t('aiAdvisor'),
      sub: t('aiAdvisorSub'),
      url: "/dashboard/ai-advisor",
      tags: ["ai", "advisor", "assistant"],
    },
    {
      icon: "🏆",
      type: t('page'),
      title: t('leaderboard'),
      sub: t('leaderboardSub'),
      url: "/dashboard/leaderboard",
      tags: ["leaderboard", "ranking", "level"],
    },
    {
      icon: "🌙",
      type: t('page'),
      title: t('ramadanSavings'),
      sub: t('ramadanSavingsSub'),
      url: "/dashboard/ramadan",
      tags: ["ramadan", "challenge"],
    },
    {
      icon: "📊",
      type: t('page'),
      title: t('savingsInsights'),
      sub: t('savingsInsightsSub'),
      url: "/dashboard/insights",
      tags: ["insights", "analytics", "trends"],
    },
    {
      icon: "🎓",
      type: t('academy'),
      title: t('financialLiteracy'),
      sub: t('financialLiteracySub'),
      url: "/dashboard/academy",
      tags: ["academy", "education", "learning"],
    },
    {
      icon: "✍️",
      type: t('blog'),
      title: t('savingsTipsBlog'),
      sub: t('savingsTipsBlogSub'),
      url: "/dashboard/blog",
      tags: ["blog", "tips", "advice"],
    },
    {
      icon: "🏆",
      type: t('page'),
      title: t('challenges'),
      sub: t('challengesSub'),
      url: "/dashboard/challenges",
      tags: ["challenge", "competition"],
    },
    {
      icon: "🎊",
      type: t('page'),
      title: t('milestone'),
      sub: t('milestoneSub'),
      url: "/dashboard/milestone",
      tags: ["milestone", "achievement"],
    },
    {
      icon: "🧱",
      type: t('page'),
      title: t('savingsWall'),
      sub: t('savingsWallSub'),
      url: "/dashboard/savings-wall",
      tags: ["wall", "showcase"],
    },
    {
      icon: "📡",
      type: t('page'),
      title: t('liveFeed'),
      sub: t('liveFeedSub'),
      url: "/dashboard/live-feed",
      tags: ["live", "feed", "activity"],
    },
    {
      icon: "👨‍👩‍👧",
      type: t('page'),
      title: t('familyGoals'),
      sub: t('familyGoalsSub'),
      url: "/dashboard/family-goals",
      tags: ["family", "together"],
    },
    {
      icon: "⭐",
      type: t('page'),
      title: t('successStories'),
      sub: t('successStoriesSub'),
      url: "/dashboard/success-stories",
      tags: ["success", "story", "inspiring"],
    },
    {
      icon: "📋",
      type: t('page'),
      title: t('transparencyReport'),
      sub: t('transparencyReportSub'),
      url: "/dashboard/transparency",
      tags: ["transparency", "report"],
    },
    {
      icon: "🏅",
      type: t('page'),
      title: t('shareBadge'),
      sub: t('shareBadgeSub'),
      url: "/dashboard/badge-share",
      tags: ["badge", "share", "achievement"],
    },
    {
      icon: "👥",
      type: t('page'),
      title: t('community'),
      sub: t('communitySub'),
      url: "/dashboard/community",
      tags: ["community", "members"],
    },
    {
      icon: "💼",
      type: t('page'),
      title: t('corporateSavings'),
      sub: t('corporateSavingsSub'),
      url: "/dashboard/corporate",
      tags: ["corporate", "business"],
    },
    {
      icon: "🤝",
      type: t('page'),
      title: t('affiliateProgram'),
      sub: t('affiliateProgramSub'),
      url: "/dashboard/affiliate",
      tags: ["affiliate", "earn"],
    },
    {
      icon: "🔌",
      type: t('page'),
      title: t('developerApi'),
      sub: t('developerApiSub'),
      url: "/dashboard/api-docs",
      tags: ["api", "developer"],
    },
    {
      icon: "🆙",
      type: t('page'),
      title: t('levelUpGuide'),
      sub: t('levelUpGuideSub'),
      url: "/dashboard/levelup",
      tags: ["level", "upgrade"],
    },
    {
      icon: "💎",
      type: t('page'),
      title: t('subscriptionPlans'),
      sub: t('subscriptionPlansSub'),
      url: "/dashboard/subscription",
      tags: ["subscription", "premium"],
    },
    {
      icon: "📄",
      type: t('page'),
      title: t('transactionHistory'),
      sub: t('transactionHistorySub'),
      url: "/dashboard/transactions",
      tags: ["transaction", "history"],
    },
    {
      icon: "🎯",
      type: t('page'),
      title: t('createGoal'),
      sub: t('createGoalSub'),
      url: "/dashboard/goal-create",
      tags: ["goal", "create", "new"],
    },
    {
      icon: "🔐",
      type: t('page'),
      title: t('securitySettings'),
      sub: t('securitySettingsSub'),
      url: "/dashboard/security",
      tags: ["security", "2fa"],
    },
    {
      icon: "📊",
      type: t('page'),
      title: t('savingsReport'),
      sub: t('savingsReportSub'),
      url: "/dashboard/savings-report",
      tags: ["report", "analysis"],
    },
  ];

  const trendingSearches = [
    { icon: "🏠", label: t('dashboard'), query: "dashboard" },
    { icon: "☪️", label: t('islamicSavings'), query: "islamic" },
    { icon: "👥", label: t('referralProgram'), query: "referral" },
    { icon: "🧮", label: t('savingsCalculator'), query: "calculator" },
    { icon: "🪪", label: t('kycVerification'), query: "kyc" },
    { icon: "💜", label: "bKash", query: "bkash" },
    { icon: "🏆", label: t('leaderboard'), query: "leaderboard" },
    { icon: "🌙", label: t('ramadanSavings'), query: "ramadan" },
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
          <ArrowLeft size={14} /> {t('backHome')}
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">{t('search')}</span>
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
            placeholder={t('searchPlaceholder')}
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
              {t('popularSearches')}
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
              {t('foundResults', { count: results.length, query: searchQuery })}
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
              {t('nothingFound')}
            </div>
            <div className="text-sm text-foreground/50">
              {t('trySearching')}
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