"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Send, Calendar, Edit, Settings, Loader2 } from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    sendNotifications: "📢 Send Notifications",
    composeNotification: "✍️ Compose Notification",
    targetAudience: "Target Audience",
    notificationType: "Notification Type",
    title: "Title",
    message: "Message",
    sendVia: "Send Via",
    allMembers: "All Members",
    goldPlatinum: "Gold & Platinum Members",
    pendingKyc: "Pending KYC Members",
    overdue: "Members with Overdue Payments",
    hajj: "Members in Hajj Circles",
    custom: "Custom Segment...",
    general: "📢 General Announcement",
    reminder: "⚠️ Payment Reminder",
    milestone: "🎉 Celebration / Milestone",
    security: "🚨 Security Alert",
    seasonal: "🌙 Seasonal (Ramadan, Eid)",
    notificationTitlePlaceholder: "Notification title...",
    messagePlaceholder: "Your notification message here...",
    inApp: "In-App",
    sms: "SMS",
    email: "Email",
    push: "Push",
    sendNow: "Send Now",
    schedule: "Schedule",
    recentSends: "📊 Recent Sends",
    noRecentNotifications: "No recent notifications",
    cmsQuickEdit: "📝 CMS Quick Edit",
    fullCms: "Full CMS →",
    edit: "Edit",
    notificationSent: "✅ Notification sent successfully!",
    titleRequired: "⚠️ Please enter a notification title",
    messageRequired: "⚠️ Please enter a notification message",
    failedToLoad: "Failed to load data",
    failedToSend: "Failed to send notification",
    schedulingSoon: "📅 Scheduling feature coming soon",
    openingCms: "📄 Opening full CMS...",
  },
  bn: {
    sendNotifications: "📢 নোটিফিকেশন পাঠান",
    composeNotification: "✍️ নোটিফিকেশন তৈরি করুন",
    targetAudience: "টার্গেট অডিয়েন্স",
    notificationType: "নোটিফিকেশন টাইপ",
    title: "টাইটেল",
    message: "মেসেজ",
    sendVia: "কোথায় পাঠাবেন",
    allMembers: "সব মেম্বার",
    goldPlatinum: "গোল্ড ও প্ল্যাটিনাম মেম্বার",
    pendingKyc: "পেন্ডিং কেওয়াইসি মেম্বার",
    overdue: "বকেয়া পেমেন্টযুক্ত মেম্বার",
    hajj: "হজ্জ সার্কেলের মেম্বার",
    custom: "কাস্টম সেগমেন্ট...",
    general: "📢 সাধারণ ঘোষণা",
    reminder: "⚠️ পেমেন্ট রিমাইন্ডার",
    milestone: "🎉 উদযাপন / মাইলস্টোন",
    security: "🚨 সিকিউরিটি অ্যালার্ট",
    seasonal: "🌙 সিজনাল (রমজান, ঈদ)",
    notificationTitlePlaceholder: "নোটিফিকেশন টাইটেল...",
    messagePlaceholder: "আপনার নোটিফিকেশন মেসেজ এখানে...",
    inApp: "ইন-অ্যাপ",
    sms: "এসএমএস",
    email: "ইমেইল",
    push: "পুশ",
    sendNow: "এখন পাঠান",
    schedule: "শিডিউল",
    recentSends: "📊 সাম্প্রতিক পাঠানো",
    noRecentNotifications: "কোনো সাম্প্রতিক নোটিফিকেশন নেই",
    cmsQuickEdit: "📝 সিএমএস কুইক এডিট",
    fullCms: "পুরো সিএমএস →",
    edit: "এডিট",
    notificationSent: "✅ নোটিফিকেশন সফলভাবে পাঠানো হয়েছে!",
    titleRequired: "⚠️ নোটিফিকেশন টাইটেল দিন",
    messageRequired: "⚠️ নোটিফিকেশন মেসেজ দিন",
    failedToLoad: "ডেটা লোড করতে ব্যর্থ হয়েছে",
    failedToSend: "নোটিফিকেশন পাঠাতে ব্যর্থ হয়েছে",
    schedulingSoon: "📅 শিডিউলিং ফিচার শীঘ্রই আসছে",
    openingCms: "📄 পুরো সিএমএস খুলছে...",
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const NotificationsPage = () => {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState(
    "প্রিয় সদস্যবৃন্দ, আপনার মাসিক সঞ্চয় রিমাইন্ডার ৩ দিনের মধ্যে বাকি। সময়মতো ডিপোজিট করুন যাতে আপনার সঞ্চয় স্ট্রিক বজায় থাকে! 🔥"
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
  const [lang, setLang] = useState("bn");

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "bn";
    setLang(savedLang);
  }, []);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const fetchLogs = useCallback(async () => {
    setLoading(true);
    try {
      const [logsRes, settingsRes] = await Promise.all([
        axiosInstance.get("/admin/notifications/logs", { headers: getAuthHeaders() }),
        axiosInstance.get("/admin/settings", { headers: getAuthHeaders() }),
      ]);
      if (logsRes.data.success) {
        setRecentSends(logsRes.data.data.logs || []);
      }
      if (settingsRes.data.success) {
        const s = settingsRes.data.data;
        setCmsItems([
          { icon: "🏦", label: t('platformName') || "Platform Name", value: s.general?.platformName || "Sonchoy Bondhu" },
          { icon: "📞", label: t('supportPhone') || "Support Phone", value: s.general?.supportPhone || "01XXX-XXXXXX" },
          { icon: "📧", label: t('supportEmail') || "Support Email", value: s.general?.supportEmail || "support@amanah.bd" },
          { icon: "💰", label: t('minDeposit') || "Min Deposit", value: s.savings?.minDeposit || "৳500" },
        ]);
      }
    } catch (err) {
      showToast(t('failedToLoad'));
    } finally {
      setLoading(false);
    }
  }, [lang]);

  useEffect(() => {
    fetchLogs();
  }, [fetchLogs]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const sendNotification = async () => {
    if (!title) {
      showToast(t('titleRequired'));
      return;
    }
    if (!message) {
      showToast(t('messageRequired'));
      return;
    }
    try {
      const channels = [];
      if (sendVia.inApp) channels.push("inApp");
      if (sendVia.sms) channels.push("sms");
      if (sendVia.email) channels.push("email");
      if (sendVia.push) channels.push("push");

      const res = await axiosInstance.post(
        "/admin/notifications/send",
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
        showToast(t('notificationSent'));
        setTitle("");
        fetchLogs();
      }
    } catch (err) {
      showToast(err.response?.data?.message || t('failedToSend'));
    }
  };

  const handleCheckboxChange = (type) => {
    setSendVia((prev) => ({ ...prev, [type]: !prev[type] }));
  };

  const handleEditCMS = (item) => {
    showToast(`${t('edit')} ${item.label}...`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-bold text-foreground">
          {t('sendNotifications')}
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
            {t('composeNotification')}
          </div>

          <div className="space-y-4">
            {/* Target Audience */}
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1">
                {t('targetAudience')}
              </label>
              <select
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm"
              >
                <option value="all">{t('allMembers')}</option>
                <option value="gold_platinum">{t('goldPlatinum')}</option>
                <option value="pending_kyc">{t('pendingKyc')}</option>
                <option value="overdue">{t('overdue')}</option>
                <option value="hajj">{t('hajj')}</option>
                <option value="custom">{t('custom')}</option>
              </select>
            </div>

            {/* Notification Type */}
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1">
                {t('notificationType')}
              </label>
              <select
                value={notificationType}
                onChange={(e) => setNotificationType(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm"
              >
                <option value="general">{t('general')}</option>
                <option value="reminder">{t('reminder')}</option>
                <option value="milestone">{t('milestone')}</option>
                <option value="security">{t('security')}</option>
                <option value="seasonal">{t('seasonal')}</option>
              </select>
            </div>

            {/* Title */}
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1">
                {t('title')}
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t('notificationTitlePlaceholder')}
                className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1">
                {t('message')}
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder={t('messagePlaceholder')}
                className="w-full p-2.5 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm resize-none"
              />
            </div>

            {/* Send Via */}
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1">
                {t('sendVia')}
              </label>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendVia.inApp}
                    onChange={() => handleCheckboxChange("inApp")}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  {t('inApp')}
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendVia.sms}
                    onChange={() => handleCheckboxChange("sms")}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  {t('sms')}
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendVia.email}
                    onChange={() => handleCheckboxChange("email")}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  {t('email')}
                </label>
                <label className="flex items-center gap-2 text-sm text-foreground/70 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={sendVia.push}
                    onChange={() => handleCheckboxChange("push")}
                    className="w-4 h-4 rounded border-border accent-primary"
                  />
                  {t('push')}
                </label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={sendNotification}
                className="flex-1 py-2.5 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center justify-center gap-2"
              >
                <Send size={14} /> {t('sendNow')}
              </button>
              <button
                onClick={() => showToast(t('schedulingSoon'))}
                className="px-5 py-2.5 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition"
              >
                {t('schedule')}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Recent Sends */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4">
              {t('recentSends')}
            </div>
            <div className="space-y-3">
              {recentSends.length === 0 ? (
                <div className="text-sm text-foreground/50 text-center py-4">
                  {t('noRecentNotifications')}
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
              <div className="font-bold text-foreground">{t('cmsQuickEdit')}</div>
              <button
                onClick={() => showToast(t('openingCms'))}
                className="text-xs text-primary font-semibold hover:underline"
              >
                {t('fullCms')}
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
                    {t('edit')}
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