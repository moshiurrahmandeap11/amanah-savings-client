"use client";

import { motion } from "framer-motion";
import {
  Target,
  Flame,
  CheckCircle2,
  GraduationCap,
  Bike,
  Gem,
} from "lucide-react";

const Banner = () => {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Glow - Responsive using CSS variables */}
      <div className="absolute left-0 top-0 h-full w-1/2 md:w-1/3 bg-primary/5 blur-[80px] md:blur-[140px]" />
      <div className="absolute right-0 top-0 h-full w-1/2 md:w-1/3 bg-primary-light/5 blur-[80px] md:blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-24">
        <div className="grid items-center gap-8 md:gap-12 lg:gap-16 lg:grid-cols-2">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-primary">
              <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary animate-pulse" />
              <span className="whitespace-nowrap">
                Bangladesh&apos;s #1 Digital Savings Community
              </span>
            </div>

            {/* Heading - Responsive Font Sizes */}
            <h1 className="mt-6 sm:mt-8 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-foreground">
              Save Together.
              <br />
              <span className="bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
                Achieve Goals.
              </span>
              <br />
              Build Your Future.
            </h1>

            {/* Description */}
            <p className="mt-4 sm:mt-6 md:mt-8 max-w-xl mx-auto lg:mx-0 text-base sm:text-lg leading-relaxed sm:leading-9 text-foreground/70">
              Join thousands of members saving money together in secure,
              goal-based savings circles. No bank, no gimmicks — just
              disciplined community savings for real goals.
            </p>

            {/* Buttons */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="rounded-xl cursor-pointer sm:rounded-2xl bg-linear-to-r from-primary to-primary-light px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow"
              >
                Start Saving Free
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="rounded-xl cursor-pointer sm:rounded-2xl border border-border px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold text-foreground transition-all hover:border-primary hover:bg-primary/10"
              >
                ▶ See How It Works
              </motion.button>
            </div>

            {/* Stats - Responsive Grid */}
            <div className="mt-10 sm:mt-14 grid grid-cols-3 gap-3 sm:gap-6">
              {[
                { value: "12,400+", label: "Active Members" },
                { value: "৳4,800Cr+", label: "Total Savings" },
                { value: "98%", label: "Goal Completion" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                >
                  <h3 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
                    {stat.value}
                  </h3>
                  <p className="mt-1 sm:mt-2 text-xs sm:text-sm text-foreground/60">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT SIDE - Hidden on mobile, visible from md breakpoint */}
          <motion.div
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="hidden md:flex relative justify-center items-center"
          >
            {/* Floating Cards - Responsive positioning */}
            <div className="absolute -left-16 lg:-left-24 xl:-left-32 top-1/2 -translate-y-1/2 z-20">
              <motion.div
                animate={{
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="rounded-2xl lg:rounded-3xl border border-border bg-card/90 backdrop-blur-sm p-3 lg:p-5 shadow-xl w-32.5 lg:w-40"
              >
                <Target className="mb-1 lg:mb-2 text-primary" size={20} />
                <p className="text-[10px] lg:text-xs text-foreground/60">
                  Wedding Goal
                </p>
                <h3 className="mt-1 text-lg lg:text-2xl font-bold text-primary">
                  ৳1,80k
                </h3>
                <div className="mt-2 h-1 w-full rounded-full bg-border">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "74%" }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
                <p className="mt-1 lg:mt-2 text-[10px] lg:text-sm text-primary">
                  74% done
                </p>
              </motion.div>
            </div>

            <div className="absolute -right-16 lg:-right-24 xl:-right-32 top-1/4 z-20">
              <motion.div
                animate={{
                  y: [0, 15, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="rounded-2xl lg:rounded-3xl border border-border bg-card/90 backdrop-blur-sm p-3 lg:p-5 shadow-xl w-32.5 lg:w-40"
              >
                <CheckCircle2 className="mb-1 lg:mb-2 text-primary" size={18} />
                <p className="text-[10px] lg:text-xs text-foreground/60">
                  Payment confirmed
                </p>
                <h3 className="mt-1 text-xs lg:text-sm font-semibold text-foreground">
                  ৳5,000 deposited
                </h3>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  className="mt-1 lg:mt-2 inline-flex items-center gap-1 rounded-full bg-primary/20 px-1.5 lg:px-2 py-0.5 lg:py-1 text-[8px] lg:text-xs text-primary"
                >
                  <span className="h-1 w-1 lg:h-1.5 lg:w-1.5 rounded-full bg-primary" />
                  Success
                </motion.div>
              </motion.div>
            </div>

            <div className="absolute -right-8 lg:-right-16 xl:-right-20 bottom-5 lg:bottom-10 z-20">
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="rounded-2xl lg:rounded-3xl border border-border bg-card/90 backdrop-blur-sm p-3 lg:p-5 shadow-xl w-30 lg:w-37.5"
              >
                <Flame className="mb-1 lg:mb-2 text-primary" size={18} />
                <p className="text-[10px] lg:text-xs text-foreground/60">
                  Savings Streak
                </p>
                <h3 className="text-lg lg:text-2xl font-bold text-foreground">
                  90 Days
                </h3>
                <motion.div
                  animate={{ rotate: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mt-0.5 lg:mt-1 text-[8px] lg:text-xs text-primary whitespace-nowrap"
                >
                  On Fire!
                </motion.div>
              </motion.div>
            </div>

            {/* Phone Container - Responsive Size */}
            <motion.div
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative z-10"
            >
              <div className="relative h-125 lg:h-140 xl:h-155 w-65 lg:w-72.5 xl:w-77.5 rounded-[35px] lg:rounded-[40px] xl:rounded-[45px] border border-border bg-linear-to-b from-card to-background p-4 lg:p-5 shadow-[0_0_40px_rgba(16,185,129,0.15)]">
                {/* Dynamic Island */}
                <div className="absolute left-1/2 top-2 lg:top-3 h-6 lg:h-7 w-20 lg:w-24 -translate-x-1/2 rounded-full bg-foreground/10" />

                <div className="mt-6 lg:mt-8 rounded-3xl lg:rounded-[28px] bg-card/30 p-3 lg:p-4 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] lg:text-xs text-foreground/60">
                        Good Morning,
                      </p>
                      <h3 className="text-sm lg:text-base font-semibold text-foreground">
                        Fatema Akter,
                      </h3>
                    </div>
                    <div className="flex h-8 w-8 lg:h-10 lg:w-10 items-center justify-center rounded-full bg-linear-to-r from-primary to-primary-light text-white font-semibold text-sm lg:text-base">
                      F
                    </div>
                  </div>

                  {/* Balance Card */}
                  <div className="mt-4 lg:mt-5 rounded-2xl lg:rounded-3xl bg-linear-to-r from-primary to-primary-light p-4 lg:p-5 text-white relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 h-32 w-32 lg:h-40 lg:w-40 rounded-full bg-white/10 blur-2xl group-hover:scale-150 transition-transform duration-700" />
                    <p className="text-[10px] lg:text-xs opacity-90">
                      Total Savings Balance
                    </p>
                    <h2 className="mt-1 lg:mt-2 text-xl lg:text-3xl xl:text-4xl font-bold tracking-tight">
                      ৳ 2,45,500
                    </h2>
                    <div className="mt-3 lg:mt-4 flex justify-between text-[10px] lg:text-xs">
                      <span>Goal: ৳5,00,000</span>
                      <span>49%</span>
                    </div>
                    <div className="mt-1 lg:mt-2 h-1.5 lg:h-2 rounded-full bg-white/30">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "49%" }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="h-full rounded-full bg-white"
                      />
                    </div>
                  </div>

                  {/* Goal Grid */}
                  <div className="mt-4 lg:mt-5 grid grid-cols-2 gap-2 lg:gap-3">
                    {[
                      {
                        icon: "",
                        title: "Wedding",
                        amount: "৳180k",
                        progress: 70,
                      },
                      {
                        icon: "",
                        title: "Hajj",
                        amount: "৳65k",
                        progress: 45,
                      },
                      {
                        icon: "",
                        title: "Education",
                        amount: "৳50k",
                        progress: 35,
                      },
                      {
                        icon: "",
                        title: "Bike",
                        amount: "৳30k",
                        progress: 60,
                      },
                    ].map((item, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="rounded-xl lg:rounded-2xl bg-card/50 p-2 lg:p-4 backdrop-blur-sm hover:bg-card transition-all cursor-pointer"
                      >
                        <div className="text-primary">{item.icon}</div>
                        <h4 className="mt-2 lg:mt-3 text-[11px] lg:text-sm text-foreground/70">
                          {item.title}
                        </h4>
                        <p className="mt-0.5 lg:mt-1 font-bold text-foreground text-xs lg:text-sm">
                          {item.amount}
                        </p>
                        <div className="mt-2 lg:mt-3 h-1 rounded-full bg-border">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${item.progress}%` }}
                            transition={{
                              duration: 0.8,
                              delay: 0.5 + idx * 0.1,
                            }}
                            className="h-full rounded-full bg-primary"
                          />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Mobile Alternative - Simple Phone Preview for small screens */}
          <div className="md:hidden flex justify-center mt-8">
            <div className="relative h-120 w-70 rounded-[35px] border border-border bg-linear-to-b from-card to-background p-4 shadow-lg">
              <div className="absolute left-1/2 top-2 h-6 w-20 -translate-x-1/2 rounded-full bg-foreground/10" />
              <div className="mt-6 rounded-2xl bg-card/30 p-3 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-foreground/60">
                      Good Morning,
                    </p>
                    <h3 className="text-sm font-semibold text-foreground">
                      Fatema Akter,
                    </h3>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-linear-to-r from-primary to-primary-light text-white font-semibold text-sm">
                    F
                  </div>
                </div>
                <div className="mt-4 rounded-2xl bg-linear-to-r from-primary to-primary-light p-4 text-white">
                  <p className="text-[10px] opacity-90">
                    Total Savings Balance
                  </p>
                  <h2 className="mt-1 text-xl font-bold">৳ 2,45,500</h2>
                  <div className="mt-3 flex justify-between text-[10px]">
                    <span>Goal: ৳5,00,000</span>
                    <span>49%</span>
                  </div>
                  <div className="mt-1 h-1.5 rounded-full bg-white/30">
                    <div className="h-full w-1/2 rounded-full bg-white" />
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[
                    {
                      icon: <Gem size={12} />,
                      title: "Wedding",
                      amount: "৳180k",
                    },
                    { icon: "🕋", title: "Hajj", amount: "৳65k" },
                    {
                      icon: <GraduationCap size={12} />,
                      title: "Education",
                      amount: "৳50k",
                    },
                    { icon: <Bike size={12} />, title: "Bike", amount: "৳30k" },
                  ].map((item, idx) => (
                    <div key={idx} className="rounded-xl bg-card/50 p-2">
                      <div className="text-primary">{item.icon}</div>
                      <h4 className="mt-1 text-xs text-foreground/70">
                        {item.title}
                      </h4>
                      <p className="mt-0.5 font-bold text-foreground text-xs">
                        {item.amount}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
