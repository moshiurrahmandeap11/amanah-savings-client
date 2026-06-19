"use client";

import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Camera, Save, User, Phone, Mail, Calendar, Briefcase, MapPin, Award, Shield, FileText, Users } from "lucide-react";
import Image from "next/image";

// Translations
const translations = {
  en: {
    // Page Title
    pageTitle: "👤 Profile & KYC",
    
    // Profile Header
    goldMember: "🥇 Gold Member · Member since {date}",
    kycVerified: "✅ KYC Verified",
    level: "🌟 Level {level}",
    streak: "🔥 {days} Day Streak",
    totalSavings: "Total Savings",
    
    // Personal Info
    personalInfo: "✏️ Personal Information",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    emailAddress: "Email Address",
    dateOfBirth: "Date of Birth",
    occupation: "Occupation",
    divisionDistrict: "Division / District",
    thanaUpazila: "Thana / Upazila",
    saveProfile: "💾 Save Profile",
    
    // KYC Status
    kycVerification: "🪪 KYC Verification",
    verified: "✅ Verified",
    activate: "Activate",
    phoneLabel: "Phone Number",
    emailLabel: "Email",
    nidCard: "NID Card",
    selfieVerification: "Selfie Verification",
    twoFactorAuth: "2-Factor Auth (2FA)",
    notActive: "Not active",
    nidValue: "NID: {nid} · Expiry: {expiry}",
    selfieValue: "Live face matching completed",
    
    // Nominee Info
    nomineeInfo: "👨‍👩‍👧 Nominee Information",
    nomineeName: "Nominee Name",
    relationship: "Relationship",
    nomineePhone: "Nominee Phone",
    nomineeNid: "Nominee NID",
    updateNominee: "💾 Update Nominee",
    
    // Quick Links
    accountDocuments: "📋 Account Documents & Reports",
    monthlySavingsReport: "Monthly Savings Report",
    taxCertificate: "Tax Certificate",
    depositReceipt: "Deposit Receipt",
    kycStatus: "KYC Status",
    annualSummary: "Annual Summary",
    myBadges: "My Badges",
    
    // Toast Messages
    photoUpdated: "Profile photo updated successfully!",
    profileSaved: "Profile saved successfully!",
    nomineeUpdated: "Nominee information updated successfully!",
    twoFaSoon: "2FA activation will be available soon!",
    
    // Loading
    loading: "Loading...",
  },
  bn: {
    // Page Title
    pageTitle: "👤 প্রোফাইল ও কেওয়াইসি",
    
    // Profile Header
    goldMember: "🥇 গোল্ড সদস্য · {date} থেকে সদস্য",
    kycVerified: "✅ কেওয়াইসি যাচাইকৃত",
    level: "🌟 লেভেল {level}",
    streak: "🔥 {days} দিনের স্ট্রিক",
    totalSavings: "মোট সঞ্চয়",
    
    // Personal Info
    personalInfo: "✏️ ব্যক্তিগত তথ্য",
    fullName: "পূর্ণ নাম",
    phoneNumber: "মোবাইল নম্বর",
    emailAddress: "ইমেইল ঠিকানা",
    dateOfBirth: "জন্ম তারিখ",
    occupation: "পেশা",
    divisionDistrict: "বিভাগ / জেলা",
    thanaUpazila: "থানা / উপজেলা",
    saveProfile: "💾 প্রোফাইল সংরক্ষণ করুন",
    
    // KYC Status
    kycVerification: "🪪 কেওয়াইসি যাচাইকরণ",
    verified: "✅ যাচাইকৃত",
    activate: "সক্রিয় করুন",
    phoneLabel: "মোবাইল নম্বর",
    emailLabel: "ইমেইল",
    nidCard: "এনআইডি কার্ড",
    selfieVerification: "সেলফি যাচাই",
    twoFactorAuth: "২-ফ্যাক্টর অথেন্টিকেশন (২এফএ)",
    notActive: "সক্রিয় নয়",
    nidValue: "এনআইডি: {nid} · মেয়াদ: {expiry}",
    selfieValue: "লাইভ ফেস ম্যাচিং সম্পন্ন হয়েছে",
    
    // Nominee Info
    nomineeInfo: "👨‍👩‍👧 নমিনি তথ্য",
    nomineeName: "নমিনির নাম",
    relationship: "সম্পর্ক",
    nomineePhone: "নমিনির মোবাইল",
    nomineeNid: "নমিনির এনআইডি",
    updateNominee: "💾 নমিনি আপডেট করুন",
    
    // Quick Links
    accountDocuments: "📋 অ্যাকাউন্ট ডকুমেন্ট ও রিপোর্ট",
    monthlySavingsReport: "মাসিক সঞ্চয় রিপোর্ট",
    taxCertificate: "ট্যাক্স সার্টিফিকেট",
    depositReceipt: "জমার রসিদ",
    kycStatus: "কেওয়াইসি স্ট্যাটাস",
    annualSummary: "বার্ষিক সারাংশ",
    myBadges: "আমার ব্যাজ",
    
    // Toast Messages
    photoUpdated: "প্রোফাইল ছবি সফলভাবে আপডেট করা হয়েছে!",
    profileSaved: "প্রোফাইল সফলভাবে সংরক্ষণ করা হয়েছে!",
    nomineeUpdated: "নমিনি তথ্য সফলভাবে আপডেট করা হয়েছে!",
    twoFaSoon: "২এফএ সক্রিয়করণ শীঘ্রই উপলব্ধ হবে!",
    
    // Loading
    loading: "লোড হচ্ছে...",
  }
};

