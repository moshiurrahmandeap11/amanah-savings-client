// src/app/components/adminComponents/AdminSidebarComponents/AdminSupportPage.jsx
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Moon,
  Sun,
  Search,
  Send,
  CheckCircle,
  AlertTriangle,
  XCircle,
  MessageSquare,
  Flag,
  Archive,
  Loader2,
  Users,
  Clock,
  User,
  Mail,
  Phone,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Inbox,
  Reply,
  Paperclip,
  Smile,
  MoreVertical,
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";
import useSocket from "../../../hooks/useSocket";

// Translations
const translations = {
  en: {
    // Header
    supportTickets: "🎫 Support Tickets",
    admin: "ADMIN",
    
    // Stats
    open: "Open",
    urgent: "Urgent",
    resolvedToday: "Resolved Today",
    avgResponse: "Avg Response",
    
    // Search
    searchPlaceholder: "Search tickets by user, subject, or ID...",
    
    // Filters
    all: "All",
    urgentFilter: "🔴 Urgent",
    openFilter: "🟡 Open",
    depositIssues: "💳 Deposit Issues",
    kycFilter: "🪪 KYC",
    withdrawalFilter: "🏧 Withdrawal",
    resolvedFilter: "✅ Resolved",
    
    // Status Badges
    resolved: "✅ Resolved",
    urgentBadge: "🔴 Urgent",
    openBadge: "🟡 Open",
    inProgress: "🔄 In Progress",
    
    // Ticket Actions
    reply: "💬 Reply",
    resolve: "✅ Resolve",
    escalate: "⬆️ Escalate",
    archive: "✕ Archive",
    viewTicket: "👁️ View Ticket",
    viewConversation: "💬 View Conversation",
    
    // Reply Sheet
    replyToTicket: "💬 Reply to Ticket",
    replyingTo: "Replying to:",
    replyPlaceholder: "Type your reply here...",
    cancel: "Cancel",
    sendReply: "Send Reply",
    previousMessages: "Previous Messages",
    noMessages: "No messages yet",
    admin: "Admin",
    user: "User",
    typeMessage: "Type a message...",
    
    // Messaging Section
    messaging: "💬 Messaging",
    noConversations: "No conversations yet",
    selectConversation: "Select a conversation to start messaging",
    online: "Online",
    offline: "Offline",
    typing: "typing...",
    send: "Send",
    attachment: "Attachment",
    emoji: "Emoji",
    
    // Toast Messages
    pleaseWriteReply: "⚠️ Please write a reply",
    replySent: "✅ Reply sent successfully",
    replyFailed: "Reply failed",
    ticketResolved: "✅ Ticket marked as resolved",
    resolveFailed: "Resolve failed",
    ticketEscalated: "⬆️ Ticket escalated to senior admin",
    ticketArchived: "🗑️ Ticket archived",
    failedToLoad: "Failed to load tickets",
    ticketNotFound: "Ticket not found",
    messageSent: "✅ Message sent successfully",
    messageFailed: "Failed to send message",
    
    // Common
    unknown: "Unknown",
    noDetails: "No details",
  },
  bn: {
    // Header
    supportTickets: "🎫 সাপোর্ট টিকেট",
    admin: "অ্যাডমিন",
    
    // Stats
    open: "খোলা",
    urgent: "জরুরি",
    resolvedToday: "আজকের সমাধান",
    avgResponse: "গড় প্রতিক্রিয়া",
    
    // Search
    searchPlaceholder: "সদস্য, বিষয় বা ID দিয়ে টিকেট খুঁজুন...",
    
    // Filters
    all: "সব",
    urgentFilter: "🔴 জরুরি",
    openFilter: "🟡 খোলা",
    depositIssues: "💳 ডিপোজিট সমস্যা",
    kycFilter: "🪪 কেওয়াইসি",
    withdrawalFilter: "🏧 উত্তোলন",
    resolvedFilter: "✅ সমাধানকৃত",
    
    // Status Badges
    resolved: "✅ সমাধানকৃত",
    urgentBadge: "🔴 জরুরি",
    openBadge: "🟡 খোলা",
    inProgress: "🔄 প্রক্রিয়াধীন",
    
    // Ticket Actions
    reply: "💬 উত্তর",
    resolve: "✅ সমাধান",
    escalate: "⬆️ উর্ধ্বতনে পাঠান",
    archive: "✕ আর্কাইভ",
    viewTicket: "👁️ টিকেট দেখুন",
    viewConversation: "💬 কথোপকথন দেখুন",
    
    // Reply Sheet
    replyToTicket: "💬 টিকেটে উত্তর দিন",
    replyingTo: "উত্তর দিচ্ছেন:",
    replyPlaceholder: "এখানে আপনার উত্তর লিখুন...",
    cancel: "বাতিল",
    sendReply: "উত্তর পাঠান",
    previousMessages: "পূর্ববর্তী বার্তা",
    noMessages: "কোন বার্তা নেই",
    admin: "অ্যাডমিন",
    user: "ব্যবহারকারী",
    typeMessage: "বার্তা লিখুন...",
    
    // Messaging Section
    messaging: "💬 মেসেজিং",
    noConversations: "কোন কথোপকথন নেই",
    selectConversation: "মেসেজ শুরু করতে একটি কথোপকথন নির্বাচন করুন",
    online: "অনলাইন",
    offline: "অফলাইন",
    typing: "টাইপ করছে...",
    send: "পাঠান",
    attachment: "সংযুক্তি",
    emoji: "ইমোজি",
    
    // Toast Messages
    pleaseWriteReply: "⚠️ দয়া করে উত্তর লিখুন",
    replySent: "✅ উত্তর সফলভাবে পাঠানো হয়েছে",
    replyFailed: "উত্তর পাঠাতে ব্যর্থ হয়েছে",
    ticketResolved: "✅ টিকেট সমাধান হিসেবে চিহ্নিত হয়েছে",
    resolveFailed: "সমাধান করতে ব্যর্থ হয়েছে",
    ticketEscalated: "⬆️ টিকেট সিনিয়র অ্যাডমিনে পাঠানো হয়েছে",
    ticketArchived: "🗑️ টিকেট আর্কাইভ করা হয়েছে",
    failedToLoad: "টিকেট লোড করতে ব্যর্থ হয়েছে",
    ticketNotFound: "টিকেট পাওয়া যায়নি",
    messageSent: "✅ বার্তা সফলভাবে পাঠানো হয়েছে",
    messageFailed: "বার্তা পাঠাতে ব্যর্থ হয়েছে",
    
    // Common
    unknown: "অজানা",
    noDetails: "কোন বিবরণ নেই",
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AdminSupportPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showReplySheet, setShowReplySheet] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [tickets, setTickets] = useState([]);
  const [stats, setStats] = useState({ open: 0, urgent: 0, resolvedToday: 0, avgResponse: "0h" });
  const [loading, setLoading] = useState(false);
  const [ticketMessages, setTicketMessages] = useState([]);
  const [showMessages, setShowMessages] = useState(false);
  const [expandedTicket, setExpandedTicket] = useState(null);
  const [currentAdminId, setCurrentAdminId] = useState(null);
  const [showMessaging, setShowMessaging] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [conversations, setConversations] = useState([]);
  const messagesEndRef = useRef(null);
  const replyInputRef = useRef(null);
  const messageInputRef = useRef(null);

  // Get admin user ID
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setCurrentAdminId(parsed._id || parsed.id);
      } catch (e) {
        console.error("Error parsing user:", e);
      }
    }
  }, []);

  // Socket connection for admin
  const { 
    sendMessage, 
    messages: socketMessages, 
    typingUser, 
    isConnected,
    joinAdminRoom,
    joinTicketRoom,
    leaveTicketRoom
  } = useSocket(currentAdminId, "admin");

  // Join admin room when connected
  useEffect(() => {
    if (isConnected && currentAdminId && joinAdminRoom) {
      joinAdminRoom();
    }
  }, [isConnected, currentAdminId, joinAdminRoom]);

  // Handle incoming socket messages
  useEffect(() => {
    if (socketMessages && socketMessages.length > 0) {
      const lastMsg = socketMessages[socketMessages.length - 1];
      
      // Update ticket messages if viewing a ticket
      if (selectedTicket && lastMsg.ticketId === selectedTicket.ticketId) {
        setTicketMessages(prev => {
          const exists = prev.find(m => m._id === lastMsg._id);
          if (exists) return prev;
          return [...prev, {
            _id: lastMsg._id || Date.now().toString(),
            message: lastMsg.message,
            sender: lastMsg.senderRole === "admin" ? "admin" : "user",
            senderName: lastMsg.senderName || (lastMsg.senderRole === "admin" ? "Admin" : lastMsg.senderName),
            createdAt: lastMsg.createdAt || new Date(),
            isAdmin: lastMsg.senderRole === "admin"
          }];
        });
      }
      
      // Update conversation messages if viewing a conversation
      if (selectedConversation && lastMsg.senderId === selectedConversation.userId) {
        setConversationMessages(prev => {
          const exists = prev.find(m => m._id === lastMsg._id);
          if (exists) return prev;
          return [...prev, {
            _id: lastMsg._id || Date.now().toString(),
            message: lastMsg.message,
            sender: lastMsg.senderRole === "admin" ? "admin" : "user",
            senderName: lastMsg.senderName || (lastMsg.senderRole === "admin" ? "Admin" : lastMsg.senderName),
            createdAt: lastMsg.createdAt || new Date(),
            isAdmin: lastMsg.senderRole === "admin"
          }];
        });
      }
      
      // Update ticket list
      setTickets(prev => prev.map(ticket => {
        if (ticket.ticketId === lastMsg.ticketId) {
          return {
            ...ticket,
            hasNewMessage: lastMsg.senderRole !== "admin",
            lastMessage: lastMsg.message,
            lastMessageTime: lastMsg.createdAt
          };
        }
        return ticket;
      }));
      
      // Update conversation list
      if (lastMsg.senderId) {
        setConversations(prev => {
          const exists = prev.find(c => c.userId === lastMsg.senderId);
          if (exists) {
            return prev.map(c => 
              c.userId === lastMsg.senderId 
                ? { ...c, lastMessage: lastMsg.message, lastMessageTime: lastMsg.createdAt, hasUnread: lastMsg.senderRole !== "admin" }
                : c
            );
          }
          return prev;
        });
      }
    }
  }, [socketMessages, selectedTicket, selectedConversation]);

  // Scroll to bottom of messages
  useEffect(() => {
    if (showMessages && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    if (showMessaging && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [ticketMessages, conversationMessages, showMessages, showMessaging]);

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "bn";
    setLang(savedLang);
  }, []);

  const fetchTickets = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", "20");
      if (searchQuery) params.append("search", searchQuery);
      if (activeFilter !== "all") params.append("status", activeFilter);

      const res = await axiosInstance.get(`/help/admin/tickets?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (res.data.success) {
        const formattedTickets = (res.data.data.tickets || []).map(ticket => ({
          id: ticket.ticketId,
          ticketId: ticket.ticketId,
          subject: ticket.subject,
          message: ticket.message || ticket.subject,
          preview: ticket.subject,
          category: ticket.category,
          categoryIcon: getCategoryIcon(ticket.category),
          priority: ticket.priority,
          urgent: ticket.priority === "urgent",
          resolved: ticket.status === "resolved" || ticket.status === "closed",
          status: ticket.status,
          name: ticket.user?.fullName || ticket.user?.name || "Unknown User",
          phone: ticket.user?.phone,
          email: ticket.user?.email,
          avatar: (ticket.user?.fullName || ticket.user?.name)?.[0] || "U",
          avatarBg: "from-primary to-primary-light",
          time: new Date(ticket.createdAt).toLocaleString(),
          createdAt: ticket.createdAt,
          userId: ticket.userId || ticket.user?._id,
          hasNewMessage: false,
          lastMessage: null,
          lastMessageTime: null,
        }));
        
        setTickets(formattedTickets);
        
        // Also build conversations from tickets
        buildConversations(formattedTickets);
        
        const openCount = (res.data.data.tickets || []).filter(t => t.status === "open" || t.status === "in_progress").length;
        const urgentCount = (res.data.data.tickets || []).filter(t => t.priority === "urgent" && t.status !== "resolved").length;
        const resolvedToday = (res.data.data.tickets || []).filter(t => {
          if (t.status !== "resolved") return false;
          const resolvedDate = new Date(t.resolvedAt || t.updatedAt);
          const today = new Date();
          return resolvedDate.toDateString() === today.toDateString();
        }).length;
        
        setStats({
          open: openCount,
          urgent: urgentCount,
          resolvedToday: resolvedToday,
          avgResponse: "2.5h"
        });
      }
    } catch (err) {
      console.error("Fetch tickets error:", err);
      showToast(err.response?.data?.message || t('failedToLoad'));
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchQuery]);

  // Build conversations from tickets
  const buildConversations = (ticketsData) => {
    const conversationMap = new Map();
    
    if (!ticketsData || ticketsData.length === 0) {
      setConversations([]);
      return;
    }
    
    ticketsData.forEach(ticket => {
      const userId = ticket.userId;
      if (!userId) return;
      
      const userName = ticket.name || "Unknown User";
      const userPhone = ticket.phone || "";
      const userEmail = ticket.email || "";
      const userAvatar = (userName || "U")[0].toUpperCase();
      
      if (!conversationMap.has(userId)) {
        conversationMap.set(userId, {
          userId: userId,
          name: userName,
          phone: userPhone,
          email: userEmail,
          avatar: userAvatar,
          lastMessage: ticket.lastMessage || ticket.preview || ticket.subject || "No messages",
          lastMessageTime: ticket.lastMessageTime || ticket.createdAt || new Date(),
          hasUnread: ticket.hasNewMessage || false,
          ticketCount: 1,
          tickets: [ticket],
        });
      } else {
        const existing = conversationMap.get(userId);
        existing.ticketCount += 1;
        existing.tickets.push(ticket);
        // Update last message if newer
        const existingTime = new Date(existing.lastMessageTime);
        const newTime = new Date(ticket.lastMessageTime || ticket.createdAt);
        if (newTime > existingTime) {
          existing.lastMessage = ticket.lastMessage || ticket.preview || ticket.subject || "No messages";
          existing.lastMessageTime = ticket.lastMessageTime || ticket.createdAt;
        }
        if (ticket.hasNewMessage) {
          existing.hasUnread = true;
        }
      }
    });
    
    const conversationsArray = Array.from(conversationMap.values());
    // Sort by lastMessageTime descending (newest first)
    conversationsArray.sort((a, b) => {
      return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
    });
    
    setConversations(conversationsArray);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    fetchTickets(1);
  }, [fetchTickets]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const getCategoryIcon = (category) => {
    const icons = {
      deposit: "💳",
      withdrawal: "🏧",
      kyc: "🪪",
      general: "🎫",
      technical: "🔧",
      other: "📝"
    };
    return icons[category?.toLowerCase()] || "🎫";
  };

  const openReply = (ticket) => {
    setSelectedTicket(ticket);
    setReplyText("");
    setTicketMessages([]);
    setShowMessages(true);
    setShowReplySheet(true);
    document.body.style.overflow = "hidden";
    
    if (joinTicketRoom && ticket.ticketId) {
      joinTicketRoom(ticket.ticketId);
    }
    
    loadTicketMessages(ticket.ticketId);
    
    setTimeout(() => {
      if (replyInputRef.current) {
        replyInputRef.current.focus();
      }
    }, 300);
  };

  const loadTicketMessages = async (ticketId) => {
    try {
      const res = await axiosInstance.get(`/help/tickets/${ticketId}`, {
        headers: getAuthHeaders(),
      });
      if (res.data.success) {
        const replies = res.data.data.replies || [];
        const formattedMessages = replies.map(reply => ({
          _id: reply._id || Date.now().toString(),
          message: reply.message,
          sender: reply.isAdmin ? "admin" : "user",
          senderName: reply.isAdmin ? "Admin" : reply.senderName || "User",
          createdAt: reply.createdAt,
          isAdmin: reply.isAdmin || false,
        }));
        setTicketMessages(formattedMessages);
      }
    } catch (err) {
      console.error("Load ticket messages error:", err);
    }
  };

  const closeReply = () => {
    if (leaveTicketRoom && selectedTicket?.ticketId) {
      leaveTicketRoom(selectedTicket.ticketId);
    }
    
    setShowReplySheet(false);
    setSelectedTicket(null);
    setTicketMessages([]);
    setShowMessages(false);
    document.body.style.overflow = "auto";
  };

  const sendReply = async () => {
    if (!replyText.trim()) {
      showToast(t('pleaseWriteReply'));
      return;
    }
    
    if (!selectedTicket) {
      showToast(t('ticketNotFound'));
      return;
    }

    try {
      await axiosInstance.post(
        `/help/tickets/${selectedTicket.ticketId}/reply`,
        { message: replyText.trim() },
        { headers: getAuthHeaders() }
      );

      if (isConnected && selectedTicket.userId && sendMessage) {
        sendMessage(
          selectedTicket.userId,
          replyText.trim(),
          "admin",
          selectedTicket.ticketId
        );
      }

      const newMessage = {
        _id: Date.now().toString(),
        message: replyText.trim(),
        sender: "admin",
        senderName: "Admin",
        createdAt: new Date(),
        isAdmin: true,
      };
      setTicketMessages(prev => [...prev, newMessage]);

      setTickets(prev => prev.map(ticket => {
        if (ticket.ticketId === selectedTicket.ticketId) {
          return {
            ...ticket,
            hasNewMessage: false,
            lastMessage: replyText.trim(),
            lastMessageTime: new Date(),
          };
        }
        return ticket;
      }));

      setReplyText("");
      showToast(t('replySent'));
      
      setTimeout(() => fetchTickets(1), 1000);
    } catch (err) {
      console.error("Send reply error:", err);
      showToast(err.response?.data?.message || t('replyFailed'));
    }
  };

  const updateTicketStatus = async (ticketId, status) => {
    try {
      const res = await axiosInstance.patch(
        `/help/admin/tickets/${ticketId}/status`,
        { status },
        { headers: getAuthHeaders() }
      );
      return res.data;
    } catch (err) {
      console.error("Update status error:", err);
      throw err;
    }
  };

  const resolveTicket = async (ticket) => {
    try {
      await updateTicketStatus(ticket.ticketId, "resolved");
      
      if (isConnected && ticket.userId && sendMessage) {
        sendMessage(
          ticket.userId,
          `Your ticket "${ticket.subject}" has been resolved. ✅`,
          "admin",
          ticket.ticketId
        );
      }
      
      showToast(t('ticketResolved'));
      fetchTickets(1);
    } catch (err) {
      showToast(err.response?.data?.message || t('resolveFailed'));
    }
  };

  const escalateTicket = (ticket) => {
    if (isConnected && ticket.userId && sendMessage) {
      sendMessage(
        ticket.userId,
        `Your ticket "${ticket.subject}" has been escalated to senior admin.`,
        "admin",
        ticket.ticketId
      );
    }
    showToast(t('ticketEscalated'));
  };

  const archiveTicket = (id) => {
    setTickets((prev) => prev.filter((ticket) => ticket.ticketId !== id));
    showToast(t('ticketArchived'));
  };

  const toggleTicketExpand = (ticketId) => {
    if (expandedTicket === ticketId) {
      setExpandedTicket(null);
    } else {
      setExpandedTicket(ticketId);
    }
  };

  // Messaging Functions
  const openMessaging = () => {
    setShowMessaging(true);
    setShowReplySheet(false);
    document.body.style.overflow = "hidden";
  };

  const closeMessaging = () => {
    setShowMessaging(false);
    setSelectedConversation(null);
    setConversationMessages([]);
    document.body.style.overflow = "auto";
  };

  const selectConversation = async (conversation) => {
    if (!conversation || !conversation.userId) {
      console.error("Invalid conversation:", conversation);
      return;
    }
    
    setSelectedConversation(conversation);
    setConversationMessages([]);
    
    // Load messages for this user
    try {
      const res = await axiosInstance.get(`/admin/messages/${conversation.userId}`, {
        headers: getAuthHeaders(),
      });
      
      if (res.data && res.data.success) {
        const messages = res.data.data?.messages || [];
        const formattedMessages = messages.map(msg => ({
          _id: msg._id || Date.now().toString(),
          message: msg.message,
          sender: msg.senderRole === "admin" ? "admin" : "user",
          senderName: msg.senderName || (msg.senderRole === "admin" ? "Admin" : msg.senderName),
          createdAt: msg.createdAt || new Date(),
          isAdmin: msg.senderRole === "admin",
        }));
        setConversationMessages(formattedMessages);
      } else {
        // If API fails, show empty messages
        setConversationMessages([]);
      }
    } catch (err) {
      console.error("Load conversation error:", err);
      // If API fails, we can still show messages from tickets
      const ticketMessages = [];
      if (conversation.tickets && conversation.tickets.length > 0) {
        conversation.tickets.forEach(ticket => {
          if (ticket.message) {
            ticketMessages.push({
              _id: Date.now().toString() + Math.random(),
              message: ticket.message,
              sender: "user",
              senderName: conversation.name,
              createdAt: ticket.createdAt || new Date(),
              isAdmin: false,
            });
          }
        });
        setConversationMessages(ticketMessages);
      } else {
        setConversationMessages([]);
      }
    }
    
    // Join ticket room if there's a ticket
    if (conversation.tickets && conversation.tickets.length > 0) {
      const ticketId = conversation.tickets[0].ticketId || conversation.tickets[0].id;
      if (joinTicketRoom && ticketId) {
        joinTicketRoom(ticketId);
      }
    }
    
    // Focus on message input
    setTimeout(() => {
      if (messageInputRef.current) {
        messageInputRef.current.focus();
      }
    }, 300);
  };

  const sendMessageToUser = async () => {
    if (!messageInput.trim() || !selectedConversation || !selectedConversation.userId) {
      showToast(t('pleaseWriteReply'));
      return;
    }

    try {
      // Send via Socket.IO first (real-time)
      if (isConnected && sendMessage) {
        sendMessage(
          selectedConversation.userId,
          messageInput.trim(),
          "admin",
          selectedConversation.tickets?.[0]?.ticketId || null
        );
      }

      // Also try to send via API
      try {
        await axiosInstance.post(
          `/admin/messages/${selectedConversation.userId}`,
          { message: messageInput.trim() },
          { headers: getAuthHeaders() }
        );
      } catch (apiErr) {
        console.warn("API message send failed, but socket message sent:", apiErr);
      }

      const newMessage = {
        _id: Date.now().toString(),
        message: messageInput.trim(),
        sender: "admin",
        senderName: "Admin",
        createdAt: new Date(),
        isAdmin: true,
      };
      setConversationMessages(prev => [...prev, newMessage]);
      
      // Update conversation list
      setConversations(prev => prev.map(c => 
        c.userId === selectedConversation.userId 
          ? { ...c, lastMessage: messageInput.trim(), lastMessageTime: new Date(), hasUnread: false }
          : c
      ));

      setMessageInput("");
      showToast(t('messageSent'));
    } catch (err) {
      console.error("Send message error:", err);
      showToast(t('messageFailed'));
    }
  };

  const handleMessageKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessageToUser();
    }
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "urgent" && ticket.urgent) ||
      (activeFilter === "open" && !ticket.resolved && ticket.status !== "in_progress") ||
      (activeFilter === "deposit" && ticket.category === "deposit") ||
      (activeFilter === "kyc" && ticket.category === "kyc") ||
      (activeFilter === "withdraw" && ticket.category === "withdrawal") ||
      (activeFilter === "resolved" && ticket.resolved);

    const matchesSearch =
      searchQuery === "" ||
      (ticket.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.subject || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (ticket.ticketId || "").toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (ticket) => {
    if (ticket.resolved)
      return { class: "bg-green-500/15 text-green-500", text: t('resolved'), icon: "✅" };
    if (ticket.urgent)
      return { class: "bg-red-500/15 text-red-500", text: t('urgentBadge'), icon: "🔴" };
    if (ticket.status === "in_progress")
      return { class: "bg-amber-500/15 text-amber-500", text: t('inProgress'), icon: "🔄" };
    return { class: "bg-yellow-500/15 text-yellow-500", text: t('openBadge'), icon: "🟡" };
  };

  const getFilterLabels = () => [
    { id: "all", label: `${t('all')} (${tickets.length})` },
    { id: "urgent", label: t('urgentFilter') },
    { id: "open", label: t('openFilter') },
    { id: "deposit", label: t('depositIssues') },
    { id: "kyc", label: t('kycFilter') },
    { id: "withdraw", label: t('withdrawalFilter') },
    { id: "resolved", label: t('resolvedFilter') },
  ];

  const statCards = [
    { value: stats.open || 0, label: t('open'), color: "yellow" },
    { value: stats.urgent || 0, label: t('urgent'), color: "red" },
    { value: stats.resolvedToday || 0, label: t('resolvedToday'), color: "green" },
    { value: stats.avgResponse || "0h", label: t('avgResponse'), color: "blue" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-50 flex-wrap">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-bold text-foreground flex-1">
          {t('supportTickets')}
        </h1>
        <button
          onClick={openMessaging}
          className="px-3 py-1.5 rounded-lg bg-primary/15 text-primary text-xs font-bold flex items-center gap-1.5 hover:bg-primary/25 transition"
        >
          <MessageSquare size={14} /> {t('messaging')}
        </button>
        <span className="px-2 py-1 rounded-md bg-red-500/15 text-red-400 text-[10px] font-bold flex items-center gap-1">
          <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-400 animate-pulse" : "bg-gray-400"}`} />
          {t('admin')}
        </span>
        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-3 py-1.5 rounded-lg border border-border text-xs font-bold hover:border-primary transition"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 max-w-6xl mx-auto">
        {statCards.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-3 text-center"
          >
            <div
              className={`text-xl font-bold ${stat.color === "yellow" ? "text-amber-400" : stat.color === "red" ? "text-red-400" : stat.color === "green" ? "text-green-400" : "text-blue-400"}`}
            >
              {stat.value}
            </div>
            <div className="text-[10px] text-foreground/50 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="px-4 mb-3 max-w-6xl mx-auto">
        <div className="relative">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchTickets(1)}
            placeholder={t('searchPlaceholder')}
            className="w-full py-2.5 pl-9 pr-3 rounded-lg border border-border bg-card text-foreground text-sm outline-none focus:border-primary transition"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide max-w-6xl mx-auto">
        {getFilterLabels().map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 whitespace-nowrap transition ${
              activeFilter === filter.id
                ? "bg-primary text-white border-primary"
                : "border-border bg-card text-foreground/60 hover:border-primary"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12 max-w-6xl mx-auto">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      {/* Ticket List */}
      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-3">
        {!loading && filteredTickets.map((ticket) => {
          const statusBadge = getStatusBadge(ticket);
          const isExpanded = expandedTicket === ticket.ticketId;
          const hasNewMsg = ticket.hasNewMessage;
          
          return (
            <div
              key={ticket.id}
              className={`bg-card border rounded-xl overflow-hidden transition ${
                ticket.urgent ? "border-l-4 border-l-red-500 border-border" : "border-border"
              } ${hasNewMsg ? "ring-2 ring-primary/50" : ""}`}
            >
              <div className="p-4">
                <div 
                  className="flex gap-3 cursor-pointer"
                  onClick={() => toggleTicketExpand(ticket.ticketId)}
                >
                  <div
                    className={`w-9 h-9 rounded-lg bg-linear-to-r ${ticket.avatarBg || "from-primary to-primary-light"} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  >
                    {ticket.avatar || (ticket.name ? ticket.name[0] : "?")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-sm text-foreground truncate">
                        {ticket.subject}
                      </div>
                      {hasNewMsg && (
                        <span className="w-2 h-2 rounded-full bg-primary animate-pulse shrink-0" />
                      )}
                    </div>
                    <div className="text-xs text-foreground/50 mt-0.5 truncate">
                      {ticket.ticketId || ticket.id} · {ticket.name || t('unknown')} · {ticket.phone || ""} ·{" "}
                      {ticket.time || new Date(ticket.createdAt).toLocaleString()}
                    </div>
                    {ticket.lastMessage && (
                      <div className="text-xs text-foreground/40 mt-1 truncate">
                        💬 {ticket.lastMessage}
                      </div>
                    )}
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadge.class}`}
                      >
                        {statusBadge.text}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                        {ticket.categoryIcon || "🎫"} {ticket.category || "General"}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </div>
                </div>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-border">
                    <p className="text-xs text-foreground/60 leading-relaxed">
                      {ticket.message || ticket.preview || t('noDetails')}
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                      <button
                        onClick={() => openReply(ticket)}
                        className="py-2 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition flex items-center justify-center gap-1"
                      >
                        <Reply size={12} /> {t('reply')}
                      </button>
                      {!ticket.resolved && (
                        <button
                          onClick={() => resolveTicket(ticket)}
                          className="py-2 rounded-lg border border-green-500/30 text-green-500 text-xs font-semibold hover:bg-green-500/10 transition flex items-center justify-center gap-1"
                        >
                          <CheckCircle size={12} /> {t('resolve')}
                        </button>
                      )}
                      <button
                        onClick={() => escalateTicket(ticket)}
                        className="py-2 rounded-lg border border-amber-500/30 text-amber-500 text-xs font-semibold hover:bg-amber-500/10 transition flex items-center justify-center gap-1"
                      >
                        <Flag size={12} /> {t('escalate')}
                      </button>
                      <button
                        onClick={() => archiveTicket(ticket.ticketId)}
                        className="py-2 rounded-lg border border-border text-foreground/60 text-xs font-semibold hover:border-red-500/50 transition flex items-center justify-center gap-1"
                      >
                        <Archive size={12} /> {t('archive')}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Messaging Modal */}
      <AnimatePresence>
        {showMessaging && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-50"
              onClick={closeMessaging}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl z-50 max-h-[90vh] overflow-hidden flex flex-col"
            >
              <div className="max-w-6xl mx-auto w-full flex flex-col h-full max-h-[90vh]">
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={closeMessaging}
                      className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                    >
                      <XCircle size={16} />
                    </button>
                    <div>
                      <div className="font-bold text-foreground text-sm flex items-center gap-2">
                        <MessageSquare size={16} className="text-primary" />
                        {t('messaging')}
                      </div>
                      <div className="text-xs text-foreground/50 flex items-center gap-1">
                        <span className={`w-1.5 h-1.5 rounded-full ${isConnected ? "bg-green-500" : "bg-gray-400"}`} />
                        {isConnected ? t('online') : t('offline')}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-foreground/40">
                    {conversations.length} conversations
                  </span>
                </div>

                {/* Two Column Layout */}
                <div className="flex-1 overflow-hidden flex flex-col md:flex-row">
                  {/* Conversations List */}
                  <div className="w-full md:w-80 border-r border-border overflow-y-auto max-h-[300px] md:max-h-full">
                    <div className="p-3">
                      <div className="relative mb-3">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
                        <input
                          type="text"
                          placeholder="Search conversations..."
                          className="w-full py-1.5 pl-8 pr-3 rounded-lg border border-border bg-background text-foreground text-xs outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="space-y-1 px-2 pb-2">
                      {conversations.length === 0 ? (
                        <div className="text-center py-8 text-foreground/40 text-sm">
                          <Inbox size={32} className="mx-auto mb-2 opacity-30" />
                          {t('noConversations')}
                        </div>
                      ) : (
                        conversations.map((conv) => (
                          <div
                            key={conv.userId}
                            onClick={() => selectConversation(conv)}
                            className={`p-3 rounded-lg cursor-pointer transition ${
                              selectedConversation?.userId === conv.userId
                                ? "bg-primary/10 border border-primary/30"
                                : "hover:bg-primary/5 border border-transparent"
                            } ${conv.hasUnread ? "border-l-2 border-l-primary" : ""}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-xs">
                                {conv.avatar || (conv.name ? conv.name[0] : "U")}
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between">
                                  <div className="font-semibold text-xs text-foreground truncate">
                                    {conv.name || "Unknown User"}
                                  </div>
                                  {conv.hasUnread && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                                  )}
                                </div>
                                <div className="text-[10px] text-foreground/40 truncate">
                                  {conv.lastMessage || "No messages yet"}
                                </div>
                                <div className="text-[9px] text-foreground/30">
                                  {conv.ticketCount} ticket{conv.ticketCount > 1 ? 's' : ''}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Messages Area */}
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {selectedConversation ? (
                      <>
                        {/* Conversation Header */}
                        <div className="p-3 border-b border-border bg-background/50 shrink-0">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-xs">
                              {selectedConversation.avatar || (selectedConversation.name ? selectedConversation.name[0] : "U")}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-sm text-foreground truncate">
                                {selectedConversation.name || "Unknown User"}
                              </div>
                              <div className="text-xs text-foreground/40">
                                {selectedConversation.phone || ""}
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                          {conversationMessages.length === 0 ? (
                            <div className="text-center py-8 text-foreground/40 text-sm">
                              {t('noMessages')}
                            </div>
                          ) : (
                            conversationMessages.map((msg, idx) => (
                              <div
                                key={msg._id || idx}
                                className={`flex ${msg.isAdmin ? "justify-end" : "justify-start"}`}
                              >
                                <div
                                  className={`max-w-[75%] px-3 py-2 rounded-lg text-sm ${
                                    msg.isAdmin
                                      ? "bg-primary text-white rounded-br-none"
                                      : "bg-border/50 text-foreground rounded-bl-none"
                                  }`}
                                >
                                  {msg.message}
                                  <div className={`text-[9px] mt-1 ${msg.isAdmin ? "text-white/60" : "text-foreground/40"}`}>
                                    {msg.createdAt ? new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : ""}
                                  </div>
                                </div>
                              </div>
                            ))
                          )}
                          <div ref={messagesEndRef} />
                        </div>

                        {/* Message Input */}
                        <div className="p-3 border-t border-border shrink-0">
                          <div className="flex items-center gap-2">
                            <input
                              ref={messageInputRef}
                              type="text"
                              value={messageInput}
                              onChange={(e) => setMessageInput(e.target.value)}
                              onKeyDown={handleMessageKeyPress}
                              placeholder={t('typeMessage')}
                              className="flex-1 px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                            />
                            <button
                              onClick={sendMessageToUser}
                              disabled={!messageInput.trim()}
                              className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary/90 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              <Send size={16} />
                            </button>
                          </div>
                          <div className="text-[9px] text-foreground/30 mt-1">
                            Press Enter to send
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="flex-1 flex items-center justify-center text-foreground/40 text-sm">
                        <div className="text-center">
                          <MessageSquare size={48} className="mx-auto mb-3 opacity-30" />
                          {t('selectConversation')}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Reply Sheet Modal with Messages */}
      <AnimatePresence>
        {showReplySheet && selectedTicket && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-50"
              onClick={closeReply}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl z-50 max-h-[90vh] overflow-y-auto"
            >
              <div className="max-w-2xl mx-auto p-5">
                <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
                
                {/* Header */}
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <div className="font-bold text-foreground text-base">
                      {t('replyToTicket')}
                    </div>
                    <div className="text-xs text-foreground/50">
                      {t('replyingTo')} {selectedTicket.name || t('unknown')}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${isConnected ? "bg-green-500/15 text-green-500" : "bg-gray-500/15 text-gray-500"}`}>
                      {isConnected ? t('online') : t('offline')}
                    </span>
                    <button
                      onClick={closeReply}
                      className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                </div>

                {/* Messages History */}
                {showMessages && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-foreground/60 mb-2 flex items-center gap-2">
                      <MessageSquare size={14} /> {t('previousMessages')} ({ticketMessages.length})
                    </div>
                    <div className="bg-background rounded-xl p-3 max-h-48 overflow-y-auto">
                      {ticketMessages.length === 0 ? (
                        <div className="text-center text-foreground/40 text-sm py-4">
                          {t('noMessages')}
                        </div>
                      ) : (
                        ticketMessages.map((msg, idx) => (
                          <div
                            key={msg._id || idx}
                            className={`mb-2 p-2 rounded-lg ${
                              msg.isAdmin
                                ? "bg-primary/5 border border-primary/20 ml-4"
                                : "bg-border/30 border border-border mr-4"
                            }`}
                          >
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-xs font-semibold text-foreground">
                                {msg.isAdmin ? "🛡️ " + t('admin') : "👤 " + (msg.senderName || t('user'))}
                              </span>
                              <span className="text-[10px] text-foreground/40">
                                {msg.createdAt ? new Date(msg.createdAt).toLocaleString() : ""}
                              </span>
                            </div>
                            <div className="text-sm text-foreground/70">
                              {msg.message}
                            </div>
                          </div>
                        ))
                      )}
                      <div ref={messagesEndRef} />
                    </div>
                  </div>
                )}

                {/* Reply Input */}
                <textarea
                  ref={replyInputRef}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={4}
                  placeholder={t('replyPlaceholder')}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition resize-none text-sm"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.ctrlKey) {
                      e.preventDefault();
                      sendReply();
                    }
                  }}
                />
                <div className="text-[10px] text-foreground/30 mt-1">
                  Press Ctrl+Enter to send
                </div>

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={closeReply}
                    className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold text-sm"
                  >
                    {t('cancel')}
                  </button>
                  <button
                    onClick={sendReply}
                    disabled={!replyText.trim()}
                    className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send size={14} /> {t('sendReply')}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSupportPage;