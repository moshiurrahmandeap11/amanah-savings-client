"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ArrowLeft, 
  Moon, 
  Sun, 
  Download, 
  Mail, 
  Phone, 
  MapPin,
  Users,
  TrendingUp,
  Map,
  Star,
  Calendar,
  Smile,
  FileDown,
  Palette
} from "lucide-react";

// Translations
const translations = {
  en: {
    title: "Press Kit",
    subtitle: "Information & resources for journalists and media partners",
    statsTitle: "📊 Key Statistics",
    members: "Active Members",
    savings: "Total Savings",
    districts: "Districts Presence",
    rating: "User Rating",
    founded: "Founded",
    satisfaction: "Satisfaction Rate",
    logoTitle: "🎨 Brand Logo",
    downloadLogo: "📥 Download Logo Pack (SVG/PNG)",
    brandColors: "🎨 Brand Colors",
    primary: "Primary",
    secondary: "Secondary",
    dark: "Dark",
    coverageTitle: "📰 Recent Media Coverage",
    downloadPress: "📥 Download Complete Press Kit",
    mediaContact: "📞 Media Contact",
    pressInquiry: "Press Inquiry",
    mediaHotline: "Media Hotline",
    office: "Office",
    back: "Back",
    home: "Home",
    plans: "Plans",
    goals: "Goals",
    calculator: "Calculator",
    about: "About",
    blog: "Blog",
    faq: "FAQ",
    contact: "Contact",
    privacy: "Privacy",
    terms: "Terms",
    copyright: "© 2026 Sanchoy Bondhu Community — All rights reserved.",
    toastDownload: "📥 Download started successfully!",
  },
  bn: {
    title: "📰 মিডিয়া কিট",
    subtitle: "সাংবাদিক ও মিডিয়া পার্টনারদের জন্য তথ্য ও সম্পদ",
    statsTitle: "📊 মূল পরিসংখ্যান",
    members: "সক্রিয় সদস্য",
    savings: "মোট সঞ্চয়",
    districts: "বিভাগে উপস্থিতি",
    rating: "ব্যবহারকারী রেটিং",
    founded: "প্রতিষ্ঠাকাল",
    satisfaction: "সন্তুষ্টি হার",
    logoTitle: "🎨 ব্র্যান্ড লোগো",
    downloadLogo: "📥 লোগো প্যাক ডাউনলোড করুন (SVG/PNG)",
    brandColors: "🎨 ব্র্যান্ড রং",
    primary: "প্রাথমিক",
    secondary: "সেকেন্ডারি",
    dark: "ডার্ক",
    coverageTitle: "📰 সাম্প্রতিক মিডিয়া কভারেজ",
    downloadPress: "📥 সম্পূর্ণ প্রেস কিট ডাউনলোড",
    mediaContact: "📞 মিডিয়া যোগাযোগ",
    pressInquiry: "প্রেস ইনকোয়ারি",
    mediaHotline: "মিডিয়া হটলাইন",
    office: "অফিস",
    back: "পেছনে",
    home: "হোম",
    plans: "প্ল্যান",
    goals: "লক্ষ্য",
    calculator: "ক্যালকুলেটর",
    about: "সম্পর্কে",
    blog: "ব্লগ",
    faq: "প্রশ্নোত্তর",
    contact: "যোগাযোগ",
    privacy: "গোপনীয়তা",
    terms: "শর্তাবলী",
    copyright: "© ২০২৬ সঞ্চয় বন্ধু সম্প্রদায় — সর্বস্বত্ব সংরক্ষিত।",
    toastDownload: "📥 ডাউনলোড শুরু হয়েছে!",
  }
};

