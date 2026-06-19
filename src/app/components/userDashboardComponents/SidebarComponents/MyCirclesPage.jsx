"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Wallet,
  Calendar,
  Plus,
  Info,
  ChevronRight,
  CircleDot,
  X,
  Target,
  Lock,
  Globe,
  Sparkles,
  TrendingUp,
  Shield,
  UserPlus,
  Loader2,
  Heart,
  Star,
  Home,
  GraduationCap,
  Briefcase,
  Plane,
  Gift,
  Search,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

// Translations
const translations = {
  en: {
    // Page Title
    pageTitle: "My Circles",
    pageSubtitle: "Community savings groups — achieve goals together",
    
    // Buttons
    joinCircle: "Join Circle",
    createCircle: "Create Circle",
    viewDetails: "View Details →",
    cancel: "Cancel",
    create: "Create Circle",
    creating: "Creating...",
    join: "Join",
    
    // Empty State
    noCircles: "No Circles Yet",
    noCirclesDesc: "Create or join a circle to start saving together",
    
    // Circle Stats
    members: "Members",
    totalPool: "Total Pool",
    nextPayout: "Next Payout",
    
    // Info Card
    whatIsCircle: "What is a Circle?",
    whatIsCircleDesc: "A Circle is a community savings group where people with the same goals save together. Each month, one member receives a payout from the pool (rotational basis). It's the digital version of Bangladesh's traditional \"Samity\" system.",
    
    // Create Modal
    createNewCircle: "Create New Circle",
    createSubtitle: "Start a group savings circle with friends or family",
    circleName: "Circle Name",
    circleNamePlaceholder: "e.g., Family Savings Circle",
    purpose: "Purpose",
    selectPurpose: "Select purpose",
    targetAmount: "Target Amount",
    maxMembers: "Max Members",
    minDeposit: "Minimum Monthly Deposit (৳)",
    circleType: "Circle Type",
    private: "Private",
    public: "Public",
    privateDesc: "Invite only - You control who joins",
    publicDesc: "Anyone can discover and join this circle",
    descriptionOptional: "Description (Optional)",
    descriptionPlaceholder: "Write about your circle's purpose and rules...",
    membersCount: "{count} members",
    
    // Join Modal
    joinCircleTitle: "Join a Circle",
    joinSubtitle: "Discover and join public circles based on your goals",
    filterByPurpose: "Filter by Purpose",
    all: "All",
    noCirclesFound: "No circles found",
    noPublicCircles: "No public circles available at the moment",
    noPurposeCircles: "No {purpose} circles available right now",
    pool: "Pool",
    minDepositLabel: "Min Deposit",
    
    // Validation
    error: "Error",
    enterCircleName: "Please enter a circle name",
    selectPurposeError: "Please select a purpose",
    validTargetAmount: "Please enter a valid target amount",
    validMinDeposit: "Please enter a valid minimum deposit",
    
    // Success
    success: "Success!",
    circleCreated: "Circle created successfully",
    joined: "Joined!",
    joinedSuccess: "You have successfully joined the circle",
    
    // Modals
    joinCircleConfirm: "Join Circle?",
    joinCircleQuestion: "Are you sure you want to join this circle?",
    joinConfirm: "Yes, join",
    
    // Loading
    loadingCircles: "Loading your circles...",
    
    // Purpose Names
    wedding: "Wedding",
    hajj: "Hajj/Umrah",
    education: "Education",
    home: "Home",
    business: "Business",
    emergency: "Emergency",
    travel: "Travel",
    eid: "Eid",
    general: "General",
  },
  bn: {
    // Page Title
    pageTitle: "আমার সার্কেল",
    pageSubtitle: "কমিউনিটি সঞ্চয় গ্রুপ — একসাথে লক্ষ্য অর্জন করুন",
    
    // Buttons
    joinCircle: "সার্কেলে যোগ দিন",
    createCircle: "সার্কেল তৈরি করুন",
    viewDetails: "বিস্তারিত দেখুন →",
    cancel: "বাতিল",
    create: "সার্কেল তৈরি করুন",
    creating: "তৈরি হচ্ছে...",
    join: "যোগ দিন",
    
    // Empty State
    noCircles: "কোন সার্কেল নেই",
    noCirclesDesc: "একসাথে সঞ্চয় শুরু করতে একটি সার্কেল তৈরি বা যোগ দিন",
    
    // Circle Stats
    members: "সদস্য",
    totalPool: "মোট পুল",
    nextPayout: "পরবর্তী পেআউট",
    
    // Info Card
    whatIsCircle: "সার্কেল কী?",
    whatIsCircleDesc: "সার্কেল হলো একটি কমিউনিটি সঞ্চয় গ্রুপ যেখানে একই লক্ষ্যের মানুষরা একসাথে সঞ্চয় করে। প্রতি মাসে, একজন সদস্য পুল থেকে পেআউট পান (ঘূর্ণনের ভিত্তিতে)। এটি বাংলাদেশের ঐতিহ্যবাহী \"সামিটি\" সিস্টেমের ডিজিটাল সংস্করণ।",
    
    // Create Modal
    createNewCircle: "নতুন সার্কেল তৈরি করুন",
    createSubtitle: "পরিবার বা বন্ধুদের সাথে একটি গ্রুপ সঞ্চয় সার্কেল শুরু করুন",
    circleName: "সার্কেলের নাম",
    circleNamePlaceholder: "যেমন: পরিবার সঞ্চয় সার্কেল",
    purpose: "উদ্দেশ্য",
    selectPurpose: "উদ্দেশ্য নির্বাচন করুন",
    targetAmount: "লক্ষ্যমাত্রার পরিমাণ",
    maxMembers: "সর্বোচ্চ সদস্য",
    minDeposit: "ন্যূনতম মাসিক জমা (৳)",
    circleType: "সার্কেলের ধরন",
    private: "প্রাইভেট",
    public: "পাবলিক",
    privateDesc: "শুধুমাত্র আমন্ত্রণে - আপনি কে যোগ দিতে পারে তা নিয়ন্ত্রণ করেন",
    publicDesc: "যে কেউ এই সার্কেল আবিষ্কার এবং যোগ দিতে পারে",
    descriptionOptional: "বর্ণনা (ঐচ্ছিক)",
    descriptionPlaceholder: "আপনার সার্কেলের উদ্দেশ্য এবং নিয়ম সম্পর্কে লিখুন...",
    membersCount: "{count} সদস্য",
    
    // Join Modal
    joinCircleTitle: "একটি সার্কেলে যোগ দিন",
    joinSubtitle: "আপনার লক্ষ্যের ভিত্তিতে পাবলিক সার্কেল আবিষ্কার এবং যোগ দিন",
    filterByPurpose: "উদ্দেশ্য অনুযায়ী ফিল্টার",
    all: "সব",
    noCirclesFound: "কোন সার্কেল পাওয়া যায়নি",
    noPublicCircles: "এই মুহূর্তে কোন পাবলিক সার্কেল উপলব্ধ নেই",
    noPurposeCircles: "এই মুহূর্তে {purpose} সার্কেল উপলব্ধ নেই",
    pool: "পুল",
    minDepositLabel: "ন্যূনতম জমা",
    
    // Validation
    error: "ত্রুটি",
    enterCircleName: "অনুগ্রহ করে একটি সার্কেলের নাম লিখুন",
    selectPurposeError: "অনুগ্রহ করে একটি উদ্দেশ্য নির্বাচন করুন",
    validTargetAmount: "অনুগ্রহ করে একটি বৈধ লক্ষ্যমাত্রার পরিমাণ লিখুন",
    validMinDeposit: "অনুগ্রহ করে একটি বৈধ ন্যূনতম জমার পরিমাণ লিখুন",
    
    // Success
    success: "সফল!",
    circleCreated: "সার্কেল সফলভাবে তৈরি হয়েছে",
    joined: "যোগ দিয়েছেন!",
    joinedSuccess: "আপনি সফলভাবে সার্কেলে যোগ দিয়েছেন",
    
    // Modals
    joinCircleConfirm: "সার্কেলে যোগ দিবেন?",
    joinCircleQuestion: "আপনি কি এই সার্কেলে যোগ দিতে চান?",
    joinConfirm: "হ্যাঁ, যোগ দিন",
    
    // Loading
    loadingCircles: "আপনার সার্কেল লোড হচ্ছে...",
    
    // Purpose Names
    wedding: "বিয়ে",
    hajj: "হজ/ওমরাহ",
    education: "শিক্ষা",
    home: "ঘর",
    business: "ব্যবসা",
    emergency: "জরুরি",
    travel: "ভ্রমণ",
    eid: "ঈদ",
    general: "সাধারণ",
  }
};

