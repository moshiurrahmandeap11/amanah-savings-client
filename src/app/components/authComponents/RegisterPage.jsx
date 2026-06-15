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

// Import step components

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
  const [emailOtpTimer, setEmailOtpTimer] = useState(0);
  const [emailVerified, setEmailVerified] = useState(false);
  const [pinStep, setPinStep] = useState(1);
  const [registrationData, setRegistrationData] = useState(null);
  const [touchedFields, setTouchedFields] = useState({});

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

  const totalSteps = 8;
  const stepProgress = {
    1: 12.5,
    2: 25,
    3: 37.5,
    4: 50,
    5: 62.5,
    6: 75,
    7: 87.5,
    8: 100,
  };

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

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
        if (receivedOtp)
          showAlert("OTP Sent!");
        else
          showAlert(
            "OTP Sent!",
            "Please check your email for the verification code",
            "success",
          );
      }
    } catch (error) {
      showAlert("Failed", "Could not send OTP. Please try again.", "error");
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
        otp,
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

  const handleSubmit = async () => {
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
          html: `<div style="text-align: left;"><p><strong>${formData.firstName}</strong>, your account has been successfully created!</p><br><p>📋 <strong>What's next?</strong></p><ul><li>✅ Account created</li><li>⏳ KYC under review (up to 4 hours)</li><li>📱 You'll receive SMS upon approval</li></ul><br><p>🎁 <strong>Referral Bonus:</strong> Share your code and earn ৳500!</p><p style="background: #f0fdf4; padding: 8px; border-radius: 8px; font-family: monospace;">${result.user.referralCode}</p></div>`,
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "Go to Dashboard",
          allowOutsideClick: false,
        }).then(() => {
          window.location.href = "/dashboard";
        });
        setIsRegistered(true);
      } else showAlert("Registration Failed", result.message, "error");
    } catch (error) {
      console.error("Registration error:", error);
      showAlert(
        "Registration Failed",
        error.response?.data?.message ||
          "Registration failed. Please try again.",
        "error",
      );
    } finally {
      setIsLoading(false);
    }
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
          {[1, 2, 3, 4, 5, 6, 7, 8].map((step) => (
            <div key={step} className="flex flex-col items-center min-w-12">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${currentStep === step ? "bg-primary text-white ring-4 ring-primary/20" : currentStep > step ? "bg-primary text-white" : "bg-card border border-border text-foreground/50"}`}
              >
                {currentStep > step ? "✓" : step}
              </div>
              <div className="text-[10px] text-foreground/50 mt-1 whitespace-nowrap">
                {step === 1 && "Account"}
                {step === 2 && "Email"}
                {step === 3 && "Personal"}
                {step === 4 && "Nominee"}
                {step === 5 && "Plan"}
                {step === 6 && "PIN"}
                {step === 7 && "KYC"}
                {step === 8 && "Payment"}
              </div>
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <Step1Account
            formData={formData}
            updateField={updateField}
            errors={errors}
            setErrors={setErrors}
            handleNext={handleNext}
          />
        )}
        {currentStep === 2 && (
          <Step2Email
            formData={formData}
            updateField={updateField}
            emailOtpTimer={emailOtpTimer}
            emailVerified={emailVerified}
            handleSendEmailOtp={handleSendEmailOtp}
            handleVerifyEmailOtp={handleVerifyEmailOtp}
            handleBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <Step3Personal
            formData={formData}
            updateField={updateField}
            errors={errors}
            setErrors={setErrors}
            districts={districts}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <Step4Nominee
            formData={formData}
            updateField={updateField}
            errors={errors}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {currentStep === 5 && (
          <Step5Plan
            formData={formData}
            updateField={updateField}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {currentStep === 6 && (
          <Step6Pin
            formData={formData}
            updateField={updateField}
            errors={errors}
            pinStep={pinStep}
            setPinStep={setPinStep}
            handleNext={handleNext}
            handleBack={handleBack}
            showAlert={showAlert}
          />
        )}
        {currentStep === 7 && (
          <Step7Kyc
            formData={formData}
            updateField={updateField}
            errors={errors}
            handleNext={handleNext}
            handleBack={handleBack}
          />
        )}
        {currentStep === 8 && (
          <Step8Payment
            formData={formData}
            updateField={updateField}
            errors={errors}
            isLoading={isLoading}
            handleSubmit={handleSubmit}
            handleBack={handleBack}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterPage;
