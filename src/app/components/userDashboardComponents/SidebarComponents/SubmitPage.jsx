// SubmitPage.jsx - আপডেটেড ভার্শন
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Upload, 
  AlertCircle, 
  CheckCircle,
  Loader2,
  X,
  Target,
  Wallet
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const SubmitPage = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const goalIdFromUrl = searchParams.get("goalId");
  
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(goalIdFromUrl || "");
  const [depositAmount, setDepositAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("bkash");
  const [txnReference, setTxnReference] = useState("");
  const [screenshotFile, setScreenshotFile] = useState(null);
  const [screenshotPreview, setScreenshotPreview] = useState(null);
  const [uploadedScreenshot, setUploadedScreenshot] = useState(null);
  const fileInputRef = useRef(null);

  const paymentMethods = [
    { id: "bkash", name: "bKash", icon: "📱", color: "text-pink-600", bg: "bg-pink-50" },
    { id: "nagad", name: "Nagad", icon: "📱", color: "text-orange-500", bg: "bg-orange-50" },
    { id: "bank", name: "Bank", icon: "🏦", color: "text-blue-600", bg: "bg-blue-50" },
  ];

  // Fetch user's goals
  const fetchGoals = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/goals?status=active");
      if (response.data.success) {
        const activeGoals = response.data.data.goals.filter(
          goal => goal.status === "active" && goal.currentSaved < goal.targetAmount
        );
        setGoals(activeGoals);
        
        if (!goalIdFromUrl && activeGoals.length > 0) {
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

  // Upload screenshot to Cloudinary (similar to profile picture)
  const uploadScreenshot = async (file) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("screenshot", file);  // Field name must be 'screenshot'

    try {
      const response = await axiosInstance.post("/deposits/screenshot", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Upload response:", response.data);

      if (response.data.success) {
        return {
          url: response.data.data.url,
          publicId: response.data.data.publicId,
        };
      }
      throw new Error(response.data.message || "Upload failed");
    } catch (error) {
      console.error("Upload error details:", error);
      console.error("Error response:", error.response?.data);
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshotPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setScreenshotFile(file);
      
      // Auto upload
      try {
        const result = await uploadScreenshot(file);
        setUploadedScreenshot(result);
        Swal.fire({
          title: "Uploaded!",
          text: "Screenshot uploaded successfully",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      } catch (error) {
        setScreenshotFile(null);
        setScreenshotPreview(null);
        Swal.fire({
          title: "Upload Failed",
          text: "Failed to upload screenshot. Please try again.",
          icon: "error",
          confirmButtonColor: "#059669",
        });
      }
    }
  };

  const removeScreenshot = () => {
    setScreenshotFile(null);
    setScreenshotPreview(null);
    setUploadedScreenshot(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!selectedGoal) {
      Swal.fire({
        title: "Error",
        text: "Please select a savings goal",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!depositAmount || parseFloat(depositAmount) < 100) {
      Swal.fire({
        title: "Error",
        text: "Minimum deposit amount is ৳100",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!paymentMethod) {
      Swal.fire({
        title: "Error",
        text: "Please select a payment method",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    if (!uploadedScreenshot) {
      Swal.fire({
        title: "Error",
        text: "Please upload transaction screenshot",
        icon: "error",
        confirmButtonColor: "#059669",
      });
      return;
    }

    setSubmitting(true);

    try {
      const requestData = {
        goalId: selectedGoal,
        depositAmount: parseFloat(depositAmount),
        paymentMethod,
        transactionReference: txnReference || null,
        screenshotUrl: uploadedScreenshot.url,
        screenshotPublicId: uploadedScreenshot.publicId,
      };

      const response = await axiosInstance.post("/deposits", requestData);

      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: "Deposit request submitted successfully. Our team will verify within 2-4 hours.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "View My Deposits",
        }).then((result) => {
          if (result.isConfirmed) {
            router.push("/dashboard/transactions");
          } else {
            // Reset form
            setSelectedGoal(goalIdFromUrl || (goals[0]?._id || ""));
            setDepositAmount("");
            setTxnReference("");
            removeScreenshot();
          }
        });
      }
    } catch (error) {
      console.error("Submit deposit error:", error);
      Swal.fire({
        title: "Error",
        text: error.response?.data?.message || "Failed to submit deposit request",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-64 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">Loading your goals...</p>
        </div>
      </div>
    );
  }

  if (goals.length === 0) {
    return (
      <div className="max-w-3xl">
        <div className="bg-card border border-border rounded-xl p-12 text-center">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-foreground mb-2">No Active Goals</h3>
          <p className="text-foreground/60 mb-4">
            You don't have any active savings goals. Create a goal first to make a deposit.
          </p>
          <button
            onClick={() => router.push("/dashboard/goals")}
            className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition"
          >
            Create a Goal
          </button>
        </div>
      </div>
    );
  }

  const selectedGoalData = goals.find(g => g._id === selectedGoal);

  return (
    <div className="max-w-3xl">
      <h2 className="text-2xl font-bold text-foreground mb-5">Make a Deposit</h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card border border-border rounded-xl p-5"
      >
        {/* Goal Selection */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-foreground/70 mb-2">
            Select Savings Goal
          </label>
          <select
            value={selectedGoal}
            onChange={(e) => setSelectedGoal(e.target.value)}
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
          >
            {goals.map((goal) => (
              <option key={goal._id} value={goal._id}>
                🎯 {goal.goalName} — ৳{goal.targetAmount.toLocaleString()} (Saved: ৳{goal.currentSaved.toLocaleString()})
              </option>
            ))}
          </select>
          {selectedGoalData && (
            <div className="mt-2">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-foreground/60">Progress</span>
                <span className="text-primary font-semibold">{selectedGoalData.progress}%</span>
              </div>
              <div className="h-1.5 bg-border rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                  style={{ width: `${selectedGoalData.progress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Deposit Amount */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-foreground/70 mb-2">
            Deposit Amount (BDT)
          </label>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            min="100"
            step="500"
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
            placeholder="Enter amount (minimum ৳100)"
          />
          {depositAmount && depositAmount < 100 && (
            <p className="text-xs text-red-500 mt-1">Minimum deposit is ৳100</p>
          )}
        </div>

        {/* Payment Method */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-foreground/70 mb-2">
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

        {/* Payment Instructions */}
        <div className="bg-background rounded-xl p-4 mb-4 border border-border">
          <div className="font-semibold text-sm mb-2">Payment Instructions</div>
          <div className="space-y-2 text-sm text-foreground/60">
            <p>📱 Send money to: <strong className="text-primary">018XXXXXXXX</strong></p>
            <p>💳 Amount: <strong className="text-primary">৳{depositAmount || "XXXX"}</strong></p>
            <p>📝 Reference: <strong className="text-primary">{selectedGoalData?.goalName?.toUpperCase().replace(/ /g, "-")}-DEPOSIT</strong></p>
          </div>
        </div>

        {/* Screenshot Upload */}
        <div className="mb-4">
          <label className="block text-sm font-semibold text-foreground/70 mb-2">
            Transaction Screenshot
          </label>
          {!screenshotPreview ? (
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition ${
                uploading ? "opacity-50 cursor-wait" : "hover:border-primary"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
              />
              {uploading ? (
                <div>
                  <Loader2 size={32} className="animate-spin text-primary mx-auto mb-2" />
                  <div className="text-sm text-foreground/60">Uploading...</div>
                </div>
              ) : (
                <div>
                  <Upload size={32} className="text-foreground/40 mx-auto mb-2" />
                  <div className="text-sm text-foreground/60">📎 Upload Screenshot</div>
                  <div className="text-xs text-foreground/40 mt-1">Click to select image (JPEG, PNG)</div>
                </div>
              )}
            </div>
          ) : (
            <div className="relative border-2 border-primary rounded-xl overflow-hidden">
              <img
                src={screenshotPreview}
                alt="Screenshot preview"
                className="w-full h-48 object-contain bg-background"
              />
              <button
                onClick={removeScreenshot}
                className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center hover:bg-red-600 transition"
              >
                <X size={16} />
              </button>
              <div className="absolute bottom-2 left-2 px-2 py-1 bg-primary/90 rounded-lg text-white text-xs">
                Screenshot uploaded
              </div>
            </div>
          )}
        </div>

        {/* Transaction Reference */}
        <div className="mb-5">
          <label className="block text-sm font-semibold text-foreground/70 mb-2">
            Transaction Reference (Optional)
          </label>
          <input
            type="text"
            value={txnReference}
            onChange={(e) => setTxnReference(e.target.value)}
            placeholder="e.g., TXN1234567890 or TRXID123"
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={submitting || uploading || !depositAmount || depositAmount < 100 || !uploadedScreenshot}
          className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <Loader2 size={18} className="animate-spin" />
              Submitting...
            </span>
          ) : (
            "Submit for Verification ✓"
          )}
        </button>

        <p className="text-center text-xs text-foreground/50 mt-3">
          Admin will verify within 2-4 hours
        </p>

        {/* Info Note */}
        <div className="mt-4 p-3 bg-primary/5 border border-primary/15 rounded-lg">
          <div className="flex gap-2">
            <AlertCircle size={16} className="text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-foreground/60">
              Make sure to upload a clear screenshot showing transaction ID and amount.
              Deposits are manually verified by our finance team.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SubmitPage;