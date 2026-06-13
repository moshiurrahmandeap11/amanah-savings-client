"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import Link from "next/link";

const AdminSupportPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showReplySheet, setShowReplySheet] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [openCount, setOpenCount] = useState(38);

  const stats = [
    { value: openCount, label: "Open", color: "yellow" },
    { value: 7, label: "Urgent", color: "red" },
    { value: 124, label: "Resolved Today", color: "green" },
    { value: "2.4h", label: "Avg Response", color: "blue" },
  ];

  const [tickets, setTickets] = useState([
    {
      id: "tk-1",
      avatar: "F",
      avatarBg: "from-primary to-primary-light",
      name: "Fatema Akhter",
      phone: "01712-345678",
      ticketId: "#TK-2026-0841",
      time: "15 min ago",
      subject: "Deposit screenshot rejected but payment went through",
      preview:
        "I sent ৳5,000 via bKash on June 5 at 10:32 AM. Transaction ID: 8NKH31ABC2. The deposit was rejected saying 'invalid screenshot' but the money was deducted from my bKash account. Please help urgently.",
      category: "Deposit Issue",
      categoryIcon: "💳",
      status: "urgent",
      resolved: false,
      urgent: true,
    },
    {
      id: "tk-2",
      avatar: "K",
      avatarBg: "from-amber-500 to-orange-500",
      name: "Karim Uddin",
      phone: "01812-654321",
      ticketId: "#TK-2026-0839",
      time: "32 min ago",
      subject: "KYC rejected 3 times — documents are clear",
      preview:
        "I have submitted my NID 3 times and every time it says 'image unclear'. I am using a new phone with a 108MP camera. My NID is physical — not expired. Please manually review my application.",
      category: "KYC",
      categoryIcon: "🪪",
      status: "urgent",
      resolved: false,
      urgent: true,
    },
    {
      id: "tk-3",
      avatar: "N",
      avatarBg: "from-purple-500 to-indigo-500",
      name: "Nasrin Khatun",
      phone: "01677-000222",
      ticketId: "#TK-2026-0835",
      time: "1 hour ago",
      subject: "Cannot withdraw — goal maturity date issue",
      preview:
        "My savings goal matured on June 1, 2026 but I still cannot withdraw. The system shows 'Goal locked until Jun 1 2026' but today is June 5. Please unlock my withdrawal.",
      category: "Withdrawal",
      categoryIcon: "🏧",
      status: "open",
      resolved: false,
      urgent: false,
    },
    {
      id: "tk-4",
      avatar: "R",
      avatarBg: "from-primary to-primary-light",
      name: "Rahim Islam",
      phone: "01911-000111",
      ticketId: "#TK-2026-0831",
      time: "2 hours ago",
      subject: "How to add a family member to my savings goal?",
      preview:
        "I want my wife to also deposit into my home savings goal. Is there a way to share the goal or add her as a co-saver? We both have Amanah accounts.",
      category: "General",
      categoryIcon: "❓",
      status: "open",
      resolved: false,
      urgent: false,
    },
    {
      id: "tk-5",
      avatar: "S",
      avatarBg: "from-green-500 to-primary",
      name: "Sumaiya Begum",
      phone: "01533-000999",
      ticketId: "#TK-2026-0820",
      time: "4 hours ago",
      subject: "PIN reset not working — OTP not received",
      preview:
        "Resolved by Admin: OTP was being sent to old number. Updated contact and resent OTP. User confirmed PIN reset successful.",
      category: "Security",
      categoryIcon: "🔐",
      status: "resolved",
      resolved: true,
      urgent: false,
    },
  ]);

  const templates = [
    "We have received your request and are looking into it. We will get back to you within 24 hours.",
    "Your deposit has been verified and credited to your account. Please check your balance.",
    "Your KYC has been manually reviewed and approved. You now have full access.",
    "We have unlocked your withdrawal. Please try again now.",
    "Thank you for your patience. Your issue has been resolved.",
  ];

  useEffect(() => {
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

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
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

  const insertTemplate = (text) => {
    setReplyText(text);
  };

  const sendReply = () => {
    if (!replyText.trim()) {
      showToast(
        lang === "bn" ? "⚠️ দয়া করে উত্তর লিখুন" : "⚠️ Please write a reply",
      );
      return;
    }
    closeReply();
    showToast(
      lang === "bn"
        ? "✅ উত্তর সফলভাবে পাঠানো হয়েছে"
        : "✅ Reply sent successfully",
    );
  };

  const resolveTicket = (id) => {
    setTickets((prev) =>
      prev.map((ticket) =>
        ticket.id === id
          ? { ...ticket, resolved: true, status: "resolved", urgent: false }
          : ticket,
      ),
    );
    setOpenCount((prev) => Math.max(0, prev - 1));
    showToast(
      lang === "bn"
        ? "✅ টিকেট সমাধান হিসেবে চিহ্নিত হয়েছে"
        : "✅ Ticket marked as resolved",
    );
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
      (activeFilter === "deposit" && ticket.category === "Deposit Issue") ||
      (activeFilter === "kyc" && ticket.category === "KYC") ||
      (activeFilter === "withdraw" && ticket.category === "Withdrawal") ||
      (activeFilter === "resolved" && ticket.resolved);

    const matchesSearch =
      searchQuery === "" ||
      ticket.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.ticketId.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const getStatusBadge = (ticket) => {
    if (ticket.resolved)
      return { class: "tbadge-resolved", text: "✅ Resolved", icon: "✅" };
    if (ticket.urgent)
      return { class: "tbadge-urgent", text: "🔴 Urgent", icon: "🔴" };
    return { class: "tbadge-open", text: "🟡 Open", icon: "🟡" };
  };

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
        {stats.map((stat, idx) => (
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

      {/* Ticket List */}
      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-3">
        {filteredTickets.map((ticket) => {
          const statusBadge = getStatusBadge(ticket);
          return (
            <div
              key={ticket.id}
              className={`bg-card border rounded-xl overflow-hidden transition ${ticket.urgent ? "border-l-4 border-l-red-500 border-border" : "border-border"}`}
            >
              <div className="p-4">
                <div className="flex gap-3">
                  <div
                    className={`w-9 h-9 rounded-lg bg-linear-to-r ${ticket.avatarBg} flex items-center justify-center text-white font-bold text-sm shrink-0`}
                  >
                    {ticket.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm text-foreground">
                      {ticket.subject}
                    </div>
                    <div className="text-xs text-foreground/50 mt-0.5">
                      {ticket.ticketId} · {ticket.name} · {ticket.phone} ·{" "}
                      {ticket.time}
                    </div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadge.class}`}
                      >
                        {statusBadge.text}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400">
                        {ticket.categoryIcon} {ticket.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    {ticket.preview}
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
                  {selectedTicket.name}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-2 mb-3 scrollbar-hide">
                  {templates.map((template, idx) => (
                    <button
                      key={idx}
                      onClick={() => insertTemplate(template)}
                      className="px-3 py-1.5 rounded-full bg-border text-foreground/60 text-[10px] font-semibold whitespace-nowrap hover:bg-primary/20 hover:text-primary transition"
                    >
                      {lang === "bn"
                        ? idx === 0
                          ? "রিসিভড — ২৪ ঘণ্টা"
                          : idx === 1
                            ? "জমা ঠিক আছে"
                            : idx === 2
                              ? "KYC অনুমোদিত"
                              : idx === 3
                                ? "উত্তোলন আনলকড"
                                : "সমাধান"
                        : idx === 0
                          ? "Received — 24h"
                          : idx === 1
                            ? "Deposit OK"
                            : idx === 2
                              ? "KYC Approved"
                              : idx === 3
                                ? "Withdrawal Unlocked"
                                : "Resolved"}
                    </button>
                  ))}
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
