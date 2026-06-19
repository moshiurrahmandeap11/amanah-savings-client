"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  Moon, 
  Sun, 
  Lock, 
  User,
  Mail,
  Phone,
  Home,
  CreditCard,
  Globe,
  FileText,
  CheckCircle,
  AlertCircle
} from "lucide-react";

// Translations
const translations = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last Updated: January 1, 2026",
    
    section1Title: "1. What Information We Collect",
    section1Text1: "We collect the following information to provide and improve our services:",
    section1List1: "Identity Information: Name, National ID (NID), Date of Birth, Photo",
    section1List2: "Contact Information: Mobile Number, Email Address, Home Address",
    section1List3: "Financial Information: bKash/Nagad Number, Bank Account (Optional), Deposit History",
    section1List4: "Device Information: IP Address, Device Type, Browser Information",
    
    section2Title: "2. Why We Collect Information",
    section2Text: "We use your information for: (a) KYC verification, (b) Processing deposits and withdrawals, (c) Ensuring account security, (d) Providing customer service.",
    
    section3Title: "3. Information Sharing",
    section3Text: "We never sell your information. It may only be shared in the following cases:",
    section3List1: "Government directives as per Bangladesh law",
    section3List2: "Payment processors (bKash, Nagad) for deposit verification",
    section3List3: "Fraud prevention agencies (if necessary)",
    
    section4Title: "4. Data Security",
    section4Text: "Your data is protected with 256-bit SSL encryption. Servers are located in Bangladesh. Regular security audits are conducted.",
    
    section5Title: "5. Your Rights",
    section5List1: "Right to view your information",
    section5List2: "Right to correct inaccurate information",
    section5List3: "Right to request account deletion",
    section5List4: "Right to data portability",
    
    section6Title: "6. Cookies",
    section6Text: "We use limited cookies for session management and storing preferences (such as theme, language). No third-party tracking cookies are used.",
    
    section7Title: "7. Contact",
    section7Text: "For privacy-related questions: privacy@sanchoybondhu.com",
    
    // Navigation
    navHome: "Home",
    navPlans: "Plans",
    navGoals: "Goals",
    navAbout: "About",
    navFAQ: "FAQ",
    navContact: "Contact",
    navLogin: "Login",
    navStart: "Start Free",
    
    // Footer
    copyright: "© 2026 Sanchoy Bondhu Community. All rights reserved.",
    
    // Toast
    toastCopied: "Email copied to clipboard!",
  },
  bn: {
    title: "গোপনীয়তা নীতি",
    lastUpdated: "সর্বশেষ আপডেট: ১ জানুয়ারি ২০২৬",
    
    section1Title: "১. আমরা কি তথ্য সংগ্রহ করি",
    section1Text1: "আমরা আমাদের সেবা প্রদান ও উন্নত করতে নিম্নলিখিত তথ্য সংগ্রহ করি:",
    section1List1: "পরিচয় তথ্য: নাম, জাতীয় পরিচয়পত্র (NID), জন্মতারিখ, ছবি",
    section1List2: "যোগাযোগ তথ্য: মোবাইল নম্বর, ইমেইল ঠিকানা, বাড়ির ঠিকানা",
    section1List3: "আর্থিক তথ্য: bKash/Nagad নম্বর, ব্যাংক অ্যাকাউন্ট (ঐচ্ছিক), জমার ইতিহাস",
    section1List4: "ডিভাইস তথ্য: IP ঠিকানা, ডিভাইস ধরন, ব্রাউজার তথ্য",
    
    section2Title: "২. কেন আমরা তথ্য সংগ্রহ করি",
    section2Text: "আমরা আপনার তথ্য ব্যবহার করি: (ক) KYC যাচাইয়ের জন্য, (খ) জমা ও উত্তোলন প্রক্রিয়াকরণের জন্য, (গ) অ্যাকাউন্ট নিরাপত্তা নিশ্চিত করতে, (ঘ) গ্রাহক সেবা প্রদানের জন্য।",
    
    section3Title: "৩. তথ্য শেয়ারিং",
    section3Text: "আমরা আপনার তথ্য কখনো বিক্রি করি না। শুধুমাত্র নিম্নলিখিত ক্ষেত্রে শেয়ার করা হতে পারে:",
    section3List1: "বাংলাদেশ আইন অনুযায়ী সরকারি নির্দেশে",
    section3List2: "জমা যাচাইয়ের জন্য পেমেন্ট প্রসেসর (bKash, Nagad)",
    section3List3: "প্রতারণা প্রতিরোধ সংস্থার সাথে (প্রয়োজনে)",
    
    section4Title: "৪. ডেটা নিরাপত্তা",
    section4Text: "আপনার ডেটা ২৫৬-বিট SSL এনক্রিপশনে সুরক্ষিত। সার্ভার বাংলাদেশে অবস্থিত। নিয়মিত নিরাপত্তা অডিট পরিচালিত হয়।",
    
    section5Title: "৫. আপনার অধিকার",
    section5List1: "আপনার তথ্য দেখার অধিকার",
    section5List2: "ভুল তথ্য সংশোধনের অধিকার",
    section5List3: "অ্যাকাউন্ট মুছে ফেলার অনুরোধ করার অধিকার",
    section5List4: "ডেটা পোর্টেবিলিটির অধিকার",
    
    section6Title: "৬. কুকিজ",
    section6Text: "আমরা সেশন ম্যানেজমেন্ট এবং পছন্দ সংরক্ষণের জন্য (যেমন থিম, ভাষা) সীমিত কুকিজ ব্যবহার করি। কোনো তৃতীয়-পক্ষ ট্র্যাকিং কুকি ব্যবহার করা হয় না।",
    
    section7Title: "৭. যোগাযোগ",
    section7Text: "গোপনীয়তা সংক্রান্ত প্রশ্নের জন্য: privacy@sanchoybondhu.com",
    
    // Navigation
    navHome: "হোম",
    navPlans: "প্ল্যান",
    navGoals: "লক্ষ্য",
    navAbout: "সম্পর্কে",
    navFAQ: "প্রশ্নোত্তর",
    navContact: "যোগাযোগ",
    navLogin: "লগইন",
    navStart: "শুরু করুন",
    
    // Footer
    copyright: "© ২০২৬ সঞ্চয় বন্ধু সম্প্রদায়। সর্বস্বত্ব সংরক্ষিত।",
    
    // Toast
    toastCopied: "ইমেইল কপি করা হয়েছে!",
  }
};

