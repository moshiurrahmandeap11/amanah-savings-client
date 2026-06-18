"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  Bot,
  Check,
  ChevronDown,
  CreditCard,
  Gem,
  Medal,
  Moon,
  ShieldCheck,
  Star,
  Trophy,
  Users,
  Wallet,
  X,
} from "lucide-react";

const plans = [
  {
    id: "bronze",
    tier: "Bronze",
    name: "Starter",
    icon: Medal,
    monthly: 0,
    yearly: 0,
    color: "#c2694f",
    iconClass: "bg-gradient-to-br from-[#fef3c7] to-[#fde68a] text-[#b45309]",
    cta: "Start Free",
    desc: "Perfect for beginners. Save at your own pace with no platform fee, forever.",
    features: [
      ["Up to 3 savings goals", true],
      ["Min deposit: ৳500/month", true],
      ["bKash & Nagad payments", true],
      ["Basic progress tracking", true],
      ["Community access (read)", true],
      ["Savings circles", false],
      ["AI savings insights", false],
      ["Priority withdrawals", false],
    ],
  },
  {
    id: "silver",
    tier: "Silver",
    name: "Essential",
    icon: Award,
    monthly: 199,
    yearly: 159,
    color: "#94a3b8",
    iconClass: "bg-gradient-to-br from-[#f1f5f9] to-[#e2e8f0] text-[#64748b]",
    cta: "Choose Silver",
    desc: "For regular savers building serious momentum with community features.",
    features: [
      ["Up to 6 savings goals", true],
      ["Min deposit: ৳1,000/month", true],
      ["All payment methods", true],
      ["Join 1 savings circle", true],
      ["Streak tracking + badges", true],
      ["Monthly insights report", true],
      ["AI financial assistant", false],
      ["Priority withdrawals", false],
    ],
  },
  {
    id: "gold",
    tier: "Gold",
    name: "Growth",
    icon: Trophy,
    monthly: 499,
    yearly: 399,
    color: "#f59e0b",
    iconClass: "bg-gradient-to-br from-[#fef9c3] to-[#fde047] text-[#a16207]",
    popular: true,
    cta: "Choose Gold",
    desc: "Our flagship plan with AI assistant, unlimited goals, and full circle access.",
    features: [
      ["Unlimited savings goals", true],
      ["Min deposit: ৳2,000/month", true],
      ["All payment methods", true],
      ["Join up to 3 circles", true],
      ["AI savings assistant", true],
      ["Weekly insights report", true],
      ["Leaderboard participation", true],
      ["Priority withdrawal (3 days)", true],
    ],
  },
  {
    id: "platinum",
    tier: "Platinum",
    name: "Elite",
    icon: Gem,
    monthly: 999,
    yearly: 799,
    color: "#7c3aed",
    iconClass: "bg-gradient-to-br from-[#ede9fe] to-[#ddd6fe] text-[#6d28d9]",
    cta: "Choose Platinum",
    desc: "For power savers who want exclusive features, dedicated support & elite status.",
    features: [
      ["Unlimited savings goals", true],
      ["Min deposit: ৳5,000/month", true],
      ["All payment methods + bank", true],
      ["Create + join 10 circles", true],
      ["Advanced AI assistant", true],
      ["Daily personalized report", true],
      ["Priority withdrawal (24h)", true],
      ["Dedicated account manager", true],
    ],
  },
];

