"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Wallet,
  Calendar,
  ArrowLeft,
  Target,
  Lock,
  Globe,
  Crown,
  Star,
  Loader2,
  TrendingUp,
  AlertCircle,
  Banknote,
  Share2,
  Check,
  Copy,
} from "lucide-react";

import axiosInstance from "../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    backToGoals: "Back to Goals",
    publicCircle: "Public Circle",
    privateCircle: "Private Circle",
    active: "Active",
    paused: "Paused",
    completed: "Completed",
    totalMembers: "Total Members",
    maxMembers: "Max {count} members",
    totalPool: "Total Pool",
    target: "Target:",
    minDeposit: "Min Deposit",
    perMonth: "Per month",
    poolProgress: "Pool Progress",
    collectedOutOf: "{collected} collected out of {target}",
    aboutThisCircle: "About This Circle",
    membersLabel: "Members",
    membersCount: "{count} members",
    noMembersFound: "No members found",
    admin: "Admin",
    joinCircle: "Join Circle",
    loginToJoin: "Login to Join",
    makeDeposit: "Make a Deposit",
    howItWorks: "How it works:",
    howItWorksDesc: "Each month, members contribute the minimum deposit amount. One member receives the total collected amount on a rotational basis.",
    loadingDetails: "Loading circle details...",
    notFoundTitle: "Not Found",
    notFoundText: "Circle not found",
    notFoundDesc: "The circle you're looking for doesn't exist or is private",
    errorTitle: "Error",
    inviteLinkCopied: "Invite link copied to clipboard",
    copyFailed: "Failed to copy link",
    share: "Share",
    copied: "Copied!",
  },
  bn: {
    backToGoals: "লক্ষ্যে ফিরে যান",
    publicCircle: "পাবলিক সার্কেল",
    privateCircle: "প্রাইভেট সার্কেল",
    active: "সক্রিয়",
    paused: "বিরতি",
    completed: "সম্পন্ন",
    totalMembers: "মোট সদস্য",
    maxMembers: "সর্বোচ্চ {count} সদস্য",
    totalPool: "মোট পুল",
    target: "লক্ষ্য:",
    minDeposit: "ন্যূনতম জমা",
    perMonth: "প্রতি মাস",
    poolProgress: "পুলের অগ্রগতি",
    collectedOutOf: "{collected} সংগ্রহ করা হয়েছে {target} এর মধ্যে",
    aboutThisCircle: "এই সার্কেল সম্পর্কে",
    membersLabel: "সদস্য",
    membersCount: "{count} সদস্য",
    noMembersFound: "কোন সদস্য পাওয়া যায়নি",
    admin: "প্রশাসক",
    joinCircle: "সার্কেলে যোগ দিন",
    loginToJoin: "যোগ দিতে লগইন করুন",
    makeDeposit: "জমা দিন",
    howItWorks: "কীভাবে কাজ করে:",
    howItWorksDesc: "প্রতি মাসে, সদস্যরা ন্যূনতম জমার পরিমাণ প্রদান করে। একজন সদস্য ঘূর্ণনের ভিত্তিতে মোট সংগ্রহকৃত পরিমাণ পান।",
    loadingDetails: "সার্কেলের বিবরণ লোড হচ্ছে...",
    notFoundTitle: "পাওয়া যায়নি",
    notFoundText: "সার্কেল পাওয়া যায়নি",
    notFoundDesc: "আপনি যে সার্কেল খুঁজছেন তা বিদ্যমান নেই বা প্রাইভেট",
    errorTitle: "ত্রুটি",
    inviteLinkCopied: "আমন্ত্রণ লিংক ক্লিপবোর্ডে কপি করা হয়েছে",
    copyFailed: "লিংক কপি করতে ব্যর্থ হয়েছে",
    share: "শেয়ার",
    copied: "কপি করা হয়েছে!",
  }
};

const PublicCircleDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [circle, setCircle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState("en");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Get language and auth from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const fetchCircleDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/circles/${id}`);
      if (response.data.success) {
        setCircle(response.data.data);
      }
    } catch (error) {
      console.error("Fetch circle details error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id) fetchCircleDetails();
  }, [id]);

  const copyInviteLink = () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      alert(t('copyFailed'));
    });
  };

  const shareCircle = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const text = `Check out ${circle?.circleName || "this savings circle"}: ${url}`;
    
    if (navigator.share) {
      try {
        await navigator.share({ title: circle?.circleName || "Savings Circle", text, url });
        return;
      } catch (error) {
        if (error.name === "AbortError") return;
      }
    }
    
    // Fallback: copy to clipboard
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0a0f1e]">
        <div className="text-center">
          <Loader2 className="mx-auto mb-3 h-10 w-10 animate-spin text-[#059669]" />
          <p className="text-sm text-[#475569] dark:text-[#94a3b8]">{t('loadingDetails')}</p>
        </div>
      </div>
    );
  }

  if (!circle) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white dark:bg-[#0a0f1e]">
        <div className="text-center">
          <AlertCircle className="mx-auto mb-3 h-12 w-12 text-[#ef4444]" />
          <h2 className="mb-2 text-xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">{t('notFoundTitle')}</h2>
          <p className="mb-4 text-sm text-[#475569] dark:text-[#94a3b8]">{t('notFoundDesc')}</p>
          <Link href="/goals" className="inline-flex items-center gap-2 rounded-lg bg-[#059669] px-5 py-2.5 text-sm font-bold text-white">
            <ArrowLeft className="h-4 w-4" />
            {t('backToGoals')}
          </Link>
        </div>
      </div>
    );
  }

  const status = circle.status || "active";
  const isPublic = circle.circleType === "public" || circle.visibility === "public";
  const totalPool = Number(circle.totalPool) || Number(circle.totalPoolValue) || 0;
  const targetAmount = Number(circle.targetAmount) || 1;
  const progress = Math.min(100, Math.round((totalPool / targetAmount) * 100));
  const members = circle.members || [];
  const currentMembers = members.length;
  const maxMembers = Number(circle.maxMembers) || currentMembers;
  const minDeposit = Number(circle.minDeposit) || 0;

  return (
    <div className="min-h-screen bg-white text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      {/* Header */}
      <div className="border-b border-[#e2e8f0] bg-[#f8fafc] dark:border-[#1e2d3d] dark:bg-[#111827]">
        <div className="mx-auto flex max-w-[1000px] items-center justify-between px-6 py-4">
          <Link href="/goals" className="inline-flex items-center gap-2 text-sm font-semibold text-[#475569] transition hover:text-[#059669] dark:text-[#94a3b8]">
            <ArrowLeft className="h-4 w-4" />
            {t('backToGoals')}
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={shareCircle}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#e2e8f0] bg-white px-3 py-2 text-xs font-semibold text-[#475569] transition hover:border-[#059669] hover:text-[#059669] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#94a3b8]"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-[#059669]" /> : <Share2 className="h-3.5 w-3.5" />}
              {copied ? t('copied') : t('share')}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1000px] px-6 py-8">
        {/* Circle Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#059669,#0891b2)] p-7 text-white"
        >
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${isPublic ? "bg-white/20" : "bg-white/10"}`}>
              {isPublic ? <Globe className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
              {isPublic ? t('publicCircle') : t('privateCircle')}
            </span>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold ${status === "active" ? "bg-white/20" : status === "paused" ? "bg-[#f59e0b]/30" : "bg-[#059669]/30"}`}>
              {status === "active" ? <Star className="h-3 w-3" /> : status === "paused" ? <AlertCircle className="h-3 w-3" /> : <Check className="h-3 w-3" />}
              {t(status)}
            </span>
          </div>
          <h1 className="mb-2 text-[28px] font-black">{circle.circleName || "Circle"}</h1>
          <p className="mb-5 max-w-[600px] text-sm leading-relaxed text-white/85">
            {circle.description || circle.purpose || ""}
          </p>

          <div className="mb-5 flex flex-wrap gap-6">
            {[
              [currentMembers.toLocaleString(), t('totalMembers')],
              [maxMembers > currentMembers ? `${maxMembers - currentMembers} spots` : "Full", t('maxMembers', { count: maxMembers })],
              [`৳${totalPool.toLocaleString("en-BD")}`, t('totalPool')],
              [`৳${minDeposit.toLocaleString("en-BD")}`, t('minDeposit')],
            ].map(([value, label]) => (
              <div key={label}>
                <div className="text-xl font-extrabold">{value}</div>
                <div className="mt-px text-[11px] text-white/75">{label}</div>
              </div>
            ))}
          </div>

          <div className="mb-2 h-2.5 rounded-full bg-white/20">
            <div className="h-full rounded-full bg-white transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="text-xs text-white/75">
            {t('collectedOutOf', { collected: `৳${totalPool.toLocaleString("en-BD")}`, target: `৳${targetAmount.toLocaleString("en-BD")}` })} · {progress}%
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* About */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="rounded-[16px] border border-[#e2e8f0] bg-white p-6 dark:border-[#1e2d3d] dark:bg-[#1a2235]"
            >
              <h3 className="mb-3 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">{t('aboutThisCircle')}</h3>
              <p className="text-sm leading-relaxed text-[#475569] dark:text-[#94a3b8]">
                {circle.description || circle.purpose || "No description available."}
              </p>
              <div className="mt-4 rounded-xl bg-[#f8fafc] p-4 dark:bg-[#111827]">
                <div className="mb-1 text-xs font-bold text-[#059669]">{t('howItWorks')}</div>
                <p className="text-[13px] leading-relaxed text-[#475569] dark:text-[#94a3b8]">{t('howItWorksDesc')}</p>
              </div>
            </motion.div>

            {/* Members */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="rounded-[16px] border border-[#e2e8f0] bg-white p-6 dark:border-[#1e2d3d] dark:bg-[#1a2235]"
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">{t('membersLabel')}</h3>
                <span className="text-xs font-semibold text-[#94a3b8]">{t('membersCount', { count: currentMembers })}</span>
              </div>
              {members.length === 0 ? (
                <p className="text-sm text-[#94a3b8]">{t('noMembersFound')}</p>
              ) : (
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {members.slice(0, 12).map((member, index) => (
                    <div key={index} className="flex items-center gap-3 rounded-xl bg-[#f8fafc] p-3 dark:bg-[#111827]">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,#059669,#0891b2)] text-sm font-bold text-white">
                        {(member.userName || member.name || "M")[0]?.toUpperCase()}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="truncate text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
                          {member.userName || member.name || "Member"}
                        </div>
                        <div className="text-[11px] text-[#94a3b8]">
                          {member.role === "admin" ? (
                            <span className="inline-flex items-center gap-1 text-[#059669]">
                              <Crown className="h-3 w-3" /> {t('admin')}
                            </span>
                          ) : (
                            "Member"
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>

          {/* Right Column - Actions */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-[16px] border border-[#e2e8f0] bg-white p-5 dark:border-[#1e2d3d] dark:bg-[#1a2235]"
            >
              <h3 className="mb-4 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">Actions</h3>
              
              {isLoggedIn ? (
                <Link
                  href={`/dashboard/circles/${id}`}
                  className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#059669,#0891b2)] p-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(5,150,105,.3)] transition hover:opacity-90"
                >
                  <Target className="h-4 w-4" />
                  {t('joinCircle')}
                </Link>
              ) : (
                <Link
                  href={`/login?redirect=/dashboard/circles/${id}`}
                  className="mb-3 flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#059669,#0891b2)] p-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(5,150,105,.3)] transition hover:opacity-90"
                >
                  <Target className="h-4 w-4" />
                  {t('loginToJoin')}
                </Link>
              )}

              <button
                onClick={copyInviteLink}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-3 text-sm font-semibold text-[#0f172a] transition hover:border-[#059669] hover:text-[#059669] dark:border-[#1e2d3d] dark:bg-[#111827] dark:text-[#f1f5f9]"
              >
                {copied ? <Check className="h-4 w-4 text-[#059669]" /> : <Copy className="h-4 w-4" />}
                {copied ? t('copied') : "Copy Link"}
              </button>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="rounded-[16px] border border-[#e2e8f0] bg-white p-5 dark:border-[#1e2d3d] dark:bg-[#1a2235]"
            >
              <h3 className="mb-4 text-sm font-bold text-[#0f172a] dark:text-[#f1f5f9]">Quick Stats</h3>
              <div className="space-y-3">
                {[
                  [Calendar, "Created", new Date(circle.createdAt).toLocaleDateString()],
                  [Banknote, "Monthly", `৳${minDeposit.toLocaleString("en-BD")}`],
                  [Users, "Members", `${currentMembers}/${maxMembers}`],
                  [TrendingUp, "Progress", `${progress}%`],
                ].map(([Icon, label, value]) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-[#475569] dark:text-[#94a3b8]">
                      <Icon className="h-4 w-4 text-[#94a3b8]" />
                      {label}
                    </div>
                    <span className="text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9]">{value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PublicCircleDetailsPage;
