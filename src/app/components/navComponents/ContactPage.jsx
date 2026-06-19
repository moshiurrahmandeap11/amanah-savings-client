"use client";

import React, { useState, useEffect } from "react";
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

// Translations
const translations = {
  en: {
    // Hero
    heroBadge: "Get in Touch",
    heroTitle: "We're Here to Help",
    heroDesc: "Have a question about your account, a plan, or just want to say hello? Our team responds within 24 hours.",
    
    // Contact Cards
    whatsappLabel: "WhatsApp Support",
    whatsappValue: "+880 1700-AMANAH",
    whatsappNote: "Fastest response, usually within 1 hour",
    whatsappButton: "Chat on WhatsApp",
    
    emailLabel: "Email Support",
    emailValue: "support@amanah.com.bd",
    emailNote: "For account issues, KYC, and billing queries",
    emailButton: "Send Email",
    
    addressLabel: "Office Address",
    addressValue: "House 12, Road 4, Banani, Dhaka-1213",
    addressNote: "Walk-in appointments available by prior arrangement",
    
    socialLabel: "Social Media",
    socialValue: "@AmanahSavingsBD",
    socialNote: "Facebook · Instagram · LinkedIn",
    
    // Support Hours
    supportHoursTitle: "Support Hours",
    sundayThursday: "Sunday - Thursday",
    friday: "Friday",
    saturday: "Saturday",
    whatsappUrgent: "WhatsApp (urgent)",
    
    // Form
    formTitle: "Send Us a Message",
    formDesc: "Fill out the form below and we'll get back to you within 24 hours.",
    nameLabel: "Your Name",
    namePlaceholder: "Fatema Khanam",
    phoneLabel: "Phone Number",
    phonePlaceholder: "+880 17XXXXXXXX",
    emailLabel: "Email Address",
    emailPlaceholder: "fatema@example.com",
    topicLabel: "Topic",
    topicPlaceholder: "- Choose a topic -",
    topicAccount: "Account & KYC",
    topicDeposit: "Deposit / Withdrawal",
    topicPlan: "Plan Upgrade",
    topicCircle: "Savings Circles",
    topicTechnical: "Technical Issue",
    topicOther: "Other",
    messageLabel: "Message",
    messagePlaceholder: "Write your message...",
    sendButton: "Send Message",
    sending: "Sending...",
    
    // Success
    successTitle: "Message Sent!",
    successDesc: "We'll reach out to you within 24 hours. Thank you for contacting us.",
    
    // Errors
    requiredFields: "Name and message are required.",
    failedToSend: "Failed to send message. Please try again.",
    
    // Footer
    footer: "© 2026 Amanah Savings Community. All rights reserved.",
  },
  bn: {
    // Hero
    heroBadge: "যোগাযোগ করুন",
    heroTitle: "আমরা সাহায্য করতে এখানে আছি",
    heroDesc: "আপনার অ্যাকাউন্ট, প্ল্যান বা শুধু হ্যালো বলতে চান? আমাদের টিম ২৪ ঘন্টার মধ্যে উত্তর দেয়।",
    
    // Contact Cards
    whatsappLabel: "হোয়াটসঅ্যাপ সাপোর্ট",
    whatsappValue: "+৮৮০ ১৭০০-আমানাহ",
    whatsappNote: "দ্রুত প্রতিক্রিয়া, সাধারণত ১ ঘন্টার মধ্যে",
    whatsappButton: "হোয়াটসঅ্যাপে চ্যাট করুন",
    
    emailLabel: "ইমেইল সাপোর্ট",
    emailValue: "support@amanah.com.bd",
    emailNote: "অ্যাকাউন্ট সমস্যা, কেওয়াইসি এবং বিলিং প্রশ্নের জন্য",
    emailButton: "ইমেইল পাঠান",
    
    addressLabel: "অফিস ঠিকানা",
    addressValue: "বাড়ি ১২, সড়ক ৪, বনানী, ঢাকা-১২১৩",
    addressNote: "পূর্ব ব্যবস্থায় ওয়াক-ইন অ্যাপয়েন্টমেন্ট পাওয়া যায়",
    
    socialLabel: "সোশ্যাল মিডিয়া",
    socialValue: "@AmanahSavingsBD",
    socialNote: "ফেসবুক · ইনস্টাগ্রাম · লিংকডইন",
    
    // Support Hours
    supportHoursTitle: "সাপোর্ট সময়",
    sundayThursday: "রবিবার - বৃহস্পতিবার",
    friday: "শুক্রবার",
    saturday: "শনিবার",
    whatsappUrgent: "হোয়াটসঅ্যাপ (জরুরি)",
    
    // Form
    formTitle: "আমাদের একটি বার্তা পাঠান",
    formDesc: "নিচের ফর্মটি পূরণ করুন এবং আমরা ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করব।",
    nameLabel: "আপনার নাম",
    namePlaceholder: "ফাতেমা খানম",
    phoneLabel: "ফোন নম্বর",
    phonePlaceholder: "+৮৮০ ১৭XXXXXXXX",
    emailLabel: "ইমেইল ঠিকানা",
    emailPlaceholder: "fatema@example.com",
    topicLabel: "বিষয়",
    topicPlaceholder: "- একটি বিষয় নির্বাচন করুন -",
    topicAccount: "অ্যাকাউন্ট ও কেওয়াইসি",
    topicDeposit: "জমা / উত্তোলন",
    topicPlan: "প্ল্যান আপগ্রেড",
    topicCircle: "সঞ্চয় সার্কেল",
    topicTechnical: "প্রযুক্তিগত সমস্যা",
    topicOther: "অন্যান্য",
    messageLabel: "বার্তা",
    messagePlaceholder: "আপনার বার্তা লিখুন...",
    sendButton: "বার্তা পাঠান",
    sending: "পাঠানো হচ্ছে...",
    
    // Success
    successTitle: "বার্তা পাঠানো হয়েছে!",
    successDesc: "আমরা ২৪ ঘন্টার মধ্যে আপনার সাথে যোগাযোগ করব। আমাদের সাথে যোগাযোগ করার জন্য ধন্যবাদ।",
    
    // Errors
    requiredFields: "নাম এবং বার্তা প্রয়োজন।",
    failedToSend: "বার্তা পাঠাতে ব্যর্থ হয়েছে। আবার চেষ্টা করুন।",
    
    // Footer
    footer: "© ২০২৬ আমানাহ সঞ্চয় সম্প্রদায়। সর্বস্বত্ব সংরক্ষিত।",
  }
};

