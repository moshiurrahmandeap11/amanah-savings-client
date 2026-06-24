"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Moon, Sun, Loader2, ArrowRightLeft, Target, User, Wallet, Banknote, CheckCircle, AlertCircle, Users, Send, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const getAuthHeaders = () => {
  if (typeof window === "undefined") return {};
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Translations
const translations = {
  en: {
    transfer: "Transfer",
    type: "Type",
    source: "Source",
    destination: "Destination",
    amount: "Amount",
    whatType: "What type of transfer?",
    goalToGoal: "Goal → Goal",
    anotherUser: "Another User",
    goalToGoalInfo: "Move money between your goals — completely free and instant.",
    userToUserInfo: "Send money directly to another Sanchoy Bondhu user.",
    transferFromGoal: "Transfer from which goal?",
    balance: "Balance",
    current: "Current",
    transferToGoal: "Transfer to which goal?",
    whoSendingTo: "Who are you sending to?",
    findUser: "Find User",
    userFound: "User found!",
    enterValidPhone: "Please enter a valid phone number (11 digits)",
    howMuch: "How much to transfer?",
    noteOptional: "Note (Optional)",
    notePlaceholder: "Why are you sending? e.g., For Hajj fund",
    characters: "characters",
    insufficientBalance: "Insufficient balance. Available:",
    transferSummary: "Transfer Summary",
    from: "From",
    to: "To",
    fee: "Fee",
    free: "Free",
    confirmTransfer: "Confirm Transfer",
    proceedToAmount: "Proceed to Amount",
    createGoal: "Create a Goal",
    goToDashboard: "Go to Dashboard",
    makeAnotherTransfer: "Make Another Transfer",
    noActiveGoals: "No Active Goals",
    noGoalsDesc: "Create a goal first to make transfers",
    cannotTransferSame: "Cannot transfer to the same goal",
    minTransferError: "Minimum transfer amount is ৳10",
    userNotFound: "User not found",
    transferComplete: "Transfer Complete!",
    transferCompleteDesc: "Your transfer has been successfully completed.",
    amountSent: "sent to",
    transactionId: "Transaction ID",
    transferFailed: "Transfer failed",
    searchUser: "Search user...",
    selectDestinationGoal: "Please select a destination goal",
    searchUserFirst: "Please search and select a user first",
    recipientGoals: "Select Recipient's Goal",
    recipientGoalsDesc: "Choose which goal to send money to",
    noActiveGoalsRecipient: "Recipient has no active goals",
    generalSavings: "General Savings (Auto-created)",
  },
  bn: {
    transfer: "ট্রান্সফার",
    type: "ধরন",
    source: "উৎস",
    destination: "গন্তব্য",
    amount: "পরিমাণ",
    whatType: "কি ধরনের ট্রান্সফার?",
    goalToGoal: "গোল → গোল",
    anotherUser: "অন্য ব্যবহারকারী",
    goalToGoalInfo: "আপনার গোলগুলোর মধ্যে টাকা সরান — সম্পূর্ণ বিনামূল্যে এবং তাৎক্ষণিক।",
    userToUserInfo: "সরাসরি অন্য সঞ্চয় বন্ধু ব্যবহারকারীকে টাকা পাঠান।",
    transferFromGoal: "কোন গোল থেকে ট্রান্সফার করবেন?",
    balance: "ব্যালেন্স",
    current: "বর্তমান",
    transferToGoal: "কোন গোলে ট্রান্সফার করবেন?",
    whoSendingTo: "আপনি কাকে পাঠাচ্ছেন?",
    findUser: "ব্যবহারকারী খুঁজুন",
    userFound: "ব্যবহারকারী পাওয়া গেছে!",
    enterValidPhone: "দয়া করে একটি বৈধ ফোন নম্বর দিন (১১ ডিজিট)",
    howMuch: "কত টাকা ট্রান্সফার করবেন?",
    noteOptional: "নোট (ঐচ্ছিক)",
    notePlaceholder: "কেন পাঠাচ্ছেন? যেমন: হজ ফান্ডের জন্য",
    characters: "অক্ষর",
    insufficientBalance: "পর্যাপ্ত ব্যালেন্স নেই। উপলব্ধ:",
    transferSummary: "ট্রান্সফার সারাংশ",
    from: "থেকে",
    to: "প্রতি",
    fee: "চার্জ",
    free: "বিনামূল্যে",
    confirmTransfer: "ট্রান্সফার নিশ্চিত করুন",
    proceedToAmount: "পরিমাণ নির্ধারণ করুন",
    createGoal: "গোল তৈরি করুন",
    goToDashboard: "ড্যাশবোর্ডে যান",
    makeAnotherTransfer: "আরও ট্রান্সফার করুন",
    noActiveGoals: "কোন সক্রিয় গোল নেই",
    noGoalsDesc: "ট্রান্সফার করতে প্রথমে একটি গোল তৈরি করুন",
    cannotTransferSame: "একই গোলে ট্রান্সফার করা যাবে না",
    minTransferError: "সর্বনিম্ন ট্রান্সফার পরিমাণ ৳১০",
    userNotFound: "ব্যবহারকারী পাওয়া যায়নি",
    transferComplete: "ট্রান্সফার সম্পূর্ণ!",
    transferCompleteDesc: "আপনার ট্রান্সফার সফলভাবে সম্পন্ন হয়েছে।",
    amountSent: "পাঠানো হয়েছে",
    transactionId: "লেনদেন আইডি",
    transferFailed: "ট্রান্সফার ব্যর্থ হয়েছে",
    searchUser: "ব্যবহারকারী খুঁজুন...",
    selectDestinationGoal: "দয়া করে একটি গন্তব্য গোল নির্বাচন করুন",
    searchUserFirst: "দয়া করে প্রথমে একজন ব্যবহারকারী খুঁজুন এবং নির্বাচন করুন",
    recipientGoals: "প্রাপকের গোল নির্বাচন করুন",
    recipientGoalsDesc: "কোন গোলে টাকা পাঠাবেন তা নির্বাচন করুন",
    noActiveGoalsRecipient: "প্রাপকের কোনো সক্রিয় গোল নেই",
    generalSavings: "জেনারেল সেভিংস (অটো-তৈরি)",
  }
};

