"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Trophy,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
  Filter,
} from "lucide-react";

import Swal from "sweetalert2";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Header
    manageChallenges: "🏆 Manage Challenges",
    manageChallengesDesc: "Create and manage seasonal savings challenges",
    createChallenge: "Create Challenge",
    
    // Statistics
    totalChallenges: "Total Challenges",
    totalParticipants: "Total Participants",
    completed: "Completed",
    mostPopular: "Most Popular",
    active: "Active",
    challengers: "Challengers",
    
    // Filters
    searchChallenges: "Search challenges...",
    all: "All",
    allStatus: "All",
    upcoming: "Upcoming",
    cancelled: "Cancelled",
    
    // Messages
    noChallengesFound: "No challenges found",
    createFirstChallenge: "Create your first challenge",
    error: "Error!",
    success: "Success!",
    failedToLoad: "Failed to load challenges",
    challengeUpdated: "Challenge updated successfully",
    challengeCreated: "Challenge created successfully",
    failedToSave: "Failed to save challenge",
    deleteChallenge: "Delete Challenge?",
    deleteConfirm: "Are you sure you want to delete <strong>{name}</strong>?<br/>This will also remove all participant data.",
    yesDelete: "Yes, delete it!",
    deleted: "Deleted!",
    challengeDeleted: "Challenge has been deleted.",
    failedToDelete: "Failed to delete challenge",
    updated: "Updated!",
    statusChanged: "Challenge status changed to {status}",
    failedToUpdate: "Failed to update status",
    
    // Modal
    editChallenge: "Edit Challenge",
    createNewChallenge: "Create New Challenge",
    updateChallengeDetails: "Update challenge details",
    addNewChallenge: "Add a new savings challenge",
    challengeName: "Challenge Name *",
    challengeNamePlaceholder: "e.g., Ramadan Challenge",
    description: "Description *",
    descriptionPlaceholder: "Describe the challenge...",
    icon: "Icon",
    gradient: "Gradient",
    startDate: "Start Date *",
    endDate: "End Date *",
    days: "Days",
    daysPlaceholder: "Auto-calculated if empty",
    periodDisplay: "Period Display",
    periodPlaceholder: "e.g., May 2 – June 10, 2026",
    maxReward: "Max Reward",
    maxRewardPlaceholder: "e.g., ৳8,700 or 14%",
    status: "Status",
    rewardDescription: "Reward Description",
    rewardPlaceholder: "e.g., 🏆 Badge + ৳1,000 bonus",
    targetAmount: "Target Amount (Optional)",
    targetPlaceholder: "Total savings target",
    dailyTarget: "Daily Target (Optional)",
    dailyPlaceholder: "Daily savings amount",
    cancel: "Cancel",
    updateChallenge: "Update Challenge",
    createChallengeBtn: "Create Challenge",
    
    // Status Badges
    activeStatus: "Active",
    upcomingStatus: "Upcoming",
    completedStatus: "Completed",
    cancelledStatus: "Cancelled",
    
    // Buttons
    edit: "Edit",
    delete: "Delete",
    activate: "Activate",
    markComplete: "Mark Complete",
    cancel: "Cancel",
    view: "View",
    
    // Validation
    fillRequiredFields: "Please fill all required fields",
  },
  bn: {
    // Header
    manageChallenges: "🏆 চ্যালেঞ্জ ব্যবস্থাপনা",
    manageChallengesDesc: "মৌসুমি সঞ্চয় চ্যালেঞ্জ তৈরি ও পরিচালনা করুন",
    createChallenge: "চ্যালেঞ্জ তৈরি করুন",
    
    // Statistics
    totalChallenges: "মোট চ্যালেঞ্জ",
    totalParticipants: "মোট অংশগ্রহণকারী",
    completed: "সমাপ্ত",
    mostPopular: "সর্বাধিক জনপ্রিয়",
    active: "সক্রিয়",
    challengers: "অংশগ্রহণকারী",
    
    // Filters
    searchChallenges: "চ্যালেঞ্জ খুঁজুন...",
    all: "সব",
    allStatus: "সব",
    upcoming: "আসন্ন",
    cancelled: "বাতিল",
    
    // Messages
    noChallengesFound: "কোন চ্যালেঞ্জ পাওয়া যায়নি",
    createFirstChallenge: "আপনার প্রথম চ্যালেঞ্জ তৈরি করুন",
    error: "ত্রুটি!",
    success: "সফল!",
    failedToLoad: "চ্যালেঞ্জ লোড করতে ব্যর্থ হয়েছে",
    challengeUpdated: "চ্যালেঞ্জ সফলভাবে আপডেট করা হয়েছে",
    challengeCreated: "চ্যালেঞ্জ সফলভাবে তৈরি করা হয়েছে",
    failedToSave: "চ্যালেঞ্জ সংরক্ষণ করতে ব্যর্থ হয়েছে",
    deleteChallenge: "চ্যালেঞ্জ ডিলিট করবেন?",
    deleteConfirm: "আপনি কি নিশ্চিত যে <strong>{name}</strong> ডিলিট করতে চান?<br/>এতে সমস্ত অংশগ্রহণকারীর তথ্যও মুছে যাবে।",
    yesDelete: "হ্যাঁ, ডিলিট করুন!",
    deleted: "ডিলিট করা হয়েছে!",
    challengeDeleted: "চ্যালেঞ্জ ডিলিট করা হয়েছে।",
    failedToDelete: "চ্যালেঞ্জ ডিলিট করতে ব্যর্থ হয়েছে",
    updated: "আপডেট করা হয়েছে!",
    statusChanged: "চ্যালেঞ্জের অবস্থা পরিবর্তন করা হয়েছে {status}",
    failedToUpdate: "অবস্থা পরিবর্তন করতে ব্যর্থ হয়েছে",
    
    // Modal
    editChallenge: "চ্যালেঞ্জ সম্পাদনা",
    createNewChallenge: "নতুন চ্যালেঞ্জ তৈরি",
    updateChallengeDetails: "চ্যালেঞ্জের বিবরণ আপডেট করুন",
    addNewChallenge: "একটি নতুন সঞ্চয় চ্যালেঞ্জ যোগ করুন",
    challengeName: "চ্যালেঞ্জের নাম *",
    challengeNamePlaceholder: "যেমন: রমজান চ্যালেঞ্জ",
    description: "বিবরণ *",
    descriptionPlaceholder: "চ্যালেঞ্জের বিবরণ লিখুন...",
    icon: "আইকন",
    gradient: "গ্রেডিয়েন্ট",
    startDate: "শুরুর তারিখ *",
    endDate: "শেষের তারিখ *",
    days: "দিন",
    daysPlaceholder: "খালি থাকলে স্বয়ংক্রিয় গণনা",
    periodDisplay: "সময়কাল প্রদর্শন",
    periodPlaceholder: "যেমন: ২ মে – ১০ জুন, ২০২৬",
    maxReward: "সর্বোচ্চ পুরস্কার",
    maxRewardPlaceholder: "যেমন: ৳৮,৭০০ অথবা ১৪%",
    status: "অবস্থা",
    rewardDescription: "পুরস্কারের বিবরণ",
    rewardPlaceholder: "যেমন: 🏆 ব্যাজ + ৳১,০০০ বোনাস",
    targetAmount: "লক্ষ্যমাত্রা (ঐচ্ছিক)",
    targetPlaceholder: "মোট সঞ্চয় লক্ষ্য",
    dailyTarget: "দৈনিক লক্ষ্য (ঐচ্ছিক)",
    dailyPlaceholder: "দৈনিক সঞ্চয়ের পরিমাণ",
    cancel: "বাতিল",
    updateChallenge: "চ্যালেঞ্জ আপডেট",
    createChallengeBtn: "চ্যালেঞ্জ তৈরি",
    
    // Status Badges
    activeStatus: "সক্রিয়",
    upcomingStatus: "আসন্ন",
    completedStatus: "সমাপ্ত",
    cancelledStatus: "বাতিল",
    
    // Buttons
    edit: "সম্পাদনা",
    delete: "ডিলিট",
    activate: "সক্রিয় করুন",
    markComplete: "সমাপ্ত চিহ্নিত",
    cancel: "বাতিল",
    view: "দেখুন",
    
    // Validation
    fillRequiredFields: "সব প্রয়োজনীয় ঘর পূরণ করুন",
  }
};

const AdminChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [lang, setLang] = useState("bn");
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "🏆",
    bgGradient: "from-primary to-primary-light",
    period: "",
    startDate: "",
    endDate: "",
    days: "",
    maxReward: "",
    reward: "",
    targetAmount: "",
    dailyTarget: "",
    status: "upcoming",
  });
  const [statistics, setStatistics] = useState({
    challenges: { total: 0, active: 0, upcoming: 0, completed: 0 },
    participants: { total: 0, active: 0, completed: 0 },
    totalSaved: "৳0",
    mostPopular: "N/A",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const gradientOptions = [
    "from-primary to-primary-light",
    "from-indigo-900 to-blue-900",
    "from-amber-700 to-amber-800",
    "from-purple-700 to-primary",
    "from-red-600 to-amber-500",
    "from-indigo-600 to-purple-700",
    "from-cyan-600 to-primary",
    "from-green-600 to-emerald-600",
    "from-pink-600 to-rose-600",
  ];

  const iconOptions = ["🏆", "🌙", "🔥", "🎉", "💯", "🎓", "🌸", "🎄", "❄️", "⭐", "💪", "🎯"];

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "bn";
    setLang(savedLang);
  }, []);

  // Fetch challenges
  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/challenges");
      if (response.data.success) {
        setChallenges(response.data.data.challenges);
        setStatistics(response.data.data.statistics);
      }
    } catch (error) {
      console.error("Fetch challenges error:", error);
      Swal.fire({
        title: t('error'),
        text: t('failedToLoad'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      const response = await axiosInstance.get("/challenges/admin/statistics");
      if (response.data.success) {
        setStatistics(response.data.data);
      }
    } catch (error) {
      console.error("Fetch statistics error:", error);
    }
  };

  useEffect(() => {
    fetchChallenges();
    fetchStatistics();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "🏆",
      bgGradient: "from-primary to-primary-light",
      period: "",
      startDate: "",
      endDate: "",
      days: "",
      maxReward: "",
      reward: "",
      targetAmount: "",
      dailyTarget: "",
      status: "upcoming",
    });
    setEditingChallenge(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (challenge) => {
    setEditingChallenge(challenge);
    setFormData({
      name: challenge.name,
      description: challenge.description,
      icon: challenge.icon,
      bgGradient: challenge.bgGradient,
      period: challenge.period || "",
      startDate: challenge.startDate ? challenge.startDate.split("T")[0] : "",
      endDate: challenge.endDate ? challenge.endDate.split("T")[0] : "",
      days: challenge.days,
      maxReward: challenge.maxReward,
      reward: challenge.reward,
      targetAmount: challenge.targetAmount || "",
      dailyTarget: challenge.dailyTarget || "",
      status: challenge.status,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.description || !formData.startDate || !formData.endDate) {
      Swal.fire({
        title: t('error'),
        text: t('fillRequiredFields'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    try {
      let response;
      if (editingChallenge) {
        response = await axiosInstance.put(`/challenges/admin/${editingChallenge._id}`, formData);
      } else {
        response = await axiosInstance.post("/challenges/admin/create", formData);
      }

      if (response.data.success) {
        Swal.fire({
          title: t('success'),
          text: editingChallenge ? t('challengeUpdated') : t('challengeCreated'),
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setShowModal(false);
        resetForm();
        fetchChallenges();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Submit challenge error:", error);
      Swal.fire({
        title: t('error'),
        text: error.response?.data?.message || t('failedToSave'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  const deleteChallenge = async (challenge) => {
    const result = await Swal.fire({
      title: t('deleteChallenge'),
      html: t('deleteConfirm', { name: challenge.name }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t('yesDelete'),
      cancelButtonText: t('cancel'),
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/challenges/admin/${challenge._id}`);
        if (response.data.success) {
          Swal.fire({
            title: t('deleted'),
            text: t('challengeDeleted'),
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          fetchChallenges();
          fetchStatistics();
        }
      } catch (error) {
        console.error("Delete challenge error:", error);
        Swal.fire({
          title: t('error'),
          text: error.response?.data?.message || t('failedToDelete'),
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const updateChallengeStatus = async (challenge, newStatus) => {
    try {
      const response = await axiosInstance.patch(`/challenges/admin/${challenge._id}/status`, {
        status: newStatus,
      });
      if (response.data.success) {
        Swal.fire({
          title: t('updated'),
          text: t('statusChanged', { status: newStatus }),
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchChallenges();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Update status error:", error);
      Swal.fire({
        title: t('error'),
        text: error.response?.data?.message || t('failedToUpdate'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      active: { icon: "🔴", text: t('activeStatus'), class: "bg-green-500/10 text-green-500 border-green-500/20" },
      upcoming: { icon: "📅", text: t('upcomingStatus'), class: "bg-amber-500/10 text-amber-500 border-amber-500/20" },
      completed: { icon: "✅", text: t('completedStatus'), class: "bg-blue-500/10 text-blue-500 border-blue-500/20" },
      cancelled: { icon: "❌", text: t('cancelledStatus'), class: "bg-red-500/10 text-red-500 border-red-500/20" },
    };
    return statusMap[status] || statusMap.upcoming;
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || challenge.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">{t('manageChallenges')}</h2>
          <p className="text-sm text-foreground/50 mt-1">
            {t('manageChallengesDesc')}
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition"
        >
          <Plus size={18} />
          {t('createChallenge')}
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-primary" />
            <span className="text-xs text-foreground/50">{t('totalChallenges')}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{statistics.challenges?.total || 0}</div>
          <div className="text-xs text-green-500 mt-1">
            {statistics.challenges?.active || 0} {t('active')}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-amber-500" />
            <span className="text-xs text-foreground/50">{t('totalParticipants')}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{statistics.participants?.total || 0}</div>
          <div className="text-xs text-green-500 mt-1">
            {statistics.participants?.active || 0} {t('active')}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-xs text-foreground/50">{t('completed')}</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{statistics.participants?.completed || 0}</div>
          <div className="text-xs text-foreground/50 mt-1">{t('challengers')}</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-blue-500" />
            <span className="text-xs text-foreground/50">{t('mostPopular')}</span>
          </div>
          <div className="text-sm font-bold text-foreground truncate">{statistics.mostPopular || "N/A"}</div>
          <div className="text-xs text-primary mt-1">{statistics.totalSaved}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
          <input
            type="text"
            placeholder={t('searchChallenges')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {["all", "active", "upcoming", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                statusFilter === status
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {status === "all" ? t('all') : t(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-3">
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <div className="text-4xl mb-3">🏆</div>
            <div className="text-foreground/50">{t('noChallengesFound')}</div>
            <button
              onClick={openCreateModal}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
            >
              {t('createFirstChallenge')}
            </button>
          </div>
        ) : (
          filteredChallenges.map((challenge) => {
            const statusBadge = getStatusBadge(challenge.status);
            
            return (
              <motion.div
                key={challenge._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <div className={`bg-linear-to-r ${challenge.bgGradient || "from-primary to-primary-light"} p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{challenge.icon}</div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{challenge.name}</h3>
                        <p className="text-white/70 text-xs">{challenge.period || "No period set"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusBadge.class}`}>
                        {statusBadge.icon} {statusBadge.text}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{challenge.description}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-background rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-primary">{challenge.participants?.toLocaleString() || 0}</div>
                      <div className="text-[10px] text-foreground/50">{t('totalParticipants')}</div>
                    </div>
                    <div className="bg-background rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-primary">{challenge.days}</div>
                      <div className="text-[10px] text-foreground/50">{t('days')}</div>
                    </div>
                    <div className="bg-background rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-primary">{challenge.completedCount || 0}</div>
                      <div className="text-[10px] text-foreground/50">{t('completed')}</div>
                    </div>
                    <div className="bg-background rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-primary truncate">{challenge.maxReward}</div>
                      <div className="text-[10px] text-foreground/50">{t('maxReward')}</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openEditModal(challenge)}
                      className="px-3 py-1.5 rounded-lg border border-border text-foreground/70 text-xs font-semibold hover:border-primary hover:text-primary transition"
                    >
                      <Edit size={12} className="inline mr-1" />
                      {t('edit')}
                    </button>
                    <button
                      onClick={() => deleteChallenge(challenge)}
                      className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 size={12} className="inline mr-1" />
                      {t('delete')}
                    </button>
                    {challenge.status !== "active" && challenge.status !== "completed" && (
                      <button
                        onClick={() => updateChallengeStatus(challenge, "active")}
                        className="px-3 py-1.5 rounded-lg border border-green-500/30 text-green-500 text-xs font-semibold hover:bg-green-500 hover:text-white transition"
                      >
                        <CheckCircle size={12} className="inline mr-1" />
                        {t('activate')}
                      </button>
                    )}
                    {challenge.status === "active" && (
                      <button
                        onClick={() => updateChallengeStatus(challenge, "completed")}
                        className="px-3 py-1.5 rounded-lg border border-blue-500/30 text-blue-500 text-xs font-semibold hover:bg-blue-500 hover:text-white transition"
                      >
                        <CheckCircle size={12} className="inline mr-1" />
                        {t('markComplete')}
                      </button>
                    )}
                    {challenge.status === "active" && (
                      <button
                        onClick={() => updateChallengeStatus(challenge, "cancelled")}
                        className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500 hover:text-white transition"
                      >
                        <XCircle size={12} className="inline mr-1" />
                        {t('cancel')}
                      </button>
                    )}
                    <button
                      onClick={() => window.open(`/dashboard/challenges/${challenge._id}`, "_blank")}
                      className="px-3 py-1.5 rounded-lg border border-border text-foreground/70 text-xs font-semibold hover:border-primary hover:text-primary transition"
                    >
                      <Eye size={12} className="inline mr-1" />
                      {t('view')}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-card border-b border-border p-5 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {editingChallenge ? t('editChallenge') : t('createNewChallenge')}
                  </h3>
                  <p className="text-sm text-foreground/50">
                    {editingChallenge ? t('updateChallengeDetails') : t('addNewChallenge')}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Basic Info */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">
                    {t('challengeName')}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder={t('challengeNamePlaceholder')}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">
                    {t('description')}
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder={t('descriptionPlaceholder')}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {t('icon')}
                    </label>
                    <select
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {t('gradient')}
                    </label>
                    <select
                      name="bgGradient"
                      value={formData.bgGradient}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    >
                      {gradientOptions.map((gradient) => (
                        <option key={gradient} value={gradient}>
                          {gradient}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {t('startDate')}
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {t('endDate')}
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {t('days')}
                    </label>
                    <input
                      type="number"
                      name="days"
                      value={formData.days}
                      onChange={handleInputChange}
                      placeholder={t('daysPlaceholder')}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {t('periodDisplay')}
                    </label>
                    <input
                      type="text"
                      name="period"
                      value={formData.period}
                      onChange={handleInputChange}
                      placeholder={t('periodPlaceholder')}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {t('maxReward')}
                    </label>
                    <input
                      type="text"
                      name="maxReward"
                      value={formData.maxReward}
                      onChange={handleInputChange}
                      placeholder={t('maxRewardPlaceholder')}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {t('status')}
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    >
                      <option value="upcoming">{t('upcoming')}</option>
                      <option value="active">{t('active')}</option>
                      <option value="completed">{t('completed')}</option>
                      <option value="cancelled">{t('cancelled')}</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">
                    {t('rewardDescription')}
                  </label>
                  <input
                    type="text"
                    name="reward"
                    value={formData.reward}
                    onChange={handleInputChange}
                    placeholder={t('rewardPlaceholder')}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {t('targetAmount')}
                    </label>
                    <input
                      type="number"
                      name="targetAmount"
                      value={formData.targetAmount}
                      onChange={handleInputChange}
                      placeholder={t('targetPlaceholder')}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      {t('dailyTarget')}
                    </label>
                    <input
                      type="number"
                      name="dailyTarget"
                      value={formData.dailyTarget}
                      onChange={handleInputChange}
                      placeholder={t('dailyPlaceholder')}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-card border-t border-border p-5 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/70 font-semibold hover:border-primary transition"
                >
                  {t('cancel')}
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition"
                >
                  {editingChallenge ? t('updateChallenge') : t('createChallengeBtn')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminChallengesPage;