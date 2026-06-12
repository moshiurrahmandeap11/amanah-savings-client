"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Wallet,
  Calendar,
  ArrowLeft,
  Target,
  Lock,
  Globe,
  Crown,
  Star,
  Send,
  Info,
  CircleDot,
  Loader2,
  Copy,
  Check,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

import Swal from "sweetalert2";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

const MyCircleDetailsPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [circle, setCircle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  const fetchCircleDetails = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`/circles/${id}`);
      if (response.data.success) {
        console.log("Fetched circle:", response.data.data); // Debug log
        setCircle(response.data.data);
      }
    } catch (error) {
      console.error("Fetch circle details error:", error);
      if (error.response?.status === 404) {
        Swal.fire({
          title: "Not Found",
          text: "Circle not found",
          icon: "error",
          confirmButtonColor: "#059669",
        }).then(() => {
          router.push("/dashboard/circles");
        });
      } else if (error.response?.status === 401) {
        router.push("/login");
      } else {
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Failed to fetch circle details",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const joinCircle = async () => {
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
        const response = await axiosInstance.post(`/circles/${id}/join`);
        
        if (response.data.success) {
          Swal.fire({
            title: "Joined!",
            text: "You have successfully joined the circle",
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          });
          
          await fetchCircleDetails();
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

  const leaveCircle = async () => {
    const result = await Swal.fire({
      title: "Leave Circle?",
      text: `Are you sure you want to leave "${circle?.name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#059669",
      confirmButtonText: "Yes, leave",
    });

    if (result.isConfirmed) {
      try {
        const response = await axiosInstance.delete(`/circles/${id}/leave`);
        
        if (response.data.success) {
          Swal.fire({
            title: "Left!",
            text: "You have left the circle",
            icon: "success",
            confirmButtonColor: "#059669",
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            router.push("/dashboard/circles");
          });
        }
      } catch (error) {
        console.error("Leave circle error:", error);
        Swal.fire({
          title: "Error",
          text: error.response?.data?.message || "Failed to leave circle",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const copyInviteLink = () => {
    const inviteLink = `${window.location.origin}/dashboard/circles/join/${id}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    Swal.fire({
      title: "Copied!",
      text: "Invite link copied to clipboard",
      icon: "success",
      confirmButtonColor: "#059669",
      timer: 1500,
      showConfirmButton: false,
    });
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

  useEffect(() => {
    if (id) {
      fetchCircleDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading circle details...</p>
        </div>
      </div>
    );
  }

  if (!circle) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-bold text-foreground mb-2">Circle Not Found</h3>
          <p className="text-foreground/60 mb-4">
            The circle you're looking for doesn't exist or you don't have access
          </p>
          <Link
            href="/dashboard/circles"
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg hover:opacity-90 transition"
          >
            <ArrowLeft size={18} />
            Back to Circles
          </Link>
        </div>
      </div>
    );
  }

  // Safe data extraction based on your JSON structure
  const circleName = circle.name || "Unnamed Circle";
  const circlePurpose = circle.purpose || "general";
  const circleStatus = circle.status || "active";
  const circleType = circle.circleType || "public";
  const circleMembers = circle.currentMembers || circle.members || 0;
  const circleMaxMembers = circle.maxMembers || 0;
  const circleMinDeposit = circle.minDeposit || 0;
  const circleTargetAmount = circle.targetAmount || 0;
  const circleTotalPoolValue = circle.totalPoolValue || 0;
  const circleDescription = circle.description || "";
  const circleNextPayout = circle.nextPayout || "Not scheduled";
  const circleCreatedAt = circle.createdAt || new Date().toISOString();
  const isMember = circle.isMember || false;
  
  const progressPercentage = circleTargetAmount > 0 
    ? Math.round((circleTotalPoolValue / circleTargetAmount) * 100) 
    : 0;

  // Get emoji and color based on purpose
  const getCircleEmoji = (purpose) => {
    const emojiMap = {
      wedding: "💍",
      hajj: "🕌",
      education: "🎓",
      home: "🏠",
      business: "💼",
      emergency: "🆘",
      travel: "✈️",
      eid: "🌙",
      general: "🤝",
    };
    return emojiMap[purpose] || "🤝";
  };

  const getCircleColor = (purpose) => {
    const colorMap = {
      wedding: "from-pink-500 to-rose-500",
      hajj: "from-amber-500 to-orange-500",
      education: "from-purple-500 to-indigo-500",
      home: "from-emerald-500 to-teal-500",
      business: "from-violet-500 to-purple-500",
      emergency: "from-red-500 to-rose-500",
      travel: "from-sky-500 to-blue-500",
      eid: "from-green-500 to-emerald-500",
      general: "from-primary to-primary-light",
    };
    return colorMap[purpose] || "from-primary to-primary-light";
  };

  const circleEmoji = getCircleEmoji(circlePurpose);
  const circleColor = getCircleColor(circlePurpose);

  return (
    <div className="w-full max-w-full">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-foreground/60 hover:text-primary transition mb-4 group"
      >
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition" />
        <span className="text-sm">Back to Circles</span>
      </button>

      {/* Header Section */}
      <div className="bg-card border border-border rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-r ${circleColor} flex items-center justify-center text-4xl sm:text-5xl`}
            >
              {circleEmoji}
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">
                {circleName}
              </h1>
              <div className="flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusColor(
                    circleStatus
                  )}`}
                >
                  <CircleDot size={14} />
                  {circleStatus === "active" ? "Active" : circleStatus === "paused" ? "Paused" : "Completed"}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                  {circleType === "private" ? (
                    <><Lock size={14} /> Private Circle</>
                  ) : (
                    <><Globe size={14} /> Public Circle</>
                  )}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full bg-primary/5 text-foreground/70 capitalize">
                  {circlePurpose}
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            {isMember ? (
              <>
                <button
                  onClick={copyInviteLink}
                  className="px-4 py-2 rounded-lg border border-border text-foreground hover:border-primary hover:text-primary transition flex items-center gap-2"
                >
                  {copied ? <Check size={16} /> : <Copy size={16} />}
                  {copied ? "Copied!" : "Invite"}
                </button>
                <button
                  onClick={leaveCircle}
                  className="px-4 py-2 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition"
                >
                  Leave Circle
                </button>
              </>
            ) : (
              <button
                onClick={joinCircle}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition"
              >
                Join Circle
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">{circleMembers}</div>
              <div className="text-xs text-foreground/50">Total Members</div>
            </div>
          </div>
          <div className="text-xs text-foreground/60">
            Max {circleMaxMembers} members
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Wallet size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                ৳{circleTotalPoolValue.toLocaleString()}
              </div>
              <div className="text-xs text-foreground/50">Total Pool</div>
            </div>
          </div>
          <div className="text-xs text-foreground/60">
            Target: ৳{circleTargetAmount.toLocaleString()}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Target size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground">
                ৳{circleMinDeposit.toLocaleString()}
              </div>
              <div className="text-xs text-foreground/50">Min Deposit</div>
            </div>
          </div>
          <div className="text-xs text-foreground/60">
            Per month
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-xl p-4"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <Calendar size={18} className="text-primary" />
            </div>
            <div>
              <div className="text-2xl font-bold text-foreground text-sm sm:text-base">
                {circleNextPayout}
              </div>
              <div className="text-xs text-foreground/50">Next Payout</div>
            </div>
          </div>
          <div className="text-xs text-foreground/60">
            Monthly rotation
          </div>
        </motion.div>
      </div>

      {/* Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-bold text-foreground mb-1">Pool Progress</h3>
              <p className="text-sm text-foreground/60">
                ৳{circleTotalPoolValue.toLocaleString()} collected out of ৳{circleTargetAmount.toLocaleString()}
              </p>
            </div>
            <div className="text-2xl font-bold text-primary">
              {progressPercentage}%
            </div>
          </div>
          <div className="h-3 bg-border rounded-full overflow-hidden mb-4">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-foreground/60">Monthly Collection:</span>
            <span className="font-semibold text-foreground">
              ৳{(circleMinDeposit * circleMembers).toLocaleString()} / month
            </span>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 border border-primary/15 rounded-xl p-6">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={18} className="text-primary" />
            <h3 className="font-bold text-foreground">Quick Stats</h3>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Created:</span>
              <span className="font-medium text-foreground">
                {new Date(circleCreatedAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Total Pool:</span>
              <span className="font-medium text-foreground">৳{circleTotalPoolValue.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Members:</span>
              <span className="font-medium text-foreground">{circleMembers} / {circleMaxMembers}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-foreground/60">Monthly per Member:</span>
              <span className="font-medium text-foreground">৳{circleMinDeposit.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Description & Members */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Description */}
        {circleDescription && (
          <div className="bg-card border border-border rounded-xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Info size={18} className="text-primary" />
              <h3 className="font-bold text-foreground">About This Circle</h3>
            </div>
            <p className="text-foreground/80 leading-relaxed">
              {circleDescription}
            </p>
          </div>
        )}

        {/* Members List - COMPLETELY FIXED */}
        <div className="bg-card border border-border rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-primary" />
              <h3 className="font-bold text-foreground">Members</h3>
            </div>
            <span className="text-sm text-foreground/50">{circleMembers} members</span>
          </div>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {circle.membersList && circle.membersList.length > 0 ? (
              circle.membersList.map((member, idx) => {
                // SAFELY extract member information - NO OBJECT RENDERING
                let memberName = `Member ${idx + 1}`;
                let memberEmail = "";
                let memberRole = "member";
                let memberDeposited = 0;
                
                // Check if member is an object and extract data safely
                if (member && typeof member === 'object') {
                  memberRole = member.role || "member";
                  memberDeposited = member.totalDeposited || 0;
                  
                  // Handle userId which might be an object or string
                  if (member.userId) {
                    if (typeof member.userId === 'object' && member.userId !== null) {
                      memberName = member.userId.name || member.userId.fullName || member.userId.username || `Member ${idx + 1}`;
                      memberEmail = member.userId.email || "";
                    } else if (typeof member.userId === 'string') {
                      memberName = `Member ${idx + 1}`;
                    }
                  }
                }
                
                // Ensure we're rendering strings and numbers only
                return (
                  <div key={idx} className="flex items-center justify-between p-3 bg-background rounded-lg">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {memberRole === "admin" ? (
                        <Crown size={16} className="text-amber-500 shrink-0" />
                      ) : (
                        <Star size={16} className="text-primary/50 shrink-0" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-foreground truncate">
                          {String(memberName)}
                        </p>
                        {memberEmail && (
                          <p className="text-xs text-foreground/40 truncate">
                            {String(memberEmail)}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {memberRole === "admin" && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-500 whitespace-nowrap">
                          Admin
                        </span>
                      )}
                      <span className="text-xs text-foreground/50 whitespace-nowrap">
                        ৳{Number(memberDeposited).toLocaleString()}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-8 text-foreground/50">
                No members found
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      {isMember && (
        <div className="mt-6 flex flex-col sm:flex-row gap-4">
          <button
            onClick={() => router.push(`/dashboard/submit?circleId=${circle._id}`)}
            className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
          >
            <Send size={18} />
            Make a Deposit
          </button>
        </div>
      )}

      {/* Info Note */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/15 rounded-xl">
        <div className="flex gap-3">
          <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
          <p className="text-xs text-foreground/60 leading-relaxed">
            💡 <span className="font-semibold">How it works:</span> Each month,
            members contribute the minimum deposit amount. One member receives
            the total collected amount on a rotational basis. You'll be notified
            when it's your turn for payout.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyCircleDetailsPage;