"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import axiosInstance from "../shared/AxiosInstance/AxiosInstance";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle,
  Code,
  Globe,
  Handshake,
  Leaf,
  Lock,
  Moon,
  Palette,
  Target,
  Users,
} from "lucide-react";

// ==================== ICON MAP ====================
const iconMap = {
  Handshake,
  Globe,
  Moon,
  Users,
  Lock,
  Target,
  Briefcase,
  Code,
  Palette,
  BarChart3,
};

const getIcon = (name) => iconMap[name] || null;

// ==================== HELPER FUNCTIONS ====================
const useLanguage = () => {
  const [language, setLanguage] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('appLanguage') || 'en';
    }
    return 'en';
  });

  return language;
};

const getText = (field, lang) => {
  if (!field) return '';
  return field[lang] || field.en || '';
};

// ==================== COMPONENTS ====================
function SectionLabel({ children }) {
  return (
    <div className="mb-3 inline-flex rounded-full bg-[#0596691f] px-3.5 py-1 text-xs font-bold uppercase tracking-[.5px] text-[#059669]">
      {children}
    </div>
  );
}

function SectionTitle({ children, className = "" }) {
  return (
    <h2
      className={`mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-tight text-[#0f172a] dark:text-[#f1f5f9] ${className}`}
    >
      {children}
    </h2>
  );
}

