"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Info,
  X,
  Calendar,
  Target,
  Wallet,
  Sparkles,
  CheckCircle,
  Loader2,
  Clock,
  TrendingUp,
  PlayCircle,
  PauseCircle,
  Heart,
  Home,
  GraduationCap,
  Car,
  Briefcase,
  Shield,
  Plane,
  Star,
  Trash2,
  Eye,
  DollarSign,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

// Translations
const translations = {
  en: {
    // Page Title
    pageTitle: "My Savings Goals",
    pageSubtitle: "{count} active goals · Total saved {amount}",
    
    // Buttons
    newGoal: "New Goal",
    deposit: "+ Deposit",
    details: "Details",
    delete: "Delete",
    close: "Close",
    makeDeposit: "+ Make a Deposit",
    cancel: "Cancel",
    createGoal: "Create Goal",
    creating: "Creating...",
    
    // Stats
    activeGoals: "Active Goals",
    totalSaved: "Total Saved",
    monthlyDeposit: "Monthly Deposit",
    onPause: "On Pause",
    
    // Empty State
    noGoals: "No Goals Yet",
    noGoalsDesc: "Create your first savings goal to start your journey",
    createFirstGoal: "Create Your First Goal",
    
    // Goal Status
    active: "Active",
    paused: "Paused",
    completed: "Completed",
    pause: "Pause",
    resume: "Resume",
    
    // Goal Details
    goalDetails: "Goal Details",
    overallProgress: "Overall Progress",
    currentSaved: "Current Saved",
    targetAmount: "Target Amount",
    monthlyDepositLabel: "Monthly Deposit",
    perMonth: "per month",
    totalGoal: "total goal",
    targetDate: "Target Date",
    estimatedCompletion: "Est. Completion",
    expectedCompletion: "expected completion",
    monthsRemaining: "{months} months remaining",
    description: "Description",
    journeyTimeline: "Journey Timeline",
    started: "Started:",
    estimatedCompletionDate: "Estimated Completion:",
    duration: "Duration:",
    months: "months",
    monthlyProgress: "Monthly Progress",
    perMonthProgress: "{percent}% / month",
    toReachTarget: "To Reach Target",
    ribaFree: "Riba-free",
    
    // Modal Titles
    createNewGoal: "Create New Goal",
    createSubtitle: "Set a new savings target to stay motivated",
    goalType: "Goal Type",
    goalName: "Goal Name",
    goalNamePlaceholder: "e.g., My Hajj Fund 2027",
    targetAmountLabel: "Target Amount",
    monthlyDepositLabelForm: "Monthly Deposit",
    targetDateLabel: "Target Date",
    descriptionOptional: "Description (Optional)",
    descriptionPlaceholder: "Write something about this goal...",
    ribaFreeMode: "Riba-free Savings Mode",
    ribaFreeDesc: "Interest-free (halal) savings",
    
    // Goal Types
    hajj: "Hajj/Umrah",
    wedding: "Wedding",
    home: "Home",
    education: "Education",
    car: "Car",
    business: "Business",
    emergency: "Emergency",
    travel: "Travel",
    other: "Other",
    emergencyFund: "Emergency Fund",
    goal: "Goal",
    
    // Validation
    error: "Error",
    enterGoalName: "Please enter a goal name",
    validTargetAmount: "Please enter a valid target amount",
    validMonthlyDeposit: "Please enter a valid monthly deposit amount",
    selectTargetDate: "Please select a target date",
    loginAgain: "Please login again",
    sessionExpired: "Session Expired",
    
    // Success
    success: "Success!",
    goalCreated: "Goal created successfully",
    updated: "Updated!",
    goalResumed: "Goal resumed successfully",
    goalPaused: "Goal paused successfully",
    deleted: "Deleted!",
    goalDeleted: "Goal deleted successfully",
    
    // Confirmation Dialogs
    pauseGoal: "Pause Goal?",
    pauseGoalText: "Are you sure you want to pause this goal?",
    resumeGoal: "Resume Goal?",
    resumeGoalText: "Are you sure you want to resume this goal?",
    confirmPause: "Yes, pause it",
    confirmResume: "Yes, resume it",
    deleteGoal: "Delete Goal?",
    deleteGoalText: "Are you sure you want to delete this goal? This action cannot be undone.",
    confirmDelete: "Yes, delete it",
    
    // Toast
    goalPausedToast: "Goal paused successfully",
    goalResumedToast: "Goal resumed successfully",
    
    // Pro Tip
    proTip: "Pro Tip:",
    proTipText: "Setting up auto-save for your goals helps you stay consistent and reach your targets faster. You can pause any goal anytime from settings.",
    
    // Auto Calculation
    calculation: "Calculation",
    monthlyDepositNeeded: "Monthly deposit needed:",
    timeNeeded: "Time needed:",
    completionMonth: "Completion month:",
    months: "months",
    loadingGoals: "Loading your goals...",
    
    // Dates
    notSet: "Not set",
    invalidDate: "Invalid date",
    completedLabel: "Completed!",
    almostThere: "Almost there!",
    inProgress: "In progress",
  },
  bn: {
    // Page Title
    pageTitle: "আমার সঞ্চয় লক্ষ্য",
    pageSubtitle: "{count} সক্রিয় লক্ষ্য · মোট সঞ্চয় {amount}",
    
    // Buttons
    newGoal: "নতুন লক্ষ্য",
    deposit: "+ জমা দিন",
    details: "বিস্তারিত",
    delete: "মুছে ফেলুন",
    close: "বন্ধ করুন",
    makeDeposit: "+ জমা দিন",
    cancel: "বাতিল",
    createGoal: "লক্ষ্য তৈরি করুন",
    creating: "তৈরি হচ্ছে...",
    
    // Stats
    activeGoals: "সক্রিয় লক্ষ্য",
    totalSaved: "মোট সঞ্চয়",
    monthlyDeposit: "মাসিক জমা",
    onPause: "বিরতিতে",
    
    // Empty State
    noGoals: "কোন লক্ষ্য নেই",
    noGoalsDesc: "আপনার যাত্রা শুরু করতে আপনার প্রথম সঞ্চয় লক্ষ্য তৈরি করুন",
    createFirstGoal: "আপনার প্রথম লক্ষ্য তৈরি করুন",
    
    // Goal Status
    active: "সক্রিয়",
    paused: "বিরতি",
    completed: "সম্পন্ন",
    pause: "বিরতি",
    resume: "পুনরায় শুরু",
    
    // Goal Details
    goalDetails: "লক্ষ্যের বিবরণ",
    overallProgress: "সামগ্রিক অগ্রগতি",
    currentSaved: "বর্তমান সঞ্চয়",
    targetAmount: "লক্ষ্যমাত্রার পরিমাণ",
    monthlyDepositLabel: "মাসিক জমা",
    perMonth: "প্রতি মাস",
    totalGoal: "মোট লক্ষ্য",
    targetDate: "লক্ষ্যমাত্রার তারিখ",
    estimatedCompletion: "আনু. সমাপ্তি",
    expectedCompletion: "প্রত্যাশিত সমাপ্তি",
    monthsRemaining: "{months} মাস বাকি",
    description: "বর্ণনা",
    journeyTimeline: "যাত্রার সময়রেখা",
    started: "শুরু:",
    estimatedCompletionDate: "আনুমানিক সমাপ্তি:",
    duration: "মেয়াদ:",
    months: "মাস",
    monthlyProgress: "মাসিক অগ্রগতি",
    perMonthProgress: "{percent}% / মাস",
    toReachTarget: "লক্ষ্যে পৌঁছাতে",
    ribaFree: "সুদ-মুক্ত",
    
    // Modal Titles
    createNewGoal: "নতুন লক্ষ্য তৈরি করুন",
    createSubtitle: "উদ্দীপিত থাকতে একটি নতুন সঞ্চয় লক্ষ্য নির্ধারণ করুন",
    goalType: "লক্ষ্যের ধরন",
    goalName: "লক্ষ্যের নাম",
    goalNamePlaceholder: "যেমন: আমার হজ ফান্ড ২০২৭",
    targetAmountLabel: "লক্ষ্যমাত্রার পরিমাণ",
    monthlyDepositLabelForm: "মাসিক জমা",
    targetDateLabel: "লক্ষ্যমাত্রার তারিখ",
    descriptionOptional: "বর্ণনা (ঐচ্ছিক)",
    descriptionPlaceholder: "এই লক্ষ্য সম্পর্কে কিছু লিখুন...",
    ribaFreeMode: "সুদ-মুক্ত সঞ্চয় মোড",
    ribaFreeDesc: "সুদ-মুক্ত (হালাল) সঞ্চয়",
    
    // Goal Types
    hajj: "হজ/ওমরাহ",
    wedding: "বিয়ে",
    home: "ঘর",
    education: "শিক্ষা",
    car: "গাড়ি",
    business: "ব্যবসা",
    emergency: "জরুরি",
    travel: "ভ্রমণ",
    other: "অন্যান্য",
    emergencyFund: "জরুরি তহবিল",
    goal: "লক্ষ্য",
    
    // Validation
    error: "ত্রুটি",
    enterGoalName: "অনুগ্রহ করে একটি লক্ষ্যের নাম লিখুন",
    validTargetAmount: "অনুগ্রহ করে একটি বৈধ লক্ষ্যমাত্রার পরিমাণ লিখুন",
    validMonthlyDeposit: "অনুগ্রহ করে একটি বৈধ মাসিক জমার পরিমাণ লিখুন",
    selectTargetDate: "অনুগ্রহ করে একটি লক্ষ্যমাত্রার তারিখ নির্বাচন করুন",
    loginAgain: "অনুগ্রহ করে পুনরায় লগইন করুন",
    sessionExpired: "সেশন শেষ হয়েছে",
    
    // Success
    success: "সফল!",
    goalCreated: "লক্ষ্য সফলভাবে তৈরি হয়েছে",
    updated: "আপডেট করা হয়েছে!",
    goalResumed: "লক্ষ্য পুনরায় শুরু করা হয়েছে",
    goalPaused: "লক্ষ্য বিরতি দেওয়া হয়েছে",
    deleted: "মুছে ফেলা হয়েছে!",
    goalDeleted: "লক্ষ্য সফলভাবে মুছে ফেলা হয়েছে",
    
    // Confirmation Dialogs
    pauseGoal: "লক্ষ্য বিরতি দিবেন?",
    pauseGoalText: "আপনি কি এই লক্ষ্য বিরতি দিতে চান?",
    resumeGoal: "লক্ষ্য পুনরায় শুরু করবেন?",
    resumeGoalText: "আপনি কি এই লক্ষ্য পুনরায় শুরু করতে চান?",
    confirmPause: "হ্যাঁ, বিরতি দিন",
    confirmResume: "হ্যাঁ, পুনরায় শুরু করুন",
    deleteGoal: "লক্ষ্য মুছে ফেলবেন?",
    deleteGoalText: "আপনি কি এই লক্ষ্য মুছে ফেলতে চান? এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।",
    confirmDelete: "হ্যাঁ, মুছে ফেলুন",
    
    // Toast
    goalPausedToast: "লক্ষ্য বিরতি দেওয়া হয়েছে",
    goalResumedToast: "লক্ষ্য পুনরায় শুরু করা হয়েছে",
    
    // Pro Tip
    proTip: "প্রো টিপ:",
    proTipText: "আপনার লক্ষ্যের জন্য অটো-সেভ সেটআপ করা আপনাকে ধারাবাহিক থাকতে এবং দ্রুত লক্ষ্যে পৌঁছাতে সাহায্য করে। আপনি যেকোনো সময় সেটিংস থেকে যেকোনো লক্ষ্য বিরতি দিতে পারেন।",
    
    // Auto Calculation
    calculation: "গণনা",
    monthlyDepositNeeded: "প্রতি মাসে জমা করতে হবে:",
    timeNeeded: "সময় লাগবে:",
    completionMonth: "সমাপ্তির মাস:",
    months: "মাস",
    loadingGoals: "আপনার লক্ষ্য লোড হচ্ছে...",
    
    // Dates
    notSet: "নির্ধারিত নয়",
    invalidDate: "অবৈধ তারিখ",
    completedLabel: "সম্পন্ন!",
    almostThere: "প্রায় শেষ!",
    inProgress: "চলমান",
  }
};

