// app/login/page.js
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Check,
  AlertCircle,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const LoginPage = () => {
  const router = useRouter();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

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

  const showAlert = (title, message, type = "success") => {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonColor: "#059669",
      confirmButtonText: "OK",
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!password.trim()) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        showAlert(
          "Login Successful!",
          `Welcome back, ${result.user.firstName || result.user.fullName || "User"}!`,
          "success",
        );
        // রিডাইরেক্ট হবে useEffect এর মাধ্যমে
      } else {
        showAlert("Login Failed", result.message, "error");
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Login error:", error);
      let errorMessage = "Invalid credentials. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      showAlert("Login Failed", errorMessage, "error");
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

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
              Sanchoy <span className="text-primary">Bondhu</span>
            </span>
          </Link>
        </div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 sm:p-8"
        >
          {/* Header */}
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Welcome Back
            </h2>
            <p className="text-foreground/60 text-sm">
              Sign in to your savings account
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div className="mb-4">
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors({});
                  }}
                  placeholder="your@email.com"
                  className="w-full p-3 pl-10 rounded-xl border border-border bg-input text-foreground outline-none focus:border-primary transition"
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>

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
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/40">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors({});
                  }}
                  placeholder="Enter your password"
                  className="w-full p-3 pl-10 rounded-xl border border-border bg-input text-foreground outline-none focus:border-primary transition pr-10"
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
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition ${
                      rememberMe ? "bg-primary border-primary" : "border-border"
                    }`}
                  >
                    {rememberMe && <Check size={12} className="text-white" />}
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
              Sanchoy Bondhu is a savings community platform, not a bank. Savings are
              locked until goal maturity.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoginPage;