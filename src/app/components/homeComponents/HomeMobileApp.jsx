"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Download,
  Sparkles,
} from "lucide-react";

const HomeMobileApp = () => {
  return (
    <section className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Background gradient using CSS variables */}
      <div className="absolute inset-0 bg-linear-to-br from-background via-primary/5 to-background"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-6 sm:space-y-8"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-md px-3 sm:px-4 py-1.5 rounded-full border border-primary/20"
            >
              <Smartphone size={14} className="text-primary" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-primary">
                Mobile app
              </span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
              Your savings{" "}
              <span className="bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
                in your pocket
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-foreground/70 max-w-lg">
              Manage all your savings goals, view progress, get smart reminders,
              and stay connected with Savings Circle — all from your phone.
            </p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-5 sm:space-y-6 pt-4"
            >
              {[
                {
                  icon: "📱",
                  title: "PWA — No installation required",
                  desc: "Add to home screen right from the browser. Quick access without the app store.",
                  delay: 0,
                },
                {
                  icon: "🛎️",
                  title: "Smart payment reminder",
                  desc: "Never miss a submission. Personal reminders before due dates.",
                  delay: 0.1,
                },
                {
                  icon: "🌙",
                  title: "Dark mode + Bangla UI",
                  desc: "Full Bangla language support with beautiful dark mode for comfortable night use.",
                  delay: 0.2,
                },
                {
                  icon: "⚡",
                  title: "Offline access",
                  desc: "View your savings goals and history without the internet.",
                  delay: 0.3,
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: feature.delay }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className="flex gap-3 sm:gap-4 group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 text-xl sm:text-2xl"
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-base sm:text-lg text-foreground">
                      {feature.title}
                    </h3>
                    <p className="text-foreground/60 text-sm sm:text-base">
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-3 sm:gap-4 pt-6"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-2 sm:gap-3 bg-primary text-white px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold hover:bg-primary-hover transition-all shadow-lg shadow-primary/20"
              >
                <Download size={18} />
                Add to home screen
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="flex items-center gap-2 sm:gap-3 border border-border bg-card hover:bg-card-hover px-5 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl font-semibold transition-all"
              >
                <span className="text-xl">📦</span>
                Android APK
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Side - Side by Side Phone Mockups */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Phone 1 - Achievements */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-card rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl border border-border w-65 sm:w-70"
            >
              <div className="bg-background rounded-4xl sm:rounded-[2.2rem] overflow-hidden h-125 sm:h-135 relative">
                {/* Dynamic Island */}
                <div className="h-6 sm:h-7 bg-background flex items-center justify-center relative">
                  <div className="w-24 sm:w-28 h-3 sm:h-3.5 bg-foreground/10 rounded-full"></div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex justify-between items-center mb-5 sm:mb-6">
                    <div className="flex items-center gap-2">
                      <motion.span
                        animate={{ rotate: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-2xl"
                      >
                        🏆
                      </motion.span>
                      <span className="font-semibold text-foreground text-sm sm:text-base">
                        Achievements
                      </span>
                    </div>
                    <Sparkles size={16} className="text-primary" />
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    {[
                      { emoji: "🔥", title: "90-day streak" },
                      { emoji: "⭐", title: "Super Saver" },
                      { emoji: "🤝", title: "Referral Hero" },
                      { emoji: "🏆", title: "Locked", locked: true },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ scale: 1.05 }}
                        className={`bg-card-hover rounded-xl sm:rounded-2xl p-3 sm:p-4 ${item.locked ? "opacity-60" : ""}`}
                      >
                        <motion.div
                          animate={!item.locked ? { scale: [1, 1.1, 1] } : {}}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: idx * 0.5,
                          }}
                          className="text-2xl sm:text-3xl mb-1"
                        >
                          {item.emoji}
                        </motion.div>
                        <div className="text-xs sm:text-sm font-medium text-foreground">
                          {item.title}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="mt-5 sm:mt-6 bg-card-hover rounded-xl sm:rounded-2xl p-3 sm:p-4">
                    <div className="flex items-center justify-between text-xs sm:text-sm mb-3">
                      <span className="text-foreground/80">Progress</span>
                      <span className="text-primary">65%</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground/70">
                            Marriage goals
                          </span>
                          <span className="text-foreground/70">65%</span>
                        </div>
                        <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "65%" }}
                            transition={{ duration: 1, delay: 0.5 }}
                            className="h-1.5 bg-linear-to-r from-primary to-primary-light rounded-full"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-foreground/70">Hajj Fund</span>
                          <span className="text-foreground/70">28%</span>
                        </div>
                        <div className="h-1.5 bg-foreground/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: "28%" }}
                            transition={{ duration: 1, delay: 0.7 }}
                            className="h-1.5 bg-linear-to-r from-primary to-primary-light rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Phone 2 - AI Assistant */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, type: "spring" }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="bg-card rounded-[2.5rem] sm:rounded-[3rem] p-2 sm:p-3 shadow-2xl border border-border w-65 sm:w-70"
            >
              <div className="bg-background rounded-4xl sm:rounded-[2.2rem] overflow-hidden h-125 sm:h-135 relative">
                {/* Dynamic Island */}
                <div className="h-6 sm:h-7 bg-background flex items-center justify-center">
                  <div className="w-24 sm:w-28 h-3 sm:h-3.5 bg-foreground/10 rounded-full"></div>
                </div>

                <div className="p-4 sm:p-5 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-5 sm:mb-6">
                    <motion.div
                      animate={{ rotate: [0, 5, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-primary to-primary-light rounded-xl flex items-center justify-center text-lg sm:text-xl"
                    >
                      🤖
                    </motion.div>
                    <div>
                      <div className="font-semibold text-foreground text-sm sm:text-base">
                        AI assistant
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="space-y-3 sm:space-y-4 flex-1 overflow-y-auto">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.6 }}
                      className="bg-card-hover rounded-2xl rounded-tr-none p-3 sm:p-4 text-xs sm:text-sm max-w-[85%]"
                    >
                      Save an extra ৳500 per week to finish 2 months early!
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="bg-linear-to-r from-primary to-primary-light text-white rounded-2xl rounded-tl-none p-3 sm:p-4 text-xs sm:text-sm ml-auto max-w-[85%]"
                    >
                      How much should I save for Hajj?
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 1.0 }}
                      className="bg-card-hover rounded-2xl p-3 sm:p-4 text-xs sm:text-sm"
                    >
                      Average cost is ৳6.5 lakh. With ৳10k/month, you&apos;ll be
                      ready in 42 months.
                    </motion.div>
                  </div>

                  {/* Reminder */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1.2 }}
                    whileHover={{ scale: 1.02 }}
                    className="mt-4 bg-card-hover rounded-xl sm:rounded-2xl p-3 sm:p-4 text-xs"
                  >
                    <div className="flex items-start gap-3">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="text-base"
                      >
                        🔔
                      </motion.div>
                      <div>
                        <div className="font-medium text-foreground">
                          Smart Reminder
                        </div>
                        <div className="text-foreground/60">
                          Deposit due in 2 days
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeMobileApp;
