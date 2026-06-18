"use client";

import { motion } from "framer-motion";
import {
  CreditCard,
  FilePenLine,
  IdCard,
  Target,
  Trophy,
} from "lucide-react";

const steps = [
  {
    id: 1,
    Icon: FilePenLine,
    title: "1. Register",
    description: "Create your account with phone or email in under 2 minutes",
  },
  {
    id: 2,
    Icon: IdCard,
    title: "2. Verify",
    description: "Complete NID & phone verification for maximum security",
  },
  {
    id: 3,
    Icon: Target,
    title: "3. Choose Goal",
    description: "Pick a savings goal or join an active community circle",
  },
  {
    id: 4,
    Icon: CreditCard,
    title: "4. Deposit",
    description: "Send weekly or monthly via bKash, Nagad, or bank transfer",
  },
  {
    id: 5,
    Icon: Trophy,
    title: "5. Complete",
    description: "Reach your goal maturity and withdraw your full savings",
  },
];

const stats = [
  { value: "12,400+", label: "Verified member" },
  { value: "৳48 Cr+", label: "Community savings" },
  { value: "1,240+", label: "Active circle" },
  { value: "98%", label: "Completion rate" },
];

const HowItWorksPage = () => {
  return (
    <>
      <section
        id="how-it-works"
        className="bg-white py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9] md:py-24"
      >
        <div className="mx-auto max-w-[1200px] px-6 text-center">
          <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
            Simple Process
          </span>

          <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
            How <span className="text-[#059669]">Sanchoy Bondhu</span> Works
          </h2>

          <p className="mx-auto max-w-[580px] text-lg leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
            Five simple steps to start your savings journey with community
            discipline and digital security.
          </p>

          <div className="relative mt-14 flex items-start justify-between gap-4 max-md:flex-col max-md:items-center max-md:gap-6">
            <div className="absolute left-[10%] right-[10%] top-7 z-0 h-0.5 bg-[linear-gradient(90deg,#059669,#3b82f6)] opacity-30 max-md:hidden" />

            {steps.map((step, index) => (
              <StepItem key={step.id} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-white">
        <div className="mx-auto grid max-w-[1200px] grid-cols-2 gap-6 px-6 text-center md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="text-[34px] font-black leading-none tracking-normal sm:text-[42px]">
                {stat.value}
              </div>
              <div className="mt-4 text-sm leading-none text-white/80 sm:text-[14px]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
};

const StepItem = ({ step, index }) => {
  const { Icon } = step;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group relative z-10 flex-1 text-center max-md:w-full max-md:max-w-[320px]"
    >
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] text-white shadow-[0_8px_24px_rgba(5,150,105,0.3)] transition-transform duration-300 group-hover:scale-110">
        <Icon size={24} strokeWidth={2.2} aria-hidden="true" />
      </div>

      <h3 className="mb-2 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">
        {step.title}
      </h3>

      <p className="text-[13px] leading-[1.5] text-[#475569] dark:text-[#94a3b8]">
        {step.description}
      </p>
    </motion.div>
  );
};

export default HowItWorksPage;
