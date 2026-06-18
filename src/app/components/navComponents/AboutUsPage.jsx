"use client";

import React from "react";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle,
  Code,
  Globe,
  Handshake,
  Leaf,
  Lock,
  Moon,
  Palette,
  Target,
  Users,
} from "lucide-react";

const stats = [
  { value: "47,000+", label: "Active Members" },
  { value: "৳2.4 Cr+", label: "Total Saved" },
  { value: "1,200+", label: "Savings Circles" },
  { value: "64", label: "Districts Covered" },
];

const values = [
  {
    icon: Handshake,
    title: "Amanah (Trust)",
    desc: "We operate with complete transparency. No hidden fees, no unclear terms, no surprise deductions. Every taka you deposit is tracked and accounted for.",
  },
  {
    icon: Globe,
    title: "Inclusive Access",
    desc: "From a ৳500 starter plan to a ৳5,000/month Platinum tier, we built Amanah so that anyone, at any income level, can start saving today.",
  },
  {
    icon: Moon,
    title: "Halal First",
    desc: "Islamic savings mode is available on every plan. We operate without interest (riba) and ensure all features comply with Halal finance principles.",
  },
  {
    icon: Users,
    title: "Community Power",
    desc: "Savings circles, leaderboards, referrals, and streaks, we believe saving together is more powerful than saving alone.",
  },
  {
    icon: Lock,
    title: "Privacy & Security",
    desc: "256-bit encryption, NID-verified KYC, and 2FA on all accounts. Your data and savings information stay private, always.",
  },
  {
    icon: Target,
    title: "Goal-Focused",
    desc: "Every feature is built around your goals, not ours. The AI assistant, streak system, and progress tracking all exist to keep you on track.",
  },
];

const team = [
  {
    name: "Rafiqul Islam",
    role: "Co-Founder & CEO",
    bio: "Former fintech analyst at BRAC Bank. Passionate about financial inclusion for rural Bangladesh.",
    icon: Briefcase,
  },
  {
    name: "Nusrat Jahan",
    role: "Co-Founder & CTO",
    bio: "10 years in software engineering. Built scalable platforms used by millions across South Asia.",
    icon: Code,
  },
  {
    name: "Arif Hossain",
    role: "Head of Design",
    bio: "UX designer with a love for building products that feel as good as they work.",
    icon: Palette,
  },
  {
    name: "Fatema Khanam",
    role: "Head of Operations",
    bio: "Oversees member relations, KYC processes, and community circle management across all 64 districts.",
    icon: BarChart3,
  },
];

const timeline = [
  {
    year: "January 2024",
    title: "The Idea",
    desc: "Rafiqul and Nusrat sketch the first concept of Amanah over tea in Dhaka.",
  },
  {
    year: "April 2024",
    title: "Beta Launch",
    desc: "First 200 beta members join, all from word of mouth. ৳8 lakh saved in first month.",
  },
  {
    year: "August 2024",
    title: "Circles Launch",
    desc: "Savings Circles feature goes live, 100 circles formed in first 48 hours.",
  },
  {
    year: "January 2025",
    title: "10,000 Members",
    desc: "Crossed 10,000 active members. Launched AI savings assistant for Gold/Platinum.",
  },
  {
    year: "May 2026",
    title: "47,000 Members & Growing",
    desc: "৳2.4 crore saved. Present in all 64 districts. Islamic mode launched nationwide.",
  },
];

