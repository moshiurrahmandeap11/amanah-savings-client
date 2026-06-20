"use client";

import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

// Translations
const translations = {
  en: {
    // Step Header
    stepLabel: "Step 4 / 8",
    nomineePerson: "Nominee Person",
    nomineeDesc: "The person who will receive your savings in your absence.",
    
    // Labels
    firstName: "First Name *",
    lastName: "Last Name",
    relationship: "Relationship *",
    selectRelationship: "Select Relationship",
    spouse: "Spouse",
    father: "Father",
    mother: "Mother",
    son: "Son",
    daughter: "Daughter",
    brother: "Brother",
    sister: "Sister",
    other: "Other",
    mobileNumber: "Mobile Number *",
    nidNumber: "NID Number (Optional)",
    shareOfSavings: "Share of Savings (%)",
    fullSavings: "100% — Full savings",
    
    // Buttons
    nextButton: "Next — Choose Plan →",
    previous: "← Previous",
    
    // Validation
    nomineeFirstNameRequired: "Nominee first name required",
    selectRelationshipRequired: "Please select relationship",
    validNomineePhoneRequired: "Valid nominee phone required",
    
    // Warning
    nomineeWarning: "ℹ️ Nominee information can be updated later from your profile. This is not a legal document.",
  },
  bn: {
    // Step Header
    stepLabel: "ধাপ ৪ / ৮",
    nomineePerson: "উত্তরাধিকারী",
    nomineeDesc: "আপনার অনুপস্থিতিতে আপনার সঞ্চয় গ্রহণ করবেন এমন ব্যক্তি।",
    
    // Labels
    firstName: "নামের প্রথম অংশ *",
    lastName: "নামের শেষ অংশ",
    relationship: "সম্পর্ক *",
    selectRelationship: "সম্পর্ক নির্বাচন",
    spouse: "স্বামী/স্ত্রী",
    father: "পিতা",
    mother: "মাতা",
    son: "পুত্র",
    daughter: "কন্যা",
    brother: "ভাই",
    sister: "বোন",
    other: "অন্যান্য",
    mobileNumber: "মোবাইল নম্বর *",
    nidNumber: "এনআইডি নম্বর (ঐচ্ছিক)",
    shareOfSavings: "সঞ্চয়ের ভাগ (%)",
    fullSavings: "১০০% — সম্পূর্ণ সঞ্চয়",
    
    // Buttons
    nextButton: "পরবর্তী — প্ল্যান নির্বাচন →",
    previous: "← পূর্ববর্তী",
    
    // Validation
    nomineeFirstNameRequired: "উত্তরাধিকারীর নামের প্রথম অংশ প্রয়োজন",
    selectRelationshipRequired: "দয়া করে সম্পর্ক নির্বাচন করুন",
    validNomineePhoneRequired: "বৈধ উত্তরাধিকারীর ফোন প্রয়োজন",
    
    // Warning
    nomineeWarning: "ℹ️ মনোনীত ব্যক্তির তথ্য পরে প্রোফাইল থেকে পরিবর্তন করা যাবে। এটি কোনো আইনি দলিল নয়।",
  }
};

const Step4Nominee = ({ formData, updateField, errors, handleNext, handleBack, lang = "bn" }) => {
  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const validateStep = () => {
    const newErrors = {};
    if (!formData.nomineeFirstName) newErrors.nomineeFirstName = t('nomineeFirstNameRequired');
    if (!formData.nomineeRelation) newErrors.nomineeRelation = t('selectRelationshipRequired');
    if (!formData.nomineePhone || formData.nomineePhone.length < 10) newErrors.nomineePhone = t('validNomineePhoneRequired');
    if (Object.keys(newErrors).length === 0) handleNext();
    else return;
  };

  // Get relationship options with translations
  const getRelationshipOptions = () => [
    { value: "", label: t('selectRelationship') },
    { value: "Spouse", label: t('spouse') },
    { value: "Father", label: t('father') },
    { value: "Mother", label: t('mother') },
    { value: "Son", label: t('son') },
    { value: "Daughter", label: t('daughter') },
    { value: "Brother", label: t('brother') },
    { value: "Sister", label: t('sister') },
    { value: "Other", label: t('other') },
  ];

  // Get share options with translations
  const getShareOptions = () => [
    { value: "100", label: t('fullSavings') },
    { value: "75", label: "75%" },
    { value: "50", label: "50%" },
    { value: "25", label: "25%" },
  ];

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">{t('stepLabel')}</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{t('nomineePerson')}</h2>
      <p className="text-foreground/60 mb-6">{t('nomineeDesc')}</p>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('firstName')}</label>
          <input type="text" value={formData.nomineeFirstName} onChange={(e) => updateField("nomineeFirstName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" />
          {errors.nomineeFirstName && <p className="text-xs text-red-500 mt-1">{errors.nomineeFirstName}</p>}
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('lastName')}</label>
          <input type="text" value={formData.nomineeLastName} onChange={(e) => updateField("nomineeLastName", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('relationship')}</label>
        <select value={formData.nomineeRelation} onChange={(e) => updateField("nomineeRelation", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary">
          {getRelationshipOptions().map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.nomineeRelation && <p className="text-xs text-red-500 mt-1">{errors.nomineeRelation}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('mobileNumber')}</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-xl border border-r-0 border-border bg-background">+880</span>
          <input type="tel" value={formData.nomineePhone} onChange={(e) => updateField("nomineePhone", e.target.value.replace(/\D/g, "").slice(0, 11))} className="flex-1 p-3 rounded-r-xl border border-border bg-background text-foreground outline-none focus:border-primary" />
        </div>
        {errors.nomineePhone && <p className="text-xs text-red-500 mt-1">{errors.nomineePhone}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('nidNumber')}</label>
        <input type="text" value={formData.nomineeNid} onChange={(e) => updateField("nomineeNid", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('shareOfSavings')}</label>
        <select value={formData.nomineeShare} onChange={(e) => updateField("nomineeShare", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary">
          {getShareOptions().map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Warning Message */}
      <div className="mt-4 p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 flex items-start gap-2">
        <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-700 dark:text-amber-400 leading-relaxed">
          {t('nomineeWarning')}
        </p>
      </div>

      <button onClick={validateStep} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mt-4 mb-3">{t('nextButton')}</button>
      <button onClick={handleBack} className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition">{t('previous')}</button>
    </motion.div>
  );
};

export default Step4Nominee;