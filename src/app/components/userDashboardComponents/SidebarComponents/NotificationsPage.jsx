"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Settings,
  CheckCircle,
  Bell,
  Loader2,
  Trash2,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const NotificationsPage = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Fetch notifications
  const fetchNotifications = async (page = 1) => {
    setLoading(true);
    try {
      const url = `/notifications?page=${page}&limit=20${activeTab !== "all" ? `&type=${activeTab}` : ""}`;
      const response = await axiosInstance.get(url);
      if (response.data.success) {
        setNotifications(response.data.data.notifications);
        setUnreadCount(response.data.data.unreadCount);
        setCounts(response.data.data.counts);
        setPagination(response.data.data.pagination);
      }
    } catch (error) {
      console.error("Fetch notifications error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [activeTab]);

  const markAsRead = async (id) => {
    try {
      await axiosInstance.put(`/notifications/${id}/read`);
      fetchNotifications(pagination.currentPage);
    } catch (error) {
      console.error("Mark as read error:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const result = await Swal.fire({
        title: "Mark all as read?",
        text: "This will mark all your notifications as read.",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#059669",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, mark all",
      });

      if (result.isConfirmed) {
        await axiosInstance.put("/notifications/read-all");
        Swal.fire({
          title: "Success!",
          text: "All notifications marked as read",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchNotifications();
      }
    } catch (error) {
      console.error("Mark all as read error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to mark notifications as read",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  const deleteNotification = async (id, e) => {
    e.stopPropagation();
    try {
      const result = await Swal.fire({
        title: "Delete notification?",
        text: "This action cannot be undone.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#6c757d",
        confirmButtonText: "Yes, delete",
      });

      if (result.isConfirmed) {
        await axiosInstance.delete(`/notifications/${id}`);
        Swal.fire({
          title: "Deleted!",
          text: "Notification deleted",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
        fetchNotifications();
      }
    } catch (error) {
      console.error("Delete notification error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to delete notification",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    }
  };

  const tabs = [
    { id: "all", label: "All", count: counts.all || 0 },
    { id: "deposit", label: "Deposit", count: counts.deposit || 0 },
    { id: "streak", label: "Streak", count: counts.streak || 0 },
    { id: "reminder", label: "Reminder", count: counts.reminder || 0 },
    { id: "bonus", label: "Bonus", count: counts.bonus || 0 },
    { id: "achievement", label: "Achievement", count: counts.achievement || 0 },
  ];

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Bell size={24} /> Notifications
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 rounded-full bg-primary text-white text-xs">
              {unreadCount} new
            </span>
          )}
        </h2>
        <div className="flex gap-3">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="px-4 py-2 rounded-lg bg-primary/15 text-primary border border-primary/30 text-sm font-semibold hover:bg-primary/25 transition flex items-center gap-2"
            >
              <CheckCircle size={14} /> Mark all as read
            </button>
          )}
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
                ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-md"
                : "text-foreground/60 hover:text-primary"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] ${
                activeTab === tab.id ? "bg-white/20 text-white" : "bg-primary/20 text-primary"
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        <AnimatePresence>
          {notifications.length === 0 ? (
            <div className="text-center py-12 bg-card rounded-xl border border-border">
              <div className="text-6xl mb-3">🔔</div>
              <div className="font-bold text-foreground mb-1">No notifications</div>
              <div className="text-sm text-foreground/50">
                You're all caught up!
              </div>
            </div>
          ) : (
            notifications.map((notif, idx) => (
              <motion.div
                key={notif._id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: idx * 0.05 }}
                onClick={() => !notif.read && markAsRead(notif._id)}
                className={`rounded-xl p-4 cursor-pointer transition-all ${
                  !notif.read
                    ? "bg-card border-l-4 border-primary border"
                    : "bg-card border border-border"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl ${notif.color || "bg-primary/15"} flex items-center justify-center text-xl shrink-0`}
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
                    {notif.actionType && (
                      <div className="mt-2">
                        <button className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold">
                          {notif.actionType === "deposit" ? "Deposit Now" : "View Details"}
                        </button>
                      </div>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <div className={`text-xs font-semibold ${notif.timeColor || "text-primary"}`}>
                        {notif.icon} {notif.badge} · {notif.timeAgo}
                      </div>
                      <button
                        onClick={(e) => deleteNotification(notif._id, e)}
                        className="text-foreground/30 hover:text-red-500 transition"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                  {!notif.read && (
                    <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />
                  )}
                </div>
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          <button
            onClick={() => fetchNotifications(pagination.currentPage - 1)}
            disabled={pagination.currentPage === 1}
            className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-foreground">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => fetchNotifications(pagination.currentPage + 1)}
            disabled={pagination.currentPage === pagination.totalPages}
            className="px-4 py-2 rounded-lg border border-border text-foreground/70 disabled:opacity-50 disabled:cursor-not-allowed hover:border-primary transition"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationsPage;