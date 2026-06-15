"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Copy, Check, Share2, Users, Gift, TrendingUp, Loader2, X, Trophy, Medal } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const ReferralPage = () => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [leaderboardLoading, setLeaderboardLoading] = useState(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState(false);
  const [leaderboard, setLeaderboard] = useState([]);
  const [leaderboardStats, setLeaderboardStats] = useState({ total: 0 });
  const [referralData, setReferralData] = useState({
    referralCode: "",
    referralLink: "",
    stats: {
      totalReferrals: 0,
      activeReferrals: 0,
      pendingReferrals: 0,
      totalBonusEarned: 0,
      thisMonthBonus: 0,
    },
  });
  const [history, setHistory] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Fetch referral stats
  const fetchReferralStats = async () => {
    try {
      const response = await axiosInstance.get("/referrals/stats");
      if (response.data.success) {
        setReferralData(response.data.data);
      }
    } catch (error) {
      console.error("Fetch stats error:", error);
    }
  };

  // Fetch referral history
  const fetchReferralHistory = async (page = 1) => {
    try {
      const response = await axiosInstance.get(`/referrals/history?page=${page}&limit=10`);
      if (response.data.success) {
        setHistory(response.data.data.history);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error("Fetch history error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch leaderboard
  const fetchLeaderboard = async () => {
    setLeaderboardLoading(true);
    try {
      const response = await axiosInstance.get("/referrals/leaderboard?limit=50");
      if (response.data.success) {
        setLeaderboard(response.data.data.leaderboard);
        setLeaderboardStats({ total: response.data.data.total });
      }
    } catch (error) {
      console.error("Fetch leaderboard error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to load leaderboard",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setLeaderboardLoading(false);
    }
  };

  const openLeaderboardModal = async () => {
    setShowLeaderboardModal(true);
    document.body.style.overflow = "hidden";
    await fetchLeaderboard();
  };

  const closeLeaderboardModal = () => {
    setShowLeaderboardModal(false);
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    fetchReferralStats();
    fetchReferralHistory();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralData.referralLink);
    setCopied(true);
    Swal.fire({
      title: "Copied!",
      text: "Referral link copied to clipboard",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const message = `আমি Amanah Savings-এ সঞ্চয় করছি! তুমিও যোগ দাও: ${referralData.referralLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(referralData.referralLink)}`,
      "_blank",
    );
  };

  const shareOnSMS = () => {
    const message = `Amanah Savings-এ আমার সাথে সঞ্চয় শুরু করো: ${referralData.referralLink}`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  const getRankIcon = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `${rank}`;
  };

  const stats = [
    { value: referralData.stats.totalReferrals, label: "Friends Referred" },
    { value: `৳${referralData.stats.totalBonusEarned.toLocaleString()}`, label: "Total Bonus Earned" },
    { value: referralData.stats.activeReferrals, label: "Active Referrals" },
    { value: `৳${referralData.stats.thisMonthBonus.toLocaleString()}`, label: "This Month" },
  ];

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5">
        🤝 Referral Program
      </h2>

      {/* Referral Card */}
      <div className="bg-linear-to-r from-emerald-900 to-cyan-900 rounded-xl p-6 mb-6 text-white">
        <div className="text-xl font-bold mb-1">Invite Friends, Get ৳500!</div>
        <div className="text-sm text-white/80 mb-4">
          Both you and your friend get ৳500 bonus when they join and make their
          first deposit of at least ৳500.
        </div>

        <div className="flex items-center justify-between bg-white/15 rounded-lg p-3 mb-4">
          <span className="font-mono text-sm flex-1 truncate">
            {referralData.referralLink?.replace("https://", "") || "Loading..."}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={shareOnWhatsApp}
            className="flex-1 py-2.5 rounded-lg bg-white/15 text-white text-sm font-semibold hover:bg-white/25 transition"
          >
            📱 WhatsApp
          </button>
          <button
            onClick={shareOnFacebook}
            className="flex-1 py-2.5 rounded-lg bg-white/15 text-white text-sm font-semibold hover:bg-white/25 transition"
          >
            📘 Facebook
          </button>
          <button
            onClick={shareOnSMS}
            className="flex-1 py-2.5 rounded-lg bg-white/15 text-white text-sm font-semibold hover:bg-white/25 transition"
          >
            💌 SMS
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-xs text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral History Card */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="font-bold text-foreground mb-4 flex items-center gap-2">
          📋 Referral History
        </div>
        {history.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-2">🤝</div>
            <p className="text-foreground/50">No referrals yet</p>
            <p className="text-xs text-foreground/40 mt-1">
              Share your referral link to start earning bonuses!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {history.map((item, idx) => (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-3 pb-3 border-b border-border last:border-0"
              >
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                    item.status === "bonus" ? "bg-primary/10" : "bg-amber-500/10"
                  }`}
                >
                  {item.status === "bonus" ? "👤" : "⏳"}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground">
                    {item.name}
                  </div>
                  <div className="text-xs text-foreground/50">{item.date}</div>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      item.status === "bonus"
                        ? "bg-primary/10 text-primary"
                        : "bg-amber-500/10 text-amber-500"
                    }`}
                  >
                    {item.badge}
                  </span>
                </div>
                <div
                  className={`font-bold text-sm ${
                    item.status === "bonus" ? "text-primary" : "text-foreground/50"
                  }`}
                >
                  {item.amount}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4 pt-3 border-t border-border">
            <button
              onClick={() => fetchReferralHistory(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              className="px-3 py-1 rounded-lg border border-border text-foreground/70 text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
            >
              Previous
            </button>
            <span className="px-3 py-1 text-xs text-foreground">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
            <button
              onClick={() => fetchReferralHistory(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              className="px-3 py-1 rounded-lg border border-border text-foreground/70 text-xs disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {/* Info Note */}
      <div className="mt-5 p-4 bg-primary/5 border border-primary/15 rounded-xl">
        <div className="flex gap-2">
          <Gift size={18} className="text-primary shrink-0 mt-0.5" />
          <div className="text-sm text-foreground/60">
            <strong className="text-foreground">How it works:</strong> Share
            your unique referral link with friends. When they sign up and make
            their first deposit of at least ৳500, both of you get ৳500 bonus
            credited to your savings account. No limit on referrals!
          </div>
        </div>
      </div>

      {/* Referral Leaderboard Link */}
      <div className="mt-4 p-4 bg-card border border-border rounded-xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <TrendingUp size={20} className="text-primary" />
            <div>
              <div className="font-semibold text-foreground text-sm">Top Referrers</div>
              <div className="text-xs text-foreground/50">See who's leading the referral leaderboard</div>
            </div>
          </div>
          <button
            onClick={openLeaderboardModal}
            className="px-4 py-2 rounded-lg bg-primary/10 text-primary text-sm font-semibold hover:bg-primary/20 transition"
          >
            View Leaderboard →
          </button>
        </div>
      </div>

      {/* Leaderboard Modal */}
      <AnimatePresence>
        {showLeaderboardModal && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={closeLeaderboardModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-card border-b border-border p-5 flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                    🏆 Top Referrers Leaderboard
                  </h3>
                  <p className="text-sm text-foreground/50">
                    Top {leaderboardStats.total} referrers based on total referrals
                  </p>
                </div>
                <button
                  onClick={closeLeaderboardModal}
                  className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="overflow-y-auto max-h-[calc(85vh-120px)]">
                {leaderboardLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-4xl mb-3">🏆</div>
                    <p className="text-foreground/50">No referrers found yet</p>
                    <p className="text-xs text-foreground/40 mt-1">Be the first to refer friends!</p>
                  </div>
                ) : (
                  <div className="divide-y divide-border">
                    {/* Header Row */}
                    <div className="grid grid-cols-12 gap-2 px-5 py-3 bg-background sticky top-0 font-semibold text-xs text-foreground/60">
                      <div className="col-span-2">Rank</div>
                      <div className="col-span-5">Referrer</div>
                      <div className="col-span-2 text-center">Referrals</div>
                      <div className="col-span-3 text-right">Bonus Earned</div>
                    </div>

                    {/* Leaderboard Rows */}
                    {leaderboard.map((user, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.03 }}
                        className="grid grid-cols-12 gap-2 px-5 py-3 hover:bg-primary/5 transition"
                      >
                        <div className="col-span-2 flex items-center gap-1">
                          <span className="text-xl">{getRankIcon(user.rank)}</span>
                          <span className="text-sm font-semibold text-foreground">#{user.rank}</span>
                        </div>
                        <div className="col-span-5 flex items-center gap-2">
                          {user.profilePicture ? (
                            <img
                              src={user.profilePicture}
                              alt={user.name}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white text-[10px] font-bold">
                              {user.name?.charAt(0) || "U"}
                            </div>
                          )}
                          <span className="text-sm font-medium text-foreground truncate">
                            {user.name}
                          </span>
                        </div>
                        <div className="col-span-2 text-center">
                          <span className="text-sm font-bold text-primary">
                            {user.referrals}
                          </span>
                          <span className="text-xs text-foreground/50 ml-1">
                            {user.referrals === 1 ? "referral" : "referrals"}
                          </span>
                        </div>
                        <div className="col-span-3 text-right">
                          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
                            ৳{user.bonusEarned.toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              <div className="sticky bottom-0 bg-card border-t border-border p-4 text-center">
                <p className="text-xs text-foreground/40">
                  Leaderboard updates daily based on total referrals
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReferralPage;