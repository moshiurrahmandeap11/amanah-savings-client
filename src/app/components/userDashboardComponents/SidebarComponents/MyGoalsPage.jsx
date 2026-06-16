"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Info,
  X,
  Calendar,
  Target,
  Wallet,
  Sparkles,
  CheckCircle,
  Loader2,
  Clock,
  TrendingUp,
  PlayCircle,
  PauseCircle,
  Heart,
  Home,
  GraduationCap,
  Car,
  Briefcase,
  Shield,
  Plane,
  Star,
  Trash2,
  Eye,
  DollarSign,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const MyGoalsPage = () => {
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [selectedGoalType, setSelectedGoalType] = useState("hajj");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [goals, setGoals] = useState([]);
  const [statistics, setStatistics] = useState({
    totalGoals: 0,
    activeGoals: 0,
    completedGoals: 0,
    pausedGoals: 0,
    totalSaved: 0,
    totalTarget: 0,
    overallProgress: 0,
  });
  const [formData, setFormData] = useState({
    goalName: "",
    targetAmount: "",
    monthlyDeposit: "",
    targetDate: "",
    description: "",
    islamicMode: true,
  });

  const goalTypes = [
    { icon: <Star size={20} />, name: "Hajj/Umrah", value: "hajj" },
    { icon: <Heart size={20} />, name: "Wedding", value: "wedding" },
    { icon: <Home size={20} />, name: "Home", value: "home" },
    { icon: <GraduationCap size={20} />, name: "Education", value: "education" },
    { icon: <Car size={20} />, name: "Car", value: "car" },
    { icon: <Briefcase size={20} />, name: "Business", value: "business" },
    { icon: <Shield size={20} />, name: "Emergency", value: "emergency" },
    { icon: <Plane size={20} />, name: "Travel", value: "travel" },
    { icon: <Target size={20} />, name: "Other", value: "other" },
  ];

  const getGoalIcon = (goalType) => {
    const iconMap = {
      hajj: <Star size={28} />,
      wedding: <Heart size={28} />,
      home: <Home size={28} />,
      education: <GraduationCap size={28} />,
      car: <Car size={28} />,
      business: <Briefcase size={28} />,
      emergency: <Shield size={28} />,
      travel: <Plane size={28} />,
      other: <Target size={28} />,
    };
    return iconMap[goalType] || <Target size={28} />;
  };

  const getGoalColor = (goalType) => {
    const colorMap = {
      hajj: "from-amber-500 to-orange-500",
      wedding: "from-pink-500 to-rose-500",
      home: "from-emerald-500 to-teal-500",
      education: "from-purple-500 to-indigo-500",
      car: "from-blue-500 to-cyan-500",
      business: "from-violet-500 to-purple-500",
      emergency: "from-red-500 to-rose-500",
      travel: "from-sky-500 to-blue-500",
      other: "from-gray-500 to-gray-600",
    };
    return colorMap[goalType] || "from-primary to-primary-light";
  };

  const formatCurrency = (amount) => {
    if (!amount && amount !== 0) return "৳0";
    return `৳${amount.toLocaleString()}`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Not set";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    } catch (error) {
      return "Invalid date";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-500 bg-green-500/10";
      case "paused":
        return "text-amber-500 bg-amber-500/10";
      case "completed":
        return "text-blue-500 bg-blue-500/10";
      default:
        return "text-gray-500 bg-gray-500/10";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "active":
        return <PlayCircle size={16} />;
      case "paused":
        return <PauseCircle size={16} />;
      case "completed":
        return <CheckCircle size={16} />;
      default:
        return null;
    }
  };

  const getGoalTypeName = (goalType) => {
    const typeMap = {
      hajj: "Hajj/Umrah",
      wedding: "Wedding",
      home: "Home",
      education: "Education",
      car: "Car",
      business: "Business",
      emergency: "Emergency Fund",
      travel: "Travel",
      other: "Other",
    };
    return typeMap[goalType] || "Goal";
  };

  const calculateRemainingMonths = (goal) => {
    if (goal.status === "completed") return 0;
    const remainingAmount = goal.targetAmount - (goal.currentSaved || 0);
    const months = Math.ceil(remainingAmount / goal.monthlyDeposit);
    return months;
  };

  const calculateEstimatedCompletion = (goal) => {
    if (goal.status === "completed") return "Completed!";
    const months = calculateRemainingMonths(goal);
    if (months <= 0) return "Almost there!";
    
    const currentDate = new Date();
    const completionDate = new Date(currentDate);
    completionDate.setMonth(currentDate.getMonth() + months);
    
    return completionDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  };

  // Fetch goals from API
  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/goals");
      if (response.data.success) {
        setGoals(response.data.data.goals || []);
      }
    } catch (error) {
      console.error("Fetch goals error:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics from API
  const fetchStatistics = async () => {
    try {
      const response = await axiosInstance.get("/goals/statistics");
      if (response.data.success) {
        setStatistics(response.data.data);
      }
    } catch (error) {
      console.error("Fetch statistics error:", error);
    }
  };

  // Create new goal
  const createGoal = async () => {
    // Validation
    if (!formData.goalName.trim()) {
      Swal.fire({
        title: "Error",
        text: "Please enter a goal name",
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

    if (!formData.monthlyDeposit || parseFloat(formData.monthlyDeposit) <= 0) {
      Swal.fire({
        title: "Error",
        text: "Please enter a valid monthly deposit amount",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!formData.targetDate) {
      Swal.fire({
        title: "Error",
        text: "Please select a target date",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        Swal.fire({
          title: "Error",
          text: "Please login again",
          icon: "error",
          confirmButtonColor: "#059669",
        });
        window.location.href = "/login";
        return;
      }

      const requestData = {
        goalType: selectedGoalType,
        goalName: formData.goalName,
        targetAmount: parseFloat(formData.targetAmount),
        monthlyDeposit: parseFloat(formData.monthlyDeposit),
        targetDate: formData.targetDate,
        description: formData.description || null,
        islamicMode: formData.islamicMode,
      };

      axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await axiosInstance.post("/goals", requestData);

      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Goal created successfully",
          icon: "success",
          confirmButtonColor: "#059669",
          timer: 2000,
          showConfirmButton: false,
        });

        setShowGoalModal(false);
        setFormData({
          goalName: "",
          targetAmount: "",
          monthlyDeposit: "",
          targetDate: "",
          description: "",
          islamicMode: true,
        });
        setSelectedGoalType("hajj");

        await fetchGoals();
        await fetchStatistics();
      }
    } catch (error) {
      console.error("Create goal error:", error);
      
      if (error.response?.status === 401) {
        Swal.fire({
          title: "Session Expired",
          text: "Please login again",
          icon: "error",
          confirmButtonColor: "#059669",
        }).then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          window.location.href = "/login";
        });
        return;
      }
      
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to create goal",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle goal status
  const toggleGoalStatus = async (goalId, currentStatus) => {
    const newStatus = currentStatus === "active" ? "paused" : "active";
    const action = newStatus === "active" ? "resume" : "pause";

    const result = await Swal.fire({
      title: `${action === "pause" ? "Pause" : "Resume"} Goal?`,
      text: `Are you sure you want to ${action} this goal?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#ef4444",
      confirmButtonText: `Yes, ${action} it`,
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.patch(`/goals/${goalId}/toggle-status`, {
          status: newStatus,
        });

        if (response.data.success) {
          Swal.fire({
            title: "Updated!",
            text: `Goal ${newStatus === "active" ? "resumed" : "paused"} successfully`,
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          });
          await fetchGoals();
          await fetchStatistics();
        }
      } catch (error) {
        console.error("Toggle status error:", error);
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Failed to update goal status",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  // Delete goal
  const deleteGoal = async (goalId) => {
    const result = await Swal.fire({
      title: "Delete Goal?",
      text: "Are you sure you want to delete this goal? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#059669",
      confirmButtonText: "Yes, delete it",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/goals/${goalId}`);

        if (response.data.success) {
          Swal.fire({
            title: "Deleted!",
            text: "Goal deleted successfully",
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          });
          await fetchGoals();
          await fetchStatistics();
        }
      } catch (error) {
        console.error("Delete goal error:", error);
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Failed to delete goal",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleViewDetails = (goal) => {
    setSelectedGoal(goal);
    setShowDetailsModal(true);
  };

  const activeGoalsCount = goals.filter((g) => g.status === "active").length;
  const totalSavedAmount = goals.reduce((sum, g) => sum + (g.currentSaved || 0), 0);
  const monthlyDepositTotal = goals.reduce((sum, g) => sum + (g.monthlyDeposit || 0), 0);
  const pausedGoalsCount = goals.filter((g) => g.status === "paused").length;

  const stats = [
    {
      icon: <Target size={20} />,
      value: activeGoalsCount.toString(),
      label: "Active Goals",
      bg: "bg-primary/10",
    },
    {
      icon: <DollarSign size={20} />,
      value: formatCurrency(totalSavedAmount),
      label: "Total Saved",
      bg: "bg-blue-500/10",
    },
    {
      icon: <Calendar size={20} />,
      value: formatCurrency(monthlyDepositTotal),
      label: "Monthly Deposit",
      bg: "bg-amber-500/10",
    },
    {
      icon: <CheckCircle size={20} />,
      value: pausedGoalsCount.toString(),
      label: "On Pause",
      bg: "bg-cyan-500/10",
    },
  ];

  useEffect(() => {
    fetchGoals();
    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading your goals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-foreground flex items-center gap-2">
            <Target size={28} /> My Savings Goals
          </h2>
          <p className="text-xs sm:text-sm text-foreground/60 mt-1">
            {activeGoalsCount} active goals · Total saved {formatCurrency(totalSavedAmount)}
          </p>
        </div>
        <button
          onClick={() => setShowGoalModal(true)}
          className="px-4 sm:px-5 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition w-full sm:w-auto flex items-center justify-center gap-2 text-sm sm:text-base"
        >
          <Plus size={18} />
          <span>New Goal</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-xl sm:rounded-2xl p-3 sm:p-4 hover:shadow-lg transition group"
          >
            <div
              className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl ${stat.bg} flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition text-primary`}
            >
              {stat.icon}
            </div>
            <div className="text-xl sm:text-2xl font-bold text-foreground">
              {stat.value}
            </div>
            <div className="text-[10px] sm:text-xs text-foreground/50 mt-0.5 sm:mt-1">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Goals Grid */}
      {goals.length === 0 ? (
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <Target size={64} className="text-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">No Goals Yet</h3>
          <p className="text-foreground/60 mb-4">
            Create your first savings goal to start your journey
          </p>
          <button
            onClick={() => setShowGoalModal(true)}
            className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
          >
            <Plus size={18} /> Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
          {goals.map((goal) => (
            <motion.div
              key={goal._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-primary/40 hover:shadow-xl transition-all"
            >
              {/* Goal Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {getGoalIcon(goal.goalType)}
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      {goal.goalName}
                    </h3>
                    <p className="text-[10px] sm:text-xs text-foreground/50">
                      {formatCurrency(goal.monthlyDeposit)} / month · 
                      {goal.status === "completed" 
                        ? " Completed!" 
                        : goal.targetDate 
                          ? ` Due ${formatDate(goal.targetDate)}` 
                          : " In progress"}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] sm:text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1 ${
                      goal.status === "active"
                        ? "bg-primary/10 text-primary"
                        : goal.status === "paused"
                        ? "bg-amber-500/10 text-amber-500"
                        : "bg-green-500/10 text-green-500"
                    }`}
                  >
                    {getStatusIcon(goal.status)}
                    {goal.status === "active" 
                      ? "Active" 
                      : goal.status === "paused" 
                        ? "Paused" 
                        : "Completed"}
                  </span>
                  {goal.status !== "completed" && (
                    <button
                      onClick={() => toggleGoalStatus(goal._id, goal.status)}
                      className="text-xs text-foreground/50 hover:text-primary transition"
                    >
                      {goal.status === "active" ? "Pause" : "Resume"}
                    </button>
                  )}
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="h-1.5 sm:h-2 bg-border rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${getGoalColor(goal.goalType)} transition-all duration-500`}
                    style={{ width: `${goal.progress || 0}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs sm:text-sm mt-1.5">
                  <span className="text-primary font-semibold">
                    {formatCurrency(goal.currentSaved || 0)}
                  </span>
                  <span className="text-foreground/50">
                    {formatCurrency(goal.targetAmount)} ({goal.progress || 0}%)
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4">
                <Link
                  href={`/dashboard/submit?goalId=${goal._id}`}
                  className="flex-1 py-2 text-center rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs sm:text-sm font-semibold hover:opacity-90 transition px-3"
                >
                  + Deposit
                </Link>
                <button
                  onClick={() => handleViewDetails(goal)}
                  className="flex-1 py-2 text-center rounded-lg border border-border text-foreground text-xs sm:text-sm font-semibold hover:border-primary hover:text-primary transition px-3 flex items-center justify-center gap-1"
                >
                  <Eye size={14} /> Details
                </button>
                {goal.currentSaved === 0 && goal.status !== "completed" && (
                  <button
                    onClick={() => deleteGoal(goal._id)}
                    className="py-2 px-3 rounded-lg border border-red-500/30 text-red-500 text-xs sm:text-sm font-semibold hover:bg-red-500/10 transition flex items-center justify-center gap-1"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Info Note */}
      {goals.length > 0 && (
        <div className="mt-6 p-3 sm:p-4 bg-primary/5 border border-primary/15 rounded-xl">
          <div className="flex gap-3">
            <Info size={16} className="text-primary shrink-0 mt-0.5" />
            <p className="text-[11px] sm:text-xs text-foreground/60 leading-relaxed">
              <span className="font-semibold">Pro Tip:</span> Setting up
              auto-save for your goals helps you stay consistent and reach your
              targets faster. You can pause any goal anytime from settings.
            </p>
          </div>
        </div>
      )}

      {/* Goal Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedGoal && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => setShowDetailsModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-card border border-border rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-card border-b border-border p-4 sm:p-6 rounded-t-2xl z-10">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 sm:gap-3 mb-2">
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        {getGoalIcon(selectedGoal.goalType)}
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold text-foreground">
                          {selectedGoal.goalName}
                        </h3>
                        <p className="text-sm text-foreground/60">
                          {getGoalTypeName(selectedGoal.goalType)}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2 flex-wrap">
                      <span
                        className={`inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                          selectedGoal.status
                        )}`}
                      >
                        {getStatusIcon(selectedGoal.status)}
                        {selectedGoal.status === "active"
                          ? "Active"
                          : selectedGoal.status === "paused"
                          ? "Paused"
                          : "Completed"}
                      </span>
                      {selectedGoal.islamicMode && (
                        <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-500">
                          <Star size={12} /> Riba-free
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-5 sm:space-y-6">
                {/* Progress Section */}
                <div className="bg-primary/5 rounded-xl p-4 sm:p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-foreground/70">
                      Overall Progress
                    </span>
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      {selectedGoal.progress || 0}%
                    </span>
                  </div>
                  <div className="h-2 sm:h-3 bg-border rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getGoalColor(selectedGoal.goalType)} transition-all duration-500`}
                      style={{ width: `${selectedGoal.progress || 0}%` }}
                    />
                  </div>
                  <div className="flex justify-between items-center text-xs sm:text-sm">
                    <span className="text-foreground/60">Current Saved</span>
                    <span className="font-semibold text-foreground">
                      {formatCurrency(selectedGoal.currentSaved || 0)} / {formatCurrency(selectedGoal.targetAmount)}
                    </span>
                  </div>
                </div>

                {/* Key Information Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Wallet size={18} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        Monthly Deposit
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">
                      {formatCurrency(selectedGoal.monthlyDeposit)}
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">per month</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Target size={18} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        Target Amount
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl font-bold text-foreground">
                      {formatCurrency(selectedGoal.targetAmount)}
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">total goal</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={18} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        Target Date
                      </span>
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-foreground">
                      {formatDate(selectedGoal.targetDate)}
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">expected completion</p>
                  </div>

                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={18} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        Est. Completion
                      </span>
                    </div>
                    <div className="text-base sm:text-lg font-bold text-foreground">
                      {calculateEstimatedCompletion(selectedGoal)}
                    </div>
                    <p className="text-xs text-foreground/50 mt-1">
                      {calculateRemainingMonths(selectedGoal)} months remaining
                    </p>
                  </div>
                </div>

                {/* Description */}
                {selectedGoal.description && (
                  <div className="bg-card border border-border rounded-xl p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Info size={18} className="text-primary" />
                      <span className="text-xs font-semibold text-foreground/60 uppercase tracking-wider">
                        Description
                      </span>
                    </div>
                    <p className="text-sm sm:text-base text-foreground/80 leading-relaxed">
                      {selectedGoal.description}
                    </p>
                  </div>
                )}

                {/* Timeline Info */}
                <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={18} className="text-primary" />
                    <span className="text-sm font-semibold text-foreground">Journey Timeline</span>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Started:</span>
                      <span className="font-medium text-foreground">
                        {new Date(selectedGoal.createdAt).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {selectedGoal.estimatedCompletionDate && (
                      <div className="flex justify-between">
                        <span className="text-foreground/60">Estimated Completion:</span>
                        <span className="font-medium text-foreground">
                          {new Date(selectedGoal.estimatedCompletionDate).toLocaleDateString("en-US", {
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-foreground/60">Duration:</span>
                      <span className="font-medium text-foreground">
                        {selectedGoal.durationInMonths} months
                      </span>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-3 text-center">
                    <Target size={24} className="mx-auto mb-1 text-green-500" />
                    <div className="text-xs text-foreground/60">Monthly Progress</div>
                    <div className="text-sm font-bold text-green-500">
                      {Math.round((selectedGoal.monthlyDeposit / selectedGoal.targetAmount) * 100)}% / month
                    </div>
                  </div>
                  <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-3 text-center">
                    <Clock size={24} className="mx-auto mb-1 text-blue-500" />
                    <div className="text-xs text-foreground/60">To Reach Target</div>
                    <div className="text-sm font-bold text-blue-500">
                      {calculateRemainingMonths(selectedGoal)} months
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4 sm:p-6 rounded-b-2xl z-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl border border-border text-foreground font-semibold hover:bg-primary/5 hover:border-primary transition text-sm sm:text-base"
                  >
                    Close
                  </button>
                  <Link
                    href={`/dashboard/submit?goalId=${selectedGoal._id}`}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition text-center text-sm sm:text-base"
                  >
                    + Make a Deposit
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Goal Modal */}
      <AnimatePresence>
        {showGoalModal && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto"
            onClick={() => !submitting && setShowGoalModal(false)}
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
                    <h3 className="text-lg sm:text-xl font-bold text-foreground flex items-center gap-2">
                      <Target size={20} /> Create New Goal
                    </h3>
                    <p className="text-xs sm:text-sm text-foreground/60 mt-1">
                      Set a new savings target to stay motivated
                    </p>
                  </div>
                  <button
                    onClick={() => !submitting && setShowGoalModal(false)}
                    disabled={submitting}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 hover:border-primary transition shrink-0 disabled:opacity-50"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-4 sm:p-6 space-y-4 sm:space-y-5">
                {/* Goal Type Selection */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-2 sm:mb-3">
                    Goal Type
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-3 gap-2">
                    {goalTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => !submitting && setSelectedGoalType(type.value)}
                        disabled={submitting}
                        className={`p-2 sm:p-3 rounded-xl border-2 text-center transition-all ${
                          selectedGoalType === type.value
                            ? "border-primary bg-primary/5 shadow-md"
                            : "border-border hover:border-primary/50 hover:bg-primary/5"
                        } disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        <div className="flex justify-center mb-1 text-primary">
                          {type.icon}
                        </div>
                        <span className="text-[10px] sm:text-xs font-semibold">
                          {type.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Goal Name */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Goal Name
                  </label>
                  <input
                    type="text"
                    name="goalName"
                    value={formData.goalName}
                    onChange={handleInputChange}
                    disabled={submitting}
                    placeholder="e.g., My Hajj Fund 2027"
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                {/* Target Amount & Monthly Deposit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      <Target size={14} className="inline mr-1" /> Target Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">
                        ৳
                      </span>
                      <input
                        type="number"
                        name="targetAmount"
                        value={formData.targetAmount}
                        onChange={handleInputChange}
                        disabled={submitting}
                        placeholder="500000"
                        className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      <Wallet size={14} className="inline mr-1" /> Monthly Deposit
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50">
                        ৳
                      </span>
                      <input
                        type="number"
                        name="monthlyDeposit"
                        value={formData.monthlyDeposit}
                        onChange={handleInputChange}
                        disabled={submitting}
                        placeholder="10000"
                        className="w-full p-2.5 sm:p-3 pl-8 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                      />
                    </div>
                  </div>
                </div>

                {/* Target Date */}
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    <Calendar size={14} className="inline mr-1" /> Target Date
                  </label>
                  <input
                    type="month"
                    name="targetDate"
                    value={formData.targetDate}
                    onChange={handleInputChange}
                    disabled={submitting}
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                {/* Description */}
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
                    placeholder="Write something about this goal..."
                    className="w-full p-2.5 sm:p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none text-sm sm:text-base disabled:opacity-50"
                  />
                </div>

                {/* Islamic Mode Toggle */}
                <div className="flex items-center justify-between p-3 sm:p-4 bg-primary/5 border border-primary/15 rounded-xl">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Star size={24} className="text-primary" />
                    <div>
                      <div className="font-semibold text-foreground text-sm sm:text-base">
                        Riba-free Savings Mode
                      </div>
                      <p className="text-[10px] sm:text-xs text-foreground/50">
                        Interest-free (halal) savings
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        islamicMode: !prev.islamicMode,
                      }))
                    }
                    disabled={submitting}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                      formData.islamicMode ? "bg-primary" : "bg-border"
                    } disabled:opacity-50`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        formData.islamicMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-card border-t border-border p-4 sm:p-6 rounded-b-2xl z-10">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setShowGoalModal(false)}
                    disabled={submitting}
                    className="flex-1 py-2.5 sm:py-3 rounded-xl border border-border text-foreground font-semibold hover:border-red-500 hover:text-red-500 transition text-sm sm:text-base order-2 sm:order-1 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createGoal}
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
                        <CheckCircle size={16} />
                        Create Goal
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

export default MyGoalsPage;