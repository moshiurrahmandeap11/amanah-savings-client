"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const ChallengesPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [challenges, setChallenges] = useState([]);
  const [statistics, setStatistics] = useState({
    totalChallenges: 0,
    activeChallenges: 0,
    totalParticipants: 0,
    totalSaved: "৳0",
  });
  const [userChallenges, setUserChallenges] = useState([]);
  const [joining, setJoining] = useState(false);

  // Fetch all challenges
  const fetchChallenges = async () => {
    try {
      const response = await axiosInstance.get("/challenges");
      if (response.data.success) {
        setChallenges(response.data.data.challenges);
        setStatistics(response.data.data.statistics);
      }
    } catch (error) {
      console.error("Fetch challenges error:", error);
    }
  };

  // Fetch user's joined challenges
  const fetchUserChallenges = async () => {
    try {
      const response = await axiosInstance.get("/challenges/user/my-challenges");
      if (response.data.success) {
        setUserChallenges(response.data.data.challenges);
      }
    } catch (error) {
      console.error("Fetch user challenges error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Promise.all([fetchChallenges(), fetchUserChallenges()]);
  }, []);

  const joinChallenge = async (challengeId, challengeName) => {
    setJoining(true);
    try {
      const response = await axiosInstance.post(`/challenges/${challengeId}/join`);
      if (response.data.success) {
        Swal.fire({
          title: "Success!",
          text: `You joined the ${challengeName} challenge!`,
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        await fetchUserChallenges();
        await fetchChallenges();
      }
    } catch (error) {
      console.error("Join challenge error:", error);
      Swal.fire({
        title: "Error!",
        text: error.response?.data?.message || "Failed to join challenge",
        icon: "error",
        confirmButtonColor: "#059669",
      });
    } finally {
      setJoining(false);
    }
  };

  const viewChallenge = (challengeId) => {
    router.push(`/dashboard/challenges/${challengeId}`);
  };

  const isUserJoined = (challengeId) => {
    return userChallenges.some(uc => uc.challengeId === challengeId);
  };

  const getUserProgress = (challengeId) => {
    const userChallenge = userChallenges.find(uc => uc.challengeId === challengeId);
    return userChallenge?.progress || 0;
  };

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const activeChallenges = challenges.filter(c => c.status === "active");
  const upcomingChallenges = challenges.filter(c => c.status === "upcoming");

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
              🌙 {activeChallenges.length} Active Challenges
            </span>
            <span className="px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold">
              ⭐ {statistics.totalParticipants} participants
            </span>
            <span className="px-4 py-2 rounded-full bg-white/20 border border-white/30 text-white text-xs font-semibold">
              💰 {statistics.totalSaved} saved
            </span>
          </div>
        </div>
      </div>

      {/* Active Challenge Banner */}
      {activeChallenges.length > 0 && (
        <div className="px-4 mt-8 max-w-7xl mx-auto">
          <div className="bg-linear-to-r from-purple-700 to-primary rounded-xl p-6 flex flex-wrap items-center gap-4">
            <div className="text-5xl">{activeChallenges[0]?.icon || "🌙"}</div>
            <div className="flex-1">
              <div className="text-xs font-bold text-white/70 uppercase tracking-wider">
                🔴 Live Now
              </div>
              <div className="text-xl font-bold text-white">
                {activeChallenges[0]?.name}
              </div>
              <div className="text-sm text-white/80">
                {activeChallenges[0]?.participants} members saving · {activeChallenges[0]?.period}
              </div>
            </div>
            <button
              onClick={() => viewChallenge(activeChallenges[0]?._id)}
              className="px-5 py-2 bg-white text-purple-700 rounded-lg font-bold text-sm whitespace-nowrap"
            >
              View Challenge →
            </button>
          </div>
        </div>
      )}

      {/* Current Challenges */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">
          🎯 চলমান ও আসন্ন চ্যালেঞ্জ
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {challenges.map((challenge, idx) => {
            const joined = isUserJoined(challenge._id);
            const progress = getUserProgress(challenge._id);
            
            return (
              <motion.div
                key={challenge._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer bg-card"
                onClick={() => viewChallenge(challenge._id)}
              >
                <div
                  className={`bg-linear-to-r ${challenge.bgGradient || "from-primary to-primary-light"} p-6 relative overflow-hidden`}
                >
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-7xl opacity-15">
                    {challenge.icon}
                  </div>
                  <div
                    className={`inline-flex items-center gap-1 bg-white/20 border border-white/30 rounded-full px-3 py-1 text-xs font-bold text-white mb-3`}
                  >
                    {challenge.status === "active" && "🔴 ACTIVE"}
                    {challenge.status === "upcoming" && "📅 Upcoming"}
                    {challenge.status === "completed" && "✅ Completed"}
                  </div>
                  <div className="text-4xl mb-2">{challenge.icon}</div>
                  <div className="text-xl font-bold text-white mb-1">
                    {challenge.name}
                  </div>
                  <div className="text-xs text-white/80">{challenge.period}</div>
                </div>
                <div className="p-5">
                  <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                    {challenge.description}
                  </p>
                  <div className="flex mb-4">
                    <div className="flex-1 text-center">
                      <div className="text-lg font-bold text-primary">
                        {challenge.participants?.toLocaleString() || 0}
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
                  
                  {joined && progress > 0 && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground/60">Your Progress</span>
                        <span className="text-primary font-semibold">{progress}%</span>
                      </div>
                      <div className="h-1.5 bg-border rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 bg-primary/10 rounded-lg px-3 py-2 mb-4">
                    <span className="text-lg">🏆</span>
                    <span className="text-xs font-semibold text-primary">
                      {challenge.reward}
                    </span>
                  </div>
                  
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!joined && challenge.status === "active") {
                        joinChallenge(challenge._id, challenge.name);
                      } else if (joined) {
                        viewChallenge(challenge._id);
                      }
                    }}
                    disabled={joining || challenge.status !== "active" || joined}
                    className={`w-full py-3 rounded-lg font-bold text-sm transition ${
                      joined
                        ? "bg-primary/20 text-primary"
                        : challenge.status === "upcoming"
                          ? "bg-surface2 text-foreground/50 cursor-not-allowed"
                          : "bg-linear-to-r from-primary to-primary-light text-white hover:opacity-90"
                    }`}
                  >
                    {joined 
                      ? `✅ Joined — ${progress}% Complete` 
                      : challenge.status === "upcoming"
                        ? "🔔 Coming Soon"
                        : "🔥 Join Challenge"}
                  </button>
                </div>
              </motion.div>
            );
          })}
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
    </div>
  );
};

export default ChallengesPage;