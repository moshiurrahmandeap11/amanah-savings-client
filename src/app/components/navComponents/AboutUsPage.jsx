"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Target,
  Globe,
  TrendingUp,
  Sun,
  Moon,
  X,
  Menu,
} from "lucide-react";

const AboutUsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stats = [
    {
      value: "47,000+",
      label: "Active Members",
      icon: <Users size={24} />,
      delay: 0,
    },
    {
      value: "৳2.4 Cr+",
      label: "Total Saved",
      icon: <TrendingUp size={24} />,
      delay: 0.1,
    },
    {
      value: "1,200+",
      label: "Savings Circles",
      icon: <Target size={24} />,
      delay: 0.2,
    },
    {
      value: "64",
      label: "Districts Covered",
      icon: <Globe size={24} />,
      delay: 0.3,
    },
  ];

  const values = [
    {
      icon: "🤝",
      title: "Amanah (Trust)",
      desc: "We operate with complete transparency. No hidden fees, no unclear terms, no surprise deductions.",
    },
    {
      icon: "🌍",
      title: "Inclusive Access",
      desc: "From ৳500 starter to ৳5,000/month Platinum — anyone at any income level can start saving today.",
    },
    {
      icon: "☪️",
      title: "Halal First",
      desc: "Islamic savings mode on every plan. We operate without interest (riba) and comply with Halal finance principles.",
    },
    {
      icon: "👥",
      title: "Community Power",
      desc: "Circles, leaderboards, referrals, and streaks — saving together is more powerful than saving alone.",
    },
    {
      icon: "🔐",
      title: "Privacy & Security",
      desc: "256-bit encryption, NID-verified KYC, and 2FA on all accounts. Your data stays private — always.",
    },
    {
      icon: "🎯",
      title: "Goal-Focused",
      desc: "Every feature is built around your goals — AI assistant, streak system, progress tracking all exist to keep you on track.",
    },
  ];

  const team = [
    {
      name: "Rafiqul Islam",
      role: "Co-Founder & CEO",
      bio: "Former fintech analyst at BRAC Bank. Passionate about financial inclusion for rural Bangladesh.",
      avatar: "👨‍💼",
      color: "from-emerald-500 to-teal-500",
    },
    {
      name: "Nusrat Jahan",
      role: "Co-Founder & CTO",
      bio: "10 years in software engineering. Built scalable platforms used by millions across South Asia.",
      avatar: "👩‍💻",
      color: "from-blue-500 to-cyan-500",
    },
    {
      name: "Arif Hossain",
      role: "Head of Design",
      bio: "UX designer with a love for building products that feel as good as they work.",
      avatar: "👨‍🎨",
      color: "from-purple-500 to-pink-500",
    },
    {
      name: "Fatema Khanam",
      role: "Head of Operations",
      bio: "Oversees member relations, KYC processes, and community circle management across all 64 districts.",
      avatar: "👩‍📊",
      color: "from-orange-500 to-amber-500",
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
      desc: "First 200 beta members join — all from word of mouth. ৳8 lakh saved in first month.",
    },
    {
      year: "August 2024",
      title: "Circles Launch",
      desc: "Savings Circles feature goes live — 100 circles formed in first 48 hours.",
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

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* Hero Section */}
      <section className="relative bg-linear-to-r from-primary to-primary-light pt-20 pb-16 sm:py-20 text-center overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-1.5 text-white text-sm mb-6">
            🌿 Our Story
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            Built for Bangladesh&apos;s Savers
          </h1>
          <p className="text-white/90 text-base sm:text-lg max-w-2xl mx-auto mb-12">
            We started Amanah because we believed every Bangladeshi deserves a
            trusted, transparent, and community-powered way to save for what
            matters most.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: stat.delay }}
                className="bg-white/15 backdrop-blur-sm rounded-xl p-4 text-center border border-white/20"
              >
                <div className="text-white mb-2 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="text-xs text-white/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            className="w-full h-12"
          >
            <path
              d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z"
              fill="var(--background)"
            />
          </svg>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block bg-primary/10 rounded-full px-3 py-1 text-primary text-xs font-semibold mb-4">
                Our Mission
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Savings for Every Dream
              </h2>
              <p className="text-foreground/70 mb-4 leading-relaxed">
                Amanah Savings Community was founded in 2024 with a single
                belief: that saving money should be simple, social, and
                accessible to every Bangladeshi — whether they live in Dhaka or
                a remote village.
              </p>
              <p className="text-foreground/70 mb-4 leading-relaxed">
                We are not a bank, an investment platform, or a financial
                institution. We are a digital savings community that helps
                members set goals, track progress, and stay accountable through
                the power of community circles.
              </p>
              <p className="text-foreground/70 leading-relaxed">
                Every feature we build — from the AI savings assistant to the
                gamified streak system — is designed with one purpose: to help
                you reach your financial goals, one deposit at a time.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-linear-to-r from-primary to-primary-light rounded-2xl p-8 text-center text-white"
            >
              <div className="text-6xl mb-4">🌿</div>
              <div className="text-2xl font-bold">Amanah Savings</div>
              <div className="text-white/80 mt-2">
                Trusted Savings Community
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 rounded-full px-3 py-1 text-primary text-xs font-semibold mb-4">
              Our Values
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              What We Stand For
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-xl p-6 hover:border-primary/40 transition-all"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {value.title}
                </h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block bg-primary/10 rounded-full px-3 py-1 text-primary text-xs font-semibold mb-4">
              Meet the Team
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              The People Behind Amanah
            </h2>
            <p className="text-foreground/60 max-w-2xl mx-auto">
              A small, passionate team from Bangladesh — building the savings
              platform we wished we had.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/40 transition-all"
              >
                <div
                  className={`w-20 h-20 rounded-full bg-linear-to-r ${member.color} flex items-center justify-center text-3xl mx-auto mb-4`}
                >
                  {member.avatar}
                </div>
                <h3 className="font-bold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-semibold mb-2">
                  {member.role}
                </p>
                <p className="text-foreground/60 text-xs leading-relaxed">
                  {member.bio}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block bg-primary/10 rounded-full px-3 py-1 text-primary text-xs font-semibold mb-4">
                Our Journey
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                From Idea to 47,000 Members
              </h2>
            </motion.div>
            <div className="relative pl-6 border-l-2 border-primary">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative mb-8 last:mb-0"
                >
                  <div className="absolute -left-6.75 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                  <div className="text-primary text-xs font-semibold mb-1">
                    {item.year}
                  </div>
                  <h3 className="font-bold text-foreground mb-1">
                    {item.title}
                  </h3>
                  <p className="text-foreground/60 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-linear-to-r from-primary to-primary-light rounded-2xl p-8 sm:p-12 text-center text-white"
          >
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Join Our Community
            </h2>
            <p className="text-white/90 mb-6">
              Start your savings journey today — it takes less than 5 minutes to
              open a free account.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="px-6 py-3 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition"
              >
                Open Free Account →
              </Link>
              <Link
                href="/contact"
                className="px-6 py-3 border-2 border-white/50 text-white rounded-xl font-semibold hover:bg-white/10 transition"
              >
                Talk to Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex flex-wrap justify-center gap-4 text-sm mb-4">
            <Link href="/" className="text-foreground/50 hover:text-primary">
              Home
            </Link>
            <Link
              href="/plans"
              className="text-foreground/50 hover:text-primary"
            >
              Plans
            </Link>
            <Link
              href="/goals"
              className="text-foreground/50 hover:text-primary"
            >
              Goals
            </Link>
            <Link
              href="/about"
              className="text-foreground/50 hover:text-primary"
            >
              About
            </Link>
            <Link href="/faq" className="text-foreground/50 hover:text-primary">
              FAQ
            </Link>
            <Link
              href="/contact"
              className="text-foreground/50 hover:text-primary"
            >
              Contact
            </Link>
            <Link
              href="/privacy"
              className="text-foreground/50 hover:text-primary"
            >
              Privacy
            </Link>
          </div>
          <p className="text-xs text-foreground/40">
            © 2026 Amanah Savings Community. All rights reserved. Bangladesh.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default AboutUsPage;
