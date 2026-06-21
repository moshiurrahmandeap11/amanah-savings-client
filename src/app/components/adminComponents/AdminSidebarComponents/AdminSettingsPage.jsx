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
  Gift,
} from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Page Title
    systemSettings: "System Settings",
    
    // Buttons
    save: "Save",
    cancel: "Cancel",
    en: "EN",
    bn: "BN",
    
    // Panels
    general: "General",
    savingsRules: "Savings Rules",
    paymentGateway: "Payment Gateway",
    notifications: "Notifications",
    security: "Security",
    referrals: "Referral Bonus",
    maintenance: "Maintenance",
    referralSettings: "Referral Bonus Settings",
    referralSettingsDesc: "Control referral reward amount and unlock rule",
    referralBonusAmount: "Referral Bonus Amount",
    referralBonusAmountDesc: "Amount credited after a successful referral",
    referralMinimumDeposit: "Minimum Deposit to Unlock Bonus",
    referralMinimumDepositDesc: "Referred user must deposit at least this amount",
    
    // General Panel
    siteInformation: "Site Information",
    updatePlatformBasics: "Update the platform basics",
    platformName: "Platform Name",
    platformNameDesc: "What users will see",
    websiteUrl: "Website URL",
    websiteUrlDesc: "Primary domain address",
    contactEmail: "Contact Email",
    contactEmailDesc: "Support email address",
    language: "Language",
    languageDesc: "Default platform language",
    currency: "Currency",
    currencyDesc: "Transaction currency",
    systemStatus: "System Status",
    
    // Savings Panel
    savingsLimitsRules: "Savings Limits & Rules",
    depositWithdrawalLimits: "Deposit and withdrawal limits",
    minDeposit: "Minimum Deposit Amount",
    minDepositDesc: "Minimum amount per deposit",
    maxSingleDeposit: "Maximum Single Deposit",
    maxSingleDepositDesc: "Highest deposit at once",
    dailyDepositLimit: "Daily Deposit Limit",
    dailyDepositLimitDesc: "Maximum total deposit per day",
    minWithdrawal: "Minimum Withdrawal",
    minWithdrawalDesc: "Minimum withdrawal amount",
    islamicMode: "Islamic Mode",
    islamicModeDesc: "Enable interest-free savings option",
    goalLock: "Goal Lock Feature",
    goalLockDesc: "Block withdrawals before goal completion",
    
    // Payment Panel
    paymentGatewayTitle: "Payment Gateway",
    manageActiveMethods: "Manage active payment methods",
    depositFee: "Deposit Fee",
    depositFeeDesc: "Deduction on each deposit (%)",
    withdrawalFee: "Withdrawal Fee",
    withdrawalFeeDesc: "Deduction on each withdrawal (%)",
    feeStructure: "Fee Structure",
    
    // Notifications Panel
    notificationSettings: "Notification Settings",
    emailNotification: "Email Notification",
    emailNotificationDesc: "Send transaction updates via email",
    smsNotification: "SMS Notification",
    smsNotificationDesc: "Important updates via SMS",
    pushNotification: "Push Notification",
    pushNotificationDesc: "App push notifications",
    monthlyReport: "Monthly Report",
    monthlyReportDesc: "Monthly savings report via email",
    marketingEmail: "Marketing Email",
    marketingEmailDesc: "Offers and promotional messages",
    
    // Security Panel
    securitySettings: "Security Settings",
    twoFactorAuth: "Two-Step Verification (2FA)",
    twoFactorAuthDesc: "OTP required for login",
    pinRequired: "PIN Required",
    pinRequiredDesc: "PIN verification for transactions",
    sessionTimeout: "Session Timeout (minutes)",
    sessionTimeoutDesc: "Automatic logout after inactivity",
    maxLoginAttempts: "Maximum Login Attempts",
    maxLoginAttemptsDesc: "Max failures before blocking",
    ipLogging: "IP Logging",
    ipLoggingDesc: "Record login IP address",
    
    // Maintenance Panel
    warning: "Warning",
    maintenanceWarning: "When maintenance mode is enabled, all users will be temporarily unable to use the platform.",
    maintenanceMode: "Maintenance Mode",
    maintenanceModeDesc: "Keep the site temporarily closed",
    maintenanceMessage: "Maintenance Message",
    maintenanceMessagePlaceholder: "Enter maintenance message...",
    
    // Toast Messages
    settingsSaved: "✅ Settings saved successfully",
    settingsLoadFailed: "Failed to load settings",
    saveFailed: "Save failed",
    backupDownloadComplete: "✅ Backup download complete!",
    cacheCleared: "🗑️ Cache cleared",
    logsDeleted: "🗑️ All logs have been deleted",
    changesCancelled: "↩️ Changes cancelled",
    
    // Status
    enabled: "Enabled",
    disabled: "Disabled",
    active: "Active",
    inactive: "Inactive",
  },
  bn: {
    // Page Title
    systemSettings: "সিস্টেম সেটিংস",
    
    // Buttons
    save: "সংরক্ষণ",
    cancel: "বাতিল",
    en: "EN",
    bn: "BN",
    
    // Panels
    general: "সাধারণ",
    savingsRules: "সঞ্চয় নিয়ম",
    paymentGateway: "পেমেন্ট গেটওয়ে",
    notifications: "বিজ্ঞপ্তি",
    security: "নিরাপত্তা",
    referrals: "রেফারেল বোনাস",
    maintenance: "রক্ষণাবেক্ষণ",
    referralSettings: "রেফারেল বোনাস সেটিংস",
    referralSettingsDesc: "রেফারেল পুরস্কার এবং আনলক নিয়ম নিয়ন্ত্রণ করুন",
    referralBonusAmount: "রেফারেল বোনাসের পরিমাণ",
    referralBonusAmountDesc: "সফল রেফারেলের পর যে টাকা ক্রেডিট হবে",
    referralMinimumDeposit: "বোনাস আনলকের ন্যূনতম ডিপোজিট",
    referralMinimumDepositDesc: "রেফার্ড ইউজারকে কমপক্ষে এই পরিমাণ জমা দিতে হবে",
    
    // General Panel
    siteInformation: "সাইট তথ্য",
    updatePlatformBasics: "প্ল্যাটফর্মের মৌলিক তথ্য পরিবর্তন করুন",
    platformName: "প্ল্যাটফর্মের নাম",
    platformNameDesc: "ব্যবহারকারীরা যা দেখবেন",
    websiteUrl: "ওয়েবসাইট URL",
    websiteUrlDesc: "মূল ডোমেইন ঠিকানা",
    contactEmail: "যোগাযোগ ইমেইল",
    contactEmailDesc: "সাপোর্ট ইমেইল ঠিকানা",
    language: "ভাষা",
    languageDesc: "ডিফল্ট প্ল্যাটফর্ম ভাষা",
    currency: "মুদ্রা",
    currencyDesc: "লেনদেনের মুদ্রা",
    systemStatus: "সিস্টেম অবস্থা",
    
    // Savings Panel
    savingsLimitsRules: "সঞ্চয় সীমা ও নিয়ম",
    depositWithdrawalLimits: "জমা ও উত্তোলনের সীমাবদ্ধতা",
    minDeposit: "সর্বনিম্ন জমা পরিমাণ",
    minDepositDesc: "প্রতিটি জমার ন্যূনতম টাকা",
    maxSingleDeposit: "সর্বোচ্চ একক জমা",
    maxSingleDepositDesc: "একবারে সর্বোচ্চ জমা",
    dailyDepositLimit: "দৈনিক জমা সীমা",
    dailyDepositLimitDesc: "প্রতিদিন সর্বোচ্চ মোট জমা",
    minWithdrawal: "সর্বনিম্ন উত্তোলন",
    minWithdrawalDesc: "সর্বনিম্ন উত্তোলন পরিমাণ",
    islamicMode: "ইসলামিক মোড",
    islamicModeDesc: "সুদমুক্ত সঞ্চয় বিকল্প চালু",
    goalLock: "লক্ষ্য লক বৈশিষ্ট্য",
    goalLockDesc: "লক্ষ্য পূরণের আগে উত্তোলন বন্ধ",
    
    // Payment Panel
    paymentGatewayTitle: "পেমেন্ট গেটওয়ে",
    manageActiveMethods: "সক্রিয় পেমেন্ট পদ্ধতি পরিচালনা",
    depositFee: "জমা ফি",
    depositFeeDesc: "প্রতিটি জমায় কর্তন (%)",
    withdrawalFee: "উত্তোলন ফি",
    withdrawalFeeDesc: "প্রতিটি উত্তোলনে কর্তন (%)",
    feeStructure: "ফি কাঠামো",
    
    // Notifications Panel
    notificationSettings: "বিজ্ঞপ্তি সেটিংস",
    emailNotification: "ইমেইল বিজ্ঞপ্তি",
    emailNotificationDesc: "ইমেইলে লেনদেন আপডেট পাঠানো",
    smsNotification: "SMS বিজ্ঞপ্তি",
    smsNotificationDesc: "SMS-এ গুরুত্বপূর্ণ আপডেট",
    pushNotification: "পুশ নোটিফিকেশন",
    pushNotificationDesc: "অ্যাপ পুশ বিজ্ঞপ্তি",
    monthlyReport: "মাসিক রিপোর্ট",
    monthlyReportDesc: "মাসিক সঞ্চয় রিপোর্ট ইমেইল",
    marketingEmail: "মার্কেটিং ইমেইল",
    marketingEmailDesc: "অফার ও প্রচারমূলক বার্তা",
    
    // Security Panel
    securitySettings: "নিরাপত্তা সেটিংস",
    twoFactorAuth: "দুই-ধাপ যাচাই (2FA)",
    twoFactorAuthDesc: "লগইনে OTP বাধ্যতামূলক",
    pinRequired: "PIN প্রয়োজন",
    pinRequiredDesc: "লেনদেনে PIN যাচাই",
    sessionTimeout: "সেশন সময়সীমা (মিনিট)",
    sessionTimeoutDesc: "নিষ্ক্রিয়তায় স্বয়ংক্রিয় লগআউট",
    maxLoginAttempts: "সর্বোচ্চ লগইন প্রচেষ্টা",
    maxLoginAttemptsDesc: "ব্লক করার আগে সর্বোচ্চ ব্যর্থতা",
    ipLogging: "IP লগিং",
    ipLoggingDesc: "লগইন IP ঠিকানা রেকর্ড",
    
    // Maintenance Panel
    warning: "সতর্কতা",
    maintenanceWarning: "রক্ষণাবেক্ষণ মোড চালু করলে সকল ব্যবহারকারী সাময়িক প্ল্যাটফর্ম ব্যবহার করতে পারবে না।",
    maintenanceMode: "রক্ষণাবেক্ষণ মোড",
    maintenanceModeDesc: "সাইট সাময়িক বন্ধ রাখুন",
    maintenanceMessage: "রক্ষণাবেক্ষণ বার্তা",
    maintenanceMessagePlaceholder: "রক্ষণাবেক্ষণ বার্তা লিখুন...",
    
    // Toast Messages
    settingsSaved: "✅ সেটিংস সফলভাবে সংরক্ষিত হয়েছে",
    settingsLoadFailed: "সেটিংস লোড করতে ব্যর্থ হয়েছে",
    saveFailed: "সংরক্ষণ করতে ব্যর্থ হয়েছে",
    backupDownloadComplete: "✅ ব্যাকআপ ডাউনলোড সম্পন্ন!",
    cacheCleared: "🗑️ ক্যাশ পরিষ্কার করা হয়েছে",
    logsDeleted: "🗑️ সকল লগ মুছে ফেলা হয়েছে",
    changesCancelled: "↩️ পরিবর্তন বাতিল করা হয়েছে",
    
    // Status
    enabled: "সক্রিয়",
    disabled: "নিষ্ক্রিয়",
    active: "সক্রিয়",
    inactive: "নিষ্ক্রিয়",
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const getInitialAdminLang = () => {
  if (typeof window === "undefined") return "bn";
  return localStorage.getItem("admin_lang") || "bn";
};

const getInitialTheme = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("theme") === "dark";
};

