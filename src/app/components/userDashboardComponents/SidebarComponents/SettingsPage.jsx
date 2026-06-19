"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Moon, Sun, Bell, BellRing, Mail, Sms, Shield, 
  Fingerprint, Clock, Download, Trash2, Loader2,
  CheckCircle, XCircle, Globe, Smartphone, Laptop
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

import Swal from "sweetalert2";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Page Title
    pageTitle: "⚙️ Settings",
    
    // Account Summary
    level: "Level {level}",
    
    // Display Settings
    display: "🎨 Display",
    darkTheme: "Dark Theme",
    darkThemeDesc: "Dark mode for night viewing",
    language: "Language / ভাষা",
    languageDesc: "Bengali or English",
    english: "English",
    bengali: "বাংলা",
    
    // Notification Settings
    notifications: "🔔 Notifications",
    depositReminder: "Deposit Reminder",
    depositReminderDesc: "SMS before due date",
    streakAlert: "Streak Alert",
    streakAlertDesc: "Notification before streak breaks",
    referralUpdate: "Referral Update",
    referralUpdateDesc: "Notify when friend joins",
    promotionalMessages: "Promotional Messages",
    promotionalDesc: "Offers & updates",
    emailNotifications: "Email Notifications",
    emailDesc: "Receive emails about your account",
    smsNotifications: "SMS Notifications",
    smsDesc: "Get SMS alerts",
    pushNotifications: "Push Notifications",
    pushDesc: "Receive push notifications on your device",
    enabled: "enabled",
    disabled: "disabled",
    
    // App Settings
    appSettings: "📱 App Settings",
    biometricLogin: "Biometric Login",
    biometricDesc: "Fingerprint / Face unlock",
    autoLock: "Auto-Lock",
    autoLockDesc: "Lock after 5 minutes inactivity",
    
    // Quick Actions
    quickActions: "🔗 Quick Actions",
    notificationSettings: "Notification Settings",
    changePin: "Change PIN",
    downloadMyData: "Download My Data",
    exportTransactions: "Export Transactions",
    supportTicket: "Support Ticket",
    installApp: "Install App",
    
    // Danger Zone
    dangerZone: "⚠️ Danger Zone",
    dangerDesc: "These actions are irreversible. Please proceed with caution.",
    deleteAccount: "🗑️ Delete Account",
    
    // App Version
    appVersion: "Sonchoy Bondhu App v2.0.0",
    copyright: "© 2026 Sanchoy Bondhu. All rights reserved.",
    
    // Change PIN Modal
    changePinTitle: "Change PIN",
    currentPin: "Current PIN",
    enterCurrentPin: "Enter current PIN",
    newPin: "New PIN",
    enterNewPin: "Enter new PIN",
    confirmNewPin: "Confirm New PIN",
    confirmPinPlaceholder: "Confirm new PIN",
    changePinButton: "Change PIN",
    cancel: "Cancel",
    allFieldsRequired: "All fields are required",
    pinMustBe6Digits: "PIN must be 6 digits",
    pinsDoNotMatch: "New PINs do not match",
    
    // Delete Account Modal
    deleteAccountTitle: "Delete Account?",
    irreversible: "⚠️ This action is irreversible!",
    deletingWill: "Deleting your account will:",
    removePersonalData: "Remove all your personal data",
    deleteGoals: "Delete all your savings goals",
    removeTransactions: "Remove all transaction history",
    cannotRecover: "You cannot recover this data",
    typeDelete: "Type \"DELETE\" to confirm",
    deletePlaceholder: "DELETE",
    confirmDelete: "Delete Account",
    accountDeleted: "Account Deleted",
    accountDeletedMsg: "Your account has been permanently deleted. We're sad to see you go.",
    
    // Download Data
    downloadDataTitle: "Download Your Data",
    downloadDataMsg: "This will generate a JSON file with all your account data. Are you sure?",
    download: "Download",
    downloadStarted: "Download Started!",
    downloadSuccess: "Your data has been exported successfully.",
    downloadFailed: "Failed to download your data",
    
    // Export Transactions
    transactionsExported: "Transactions Exported!",
    exportSuccess: "Your transaction history has been downloaded.",
    exportFailed: "Failed to export transactions",
    
    // Toast
    darkModeActivated: "Dark mode activated",
    lightModeActivated: "Light mode activated",
    languageChanged: "Language changed to {lang}",
    pinChanged: "PIN changed successfully",
    pinChangeFailed: "Failed to change PIN",
    accountDeletionFailed: "Failed to delete account",
    
    // Theme modes
    dark: "Dark",
    light: "Light",
    modeActivated: "{mode} mode activated",
  },
  bn: {
    // Page Title
    pageTitle: "⚙️ সেটিংস",
    
    // Account Summary
    level: "লেভেল {level}",
    
    // Display Settings
    display: "🎨 প্রদর্শন",
    darkTheme: "ডার্ক থিম",
    darkThemeDesc: "রাতের দেখার জন্য ডার্ক মোড",
    language: "ভাষা",
    languageDesc: "বাংলা অথবা ইংরেজি",
    english: "ইংরেজি",
    bengali: "বাংলা",
    
    // Notification Settings
    notifications: "🔔 বিজ্ঞপ্তি",
    depositReminder: "জমার রিমাইন্ডার",
    depositReminderDesc: "নির্ধারিত তারিখের আগে এসএমএস",
    streakAlert: "স্ট্রিক সতর্কতা",
    streakAlertDesc: "স্ট্রিক ভাঙার আগে বিজ্ঞপ্তি",
    referralUpdate: "রেফারেল আপডেট",
    referralUpdateDesc: "বন্ধু যোগদান করলে জানান",
    promotionalMessages: "প্রচারমূলক বার্তা",
    promotionalDesc: "অফার ও আপডেট",
    emailNotifications: "ইমেইল বিজ্ঞপ্তি",
    emailDesc: "আপনার অ্যাকাউন্ট সম্পর্কে ইমেইল পান",
    smsNotifications: "এসএমএস বিজ্ঞপ্তি",
    smsDesc: "এসএমএস সতর্কতা পান",
    pushNotifications: "পুশ বিজ্ঞপ্তি",
    pushDesc: "আপনার ডিভাইসে পুশ বিজ্ঞপ্তি পান",
    enabled: "সক্রিয়",
    disabled: "নিষ্ক্রিয়",
    
    // App Settings
    appSettings: "📱 অ্যাপ সেটিংস",
    biometricLogin: "বায়োমেট্রিক লগইন",
    biometricDesc: "ফিঙ্গারপ্রিন্ট / ফেস আনলক",
    autoLock: "অটো-লক",
    autoLockDesc: "৫ মিনিট নিষ্ক্রিয়তার পর লক",
    
    // Quick Actions
    quickActions: "🔗 দ্রুত কর্ম",
    notificationSettings: "বিজ্ঞপ্তি সেটিংস",
    changePin: "পিন পরিবর্তন করুন",
    downloadMyData: "আমার ডেটা ডাউনলোড করুন",
    exportTransactions: "লেনদেন এক্সপোর্ট করুন",
    supportTicket: "সাপোর্ট টিকেট",
    installApp: "অ্যাপ ইনস্টল করুন",
    
    // Danger Zone
    dangerZone: "⚠️ বিপদ অঞ্চল",
    dangerDesc: "এই কাজগুলি অপরিবর্তনীয়। সাবধানতার সাথে এগিয়ে যান।",
    deleteAccount: "🗑️ অ্যাকাউন্ট মুছে ফেলুন",
    
    // App Version
    appVersion: "সঞ্চয় বন্ধু অ্যাপ v2.0.0",
    copyright: "© ২০২৬ সঞ্চয় বন্ধু। সর্বস্বত্ব সংরক্ষিত।",
    
    // Change PIN Modal
    changePinTitle: "পিন পরিবর্তন করুন",
    currentPin: "বর্তমান পিন",
    enterCurrentPin: "বর্তমান পিন লিখুন",
    newPin: "নতুন পিন",
    enterNewPin: "নতুন পিন লিখুন",
    confirmNewPin: "নতুন পিন নিশ্চিত করুন",
    confirmPinPlaceholder: "নতুন পিন নিশ্চিত করুন",
    changePinButton: "পিন পরিবর্তন করুন",
    cancel: "বাতিল",
    allFieldsRequired: "সব ঘর পূরণ করা আবশ্যক",
    pinMustBe6Digits: "পিন ৬ সংখ্যার হতে হবে",
    pinsDoNotMatch: "নতুন পিন মিলছে না",
    
    // Delete Account Modal
    deleteAccountTitle: "অ্যাকাউন্ট মুছে ফেলবেন?",
    irreversible: "⚠️ এই কাজটি অপরিবর্তনীয়!",
    deletingWill: "অ্যাকাউন্ট মুছে ফেললে:",
    removePersonalData: "আপনার সব ব্যক্তিগত তথ্য মুছে যাবে",
    deleteGoals: "আপনার সব সঞ্চয় লক্ষ্য মুছে যাবে",
    removeTransactions: "সব লেনদেনের ইতিহাস মুছে যাবে",
    cannotRecover: "এই ডেটা পুনরুদ্ধার করা যাবে না",
    typeDelete: "নিশ্চিত করতে \"DELETE\" টাইপ করুন",
    deletePlaceholder: "DELETE",
    confirmDelete: "অ্যাকাউন্ট মুছে ফেলুন",
    accountDeleted: "অ্যাকাউন্ট মুছে ফেলা হয়েছে",
    accountDeletedMsg: "আপনার অ্যাকাউন্ট স্থায়ীভাবে মুছে ফেলা হয়েছে। আমরা আপনার বিচ্ছেদে দুঃখিত।",
    
    // Download Data
    downloadDataTitle: "আপনার ডেটা ডাউনলোড করুন",
    downloadDataMsg: "এটি আপনার সব অ্যাকাউন্ট ডেটা সহ একটি JSON ফাইল তৈরি করবে। আপনি কি নিশ্চিত?",
    download: "ডাউনলোড",
    downloadStarted: "ডাউনলোড শুরু হয়েছে!",
    downloadSuccess: "আপনার ডেটা সফলভাবে এক্সপোর্ট করা হয়েছে।",
    downloadFailed: "আপনার ডেটা ডাউনলোড করতে ব্যর্থ হয়েছে",
    
    // Export Transactions
    transactionsExported: "লেনদেন এক্সপোর্ট করা হয়েছে!",
    exportSuccess: "আপনার লেনদেনের ইতিহাস ডাউনলোড করা হয়েছে।",
    exportFailed: "লেনদেন এক্সপোর্ট করতে ব্যর্থ হয়েছে",
    
    // Toast
    darkModeActivated: "ডার্ক মোড সক্রিয় করা হয়েছে",
    lightModeActivated: "লাইট মোড সক্রিয় করা হয়েছে",
    languageChanged: "ভাষা পরিবর্তন করা হয়েছে {lang}",
    pinChanged: "পিন সফলভাবে পরিবর্তন করা হয়েছে",
    pinChangeFailed: "পিন পরিবর্তন করতে ব্যর্থ হয়েছে",
    accountDeletionFailed: "অ্যাকাউন্ট মুছে ফেলতে ব্যর্থ হয়েছে",
    
    // Theme modes
    dark: "ডার্ক",
    light: "লাইট",
    modeActivated: "{mode} মোড সক্রিয় করা হয়েছে",
  }
};

