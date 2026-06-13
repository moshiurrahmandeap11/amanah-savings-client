"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Moon,
  Sun,
  CheckCircle,
  Clock,
  AlertCircle,
  XCircle,
  HelpCircle,
} from "lucide-react";

const KycStatusPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [currentState, setCurrentState] = useState("reviewing");
  const [toast, setToast] = useState({ show: false, message: "" });

  const states = ["pending", "reviewing", "approved", "rejected"];

  const content = {
    bn: {
      back: "← ড্যাশবোর্ড",
      backTitle: "KYC স্ট্যাটাস",
      header: "🪪 KYC যাচাইকরণ",
      tabs: ["⏳ অপেক্ষমাণ", "🔍 পর্যালোচনা", "✅ অনুমোদিত", "❌ প্রত্যাখ্যাত"],
      sectionTitles: [
        "📍 যাচাইকরণ অগ্রগতি",
        "📄 জমাকৃত কাগজপত্র",
        "📊 অ্যাকাউন্ট সীমা",
      ],
      steps: [
        {
          title: "নিবন্ধন সম্পন্ন",
          sub: "ফোন নম্বর ও OTP যাচাইকৃত",
          time: "✅ সম্পন্ন — ২ মে, ২০২৬ সকাল ১০:২৩",
        },
        {
          title: "NID আপলোড",
          sub: "জাতীয় পরিচয়পত্রের সামনে ও পিছনের ছবি",
          time: "✅ সম্পন্ন — ২ মে, ২০২৬ সকাল ১০:৩১",
        },
        {
          title: "সেলফি যাচাই",
          sub: "লাইভনেস ডিটেকশন ও ফেস ম্যাচিং",
          time: "✅ সম্পন্ন — ২ মে, ২০২৬ সকাল ১০:৩৪",
        },
        {
          title: "ম্যানুয়াল পর্যালোচনা",
          sub: "আমাদের দল কাগজপত্র যাচাই করছে",
          time: "⏱️ প্রক্রিয়াধীন — আনুমানিক ২-৪ ঘণ্টা",
        },
        {
          title: "অ্যাকাউন্ট সক্রিয়করণ",
          sub: "সম্পূর্ণ সুবিধা আনলক হবে",
          time: "⏳ অপেক্ষমাণ",
        },
      ],
      docs: [
        {
          badge: "✓ ঠিক আছে",
          badgeClass: "ok",
          icon: "🪪",
          name: "NID সামনের দিক",
        },
        {
          badge: "✓ ঠিক আছে",
          badgeClass: "ok",
          icon: "🪪",
          name: "NID পিছনের দিক",
        },
        { badge: "✓ ম্যাচ", badgeClass: "ok", icon: "🤳", name: "সেলফি ছবি" },
        {
          badge: "⏱️ যাচাই",
          badgeClass: "pending",
          icon: "📋",
          name: "আবেদনপত্র",
        },
      ],
      limitsHead: ["সুবিধা", "বর্তমান সীমা", "KYC পরে"],
      limits: [
        ["দৈনিক জমা", "৳৫,০০০", "৳৫০,০০০"],
        ["মাসিক উত্তোলন", "৳২০,০০০", "৳২,০০,০০০"],
        ["সক্রিয় লক্ষ্য", "৩টি", "অসীমিত"],
        ["রেফারেল বোনাস", "৳২৫০", "৳৫০০"],
        ["পারিবারিক সার্কেল", "❌", "✅"],
      ],
      stateData: {
        pending: {
          icon: "📋",
          circleClass: "pending",
          badgeClass: "pending",
          badge: "📋 জমা দেওয়া হয়েছে",
          title: "আপনার কাগজপত্র জমা হয়েছে",
          sub: "আমাদের দল শীঘ্রই আপনার KYC পর্যালোচনা শুরু করবে।",
          infoType: "warning",
          infoIcon: "⏳",
          infoTitle: "পর্যালোচনার অপেক্ষায়",
          infoText:
            "আপনার আবেদন সফলভাবে জমা হয়েছে। ২৪ ঘণ্টার মধ্যে পর্যালোচনা শুরু হবে।",
          trackPct: "55%",
          dot4Icon: "🔍",
          dot5Icon: "🔓",
          dot4Time: "⏳ অপেক্ষমাণ",
          dot5Time: "⏳ অপেক্ষমাণ",
        },
        reviewing: {
          icon: "⏳",
          circleClass: "reviewing",
          badgeClass: "reviewing",
          badge: "🔍 পর্যালোচনা চলছে",
          title: "আপনার KYC যাচাই হচ্ছে",
          sub: "আমাদের দল আপনার কাগজপত্র পর্যালোচনা করছে। সাধারণত ২৪-৪৮ ঘণ্টা সময় লাগে।",
          infoType: "info",
          infoIcon: "🔍",
          infoTitle: "পর্যালোচনা চলছে",
          infoText:
            "আপনার NID এবং সেলফি আমাদের AI সিস্টেম দ্বারা পরীক্ষা করা হচ্ছে। কোনো পদক্ষেপ নেওয়ার প্রয়োজন নেই।",
          trackPct: "75%",
          dot4Class: "active",
          dot4Icon: "🔍",
          dot4Time: "⏱️ প্রক্রিয়াধীন — আনুমানিক ২-৪ ঘণ্টা",
          dot5Icon: "🔓",
          dot5Time: "⏳ অপেক্ষমাণ",
        },
        approved: {
          icon: "✅",
          circleClass: "approved",
          badgeClass: "approved",
          badge: "✅ অনুমোদিত",
          title: "KYC সফলভাবে যাচাইকৃত!",
          sub: "অভিনন্দন! আপনার পরিচয় যাচাই সম্পন্ন হয়েছে। সম্পূর্ণ সুবিধা এখন উপলব্ধ।",
          infoType: "success",
          infoIcon: "🎉",
          infoTitle: "অ্যাকাউন্ট সম্পূর্ণ সক্রিয়!",
          infoText:
            "আপনার KYC অনুমোদিত হয়েছে। সকল সীমা আনলক হয়েছে এবং আপনি সম্পূর্ণ সুবিধা উপভোগ করতে পারবেন।",
          trackPct: "100%",
          dot4Class: "done",
          dot4Icon: "✓",
          dot4Time: "✅ অনুমোদিত",
          dot5Class: "done",
          dot5Icon: "✓",
          dot5Time: "✅ অ্যাকাউন্ট সক্রিয়",
        },
        rejected: {
          icon: "❌",
          circleClass: "rejected",
          badgeClass: "rejected",
          badge: "❌ প্রত্যাখ্যাত",
          title: "যাচাই সফল হয়নি",
          sub: "দুঃখিত, আপনার কাগজপত্র গ্রহণযোগ্য হয়নি। নতুনভাবে জমা দিন।",
          infoType: "error",
          infoIcon: "⚠️",
          infoTitle: "কারণ: ছবি অস্পষ্ট",
          infoText:
            "আপনার NID ছবি স্পষ্ট নয়। দয়া করে ভালো আলোতে পুনরায় ছবি তুলুন এবং জমা দিন।",
          trackPct: "55%",
          dot4Class: "failed",
          dot4Icon: "✗",
          dot4Time: "❌ প্রত্যাখ্যাত",
          dot5Icon: "🔓",
          dot5Time: "⏳ অপেক্ষমাণ",
        },
      },
    },
    en: {
      back: "← Dashboard",
      backTitle: "KYC Status",
      header: "🪪 KYC Verification",
      tabs: ["⏳ Pending", "🔍 Reviewing", "✅ Approved", "❌ Rejected"],
      sectionTitles: [
        "📍 Verification Progress",
        "📄 Submitted Documents",
        "📊 Account Limits",
      ],
      steps: [
        {
          title: "Registration Complete",
          sub: "Phone number and OTP verified",
          time: "✅ Completed — May 2, 2026 10:23 AM",
        },
        {
          title: "NID Uploaded",
          sub: "Front and back images of the national ID",
          time: "✅ Completed — May 2, 2026 10:31 AM",
        },
        {
          title: "Selfie Verification",
          sub: "Liveness detection and face matching",
          time: "✅ Completed — May 2, 2026 10:34 AM",
        },
        {
          title: "Manual Review",
          sub: "Our team is checking the documents",
          time: "⏱️ In progress — about 2-4 hours",
        },
        {
          title: "Account Activation",
          sub: "Full benefits will be unlocked",
          time: "⏳ Pending",
        },
      ],
      docs: [
        { badge: "✓ OK", badgeClass: "ok", icon: "🪪", name: "NID front side" },
        { badge: "✓ OK", badgeClass: "ok", icon: "🪪", name: "NID back side" },
        {
          badge: "✓ Match",
          badgeClass: "ok",
          icon: "🤳",
          name: "Selfie photo",
        },
        {
          badge: "⏱️ Checking",
          badgeClass: "pending",
          icon: "📋",
          name: "Application form",
        },
      ],
      limitsHead: ["Benefit", "Current Limit", "After KYC"],
      limits: [
        ["Daily Deposit", "৳5,000", "৳50,000"],
        ["Monthly Withdrawal", "৳20,000", "৳200,000"],
        ["Active Goals", "3", "Unlimited"],
        ["Referral Bonus", "৳250", "৳500"],
        ["Family Circle", "❌", "✅"],
      ],
      stateData: {
        pending: {
          icon: "📋",
          circleClass: "pending",
          badgeClass: "pending",
          badge: "📋 Submitted",
          title: "Your documents have been submitted",
          sub: "Our team will start reviewing your KYC soon.",
          infoType: "warning",
          infoIcon: "⏳",
          infoTitle: "Waiting for review",
          infoText:
            "Your application was submitted successfully. Review will start within 24 hours.",
          trackPct: "55%",
          dot4Icon: "🔍",
          dot5Icon: "🔓",
          dot4Time: "⏳ Pending",
          dot5Time: "⏳ Pending",
        },
        reviewing: {
          icon: "⏳",
          circleClass: "reviewing",
          badgeClass: "reviewing",
          badge: "🔍 Under review",
          title: "Your KYC is being verified",
          sub: "Our team is reviewing your documents. This usually takes 24-48 hours.",
          infoType: "info",
          infoIcon: "🔍",
          infoTitle: "Review in progress",
          infoText:
            "Your NID and selfie are being checked by our AI system. No action is required.",
          trackPct: "75%",
          dot4Class: "active",
          dot4Icon: "🔍",
          dot4Time: "⏱️ In progress — about 2-4 hours",
          dot5Icon: "🔓",
          dot5Time: "⏳ Pending",
        },
        approved: {
          icon: "✅",
          circleClass: "approved",
          badgeClass: "approved",
          badge: "✅ Approved",
          title: "KYC verified successfully!",
          sub: "Congratulations! Your identity verification is complete. Full benefits are now available.",
          infoType: "success",
          infoIcon: "🎉",
          infoTitle: "Account fully active!",
          infoText:
            "Your KYC has been approved. All limits are unlocked and you can use every feature.",
          trackPct: "100%",
          dot4Class: "done",
          dot4Icon: "✓",
          dot4Time: "✅ Approved",
          dot5Class: "done",
          dot5Icon: "✓",
          dot5Time: "✅ Account active",
        },
        rejected: {
          icon: "❌",
          circleClass: "rejected",
          badgeClass: "rejected",
          badge: "❌ Rejected",
          title: "Verification was not successful",
          sub: "Sorry, your documents were not accepted. Please submit them again.",
          infoType: "error",
          infoIcon: "⚠️",
          infoTitle: "Reason: image is blurry",
          infoText:
            "Your NID image is not clear. Please retake it in good light and submit again.",
          trackPct: "55%",
          dot4Class: "failed",
          dot4Icon: "✗",
          dot4Time: "❌ Rejected",
          dot5Icon: "🔓",
          dot5Time: "⏳ Pending",
        },
      },
    },
  };

  const data = content[lang];
  const stateData = data.stateData[currentState];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case "warning":
        return <AlertCircle size={24} className="text-amber-500" />;
      case "info":
        return <HelpCircle size={24} className="text-blue-500" />;
      case "success":
        return <CheckCircle size={24} className="text-green-500" />;
      case "error":
        return <XCircle size={24} className="text-red-500" />;
      default:
        return <Clock size={24} className="text-primary" />;
    }
  };

  const getDotClass = (stepClass) => {
    if (stepClass === "done") return "bg-success text-white border-success";
    if (stepClass === "active")
      return "bg-white border-warning text-warning animate-pulse";
    if (stepClass === "failed") return "bg-danger text-white border-danger";
    return "bg-card border-border";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15 sticky top-0 z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> {data.back}
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">
          {data.backTitle}
        </span>
      </div>

      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary-light px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1">{data.header}</h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white text-xs font-bold"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
      </div>

      {/* Status Hero */}
      <div className="bg-linear-to-r from-primary to-primary-light px-5 pb-6 text-center">
        <div
          className={`w-24 h-24 rounded-full mx-auto mb-4 flex items-center justify-center text-4xl border-4 border-white/40
          ${
            stateData.circleClass === "reviewing"
              ? "bg-blue-500/30 animate-pulse"
              : stateData.circleClass === "approved"
                ? "bg-green-500/30"
                : stateData.circleClass === "rejected"
                  ? "bg-red-500/30"
                  : "bg-amber-500/30"
          }`}
        >
          {stateData.icon}
        </div>
        <div
          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold mb-2
          ${
            stateData.badgeClass === "pending"
              ? "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400"
              : stateData.badgeClass === "reviewing"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                : stateData.badgeClass === "approved"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                  : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
          }`}
        >
          {stateData.badge}
        </div>
        <div className="text-white text-xl font-bold mb-1">
          {stateData.title}
        </div>
        <div className="text-white/80 text-sm whitespace-pre-line">
          {stateData.sub}
        </div>
      </div>

      {/* Demo Tabs */}
      <div className="flex gap-0 bg-card border-b border-border overflow-x-auto">
        {states.map((state, idx) => (
          <button
            key={state}
            onClick={() => setCurrentState(state)}
            className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition ${
              currentState === state
                ? "text-primary border-primary"
                : "text-foreground/50 border-transparent"
            }`}
          >
            {data.tabs[idx]}
          </button>
        ))}
      </div>

      <div className="p-4 pb-24">
        {/* Info Banner */}
        <div
          className={`rounded-xl p-4 mb-4 flex gap-3 ${
            stateData.infoType === "warning"
              ? "bg-amber-50 border border-amber-200 dark:bg-amber-950/30 dark:border-amber-800"
              : stateData.infoType === "info"
                ? "bg-blue-50 border border-blue-200 dark:bg-blue-950/30 dark:border-blue-800"
                : stateData.infoType === "success"
                  ? "bg-green-50 border border-green-200 dark:bg-green-950/30 dark:border-green-800"
                  : "bg-red-50 border border-red-200 dark:bg-red-950/30 dark:border-red-800"
          }`}
        >
          <div className="text-2xl">{stateData.infoIcon}</div>
          <div>
            <div className="font-bold text-foreground text-sm">
              {stateData.infoTitle}
            </div>
            <div className="text-sm text-foreground/60">
              {stateData.infoText}
            </div>
          </div>
        </div>

        {/* Progress Track */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow">
          <div className="font-bold text-foreground mb-4">
            {data.sectionTitles[0]}
          </div>
          <div className="relative pl-6">
            <div className="absolute left-4.5 top-0 bottom-0 w-0.5 bg-border" />
            <div
              className="absolute left-4.5 top-0 w-0.5 bg-linear-to-b from-primary to-primary-light transition-all duration-700"
              style={{ height: stateData.trackPct }}
            />

            {data.steps.map((step, idx) => {
              let dotClass =
                "w-9 h-9 rounded-full border-3 flex items-center justify-center text-sm relative z-10 bg-card";
              let dotContent = "";
              let timeClass = "text-xs text-foreground/50";

              if (idx === 3 && stateData.dot4Class) {
                if (stateData.dot4Class === "done") {
                  dotClass += " bg-success border-success text-white";
                  dotContent = "✓";
                  timeClass = "text-success";
                } else if (stateData.dot4Class === "active") {
                  dotClass += " border-warning text-warning animate-pulse";
                  dotContent = stateData.dot4Icon;
                  timeClass = "text-warning";
                } else if (stateData.dot4Class === "failed") {
                  dotClass += " bg-danger border-danger text-white";
                  dotContent = "✗";
                  timeClass = "text-danger";
                } else {
                  dotClass += " border-border";
                  dotContent = stateData.dot4Icon;
                }
              } else if (idx === 4 && stateData.dot5Class === "done") {
                dotClass += " bg-success border-success text-white";
                dotContent = "✓";
                timeClass = "text-success";
              } else if (idx < 3) {
                dotClass += " bg-success border-success text-white";
                dotContent = "✓";
                timeClass = "text-success";
              } else {
                dotClass += " border-border";
                dotContent =
                  idx === 3
                    ? stateData.dot4Icon || "🔍"
                    : stateData.dot5Icon || "🔓";
              }

              let timeText = step.time;
              if (idx === 3 && stateData.dot4Time)
                timeText = stateData.dot4Time;
              if (idx === 4 && stateData.dot5Time)
                timeText = stateData.dot5Time;

              return (
                <div key={idx} className="flex gap-4 pb-6 last:pb-0 relative">
                  <div className={dotClass}>{dotContent}</div>
                  <div className="flex-1 pt-1">
                    <div className="font-bold text-sm text-foreground">
                      {step.title}
                    </div>
                    <div className="text-xs text-foreground/60 mt-0.5">
                      {step.sub}
                    </div>
                    <div
                      className={`text-xs mt-1.5 ${timeClass === "text-success" ? "text-green-500" : timeClass === "text-warning" ? "text-amber-500" : timeClass === "text-danger" ? "text-red-500" : "text-foreground/50"}`}
                    >
                      {timeText}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submitted Documents */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow">
          <div className="font-bold text-foreground mb-4">
            {data.sectionTitles[1]}
          </div>
          <div className="grid grid-cols-2 gap-3">
            {data.docs.map((doc, idx) => (
              <div
                key={idx}
                className="border-2 border-border rounded-xl p-3 text-center relative"
              >
                <div
                  className={`absolute top-2 right-2 px-2 py-0.5 rounded-full text-[9px] font-bold
                  ${
                    doc.badgeClass === "ok"
                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                  }`}
                >
                  {doc.badge}
                </div>
                <div className="text-3xl mb-2">{doc.icon}</div>
                <div className="font-semibold text-xs text-foreground">
                  {doc.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Account Limits */}
        <div className="bg-card border border-border rounded-xl p-5 mb-4 shadow">
          <div className="font-bold text-foreground mb-4">
            {data.sectionTitles[2]}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  {data.limitsHead.map((head, idx) => (
                    <th
                      key={idx}
                      className="py-2 px-3 text-left text-xs font-semibold text-foreground/60 uppercase"
                    >
                      {head}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.limits.map((row, idx) => (
                  <tr
                    key={idx}
                    className="border-b border-border last:border-0"
                  >
                    <td className="py-3 px-3 text-sm text-foreground">
                      {row[0]}
                    </td>
                    <td
                      className={`py-3 px-3 text-sm ${currentState !== "approved" ? "text-red-500" : "text-green-500"}`}
                    >
                      {row[1]}
                    </td>
                    <td className="py-3 px-3 text-sm text-green-500">
                      {row[2]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() =>
              showToast(
                lang === "bn"
                  ? "📞 সাপোর্ট: 01700-000000"
                  : "📞 Support: 01700-000000",
              )
            }
            className="flex-1 py-3 rounded-xl border-2 border-border text-foreground text-sm font-bold hover:border-primary transition"
          >
            {lang === "bn" ? "সাহায্য নিন" : "Get Help"}
          </button>
          <button
            onClick={() =>
              showToast(
                lang === "bn"
                  ? "📧 আপডেট পাঠানো হবে"
                  : "📧 Updates will be sent",
              )
            }
            className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold"
          >
            {lang === "bn" ? "আপডেট পান" : "Get Updates"}
          </button>
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

export default KycStatusPage;
