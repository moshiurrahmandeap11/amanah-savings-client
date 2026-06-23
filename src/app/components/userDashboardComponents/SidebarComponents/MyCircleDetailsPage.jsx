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
  Send,
  Info,
  CircleDot,
  Loader2,
  Copy,
  Check,
  TrendingUp,
  AlertCircle,
  Banknote,
} from "lucide-react";

import Swal from "sweetalert2";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import useAuth from "../../../hooks/useAuth";

// Translations
const translations = {
  en: {
    // Navigation
    backToCircles: "Back to Circles",
    
    // Status Labels
    active: "Active",
    paused: "Paused",
    completed: "Completed",
    privateCircle: "Private Circle",
    publicCircle: "Public Circle",
    
    // Stats
    totalMembers: "Total Members",
    maxMembers: "Max {count} members",
    totalPool: "Total Pool",
    target: "Target:",
    minDeposit: "Min Deposit",
    perMonth: "Per month",
    nextPayout: "Next Payout",
    monthlyRotation: "Monthly rotation",
    
    // Progress
    poolProgress: "Pool Progress",
    collectedOutOf: "{collected} collected out of {target}",
    monthlyCollection: "Monthly Collection:",
    perMonthLabel: "/ month",
    
    // Quick Stats
    quickStats: "Quick Stats",
    created: "Created:",
    totalPoolLabel: "Total Pool:",
    membersLabel: "Members:",
    monthlyPerMember: "Monthly per Member:",
    
    // Description
    aboutThisCircle: "About This Circle",
    
    // Members
    membersLabel: "Members",
    membersCount: "{count} members",
    noMembersFound: "No members found",
    admin: "Admin",
    
    // Buttons
    invite: "Invite",
    copied: "Copied!",
    leaveCircle: "Leave Circle",
    joinCircle: "Join Circle",
    joinedBadge: "Joined",
    makeDeposit: "Make a Deposit",
    withdrawFunds: "Withdraw Funds",
    withdrawFromCircle: "Withdraw from Circle Pool",
    minWithdrawError: "Minimum withdrawal is ৳100",
    insufficientPool: "Insufficient pool balance",
    
    // Withdraw Modal
    withdrawAmount: "Withdrawal Amount",
    availablePool: "Available Pool",
    enterAmount: "Enter amount",
    submitWithdrawal: "Submit Withdrawal",
    withdrawalSubmitted: "Withdrawal request submitted successfully",
    
    // Modals
    joinCircleTitle: "Join Circle?",
    joinCircleText: "Are you sure you want to join this circle?",
    joinConfirm: "Yes, join",
    joinedSuccess: "Joined!",
    joinedText: "You have successfully joined the circle",
    
    leaveCircleTitle: "Leave Circle?",
    leaveCircleText: 'Are you sure you want to leave "{name}"?',
    leaveConfirm: "Yes, leave",
    leftSuccess: "Left!",
    leftText: "You have left the circle",
    
    errorTitle: "Error",
    notFoundTitle: "Not Found",
    notFoundText: "Circle not found",
    notFoundDesc: "The circle you're looking for doesn't exist or you don't have access",
    
    // Info Note
    howItWorks: "How it works:",
    howItWorksDesc: "Each month, members contribute the minimum deposit amount. One member receives the total collected amount on a rotational basis. You'll be notified when it's your turn for payout.",
    
    // Loading
    loadingDetails: "Loading circle details...",
    
    // Invite
    inviteLinkCopied: "Invite link copied to clipboard",
    copyFailed: "Failed to copy link",
  },
  bn: {
    // Navigation
    backToCircles: "সার্কেলে ফিরে যান",
    
    // Status Labels
    active: "সক্রিয়",
    paused: "বিরতি",
    completed: "সম্পন্ন",
    privateCircle: "প্রাইভেট সার্কেল",
    publicCircle: "পাবলিক সার্কেল",
    
    // Stats
    totalMembers: "মোট সদস্য",
    maxMembers: "সর্বোচ্চ {count} সদস্য",
    totalPool: "মোট পুল",
    target: "লক্ষ্য:",
    minDeposit: "ন্যূনতম জমা",
    perMonth: "প্রতি মাস",
    nextPayout: "পরবর্তী পেআউট",
    monthlyRotation: "মাসিক ঘূর্ণন",
    
    // Progress
    poolProgress: "পুলের অগ্রগতি",
    collectedOutOf: "{collected} সংগ্রহ করা হয়েছে {target} এর মধ্যে",
    monthlyCollection: "মাসিক সংগ্রহ:",
    perMonthLabel: "/ মাস",
    
    // Quick Stats
    quickStats: "দ্রুত পরিসংখ্যান",
    created: "তৈরি:",
    totalPoolLabel: "মোট পুল:",
    membersLabel: "সদস্য:",
    monthlyPerMember: "প্রতি সদস্য মাসিক:",
    
    // Description
    aboutThisCircle: "এই সার্কেল সম্পর্কে",
    
    // Members
    membersLabel: "সদস্য",
    membersCount: "{count} সদস্য",
    noMembersFound: "কোন সদস্য পাওয়া যায়নি",
    admin: "প্রশাসক",
    
    // Buttons
    invite: "আমন্ত্রণ",
    copied: "কপি করা হয়েছে!",
    leaveCircle: "সার্কেল ছেড়ে দিন",
    joinCircle: "সার্কেলে যোগ দিন",
    joinedBadge: "যোগ দিয়েছেন",
    makeDeposit: "জমা দিন",
    withdrawFunds: "তহবিল উত্তোলন",
    withdrawFromCircle: "সার্কেল পুল থেকে উত্তোলন",
    minWithdrawError: "ন্যূনতম উত্তোলন ৳১০০",
    insufficientPool: "অপর্যাপ্ত পুল ব্যালেন্স",
    
    // Withdraw Modal
    withdrawAmount: "উত্তোলনের পরিমাণ",
    availablePool: "উপলব্ধ পুল",
    enterAmount: "পরিমাণ লিখুন",
    submitWithdrawal: "উত্তোলন জমা দিন",
    withdrawalSubmitted: "উত্তোলন অনুরোধ সফলভাবে জমা দেওয়া হয়েছে",
    
    // Modals
    joinCircleTitle: "সার্কেলে যোগ দিবেন?",
    joinCircleText: "আপনি কি এই সার্কেলে যোগ দিতে চান?",
    joinConfirm: "হ্যাঁ, যোগ দিন",
    joinedSuccess: "যোগ দিয়েছেন!",
    joinedText: "আপনি সফলভাবে সার্কেলে যোগ দিয়েছেন",
    
    leaveCircleTitle: "সার্কেল ছেড়ে দিবেন?",
    leaveCircleText: 'আপনি কি "{name}" সার্কেল ছেড়ে দিতে চান?',
    leaveConfirm: "হ্যাঁ, ছেড়ে দিন",
    leftSuccess: "ছেড়ে দিয়েছেন!",
    leftText: "আপনি সার্কেল ছেড়ে দিয়েছেন",
    
    errorTitle: "ত্রুটি",
    notFoundTitle: "পাওয়া যায়নি",
    notFoundText: "সার্কেল পাওয়া যায়নি",
    notFoundDesc: "আপনি যে সার্কেল খুঁজছেন তা বিদ্যমান নেই বা আপনার প্রবেশাধিকার নেই",
    
    // Info Note
    howItWorks: "কীভাবে কাজ করে:",
    howItWorksDesc: "প্রতি মাসে, সদস্যরা ন্যূনতম জমার পরিমাণ প্রদান করে। একজন সদস্য ঘূর্ণনের ভিত্তিতে মোট সংগ্রহকৃত পরিমাণ পান। আপনার পেআউটের সময় হলে আপনাকে জানানো হবে।",
    
    // Loading
    loadingDetails: "সার্কেলের বিবরণ লোড হচ্ছে...",
    
    // Invite
    inviteLinkCopied: "আমন্ত্রণ লিংক ক্লিপবোর্ডে কপি করা হয়েছে",
    copyFailed: "লিংক কপি করতে ব্যর্থ হয়েছে",
  }
};

const MyCircleDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { user: authUser } = useAuth();
  const [circle, setCircle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [lang, setLang] = useState("en");

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    // Replace placeholders
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

  const fetchCircleDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/circles/${id}`);
      if (response.data.success) {
        console.log("Fetched circle:", response.data.data);
        setCircle(response.data.data);
      }
    } catch (error) {
      console.error("Fetch circle details error:", error);
      if (error.response?.status === 404) {
        Swal.fire({
          title: t('notFoundTitle'),
          text: t('notFoundText'),
          icon: "error",
          confirmButtonColor: "#059669",
        }).then(() => {
          router.push("/dashboard/circles");
        });
      } else if (error.response?.status === 401) {
        router.push("/login");
      } else {
        Swal.fire({
          title: t('errorTitle'),
          text: error.response?.data?.message || "Failed to fetch circle details",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const joinCircle = async () => {
    const result = await Swal.fire({
      title: t('joinCircleTitle'),
      text: t('joinCircleText'),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#ef4444",
      confirmButtonText: t('joinConfirm'),
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.post(`/circles/${id}/join`);
        
        if (response.data.success) {
          Swal.fire({
            title: t('joinedSuccess'),
            text: t('joinedText'),
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          });
          
          await fetchCircleDetails();
        }
      } catch (error) {
        console.error("Join circle error:", error);
        Swal.fire({
          title: t('errorTitle'),
          text: error.response?.data?.message || "Failed to join circle",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const leaveCircle = async () => {
    const result = await Swal.fire({
      title: t('leaveCircleTitle'),
      text: t('leaveCircleText').replace('{name}', circle?.name || ""),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#059669",
      confirmButtonText: t('leaveConfirm'),
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/circles/${id}/leave`);
        
        if (response.data.success) {
          Swal.fire({
            title: t('leftSuccess'),
            text: t('leftText'),
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            router.push("/dashboard/circles");
          });
        }
      } catch (error) {
        console.error("Leave circle error:", error);
        Swal.fire({
          title: t('errorTitle'),
          text: error.response?.data?.message || "Failed to leave circle",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const [inviteLink, setInviteLink] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [generatingInvite, setGeneratingInvite] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [withdrawPaymentMethod, setWithdrawPaymentMethod] = useState("bkash");
  const [withdrawPhone, setWithdrawPhone] = useState("");
  const [withdrawBankName, setWithdrawBankName] = useState("");
  const [withdrawAccountNumber, setWithdrawAccountNumber] = useState("");
  const [withdrawAccountHolder, setWithdrawAccountHolder] = useState("");
  const [withdrawing, setWithdrawing] = useState(false);

  const generateInviteLink = async () => {
    setGeneratingInvite(true);
    try {
      const response = await axiosInstance.post(`/circles/${id}/invite`);
      if (response.data.success) {
        setInviteLink(response.data.data.inviteLink);
        setInviteCode(response.data.data.inviteCode);
        return response.data.data.inviteLink;
      }
    } catch (error) {
      console.error("Generate invite error:", error);
      Swal.fire({
        title: t('errorTitle'),
        text: error.response?.data?.message || "Failed to generate invite link",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setGeneratingInvite(false);
    }
    return null;
  };

  const handleWithdraw = async () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount < 100) {
      Swal.fire({
        title: t('errorTitle'),
        text: t('minWithdrawError'),
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    const availablePool = circleTotalPoolValue;
    if (amount > availablePool) {
      Swal.fire({
        title: t('errorTitle'),
        text: `${t('insufficientPool')}. Available: ৳${availablePool.toLocaleString()}`,
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
      return;
    }

    setWithdrawing(true);
    try {
      const requestData = {
        withdrawalAmount: amount,
        paymentMethod: withdrawPaymentMethod,
      };

      if (withdrawPaymentMethod === "bkash" || withdrawPaymentMethod === "nagad") {
        requestData.phoneNumber = withdrawPhone;
      }
      if (withdrawPaymentMethod === "bank") {
        requestData.bankName = withdrawBankName;
        requestData.accountNumber = withdrawAccountNumber;
        requestData.accountHolderName = withdrawAccountHolder;
      }

      const response = await axiosInstance.post(`/circles/${id}/withdraw`, requestData);
      if (response.data.success) {
        Swal.fire({
          title: t('success'),
          text: t('withdrawalSubmitted'),
          icon: "success",
          confirmButtonColor: "#059669",
        });
        setShowWithdrawModal(false);
        setWithdrawAmount("");
        setWithdrawPhone("");
        setWithdrawBankName("");
        setWithdrawAccountNumber("");
        setWithdrawAccountHolder("");
        fetchCircleDetails();
      }
    } catch (error) {
      console.error("Withdraw error:", error);
      Swal.fire({
        title: t('errorTitle'),
        text: error.response?.data?.message || "Failed to submit withdrawal",
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setWithdrawing(false);
    }
  };

  const copyInviteLink = async () => {
    let link = inviteLink;
    if (!link) {
      link = await generateInviteLink();
    }
    if (link) {
      navigator.clipboard.writeText(link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      
      Swal.fire({
        title: t('copied'),
        text: t('inviteLinkCopied'),
        icon: "success",
        confirmButtonColor: "#059669",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-500 bg-green-500/10";
      case "paused":
        return "text-amber-500 bg-amber-500/10";
      case "completed":
        return "text-blue-500 bg-blue-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "active": return t('active');
      case "paused": return t('paused');
      case "completed": return t('completed');
      default: return status;
    }
  };

  useEffect(() => {
    if (id) {
      fetchCircleDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">{t('loadingDetails')}</p>
        </div>
      </div>
    );
  }

  if (!circle) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-foreground mb-2">{t('notFoundTitle')}</h3>
          <p className="text-foreground/60 mb-4">
            {t('notFoundDesc')}
          </p>
          <Link
            href="/dashboard/circles"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            <ArrowLeft size={18} />
            {t('backToCircles')}
          </Link>
        </div>
      </div>
    );
  }

  // Safe data extraction based on your JSON structure
  const circleName = circle.name || "Unnamed Circle";
  const circlePurpose = circle.purpose || "general";
  const circleStatus = circle.status || "active";
  const circleType = circle.circleType || "public";
  const circleMembers = circle.currentMembers || circle.members || 0;
  const circleMaxMembers = circle.maxMembers || 0;
  const circleMinDeposit = circle.minDeposit || 0;
  const circleTargetAmount = circle.targetAmount || 0;
  const circleTotalPoolValue = circle.totalPoolValue || 0;
  const circleDescription = circle.description || "";
  const circleNextPayout = circle.nextPayout || "Not scheduled";
  const circleCreatedAt = circle.createdAt || new Date().toISOString();
  const isMember = circle.isMember || false;
  const currentUserId = authUser?._id || authUser?.id;
  // Check if current user is admin using membersList (userId is already string from backend)
  const isAdmin = circle.membersList?.some(m => 
    m.role === "admin" && 
    String(m.userId) === String(currentUserId)
  ) || false;
  
  const progressPercentage = circleTargetAmount > 0 
    ? Math.round((circleTotalPoolValue / circleTargetAmount) * 100) 
    : 0;

  // Get emoji and color based on purpose
  const getCircleEmoji = (purpose) => {
    const emojiMap = {
      wedding: "💍",
      hajj: "🕌",
      education: "🎓",
      home: "🏠",
      business: "💼",
      emergency: "🆘",
      travel: "✈️",
      eid: "🌙",
      general: "🤝",
    };
    return emojiMap[purpose] || "🤝";
  };

  const getCircleColor = (purpose) => {
    const colorMap = {
      wedding: "from-pink-500 to-rose-500",
      hajj: "from-amber-500 to-orange-500",
      education: "from-purple-500 to-indigo-500",
      home: "from-emerald-500 to-teal-500",
      business: "from-violet-500 to-purple-500",
      emergency: "from-red-500 to-rose-500",
      travel: "from-sky-500 to-blue-500",
      eid: "from-green-500 to-emerald-500",
      general: "from-primary to-primary-light",
    };
    return colorMap[purpose] || "from-primary to-primary-light";
  };

  const circleEmoji = getCircleEmoji(circlePurpose);
  const circleColor = getCircleColor(circlePurpose);

  return (
    <div className="w-full max-w-full">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-foreground/60 hover:text-primary transition mb-4 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
        <span className="text-sm">{t('backToCircles')}</span>
      </button>

      {/* Header Section */}
      <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-r ${circleColor} flex items-center justify-center text-4xl sm:text-5xl`}
            >
              {circleEmoji}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {circleName}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                    circleStatus
                  )}`}
                >
                  <CircleDot size={14} />
                  {getStatusText(circleStatus)}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {circleType === "private" ? (
                    <><Lock size={14} /> {t('privateCircle')}</>
                  ) : (
                    <><Globe size={14} /> {t('publicCircle')}</>
                  )}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/5 text-foreground/70 capitalize">
                  {circlePurpose}
                </span>
                {isMember && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                    <Check size={14} />
                    {t('joinedBadge')}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            {isMember ? (
              <>
                <button
                  onClick={copyInviteLink}
                  className="px-4 py-2 rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition flex items-center gap-2"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? t('copied') : t('invite')}
                </button>
                <button
                  onClick={leaveCircle}
                  className="px-4 py-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition"
                >
                  {t('leaveCircle')}
                </button>
              </>
            ) : (
              <button
                onClick={joinCircle}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition"
              >
                {t('joinCircle')}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{circleMembers}</div>
              <div className="text-xs text-foreground/50">{t('totalMembers')}</div>
            </div>
          </div>
          <div className="text-xs text-foreground/60">
            {t('maxMembers', { count: circleMaxMembers })}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                ৳{circleTotalPoolValue.toLocaleString()}
              </div>
              <div className="text-xs text-foreground/50">{t('totalPool')}</div>
            </div>
          </div>
          <div className="text-xs text-foreground/60">
            {t('target')} ৳{circleTargetAmount.toLocaleString()}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                ৳{circleMinDeposit.toLocaleString()}
              </div>
              <div className="text-xs text-foreground/50">{t('minDeposit')}</div>
            </div>
          </div>
          <div className="text-xs text-foreground/60">
            {t('perMonth')}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground text-sm sm:text-base">
                {circleNextPayout}
              </div>
              <div className="text-xs text-foreground/50">{t('nextPayout')}</div>
            </div>
          </div>
          <div className="text-xs text-foreground/60">
            {t('monthlyRotation')}
          </div>
        </motion.div>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-foreground mb-1">{t('poolProgress')}</h3>
              <p className="text-sm text-foreground/60">
                {t('collectedOutOf', { 
                  collected: `৳${circleTotalPoolValue.toLocaleString()}`, 
                  target: `৳${circleTargetAmount.toLocaleString()}` 
                })}
              </p>
            </div>
            <div className="text-2xl font-bold text-primary">
              {progressPercentage}%
            </div>
          </div>
          <div className="h-3 bg-border rounded-full overflow-hidden mb-4">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">{t('monthlyCollection')}</span>
            <span className="font-semibold text-foreground">
              ৳{(circleMinDeposit * circleMembers).toLocaleString()} {t('perMonthLabel')}
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 border border-primary/15 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-primary" />
            <h3 className="font-bold text-foreground">{t('quickStats')}</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('created')}</span>
              <span className="font-medium text-foreground">
                {new Date(circleCreatedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('totalPoolLabel')}</span>
              <span className="font-medium text-foreground">৳{circleTotalPoolValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('membersLabel')}</span>
              <span className="font-medium text-foreground">{circleMembers} / {circleMaxMembers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">{t('monthlyPerMember')}</span>
              <span className="font-medium text-foreground">৳{circleMinDeposit.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Members */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Description */}
        {circleDescription && (
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Info size={18} className="text-primary" />
              <h3 className="font-bold text-foreground">{t('aboutThisCircle')}</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              {circleDescription}
            </p>
          </div>
        )}

        {/* Members List */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-primary" />
              <h3 className="font-bold text-foreground">{t('membersLabel')}</h3>
            </div>
            <span className="text-sm text-foreground/50">{t('membersCount', { count: circleMembers })}</span>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {circle.membersList && circle.membersList.length > 0 ? (
              circle.membersList.map((member, idx) => {
                let memberName = `Member ${idx + 1}`;
                let memberEmail = "";
                let memberRole = "member";
                let memberDeposited = 0;
                
                if (member && typeof member === 'object') {
                  memberRole = member.role || "member";
                  memberDeposited = member.totalDeposited || 0;
                  
                  if (member.user) {
                    memberName = member.user.fullName || `${member.user.firstName || ""} ${member.user.lastName || ""}`.trim() || `Member ${idx + 1}`;
                    memberEmail = member.user.email || "";
                  } else if (member.userId) {
                    if (typeof member.userId === 'object' && member.userId !== null) {
                      memberName = member.userId.name || member.userId.fullName || member.userId.username || `Member ${idx + 1}`;
                      memberEmail = member.userId.email || "";
                    } else if (typeof member.userId === 'string') {
                      memberName = `Member ${idx + 1}`;
                    }
                  }
                }
                
                return (
                  <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {memberRole === "admin" ? (
                        <Crown size={16} className="text-amber-500 shrink-0" />
                      ) : (
                        <Star size={16} className="text-primary/50 shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {String(memberName)}
                        </p>
                        {memberEmail && (
                          <p className="text-xs text-foreground/40 truncate">
                            {String(memberEmail)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {memberRole === "admin" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 whitespace-nowrap">
                          {t('admin')}
                        </span>
                      )}
                      <span className="text-xs text-foreground/50 whitespace-nowrap">
                        ৳{Number(memberDeposited).toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-foreground/50">
                {t('noMembersFound')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isMember && (
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push(`/dashboard/submit?circleId=${circle._id}`)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Send size={18} />
            {t('makeDeposit')}
          </button>
          {isAdmin && (
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
            >
              <Banknote size={18} />
              {t('withdrawFunds')}
            </button>
          )}
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/15 rounded-xl">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-foreground/60 leading-relaxed">
            💡 <span className="font-semibold">{t('howItWorks')}</span> {t('howItWorksDesc')}
          </p>
        </div>
      </div>

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-foreground">{t('withdrawFromCircle')}</h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
              >
                ✕
              </button>
            </div>

            <div className="mb-4 p-3 bg-primary/5 rounded-lg">
              <div className="text-sm text-foreground/60">{t('availablePool')}</div>
              <div className="text-xl font-bold text-primary">৳{circleTotalPoolValue.toLocaleString()}</div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">{t('withdrawAmount')}</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/40 font-semibold">৳</span>
                <input
                  type="number"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  placeholder={t('enterAmount')}
                  min="100"
                  max={circleTotalPoolValue}
                  className="w-full pl-10 pr-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">{t('paymentMethod')}</label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: "bkash", name: "bKash", icon: <Smartphone size={20} />, color: "text-pink-600" },
                  { id: "nagad", name: "Nagad", icon: <Smartphone size={20} />, color: "text-orange-500" },
                  { id: "bank", name: "Bank", icon: <Building size={20} />, color: "text-blue-600" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setWithdrawPaymentMethod(method.id)}
                    className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                      withdrawPaymentMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <span className={method.color}>{method.icon}</span>
                    <span className="text-sm font-medium text-foreground">{method.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {(withdrawPaymentMethod === "bkash" || withdrawPaymentMethod === "nagad") && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
                <input
                  type="text"
                  value={withdrawPhone}
                  onChange={(e) => setWithdrawPhone(e.target.value.replace(/\D/g, '').slice(0, 11))}
                  placeholder="01XXXXXXXXX"
                  className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                />
              </div>
            )}

            {withdrawPaymentMethod === "bank" && (
              <div className="space-y-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Bank Name</label>
                  <select
                    value={withdrawBankName}
                    onChange={(e) => setWithdrawBankName(e.target.value)}
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  >
                    <option value="">Select Bank</option>
                    <option value="DBBL">Dutch-Bangla Bank (DBBL)</option>
                    <option value="BRAC">BRAC Bank</option>
                    <option value="Islami">Islami Bank Bangladesh</option>
                    <option value="Sonali">Sonali Bank</option>
                    <option value="Janata">Janata Bank</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Account Number</label>
                  <input
                    type="text"
                    value={withdrawAccountNumber}
                    onChange={(e) => setWithdrawAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Account Holder Name</label>
                  <input
                    type="text"
                    value={withdrawAccountHolder}
                    onChange={(e) => setWithdrawAccountHolder(e.target.value)}
                    placeholder="Enter account holder name"
                    className="w-full px-4 py-3 bg-background border border-border rounded-xl text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  />
                </div>
              </div>
            )}

            <button
              onClick={handleWithdraw}
              disabled={withdrawing || !withdrawAmount}
              className="w-full py-3.5 bg-red-500 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {withdrawing ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Banknote size={18} />
                  {t('submitWithdrawal')}
                </>
              )}
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MyCircleDetailsPage;