"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, Loader2, X, AlertCircle, CheckCircle, XCircle, Clock } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const DepositsApprovals = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [deposits, setDeposits] = useState([]);
  console.log("deposits :", deposits);
  const [statistics, setStatistics] = useState({
    pending: { count: 0, totalAmount: 0 },
    approved: { count: 0, totalAmount: 0 },
    rejected: { count: 0, totalAmount: 0 },
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  const filters = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "approved", label: "Approved" },
    { id: "rejected", label: "Rejected" },
  ];

  const paymentMethodIcons = {
    bkash: "💜",
    nagad: "🟠",
    bank: "🏦",
    rocket: "🚀",
  };

  const goalTypeIcons = {
    wedding: "💒",
    education: "📚",
    travel: "✈️",
    hajj: "🕌",
    home: "🏠",
    business: "💼",
    emergency: "🚨",
    other: "🎯",
  };

  // Fetch deposits from API
  const fetchDeposits = async (status = "all", page = 1) => {
    try {
      setLoading(true);
      let url = `/deposits/admin/all?page=${page}&limit=20`;
      if (status !== "all") {
        url += `&status=${status}`;
      }
      
      const response = await axiosInstance.get(url);
      
      if (response.data.success) {
        setDeposits(response.data.data.deposits);
        setStatistics(response.data.data.statistics);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error("Error fetching deposits:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
      showToastMessage("Failed to load deposits", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeposits(activeFilter, pagination.currentPage);
  }, [activeFilter, pagination.currentPage]);

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const approveDeposit = async (deposit) => {
    if (processing) return;
    
    const result = await Swal.fire({
      title: "Approve Deposit?",
      html: `
        <div class="text-left">
          <p><strong>User:</strong> ${deposit.user?.fullName || "Unknown"}</p>
          <p><strong>Amount:</strong> ৳${deposit.depositAmount.toLocaleString()}</p>
          <p><strong>Goal:</strong> ${deposit.goalName}</p>
          <p><strong>Method:</strong> ${deposit.paymentMethod}</p>
        </div>
      `,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, approve it!",
      cancelButtonText: "Cancel",
    });
    
    if (!result.isConfirmed) return;
    
    setProcessing(true);
    
    try {
      const response = await axiosInstance.patch(`/deposits/${deposit._id}/approve`, {
        remarks: "Approved by admin"
      });
      
      if (response.data.success) {
        showToastMessage(`✅ Deposit of ৳${deposit.depositAmount.toLocaleString()} approved for ${deposit.user?.name || 'User'}`, "success");
        
        Swal.fire({
          title: "Approved!",
          text: "Deposit has been approved successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        
        fetchDeposits(activeFilter, pagination.currentPage);
      }
    } catch (error) {
      console.error("Error approving deposit:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to approve deposit",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setProcessing(false);
    }
  };

  const rejectDeposit = async (deposit) => {
    if (processing) return;
    
    const { value: remarks } = await Swal.fire({
      title: "Reject Deposit",
      html: `
        <div class="text-left">
          <p><strong>User:</strong> ${deposit.user?.name || "Unknown"}</p>
          <p><strong>Amount:</strong> ৳${deposit.depositAmount.toLocaleString()}</p>
          <p><strong>Goal:</strong> ${deposit.goalName}</p>
        </div>
        <div class="mt-4">
          <label class="block text-sm font-medium text-gray-700 mb-2">Reason for rejection:</label>
          <textarea id="remarks" class="swal2-textarea" placeholder="Please provide a reason..."></textarea>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, reject it!",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const remarks = document.getElementById("remarks").value;
        if (!remarks) {
          Swal.showValidationMessage("Please provide a reason for rejection");
        }
        return remarks;
      }
    });
    
    if (!remarks) return;
    
    setProcessing(true);
    
    try {
      const response = await axiosInstance.patch(`/deposits/${deposit._id}/reject`, {
        remarks: remarks
      });
      
      if (response.data.success) {
        showToastMessage(`❌ Deposit of ৳${deposit.depositAmount.toLocaleString()} rejected for ${deposit.user?.name || 'User'}`, "error");
        
        Swal.fire({
          title: "Rejected!",
          text: "Deposit has been rejected",
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
        });
        
        fetchDeposits(activeFilter, pagination.currentPage);
      }
    } catch (error) {
      console.error("Error rejecting deposit:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to reject deposit",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setProcessing(false);
    }
  };

  const viewScreenshot = (deposit) => {
    setSelectedDeposit(deposit);
    setShowScreenshotModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeScreenshotModal = () => {
    setShowScreenshotModal(false);
    setSelectedDeposit(null);
    document.body.style.overflow = "auto";
  };

  const viewUser = (deposit) => {
    Swal.fire({
      title: "User Details",
      html: `
        <div class="text-left">
          <p><strong>Name:</strong> ${deposit.user?.fullName || "N/A"}</p>
          <p><strong>Email:</strong> ${deposit.user?.email || "N/A"}</p>
          <p><strong>Phone:</strong> ${deposit.user?.phone || "N/A"}</p>
          <p><strong>Member Since:</strong> ${deposit.user?.createdAt ? new Date(deposit.user.createdAt).toLocaleDateString() : "N/A"}</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#059669",
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination({ ...pagination, currentPage: newPage });
    }
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case "pending":
        return { icon: Clock, text: "Pending", color: "text-amber-500 bg-amber-500/10", border: "border-amber-500/20" };
      case "approved":
        return { icon: CheckCircle, text: "Approved", color: "text-green-500 bg-green-500/10", border: "border-green-500/20" };
      case "rejected":
        return { icon: XCircle, text: "Rejected", color: "text-red-500 bg-red-500/10", border: "border-red-500/20" };
      default:
        return { icon: AlertCircle, text: "Unknown", color: "text-gray-500 bg-gray-500/10", border: "border-gray-500/20" };
    }
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const now = new Date();
    const diff = now - new Date(date);
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes} min ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`;
    return new Date(date).toLocaleDateString('en-BD');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading deposits...</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            💳 Deposit Approvals
          </h2>
          <p className="text-sm text-foreground/50 mt-1">
            Review and approve member deposit screenshots
          </p>
        </div>
        <div className="flex gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => {
                setActiveFilter(filter.id);
                setPagination({ ...pagination, currentPage: 1 });
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${
                activeFilter === filter.id
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {filter.label}{" "}
              {filter.id === "pending" && `(${statistics.pending.count})`}
              {filter.id === "approved" && `(${statistics.approved.count})`}
              {filter.id === "rejected" && `(${statistics.rejected.count})`}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-5">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-xl">
              ⏳
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mt-3">
            {statistics.pending.count}
          </div>
          <div className="text-xs text-foreground/50 mt-1">Pending Review</div>
          <div className="text-xs text-amber-500 mt-1">
            ৳{statistics.pending.totalAmount.toLocaleString()}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-xl">
              ✅
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mt-3">
            {statistics.approved.count}
          </div>
          <div className="text-xs text-foreground/50 mt-1">Approved Total</div>
          <div className="text-xs text-green-500 mt-1">
            ৳{statistics.approved.totalAmount.toLocaleString()}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-xl">
              ❌
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mt-3">
            {statistics.rejected.count}
          </div>
          <div className="text-xs text-foreground/50 mt-1">Rejected Total</div>
          <div className="text-xs text-red-500 mt-1">
            ৳{statistics.rejected.totalAmount.toLocaleString()}
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
              📊
            </div>
          </div>
          <div className="text-2xl font-bold text-foreground mt-3">
            {((statistics.approved.totalAmount / 
              (statistics.approved.totalAmount + statistics.pending.totalAmount + statistics.rejected.totalAmount)) * 100 || 0).toFixed(0)}%
          </div>
          <div className="text-xs text-foreground/50 mt-1">Success Rate</div>
          <div className="text-xs text-primary mt-1">
            Total: ৳{(statistics.approved.totalAmount + statistics.pending.totalAmount + statistics.rejected.totalAmount).toLocaleString()}
          </div>
        </div>
      </div>

      {/* Deposit Items */}
      <div className="space-y-3">
        {deposits.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <div className="text-4xl mb-3">📭</div>
            <div className="text-foreground/50">No deposits found</div>
          </div>
        ) : (
          deposits.map((deposit) => {
            const statusBadge = getStatusBadge(deposit.status);
            const StatusIcon = statusBadge.icon;
            
            return (
              <motion.div
                key={deposit._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`bg-card border rounded-xl p-4 transition ${
                  deposit.status === "pending" ? "border-amber-500/20" : 
                  deposit.status === "approved" ? "border-green-500/20" : 
                  "border-red-500/20"
                }`}
              >
                {/* Deposit Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-bold`}>
                      {deposit.user?.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">
                        {deposit.user?.fullName || "Unknown User"}
                      </div>
                      <div className="text-xs text-foreground/50">
                        {deposit.user?.phone || "No phone"} ·{" "}
                        {paymentMethodIcons[deposit.paymentMethod]} {deposit.paymentMethod?.toUpperCase()} ·{" "}
                        {goalTypeIcons[deposit.goalType]} {deposit.goalName} ·{" "}
                        {formatDate(deposit.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xl font-bold text-primary">
                      ৳{deposit.depositAmount.toLocaleString()}
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-semibold ${statusBadge.color}`}>
                      <StatusIcon size={12} className="inline mr-1" />
                      {statusBadge.text}
                    </div>
                  </div>
                </div>

                {/* TxID */}
                <div className="text-xs font-mono mb-3 p-2 rounded-lg bg-background text-foreground/50">
                  TxID: {deposit.transactionReference || "N/A"}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  <div className="bg-background rounded-lg p-2">
                    <div className="text-[10px] text-foreground/50">Payment Method</div>
                    <div className="text-sm font-semibold">
                      {paymentMethodIcons[deposit.paymentMethod]} {deposit.paymentMethod?.toUpperCase()}
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-2">
                    <div className="text-[10px] text-foreground/50">Goal Type</div>
                    <div className="text-sm font-semibold">
                      {goalTypeIcons[deposit.goalType]} {deposit.goalType?.toUpperCase()}
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-2">
                    <div className="text-[10px] text-foreground/50">Submitted</div>
                    <div className="text-sm font-semibold">
                      {new Date(deposit.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="bg-background rounded-lg p-2">
                    <div className="text-[10px] text-foreground/50">Remarks</div>
                    <div className="text-sm font-semibold truncate">
                      {deposit.remarks || "—"}
                    </div>
                  </div>
                </div>

                {/* Screenshot Preview */}
                <div
                  onClick={() => viewScreenshot(deposit)}
                  className={`h-24 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer transition mb-3 ${
                    deposit.status === "pending"
                      ? "border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10"
                      : "border-border bg-background hover:border-primary"
                  }`}
                >
                  <div className="text-center">
                    <Eye size={20} className="mx-auto mb-1 text-foreground/50" />
                    <span className="text-xs text-foreground/50">
                      📸 Click to view full screenshot
                    </span>
                  </div>
                </div>

                {/* Actions */}
                {deposit.status === "pending" && (
                  <div className="flex gap-3">
                    <button
                      onClick={() => approveDeposit(deposit)}
                      disabled={processing}
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                      <CheckCircle size={14} className="inline mr-1" />
                      Approve
                    </button>
                    <button
                      onClick={() => rejectDeposit(deposit)}
                      disabled={processing}
                      className="flex-1 py-2 rounded-lg bg-gradient-to-r from-red-500 to-red-600 text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-50"
                    >
                      <XCircle size={14} className="inline mr-1" />
                      Reject
                    </button>
                    <button
                      onClick={() => viewUser(deposit)}
                      className="px-4 py-2 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition"
                    >
                      👤 User
                    </button>
                  </div>
                )}

                {deposit.status !== "pending" && (
                  <button
                    onClick={() => viewUser(deposit)}
                    className="w-full py-2 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition"
                  >
                    👤 View User Details
                  </button>
                )}
              </motion.div>
            );
          })
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => handlePageChange(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => handlePageChange(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
          >
            Next
          </button>
        </div>
      )}

      {/* Screenshot Modal */}
      <AnimatePresence>
        {showScreenshotModal && selectedDeposit && (
          <div
            className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
            onClick={closeScreenshotModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-border flex justify-between items-center sticky top-0 bg-card">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Deposit Screenshot
                  </h3>
                  <p className="text-sm text-foreground/50">
                    {selectedDeposit.user?.name} · ৳{selectedDeposit.depositAmount.toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={closeScreenshotModal}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                >
                  <X size={18} />
                </button>
              </div>
              <div className="p-5">
                {selectedDeposit.screenshot?.url ? (
                  <img
                    src={selectedDeposit.screenshot.url}
                    alt="Transaction Screenshot"
                    className="w-full rounded-lg border border-border"
                  />
                ) : (
                  <div className="bg-background rounded-xl p-12 text-center border border-border">
                    <div className="text-6xl mb-3">📸</div>
                    <div className="text-foreground/50">No screenshot available</div>
                  </div>
                )}
                <div className="mt-4 p-4 bg-background rounded-lg border border-border">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Amount:</span>
                      <span className="font-bold text-primary">
                        ৳{selectedDeposit.depositAmount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Transaction ID:</span>
                      <span className="font-mono text-sm">
                        {selectedDeposit.transactionReference || "N/A"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Payment Method:</span>
                      <span>{selectedDeposit.paymentMethod?.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Goal:</span>
                      <span>{selectedDeposit.goalName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-foreground/50">Submitted:</span>
                      <span>{new Date(selectedDeposit.createdAt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>
              {selectedDeposit.status === "pending" && (
                <div className="p-5 border-t border-border flex gap-3 sticky bottom-0 bg-card">
                  <button
                    onClick={() => {
                      approveDeposit(selectedDeposit);
                      closeScreenshotModal();
                    }}
                    disabled={processing}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    <CheckCircle size={16} className="inline mr-1" />
                    Approve
                  </button>
                  <button
                    onClick={() => {
                      rejectDeposit(selectedDeposit);
                      closeScreenshotModal();
                    }}
                    disabled={processing}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:opacity-90 transition disabled:opacity-50"
                  >
                    <XCircle size={16} className="inline mr-1" />
                    Reject
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center ${
              toast.type === "error"
                ? "bg-red-500"
                : toast.type === "info"
                  ? "bg-blue-500"
                  : "bg-green-500"
            } text-white`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DepositsApprovals;