"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Download,
  Smartphone,
  Apple,
  Globe,
  Star,
  Users,
  HardDrive,
  ChevronRight,
  Award,
  TrendingUp,
  CheckCircle,
  Zap,
} from "lucide-react";
import { FaChrome } from "react-icons/fa";

const HomeDownloadApp = () => {
  const platforms = [
    {
      name: "Android APK",
      icon: <Smartphone size={24} />,
      status: "Available now",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-500/10",
      buttonText: "Download APK",
    },
    {
      name: "iOS App",
      icon: <Apple size={24} />,
      status: "Coming soon",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-500/10",
      buttonText: "Notify Me",
    },
    {
      name: "Web App (PWA)",
      icon: <Globe size={24} />,
      status: "Available now",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-500/10",
      buttonText: "Open Web App",
    },
  ];

  const steps = [
    {
      step: "1",
      title: "Open this site",
      description: "Open amanah.com.bd in Chrome or Safari browser",
    },
    {
      step: "2",
      title: "Select Add to Home Screen",
      description:
        "Tap the share icon and select 'Add to Home Screen' from the browser menu",
    },
    {
      step: "3",
      title: "Find the Amanah Icon",
      description:
        "You'll see the Amanah icon on your home screen — that's it!",
    },
  ];

  const stats = [
    { value: "4.8★", label: "Rating", icon: <Star size={16} /> },
    { value: "47K+", label: "Members", icon: <Users size={16} /> },
    { value: "5MB", label: "Size", icon: <HardDrive size={16} /> },
  ];

  const features = [
    { icon: <Zap size={14} />, text: "Lightning fast" },
    { icon: <CheckCircle size={14} />, text: "Offline access" },
    { icon: <TrendingUp size={14} />, text: "Real-time sync" },
  ];

  return (
    <section className="min-h-screen bg-background py-16 sm:py-20 lg:py-28 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary-light/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            {/* Badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ duration: 0.4, type: "spring" }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-primary/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary/20 mb-6"
            >
              <Download size={14} className="text-primary" />
              <span className="text-xs sm:text-sm font-medium tracking-wide text-primary">
                Download the app
              </span>
            </motion.div>

            {/* Heading */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-4">
              Use Amanah on{" "}
              <span className="bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
                any device
              </span>
            </h2>

            {/* Description */}
            <p className="text-base sm:text-lg text-foreground/70 mb-8">
              Use directly from Android, iPhone or any browser. Add to home
              screen without an app store.
            </p>

            {/* Platform Cards */}
            <div className="space-y-4 mb-8">
              {platforms.map((platform, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                  className={`${platform.bgColor} rounded-xl p-4 border border-primary/20`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 bg-linear-to-r ${platform.color} rounded-xl flex items-center justify-center text-white`}
                      >
                        {platform.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground text-base sm:text-lg">
                          {platform.name}
                        </h3>
                        <p className="text-sm text-foreground/60">
                          {platform.status}
                        </p>
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                        platform.status === "Available now"
                          ? "bg-linear-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20"
                          : "border border-primary text-primary hover:bg-primary/10"
                      }`}
                    >
                      {platform.buttonText}
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Steps Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
              className="bg-card border border-border rounded-xl p-6"
            >
              <div className="flex items-center gap-2 mb-4">
                <FaChrome size={20} className="text-primary" />
                <h3 className="font-semibold text-foreground">
                  Add to home screen (PWA)
                </h3>
              </div>

              <div className="space-y-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {step.step}
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">
                        {step.title}
                      </p>
                      <p className="text-foreground/60 text-xs">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="mt-4 text-primary text-sm font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Detailed install guide <ChevronRight size={14} />
              </button>
            </motion.div>

            {/* Features Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-wrap gap-4 mt-6"
            >
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-1 text-xs text-foreground/60">
                  <span className="text-primary">{feature.icon}</span>
                  <span>{feature.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Phone Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
            className="flex justify-center lg:justify-end"
          >
            <motion.div
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              {/* Phone Mockup */}
              <div className="relative w-70 sm:w-[320px] bg-card rounded-[3rem] p-3 shadow-2xl border border-border">
                <div className="bg-background rounded-[2.5rem] overflow-hidden">
                  {/* Dynamic Island */}
                  <div className="h-8 bg-background flex items-center justify-center relative">
                    <div className="w-32 h-4 bg-foreground/10 rounded-full"></div>
                  </div>

                  {/* App Interface Preview */}
                  <div className="p-5">
                    {/* App Header */}
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-xs text-foreground/60">
                          Good Morning
                        </div>
                        <div className="font-semibold text-foreground">
                          Rahima Akter
                        </div>
                      </div>
                      <div className="w-10 h-10 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white font-semibold">
                        R
                      </div>
                    </div>

                    {/* Balance Card */}
                    <div className="bg-linear-to-r from-primary to-primary-light rounded-2xl p-4 text-white mb-6">
                      <div className="text-xs opacity-90">Total Savings</div>
                      <div className="text-2xl font-bold mt-1">৳ 2,45,500</div>
                      <div className="mt-3 flex justify-between text-xs">
                        <span>Monthly Goal: ৳10,000</span>
                        <span>65%</span>
                      </div>
                      <div className="mt-2 h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "65%" }}
                          transition={{ duration: 1 }}
                          className="h-full bg-white rounded-full"
                        />
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      <div className="bg-card-hover rounded-xl p-3 text-center">
                        <div className="text-2xl mb-1">📊</div>
                        <div className="text-xs text-foreground/70">
                          Progress
                        </div>
                      </div>
                      <div className="bg-card-hover rounded-xl p-3 text-center">
                        <div className="text-2xl mb-1">🏆</div>
                        <div className="text-xs text-foreground/70">
                          Achievements
                        </div>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex justify-between">
                      {stats.map((stat, idx) => (
                        <div key={idx} className="text-center">
                          <div className="flex items-center justify-center gap-1 text-primary mb-1">
                            {stat.icon}
                          </div>
                          <div className="font-bold text-foreground text-sm">
                            {stat.value}
                          </div>
                          <div className="text-xs text-foreground/60">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="h-5 flex items-center justify-center">
                    <div className="w-32 h-1 bg-foreground/20 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Floating Badge - Rating */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -top-4 -right-4 bg-linear-to-r from-yellow-500 to-amber-500 rounded-full px-3 py-1.5 shadow-lg"
              >
                <div className="flex items-center gap-1 text-white text-sm font-bold">
                  <Star size={14} fill="white" />
                  4.8★
                </div>
              </motion.div>

              {/* Floating Badge - Download Count */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, type: "spring" }}
                className="absolute -bottom-4 -left-4 bg-card border border-border rounded-full px-3 py-1.5 shadow-lg"
              >
                <div className="flex items-center gap-1 text-foreground text-xs font-semibold">
                  <Download size={12} className="text-primary" />
                  47K+ Downloads
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeDownloadApp;