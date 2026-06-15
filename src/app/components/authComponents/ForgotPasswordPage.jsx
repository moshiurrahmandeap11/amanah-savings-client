"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, CheckCircle, AlertCircle } from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "../../components/shared/AxiosInstance/AxiosInstance";

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

  const showAlert = (title, message, type = "success") => {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonColor: "#059669",
      confirmButtonText: "OK",
    });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    
    if (!email) {
      showAlert("Error", "Please enter your email address", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showAlert("Error", "Please enter a valid email address", "error");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axiosInstance.post("/users/forgot-password/send-otp", { email });
      
      if (response.data.success) {
        setOtpSent(true);
        setStep(2);
        showAlert(
          "OTP Sent!",
          "A password reset OTP has been sent to your email address. Please check your inbox.",
          "success"
        );
      }
    } catch (error) {
      console.error("Send OTP error:", error);
      showAlert(
        "Failed",
        error.response?.data?.message || "Failed to send OTP. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      showAlert("Error", "Please enter a valid 6-digit OTP", "error");
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      showAlert("Error", "Password must be at least 8 characters long", "error");
      return;
    }

    if (newPassword !== confirmPassword) {
      showAlert("Error", "Passwords do not match", "error");
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
          "Password Reset Successful!",
          "Your password has been reset. Please login with your new password.",
          "success"
        );
        router.push("/login");
      }
    } catch (error) {
      console.error("Reset password error:", error);
      showAlert(
        "Reset Failed",
        error.response?.data?.message || "Failed to reset password. Please try again.",
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
            <ArrowLeft size={16} /> Back to Login
          </Link>

          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              {step === 1 ? "Forgot Password?" : "Reset Password"}
            </h2>
            <p className="text-foreground/60 text-sm">
              {step === 1
                ? "Enter your email address and we'll send you an OTP to reset your password"
                : "Enter the OTP sent to your email and create a new password"}
            </p>
          </div>

          {/* Step 1: Email Form */}
          {step === 1 && (
            <form onSubmit={handleSendOtp}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
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
                    Sending OTP...
                  </span>
                ) : (
                  "Send Reset OTP →"
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
                  Enter OTP
                </label>
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  placeholder="Enter 6-digit OTP"
                  className="w-full p-3 rounded-xl border border-border bg-input text-foreground text-center text-2xl tracking-widest font-mono outline-none focus:border-primary transition"
                  maxLength={6}
                  autoFocus
                />
                <p className="text-xs text-foreground/50 mt-1 text-center">
                  OTP sent to {email}
                </p>
              </div>

              {/* New Password */}
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full p-3 pr-10 rounded-xl border border-border bg-input text-foreground outline-none focus:border-primary transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-primary transition"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter your new password"
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
                    Resetting Password...
                  </span>
                ) : (
                  "Reset Password →"
                )}
              </button>

              {/* Resend OTP Link */}
              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-sm text-primary hover:underline"
                >
                  Didn't receive OTP? Resend
                </button>
              </div>
            </form>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-foreground/40">or</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Footer */}
          <div className="text-center">
            <span className="text-sm text-foreground/60">
              Remember your password?{" "}
            </span>
            <Link
              href="/login"
              className="text-sm text-primary font-semibold hover:underline"
            >
              Back to Login →
            </Link>
          </div>

          {/* Security Note */}
          <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
            <p className="text-xs text-amber-500 text-center">
              🔒 For security, never share your OTP with anyone. Our team will
              never ask for your verification codes.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;