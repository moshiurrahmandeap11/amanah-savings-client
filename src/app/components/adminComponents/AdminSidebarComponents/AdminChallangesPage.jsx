"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Users,
  Trophy,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  Search,
  Filter,
} from "lucide-react";

import Swal from "sweetalert2";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

const AdminChallengesPage = () => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingChallenge, setEditingChallenge] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "🏆",
    bgGradient: "from-primary to-primary-light",
    period: "",
    startDate: "",
    endDate: "",
    days: "",
    maxReward: "",
    reward: "",
    targetAmount: "",
    dailyTarget: "",
    status: "upcoming",
  });
  const [statistics, setStatistics] = useState({
    challenges: { total: 0, active: 0, upcoming: 0, completed: 0 },
    participants: { total: 0, active: 0, completed: 0 },
    totalSaved: "৳0",
    mostPopular: "N/A",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const gradientOptions = [
    "from-primary to-primary-light",
    "from-indigo-900 to-blue-900",
    "from-amber-700 to-amber-800",
    "from-purple-700 to-primary",
    "from-red-600 to-amber-500",
    "from-indigo-600 to-purple-700",
    "from-cyan-600 to-primary",
    "from-green-600 to-emerald-600",
    "from-pink-600 to-rose-600",
  ];

  const iconOptions = ["🏆", "🌙", "🔥", "🎉", "💯", "🎓", "🌸", "🎄", "❄️", "⭐", "💪", "🎯"];

  // Fetch challenges
  const fetchChallenges = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/challenges");
      if (response.data.success) {
        setChallenges(response.data.data.challenges);
        setStatistics(response.data.data.statistics);
      }
    } catch (error) {
      console.error("Fetch challenges error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load challenges",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStatistics = async () => {
    try {
      const response = await axiosInstance.get("/challenges/admin/statistics");
      if (response.data.success) {
        setStatistics(response.data.data);
      }
    } catch (error) {
      console.error("Fetch statistics error:", error);
    }
  };

  useEffect(() => {
    fetchChallenges();
    fetchStatistics();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      icon: "🏆",
      bgGradient: "from-primary to-primary-light",
      period: "",
      startDate: "",
      endDate: "",
      days: "",
      maxReward: "",
      reward: "",
      targetAmount: "",
      dailyTarget: "",
      status: "upcoming",
    });
    setEditingChallenge(null);
  };

  const openCreateModal = () => {
    resetForm();
    setShowModal(true);
  };

  const openEditModal = (challenge) => {
    setEditingChallenge(challenge);
    setFormData({
      name: challenge.name,
      description: challenge.description,
      icon: challenge.icon,
      bgGradient: challenge.bgGradient,
      period: challenge.period || "",
      startDate: challenge.startDate ? challenge.startDate.split("T")[0] : "",
      endDate: challenge.endDate ? challenge.endDate.split("T")[0] : "",
      days: challenge.days,
      maxReward: challenge.maxReward,
      reward: challenge.reward,
      targetAmount: challenge.targetAmount || "",
      dailyTarget: challenge.dailyTarget || "",
      status: challenge.status,
    });
    setShowModal(true);
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.name || !formData.description || !formData.startDate || !formData.endDate) {
      Swal.fire({
        title: "Error!",
        text: "Please fill all required fields",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    try {
      let response;
      if (editingChallenge) {
        response = await axiosInstance.put(`/challenges/admin/${editingChallenge._id}`, formData);
      } else {
        response = await axiosInstance.post("/challenges/admin/create", formData);
      }

      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: editingChallenge ? "Challenge updated successfully" : "Challenge created successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        setShowModal(false);
        resetForm();
        fetchChallenges();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Submit challenge error:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to save challenge",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  const deleteChallenge = async (challenge) => {
    const result = await Swal.fire({
      title: "Delete Challenge?",
      html: `Are you sure you want to delete <strong>${challenge.name}</strong>?<br/>This will also remove all participant data.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/challenges/admin/${challenge._id}`);
        if (response.data.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Challenge has been deleted.",
            icon: "success",
            timer: 1500,
            showConfirmButton: false,
          });
          fetchChallenges();
          fetchStatistics();
        }
      } catch (error) {
        console.error("Delete challenge error:", error);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Failed to delete challenge",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const updateChallengeStatus = async (challenge, newStatus) => {
    try {
      const response = await axiosInstance.patch(`/challenges/admin/${challenge._id}/status`, {
        status: newStatus,
      });
      if (response.data.success) {
        Swal.fire({
          title: "Updated!",
          text: `Challenge status changed to ${newStatus}`,
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchChallenges();
        fetchStatistics();
      }
    } catch (error) {
      console.error("Update status error:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to update status",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return { icon: "🔴", text: "Active", class: "bg-green-500/10 text-green-500 border-green-500/20" };
      case "upcoming":
        return { icon: "📅", text: "Upcoming", class: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
      case "completed":
        return { icon: "✅", text: "Completed", class: "bg-blue-500/10 text-blue-500 border-blue-500/20" };
      case "cancelled":
        return { icon: "❌", text: "Cancelled", class: "bg-red-500/10 text-red-500 border-red-500/20" };
      default:
        return { icon: "📅", text: "Upcoming", class: "bg-amber-500/10 text-amber-500 border-amber-500/20" };
    }
  };

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || challenge.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-foreground">🏆 Manage Challenges</h2>
          <p className="text-sm text-foreground/50 mt-1">
            Create and manage seasonal savings challenges
          </p>
        </div>
        <button
          onClick={openCreateModal}
          className="px-5 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold flex items-center gap-2 hover:opacity-90 transition"
        >
          <Plus size={18} />
          Create Challenge
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Trophy size={16} className="text-primary" />
            <span className="text-xs text-foreground/50">Total Challenges</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{statistics.challenges?.total || 0}</div>
          <div className="text-xs text-green-500 mt-1">
            {statistics.challenges?.active || 0} Active
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Users size={16} className="text-amber-500" />
            <span className="text-xs text-foreground/50">Total Participants</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{statistics.participants?.total || 0}</div>
          <div className="text-xs text-green-500 mt-1">
            {statistics.participants?.active || 0} Active
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle size={16} className="text-green-500" />
            <span className="text-xs text-foreground/50">Completed</span>
          </div>
          <div className="text-2xl font-bold text-foreground">{statistics.participants?.completed || 0}</div>
          <div className="text-xs text-foreground/50 mt-1">Challengers</div>
        </div>
        <div className="bg-card border border-border rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className="text-blue-500" />
            <span className="text-xs text-foreground/50">Most Popular</span>
          </div>
          <div className="text-sm font-bold text-foreground truncate">{statistics.mostPopular || "N/A"}</div>
          <div className="text-xs text-primary mt-1">{statistics.totalSaved}</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
          <input
            type="text"
            placeholder="Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary transition"
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "upcoming", "completed", "cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                statusFilter === status
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {status === "all" ? "All" : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Challenges List */}
      <div className="space-y-3">
        {filteredChallenges.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border">
            <div className="text-4xl mb-3">🏆</div>
            <div className="text-foreground/50">No challenges found</div>
            <button
              onClick={openCreateModal}
              className="mt-4 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold"
            >
              Create your first challenge
            </button>
          </div>
        ) : (
          filteredChallenges.map((challenge) => {
            const statusBadge = getStatusBadge(challenge.status);
            
            return (
              <motion.div
                key={challenge._id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-card border border-border rounded-xl overflow-hidden"
              >
                <div className={`bg-linear-to-r ${challenge.bgGradient || "from-primary to-primary-light"} p-4`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{challenge.icon}</div>
                      <div>
                        <h3 className="text-white font-bold text-lg">{challenge.name}</h3>
                        <p className="text-white/70 text-xs">{challenge.period || "No period set"}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusBadge.class}`}>
                        {statusBadge.icon} {statusBadge.text}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <p className="text-sm text-foreground/70 mb-4 line-clamp-2">{challenge.description}</p>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <div className="bg-background rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-primary">{challenge.participants?.toLocaleString() || 0}</div>
                      <div className="text-[10px] text-foreground/50">Participants</div>
                    </div>
                    <div className="bg-background rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-primary">{challenge.days}</div>
                      <div className="text-[10px] text-foreground/50">Days</div>
                    </div>
                    <div className="bg-background rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-primary">{challenge.completedCount || 0}</div>
                      <div className="text-[10px] text-foreground/50">Completed</div>
                    </div>
                    <div className="bg-background rounded-lg p-2 text-center">
                      <div className="text-sm font-bold text-primary truncate">{challenge.maxReward}</div>
                      <div className="text-[10px] text-foreground/50">Max Reward</div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => openEditModal(challenge)}
                      className="px-3 py-1.5 rounded-lg border border-border text-foreground/70 text-xs font-semibold hover:border-primary hover:text-primary transition"
                    >
                      <Edit size={12} className="inline mr-1" />
                      Edit
                    </button>
                    <button
                      onClick={() => deleteChallenge(challenge)}
                      className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500 hover:text-white transition"
                    >
                      <Trash2 size={12} className="inline mr-1" />
                      Delete
                    </button>
                    {challenge.status !== "active" && challenge.status !== "completed" && (
                      <button
                        onClick={() => updateChallengeStatus(challenge, "active")}
                        className="px-3 py-1.5 rounded-lg border border-green-500/30 text-green-500 text-xs font-semibold hover:bg-green-500 hover:text-white transition"
                      >
                        <CheckCircle size={12} className="inline mr-1" />
                        Activate
                      </button>
                    )}
                    {challenge.status === "active" && (
                      <button
                        onClick={() => updateChallengeStatus(challenge, "completed")}
                        className="px-3 py-1.5 rounded-lg border border-blue-500/30 text-blue-500 text-xs font-semibold hover:bg-blue-500 hover:text-white transition"
                      >
                        <CheckCircle size={12} className="inline mr-1" />
                        Mark Complete
                      </button>
                    )}
                    {challenge.status === "active" && (
                      <button
                        onClick={() => updateChallengeStatus(challenge, "cancelled")}
                        className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500 hover:text-white transition"
                      >
                        <XCircle size={12} className="inline mr-1" />
                        Cancel
                      </button>
                    )}
                    <button
                      onClick={() => window.open(`/dashboard/challenges/${challenge._id}`, "_blank")}
                      className="px-3 py-1.5 rounded-lg border border-border text-foreground/70 text-xs font-semibold hover:border-primary hover:text-primary transition"
                    >
                      <Eye size={12} className="inline mr-1" />
                      View
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-card border-b border-border p-5 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-foreground">
                    {editingChallenge ? "Edit Challenge" : "Create New Challenge"}
                  </h3>
                  <p className="text-sm text-foreground/50">
                    {editingChallenge ? "Update challenge details" : "Add a new savings challenge"}
                  </p>
                </div>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                >
                  ✕
                </button>
              </div>
              
              <div className="p-5 space-y-4">
                {/* Basic Info */}
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">
                    Challenge Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g., Ramadan Challenge"
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    placeholder="Describe the challenge..."
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition resize-none"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Icon
                    </label>
                    <select
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    >
                      {iconOptions.map((icon) => (
                        <option key={icon} value={icon}>
                          {icon}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Gradient
                    </label>
                    <select
                      name="bgGradient"
                      value={formData.bgGradient}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    >
                      {gradientOptions.map((gradient) => (
                        <option key={gradient} value={gradient}>
                          {gradient}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Start Date *
                    </label>
                    <input
                      type="date"
                      name="startDate"
                      value={formData.startDate}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      End Date *
                    </label>
                    <input
                      type="date"
                      name="endDate"
                      value={formData.endDate}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Days
                    </label>
                    <input
                      type="number"
                      name="days"
                      value={formData.days}
                      onChange={handleInputChange}
                      placeholder="Auto-calculated if empty"
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Period Display
                    </label>
                    <input
                      type="text"
                      name="period"
                      value={formData.period}
                      onChange={handleInputChange}
                      placeholder="e.g., May 2 – June 10, 2026"
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Max Reward
                    </label>
                    <input
                      type="text"
                      name="maxReward"
                      value={formData.maxReward}
                      onChange={handleInputChange}
                      placeholder="e.g., ৳8,700 or 14%"
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    >
                      <option value="upcoming">Upcoming</option>
                      <option value="active">Active</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-1">
                    Reward Description
                  </label>
                  <input
                    type="text"
                    name="reward"
                    value={formData.reward}
                    onChange={handleInputChange}
                    placeholder="e.g., 🏆 Badge + ৳1,000 bonus"
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Target Amount (Optional)
                    </label>
                    <input
                      type="number"
                      name="targetAmount"
                      value={formData.targetAmount}
                      onChange={handleInputChange}
                      placeholder="Total savings target"
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-1">
                      Daily Target (Optional)
                    </label>
                    <input
                      type="number"
                      name="dailyTarget"
                      value={formData.dailyTarget}
                      onChange={handleInputChange}
                      placeholder="Daily savings amount"
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>
                </div>
              </div>
              
              <div className="sticky bottom-0 bg-card border-t border-border p-5 flex gap-3">
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/70 font-semibold hover:border-primary transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition"
                >
                  {editingChallenge ? "Update Challenge" : "Create Challenge"}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminChallengesPage;