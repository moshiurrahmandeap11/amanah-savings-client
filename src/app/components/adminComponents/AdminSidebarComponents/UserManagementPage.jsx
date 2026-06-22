"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Download,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  Ban,
  Loader2,
  Save,
  Activity,
  Target,
  Wallet,
  ArrowDownLeft,
  ArrowUpRight,
  Repeat,
  Users,
  LogIn,
  X,
  ChevronRight,
  TrendingUp,
  CircleDollarSign,
  ShieldCheck,
  Clock,
  AlertCircle,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Award,
  Crown,
  User,
} from "lucide-react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    userManagement: "👥 User Management",
    searchPlaceholder: "Search by name, phone, NID...",
    all: "All",
    active: "Active",
    pendingKyc: "Pending KYC",
    flagged: "Flagged",
    suspended: "Suspended",
    member: "Member",
    phone: "Phone",
    plan: "Plan",
    totalSaved: "Total Saved",
    kyc: "KYC",
    status: "Status",
    joined: "Joined",
    actions: "Actions",
    noUsersFound: "No users found",
    exportExcel: "Export Excel",
    exporting: "Exporting...",
    exportedSuccessfully: "✅ Exported users successfully!",
    exportFailed: "❌ Failed to export users",
    view: "View",
    approveKyc: "Approve KYC",
    suspend: "Suspend",
    ban: "Ban",
    message: "Message",
    accountOverview: "Account Overview",
    totalSavings: "Total Savings",
    totalDeposits: "Total Deposits",
    totalWithdrawals: "Total Withdrawals",
    level: "Level",
    memberSince: "Member Since",
    lastLogin: "Last Login",
    division: "Division",
    referralCode: "Referral Code",
    suspendConfirm: "Suspend user",
    banConfirm: "Ban user permanently?",
    kycApproved: "KYC approved successfully",
    actionFailed: "Action failed",
    details: "Details",
    userDetails: "User Details",
    close: "Close",
    goals: "Goals",
    deposits: "Deposits",
    withdrawals: "Withdrawals",
    transactions: "Transactions",
    circles: "Circles",
    loginHistory: "Login History",
    overview: "Overview",
    noData: "No data found",
    amount: "Amount",
    method: "Method",
    date: "Date",
    goalName: "Goal Name",
    targetAmount: "Target",
    currentAmount: "Saved",
    progress: "Progress",
    goalType: "Type",
    circleName: "Circle Name",
    purpose: "Purpose",
    circleType: "Type",
    members: "Members",
    role: "Role",
    ip: "IP",
    device: "Device",
    location: "Location",
    success: "Success",
    failed: "Failed",
    transferType: "Type",
    from: "From",
    to: "To",
    note: "Note",
    admin: "Admin",
    memberRole: "Member",
    loadingDetails: "Loading details...",
    personalInfo: "Personal Info",
    fullName: "Full Name",
    email: "Email",
    dob: "Date of Birth",
    gender: "Gender",
    occupation: "Occupation",
    income: "Income",
    address: "Address",
    district: "District",
    upazila: "Upazila",
    village: "Village",
    postOffice: "Post Office",
    postCode: "Post Code",
    recentActivity: "Recent Activity",
  },
  bn: {
    userManagement: "👥 ইউজার ম্যানেজমেন্ট",
    searchPlaceholder: "নাম, ফোন, এনআইডি দিয়ে খুঁজুন...",
    all: "সব",
    active: "সক্রিয়",
    pendingKyc: "পেন্ডিং কেওয়াইসি",
    flagged: "ফ্ল্যাগড",
    suspended: "সাসপেন্ডেড",
    member: "মেম্বার",
    phone: "ফোন",
    plan: "প্ল্যান",
    totalSaved: "মোট সঞ্চয়",
    kyc: "কেওয়াইসি",
    status: "স্ট্যাটাস",
    joined: "জয়েন",
    actions: "অ্যাকশন",
    noUsersFound: "কোনো ইউজার পাওয়া যায়নি",
    exportExcel: "এক্সেল এক্সপোর্ট",
    exporting: "এক্সপোর্ট হচ্ছে...",
    exportedSuccessfully: "✅ ইউজার এক্সপোর্ট সফল হয়েছে!",
    exportFailed: "❌ এক্সপোর্ট ব্যর্থ হয়েছে",
    view: "দেখুন",
    approveKyc: "কেওয়াইসি অনুমোদন",
    suspend: "সাসপেন্ড",
    ban: "ব্যান",
    message: "মেসেজ",
    accountOverview: "অ্যাকাউন্ট ওভারভিউ",
    totalSavings: "মোট সঞ্চয়",
    totalDeposits: "মোট ডিপোজিট",
    totalWithdrawals: "মোট উত্তোলন",
    level: "লেভেল",
    memberSince: "মেম্বার সাইন আপ",
    lastLogin: "শেষ লগইন",
    division: "বিভাগ",
    referralCode: "রেফারেল কোড",
    suspendConfirm: "ইউজার সাসপেন্ড করবেন?",
    banConfirm: "ইউজারকে স্থায়ীভাবে ব্যান করবেন?",
    kycApproved: "কেওয়াইসি অনুমোদিত হয়েছে",
    actionFailed: "অ্যাকশন ব্যর্থ হয়েছে",
    details: "বিস্তারিত",
    userDetails: "ইউজার বিবরণ",
    close: "বন্ধ",
    goals: "গোলস",
    deposits: "ডিপোজিটস",
    withdrawals: "উত্তোলন",
    transactions: "লেনদেন",
    circles: "সার্কেলস",
    loginHistory: "লগইন ইতিহাস",
    overview: "ওভারভিউ",
    noData: "কোনো ডেটা পাওয়া যায়নি",
    amount: "পরিমাণ",
    method: "পদ্ধতি",
    date: "তারিখ",
    goalName: "গোলের নাম",
    targetAmount: "লক্ষ্য",
    currentAmount: "সঞ্চিত",
    progress: "অগ্রগতি",
    goalType: "ধরন",
    circleName: "সার্কেলের নাম",
    purpose: "উদ্দেশ্য",
    circleType: "ধরন",
    members: "সদস্য",
    role: "ভূমিকা",
    ip: "আইপি",
    device: "ডিভাইস",
    location: "অবস্থান",
    success: "সফল",
    failed: "ব্যর্থ",
    transferType: "ধরন",
    from: "থেকে",
    to: "প্রতি",
    note: "নোট",
    admin: "অ্যাডমিন",
    memberRole: "সদস্য",
    loadingDetails: "বিস্তারিত লোড হচ্ছে...",
    personalInfo: "ব্যক্তিগত তথ্য",
    fullName: "পূর্ণ নাম",
    email: "ইমেইল",
    dob: "জন্ম তারিখ",
    gender: "লিঙ্গ",
    occupation: "পেশা",
    income: "আয়",
    address: "ঠিকানা",
    district: "জেলা",
    upazila: "উপজেলা",
    village: "গ্রাম",
    postOffice: "পোস্ট অফিস",
    postCode: "পোস্ট কোড",
    recentActivity: "সাম্প্রতিক কার্যক্রম",
  }
};

const UserManagementPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    dob: "",
    gender: "",
    occupation: "",
    income: "",
    division: "",
    district: "",
    upazila: "",
    village: "",
    postOffice: "",
    postCode: "",
  });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });
  const [lang, setLang] = useState("bn");
  const initialLoadDone = useRef(false);

  // Details modal state
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [detailsUser, setDetailsUser] = useState(null);
  const [detailsData, setDetailsData] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsTab, setDetailsTab] = useState("overview");

  // Load language preference once
  useEffect(() => {
    const savedLang = localStorage.getItem("admin_lang") || "bn";
    setLang(savedLang);
  }, []);

  const t = useCallback((key) => translations[lang]?.[key] || translations.en[key] || key, [lang]);

  const filters = ["All", "Active", "Pending KYC", "Flagged", "Suspended"];

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const formatCurrency = (amount) => {
    if (amount == null) return "৳0";
    return `৳${Number(amount).toLocaleString("en-BD")}`;
  };

  const formatDateInput = (date) => {
    if (!date) return "";
    return String(date).split("T")[0];
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const formatDateTime = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const showToastMessage = useCallback((message, type = "success") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  }, []);

  const searchQueryRef = useRef(searchQuery);
  const activeFilterRef = useRef(activeFilter);

  useEffect(() => { searchQueryRef.current = searchQuery; }, [searchQuery]);
  useEffect(() => { activeFilterRef.current = activeFilter; }, [activeFilter]);

  const fetchUsers = useCallback(async (page = 1, filterOverride, searchOverride) => {
    setLoading(true);
    try {
      const currentFilter = filterOverride !== undefined ? filterOverride : activeFilterRef.current;
      const currentSearch = searchOverride !== undefined ? searchOverride : searchQueryRef.current;

      let status = "";
      let kycStatus = "";
      if (currentFilter === "Active") status = "active";
      else if (currentFilter === "Suspended") status = "suspended";
      else if (currentFilter === "Flagged") status = "banned";
      else if (currentFilter === "Pending KYC") kycStatus = "pending";

      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", 20);
      if (currentSearch) params.append("search", currentSearch);
      if (status) params.append("status", status);
      if (kycStatus) params.append("kycStatus", kycStatus);

      const res = await axiosInstance.get(`/admin/users?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (res.data.success) {
        setUsers(res.data.data.users);
        setPagination(res.data.data.pagination);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || "Action failed", "error");
    } finally {
      setLoading(false);
    }
  }, [showToastMessage]);

  // Initial load only
  useEffect(() => {
    fetchUsers(1);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateUserStatus = async (userId, updates) => {
    try {
      const res = await axiosInstance.patch(
        `/admin/users/${userId}/status`,
        updates,
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToastMessage(res.data.message, "success");
        fetchUsers(pagination.currentPage);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || t('actionFailed'), "error");
    }
  };

  const approveKyc = async (userId) => {
    try {
      const res = await axiosInstance.patch(
        `/admin/users/${userId}/kyc`,
        { status: "approved" },
        { headers: getAuthHeaders() }
      );
      if (res.data.success) {
        showToastMessage(t('kycApproved'), "success");
        fetchUsers(pagination.currentPage);
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || t('actionFailed'), "error");
    }
  };

  const openUserModal = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeUserModal = () => {
    setShowUserModal(false);
    setSelectedUser(null);
    document.body.style.overflow = "auto";
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditForm({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      phone: user.phone || "",
      email: user.email || "",
      dob: formatDateInput(user.dob),
      gender: user.gender || "",
      occupation: user.occupation || "",
      income: user.income || "",
      division: user.division || "",
      district: user.district || "",
      upazila: user.upazila || "",
      village: user.village || "",
      postOffice: user.postOffice || "",
      postCode: user.postCode || "",
    });
    setShowEditModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setEditingUser(null);
    setSavingEdit(false);
    document.body.style.overflow = "auto";
  };

  const handleEditFormChange = (field, value) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  const submitEditForm = async (e) => {
    e.preventDefault();
    if (!editingUser) return;

    setSavingEdit(true);
    try {
      const payload = {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        phone: editForm.phone,
        email: editForm.email,
        dob: editForm.dob,
        gender: editForm.gender,
        occupation: editForm.occupation,
        income: editForm.income,
        division: editForm.division,
        district: editForm.district,
        upazila: editForm.upazila,
        village: editForm.village,
        postOffice: editForm.postOffice,
        postCode: editForm.postCode,
      };

      const res = await axiosInstance.patch(
        `/admin/users/${editingUser.id}/personal-info`,
        payload,
        { headers: getAuthHeaders() }
      );

      if (res.data.success) {
        const updatedUser = res.data.data?.user || {
          ...editingUser,
          ...payload,
          fullName: `${payload.firstName || ""} ${payload.lastName || ""}`.trim(),
        };

        setUsers((prev) =>
          prev.map((user) => (user.id === editingUser.id ? { ...user, ...updatedUser } : user))
        );
        if (selectedUser?.id === editingUser.id) {
          setSelectedUser((prev) => ({ ...prev, ...updatedUser }));
        }
        showToastMessage(res.data.message || "User updated successfully", "success");
        closeEditModal();
      }
    } catch (err) {
      showToastMessage(err.response?.data?.message || t('actionFailed'), "error");
    } finally {
      setSavingEdit(false);
    }
  };

  const handleAction = (action, user) => {
    if (action === "suspend") {
      if (confirm(`${t('suspendConfirm')} ${user.fullName || user.firstName}?`)) {
        updateUserStatus(user.id, { isSuspended: true });
      }
    } else if (action === "ban") {
      if (confirm(`${t('banConfirm')} ${user.fullName || user.firstName}?`)) {
        updateUserStatus(user.id, { isBanned: true });
      }
    } else if (action === "approveKYC") {
      approveKyc(user.id);
    }
  };

  // ==================== DETAILS MODAL FUNCTIONS ====================
  const openDetailsModal = async (user) => {
    setDetailsUser(user);
    setShowDetailsModal(true);
    setDetailsLoading(true);
    setDetailsTab("overview");
    document.body.style.overflow = "hidden";

    try {
      const userId = user?.id || user?._id;
      if (!userId) {
        showToastMessage("Invalid user ID", "error");
        setDetailsLoading(false);
        return;
      }
      
      const res = await axiosInstance.get(`/admin/users/${userId}`, {
        headers: getAuthHeaders(),
      });
      if (res.data.success) {
        setDetailsData(res.data.data);
      } else {
        showToastMessage(res.data.message || "Failed to load user details", "error");
      }
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || "Failed to load user details";
      showToastMessage(`Error ${status ? `(${status})` : ""}: ${message}`, "error");
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setDetailsUser(null);
    setDetailsData(null);
    setDetailsTab("overview");
    document.body.style.overflow = "auto";
  };

  const exportToExcel = async () => {
    setExporting(true);
    try {
      let status = "";
      let kycStatus = "";
      if (activeFilter === "Active") status = "active";
      else if (activeFilter === "Suspended") status = "suspended";
      else if (activeFilter === "Flagged") status = "banned";
      else if (activeFilter === "Pending KYC") kycStatus = "pending";

      const params = new URLSearchParams();
      params.append("page", 1);
      params.append("limit", 999999);
      if (searchQuery) params.append("search", searchQuery);
      if (status) params.append("status", status);
      if (kycStatus) params.append("kycStatus", kycStatus);
      params.append("export", "true");

      const res = await axiosInstance.get(`/admin/users?${params.toString()}`, {
        headers: getAuthHeaders(),
      });

      if (res.data.success) {
        const allUsers = res.data.data.users;

        const excelData = allUsers.map((user, index) => ({
          "SL No": index + 1,
          "Full Name": user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim(),
          "Phone": user.phone,
          "Email": user.email || "N/A",
          "Plan": user.selectedPlan || "Bronze",
          "Total Saved (৳)": user.totalSaved || 0,
          "KYC Status": user.kycStatus === "approved" ? "Approved" : user.kycStatus === "pending" ? "Pending" : "Rejected",
          "Account Status": user.isBanned ? "Banned" : user.isSuspended ? "Suspended" : "Active",
          "Joined Date": new Date(user.createdAt).toLocaleDateString("en-GB"),
        }));

        const worksheet = XLSX.utils.json_to_sheet(excelData);
        worksheet["!cols"] = [{ wch: 8 }, { wch: 25 }, { wch: 15 }, { wch: 25 }, { wch: 12 }, { wch: 15 }, { wch: 15 }, { wch: 15 }, { wch: 15 }];

        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

        saveAs(blob, `users-${new Date().toISOString().split("T")[0]}.xlsx`);
        showToastMessage(t('exportedSuccessfully'), "success");
      }
    } catch (error) {
      console.error("Export error:", error);
      showToastMessage(t('exportFailed'), "error");
    } finally {
      setExporting(false);
    }
  };

  const getBadgeClass = (type, color) => {
    const classes = {
      ok: "bg-green-500/20 dark:bg-green-500/30 text-green-500 dark:text-green-400",
      warn: "bg-amber-500/20 dark:bg-amber-500/30 text-amber-500 dark:text-amber-400",
      info: "bg-blue-500/20 dark:bg-blue-500/30 text-blue-500 dark:text-blue-400",
      danger: "bg-red-500/20 dark:bg-red-500/30 text-red-500 dark:text-red-400",
      gray: "bg-gray-500/20 dark:bg-gray-500/30 text-gray-500 dark:text-gray-400",
    };
    return classes[color] || classes.ok;
  };

  const getKycDisplay = (kycStatus) => {
    if (kycStatus === "approved") return { label: "✅ Verified", color: "ok" };
    if (kycStatus === "pending") return { label: "⚠️ Pending", color: "warn" };
    return { label: "🔄 In Review", color: "info" };
  };

  const getStatusDisplay = (user) => {
    if (user.isBanned) return { label: "🚫 Banned", color: "danger" };
    if (user.isSuspended) return { label: "⏸️ Suspended", color: "warn" };
    if (!user.accountActive) return { label: "⏳ Inactive", color: "gray" };
    return { label: "Active", color: "ok" };
  };

  const getPlanDisplay = (plan) => {
    const map = {
      gold: { emoji: "🥇", label: "Gold", color: "warn" },
      silver: { emoji: "🥈", label: "Silver", color: "info" },
      platinum: { emoji: "💎", label: "Platinum", color: "purple" },
      bronze: { emoji: "🥉", label: "Bronze", color: "gray" },
    };
    return map[plan?.toLowerCase()] || map.bronze;
  };

  const getAvatarBg = (index) => {
    const colors = [
      "from-primary to-primary-light",
      "from-blue-500 to-purple-500",
      "from-red-500 to-orange-500",
      "from-purple-500 to-indigo-500",
      "from-green-500 to-teal-500",
    ];
    return colors[index % colors.length];
  };

  const getStatusBadge = (status) => {
    const map = {
      active: "bg-emerald-100 text-emerald-700",
      completed: "bg-blue-100 text-blue-700",
      paused: "bg-amber-100 text-amber-700",
      pending: "bg-amber-100 text-amber-700",
      approved: "bg-emerald-100 text-emerald-700",
      rejected: "bg-red-100 text-red-700",
      success: "bg-emerald-100 text-emerald-700",
      failed: "bg-red-100 text-red-700",
    };
    return map[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  const editFields = [
    { name: "firstName", label: "First Name", required: true },
    { name: "lastName", label: "Last Name" },
    { name: "phone", label: "Phone", required: true },
    { name: "email", label: "Email", type: "email" },
    { name: "dob", label: "Date of Birth", type: "date" },
    { name: "gender", label: "Gender" },
    { name: "occupation", label: "Occupation" },
    { name: "income", label: "Income" },
    { name: "division", label: "Division" },
    { name: "district", label: "District" },
    { name: "upazila", label: "Upazila" },
    { name: "village", label: "Village" },
    { name: "postOffice", label: "Post Office" },
    { name: "postCode", label: "Post Code" },
  ];

  // Details modal tabs
  const detailTabs = [
    { id: "overview", label: t('overview'), icon: Activity },
    { id: "goals", label: t('goals'), icon: Target },
    { id: "deposits", label: t('deposits'), icon: ArrowDownLeft },
    { id: "withdrawals", label: t('withdrawals'), icon: ArrowUpRight },
    { id: "transactions", label: t('transactions'), icon: Repeat },
    { id: "circles", label: t('circles'), icon: Users },
    { id: "loginHistory", label: t('loginHistory'), icon: LogIn },
  ];

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <h2 className="text-lg font-bold text-foreground">{t('userManagement')}</h2>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background/80 dark:bg-background/60 backdrop-blur-sm">
          <Search size={16} className="text-foreground/50" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchUsers(1, undefined, searchQuery)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {["All", "Active", "Pending KYC", "Flagged", "Suspended"].map((filter) => (
            <button
              key={filter}
              onClick={() => { setActiveFilter(filter); fetchUsers(1, filter); }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                activeFilter === filter
                  ? "bg-gradient-to-r from-primary to-primary-light text-white border-primary shadow-lg shadow-primary/20"
                  : "border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm text-foreground/60 hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              {t(filter.toLowerCase().replace(/\s+/g, ''))}
            </button>
          ))}

          <button
            onClick={exportToExcel}
            disabled={exporting}
            className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white text-xs font-semibold flex items-center gap-1 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300 disabled:opacity-50"
          >
            {exporting ? (
              <>
                <Loader2 size={12} className="animate-spin" />
                {t('exporting')}
              </>
            ) : (
              <>
                <Download size={12} /> {t('exportExcel')}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-border/50 dark:border-border/30 bg-background/80 dark:bg-background/60">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('member')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('phone')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('plan')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('totalSaved')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('kyc')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('status')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('joined')}</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-foreground/60">{t('actions')}</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-10 text-center text-sm text-foreground/50">
                        {t('noUsersFound')}
                      </td>
                    </tr>
                  ) : (
                    users.map((user, idx) => {
                      const kyc = getKycDisplay(user.kycStatus);
                      const status = getStatusDisplay(user);
                      const plan = getPlanDisplay(user.selectedPlan);
                      const avatar = user.firstName?.[0]?.toUpperCase() || "?";

                      return (
                        <tr key={user.id} className="border-b border-border/50 dark:border-border/30 last:border-0 hover:bg-primary/5 dark:hover:bg-primary/10 transition-all duration-200">
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getAvatarBg(idx)} flex items-center justify-center text-white font-bold text-sm shadow-lg`}>
                                {avatar}
                              </div>
                              <div>
                                <div className="font-semibold text-sm text-foreground">
                                  {user.fullName || `${user.firstName} ${user.lastName || ""}`.trim()}
                                </div>
                                <div className="text-xs text-foreground/50">{user.email || "No email"}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground">{user.phone}</td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(plan.label, plan.color)}`}>
                              {plan.emoji} {plan.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm font-bold text-primary">
                            {formatCurrency(user?.totalSaved)}
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(kyc.label, kyc.color)}`}>
                              {kyc.label}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-semibold px-2 py-1 rounded-full ${getBadgeClass(status.label, status.color)}`}>
                              {status.label}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-xs text-foreground/50">{formatDate(user.createdAt)}</td>
                          <td className="px-4 py-3">
                            <div className="flex gap-2">
                              <button onClick={() => openUserModal(user)} className="p-1.5 rounded-lg border border-border/60 hover:border-primary/50 hover:bg-primary/5 transition-all duration-300">
                                <Eye size={14} className="text-foreground/70" />
                              </button>
                              <button onClick={() => openDetailsModal(user)} className="p-1.5 rounded-lg border border-emerald-500/30 text-emerald-600 hover:bg-emerald-500/10 transition-all duration-300">
                                <Activity size={14} />
                              </button>
                              <button onClick={() => openEditModal(user)} className="p-1.5 rounded-lg border border-blue-500/30 text-blue-500 hover:bg-blue-500/10 transition-all duration-300">
                                <Edit size={14} />
                              </button>
                              {user.isBanned ? (
                                <button onClick={() => handleAction("suspend", user)} className="p-1.5 rounded-lg border border-green-500/30 text-green-500 hover:bg-green-500/10 transition-all duration-300">
                                  <CheckCircle size={14} />
                                </button>
                              ) : user.kycStatus === "pending" ? (
                                <button onClick={() => handleAction("approveKYC", user)} className="p-1.5 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 transition-all duration-300">
                                  <CheckCircle size={14} />
                                </button>
                              ) : (
                                <button onClick={() => handleAction("suspend", user)} className="p-1.5 rounded-lg border border-amber-500/30 text-amber-500 hover:bg-amber-500/10 transition-all duration-300">
                                  <XCircle size={14} />
                                </button>
                              )}
                              {!user.isBanned && (
                                <button onClick={() => handleAction("ban", user)} className="p-1.5 rounded-lg border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-all duration-300">
                                  <Ban size={14} />
                                </button>
                              )}
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
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-border/50 dark:border-border/30 bg-background/80 dark:bg-background/60">
              <div className="text-xs text-foreground/50">
                Showing {users.length} of {pagination.totalItems} members
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => fetchUsers(pagination.currentPage - 1)}
                  disabled={pagination.currentPage <= 1}
                  className="px-3 py-1 rounded-lg border border-border/60 dark:border-border/40 text-xs font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ← Prev
                </button>
                {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                  const page = i + 1;
                  return (
                    <button
                      key={page}
                      onClick={() => fetchUsers(page)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 ${
                        pagination.currentPage === page
                          ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20"
                          : "border border-border/60 dark:border-border/40 hover:border-primary/50 hover:bg-primary/5"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
                <button
                  onClick={() => fetchUsers(pagination.currentPage + 1)}
                  disabled={pagination.currentPage >= pagination.totalPages}
                  className="px-3 py-1 rounded-lg border border-border/60 dark:border-border/40 text-xs font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* ==================== USER DETAILS MODAL ==================== */}
      <AnimatePresence>
        {showDetailsModal && detailsUser && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4" onClick={closeDetailsModal}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card/95 dark:bg-card/90 backdrop-blur-sm rounded-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden border border-border/50 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-primary to-primary-light p-5 text-white relative shrink-0">
                <button onClick={closeDetailsModal} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300">
                  <X size={16} />
                </button>
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-r ${getAvatarBg(0)} flex items-center justify-center text-white text-xl font-bold shadow-lg shrink-0`}>
                    {detailsUser.firstName?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="min-w-0">
                    <div className="text-xl font-bold truncate">
                      {detailsUser.fullName || `${detailsUser.firstName} ${detailsUser.lastName || ""}`.trim()}
                    </div>
                    <div className="text-sm text-white/80 flex flex-wrap items-center gap-x-3 gap-y-1">
                      <span className="flex items-center gap-1"><Phone size={12} /> {detailsUser.phone}</span>
                      {detailsUser.email && <span className="flex items-center gap-1"><Mail size={12} /> {detailsUser.email}</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-border/50 dark:border-border/30 shrink-0 overflow-x-auto">
                <div className="flex gap-1 p-2 min-w-max">
                  {detailTabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setDetailsTab(tab.id)}
                        className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                          detailsTab === tab.id
                            ? "bg-primary text-white shadow-sm"
                            : "text-foreground/60 hover:bg-primary/10 hover:text-primary"
                        }`}
                      >
                        <Icon size={14} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto p-5">
                {detailsLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <Loader2 size={32} className="animate-spin text-primary" />
                    <span className="ml-2 text-sm text-foreground/60">{t('loadingDetails')}</span>
                  </div>
                ) : !detailsData ? (
                  <div className="text-center py-20 text-foreground/50 text-sm">{t('noData')}</div>
                ) : (
                  <>
                    {/* OVERVIEW TAB */}
                    {detailsTab === "overview" && (
                      <div className="space-y-5">
                        {/* Stats Cards */}
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div className="bg-background/90 dark:bg-background/80 rounded-xl p-4 border border-border/50">
                            <div className="flex items-center gap-2 mb-2">
                              <Wallet size={16} className="text-primary" />
                              <span className="text-[10px] text-foreground/50 uppercase font-bold">{t('totalSavings')}</span>
                            </div>
                            <div className="text-lg font-bold text-primary">{formatCurrency(detailsData.user?.totalSaved)}</div>
                          </div>
                          <div className="bg-background/90 dark:bg-background/80 rounded-xl p-4 border border-border/50">
                            <div className="flex items-center gap-2 mb-2">
                              <ArrowDownLeft size={16} className="text-emerald-500" />
                              <span className="text-[10px] text-foreground/50 uppercase font-bold">{t('totalDeposits')}</span>
                            </div>
                            <div className="text-lg font-bold text-emerald-600">{detailsData.deposits?.length || 0}</div>
                          </div>
                          <div className="bg-background/90 dark:bg-background/80 rounded-xl p-4 border border-border/50">
                            <div className="flex items-center gap-2 mb-2">
                              <ArrowUpRight size={16} className="text-amber-500" />
                              <span className="text-[10px] text-foreground/50 uppercase font-bold">{t('totalWithdrawals')}</span>
                            </div>
                            <div className="text-lg font-bold text-amber-600">{detailsData.withdrawals?.length || 0}</div>
                          </div>
                          <div className="bg-background/90 dark:bg-background/80 rounded-xl p-4 border border-border/50">
                            <div className="flex items-center gap-2 mb-2">
                              <Users size={16} className="text-blue-500" />
                              <span className="text-[10px] text-foreground/50 uppercase font-bold">{t('circles')}</span>
                            </div>
                            <div className="text-lg font-bold text-blue-600">{detailsData.circles?.length || 0}</div>
                          </div>
                        </div>

                        {/* Personal Info */}
                        <div className="bg-background/90 dark:bg-background/80 rounded-xl p-4 border border-border/50">
                          <div className="flex items-center gap-2 mb-4">
                            <User size={16} className="text-primary" />
                            <h3 className="text-sm font-bold text-foreground">{t('personalInfo')}</h3>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            <InfoRow label={t('fullName')} value={detailsData.user?.fullName || `${detailsData.user?.firstName || ""} ${detailsData.user?.lastName || ""}`.trim()} />
                            <InfoRow label={t('phone')} value={detailsData.user?.phone} />
                            <InfoRow label={t('email')} value={detailsData.user?.email || "N/A"} />
                            <InfoRow label={t('dob')} value={detailsData.user?.dob ? formatDate(detailsData.user.dob) : "N/A"} />
                            <InfoRow label={t('gender')} value={detailsData.user?.gender || "N/A"} />
                            <InfoRow label={t('occupation')} value={detailsData.user?.occupation || "N/A"} />
                            <InfoRow label={t('income')} value={detailsData.user?.income ? formatCurrency(detailsData.user.income) : "N/A"} />
                            <InfoRow label={t('division')} value={detailsData.user?.division || "N/A"} />
                            <InfoRow label={t('district')} value={detailsData.user?.district || "N/A"} />
                            <InfoRow label={t('upazila')} value={detailsData.user?.upazila || "N/A"} />
                            <InfoRow label={t('village')} value={detailsData.user?.village || "N/A"} />
                            <InfoRow label={t('referralCode')} value={detailsData.user?.referralCode || "N/A"} />
                          </div>
                        </div>

                        {/* Recent Activity Summary */}
                        <div className="bg-background/90 dark:bg-background/80 rounded-xl p-4 border border-border/50">
                          <div className="flex items-center gap-2 mb-4">
                            <TrendingUp size={16} className="text-primary" />
                            <h3 className="text-sm font-bold text-foreground">{t('recentActivity')}</h3>
                          </div>
                          <div className="space-y-2">
                            {(detailsData.deposits?.slice(0, 3) || []).map((d) => (
                              <div key={d.id} className="flex items-center justify-between p-2.5 rounded-lg bg-card/50 border border-border/30">
                                <div className="flex items-center gap-2">
                                  <ArrowDownLeft size={14} className="text-emerald-500" />
                                  <span className="text-sm text-foreground">Deposit to {d.goalName || "Goal"}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-emerald-600">{formatCurrency(d.amount)}</span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusBadge(d.status)}`}>{d.status}</span>
                                </div>
                              </div>
                            ))}
                            {(detailsData.withdrawals?.slice(0, 3) || []).map((w) => (
                              <div key={w.id} className="flex items-center justify-between p-2.5 rounded-lg bg-card/50 border border-border/30">
                                <div className="flex items-center gap-2">
                                  <ArrowUpRight size={14} className="text-amber-500" />
                                  <span className="text-sm text-foreground">Withdrawal from {w.goalName || "Goal"}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-sm font-bold text-amber-600">{formatCurrency(w.amount)}</span>
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusBadge(w.status)}`}>{w.status}</span>
                                </div>
                              </div>
                            ))}
                            {(!detailsData.deposits?.length && !detailsData.withdrawals?.length) && (
                              <p className="text-sm text-foreground/50 text-center py-4">{t('noData')}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* GOALS TAB */}
                    {detailsTab === "goals" && (
                      <div>
                        {detailsData.goals?.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {detailsData.goals.map((goal) => {
                              const progress = goal.targetAmount > 0 ? Math.round((goal.currentAmount / goal.targetAmount) * 100) : 0;
                              return (
                                <div key={goal.id} className="bg-background/90 dark:bg-background/80 rounded-xl p-4 border border-border/50">
                                  <div className="flex items-start justify-between mb-3">
                                    <div className="flex items-center gap-2">
                                      <Target size={16} className="text-primary" />
                                      <h4 className="text-sm font-bold text-foreground">{goal.title || "Untitled Goal"}</h4>
                                    </div>
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusBadge(goal.status)}`}>{goal.status}</span>
                                  </div>
                                  <div className="space-y-1 text-xs text-foreground/60 mb-3">
                                    <div className="flex justify-between"><span>{t('goalType')}</span><span className="text-foreground font-medium">{goal.goalType || "General"}</span></div>
                                    <div className="flex justify-between"><span>{t('targetAmount')}</span><span className="text-foreground font-medium">{formatCurrency(goal.targetAmount)}</span></div>
                                    <div className="flex justify-between"><span>{t('currentAmount')}</span><span className="text-foreground font-medium">{formatCurrency(goal.currentAmount)}</span></div>
                                  </div>
                                  <div className="h-2 bg-border rounded-full overflow-hidden">
                                    <div className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light transition-all" style={{ width: `${Math.min(progress, 100)}%` }} />
                                  </div>
                                  <div className="text-right text-[10px] text-foreground/50 mt-1">{progress}% {t('progress')}</div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <EmptyState text={t('noData')} />
                        )}
                      </div>
                    )}

                    {/* DEPOSITS TAB */}
                    {detailsTab === "deposits" && (
                      <DataTable
                        columns={[
                          { key: "goalName", label: t('goalName') },
                          { key: "amount", label: t('amount'), format: (v) => formatCurrency(v) },
                          { key: "method", label: t('method') },
                          { key: "status", label: t('status'), badge: true },
                          { key: "createdAt", label: t('date'), format: (v) => formatDateTime(v) },
                        ]}
                        data={detailsData.deposits || []}
                        emptyText={t('noData')}
                      />
                    )}

                    {/* WITHDRAWALS TAB */}
                    {detailsTab === "withdrawals" && (
                      <DataTable
                        columns={[
                          { key: "goalName", label: t('goalName') },
                          { key: "amount", label: t('amount'), format: (v) => formatCurrency(v) },
                          { key: "method", label: t('method') },
                          { key: "status", label: t('status'), badge: true },
                          { key: "createdAt", label: t('date'), format: (v) => formatDateTime(v) },
                        ]}
                        data={detailsData.withdrawals || []}
                        emptyText={t('noData')}
                      />
                    )}

                    {/* TRANSACTIONS (TRANSFERS) TAB */}
                    {detailsTab === "transactions" && (
                      <DataTable
                        columns={[
                          { key: "type", label: t('transferType') },
                          { key: "amount", label: t('amount'), format: (v) => formatCurrency(v) },
                          { key: "fromGoalName", label: t('from') },
                          { key: "toGoalName", label: t('to') },
                          { key: "status", label: t('status'), badge: true },
                          { key: "createdAt", label: t('date'), format: (v) => formatDateTime(v) },
                        ]}
                        data={detailsData.transfers || []}
                        emptyText={t('noData')}
                      />
                    )}

                    {/* CIRCLES TAB */}
                    {detailsTab === "circles" && (
                      <div>
                        {detailsData.circles?.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {detailsData.circles.map((circle) => (
                              <div key={circle.id} className="bg-background/90 dark:bg-background/80 rounded-xl p-4 border border-border/50">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center gap-2">
                                    <Users size={16} className="text-primary" />
                                    <h4 className="text-sm font-bold text-foreground">{circle.name || "Untitled Circle"}</h4>
                                  </div>
                                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${getStatusBadge(circle.status)}`}>{circle.status}</span>
                                </div>
                                <div className="space-y-1 text-xs text-foreground/60">
                                  <div className="flex justify-between"><span>{t('purpose')}</span><span className="text-foreground font-medium capitalize">{circle.purpose || "General"}</span></div>
                                  <div className="flex justify-between"><span>{t('circleType')}</span><span className="text-foreground font-medium capitalize">{circle.circleType || "public"}</span></div>
                                  <div className="flex justify-between"><span>{t('targetAmount')}</span><span className="text-foreground font-medium">{formatCurrency(circle.targetAmount)}</span></div>
                                  <div className="flex justify-between"><span>{t('members')}</span><span className="text-foreground font-medium">{circle.currentMembers}/{circle.maxMembers}</span></div>
                                  <div className="flex justify-between"><span>{t('role')}</span><span className={`font-medium ${circle.role === "admin" ? "text-amber-600" : "text-foreground"}`}>{circle.role === "admin" ? t('admin') : t('memberRole')}</span></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <EmptyState text={t('noData')} />
                        )}
                      </div>
                    )}

                    {/* LOGIN HISTORY TAB */}
                    {detailsTab === "loginHistory" && (
                      <DataTable
                        columns={[
                          { key: "loginTime", label: t('date'), format: (v) => formatDateTime(v) },
                          { key: "ip", label: t('ip') },
                          { key: "device", label: t('device') },
                          { key: "location", label: t('location') },
                          { key: "success", label: t('status'), format: (v) => v ? t('success') : t('failed'), badge: true, badgeColor: (v) => v ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700" },
                        ]}
                        data={detailsData.loginHistory || []}
                        emptyText={t('noData')}
                      />
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* User Modal (Quick View) */}
      <AnimatePresence>
        {showUserModal && selectedUser && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeUserModal}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card/95 dark:bg-card/90 backdrop-blur-sm rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white relative">
                <button onClick={closeUserModal} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300">✕</button>
                <div className="flex flex-col items-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getAvatarBg(0)} flex items-center justify-center text-white text-2xl font-bold mb-3 shadow-lg`}>
                    {selectedUser.firstName?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div className="text-xl font-bold">{selectedUser.fullName || `${selectedUser.firstName} ${selectedUser.lastName || ""}`.trim()}</div>
                  <div className="text-sm text-white/80">{selectedUser.phone} · {selectedUser.email || "No email"}</div>
                </div>
              </div>

              <div className="p-6">
                <div className="mb-5">
                  <div className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">{t('accountOverview')}</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">{t('totalSavings')}</div>
                      <div className="text-lg font-bold text-primary">{formatCurrency(selectedUser.totalSaved)}</div>
                    </div>
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">{t('totalDeposits')}</div>
                      <div className="text-lg font-bold text-foreground">{selectedUser.totalDeposits || 0}</div>
                    </div>
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">{t('totalWithdrawals')}</div>
                      <div className="text-lg font-bold text-foreground">{selectedUser.totalWithdrawals || 0}</div>
                    </div>
                    <div className="bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl p-3 border border-border/50">
                      <div className="text-[10px] text-foreground/50">{t('level')}</div>
                      <div className="text-lg font-bold text-foreground">{selectedUser.level || 1}</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 border-t border-border/50 dark:border-border/30 flex gap-3">
                <button className="flex-1 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">{t('message')}</button>
                <button onClick={() => { handleAction("suspend", selectedUser); closeUserModal(); }} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300">{t('suspend')}</button>
                <button onClick={() => { handleAction("ban", selectedUser); closeUserModal(); }} className="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300">{t('ban')}</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit User Modal */}
      <AnimatePresence>
        {showEditModal && editingUser && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeEditModal}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card/95 dark:bg-card/90 backdrop-blur-sm rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white relative">
                <button onClick={closeEditModal} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300">x</button>
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${getAvatarBg(1)} flex items-center justify-center text-white text-xl font-bold shadow-lg`}>
                    {editingUser.firstName?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <div className="text-xl font-bold">Edit User Info</div>
                    <div className="text-sm text-white/80">
                      {editingUser.fullName || `${editingUser.firstName || ""} ${editingUser.lastName || ""}`.trim()}
                    </div>
                  </div>
                </div>
              </div>

              <form onSubmit={submitEditForm} className="p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {editFields.map((field) => (
                    <label key={field.name} className="block">
                      <span className="block text-xs font-semibold text-foreground/60 mb-1">
                        {field.label}
                        {field.required && <span className="text-red-500"> *</span>}
                      </span>
                      <input
                        type={field.type || "text"}
                        value={editForm[field.name] || ""}
                        required={field.required}
                        onChange={(e) => handleEditFormChange(field.name, e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-border bg-background/80 dark:bg-background/60 text-sm text-foreground outline-none focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/10 transition-all duration-200"
                      />
                    </label>
                  ))}
                </div>

                <div className="mt-6 flex flex-col sm:flex-row justify-end gap-3 border-t border-border/50 dark:border-border/30 pt-4">
                  <button
                    type="button"
                    onClick={closeEditModal}
                    disabled={savingEdit}
                    className="px-5 py-2.5 rounded-xl border border-border/60 text-sm font-semibold text-foreground/70 hover:border-foreground/30 hover:bg-foreground/5 transition-all duration-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={savingEdit}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50"
                  >
                    {savingEdit ? (
                      <>
                        <Loader2 size={15} className="animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save size={15} />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </form>
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
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center backdrop-blur-sm ${
              toast.type === "error" ? "bg-red-500/90" : "bg-green-500/90"
            } text-white`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ==================== HELPER COMPONENTS ====================

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col">
      <span className="text-[10px] text-foreground/40 uppercase font-semibold">{label}</span>
      <span className="text-sm text-foreground font-medium">{value || "N/A"}</span>
    </div>
  );
}

function EmptyState({ text }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-foreground/40">
      <AlertCircle size={40} className="mb-3" />
      <p className="text-sm">{text}</p>
    </div>
  );
}

function DataTable({ columns, data, emptyText }) {
  if (!data || data.length === 0) return <EmptyState text={emptyText} />;

  return (
    <div className="overflow-x-auto rounded-xl border border-border/50">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-background/80 dark:bg-background/60 border-b border-border/50">
            {columns.map((col) => (
              <th key={col.key} className="px-4 py-3 text-left text-xs font-semibold text-foreground/60 whitespace-nowrap">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border/30">
          {data.map((row, idx) => (
            <tr key={row.id || idx} className="hover:bg-primary/5 transition-colors">
              {columns.map((col) => {
                const rawValue = row[col.key];
                const displayValue = col.format ? col.format(rawValue) : rawValue || "N/A";
                const badgeColor = col.badgeColor ? col.badgeColor(rawValue) : getStatusBadge(rawValue);

                return (
                  <td key={col.key} className="px-4 py-3 whitespace-nowrap">
                    {col.badge ? (
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${badgeColor}`}>
                        {displayValue}
                      </span>
                    ) : (
                      <span className="text-foreground/80">{displayValue}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserManagementPage;
