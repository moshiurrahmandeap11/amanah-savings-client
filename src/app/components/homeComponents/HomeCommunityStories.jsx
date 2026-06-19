"use client";

import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { useState, useEffect } from "react";

// Translations
const translations = {
  en: {
    // Section Header
    sectionBadge: "Community Stories",
    sectionTitle: "What Our ",
    sectionTitleHighlight: "Members Say",
    
    // Testimonial 1
    testimonial1Text: "I saved ৳2.4 lakh for my wedding in just 18 months! The savings circle kept me disciplined when I wanted to spend the money. Amanah changed my life.",
    testimonial1Name: "Rahima Begum",
    testimonial1Role: "Homemaker, Dhaka · Wedding Fund",
    testimonial1Initial: "R",
    
    // Testimonial 2
    testimonial2Text: "As a student, I saved ৳50,000 for my laptop using the Bronze plan. The AI assistant told me exactly how much to save each week. Incredible platform!",
    testimonial2Name: "Karim Ahmed",
    testimonial2Role: "University Student, Chittagong · Gadget Fund",
    testimonial2Initial: "K",
    
    // Testimonial 3
    testimonial3Text: "Our family joined a Hajj savings circle and we're on track for 2027. The Islamic savings mode gives us peace of mind that everything is halal.",
    testimonial3Name: "Nasrin & Husband",
    testimonial3Role: "Family, Sylhet · Hajj Fund Active",
    testimonial3Initial: "N",
  },
  bn: {
    // Section Header
    sectionBadge: "কমিউনিটি গল্প",
    sectionTitle: "আমাদের ",
    sectionTitleHighlight: "সদস্যরা যা বলেন",
    
    // Testimonial 1
    testimonial1Text: "আমি মাত্র ১৮ মাসে আমার বিয়ের জন্য ৳২.৪ লাখ সঞ্চয় করেছি! সঞ্চয় সার্কেল আমাকে শৃঙ্খলাবদ্ধ রেখেছিল যখন আমি টাকা খরচ করতে চাইতাম। আমানাহ আমার জীবন বদলে দিয়েছে।",
    testimonial1Name: "রাহিমা বেগম",
    testimonial1Role: "গৃহিণী, ঢাকা · বিয়ে তহবিল",
    testimonial1Initial: "র",
    
    // Testimonial 2
    testimonial2Text: "ছাত্র হিসেবে, আমি ব্রোঞ্জ প্ল্যান ব্যবহার করে আমার ল্যাপটপের জন্য ৳৫০,০০০ সঞ্চয় করেছি। এআই সহায়ক আমাকে ঠিক বলে দিয়েছে প্রতিটি সপ্তাহে কত সঞ্চয় করতে হবে। অবিশ্বাস্য প্ল্যাটফর্ম!",
    testimonial2Name: "করিম আহমেদ",
    testimonial2Role: "বিশ্ববিদ্যালয় ছাত্র, চট্টগ্রাম · গ্যাজেট তহবিল",
    testimonial2Initial: "ক",
    
    // Testimonial 3
    testimonial3Text: "আমাদের পরিবার একটি হজ সঞ্চয় সার্কেলে যোগ দিয়েছে এবং আমরা ২০২৭ সালের জন্য ট্র্যাকে আছি। ইসলামিক সঞ্চয় মোড আমাদের মানসিক শান্তি দেয় যে সবকিছু হালাল।",
    testimonial3Name: "নাসরিন ও স্বামী",
    testimonial3Role: "পরিবার, সিলেট · হজ তহবিল সক্রিয়",
    testimonial3Initial: "ন",
  }
};

const HomeCommunityStories = () => {
  const [language, setLanguage] = useState('en');

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Get testimonials with translations
  const testimonials = [
    {
      text: t('testimonial1Text'),
      name: t('testimonial1Name'),
      role: t('testimonial1Role'),
      initial: t('testimonial1Initial'),
      avatar: "linear-gradient(135deg,#059669,#0891b2)",
    },
    {
      text: t('testimonial2Text'),
      name: t('testimonial2Name'),
      role: t('testimonial2Role'),
      initial: t('testimonial2Initial'),
      avatar: "linear-gradient(135deg,#3b82f6,#8b5cf6)",
    },
    {
      text: t('testimonial3Text'),
      name: t('testimonial3Name'),
      role: t('testimonial3Role'),
      initial: t('testimonial3Initial'),
      avatar: "linear-gradient(135deg,#059669,#0891b2)",
    },
  ];

  return (
    <section className="bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[linear-gradient(135deg,#022c22_0%,#0c1a3a_100%)] dark:text-[#f1f5f9] md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
          {t('sectionBadge')}
        </span>

        <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
          {t('sectionTitle')}
          <span className="text-[#059669]">{t('sectionTitleHighlight')}</span>
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
              language={language}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, index, language }) => {
  // Check if language is Bangla for RTL support
  const isBangla = language === 'bn';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      className="rounded-[20px] border border-[#e2e8f0] bg-white p-6 text-left shadow-[0_4px_24px_rgba(0,0,0,0.06)] dark:border-[#1e2d3d] dark:bg-[#1a2235]"
    >
      <div className="mb-3 text-sm text-[#f59e0b]">★★★★★</div>

      <p className={`mb-4 text-sm italic leading-[1.7] text-[#475569] dark:text-[#94a3b8] ${isBangla ? 'font-noto' : ''}`}>
        &quot;{testimonial.text}&quot;
      </p>

      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-base font-bold text-white"
          style={{ background: testimonial.avatar }}
        >
          {testimonial.initial}
        </div>
        <div>
          <div className={`text-sm font-bold text-[#0f172a] dark:text-[#f1f5f9] ${isBangla ? 'font-noto' : ''}`}>
            {testimonial.name}
          </div>
          <div className={`flex items-center gap-1.5 text-xs text-[#94a3b8] ${isBangla ? 'font-noto' : ''}`}>
            <span>{testimonial.role}</span>
            <CheckCircle size={12} className="shrink-0 text-[#059669]" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default HomeCommunityStories;