const Privacy = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [toast, setToast] = useState({ show: false, message: '' });
  const pathname = usePathname();

  useEffect(() => {
    // Load language
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLanguage(savedLang);

    // Load theme
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleLanguage = () => {
    const newLang = language === 'bn' ? 'en' : 'bn';
    setLanguage(newLang);
    localStorage.setItem('appLanguage', newLang);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const copyEmail = () => {
    const email = "privacy@sanchoybondhu.com";
    navigator.clipboard.writeText(email);
    showToast(t('toastCopied'));
  };

  // Navigation links
  const navLinks = [
    { name: t('navHome'), href: "/" },
    { name: t('navPlans'), href: "/plans" },
    { name: t('navGoals'), href: "/goals" },
    { name: t('navAbout'), href: "/about" },
    { name: t('navFAQ'), href: "/faq" },
    { name: t('navContact'), href: "/contact" },
  ];

  // Sections data
  const sections = [
    {
      id: "section1",
      icon: <User size={20} />,
      title: "section1Title",
      content: [
        { type: "text", key: "section1Text1" },
        { type: "list", items: ["section1List1", "section1List2", "section1List3", "section1List4"] }
      ]
    },
    {
      id: "section2",
      icon: <FileText size={20} />,
      title: "section2Title",
      content: [
        { type: "text", key: "section2Text" }
      ]
    },
    {
      id: "section3",
      icon: <Globe size={20} />,
      title: "section3Title",
      content: [
        { type: "text", key: "section3Text" },
        { type: "list", items: ["section3List1", "section3List2", "section3List3"] }
      ]
    },
    {
      id: "section4",
      icon: <Lock size={20} />,
      title: "section4Title",
      content: [
        { type: "text", key: "section4Text" }
      ]
    },
    {
      id: "section5",
      icon: <CheckCircle size={20} />,
      title: "section5Title",
      content: [
        { type: "list", items: ["section5List1", "section5List2", "section5List3", "section5List4"] }
      ]
    },
    {
      id: "section6",
      icon: <Shield size={20} />,
      title: "section6Title",
      content: [
        { type: "text", key: "section6Text" }
      ]
    },
    {
      id: "section7",
      icon: <Mail size={20} />,
      title: "section7Title",
      content: [
        { type: "text", key: "section7Text" }
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Shield size={16} />
              Privacy
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-3">
              {t('title')}
            </h1>
            <p className="text-white/80 text-sm max-w-md mx-auto">
              {t('lastUpdated')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {sections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-card"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                  {section.icon}
                </div>
                <h2 className="text-xl font-bold text-foreground">
                  {t(section.title)}
                </h2>
              </div>

              <div className="space-y-3 text-foreground/80">
                {section.content.map((item, itemIdx) => {
                  if (item.type === 'text') {
                    return (
                      <p key={itemIdx} className="text-sm leading-relaxed">
                        {t(item.key)}
                      </p>
                    );
                  } else if (item.type === 'list') {
                    return (
                      <ul key={itemIdx} className="space-y-2">
                        {item.items.map((listItem, listIdx) => (
                          <li key={listIdx} className="flex items-start gap-3 text-sm leading-relaxed">
                            <span className="text-primary mt-1">•</span>
                            <span>{t(listItem)}</span>
                          </li>
                        ))}
                      </ul>
                    );
                  }
                  return null;
                })}
              </div>
            </motion.div>
          ))}

          {/* Email copy card */}
          <motion.div
            variants={itemVariants}
            className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-card"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <Mail size={20} />
              </div>
              <h2 className="text-xl font-bold text-foreground">
                {t('section7Title')}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="text-sm text-foreground/80 flex-1">
                {t('section7Text')}
              </p>
              <button
                onClick={copyEmail}
                className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors whitespace-nowrap"
              >
                Copy Email
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Toast Notification */}
      <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 bg-foreground text-background px-5 py-3 rounded-full text-sm font-medium z-50 transition-all duration-300 ${
        toast.show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        {toast.message}
      </div>
    </>
  );
};

export default Privacy;