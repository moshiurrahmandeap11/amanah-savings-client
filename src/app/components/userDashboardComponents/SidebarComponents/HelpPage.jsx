"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Moon,
  Sun,
  Search,
  X,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  Loader2,
  MessageCircle,
  Send,
  Ticket,
  Clock,
  CheckCircle,
  AlertCircle,
  FileText,
  User,
  Mail,
  Phone,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useSocket from "../../../hooks/useSocket";

// Translations
const translations = {
  en: {
    // Header
    helpCenter: "🆘 Help Center",
    
    // Hero
    howCanWeHelp: "How can we help you?",
    helpArticles: "help articles",
    searchPlaceholder: "Search help articles... e.g. bKash, password",
    noResults: "No results found",
    
    // System Status
    allSystemsNormal: "All systems normal —",
    allServicesRunning: "All services are running",
    details: "Details →",
    
    // Categories
    browseByTopic: "Browse by topic",
    go: "Go →",
    
    // Category Names (English)
    account: "Account",
    deposits: "Deposits",
    savingsGoals: "Savings Goals",
    kycVerification: "KYC Verification",
    security: "Security",
    plansSubscriptions: "Plans & Subscriptions",
    
    // Category Descriptions (English)
    accountDesc: "Your profile & settings",
    depositsDesc: "Deposit & withdraw money",
    savingsGoalsDesc: "Manage your savings goals",
    kycDesc: "Verify your identity",
    securityDesc: "Change password & PIN",
    plansDesc: "View our plans",
    
    // Popular Articles
    popularQuestions: "Popular questions",
    noArticles: "No articles found",
    
    // Contact
    contactUsDirectly: "Contact us directly",
    supportTicket: "Support Ticket",
    replyWithin24: "Reply within 24 hours",
    email: "Email",
    hotline: "Hotline",
    hotlineHours: "Sat–Thu, 9am–9pm",
    liveChat: "Live Chat",
    online: "Online — Chat now",
    offline: "Offline — Send ticket",
    
    // Ticket Modal
    ticketSubject: "Subject",
    ticketMessage: "Describe your issue",
    submit: "Submit",
    pleaseFillAllFields: "Please fill all fields",
    ticketSubmitted: "Ticket Submitted!",
    ticketReply: "We'll reply within 24 hours",
    failedToSubmit: "Failed to submit ticket",
    
    // Ticket View
    myTickets: "My Tickets",
    noTickets: "No tickets found",
    open: "Open",
    inProgress: "In Progress",
    resolved: "Resolved",
    closed: "Closed",
    ticketDetails: "Ticket Details",
    replies: "Replies",
    noReplies: "No replies yet",
    viewTicket: "View Ticket",
    backToTickets: "Back to Tickets",
    status: "Status",
    priority: "Priority",
    high: "High",
    medium: "Medium",
    low: "Low",
    createdAt: "Created At",
    
    // Chat
    support: "Sanchoy Bondhu Support",
    onlineStatus: "Online",
    offlineStatus: "Offline",
    helloChat: "Hello! How can we help you today?",
    typeMessage: "Type a message...",
    typing: "typing...",
    
    // Article Modal
    helpful: "Helpful",
    needMoreHelp: "Need more help",
    
    // Toast
    error: "Error!",
    success: "Success!",
    thankYou: "Thank You!",
    gladHelpful: "Glad it was helpful!",
    willImprove: "We'll improve this article",
    failedToLoadArticle: "Failed to load article",
    failedToSubmitFeedback: "Failed to submit feedback",
    systemStatus: "System Status",
    allOperational: "All systems operational",
    failedToLoadTickets: "Failed to load tickets",
    ticketReplied: "Reply sent successfully!",
    failedToReply: "Failed to send reply",
    
    // Loading
    loading: "Loading...",
  },
  bn: {
    // Header
    helpCenter: "🆘 সাহায্য কেন্দ্র",
    
    // Hero
    howCanWeHelp: "আমরা কীভাবে সাহায্য করতে পারি?",
    helpArticles: "সাহায্য নিবন্ধ",
    searchPlaceholder: "সাহায্য অনুসন্ধান করুন... যেমন: bKash, পাসওয়ার্ড",
    noResults: "কোন ফলাফল পাওয়া যায়নি",
    
    // System Status
    allSystemsNormal: "সব সিস্টেম স্বাভাবিক —",
    allServicesRunning: "সব সার্ভিস চালু আছে",
    details: "বিস্তারিত →",
    
    // Categories
    browseByTopic: "বিষয় অনুযায়ী ব্রাউজ করুন",
    go: "যান →",
    
    // Category Names (Bengali)
    account: "অ্যাকাউন্ট",
    deposits: "জমা ও উত্তোলন",
    savingsGoals: "সঞ্চয় লক্ষ্য",
    kycVerification: "KYC যাচাই",
    security: "নিরাপত্তা",
    plansSubscriptions: "প্ল্যান ও সাবস্ক্রিপশন",
    
    // Category Descriptions (Bengali)
    accountDesc: "আপনার প্রোফাইল ও সেটিংস",
    depositsDesc: "টাকা জমা দিন ও উত্তোলন করুন",
    savingsGoalsDesc: "আপনার সঞ্চয় লক্ষ্য ব্যবস্থাপনা",
    kycDesc: "আপনার পরিচয় যাচাই করুন",
    securityDesc: "পাসওয়ার্ড ও পিন পরিবর্তন",
    plansDesc: "আমাদের প্ল্যান দেখুন",
    
    // Popular Articles
    popularQuestions: "জনপ্রিয় প্রশ্ন",
    noArticles: "কোন আর্টিকেল পাওয়া যায়নি",
    
    // Contact
    contactUsDirectly: "সরাসরি যোগাযোগ করুন",
    supportTicket: "সাপোর্ট টিকেট",
    replyWithin24: "২৪ ঘণ্টায় রিপ্লাই",
    email: "ইমেইল",
    hotline: "হটলাইন",
    hotlineHours: "শনি–বৃহস্পতি, সকাল ৯টা–রাত ৯টা",
    liveChat: "লাইভ চ্যাট",
    online: "অনলাইন — এখনই চ্যাট করুন",
    offline: "অফলাইন — টিকেট পাঠান",
    
    // Ticket Modal
    ticketSubject: "বিষয়",
    ticketMessage: "বিস্তারিত জানান",
    submit: "পাঠান",
    pleaseFillAllFields: "সব ঘর পূরণ করুন",
    ticketSubmitted: "টিকেট জমা হয়েছে!",
    ticketReply: "আমরা ২৪ ঘণ্টার মধ্যে রিপ্লাই দেব",
    failedToSubmit: "টিকেট জমা দিতে ব্যর্থ হয়েছে",
    
    // Ticket View
    myTickets: "আমার টিকেট",
    noTickets: "কোন টিকেট পাওয়া যায়নি",
    open: "খোলা",
    inProgress: "প্রক্রিয়াধীন",
    resolved: "সমাধানকৃত",
    closed: "বন্ধ",
    ticketDetails: "টিকেট বিস্তারিত",
    replies: "রিপ্লাই",
    noReplies: "কোন রিপ্লাই নেই",
    viewTicket: "টিকেট দেখুন",
    backToTickets: "টিকেটে ফিরুন",
    status: "অবস্থা",
    priority: "গুরুত্ব",
    high: "উচ্চ",
    medium: "মাঝারি",
    low: "নিম্ন",
    createdAt: "তৈরি হয়েছে",
    
    // Chat
    support: "সঞ্চয় বন্ধু সাপোর্ট",
    onlineStatus: "অনলাইন",
    offlineStatus: "অফলাইন",
    helloChat: "হ্যালো! আমরা আপনাকে কীভাবে সাহায্য করতে পারি?",
    typeMessage: "মেসেজ লিখুন...",
    typing: "টাইপ করছে...",
    
    // Article Modal
    helpful: "সহায়ক ছিল",
    needMoreHelp: "আরও সাহায্য চাই",
    
    // Toast
    error: "ত্রুটি!",
    success: "সফল!",
    thankYou: "ধন্যবাদ!",
    gladHelpful: "সহায়ক হয়েছে জেনে খুশি হলাম!",
    willImprove: "আমরা এই আর্টিকেল উন্নত করব",
    failedToLoadArticle: "আর্টিকেল লোড করতে ব্যর্থ হয়েছে",
    failedToSubmitFeedback: "ফিডব্যাক জমা দিতে ব্যর্থ হয়েছে",
    systemStatus: "সিস্টেম স্ট্যাটাস",
    allOperational: "সব সিস্টেম চালু আছে",
    failedToLoadTickets: "টিকেট লোড করতে ব্যর্থ হয়েছে",
    ticketReplied: "রিপ্লাই সফলভাবে পাঠানো হয়েছে!",
    failedToReply: "রিপ্লাই পাঠাতে ব্যর্থ হয়েছে",
    
    // Loading
    loading: "লোড হচ্ছে...",
  }
};

