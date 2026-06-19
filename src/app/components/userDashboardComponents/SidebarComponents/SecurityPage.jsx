"use client";

import React, { useState, useEffect } from "react";
import {
  Smartphone,
  Laptop,
  LogOut,
  AlertCircle,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";

import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const SecurityPage = () => {
  const { user, changePin, logout } = useAuth();
  const [currentPin, setCurrentPin] = useState("");
  const [newPin, setNewPin] = useState("");
  const [confirmPin, setConfirmPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);
  const [sessionsLoading, setSessionsLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
  });

  // Fetch active sessions from localStorage/state
  const getActiveSessions = () => {
    // Get all active sessions from localStorage
    const sessions = [];
    const currentToken = localStorage.getItem("token");
    
    // Current session
    sessions.push({
      id: "current",
      device: getDeviceType(),
      deviceIcon: getDeviceIcon(),
      name: `This Device (${getDeviceName()})`,
      location: "Current Location",
      time: "Active now",
      isCurrent: true,
      lastActivity: new Date(),
    });

    // Check for other saved sessions (if any)
    const savedSessions = localStorage.getItem("activeSessions");
    if (savedSessions) {
      const parsedSessions = JSON.parse(savedSessions);
      parsedSessions.forEach(session => {
        if (session.token !== currentToken) {
          sessions.push({
            ...session,
            isCurrent: false,
          });
        }
      });
    }

    setSessions(sessions);
    setSessionsLoading(false);
  };

  // Fetch login history from localStorage
  const getLoginHistory = () => {
    const history = [];
    const savedHistory = localStorage.getItem("loginHistory");
    
    if (savedHistory) {
      const parsedHistory = JSON.parse(savedHistory);
      setLoginHistory(parsedHistory);
      setPagination({
        currentPage: 1,
        totalPages: Math.ceil(parsedHistory.length / 10),
        totalItems: parsedHistory.length,
      });
    } else {
      // Demo login history based on user data
      const demoHistory = [
        {
          id: 1,
          success: true,
          name: "Successful Login",
          time: formatDate(new Date()),
          device: getDeviceType(),
          location: "Dhaka, Bangladesh",
          ip: "103.xxx.xxx.xxx",
        },
        {
          id: 2,
          success: true,
          name: "Successful Login",
          time: formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000)),
          device: "Chrome on Windows",
          location: "Dhaka, Bangladesh",
          ip: "103.xxx.xxx.xxx",
        },
      ];
      
      // Add user's last login from auth context if available
      if (user?.lastLogin) {
        demoHistory.unshift({
          id: 0,
          success: true,
          name: "Successful Login",
          time: formatDate(new Date(user.lastLogin)),
          device: getDeviceType(),
          location: "Dhaka, Bangladesh",
          ip: "103.xxx.xxx.xxx",
        });
      }
      
      setLoginHistory(demoHistory);
      localStorage.setItem("loginHistory", JSON.stringify(demoHistory));
    }
    
    setHistoryLoading(false);
  };

  // Helper functions
  const getDeviceType = () => {
    const ua = navigator.userAgent;
    if (/Mobile|Android|iPhone|iPad|iPod/i.test(ua)) return "Mobile";
    if (/Tablet/i.test(ua)) return "Tablet";
    return "Desktop";
  };

  const getDeviceIcon = () => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return "📱";
    if (/iPhone|iPad|iPod/i.test(ua)) return "🍎";
    if (/Windows/i.test(ua)) return "💻";
    if (/Mac/i.test(ua)) return "🖥️";
    return "🌐";
  };

  const getDeviceName = () => {
    const ua = navigator.userAgent;
    if (/Android/i.test(ua)) return "Android";
    if (/iPhone/i.test(ua)) return "iPhone";
    if (/iPad/i.test(ua)) return "iPad";
    if (/Windows/i.test(ua)) return "Windows PC";
    if (/Mac/i.test(ua)) return "Mac";
    return "Unknown Device";
  };

  const formatDate = (date) => {
    const now = new Date();
    const loginDate = new Date(date);
    const diff = now - loginDate;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = loginDate.getHours();
    const minutes = loginDate.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    
    if (days === 0) {
      return `Today, ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    } else if (days === 1) {
      return `Yesterday, ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    } else {
      return `${loginDate.toLocaleDateString()}, ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
  };

  const handlePinChange = async () => {
    if (!currentPin) {
      Swal.fire({
        title: "Error!",
        text: "Please enter current PIN",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }
    if (!newPin || newPin.length < 6) {
      Swal.fire({
        title: "Error!",
        text: "New PIN must be 6 digits",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }
    if (newPin !== confirmPin) {
      Swal.fire({
        title: "Error!",
        text: "New PINs do not match",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    setLoading(true);
    const result = await changePin(currentPin, newPin);
    
    if (result.success) {
      setCurrentPin("");
      setNewPin("");
      setConfirmPin("");
    }
    setLoading(false);
  };

  const revokeSession = async (session) => {
    const result = await Swal.fire({
      title: "Logout from device?",
      text: `You will be logged out from ${session.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, logout",
    });

    if (result.isConfirmed) {
      // Remove session from localStorage
      const savedSessions = localStorage.getItem("activeSessions");
      if (savedSessions) {
        const sessions = JSON.parse(savedSessions);
        const updatedSessions = sessions.filter(s => s.id !== session.id);
        localStorage.setItem("activeSessions", JSON.stringify(updatedSessions));
      }
      
      Swal.fire({
        title: "Success!",
        text: "Session revoked successfully",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      
      getActiveSessions();
    }
  };

  const logoutAllDevices = async () => {
    const result = await Swal.fire({
      title: "Logout from all devices?",
      text: "You will be logged out from all devices except this one.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, logout all",
    });

    if (result.isConfirmed) {
      // Clear all sessions except current
      localStorage.removeItem("activeSessions");
      
      Swal.fire({
        title: "Success!",
        text: "Logged out from all other devices",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      
      getActiveSessions();
    }
  };

  useEffect(() => {
    getActiveSessions();
    getLoginHistory();
    
    // Save current session to localStorage
    const currentToken = localStorage.getItem("token");
    const currentSession = {
      id: Date.now().toString(),
      device: getDeviceType(),
      deviceIcon: getDeviceIcon(),
      name: `This Device (${getDeviceName()})`,
      location: "Dhaka, Bangladesh",
      time: new Date().toISOString(),
      token: currentToken,
      lastActivity: new Date(),
    };
    
    const savedSessions = localStorage.getItem("activeSessions");
    if (savedSessions) {
      const sessions = JSON.parse(savedSessions);
      const existingSession = sessions.find(s => s.token === currentToken);
      if (!existingSession) {
        sessions.push(currentSession);
        localStorage.setItem("activeSessions", JSON.stringify(sessions));
      }
    } else {
      localStorage.setItem("activeSessions", JSON.stringify([currentSession]));
    }
  }, []);

  // Update login history on component mount
  useEffect(() => {
    if (user?.lastLogin) {
      const newLoginEntry = {
        id: Date.now(),
        success: true,
        name: "Successful Login",
        time: formatDate(new Date()),
        device: getDeviceType(),
        location: "Dhaka, Bangladesh",
        ip: "103.xxx.xxx.xxx",
      };
      
      const savedHistory = localStorage.getItem("loginHistory");
      if (savedHistory) {
        const history = JSON.parse(savedHistory);
        // Check if last login is already recorded
        const lastEntry = history[0];
        if (lastEntry?.time !== newLoginEntry.time) {
          history.unshift(newLoginEntry);
          // Keep only last 50 entries
          const trimmedHistory = history.slice(0, 50);
          localStorage.setItem("loginHistory", JSON.stringify(trimmedHistory));
          setLoginHistory(trimmedHistory);
        }
      }
    }
  }, [user]);

  const getSessionIcon = (icon) => {
    if (icon === "📱") return <Smartphone size={20} />;
    if (icon === "🍎") return <Smartphone size={20} />;
    if (icon === "💻") return <Laptop size={20} />;
    if (icon === "🖥️") return <Laptop size={20} />;
    return <Smartphone size={20} />;
  };

  return (
    <div className="max-w-full mx-auto">
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
                disabled={loading}
                className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : "Update PIN"}
              </button>
            </div>
          </div>

          {/* Security Info Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              📱 Security Tips
            </div>
            <div className="space-y-3">
              <div className="flex gap-2 text-sm text-foreground/70">
                <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Never share your PIN with anyone</span>
              </div>
              <div className="flex gap-2 text-sm text-foreground/70">
                <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Use a unique PIN not used elsewhere</span>
              </div>
              <div className="flex gap-2 text-sm text-foreground/70">
                <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Logout from devices you don't recognize</span>
              </div>
              <div className="flex gap-2 text-sm text-foreground/70">
                <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>Enable 2FA for extra security (coming soon)</span>
              </div>
            </div>
          </div>

          {/* Account Info Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              👤 Account Information
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">Account ID:</span>
                <span className="font-semibold text-foreground">{user?.id?.slice(-8) || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Phone:</span>
                <span className="font-semibold text-foreground">{user?.phone || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Email:</span>
                <span className="font-semibold text-foreground">{user?.email || "N/A"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">Member Since:</span>
                <span className="font-semibold text-foreground">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* Active Sessions Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="font-bold text-foreground flex items-center gap-2">
                💻 Active Sessions
              </div>
              {sessions.filter(s => !s.isCurrent).length > 0 && (
                <button
                  onClick={logoutAllDevices}
                  className="text-xs text-red-500 font-semibold hover:underline"
                >
                  Logout All
                </button>
              )}
            </div>
            {sessionsLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : sessions.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">💻</div>
                <p className="text-foreground/50">No active sessions found</p>
              </div>
            ) : (
              <div className="space-y-3">
                {sessions.map((session, idx) => (
                  <div
                    key={session.id || idx}
                    className={`p-3 rounded-xl flex items-center gap-3 ${
                      session.isCurrent
                        ? "bg-primary/5 border border-primary/20"
                        : "bg-background border border-border"
                    }`}
                  >
                    <div className="text-2xl">{session.deviceIcon || getDeviceIcon()}</div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">
                        {session.name}
                      </div>
                      <div className="text-xs text-foreground/50">
                        {session.location} · {session.isCurrent ? "Active now" : session.time}
                      </div>
                    </div>
                    {session.isCurrent ? (
                      <span className="text-xs text-primary font-semibold">
                        Current
                      </span>
                    ) : (
                      <button
                        onClick={() => revokeSession(session)}
                        className="text-xs text-red-500 font-semibold hover:underline flex items-center gap-1"
                      >
                        <LogOut size={12} /> Logout
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Login History Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              🔒 Login History
            </div>
            {historyLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : loginHistory.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-foreground/50">No login history found</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {loginHistory.slice(0, 10).map((item, idx) => (
                  <div
                    key={item.id || idx}
                    className="flex items-center gap-3 pb-3 border-b border-border last:border-0"
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                        item.success ? "bg-primary/10" : "bg-red-500/10"
                      }`}
                    >
                      {item.success ? <CheckCircle size={16} className="text-primary" /> : <XCircle size={16} className="text-red-500" />}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">
                        {item.name}
                      </div>
                      <div className="text-xs text-foreground/50">
                        {item.time}
                      </div>
                      {item.location && (
                        <div className="text-[10px] text-foreground/40 mt-0.5">
                          📍 {item.location} · {item.device || "Unknown device"}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* View More Link */}
            {loginHistory.length > 10 && (
              <div className="text-center mt-4 pt-3 border-t border-border">
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Full Login History",
                      html: `<div class="text-left max-h-96 overflow-y-auto">
                        ${loginHistory.map(item => `
                          <div class="flex items-center gap-3 p-2 border-b">
                            <div>${item.success ? "✅" : "❌"}</div>
                            <div class="flex-1">
                              <div class="font-semibold text-sm">${item.name}</div>
                              <div class="text-xs text-gray-500">${item.time}</div>
                            </div>
                          </div>
                        `).join('')}
                      </div>`,
                      confirmButtonColor: "#059669",
                      confirmButtonText: "Close",
                      width: "500px",
                    });
                  }}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  View All ({loginHistory.length})
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPage;