"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, Save, User, Phone, Mail, Calendar, Briefcase, MapPin, Award, Shield, FileText, Users } from "lucide-react";
import Image from "next/image";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Fatema Akter",
    phone: "+880 1712-345678",
    email: "fatema@email.com",
    dob: "15 March 1995",
    occupation: "শিক্ষক",
    city: "ঢাকা বিভাগ, ঢাকা জেলা",
    thana: "মিরপুর"
  });

  const [nominee, setNominee] = useState({
    name: "Mohammad Karim",
    relation: "স্বামী",
    phone: "+880 1987-654321",
    nid: "198XXXXXXXXX"
  });

  const [avatar, setAvatar] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const fileInputRef = useRef(null);

  const kycStatus = [
    { icon: "📱", label: "Phone Number", value: "+880 1712-345678", verified: true },
    { icon: "📧", label: "Email", value: "fatema@email.com", verified: true },
    { icon: "🪪", label: "NID Card", value: "NID: 1991XXXXXXXX · Expiry: 2030", verified: true },
    { icon: "🤳", label: "Selfie Verification", value: "Live face matching completed", verified: true },
    { icon: "🔐", label: "2-Factor Auth (2FA)", value: "Not active", verified: false, action: true }
  ];

  const quickLinks = [
    { icon: "📊", label: "Monthly Savings Report", href: "/dashboard/savings-report" },
    { icon: "📄", label: "Tax Certificate", href: "/dashboard/tax-certificate" },
    { icon: "🧾", label: "Deposit Receipt", href: "/dashboard/invoice" },
    { icon: "🪪", label: "KYC Status", href: "/dashboard/kyc-status" },
    { icon: "🗓️", label: "Annual Summary", href: "/dashboard/year-in-review" },
    { icon: "🏅", label: "My Badges", href: "/dashboard/badge-share" }
  ];

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        showToastMessage("Profile photo updated successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    showToastMessage("Profile saved successfully!");
  };

  const saveNominee = () => {
    showToastMessage("Nominee information updated successfully!");
  };

  const activate2FA = () => {
    showToastMessage("2FA activation will be available soon!");
  };

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5">👤 Profile & KYC</h2>

      {/* Profile Header Card */}
      <div className="bg-linear-to-r from-primary to-primary-light rounded-xl p-6 mb-5 text-white">
        <div className="flex flex-wrap items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            <div 
              className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center text-3xl font-bold text-white border-4 border-white/40 cursor-pointer overflow-hidden"
              onClick={() => fileInputRef.current?.click()}
            >
              {avatar ? (
                <Image src={avatar} alt="Profile" width={100} height={100} className="w-full h-full object-cover" />
              ) : (
                "F"
              )}
            </div>
            <div 
              className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-white flex items-center justify-center text-xs cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            >
              📷
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <div className="text-xl font-bold">{profile.name}</div>
            <div className="text-sm text-white/80 mb-2">🥇 Gold Member · Member since January 2025</div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold">✅ KYC Verified</span>
              <span className="px-2 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold">🌟 Level 7</span>
              <span className="px-2 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold">🔥 90 Day Streak</span>
            </div>
          </div>
          
          {/* Total Savings */}
          <div className="text-center">
            <div className="text-3xl font-bold">৳২,৪৫,৫০০</div>
            <div className="text-xs text-white/80">Total Savings</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {/* Personal Info Card */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">✏️ Personal Information</div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Full Name</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Phone Number</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Email Address</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Date of Birth</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.dob} onChange={(e) => setProfile({...profile, dob: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Occupation</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.occupation} onChange={(e) => setProfile({...profile, occupation: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Division / District</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.city} onChange={(e) => setProfile({...profile, city: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Thana / Upazila</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.thana} onChange={(e) => setProfile({...profile, thana: e.target.value})} />
            </div>
            <button onClick={saveProfile} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition">💾 Save Profile</button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* KYC Status Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">🪪 KYC Verification</div>
            <div className="space-y-3">
              {kycStatus.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">{item.label}</div>
                    <div className="text-xs text-foreground/50">{item.value}</div>
                  </div>
                  {item.verified ? (
                    <span className="text-primary text-xs font-bold">✅ Verified</span>
                  ) : (
                    <button onClick={activate2FA} className="px-3 py-1 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold">Activate</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Nominee Info Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">👨‍👩‍👧 Nominee Information</div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Nominee Name</label>
                <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={nominee.name} onChange={(e) => setNominee({...nominee, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Relationship</label>
                <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={nominee.relation} onChange={(e) => setNominee({...nominee, relation: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Nominee Phone</label>
                <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={nominee.phone} onChange={(e) => setNominee({...nominee, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">Nominee NID</label>
                <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={nominee.nid} onChange={(e) => setNominee({...nominee, nid: e.target.value})} />
              </div>
              <button onClick={saveNominee} className="w-full py-3 rounded-xl border-2 border-primary/30 text-primary font-semibold hover:bg-primary/5 transition">💾 Update Nominee</button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Card */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="font-bold text-foreground mb-4 flex items-center gap-2">📋 Account Documents & Reports</div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {quickLinks.map((link, idx) => (
            <Link key={idx} href={link.href} className="flex items-center gap-2 p-3 rounded-lg border border-border bg-background text-foreground text-sm font-semibold hover:border-primary hover:text-primary transition">
              {link.icon} {link.label}
            </Link>
          ))}
        </div>
      </div>

      {/* Toast */}
      {showToast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-gray-800 text-white px-5 py-3 rounded-full text-sm shadow-lg animate-in fade-in slide-in-from-bottom-4">
          {toastMessage}
        </div>
      )}
    </div>
  );
};

export default ProfilePage;