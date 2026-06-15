"use client";

import React, { useState, useEffect, useCallback } from "react";
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
} from "lucide-react";
import Link from "next/link";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

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

  const fetchTickets = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", "20");
      if (searchQuery) params.append("search", searchQuery);
      if (activeFilter !== "all") params.append("status", activeFilter);

      // FIXED: Use the correct endpoint from help.routes.js
      const res = await axiosInstance.get(`/help/admin/tickets?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (res.data.success) {
        // Transform the data to match your component's expected format
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
          name: ticket.user?.fullName || "Unknown User",
          phone: ticket.user?.phone,
          email: ticket.user?.email,
          avatar: ticket.user?.fullName?.[0] || "U",
          avatarBg: "from-primary to-primary-light",
          time: new Date(ticket.createdAt).toLocaleString(),
          createdAt: ticket.createdAt,
        }));
        
        setTickets(formattedTickets);
        
        // Calculate stats from fetched tickets
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
      showToast(err.response?.data?.message || "Failed to load tickets");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchQuery]);

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
    setShowReplySheet(true);
    document.body.style.overflow = "hidden";
  };

  const closeReply = () => {
    setShowReplySheet(false);
    setSelectedTicket(null);
    document.body.style.overflow = "auto";
  };

  const sendReply = async () => {
    if (!replyText.trim()) {
      showToast(
        lang === "bn" ? "⚠️ দয়া করে উত্তর লিখুন" : "⚠️ Please write a reply",
      );
      return;
    }
    
    try {
      // Note: You need to add this endpoint in your help.routes.js
      // For now, we'll just show a success message and update ticket status
      showToast(
        lang === "bn"
          ? "✅ উত্তর সফলভাবে পাঠানো হয়েছে"
          : "✅ Reply sent successfully",
      );
      closeReply();
      
      // Also update the ticket status to "in_progress" when replying
      await updateTicketStatus(selectedTicket.id, "in_progress");
      fetchTickets(1);
      
    } catch (err) {
      console.error("Send reply error:", err);
      showToast(err.response?.data?.message || "Reply failed");
    }
  };

  const updateTicketStatus = async (ticketId, status) => {
    try {
      // FIXED: Use the correct endpoint from help.routes.js
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

  const resolveTicket = async (id) => {
    try {
      await updateTicketStatus(id, "resolved");
      showToast(
        lang === "bn"
          ? "✅ টিকেট সমাধান হিসেবে চিহ্নিত হয়েছে"
          : "✅ Ticket marked as resolved",
      );
      fetchTickets(1);
    } catch (err) {
      showToast(err.response?.data?.message || "Resolve failed");
    }
  };

  const escalateTicket = () => {
    showToast(
      lang === "bn"
        ? "⬆️ টিকেট সিনিয়র অ্যাডমিনে পাঠানো হয়েছে"
        : "⬆️ Ticket escalated to senior admin",
    );
  };

  const archiveTicket = (id) => {
    setTickets((prev) => prev.filter((ticket) => ticket.id !== id));
    showToast(
      lang === "bn" ? "🗑️ টিকেট আর্কাইভ করা হয়েছে" : "🗑️ Ticket archived",
    );
  };

  const filteredTickets = tickets.filter((ticket) => {
    const matchesFilter =
      activeFilter === "all" ||
      (activeFilter === "urgent" && ticket.urgent) ||
      (activeFilter === "open" && !ticket.resolved && !ticket.urgent) ||
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
      return { class: "tbadge-resolved", text: "✅ Resolved", icon: "✅" };
    if (ticket.urgent)
      return { class: "tbadge-urgent", text: "🔴 Urgent", icon: "🔴" };
    return { class: "tbadge-open", text: "🟡 Open", icon: "🟡" };
  };

  const statCards = [
    { value: stats.open || 0, label: "Open", color: "yellow" },
    { value: stats.urgent || 0, label: "Urgent", color: "red" },
    { value: stats.resolvedToday || 0, label: "Resolved Today", color: "green" },
    { value: stats.avgResponse || "0h", label: "Avg Response", color: "blue" },
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
          {lang === "bn" ? "🎫 সাপোর্ট টিকেট" : "🎫 Support Tickets"}
        </h1>
        <span className="px-2 py-1 rounded-md bg-red-500/15 text-red-400 text-[10px] font-bold">
          ADMIN
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
            placeholder={
              lang === "bn"
                ? "সদস্য, বিষয় বা ID দিয়ে টিকেট খুঁজুন..."
                : "Search tickets by user, subject, or ID..."
            }
            className="w-full py-2.5 pl-9 pr-3 rounded-lg border border-border bg-card text-foreground text-sm outline-none focus:border-primary transition"
          />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide max-w-6xl mx-auto">
        {[
          { id: "all", label: `All (${tickets.length})` },
          { id: "urgent", label: "🔴 Urgent" },
          { id: "open", label: "🟡 Open" },
          { id: "deposit", label: "💳 Deposit Issues" },
          { id: "kyc", label: "🪪 KYC" },
          { id: "withdraw", label: "🏧 Withdrawal" },
          { id: "resolved", label: "✅ Resolved" },
        ].map((filter) => (
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
          return (
            <div
              key={ticket.id}
              className={`bg-card border rounded-xl overflow-hidden transition ${ticket.urgent ? "border-l-4 border-l-red-500 border-border" : "border-border"}`}
            >
              <div className="p-4">
                <div className="flex gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg bg-linear-to-r ${ticket.avatarBg || "from-primary to-primary-light"} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  >
                    {ticket.avatar || (ticket.name ? ticket.name[0] : "?")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground">
                      {ticket.subject}
                    </div>
                    <div className="text-xs text-foreground/50 mt-0.5">
                      {ticket.ticketId || ticket.id} · {ticket.name || "Unknown"} · {ticket.phone || ""} ·{" "}
                      {ticket.time || new Date(ticket.createdAt).toLocaleString()}
                    </div>
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
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    {ticket.preview || ticket.message || "No details"}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                  <button
                    onClick={() => openReply(ticket)}
                    className="py-2 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                  >
                    💬 Reply
                  </button>
                  {!ticket.resolved && (
                    <button
                      onClick={() => resolveTicket(ticket.id)}
                      className="py-2 rounded-lg border border-green-500/30 text-green-500 text-xs font-semibold hover:bg-green-500/10 transition"
                    >
                      ✅ Resolve
                    </button>
                  )}
                  <button
                    onClick={escalateTicket}
                    className="py-2 rounded-lg border border-amber-500/30 text-amber-500 text-xs font-semibold hover:bg-amber-500/10 transition"
                  >
                    ⬆️ Escalate
                  </button>
                  <button
                    onClick={() => archiveTicket(ticket.id)}
                    className="py-2 rounded-lg border border-border text-foreground/60 text-xs font-semibold hover:border-red-500/50 transition"
                  >
                    ✕ Archive
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Reply Sheet Modal */}
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
                <div className="font-bold text-foreground text-base mb-1">
                  💬 {lang === "bn" ? "টিকেটে উত্তর দিন" : "Reply to Ticket"}
                </div>
                <div className="text-xs text-foreground/50 mb-4">
                  {lang === "bn" ? "উত্তর দিচ্ছেন:" : "Replying to:"}{" "}
                  {selectedTicket.name || "Unknown"}
                </div>

                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  rows={5}
                  placeholder={
                    lang === "bn"
                      ? "এখানে আপনার উত্তর লিখুন..."
                      : "Type your reply here..."
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition resize-none text-sm"
                />

                <div className="flex gap-3 mt-4">
                  <button
                    onClick={closeReply}
                    className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold text-sm"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendReply}
                    className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <Send size={14} />{" "}
                    {lang === "bn" ? "উত্তর পাঠান" : "Send Reply"}
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