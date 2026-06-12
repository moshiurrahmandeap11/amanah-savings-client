"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff, Check, Shield } from "lucide-react";
import Swal from "sweetalert2";
import axiosInstance from "../shared/AxiosInstance/AxiosInstance";
import useAuth from "../../hooks/useAuth";


const RegisterPage = () => {
  const { register: registerUser } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneOtp: ["", "", "", "", "", ""],
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
    nidNumber: "",
    kycConsent: false,
    islamicMode: false,
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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [phoneOtpTimer, setPhoneOtpTimer] = useState(0);
  const [emailOtpTimer, setEmailOtpTimer] = useState(0);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [pinStep, setPinStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(null);

  const districts = {
    Dhaka: [
      "Dhaka",
      "Gazipur",
      "Narayanganj",
      "Munshiganj",
      "Manikganj",
      "Narsingdi",
      "Kishoreganj",
      "Tangail",
      "Faridpur",
      "Gopalganj",
    ],
    Chittagong: [
      "Chittagong",
      "Cox's Bazar",
      "Comilla",
      "Feni",
      "Brahmanbaria",
      "Noakhali",
      "Lakshmipur",
      "Chandpur",
    ],
    Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
    Rajshahi: [
      "Rajshahi",
      "Natore",
      "Bogra",
      "Sirajganj",
      "Pabna",
      "Naogaon",
      "Chapainawabganj",
      "Joypurhat",
    ],
    Khulna: [
      "Khulna",
      "Jessore",
      "Satkhira",
      "Bagerhat",
      "Narail",
      "Magura",
      "Jhenaidah",
      "Kushtia",
      "Meherpur",
    ],
    Barisal: [
      "Barisal",
      "Patuakhali",
      "Bhola",
      "Pirojpur",
      "Jhalokati",
      "Barguna",
    ],
    Rangpur: [
      "Rangpur",
      "Dinajpur",
      "Kurigram",
      "Gaibandha",
      "Nilphamari",
      "Lalmonirhat",
      "Thakurgaon",
      "Panchagarh",
    ],
    Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
  };

  const totalSteps = 9;
  const stepProgress = {
    1: 11,
    2: 22,
    3: 33,
    4: 44,
    5: 55,
    6: 66,
    7: 77,
    8: 88,
    9: 100,
  };

  useEffect(() => {
    let interval;
    if (phoneOtpTimer > 0) {
      interval = setInterval(() => setPhoneOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [phoneOtpTimer]);

  useEffect(() => {
    let interval;
    if (emailOtpTimer > 0) {
      interval = setInterval(() => setEmailOtpTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [emailOtpTimer]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const showAlert = (title, message, type = "success") => {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonColor: "#059669",
      confirmButtonText: type === "error" ? "Try Again" : "Continue",
    });
  };

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.phone || formData.phone.length < 10)
      newErrors.phone = "Valid phone number required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    if (!formData.terms) newErrors.terms = "You must agree to the terms";
    if (!formData.withdrawalPolicy)
      newErrors.withdrawalPolicy = "You must agree to the withdrawal policy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => {
    const newErrors = {};
    if (!formData.occupation) newErrors.occupation = "Please select occupation";
    if (!formData.income) newErrors.income = "Please select income range";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep5 = () => {
    const newErrors = {};
    if (!formData.nomineeFirstName)
      newErrors.nomineeFirstName = "Nominee first name required";
    if (!formData.nomineeRelation)
      newErrors.nomineeRelation = "Please select relationship";
    if (!formData.nomineePhone || formData.nomineePhone.length < 10)
      newErrors.nomineePhone = "Valid nominee phone required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep8 = () => {
    const newErrors = {};
    if (!formData.kycConsent)
      newErrors.kycConsent = "You must consent to KYC verification";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep9 = () => {
    const newErrors = {};
    if (!formData.paymentMethod) {
      newErrors.paymentMethod = "Please select a payment method";
    } else if (
      formData.paymentMethod === "bkash" ||
      formData.paymentMethod === "nagad" ||
      formData.paymentMethod === "rocket"
    ) {
      if (!formData.walletNumber || formData.walletNumber.length < 11) {
        newErrors.walletNumber = "Valid wallet number required (11 digits)";
      }
      if (!formData.walletName) {
        newErrors.walletName = "Account holder name required";
      }
    } else if (formData.paymentMethod === "bank") {
      if (!formData.bankName) {
        newErrors.bankName = "Bank name required";
      }
      if (!formData.bankAccNum) {
        newErrors.bankAccNum = "Account number required";
      }
      if (!formData.bankAccName) {
        newErrors.bankAccName = "Account holder name required";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    let isValid = true;
    if (currentStep === 1) isValid = validateStep1();
    else if (currentStep === 4) isValid = validateStep4();
    else if (currentStep === 5) isValid = validateStep5();
    else if (currentStep === 8) isValid = validateStep8();
    else if (currentStep === 9) isValid = validateStep9();

    if (isValid && currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (!isValid) {
      showAlert(
        "Validation Error",
        "Please fill all required fields correctly",
        "error",
      );
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSendPhoneOtp = async () => {
    if (!formData.phone || formData.phone.length < 10) {
      showAlert("Invalid Phone", "Please enter a valid phone number", "error");
      return;
    }
    try {
      const response = await axiosInstance.post("/users/send-phone-otp", {
        phone: formData.phone,
      });
      if (response.data.success) {
        setPhoneOtpTimer(60);
        const receivedOtp = response.data.otp;
        if (receivedOtp) {
          showAlert("OTP Sent!", `Your OTP is: ${receivedOtp}`, "info");
        } else {
          showAlert(
            "OTP Sent!",
            "Please check your phone for the verification code",
            "success",
          );
        }
      }
    } catch (error) {
      showAlert("Failed", "Could not send OTP. Please try again.", "error");
    }
  };

  const handleVerifyPhoneOtp = async () => {
    const otp = formData.phoneOtp.join("");
    if (otp.length !== 6) {
      showAlert("Invalid OTP", "Please enter all 6 digits", "error");
      return;
    }
    try {
      const response = await axiosInstance.post("/users/verify-phone-otp", {
        phone: formData.phone,
        otp: otp,
      });
      if (response.data.success) {
        setPhoneVerified(true);
        showAlert("Success!", "Phone number verified successfully", "success");
        handleNext();
      }
    } catch (error) {
      showAlert(
        "Verification Failed",
        "Invalid or expired OTP. Please try again.",
        "error",
      );
    }
  };

  const handleSendEmailOtp = async () => {
    if (!formData.email) {
      showAlert("Invalid Email", "Please enter your email address", "error");
      return;
    }
    try {
      const response = await axiosInstance.post("/users/send-email-otp", {
        email: formData.email,
      });
      if (response.data.success) {
        setEmailOtpTimer(60);
        const receivedOtp = response.data.otp;
        if (receivedOtp) {
          showAlert("OTP Sent!", `Your Email OTP is: ${receivedOtp}`, "info");
        } else {
          showAlert(
            "OTP Sent!",
            "Please check your email for the verification code",
            "success",
          );
        }
      }
    } catch (error) {
      showAlert(
        "Failed",
        "Could not send OTP to email. Please try again.",
        "error",
      );
    }
  };

  const handleVerifyEmailOtp = async () => {
    const otp = formData.emailOtp.join("");
    if (otp.length !== 6) {
      showAlert("Invalid OTP", "Please enter all 6 digits", "error");
      return;
    }
    try {
      const response = await axiosInstance.post("/users/verify-email-otp", {
        email: formData.email,
        otp: otp,
      });
      if (response.data.success) {
        setEmailVerified(true);
        showAlert("Success!", "Email verified successfully", "success");
        handleNext();
      }
    } catch (error) {
      showAlert(
        "Verification Failed",
        "Invalid or expired OTP. Please try again.",
        "error",
      );
    }
  };

  const handlePinInput = (digit) => {
    if (pinStep === 1 && formData.pin.length < 6) {
      updateField("pin", formData.pin + digit);
    } else if (pinStep === 2 && formData.confirmPin.length < 6) {
      updateField("confirmPin", formData.confirmPin + digit);
    }
  };

  const handlePinDelete = () => {
    if (pinStep === 1) {
      updateField("pin", formData.pin.slice(0, -1));
    } else {
      updateField("confirmPin", formData.confirmPin.slice(0, -1));
    }
  };

  const handlePinConfirm = () => {
    if (formData.pin === formData.confirmPin && formData.pin.length === 6) {
      handleNext();
    } else {
      setErrors({ pin: "PINs do not match" });
      showAlert(
        "PIN Mismatch",
        "Your PINs do not match. Please try again.",
        "error",
      );
      setPinStep(1);
      updateField("pin", "");
      updateField("confirmPin", "");
    }
  };

  const handleSubmit = async () => {
    if (!validateStep9()) {
      showAlert("Validation Error", "Please fill all required fields", "error");
      return;
    }

    if (!phoneVerified) {
      showAlert(
        "Phone Not Verified",
        "Please verify your phone number first",
        "warning",
      );
      setCurrentStep(2);
      return;
    }

    if (formData.email && !emailVerified) {
      showAlert(
        "Email Not Verified",
        "Please verify your email address first",
        "warning",
      );
      setCurrentStep(3);
      return;
    }

    setIsLoading(true);
    try {
      const requestData = {
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
        nomineeFirstName: formData.nomineeFirstName,
        nomineeLastName: formData.nomineeLastName || null,
        nomineeRelation: formData.nomineeRelation,
        nomineePhone: formData.nomineePhone,
        nomineeNid: formData.nomineeNid || null,
        nomineeShare: parseInt(formData.nomineeShare) || 100,
        selectedPlan: formData.selectedPlan,
        goalType: formData.goalType || null,
        targetAmount: formData.targetAmount
          ? parseInt(formData.targetAmount)
          : null,
        monthlyDeposit: formData.monthlyDeposit
          ? parseInt(formData.monthlyDeposit)
          : null,
        duration: formData.duration ? parseInt(formData.duration) : null,
        pin: formData.pin,
        nidNumber: formData.nidNumber,
        islamicMode: formData.islamicMode,
        paymentMethod: formData.paymentMethod,
        walletNumber: formData.walletNumber || null,
        walletName: formData.walletName || null,
        bankName: formData.bankName || null,
        bankAccNum: formData.bankAccNum || null,
        bankAccName: formData.bankAccName || null,
        bankBranch: formData.bankBranch || null,
        bankRouting: formData.bankRouting || null,
        terms: formData.terms,
        withdrawalPolicy: formData.withdrawalPolicy,
        marketing: formData.marketing,
        kycConsent: formData.kycConsent,
      };

      const result = await registerUser(requestData);

      if (result.success) {
        setRegistrationData(result.user);
        Swal.fire({
          title: "Registration Successful! 🎉",
          html: `
            <div style="text-align: left;">
              <p><strong>${formData.firstName}</strong>, your account has been successfully created!</p>
              <br>
              <p>📋 <strong>What's next?</strong></p>
              <ul style="margin-left: 20px;">
                <li>✅ Account created</li>
                <li>⏳ KYC under review (up to 4 hours)</li>
                <li>📱 You'll receive SMS upon approval</li>
              </ul>
              <br>
              <p>🎁 <strong>Referral Bonus:</strong> Share your code and earn ৳500!</p>
              <p style="background: #f0fdf4; padding: 8px; border-radius: 8px; font-family: monospace;">${result.user.referralCode}</p>
            </div>
          `,
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "Go to Dashboard",
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/dashboard";
          }
        });
        setIsRegistered(true);
      } else {
        showAlert("Registration Failed", result.message, "error");
      }
    } catch (error) {
      console.error("Registration error:", error);
      let errorMessage = "Registration failed. Please try again.";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      }
      showAlert("Registration Failed", errorMessage, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const getStrengthColor = () => {
    const pwd = formData.password;
    if (!pwd) return "";
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[^A-Za-z0-9]/.test(pwd)) strength++;
    if (strength <= 1) return "bg-red-500";
    if (strength === 2) return "bg-yellow-500";
    if (strength === 3) return "bg-green-500";
    return "bg-primary";
  };

  if (isRegistered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-2xl p-8 max-w-md w-full text-center"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Welcome to Amanah!
          </h2>
          <p className="text-foreground/60 mb-6">
            Your account has been successfully created! Our KYC team will verify
            your documents within 4 hours.
          </p>
          <div className="bg-secondary/20 rounded-xl p-4 mb-6 text-left">
            <p className="text-sm font-semibold text-foreground mb-3">
              What&apos;s next?
            </p>
            <div className="space-y-2 text-sm text-foreground/60">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  ✓
                </div>{" "}
                Account created
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-yellow-500/20 flex items-center justify-center text-yellow-500">
                  ⏳
                </div>{" "}
                KYC under review (up to 4 hours)
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  📱
                </div>{" "}
                You&apos;ll receive SMS upon approval
              </div>
            </div>
          </div>
          {registrationData && (
            <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mb-6">
              <p className="text-sm font-semibold mb-2">
                Refer a friend — Get ৳500 bonus!
              </p>
              <div className="flex gap-2">
                <div className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-primary font-mono text-sm">
                  {registrationData.referralCode}
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(
                      registrationData.referralCode,
                    );
                    showAlert(
                      "Copied!",
                      "Referral code copied to clipboard",
                      "success",
                    );
                  }}
                  className="px-4 py-2 bg-primary text-white rounded-lg font-semibold"
                >
                  Copy
                </button>
              </div>
            </div>
          )}
          <Link
            href="/dashboard"
            className="block w-full py-3 bg-primary text-white rounded-xl font-semibold mb-3 text-center"
          >
            Go to Dashboard
          </Link>
          <Link href="/" className="block text-sm text-foreground/50">
            Back to Home
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50">
        <div
          className="h-full bg-linear-to-r from-primary to-primary-light transition-all duration-300"
          style={{ width: `${stepProgress[currentStep]}%` }}
        />
      </div>
      <div className="max-w-2xl mx-auto px-4 py-8">
        <div className="flex justify-between mb-8 overflow-x-auto pb-2">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((step) => (
            <div key={step} className="flex flex-col items-center min-w-12.5">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${currentStep === step ? "bg-primary text-white ring-4 ring-primary/20" : currentStep > step ? "bg-primary text-white" : "bg-card border border-border text-foreground/50"}`}
              >
                {currentStep > step ? "✓" : step}
              </div>
              <div className="text-[10px] text-foreground/50 mt-1 whitespace-nowrap">
                {step === 1 && "Account"}
                {step === 2 && "Phone"}
                {step === 3 && "Email"}
                {step === 4 && "Personal"}
                {step === 5 && "Nominee"}
                {step === 6 && "Plan"}
                {step === 7 && "PIN"}
                {step === 8 && "KYC"}
                {step === 9 && "Payment"}
              </div>
            </div>
          ))}
        </div>

        {/* Step 1 */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              Step 1 / 9
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Create Account
            </h2>
            <p className="text-foreground/60 mb-6">
              Join Bangladesh&apos;s most trusted savings community
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => updateField("firstName", e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  placeholder="Fatema"
                />
                {errors.firstName && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => updateField("lastName", e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  placeholder="Akter"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Mobile Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-background text-foreground/60">
                  +880
                </span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    updateField(
                      "phone",
                      e.target.value.replace(/\D/g, "").slice(0, 11),
                    )
                  }
                  className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  placeholder="1XXXXXXXXX"
                />
              </div>
              {errors.phone && (
                <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Email (Optional)
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                placeholder="you@example.com"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Password *
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => updateField("password", e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10"
                  placeholder="At least 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <div className="flex gap-1 mt-2">
                <div
                  className={`flex-1 h-1 rounded-full transition-all ${getStrengthColor() === "bg-red-500" ? "bg-red-500" : "bg-border"}`}
                />
                <div
                  className={`flex-1 h-1 rounded-full transition-all ${getStrengthColor() === "bg-yellow-500" ? "bg-yellow-500" : "bg-border"}`}
                />
                <div
                  className={`flex-1 h-1 rounded-full transition-all ${getStrengthColor() === "bg-green-500" ? "bg-green-500" : "bg-border"}`}
                />
                <div
                  className={`flex-1 h-1 rounded-full transition-all ${getStrengthColor() === "bg-primary" ? "bg-primary" : "bg-border"}`}
                />
              </div>
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Confirm Password *
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    updateField("confirmPassword", e.target.value)
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10"
                  placeholder="Type again"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div
              className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl mb-4 cursor-pointer"
              onClick={() => updateField("islamicMode", !formData.islamicMode)}
            >
              <div className="flex items-center gap-3">
                <div>
                  <h4 className="font-semibold">Islamic Savings Mode</h4>
                  <p className="text-xs text-foreground/60">
                    Enable interest-free (halal) savings
                  </p>
                </div>
              </div>
              <div
                className={`w-12 h-6 rounded-full transition-all ${formData.islamicMode ? "bg-primary" : "bg-border"} relative`}
              >
                <div
                  className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.islamicMode ? "right-1" : "left-1"}`}
                />
              </div>
            </div>

            <label className="flex items-start gap-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.terms}
                onChange={(e) => updateField("terms", e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-foreground/70">
                I have read and agree to the{" "}
                <Link href="/terms" className="text-primary">
                  Terms
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary">
                  Privacy Policy
                </Link>
                . Amanah is a savings community, not a bank.
              </span>
            </label>
            {errors.terms && (
              <p className="text-xs text-red-500 mt-1">{errors.terms}</p>
            )}

            <label className="flex items-start gap-3 mb-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.withdrawalPolicy}
                onChange={(e) =>
                  updateField("withdrawalPolicy", e.target.checked)
                }
                className="mt-1"
              />
              <span className="text-sm text-foreground/70">
                I understand that early withdrawal before reaching a savings
                goal requires admin approval.
              </span>
            </label>
            {errors.withdrawalPolicy && (
              <p className="text-xs text-red-500 mt-1">
                {errors.withdrawalPolicy}
              </p>
            )}

            <label className="flex items-start gap-3 mb-6 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.marketing}
                onChange={(e) => updateField("marketing", e.target.checked)}
                className="mt-1"
              />
              <span className="text-sm text-foreground/70">
                I agree to receive promotional messages via SMS and email.
                (Optional)
              </span>
            </label>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition"
            >
              Next — Verify Phone →
            </button>
          </motion.div>
        )}

        {/* Step 2 */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6 text-center"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              Step 2 / 9
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Verify Phone
            </h2>
            <p className="text-foreground/60 mb-2">
              A 6-digit OTP has been sent to{" "}
              <strong>+880 {formData.phone}</strong>
            </p>
            {phoneOtpTimer === 0 && !phoneVerified && (
              <button
                onClick={handleSendPhoneOtp}
                className="w-full py-2 bg-primary/10 text-primary rounded-xl font-semibold mb-3 text-sm"
              >
                Send OTP to +880{formData.phone}
              </button>
            )}
            <div className="flex justify-center gap-2 mb-4">
              {formData.phoneOtp.map((digit, idx) => (
                <input
                  key={idx}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const newOtp = [...formData.phoneOtp];
                    newOtp[idx] = e.target.value.replace(/\D/g, "");
                    updateField("phoneOtp", newOtp);
                    if (e.target.value && idx < 5)
                      document.getElementById(`phoneOtp-${idx + 1}`)?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !digit && idx > 0)
                      document.getElementById(`phoneOtp-${idx - 1}`)?.focus();
                  }}
                  id={`phoneOtp-${idx}`}
                  className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  disabled={phoneVerified}
                />
              ))}
            </div>
            <p className="text-sm text-foreground/50 mb-4">
              Didn&apos;t receive OTP?{" "}
              <button
                className="text-primary font-semibold"
                disabled={phoneOtpTimer > 0 || phoneVerified}
                onClick={handleSendPhoneOtp}
              >
                Resend {phoneOtpTimer > 0 && `(${phoneOtpTimer}s)`}
              </button>
            </p>
            <button
              onClick={handleVerifyPhoneOtp}
              disabled={phoneVerified}
              className={`w-full py-3 rounded-xl font-semibold mb-3 ${phoneVerified ? "bg-green-500 text-white" : "bg-linear-to-r from-primary to-primary-light text-white"}`}
            >
              {phoneVerified ? "✓ Phone Verified" : "Verify Phone"}
            </button>
            <button
              onClick={handleBack}
              className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition"
            >
              ← Previous
            </button>
          </motion.div>
        )}

        {/* Step 3 */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6 text-center"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              Step 3 / 9
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Verify Email
            </h2>
            <p className="text-foreground/60 mb-2">
              A 6-digit code has been sent to{" "}
              <strong>{formData.email || "your email"}</strong>
            </p>
            {emailOtpTimer === 0 && !emailVerified && formData.email && (
              <button
                onClick={handleSendEmailOtp}
                className="w-full py-2 bg-primary/10 text-primary rounded-xl font-semibold mb-3 text-sm"
              >
                Send OTP to {formData.email}
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
                    if (e.target.value && idx < 5)
                      document.getElementById(`emailOtp-${idx + 1}`)?.focus();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !digit && idx > 0)
                      document.getElementById(`emailOtp-${idx - 1}`)?.focus();
                  }}
                  id={`emailOtp-${idx}`}
                  className="w-12 h-12 text-center text-xl font-bold rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  disabled={emailVerified}
                />
              ))}
            </div>
            <p className="text-sm text-foreground/50 mb-4">
              Didn&apos;t receive code?{" "}
              <button
                className="text-primary font-semibold"
                disabled={emailOtpTimer > 0 || emailVerified || !formData.email}
                onClick={handleSendEmailOtp}
              >
                Resend {emailOtpTimer > 0 && `(${emailOtpTimer}s)`}
              </button>
            </p>
            <button
              onClick={handleVerifyEmailOtp}
              disabled={emailVerified || !formData.email}
              className={`w-full py-3 rounded-xl font-semibold mb-3 ${emailVerified ? "bg-green-500 text-white" : "bg-linear-to-r from-primary to-primary-light text-white"}`}
            >
              {emailVerified ? "✓ Email Verified" : "Verify Email"}
            </button>
            <button
              onClick={handleBack}
              className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition"
            >
              ← Previous
            </button>
          </motion.div>
        )}

        {/* Step 4 */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              Step 4 / 9
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Tell us about you
            </h2>
            <p className="text-foreground/60 mb-6">
              We need this to personalize your savings experience
            </p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Date of Birth *
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) => updateField("dob", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => updateField("gender", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Division
                </label>
                <select
                  value={formData.division}
                  onChange={(e) => {
                    updateField("division", e.target.value);
                    updateField("district", "");
                  }}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                >
                  <option value="">Select Division</option>
                  {Object.keys(districts).map((d) => (
                    <option key={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  District
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => updateField("district", e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                >
                  <option value="">Select District</option>
                  {formData.division &&
                    districts[formData.division]?.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                </select>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Upazila / Area
              </label>
              <input
                type="text"
                value={formData.upazila}
                onChange={(e) => updateField("upazila", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                placeholder="e.g. Gulshan, Mirpur"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Occupation *
              </label>
              <select
                value={formData.occupation}
                onChange={(e) => updateField("occupation", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
              >
                <option value="">Select Occupation</option>
                <option>Student</option>
                <option>Govt. Employee</option>
                <option>Private Employee</option>
                <option>Business Owner</option>
                <option>Freelancer</option>
                <option>Homemaker</option>
                <option>Farmer</option>
                <option>Engineer</option>
                <option>Doctor</option>
                <option>Teacher</option>
                <option>Other</option>
              </select>
              {errors.occupation && (
                <p className="text-xs text-red-500 mt-1">{errors.occupation}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Monthly Income Range *
              </label>
              <select
                value={formData.income}
                onChange={(e) => updateField("income", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
              >
                <option value="">Select Income Range</option>
                <option>Below ৳10,000</option>
                <option>৳10,000 – ৳25,000</option>
                <option>৳25,000 – ৳50,000</option>
                <option>৳50,000 – ৳1,00,000</option>
                <option>Above ৳1,00,000</option>
                <option>Prefer not to say</option>
              </select>
              {errors.income && (
                <p className="text-xs text-red-500 mt-1">{errors.income}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Referral Code (Optional)
              </label>
              <input
                type="text"
                value={formData.referralCode}
                onChange={(e) => updateField("referralCode", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary uppercase"
                placeholder="e.g. FATEMA2024"
              />
            </div>

            <div className="border-t border-border pt-4 mt-2">
              <h3 className="text-sm font-bold text-foreground/70 mb-3">
                Current Address
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Village / Area / Street
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => updateField("village", e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Post Office
                  </label>
                  <input
                    type="text"
                    value={formData.postOffice}
                    onChange={(e) => updateField("postOffice", e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Post Code
                  </label>
                  <input
                    type="text"
                    value={formData.postCode}
                    onChange={(e) => updateField("postCode", e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
            >
              Next — Nominee Person →
            </button>
            <button
              onClick={handleBack}
              className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition"
            >
              ← Previous
            </button>
          </motion.div>
        )}

        {/* Step 5 */}
        {currentStep === 5 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              Step 5 / 9
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Nominee Person
            </h2>
            <p className="text-foreground/60 mb-6">
              The person who will receive your savings in your absence.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.nomineeFirstName}
                  onChange={(e) =>
                    updateField("nomineeFirstName", e.target.value)
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  value={formData.nomineeLastName}
                  onChange={(e) =>
                    updateField("nomineeLastName", e.target.value)
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Relationship *
              </label>
              <select
                value={formData.nomineeRelation}
                onChange={(e) => updateField("nomineeRelation", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
              >
                <option value="">Select Relationship</option>
                <option>Spouse</option>
                <option>Father</option>
                <option>Mother</option>
                <option>Son</option>
                <option>Daughter</option>
                <option>Brother</option>
                <option>Sister</option>
                <option>Other</option>
              </select>
              {errors.nomineeRelation && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.nomineeRelation}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Mobile Number *
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-background">
                  +880
                </span>
                <input
                  type="tel"
                  value={formData.nomineePhone}
                  onChange={(e) =>
                    updateField(
                      "nomineePhone",
                      e.target.value.replace(/\D/g, "").slice(0, 11),
                    )
                  }
                  className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                />
              </div>
              {errors.nomineePhone && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.nomineePhone}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                NID Number (Optional)
              </label>
              <input
                type="text"
                value={formData.nomineeNid}
                onChange={(e) => updateField("nomineeNid", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                Share of Savings (%)
              </label>
              <select
                value={formData.nomineeShare}
                onChange={(e) => updateField("nomineeShare", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
              >
                <option value="100">100% — Full savings</option>
                <option value="75">75%</option>
                <option value="50">50%</option>
                <option value="25">25%</option>
              </select>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
            >
              Next — Choose Plan →
            </button>
            <button
              onClick={handleBack}
              className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition"
            >
              ← Previous
            </button>
          </motion.div>
        )}

        {/* Step 6 */}
        {currentStep === 6 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              Step 6 / 9
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Choose Savings Plan
            </h2>
            <p className="text-foreground/60 mb-6">
              Select a plan based on your monthly savings capacity. Upgrade
              anytime.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {["bronze", "silver", "gold", "platinum"].map((plan) => (
                <div
                  key={plan}
                  onClick={() => updateField("selectedPlan", plan)}
                  className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${formData.selectedPlan === plan ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <div className="font-bold capitalize">{plan}</div>
                  <div className="text-xs text-foreground/50">
                    {plan === "bronze"
                      ? "৳500–৳2,000/mo"
                      : plan === "silver"
                        ? "৳2,000–৳10,000/mo"
                        : plan === "gold"
                          ? "৳10,000–৳50,000/mo"
                          : "৳50,000+/mo"}
                  </div>
                  {formData.selectedPlan === plan && (
                    <div className="text-primary text-xs mt-1">✓ Selected</div>
                  )}
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4">
              <h3 className="text-sm font-bold text-foreground/70 mb-3">
                Set Your First Savings Goal
              </h3>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Goal Type
                </label>
                <select
                  value={formData.goalType}
                  onChange={(e) => updateField("goalType", e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                >
                  <option value="">Choose your first goal</option>
                  <option>Home Fund</option>
                  <option>Wedding Fund</option>
                  <option>Hajj Fund</option>
                  <option>Education Fund</option>
                  <option>Emergency Fund</option>
                  <option>Gadget Fund</option>
                  <option>Car Fund</option>
                  <option>Business Fund</option>
                  <option>Children&apos;s Future</option>
                  <option>Travel Fund</option>
                  <option>Custom Goal</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Target Amount (BDT)
                </label>
                <input
                  type="number"
                  value={formData.targetAmount}
                  onChange={(e) => updateField("targetAmount", e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  placeholder="e.g. 200000"
                />
              </div>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Monthly Deposit
                  </label>
                  <input
                    type="number"
                    value={formData.monthlyDeposit}
                    onChange={(e) =>
                      updateField("monthlyDeposit", e.target.value)
                    }
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                    placeholder="e.g. 5000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Duration (months)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => updateField("duration", e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                    placeholder="e.g. 24"
                  />
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
            >
              Next — Set PIN →
            </button>
            <button
              onClick={handleBack}
              className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition"
            >
              ← Previous
            </button>
          </motion.div>
        )}

        {/* Step 7 */}
        {currentStep === 7 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6 text-center"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              Step 7 / 9
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Set Transaction PIN
            </h2>
            <p className="text-foreground/60 mb-4">
              This 6-digit PIN is required for every deposit & withdrawal. Do
              not share it.
            </p>
            <div className="flex justify-center gap-3 mb-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-4 h-4 rounded-full transition-all ${(pinStep === 1 ? formData.pin.length : formData.confirmPin.length) > i ? "bg-primary" : "bg-border"}`}
                />
              ))}
            </div>
            <p className="text-sm text-foreground/60 mb-4">
              {pinStep === 1 ? "Enter new PIN" : "Confirm PIN"}
            </p>
            <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
              {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
                <button
                  key={num}
                  onClick={() => handlePinInput(num)}
                  className="p-4 rounded-xl border border-border text-xl font-bold hover:border-primary hover:bg-primary/5 transition"
                >
                  {num}
                </button>
              ))}
              <div></div>
              <button
                onClick={() => handlePinInput("0")}
                className="p-4 rounded-xl border border-border text-xl font-bold hover:border-primary hover:bg-primary/5 transition"
              >
                0
              </button>
              <button
                onClick={handlePinDelete}
                className="p-4 rounded-xl border border-red-500/30 text-red-500 text-xl font-bold hover:bg-red-500/10 transition"
              >
                ⌫
              </button>
            </div>
            {errors.pin && (
              <p className="text-sm text-red-500 mb-4">{errors.pin}</p>
            )}
            {pinStep === 2 && (
              <button
                onClick={handlePinConfirm}
                className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
              >
                Confirm PIN →
              </button>
            )}
            {pinStep === 1 && (
              <button
                onClick={() => {
                  if (formData.pin.length === 6) {
                    setPinStep(2);
                  } else {
                    setErrors({ pin: "Please enter 6-digit PIN" });
                    showAlert(
                      "Invalid PIN",
                      "Please enter 6-digit PIN",
                      "error",
                    );
                    setTimeout(() => setErrors({}), 2000);
                  }
                }}
                className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
              >
                Continue →
              </button>
            )}
            <button
              onClick={handleBack}
              className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition"
            >
              ← Previous
            </button>
          </motion.div>
        )}

        {/* Step 8 */}
        {currentStep === 8 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              Step 8 / 9
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Verify Identity
            </h2>
            <p className="text-foreground/60 mb-6">
              KYC is mandatory to activate your account. Our team will verify
              within 4 hours.
            </p>

            <div className="mb-4">
              <label className="block text-sm font-semibold text-foreground/70 mb-1">
                NID Number *
              </label>
              <input
                type="text"
                value={formData.nidNumber}
                onChange={(e) => updateField("nidNumber", e.target.value)}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                placeholder="Enter 10 or 17 digit NID"
              />
            </div>

            <div className="mb-4">
              <div
                className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl cursor-pointer"
                onClick={() => updateField("kycConsent", !formData.kycConsent)}
              >
                <div className="flex items-center gap-3">
                  <Shield size={24} className="text-primary" />
                  <div>
                    <h4 className="font-semibold">KYC Consent</h4>
                    <p className="text-xs text-foreground/60">
                      I confirm that the documents provided are my own and the
                      information is accurate.
                    </p>
                  </div>
                </div>
                <div
                  className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${formData.kycConsent ? "bg-primary border-primary" : "border-border"}`}
                >
                  {formData.kycConsent && (
                    <Check size={14} className="text-white" />
                  )}
                </div>
              </div>
              {errors.kycConsent && (
                <p className="text-xs text-red-500 mt-1">{errors.kycConsent}</p>
              )}
            </div>

            <div className="info-box p-3 bg-primary/5 border border-primary/20 rounded-xl text-xs text-foreground/60 flex gap-2 mb-6">
              <Shield size={16} className="text-primary shrink-0" />
              <span>
                Your documents are completely secure. All KYC files are
                encrypted. Never shared with third parties.
              </span>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
            >
              Next — Payment Info →
            </button>
            <button
              onClick={handleBack}
              className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition"
            >
              ← Previous
            </button>
          </motion.div>
        )}

        {/* Step 9 */}
        {currentStep === 9 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-card border border-border rounded-2xl p-6"
          >
            <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
              Step 9 / 9
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Payment Details
            </h2>
            <p className="text-foreground/60 mb-6">
              Your savings withdrawals will be sent to this account
            </p>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {["bkash", "nagad", "rocket", "bank"].map((method) => (
                <div
                  key={method}
                  onClick={() => updateField("paymentMethod", method)}
                  className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${formData.paymentMethod === method ? "border-primary bg-primary/5" : "border-border"}`}
                >
                  <div className="font-semibold capitalize">
                    {method === "bkash"
                      ? "bKash"
                      : method === "nagad"
                        ? "Nagad"
                        : method === "rocket"
                          ? "Rocket"
                          : "Bank"}
                  </div>
                </div>
              ))}
            </div>
            {errors.paymentMethod && (
              <p className="text-xs text-red-500 mb-4">
                {errors.paymentMethod}
              </p>
            )}

            {formData.paymentMethod && formData.paymentMethod !== "bank" ? (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Mobile Wallet Number *
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border">
                      +880
                    </span>
                    <input
                      type="tel"
                      value={formData.walletNumber}
                      onChange={(e) =>
                        updateField(
                          "walletNumber",
                          e.target.value.replace(/\D/g, "").slice(0, 11),
                        )
                      }
                      className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                    />
                  </div>
                  {errors.walletNumber && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.walletNumber}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    value={formData.walletName}
                    onChange={(e) => updateField("walletName", e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  />
                  {errors.walletName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.walletName}
                    </p>
                  )}
                </div>
              </div>
            ) : formData.paymentMethod === "bank" ? (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Bank Name *
                  </label>
                  <select
                    value={formData.bankName}
                    onChange={(e) => updateField("bankName", e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  >
                    <option value="">Select Bank</option>
                    <option>Dutch-Bangla Bank (DBBL)</option>
                    <option>BRAC Bank</option>
                    <option>Islami Bank Bangladesh</option>
                    <option>Sonali Bank</option>
                    <option>Janata Bank</option>
                    <option>Agrani Bank</option>
                    <option>Rupali Bank</option>
                    <option>Pubali Bank</option>
                    <option>Uttara Bank</option>
                    <option>Mutual Trust Bank</option>
                    <option>Dhaka Bank</option>
                    <option>Eastern Bank</option>
                    <option>City Bank</option>
                    <option>Prime Bank</option>
                    <option>Trust Bank</option>
                    <option>Other</option>
                  </select>
                  {errors.bankName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.bankName}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Account Number *
                  </label>
                  <input
                    type="text"
                    value={formData.bankAccNum}
                    onChange={(e) => updateField("bankAccNum", e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  />
                  {errors.bankAccNum && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.bankAccNum}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Account Holder Name *
                  </label>
                  <input
                    type="text"
                    value={formData.bankAccName}
                    onChange={(e) => updateField("bankAccName", e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  />
                  {errors.bankAccName && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.bankAccName}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    value={formData.bankBranch}
                    onChange={(e) => updateField("bankBranch", e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Routing Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.bankRouting}
                    onChange={(e) => updateField("bankRouting", e.target.value)}
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  />
                </div>
              </div>
            ) : null}

            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {isLoading ? (
                <span className="inline-flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : (
                "🚀 Create Account"
              )}
            </button>
            <button
              onClick={handleBack}
              className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition mt-3"
            >
              ← Previous
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
