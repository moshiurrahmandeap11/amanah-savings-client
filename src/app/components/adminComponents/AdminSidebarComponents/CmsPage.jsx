"use client";

import React, { useState, useEffect, useCallback } from "react";
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

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const CmsPage = () => {
  const [activeTab, setActiveTab] = useState("site");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [cmsData, setCmsData] = useState(null); // null = not loaded yet
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchCms = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/admin/cms", { headers: getAuthHeaders() });
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

  // Nested field update: updateField("site", "name", "Amanah")
  const updateField = (section, key, value) => {
    setCmsData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value },
    }));
  };

  // Array item update: updateArrayItem("navigation", 0, "label", "Home")
  const updateArrayItem = (section, index, key, value) => {
    setCmsData((prev) => {
      const arr = [...(prev[section] || [])];
      arr[index] = { ...arr[index], [key]: value };
      return { ...prev, [section]: arr };
    });
  };

  // Array item feature update (plans[idx].features[fIdx])
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
        showToast("✅ সংরক্ষণ হয়েছে! পরিবর্তন সব পেজে apply হবে।");
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const resetAll = () => {
    if (confirm("সব সেটিংস রিসেট করতে চান? এটি পূর্বের সব কাস্টমাইজেশন মুছে দেবে।")) {
      showToast("🔄 Reloading...");
      setTimeout(() => window.location.reload(), 1200);
    }
  };

  const tabs = [
    { id: "site",          label: "⚙️ সাইট সেটিংস",  icon: <Globe size={16} /> },
    { id: "homepage",      label: "🏠 হোমপেজ",         icon: <Home size={16} /> },
    { id: "nav",           label: "🧭 নেভিগেশন",       icon: <Navigation size={16} /> },
    { id: "plans",         label: "💎 প্ল্যান",         icon: <CreditCard size={16} /> },
    { id: "faq",           label: "❓ FAQ",              icon: <HelpCircle size={16} /> },
    { id: "announcements", label: "📢 ঘোষণা",           icon: <Megaphone size={16} /> },
    { id: "footer",        label: "🔗 Footer",           icon: <LinkIcon size={16} /> },
  ];

  // ─── TAB RENDERERS ────────────────────────────────────────────────────────

  // Backend: site.{ name, tagline, url, supportEmail, supportPhone, language, currency, timezone }
  const renderSiteTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">🏢 মূল তথ্য</h3>
        <div className="space-y-3">
          {[
            { key: "name",         label: "প্ল্যাটফর্মের নাম" },
            { key: "tagline",      label: "ট্যাগলাইন" },
            { key: "url",          label: "সাইট URL" },
            { key: "supportEmail", label: "সাপোর্ট ইমেইল" },
            { key: "supportPhone", label: "সাপোর্ট ফোন" },
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
        <h3 className="font-bold text-foreground mb-4">🌐 লোকালাইজেশন</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">ভাষা</label>
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
            <label className="block text-xs font-semibold text-foreground/60 mb-1">মুদ্রা</label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.site?.currency || "BDT"}
              onChange={(e) => updateField("site", "currency", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">Timezone</label>
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

  // Backend: homepage.{ heroTitle, heroSubtitle, ctaText, stats:[{label,value,icon}] }
  const renderHomepageTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">🦸 Hero Section</h3>
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">মূল শিরোনাম</label>
            <textarea
              rows={3}
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
              value={cmsData?.homepage?.heroTitle || ""}
              onChange={(e) => updateField("homepage", "heroTitle", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">উপশিরোনাম</label>
            <textarea
              rows={3}
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
              value={cmsData?.homepage?.heroSubtitle || ""}
              onChange={(e) => updateField("homepage", "heroSubtitle", e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">CTA Button Text</label>
            <input
              className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={cmsData?.homepage?.ctaText || ""}
              onChange={(e) => updateField("homepage", "ctaText", e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">📊 Hero Statistics</h3>
        <div className="space-y-4">
          {(cmsData?.homepage?.stats || []).map((stat, i) => (
            <div key={i} className="border border-border rounded-lg p-3">
              <div className="text-xs font-semibold text-foreground/50 mb-2">Stat #{i + 1}</div>
              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="block text-xs text-foreground/50 mb-1">Icon</label>
                  <input
                    className="w-full p-1.5 rounded border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                    value={stat.icon || ""}
                    onChange={(e) => updateArrayItem("homepage.stats", i, "icon", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-xs text-foreground/50 mb-1">Label</label>
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
                  <label className="block text-xs text-foreground/50 mb-1">Value</label>
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

  // Backend: navigation[].{ label, url, icon }
  const renderNavTab = () => (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-bold text-foreground mb-4">🧭 Navigation Menu Items</h3>
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
              placeholder="Menu Label"
            />
            {/* backend field is `url`, not `href` */}
            <input
              className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
              value={item.url || ""}
              onChange={(e) => updateArrayItem("navigation", i, "url", e.target.value)}
              placeholder="/page"
            />
          </div>
        ))}
      </div>
    </div>
  );

  // Backend: plans[].{ name, min, max, color, features:string[] }
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
              <label className="block text-xs font-semibold text-foreground/60 mb-1">Plan নাম</label>
              <input
                className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={plan.name || ""}
                onChange={(e) => updateArrayItem("plans", idx, "name", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">Min (৳)</label>
                <input
                  type="number"
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                  value={plan.min || ""}
                  onChange={(e) => updateArrayItem("plans", idx, "min", Number(e.target.value))}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">Max (৳, blank=unlimited)</label>
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
            <div>
              <label className="block text-xs font-semibold text-foreground/60 mb-1">Color</label>
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
              <label className="block text-xs font-semibold text-foreground/60 mb-2">Features</label>
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
                      const features = [...(plans[idx].features || []), "New feature"];
                      plans[idx] = { ...plans[idx], features };
                      return { ...prev, plans };
                    });
                  }}
                  className="text-xs text-primary flex items-center gap-1 mt-1 hover:underline"
                >
                  <Plus size={12} /> Feature যোগ করুন
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  // Backend: faq[].{ question, answer }
  const renderFaqTab = () => (
    <div className="bg-card border border-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-foreground">❓ FAQ Items</h3>
        <button
          onClick={() =>
            setCmsData((prev) => ({
              ...prev,
              faq: [...(prev.faq || []), { question: "", answer: "" }],
            }))
          }
          className="text-xs text-primary flex items-center gap-1 hover:underline"
        >
          <Plus size={12} /> নতুন FAQ
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
            <div className="space-y-2">
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">প্রশ্ন</label>
                <input
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                  value={item.question || ""}
                  onChange={(e) => updateArrayItem("faq", i, "question", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/60 mb-1">উত্তর</label>
                <textarea
                  rows={3}
                  className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary resize-none text-sm"
                  value={item.answer || ""}
                  onChange={(e) => updateArrayItem("faq", i, "answer", e.target.value)}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Backend: announcements.{ enabled, text, link, startDate, endDate }
  const renderAnnouncementTab = () => (
    <div className="bg-card border border-border rounded-xl p-5">
      <h3 className="font-bold text-foreground mb-4">📢 সাইটওয়াইড ঘোষণা</h3>
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">ঘোষণা সক্রিয়?</label>
          {/* backend field: enabled (not active) */}
          <select
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
            value={cmsData?.announcements?.enabled ? "true" : "false"}
            onChange={(e) => updateField("announcements", "enabled", e.target.value === "true")}
          >
            <option value="true">হ্যাঁ — দেখাও</option>
            <option value="false">না — লুকাও</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">ঘোষণার বিষয়বস্তু</label>
          <input
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
            value={cmsData?.announcements?.text || ""}
            onChange={(e) => updateField("announcements", "text", e.target.value)}
            placeholder="আপনার ঘোষণা এখানে লিখুন..."
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">Link (optional)</label>
          <input
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
            value={cmsData?.announcements?.link || ""}
            onChange={(e) => updateField("announcements", "link", e.target.value)}
            placeholder="https://..."
          />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-foreground/60 mb-1">শুরুর তারিখ</label>
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
            <label className="block text-xs font-semibold text-foreground/60 mb-1">শেষের তারিখ</label>
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

  // Backend: footer.{ copyright, links:[{label,url}] }
  const renderFooterTab = () => (
    <div className="grid md:grid-cols-2 gap-5">
      <div className="bg-card border border-border rounded-xl p-5">
        <h3 className="font-bold text-foreground mb-4">📄 Footer Text</h3>
        <div>
          <label className="block text-xs font-semibold text-foreground/60 mb-1">Copyright Text</label>
          <input
            className="w-full p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
            value={cmsData?.footer?.copyright || ""}
            onChange={(e) => updateField("footer", "copyright", e.target.value)}
          />
        </div>
      </div>

      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-foreground">🔗 Footer Links</h3>
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
            <Plus size={12} /> Link যোগ করুন
          </button>
        </div>
        <div className="space-y-2">
          {(cmsData?.footer?.links || []).map((link, i) => (
            <div key={i} className="flex gap-2 items-center">
              <input
                className="flex-1 p-2 rounded-lg border border-border bg-background text-foreground outline-none focus:border-primary text-sm"
                value={link.label || ""}
                placeholder="Label"
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
                placeholder="/page"
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
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case "site":          return renderSiteTab();
      case "homepage":      return renderHomepageTab();
      case "nav":           return renderNavTab();
      case "plans":         return renderPlansTab();
      case "faq":           return renderFaqTab();
      case "announcements": return renderAnnouncementTab();
      case "footer":        return renderFooterTab();
      default:              return renderSiteTab();
    }
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────

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
          <h2 className="text-lg font-bold text-foreground">📝 Content Management System</h2>
          <p className="text-xs text-foreground/50">
            পরিবর্তনগুলো সংরক্ষণ করলে সব পেজে তাৎক্ষণিক apply হয়
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
            onClick={saveAll}
            disabled={saving}
            className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-50 hover:opacity-90 transition"
          >
            {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
            সংরক্ষণ করুন
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
          Data load হয়নি। পেজ refresh করুন।
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