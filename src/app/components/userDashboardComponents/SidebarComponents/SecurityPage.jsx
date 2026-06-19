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

// Translations
const translations = {
  en: {
    // Page Title
    pageTitle: "🔐 Security Settings",
    
    // PIN Change
    changePin: "🔑 Change PIN",
    currentPin: "Current PIN",
    newPin: "New PIN",
    confirmNewPin: "Confirm New PIN",
    updatePin: "Update PIN",
    
    // Security Tips
    securityTips: "📱 Security Tips",
    tip1: "Never share your PIN with anyone",
    tip2: "Use a unique PIN not used elsewhere",
    tip3: "Logout from devices you don't recognize",
    tip4: "Enable 2FA for extra security (coming soon)",
    
    // Account Info
    accountInfo: "👤 Account Information",
    accountId: "Account ID:",
    phone: "Phone:",
    email: "Email:",
    memberSince: "Member Since:",
    notAvailable: "N/A",
    
    // Active Sessions
    activeSessions: "💻 Active Sessions",
    logoutAll: "Logout All",
    noSessions: "No active sessions found",
    current: "Current",
    logout: "Logout",
    
    // Login History
    loginHistory: "🔒 Login History",
    noHistory: "No login history found",
    viewAll: "View All",
    close: "Close",
    fullLoginHistory: "Full Login History",
    
    // Toast/Alerts
    error: "Error!",
    pleaseEnterCurrentPin: "Please enter current PIN",
    pinMustBe6Digits: "New PIN must be 6 digits",
    pinsDoNotMatch: "New PINs do not match",
    sessionRevoked: "Session revoked successfully",
    loggedOutAllDevices: "Logged out from all other devices",
    success: "Success!",
    logoutFromDevice: "Logout from device?",
    logoutFromDeviceText: "You will be logged out from {device}",
    confirmLogout: "Yes, logout",
    logoutAllDevicesTitle: "Logout from all devices?",
    logoutAllDevicesText: "You will be logged out from all devices except this one.",
    confirmLogoutAll: "Yes, logout all",
    
    // Device Types
    mobile: "Mobile",
    tablet: "Tablet",
    desktop: "Desktop",
    android: "Android",
    iphone: "iPhone",
    ipad: "iPad",
    windows: "Windows PC",
    mac: "Mac",
    unknownDevice: "Unknown Device",
    
    // Login Entry
    successfulLogin: "Successful Login",
    currentLocation: "Current Location",
    activeNow: "Active now",
    today: "Today",
    yesterday: "Yesterday",
    
    // Session Names
    thisDevice: "This Device",
  },
  bn: {
    // Page Title
    pageTitle: "🔐 নিরাপত্তা সেটিংস",
    
    // PIN Change
    changePin: "🔑 পিন পরিবর্তন করুন",
    currentPin: "বর্তমান পিন",
    newPin: "নতুন পিন",
    confirmNewPin: "নতুন পিন নিশ্চিত করুন",
    updatePin: "পিন আপডেট করুন",
    
    // Security Tips
    securityTips: "📱 নিরাপত্তা টিপস",
    tip1: "আপনার পিন কখনো কারো সাথে শেয়ার করবেন না",
    tip2: "অন্য কোথাও ব্যবহৃত নয় এমন একটি অনন্য পিন ব্যবহার করুন",
    tip3: "আপনি চিনতে পারেন না এমন ডিভাইস থেকে লগআউট করুন",
    tip4: "অতিরিক্ত নিরাপত্তার জন্য ২এফএ সক্রিয় করুন (শীঘ্রই আসছে)",
    
    // Account Info
    accountInfo: "👤 অ্যাকাউন্ট তথ্য",
    accountId: "অ্যাকাউন্ট আইডি:",
    phone: "ফোন:",
    email: "ইমেইল:",
    memberSince: "সদস্য থেকে:",
    notAvailable: "এন/এ",
    
    // Active Sessions
    activeSessions: "💻 সক্রিয় সেশন",
    logoutAll: "সব লগআউট করুন",
    noSessions: "কোন সক্রিয় সেশন পাওয়া যায়নি",
    current: "বর্তমান",
    logout: "লগআউট",
    
    // Login History
    loginHistory: "🔒 লগইন ইতিহাস",
    noHistory: "কোন লগইন ইতিহাস পাওয়া যায়নি",
    viewAll: "সব দেখুন",
    close: "বন্ধ করুন",
    fullLoginHistory: "সম্পূর্ণ লগইন ইতিহাস",
    
    // Toast/Alerts
    error: "ত্রুটি!",
    pleaseEnterCurrentPin: "অনুগ্রহ করে বর্তমান পিন লিখুন",
    pinMustBe6Digits: "নতুন পিন ৬ সংখ্যার হতে হবে",
    pinsDoNotMatch: "নতুন পিন মিলছে না",
    sessionRevoked: "সেশন সফলভাবে প্রত্যাহার করা হয়েছে",
    loggedOutAllDevices: "অন্যান্য সব ডিভাইস থেকে লগআউট করা হয়েছে",
    success: "সফল!",
    logoutFromDevice: "ডিভাইস থেকে লগআউট করবেন?",
    logoutFromDeviceText: "আপনি {device} থেকে লগআউট হবেন",
    confirmLogout: "হ্যাঁ, লগআউট করুন",
    logoutAllDevicesTitle: "সব ডিভাইস থেকে লগআউট করবেন?",
    logoutAllDevicesText: "এই ডিভাইস ছাড়া সব ডিভাইস থেকে লগআউট হবেন।",
    confirmLogoutAll: "হ্যাঁ, সব লগআউট করুন",
    
    // Device Types
    mobile: "মোবাইল",
    tablet: "ট্যাবলেট",
    desktop: "ডেস্কটপ",
    android: "অ্যান্ড্রয়েড",
    iphone: "আইফোন",
    ipad: "আইপ্যাড",
    windows: "উইন্ডোজ পিসি",
    mac: "ম্যাক",
    unknownDevice: "অজানা ডিভাইস",
    
    // Login Entry
    successfulLogin: "সফল লগইন",
    currentLocation: "বর্তমান অবস্থান",
    activeNow: "এখন সক্রিয়",
    today: "আজ",
    yesterday: "গতকাল",
    
    // Session Names
    thisDevice: "এই ডিভাইস",
  }
};

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
  const [lang, setLang] = useState("en");

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
  }, []);

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
      name: `${t('thisDevice')} (${getDeviceName()})`,
      location: t('currentLocation'),
      time: t('activeNow'),
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
          name: t('successfulLogin'),
          time: formatDate(new Date()),
          device: getDeviceType(),
          location: t('currentLocation'),
          ip: "103.xxx.xxx.xxx",
        },
        {
          id: 2,
          success: true,
          name: t('successfulLogin'),
          time: formatDate(new Date(Date.now() - 24 * 60 * 60 * 1000)),
          device: "Chrome on Windows",
          location: t('currentLocation'),
          ip: "103.xxx.xxx.xxx",
        },
      ];
      
      // Add user's last login from auth context if available
      if (user?.lastLogin) {
        demoHistory.unshift({
          id: 0,
          success: true,
          name: t('successfulLogin'),
          time: formatDate(new Date(user.lastLogin)),
          device: getDeviceType(),
          location: t('currentLocation'),
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
    if (/Mobile|Android|iPhone|iPad|iPod/i.test(ua)) return t('mobile');
    if (/Tablet/i.test(ua)) return t('tablet');
    return t('desktop');
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
    if (/Android/i.test(ua)) return t('android');
    if (/iPhone/i.test(ua)) return t('iphone');
    if (/iPad/i.test(ua)) return t('ipad');
    if (/Windows/i.test(ua)) return t('windows');
    if (/Mac/i.test(ua)) return t('mac');
    return t('unknownDevice');
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
      return `${t('today')}, ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    } else if (days === 1) {
      return `${t('yesterday')}, ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    } else {
      return `${loginDate.toLocaleDateString()}, ${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }
  };

  const handlePinChange = async () => {
    if (!currentPin) {
      Swal.fire({
        title: t('error'),
        text: t('pleaseEnterCurrentPin'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }
    if (!newPin || newPin.length < 6) {
      Swal.fire({
        title: t('error'),
        text: t('pinMustBe6Digits'),
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }
    if (newPin !== confirmPin) {
      Swal.fire({
        title: t('error'),
        text: t('pinsDoNotMatch'),
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
      title: t('logoutFromDevice'),
      text: t('logoutFromDeviceText', { device: session.name }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t('confirmLogout'),
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
        title: t('success'),
        text: t('sessionRevoked'),
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
      
      getActiveSessions();
    }
  };

  const logoutAllDevices = async () => {
    const result = await Swal.fire({
      title: t('logoutAllDevicesTitle'),
      text: t('logoutAllDevicesText'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t('confirmLogoutAll'),
    });

    if (result.isConfirmed) {
      // Clear all sessions except current
      localStorage.removeItem("activeSessions");
      
      Swal.fire({
        title: t('success'),
        text: t('loggedOutAllDevices'),
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
      name: `${t('thisDevice')} (${getDeviceName()})`,
      location: t('currentLocation'),
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
        name: t('successfulLogin'),
        time: formatDate(new Date()),
        device: getDeviceType(),
        location: t('currentLocation'),
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
        {t('pageTitle')}
      </h2>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Left Column */}
        <div className="space-y-5">
          {/* PIN Change Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              {t('changePin')}
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  {t('currentPin')}
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
                  {t('newPin')}
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
                  {t('confirmNewPin')}
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
                {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : t('updatePin')}
              </button>
            </div>
          </div>

          {/* Security Info Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              {t('securityTips')}
            </div>
            <div className="space-y-3">
              <div className="flex gap-2 text-sm text-foreground/70">
                <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>{t('tip1')}</span>
              </div>
              <div className="flex gap-2 text-sm text-foreground/70">
                <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>{t('tip2')}</span>
              </div>
              <div className="flex gap-2 text-sm text-foreground/70">
                <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>{t('tip3')}</span>
              </div>
              <div className="flex gap-2 text-sm text-foreground/70">
                <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
                <span>{t('tip4')}</span>
              </div>
            </div>
          </div>

          {/* Account Info Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              {t('accountInfo')}
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-foreground/60">{t('accountId')}</span>
                <span className="font-semibold text-foreground">{user?.id?.slice(-8) || t('notAvailable')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">{t('phone')}</span>
                <span className="font-semibold text-foreground">{user?.phone || t('notAvailable')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">{t('email')}</span>
                <span className="font-semibold text-foreground">{user?.email || t('notAvailable')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-foreground/60">{t('memberSince')}</span>
                <span className="font-semibold text-foreground">
                  {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : t('notAvailable')}
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
                {t('activeSessions')}
              </div>
              {sessions.filter(s => !s.isCurrent).length > 0 && (
                <button
                  onClick={logoutAllDevices}
                  className="text-xs text-red-500 font-semibold hover:underline"
                >
                  {t('logoutAll')}
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
                <p className="text-foreground/50">{t('noSessions')}</p>
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
                        {session.location} · {session.isCurrent ? t('activeNow') : session.time}
                      </div>
                    </div>
                    {session.isCurrent ? (
                      <span className="text-xs text-primary font-semibold">
                        {t('current')}
                      </span>
                    ) : (
                      <button
                        onClick={() => revokeSession(session)}
                        className="text-xs text-red-500 font-semibold hover:underline flex items-center gap-1"
                      >
                        <LogOut size={12} /> {t('logout')}
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
              {t('loginHistory')}
            </div>
            {historyLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : loginHistory.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-4xl mb-2">🔒</div>
                <p className="text-foreground/50">{t('noHistory')}</p>
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
                          📍 {item.location} · {item.device || t('unknownDevice')}
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
                      title: t('fullLoginHistory'),
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
                      confirmButtonText: t('close'),
                      width: "500px",
                    });
                  }}
                  className="text-xs text-primary font-semibold hover:underline"
                >
                  {t('viewAll')} ({loginHistory.length})
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