const SettingsPage = () => {
  const { user, logout, changePin, updateProfile } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("bn");
  const [notificationSettings, setNotificationSettings] = useState({
    depositReminder: true,
    streakAlert: true,
    referralUpdate: true,
    promotional: false,
    emailNotifications: true,
    smsNotifications: true,
    pushNotifications: true
  });
  const [appSettings, setAppSettings] = useState({
    biometric: false,
    autoLock: true,
    language: "bn"
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    // Load language preference
    const savedLang = localStorage.getItem('appLanguage') || 'bn';
    setLang(savedLang);

    // Load theme preference
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    }

    // Load notification settings
    const savedNotifications = localStorage.getItem("notificationSettings");
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications));
    }

    // Load app settings
    const savedAppSettings = localStorage.getItem("appSettings");
    if (savedAppSettings) {
      setAppSettings(JSON.parse(savedAppSettings));
    }
  }, []);

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
    showToastMessage(t('modeActivated', { mode: newTheme ? t('dark') : t('light') }), "success");
  };

  const toggleNotification = async (key) => {
    const newValue = !notificationSettings[key];
    setNotificationSettings(prev => ({ ...prev, [key]: newValue }));
    localStorage.setItem("notificationSettings", JSON.stringify({ ...notificationSettings, [key]: newValue }));
    
    try {
      await axiosInstance.put("/users/notification-settings", {
        ...notificationSettings,
        [key]: newValue
      });
    } catch (error) {
      console.error("Save notification settings error:", error);
    }
    
    const label = key.replace(/([A-Z])/g, ' $1').trim();
    showToastMessage(`${label} ${newValue ? t('enabled') : t('disabled')}`, "success");
  };

  const toggleAppSetting = async (key) => {
    const newValue = !appSettings[key];
    setAppSettings(prev => ({ ...prev, [key]: newValue }));
    localStorage.setItem("appSettings", JSON.stringify({ ...appSettings, [key]: newValue }));
    const label = key === "biometric" ? t('biometricLogin') : t('autoLock');
    showToastMessage(`${label} ${newValue ? t('enabled') : t('disabled')}`, "success");
  };

  const toggleLanguage = () => {
    const newLang = appSettings.language === "bn" ? "en" : "bn";
    setAppSettings(prev => ({ ...prev, language: newLang }));
    localStorage.setItem("appSettings", JSON.stringify({ ...appSettings, language: newLang }));
    localStorage.setItem('appLanguage', newLang);
    setLang(newLang);
    showToastMessage(t('languageChanged', { lang: newLang === "bn" ? t('bengali') : t('english') }), "success");
  };

  const handleChangePin = async () => {
    const { value: formValues } = await Swal.fire({
      title: t('changePinTitle'),
      html: `
        <div class="text-left">
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">${t('currentPin')}</label>
            <input type="password" id="currentPin" class="swal2-input w-full" placeholder="${t('enterCurrentPin')}" maxlength="6">
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">${t('newPin')}</label>
            <input type="password" id="newPin" class="swal2-input w-full" placeholder="${t('enterNewPin')}" maxlength="6">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">${t('confirmNewPin')}</label>
            <input type="password" id="confirmPin" class="swal2-input w-full" placeholder="${t('confirmPinPlaceholder')}" maxlength="6">
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: t('changePinButton'),
      cancelButtonText: t('cancel'),
      preConfirm: () => {
        const currentPin = document.getElementById("currentPin").value;
        const newPin = document.getElementById("newPin").value;
        const confirmPin = document.getElementById("confirmPin").value;
        
        if (!currentPin || !newPin || !confirmPin) {
          Swal.showValidationMessage(t('allFieldsRequired'));
          return false;
        }
        if (newPin.length !== 6 || !/^\d+$/.test(newPin)) {
          Swal.showValidationMessage(t('pinMustBe6Digits'));
          return false;
        }
        if (newPin !== confirmPin) {
          Swal.showValidationMessage(t('pinsDoNotMatch'));
          return false;
        }
        return { currentPin, newPin };
      }
    });

    if (formValues) {
      setLoading(true);
      const result = await changePin(formValues.currentPin, formValues.newPin);
      if (result.success) {
        showToastMessage(t('pinChanged'), "success");
      } else {
        showToastMessage(t('pinChangeFailed'), "error");
      }
      setLoading(false);
    }
  };

  const handleDownloadData = async () => {
    Swal.fire({
      title: t('downloadDataTitle'),
      text: t('downloadDataMsg'),
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: t('download'),
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);
        try {
          const response = await axiosInstance.get("/users/export-data");
          if (response.data.success) {
            const dataStr = JSON.stringify(response.data.data, null, 2);
            const dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(dataStr);
            const exportFileDefaultName = `sanchoy_data_${new Date().toISOString().slice(0,19)}.json`;
            const linkElement = document.createElement("a");
            linkElement.setAttribute("href", dataUri);
            linkElement.setAttribute("download", exportFileDefaultName);
            linkElement.click();
            
            Swal.fire({
              title: t('downloadStarted'),
              text: t('downloadSuccess'),
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error("Download data error:", error);
          Swal.fire({
            title: t('error'),
            text: t('downloadFailed'),
            icon: "error",
            confirmButtonColor: "#059669",
          });
        } finally {
          setLoading(false);
        }
      }
    });
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: t('deleteAccountTitle'),
      html: `
        <div class="text-left">
          <p class="text-red-500 font-bold mb-3">${t('irreversible')}</p>
          <p class="mb-3">${t('deletingWill')}</p>
          <ul class="list-disc list-inside mb-3 text-sm">
            <li>${t('removePersonalData')}</li>
            <li>${t('deleteGoals')}</li>
            <li>${t('removeTransactions')}</li>
            <li>${t('cannotRecover')}</li>
          </ul>
          <div class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">${t('typeDelete')}</label>
            <input type="text" id="confirmText" class="swal2-input w-full" placeholder="${t('deletePlaceholder')}">
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t('confirmDelete'),
      cancelButtonText: t('cancel'),
      preConfirm: () => {
        const confirmText = document.getElementById("confirmText").value;
        if (confirmText !== "DELETE") {
          Swal.showValidationMessage(t('typeDelete'));
          return false;
        }
        return true;
      }
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        const response = await axiosInstance.delete("/users/account");
        if (response.data.success) {
          Swal.fire({
            title: t('accountDeleted'),
            text: t('accountDeletedMsg'),
            icon: "success",
            confirmButtonColor: "#059669",
          }).then(() => {
            logout();
          });
        }
      } catch (error) {
        console.error("Delete account error:", error);
        Swal.fire({
          title: t('error'),
          text: error.response?.data?.message || t('accountDeletionFailed'),
          icon: "error",
          confirmButtonColor: "#059669",
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const handleExportTransactions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/deposits/export");
      if (response.data.success) {
        const dataStr = JSON.stringify(response.data.data, null, 2);
        const dataUri = "data:application/json;charset=utf-8,"+ encodeURIComponent(dataStr);
        const exportFileDefaultName = `sanchoy_transactions_${new Date().toISOString().slice(0,19)}.json`;
        const linkElement = document.createElement("a");
        linkElement.setAttribute("href", dataUri);
        linkElement.setAttribute("download", exportFileDefaultName);
        linkElement.click();
        
        Swal.fire({
          title: t('transactionsExported'),
          text: t('exportSuccess'),
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Export transactions error:", error);
      Swal.fire({
        title: t('error'),
        text: t('exportFailed'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { icon: "🔔", label: t('notificationSettings'), action: () => document.getElementById("notifications")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: "🔢", label: t('changePin'), action: handleChangePin },
    { icon: "📥", label: t('downloadMyData'), action: handleDownloadData },
    { icon: "📊", label: t('exportTransactions'), action: handleExportTransactions },
    { icon: "🎫", label: t('supportTicket'), href: "/dashboard/support-ticket" },
    { icon: "📲", label: t('installApp'), href: "/dashboard/install" }
  ];

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5">{t('pageTitle')}</h2>

      {/* Account Summary Card */}
      <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 border border-primary/20 rounded-xl p-4 mb-5">
        <div className="flex items-center gap-3">
          {user?.profilePicture ? (
            <img src={user.profilePicture} alt={user.fullName} className="w-12 h-12 rounded-full object-cover" />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white text-xl font-bold">
              {user?.fullName?.charAt(0) || "U"}
            </div>
          )}
          <div>
            <div className="font-bold text-foreground">{user?.fullName || "User"}</div>
            <div className="text-xs text-foreground/50">{user?.phone || "No phone"} • {t('level', { level: user?.level || 1 })}</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Display Settings Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">{t('display')}</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <div className="font-semibold text-sm text-foreground">{t('darkTheme')}</div>
                  <div className="text-xs text-foreground/50">{t('darkThemeDesc')}</div>
                </div>
                <button 
                  onClick={toggleTheme}
                  className={`relative w-12 h-6 rounded-full transition ${isDark ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${isDark ? "right-0.5" : "left-0.5"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <div className="font-semibold text-sm text-foreground">{t('language')}</div>
                  <div className="text-xs text-foreground/50">{t('languageDesc')}</div>
                </div>
                <button 
                  onClick={toggleLanguage}
                  className="px-4 py-1.5 rounded-lg border-2 border-primary text-primary text-xs font-semibold hover:bg-primary/10 transition"
                >
                  {appSettings.language === "bn" ? t('english') : t('bengali')}
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings Card */}
          <div id="notifications" className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">{t('notifications')}</div>
            <div className="space-y-4">
              {[
                { key: "depositReminder", label: t('depositReminder'), desc: t('depositReminderDesc') },
                { key: "streakAlert", label: t('streakAlert'), desc: t('streakAlertDesc') },
                { key: "referralUpdate", label: t('referralUpdate'), desc: t('referralUpdateDesc') },
                { key: "promotional", label: t('promotionalMessages'), desc: t('promotionalDesc') },
                { key: "emailNotifications", label: t('emailNotifications'), desc: t('emailDesc') },
                { key: "smsNotifications", label: t('smsNotifications'), desc: t('smsDesc') }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div>
                    <div className="font-semibold text-sm text-foreground">{item.label}</div>
                    <div className="text-xs text-foreground/50">{item.desc}</div>
                  </div>
                  <button 
                    onClick={() => toggleNotification(item.key)}
                    className={`relative w-12 h-6 rounded-full transition ${notificationSettings[item.key] ? "bg-primary" : "bg-border"}`}
                  >
                    <div className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${notificationSettings[item.key] ? "right-0.5" : "left-0.5"}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* App Settings Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">{t('appSettings')}</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <div className="font-semibold text-sm text-foreground">{t('biometricLogin')}</div>
                  <div className="text-xs text-foreground/50">{t('biometricDesc')}</div>
                </div>
                <button 
                  onClick={() => toggleAppSetting("biometric")}
                  className={`relative w-12 h-6 rounded-full transition ${appSettings.biometric ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${appSettings.biometric ? "right-0.5" : "left-0.5"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <div className="font-semibold text-sm text-foreground">{t('autoLock')}</div>
                  <div className="text-xs text-foreground/50">{t('autoLockDesc')}</div>
                </div>
                <button 
                  onClick={() => toggleAppSetting("autoLock")}
                  className={`relative w-12 h-6 rounded-full transition ${appSettings.autoLock ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${appSettings.autoLock ? "right-0.5" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">{t('quickActions')}</div>
            <div className="space-y-3">
              {quickLinks.map((link, idx) => (
                link.href ? (
                  <a 
                    key={idx}
                    href={link.href}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background text-foreground text-sm font-semibold hover:border-primary hover:text-primary transition"
                  >
                    <span className="text-lg">{link.icon}</span>
                    {link.label}
                  </a>
                ) : (
                  <button
                    key={idx}
                    onClick={link.action}
                    disabled={loading}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-border bg-background text-foreground text-sm font-semibold hover:border-primary hover:text-primary transition"
                  >
                    <span className="text-lg">{link.icon}</span>
                    {link.label}
                  </button>
                )
              ))}
            </div>
          </div>

          {/* Danger Zone Card */}
          <div className="bg-card border border-red-500/30 rounded-xl p-5">
            <div className="font-bold text-red-500 mb-3 flex items-center gap-2">{t('dangerZone')}</div>
            <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
              {t('dangerDesc')}
            </p>
            <button 
              onClick={handleDownloadData}
              disabled={loading}
              className="flex items-center justify-center w-full py-2.5 mb-2 rounded-lg border border-border bg-background text-foreground text-sm font-semibold hover:border-primary transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "📥 " + t('downloadMyData')}
            </button>
            <button 
              onClick={handleExportTransactions}
              disabled={loading}
              className="flex items-center justify-center w-full py-2.5 mb-2 rounded-lg border border-border bg-background text-foreground text-sm font-semibold hover:border-primary transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "📊 " + t('exportTransactions')}
            </button>
            <button 
              onClick={handleDeleteAccount}
              disabled={loading}
              className="flex items-center justify-center w-full py-2.5 rounded-lg border border-red-500/30 bg-background text-red-500 text-sm font-semibold hover:bg-red-500/10 transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t('deleteAccount')}
            </button>
          </div>

          {/* App Version Card */}
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-xs text-foreground/40">
              {t('appVersion')}
            </div>
            <div className="text-[10px] text-foreground/30 mt-1">
              {t('copyright')}
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap ${
            toast.type === "error" ? "bg-red-500" : toast.type === "info" ? "bg-blue-500" : "bg-green-500"
          } text-white`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
};

export default SettingsPage;