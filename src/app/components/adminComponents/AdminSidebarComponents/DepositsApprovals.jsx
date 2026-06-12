"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  Check,
  X,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

const DepositsApprovals = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedDeposit, setSelectedDeposit] = useState(null);
  const [showScreenshotModal, setShowScreenshotModal] = useState(false);
  const [pendingCount, setPendingCount] = useState(14);

  const filters = ["All", "bKash", "Nagad", "Bank"];

  const deposits = [
    {
      id: 1,
      name: "Fatema Akhter",
      phone: "01712-345678",
      avatar: "F",
      avatarBg: "from-primary to-primary-light",
      method: "bKash",
      methodIcon: "💜",
      goal: "Home Purchase",
      goalIcon: "🏠",
      time: "12 min ago",
      amount: "৳5,000",
      txid: "8NKH31ABC2",
      kyc: "Verified",
      status: "pending",
      risk: "Low",
      fraud: false,
    },
    {
      id: 2,
      name: "Karim Uddin",
      phone: "01812-654321",
      avatar: "K",
      avatarBg: "from-amber-500 to-orange-500",
      method: "Nagad",
      methodIcon: "🟠",
      goal: "Education Fund",
      goalIcon: "📚",
      time: "28 min ago",
      amount: "৳2,000",
      txid: "NAG7821XYZ",
      kyc: "Verified",
      status: "pending",
      risk: "Low",
      fraud: false,
    },
    {
      id: 3,
      name: "Rahim Islam",
      phone: "01911-000111",
      avatar: "R",
      avatarBg: "from-purple-500 to-indigo-500",
      method: "Bank Transfer",
      methodIcon: "🏦",
      goal: "Hajj Fund",
      goalIcon: "🕌",
      time: "1 hour ago",
      amount: "৳25,000",
      txid: "DBBL-2026-00811-TXN",
      kyc: "Verified",
      status: "pending",
      risk: "Low",
      fraud: false,
    },
    {
      id: 4,
      name: "Unknown User #4821",
      phone: "01999-XXXXXX",
      avatar: "X",
      avatarBg: "from-red-500 to-orange-500",
      method: "bKash",
      methodIcon: "💜",
      goal: "Unknown",
      goalIcon: "⚠️",
      time: "2 hours ago",
      amount: "৳10,000",
      txid: "9ZZZ99AAA9",
      kyc: "Pending",
      status: "pending",
      risk: "High (92)",
      riskColor: "danger",
      fraud: true,
      fraudText: "Flagged — possible duplicate",
    },
  ];

  const stats = [
    {
      icon: "⏳",
      value: pendingCount,
      label: "Pending Review",
      bg: "bg-amber-500/10",
      iconBg: "bg-amber-500/10",
    },
    {
      icon: "✅",
      value: "47",
      label: "Approved Today",
      trend: "+৳3.2L today",
      trendUp: true,
      bg: "bg-primary/10",
      iconBg: "bg-primary/10",
    },
    {
      icon: "❌",
      value: "3",
      label: "Rejected Today",
      bg: "bg-red-500/10",
      iconBg: "bg-red-500/10",
    },
    {
      icon: "⏱️",
      value: "1.4h",
      label: "Avg. Review Time",
      bg: "bg-cyan-500/10",
      iconBg: "bg-cyan-500/10",
    },
  ];

  const filteredDeposits = deposits.filter((deposit) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "bKash") return deposit.method === "bKash";
    if (activeFilter === "Nagad") return deposit.method === "Nagad";
    if (activeFilter === "Bank") return deposit.method === "Bank Transfer";
    return true;
  });

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const approveDeposit = (deposit, btn) => {
    setPendingCount((prev) => Math.max(0, prev - 1));
    showToastMessage(
      `✅ Deposit of ${deposit.amount} approved for ${deposit.name}`,
      "success",
    );
  };

  const rejectDeposit = (deposit, btn) => {
    if (
      confirm(
        `Reject this deposit of ${deposit.amount} from ${deposit.name}? Member will be notified.`,
      )
    ) {
      setPendingCount((prev) => Math.max(0, prev - 1));
      showToastMessage(
        `❌ Deposit of ${deposit.amount} rejected for ${deposit.name}`,
        "error",
      );
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
    showToastMessage(`👤 Viewing user profile for ${deposit.name}`, "info");
  };

  const bulkApprove = () => {
    showToastMessage(`✅ All verified deposits approved in bulk`, "success");
  };

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
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-2">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  activeFilter === filter
                    ? "bg-primary/10 border-primary text-primary"
                    : "border-border bg-card text-foreground/60 hover:border-primary"
                }`}
              >
                {filter}{" "}
                {filter === "All"
                  ? `(${pendingCount})`
                  : filter === "bKash"
                    ? "(9)"
                    : filter === "Nagad"
                      ? "(3)"
                      : "(2)"}
              </button>
            ))}
          </div>
          <button
            onClick={bulkApprove}
            className="px-4 py-1.5 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs font-semibold flex items-center gap-1"
          >
            <CheckCircle size={12} /> Approve All Verified
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-5">
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
              {stat.trend && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
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

      {/* Deposit Items */}
      <div className="space-y-3">
        {filteredDeposits.map((deposit) => (
          <motion.div
            key={deposit.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`bg-card border rounded-xl p-4 transition ${deposit.fraud ? "border-red-500/30 bg-red-500/5" : "border-border"}`}
          >
            {/* Deposit Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-10 h-10 rounded-full bg-linear-to-r ${deposit.avatarBg} flex items-center justify-center text-white font-bold`}
                >
                  {deposit.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">
                    {deposit.name}
                  </div>
                  <div className="text-xs text-foreground/50">
                    {deposit.phone} · {deposit.methodIcon} {deposit.method} ·{" "}
                    {deposit.goalIcon} {deposit.goal} · {deposit.time}
                  </div>
                </div>
              </div>
              <div className="text-xl font-bold text-primary">
                {deposit.amount}
              </div>
            </div>

            {/* TxID */}
            <div
              className={`text-xs font-mono mb-3 p-2 rounded-lg ${deposit.fraud ? "bg-red-500/10 text-red-500" : "bg-background text-foreground/50"}`}
            >
              TxID: {deposit.txid}{" "}
              {deposit.fraud && `· ⚠️ ${deposit.fraudText}`}
            </div>

            {/* Details */}
            <div className="grid grid-cols-3 gap-3 mb-3">
              <div className="bg-background rounded-lg p-2">
                <div className="text-[10px] text-foreground/50">Method</div>
                <div className="text-sm font-semibold">
                  {deposit.methodIcon} {deposit.method}
                </div>
              </div>
              <div className="bg-background rounded-lg p-2">
                <div className="text-[10px] text-foreground/50">Goal</div>
                <div className="text-sm font-semibold">
                  {deposit.goalIcon} {deposit.goal}
                </div>
              </div>
              <div className="bg-background rounded-lg p-2">
                <div className="text-[10px] text-foreground/50">KYC</div>
                <div
                  className={`text-sm font-semibold ${deposit.kyc === "Verified" ? "text-primary" : "text-amber-500"}`}
                >
                  {deposit.kyc === "Verified" ? "✅ Verified" : "⚠️ Pending"}
                </div>
              </div>
            </div>

            {/* Screenshot Preview */}
            <div
              onClick={() => viewScreenshot(deposit)}
              className={`h-24 rounded-lg border-2 border-dashed flex items-center justify-center cursor-pointer transition mb-3 ${
                deposit.fraud
                  ? "border-red-500/50 bg-red-500/5 hover:bg-red-500/10"
                  : "border-border bg-background hover:border-primary"
              }`}
            >
              <div className="text-center">
                <Eye size={20} className="mx-auto mb-1 text-foreground/50" />
                <span className="text-xs text-foreground/50">
                  📸 Screenshot — tap to view full
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {deposit.fraud ? (
                <>
                  <button
                    onClick={() => approveDeposit(deposit)}
                    className="flex-1 py-2 rounded-lg border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition"
                  >
                    ✅ Approve Anyway
                  </button>
                  <button
                    onClick={() => rejectDeposit(deposit)}
                    className="flex-1 py-2 rounded-lg bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition"
                  >
                    ❌ Reject & Flag
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => approveDeposit(deposit)}
                    className="flex-1 py-2 rounded-lg border border-primary/30 text-primary text-sm font-semibold hover:bg-primary/10 transition"
                  >
                    ✅ Approve
                  </button>
                  <button
                    onClick={() => rejectDeposit(deposit)}
                    className="flex-1 py-2 rounded-lg border border-red-500/30 text-red-500 text-sm font-semibold hover:bg-red-500/10 transition"
                  >
                    ❌ Reject
                  </button>
                </>
              )}
              <button
                onClick={() => viewUser(deposit)}
                className="px-4 py-2 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition"
              >
                👤 User
              </button>
            </div>
          </motion.div>
        ))}
      </div>

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
              className="bg-card rounded-2xl max-w-lg w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-border flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Deposit Screenshot
                  </h3>
                  <p className="text-sm text-foreground/50">
                    {selectedDeposit.name} · {selectedDeposit.amount}
                  </p>
                </div>
                <button
                  onClick={closeScreenshotModal}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                >
                  ✕
                </button>
              </div>
              <div className="p-5">
                <div className="bg-background rounded-xl p-4 text-center border border-border">
                  <div className="text-6xl mb-3">📸</div>
                  <div className="text-sm text-foreground/70">
                    Transaction Screenshot Preview
                  </div>
                  <div className="mt-4 p-4 bg-card rounded-lg border border-border">
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground/50">Amount:</span>
                        <span className="font-bold">
                          {selectedDeposit.amount}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/50">TxID:</span>
                        <span className="font-mono">
                          {selectedDeposit.txid}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/50">Method:</span>
                        <span>{selectedDeposit.method}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/50">Time:</span>
                        <span>{selectedDeposit.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-border flex gap-3">
                <button
                  onClick={() => {
                    approveDeposit(selectedDeposit);
                    closeScreenshotModal();
                  }}
                  className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold"
                >
                  ✅ Approve
                </button>
                <button
                  onClick={() => {
                    rejectDeposit(selectedDeposit);
                    closeScreenshotModal();
                  }}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/70 font-semibold hover:border-red-500 hover:text-red-500 transition"
                >
                  ❌ Reject
                </button>
              </div>
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
