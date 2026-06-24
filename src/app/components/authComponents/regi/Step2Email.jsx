"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

// Translations
const translations = {
  en: {
    // Step Header
    stepLabel: "Step 2 / 8",
    verifyEmail: "Verify Email",
    codeSent: "A 6-digit code has been sent to",
    yourEmail: "your email",
    
    // Buttons
    sendOtp: "Send OTP to {email}",
    sending: "Sending...",
    verifyEmailBtn: "Verify Email",
    emailVerified: "✓ Email Verified",
    previous: "← Previous",
    
    // Messages
    didntReceive: "Didn't receive code?",
    resend: "Resend",
    resendWithTimer: "Resend ({timer}s)",
  },
  bn: {
    // Step Header
    stepLabel: "ধাপ ২ / ৮",
    verifyEmail: "ইমেইল যাচাই করুন",
    codeSent: "একটি ৬-অঙ্কের কোড পাঠানো হয়েছে",
    yourEmail: "আপনার ইমেইলে",
    
    // Buttons
    sendOtp: "{email} এ ওটিপি পাঠান",
    sending: "পাঠানো হচ্ছে...",
    verifyEmailBtn: "ইমেইল যাচাই করুন",
    emailVerified: "✓ ইমেইল যাচাই করা হয়েছে",
    previous: "← পূর্ববর্তী",
    
    // Messages
    didntReceive: "কোড পাননি?",
    resend: "পুনরায় পাঠান",
    resendWithTimer: "পুনরায় পাঠান ({timer}সে)",
  }
};

const Step2Email = ({
  formData,
  updateField,
  emailOtpTimer,
  emailVerified,
  handleSendEmailOtp,
  handleVerifyEmailOtp,
  handleBack,
  lang = "bn",
}) => {
  const [isResending, setIsResending] = useState(false);
  const [autoSent, setAutoSent] = useState(false);

  // Auto-send OTP when component mounts (first time only)
  useEffect(() => {
    if (!autoSent && formData.email && !emailVerified && emailOtpTimer === 0) {
      setAutoSent(true);
      handleSendEmailOtp();
    }
  }, [autoSent, formData.email, emailVerified, emailOtpTimer, handleSendEmailOtp]);

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

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
        {t('stepLabel')}
      </div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{t('verifyEmail')}</h2>
      <p className="text-foreground/60 mb-2">
        {t('codeSent')}{" "}
        <strong>{formData.email || t('yourEmail')}</strong>
      </p>

      {emailOtpTimer === 0 && !emailVerified && formData.email && !autoSent && (
        <button
          onClick={onResendOtp}
          disabled={isResending}
          className="w-full py-2 bg-primary/10 text-primary rounded-xl font-semibold mb-3 text-sm hover:bg-primary/20 transition disabled:opacity-50"
        >
          {isResending ? t('sending') : t('sendOtp', { email: formData.email })}
        </button>
      )}

      {emailOtpTimer > 0 && !emailVerified && (
        <p className="text-sm text-primary font-semibold mb-3">
          {t('codeSent')} <strong>{formData.email}</strong>
        </p>
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
        {t('didntReceive')}
        <button
          className="text-primary font-semibold ml-1 hover:underline disabled:opacity-50"
          disabled={
            emailOtpTimer > 0 || emailVerified || !formData.email || isResending
          }
          onClick={onResendOtp}
        >
          {emailOtpTimer > 0 
            ? t('resendWithTimer', { timer: emailOtpTimer })
            : t('resend')
          }
        </button>
      </p>

      <button
        onClick={handleVerifyEmailOtp}
        disabled={emailVerified || !formData.email}
        className={`w-full py-3 rounded-xl font-semibold mb-3 transition ${emailVerified ? "bg-green-500 text-white" : "bg-linear-to-r from-primary to-primary-light text-white hover:opacity-90"}`}
      >
        {emailVerified ? t('emailVerified') : t('verifyEmailBtn')}
      </button>

      <button
        onClick={handleBack}
        className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary hover:text-primary transition"
      >
        {t('previous')}
      </button>
    </motion.div>
  );
};

export default Step2Email;
