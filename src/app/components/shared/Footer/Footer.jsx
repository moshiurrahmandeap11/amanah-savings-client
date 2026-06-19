"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Shield, 
  Heart, 
  Mail, 
  Phone, 
  ChevronRight,
  Award,
  Clock,
  Lock
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

// Translations
const translations = {
  en: {
    // Brand
    brandName: "Sanchoy Bondhu",
    brandDesc: "Bangladesh's trusted digital savings community platform. Save together, achieve goals, build your future — in a halal and disciplined way.",
    
    // Announcement
    announcementBadge: "Important Announcement:",
    announcementText: "Sonchoy Bondhu Community is a savings circle management platform. We are not a bank, investment company or financial institution. We do not guarantee any returns or profits. Savings are locked in according to the member's own and circle terms.",
    
    // Sections
    sectionPlatform: "Platform",
    sectionCompany: "Company",
    sectionSupport: "Support",
    
    // Platform Links
    linkHowItWorks: "How it works",
    linkSavingsPlan: "Savings plan",
    linkSavingsGoal: "Savings goal",
    linkCommunityCircle: "Community Circle",
    linkSecurity: "Security and trust",
    
    // Company Links
    linkAbout: "About us",
    linkContact: "Contact",
    linkBlog: "Blog",
    linkCareer: "Career",
    linkPress: "Press",
    
    // Support Links
    linkFAQ: "Q&A",
    linkHelpCenter: "Help Center",
    linkPrivacy: "Privacy Policy",
    linkTerms: "Terms of Use",
    linkWithdrawal: "Withdrawal policy",
    
    // Contact
    supportLabel: "Support",
    emailLabel: "Email",
    emailAddress: "sanchoybondhu@gmail.com",
    
    // Bottom
    copyright: "© 2025 Sonchoy Bondhu Community. All rights reserved. Bangladesh.",
    bottomPrivacy: "Privacy",
    bottomTerms: "Terms and conditions",
    bottomWithdrawal: "Withdrawal policy",
    bottomAnnouncement: "Announcement",
  },
  bn: {
    // Brand
    brandName: "সঞ্চয় বন্ধু",
    brandDesc: "বাংলাদেশের বিশ্বস্ত ডিজিটাল সঞ্চয় সম্প্রদায় প্ল্যাটফর্ম। একসাথে সঞ্চয় করুন, লক্ষ্য অর্জন করুন, আপনার ভবিষ্যত গড়ুন — একটি হালাল ও সুশৃঙ্খল উপায়ে।",
    
    // Announcement
    announcementBadge: "গুরুত্বপূর্ণ ঘোষণা:",
    announcementText: "সঞ্চয় বন্ধু সম্প্রদায় একটি সঞ্চয় সার্কেল ব্যবস্থাপনা প্ল্যাটফর্ম। আমরা ব্যাংক, বিনিয়োগ কোম্পানি বা আর্থিক প্রতিষ্ঠান নই। আমরা কোনো রিটার্ন বা মুনাফার গ্যারান্টি দিই না। সঞ্চয় সদস্যের নিজস্ব এবং সার্কেল শর্তাবলী অনুযায়ী লক করা থাকে।",
    
    // Sections
    sectionPlatform: "প্ল্যাটফর্ম",
    sectionCompany: "কোম্পানি",
    sectionSupport: "সাপোর্ট",
    
    // Platform Links
    linkHowItWorks: "কীভাবে কাজ করে",
    linkSavingsPlan: "সঞ্চয় প্ল্যান",
    linkSavingsGoal: "সঞ্চয় লক্ষ্য",
    linkCommunityCircle: "কমিউনিটি সার্কেল",
    linkSecurity: "নিরাপত্তা ও বিশ্বাস",
    
    // Company Links
    linkAbout: "আমাদের সম্পর্কে",
    linkContact: "যোগাযোগ",
    linkBlog: "ব্লগ",
    linkCareer: "ক্যারিয়ার",
    linkPress: "প্রেস",
    
    // Support Links
    linkFAQ: "প্রশ্নোত্তর",
    linkHelpCenter: "সাহায্য কেন্দ্র",
    linkPrivacy: "গোপনীয়তা নীতি",
    linkTerms: "ব্যবহারের শর্তাবলী",
    linkWithdrawal: "উত্তোলন নীতি",
    
    // Contact
    supportLabel: "সাপোর্ট",
    emailLabel: "ইমেইল",
    emailAddress: "sanchoybondhu@gmail.com",
    
    // Bottom
    copyright: "© ২০২৫ সঞ্চয় বন্ধু সম্প্রদায়। সর্বস্বত্ব সংরক্ষিত। বাংলাদেশ।",
    bottomPrivacy: "গোপনীয়তা",
    bottomTerms: "শর্তাবলী",
    bottomWithdrawal: "উত্তোলন নীতি",
    bottomAnnouncement: "ঘোষণা",
  }
};

const Footer = () => {
  const [language, setLanguage] = useState('en');
  const pathname = usePathname();

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Handle scroll to section
  const handleScrollToSection = (e, targetId) => {
    e.preventDefault();
    
    // Check if we're on the home page
    if (pathname === '/') {
      // If on home page, scroll directly
      const element = document.getElementById(targetId);
      if (element) {
        // Add offset for fixed header if needed
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      // If not on home page, navigate to home page first
      window.location.href = `/#${targetId}`;
    }
  };

  // Get footer sections with translations
  const footerSections = [
    {
      title: t('sectionPlatform'),
      links: [
        { name: t('linkHowItWorks'), href: "/how-it-works" },
        { 
          name: t('linkSavingsPlan'), 
          href: "/#savings-plan",
          isScroll: true,
          targetId: "savings-plan"
        },
              { 
        name: t('linkSavingsGoal'), 
        href: "/#savings-goal",
        isScroll: true,
        targetId: "savings-goal" 
      },
        { name: t('linkCommunityCircle'), href: "/goals" },
              { 
        name: t('linkSecurity'), 
        href: "/#security-trust",  
        isScroll: true,
        targetId: "security-trust"  
      },
      ],
    },
    {
      title: t('sectionCompany'),
      links: [
        { name: t('linkAbout'), href: "/about-us" },
        { name: t('linkContact'), href: "/contact" },
        { name: t('linkBlog'), href: "/blogs" },
        { name: t('linkCareer'), href: "/about-us" },
        { name: t('linkPress'), href: "/press" },
      ],
    },
    {
      title: t('sectionSupport'),
      links: [
        { name: t('linkFAQ'), href: "/faq" },
        { name: t('linkHelpCenter'), href: "/faq" },
        { name: t('linkPrivacy'), href: "/privacy" },
        { name: t('linkTerms'), href: "/terms" },
        { name: t('linkWithdrawal'), href: "/terms" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook size={18} />, href: "#", color: "hover:bg-blue-500" },
    { icon: <FaTwitter size={18} />, href: "#", color: "hover:bg-sky-500" },
    { icon: <FaLinkedin size={18} />, href: "#", color: "hover:bg-blue-600" },
    { icon: <FaInstagram size={18} />, href: "#", color: "hover:bg-pink-500" },
  ];

  // Get bottom links with translations
  const bottomLinks = [
    { name: t('bottomPrivacy'), href: "/privacy" },
    { name: t('bottomTerms'), href: "/terms" },
    { name: t('bottomWithdrawal'), href: "/terms" },
    { name: t('bottomAnnouncement'), href: "/terms" },
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
    <footer className="bg-background border-t border-border relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-80 h-80 bg-primary-light/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          {/* Brand Column */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <motion.div variants={itemVariants}>
              <Link href="/" className="inline-block mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                  <span className="text-primary">Sanchoy</span>
                  <span className="text-foreground"> Bondhu</span>
                </h2>
              </Link>
              
              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                {t('brandDesc')}
              </p>

              {/* Important Announcement */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <Shield className="text-primary shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs text-red-400 leading-relaxed">
                      <span className="font-semibold text-red-400">{t('announcementBadge')}</span>{" "}
                      {t('announcementText')}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Footer Links Sections */}
          {footerSections.map((section, idx) => (
            <motion.div
              key={idx}
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <motion.h3 
                variants={itemVariants}
                className="font-semibold text-foreground text-base sm:text-lg mb-4"
              >
                {section.title}
              </motion.h3>
              <motion.ul variants={containerVariants} className="space-y-2">
                {section.links.map((link, linkIdx) => (
                  <motion.li key={linkIdx} variants={itemVariants}>
                    {link.isScroll ? (
                      // Scroll link for Savings Plan
                      <a
                        href={link.href}
                        onClick={(e) => handleScrollToSection(e, link.targetId)}
                        className="text-foreground/60 text-sm hover:text-primary transition-colors duration-200 flex items-center gap-1 group cursor-pointer"
                      >
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </a>
                    ) : (
                      // Normal links
                      <Link
                        href={link.href}
                        className="text-foreground/60 text-sm hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.name}
                      </Link>
                    )}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          ))}
        </div>

        {/* Contact & Social Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-border"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-foreground/60">{t('supportLabel')}</p>
                <p className="text-foreground font-semibold text-sm">+880 1XXX-XXXXXX</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-foreground/60">{t('emailLabel')}</p>
                <p className="text-foreground font-semibold text-sm">{t('emailAddress')}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`w-10 h-10 rounded-full bg-card border border-border flex items-center justify-center text-foreground/60 transition-all duration-300 ${social.color} hover:text-white hover:border-transparent`}
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Bottom Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
            <p className="text-xs text-foreground/50">
              {t('copyright')}
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {bottomLinks.map((link, idx) => (
                <Link
                  key={idx}
                  href={link.href}
                  className="text-xs text-foreground/50 hover:text-primary transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;