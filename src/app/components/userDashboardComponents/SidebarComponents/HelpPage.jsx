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
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import useSocket from "../../../hooks/useSocket";

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
  
  // Messaging state
  const [showChat, setShowChat] = useState(false);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);
  
  // Fetch user for socket
  const [currentUserId, setCurrentUserId] = useState(null);
  
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setCurrentUserId(parsed._id || parsed.id);
    }
  }, []);
  
  // Socket hook for messaging
  const { sendMessage, messages: socketMessages, typingUser, isConnected } = useSocket(currentUserId, "user");
  
  // Sync socket messages to chat
  useEffect(() => {
    if (socketMessages.length > 0) {
      const lastMsg = socketMessages[socketMessages.length - 1];
      setChatMessages((prev) => {
        const exists = prev.find((m) => m._id === lastMsg._id);
        if (exists) return prev;
        return [...prev, { ...lastMsg, sender: lastMsg.senderRole === "admin" ? "admin" : "user" }];
      });
    }
  }, [socketMessages]);
  
  // Typing indicator
  useEffect(() => {
    if (typingUser) {
      setIsTyping(true);
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
        title: "Error!",
        text: "Failed to load article",
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
        title: "Thank You!",
        text: helpful ? "Glad it was helpful!" : "We'll improve this article",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Feedback error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to submit feedback",
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

  // Send chat message
  const handleSendMessage = () => {
    if (!chatInput.trim() || !currentUserId) return;
    
    // Send to admin (receiverId "admin" - server will route to admin room)
    sendMessage("admin", chatInput.trim(), "user");
    
    // Add to local chat immediately for UX
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

  // Category display with navigation
  const categoryDisplay = [
    { 
      id: "Account", 
      icon: "👤", 
      name: { bn: "অ্যাকাউন্ট", en: "Account" }, 
      color: "bg-primary/10",
      href: "/dashboard/profile",
      description: { bn: "আপনার প্রোফাইল ও সেটিংস", en: "Your profile & settings" }
    },
    { 
      id: "Deposits", 
      icon: "💰", 
      name: { bn: "জমা ও উত্তোলন", en: "Deposits" }, 
      color: "bg-blue-500/10",
      href: "/dashboard/submit",
      description: { bn: "টাকা জমা দিন ও উত্তোলন করুন", en: "Deposit & withdraw money" }
    },
    { 
      id: "Goals", 
      icon: "🎯", 
      name: { bn: "সঞ্চয় লক্ষ্য", en: "Savings Goals" }, 
      color: "bg-amber-500/10",
      href: "/dashboard/goals",
      description: { bn: "আপনার সঞ্চয় লক্ষ্য ব্যবস্থাপনা", en: "Manage your savings goals" }
    },
    { 
      id: "KYC", 
      icon: "🪪", 
      name: { bn: "KYC যাচাই", en: "KYC Verification" }, 
      color: "bg-red-500/10",
      href: "/dashboard/profile",
      description: { bn: "আপনার পরিচয় যাচাই করুন", en: "Verify your identity" }
    },
    { 
      id: "Security", 
      icon: "🔒", 
      name: { bn: "নিরাপত্তা", en: "Security" }, 
      color: "bg-purple-500/10",
      href: "/dashboard/security",
      description: { bn: "পাসওয়ার্ড ও পিন পরিবর্তন", en: "Change password & PIN" }
    },
    { 
      id: "Plans", 
      icon: "💎", 
      name: { bn: "প্ল্যান ও সাবস্ক্রিপশন", en: "Plans & Subscriptions" }, 
      color: "bg-pink-500/10",
      href: "/plans",
      description: { bn: "আমাদের প্ল্যান দেখুন", en: "View our plans" }
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
        <h1 className="text-white text-lg font-bold flex-1">🆘 Help Center</h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
      </div>

      {/* Hero + Search */}
      <div className="bg-linear-to-r from-primary to-primary-light px-5 pb-8 text-center">
        <div className="text-white text-xl font-bold mb-1">
          {lang === "bn" ? "আমরা কীভাবে সাহায্য করতে পারি?" : "How can we help you?"}
        </div>
        <div className="text-white/80 text-sm mb-4">
          {articles.length}+ {lang === "bn" ? "সাহায্য নিবন্ধ" : "help articles"}
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
            placeholder={lang === "bn" ? "সাহায্য অনুসন্ধান করুন... যেমন: bKash, পাসওয়ার্ড" : "Search help articles... e.g. bKash, password"}
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
            😕 {lang === "bn" ? "কোন ফলাফল পাওয়া যায়নি" : "No results found"}
          </div>
        )}
      </div>

      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* System Status */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center gap-3 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <div className="text-sm text-foreground/80 flex-1">
            {lang === "bn" ? "সব সিস্টেম স্বাভাবিক —" : "All systems normal —"}{" "}
            <strong className="text-green-500">
              {lang === "bn" ? "সব সার্ভিস চালু আছে" : "All services are running"}
            </strong>
          </div>
          <button
            onClick={() => Swal.fire({ title: "System Status", text: "All systems operational", icon: "success", confirmButtonColor: "#059669" })}
            className="text-xs text-primary font-semibold"
          >
            {lang === "bn" ? "বিস্তারিত →" : "Details →"}
          </button>
        </div>

        {/* Categories with Navigation */}
        <div className="flex justify-between items-center mb-3">
          <div className="font-bold text-foreground">
            {lang === "bn" ? "বিষয় অনুযায়ী ব্রাউজ করুন" : "Browse by topic"}
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
                {lang === "bn" ? "যান →" : "Go →"}
                <ChevronRight size={12} />
              </div>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="flex justify-between items-center mb-3">
          <div className="font-bold text-foreground">
            {lang === "bn" ? "জনপ্রিয় প্রশ্ন" : "Popular questions"}
          </div>
        </div>
        <div className="space-y-2 mb-6">
          {popularArticles.length === 0 ? (
            <div className="text-center py-8 bg-card rounded-xl border border-border">
              <div className="text-4xl mb-2">📚</div>
              <div className="text-foreground/50">
                {lang === "bn" ? "কোন আর্টিকেল পাওয়া যায়নি" : "No articles found"}
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
          {lang === "bn" ? "সরাসরি যোগাযোগ করুন" : "Contact us directly"}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => {
              Swal.fire({
                title: lang === "bn" ? "সাপোর্ট টিকেট" : "Support Ticket",
                html: `
                  <input id="subject" class="swal2-input" placeholder="${lang === "bn" ? "বিষয়" : "Subject"}">
                  <textarea id="message" class="swal2-textarea" placeholder="${lang === "bn" ? "বিস্তারিত জানান" : "Describe your issue"}"></textarea>
                `,
                showCancelButton: true,
                confirmButtonColor: "#059669",
                confirmButtonText: lang === "bn" ? "পাঠান" : "Submit",
                preConfirm: () => {
                  const subject = document.getElementById("subject").value;
                  const message = document.getElementById("message").value;
                  if (!subject || !message) {
                    Swal.showValidationMessage(lang === "bn" ? "সব ঘর পূরণ করুন" : "Please fill all fields");
                  }
                  return { subject, message };
                }
              }).then(async (result) => {
                if (result.isConfirmed) {
                  try {
                    await axiosInstance.post("/help/tickets", result.value);
                    Swal.fire({
                      title: lang === "bn" ? "টিকেট জমা হয়েছে!" : "Ticket Submitted!",
                      text: lang === "bn" ? "আমরা ২৪ ঘণ্টার মধ্যে রিপ্লাই দেব" : "We'll reply within 24 hours",
                      icon: "success",
                      confirmButtonColor: "#059669",
                    });
                  } catch (error) {
                    Swal.fire("Error!", "Failed to submit ticket", "error");
                  }
                }
              });
            }}
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">🎫</div>
            <div className="font-bold text-sm text-foreground">
              {lang === "bn" ? "সাপোর্ট টিকেট" : "Support Ticket"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn" ? "২৪ ঘণ্টায় রিপ্লাই" : "Reply within 24 hours"}
            </div>
          </button>
          <a
            href="mailto:support@sanchoybondhu.com"
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">📧</div>
            <div className="font-bold text-sm text-foreground">Email</div>
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
              {lang === "bn" ? "হটলাইন" : "Hotline"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn" ? "শনি–বৃহস্পতি, সকাল ৯টা–রাত ৯টা" : "Sat–Thu, 9am–9pm"}
            </div>
          </a>
          <button
            onClick={() => setShowChat(true)}
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">💬</div>
            <div className="font-bold text-sm text-foreground">
              {lang === "bn" ? "লাইভ চ্যাট" : "Live Chat"}
            </div>
            <div className="text-xs text-foreground/50">
              {isConnected 
                ? (lang === "bn" ? "অনলাইন — এখনই চ্যাট করুন" : "Online — Chat now")
                : (lang === "bn" ? "অফলাইন — টিকেট পাঠান" : "Offline — Send ticket")
              }
            </div>
          </button>
        </div>
      </div>

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
                    {lang === "bn" ? "Sanchoy Bondhu সাপোর্ট" : "Sanchoy Bondhu Support"}
                  </div>
                  <div className="text-white/70 text-xs flex items-center gap-1">
                    <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-400" : "bg-gray-400"}`} />
                    {isConnected 
                      ? (lang === "bn" ? "অনলাইন" : "Online") 
                      : (lang === "bn" ? "অফলাইন" : "Offline")
                    }
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
                      {lang === "bn" 
                        ? "হ্যালো! আমরা আপনাকে কীভাবে সাহায্য করতে পারি?" 
                        : "Hello! How can we help you today?"
                      }
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
                      <span className="animate-pulse">●●●</span> {lang === "bn" ? "টাইপ করছে..." : "typing..."}
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
                    placeholder={lang === "bn" ? "মেসেজ লিখুন..." : "Type a message..."}
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
                  👍 {lang === "bn" ? "সহায়ক ছিল" : "Helpful"}
                </button>
                <button
                  onClick={() => markHelpful(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold hover:border-red-500 hover:text-red-500 transition"
                >
                  👎 {lang === "bn" ? "আরও সাহায্য চাই" : "Need more help"}
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