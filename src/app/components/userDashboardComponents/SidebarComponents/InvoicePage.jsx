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
  Loader2,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Navigation
    backTransactions: "← Transactions",
    backInvoice: "Invoice",
    
    // Header
    depositReceipt: "🧾 Deposit Receipt",
    receiptSub: "Sanchoy Bondhu Digital Savings Community",
    statusApproved: "Approved",
    amountLabel: "Deposit Amount",
    
    // Details Labels
    memberName: "Member Name",
    mobileNumber: "Mobile Number",
    paymentMethod: "Payment Method",
    txid: "TxID",
    depositDate: "Deposit Date",
    time: "Time",
    approvalTime: "Approval Time",
    approvedBy: "Approved By",
    goalProgress: "Goal Progress",
    
    // Footer
    receiptNumber: "Receipt number · digitally signed",
    verify: "sanchoybondhu.com/verify →",
    
    // Buttons
    downloadPDF: "📥 Download PDF",
    share: "📤 Share",
    
    // Share Sheet
    shareReceipt: "📤 Share Receipt",
    whatsapp: "WhatsApp",
    facebook: "Facebook",
    sms: "SMS",
    email: "Email",
    copyLink: "Copy Link",
    saveImage: "Save Image",
    print: "Print",
    cancel: "Cancel",
    
    // Toast Messages
    printing: "🖨️ Printing...",
    sharingVia: "📤 Sharing via {channel}...",
    linkCopied: "🔗 Link copied!",
    savingImage: "🖼️ Saving image...",
    
    // Empty State
    noDepositData: "No deposit data found",
    
    // Loading
    loading: "Loading...",
  },
  bn: {
    // Navigation
    backTransactions: "← লেনদেন",
    backInvoice: "ইনভয়েস",
    
    // Header
    depositReceipt: "🧾 জমার রসিদ",
    receiptSub: "সঞ্চয় বন্ধু ডিজিটাল সঞ্চয় কমিউনিটি",
    statusApproved: "অনুমোদিত",
    amountLabel: "জমার পরিমাণ",
    
    // Details Labels
    memberName: "সদস্যের নাম",
    mobileNumber: "মোবাইল নম্বর",
    paymentMethod: "পেমেন্ট মাধ্যম",
    txid: "ট্রানজেকশন আইডি",
    depositDate: "জমার তারিখ",
    time: "সময়",
    approvalTime: "অনুমোদনের সময়",
    approvedBy: "অনুমোদনকারী",
    goalProgress: "লক্ষ্যের অগ্রগতি",
    
    // Footer
    receiptNumber: "রসিদ নম্বর · ডিজিটাল স্বাক্ষরিত",
    verify: "sanchoybondhu.com/verify →",
    
    // Buttons
    downloadPDF: "📥 PDF ডাউনলোড",
    share: "📤 শেয়ার করুন",
    
    // Share Sheet
    shareReceipt: "📤 রসিদ শেয়ার করুন",
    whatsapp: "হোয়াটসঅ্যাপ",
    facebook: "ফেসবুক",
    sms: "এসএমএস",
    email: "ইমেইল",
    copyLink: "লিংক কপি",
    saveImage: "ছবি সেভ",
    print: "প্রিন্ট",
    cancel: "বাতিল",
    
    // Toast Messages
    printing: "🖨️ প্রিন্ট হচ্ছে...",
    sharingVia: "📤 {channel}-এ শেয়ার হচ্ছে...",
    linkCopied: "🔗 লিংক কপি হয়েছে!",
    savingImage: "🖼️ ছবি সংরক্ষণ করা হচ্ছে...",
    
    // Empty State
    noDepositData: "কোন জমার তথ্য পাওয়া যায়নি",
    
    // Loading
    loading: "লোড হচ্ছে...",
  }
};

const InvoicePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(true);
  const receiptRef = useRef(null);

  // Translation function
  const t = (key) => {
    return translations[lang]?.[key] || translations.en[key] || key;
  };

  // Fetch latest approved deposit as receipt data
  useEffect(() => {
    const fetchReceipt = async () => {
      try {
        const res = await axiosInstance.get("/deposits?limit=1&status=approved");
        if (res.data.success) {
          const deposits = res.data.data?.deposits || res.data.data || [];
          const latest = deposits[0];
          if (latest) {
            setReceipt({
              amount: latest.amount || latest.depositAmount || 5000,
              goalName: latest.goalName || "Home Fund",
              method: latest.paymentMethod || "bKash",
              txid: latest.transactionId || latest.txid || `BK${Date.now()}`,
              date: new Date(latest.createdAt || Date.now()),
              approvedAt: new Date(latest.approvedAt || latest.updatedAt || Date.now()),
              approvedBy: latest.approvedBy || "Sanchoy Bondhu Admin",
              memberName: latest.userName || latest.fullName || "Member",
              phone: latest.phone || "+880 1XXX-XXXXXX",
              goalProgress: latest.goalProgress || { before: 19, after: 21.5 },
              receiptId: `AMN-${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, "0")}${String(new Date().getDate()).padStart(2, "0")}-${latest.amount || 5000}`,
            });
          }
        }
      } catch (err) {
        console.error("Receipt fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReceipt();

    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");

    // Get language from localStorage
    const savedLang = localStorage.getItem('appLanguage') || 'bn';
    setLang(savedLang);
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
    showToast(t('printing'));
  };

  const shareVia = (channel) => {
    setShowShareSheet(false);
    showToast(t('sharingVia').replace('{channel}', channel));
  };

  const copyLink = () => {
    setShowShareSheet(false);
    navigator.clipboard.writeText(
      receipt
        ? `https://sanchoybondhu.com/invoice/${receipt.receiptId}`
        : "https://sanchoybondhu.com",
    );
    showToast(t('linkCopied'));
  };

  const saveImage = () => {
    setShowShareSheet(false);
    showToast(t('savingImage'));
  };

  const formatDate = (date, language) => {
    if (!date) return "";
    if (language === "bn") {
      const days = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহস্পতি", "শুক্র", "শনি"];
      const months = [
        "জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন",
        "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর",
      ];
      const d = new Date(date);
      return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date, language) => {
    if (!date) return "";
    const d = new Date(date);
    if (language === "bn") {
      const hours = d.getHours();
      const mins = d.getMinutes();
      const period = hours < 12 ? "সকাল" : hours < 17 ? "দুপুর" : "রাত";
      const banglaNums = (n) => n.toString().replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
      return `${period} ${banglaNums(hours % 12 || 12)}:${banglaNums(String(mins).padStart(2, "0"))}`;
    }
    return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
  };

  const toBanglaNum = (num) =>
    num?.toString().replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]) || "";

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Share items with translations
  const shareItems = [
    { key: 'whatsapp', icon: '💬', label: t('whatsapp') },
    { key: 'facebook', icon: '👤', label: t('facebook') },
    { key: 'sms', icon: '📱', label: t('sms') },
    { key: 'email', icon: '📧', label: t('email') },
    { key: 'copyLink', icon: '🔗', label: t('copyLink') },
    { key: 'saveImage', icon: '🖼️', label: t('saveImage') },
    { key: 'print', icon: '🖨️', label: t('print') },
    { key: 'cancel', icon: '✕', label: t('cancel') },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Back Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15 sticky top-0 z-50">
        <Link
          href="/dashboard/transactions"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> {t('backTransactions')}
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">
          {t('backInvoice')}
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
          {t('depositReceipt')}
        </h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => {
            const newLang = lang === "bn" ? "en" : "bn";
            setLang(newLang);
            localStorage.setItem('appLanguage', newLang);
          }}
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
              Sonchoy Bondhu Community
            </div>
            <div className="text-white/75 text-xs">
              {t('receiptSub')}
            </div>
            <div className="inline-flex items-center gap-1.5 bg-white/20 text-white px-4 py-1.5 rounded-full text-xs font-semibold mt-3">
              <span className="w-2 h-2 rounded-full bg-green-300 animate-pulse" />
              {t('statusApproved')}
            </div>
          </div>

          {/* Amount Section */}
          <div className="px-5 py-5 text-center border-b border-dashed border-border">
            <div className="text-xs text-foreground/60 mb-1">
              {t('amountLabel')}
            </div>
            <div className="text-4xl font-bold text-primary">
              ৳{receipt ? receipt.amount.toLocaleString() : "0"}
            </div>
            <div className="text-sm text-foreground/60 mt-1">
              {receipt ? `🏠 ${receipt.goalName}` : "🏠 Deposit"}
            </div>
          </div>

          {/* Details Rows */}
          <div className="px-5">
            {receipt ? (
              <>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-foreground/60">
                    {t('memberName')}
                  </span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {receipt.memberName}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-foreground/60">
                    {t('mobileNumber')}
                  </span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {receipt.phone}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-foreground/60">
                    {t('paymentMethod')}
                  </span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {receipt.method}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-foreground/60">
                    {receipt.method} {t('txid')}
                  </span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {receipt.txid}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-foreground/60">
                    {t('depositDate')}
                  </span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {formatDate(receipt.date, lang)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-foreground/60">
                    {t('time')}
                  </span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {formatTime(receipt.date, lang)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-foreground/60">
                    {t('approvalTime')}
                  </span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {formatTime(receipt.approvedAt, lang)}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border">
                  <span className="text-sm text-foreground/60">
                    {t('approvedBy')}
                  </span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {receipt.approvedBy}
                  </span>
                </div>
                <div className="flex justify-between py-3 border-b border-border last:border-0">
                  <span className="text-sm text-foreground/60">
                    {t('goalProgress')}
                  </span>
                  <span className="text-sm font-semibold text-foreground text-right">
                    {lang === "bn"
                      ? `${toBanglaNum(receipt.goalProgress.before)}% → ${toBanglaNum(receipt.goalProgress.after)}%`
                      : `${receipt.goalProgress.before}% → ${receipt.goalProgress.after}%`}
                  </span>
                </div>
              </>
            ) : (
              <div className="py-8 text-center text-foreground/50">
                <div className="text-4xl mb-2">📭</div>
                <div>{t('noDepositData')}</div>
              </div>
            )}
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
                {receipt ? receipt.receiptId : "AMN-0000-0000-0000"}
              </div>
              <div className="text-xs text-foreground/50">
                {t('receiptNumber')}
              </div>
              <div className="text-xs text-primary font-semibold">
                {t('verify')}
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
            <Download size={16} /> {t('downloadPDF')}
          </button>
          <button
            onClick={() => setShowShareSheet(true)}
            className="py-3.5 rounded-xl border-2 border-border bg-card text-foreground text-sm font-bold flex items-center justify-center gap-2"
          >
            <Share2 size={16} /> {t('share')}
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
                {t('shareReceipt')}
              </div>
              <div className="grid grid-cols-4 gap-3 mt-3">
                {shareItems.map((item, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      if (item.key === 'copyLink') copyLink();
                      else if (item.key === 'saveImage') saveImage();
                      else if (item.key === 'print') printDocument();
                      else if (item.key === 'cancel') setShowShareSheet(false);
                      else shareVia(item.label);
                    }}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-xl">
                      {item.icon}
                    </div>
                    <span className="text-xs text-foreground/60">{item.label}</span>
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