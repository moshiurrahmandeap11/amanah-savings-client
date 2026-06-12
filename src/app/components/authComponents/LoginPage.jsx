"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Phone,
  Lock,
  Check,
  AlertCircle,
} from "lucide-react";

const LoginPage = () => {
  const [loginMethod, setLoginMethod] = useState("phone");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [resendCooldown, setResendCooldown] = useState(false);
  const [cooldownSeconds, setCooldownSeconds] = useState(60);
  const [errors, setErrors] = useState({});

  const otpInputs = Array(6).fill(0);

  const validateForm = () => {
    const newErrors = {};
    if (loginMethod === "phone") {
      const phoneRegex = /^1[3-9]\d{8}$/;
      if (!phoneRegex.test(phone.replace(/\D/g, ""))) {
        newErrors.phone = "Enter a valid phone number (e.g., 17XXXXXXXX)";
      }
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Enter a valid email address";
      }
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setShowOtp(true);
      startResendTimer();
    }, 800);
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.replace(/\D/g, "").slice(0, 1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const verifyOtp = () => {
    const otpCode = otp.join("");
    if (otpCode.length < 6) {
      alert("Please enter all 6 digits");
      return;
    }
    window.location.href = "/dashboard";
  };

  const startResendTimer = () => {
    setResendCooldown(true);
    setCooldownSeconds(60);
    const timer = setInterval(() => {
      setCooldownSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendCooldown(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const resendOtp = () => {
    if (!resendCooldown) {
      alert("OTP resent successfully!");
      startResendTimer();
    }
  };

  const backToLogin = () => {
    setShowOtp(false);
    setOtp(["", "", "", "", "", ""]);
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
          {!showOtp ? (
            <>
              {/* Header */}
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Welcome Back
                </h2>
                <p className="text-foreground/60 text-sm">
                  Sign in to your savings account
                </p>
              </div>

              {/* Tabs */}
              <div className="flex bg-secondary/20 rounded-xl p-1 mb-6">
                <button
                  onClick={() => {
                    setLoginMethod("phone");
                    setErrors({});
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                    loginMethod === "phone"
                      ? "bg-linear-to-r from-primary to-primary-light text-white shadow-md"
                      : "text-foreground/60 hover:text-primary"
                  }`}
                >
                  <Phone size={14} className="inline mr-1" /> Phone
                </button>
                <button
                  onClick={() => {
                    setLoginMethod("email");
                    setErrors({});
                  }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition ${
                    loginMethod === "email"
                      ? "bg-linear-to-r from-primary to-primary-light text-white shadow-md"
                      : "text-foreground/60 hover:text-primary"
                  }`}
                >
                  <Mail size={14} className="inline mr-1" /> Email
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                {/* Phone Input */}
                {loginMethod === "phone" && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-foreground/70 mb-1">
                      Mobile Number
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-input text-foreground/60 text-sm">
                        +880
                      </span>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => {
                          setPhone(
                            e.target.value.replace(/\D/g, "").slice(0, 11),
                          );
                          setErrors({});
                        }}
                        placeholder="1XXXXXXXXX"
                        className="flex-1 p-3 rounded-r-xl border border-border bg-input text-foreground outline-none focus:border-primary transition"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.phone}
                      </p>
                    )}
                  </div>
                )}

                {/* Email Input */}
                {loginMethod === "email" && (
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-foreground/70 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        setErrors({});
                      }}
                      placeholder="your@email.com"
                      className="w-full p-3 rounded-xl border border-border bg-input text-foreground outline-none focus:border-primary transition"
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.email}
                      </p>
                    )}
                  </div>
                )}

                {/* Password Input */}
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-sm font-semibold text-foreground/70">
                      Password
                    </label>
                    <Link
                      href="/forgot-password"
                      className="text-xs text-primary hover:underline"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setErrors({});
                      }}
                      placeholder="Enter your password"
                      className="w-full p-3 rounded-xl border border-border bg-input text-foreground outline-none focus:border-primary transition pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50 hover:text-primary transition"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="mb-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${rememberMe ? "bg-primary border-primary" : "border-border"}`}
                      >
                        {rememberMe && (
                          <Check size={12} className="text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-foreground/60">
                      Remember me on this device
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In →"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-3 my-6">
                <div className="flex-1 h-px bg-border" />
                <span className="text-xs text-foreground/40">
                  or continue with
                </span>
                <div className="flex-1 h-px bg-border" />
              </div>

              {/* Social Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button className="py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-semibold hover:border-primary transition">
                  Continue with Google
                </button>
                <button className="py-2.5 rounded-xl border border-border bg-card text-foreground text-sm font-semibold hover:border-primary transition">
                  Continue with Facebook
                </button>
              </div>

              {/* Footer */}
              <div className="text-center">
                <span className="text-sm text-foreground/60">
                  Don&apos;t have an account?{" "}
                </span>
                <Link
                  href="/register"
                  className="text-sm text-primary font-semibold hover:underline"
                >
                  Create one free →
                </Link>
              </div>

              {/* Disclaimer */}
              <div className="mt-6 p-3 bg-amber-500/10 border border-amber-500/20 rounded-lg">
                <p className="text-xs text-amber-500 text-center">
                  Amanah is a savings community platform, not a bank. Savings
                  are locked until goal maturity.
                </p>
              </div>
            </>
          ) : (
            // OTP Verification Panel
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Verify Identity
                </h2>
                <p className="text-foreground/60 text-sm">
                  Enter the 6-digit code sent to <br />
                  <strong className="text-primary">
                    {loginMethod === "phone" ? `+880 ${phone}` : email}
                  </strong>
                </p>
              </div>

              {/* OTP Inputs */}
              <div className="flex justify-center gap-2 mb-6">
                {otpInputs.map((_, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    maxLength={1}
                    value={otp[index]}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(e, index)}
                    className="w-12 h-12 text-center text-xl font-bold rounded-xl border bg-input text-foreground outline-none focus:border-primary transition"
                  />
                ))}
              </div>

              {/* Verify Button */}
              <button
                onClick={verifyOtp}
                className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition mb-4"
              >
                Verify & Sign In →
              </button>

              {/* Resend Options */}
              <div className="text-center">
                <span className="text-sm text-foreground/60">
                  Didn&apos;t receive the code?{" "}
                </span>
                {resendCooldown ? (
                  <span className="text-sm text-foreground/40">
                    Resend in {cooldownSeconds}s
                  </span>
                ) : (
                  <button
                    onClick={resendOtp}
                    className="text-sm text-primary font-semibold hover:underline"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              {/* Back to Login */}
              <div className="text-center mt-3">
                <button
                  onClick={backToLogin}
                  className="text-sm text-foreground/60 hover:text-primary transition"
                >
                  ← Back to login
                </button>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;
