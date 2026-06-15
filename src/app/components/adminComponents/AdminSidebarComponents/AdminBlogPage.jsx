"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Moon,
  Sun,
  Search,
  Plus,
  Edit,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  TrendingUp,
  Heart,
  MessageCircle,
  Share2,
  Save,
  Send,
  Loader2,
} from "lucide-react";
import axiosInstance from "../../../components/shared/AxiosInstance/AxiosInstance";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AdminBlogPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postTitleBn, setPostTitleBn] = useState("");
  const [postTitleEn, setPostTitleEn] = useState("");
  const [postContentBn, setPostContentBn] = useState("");
  const [postContentEn, setPostContentEn] = useState("");
  const [postCategory, setPostCategory] = useState("general");
  const [toast, setToast] = useState({ show: false, message: "" });
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState([
    { value: "0", label: "Published", color: "green" },
    { value: "0", label: "Drafts", color: "yellow" },
    { value: "0", label: "Scheduled", color: "blue" },
    { value: "0", label: "Total Views", color: "purple" },
  ]);
  const [loading, setLoading] = useState(false);

  const fetchPosts = useCallback(async () => {
    setLoading(true);
    try {
      const [articlesRes, statsRes] = await Promise.all([
        axiosInstance.get("/help/articles", { headers: getAuthHeaders() }),
        axiosInstance.get("/help/statistics", { headers: getAuthHeaders() }),
      ]);
      
      if (articlesRes.data.success) {
        const articles = articlesRes.data.data.articles || [];
        // Transform backend data to frontend format
        const formattedPosts = articles.map((a) => ({
          id: a.articleId,
          thumb: a.icon || "📝",
          title: a.title?.bn || a.title?.en || "Untitled",
          titleEn: a.title?.en || a.title?.bn || "Untitled",
          author: "Admin", // You can add author field to backend
          date: a.createdAt ? new Date(a.createdAt).toLocaleDateString() : "Unknown",
          readTime: a.readTime?.bn || "5 min read",
          status: a.status || "published",
          category: getCategoryName(a.category?.en),
          categoryEn: a.category?.en,
          categoryBn: a.category?.bn,
          excerpt: a.body?.bn?.slice(0, 120) + "..." || "No content",
          excerptEn: a.body?.en?.slice(0, 120) + "..." || "No content",
          views: String(a.views || 0),
          helpful: String(a.helpful || 0),
          notHelpful: String(a.notHelpful || 0),
        }));
        setPosts(formattedPosts);
      }
      
      if (statsRes.data.success) {
        const s = statsRes.data.data;
        const published = posts.filter(p => p.status === "published").length;
        const drafts = posts.filter(p => p.status === "draft").length;
        setStats([
          { value: String(published), label: "Published", color: "green" },
          { value: String(drafts), label: "Drafts", color: "yellow" },
          { value: "0", label: "Scheduled", color: "blue" },
          { value: String(s.totalViews || 0), label: "Total Views", color: "purple" },
        ]);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      showToast(err.response?.data?.message || "Failed to load articles");
    } finally {
      setLoading(false);
    }
  }, [posts.length]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    fetchPosts();
  }, [fetchPosts]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: "" }), 3000);
  };

  const getCategoryName = (categoryEn) => {
    const categories = {
      "General": "📝 General",
      "Savings Tips": "💰 Savings Tips",
      "Islamic Finance": "☪️ Islamic Finance",
      "Announcement": "📢 Announcement",
      "Reports": "📊 Reports",
      "Community": "🎉 Community"
    };
    return categories[categoryEn] || "📝 General";
  };

  const getCategoryValue = (categoryDisplay) => {
    const categories = {
      "📝 General": "General",
      "💰 Savings Tips": "Savings Tips",
      "☪️ Islamic Finance": "Islamic Finance",
      "📢 Announcement": "Announcement",
      "📊 Reports": "Reports",
      "🎉 Community": "Community"
    };
    return categories[categoryDisplay] || "General";
  };

  const openEditor = (post = null) => {
    if (post) {
      setEditingPost(post);
      setPostTitleBn(post.title);
      setPostTitleEn(post.titleEn);
      setPostContentBn(post.excerpt.replace("...", ""));
      setPostContentEn(post.excerptEn.replace("...", ""));
      setPostCategory(getCategoryValue(post.category));
    } else {
      setEditingPost(null);
      setPostTitleBn("");
      setPostTitleEn("");
      setPostContentBn("");
      setPostContentEn("");
      setPostCategory("General");
    }
    setShowEditor(true);
    document.body.style.overflow = "hidden";
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingPost(null);
    document.body.style.overflow = "auto";
  };

  const saveOrPublishPost = async (status) => {
    if (!postTitleBn.trim() && !postTitleEn.trim()) {
      showToast(
        lang === "bn" ? "⚠️ অনুগ্রহ করে শিরোনাম দিন" : "⚠️ Please add a title",
      );
      return;
    }

    try {
      const articleId = editingPost?.id || `ART-${Date.now()}`;
      const payload = {
        articleId,
        icon: "📝",
        titleBn: postTitleBn || postTitleEn,
        titleEn: postTitleEn || postTitleBn,
        categoryBn: getCategoryBn(postCategory),
        categoryEn: postCategory,
        readTimeBn: "৫ মিনিট পড়া",
        readTimeEn: "5 min read",
        bodyBn: postContentBn || "Content will be added soon",
        bodyEn: postContentEn || "Content will be added soon",
        tags: [postCategory.toLowerCase()],
        isPopular: false,
        status: status,
      };

      if (editingPost) {
        await axiosInstance.put(`/help/admin/articles/${articleId}`, payload, { 
          headers: getAuthHeaders() 
        });
      } else {
        await axiosInstance.post("/help/admin/articles", payload, { 
          headers: getAuthHeaders() 
        });
      }

      closeEditor();
      showToast(
        status === "published"
          ? (lang === "bn" ? "🚀 পোস্ট প্রকাশিত হয়েছে!" : "🚀 Post published!")
          : (lang === "bn" ? "💾 ড্রাফট সংরক্ষিত হয়েছে" : "💾 Draft saved"),
      );
      fetchPosts();
    } catch (err) {
      console.error("Save error:", err);
      showToast(err.response?.data?.message || "Operation failed");
    }
  };

  const saveDraft = () => saveOrPublishPost("draft");
  const publishPost = () => saveOrPublishPost("published");

  const getCategoryBn = (categoryEn) => {
    const categories = {
      "General": "সাধারণ",
      "Savings Tips": "সঞ্চয় টিপস",
      "Islamic Finance": "ইসলামী অর্থায়ন",
      "Announcement": "ঘোষণা",
      "Reports": "রিপোর্ট",
      "Community": "কমিউনিটি"
    };
    return categories[categoryEn] || "সাধারণ";
  };

  const unpublishPost = async (id) => {
    try {
      await axiosInstance.put(`/help/admin/articles/${id}`, { status: "draft" }, { headers: getAuthHeaders() });
      showToast(
        lang === "bn"
          ? "⬇️ পোস্ট আনপাবলিশ করা হয়েছে"
          : "⬇️ Post unpublished",
      );
      fetchPosts();
    } catch (err) {
      showToast(err.response?.data?.message || "Unpublish failed");
    }
  };

  const deletePost = async (id) => {
    if (confirm(lang === "bn" ? "পোস্ট ডিলিট করবেন?" : "Delete post?")) {
      try {
        await axiosInstance.delete(`/help/admin/articles/${id}`, { headers: getAuthHeaders() });
        showToast(lang === "bn" ? "🗑️ পোস্ট ডিলিট হয়েছে" : "🗑️ Post deleted");
        fetchPosts();
      } catch (err) {
        showToast(err.response?.data?.message || "Delete failed");
      }
    }
  };

  const getStatusClass = (status) => {
    if (status === "published") return "border-l-success";
    if (status === "draft") return "border-l-warning";
    return "border-l-accent";
  };

  const getStatusBadge = (status) => {
    if (status === "published")
      return { class: "pbadge-published", text: "✅ Published", icon: "✅" };
    if (status === "draft")
      return { class: "pbadge-draft", text: "📝 Draft", icon: "📝" };
    return { class: "pbadge-scheduled", text: "📅 Scheduled", icon: "📅" };
  };

  const filteredPosts = posts.filter((post) => {
    const matchesFilter =
      activeFilter === "all" || post.status === activeFilter;
    const matchesSearch =
      searchQuery === "" ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.titleEn.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header - Same as before */}
      <div className="bg-card border-b border-border px-4 py-3 flex items-center gap-3 sticky top-0 z-50 flex-wrap">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
        >
          <ArrowLeft size={16} />
        </button>
        <h1 className="text-base font-bold text-foreground flex-1">
          📝 {lang === "bn" ? "ব্লগ ব্যবস্থাপনা" : "Blog Management"}
        </h1>
        <span className="px-2 py-1 rounded-md bg-red-500/15 text-red-400 text-[10px] font-bold">
          ADMIN
        </span>
        <button
          onClick={() => setLang(lang === "bn" ? "en" : "bn")}
          className="px-3 py-1.5 rounded-lg border border-border text-xs font-bold hover:border-primary transition"
        >
          {lang === "bn" ? "EN" : "BN"}
        </button>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      {/* Stats Grid - Same */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-4 max-w-6xl mx-auto">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-card border border-border rounded-xl p-3 text-center"
          >
            <div
              className={`text-xl font-bold ${stat.color === "green" ? "text-green-400" : stat.color === "yellow" ? "text-amber-400" : stat.color === "blue" ? "text-blue-400" : "text-purple-400"}`}
            >
              {stat.value}
            </div>
            <div className="text-[10px] text-foreground/50 mt-1">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Toolbar - Same */}
      <div className="flex flex-col sm:flex-row gap-3 px-4 pb-3 max-w-6xl mx-auto">
        <div className="relative flex-1">
          <Search
            size={14}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={lang === "bn" ? "পোস্ট খুঁজুন..." : "Search posts..."}
            className="w-full py-2 pl-9 pr-3 rounded-lg border border-border bg-card text-foreground text-sm outline-none focus:border-primary transition"
          />
        </div>
        <button
          onClick={() => openEditor()}
          className="px-4 py-2 rounded-lg bg-linear-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center gap-2 justify-center"
        >
          <Plus size={14} /> {lang === "bn" ? "নতুন পোস্ট" : "New Post"}
        </button>
      </div>

      {/* Filter Tabs - Same */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-hide max-w-6xl mx-auto">
        {[
          { id: "all", label: `All (${posts.length})` },
          { id: "published", label: "✅ Published" },
          { id: "draft", label: "📝 Drafts" },
          { id: "scheduled", label: "📅 Scheduled" },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border-2 whitespace-nowrap transition ${
              activeFilter === filter.id
                ? "bg-primary text-white border-primary"
                : "border-border bg-card text-foreground/60 hover:border-primary"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Loading - Same */}
      {loading && (
        <div className="flex items-center justify-center py-12 max-w-6xl mx-auto">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      {/* Posts List - Similar but with helpful instead of likes */}
      <div className="max-w-6xl mx-auto px-4 pb-20 space-y-3">
        {filteredPosts.map((post) => {
          const statusBadge = getStatusBadge(post.status);
          return (
            <div
              key={post.id}
              className={`bg-card border rounded-xl overflow-hidden transition ${getStatusClass(post.status)} border-l-4 border-border`}
            >
              <div className="p-4">
                <div className="flex gap-3">
                  <div className="w-12 h-12 rounded-lg bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-2xl shrink-0">
                    {post.thumb}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm text-foreground">
                      {lang === "bn" ? post.title : post.titleEn}
                    </div>
                    <div className="text-xs text-foreground/50 mt-0.5">
                      {post.author} · {post.date}
                    </div>
                    <div className="flex gap-1 mt-2 flex-wrap">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${statusBadge.class}`}
                      >
                        {statusBadge.text}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/15 text-purple-400">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border">
                  <p className="text-xs text-foreground/60 leading-relaxed">
                    {lang === "bn" ? post.excerpt : post.excerptEn}
                  </p>
                </div>
                {post.status === "published" && (
                  <div className="flex gap-4 mt-3 flex-wrap">
                    <div className="flex items-center gap-1 text-xs text-foreground/50">
                      <Eye size={12} />{" "}
                      <strong className="text-foreground">{post.views}</strong>{" "}
                      views
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground/50">
                      <Heart size={12} />{" "}
                      <strong className="text-foreground">{post.helpful}</strong>{" "}
                      helpful
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-3">
                  <button
                    onClick={() => openEditor(post)}
                    className="py-2 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                  >
                    ✏️ Edit
                  </button>
                  {post.status === "published" ? (
                    <button
                      onClick={() => unpublishPost(post.id)}
                      className="py-2 rounded-lg border border-amber-500/30 text-amber-500 text-xs font-semibold hover:bg-amber-500/10 transition"
                    >
                      ⬇️ Unpublish
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        publishPost();
                      }}
                      className="py-2 rounded-lg border border-green-500/30 text-green-500 text-xs font-semibold hover:bg-green-500/10 transition"
                    >
                      🚀 Publish
                    </button>
                  )}
                  <button
                    onClick={() =>
                      showToast(
                        lang === "bn"
                          ? "👁️ প্রিভিউ খোলা হচ্ছে..."
                          : "👁️ Opening preview...",
                      )
                    }
                    className="py-2 rounded-lg border border-border text-foreground/60 text-xs font-semibold hover:border-primary transition"
                  >
                    👁️ Preview
                  </button>
                  <button
                    onClick={() => deletePost(post.id)}
                    className="py-2 rounded-lg border border-red-500/30 text-red-500 text-xs font-semibold hover:bg-red-500/10 transition"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editor Sheet Modal - Updated with bilingual fields */}
      <AnimatePresence>
        {showEditor && (
          <>
            <div
              className="fixed inset-0 bg-black/70 z-50"
              onClick={closeEditor}
            />
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed bottom-0 left-0 right-0 bg-card rounded-t-2xl z-50 max-h-[85vh] overflow-y-auto"
            >
              <div className="max-w-3xl mx-auto p-5">
                <div className="w-10 h-1 bg-border rounded-full mx-auto mb-4" />
                <div className="flex gap-3 mb-4">
                  <input
                    type="text"
                    value={postTitleBn}
                    onChange={(e) => setPostTitleBn(e.target.value)}
                    placeholder={lang === "bn" ? "বাংলা শিরোনাম..." : "Bangla title..."}
                    className="flex-1 p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm"
                  />
                  <input
                    type="text"
                    value={postTitleEn}
                    onChange={(e) => setPostTitleEn(e.target.value)}
                    placeholder={lang === "bn" ? "ইংরেজি শিরোনাম..." : "English title..."}
                    className="flex-1 p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm"
                  />
                  <button
                    onClick={closeEditor}
                    className="w-9 h-9 rounded-lg border border-border flex items-center justify-center hover:bg-primary/10 transition"
                  >
                    ✕
                  </button>
                </div>
                <div className="flex flex-wrap gap-3 mb-4">
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                  >
                    {["General", "Savings Tips", "Islamic Finance", "Announcement", "Reports", "Community"].map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <textarea
                  value={postContentBn}
                  onChange={(e) => setPostContentBn(e.target.value)}
                  rows={6}
                  placeholder={lang === "bn" ? "বাংলা কন্টেন্ট লিখুন..." : "Write Bangla content..."}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm resize-none"
                />
                <textarea
                  value={postContentEn}
                  onChange={(e) => setPostContentEn(e.target.value)}
                  rows={6}
                  placeholder={lang === "bn" ? "ইংরেজি কন্টেন্ট লিখুন..." : "Write English content..."}
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm resize-none mt-3"
                />
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={saveDraft}
                    className="flex-1 py-3 rounded-xl border-2 border-border text-foreground/60 font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <Save size={14} />{" "}
                    {lang === "bn" ? "ড্রাফট সংরক্ষণ" : "Save Draft"}
                  </button>
                  <button
                    onClick={publishPost}
                    className="flex-1 py-3 rounded-xl bg-linear-to-r from-primary to-primary-light text-white font-semibold text-sm flex items-center justify-center gap-2"
                  >
                    <Send size={14} />{" "}
                    {lang === "bn" ? "প্রকাশ করুন" : "Publish"}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Toast - Same */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg whitespace-nowrap max-w-[90vw] text-center"
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminBlogPage;