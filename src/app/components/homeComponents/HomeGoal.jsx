"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Briefcase,
  GraduationCap,
  Landmark,
  Laptop,
  Shield,
  Sparkles,
  Users,
  Gem,
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect, useMemo } from "react";
import axiosInstance from "../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Section Header
    sectionBadge: "Savings Goals",
    sectionTitle: "Save for What ",
    sectionTitleHighlight: "Matters Most",
    sectionDesc: "Choose from our community's most popular savings goals, or create your own custom goal.",
    
    // View All Button
    viewAllBtn: "View All Goals & Circles",
    
    // Join Circle Button
    joinCircleBtn: "Join Circle",
    
    // Goal Names
    goal1Name: "Wedding Fund",
    goal1Members: "3,240 members saving",
    goal1Amount: "৳5,000 – ৳30,000/mo",
    goal1Period: "12–36 months",
    
    goal2Name: "Hajj Fund",
    goal2Members: "1,890 members saving",
    goal2Amount: "৳10,000 – ৳20,000/mo",
    goal2Period: "24–48 months",
    
    goal3Name: "Emergency Fund",
    goal3Members: "5,610 members saving",
    goal3Amount: "৳500 – ৳5,000/mo",
    goal3Period: "6–12 months",
    
    goal4Name: "Education Fund",
    goal4Members: "2,140 members saving",
    goal4Amount: "৳2,000 – ৳15,000/mo",
    goal4Period: "12–60 months",
    
    goal5Name: "Gadget / Device",
    goal5Members: "4,320 members saving",
    goal5Amount: "৳1,000 – ৳10,000/mo",
    goal5Period: "3–12 months",
    
    goal6Name: "Business Startup",
    goal6Members: "980 members saving",
    goal6Amount: "৳5,000 – ৳50,000/mo",
    goal6Period: "12–48 months",
  },
  bn: {
    // Section Header
    sectionBadge: "সঞ্চয় লক্ষ্য",
    sectionTitle: "যা ",
    sectionTitleHighlight: "সবচেয়ে গুরুত্বপূর্ণ",
    sectionTitleEnd: " তার জন্য সঞ্চয় করুন",
    sectionDesc: "আমাদের কমিউনিটির সবচেয়ে জনপ্রিয় সঞ্চয় লক্ষ্য থেকে বেছে নিন, অথবা আপনার নিজস্ব কাস্টম লক্ষ্য তৈরি করুন।",
    
    // View All Button
    viewAllBtn: "সব লক্ষ্য ও সার্কেল দেখুন",
    
    // Join Circle Button
    joinCircleBtn: "সার্কেলে যোগ দিন",
    
    // Goal Names
    goal1Name: "বিয়ে তহবিল",
    goal1Members: "৩,২৪০ সদস্য সঞ্চয় করছে",
    goal1Amount: "৳৫,০০০ – ৳৩০,০০০/মাস",
    goal1Period: "১২–৩৬ মাস",
    
    goal2Name: "হজ তহবিল",
    goal2Members: "১,৮৯০ সদস্য সঞ্চয় করছে",
    goal2Amount: "৳১০,০০০ – ৳২০,০০০/মাস",
    goal2Period: "২৪–৪৮ মাস",
    
    goal3Name: "জরুরি তহবিল",
    goal3Members: "৫,৬১০ সদস্য সঞ্চয় করছে",
    goal3Amount: "৳৫০০ – ৳৫,০০০/মাস",
    goal3Period: "৬–১২ মাস",
    
    goal4Name: "শিক্ষা তহবিল",
    goal4Members: "২,১৪০ সদস্য সঞ্চয় করছে",
    goal4Amount: "৳২,০০০ – ৳১৫,০০০/মাস",
    goal4Period: "১২–৬০ মাস",
    
    goal5Name: "গ্যাজেট / ডিভাইস",
    goal5Members: "৪,৩২০ সদস্য সঞ্চয় করছে",
    goal5Amount: "৳১,০০০ – ৳১০,০০০/মাস",
    goal5Period: "৩–১২ মাস",
    
    goal6Name: "ব্যবসা শুরু",
    goal6Members: "৯৮০ সদস্য সঞ্চয় করছে",
    goal6Amount: "৳৫,০০০ – ৳৫০,০০০/মাস",
    goal6Period: "১২–৪৮ মাস",
  }
};

const circleIcons = [Gem, Landmark, Shield, GraduationCap, Laptop, Briefcase];
const circleAccents = ["#f472b6", "#10b981", "#f59e0b", "#8b5cf6", "#3b82f6", "#06b6d4"];

const formatCurrency = (amount) => {
  const value = Number(amount) || 0;
  return `৳${value.toLocaleString("en-BD")}`;
};

const normalizeCircle = (circle, index) => {
  const members = Number(circle.members ?? circle.currentMembers) || 0;
  const maxMembers = Number(circle.maxMembers) || members || 1;
  const minDeposit = Number(circle.minDeposit) || 0;
  const maxDeposit = Number(circle.maxDeposit ?? circle.targetAmount) || 0;
  const duration = Number(circle.durationInMonths ?? circle.duration) || 0;
  const progress = Math.max(0, Math.min(Math.round((members / maxMembers) * 100), 100));

  return {
    id: circle._id || circle.id || `${circle.circleName || circle.name}-${index}`,
    Icon: circleIcons[index % circleIcons.length],
    name: circle.circleName || circle.name || "Public Circle",
    members: `${members.toLocaleString("en-BD")}/${maxMembers.toLocaleString("en-BD")} members`,
    amount: maxDeposit && maxDeposit !== minDeposit
      ? `${formatCurrency(minDeposit)} - ${formatCurrency(maxDeposit)}/mo`
      : `${formatCurrency(minDeposit)}/mo`,
    period: duration ? `${duration} months` : circle.purpose || "Public circle",
    progress,
    accent: circleAccents[index % circleAccents.length],
  };
};

