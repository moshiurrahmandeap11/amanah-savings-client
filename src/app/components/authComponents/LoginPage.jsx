"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  Check,
  Eye,
  EyeOff,
  Globe,
  Landmark,
  Loader2,
  Lock,
  Mail,
  Moon,
  ShieldCheck,
  Smartphone,
  Sun,
  Target,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

// Translations
const translations = {
  en: {
    // Brand
    appName: "Amanah Savings",
    tagline: "Bangladesh's most trusted savings community - your goals, our commitment",
    
    // Features
    feature1: "Fully secure and encrypted - your money is protected",
    feature2: "Goal-based savings - home, wedding, hajj, education",
    feature3: "Easy deposits via bKash, Nagad, Rocket and bank",
    
    // Stats
    members: "Verified Members",
    totalSavings: "Total Savings",
    goalSuccess: "Goal Success",
    activeCircles: "Active Circles",
    
    // Login
    welcomeBack: "Welcome back",
    signInToAccount: "Sign in to your savings account",
    emailAddress: "Email Address",
    emailPlaceholder: "your@email.com",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    forgotPassword: "Forgot password?",
    rememberMe: "Remember me on this device",
    signIn: "Sign In",
    signingIn: "Signing in...",
    noAccount: "Don't have an account?",
    createOneFree: "Create one free",
    
    // Social
    orContinueWith: "or continue with",
    google: "Google",
    facebook: "Facebook",
    
    // Disclaimer
    disclaimer: "Amanah Savings is a savings community platform, not a bank. Savings are locked until goal maturity.",
    
    // Alerts
    loginSuccess: "Login Successful!",
    welcomeBackUser: "Welcome back, {name}!",
    loginFailed: "Login Failed",
    invalidCredentials: "Invalid credentials. Please try again.",
    enterValidEmail: "Enter a valid email address",
    passwordRequired: "Password is required",
    socialNotConnected: "{provider} login is not connected yet",
    socialUseEmail: "Please use your email address to sign in.",
    ok: "OK",
    loading: "Loading...",
    
    // Theme
    toggleTheme: "Toggle color theme",
    hidePassword: "Hide password",
    showPassword: "Show password",
  },
  bn: {
    // Brand
    appName: "আমানাহ সেভিংস",
    tagline: "বাংলাদেশের সবচেয়ে বিশ্বস্ত সঞ্চয় কমিউনিটি - আপনার লক্ষ্য, আমাদের অঙ্গীকার",
    
    // Features
    feature1: "সম্পূর্ণ নিরাপদ ও এনক্রিপ্টেড - আপনার টাকা সুরক্ষিত",
    feature2: "লক্ষ্য-ভিত্তিক সঞ্চয় - ঘর, বিয়ে, হজ, শিক্ষা",
    feature3: "বিকাশ, নগদ, রকেট ও ব্যাংকের মাধ্যমে সহজে ডিপোজিট",
    
    // Stats
    members: "যাচাইকৃত সদস্য",
    totalSavings: "মোট সঞ্চয়",
    goalSuccess: "লক্ষ্য সাফল্য",
    activeCircles: "সক্রিয় সার্কেল",
    
    // Login
    welcomeBack: "স্বাগতম",
    signInToAccount: "আপনার সঞ্চয় অ্যাকাউন্টে সাইন ইন করুন",
    emailAddress: "ইমেইল ঠিকানা",
    emailPlaceholder: "আপনার@ইমেইল.কম",
    password: "পাসওয়ার্ড",
    passwordPlaceholder: "আপনার পাসওয়ার্ড দিন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    rememberMe: "এই ডিভাইসে আমাকে মনে রাখুন",
    signIn: "সাইন ইন",
    signingIn: "সাইন ইন হচ্ছে...",
    noAccount: "অ্যাকাউন্ট নেই?",
    createOneFree: "বিনামূল্যে তৈরি করুন",
    
    // Social
    orContinueWith: "অথবা এর মাধ্যমে চালিয়ে যান",
    google: "গুগল",
    facebook: "ফেসবুক",
    
    // Disclaimer
    disclaimer: "আমানাহ সেভিংস একটি সঞ্চয় কমিউনিটি প্ল্যাটফর্ম, ব্যাংক নয়। লক্ষ্য পরিপক্ক হওয়া পর্যন্ত সঞ্চয় লক থাকে।",
    
    // Alerts
    loginSuccess: "লগইন সফল!",
    welcomeBackUser: "আবারও স্বাগতম, {name}!",
    loginFailed: "লগইন ব্যর্থ",
    invalidCredentials: "ভুল তথ্য। আবার চেষ্টা করুন।",
    enterValidEmail: "একটি বৈধ ইমেইল ঠিকানা দিন",
    passwordRequired: "পাসওয়ার্ড প্রয়োজন",
    socialNotConnected: "{provider} লগইন এখনও সংযুক্ত করা হয়নি",
    socialUseEmail: "দয়া করে আপনার ইমেইল ঠিকানা ব্যবহার করে সাইন ইন করুন।",
    ok: "ঠিক আছে",
    loading: "লোড হচ্ছে...",
    
    // Theme
    toggleTheme: "থিম পরিবর্তন করুন",
    hidePassword: "পাসওয়ার্ড লুকান",
    showPassword: "পাসওয়ার্ড দেখান",
  }
};

