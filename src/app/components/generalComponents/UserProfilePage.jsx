"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Users,
  Target,
  CreditCard,
  Shield,
  Edit2,
  Save,
  X,
  Camera,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Lock,
  Upload,
  Trash2,
  Loader2,
  FileText,
  FileSpreadsheet,
  Receipt,
  BadgeCheck,
  CalendarDays,
  Award,
  ChevronRight,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../shared/AxiosInstance/AxiosInstance";
import Image from "next/image";
import Link from "next/link";

// Translations
const translations = {
  en: {
    // Page Header
    loadingProfile: "Loading profile...",
    userNotFound: "User not found",
    loginToView: "Please login to view your profile",
    editProfile: "Edit Profile",
    save: "Save",
    cancel: "Cancel",
    member: "Member",
    kycVerified: "KYC Verified",
    changeProfilePicture: "Change profile picture",
    deleteProfilePicture: "Delete profile picture",
    
    // Tabs
    personalInfo: "Personal Info",
    address: "Address",
    nominee: "Nominee",
    financial: "Financial",
    kycStatus: "KYC Status",
    security: "Security",
    
    // Personal Info
    personalInformation: "Personal Information",
    firstName: "First Name",
    lastName: "Last Name",
    email: "Email",
    phone: "Phone",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    selectGender: "Select",
    male: "Male",
    female: "Female",
    other: "Other",
    preferNotSay: "Prefer not to say",
    notSpecified: "Not specified",
    occupation: "Occupation",
    selectOccupation: "Select Occupation",
    student: "Student",
    govtEmployee: "Govt. Employee",
    privateEmployee: "Private Employee",
    businessOwner: "Business Owner",
    freelancer: "Freelancer",
    homemaker: "Homemaker",
    farmer: "Farmer",
    engineer: "Engineer",
    doctor: "Doctor",
    teacher: "Teacher",
    monthlyIncome: "Monthly Income",
    selectIncome: "Select Income Range",
    below10k: "Below ৳10,000",
    range10_25k: "৳10,000 – ৳25,000",
    range25_50k: "৳25,000 – ৳50,000",
    range50_100k: "৳50,000 – ৳1,00,000",
    above100k: "Above ৳1,00,000",
    preferNotSayIncome: "Prefer not to say",
    
    // Address
    addressInformation: "Address Information",
    division: "Division",
    district: "District",
    upazila: "Upazila / Area",
    village: "Village / Area / Street",
    postOffice: "Post Office",
    postCode: "Post Code",
    
    // Nominee
    nomineeInformation: "Nominee Information",
    nomineeFirstName: "Nominee First Name",
    nomineeLastName: "Nominee Last Name",
    relationship: "Relationship",
    selectRelationship: "Select Relationship",
    spouse: "Spouse",
    father: "Father",
    mother: "Mother",
    son: "Son",
    daughter: "Daughter",
    brother: "Brother",
    sister: "Sister",
    nomineePhone: "Nominee Phone",
    nomineeNid: "Nominee NID",
    shareOfSavings: "Share of Savings (%)",
    fullSavings: "100% — Full savings",
    
    // Financial
    financialInformation: "Financial Information",
    savingsPlan: "Savings Plan",
    notSelected: "Not selected",
    goalType: "Goal Type",
    notSet: "Not set",
    targetAmount: "Target Amount",
    monthlyDeposit: "Monthly Deposit",
    duration: "Duration",
    months: "months",
    currentSaved: "Current Saved",
    progress: "Progress",
    paymentMethod: "Payment Method",
    method: "Method",
    walletNumber: "Wallet Number",
    accountName: "Account Name",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    
    // KYC
    kycInformation: "KYC Status",
    nidNumber: "NID Number",
    notProvided: "Not provided",
    kycUnderReview: "⏳ Your KYC is under review. Our team will verify within 4 hours.",
    kycVerifiedMsg: "✓ Your KYC has been verified. Your account is fully active.",
    kycRejectedMsg: "❌ Your KYC was rejected. Please re-submit your documents.",
    kycSkippedMsg: "⚠️ You skipped KYC during registration. Please submit your documents to activate your account.",
    pending: "pending",
    verified: "verified",
    rejected: "rejected",
    skipped: "skipped",
    updateKycDocuments: "Update KYC Documents",
    nidFront: "NID Front Side",
    nidBack: "NID Back Side",
    selfiePhoto: "Selfie Photo",
    birthCertificate: "Birth Certificate (Optional)",
    passport: "Passport (Optional)",
    uploadDocument: "Upload Document",
    changeDocument: "Change Document",
    documentUploaded: "Document uploaded",
    submitKyc: "Submit KYC Documents",
    kycSubmitSuccess: "KYC documents submitted successfully! Our team will review within 4 hours.",
    kycSubmitFailed: "Failed to submit KYC documents. Please try again.",
    kycConsent: "I confirm that the documents provided are my own and the information is accurate.",
    kycConsentRequired: "Please agree to the consent statement.",
    nidNumberRequired: "NID number is required",
    nidInvalid: "NID must be 10 or 17 digits",
    selfieRequired: "Selfie photo is required",
    nidOrBirthRequired: "Please upload NID (front or back) or Birth Certificate",
    documentPreview: "Document Preview",
    noDocument: "No document uploaded",
    kycUpdateBtn: "Update KYC",
    
    // Security
    securitySettings: "Security Settings",
    changePassword: "Change Password",
    updatePassword: "Update your account password",
    changeTransactionPin: "Change Transaction PIN",
    updateTransactionPin: "Update your 6-digit transaction PIN",
    
    // Modals
    changePasswordTitle: "Change Password",
    currentPassword: "Current Password",
    newPassword: "New Password",
    confirmNewPassword: "Confirm New Password",
    updatePasswordBtn: "Update Password",
    changePinTitle: "Change Transaction PIN",
    currentPin: "Current PIN",
    newPin: "New PIN",
    confirmNewPin: "Confirm New PIN",
    updatePinBtn: "Update PIN",
    pinPlaceholder: "6-digit PIN",
    
    // Validation
    firstNameRequired: "First name is required",
    phoneRequired: "Phone number is required",
    dobRequired: "Date of birth is required",
    occupationRequired: "Occupation is required",
    incomeRequired: "Income range is required",
    nomineeFirstNameRequired: "Nominee first name is required",
    nomineeRelationRequired: "Nominee relation is required",
    nomineePhoneRequired: "Nominee phone is required",
    validationError: "Validation Error",
    fillRequiredFields: "Please fill all required fields",
    passwordsDoNotMatch: "New passwords do not match",
    passwordMinLength: "Password must be at least 8 characters",
    pinsDoNotMatch: "New PINs do not match",
    pinMustBe6Digits: "PIN must be 6 digits",
    
    // File Upload
    invalidFile: "Invalid File",
    selectValidImage: "Please select a valid image file (JPEG, PNG, WEBP)",
    fileTooLarge: "File Too Large",
    imageSizeLimit: "Image size should be less than 2MB",
    profilePictureUpdated: "Profile picture updated successfully",
    profilePictureDeleted: "Profile picture has been removed",
    uploadFailed: "Failed to upload image",
    deleteFailed: "Failed to delete image",
    somethingWentWrong: "Something went wrong. Please try again.",
    
    // Delete Confirmation
    deleteProfilePictureTitle: "Delete Profile Picture?",
    deleteProfilePictureConfirm: "Are you sure you want to delete your profile picture?",
    yesDelete: "Yes, delete it",
    
    // Alerts
    success: "Success!",
    error: "Error",
    failed: "Failed",
    deleted: "Deleted!",
    ok: "OK",

    // Footer Section - Account Documents & Reports
    accountDocuments: "Account Documents & Reports",
    monthlyReport: "Monthly Savings Report",
    taxCertificate: "Tax Certificate",
    depositReceipt: "Deposit Receipt",
    kycStatus: "KYC Status",
    annualSummary: "Annual Summary",
    myBadges: "My Badges",
    viewAll: "View All",
  },
  bn: {
    // Page Header
    loadingProfile: "প্রোফাইল লোড হচ্ছে...",
    userNotFound: "ব্যবহারকারী পাওয়া যায়নি",
    loginToView: "আপনার প্রোফাইল দেখতে লগইন করুন",
    editProfile: "প্রোফাইল সম্পাদনা",
    save: "সংরক্ষণ",
    cancel: "বাতিল",
    member: "সদস্য",
    kycVerified: "কেওয়াইসি যাচাইকৃত",
    changeProfilePicture: "প্রোফাইল ছবি পরিবর্তন",
    deleteProfilePicture: "প্রোফাইল ছবি মুছুন",
    
    // Tabs
    personalInfo: "ব্যক্তিগত তথ্য",
    address: "ঠিকানা",
    nominee: "উত্তরাধিকারী",
    financial: "আর্থিক",
    kycStatus: "কেওয়াইসি অবস্থা",
    security: "নিরাপত্তা",
    
    // Personal Info
    personalInformation: "ব্যক্তিগত তথ্য",
    firstName: "নামের প্রথম অংশ",
    lastName: "নামের শেষ অংশ",
    email: "ইমেইল",
    phone: "ফোন",
    dateOfBirth: "জন্ম তারিখ",
    gender: "লিঙ্গ",
    selectGender: "নির্বাচন করুন",
    male: "পুরুষ",
    female: "মহিলা",
    other: "অন্যান্য",
    preferNotSay: "উত্তর দিতে চাই না",
    notSpecified: "উল্লেখ করা হয়নি",
    occupation: "পেশা",
    selectOccupation: "পেশা নির্বাচন",
    student: "ছাত্র",
    govtEmployee: "সরকারি কর্মচারী",
    privateEmployee: "বেসরকারি কর্মচারী",
    businessOwner: "ব্যবসায়ী",
    freelancer: "ফ্রিল্যান্সার",
    homemaker: "গৃহিণী",
    farmer: "কৃষক",
    engineer: "ইঞ্জিনিয়ার",
    doctor: "ডাক্তার",
    teacher: "শিক্ষক",
    monthlyIncome: "মাসিক আয়",
    selectIncome: "আয়ের পরিসর নির্বাচন",
    below10k: "৳১০,০০০ এর নিচে",
    range10_25k: "৳১০,০০০ – ৳২৫,০০০",
    range25_50k: "৳২৫,০০০ – ৳৫০,০০০",
    range50_100k: "৳৫০,০০০ – ৳১,০০,০০০",
    above100k: "৳১,০০,০০০ এর উপরে",
    preferNotSayIncome: "উত্তর দিতে চাই না",
    
    // Address
    addressInformation: "ঠিকানার তথ্য",
    division: "বিভাগ",
    district: "জেলা",
    upazila: "উপজেলা / এলাকা",
    village: "গ্রাম / এলাকা / রাস্তা",
    postOffice: "পোস্ট অফিস",
    postCode: "পোস্ট কোড",
    
    // Nominee
    nomineeInformation: "উত্তরাধিকারী তথ্য",
    nomineeFirstName: "উত্তরাধিকারীর নামের প্রথম অংশ",
    nomineeLastName: "উত্তরাধিকারীর নামের শেষ অংশ",
    relationship: "সম্পর্ক",
    selectRelationship: "সম্পর্ক নির্বাচন",
    spouse: "স্বামী/স্ত্রী",
    father: "পিতা",
    mother: "মাতা",
    son: "পুত্র",
    daughter: "কন্যা",
    brother: "ভাই",
    sister: "বোন",
    nomineePhone: "উত্তরাধিকারীর ফোন",
    nomineeNid: "উত্তরাধিকারীর এনআইডি",
    shareOfSavings: "সঞ্চয়ের ভাগ (%)",
    fullSavings: "১০০% — সম্পূর্ণ সঞ্চয়",
    
    // Financial
    financialInformation: "আর্থিক তথ্য",
    savingsPlan: "সঞ্চয় পরিকল্পনা",
    notSelected: "নির্বাচিত নয়",
    goalType: "লক্ষ্যের ধরন",
    notSet: "নির্ধারিত নয়",
    targetAmount: "লক্ষ্যমাত্রা",
    monthlyDeposit: "মাসিক জমা",
    duration: "মেয়াদ",
    months: "মাস",
    currentSaved: "বর্তমান সঞ্চয়",
    progress: "অগ্রগতি",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    method: "পদ্ধতি",
    walletNumber: "ওয়ালেট নম্বর",
    accountName: "অ্যাকাউন্টের নাম",
    bankName: "ব্যাংকের নাম",
    accountNumber: "অ্যাকাউন্ট নম্বর",
    
    // KYC
    kycInformation: "কেওয়াইসি অবস্থা",
    nidNumber: "এনআইডি নম্বর",
    notProvided: "প্রদান করা হয়নি",
    kycUnderReview: "⏳ আপনার কেওয়াইসি পর্যালোচনাধীন। আমাদের টিম ৪ ঘন্টার মধ্যে যাচাই করবে।",
    kycVerifiedMsg: "✓ আপনার কেওয়াইসি যাচাই করা হয়েছে। আপনার অ্যাকাউন্ট সম্পূর্ণ সক্রিয়।",
    kycRejectedMsg: "❌ আপনার কেওয়াইসি প্রত্যাখ্যান করা হয়েছে। দয়া করে নথি আবার জমা দিন।",
    kycSkippedMsg: "⚠️ আপনি রেজিস্ট্রেশনের সময় কেওয়াইসি স্কিপ করেছেন। আপনার অ্যাকাউন্ট সক্রিয় করতে নথি জমা দিন।",
    pending: "প্রক্রিয়াধীন",
    verified: "যাচাইকৃত",
    rejected: "প্রত্যাখ্যাত",
    skipped: "স্কিপ করা হয়েছে",
    updateKycDocuments: "কেওয়াইসি নথি আপডেট করুন",
    nidFront: "এনআইডি সামনের পাশ",
    nidBack: "এনআইডি পেছনের পাশ",
    selfiePhoto: "সেলফি ছবি",
    birthCertificate: "জন্ম নিবন্ধন সনদ (ঐচ্ছিক)",
    passport: "পাসপোর্ট (ঐচ্ছিক)",
    uploadDocument: "নথি আপলোড করুন",
    changeDocument: "নথি পরিবর্তন করুন",
    documentUploaded: "নথি আপলোড হয়েছে",
    submitKyc: "কেওয়াইসি নথি জমা দিন",
    kycSubmitSuccess: "কেওয়াইসি নথি সফলভাবে জমা দেওয়া হয়েছে! আমাদের টিম ৪ ঘন্টার মধ্যে পর্যালোচনা করবে।",
    kycSubmitFailed: "কেওয়াইসি নথি জমা দিতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
    kycConsent: "আমি নিশ্চিত করছি যে দেওয়া নথি আমার নিজের এবং তথ্য সঠিক।",
    kycConsentRequired: "দয়া করে সম্মতি বিবৃতিতে সম্মত হন।",
    nidNumberRequired: "এনআইডি নম্বর প্রয়োজন",
    nidInvalid: "এনআইডি ১০ বা ১৭ অঙ্কের হতে হবে",
    selfieRequired: "সেলফি ছবি প্রয়োজন",
    nidOrBirthRequired: "এনআইডি (সামনে বা পেছনে) বা জন্ম নিবন্ধন সনদ আপলোড করুন",
    documentPreview: "নথি প্রিভিউ",
    noDocument: "কোনো নথি আপলোড করা হয়নি",
    kycUpdateBtn: "কেওয়াইসি আপডেট করুন",
    
    // Security
    securitySettings: "নিরাপত্তা সেটিংস",
    changePassword: "পাসওয়ার্ড পরিবর্তন",
    updatePassword: "আপনার অ্যাকাউন্টের পাসওয়ার্ড আপডেট করুন",
    changeTransactionPin: "ট্রানজেকশন পিন পরিবর্তন",
    updateTransactionPin: "আপনার ৬-অঙ্কের ট্রানজেকশন পিন আপডেট করুন",
    
    // Modals
    changePasswordTitle: "পাসওয়ার্ড পরিবর্তন",
    currentPassword: "বর্তমান পাসওয়ার্ড",
    newPassword: "নতুন পাসওয়ার্ড",
    confirmNewPassword: "নতুন পাসওয়ার্ড নিশ্চিত করুন",
    updatePasswordBtn: "পাসওয়ার্ড আপডেট করুন",
    changePinTitle: "ট্রানজেকশন পিন পরিবর্তন",
    currentPin: "বর্তমান পিন",
    newPin: "নতুন পিন",
    confirmNewPin: "নতুন পিন নিশ্চিত করুন",
    updatePinBtn: "পিন আপডেট করুন",
    pinPlaceholder: "৬-অঙ্কের পিন",
    
    // Validation
    firstNameRequired: "নামের প্রথম অংশ প্রয়োজন",
    phoneRequired: "ফোন নম্বর প্রয়োজন",
    dobRequired: "জন্ম তারিখ প্রয়োজন",
    occupationRequired: "পেশা প্রয়োজন",
    incomeRequired: "আয়ের পরিসর প্রয়োজন",
    nomineeFirstNameRequired: "উত্তরাধিকারীর নামের প্রথম অংশ প্রয়োজন",
    nomineeRelationRequired: "উত্তরাধিকারীর সম্পর্ক প্রয়োজন",
    nomineePhoneRequired: "উত্তরাধিকারীর ফোন প্রয়োজন",
    validationError: "যাচাই ত্রুটি",
    fillRequiredFields: "সব প্রয়োজনীয় ঘর পূরণ করুন",
    passwordsDoNotMatch: "নতুন পাসওয়ার্ড মিলছে না",
    passwordMinLength: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে",
    pinsDoNotMatch: "নতুন পিন মিলছে না",
    pinMustBe6Digits: "পিন ৬ অঙ্কের হতে হবে",
    
    // File Upload
    invalidFile: "অবৈধ ফাইল",
    selectValidImage: "দয়া করে একটি বৈধ ইমেজ ফাইল নির্বাচন করুন (JPEG, PNG, WEBP)",
    fileTooLarge: "ফাইল খুব বড়",
    imageSizeLimit: "ইমেজের আকার ২MB এর কম হওয়া উচিত",
    profilePictureUpdated: "প্রোফাইল ছবি সফলভাবে আপডেট করা হয়েছে",
    profilePictureDeleted: "প্রোফাইল ছবি সরানো হয়েছে",
    uploadFailed: "ছবি আপলোড করতে ব্যর্থ হয়েছে",
    deleteFailed: "ছবি মুছতে ব্যর্থ হয়েছে",
    somethingWentWrong: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।",
    
    // Delete Confirmation
    deleteProfilePictureTitle: "প্রোফাইল ছবি মুছবেন?",
    deleteProfilePictureConfirm: "আপনি কি নিশ্চিত যে আপনার প্রোফাইল ছবি মুছতে চান?",
    yesDelete: "হ্যাঁ, মুছুন",
    
    // Alerts
    success: "সফল!",
    error: "ত্রুটি",
    failed: "ব্যর্থ",
    deleted: "মুছে ফেলা হয়েছে!",
    ok: "ঠিক আছে",

    // Footer Section - Account Documents & Reports
    accountDocuments: "অ্যাকাউন্ট ডকুমেন্ট ও রিপোর্ট",
    monthlyReport: "মাসিক সঞ্চয় রিপোর্ট",
    taxCertificate: "ট্যাক্স সার্টিফিকেট",
    depositReceipt: "জমার রসিদ",
    kycStatus: "কেওয়াইসি স্ট্যাটাস",
    annualSummary: "বার্ষিক সারসংক্ষেপ",
    myBadges: "আমার ব্যাজ",
    viewAll: "সব দেখুন",
  }
};

const UserProfilePage = () => {
  const {
    user,
    getCurrentUser,
    updateProfile,
    changePassword,
    changePin,
    uploadProfilePicture,
    deleteProfilePicture,
    updateKycDocuments,
  } = useAuth();

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [lang, setLang] = useState("bn");
  const fileInputRef = useRef(null);

  // KYC Re-upload states
  const [kycData, setKycData] = useState({
    nidNumber: "",
    nidFrontImage: "",
    nidBackImage: "",
    birthCertificateImage: "",
    selfieImage: "",
    passportImage: "",
    kycConsent: false,
  });
  const [kycUploading, setKycUploading] = useState(false);
  const [kycErrors, setKycErrors] = useState({});
  const nidFrontInputRef = useRef(null);
  const nidBackInputRef = useRef(null);
  const birthInputRef = useRef(null);
  const selfieInputRef = useRef(null);
  const passportInputRef = useRef(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pinData, setPinData] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    division: "",
    district: "",
    upazila: "",
    village: "",
    postOffice: "",
    postCode: "",
    occupation: "",
    income: "",
    nomineeFirstName: "",
    nomineeLastName: "",
    nomineeRelation: "",
    nomineePhone: "",
    nomineeNid: "",
    nomineeShare: "",
  });
  const [errors, setErrors] = useState({});

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedLang = localStorage.getItem('appLanguage') || 'bn';
    setLang(savedLang);
    // Theme handling would go here
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await getCurrentUser();
      setLoading(false);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      const tryCall = async () => {
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          dob: user.dob || "",
          gender: user.gender || "",
          division: user.division || "",
          district: user.district || "",
          upazila: user.upazila || "",
          village: user.village || "",
          postOffice: user.postOffice || "",
          postCode: user.postCode || "",
          occupation: user.occupation || "",
          income: user.income || "",
          nomineeFirstName: user.nominee?.firstName || "",
          nomineeLastName: user.nominee?.lastName || "",
          nomineeRelation: user.nominee?.relation || "",
          nomineePhone: user.nominee?.phone || "",
          nomineeNid: user.nominee?.nid || "",
          nomineeShare: user.nominee?.share?.toString() || "100",
        });
        
        // Populate KYC data from user
        setKycData({
          nidNumber: user.kyc?.nidNumber || "",
          nidFrontImage: user.kyc?.nidFrontImage || "",
          nidBackImage: user.kyc?.nidBackImage || "",
          birthCertificateImage: user.kyc?.birthCertificateImage || "",
          selfieImage: user.kyc?.selfieImage || "",
          passportImage: user.kyc?.passportImage || "",
          kycConsent: user.kyc?.kycConsent || false,
        });
      };
      tryCall();
    }
  }, [user]);

  // ==================== KYC UPLOAD HELPERS ====================
  const uploadKycFile = async (file, folder) => {
    const formDataUpload = new FormData();
    formDataUpload.append('files', file);

    try {
      setKycUploading(true);
      const response = await axiosInstance.post(`/upload/kyc/${folder}`, formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.success && response.data.data && response.data.data.length > 0) {
        return response.data.data[0];
      }
      return null;
    } catch (error) {
      console.error(`KYC upload error for ${folder}:`, error);
      showAlert(t('uploadError'), error.response?.data?.message || error.message, "error");
      return null;
    } finally {
      setKycUploading(false);
    }
  };

  const handleKycNidFrontUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await uploadKycFile(file, 'kyc_nid_front');
    if (result) {
      setKycData(prev => ({ ...prev, nidFrontImage: result.url }));
      setKycErrors(prev => ({ ...prev, nidFront: null }));
    }
  };

  const handleKycNidBackUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await uploadKycFile(file, 'kyc_nid_back');
    if (result) {
      setKycData(prev => ({ ...prev, nidBackImage: result.url }));
      setKycErrors(prev => ({ ...prev, nidBack: null }));
    }
  };

  const handleKycBirthUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await uploadKycFile(file, 'kyc_birth_certificate');
    if (result) {
      setKycData(prev => ({ ...prev, birthCertificateImage: result.url }));
    }
  };

  const handleKycSelfieUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await uploadKycFile(file, 'kyc_selfie');
    if (result) {
      setKycData(prev => ({ ...prev, selfieImage: result.url }));
      setKycErrors(prev => ({ ...prev, selfie: null }));
    }
  };

  const handleKycPassportUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const result = await uploadKycFile(file, 'kyc_passport');
    if (result) {
      setKycData(prev => ({ ...prev, passportImage: result.url }));
    }
  };

  const validateKyc = () => {
    const errors = {};
    const hasNidFront = kycData.nidFrontImage && kycData.nidFrontImage.trim() !== '';
    const hasNidBack = kycData.nidBackImage && kycData.nidBackImage.trim() !== '';
    const hasBirthCert = kycData.birthCertificateImage && kycData.birthCertificateImage.trim() !== '';
    
    if (!hasNidFront && !hasNidBack && !hasBirthCert) {
      errors.nidOrBirth = t('nidOrBirthRequired');
    }
    
    if ((hasNidFront || hasNidBack) && (!kycData.nidNumber || kycData.nidNumber.trim() === '')) {
      errors.nidNumber = t('nidNumberRequired');
    } else if (kycData.nidNumber && kycData.nidNumber.trim() !== '') {
      const cleaned = kycData.nidNumber.replace(/\D/g, '');
      if (cleaned.length !== 10 && cleaned.length !== 17) {
        errors.nidNumber = t('nidInvalid');
      }
    }
    
    if (!kycData.selfieImage || kycData.selfieImage.trim() === '') {
      errors.selfie = t('selfieRequired');
    }
    
    if (!kycData.kycConsent) {
      errors.kycConsent = t('kycConsentRequired');
    }
    
    setKycErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleKycSubmit = async () => {
    if (!validateKyc()) return;
    if (kycUploading) {
      showAlert("Please Wait", t('uploading'), "warning");
      return;
    }

    const payload = {
      nidNumber: kycData.nidNumber || null,
      nidFrontImage: kycData.nidFrontImage || null,
      nidBackImage: kycData.nidBackImage || null,
      birthCertificateImage: kycData.birthCertificateImage || null,
      selfieImage: kycData.selfieImage || null,
      passportImage: kycData.passportImage || null,
      kycConsent: kycData.kycConsent,
    };

    const result = await updateKycDocuments(payload);
    if (result.success) {
      showAlert(t('success'), t('kycSubmitSuccess'), "success");
    } else {
      showAlert(t('error'), result.message || t('kycSubmitFailed'), "error");
    }
  };

  const showAlert = (title, message, type = "success") => {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonColor: "#059669",
      confirmButtonText: t('ok'),
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateProfileForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = t('firstNameRequired');
    if (!formData.phone) newErrors.phone = t('phoneRequired');
    if (!formData.dob) newErrors.dob = t('dobRequired');
    if (!formData.occupation) newErrors.occupation = t('occupationRequired');
    if (!formData.income) newErrors.income = t('incomeRequired');
    if (!formData.nomineeFirstName)
      newErrors.nomineeFirstName = t('nomineeFirstNameRequired');
    if (!formData.nomineeRelation)
      newErrors.nomineeRelation = t('nomineeRelationRequired');
    if (!formData.nomineePhone)
      newErrors.nomineePhone = t('nomineePhoneRequired');
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfileForm()) {
      showAlert(t('validationError'), t('fillRequiredFields'), "error");
      return;
    }

    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      division: formData.division,
      district: formData.district,
      upazila: formData.upazila,
      village: formData.village,
      postOffice: formData.postOffice,
      postCode: formData.postCode,
      occupation: formData.occupation,
      income: formData.income,
    };

    const result = await updateProfile(updateData);
    if (result.success) {
      setEditMode(false);
      await getCurrentUser();
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showAlert(t('error'), t('passwordsDoNotMatch'), "error");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      showAlert(t('error'), t('passwordMinLength'), "error");
      return;
    }

    const result = await changePassword(
      passwordData.currentPassword,
      passwordData.newPassword,
    );
    if (result.success) {
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleChangePin = async () => {
    if (pinData.newPin !== pinData.confirmPin) {
      showAlert(t('error'), t('pinsDoNotMatch'), "error");
      return;
    }
    if (!/^\d{6}$/.test(pinData.newPin)) {
      showAlert(t('error'), t('pinMustBe6Digits'), "error");
      return;
    }

    const result = await changePin(pinData.currentPin, pinData.newPin);
    if (result.success) {
      setShowPinModal(false);
      setPinData({
        currentPin: "",
        newPin: "",
        confirmPin: "",
      });
    }
  };

  // Handle profile picture upload
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showAlert(
        t('invalidFile'),
        t('selectValidImage'),
        "error",
      );
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showAlert(
        t('fileTooLarge'),
        t('imageSizeLimit'),
        "error",
      );
      return;
    }

    setUploadingImage(true);

    try {
      const result = await uploadProfilePicture(file);
      if (result.success) {
        showAlert(
          t('success'),
          t('profilePictureUpdated'),
          "success",
        );
        await getCurrentUser();
      } else {
        showAlert(
          t('failed'),
          result.message || t('uploadFailed'),
          "error",
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      showAlert(t('error'), t('somethingWentWrong'), "error");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteProfilePicture = async () => {
    const result = await Swal.fire({
      title: t('deleteProfilePictureTitle'),
      text: t('deleteProfilePictureConfirm'),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#059669",
      confirmButtonText: t('yesDelete'),
      cancelButtonText: t('cancel'),
    });

    if (result.isConfirmed) {
      setUploadingImage(true);
      try {
        const deleteResult = await deleteProfilePicture();
        if (deleteResult.success) {
          showAlert(t('deleted'), t('profilePictureDeleted'), "success");
          await getCurrentUser();
        } else {
          showAlert(
            t('failed'),
            deleteResult.message || t('deleteFailed'),
            "error",
          );
        }
      } catch (error) {
        console.error("Delete error:", error);
        showAlert(t('error'), t('somethingWentWrong'), "error");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString(lang === 'bn' ? 'bn-BD' : 'en-US');
  };

  const formatCurrency = (amount) => {
    if (!amount) return "৳0";
    return `৳${amount.toLocaleString()}`;
  };

  // Footer section items
  const footerItems = [
    {
      id: "tax-certificate",
      icon: FileText,
      label: t('taxCertificate'),
      labelBn: "ট্যাক্স সার্টিফিকেট",
      href: "/dashboard/tax-certificate",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      id: "deposit-receipt",
      icon: Receipt,
      label: t('depositReceipt'),
      labelBn: "জমার রসিদ",
      href: "/dashboard/deposit-receipt",
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      id: "annual-summary",
      icon: CalendarDays,
      label: t('annualSummary'),
      labelBn: "বার্ষিক সারসংক্ষেপ",
      href: "/dashboard/annual",
      color: "text-rose-500",
      bg: "bg-rose-500/10",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">{t('loadingProfile')}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t('userNotFound')}
          </h2>
          <p className="text-foreground/60 mb-4">
            {t('loginToView')}
          </p>
        </div>
      </div>
    );
  }

  // Tab configuration
  const tabs = [
    { id: "profile", label: t('personalInfo'), icon: User },
    { id: "address", label: t('address'), icon: MapPin },
    { id: "nominee", label: t('nominee'), icon: Users },
    { id: "financial", label: t('financial'), icon: DollarSign },
    { id: "kyc", label: t('kycStatus'), icon: Shield },
    { id: "security", label: t('security'), icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4 pb-32">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              {/* Profile Picture Section */}
              <div className="relative group">
                <div className="relative">
                  {user.profilePicture ? (
                    <Image
                      src={user.profilePicture}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-primary to-primary-light flex items-center justify-center text-white text-3xl font-bold">
                      {user.firstName?.[0] || user.fullName?.[0] || "U"}
                    </div>
                  )}

                  {/* Upload Button Overlay */}
                  <button
                    onClick={handleFileSelect}
                    disabled={uploadingImage}
                    className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full text-white hover:bg-primary-light transition disabled:opacity-50"
                    aria-label={t('changeProfilePicture')}
                  >
                    {uploadingImage ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Camera size={14} />
                    )}
                  </button>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Delete Button (only if has profile picture) */}
                {user.profilePicture && (
                  <button
                    onClick={handleDeleteProfilePicture}
                    disabled={uploadingImage}
                    className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition disabled:opacity-50"
                    aria-label={t('deleteProfilePicture')}
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {user.fullName || `${user.firstName} ${user.lastName || ""}`}
                </h1>
                <p className="text-foreground/60 flex items-center gap-2 mt-1">
                  <User size={14} />{" "}
                  {user.role === "user" ? t('member') : user.role}
                  {user.kyc?.status === "verified" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full text-xs">
                      <Shield size={10} /> {t('kycVerified')}
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
                >
                  <Edit2 size={16} /> {t('editProfile')}
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
                  >
                    <Save size={16} /> {t('save')}
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      if (user) {
                        setFormData({
                          firstName: user.firstName || "",
                          lastName: user.lastName || "",
                          email: user.email || "",
                          phone: user.phone || "",
                          dob: user.dob || "",
                          gender: user.gender || "",
                          division: user.division || "",
                          district: user.district || "",
                          upazila: user.upazila || "",
                          village: user.village || "",
                          postOffice: user.postOffice || "",
                          postCode: user.postCode || "",
                          occupation: user.occupation || "",
                          income: user.income || "",
                          nomineeFirstName: user.nominee?.firstName || "",
                          nomineeLastName: user.nominee?.lastName || "",
                          nomineeRelation: user.nominee?.relation || "",
                          nomineePhone: user.nominee?.phone || "",
                          nomineeNid: user.nominee?.nid || "",
                          nomineeShare:
                            user.nominee?.share?.toString() || "100",
                        });
                      }
                    }}
                    className="px-4 py-2 border border-border rounded-xl font-semibold text-foreground/70 hover:border-red-500 hover:text-red-500 transition flex items-center gap-2"
                  >
                    <X size={16} /> {t('cancel')}
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-card border border-border text-foreground/60 hover:border-primary"
                }`}
              >
                <IconComponent size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          {/* Personal Info Tab */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <User size={20} /> {t('personalInformation')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  label={t('firstName')}
                  value={formData.firstName}
                  field="firstName"
                  editMode={editMode}
                  onChange={handleInputChange}
                  error={errors.firstName}
                  lang={lang}
                />
                <InfoField
                  label={t('lastName')}
                  value={formData.lastName}
                  field="lastName"
                  editMode={editMode}
                  onChange={handleInputChange}
                  lang={lang}
                />
                <InfoField
                  label={t('email')}
                  value={formData.email}
                  field="email"
                  type="email"
                  editMode={editMode}
                  onChange={handleInputChange}
                  lang={lang}
                />
                <InfoField
                  label={t('phone')}
                  value={formData.phone}
                  field="phone"
                  editMode={editMode}
                  onChange={handleInputChange}
                  error={errors.phone}
                  lang={lang}
                />
                <InfoField
                  label={t('dateOfBirth')}
                  value={formData.dob}
                  field="dob"
                  type="date"
                  editMode={editMode}
                  onChange={handleInputChange}
                  error={errors.dob}
                  lang={lang}
                />
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('gender')}
                  </label>
                  {editMode ? (
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                    >
                      <option value="">{t('selectGender')}</option>
                      <option>{t('male')}</option>
                      <option>{t('female')}</option>
                      <option>{t('other')}</option>
                      <option>{t('preferNotSay')}</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                      {formData.gender || t('notSpecified')}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('occupation')} *
                  </label>
                  {editMode ? (
                    <select
                      value={formData.occupation}
                      onChange={(e) =>
                        handleInputChange("occupation", e.target.value)
                      }
                      className={`w-full p-3 rounded-xl border ${
                        errors.occupation ? "border-red-500" : "border-border"
                      } bg-background text-foreground outline-none focus:border-primary`}
                    >
                      <option value="">{t('selectOccupation')}</option>
                      <option>{t('student')}</option>
                      <option>{t('govtEmployee')}</option>
                      <option>{t('privateEmployee')}</option>
                      <option>{t('businessOwner')}</option>
                      <option>{t('freelancer')}</option>
                      <option>{t('homemaker')}</option>
                      <option>{t('farmer')}</option>
                      <option>{t('engineer')}</option>
                      <option>{t('doctor')}</option>
                      <option>{t('teacher')}</option>
                      <option>{t('other')}</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                      {formData.occupation || t('notSpecified')}
                    </p>
                  )}
                  {errors.occupation && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.occupation}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('monthlyIncome')} *
                  </label>
                  {editMode ? (
                    <select
                      value={formData.income}
                      onChange={(e) =>
                        handleInputChange("income", e.target.value)
                      }
                      className={`w-full p-3 rounded-xl border ${
                        errors.income ? "border-red-500" : "border-border"
                      } bg-background text-foreground outline-none focus:border-primary`}
                    >
                      <option value="">{t('selectIncome')}</option>
                      <option>{t('below10k')}</option>
                      <option>{t('range10_25k')}</option>
                      <option>{t('range25_50k')}</option>
                      <option>{t('range50_100k')}</option>
                      <option>{t('above100k')}</option>
                      <option>{t('preferNotSayIncome')}</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                      {formData.income || t('notSpecified')}
                    </p>
                  )}
                  {errors.income && (
                    <p className="text-xs text-red-500 mt-1">{errors.income}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === "address" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin size={20} /> {t('addressInformation')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  label={t('division')}
                  value={formData.division}
                  field="division"
                  editMode={editMode}
                  onChange={handleInputChange}
                  lang={lang}
                />
                <InfoField
                  label={t('district')}
                  value={formData.district}
                  field="district"
                  editMode={editMode}
                  onChange={handleInputChange}
                  lang={lang}
                />
                <InfoField
                  label={t('upazila')}
                  value={formData.upazila}
                  field="upazila"
                  editMode={editMode}
                  onChange={handleInputChange}
                  lang={lang}
                />
                <InfoField
                  label={t('village')}
                  value={formData.village}
                  field="village"
                  editMode={editMode}
                  onChange={handleInputChange}
                  lang={lang}
                />
                <InfoField
                  label={t('postOffice')}
                  value={formData.postOffice}
                  field="postOffice"
                  editMode={editMode}
                  onChange={handleInputChange}
                  lang={lang}
                />
                <InfoField
                  label={t('postCode')}
                  value={formData.postCode}
                  field="postCode"
                  editMode={editMode}
                  onChange={handleInputChange}
                  lang={lang}
                />
              </div>
            </div>
          )}

          {/* Nominee Tab */}
          {activeTab === "nominee" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Users size={20} /> {t('nomineeInformation')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  label={t('nomineeFirstName')}
                  value={formData.nomineeFirstName}
                  field="nomineeFirstName"
                  editMode={editMode}
                  onChange={handleInputChange}
                  error={errors.nomineeFirstName}
                  lang={lang}
                />
                <InfoField
                  label={t('nomineeLastName')}
                  value={formData.nomineeLastName}
                  field="nomineeLastName"
                  editMode={editMode}
                  onChange={handleInputChange}
                  lang={lang}
                />
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('relationship')} *
                  </label>
                  {editMode ? (
                    <select
                      value={formData.nomineeRelation}
                      onChange={(e) =>
                        handleInputChange("nomineeRelation", e.target.value)
                      }
                      className={`w-full p-3 rounded-xl border ${
                        errors.nomineeRelation
                          ? "border-red-500"
                          : "border-border"
                      } bg-background text-foreground outline-none focus:border-primary`}
                    >
                      <option value="">{t('selectRelationship')}</option>
                      <option>{t('spouse')}</option>
                      <option>{t('father')}</option>
                      <option>{t('mother')}</option>
                      <option>{t('son')}</option>
                      <option>{t('daughter')}</option>
                      <option>{t('brother')}</option>
                      <option>{t('sister')}</option>
                      <option>{t('other')}</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                      {formData.nomineeRelation || t('notSpecified')}
                    </p>
                  )}
                  {errors.nomineeRelation && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.nomineeRelation}
                    </p>
                  )}
                </div>
                <InfoField
                  label={t('nomineePhone')}
                  value={formData.nomineePhone}
                  field="nomineePhone"
                  editMode={editMode}
                  onChange={handleInputChange}
                  error={errors.nomineePhone}
                  lang={lang}
                />
                <InfoField
                  label={t('nomineeNid')}
                  value={formData.nomineeNid}
                  field="nomineeNid"
                  editMode={editMode}
                  onChange={handleInputChange}
                  lang={lang}
                />
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('shareOfSavings')}
                  </label>
                  {editMode ? (
                    <select
                      value={formData.nomineeShare}
                      onChange={(e) =>
                        handleInputChange("nomineeShare", e.target.value)
                      }
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                    >
                      <option value="100">{t('fullSavings')}</option>
                      <option value="75">75%</option>
                      <option value="50">50%</option>
                      <option value="25">25%</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                      {formData.nomineeShare}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === "financial" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <DollarSign size={20} /> {t('financialInformation')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('savingsPlan')}
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground capitalize">
                    {user.selectedPlan || t('notSelected')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('goalType')}
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {user.goal?.type || t('notSet')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('targetAmount')}
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {formatCurrency(user.goal?.targetAmount)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('monthlyDeposit')}
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {formatCurrency(user.goal?.monthlyDeposit)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('duration')}
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {user.goal?.duration
                      ? `${user.goal.duration} ${t('months')}`
                      : t('notSet')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('currentSaved')}
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {formatCurrency(user.goal?.currentSaved)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('progress')}
                  </label>
                  <div className="p-3 bg-secondary/20 rounded-xl">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-foreground">
                        {user.goal?.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${user.goal?.progress || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  {t('paymentMethod')}
                </h3>
                <div className="p-4 bg-secondary/20 rounded-xl">
                  <p className="capitalize">
                    <strong>{t('method')}:</strong> {user.paymentMethod || t('notSet')}
                  </p>
                  {user.paymentMethod !== "bank" ? (
                    <>
                      <p>
                        <strong>{t('walletNumber')}:</strong>{" "}
                        {user.paymentDetails?.walletNumber || "N/A"}
                      </p>
                      <p>
                        <strong>{t('accountName')}:</strong>{" "}
                        {user.paymentDetails?.accountName || "N/A"}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>{t('bankName')}:</strong>{" "}
                        {user.paymentDetails?.bankName || "N/A"}
                      </p>
                      <p>
                        <strong>{t('accountNumber')}:</strong>{" "}
                        {user.paymentDetails?.accountNumber || "N/A"}
                      </p>
                      <p>
                        <strong>{t('accountName')}:</strong>{" "}
                        {user.paymentDetails?.accountName || "N/A"}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* KYC Tab */}
          {activeTab === "kyc" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield size={20} /> {t('kycInformation')}
              </h2>
              
              {/* Current KYC Status */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('nidNumber')}
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {user.kyc?.nidNumber || t('notProvided')}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    {t('kycStatus')}
                  </label>
                  <div className="p-3 bg-secondary/20 rounded-xl">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        user.kyc?.status === "verified"
                          ? "bg-green-500/10 text-green-500"
                          : user.kyc?.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : user.kyc?.status === "rejected"
                              ? "bg-red-500/10 text-red-500"
                              : user.kyc?.status === "skipped"
                                ? "bg-amber-500/10 text-amber-500"
                                : "bg-gray-500/10 text-gray-500"
                      }`}
                    >
                      {user.kyc?.status === "verified" && <Check size={14} />}
                      {user.kyc?.status === "verified" ? t('verified') : 
                       user.kyc?.status === "pending" ? t('pending') : 
                       user.kyc?.status === "rejected" ? t('rejected') :
                       user.kyc?.status === "skipped" ? t('skipped') :
                       user.kyc?.status || t('pending')}
                    </span>
                  </div>
                </div>
                
                {/* Status Messages */}
                {user.kyc?.status === "pending" && (
                  <div className="md:col-span-2">
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <p className="text-yellow-500 text-sm">{t('kycUnderReview')}</p>
                    </div>
                  </div>
                )}
                {user.kyc?.status === "verified" && (
                  <div className="md:col-span-2">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <p className="text-green-500 text-sm">{t('kycVerifiedMsg')}</p>
                    </div>
                  </div>
                )}
                {user.kyc?.status === "rejected" && (
                  <div className="md:col-span-2">
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
                      <p className="text-red-500 text-sm">{t('kycRejectedMsg')}</p>
                      {user.kyc?.rejectionReason && (
                        <p className="text-red-500/80 text-xs mt-1">Reason: {user.kyc.rejectionReason}</p>
                      )}
                    </div>
                  </div>
                )}
                {(user.kyc?.status === "skipped" || !user.kyc?.status) && (
                  <div className="md:col-span-2">
                    <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl">
                      <p className="text-amber-500 text-sm">{t('kycSkippedMsg')}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* KYC Document Update Form - Show for non-verified users */}
              {user.kyc?.status !== "verified" && (
                <div className="border border-border rounded-2xl p-5 bg-card">
                  <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
                    <Upload size={18} /> {t('updateKycDocuments')}
                  </h3>
                  
                  {/* NID Number */}
                  <div className="mb-4">
                    <label className="block text-sm font-semibold text-foreground/70 mb-1">
                      {t('nidNumber')} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={kycData.nidNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, '');
                        setKycData(prev => ({ ...prev, nidNumber: value }));
                        setKycErrors(prev => ({ ...prev, nidNumber: null }));
                      }}
                      className={`w-full p-3 rounded-xl border ${kycErrors.nidNumber ? "border-red-500" : "border-border"} bg-background text-foreground outline-none focus:border-primary`}
                      placeholder={t('nidNumber')}
                      maxLength="17"
                    />
                    {kycErrors.nidNumber && <p className="text-xs text-red-500 mt-1">{kycErrors.nidNumber}</p>}
                  </div>

                  {/* Document Upload Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    {/* NID Front */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground/70 mb-1">
                        {t('nidFront')} <span className="text-red-500">*</span>
                      </label>
                      <div 
                        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition hover:border-primary ${kycData.nidFrontImage ? "border-primary bg-primary/5" : "border-border"}`}
                        onClick={() => nidFrontInputRef.current?.click()}
                      >
                        <input ref={nidFrontInputRef} type="file" accept="image/*" onChange={handleKycNidFrontUpload} className="hidden" />
                        {kycData.nidFrontImage ? (
                          <div className="relative">
                            <img src={kycData.nidFrontImage} alt="NID Front" className="w-full h-24 object-contain rounded-lg" />
                            <p className="text-xs text-green-500 mt-1">{t('documentUploaded')}</p>
                          </div>
                        ) : (
                          <div className="py-4">
                            <div className="text-2xl mb-1">🪪</div>
                            <p className="text-sm font-semibold">{t('uploadDocument')}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* NID Back */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground/70 mb-1">
                        {t('nidBack')} <span className="text-red-500">*</span>
                      </label>
                      <div 
                        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition hover:border-primary ${kycData.nidBackImage ? "border-primary bg-primary/5" : "border-border"}`}
                        onClick={() => nidBackInputRef.current?.click()}
                      >
                        <input ref={nidBackInputRef} type="file" accept="image/*" onChange={handleKycNidBackUpload} className="hidden" />
                        {kycData.nidBackImage ? (
                          <div className="relative">
                            <img src={kycData.nidBackImage} alt="NID Back" className="w-full h-24 object-contain rounded-lg" />
                            <p className="text-xs text-green-500 mt-1">{t('documentUploaded')}</p>
                          </div>
                        ) : (
                          <div className="py-4">
                            <div className="text-2xl mb-1">🪪</div>
                            <p className="text-sm font-semibold">{t('uploadDocument')}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Selfie */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground/70 mb-1">
                        {t('selfiePhoto')} <span className="text-red-500">*</span>
                      </label>
                      <div 
                        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition hover:border-primary ${kycData.selfieImage ? "border-primary bg-primary/5" : "border-border"}`}
                        onClick={() => selfieInputRef.current?.click()}
                      >
                        <input ref={selfieInputRef} type="file" accept="image/*" onChange={handleKycSelfieUpload} className="hidden" />
                        {kycData.selfieImage ? (
                          <div className="relative">
                            <img src={kycData.selfieImage} alt="Selfie" className="w-full h-24 object-contain rounded-lg" />
                            <p className="text-xs text-green-500 mt-1">{t('documentUploaded')}</p>
                          </div>
                        ) : (
                          <div className="py-4">
                            <div className="text-2xl mb-1">🤳</div>
                            <p className="text-sm font-semibold">{t('uploadDocument')}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Birth Certificate (Optional) */}
                    <div>
                      <label className="block text-sm font-semibold text-foreground/70 mb-1">
                        {t('birthCertificate')}
                      </label>
                      <div 
                        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition hover:border-primary ${kycData.birthCertificateImage ? "border-primary bg-primary/5" : "border-border"}`}
                        onClick={() => birthInputRef.current?.click()}
                      >
                        <input ref={birthInputRef} type="file" accept="image/*" onChange={handleKycBirthUpload} className="hidden" />
                        {kycData.birthCertificateImage ? (
                          <div className="relative">
                            <img src={kycData.birthCertificateImage} alt="Birth Certificate" className="w-full h-24 object-contain rounded-lg" />
                            <p className="text-xs text-green-500 mt-1">{t('documentUploaded')}</p>
                          </div>
                        ) : (
                          <div className="py-4">
                            <div className="text-2xl mb-1">📜</div>
                            <p className="text-sm font-semibold">{t('uploadDocument')}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Passport (Optional) */}
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-semibold text-foreground/70 mb-1">
                        {t('passport')}
                      </label>
                      <div 
                        className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition hover:border-primary ${kycData.passportImage ? "border-primary bg-primary/5" : "border-border"}`}
                        onClick={() => passportInputRef.current?.click()}
                      >
                        <input ref={passportInputRef} type="file" accept="image/*" onChange={handleKycPassportUpload} className="hidden" />
                        {kycData.passportImage ? (
                          <div className="relative">
                            <img src={kycData.passportImage} alt="Passport" className="w-full h-24 object-contain rounded-lg" />
                            <p className="text-xs text-green-500 mt-1">{t('documentUploaded')}</p>
                          </div>
                        ) : (
                          <div className="py-4">
                            <div className="text-2xl mb-1">🛂</div>
                            <p className="text-sm font-semibold">{t('uploadDocument')}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {kycErrors.nidOrBirth && <p className="text-sm text-red-500 mb-3">{kycErrors.nidOrBirth}</p>}
                  {kycErrors.selfie && <p className="text-sm text-red-500 mb-3">{kycErrors.selfie}</p>}

                  {/* KYC Consent */}
                  <div className="mb-4">
                    <div 
                      className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition ${kycData.kycConsent ? "bg-primary/5 border border-primary/20" : "bg-background border border-border"}`}
                      onClick={() => setKycData(prev => ({ ...prev, kycConsent: !prev.kycConsent }))}
                    >
                      <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${kycData.kycConsent ? "bg-primary border-primary" : "border-border"}`}>
                        {kycData.kycConsent && <Check size={12} className="text-white" />}
                      </div>
                      <p className="text-sm text-foreground/70">{t('kycConsent')}</p>
                    </div>
                    {kycErrors.kycConsent && <p className="text-xs text-red-500 mt-1">{kycErrors.kycConsent}</p>}
                  </div>

                  {/* Submit Button */}
                  <button
                    onClick={handleKycSubmit}
                    disabled={kycUploading}
                    className="w-full py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {kycUploading ? (
                      <><Loader2 size={18} className="animate-spin" /> {t('uploading')}</>
                    ) : (
                      <><Upload size={18} /> {t('submitKyc')}</>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Lock size={20} /> {t('securitySettings')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="p-4 border border-border rounded-xl text-left hover:border-primary transition"
                >
                  <h3 className="font-semibold text-foreground mb-1">
                    {t('changePassword')}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    {t('updatePassword')}
                  </p>
                </button>
                <button
                  onClick={() => setShowPinModal(true)}
                  className="p-4 border border-border rounded-xl text-left hover:border-primary transition"
                >
                  <h3 className="font-semibold text-foreground mb-1">
                    {t('changeTransactionPin')}
                  </h3>
                  <p className="text-sm text-foreground/60">
                    {t('updateTransactionPin')}
                  </p>
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* ==================== FOOTER SECTION ==================== */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8"
        >
          <div className="bg-card border border-border rounded-2xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <FileText size={20} className="text-primary" />
              {t('accountDocuments')}
            </h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {footerItems.map((item) => {
                const IconComponent = item.icon;
                const displayLabel = lang === 'bn' ? item.labelBn : item.label;
                return (
                  <Link
                    key={item.id}
                    href={item.href}
                    className="group flex flex-col items-center justify-center p-4 rounded-xl border border-border hover:border-primary transition-all duration-200 hover:shadow-md hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform duration-200`}>
                      <IconComponent size={24} className={item.color} />
                    </div>
                    <span className="text-xs font-medium text-foreground/70 text-center leading-tight group-hover:text-primary transition-colors duration-200">
                      {displayLabel}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* View All Button */}
          </div>
        </motion.div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">
              {t('changePasswordTitle')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  {t('currentPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  {t('newPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  {t('confirmNewPassword')}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleChangePassword}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold"
              >
                {t('updatePasswordBtn')}
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-3 border border-border rounded-xl font-semibold text-foreground/70"
              >
                {t('cancel')}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Change PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">
              {t('changePinTitle')}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  {t('currentPin')}
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={pinData.currentPin}
                  onChange={(e) =>
                    setPinData({
                      ...pinData,
                      currentPin: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  placeholder={t('pinPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  {t('newPin')}
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={pinData.newPin}
                  onChange={(e) =>
                    setPinData({
                      ...pinData,
                      newPin: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  placeholder={t('pinPlaceholder')}
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  {t('confirmNewPin')}
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={pinData.confirmPin}
                  onChange={(e) =>
                    setPinData({
                      ...pinData,
                      confirmPin: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  placeholder={t('pinPlaceholder')}
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleChangePin}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold"
              >
                {t('updatePinBtn')}
              </button>
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-3 border border-border rounded-xl font-semibold text-foreground/70"
              >
                {t('cancel')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Info Field Component
const InfoField = ({
  label,
  value,
  field,
  type = "text",
  editMode,
  onChange,
  error,
  lang,
}) => {
  const t = (key) => {
    const translations = {
      notProvided: lang === 'bn' ? "প্রদান করা হয়নি" : "Not provided",
    };
    return translations[key] || key;
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-foreground/70 mb-1">
        {label}
      </label>
      {editMode ? (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(field, e.target.value)}
          className={`w-full p-3 rounded-xl border ${
            error ? "border-red-500" : "border-border"
          } bg-background text-foreground outline-none focus:border-primary`}
        />
      ) : (
        <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
          {value || t('notProvided')}
        </p>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default UserProfilePage;