const Press = () => {
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

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  const handleDownload = (type) => {
    showToast(t('toastDownload'));
  };

  // Stats data
  const stats = [
    { number: "১০,০০০+", label: t('members'), icon: <Users size={20} /> },
    { number: "৳২ কোটি+", label: t('savings'), icon: <TrendingUp size={20} /> },
    { number: "৮টি", label: t('districts'), icon: <Map size={20} /> },
    { number: "৪.৮★", label: t('rating'), icon: <Star size={20} /> },
    { number: "২০২৫", label: t('founded'), icon: <Calendar size={20} /> },
    { number: "৯৮%", label: t('satisfaction'), icon: <Smile size={20} /> },
  ];

  // Press coverage data
  const pressCoverage = [
    {
      source: "প্রথম আলো",
      headline: "ডিজিটাল সঞ্চয়ে নতুন মাত্রা যোগ করছে সঞ্চয় বন্ধু",
      date: "📅 ১৫ মে, ২০২৬"
    },
    {
      source: "The Daily Star",
      headline: "Sanchoy Bondhu: Revolutionizing savings for Bangladesh's middle class",
      date: "📅 ১০ মে, ২০২৬"
    },
    {
      source: "Financial Express",
      headline: "Fintech startup Sanchoy Bondhu reaches 10,000 members milestone",
      date: "📅 ৫ মে, ২০২৬"
    }
  ];

  // Brand colors
  const brandColors = [
    { name: t('primary'), color: "#059669", hex: "#059669" },
    { name: t('secondary'), color: "#0891b2", hex: "#0891b2" },
    { name: t('dark'), color: "#1e293b", hex: "#1e293b" },
  ];

  // Contact info
  const contacts = [
    { icon: <Mail size={18} />, name: t('pressInquiry'), value: "press@sanchoybondhu.com" },
    { icon: <Phone size={18} />, name: t('mediaHotline'), value: "01700-000001" },
    { icon: <MapPin size={18} />, name: t('office'), value: "গুলশান, ঢাকা-১২১২" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <>
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-to-r from-primary to-primary-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-3">
              <button 
                onClick={() => window.history.back()}
                className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
                aria-label={t('back')}
              >
                <ArrowLeft size={18} />
              </button>
              <h1 className="text-white font-bold text-lg">
                {t('title')}
              </h1>
            </div>
            <button 
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 transition-colors flex items-center justify-center text-white"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light py-8 sm:py-12">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl sm:text-3xl font-extrabold text-white mb-2"
          >
            সঞ্চয় বন্ধু প্রেস কিট
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-white/80 text-sm max-w-md mx-auto"
          >
            {t('subtitle')}
          </motion.p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          {/* Stats Card */}
          <motion.div variants={itemVariants} className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <h3 className="font-extrabold text-foreground text-base mb-4">
              {t('statsTitle')}
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {stats.map((stat, idx) => (
                <div key={idx} className="bg-background rounded-xl p-4 text-center border border-border">
                  <div className="text-primary text-2xl font-black">
                    {stat.number}
                  </div>
                  <div className="text-foreground/60 text-xs mt-1">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Logo Card */}
          <motion.div variants={itemVariants} className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <h3 className="font-extrabold text-foreground text-base mb-4">
              {t('logoTitle')}
            </h3>
            <div className="bg-gradient-to-r from-primary to-primary-light rounded-xl p-6 text-center mb-4">
              <div className="text-white text-3xl sm:text-4xl font-black tracking-tight">
                🌿 সঞ্চয় বন্ধু
              </div>
              <div className="text-white/70 text-xs tracking-widest uppercase mt-1">
                Savings Community
              </div>
            </div>
            <button 
              onClick={() => handleDownload('logo')}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-bold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
            >
              <FileDown size={18} />
              {t('downloadLogo')}
            </button>
          </motion.div>

          {/* Brand Colors Card */}
          <motion.div variants={itemVariants} className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <h3 className="font-extrabold text-foreground text-base mb-4">
              {t('brandColors')}
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {brandColors.map((color, idx) => (
                <div 
                  key={idx}
                  className="rounded-xl p-4 text-center"
                  style={{ backgroundColor: color.color }}
                >
                  <div className="text-2xl">●</div>
                  <div className="font-bold text-white text-sm mt-1">
                    {color.name}
                  </div>
                  <div className="text-white/80 text-xs">
                    {color.hex}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Press Coverage Card */}
          <motion.div variants={itemVariants} className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <h3 className="font-extrabold text-foreground text-base mb-4">
              {t('coverageTitle')}
            </h3>
            <div className="space-y-3">
              {pressCoverage.map((item, idx) => (
                <div key={idx} className="pb-3 border-b border-border last:border-b-0 last:pb-0">
                  <div className="text-primary font-bold text-xs">
                    {item.source}
                  </div>
                  <div className="text-foreground font-bold text-sm mt-1">
                    {item.headline}
                  </div>
                  <div className="text-foreground/60 text-xs mt-1">
                    {item.date}
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => handleDownload('press')}
              className="w-full py-3 px-4 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-bold hover:shadow-lg transition-shadow flex items-center justify-center gap-2 mt-4"
            >
              <FileDown size={18} />
              {t('downloadPress')}
            </button>
          </motion.div>

          {/* Contact Card */}
          <motion.div variants={itemVariants} className="bg-card rounded-2xl p-5 border border-border shadow-card">
            <h3 className="font-extrabold text-foreground text-base mb-4">
              {t('mediaContact')}
            </h3>
            <div className="space-y-3">
              {contacts.map((contact, idx) => (
                <div key={idx} className="flex items-center gap-3 pb-3 border-b border-border last:border-b-0 last:pb-0">
                  <div className="text-primary text-xl">
                    {contact.icon}
                  </div>
                  <div>
                    <div className="text-foreground font-bold text-sm">
                      {contact.name}
                    </div>
                    <div className="text-primary text-sm">
                      {contact.value}
                    </div>
                  </div>
                </div>
              ))}
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

export default Press;