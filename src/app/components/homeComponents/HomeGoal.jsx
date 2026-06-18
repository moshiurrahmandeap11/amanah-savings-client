"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Landmark,
  Laptop,
  Shield,
  Sparkles,
  Users,
  Gem,
} from "lucide-react";
import Link from "next/link";

const goals = [
  {
    Icon: Gem,
    name: "Wedding Fund",
    members: "3,240 members saving",
    amount: "৳5,000 – ৳30,000/mo",
    period: "12–36 months",
    progress: 68,
    accent: "#f472b6",
  },
  {
    Icon: Landmark,
    name: "Hajj Fund",
    members: "1,890 members saving",
    amount: "৳10,000 – ৳20,000/mo",
    period: "24–48 months",
    progress: 42,
    accent: "#10b981",
  },
  {
    Icon: Shield,
    name: "Emergency Fund",
    members: "5,610 members saving",
    amount: "৳500 – ৳5,000/mo",
    period: "6–12 months",
    progress: 55,
    accent: "#f59e0b",
  },
  {
    Icon: GraduationCap,
    name: "Education Fund",
    members: "2,140 members saving",
    amount: "৳2,000 – ৳15,000/mo",
    period: "12–60 months",
    progress: 38,
    accent: "#8b5cf6",
  },
  {
    Icon: Laptop,
    name: "Gadget / Device",
    members: "4,320 members saving",
    amount: "৳1,000 – ৳10,000/mo",
    period: "3–12 months",
    progress: 74,
    accent: "#3b82f6",
  },
  {
    Icon: Briefcase,
    name: "Business Startup",
    members: "980 members saving",
    amount: "৳5,000 – ৳50,000/mo",
    period: "12–48 months",
    progress: 28,
    accent: "#06b6d4",
  },
];

const HomeGoal = () => {
  return (
    <section
      id="goals"
      className="bg-white py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9] md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
          Savings Goals
        </span>

        <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
          Save for What <span className="text-[#059669]">Matters Most</span>
        </h2>

        <p className="mx-auto max-w-[580px] text-lg leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
          Choose from our community&apos;s most popular savings goals, or create
          your own custom goal.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal, index) => (
            <GoalCard key={goal.name} goal={goal} index={index} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-9"
        >
          <Link
            href="/goals"
            className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-[#e2e8f0] bg-transparent px-8 py-4 text-base font-semibold text-[#0f172a] transition-all duration-200 hover:border-[#059669] hover:bg-[#059669]/5 hover:text-[#059669] dark:border-[#1e2d3d] dark:text-[#f1f5f9]"
          >
            View All Goals & Circles
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const GoalCard = ({ goal, index }) => {
  const { Icon } = goal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-[#e2e8f0] bg-white p-6 text-left shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#059669] hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <div
        className="absolute -right-5 -top-5 h-[100px] w-[100px] rounded-full opacity-[0.08] transition-all duration-300 group-hover:scale-125 group-hover:opacity-[0.15]"
        style={{
          background: `radial-gradient(circle, ${goal.accent}, transparent)`,
        }}
      />

      <Icon
        size={36}
        strokeWidth={1.9}
        className="relative mb-3"
        style={{ color: goal.accent }}
        aria-hidden="true"
      />

      <h3 className="relative mb-1.5 text-[17px] font-bold text-[#0f172a] dark:text-[#f1f5f9]">
        {goal.name}
      </h3>

      <div className="relative mb-3 flex items-center gap-1.5 text-xs text-[#94a3b8]">
        <Users size={14} className="text-[#059669]" aria-hidden="true" />
        <span>{goal.members}</span>
      </div>

      <div className="relative mb-2 h-1.5 overflow-hidden rounded-[3px] bg-[#e2e8f0] dark:bg-[#1e2d3d]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${goal.progress}%` }}
          transition={{ duration: 1.2, delay: 0.1 + index * 0.08 }}
          viewport={{ once: true }}
          className="h-full rounded-[3px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)]"
        />
      </div>

      <div className="relative flex items-center justify-between gap-3 text-xs">
        <span className="font-bold text-[#059669]">{goal.amount}</span>
        <span className="text-[#94a3b8]">{goal.period}</span>
      </div>

      <div className="relative mt-3.5">
        <Link
          href="/register"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] border border-[#059669]/20 bg-[#059669]/[0.08] px-4 py-2.5 text-[13px] font-semibold text-[#059669] transition-all duration-200 hover:border-transparent hover:bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] hover:text-white"
        >
          Join Circle
          <Sparkles size={14} aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
};

export default HomeGoal;
