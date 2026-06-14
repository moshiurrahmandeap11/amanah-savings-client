"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Send, Calendar, Edit, Settings, Loader2 } from "lucide-react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://server-amanah-savings.onrender.com/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const NotificationsPage = () => {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState(
    "Dear Members, your monthly savings reminder is due in 3 days. Please ensure timely deposits to maintain your savings streak! 🔥",
  );
  const [audience, setAudience] = useState("all");
  const [notificationType, setNotificationType] = useState("general");
  const [sendVia, setSendVia] = useState({
    inApp: true,
    sms: true,
    email: false,
    push: false,
  });
  const [recentSends, setRecentSends] = useState([]);
  const [cmsItems, setCmsItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const [logsRes, settingsRes] = await Promise.all([
        axios.get(`${API_BASE}/admin/notifications/logs`, { headers: getAuthHeaders() }),
        axios.get(`${API_BASE}/admin/settings`, { headers: getAuthHeaders() }),
      ]);
      if (logsRes.data.success) {
        setRecentSends(logsRes.data.data.logs || []);
      }
      if (settingsRes.data.success) {
        const s = settingsRes.data.data;
        setCmsItems([
          { icon: "🏦", label: "Platform Name", value: s.general?.platformName || "Amanah Savings" },
          { icon: "📞", label: "Support Phone", value: s.general?.supportPhone || "01XXX-XXXXXX" },
          { icon: "📧", label: "Support Email", value: s.general?.supportEmail || "support@amanah.bd" },
          { icon: "💰", label: "Min Deposit", value: s.savings?.minDeposit || "৳500" },
        ]);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to load data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const sendNotification = async () => {
    if (!title) {
      showToast("⚠️ Please enter a notification title");
      return;
    }
    if (!message) {
      showToast("⚠️ Please enter a notification message");
      return;
    }
    try {
      const channels = [];
      if (sendVia.inApp) channels.push("inApp");
      if (sendVia.sms) channels.push("sms");
      if (sendVia.email) channels.push("email");
      if (sendVia.push) channels.push("push");

      const res = await axios.post(
        `${API_BASE}/admin/notifications/send`,
        {
          title,
          message,
          type: notificationType,
          audience,
          sendVia: channels,
        },
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToast("✅ Notification sent successfully!");
        setTitle("");
        fetchLogs();
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to send notification");
    }
  };

  const handleCheckboxChange = (type) => {
    setSendVia((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleEditCMS = (item) => {
    showToast(`✏️ Editing ${item.label}...`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-foreground">
          📢 Send Notifications
        </h2>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      <div className="grid lg:grid-cols-2 gap-5">
        {/* Left Column - Compose Notification */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">
            ✍️ Compose Notification
          </div>

          <div className="space-y-4">
            {/* Target Audience */}
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1">
                Target Audience
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm"
              >
                <option value="all">All Members</option>
                <option value="gold_platinum">Gold & Platinum Members</option>
                <option value="pending_kyc">Pending KYC Members</option>
                <option value="overdue">Members with Overdue Payments</option>
                <option value="hajj">Members in Hajj Circles</option>
                <option value="custom">Custom Segment...</option>
              </select>
            </div>

            {/* Notification Type */}
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1">
                Notification Type
              </label>
              <select
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm"
              >
                <option value="general">📢 General Announcement</option>
                <option value="reminder">⚠️ Payment Reminder</option>
                <option value="milestone">🎉 Celebration / Milestone</option>
                <option value="security">🚨 Security Alert</option>
                <option value="seasonal">🌙 Seasonal (Ramadan, Eid)</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Notification title..."
                className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Your notification message here..."
                className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm resize-none"
              />
            </div>

            {/* Send Via */}
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1">
                Send Via
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendVia.inApp}
                    onChange={() => handleCheckboxChange("inApp")}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  In-App
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendVia.sms}
                    onChange={() => handleCheckboxChange("sms")}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  SMS
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendVia.email}
                    onChange={() => handleCheckboxChange("email")}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  Email
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendVia.push}
                    onChange={() => handleCheckboxChange("push")}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  Push
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={sendNotification}
                className="flex-1 py-2.5 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Send size={14} /> Send Now
              </button>
              <button
                onClick={() => showToast("📅 Scheduling feature coming soon")}
                className="px-5 py-2.5 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition"
              >
                Schedule
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Recent Sends */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4">
              📊 Recent Sends
            </div>
            <div className="space-y-3">
              {recentSends.length === 0 ? (
                <div className="text-sm text-foreground/50 text-center py-4">
                  No recent notifications
                </div>
              ) : (
                recentSends.map((send, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg border border-border bg-background"
                  >
                    <div className="font-semibold text-sm text-foreground">
                      {send.title}
                    </div>
                    <div className="text-xs text-foreground/50 mt-1">
                      {send.recipients || send.audience || "All"} · {send.openRate || "N/A"}
                    </div>
                    <div className="text-xs text-foreground/40 mt-1">
                      {send.date || new Date(send.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* CMS Quick Edit */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground">📝 CMS Quick Edit</div>
              <button
                onClick={() => showToast("📄 Opening full CMS...")}
                className="text-xs text-primary font-semibold hover:underline"
              >
                Full CMS →
              </button>
            </div>
            <div className="space-y-2">
              {cmsItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-2 rounded-lg border border-border bg-background"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="flex-1 text-sm font-semibold text-foreground">
                    {item.label}
                  </span>
                  <span className="text-sm text-foreground/50">
                    {item.value}
                  </span>
                  <button
                    onClick={() => handleEditCMS(item)}
                    className="px-2 py-1 rounded-lg text-xs font-semibold bg-primary/10 text-primary hover:bg-primary/20 transition"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
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

export default NotificationsPage;
