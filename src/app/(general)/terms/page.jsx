"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Shield, 
  Moon, 
  Sun, 
  AlertCircle,
  CheckCircle,
  XCircle,
  Info,
  Mail,
  Calendar,
  Users,
  Lock,
  Clock,
  DollarSign,
  AlertTriangle
} from "lucide-react";

// Translations
const translations = {
  en: {
    title: "Terms of Use",
    lastUpdated: "Last Updated: January 1, 2026 · Applicable: All Sanchoy Bondhu Members",
    
    notice: "⚠️ Important: Sanchoy Bondhu is a digital savings community platform. We are not a bank or investment institution and do not provide any guaranteed profit or interest.",
    
    section1Title: "1. Service Description",
    section1Text: "Sanchoy Bondhu Savings Community (\"Sanchoy Bondhu\", \"We\", \"Platform\") is a digital savings tracking and community platform. We help members set savings goals, track progress, and save together through community circles.",
    
    section2Title: "2. What We Are Not",
    section2List1: "We are not a bank and do not hold a banking license",
    section2List2: "We are not an investment platform — no guaranteed returns",
    section2List3: "We do not provide any interest (Riba) or specific profit",
    section2List4: "Our deposits are not covered by any government insurance scheme",
    
    section3Title: "3. Membership Conditions",
    section3Text: "To use Sanchoy Bondhu, you must: (a) Be a resident of Bangladesh, (b) Be 18 years or older, (c) Complete KYC verification with valid NID, (d) Provide accurate and updated information.",
    
    section4Title: "4. Deposits and Withdrawals",
    section4Text: "All deposits are manually verified by our finance team. Early withdrawals incur a 3-5% processing fee. Bronze members cannot make early withdrawals.",
    
    section5Title: "5. Platform Fees",
    section5Text: "Bronze plan is completely free. Silver (৳199/month), Gold (৳499/month), and Platinum (৳999/month) plans have monthly fees. Notice will be given 30 days before any fee changes.",
    
    section6Title: "6. Account Security",
    section6Text: "You are responsible for the confidentiality of your PIN and login information. Report suspicious activity immediately to support@sanchoybondhu.com.",
    
    section7Title: "7. Changes to Terms",
    section7Text: "We may change these terms at any time. You will be notified via email and SMS 7 days before any changes.",
    
    section8Title: "8. Contact",
    section8Text: "For terms-related questions: legal@sanchoybondhu.com",
    
    // UI
    copyEmail: "Copy Email",
    toastCopied: "Email copied to clipboard!",
  },
  bn: {
    title: "ব্যবহারের শর্তাবলী",
    lastUpdated: "সর্বশেষ আপডেট: ১ জানুয়ারি ২০২৬ · প্রযোজ্য: সকল সঞ্চয় বন্ধু সদস্য",
    
    notice: "⚠️ গুরুত্বপূর্ণ: সঞ্চয় বন্ধু একটি ডিজিটাল সঞ্চয় কমিউনিটি প্ল্যাটফর্ম। আমরা ব্যাংক বা বিনিয়োগ প্রতিষ্ঠান নই এবং কোনো নিশ্চিত মুনাফা বা সুদ দিই না।",
    
    section1Title: "১. পরিষেবার বিবরণ",
    section1Text: "সঞ্চয় বন্ধু সেভিংস কমিউনিটি (\"সঞ্চয় বন্ধু\", \"আমরা\", \"প্ল্যাটফর্ম\") একটি ডিজিটাল সঞ্চয় ট্র্যাকিং এবং কমিউনিটি প্ল্যাটফর্ম। আমরা সদস্যদের সঞ্চয় লক্ষ্য নির্ধারণ, অগ্রগতি ট্র্যাকিং, এবং কমিউনিটি সার্কেলের মাধ্যমে একত্রে সঞ্চয় করতে সাহায্য করি।",
    
    section2Title: "২. যা আমরা নই",
    section2List1: "আমরা ব্যাংক নই এবং ব্যাংকিং লাইসেন্সধারী নই",
    section2List2: "আমরা বিনিয়োগ প্ল্যাটফর্ম নই — কোনো নিশ্চিত রিটার্ন নেই",
    section2List3: "আমরা কোনো সুদ (রিবা) বা নির্দিষ্ট মুনাফা দিই না",
    section2List4: "আমাদের আমানত কোনো সরকারি বীমা প্রকল্পের আওতায় নেই",
    
    section3Title: "৩. সদস্যপদের শর্ত",
    section3Text: "সঞ্চয় বন্ধু ব্যবহার করতে আপনাকে অবশ্যই: (ক) বাংলাদেশের বাসিন্দা হতে হবে, (খ) ১৮ বছর বা তার বেশি বয়সী হতে হবে, (গ) বৈধ NID দিয়ে KYC যাচাই সম্পন্ন করতে হবে, (ঘ) সঠিক ও আপডেট তথ্য প্রদান করতে হবে।",
    
    section4Title: "৪. জমা ও উত্তোলন",
    section4Text: "সকল জমা আমাদের ফিনান্স দল ম্যানুয়ালি যাচাই করে। আগাম উত্তোলনে ৩-৫% প্রক্রিয়াকরণ ফি প্রযোজ্য। Bronze সদস্যরা আগাম উত্তোলন করতে পারবেন না।",
    
    section5Title: "৫. প্ল্যাটফর্ম ফি",
    section5Text: "Bronze প্ল্যান সম্পূর্ণ বিনামূল্যে। Silver (৳১৯৯/মাস), Gold (৳৪৯৯/মাস), এবং Platinum (৳৯৯৯/মাস) প্ল্যানের জন্য মাসিক ফি প্রযোজ্য। ফি পরিবর্তনের ৩০ দিন আগে নোটিশ দেওয়া হবে।",
    
    section6Title: "৬. অ্যাকাউন্ট নিরাপত্তা",
    section6Text: "আপনি আপনার PIN এবং লগইন তথ্যের গোপনীয়তার জন্য দায়ী। সন্দেহজনক কার্যকলাপ তাৎক্ষণিকভাবে support@sanchoybondhu.com এ জানান।",
    
    section7Title: "৭. শর্ত পরিবর্তন",
    section7Text: "আমরা যেকোনো সময় এই শর্তাবলী পরিবর্তন করতে পারি। পরিবর্তনের ৭ দিন আগে ইমেইল ও SMS এর মাধ্যমে জানানো হবে।",
    
    section8Title: "৮. যোগাযোগ",
    section8Text: "শর্তাবলী সংক্রান্ত প্রশ্নের জন্য: legal@sanchoybondhu.com",
    
    // UI
    copyEmail: "ইমেইল কপি করুন",
    toastCopied: "ইমেইল কপি করা হয়েছে!",
  }
};

