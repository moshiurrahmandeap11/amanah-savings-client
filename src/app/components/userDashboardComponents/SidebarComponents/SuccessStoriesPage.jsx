"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Share2, ThumbsUp, Award, Target, Flame } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

const SuccessStoriesPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All Stories");
  const [likedStories, setLikedStories] = useState({});
  const [toast, setToast] = useState({ show: false, message: "" });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const filters = [
    "All Stories",
    "🎓 Education",
    "🏥 Healthcare",
    "✈️ Travel",
    "🕌 Hajj/Umrah",
    "🏡 Home",
    "💼 Business",
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);

  useEffect(() => {
    const fetchStories = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get("/users/success-stories");
        const data = response.data?.data || response.data || [];
        setStories(Array.isArray(data) ? data : []);
        setError(false);
      } catch (err) {
        try {
          const fallback = await axiosInstance.get("/stories");
          const data = fallback.data?.data || fallback.data || [];
          setStories(Array.isArray(data) ? data : []);
          setError(false);
        } catch (fallbackErr) {
          setStories([]);
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 2500);
  };

  const handleLike = (storyId, currentLikes) => {
    if (likedStories[storyId]) {
      showToast("❤️ You unliked this story");
    } else {
      showToast("❤️ Thanks for appreciating this story!");
    }
    setLikedStories((prev) => ({ ...prev, [storyId]: !prev[storyId] }));
  };

  const getStoryGoal = (story) => story.goal || story.goals?.[0] || "";
  const getStoryInitial = (story) =>
    story.initial || story.name?.charAt(0)?.toUpperCase() || "?";
  const getStoryBg = (story) =>
    story.bg || "from-primary to-primary-light";
  const getStoryColor = (story) => story.color || "text-primary";
  const getStoryLikes = (story) => story.likes || 0;
  const getStoryStatus = (story) => story.status || "Active";
  const getStorySaved = (story) => story.saved || story.totalSaved || "৳0";
  const getStoryStreak = (story) => story.streak || 0;
  const getStoryGoalsList = (story) =>
    Array.isArray(story.goals) ? story.goals : story.goal ? [story.goal] : [];

  const filteredStories =
    activeFilter === "All Stories"
      ? stories
      : stories.filter((s) => {
          const goal = getStoryGoal(s);
          return (
            goal.includes(activeFilter.split(" ")[1]) ||
            (activeFilter === "🏥 Healthcare" && goal.includes("Medical")) ||
            (activeFilter === "✈️ Travel" && goal.includes("Dubai")) ||
            (activeFilter === "🕌 Hajj/Umrah" && goal.includes("Umrah")) ||
            (activeFilter === "🏡 Home" && goal.includes("Home")) ||
            (activeFilter === "💼 Business" && goal.includes("Business"))
          );
        });

  const featuredStory = stories.length > 0 ? stories[0] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-linear-to-r from-primary to-primary-light py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="text-[200px] md:text-[300px] font-bold text-white/5 leading-none">
            ❝
          </span>
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            💚 সফল সদস্যদের গল্প
          </h1>
          <p className="text-white/90 text-sm sm:text-base max-w-2xl mx-auto">
            Real members. Real goals. Real results. Read how thousands of
            Bangladeshis are changing their lives through consistent savings.
          </p>
        </div>
      </div>

      {/* Featured Story */}
      {featuredStory && (
        <div className="max-w-6xl mx-auto px-4 mt-12">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl">⭐</span>
            <h2 className="text-xl font-bold text-foreground">
              Featured Story of the Month
            </h2>
          </div>

          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
            <div className="grid md:grid-cols-2">
              {/* Left Side - Avatar & Stats */}
              <div className="bg-linear-to-r from-primary to-primary-light p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-white/10 to-transparent pointer-events-none" />
                <div className="relative z-10">
                  <div className="w-24 h-24 mx-auto rounded-full bg-white/20 border-4 border-white/50 flex items-center justify-center text-white text-4xl font-bold mb-4">
                    {getStoryInitial(featuredStory)}
                  </div>
                  <div className="text-white text-xl font-bold">
                    {featuredStory.name}
                  </div>
                  <div className="text-white/80 text-sm mb-4">
                    {featuredStory.location}
                  </div>
                  <div className="flex flex-wrap justify-center gap-3">
                    <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                      <div className="text-white font-bold">
                        {getStorySaved(featuredStory)}
                      </div>
                      <div className="text-white/70 text-[10px] font-semibold">
                        Total Saved
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                      <div className="text-white font-bold">
                        🔥 {getStoryStreak(featuredStory)}
                      </div>
                      <div className="text-white/70 text-[10px] font-semibold">
                        Day Streak
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-lg px-4 py-2 text-center">
                      <div className="text-white font-bold">
                        {featuredStory.goalsDone ||
                          (Array.isArray(featuredStory.goals)
                            ? featuredStory.goals.length
                            : 0)}
                      </div>
                      <div className="text-white/70 text-[10px] font-semibold">
                        Goals Done
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Right Side - Content */}
              <div className="p-6">
                <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                  🏆 Champion Saver · {featuredStory.memberType || "Member"}
                </div>
                <div className="text-foreground/80 italic text-base leading-relaxed mb-4">
                  "{featuredStory.quote}"
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {getStoryGoalsList(featuredStory).map((goal, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-surface2 text-foreground/70 text-xs font-semibold"
                    >
                      {goal}
                    </span>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      handleLike("featured", getStoryLikes(featuredStory))
                    }
                    className="flex-1 px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white font-semibold text-sm hover:opacity-90 transition"
                  >
                    ❤️ {getStoryLikes(featuredStory)} Likes
                  </button>
                  <button
                    onClick={() => showToast("📤 Shared to WhatsApp!")}
                    className="flex-1 px-4 py-2 rounded-lg border border-border text-foreground/70 font-semibold text-sm hover:border-primary transition"
                  >
                    📤 Share
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Bar */}
      <div className="max-w-6xl mx-auto px-4 mt-8">
        <div className="flex gap-2 flex-wrap">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-semibold border-2 transition ${
                activeFilter === filter
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-border bg-card text-foreground/60 hover:border-primary"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-20">
            <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
            <p className="text-foreground/60 text-sm">Loading stories...</p>
          </div>
        ) : stories.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-xl font-bold text-foreground mb-2">
              No Stories Yet
            </h3>
            <p className="text-foreground/60 text-sm max-w-md mx-auto mb-6">
              Success stories will appear here once members share their
              achievements.
            </p>
            <button className="px-6 py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-bold hover:opacity-90 transition">
              Share My Story →
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {filteredStories.map((story, idx) => (
                <motion.div
                  key={story.id || idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: idx * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer"
                >
                  <div className="p-4 flex items-center gap-3">
                    <div
                      className={`w-14 h-14 rounded-full bg-linear-to-r ${getStoryBg(
                        story
                      )} flex items-center justify-center text-white text-xl font-bold shrink-0`}
                    >
                      {getStoryInitial(story)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground">
                        {story.name}
                      </div>
                      <div className="text-xs text-foreground/50">
                        {story.location} · {story.memberType || "Member"}
                      </div>
                      <div className="inline-flex items-center gap-1 mt-2 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-semibold">
                        {getStoryGoal(story)}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 pb-3">
                    <div className="text-sm text-foreground/70 italic leading-relaxed">
                      "{story.quote}"
                    </div>
                  </div>
                  <div className="bg-surface2 p-3 flex">
                    <div className="flex-1 text-center">
                      <div className="text-base font-bold text-primary">
                        {getStorySaved(story)}
                      </div>
                      <div className="text-[10px] text-foreground/50 font-semibold">
                        Saved
                      </div>
                    </div>
                    <div className="flex-1 text-center border-l border-border">
                      <div className="text-base font-bold text-primary">
                        🔥 {getStoryStreak(story)}
                      </div>
                      <div className="text-[10px] text-foreground/50 font-semibold">
                        Streak
                      </div>
                    </div>
                    <div className="flex-1 text-center border-l border-border">
                      <div className="text-base font-bold text-primary">
                        {getStoryStatus(story)}
                      </div>
                      <div className="text-[10px] text-foreground/50 font-semibold">
                        Status
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 p-3 border-t border-border">
                    <button
                      onClick={() => handleLike(story.id, getStoryLikes(story))}
                      className={`flex-1 py-2 rounded-lg text-xs font-semibold transition flex items-center justify-center gap-1 ${
                        likedStories[story.id]
                          ? "bg-primary/10 text-primary"
                          : "bg-surface2 text-foreground/60 hover:bg-primary/10 hover:text-primary"
                      }`}
                    >
                      ❤️{" "}
                      {likedStories[story.id]
                        ? getStoryLikes(story) + 1
                        : getStoryLikes(story)}
                    </button>
                    <button
                      onClick={() => showToast("📤 Shared to WhatsApp!")}
                      className="flex-1 py-2 rounded-lg text-xs font-semibold bg-linear-to-r from-primary to-primary-light text-white flex items-center justify-center gap-1"
                    >
                      📤 Share
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* CTA Section */}
      <div className="max-w-5xl mx-auto px-4 mb-12">
        <div className="bg-linear-to-r from-primary to-primary-light rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Have a Success Story to Share?
          </h2>
          <p className="text-white/85 text-sm mb-6">
            Your journey could inspire thousands of others!
          </p>
          <button className="px-6 py-3 bg-white text-primary rounded-xl font-bold hover:bg-gray-100 transition">
            Share My Story →
          </button>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SuccessStoriesPage;
