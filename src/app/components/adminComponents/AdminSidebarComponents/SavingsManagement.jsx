"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const formatCurrency = (amount) => {
  if (!amount && amount !== 0) return "৳০";
  if (amount >= 10000000) return `৳${(amount / 10000000).toFixed(1)} কোটি`;
  if (amount >= 100000) return `৳${(amount / 100000).toFixed(1)} লাখ`;
  if (amount >= 1000) return `৳${(amount / 1000).toFixed(1)}K`;
  return `৳${amount.toLocaleString("en-BD")}`;
};

const GOAL_COLORS = [
  "bg-emerald-500",
  "bg-blue-500",
  "bg-amber-500",
  "bg-purple-500",
  "bg-rose-500",
  "bg-cyan-500",
];

// Translations
const translations = {
  en: {
    savingsManagement: "💰 Savings Management",
    totalSavingsPool: "Total Savings Pool",
    activeGoals: "Active Goals",
    activeCircles: "Active Circles",
    retentionRate: "Retention Rate",
    topSavingsGoals: "📋 Top Savings Goals",
    goalType: "Goal Type",
    members: "Members",
    totalSaved: "Total Saved",
    avgMonthly: "Avg Monthly",
    share: "Share",
    noGoalData: "No goal data found",
    viewingDetails: "📊 Viewing",
  },
  bn: {
    savingsManagement: "💰 সঞ্চয় ম্যানেজমেন্ট",
    totalSavingsPool: "মোট সঞ্চয় পুল",
    activeGoals: "সক্রিয় গোল",
    activeCircles: "সক্রিয় সার্কেল",
    retentionRate: "রিটেনশন রেট",
    topSavingsGoals: "📋 শীর্ষ সঞ্চয় গোল",
    goalType: "গোল টাইপ",
    members: "মেম্বার",
    totalSaved: "মোট সঞ্চয়",
    avgMonthly: "গড় মাসিক",
    share: "শেয়ার",
    noGoalData: "কোনো গোল ডেটা পাওয়া যায়নি",
    viewingDetails: "📊 দেখা হচ্ছে",
  }
};

const SavingsManagement = () => {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [stats, setStats] = useState([]);
  const [topGoals, setTopGoals] = useState([]);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("bn");

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "bn";
    setLang(savedLang);
  }, []);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const fetchSavings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/savings", {
        headers: getAuthHeaders(),
      });
      if (res.data.success) {
        const data = res.data.data;
        const s = data.stats || {};

        setStats([
          {
            icon: "💰",
            value: formatCurrency(s.totalSavingsPool),
            label: t('totalSavingsPool'),
            trend: "+12%",
            trendUp: true,
            bg: "bg-primary/10",
          },
          {
            icon: "🎯",
            value: String(s.activeGoals ?? 0),
            label: t('activeGoals'),
            trend: "+5%",
            trendUp: true,
            bg: "bg-cyan-500/10",
          },
          {
            icon: "⭕",
            value: String(s.activeCircles ?? 0),
            label: t('activeCircles'),
            trend: "+18%",
            trendUp: true,
            bg: "bg-amber-500/10",
          },
          {
            icon: "🔒",
            value: `${s.retentionRate ?? 0}%`,
            label: t('retentionRate'),
            trend: `${s.retentionRate ?? 0}%`,
            trendUp: (s.retentionRate ?? 0) >= 70,
            bg: "bg-red-500/10",
          },
        ]);

        const goals = (data.goalsByType || []).map((g, idx) => ({
          type: g.name || "Other",
          members: g.count ?? 0,
          totalSaved: formatCurrency(g.totalCurrent),
          avgMonthly: formatCurrency(g.avgMonthly),
          percentage: g.percentage ?? 0,
          color: GOAL_COLORS[idx % GOAL_COLORS.length],
        }));
        setTopGoals(goals);
      }
    } catch (err) {
      showToastMessage(
        err.response?.data?.message || t('noGoalData')
      );
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    fetchSavings();
  }, [fetchSavings]);

  const showToastMessage = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-5">
        {t('savingsManagement')}
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:shadow-lg transition"
            onClick={() => showToastMessage(`${t('viewingDetails')} ${stat.label}`)}
          >
            <div className="flex justify-between items-start">
              <div
                className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center text-xl`}
              >
                {stat.icon}
              </div>
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  stat.trendUp
                    ? "bg-green-500/10 text-green-500"
                    : "bg-red-500/10 text-red-500"
                }`}
              >
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">
              {stat.value}
            </div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
            <div className="h-1 bg-border rounded-full mt-3 overflow-hidden">
              <div className="h-full w-[78%] bg-primary rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Top Savings Goals Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="font-bold text-foreground">{t('topSavingsGoals')}</div>
        </div>

        {topGoals.length === 0 ? (
          <div className="py-12 text-center text-foreground/40 text-sm">
            {t('noGoalData')}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-background">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                    {t('goalType')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                    {t('members')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                    {t('totalSaved')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                    {t('avgMonthly')}
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                    {t('share')}
                  </th>
                </tr>
              </thead>
              <tbody>
                {topGoals.map((goal, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border last:border-0 hover:bg-primary/5 transition cursor-pointer"
                    onClick={() =>
                      showToastMessage(`${t('viewingDetails')} ${goal.type}`)
                    }
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2.5 h-2.5 rounded-full ${goal.color}`}
                        />
                        <span className="font-semibold text-sm text-foreground capitalize">
                          {goal.type}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {goal.members.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-sm font-semibold text-primary">
                      {goal.totalSaved}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {goal.avgMonthly}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${goal.color}`}
                            style={{ width: `${goal.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs text-foreground/50 w-8 text-right">
                          {goal.percentage}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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