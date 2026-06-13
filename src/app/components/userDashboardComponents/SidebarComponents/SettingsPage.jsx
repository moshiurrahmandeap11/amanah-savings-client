"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { 
  Lock, Smartphone, Laptop, LogOut, AlertCircle, 
  Moon, Sun, Bell, BellRing, Mail, Sms, Shield, 
  Fingerprint, Clock, Download, Trash2, HelpCircle
} from "lucide-react";

const SettingsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    depositReminder: true,
    streakAlert: true,
    referralUpdate: true,
    promotional: false,
    biometric: false,
    autoLock: true
  });

  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const toggleNotification = (key) => {
    setNotificationSettings(prev => ({ ...prev, [key]: !prev[key] }));
    showToastMessage(`${key} ${!notificationSettings[key] ? "enabled" : "disabled"}`, "success");
  };

  const toggleTheme = () => {
    setIsDark(!isDark);
    showToastMessage(`Theme changed to ${!isDark ? "dark" : "light"} mode`, "success");
  };

  const toggleLanguage = () => {
    showToastMessage("Language changed to English", "success");
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5">⚙️ Settings</h2>

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
                  English
                </button>
              </div>
            </div>
          </div>

          {/* Notification Settings Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">🔔 Notifications</div>
            <div className="space-y-4">
              {[
                { key: "depositReminder", label: "Deposit Reminder", desc: "SMS before due date" },
                { key: "streakAlert", label: "Streak Alert", desc: "Notification before streak breaks" },
                { key: "referralUpdate", label: "Referral Update", desc: "Notify when friend joins" },
                { key: "promotional", label: "Promotional Messages", desc: "Offers & updates" }
              ].map((item) => (
                <div key={item.key} className="flex items-center justify-between py-2 border-b border-border">
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
                  onClick={() => toggleNotification("biometric")}
                  className={`relative w-12 h-6 rounded-full transition ${notificationSettings.biometric ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${notificationSettings.biometric ? "right-0.5" : "left-0.5"}`} />
                </button>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-border">
                <div>
                  <div className="font-semibold text-sm text-foreground">Auto-Lock</div>
                  <div className="text-xs text-foreground/50">Lock after 5 minutes inactivity</div>
                </div>
                <button 
                  onClick={() => toggleNotification("autoLock")}
                  className={`relative w-12 h-6 rounded-full transition ${notificationSettings.autoLock ? "bg-primary" : "bg-border"}`}
                >
                  <div className={`absolute w-5 h-5 rounded-full bg-white top-0.5 transition ${notificationSettings.autoLock ? "right-0.5" : "left-0.5"}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">🔗 Quick Links</div>
            <div className="space-y-3">
              {[
                { icon: "🔔", label: "Notification Settings", href: "/dashboard/notification-settings" },
                { icon: "📥", label: "Data Download", href: "/dashboard/data-export" },
                { icon: "🔢", label: "Change PIN", href: "/dashboard/pin-setup" },
                { icon: "🎫", label: "Support Ticket", href: "/dashboard/support-ticket" },
                { icon: "📲", label: "Install App", href: "/dashboard/install" }
              ].map((link, idx) => (
                <a 
                  key={idx}
                  href={link.href}
                  className="flex items-center gap-3 p-3 rounded-xl border border-border bg-background text-foreground text-sm font-semibold hover:border-primary hover:text-primary transition"
                >
                  <span className="text-lg">{link.icon}</span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Danger Zone Card */}
          <div className="bg-card border border-red-500/30 rounded-xl p-5">
            <div className="font-bold text-red-500 mb-3 flex items-center gap-2">⚠️ Danger Zone</div>
            <p className="text-sm text-foreground/60 mb-4 leading-relaxed">
              These actions are irreversible. Please proceed with caution.
            </p>
            <a 
              href="/dashboard/data-export" 
              className="flex items-center justify-center w-full py-2.5 mb-2 rounded-lg border border-border bg-background text-foreground text-sm font-semibold hover:border-primary transition"
            >
              📥 Download Data
            </a>
            <a 
              href="/dashboard/delete-account" 
              className="flex items-center justify-center w-full py-2.5 rounded-lg border border-red-500/30 bg-background text-red-500 text-sm font-semibold hover:bg-red-500/10 transition"
            >
              🗑️ Delete Account
            </a>
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