function SectionLabel({ children }) {
  return (
    <div className="mb-3 inline-flex rounded-full bg-[#0596691f] px-3.5 py-1 text-xs font-bold uppercase tracking-[.5px] text-[#059669]">
      {children}
    </div>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-tight text-[#0f172a] dark:text-[#f1f5f9] ${className}`}
    >
      {children}
    </h2>
  );
}

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Segoe_UI',system-ui,sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#059669,#0891b2)] px-6 py-20 text-center">
        <div className="absolute inset-0 opacity-100 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.08)_1px,transparent_0)] [background-size:60px_60px]" />
        <div className="relative z-10 mx-auto max-w-[960px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[13px] font-semibold text-white">
            <Leaf className="h-4 w-4" />
            Our Story
          </div>
          <h1 className="mb-4 text-[clamp(32px,5vw,56px)] font-black leading-tight text-white">
            Built for Bangladesh&apos;s Savers
          </h1>
          <p className="mx-auto mb-8 max-w-[560px] text-[17px] leading-relaxed text-white/85">
            We started Amanah because we believed every Bangladeshi deserves a trusted,
            transparent, and community-powered way to save for what matters most.
          </p>
          <div className="mx-auto grid max-w-[900px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="min-w-0 rounded-2xl border border-white/20 bg-white/15 p-4 text-center backdrop-blur md:p-6"
              >
                <div className="whitespace-nowrap text-[28px] font-black leading-tight text-white md:text-4xl">
                  {stat.value}
                </div>
                <div className="mt-1 text-xs text-white/80 md:text-[13px]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-[60px] w-full">
            <path className="fill-[#f8fafc] dark:fill-[#0a0f1e]" d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>Our Mission</SectionLabel>
              <SectionTitle>Savings for Every Dream</SectionTitle>
              <div className="space-y-4 text-base leading-[1.8] text-[#64748b] dark:text-[#94a3b8]">
                <p>
                  Amanah Savings Community was founded in 2024 with a single belief: that saving
                  money should be simple, social, and accessible to every Bangladeshi, whether they
                  live in Dhaka or a remote village.
                </p>
                <p>
                  We are not a bank, an investment platform, or a financial institution. We are a
                  digital savings community that helps members set goals, track progress, and stay
                  accountable through the power of community circles.
                </p>
                <p>
                  Every feature we build, from the AI savings assistant to the gamified streak
                  system, is designed with one purpose: to help you reach your financial goals, one
                  deposit at a time.
                </p>
              </div>
            </div>
            <div className="rounded-3xl bg-[linear-gradient(135deg,#059669,#0891b2)] p-12 text-center">
              <Leaf className="mx-auto mb-4 h-20 w-20 text-white" strokeWidth={1.6} />
              <div className="text-xl font-bold text-white">Amanah Savings</div>
              <div className="mt-2 text-sm text-white/70">Trusted savings community</div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/85">
                <CheckCircle className="h-4 w-4" />
                100% Transparent
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#e2e8f0] bg-white px-6 py-20 dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <SectionLabel>Our Values</SectionLabel>
            <SectionTitle>What We Stand For</SectionTitle>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <article
                  key={value.title}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-8 transition hover:-translate-y-1 hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#131e2e]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0596691f] text-[#059669]">
                    <Icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#0f172a] dark:text-[#f1f5f9]">{value.title}</h3>
                  <p className="text-sm leading-[1.7] text-[#64748b] dark:text-[#94a3b8]">{value.desc}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <SectionLabel>Meet the Team</SectionLabel>
            <SectionTitle>The People Behind Amanah</SectionTitle>
            <p className="mx-auto max-w-[600px] text-base leading-[1.7] text-[#64748b] dark:text-[#94a3b8]">
              A small, passionate team from Bangladesh, building the savings platform we wished we
              had.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => {
              const Icon = member.icon;
              return (
                <article
                  key={member.name}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-7 text-center transition hover:-translate-y-1 hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#131e2e]"
                >
                  <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#059669,#0891b2)] text-white">
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mb-1 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">{member.name}</h3>
                  <p className="mb-2 text-[13px] font-semibold text-[#059669]">{member.role}</p>
                  <p className="text-xs leading-[1.6] text-[#64748b] dark:text-[#94a3b8]">{member.bio}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="border-y border-[#e2e8f0] bg-white px-6 py-20 dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel>Our Journey</SectionLabel>
              <SectionTitle>From Idea to 47,000 Members</SectionTitle>
            </div>
            <div className="relative pl-8">
              <div className="absolute bottom-0 left-2 top-0 w-0.5 bg-[linear-gradient(135deg,#059669,#0891b2)]" />
              {timeline.map((item) => (
                <div key={item.title} className="relative mb-10 last:mb-0">
                  <div className="absolute left-[-28px] top-1 h-4 w-4 rounded-full border-[3px] border-white bg-[linear-gradient(135deg,#059669,#0891b2)] dark:border-[#131e2e]" />
                  <div className="mb-1 text-xs font-bold text-[#059669]">{item.year}</div>
                  <h3 className="mb-1 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">{item.title}</h3>
                  <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl bg-[linear-gradient(135deg,#059669,#0891b2)] p-8 text-center text-white md:p-[60px]">
            <h2 className="mb-3 text-[clamp(24px,3vw,36px)] font-black">Join Our Community</h2>
            <p className="mb-8 text-base text-white/85">
              Start your savings journey today, it takes less than 5 minutes to open a free account.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-[15px] font-bold text-[#059669]"
              >
                Open Free Account <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="rounded-xl border-2 border-white/60 px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#e2e8f0] bg-white px-6 py-8 text-center dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <p className="text-[13px] text-[#64748b] dark:text-[#94a3b8]">
          © 2026 Amanah Savings Community. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default AboutUsPage;
