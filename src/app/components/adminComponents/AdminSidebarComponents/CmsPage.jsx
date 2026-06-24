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
  Trash2,
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
    
    // Toast Messages
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
    
    // Toast Messages
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
