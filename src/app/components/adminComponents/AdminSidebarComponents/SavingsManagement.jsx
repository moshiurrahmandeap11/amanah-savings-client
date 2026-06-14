"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Target, Circle, Lock, Loader2 } from "lucide-react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://server-amanah-savings.onrender.com/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const SavingsManagement = () => {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [stats, setStats] = useState([]);
  const [topGoals, setTopGoals] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSavings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/admin/savings`, { headers: getAuthHeaders() });
      if (res.data.success) {
        const data = res.data.data;
        const s = data.stats || {};
        setStats([
          {
            icon: "💰",
            value: s.totalSavingsPool || "৳০",
            label: "Total Savings Pool",
            trend: "+12%",
            trendUp: true,
            bg: "bg-primary/10",
            iconBg: "bg-primary/10",
          },
          {
            icon: "🎯",
            value: String(s.activeGoals || 0),
            label: "Active Goals",
            trend: "+5%",
            trendUp: true,
            bg: "bg-cyan-500/10",
            iconBg: "bg-cyan-500/10",
          },
          {
            icon: "⭕",
            value: String(s.activeCircles || 0),
            label: "Active Circles",
            trend: "+18%",
            trendUp: true,
            bg: "bg-amber-500/10",
            iconBg: "bg-amber-500/10",
          },
          {
            icon: "🔒",
            value: `${s.retentionRate || 0}%`,
            label: "Retention Rate",
            trend: "92%",
            trendUp: true,
            bg: "bg-red-500/10",
            iconBg: "bg-red-500/10",
          },
        ]);
        setTopGoals(data.goalsByType || []);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Failed to load savings data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSavings();
  }, [fetchSavings]);

  const showToastMessage = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-5">
        💰 Savings Management
      </h2>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => showToastMessage(`📊 Viewing ${stat.label} details`)}
          >
            <div className="flex justify-between items-start">
              <div
                className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center text-xl`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}
              >
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">
              {stat.value}
            </div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
            <div className="h-1 bg-border rounded-full mt-3 overflow-hidden">
              <div className="h-full w-[78%] bg-linear-to-r from-primary to-primary-light rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Savings Goals Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="font-bold text-foreground">📋 Top Savings Goals</div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-125">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Goal Type
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Members
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Total Saved
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Avg Monthly
                </th>
              </tr>
            </thead>
            <tbody>
              {topGoals.map((goal, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition cursor-pointer"
                  onClick={() =>
                    showToastMessage(`📊 Viewing details for ${goal.type}`)
                  }
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full bg-linear-to-r ${goal.color || "from-primary to-primary-light"}`}
                      />
                      <span className="font-semibold text-sm text-foreground">
                        {goal.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {goal.members}
                  </td>
                  <td className="px-4 py-3 text-sm font-semibold text-primary">
                    {goal.totalSaved}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {goal.avgMonthly}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap"
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
};

export default SavingsManagement;