const brandFeatures = (t) => [
  {
    icon: ShieldCheck,
    text: t('feature1'),
  },
  {
    icon: Target,
    text: t('feature2'),
  },
  {
    icon: Smartphone,
    text: t('feature3'),
  },
];

const brandStats = (t) => [
  { number: "50,000+", label: t('members') },
  { number: "৳48 crore", label: t('totalSavings') },
  { number: "98%", label: t('goalSuccess') },
  { number: "1,247", label: t('activeCircles') },
];

const LoginPage = () => {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [isDark, setIsDark] = useState(false);
  const [language, setLanguage] = useState("BN");
  const [lang, setLang] = useState("bn");

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage") || "bn";
    setLang(savedLang);
    setLanguage(savedLang === "bn" ? "BN" : "EN");
  }, []);

  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      const user = JSON.parse(localStorage.getItem("user") || "{}");
      if (user?.role === "admin") {
        router.replace("/admin");
      } else {
        router.replace("/dashboard");
      }
    }
  }, [isAuthenticated, authLoading, router]);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const shouldUseDark =
      storedTheme === "dark" ||
      (!storedTheme && document.documentElement.classList.contains("dark"));

    document.documentElement.classList.toggle("dark", shouldUseDark);
    const frame = window.requestAnimationFrame(() => setIsDark(shouldUseDark));

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const showAlert = (title, message, type = "success") => {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonColor: "#059669",
      confirmButtonText: t('ok'),
    });
  };

  const clearFieldError = (field) => {
    setErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
    setIsDark(nextIsDark);
  };

  const toggleLanguage = () => {
    const newLang = lang === "bn" ? "en" : "bn";
    setLang(newLang);
    setLanguage(newLang === "bn" ? "BN" : "EN");
    localStorage.setItem("appLanguage", newLang);
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(identifier.trim())) {
      newErrors.identifier = t('enterValidEmail');
    }

    if (!password.trim()) {
      newErrors.password = t('passwordRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await login(identifier.trim(), password);

      if (result.success) {
        showAlert(
          t('loginSuccess'),
          t('welcomeBackUser', { name: result.user.firstName || result.user.fullName || "User" }),
          "success",
        );
      } else {
        showAlert(t('loginFailed'), result.message, "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      const errorMessage =
        error.response?.data?.message || t('invalidCredentials');

      showAlert(t('loginFailed'), errorMessage, "error");
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    showAlert(
      t('socialNotConnected', { provider }),
      t('socialUseEmail'),
      "info",
    );
  };

  // Get translated features
  const features = brandFeatures(t);
  const stats = brandStats(t);

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f0fdf4] text-[#0f172a] dark:bg-[#0f172a] dark:text-[#f1f5f9]">
        <div className="text-center">
          <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-[#059669]" />
          <p className="text-sm font-medium text-[#64748b] dark:text-[#94a3b8]">
            {t('loading')}
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#f0fdf4] font-sans text-[#0f172a] dark:bg-[#0f172a] dark:text-[#f1f5f9]">
      <section className="grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
        <aside className="relative hidden overflow-hidden bg-[linear-gradient(135deg,#059669,#0891b2)] px-12 py-[60px] md:flex md:flex-col md:items-center md:justify-center">
          <div className="absolute -right-[120px] -top-[150px] h-[500px] w-[500px] rounded-full bg-white/5" />
          <div className="absolute -bottom-20 -left-[60px] h-[300px] w-[300px] rounded-full bg-white/[0.04]" />

          <div className="relative z-10 w-full max-w-[340px] text-center">
            <div className="mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-[20px] border-2 border-white/20 bg-white/15 text-white backdrop-blur">
              <Landmark size={36} strokeWidth={2.2} />
            </div>
            <h1 className="mb-2 text-[28px] font-black leading-tight text-white">
              {t('appName')}
            </h1>
            <p className="mx-auto max-w-[280px] text-sm leading-[1.65] text-white/80">
              {t('tagline')}
            </p>
          </div>

          <div className="relative z-10 mt-9 flex w-full max-w-[340px] flex-col gap-3">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.text}
                  className="flex items-center gap-3 rounded-xl border border-white/15 bg-white/10 px-[15px] py-[11px] backdrop-blur"
                >
                  <Icon className="h-5 w-5 shrink-0 text-white" />
                  <span className="text-[13px] font-medium leading-relaxed text-white/85">
                    {feature.text}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="relative z-10 mt-7 grid w-full max-w-[340px] grid-cols-2 gap-2.5">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl border border-white/15 bg-white/10 p-3.5 text-center backdrop-blur"
              >
                <div className="text-xl font-black leading-tight text-white">
                  {stat.number}
                </div>
                <div className="mt-1 text-[11px] text-white/70">{stat.label}</div>
              </div>
            ))}
          </div>
        </aside>

        <section className="flex min-h-screen items-start justify-center overflow-y-auto px-4 py-16 sm:px-6 md:items-center md:px-6 md:py-10">
          <div className="w-full max-w-[420px]">
            <div className="mb-9 flex items-center justify-between gap-3">
              <Link
                href="/"
                className="flex items-center gap-2 text-[15px] font-extrabold"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-[9px] bg-[linear-gradient(135deg,#059669,#0891b2)] text-white">
                  <Landmark size={17} />
                </span>
                {t('appName')}
              </Link>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label={t('toggleTheme')}
                  className="flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#d1fae5] bg-[#f8fafc] text-[#0f172a] transition hover:border-[#059669] dark:border-[#334155] dark:bg-[#243044] dark:text-[#f1f5f9]"
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </button>
                <button
                  type="button"
                  onClick={toggleLanguage}
                  className="flex h-9 items-center gap-1.5 rounded-lg border-[1.5px] border-[#d1fae5] px-3 text-xs font-extrabold text-[#64748b] transition hover:border-[#059669] hover:text-[#059669] dark:border-[#334155]"
                >
                  <Globe size={14} />
                  {language}
                </button>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="mb-1.5 flex items-center gap-2 text-[1.6rem] font-extrabold leading-tight">
                {t('welcomeBack')}
                <Check className="h-6 w-6 text-[#059669]" />
              </h2>
              <p className="text-sm text-[#64748b]">
                {t('signInToAccount')}
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="mb-1.5 flex items-center justify-between text-[13px] font-semibold text-[#475569] dark:text-[#94a3b8]">
                  {t('emailAddress')}
                </label>

                <div className="relative flex items-center">
                  <Mail className="absolute left-4 h-[18px] w-[18px] text-[#64748b]" />
                  <input
                    type="email"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      clearFieldError("identifier");
                    }}
                    placeholder={t('emailPlaceholder')}
                    className="w-full rounded-xl border-[1.5px] border-[#d1fae5] bg-[#f1f5f9] py-[13px] pl-11 pr-4 text-[15px] text-[#0f172a] outline-none transition placeholder:text-[#64748b] focus:border-[#059669] focus:bg-white dark:border-[#334155] dark:bg-[#1a2744] dark:text-[#f1f5f9] dark:focus:bg-[#1e293b]"
                  />
                </div>

                {errors.identifier && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-[#ef4444]">
                    <AlertCircle size={13} /> {errors.identifier}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <div className="mb-1.5 flex items-center justify-between gap-3 text-[13px] font-semibold text-[#475569] dark:text-[#94a3b8]">
                  <label>{t('password')}</label>
                  <Link
                    href="/forgot-password"
                    className="shrink-0 text-xs font-semibold text-[#059669] hover:underline"
                  >
                    {t('forgotPassword')}
                  </Link>
                </div>
                <div className="relative flex items-center">
                  <Lock className="absolute left-4 h-[18px] w-[18px] text-[#64748b]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      clearFieldError("password");
                    }}
                    placeholder={t('passwordPlaceholder')}
                    className="w-full rounded-xl border-[1.5px] border-[#d1fae5] bg-[#f1f5f9] py-[13px] pl-11 pr-12 text-[15px] text-[#0f172a] outline-none transition placeholder:text-[#64748b] focus:border-[#059669] focus:bg-white dark:border-[#334155] dark:bg-[#1a2744] dark:text-[#f1f5f9] dark:focus:bg-[#1e293b]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? t('hidePassword') : t('showPassword')}
                    className="absolute right-3 flex h-7 w-7 items-center justify-center rounded-lg text-[#64748b] transition hover:text-[#059669]"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1.5 flex items-center gap-1 text-xs text-[#ef4444]">
                    <AlertCircle size={13} /> {errors.password}
                  </p>
                )}
              </div>

              <label className="mb-6 flex cursor-pointer items-center gap-2.5">
                <span className="relative shrink-0">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <span
                    className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] border-2 transition ${
                      rememberMe
                        ? "border-[#059669] bg-[linear-gradient(135deg,#059669,#0891b2)]"
                        : "border-[#d1fae5] bg-[#f1f5f9] dark:border-[#334155] dark:bg-[#1a2744]"
                    }`}
                  >
                    {rememberMe && <Check size={12} className="text-white" />}
                  </span>
                </span>
                <span className="text-[13px] text-[#475569] dark:text-[#94a3b8]">
                  {t('rememberMe')}
                </span>
              </label>

              <button
                type="submit"
                disabled={isLoading}
                className="mb-5 flex w-full items-center justify-center rounded-[14px] bg-[linear-gradient(135deg,#059669,#0891b2)] px-4 py-3.5 text-[15px] font-bold tracking-[0.02em] text-white shadow-[0_4px_16px_rgba(5,150,105,.35)] transition hover:-translate-y-px hover:shadow-[0_6px_20px_rgba(5,150,105,.45)] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('signingIn')}
                  </>
                ) : (
                  t('signIn')
                )}
              </button>
            </form>

            <div className="mb-5 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#d1fae5] dark:bg-[#334155]" />
              <span className="whitespace-nowrap text-xs text-[#64748b]">
                {t('orContinueWith')}
              </span>
              <span className="h-px flex-1 bg-[#d1fae5] dark:bg-[#334155]" />
            </div>

            <div className="mb-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                className="flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#d1fae5] bg-[#f8fafc] px-3 py-3 text-[13px] font-semibold transition hover:border-[#059669] dark:border-[#334155] dark:bg-[#243044]"
              >
                <Globe size={16} />
                {t('google')}
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                className="flex items-center justify-center gap-2 rounded-xl border-[1.5px] border-[#d1fae5] bg-[#f8fafc] px-3 py-3 text-[13px] font-semibold transition hover:border-[#059669] dark:border-[#334155] dark:bg-[#243044]"
              >
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#1877f2] text-[11px] font-black leading-none text-white">
                  f
                </span>
                {t('facebook')}
              </button>
            </div>

            <div className="text-center text-[13px] text-[#64748b]">
              {t('noAccount')}{" "}
              <Link
                href="/register"
                className="font-semibold text-[#059669] hover:underline"
              >
                {t('createOneFree')}
              </Link>
            </div>

            <div className="mt-3.5 rounded-[10px] border border-[rgba(245,158,11,.2)] bg-[rgba(245,158,11,.08)] px-3.5 py-2.5 text-center text-xs leading-normal text-[#f59e0b]">
              {t('disclaimer')}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
};

export default LoginPage;