"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const FraudPage = () => {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [stats, setStats] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/fraud/alerts", { headers: getAuthHeaders() });
      if (res.data.success) {
        const data = res.data.data;
        // Ensure stats is an array - convert object to array if needed
        let statsArray = [];
        if (data.stats) {
          if (Array.isArray(data.stats)) {
            statsArray = data.stats;
          } else {
            // Convert stats object to array format
            statsArray = [
              { icon: "🚨", value: data.stats.highRisk || 0, label: "High Risk Alerts", trend: "Critical", trendUp: false, iconBg: "bg-red-500/10" },
              { icon: "⚠️", value: data.stats.mediumRisk || 0, label: "Medium Risk Alerts", trend: "Warning", trendUp: false, iconBg: "bg-amber-500/10" },
              { icon: "🔒", value: data.stats.suspended || 0, label: "Suspended Accounts", trend: "Action Needed", trendUp: false, iconBg: "bg-yellow-500/10" },
              { icon: "🚫", value: data.stats.banned || 0, label: "Banned Accounts", trend: "Permanent", trendUp: false, iconBg: "bg-red-500/10" },
            ];
          }
        }
        setStats(statsArray);
        setFraudAlerts(Array.isArray(data.alerts) ? data.alerts : []);
      }
    } catch (err) {
      console.error("Fetch alerts error:", err);
      showToast(err.response?.data?.message || "Failed to load fraud alerts");
      // Set fallback stats
      setStats(getFallbackStats());
    } finally {
      setLoading(false);
    }
  }, []);

  const getFallbackStats = () => [
    { icon: "🚨", value: "0", label: "High Risk Alerts", trend: "Critical", trendUp: false, iconBg: "bg-red-500/10" },
    { icon: "⚠️", value: "0", label: "Medium Risk Alerts", trend: "Warning", trendUp: false, iconBg: "bg-amber-500/10" },
    { icon: "🔒", value: "0", label: "Suspended Accounts", trend: "Action Needed", trendUp: false, iconBg: "bg-yellow-500/10" },
    { icon: "🚫", value: "0", label: "Banned Accounts", trend: "Permanent", trendUp: false, iconBg: "bg-red-500/10" },
  ];

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleBan = async (userId, userName) => {
    const result = await Swal.fire({
      title: "Ban User?",
      html: `
        <div class="text-left">
          <p>Are you sure you want to permanently ban <strong>${userName || "this user"}</strong>?</p>
          <div class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Reason for ban:</label>
            <input type="text" id="banReason" class="swal2-input w-full" placeholder="Enter reason...">
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Ban User",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const reason = document.getElementById("banReason").value;
        if (!reason) {
          Swal.showValidationMessage("Please provide a reason for the ban");
        }
        return { reason };
      }
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.patch(
          `/admin/users/${userId}/status`,
          { isBanned: true, banReason: result.value.reason },
          { headers: getAuthHeaders() }
        );
        if (res.data.success) {
          showToast(`🚫 User ${userName} banned permanently`);
          fetchAlerts();
        }
      } catch (err) {
        showToast(err.response?.data?.message || "Ban failed");
      }
    }
  };

  const handleSuspend = async (userId, userName) => {
    const result = await Swal.fire({
      title: "Suspend Account?",
      html: `
        <div class="text-left">
          <p>Are you sure you want to suspend <strong>${userName || "this user"}</strong>'s account?</p>
          <div class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Reason for suspension:</label>
            <input type="text" id="suspendReason" class="swal2-input w-full" placeholder="Enter reason...">
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Suspend",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const reason = document.getElementById("suspendReason").value;
        if (!reason) {
          Swal.showValidationMessage("Please provide a reason for suspension");
        }
        return { reason };
      }
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.patch(
          `/admin/users/${userId}/status`,
          { isSuspended: true, suspensionReason: result.value.reason },
          { headers: getAuthHeaders() }
        );
        if (res.data.success) {
          showToast(`🔒 Account suspended — user notified`);
          fetchAlerts();
        }
      } catch (err) {
        showToast(err.response?.data?.message || "Suspend failed");
      }
    }
  };

  const handleUnlock = async (userId, userName) => {
    const result = await Swal.fire({
      title: "Unlock Account?",
      text: `Are you sure you want to unlock ${userName || "this user"}'s account?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, Unlock",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.patch(
          `/admin/users/${userId}/status`,
          { isSuspended: false, isBanned: false },
          { headers: getAuthHeaders() }
        );
        if (res.data.success) {
          showToast(`🔓 Account unlocked — user can now login`);
          fetchAlerts();
        }
      } catch (err) {
        showToast(err.response?.data?.message || "Unlock failed");
      }
    }
  };

  const handleDetails = (alert) => {
    Swal.fire({
      title: "Alert Details",
      html: `
        <div class="text-left">
          <p><strong>Type:</strong> ${alert.type || "N/A"}</p>
          <p><strong>User:</strong> ${alert.user || alert.userName || "Unknown"}</p>
          <p><strong>Details:</strong> ${alert.details || "No details"}</p>
          <p><strong>Risk Score:</strong> ${alert.riskScore || "N/A"}/100</p>
          <p><strong>Time:</strong> ${alert.time || new Date(alert.createdAt).toLocaleString()}</p>
          <p><strong>Status:</strong> ${alert.status || "Active"}</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#059669",
      confirmButtonText: "Close",
    });
  };

  const handleExportReport = async () => {
    try {
      const response = await axiosInstance.get("/admin/fraud/export", { headers: getAuthHeaders() });
      const dataStr = JSON.stringify(response.data, null, 2);
      const dataUri = "data:application/json;charset=utf-8," + encodeURIComponent(dataStr);
      const exportFileDefaultName = `fraud_report_${new Date().toISOString().slice(0, 19)}.json`;
      const linkElement = document.createElement("a");
      linkElement.setAttribute("href", dataUri);
      linkElement.setAttribute("download", exportFileDefaultName);
      linkElement.click();
      showToast("Report downloaded successfully");
    } catch (err) {
      showToast("Failed to generate report");
    }
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "danger":
      case "high":
        return "bg-red-500/15 text-red-500";
      case "warn":
      case "medium":
        return "bg-amber-500/15 text-amber-500";
      case "info":
      case "low":
        return "bg-blue-500/15 text-blue-500";
      default:
        return "bg-gray-500/15 text-gray-500";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-red-500/15 text-red-500";
      case "resolved":
        return "bg-green-500/15 text-green-500";
      case "investigating":
        return "bg-amber-500/15 text-amber-500";
      default:
        return "bg-gray-500/15 text-gray-500";
    }
  };

  const getRiskColor = (riskScore) => {
    if (riskScore >= 70) return "text-red-500";
    if (riskScore >= 40) return "text-amber-500";
    return "text-blue-500";
  };

  const highRisk = fraudAlerts.filter(a => a.severity === "danger" || a.severity === "high").length;
  const mediumRisk = fraudAlerts.filter(a => a.severity === "warn" || a.severity === "medium").length;

  const displayStats = Array.isArray(stats) && stats.length > 0 ? stats : getFallbackStats();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">
            🚨 Fraud Alerts & Security
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
            {highRisk} High Risk · {mediumRisk} Medium Risk
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {displayStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex justify-between items-start">
              <div
                className={`w-10 h-10 rounded-xl ${stat.iconBg || "bg-primary/10"} flex items-center justify-center text-xl`}
              >
                {stat.icon}
              </div>
              {stat.trend && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    stat.trend === "Critical" ? "bg-red-500/10 text-red-500" :
                    stat.trend === "Warning" ? "bg-amber-500/10 text-amber-500" :
                    stat.trend === "Action Needed" ? "bg-yellow-500/10 text-yellow-500" :
                    "bg-gray-500/10 text-gray-500"
                  }`}
                >
                  {stat.trend}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">
              {stat.value}
            </div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      {/* Fraud Alerts Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div className="font-bold text-foreground">All Fraud Alerts</div>
          <button
            onClick={handleExportReport}
            className="text-xs text-primary font-semibold hover:underline"
          >
            Export Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Alert Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  User
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Details
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Risk Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {fraudAlerts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-foreground/50">
                    No fraud alerts found
                  </td>
                 </tr>
              ) : (
                fraudAlerts.map((alert, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border last:border-0 hover:bg-primary/5 transition"
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getSeverityBadge(alert.severity)}`}
                      >
                        {alert.icon || "🚨"} {alert.type || "Alert"}
                      </span>
                     </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-sm text-foreground">
                        {alert.userName || alert.user || "Unknown"}
                      </div>
                      <div className="text-xs text-foreground/50">
                        ID: {alert.userId || "N/A"}
                      </div>
                     </td>
                    <td className="px-4 py-3 text-sm text-foreground/70">
                      {alert.description || alert.details || "No details"}
                     </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-sm font-bold ${getRiskColor(alert.riskScore)}`}
                      >
                        {alert.riskScore || 0} / 100
                      </span>
                     </td>
                    <td className="px-4 py-3 text-xs text-foreground/50">
                      {alert.time || (alert.createdAt ? new Date(alert.createdAt).toLocaleString() : "N/A")}
                     </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBadge(alert.status)}`}
                      >
                        {alert.status || "Active"}
                      </span>
                     </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleDetails(alert)}
                          className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition"
                        >
                          Details
                        </button>
                        {(alert.severity === "danger" || alert.severity === "high") && alert.userId && (
                          <button
                            onClick={() => handleBan(alert.userId, alert.userName || alert.user)}
                            className="px-3 py-1 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition"
                          >
                            🚫 Ban
                          </button>
                        )}
                        {(alert.severity === "warn" || alert.severity === "medium") && alert.type?.toLowerCase().includes("login") && (
                          <button
                            onClick={() => handleSuspend(alert.userId, alert.userName || alert.user)}
                            className="px-3 py-1 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                          >
                            Lock Account
                          </button>
                        )}
                        {(alert.severity === "info" || alert.severity === "low") && (
                          <button
                            onClick={() => handleUnlock(alert.userId, alert.userName || alert.user)}
                            className="px-3 py-1 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                          >
                            Unlock
                          </button>
                        )}
                      </div>
                     </td>
                   </tr>
                ))
              )}
            </tbody>
           </table>
        </div>
      </div>

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

export default FraudPage;