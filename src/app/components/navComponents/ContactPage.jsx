"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  Loader2,
  Phone,
  Globe,
  Twitter,
} from "lucide-react";
import axiosInstance from "../../components/shared/AxiosInstance/AxiosInstance";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.message) {
      setError("Name and message are required.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/contact/submit", formData);
      
      if (response.data.success) {
        setSubmitted(true);
        setFormData({ name: "", phone: "", email: "", topic: "", message: "" });
        setTimeout(() => {
          setSubmitted(false);
        }, 5000);
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError(err.response?.data?.message || "Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactCards = [
    {
      icon: <MessageCircle size={24} />,
      label: "WhatsApp Support",
      value: "+880 1700-AMANAH",
      note: "Fastest response — usually within 1 hour",
      button: "Chat on WhatsApp",
      link: "https://wa.me/8801700262624",
      btnColor: "bg-[#25D366]",
    },
    {
      icon: <Mail size={24} />,
      label: "Email Support",
      value: "support@amanah.com.bd",
      note: "For account issues, KYC, and billing queries",
      button: "Send Email",
      link: "mailto:support@amanah.com.bd",
      btnColor: "bg-primary/15 text-primary",
    },
    {
      icon: <MapPin size={24} />,
      label: "Office Address",
      value: "House 12, Road 4, Banani, Dhaka-1213",
      note: "Walk-in appointments available by prior arrangement",
      button: null,
    },
    {
      icon: <Globe size={24} />,
      label: "Social Media",
      value: "@AmanahSavingsBD",
      note: "Facebook · Instagram · LinkedIn",
      button: null,
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook size={20} />, label: "Facebook", link: "https://facebook.com/amanah", color: "bg-[#1877f2]" },
    { icon: <FaInstagram size={20} />, label: "Instagram", link: "https://instagram.com/amanah", color: "bg-[#e4405f]" },
    { icon: <FaLinkedin size={20} />, label: "LinkedIn", link: "https://linkedin.com/company/amanah", color: "bg-[#0a66c2]" },
    { icon: <FaTwitter size={20} />, label: "Twitter", link: "https://twitter.com/amanah", color: "bg-[#1da1f2]" },
  ];

  const hours = [
    { day: "Sunday – Thursday", time: "9:00 AM – 8:00 PM", open: true },
    { day: "Friday", time: "2:00 PM – 8:00 PM", open: true },
    { day: "Saturday", time: "10:00 AM – 6:00 PM", open: true },
    { day: "WhatsApp (urgent)", time: "24/7", open: true },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary to-primary-dark pt-20 pb-16 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm mb-6">
            <MessageCircle size={14} />
            <span>Get in Touch</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            We&apos;re Here to Help
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto">
            Have a question about your account, a plan, or just want to say
            hello? Our team responds within 24 hours.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-12">
            <path d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" fill="var(--background)" />
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Contact Info */}
            <div className="space-y-5">
              {contactCards.map((card, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="bg-card border border-border rounded-xl p-5 flex gap-4 items-start hover:border-primary/40 transition-all"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    {card.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs text-foreground/60 font-semibold uppercase tracking-wide mb-1">
                      {card.label}
                    </div>
                    <div className="text-base font-semibold text-foreground mb-1 break-words">
                      {card.value}
                    </div>
                    {card.note && (
                      <div className="text-xs text-foreground/50 mb-2">
                        {card.note}
                      </div>
                    )}
                    {card.button && (
                      <a
                        href={card.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition hover:opacity-90 ${
                          card.btnColor === "bg-[#25D366]" 
                            ? "bg-[#25D366] text-white" 
                            : "bg-primary/15 text-primary hover:bg-primary/25"
                        }`}
                      >
                        <MessageCircle size={14} />
                        {card.button}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Social Media Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.35 }}
                whileHover={{ y: -2 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all"
              >
                <div className="text-sm font-bold text-foreground mb-3">
                  Follow Us
                </div>
                <div className="flex gap-3">
                  {socialLinks.map((social, idx) => (
                    <a
                      key={idx}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 rounded-full ${social.color} flex items-center justify-center text-white hover:opacity-90 transition`}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </motion.div>

              {/* Support Hours */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                whileHover={{ y: -2 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition-all"
              >
                <div className="flex items-center gap-2 text-sm font-bold text-foreground mb-3">
                  <Clock size={18} />
                  <span>Support Hours</span>
                </div>
                <div className="space-y-2">
                  {hours.map((hour, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between text-sm border-b border-border pb-2 last:border-0 last:pb-0"
                    >
                      <span className="text-foreground/60">{hour.day}</span>
                      <span className="text-primary font-semibold">
                        {hour.time}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Column - Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-card border border-border rounded-xl p-6 sm:p-8"
            >
              <h2 className="text-2xl font-bold text-foreground mb-2">
                Send Us a Message
              </h2>
              <p className="text-foreground/60 text-sm mb-6">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-foreground/60 text-sm">
                    We&apos;ll reach out to you within 24 hours. Thank you for contacting us.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="mb-4">
                      <label htmlFor="name" className="block text-sm font-semibold text-foreground/70 mb-1">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                      />
                    </div>
                    <div className="mb-4">
                      <label htmlFor="phone" className="block text-sm font-semibold text-foreground/70 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 17XXXXXXXX"
                        className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground/70 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="topic" className="block text-sm font-semibold text-foreground/70 mb-1">
                      Topic
                    </label>
                    <select
                      id="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                    >
                      <option value="">— Choose a topic —</option>
                      <option value="account">Account & KYC</option>
                      <option value="deposit">Deposit / Withdrawal</option>
                      <option value="plan">Plan Upgrade</option>
                      <option value="circle">Savings Circles</option>
                      <option value="technical">Technical Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground/70 mb-1">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      rows="5"
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition resize-vertical"
                    />
                  </div>

                  {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-500" />
                      <span className="text-sm text-red-500">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3 bg-gradient-to-r from-primary to-primary-dark text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="h-64 bg-secondary/20 flex items-center justify-center">
              <div className="text-center">
                <MapPin size={32} className="text-primary mx-auto mb-2" />
                <p className="text-foreground/60">Interactive Map Coming Soon</p>
                <p className="text-xs text-foreground/40 mt-1">House 12, Road 4, Banani, Dhaka-1213</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;