const Terms = () => {
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [toast, setToast] = useState({ show: false, message: '' });

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
    const email = "legal@sanchoybondhu.com";
    navigator.clipboard.writeText(email);
    showToast(t('toastCopied'));
  };

  // Sections data
  const sections = [
    {
      id: "section1",
      icon: <Info size={20} />,
      title: "section1Title",
      type: "text",
      content: "section1Text"
    },
    {
      id: "section2",
      icon: <XCircle size={20} />,
      title: "section2Title",
      type: "list",
      items: ["section2List1", "section2List2", "section2List3", "section2List4"]
    },
    {
      id: "section3",
      icon: <Users size={20} />,
      title: "section3Title",
      type: "text",
      content: "section3Text"
    },
    {
      id: "section4",
      icon: <DollarSign size={20} />,
      title: "section4Title",
      type: "text",
      content: "section4Text"
    },
    {
      id: "section5",
      icon: <Clock size={20} />,
      title: "section5Title",
      type: "text",
      content: "section5Text"
    },
    {
      id: "section6",
      icon: <Lock size={20} />,
      title: "section6Title",
      type: "text",
      content: "section6Text"
    },
    {
      id: "section7",
      icon: <AlertTriangle size={20} />,
      title: "section7Title",
      type: "text",
      content: "section7Text"
    },
    {
      id: "section8",
      icon: <Mail size={20} />,
      title: "section8Title",
      type: "text",
      content: "section8Text"
    }
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
      {/* Theme and Language Controls - Top Right */}
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={toggleTheme}
          className="w-10 h-10 rounded-xl border border-border bg-card shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-foreground"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        
        <button
          onClick={toggleLanguage}
          className="w-10 h-10 rounded-xl border border-border bg-card shadow-lg hover:shadow-xl transition-all flex items-center justify-center text-foreground text-xs font-bold"
        >
          {language === 'bn' ? 'EN' : 'বাং'}
        </button>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary to-primary-light py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-1.5 rounded-full text-sm font-semibold mb-4">
              <Shield size={16} />
              Terms
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
          {/* Notice Card */}
          <motion.div
            variants={itemVariants}
            className="bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/50 rounded-2xl p-5 sm:p-6 flex items-start gap-3"
          >
            <AlertCircle className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" size={22} />
            <p className="text-amber-800 dark:text-amber-300 text-sm font-medium leading-relaxed">
              {t('notice')}
            </p>
          </motion.div>

          {/* Sections */}
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

              <div className="text-foreground/80">
                {section.type === 'text' ? (
                  <p className="text-sm leading-relaxed">
                    {t(section.content)}
                  </p>
                ) : section.type === 'list' ? (
                  <ul className="space-y-2.5">
                    {section.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start gap-3 text-sm leading-relaxed">
                        <span className="text-primary mt-1 text-lg">•</span>
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
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
                {t('section8Title')}
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <p className="text-sm text-foreground/80 flex-1">
                {t('section8Text')}
              </p>
              <button
                onClick={copyEmail}
                className="px-5 py-2.5 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors whitespace-nowrap shadow-sm hover:shadow-md"
              >
                {t('copyEmail')}
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

export default Terms;