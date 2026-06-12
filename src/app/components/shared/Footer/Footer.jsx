"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
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

const Footer = () => {
  const footerSections = [
    {
      title: "Platform",
      links: [
        { name: "How it works", href: "/how-it-works" },
        { name: "Savings plan", href: "/savings-plan" },
        { name: "Savings goal", href: "/savings-goal" },
        { name: "Community Circle", href: "/community-circle" },
        { name: "Security and trust", href: "/security" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About us", href: "/about" },
        { name: "Contact", href: "/contact" },
        { name: "Blog", href: "/blog" },
        { name: "Career", href: "/career" },
        { name: "Press", href: "/press" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Q&A", href: "/faq" },
        { name: "Help Center", href: "/help" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Use", href: "/terms" },
        { name: "Withdrawal policy", href: "/withdrawal" },
      ],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook size={18} />, href: "#", color: "hover:bg-blue-500" },
    { icon: <FaTwitter size={18} />, href: "#", color: "hover:bg-sky-500" },
    { icon: <FaLinkedin size={18} />, href: "#", color: "hover:bg-blue-600" },
    { icon: <FaInstagram size={18} />, href: "#", color: "hover:bg-pink-500" },
  ];

  const bottomLinks = [
    { name: "Privacy", href: "/privacy" },
    { name: "Terms and conditions", href: "/terms" },
    { name: "Withdrawal policy", href: "/withdrawal" },
    { name: "Announcement", href: "/announcement" },
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
                  <span className="text-primary">Amanah</span>
                  <span className="text-foreground"> Savings</span>
                </h2>
              </Link>
              
              <p className="text-foreground/70 text-sm sm:text-base leading-relaxed mb-6 max-w-md">
                Bangladesh&apos;s trusted digital savings community platform. Save together, 
                achieve goals, build your future — in a halal and disciplined way.
              </p>

              {/* Important Announcement */}
              <div className="bg-primary/5 border border-primary/20 rounded-xl p-4 mb-6">
                <div className="flex gap-3">
                  <Shield className="text-primary shrink-0 mt-0.5" size={18} />
                  <div>
                    <p className="text-xs text-red-400 leading-relaxed">
                      <span className="font-semibold text-red-400">Important Announcement:</span>{" "}
                      Amanah Savings Community is a savings circle management platform. 
                      We are not a bank, investment company or financial institution. 
                      We do not guarantee any returns or profits. Savings are locked in 
                      according to the member&apos;s own and circle terms.
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
                    <Link
                      href={link.href}
                      className="text-foreground/60 text-sm hover:text-primary transition-colors duration-200 flex items-center gap-1 group"
                    >
                      <ChevronRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                      {link.name}
                    </Link>
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
                <p className="text-xs text-foreground/60">Support</p>
                <p className="text-foreground font-semibold text-sm">+880 1XXX-XXXXXX</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Mail size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs text-foreground/60">Email</p>
                <p className="text-foreground font-semibold text-sm">support@amanahsavings.com.bd</p>
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
              © 2025 Amanah Savings Community. All rights reserved. Bangladesh.
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