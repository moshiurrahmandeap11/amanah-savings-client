"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Flame,
  Trophy,
  Award,
  Gift,
  Share2,
  Download,
  Camera,
} from "lucide-react";

const YearInReviewPage = () => {
  const [currentSlide, setCurrentSlide] = useState(1);
  const [isDark, setIsDark] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "" });
  const totalSlides = 6;
  const canvasRef = useRef(null);

  const goals = [
    {
      icon: "💒",
      name: "Wedding Fund",
      progress: 100,
      saved: "৳3,00,000",
      target: "৳3,00,000",
      status: "Completed ✓",
    },
    {
      icon: "🛡️",
      name: "Emergency Fund",
      progress: 100,
      saved: "৳50,000",
      target: "৳50,000",
      status: "Completed ✓",
    },
    {
      icon: "🕌",
      name: "Hajj Savings",
      progress: 73,
      saved: "৳1,09,500",
      target: "৳1,50,000",
      status: "In Progress",
    },
    {
      icon: "📱",
      name: "New Phone",
      progress: 100,
      saved: "৳35,000",
      target: "৳35,000",
      status: "Purchased!",
    },
  ];

  const badges = [
    "🥇 First Goal",
    "🔥 30-Day Streak",
    "💎 Diamond Saver",
    "🕌 Hajj Saver",
    "💒 Wedding Fund",
    "🛡️ Emergency Fund",
    "⭐ Top 5%",
    "🚀 Goal Crusher",
    "💪 Consistency",
    "🌟 Community Star",
    "📈 Big Saver",
    "❤️ 1 Year Member",
  ];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");

    // Start counter animation
    const target = 87500;
    const step = target / 60;
    let current = 0;
    const interval = setInterval(() => {
      current = Math.min(current + step, target);
      setCounterValue(Math.floor(current));
      if (current >= target) clearInterval(interval);
    }, 20);

    return () => clearInterval(interval);
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 1) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToDashboard = () => {
    window.location.href = "/dashboard";
  };

  const shareOnWhatsApp = () => {
    const text = encodeURIComponent(
      "আমি এই বছর Amanah Savings-এ ৳87,500 জমিয়েছি! 🎉 আপনিও শুরু করুন: amanahsavings.com.bd",
    );
    window.open(`https://wa.me/?text=${text}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(
      "https://www.facebook.com/sharer/sharer.php?u=https://amanahsavings.com.bd&quote=আমার+২০২৪+সঞ্চয়+যাত্রা+দেখুন!",
      "_blank",
    );
  };

  const shareOnInstagram = () => {
    showToast("📸 Download the image and share on Instagram story!");
    downloadImage();
  };

  const downloadImage = () => {
    showToast("✅ Year in Review card saved!");
  };

  // Particle animation for canvas background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      alpha: Math.random() * 0.4 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(52, 211, 153, ${p.alpha})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const slides = [
    // Slide 1 - Intro
    <div key={1} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        2024 Savings Summary
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold mb-3">
        You&apos;ve been{" "}
        <span className="bg-linear-to-r from-primary-light to-accent bg-clip-text text-transparent">
          amazing
        </span>{" "}
        this year!
      </h1>
      <p className="text-sm text-foreground/60 mb-8">
        <span className="text-primary-light font-semibold">Rahima Apu</span>,
        see your savings journey summary for 2024.
      </p>
      <div className="bg-linear-to-r from-primary to-primary-light rounded-2xl p-6 w-full mb-5">
        <div className="text-xs text-white/75 mb-1">Total Saved</div>
        <div className="text-4xl sm:text-5xl font-bold text-white">
          ৳{counterValue.toLocaleString()}
        </div>
        <div className="text-xs text-white/70 mt-1">
          87.5% of your goal achieved
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">📅</div>
          <div className="text-xl font-bold">287</div>
          <div className="text-xs text-foreground/50">Day Streak</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">🎯</div>
          <div className="text-xl font-bold">3 Goals</div>
          <div className="text-xs text-foreground/50">Completed</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">💳</div>
          <div className="text-xl font-bold">34 Times</div>
          <div className="text-xs text-foreground/50">Deposits</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
          <div className="text-2xl mb-1">🏆</div>
          <div className="text-xl font-bold">Top 5%</div>
          <div className="text-xs text-foreground/50">Best Saver</div>
        </div>
      </div>
    </div>,

    // Slide 2 - Goals Progress
    <div key={2} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        Your Savings Goals
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        3 <span className="text-primary-light">Goals</span> Completed!
      </h1>
      <p className="text-sm text-foreground/60 mb-5">
        See how far you&apos;ve progressed in each goal
      </p>
      <div className="w-full space-y-4">
        {goals.map((goal, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/10 rounded-xl p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <span>{goal.icon}</span> {goal.name}
              </div>
              <div className="text-sm font-bold text-primary-light">
                {goal.progress}% {goal.progress === 100 && "✓"}
              </div>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary to-primary-light"
                style={{ width: `${goal.progress}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-foreground/50 mt-2">
              <span>{goal.saved}</span>
              <span>
                {goal.progress === 100 ? goal.status : `Target: ${goal.target}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>,

    // Slide 3 - Streak
    <div key={3} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        Savings Streak
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Your <span className="text-amber-500">Consistency</span> is Amazing!
      </h1>
      <div className="bg-linear-to-r from-purple-600 to-primary-light rounded-2xl p-5 flex items-center gap-4 w-full mb-5 text-left">
        <div className="text-6xl animate-pulse">🔥</div>
        <div>
          <div className="text-5xl font-bold text-white">287</div>
          <div className="text-sm text-white/80">Day Savings Streak</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full mb-5">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">📆</div>
          <div className="font-bold">January</div>
          <div className="text-xs text-foreground/50">Streak Started</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">🏆</div>
          <div className="font-bold">#346</div>
          <div className="text-xs text-foreground/50">National Rank</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">✅</div>
          <div className="font-bold">34 Times</div>
          <div className="text-xs text-foreground/50">Deposits</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">❌</div>
          <div className="font-bold">Only 3</div>
          <div className="text-xs text-foreground/50">Days Missed</div>
        </div>
      </div>
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 w-full">
        <p className="text-sm text-amber-400 text-center">
          🎖️ You earned &quot;Diamond Saver&quot; badge — only top 5% members
          get this!
        </p>
      </div>
    </div>,

    // Slide 4 - Badges
    <div key={4} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        Badges Earned
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        Earned <span className="text-purple-400">12 Badges</span> This Year!
      </h1>
      <p className="text-sm text-foreground/60 mb-5">
        Each badge is recognition of your effort
      </p>
      <div className="grid grid-cols-4 gap-3 w-full">
        {badges.map((badge, idx) => (
          <div
            key={idx}
            className="bg-white/5 border border-white/10 rounded-xl p-3 text-center hover:scale-105 transition transform"
          >
            <div className="text-2xl mb-1">{badge[0]}</div>
            <div className="text-[9px] font-medium text-foreground/60">
              {badge.slice(2)}
            </div>
          </div>
        ))}
      </div>
    </div>,

    // Slide 5 - Rank
    <div key={5} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        Your Position in Bangladesh
      </div>
      <h1 className="text-2xl sm:text-3xl font-bold mb-2">
        You are <span className="text-amber-400">Top 5%</span> Saver!
      </h1>
      <div className="bg-linear-to-r from-amber-500/20 to-amber-600/10 border-2 border-amber-500/40 rounded-2xl p-5 flex items-center gap-4 w-full mb-5 text-left">
        <div className="text-6xl">🏆</div>
        <div>
          <div className="text-4xl font-bold text-amber-400">Top 5%</div>
          <div className="text-sm text-white/75">Among 47,000+ members</div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 w-full mb-5">
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">🇧🇩</div>
          <div className="font-bold">#346</div>
          <div className="text-xs text-foreground/50">National Rank</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">🏙️</div>
          <div className="font-bold">#23</div>
          <div className="text-xs text-foreground/50">Dhaka Rank</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">👥</div>
          <div className="font-bold">5</div>
          <div className="text-xs text-foreground/50">Friends Invited</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
          <div className="text-xl mb-1">💫</div>
          <div className="font-bold">Gold</div>
          <div className="text-xs text-foreground/50">Current Level</div>
        </div>
      </div>
      <div className="bg-primary/20 border border-primary/30 rounded-xl p-4 text-center w-full">
        <p className="text-sm text-foreground/60 mb-1">
          Upgrade to Platinum in 2025
        </p>
        <p className="text-sm font-bold text-primary-light">
          Save ৳47,500 more to reach 🚀
        </p>
      </div>
    </div>,

    // Slide 6 - Share Card
    <div key={6} className="flex flex-col items-center text-center">
      <div className="text-xs font-bold text-primary uppercase tracking-wider mb-3">
        Your Savings Card
      </div>
      <h1 className="text-xl sm:text-2xl font-bold mb-2">
        Share with <span className="text-primary-light">Friends & Family</span>!
      </h1>
      <div className="bg-linear-to-r from-primary to-primary-light via-purple-600 rounded-2xl p-5 w-full mb-5 text-white text-left">
        <div className="flex justify-between items-start mb-4">
          <div className="text-xs font-semibold">🌿 Amanah Savings</div>
          <div className="text-[10px] bg-white/20 px-2 py-1 rounded-full">
            2024 Summary
          </div>
        </div>
        <div className="text-lg font-bold mb-1">Rahima Begum</div>
        <div className="text-3xl font-bold mb-2">৳87,500</div>
        <div className="text-xs mb-4">Saved this year 💪 — Top 5% Saver!</div>
        <div className="flex gap-3">
          <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
            <div className="text-base font-bold">287</div>
            <div className="text-[9px] opacity-75">Day Streak</div>
          </div>
          <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
            <div className="text-base font-bold">3</div>
            <div className="text-[9px] opacity-75">Goals Complete</div>
          </div>
          <div className="flex-1 bg-white/15 rounded-lg p-2 text-center">
            <div className="text-base font-bold">12</div>
            <div className="text-[9px] opacity-75">Badges</div>
          </div>
        </div>
      </div>
      <div className="flex gap-3 w-full mb-3">
        <button
          onClick={shareOnWhatsApp}
          className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold"
        >
          📱 WhatsApp
        </button>
        <button
          onClick={shareOnFacebook}
          className="flex-1 py-3 rounded-xl bg-linear-to-r from-blue-600 to-cyan-600 text-white text-sm font-bold"
        >
          📘 Facebook
        </button>
        <button
          onClick={shareOnInstagram}
          className="flex-1 py-3 rounded-xl bg-linear-to-r from-purple-600 to-pink-600 text-white text-sm font-bold"
        >
          📸 Instagram
        </button>
      </div>
      <button
        onClick={downloadImage}
        className="w-full py-3 rounded-xl bg-white/10 border border-white/15 text-white text-sm font-bold flex items-center justify-center gap-2"
      >
        <Download size={16} /> Download Image
      </button>
      <p className="text-xs text-foreground/50 mt-3">
        Your friends will be inspired and start too!
      </p>
    </div>,
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Canvas Background */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
      />

      {/* Back Bar */}
      <div className="relative z-10 flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">
          Year in Review
        </span>
      </div>

      {/* Slides */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 py-20">
        <div className="w-full max-w-md mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              {slides[currentSlide - 1]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="fixed bottom-0 left-0 right-0 z-10 bg-background/90 backdrop-blur-xl border-t border-white/10 p-4">
        <div className="flex justify-center gap-2 mb-3">
          {[...Array(totalSlides)].map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${currentSlide === i + 1 ? "w-6 bg-primary-light" : "w-1.5 bg-white/20"}`}
            />
          ))}
        </div>
        <div className="flex justify-center gap-3">
          <button
            onClick={prevSlide}
            disabled={currentSlide === 1}
            className="w-11 h-11 rounded-full bg-white/10 border border-white/15 text-white disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center"
          >
            <ChevronLeft size={18} />
          </button>
          {currentSlide === totalSlides ? (
            <button
              onClick={goToDashboard}
              className="px-6 py-2 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold"
            >
              🏠 Go to Dashboard
            </button>
          ) : (
            <button
              onClick={nextSlide}
              className="px-6 py-2 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold"
            >
              Next →
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default YearInReviewPage;
