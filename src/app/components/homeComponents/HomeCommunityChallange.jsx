import {
  ArrowRight,
  Bot,
  Crown,
  Flame,
  Lightbulb,
  Medal,
  Moon,
  Trophy,
  TrendingUp,
  Wallet,
} from "lucide-react";
import Link from "next/link";

const challenges = [
  {
    Icon: Flame,
    title: "30-Day Savings Streak",
    description: "Save every day for 30 days and earn a Gold Streak Badge",
    badge: "Active",
  },
  {
    Icon: Moon,
    title: "Ramadan Savings Challenge",
    description: "Special 30-day Ramadan challenge with community milestones",
    badge: "Seasonal",
  },
  {
    Icon: Wallet,
    title: "Daily ৳100 Challenge",
    description: "Save just ৳100 every day — small steps, big dreams",
    badge: "Popular",
  },
];

const leaderboard = [
  {
    Icon: Crown,
    iconColor: "#f59e0b",
    rowClass: "border-[rgba(245,158,11,0.15)] bg-[rgba(245,158,11,0.06)]",
    name: "Rahima K.",
    streak: "192-day streak",
    amount: "৳1,24,000",
  },
  {
    Icon: Medal,
    iconColor: "#94a3b8",
    rowClass: "border-[#e2e8f0] bg-[rgba(148,163,184,0.06)] dark:border-[#1e2d3d]",
    name: "Karim A.",
    streak: "145-day streak",
    amount: "৳98,500",
  },
  {
    Icon: Medal,
    iconColor: "#cd7f32",
    rowClass: "border-[rgba(205,127,50,0.15)] bg-[rgba(205,127,50,0.06)]",
    name: "Nadia H.",
    streak: "120-day streak",
    amount: "৳87,000",
  },
];

const insights = [
  {
    Icon: Lightbulb,
    content: (
      <>
        <strong className="text-[#0f172a] dark:text-[#f1f5f9]">Rahima,</strong>{" "}
        you can complete your Hajj goal{" "}
        <strong className="text-[#059669]">2 months earlier</strong> by saving
        ৳500 more per week.
      </>
    ),
  },
  {
    Icon: Flame,
    content: (
      <>
        Your savings streak reached{" "}
        <strong className="text-[#059669]">90 days</strong>! You&apos;re in the
        top 5% of savers this month.
      </>
    ),
  },
  {
    Icon: TrendingUp,
    content: (
      <>
        You saved <strong className="text-[#059669]">28% more consistently</strong>{" "}
        this month compared to last month.
      </>
    ),
  },
];

const HomeCommunityChallange = () => {
  return (
    <section className="bg-[#f8fafc] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#111827] dark:text-[#f1f5f9] md:py-24">
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
              Community Challenges
            </span>

            <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
              Save More, <span className="text-[#059669]">Earn Badges</span>
            </h2>

            <p className="mb-7 max-w-[580px] text-base leading-[1.7] text-[#475569] dark:text-[#94a3b8]">
              Stay motivated with savings streaks, community challenges,
              achievement badges, and leaderboards. Every deposit keeps your
              streak alive.
            </p>

            <div className="mb-7 flex flex-col gap-3.5">
              {challenges.map(({ Icon, title, description, badge }) => (
                <div
                  key={title}
                  className="flex items-center gap-3.5 rounded-xl border border-[#e2e8f0] bg-white p-3.5 dark:border-[#1e2d3d] dark:bg-[#1a2235]"
                >
                  <Icon
                    size={28}
                    className="shrink-0 text-[#059669]"
                    aria-hidden="true"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="text-[15px] font-bold">{title}</div>
                    <div className="text-[13px] leading-[1.5] text-[#475569] dark:text-[#94a3b8]">
                      {description}
                    </div>
                  </div>
                  <span className="ml-auto inline-flex shrink-0 items-center rounded-full border border-[#059669]/20 bg-[#059669]/10 px-3 py-1 text-xs font-semibold text-[#059669]">
                    {badge}
                  </span>
                </div>
              ))}
            </div>

            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-xl bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_4px_15px_rgba(5,150,105,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(5,150,105,0.45)]"
            >
              Join a Challenge
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <div className="flex flex-col gap-4">
            <div className="rounded-[16px] border border-[#e2e8f0] bg-white p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-base font-bold">
                  <Trophy size={20} className="text-[#059669]" aria-hidden="true" />
                  Top Savers This Month
                </div>
                <span className="text-xs text-[#94a3b8]">Community Leaderboard</span>
              </div>

              <div className="flex flex-col gap-2.5">
                {leaderboard.map(({ Icon, iconColor, rowClass, name, streak, amount }) => (
                  <div
                    key={name}
                    className={`flex items-center gap-3 rounded-[10px] border p-2.5 ${rowClass}`}
                  >
                    <Icon
                      size={20}
                      className="shrink-0"
                      style={{ color: iconColor }}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-semibold">{name}</div>
                      <div className="text-xs text-[#94a3b8]">{streak}</div>
                    </div>
                    <div className="shrink-0 text-sm font-bold text-[#059669]">
                      {amount}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[16px] border border-[#059669]/20 bg-[linear-gradient(135deg,rgba(5,150,105,0.05),rgba(59,130,246,0.05))] p-7 shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:bg-[linear-gradient(135deg,rgba(5,150,105,0.08),rgba(59,130,246,0.08))] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
              <div className="mb-3 flex items-center gap-2.5">
                <Bot size={24} className="text-[#059669]" aria-hidden="true" />
                <div className="font-bold">AI Savings Assistant</div>
                <span className="inline-flex items-center rounded-full border border-[#059669]/20 bg-[#059669]/10 px-3 py-1 text-xs font-semibold text-[#059669]">
                  Beta
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                {insights.map(({ Icon, content }, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2.5 rounded-[10px] border border-[#e2e8f0] bg-white px-3.5 py-2.5 text-[13px] leading-[1.6] text-[#475569] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#94a3b8]"
                  >
                    <Icon
                      size={16}
                      className="mt-0.5 shrink-0 text-[#059669]"
                      aria-hidden="true"
                    />
                    <div>{content}</div>
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
