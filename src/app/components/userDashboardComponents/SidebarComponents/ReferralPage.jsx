"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Share2, Users, Gift, TrendingUp } from "lucide-react";

const ReferralPage = () => {
  const [copied, setCopied] = useState(false);
  const referralLink = "amanah.bd/ref/FATEMA24";
  const fullLink = "https://amanahsavings.com.bd/?ref=FATEMA24";

  const stats = [
    { value: "7", label: "Friends Referred", change: null },
    { value: "৳3,500", label: "Total Bonus Earned", change: null },
    { value: "5", label: "Active Referrals", change: null },
    { value: "৳2,500", label: "This Month", change: null },
  ];

  const referralHistory = [
    {
      name: "Amina Begum joined",
      date: "April 15, 2026 · First deposit made",
      amount: "+৳500",
      status: "bonus",
      badge: "Bonus Deposited",
    },
    {
      name: "Rahim Khan joined",
      date: "March 2, 2026 · First deposit made",
      amount: "+৳500",
      status: "bonus",
      badge: "Bonus Deposited",
    },
    {
      name: "Sadia Akter registered",
      date: "May 20, 2026 · Waiting for deposit",
      amount: "৳500",
      status: "pending",
      badge: "Pending",
    },
  ];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(fullLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnWhatsApp = () => {
    const message = `আমি Amanah Savings-এ সঞ্চয় করছি! তুমিও যোগ দাও: ${fullLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, "_blank");
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(fullLink)}`,
      "_blank",
    );
  };

  const shareOnSMS = () => {
    const message = `Amanah Savings-এ আমার সাথে সঞ্চয় শুরু করো: ${fullLink}`;
    window.location.href = `sms:?body=${encodeURIComponent(message)}`;
  };

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5">
        🤝 Referral Program
      </h2>

      {/* Referral Card */}
      <div className="bg-linear-to-r from-emerald-900 to-cyan-900 rounded-xl p-6 mb-6 text-white">
        <div className="text-xl font-bold mb-1">Invite Friends, Get ৳500!</div>
        <div className="text-sm text-white/80 mb-4">
          Both you and your friend get ৳500 bonus when they join and make their
          first deposit.
        </div>

        <div className="flex items-center justify-between bg-white/15 rounded-lg p-3 mb-4">
          <span className="font-mono text-sm flex-1 truncate">
            {referralLink}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>

        <div className="flex gap-3 mb-6">
          <button
            onClick={shareOnWhatsApp}
            className="flex-1 py-2.5 rounded-lg bg-white/15 text-white text-sm font-semibold hover:bg-white/25 transition"
          >
            📱 WhatsApp
          </button>
          <button
            onClick={shareOnFacebook}
            className="flex-1 py-2.5 rounded-lg bg-white/15 text-white text-sm font-semibold hover:bg-white/25 transition"
          >
            📘 Facebook
          </button>
          <button
            onClick={shareOnSMS}
            className="flex-1 py-2.5 rounded-lg bg-white/15 text-white text-sm font-semibold hover:bg-white/25 transition"
          >
            💌 SMS
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {stats.map((stat, idx) => (
            <div key={idx} className="bg-white/10 rounded-lg p-3 text-center">
              <div className="text-xl font-bold">{stat.value}</div>
              <div className="text-xs text-white/70 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Referral History Card */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="font-bold text-foreground mb-4 flex items-center gap-2">
          📋 Referral History
        </div>
        <div className="space-y-3">
          {referralHistory.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center gap-3 pb-3 border-b border-border last:border-0"
            >
              <div
                className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                  item.status === "bonus" ? "bg-primary/10" : "bg-amber-500/10"
                }`}
              >
                {item.status === "bonus" ? "👤" : "⏳"}
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-foreground">
                  {item.name}
                </div>
                <div className="text-xs text-foreground/50">{item.date}</div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    item.status === "bonus"
                      ? "bg-primary/10 text-primary"
                      : "bg-amber-500/10 text-amber-500"
                  }`}
                >
                  {item.badge}
                </span>
              </div>
              <div
                className={`font-bold text-sm ${item.status === "bonus" ? "text-primary" : "text-foreground/50"}`}
              >
                {item.amount}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Info Note */}
      <div className="mt-5 p-4 bg-primary/5 border border-primary/15 rounded-xl">
        <div className="flex gap-2">
          <Gift size={18} className="text-primary shrink-0 mt-0.5" />
          <div className="text-sm text-foreground/60">
            <strong className="text-foreground">How it works:</strong> Share
            your unique referral link with friends. When they sign up and make
            their first deposit of at least ৳500, both of you get ৳500 bonus
            credited to your savings account. No limit on referrals!
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReferralPage;