const AboutUsPage = () => {
  const lang = useLanguage();
  const [cmsData, setCmsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCms = async () => {
      try {
        const res = await axiosInstance.get("/admin/cms");
        setCmsData(res.data?.data || res.data);
      } catch (err) {
        console.error("Failed to fetch CMS data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCms();
  }, []);

  const aboutUs = cmsData?.aboutUs || {};

  const t = (fieldName) => getText(aboutUs[fieldName], lang);

  // Stats array
  const stats = aboutUs.stats || [];

  // Values array
  const values = aboutUs.values || [];

  // Team array
  const team = aboutUs.team || [];

  // Timeline array
  const timeline = aboutUs.timeline || [];

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8fafc] dark:bg-[#0a0f1e]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#059669] border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] font-['Segoe_UI',system-ui,sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9]">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[linear-gradient(135deg,#059669,#0891b2)] px-6 py-20 text-center">
        <div className="absolute inset-0 opacity-100 [background-image:radial-gradient(circle_at_1px_1px,rgba(255,255,255,.08)_1px,transparent_0)] [background-size:60px_60px]" />
        <div className="relative z-10 mx-auto max-w-[960px]">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/20 px-4 py-1.5 text-[13px] font-semibold text-white">
            <Leaf className="h-4 w-4" />
            {t('heroBadge')}
          </div>
          <h1 className="mb-4 text-[clamp(32px,5vw,56px)] font-black leading-tight text-white">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mb-8 max-w-[560px] text-[17px] leading-relaxed text-white/85">
            {t('heroDesc')}
          </p>
          <div className="mx-auto grid max-w-[900px] grid-cols-2 gap-3 md:grid-cols-4 md:gap-6">
            {stats.map((stat, idx) => {
              const StatIcon = getIcon(stat.icon);
              return (
                <div key={idx} className="min-w-0 rounded-2xl border border-white/20 bg-white/15 p-4 text-center backdrop-blur md:p-6">
                  {StatIcon && <StatIcon className="mx-auto mb-2 h-6 w-6 text-white/80" />}
                  <div className="whitespace-nowrap text-[28px] font-black leading-tight text-white md:text-4xl">{stat.value || ''}</div>
                  <div className="mt-1 text-xs text-white/80 md:text-[13px]">{getText(stat.label, lang)}</div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="h-[60px] w-full">
            <path className="fill-[#f8fafc] dark:fill-[#0a0f1e]" d="M0,60 C300,0 900,0 1200,60 L1200,60 L0,60 Z" />
          </svg>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionLabel>{t('missionLabel')}</SectionLabel>
              <SectionTitle>{t('missionTitle')}</SectionTitle>
              <div className="space-y-4 text-base leading-[1.8] text-[#64748b] dark:text-[#94a3b8]">
                <p>{t('missionP1')}</p>
                <p>{t('missionP2')}</p>
                <p>{t('missionP3')}</p>
              </div>
            </div>
            <div className="rounded-3xl bg-[linear-gradient(135deg,#059669,#0891b2)] p-12 text-center">
              <Leaf className="mx-auto mb-4 h-20 w-20 text-white" strokeWidth={1.6} />
              <div className="text-xl font-bold text-white">{t('missionBadge')}</div>
              <div className="mt-2 text-sm text-white/70">{t('missionSub')}</div>
              <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white/85">
                <CheckCircle className="h-4 w-4" />
                {t('missionTransparent')}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="border-y border-[#e2e8f0] bg-white px-6 py-20 dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <SectionLabel>{t('valuesLabel')}</SectionLabel>
            <SectionTitle>{t('valuesTitle')}</SectionTitle>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, idx) => {
              const Icon = getIcon(value.icon);
              return (
                <article
                  key={idx}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-8 transition hover:-translate-y-1 hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#131e2e]"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0596691f] text-[#059669]">
                    {Icon && <Icon className="h-7 w-7" />}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[#0f172a] dark:text-[#f1f5f9]">{getText(value.title, lang)}</h3>
                  <p className="text-sm leading-[1.7] text-[#64748b] dark:text-[#94a3b8]">{getText(value.desc, lang)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="mb-12 text-center">
            <SectionLabel>{t('teamLabel')}</SectionLabel>
            <SectionTitle>{t('teamTitle')}</SectionTitle>
            <p className="mx-auto max-w-[600px] text-base leading-[1.7] text-[#64748b] dark:text-[#94a3b8]">
              {t('teamDesc')}
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, idx) => {
              const Icon = getIcon(member.icon);
              return (
                <article
                  key={idx}
                  className="rounded-2xl border border-[#e2e8f0] bg-white p-7 text-center transition hover:-translate-y-1 hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#131e2e]"
                >
                  <div className="mx-auto mb-4 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[linear-gradient(135deg,#059669,#0891b2)] text-white">
                    {Icon && <Icon className="h-8 w-8" />}
                  </div>
                  <h3 className="mb-1 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">{getText(member.name, lang)}</h3>
                  <p className="mb-2 text-[13px] font-semibold text-[#059669]">{getText(member.role, lang)}</p>
                  <p className="text-xs leading-[1.6] text-[#64748b] dark:text-[#94a3b8]">{getText(member.bio, lang)}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="border-y border-[#e2e8f0] bg-white px-6 py-20 dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <SectionLabel>{t('timelineLabel')}</SectionLabel>
              <SectionTitle>{t('timelineTitle')}</SectionTitle>
            </div>
            <div className="relative pl-8">
              <div className="absolute bottom-0 left-2 top-0 w-0.5 bg-[linear-gradient(135deg,#059669,#0891b2)]" />
              {timeline.map((item, idx) => (
                <div key={idx} className="relative mb-10 last:mb-0">
                  <div className="absolute left-[-28px] top-1 h-4 w-4 rounded-full border-[3px] border-white bg-[linear-gradient(135deg,#059669,#0891b2)] dark:border-[#131e2e]" />
                  <div className="mb-1 text-xs font-bold text-[#059669]">{getText(item.year, lang)}</div>
                  <h3 className="mb-1 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">{getText(item.title, lang)}</h3>
                  <p className="text-sm text-[#64748b] dark:text-[#94a3b8]">{getText(item.desc, lang)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-[1200px]">
          <div className="rounded-3xl bg-[linear-gradient(135deg,#059669,#0891b2)] p-8 text-center text-white md:p-[60px]">
            <h2 className="mb-3 text-[clamp(24px,3vw,36px)] font-black">{t('ctaTitle')}</h2>
            <p className="mb-8 text-base text-white/85">{t('ctaDesc')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-8 py-3.5 text-[15px] font-bold text-[#059669] transition hover:shadow-lg"
              >
                {t('ctaButton')} <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/contact"
                className="rounded-xl  border-2 border-white/60 px-8 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10"
              >
                {t('ctaButton2')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#e2e8f0] bg-white px-6 py-8 text-center dark:border-[#1e2d3d] dark:bg-[#131e2e]">
        <p className="text-[13px] text-[#64748b] dark:text-[#94a3b8]">
          {t('footer')}
        </p>
      </footer>
    </div>
  );
};

export default AboutUsPage;
