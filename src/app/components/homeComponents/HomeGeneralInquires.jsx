"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

// Translations
const translations = {
  en: {
    // Section Header
    sectionBadge: "FAQ",
    sectionTitle: "Frequently Asked ",
    sectionTitleHighlight: "Questions",
    sectionDesc: "Everything you need to know before joining the Amanah community.",

    // FAQ Questions & Answers
    faq1Question: "Is Amanah a bank or investment company?",
    faq1Answer: "No. Amanah Savings Community is a digital savings circle platform. We are NOT a bank, investment firm, or licensed financial institution. We do not offer loans, interest, guaranteed returns, or investment products. We are a community savings management tool that helps members save money toward personal goals with discipline and accountability.",

    faq2Question: "Can I withdraw my money anytime?",
    faq2Answer: "Savings are locked until your chosen goal maturity date. This is by design — it encourages discipline and prevents impulsive spending. Emergency early withdrawals are possible but require admin approval and may take 5-7 business days. This is clearly stated when you join any savings circle.",

    faq3Question: "How do I deposit money into my savings?",
    faq3Answer: "We currently support bKash, Nagad, and bank transfer. After making a payment, upload your transaction screenshot via the dashboard and our admin team will verify and credit your savings within 2-4 hours. We are working on automated payment integration.",

    faq4Question: "Is this platform halal (Islamic finance compliant)?",
    faq4Answer: "Amanah's Islamic Savings Mode operates on a pure savings model with no interest (riba). Members save their own money toward goals — there is no lending, no interest, and no financial speculation. Our platform is structured as a savings community, which is fully permissible in Islamic finance. Consult your local scholar for your specific situation.",

    faq5Question: "What happens if I miss a monthly deposit?",
    faq5Answer: "Missing a deposit will pause your savings streak and delay your goal completion date. You will receive reminders 3 days before, 1 day before, and on the due date. You can use the \"Emergency Pause Mode\" to temporarily pause your circle for up to 2 months with admin approval (e.g., illness or financial hardship).",

    faq6Question: "How does the referral system work?",
    faq6Answer: "When someone registers using your referral link and completes their first deposit, you both earn referral rewards. Rewards are credited as savings bonuses to your account. This is a community growth incentive — not an MLM or pyramid structure. Referrals have no impact on savings distribution.",
  },
  bn: {
    // Section Header
    sectionBadge: "প্রশ্নোত্তর",
    sectionTitle: "প্রায়শই জিজ্ঞাসিত ",
    sectionTitleHighlight: "প্রশ্ন",
    sectionDesc: "আমানাহ কমিউনিটিতে যোগদানের আগে আপনার যা জানা দরকার।",

    // FAQ Questions & Answers
    faq1Question: "আমানাহ কি একটি ব্যাংক বা বিনিয়োগ কোম্পানি?",
    faq1Answer: "না। আমানাহ সঞ্চয় সম্প্রদায় একটি ডিজিটাল সঞ্চয় সার্কেল প্ল্যাটফর্ম। আমরা একটি ব্যাংক, বিনিয়োগ ফার্ম বা লাইসেন্সপ্রাপ্ত আর্থিক প্রতিষ্ঠান নই। আমরা ঋণ, সুদ, গ্যারান্টিড রিটার্ন বা বিনিয়োগ পণ্য অফার করি না। আমরা একটি কমিউনিটি সঞ্চয় ব্যবস্থাপনা টুল যা সদস্যদের শৃঙ্খলা এবং দায়বদ্ধতার সাথে ব্যক্তিগত লক্ষ্যের জন্য টাকা সঞ্চয় করতে সহায়তা করে।",

    faq2Question: "আমি কি যেকোনো সময় আমার টাকা উত্তোলন করতে পারি?",
    faq2Answer: "আপনার নির্বাচিত লক্ষ্য পরিপক্কতার তারিখ পর্যন্ত সঞ্চয় লক করা থাকে। এটি ডিজাইন অনুযায়ী — এটি শৃঙ্খলা উৎসাহিত করে এবং আবেগপ্রবণ খরচ প্রতিরোধ করে। জরুরি অকাল উত্তোলন সম্ভব কিন্তু প্রশাসকের অনুমোদন প্রয়োজন এবং ৫-৭ কার্যদিবস সময় লাগতে পারে। আপনি যখন কোন সঞ্চয় সার্কেলে যোগ দেন তখন এটি স্পষ্টভাবে উল্লেখ করা থাকে।",

    faq3Question: "আমি কীভাবে আমার সঞ্চয়ে টাকা জমা করব?",
    faq3Answer: "আমরা বর্তমানে বিকাশ, নগদ এবং ব্যাংক ট্রান্সফার সমর্থন করি। পেমেন্ট করার পর, ড্যাশবোর্ডের মাধ্যমে আপনার লেনদেনের স্ক্রিনশট আপলোড করুন এবং আমাদের অ্যাডমিন টিম ২-৪ ঘন্টার মধ্যে যাচাই করে আপনার সঞ্চয়ে ক্রেডিট করবে। আমরা স্বয়ংক্রিয় পেমেন্ট ইন্টিগ্রেশন নিয়ে কাজ করছি।",

    faq4Question: "এই প্ল্যাটফর্মটি কি হালাল (ইসলামিক ফাইন্যান্স সামঞ্জস্যপূর্ণ)?",
    faq4Answer: "আমানাহের ইসলামিক সঞ্চয় মোড একটি বিশুদ্ধ সঞ্চয় মডেলে কাজ করে যেখানে কোন সুদ (রিবা) নেই। সদস্যরা তাদের নিজস্ব টাকা লক্ষ্যের দিকে সঞ্চয় করে — কোন ঋণ, কোন সুদ এবং কোন আর্থিক অনুমান নেই। আমাদের প্ল্যাটফর্ম একটি সঞ্চয় সম্প্রদায় হিসাবে গঠন করা হয়েছে, যা ইসলামিক ফাইন্যান্সে সম্পূর্ণ অনুমোদিত। আপনার নির্দিষ্ট পরিস্থিতির জন্য আপনার স্থানীয় পণ্ডিতের সাথে পরামর্শ করুন।",

    faq5Question: "যদি আমি মাসিক জমা মিস করি তাহলে কী হবে?",
    faq5Answer: "জমা মিস করলে আপনার সঞ্চয় ধারা বিরতি পাবে এবং আপনার লক্ষ্য সম্পূর্ণ করার তারিখ বিলম্বিত হবে। আপনি ৩ দিন আগে, ১ দিন আগে এবং নির্ধারিত তারিখে রিমাইন্ডার পাবেন। আপনি প্রশাসকের অনুমোদনের সাথে ২ মাস পর্যন্ত আপনার সার্কেল সাময়িকভাবে বিরতি দেওয়ার জন্য \"জরুরি বিরতি মোড\" ব্যবহার করতে পারেন (যেমন: অসুস্থতা বা আর্থিক সংকট)।",

    faq6Question: "রেফারেল সিস্টেম কিভাবে কাজ করে?",
    faq6Answer: "যখন কেউ আপনার রেফারেল লিংক ব্যবহার করে নিবন্ধন করে এবং তাদের প্রথম জমা সম্পূর্ণ করে, তখন আপনি উভয়েই রেফারেল পুরস্কার পান। পুরস্কারগুলি আপনার অ্যাকাউন্টে সঞ্চয় বোনাস হিসাবে ক্রেডিট করা হয়। এটি একটি কমিউনিটি বৃদ্ধির প্রণোদনা — কোন এমএলএম বা পিরামিড কাঠামো নয়। রেফারেলগুলির সঞ্চয় বিতরণে কোন প্রভাব নেই।",
  }
};

const HomeGeneralInquiries = () => {
  const [language, setLanguage] = useState('en');
  const [openIndex, setOpenIndex] = useState(null);

  // Get language from localStorage
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Get FAQs with translations
  const faqs = [
    {
      question: t('faq1Question'),
      answer: t('faq1Answer'),
    },
    {
      question: t('faq2Question'),
      answer: t('faq2Answer'),
    },
    {
      question: t('faq3Question'),
      answer: t('faq3Answer'),
    },
    {
      question: t('faq4Question'),
      answer: t('faq4Answer'),
    },
    {
      question: t('faq5Question'),
      answer: t('faq5Answer'),
    },
    {
      question: t('faq6Question'),
      answer: t('faq6Answer'),
    },
  ];

  const toggleFaq = (index) => {
    setOpenIndex((current) => (current === index ? null : index));
  };

  return (
    <section
      id="faq"
      className="bg-white py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9] md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
          {t('sectionBadge')}
        </span>

        <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
          {t('sectionTitle')}
          <span className="text-[#059669]">{t('sectionTitleHighlight')}</span>
        </h2>

        <p className="mx-auto max-w-[580px] text-lg leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
          {t('sectionDesc')}
        </p>

        <div className="mx-auto mt-12 max-w-[720px] text-left">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className={`mb-3 overflow-hidden rounded-xl border transition-all duration-300 ${
                  isOpen
                    ? "border-[#059669]"
                    : "border-[#e2e8f0] dark:border-[#1e2d3d]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="flex w-full items-center justify-between gap-4 bg-transparent px-5 py-[18px] text-left text-[15px] font-semibold text-[#0f172a] transition-colors duration-200 hover:bg-[#059669]/[0.03] dark:text-[#f1f5f9]"
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-[#94a3b8] transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-[#059669]" : ""
                    }`}
                    aria-hidden="true"
                  />
                </button>

                <div
                  className={`overflow-hidden transition-[max-height] duration-350 ease-in-out ${
                    isOpen ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  <div className="px-5 pb-[18px] text-sm leading-[1.7] text-[#475569] dark:text-[#94a3b8]">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HomeGeneralInquiries;