const defaultPaymentInstructions = {
  en: {
    title: "Payment Instructions",
    sendMoneyToLabel: "Send money to:",
    sendMoneyTo: "018XXXXXXXX",
    amountLabel: "Amount:",
    amountValue: "৳{amount}",
    referenceLabel: "Reference:",
    reference: "DEV-TEST-DEPOSIT",
  },
  bn: {
    title: "পেমেন্ট নির্দেশনা",
    sendMoneyToLabel: "টাকা পাঠান:",
    sendMoneyTo: "018XXXXXXXX",
    amountLabel: "পরিমাণ:",
    amountValue: "৳{amount}",
    referenceLabel: "রেফারেন্স:",
    reference: "DEV-TEST-DEPOSIT",
  },
};

const AdminSettingsPage = () => {
  const [isDark, setIsDark] = useState(getInitialTheme);
  const [lang, setLang] = useState(getInitialAdminLang);
  const [activePanel, setActivePanel] = useState("general");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [settings, setSettings] = useState({
    general: {},
    savings: {},
    payments: {},
    notifications: {},
    security: {},
    referrals: {},
    maintenance: {},
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const showToast = useCallback((message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  }, []);

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/settings", { headers: getAuthHeaders() });
      if (res.data.success) {
        const backendData = res.data.data;
        
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
            instructions: {
              en: {
                ...defaultPaymentInstructions.en,
                ...(backendData.payments?.instructions?.en || {}),
              },
              bn: {
                ...defaultPaymentInstructions.bn,
                ...(backendData.payments?.instructions?.bn || {}),
              },
            },
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
          referrals: {
            bonusAmount: backendData.referrals?.bonusAmount || 500,
            minimumDeposit: backendData.referrals?.minimumDeposit || 500,
          },
          maintenance: {
            maintenanceMode: backendData.maintenance?.mode || false,
            maintenanceMessage: backendData.maintenance?.message || "We're currently performing scheduled maintenance. Please check back soon.",
          },
        });
      }
    } catch (err) {
      console.error("Fetch settings error:", err);
      const fallbackMessage = translations[lang]?.settingsLoadFailed || translations.en.settingsLoadFailed;
      showToast(err.response?.data?.message || fallbackMessage);
    } finally {
      setLoading(false);
    }
  }, [lang, showToast]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
    queueMicrotask(() => {
      fetchSettings();
    });
  }, [fetchSettings, isDark]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
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

  const handlePaymentInstructionChange = (instructionLang, key, value) => {
    setSettings((prev) => ({
      ...prev,
      payments: {
        ...prev.payments,
        instructions: {
          en: {
            ...defaultPaymentInstructions.en,
            ...(prev.payments?.instructions?.en || {}),
          },
          bn: {
            ...defaultPaymentInstructions.bn,
            ...(prev.payments?.instructions?.bn || {}),
          },
          [instructionLang]: {
            ...defaultPaymentInstructions[instructionLang],
            ...(prev.payments?.instructions?.[instructionLang] || {}),
            [key]: value,
          },
        },
      },
    }));
  };

  const saveSettings = async () => {
    setSaving(true);
    try {
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
          instructions: {
            en: {
              ...defaultPaymentInstructions.en,
              ...(settings.payments.instructions?.en || {}),
            },
            bn: {
              ...defaultPaymentInstructions.bn,
              ...(settings.payments.instructions?.bn || {}),
            },
          },
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
        referrals: {
          bonusAmount: parseInt(settings.referrals.bonusAmount) || 500,
          minimumDeposit: parseInt(settings.referrals.minimumDeposit) || 500,
        },
        maintenance: {
          mode: settings.maintenance.maintenanceMode,
          message: settings.maintenance.maintenanceMessage,
          allowedIps: [],
        },
      };

      const res = await axiosInstance.put("/admin/settings", payload, { headers: getAuthHeaders() });
      
      if (res.data.success) {
        showToast(t('settingsSaved'));
        fetchSettings();
      }
    } catch (err) {
      console.error("Save settings error:", err);
      showToast(err.response?.data?.message || t('saveFailed'));
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
    showToast(t('backupDownloadComplete'));
  };

  const clearCache = () => {
    showToast(t('cacheCleared'));
  };

  const deleteLogs = () => {
    showToast(t('logsDeleted'));
  };

  const cancelChanges = () => {
    fetchSettings();
    showToast(t('changesCancelled'));
  };

  const panels = [
    {
      id: "general",
      label: t('general'),
      icon: <Settings size={16} />,
      labelEn: "General",
    },
    {
      id: "savings",
      label: t('savingsRules'),
      icon: <Database size={16} />,
      labelEn: "Savings Rules",
    },
    {
      id: "payments",
      label: t('paymentGateway'),
      icon: <CreditCard size={16} />,
      labelEn: "Payment Gateway",
    },
    {
      id: "notifications",
      label: t('notifications'),
      icon: <Bell size={16} />,
      labelEn: "Notifications",
    },
    {
      id: "security",
      label: t('security'),
      icon: <Shield size={16} />,
      labelEn: "Security",
    },
    {
      id: "referrals",
      label: t('referrals'),
      icon: <Gift size={16} />,
      labelEn: "Referral Bonus",
    },
    {
      id: "maintenance",
      label: t('maintenance'),
      icon: <Wrench size={16} />,
      labelEn: "Maintenance",
    },
  ];

  const renderGeneralPanel = () => (
    <div className="space-y-5">
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">{t('siteInformation')}</h3>
          <p className="text-xs text-foreground/50">{t('updatePlatformBasics')}</p>
        </div>
        <div className="p-4 space-y-4">
          {[
            { key: "platformName", labelBn: t('platformName'), labelEn: "Platform Name", descBn: t('platformNameDesc'), descEn: "What users will see" },
            { key: "websiteUrl", labelBn: t('websiteUrl'), labelEn: "Website URL", descBn: t('websiteUrlDesc'), descEn: "Primary domain address" },
            { key: "contactEmail", labelBn: t('contactEmail'), labelEn: "Contact Email", descBn: t('contactEmailDesc'), descEn: "Support email address" },
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
              <div className="font-medium text-sm text-foreground">{t('language')}</div>
              <div className="text-xs text-foreground/50">{t('languageDesc')}</div>
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
              <div className="font-medium text-sm text-foreground">{t('currency')}</div>
              <div className="text-xs text-foreground/50">{t('currencyDesc')}</div>
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
          <h3 className="font-semibold text-foreground">{t('systemStatus')}</h3>
        </div>
      </div>
    </div>
  );

  const renderSavingsPanel = () => (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">{t('savingsLimitsRules')}</h3>
        <p className="text-xs text-foreground/50">{t('depositWithdrawalLimits')}</p>
      </div>
      <div className="p-4 space-y-4">
        {[
          { key: "minDeposit", labelBn: t('minDeposit'), labelEn: "Minimum Deposit Amount", descBn: t('minDepositDesc'), descEn: "Minimum amount per deposit" },
          { key: "maxSingleDeposit", labelBn: t('maxSingleDeposit'), labelEn: "Maximum Single Deposit", descBn: t('maxSingleDepositDesc'), descEn: "Highest deposit at once" },
          { key: "dailyDepositLimit", labelBn: t('dailyDepositLimit'), labelEn: "Daily Deposit Limit", descBn: t('dailyDepositLimitDesc'), descEn: "Maximum total deposit per day" },
          { key: "withdrawalDelay", labelBn: t('minWithdrawal'), labelEn: "Minimum Withdrawal", descBn: t('minWithdrawalDesc'), descEn: "Minimum withdrawal amount" },
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
          { key: "islamicMode", labelBn: t('islamicMode'), labelEn: "Islamic Mode", descBn: t('islamicModeDesc'), descEn: "Enable interest-free savings option" },
          { key: "goalLock", labelBn: t('goalLock'), labelEn: "Goal Lock Feature", descBn: t('goalLockDesc'), descEn: "Block withdrawals before goal completion" },
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
          <h3 className="font-semibold text-foreground">{t('paymentGatewayTitle')}</h3>
          <p className="text-xs text-foreground/50">{t('manageActiveMethods')}</p>
        </div>
        <div className="p-4 space-y-4">
          {[
            { key: "bkashEnabled", label: "bKash", desc: "বিকাশ মোবাইল ব্যাংকিং" },
            { key: "nagadEnabled", label: "Nagad", desc: "নগদ মোবাইল ফিনান্সিয়াল" },
            { key: "rocketEnabled", label: "Rocket", desc: "ডাচ বাংলা রকেট" },
            { key: "bankEnabled", label: "ব্যাংক ট্রান্সফার", desc: "সরাসরি ব্যাংক অ্যাকাউন্ট ট্রান্সফার" },
          ].map((gateway) => (
            <div key={gateway.key} className="flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-foreground">{gateway.label}</div>
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
          <h3 className="font-semibold text-foreground">Payment Instructions</h3>
          <p className="text-xs text-foreground/50">Shown on the user deposit submit page</p>
        </div>
        <div className="p-4 grid gap-5 lg:grid-cols-2">
          {[
            { code: "en", label: "English" },
            { code: "bn", label: "Bangla" },
          ].map((instructionLang) => (
            <div key={instructionLang.code} className="space-y-3">
              <div className="text-sm font-semibold text-foreground">{instructionLang.label}</div>
              {[
                { key: "title", label: "Title" },
                { key: "sendMoneyToLabel", label: "Send Money Label" },
                { key: "sendMoneyTo", label: "Send Money Number" },
                { key: "amountLabel", label: "Amount Label" },
                { key: "amountValue", label: "Amount Text", hint: "Use {amount} for the entered deposit amount" },
                { key: "referenceLabel", label: "Reference Label" },
                { key: "reference", label: "Reference Text" },
              ].map((field) => (
                <label key={field.key} className="block">
                  <span className="mb-1 block text-xs font-medium text-foreground/60">{field.label}</span>
                  <input
                    value={
                      settings.payments?.instructions?.[instructionLang.code]?.[field.key]
                      ?? defaultPaymentInstructions[instructionLang.code][field.key]
                    }
                    onChange={(e) => handlePaymentInstructionChange(instructionLang.code, field.key, e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                  />
                  {field.hint && (
                    <span className="mt-1 block text-[11px] text-foreground/40">{field.hint}</span>
                  )}
                </label>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">{t('feeStructure')}</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">{t('depositFee')}</div>
              <div className="text-xs text-foreground/50">{t('depositFeeDesc')}</div>
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
              <div className="font-medium text-sm text-foreground">{t('withdrawalFee')}</div>
              <div className="text-xs text-foreground/50">{t('withdrawalFeeDesc')}</div>
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
        <h3 className="font-semibold text-foreground">{t('notificationSettings')}</h3>
      </div>
      <div className="p-4 space-y-4">
        {[
          { key: "emailNotification", label: t('emailNotification'), desc: t('emailNotificationDesc') },
          { key: "smsNotification", label: t('smsNotification'), desc: t('smsNotificationDesc') },
          { key: "pushNotification", label: t('pushNotification'), desc: t('pushNotificationDesc') },
          { key: "monthlyReport", label: t('monthlyReport'), desc: t('monthlyReportDesc') },
          { key: "marketingEmail", label: t('marketingEmail'), desc: t('marketingEmailDesc') },
        ].map((notif) => (
          <div key={notif.key} className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">{notif.label}</div>
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
        <h3 className="font-semibold text-foreground">{t('securitySettings')}</h3>
      </div>
      <div className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="font-medium text-sm text-foreground">{t('twoFactorAuth')}</div>
            <div className="text-xs text-foreground/50">{t('twoFactorAuthDesc')}</div>
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
            <div className="font-medium text-sm text-foreground">{t('pinRequired')}</div>
            <div className="text-xs text-foreground/50">{t('pinRequiredDesc')}</div>
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
            <div className="font-medium text-sm text-foreground">{t('sessionTimeout')}</div>
            <div className="text-xs text-foreground/50">{t('sessionTimeoutDesc')}</div>
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
            <div className="font-medium text-sm text-foreground">{t('maxLoginAttempts')}</div>
            <div className="text-xs text-foreground/50">{t('maxLoginAttemptsDesc')}</div>
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
            <div className="font-medium text-sm text-foreground">{t('ipLogging')}</div>
            <div className="text-xs text-foreground/50">{t('ipLoggingDesc')}</div>
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

  const renderReferralsPanel = () => (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="font-semibold text-foreground">{t('referralSettings')}</h3>
        <p className="text-xs text-foreground/50">{t('referralSettingsDesc')}</p>
      </div>
      <div className="p-4 space-y-4">
        {[
          {
            key: "bonusAmount",
            label: t('referralBonusAmount'),
            desc: t('referralBonusAmountDesc'),
          },
          {
            key: "minimumDeposit",
            label: t('referralMinimumDeposit'),
            desc: t('referralMinimumDepositDesc'),
          },
        ].map((field) => (
          <div key={field.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <div className="font-medium text-sm text-foreground">{field.label}</div>
              <div className="text-xs text-foreground/50">{field.desc}</div>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-foreground/60">৳</span>
              <input
                type="number"
                min="0"
                value={settings.referrals?.[field.key] || ""}
                onChange={(e) => handleInputChange("referrals", field.key, e.target.value)}
                className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary w-32"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMaintenancePanel = () => (
    <div className="space-y-5">
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex gap-3">
        <AlertTriangle size={18} className="text-amber-500 shrink-0" />
        <div>
          <strong className="text-sm text-foreground">{t('warning')}</strong>
          <p className="text-xs text-foreground/60">{t('maintenanceWarning')}</p>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h3 className="font-semibold text-foreground">{t('maintenanceMode')}</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm text-foreground">{t('maintenanceMode')}</div>
              <div className="text-xs text-foreground/50">{t('maintenanceModeDesc')}</div>
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
            <div className="font-medium text-sm text-foreground mb-1">{t('maintenanceMessage')}</div>
            <textarea
              value={settings.maintenance?.maintenanceMessage || ""}
              onChange={(e) => handleInputChange("maintenance", "maintenanceMessage", e.target.value)}
              rows={3}
              placeholder={t('maintenanceMessagePlaceholder')}
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
      case "referrals":
        return renderReferralsPanel();
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
        <h1 className="text-base font-bold text-foreground">{t('systemSettings')}</h1>
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
            {t('cancel')}
          </button>
          <button
            onClick={saveSettings}
            disabled={saving}
            className="px-3 py-1.5 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-xs font-semibold flex items-center gap-1 disabled:opacity-50"
          >
            {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
            {t('save')}
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