const HomeGoal = () => {
  const [language] = useState(() => {
    if (typeof window === "undefined") return "en";
    return localStorage.getItem("appLanguage") || "en";
  });
  const [circles, setCircles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchPublicCircles = async () => {
      setLoading(true);
      setLoadError("");

      try {
        const response = await axiosInstance.get("/circles/public", {
          params: { limit: 6 },
        });
        if (isMounted) setCircles(response.data?.data?.circles || []);
      } catch (error) {
        console.error("Fetch home circles error:", error);
        if (isMounted) setLoadError(error.response?.data?.message || "Failed to load public circles");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(fetchPublicCircles, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  // Translation function
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const goals = useMemo(() => circles.map(normalizeCircle), [circles]);

  return (
    <section
      id="goals"
      className="bg-white py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9] md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
          {t('sectionBadge')}
        </span>

        <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
          {t('sectionTitle')}
          <span className="text-[#059669]">{t('sectionTitleHighlight')}</span>
          {language === 'bn' && t('sectionTitleEnd')}
        </h2>

        <p className="mx-auto max-w-[580px] text-lg leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
          {t('sectionDesc')}
        </p>

        {loading ? (
          <div className="mt-12 rounded-[20px] border border-[#e2e8f0] bg-white p-8 text-sm font-semibold text-[#475569] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#94a3b8]">
            Loading public circles...
          </div>
        ) : loadError ? (
          <div className="mt-12 rounded-[20px] border border-red-200 bg-red-50 p-8 text-sm font-semibold text-red-600 dark:border-red-900/50 dark:bg-red-950/30">
            {loadError}
          </div>
        ) : goals.length === 0 ? (
          <div className="mt-12 rounded-[20px] border border-[#e2e8f0] bg-white p-8 text-sm font-semibold text-[#475569] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:text-[#94a3b8]">
            No public circles available right now.
          </div>
        ) : (
          <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {goals.map((goal, index) => (
              <GoalCard key={goal.id} goal={goal} index={index} t={t} />
            ))}
          </div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, margin: "-60px" }}
          className="mt-9"
        >
          <Link
            href="/goals"
            className="inline-flex items-center justify-center gap-2 rounded-[14px] border border-[#e2e8f0] bg-transparent px-8 py-4 text-base font-semibold text-[#0f172a] transition-all duration-200 hover:border-[#059669] hover:bg-[#059669]/5 hover:text-[#059669] dark:border-[#1e2d3d] dark:text-[#f1f5f9]"
          >
            {t('viewAllBtn')}
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const GoalCard = ({ goal, index, t }) => {
  const { Icon } = goal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group relative cursor-pointer overflow-hidden rounded-[20px] border border-[#e2e8f0] bg-white p-6 text-left shadow-[0_4px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#059669] hover:shadow-[0_20px_60px_rgba(0,0,0,0.10)] dark:border-[#1e2d3d] dark:bg-[#1a2235] dark:shadow-[0_4px_24px_rgba(0,0,0,0.3)] dark:hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)]"
    >
      <div
        className="absolute -right-5 -top-5 h-[100px] w-[100px] rounded-full opacity-[0.08] transition-all duration-300 group-hover:scale-125 group-hover:opacity-[0.15]"
        style={{
          background: `radial-gradient(circle, ${goal.accent}, transparent)`,
        }}
      />

      <Icon
        size={36}
        strokeWidth={1.9}
        className="relative mb-3"
        style={{ color: goal.accent }}
        aria-hidden="true"
      />

      <h3 className="relative mb-1.5 text-[17px] font-bold text-[#0f172a] dark:text-[#f1f5f9]">
        {goal.name}
      </h3>

      <div className="relative mb-3 flex items-center gap-1.5 text-xs text-[#94a3b8]">
        <Users size={14} className="text-[#059669]" aria-hidden="true" />
        <span>{goal.members}</span>
      </div>

      <div className="relative mb-2 h-1.5 overflow-hidden rounded-[3px] bg-[#e2e8f0] dark:bg-[#1e2d3d]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${goal.progress}%` }}
          transition={{ duration: 1.2, delay: 0.1 + index * 0.08 }}
          viewport={{ once: true }}
          className="h-full rounded-[3px] bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)]"
        />
      </div>

      <div className="relative flex items-center justify-between gap-3 text-xs">
        <span className="font-bold text-[#059669]">{goal.amount}</span>
        <span className="text-[#94a3b8]">{goal.period}</span>
      </div>

      <div className="relative mt-3.5">
        <Link
          href="/goals"
          className="inline-flex w-full items-center justify-center gap-1.5 rounded-[10px] border border-[#059669]/20 bg-[#059669]/[0.08] px-4 py-2.5 text-[13px] font-semibold text-[#059669] transition-all duration-200 hover:border-transparent hover:bg-[linear-gradient(135deg,#059669_0%,#0891b2_100%)] hover:text-white"
        >
          {t('joinCircleBtn')}
          <Sparkles size={14} aria-hidden="true" />
        </Link>
      </div>
    </motion.div>
  );
};

export default HomeGoal;