const ProfilePage = () => {
  const [lang, setLang] = useState("en");
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

  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Get language from localStorage
  React.useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLang(savedLang);
  }, []);

  const kycStatus = [
    { 
      icon: "📱", 
      label: t('phoneLabel'), 
      value: "+880 1712-345678", 
      verified: true 
    },
    { 
      icon: "📧", 
      label: t('emailLabel'), 
      value: "fatema@email.com", 
      verified: true 
    },
    { 
      icon: "🪪", 
      label: t('nidCard'), 
      value: t('nidValue', { nid: "1991XXXXXXXX", expiry: "2030" }), 
      verified: true 
    },
    { 
      icon: "🤳", 
      label: t('selfieVerification'), 
      value: t('selfieValue'), 
      verified: true 
    },
    { 
      icon: "🔐", 
      label: t('twoFactorAuth'), 
      value: t('notActive'), 
      verified: false, 
      action: true 
    }
  ];

  const quickLinks = [
    { icon: "📊", label: t('monthlySavingsReport'), href: "/dashboard/savings-report" },
    { icon: "📄", label: t('taxCertificate'), href: "/dashboard/tax-certificate" },
    { icon: "🧾", label: t('depositReceipt'), href: "/dashboard/invoice" },
    { icon: "🪪", label: t('kycStatus'), href: "/dashboard/kyc-status" },
    { icon: "🗓️", label: t('annualSummary'), href: "/dashboard/year-in-review" },
    { icon: "🏅", label: t('myBadges'), href: "/dashboard/badge-share" }
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
        showToastMessage(t('photoUpdated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const saveProfile = () => {
    showToastMessage(t('profileSaved'));
  };

  const saveNominee = () => {
    showToastMessage(t('nomineeUpdated'));
  };

  const activate2FA = () => {
    showToastMessage(t('twoFaSoon'));
  };

  return (
    <div className="max-w-full mx-auto">
      <h2 className="text-2xl font-bold text-foreground mb-5">{t('pageTitle')}</h2>

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
            <div className="text-sm text-white/80 mb-2">
              {t('goldMember', { date: "January 2025" })}
            </div>
            <div className="flex gap-2 flex-wrap">
              <span className="px-2 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold">{t('kycVerified')}</span>
              <span className="px-2 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold">{t('level', { level: 7 })}</span>
              <span className="px-2 py-1 rounded-lg bg-white/20 text-white text-xs font-semibold">{t('streak', { days: 90 })}</span>
            </div>
          </div>
          
          {/* Total Savings */}
          <div className="text-center">
            <div className="text-3xl font-bold">৳২,৪৫,৫০০</div>
            <div className="text-xs text-white/80">{t('totalSavings')}</div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid md:grid-cols-2 gap-5 mb-5">
        {/* Personal Info Card */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4 flex items-center gap-2">{t('personalInfo')}</div>
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('fullName')}</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.name} onChange={(e) => setProfile({...profile, name: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('phoneNumber')}</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.phone} onChange={(e) => setProfile({...profile, phone: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('emailAddress')}</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('dateOfBirth')}</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.dob} onChange={(e) => setProfile({...profile, dob: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('occupation')}</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.occupation} onChange={(e) => setProfile({...profile, occupation: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('divisionDistrict')}</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.city} onChange={(e) => setProfile({...profile, city: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('thanaUpazila')}</label>
              <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={profile.thana} onChange={(e) => setProfile({...profile, thana: e.target.value})} />
            </div>
            <button onClick={saveProfile} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition">{t('saveProfile')}</button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-5">
          {/* KYC Status Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">{t('kycVerification')}</div>
            <div className="space-y-3">
              {kycStatus.map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-primary/5 border border-primary/20 flex items-center gap-3">
                  <span className="text-xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-sm text-foreground">{item.label}</div>
                    <div className="text-xs text-foreground/50">{item.value}</div>
                  </div>
                  {item.verified ? (
                    <span className="text-primary text-xs font-bold">{t('verified')}</span>
                  ) : (
                    <button onClick={activate2FA} className="px-3 py-1 rounded-lg bg-linear-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold">{t('activate')}</button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Nominee Info Card */}
          <div className="bg-card border border-border rounded-xl p-5">
            <div className="font-bold text-foreground mb-4 flex items-center gap-2">{t('nomineeInfo')}</div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('nomineeName')}</label>
                <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={nominee.name} onChange={(e) => setNominee({...nominee, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('relationship')}</label>
                <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={nominee.relation} onChange={(e) => setNominee({...nominee, relation: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('nomineePhone')}</label>
                <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={nominee.phone} onChange={(e) => setNominee({...nominee, phone: e.target.value})} />
              </div>
              <div>
                <label className="block text-xs font-semibold text-foreground/70 mb-1 uppercase tracking-wide">{t('nomineeNid')}</label>
                <input className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary transition" value={nominee.nid} onChange={(e) => setNominee({...nominee, nid: e.target.value})} />
              </div>
              <button onClick={saveNominee} className="w-full py-3 rounded-xl border-2 border-primary/30 text-primary font-semibold hover:bg-primary/5 transition">{t('updateNominee')}</button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Links Card */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="font-bold text-foreground mb-4 flex items-center gap-2">{t('accountDocuments')}</div>
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