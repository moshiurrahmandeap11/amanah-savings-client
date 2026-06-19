"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Reply,
  CheckCircle,
  XCircle,
  Loader2,
  Clock,
  Mail,
  Phone,
  User,
  Tag,
  Trash2,
  RefreshCw,
  Filter,
  ChevronDown,
  MessageSquare,
  ArrowLeft,
  Send,
} from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const AdminContactPage = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  const statusOptions = [
    { value: "all", label: "All Messages" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "replied", label: "Replied" },
    { value: "resolved", label: "Resolved" },
  ];

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchMessages = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", pagination.itemsPerPage);
      if (searchQuery) params.append("search", searchQuery);
      if (statusFilter !== "all") params.append("status", statusFilter);

      const res = await axiosInstance.get(
        `/contact/admin/messages?${params.toString()}`,
        { headers: getAuthHeaders() }
      );

      if (res.data.success) {
        setMessages(res.data.data.messages);
        setPagination(res.data.data.pagination);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to fetch messages", "error");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, statusFilter, pagination.itemsPerPage]);

  useEffect(() => {
    fetchMessages(1);
  }, [fetchMessages]);

  const fetchMessageDetails = async (id) => {
    try {
      const res = await axiosInstance.get(
        `/contact/admin/messages/${id}`,
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        setSelectedMessage(res.data.data);
        setShowMessageModal(true);
        document.body.style.overflow = "hidden";
        // Refresh list to update read status
        fetchMessages(pagination.currentPage);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to load message", "error");
    }
  };

  const sendReply = async () => {
    if (!replyText.trim()) {
      showToast("Please enter a reply message", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const res = await axiosInstance.post(
        `/contact/admin/messages/${selectedMessage._id}/reply`,
        { replyMessage: replyText },
        { headers: getAuthHeaders() }
      );

      if (res.data.success) {
        showToast("Reply sent successfully!", "success");
        setReplyText("");
        setShowReplyModal(false);
        fetchMessages(pagination.currentPage);
        // Update selected message
        if (selectedMessage) {
          setSelectedMessage({
            ...selectedMessage,
            status: "replied",
            replyMessage: replyText,
            repliedAt: new Date(),
          });
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to send reply", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const res = await axiosInstance.patch(
        `/contact/admin/messages/${id}/status`,
        { status },
        { headers: getAuthHeaders() }
      );

      if (res.data.success) {
        showToast(`Status updated to ${status}`, "success");
        fetchMessages(pagination.currentPage);
        if (selectedMessage && selectedMessage._id === id) {
          setSelectedMessage({ ...selectedMessage, status });
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update status", "error");
    }
  };

  const deleteMessage = async (id) => {
    const result = await Swal.fire({
      title: "Delete Message?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#059669",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(
          `/contact/admin/messages/${id}`,
          { headers: getAuthHeaders() }
        );

        if (res.data.success) {
          showToast("Message deleted successfully", "success");
          fetchMessages(pagination.currentPage);
          if (selectedMessage && selectedMessage._id === id) {
            setShowMessageModal(false);
            setSelectedMessage(null);
          }
        }
      } catch (err) {
        showToast(err.response?.data?.message || "Failed to delete message", "error");
      }
    }
  };

  const showToast = (message, type = "success") => {
    Swal.fire({
      title: type === "success" ? "Success" : type === "error" ? "Error" : "Warning",
      text: message,
      icon: type,
      confirmButtonColor: "#059669",
      timer: 3000,
      showConfirmButton: true,
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      pending: { label: "Pending", color: "bg-amber-500/20 dark:bg-amber-500/30 text-amber-500 dark:text-amber-400" },
      in_progress: { label: "In Progress", color: "bg-blue-500/20 dark:bg-blue-500/30 text-blue-500 dark:text-blue-400" },
      replied: { label: "Replied", color: "bg-green-500/20 dark:bg-green-500/30 text-green-500 dark:text-green-400" },
      resolved: { label: "Resolved", color: "bg-emerald-500/20 dark:bg-emerald-500/30 text-emerald-500 dark:text-emerald-400" },
    };
    return statusMap[status] || statusMap.pending;
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTopicIcon = (topic) => {
    const icons = {
      general: "📝",
      support: "🛠️",
      bug: "🐛",
      feedback: "💡",
      feature: "✨",
      complaint: "⚠️",
    };
    return icons[topic] || "📝";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">📬 Contact Messages</h2>
          <p className="text-xs text-foreground/50">
            {pagination.totalItems} total messages · {messages.filter(m => m.status === "pending").length} pending
          </p>
        </div>
        <button
          onClick={() => fetchMessages(1)}
          className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
        >
          <RefreshCw size={16} /> Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background/80 dark:bg-background/60 backdrop-blur-sm">
          <Search size={16} className="text-foreground/50" />
          <input
            type="text"
            placeholder="Search by name, phone, email, message..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchMessages(1)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg border border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm text-foreground/70 text-sm font-semibold appearance-none cursor-pointer pr-8 hover:border-primary/50 transition-all duration-300"
            >
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <Filter size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-foreground/50 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare size={48} className="text-foreground/20 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Messages</h3>
            <p className="text-sm text-foreground/50">No contact messages found</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-border/50 dark:border-border/30 bg-background/80 dark:bg-background/60">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">User</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Topic</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Message</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg) => {
                    const status = getStatusBadge(msg.status);
                    const isUnread = !msg.isRead;
                    return (
                      <tr
                        key={msg._id}
                        className={`border-b border-border/50 dark:border-border/30 last:border-0 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200 ${
                          isUnread ? "bg-primary/5 dark:bg-primary/10" : ""
                        }`}
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shadow-lg">
                              {msg.name?.[0]?.toUpperCase() || "?"}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-foreground flex items-center gap-2">
                                {msg.name}
                                {isUnread && (
                                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                                )}
                              </div>
                              <div className="text-xs text-foreground/50">
                                {msg.user ? "👤 Registered" : "👤 Guest"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-xs text-foreground">
                            {msg.phone && (
                              <div className="flex items-center gap-1">
                                <Phone size={12} className="text-foreground/40" />
                                {msg.phone}
                              </div>
                            )}
                            {msg.email && (
                              <div className="flex items-center gap-1 text-foreground/60">
                                <Mail size={12} className="text-foreground/40" />
                                {msg.email}
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-sm text-foreground">
                            {getTopicIcon(msg.topic)} {msg.topic || "General"}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <p className="text-sm text-foreground/70 truncate max-w-[200px]">
                            {msg.message}
                          </p>
                        </td>
                        <td className="px-4 py-3">
                          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${status.color}`}>
                            {status.label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="text-xs text-foreground/50">
                            {formatDate(msg.createdAt)}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => fetchMessageDetails(msg._id)}
                              className="p-1.5 rounded-lg border border-border/60 dark:border-border/40 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300"
                              title="View"
                            >
                              <Eye size={14} className="text-foreground/70" />
                            </button>
                            <button
                              onClick={() => {
                                setSelectedMessage(msg);
                                setShowReplyModal(true);
                              }}
                              className="p-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300"
                              title="Reply"
                            >
                              <Reply size={14} />
                            </button>
                            <button
                              onClick={() => deleteMessage(msg._id)}
                              className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all duration-300"
                              title="Delete"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-border/50 dark:border-border/30 bg-background/80 dark:bg-background/60">
              <div className="text-xs text-foreground/50">
                Showing {messages.length} of {pagination.totalItems} messages
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchMessages(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                  className="px-3 py-1 rounded-lg border border-border/60 dark:border-border/40 text-xs font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => fetchMessages(page)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 ${
                        pagination.currentPage === page
                          ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20"
                          : "border border-border/60 dark:border-border/40 hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => fetchMessages(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className="px-3 py-1 rounded-lg border border-border/60 dark:border-border/40 text-xs font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Message Detail Modal */}
      <AnimatePresence>
        {showMessageModal && selectedMessage && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowMessageModal(false);
              document.body.style.overflow = "auto";
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card/95 dark:bg-card/90 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white relative">
                <button
                  onClick={() => {
                    setShowMessageModal(false);
                    document.body.style.overflow = "auto";
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  ✕
                </button>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                    {selectedMessage.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <div className="text-xl font-bold">{selectedMessage.name}</div>
                    <div className="text-sm text-white/80">
                      {selectedMessage.phone && `📱 ${selectedMessage.phone}`}
                      {selectedMessage.email && ` · ✉️ ${selectedMessage.email}`}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                    <div className="text-[10px] text-foreground/50">Topic</div>
                    <div className="text-sm font-semibold text-foreground">
                      {getTopicIcon(selectedMessage.topic)} {selectedMessage.topic || "General"}
                    </div>
                  </div>
                  <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                    <div className="text-[10px] text-foreground/50">Status</div>
                    <div className="text-sm font-semibold">
                      <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadge(selectedMessage.status).color}`}>
                        {getStatusBadge(selectedMessage.status).label}
                      </span>
                    </div>
                  </div>
                  <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                    <div className="text-[10px] text-foreground/50">Received</div>
                    <div className="text-sm font-semibold text-foreground">{formatDate(selectedMessage.createdAt)}</div>
                  </div>
                  <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                    <div className="text-[10px] text-foreground/50">User Type</div>
                    <div className="text-sm font-semibold text-foreground">
                      {selectedMessage.user ? "👤 Registered" : "👤 Guest"}
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Message</div>
                  <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>

                {selectedMessage.replyMessage && (
                  <div className="mb-5">
                    <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">Reply</div>
                    <div className="bg-primary/10 dark:bg-primary/5 backdrop-blur-sm rounded-xl p-4 border border-primary/20">
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {selectedMessage.replyMessage}
                      </p>
                      <div className="text-xs text-foreground/50 mt-2">
                        Replied: {formatDate(selectedMessage.repliedAt)}
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-3">
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => {
                      updateStatus(selectedMessage._id, e.target.value);
                      setSelectedMessage({ ...selectedMessage, status: e.target.value });
                    }}
                    className="px-4 py-2 rounded-lg border border-border bg-background/80 text-foreground text-sm font-semibold"
                  >
                    <option value="pending">Pending</option>
                    <option value="in_progress">In Progress</option>
                    <option value="replied">Replied</option>
                    <option value="resolved">Resolved</option>
                  </select>
                  <button
                    onClick={() => {
                      setShowReplyModal(true);
                    }}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
                  >
                    <Reply size={16} /> Reply
                  </button>
                  <button
                    onClick={() => deleteMessage(selectedMessage._id)}
                    className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                  >
                    <Trash2 size={16} /> Delete
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Reply Modal */}
      <AnimatePresence>
        {showReplyModal && selectedMessage && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowReplyModal(false);
              setReplyText("");
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card/95 dark:bg-card/90 backdrop-blur-sm rounded-2xl max-w-lg w-full border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white relative">
                <button
                  onClick={() => {
                    setShowReplyModal(false);
                    setReplyText("");
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  ✕
                </button>
                <div className="flex items-center gap-3">
                  <Reply size={24} />
                  <div>
                    <div className="text-xl font-bold">Reply to Message</div>
                    <div className="text-sm text-white/80">
                      Replying to {selectedMessage.name}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-4">
                  <div className="text-xs text-foreground/50 mb-2">Original Message:</div>
                  <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50 text-sm text-foreground/70 max-h-24 overflow-y-auto">
                    {selectedMessage.message}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-2">
                    Your Reply
                  </label>
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    rows={5}
                    placeholder="Type your reply here..."
                    className="w-full p-3 rounded-xl border border-border bg-background/90 dark:bg-background/80 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none text-sm"
                  />
                </div>

                <div className="flex gap-3 mt-5">
                  <button
                    onClick={() => {
                      setShowReplyModal(false);
                      setReplyText("");
                    }}
                    className="flex-1 py-2.5 rounded-xl border border-border text-foreground font-semibold hover:border-red-500 hover:text-red-500 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={sendReply}
                    disabled={submitting}
                    className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        Send Reply
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

export default AdminContactPage;