"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { 
  Search, X, Sun, Moon, Filter, 
  Users, Calendar, TrendingUp, Target, 
  Gem, Star, Shield, GraduationCap, 
  Smartphone, Briefcase, Heart, 
  Flame, Award, CheckCircle, ArrowRight,
  Crown, DollarSign, Clock, Lock
} from "lucide-react";

const GoalsPage = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [isDark, setIsDark] = useState(false);
  const [joinModalOpen, setJoinModalOpen] = useState(null);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [bulkMode, setBulkMode] = useState(false);
  const [selectedGoals, setSelectedGoals] = useState(new Set());

  const goals = [
    {
      id: "wedding",
      name: "Wedding Fund",
      category: "family lifestyle",
      icon: <Gem size={28} />,
      members: 3240,
      progress: 68,
      monthly: "৳5k–৳30k",
      duration: "12–36 mo",
      status: "open",
      badge: "Open",
      color: "from-pink-500 to-rose-500",
    },
    {
      id: "hajj",
      name: "Hajj Fund",
      category: "islamic",
      icon: <Star size={28} />,
      members: 1890,
      progress: 42,
      monthly: "৳10k–৳20k",
      duration: "24–48 mo",
      status: "open",
      badge: "Islamic",
      color: "from-emerald-500 to-teal-500",
    },
    {
      id: "emergency",
      name: "Emergency Fund",
      category: "emergency",
      icon: <Shield size={28} />,
      members: 5610,
      progress: 55,
      monthly: "৳500–৳5k",
      duration: "6–12 mo",
      status: "open",
      badge: "Most Popular",
      color: "from-amber-500 to-orange-500",
    },
    {
      id: "education",
      name: "Education Fund",
      category: "education",
      icon: <GraduationCap size={28} />,
      members: 2140,
      progress: 38,
      monthly: "৳2k–৳15k",
      duration: "12–60 mo",
      status: "open",
      badge: "Open",
      color: "from-purple-500 to-indigo-500",
    },
    {
      id: "gadget",
      name: "Gadget & Device Fund",
      category: "tech",
      icon: <Smartphone size={28} />,
      members: 4320,
      progress: 74,
      monthly: "৳1k–৳10k",
      duration: "3–12 mo",
      status: "filling",
      badge: "Filling Fast",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: "business",
      name: "Business Startup Fund",
      category: "business",
      icon: <Briefcase size={28} />,
      members: 980,
      progress: 28,
      monthly: "৳5k–৳50k",
      duration: "12–48 mo",
      status: "open",
      badge: "Open",
      color: "from-cyan-500 to-blue-500",
    },
    {
      id: "bike",
      name: "Bike / Vehicle Fund",
      category: "lifestyle",
      icon: <Target size={28} />,
      members: 1620,
      progress: 61,
      monthly: "৳2k–৳15k",
      duration: "6–24 mo",
      status: "open",
      badge: "Open",
      color: "from-orange-500 to-amber-500",
    },
    {
      id: "kids",
      name: "Kids Future Fund",
      category: "family education",
      icon: <Heart size={28} />,
      members: 640,
      progress: 18,
      monthly: "৳1k–৳20k",
      duration: "36–120 mo",
      status: "new",
      badge: "New",
      color: "from-violet-500 to-purple-500",
    },
    {
      id: "umrah",
      name: "Umrah Fund",
      category: "islamic",
      icon: <Star size={28} />,
      members: 720,
      progress: 33,
      monthly: "৳3k–৳10k",
      duration: "12–24 mo",
      status: "open",
      badge: "Islamic",
      color: "from-emerald-600 to-emerald-500",
    },
  ];

  const challenges = [
    {
      id: "streak",
      icon: <Flame size={24} />,
      title: "30-Day Savings Streak",
      desc: "Make a deposit every day for 30 consecutive days and earn the Streak Warrior badge.",
      tag: "Active",
      tagColor: "green",
      participants: 2840,
    },
    {
      id: "ramadan",
      icon: <Star size={24} />,
      title: "Ramadan Savings Challenge",
      desc: "Save a little every day of Ramadan. Special seasonal badge + community milestone celebration.",
      tag: "Seasonal",
      tagColor: "gold",
      participants: 1240,
    },
    {
      id: "daily",
      icon: <Target size={24} />,
      title: "Daily ৳100 Challenge",
      desc: "Save just ৳100 every single day. Prove that small, consistent steps build big savings.",
      tag: "Beginner Friendly",
      tagColor: "blue",
      participants: 4120,
    },
  ];

  const filters = [
    { id: "all", label: "All Goals" },
    { id: "family", label: "Family" },
    { id: "islamic", label: "Islamic" },
    { id: "education", label: "Education" },
    { id: "tech", label: "Tech & Gadget" },
    { id: "lifestyle", label: "Lifestyle" },
    { id: "emergency", label: "Emergency" },
    { id: "business", label: "Business" },
  ];

  const filteredGoals = goals
    .filter(
      (goal) => activeFilter === "all" || goal.category.includes(activeFilter),
    )
    .filter(
      (goal) =>
        goal.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "progress-desc") return b.progress - a.progress;
      if (sortBy === "progress-asc") return a.progress - b.progress;
      if (sortBy === "members-desc") return b.members - a.members;
      return 0;
    });

  const toggleBulkSelect = (index) => {
    const newSelected = new Set(selectedGoals);
    if (newSelected.has(index)) newSelected.delete(index);
    else newSelected.add(index);
    setSelectedGoals(newSelected);
  };

  const selectAll = () => {
    if (selectedGoals.size === filteredGoals.length) {
      setSelectedGoals(new Set());
    } else {
      const all = new Set();
      filteredGoals.forEach((_, i) => all.add(i));
      setSelectedGoals(all);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section className="bg-linear-to-br from-primary/5 via-background to-background pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 text-primary text-sm mb-6">
            <Target size={14} />
            Savings Goals & Circles
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Save Toward What <span className="text-primary">Truly Matters</span>
          </h1>
          <p className="text-foreground/70 text-base sm:text-lg max-w-2xl mx-auto mb-8">
            Join community savings circles for specific goals. Locked savings,
            AI-powered insights, and 12,000+ motivated members.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/register"
              className="px-6 py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
            >
              Join a Circle <ArrowRight size={16} />
            </Link>
            <button
              onClick={() => setCreateModalOpen(true)}
              className="px-6 py-3 border border-border rounded-xl font-semibold hover:border-primary hover:text-primary transition inline-flex items-center gap-2"
            >
              + Create Custom Goal
            </button>
          </div>
        </div>
      </section>

      {/* Filter Bar */}
      <div className="sticky top-12 z-40 bg-background border-b border-border py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition ${activeFilter === filter.id ? "bg-linear-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20" : "border border-border text-foreground/70 hover:border-primary"}`}
              >
                {filter.label}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-auto">
              <div className="flex items-center gap-2 px-3 py-2 border border-border rounded-full">
                <Search size={14} className="text-foreground/50" />
                <input
                  type="text"
                  placeholder="Search goals..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm w-32"
                />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-border rounded-full text-sm bg-background text-foreground outline-none cursor-pointer"
              >
                <option value="default">Default</option>
                <option value="progress-desc">Progress (High→Low)</option>
                <option value="progress-asc">Progress (Low→High)</option>
                <option value="members-desc">Members (High→Low)</option>
              </select>
              <button
                onClick={() => setBulkMode(!bulkMode)}
                className="px-3 py-2 border border-border rounded-full text-sm hover:border-primary transition"
              >
                Select
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Toolbar */}
      {bulkMode && (
        <div className="sticky top-15 z-30 bg-linear-to-r from-primary to-primary-light py-3 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-4 flex-wrap">
            <label className="flex items-center gap-2 text-white text-sm font-semibold cursor-pointer">
              <input
                type="checkbox"
                checked={
                  selectedGoals.size === filteredGoals.length &&
                  filteredGoals.length > 0
                }
                onChange={selectAll}
                className="w-4 h-4 cursor-pointer rounded"
              />
              <span>{selectedGoals.size} selected</span>
            </label>
            <div className="h-5 w-px bg-white/30" />
            <button className="px-3 py-1.5 bg-white/20 rounded-lg text-white text-sm font-semibold hover:bg-white/30 transition">
              Deposit
            </button>
            <button className="px-3 py-1.5 bg-white/20 rounded-lg text-white text-sm font-semibold hover:bg-white/30 transition">
              Pause
            </button>
            <button className="px-3 py-1.5 bg-white/20 rounded-lg text-white text-sm font-semibold hover:bg-white/30 transition">
              Share
            </button>
            <button className="px-3 py-1.5 bg-red-500/30 rounded-lg text-white text-sm font-semibold hover:bg-red-500/50 transition">
              Delete
            </button>
            <button
              onClick={() => {
                setBulkMode(false);
                setSelectedGoals(new Set());
              }}
              className="ml-auto px-3 py-1.5 bg-white/15 rounded-lg text-white text-sm hover:bg-white/25 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Featured Circle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-r from-primary to-primary-light rounded-2xl p-6 mb-8 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32" />
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-3 py-1 text-xs font-semibold mb-3">
              <Crown size={12} />
              Featured Circle · Most Popular
            </div>
            <h3 className="text-2xl font-bold mb-2">
              Grand Wedding Fund 2026
            </h3>
            <p className="text-white/90 text-sm mb-4 max-w-xl">
              Bangladesh's largest wedding savings circle. 850+ members
              saving together for the perfect wedding.
            </p>
            <div className="flex gap-6 mb-4">
              <div>
                <div className="text-2xl font-bold">857</div>
                <div className="text-xs opacity-80">Members</div>
              </div>
              <div>
                <div className="text-2xl font-bold">৳4.2 Cr</div>
                <div className="text-xs opacity-80">Total Saved</div>
              </div>
              <div>
                <div className="text-2xl font-bold">68%</div>
                <div className="text-xs opacity-80">Progress</div>
              </div>
            </div>
            <div className="w-full h-2 bg-white/20 rounded-full mb-2">
              <div className="w-[68%] h-full bg-white rounded-full" />
            </div>
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setJoinModalOpen("wedding")}
                className="px-5 py-2 bg-white text-primary rounded-lg font-semibold text-sm hover:bg-gray-100 transition inline-flex items-center gap-2"
              >
                Join This Circle <ArrowRight size={14} />
              </button>
              <button className="px-5 py-2 bg-white/20 rounded-lg font-semibold text-sm hover:bg-white/30 transition">
                View Details
              </button>
            </div>
          </div>
        </motion.div>

        {/* Goals Grid */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-foreground">
            All Savings Goals
          </h2>
          <span className="text-sm text-foreground/50">
            {filteredGoals.length} goals
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredGoals.map((goal, idx) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              whileHover={{ y: -4 }}
              className={`relative bg-card border rounded-xl overflow-hidden transition-all ${bulkMode ? "cursor-pointer" : "hover:border-primary/40"} ${selectedGoals.has(idx) && bulkMode ? "ring-2 ring-primary" : "border-border"}`}
              onClick={() => bulkMode && toggleBulkSelect(idx)}
            >
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    {goal.icon}
                  </div>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${goal.status === "filling" ? "bg-orange-500/20 text-orange-500" : goal.badge === "Islamic" ? "bg-emerald-500/20 text-emerald-500" : goal.badge === "Most Popular" ? "bg-amber-500/20 text-amber-500" : "bg-primary/20 text-primary"}`}
                  >
                    {goal.badge}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">
                  {goal.name}
                </h3>
                <p className="text-foreground/60 text-sm mb-3">
                  Save consistently with community support.
                </p>
                <div className="flex justify-between text-xs mb-1">
                  <span className="flex items-center gap-1">
                    <Users size={10} /> {goal.members.toLocaleString()} members
                  </span>
                  <span className="text-primary font-semibold">
                    {goal.progress}%
                  </span>
                </div>
                <div className="w-full h-1.5 bg-border rounded-full mb-3 overflow-hidden">
                  <div
                    className={`h-full rounded-full bg-linear-to-r ${goal.color}`}
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-background rounded-lg p-2">
                    <div className="text-[10px] text-foreground/50 flex items-center gap-1">
                      <DollarSign size={10} /> Monthly
                    </div>
                    <div className="text-xs font-semibold">{goal.monthly}</div>
                  </div>
                  <div className="bg-background rounded-lg p-2">
                    <div className="text-[10px] text-foreground/50 flex items-center gap-1">
                      <Clock size={10} /> Duration
                    </div>
                    <div className="text-xs font-semibold">{goal.duration}</div>
                  </div>
                </div>
                <button
                  onClick={() => setJoinModalOpen(goal.id)}
                  className="block w-full py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-lg text-center text-sm font-semibold hover:opacity-90 transition"
                >
                  Join {goal.name.split(" ")[0]} Circle →
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Create Banner */}
        <div className="mt-8 p-6 bg-card border border-border rounded-xl text-center">
          <h3 className="text-xl font-bold text-foreground mb-2">
            Don't see your goal?
          </h3>
          <p className="text-foreground/60 mb-4">
            Create a completely custom savings goal with your own target amount,
            timeline, and circle name.
          </p>
          <button
            onClick={() => setCreateModalOpen(true)}
            className="px-6 py-2.5 bg-linear-to-r from-primary to-primary-light text-white rounded-lg font-semibold hover:opacity-90 transition inline-flex items-center gap-2"
          >
            + Create Custom Goal
          </button>
        </div>
      </div>

      {/* Challenges Section */}
      <section className="bg-secondary/20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1 text-primary text-sm font-semibold mb-4">
            <Flame size={14} />
            Community Challenges
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Stay Motivated. <span className="text-primary">Win Badges.</span>
          </h2>
          <p className="text-foreground/60 max-w-md mx-auto mb-8">
            Join community challenges to earn achievement badges, climb the
            leaderboard, and hit your goals faster.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {challenges.map((challenge, idx) => (
              <motion.div
                key={challenge.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-card border border-border rounded-xl p-5 hover:border-primary/40 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                  {challenge.icon}
                </div>
                <h3 className="font-bold text-foreground mb-1">
                  {challenge.title}
                </h3>
                <p className="text-foreground/60 text-sm mb-3">
                  {challenge.desc}
                </p>
                <div className="flex justify-center gap-2 mb-3">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${challenge.tagColor === "green" ? "bg-primary/20 text-primary" : challenge.tagColor === "gold" ? "bg-amber-500/20 text-amber-500" : "bg-blue-500/20 text-blue-500"}`}
                  >
                    {challenge.tag}
                  </span>
                </div>
                <div className="text-xs text-foreground/50 mb-3 flex items-center justify-center gap-1">
                  <Users size={12} />
                  {challenge.participants.toLocaleString()} participants
                </div>
                <button
                  onClick={() => setJoinModalOpen("challenge")}
                  className="block w-full py-2 border border-primary/30 text-primary rounded-lg text-sm font-semibold hover:bg-primary/10 transition"
                >
                  Join Challenge
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Modal */}
      <AnimatePresence>
        {joinModalOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setJoinModalOpen(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setJoinModalOpen(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
              >
                <X size={16} />
              </button>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">
                Join Savings Circle
              </h3>
              <p className="text-foreground/60 text-sm text-center mb-4">
                You need an active account to join this circle.
              </p>
              <div className="bg-background rounded-xl p-4 text-xs text-foreground/60 mb-4">
                <Lock size={12} className="inline mr-1" />
                Savings are locked until goal maturity. Early withdrawal
                requires admin approval. No interest, no profit guarantees.
              </div>
              <div className="flex flex-col gap-3">
                <Link
                  href="/register"
                  className="py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl text-center font-semibold hover:opacity-90 transition"
                >
                  Create Account to Join
                </Link>
                <Link
                  href="/login"
                  className="py-3 border border-border rounded-xl text-center font-semibold hover:border-primary hover:text-primary transition"
                >
                  Already a member? Log In
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Modal */}
      <AnimatePresence>
        {createModalOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            onClick={() => setCreateModalOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-2xl max-w-md w-full p-6 relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setCreateModalOpen(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
              >
                <X size={16} />
              </button>
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mx-auto mb-3">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold mb-1 text-center">Create Custom Goal</h3>
              <p className="text-foreground/60 text-sm text-center mb-5">
                Define your own savings goal with a custom name, target, and
                timeline.
              </p>
              <div className="space-y-4 mb-5">
                <input
                  type="text"
                  placeholder="Goal Name e.g. My Dream Home"
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="number"
                    placeholder="Target (৳)"
                    className="p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                  />
                  <input
                    type="number"
                    placeholder="Monthly (৳)"
                    className="p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition"
                  />
                </div>
              </div>
              <Link
                href="/register"
                className="block w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl text-center font-semibold hover:opacity-90 transition"
              >
                Create Account to Save →
              </Link>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GoalsPage;