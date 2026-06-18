"use client";

import { motion } from "framer-motion";
import {
  Bike,
  CircleCheck,
  Flame,
  Gem,
  GraduationCap,
  Landmark,
  Play,
  Rocket,
  Sparkles,
  Target,
  Trophy,
} from "lucide-react";
import Link from "next/link";

const goals = [
  { icon: Gem, title: "Wedding", amount: "৳1,80k", progress: 72 },
  { icon: Landmark, title: "Hajj", amount: "৳65k", progress: 26 },
  { icon: GraduationCap, title: "Education", amount: "৳50k", progress: 50 },
  { icon: Bike, title: "Bike", amount: "৳30k", progress: 60 },
];

const stats = [
  { value: "12,400+", label: "Active Members" },
  { value: "৳4,800Cr+", label: "Total Savings" },
  { value: "98%", label: "Goal Completion" },
];

const Banner = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] px-0 py-20 pt-35 dark:bg-[linear-gradient(135deg,#022c22_0%,#0c1a3a_100%)]"
    >
      <style jsx>{`
        @keyframes heroFloat {
          0%,
          100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-20px) scale(1.05);
          }
        }

        @keyframes floatCard {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-12px);
          }
        }

        @keyframes heroPulse {
          0%,
          100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.5);
          }
        }

        .hero-orb {
          animation: heroFloat 8s ease-in-out infinite;
        }

        .phone-mockup {
          animation: floatCard 6s ease-in-out infinite;
        }

        .float-card-1 {
          animation: floatCard 7s ease-in-out infinite;
        }

        .float-card-2 {
          animation: floatCard 5s ease-in-out infinite reverse;
        }

        .float-card-3 {
          animation: floatCard 6s ease-in-out infinite 2s;
        }

        .hero-label-dot {
          animation: heroPulse 2s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .hero-orb,
          .float-card-1,
          .float-card-3 {
            display: none;
          }
        }
      `}</style>

      <div className="hero-orb absolute -right-25 -top-25 z-0 h-125 w-125 rounded-full bg-[radial-gradient(circle,#059669_0%,transparent_70%)] opacity-40 blur-[80px]" />
      <div className="hero-orb absolute -bottom-12 -left-20 z-0 h-100 w-100 rounded-full bg-[radial-gradient(circle,#3b82f6_0%,transparent_70%)] opacity-40 blur-[80px] [animation-delay:-4s]" />

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-6">
        <div className="grid items-center gap-8 md:grid-cols-2 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, x: -48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="text-center md:text-left"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-[13px] font-semibold text-primary">
              <span className="hero-label-dot h-1.5 w-1.5 rounded-full bg-primary" />
              <span>Bangladesh&apos;s #1 Digital Savings Community</span>
            </div>

            <h1 className="mb-6 text-[36px] font-black leading-[1.1] tracking-normal text-foreground max-[480px]:text-[30px] md:text-[clamp(36px,5vw,60px)]">
              Save Together.
              <br />
              <span className="bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] bg-clip-text text-transparent">
                Achieve Goals.
              </span>
              <br />
              Build Your Future.
            </h1>

            <p className="mx-auto mb-9 max-w-[520px] text-lg leading-[1.7] text-slate-600 dark:text-slate-400 md:mx-0">
              Join thousands of members saving money together in secure,
              goal-based savings circles. No bank, no gimmicks — just
              disciplined community savings for real goals.
            </p>

            <div className="mb-12 flex flex-wrap justify-center gap-3.5 md:justify-start">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-[14px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] px-8 py-4 text-base font-semibold text-white shadow-[0_4px_15px_rgba(5,150,105,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(5,150,105,0.45)]"
              >
                <Rocket size={18} aria-hidden="true" />
                Start Saving Free
              </Link>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-2 rounded-[14px] border border-border bg-transparent px-8 py-4 text-base font-semibold text-foreground transition-all duration-200 hover:border-primary hover:bg-primary/5 hover:text-primary"
              >
                <Play size={18} aria-hidden="true" />
                See How It Works
              </Link>
            </div>

            <div className="flex justify-center gap-8 md:justify-start max-[480px]:w-full max-[480px]:justify-between max-[480px]:gap-3">
              {stats.map((stat) => (
                <div key={stat.label} className="max-[480px]:min-w-0 max-[480px]:flex-1">
                  <div className="text-[26px] font-extrabold text-foreground max-[480px]:whitespace-nowrap max-[480px]:text-xl">
                    {stat.value}
                  </div>
                  <div className="mt-0.5 text-[13px] text-slate-400 max-[480px]:text-[11px]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 48 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mx-auto flex justify-center md:mx-0"
          >
            <div className="float-card-1 absolute left-[-70px] top-[30px] z-30 rounded-[14px] border border-border bg-card px-4 py-3 text-[13px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-md dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Target className="mb-1 text-primary" size={20} aria-hidden="true" />
              <div className="text-[10px] text-slate-400">Wedding Goal</div>
              <div className="text-sm font-bold text-primary">৳1,80,000</div>
              <div className="mt-1 inline-flex items-center gap-1 rounded-[10px] bg-primary/10 px-2 py-0.5 text-[11px] font-semibold text-primary">
                74% done
              </div>
            </div>

            <div className="float-card-2 absolute bottom-[60px] right-[-60px] z-30 rounded-[14px] border border-border bg-card px-4 py-3 text-[13px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-md max-md:right-[-10px] dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <Flame className="mb-1 text-primary" size={20} aria-hidden="true" />
              <div className="text-[10px] text-slate-400">Savings Streak</div>
              <div className="flex items-center gap-1 text-sm font-bold text-foreground">
                90 Days
                <Trophy size={14} className="text-primary" aria-hidden="true" />
              </div>
            </div>

            <div className="float-card-3 absolute right-[-50px] top-40 z-30 rounded-[14px] border border-border bg-card px-4 py-3 text-[13px] shadow-[0_20px_60px_rgba(0,0,0,0.10)] backdrop-blur-md dark:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="flex items-center gap-1.5">
                <CircleCheck size={18} className="text-primary" aria-hidden="true" />
                <div>
                  <div className="text-[10px] text-slate-400">Payment confirmed</div>
                  <div className="text-xs font-bold text-foreground">৳5,000 deposited</div>
                </div>
              </div>
            </div>

            <div className="phone-mockup relative z-20 w-[280px] rounded-[36px] border border-border bg-card p-4 shadow-[0_40px_100px_rgba(0,0,0,0.15)] max-[480px]:w-[240px]">
              <div className="mx-auto mb-4 h-[22px] w-20 rounded-b-xl bg-background" />
              <div className="overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#ecfdf5_0%,#eff6ff_100%)] p-4 dark:bg-[linear-gradient(135deg,#022c22_0%,#0c1a3a_100%)]">
                <div className="mb-4 flex items-center justify-between">
                  <div className="text-[11px] text-slate-600 dark:text-slate-400">
                    <span>Good Morning,</span>
                    <strong className="flex items-center gap-1 text-[13px] font-bold text-foreground">
                      Fatema Akter
                      <Sparkles size={12} className="text-primary" aria-hidden="true" />
                    </strong>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] text-sm font-semibold text-white">
                    F
                  </div>
                </div>

                <div className="mb-3 rounded-2xl bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] p-4 text-white">
                  <div className="mb-1 text-[10px] opacity-80">Total Savings Balance</div>
                  <div className="text-[22px] font-extrabold">৳ 2,45,500</div>
                  <div className="mt-2.5 flex items-center justify-between text-[10px]">
                    <span>Goal: ৳5,00,000</span>
                    <span>49%</span>
                  </div>
                  <div className="mt-1.5 h-1 rounded-sm bg-white/25">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: "49%" }}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                      className="h-full rounded-sm bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {goals.map((goal, index) => (
                    <GoalTile
                      key={goal.title}
                      goal={goal}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const GoalTile = ({ goal, index }) => {
  const Icon = goal.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.1 * index }}
      className="rounded-[10px] border border-border bg-card p-2.5"
    >
      <Icon className="mb-1 text-primary" size={18} aria-hidden="true" />
      <div className="text-[9px] font-medium text-slate-600 dark:text-slate-400">
        {goal.title}
      </div>
      <div className="text-[11px] font-bold text-foreground">{goal.amount}</div>
      <div className="mt-1 h-[3px] rounded-sm bg-border">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${goal.progress}%` }}
          transition={{ duration: 1.2, delay: 0.2 + index * 0.1 }}
          className="h-full rounded-sm bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)]"
        />
      </div>
    </motion.div>
  );
};

export default Banner;
