"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Users, CheckCircle, AlertCircle, Gift } from "lucide-react";
import axiosInstance from "../../../../../components/shared/AxiosInstance/AxiosInstance";
import Swal from "sweetalert2";

const translations = {
  en: {
    joining: "Joining Circle...",
    joinSuccess: "Successfully Joined!",
    joinSuccessText: "You have successfully joined the circle.",
    joinFailed: "Failed to Join",
    invalidCode: "Invalid invite code",
    alreadyMember: "You are already a member",
    circleFull: "Circle is full",
    expired: "Invite link has expired",
    goToCircle: "Go to Circle",
    backToCircles: "Back to Circles",
    processing: "Processing your request...",
  },
  bn: {
    joining: "সার্কেলে যোগ দেওয়া হচ্ছে...",
    joinSuccess: "সফলভাবে যোগ দেওয়া হয়েছে!",
    joinSuccessText: "আপনি সফলভাবে সার্কেলে যোগ দিয়েছেন।",
    joinFailed: "যোগ দিতে ব্যর্থ",
    invalidCode: "অবৈধ আমন্ত্রণ কোড",
    alreadyMember: "আপনি ইতিমধ্যে সদস্য",
    circleFull: "সার্কেল পূর্ণ",
    expired: "আমন্ত্রণ লিংকের মেয়াদ শেষ",
    goToCircle: "সার্কেলে যান",
    backToCircles: "সার্কেলে ফিরে যান",
    processing: "আপনার অনুরোধ প্রক্রিয়া করা হচ্ছে...",
  }
};

const JoinCirclePage = () => {
  const { inviteCode } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [circleId, setCircleId] = useState("");
  const [lang, setLang] = useState("en");

  const t = (key) => translations[lang]?.[key] || translations.en[key] || key;

  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
  }, []);

  useEffect(() => {
    if (inviteCode) {
      joinCircle();
    }
  }, [inviteCode]);

  const joinCircle = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await axiosInstance.post(`/circles/join/${inviteCode}`);
      if (response.data.success) {
        setSuccess(true);
        setCircleId(response.data.data?.circleId || "");
        Swal.fire({
          title: t('joinSuccess'),
          text: t('joinSuccessText'),
          icon: "success",
          confirmButtonColor: "#059669",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    } catch (err) {
      const msg = err.response?.data?.message || t('joinFailed');
      setError(msg);
      Swal.fire({
        title: t('joinFailed'),
        text: msg,
        icon: "error",
        confirmButtonColor: "#dc2626",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
          <p className="text-foreground/60">{t('processing')}</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card border border-border rounded-2xl p-8 text-center max-w-md w-full"
        >
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={40} className="text-green-500" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{t('joinSuccess')}</h2>
          <p className="text-foreground/60 mb-6">{t('joinSuccessText')}</p>
          <div className="flex flex-col gap-3">
            {circleId && (
              <Link
                href={`/dashboard/circles/${circleId}`}
                className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
              >
                <Users size={18} /> {t('goToCircle')}
              </Link>
            )}
            <Link
              href="/dashboard/circles"
              className="w-full py-3 border border-border text-foreground rounded-xl font-semibold hover:border-primary transition flex items-center justify-center gap-2"
            >
              <ArrowLeft size={18} /> {t('backToCircles')}
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-2xl p-8 text-center max-w-md w-full"
      >
        <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle size={40} className="text-red-500" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">{t('joinFailed')}</h2>
        <p className="text-foreground/60 mb-6">{error}</p>
        <Link
          href="/dashboard/circles"
          className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <ArrowLeft size={18} /> {t('backToCircles')}
        </Link>
      </motion.div>
    </div>
  );
};

export default JoinCirclePage;