const comparisonGroups = [
  {
    label: "Savings Limits",
    icon: Wallet,
    rows: [
      ["Active savings goals", "Up to 3", "Up to 6", "Unlimited", "Unlimited"],
      ["Min monthly deposit", "৳500", "৳1,000", "৳2,000", "৳5,000"],
      ["Max single deposit", "৳10,000", "৳25,000", "৳1,00,000", "৳5,00,000"],
      ["Goal lock period", "3-12 months", "3-24 months", "3-60 months", "Custom"],
    ],
  },
  {
    label: "Payments",
    icon: CreditCard,
    rows: [
      ["bKash & Nagad", true, true, true, true],
      ["Bank Transfer", false, true, true, true],
      ["Withdrawal time", "7-10 days", "5-7 days", "3 days", "24 hours"],
      ["Early withdrawal", false, "With fee", "With fee", "Free once/yr"],
    ],
  },
  {
    label: "Community Circles",
    icon: Users,
    rows: [
      ["Join circles", false, "1 circle", "3 circles", "10 circles"],
      ["Create circles", false, false, "1 circle", "3 circles"],
      ["Circle admin tools", false, false, true, true],
    ],
  },
  {
    label: "AI & Insights",
    icon: Bot,
    rows: [
      ["Savings insights report", false, "Monthly", "Weekly", "Daily"],
      ["AI financial assistant", false, false, true, "Advanced"],
      ["Goal projections", "Basic", "Standard", "Advanced", "Advanced+"],
    ],
  },
  {
    label: "Gamification",
    icon: Trophy,
    rows: [
      ["Streak tracking", true, true, true, true],
      ["Achievement badges", "5 badges", "20 badges", "All badges", "All + exclusive"],
      ["Community leaderboard", false, "View only", "Full access", "Featured profile"],
      ["Savings challenges", false, true, true, true],
    ],
  },
  {
    label: "Security & Support",
    icon: ShieldCheck,
    rows: [
      ["KYC verification", "Standard", "Standard", "Enhanced", "Premium"],
      ["2-factor auth", true, true, true, true],
      ["Customer support", "Email", "Email + Chat", "Priority chat", "Dedicated manager"],
      ["Account manager", false, false, false, true],
    ],
  },
  {
    label: "Islamic Mode",
    icon: Moon,
    rows: [
      ["Riba-free savings", true, true, true, true],
      ["Halal goal categories", true, true, true, true],
    ],
  },
];

const testimonials = [
  {
    quote:
      "Started on Bronze, upgraded to Gold after 2 months. The AI assistant showed me I was overspending ৳800/month. I redirected it to my Hajj goal and now I'm on track 6 months early!",
    name: "Rashida Begum",
    plan: "Gold Member · Dhaka",
    avatar: "R",
    stars: 5,
  },
  {
    quote:
      "Platinum is worth every taka. My account manager helped me set up 4 goals at once: wedding fund, emergency savings, a laptop goal, and business startup savings.",
    name: "Kamal Hossain",
    plan: "Platinum Member · Chittagong",
    avatar: "K",
    stars: 5,
  },
  {
    quote:
      "Silver is exactly what I needed. The savings circle with my cousins keeps me accountable. We're saving together for a family trip to Cox's Bazar next Eid.",
    name: "Nasrin Akter",
    plan: "Silver Member · Sylhet",
    avatar: "N",
    stars: 4,
  },
];

const faqs = [
  [
    "Can I change my plan later?",
    "Yes! You can upgrade your plan at any time from your dashboard settings. Downgrading is also possible at the end of your current billing cycle, though features like additional circles or AI access will be removed if you move to a lower tier.",
  ],
  [
    "Is there a free trial for paid plans?",
    "Silver and Gold plans include a 30-day free trial with full features. Platinum offers a 14-day trial with a dedicated account manager. No credit card required to start, just KYC verification.",
  ],
  [
    "What happens if I miss a monthly deposit?",
    "Missing a deposit breaks your savings streak but does not cancel your plan. Your goal timeline adjusts automatically. We send SMS reminders 3 days before your deposit date. There are no late fees.",
  ],
  [
    "How is this different from a bank savings account?",
    "Amanah is a digital savings community, not a bank. We do not offer interest, FDIC-style insurance, or banking services. We are a goal-tracking and community savings platform.",
  ],
  [
    "Can I withdraw before my goal date?",
    "Yes, but early withdrawals may incur a small processing fee to cover administrative costs. Bronze members cannot make early withdrawals. Platinum members get one free early withdrawal per year.",
  ],
  [
    "Is Islamic Mode available on all plans?",
    "Yes, Islamic savings mode is available on every plan including Bronze. Toggle it on during registration or in your profile settings for riba-free goal and circle calculations.",
  ],
  [
    "What payment methods are accepted?",
    "Bronze members can use bKash and Nagad. Silver, Gold, and Platinum members also have access to bank transfer. Deposits are manually verified within 24 hours by our finance team.",
  ],
  [
    "Are there any hidden fees?",
    "No hidden fees, ever. The platform fee for Silver, Gold, and Platinum is clearly stated. We will always give notice before any fee changes.",
  ],
];

