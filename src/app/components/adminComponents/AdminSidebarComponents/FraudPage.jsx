"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FraudPage = () => {
  const [toast, setToast] = useState({ show: false, message: "" });

  const stats = [
    {
      icon: "🔴",
      value: "5",
      label: "High Risk Alerts",
      trend: "+2 today",
      trendDown: true,
      bg: "bg-red-500/10",
      iconBg: "bg-red-500/10",
    },
    {
      icon: "🟡",
      value: "12",
      label: "Medium Risk",
      trend: "Same",
      trendUp: false,
      bg: "bg-amber-500/10",
      iconBg: "bg-amber-500/10",
    },
    {
      icon: "🛡️",
      value: "3",
      label: "Accounts Suspended",
      trend: "All clear",
      trendUp: true,
      bg: "bg-blue-500/10",
      iconBg: "bg-blue-500/10",
    },
    {
      icon: "✅",
      value: "24",
      label: "Alerts Resolved",
      trend: "↑ Today",
      trendUp: true,
      bg: "bg-primary/10",
      iconBg: "bg-primary/10",
    },
  ];

  const fraudAlerts = [
    {
      type: "Multi-Account",
      severity: "danger",
      icon: "🔴",
      user: "ID #4821",
      userSub: "Unknown Device",
      details: "3 accounts from same device fingerprint, same IP",
      riskScore: 92,
      riskColor: "danger",
      time: "2 hrs ago",
      status: "Open",
      statusColor: "danger",
    },
    {
      type: "Suspicious Login",
      severity: "warn",
      icon: "🟡",
      user: "Karim S.",
      userSub: "ID #2341",
      details: "Login from India (Kolkata), different from usual Dhaka",
      riskScore: 58,
      riskColor: "warning",
      time: "5 hrs ago",
      status: "Under Review",
      statusColor: "warn",
    },
    {
      type: "Unusual Deposits",
      severity: "warn",
      icon: "🟡",
      user: "ID #7720",
      userSub: "Unverified",
      details: "12 small deposits (৳100 each) in 45 minutes",
      riskScore: 67,
      riskColor: "warning",
      time: "8 hrs ago",
      status: "Monitoring",
      statusColor: "warn",
    },
    {
      type: "Failed 2FA",
      severity: "info",
      icon: "🔵",
      user: "Nasrin H.",
      userSub: "ID #8814",
      details: "7 consecutive failed 2FA attempts in 10 minutes",
      riskScore: 35,
      riskColor: "info",
      time: "12 hrs ago",
      status: "Auto-locked",
      statusColor: "info",
    },
  ];

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "danger":
        return "bg-red-500/15 text-red-500";
      case "warn":
        return "bg-amber-500/15 text-amber-500";
      case "info":
        return "bg-blue-500/15 text-blue-500";
      default:
        return "bg-gray-500/15 text-gray-500";
    }
  };

  const getStatusBadge = (statusColor) => {
    switch (statusColor) {
      case "danger":
        return "bg-red-500/15 text-red-500";
      case "warn":
        return "bg-amber-500/15 text-amber-500";
      case "info":
        return "bg-blue-500/15 text-blue-500";
      default:
        return "bg-gray-500/15 text-gray-500";
    }
  };

  const getRiskColor = (riskColor) => {
    switch (riskColor) {
      case "danger":
        return "text-red-500";
      case "warning":
        return "text-amber-500";
      case "info":
        return "text-blue-500";
      default:
        return "text-foreground";
    }
  };

  const handleBan = (user) => {
    if (confirm(`Ban user ${user} permanently?`)) {
      showToast(`🚫 User ${user} banned permanently`);
    }
  };

  const handleLock = () => {
    showToast(`🔒 Account locked — user notified`);
  };

  const handleFreeze = () => {
    showToast(`🧊 Account frozen — deposits blocked`);
  };

  const handleUnlock = () => {
    showToast(`🔓 Account unlocked — user can now login`);
  };

  const handleDetails = () => {
    showToast(`📋 Opening fraud details...`);
  };

  const handleExportReport = () => {
    showToast(`⬇️ Generating fraud report...`);
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">
            🚨 Fraud Alerts & Security
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
            5 High Risk · 12 Medium Risk
          </span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex justify-between items-start">
              <div
                className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center text-xl`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? "bg-green-500/10 text-green-500" : stat.trendDown ? "bg-red-500/10 text-red-500" : "bg-amber-500/10 text-amber-500"}`}
              >
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">
              {stat.value}
            </div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

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
              {fraudAlerts.map((alert, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition"
                >
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getSeverityBadge(alert.severity)}`}
                    >
                      {alert.icon} {alert.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-sm text-foreground">
                      {alert.user}
                    </div>
                    <div className="text-xs text-foreground/50">
                      {alert.userSub}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground/70">
                    {alert.details}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-bold ${getRiskColor(alert.riskColor)}`}
                    >
                      {alert.riskScore} / 100
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground/50">
                    {alert.time}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBadge(alert.statusColor)}`}
                    >
                      {alert.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2 flex-wrap">
                      <button
                        onClick={handleDetails}
                        className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition"
                      >
                        Details
                      </button>
                      {alert.type === "Multi-Account" && (
                        <button
                          onClick={() => handleBan(alert.user)}
                          className="px-3 py-1 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition"
                        >
                          🚫 Ban
                        </button>
                      )}
                      {alert.type === "Suspicious Login" && (
                        <button
                          onClick={handleLock}
                          className="px-3 py-1 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                        >
                          Lock Account
                        </button>
                      )}
                      {alert.type === "Unusual Deposits" && (
                        <button
                          onClick={handleFreeze}
                          className="px-3 py-1 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition"
                        >
                          Freeze
                        </button>
                      )}
                      {alert.type === "Failed 2FA" && (
                        <button
                          onClick={handleUnlock}
                          className="px-3 py-1 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                        >
                          Unlock
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
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