const ContactPage = () => {
  const [language, setLanguage] = useState('en');
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
  });
  const [toast, setToast] = useState("");
  const [toastType, setToastType] = useState("success");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.id]: event.target.value,
    }));
    setError("");
  };

  const showToast = (message, type = "success") => {
    setToast(message);
    setToastType(type);
    window.setTimeout(() => setToast(""), 3500);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.message.trim()) {
      const message = t('requiredFields');
      setError(message);
      showToast(message, "error");
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
        const message = response.data.message || t('failedToSend');
        setError(message);
        showToast(message, "error");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      const message = err.response?.data?.message || t('failedToSend');
      setError(message);
      showToast(message, "error");
    } finally {
      setLoading(false);
    }
  };

  // Contact cards with translations
  const contactCards = [
    {
      icon: MessageCircle,
      label: t('whatsappLabel'),
      value: t('whatsappValue'),
      note: t('whatsappNote'),
      button: t('whatsappButton'),
      href: "https://wa.me/8801700262624",
      buttonClass: "bg-[#25D366] text-white",
    },
    {
      icon: Mail,
      label: t('emailLabel'),
      value: t('emailValue'),
      note: t('emailNote'),
      button: t('emailButton'),
      href: "mailto:support@amanah.com.bd",
      buttonClass: "bg-[#05966926] text-[#059669]",
    },
    {
      icon: MapPin,
      label: t('addressLabel'),
      value: t('addressValue'),
      note: t('addressNote'),
    },
    {
      icon: Globe,
      label: t('socialLabel'),
      value: t('socialValue'),
      note: t('socialNote'),
    },
  ];

  // Support hours with translations
  const supportHours = [
    [t('sundayThursday'), "9:00 AM - 8:00 PM"],
    [t('friday'), "2:00 PM - 8:00 PM"],
    [t('saturday'), "10:00 AM - 6:00 PM"],
    [t('whatsappUrgent'), "24/7"],
  ];

  const inputClass =
    "w-full rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-3 text-sm text-[#0f172a] outline-none transition focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]";

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f8fafc] font-['Segoe_UI',system-ui,sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#059669,#0891b2)] px-6 pb-20 pt-16 text-center">
        <div className="relative z-10 mx-auto max-w-[720px]">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[13px] font-semibold text-white">
            <Phone className="h-4 w-4" />
            {t('heroBadge')}
          </div>
          <h1 className="mb-3 text-[clamp(28px,4vw,48px)] font-black text-white">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto max-w-[500px] text-base text-white/85">
            {t('heroDesc')}
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-[60px] w-full">
            <path className="fill-[#f8fafc] dark:fill-[#0a0f1e]" d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Main Section */}
      <section className="px-6 py-[72px] max-md:px-4 max-md:py-14">
        <div className="mx-auto max-w-[1100px]">
          <div className="grid min-w-0 grid-cols-1 items-start gap-12 lg:grid-cols-[1fr_1.4fr]">
            {/* Left Column - Contact Cards */}
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

              {/* Support Hours */}
              <div className="mt-4 rounded-2xl border border-[#e2e8f0] bg-white p-6 dark:border-[#1e2d3d] dark:bg-[#131e2e]">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                  <Clock className="h-4 w-4 text-[#059669]" />
                  {t('supportHoursTitle')}
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

            {/* Right Column - Contact Form */}
            <div className="min-w-0 rounded-2xl border border-[#e2e8f0] bg-white p-9 dark:border-[#1e2d3d] dark:bg-[#131e2e] max-md:p-6">
              <h2 className="mb-1.5 text-[22px] font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">
                {t('formTitle')}
              </h2>
              <p className="mb-7 text-sm text-[#64748b] dark:text-[#94a3b8]">
                {t('formDesc')}
              </p>

              {submitted ? (
                <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-6 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20">
                    <CheckCircle className="h-8 w-8 text-green-500" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                    {t('successTitle')}
                  </h3>
                  <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">
                    {t('successDesc')}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="mb-5">
                      <label htmlFor="name" className="mb-1.5 block text-[13px] font-semibold text-[#64748b] dark:text-[#94a3b8]">
                        {t('nameLabel')}
                      </label>
                      <input
                        type="text"
                        id="name"
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={t('namePlaceholder')}
                        className={inputClass}
                      />
                    </div>
                    <div className="mb-5">
                      <label htmlFor="phone" className="mb-1.5 block text-[13px] font-semibold text-[#64748b] dark:text-[#94a3b8]">
                        {t('phoneLabel')}
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder={t('phonePlaceholder')}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="email" className="mb-1.5 block text-[13px] font-semibold text-[#64748b] dark:text-[#94a3b8]">
                      {t('emailLabel')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t('emailPlaceholder')}
                      className={inputClass}
                    />
                  </div>

                  <div className="mb-5">
                    <label htmlFor="topic" className="mb-1.5 block text-[13px] font-semibold text-[#64748b] dark:text-[#94a3b8]">
                      {t('topicLabel')}
                    </label>
                    <select id="topic" value={formData.topic} onChange={handleChange} className={inputClass}>
                      <option value="">{t('topicPlaceholder')}</option>
                      <option value="account">{t('topicAccount')}</option>
                      <option value="deposit">{t('topicDeposit')}</option>
                      <option value="plan">{t('topicPlan')}</option>
                      <option value="circle">{t('topicCircle')}</option>
                      <option value="technical">{t('topicTechnical')}</option>
                      <option value="other">{t('topicOther')}</option>
                    </select>
                  </div>

                  <div className="mb-5">
                    <label htmlFor="message" className="mb-1.5 block text-[13px] font-semibold text-[#64748b] dark:text-[#94a3b8]">
                      {t('messageLabel')}
                    </label>
                    <textarea
                      id="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder={t('messagePlaceholder')}
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
                        {t('sending')}
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        {t('sendButton')}
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e2e8f0] bg-white px-6 py-8 text-center dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <p className="text-[13px] text-[#64748b] dark:text-[#94a3b8]">
          {t('footer')}
        </p>
      </footer>

      {/* Toast Notification */}
      <div
        className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-xl px-6 py-3 text-sm font-semibold text-white transition ${
          toast ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
        } ${toastType === "error" ? "bg-red-500" : "bg-[#059669]"}`}
      >
        {toast}
      </div>
    </div>
  );
};

export default ContactPage;