const planOptions = {
  bronze: { label: "Bronze", min: 500 },
  silver: { label: "Silver", min: 1000 },
  gold: { label: "Gold", min: 2000 },
  platinum: { label: "Platinum", min: 5000 },
};

const formatBDT = (value) => `৳${Number(value).toLocaleString("en-US")}`;

function SectionHeading({ label, title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <div className="mb-3 text-[13px] font-bold uppercase tracking-[1.5px] text-[#059669]">
        {label}
      </div>
      <h2 className="mb-4 text-[clamp(26px,4vw,40px)] font-extrabold leading-tight text-[#0f172a] dark:text-[#f1f5f9]">
        {title}
      </h2>
      {subtitle && (
        <p className="mx-auto max-w-[560px] text-base leading-relaxed text-[#475569] dark:text-[#94a3b8]">
          {subtitle}
        </p>
      )}
    </div>
  );
}

function ValueCell({ value, highlight }) {
  if (value === true) {
    return (
      <td className={`px-4 py-4 text-center text-sm ${highlight ? "bg-[#0596690a] dark:bg-[#10b98114]" : ""}`}>
        <Check className="mx-auto h-[18px] w-[18px] text-[#059669]" strokeWidth={3} />
      </td>
    );
  }

  if (value === false) {
    return (
      <td className={`px-4 py-4 text-center text-sm ${highlight ? "bg-[#0596690a] dark:bg-[#10b98114]" : ""}`}>
        <X className="mx-auto h-[18px] w-[18px] text-[#ef4444]" strokeWidth={3} />
      </td>
    );
  }

  return (
    <td
      className={`px-4 py-4 text-center text-sm text-[#475569] ${
        highlight ? "bg-[#0596690a] font-bold text-[#0f172a] dark:bg-[#10b98114] dark:text-[#f1f5f9]" : "dark:text-[#94a3b8]"
      }`}
    >
      {value}
    </td>
  );
}

const PlanPage = () => {
  const [billingMode, setBillingMode] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState("gold");
  const [deposit, setDeposit] = useState(3000);
  const [duration, setDuration] = useState(12);
  const [target, setTarget] = useState("");
  const [openFaq, setOpenFaq] = useState(null);

  const selectedPlanData = planOptions[selectedPlan];
  const totalSaved = deposit * duration;
  const targetAmount = Number(target) || 0;
  const monthsNeeded = targetAmount > 0 ? Math.ceil(targetAmount / deposit) : null;

  const goalMessage = useMemo(() => {
    if (!targetAmount) return "";
    if (totalSaved >= targetAmount) {
      return `You will reach your target in ${monthsNeeded} months with this monthly deposit.`;
    }
    return `You need ${monthsNeeded} months total to reach your target. Increase your deposit to finish sooner.`;
  }, [monthsNeeded, targetAmount, totalSaved]);

  const handlePlanChange = (value) => {
    const nextMin = planOptions[value].min;
    setSelectedPlan(value);
    setDeposit((current) => Math.max(current, nextMin));
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-white font-['Inter',sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#059669] to-[#0891b2] px-6 pb-[100px] pt-20 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,255,255,0.08)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.06)_0%,transparent_40%)]" />
        <div className="relative z-10 mx-auto max-w-[700px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[13px] font-semibold text-white backdrop-blur">
            <Gem className="h-4 w-4" />
            Transparent Savings Plans
          </div>
          <h1 className="mb-4 text-[clamp(32px,5vw,52px)] font-black leading-[1.1] text-white">
            Pick Your Savings Journey
          </h1>
          <p className="mx-auto mb-8 max-w-[520px] text-[17px] leading-relaxed text-white/85">
            From your first ৳500 deposit to building a ৳10 lakh emergency fund, we have a plan that
            grows with your ambitions.
          </p>
          <div className="flex flex-wrap justify-center gap-10">
            {[
              ["৳500", "Minimum to start"],
              ["4 Tiers", "Plans available"],
              ["0%", "Hidden fees"],
              ["Free", "Upgrade anytime"],
            ].map(([value, label]) => (
              <div key={label} className="text-center">
                <div className="text-[28px] font-extrabold text-white">{value}</div>
                <div className="mt-0.5 text-xs text-white/75">{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-[60px]">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-full w-full">
            <path className="fill-white dark:fill-[#0a0f1e]" d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            label="Savings Plans"
            title="Choose Your Tier"
            subtitle="No investment products, no guaranteed returns, just a powerful community savings platform built for your goals."
          />

          <div className="mb-12 flex justify-center">
            <div className="flex gap-1 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] p-1 dark:border-[#1e2d3d] dark:bg-[#111827]">
              {["monthly", "yearly"].map((mode) => (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setBillingMode(mode)}
                  className={`rounded-[9px] px-6 py-2 text-sm font-semibold transition ${
                    billingMode === mode
                      ? "bg-white text-[#059669] shadow-[0_2px_8px_rgba(0,0,0,0.1)] dark:bg-[#1a2235] dark:text-[#10b981]"
                      : "text-[#475569] hover:text-[#059669] dark:text-[#94a3b8]"
                  }`}
                >
                  {mode === "monthly" ? "Monthly" : "Yearly"}
                  {mode === "yearly" && (
                    <span className="ml-1 text-[11px] text-[#059669]">Save 20%</span>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-[60px] grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
            {plans.map((plan) => {
              const Icon = plan.icon;
              const price = billingMode === "monthly" ? plan.monthly : plan.yearly;
              return (
                <article
                  key={plan.id}
                  className={`relative cursor-pointer rounded-2xl border-2 bg-white px-7 py-8 transition hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.10),0_24px_64px_rgba(0,0,0,0.08)] dark:bg-[#1a2235] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${
                    plan.popular
                      ? "border-[#059669] shadow-[0_0_0_1px_#059669,0_8px_24px_rgba(0,0,0,0.10),0_24px_64px_rgba(0,0,0,0.08)]"
                      : "border-[#e2e8f0] dark:border-[#1e2d3d]"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute left-1/2 top-[-14px] flex -translate-x-1/2 items-center gap-1 rounded-full bg-gradient-to-br from-[#059669] to-[#0891b2] px-4 py-1 text-[11px] font-bold tracking-[0.5px] text-white">
                      <Star className="h-3 w-3 fill-white" />
                      Most Popular
                    </div>
                  )}
                  <div className={`mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-[14px] ${plan.iconClass}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div
                    className="mb-1.5 text-[11px] font-bold uppercase tracking-[1px]"
                    style={{ color: plan.color }}
                  >
                    {plan.tier}
                  </div>
                  <h3 className="mb-2 text-[22px] font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">{plan.name}</h3>
                  {plan.popular && (
                    <div className="mb-4 rounded-lg bg-[#d1fae5] px-3 py-2 text-center text-xs font-semibold text-[#059669]">
                      Most members choose Gold
                    </div>
                  )}
                  <div className="mb-1 flex items-baseline gap-1">
                    <span className="text-xl font-bold text-[#0f172a] dark:text-[#f1f5f9]">৳</span>
                    <span className="text-[40px] font-black leading-none text-[#0f172a] dark:text-[#f1f5f9]">{price}</span>
                    <span className="text-sm text-[#94a3b8]">/month</span>
                  </div>
                  <p className="mb-6 text-[13px] leading-normal text-[#475569] dark:text-[#94a3b8]">{plan.desc}</p>
                  <Link
                    href="/register"
                    className={`block w-full rounded-xl px-3 py-3 text-center text-sm font-bold transition ${
                      plan.id === "gold"
                        ? "bg-gradient-to-br from-[#059669] to-[#0891b2] text-white hover:opacity-90"
                        : plan.id === "platinum"
                          ? "bg-gradient-to-br from-[#7c3aed] to-[#5b21b6] text-white hover:opacity-90"
                          : "border-2 border-[#e2e8f0] bg-[#f8fafc] text-[#0f172a] hover:border-current dark:border-[#1e2d3d] dark:bg-[#111827]"
                    }`}
                    style={plan.id === "bronze" || plan.id === "silver" ? { color: plan.color } : undefined}
                  >
                    {plan.cta}
                  </Link>
                  <hr className="my-5 border-[#e2e8f0] dark:border-[#1e2d3d]" />
                  <ul className="flex flex-col gap-2.5">
                    {plan.features.map(([feature, enabled]) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[13px] leading-snug text-[#475569] dark:text-[#94a3b8]">
                        <span
                          className={`mt-px flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full ${
                            enabled ? "bg-[#d1fae5] text-[#059669]" : "bg-[#fee2e2] text-[#ef4444]"
                          }`}
                        >
                          {enabled ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                        </span>
                        <span className={enabled ? "" : "text-[#94a3b8] line-through"}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>

          <div className="flex flex-col items-center gap-8 rounded-2xl bg-gradient-to-br from-[#065f46] to-[#047857] px-6 py-10 text-center text-white md:flex-row md:text-left">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/15">
              <Moon className="h-10 w-10" />
            </div>
            <div>
              <h3 className="mb-2 text-[22px] font-extrabold">Islamic Savings Mode Available on All Plans</h3>
              <p className="text-sm leading-relaxed text-white/85">
                Enable riba-free savings across all tiers. Amanah&apos;s Islamic mode ensures every
                transaction, goal, and circle operates without interest, fully compliant with Halal
                finance principles.
              </p>
            </div>
            <Link
              href="/register"
              className="shrink-0 rounded-xl bg-white px-6 py-3 text-sm font-bold text-[#065f46] transition hover:bg-[#d1fae5] md:ml-auto"
            >
              Enable Islamic Mode
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-6 py-20 dark:bg-[#111827]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            label="Feature Comparison"
            title="Everything Side by Side"
            subtitle="Compare every feature so you pick the right plan with confidence."
          />
          <div className="w-full overflow-x-auto rounded-2xl shadow-[0_4px_12px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <table className="w-full min-w-[840px] border-collapse bg-white dark:bg-[#1a2235]">
              <thead>
                <tr>
                  <th className="w-[34%] border-b-2 border-[#e2e8f0] px-6 py-5 text-left text-[13px] font-bold text-[#475569] dark:border-[#1e2d3d] dark:text-[#94a3b8]">
                    Feature
                  </th>
                  {[
                    ["Bronze", "Free", "bg-[#fef3c7] text-[#b45309]"],
                    ["Silver", "৳199/mo", "bg-[#f1f5f9] text-[#64748b]"],
                    ["Gold", "৳499/mo", "bg-[#fef9c3] text-[#a16207]"],
                    ["Platinum", "৳999/mo", "bg-[#ede9fe] text-[#6d28d9]"],
                  ].map(([name, price, className], index) => (
                    <th
                      key={name}
                      className={`border-b-2 border-[#e2e8f0] px-6 py-5 text-center text-[13px] font-bold text-[#475569] dark:border-[#1e2d3d] dark:text-[#94a3b8] ${
                        index === 2 ? "bg-[#0596690a] dark:bg-[#10b98114]" : ""
                      }`}
                    >
                      <div className="text-base font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">{name}</div>
                      <span className={`mt-1 inline-block rounded-full px-2.5 py-1 text-[10px] font-bold ${className}`}>
                        {price}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonGroups.map((group) => {
                  const Icon = group.icon;
                  return (
                    <React.Fragment key={group.label}>
                      <tr>
                        <td
                          colSpan={5}
                          className="bg-[#f8fafc] px-6 py-3 text-[11px] font-bold uppercase tracking-[1px] text-[#94a3b8] dark:bg-[#111827]"
                        >
                          <span className="inline-flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {group.label}
                          </span>
                        </td>
                      </tr>
                      {group.rows.map((row) => (
                        <tr key={`${group.label}-${row[0]}`} className="border-b border-[#e2e8f0] transition hover:bg-[#f8fafc] dark:border-[#1e2d3d] dark:hover:bg-[#111827]">
                          <td className="px-6 py-4 text-left text-sm font-semibold text-[#0f172a] dark:text-[#f1f5f9]">{row[0]}</td>
                          {row.slice(1).map((value, index) => (
                            <ValueCell key={`${row[0]}-${index}`} value={value} highlight={index === 2} />
                          ))}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            label="Savings Calculator"
            title="See Your Goal Timeline"
            subtitle="Adjust the sliders and watch your savings projection update instantly."
          />
          <div className="grid items-start gap-10 lg:grid-cols-2">
            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:p-9">
              <h3 className="mb-1.5 text-[22px] font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">Configure Your Plan</h3>
              <p className="mb-7 text-sm text-[#475569] dark:text-[#94a3b8]">
                Estimate how fast you&apos;ll reach your goal with consistent monthly saving.
              </p>

              <div className="mb-5">
                <label className="mb-2 flex justify-between text-[13px] font-semibold text-[#475569] dark:text-[#94a3b8]">
                  Savings Plan <span className="font-bold text-[#059669]">{selectedPlanData.label}</span>
                </label>
                <select
                  value={selectedPlan}
                  onChange={(event) => handlePlanChange(event.target.value)}
                  className="w-full rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#111827] dark:text-[#f1f5f9]"
                >
                  <option value="bronze">Bronze - Free (৳500 min/mo)</option>
                  <option value="silver">Silver - ৳199/mo (৳1,000 min/mo)</option>
                  <option value="gold">Gold - ৳499/mo (৳2,000 min/mo)</option>
                  <option value="platinum">Platinum - ৳999/mo (৳5,000 min/mo)</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="mb-2 flex justify-between text-[13px] font-semibold text-[#475569] dark:text-[#94a3b8]">
                  Monthly Deposit <span className="font-bold text-[#059669]">{formatBDT(deposit)}</span>
                </label>
                <input
                  type="range"
                  min={selectedPlanData.min}
                  max="50000"
                  step="500"
                  value={deposit}
                  onChange={(event) => setDeposit(Number(event.target.value))}
                  className="w-full accent-[#059669]"
                />
              </div>

              <div className="mb-5">
                <label className="mb-2 flex justify-between text-[13px] font-semibold text-[#475569] dark:text-[#94a3b8]">
                  Goal Duration <span className="font-bold text-[#059669]">{duration} months</span>
                </label>
                <input
                  type="range"
                  min="3"
                  max="60"
                  step="1"
                  value={duration}
                  onChange={(event) => setDuration(Number(event.target.value))}
                  className="w-full accent-[#059669]"
                />
              </div>

              <div>
                <label className="mb-2 block text-[13px] font-semibold text-[#475569] dark:text-[#94a3b8]">
                  Goal Target (optional)
                </label>
                <input
                  type="number"
                  value={target}
                  onChange={(event) => setTarget(event.target.value)}
                  placeholder="e.g. 100000"
                  className="w-full rounded-[10px] border border-[#e2e8f0] bg-[#f8fafc] px-3.5 py-2.5 text-sm text-[#0f172a] outline-none transition focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#111827] dark:text-[#f1f5f9]"
                />
              </div>
            </div>

            <div>
              <div className="rounded-2xl bg-gradient-to-br from-[#059669] to-[#0891b2] p-7 text-white">
                <h4 className="mb-2 text-sm text-white/85">You will save</h4>
                <div className="mb-5 text-[40px] font-black">{formatBDT(totalSaved)}</div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {[
                    ["Monthly", formatBDT(deposit)],
                    ["Duration", `${duration} mo`],
                    ["Goal reached", monthsNeeded ? `${monthsNeeded} mo` : "-"],
                  ].map(([label, value]) => (
                    <div key={label} className="rounded-[10px] bg-white/15 p-3 text-center">
                      <div className="mb-1 text-[11px] text-white/80">{label}</div>
                      <div className="text-lg font-bold">{value}</div>
                    </div>
                  ))}
                </div>
                {goalMessage && <p className="mt-4 text-[13px] leading-relaxed text-white/85">{goalMessage}</p>}
                <Link
                  href="/register"
                  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-white p-3.5 text-center text-[15px] font-bold text-[#059669] transition hover:bg-[#d1fae5]"
                >
                  Start Saving Now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="mt-5 rounded-2xl border border-[#e2e8f0] bg-[#f8fafc] p-5 dark:border-[#1e2d3d] dark:bg-[#111827]">
                <p className="text-xs leading-relaxed text-[#94a3b8]">
                  <strong>Disclaimer:</strong> This calculator shows projected savings totals based on
                  your inputs. Amanah Savings Community is not an investment platform and does not
                  offer any guaranteed returns, fixed profits, or interest.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#f8fafc] px-6 py-20 dark:bg-[#111827]">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading label="Member Stories" title="What Our Members Say" />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((story) => (
              <article
                key={story.name}
                className="rounded-2xl border border-[#e2e8f0] bg-white p-7 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)] transition hover:-translate-y-1 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08),0_12px_40px_rgba(0,0,0,0.06)] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
              >
                <div className="mb-3.5 flex gap-1 text-[#f59e0b]">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={`${story.name}-${index}`}
                      className={`h-4 w-4 ${index < story.stars ? "fill-[#f59e0b]" : ""}`}
                    />
                  ))}
                </div>
                <p className="mb-5 text-sm italic leading-[1.7] text-[#475569] dark:text-[#94a3b8]">&quot;{story.quote}&quot;</p>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#059669] to-[#0891b2] text-base font-bold text-white">
                    {story.avatar}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#0f172a] dark:text-[#f1f5f9]">{story.name}</div>
                    <div className="text-xs text-[#94a3b8]">{story.plan}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading label="Common Questions" title="Plans FAQ" />
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {faqs.map(([question, answer], index) => {
              const open = openFaq === index;
              return (
                <div key={question} className="overflow-hidden rounded-2xl border border-[#e2e8f0] bg-white dark:border-[#1e2d3d] dark:bg-[#1a2235]">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : index)}
                    className="flex w-full items-center justify-between gap-3 px-6 py-5 text-left text-sm font-semibold text-[#0f172a] transition hover:bg-[#f8fafc] dark:text-[#f1f5f9] dark:hover:bg-[#111827]"
                  >
                    {question}
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-[#94a3b8] transition ${open ? "rotate-180 text-[#059669]" : ""}`}
                    />
                  </button>
                  {open && <p className="px-6 pb-5 text-[13px] leading-[1.7] text-[#475569] dark:text-[#94a3b8]">{answer}</p>}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="flex flex-col items-center justify-between gap-8 rounded-3xl bg-gradient-to-br from-[#059669] to-[#0891b2] px-6 py-10 text-center md:flex-row md:px-12 md:py-16 md:text-left">
            <div>
              <h2 className="mb-2 text-[clamp(22px,3vw,34px)] font-black text-white">
                Ready to Start Saving?
              </h2>
              <p className="text-[15px] text-white/80">
                Join 47,000+ members already building their savings goals with Amanah.
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Link
                href="/register"
                className="flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-3.5 text-[15px] font-bold text-[#059669] transition hover:bg-[#d1fae5]"
              >
                Open Free Account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border-2 border-white/50 px-7 py-3.5 text-[15px] font-bold text-white transition hover:border-white hover:bg-white/10"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlanPage;
