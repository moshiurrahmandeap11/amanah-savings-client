"use client";

import {
  Apple,
  Bot,
  CheckCircle,
  CreditCard,
  Flame,
  Globe,
  GraduationCap,
  Home,
  Target,
  Wallet,
  Zap,
} from "lucide-react";

const platformBadges = [
  {
    Icon: Bot,
    eyebrow: "Download",
    title: "Android APK",
    variant: "default",
  },
  {
    Icon: Apple,
    eyebrow: "Coming soon",
    title: "iOS App",
    variant: "default",
  },
  {
    Icon: Globe,
    eyebrow: "Available now",
    title: "Web App (PWA)",
    variant: "active",
  },
];

const installSteps = [
  "Open this site in Chrome or Safari",
  'Choose "Add to Home Screen" from your browser menu',
  "Find the Amanah icon on your home screen — that's it!",
];

const appStats = [
  { value: "4.8★", label: "Rating" },
  { value: "47K+", label: "Members" },
  { value: "5MB", label: "Size" },
];

const HomeDownloadApp = () => {
  return (
    <section
      id="app-download"
      className="overflow-hidden bg-[#f8fafc] py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#111827] dark:text-[#f1f5f9] md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(280px,0.9fr)] md:gap-14">
          <div>
            <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
              App Download
            </span>

            <h2 className="mb-3 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
              Use Amanah
              <br />
              <span className="text-[#059669]">On Any Device</span>
            </h2>

            <p className="mb-7 max-w-[580px] text-[15px] leading-[1.7] text-[#475569] dark:text-[#94a3b8]">
              Use Amanah directly from Android, iPhone, or any browser. Add it
              to your home screen without visiting an app store.
            </p>

            <div className="mb-8 flex flex-wrap gap-3">
              {platformBadges.map(({ Icon, eyebrow, title, variant }) => (
                <a
                  key={title}
                  href="#app-download"
                  className={
                    variant === "active"
                      ? "flex min-w-0 flex-1 basis-[170px] items-center gap-2.5 rounded-xl border-[1.5px] border-[#059669]/30 bg-[linear-gradient(135deg,rgba(5,150,105,.1),rgba(8,145,178,.1))] px-[18px] py-3 no-underline transition-all duration-200 hover:border-[#059669]"
                      : "flex min-w-0 flex-1 basis-[170px] items-center gap-2.5 rounded-xl border-[1.5px] border-[#e2e8f0] bg-white px-[18px] py-3 no-underline transition-all duration-200 hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#1a2235]"
                  }
                >
                  <Icon size={24} className="shrink-0 text-[#059669]" />
                  <div>
                    <div
                      className={`text-[10px] ${
                        variant === "active"
                          ? "font-semibold text-[#059669]"
                          : "text-[#475569] dark:text-[#94a3b8]"
                      }`}
                    >
                      {eyebrow}
                    </div>
                    <div className="text-sm font-bold text-[#0f172a] dark:text-[#f1f5f9]">
                      {title}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="rounded-2xl border border-[#e2e8f0] bg-white p-5 dark:border-[#1e2d3d] dark:bg-[#1a2235]">
              <div className="mb-3.5 flex items-center gap-2 text-[13px] font-bold">
                <Globe size={16} className="text-[#059669]" />
                Add to Home Screen (PWA)
              </div>

              <div className="flex flex-col gap-3">
                {installSteps.map((step, index) => (
                  <div key={step} className="flex items-start gap-3">
                    <div className="flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] text-[11px] font-bold text-white">
                      {index + 1}
                    </div>
                    <div className="text-[13px] leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
                      {step}
                    </div>
                  </div>
                ))}
              </div>

              <a
                href="#app-download"
                className="mt-4 block rounded-[10px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] p-[11px] text-center text-[13px] font-bold text-white no-underline"
              >
                Detailed Install Guide →
              </a>
            </div>
          </div>

          <div className="min-w-0 text-center max-md:mx-auto max-md:max-w-[300px]">
            <div className="relative inline-block">
              <div className="relative mx-auto h-[420px] w-[220px] overflow-hidden rounded-[36px] border-[3px] border-[#e2e8f0] bg-white shadow-[0_24px_64px_rgba(0,0,0,0.2)] dark:border-[#1e2d3d] dark:bg-[#1a2235]">
                <div className="flex h-20 flex-col items-center justify-end bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] pb-2.5">
                  <div className="text-[10px] text-white/80">Amanah Savings</div>
                  <div className="text-[22px] font-black text-white">৳ 2,45,500</div>
                </div>

                <div className="flex flex-col gap-2 px-2.5 py-3">
                  <div className="flex gap-1.5">
                    <PhoneAction Icon={CreditCard} label="Deposit" color="#059669" />
                    <PhoneAction Icon={Wallet} label="Withdraw" color="#0891b2" />
                    <PhoneAction Icon={Target} label="Goal" color="#8b5cf6" />
                  </div>

                  <GoalRow
                    Icon={Home}
                    title="Home Buying Dream"
                    percent="45%"
                    width="45%"
                    color="#059669"
                  />
                  <GoalRow
                    Icon={GraduationCap}
                    title="Education Fund"
                    percent="72%"
                    width="72%"
                    color="#8b5cf6"
                    gradient="linear-gradient(90deg,#8b5cf6,#6366f1)"
                  />

                  <div className="rounded-lg bg-[#059669]/[0.08] p-2 text-center">
                    <div className="flex items-center justify-center gap-1 text-[9px] text-[#475569] dark:text-[#94a3b8]">
                      <Zap size={10} className="text-[#059669]" />
                      Auto-save · Monday · ৳500
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute right-[-50px] top-[30px] whitespace-nowrap rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,.12)] dark:border-[#1e2d3d] dark:bg-[#1a2235]">
                <div className="flex items-center gap-1 text-[10px] font-bold">
                  <Flame size={12} className="text-[#059669]" />
                  90-day streak
                </div>
              </div>
              <div className="absolute bottom-[60px] left-[-60px] whitespace-nowrap rounded-xl border border-[#e2e8f0] bg-white px-3 py-2 shadow-[0_4px_16px_rgba(0,0,0,.12)] dark:border-[#1e2d3d] dark:bg-[#1a2235]">
                <div className="flex items-center gap-1 text-[10px] font-bold text-[#059669]">
                  <CheckCircle size={12} />
                  KYC verified
                </div>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-3 gap-3">
              {appStats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl border border-[#e2e8f0] bg-white px-2 py-3.5 text-center dark:border-[#1e2d3d] dark:bg-[#1a2235]"
                >
                  <div className="text-xl font-black">{stat.value}</div>
                  <div className="mt-0.5 text-[10px] text-[#475569] dark:text-[#94a3b8]">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const PhoneAction = ({ Icon, label, color }) => (
  <div
    className="flex-1 rounded-lg p-2 text-center"
    style={{ background: `${color}14` }}
  >
    <Icon size={16} className="mx-auto" style={{ color }} />
    <div className="mt-1 text-[8px] font-bold">{label}</div>
  </div>
);

const GoalRow = ({ Icon, title, percent, width, color, gradient }) => (
  <div className="flex items-center gap-2 rounded-lg bg-[#e2e8f0] p-2.5 dark:bg-[#1e2d3d]">
    <Icon size={16} className="shrink-0" style={{ color }} />
    <div className="min-w-0 flex-1">
      <div className="text-[9px] font-bold">{title}</div>
      <div className="mt-1 h-1 overflow-hidden rounded-sm bg-white/40">
        <div
          className="h-full rounded-sm"
          style={{ width, background: gradient || "linear-gradient(135deg,#059669,#0891b2)" }}
        />
      </div>
    </div>
    <div className="text-[9px] font-bold" style={{ color }}>
      {percent}
    </div>
  </div>
);

export default HomeDownloadApp;