const HelpPage = () => {
  const router = useRouter();
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [popularArticles, setPopularArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searching, setSearching] = useState(false);
  
  // Ticket state
  const [showTickets, setShowTickets] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedTicketReplies, setSelectedTicketReplies] = useState([]);
  const [ticketReply, setTicketReply] = useState("");
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [showTicketDetail, setShowTicketDetail] = useState(false);
  
  // Messaging state
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  
  // Fetch user for socket
  const [currentUserId, setCurrentUserId] = useState(null);
  
  // Translation function
  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      requestAnimationFrame(() => {
        setCurrentUserId(parsed._id || parsed.id);
      });
    }
    
    // Get language from localStorage
    const savedLang = localStorage.getItem('appLanguage') || 'bn';
    requestAnimationFrame(() => {
      setLang(savedLang);
    });
  }, []);
  
  // Socket hook for messaging
  const { sendMessage, messages: socketMessages, typingUser, isConnected } = useSocket(currentUserId, "user");
  
  // Sync socket messages to chat
  useEffect(() => {
    if (socketMessages.length > 0) {
      requestAnimationFrame(() => {
        const lastMsg = socketMessages[socketMessages.length - 1];
        setChatMessages((prev) => {
          const exists = prev.find((m) => m._id === lastMsg._id);
          if (exists) return prev;
          return [...prev, { ...lastMsg, sender: lastMsg.senderRole === "admin" ? "admin" : "user" }];
        });
      });
    }
  }, [socketMessages]);
  
  // Typing indicator
  useEffect(() => {
    if (typingUser) {
      requestAnimationFrame(() => {
        setIsTyping(true);
      });
      const timer = setTimeout(() => setIsTyping(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [typingUser]);
  
  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);
  
  // Fetch all articles
  const fetchArticles = async () => {
    try {
      const response = await axiosInstance.get("/help/articles");
      if (response.data.success) {
        setArticles(response.data.data.articles);
      }
    } catch (error) {
      console.error("Fetch articles error:", error);
    }
  };

  // Fetch popular articles
  const fetchPopularArticles = async () => {
    try {
      const response = await axiosInstance.get("/help/articles/popular");
      if (response.data.success) {
        setPopularArticles(response.data.data);
      }
    } catch (error) {
      console.error("Fetch popular articles error:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/help/categories");
      if (response.data.success) {
        setCategories(response.data.data);
      }
    } catch (error) {
      console.error("Fetch categories error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user tickets
  const fetchTickets = async () => {
    setLoadingTickets(true);
    try {
      const response = await axiosInstance.get("/help/tickets");
      if (response.data.success) {
        setTickets(response.data.data.tickets || []);
      }
    } catch (error) {
      console.error("Fetch tickets error:", error);
      Swal.fire({
        title: t('error'),
        text: t('failedToLoadTickets'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setLoadingTickets(false);
    }
  };

  // Get single ticket with replies
  const getTicketWithReplies = async (ticketId) => {
    try {
      const response = await axiosInstance.get(`/help/tickets/${ticketId}`);
      if (response.data.success) {
        setSelectedTicket(response.data.data.ticket);
        setSelectedTicketReplies(response.data.data.replies || []);
        setShowTicketDetail(true);
      }
    } catch (error) {
      console.error("Get ticket error:", error);
      Swal.fire({
        title: t('error'),
        text: "Failed to load ticket details",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  // Reply to ticket
  const handleReplyToTicket = async () => {
    if (!ticketReply.trim()) {
      Swal.fire({
        title: t('error'),
        text: "Please write a reply",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    try {
      await axiosInstance.post(`/help/tickets/${selectedTicket.ticketId}/reply`, {
        message: ticketReply.trim(),
      });
      
      Swal.fire({
        title: t('success'),
        text: t('ticketReplied'),
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      
      setTicketReply("");
      // Refresh ticket data
      await getTicketWithReplies(selectedTicket.ticketId);
      await fetchTickets();
    } catch (error) {
      console.error("Reply error:", error);
      Swal.fire({
        title: t('error'),
        text: t('failedToReply'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  // Search articles
  const searchArticles = async (query) => {
    if (query.length < 2) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    setSearching(true);
    try {
      const response = await axiosInstance.get(`/help/articles/search?q=${encodeURIComponent(query)}&limit=10`);
      if (response.data.success) {
        setSearchResults(response.data.data);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setSearching(false);
    }
  };

  // Get single article
  const getArticle = async (articleId) => {
    try {
      const response = await axiosInstance.get(`/help/articles/${articleId}`);
      if (response.data.success) {
        setSelectedArticle(response.data.data);
        setShowModal(true);
        document.body.style.overflow = "hidden";
      }
    } catch (error) {
      console.error("Get article error:", error);
      Swal.fire({
        title: t('error'),
        text: t('failedToLoadArticle'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  // Submit feedback
  const submitFeedback = async (articleId, helpful) => {
    try {
      await axiosInstance.post(`/help/articles/${articleId}/feedback`, { helpful });
      Swal.fire({
        title: t('thankYou'),
        text: helpful ? t('gladHelpful') : t('willImprove'),
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Feedback error:", error);
      Swal.fire({
        title: t('error'),
        text: t('failedToSubmitFeedback'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  useEffect(() => {
    fetchArticles();
    fetchPopularArticles();
    fetchCategories();

    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    searchArticles(query);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
    setShowResults(false);
  };

  const openArticle = (articleId) => {
    getArticle(articleId);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedArticle(null);
    document.body.style.overflow = "auto";
  };

  // Open tickets view
  const openTicketsView = async () => {
    await fetchTickets();
    setShowTickets(true);
  };

  // Close tickets view
  const closeTicketsView = () => {
    setShowTickets(false);
    setSelectedTicket(null);
    setShowTicketDetail(false);
    setTicketReply("");
  };

  // Send chat message
  const handleSendMessage = () => {
    if (!chatInput.trim() || !currentUserId) return;
    
    sendMessage("admin", chatInput.trim(), "user");
    
    setChatMessages((prev) => [
      ...prev,
      {
        _id: Date.now().toString(),
        message: chatInput.trim(),
        sender: "user",
        createdAt: new Date(),
      },
    ]);
    setChatInput("");
  };
  
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const markHelpful = (helpful) => {
    if (selectedArticle) {
      submitFeedback(selectedArticle.articleId, helpful);
      closeModal();
    }
  };

  const navigateTo = (path) => {
    router.push(path);
  };

  // Get status badge
  const getStatusBadge = (status) => {
    const statusMap = {
      open: { color: "bg-green-500/15 text-green-500", icon: <AlertCircle size={12} /> },
      in_progress: { color: "bg-amber-500/15 text-amber-500", icon: <Clock size={12} /> },
      resolved: { color: "bg-blue-500/15 text-blue-500", icon: <CheckCircle size={12} /> },
      closed: { color: "bg-gray-500/15 text-gray-500", icon: <CheckCircle size={12} /> },
    };
    return statusMap[status] || statusMap.open;
  };

  // Get priority badge
  const getPriorityBadge = (priority) => {
    const priorityMap = {
      high: { color: "bg-red-500/15 text-red-500", label: t('high') },
      medium: { color: "bg-amber-500/15 text-amber-500", label: t('medium') },
      low: { color: "bg-blue-500/15 text-blue-500", label: t('low') },
    };
    return priorityMap[priority] || priorityMap.medium;
  };

  // Category display with navigation
  const categoryDisplay = [
    { 
      id: "Account", 
      icon: "👤", 
      name: { bn: t('account'), en: "Account" }, 
      color: "bg-primary/10",
      href: "/dashboard/profile",
      description: { bn: t('accountDesc'), en: "Your profile & settings" }
    },
    { 
      id: "Deposits", 
      icon: "💰", 
      name: { bn: t('deposits'), en: "Deposits" }, 
      color: "bg-blue-500/10",
      href: "/dashboard/submit",
      description: { bn: t('depositsDesc'), en: "Deposit & withdraw money" }
    },
    { 
      id: "Goals", 
      icon: "🎯", 
      name: { bn: t('savingsGoals'), en: "Savings Goals" }, 
      color: "bg-amber-500/10",
      href: "/dashboard/goals",
      description: { bn: t('savingsGoalsDesc'), en: "Manage your savings goals" }
    },
    { 
      id: "KYC", 
      icon: "🪪", 
      name: { bn: t('kycVerification'), en: "KYC Verification" }, 
      color: "bg-red-500/10",
      href: "/dashboard/profile",
      description: { bn: t('kycDesc'), en: "Verify your identity" }
    },
    { 
      id: "Security", 
      icon: "🔒", 
      name: { bn: t('security'), en: "Security" }, 
      color: "bg-purple-500/10",
      href: "/dashboard/security",
      description: { bn: t('securityDesc'), en: "Change password & PIN" }
    },
    { 
      id: "Plans", 
      icon: "💎", 
      name: { bn: t('plansSubscriptions'), en: "Plans & Subscriptions" }, 
      color: "bg-pink-500/10",
      href: "/plans",
      description: { bn: t('plansDesc'), en: "View our plans" }
    },
  ];

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
      <div className="bg-linear-to-r from-primary to-primary-light px-4 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1">{t('helpCenter')}</h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => {
            const newLang = lang === "bn" ? "en" : "bn";
            setLang(newLang);
            localStorage.setItem('appLanguage', newLang);
          }}
          className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
      </div>

      {/* Hero + Search */}
      <div className="bg-linear-to-r from-primary to-primary-light px-5 pb-8 text-center">
        <div className="text-white text-xl font-bold mb-1">
          {t('howCanWeHelp')}
        </div>
        <div className="text-white/80 text-sm mb-4">
          {articles.length}+ {t('helpArticles')}
        </div>
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder={t('searchPlaceholder')}
            className="w-full py-3 pl-12 pr-10 rounded-xl bg-white text-black outline-none shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {searching && (
          <div className="mt-2 flex justify-center">
            <Loader2 className="w-5 h-5 animate-spin text-white" />
          </div>
        )}
        {showResults && searchResults.length > 0 && (
          <div className="mt-2 bg-card border border-border rounded-xl overflow-hidden shadow-lg text-left max-h-96 overflow-y-auto">
            {searchResults.map((result) => (
              <div
                key={result.articleId}
                onClick={() => {
                  openArticle(result.articleId);
                  clearSearch();
                }}
                className="p-3 border-b border-border last:border-0 flex items-center gap-3 cursor-pointer hover:bg-primary/5 transition"
              >
                <span className="text-lg">{result.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {result.title[lang]}
                  </div>
                  <div className="text-xs text-foreground/50">
                    {result.category[lang]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {showResults && searchResults.length === 0 && searchQuery && !searching && (
          <div className="mt-2 bg-card border border-border rounded-xl p-4 text-center text-foreground/50">
            😕 {t('noResults')}
          </div>
        )}
      </div>

      <div className="px-4 py-6 max-w-full mx-auto">
        {/* System Status */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center gap-3 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <div className="text-sm text-foreground/80 flex-1">
            {t('allSystemsNormal')}{" "}
            <strong className="text-green-500">
              {t('allServicesRunning')}
            </strong>
          </div>
          <button
            onClick={() => Swal.fire({ 
              title: t('systemStatus'), 
              text: t('allOperational'), 
              icon: "success", 
              confirmButtonColor: "#059669" 
            })}
            className="text-xs text-primary font-semibold"
          >
            {t('details')}
          </button>
        </div>

        {/* Categories with Navigation */}
        <div className="flex justify-between items-center mb-3">
          <div className="font-bold text-foreground">
            {t('browseByTopic')}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categoryDisplay.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => navigateTo(cat.href)}
              className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition group"
            >
              <div
                className={`w-11 h-11 rounded-xl ${cat.color} flex items-center justify-center text-xl mb-2 group-hover:scale-110 transition`}
              >
                {cat.icon}
              </div>
              <div className="font-bold text-sm text-foreground">
                {cat.name[lang]}
              </div>
              <div className="text-xs text-foreground/50 mt-1">
                {cat.description[lang]}
              </div>
              <div className="text-xs text-primary mt-2 opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                {t('go')}
                <ChevronRight size={12} />
              </div>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="flex justify-between items-center mb-3">
          <div className="font-bold text-foreground">
            {t('popularQuestions')}
          </div>
        </div>
        <div className="space-y-2 mb-6">
          {popularArticles.length === 0 ? (
            <div className="text-center py-8 bg-card rounded-xl border border-border">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-foreground/50">
                {t('noArticles')}
              </div>
            </div>
          ) : (
            popularArticles.map((article, idx) => (
              <div
                key={article.articleId || idx}
                onClick={() => openArticle(article.articleId)}
                className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-primary transition"
              >
                <span className="text-xl">{article.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">
                    {article.title[lang]}
                  </div>
                  <div className="text-xs text-foreground/50">
                    {article.category[lang]} · {article.readTime[lang]}
                  </div>
                </div>
                <ChevronRight size={16} className="text-foreground/40" />
              </div>
            ))
          )}
        </div>

        {/* Contact Options */}
        <div className="font-bold text-foreground mb-3">
          {t('contactUsDirectly')}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              Swal.fire({
                title: t('supportTicket'),
                html: `
                  <input id="subject" class="swal2-input" placeholder="${t('ticketSubject')}">
                  <textarea id="message" class="swal2-textarea" placeholder="${t('ticketMessage')}"></textarea>
                `,
                showCancelButton: true,
                confirmButtonColor: "#059669",
                confirmButtonText: t('submit'),
                preConfirm: () => {
                  const subject = document.getElementById("subject").value;
                  const message = document.getElementById("message").value;
                  if (!subject || !message) {
                    Swal.showValidationMessage(t('pleaseFillAllFields'));
                  }
                  return { subject, message };
                }
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    await axiosInstance.post("/help/tickets", result.value);
                    Swal.fire({
                      title: t('ticketSubmitted'),
                      text: t('ticketReply'),
                      icon: "success",
                      confirmButtonColor: "#059669",
                    });
                  } catch (error) {
                    Swal.fire(t('error'), t('failedToSubmit'), "error");
                  }
                }
              });
            }}
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">🎫</div>
            <div className="font-bold text-sm text-foreground">
              {t('supportTicket')}
            </div>
            <div className="text-xs text-foreground/50">
              {t('replyWithin24')}
            </div>
          </button>
          
          {/* My Tickets Button */}
          <button
            onClick={openTicketsView}
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">📋</div>
            <div className="font-bold text-sm text-foreground">
              {t('myTickets')}
            </div>
            <div className="text-xs text-foreground/50">
              {t('viewTicket')}
            </div>
          </button>
          
          <a
            href="mailto:support@sanchoybondhu.com"
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">📧</div>
            <div className="font-bold text-sm text-foreground">{t('email')}</div>
            <div className="text-xs text-foreground/50">
              support@sanchoybondhu.com
            </div>
          </a>
          <a
            href="tel:+8801700000000"
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">📞</div>
            <div className="font-bold text-sm text-foreground">
              {t('hotline')}
            </div>
            <div className="text-xs text-foreground/50">
              {t('hotlineHours')}
            </div>
          </a>
          <button
            onClick={() => setShowChat(true)}
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">💬</div>
            <div className="font-bold text-sm text-foreground">
              {t('liveChat')}
            </div>
            <div className="text-xs text-foreground/50">
              {isConnected ? t('online') : t('offline')}
            </div>
          </button>
        </div>
      </div>

      {/* Tickets Modal */}
      <AnimatePresence>
        {showTickets && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={closeTicketsView}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tickets Header */}
              <div className="sticky top-0 bg-primary border-b border-primary/20 p-4 flex items-center gap-3 rounded-t-2xl md:rounded-t-2xl">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg">
                  📋
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">
                    {t('myTickets')}
                  </div>
                  <div className="text-white/70 text-xs">
                    {tickets.length} tickets
                  </div>
                </div>
                <button
                  onClick={closeTicketsView}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {showTicketDetail && selectedTicket ? (
                // Ticket Detail View
                <div className="flex-1 overflow-y-auto p-4">
                  <button
                    onClick={() => setShowTicketDetail(false)}
                    className="text-primary text-sm font-semibold mb-4 flex items-center gap-1"
                  >
                    ← {t('backToTickets')}
                  </button>
                  
                  <div className="bg-background rounded-xl p-4 mb-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-foreground">{selectedTicket.subject}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(selectedTicket.status).color} flex items-center gap-1`}>
                        {getStatusBadge(selectedTicket.status).icon}
                        {t(selectedTicket.status)}
                      </span>
                    </div>
                    <div className="text-sm text-foreground/60 mb-2">{selectedTicket.message}</div>
                    <div className="flex gap-3 text-xs text-foreground/40">
                      <span className="flex items-center gap-1">
                        <Ticket size={12} /> {selectedTicket.ticketId}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} /> {new Date(selectedTicket.createdAt).toLocaleDateString()}
                      </span>
                      <span className={`flex items-center gap-1 ${getPriorityBadge(selectedTicket.priority).color}`}>
                        <AlertCircle size={12} />
                        {getPriorityBadge(selectedTicket.priority).label}
                      </span>
                    </div>
                  </div>

                  {/* Replies */}
                  <div className="mb-4">
                    <div className="font-semibold text-foreground text-sm mb-3 flex items-center gap-2">
                      <MessageCircle size={16} /> {t('replies')} ({selectedTicketReplies.length})
                    </div>
                    {selectedTicketReplies.length === 0 ? (
                      <div className="text-center text-foreground/40 text-sm py-4">
                        {t('noReplies')}
                      </div>
                    ) : (
                      selectedTicketReplies.map((reply, idx) => (
                        <div
                          key={idx}
                          className={`mb-3 p-3 rounded-xl ${
                            reply.isAdmin
                              ? "bg-primary/5 border border-primary/20 ml-4"
                              : "bg-background border border-border mr-4"
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-sm font-semibold text-foreground">
                              {reply.isAdmin ? "🛡️ Admin" : "👤 You"}
                            </span>
                            <span className="text-xs text-foreground/40">
                              {new Date(reply.createdAt).toLocaleString()}
                            </span>
                          </div>
                          <div className="text-sm text-foreground/70">
                            {reply.message}
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Reply Input */}
                  {selectedTicket.status !== "closed" && selectedTicket.status !== "resolved" && (
                    <div className="sticky bottom-0 bg-card pt-2">
                      <div className="flex items-center gap-2">
                        <textarea
                          value={ticketReply}
                          onChange={(e) => setTicketReply(e.target.value)}
                          placeholder="Write your reply..."
                          rows={2}
                          className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-sm outline-none focus:border-primary resize-none"
                        />
                        <button
                          onClick={handleReplyToTicket}
                          disabled={!ticketReply.trim()}
                          className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                        >
                          <Send size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Tickets List View
                <div className="flex-1 overflow-y-auto p-4">
                  {loadingTickets ? (
                    <div className="flex items-center justify-center h-32">
                      <Loader2 className="w-6 h-6 animate-spin text-primary" />
                    </div>
                  ) : tickets.length === 0 ? (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-3">🎫</div>
                      <div className="text-foreground/60">{t('noTickets')}</div>
                    </div>
                  ) : (
                    tickets.map((ticket) => (
                      <div
                        key={ticket._id}
                        onClick={() => getTicketWithReplies(ticket.ticketId)}
                        className="bg-background rounded-xl p-4 mb-3 cursor-pointer hover:border-primary border border-border transition"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <div className="font-semibold text-foreground text-sm">
                              {ticket.subject}
                            </div>
                            <div className="text-xs text-foreground/40">
                              {ticket.ticketId} · {new Date(ticket.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(ticket.status).color} flex items-center gap-1`}>
                            {getStatusBadge(ticket.status).icon}
                            {t(ticket.status)}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-1">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${getPriorityBadge(ticket.priority).color}`}>
                            {getPriorityBadge(ticket.priority).label}
                          </span>
                          <span className="text-xs text-foreground/40">
                            {ticket.category}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Live Chat Modal */}
      <AnimatePresence>
        {showChat && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowChat(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-md max-h-[85vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Chat Header */}
              <div className="sticky top-0 bg-primary border-b border-primary/20 p-4 flex items-center gap-3 rounded-t-2xl md:rounded-t-2xl">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white text-lg">
                  🌿
                </div>
                <div className="flex-1">
                  <div className="font-bold text-white text-sm">
                    {t('support')}
                  </div>
                  <div className="text-white/70 text-xs flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-gray-400"}`} />
                    {isConnected ? t('onlineStatus') : t('offlineStatus')}
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[300px] max-h-[400px]">
                {chatMessages.length === 0 && (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-2">👋</div>
                    <div className="text-foreground/50 text-sm">
                      {t('helloChat')}
                    </div>
                  </div>
                )}
                {chatMessages.map((msg, idx) => (
                  <div
                    key={msg._id || idx}
                    className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${
                        msg.sender === "user"
                          ? "bg-primary text-white rounded-br-none"
                          : "bg-muted text-foreground rounded-bl-none"
                      }`}
                    >
                      {msg.message}
                      <div className={`text-[10px] mt-1 ${msg.sender === "user" ? "text-white/60" : "text-foreground/40"}`}>
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                      </div>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted px-3 py-2 rounded-xl rounded-bl-none text-sm text-foreground/60">
                      <span className="animate-pulse">●●●</span> {t('typing')}
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Chat Input */}
              <div className="p-3 border-t border-border">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={handleKeyPress}
                    placeholder={t('typeMessage')}
                    className="flex-1 px-3 py-2 rounded-xl bg-background border border-border text-sm outline-none focus:border-primary"
                    disabled={!isConnected}
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!chatInput.trim() || !isConnected}
                    className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Article Modal */}
      <AnimatePresence>
        {showModal && selectedArticle && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center gap-3">
                <span className="text-2xl">{selectedArticle.icon}</span>
                <div className="font-bold text-foreground flex-1">
                  {selectedArticle.title[lang]}
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              <div
                className="p-5 text-foreground/70 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedArticle.body[lang] }}
              />
              <div className="p-4 border-t border-border flex gap-3">
                <button
                  onClick={() => markHelpful(true)}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold hover:border-green-500 hover:text-green-500 transition"
                >
                  👍 {t('helpful')}
                </button>
                <button
                  onClick={() => markHelpful(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold hover:border-red-500 hover:text-red-500 transition"
                >
                  👎 {t('needMoreHelp')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpPage;