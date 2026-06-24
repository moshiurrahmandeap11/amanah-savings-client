"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Check,
  X,
  Ban,
  FileText,
  Loader2,
  Printer,
  Download,
  ImageIcon,
  Camera,
  Calendar,
  MapPin,
  Phone,
  Mail,
  User,
  CreditCard,
  Shield,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  FileImage,
  Baby,
  Globe,
} from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// ==================== TRANSLATIONS ====================
const translations = {
  en: {
    kycReviewQueue: "🪪 KYC Review Queue",
    searchMember: "Search by name, phone, email, NID...",
    all: "All",
    pending: "Pending",
    approved: "Approved",
    rejected: "Rejected",
    applicant: "Applicant",
    nidNumber: "NID Number",
    submitted: "Submitted",
    kycStatus: "KYC Status",
    account: "Account",
    plan: "Plan",
    actions: "Actions",
    view: "View",
    approve: "Approve",
    reject: "Reject",
    ban: "Ban",
    noApplications: "No KYC applications found",
    documentViewer: "KYC Document Viewer",
    nidCard: "NID Card",
    nidFront: "NID Front",
    nidBack: "NID Back",
    selfiePhoto: "Selfie Photo",
    birthCertificate: "Birth Certificate",
    passport: "Passport",
    approveKyc: "Approve KYC",
    rejectKyc: "Reject",
    pendingText: "Pending",
    approvedText: "Approved",
    rejectedText: "Rejected",
    active: "Active",
    inactive: "Inactive",
    showing: "Showing",
    of: "of",
    applications: "applications",
    banUserConfirm: "Ban user permanently?",
    rejectionReason: "Enter rejection reason:",
    kycUpdateSuccess: "KYC status updated successfully",
    banSuccess: "User banned permanently",
    failedToFetch: "Failed to fetch KYC applications",
    kycUpdateFailed: "KYC update failed",
    banFailed: "Ban failed",
    print: "Print",
    printKyc: "Print KYC",
    downloadImage: "Download Image",
    personalInfo: "Personal Information",
    contactInfo: "Contact Information",
    address: "Address",
    nomineeInfo: "Nominee Information",
    paymentInfo: "Payment Information",
    documents: "Documents",
    noImage: "No image uploaded",
    close: "Close",
    prev: "Previous",
    next: "Next",
    zoomIn: "Zoom In",
    zoomOut: "Zoom Out",
    fullName: "Full Name",
    phone: "Phone",
    email: "Email",
    dob: "Date of Birth",
    gender: "Gender",
    occupation: "Occupation",
    income: "Income",
    division: "Division",
    district: "District",
    upazila: "Upazila",
    village: "Village",
    postOffice: "Post Office",
    postCode: "Post Code",
    nomineeName: "Nominee Name",
    nomineeRelation: "Relation",
    nomineePhone: "Nominee Phone",
    nomineeNid: "Nominee NID",
    nomineeShare: "Share",
    paymentMethod: "Payment Method",
    bankName: "Bank Name",
    accountNumber: "Account Number",
    accountName: "Account Name",
    branch: "Branch",
    routing: "Routing Number",
    walletNumber: "Wallet Number",
    walletName: "Wallet Name",
    kycConsent: "KYC Consent",
    consentGiven: "Consent given",
    consentNotGiven: "Consent not given",
    islamicMode: "Islamic Mode",
    enabled: "Enabled",
    disabled: "Disabled",
    submittedAt: "Submitted At",
    verifiedAt: "Verified At",
    rejectionReasonLabel: "Rejection Reason",
    documentNotUploaded: "Document not uploaded",
    kycPrintTitle: "KYC Application Details",
    printedOn: "Printed on",
    page: "Page",
  },
  bn: {
    kycReviewQueue: "🪪 কেওয়াইসি রিভিউ কিউ",
    searchMember: "নাম, ফোন, ইমেইল, NID দিয়ে খুঁজুন...",
    all: "সব",
    pending: "পেন্ডিং",
    approved: "অনুমোদিত",
    rejected: "প্রত্যাখ্যাত",
    applicant: "আবেদনকারী",
    nidNumber: "এনআইডি নম্বর",
    submitted: "জমা দেওয়া হয়েছে",
    kycStatus: "কেওয়াইসি স্ট্যাটাস",
    account: "অ্যাকাউন্ট",
    plan: "প্ল্যান",
    actions: "অ্যাকশন",
    view: "দেখুন",
    approve: "অনুমোদন",
    reject: "প্রত্যাখ্যান",
    ban: "ব্যান",
    noApplications: "কোনো কেওয়াইসি আবেদন পাওয়া যায়নি",
    documentViewer: "কেওয়াইসি ডকুমেন্ট ভিউয়ার",
    nidCard: "এনআইডি কার্ড",
    nidFront: "এনআইডি সামনে",
    nidBack: "এনআইডি পেছনে",
    selfiePhoto: "সেলফি ছবি",
    birthCertificate: "জন্ম নিবন্ধন সনদ",
    passport: "পাসপোর্ট",
    approveKyc: "কেওয়াইসি অনুমোদন",
    rejectKyc: "প্রত্যাখ্যান",
    pendingText: "পেন্ডিং",
    approvedText: "অনুমোদিত",
    rejectedText: "প্রত্যাখ্যাত",
    active: "সক্রিয়",
    inactive: "নিষ্ক্রিয়",
    showing: "দেখানো হচ্ছে",
    of: "এর মধ্যে",
    applications: "টি আবেদন",
    banUserConfirm: "ইউজারকে স্থায়ীভাবে ব্যান করবেন?",
    rejectionReason: "প্রত্যাখ্যানের কারণ লিখুন:",
    kycUpdateSuccess: "কেওয়াইসি স্ট্যাটাস আপডেট হয়েছে",
    banSuccess: "ইউজার স্থায়ীভাবে ব্যান হয়েছে",
    failedToFetch: "কেওয়াইসি আবেদন লোড করতে ব্যর্থ হয়েছে",
    kycUpdateFailed: "কেওয়াইসি আপডেট ব্যর্থ হয়েছে",
    banFailed: "ব্যান করতে ব্যর্থ হয়েছে",
    print: "প্রিন্ট",
    printKyc: "কেওয়াইসি প্রিন্ট করুন",
    downloadImage: "ছবি ডাউনলোড",
    personalInfo: "ব্যক্তিগত তথ্য",
    contactInfo: "যোগাযোগ তথ্য",
    address: "ঠিকানা",
    nomineeInfo: "উত্তরাধিকারীর তথ্য",
    paymentInfo: "পেমেন্ট তথ্য",
    documents: "ডকুমেন্টস",
    noImage: "কোনো ছবি আপলোড করা হয়নি",
    close: "বন্ধ করুন",
    prev: "আগে",
    next: "পরে",
    zoomIn: "জুম ইন",
    zoomOut: "জুম আউট",
    fullName: "পুরো নাম",
    phone: "ফোন",
    email: "ইমেইল",
    dob: "জন্ম তারিখ",
    gender: "লিঙ্গ",
    occupation: "পেশা",
    income: "আয়",
    division: "বিভাগ",
    district: "জেলা",
    upazila: "উপজেলা",
    village: "গ্রাম",
    postOffice: "পোস্ট অফিস",
    postCode: "পোস্ট কোড",
    nomineeName: "উত্তরাধিকারীর নাম",
    nomineeRelation: "সম্পর্ক",
    nomineePhone: "উত্তরাধিকারীর ফোন",
    nomineeNid: "উত্তরাধিকারীর NID",
    nomineeShare: "অংশ",
    paymentMethod: "পেমেন্ট পদ্ধতি",
    bankName: "ব্যাংকের নাম",
    accountNumber: "অ্যাকাউন্ট নম্বর",
    accountName: "অ্যাকাউন্টধারীর নাম",
    branch: "ব্রাঞ্চ",
    routing: "রাউটিং নম্বর",
    walletNumber: "ওয়ালেট নম্বর",
    walletName: "ওয়ালেটের নাম",
    kycConsent: "কেওয়াইসি সম্মতি",
    consentGiven: "সম্মতি দেওয়া হয়েছে",
    consentNotGiven: "সম্মতি দেওয়া হয়নি",
    islamicMode: "ইসলামিক মোড",
    enabled: "চালু",
    disabled: "বন্ধ",
    submittedAt: "জমার সময়",
    verifiedAt: "যাচাইয়ের সময়",
    rejectionReasonLabel: "প্রত্যাখ্যানের কারণ",
    documentNotUploaded: "ডকুমেন্ট আপলোড করা হয়নি",
    kycPrintTitle: "কেওয়াইসি আবেদনের বিবরণ",
    printedOn: "প্রিন্টের সময়",
    page: "পৃষ্ঠা",
  },
};

// ==================== COMPONENT ====================
const KycPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedKyc, setSelectedKyc] = useState(null);
  const [showDocModal, setShowDocModal] = useState(false);
  const [applications, setApplications] = useState([]);
  console.log("kyc : ", applications);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [lang, setLang] = useState("bn");
  const [activeDocTab, setActiveDocTab] = useState("all");
  const [imageZoom, setImageZoom] = useState(1);
  const printRef = useRef(null);

  // Load language
  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "bn";
    setLang(savedLang);
  }, []);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const filters = ["all", "pending", "approved", "rejected"];

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  // ==================== TOAST ====================
  const showToastMessage = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  }, []);

  // ==================== API CALLS ====================
  const fetchApplications = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.append("page", page);
        params.append("limit", pagination.itemsPerPage);
        if (searchQuery) params.append("search", searchQuery);
        if (activeFilter !== "all") params.append("status", activeFilter);

        const res = await axiosInstance.get(`/admin/kyc?${params.toString()}`, {
          headers: getAuthHeaders(),
        });

        if (res.data.success) {
          setApplications(res.data.data.applications);
          setPagination(res.data.data.pagination);
        }
      } catch (err) {
        showToastMessage(
          err.response?.data?.message || t("failedToFetch"),
          "error"
        );
      } finally {
        setLoading(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [activeFilter, searchQuery, pagination.itemsPerPage, lang]
  );

  useEffect(() => {
    fetchApplications(1);
  }, [fetchApplications]);

  const updateKycStatus = async (userId, status, rejectionReason = null) => {
    try {
      const payload = { status };
      if (rejectionReason) payload.rejectionReason = rejectionReason;
      const res = await axiosInstance.patch(
        `/admin/users/${userId}/kyc`,
        payload,
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToastMessage(t("kycUpdateSuccess"), "success");
        fetchApplications(pagination.currentPage);
      }
    } catch (err) {
      showToastMessage(
        err.response?.data?.message || t("kycUpdateFailed"),
        "error"
      );
    }
  };

  const banUser = async (userId, name) => {
    if (!confirm(t("banUserConfirm") + ` ${name}?`)) return;
    try {
      const res = await axiosInstance.patch(
        `/admin/users/${userId}/status`,
        { isBanned: true },
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToastMessage(t("banSuccess"), "error");
        fetchApplications(pagination.currentPage);
      }
    } catch (err) {
      showToastMessage(
        err.response?.data?.message || t("banFailed"),
        "error"
      );
    }
  };

  const viewDocuments = (kyc) => {
    setSelectedKyc(kyc);
    setShowDocModal(true);
    setActiveDocTab("all");
    setImageZoom(1);
    document.body.style.overflow = "hidden";
  };

  const closeDocModal = () => {
    setShowDocModal(false);
    setSelectedKyc(null);
    setImageZoom(1);
    document.body.style.overflow = "auto";
  };

  const getBadgeClass = (color) => {
    const classes = {
      ok: "bg-green-500/10 text-green-500",
      warn: "bg-amber-500/10 text-amber-500",
      info: "bg-blue-500/10 text-blue-500",
      danger: "bg-red-500/10 text-red-500",
      primary: "bg-primary/10 text-primary",
    };
    return classes[color] || classes.ok;
  };

  const getKycStatusDisplay = (status) => {
    if (status === "approved") return { label: t("approvedText"), color: "ok" };
    if (status === "rejected")
      return { label: t("rejectedText"), color: "danger" };
    return { label: t("pendingText"), color: "warn" };
  };

  const getAvatarBg = (index) => {
    const colors = [
      "from-primary to-primary-light",
      "from-amber-500 to-orange-500",
      "from-red-500 to-orange-500",
      "from-blue-500 to-purple-500",
      "from-green-500 to-teal-500",
    ];
    return colors[index % colors.length];
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    const now = new Date();
    const diff = Math.floor((now - d) / (1000 * 60 * 60));
    if (diff < 1) return "Just now";
    if (diff < 24) return `${diff} hrs ago`;
    if (diff < 48) return "Yesterday";
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatFullDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString(lang === "bn" ? "bn-BD" : "en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ==================== PRINT FUNCTIONALITY ====================
  const handlePrint = () => {
    if (!selectedKyc) return;
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    const kyc = selectedKyc;
    const docTitle = `${t("kycPrintTitle")} - ${kyc.fullName || kyc.firstName}`;

    const docImages = [];
    if (kyc.nidFrontUrl)
      docImages.push({ label: t("nidFront"), url: kyc.nidFrontUrl });
    if (kyc.nidBackUrl)
      docImages.push({ label: t("nidBack"), url: kyc.nidBackUrl });
    if (kyc.selfieUrl)
      docImages.push({ label: t("selfiePhoto"), url: kyc.selfieUrl });
    if (kyc.birthCertificateUrl)
      docImages.push({ label: t("birthCertificate"), url: kyc.birthCertificateUrl });
    if (kyc.passportUrl)
      docImages.push({ label: t("passport"), url: kyc.passportUrl });

    const statusDisplay = getKycStatusDisplay(kyc.kycStatus);

    const printHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>${docTitle}</title>
  <style>
    @page { size: A4; margin: 15mm; }
    * { box-sizing: border-box; }
    body { font-family: 'Segoe UI', Arial, sans-serif; margin: 0; padding: 20px; color: #333; line-height: 1.6; }
    .header { text-align: center; border-bottom: 3px solid #059669; padding-bottom: 15px; margin-bottom: 20px; }
    .header h1 { margin: 0; font-size: 22px; color: #059669; }
    .header p { margin: 5px 0 0; font-size: 12px; color: #666; }
    .section { margin-bottom: 18px; page-break-inside: avoid; }
    .section-title { font-size: 14px; font-weight: bold; color: #059669; border-bottom: 1px solid #ddd; padding-bottom: 5px; margin-bottom: 10px; }
    .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 8px 20px; }
    .info-row { display: flex; justify-content: space-between; font-size: 12px; }
    .info-row .label { font-weight: 600; color: #555; }
    .info-row .value { color: #333; }
    .status-badge { display: inline-block; padding: 3px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; }
    .status-pending { background: #fef3c7; color: #92400e; }
    .status-approved { background: #d1fae5; color: #065f46; }
    .status-rejected { background: #fee2e2; color: #991b1b; }
    .doc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-top: 10px; }
    .doc-item { border: 1px solid #ddd; border-radius: 8px; padding: 10px; text-align: center; page-break-inside: avoid; }
    .doc-item img { width: 100%; max-height: 280px; object-fit: contain; border-radius: 4px; }
    .doc-item .doc-label { font-size: 12px; font-weight: bold; color: #555; margin-top: 8px; }
    .doc-item .doc-missing { font-size: 12px; color: #999; padding: 40px 0; }
    .footer { margin-top: 30px; text-align: center; font-size: 11px; color: #999; border-top: 1px solid #ddd; padding-top: 10px; }
    @media print {
      body { padding: 0; }
      .doc-item { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>${t("kycPrintTitle")}</h1>
    <p>${t("printedOn")}: ${new Date().toLocaleString()}</p>
  </div>

  <div class="section">
    <div class="section-title">${t("personalInfo")}</div>
    <div class="info-grid">
      <div class="info-row"><span class="label">${t("fullName")}:</span><span class="value">${kyc.fullName || `${kyc.firstName} ${kyc.lastName || ""}`.trim() || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("nidNumber")}:</span><span class="value">${kyc.nidNumber || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("phone")}:</span><span class="value">${kyc.phone || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("email")}:</span><span class="value">${kyc.email || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("dob")}:</span><span class="value">${kyc.dob || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("gender")}:</span><span class="value">${kyc.gender || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("occupation")}:</span><span class="value">${kyc.occupation || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("income")}:</span><span class="value">${kyc.income || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("plan")}:</span><span class="value">${kyc.selectedPlan || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("kycStatus")}:</span><span class="value"><span class="status-badge status-${kyc.kycStatus}">${statusDisplay.label}</span></span></div>
    </div>
  </div>

  <div class="section">
    <div class="section-title">${t("address")}</div>
    <div class="info-grid">
      <div class="info-row"><span class="label">${t("division")}:</span><span class="value">${kyc.division || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("district")}:</span><span class="value">${kyc.district || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("upazila")}:</span><span class="value">${kyc.upazila || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("village")}:</span><span class="value">${kyc.village || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("postOffice")}:</span><span class="value">${kyc.postOffice || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("postCode")}:</span><span class="value">${kyc.postCode || "N/A"}</span></div>
    </div>
  </div>

  ${kyc.nominee ? `
  <div class="section">
    <div class="section-title">${t("nomineeInfo")}</div>
    <div class="info-grid">
      <div class="info-row"><span class="label">${t("nomineeName")}:</span><span class="value">${kyc.nominee.fullName || `${kyc.nominee.firstName} ${kyc.nominee.lastName || ""}`.trim() || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("nomineeRelation")}:</span><span class="value">${kyc.nominee.relation || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("nomineePhone")}:</span><span class="value">${kyc.nominee.phone || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("nomineeNid")}:</span><span class="value">${kyc.nominee.nid || "N/A"}</span></div>
      <div class="info-row"><span class="label">${t("nomineeShare")}:</span><span class="value">${kyc.nominee.share || "N/A"}%</span></div>
    </div>
  </div>
  ` : ""}

  ${kyc.paymentDetails ? `
  <div class="section">
    <div class="section-title">${t("paymentInfo")}</div>
    <div class="info-grid">
      <div class="info-row"><span class="label">${t("paymentMethod")}:</span><span class="value">${kyc.paymentMethod || "N/A"}</span></div>
      ${kyc.paymentMethod === "bank" ? `
        <div class="info-row"><span class="label">${t("bankName")}:</span><span class="value">${kyc.paymentDetails.bankName || "N/A"}</span></div>
        <div class="info-row"><span class="label">${t("accountNumber")}:</span><span class="value">${kyc.paymentDetails.accountNumber || "N/A"}</span></div>
        <div class="info-row"><span class="label">${t("accountName")}:</span><span class="value">${kyc.paymentDetails.accountName || "N/A"}</span></div>
        <div class="info-row"><span class="label">${t("branch")}:</span><span class="value">${kyc.paymentDetails.branch || "N/A"}</span></div>
        <div class="info-row"><span class="label">${t("routing")}:</span><span class="value">${kyc.paymentDetails.routingNumber || "N/A"}</span></div>
      ` : `
        <div class="info-row"><span class="label">${t("walletNumber")}:</span><span class="value">${kyc.paymentDetails.walletNumber || "N/A"}</span></div>
        <div class="info-row"><span class="label">${t("walletName")}:</span><span class="value">${kyc.paymentDetails.accountName || "N/A"}</span></div>
      `}
    </div>
  </div>
  ` : ""}

  <div class="section">
    <div class="section-title">${t("documents")}</div>
    <div class="doc-grid">
      ${docImages.length > 0
        ? docImages.map((doc) => `
          <div class="doc-item">
            <img src="${doc.url}" alt="${doc.label}" onerror="this.parentElement.innerHTML='<div class=\\'doc-missing\\'>${t("noImage")}</div><div class=\\'doc-label\\'>${doc.label}</div>'" />
            <div class="doc-label">${doc.label}</div>
          </div>
        `).join("")
        : `<div class="doc-item" style="grid-column: 1 / -1;"><div class="doc-missing">${t("documentNotUploaded")}</div></div>`
      }
    </div>
  </div>

  <div class="footer">
    <p>${t("kycPrintTitle")} | ${t("printedOn")}: ${new Date().toLocaleString()} | ${t("page")} 1</p>
  </div>

  <script>
    window.onload = function() { window.print(); };
  </script>
</body>
</html>`;

    printWindow.document.write(printHtml);
    printWindow.document.close();
  };

  const handleDownloadImage = (url, filename) => {
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // ==================== DOCUMENT TABS ====================
  const getDocumentTabs = (kyc) => {
    const tabs = [{ id: "all", label: "All", icon: FileImage }];
    if (kyc.nidFrontUrl || kyc.nidBackUrl)
      tabs.push({ id: "nid", label: t("nidCard"), icon: CreditCard });
    if (kyc.selfieUrl) tabs.push({ id: "selfie", label: t("selfiePhoto"), icon: Camera });
    if (kyc.birthCertificateUrl)
      tabs.push({ id: "birth", label: t("birthCertificate"), icon: Baby });
    if (kyc.passportUrl)
      tabs.push({ id: "passport", label: t("passport"), icon: Globe });
    return tabs;
  };

  const getFilteredDocs = (kyc) => {
    const docs = [];
    if (activeDocTab === "all" || activeDocTab === "nid") {
      if (kyc.nidFrontUrl)
        docs.push({ id: "nidFront", label: t("nidFront"), url: kyc.nidFrontUrl, icon: CreditCard });
      if (kyc.nidBackUrl)
        docs.push({ id: "nidBack", label: t("nidBack"), url: kyc.nidBackUrl, icon: CreditCard });
    }
    if ((activeDocTab === "all" || activeDocTab === "selfie") && kyc.selfieUrl)
      docs.push({ id: "selfie", label: t("selfiePhoto"), url: kyc.selfieUrl, icon: Camera });
    if ((activeDocTab === "all" || activeDocTab === "birth") && kyc.birthCertificateUrl)
      docs.push({ id: "birth", label: t("birthCertificate"), url: kyc.birthCertificateUrl, icon: Baby });
    if ((activeDocTab === "all" || activeDocTab === "passport") && kyc.passportUrl)
      docs.push({ id: "passport", label: t("passport"), url: kyc.passportUrl, icon: Globe });
    return docs;
  };

  // ==================== RENDER ====================
  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">{t("kycReviewQueue")}</h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500">
            {pagination.totalItems} {t("pending")}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background">
          <Search size={16} className="text-foreground/50" />
          <input
            type="text"
            placeholder={t("searchMember")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchApplications(1)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                fetchApplications(1);
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${
                activeFilter === filter
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {t(filter)}
            </button>
          ))}
        </div>
      </div>

      {/* KYC Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-border bg-background">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                      {t("applicant")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                      {t("nidNumber")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                      {t("submitted")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                      {t("kycStatus")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                      {t("account")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                      {t("plan")}
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                      {t("actions")}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-4 py-10 text-center text-sm text-foreground/50"
                      >
                        {t("noApplications")}
                      </td>
                    </tr>
                  ) : (
                    applications.map((kyc, idx) => {
                      const status = getKycStatusDisplay(kyc.kycStatus);
                      const avatar = kyc.firstName?.[0]?.toUpperCase() || "?";
                      return (
                        <tr
                          key={kyc.id}
                          className="border-b border-border last:border-0 hover:bg-primary/5 transition"
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div
                                className={`w-9 h-9 rounded-full bg-linear-to-r ${getAvatarBg(
                                  idx
                                )} flex items-center justify-center text-white font-bold text-sm`}
                              >
                                {avatar}
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-foreground">
                                  {kyc.fullName ||
                                    `${kyc.firstName} ${kyc.lastName || ""}`.trim()}
                                </div>
                                <div className="text-xs text-foreground/50">
                                  {kyc.phone}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground font-mono">
                            {kyc.nidNumber || "N/A"}
                          </td>
                          <td className="px-4 py-3 text-xs text-foreground/50">
                            {formatDate(kyc.kycSubmittedAt || kyc.createdAt)}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(
                                status.color
                              )}`}
                            >
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                                kyc.accountActive
                                  ? getBadgeClass("ok")
                                  : "bg-gray-500/10 text-gray-500"
                              }`}
                            >
                              {kyc.accountActive ? t("active") : t("inactive")}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs font-semibold text-foreground/70 capitalize">
                            {kyc.selectedPlan}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2 flex-wrap">
                              <button
                                onClick={() => viewDocuments(kyc)}
                                className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:border-primary transition flex items-center gap-1"
                                title="View Documents"
                              >
                                <Eye size={14} /> {t("view")}
                              </button>
                              {kyc.kycStatus !== "approved" && (
                                <button
                                  onClick={() =>
                                    updateKycStatus(kyc.id, "approved")
                                  }
                                  className="px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                                >
                                  {t("approve")}
                                </button>
                              )}
                              {kyc.kycStatus !== "rejected" && (
                                <button
                                  onClick={() => {
                                    const reason = prompt(t("rejectionReason"));
                                    if (reason !== null)
                                      updateKycStatus(
                                        kyc.id,
                                        "rejected",
                                        reason
                                      );
                                  }}
                                  className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition"
                                >
                                  {t("reject")}
                                </button>
                              )}
                              <button
                                onClick={() =>
                                  banUser(
                                    kyc.id,
                                    kyc.fullName || kyc.firstName
                                  )
                                }
                                className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition"
                              >
                                {t("ban")}
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-border">
              <div className="text-xs text-foreground/50">
                {t("showing")} {applications.length} {t("of")}{" "}
                {pagination.totalItems} {t("applications")}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    fetchApplications(pagination.currentPage - 1)
                  }
                  disabled={pagination.currentPage <= 1}
                  className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition disabled:opacity-50"
                >
                  ← Prev
                </button>
                {Array.from(
                  { length: Math.min(5, pagination.totalPages) },
                  (_, i) => {
                    const page = i + 1;
                    return (
                      <button
                        key={page}
                        onClick={() => fetchApplications(page)}
                        className={`px-3 py-1 rounded-lg text-xs font-semibold transition ${
                          pagination.currentPage === page
                            ? "bg-linear-to-r from-primary to-primary-light text-white border-none"
                            : "border border-border hover:border-primary"
                        }`}
                      >
                        {page}
                      </button>
                    );
                  }
                )}
                <button
                  onClick={() =>
                    fetchApplications(pagination.currentPage + 1)
                  }
                  disabled={
                    pagination.currentPage >= pagination.totalPages
                  }
                  className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ==================== DOCUMENT VIEWER MODAL ==================== */}
      <AnimatePresence>
        {showDocModal && selectedKyc && (
          <div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-2 sm:p-4"
            onClick={closeDocModal}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-card rounded-2xl w-full max-w-5xl max-h-[92vh] overflow-hidden flex flex-col shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="p-4 sm:p-5 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
                <div className="min-w-0">
                  <h3 className="text-lg font-bold text-foreground truncate">
                    {t("documentViewer")}
                  </h3>
                  <p className="text-sm text-foreground/60 truncate">
                    {selectedKyc.fullName || selectedKyc.firstName}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-primary text-white text-xs font-semibold hover:opacity-90 transition"
                  >
                    <Printer size={14} /> {t("print")}
                  </button>
                  <button
                    onClick={closeDocModal}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Modal Body - Two Column Layout */}
              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col lg:flex-row">
                  {/* Left: Info Panel */}
                  <div className="lg:w-80 border-r border-border bg-background/50 p-4 space-y-5 shrink-0">
                    {/* Personal Info */}
                    <div>
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <User size={14} /> {t("personalInfo")}
                      </h4>
                      <div className="space-y-1.5">
                        <InfoRow label={t("fullName")} value={selectedKyc.fullName || `${selectedKyc.firstName} ${selectedKyc.lastName || ""}`.trim()} />
                        <InfoRow label={t("nidNumber")} value={selectedKyc.nidNumber} mono />
                        <InfoRow label={t("phone")} value={selectedKyc.phone} />
                        <InfoRow label={t("email")} value={selectedKyc.email} />
                        <InfoRow label={t("dob")} value={selectedKyc.dob} />
                        <InfoRow label={t("gender")} value={selectedKyc.gender} />
                        <InfoRow label={t("occupation")} value={selectedKyc.occupation} />
                        <InfoRow label={t("income")} value={selectedKyc.income} />
                      </div>
                    </div>

                    {/* Address */}
                    <div>
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <MapPin size={14} /> {t("address")}
                      </h4>
                      <div className="space-y-1.5">
                        <InfoRow label={t("division")} value={selectedKyc.division} />
                        <InfoRow label={t("district")} value={selectedKyc.district} />
                        <InfoRow label={t("upazila")} value={selectedKyc.upazila} />
                        <InfoRow label={t("village")} value={selectedKyc.village} />
                        <InfoRow label={t("postOffice")} value={selectedKyc.postOffice} />
                        <InfoRow label={t("postCode")} value={selectedKyc.postCode} />
                      </div>
                    </div>

                    {/* Nominee */}
                    {selectedKyc.nominee && (
                      <div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <Shield size={14} /> {t("nomineeInfo")}
                        </h4>
                        <div className="space-y-1.5">
                          <InfoRow label={t("nomineeName")} value={selectedKyc.nominee.fullName || `${selectedKyc.nominee.firstName} ${selectedKyc.nominee.lastName || ""}`.trim()} />
                          <InfoRow label={t("nomineeRelation")} value={selectedKyc.nominee.relation} />
                          <InfoRow label={t("nomineePhone")} value={selectedKyc.nominee.phone} />
                          <InfoRow label={t("nomineeNid")} value={selectedKyc.nominee.nid} />
                          <InfoRow label={t("nomineeShare")} value={`${selectedKyc.nominee.share || 100}%`} />
                        </div>
                      </div>
                    )}

                    {/* Payment */}
                    {selectedKyc.paymentDetails && (
                      <div>
                        <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CreditCard size={14} /> {t("paymentInfo")}
                        </h4>
                        <div className="space-y-1.5">
                          <InfoRow label={t("paymentMethod")} value={selectedKyc.paymentMethod} />
                          {selectedKyc.paymentMethod === "bank" ? (
                            <>
                              <InfoRow label={t("bankName")} value={selectedKyc.paymentDetails.bankName} />
                              <InfoRow label={t("accountNumber")} value={selectedKyc.paymentDetails.accountNumber} />
                              <InfoRow label={t("accountName")} value={selectedKyc.paymentDetails.accountName} />
                              <InfoRow label={t("branch")} value={selectedKyc.paymentDetails.branch} />
                              <InfoRow label={t("routing")} value={selectedKyc.paymentDetails.routingNumber} />
                            </>
                          ) : (
                            <>
                              <InfoRow label={t("walletNumber")} value={selectedKyc.paymentDetails.walletNumber} />
                              <InfoRow label={t("walletName")} value={selectedKyc.paymentDetails.accountName} />
                            </>
                          )}
                        </div>
                      </div>
                    )}

                    {/* KYC Meta */}
                    <div>
                      <h4 className="text-xs font-bold text-primary uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Calendar size={14} /> KYC
                      </h4>
                      <div className="space-y-1.5">
                        <InfoRow label={t("kycStatus")} value={getKycStatusDisplay(selectedKyc.kycStatus).label} />
                        <InfoRow label={t("kycConsent")} value={selectedKyc.kycConsent ? t("consentGiven") : t("consentNotGiven")} />
                        <InfoRow label={t("islamicMode")} value={selectedKyc.islamicMode ? t("enabled") : t("disabled")} />
                        <InfoRow label={t("submittedAt")} value={formatFullDate(selectedKyc.kycSubmittedAt)} />
                        <InfoRow label={t("verifiedAt")} value={formatFullDate(selectedKyc.kycVerifiedAt)} />
                        {selectedKyc.kycRejectionReason && (
                          <InfoRow label={t("rejectionReasonLabel")} value={selectedKyc.kycRejectionReason} danger />
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right: Document Gallery */}
                  <div className="flex-1 p-4 min-w-0">
                    {/* Document Tabs */}
                    <div className="flex gap-2 mb-4 overflow-x-auto pb-1">
                      {getDocumentTabs(selectedKyc).map((tab) => {
                        const Icon = tab.icon;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setActiveDocTab(tab.id);
                              setImageZoom(1);
                            }}
                            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition whitespace-nowrap ${
                              activeDocTab === tab.id
                                ? "bg-primary/10 border-primary text-primary"
                                : "border-border text-foreground/60 hover:border-primary/50"
                            }`}
                          >
                            <Icon size={14} />
                            {tab.label}
                          </button>
                        );
                      })}
                    </div>

                    {/* Zoom Controls */}
                    <div className="flex items-center gap-2 mb-3">
                      <button
                        onClick={() => setImageZoom((z) => Math.max(0.5, z - 0.25))}
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                        title={t("zoomOut")}
                      >
                        <ZoomOut size={14} />
                      </button>
                      <span className="text-xs font-mono text-foreground/50 w-12 text-center">
                        {Math.round(imageZoom * 100)}%
                      </span>
                      <button
                        onClick={() => setImageZoom((z) => Math.min(3, z + 0.25))}
                        className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                        title={t("zoomIn")}
                      >
                        <ZoomIn size={14} />
                      </button>
                    </div>

                    {/* Document Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {getFilteredDocs(selectedKyc).map((doc) => (
                        <div
                          key={doc.id}
                          className="border border-border rounded-xl overflow-hidden bg-background group"
                        >
                          <div className="relative overflow-hidden" style={{ minHeight: 200 }}>
                            <img
                              src={doc.url}
                              alt={doc.label}
                              className="w-full object-contain transition-transform duration-200"
                              style={{
                                transform: `scale(${imageZoom})`,
                                minHeight: 200,
                                maxHeight: 400,
                              }}
                              onError={(e) => {
                                e.target.style.display = "none";
                                e.target.nextSibling.style.display = "flex";
                              }}
                            />
                            <div
                              className="hidden flex-col items-center justify-center text-foreground/40 py-12"
                              style={{ minHeight: 200 }}
                            >
                              <FileText size={40} />
                              <p className="text-xs mt-2">{t("noImage")}</p>
                            </div>
                          </div>
                          <div className="p-3 border-t border-border flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <doc.icon size={14} className="text-primary" />
                              <span className="text-xs font-semibold text-foreground">
                                {doc.label}
                              </span>
                            </div>
                            <button
                              onClick={() =>
                                handleDownloadImage(
                                  doc.url,
                                  `${selectedKyc.firstName}_${doc.id}.jpg`
                                )
                              }
                              className="text-xs text-primary hover:underline flex items-center gap-1"
                            >
                              <Download size={12} /> {t("downloadImage")}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {getFilteredDocs(selectedKyc).length === 0 && (
                      <div className="text-center py-16 text-foreground/40">
                        <FileImage size={48} className="mx-auto mb-3 opacity-50" />
                        <p className="text-sm">{t("documentNotUploaded")}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-4 border-t border-border flex flex-col sm:flex-row gap-3 shrink-0 bg-background/50">
                <button
                  onClick={() => {
                    updateKycStatus(selectedKyc.id, "approved");
                    closeDocModal();
                  }}
                  className="flex-1 py-2.5 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold text-sm hover:opacity-90 transition flex items-center justify-center gap-2"
                >
                  <Check size={16} /> {t("approveKyc")}
                </button>
                <button
                  onClick={() => {
                    const reason = prompt(t("rejectionReason"));
                    if (reason !== null) {
                      updateKycStatus(selectedKyc.id, "rejected", reason);
                      closeDocModal();
                    }
                  }}
                  className="flex-1 py-2.5 rounded-xl border-2 border-red-500/30 text-red-500 font-semibold text-sm hover:bg-red-500/10 transition flex items-center justify-center gap-2"
                >
                  <X size={16} /> {t("rejectKyc")}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center ${
              toast.type === "error"
                ? "bg-red-500"
                : toast.type === "warning"
                ? "bg-amber-500"
                : "bg-green-500"
            } text-white`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==================== HELPER: Info Row ====================
const InfoRow = ({ label, value, mono = false, danger = false }) => {
  if (!value || value === "N/A") return null;
  return (
    <div className="flex justify-between items-start gap-2">
      <span className="text-xs text-foreground/50 shrink-0">{label}</span>
      <span
        className={`text-xs font-medium text-right break-all ${
          mono ? "font-mono" : ""
        } ${danger ? "text-red-500" : "text-foreground"}`}
      >
        {value}
      </span>
    </div>
  );
};

export default KycPage;
