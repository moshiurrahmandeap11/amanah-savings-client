"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, Loader2 } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const LiftingPage = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedGoal, setSelectedGoal] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [reason, setReason] = useState("medical");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [bankName, setBankName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [accountHolderName, setAccountHolderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const reasons = [
    { value: "medical", label: "Medical Emergency" },
    { value: "family", label: "Family Emergency" },
    { value: "goal_change", label: "Goal Change" },
    { value: "other", label: "Other" },
  ];

  const paymentMethods = [
    { id: "bkash", name: "bKash", icon: "💜" },
    { id: "nagad", name: "Nagad", icon: "🟠" },
    { id: "bank", name: "Bank", icon: "🏦" },
  ];

  // Fetch user's goals
  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/goals?status=active");
      if (response.data.success) {
        const activeGoals = response.data.data.goals.filter(
          goal => goal.status === "active" && goal.currentSaved > 0
        );
        setGoals(activeGoals);
        if (activeGoals.length > 0) {
          setSelectedGoal(activeGoals[0]._id);
        }
      }
    } catch (error) {
      console.error("Fetch goals error:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 4000);
  };

  const handleSubmit = async () => {
    const amount = parseFloat(withdrawAmount);
    const selectedGoalData = goals.find(g => g._id === selectedGoal);

    // Validation
    if (!selectedGoal) {
      showToast("⚠️ Please select a goal");
      return;
    }

    if (!withdrawAmount || amount < 100) {
      showToast("⚠️ Please withdraw at least ৳100");
      return;
    }

    if (amount > selectedGoalData?.currentSaved) {
      showToast(`⚠️ Amount exceeds your saved balance of ৳${selectedGoalData.currentSaved.toLocaleString()}`);
      return;
    }

    if (!reason) {
      showToast("⚠️ Please select a reason");
      return;
    }

    if (paymentMethod === "bkash" || paymentMethod === "nagad") {
      if (!phoneNumber || phoneNumber.length !== 10) {
        showToast(`⚠️ Please enter a valid ${paymentMethod === "bkash" ? "bKash" : "Nagad"} number`);
        return;
      }
    }

    if (paymentMethod === "bank") {
      if (!bankName) {
        showToast("⚠️ Please select a bank");
        return;
      }
      if (!accountNumber) {
        showToast("⚠️ Please enter account number");
        return;
      }
      if (!accountHolderName) {
        showToast("⚠️ Please enter account holder name");
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const requestData = {
        goalId: selectedGoal,
        withdrawalAmount: amount,
        reason,
        paymentMethod,
      };

      // Add payment method specific fields
      if (paymentMethod === "bkash" || paymentMethod === "nagad") {
        requestData.phoneNumber = phoneNumber;
      }

      if (paymentMethod === "bank") {
        requestData.bankName = bankName;
        requestData.accountNumber = accountNumber;
        requestData.accountHolderName = accountHolderName;
      }

      const response = await axiosInstance.post("/withdrawals", requestData);

      if (response.data.success) {
        Swal.fire({
          title: "Request Submitted!",
          text: "Your withdrawal request has been submitted. Admin will review within 5-7 working days.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        }).then(() => {
          // Reset form
          setWithdrawAmount("");
          setPhoneNumber("");
          setBankName("");
          setAccountNumber("");
          setAccountHolderName("");
          setReason("medical");
        });
      }
    } catch (error) {
      console.error("Submit withdrawal error:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to submit withdrawal request",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedGoalData = goals.find(g => g._id === selectedGoal);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading your goals...</p>
        </div>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="max-w-3xl">
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">💰</div>
          <h3 className="text-xl font-bold text-foreground mb-2">No Active Goals</h3>
          <p className="text-foreground/60 mb-4">
            You don't have any active savings goals with funds to withdraw.
          </p>
          <button
            onClick={() => window.location.href = "/dashboard/goals"}
            className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            Create a Goal
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl">
        <h2 className="text-2xl font-bold text-foreground mb-2">Withdrawal Request</h2>

        {/* Warning Box */}
        <div className="p-4 bg-amber-500/5 border border-amber-500/20 rounded-xl mb-5">
          <div className="flex gap-2">
            <AlertTriangle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div className="text-sm text-foreground/70 leading-relaxed">
              <strong>Important:</strong> Savings are locked until goal maturity. 
              Early withdrawal requires admin approval and takes 5-7 working days.
            </div>
          </div>
        </div>

        {/* Goals List Card */}
        <div className="bg-card border border-border rounded-xl p-5 mb-5">
          <div className="font-bold text-foreground mb-4">Your Goals</div>
          <div className="space-y-3">
            {goals.map((goal) => (
              <div
                key={goal._id}
                className="p-3 bg-background rounded-lg border border-border flex items-center gap-3"
              >
                <span className="text-2xl">{goal.goalType === "wedding" ? "💒" : goal.goalType === "education" ? "📚" : "🎯"}</span>
                <div className="flex-1">
                  <div className="font-semibold text-sm text-foreground">{goal.goalName}</div>
                  <div className="text-xs text-foreground/50">
                    Saved: ৳{goal.currentSaved.toLocaleString()} · Target: ৳{goal.targetAmount.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-amber-500/10 text-amber-500 rounded-md font-semibold">
                  Locked
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Withdrawal Request Form */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">🆘 Emergency Withdrawal Request</div>

          {/* Select Goal */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
              Select Goal
            </label>
            <select
              value={selectedGoal}
              onChange={(e) => setSelectedGoal(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
            >
              {goals.map((goal) => (
                <option key={goal._id} value={goal._id}>
                  🎯 {goal.goalName} — ৳{goal.currentSaved.toLocaleString()} saved
                </option>
              ))}
            </select>
          </div>

          {/* Withdrawal Amount */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
              Withdrawal Amount (BDT)
            </label>
            <input
              type="number"
              value={withdrawAmount}
              onChange={(e) => setWithdrawAmount(e.target.value)}
              min="100"
              max={selectedGoalData?.currentSaved}
              placeholder="Enter amount"
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
            />
            {selectedGoalData && withdrawAmount > selectedGoalData.currentSaved && (
              <p className="text-xs text-red-500 mt-1">
                Amount exceeds your saved balance of ৳{selectedGoalData.currentSaved.toLocaleString()}
              </p>
            )}
            {selectedGoalData && (
              <p className="text-xs text-foreground/50 mt-1">
                Available balance: ৳{selectedGoalData.currentSaved.toLocaleString()}
              </p>
            )}
          </div>

          {/* Reason */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
              Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
            >
              {reasons.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>
          </div>

          {/* Payment Method */}
          <div className="mb-4">
            <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
              Payment Method
            </label>
            <div className="grid grid-cols-3 gap-3">
              {paymentMethods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id)}
                  className={`py-3 rounded-xl border-2 text-center transition ${
                    paymentMethod === method.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary"
                  }`}
                >
                  <div className="text-2xl mb-1">{method.icon}</div>
                  <div className={`text-xs font-semibold ${paymentMethod === method.id ? "text-primary" : "text-foreground/70"}`}>
                    {method.name}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Phone Number (for mobile banking) */}
          {(paymentMethod === "bkash" || paymentMethod === "nagad") && (
            <div className="mb-5">
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                {paymentMethod === "bkash" ? "bKash" : "Nagad"} Number
              </label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-background text-foreground/60 text-sm">
                  +880
                </span>
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 11))}
                  placeholder="1XXXXXXXXX"
                  className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
              <p className="text-xs text-foreground/50 mt-1">Enter 11-digit number (e.g., 1712345678)</p>
            </div>
          )}

          {/* Bank Fields */}
          {paymentMethod === "bank" && (
            <div className="mb-5 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  Bank Name
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                >
                  <option value="">Select Bank</option>
                  <option value="DBBL">Dutch-Bangla Bank (DBBL)</option>
                  <option value="BRAC">BRAC Bank</option>
                  <option value="Islami">Islami Bank Bangladesh</option>
                  <option value="Sonali">Sonali Bank</option>
                  <option value="Janata">Janata Bank</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  Account Number
                </label>
                <input
                  type="text"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  placeholder="Enter account number"
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  placeholder="Enter account holder name"
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 size={18} className="animate-spin" />
                Submitting...
              </span>
            ) : (
              "Send Withdrawal Request"
            )}
          </button>

          <p className="text-center text-xs text-foreground/50 mt-3">
            Admin will review within 5-7 working days
          </p>
        </div>
      </div>

      {/* Toast Notification */}
      {toast.show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-lg shadow-lg text-sm ${
            toast.type === "error" ? "bg-red-500" : "bg-green-500"
          } text-white`}
        >
          {toast.message}
        </motion.div>
      )}
    </>
  );
};

export default LiftingPage;