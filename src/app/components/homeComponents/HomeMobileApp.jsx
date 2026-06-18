"use client";

import { motion } from "framer-motion";
import {
  Bell,
  Bot,
  CalendarDays,
  Flame,
  Handshake,
  Landmark,
  Lightbulb,
  Moon,
  Smartphone,
  Star,
  Target,
  Trophy,
  Wifi,
  Zap,
} from "lucide-react";

const features = [
  {
    Icon: Smartphone,
    title: "PWA — No Install Needed",
    description:
      "Add to home screen directly from your browser. Instant access, no app store required.",
  },
  {
    Icon: Bell,
    title: "Smart Payment Reminders",
    description:
      "Never miss a deposit. Personalized reminders before your savings due date.",
  },
  {
    Icon: Moon,
    title: "Dark Mode + Bangla UI",
    description:
      "Full Bangla language support with beautiful dark mode for comfortable nighttime use.",
  },
  {
    Icon: Zap,
    title: "Offline Access",
    description:
      "View your savings goals and history even without an internet connection.",
  },
];

const achievements = [
  { Icon: Flame, label: "90-Day Streak", locked: false },
  { Icon: Star, label: "Super Saver", locked: false },
  { Icon: Handshake, label: "Referral Hero", locked: false },
  { Icon: Trophy, label: "Locked", locked: true },
];

