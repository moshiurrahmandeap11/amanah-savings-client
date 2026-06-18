"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Award,
  Check,
  Crown,
  Gem,
  Medal,
} from "lucide-react";
import Link from "next/link";

const plans = [
  {
    name: "Bronze",
    Icon: Medal,
    range: "৳500 – ৳2,000",
    period: "/ month",
    description: "Perfect for students and beginners starting their savings journey",
    features: [
      "Monthly savings deposit",
      "1 active savings goal",
      "Basic progress tracking",
      "Community badge",
      "Mobile notifications",
    ],
    accent: "linear-gradient(90deg, #cd7f32, #e8a96a)",
    iconColor: "#cd7f32",
    button: "outline",
  },
  {
    name: "Silver",
    Icon: Award,
    range: "৳2,000 – ৳10,000",
    period: "/ month",
    description: "Ideal for young professionals building multiple goals simultaneously",
    features: [
      "Weekly or monthly deposits",
      "Up to 3 active goals",
      "Advanced analytics",
      "AI savings insights",
      "Priority support",
    ],
    accent: "linear-gradient(90deg, #94a3b8, #cbd5e1)",
    iconColor: "#94a3b8",
    button: "outline",
  },
  {
    name: "Gold",
    Icon: Crown,
    range: "৳10,000 – ৳50,000",
    period: "/ month",
    description: "For families and serious savers with big goals and community leadership",
    features: [
      "Flexible weekly deposits",
      "Up to 5 active goals",
      "Family savings mode",
      "Leaderboard access",
      "Referral rewards",
      "Early goal refresh",
    ],
    accent: "linear-gradient(90deg, #f59e0b, #fcd34d)",
    iconColor: "#f59e0b",
    popular: true,
    button: "primary",
  },
  {
    name: "Platinum",
    Icon: Gem,
    range: "৳50,000+",
    period: "/ month",
    description: "Premium tier for high-discipline savers and community circle leaders",
    features: [
      "Unlimited active goals",
      "Circle leadership role",
      "Dedicated account manager",
      "Custom savings vault",
      "VIP community access",
      "Early maturity options",
    ],
    accent: "linear-gradient(135deg, #059669 0%, #0891b2 100%)",
    iconColor: "#059669",
    button: "primary",
  },
];

const SavingsPlanSection = () => {
  return (
    <section
      id="plans"
      className="bg-[#f8fafc] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#111827] dark:text-[#f1f5f9] md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
          Savings Plans
        </span>

        <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
          Choose Your <span className="text-[#059669]">Savings Tier</span>
        </h2>

        <p className="mx-auto max-w-[580px] text-lg leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
          Start small or save big — flexible plans for every income level. All
          plans are locked until maturity.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan, index) => (
            <PlanCard key={plan.name} plan={plan} index={index} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mx-auto mt-6 flex max-w-3xl items-start justify-center gap-2 text-[13px] leading-[1.6] text-[#94a3b8]"
        >
          <AlertTriangle
            size={15}
            className="mt-0.5 shrink-0 text-[#f59e0b]"
            aria-hidden="true"
          />
          <span>
            All savings are member-owned and locked until goal maturity. Amanah
            is a savings community, not a bank or investment firm.
          </span>
        </motion.p>
      </div>
    </section>
  );
};

const PlanCard = ({ plan, index }) => {
  const { Icon } = plan;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      className={`group relative overflow-hidden rounded-[20px] bg-white px-5 py-7 text-center shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:bg-[#1a2235] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${
        plan.popular
          ? "scale-[1.03] border-2 border-[#059669] max-lg:scale-100"
          : "border border-[#e2e8f0] dark:border-[#1e2d3d]"
      }`}
    >
      <div
        className="absolute left-0 right-0 top-0 h-1"
        style={{ background: plan.accent }}
      />

      {plan.popular && (
        <div className="absolute right-3.5 top-4 rounded-[10px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] px-2.5 py-[3px] text-[10px] font-bold text-white">
          Most Popular
        </div>
      )}

      <Icon
        size={36}
        strokeWidth={1.9}
        className="mx-auto mb-3"
        style={{ color: plan.iconColor }}
        aria-hidden="true"
      />

      <h3 className="mb-1 text-lg font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">
        {plan.name}
      </h3>

      <div className="mb-2 text-[22px] font-black leading-tight text-[#059669]">
        {plan.range}{" "}
        <span className="text-[13px] font-medium text-[#94a3b8]">
          {plan.period}
        </span>
      </div>

      <p className="mb-4 text-[13px] leading-[1.5] text-[#475569] dark:text-[#94a3b8]">
        {plan.description}
      </p>

      <ul className="mb-5 space-y-0 text-left">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 py-[5px] text-[13px] text-[#475569] dark:text-[#94a3b8]"
          >
            <Check
              size={14}
              strokeWidth={3}
              className="shrink-0 text-[#059669]"
              aria-hidden="true"
            />
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/register"
        className={
          plan.button === "primary"
            ? "inline-flex w-full items-center justify-center rounded-[10px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_4px_15px_rgba(5,150,105,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(5,150,105,0.45)]"
            : "inline-flex w-full items-center justify-center rounded-[10px] border border-[#e2e8f0] bg-transparent px-6 py-3 text-[15px] font-semibold text-[#0f172a] transition-all duration-200 hover:border-[#059669] hover:bg-[#059669]/5 hover:text-[#059669] dark:border-[#1e2d3d] dark:text-[#f1f5f9]"
        }
      >
        Get Started
      </Link>
    </motion.div>
  );
};

export default SavingsPlanSection;
