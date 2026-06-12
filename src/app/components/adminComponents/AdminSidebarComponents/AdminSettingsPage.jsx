"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const AdminSettingsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activePanel, setActivePanel] = useState("general");
  const [toast, setToast] = useState({ show: false, message: "" });

  const [settings, setSettings] = useState({
    // General
    platformName: "Amanah Savings Community",
    websiteUrl: "https://amanah.freepixa.com",
    contactEmail: "support@amanah.com",
    language: "bn",
    currency: "BDT",
    newRegistration: true,
    demoMode: false,
    // Savings Rules
    minDeposit: "500",
    maxSingleDeposit: "1,00,000",
    dailyDepositLimit: "5,00,000",
    withdrawalDelay: "24",
    islamicMode: true,
    goalLock: true,
    // Payment Gateway
    bkashEnabled: true,
    nagadEnabled: true,
    rocketEnabled: false,
    bankEnabled: false,
    depositFee: "0",
    withdrawalFee: "0.5",
    // Notifications
    emailNotification: true,
    smsNotification: true,
    pushNotification: true,
    monthlyReport: true,
    marketingEmail: false,
    // Security
    twoFactorAuth: true,
    pinRequired: true,
    sessionTimeout: "30",
    maxLoginAttempts: "5",
    ipLogging: true,
    // Maintenance
    maintenanceMode: false,
    maintenanceMessage: "আমরা সিস্টেম আপগ্রেড করছি। শীঘ্রই ফিরে আসব। ধন্যবাদ।",
  });

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);

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

  const handleToggle = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleInputChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const saveSettings = () => {
    showToast(
      lang === "bn"
        ? "✅ সেটিংস সফলভাবে সংরক্ষিত হয়েছে"
        : "✅ Settings saved successfully",
    );
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
      lang === "bn" ? "⚠️ নিশ্চিতকরণ প্রয়োজন" : "⚠️ Confirmation required",
    );
  };

  const deleteLogs = () => {
    showToast(
      lang === "bn"
        ? "⚠️ সকল লগ মুছে ফেলা হয়েছে"
        : "⚠️ All logs have been deleted",
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
      id: "payment",
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
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "প্ল্যাটফর্মের নাম" : "Platform Name"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn"
                  ? "ব্যবহারকারীরা যা দেখবেন"
                  : "What users will see"}
              </div>
            </div>
            <input
              value={settings.platformName}
              onChange={(e) =>
                handleInputChange("platformName", e.target.value)
              }
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-full sm:w-64"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "ওয়েবসাইট URL" : "Website URL"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn" ? "মূল ডোমেইন ঠিকানা" : "Primary domain address"}
              </div>
            </div>
            <input
              value={settings.websiteUrl}
              onChange={(e) => handleInputChange("websiteUrl", e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-full sm:w-64"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "যোগাযোগ ইমেইল" : "Contact Email"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn"
                  ? "সাপোর্ট ইমেইল ঠিকানা"
                  : "Support email address"}
              </div>
            </div>
            <input
              value={settings.contactEmail}
              onChange={(e) =>
                handleInputChange("contactEmail", e.target.value)
              }
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-full sm:w-64"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "ভাষা" : "Language"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn"
                  ? "ডিফল্ট প্ল্যাটফর্ম ভাষা"
                  : "Default platform language"}
              </div>
            </div>
            <select
              value={settings.language}
              onChange={(e) => handleInputChange("language", e.target.value)}
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
              value={settings.currency}
              onChange={(e) => handleInputChange("currency", e.target.value)}
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
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "নতুন নিবন্ধন" : "New Registration"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn"
                  ? "নতুন সদস্য যোগ দিতে পারবে"
                  : "New members can join"}
              </div>
            </div>
            <button
              onClick={() => handleToggle("newRegistration")}
              className={`relative w-12 h-6 rounded-full transition ${settings.newRegistration ? "bg-primary" : "bg-border"}`}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.newRegistration ? "right-0.5" : "left-0.5"}`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "ডেমো মোড" : "Demo Mode"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn"
                  ? "পরীক্ষামূলক মোড সক্রিয়"
                  : "Experimental mode active"}
              </div>
            </div>
            <button
              onClick={() => handleToggle("demoMode")}
              className={`relative w-12 h-6 rounded-full transition ${settings.demoMode ? "bg-primary" : "bg-border"}`}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.demoMode ? "right-0.5" : "left-0.5"}`}
              />
            </button>
          </div>
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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn"
                ? "সর্বনিম্ন জমা পরিমাণ"
                : "Minimum Deposit Amount"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "প্রতিটি জমার ন্যূনতম টাকা"
                : "Minimum amount per deposit"}
            </div>
          </div>
          <input
            value={settings.minDeposit}
            onChange={(e) => handleInputChange("minDeposit", e.target.value)}
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn" ? "সর্বোচ্চ একক জমা" : "Maximum Single Deposit"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "একবারে সর্বোচ্চ জমা"
                : "Highest deposit at once"}
            </div>
          </div>
          <input
            value={settings.maxSingleDeposit}
            onChange={(e) =>
              handleInputChange("maxSingleDeposit", e.target.value)
            }
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn" ? "দৈনিক জমা সীমা" : "Daily Deposit Limit"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "প্রতিদিন সর্বোচ্চ মোট জমা"
                : "Maximum total deposit per day"}
            </div>
          </div>
          <input
            value={settings.dailyDepositLimit}
            onChange={(e) =>
              handleInputChange("dailyDepositLimit", e.target.value)
            }
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
          />
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn"
                ? "উত্তোলন বিলম্ব (ঘণ্টা)"
                : "Withdrawal Delay (hours)"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "জমার পর উত্তোলনের অপেক্ষা"
                : "Waiting period after deposit"}
            </div>
          </div>
          <input
            value={settings.withdrawalDelay}
            onChange={(e) =>
              handleInputChange("withdrawalDelay", e.target.value)
            }
            className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn" ? "ইসলামিক মোড" : "Islamic Mode"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "সুদমুক্ত সঞ্চয় বিকল্প চালু"
                : "Enable interest-free savings option"}
            </div>
          </div>
          <button
            onClick={() => handleToggle("islamicMode")}
            className={`relative w-12 h-6 rounded-full transition ${settings.islamicMode ? "bg-primary" : "bg-border"}`}
          >
            <div
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.islamicMode ? "right-0.5" : "left-0.5"}`}
            />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm text-foreground">
              {lang === "bn" ? "লক্ষ্য লক বৈশিষ্ট্য" : "Goal Lock Feature"}
            </div>
            <div className="text-xs text-foreground/50">
              {lang === "bn"
                ? "লক্ষ্য পূরণের আগে উত্তোলন বন্ধ"
                : "Block withdrawals before goal completion"}
            </div>
          </div>
          <button
            onClick={() => handleToggle("goalLock")}
            className={`relative w-12 h-6 rounded-full transition ${settings.goalLock ? "bg-primary" : "bg-border"}`}
          >
            <div
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.goalLock ? "right-0.5" : "left-0.5"}`}
            />
          </button>
        </div>
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
            {
              key: "bkashEnabled",
              label: "bKash",
              desc: "বিকাশ মোবাইল ব্যাংকিং",
              connected: true,
            },
            {
              key: "nagadEnabled",
              label: "Nagad",
              desc: "নগদ মোবাইল ফিনান্সিয়াল",
              connected: true,
            },
            {
              key: "rocketEnabled",
              label: "Rocket",
              desc: "ডাচ বাংলা রকেট",
              connected: false,
            },
            {
              key: "bankEnabled",
              label: "ব্যাংক ট্রান্সফার",
              desc: "সরাসরি ব্যাংক অ্যাকাউন্ট ট্রান্সফার",
              connected: false,
            },
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
                {gateway.connected && (
                  <span className="text-xs text-green-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    সংযুক্ত
                  </span>
                )}
                <button
                  onClick={() => handleToggle(gateway.key)}
                  className={`relative w-12 h-6 rounded-full transition ${settings[gateway.key] ? "bg-primary" : "bg-border"}`}
                >
                  <div
                    className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings[gateway.key] ? "right-0.5" : "left-0.5"}`}
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
            <input
              value={settings.depositFee}
              onChange={(e) => handleInputChange("depositFee", e.target.value)}
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
            />{" "}
            %
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
            <input
              value={settings.withdrawalFee}
              onChange={(e) =>
                handleInputChange("withdrawalFee", e.target.value)
              }
              className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-28"
            />{" "}
            %
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
          {
            key: "emailNotification",
            label: "ইমেইল বিজ্ঞপ্তি",
            desc: "ইমেইলে লেনদেন আপডেট পাঠানো",
          },
          {
            key: "smsNotification",
            label: "SMS বিজ্ঞপ্তি",
            desc: "SMS-এ গুরুত্বপূর্ণ আপডেট",
          },
          {
            key: "pushNotification",
            label: "পুশ নোটিফিকেশন",
            desc: "অ্যাপ পুশ বিজ্ঞপ্তি",
          },
          {
            key: "monthlyReport",
            label: "মাসিক রিপোর্ট",
            desc: "মাসিক সঞ্চয় রিপোর্ট ইমেইল",
          },
          {
            key: "marketingEmail",
            label: "মার্কেটিং ইমেইল",
            desc: "অফার ও প্রচারমূলক বার্তা",
          },
        ].map((notif) => (
          <div key={notif.key} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">
                {notif.label}
              </div>
              <div className="text-xs text-foreground/50">{notif.desc}</div>
            </div>
            <button
              onClick={() => handleToggle(notif.key)}
              className={`relative w-12 h-6 rounded-full transition ${settings[notif.key] ? "bg-primary" : "bg-border"}`}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings[notif.key] ? "right-0.5" : "left-0.5"}`}
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
            onClick={() => handleToggle("twoFactorAuth")}
            className={`relative w-12 h-6 rounded-full transition ${settings.twoFactorAuth ? "bg-primary" : "bg-border"}`}
          >
            <div
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.twoFactorAuth ? "right-0.5" : "left-0.5"}`}
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
            onClick={() => handleToggle("pinRequired")}
            className={`relative w-12 h-6 rounded-full transition ${settings.pinRequired ? "bg-primary" : "bg-border"}`}
          >
            <div
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.pinRequired ? "right-0.5" : "left-0.5"}`}
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
            value={settings.sessionTimeout}
            onChange={(e) =>
              handleInputChange("sessionTimeout", e.target.value)
            }
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
            value={settings.maxLoginAttempts}
            onChange={(e) =>
              handleInputChange("maxLoginAttempts", e.target.value)
            }
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
            onClick={() => handleToggle("ipLogging")}
            className={`relative w-12 h-6 rounded-full transition ${settings.ipLogging ? "bg-primary" : "bg-border"}`}
          >
            <div
              className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.ipLogging ? "right-0.5" : "left-0.5"}`}
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
              onClick={() => handleToggle("maintenanceMode")}
              className={`relative w-12 h-6 rounded-full transition ${settings.maintenanceMode ? "bg-primary" : "bg-border"}`}
            >
              <div
                className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${settings.maintenanceMode ? "right-0.5" : "left-0.5"}`}
              />
            </button>
          </div>
          <div>
            <div className="font-medium text-sm text-foreground mb-1">
              {lang === "bn" ? "রক্ষণাবেক্ষণ বার্তা" : "Maintenance Message"}
            </div>
            <textarea
              value={settings.maintenanceMessage}
              onChange={(e) =>
                handleInputChange("maintenanceMessage", e.target.value)
              }
              rows={3}
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary resize-none"
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">
            {lang === "bn" ? "ডেটাবেজ ব্যাকআপ" : "Database Backup"}
          </h3>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="font-medium text-sm text-foreground">
                {lang === "bn" ? "স্বয়ংক্রিয় ব্যাকআপ" : "Automatic Backup"}
              </div>
              <div className="text-xs text-foreground/50">
                {lang === "bn" ? "প্রতিদিন রাত ২টায়" : "Every day at 2 AM"}
              </div>
            </div>
            <button
              onClick={() => {}}
              className={`relative w-12 h-6 rounded-full transition bg-primary`}
            >
              <div className="absolute w-5 h-5 rounded-full bg-white top-0.5 right-0.5" />
            </button>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() =>
                showToast(
                  lang === "bn"
                    ? "💾 ব্যাকআপ শুরু হয়েছে..."
                    : "💾 Backup has started...",
                )
              }
              className="flex-1 py-2 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition"
            >
              💾 {lang === "bn" ? "এখনই ব্যাকআপ করুন" : "Backup Now"}
            </button>
            <button
              onClick={downloadBackup}
              className="flex-1 py-2 rounded-lg border border-border text-foreground/70 text-sm font-semibold hover:border-primary transition"
            >
              📥 {lang === "bn" ? "ব্যাকআপ ডাউনলোড" : "Download Backup"}
            </button>
          </div>
        </div>
      </div>
      <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex gap-3">
        <AlertTriangle size={18} className="text-red-500 shrink-0" />
        <div>
          <strong className="text-sm text-foreground">
            {lang === "bn" ? "বিপদজনক জোন" : "Danger Zone"}
          </strong>
          <p className="text-xs text-foreground/60">
            {lang === "bn"
              ? "নিচের কাজগুলো অপরিবর্তনীয়। সতর্কতার সাথে ব্যবহার করুন।"
              : "The actions below are irreversible. Use them carefully."}
          </p>
        </div>
      </div>
      <div className="flex gap-3">
        <button
          onClick={clearCache}
          className="flex-1 py-2 rounded-lg border border-red-500/30 text-red-500 text-sm font-semibold hover:bg-red-500/10 transition"
        >
          {lang === "bn" ? "ক্যাশ পরিষ্কার করুন" : "Clear Cache"}
        </button>
        <button
          onClick={deleteLogs}
          className="flex-1 py-2 rounded-lg border border-red-500/30 text-red-500 text-sm font-semibold hover:bg-red-500/10 transition"
        >
          {lang === "bn" ? "লগ মুছুন" : "Delete Logs"}
        </button>
      </div>
    </div>
  );

  const renderActivePanel = () => {
    switch (activePanel) {
      case "general":
        return renderGeneralPanel();
      case "savings":
        return renderSavingsPanel();
      case "payment":
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
            onClick={() =>
              showToast(
                lang === "bn"
                  ? "↩️ পরিবর্তন বাতিল হয়েছে"
                  : "↩️ Changes cancelled",
              )
            }
            className="px-3 py-1.5 rounded-lg border border-border text-foreground/70 text-xs font-semibold hover:border-primary transition"
          >
            {lang === "bn" ? "বাতিল" : "Cancel"}
          </button>
          <button
            onClick={saveSettings}
            className="px-3 py-1.5 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs font-semibold flex items-center gap-1"
          >
            <Save size={12} /> {lang === "bn" ? "সংরক্ষণ" : "Save"}
          </button>
        </div>
      </div>

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
