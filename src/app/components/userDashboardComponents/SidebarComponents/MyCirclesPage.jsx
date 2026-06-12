"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Users,
  Wallet,
  Calendar,
  Plus,
  Info,
  ChevronRight,
  CircleDot,
  X,
  Target,
  Lock,
  Globe,
  Sparkles,
  TrendingUp,
  Shield,
  UserPlus,
  Loader2,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const MyCirclesPage = () => {
  const [showCircleModal, setShowCircleModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [circleType, setCircleType] = useState("private");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [circles, setCircles] = useState([]);
  console.log("circle :", circles);
  const [publicCircles, setPublicCircles] = useState([]);
  const [selectedPurpose, setSelectedPurpose] = useState("all");
  const [formData, setFormData] = useState({
    circleName: "",
    purpose: "",
    targetAmount: "",
    maxMembers: "10",
    minDeposit: "",
    description: "",
  });

  const purposes = [
    { emoji: "💍", name: "Wedding", value: "wedding" },
    { emoji: "🕌", name: "Hajj/Umrah", value: "hajj" },
    { emoji: "🎓", name: "Education", value: "education" },
    { emoji: "🏠", name: "Home", value: "home" },
    { emoji: "💼", name: "Business", value: "business" },
    { emoji: "🆘", name: "Emergency", value: "emergency" },
    { emoji: "✈️", name: "Travel", value: "travel" },
    { emoji: "🌙", name: "Eid", value: "eid" },
    { emoji: "🤝", name: "General", value: "general" },
  ];

  // Fetch user's circles
  const fetchUserCircles = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/circles");
      if (response.data.success) {
        setCircles(response.data.data.circles || []);
      }
    } catch (error) {
      console.error("Fetch circles error:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch public circles
  const fetchPublicCircles = async () => {
    try {
      const response = await axiosInstance.get("/circles/public", {
        params: { purpose: selectedPurpose }
      });
      if (response.data.success) {
        setPublicCircles(response.data.data.circles || []);
      }
    } catch (error) {
      console.error("Fetch public circles error:", error);
    }
  };

  // Create circle
  const createCircle = async () => {
    // Validation
    if (!formData.circleName.trim()) {
      Swal.fire({
        title: "Error",
        text: "Please enter a circle name",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!formData.purpose) {
      Swal.fire({
        title: "Error",
        text: "Please select a purpose",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!formData.targetAmount || parseFloat(formData.targetAmount) <= 0) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid target amount",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!formData.minDeposit || parseFloat(formData.minDeposit) <= 0) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid minimum deposit",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    setSubmitting(true);

    try {
      const requestData = {
        ...formData,
        targetAmount: parseFloat(formData.targetAmount),
        minDeposit: parseFloat(formData.minDeposit),
        maxMembers: parseInt(formData.maxMembers),
        circleType,
      };

      const response = await axiosInstance.post("/circles", requestData);

      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Circle created successfully",
          icon: "success",
          confirmButtonColor: "#059669",
          timer: 2000,
          showConfirmButton: false,
        });

        setShowCircleModal(false);
        setFormData({
          circleName: "",
          purpose: "",
          targetAmount: "",
          maxMembers: "10",
          minDeposit: "",
          description: "",
        });
        setCircleType("private");
        
        await fetchUserCircles();
      }
    } catch (error) {
      console.error("Create circle error:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to create circle",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Join circle
  const joinCircle = async (circleId) => {
    const result = await Swal.fire({
      title: "Join Circle?",
      text: "Are you sure you want to join this circle?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, join",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.post(`/circles/${circleId}/join`);
        
        if (response.data.success) {
          Swal.fire({
            title: "Joined!",
            text: "You have successfully joined the circle",
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          });
          
          await fetchUserCircles();
          await fetchPublicCircles();
        }
      } catch (error) {
        console.error("Join circle error:", error);
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Failed to join circle",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    fetchUserCircles();
  }, []);

  useEffect(() => {
    if (showJoinModal) {
      fetchPublicCircles();
    }
  }, [showJoinModal, selectedPurpose]);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading your circles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground">
            🤝 My Circles
          </h2>
          <p className="text-xs sm:text-sm text-foreground/60 mt-1">
            Community savings groups — achieve goals together
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowJoinModal(true)}
            className="px-4 sm:px-5 py-2.5 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20 transition w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Users size={18} /> 
            <span>Join Circle</span>
          </button>
          <button
            onClick={() => setShowCircleModal(true)}
            className="px-4 sm:px-5 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Plus size={18} /> 
            <span>Create Circle</span>
          </button>
        </div>
      </div>

      {/* Circles Grid */}
      {circles.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center mb-8">
          <div className="text-6xl mb-4">🤝</div>
          <h3 className="text-xl font-bold text-foreground mb-2">No Circles Yet</h3>
          <p className="text-foreground/60 mb-4">
            Create or join a circle to start saving together
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setShowCircleModal(true)}
              className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
            >
              <Plus size={18} /> Create Circle
            </button>
            <button
              onClick={() => setShowJoinModal(true)}
              className="px-6 py-2.5 bg-primary/10 text-primary rounded-xl font-semibold hover:bg-primary/20 transition inline-flex items-center gap-2"
            >
              <Users size={18} /> Join Circle
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-8">
          {circles.map((circle, idx) => (
            <motion.div
              key={circle._id || idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-r ${circle.color} flex items-center justify-center text-2xl group-hover:scale-110 transition`}
                >
                  {circle.emoji}
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-sm sm:text-base">{circle.name}</h3>
                  <p className="text-[10px] sm:text-xs text-foreground/50">{circle.type}</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-4">
                <div className="text-center p-2 bg-background rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-primary">{circle.members}</div>
                  <div className="text-[8px] sm:text-[10px] text-foreground/50">Members</div>
                </div>
                <div className="text-center p-2 bg-background rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-primary">{circle.totalPool}</div>
                  <div className="text-[8px] sm:text-[10px] text-foreground/50">Total Pool</div>
                </div>
                <div className="text-center p-2 bg-background rounded-lg">
                  <div className="text-lg sm:text-xl font-bold text-primary">{circle.nextPayout}</div>
                  <div className="text-[8px] sm:text-[10px] text-foreground/50">Next Payout</div>
                </div>
              </div>

              <Link href={`/dashboard/circles/${circle._id}`}>
                <button className="w-full py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs sm:text-sm font-semibold hover:opacity-90 transition">
                  View Details →
                </button>
              </Link>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="bg-linear-to-r from-primary/5 to-blue-500/5 border border-primary/15 rounded-xl sm:rounded-2xl p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <CircleDot size={16} className="text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-foreground text-sm sm:text-base mb-1">What is a Circle?</h3>
            <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
              A Circle is a community savings group where people with the same goals
              save together. Each month, one member receives a payout from the pool
              (rotational basis). It&apos;s the digital version of Bangladesh&apos;s
              traditional "Samity" system.
            </p>
          </div>
        </div>
      </div>

      {/* Create Circle Modal */}
      <AnimatePresence>
        {showCircleModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => !submitting && setShowCircleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-card border border-border rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 rounded-t-2xl z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Users size={16} className="text-primary" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">Create New Circle</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/60">
                      Start a group savings circle with friends or family
                    </p>
                  </div>
                  <button
                    onClick={() => !submitting && setShowCircleModal(false)}
                    disabled={submitting}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition shrink-0 disabled:opacity-50"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Circle Name
                  </label>
                  <input
                    type="text"
                    name="circleName"
                    value={formData.circleName}
                    onChange={handleInputChange}
                    disabled={submitting}
                    placeholder="e.g., Family Savings Circle"
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Purpose
                  </label>
                  <select
                    name="purpose"
                    value={formData.purpose}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                  >
                    <option value="">Select purpose</option>
                    {purposes.map(p => (
                      <option key={p.value} value={p.value}>
                        {p.emoji} {p.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      <Target size={14} className="inline mr-1" /> Target Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">৳</span>
                      <input
                        type="number"
                        name="targetAmount"
                        value={formData.targetAmount}
                        onChange={handleInputChange}
                        disabled={submitting}
                        placeholder="100000"
                        className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      <Users size={14} className="inline mr-1" /> Max Members
                    </label>
                    <select
                      name="maxMembers"
                      value={formData.maxMembers}
                      onChange={handleInputChange}
                      disabled={submitting}
                      className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                    >
                      <option value="5">5 members</option>
                      <option value="10">10 members</option>
                      <option value="20">20 members</option>
                      <option value="50">50 members</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    <Wallet size={14} className="inline mr-1" /> Minimum Monthly Deposit (৳)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">৳</span>
                    <input
                      type="number"
                      name="minDeposit"
                      value={formData.minDeposit}
                      onChange={handleInputChange}
                      disabled={submitting}
                      placeholder="2000"
                      className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-2">
                    Circle Type
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => !submitting && setCircleType("private")}
                      disabled={submitting}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        circleType === "private"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      } disabled:opacity-50`}
                    >
                      <Lock size={16} className={circleType === "private" ? "text-primary" : "text-foreground/50"} />
                      <span className="text-sm font-semibold">Private</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => !submitting && setCircleType("public")}
                      disabled={submitting}
                      className={`flex items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${
                        circleType === "public"
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-border hover:border-primary/50 hover:bg-primary/5"
                      } disabled:opacity-50`}
                    >
                      <Globe size={16} className={circleType === "public" ? "text-primary" : "text-foreground/50"} />
                      <span className="text-sm font-semibold">Public</span>
                    </button>
                  </div>
                  <p className="text-[10px] text-foreground/50 mt-2">
                    {circleType === "private" ? "🔒 Invite only - You control who joins" : "🌍 Anyone can discover and join this circle"}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Description (Optional)
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    disabled={submitting}
                    rows={3}
                    placeholder="Write about your circle's purpose and rules..."
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none text-sm sm:text-base disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4 sm:p-6 rounded-b-2xl z-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowCircleModal(false)}
                    disabled={submitting}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl border border-border text-foreground font-semibold hover:border-red-500 hover:text-red-500 transition text-sm sm:text-base order-2 sm:order-1 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createCircle}
                    disabled={submitting}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2 text-sm sm:text-base order-1 sm:order-2 disabled:opacity-50"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <UserPlus size={16} />
                        Create Circle
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Join Circle Modal */}
      <AnimatePresence>
        {showJoinModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setShowJoinModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-card border border-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 rounded-t-2xl z-10">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Users size={16} className="text-primary" />
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-foreground">Join a Circle</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-foreground/60">
                      Discover and join public circles based on your goals
                    </p>
                  </div>
                  <button
                    onClick={() => setShowJoinModal(false)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6">
                {/* Filter */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-foreground/70 mb-2">
                    Filter by Purpose
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setSelectedPurpose("all")}
                      className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition ${
                        selectedPurpose === "all"
                          ? "bg-primary text-white"
                          : "bg-border text-foreground/70 hover:bg-primary/20"
                      }`}
                    >
                      All
                    </button>
                    {purposes.map(p => (
                      <button
                        key={p.value}
                        onClick={() => setSelectedPurpose(p.value)}
                        className={`px-3 py-1.5 rounded-lg text-xs sm:text-sm font-semibold transition flex items-center gap-1 ${
                          selectedPurpose === p.value
                            ? "bg-primary text-white"
                            : "bg-border text-foreground/70 hover:bg-primary/20"
                        }`}
                      >
                        <span>{p.emoji}</span>
                        <span>{p.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Public Circles Grid */}
                {publicCircles.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-lg font-bold text-foreground mb-2">No circles found</h3>
                    <p className="text-foreground/60">
                      {selectedPurpose === "all" 
                        ? "No public circles available at the moment" 
                        : `No ${selectedPurpose} circles available right now`}
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {publicCircles.map((circle) => (
                      <motion.div
                        key={circle._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card border border-border rounded-xl p-4 hover:border-primary/40 transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{circle.emoji}</span>
                            <div>
                              <h4 className="font-bold text-foreground">{circle.name}</h4>
                              <p className="text-xs text-foreground/50">{circle.purpose}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => joinCircle(circle._id)}
                            className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition"
                          >
                            Join
                          </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center text-xs">
                          <div>
                            <div className="font-bold text-primary">{circle.members}/{circle.maxMembers}</div>
                            <div className="text-foreground/50">Members</div>
                          </div>
                          <div>
                            <div className="font-bold text-primary">{circle.totalPool}</div>
                            <div className="text-foreground/50">Pool</div>
                          </div>
                          <div>
                            <div className="font-bold text-primary">৳{circle.minDeposit.toLocaleString()}</div>
                            <div className="text-foreground/50">Min Deposit</div>
                          </div>
                        </div>
                        {circle.description && (
                          <p className="text-xs text-foreground/60 mt-2 line-clamp-2">
                            {circle.description}
                          </p>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MyCirclesPage;