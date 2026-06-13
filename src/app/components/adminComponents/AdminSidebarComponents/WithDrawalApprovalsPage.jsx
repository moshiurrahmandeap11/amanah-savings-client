"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Moon,
  Sun,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  User,
  Loader2,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const WithdrawalApprovalsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [withdrawals, setWithdrawals] = useState([]);
  const [statistics, setStatistics] = useState({
    pending: { count: 0, totalAmount: 0 },
    approved: { count: 0, totalAmount: 0 },
    rejected: { count: 0, totalAmount: 0 },
    completed: { count: 0, totalAmount: 0 },
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  // Fetch withdrawals from API
  const fetchWithdrawals = async (status = "all", page = 1) => {
    try {
      setLoading(true);
      let url = `/withdrawals/admin/all?page=${page}&limit=20`;
      if (status !== "all") {
        url += `&status=${status}`;
      }
      
      const response = await axiosInstance.get(url);
      
      if (response.data.success) {
        setWithdrawals(response.data.data.withdrawals);
        setStatistics(response.data.data.statistics);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      showToast("Failed to load withdrawals", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWithdrawals(activeFilter, pagination.currentPage);
  }, [activeFilter, pagination.currentPage]);

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

  const showToast = (message, type = "success") => {
    Swal.fire({
      title: type === "success" ? "Success!" : "Error!",
      text: message,
      icon: type,
      timer: 2000,
      showConfirmButton: false,
      position: "top-end",
      toast: true,
    });
  };

  const approveWithdrawal = async (withdrawal) => {
    if (processing) return;
    
    const result = await Swal.fire({
      title: lang === "bn" ? "উত্তোলন অনুমোদন করবেন?" : "Approve Withdrawal?",
      html: `
        <div class="text-left">
          <p><strong>${lang === "bn" ? "সদস্য" : "User"}:</strong> ${withdrawal.user?.name || "Unknown"}</p>
          <p><strong>${lang === "bn" ? "পরিমাণ" : "Amount"}:</strong> ৳${withdrawal.withdrawalAmount.toLocaleString()}</p>
          <p><strong>${lang === "bn" ? "গোল" : "Goal"}:</strong> ${withdrawal.goalName}</p>
          <p><strong>${lang === "bn" ? "পদ্ধতি" : "Method"}:</strong> ${withdrawal.paymentMethod}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: lang === "bn" ? "হ্যাঁ, অনুমোদন করুন" : "Yes, approve",
      cancelButtonText: lang === "bn" ? "বাতিল" : "Cancel",
    });
    
    if (!result.isConfirmed) return;
    
    setProcessing(true);
    
    try {
      const response = await axiosInstance.patch(`/withdrawals/${withdrawal._id}/approve`, {
        remarks: "Approved by admin"
      });
      
      if (response.data.success) {
        showToast(
          lang === "bn" 
            ? `✅ ${withdrawal.withdrawalAmount.toLocaleString()} টাকার উত্তোলন অনুমোদিত হয়েছে`
            : `✅ Withdrawal of ৳${withdrawal.withdrawalAmount.toLocaleString()} approved`,
          "success"
        );
        fetchWithdrawals(activeFilter, pagination.currentPage);
      }
    } catch (error) {
      console.error("Error approving withdrawal:", error);
      showToast(
        error.response?.data?.message || "Failed to approve withdrawal",
        "error"
      );
    } finally {
      setProcessing(false);
    }
  };

  const rejectWithdrawal = async (withdrawal) => {
    if (processing) return;
    
    const { value: remarks } = await Swal.fire({
      title: lang === "bn" ? "উত্তোলন প্রত্যাখ্যান" : "Reject Withdrawal",
      html: `
        <div class="text-left">
          <p><strong>${lang === "bn" ? "সদস্য" : "User"}:</strong> ${withdrawal.user?.name || "Unknown"}</p>
          <p><strong>${lang === "bn" ? "পরিমাণ" : "Amount"}:</strong> ৳${withdrawal.withdrawalAmount.toLocaleString()}</p>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            ${lang === "bn" ? "প্রত্যাখ্যানের কারণ:" : "Reason for rejection:"}
          </label>
          <textarea id="remarks" class="swal2-textarea" placeholder="${
            lang === "bn" ? "কারণ লিখুন..." : "Enter reason..."
          }"></textarea>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: lang === "bn" ? "হ্যাঁ, প্রত্যাখ্যান করুন" : "Yes, reject",
      cancelButtonText: lang === "bn" ? "বাতিল" : "Cancel",
      preConfirm: () => {
        const remarks = document.getElementById("remarks").value;
        if (!remarks) {
          Swal.showValidationMessage(
            lang === "bn" ? "কারণ লিখতে হবে" : "Please provide a reason"
          );
        }
        return remarks;
      }
    });
    
    if (!remarks) return;
    
    setProcessing(true);
    
    try {
      const response = await axiosInstance.patch(`/withdrawals/${withdrawal._id}/reject`, {
        remarks: remarks
      });
      
      if (response.data.success) {
        showToast(
          lang === "bn" 
            ? `❌ উত্তোলন প্রত্যাখ্যান করা হয়েছে`
            : `❌ Withdrawal rejected`,
          "error"
        );
        fetchWithdrawals(activeFilter, pagination.currentPage);
      }
    } catch (error) {
      console.error("Error rejecting withdrawal:", error);
      showToast(
        error.response?.data?.message || "Failed to reject withdrawal",
        "error"
      );
    } finally {
      setProcessing(false);
    }
  };

  const completeWithdrawal = async (withdrawal) => {
    if (processing) return;
    
    const { value: transactionId } = await Swal.fire({
      title: lang === "bn" ? "উত্তোলন সম্পন্ন করুন" : "Complete Withdrawal",
      html: `
        <div class="text-left">
          <p><strong>${lang === "bn" ? "সদস্য" : "User"}:</strong> ${withdrawal.user?.name || "Unknown"}</p>
          <p><strong>${lang === "bn" ? "পরিমাণ" : "Amount"}:</strong> ৳${withdrawal.withdrawalAmount.toLocaleString()}</p>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            ${lang === "bn" ? "লেনদেন আইডি:" : "Transaction ID:"}
          </label>
          <input type="text" id="transactionId" class="swal2-input" placeholder="${
            lang === "bn" ? "লেনদেন আইডি দিন" : "Enter transaction ID"
          }">
        </div>
      `,
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#6c757d",
      confirmButtonText: lang === "bn" ? "হ্যাঁ, সম্পন্ন করুন" : "Yes, complete",
      cancelButtonText: lang === "bn" ? "বাতিল" : "Cancel",
      preConfirm: () => {
        const transactionId = document.getElementById("transactionId").value;
        if (!transactionId) {
          Swal.showValidationMessage(
            lang === "bn" ? "লেনদেন আইডি দিন" : "Please provide transaction ID"
          );
        }
        return transactionId;
      }
    });
    
    if (!transactionId) return;
    
    setProcessing(true);
    
    try {
      const response = await axiosInstance.patch(`/withdrawals/${withdrawal._id}/complete`, {
        transactionId: transactionId,
        remarks: "Payment sent successfully"
      });
      
      if (response.data.success) {
        showToast(
          lang === "bn" 
            ? `✅ উত্তোলন সম্পন্ন হয়েছে`
            : `✅ Withdrawal completed`,
          "success"
        );
        fetchWithdrawals(activeFilter, pagination.currentPage);
      }
    } catch (error) {
      console.error("Error completing withdrawal:", error);
      showToast(
        error.response?.data?.message || "Failed to complete withdrawal",
        "error"
      );
    } finally {
      setProcessing(false);
    }
  };

  const viewUser = (withdrawal) => {
    Swal.fire({
      title: lang === "bn" ? "সদস্যের তথ্য" : "User Details",
      html: `
        <div class="text-left">
          <p><strong>${lang === "bn" ? "নাম" : "Name"}:</strong> ${withdrawal.user?.name || "N/A"}</p>
          <p><strong>${lang === "bn" ? "ইমেইল" : "Email"}:</strong> ${withdrawal.user?.email || "N/A"}</p>
          <p><strong>${lang === "bn" ? "ফোন" : "Phone"}:</strong> ${withdrawal.user?.phone || "N/A"}</p>
          <p><strong>${lang === "bn" ? "যোগদান" : "Joined"}:</strong> ${withdrawal.user?.createdAt ? new Date(withdrawal.user.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#059669",
    });
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "pending":
        return { icon: Clock, text: lang === "bn" ? "পেন্ডিং" : "Pending", color: "text-amber-500 bg-amber-500/10", border: "border-amber-500/20" };
      case "approved":
        return { icon: CheckCircle, text: lang === "bn" ? "অনুমোদিত" : "Approved", color: "text-green-500 bg-green-500/10", border: "border-green-500/20" };
      case "rejected":
        return { icon: XCircle, text: lang === "bn" ? "প্রত্যাখ্যাত" : "Rejected", color: "text-red-500 bg-red-500/10", border: "border-red-500/20" };
      case "completed":
        return { icon: CheckCircle, text: lang === "bn" ? "সম্পন্ন" : "Completed", color: "text-blue-500 bg-blue-500/10", border: "border-blue-500/20" };
      default:
        return { icon: AlertTriangle, text: "Unknown", color: "text-gray-500 bg-gray-500/10", border: "border-gray-500/20" };
    }
  };

  const getPaymentIcon = (method) => {
    const icons = {
      bkash: "💜",
      nagad: "🟠",
      bank: "🏦",
    };
    return icons[method?.toLowerCase()] || "💰";
  };

  const getGoalIcon = (goalType) => {
    const icons = {
      wedding: "💒",
      education: "📚",
      travel: "✈️",
      hajj: "🕌",
      home: "🏠",
      business: "💼",
      emergency: "🚨",
      other: "🎯",
    };
    return icons[goalType?.toLowerCase()] || "🎯";
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return lang === "bn" ? "এই মাত্র" : "Just now";
    if (minutes < 60) return `${minutes} ${lang === "bn" ? "মিনিট আগে" : "min ago"}`;
    if (hours < 24) return `${hours} ${lang === "bn" ? "ঘন্টা আগে" : "hour${hours > 1 ? 's' : ''} ago"}`;
    if (days < 7) return `${days} ${lang === "bn" ? "দিন আগে" : "day${days > 1 ? 's' : ''} ago"}`;
    return new Date(date).toLocaleDateString();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, currentPage: newPage });
    }
  };

  const stats = [
    { value: statistics.pending.count, label: lang === "bn" ? "পেন্ডিং" : "Pending", color: "yellow" },
    { value: `৳ ${(statistics.approved.totalAmount + statistics.completed.totalAmount).toLocaleString()}`, label: lang === "bn" ? "অনুমোদিত" : "Approved", color: "green" },
    { value: statistics.rejected.count, label: lang === "bn" ? "প্রত্যাখ্যাত" : "Rejected", color: "red" },
    { value: `${Math.round((statistics.completed.totalAmount / (statistics.approved.totalAmount + statistics.completed.totalAmount || 1)) * 100)}%`, label: lang === "bn" ? "সফলতা" : "Success Rate", color: "blue" },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">
            {lang === "bn" ? "লোড হচ্ছে..." : "Loading..."}
          </p>
        </div>
      </div>
    );
  }

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
          🏧 {lang === "bn" ? "উত্তোলন অনুমোদন" : "Withdrawal Approvals"}
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
              className={`text-xl font-bold ${
                stat.color === "yellow" ? "text-amber-400" : 
                stat.color === "green" ? "text-green-400" : 
                stat.color === "red" ? "text-red-400" : 
                "text-blue-400"
              }`}
            >
              {stat.value}
            </div>
            <div className="text-[10px] text-foreground/50 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide max-w-6xl mx-auto">
        {[
          { id: "all", label: `${lang === "bn" ? "সব" : "All"} (${statistics.pending.count + statistics.approved.count + statistics.rejected.count + statistics.completed.count})` },
          { id: "pending", label: `⏳ ${lang === "bn" ? "পেন্ডিং" : "Pending"} (${statistics.pending.count})` },
          { id: "approved", label: `✅ ${lang === "bn" ? "অনুমোদিত" : "Approved"} (${statistics.approved.count})` },
          { id: "completed", label: `🎉 ${lang === "bn" ? "সম্পন্ন" : "Completed"} (${statistics.completed.count})` },
          { id: "rejected", label: `❌ ${lang === "bn" ? "প্রত্যাখ্যাত" : "Rejected"} (${statistics.rejected.count})` },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => {
              setActiveFilter(filter.id);
              setPagination({ ...pagination, currentPage: 1 });
            }}
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

      {/* Search */}
      <div className="px-4 pb-3 max-w-6xl mx-auto">
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
                ? "সদস্য, গোল বা পরিমাণ দিয়ে খুঁজুন..."
                : "Search by user, goal, amount..."
            }
            className="w-full py-2 pl-9 pr-3 rounded-lg border border-border bg-card text-foreground text-sm outline-none focus:border-primary transition"
          />
        </div>
      </div>

      {/* Withdrawals List */}
      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-3">
        {withdrawals.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <div className="text-4xl mb-3">📭</div>
            <div className="text-foreground/50">
              {lang === "bn" ? "কোন উত্তোলন পাওয়া যায়নি" : "No withdrawals found"}
            </div>
          </div>
        ) : (
          withdrawals
            .filter(w => 
              searchQuery === "" ||
              w.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              w.goalName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
              w.withdrawalAmount.toString().includes(searchQuery)
            )
            .map((withdrawal) => {
              const statusBadge = getStatusBadge(withdrawal.status);
              const StatusIcon = statusBadge.icon;
              
              return (
                <div
                  key={withdrawal._id}
                  className={`bg-card border rounded-xl overflow-hidden transition ${
                    withdrawal.status === "pending" ? "border-l-4 border-l-amber-500" : "border-border"
                  }`}
                >
                  <div className="p-4">
                    <div className="flex flex-wrap gap-3">
                      <div
                        className={`w-10 h-10 rounded-lg bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold text-sm shrink-0`}
                      >
                        {withdrawal.user?.name?.charAt(0)?.toUpperCase() || "U"}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-sm text-foreground">
                          {withdrawal.user?.name || "Unknown User"}
                        </div>
                        <div className="text-xs text-foreground/50">
                          {withdrawal.user?.phone || "No phone"} · {getPaymentIcon(withdrawal.paymentMethod)} {withdrawal.paymentMethod?.toUpperCase()} · Ref: {withdrawal._id.slice(-6)} · {formatDate(withdrawal.createdAt)}
                        </div>
                      </div>
                      <div className="text-xl font-bold text-red-500">
                        ৳{withdrawal.withdrawalAmount.toLocaleString()}
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                      <div className="bg-background rounded-lg p-2">
                        <div className="text-[9px] text-foreground/50">
                          {lang === "bn" ? "পদ্ধতি" : "Method"}
                        </div>
                        <div className="text-xs font-semibold">
                          {getPaymentIcon(withdrawal.paymentMethod)} {withdrawal.paymentMethod?.toUpperCase()}
                        </div>
                      </div>
                      <div className="bg-background rounded-lg p-2">
                        <div className="text-[9px] text-foreground/50">
                          {lang === "bn" ? "গোল" : "Goal"}
                        </div>
                        <div className="text-xs font-semibold">
                          {getGoalIcon(withdrawal.goalType)} {withdrawal.goalName}
                        </div>
                      </div>
                      <div className="bg-background rounded-lg p-2">
                        <div className="text-[9px] text-foreground/50">
                          {lang === "bn" ? "কারণ" : "Reason"}
                        </div>
                        <div className="text-xs font-semibold truncate">
                          {withdrawal.reason || "—"}
                        </div>
                      </div>
                      <div className="bg-background rounded-lg p-2">
                        <div className="text-[9px] text-foreground/50">
                          {lang === "bn" ? "স্ট্যাটাস" : "Status"}
                        </div>
                        <div className={`text-xs font-semibold ${statusBadge.color}`}>
                          <StatusIcon size={10} className="inline mr-1" />
                          {statusBadge.text}
                        </div>
                      </div>
                    </div>

                    {withdrawal.remarks && (
                      <div className="mt-2 p-2 bg-amber-500/10 rounded-lg">
                        <div className="text-xs">
                          <strong>{lang === "bn" ? "মন্তব্য:" : "Remarks:"}</strong> {withdrawal.remarks}
                        </div>
                      </div>
                    )}

                    {withdrawal.status === "pending" && (
                      <div className="grid grid-cols-2 gap-2 mt-3">
                        <button
                          onClick={() => approveWithdrawal(withdrawal)}
                          disabled={processing}
                          className="py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-semibold hover:opacity-90 transition disabled:opacity-50"
                        >
                          <CheckCircle size={12} className="inline mr-1" />
                          {lang === "bn" ? "অনুমোদন" : "Approve"}
                        </button>
                        <button
                          onClick={() => rejectWithdrawal(withdrawal)}
                          disabled={processing}
                          className="py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold hover:opacity-90 transition disabled:opacity-50"
                        >
                          <XCircle size={12} className="inline mr-1" />
                          {lang === "bn" ? "প্রত্যাখ্যান" : "Reject"}
                        </button>
                      </div>
                    )}

                    {withdrawal.status === "approved" && (
                      <button
                        onClick={() => completeWithdrawal(withdrawal)}
                        disabled={processing}
                        className="w-full mt-3 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-semibold hover:opacity-90 transition disabled:opacity-50"
                      >
                        <CheckCircle size={12} className="inline mr-1" />
                        {lang === "bn" ? "উত্তোলন সম্পন্ন করুন" : "Complete Withdrawal"}
                      </button>
                    )}

                    {(withdrawal.status === "rejected" || withdrawal.status === "completed") && (
                      <button
                        onClick={() => viewUser(withdrawal)}
                        className="w-full mt-3 py-2 rounded-lg border border-border text-foreground/60 text-xs font-semibold hover:border-primary transition"
                      >
                        <User size={12} className="inline mr-1" />
                        {lang === "bn" ? "সদস্যের তথ্য দেখুন" : "View User Details"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6 pb-20">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
          >
            {lang === "bn" ? "পূর্ববর্তী" : "Previous"}
          </button>
          <span className="px-4 py-2 text-foreground">
            {lang === "bn" ? "পৃষ্ঠা" : "Page"} {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
          >
            {lang === "bn" ? "পরবর্তী" : "Next"}
          </button>
        </div>
      )}
    </div>
  );
};

export default WithdrawalApprovalsPage;