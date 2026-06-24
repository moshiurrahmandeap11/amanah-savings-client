"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Globe } from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "../../components/shared/AxiosInstance/AxiosInstance";

const translations = {
  en: {
    ok: "OK",
    error: "Error",
    failed: "Failed",
    otpSentTitle: "OTP Sent!",
    resetSuccessTitle: "Password Reset Successful!",
    resetFailedTitle: "Reset Failed",
    enterEmail: "Please enter your email address",
    enterValidEmail: "Please enter a valid email address",
    otpSentMessage:
      "A password reset OTP has been sent to your email address. Please check your inbox.",
    sendOtpFailed: "Failed to send OTP. Please try again.",
    validOtp: "Please enter a valid 6-digit OTP",
    passwordLength: "Password must be at least 8 characters long",
    passwordsMismatch: "Passwords do not match",
    resetSuccessMessage:
      "Your password has been reset. Please login with your new password.",
    resetFailedMessage: "Failed to reset password. Please try again.",
    backToLogin: "Back to Login",
    forgotPassword: "Forgot Password?",
    resetPassword: "Reset Password",
    step1Desc:
      "Enter your email address and we'll send you an OTP to reset your password",
    step2Desc: "Enter the OTP sent to your email and create a new password",
    emailAddress: "Email Address",
    emailPlaceholder: "your@email.com",
    sendingOtp: "Sending OTP...",
    sendResetOtp: "Send Reset OTP ->",
    enterOtp: "Enter OTP",
    otpPlaceholder: "Enter 6-digit OTP",
    otpSentTo: "OTP sent to {email}",
    newPassword: "New Password",
    passwordPlaceholder: "At least 8 characters",
    hide: "Hide",
    show: "Show",
    confirmNewPassword: "Confirm New Password",
    confirmPasswordPlaceholder: "Re-enter your new password",
    resettingPassword: "Resetting Password...",
    resetPasswordButton: "Reset Password ->",
    resendOtp: "Didn't receive OTP? Resend",
    or: "or",
    rememberPassword: "Remember your password?",
    securityNote:
      "For security, never share your OTP with anyone. Our team will never ask for your verification codes.",
  },
  bn: {
    ok: "ঠিক আছে",
    error: "ত্রুটি",
    failed: "ব্যর্থ",
    otpSentTitle: "ওটিপি পাঠানো হয়েছে!",
    resetSuccessTitle: "পাসওয়ার্ড রিসেট সফল!",
    resetFailedTitle: "রিসেট ব্যর্থ",
    enterEmail: "দয়া করে আপনার ইমেইল ঠিকানা লিখুন",
    enterValidEmail: "দয়া করে একটি সঠিক ইমেইল ঠিকানা লিখুন",
    otpSentMessage:
      "আপনার ইমেইলে পাসওয়ার্ড রিসেট ওটিপি পাঠানো হয়েছে। ইনবক্স চেক করুন।",
    sendOtpFailed: "ওটিপি পাঠানো যায়নি। আবার চেষ্টা করুন।",
    validOtp: "দয়া করে সঠিক ৬ সংখ্যার ওটিপি লিখুন",
    passwordLength: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
    passwordsMismatch: "পাসওয়ার্ড মিলছে না",
    resetSuccessMessage:
      "আপনার পাসওয়ার্ড রিসেট হয়েছে। নতুন পাসওয়ার্ড দিয়ে লগইন করুন।",
    resetFailedMessage: "পাসওয়ার্ড রিসেট করা যায়নি। আবার চেষ্টা করুন।",
    backToLogin: "লগইনে ফিরে যান",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    resetPassword: "পাসওয়ার্ড রিসেট",
    step1Desc:
      "আপনার ইমেইল দিন, আমরা পাসওয়ার্ড রিসেটের জন্য একটি ওটিপি পাঠাবো",
    step2Desc: "ইমেইলে পাওয়া ওটিপি দিন এবং নতুন পাসওয়ার্ড সেট করুন",
    emailAddress: "ইমেইল ঠিকানা",
    emailPlaceholder: "আপনার@ইমেইল.কম",
    sendingOtp: "ওটিপি পাঠানো হচ্ছে...",
    sendResetOtp: "রিসেট ওটিপি পাঠান ->",
    enterOtp: "ওটিপি লিখুন",
    otpPlaceholder: "৬ সংখ্যার ওটিপি লিখুন",
    otpSentTo: "ওটিপি পাঠানো হয়েছে {email} এ",
    newPassword: "নতুন পাসওয়ার্ড",
    passwordPlaceholder: "কমপক্ষে ৮ অক্ষর",
    hide: "লুকান",
    show: "দেখান",
    confirmNewPassword: "নতুন পাসওয়ার্ড নিশ্চিত করুন",
    confirmPasswordPlaceholder: "নতুন পাসওয়ার্ড আবার লিখুন",
    resettingPassword: "পাসওয়ার্ড রিসেট হচ্ছে...",
    resetPasswordButton: "পাসওয়ার্ড রিসেট করুন ->",
    resendOtp: "ওটিপি পাননি? আবার পাঠান",
    or: "অথবা",
    rememberPassword: "পাসওয়ার্ড মনে আছে?",
    securityNote:
      "নিরাপত্তার জন্য আপনার ওটিপি কারও সাথে শেয়ার করবেন না। আমাদের টিম কখনও ভেরিফিকেশন কোড চাইবে না।",
  },
};

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1); // 1: email, 2: otp & reset
  const [lang, setLang] = useState("bn");

  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach((param) => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedLang = localStorage.getItem("appLanguage") || "bn";
      setLang(savedLang);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleLanguage = () => {
    const newLang = lang === "bn" ? "en" : "bn";
    setLang(newLang);
    localStorage.setItem("appLanguage", newLang);
  };

  const showAlert = (title, message, type = "success") => {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonColor: "#059669",
      confirmButtonText: t("ok"),
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showAlert(t("error"), t("enterEmail"), "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert(t("error"), t("enterValidEmail"), "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/users/forgot-password/send-otp", { email });
      
      if (response.data.success) {
        setOtpSent(true);
        setStep(2);
        showAlert(
          t("otpSentTitle"),
          t("otpSentMessage"),
          "success"
        );
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      showAlert(
        t("failed"),
        error.response?.data?.message || t("sendOtpFailed"),
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      showAlert(t("error"), t("validOtp"), "error");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      showAlert(t("error"), t("passwordLength"), "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert(t("error"), t("passwordsMismatch"), "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/users/forgot-password/reset", {
        email,
        otp,
        newPassword,
      });

      if (response.data.success) {
        showAlert(
          t("resetSuccessTitle"),
          t("resetSuccessMessage"),
          "success"
        );
        router.push("/login");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      showAlert(
        t("resetFailedTitle"),
        error.response?.data?.message || t("resetFailedMessage"),
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-between mb-4">
            <div />
          </div>

          <Link href="/" className="inline-flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white text-xl">
              🌿
            </div>
            <span className="font-bold text-xl">
              Amanah <span className="text-primary">Savings</span>
            </span>
          </Link>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8"
        >
          {/* Back Button */}
          <Link
            href="/login"
            className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-primary transition mb-6"
          >
            <ArrowLeft size={16} /> {t("backToLogin")}
          </Link>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {step === 1 ? t("forgotPassword") : t("resetPassword")}
            </h2>
            <p className="text-foreground/60 text-sm">
              {step === 1
                ? t("step1Desc")
                : t("step2Desc")}
            </p>
          </div>

          {/* Step 1: Email Form */}
          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  {t("emailAddress")}
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("emailPlaceholder")}
                    className="w-full p-3 pl-10 rounded-xl border border-border bg-input text-foreground outline-none focus:border-primary transition"
                    autoFocus
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("sendingOtp")}
                  </span>
                ) : (
                  t("sendResetOtp")
                )}
              </button>
            </form>
          )}

          {/* Step 2: OTP & Reset Password Form */}
          {step === 2 && (
            <form onSubmit={handleResetPassword}>
              {/* OTP Input */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  {t("enterOtp")}
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder={t("otpPlaceholder")}
                  className="w-full p-3 rounded-xl border border-border bg-input text-foreground text-center text-2xl tracking-widest font-mono outline-none focus:border-primary transition"
                  maxLength={6}
                  autoFocus
                />
                <p className="text-xs text-foreground/50 mt-1 text-center">
                  {t("otpSentTo", { email })}
                </p>
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  {t("newPassword")}
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder={t("passwordPlaceholder")}
                    className="w-full p-3 pr-10 rounded-xl border border-border bg-input text-foreground outline-none focus:border-primary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-primary transition"
                  >
                    {showPassword ? t("hide") : t("show")}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  {t("confirmNewPassword")}
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("confirmPasswordPlaceholder")}
                  className="w-full p-3 rounded-xl border border-border bg-input text-foreground outline-none focus:border-primary transition"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
              >
                {isLoading ? (
                  <span className="inline-flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    {t("resettingPassword")}
                  </span>
                ) : (
                  t("resetPasswordButton")
                )}
              </button>

              {/* Resend OTP Link */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-sm text-primary hover:underline"
                >
                  {t("resendOtp")}
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-foreground/40">{t("or")}</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Footer */}
          <div className="text-center">
            <span className="text-sm text-foreground/60">
              {t("rememberPassword")}{" "}
            </span>
            <Link
              href="/login"
              className="text-sm text-primary font-semibold hover:underline"
            >
              {t("backToLogin")} {"->"}
            </Link>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-xs text-amber-500 text-center">
              🔒 {t("securityNote")}
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;