"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Calendar,
  Eye,
  Loader2,
  Search,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import axiosInstance from "../shared/AxiosInstance/AxiosInstance";

const translations = {
  en: {
    pageTitle: "Blog & Insights",
    pageSubtitle:
      "Fresh articles on savings, planning, and smart money habits. Read what is published by our team.",
    searchPlaceholder: "Search published articles...",
    allCategories: "All Categories",
    popularOnly: "Popular only",
    totalArticles: "articles",
    noArticles: "No published articles found",
    noArticlesDesc: "Try changing the search term or category.",
    readArticle: "Read Article",
    readTime: "read",
    views: "views",
    postedOn: "Posted",
    tags: "Tags",
    previous: "Previous",
    next: "Next",
    showing: "Showing",
    of: "of",
    popular: "Popular",
    loadFailed: "Failed to load blogs",
  },
  bn: {
    pageTitle: "ব্লগ ও ইনসাইটস",
    pageSubtitle:
      "সঞ্চয়, পরিকল্পনা এবং ভাল আর্থিক অভ্যাস নিয়ে টিমের প্রকাশিত আর্টিকেল পড়ুন।",
    searchPlaceholder: "প্রকাশিত আর্টিকেল খুঁজুন...",
    allCategories: "সব ক্যাটাগরি",
    popularOnly: "শুধু জনপ্রিয়",
    totalArticles: "টি আর্টিকেল",
    noArticles: "কোন প্রকাশিত আর্টিকেল পাওয়া যায়নি",
    noArticlesDesc: "সার্চ বা ক্যাটাগরি পরিবর্তন করে দেখুন।",
    readArticle: "আর্টিকেল পড়ুন",
    readTime: "পড়ার সময়",
    views: "ভিউ",
    postedOn: "প্রকাশের তারিখ",
    tags: "ট্যাগ",
    previous: "পূর্ববর্তী",
    next: "পরবর্তী",
    showing: "দেখানো হচ্ছে",
    of: "মোট",
    popular: "জনপ্রিয়",
    loadFailed: "ব্লগ লোড করা যায়নি",
  },
};

const BlogsPage = () => {
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [articles, setArticles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 9,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [popularOnly, setPopularOnly] = useState(false);

  const t = useCallback(
    (key) => translations[language]?.[key] || translations.en[key] || key,
    [language],
  );

  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage") || "en";
    setLanguage(savedLang);
  }, []);

  const showToast = (message, icon = "error") => {
    Swal.fire({
      icon,
      text: message,
      timer: 2500,
      showConfirmButton: false,
      toast: true,
      position: "top-end",
    });
  };

  const fetchArticles = useCallback(
    async (page = 1) => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("page", String(page));
        params.set("limit", String(pagination.itemsPerPage));
        if (selectedCategory !== "all") params.set("category", selectedCategory);
        if (searchQuery.trim()) params.set("search", searchQuery.trim());
        if (popularOnly) params.set("popular", "true");

        const res = await axiosInstance.get(`/help/articles?${params.toString()}`);

        if (res.data?.success) {
          setArticles(res.data.data?.articles || []);
          setCategories(res.data.data?.categories || []);
          setPagination(
            res.data.data?.pagination || {
              currentPage: 1,
              totalPages: 1,
              totalItems: 0,
              itemsPerPage: 9,
            },
          );
        }
      } catch (_err) {
        showToast(t("loadFailed"));
      } finally {
        setLoading(false);
      }
    },
    [pagination.itemsPerPage, popularOnly, searchQuery, selectedCategory, t],
  );

  useEffect(() => {
    fetchArticles(1);
  }, [fetchArticles]);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const renderedArticles = useMemo(() => {
    return articles.map((article) => {
      const title = language === "bn" ? article.title?.bn || article.title?.en : article.title?.en || article.title?.bn;
      const category = language === "bn"
        ? article.category?.bn || article.category?.en
        : article.category?.en || article.category?.bn;
      const body = language === "bn" ? article.body?.bn || article.body?.en : article.body?.en || article.body?.bn;
      const readTime = language === "bn"
        ? article.readTime?.bn || article.readTime?.en
        : article.readTime?.en || article.readTime?.bn;

      return {
        ...article,
        _title: title || "Untitled",
        _category: category || "General",
        _body: body || "",
        _readTime: readTime || "2 min read",
      };
    });
  }, [articles, language]);

  return (
    <section className="min-h-screen bg-linear-to-b from-background to-card/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="rounded-3xl border border-border bg-card/60 backdrop-blur-md p-5 sm:p-8 mb-6 sm:mb-8">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-primary mb-2">
                <Sparkles size={15} /> Amanah Blog
              </p>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">{t("pageTitle")}</h1>
              <p className="mt-2 text-sm sm:text-base text-foreground/70 max-w-3xl">{t("pageSubtitle")}</p>
            </div>
            <div className="rounded-xl border border-border bg-background/80 px-4 py-2 text-sm text-foreground/70">
              {pagination.totalItems} {t("totalArticles")}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-5 flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3 py-2.5">
              <Search size={16} className="text-foreground/50" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") fetchArticles(1);
                }}
                placeholder={t("searchPlaceholder")}
                className="w-full bg-transparent outline-none text-sm text-foreground"
              />
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="lg:col-span-3 rounded-xl border border-border bg-background/80 px-3 py-2.5 text-sm text-foreground outline-none"
            >
              <option value="all">{t("allCategories")}</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat._id} ({cat.count})
                </option>
              ))}
            </select>

            <button
              onClick={() => setPopularOnly((prev) => !prev)}
              className={`lg:col-span-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition ${
                popularOnly
                  ? "bg-amber-500/20 text-amber-700 border border-amber-400/40"
                  : "border border-border bg-background/80 text-foreground/80 hover:border-primary/40"
              }`}
            >
              {t("popularOnly")}
            </button>

            <button
              onClick={() => fetchArticles(1)}
              className="lg:col-span-2 rounded-xl bg-linear-to-r from-primary to-primary-hover text-white px-3 py-2.5 text-sm font-semibold hover:opacity-95"
            >
              {t("readArticle")}
            </button>
          </div>
        </div>

        {loading ? (
          <div className="h-72 flex items-center justify-center">
            <Loader2 className="animate-spin text-primary" size={36} />
          </div>
        ) : renderedArticles.length === 0 ? (
          <div className="rounded-2xl border border-border bg-card/70 text-center py-16 px-4">
            <BookOpen className="mx-auto text-foreground/25 mb-3" size={42} />
            <h3 className="text-lg font-semibold text-foreground">{t("noArticles")}</h3>
            <p className="mt-2 text-sm text-foreground/60">{t("noArticlesDesc")}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {renderedArticles.map((article) => (
                <motion.article
                  key={article.articleId}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-border bg-card/80 backdrop-blur-sm p-5 flex flex-col"
                >
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-3xl">{article.icon || "📄"}</p>
                    {article.isPopular && (
                      <span className="inline-flex items-center rounded-full px-2 py-1 text-[11px] font-semibold bg-amber-500/20 text-amber-700">
                        {t("popular")}
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-lg font-bold text-foreground line-clamp-2">{article._title}</h3>
                  <p className="mt-1 text-xs text-foreground/60">{article._category}</p>

                  <p className="mt-3 text-sm text-foreground/70 line-clamp-3 flex-1">{article._body}</p>

                  <div className="mt-4 pt-4 border-t border-border/50 text-xs text-foreground/60 space-y-1">
                    <p className="inline-flex items-center gap-1.5">
                      <Calendar size={13} /> {t("postedOn")}: {formatDate(article.createdAt)}
                    </p>
                    <p className="inline-flex items-center gap-1.5 ml-3">
                      <Eye size={13} /> {article.views || 0} {t("views")}
                    </p>
                    <p>{article._readTime}</p>
                  </div>

                  <Link
                    href={`/blogs/${article.articleId}`}
                    className="mt-4 rounded-xl bg-primary/10 text-primary hover:bg-primary/15 px-4 py-2.5 text-sm font-semibold text-center"
                  >
                    {t("readArticle")}
                  </Link>
                </motion.article>
              ))}
            </div>

            {pagination.totalPages > 1 && (
              <div className="mt-7 rounded-xl border border-border bg-card/70 p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                <p className="text-sm text-foreground/65">
                  {t("showing")} {renderedArticles.length} {t("of")} {pagination.totalItems}
                </p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchArticles(pagination.currentPage - 1)}
                    disabled={pagination.currentPage <= 1}
                    className="px-3 py-1.5 rounded-lg border border-border disabled:opacity-40 text-sm"
                  >
                    {t("previous")}
                  </button>
                  <span className="text-sm text-foreground/70">
                    {pagination.currentPage} / {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => fetchArticles(pagination.currentPage + 1)}
                    disabled={pagination.currentPage >= pagination.totalPages}
                    className="px-3 py-1.5 rounded-lg border border-border disabled:opacity-40 text-sm"
                  >
                    {t("next")}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>

    </section>
  );
};

export default BlogsPage;