const MyGoalsPage = () => {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedGoalType, setSelectedGoalType] = useState("hajj");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [goals, setGoals] = useState([]);
  const [lang, setLang] = useState("en");
  const [statistics, setStatistics] = useState({
    totalGoals: 0,
    activeGoals: 0,
    completedGoals: 0,
    pausedGoals: 0,
    totalSaved: 0,
    totalTarget: 0,
    overallProgress: 0,
  });
  const [formData, setFormData] = useState({
    goalName: "",
    targetAmount: "",
    monthlyDeposit: "",
    targetDate: "",
    description: "",
    islamicMode: true,
  });
  const [calculations, setCalculations] = useState({
    monthsNeeded: null,
    monthlyNeeded: null,
    completionMonthName: null,
    completionYear: null,
  });

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

  const goalTypes = [
    { icon: <Star size={20} />, name: t('hajj'), value: "hajj" },
    { icon: <Heart size={20} />, name: t('wedding'), value: "wedding" },
    { icon: <Home size={20} />, name: t('home'), value: "home" },
    { icon: <GraduationCap size={20} />, name: t('education'), value: "education" },
    { icon: <Car size={20} />, name: t('car'), value: "car" },
    { icon: <Briefcase size={20} />, name: t('business'), value: "business" },
    { icon: <Shield size={20} />, name: t('emergency'), value: "emergency" },
    { icon: <Plane size={20} />, name: t('travel'), value: "travel" },
    { icon: <Target size={20} />, name: t('other'), value: "other" },
  ];

  const getGoalIcon = (goalType) => {
    const iconMap = {
      hajj: <Star size={28} />,
      wedding: <Heart size={28} />,
      home: <Home size={28} />,
      education: <GraduationCap size={28} />,
      car: <Car size={28} />,
      business: <Briefcase size={28} />,
      emergency: <Shield size={28} />,
      travel: <Plane size={28} />,
      other: <Target size={28} />,
    };
    return iconMap[goalType] || <Target size={28} />;
  };

  const getGoalColor = (goalType) => {
    const colorMap = {
      hajj: "from-amber-500 to-orange-500",
      wedding: "from-pink-500 to-rose-500",
      home: "from-emerald-500 to-teal-500",
      education: "from-purple-500 to-indigo-500",
      car: "from-blue-500 to-cyan-500",
      business: "from-violet-500 to-purple-500",
      emergency: "from-red-500 to-rose-500",
      travel: "from-sky-500 to-blue-500",
      other: "from-gray-500 to-gray-600",
    };
    return colorMap[goalType] || "from-primary to-primary-light";
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "৳0";
    return `৳${amount.toLocaleString()}`;
  };

  // Auto-calculate goal timeline based on target, monthly deposit, and target date
  const calculateGoalTimeline = (target, monthly, targetDateStr) => {
    const targetNum = parseFloat(target) || 0;
    const monthlyNum = parseFloat(monthly) || 0;

    if (targetNum <= 0) return { monthsNeeded: null, monthlyNeeded: null, completionMonthName: null, completionYear: null };

    // If target date is provided, calculate monthly deposit needed
    if (targetDateStr) {
      const today = new Date();
      const targetDate = new Date(targetDateStr);
      const diffTime = targetDate - today;
      const diffMonths = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30.44)));
      const neededPerMonth = Math.ceil(targetNum / diffMonths);

      return {
        monthsNeeded: diffMonths,
        monthlyNeeded: neededPerMonth,
        completionMonthName: targetDate.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { month: 'long' }),
        completionYear: targetDate.getFullYear(),
      };
    }

    // If monthly deposit is provided, calculate months needed
    if (monthlyNum > 0) {
      const months = Math.ceil(targetNum / monthlyNum);
      const completionDate = new Date();
      completionDate.setMonth(completionDate.getMonth() + months);

      return {
        monthsNeeded: months,
        monthlyNeeded: monthlyNum,
        completionMonthName: completionDate.toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US', { month: 'long' }),
        completionYear: completionDate.getFullYear(),
      };
    }

    return { monthsNeeded: null, monthlyNeeded: null, completionMonthName: null, completionYear: null };
  };

  const formatDate = (dateString) => {
    if (!dateString) return t('notSet');
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch (error) {
      return t('invalidDate');
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <PlayCircle size={16} />;
      case "paused":
        return <PauseCircle size={16} />;
      case "completed":
        return <CheckCircle size={16} />;
      default:
        return null;
    }
  };

  const getGoalTypeName = (goalType) => {
    const typeMap = {
      hajj: t('hajj'),
      wedding: t('wedding'),
      home: t('home'),
      education: t('education'),
      car: t('car'),
      business: t('business'),
      emergency: t('emergencyFund'),
      travel: t('travel'),
      other: t('other'),
    };
    return typeMap[goalType] || t('goal');
  };

  const calculateRemainingMonths = (goal) => {
    if (goal.status === "completed") return 0;
    const remainingAmount = goal.targetAmount - (goal.currentSaved || 0);
    const months = Math.ceil(remainingAmount / goal.monthlyDeposit);
    return months;
  };

  const calculateEstimatedCompletion = (goal) => {
    if (goal.status === "completed") return t('completedLabel');
    const months = calculateRemainingMonths(goal);
    if (months <= 0) return t('almostThere');
    
    const currentDate = new Date();
    const completionDate = new Date(currentDate);
    completionDate.setMonth(currentDate.getMonth() + months);
    
    return completionDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Fetch goals from API
  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/goals/my");
      if (response.data.success) {
        const myGoals = response.data.data?.goals || [];
        setGoals(
          myGoals.filter((goal) => {
            const name = String(goal.goalName || goal.name || "").toLowerCase();
            const type = String(goal.goalType || goal.type || "").toLowerCase();
            return name !== "referral bonus" && type !== "bonus";
          }),
        );
      }
    } catch (error) {
      console.error("Fetch goals error:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics from API
  const fetchStatistics = async () => {
    try {
      const response = await axiosInstance.get("/goals/statistics");
      if (response.data.success) {
        setStatistics(response.data.data);
      }
    } catch (error) {
      console.error("Fetch statistics error:", error);
    }
  };

  // Create new goal
  const createGoal = async () => {
    // Validation
    if (!formData.goalName.trim()) {
      Swal.fire({
        title: t('error'),
        text: t('enterGoalName'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!formData.targetAmount || parseFloat(formData.targetAmount) <= 0) {
      Swal.fire({
        title: t('error'),
        text: t('validTargetAmount'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!formData.monthlyDeposit || parseFloat(formData.monthlyDeposit) <= 0) {
      Swal.fire({
        title: t('error'),
        text: t('validMonthlyDeposit'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!formData.targetDate) {
      Swal.fire({
        title: t('error'),
        text: t('selectTargetDate'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          title: t('error'),
          text: t('loginAgain'),
          icon: "error",
          confirmButtonColor: "#059669",
        });
        window.location.href = "/login";
        return;
      }

      const requestData = {
        goalType: selectedGoalType,
        goalName: formData.goalName,
        targetAmount: parseFloat(formData.targetAmount),
        monthlyDeposit: parseFloat(formData.monthlyDeposit),
        targetDate: formData.targetDate,
        description: formData.description || null,
        islamicMode: formData.islamicMode,
      };

      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axiosInstance.post("/goals", requestData);

      if (response.data.success) {
        Swal.fire({
          title: t('success'),
          text: t('goalCreated'),
          icon: "success",
          confirmButtonColor: "#059669",
          timer: 2000,
          showConfirmButton: false,
        });

        setShowGoalModal(false);
        setFormData({
          goalName: "",
          targetAmount: "",
          monthlyDeposit: "",
          targetDate: "",
          description: "",
          islamicMode: true,
        });
        setSelectedGoalType("hajj");

        await fetchGoals();
        await fetchStatistics();
      }
    } catch (error) {
      console.error("Create goal error:", error);
      
      if (error.response?.status === 401) {
        Swal.fire({
          title: t('sessionExpired'),
          text: t('loginAgain'),
          icon: "error",
          confirmButtonColor: "#059669",
        }).then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        });
        return;
      }
      
      Swal.fire({
        title: t('error'),
        text: error.response?.data?.message || "Failed to create goal",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle goal status
  const toggleGoalStatus = async (goalId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    const action = newStatus === "active" ? "resume" : "pause";

    const result = await Swal.fire({
      title: action === "pause" ? t('pauseGoal') : t('resumeGoal'),
      text: action === "pause" ? t('pauseGoalText') : t('resumeGoalText'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#ef4444",
      confirmButtonText: action === "pause" ? t('confirmPause') : t('confirmResume'),
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.patch(`/goals/${goalId}/toggle-status`, {
          status: newStatus,
        });

        if (response.data.success) {
          Swal.fire({
            title: t('updated'),
            text: newStatus === "active" ? t('goalResumed') : t('goalPaused'),
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          });
          await fetchGoals();
          await fetchStatistics();
        }
      } catch (error) {
        console.error("Toggle status error:", error);
        Swal.fire({
          title: t('error'),
          text: error.response?.data?.message || "Failed to update goal status",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  // Delete goal
  const deleteGoal = async (goalId) => {
    const result = await Swal.fire({
      title: t('deleteGoal'),
      text: t('deleteGoalText'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#059669",
      confirmButtonText: t('confirmDelete'),
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/goals/${goalId}`);

        if (response.data.success) {
          Swal.fire({
            title: t('deleted'),
            text: t('goalDeleted'),
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          });
          await fetchGoals();
          await fetchStatistics();
        }
      } catch (error) {
        console.error("Delete goal error:", error);
        Swal.fire({
          title: t('error'),
          text: error.response?.data?.message || "Failed to delete goal",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      // Auto-calculate when target, monthly deposit, or target date changes
      if (name === 'targetAmount' || name === 'monthlyDeposit' || name === 'targetDate') {
        const calc = calculateGoalTimeline(updated.targetAmount, updated.monthlyDeposit, updated.targetDate);
        setCalculations(calc);
      }
      return updated;
    });
  };

  const handleViewDetails = (goal) => {
    setSelectedGoal(goal);
    setShowDetailsModal(true);
  };

  const sortedGoals = [...goals].sort((a, b) => {
    const aCompleted = a.status === "completed";
    const bCompleted = b.status === "completed";

    if (aCompleted === bCompleted) return 0;
    return aCompleted ? 1 : -1;
  });

  const activeGoalsCount = goals.filter((g) => g.status === "active").length;
  const totalSavedAmount = goals.reduce((sum, g) => sum + (g.currentSaved || 0), 0);
  const monthlyDepositTotal = goals.reduce((sum, g) => sum + (g.monthlyDeposit || 0), 0);
  const pausedGoalsCount = goals.filter((g) => g.status === "paused").length;

  const stats = [
    {
      icon: <Target size={20} />,
      value: activeGoalsCount.toString(),
      label: t('activeGoals'),
      bg: "bg-primary/10",
      accent: "from-[#059669] to-[#0891b2]",
    },
    {
      icon: <DollarSign size={20} />,
      value: formatCurrency(totalSavedAmount),
      label: t('totalSaved'),
      bg: "bg-blue-500/10",
      accent: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Calendar size={20} />,
      value: formatCurrency(monthlyDepositTotal),
      label: t('monthlyDeposit'),
      bg: "bg-amber-500/10",
      accent: "from-amber-500 to-orange-500",
    },
    {
      icon: <CheckCircle size={20} />,
      value: pausedGoalsCount.toString(),
      label: t('onPause'),
      bg: "bg-cyan-500/10",
      accent: "from-cyan-500 to-teal-500",
    },
  ];

  useEffect(() => {
    fetchGoals();
    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">{t('loadingGoals')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
            <Target size={28} /> {t('pageTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-foreground/60 mt-1">
            {t('pageSubtitle', { 
              count: activeGoalsCount, 
              amount: formatCurrency(totalSavedAmount) 
            })}
          </p>
        </div>
        <button
          onClick={() => setShowGoalModal(true)}
          className="px-4 sm:px-5 py-2.5 bg-[linear-gradient(135deg,#059669,#0891b2)] text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/25 transition w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Plus size={18} />
          <span>{t('newGoal')}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="relative overflow-hidden bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-lg transition group"
          >
            <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.accent}`} />
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl ${stat.bg} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition text-primary`}
            >
              {stat.icon}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-xs text-foreground/50 mt-0.5 sm:mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Target size={64} className="text-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">{t('noGoals')}</h3>
          <p className="text-foreground/60 mb-4">
            {t('noGoalsDesc')}
          </p>
          <button
            onClick={() => setShowGoalModal(true)}
            className="px-6 py-2.5 bg-[linear-gradient(135deg,#059669,#0891b2)] text-white rounded-xl font-semibold shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/25 transition inline-flex items-center gap-2"
          >
            <Plus size={18} /> {t('createFirstGoal')}
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {sortedGoals.map((goal) => (
            <motion.div
              key={goal._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-primary/40 hover:shadow-xl transition-all"
            >
              {/* Goal Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {getGoalIcon(goal.goalType)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {goal.goalName}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-foreground/50">
                      {formatCurrency(goal.monthlyDeposit)} / {t('perMonth')} · 
                      {goal.status === "completed" 
                        ? ` ${t('completedLabel')}` 
                        : goal.targetDate 
                          ? ` ${t('targetDate')} ${formatDate(goal.targetDate)}` 
                          : ` ${t('inProgress')}`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
                      goal.status === "active"
                        ? "bg-primary/10 text-primary"
                        : goal.status === "paused"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {getStatusIcon(goal.status)}
                    {goal.status === "active" 
                      ? t('active') 
                      : goal.status === "paused" 
                        ? t('paused') 
                        : t('completed')}
                  </span>
                  {goal.status !== "completed" && (
                    <button
                      onClick={() => toggleGoalStatus(goal._id, goal.status)}
                      className="text-xs text-foreground/50 hover:text-primary transition"
                    >
                      {goal.status === "active" ? t('pause') : t('resume')}
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="h-1.5 sm:h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${getGoalColor(goal.goalType)} transition-all duration-500`}
                    style={{ width: `${goal.progress || 0}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs sm:text-sm mt-1.5">
                  <span className="text-primary font-semibold">
                    {formatCurrency(goal.currentSaved || 0)}
                  </span>
                  <span className="text-foreground/50">
                    {formatCurrency(goal.targetAmount)} ({goal.progress || 0}%)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <Link
                  href={`/dashboard/submit?goalId=${goal._id}`}
                  className="flex-1 py-2 text-center rounded-lg bg-[linear-gradient(135deg,#059669,#0891b2)] text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-600/15 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-600/20 transition px-3"
                >
                  {t('deposit')}
                </Link>
                <button
                  onClick={() => handleViewDetails(goal)}
                  className="flex-1 py-2 text-center rounded-lg border border-primary/20 bg-gradient-to-r from-primary/10 to-cyan-500/10 text-primary text-xs sm:text-sm font-semibold hover:border-primary hover:from-primary/15 hover:to-cyan-500/15 transition px-3 flex items-center justify-center gap-1"
                >
                  <Eye size={14} /> {t('details')}
                </button>
                {goal.currentSaved === 0 && goal.status !== "completed" && (
                  <button
                    onClick={() => deleteGoal(goal._id)}
                    className="py-2 px-3 rounded-lg border border-red-500/30 bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-500 text-xs sm:text-sm font-semibold hover:from-red-500/15 hover:to-rose-500/15 transition flex items-center justify-center gap-1"
                  >
                    <Trash2 size={14} /> {t('delete')}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info Note */}
      {goals.length > 0 && (
        <div className="mt-6 p-3 sm:p-4 bg-primary/5 border border-primary/15 rounded-xl">
          <div className="flex gap-3">
            <Info size={16} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] sm:text-xs text-foreground/60 leading-relaxed">
              <span className="font-semibold">{t('proTip')}</span> {t('proTipText')}
            </p>
          </div>
        </div>
      )}

      {/* Goal Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedGoal && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 rounded-t-2xl z-10">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {getGoalIcon(selectedGoal.goalType)}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                          {selectedGoal.goalName}
                        </h3>
                        <p className="text-sm text-foreground/60">
                          {getGoalTypeName(selectedGoal.goalType)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                          selectedGoal.status
                        )}`}
                      >
                        {getStatusIcon(selectedGoal.status)}
                        {selectedGoal.status === "active"
                          ? t('active')
                          : selectedGoal.status === "paused"
                          ? t('paused')
                          : t('completed')}
                      </span>
                      {selectedGoal.islamicMode && (
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                          <Star size={12} /> {t('ribaFree')}
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                {/* Progress Section */}
                <div className="bg-primary/5 rounded-xl p-4 sm:p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-foreground/70">
                      {t('overallProgress')}
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      {selectedGoal.progress || 0}%
                    </span>
                  </div>
                  <div className="h-2 sm:h-3 bg-border rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getGoalColor(selectedGoal.goalType)} transition-all duration-500`}
                      style={{ width: `${selectedGoal.progress || 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-foreground/60">{t('currentSaved')}</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(selectedGoal.currentSaved || 0)} / {formatCurrency(selectedGoal.targetAmount)}
                    </span>
                  </div>
                </div>

                {/* Key Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet size={18} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        {t('monthlyDepositLabel')}
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">
                      {formatCurrency(selectedGoal.monthlyDeposit)}
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">{t('perMonth')}</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={18} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        {t('targetAmount')}
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">
                      {formatCurrency(selectedGoal.targetAmount)}
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">{t('totalGoal')}</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={18} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        {t('targetDate')}
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-foreground">
                      {formatDate(selectedGoal.targetDate)}
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">{t('expectedCompletion')}</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={18} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        {t('estimatedCompletion')}
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-foreground">
                      {calculateEstimatedCompletion(selectedGoal)}
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">
                      {t('monthsRemaining', { months: calculateRemainingMonths(selectedGoal) })}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {selectedGoal.description && (
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info size={18} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        {t('description')}
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                      {selectedGoal.description}
                    </p>
                  </div>
                )}

                {/* Timeline Info */}
                <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={18} className="text-primary" />
                    <span className="text-sm font-semibold text-foreground">{t('journeyTimeline')}</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">{t('started')}</span>
                      <span className="font-medium text-foreground">
                        {new Date(selectedGoal.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {selectedGoal.estimatedCompletionDate && (
                      <div className="flex justify-between">
                        <span className="text-foreground/60">{t('estimatedCompletionDate')}</span>
                        <span className="font-medium text-foreground">
                          {new Date(selectedGoal.estimatedCompletionDate).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-foreground/60">{t('duration')}</span>
                      <span className="font-medium text-foreground">
                        {selectedGoal.durationInMonths} {t('months')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-3 text-center">
                    <Target size={24} className="mx-auto mb-1 text-green-500" />
                    <div className="text-xs text-foreground/60">{t('monthlyProgress')}</div>
                    <div className="text-sm font-bold text-green-500">
                      {t('perMonthProgress', { percent: Math.round((selectedGoal.monthlyDeposit / selectedGoal.targetAmount) * 100) })}
                    </div>
                  </div>
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-3 text-center">
                    <Clock size={24} className="mx-auto mb-1 text-blue-500" />
                    <div className="text-xs text-foreground/60">{t('toReachTarget')}</div>
                    <div className="text-sm font-bold text-blue-500">
                      {calculateRemainingMonths(selectedGoal)} {t('months')}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4 sm:p-6 rounded-b-2xl z-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-cyan-500/10 text-primary font-semibold hover:border-primary hover:from-primary/15 hover:to-cyan-500/15 transition text-sm sm:text-base"
                  >
                    {t('close')}
                  </button>
                  <Link
                    href={`/dashboard/submit?goalId=${selectedGoal._id}`}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl bg-[linear-gradient(135deg,#059669,#0891b2)] text-white font-semibold shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/25 transition text-center text-sm sm:text-base"
                  >
                    {t('makeDeposit')}
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Goal Modal */}
      <AnimatePresence>
        {showGoalModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => !submitting && setShowGoalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 rounded-t-2xl z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                      <Target size={20} /> {t('createNewGoal')}
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                      {t('createSubtitle')}
                    </p>
                  </div>
                  <button
                    onClick={() => !submitting && setShowGoalModal(false)}
                    disabled={submitting}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition shrink-0 disabled:opacity-50"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Goal Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-2 sm:mb-3">
                    {t('goalType')}
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                    {goalTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => !submitting && setSelectedGoalType(type.value)}
                        disabled={submitting}
                        className={`p-2 sm:p-3 rounded-xl border-2 text-center transition-all ${
                          selectedGoalType === type.value
                            ? "border-primary bg-gradient-to-r from-primary/10 to-cyan-500/10 shadow-md"
                            : "border-border hover:border-primary/50 hover:bg-gradient-to-r hover:from-primary/5 hover:to-cyan-500/5"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="flex justify-center mb-1 text-primary">
                          {type.icon}
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold">
                          {type.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    {t('goalName')}
                  </label>
                  <input
                    type="text"
                    name="goalName"
                    value={formData.goalName}
                    onChange={handleInputChange}
                    disabled={submitting}
                    placeholder={t('goalNamePlaceholder')}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                {/* Target Amount & Monthly Deposit */}
{/* Target Amount & Monthly Deposit */}
<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
  <div>
    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
      <Target size={14} className="inline mr-1" /> {t('targetAmountLabel')}
    </label>
    <div className="relative">
      <span className="absolute left-3  top-1/2 -translate-y-1/2 text-foreground/50">
        ৳    
      </span>
<input
  type="number"
  name="targetAmount"
  value={formData.targetAmount}
  onChange={handleInputChange}
  disabled={submitting}
  placeholder="20000"
  className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
  style={{ paddingLeft: '2rem' }}  
/>
    </div>
  </div>
  <div>
    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
      <Wallet size={14} className="inline mr-1" /> {t('monthlyDepositLabelForm')}
    </label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">
        ৳
      </span>
      <input
        type="number"
        name="monthlyDeposit"
        value={formData.monthlyDeposit}
        onChange={handleInputChange}
        disabled={submitting}
        placeholder="   5000"  
        className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
        style={{ paddingLeft: '2rem' }}  
      />
    </div>
  </div>
</div>

                {/* Target Date */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    <Calendar size={14} className="inline mr-1" /> {t('targetDateLabel')}
                  </label>
                  <input
                    type="month"
                    name="targetDate"
                    value={formData.targetDate}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                {/* Auto Calculation Display */}
                {(calculations.monthsNeeded || calculations.monthlyNeeded) && (
                  <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl">
                    <div className="flex items-center gap-2 mb-2">
                      <TrendingUp size={16} className="text-primary" />
                      <span className="text-sm font-semibold text-foreground">
                        {t('calculation')}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm">
                      {calculations.monthlyNeeded > 0 && (
                        <div className="flex justify-between">
                          <span className="text-foreground/60">
                            {t('monthlyDepositNeeded')}
                          </span>
                          <span className="font-semibold text-primary">
                            ৳{calculations.monthlyNeeded.toLocaleString()}
                          </span>
                        </div>
                      )}
                      {calculations.monthsNeeded > 0 && (
                        <div className="flex justify-between">
                          <span className="text-foreground/60">
                            {t('timeNeeded')}
                          </span>
                          <span className="font-semibold text-primary">
                            {calculations.monthsNeeded} {t('months')}
                          </span>
                        </div>
                      )}
                      {calculations.completionMonthName && (
                        <div className="flex justify-between">
                          <span className="text-foreground/60">
                            {t('completionMonth')}
                          </span>
                          <span className="font-semibold text-primary">
                            {calculations.completionMonthName} {calculations.completionYear}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    {t('descriptionOptional')}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={submitting}
                    rows={3}
                    placeholder={t('descriptionPlaceholder')}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                {/* Islamic Mode Toggle */}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-primary/5 border border-primary/15 rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Star size={24} className="text-primary" />
                    <div>
                      <div className="font-semibold text-foreground text-sm sm:text-base">
                        {t('ribaFreeMode')}
                      </div>
                      <p className="text-[10px] sm:text-xs text-foreground/50">
                        {t('ribaFreeDesc')}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        islamicMode: !prev.islamicMode,
                      }))
                    }
                    disabled={submitting}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      formData.islamicMode ? "bg-primary" : "bg-border"
                    } disabled:opacity-50`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.islamicMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4 sm:p-6 rounded-b-2xl z-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowGoalModal(false)}
                    disabled={submitting}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl border border-red-500/25 bg-gradient-to-r from-red-500/10 to-rose-500/10 text-red-500 font-semibold hover:border-red-500/50 hover:from-red-500/15 hover:to-rose-500/15 transition text-sm sm:text-base order-2 sm:order-1 disabled:opacity-50"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={createGoal}
                    disabled={submitting}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl bg-[linear-gradient(135deg,#059669,#0891b2)] text-white font-semibold shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-emerald-600/25 transition flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2 disabled:opacity-50 disabled:hover:translate-y-0"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {t('creating')}
                      </>
                    ) : (
                      <>
                        <CheckCircle size={16} />
                        {t('createGoal')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyGoalsPage;
