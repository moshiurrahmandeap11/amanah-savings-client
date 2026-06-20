"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Check } from "lucide-react";

// Translations
const translations = {
  en: {
    // Step Header
    stepLabel: "Step 7 / 8",
    verifyIdentity: "Verify Identity",
    kycDesc: "KYC is mandatory to activate your account. Our team will verify within 4 hours.",
    
    // Labels
    nidNumber: "NID Number *",
    nidPlaceholder: "Enter 10 or 17 digit NID",
    kycConsent: "KYC Consent",
    kycConsentDesc: "I confirm that the documents provided are my own and the information is accurate.",
    
    // Info Box
    secureDocs: "Your documents are completely secure. All KYC files are encrypted. Never shared with third parties.",
    
    // Buttons
    nextButton: "Next — Payment Info →",
    previous: "← Previous",
    
    // Validation
    kycConsentRequired: "Please agree to KYC consent",
  },
  bn: {
    // Step Header
    stepLabel: "ধাপ ৭ / ৮",
    verifyIdentity: "পরিচয় যাচাই করুন",
    kycDesc: "আপনার অ্যাকাউন্ট সক্রিয় করতে কেওয়াইসি বাধ্যতামূলক। আমাদের টিম ৪ ঘন্টার মধ্যে যাচাই করবে।",
    
    // Labels
    nidNumber: "এনআইডি নম্বর *",
    nidPlaceholder: "১০ বা ১৭ অঙ্কের এনআইডি দিন",
    kycConsent: "কেওয়াইসি সম্মতি",
    kycConsentDesc: "আমি নিশ্চিত করছি যে প্রদত্ত নথিগুলি আমার নিজের এবং তথ্যগুলি সঠিক।",
    
    // Info Box
    secureDocs: "আপনার নথিগুলি সম্পূর্ণ নিরাপদ। সমস্ত কেওয়াইসি ফাইল এনক্রিপ্ট করা। কখনও তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।",
    
    // Buttons
    nextButton: "পরবর্তী — পেমেন্ট তথ্য →",
    previous: "← পূর্ববর্তী",
    
    // Validation
    kycConsentRequired: "দয়া করে কেওয়াইসি সম্মতিতে সম্মত হন",
  }
};

const Step7Kyc = ({ formData, updateField, errors, handleNext, handleBack, lang = "bn" }) => {
  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">{t('stepLabel')}</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{t('verifyIdentity')}</h2>
      <p className="text-foreground/60 mb-6">{t('kycDesc')}</p>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('nidNumber')}</label>
        <input 
          type="text" 
          value={formData.nidNumber} 
          onChange={(e) => updateField("nidNumber", e.target.value)} 
          className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" 
          placeholder={t('nidPlaceholder')} 
        />
      </div>

      <div className="mb-4">
        <div 
          className="flex items-center justify-between p-4 bg-primary/5 border border-primary/20 rounded-xl cursor-pointer" 
          onClick={() => updateField("kycConsent", !formData.kycConsent)}
        >
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-primary" />
            <div>
              <h4 className="font-semibold">{t('kycConsent')}</h4>
              <p className="text-xs text-foreground/60">{t('kycConsentDesc')}</p>
            </div>
          </div>
          <div className={`w-6 h-6 rounded-md border-2 flex items-center justify-center ${formData.kycConsent ? "bg-primary border-primary" : "border-border"}`}>
            {formData.kycConsent && <Check size={14} className="text-white" />}
          </div>
        </div>
        {errors.kycConsent && <p className="text-xs text-red-500 mt-1">{errors.kycConsent}</p>}
      </div>

      <div className="info-box p-3 bg-primary/5 border border-primary/20 rounded-xl text-xs text-foreground/60 flex gap-2 mb-6">
        <Shield size={16} className="text-primary shrink-0" />
        <span>{t('secureDocs')}</span>
      </div>

      <button 
        onClick={handleNext} 
        className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
      >
        {t('nextButton')}
      </button>
      <button 
        onClick={handleBack} 
        className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition"
      >
        {t('previous')}
      </button>
    </motion.div>
  );
};

export default Step7Kyc;