"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";

const ChallengesPage = () => {
  const router = useRouter();
  const [toast, setToast] = useState({ show: false, message: "" });

  const showToastMessage = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const joinChallenge = (challengeName) => {
    showToastMessage(`🎉 You joined the ${challengeName} challenge!`);
  };

  const challenges = [
    {
      id: "ramadan",
      name: "Ramadan Challenge",
      period: "May 2 – June 10, 2026",
      icon: "🌙",
      bgGradient: "from-indigo-900 to-blue-900",
      status: "🔴 ACTIVE · Day 18/30",
      desc: "প্রতিদিন ৳১০০–৳৫০০ সঞ্চয় করুন। ৩০ দিন শেষে বিশেষ পুরস্কার পাবেন। Ramadan-এর বরকতে সঞ্চয় করুন।",
      participants: 3842,
      days: 30,
      maxReward: "৳৮,৭০০",
      reward: "🏆 Badge + ৳১,০০০ bonus for 30-day completers",
      buttonText: "✅ Joined — Day 18",
      buttonClass: "joined",
      disabled: true,
    },
    {
      id: "eid",
      name: "Eid Ul-Adha সঞ্চয়",
      period: "Starting June 15, 2026",
      icon: "🌙",
      bgGradient: "from-amber-700 to-amber-800",
      status: "📅 Upcoming",
      desc: "কোরবানির জন্য প্রস্তুতি নিন। ৬০ দিনে কোরবানির পশু কেনার টাকা জমান। পরিবারের সাথে একসাথে সঞ্চয় করুন।",
      participants: 1204,
      days: 60,
      maxReward: "৳২০,০০০",
      reward: "🐄 Badge + Eid Mubarak certificate for completers",
      buttonText: "🔔 Pre-register Now",
      buttonClass: "active-ch",
    },
    {
      id: "streak",
      name: "100-Day Streak",
      period: "Always available",
      icon: "🔥",
      bgGradient: "from-primary to-primary-light",
      status: "⚡ Ongoing",
      desc: "১০০ দিন একটানা সঞ্চয় করুন। একদিনও মিস করবেন না। এটা সবচেয়ে জনপ্রিয় এবং কঠিন চ্যালেঞ্জ।",
      participants: 8421,
      days: 100,
      maxReward: "14%",
      reward: "🏆 Elite badge + ৳2,000 bonus for finishers",
      buttonText: "🔥 Accept Challenge",
      buttonClass: "active-ch",
    },
    {
      id: "pohela",
      name: "Pohela Boishakh ১৪৩৩",
      period: "Starting March 15, 2027",
      icon: "🎉",
      bgGradient: "from-red-600 to-amber-500",
      status: "⏰ Next Year",
      desc: "বাংলা নববর্ষের আগে ৪৫ দিনে একটি বিশেষ উপহার কিনুন। পহেলা বৈশাখের আনন্দকে সঞ্চয়ে রূপ দিন।",
      participants: 0,
      days: 45,
      maxReward: "Special",
      reward: "🎊 Boishakh badge + surprise gift for completers",
      buttonText: "📅 Available March 2027",
      buttonClass: "upcoming",
      disabled: true,
    },
    {
      id: "daily",
      name: "Daily ৳১০০ Challenge",
      period: "Always available",
      icon: "💯",
      bgGradient: "from-indigo-600 to-purple-700",
      status: "⚡ Ongoing",
      desc: "প্রতিদিন মাত্র ৳১০০ সঞ্চয় করুন। সবচেয়ে সহজ শুরু। শিক্ষার্থী ও নতুন সদস্যদের জন্য বিশেষভাবে উপযুক্ত।",
      participants: 5291,
      days: "৳১০০",
      maxReward: "৳৩৬,৫০০",
      reward: "🌱 Seedling → Sprout badge upgrade after 30 days",
      buttonText: "🌱 Start Today",
      buttonClass: "active-ch",
    },
    {
      id: "student",
      name: "Student Savings Challenge",
      period: "Semester-based",
      icon: "🎓",
      bgGradient: "from-cyan-600 to-primary",
      status: "⚡ Ongoing",
      desc: "ছাত্রছাত্রীদের জন্য বিশেষ চ্যালেঞ্জ। মাত্র ৳৫০/দিন সঞ্চয় করুন। পরীক্ষার ফি থেকে ল্যাপটপ — যেকোনো গোলের জন্য।",
      participants: 2847,
      days: "৳৫০+",
      maxReward: "Special",
      reward: "📚 Student badge + academic year celebration card",
      buttonText: "🎓 Join as Student",
      buttonClass: "active-ch",
    },
  ];

  const completedChallenges = [
    {
      icon: "🌸",
      name: "Pohela Boishakh ১৪৩২",
      year: "April 2026 · 3,241 completed",
    },
    { icon: "🌙", name: "Ramadan ২০২৫", year: "March 2025 · 1,892 completed" },
    { icon: "🎄", name: "Year-End 2025", year: "Dec 2025 · 2,104 completed" },
    {
      icon: "❄️",
      name: "Winter Savings 2025",
      year: "Jan 2026 · 1,456 completed",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-primary to-primary-light py-16 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            🏆 Seasonal Savings Challenges
          </h1>
          <p className="text-white/90 text-base max-w-2xl mx-auto mb-8">
            Special savings challenges tied to Bangladesh&apos;s biggest
            seasons, festivals, and moments. Save more, earn more, celebrate
            together!
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold">
              🌙 Ramadan — Active
            </span>
            <span className="px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold">
              ⭐ 3,842 participants
            </span>
            <span className="px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold">
              💰 ৳1.8 কোটি saved
            </span>
          </div>
        </div>
      </div>

      {/* Active Challenge Banner */}
      <div className="px-4 mt-8 max-w-7xl mx-auto">
        <div className="bg-linear-to-r from-purple-700 to-primary rounded-xl p-6 flex flex-wrap items-center gap-4">
          <div className="text-5xl">🌙</div>
          <div className="flex-1">
            <div className="text-xs font-bold text-white/70 uppercase tracking-wider">
              🔴 Live Now — Day 18 of 30
            </div>
            <div className="text-xl font-bold text-white">
              Ramadan Savings Challenge ২০২৬
            </div>
            <div className="text-sm text-white/80">
              3,842 members saving daily · Ends June 10 · Special rewards for
              completers
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-white">60%</div>
            <div className="text-xs text-white/70 mb-1">complete</div>
            <div className="w-32 h-1.5 bg-white/20 rounded-full overflow-hidden">
              <div className="w-[60%] h-full bg-white rounded-full" />
            </div>
          </div>
          <button className="px-5 py-2 bg-white text-purple-700 rounded-lg font-bold text-sm whitespace-nowrap">
            View Challenge →
          </button>
        </div>
      </div>

      {/* Current Challenges */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          🎯 চলমান ও আসন্ন চ্যালেঞ্জ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, idx) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer bg-card"
            >
              <div
                className={`bg-linear-to-r ${challenge.bgGradient} p-6 relative overflow-hidden`}
              >
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-15">
                  {challenge.icon}
                </div>
                <div
                  className={`inline-flex items-center gap-1 bg-white/20 border border-white/30 rounded-full px-3 py-1 text-xs font-bold text-white mb-3`}
                >
                  {challenge.status}
                </div>
                <div className="text-4xl mb-2">{challenge.icon}</div>
                <div className="text-xl font-bold text-white mb-1">
                  {challenge.name}
                </div>
                <div className="text-xs text-white/80">{challenge.period}</div>
              </div>
              <div className="p-5">
                <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                  {challenge.desc}
                </p>
                <div className="flex mb-4">
                  <div className="flex-1 text-center">
                    <div className="text-lg font-bold text-primary">
                      {challenge.participants.toLocaleString()}
                    </div>
                    <div className="text-[10px] text-foreground/50 font-semibold">
                      Participants
                    </div>
                  </div>
                  <div className="flex-1 text-center border-l border-border">
                    <div className="text-lg font-bold text-primary">
                      {challenge.days}
                    </div>
                    <div className="text-[10px] text-foreground/50 font-semibold">
                      Days
                    </div>
                  </div>
                  <div className="flex-1 text-center border-l border-border">
                    <div className="text-lg font-bold text-primary">
                      {challenge.maxReward}
                    </div>
                    <div className="text-[10px] text-foreground/50 font-semibold">
                      Max Reward
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2 mb-4">
                  <span className="text-lg">🏆</span>
                  <span className="text-xs font-semibold text-primary">
                    {challenge.reward}
                  </span>
                </div>
                <button
                  onClick={() =>
                    !challenge.disabled && joinChallenge(challenge.name)
                  }
                  disabled={challenge.disabled}
                  className={`w-full py-3 rounded-lg font-bold text-sm transition ${
                    challenge.buttonClass === "joined"
                      ? "bg-primary/20 text-primary cursor-default"
                      : challenge.buttonClass === "upcoming"
                        ? "bg-surface2 text-foreground/50 cursor-not-allowed"
                        : "bg-linear-to-r from-primary to-primary-light text-white hover:opacity-90"
                  }`}
                >
                  {challenge.buttonText}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Completed Challenges */}
      <div className="max-w-7xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          ✅ Completed Challenges
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {completedChallenges.map((challenge, idx) => (
            <div
              key={idx}
              className="bg-card border border-border rounded-xl p-5 text-center opacity-70"
            >
              <div className="text-4xl mb-2">{challenge.icon}</div>
              <div className="font-bold text-sm text-foreground mb-1">
                {challenge.name}
              </div>
              <div className="text-xs text-foreground/50">{challenge.year}</div>
              <div className="inline-block mt-2 px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                🏆 Completed
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Toast */}
      {toast.show && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="bg-gray-800 text-white px-6 py-3 rounded-xl text-sm font-semibold shadow-lg">
            {toast.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengesPage;
