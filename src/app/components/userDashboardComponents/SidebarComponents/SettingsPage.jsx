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

const SettingsPage = () => {
  const { user, logout, changePin, updateProfile } = useAuth();
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(false);
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

  // Load settings from localStorage on mount
  useEffect(() => {
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
    showToastMessage(`${newTheme ? "Dark" : "Light"} mode activated`, "success");
  };

  const toggleNotification = async (key) => {
    const newValue = !notificationSettings[key];
    setNotificationSettings(prev => ({ ...prev, [key]: newValue }));
    localStorage.setItem("notificationSettings", JSON.stringify({ ...notificationSettings, [key]: newValue }));
    
    // Optionally sync with backend
    try {
      await axiosInstance.put("/users/notification-settings", {
        ...notificationSettings,
        [key]: newValue
      });
    } catch (error) {
      console.error("Save notification settings error:", error);
    }
    
    showToastMessage(`${key.replace(/([A-Z])/g, ' $1').trim()} ${newValue ? "enabled" : "disabled"}`, "success");
  };

  const toggleAppSetting = async (key) => {
    const newValue = !appSettings[key];
    setAppSettings(prev => ({ ...prev, [key]: newValue }));
    localStorage.setItem("appSettings", JSON.stringify({ ...appSettings, [key]: newValue }));
    showToastMessage(`${key === "biometric" ? "Biometric login" : "Auto-lock"} ${newValue ? "enabled" : "disabled"}`, "success");
  };

  const toggleLanguage = () => {
    const newLang = appSettings.language === "bn" ? "en" : "bn";
    setAppSettings(prev => ({ ...prev, language: newLang }));
    localStorage.setItem("appSettings", JSON.stringify({ ...appSettings, language: newLang }));
    showToastMessage(`Language changed to ${newLang === "bn" ? "Bengali" : "English"}`, "success");
    
    // Reload page to apply language changes
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleChangePin = async () => {
    const { value: formValues } = await Swal.fire({
      title: "Change PIN",
      html: `
        <div class="text-left">
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Current PIN</label>
            <input type="password" id="currentPin" class="swal2-input w-full" placeholder="Enter current PIN" maxlength="6">
          </div>
          <div class="mb-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">New PIN</label>
            <input type="password" id="newPin" class="swal2-input w-full" placeholder="Enter new PIN" maxlength="6">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Confirm New PIN</label>
            <input type="password" id="confirmPin" class="swal2-input w-full" placeholder="Confirm new PIN" maxlength="6">
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: "Change PIN",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const currentPin = document.getElementById("currentPin").value;
        const newPin = document.getElementById("newPin").value;
        const confirmPin = document.getElementById("confirmPin").value;
        
        if (!currentPin || !newPin || !confirmPin) {
          Swal.showValidationMessage("All fields are required");
          return false;
        }
        if (newPin.length !== 6 || !/^\d+$/.test(newPin)) {
          Swal.showValidationMessage("PIN must be 6 digits");
          return false;
        }
        if (newPin !== confirmPin) {
          Swal.showValidationMessage("New PINs do not match");
          return false;
        }
        return { currentPin, newPin };
      }
    });

    if (formValues) {
      setLoading(true);
      const result = await changePin(formValues.currentPin, formValues.newPin);
      setLoading(false);
    }
  };

  const handleDownloadData = async () => {
    Swal.fire({
      title: "Download Your Data",
      text: "This will generate a JSON file with all your account data. Are you sure?",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#d33",
      confirmButtonText: "Download",
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
              title: "Download Started!",
              text: "Your data has been exported successfully.",
              icon: "success",
              timer: 2000,
              showConfirmButton: false,
            });
          }
        } catch (error) {
          console.error("Download data error:", error);
          Swal.fire({
            title: "Error!",
            text: "Failed to download your data",
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
      title: "Delete Account?",
      html: `
        <div class="text-left">
          <p class="text-red-500 font-bold mb-3">⚠️ This action is irreversible!</p>
          <p class="mb-3">Deleting your account will:</p>
          <ul class="list-disc list-inside mb-3 text-sm">
            <li>Remove all your personal data</li>
            <li>Delete all your savings goals</li>
            <li>Remove all transaction history</li>
            <li>You cannot recover this data</li>
          </ul>
          <div class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">Type "DELETE" to confirm</label>
            <input type="text" id="confirmText" class="swal2-input w-full" placeholder="DELETE">
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Delete Account",
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const confirmText = document.getElementById("confirmText").value;
        if (confirmText !== "DELETE") {
          Swal.showValidationMessage('Please type "DELETE" to confirm');
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
            title: "Account Deleted",
            text: "Your account has been permanently deleted. We're sad to see you go.",
            icon: "success",
            confirmButtonColor: "#059669",
          }).then(() => {
            logout();
          });
        }
      } catch (error) {
        console.error("Delete account error:", error);
        Swal.fire({
          title: "Error!",
          text: error.response?.data?.message || "Failed to delete account",
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
          title: "Transactions Exported!",
          text: "Your transaction history has been downloaded.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.error("Export transactions error:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to export transactions",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setLoading(false);
    }
  };

  const quickLinks = [
    { icon: "🔔", label: "Notification Settings", action: () => document.getElementById("notifications")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: "🔢", label: "Change PIN", action: handleChangePin },
    { icon: "📥", label: "Download My Data", action: handleDownloadData },
    { icon: "📊", label: "Export Transactions", action: handleExportTransactions },
    { icon: "🎫", label: "Support Ticket", href: "/dashboard/support-ticket" },
    { icon: "📲", label: "Install App", href: "/dashboard/install" }
  ];

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5">⚙️ Settings</h2>

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
            <div className="text-xs text-foreground/50">{user?.phone || "No phone"} • Level {user?.level || 1}</div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* Display Settings Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">🎨 Display</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <div className="font-semibold text-sm text-foreground">Dark Theme</div>
                  <div className="text-xs text-foreground/50">Dark mode for night viewing</div>
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
                  <div className="font-semibold text-sm text-foreground">Language / ভাষা</div>
                  <div className="text-xs text-foreground/50">Bengali or English</div>
                </div>
                <button 
                  onClick={toggleLanguage}
                  className="px-4 py-1.5 rounded-lg border-2 border-primary text-primary text-xs font-semibold hover:bg-primary/10 transition"
                >
                  {appSettings.language === "bn" ? "English" : "বাংলা"}
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings Card */}
          <div id="notifications" className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">🔔 Notifications</div>
            <div className="space-y-4">
              {[
                { key: "depositReminder", label: "Deposit Reminder", desc: "SMS before due date" },
                { key: "streakAlert", label: "Streak Alert", desc: "Notification before streak breaks" },
                { key: "referralUpdate", label: "Referral Update", desc: "Notify when friend joins" },
                { key: "promotional", label: "Promotional Messages", desc: "Offers & updates" },
                { key: "emailNotifications", label: "Email Notifications", desc: "Receive emails about your account" },
                { key: "smsNotifications", label: "SMS Notifications", desc: "Get SMS alerts" }
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
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">📱 App Settings</div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <div className="font-semibold text-sm text-foreground">Biometric Login</div>
                  <div className="text-xs text-foreground/50">Fingerprint / Face unlock</div>
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
                  <div className="font-semibold text-sm text-foreground">Auto-Lock</div>
                  <div className="text-xs text-foreground/50">Lock after 5 minutes inactivity</div>
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
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">🔗 Quick Actions</div>
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
            <div className="font-bold text-red-500 mb-3 flex items-center gap-2">⚠️ Danger Zone</div>
            <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
              These actions are irreversible. Please proceed with caution.
            </p>
            <button 
              onClick={handleDownloadData}
              disabled={loading}
              className="flex items-center justify-center w-full py-2.5 mb-2 rounded-lg border border-border bg-background text-foreground text-sm font-semibold hover:border-primary transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "📥 Download My Data"}
            </button>
            <button 
              onClick={handleExportTransactions}
              disabled={loading}
              className="flex items-center justify-center w-full py-2.5 mb-2 rounded-lg border border-border bg-background text-foreground text-sm font-semibold hover:border-primary transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "📊 Export Transactions"}
            </button>
            <button 
              onClick={handleDeleteAccount}
              disabled={loading}
              className="flex items-center justify-center w-full py-2.5 rounded-lg border border-red-500/30 bg-background text-red-500 text-sm font-semibold hover:bg-red-500/10 transition"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "🗑️ Delete Account"}
            </button>
          </div>

          {/* App Version Card */}
          <div className="bg-card border border-border rounded-xl p-4 text-center">
            <div className="text-xs text-foreground/40">
              Sonchoy Bondhu App v2.0.0
            </div>
            <div className="text-[10px] text-foreground/30 mt-1">
              © 2026 Sanchoy Bondhu. All rights reserved.
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