"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save,
  RefreshCw,
  Edit,
  Eye,
  Globe,
  Home,
  Navigation,
  CreditCard,
  HelpCircle,
  Megaphone,
  Link as LinkIcon,
} from "lucide-react";

const CmsPage = () => {
  const [activeTab, setActiveTab] = useState("site");
  const [toast, setToast] = useState({ show: false, message: "" });

  // CMS Data
  const [cmsData, setCmsData] = useState({
    // Site Settings
    site_name: "Amanah Savings Community",
    site_tagline: "বাংলাদেশের স্মার্ট সঞ্চয় কমিউনিটি",
    site_phone: "+880 1800-000000",
    site_email: "support@amanahsavings.com.bd",
    site_address: "ঢাকা, বাংলাদেশ",
    site_fb: "https://facebook.com/amanahsavingsbd",
    site_wa: "https://wa.me/8801XXXXXXXXX",
    site_ig: "https://instagram.com/amanahsavingsbd",
    referral_bonus: "৳500",
    min_deposit: "৳100",
    withdrawal_lock: "মেয়াদ পূরণ পর্যন্ত",
    early_withdrawal_fee: "৩%",
    // Homepage
    hero_title: "একসাথে সঞ্চয় করুন,\nস্বপ্ন পূরণ করুন",
    hero_subtitle:
      "বাংলাদেশের সবচেয়ে বিশ্বস্ত ডিজিটাল সঞ্চয় কমিউনিটি। আপনার স্বপ্নের লক্ষ্য নির্ধারণ করুন এবং হাজারো মানুষের সাথে মিলে সঞ্চয় করুন।",
    stat_members: "৪৭,২৮৪+",
    stat_savings: "৳৩.২ কোটি+",
    stat_goals: "১২,৪০০+",
    stat_satisfaction: "৯৮%",
    // Navigation
    nav_1_label: "প্ল্যান",
    nav_1_href: "plans.html",
    nav_2_label: "লক্ষ্য",
    nav_2_href: "goals.html",
    nav_3_label: "ব্লগ",
    nav_3_href: "blog.html",
    nav_4_label: "সম্পর্কে",
    nav_4_href: "about.html",
    nav_5_label: "প্রশ্নোত্তর",
    nav_5_href: "faq.html",
    // Plans
    bronze_name: "Bronze",
    bronze_price: "৳500–৳4,999",
    bronze_desc: "নতুনদের জন্য সেরা শুরু",
    silver_name: "Silver",
    silver_price: "৳5,000–৳14,999",
    silver_desc: "নিয়মিত সঞ্চয়কারীদের জন্য",
    gold_name: "Gold",
    gold_price: "৳15,000–৳49,999",
    gold_desc: "গুরুতর সঞ্চয়কারীদের জন্য",
    platinum_name: "Platinum",
    platinum_price: "৳50,000+",
    platinum_desc: "VIP সদস্যদের জন্য",
    // FAQ
    faq_1_q: "Amanah কি নিরাপদ?",
    faq_1_a:
      "হ্যাঁ। Amanah SSL এনক্রিপশন, 256-bit security এবং ISO 27001 মান অনুসরণ করে।",
    faq_2_q: "কীভাবে টাকা জমা করব?",
    faq_2_a:
      "bKash, Nagad বা সরাসরি ব্যাংক ট্রান্সফারের মাধ্যমে টাকা জমা দেওয়া যায়।",
    faq_3_q: "সর্বনিম্ন কত টাকা জমা দিতে পারব?",
    faq_3_a: "মাত্র ৳১০০ থেকে শুরু করা যায়।",
    faq_4_q: "কখন টাকা তুলতে পারব?",
    faq_4_a: "সঞ্চয় লক্ষ্য মেয়াদ পূরণের পর সম্পূর্ণ টাকা তুলতে পারবেন।",
    // Announcement
    announcement_active: "false",
    announcement_text: "🎉 রমজান বিশেষ অফার — এখন সঞ্চয়ে ২০% বোনাস!",
    announcement_link: "/register.html",
    announcement_type: "success",
    // Footer
    footer_copy: "© ২০২৬ Amanah Savings Community — সর্বস্বত্ব সংরক্ষিত।",
    footer_tagline: "বাংলাদেশের বিশ্বস্ত ডিজিটাল সঞ্চয় কমিউনিটি।",
  });

  const tabs = [
    { id: "site", label: "⚙️ সাইট সেটিংস", icon: <Globe size={16} /> },
    { id: "homepage", label: "🏠 হোমপেজ", icon: <Home size={16} /> },
    { id: "nav", label: "🧭 নেভিগেশন", icon: <Navigation size={16} /> },
    { id: "plans", label: "💎 প্ল্যান/মূল্য", icon: <CreditCard size={16} /> },
    { id: "faq", label: "❓ FAQ", icon: <HelpCircle size={16} /> },
    { id: "announcements", label: "📢 ঘোষণা", icon: <Megaphone size={16} /> },
    { id: "footer", label: "🔗 Footer", icon: <LinkIcon size={16} /> },
  ];

  useEffect(() => {
    // Load saved data from localStorage
    const savedData = {};
    Object.keys(cmsData).forEach((key) => {
      const saved = localStorage.getItem(`cms_${key}`);
      if (saved !== null) {
        savedData[key] = saved;
      }
    });
    if (Object.keys(savedData).length > 0) {
      setCmsData((prev) => ({ ...prev, ...savedData }));
    }
  }, []);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const updateField = (key, value) => {
    setCmsData((prev) => ({ ...prev, [key]: value }));
  };

  const saveSection = (keys) => {
    keys.forEach((key) => {
      localStorage.setItem(`cms_${key}`, cmsData[key]);
    });
    showToast("✅ সংরক্ষণ হয়েছে! পরিবর্তন সব পেজে apply হবে।");
  };

  const resetAll = () => {
    if (
      confirm(
        "সব সেটিংস রিসেট করতে চান? এটি পূর্বের সব কাস্টমাইজেশন মুছে দেবে।",
      )
    ) {
      Object.keys(cmsData).forEach((key) => {
        localStorage.removeItem(`cms_${key}`);
      });
      // Reset to default values would require reload
      showToast("🔄 সব সেটিংস রিসেট হয়েছে! পেজ রিলোড করুন।");
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const renderSiteTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      <div>
        <div className="bg-card border border-border rounded-xl p-5 mb-5">
          <h3 className="font-bold text-foreground mb-4">🏢 মূল তথ্য</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                প্ল্যাটফর্মের নাম
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.site_name}
                onChange={(e) => updateField("site_name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                ট্যাগলাইন
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.site_tagline}
                onChange={(e) => updateField("site_tagline", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                ফোন নম্বর
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.site_phone}
                onChange={(e) => updateField("site_phone", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                ইমেইল
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.site_email}
                onChange={(e) => updateField("site_email", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                ঠিকানা
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.site_address}
                onChange={(e) => updateField("site_address", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">
            📱 সোশ্যাল মিডিয়া লিংক
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                Facebook URL
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.site_fb}
                onChange={(e) => updateField("site_fb", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                WhatsApp নম্বর
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.site_wa}
                onChange={(e) => updateField("site_wa", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                Instagram URL
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.site_ig}
                onChange={(e) => updateField("site_ig", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">
            💰 ব্যবসায়িক নিয়ম
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                রেফারেল বোনাস
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.referral_bonus}
                onChange={(e) => updateField("referral_bonus", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                সর্বনিম্ন জমা
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.min_deposit}
                onChange={(e) => updateField("min_deposit", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                উত্তোলন লক সময়
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.withdrawal_lock}
                onChange={(e) => updateField("withdrawal_lock", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                আর্লি উইথড্রয়াল ফি
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.early_withdrawal_fee}
                onChange={(e) =>
                  updateField("early_withdrawal_fee", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHomepageTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      <div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">🦸 Hero Section</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                মূল শিরোনাম
              </label>
              <textarea
                rows={3}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none"
                value={cmsData.hero_title}
                onChange={(e) => updateField("hero_title", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                উপশিরোনাম / বিবরণ
              </label>
              <textarea
                rows={4}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none"
                value={cmsData.hero_subtitle}
                onChange={(e) => updateField("hero_subtitle", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">📊 Statistics</h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                মোট সদস্য সংখ্যা
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.stat_members}
                onChange={(e) => updateField("stat_members", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                মোট সঞ্চয়
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.stat_savings}
                onChange={(e) => updateField("stat_savings", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                সক্রিয় লক্ষ্য
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.stat_goals}
                onChange={(e) => updateField("stat_goals", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                সন্তুষ্টি হার
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.stat_satisfaction}
                onChange={(e) =>
                  updateField("stat_satisfaction", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNavTab = () => (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-bold text-foreground mb-4">
        🧭 Navigation Menu Items
      </h3>
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex gap-3 items-center">
            <span className="text-xs text-foreground/50 w-8">{i}</span>
            <input
              className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData[`nav_${i}_label`]}
              onChange={(e) => updateField(`nav_${i}_label`, e.target.value)}
              placeholder="Menu Label"
            />
            <input
              className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData[`nav_${i}_href`]}
              onChange={(e) => updateField(`nav_${i}_href`, e.target.value)}
              placeholder="page.html"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlansTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      {["bronze", "silver", "gold", "platinum"].map((plan) => (
        <div key={plan} className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 capitalize">
            {plan} Plan
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                Plan নাম
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData[`${plan}_name`]}
                onChange={(e) => updateField(`${plan}_name`, e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                মূল্য পরিসর
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData[`${plan}_price`]}
                onChange={(e) => updateField(`${plan}_price`, e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                বিবরণ
              </label>
              <textarea
                rows={2}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none"
                value={cmsData[`${plan}_desc`]}
                onChange={(e) => updateField(`${plan}_desc`, e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderFaqTab = () => (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-bold text-foreground mb-4">❓ FAQ Items</h3>
      <div className="space-y-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border-b border-border pb-4 last:border-0">
            <div className="font-semibold text-sm text-foreground mb-2">
              FAQ #{i}
            </div>
            <div className="mb-2">
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                প্রশ্ন
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData[`faq_${i}_q`]}
                onChange={(e) => updateField(`faq_${i}_q`, e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                উত্তর
              </label>
              <textarea
                rows={2}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none"
                value={cmsData[`faq_${i}_a`]}
                onChange={(e) => updateField(`faq_${i}_a`, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderAnnouncementTab = () => (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-bold text-foreground mb-4">📢 সাইটওয়াইড ঘোষণা</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">
            ঘোষণা সক্রিয়?
          </label>
          <select
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
            value={cmsData.announcement_active}
            onChange={(e) => updateField("announcement_active", e.target.value)}
          >
            <option value="true">হ্যাঁ — দেখাও</option>
            <option value="false">না — লুকাও</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">
            ঘোষণার বিষয়বস্তু
          </label>
          <input
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
            value={cmsData.announcement_text}
            onChange={(e) => updateField("announcement_text", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">
            Link (optional)
          </label>
          <input
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
            value={cmsData.announcement_link}
            onChange={(e) => updateField("announcement_link", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">
            ঘোষণার ধরন
          </label>
          <select
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
            value={cmsData.announcement_type}
            onChange={(e) => updateField("announcement_type", e.target.value)}
          >
            <option value="success">✅ Success (সবুজ)</option>
            <option value="warning">⚠️ Warning (হলুদ)</option>
            <option value="info">ℹ️ Info (নীল)</option>
            <option value="danger">🚨 Danger (লাল)</option>
          </select>
        </div>
      </div>
    </div>
  );

  const renderFooterTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">📄 Footer Text</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">
              Copyright Text
            </label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
              value={cmsData.footer_copy}
              onChange={(e) => updateField("footer_copy", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">
              Tagline
            </label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
              value={cmsData.footer_tagline}
              onChange={(e) => updateField("footer_tagline", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">
          🔗 Social Media Links
        </h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">
              Facebook
            </label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
              value={cmsData.site_fb}
              onChange={(e) => updateField("site_fb", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">
              WhatsApp
            </label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
              value={cmsData.site_wa}
              onChange={(e) => updateField("site_wa", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">
              Instagram
            </label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
              value={cmsData.site_ig}
              onChange={(e) => updateField("site_ig", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "site":
        return renderSiteTab();
      case "homepage":
        return renderHomepageTab();
      case "nav":
        return renderNavTab();
      case "plans":
        return renderPlansTab();
      case "faq":
        return renderFaqTab();
      case "announcements":
        return renderAnnouncementTab();
      case "footer":
        return renderFooterTab();
      default:
        return renderSiteTab();
    }
  };

  const getSaveKeys = () => {
    switch (activeTab) {
      case "site":
        return [
          "site_name",
          "site_tagline",
          "site_phone",
          "site_email",
          "site_address",
          "site_fb",
          "site_wa",
          "site_ig",
          "referral_bonus",
          "min_deposit",
          "withdrawal_lock",
          "early_withdrawal_fee",
        ];
      case "homepage":
        return [
          "hero_title",
          "hero_subtitle",
          "stat_members",
          "stat_savings",
          "stat_goals",
          "stat_satisfaction",
        ];
      case "nav":
        return [
          "nav_1_label",
          "nav_1_href",
          "nav_2_label",
          "nav_2_href",
          "nav_3_label",
          "nav_3_href",
          "nav_4_label",
          "nav_4_href",
          "nav_5_label",
          "nav_5_href",
        ];
      case "plans":
        return [
          "bronze_name",
          "bronze_price",
          "bronze_desc",
          "silver_name",
          "silver_price",
          "silver_desc",
          "gold_name",
          "gold_price",
          "gold_desc",
          "platinum_name",
          "platinum_price",
          "platinum_desc",
        ];
      case "faq":
        return [
          "faq_1_q",
          "faq_1_a",
          "faq_2_q",
          "faq_2_a",
          "faq_3_q",
          "faq_3_a",
          "faq_4_q",
          "faq_4_a",
        ];
      case "announcements":
        return [
          "announcement_active",
          "announcement_text",
          "announcement_link",
          "announcement_type",
        ];
      case "footer":
        return [
          "footer_copy",
          "footer_tagline",
          "site_fb",
          "site_wa",
          "site_ig",
        ];
      default:
        return [];
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            📝 Content Management System
          </h2>
          <p className="text-xs text-foreground/50">
            পরিবর্তনগুলো localStorage-এ সংরক্ষিত হয় এবং সব পেজে তাৎক্ষণিক apply
            হয়
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={resetAll}
            className="px-4 py-2 rounded-lg border border-red-500/30 text-red-500 text-sm font-semibold hover:bg-red-500/10 transition flex items-center gap-2"
          >
            <RefreshCw size={14} /> রিসেট
          </button>
          <button
            onClick={() => saveSection(getSaveKeys())}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center gap-2"
          >
            <Save size={14} /> সংরক্ষণ করুন
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
      {renderActiveTab()}

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
