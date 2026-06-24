"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  Shield, 
  Mail, 
  Phone, 
  ChevronRight,
} from "lucide-react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import usePublicCms from "../usePublicCms";

const Footer = () => {
  const [language] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("appLanguage") || "en";
  });
  const pathname = usePathname();
  const router = useRouter();
  const { cms, announcement } = usePublicCms();

  // Get footer data from CMS with fallbacks
  const footer = cms?.footer || {};

  // Handle scroll to section
  const handleScrollToSection = (e, targetId) => {
    e.preventDefault();
    
    if (pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    } else {
      router.push(`/#${targetId}`);
    }
  };

  // Build footer sections from CMS, fallback to defaults if not present
  const footerSections = footer.sections?.length
    ? footer.sections
    : [
        {
          title: language === "bn" ? "প্ল্যাটফর্ম" : "Platform",
          links: [
            { label: language === "bn" ? "কীভাবে কাজ করে" : "How it works", url: "/how-it-works" },
            { label: language === "bn" ? "সঞ্চয় প্ল্যান" : "Savings plan", url: "/#savings-plan", isScroll: true, targetId: "savings-plan" },
            { label: language === "bn" ? "সঞ্চয় লক্ষ্য" : "Savings goal", url: "/#savings-goal", isScroll: true, targetId: "savings-goal" },
            { label: language === "bn" ? "কমিউনিটি সার্কেল" : "Community Circle", url: "/goals" },
            { label: language === "bn" ? "নিরাপত্তা ও বিশ্বাস" : "Security and trust", url: "/#security-trust", isScroll: true, targetId: "security-trust" },
          ],
        },
        {
          title: language === "bn" ? "কোম্পানি" : "Company",
          links: [
            { label: language === "bn" ? "আমাদের সম্পর্কে" : "About us", url: "/about-us" },
            { label: language === "bn" ? "যোগাযোগ" : "Contact", url: "/contact" },
            { label: language === "bn" ? "ব্লগ" : "Blog", url: "/blogs" },
            { label: language === "bn" ? "ক্যারিয়ার" : "Career", url: "/about-us" },
            { label: language === "bn" ? "প্রেস" : "Press", url: "/press" },
          ],
        },
        {
          title: language === "bn" ? "সাপোর্ট" : "Support",
          links: [
            { label: language === "bn" ? "প্রশ্নোত্তর" : "Q&A", url: "/faq" },
            { label: language === "bn" ? "সাহায্য কেন্দ্র" : "Help Center", url: "/faq" },
            { label: language === "bn" ? "গোপনীয়তা নীতি" : "Privacy Policy", url: "/privacy" },
            { label: language === "bn" ? "ব্যবহারের শর্তাবলী" : "Terms of Use", url: "/terms" },
            { label: language === "bn" ? "উত্তোলন নীতি" : "Withdrawal policy", url: "/terms" },
          ],
        },
      ];

  const socialLinks = [
    { icon: <FaFacebook size={18} />, href: footer?.socials?.facebook, color: "hover:bg-blue-500", label: "Facebook" },
    { icon: <FaTwitter size={18} />, href: footer?.socials?.twitter, color: "hover:bg-sky-500", label: "Twitter" },
    { icon: <FaLinkedin size={18} />, href: footer?.socials?.linkedin, color: "hover:bg-blue-600", label: "LinkedIn" },
    { icon: <FaInstagram size={18} />, href: footer?.socials?.instagram, color: "hover:bg-pink-500", label: "Instagram" },
  ].filter((social) => social.href);

  // Bottom links from CMS
  const bottomLinks = footer?.links?.length
    ? footer.links.map((link) => ({
        name: link.label,
        href: link.url || "#",
      }))
    : [
        { name: language === "bn" ? "গোপনীয়তা" : "Privacy", href: "/privacy" },
        { name: language === "bn" ? "শর্তাবলী" : "Terms and conditions", href: "/terms" },
        { name: language === "bn" ? "উত্তোলন নীতি" : "Withdrawal policy", href: "/terms" },
        { name: language === "bn" ? "ঘোষণা" : "Announcement", href: "/terms" },
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

  // Get brand info from CMS or fallback
  const brandName = footer?.brandName || cms?.site?.name || (language === "bn" ? "সঞ্চয় বন্ধু" : "Sanchoy Bondhu");
  const brandDesc = footer?.brandDesc || cms?.site?.tagline || (language === "bn" 
    ? "বাংলাদেশের বিশ্বস্ত ডিজিটাল সঞ্চয় সম্প্রদায় প্ল্যাটফর্ম। একসাথে সঞ্চয় করুন, লক্ষ্য অর্জন করুন, আপনার ভবিষ্যত গড়ুন — একটি হালাল ও সুশৃঙ্খল উপায়ে।"
    : "Bangladesh's trusted digital savings community platform. Save together, achieve goals, build your future — in a halal and disciplined way."
  );
  const announcementBadge = footer?.announcementBadge || (language === "bn" ? "গুরুত্বপূর্ণ ঘোষণা:" : "Important Announcement:");
  const announcementText = footer?.announcementText || (language === "bn" 
    ? "সঞ্চয় বন্ধু সম্প্রদায় একটি সঞ্চয় সার্কেল ব্যবস্থাপনা প্ল্যাটফর্ম। আমরা ব্যাংক, বিনিয়োগ কোম্পানি বা আর্থিক প্রতিষ্ঠান নই। আমরা কোনো রিটার্ন বা মুনাফার গ্যারান্টি দিই না। সঞ্চয় সদস্যের নিজস্ব এবং সার্কেল শর্তাবলী অনুযায়ী লক করা থাকে।"
    : "Sonchoy Bondhu Community is a savings circle management platform. We are not a bank, investment company or financial institution. We do not guarantee any returns or profits. Savings are locked in according to the member's own and circle terms."
  );
  const supportLabel = footer?.supportLabel || (language === "bn" ? "সাপোর্ট" : "Support");
  const emailLabel = footer?.emailLabel || (language === "bn" ? "ইমেইল" : "Email");
  const emailAddress = footer?.emailAddress || cms?.site?.supportEmail || "sanchoybondhu@gmail.com";
  const copyright = footer?.copyright || (language === "bn" ? "© ২০২৫ সঞ্চয় বন্ধু সম্প্রদায়। সর্বস্বত্ব সংরক্ষিত। বাংলাদেশ।" : "© 2025 Sonchoy Bondhu Community. All rights reserved. Bangladesh.");

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
                  <span className="text-primary">{brandName.split(" ")[0]}</span>
                  <span className="text-foreground"> {brandName.split(" ").slice(1).join(" ")}</span>
                </h2>
              </Link>
              
              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                {brandDesc}
              </p>

              {/* Important Announcement */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <Shield className="text-primary shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs text-red-400 leading-relaxed">
                      <span className="font-semibold text-red-400">{announcementBadge}</span>{" "}
                      {announcement?.text || announcementText}
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
                      <a
                        href={link.url}
                        onClick={(e) => handleScrollToSection(e, link.targetId)}
                        className="text-foreground/60 text-sm hover:text-primary transition-colors duration-200 flex items-center gap-1 group cursor-pointer"
                      >
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.url}
                        className="text-foreground/60 text-sm hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                      >
                        <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        {link.label}
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
                <p className="text-xs text-foreground/60">{supportLabel}</p>
                <p className="text-foreground font-semibold text-sm">{cms?.site?.supportPhone || "+880 1XXX-XXXXXX"}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-foreground/60">{emailLabel}</p>
                <p className="text-foreground font-semibold text-sm">{emailAddress}</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex gap-3">
            {socialLinks.map((social, idx) => (
              <motion.a
                key={idx}
                href={social.href}
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
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
              {copyright}
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