const HomeMobileApp = () => {
  return (
    <section
      id="app"
      className="bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[linear-gradient(135deg,#022c22_0%,#0c1a3a_100%)] dark:text-[#f1f5f9] md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-16 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
              Mobile App
            </span>

            <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
              Your Savings
              <br />
              <span className="text-[#059669]">In Your Pocket</span>
            </h2>

            <p className="mb-2 max-w-[580px] text-base leading-[1.7] text-[#475569] dark:text-[#94a3b8]">
              Manage all your savings goals, track progress, receive smart
              reminders, and stay connected with your savings circles — all from
              your phone.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              {features.map(({ Icon, title, description }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  viewport={{ once: true, margin: "-60px" }}
                  className="flex items-start gap-4"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#059669]/10 text-[#059669]">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="mb-1 text-[15px] font-bold">{title}</h4>
                    <p className="text-[13px] leading-[1.5] text-[#475569] dark:text-[#94a3b8]">
                      {description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#app"
                className="inline-flex items-center gap-2 rounded-xl bg-[#0f172a] px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:opacity-85 dark:bg-[#f1f5f9] dark:text-[#0a0f1e]"
              >
                <Smartphone size={17} aria-hidden="true" />
                Add to Home Screen
              </a>
              <a
                href="#app"
                className="inline-flex items-center gap-2 rounded-xl border border-[#e2e8f0] bg-[#f8fafc] px-5 py-2.5 text-sm font-semibold text-[#0f172a] transition-all duration-200 hover:-translate-y-0.5 hover:opacity-85 dark:border-[#1e2d3d] dark:bg-[#111827] dark:text-[#f1f5f9]"
              >
                <Bot size={17} aria-hidden="true" />
                Android APK
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-80px" }}
            className="flex items-center justify-center gap-5 max-md:hidden"
          >
            <PhoneFrame className="-rotate-[5deg] -translate-y-2.5">
              <AchievementsScreen />
            </PhoneFrame>
            <PhoneFrame className="z-10 rotate-[5deg] translate-y-2.5">
              <AssistantScreen />
            </PhoneFrame>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PhoneFrame = ({ children, className = "" }) => {
  return (
    <div
      className={`w-[200px] rounded-[32px] border border-[#e2e8f0] bg-white p-3 shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)] ${className}`}
    >
      <div className="mx-auto mb-2.5 h-[22px] w-20 rounded-b-xl bg-[#f8fafc] dark:bg-[#0a0f1e]" />
      <div className="h-[360px] overflow-hidden rounded-[22px] bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] p-3 dark:bg-[linear-gradient(135deg,#022c22_0%,#0c1a3a_100%)]">
        {children}
      </div>
    </div>
  );
};

const AchievementsScreen = () => {
  return (
    <div className="p-2">
      <div className="mb-3 flex items-center gap-1.5 text-xs font-bold">
        <Trophy size={14} className="text-[#059669]" aria-hidden="true" />
        Achievements
      </div>

      <div className="grid grid-cols-2 gap-2">
        {achievements.map(({ Icon, label, locked }) => (
          <div
            key={label}
            className={
              locked
                ? "rounded-lg border border-dashed border-[#059669]/30 bg-[#059669]/5 p-2.5 text-center"
                : "rounded-lg border border-[#e2e8f0] bg-white p-2.5 text-center dark:border-[#1e2d3d] dark:bg-[#1a2235]"
            }
          >
            <Icon
              size={22}
              className={`mx-auto ${locked ? "text-[#94a3b8] opacity-40" : "text-[#059669]"}`}
              aria-hidden="true"
            />
            <div
              className={`mt-1 text-[9px] font-bold ${locked ? "text-[#94a3b8]" : ""}`}
            >
              {label}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-lg border border-[#e2e8f0] bg-white p-2.5 dark:border-[#1e2d3d] dark:bg-[#1a2235]">
        <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-bold">
          <Target size={12} className="text-[#059669]" aria-hidden="true" />
          Progress
        </div>
        <ProgressRow label="Wedding Goal" width="72%" />
        <div className="mt-2" />
        <ProgressRow label="Hajj Fund" width="26%" />
      </div>
    </div>
  );
};

const ProgressRow = ({ label, width }) => {
  return (
    <>
      <div className="mb-1 text-[9px] text-[#94a3b8]">{label}</div>
      <div className="h-1 rounded-sm bg-[#e2e8f0] dark:bg-[#1e2d3d]">
        <div
          className="h-full rounded-sm bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)]"
          style={{ width }}
        />
      </div>
    </>
  );
};

const AssistantScreen = () => {
  return (
    <div className="p-2">
      <div className="mb-2.5 flex items-center gap-1.5 text-xs font-bold">
        <Bot size={14} className="text-[#059669]" aria-hidden="true" />
        AI Assistant
      </div>

      <div className="flex flex-col gap-2">
        <div className="rounded-[10px_10px_10px_2px] border border-[#e2e8f0] bg-white p-2 text-[9px] leading-[1.4] text-[#475569] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#94a3b8]">
          <Lightbulb size={11} className="mr-1 inline text-[#059669]" aria-hidden="true" />
          Save ৳500 more/week to finish 2 months early!
        </div>
        <div className="rounded-[10px_10px_2px_10px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] p-2 text-right text-[9px] leading-[1.4] text-white">
          How much do I need to save for Hajj?
        </div>
        <div className="rounded-[10px_10px_10px_2px] border border-[#e2e8f0] bg-white p-2 text-[9px] leading-[1.4] text-[#475569] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#94a3b8]">
          <Landmark size={11} className="mr-1 inline text-[#059669]" aria-hidden="true" />
          Hajj 2026 package avg ৳6.5 Lakh. With your current ৳10k/mo, you&apos;ll
          be ready in 42 months.
        </div>
      </div>

      <div className="mt-2.5 rounded-lg border border-[#e2e8f0] bg-white p-2 dark:border-[#1e2d3d] dark:bg-[#1a2235]">
        <div className="mb-1.5 flex items-center gap-1.5 text-[9px] font-bold">
          <Bell size={11} className="text-[#059669]" aria-hidden="true" />
          Reminders
        </div>
        <div className="flex items-center gap-1 border-b border-[#e2e8f0] py-1 text-[8px] text-[#94a3b8] dark:border-[#1e2d3d]">
          <CalendarDays size={9} aria-hidden="true" />
          Wed deposit due in 2 days
        </div>
        <div className="flex items-center gap-1 py-1 text-[8px] text-[#94a3b8]">
          <Target size={9} aria-hidden="true" />
          Wedding goal: 72% complete
        </div>
      </div>
    </div>
  );
};

export default HomeMobileApp;
