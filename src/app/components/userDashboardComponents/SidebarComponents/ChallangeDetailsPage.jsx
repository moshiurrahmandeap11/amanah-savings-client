"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Users,
  Trophy,
  Award,
  Target,
  Clock,
  CheckCircle,
  Share2,
  TrendingUp,
  Medal,
  Flame,
  Loader2,
  Lock,
  Unlock,
} from "lucide-react";

import Swal from "sweetalert2";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Header
    back: "Back",
    copyLink: "Copied!",
    linkCopied: "Challenge link copied to clipboard",
    
    // Status
    activeChallenge: "Active Challenge",
    comingSoon: "Coming Soon",
    challengeCompleted: "Challenge Completed",
    cancelled: "Cancelled",
    unknown: "Unknown",
    
    // Hero
    participants: "Participants",
    
    // Progress
    yourProgress: "Your Progress",
    keepSaving: "Keep saving to complete the challenge!",
    complete: "Complete",
    totalSaved: "Total Saved",
    daysActive: "Days Active",
    dayStreak: "Day Streak",
    
    // Tabs
    overview: "📋 Overview",
    leaderboard: "🏆 Leaderboard",
    rewards: "🎁 Rewards",
    
    // Overview
    duration: "Duration",
    days: "Days",
    challengeProgress: "Challenge Progress",
    daysRemaining: "days remaining",
    community: "Community",
    haveCompleted: "have completed",
    aboutThisChallenge: "About this Challenge",
    targetSavings: "Target Savings:",
    dailyTarget: "Daily Target:",
    perDay: "/day",
    joinChallenge: "🔥 Join Challenge",
    challengeStartsOn: "This challenge starts on {date}. Check back then to join!",
    congratulations: "Congratulations! You completed this challenge.",
    
    // Leaderboard
    topSavers: "🏆 Top Savers",
    highestSavers: "Highest savers in this challenge",
    noParticipants: "No participants yet",
    beFirstToJoin: "Be the first to join!",
    dayStreakLabel: "day streak",
    daysLabel: "days",
    
    // Rewards
    completionReward: "Completion Reward",
    whatYoullGet: "What you'll get for completing this challenge",
    rewardDetails: "Reward Details",
    maximumReward: "Maximum Reward:",
    howToEarnRewards: "How to Earn Rewards",
    step1Title: "Join the Challenge",
    step1Desc: "Enroll before the challenge ends",
    step2Title: "Save Consistently",
    step2Desc: "Make regular deposits to your goal",
    step3Title: "Complete the Challenge",
    step3Desc: "Reach the target or complete all days",
    completed: "Completed",
    successRate: "Success Rate",
    
    // Toast/Alert
    error: "Error!",
    failedToLoad: "Failed to load challenge",
    success: "Success!",
    joinedChallenge: "You joined the {name} challenge!",
    failedToJoin: "Failed to join challenge",
    loadingDetails: "Loading challenge details...",
    challengeNotFound: "Challenge not found",
    backToChallenges: "Back to Challenges",
  },
  bn: {
    // Header
    back: "পিছনে",
    copyLink: "কপি করা হয়েছে!",
    linkCopied: "চ্যালেঞ্জ লিংক ক্লিপবোর্ডে কপি করা হয়েছে",
    
    // Status
    activeChallenge: "সক্রিয় চ্যালেঞ্জ",
    comingSoon: "শীঘ্রই আসছে",
    challengeCompleted: "চ্যালেঞ্জ সম্পূর্ণ",
    cancelled: "বাতিল করা হয়েছে",
    unknown: "অজানা",
    
    // Hero
    participants: "অংশগ্রহণকারী",
    
    // Progress
    yourProgress: "আপনার অগ্রগতি",
    keepSaving: "চ্যালেঞ্জ সম্পূর্ণ করতে সঞ্চয় চালিয়ে যান!",
    complete: "সম্পূর্ণ",
    totalSaved: "মোট সঞ্চয়",
    daysActive: "সক্রিয় দিন",
    dayStreak: "দিনের স্ট্রিক",
    
    // Tabs
    overview: "📋 সংক্ষিপ্ত বিবরণ",
    leaderboard: "🏆 লিডারবোর্ড",
    rewards: "🎁 পুরস্কার",
    
    // Overview
    duration: "মেয়াদ",
    days: "দিন",
    challengeProgress: "চ্যালেঞ্জ অগ্রগতি",
    daysRemaining: "দিন বাকি",
    community: "কমিউনিটি",
    haveCompleted: "সম্পন্ন করেছেন",
    aboutThisChallenge: "এই চ্যালেঞ্জ সম্পর্কে",
    targetSavings: "লক্ষ্য সঞ্চয়:",
    dailyTarget: "দৈনিক লক্ষ্য:",
    perDay: "/দিন",
    joinChallenge: "🔥 চ্যালেঞ্জে যোগ দিন",
    challengeStartsOn: "এই চ্যালেঞ্জ শুরু হবে {date} তারিখে। তখন যোগ দিতে আসুন!",
    congratulations: "অভিনন্দন! আপনি এই চ্যালেঞ্জ সম্পন্ন করেছেন।",
    
    // Leaderboard
    topSavers: "🏆 শীর্ষ সঞ্চয়কারী",
    highestSavers: "এই চ্যালেঞ্জের শীর্ষ সঞ্চয়কারী",
    noParticipants: "কোন অংশগ্রহণকারী নেই",
    beFirstToJoin: "প্রথম যোগ দিন!",
    dayStreakLabel: "দিনের স্ট্রিক",
    daysLabel: "দিন",
    
    // Rewards
    completionReward: "সম্পূর্ণতা পুরস্কার",
    whatYoullGet: "এই চ্যালেঞ্জ সম্পূর্ণ করলে যা পাবেন",
    rewardDetails: "পুরস্কারের বিবরণ",
    maximumReward: "সর্বোচ্চ পুরস্কার:",
    howToEarnRewards: "কীভাবে পুরস্কার অর্জন করবেন",
    step1Title: "চ্যালেঞ্জে যোগ দিন",
    step1Desc: "চ্যালেঞ্জ শেষ হওয়ার আগে নিবন্ধন করুন",
    step2Title: "নিয়মিত সঞ্চয় করুন",
    step2Desc: "আপনার লক্ষ্যে নিয়মিত জমা দিন",
    step3Title: "চ্যালেঞ্জ সম্পূর্ণ করুন",
    step3Desc: "লক্ষ্যে পৌঁছান বা সব দিন সম্পূর্ণ করুন",
    completed: "সম্পন্ন",
    successRate: "সাফল্যের হার",
    
    // Toast/Alert
    error: "ত্রুটি!",
    failedToLoad: "চ্যালেঞ্জ লোড করতে ব্যর্থ হয়েছে",
    success: "সফল!",
    joinedChallenge: "আপনি {name} চ্যালেঞ্জে যোগ দিয়েছেন!",
    failedToJoin: "চ্যালেঞ্জে যোগ দিতে ব্যর্থ হয়েছে",
    loadingDetails: "চ্যালেঞ্জের বিবরণ লোড হচ্ছে...",
    challengeNotFound: "চ্যালেঞ্জ পাওয়া যায়নি",
    backToChallenges: "চ্যালেঞ্জে ফিরে যান",
  }
};

const ChallengeDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const challengeId = params.id;

  const [challenge, setChallenge] = useState(null);
  const [userParticipation, setUserParticipation] = useState(null);
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [lang, setLang] = useState("en");

  // Translation function
  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
  }, []);

  // Fetch challenge details
  const fetchChallengeDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/challenges/${challengeId}`);
      if (response.data.success) {
        setChallenge(response.data.data.challenge);
        setUserParticipation(response.data.data.userParticipation);
        setLeaderboard(response.data.data.leaderboard || []);
      }
    } catch (error) {
      console.error("Fetch challenge error:", error);
      Swal.fire({
        title: t('error'),
        text: error.response?.data?.message || t('failedToLoad'),
        icon: "error",
        confirmButtonColor: "#059669",
      }).then(() => {
        router.push("/dashboard/challenges");
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (challengeId) {
      fetchChallengeDetails();
    }
  }, [challengeId]);

  const joinChallenge = async () => {
    setJoining(true);
    try {
      const response = await axiosInstance.post(`/challenges/${challengeId}/join`);
      if (response.data.success) {
        Swal.fire({
          title: t('success'),
          text: t('joinedChallenge').replace('{name}', challenge.name),
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        fetchChallengeDetails();
      }
    } catch (error) {
      console.error("Join challenge error:", error);
      Swal.fire({
        title: t('error'),
        text: error.response?.data?.message || t('failedToJoin'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setJoining(false);
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(date).toLocaleDateString(lang === "bn" ? "bn-BD" : "en-US", options);
  };

  const getDaysRemaining = () => {
    if (!challenge?.endDate) return 0;
    const end = new Date(challenge.endDate);
    const now = new Date();
    const diff = Math.ceil((end - now) / (1000 * 60 * 60 * 24));
    return Math.max(0, diff);
  };

  const getProgressPercentage = () => {
    if (!challenge?.startDate || !challenge?.endDate) return 0;
    const start = new Date(challenge.startDate);
    const end = new Date(challenge.endDate);
    const now = new Date();
    const total = end - start;
    const elapsed = now - start;
    const percentage = (elapsed / total) * 100;
    return Math.min(Math.max(0, percentage), 100);
  };

  const getStatusColor = () => {
    if (!challenge) return "text-amber-500";
    if (challenge.status === "active") return "text-green-500";
    if (challenge.status === "upcoming") return "text-amber-500";
    if (challenge.status === "completed") return "text-blue-500";
    return "text-red-500";
  };

  const getStatusText = () => {
    if (!challenge) return t('unknown');
    if (challenge.status === "active") return t('activeChallenge');
    if (challenge.status === "upcoming") return t('comingSoon');
    if (challenge.status === "completed") return t('challengeCompleted');
    return t('cancelled');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">{t('loadingDetails')}</p>
        </div>
      </div>
    );
  }

  if (!challenge) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">🏆</div>
          <p className="text-foreground/60">{t('challengeNotFound')}</p>
          <button
            onClick={() => router.push("/dashboard/challenges")}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
          >
            {t('backToChallenges')}
          </button>
        </div>
      </div>
    );
  }

  const daysRemaining = getDaysRemaining();
  const progressPercentage = getProgressPercentage();
  const userProgress = userParticipation?.progress || 0;
  const userSaved = userParticipation?.currentSaved || 0;
  const userDaysCompleted = userParticipation?.daysCompleted || 0;
  const userStreak = userParticipation?.streak || 0;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
          >
            <ArrowLeft size={18} />
          </button>
          <h1 className="text-lg font-bold text-foreground flex-1">
            {challenge.name}
          </h1>
          <button
            onClick={() => {
              navigator.clipboard.writeText(window.location.href);
              Swal.fire({
                title: t('copyLink'),
                text: t('linkCopied'),
                icon: "success",
                timer: 1500,
                showConfirmButton: false,
              });
            }}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
          >
            <Share2 size={16} />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div className={`bg-linear-to-r ${challenge.bgGradient || "from-primary to-primary-light"} py-12 px-4 text-center relative overflow-hidden`}>
        <div className="absolute right-0 top-0 text-9xl opacity-10 pointer-events-none">
          {challenge.icon}
        </div>
        <div className="relative z-10">
          <div className="text-6xl mb-4">{challenge.icon}</div>
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            {challenge.name}
          </h1>
          <p className="text-white/80 text-sm max-w-2xl mx-auto mb-4">
            {challenge.description}
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className={`px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold ${getStatusColor()}`}>
              {getStatusText()}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
              <Calendar size={12} className="inline mr-1" />
              {challenge.period || `${formatDate(challenge.startDate)} - ${formatDate(challenge.endDate)}`}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
              <Users size={12} className="inline mr-1" />
              {challenge.participants?.toLocaleString()} {t('participants')}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Progress Bar (if user joined) */}
        {userParticipation && challenge.status === "active" && (
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <div className="flex justify-between items-center mb-3">
              <div>
                <h3 className="font-bold text-foreground">{t('yourProgress')}</h3>
                <p className="text-xs text-foreground/50">
                  {t('keepSaving')}
                </p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-primary">{userProgress}%</div>
                <div className="text-xs text-foreground/50">{t('complete')}</div>
              </div>
            </div>
            <div className="h-3 bg-border rounded-full overflow-hidden mb-4">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500"
                style={{ width: `${userProgress}%` }}
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  ৳{userSaved.toLocaleString()}
                </div>
                <div className="text-[10px] text-foreground/50">{t('totalSaved')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary">
                  {userDaysCompleted}
                </div>
                <div className="text-[10px] text-foreground/50">{t('daysActive')}</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-primary flex items-center justify-center gap-1">
                  <Flame size={16} className="text-orange-500" />
                  {userStreak}
                </div>
                <div className="text-[10px] text-foreground/50">{t('dayStreak')}</div>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-background rounded-xl p-1 border border-border mb-6">
          {[
            { id: "overview", label: t('overview') },
            { id: "leaderboard", label: t('leaderboard') },
            { id: "rewards", label: t('rewards') },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-card text-foreground shadow-sm"
                  : "text-foreground/50 hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Challenge Info Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar size={18} className="text-primary" />
                  <span className="text-xs text-foreground/50">{t('duration')}</span>
                </div>
                <div className="font-bold text-foreground">
                  {challenge.days} {t('days')}
                </div>
                <div className="text-xs text-foreground/50 mt-1">
                  {formatDate(challenge.startDate)} - {formatDate(challenge.endDate)}
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target size={18} className="text-primary" />
                  <span className="text-xs text-foreground/50">{t('challengeProgress')}</span>
                </div>
                <div className="font-bold text-foreground">
                  {progressPercentage.toFixed(1)}%
                </div>
                <div className="h-1.5 bg-border rounded-full mt-2 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
                <div className="text-xs text-foreground/50 mt-2">
                  {daysRemaining} {t('daysRemaining')}
                </div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={18} className="text-primary" />
                  <span className="text-xs text-foreground/50">{t('community')}</span>
                </div>
                <div className="font-bold text-foreground">
                  {challenge.participants?.toLocaleString()}
                </div>
                <div className="text-xs text-foreground/50 mt-1">
                  {challenge.completedCount || 0} {t('haveCompleted')}
                </div>
              </div>
            </div>

            {/* Challenge Description */}
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-3">{t('aboutThisChallenge')}</h3>
              <p className="text-sm text-foreground/70 leading-relaxed">
                {challenge.description}
              </p>
              {challenge.targetAmount > 0 && (
                <div className="mt-4 p-3 bg-primary/5 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span className="text-foreground/60">{t('targetSavings')}</span>
                    <span className="font-bold text-primary">
                      ৳{challenge.targetAmount.toLocaleString()}
                    </span>
                  </div>
                  {challenge.dailyTarget > 0 && (
                    <div className="flex justify-between text-sm mt-2">
                      <span className="text-foreground/60">{t('dailyTarget')}</span>
                      <span className="font-bold text-primary">
                        ৳{challenge.dailyTarget.toLocaleString()}{t('perDay')}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Join Button */}
            {!userParticipation && challenge.status === "active" && (
              <button
                onClick={joinChallenge}
                disabled={joining}
                className="w-full py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-bold text-lg hover:opacity-90 transition disabled:opacity-50"
              >
                {joining ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : t('joinChallenge')}
              </button>
            )}

            {!userParticipation && challenge.status === "upcoming" && (
              <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 text-center">
                <Lock size={24} className="mx-auto mb-2 text-amber-500" />
                <p className="text-sm text-foreground/70">
                  {t('challengeStartsOn').replace('{date}', formatDate(challenge.startDate))}
                </p>
              </div>
            )}

            {userParticipation && challenge.status === "completed" && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
                <CheckCircle size={24} className="mx-auto mb-2 text-green-500" />
                <p className="text-sm text-foreground/70">
                  {t('congratulations')}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Leaderboard Tab */}
        {activeTab === "leaderboard" && (
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="p-4 border-b border-border">
              <h3 className="font-bold text-foreground">{t('topSavers')}</h3>
              <p className="text-xs text-foreground/50">
                {t('highestSavers')}
              </p>
            </div>
            <div className="divide-y divide-border">
              {leaderboard.length === 0 ? (
                <div className="p-8 text-center">
                  <div className="text-4xl mb-2">🏆</div>
                  <p className="text-foreground/50">{t('noParticipants')}</p>
                  <p className="text-xs text-foreground/40">{t('beFirstToJoin')}</p>
                </div>
              ) : (
                leaderboard.map((entry, index) => (
                  <div key={index} className="p-4 flex items-center gap-3">
                    <div className="w-10 text-center">
                      {entry.rankIcon === "🥇" && "🥇"}
                      {entry.rankIcon === "🥈" && "🥈"}
                      {entry.rankIcon === "🥉" && "🥉"}
                      {!isNaN(entry.rankIcon) && (
                        <span className="text-sm font-bold text-foreground/50">
                          #{entry.rankIcon}
                        </span>
                      )}
                    </div>
                    {entry.profilePicture ? (
                      <img
                        src={entry.profilePicture}
                        alt={entry.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold">
                        {entry.name?.charAt(0) || "U"}
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">
                        {entry.name}
                      </div>
                      <div className="text-xs text-foreground/50 flex items-center gap-2">
                        <span>🔥 {entry.streak || 0} {t('dayStreakLabel')}</span>
                        <span>📅 {entry.daysCompleted || 0} {t('daysLabel')}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-primary">{entry.saved}</div>
                      <div className="text-xs text-foreground/50">{entry.progress}%</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* Rewards Tab */}
        {activeTab === "rewards" && (
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-2xl">
                  🏆
                </div>
                <div>
                  <h3 className="font-bold text-foreground">{t('completionReward')}</h3>
                  <p className="text-xs text-foreground/50">
                    {t('whatYoullGet')}
                  </p>
                </div>
              </div>
              <div className="bg-primary/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Award size={18} className="text-primary" />
                  <span className="font-semibold text-foreground">{t('rewardDetails')}</span>
                </div>
                <p className="text-sm text-foreground/70">{challenge.reward}</p>
                {challenge.maxReward && (
                  <div className="mt-3 pt-3 border-t border-primary/20">
                    <div className="flex justify-between text-sm">
                      <span className="text-foreground/60">{t('maximumReward')}</span>
                      <span className="font-bold text-primary">{challenge.maxReward}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-bold text-foreground mb-3">{t('howToEarnRewards')}</h3>
              <div className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">1</div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t('step1Title')}</div>
                    <div className="text-xs text-foreground/50">{t('step1Desc')}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">2</div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t('step2Title')}</div>
                    <div className="text-xs text-foreground/50">{t('step2Desc')}</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">3</div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">{t('step3Title')}</div>
                    <div className="text-xs text-foreground/50">{t('step3Desc')}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {challenge.completedCount || 0}
                </div>
                <div className="text-xs text-foreground/50">{t('completed')}</div>
              </div>
              <div className="bg-card border border-border rounded-xl p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {Math.round((challenge.completedCount / (challenge.participants || 1)) * 100)}%
                </div>
                <div className="text-xs text-foreground/50">{t('successRate')}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChallengeDetailsPage;