"use client";

import React, { useState, useEffect } from "react";
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
} from "lucide-react";

const AdminBlogPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [lang, setLang] = useState("bn");
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showEditor, setShowEditor] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [postCategory, setPostCategory] = useState("💰 Savings Tips");
  const [postLanguage, setPostLanguage] = useState("🇧🇩 Bangla");
  const [scheduleDate, setScheduleDate] = useState("");
  const [toast, setToast] = useState({ show: false, message: "" });

  const stats = [
    { value: "24", label: "Published", color: "green" },
    { value: "5", label: "Drafts", color: "yellow" },
    { value: "3", label: "Scheduled", color: "blue" },
    { value: "48.2K", label: "Total Views", color: "purple" },
  ];

  const [posts, setPosts] = useState([
    {
      id: "post-1",
      thumb: "💰",
      title: "রমজান মাসে সঞ্চয় বাড়ানোর ৭টি উপায়",
      titleEn: "7 Ways to Increase Savings During Ramadan",
      author: "Admin",
      date: "Published Jun 1, 2026",
      readTime: "5 min read",
      status: "published",
      category: "☪️ Islamic Finance",
      excerpt:
        "রমজান মাসে খরচ কমিয়ে সঞ্চয় বাড়ানো সম্ভব। এই ব্লগে আমরা ৭টি কার্যকর উপায় আলোচনা করব যা আপনার সঞ্চয় লক্ষ্য পূরণে সাহায্য করবে...",
      excerptEn:
        "You can reduce expenses and increase savings during Ramadan. This post covers 7 practical ways to reach your savings goal...",
      views: "3,241",
      likes: "187",
      comments: "24",
      shares: "56",
    },
    {
      id: "post-2",
      thumb: "🏠",
      title: "বাড়ি কেনার আগে যা জানা দরকার — Amanah Guide",
      titleEn: "What to Know Before Buying a Home — Amanah Guide",
      author: "Admin",
      date: "Last edited Jun 4, 2026",
      status: "draft",
      category: "💰 Savings Tips",
      excerpt:
        "বাংলাদেশে বাড়ি কেনা অনেকের স্বপ্ন। কিন্তু সঠিক পরিকল্পনা ছাড়া এই স্বপ্ন পূরণ করা কঠিন। এই গাইডে আমরা আলোচনা করব...",
      excerptEn:
        "Buying a home in Bangladesh is a dream for many. Without proper planning, that dream is hard to reach. In this guide we discuss...",
      progress: "60%",
    },
    {
      id: "post-3",
      thumb: "🎓",
      title: "সন্তানের পড়াশোনার জন্য সঞ্চয় কীভাবে শুরু করবেন",
      titleEn: "How to Start Saving for Your Child's Education",
      author: "Admin",
      date: "Scheduled for Jun 10, 2026 at 9:00 AM",
      status: "scheduled",
      category: "💰 Savings Tips",
      excerpt:
        "সন্তানের ভবিষ্যৎ শিক্ষার জন্য আজই সঞ্চয় শুরু করুন। এই লেখায় আমরা দেখব কীভাবে মাত্র ৳৫০০ দিয়ে শুরু করে...",
      excerptEn:
        "Start saving today for your child's future education. In this article we show how to begin with just ৳500...",
      publishDate: "Jun 10",
    },
    {
      id: "post-4",
      thumb: "📢",
      title: "New Feature: Auto-Save is now live! ⚡",
      titleEn: "New Feature: Auto-Save is now live! ⚡",
      author: "Admin",
      date: "Published May 28, 2026",
      readTime: "2 min read",
      status: "published",
      category: "📢 Announcement",
      excerpt:
        "We're excited to announce the launch of Auto-Save — our newest feature that lets you set up automatic recurring deposits to your savings goals...",
      views: "12,441",
      likes: "892",
      comments: "143",
      shares: "324",
    },
  ]);

  const categories = [
    "💰 Savings Tips",
    "☪️ Islamic Finance",
    "📢 Announcement",
    "📊 Reports",
    "🎉 Community",
  ];

  const languages = ["🇧🇩 Bangla", "🇬🇧 English", "Both"];

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
  }, []);

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

  const openEditor = (post = null) => {
    if (post) {
      setEditingPost(post);
      setPostTitle(post.title);
      setPostContent(post.excerpt);
      setPostCategory(post.category);
    } else {
      setEditingPost(null);
      setPostTitle("");
      setPostContent("");
      setPostCategory("💰 Savings Tips");
      setPostLanguage("🇧🇩 Bangla");
      setScheduleDate("");
    }
    setShowEditor(true);
    document.body.style.overflow = "hidden";
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingPost(null);
    document.body.style.overflow = "auto";
  };

  const saveDraft = () => {
    closeEditor();
    showToast(
      lang === "bn"
        ? "💾 ড্রাফট সফলভাবে সংরক্ষিত হয়েছে"
        : "💾 Draft saved successfully",
    );
  };

  const publishPost = () => {
    if (!postTitle.trim()) {
      showToast(
        lang === "bn" ? "⚠️ অনুগ্রহ করে শিরোনাম দিন" : "⚠️ Please add a title",
      );
      return;
    }
    closeEditor();
    showToast(
      lang === "bn"
        ? "🚀 পোস্ট সফলভাবে প্রকাশিত হয়েছে!"
        : "🚀 Post published successfully!",
    );
  };

  const unpublishPost = (id) => {
    setPosts((prev) =>
      prev.map((post) =>
        post.id === id ? { ...post, status: "draft" } : post,
      ),
    );
    showToast(
      lang === "bn"
        ? "⬇️ পোস্ট আনপাবলিশ হয়েছে — ড্রাফটে রাখা হয়েছে"
        : "⬇️ Post unpublished — moved to drafts",
    );
  };

  const deletePost = (id) => {
    if (
      confirm(
        lang === "bn"
          ? "এই পোস্ট স্থায়ীভাবে মুছে ফেলবেন?"
          : "Delete this post permanently?",
      )
    ) {
      setPosts((prev) => prev.filter((post) => post.id !== id));
      showToast(
        lang === "bn" ? "🗑️ পোস্ট মুছে ফেলা হয়েছে" : "🗑️ Post deleted",
      );
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
      (lang === "en" &&
        post.titleEn?.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
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

      {/* Stats */}
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

      {/* Toolbar */}
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

      {/* Filter Tabs */}
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

      {/* Posts List */}
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
                      {lang === "bn" ? post.title : post.titleEn || post.title}
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
                    {lang === "bn"
                      ? post.excerpt
                      : post.excerptEn || post.excerpt}
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
                      <strong className="text-foreground">{post.likes}</strong>{" "}
                      likes
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground/50">
                      <MessageCircle size={12} />{" "}
                      <strong className="text-foreground">
                        {post.comments}
                      </strong>{" "}
                      comments
                    </div>
                    <div className="flex items-center gap-1 text-xs text-foreground/50">
                      <Share2 size={12} />{" "}
                      <strong className="text-foreground">{post.shares}</strong>{" "}
                      shares
                    </div>
                  </div>
                )}
                {post.status === "draft" && (
                  <div className="flex gap-4 mt-3">
                    <div className="text-xs text-foreground/50">
                      📝 <strong className="text-foreground">Draft</strong>
                    </div>
                    <div className="text-xs text-foreground/50">
                      ⏱️{" "}
                      <strong className="text-foreground">
                        {post.progress}
                      </strong>{" "}
                      complete
                    </div>
                  </div>
                )}
                {post.status === "scheduled" && (
                  <div className="flex gap-4 mt-3">
                    <div className="text-xs text-foreground/50">
                      📅 Publishes{" "}
                      <strong className="text-foreground">
                        {post.publishDate}
                      </strong>
                    </div>
                    <div className="text-xs text-foreground/50">
                      ⏱️ <strong className="text-foreground">100%</strong>{" "}
                      complete
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
                  ) : post.status === "draft" ? (
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        publishPost();
                      }}
                      className="py-2 rounded-lg border border-green-500/30 text-green-500 text-xs font-semibold hover:bg-green-500/10 transition"
                    >
                      🚀 Publish
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingPost(post);
                        publishPost();
                      }}
                      className="py-2 rounded-lg border border-primary/30 text-primary text-xs font-semibold hover:bg-primary/10 transition"
                    >
                      🚀 Publish Now
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
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editor Sheet Modal */}
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
                    value={postTitle}
                    onChange={(e) => setPostTitle(e.target.value)}
                    placeholder={
                      lang === "bn" ? "পোস্টের শিরোনাম..." : "Post title..."
                    }
                    className="flex-1 p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm font-semibold"
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
                    {categories.map((cat) => (
                      <option key={cat}>{cat}</option>
                    ))}
                  </select>
                  <select
                    value={postLanguage}
                    onChange={(e) => setPostLanguage(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                  >
                    {languages.map((lang) => (
                      <option key={lang}>{lang}</option>
                    ))}
                  </select>
                  <input
                    type="date"
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm outline-none focus:border-primary"
                    placeholder={
                      lang === "bn" ? "প্রকাশের তারিখ" : "Schedule date"
                    }
                  />
                </div>
                <textarea
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  rows={8}
                  placeholder={
                    lang === "bn"
                      ? "এখানে পোস্টের বিষয়বস্তু লিখুন..."
                      : "Write your post content here..."
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition text-sm resize-none"
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

      {/* Toast */}
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
