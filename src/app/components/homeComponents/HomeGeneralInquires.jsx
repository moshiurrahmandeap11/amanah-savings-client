"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is Amanah a bank or investment company?",
    answer:
      "No. Amanah Savings Community is a digital savings circle platform. We are NOT a bank, investment firm, or licensed financial institution. We do not offer loans, interest, guaranteed returns, or investment products. We are a community savings management tool that helps members save money toward personal goals with discipline and accountability.",
  },
  {
    question: "Can I withdraw my money anytime?",
    answer:
      "Savings are locked until your chosen goal maturity date. This is by design — it encourages discipline and prevents impulsive spending. Emergency early withdrawals are possible but require admin approval and may take 5-7 business days. This is clearly stated when you join any savings circle.",
  },
  {
    question: "How do I deposit money into my savings?",
    answer:
      "We currently support bKash, Nagad, and bank transfer. After making a payment, upload your transaction screenshot via the dashboard and our admin team will verify and credit your savings within 2-4 hours. We are working on automated payment integration.",
  },
  {
    question: "Is this platform halal (Islamic finance compliant)?",
    answer:
      "Amanah's Islamic Savings Mode operates on a pure savings model with no interest (riba). Members save their own money toward goals — there is no lending, no interest, and no financial speculation. Our platform is structured as a savings community, which is fully permissible in Islamic finance. Consult your local scholar for your specific situation.",
  },
  {
    question: "What happens if I miss a monthly deposit?",
    answer:
      'Missing a deposit will pause your savings streak and delay your goal completion date. You will receive reminders 3 days before, 1 day before, and on the due date. You can use the "Emergency Pause Mode" to temporarily pause your circle for up to 2 months with admin approval (e.g., illness or financial hardship).',
  },
  {
    question: "How does the referral system work?",
    answer:
      "When someone registers using your referral link and completes their first deposit, you both earn referral rewards. Rewards are credited as savings bonuses to your account. This is a community growth incentive — not an MLM or pyramid structure. Referrals have no impact on savings distribution.",
  },
];

const HomeGeneralInquiries = () => {
  const [openIndex, setOpenIndex] = useState(null);

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
          FAQ
        </span>

        <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
          Frequently Asked <span className="text-[#059669]">Questions</span>
        </h2>

        <p className="mx-auto max-w-[580px] text-lg leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
          Everything you need to know before joining the Amanah community.
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
