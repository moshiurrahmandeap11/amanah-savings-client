"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Check,
  X,
  Ban,
  FileText,
  Loader2,
} from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    kycReviewQueue: "🪪 KYC Review Queue",
    searchMember: "Search member...",
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
    view: "📄 View",
    approve: "✓ Approve",
    reject: "✗ Reject",
    ban: "🚫 Ban",
    noApplications: "No KYC applications found",
    documentViewer: "Document Viewer",
    nidCard: "NID Card",
    selfiePhoto: "Selfie Photo",
    approveKyc: "✓ Approve KYC",
    rejectKyc: "✗ Reject",
    pendingText: "⏳ Pending",
    approvedText: "✅ Approved",
    rejectedText: "❌ Rejected",
    active: "🟢 Active",
    inactive: "⚪ Inactive",
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
  },
  bn: {
    kycReviewQueue: "🪪 কেওয়াইসি রিভিউ কিউ",
    searchMember: "মেম্বার খুঁজুন...",
    all: "সব",
    pending: "পেন্ডিং",
    approved: "অনুমোদিত",
    rejected: "প্রত্যাখ্যাত",
    applicant: "আবেদনকারী",
    nidNumber: "এনআইডি নম্বর",
    submitted: "জমা দেওয়া হয়েছে",
    kycStatus: "কেওয়াইসি স্ট্যাটাস",
    account: "অ্যাকাউন্ট",
    plan: "প্ল্যান",
    actions: "অ্যাকশন",
    view: "📄 দেখুন",
    approve: "✓ অনুমোদন",
    reject: "✗ প্রত্যাখ্যান",
    ban: "🚫 ব্যান",
    noApplications: "কোনো কেওয়াইসি আবেদন পাওয়া যায়নি",
    documentViewer: "ডকুমেন্ট ভিউয়ার",
    nidCard: "এনআইডি কার্ড",
    selfiePhoto: "সেলফি ছবি",
    approveKyc: "✓ কেওয়াইসি অনুমোদন",
    rejectKyc: "✗ প্রত্যাখ্যান",
    pendingText: "⏳ পেন্ডিং",
    approvedText: "✅ অনুমোদিত",
    rejectedText: "❌ প্রত্যাখ্যাত",
    active: "🟢 সক্রিয়",
    inactive: "⚪ নিষ্ক্রিয়",
    showing: "দেখানো হচ্ছে",
    of: "এর মধ্যে",
    applications: "টি আবেদন",
    banUserConfirm: "ইউজারকে স্থায়ীভাবে ব্যান করবেন?",
    rejectionReason: "প্রত্যাখ্যানের কারণ লিখুন:",
    kycUpdateSuccess: "কেওয়াইসি স্ট্যাটাস আপডেট হয়েছে",
    banSuccess: "ইউজার স্থায়ীভাবে ব্যান হয়েছে",
    failedToFetch: "কেওয়াইসি আবেদন লোড করতে ব্যর্থ হয়েছে",
    kycUpdateFailed: "কেওয়াইসি আপডেট ব্যর্থ হয়েছে",
    banFailed: "ব্যান করতে ব্যর্থ হয়েছে",
  }
};

const KycPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedKyc, setSelectedKyc] = useState(null);
  const [showDocModal, setShowDocModal] = useState(false);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [lang, setLang] = useState("bn");

  // Load language
  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "bn";
    setLang(savedLang);
  }, []);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const filters = [t('all'), t('pending'), t('approved'), t('rejected')];

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchApplications = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", pagination.itemsPerPage);
      if (searchQuery) params.append("search", searchQuery);
      if (activeFilter !== t('all')) params.append("status", activeFilter.toLowerCase());

      const res = await axiosInstance.get(`/admin/kyc?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (res.data.success) {
        setApplications(res.data.data.applications);
        setPagination(res.data.data.pagination);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || t('failedToFetch'), "error");
    } finally {
      setLoading(false);
    }
  }, [activeFilter, searchQuery, pagination.itemsPerPage, lang]);

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
        showToastMessage(t('kycUpdateSuccess'), "success");
        fetchApplications(pagination.currentPage);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || t('kycUpdateFailed'), "error");
    }
  };

  const banUser = async (userId, name) => {
    if (!confirm(t('banUserConfirm') + ` ${name}?`)) return;
    try {
      const res = await axiosInstance.patch(
        `/admin/users/${userId}/status`,
        { isBanned: true },
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToastMessage(t('banSuccess'), "error");
        fetchApplications(pagination.currentPage);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || t('banFailed'), "error");
    }
  };

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const viewDocuments = (kyc) => {
    setSelectedKyc(kyc);
    setShowDocModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeDocModal = () => {
    setShowDocModal(false);
    setSelectedKyc(null);
    document.body.style.overflow = "auto";
  };

  const getBadgeClass = (type, color) => {
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
    if (status === "approved") return { label: t('approvedText'), color: "ok" };
    if (status === "rejected") return { label: t('rejectedText'), color: "danger" };
    return { label: t('pendingText'), color: "warn" };
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
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">{t('kycReviewQueue')}</h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500">
            {pagination.totalItems} {t('pending')}
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background">
          <Search size={16} className="text-foreground/50" />
          <input
            type="text"
            placeholder={t('searchMember')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchApplications(1)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {["All", "Pending", "Approved", "Rejected"].map((filter) => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); fetchApplications(1); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${
                activeFilter === filter
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {t(filter.toLowerCase())}
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
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('applicant')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('nidNumber')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('submitted')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('kycStatus')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('account')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('plan')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="px-4 py-10 text-center text-sm text-foreground/50">
                        {t('noApplications')}
                      </td>
                    </tr>
                  ) : (
                    applications.map((kyc, idx) => {
                      const status = getKycStatusDisplay(kyc.kycStatus);
                      const avatar = kyc.firstName?.[0]?.toUpperCase() || "?";
                      return (
                        <tr key={kyc.id} className="border-b border-border last:border-0 hover:bg-primary/5 transition">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full bg-linear-to-r ${getAvatarBg(idx)} flex items-center justify-center text-white font-bold text-sm`}>
                                {avatar}
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-foreground">{kyc.fullName || `${kyc.firstName} ${kyc.lastName || ""}`.trim()}</div>
                                <div className="text-xs text-foreground/50">{kyc.phone}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground font-mono">{kyc.nidNumber || "N/A"}</td>
                          <td className="px-4 py-3 text-xs text-foreground/50">{formatDate(kyc.kycSubmittedAt || kyc.createdAt)}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(status.label, status.color)}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${kyc.accountActive ? getBadgeClass("Active", "ok") : getBadgeClass("Inactive", "gray")}`}>
                              {kyc.accountActive ? t('active') : t('inactive')}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs font-semibold text-foreground/70 capitalize">{kyc.selectedPlan}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => viewDocuments(kyc)} className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:border-primary transition" title="View Documents">
                                {t('view')}
                              </button>
                              {kyc.kycStatus !== "approved" && (
                                <button onClick={() => updateKycStatus(kyc.id, "approved")} className="px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition">
                                  {t('approve')}
                                </button>
                              )}
                              {kyc.kycStatus !== "rejected" && (
                                <button onClick={() => {
                                  const reason = prompt(t('rejectionReason'));
                                  if (reason !== null) updateKycStatus(kyc.id, "rejected", reason);
                                }} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition">
                                  {t('reject')}
                                </button>
                              )}
                              <button onClick={() => banUser(kyc.id, kyc.fullName || kyc.firstName)} className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition">
                                {t('ban')}
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
                {t('showing')} {applications.length} {t('of')} {pagination.totalItems} {t('applications')}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchApplications(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                  className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition disabled:opacity-50"
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
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
                })}
                <button
                  onClick={() => fetchApplications(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition disabled:opacity-50"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {showDocModal && selectedKyc && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={closeDocModal}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-border">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-foreground">{t('documentViewer')}</h3>
                  <button onClick={closeDocModal} className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition">✕</button>
                </div>
                <p className="text-sm text-foreground/60 mt-1">{selectedKyc.fullName || selectedKyc.firstName}</p>
                <p className="text-xs text-foreground/50">NID: {selectedKyc.nidNumber || "N/A"}</p>
              </div>
              <div className="p-5 space-y-4">
                <div className="bg-background rounded-xl p-4 text-center border border-border">
                  <div className="text-5xl mb-2">🪪</div>
                  <div className="font-semibold text-foreground">{t('nidCard')}</div>
                  <div className="text-xs text-foreground/50 mt-1">Front & Back</div>
                  <div className="mt-3 p-3 bg-card rounded-lg border border-border">
                    {selectedKyc.nidFrontUrl ? (
                      <img src={selectedKyc.nidFrontUrl} alt="NID Front" className="w-full h-32 object-contain rounded-lg" />
                    ) : (
                      <div className="h-32 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center text-foreground/50">
                        <FileText size={32} />
                      </div>
                    )}
                  </div>
                </div>
                <div className="bg-background rounded-xl p-4 text-center border border-border">
                  <div className="text-5xl mb-2">🤳</div>
                  <div className="font-semibold text-foreground">{t('selfiePhoto')}</div>
                  <div className="text-xs text-foreground/50 mt-1">Live capture</div>
                  <div className="mt-3 p-3 bg-card rounded-lg border border-border">
                    {selectedKyc.selfieUrl ? (
                      <img src={selectedKyc.selfieUrl} alt="Selfie" className="w-full h-32 object-contain rounded-lg" />
                    ) : (
                      <div className="h-32 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center text-foreground/50">
                        <FileText size={32} />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-border flex gap-3">
                <button
                  onClick={() => { updateKycStatus(selectedKyc.id, "approved"); closeDocModal(); }}
                  className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold"
                >
                  {t('approveKyc')}
                </button>
                <button
                  onClick={() => {
                    const reason = prompt(t('rejectionReason'));
                    if (reason !== null) { updateKycStatus(selectedKyc.id, "rejected", reason); closeDocModal(); }
                  }}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/70 font-semibold hover:border-red-500 hover:text-red-500 transition"
                >
                  {t('rejectKyc')}
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
              toast.type === "error" ? "bg-red-500" : toast.type === "warning" ? "bg-amber-500" : "bg-green-500"
            } text-white`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default KycPage;