const TransferPage = () => {
  const router = useRouter();
  const [trType, setTrType] = useState("goal2goal");
  const [selFrom, setSelFrom] = useState(null);
  const [selTo, setSelTo] = useState(null);
  const [recipientFound, setRecipientFound] = useState(false);
  const [recipientPhone, setRecipientPhone] = useState("");
  const [recipientData, setRecipientData] = useState(null);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const [lang, setLang] = useState(() => {
    if (typeof window === "undefined") return "bn";
    return localStorage.getItem("appLanguage") || "bn";
  });
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [recipientGoals, setRecipientGoals] = useState([]);
  const [selRecipientGoal, setSelRecipientGoal] = useState(null);
  const [loadingRecipientGoals, setLoadingRecipientGoals] = useState(false);

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  const fetchGoals = async () => {
    try {
      const response = await axiosInstance.get("/goals/my?status=active", {
        headers: getAuthHeaders(),
      });
      if (response.data.success) {
        const activeGoals = response.data.data.goals.filter(
          goal => goal.status === "active"
        );
        setGoals(activeGoals);
        if (activeGoals.length > 0) {
          setSelFrom(activeGoals[0]._id);
        }
      }
    } catch (error) {
      console.error("Fetch goals error:", error);
      if (error.response?.status === 401) {
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");

    const timeoutId = window.setTimeout(() => {
      fetchGoals();
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, []);

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  const selectType = (type) => {
    setTrType(type);
    setActiveStep(2);
    setSelTo(null);
    setRecipientFound(false);
    setRecipientData(null);
    setRecipientPhone("");
    setRecipientGoals([]);
    setSelRecipientGoal(null);
  };

  const selectFrom = (id) => {
    setSelFrom(id);
    setActiveStep(3);
  };

  const selectTo = (id) => {
    if (selFrom === id) {
      showToast(t('cannotTransferSame'), "error");
      return;
    }
    setSelTo(id);
    setActiveStep(4);
  };

  const formatPhoneForSearch = (phone) => {
    let cleaned = phone.replace(/\D/g, '');
    if (cleaned.startsWith('0')) cleaned = cleaned.substring(1);
    if (cleaned.startsWith('88')) cleaned = cleaned.substring(2);
    if (cleaned.length === 10) cleaned = '0' + cleaned;
    if (cleaned.length === 11) return cleaned;
    return cleaned;
  };

  const isValidBangladeshPhone = (phone) => {
    const formatted = formatPhoneForSearch(phone);
    return /^01[3-9]\d{8}$/.test(formatted) || /^1[3-9]\d{9}$/.test(formatted);
  };

  const searchRecipient = async () => {
    const formattedPhone = formatPhoneForSearch(recipientPhone);

    if (!isValidBangladeshPhone(formattedPhone) && !isValidBangladeshPhone(recipientPhone)) {
      showToast(t('enterValidPhone'), "error");
      return;
    }

    const searchPhones = [
      formattedPhone,
      recipientPhone.replace(/\D/g, ''),
      formattedPhone.startsWith('0') ? formattedPhone.substring(1) : '0' + formattedPhone,
    ];

    const uniquePhones = [...new Set(searchPhones)];
    setSubmitting(true);
    let found = false;

    try {
      for (const phone of uniquePhones) {
        if (phone.length < 10 || phone.length > 11) continue;
        try {
          const response = await axiosInstance.get(
            `/transfers/search-user?phone=${encodeURIComponent(phone)}`,
            { headers: getAuthHeaders() }
          );
          if (response.data.success) {
            setRecipientData(response.data.data);
            setRecipientFound(true);
            setRecipientPhone(response.data.data.phone);
            showToast(t('userFound'), "success");
            found = true;
            break;
          }
        } catch (err) {
          continue;
        }
      }

      if (!found) {
        showToast(t('userNotFound'), "error");
        setRecipientFound(false);
        setRecipientData(null);
      }
    } catch (error) {
      console.error("Search user error:", error);
      showToast(error.response?.data?.message || t('userNotFound'), "error");
      setRecipientFound(false);
      setRecipientData(null);
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ New: proceed to recipient goal selection after user is found
  const proceedToRecipientGoals = async () => {
    if (!recipientFound || !recipientData) {
      showToast(t('searchUserFirst'), "error");
      return;
    }

    setLoadingRecipientGoals(true);
    try {
      const response = await axiosInstance.get(
        `/transfers/recipient-goals/${recipientData.id}`,
        { headers: getAuthHeaders() }
      );
      if (response.data.success) {
        const goals = response.data.data.goals || [];
        setRecipientGoals(goals);
        if (goals.length > 0) {
          setSelRecipientGoal(goals[0]._id);
        }
        setActiveStep(3);
      }
    } catch (error) {
      console.error("Fetch recipient goals error:", error);
      showToast("Failed to fetch recipient goals", "error");
    } finally {
      setLoadingRecipientGoals(false);
    }
  };

  const selectRecipientGoal = (goalId) => {
    setSelRecipientGoal(goalId);
    setActiveStep(4);
  };

  // ✅ New: proceed to step 4 (amount) after recipient goal is selected
  const proceedToAmount = () => {
    if (trType === "user2user" && !selRecipientGoal) {
      showToast(t('selectDestinationGoal'), "error");
      return;
    }
    if (!recipientFound) {
      showToast(t('searchUserFirst'), "error");
      return;
    }
    setActiveStep(4);
  };

  const submitTransfer = async () => {
    const amt = parseFloat(amount) || 0;

    if (amt < 10) {
      showToast(t('minTransferError'), "error");
      return;
    }

    const selectedGoal = goals.find(g => g._id === selFrom);
    if (amt > selectedGoal?.currentSaved) {
      showToast(`${t('insufficientBalance')} ৳${selectedGoal?.currentSaved?.toLocaleString()}`, "error");
      return;
    }

    if (trType === "goal2goal" && !selTo) {
      showToast(t('selectDestinationGoal'), "error");
      return;
    }

    if (trType === "user2user" && !recipientFound) {
      showToast(t('searchUserFirst'), "error");
      return;
    }

    setSubmitting(true);

    try {
      let response;
      if (trType === "goal2goal") {
        response = await axiosInstance.post("/transfers/goal-to-goal", {
          fromGoalId: selFrom,
          toGoalId: selTo,
          amount: amt,
          note: note || null,
        }, {
          headers: getAuthHeaders(),
        });
      } else {
        const phoneToSend = recipientData?.phone || formatPhoneForSearch(recipientPhone);
        response = await axiosInstance.post("/transfers/user-to-user", {
          toUserPhone: phoneToSend,
          amount: amt,
          note: note || null,
          fromGoalId: selFrom,
          toGoalId: selRecipientGoal,
        }, {
          headers: getAuthHeaders(),
        });
      }

      if (response.data.success) {
        setTransferResult(response.data.data);
        setShowModal(true);
        await fetchGoals();
      }
    } catch (error) {
      console.error("Transfer error:", error);
      showToast(error.response?.data?.message || t('transferFailed'), "error");
    } finally {
      setSubmitting(false);
    }
  };

  const resetTransfer = () => {
    setShowModal(false);
    setAmount("");
    setNote("");
    setRecipientPhone("");
    setRecipientFound(false);
    setRecipientData(null);
    setSelTo(null);
    setRecipientGoals([]);
    setSelRecipientGoal(null);
    setActiveStep(1);
    setTransferResult(null);
  };

  const getAmountDisplay = () => {
    const amt = parseFloat(amount) || 0;
    return amt > 0 ? `৳${amt.toLocaleString("en-IN")}` : "৳0";
  };

  const getSummaryTo = () => {
    if (trType === "goal2goal" && selTo) {
      const goal = goals.find(g => g._id === selTo);
      return goal?.goalName || "—";
    } else if (trType === "user2user" && selRecipientGoal) {
      const goal = recipientGoals.find(g => g._id === selRecipientGoal);
      return `${goal?.goalName || "General Savings"} — ${recipientData?.name || recipientData?.fullName || ''}`;
    } else if (trType === "user2user" && recipientFound) {
      return `${recipientData?.name || recipientData?.fullName || ''} (${recipientData?.phone || recipientPhone})`;
    }
    return "—";
  };

  const getSummaryFrom = () => {
    const goal = goals.find(g => g._id === selFrom);
    return goal?.goalName || "—";
  };

  const getTypeLabel = () => trType === "goal2goal" ? t('goalToGoal') : t('anotherUser');
  const getTypeInfo = () => trType === "goal2goal" ? t('goalToGoalInfo') : t('userToUserInfo');

  const stepLabels = [t('type'), t('source'), t('destination'), t('amount')];
  const selectedFromGoal = goals.find(g => g._id === selFrom);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Target size={48} className="text-foreground/30 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-foreground mb-2">{t('noActiveGoals')}</h3>
          <p className="text-foreground/60 mb-4">{t('noGoalsDesc')}</p>
          <button
            onClick={() => router.push("/dashboard/goals")}
            className="px-6 py-2.5 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold"
          >
            {t('createGoal')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary to-primary-dark px-5 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button
          onClick={() => router.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1 flex items-center gap-2">
          <ArrowRightLeft size={20} /> {t('transfer')}
        </h1>
      </div>

      {/* Step Progress */}
      <div className="bg-gradient-to-br from-primary to-primary-dark px-5 pb-6">
        <div className="flex gap-2">
          {stepLabels.map((label, idx) => (
            <div
              key={idx}
              className={`flex-1 py-2 rounded-full flex flex-col items-center gap-1 transition ${
                activeStep > idx
                  ? "bg-white/40"
                  : activeStep === idx + 1
                    ? "bg-white/30"
                    : "bg-white/15"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  activeStep > idx || activeStep === idx + 1
                    ? "bg-white text-primary"
                    : "bg-white/30 text-white"
                }`}
              >
                {idx + 1}
              </div>
              <div className={`text-[10px] ${activeStep === idx + 1 ? "text-white font-semibold" : "text-white/80"}`}>
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="p-5 pb-32">
        {/* Step 1: Transfer Type */}
        {activeStep === 1 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              <ArrowRightLeft size={18} /> {t('whatType')}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => selectType("goal2goal")}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  trType === "goal2goal"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <Target size={24} className={`mx-auto mb-2 ${trType === "goal2goal" ? "text-primary" : "text-foreground/50"}`} />
                <span className="text-sm font-semibold">{t('goalToGoal')}</span>
              </button>
              <button
                onClick={() => selectType("user2user")}
                className={`p-4 rounded-xl border-2 text-center transition-all ${
                  trType === "user2user"
                    ? "border-primary bg-primary/5 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-primary/5"
                }`}
              >
                <Users size={24} className={`mx-auto mb-2 ${trType === "user2user" ? "text-primary" : "text-foreground/50"}`} />
                <span className="text-sm font-semibold">{t('anotherUser')}</span>
              </button>
            </div>
            <div className="mt-4 p-3 bg-primary/5 border border-primary/15 rounded-lg flex gap-2 text-xs text-foreground/60">
              <AlertCircle size={14} className="text-primary shrink-0 mt-0.5" />
              <span>{getTypeInfo()}</span>
            </div>
          </div>
        )}

        {/* Step 2: Source Goal */}
        {activeStep === 2 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Send size={18} className="text-primary" /> {t('transferFromGoal')}
            </div>
            <div className="space-y-3">
              {goals.map((goal) => (
                <div
                  key={goal._id}
                  onClick={() => selectFrom(goal._id)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-center gap-3 ${
                    selFrom === goal._id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Target size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">{goal.goalName}</div>
                    <div className="text-xs text-foreground/50">
                      {t('balance')}: ৳{goal.currentSaved.toLocaleString()} / ৳{goal.targetAmount.toLocaleString()}
                    </div>
                    <div className="h-1.5 bg-border rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                  {selFrom === goal._id && (
                    <CheckCircle size={18} className="text-primary shrink-0" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Destination */}
        {activeStep === 3 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              {trType === "goal2goal" ? <Target size={18} /> : <User size={18} />}
              {trType === "goal2goal" ? t('transferToGoal') : t('whoSendingTo')}
            </div>

            {/* Goal to Goal destination */}
            {trType === "goal2goal" && (
              <div className="space-y-3">
                {goals
                  .filter(goal => goal._id !== selFrom)
                  .map((goal) => (
                    <div
                      key={goal._id}
                      onClick={() => selectTo(goal._id)}
                      className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-center gap-3 ${
                        selTo === goal._id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <Target size={20} />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-sm text-foreground">{goal.goalName}</div>
                        <div className="text-xs text-foreground/50">
                          {t('current')}: ৳{goal.currentSaved.toLocaleString()}
                        </div>
                      </div>
                      {selTo === goal._id && (
                        <CheckCircle size={18} className="text-primary shrink-0" />
                      )}
                    </div>
                  ))}
              </div>
            )}

            {/* User to User destination */}
            {trType === "user2user" && (
              <div>
                {/* Phone input */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-bold text-sm">
                    +88
                  </span>
                  <input
                    type="tel"
                    value={recipientPhone}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "");
                      if (value.length <= 11) {
                        setRecipientPhone(value);
                        setRecipientFound(false);
                        setRecipientData(null);
                      }
                    }}
                    placeholder="01XXXXXXXXX"
                    maxLength="11"
                    className="w-full py-4 pl-16 pr-4 border-2 border-border rounded-xl text-base font-semibold text-foreground bg-background outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>
                <div className="text-xs text-foreground/40 mt-1 px-1">
                  {recipientPhone.length > 0 && (
                    <span>Entered: +88{recipientPhone}</span>
                  )}
                  {recipientPhone.length === 11 && (
                    <span className="text-green-500 ml-2">✓ Valid format</span>
                  )}
                  {recipientPhone.length > 0 && recipientPhone.length !== 11 && (
                    <span className="text-orange-500 ml-2">Needs 11 digits</span>
                  )}
                </div>

                {/* Found user card */}
                {recipientFound && recipientData && (
                  <div className="mt-3 p-3 bg-green-500/5 border-2 border-green-500/30 rounded-xl flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden">
                      {recipientData.profilePicture ? (
                        <img
                          src={recipientData.profilePicture}
                          alt={recipientData.name || recipientData.fullName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User size={20} />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-sm text-foreground">
                        {recipientData.name || recipientData.fullName || recipientData.firstName}
                      </div>
                      <div className="text-xs text-foreground/50">+88{recipientData.phone}</div>
                      {recipientData.email && (
                        <div className="text-xs text-foreground/40">{recipientData.email}</div>
                      )}
                    </div>
                    <CheckCircle size={18} className="text-green-500 shrink-0" />
                  </div>
                )}

                {/* Search button */}
                <button
                  onClick={searchRecipient}
                  disabled={submitting || recipientPhone.length < 11}
                  className="w-full mt-3 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-light text-white font-bold text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search size={16} />}
                  {t('findUser')}
                </button>

                {/* ✅ Proceed to Recipient Goals button — only shows after user is found */}
                {recipientFound && recipientData && (
                  <button
                    onClick={proceedToRecipientGoals}
                    disabled={loadingRecipientGoals}
                    className="w-full mt-3 py-3.5 rounded-xl border-2 border-primary bg-primary/5 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
                  >
                    {loadingRecipientGoals ? <Loader2 className="w-4 h-4 animate-spin" /> : <Target size={16} />}
                    {t('recipientGoals')}
                  </button>
                )}
              </div>
            )}
          </div>
        )}

        {/* Step 3.5: Recipient Goal Selection (for user-to-user) */}
        {activeStep === 3 && trType === "user2user" && recipientFound && recipientGoals.length > 0 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="font-bold text-foreground mb-2 flex items-center gap-2">
              <Target size={18} className="text-primary" /> {t('recipientGoals')}
            </div>
            <div className="text-xs text-foreground/50 mb-4">{t('recipientGoalsDesc')}</div>
            <div className="space-y-3">
              {recipientGoals.map((goal) => (
                <div
                  key={goal._id}
                  onClick={() => selectRecipientGoal(goal._id)}
                  className={`p-3 rounded-xl border-2 cursor-pointer transition flex items-center gap-3 ${
                    selRecipientGoal === goal._id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <Target size={20} />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">{goal.goalName}</div>
                    <div className="text-xs text-foreground/50">
                      {t('current')}: ৳{goal.currentSaved.toLocaleString()} / ৳{goal.targetAmount.toLocaleString()}
                    </div>
                    <div className="h-1.5 bg-border rounded-full mt-2 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      />
                    </div>
                  </div>
                  {selRecipientGoal === goal._id && (
                    <CheckCircle size={18} className="text-primary shrink-0" />
                  )}
                </div>
              ))}
            </div>
            
            {/* Proceed to Amount button */}
            {selRecipientGoal && (
              <button
                onClick={proceedToAmount}
                className="w-full mt-4 py-3.5 rounded-xl border-2 border-primary bg-primary/5 text-primary font-bold text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-white transition-all"
              >
                <Wallet size={16} />
                {t('proceedToAmount')}
              </button>
            )}
          </div>
        )}

        {/* Step 3 fallback: if recipient has no goals */}
        {activeStep === 3 && trType === "user2user" && recipientFound && recipientGoals.length === 0 && !loadingRecipientGoals && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="text-center py-8">
              <AlertCircle size={48} className="text-amber-500 mx-auto mb-3" />
              <div className="font-bold text-foreground mb-2">{t('noActiveGoalsRecipient')}</div>
              <div className="text-sm text-foreground/60 mb-4">
                {recipientData?.name || recipientData?.fullName} has no active goals. Money will be sent to a &quot;General Savings&quot; goal.
              </div>
              <button
                onClick={() => {
                  setSelRecipientGoal("general");
                  setActiveStep(4);
                }}
                className="px-6 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold"
              >
                {t('proceedToAmount')}
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Amount */}
        {activeStep === 4 && (
          <div className="bg-card border border-border rounded-xl p-5 mb-4">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">
              <Wallet size={18} className="text-primary" /> {t('howMuch')}
            </div>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary text-2xl font-bold">
                ৳
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                min="10"
                className="w-full py-5 pl-12 pr-4 text-right text-3xl font-bold border-2 border-border rounded-xl text-foreground bg-background outline-none focus:border-primary focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[500, 1000, 2000, 5000, 10000, 20000].map((amt) => (
                <button
                  key={amt}
                  onClick={() => setAmount(amt.toString())}
                  className={`py-2 rounded-lg border-2 text-sm font-semibold transition ${
                    parseFloat(amount) === amt
                      ? "border-primary text-primary bg-primary/5"
                      : "border-border text-foreground/60 hover:border-primary/50"
                  }`}
                >
                  ৳{amt.toLocaleString()}
                </button>
              ))}
            </div>

            {selectedFromGoal && amount && parseFloat(amount) > selectedFromGoal.currentSaved && (
              <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                <AlertCircle size={12} /> {t('insufficientBalance')} ৳{selectedFromGoal.currentSaved.toLocaleString()}
              </p>
            )}

            <div className="mt-4">
              <label className="block text-sm font-semibold text-foreground mb-2">
                {t('noteOptional')}
              </label>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value.slice(0, 100))}
                rows={2}
                placeholder={t('notePlaceholder')}
                className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none"
              />
              <div className="text-xs text-foreground/50 mt-1">
                {note.length}/100 {t('characters')}
              </div>
            </div>
          </div>
        )}

        {/* Summary */}
        {activeStep === 4 && (
          <div className="bg-gradient-to-r from-primary/5 to-primary-light/5 border border-primary/20 rounded-xl p-4 mb-4">
            <div className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
              <Wallet size={14} /> {t('transferSummary')}
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-dashed border-border">
              <span className="text-foreground/60">{t('type')}</span>
              <span className="font-semibold text-foreground">{getTypeLabel()}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-dashed border-border">
              <span className="text-foreground/60">{t('from')}</span>
              <span className="font-semibold text-foreground">{getSummaryFrom()}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-dashed border-border">
              <span className="text-foreground/60">{t('to')}</span>
              <span className="font-semibold text-foreground">{getSummaryTo()}</span>
            </div>
            <div className="flex justify-between text-lg py-3">
              <span className="text-foreground/60">{t('amount')}</span>
              <span className="font-bold text-primary">{getAmountDisplay()}</span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span className="text-foreground/60">{t('fee')}</span>
              <span className="font-semibold text-green-500 flex items-center gap-1">
                {t('free')} <CheckCircle size={12} />
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Bar */}
      {activeStep === 4 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-card border-t border-border">
          <button
            onClick={submitTransfer}
            disabled={submitting || !amount || parseFloat(amount) < 10}
            className="w-full py-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-bold text-base disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send size={18} />}
            {t('confirmTransfer')}
          </button>
        </div>
      )}

      {/* Success Modal */}
      <AnimatePresence>
        {showModal && transferResult && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-md p-6 text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-500" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-2">
                {t('transferComplete')}
              </div>
              <div className="text-sm text-foreground/60 mb-4">
                {trType === "goal2goal"
                  ? t('transferCompleteDesc')
                  : `${getAmountDisplay()} ${t('amountSent')} ${transferResult.toUser || transferResult.toUserName || ''}`}
              </div>
              <div className="bg-background border border-border rounded-xl p-3 space-y-2 text-sm mb-5">
                <div className="flex justify-between">
                  <span className="text-foreground/60">{t('amount')}</span>
                  <span className="font-bold text-primary">{getAmountDisplay()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">{t('from')}</span>
                  <span className="font-semibold">{getSummaryFrom()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">{t('to')}</span>
                  <span className="font-semibold">{getSummaryTo()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/60">{t('transactionId')}</span>
                  <span className="font-mono text-xs">
                    {transferResult.transactionId?.slice(-8) || 'N/A'}
                  </span>
                </div>
              </div>
              <button
                onClick={() => router.push("/dashboard")}
                className="w-full py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
              >
                {t('goToDashboard')}
              </button>
              <button
                onClick={resetTransfer}
                className="w-full py-3 border-2 border-border text-foreground rounded-xl font-semibold hover:border-primary/50 transition"
              >
                {t('makeAnotherTransfer')}
              </button>
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
            className={`fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-full text-sm flex items-center gap-2 ${
              toast.type === "error" ? "bg-red-500" : "bg-green-500"
            } text-white`}
          >
            {toast.type === "error" ? <AlertCircle size={16} /> : <CheckCircle size={16} />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TransferPage;
