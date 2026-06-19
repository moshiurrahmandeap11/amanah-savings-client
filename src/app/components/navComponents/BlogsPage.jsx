"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Loader2,
  RefreshCw,
  Filter,
  ChevronDown,
  BookOpen,
  Clock,
  ThumbsUp,
  ThumbsDown,
  X,
  Globe,
  Users,
  TrendingUp,
  Star,
  Tag,
  Calendar,
} from "lucide-react";
import axiosInstance from "../shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const BlogsPage = () => {
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 20,
  });

  // Form state for create/edit
  const [formData, setFormData] = useState({
    articleId: "",
    icon: "📄",
    titleBn: "",
    titleEn: "",
    categoryBn: "",
    categoryEn: "",
    readTimeBn: "২ মিনিট পড়া",
    readTimeEn: "2 min read",
    bodyBn: "",
    bodyEn: "",
    tags: "",
    isPopular: false,
  });

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const isAdmin = () => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    return user?.role === "admin";
  };

  const fetchArticles = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", page);
      params.append("limit", pagination.itemsPerPage);
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory !== "all") params.append("category", selectedCategory);

      const res = await axiosInstance.get(
        `/help/articles?${params.toString()}`
      );

      if (res.data.success) {
        setArticles(res.data.data.articles);
        setPagination(res.data.data.pagination);
        setCategories(res.data.data.categories || []);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to fetch articles", "error");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategory, pagination.itemsPerPage]);

  useEffect(() => {
    fetchArticles(1);
  }, [fetchArticles]);

  const fetchArticleDetails = async (articleId) => {
    try {
      const res = await axiosInstance.get(`/help/articles/${articleId}`);
      if (res.data.success) {
        setSelectedArticle(res.data.data);
        setShowArticleModal(true);
        document.body.style.overflow = "hidden";
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to load article", "error");
    }
  };

  const createArticle = async () => {
    if (!formData.articleId || !formData.titleBn || !formData.titleEn || !formData.bodyBn || !formData.bodyEn) {
      showToast("Please fill in all required fields", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const data = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : [],
      };

      const res = await axiosInstance.post(
        "/help/admin/articles",
        data,
        { headers: getAuthHeaders() }
      );

      if (res.data.success) {
        showToast("Article created successfully!", "success");
        setShowCreateModal(false);
        resetForm();
        fetchArticles(pagination.currentPage);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to create article", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const updateArticle = async () => {
    if (!formData.titleBn || !formData.titleEn || !formData.bodyBn || !formData.bodyEn) {
      showToast("Please fill in all required fields", "warning");
      return;
    }

    setSubmitting(true);
    try {
      const data = {
        ...formData,
        tags: formData.tags ? formData.tags.split(",").map(t => t.trim()) : [],
      };

      const res = await axiosInstance.put(
        `/help/admin/articles/${formData.articleId}`,
        data,
        { headers: getAuthHeaders() }
      );

      if (res.data.success) {
        showToast("Article updated successfully!", "success");
        setShowEditModal(false);
        resetForm();
        fetchArticles(pagination.currentPage);
        if (selectedArticle?.articleId === formData.articleId) {
          setSelectedArticle(null);
        }
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to update article", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteArticle = async (articleId) => {
    const result = await Swal.fire({
      title: "Delete Article?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#059669",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      try {
        const res = await axiosInstance.delete(
          `/help/admin/articles/${articleId}`,
          { headers: getAuthHeaders() }
        );

        if (res.data.success) {
          showToast("Article deleted successfully", "success");
          fetchArticles(pagination.currentPage);
          if (selectedArticle?.articleId === articleId) {
            setShowArticleModal(false);
            setSelectedArticle(null);
          }
        }
      } catch (err) {
        showToast(err.response?.data?.message || "Failed to delete article", "error");
      }
    }
  };

  const submitFeedback = async (articleId, helpful) => {
    try {
      const res = await axiosInstance.post(
        `/help/articles/${articleId}/feedback`,
        { helpful },
        { headers: getAuthHeaders() }
      );

      if (res.data.success) {
        showToast("Thank you for your feedback!", "success");
        // Update local article data
        if (selectedArticle?.articleId === articleId) {
          setSelectedArticle({
            ...selectedArticle,
            helpful: helpful ? selectedArticle.helpful + 1 : selectedArticle.helpful,
            notHelpful: helpful ? selectedArticle.notHelpful : selectedArticle.notHelpful + 1,
          });
        }
        fetchArticles(pagination.currentPage);
      }
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to submit feedback", "error");
    }
  };

  const showToast = (message, type = "success") => {
    Swal.fire({
      title: type === "success" ? "Success" : type === "error" ? "Error" : "Warning",
      text: message,
      icon: type,
      confirmButtonColor: "#059669",
      timer: 3000,
      showConfirmButton: true,
    });
  };

  const resetForm = () => {
    setFormData({
      articleId: "",
      icon: "📄",
      titleBn: "",
      titleEn: "",
      categoryBn: "",
      categoryEn: "",
      readTimeBn: "২ মিনিট পড়া",
      readTimeEn: "2 min read",
      bodyBn: "",
      bodyEn: "",
      tags: "",
      isPopular: false,
    });
  };

  const openEditModal = (article) => {
    setFormData({
      articleId: article.articleId,
      icon: article.icon || "📄",
      titleBn: article.title.bn,
      titleEn: article.title.en,
      categoryBn: article.category.bn,
      categoryEn: article.category.en,
      readTimeBn: article.readTime.bn,
      readTimeEn: article.readTime.en,
      bodyBn: article.body.bn,
      bodyEn: article.body.en,
      tags: article.tags?.join(", ") || "",
      isPopular: article.isPopular || false,
    });
    setShowEditModal(true);
    document.body.style.overflow = "hidden";
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const getCategoryEmoji = (category) => {
    const emojis = {
      "General": "📝",
      "Getting Started": "🚀",
      "Account": "👤",
      "Security": "🔒",
      "Savings": "💰",
      "Deposits": "💳",
      "Withdrawals": "🏧",
      "Help": "🆘",
    };
    return emojis[category] || "📄";
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
        <div>
          <h2 className="text-lg font-bold text-foreground">📚 Help Articles</h2>
          <p className="text-xs text-foreground/50">
            {pagination.totalItems} total articles · {categories.length} categories
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => fetchArticles(1)}
            className="px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-primary-light text-white text-sm font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
          >
            <RefreshCw size={16} /> Refresh
          </button>
          {isAdmin() && (
            <button
              onClick={() => {
                resetForm();
                setShowCreateModal(true);
                document.body.style.overflow = "hidden";
              }}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-sm font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              <Plus size={16} /> New Article
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-5">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-background/80 dark:bg-background/60 backdrop-blur-sm">
          <Search size={16} className="text-foreground/50" />
          <input
            type="text"
            placeholder="Search articles by title, tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && fetchArticles(1)}
            className="flex-1 bg-transparent outline-none text-sm text-foreground"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 rounded-lg border border-border bg-card/80 dark:bg-card/60 backdrop-blur-sm text-foreground/70 text-sm font-semibold appearance-none cursor-pointer pr-8 hover:border-primary/50 transition-all duration-300"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.icon || "📄"} {cat._id} ({cat.count})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Articles Grid */}
      {articles.length === 0 ? (
        <div className="text-center py-16 bg-card/90 dark:bg-card/80 backdrop-blur-sm rounded-xl border border-border">
          <BookOpen size={48} className="text-foreground/20 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">No Articles Found</h3>
          <p className="text-sm text-foreground/50">
            {searchQuery ? "Try adjusting your search" : "No help articles available"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <motion.div
              key={article.articleId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className="bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl p-5 hover:shadow-lg hover:border-primary/30 transition-all duration-300 cursor-pointer group"
              onClick={() => fetchArticleDetails(article.articleId)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="text-3xl">{article.icon || "📄"}</div>
                {article.isPopular && (
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-amber-500/20 text-amber-500 flex items-center gap-1">
                    <Star size={12} /> Popular
                  </span>
                )}
              </div>

              <h3 className="font-bold text-foreground text-base mb-1 line-clamp-2">
                {article.title.en}
              </h3>
              <p className="text-xs text-foreground/50 mb-3">
                {article.category.en} · {article.readTime.en}
              </p>

              <p className="text-sm text-foreground/60 line-clamp-2 mb-3">
                {article.body.en?.substring(0, 120)}...
              </p>

              <div className="flex items-center justify-between text-xs text-foreground/40">
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <Eye size={12} /> {article.views || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp size={12} /> {article.helpful || 0}
                  </span>
                </div>
                <span>{formatDate(article.createdAt)}</span>
              </div>

              {isAdmin() && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-border/50">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      fetchArticleDetails(article.articleId);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition"
                  >
                    <Eye size={12} className="inline mr-1" /> View
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal(article);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-semibold hover:bg-blue-500/20 transition"
                  >
                    <Edit size={12} className="inline mr-1" /> Edit
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteArticle(article.articleId);
                    }}
                    className="flex-1 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-semibold hover:bg-red-500/20 transition"
                  >
                    <Trash2 size={12} className="inline mr-1" /> Delete
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-5 p-4 bg-card/90 dark:bg-card/80 backdrop-blur-sm border border-border rounded-xl">
          <div className="text-xs text-foreground/50">
            Showing {articles.length} of {pagination.totalItems} articles
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => fetchArticles(pagination.currentPage - 1)}
              disabled={pagination.currentPage <= 1}
              className="px-3 py-1 rounded-lg border border-border/60 dark:border-border/40 text-xs font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Prev
            </button>
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const page = i + 1;
              return (
                <button
                  key={page}
                  onClick={() => fetchArticles(page)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all duration-300 ${
                    pagination.currentPage === page
                      ? "bg-gradient-to-r from-primary to-primary-light text-white shadow-lg shadow-primary/20"
                      : "border border-border/60 dark:border-border/40 hover:border-primary/50 hover:bg-primary/5"
                  }`}
                >
                  {page}
                </button>
              );
            })}
            <button
              onClick={() => fetchArticles(pagination.currentPage + 1)}
              disabled={pagination.currentPage >= pagination.totalPages}
              className="px-3 py-1 rounded-lg border border-border/60 dark:border-border/40 text-xs font-semibold hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* Article Detail Modal */}
      <AnimatePresence>
        {showArticleModal && selectedArticle && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowArticleModal(false);
              document.body.style.overflow = "auto";
              setSelectedArticle(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card/95 dark:bg-card/90 backdrop-blur-sm rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-primary to-primary-light p-6 text-white relative">
                <button
                  onClick={() => {
                    setShowArticleModal(false);
                    document.body.style.overflow = "auto";
                    setSelectedArticle(null);
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  ✕
                </button>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedArticle.icon || "📄"}</div>
                  <div>
                    <div className="text-xl font-bold">{selectedArticle.title.en}</div>
                    <div className="text-sm text-white/80 flex items-center gap-3">
                      <span>{selectedArticle.category.en}</span>
                      <span>•</span>
                      <span>{selectedArticle.readTime.en}</span>
                      {selectedArticle.isPopular && (
                        <>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Star size={14} /> Popular
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Body */}
              <div className="p-6">
                <div className="prose prose-sm dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap text-foreground/80 leading-relaxed">
                    {selectedArticle.body.en}
                  </div>
                </div>

                {selectedArticle.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border/50">
                    {selectedArticle.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                  <div className="text-xs text-foreground/40 flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Eye size={14} /> {selectedArticle.views || 0} views
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {formatDate(selectedArticle.createdAt)}
                    </span>
                  </div>

                  {isAdmin() && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setShowArticleModal(false);
                          openEditModal(selectedArticle);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-500 text-xs font-semibold hover:bg-blue-500/20 transition"
                      >
                        <Edit size={14} className="inline mr-1" /> Edit
                      </button>
                      <button
                        onClick={() => {
                          setShowArticleModal(false);
                          deleteArticle(selectedArticle.articleId);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-semibold hover:bg-red-500/20 transition"
                      >
                        <Trash2 size={14} className="inline mr-1" /> Delete
                      </button>
                    </div>
                  )}
                </div>

                {/* Feedback Section */}
                <div className="mt-4 p-4 bg-background/90 dark:bg-background/80 backdrop-blur-sm rounded-xl border border-border/50">
                  <p className="text-sm font-semibold text-foreground mb-3">
                    Was this article helpful?
                  </p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => submitFeedback(selectedArticle.articleId, true)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                    >
                      <ThumbsUp size={16} /> Yes ({selectedArticle.helpful || 0})
                    </button>
                    <button
                      onClick={() => submitFeedback(selectedArticle.articleId, false)}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-500 to-rose-500 text-white text-sm font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-red-500/25 transition-all duration-300"
                    >
                      <ThumbsDown size={16} /> No ({selectedArticle.notHelpful || 0})
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create Article Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowCreateModal(false);
              document.body.style.overflow = "auto";
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card/95 dark:bg-card/90 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-6 text-white relative">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    document.body.style.overflow = "auto";
                    resetForm();
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  ✕
                </button>
                <div className="flex items-center gap-3">
                  <Plus size={24} />
                  <div>
                    <div className="text-xl font-bold">Create New Article</div>
                    <div className="text-sm text-white/80">Add a new help article</div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Article ID *
                    </label>
                    <input
                      type="text"
                      value={formData.articleId}
                      onChange={(e) => setFormData({ ...formData, articleId: e.target.value })}
                      placeholder="e.g., getting-started"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Icon (emoji)
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="📄"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    placeholder="Article title in English"
                    className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Title (Bengali) *
                  </label>
                  <input
                    type="text"
                    value={formData.titleBn}
                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                    placeholder="বাংলায় শিরোনাম"
                    className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Category (English)
                    </label>
                    <input
                      type="text"
                      value={formData.categoryEn}
                      onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                      placeholder="General"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Category (Bengali)
                    </label>
                    <input
                      type="text"
                      value={formData.categoryBn}
                      onChange={(e) => setFormData({ ...formData, categoryBn: e.target.value })}
                      placeholder="সাধারণ"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Read Time (English)
                    </label>
                    <input
                      type="text"
                      value={formData.readTimeEn}
                      onChange={(e) => setFormData({ ...formData, readTimeEn: e.target.value })}
                      placeholder="2 min read"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Read Time (Bengali)
                    </label>
                    <input
                      type="text"
                      value={formData.readTimeBn}
                      onChange={(e) => setFormData({ ...formData, readTimeBn: e.target.value })}
                      placeholder="২ মিনিট পড়া"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Body (English) *
                  </label>
                  <textarea
                    value={formData.bodyEn}
                    onChange={(e) => setFormData({ ...formData, bodyEn: e.target.value })}
                    rows={4}
                    placeholder="Article content in English..."
                    className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Body (Bengali) *
                  </label>
                  <textarea
                    value={formData.bodyBn}
                    onChange={(e) => setFormData({ ...formData, bodyBn: e.target.value })}
                    rows={4}
                    placeholder="বাংলায় নিবন্ধের বিষয়বস্তু..."
                    className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="savings, deposits, guide"
                    className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-semibold text-foreground/70">Mark as Popular</span>
                  </label>
                </div>
              </div>

              <div className="p-4 border-t border-border/50 flex gap-3">
                <button
                  onClick={() => {
                    setShowCreateModal(false);
                    document.body.style.overflow = "auto";
                    resetForm();
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-border text-foreground font-semibold hover:border-red-500 hover:text-red-500 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={createArticle}
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Creating...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Create Article
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Article Modal */}
      <AnimatePresence>
        {showEditModal && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setShowEditModal(false);
              document.body.style.overflow = "auto";
              resetForm();
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card/95 dark:bg-card/90 backdrop-blur-sm rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-white relative">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    document.body.style.overflow = "auto";
                    resetForm();
                  }}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                >
                  ✕
                </button>
                <div className="flex items-center gap-3">
                  <Edit size={24} />
                  <div>
                    <div className="text-xl font-bold">Edit Article</div>
                    <div className="text-sm text-white/80">Update article content</div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Icon (emoji)
                    </label>
                    <input
                      type="text"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="📄"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Article ID
                    </label>
                    <input
                      type="text"
                      value={formData.articleId}
                      disabled
                      className="w-full p-2.5 rounded-xl border border-border bg-border/50 text-foreground/50 cursor-not-allowed"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Title (English) *
                  </label>
                  <input
                    type="text"
                    value={formData.titleEn}
                    onChange={(e) => setFormData({ ...formData, titleEn: e.target.value })}
                    placeholder="Article title in English"
                    className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Title (Bengali) *
                  </label>
                  <input
                    type="text"
                    value={formData.titleBn}
                    onChange={(e) => setFormData({ ...formData, titleBn: e.target.value })}
                    placeholder="বাংলায় শিরোনাম"
                    className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Category (English)
                    </label>
                    <input
                      type="text"
                      value={formData.categoryEn}
                      onChange={(e) => setFormData({ ...formData, categoryEn: e.target.value })}
                      placeholder="General"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Category (Bengali)
                    </label>
                    <input
                      type="text"
                      value={formData.categoryBn}
                      onChange={(e) => setFormData({ ...formData, categoryBn: e.target.value })}
                      placeholder="সাধারণ"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Read Time (English)
                    </label>
                    <input
                      type="text"
                      value={formData.readTimeEn}
                      onChange={(e) => setFormData({ ...formData, readTimeEn: e.target.value })}
                      placeholder="2 min read"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                      Read Time (Bengali)
                    </label>
                    <input
                      type="text"
                      value={formData.readTimeBn}
                      onChange={(e) => setFormData({ ...formData, readTimeBn: e.target.value })}
                      placeholder="২ মিনিট পড়া"
                      className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Body (English) *
                  </label>
                  <textarea
                    value={formData.bodyEn}
                    onChange={(e) => setFormData({ ...formData, bodyEn: e.target.value })}
                    rows={4}
                    placeholder="Article content in English..."
                    className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Body (Bengali) *
                  </label>
                  <textarea
                    value={formData.bodyBn}
                    onChange={(e) => setFormData({ ...formData, bodyBn: e.target.value })}
                    rows={4}
                    placeholder="বাংলায় নিবন্ধের বিষয়বস্তু..."
                    className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1.5">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    placeholder="savings, deposits, guide"
                    className="w-full p-2.5 rounded-xl border border-border bg-background/90 text-foreground placeholder:text-foreground/40 outline-none focus:border-primary focus:ring-1 focus:ring-primary transition text-sm"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPopular}
                      onChange={(e) => setFormData({ ...formData, isPopular: e.target.checked })}
                      className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                    />
                    <span className="text-sm font-semibold text-foreground/70">Mark as Popular</span>
                  </label>
                </div>
              </div>

              <div className="p-4 border-t border-border/50 flex gap-3">
                <button
                  onClick={() => {
                    setShowEditModal(false);
                    document.body.style.overflow = "auto";
                    resetForm();
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-border text-foreground font-semibold hover:border-red-500 hover:text-red-500 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={updateArticle}
                  disabled={submitting}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold flex items-center justify-center gap-2 hover:shadow-lg hover:shadow-amber-500/25 transition-all duration-300 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <Edit size={16} />
                      Update Article
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BlogsPage;