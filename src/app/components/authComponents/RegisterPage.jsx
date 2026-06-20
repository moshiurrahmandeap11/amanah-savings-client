"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Swal from "sweetalert2";
import axiosInstance from "../shared/AxiosInstance/AxiosInstance";
import useAuth from "../../hooks/useAuth";
import Step1Account from "./regi/Step1Account";
import Step2Email from "./regi/Step2Email";
import Step3Personal from "./regi/Step3Personal";
import Step4Nominee from "./regi/Step4Nominee";
import Step5Plan from "./regi/Step5Plan";
import Step7Kyc from "./regi/Step7Kyc";
import Step8Payment from "./regi/Step8Payment";
import Step6Pin from "./regi/Step6Pin";
import { Landmark, Moon, Sun, Globe } from "lucide-react";

// Translations
const translations = {
  en: {
    sanchoyBondhu: "Sanchoy Bondhu",
    alreadyHaveAccount: "Already have an account?",
    login: "Login",
    welcomeToAmanah: "Welcome to Sanchoy Bondhu!",
    accountCreated: "Your account has been successfully created! Our KYC team will verify your documents within 4 hours.",
    whatsNext: "What's next?",
    accountCreatedLabel: "Account created",
    kycUnderReview: "KYC under review (up to 4 hours)",
    receiveSMS: "You'll receive SMS upon approval",
    referFriend: "Refer a friend — Get ৳500 bonus!",
    copy: "Copy",
    copied: "Copied!",
    referralCodeCopied: "Referral code copied to clipboard",
    goToDashboard: "Go to Dashboard",
    backToHome: "Back to Home",
    stepAccount: "Account",
    stepEmail: "Email",
    stepPersonal: "Personal",
    stepNominee: "Nominee",
    stepPlan: "Plan",
    stepPin: "PIN",
    stepKyc: "KYC",
    stepPayment: "Payment",
    registrationSuccessful: "Registration Successful! 🎉",
    accountCreatedMessage: "{name}, your account has been successfully created!",
    whatsNextList: "📋 What's next?",
    referralBonus: "🎁 Referral Bonus: Share your code and earn ৳500!",
    registrationFailed: "Registration Failed",
    invalidEmail: "Invalid Email",
    pleaseEnterEmail: "Please enter your email address",
    otpSent: "OTP Sent!",
    checkEmail: "Please check your email for the verification code",
    failedToSendOTP: "Could not send OTP. Please try again.",
    invalidOTP: "Invalid OTP",
    enterAllDigits: "Please enter all 6 digits",
    verificationFailed: "Verification Failed",
    invalidExpiredOTP: "Invalid or expired OTP. Please try again.",
    success: "Success!",
    emailVerified: "Email verified successfully",
    failed: "Failed",
    registrationFailedMessage: "Registration failed. Please try again.",
  },
  bn: {
    sanchoyBondhu: "সঞ্চয় বন্ধু",
    alreadyHaveAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    login: "লগইন",
    welcomeToAmanah: "সঞ্চয় বন্ধুতে স্বাগতম!",
    accountCreated: "আপনার অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে! আমাদের কেওয়াইসি টিম ৪ ঘন্টার মধ্যে আপনার নথি যাচাই করবে।",
    whatsNext: "পরবর্তী কী?",
    accountCreatedLabel: "অ্যাকাউন্ট তৈরি হয়েছে",
    kycUnderReview: "কেওয়াইসি পর্যালোচনাধীন (৪ ঘন্টা পর্যন্ত)",
    receiveSMS: "অনুমোদনের পর আপনি এসএমএস পাবেন",
    referFriend: "বন্ধুকে রেফার করুন — ৳৫০০ বোনাস পান!",
    copy: "কপি",
    copied: "কপি করা হয়েছে!",
    referralCodeCopied: "রেফারেল কোড ক্লিপবোর্ডে কপি করা হয়েছে",
    goToDashboard: "ড্যাশবোর্ডে যান",
    backToHome: "হোমে ফিরে যান",
    stepAccount: "অ্যাকাউন্ট",
    stepEmail: "ইমেইল",
    stepPersonal: "ব্যক্তিগত",
    stepNominee: "উত্তরাধিকারী",
    stepPlan: "প্ল্যান",
    stepPin: "পিন",
    stepKyc: "কেওয়াইসি",
    stepPayment: "পেমেন্ট",
    registrationSuccessful: "নিবন্ধন সফল! 🎉",
    accountCreatedMessage: "{name}, আপনার অ্যাকাউন্ট সফলভাবে তৈরি করা হয়েছে!",
    whatsNextList: "📋 পরবর্তী কী?",
    referralBonus: "🎁 রেফারেল বোনাস: আপনার কোড শেয়ার করুন এবং ৳৫০০ উপার্জন করুন!",
    registrationFailed: "নিবন্ধন ব্যর্থ",
    invalidEmail: "অবৈধ ইমেইল",
    pleaseEnterEmail: "দয়া করে আপনার ইমেইল ঠিকানা দিন",
    otpSent: "ওটিপি পাঠানো হয়েছে!",
    checkEmail: "যাচাইকরণ কোডের জন্য আপনার ইমেইল চেক করুন",
    failedToSendOTP: "ওটিপি পাঠানো যায়নি। আবার চেষ্টা করুন।",
    invalidOTP: "অবৈধ ওটিপি",
    enterAllDigits: "দয়া করে সব ৬টি ডিজিট দিন",
    verificationFailed: "যাচাইকরণ ব্যর্থ",
    invalidExpiredOTP: "অবৈধ বা মেয়াদোত্তীর্ণ ওটিপি। আবার চেষ্টা করুন।",
    success: "সফল!",
    emailVerified: "ইমেইল সফলভাবে যাচাই করা হয়েছে",
    failed: "ব্যর্থ",
    registrationFailedMessage: "নিবন্ধন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
  }
};

const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [lang, setLang] = useState("bn");
  const [isDark, setIsDark] = useState(false);
  
  // ============ UPDATED formData with KYC fields ============
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    emailOtp: ["", "", "", "", "", ""],
    dob: "",
    gender: "",
    division: "",
    district: "",
    upazila: "",
    occupation: "",
    income: "",
    referralCode: "",
    village: "",
    postOffice: "",
    postCode: "",
    nomineeFirstName: "",
    nomineeLastName: "",
    nomineeRelation: "",
    nomineePhone: "",
    nomineeNid: "",
    nomineeShare: "100",
    selectedPlan: "silver",
    goalType: "",
    targetAmount: "",
    monthlyDeposit: "",
    duration: "",
    pin: "",
    confirmPin: "",
    // ============ KYC FIELDS ============
    nidNumber: "",
    nidFrontImage: "",
    nidFrontPublicId: "",
    nidFrontUploaded: false,
    nidBackImage: "",
    nidBackPublicId: "",
    nidBackUploaded: false,
    birthCertificateImage: "",
    birthCertificatePublicId: "",
    birthCertificateUploaded: false,
    selfieImage: "",
    selfiePublicId: "",
    selfieTaken: false,
    passportImage: "",
    passportPublicId: "",
    passportUploaded: false,
    kycConsent: false,
    kycSkipped: false,
    islamicMode: false,
    // ============ PAYMENT FIELDS ============
    paymentMethod: "",
    walletNumber: "",
    walletName: "",
    bankName: "",
    bankAccNum: "",
    bankAccName: "",
    bankBranch: "",
    bankRouting: "",
    terms: false,
    withdrawalPolicy: false,
    marketing: false,
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [emailOtpTimer, setEmailOtpTimer] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [pinStep, setPinStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});

  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const savedLang = localStorage.getItem("appLanguage") || "bn";
      setLang(savedLang);
      
      const savedTheme = localStorage.getItem("theme");
      const shouldUseDark = savedTheme === "dark" || (!savedTheme && document.documentElement.classList.contains("dark"));
      setIsDark(shouldUseDark);
      document.documentElement.classList.toggle("dark", shouldUseDark);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const toggleTheme = () => {
    const nextIsDark = !isDark;
    setIsDark(nextIsDark);
    document.documentElement.classList.toggle("dark", nextIsDark);
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  const toggleLanguage = () => {
    const newLang = lang === "bn" ? "en" : "bn";
    setLang(newLang);
    localStorage.setItem("appLanguage", newLang);
  };

  const districts = {
    Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Munshiganj", "Manikganj", "Narsingdi", "Kishoreganj", "Tangail", "Faridpur", "Gopalganj"],
    Chittagong: ["Chittagong", "Cox's Bazar", "Comilla", "Feni", "Brahmanbaria", "Noakhali", "Lakshmipur", "Chandpur"],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    Rajshahi: ["Rajshahi", "Natore", "Bogra", "Sirajganj", "Pabna", "Naogaon", "Chapainawabganj", "Joypurhat"],
    Khulna: ["Khulna", "Jessore", "Satkhira", "Bagerhat", "Narail", "Magura", "Jhenaidah", "Kushtia", "Meherpur"],
    Barisal: ["Barisal", "Patuakhali", "Bhola", "Pirojpur", "Jhalokati", "Barguna"],
    Rangpur: ["Rangpur", "Dinajpur", "Kurigram", "Gaibandha", "Nilphamari", "Lalmonirhat", "Thakurgaon", "Panchagarh"],
    Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  };

  const totalSteps = 8;
  const stepProgress = {
    1: 12.5, 2: 25, 3: 37.5, 4: 50, 5: 62.5, 6: 75, 7: 87.5, 8: 100,
  };

  const getStepLabels = () => [
    t('stepAccount'), t('stepEmail'), t('stepPersonal'), t('stepNominee'),
    t('stepPlan'), t('stepPin'), t('stepKyc'), t('stepPayment'),
  ];

  const stepLabels = getStepLabels();

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      const referralFromUrl = params.get("ref") || params.get("referralCode");
      if (referralFromUrl) {
        updateField("referralCode", referralFromUrl.trim().toUpperCase());
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const showAlert = (title, message, type = "success") => {
    Swal.fire({
      title,
      text: message,
      icon: type,
      confirmButtonColor: "#059669",
    });
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSendEmailOtp = async () => {
    if (!formData.email) {
      showAlert(t('invalidEmail'), t('pleaseEnterEmail'), "error");
      return;
    }
    try {
      const response = await axiosInstance.post("/users/send-email-otp", {
        email: formData.email,
      });
      if (response.data.success) {
        setEmailOtpTimer(60);
        showAlert(t('otpSent'), t('checkEmail'), "success");
      }
    } catch (error) {
      showAlert(t('failed'), t('failedToSendOTP'), "error");
    }
  };

  const handleVerifyEmailOtp = async () => {
    const otp = formData.emailOtp.join("");
    if (otp.length !== 6) {
      showAlert(t('invalidOTP'), t('enterAllDigits'), "error");
      return;
    }
    try {
      const response = await axiosInstance.post("/users/verify-email-otp", {
        email: formData.email,
        otp,
      });
      if (response.data.success) {
        setEmailVerified(true);
        showAlert(t('success'), t('emailVerified'), "success");
        handleNext();
      }
    } catch (error) {
      showAlert(t('verificationFailed'), t('invalidExpiredOTP'), "error");
    }
  };

  // ============ UPDATED handleSubmit with all KYC fields ============
  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const requestData = {
        // Personal
        firstName: formData.firstName,
        lastName: formData.lastName || null,
        phone: formData.phone,
        email: formData.email || null,
        password: formData.password,
        dob: formData.dob,
        gender: formData.gender || null,
        division: formData.division || null,
        district: formData.district || null,
        upazila: formData.upazila || null,
        occupation: formData.occupation,
        income: formData.income,
        referralCode: formData.referralCode || null,
        village: formData.village || null,
        postOffice: formData.postOffice || null,
        postCode: formData.postCode || null,

        // Nominee
        nomineeFirstName: formData.nomineeFirstName,
        nomineeLastName: formData.nomineeLastName || null,
        nomineeRelation: formData.nomineeRelation,
        nomineePhone: formData.nomineePhone,
        nomineeNid: formData.nomineeNid || null,
        nomineeShare: parseInt(formData.nomineeShare) || 100,

        // Plan
        selectedPlan: formData.selectedPlan,
        goalType: formData.goalType || null,
        targetAmount: formData.targetAmount ? parseInt(formData.targetAmount) : null,
        monthlyDeposit: formData.monthlyDeposit ? parseInt(formData.monthlyDeposit) : null,
        duration: formData.duration ? parseInt(formData.duration) : null,

        // PIN
        pin: formData.pin,

        // ============ KYC - ALL FIELDS ============
        nidNumber: formData.nidNumber || null,
        nidFrontImage: formData.nidFrontImage || null,
        nidBackImage: formData.nidBackImage || null,
        birthCertificateImage: formData.birthCertificateImage || null,
        selfieImage: formData.selfieImage || null,
        passportImage: formData.passportImage || null,
        kycConsent: formData.kycConsent || false,
        kycSkipped: formData.kycSkipped || false,
        islamicMode: formData.islamicMode || false,

        // Payment
        paymentMethod: formData.paymentMethod,
        walletNumber: formData.walletNumber || null,
        walletName: formData.walletName || null,
        bankName: formData.bankName || null,
        bankAccNum: formData.bankAccNum || null,
        bankAccName: formData.bankAccName || null,
        bankBranch: formData.bankBranch || null,
        bankRouting: formData.bankRouting || null,

        // Agreements
        terms: formData.terms,
        withdrawalPolicy: formData.withdrawalPolicy,
        marketing: formData.marketing,
      };

      console.log("=== Sending Registration Data ===");
      console.log("KYC Images:", {
        nidFront: requestData.nidFrontImage ? `Present (length: ${requestData.nidFrontImage.length})` : "Missing",
        nidBack: requestData.nidBackImage ? `Present (length: ${requestData.nidBackImage.length})` : "Missing",
        selfie: requestData.selfieImage ? `Present (length: ${requestData.selfieImage.length})` : "Missing",
        birthCert: requestData.birthCertificateImage ? `Present (length: ${requestData.birthCertificateImage.length})` : "Missing",
        passport: requestData.passportImage ? `Present (length: ${requestData.passportImage.length})` : "Missing",
        kycSkipped: requestData.kycSkipped,
        nidNumber: requestData.nidNumber,
      });

      const result = await registerUser(requestData);
      if (result.success) {
        setRegistrationData(result.user);
        Swal.fire({
          title: t('registrationSuccessful'),
          html: `<div style="text-align: left;"><p><strong>${formData.firstName}</strong>, ${t('accountCreatedMessage', )}</p><br><p>${t('whatsNextList')}</p><ul><li>✅ ${t('accountCreatedLabel')}</li><li>⏳ ${t('kycUnderReview')}</li><li>📱 ${t('receiveSMS')}</li></ul><br><p>${t('referralBonus')}</p><p style="background: #f0fdf4; padding: 8px; border-radius: 8px; font-family: monospace;">${result.user.referralCode}</p></div>`,
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: t('goToDashboard'),
          allowOutsideClick: false,
        }).then(() => {
          window.location.href = "/dashboard";
        });
        setIsRegistered(true);
      } else {
        showAlert(t('registrationFailed'), result.message || "Registration failed", "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error.response?.data?.message || t('registrationFailedMessage');
      console.log("Server error response:", error.response?.data);
      showAlert(
        t('registrationFailed'),
        errorMessage,
        "error",
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('welcomeToAmanah')}</h2>
          <p className="text-foreground/60 mb-6">{t('accountCreated')}</p>
          <div className="bg-secondary/20 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-foreground mb-3">{t('whatsNext')}</p>
            <div className="space-y-2 text-sm text-foreground/60">
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">✓</div> {t('accountCreatedLabel')}</div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">⏳</div> {t('kycUnderReview')}</div>
              <div className="flex items-center gap-3"><div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">📱</div> {t('receiveSMS')}</div>
            </div>
          </div>
          {registrationData && (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold mb-2">{t('referFriend')}</p>
              <div className="flex gap-2">
                <div className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-primary font-mono text-sm">{registrationData.referralCode}</div>
                <button onClick={() => { navigator.clipboard.writeText(registrationData.referralCode); showAlert(t('copied'), t('referralCodeCopied'), "success"); }} className="px-4 py-2 bg-primary text-white rounded-lg font-semibold">{t('copy')}</button>
              </div>
            </div>
          )}
          <Link href="/dashboard" className="block w-full py-3 bg-primary text-white rounded-xl font-semibold mb-3 text-center">{t('goToDashboard')}</Link>
          <Link href="/" className="block text-sm text-foreground/50">{t('backToHome')}</Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-foreground">
            <Landmark size={24} className="text-primary" />
            <span>{t('sanchoyBondhu')}</span>
          </Link>
          <div className="flex items-center gap-3">
            <button onClick={toggleLanguage} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:border-primary hover:text-primary transition">
              <Globe size={14} />
              {lang === "bn" ? "EN" : "BN"}
            </button>
            <button onClick={toggleTheme} className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition">
              {isDark ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <Link href="/login" className="px-4 py-1.5 rounded-lg bg-primary text-white text-sm font-semibold hover:opacity-90 transition">{t('login')}</Link>
          </div>
        </div>
      </header>

      <div className="fixed top-[60px] left-0 right-0 h-1 bg-primary/20 z-40">
        <div className="h-full bg-linear-to-r from-primary to-primary-light transition-all duration-300" style={{ width: `${stepProgress[currentStep]}%` }} />
      </div>

      <div className="max-w-2xl mx-auto px-4 py-8 pt-16">
        <div className="flex justify-between mb-8 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
            <div key={step} className="flex flex-col items-center min-w-12">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${currentStep === step ? "bg-primary text-white ring-4 ring-primary/20" : currentStep > step ? "bg-primary text-white" : "bg-card border border-border text-foreground/50"}`}>
                {currentStep > step ? "✓" : step}
              </div>
              <div className="text-[10px] text-foreground/50 mt-1 whitespace-nowrap">{stepLabels[step - 1]}</div>
            </div>
          ))}
        </div>

        {currentStep === 1 && <Step1Account formData={formData} updateField={updateField} errors={errors} setErrors={setErrors} handleNext={handleNext} lang={lang} />}
        {currentStep === 2 && <Step2Email formData={formData} updateField={updateField} emailOtpTimer={emailOtpTimer} emailVerified={emailVerified} handleSendEmailOtp={handleSendEmailOtp} handleVerifyEmailOtp={handleVerifyEmailOtp} handleBack={handleBack} lang={lang} />}
        {currentStep === 3 && <Step3Personal formData={formData} updateField={updateField} errors={errors} setErrors={setErrors} districts={districts} handleNext={handleNext} handleBack={handleBack} lang={lang} />}
        {currentStep === 4 && <Step4Nominee formData={formData} updateField={updateField} errors={errors} handleNext={handleNext} handleBack={handleBack} lang={lang} />}
        {currentStep === 5 && <Step5Plan formData={formData} updateField={updateField} handleNext={handleNext} handleBack={handleBack} lang={lang} />}
        {currentStep === 6 && <Step6Pin formData={formData} updateField={updateField} errors={errors} pinStep={pinStep} setPinStep={setPinStep} handleNext={handleNext} handleBack={handleBack} showAlert={showAlert} lang={lang} />}
        {currentStep === 7 && <Step7Kyc formData={formData} updateField={updateField} errors={errors} handleNext={handleNext} handleBack={handleBack} lang={lang} showAlert={showAlert} />}
        {currentStep === 8 && <Step8Payment formData={formData} updateField={updateField} errors={errors} isLoading={isLoading} handleSubmit={handleSubmit} handleBack={handleBack} lang={lang} />}
      </div>
    </div>
  );
};

export default RegisterPage;
