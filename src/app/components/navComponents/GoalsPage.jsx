"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Baby,
  Bike,
  Briefcase,
  Calendar,
  CheckSquare,
  Edit3,
  Flame,
  Gem,
  GraduationCap,
  Heart,
  Lock,
  Moon,
  Search,
  Share2,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Target,
  Trash2,
  Users,
  Wallet,
  X,
} from "lucide-react";

const filters = [
  { id: "all", label: "All Goals", icon: Star },
  { id: "family", label: "Family", icon: Users },
  { id: "islamic", label: "Islamic", icon: Moon },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "tech", label: "Tech & Gadget", icon: Smartphone },
  { id: "lifestyle", label: "Lifestyle", icon: Sparkles },
  { id: "emergency", label: "Emergency", icon: Shield },
  { id: "business", label: "Business", icon: Briefcase },
];

const goals = [
  {
    id: "wedding",
    name: "Wedding Fund",
    desc: "Save for your dream wedding. Join a circle or create a private goal with your partner.",
    category: "family lifestyle",
    icon: Gem,
    glow: "#f472b6",
    progressColor: "linear-gradient(90deg,#059669,#0891b2)",
    badge: "Open",
    badgeType: "open",
    members: 3240,
    memberText: "3,236 more saving",
    progress: 68,
    monthly: "৳5k-৳30k",
    duration: "12-36 mo",
    avatars: [
      ["F", "linear-gradient(135deg,#f472b6,#ec4899)"],
      ["N", "linear-gradient(135deg,#059669,#0891b2)"],
      ["R", "linear-gradient(135deg,#f59e0b,#f97316)"],
      ["+", "linear-gradient(135deg,#8b5cf6,#6366f1)"],
    ],
  },
  {
    id: "hajj",
    name: "Hajj Fund",
    desc: "Perform Hajj with complete peace of mind. Riba-free savings circle with Islamic mode enabled.",
    category: "islamic",
    icon: Moon,
    glow: "#10b981",
    progressColor: "linear-gradient(90deg,#059669,#10b981)",
    badge: "Open · Islamic",
    badgeType: "open",
    members: 1890,
    memberText: "1,887 saving for Hajj",
    progress: 42,
    monthly: "৳10k-৳20k",
    duration: "24-48 mo",
    avatars: [
      ["A", "linear-gradient(135deg,#059669,#0891b2)"],
      ["K", "linear-gradient(135deg,#f59e0b,#f97316)"],
      ["+", "linear-gradient(135deg,#8b5cf6,#6366f1)"],
    ],
  },
  {
    id: "emergency",
    name: "Emergency Fund",
    desc: "Build a 6-month financial safety net. The most important savings goal anyone can have.",
    category: "emergency",
    icon: Shield,
    glow: "#f59e0b",
    progressColor: "linear-gradient(90deg,#f59e0b,#f97316)",
    badge: "Most Popular",
    badgeType: "open",
    members: 5610,
    memberText: "5,607 building safety nets",
    progress: 55,
    monthly: "৳500-৳5k",
    duration: "6-12 mo",
    avatars: [
      ["S", "linear-gradient(135deg,#f59e0b,#f97316)"],
      ["T", "linear-gradient(135deg,#059669,#0891b2)"],
      ["+", "linear-gradient(135deg,#ef4444,#f97316)"],
    ],
  },
  {
    id: "education",
    name: "Education Fund",
    desc: "Invest in your future. Save for university fees, professional courses, or children's education.",
    category: "education",
    icon: GraduationCap,
    glow: "#8b5cf6",
    progressColor: "linear-gradient(90deg,#8b5cf6,#6366f1)",
    badge: "Open",
    badgeType: "open",
    members: 2140,
    memberText: "2,138 investing in education",
    progress: 38,
    monthly: "৳2k-৳15k",
    duration: "12-60 mo",
    avatars: [
      ["M", "linear-gradient(135deg,#8b5cf6,#6366f1)"],
      ["J", "linear-gradient(135deg,#3b82f6,#06b6d4)"],
    ],
  },
  {
    id: "gadget",
    name: "Gadget & Device Fund",
    desc: "Save for laptops, phones, or any tech gadget. Short-term, high-discipline savings.",
    category: "tech",
    icon: Smartphone,
    glow: "#3b82f6",
    progressColor: "linear-gradient(90deg,#3b82f6,#06b6d4)",
    badge: "Filling Fast",
    badgeType: "filling",
    members: 4320,
    memberText: "4,318 saving for devices",
    progress: 74,
    monthly: "৳1k-৳10k",
    duration: "3-12 mo",
    avatars: [
      ["P", "linear-gradient(135deg,#3b82f6,#06b6d4)"],
      ["Q", "linear-gradient(135deg,#059669,#0891b2)"],
    ],
  },
  {
    id: "business",
    name: "Business Startup Fund",
    desc: "Build your capital to launch your business. For entrepreneurs and small business owners.",
    category: "business",
    icon: Briefcase,
    glow: "#06b6d4",
    progressColor: "linear-gradient(90deg,#06b6d4,#3b82f6)",
    badge: "Open",
    badgeType: "open",
    members: 980,
    memberText: "978 building businesses",
    progress: 28,
    monthly: "৳5k-৳50k",
    duration: "12-48 mo",
    avatars: [
      ["B", "linear-gradient(135deg,#06b6d4,#3b82f6)"],
      ["C", "linear-gradient(135deg,#f59e0b,#f97316)"],
    ],
  },
  {
    id: "bike",
    name: "Bike / Vehicle Fund",
    desc: "Save for your dream bike or vehicle. Short to medium-term savings goal.",
    category: "lifestyle",
    icon: Bike,
    glow: "#f97316",
    progressColor: "linear-gradient(90deg,#f97316,#f59e0b)",
    badge: "Open",
    badgeType: "open",
    members: 1620,
    memberText: "1,618 saving for rides",
    progress: 61,
    monthly: "৳2k-৳15k",
    duration: "6-24 mo",
    avatars: [
      ["D", "linear-gradient(135deg,#f97316,#f59e0b)"],
      ["E", "linear-gradient(135deg,#059669,#0891b2)"],
    ],
  },
  {
    id: "kids",
    name: "Kids Future Fund",
    desc: "Secure your child's future today. Education, career, marriage, start saving early.",
    category: "family education",
    icon: Baby,
    glow: "#a78bfa",
    progressColor: "linear-gradient(90deg,#a78bfa,#8b5cf6)",
    badge: "New",
    badgeType: "open",
    members: 640,
    memberText: "639 saving for kids",
    progress: 18,
    monthly: "৳1k-৳20k",
    duration: "36-120 mo",
    avatars: [["L", "linear-gradient(135deg,#a78bfa,#8b5cf6)"]],
  },
  {
    id: "umrah",
    name: "Umrah Fund",
    desc: "Save for your Umrah journey. Halal, riba-free savings with Islamic mode fully enabled.",
    category: "islamic",
    icon: Star,
    glow: "#065f46",
    progressColor: "linear-gradient(90deg,#065f46,#059669)",
    badge: "Islamic",
    badgeType: "open",
    members: 720,
    memberText: "719 saving for Umrah",
    progress: 33,
    monthly: "৳3k-৳10k",
    duration: "12-24 mo",
    avatars: [["U", "linear-gradient(135deg,#065f46,#059669)"]],
  },
];

const challenges = [
  {
    id: "30-day",
    icon: Flame,
    title: "30-Day Savings Streak",
    desc: "Make a deposit every day for 30 consecutive days and earn the Streak Warrior badge.",
    tags: [
      ["Active", "green"],
      ["Any amount", "blue"],
    ],
    participants: "2,840 participants",
  },
  {
    id: "ramadan",
    icon: Moon,
    title: "Ramadan Savings Challenge",
    desc: "Save a little every day of Ramadan. Special seasonal badge + community milestone celebration.",
    tags: [
      ["Seasonal", "gold"],
      ["Islamic Mode", "green"],
    ],
    participants: "1,240 participants",
  },
  {
    id: "100tk",
    icon: Target,
    title: "Daily ৳100 Challenge",
    desc: "Save just ৳100 every single day. Prove that small, consistent steps build big savings.",
    tags: [
      ["Beginner Friendly", "blue"],
      ["Active", "green"],
    ],
    participants: "4,120 participants",
  },
];

const sortGoals = (items, sortBy) => {
  const sorted = [...items];
  if (sortBy === "progress-desc") return sorted.sort((a, b) => b.progress - a.progress);
  if (sortBy === "progress-asc") return sorted.sort((a, b) => a.progress - b.progress);
  if (sortBy === "members-desc") return sorted.sort((a, b) => b.members - a.members);
  if (sortBy === "newest") return sorted.reverse();
  return sorted;
};

