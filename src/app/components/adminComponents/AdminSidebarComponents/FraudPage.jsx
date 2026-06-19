"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Download } from "lucide-react";
import * as XLSX from "xlsx";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

// Translations
const translations = {
  en: {
    fraudAlerts: "🚨 Fraud Alerts & Security",
    highRisk: "High Risk",
    mediumRisk: "Medium Risk",
    exportExcel: "Export Excel",
    exportJSON: "Export JSON",
    exporting: "Exporting...",
    allFraudAlerts: "All Fraud Alerts",
    totalAlerts: "Total",
    noAlerts: "No fraud alerts found",
    alertType: "Alert Type",
    user: "User",
    details: "Details",
    riskScore: "Risk Score",
    time: "Time",
    status: "Status",
    actions: "Actions",
    detailsBtn: "Details",
    ban: "🚫 Ban",
    lockAccount: "Lock Account",
    unlock: "Unlock",
    banUser: "Ban User?",
    suspendAccount: "Suspend Account?",
    unlockAccount: "Unlock Account?",
    reasonForBan: "Reason for ban",
    reasonForSuspension: "Reason for suspension",
    provideReason: "Please provide a reason",
    yesBan: "Yes, Ban User",
    yesSuspend: "Yes, Suspend",
    yesUnlock: "Yes, Unlock",
    banSuccess: "User banned permanently",
    suspendSuccess: "Account suspended — user notified",
    unlockSuccess: "Account unlocked — user can now login",
    failedToLoad: "Failed to load fraud alerts",
    exportSuccess: "Exported alerts successfully!",
    jsonExportSuccess: "JSON report downloaded successfully!",
    exportFailed: "Failed to export report",
  },
  bn: {
    fraudAlerts: "🚨 ফ্রড অ্যালার্ট ও সিকিউরিটি",
    highRisk: "হাই রিস্ক",
    mediumRisk: "মিডিয়াম রিস্ক",
    exportExcel: "এক্সেল এক্সপোর্ট",
    exportJSON: "JSON এক্সপোর্ট",
    exporting: "এক্সপোর্ট হচ্ছে...",
    allFraudAlerts: "সব ফ্রড অ্যালার্ট",
    totalAlerts: "মোট",
    noAlerts: "কোনো ফ্রড অ্যালার্ট পাওয়া যায়নি",
    alertType: "অ্যালার্ট টাইপ",
    user: "ইউজার",
    details: "বিস্তারিত",
    riskScore: "রিস্ক স্কোর",
    time: "সময়",
    status: "স্ট্যাটাস",
    actions: "অ্যাকশন",
    detailsBtn: "বিস্তারিত",
    ban: "🚫 ব্যান",
    lockAccount: "অ্যাকাউন্ট লক",
    unlock: "আনলক",
    banUser: "ইউজার ব্যান করবেন?",
    suspendAccount: "অ্যাকাউন্ট সাসপেন্ড করবেন?",
    unlockAccount: "অ্যাকাউন্ট আনলক করবেন?",
    reasonForBan: "ব্যানের কারণ",
    reasonForSuspension: "সাসপেন্ডের কারণ",
    provideReason: "কারণ দিন",
    yesBan: "হ্যাঁ, ব্যান করুন",
    yesSuspend: "হ্যাঁ, সাসপেন্ড করুন",
    yesUnlock: "হ্যাঁ, আনলক করুন",
    banSuccess: "ইউজার স্থায়ীভাবে ব্যান হয়েছে",
    suspendSuccess: "অ্যাকাউন্ট সাসপেন্ড হয়েছে — ইউজারকে জানানো হয়েছে",
    unlockSuccess: "অ্যাকাউন্ট আনলক হয়েছে — এখন লগইন করতে পারবেন",
    failedToLoad: "ফ্রড অ্যালার্ট লোড করতে ব্যর্থ হয়েছে",
    exportSuccess: "অ্যালার্ট সফলভাবে এক্সপোর্ট হয়েছে!",
    jsonExportSuccess: "JSON রিপোর্ট ডাউনলোড হয়েছে!",
    exportFailed: "রিপোর্ট এক্সপোর্ট করতে ব্যর্থ হয়েছে",
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const FraudPage = () => {
  const [toast, setToast] = useState({ show: false, message: "" });
  const [stats, setStats] = useState([]);
  const [fraudAlerts, setFraudAlerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [lang, setLang] = useState("bn");

  // Load language preference
  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "bn";
    setLang(savedLang);
  }, []);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const fetchAlerts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/fraud/alerts", { headers: getAuthHeaders() });
      if (res.data.success) {
        const data = res.data.data;
        let statsArray = [];
        if (data.stats) {
          if (Array.isArray(data.stats)) {
            statsArray = data.stats;
          } else {
            statsArray = [
              { icon: "🚨", value: data.stats.highRisk || 0, label: t('highRisk') + " Alerts", trend: "Critical", trendUp: false, iconBg: "bg-red-500/10" },
              { icon: "⚠️", value: data.stats.mediumRisk || 0, label: t('mediumRisk') + " Alerts", trend: "Warning", trendUp: false, iconBg: "bg-amber-500/10" },
              { icon: "🔒", value: data.stats.suspended || 0, label: "Suspended Accounts", trend: "Action Needed", trendUp: false, iconBg: "bg-yellow-500/10" },
              { icon: "🚫", value: data.stats.banned || 0, label: "Banned Accounts", trend: "Permanent", trendUp: false, iconBg: "bg-red-500/10" },
            ];
          }
        }
        setStats(statsArray);
        setFraudAlerts(Array.isArray(data.alerts) ? data.alerts : []);
      }
    } catch (err) {
      console.error("Fetch alerts error:", err);
      showToast(t('failedToLoad'));
      setStats(getFallbackStats());
    } finally {
      setLoading(false);
    }
  }, [lang]);

  const getFallbackStats = () => [
    { icon: "🚨", value: "0", label: t('highRisk') + " Alerts", trend: "Critical", trendUp: false, iconBg: "bg-red-500/10" },
    { icon: "⚠️", value: "0", label: t('mediumRisk') + " Alerts", trend: "Warning", trendUp: false, iconBg: "bg-amber-500/10" },
    { icon: "🔒", value: "0", label: "Suspended Accounts", trend: "Action Needed", trendUp: false, iconBg: "bg-yellow-500/10" },
    { icon: "🚫", value: "0", label: "Banned Accounts", trend: "Permanent", trendUp: false, iconBg: "bg-red-500/10" },
  ];

  useEffect(() => {
    fetchAlerts();
  }, [fetchAlerts]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const exportToExcel = async () => {
    setExporting(true);
    try {
      const res = await axiosInstance.get("/admin/fraud/alerts", { headers: getAuthHeaders() });
      
      if (res.data.success) {
        const data = res.data.data;
        const alerts = Array.isArray(data.alerts) ? data.alerts : [];
        const statsData = data.stats || {};
        
        const summaryData = [
          { "Report Type": "Fraud & Security Report", "Value": "Sonchoy Bondhu" },
          { "Report Generated": new Date().toLocaleString(), "Value": "" },
          { "Total Alerts": alerts.length, "Value": "" },
          { "High Risk Alerts": statsData.highRisk || 0, "Value": "" },
          { "Medium Risk Alerts": statsData.mediumRisk || 0, "Value": "" },
          { "Low Risk Alerts": statsData.lowRisk || 0, "Value": "" },
          { "Active Alerts": statsData.active || 0, "Value": "" },
          { "Resolved Alerts": statsData.resolved || 0, "Value": "" },
          { "Suspended Accounts": statsData.suspended || 0, "Value": "" },
          { "Banned Accounts": statsData.banned || 0, "Value": "" },
        ];
        
        const alertsData = alerts.map((alert, index) => ({
          "SL No": index + 1,
          "Alert Type": alert.type || "Unknown",
          "Severity": alert.severity === "danger" || alert.severity === "high" ? "High" : 
                       alert.severity === "warn" || alert.severity === "medium" ? "Medium" : "Low",
          "User Name": alert.userName || alert.user || "Unknown",
          "User ID": alert.userId || "N/A",
          "Description": alert.description || alert.details || "No details",
          "Risk Score": `${alert.riskScore || 0}/100`,
          "Status": alert.status || "Active",
          "IP Address": alert.ip || alert.ips?.join(", ") || "N/A",
          "Time": alert.time || (alert.createdAt ? new Date(alert.createdAt).toLocaleString() : "N/A"),
        }));
        
        const summarySheet = XLSX.utils.json_to_sheet(summaryData);
        summarySheet["!cols"] = [{ wch: 25 }, { wch: 30 }];
        
        const range = XLSX.utils.decode_range(summarySheet["!ref"]);
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const address = XLSX.utils.encode_col(C) + "1";
          if (summarySheet[address]) {
            summarySheet[address].s = {
              font: { bold: true, sz: 12, color: { rgb: "FFFFFF" } },
              fill: { fgColor: { rgb: "059669" }, patternType: "solid" }
            };
          }
        }
        
        const alertsSheet = XLSX.utils.json_to_sheet(alertsData);
        alertsSheet["!cols"] = [
          { wch: 8 }, { wch: 20 }, { wch: 10 }, { wch: 25 },
          { wch: 15 }, { wch: 45 }, { wch: 12 }, { wch: 12 },
          { wch: 20 }, { wch: 20 }
        ];
        
        const alertsRange = XLSX.utils.decode_range(alertsSheet["!ref"]);
        for (let C = alertsRange.s.c; C <= alertsRange.e.c; ++C) {
          const address = XLSX.utils.encode_col(C) + "1";
          if (alertsSheet[address]) {
            alertsSheet[address].s = {
              font: { bold: true, sz: 11, color: { rgb: "FFFFFF" } },
              fill: { fgColor: { rgb: "DC2626" }, patternType: "solid" }
            };
          }
        }
        
        alertsData.forEach((_, rowIndex) => {
          const rowNum = rowIndex + 2;
          const severityCell = XLSX.utils.encode_cell({ c: 2, r: rowNum - 1 });
          if (alertsSheet[severityCell]) {
            const severity = alertsData[rowIndex]["Severity"];
            if (severity === "High") {
              alertsSheet[severityCell].s = { fill: { fgColor: { rgb: "FEE2E2" } }, font: { color: { rgb: "DC2626" }, bold: true } };
            } else if (severity === "Medium") {
              alertsSheet[severityCell].s = { fill: { fgColor: { rgb: "FEF3C7" } }, font: { color: { rgb: "D97706" }, bold: true } };
            } else {
              alertsSheet[severityCell].s = { fill: { fgColor: { rgb: "DBEAFE" } }, font: { color: { rgb: "2563EB" }, bold: true } };
            }
          }
        });
        
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, summarySheet, "Summary");
        XLSX.utils.book_append_sheet(workbook, alertsSheet, "Fraud Alerts");
        
        const statsDataForSheet = [
          ["Risk Level", "Count", "Percentage"],
          ["High Risk", statsData.highRisk || 0, `${((statsData.highRisk || 0) / Math.max(alerts.length, 1) * 100).toFixed(1)}%`],
          ["Medium Risk", statsData.mediumRisk || 0, `${((statsData.mediumRisk || 0) / Math.max(alerts.length, 1) * 100).toFixed(1)}%`],
          ["Low Risk", statsData.lowRisk || 0, `${((statsData.lowRisk || 0) / Math.max(alerts.length, 1) * 100).toFixed(1)}%`],
          ["", "", ""],
          ["Status", "Count", "Percentage"],
          ["Active", statsData.active || 0, `${((statsData.active || 0) / Math.max(alerts.length, 1) * 100).toFixed(1)}%`],
          ["Resolved", statsData.resolved || 0, `${((statsData.resolved || 0) / Math.max(alerts.length, 1) * 100).toFixed(1)}%`],
        ];
        
        const statsSheet = XLSX.utils.aoa_to_sheet(statsDataForSheet);
        statsSheet["!cols"] = [{ wch: 15 }, { wch: 12 }, { wch: 12 }];
        XLSX.utils.book_append_sheet(workbook, statsSheet, "Statistics");
        
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
        
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `fraud-report-${new Date().toISOString().split("T")[0]}.xlsx`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showToast(t('exportSuccess'));
      }
    } catch (error) {
      console.error("Export error:", error);
      showToast(t('exportFailed'));
    } finally {
      setExporting(false);
    }
  };

  const exportToJSON = async () => {
    setExporting(true);
    try {
      const res = await axiosInstance.get("/admin/fraud/alerts", { headers: getAuthHeaders() });
      
      if (res.data.success) {
        const exportData = {
          exportDate: new Date().toISOString(),
          reportType: "Fraud & Security Report",
          summary: res.data.data.stats,
          alerts: res.data.data.alerts,
        };
        
        const dataStr = JSON.stringify(exportData, null, 2);
        const blob = new Blob([dataStr], { type: "application/json" });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.href = url;
        link.download = `fraud-report-${new Date().toISOString().split("T")[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        showToast(t('jsonExportSuccess'));
      }
    } catch (error) {
      console.error("JSON Export error:", error);
      showToast(t('exportFailed'));
    } finally {
      setExporting(false);
    }
  };

  const handleBan = async (userId, userName) => {
    const result = await Swal.fire({
      title: t('banUser'),
      html: `
        <div class="text-left">
          <p>আপনি কি নিশ্চিত <strong>${userName || "এই ইউজারকে"}</strong> স্থায়ীভাবে ব্যান করতে চান?</p>
          <div class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">${t('reasonForBan')}:</label>
            <input type="text" id="banReason" class="swal2-input w-full" placeholder="${t('provideReason')}...">
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t('yesBan'),
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const reason = document.getElementById("banReason").value;
        if (!reason) {
          Swal.showValidationMessage(t('provideReason'));
        }
        return { reason };
      }
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.patch(
          `/admin/users/${userId}/status`,
          { isBanned: true, banReason: result.value.reason },
          { headers: getAuthHeaders() }
        );
        if (res.data.success) {
          showToast(`${t('banSuccess')} — ${userName}`);
          fetchAlerts();
        }
      } catch (err) {
        showToast(err.response?.data?.message || "Ban failed");
      }
    }
  };

  const handleSuspend = async (userId, userName) => {
    const result = await Swal.fire({
      title: t('suspendAccount'),
      html: `
        <div class="text-left">
          <p>আপনি কি <strong>${userName || "এই ইউজারের"}</strong> অ্যাকাউন্ট সাসপেন্ড করতে চান?</p>
          <div class="mt-3">
            <label class="block text-sm font-medium text-gray-700 mb-1">${t('reasonForSuspension')}:</label>
            <input type="text" id="suspendReason" class="swal2-input w-full" placeholder="${t('provideReason')}...">
          </div>
        </div>
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t('yesSuspend'),
      cancelButtonText: "Cancel",
      preConfirm: () => {
        const reason = document.getElementById("suspendReason").value;
        if (!reason) {
          Swal.showValidationMessage(t('provideReason'));
        }
        return { reason };
      }
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.patch(
          `/admin/users/${userId}/status`,
          { isSuspended: true, suspensionReason: result.value.reason },
          { headers: getAuthHeaders() }
        );
        if (res.data.success) {
          showToast(t('suspendSuccess'));
          fetchAlerts();
        }
      } catch (err) {
        showToast(err.response?.data?.message || "Suspend failed");
      }
    }
  };

  const handleUnlock = async (userId, userName) => {
    const result = await Swal.fire({
      title: t('unlockAccount'),
      text: `আপনি কি ${userName || "এই ইউজারের"} অ্যাকাউন্ট আনলক করতে চান?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#059669",
      cancelButtonColor: "#6c757d",
      confirmButtonText: t('yesUnlock'),
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.patch(
          `/admin/users/${userId}/status`,
          { isSuspended: false, isBanned: false },
          { headers: getAuthHeaders() }
        );
        if (res.data.success) {
          showToast(t('unlockSuccess'));
          fetchAlerts();
        }
      } catch (err) {
        showToast(err.response?.data?.message || "Unlock failed");
      }
    }
  };

  const handleDetails = (alert) => {
    Swal.fire({
      title: t('details'),
      html: `
        <div class="text-left">
          <p><strong>${t('alertType')}:</strong> ${alert.type || "N/A"}</p>
          <p><strong>Severity:</strong> ${alert.severity || "N/A"}</p>
          <p><strong>${t('user')}:</strong> ${alert.user || alert.userName || "Unknown"}</p>
          <p><strong>User ID:</strong> ${alert.userId || "N/A"}</p>
          <p><strong>${t('details')}:</strong> ${alert.details || alert.description || "No details"}</p>
          <p><strong>${t('riskScore')}:</strong> ${alert.riskScore || "N/A"}/100</p>
          <p><strong>${t('time')}:</strong> ${alert.time || new Date(alert.createdAt).toLocaleString()}</p>
        </div>
      `,
      icon: "info",
      confirmButtonColor: "#059669",
      confirmButtonText: "Close",
    });
  };

  const getSeverityBadge = (severity) => {
    switch (severity) {
      case "danger":
      case "high":
        return "bg-red-500/15 text-red-500";
      case "warn":
      case "medium":
        return "bg-amber-500/15 text-amber-500";
      case "info":
      case "low":
        return "bg-blue-500/15 text-blue-500";
      default:
        return "bg-gray-500/15 text-gray-500";
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return "bg-red-500/15 text-red-500";
      case "resolved":
        return "bg-green-500/15 text-green-500";
      case "investigating":
        return "bg-amber-500/15 text-amber-500";
      default:
        return "bg-gray-500/15 text-gray-500";
    }
  };

  const getRiskColor = (riskScore) => {
    if (riskScore >= 70) return "text-red-500";
    if (riskScore >= 40) return "text-amber-500";
    return "text-blue-500";
  };

  const highRisk = fraudAlerts.filter(a => a.severity === "danger" || a.severity === "high").length;
  const mediumRisk = fraudAlerts.filter(a => a.severity === "warn" || a.severity === "medium").length;

  const displayStats = Array.isArray(stats) && stats.length > 0 ? stats : getFallbackStats();

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-foreground">
            {t('fraudAlerts')}
          </h2>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-red-500/20 text-red-400">
            {highRisk} {t('highRisk')} · {mediumRisk} {t('mediumRisk')}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={exportToExcel}
            disabled={exporting}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            {exporting ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                {t('exporting')}
              </>
            ) : (
              <>
                <Download size={16} />
                {t('exportExcel')}
              </>
            )}
          </button>
          <button
            onClick={exportToJSON}
            disabled={exporting}
            className="px-4 py-2 rounded-lg border border-border bg-card text-foreground/70 text-sm font-semibold hover:border-primary transition disabled:opacity-50"
          >
            {t('exportJSON')}
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {displayStats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-4"
          >
            <div className="flex justify-between items-start">
              <div
                className={`w-10 h-10 rounded-xl ${stat.iconBg || "bg-primary/10"} flex items-center justify-center text-xl`}
              >
                {stat.icon}
              </div>
              {stat.trend && (
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    stat.trend === "Critical" ? "bg-red-500/10 text-red-500" :
                    stat.trend === "Warning" ? "bg-amber-500/10 text-amber-500" :
                    stat.trend === "Action Needed" ? "bg-yellow-500/10 text-yellow-500" :
                    "bg-gray-500/10 text-gray-500"
                  }`}
                >
                  {stat.trend}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">
              {stat.value}
            </div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      {/* Fraud Alerts Table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div className="font-bold text-foreground">{t('allFraudAlerts')}</div>
          <div className="text-xs text-foreground/50">
            {t('totalAlerts')}: {fraudAlerts.length} alerts
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-border bg-background">
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('alertType')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('user')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('details')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('riskScore')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('time')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('status')}
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">
                  {t('actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {fraudAlerts.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-foreground/50">
                    {t('noAlerts')}
                  </td>
                </tr>
              ) : (
                fraudAlerts.map((alert, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border last:border-0 hover:bg-primary/5 transition"
                  >
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getSeverityBadge(alert.severity)}`}
                      >
                        {alert.icon || "🚨"} {alert.type || "Alert"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-sm text-foreground">
                        {alert.userName || alert.user || "Unknown"}
                      </div>
                      <div className="text-xs text-foreground/50">
                        ID: {alert.userId || "N/A"}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground/70">
                      {alert.description || alert.details || "No details"}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-sm font-bold ${getRiskColor(alert.riskScore)}`}
                      >
                        {alert.riskScore || 0} / 100
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-foreground/50">
                      {alert.time || (alert.createdAt ? new Date(alert.createdAt).toLocaleString() : "N/A")}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`text-xs font-semibold px-2 py-1 rounded-full ${getStatusBadge(alert.status)}`}
                      >
                        {alert.status || "Active"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 flex-wrap">
                        <button
                          onClick={() => handleDetails(alert)}
                          className="px-3 py-1 rounded-lg border border-border text-xs font-semibold hover:border-primary transition"
                        >
                          {t('detailsBtn')}
                        </button>
                        {(alert.severity === "danger" || alert.severity === "high") && alert.userId && (
                          <button
                            onClick={() => handleBan(alert.userId, alert.userName || alert.user)}
                            className="px-3 py-1 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition"
                          >
                            {t('ban')}
                          </button>
                        )}
                        {(alert.severity === "warn" || alert.severity === "medium") && alert.type?.toLowerCase().includes("login") && (
                          <button
                            onClick={() => handleSuspend(alert.userId, alert.userName || alert.user)}
                            className="px-3 py-1 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                          >
                            {t('lockAccount')}
                          </button>
                        )}
                        {(alert.severity === "info" || alert.severity === "low") && (
                          <button
                            onClick={() => handleUnlock(alert.userId, alert.userName || alert.user)}
                            className="px-3 py-1 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                          >
                            {t('unlock')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FraudPage;