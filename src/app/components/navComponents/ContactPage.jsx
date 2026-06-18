"use client";

import React, { useState } from "react";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Globe,
  Loader2,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
} from "lucide-react";
import axiosInstance from "../../components/shared/AxiosInstance/AxiosInstance";

const contactCards = [
  {
    icon: MessageCircle,
    label: "WhatsApp Support",
    value: "+880 1700-AMANAH",
    note: "Fastest response, usually within 1 hour",
    button: "Chat on WhatsApp",
    href: "https://wa.me/8801700262624",
    buttonClass: "bg-[#25D366] text-white",
  },
  {
    icon: Mail,
    label: "Email Support",
    value: "support@amanah.com.bd",
    note: "For account issues, KYC, and billing queries",
    button: "Send Email",
    href: "mailto:support@amanah.com.bd",
    buttonClass: "bg-[#05966926] text-[#059669]",
  },
  {
    icon: MapPin,
    label: "Office Address",
    value: "House 12, Road 4, Banani, Dhaka-1213",
    note: "Walk-in appointments available by prior arrangement",
  },
  {
    icon: Globe,
    label: "Social Media",
    value: "@AmanahSavingsBD",
    note: "Facebook · Instagram · LinkedIn",
  },
];

const supportHours = [
  ["Sunday - Thursday", "9:00 AM - 8:00 PM"],
  ["Friday", "2:00 PM - 8:00 PM"],
  ["Saturday", "10:00 AM - 6:00 PM"],
  ["WhatsApp (urgent)", "24/7"],
];

const inputClass =
  "w-full rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
  });
  const [toast, setToast] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.id]: event.target.value,
    }));
    setError("");
  };

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      const message = "Name and message are required.";
      setError(message);
      showToast(message);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axiosInstance.post("/contact/submit", formData);

      if (response.data.success) {
        setSubmitted(true);
        showToast("Message sent! We'll reach out within 24 hours.");
        setFormData({ name: "", phone: "", email: "", topic: "", message: "" });
        window.setTimeout(() => setSubmitted(false), 5000);
      } else {
        const message = response.data.message || "Failed to send message. Please try again.";
        setError(message);
        showToast(message);
      }
    } catch (err) {
      console.error("Contact form error:", err);
      const message = err.response?.data?.message || "Failed to send message. Please try again.";
      setError(message);
      showToast(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] font-['Segoe_UI',system-ui,sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#059669,#0891b2)] px-6 pb-20 pt-16 text-center">
        <div className="relative z-10 mx-auto max-w-[720px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[13px] font-semibold text-white">
            <Phone className="h-4 w-4" />
            Get in Touch
          </div>
          <h1 className="mb-3 text-[clamp(28px,4vw,48px)] font-black text-white">
            We&apos;re Here to Help
          </h1>
          <p className="mx-auto max-w-[500px] text-base text-white/85">
            Have a question about your account, a plan, or just want to say hello? Our team
            responds within 24 hours.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-[60px] w-full">
            <path className="fill-[#f8fafc] dark:fill-[#0a0f1e]" d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      <section className="px-6 py-[72px] max-md:px-4 max-md:py-14">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid min-w-0 grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
            <div>
              <div className="flex flex-col gap-4">
                {contactCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <article
                      key={card.label}
                      className="flex min-w-0 items-start gap-4 rounded-2xl border border-[#e2e8f0] bg-white p-6 transition hover:-translate-y-0.5 hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#131e2e]"
                    >
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0596691f] text-[#059669]">
                        <Icon className="h-[22px] w-[22px]" />
                      </div>
                      <div className="min-w-0">
                        <div className="mb-1 text-xs font-semibold uppercase tracking-[.5px] text-[#64748b] dark:text-[#94a3b8]">
                          {card.label}
                        </div>
                        <div className="mb-1 break-words text-[15px] font-semibold text-[#0f172a] dark:text-[#f1f5f9]">
                          {card.value}
                        </div>
                        <div className="text-xs text-[#64748b] dark:text-[#94a3b8]">{card.note}</div>
                        {card.button && (
                          <a
                            href={card.href}
                            target={card.href.startsWith("http") ? "_blank" : undefined}
                            rel={card.href.startsWith("http") ? "noopener noreferrer" : undefined}
                            className={`mt-2 inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-[13px] font-semibold ${card.buttonClass}`}
                          >
                            {card.label.includes("WhatsApp") ? (
                              <MessageCircle className="h-3.5 w-3.5" />
                            ) : (
                              <Mail className="h-3.5 w-3.5" />
                            )}
                            {card.button}
                          </a>
                        )}
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="mt-4 rounded-2xl border border-[#e2e8f0] bg-white p-6 dark:border-[#1e2d3d] dark:bg-[#131e2e]">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                  <Clock className="h-4 w-4 text-[#059669]" />
                  Support Hours
                </div>
                {supportHours.map(([day, time]) => (
                  <div
                    key={day}
                    className="flex justify-between border-b border-[#e2e8f0] py-1.5 text-[13px] last:border-0 dark:border-[#1e2d3d]"
                  >
                    <span className="text-[#64748b] dark:text-[#94a3b8]">{day}</span>
                    <span className="font-semibold text-[#059669]">{time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="min-w-0 rounded-2xl border border-[#e2e8f0] bg-white p-9 dark:border-[#1e2d3d] dark:bg-[#131e2e] max-md:p-6">
              <h2 className="mb-1.5 text-[22px] font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">
                Send Us a Message
              </h2>
              <p className="mb-7 text-sm text-[#64748b] dark:text-[#94a3b8]">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>

              {submitted ? (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                    Message Sent!
                  </h3>
                  <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                    We&apos;ll reach out to you within 24 hours. Thank you for contacting us.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="mb-5">
                      <label htmlFor="name" className="mb-1.5 block text-[13px] font-semibold text-[#64748b] dark:text-[#94a3b8]">
                        Your Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Fatema Khanam"
                        className={inputClass}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="phone" className="mb-1.5 block text-[13px] font-semibold text-[#64748b] dark:text-[#94a3b8]">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+880 17XXXXXXXX"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-[#64748b] dark:text-[#94a3b8]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="fatema@example.com"
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="topic" className="mb-1.5 block text-[13px] font-semibold text-[#64748b] dark:text-[#94a3b8]">
                      Topic
                    </label>
                    <select id="topic" value={formData.topic} onChange={handleChange} className={inputClass}>
                      <option value="">- Choose a topic -</option>
                      <option value="account">Account & KYC</option>
                      <option value="deposit">Deposit / Withdrawal</option>
                      <option value="plan">Plan Upgrade</option>
                      <option value="circle">Savings Circles</option>
                      <option value="technical">Technical Issue</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="message" className="mb-1.5 block text-[13px] font-semibold text-[#64748b] dark:text-[#94a3b8]">
                      Message
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message..."
                      className={`${inputClass} min-h-[120px] resize-y`}
                    />
                  </div>

                  {error && (
                    <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 p-3">
                      <AlertCircle className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-red-500">{error}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,#059669,#0891b2)] p-3.5 text-[15px] font-bold text-white transition hover:-translate-y-px hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2e8f0] bg-white px-6 py-8 text-center dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <p className="text-[13px] text-[#64748b] dark:text-[#94a3b8]">
          © 2026 Amanah Savings Community. All rights reserved.
        </p>
      </footer>

      <div
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl bg-[#059669] px-6 py-3 text-sm font-semibold text-white transition ${
          toast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        }`}
      >
        {toast}
      </div>
    </div>
  );
};

export default ContactPage;
