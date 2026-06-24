"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  RefreshCw,
  Globe,
  Home,
  Navigation,
  CreditCard,
  HelpCircle,
  Megaphone,
  Link as LinkIcon,
  Loader2,
  Plus,
  Info,
  Trash2,
  Phone,
} from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Page Title
    contentManagement: "📝 Content Management System",
    changesApplyInstantly: "Changes are applied instantly to all pages after saving",
    
    // Buttons
    reset: "Reset",
    save: "Save",
    saving: "Saving...",
    addFeature: "Add Feature",
    addFAQ: "Add FAQ",
    addLink: "Add Link",
    
    // Tabs
    siteSettings: "⚙️ Site Settings",
    homepage: "🏠 Homepage",
    navigation: "🧭 Navigation",
    plans: "💎 Plans",
    faq: "❓ FAQ",
    announcements: "📢 Announcements",
    footer: "🔗 Footer",
    
    // Site Tab
    basicInfo: "🏢 Basic Information",
    platformName: "Platform Name",
    tagline: "Tagline",
    siteUrl: "Site URL",
    supportEmail: "Support Email",
    supportPhone: "Support Phone",
    localization: "🌐 Localization",
    language: "Language",
    currency: "Currency",
    timezone: "Timezone",
    
    // Homepage Tab
    heroSection: "🦸 Hero Section",
    heroTitle: "Hero Title",
    heroSubtitle: "Hero Subtitle",
    ctaButtonText: "CTA Button Text",
    heroStatistics: "📊 Hero Statistics",
    stat: "Stat",
    icon: "Icon",
    label: "Label",
    value: "Value",
    
    // Navigation Tab
    navigationMenuItems: "🧭 Navigation Menu Items",
    menuLabel: "Menu Label",
    
    // Plans Tab
    planName: "Plan Name",
    minAmount: "Min (৳)",
    maxAmount: "Max (৳, blank=unlimited)",
    monthlyFee: "Monthly Fee (৳)",
    yearlyFee: "Yearly Fee (৳)",
    color: "Color",
    features: "Features",
    newFeature: "New feature",
    
    // Comparison Table Tab
    comparisonTable: "📊 Comparison Table",
    comparisonGroups: "Feature Comparison Groups",
    groupLabel: "Group Label",
    groupIcon: "Icon (Wallet, CreditCard, Users, Bot, Trophy, ShieldCheck, Moon)",
    addRow: "Add Row",
    addGroup: "Add Group",
    deleteGroup: "Delete Group",
    featureName: "Feature Name",
    bronzeValue: "Bronze",
    silverValue: "Silver",
    goldValue: "Gold",
    platinumValue: "Platinum",
    deleteRow: "Delete Row",
    
    // FAQ Tab
    faqItems: "❓ FAQ Items",
    newFAQ: "New FAQ",
    question: "Question",
    answer: "Answer",
    
    // Announcements Tab
    sitewideAnnouncement: "📢 Sitewide Announcement",
    announcementActive: "Announcement Active?",
    yesShow: "Yes — Show",
    noHide: "No — Hide",
    announcementContent: "Announcement Content",
    announcementPlaceholder: "Write your announcement here...",
    linkOptional: "Link (optional)",
    startDate: "Start Date",
    endDate: "End Date",
    
    // Footer Tab
    footerText: "📄 Footer Text",
    copyrightText: "Copyright Text",
    footerSocials: "Social Links",
    footerLinks: "🔗 Footer Links",
    labelPlaceholder: "Label",
    urlPlaceholder: "/page",
    footerBrand: "🏢 Brand Info",
    brandName: "Brand Name",
    brandDesc: "Brand Description",
    footerAnnouncement: "📢 Announcement",
    announcementBadge: "Announcement Badge",
    announcementText: "Announcement Text",
    footerContact: "📞 Contact Labels",
    supportLabel: "Support Label",
    emailLabel: "Email Label",
    emailAddress: "Email Address",
    footerSections: "📑 Footer Sections",
    addSection: "Add Section",
    sectionTitle: "Section Title",
    linkLabel: "Link Label",
    linkUrl: "URL",
    isScroll: "Scroll?",
    targetId: "Target ID",
    footerBrand: "🏢 Brand Info",
    brandName: "Brand Name",
    brandDesc: "Brand Description",
    footerAnnouncement: "📢 Announcement",
    announcementBadge: "Announcement Badge",
    announcementText: "Announcement Text",
    footerContact: "📞 Contact Labels",
    supportLabel: "Support Label",
    emailLabel: "Email Label",
    emailAddress: "Email Address",
    footerSections: "📑 Footer Sections",
    addSection: "Add Section",
    sectionTitle: "Section Title",
    linkLabel: "Link Label",
    linkUrl: "URL",
    isScroll: "Scroll?",
    targetId: "Target ID",
    footerBrand: "🏢 Brand Info",
    brandName: "Brand Name",
    brandDesc: "Brand Description",
    footerAnnouncement: "📢 Announcement",
    announcementBadge: "Announcement Badge",
    announcementText: "Announcement Text",
    footerContact: "📞 Contact Labels",
    supportLabel: "Support Label",
    emailLabel: "Email Label",
    emailAddress: "Email Address",
    footerSections: "📑 Footer Sections",
    addSection: "Add Section",
    sectionTitle: "Section Title",
    linkLabel: "Link Label",
    linkUrl: "URL",
    isScroll: "Scroll?",
    targetId: "Target ID",
    
    // About Us Tab
    aboutUs: "📝 About Us",
    aboutUsHero: "🦸 Hero Section",
    aboutUsStats: "📊 Stats",
    aboutUsMission: "🎯 Mission",
    aboutUsValues: "💎 Values",
    aboutUsTeam: "👥 Team",
    aboutUsTimeline: "📅 Timeline",
    aboutUsCTA: "📢 CTA",
    english: "English",
    bengali: "Bengali",
    addStat: "Add Stat",
    addValue: "Add Value",
    addTeamMember: "Add Team Member",
    addTimelineItem: "Add Timeline Item",
    iconName: "Icon",
    valueText: "Value",
    paragraph: "Paragraph",
    memberName: "Name",
    memberRole: "Role",
    memberBio: "Bio",
    year: "Year",
    title: "Title",
    description: "Description",
    buttonText: "Button Text",
    
    // FAQ Page Tab
    faqPage: "❓ FAQ Page",
    faqPageHero: "🦸 Hero Section",
    faqPageCategories: "📂 Categories",
    faqPageCTA: "📢 CTA",
    faqPageTags: "🏷️ Tags",
    
    // Contact Page Tab
    contactPage: "📞 Contact Page",
    contactPageHero: "🦸 Hero Section",
    contactPageCards: "📇 Contact Cards",
    contactPageHours: "🕐 Support Hours",
    contactPageForm: "📝 Contact Form",
    contactPageLinks: "🔗 Links",
    linkUrl: "Link URL",
    
    savedSuccessfully: "✅ Saved! Changes will apply to all pages.",
    resetConfirm: "Reset all settings? This will remove all customizations.",
    reloading: "🔄 Reloading...",
    failedToLoad: "Failed to load CMS",
    saveFailed: "Save failed",
    dataNotLoaded: "Data not loaded. Please refresh the page.",
    
    // Common
    delete: "Delete",
  },
  bn: {
    // Page Title
    contentManagement: "📝 কন্টেন্ট ম্যানেজমেন্ট সিস্টেম",
    changesApplyInstantly: "পরিবর্তনগুলো সংরক্ষণ করলে সব পেজে তাৎক্ষণিক apply হয়",
    
    // Buttons
    reset: "রিসেট",
    save: "সংরক্ষণ",
    saving: "সংরক্ষণ হচ্ছে...",
    addFeature: "Feature যোগ করুন",
    addFAQ: "নতুন FAQ",
    addLink: "Link যোগ করুন",
    
    // Tabs
    siteSettings: "⚙️ সাইট সেটিংস",
    homepage: "🏠 হোমপেজ",
    navigation: "🧭 নেভিগেশন",
    plans: "💎 প্ল্যান",
    faq: "❓ FAQ",
    announcements: "📢 ঘোষণা",
    footer: "🔗 Footer",
    
    // Site Tab
    basicInfo: "🏢 মূল তথ্য",
    platformName: "প্ল্যাটফর্মের নাম",
    tagline: "ট্যাগলাইন",
    siteUrl: "সাইট URL",
    supportEmail: "সাপোর্ট ইমেইল",
    supportPhone: "সাপোর্ট ফোন",
    localization: "🌐 লোকালাইজেশন",
    language: "ভাষা",
    currency: "মুদ্রা",
    timezone: "Timezone",
    
    // Homepage Tab
    heroSection: "🦸 Hero Section",
    heroTitle: "মূল শিরোনাম",
    heroSubtitle: "উপশিরোনাম",
    ctaButtonText: "CTA Button Text",
    heroStatistics: "📊 Hero Statistics",
    stat: "Stat",
    icon: "Icon",
    label: "Label",
    value: "Value",
    
    // Navigation Tab
    navigationMenuItems: "🧭 Navigation Menu Items",
    menuLabel: "Menu Label",
    
    // Plans Tab
    planName: "Plan নাম",
    minAmount: "Min (৳)",
    maxAmount: "Max (৳, blank=unlimited)",
    monthlyFee: "মাসিক ফি (৳)",
    yearlyFee: "বার্ষিক ফি (৳)",
    color: "Color",
    features: "Features",
    newFeature: "New feature",
    
    // Comparison Table Tab
    comparisonTable: "📊 তুলনা টেবিল",
    comparisonGroups: "ফিচার তুলনা গ্রুপ",
    groupLabel: "গ্রুপ লেবেল",
    groupIcon: "আইকন (Wallet, CreditCard, Users, Bot, Trophy, ShieldCheck, Moon)",
    addRow: "রো যোগ করুন",
    addGroup: "গ্রুপ যোগ করুন",
    deleteGroup: "গ্রুপ মুছুন",
    featureName: "ফিচার নাম",
    bronzeValue: "ব্রোঞ্জ",
    silverValue: "সিলভার",
    goldValue: "গোল্ড",
    platinumValue: "প্লাটিনাম",
    deleteRow: "রো মুছুন",
    
    // FAQ Tab
    faqItems: "❓ FAQ Items",
    newFAQ: "নতুন FAQ",
    question: "প্রশ্ন",
    answer: "উত্তর",
    
    // Announcements Tab
    sitewideAnnouncement: "📢 সাইটওয়াইড ঘোষণা",
    announcementActive: "ঘোষণা সক্রিয়?",
    yesShow: "হ্যাঁ — দেখাও",
    noHide: "না — লুকাও",
    announcementContent: "ঘোষণার বিষয়বস্তু",
    announcementPlaceholder: "আপনার ঘোষণা এখানে লিখুন...",
    linkOptional: "Link (optional)",
    startDate: "শুরুর তারিখ",
    endDate: "শেষের তারিখ",
    
    // Footer Tab
    footerText: "📄 Footer Text",
    copyrightText: "Copyright Text",
    footerSocials: "Social Links",
    footerLinks: "🔗 Footer Links",
    labelPlaceholder: "Label",
    urlPlaceholder: "/page",
    
    // About Us Tab
    aboutUs: "📝 আমাদের সম্পর্কে",
    aboutUsHero: "🦸 Hero Section",
    aboutUsStats: "📊 পরিসংখ্যান",
    aboutUsMission: "🎯 লক্ষ্য",
    aboutUsValues: "💎 মূল্যবোধ",
    aboutUsTeam: "👥 দল",
    aboutUsTimeline: "📅 টাইমলাইন",
    aboutUsCTA: "📢 CTA",
    english: "English",
    bengali: "বাংলা",
    addStat: "Stat যোগ করুন",
    addValue: "Value যোগ করুন",
    addTeamMember: "দলের সদস্য যোগ করুন",
    addTimelineItem: "টাইমলাইন আইটেম যোগ করুন",
    iconName: "আইকন",
    valueText: "মান",
    paragraph: "প্যারাগ্রাফ",
    memberName: "নাম",
    memberRole: "ভূমিকা",
    memberBio: "জীবনী",
    year: "বছর",
    title: "শিরোনাম",
    description: "বিবরণ",
    buttonText: "বাটন টেক্সট",
    
    // FAQ Page Tab
    faqPage: "❓ FAQ পেজ",
    faqPageHero: "🦸 Hero Section",
    faqPageCategories: "📂 ক্যাটেগরি",
    faqPageCTA: "📢 CTA",
    faqPageTags: "🏷️ ট্যাগ",
    
    // Contact Page Tab
    contactPage: "📞 যোগাযোগ পেজ",
    contactPageHero: "🦸 Hero Section",
    contactPageCards: "📇 যোগাযোগ কার্ড",
    contactPageHours: "🕐 সাপোর্ট সময়",
    contactPageForm: "📝 যোগাযোগ ফর্ম",
    contactPageLinks: "🔗 লিংক",
    linkUrl: "লিংক URL",
    
    savedSuccessfully: "✅ সংরক্ষণ হয়েছে! পরিবর্তন সব পেজে apply হবে।",
    resetConfirm: "সব সেটিংস রিসেট করতে চান? এটি পূর্বের সব কাস্টমাইজেশন মুছে দেবে।",
    reloading: "🔄 Reloading...",
    failedToLoad: "CMS লোড করতে ব্যর্থ হয়েছে",
    saveFailed: "সংরক্ষণ করতে ব্যর্থ হয়েছে",
    dataNotLoaded: "Data load হয়নি। পেজ refresh করুন।",
    
    // Common
    delete: "মুছুন",
  }
};

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const CmsPage = () => {
  const [activeTab, setActiveTab] = useState("site");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [cmsData, setCmsData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lang] = useState(() => {
    if (typeof window === "undefined") return "bn";
    return localStorage.getItem("admin_lang") || "bn";
  });

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  useEffect(() => {
    let isMounted = true;

    const fetchCms = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/admin/cms", { headers: getAuthHeaders() });
        if (isMounted && res.data.success) {
          setCmsData(res.data.data);
        }
      } catch (err) {
        if (isMounted) {
          setToast({
            show: true,
            message: err.response?.data?.message || translations[lang]?.failedToLoad || translations.en.failedToLoad,
          });
          setTimeout(() => {
            if (isMounted) setToast({ show: false, message: "" });
          }, 3000);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(fetchCms, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [lang]);

  const updateField = (section, key, value) => {
    setCmsData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  const updateArrayItem = (section, index, key, value) => {
    setCmsData((prev) => {
      const arr = [...(prev[section] || [])];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [section]: arr };
    });
  };

  const updatePlanFeature = (planIdx, fIdx, value) => {
    setCmsData((prev) => {
      const plans = [...(prev.plans || [])];
      const features = [...(plans[planIdx].features || [])];
      features[fIdx] = value;
      plans[planIdx] = { ...plans[planIdx], features };
      return { ...prev, plans };
    });
  };

  const saveAll = async () => {
    setSaving(true);
    try {
      const res = await axiosInstance.put("/admin/cms", cmsData, {
        headers: getAuthHeaders(),
      });
      if (res.data.success) {
        showToast(t('savedSuccessfully'));
      }
    } catch (err) {
      showToast(err.response?.data?.message || t('saveFailed'));
    } finally {
      setSaving(false);
    }
  };

  const resetAll = () => {
    if (confirm(t('resetConfirm'))) {
      showToast(t('reloading'));
      setTimeout(() => window.location.reload(), 1200);
    }
  };

  const tabs = [
    { id: "site",          label: t('siteSettings'),  icon: <Globe size={16} /> },
    { id: "homepage",      label: t('homepage'),         icon: <Home size={16} /> },
    { id: "nav",           label: t('navigation'),       icon: <Navigation size={16} /> },
    { id: "plans",         label: t('plans'),         icon: <CreditCard size={16} /> },
    { id: "comparison",    label: t('comparisonTable'),  icon: <CreditCard size={16} /> },
    { id: "faq",           label: t('faq'),              icon: <HelpCircle size={16} /> },
    { id: "announcements", label: t('announcements'),           icon: <Megaphone size={16} /> },
    { id: "footer",        label: t('footer'),           icon: <LinkIcon size={16} /> },
    { id: "aboutUs",       label: t('aboutUs'),        icon: <Info size={16} /> },
    { id: "faqPage",       label: t('faqPage'),        icon: <HelpCircle size={16} /> },
    { id: "contactPage",   label: t('contactPage'),    icon: <Phone size={16} /> },
  ];

  const renderSiteTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">{t('basicInfo')}</h3>
        <div className="space-y-3">
          {[
            { key: "name",         label: t('platformName') },
            { key: "tagline",      label: t('tagline') },
            { key: "url",          label: t('siteUrl') },
            { key: "supportEmail", label: t('supportEmail') },
            { key: "supportPhone", label: t('supportPhone') },
          ].map((f) => (
            <div key={f.key}>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">{f.label}</label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={cmsData?.site?.[f.key] || ""}
                onChange={(e) => updateField("site", f.key, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">{t('localization')}</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('language')}</label>
            <select
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.site?.language || "bn"}
              onChange={(e) => updateField("site", "language", e.target.value)}
            >
              <option value="bn">বাংলা (bn)</option>
              <option value="en">English (en)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('currency')}</label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.site?.currency || "BDT"}
              onChange={(e) => updateField("site", "currency", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('timezone')}</label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.site?.timezone || "Asia/Dhaka"}
              onChange={(e) => updateField("site", "timezone", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderHomepageTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">{t('heroSection')}</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('heroTitle')}</label>
            <textarea
              rows={3}
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
              value={cmsData?.homepage?.heroTitle || ""}
              onChange={(e) => updateField("homepage", "heroTitle", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('heroSubtitle')}</label>
            <textarea
              rows={3}
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
              value={cmsData?.homepage?.heroSubtitle || ""}
              onChange={(e) => updateField("homepage", "heroSubtitle", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('ctaButtonText')}</label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.homepage?.ctaText || ""}
              onChange={(e) => updateField("homepage", "ctaText", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">{t('heroStatistics')}</h3>
        <div className="space-y-4">
          {(cmsData?.homepage?.stats || []).map((stat, i) => (
            <div key={i} className="border border-border rounded-lg p-3">
              <div className="text-xs font-semibold text-foreground/50 mb-2">{t('stat')} #{i + 1}</div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-foreground/50 mb-1">{t('icon')}</label>
                  <input
                    className="w-full p-1.5 rounded border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                    value={stat.icon || ""}
                    onChange={(e) => updateArrayItem("homepage.stats", i, "icon", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-foreground/50 mb-1">{t('label')}</label>
                  <input
                    className="w-full p-1.5 rounded border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                    value={stat.label || ""}
                    onChange={(e) => {
                      setCmsData((prev) => {
                        const stats = [...(prev.homepage?.stats || [])];
                        stats[i] = { ...stats[i], label: e.target.value };
                        return { ...prev, homepage: { ...prev.homepage, stats } };
                      });
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs text-foreground/50 mb-1">{t('value')}</label>
                  <input
                    className="w-full p-1.5 rounded border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                    value={stat.value || ""}
                    onChange={(e) => {
                      setCmsData((prev) => {
                        const stats = [...(prev.homepage?.stats || [])];
                        stats[i] = { ...stats[i], value: e.target.value };
                        return { ...prev, homepage: { ...prev.homepage, stats } };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderNavTab = () => (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-bold text-foreground mb-4">{t('navigationMenuItems')}</h3>
      <div className="space-y-3">
        {(cmsData?.navigation || []).map((item, i) => (
          <div key={i} className="flex gap-3 items-center">
            <span className="text-xs text-foreground/40 w-6 shrink-0">{i + 1}</span>
            <input
              className="w-16 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm text-center"
              value={item.icon || ""}
              onChange={(e) => updateArrayItem("navigation", i, "icon", e.target.value)}
              placeholder="🏠"
            />
            <input
              className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={item.label || ""}
              onChange={(e) => updateArrayItem("navigation", i, "label", e.target.value)}
              placeholder={t('menuLabel')}
            />
            <input
              className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={item.url || ""}
              onChange={(e) => updateArrayItem("navigation", i, "url", e.target.value)}
              placeholder={t('urlPlaceholder')}
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlansTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      {(cmsData?.plans || []).map((plan, idx) => (
        <div key={idx} className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center gap-2 mb-4">
            <div
              className="w-3 h-3 rounded-full"
              style={{ background: plan.color || "#6b7280" }}
            />
            <h3 className="font-bold text-foreground capitalize">{plan.name || `Plan ${idx + 1}`}</h3>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('planName')}</label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={plan.name || ""}
                onChange={(e) => updateArrayItem("plans", idx, "name", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('minAmount')}</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                  value={plan.min || ""}
                  onChange={(e) => updateArrayItem("plans", idx, "min", Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('maxAmount')}</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                  value={plan.max ?? ""}
                  onChange={(e) =>
                    updateArrayItem("plans", idx, "max", e.target.value === "" ? null : Number(e.target.value))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('monthlyFee')}</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                  value={plan.monthlyFee ?? ""}
                  onChange={(e) => updateArrayItem("plans", idx, "monthlyFee", e.target.value === "" ? 0 : Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('yearlyFee')}</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                  value={plan.yearlyFee ?? ""}
                  onChange={(e) => updateArrayItem("plans", idx, "yearlyFee", e.target.value === "" ? 0 : Number(e.target.value))}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('color')}</label>
              <div className="flex gap-2 items-center">
                <input
                  type="color"
                  className="w-10 h-9 rounded border border-border cursor-pointer"
                  value={plan.color || "#6b7280"}
                  onChange={(e) => updateArrayItem("plans", idx, "color", e.target.value)}
                />
                <input
                  className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                  value={plan.color || ""}
                  onChange={(e) => updateArrayItem("plans", idx, "color", e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-2">{t('features')}</label>
              <div className="space-y-2">
                {(plan.features || []).map((feat, fIdx) => (
                  <div key={fIdx} className="flex gap-2 items-center">
                    <input
                      className="flex-1 p-1.5 rounded border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                      value={feat}
                      onChange={(e) => updatePlanFeature(idx, fIdx, e.target.value)}
                    />
                    <button
                      onClick={() => {
                        setCmsData((prev) => {
                          const plans = [...(prev.plans || [])];
                          const features = plans[idx].features.filter((_, fi) => fi !== fIdx);
                          plans[idx] = { ...plans[idx], features };
                          return { ...prev, plans };
                        });
                      }}
                      className="text-red-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setCmsData((prev) => {
                      const plans = [...(prev.plans || [])];
                      const features = [...(plans[idx].features || []), t('newFeature')];
                      plans[idx] = { ...plans[idx], features };
                      return { ...prev, plans };
                    });
                  }}
                  className="text-xs text-primary flex items-center gap-1 mt-1 hover:underline"
                >
                  <Plus size={12} /> {t('addFeature')}
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderComparisonTab = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground">{t('comparisonGroups')}</h3>
        <button
          onClick={() =>
            setCmsData((prev) => ({
              ...prev,
              comparisonGroups: [
                ...(prev.comparisonGroups || []),
                { label: "New Group", icon: "Wallet", rows: [["Feature", "", "", "", ""]] },
              ],
            }))
          }
          className="text-xs text-primary flex items-center gap-1 hover:underline"
        >
          <Plus size={12} /> {t('addGroup')}
        </button>
      </div>

      {(cmsData?.comparisonGroups || []).map((group, gIdx) => (
        <div key={gIdx} className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2 flex-1">
              <div className="text-xs font-semibold text-foreground/50">#{gIdx + 1}</div>
              <input
                className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm font-bold"
                value={group.label || ""}
                onChange={(e) => updateArrayItem("comparisonGroups", gIdx, "label", e.target.value)}
                placeholder={t('groupLabel')}
              />
              <input
                className="w-32 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={group.icon || ""}
                onChange={(e) => updateArrayItem("comparisonGroups", gIdx, "icon", e.target.value)}
                placeholder={t('groupIcon')}
              />
            </div>
            <button
              onClick={() =>
                setCmsData((prev) => ({
                  ...prev,
                  comparisonGroups: (prev.comparisonGroups || []).filter((_, i) => i !== gIdx),
                }))
              }
              className="text-red-400 hover:text-red-500 p-1 ml-2"
            >
              <Trash2 size={14} />
            </button>
          </div>

          <div className="space-y-2">
            <div className="grid grid-cols-6 gap-2 text-xs font-semibold text-foreground/50 px-1">
              <span>{t('featureName')}</span>
              <span>{t('bronzeValue')}</span>
              <span>{t('silverValue')}</span>
              <span>{t('goldValue')}</span>
              <span>{t('platinumValue')}</span>
              <span></span>
            </div>
            {(group.rows || []).map((row, rIdx) => (
              <div key={rIdx} className="grid grid-cols-6 gap-2 items-center">
                {Array.isArray(row) && row.map((cell, cIdx) => (
                  <input
                    key={cIdx}
                    className="p-1.5 rounded border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                    value={String(cell ?? "")}
                    onChange={(e) => {
                      setCmsData((prev) => {
                        const groups = [...(prev.comparisonGroups || [])];
                        const rows = [...(groups[gIdx].rows || [])];
                        const newRow = [...(rows[rIdx] || [])];
                        newRow[cIdx] = e.target.value;
                        rows[rIdx] = newRow;
                        groups[gIdx] = { ...groups[gIdx], rows };
                        return { ...prev, comparisonGroups: groups };
                      });
                    }}
                    placeholder={cIdx === 0 ? t('featureName') : ""}
                  />
                ))}
                <button
                  onClick={() => {
                    setCmsData((prev) => {
                      const groups = [...(prev.comparisonGroups || [])];
                      const rows = (groups[gIdx].rows || []).filter((_, i) => i !== rIdx);
                      groups[gIdx] = { ...groups[gIdx], rows };
                      return { ...prev, comparisonGroups: groups };
                    });
                  }}
                  className="text-red-400 hover:text-red-500 p-1"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
            <button
              onClick={() => {
                setCmsData((prev) => {
                  const groups = [...(prev.comparisonGroups || [])];
                  const rows = [...(groups[gIdx].rows || []), ["", "", "", "", ""]];
                  groups[gIdx] = { ...groups[gIdx], rows };
                  return { ...prev, comparisonGroups: groups };
                });
              }}
              className="text-xs text-primary flex items-center gap-1 mt-1 hover:underline"
            >
              <Plus size={12} /> {t('addRow')}
            </button>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFaqTab = () => (
    <div className="space-y-5">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-bold text-foreground">{t('faqItems')}</h3>
        <button
          onClick={() =>
            setCmsData((prev) => ({
              ...prev,
              faq: [...(prev.faq || []), { question: { en: "", bn: "" }, answer: { en: "", bn: "" } }],
            }))
          }
          className="text-xs text-primary flex items-center gap-1 hover:underline"
        >
          <Plus size={12} /> {t('addFAQ')}
        </button>
      </div>
      <div className="space-y-4">
        {(cmsData?.faq || []).map((item, i) => (
          <div key={i} className="border border-border rounded-xl p-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-xs font-semibold text-foreground/50">FAQ #{i + 1}</span>
              <button
                onClick={() =>
                  setCmsData((prev) => ({
                    ...prev,
                    faq: prev.faq.filter((_, fi) => fi !== i),
                  }))
                }
                className="text-red-400 hover:text-red-500"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <div className="space-y-3">
              {/* English */}
              <div className="border border-border/50 rounded-lg p-3 bg-background/50">
                <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-2">English</div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('question')}</label>
                    <input
                      className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                      value={item.question?.en || ""}
                      onChange={(e) => {
                        setCmsData((prev) => {
                          const faq = [...(prev.faq || [])];
                          faq[i] = {
                            ...faq[i],
                            question: { ...(faq[i].question || {}), en: e.target.value },
                          };
                          return { ...prev, faq };
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('answer')}</label>
                    <textarea
                      rows={2}
                      className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
                      value={item.answer?.en || ""}
                      onChange={(e) => {
                        setCmsData((prev) => {
                          const faq = [...(prev.faq || [])];
                          faq[i] = {
                            ...faq[i],
                            answer: { ...(faq[i].answer || {}), en: e.target.value },
                          };
                          return { ...prev, faq };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
              {/* Bengali */}
              <div className="border border-border/50 rounded-lg p-3 bg-background/50">
                <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-2">বাংলা</div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('question')}</label>
                    <input
                      className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                      value={item.question?.bn || ""}
                      onChange={(e) => {
                        setCmsData((prev) => {
                          const faq = [...(prev.faq || [])];
                          faq[i] = {
                            ...faq[i],
                            question: { ...(faq[i].question || {}), bn: e.target.value },
                          };
                          return { ...prev, faq };
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('answer')}</label>
                    <textarea
                      rows={2}
                      className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
                      value={item.answer?.bn || ""}
                      onChange={(e) => {
                        setCmsData((prev) => {
                          const faq = [...(prev.faq || [])];
                          faq[i] = {
                            ...faq[i],
                            answer: { ...(faq[i].answer || {}), bn: e.target.value },
                          };
                          return { ...prev, faq };
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnnouncementTab = () => (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-bold text-foreground mb-4">{t('sitewideAnnouncement')}</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('announcementActive')}</label>
          <select
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
            value={cmsData?.announcements?.enabled ? "true" : "false"}
            onChange={(e) => updateField("announcements", "enabled", e.target.value === "true")}
          >
            <option value="true">{t('yesShow')}</option>
            <option value="false">{t('noHide')}</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('announcementContent')}</label>
          <input
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
            value={cmsData?.announcements?.text || ""}
            onChange={(e) => updateField("announcements", "text", e.target.value)}
            placeholder={t('announcementPlaceholder')}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('linkOptional')}</label>
          <input
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
            value={cmsData?.announcements?.link || ""}
            onChange={(e) => updateField("announcements", "link", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('startDate')}</label>
            <input
              type="date"
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={
                cmsData?.announcements?.startDate
                  ? new Date(cmsData.announcements.startDate).toISOString().slice(0, 10)
                  : ""
              }
              onChange={(e) => updateField("announcements", "startDate", e.target.value || null)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('endDate')}</label>
            <input
              type="date"
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={
                cmsData?.announcements?.endDate
                  ? new Date(cmsData.announcements.endDate).toISOString().slice(0, 10)
                  : ""
              }
              onChange={(e) => updateField("announcements", "endDate", e.target.value || null)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderFooterTab = () => (
    <div className="space-y-5">
      {/* Brand Info */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">{t('footerBrand')}</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('brandName')}</label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.footer?.brandName || ""}
              onChange={(e) => updateField("footer", "brandName", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('brandDesc')}</label>
            <textarea
              rows={3}
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
              value={cmsData?.footer?.brandDesc || ""}
              onChange={(e) => updateField("footer", "brandDesc", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Announcement */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">{t('footerAnnouncement')}</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('announcementBadge')}</label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.footer?.announcementBadge || ""}
              onChange={(e) => updateField("footer", "announcementBadge", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('announcementText')}</label>
            <textarea
              rows={3}
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
              value={cmsData?.footer?.announcementText || ""}
              onChange={(e) => updateField("footer", "announcementText", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contact Labels */}
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">{t('footerContact')}</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('supportLabel')}</label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.footer?.supportLabel || ""}
              onChange={(e) => updateField("footer", "supportLabel", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('emailLabel')}</label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.footer?.emailLabel || ""}
              onChange={(e) => updateField("footer", "emailLabel", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('emailAddress')}</label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.footer?.emailAddress || ""}
              onChange={(e) => updateField("footer", "emailAddress", e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Footer Sections */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">{t('footerSections')}</h3>
          <button
            onClick={() =>
              setCmsData((prev) => ({
                ...prev,
                footer: {
                  ...prev.footer,
                  sections: [...(prev.footer?.sections || []), { title: "New Section", links: [{ label: "Link", url: "/" }] }],
                },
              }))
            }
            className="text-xs text-primary flex items-center gap-1 hover:underline"
          >
            <Plus size={12} /> {t('addSection')}
          </button>
        </div>
        <div className="space-y-4">
          {(cmsData?.footer?.sections || []).map((section, sIdx) => (
            <div key={sIdx} className="border border-border rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-xs font-semibold text-foreground/50">#{sIdx + 1}</span>
                  <input
                    className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm font-bold"
                    value={section.title || ""}
                    placeholder={t('sectionTitle')}
                    onChange={(e) => {
                      setCmsData((prev) => {
                        const sections = [...(prev.footer?.sections || [])];
                        sections[sIdx] = { ...sections[sIdx], title: e.target.value };
                        return { ...prev, footer: { ...prev.footer, sections } };
                      });
                    }}
                  />
                </div>
                <button
                  onClick={() =>
                    setCmsData((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        sections: (prev.footer?.sections || []).filter((_, i) => i !== sIdx),
                      },
                    }))
                  }
                  className="text-red-400 hover:text-red-500 p-1 ml-2"
                >
                  <Trash2 size={14} />
                </button>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-12 gap-2 text-xs font-semibold text-foreground/50 px-1">
                  <span className="col-span-4">{t('linkLabel')}</span>
                  <span className="col-span-4">{t('linkUrl')}</span>
                  <span className="col-span-2">{t('isScroll')}</span>
                  <span className="col-span-1">{t('targetId')}</span>
                  <span className="col-span-1"></span>
                </div>
                {(section.links || []).map((link, lIdx) => (
                  <div key={lIdx} className="grid grid-cols-12 gap-2 items-center">
                    <input
                      className="col-span-4 p-1.5 rounded border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                      value={link.label || ""}
                      placeholder={t('linkLabel')}
                      onChange={(e) => {
                        setCmsData((prev) => {
                          const sections = [...(prev.footer?.sections || [])];
                          const links = [...(sections[sIdx].links || [])];
                          links[lIdx] = { ...links[lIdx], label: e.target.value };
                          sections[sIdx] = { ...sections[sIdx], links };
                          return { ...prev, footer: { ...prev.footer, sections } };
                        });
                      }}
                    />
                    <input
                      className="col-span-4 p-1.5 rounded border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                      value={link.url || ""}
                      placeholder={t('urlPlaceholder')}
                      onChange={(e) => {
                        setCmsData((prev) => {
                          const sections = [...(prev.footer?.sections || [])];
                          const links = [...(sections[sIdx].links || [])];
                          links[lIdx] = { ...links[lIdx], url: e.target.value };
                          sections[sIdx] = { ...sections[sIdx], links };
                          return { ...prev, footer: { ...prev.footer, sections } };
                        });
                      }}
                    />
                    <select
                      className="col-span-2 p-1.5 rounded border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                      value={link.isScroll ? "true" : "false"}
                      onChange={(e) => {
                        setCmsData((prev) => {
                          const sections = [...(prev.footer?.sections || [])];
                          const links = [...(sections[sIdx].links || [])];
                          links[lIdx] = { ...links[lIdx], isScroll: e.target.value === "true" };
                          sections[sIdx] = { ...sections[sIdx], links };
                          return { ...prev, footer: { ...prev.footer, sections } };
                        });
                      }}
                    >
                      <option value="false">No</option>
                      <option value="true">Yes</option>
                    </select>
                    <input
                      className="col-span-1 p-1.5 rounded border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                      value={link.targetId || ""}
                      placeholder="ID"
                      onChange={(e) => {
                        setCmsData((prev) => {
                          const sections = [...(prev.footer?.sections || [])];
                          const links = [...(sections[sIdx].links || [])];
                          links[lIdx] = { ...links[lIdx], targetId: e.target.value };
                          sections[sIdx] = { ...sections[sIdx], links };
                          return { ...prev, footer: { ...prev.footer, sections } };
                        });
                      }}
                    />
                    <button
                      onClick={() => {
                        setCmsData((prev) => {
                          const sections = [...(prev.footer?.sections || [])];
                          const links = (sections[sIdx].links || []).filter((_, i) => i !== lIdx);
                          sections[sIdx] = { ...sections[sIdx], links };
                          return { ...prev, footer: { ...prev.footer, sections } };
                        });
                      }}
                      className="col-span-1 text-red-400 hover:text-red-500 p-1"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setCmsData((prev) => {
                      const sections = [...(prev.footer?.sections || [])];
                      const links = [...(sections[sIdx].links || []), { label: "", url: "/" }];
                      sections[sIdx] = { ...sections[sIdx], links };
                      return { ...prev, footer: { ...prev.footer, sections } };
                    });
                  }}
                  className="text-xs text-primary flex items-center gap-1 mt-1 hover:underline"
                >
                  <Plus size={12} /> {t('addLink')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('footerText')}</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">{t('copyrightText')}</label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={cmsData?.footer?.copyright || ""}
                onChange={(e) => updateField("footer", "copyright", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-2">{t('footerSocials')}</label>
              <div className="space-y-2">
                {["facebook", "twitter", "instagram", "linkedin"].map((platform) => (
                  <input
                    key={platform}
                    className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                    value={cmsData?.footer?.socials?.[platform] || ""}
                    placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                    onChange={(e) =>
                      setCmsData((prev) => ({
                        ...prev,
                        footer: {
                          ...prev.footer,
                          socials: {
                            ...(prev.footer?.socials || {}),
                            [platform]: e.target.value,
                          },
                        },
                      }))
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">{t('footerLinks')}</h3>
            <button
              onClick={() =>
                setCmsData((prev) => ({
                  ...prev,
                  footer: {
                    ...prev.footer,
                    links: [...(prev.footer?.links || []), { label: "", url: "" }],
                  },
                }))
              }
              className="text-xs text-primary flex items-center gap-1 hover:underline"
            >
              <Plus size={12} /> {t('addLink')}
            </button>
          </div>
          <div className="space-y-2">
            {(cmsData?.footer?.links || []).map((link, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                  value={link.label || ""}
                  placeholder={t('labelPlaceholder')}
                  onChange={(e) => {
                    setCmsData((prev) => {
                      const links = [...(prev.footer?.links || [])];
                      links[i] = { ...links[i], label: e.target.value };
                      return { ...prev, footer: { ...prev.footer, links } };
                    });
                  }}
                />
                <input
                  className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                  value={link.url || ""}
                  placeholder={t('urlPlaceholder')}
                  onChange={(e) => {
                    setCmsData((prev) => {
                      const links = [...(prev.footer?.links || [])];
                      links[i] = { ...links[i], url: e.target.value };
                      return { ...prev, footer: { ...prev.footer, links } };
                    });
                  }}
                />
                <button
                  onClick={() =>
                    setCmsData((prev) => ({
                      ...prev,
                      footer: {
                        ...prev.footer,
                        links: prev.footer.links.filter((_, li) => li !== i),
                      },
                    }))
                  }
                  className="text-red-400 hover:text-red-500 p-1"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAboutUsTab = () => {
    const about = cmsData?.aboutUs || {};

    const updateAboutField = (key, value) => {
      setCmsData((prev) => ({
        ...prev,
        aboutUs: { ...(prev.aboutUs || {}), [key]: value },
      }));
    };

    const updateAboutBilingualField = (key, lang, value) => {
      setCmsData((prev) => ({
        ...prev,
        aboutUs: {
          ...(prev.aboutUs || {}),
          [key]: { ...(prev.aboutUs?.[key] || {}), [lang]: value },
        },
      }));
    };

    const updateAboutArrayItem = (arrKey, index, key, value) => {
      setCmsData((prev) => {
        const arr = [...(prev.aboutUs?.[arrKey] || [])];
        arr[index] = { ...arr[index], [key]: value };
        return { ...prev, aboutUs: { ...(prev.aboutUs || {}), [arrKey]: arr } };
      });
    };

    const updateAboutArrayBilingualItem = (arrKey, index, key, lang, value) => {
      setCmsData((prev) => {
        const arr = [...(prev.aboutUs?.[arrKey] || [])];
        arr[index] = {
          ...arr[index],
          [key]: { ...(arr[index]?.[key] || {}), [lang]: value },
        };
        return { ...prev, aboutUs: { ...(prev.aboutUs || {}), [arrKey]: arr } };
      });
    };

    const BilingualInput = ({ label, value, onChangeEn, onChangeBn, rows = 1 }) => (
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-foreground/60 mb-1">{label}</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-border/50 rounded-lg p-2 bg-background/50">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-1">{t('english')}</div>
            {rows > 1 ? (
              <textarea
                rows={rows}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
                value={value?.en || ""}
                onChange={onChangeEn}
              />
            ) : (
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={value?.en || ""}
                onChange={onChangeEn}
              />
            )}
          </div>
          <div className="border border-border/50 rounded-lg p-2 bg-background/50">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-1">{t('bengali')}</div>
            {rows > 1 ? (
              <textarea
                rows={rows}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
                value={value?.bn || ""}
                onChange={onChangeBn}
              />
            ) : (
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={value?.bn || ""}
                onChange={onChangeBn}
              />
            )}
          </div>
        </div>
      </div>
    );

    return (
      <div className="space-y-5">
        {/* Hero Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('aboutUsHero')}</h3>
          <div className="space-y-3">
            <BilingualInput
              label={t('heroTitle')}
              value={about.heroBadge}
              onChangeEn={(e) => updateAboutBilingualField("heroBadge", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("heroBadge", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('heroTitle')}
              value={about.heroTitle}
              onChangeEn={(e) => updateAboutBilingualField("heroTitle", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("heroTitle", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('heroSubtitle')}
              value={about.heroDesc}
              onChangeEn={(e) => updateAboutBilingualField("heroDesc", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("heroDesc", "bn", e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">{t('aboutUsStats')}</h3>
            <button
              onClick={() =>
                setCmsData((prev) => ({
                  ...prev,
                  aboutUs: {
                    ...(prev.aboutUs || {}),
                    stats: [...(prev.aboutUs?.stats || []), { label: { en: "", bn: "" }, value: "", icon: "" }],
                  },
                }))
              }
              className="text-xs text-primary flex items-center gap-1 hover:underline"
            >
              <Plus size={12} /> {t('addStat')}
            </button>
          </div>
          <div className="space-y-4">
            {(about.stats || []).map((stat, i) => (
              <div key={i} className="border border-border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-foreground/50">{t('stat')} #{i + 1}</span>
                  <button
                    onClick={() =>
                      setCmsData((prev) => ({
                        ...prev,
                        aboutUs: {
                          ...(prev.aboutUs || {}),
                          stats: (prev.aboutUs?.stats || []).filter((_, si) => si !== i),
                        },
                      }))
                    }
                    className="text-red-400 hover:text-red-500 p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="block text-xs text-foreground/50 mb-1">{t('iconName')}</label>
                    <input
                      className="w-full p-1.5 rounded border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                      value={stat.icon || ""}
                      onChange={(e) => updateAboutArrayItem("stats", i, "icon", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-foreground/50 mb-1">{t('valueText')}</label>
                    <input
                      className="w-full p-1.5 rounded border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                      value={stat.value || ""}
                      onChange={(e) => updateAboutArrayItem("stats", i, "value", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-foreground/50 mb-1">{t('label')}</label>
                    <input
                      className="w-full p-1.5 rounded border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                      value={stat.label?.en || ""}
                      onChange={(e) => updateAboutArrayBilingualItem("stats", i, "label", "en", e.target.value)}
                      placeholder="EN"
                    />
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    className="w-full p-1.5 rounded border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                    value={stat.label?.bn || ""}
                    onChange={(e) => updateAboutArrayBilingualItem("stats", i, "label", "bn", e.target.value)}
                    placeholder="BN"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('aboutUsMission')}</h3>
          <div className="space-y-3">
            <BilingualInput
              label={t('label')}
              value={about.missionLabel}
              onChangeEn={(e) => updateAboutBilingualField("missionLabel", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("missionLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('title')}
              value={about.missionTitle}
              onChangeEn={(e) => updateAboutBilingualField("missionTitle", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("missionTitle", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={`${t('paragraph')} 1`}
              value={about.missionP1}
              onChangeEn={(e) => updateAboutBilingualField("missionP1", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("missionP1", "bn", e.target.value)}
              rows={3}
            />
            <BilingualInput
              label={`${t('paragraph')} 2`}
              value={about.missionP2}
              onChangeEn={(e) => updateAboutBilingualField("missionP2", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("missionP2", "bn", e.target.value)}
              rows={3}
            />
            <BilingualInput
              label={`${t('paragraph')} 3`}
              value={about.missionP3}
              onChangeEn={(e) => updateAboutBilingualField("missionP3", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("missionP3", "bn", e.target.value)}
              rows={3}
            />
            <BilingualInput
              label={t('heroTitle')}
              value={about.missionBadge}
              onChangeEn={(e) => updateAboutBilingualField("missionBadge", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("missionBadge", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('heroSubtitle')}
              value={about.missionSub}
              onChangeEn={(e) => updateAboutBilingualField("missionSub", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("missionSub", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('announcementContent')}
              value={about.missionTransparent}
              onChangeEn={(e) => updateAboutBilingualField("missionTransparent", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("missionTransparent", "bn", e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">{t('aboutUsValues')}</h3>
            <button
              onClick={() =>
                setCmsData((prev) => ({
                  ...prev,
                  aboutUs: {
                    ...(prev.aboutUs || {}),
                    values: [...(prev.aboutUs?.values || []), { icon: "", title: { en: "", bn: "" }, desc: { en: "", bn: "" } }],
                  },
                }))
              }
              className="text-xs text-primary flex items-center gap-1 hover:underline"
            >
              <Plus size={12} /> {t('addValue')}
            </button>
          </div>
          <div className="space-y-3">
            <BilingualInput
              label={t('label')}
              value={about.valuesLabel}
              onChangeEn={(e) => updateAboutBilingualField("valuesLabel", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("valuesLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('title')}
              value={about.valuesTitle}
              onChangeEn={(e) => updateAboutBilingualField("valuesTitle", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("valuesTitle", "bn", e.target.value)}
              rows={2}
            />
            {(about.values || []).map((val, i) => (
              <div key={i} className="border border-border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-foreground/50">{t('valueText')} #{i + 1}</span>
                  <button
                    onClick={() =>
                      setCmsData((prev) => ({
                        ...prev,
                        aboutUs: {
                          ...(prev.aboutUs || {}),
                          values: (prev.aboutUs?.values || []).filter((_, vi) => vi !== i),
                        },
                      }))
                    }
                    className="text-red-400 hover:text-red-500 p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-foreground/50 mb-1">{t('iconName')}</label>
                    <input
                      className="w-full p-1.5 rounded border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                      value={val.icon || ""}
                      onChange={(e) => updateAboutArrayItem("values", i, "icon", e.target.value)}
                    />
                  </div>
                  <BilingualInput
                    label={t('title')}
                    value={val.title}
                    onChangeEn={(e) => updateAboutArrayBilingualItem("values", i, "title", "en", e.target.value)}
                    onChangeBn={(e) => updateAboutArrayBilingualItem("values", i, "title", "bn", e.target.value)}
                  />
                  <BilingualInput
                    label={t('description')}
                    value={val.desc}
                    onChangeEn={(e) => updateAboutArrayBilingualItem("values", i, "desc", "en", e.target.value)}
                    onChangeBn={(e) => updateAboutArrayBilingualItem("values", i, "desc", "bn", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">{t('aboutUsTeam')}</h3>
            <button
              onClick={() =>
                setCmsData((prev) => ({
                  ...prev,
                  aboutUs: {
                    ...(prev.aboutUs || {}),
                    team: [
                      ...(prev.aboutUs?.team || []),
                      { icon: "", name: { en: "", bn: "" }, role: { en: "", bn: "" }, bio: { en: "", bn: "" } },
                    ],
                  },
                }))
              }
              className="text-xs text-primary flex items-center gap-1 hover:underline"
            >
              <Plus size={12} /> {t('addTeamMember')}
            </button>
          </div>
          <div className="space-y-3">
            <BilingualInput
              label={t('label')}
              value={about.teamLabel}
              onChangeEn={(e) => updateAboutBilingualField("teamLabel", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("teamLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('title')}
              value={about.teamTitle}
              onChangeEn={(e) => updateAboutBilingualField("teamTitle", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("teamTitle", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('description')}
              value={about.teamDesc}
              onChangeEn={(e) => updateAboutBilingualField("teamDesc", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("teamDesc", "bn", e.target.value)}
              rows={3}
            />
            {(about.team || []).map((member, i) => (
              <div key={i} className="border border-border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-foreground/50">{t('memberName')} #{i + 1}</span>
                  <button
                    onClick={() =>
                      setCmsData((prev) => ({
                        ...prev,
                        aboutUs: {
                          ...(prev.aboutUs || {}),
                          team: (prev.aboutUs?.team || []).filter((_, ti) => ti !== i),
                        },
                      }))
                    }
                    className="text-red-400 hover:text-red-500 p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-foreground/50 mb-1">{t('iconName')}</label>
                    <input
                      className="w-full p-1.5 rounded border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                      value={member.icon || ""}
                      onChange={(e) => updateAboutArrayItem("team", i, "icon", e.target.value)}
                    />
                  </div>
                  <BilingualInput
                    label={t('memberName')}
                    value={member.name}
                    onChangeEn={(e) => updateAboutArrayBilingualItem("team", i, "name", "en", e.target.value)}
                    onChangeBn={(e) => updateAboutArrayBilingualItem("team", i, "name", "bn", e.target.value)}
                  />
                  <BilingualInput
                    label={t('memberRole')}
                    value={member.role}
                    onChangeEn={(e) => updateAboutArrayBilingualItem("team", i, "role", "en", e.target.value)}
                    onChangeBn={(e) => updateAboutArrayBilingualItem("team", i, "role", "bn", e.target.value)}
                  />
                  <BilingualInput
                    label={t('memberBio')}
                    value={member.bio}
                    onChangeEn={(e) => updateAboutArrayBilingualItem("team", i, "bio", "en", e.target.value)}
                    onChangeBn={(e) => updateAboutArrayBilingualItem("team", i, "bio", "bn", e.target.value)}
                    rows={3}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-foreground">{t('aboutUsTimeline')}</h3>
            <button
              onClick={() =>
                setCmsData((prev) => ({
                  ...prev,
                  aboutUs: {
                    ...(prev.aboutUs || {}),
                    timeline: [
                      ...(prev.aboutUs?.timeline || []),
                      { year: { en: "", bn: "" }, title: { en: "", bn: "" }, desc: { en: "", bn: "" } },
                    ],
                  },
                }))
              }
              className="text-xs text-primary flex items-center gap-1 hover:underline"
            >
              <Plus size={12} /> {t('addTimelineItem')}
            </button>
          </div>
          <div className="space-y-3">
            <BilingualInput
              label={t('label')}
              value={about.timelineLabel}
              onChangeEn={(e) => updateAboutBilingualField("timelineLabel", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("timelineLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('title')}
              value={about.timelineTitle}
              onChangeEn={(e) => updateAboutBilingualField("timelineTitle", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("timelineTitle", "bn", e.target.value)}
              rows={2}
            />
            {(about.timeline || []).map((item, i) => (
              <div key={i} className="border border-border rounded-lg p-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-semibold text-foreground/50">{t('title')} #{i + 1}</span>
                  <button
                    onClick={() =>
                      setCmsData((prev) => ({
                        ...prev,
                        aboutUs: {
                          ...(prev.aboutUs || {}),
                          timeline: (prev.aboutUs?.timeline || []).filter((_, ti) => ti !== i),
                        },
                      }))
                    }
                    className="text-red-400 hover:text-red-500 p-1"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
                <div className="space-y-2">
                  <BilingualInput
                    label={t('year')}
                    value={item.year}
                    onChangeEn={(e) => updateAboutArrayBilingualItem("timeline", i, "year", "en", e.target.value)}
                    onChangeBn={(e) => updateAboutArrayBilingualItem("timeline", i, "year", "bn", e.target.value)}
                  />
                  <BilingualInput
                    label={t('title')}
                    value={item.title}
                    onChangeEn={(e) => updateAboutArrayBilingualItem("timeline", i, "title", "en", e.target.value)}
                    onChangeBn={(e) => updateAboutArrayBilingualItem("timeline", i, "title", "bn", e.target.value)}
                  />
                  <BilingualInput
                    label={t('description')}
                    value={item.desc}
                    onChangeEn={(e) => updateAboutArrayBilingualItem("timeline", i, "desc", "en", e.target.value)}
                    onChangeBn={(e) => updateAboutArrayBilingualItem("timeline", i, "desc", "bn", e.target.value)}
                    rows={2}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('aboutUsCTA')}</h3>
          <div className="space-y-3">
            <BilingualInput
              label={t('title')}
              value={about.ctaTitle}
              onChangeEn={(e) => updateAboutBilingualField("ctaTitle", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("ctaTitle", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('description')}
              value={about.ctaDesc}
              onChangeEn={(e) => updateAboutBilingualField("ctaDesc", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("ctaDesc", "bn", e.target.value)}
              rows={3}
            />
            <BilingualInput
              label={t('buttonText')}
              value={about.ctaButton}
              onChangeEn={(e) => updateAboutBilingualField("ctaButton", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("ctaButton", "bn", e.target.value)}
            />
            <BilingualInput
              label={`${t('buttonText')} 2`}
              value={about.ctaButton2}
              onChangeEn={(e) => updateAboutBilingualField("ctaButton2", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("ctaButton2", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('footerText')}
              value={about.footer}
              onChangeEn={(e) => updateAboutBilingualField("footer", "en", e.target.value)}
              onChangeBn={(e) => updateAboutBilingualField("footer", "bn", e.target.value)}
              rows={2}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderFaqPageTab = () => {
    const faq = cmsData?.faqPage || {};

    const updateFaqPageField = (key, lang, value) => {
      setCmsData((prev) => ({
        ...prev,
        faqPage: {
          ...(prev.faqPage || {}),
          [key]: { ...(prev.faqPage?.[key] || {}), [lang]: value },
        },
      }));
    };

    const BilingualInput = ({ label, value, onChangeEn, onChangeBn, rows = 1 }) => (
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-foreground/60 mb-1">{label}</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-border/50 rounded-lg p-2 bg-background/50">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-1">{t('english')}</div>
            {rows > 1 ? (
              <textarea
                rows={rows}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
                value={value?.en || ""}
                onChange={onChangeEn}
              />
            ) : (
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={value?.en || ""}
                onChange={onChangeEn}
              />
            )}
          </div>
          <div className="border border-border/50 rounded-lg p-2 bg-background/50">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-1">{t('bengali')}</div>
            {rows > 1 ? (
              <textarea
                rows={rows}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
                value={value?.bn || ""}
                onChange={onChangeBn}
              />
            ) : (
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={value?.bn || ""}
                onChange={onChangeBn}
              />
            )}
          </div>
        </div>
      </div>
    );

    return (
      <div className="space-y-5">
        {/* Hero Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('faqPageHero')}</h3>
          <div className="space-y-3">
            <BilingualInput
              label={t('heroTitle')}
              value={faq.heroBadge}
              onChangeEn={(e) => updateFaqPageField("heroBadge", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("heroBadge", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('title')}
              value={faq.heroTitle}
              onChangeEn={(e) => updateFaqPageField("heroTitle", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("heroTitle", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('description')}
              value={faq.heroDesc}
              onChangeEn={(e) => updateFaqPageField("heroDesc", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("heroDesc", "bn", e.target.value)}
              rows={3}
            />
            <BilingualInput
              label={t('searchPlaceholder')}
              value={faq.searchPlaceholder}
              onChangeEn={(e) => updateFaqPageField("searchPlaceholder", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("searchPlaceholder", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('found')}
              value={faq.found}
              onChangeEn={(e) => updateFaqPageField("found", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("found", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('noQuestions')}
              value={faq.noQuestions}
              onChangeEn={(e) => updateFaqPageField("noQuestions", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("noQuestions", "bn", e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Categories Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('faqPageCategories')}</h3>
          <div className="space-y-3">
            <BilingualInput
              label={t('categoryAll')}
              value={faq.categoryAll}
              onChangeEn={(e) => updateFaqPageField("categoryAll", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("categoryAll", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('categoryAccount')}
              value={faq.categoryAccount}
              onChangeEn={(e) => updateFaqPageField("categoryAccount", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("categoryAccount", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('categorySavings')}
              value={faq.categorySavings}
              onChangeEn={(e) => updateFaqPageField("categorySavings", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("categorySavings", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('categoryPlans')}
              value={faq.categoryPlans}
              onChangeEn={(e) => updateFaqPageField("categoryPlans", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("categoryPlans", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('categoryCircles')}
              value={faq.categoryCircles}
              onChangeEn={(e) => updateFaqPageField("categoryCircles", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("categoryCircles", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('categoryIslamic')}
              value={faq.categoryIslamic}
              onChangeEn={(e) => updateFaqPageField("categoryIslamic", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("categoryIslamic", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('categorySecurity')}
              value={faq.categorySecurity}
              onChangeEn={(e) => updateFaqPageField("categorySecurity", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("categorySecurity", "bn", e.target.value)}
            />
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('faqPageCTA')}</h3>
          <div className="space-y-3">
            <BilingualInput
              label={t('title')}
              value={faq.ctaTitle}
              onChangeEn={(e) => updateFaqPageField("ctaTitle", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("ctaTitle", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('description')}
              value={faq.ctaDesc}
              onChangeEn={(e) => updateFaqPageField("ctaDesc", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("ctaDesc", "bn", e.target.value)}
              rows={3}
            />
            <BilingualInput
              label={t('ctaWhatsApp')}
              value={faq.ctaWhatsApp}
              onChangeEn={(e) => updateFaqPageField("ctaWhatsApp", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("ctaWhatsApp", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('ctaMessage')}
              value={faq.ctaMessage}
              onChangeEn={(e) => updateFaqPageField("ctaMessage", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("ctaMessage", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('footerText')}
              value={faq.footer}
              onChangeEn={(e) => updateFaqPageField("footer", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("footer", "bn", e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Tags Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('faqPageTags')}</h3>
          <div className="space-y-3">
            <BilingualInput
              label={t('tagAccount')}
              value={faq.tagAccount}
              onChangeEn={(e) => updateFaqPageField("tagAccount", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("tagAccount", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('tagSavings')}
              value={faq.tagSavings}
              onChangeEn={(e) => updateFaqPageField("tagSavings", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("tagSavings", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('tagPlans')}
              value={faq.tagPlans}
              onChangeEn={(e) => updateFaqPageField("tagPlans", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("tagPlans", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('tagCircles')}
              value={faq.tagCircles}
              onChangeEn={(e) => updateFaqPageField("tagCircles", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("tagCircles", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('tagIslamic')}
              value={faq.tagIslamic}
              onChangeEn={(e) => updateFaqPageField("tagIslamic", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("tagIslamic", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('tagSecurity')}
              value={faq.tagSecurity}
              onChangeEn={(e) => updateFaqPageField("tagSecurity", "en", e.target.value)}
              onChangeBn={(e) => updateFaqPageField("tagSecurity", "bn", e.target.value)}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderContactPageTab = () => {
    const contact = cmsData?.contactPage || {};

    const updateContactField = (key, lang, value) => {
      setCmsData((prev) => ({
        ...prev,
        contactPage: {
          ...(prev.contactPage || {}),
          [key]: { ...(prev.contactPage?.[key] || {}), [lang]: value },
        },
      }));
    };

    const updateContactLinkField = (key, value) => {
      setCmsData((prev) => ({
        ...prev,
        contactPage: { ...(prev.contactPage || {}), [key]: value },
      }));
    };

    const BilingualInput = ({ label, value, onChangeEn, onChangeBn, rows = 1 }) => (
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-foreground/60 mb-1">{label}</label>
        <div className="grid grid-cols-2 gap-2">
          <div className="border border-border/50 rounded-lg p-2 bg-background/50">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-1">{t('english')}</div>
            {rows > 1 ? (
              <textarea
                rows={rows}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
                value={value?.en || ""}
                onChange={onChangeEn}
              />
            ) : (
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={value?.en || ""}
                onChange={onChangeEn}
              />
            )}
          </div>
          <div className="border border-border/50 rounded-lg p-2 bg-background/50">
            <div className="text-[10px] font-bold uppercase tracking-wider text-foreground/40 mb-1">{t('bengali')}</div>
            {rows > 1 ? (
              <textarea
                rows={rows}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
                value={value?.bn || ""}
                onChange={onChangeBn}
              />
            ) : (
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={value?.bn || ""}
                onChange={onChangeBn}
              />
            )}
          </div>
        </div>
      </div>
    );

    const LinkInput = ({ label, value, onChange }) => (
      <div>
        <label className="block text-xs font-semibold text-foreground/60 mb-1">{label}</label>
        <input
          className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
          value={value || ""}
          onChange={onChange}
        />
      </div>
    );

    return (
      <div className="space-y-5">
        {/* Hero Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('contactPageHero')}</h3>
          <div className="space-y-3">
            <BilingualInput
              label={t('heroTitle')}
              value={contact.heroBadge}
              onChangeEn={(e) => updateContactField("heroBadge", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("heroBadge", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('title')}
              value={contact.heroTitle}
              onChangeEn={(e) => updateContactField("heroTitle", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("heroTitle", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('description')}
              value={contact.heroDesc}
              onChangeEn={(e) => updateContactField("heroDesc", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("heroDesc", "bn", e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Contact Cards Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('contactPageCards')}</h3>
          <div className="space-y-3">
            {/* WhatsApp */}
            <BilingualInput
              label={t('whatsappLabel')}
              value={contact.whatsappLabel}
              onChangeEn={(e) => updateContactField("whatsappLabel", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("whatsappLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('whatsappValue')}
              value={contact.whatsappValue}
              onChangeEn={(e) => updateContactField("whatsappValue", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("whatsappValue", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('whatsappNote')}
              value={contact.whatsappNote}
              onChangeEn={(e) => updateContactField("whatsappNote", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("whatsappNote", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('whatsappButton')}
              value={contact.whatsappButton}
              onChangeEn={(e) => updateContactField("whatsappButton", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("whatsappButton", "bn", e.target.value)}
            />
            {/* Email */}
            <BilingualInput
              label={t('emailLabel')}
              value={contact.emailLabel}
              onChangeEn={(e) => updateContactField("emailLabel", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("emailLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('emailValue')}
              value={contact.emailValue}
              onChangeEn={(e) => updateContactField("emailValue", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("emailValue", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('emailNote')}
              value={contact.emailNote}
              onChangeEn={(e) => updateContactField("emailNote", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("emailNote", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('emailButton')}
              value={contact.emailButton}
              onChangeEn={(e) => updateContactField("emailButton", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("emailButton", "bn", e.target.value)}
            />
            {/* Address */}
            <BilingualInput
              label={t('addressLabel')}
              value={contact.addressLabel}
              onChangeEn={(e) => updateContactField("addressLabel", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("addressLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('addressValue')}
              value={contact.addressValue}
              onChangeEn={(e) => updateContactField("addressValue", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("addressValue", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('addressNote')}
              value={contact.addressNote}
              onChangeEn={(e) => updateContactField("addressNote", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("addressNote", "bn", e.target.value)}
              rows={2}
            />
            {/* Social */}
            <BilingualInput
              label={t('socialLabel')}
              value={contact.socialLabel}
              onChangeEn={(e) => updateContactField("socialLabel", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("socialLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('socialValue')}
              value={contact.socialValue}
              onChangeEn={(e) => updateContactField("socialValue", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("socialValue", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('socialNote')}
              value={contact.socialNote}
              onChangeEn={(e) => updateContactField("socialNote", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("socialNote", "bn", e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Links Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('contactPageLinks')}</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <LinkInput
              label={t('whatsappLink')}
              value={contact.whatsappLink}
              onChange={(e) => updateContactLinkField("whatsappLink", e.target.value)}
            />
            <LinkInput
              label={t('emailLink')}
              value={contact.emailLink}
              onChange={(e) => updateContactLinkField("emailLink", e.target.value)}
            />
          </div>
        </div>

        {/* Support Hours Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('contactPageHours')}</h3>
          <div className="space-y-3">
            <BilingualInput
              label={t('supportHoursTitle')}
              value={contact.supportHoursTitle}
              onChangeEn={(e) => updateContactField("supportHoursTitle", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("supportHoursTitle", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('sundayThursday')}
              value={contact.sundayThursday}
              onChangeEn={(e) => updateContactField("sundayThursday", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("sundayThursday", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('friday')}
              value={contact.friday}
              onChangeEn={(e) => updateContactField("friday", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("friday", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('saturday')}
              value={contact.saturday}
              onChangeEn={(e) => updateContactField("saturday", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("saturday", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('whatsappUrgent')}
              value={contact.whatsappUrgent}
              onChangeEn={(e) => updateContactField("whatsappUrgent", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("whatsappUrgent", "bn", e.target.value)}
              rows={2}
            />
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">{t('contactPageForm')}</h3>
          <div className="space-y-3">
            <BilingualInput
              label={t('formTitle')}
              value={contact.formTitle}
              onChangeEn={(e) => updateContactField("formTitle", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("formTitle", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('formDesc')}
              value={contact.formDesc}
              onChangeEn={(e) => updateContactField("formDesc", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("formDesc", "bn", e.target.value)}
              rows={3}
            />
            <BilingualInput
              label={t('nameLabel')}
              value={contact.nameLabel}
              onChangeEn={(e) => updateContactField("nameLabel", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("nameLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('namePlaceholder')}
              value={contact.namePlaceholder}
              onChangeEn={(e) => updateContactField("namePlaceholder", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("namePlaceholder", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('phoneLabel')}
              value={contact.phoneLabel}
              onChangeEn={(e) => updateContactField("phoneLabel", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("phoneLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('phonePlaceholder')}
              value={contact.phonePlaceholder}
              onChangeEn={(e) => updateContactField("phonePlaceholder", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("phonePlaceholder", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('emailLabel')}
              value={contact.emailLabel}
              onChangeEn={(e) => updateContactField("emailLabel", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("emailLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('emailPlaceholder')}
              value={contact.emailPlaceholder}
              onChangeEn={(e) => updateContactField("emailPlaceholder", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("emailPlaceholder", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('topicLabel')}
              value={contact.topicLabel}
              onChangeEn={(e) => updateContactField("topicLabel", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("topicLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('topicPlaceholder')}
              value={contact.topicPlaceholder}
              onChangeEn={(e) => updateContactField("topicPlaceholder", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("topicPlaceholder", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('topicAccount')}
              value={contact.topicAccount}
              onChangeEn={(e) => updateContactField("topicAccount", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("topicAccount", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('topicDeposit')}
              value={contact.topicDeposit}
              onChangeEn={(e) => updateContactField("topicDeposit", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("topicDeposit", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('topicPlan')}
              value={contact.topicPlan}
              onChangeEn={(e) => updateContactField("topicPlan", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("topicPlan", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('topicCircle')}
              value={contact.topicCircle}
              onChangeEn={(e) => updateContactField("topicCircle", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("topicCircle", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('topicTechnical')}
              value={contact.topicTechnical}
              onChangeEn={(e) => updateContactField("topicTechnical", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("topicTechnical", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('topicOther')}
              value={contact.topicOther}
              onChangeEn={(e) => updateContactField("topicOther", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("topicOther", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('messageLabel')}
              value={contact.messageLabel}
              onChangeEn={(e) => updateContactField("messageLabel", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("messageLabel", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('messagePlaceholder')}
              value={contact.messagePlaceholder}
              onChangeEn={(e) => updateContactField("messagePlaceholder", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("messagePlaceholder", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('sendButton')}
              value={contact.sendButton}
              onChangeEn={(e) => updateContactField("sendButton", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("sendButton", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('sending')}
              value={contact.sending}
              onChangeEn={(e) => updateContactField("sending", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("sending", "bn", e.target.value)}
            />
            <BilingualInput
              label={t('successTitle')}
              value={contact.successTitle}
              onChangeEn={(e) => updateContactField("successTitle", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("successTitle", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('successDesc')}
              value={contact.successDesc}
              onChangeEn={(e) => updateContactField("successDesc", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("successDesc", "bn", e.target.value)}
              rows={3}
            />
            <BilingualInput
              label={t('requiredFields')}
              value={contact.requiredFields}
              onChangeEn={(e) => updateContactField("requiredFields", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("requiredFields", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('failedToSend')}
              value={contact.failedToSend}
              onChangeEn={(e) => updateContactField("failedToSend", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("failedToSend", "bn", e.target.value)}
              rows={2}
            />
            <BilingualInput
              label={t('footerText')}
              value={contact.footer}
              onChangeEn={(e) => updateContactField("footer", "en", e.target.value)}
              onChangeBn={(e) => updateContactField("footer", "bn", e.target.value)}
              rows={2}
            />
          </div>
        </div>
      </div>
    );
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "site":          return renderSiteTab();
      case "homepage":      return renderHomepageTab();
      case "nav":           return renderNavTab();
      case "plans":         return renderPlansTab();
      case "comparison":    return renderComparisonTab();
      case "faq":           return renderFaqTab();
      case "announcements": return renderAnnouncementTab();
      case "footer":        return renderFooterTab();
      case "aboutUs":       return renderAboutUsTab();
      case "faqPage":       return renderFaqPageTab();
      case "contactPage":   return renderContactPageTab();
      default:              return renderSiteTab();
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 size={32} className="animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">{t('contentManagement')}</h2>
          <p className="text-xs text-foreground/50">
            {t('changesApplyInstantly')}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetAll}
            className="px-4 py-2 rounded-lg border border-red-500/30 text-red-500 text-sm font-semibold hover:bg-red-500/10 transition flex items-center gap-2"
          >
            <RefreshCw size={14} /> {t('reset')}
          </button>
          <button
            onClick={saveAll}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50 hover:opacity-90 transition"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            {saving ? t('saving') : t('save')}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-0 bg-card border border-border rounded-xl overflow-hidden mb-5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-semibold transition flex items-center gap-2 ${
              activeTab === tab.id
                ? "bg-primary/10 text-primary border-b-2 border-primary"
                : "text-foreground/60 hover:text-primary hover:bg-primary/5"
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {cmsData ? (
        renderActiveTab()
      ) : (
        <div className="py-16 text-center text-foreground/40 text-sm">
          {t('dataNotLoaded')}
        </div>
      )}

      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CmsPage;
