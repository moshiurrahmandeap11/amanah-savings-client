"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const TransactionsPage = () => {
  const [activeTab, setActiveTab] = useState("all");

  const stats = [
    { icon: "💰", value: "৳2,45,500", label: "Total Deposit", color: "green" },
    { icon: "📊", value: "28", label: "Total Transactions", color: "blue" },
    { icon: "⏳", value: "1", label: "Pending", color: "warning" },
    { icon: "🤝", value: "৳3,500", label: "Bonus Earned", color: "info" },
  ];

  const transactions = [
    { type: "deposit", icon: "💚", iconBg: "deposit", name: "Wedding Fund — bKash", date: "May 24, 2026", amount: "+৳10,000", status: "confirmed", badge: "Confirmed" },
    { type: "deposit", icon: "💚", iconBg: "deposit", name: "Hajj Fund — Nagad", date: "May 20, 2026", amount: "+৳5,000", status: "confirmed", badge: "Confirmed" },
    { type: "deposit", icon: "⏳", iconBg: "pending", name: "Education Fund — Bank Transfer", date: "May 18, 2026", amount: "+৳3,000", status: "pending", badge: "Pending Review" },
    { type: "deposit", icon: "💚", iconBg: "deposit", name: "Wedding Fund — bKash", date: "April 24, 2026", amount: "+৳10,000", status: "confirmed", badge: "Confirmed" },
    { type: "bonus", icon: "🤝", iconBg: "bonus", name: "Referral Bonus — Amina joined", date: "April 15, 2026", amount: "+৳500", status: "bonus", badge: "Deposited", amountColor: "text-amber-500" },
    { type: "deposit", icon: "💚", iconBg: "deposit", name: "Hajj Fund — bKash", date: "March 20, 2026", amount: "+৳5,000", status: "confirmed", badge: "Confirmed" },
    { type: "bonus", icon: "🎖️", iconBg: "bonus", name: "Achievement Bonus — 60 Day Streak", date: "March 10, 2026", amount: "+৳250", status: "bonus", badge: "Deposited", amountColor: "text-amber-500" },
    { type: "deposit", icon: "💚", iconBg: "deposit", name: "Wedding Fund — Nagad", date: "February 24, 2026", amount: "+৳10,000", status: "confirmed", badge: "Confirmed" },
  ];

  const filteredTransactions = activeTab === "all" 
    ? transactions 
    : transactions.filter(t => t.type === activeTab);

  const getIconBgColor = (iconBg) => {
    switch(iconBg) {
      case "deposit": return "bg-primary/10";
      case "pending": return "bg-amber-500/10";
      case "bonus": return "bg-amber-500/10";
      default: return "bg-primary/10";
    }
  };

  const getBadgeClass = (status) => {
    switch(status) {
      case "confirmed": return "bg-primary/10 text-primary";
      case "pending": return "bg-amber-500/10 text-amber-500";
      case "bonus": return "bg-primary/10 text-primary";
      default: return "bg-primary/10 text-primary";
    }
  };

  const getStatColor = (color) => {
    switch(color) {
      case "green": return "border-t-primary";
      case "blue": return "border-t-blue-500";
      case "warning": return "border-t-amber-500";
      case "info": return "border-t-cyan-500";
      default: return "border-t-primary";
    }
  };

  const getStatIconBg = (color) => {
    switch(color) {
      case "green": return "bg-primary/10";
      case "blue": return "bg-blue-500/10";
      case "warning": return "bg-amber-500/10";
      case "info": return "bg-cyan-500/10";
      default: return "bg-primary/10";
    }
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5">📋 Transaction History</h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-card border border-border rounded-xl p-4 hover:shadow-lg transition border-t-4 ${getStatColor(stat.color)}`}
          >
            <div className={`w-11 h-11 rounded-xl ${getStatIconBg(stat.color)} flex items-center justify-center text-xl mb-3`}>
              {stat.icon}
            </div>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Transactions Card */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {/* Tabs */}
        <div className="flex gap-1 p-4 pb-0 border-b border-border">
          {[
            { id: "all", label: "All" },
            { id: "deposit", label: "Deposit" },
            { id: "bonus", label: "Bonus" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-5 py-2 rounded-t-lg text-sm font-semibold transition ${
                activeTab === tab.id
                  ? "bg-primary text-white"
                  : "text-foreground/60 hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Transactions List */}
        <div className="p-4">
          <div className="space-y-3">
            {filteredTransactions.map((txn, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="flex items-center gap-3 pb-3 border-b border-border last:border-0"
              >
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${getIconBgColor(txn.iconBg)}`}>
                  {txn.icon}
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{txn.name}</div>
                  <div className="text-xs text-foreground/50">{txn.date}</div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${getBadgeClass(txn.status)}`}>
                    {txn.badge}
                  </span>
                </div>
                <div className={`font-bold text-sm ${txn.amountColor === "text-amber-500" ? "text-amber-500" : "text-primary"}`}>
                  {txn.amount}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;