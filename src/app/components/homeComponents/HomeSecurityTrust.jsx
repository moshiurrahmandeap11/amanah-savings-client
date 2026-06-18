"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Fingerprint,
  Lock,
  ScanFace,
  Smartphone,
  Vault,
} from "lucide-react";

const securityItems = [
  {
    Icon: ScanFace,
    title: "NID + Selfie Verification",
    description:
      "Every member is verified with their National ID card and live selfie before activating savings. No anonymous accounts.",
  },
  {
    Icon: Lock,
    title: "256-bit SSL Encryption",
    description:
      "All data transmitted and stored is encrypted with bank-grade 256-bit AES encryption. Your data never leaves secured servers.",
  },
  {
    Icon: Smartphone,
    title: "2-Factor Authentication",
    description:
      "Enable 2FA for an extra layer of account security. OTP via SMS + authenticator app support for maximum protection.",
  },
  {
    Icon: Fingerprint,
    title: "Fraud Detection AI",
    description:
      "Our AI monitors for suspicious activity, multi-account creation, and unusual login patterns — protecting the whole community.",
  },
  {
    Icon: Vault,
    title: "Locked Savings Vault",
    description:
      "Savings are locked until goal maturity. Early withdrawals require admin review and are strictly restricted to prevent impulsive spending.",
  },
  {
    Icon: Eye,
    title: "Full Transparency Ledger",
    description:
      "Every deposit, transaction, and movement is logged and viewable in your personal ledger. Complete transparency, zero hidden actions.",
  },
];

const HomeSecurityTrust = () => {
  return (
    <section
      id="security"
      className="bg-white py-16 font-['Inter','Noto_Sans_Bengali',sans-serif] text-[#0f172a] dark:bg-[#0a0f1e] dark:text-[#f1f5f9] md:py-24"
    >
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <span className="mb-4 inline-block rounded-full border border-[#059669]/15 bg-[#059669]/[0.08] px-4 py-1.5 text-[13px] font-semibold text-[#059669]">
          Security & Trust
        </span>

        <h2 className="mb-4 text-[clamp(28px,4vw,42px)] font-extrabold leading-[1.2] tracking-normal">
          Your Savings Are <span className="text-[#059669]">Safe With Us</span>
        </h2>

        <p className="mx-auto max-w-[580px] text-lg leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
          We built Amanah with security at its core. Multiple layers of
          protection keep your money and identity secure.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {securityItems.map((item, index) => (
            <SecurityCard key={item.title} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const SecurityCard = ({ item, index }) => {
  const { Icon } = item;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      viewport={{ once: true, margin: "-80px" }}
      className="group rounded-2xl border border-[#e2e8f0] bg-white p-7 text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#059669] dark:border-[#1e2d3d] dark:bg-[#1a2235]"
    >
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#059669]/10 text-[#059669]">
        <Icon size={22} strokeWidth={2.1} aria-hidden="true" />
      </div>

      <h3 className="mb-2 text-base font-bold text-[#0f172a] dark:text-[#f1f5f9]">
        {item.title}
      </h3>

      <p className="text-sm leading-[1.6] text-[#475569] dark:text-[#94a3b8]">
        {item.description}
      </p>
    </motion.div>
  );
};

export default HomeSecurityTrust;
