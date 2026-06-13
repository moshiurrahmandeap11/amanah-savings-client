"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Moon, Sun, Download, Share2, Camera } from "lucide-react";

const TaxCertificatePage = () => {
  const [isDark, setIsDark] = useState(false);
  const [year, setYear] = useState(2025);
  const [toast, setToast] = useState({ show: false, message: "" });
  const certificateRef = useRef(null);

  const goals = [
    { icon: "🏠", name: "Home Purchase", amount: "৳26,950", percent: 70 },
    { icon: "📱", name: "New Phone", amount: "৳8,470", percent: 22 },
    { icon: "✈️", name: "Travel Fund", amount: "৳3,080", percent: 8 },
  ];

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

  const toBangla = (num) => {
    return num.toString().replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[d]);
  };

  const changeYear = (delta) => {
    setYear((prev) => prev + delta);
  };

  const printDocument = () => {
    document.body.setAttribute(
      "data-print-date",
      new Date().toLocaleDateString(),
    );
    window.print();
    showToast("🖨️ Printing...");
  };

  const shareCertificate = () => {
    showToast("📤 Sharing...");
  };

  const saveAsImage = () => {
    showToast("🖼️ Image is being saved...");
  };

  const currentYear = year;
  const nextYear = year + 1;
  const banglaYear = toBangla(currentYear);
  const banglaNextYear = toBangla(nextYear);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Bar */}
      <div className="flex items-center gap-3 px-4 py-3 bg-primary/5 border-b border-primary/15 sticky top-0 z-50">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-primary text-sm font-semibold px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 transition"
        >
          <ArrowLeft size={14} /> Dashboard
        </Link>
        <span className="text-sm font-bold text-foreground flex-1">
          Tax Certificate
        </span>
      </div>

      {/* Header */}
      <div className="bg-linear-to-r from-primary to-primary-light px-4 py-4 flex items-center gap-3">
        <button
          onClick={() => window.history.back()}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1">
          🏅 Annual Savings Certificate
        </h1>
        <button
          onClick={toggleTheme}
          className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white"
        >
          {isDark ? <Sun size={16} /> : <Moon size={16} />}
        </button>
      </div>

      <div className="p-4 pb-24">
        {/* Year Selector */}
        <div className="flex items-center justify-between bg-card border border-border rounded-xl px-4 py-4 mb-4 shadow">
          <button
            onClick={() => changeYear(-1)}
            className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-lg hover:border-primary transition"
          >
            ‹
          </button>
          <div className="text-center">
            <div className="text-xl font-bold text-foreground">
              {banglaYear}-{banglaNextYear}
            </div>
            <div className="text-xs text-foreground/50">Financial Year</div>
          </div>
          <button
            onClick={() => changeYear(1)}
            className="w-9 h-9 rounded-full bg-background border border-border flex items-center justify-center text-lg hover:border-primary transition"
          >
            ›
          </button>
        </div>

        {/* Certificate */}
        <div className="bg-card rounded-xl border-2 border-primary shadow-lg overflow-hidden relative mb-4">
          <div className="absolute inset-1 border border-dashed border-primary/30 rounded-lg pointer-events-none" />

          {/* Certificate Header */}
          <div className="bg-linear-to-r from-primary to-primary-light pt-7 pb-6 text-center">
            <div className="text-white/80 text-[10px] tracking-wider uppercase mb-1">
              Amanah Savings Community
            </div>
            <div className="text-white text-xl font-bold mb-1">
              Annual Savings Certificate
            </div>
            <div className="text-white/75 text-xs">
              Annual Savings Certificate
            </div>
            <div className="w-16 h-16 rounded-full bg-white/20 border-2 border-white/40 mx-auto mt-3 flex items-center justify-center text-2xl">
              🌿
            </div>
          </div>

          {/* Certificate Body */}
          <div className="p-5">
            <div className="text-xs text-foreground/60 text-center mb-1">
              This certificate is presented to
            </div>
            <div className="text-2xl font-bold text-primary text-center mb-1 italic">
              Rahela Begum
            </div>
            <div className="text-xs text-foreground/60 text-center leading-relaxed mb-5">
              In recognition of consistent savings during the financial year{" "}
              {banglaYear}-{banglaNextYear}
            </div>

            <div className="bg-linear-to-r from-primary/10 to-primary-light/10 border border-primary/30 rounded-xl p-4 text-center mb-5">
              <div className="text-[10px] text-foreground/60 mb-1">
                Total Annual Savings
              </div>
              <div className="text-3xl font-bold text-primary">৳38,500</div>
              <div className="text-xs text-foreground/60 mt-1">
                July 2025 — June 2026
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-5">
              <div className="bg-background rounded-lg p-2 text-center border border-border">
                <div className="text-base font-bold text-foreground">96</div>
                <div className="text-[9px] text-foreground/50">Max Streak</div>
              </div>
              <div className="bg-background rounded-lg p-2 text-center border border-border">
                <div className="text-base font-bold text-foreground">48</div>
                <div className="text-[9px] text-foreground/50">
                  Total Deposits
                </div>
              </div>
              <div className="bg-background rounded-lg p-2 text-center border border-border">
                <div className="text-base font-bold text-foreground">🥈</div>
                <div className="text-[9px] text-foreground/50">Silver Tier</div>
              </div>
            </div>

            <div className="mb-5">
              <div className="text-xs font-bold text-foreground/60 uppercase tracking-wider mb-2">
                Savings by Goal
              </div>
              {goals.map((goal, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 py-2 border-b border-border last:border-0"
                >
                  <span className="text-base">{goal.icon}</span>
                  <div className="flex-1">
                    <div className="text-xs font-semibold text-foreground">
                      {goal.name}
                    </div>
                    <div className="h-1 bg-border rounded-full mt-1 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-linear-to-r from-primary to-primary-light"
                        style={{ width: `${goal.percent}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-primary">
                    {goal.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Certificate Footer */}
          <div className="border-t border-dashed border-border py-4 px-5 flex justify-between items-end">
            <div className="text-center">
              <div className="w-16 h-px bg-foreground/50 mx-auto mb-1" />
              <div className="text-[9px] text-foreground/50">
                Amanah Community
              </div>
              <div className="text-[8px] text-foreground/50">
                Digital Signature
              </div>
            </div>
            <div className="text-center">
              <div className="font-mono text-[9px] text-foreground/50">
                AMN-CERT-2026-001234
              </div>
              <div className="text-[8px] text-foreground/50">
                Certificate No.
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-px bg-foreground/50 mx-auto mb-1" />
              <div className="text-[9px] text-foreground/50">30 June 2026</div>
              <div className="text-[8px] text-foreground/50">Issue Date</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <button
            onClick={printDocument}
            className="py-3.5 rounded-xl bg-linear-to-r from-red-600 to-red-700 text-white text-sm font-bold flex items-center justify-center gap-2"
          >
            <Download size={16} /> PDF Download
          </button>
          <button
            onClick={shareCertificate}
            className="py-3.5 rounded-xl bg-linear-to-r from-primary to-primary-light text-white text-sm font-bold flex items-center justify-center gap-2"
          >
            <Share2 size={16} /> Share
          </button>
        </div>
        <button
          onClick={saveAsImage}
          className="w-full py-3 rounded-xl border-2 border-border bg-card text-foreground text-sm font-bold flex items-center justify-center gap-2"
        >
          <Camera size={16} /> Save as Image
        </button>
      </div>

      {/* Toast */}
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
    </div>
  );
};

export default TaxCertificatePage;
