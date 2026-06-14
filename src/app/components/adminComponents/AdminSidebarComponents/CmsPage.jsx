"use client";

import React, { useState, useEffect, useCallback } from "react";
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
  Loader2,
} from "lucide-react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://server-amanah-savings.onrender.com/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const CmsPage = () => {
  const [activeTab, setActiveTab] = useState("site");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [cmsData, setCmsData] = useState({
    site: {},
    homepage: {},
    navigation: [],
    plans: [],
    faq: [],
    announcements: {},
    footer: {},
  });
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchCms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/admin/cms`, { headers: getAuthHeaders() });
      if (res.data.success) {
        setCmsData(res.data.data);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to load CMS");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCms();
  }, [fetchCms]);

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

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

  const saveSection = async () => {
    setSaving(true);
    try {
      const res = await axios.put(`${API_BASE}/admin/cms`, cmsData, { headers: getAuthHeaders() });
      if (res.data.success) {
        showToast("✅ সংরক্ষণ হয়েছে! পরিবর্তন সব পেজে apply হবে।");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const resetAll = () => {
    if (
      confirm(
        "সব সেটিংস রিসেট করতে চান? এটি পূর্বের সব কাস্টমাইজেশন মুছে দেবে।",
      )
    ) {
      showToast("🔄 সব সেটিংস রিসেট হয়েছে! পেজ রিলোড করুন।");
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const tabs = [
    { id: "site", label: "⚙️ সাইট সেটিংস", icon: <Globe size={16} /> },
    { id: "homepage", label: "🏠 হোমপেজ", icon: <Home size={16} /> },
    { id: "nav", label: "🧭 নেভিগেশন", icon: <Navigation size={16} /> },
    { id: "plans", label: "💎 প্ল্যান/মূল্য", icon: <CreditCard size={16} /> },
    { id: "faq", label: "❓ FAQ", icon: <HelpCircle size={16} /> },
    { id: "announcements", label: "📢 ঘোষণা", icon: <Megaphone size={16} /> },
    { id: "footer", label: "🔗 Footer", icon: <LinkIcon size={16} /> },
  ];

  const renderSiteTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      <div>
        <div className="bg-card border border-border rounded-xl p-5 mb-5">
          <h3 className="font-bold text-foreground mb-4">🏢 মূল তথ্য</h3>
          <div className="space-y-3">
            {[
              { key: "site_name", label: "প্ল্যাটফর্মের নাম" },
              { key: "site_tagline", label: "ট্যাগলাইন" },
              { key: "site_phone", label: "ফোন নম্বর" },
              { key: "site_email", label: "ইমেইল" },
              { key: "site_address", label: "ঠিকানা" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">
                  {field.label}
                </label>
                <input
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                  value={cmsData.site?.[field.key] || ""}
                  onChange={(e) => updateField("site", field.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">
            📱 সোশ্যাল মিডিয়া লিংক
          </h3>
          <div className="space-y-3">
            {[
              { key: "site_fb", label: "Facebook URL" },
              { key: "site_wa", label: "WhatsApp নম্বর" },
              { key: "site_ig", label: "Instagram URL" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">
                  {field.label}
                </label>
                <input
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                  value={cmsData.site?.[field.key] || ""}
                  onChange={(e) => updateField("site", field.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">
            💰 ব্যবসায়িক নিয়ম
          </h3>
          <div className="space-y-3">
            {[
              { key: "referral_bonus", label: "রেফারেল বোনাস" },
              { key: "min_deposit", label: "সর্বনিম্ন জমা" },
              { key: "withdrawal_lock", label: "উত্তোলন লক সময়" },
              { key: "early_withdrawal_fee", label: "আর্লি উইথড্রয়াল ফি" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">
                  {field.label}
                </label>
                <input
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                  value={cmsData.site?.[field.key] || ""}
                  onChange={(e) => updateField("site", field.key, e.target.value)}
                />
              </div>
            ))}
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
                value={cmsData.homepage?.hero_title || ""}
                onChange={(e) => updateField("homepage", "hero_title", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                উপশিরোনাম / বিবরণ
              </label>
              <textarea
                rows={4}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none"
                value={cmsData.homepage?.hero_subtitle || ""}
                onChange={(e) => updateField("homepage", "hero_subtitle", e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4">📊 Statistics</h3>
          <div className="space-y-3">
            {[
              { key: "stat_members", label: "মোট সদস্য সংখ্যা" },
              { key: "stat_savings", label: "মোট সঞ্চয়" },
              { key: "stat_goals", label: "সক্রিয় লক্ষ্য" },
              { key: "stat_satisfaction", label: "সন্তুষ্টি হার" },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">
                  {field.label}
                </label>
                <input
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                  value={cmsData.homepage?.[field.key] || ""}
                  onChange={(e) => updateField("homepage", field.key, e.target.value)}
                />
              </div>
            ))}
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
        {(cmsData.navigation || []).map((item, i) => (
          <div key={i} className="flex gap-3 items-center">
            <span className="text-xs text-foreground/50 w-8">{i + 1}</span>
            <input
              className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={item.label || ""}
              onChange={(e) => updateArrayItem("navigation", i, "label", e.target.value)}
              placeholder="Menu Label"
            />
            <input
              className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={item.href || ""}
              onChange={(e) => updateArrayItem("navigation", i, "href", e.target.value)}
              placeholder="page.html"
            />
          </div>
        ))}
      </div>
    </div>
  );

  const renderPlansTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      {(cmsData.plans || []).map((plan, idx) => (
        <div key={idx} className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground mb-4 capitalize">
            {plan.name || `Plan ${idx + 1}`}
          </h3>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                Plan নাম
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={plan.name || ""}
                onChange={(e) => updateArrayItem("plans", idx, "name", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                মূল্য পরিসর
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={plan.price || ""}
                onChange={(e) => updateArrayItem("plans", idx, "price", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                বিবরণ
              </label>
              <textarea
                rows={2}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none"
                value={plan.desc || ""}
                onChange={(e) => updateArrayItem("plans", idx, "desc", e.target.value)}
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
        {(cmsData.faq || []).map((item, i) => (
          <div key={i} className="border-b border-border pb-4 last:border-0">
            <div className="font-semibold text-sm text-foreground mb-2">
              FAQ #{i + 1}
            </div>
            <div className="mb-2">
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                প্রশ্ন
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={item.question || ""}
                onChange={(e) => updateArrayItem("faq", i, "question", e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                উত্তর
              </label>
              <textarea
                rows={2}
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none"
                value={item.answer || ""}
                onChange={(e) => updateArrayItem("faq", i, "answer", e.target.value)}
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
            value={cmsData.announcements?.active ? "true" : "false"}
            onChange={(e) => updateField("announcements", "active", e.target.value === "true")}
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
            value={cmsData.announcements?.text || ""}
            onChange={(e) => updateField("announcements", "text", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">
            Link (optional)
          </label>
          <input
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
            value={cmsData.announcements?.link || ""}
            onChange={(e) => updateField("announcements", "link", e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">
            ঘোষণার ধরন
          </label>
          <select
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
            value={cmsData.announcements?.type || "success"}
            onChange={(e) => updateField("announcements", "type", e.target.value)}
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
              value={cmsData.footer?.copyright || ""}
              onChange={(e) => updateField("footer", "copyright", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">
              Tagline
            </label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
              value={cmsData.footer?.tagline || ""}
              onChange={(e) => updateField("footer", "tagline", e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">
          🔗 Social Media Links
        </h3>
        <div className="space-y-3">
          {[
            { key: "facebook", label: "Facebook" },
            { key: "whatsapp", label: "WhatsApp" },
            { key: "instagram", label: "Instagram" },
          ].map((field) => (
            <div key={field.key}>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">
                {field.label}
              </label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary"
                value={cmsData.footer?.[field.key] || ""}
                onChange={(e) => updateField("footer", field.key, e.target.value)}
              />
            </div>
          ))}
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

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">
            📝 Content Management System
          </h2>
          <p className="text-xs text-foreground/50">
            পরিবর্তনগুলো API-তে সংরক্ষিত হয় এবং সব পেজে তাৎক্ষণিক apply হয়
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
            onClick={saveSection}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            সংরক্ষণ করুন
          </button>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

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
