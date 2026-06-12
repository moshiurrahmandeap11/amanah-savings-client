"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Settings,
  CheckCircle,
  Bell,
  DollarSign,
  Flame,
  Calendar,
  Gift,
  Award,
} from "lucide-react";

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "deposit",
      icon: "💳",
      title: "Deposit Confirmed!",
      message:
        "Your <strong>৳10,000</strong> has been verified and deposited to Wedding Fund.",
      time: "2 hours ago",
      color: "bg-primary/15",
      timeColor: "text-primary",
      badge: "Deposit",
      unread: true,
    },
    {
      id: 2,
      type: "streak",
      icon: "🔥",
      title: "90-Day Streak Achieved!",
      message:
        "Congratulations! You've maintained a <strong>90 day</strong> savings streak. Only 10 more days for the 100-day badge!",
      time: "1 day ago",
      color: "bg-red-500/15",
      timeColor: "text-red-500",
      badge: "Streak",
      unread: true,
    },
    {
      id: 3,
      type: "reminder",
      icon: "⏰",
      title: "Payment Reminder",
      message:
        "<strong>Wedding Fund</strong> deposit of ৳10,000 is due in 3 days (May 27).",
      time: "2 days ago",
      color: "bg-amber-500/15",
      timeColor: "text-amber-500",
      badge: "Reminder",
      unread: true,
      action: true,
    },
    {
      id: 4,
      type: "bonus",
      icon: "🤝",
      title: "Referral Bonus!",
      message:
        "Your friend <strong>Amina Khatun</strong> joined Amanah. <strong>৳500 bonus</strong> has been credited to your account!",
      time: "5 days ago",
      color: "bg-cyan-500/15",
      timeColor: "text-cyan-500",
      badge: "Bonus",
      unread: false,
    },
    {
      id: 5,
      type: "streak",
      icon: "🏆",
      title: "New Achievement Unlocked!",
      message:
        "You've unlocked the <strong>'Super Saver'</strong> badge by reaching ৳2,00,000 in savings!",
      time: "1 week ago",
      color: "bg-purple-500/15",
      timeColor: "text-purple-500",
      badge: "Achievement",
      unread: false,
    },
    {
      id: 6,
      type: "deposit",
      icon: "✅",
      title: "Hajj Fund Goal 50% Complete!",
      message:
        "Your Hajj fund goal is halfway complete. Only ৳2,70,000 remaining!",
      time: "2 weeks ago",
      color: "bg-primary/15",
      timeColor: "text-primary",
      badge: "Milestone",
      unread: false,
    },
  ]);

  const tabs = [
    { id: "all", label: "All", count: notifications.length },
    {
      id: "deposit",
      label: "Deposit",
      count: notifications.filter((n) => n.type === "deposit").length,
    },
    {
      id: "streak",
      label: "Streak",
      count: notifications.filter((n) => n.type === "streak").length,
    },
    {
      id: "reminder",
      label: "Reminder",
      count: notifications.filter((n) => n.type === "reminder").length,
    },
    {
      id: "bonus",
      label: "Bonus",
      count: notifications.filter((n) => n.type === "bonus").length,
    },
  ];

  const getUnreadCount = () => {
    return notifications.filter((n) => n.unread).length;
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === id ? { ...notif, unread: false } : notif,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notif) => ({ ...notif, unread: false })),
    );
  };

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "all") return true;
    return notif.type === activeTab;
  });

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Bell size={24} /> Notifications
        </h2>
        <div className="flex gap-3">
          <Link
            href="/dashboard/notification-settings"
            className="px-4 py-2 rounded-lg border border-border bg-background text-foreground text-sm font-semibold hover:border-primary hover:text-primary transition flex items-center gap-2"
          >
            <Settings size={14} /> Settings
          </Link>
          <button
            onClick={markAllAsRead}
            className="px-4 py-2 rounded-lg bg-primary/15 text-primary border border-primary/30 text-sm font-semibold hover:bg-primary/25 transition flex items-center gap-2"
          >
            <CheckCircle size={14} /> Mark all as read
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2 bg-background rounded-xl p-1 border border-border mb-5 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition whitespace-nowrap ${
              activeTab === tab.id
                ? "bg-linear-to-r from-primary to-primary-light text-white shadow-md"
                : "text-foreground/60 hover:text-primary"
            }`}
          >
            {tab.label}
            {tab.count > 0 && activeTab !== tab.id && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-primary/20 text-primary text-[10px]">
                {tab.count}
              </span>
            )}
            {activeTab === tab.id && tab.count > 0 && (
              <span className="ml-1 px-1.5 py-0.5 rounded-full bg-white/20 text-white text-[10px]">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence>
          {filteredNotifications.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => markAsRead(notif.id)}
              className={`rounded-xl p-4 cursor-pointer transition-all ${
                notif.unread
                  ? "bg-card border-l-4 border-primary border "
                  : "bg-card border border-border"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`w-11 h-11 rounded-xl ${notif.color} flex items-center justify-center text-xl shrink-0`}
                >
                  {notif.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-foreground mb-1">
                    {notif.title}
                  </div>
                  <div
                    className="text-sm text-foreground/60 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: notif.message }}
                  />
                  {notif.action && (
                    <div className="mt-2">
                      <button className="px-3 py-1.5 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs font-semibold">
                        Deposit Now
                      </button>
                    </div>
                  )}
                  <div
                    className={`text-xs mt-2 font-semibold ${notif.timeColor}`}
                  >
                    {notif.icon} {notif.badge} · {notif.time}
                  </div>
                </div>
                {notif.unread && (
                  <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredNotifications.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-3">🔔</div>
          <div className="font-bold text-foreground mb-1">No notifications</div>
          <div className="text-sm text-foreground/50">
            You&apos;re all caught up!
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;
