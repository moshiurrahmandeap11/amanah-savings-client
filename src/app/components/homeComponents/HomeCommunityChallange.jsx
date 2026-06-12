import React from 'react';

const challenges = [
  {
    icon: '',
    name: '30-day savings streak',
    desc: 'Earn the Gold Streak badge by saving every day for 30 days.',
    badge: 'Active',
    badgeColor: 'bg-primary text-white',
  },
  {
    icon: '',
    name: 'Ramadan Savings Challenge',
    desc: 'Special 30-day Ramadan challenge with community milestones',
    badge: 'Seasonal',
    badgeColor: 'bg-primary/15 text-primary border border-primary/30',
  },
  {
    icon: '',
    name: 'Daily ৳100 Challenge',
    desc: 'Save just ৳100 every day — small steps, big dreams',
    badge: 'Popular',
    badgeColor: 'bg-primary/15 text-primary border border-primary/30',
  },
];

const leaderboard = [
  { medal: '', name: 'Rahima K.', streak: '192-day streak', amount: '৳1,24,000' },
  { medal: '', name: 'Karim A.', streak: '145-day streak', amount: '৳98,500' },
  { medal: '', name: 'Nadia H.', streak: '120-day streak', amount: '৳87,000' },
];

const aiInsights = [
  {
    icon: '',
    text: (
      <>
        <strong>Rahima,</strong> you can achieve your Hajj goal by saving an
        additional ৳500 per week{' '}
        <span className="text-primary font-semibold">2 months in advance</span>{' '}
        .
      </>
    ),
  },
  {
    icon: '',
    text: (
      <>
        Your savings streak has reached{' '}
        <span className="text-primary font-semibold">90 days</span> ! You are
        in the top 5% of savers this month.
      </>
    ),
  },
  {
    icon: '',
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
    <section className="bg-background py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start">

          {/* ───── LEFT COLUMN ───── */}
          <div>
            {/* Badge */}
            <span className="inline-flex items-center px-4 py-1.5 rounded-full bg-primary/10 dark:bg-primary/20 text-primary text-xs sm:text-sm font-semibold border border-primary/20 mb-5">
              Community Challenge
            </span>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              Save more,{' '}
              <span className="text-primary">earn badges</span>
            </h2>

            {/* Subtitle */}
            <p className="text-secondary/60 dark:text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-lg">
              Stay motivated with savings streaks, community challenges,
              achievement badges, and leaderboards. Every deposit keeps your
              streak going.
            </p>

            {/* Challenge Cards */}
            <div className="flex flex-col gap-3 mb-8">
              {challenges.map((c) => (
                <div
                  key={c.name}
                  className="bg-card border border-border rounded-2xl px-5 py-4 flex items-center gap-4 hover:bg-card-hover transition-colors duration-200"
                >
                  <div className="text-2xl sm:text-3xl shrink-0 w-10 text-center">
                    {c.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-bold text-sm sm:text-base">
                      {c.name}
                    </p>
                    <p className="text-secondary/50 dark:text-slate-500 text-xs sm:text-sm mt-0.5 leading-snug">
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
            <button className="px-7 cursor-pointer py-3.5 bg-primary hover:bg-primary-hover text-white font-semibold text-sm sm:text-base rounded-xl active:scale-[0.98] transition-all duration-200">
              Join the challenge →
            </button>
          </div>

          {/* ───── RIGHT COLUMN ───── */}
          <div className="flex flex-col gap-5">

            {/* Leaderboard Card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <h3 className="text-foreground font-bold text-base sm:text-lg">
                    Best saver of the month
                  </h3>
                </div>
                <span className="text-secondary/40 dark:text-slate-500 text-xs sm:text-sm">
                  Community Leaderboard
                </span>
              </div>

              <div className="flex flex-col gap-3">
                {leaderboard.map((item) => (
                  <div
                    key={item.name}
                    className="bg-background rounded-xl px-4 py-3.5 flex items-center gap-3"
                  >
                    <span className="text-xl shrink-0">{item.medal}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-foreground font-semibold text-sm">
                        {item.name}
                      </p>
                      <p className="text-secondary/50 dark:text-slate-500 text-xs mt-0.5">
                        {item.streak}
                      </p>
                    </div>
                    <span className="text-primary font-bold text-sm sm:text-base shrink-0">
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Assistant Card */}
            <div className="bg-card border border-border rounded-2xl p-6">
              <div className="flex items-center gap-2 mb-5">
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
                    className="bg-background rounded-xl px-4 py-3.5 flex gap-3 items-start"
                  >
                    <span className="text-base shrink-0 mt-0.5">{insight.icon}</span>
                    <p className="text-foreground/80 dark:text-slate-300 text-sm leading-relaxed">
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