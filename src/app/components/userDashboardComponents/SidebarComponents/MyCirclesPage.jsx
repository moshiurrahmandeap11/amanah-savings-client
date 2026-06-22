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
  Link2,
  Copy,
  Check,
  Trash2,
  Pencil,
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
    joined: "Joined!",
    join: "Join",
    pending: "Pending",
    joinRequestPending: "Join request pending admin approval",
    
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
    targetPlaceholder: "e.g. 100000",
    maxMembers: "Max Members",
    custom: "Custom",
    minDeposit: "Minimum Monthly Deposit (৳)",
    minDepositPlaceholder: "e.g. 2000",
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
    
    // Invite Modal
    inviteLink: "Invite Link",
    shareLink: "Share this link with friends to join:",
    inviteCode: "Invite Code",
    expires: "Expires",
    inviteExpiryWarning: "⚠️ This invite link will expire in 7 days. Only circle admins can generate new links.",
    done: "Done",
    generating: "Generating...",
    
    // Delete
    deleteCircle: "Delete Circle?",
    deleteCircleWarning: "Are you sure you want to delete <strong>{name}</strong>?<br/>This action cannot be undone and will remove all members.",
    yesDelete: "Yes, delete it",
    deleted: "Deleted!",
    circleDeleted: "Circle has been deleted successfully.",
    
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
    
    // Copy
    copied: "Copied!",
    inviteLinkCopied: "Invite link copied to clipboard!",
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
    joined: "যোগ দিয়েছেন!",
    join: "যোগ দিন",
    pending: "পেন্ডিং",
    joinRequestPending: "যোগদানের অনুরোধ অ্যাডমিন অনুমোদনের অপেক্ষায় আছে",
    
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
    targetPlaceholder: "যেমন: ১০০০০০",
    maxMembers: "সর্বোচ্চ সদস্য",
    custom: "কাস্টম",
    minDeposit: "ন্যূনতম মাসিক জমা (৳)",
    minDepositPlaceholder: "যেমন: ২০০০",
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
    
    // Invite Modal
    inviteLink: "আমন্ত্রণ লিংক",
    shareLink: "যোগ দিতে বন্ধুদের সাথে এই লিংক শেয়ার করুন:",
    inviteCode: "আমন্ত্রণ কোড",
    expires: "মেয়াদ",
    inviteExpiryWarning: "⚠️ এই আমন্ত্রণ লিংক ৭ দিনের মধ্যে মেয়াদ শেষ হবে। শুধুমাত্র সার্কেল অ্যাডমিন নতুন লিংক তৈরি করতে পারেন।",
    done: "সম্পন্ন",
    generating: "তৈরি হচ্ছে...",
    
    // Delete
    deleteCircle: "সার্কেল ডিলিট করবেন?",
    deleteCircleWarning: "আপনি কি নিশ্চিত যে <strong>{name}</strong> ডিলিট করতে চান?<br/>এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না এবং সকল সদস্যকে সরিয়ে দেবে।",
    yesDelete: "হ্যাঁ, ডিলিট করুন",
    deleted: "ডিলিট করা হয়েছে!",
    circleDeleted: "সার্কেল সফলভাবে ডিলিট করা হয়েছে।",
    
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
    
    // Copy
    copied: "কপি করা হয়েছে!",
    inviteLinkCopied: "আমন্ত্রণ লিংক ক্লিপবোর্ডে কপি করা হয়েছে!",
  }
};

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const MyCirclesPage = () => {
  const [showCircleModal, setShowCircleModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [circleType, setCircleType] = useState("private");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [circles, setCircles] = useState([]);
  const [publicCircles, setPublicCircles] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState("all");
  const [lang, setLang] = useState("en");
  const [isCustomMembers, setIsCustomMembers] = useState(false);
  const [customMembers, setCustomMembers] = useState("");
  const [selectedCircleId, setSelectedCircleId] = useState(null);
  const [inviteLink, setInviteLink] = useState("");
  const [inviteCode, setInviteCode] = useState("");
  const [inviteExpiry, setInviteExpiry] = useState("");
  const [isGeneratingInvite, setIsGeneratingInvite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    circleName: "",
    purpose: "",
    targetAmount: "",
    maxMembers: "10",
    minDeposit: "",
    description: "",
  });

  // Edit circle state
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCircle, setEditingCircle] = useState(null);
  const [editFormData, setEditFormData] = useState({
    circleName: "",
    purpose: "",
    targetAmount: "",
    maxMembers: "",
    minDeposit: "",
    description: "",
    circleType: "private",
  });
  const [editSubmitting, setEditSubmitting] = useState(false);

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

  const memberOptions = [
    { value: "5", label: "5" },
    { value: "10", label: "10" },
    { value: "20", label: "20" },
    { value: "50", label: "50" },
    { value: "custom", label: t('custom') },
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
        params: { purpose: selectedPurpose },
        headers: getAuthHeaders(),
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
      let maxMembersValue = formData.maxMembers;
      if (isCustomMembers && customMembers) {
        maxMembersValue = customMembers;
      }

      const requestData = {
        circleName: formData.circleName,
        purpose: formData.purpose,
        targetAmount: parseFloat(formData.targetAmount),
        minDeposit: parseFloat(formData.minDeposit),
        maxMembers: parseInt(maxMembersValue),
        description: formData.description || null,
        circleType: circleType,
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
        setIsCustomMembers(false);
        setCustomMembers("");
        
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
          const isPending = response.data.data?.status === "pending";
          Swal.fire({
            title: isPending ? t('pending') : t('joined'),
            text: isPending ? t('joinRequestPending') : t('joinedSuccess'),
            icon: isPending ? "info" : "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          });

          setPublicCircles((current) =>
            current.map((circle) =>
              circle._id === circleId
                ? { ...circle, isPending: isPending || circle.isPending, isMember: !isPending || circle.isMember }
                : circle
            )
          );
          
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

  // Edit circle functions
  const openEditModal = (circle) => {
    setEditingCircle(circle);
    setEditFormData({
      circleName: circle.name || circle.circleName || "",
      purpose: circle.purpose || "",
      targetAmount: String(circle.targetAmount || ""),
      maxMembers: String(circle.maxMembers || ""),
      minDeposit: String(circle.minDeposit || ""),
      description: circle.description || "",
      circleType: circle.circleType || "private",
    });
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingCircle(null);
    setEditSubmitting(false);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  };

  const updateCircle = async () => {
    if (!editFormData.circleName.trim()) {
      Swal.fire({
        title: t('error'),
        text: t('enterCircleName'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    setEditSubmitting(true);
    try {
      const payload = {
        circleName: editFormData.circleName,
        purpose: editFormData.purpose,
        targetAmount: parseFloat(editFormData.targetAmount),
        maxMembers: parseInt(editFormData.maxMembers),
        minDeposit: parseFloat(editFormData.minDeposit),
        description: editFormData.description || null,
        circleType: editFormData.circleType,
      };

      const response = await axiosInstance.patch(`/circles/${editingCircle._id}`, payload);

      if (response.data.success) {
        Swal.fire({
          title: t('success'),
          text: "Circle updated successfully",
          icon: "success",
          confirmButtonColor: "#059669",
          timer: 2000,
          showConfirmButton: false,
        });
        closeEditModal();
        await fetchUserCircles();
      }
    } catch (error) {
      console.error("Update circle error:", error);
      Swal.fire({
        title: t('error'),
        text: error.response?.data?.message || "Failed to update circle",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setEditSubmitting(false);
    }
  };

  // Generate invite link
  const generateInvite = async (circleId) => {
    setIsGeneratingInvite(true);
    try {
      const response = await axiosInstance.post(`/circles/${circleId}/invite`);
      if (response.data.success) {
        setInviteLink(response.data.data.inviteLink);
        setInviteCode(response.data.data.inviteCode);
        setInviteExpiry(new Date(response.data.data.expiryDate).toLocaleDateString());
        setSelectedCircleId(circleId);
        setShowInviteModal(true);
      }
    } catch (error) {
      console.error("Generate invite error:", error);
      Swal.fire({
        title: t('error'),
        text: error.response?.data?.message || "Failed to generate invite link",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setIsGeneratingInvite(false);
    }
  };

  // Copy invite link
  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    Swal.fire({
      title: t('copied'),
      text: t('inviteLinkCopied'),
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  };

  // Delete circle
  const deleteCircle = async (circleId, circleName) => {
    const result = await Swal.fire({
      title: t('deleteCircle'),
      html: t('deleteCircleWarning', { name: circleName }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t('yesDelete'),
      cancelButtonText: t('cancel'),
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/circles/${circleId}`);
        if (response.data.success) {
          Swal.fire({
            title: t('deleted'),
            text: t('circleDeleted'),
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          await fetchUserCircles();
        }
      } catch (error) {
        console.error("Delete circle error:", error);
        Swal.fire({
          title: t('error'),
          text: error.response?.data?.message || "Failed to delete circle",
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

  const handleMemberChange = (e) => {
    const value = e.target.value;
    if (value === "custom") {
      setIsCustomMembers(true);
      setFormData(prev => ({ ...prev, maxMembers: "" }));
    } else {
      setIsCustomMembers(false);
      setFormData(prev => ({ ...prev, maxMembers: value }));
      setCustomMembers("");
    }
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
        <div className="flex flex-col min-[420px]:flex-row gap-3 w-full sm:w-auto">
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
          <div className="flex flex-col min-[420px]:flex-row gap-3 justify-center">
            <button
              onClick={() => setShowCircleModal(true)}
              className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition inline-flex items-center justify-center gap-2"
            >
              <Plus size={18} /> {t('createCircle')}
            </button>
            <button
              onClick={() => setShowJoinModal(true)}
              className="px-6 py-2.5 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20 transition inline-flex items-center justify-center gap-2"
            >
              <Search size={18} /> {t('joinCircle')}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {circles.map((circle, idx) => (
            <motion.div
              key={circle._id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer group min-w-0"
            >
              {/* Circle Header with Actions */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r from-primary/10 to-primary-light/10 flex items-center justify-center text-primary group-hover:scale-110 transition shrink-0`}
                  >
                    <Users size={24} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-bold text-foreground text-sm sm:text-base leading-snug break-words">{circle.name}</h3>
                    <p className="text-[10px] sm:text-xs text-foreground/50 break-words">{circle.type}</p>
                  </div>
                </div>
                <div className="flex gap-1 justify-end shrink-0">
                  {/* Show edit button for circle admin */}
                  {circle.membersList?.some(m => m.user && m.role === "admin") && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditModal(circle);
                      }}
                      className="w-8 h-8 rounded-lg hover:bg-blue-500/10 transition text-foreground/50 hover:text-blue-500 flex items-center justify-center"
                      title="Edit Circle"
                    >
                      <Pencil size={14} />
                    </button>
                  )}
                  {/* Show invite button only for private circles */}
                  {circle.circleType === "private" && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        generateInvite(circle._id);
                      }}
                      disabled={isGeneratingInvite}
                      className="w-8 h-8 rounded-lg hover:bg-primary/10 transition text-foreground/50 hover:text-primary flex items-center justify-center disabled:opacity-50"
                      title="Generate Invite Link"
                    >
                      {isGeneratingInvite ? (
                        <Loader2 size={14} className="animate-spin" />
                      ) : (
                        <Link2 size={14} />
                      )}
                    </button>
                  )}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCircle(circle._id, circle.name);
                    }}
                    className="w-8 h-8 rounded-lg hover:bg-red-500/10 transition text-foreground/50 hover:text-red-500 flex items-center justify-center"
                    title="Delete Circle"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              {/* Circle Stats */}
              <div className="grid grid-cols-1 min-[380px]:grid-cols-3 gap-2 sm:gap-3 mb-4">
                <div className="text-center p-2.5 bg-background rounded-lg min-w-0">
                  <div className="text-base sm:text-lg font-bold text-primary break-words leading-tight">{circle.members}</div>
                  <div className="text-[10px] text-foreground/50 leading-tight">{t('members')}</div>
                </div>
                <div className="text-center p-2.5 bg-background rounded-lg min-w-0">
                  <div className="text-base sm:text-lg font-bold text-primary break-words leading-tight">{circle.totalPool}</div>
                  <div className="text-[10px] text-foreground/50 leading-tight">{t('totalPool')}</div>
                </div>
                <div className="text-center p-2.5 bg-background rounded-lg min-w-0">
                  <div className="text-base sm:text-lg font-bold text-primary break-words leading-tight">{circle.nextPayout}</div>
                  <div className="text-[10px] text-foreground/50 leading-tight">{t('nextPayout')}</div>
                </div>
              </div>

              <Link href={`/dashboard/circles/${circle._id}`}>
                <button className="w-full min-h-10 px-3 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs sm:text-sm font-semibold hover:opacity-90 transition whitespace-normal leading-snug">
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
                        placeholder={t('targetPlaceholder')}
                        className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                        style={{ paddingLeft: '2rem' }}  
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      <Users size={14} className="inline mr-1" /> {t('maxMembers')}
                    </label>
                    <div className="flex gap-2">
                      <select
                        name="maxMembers"
                        value={isCustomMembers ? "custom" : formData.maxMembers}
                        onChange={handleMemberChange}
                        disabled={submitting}
                        className="flex-1 p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                      >
                        {memberOptions.map(opt => (
                          <option key={opt.value} value={opt.value}>
                            {opt.label}
                          </option>
                        ))}
                      </select>
                      {isCustomMembers && (
                        <input
                          type="number"
                          value={customMembers}
                          onChange={(e) => setCustomMembers(e.target.value)}
                          placeholder="Number"
                          min="1"
                          className="w-24 p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                        />
                      )}
                    </div>
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
                      placeholder={t('minDepositPlaceholder')}
                      className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                      style={{ paddingLeft: '2rem' }}  
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
                        : t('noPurposeCircles').replace('{purpose}', t(selectedPurpose))}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {publicCircles.map((circle) => (
                      <motion.div
                        key={circle._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition min-w-0"
                      >
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className="flex items-start gap-3 min-w-0 flex-1">
                            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                              <Users size={20} />
                            </div>
                            <div className="min-w-0 flex-1">
                              <h4 className="font-bold text-foreground break-words leading-snug">{circle.name}</h4>
                              <p className="text-xs text-foreground/50 break-words">{circle.purpose}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => joinCircle(circle._id)}
                            disabled={circle.isMember || circle.isPending}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                              circle.isMember
                                ? "bg-emerald-100 text-emerald-700 cursor-default"
                                : circle.isPending
                                ? "bg-amber-100 text-amber-700 cursor-default"
                                : "bg-primary text-white hover:opacity-90"
                            }`}
                          >
                            {circle.isMember ? t('joined') : circle.isPending ? t('pending') : t('join')}
                          </button>
                        </div>
                        <div className="grid grid-cols-1 min-[380px]:grid-cols-3 gap-2 text-center text-xs">
                          <div className="min-w-0 bg-background rounded-lg p-2">
                            <div className="font-bold text-primary break-words">{circle.members}/{circle.maxMembers}</div>
                            <div className="text-foreground/50">{t('members')}</div>
                          </div>
                          <div className="min-w-0 bg-background rounded-lg p-2">
                            <div className="font-bold text-primary break-words">{circle.totalPool}</div>
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
                        {circle.isPending && (
                          <div className="mt-2 rounded-lg border border-amber-500/20 bg-amber-500/10 px-3 py-2 text-xs font-semibold text-amber-700">
                            {t('joinRequestPending')}
                          </div>
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

      {/* Invite Modal */}
      <AnimatePresence>
        {showInviteModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4"
            onClick={() => setShowInviteModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-card border border-border rounded-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    <Link2 size={20} className="text-primary" />
                    {t('inviteLink')}
                  </h3>
                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition"
                  >
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div className="bg-background rounded-xl p-4 border border-border">
                    <p className="text-xs text-foreground/50 mb-2">{t('shareLink')}</p>
                    <div className="flex items-center gap-2 bg-card border border-border rounded-lg p-2">
                      <input
                        type="text"
                        value={inviteLink}
                        readOnly
                        className="flex-1 bg-transparent text-sm text-foreground outline-none font-mono"
                      />
                      <button
                        onClick={copyToClipboard}
                        className="p-1.5 rounded-lg hover:bg-primary/10 transition text-primary"
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background rounded-lg p-3 text-center border border-border">
                      <div className="text-xs text-foreground/50">{t('inviteCode')}</div>
                      <div className="text-sm font-bold text-foreground font-mono mt-1">{inviteCode}</div>
                    </div>
                    <div className="bg-background rounded-lg p-3 text-center border border-border">
                      <div className="text-xs text-foreground/50">{t('expires')}</div>
                      <div className="text-sm font-bold text-foreground mt-1">{inviteExpiry}</div>
                    </div>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
                    <p className="text-xs text-amber-600 dark:text-amber-400">
                      {t('inviteExpiryWarning')}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowInviteModal(false)}
                    className="w-full py-2.5 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition"
                  >
                    {t('done')}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Circle Modal */}
      <AnimatePresence>
        {showEditModal && editingCircle && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={closeEditModal}
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
                      <div className="w-8 h-8 rounded-xl bg-blue-500/10 flex items-center justify-center">
                        <Pencil size={16} className="text-blue-500" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">Edit Circle</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/60">
                      Update your circle settings
                    </p>
                  </div>
                  <button
                    onClick={closeEditModal}
                    disabled={editSubmitting}
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
                    Circle Name
                  </label>
                  <input
                    type="text"
                    name="circleName"
                    value={editFormData.circleName}
                    onChange={handleEditInputChange}
                    disabled={editSubmitting}
                    placeholder="e.g., Family Savings Circle"
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Purpose
                  </label>
                  <select
                    name="purpose"
                    value={editFormData.purpose}
                    onChange={handleEditInputChange}
                    disabled={editSubmitting}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                  >
                    <option value="">Select purpose</option>
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
                      <Target size={14} className="inline mr-1" /> Target Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">৳</span>
                      <input
                        type="number"
                        name="targetAmount"
                        value={editFormData.targetAmount}
                        onChange={handleEditInputChange}
                        disabled={editSubmitting}
                        placeholder="e.g. 100000"
                        className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      <Users size={14} className="inline mr-1" /> Max Members
                    </label>
                    <input
                      type="number"
                      name="maxMembers"
                      value={editFormData.maxMembers}
                      onChange={handleEditInputChange}
                      disabled={editSubmitting}
                      placeholder="Number"
                      min="1"
                      className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    <Wallet size={14} className="inline mr-1" /> Minimum Monthly Deposit (৳)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">৳</span>
                    <input
                      type="number"
                      name="minDeposit"
                      value={editFormData.minDeposit}
                      onChange={handleEditInputChange}
                      disabled={editSubmitting}
                      placeholder="e.g. 2000"
                      className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-2">
                    Circle Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => !editSubmitting && setEditFormData(prev => ({ ...prev, circleType: "private" }))}
                      disabled={editSubmitting}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        editFormData.circleType === "private"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      } disabled:opacity-50`}
                    >
                      <Lock size={16} className={editFormData.circleType === "private" ? "text-primary" : "text-foreground/50"} />
                      <span className="text-sm font-semibold">{t('private')}</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => !editSubmitting && setEditFormData(prev => ({ ...prev, circleType: "public" }))}
                      disabled={editSubmitting}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        editFormData.circleType === "public"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      } disabled:opacity-50`}
                    >
                      <Globe size={16} className={editFormData.circleType === "public" ? "text-primary" : "text-foreground/50"} />
                      <span className="text-sm font-semibold">{t('public')}</span>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditInputChange}
                    disabled={editSubmitting}
                    rows={3}
                    placeholder="Write about your circle's purpose and rules..."
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none text-sm sm:text-base disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4 sm:p-6 rounded-b-2xl z-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={closeEditModal}
                    disabled={editSubmitting}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl border border-border text-foreground font-semibold hover:border-red-500 hover:text-red-500 transition text-sm sm:text-base order-2 sm:order-1 disabled:opacity-50"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={updateCircle}
                    disabled={editSubmitting}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2 disabled:opacity-50"
                  >
                    {editSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Pencil size={16} />
                        Save Changes
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

export default MyCirclesPage;