const MyCirclesPage = () => {
  const [showCircleModal, setShowCircleModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [circleType, setCircleType] = useState("private");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [circles, setCircles] = useState([]);
  const [publicCircles, setPublicCircles] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState("all");
  const [lang, setLang] = useState("en");
  const [formData, setFormData] = useState({
    circleName: "",
    purpose: "",
    targetAmount: "",
    maxMembers: "10",
    minDeposit: "",
    description: "",
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

  const purposes = [
    { icon: <Heart size={18} />, name: t('wedding'), value: "wedding" },
    { icon: <Star size={18} />, name: t('hajj'), value: "hajj" },
    { icon: <GraduationCap size={18} />, name: t('education'), value: "education" },
    { icon: <Home size={18} />, name: t('home'), value: "home" },
    { icon: <Briefcase size={18} />, name: t('business'), value: "business" },
    { icon: <Shield size={18} />, name: t('emergency'), value: "emergency" },
    { icon: <Plane size={18} />, name: t('travel'), value: "travel" },
    { icon: <Star size={18} />, name: t('eid'), value: "eid" },
    { icon: <Users size={18} />, name: t('general'), value: "general" },
  ];

  // Fetch user's circles
  const fetchUserCircles = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/circles");
      if (response.data.success) {
        setCircles(response.data.data.circles || []);
      }
    } catch (error) {
      console.error("Fetch circles error:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch public circles
  const fetchPublicCircles = async () => {
    try {
      const response = await axiosInstance.get("/circles/public", {
        params: { purpose: selectedPurpose }
      });
      if (response.data.success) {
        setPublicCircles(response.data.data.circles || []);
      }
    } catch (error) {
      console.error("Fetch public circles error:", error);
    }
  };

  // Create circle
  const createCircle = async () => {
    if (!formData.circleName.trim()) {
      Swal.fire({
        title: t('error'),
        text: t('enterCircleName'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!formData.purpose) {
      Swal.fire({
        title: t('error'),
        text: t('selectPurposeError'),
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

    if (!formData.minDeposit || parseFloat(formData.minDeposit) <= 0) {
      Swal.fire({
        title: t('error'),
        text: t('validMinDeposit'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    setSubmitting(true);

    try {
      const requestData = {
        ...formData,
        targetAmount: parseFloat(formData.targetAmount),
        minDeposit: parseFloat(formData.minDeposit),
        maxMembers: parseInt(formData.maxMembers),
        circleType,
      };

      const response = await axiosInstance.post("/circles", requestData);

      if (response.data.success) {
        Swal.fire({
          title: t('success'),
          text: t('circleCreated'),
          icon: "success",
          confirmButtonColor: "#059669",
          timer: 2000,
          showConfirmButton: false,
        });

        setShowCircleModal(false);
        setFormData({
          circleName: "",
          purpose: "",
          targetAmount: "",
          maxMembers: "10",
          minDeposit: "",
          description: "",
        });
        setCircleType("private");
        
        await fetchUserCircles();
      }
    } catch (error) {
      console.error("Create circle error:", error);
      Swal.fire({
        title: t('error'),
        text: error.response?.data?.message || "Failed to create circle",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Join circle
  const joinCircle = async (circleId) => {
    const result = await Swal.fire({
      title: t('joinCircleConfirm'),
      text: t('joinCircleQuestion'),
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#ef4444",
      confirmButtonText: t('joinConfirm'),
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.post(`/circles/${circleId}/join`);
        
        if (response.data.success) {
          Swal.fire({
            title: t('joined'),
            text: t('joinedSuccess'),
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          });
          
          await fetchUserCircles();
          await fetchPublicCircles();
        }
      } catch (error) {
        console.error("Join circle error:", error);
        Swal.fire({
          title: t('error'),
          text: error.response?.data?.message || "Failed to join circle",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchUserCircles();
  }, []);

  useEffect(() => {
    if (showJoinModal) {
      fetchPublicCircles();
    }
  }, [showJoinModal, selectedPurpose]);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">{t('loadingCircles')}</p>
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
            <Users size={28} /> {t('pageTitle')}
          </h2>
          <p className="text-xs sm:text-sm text-foreground/60 mt-1">
            {t('pageSubtitle')}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowJoinModal(true)}
            className="px-4 sm:px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20 transition w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Search size={18} /> 
            <span>{t('joinCircle')}</span>
          </button>
          <button
            onClick={() => setShowCircleModal(true)}
            className="px-4 sm:px-5 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Plus size={18} /> 
            <span>{t('createCircle')}</span>
          </button>
        </div>
      </div>

      {/* Circles Grid */}
      {circles.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center mb-8">
          <Users size={64} className="text-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">{t('noCircles')}</h3>
          <p className="text-foreground/60 mb-4">
            {t('noCirclesDesc')}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowCircleModal(true)}
              className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
            >
              <Plus size={18} /> {t('createCircle')}
            </button>
            <button
              onClick={() => setShowJoinModal(true)}
              className="px-6 py-2.5 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20 transition inline-flex items-center gap-2"
            >
              <Search size={18} /> {t('joinCircle')}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {circles.map((circle, idx) => (
            <motion.div
              key={circle._id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-primary/10 to-primary-light/10 flex items-center justify-center text-primary group-hover:scale-110 transition`}
                >
                  <Users size={24} />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm sm:text-base">{circle.name}</h3>
                  <p className="text-[10px] sm:text-xs text-foreground/50">{circle.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                <div className="text-center p-2 bg-background rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-primary">{circle.members}</div>
                  <div className="text-[8px] sm:text-[10px] text-foreground/50">{t('members')}</div>
                </div>
                <div className="text-center p-2 bg-background rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-primary">{circle.totalPool}</div>
                  <div className="text-[8px] sm:text-[10px] text-foreground/50">{t('totalPool')}</div>
                </div>
                <div className="text-center p-2 bg-background rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-primary">{circle.nextPayout}</div>
                  <div className="text-[8px] sm:text-[10px] text-foreground/50">{t('nextPayout')}</div>
                </div>
              </div>

              <Link href={`/dashboard/circles/${circle._id}`}>
                <button className="w-full py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs sm:text-sm font-semibold hover:opacity-90 transition">
                  {t('viewDetails')}
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 border border-primary/15 rounded-xl sm:rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <CircleDot size={18} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">{t('whatIsCircle')}</h3>
            <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
              {t('whatIsCircleDesc')}
            </p>
          </div>
        </div>
      </div>

      {/* Create Circle Modal */}
      <AnimatePresence>
        {showCircleModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => !submitting && setShowCircleModal(false)}
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
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Users size={16} className="text-primary" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">{t('createNewCircle')}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/60">
                      {t('createSubtitle')}
                    </p>
                  </div>
                  <button
                    onClick={() => !submitting && setShowCircleModal(false)}
                    disabled={submitting}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition shrink-0 disabled:opacity-50"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    {t('circleName')}
                  </label>
                  <input
                    type="text"
                    name="circleName"
                    value={formData.circleName}
                    onChange={handleInputChange}
                    disabled={submitting}
                    placeholder={t('circleNamePlaceholder')}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    {t('purpose')}
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                  >
                    <option value="">{t('selectPurpose')}</option>
                    {purposes.map(p => (
                      <option key={p.value} value={p.value}>
                        {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      <Target size={14} className="inline mr-1" /> {t('targetAmount')}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">৳</span>
                      <input
                        type="number"
                        name="targetAmount"
                        value={formData.targetAmount}
                        onChange={handleInputChange}
                        disabled={submitting}
                        placeholder="100000"
                        className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      <Users size={14} className="inline mr-1" /> {t('maxMembers')}
                    </label>
                    <select
                      name="maxMembers"
                      value={formData.maxMembers}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                    >
                      <option value="5">5 {t('members')}</option>
                      <option value="10">10 {t('members')}</option>
                      <option value="20">20 {t('members')}</option>
                      <option value="50">50 {t('members')}</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    <Wallet size={14} className="inline mr-1" /> {t('minDeposit')}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">৳</span>
                    <input
                      type="number"
                      name="minDeposit"
                      value={formData.minDeposit}
                      onChange={handleInputChange}
                      disabled={submitting}
                      placeholder="2000"
                      className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-2">
                    {t('circleType')}
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => !submitting && setCircleType("private")}
                      disabled={submitting}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        circleType === "private"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      } disabled:opacity-50`}
                    >
                      <Lock size={16} className={circleType === "private" ? "text-primary" : "text-foreground/50"} />
                      <span className="text-sm font-semibold">{t('private')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => !submitting && setCircleType("public")}
                      disabled={submitting}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        circleType === "public"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      } disabled:opacity-50`}
                    >
                      <Globe size={16} className={circleType === "public" ? "text-primary" : "text-foreground/50"} />
                      <span className="text-sm font-semibold">{t('public')}</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-foreground/50 mt-2">
                    {circleType === "private" ? t('privateDesc') : t('publicDesc')}
                  </p>
                </div>

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
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none text-sm sm:text-base disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4 sm:p-6 rounded-b-2xl z-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowCircleModal(false)}
                    disabled={submitting}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl border border-border text-foreground font-semibold hover:border-red-500 hover:text-red-500 transition text-sm sm:text-base order-2 sm:order-1 disabled:opacity-50"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={createCircle}
                    disabled={submitting}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        {t('creating')}
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} />
                        {t('create')}
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Join Circle Modal */}
      <AnimatePresence>
        {showJoinModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setShowJoinModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 rounded-t-2xl z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Search size={16} className="text-primary" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">{t('joinCircleTitle')}</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/60">
                      {t('joinSubtitle')}
                    </p>
                  </div>
                  <button
                    onClick={() => setShowJoinModal(false)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6">
                {/* Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground/70 mb-2">
                    {t('filterByPurpose')}
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedPurpose("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                        selectedPurpose === "all"
                          ? "bg-primary text-white"
                          : "bg-border text-foreground/70 hover:bg-primary/20"
                      }`}
                    >
                      {t('all')}
                    </button>
                    {purposes.map(p => (
                      <button
                        key={p.value}
                        onClick={() => setSelectedPurpose(p.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center gap-1 ${
                          selectedPurpose === p.value
                            ? "bg-primary text-white"
                            : "bg-border text-foreground/70 hover:bg-primary/20"
                        }`}
                      >
                        {p.icon}
                        <span>{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Public Circles Grid */}
                {publicCircles.length === 0 ? (
                  <div className="text-center py-12">
                    <Search size={64} className="text-foreground/30 mx-auto mb-4" />
                    <h3 className="text-lg font-bold text-foreground mb-2">{t('noCirclesFound')}</h3>
                    <p className="text-foreground/60">
                      {selectedPurpose === "all" 
                        ? t('noPublicCircles')
                        : t('noPurposeCircles').replace('{purpose}', selectedPurpose)}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {publicCircles.map((circle) => (
                      <motion.div
                        key={circle._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                              <Users size={20} />
                            </div>
                            <div>
                              <h4 className="font-bold text-foreground">{circle.name}</h4>
                              <p className="text-xs text-foreground/50">{circle.purpose}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => joinCircle(circle._id)}
                            className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition"
                          >
                            {t('join')}
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div>
                            <div className="font-bold text-primary">{circle.members}/{circle.maxMembers}</div>
                            <div className="text-foreground/50">{t('members')}</div>
                          </div>
                          <div>
                            <div className="font-bold text-primary">{circle.totalPool}</div>
                            <div className="text-foreground/50">{t('pool')}</div>
                          </div>
                          <div>
                            <div className="font-bold text-primary">৳{circle.minDeposit?.toLocaleString()}</div>
                            <div className="text-foreground/50">{t('minDepositLabel')}</div>
                          </div>
                        </div>
                        {circle.description && (
                          <p className="text-xs text-foreground/60 mt-2 line-clamp-2">
                            {circle.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyCirclesPage;