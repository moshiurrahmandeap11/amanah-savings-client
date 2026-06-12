"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Lock,
  Smartphone,
  Laptop,
  Smartphone as Mobile,
  LogOut,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

const SecurityPage = () => {
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const handlePinChange = () => {
    if (!currentPin) {
      showToastMessage("⚠️ Please enter current PIN", "error");
      return;
    }
    if (!newPin || newPin.length < 4) {
      showToastMessage("⚠️ New PIN must be at least 4 digits", "error");
      return;
    }
    if (newPin !== confirmPin) {
      showToastMessage("⚠️ New PINs do not match", "error");
      return;
    }

    setCurrentPin("");
    setNewPin("");
    setConfirmPin("");
    showToastMessage("✅ PIN successfully changed!", "success");
  };

  const handle2FA = () => {
    showToastMessage("📱 OTP sent! Please verify.", "info");
  };

  const handleLogout = (device) => {
    showToastMessage(`🔄 Logging out from ${device}...`, "info");
    setTimeout(() => {
      // window.location.href = "/login";
      showToastMessage("✅ Logged out successfully", "success");
    }, 1000);
  };

  const sessions = [
    {
      device: "📱",
      name: "This Device (Android)",
      location: "Dhaka, Bangladesh",
      time: "Active now",
      isCurrent: true,
    },
    {
      device: "💻",
      name: "Chrome on Windows",
      location: "Dhaka, Bangladesh",
      time: "2 days ago",
      isCurrent: false,
    },
  ];

  const loginHistory = [
    {
      success: true,
      name: "Successful Login",
      time: "Today, 9:15 AM · Android · Dhaka",
    },
    {
      success: true,
      name: "Successful Login",
      time: "Yesterday, 8:30 PM · Chrome · Dhaka",
    },
    {
      success: false,
      name: "Failed Login Attempt",
      time: "3 days ago · Unknown device",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5">
        🔐 Security Settings
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* PIN Change Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              🔑 Change PIN
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  Current PIN
                </label>
                <input
                  type="password"
                  value={currentPin}
                  onChange={(e) => setCurrentPin(e.target.value.slice(0, 6))}
                  placeholder="••••••"
                  maxLength="6"
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  New PIN
                </label>
                <input
                  type="password"
                  value={newPin}
                  onChange={(e) => setNewPin(e.target.value.slice(0, 6))}
                  placeholder="••••••"
                  maxLength="6"
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  Confirm New PIN
                </label>
                <input
                  type="password"
                  value={confirmPin}
                  onChange={(e) => setConfirmPin(e.target.value.slice(0, 6))}
                  placeholder="••••••"
                  maxLength="6"
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
              <button
                onClick={handlePinChange}
                className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition"
              >
                Update PIN
              </button>
            </div>
          </div>

          {/* 2FA Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              📱 Two-Factor Authentication (2FA)
            </div>
            <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 mb-4">
              <div className="flex gap-2 text-sm text-foreground/70">
                <AlertCircle size={16} className="text-amber-500 shrink-0" />
                <span>⚠️ 2FA is not active yet. Secure your account now.</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                Phone Number
              </label>
              <input
                type="text"
                value="+880 1XXX-XXXXXX"
                readOnly
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground/50 outline-none"
              />
            </div>
            <button
              onClick={handle2FA}
              className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              Activate 2FA
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Active Sessions Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              💻 Active Sessions
            </div>
            <div className="space-y-3">
              {sessions.map((session, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl flex items-center gap-3 ${
                    session.isCurrent
                      ? "bg-primary/5 border border-primary/20"
                      : "bg-background border border-border"
                  }`}
                >
                  <span className="text-2xl">{session.device}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">
                      {session.name}
                    </div>
                    <div className="text-xs text-foreground/50">
                      {session.location} · {session.time}
                    </div>
                  </div>
                  {session.isCurrent ? (
                    <span className="text-xs text-primary font-semibold">
                      Current
                    </span>
                  ) : (
                    <button
                      onClick={() => handleLogout(session.name)}
                      className="text-xs text-red-500 font-semibold hover:underline"
                    >
                      Logout
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Login History Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              🔒 Login History
            </div>
            <div className="space-y-3">
              {loginHistory.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 pb-3 border-b border-border last:border-0"
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      item.success ? "bg-primary/10" : "bg-red-500/10"
                    }`}
                  >
                    {item.success ? "✅" : "❌"}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">
                      {item.name}
                    </div>
                    <div className="text-xs text-foreground/50">
                      {item.time}
                    </div>
                  </div>
                </div>
              ))}
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
            toast.type === "error"
              ? "bg-red-500"
              : toast.type === "info"
                ? "bg-blue-500"
                : "bg-green-500"
          } text-white`}
        >
          {toast.message}
        </motion.div>
      )}
    </div>
  );
};

export default SecurityPage;
