"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  Moon,
  Sun,
  Search,
  X,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";

const HelpPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const articles = {
    "bkash-deposit": {
      icon: "💜",
      title: {
        bn: "bKash দিয়ে কীভাবে জমা দেব?",
        en: "How to deposit via bKash?",
      },
      category: { bn: "জমা ও উত্তোলন", en: "Deposits" },
      readTime: { bn: "৩ মিনিট পড়া", en: "3 min read" },
      body: {
        bn: `<p>bKash দিয়ে জমা দেওয়া খুবই সহজ। নিচের ধাপগুলো অনুসরণ করুন:</p>
           <h4 className="font-bold mt-4 mb-2">ধাপসমূহ:</h4>
           <ol className="list-decimal pl-5 space-y-1">
             <li>আপনার bKash অ্যাপ খুলুন।</li>
             <li>"Send Money" বিকল্পটি বেছে নিন।</li>
             <li>Amanah-এর নম্বর <strong>01700-000000</strong> লিখুন।</li>
             <li>পরিমাণ লিখুন এবং Reference-এ আপনার ফোন নম্বর দিন।</li>
             <li>পেমেন্ট সম্পন্ন হলে স্ক্রিনশট নিন।</li>
             <li>Amanah অ্যাপে জমা পেজে গিয়ে স্ক্রিনশট ও TxID আপলোড করুন।</li>
           </ol>
           <p className="mt-3">সাধারণত ১–২ ঘণ্টার মধ্যে জমা যাচাই হয়।</p>`,
        en: `<p>Depositing via bKash is simple. Follow these steps:</p>
           <h4 className="font-bold mt-4 mb-2">Steps:</h4>
           <ol className="list-decimal pl-5 space-y-1">
             <li>Open your bKash app.</li>
             <li>Select "Send Money".</li>
             <li>Enter Amanah's number <strong>01700-000000</strong>.</li>
             <li>Enter the amount and use your phone number as reference.</li>
             <li>Take a screenshot after payment.</li>
             <li>Go to Amanah deposit page and upload the screenshot and TxID.</li>
           </ol>
           <p className="mt-3">Verification usually takes 1–2 hours.</p>`,
      },
    },
    "kyc-verify": {
      icon: "🪪",
      title: {
        bn: "KYC যাচাই কেন করতে হয়?",
        en: "Why is KYC verification required?",
      },
      category: { bn: "KYC যাচাই", en: "KYC" },
      readTime: { bn: "২ মিনিট পড়া", en: "2 min read" },
      body: {
        bn: `<p>KYC (Know Your Customer) বাংলাদেশ ব্যাংকের নিয়ম অনুযায়ী বাধ্যতামূলক।</p>
           <h4 className="font-bold mt-4 mb-2">KYC কেন দরকার?</h4>
           <ul className="list-disc pl-5 space-y-1">
             <li>আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করতে।</li>
             <li>আর্থিক জালিয়াতি প্রতিরোধ করতে।</li>
             <li>উত্তোলন সীমা বাড়াতে (KYC ছাড়া মাসে সর্বোচ্চ ৳৫,০০০)।</li>
           </ul>
           <h4 className="font-bold mt-4 mb-2">কী কী লাগবে?</h4>
           <ul className="list-disc pl-5 space-y-1">
             <li>জাতীয় পরিচয়পত্র (NID) — সামনে ও পেছন।</li>
             <li>একটি সেলফি ছবি।</li>
           </ul>
           <p className="mt-3">যাচাই সম্পন্ন হতে সাধারণত ২৪–৪৮ ঘণ্টা লাগে।</p>`,
        en: `<p>KYC is mandatory under Bangladesh Bank regulations.</p>
           <h4 className="font-bold mt-4 mb-2">Why KYC?</h4>
           <ul className="list-disc pl-5 space-y-1">
             <li>To secure your account.</li>
             <li>To prevent financial fraud.</li>
             <li>To increase withdrawal limits (without KYC: max ৳5,000/month).</li>
           </ul>
           <h4 className="font-bold mt-4 mb-2">What you'll need:</h4>
           <ul className="list-disc pl-5 space-y-1">
             <li>National ID card (NID) — front and back.</li>
             <li>A selfie photo.</li>
           </ul>
           <p className="mt-3">Verification usually takes 24–48 hours.</p>`,
      },
    },
    "goal-create": {
      icon: "🎯",
      title: {
        bn: "নতুন সঞ্চয় লক্ষ্য কীভাবে তৈরি করব?",
        en: "How to create a new savings goal?",
      },
      category: { bn: "সঞ্চয় লক্ষ্য", en: "Goals" },
      readTime: { bn: "২ মিনিট পড়া", en: "2 min read" },
      body: {
        bn: `<p>Amanah-এ সঞ্চয় লক্ষ্য তৈরি করুন এবং নিজের স্বপ্নের দিকে এগিয়ে যান।</p>
           <h4 className="font-bold mt-4 mb-2">ধাপসমূহ:</h4>
           <ol className="list-decimal pl-5 space-y-1">
             <li>ড্যাশবোর্ড থেকে "লক্ষ্য যোগ করুন" বাটনে ট্যাপ করুন।</li>
             <li>লক্ষ্যের নাম এবং লক্ষ্যমাত্রার পরিমাণ দিন।</li>
             <li>একটি ইমোজি বা ছবি বেছে নিন।</li>
             <li>কাঙ্ক্ষিত সমাপ্তির তারিখ দিন (ঐচ্ছিক)।</li>
             <li>"লক্ষ্য তৈরি করুন" বাটনে ট্যাপ করুন।</li>
           </ol>
           <p className="mt-3">একটি অ্যাকাউন্টে সর্বোচ্চ ১০টি সক্রিয় লক্ষ্য রাখা যাবে।</p>`,
        en: `<p>Create a savings goal in Amanah and work towards your dreams.</p>
           <h4 className="font-bold mt-4 mb-2">Steps:</h4>
           <ol className="list-decimal pl-5 space-y-1">
             <li>Tap "Add Goal" from your dashboard.</li>
             <li>Enter goal name and target amount.</li>
             <li>Choose an emoji or image.</li>
             <li>Set a target date (optional).</li>
             <li>Tap "Create Goal".</li>
           </ol>
           <p className="mt-3">You can have up to 10 active goals per account.</p>`,
      },
    },
    "withdraw-time": {
      icon: "⏱️",
      title: {
        bn: "উত্তোলন কত দিনে আসে?",
        en: "How long does withdrawal take?",
      },
      category: { bn: "জমা ও উত্তোলন", en: "Deposits" },
      readTime: { bn: "১ মিনিট পড়া", en: "1 min read" },
      body: {
        bn: `<p>উত্তোলনের সময় পদ্ধতি অনুযায়ী ভিন্ন হয়।</p>
           <h4 className="font-bold mt-4 mb-2">সময়সীমা:</h4>
           <ul className="list-disc pl-5 space-y-1">
             <li><strong>bKash / Nagad:</strong> ২–৪ ঘণ্টার মধ্যে</li>
             <li><strong>ব্যাংক ট্রান্সফার:</strong> ১–৩ কার্যদিবস</li>
           </ul>
           <h4 className="font-bold mt-4 mb-2">মনে রাখুন:</h4>
           <ul className="list-disc pl-5 space-y-1">
             <li>সরকারি ছুটির দিনে প্রক্রিয়া বিলম্ব হতে পারে।</li>
             <li>KYC যাচাই ছাড়া উত্তোলন সীমিত।</li>
             <li>প্রথমবার উত্তোলনে অতিরিক্ত যাচাই হতে পারে।</li>
           </ul>`,
        en: `<p>Withdrawal time depends on the method used.</p>
           <h4 className="font-bold mt-4 mb-2">Timelines:</h4>
           <ul className="list-disc pl-5 space-y-1">
             <li><strong>bKash / Nagad:</strong> Within 2–4 hours</li>
             <li><strong>Bank Transfer:</strong> 1–3 business days</li>
           </ul>
           <h4 className="font-bold mt-4 mb-2">Note:</h4>
           <ul className="list-disc pl-5 space-y-1">
             <li>Processing may be delayed on public holidays.</li>
             <li>Withdrawal is limited without KYC verification.</li>
             <li>First-time withdrawals may require additional verification.</li>
           </ul>`,
      },
    },
    "password-reset": {
      icon: "🔑",
      title: {
        bn: "পাসওয়ার্ড ভুলে গেলে কী করব?",
        en: "What to do if I forget my password?",
      },
      category: { bn: "অ্যাকাউন্ট", en: "Account" },
      readTime: { bn: "১ মিনিট পড়া", en: "1 min read" },
      body: {
        bn: `<p>পাসওয়ার্ড রিসেট করা সহজ।</p>
           <h4 className="font-bold mt-4 mb-2">ধাপসমূহ:</h4>
           <ol className="list-decimal pl-5 space-y-1">
             <li>লগইন পেজে "পাসওয়ার্ড ভুলে গেছেন?" লিংকে ট্যাপ করুন।</li>
             <li>নিবন্ধিত ফোন নম্বর বা ইমেইল দিন।</li>
             <li>OTP কোড পাবেন — সেটি দিন।</li>
             <li>নতুন পাসওয়ার্ড সেট করুন।</li>
           </ol>
           <p className="mt-3">OTP ৫ মিনিটের মধ্যে মেয়াদোত্তীর্ণ হয়ে যায়।</p>`,
        en: `<p>Resetting your password is easy.</p>
           <h4 className="font-bold mt-4 mb-2">Steps:</h4>
           <ol className="list-decimal pl-5 space-y-1">
             <li>Tap "Forgot Password?" on the login page.</li>
             <li>Enter your registered phone number or email.</li>
             <li>Enter the OTP you receive.</li>
             <li>Set a new password.</li>
           </ol>
           <p className="mt-3">OTPs expire within 5 minutes.</p>`,
      },
    },
    "pin-change": {
      icon: "🔢",
      title: { bn: "PIN পরিবর্তন কীভাবে করব?", en: "How to change my PIN?" },
      category: { bn: "নিরাপত্তা", en: "Security" },
      readTime: { bn: "১ মিনিট পড়া", en: "1 min read" },
      body: {
        bn: `<p>আপনার লেনদেন PIN যেকোনো সময় পরিবর্তন করতে পারবেন।</p>
           <h4 className="font-bold mt-4 mb-2">ধাপসমূহ:</h4>
           <ol className="list-decimal pl-5 space-y-1">
             <li>প্রোফাইল → নিরাপত্তা সেটিংস-এ যান।</li>
             <li>"PIN পরিবর্তন করুন" বিকল্পটি বেছে নিন।</li>
             <li>বর্তমান PIN দিন।</li>
             <li>নতুন ৪-সংখ্যার PIN দুইবার দিন।</li>
             <li>নিশ্চিত করুন।</li>
           </ol>
           <p className="mt-3">নিরাপদ PIN: সহজ সংখ্যা (1234, 0000) ব্যবহার করবেন না।</p>`,
        en: `<p>You can change your transaction PIN at any time.</p>
           <h4 className="font-bold mt-4 mb-2">Steps:</h4>
           <ol className="list-decimal pl-5 space-y-1">
             <li>Go to Profile → Security Settings.</li>
             <li>Select "Change PIN".</li>
             <li>Enter your current PIN.</li>
             <li>Enter a new 4-digit PIN twice.</li>
             <li>Confirm.</li>
           </ol>
           <p className="mt-3">Avoid simple PINs like 1234 or 0000.</p>`,
      },
    },
  };

  const searchData = [
    {
      id: "bkash-deposit",
      icon: "💜",
      title: {
        bn: "bKash দিয়ে জমা দেওয়ার নিয়ম",
        en: "How to deposit via bKash",
      },
      cat: { bn: "জমা ও উত্তোলন", en: "Deposits" },
    },
    {
      id: "kyc-verify",
      icon: "🪪",
      title: { bn: "KYC যাচাই করার নিয়ম", en: "How to complete KYC" },
      cat: { bn: "KYC যাচাই", en: "KYC" },
    },
    {
      id: "goal-create",
      icon: "🎯",
      title: { bn: "নতুন সঞ্চয় লক্ষ্য তৈরি", en: "Create a new savings goal" },
      cat: { bn: "সঞ্চয় লক্ষ্য", en: "Goals" },
    },
    {
      id: "withdraw-time",
      icon: "⏱️",
      title: { bn: "উত্তোলন কত দিনে আসে", en: "Withdrawal timeline" },
      cat: { bn: "জমা ও উত্তোলন", en: "Deposits" },
    },
    {
      id: "password-reset",
      icon: "🔑",
      title: { bn: "পাসওয়ার্ড রিসেট করার নিয়ম", en: "Reset your password" },
      cat: { bn: "অ্যাকাউন্ট", en: "Account" },
    },
    {
      id: "pin-change",
      icon: "🔢",
      title: { bn: "PIN পরিবর্তন করার নিয়ম", en: "How to change PIN" },
      cat: { bn: "নিরাপত্তা", en: "Security" },
    },
  ];

  const categories = [
    {
      id: "account",
      icon: "👤",
      name: { bn: "অ্যাকাউন্ট", en: "Account" },
      count: { bn: "১২টি নিবন্ধ", en: "12 articles" },
      color: "bg-primary/10",
    },
    {
      id: "deposit",
      icon: "💰",
      name: { bn: "জমা ও উত্তোলন", en: "Deposits" },
      count: { bn: "১৮টি নিবন্ধ", en: "18 articles" },
      color: "bg-blue-500/10",
    },
    {
      id: "goals",
      icon: "🎯",
      name: { bn: "সঞ্চয় লক্ষ্য", en: "Savings Goals" },
      count: { bn: "১৫টি নিবন্ধ", en: "15 articles" },
      color: "bg-amber-500/10",
    },
    {
      id: "kyc",
      icon: "🪪",
      name: { bn: "KYC যাচাই", en: "KYC Verification" },
      count: { bn: "৮টি নিবন্ধ", en: "8 articles" },
      color: "bg-red-500/10",
    },
    {
      id: "security",
      icon: "🔒",
      name: { bn: "নিরাপত্তা", en: "Security" },
      count: { bn: "১০টি নিবন্ধ", en: "10 articles" },
      color: "bg-purple-500/10",
    },
    {
      id: "plans",
      icon: "💎",
      name: { bn: "প্ল্যান ও সাবস্ক্রিপশন", en: "Plans & Subscriptions" },
      count: { bn: "৬টি নিবন্ধ", en: "6 articles" },
      color: "bg-pink-500/10",
    },
  ];

  const popularArticles = [
    {
      id: "bkash-deposit",
      icon: "💜",
      title: {
        bn: "bKash দিয়ে কীভাবে জমা দেব?",
        en: "How to deposit via bKash?",
      },
      category: { bn: "জমা ও উত্তোলন", en: "Deposits" },
      readTime: { bn: "৩ মিনিট পড়া", en: "3 min read" },
    },
    {
      id: "kyc-verify",
      icon: "🪪",
      title: {
        bn: "KYC যাচাই কেন করতে হয়?",
        en: "Why is KYC verification required?",
      },
      category: { bn: "KYC যাচাই", en: "KYC" },
      readTime: { bn: "২ মিনিট পড়া", en: "2 min read" },
    },
    {
      id: "goal-create",
      icon: "🎯",
      title: {
        bn: "নতুন সঞ্চয় লক্ষ্য কীভাবে তৈরি করব?",
        en: "How to create a new savings goal?",
      },
      category: { bn: "সঞ্চয় লক্ষ্য", en: "Goals" },
      readTime: { bn: "২ মিনিট পড়া", en: "2 min read" },
    },
    {
      id: "withdraw-time",
      icon: "⏱️",
      title: {
        bn: "উত্তোলন কত দিনে আসে?",
        en: "How long does withdrawal take?",
      },
      category: { bn: "জমা ও উত্তোলন", en: "Deposits" },
      readTime: { bn: "১ মিনিট পড়া", en: "1 min read" },
    },
    {
      id: "password-reset",
      icon: "🔑",
      title: {
        bn: "পাসওয়ার্ড ভুলে গেলে কী করব?",
        en: "What to do if I forget my password?",
      },
      category: { bn: "অ্যাকাউন্ট", en: "Account" },
      readTime: { bn: "১ মিনিট পড়া", en: "1 min read" },
    },
    {
      id: "pin-change",
      icon: "🔢",
      title: { bn: "PIN পরিবর্তন কীভাবে করব?", en: "How to change my PIN?" },
      category: { bn: "নিরাপত্তা", en: "Security" },
      readTime: { bn: "১ মিনিট পড়া", en: "1 min read" },
    },
  ];

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

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (query.length > 0) {
      const results = searchData.filter(
        (item) =>
          item.title[lang].toLowerCase().includes(query.toLowerCase()) ||
          item.cat[lang].toLowerCase().includes(query.toLowerCase()),
      );
      setSearchResults(results);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setShowResults(false);
  };

  const openArticle = (id) => {
    setSelectedArticle(articles[id]);
    setShowModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setShowModal(false);
    document.body.style.overflow = "auto";
  };

  const markHelpful = (helpful) => {
    closeModal();
    showToast(
      helpful
        ? lang === "bn"
          ? "🙏 ধন্যবাদ আপনার মতামতের জন্য!"
          : "🙏 Thanks for your feedback!"
        : lang === "bn"
          ? "🎫 সাপোর্ট টিকেট পাঠাতে পারেন"
          : "🎫 You can submit a support ticket",
    );
  };

  return (
    <div className="min-h-screen text-black bg-background">
      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary-light px-4 py-4 flex items-center gap-3 sticky top-0 z-50">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1">🆘 Help Center</h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-3 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
      </div>

      {/* Hero + Search */}
      <div className="bg-linear-to-r from-primary to-primary-light px-5 pb-8 text-center">
        <div className="text-white text-xl font-bold mb-1">
          How can we help you?
        </div>
        <div className="text-white/80 text-sm mb-4">
          1,000+ help articles and guides
        </div>
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground/50"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Search help articles... e.g. bKash, password"
            className="w-full py-3 pl-12 pr-10 rounded-xl bg-white text-black outline-none shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/50"
            >
              <X size={16} />
            </button>
          )}
        </div>
        {showResults && searchResults.length > 0 && (
          <div className="mt-2 bg-card border border-border rounded-xl overflow-hidden shadow-lg text-left">
            {searchResults.map((result) => (
              <div
                key={result.id}
                onClick={() => {
                  openArticle(result.id);
                  clearSearch();
                }}
                className="p-3 border-b border-border last:border-0 flex items-center gap-3 cursor-pointer hover:bg-primary/5 transition"
              >
                <span className="text-lg">{result.icon}</span>
                <div>
                  <div className="text-sm font-semibold text-foreground">
                    {result.title[lang]}
                  </div>
                  <div className="text-xs text-foreground/50">
                    {result.cat[lang]}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {showResults && searchResults.length === 0 && searchQuery && (
          <div className="mt-2 bg-card border border-border rounded-xl p-4 text-center text-foreground/50">
            😕 No results found
          </div>
        )}
      </div>

      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* System Status */}
        <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 flex items-center gap-3 mb-6">
          <div className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
          <div className="text-sm text-foreground/80 flex-1">
            All systems normal —{" "}
            <strong className="text-green-500">All services are running</strong>
          </div>
          <Link
            href="/dashboard/status"
            className="text-xs text-primary font-semibold"
          >
            Details →
          </Link>
        </div>

        {/* Categories */}
        <div className="flex justify-between items-center mb-3">
          <div className="font-bold text-foreground">Browse by topic</div>
        </div>
        <div className="grid grid-cols-2 gap-3 mb-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() =>
                showToast(lang === "bn" ? "শীঘ্রই আসছে!" : "Coming soon!")
              }
              className="bg-card border border-border rounded-xl p-4 cursor-pointer hover:border-primary transition"
            >
              <div
                className={`w-11 h-11 rounded-xl ${cat.color} flex items-center justify-center text-xl mb-2`}
              >
                {cat.icon}
              </div>
              <div className="font-bold text-sm text-foreground">
                {cat.name[lang]}
              </div>
              <div className="text-xs text-foreground/50">
                {cat.count[lang]}
              </div>
            </div>
          ))}
        </div>

        {/* Popular Articles */}
        <div className="flex justify-between items-center mb-3">
          <div className="font-bold text-foreground">Popular questions</div>
          <Link href="/faq" className="text-xs text-primary font-semibold">
            View all →
          </Link>
        </div>
        <div className="space-y-2 mb-6">
          {popularArticles.map((article, idx) => (
            <div
              key={idx}
              onClick={() => openArticle(article.id)}
              className="bg-card border border-border rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-primary transition"
            >
              <span className="text-xl">{article.icon}</span>
              <div className="flex-1">
                <div className="font-semibold text-sm text-foreground">
                  {article.title[lang]}
                </div>
                <div className="text-xs text-foreground/50">
                  {article.category[lang]} · {article.readTime[lang]}
                </div>
              </div>
              <ChevronRight size={16} className="text-foreground/40" />
            </div>
          ))}
        </div>

        {/* Contact Options */}
        <div className="font-bold text-foreground mb-3">
          Contact us directly
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Link
            href="/dashboard/support-ticket"
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">🎫</div>
            <div className="font-bold text-sm text-foreground">
              Support Ticket
            </div>
            <div className="text-xs text-foreground/50">
              Reply within 24 hours
            </div>
          </Link>
          <Link
            href="mailto:support@amanahsavings.com.bd"
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">📧</div>
            <div className="font-bold text-sm text-foreground">Email</div>
            <div className="text-xs text-foreground/50">
              support@amanahsavings.com.bd
            </div>
          </Link>
          <Link
            href="tel:+8801700000000"
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">📞</div>
            <div className="font-bold text-sm text-foreground">Hotline</div>
            <div className="text-xs text-foreground/50">Sat–Thu, 9am–9pm</div>
          </Link>
          <Link
            href="https://wa.me/8801700000000"
            target="_blank"
            className="bg-card border border-border rounded-xl p-4 text-center hover:border-primary transition"
          >
            <div className="text-3xl mb-1">💬</div>
            <div className="font-bold text-sm text-foreground">WhatsApp</div>
            <div className="text-xs text-foreground/50">For quick help</div>
          </Link>
        </div>
      </div>

      {/* Article Modal */}
      <AnimatePresence>
        {showModal && selectedArticle && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-end md:items-center justify-center"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="bg-card rounded-t-2xl md:rounded-2xl w-full max-w-md max-h-[85vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center gap-3">
                <span className="text-2xl">{selectedArticle.icon}</span>
                <div className="font-bold text-foreground flex-1">
                  {selectedArticle.title[lang]}
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-background border border-border flex items-center justify-center"
                >
                  ✕
                </button>
              </div>
              <div
                className="p-5 text-foreground/70 text-sm leading-relaxed"
                dangerouslySetInnerHTML={{ __html: selectedArticle.body[lang] }}
              />
              <div className="p-4 border-t border-border flex gap-3">
                <button
                  onClick={() => markHelpful(true)}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold hover:border-green-500 hover:text-green-500 transition"
                >
                  👍 Helpful
                </button>
                <button
                  onClick={() => markHelpful(false)}
                  className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold hover:border-red-500 hover:text-red-500 transition"
                >
                  👎 Need more help
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
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HelpPage;
