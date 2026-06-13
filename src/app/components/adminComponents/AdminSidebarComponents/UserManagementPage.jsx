"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  UserPlus,
  Download,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

const UserManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const filters = ["All", "Active", "Pending KYC", "Flagged", "Suspended"];

  const users = [
    {
      id: 1,
      name: "Fatema Akter",
      email: "fatema@email.com",
      phone: "+880 1712-XXXXXX",
      avatar: "F",
      avatarBg: "from-primary to-primary-light",
      plan: "Gold",
      planColor: "warn",
      saved: "৳2,45,500",
      kyc: "Verified",
      kycStatus: "ok",
      risk: "Low (12)",
      riskColor: "primary",
      status: "Active",
      statusColor: "ok",
      joined: "Jan 2025",
      goals: "4 goals",
      streak: "🔥 90 days",
      referrals: "12",
    },
    {
      id: 2,
      name: "Karim Ahmed",
      email: "karim@email.com",
      phone: "+880 1855-XXXXXX",
      avatar: "K",
      avatarBg: "from-blue-500 to-purple-500",
      plan: "Silver",
      planColor: "info",
      saved: "৳98,500",
      kyc: "Verified",
      kycStatus: "ok",
      risk: "Low (8)",
      riskColor: "primary",
      status: "Active",
      statusColor: "ok",
      joined: "Mar 2025",
      goals: "2 goals",
      streak: "🔥 45 days",
      referrals: "3",
    },
    {
      id: 3,
      name: "Unknown User",
      email: "ID #4821 — No email",
      phone: "+880 1999-XXXXXX",
      avatar: "X",
      avatarBg: "from-red-500 to-orange-500",
      plan: "Bronze",
      planColor: "gray",
      saved: "৳12,000",
      kyc: "Pending",
      kycStatus: "warn",
      risk: "High (92)",
      riskColor: "danger",
      status: "Flagged",
      statusColor: "danger",
      joined: "May 2026",
      goals: "1 goal",
      streak: "0 days",
      referrals: "0",
    },
    {
      id: 4,
      name: "Nasrin Khatun",
      email: "nasrin@email.com",
      phone: "+880 1677-XXXXXX",
      avatar: "N",
      avatarBg: "from-primary to-primary-light",
      plan: "Gold",
      planColor: "warn",
      saved: "৳1,24,000",
      kyc: "In Review",
      kycStatus: "info",
      risk: "Med (44)",
      riskColor: "warning",
      status: "KYC Review",
      statusColor: "info",
      joined: "Feb 2025",
      goals: "3 goals",
      streak: "🔥 22 days",
      referrals: "5",
    },
    {
      id: 5,
      name: "Rahim Islam",
      email: "rahim@email.com",
      phone: "+880 1911-XXXXXX",
      avatar: "R",
      avatarBg: "from-purple-500 to-indigo-500",
      plan: "Platinum",
      planColor: "purple",
      saved: "৳8,40,000",
      kyc: "Verified",
      kycStatus: "ok",
      risk: "Low (5)",
      riskColor: "primary",
      status: "Active",
      statusColor: "ok",
      joined: "Sep 2024",
      goals: "6 goals",
      streak: "🔥 200 days",
      referrals: "28",
    },
  ];

  const getBadgeClass = (type, color) => {
    const classes = {
      ok: "bg-green-500/10 text-green-500",
      warn: "bg-amber-500/10 text-amber-500",
      info: "bg-blue-500/10 text-blue-500",
      danger: "bg-red-500/10 text-red-500",
      primary: "bg-primary/10 text-primary",
      warning: "bg-amber-500/10 text-amber-500",
      gray: "bg-gray-500/10 text-gray-500",
      purple: "bg-purple-500/10 text-purple-500",
    };
    return classes[color] || classes.ok;
  };

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "Active" && user.status === "Active") ||
      (activeFilter === "Pending KYC" && user.kyc === "Pending") ||
      (activeFilter === "Flagged" && user.status === "Flagged") ||
      (activeFilter === "Suspended" && user.status === "Suspended");
    return matchesSearch && matchesFilter;
  });

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
    document.body.style.overflow = "auto";
  };

  const handleAction = (action, user) => {
    if (action === "suspend") {
      showToastMessage(`⏸️ User ${user.name} suspended`, "warning");
    } else if (action === "ban") {
      if (confirm(`Ban user ${user.name} permanently?`)) {
        showToastMessage(`🚫 User ${user.name} banned permanently`, "error");
      }
    } else if (action === "approveKYC") {
      showToastMessage(`✅ KYC approved for ${user.name}`, "success");
    } else if (action === "edit") {
      showToastMessage(`✏️ Opening edit form for ${user.name}`, "info");
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-lg font-bold text-foreground">
          👥 User Management
        </h2>
        <button
          onClick={() => showToastMessage("➕ Opening add user form...")}
          className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <UserPlus size={16} /> Add User
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background">
          <Search size={16} className="text-foreground/50" />
          <input
            type="text"
            placeholder="Search by name, phone, NID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
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
              {filter}
            </button>
          ))}
          <button
            onClick={() =>
              showToastMessage(
                "⬇️ Exporting CSV... download will start shortly",
              )
            }
            className="px-4 py-1.5 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs font-semibold flex items-center gap-1"
          >
            <Download size={12} /> Export
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-200">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Member
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Phone
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Plan
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Total Saved
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  KYC
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Risk Score
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Joined
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr
                  key={user.id}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full bg-linear-to-r ${user.avatarBg} flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {user.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground">
                          {user.name}
                        </div>
                        <div className="text-xs text-foreground/50">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {user.phone}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(user.plan, user.planColor)}`}
                    >
                      {user.plan === "Gold"
                        ? "🥇 Gold"
                        : user.plan === "Silver"
                          ? "🥈 Silver"
                          : user.plan === "Platinum"
                            ? "💎 Platinum"
                            : "🥉 Bronze"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm font-bold text-primary">
                    {user.saved}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(user.kyc, user.kycStatus)}`}
                    >
                      {user.kyc === "Verified"
                        ? "✅ Verified"
                        : user.kyc === "Pending"
                          ? "⚠️ Pending"
                          : "🔄 In Review"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-bold ${user.riskColor === "danger" ? "text-red-500" : user.riskColor === "warning" ? "text-amber-500" : "text-primary"}`}
                    >
                      {user.risk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(user.status, user.statusColor)}`}
                    >
                      {user.status === "Flagged"
                        ? "🚨 Flagged"
                        : user.status === "KYC Review"
                          ? "KYC Review"
                          : user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground/50">
                    {user.joined}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openUserModal(user)}
                        className="p-1.5 rounded-lg border border-border hover:border-primary transition"
                        title="View"
                      >
                        <Eye size={14} />
                      </button>
                      <button
                        onClick={() => handleAction("edit", user)}
                        className="p-1.5 rounded-lg border border-border hover:border-primary transition"
                        title="Edit"
                      >
                        <Edit size={14} />
                      </button>
                      {user.status === "Flagged" ? (
                        <button
                          onClick={() => handleAction("ban", user)}
                          className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition"
                          title="Ban"
                        >
                          <Ban size={14} />
                        </button>
                      ) : user.kyc === "In Review" ? (
                        <button
                          onClick={() => handleAction("approveKYC", user)}
                          className="p-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition"
                          title="Approve KYC"
                        >
                          <CheckCircle size={14} />
                        </button>
                      ) : (
                        <button
                          onClick={() => handleAction("suspend", user)}
                          className="p-1.5 rounded-lg border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition"
                          title="Suspend"
                        >
                          <XCircle size={14} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-border">
          <div className="text-xs text-foreground/50">
            Showing {filteredUsers.length} of {users.length} members
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition">
              ← Prev
            </button>
            <button className="px-3 py-1 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs font-semibold border-none">
              1
            </button>
            <button className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition">
              2
            </button>
            <button className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition">
              3
            </button>
            <button className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition">
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* User Modal */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={closeUserModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-linear-to-r from-primary to-primary-light p-6 text-white relative">
                <button
                  onClick={closeUserModal}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition"
                >
                  ✕
                </button>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-16 h-16 rounded-full bg-linear-to-r ${selectedUser.avatarBg} flex items-center justify-center text-white text-2xl font-bold mb-3`}
                  >
                    {selectedUser.avatar}
                  </div>
                  <div className="text-xl font-bold">{selectedUser.name}</div>
                  <div className="text-sm text-white/80">
                    {selectedUser.phone} · {selectedUser.email}
                  </div>
                  <div className="flex gap-2 mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold bg-white/20`}
                    >
                      {selectedUser.plan} Member
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold bg-white/20`}
                    >
                      {selectedUser.kyc === "Verified"
                        ? "✅ KYC Verified"
                        : selectedUser.kyc === "Pending"
                          ? "⚠️ KYC Pending"
                          : "🔄 KYC In Review"}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold bg-white/20`}
                    >
                      {selectedUser.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6">
                <div className="mb-5">
                  <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">
                    Savings Overview
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background rounded-xl p-3">
                      <div className="text-[10px] text-foreground/50">
                        Total Savings
                      </div>
                      <div className="text-lg font-bold text-primary">
                        {selectedUser.saved}
                      </div>
                    </div>
                    <div className="bg-background rounded-xl p-3">
                      <div className="text-[10px] text-foreground/50">
                        Active Goals
                      </div>
                      <div className="text-lg font-bold text-foreground">
                        {selectedUser.goals}
                      </div>
                    </div>
                    <div className="bg-background rounded-xl p-3">
                      <div className="text-[10px] text-foreground/50">
                        Member Since
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {selectedUser.joined}
                      </div>
                    </div>
                    <div className="bg-background rounded-xl p-3">
                      <div className="text-[10px] text-foreground/50">
                        Streak
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {selectedUser.streak}
                      </div>
                    </div>
                    <div className="bg-background rounded-xl p-3">
                      <div className="text-[10px] text-foreground/50">
                        Risk Score
                      </div>
                      <div
                        className={`text-sm font-bold ${selectedUser.riskColor === "danger" ? "text-red-500" : selectedUser.riskColor === "warning" ? "text-amber-500" : "text-primary"}`}
                      >
                        {selectedUser.risk}
                      </div>
                    </div>
                    <div className="bg-background rounded-xl p-3">
                      <div className="text-[10px] text-foreground/50">
                        Referrals
                      </div>
                      <div className="text-sm font-semibold text-foreground">
                        {selectedUser.referrals} members
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-5">
                  <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">
                    Recent Activity
                  </div>
                  <div className="space-y-2">
                    <div className="p-3 bg-background rounded-lg text-sm text-foreground/70">
                      💳 Deposit ৳5,000 via bKash · Today 10:32 AM
                    </div>
                    <div className="p-3 bg-background rounded-lg text-sm text-foreground/70">
                      🎯 Created new goal: Hajj Fund · 2 days ago
                    </div>
                    <div className="p-3 bg-background rounded-lg text-sm text-foreground/70">
                      ✅ KYC verified · Jan 15, 2025
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border flex gap-3">
                <button className="flex-1 py-3 rounded-xl border-2 border-primary/30 text-primary font-semibold hover:bg-primary/5 transition">
                  📧 Message
                </button>
                <button className="flex-1 py-3 rounded-xl border-2 border-amber-500/30 text-amber-500 font-semibold hover:bg-amber-500/5 transition">
                  ⏸️ Suspend
                </button>
                <button className="flex-1 py-3 rounded-xl border-2 border-red-500/30 text-red-500 font-semibold hover:bg-red-500/5 transition">
                  🚫 Ban
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
                : toast.type === "warning"
                  ? "bg-amber-500"
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

export default UserManagementPage;
