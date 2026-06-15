"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";

const Step2Email = ({
  formData,
  updateField,
  emailOtpTimer,
  emailVerified,
  handleSendEmailOtp,
  handleVerifyEmailOtp,
  handleBack,
}) => {
  const [isResending, setIsResending] = useState(false);

  const onResendOtp = async () => {
    if (emailOtpTimer > 0 || emailVerified || !formData.email) return;

    setIsResending(true);
    await handleSendEmailOtp();
    setIsResending(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border rounded-2xl p-6 text-center"
    >
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
        Step 2 / 8
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">Verify Email</h2>
      <p className="text-foreground/60 mb-2">
        A 6-digit code has been sent to{" "}
        <strong>{formData.email || "your email"}</strong>
      </p>

      {emailOtpTimer === 0 && !emailVerified && formData.email && (
        <button
          onClick={onResendOtp}
          disabled={isResending}
          className="w-full py-2 bg-primary/10 text-primary rounded-xl font-semibold mb-3 text-sm hover:bg-primary/20 transition disabled:opacity-50"
        >
          {isResending ? "Sending..." : `Send OTP to ${formData.email}`}
        </button>
      )}

      <div className="flex justify-center gap-2 mb-4">
        {formData.emailOtp.map((digit, idx) => (
          <input
            key={idx}
            type="text"
            maxLength={1}
            value={digit}
            onChange={(e) => {
              const newOtp = [...formData.emailOtp];
              newOtp[idx] = e.target.value.replace(/\D/g, "");
              updateField("emailOtp", newOtp);
              if (e.target.value && idx < 5) {
                const nextInput = document.getElementById(
                  `emailOtp-${idx + 1}`,
                );
                if (nextInput) nextInput.focus();
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Backspace" && !digit && idx > 0) {
                const prevInput = document.getElementById(
                  `emailOtp-${idx - 1}`,
                );
                if (prevInput) prevInput.focus();
              }
            }}
            id={`emailOtp-${idx}`}
            className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
            disabled={emailVerified}
          />
        ))}
      </div>

      <p className="text-sm text-foreground/50 mb-4">
        Didn't receive code?
        <button
          className="text-primary font-semibold ml-1 hover:underline disabled:opacity-50"
          disabled={
            emailOtpTimer > 0 || emailVerified || !formData.email || isResending
          }
          onClick={onResendOtp}
        >
          Resend {emailOtpTimer > 0 && `(${emailOtpTimer}s)`}
        </button>
      </p>

      <button
        onClick={handleVerifyEmailOtp}
        disabled={emailVerified || !formData.email}
        className={`w-full py-3 rounded-xl font-semibold mb-3 transition ${emailVerified ? "bg-green-500 text-white" : "bg-linear-to-r from-primary to-primary-light text-white hover:opacity-90"}`}
      >
        {emailVerified ? "✓ Email Verified" : "Verify Email"}
      </button>

      <button
        onClick={handleBack}
        className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary hover:text-primary transition"
      >
        ← Previous
      </button>
    </motion.div>
  );
};

export default Step2Email;