function Tag({ type, children }) {
  const styles = {
    green: "bg-[#0596691a] text-[#059669]",
    blue: "bg-[#3b82f61a] text-[#3b82f6]",
    gold: "bg-[#f59e0b1a] text-[#d97706]",
  };

  return (
    <span className={`rounded-[7px] px-2 py-1 text-[11px] font-semibold ${styles[type]}`}>
      {children}
    </span>
  );
}

function GoalCard({ goal, bulkMode, selected, onSelect, onJoin }) {
  const Icon = goal.icon;

  return (
    <article
      onClick={bulkMode ? onSelect : undefined}
      className={`group relative cursor-pointer overflow-hidden rounded-[20px] border bg-white transition-all duration-200 hover:-translate-y-[5px] hover:border-transparent hover:shadow-[0_16px_48px_rgba(0,0,0,.10)] dark:bg-[#1a2235] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,.45)] ${
        selected ? "border-[#059669] ring-2 ring-[#059669]" : "border-[#e2e8f0] dark:border-[#1e2d3d]"
      }`}
    >
      {bulkMode && (
        <input
          type="checkbox"
          readOnly
          checked={selected}
          className="absolute left-3 top-3 z-10 h-[18px] w-[18px] accent-[#059669]"
        />
      )}
      <div className="relative px-5 pb-0 pt-5">
        <div
          className="absolute right-[-20px] top-[-20px] h-[100px] w-[100px] rounded-full opacity-[0.07] transition-all duration-300 group-hover:scale-125 group-hover:opacity-[0.14]"
          style={{ background: `radial-gradient(circle,${goal.glow},transparent)` }}
        />
        <div className="relative mb-2.5 flex items-start justify-between">
          <div className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-[#f8fafc] text-[#059669] dark:bg-[#111827]">
            <Icon className="h-7 w-7" />
          </div>
          <span
            className={`rounded-lg px-[9px] py-[3px] text-[11px] font-semibold ${
              goal.badgeType === "filling"
                ? "bg-[#f59e0b1a] text-[#d97706]"
                : "bg-[#0596691a] text-[#059669]"
            }`}
          >
            {goal.badge}
          </span>
        </div>
        <h3 className="relative mb-1 text-lg font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">
          {goal.name}
        </h3>
        <p className="relative mb-3 text-[13px] leading-normal text-[#475569] dark:text-[#94a3b8]">
          {goal.desc}
        </p>
      </div>
      <div className="px-5 pb-5">
        <div className="mb-1.5 flex justify-between text-xs text-[#475569] dark:text-[#94a3b8]">
          <span>{goal.members.toLocaleString()} members</span>
          <span className="font-bold text-[#059669]">{goal.progress}%</span>
        </div>
        <div className="mb-3 h-[7px] overflow-hidden rounded bg-[#e2e8f0] dark:bg-[#1e2d3d]">
          <div className="h-full rounded transition-all duration-1000" style={{ width: `${goal.progress}%`, background: goal.progressColor }} />
        </div>
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="rounded-[9px] bg-[#f8fafc] px-2.5 py-2 dark:bg-[#111827]">
            <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-[.4px] text-[#94a3b8]">
              Monthly
            </div>
            <div className="text-[13px] font-bold text-[#0f172a] dark:text-[#f1f5f9]">{goal.monthly}</div>
          </div>
          <div className="rounded-[9px] bg-[#f8fafc] px-2.5 py-2 dark:bg-[#111827]">
            <div className="mb-0.5 text-[10px] font-semibold uppercase tracking-[.4px] text-[#94a3b8]">
              Duration
            </div>
            <div className="text-[13px] font-bold text-[#0f172a] dark:text-[#f1f5f9]">{goal.duration}</div>
          </div>
        </div>
        <div className="mb-3.5 flex items-center gap-1.5">
          <div className="flex">
            {goal.avatars.map(([letter, background], index) => (
              <div
                key={`${goal.id}-${letter}-${index}`}
                className={`flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[10px] font-bold text-white dark:border-[#1a2235] ${
                  index === 0 ? "" : "-ml-1.5"
                }`}
                style={{ background }}
              >
                {letter}
              </div>
            ))}
          </div>
          <span className="text-xs font-medium text-[#94a3b8]">{goal.memberText}</span>
        </div>
        <div className="mb-2 flex gap-1.5">
          {[
            ["Details", Search, "/goal-detail"],
            ["Edit", Edit3, "/goal-edit"],
            ["Share", Share2, "/goal-share"],
          ].map(([label, ActionIcon, href]) => (
            <Link
              key={label}
              href={href}
              onClick={(event) => event.stopPropagation()}
              className="flex flex-1 items-center justify-center gap-1 rounded-[9px] border border-[#e2e8f0] bg-white p-2 text-xs font-semibold text-[#0f172a] transition hover:border-[#059669] hover:text-[#059669] dark:border-[#1e2d3d] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]"
            >
              <ActionIcon className="h-3 w-3" />
              {label}
            </Link>
          ))}
        </div>
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            onJoin(goal.id);
          }}
          className="w-full rounded-[11px] bg-[linear-gradient(135deg,#059669,#0891b2)] p-[11px] text-[13px] font-bold text-white shadow-[0_3px_10px_rgba(5,150,105,.25)] transition hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(5,150,105,.35)]"
        >
          Join {goal.name.split(" ")[0]} Circle →
        </button>
      </div>
    </article>
  );
}

const GoalsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [joinModalOpen, setJoinModalOpen] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState(new Set());
  const [joinedChallenges, setJoinedChallenges] = useState(new Set());

  const filteredGoals = useMemo(() => {
    const filtered = goals
      .filter((goal) => activeFilter === "all" || goal.category.includes(activeFilter))
      .filter((goal) => goal.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return sortGoals(filtered, sortBy);
  }, [activeFilter, searchQuery, sortBy]);

  const selectedGoal = goals.find((goal) => goal.id === joinModalOpen);

  const toggleGoalSelection = (id) => {
    setSelectedGoals((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleSelectAll = () => {
    setSelectedGoals((current) =>
      current.size === filteredGoals.length ? new Set() : new Set(filteredGoals.map((goal) => goal.id)),
    );
  };

  const closeBulkMode = () => {
    setBulkMode(false);
    setSelectedGoals(new Set());
  };

  return (
    <div className="min-h-screen bg-white font-['Inter',sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      <section className="bg-[linear-gradient(135deg,#ecfdf5,#eff6ff)] px-6 py-[72px] pb-[52px] text-center dark:bg-[linear-gradient(135deg,#022c22,#0c1a3a)]">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-3.5 inline-flex items-center gap-1.5 rounded-full border border-[#05966926] bg-[#05966914] px-3.5 py-1.5 text-xs font-semibold text-[#059669]">
            <Target className="h-3.5 w-3.5" />
            Savings Goals & Circles
          </div>
          <h1 className="mb-3 text-[clamp(28px,4.5vw,48px)] font-black leading-[1.15] tracking-[-.8px]">
            Save Toward What{" "}
            <span className="bg-[linear-gradient(135deg,#059669,#0891b2)] bg-clip-text text-transparent">
              Truly Matters
            </span>
          </h1>
          <p className="mx-auto mb-7 max-w-[560px] text-[17px] leading-[1.7] text-[#475569] dark:text-[#94a3b8]">
            Join community savings circles for specific goals. Locked savings, AI-powered insights,
            and 12,000+ motivated members.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-[9px] bg-[linear-gradient(135deg,#059669,#0891b2)] px-6 py-3 text-sm font-semibold text-white shadow-[0_3px_10px_rgba(5,150,105,.25)]"
            >
              Join a Circle <ArrowRight className="h-4 w-4" />
            </Link>
            <button
              type="button"
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-[9px] border border-[#e2e8f0] bg-transparent px-6 py-3 text-sm font-semibold text-[#0f172a] transition hover:border-[#059669] hover:text-[#059669] dark:border-[#1e2d3d] dark:text-[#f1f5f9]"
            >
              <Sparkles className="h-4 w-4" />
              Create Custom Goal
            </button>
          </div>
        </div>
      </section>

      <div className="sticky top-16 z-30 border-b border-[#e2e8f0] bg-white py-4 shadow-[0_2px_8px_rgba(0,0,0,.04)] dark:border-[#1e2d3d] dark:bg-[#1a2235]">
        <div className="mx-auto max-w-[1160px] px-6">
          <div className="flex items-center gap-2.5 overflow-x-auto pb-0.5 [scrollbar-width:none]">
            {filters.map((filter) => {
              const Icon = filter.icon;
              const active = activeFilter === filter.id;
              return (
                <button
                  key={filter.id}
                  type="button"
                  onClick={() => {
                    setActiveFilter(filter.id);
                    setSelectedGoals(new Set());
                  }}
                  className={`flex shrink-0 items-center gap-1.5 rounded-full border-[1.5px] px-4 py-2 text-[13px] font-semibold transition ${
                    active
                      ? "border-transparent bg-[linear-gradient(135deg,#059669,#0891b2)] text-white shadow-[0_3px_10px_rgba(5,150,105,.25)]"
                      : "border-[#e2e8f0] bg-white text-[#475569] hover:border-[#059669] hover:text-[#059669] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#94a3b8]"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  {filter.label}
                </button>
              );
            })}
            <div className="ml-auto flex shrink-0 items-center gap-2 rounded-full border-[1.5px] border-[#e2e8f0] bg-white px-3.5 py-2 dark:border-[#1e2d3d] dark:bg-[#0a0f1e]">
              <Search className="h-3.5 w-3.5 text-[#94a3b8]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search goals..."
                className="w-32 bg-transparent text-[13px] text-[#0f172a] outline-none placeholder:text-[#94a3b8] dark:text-[#f1f5f9]"
              />
            </div>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="shrink-0 rounded-full border-[1.5px] border-[#e2e8f0] bg-white px-3 py-2 text-[13px] font-semibold text-[#0f172a] outline-none dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#f1f5f9]"
            >
              <option value="default">Default</option>
              <option value="progress-desc">Progress high to low</option>
              <option value="progress-asc">Progress low to high</option>
              <option value="members-desc">Members high to low</option>
              <option value="newest">Newest first</option>
            </select>
          </div>
        </div>
      </div>

      {bulkMode && (
        <div className="sticky top-32 z-30 bg-[linear-gradient(135deg,#059669,#0891b2)] px-6 py-2.5">
          <div className="mx-auto flex max-w-[1160px] flex-wrap items-center gap-3">
            <label className="flex cursor-pointer items-center gap-2 text-[13px] font-bold text-white">
              <input
                type="checkbox"
                checked={selectedGoals.size === filteredGoals.length && filteredGoals.length > 0}
                onChange={toggleSelectAll}
                className="h-4 w-4 accent-white"
              />
              {selectedGoals.size} selected
            </label>
            <div className="h-5 w-px bg-white/30" />
            {[
              ["Deposit", Wallet],
              ["Pause", Lock],
              ["Share", Share2],
              ["Delete", Trash2],
            ].map(([label, Icon]) => (
              <button
                key={label}
                type="button"
                className={`inline-flex items-center gap-1.5 rounded-lg border px-3.5 py-2 text-xs font-bold text-white ${
                  label === "Delete"
                    ? "border-red-400/50 bg-red-500/30"
                    : "border-white/30 bg-white/20"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {label}
              </button>
            ))}
            <button
              type="button"
              onClick={closeBulkMode}
              className="ml-auto rounded-lg border border-white/20 bg-white/15 px-3.5 py-2 text-xs text-white"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <main className="px-6 py-10">
        <div className="mx-auto max-w-[1160px]">
          <section className="relative mb-8 overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#059669,#0891b2)] p-7 text-white">
            <div className="absolute right-[-80px] top-[-80px] h-[300px] w-[300px] rounded-full bg-white/[.06]" />
            <div className="relative">
              <div className="mb-3 inline-flex items-center gap-1.5 rounded-[14px] border border-white/20 bg-white/15 px-3 py-1 text-[11px] font-bold backdrop-blur">
                <Star className="h-3.5 w-3.5 fill-white" />
                Featured Circle · Most Popular
              </div>
              <h2 className="mb-1.5 text-[22px] font-black">Grand Wedding Fund 2026</h2>
              <p className="mb-4 max-w-[500px] text-sm leading-relaxed text-white/85">
                Bangladesh&apos;s largest wedding savings circle. 850+ members saving together for
                the perfect wedding. Monthly deposits from ৳5,000 to ৳30,000.
              </p>
              <div className="mb-5 flex flex-wrap gap-6">
                {[
                  ["857", "Members"],
                  ["৳4.2 Cr", "Total Saved"],
                  ["24 mo", "Duration"],
                  ["68%", "Progress"],
                ].map(([value, label]) => (
                  <div key={label}>
                    <div className="text-xl font-extrabold">{value}</div>
                    <div className="mt-px text-[11px] text-white/75">{label}</div>
                  </div>
                ))}
              </div>
              <div className="mb-2 h-2 rounded bg-white/20">
                <div className="h-full w-[68%] rounded bg-white" />
              </div>
              <p className="mb-4 text-xs text-white/75">৳2.8 Cr saved · ৳1.4 Cr remaining · 143 spots left</p>
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => setJoinModalOpen("wedding")}
                  className="inline-flex items-center gap-2 rounded-[10px] bg-white px-5 py-2.5 text-[13px] font-bold text-[#059669] transition hover:-translate-y-px"
                >
                  Join This Circle <ArrowRight className="h-3.5 w-3.5" />
                </button>
                <button
                  type="button"
                  className="rounded-[10px] border-[1.5px] border-white/30 bg-white/15 px-5 py-2.5 text-[13px] font-bold text-white transition hover:bg-white/25"
                >
                  View Details
                </button>
              </div>
            </div>
          </section>

          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-[19px] font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">
                All Savings Goals
              </h2>
              <p className="text-[13px] text-[#94a3b8]">Showing {filteredGoals.length} goals</p>
            </div>
            <button
              type="button"
              onClick={() => setBulkMode(true)}
              className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-[#e2e8f0] bg-transparent px-3 py-1.5 text-xs font-semibold text-[#475569] transition hover:border-[#059669] hover:text-[#059669] dark:border-[#1e2d3d] dark:text-[#94a3b8]"
            >
              <CheckSquare className="h-3.5 w-3.5" />
              Select
            </button>
          </div>

          <div className="mb-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredGoals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                bulkMode={bulkMode}
                selected={selectedGoals.has(goal.id)}
                onSelect={() => toggleGoalSelection(goal.id)}
                onJoin={setJoinModalOpen}
              />
            ))}
          </div>

          <section className="mt-4 rounded-[20px] border border-[#e2e8f0] bg-[#f8fafc] p-7 text-center dark:border-[#1e2d3d] dark:bg-[#111827]">
            <h3 className="mb-2 text-xl font-extrabold text-[#0f172a] dark:text-[#f1f5f9]">
              Don&apos;t see your goal?
            </h3>
            <p className="mb-5 text-sm text-[#475569] dark:text-[#94a3b8]">
              Create a completely custom savings goal with your own target amount, timeline, and
              circle name.
            </p>
            <button
              type="button"
              onClick={() => setCreateModalOpen(true)}
              className="inline-flex items-center gap-2 rounded-[11px] bg-[linear-gradient(135deg,#059669,#0891b2)] px-7 py-3 text-sm font-bold text-white shadow-[0_4px_14px_rgba(5,150,105,.3)]"
            >
              <Sparkles className="h-4 w-4" />
              Create Custom Goal
            </button>
          </section>
        </div>
      </main>

      <section className="bg-[linear-gradient(135deg,#ecfdf5,#eff6ff)] px-6 py-14 text-center dark:bg-[linear-gradient(135deg,#022c22,#0c1a3a)]">
        <div className="mx-auto max-w-[1160px]">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#05966926] bg-[#05966914] px-3.5 py-1.5 text-xs font-semibold text-[#059669]">
            <Flame className="h-3.5 w-3.5" />
            Community Challenges
          </div>
          <h2 className="mb-2 text-[clamp(24px,3.5vw,36px)] font-black">
            Stay Motivated. <span className="text-[#059669]">Win Badges.</span>
          </h2>
          <p className="mx-auto max-w-[520px] text-[15px] text-[#475569] dark:text-[#94a3b8]">
            Join community challenges to earn achievement badges, climb the leaderboard, and hit your
            goals faster.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {challenges.map((challenge) => {
              const Icon = challenge.icon;
              const joined = joinedChallenges.has(challenge.id);
              return (
                <article
                  key={challenge.id}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-[22px] text-left transition hover:-translate-y-[3px] hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#1a2235]"
                >
                  <div className="mb-2.5 flex h-12 w-12 items-center justify-center rounded-[14px] bg-[#05966914] text-[#059669]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-1.5 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                    {challenge.title}
                  </h3>
                  <p className="mb-3 text-[13px] leading-normal text-[#475569] dark:text-[#94a3b8]">
                    {challenge.desc}
                  </p>
                  <div className="mb-3.5 flex flex-wrap gap-2.5">
                    {challenge.tags.map(([label, type]) => (
                      <Tag key={label} type={type}>
                        {label}
                      </Tag>
                    ))}
                  </div>
                  <div className="mb-3 flex items-center gap-1.5 text-xs text-[#94a3b8]">
                    <Users className="h-3.5 w-3.5" />
                    {challenge.participants}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setJoinedChallenges((current) => new Set(current).add(challenge.id))
                    }
                    className={`w-full rounded-[9px] border p-2.5 text-xs font-bold transition ${
                      joined
                        ? "border-transparent bg-[linear-gradient(135deg,#059669,#0891b2)] text-white"
                        : "border-[#05966933] bg-[#05966914] text-[#059669] hover:border-transparent hover:bg-[linear-gradient(135deg,#059669,#0891b2)] hover:text-white"
                    }`}
                  >
                    {joined ? "Joined!" : "Join Challenge"}
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {joinModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
          onClick={() => setJoinModalOpen(null)}
        >
          <div
            className="relative w-full max-w-[480px] rounded-[20px] bg-white p-8 shadow-[0_40px_100px_rgba(0,0,0,.2)] dark:bg-[#1a2235]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setJoinModalOpen(null)}
              className="absolute right-4 top-4 flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#e2e8f0] bg-white dark:border-[#1e2d3d] dark:bg-[#0a0f1e]"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#05966914] text-[#059669]">
              {selectedGoal ? <selectedGoal.icon className="h-8 w-8" /> : <Target className="h-8 w-8" />}
            </div>
            <h3 className="mb-1.5 text-center text-xl font-black text-[#0f172a] dark:text-[#f1f5f9]">
              Join {selectedGoal?.name || "Savings"} Circle
            </h3>
            <p className="mb-5 text-center text-[13px] text-[#475569] dark:text-[#94a3b8]">
              You need an active account to join this circle.
            </p>
            <div className="mb-4 rounded-xl bg-[#f8fafc] p-4 text-[13px] leading-relaxed text-[#475569] dark:bg-[#111827] dark:text-[#94a3b8]">
              <Lock className="mr-1 inline h-3.5 w-3.5" />
              Savings are <strong className="text-[#0f172a] dark:text-[#f1f5f9]">locked until goal maturity</strong>.
              Early withdrawal requires admin approval. No interest, no profit guarantees.
            </div>
            <div className="flex flex-col gap-2.5">
              <Link
                href="/register"
                className="rounded-[11px] bg-[linear-gradient(135deg,#059669,#0891b2)] p-[13px] text-center text-sm font-bold text-white shadow-[0_4px_14px_rgba(5,150,105,.3)]"
              >
                Create Account to Join
              </Link>
              <Link
                href="/login"
                className="rounded-[11px] border-[1.5px] border-[#e2e8f0] bg-white p-3 text-center text-sm font-semibold text-[#0f172a] transition hover:border-[#059669] hover:text-[#059669] dark:border-[#1e2d3d] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]"
              >
                Already a member? Log In
              </Link>
            </div>
          </div>
        </div>
      )}

      {createModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-5"
          onClick={() => setCreateModalOpen(false)}
        >
          <div
            className="relative w-full max-w-[520px] rounded-[20px] bg-white p-8 shadow-[0_40px_100px_rgba(0,0,0,.2)] dark:bg-[#1a2235]"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setCreateModalOpen(false)}
              className="absolute right-4 top-4 flex h-[30px] w-[30px] items-center justify-center rounded-lg border border-[#e2e8f0] bg-white dark:border-[#1e2d3d] dark:bg-[#0a0f1e]"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="mb-1.5 text-xl font-black text-[#0f172a] dark:text-[#f1f5f9]">
              Create Custom Goal
            </h3>
            <p className="mb-5 text-[13px] text-[#475569] dark:text-[#94a3b8]">
              Define your own savings goal with a custom name, target, and timeline.
            </p>
            <div className="mb-4 flex flex-col gap-3">
              <div>
                <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[.4px] text-[#475569] dark:text-[#94a3b8]">
                  Goal Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. My Dream Home"
                  className="w-full rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white px-3.5 py-3 text-sm text-[#0f172a] outline-none focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]"
                />
              </div>
              <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[.4px] text-[#475569] dark:text-[#94a3b8]">
                    Target (৳)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 500000"
                    className="w-full rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white px-3.5 py-3 text-sm text-[#0f172a] outline-none focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-[11px] font-bold uppercase tracking-[.4px] text-[#475569] dark:text-[#94a3b8]">
                    Monthly (৳)
                  </label>
                  <input
                    type="number"
                    placeholder="e.g. 10000"
                    className="w-full rounded-[10px] border-[1.5px] border-[#e2e8f0] bg-white px-3.5 py-3 text-sm text-[#0f172a] outline-none focus:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]"
                  />
                </div>
              </div>
            </div>
            <Link
              href="/register"
              className="block rounded-[11px] bg-[linear-gradient(135deg,#059669,#0891b2)] p-[13px] text-center text-sm font-bold text-white"
            >
              Create Account to Save →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoalsPage;
