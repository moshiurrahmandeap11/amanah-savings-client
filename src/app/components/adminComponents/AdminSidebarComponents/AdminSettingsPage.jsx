"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Settings,
  Globe,
  CreditCard,
  Bell,
  Shield,
  Wrench,
  Save,
  X,
  AlertTriangle,
  Database,
  Trash2,
  RefreshCw,
  CheckCircle,
  ArrowLeft,
  Moon,
  Sun,
  Loader2,
} from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AdminSettingsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activePanel, setActivePanel] = useState("general");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [settings, setSettings] = useState({
    general: {},
    savings: {},
    payments: {},
    notifications: {},
    security: {},
    maintenance: {},
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      // FIXED: Correct endpoint path (without /admin prefix because route already has it)
      const res = await axiosInstance.get("/admin/settings", { headers: getAuthHeaders() });
      if (res.data.success) {
        const backendData = res.data.data;
        
        // Transform backend data to frontend expected format
        setSettings({
          general: {
            platformName: backendData.general?.name || "Sonchoy Bondhu",
            websiteUrl: backendData.general?.url || "",
            contactEmail: backendData.general?.supportEmail || "",
            language: backendData.general?.language || "bn",
            currency: backendData.general?.currency || "BDT",
            newRegistration: backendData.general?.newRegistration !== false,
            demoMode: backendData.general?.demoMode || false,
          },
          savings: {
            minDeposit: backendData.savings?.minDeposit || 500,
            maxSingleDeposit: backendData.savings?.maxDeposit || 100000,
            dailyDepositLimit: backendData.savings?.dailyDepositLimit || 500000,
            withdrawalDelay: backendData.savings?.minWithdrawal || 1000,
            islamicMode: backendData.savings?.islamicMode || false,
            goalLock: backendData.savings?.goalMaturityPeriod === 30,
          },
          payments: {
            bkashEnabled: backendData.payments?.bkashEnabled || false,
            nagadEnabled: backendData.payments?.nagadEnabled || false,
            rocketEnabled: backendData.payments?.rocketEnabled || false,
            bankEnabled: backendData.payments?.bankTransferEnabled || false,
            depositFee: 0,
            withdrawalFee: backendData.savings?.earlyWithdrawalFee || 2,
          },
          notifications: {
            emailNotification: backendData.notifications?.depositConfirmation || false,
            smsNotification: backendData.notifications?.withdrawalConfirmation || false,
            pushNotification: backendData.notifications?.goalMilestone || false,
            monthlyReport: backendData.notifications?.monthlyReport || false,
            marketingEmail: backendData.notifications?.marketingEmails || false,
          },
          security: {
            twoFactorAuth: backendData.security?.twoFactorEnabled || false,
            pinRequired: backendData.security?.pinRequired !== false,
            sessionTimeout: backendData.security?.sessionTimeout || 30,
            maxLoginAttempts: backendData.security?.maxLoginAttempts || 5,
            ipLogging: true,
          },
          maintenance: {
            maintenanceMode: backendData.maintenance?.mode || false,
            maintenanceMessage: backendData.maintenance?.message || "We're currently performing scheduled maintenance. Please check back soon.",
          },
        });
      }
    } catch (err) {
      console.error("Fetch settings error:", err);
      showToast(err.response?.data?.message || "Failed to load settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    fetchSettings();
  }, [fetchSettings]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const handleToggle = (section, key) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: !prev[section]?.[key] },
    }));
  };

  const handleInputChange = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
      // Transform frontend data to backend expected format
      const payload = {
        general: {
          name: settings.general.platformName,
          url: settings.general.websiteUrl,
          supportEmail: settings.general.contactEmail,
          language: settings.general.language,
          currency: settings.general.currency,
          tagline: "Islamic Savings Platform for Bangladesh",
          timezone: "Asia/Dhaka",
        },
        savings: {
          minDeposit: parseInt(settings.savings.minDeposit) || 500,
          maxDeposit: parseInt(settings.savings.maxSingleDeposit) || 100000,
          dailyDepositLimit: parseInt(settings.savings.dailyDepositLimit) || 500000,
          minWithdrawal: parseInt(settings.savings.withdrawalDelay) || 1000,
          maxWithdrawal: 50000,
          earlyWithdrawalFee: parseFloat(settings.payments.withdrawalFee) || 2,
          goalMaturityPeriod: settings.savings.goalLock ? 30 : 0,
        },
        payments: {
          bkashEnabled: settings.payments.bkashEnabled,
          nagadEnabled: settings.payments.nagadEnabled,
          rocketEnabled: settings.payments.rocketEnabled,
          bankTransferEnabled: settings.payments.bankEnabled,
          cardEnabled: false,
        },
        notifications: {
          depositConfirmation: settings.notifications.emailNotification,
          withdrawalConfirmation: settings.notifications.smsNotification,
          goalMilestone: settings.notifications.pushNotification,
          streakReminder: true,
          monthlyReport: settings.notifications.monthlyReport,
          marketingEmails: settings.notifications.marketingEmail,
        },
        security: {
          twoFactorEnabled: settings.security.twoFactorAuth,
          pinRequired: settings.security.pinRequired,
          sessionTimeout: parseInt(settings.security.sessionTimeout) || 30,
          maxLoginAttempts: parseInt(settings.security.maxLoginAttempts) || 5,
          passwordMinLength: 8,
        },
        maintenance: {
          mode: settings.maintenance.maintenanceMode,
          message: settings.maintenance.maintenanceMessage,
          allowedIps: [],
        },
      };

      // FIXED: Correct endpoint path
      const res = await axiosInstance.put("/admin/settings", payload, { headers: getAuthHeaders() });
      
      if (res.data.success) {
        showToast(
          lang === "bn"
            ? "✅ সেটিংস সফলভাবে সংরক্ষিত হয়েছে"
            : "✅ Settings saved successfully",
        );
        fetchSettings(); // Refresh to get latest
      }
    } catch (err) {
      console.error("Save settings error:", err);
      showToast(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const downloadBackup = () => {
    const data = JSON.stringify(
      {
        backup_date: new Date().toISOString(),
        version: "1.0",
        settings: settings,
      },
      null,
      2,
    );
    const a = document.createElement("a");
    a.href = "data:application/json;charset=utf-8," + encodeURIComponent(data);
    a.download = `amanah-backup-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast(
      lang === "bn"
        ? "✅ ব্যাকআপ ডাউনলোড সম্পন্ন!"
        : "✅ Backup download complete!",
    );
  };

  const clearCache = () => {
    showToast(
      lang === "bn" 
        ? "🗑️ ক্যাশ পরিষ্কার করা হয়েছে" 
        : "🗑️ Cache cleared",
    );
  };

  const deleteLogs = () => {
    showToast(
      lang === "bn"
        ? "🗑️ সকল লগ মুছে ফেলা হয়েছে"
        : "🗑️ All logs have been deleted",
    );
  };

  const cancelChanges = () => {
    fetchSettings(); // Reload from server
    showToast(
      lang === "bn"
        ? "↩️ পরিবর্তন বাতিল করা হয়েছে"
        : "↩️ Changes cancelled",
    );
  };

  const panels = [
    {
      id: "general",
      label: "সাধারণ",
      icon: <Settings size={16} />,
      labelEn: "General",
    },
    {
      id: "savings",
      label: "সঞ্চয় নিয়ম",
      icon: <Database size={16} />,
      labelEn: "Savings Rules",
    },
    {
      id: "payments",
      label: "পেমেন্ট গেটওয়ে",
      icon: <CreditCard size={16} />,
      labelEn: "Payment Gateway",
    },
    {
      id: "notifications",
      label: "বিজ্ঞপ্তি",
      icon: <Bell size={16} />,
      labelEn: "Notifications",
    },
    {
      id: "security",
      label: "নিরাপত্তা",
      icon: <Shield size={16} />,
      labelEn: "Security",
    },
    {
      id: "maintenance",
      label: "রক্ষণাবেক্ষণ",
      icon: <Wrench size={16} />,
      labelEn: "Maintenance",
    },
  ];

  // Rest of the render functions remain the same...
  // (renderGeneralPanel, renderSavingsPanel, etc. - they stay as is)

  const renderGeneralPanel = () => (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">
            {lang === "bn" ? "সাইট তথ্য" : "Site Information"}
          </h3>
          <p className="text-xs text-foreground/50">
            {lang === "bn"
              ? "প্ল্যাটফর্মের মৌলিক তথ্য পরিবর্তন করুন"
              : "Update the platform basics"}
          </p>
        </div>
        <div className="p-4 space-y-4">
          {[
            { key: "platformName", labelBn: "প্ল্যাটফর্মের নাম", labelEn: "Platform Name", descBn: "ব্যবহারকারীরা যা দেখবেন", descEn: "What users will see" },
            { key: "websiteUrl", labelBn: "ওয়েবসাইট URL", labelEn: "Website URL", descBn: "মূল ডোমেইন ঠিকানা", descEn: "Primary domain address" },
            { key: "contactEmail", labelBn: "যোগাযোগ ইমেইল", labelEn: "Contact Email", descBn: "সাপোর্ট ইমেইল ঠিকানা", descEn: "Support email address" },
          ].map((field) => (
            <div key={field.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="font-medium text-sm text-foreground">
                  {lang === "bn" ? field.labelBn : field.labelEn}
                </div>
                <div className="text-xs text-foreground/50">
                  {lang === "bn" ? field.descBn : field.descEn}
                </div>
              </div>
              <input
                value={settings.general?.[field.key] || ""}
                onChange={(e) => handleInputChange("general", field.key, e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-full sm:w-64"
              />
            </div>
          ))}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "ভাষা" : "Language"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn" ? "ডিফল্ট প্ল্যাটফর্ম ভাষা" : "Default platform language"}
              </div>
            </div>
            <select
              value={settings.general?.language || "bn"}
              onChange={(e) => handleInputChange("general", "language", e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
            >
              <option value="bn">বাংলা (BD)</option>
              <option value="en">English</option>
            </select>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "মুদ্রা" : "Currency"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn" ? "লেনদেনের মুদ্রা" : "Transaction currency"}
              </div>
            </div>
            <select
              value={settings.general?.currency || "BDT"}
              onChange={(e) => handleInputChange("general", "currency", e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
            >
              <option value="BDT">BDT (৳)</option>
            </select>
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">
            {lang === "bn" ? "সিস্টেম অবস্থা" : "System Status"}
          </h3>
        </div>
      </div>
    </div>
  );

  const renderSavingsPanel = () => (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">
          {lang === "bn" ? "সঞ্চয় সীমা ও নিয়ম" : "Savings Limits & Rules"}
        </h3>
        <p className="text-xs text-foreground/50">
          {lang === "bn"
            ? "জমা ও উত্তোলনের সীমাবদ্ধতা"
            : "Deposit and withdrawal limits"}
        </p>
      </div>
      <div className="p-4 space-y-4">
        {[
          { key: "minDeposit", labelBn: "সর্বনিম্ন জমা পরিমাণ", labelEn: "Minimum Deposit Amount", descBn: "প্রতিটি জমার ন্যূনতম টাকা", descEn: "Minimum amount per deposit" },
          { key: "maxSingleDeposit", labelBn: "সর্বোচ্চ একক জমা", labelEn: "Maximum Single Deposit", descBn: "একবারে সর্বোচ্চ জমা", descEn: "Highest deposit at once" },
          { key: "dailyDepositLimit", labelBn: "দৈনিক জমা সীমা", labelEn: "Daily Deposit Limit", descBn: "প্রতিদিন সর্বোচ্চ মোট জমা", descEn: "Maximum total deposit per day" },
          { key: "withdrawalDelay", labelBn: "সর্বনিম্ন উত্তোলন", labelEn: "Minimum Withdrawal", descBn: "সর্বনিম্ন উত্তোলন পরিমাণ", descEn: "Minimum withdrawal amount" },
        ].map((field) => (
          <div key={field.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? field.labelBn : field.labelEn}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn" ? field.descBn : field.descEn}
              </div>
            </div>
            <input
              type="number"
              value={settings.savings?.[field.key] || ""}
              onChange={(e) => handleInputChange("savings", field.key, e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
            />
          </div>
        ))}
        {[
          { key: "islamicMode", labelBn: "ইসলামিক মোড", labelEn: "Islamic Mode", descBn: "সুদমুক্ত সঞ্চয় বিকল্প চালু", descEn: "Enable interest-free savings option" },
          { key: "goalLock", labelBn: "লক্ষ্য লক বৈশিষ্ট্য", labelEn: "Goal Lock Feature", descBn: "লক্ষ্য পূরণের আগে উত্তোলন বন্ধ", descEn: "Block withdrawals before goal completion" },
        ].map((field) => (
          <div key={field.key} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? field.labelBn : field.labelEn}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn" ? field.descBn : field.descEn}
              </div>
            </div>
            <button
              onClick={() => handleToggle("savings", field.key)}
              className={`relative w-12 h-6 rounded-full transition ${settings.savings?.[field.key] ? "bg-primary" : "bg-border"}`}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.savings?.[field.key] ? "right-0.5" : "left-0.5"}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPaymentPanel = () => (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">
            {lang === "bn" ? "পেমেন্ট গেটওয়ে" : "Payment Gateway"}
          </h3>
          <p className="text-xs text-foreground/50">
            {lang === "bn"
              ? "সক্রিয় পেমেন্ট পদ্ধতি পরিচালনা"
              : "Manage active payment methods"}
          </p>
        </div>
        <div className="p-4 space-y-4">
          {[
            { key: "bkashEnabled", label: "bKash", desc: "বিকাশ মোবাইল ব্যাংকিং" },
            { key: "nagadEnabled", label: "Nagad", desc: "নগদ মোবাইল ফিনান্সিয়াল" },
            { key: "rocketEnabled", label: "Rocket", desc: "ডাচ বাংলা রকেট" },
            { key: "bankEnabled", label: "ব্যাংক ট্রান্সফার", desc: "সরাসরি ব্যাংক অ্যাকাউন্ট ট্রান্সফার" },
          ].map((gateway) => (
            <div
              key={gateway.key}
              className="flex items-center justify-between"
            >
              <div>
                <div className="font-medium text-sm text-foreground">
                  {gateway.label}
                </div>
                <div className="text-xs text-foreground/50">{gateway.desc}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggle("payments", gateway.key)}
                  className={`relative w-12 h-6 rounded-full transition ${settings.payments?.[gateway.key] ? "bg-primary" : "bg-border"}`}
                >
                  <div
                    className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.payments?.[gateway.key] ? "right-0.5" : "left-0.5"}`}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">
            {lang === "bn" ? "ফি কাঠামো" : "Fee Structure"}
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "জমা ফি" : "Deposit Fee"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn"
                  ? "প্রতিটি জমায় কর্তন (%)"
                  : "Deduction on each deposit (%)"}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={settings.payments?.depositFee || "0"}
                onChange={(e) => handleInputChange("payments", "depositFee", e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
              />{" "}
              %
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "উত্তোলন ফি" : "Withdrawal Fee"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn"
                  ? "প্রতিটি উত্তোলনে কর্তন (%)"
                  : "Deduction on each withdrawal (%)"}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={settings.payments?.withdrawalFee || "2"}
                onChange={(e) => handleInputChange("payments", "withdrawalFee", e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
              />{" "}
              %
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsPanel = () => (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">
          {lang === "bn" ? "বিজ্ঞপ্তি সেটিংস" : "Notification Settings"}
        </h3>
      </div>
      <div className="p-4 space-y-4">
        {[
          { key: "emailNotification", label: "ইমেইল বিজ্ঞপ্তি", desc: "ইমেইলে লেনদেন আপডেট পাঠানো" },
          { key: "smsNotification", label: "SMS বিজ্ঞপ্তি", desc: "SMS-এ গুরুত্বপূর্ণ আপডেট" },
          { key: "pushNotification", label: "পুশ নোটিফিকেশন", desc: "অ্যাপ পুশ বিজ্ঞপ্তি" },
          { key: "monthlyReport", label: "মাসিক রিপোর্ট", desc: "মাসিক সঞ্চয় রিপোর্ট ইমেইল" },
          { key: "marketingEmail", label: "মার্কেটিং ইমেইল", desc: "অফার ও প্রচারমূলক বার্তা" },
        ].map((notif) => (
          <div key={notif.key} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">
                {notif.label}
              </div>
              <div className="text-xs text-foreground/50">{notif.desc}</div>
            </div>
            <button
              onClick={() => handleToggle("notifications", notif.key)}
              className={`relative w-12 h-6 rounded-full transition ${settings.notifications?.[notif.key] ? "bg-primary" : "bg-border"}`}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.notifications?.[notif.key] ? "right-0.5" : "left-0.5"}`}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSecurityPanel = () => (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">
          {lang === "bn" ? "নিরাপত্তা সেটিংস" : "Security Settings"}
        </h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn"
                ? "দুই-ধাপ যাচাই (2FA)"
                : "Two-Step Verification (2FA)"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "লগইনে OTP বাধ্যতামূলক"
                : "OTP required for login"}
            </div>
          </div>
          <button
            onClick={() => handleToggle("security", "twoFactorAuth")}
            className={`relative w-12 h-6 rounded-full transition ${settings.security?.twoFactorAuth ? "bg-primary" : "bg-border"}`}
          >
            <div
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.security?.twoFactorAuth ? "right-0.5" : "left-0.5"}`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn" ? "PIN প্রয়োজন" : "PIN Required"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "লেনদেনে PIN যাচাই"
                : "PIN verification for transactions"}
            </div>
          </div>
          <button
            onClick={() => handleToggle("security", "pinRequired")}
            className={`relative w-12 h-6 rounded-full transition ${settings.security?.pinRequired ? "bg-primary" : "bg-border"}`}
          >
            <div
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.security?.pinRequired ? "right-0.5" : "left-0.5"}`}
            />
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn"
                ? "সেশন সময়সীমা (মিনিট)"
                : "Session Timeout (minutes)"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "নিষ্ক্রিয়তায় স্বয়ংক্রিয় লগআউট"
                : "Automatic logout after inactivity"}
            </div>
          </div>
          <input
            type="number"
            value={settings.security?.sessionTimeout || "30"}
            onChange={(e) => handleInputChange("security", "sessionTimeout", e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn"
                ? "সর্বোচ্চ লগইন প্রচেষ্টা"
                : "Maximum Login Attempts"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "ব্লক করার আগে সর্বোচ্চ ব্যর্থতা"
                : "Max failures before blocking"}
            </div>
          </div>
          <input
            type="number"
            value={settings.security?.maxLoginAttempts || "5"}
            onChange={(e) => handleInputChange("security", "maxLoginAttempts", e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn" ? "IP লগিং" : "IP Logging"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "লগইন IP ঠিকানা রেকর্ড"
                : "Record login IP address"}
            </div>
          </div>
          <button
            onClick={() => handleToggle("security", "ipLogging")}
            className={`relative w-12 h-6 rounded-full transition ${settings.security?.ipLogging ? "bg-primary" : "bg-border"}`}
          >
            <div
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.security?.ipLogging ? "right-0.5" : "left-0.5"}`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderMaintenancePanel = () => (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
        <AlertTriangle size={18} className="text-amber-500 shrink-0" />
        <div>
          <strong className="text-sm text-foreground">
            {lang === "bn" ? "সতর্কতা" : "Warning"}
          </strong>
          <p className="text-xs text-foreground/60">
            {lang === "bn"
              ? "রক্ষণাবেক্ষণ মোড চালু করলে সকল ব্যবহারকারী সাময়িক প্ল্যাটফর্ম ব্যবহার করতে পারবে না।"
              : "When maintenance mode is enabled, all users will be temporarily unable to use the platform."}
          </p>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">
            {lang === "bn" ? "রক্ষণাবেক্ষণ মোড" : "Maintenance Mode"}
          </h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "রক্ষণাবেক্ষণ মোড" : "Maintenance Mode"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn"
                  ? "সাইট সাময়িক বন্ধ রাখুন"
                  : "Keep the site temporarily closed"}
              </div>
            </div>
            <button
              onClick={() => handleToggle("maintenance", "maintenanceMode")}
              className={`relative w-12 h-6 rounded-full transition ${settings.maintenance?.maintenanceMode ? "bg-primary" : "bg-border"}`}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.maintenance?.maintenanceMode ? "right-0.5" : "left-0.5"}`}
              />
            </button>
          </div>
          <div>
            <div className="font-medium text-sm text-foreground mb-1">
              {lang === "bn" ? "রক্ষণাবেক্ষণ বার্তা" : "Maintenance Message"}
            </div>
            <textarea
              value={settings.maintenance?.maintenanceMessage || ""}
              onChange={(e) => handleInputChange("maintenance", "maintenanceMessage", e.target.value)}
              rows={3}
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderActivePanel = () => {
    switch (activePanel) {
      case "general":
        return renderGeneralPanel();
      case "savings":
        return renderSavingsPanel();
      case "payments":
        return renderPaymentPanel();
      case "notifications":
        return renderNotificationsPanel();
      case "security":
        return renderSecurityPanel();
      case "maintenance":
        return renderMaintenancePanel();
      default:
        return renderGeneralPanel();
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Topbar */}
      <div className="bg-card border-b border-border px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sticky top-0 z-50">
        <h1 className="text-base font-bold text-foreground">
          {lang === "bn" ? "সিস্টেম সেটিংস" : "System Settings"}
        </h1>
        <div className="flex gap-2">
          <button
            onClick={() => setLang(lang === "bn" ? "en" : "bn")}
            className="px-3 py-1.5 rounded-lg border border-border text-xs font-bold hover:border-primary transition"
          >
            {lang === "bn" ? "EN" : "BN"}
          </button>
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={cancelChanges}
            className="px-3 py-1.5 rounded-lg border border-border text-foreground/70 text-xs font-semibold hover:border-primary transition"
          >
            {lang === "bn" ? "বাতিল" : "Cancel"}
          </button>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="px-3 py-1.5 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
          >
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
            {lang === "bn" ? "সংরক্ষণ" : "Save"}
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-5 p-4">
        {/* Settings Nav */}
        <div className="lg:w-56 flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
          {panels.map((panel) => (
            <button
              key={panel.id}
              onClick={() => setActivePanel(panel.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${
                activePanel === panel.id
                  ? "bg-card text-primary border border-border shadow-sm"
                  : "text-foreground/60 hover:text-primary hover:bg-card"
              }`}
            >
              {panel.icon}
              <span>{lang === "bn" ? panel.label : panel.labelEn}</span>
            </button>
          ))}
        </div>

        {/* Settings Panels */}
        <div className="flex-1 min-w-0">{renderActivePanel()}</div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminSettingsPage;