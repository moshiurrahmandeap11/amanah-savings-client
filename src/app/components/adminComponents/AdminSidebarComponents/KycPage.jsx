"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Check,
  X,
  Ban,
  FileText,
  AlertTriangle,
} from "lucide-react";

const KycPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedKyc, setSelectedKyc] = useState(null);
  const [showDocModal, setShowDocModal] = useState(false);

  const filters = ["All", "NID Pending", "Selfie Mismatch", "Rejected"];

  const kycApplications = [
    {
      id: 1,
      name: "Nasrin Begum",
      phone: "+880 1677-XXX",
      avatar: "N",
      avatarBg: "from-primary to-primary-light",
      type: "New member",
      docs: [
        { name: "NID", status: "ok", color: "blue" },
        { name: "Selfie", status: "ok", color: "blue" },
      ],
      submitted: "2 hrs ago",
      nidStatus: "Matched",
      nidStatusColor: "ok",
      selfieMatch: "94% match",
      selfieMatchColor: "ok",
      risk: "Low (9)",
      riskColor: "primary",
    },
    {
      id: 2,
      name: "Rahim Khan",
      phone: "+880 1812-XXX",
      avatar: "R",
      avatarBg: "from-amber-500 to-orange-500",
      type: "Returning",
      docs: [
        { name: "NID", status: "ok", color: "blue" },
        { name: "Selfie", status: "warning", color: "amber" },
      ],
      submitted: "4 hrs ago",
      nidStatus: "Matched",
      nidStatusColor: "ok",
      selfieMatch: "61% match",
      selfieMatchColor: "warn",
      risk: "Med (55)",
      riskColor: "warning",
    },
    {
      id: 3,
      name: "MD Sohel",
      phone: "+880 1500-XXX",
      avatar: "M",
      avatarBg: "from-red-500 to-orange-500",
      type: "Flagged",
      docs: [
        { name: "NID", status: "warning", color: "red" },
        { name: "Selfie", status: "error", color: "red" },
      ],
      submitted: "1 day ago",
      nidStatus: "Mismatch",
      nidStatusColor: "danger",
      selfieMatch: "12% match",
      selfieMatchColor: "danger",
      risk: "High (88)",
      riskColor: "danger",
    },
  ];

  const getBadgeClass = (type, color) => {
    const classes = {
      ok: "bg-green-500/10 text-green-500",
      warn: "bg-amber-500/10 text-amber-500",
      info: "bg-blue-500/10 text-blue-500",
      danger: "bg-red-500/10 text-red-500",
      primary: "bg-primary/10 text-primary",
      warning: "bg-amber-500/10 text-amber-500",
      blue: "bg-blue-500/10 text-blue-500",
      amber: "bg-amber-500/10 text-amber-500",
      red: "bg-red-500/10 text-red-500",
    };
    return classes[color] || classes.ok;
  };

  const getDocStyle = (status, color) => {
    if (status === "ok") return "bg-blue-500/10 text-blue-500";
    if (status === "warning") return "bg-amber-500/10 text-amber-500";
    if (status === "error") return "bg-red-500/10 text-red-500";
    return "bg-blue-500/10 text-blue-500";
  };

  const filteredKyc = kycApplications.filter((kyc) => {
    const matchesSearch =
      kyc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      kyc.phone.includes(searchQuery);
    const matchesFilter =
      activeFilter === "All" ||
      (activeFilter === "NID Pending" && kyc.nidStatus === "Mismatch") ||
      (activeFilter === "Selfie Mismatch" && kyc.selfieMatchColor === "warn") ||
      kyc.selfieMatchColor === "danger" ||
      (activeFilter === "Rejected" && false);
    return matchesSearch && matchesFilter;
  });

  const showToastMessage = (message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const approveKyc = (kyc) => {
    showToastMessage(`✅ KYC approved for ${kyc.name}`, "success");
  };

  const rejectKyc = (kyc) => {
    showToastMessage(`❌ KYC rejected for ${kyc.name}`, "error");
  };

  const banUser = (kyc) => {
    if (confirm(`Ban user ${kyc.name} permanently?`)) {
      showToastMessage(`🚫 User ${kyc.name} banned permanently`, "error");
    }
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

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">
            🪪 KYC Review Queue
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-500">
            23 Pending
          </span>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background">
          <Search size={16} className="text-foreground/50" />
          <input
            type="text"
            placeholder="Search member..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition ${
                activeFilter === filter
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* KYC Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-225">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Applicant
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Documents
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Submitted
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  NID Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Selfie Match
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Risk
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredKyc.map((kyc) => (
                <tr
                  key={kyc.id}
                  className="border-b border-border last:border-0 hover:bg-primary/5 transition"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-full bg-linear-to-r ${kyc.avatarBg} flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {kyc.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-sm text-foreground">
                          {kyc.name}
                        </div>
                        <div className="text-xs text-foreground/50">
                          {kyc.phone} · {kyc.type}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1 flex-wrap">
                      {kyc.docs.map((doc, idx) => (
                        <span
                          key={idx}
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${getDocStyle(doc.status, doc.color)}`}
                        >
                          {doc.name}{" "}
                          {doc.status === "ok"
                            ? "✓"
                            : doc.status === "warning"
                              ? "⚠️"
                              : "✗"}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-foreground/50">
                    {kyc.submitted}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(kyc.nidStatus, kyc.nidStatusColor)}`}
                    >
                      {kyc.nidStatus === "Matched"
                        ? "✅ Matched"
                        : kyc.nidStatus === "Mismatch"
                          ? "❌ Mismatch"
                          : kyc.nidStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(kyc.selfieMatch, kyc.selfieMatchColor)}`}
                    >
                      {kyc.selfieMatch}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`text-xs font-bold ${kyc.riskColor === "danger" ? "text-red-500" : kyc.riskColor === "warning" ? "text-amber-500" : "text-primary"}`}
                    >
                      {kyc.risk}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => viewDocuments(kyc)}
                        className="px-3 py-1.5 rounded-lg border border-border text-xs font-semibold hover:border-primary transition"
                        title="View Documents"
                      >
                        📄 View Docs
                      </button>
                      {kyc.nidStatusColor !== "danger" &&
                      kyc.selfieMatchColor !== "danger" ? (
                        <>
                          <button
                            onClick={() => approveKyc(kyc)}
                            className="px-3 py-1.5 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                          >
                            ✓ Approve
                          </button>
                          <button
                            onClick={() => rejectKyc(kyc)}
                            className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition"
                          >
                            ✗ Reject
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => banUser(kyc)}
                          className="px-3 py-1.5 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition"
                        >
                          🚫 Ban
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Viewer Modal */}
      <AnimatePresence>
        {showDocModal && selectedKyc && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={closeDocModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-5 border-b border-border">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-foreground">
                    Document Viewer
                  </h3>
                  <button
                    onClick={closeDocModal}
                    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                  >
                    ✕
                  </button>
                </div>
                <p className="text-sm text-foreground/60 mt-1">
                  {selectedKyc.name}
                </p>
              </div>
              <div className="p-5 space-y-4">
                <div className="bg-background rounded-xl p-4 text-center border border-border">
                  <div className="text-5xl mb-2">🪪</div>
                  <div className="font-semibold text-foreground">NID Card</div>
                  <div className="text-xs text-foreground/50 mt-1">
                    Front & Back
                  </div>
                  <div className="mt-3 p-3 bg-card rounded-lg border border-border">
                    <div className="h-32 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center text-foreground/50">
                      <FileText size={32} />
                    </div>
                  </div>
                </div>
                <div className="bg-background rounded-xl p-4 text-center border border-border">
                  <div className="text-5xl mb-2">🤳</div>
                  <div className="font-semibold text-foreground">
                    Selfie Photo
                  </div>
                  <div className="text-xs text-foreground/50 mt-1">
                    Live capture
                  </div>
                  <div className="mt-3 p-3 bg-card rounded-lg border border-border">
                    <div className="h-32 bg-linear-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg flex items-center justify-center text-foreground/50">
                      <FileText size={32} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-5 border-t border-border flex gap-3">
                <button
                  onClick={() => {
                    approveKyc(selectedKyc);
                    closeDocModal();
                  }}
                  className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold"
                >
                  ✓ Approve KYC
                </button>
                <button
                  onClick={() => {
                    rejectKyc(selectedKyc);
                    closeDocModal();
                  }}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/70 font-semibold hover:border-red-500 hover:text-red-500 transition"
                >
                  ✗ Reject
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

export default KycPage;
