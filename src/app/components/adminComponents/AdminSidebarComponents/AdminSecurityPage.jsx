"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  AlertTriangle,
  XCircle,
  CheckCircle,
  Clock,
  Server,
} from "lucide-react";

const AdminSecurityPage = () => {
  const [toast, setToast] = useState({ show: false, message: "" });

  const stats = [
    {
      icon: "✅",
      value: "99.9%",
      label: "Uptime (30d)",
      trend: "+99.9%",
      trendUp: true,
      bg: "bg-primary/10",
      iconBg: "bg-primary/10",
    },
    {
      icon: "🚫",
      value: "23",
      label: "Failed Logins (today)",
      trend: "-12%",
      trendUp: false,
      bg: "bg-red-500/10",
      iconBg: "bg-red-500/10",
    },
    {
      icon: "⚠️",
      value: "2",
      label: "Suspicious IPs",
      trend: null,
      bg: "bg-amber-500/10",
      iconBg: "bg-amber-500/10",
    },
  ];

  const securityEvents = [
    {
      time: "10:42 AM",
      event: "Failed login — 01712XXXXXX",
      ip: "103.x.x.x",
      status: "Blocked",
      statusColor: "danger",
    },
    {
      time: "09:18 AM",
      event: "Admin login",
      ip: "103.x.x.x",
      status: "Success",
      statusColor: "success",
    },
    {
      time: "08:55 AM",
      event: "Password reset",
      ip: "103.x.x.x",
      status: "Success",
      statusColor: "success",
    },
    {
      time: "08:30 AM",
      event: "Suspicious login attempt",
      ip: "45.x.x.x",
      status: "Alert",
      statusColor: "warning",
    },
  ];

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const getStatusColor = (statusColor) => {
    switch (statusColor) {
      case "danger":
        return "text-red-500";
      case "success":
        return "text-primary";
      case "warning":
        return "text-amber-500";
      default:
        return "text-foreground";
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-5">
        🔐 Security Logs
      </h2>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
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

      {/* Security Events Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="p-4 border-b border-border">
          <div className="font-bold text-foreground">
            📋 Recent Security Events
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-125">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Time
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Event
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  IP
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {securityEvents.map((event, idx) => (
                <tr
                  key={idx}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition"
                >
                  <td className="px-4 py-3 text-sm text-foreground">
                    {event.time}
                  </td>
                  <td className="px-4 py-3 text-sm text-foreground">
                    {event.event}
                  </td>
                  <td className="px-4 py-3 text-sm font-mono text-foreground/70">
                    {event.ip}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-sm font-bold ${getStatusColor(event.statusColor)}`}
                    >
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
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
      </AnimatePresence>
    </div>
  );
};

export default AdminSecurityPage;
