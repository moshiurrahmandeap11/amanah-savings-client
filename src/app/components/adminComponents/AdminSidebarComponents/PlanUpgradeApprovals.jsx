"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Loader2,
  X,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock,
  Crown,
  Star,
  Trophy,
  Medal,
  CreditCard,
  Smartphone,
  Building,
  Banknote,
  Search,
  Filter,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

// Plan config for display
const PLAN_CONFIG = {
  bronze: { name: "Bronze", nameBn: "ব্রোঞ্জ", icon: Medal, color: "text-amber-600" },
  silver: { name: "Silver", nameBn: "সিলভার", icon: Star, color: "text-gray-500" },
  gold: { name: "Gold", nameBn: "গোল্ড", icon: Trophy, color: "text-yellow-500" },
  platinum: { name: "Platinum", nameBn: "প্লatinum", icon: Crown, color: "text-purple-500" },
};

// Translations
const translations = {
  en: {
    pageTitle: "📋 Plan Upgrade Approvals",
    subtitle: "Review and approve plan upgrade payment requests",
    all: "All",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    totalRequests: "Total Requests",
    pendingRequests: "Pending",
    approvedRequests: "Approved",
    rejectedRequests: "Rejected",
    noRequests: "No requests found",
    loading: "Loading requests...",
    user: "User",
    plan: "Plan",
    cycle: "Cycle",
    fee: "Fee",
    paymentMethod: "Method",
    transactionId: "Transaction ID",
    status: "Status",
    submitted: "Submitted",
    actions: "Actions",
    viewDetails: "View Details",
    approve: "Approve",
    reject: "Reject",
    approveRequest: "Approve Plan Upgrade?",
    rejectRequest: "Reject Plan Upgrade",
    reasonForRejection: "Reason for rejection",
    provideReason: "Please provide a reason for rejection",
    approvedSuccess: "Approved!",
    requestApproved: "Plan upgrade has been approved successfully",
    rejectedSuccess: "Rejected!",
    requestRejected: "Plan upgrade has been rejected",
    error: "Error!",
    failedToLoad: "Failed to load requests",
    searchPlaceholder: "Search by name, email, or transaction ID...",
    details: "Request Details",
    close: "Close",
    phoneNumber: "Phone Number",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    accountHolder: "Account Holder",
    screenshot: "Screenshot",
    noScreenshot: "No screenshot provided",
    clickToView: "Click to view full image",
    approvedBy: "Approved By",
    rejectedBy: "Rejected By",
    remarks: "Remarks",
  },
  bn: {
    pageTitle: "📋 প্ল্যান আপগ্রেড অনুমোদন",
    subtitle: "প্ল্যান আপগ্রেড পেমেন্ট অনুরোধ রিভিউ ও অনুমোদন করুন",
    all: "সব",
    pending: "অপেক্ষমান",
    approved: "অনুমোদিত",
    rejected: "প্রত্যাখ্যাত",
    totalRequests: "মোট অনুরোধ",
    pendingRequests: "অপেক্ষমান",
    approvedRequests: "অনুমোদিত",
    rejectedRequests: "প্রত্যাখ্যাত",
    noRequests: "কোনো অনুরোধ পাওয়া যায়নি",
    loading: "অনুরোধ লোড হচ্ছে...",
    user: "ব্যবহারকারী",
    plan: "প্ল্যান",
    cycle: "সাইকেল",
    fee: "ফি",
    paymentMethod: "পদ্ধতি",
    transactionId: "ট্রানজেকশন আইডি",
    status: "স্ট্যাটাস",
    submitted: "জমা দেওয়া হয়েছে",
    actions: "কর্ম",
    viewDetails: "বিস্তারিত দেখুন",
    approve: "অনুমোদন",
    reject: "প্রত্যাখ্যান",
    approveRequest: "প্ল্যান আপগ্রেড অনুমোদন করবেন?",
    rejectRequest: "প্ল্যান আপগ্রেড প্রত্যাখ্যান",
    reasonForRejection: "প্রত্যাখ্যানের কারণ",
    provideReason: "প্রত্যাখ্যানের কারণ দিন",
    approvedSuccess: "অনুমোদিত হয়েছে!",
    requestApproved: "প্ল্যান আপগ্রেড সফলভাবে অনুমোদিত হয়েছে",
    rejectedSuccess: "প্রত্যাখ্যাত হয়েছে!",
    requestRejected: "প্ল্যান আপগ্রেড প্রত্যাখ্যাত হয়েছে",
    error: "ত্রুটি!",
    failedToLoad: "অনুরোধ লোড করতে ব্যর্থ হয়েছে",
    searchPlaceholder: "নাম, ইমেইল বা ট্রানজেকশন আইডি দিয়ে খুঁজুন...",
    details: "অনুরোধের বিস্তারিত",
    close: "বন্ধ করুন",
    phoneNumber: "ফোন নম্বর",
    bankName: "ব্যাংকের নাম",
    accountNumber: "অ্যাকাউন্ট নম্বর",
    accountHolder: "অ্যাকাউন্ট ধারক",
    screenshot: "স্ক্রিনশট",
    noScreenshot: "কোনো স্ক্রিনশট প্রদান করা হয়নি",
    clickToView: "পুরো ছবি দেখতে ক্লিক করুন",
    approvedBy: "অনুমোদনকারী",
    rejectedBy: "প্রত্যাখ্যানকারী",
    remarks: "মন্তব্য",
  },
};

