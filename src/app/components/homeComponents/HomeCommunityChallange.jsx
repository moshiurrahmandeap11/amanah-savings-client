import React from 'react';
import {
  Flame,
  Moon,
  Wallet,
  Trophy,
  Medal,
  Sparkles,
  TrendingUp,
  Award,
  Target,
  Users,
  Crown,
  ArrowRight,
  CheckCircle,
  Zap,
} from 'lucide-react';
import Link from 'next/link';

const challenges = [
  {
    icon: <Flame size={22} />,
    name: '30-day savings streak',
    desc: 'Earn the Gold Streak badge by saving every day for 30 days.',
    badge: 'Active',
    badgeColor: 'bg-primary text-white',
  },
  {
    icon: <Moon size={22} />,
    name: 'Ramadan Savings Challenge',
    desc: 'Special 30-day Ramadan challenge with community milestones',
    badge: 'Seasonal',
    badgeColor: 'bg-primary/15 text-primary border border-primary/30',
  },
  {
    icon: <Wallet size={22} />,
    name: 'Daily ৳100 Challenge',
    desc: 'Save just ৳100 every day — small steps, big dreams',
    badge: 'Popular',
    badgeColor: 'bg-primary/15 text-primary border border-primary/30',
  },
];

const leaderboard = [
  { medal: <Crown size={18} className="text-amber-500" />, name: 'Rahima K.', streak: '192-day streak', amount: '৳1,24,000' },
  { medal: <Medal size={18} className="text-gray-400" />, name: 'Karim A.', streak: '145-day streak', amount: '৳98,500' },
  { medal: <Medal size={18} className="text-amber-600" />, name: 'Nadia H.', streak: '120-day streak', amount: '৳87,000' },
];

const aiInsights = [
  {
    icon: <Sparkles size={18} className="text-primary" />,
    text: (
      <>
        <strong>Rahima,</strong> you can achieve your Hajj goal by saving an
        additional ৳500 per week{' '}
        <span className="text-primary font-semibold">2 months in advance</span>
      </>
    ),
  },
  {
    icon: <TrendingUp size={18} className="text-primary" />,
    text: (
      <>
        Your savings streak has reached{' '}
        <span className="text-primary font-semibold">90 days</span>! You are
        in the top 5% of savers this month.
      </>
    ),
  },
  {
    icon: <Award size={18} className="text-primary" />,
    text: (
      <>
        You saved{' '}
        <span className="text-primary font-semibold">28% more consistently</span>{' '}
        this month than last month.
      </>
    ),
  },
];

const HomeCommunityChallange = () => {
  return (
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-64 h-64 bg-primary-light/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* ───── LEFT COLUMN ───── */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs sm:text-sm font-semibold border border-primary/20 mb-5">
              <Target size={14} />
              <span>Community Challenge</span>
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Save more,{' '}
              <span className="bg-linear-to-r from-primary to-primary-light bg-clip-text text-transparent">
                earn badges
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-foreground/60 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Stay motivated with savings streaks, community challenges,
              achievement badges, and leaderboards. Every deposit keeps your
              streak going.
            </p>

            {/* Challenge Cards */}
            <div className="flex flex-col gap-3 mb-8">
              {challenges.map((c, idx) => (
                <div
                  key={c.name}
                  className="group bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4 hover:border-primary/40 transition-all duration-300 hover:shadow-md"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-bold text-sm sm:text-base">
                      {c.name}
                    </p>
                    <p className="text-foreground/50 text-xs sm:text-sm mt-0.5 leading-snug">
                      {c.desc}
                    </p>
                  </div>
                  <span
                    className={`shrink-0 px-3 py-1 rounded-full text-xs font-semibold ${c.badgeColor}`}
                  >
                    {c.badge}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary hover:bg-primary-dark text-white font-semibold text-sm sm:text-base rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg shadow-primary/20 hover:shadow-primary/40"
            >
              Join the challenge
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ───── RIGHT COLUMN ───── */}
          <div className="flex flex-col gap-5">
            {/* Leaderboard Card */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Trophy size={18} className="text-primary" />
                  </div>
                  <h3 className="text-foreground font-bold text-base sm:text-lg">
                    Best saver of the month
                  </h3>
                </div>
                <span className="text-foreground/40 text-xs sm:text-sm flex items-center gap-1">
                  <Users size={12} />
                  Leaderboard
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {leaderboard.map((item, idx) => (
                  <div
                    key={item.name}
                    className="bg-background rounded-xl px-4 py-3.5 flex items-center gap-3 hover:bg-primary/5 transition-colors duration-200"
                  >
                    <span className="w-6 shrink-0 text-center">{item.medal}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-semibold text-sm">
                        {item.name}
                      </p>
                      <p className="text-foreground/50 text-xs mt-0.5 flex items-center gap-1">
                        <Zap size={10} className="text-primary" />
                        {item.streak}
                      </p>
                    </div>
                    <span className="text-primary font-bold text-sm sm:text-base shrink-0">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>

              <button className="mt-4 text-center w-full text-sm text-primary/70 hover:text-primary transition-colors duration-200 flex items-center justify-center gap-1">
                View full leaderboard
                <ArrowRight size={14} />
              </button>
            </div>

            {/* AI Assistant Card */}
            <div className="bg-card border border-border rounded-2xl p-6 hover:border-primary/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Sparkles size={18} className="text-primary" />
                </div>
                <h3 className="text-foreground font-bold text-base sm:text-lg">
                  AI savings assistant
                </h3>
                <span className="px-2.5 py-0.5 rounded-full bg-primary/15 text-primary border border-primary/30 text-xs font-semibold">
                  Beta
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {aiInsights.map((insight, i) => (
                  <div
                    key={i}
                    className="bg-background rounded-xl px-4 py-3.5 flex gap-3 items-start hover:bg-primary/5 transition-colors duration-200"
                  >
                    <span className="text-primary mt-0.5 shrink-0">{insight.icon}</span>
                    <p className="text-foreground/80 text-sm leading-relaxed">
                      {insight.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCommunityChallange;