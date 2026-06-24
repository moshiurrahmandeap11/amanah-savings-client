"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Calendar,
  Eye,
  Loader2,
  Tag,
  ThumbsDown,
  ThumbsUp,
} from "lucide-react";
import Link from "next/link";
import Swal from "sweetalert2";
import axiosInstance from "../shared/AxiosInstance/AxiosInstance";
import useAuth from "../../hooks/useAuth";

const translations = {
  en: {
    loading: "Loading article...",
    backToBlogs: "Back to Blogs",
    notFound: "Article not found",
    readTimeFallback: "2 min read",
    postedOn: "Posted",
    views: "views",
    tags: "Tags",
    feedback: "Was this article helpful?",
    yes: "Yes",
    no: "No",
    loginToVote: "Login to vote",
    loadFailed: "Failed to load article",
    feedbackSuccess: "Thanks for your feedback",
    feedbackFailed: "Could not submit feedback",
  },
  bn: {
    loading: "আর্টিকেল লোড হচ্ছে...",
    backToBlogs: "ব্লগে ফিরে যান",
    notFound: "আর্টিকেল পাওয়া যায়নি",
    readTimeFallback: "২ মিনিট পড়া",
    postedOn: "প্রকাশের তারিখ",
    views: "ভিউ",
    tags: "ট্যাগ",
    feedback: "এই আর্টিকেলটি কি সহায়ক ছিল?",
    yes: "হ্যাঁ",
    no: "না",
    loginToVote: "ভোট দিতে লগইন করুন",
    loadFailed: "আর্টিকেল লোড করা যায়নি",
    feedbackSuccess: "ফিডব্যাকের জন্য ধন্যবাদ",
    feedbackFailed: "ফিডব্যাক পাঠানো যায়নি",
  },
};

const BlogDetailsPage = ({ articleId }) => {
  const { isAuthenticated } = useAuth();
  const [language, setLanguage] = useState("en");
  const [loading, setLoading] = useState(true);
  const [article, setArticle] = useState(null);

  const t = useCallback(
    (key) => translations[language]?.[key] || translations.en[key] || key,
    [language],
  );

  useEffect(() => {
    const savedLang = localStorage.getItem("appLanguage") || "en";
    setLanguage(savedLang);
  }, []);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get(`/help/articles/${articleId}`);
        if (res.data?.success) {
          setArticle(res.data.data);
        } else {
          setArticle(null);
        }
      } catch (_err) {
        setArticle(null);
        Swal.fire({
          icon: "error",
          text: t("loadFailed"),
          timer: 2200,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
      } finally {
        setLoading(false);
      }
    };

    if (articleId) {
      fetchArticle();
    } else {
      setLoading(false);
      setArticle(null);
    }
  }, [articleId, t]);

  const submitFeedback = async (helpful) => {
    if (!article) return;

    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const res = await axiosInstance.post(
        `/help/articles/${article.articleId}/feedback`,
        { helpful },
        { headers },
      );

      if (res.data?.success) {
        Swal.fire({
          icon: "success",
          text: t("feedbackSuccess"),
          timer: 2000,
          showConfirmButton: false,
          toast: true,
          position: "top-end",
        });
        setArticle((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            helpful: helpful ? (prev.helpful || 0) + 1 : prev.helpful || 0,
            notHelpful: helpful ? prev.notHelpful || 0 : (prev.notHelpful || 0) + 1,
          };
        });
      }
    } catch (_err) {
      Swal.fire({
        icon: "error",
        text: t("feedbackFailed"),
        timer: 2200,
        showConfirmButton: false,
        toast: true,
        position: "top-end",
      });
    }
  };

  const formatted = useMemo(() => {
    if (!article) return null;

    return {
      ...article,
      title: language === "bn" ? article.title?.bn || article.title?.en : article.title?.en || article.title?.bn,
      body: language === "bn" ? article.body?.bn || article.body?.en : article.body?.en || article.body?.bn,
      category:
        language === "bn"
          ? article.category?.bn || article.category?.en
          : article.category?.en || article.category?.bn,
      readTime:
        language === "bn"
          ? article.readTime?.bn || translations.bn.readTimeFallback
          : article.readTime?.en || translations.en.readTimeFallback,
    };
  }, [article, language]);

  const formatDate = (date) => {
    if (!date) return "-";
    return new Date(date).toLocaleDateString(language === "bn" ? "bn-BD" : "en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-foreground/70 px-4">
        <Loader2 className="animate-spin text-primary mb-3" size={32} />
        <p>{t("loading")}</p>
      </div>
    );
  }

  if (!formatted) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-xl font-bold text-foreground">{t("notFound")}</h2>
        <Link
          href="/blogs"
          className="mt-4 inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-card"
        >
          <ArrowLeft size={16} /> {t("backToBlogs")}
        </Link>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-linear-to-b from-background to-card/20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Link
          href="/blogs"
          className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-semibold hover:bg-card"
        >
          <ArrowLeft size={16} /> {t("backToBlogs")}
        </Link>

        <article className="mt-5 rounded-2xl border border-border bg-card/80 p-5 sm:p-8">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <p className="text-4xl">{formatted.icon || "📄"}</p>
            {formatted.isPopular && (
              <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-amber-500/20 text-amber-700">
                Popular
              </span>
            )}
          </div>

          <h1 className="mt-3 text-2xl sm:text-3xl font-bold text-foreground leading-tight">{formatted.title}</h1>
          <p className="mt-2 text-sm text-primary font-semibold">{formatted.category}</p>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-foreground/60">
            <span className="inline-flex items-center gap-1.5">
              <Calendar size={14} /> {t("postedOn")}: {formatDate(formatted.createdAt)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Eye size={14} /> {formatted.views || 0} {t("views")}
            </span>
            <span>{formatted.readTime}</span>
          </div>

          <div className="mt-6 pt-5 border-t border-border/60 whitespace-pre-wrap leading-7 text-foreground/85 text-sm sm:text-base">
            {formatted.body}
          </div>

          {Array.isArray(formatted.tags) && formatted.tags.length > 0 && (
            <div className="mt-6 pt-5 border-t border-border/60">
              <p className="text-sm font-semibold text-foreground mb-2">{t("tags")}</p>
              <div className="flex flex-wrap gap-2">
                {formatted.tags.map((tag, idx) => (
                  <span
                    key={`${tag}-${idx}`}
                    className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    <Tag size={12} /> {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6 pt-5 border-t border-border/60">
            <p className="text-sm font-semibold text-foreground mb-3">{t("feedback")}</p>
            {isAuthenticated ? (
              <div className="flex flex-wrap gap-2.5">
                <button
                  onClick={() => submitFeedback(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 px-4 py-2 text-sm font-semibold"
                >
                  <ThumbsUp size={15} /> {t("yes")} ({formatted.helpful || 0})
                </button>
                <button
                  onClick={() => submitFeedback(false)}
                  className="inline-flex items-center gap-2 rounded-lg bg-rose-500/15 text-rose-700 dark:text-rose-400 px-4 py-2 text-sm font-semibold"
                >
                  <ThumbsDown size={15} /> {t("no")} ({formatted.notHelpful || 0})
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center rounded-lg bg-primary/10 text-primary px-4 py-2 text-sm font-semibold"
              >
                {t("loginToVote")}
              </Link>
            )}
          </div>
        </article>
      </div>
    </section>
  );
};

export default BlogDetailsPage;