const PlanUpgradeApprovals = () => {
  const [lang, setLang] = useState("en");
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [processingId, setProcessingId] = useState(null);
  const [stats, setStats] = useState({ total: 0, pending: 0, approved: 0, rejected: 0 });

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "en";
    setLang(savedLang);
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const statusParam = filter !== "all" ? `?status=${filter}` : "";
      const response = await axiosInstance.get(`/admin/plan-upgrades${statusParam}`);
      if (response.data.success) {
        setRequests(response.data.data.planUpgrades);
        // Calculate stats from all requests (not filtered)
        const allRes = await axiosInstance.get("/admin/plan-upgrades");
        if (allRes.data.success) {
          const all = allRes.data.data.planUpgrades;
          setStats({
            total: all.length,
            pending: all.filter((r) => r.status === "pending").length,
            approved: all.filter((r) => r.status === "approved").length,
            rejected: all.filter((r) => r.status === "rejected").length,
          });
        }
      }
    } catch (error) {
      console.error("Fetch plan upgrades error:", error);
      Swal.fire({
        title: t("error"),
        text: t("failedToLoad"),
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      title: t("approveRequest"),
      text: "Are you sure you want to approve this plan upgrade?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t("approve"),
    });

    if (result.isConfirmed) {
      setProcessingId(id);
      try {
        const response = await axiosInstance.patch(`/admin/plan-upgrades/${id}/approve`);
        if (response.data.success) {
          Swal.fire({
            title: t("approvedSuccess"),
            text: t("requestApproved"),
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 2000,
            showConfirmButton: false,
          });
          fetchRequests();
          setShowModal(false);
        }
      } catch (error) {
        console.error("Approve error:", error);
        Swal.fire({
          title: t("error"),
          text: error.response?.data?.message || "Failed to approve",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      } finally {
        setProcessingId(null);
      }
    }
  };

  const handleReject = async (id) => {
    const { value: reason } = await Swal.fire({
      title: t("rejectRequest"),
      input: "textarea",
      inputLabel: t("reasonForRejection"),
      inputPlaceholder: t("provideReason"),
      inputAttributes: { "aria-label": "Rejection reason" },
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t("reject"),
      cancelButtonText: "Cancel",
      inputValidator: (value) => {
        if (!value) return t("provideReason");
      },
    });

    if (reason) {
      setProcessingId(id);
      try {
        const response = await axiosInstance.patch(`/admin/plan-upgrades/${id}/reject`, { reason });
        if (response.data.success) {
          Swal.fire({
            title: t("rejectedSuccess"),
            text: t("requestRejected"),
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 2000,
            showConfirmButton: false,
          });
          fetchRequests();
          setShowModal(false);
        }
      } catch (error) {
        console.error("Reject error:", error);
        Swal.fire({
          title: t("error"),
          text: error.response?.data?.message || "Failed to reject",
          icon: "error",
          confirmButtonColor: "#dc2626",
        });
      } finally {
        setProcessingId(null);
      }
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10 text-amber-500 text-xs font-medium">
            <Clock size={12} /> Pending
          </span>
        );
      case "approved":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
            <CheckCircle size={12} /> Approved
          </span>
        );
      case "rejected":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-medium">
            <XCircle size={12} /> Rejected
          </span>
        );
      default:
        return null;
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case "bkash": return <Smartphone size={14} className="text-pink-600" />;
      case "nagad": return <Smartphone size={14} className="text-orange-500" />;
      case "bank": return <Building size={14} className="text-blue-600" />;
      default: return <CreditCard size={14} />;
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const filteredRequests = requests.filter((req) => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      req.userName?.toLowerCase().includes(q) ||
      req.userEmail?.toLowerCase().includes(q) ||
      req.transactionId?.toLowerCase().includes(q) ||
      req.selectedPlan?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="w-full max-w-full">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">{t("pageTitle")}</h1>
        <p className="text-foreground/60">{t("subtitle")}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: t("totalRequests"), value: stats.total, color: "text-blue-500", bg: "bg-blue-500/10" },
          { label: t("pendingRequests"), value: stats.pending, color: "text-amber-500", bg: "bg-amber-500/10" },
          { label: t("approvedRequests"), value: stats.approved, color: "text-green-500", bg: "bg-green-500/10" },
          { label: t("rejectedRequests"), value: stats.rejected, color: "text-red-500", bg: "bg-red-500/10" },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
            <div className="text-xs text-foreground/50">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                filter === f
                  ? "bg-primary text-white"
                  : "bg-card border border-border text-foreground/60 hover:text-foreground"
              }`}
            >
              {t(f)}
            </button>
          ))}
        </div>
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t("searchPlaceholder")}
            className="w-full pl-10 pr-4 py-2 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-foreground/30 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={28} className="animate-spin text-primary" />
            <span className="ml-3 text-foreground/60">{t("loading")}</span>
          </div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-16 text-foreground/50">
            <AlertCircle size={40} className="mx-auto mb-3 opacity-50" />
            <p>{t("noRequests")}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground/60 uppercase">{t("user")}</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground/60 uppercase">{t("plan")}</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground/60 uppercase">{t("fee")}</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground/60 uppercase">{t("paymentMethod")}</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground/60 uppercase">{t("transactionId")}</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground/60 uppercase">{t("status")}</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-foreground/60 uppercase">{t("submitted")}</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-foreground/60 uppercase">{t("actions")}</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((req, idx) => (
                  <motion.tr
                    key={req._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="border-b border-border/50 hover:bg-primary/5 transition"
                  >
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-sm font-medium text-foreground">{req.userName}</div>
                        <div className="text-xs text-foreground/40">{req.userEmail}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        {React.createElement(PLAN_CONFIG[req.selectedPlan]?.icon || Medal, {
                          size: 14,
                          className: PLAN_CONFIG[req.selectedPlan]?.color || "text-foreground",
                        })}
                        <span className="text-sm text-foreground capitalize">
                          {req.selectedPlan} ({req.billingCycle})
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-semibold text-foreground">৳{req.planFee?.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {getPaymentMethodIcon(req.paymentMethod)}
                        <span className="text-sm text-foreground capitalize">{req.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-mono text-foreground">{req.transactionId}</span>
                    </td>
                    <td className="px-4 py-3">{getStatusBadge(req.status)}</td>
                    <td className="px-4 py-3">
                      <span className="text-xs text-foreground/50">{formatDate(req.createdAt)}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setSelectedRequest(req); setShowModal(true); }}
                          className="p-2 rounded-lg border border-border hover:bg-primary/10 transition"
                          title={t("viewDetails")}
                        >
                          <Eye size={14} className="text-foreground" />
                        </button>
                        {req.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(req._id)}
                              disabled={processingId === req._id}
                              className="p-2 rounded-lg bg-green-500/10 text-green-500 hover:bg-green-500/20 transition disabled:opacity-50"
                              title={t("approve")}
                            >
                              {processingId === req._id ? (
                                <Loader2 size={14} className="animate-spin" />
                              ) : (
                                <CheckCircle size={14} />
                              )}
                            </button>
                            <button
                              onClick={() => handleReject(req._id)}
                              disabled={processingId === req._id}
                              className="p-2 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition disabled:opacity-50"
                              title={t("reject")}
                            >
                              <XCircle size={14} />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {showModal && selectedRequest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-foreground">{t("details")}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-4">
                {/* User Info */}
                <div className="p-4 bg-primary/5 rounded-xl">
                  <div className="text-sm font-semibold text-foreground mb-2">{t("user")}</div>
                  <div className="text-sm text-foreground">{selectedRequest.userName}</div>
                  <div className="text-xs text-foreground/50">{selectedRequest.userEmail}</div>
                  <div className="text-xs text-foreground/50">{selectedRequest.userPhone}</div>
                </div>

                {/* Plan Info */}
                <div className="p-4 bg-primary/5 rounded-xl">
                  <div className="text-sm font-semibold text-foreground mb-2">{t("plan")}</div>
                  <div className="flex items-center gap-2">
                    {React.createElement(PLAN_CONFIG[selectedRequest.selectedPlan]?.icon || Medal, {
                      size: 16,
                      className: PLAN_CONFIG[selectedRequest.selectedPlan]?.color || "text-foreground",
                    })}
                    <span className="text-sm font-medium text-foreground capitalize">
                      {selectedRequest.selectedPlan} — {selectedRequest.billingCycle}
                    </span>
                  </div>
                  <div className="text-sm text-foreground mt-1">
                    <Banknote size={14} className="inline mr-1" />
                    ৳{selectedRequest.planFee?.toLocaleString()}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="p-4 bg-primary/5 rounded-xl">
                  <div className="text-sm font-semibold text-foreground mb-2">{t("paymentMethod")}</div>
                  <div className="text-sm text-foreground capitalize">{selectedRequest.paymentMethod}</div>
                  {(selectedRequest.paymentMethod === "bkash" || selectedRequest.paymentMethod === "nagad") && selectedRequest.phoneNumber && (
                    <div className="text-xs text-foreground/50 mt-1">{t("phoneNumber")}: {selectedRequest.phoneNumber}</div>
                  )}
                  {selectedRequest.paymentMethod === "bank" && (
                    <div className="space-y-1 mt-1">
                      <div className="text-xs text-foreground/50">{t("bankName")}: {selectedRequest.bankName}</div>
                      <div className="text-xs text-foreground/50">{t("accountNumber")}: {selectedRequest.accountNumber}</div>
                      <div className="text-xs text-foreground/50">{t("accountHolder")}: {selectedRequest.accountHolderName}</div>
                    </div>
                  )}
                  <div className="text-sm font-mono text-foreground mt-2">{t("transactionId")}: {selectedRequest.transactionId}</div>
                </div>

                {/* Screenshot */}
                {selectedRequest.screenshot && (
                  <div className="p-4 bg-primary/5 rounded-xl">
                    <div className="text-sm font-semibold text-foreground mb-2">{t("screenshot")}</div>
                    <a href={selectedRequest.screenshot} target="_blank" rel="noopener noreferrer" className="block">
                      <img
                        src={selectedRequest.screenshot}
                        alt="Payment screenshot"
                        className="max-h-48 rounded-lg mx-auto hover:opacity-90 transition cursor-pointer"
                      />
                    </a>
                    <p className="text-xs text-foreground/40 text-center mt-1">{t("clickToView")}</p>
                  </div>
                )}

                {/* Status & Dates */}
                <div className="p-4 bg-primary/5 rounded-xl">
                  <div className="text-sm font-semibold text-foreground mb-2">{t("status")}</div>
                  {getStatusBadge(selectedRequest.status)}
                  <div className="text-xs text-foreground/50 mt-2">{t("submitted")}: {formatDate(selectedRequest.createdAt)}</div>
                  {selectedRequest.approvedAt && (
                    <div className="text-xs text-green-500 mt-1">{t("approvedBy")}: {formatDate(selectedRequest.approvedAt)}</div>
                  )}
                  {selectedRequest.rejectedAt && (
                    <div className="text-xs text-red-500 mt-1">
                      {t("rejectedBy")}: {formatDate(selectedRequest.rejectedAt)}
                      {selectedRequest.remarks && <span> — {t("remarks")}: {selectedRequest.remarks}</span>}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {selectedRequest.status === "pending" && (
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => handleApprove(selectedRequest._id)}
                    disabled={processingId === selectedRequest._id}
                    className="flex-1 py-2.5 bg-green-500 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {processingId === selectedRequest._id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <CheckCircle size={16} />
                    )}
                    {t("approve")}
                  </button>
                  <button
                    onClick={() => handleReject(selectedRequest._id)}
                    disabled={processingId === selectedRequest._id}
                    className="flex-1 py-2.5 bg-red-500 text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    <XCircle size={16} />
                    {t("reject")}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PlanUpgradeApprovals;
