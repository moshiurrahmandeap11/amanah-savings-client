"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Moon,
  Sun,
  Download,
  Share2,
  Copy,
  Printer,
  Camera,
  X,
} from "lucide-react";

const InvoicePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const receiptRef = useRef(null);

  const receiptData = {
    bn: {
      back: "← লেনদেন",
      backTitle: "ইনভয়েস",
      header: "🧾 জমার রসিদ",
      receiptSub: "Amanah ডিজিটাল সঞ্চয় কমিউনিটি",
      status: "অনুমোদিত",
      amountLabel: "জমার পরিমাণ",
      amount: "৳৫,০০০",
      goal: "🏠 বাড়ি কেনা লক্ষ্যে জমা",
      rows: [
        ["সদস্যের নাম", "রাহেলা বেগম"],
        ["মোবাইল নম্বর", "+880 1711-234567"],
        ["পেমেন্ট মাধ্যম", "💜 bKash"],
        ["bKash TxID", "BK20260524123"],
        ["জমার তারিখ", "২৫ মে ২০২৬"],
        ["সময়", "সকাল ১০:৩২"],
        ["অনুমোদনের সময়", "সকাল ১০:৪৫"],
        ["অনুমোদনকারী", "Amanah Admin"],
        ["লক্ষ্যের অগ্রগতি", "১৯% → ২১.৫%"],
      ],
      receiptId: "AMN-2026-0524-5000",
      receiptIdSub: "রসিদ নম্বর · ডিজিটাল স্বাক্ষরিত",
      verify: "amanah.com.bd/verify →",
      download: "📥 PDF ডাউনলোড",
      share: "📤 শেয়ার করুন",
      shareTitle: "📤 রসিদ শেয়ার করুন",
      shareItems: [
        "WhatsApp",
        "Facebook",
        "SMS",
        "Email",
        "লিংক কপি",
        "ছবি সেভ",
        "প্রিন্ট",
        "বাতিল",
      ],
    },
    en: {
      back: "← Transactions",
      backTitle: "Invoice",
      header: "🧾 Deposit Receipt",
      receiptSub: "Amanah Digital Savings Community",
      status: "Approved",
      amountLabel: "Deposit Amount",
      amount: "৳5,000",
      goal: "🏠 Deposit toward home goal",
      rows: [
        ["Member Name", "Rahela Begum"],
        ["Mobile Number", "+880 1711-234567"],
        ["Payment Method", "💜 bKash"],
        ["bKash TxID", "BK20260524123"],
        ["Deposit Date", "May 25, 2026"],
        ["Time", "10:32 AM"],
        ["Approval Time", "10:45 AM"],
        ["Approved By", "Amanah Admin"],
        ["Goal Progress", "19% → 21.5%"],
      ],
      receiptId: "AMN-2026-0524-5000",
      receiptIdSub: "Receipt number · digitally signed",
      verify: "amanah.com.bd/verify →",
      download: "📥 Download PDF",
      share: "📤 Share",
      shareTitle: "📤 Share Receipt",
      shareItems: [
        "WhatsApp",
        "Facebook",
        "SMS",
        "Email",
        "Copy Link",
        "Save Image",
        "Print",
        "Cancel",
      ],
    },
  };

  const currentData = receiptData[lang];

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

  const printDocument = () => {
    window.print();
    showToast(lang === "bn" ? "🖨️ প্রিন্ট হচ্ছে..." : "🖨️ Printing...");
  };

  const shareVia = (channel) => {
    setShowShareSheet(false);
    showToast(
      lang === "bn"
        ? `📤 ${channel}-এ শেয়ার হচ্ছে...`
        : `📤 Sharing via ${channel}...`,
    );
  };

  const copyLink = () => {
    setShowShareSheet(false);
    navigator.clipboard.writeText(
      "https://amanahsavings.com.bd/invoice/AMN-2026-0524-5000",
    );
    showToast(lang === "bn" ? "🔗 লিংক কপি হয়েছে!" : "🔗 Link copied!");
  };

  const saveImage = () => {
    setShowShareSheet(false);
    showToast(
      lang === "bn" ? "🖼️ ছবি সংরক্ষণ করা হচ্ছে..." : "🖼️ Saving image...",
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Back Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15 sticky top-0 z-50">
        <Link
          href="/dashboard/transaction-history"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> {currentData.back}
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">
          {currentData.backTitle}
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
        <h1 className="text-white text-lg font-bold flex-1">
          {currentData.header}
        </h1>
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

      <div className="p-4 pb-28">
        {/* Receipt Card */}
        <div className="bg-card border border-border rounded-2xl shadow-lg overflow-hidden mb-4">
          {/* Receipt Top */}
          <div className="bg-linear-to-r from-primary to-primary-light pt-6 pb-5 text-center">
            <div className="text-3xl mb-1">🌿</div>
            <div className="text-white text-base font-bold">
              Amanah Savings Community
            </div>
            <div className="text-white/75 text-xs">
              {currentData.receiptSub}
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold mt-3">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              {currentData.status}
            </div>
          </div>

          {/* Amount Section */}
          <div className="px-5 py-5 text-center border-b border-dashed border-border">
            <div className="text-xs text-foreground/60 mb-1">
              {currentData.amountLabel}
            </div>
            <div className="text-4xl font-bold text-primary">
              {currentData.amount}
            </div>
            <div className="text-sm text-foreground/60 mt-1">
              {currentData.goal}
            </div>
          </div>

          {/* Details Rows */}
          <div className="px-5">
            {currentData.rows.map((row, idx) => (
              <div
                key={idx}
                className="flex justify-between py-3 border-b border-border last:border-0"
              >
                <span className="text-sm text-foreground/60">{row[0]}</span>
                <span className="text-sm font-semibold text-foreground text-right">
                  {row[1]}
                </span>
              </div>
            ))}
          </div>

          {/* Perforation */}
          <div className="flex items-center gap-2 px-4 my-2">
            <div className="w-4 h-4 rounded-full bg-background" />
            <div className="flex-1 border-t-2 border-dashed border-border" />
            <div className="w-4 h-4 rounded-full bg-background" />
          </div>

          {/* Footer */}
          <div className="px-5 py-4 bg-background/50 flex items-center gap-3">
            <div className="w-14 h-14 rounded-lg border-2 border-border flex items-center justify-center text-2xl">
              🔐
            </div>
            <div className="flex-1">
              <div className="font-mono text-sm font-bold text-foreground">
                {currentData.receiptId}
              </div>
              <div className="text-xs text-foreground/50">
                {currentData.receiptIdSub}
              </div>
              <div className="text-xs text-primary font-semibold">
                {currentData.verify}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={printDocument}
            className="py-3.5 rounded-xl bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold flex items-center justify-center gap-2"
          >
            <Download size={16} /> {currentData.download}
          </button>
          <button
            onClick={() => setShowShareSheet(true)}
            className="py-3.5 rounded-xl border-2 border-border bg-card text-foreground text-sm font-bold flex items-center justify-center gap-2"
          >
            <Share2 size={16} /> {currentData.share}
          </button>
        </div>
      </div>

      {/* Share Sheet Modal */}
      <AnimatePresence>
        {showShareSheet && (
          <>
            <div
              className="fixed inset-0 bg-black/60 z-50"
              onClick={() => setShowShareSheet(false)}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl z-50 p-5"
            >
              <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
              <div className="font-bold text-foreground mb-1">
                {currentData.shareTitle}
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {currentData.shareItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (item === "লিংক কপি" || item === "Copy Link")
                        copyLink();
                      else if (item === "ছবি সেভ" || item === "Save Image")
                        saveImage();
                      else if (item === "প্রিন্ট" || item === "Print")
                        printDocument();
                      else if (item === "বাতিল" || item === "Cancel")
                        setShowShareSheet(false);
                      else shareVia(item);
                    }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                      {idx === 0 && "💬"}
                      {idx === 1 && "👤"}
                      {idx === 2 && "📱"}
                      {idx === 3 && "📧"}
                      {idx === 4 && "🔗"}
                      {idx === 5 && "🖼️"}
                      {idx === 6 && "🖨️"}
                      {idx === 7 && "✕"}
                    </div>
                    <span className="text-xs text-foreground/60">{item}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

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

export default InvoicePage;
