"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

// Translations
const translations = {
  en: {
    // Step Header
    stepLabel: "Step 3 / 8",
    tellUsAboutYou: "Tell us about you",
    personalizeExperience: "We need this to personalize your savings experience",
    
    // Labels
    dateOfBirth: "Date of Birth *",
    gender: "Gender",
    selectGender: "Select",
    male: "Male",
    female: "Female",
    other: "Other",
    preferNotSay: "Prefer not to say",
    division: "Division",
    selectDivision: "Select Division",
    district: "District",
    selectDistrict: "Select District",
    upazila: "Upazila / Area",
    upazilaPlaceholder: "e.g. Gulshan, Mirpur",
    occupation: "Occupation *",
    selectOccupation: "Select Occupation",
    student: "Student",
    govtEmployee: "Govt. Employee",
    privateEmployee: "Private Employee",
    businessOwner: "Business Owner",
    freelancer: "Freelancer",
    homemaker: "Homemaker",
    farmer: "Farmer",
    engineer: "Engineer",
    doctor: "Doctor",
    teacher: "Teacher",
    other: "Other",
    monthlyIncome: "Monthly Income Range *",
    selectIncome: "Select Income Range",
    below10k: "Below ৳10,000",
    range10_25k: "৳10,000 – ৳25,000",
    range25_50k: "৳25,000 – ৳50,000",
    range50_100k: "৳50,000 – ৳1,00,000",
    above100k: "Above ৳1,00,000",
    preferNotSayIncome: "Prefer not to say",
    referralCode: "Referral Code (Optional)",
    referralPlaceholder: "e.g. FATEMA2024",
    referralValid: "✅ Referral code is valid! You'll get a bonus.",
    referralInvalid: "❌ Invalid referral code. Please check and try again.",
    checkingReferral: "Checking referral code...",
    currentAddress: "Current Address",
    village: "Village / Area / Street",
    postOffice: "Post Office",
    postCode: "Post Code",
    
    // Buttons
    nextButton: "Next — Nominee Person →",
    previous: "← Previous",
    
    // Validation
    selectOccupation: "Please select occupation",
    selectIncome: "Please select income range",
  },
  bn: {
    // Step Header
    stepLabel: "ধাপ ৩ / ৮",
    tellUsAboutYou: "আপনার সম্পর্কে বলুন",
    personalizeExperience: "আপনার সঞ্চয় অভিজ্ঞতা ব্যক্তিগতকরণের জন্য এটি প্রয়োজন",
    
    // Labels
    dateOfBirth: "জন্ম তারিখ *",
    gender: "লিঙ্গ",
    selectGender: "নির্বাচন",
    male: "পুরুষ",
    female: "মহিলা",
    other: "অন্যান্য",
    preferNotSay: "উত্তর দিতে চাই না",
    division: "বিভাগ",
    selectDivision: "বিভাগ নির্বাচন",
    district: "জেলা",
    selectDistrict: "জেলা নির্বাচন",
    upazila: "উপজেলা / এলাকা",
    upazilaPlaceholder: "যেমন: গুলশান, মিরপুর",
    occupation: "পেশা *",
    selectOccupation: "পেশা নির্বাচন",
    student: "ছাত্র",
    govtEmployee: "সরকারি কর্মচারী",
    privateEmployee: "বেসরকারি কর্মচারী",
    businessOwner: "ব্যবসায়ী",
    freelancer: "ফ্রিল্যান্সার",
    homemaker: "গৃহিণী",
    farmer: "কৃষক",
    engineer: "ইঞ্জিনিয়ার",
    doctor: "ডাক্তার",
    teacher: "শিক্ষক",
    other: "অন্যান্য",
    monthlyIncome: "মাসিক আয়ের পরিসর *",
    selectIncome: "আয়ের পরিসর নির্বাচন",
    below10k: "৳১০,০০০ এর নিচে",
    range10_25k: "৳১০,০০০ – ৳২৫,০০০",
    range25_50k: "৳২৫,০০০ – ৳৫০,০০০",
    range50_100k: "৳৫০,০০০ – ৳১,০০,০০০",
    above100k: "৳১,০০,০০০ এর উপরে",
    preferNotSayIncome: "উত্তর দিতে চাই না",
    referralCode: "রেফারেল কোড (ঐচ্ছিক)",
    referralPlaceholder: "যেমন: FATEMA2024",
    referralValid: "✅ রেফারেল কোড সঠিক! আপনি বোনাস পাবেন।",
    referralInvalid: "❌ ভুল রেফারেল কোড। দয়া করে চেক করে আবার চেষ্টা করুন।",
    checkingReferral: "রেফারেল কোড যাচাই করা হচ্ছে...",
    currentAddress: "বর্তমান ঠিকানা",
    village: "গ্রাম / এলাকা / রাস্তা",
    postOffice: "পোস্ট অফিস",
    postCode: "পোস্ট কোড",
    
    // Buttons
    nextButton: "পরবর্তী — উত্তরাধিকারী →",
    previous: "← পূর্ববর্তী",
    
    // Validation
    selectOccupation: "দয়া করে পেশা নির্বাচন করুন",
    selectIncome: "দয়া করে আয়ের পরিসর নির্বাচন করুন",
  }
};

const Step3Personal = ({ formData, updateField, errors, districts, handleNext, handleBack, lang = "bn" }) => {
  const [referralStatus, setReferralStatus] = useState(null); // null, 'valid', 'invalid', 'checking'
  const [referralMessage, setReferralMessage] = useState("");
  const [debounceTimer, setDebounceTimer] = useState(null);

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
    if (!formData.occupation) newErrors.occupation = t('selectOccupation');
    if (!formData.income) newErrors.income = t('selectIncome');
    if (Object.keys(newErrors).length === 0) handleNext();
    else return;
  };

  // Check referral code validity
  const checkReferralCode = async (code) => {
    if (!code || code.length < 4) {
      setReferralStatus(null);
      setReferralMessage("");
      return;
    }

    setReferralStatus("checking");
    setReferralMessage(t('checkingReferral'));

    try {
      const response = await axiosInstance.get(`/users/validate-referral/${code.toUpperCase()}`);
      if (response.data.success) {
        setReferralStatus("valid");
        setReferralMessage(t('referralValid'));
        // Store the valid referral code in uppercase
        updateField("referralCode", code.toUpperCase());
      } else {
        setReferralStatus("invalid");
        setReferralMessage(t('referralInvalid'));
      }
    } catch (error) {
      setReferralStatus("invalid");
      setReferralMessage(t('referralInvalid'));
    }
  };

  // Handle referral code change with debounce
  const handleReferralChange = (value) => {
    const upperValue = value.toUpperCase();
    updateField("referralCode", upperValue);

    // Clear previous timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set new timer for debounce (500ms)
    const timer = setTimeout(() => {
      checkReferralCode(upperValue);
    }, 500);
    setDebounceTimer(timer);
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimer) {
        clearTimeout(debounceTimer);
      }
    };
  }, [debounceTimer]);

  // Get gender options with translations
  const getGenderOptions = () => [
    { value: "", label: t('selectGender') },
    { value: "Male", label: t('male') },
    { value: "Female", label: t('female') },
    { value: "Other", label: t('other') },
    { value: "Prefer not to say", label: t('preferNotSay') },
  ];

  // Get occupation options with translations
  const getOccupationOptions = () => [
    { value: "", label: t('selectOccupation') },
    { value: "Student", label: t('student') },
    { value: "Govt. Employee", label: t('govtEmployee') },
    { value: "Private Employee", label: t('privateEmployee') },
    { value: "Business Owner", label: t('businessOwner') },
    { value: "Freelancer", label: t('freelancer') },
    { value: "Homemaker", label: t('homemaker') },
    { value: "Farmer", label: t('farmer') },
    { value: "Engineer", label: t('engineer') },
    { value: "Doctor", label: t('doctor') },
    { value: "Teacher", label: t('teacher') },
    { value: "Other", label: t('other') },
  ];

  // Get income options with translations
  const getIncomeOptions = () => [
    { value: "", label: t('selectIncome') },
    { value: "Below ৳10,000", label: t('below10k') },
    { value: "৳10,000 – ৳25,000", label: t('range10_25k') },
    { value: "৳25,000 – ৳50,000", label: t('range25_50k') },
    { value: "৳50,000 – ৳1,00,000", label: t('range50_100k') },
    { value: "Above ৳1,00,000", label: t('above100k') },
    { value: "Prefer not to say", label: t('preferNotSayIncome') },
  ];

  // Get referral status icon and color
  const getReferralStatusStyle = () => {
    if (referralStatus === "valid") {
      return {
        icon: <CheckCircle size={16} className="text-green-500" />,
        textColor: "text-green-500",
        bgColor: "bg-green-50 dark:bg-green-950/30",
        borderColor: "border-green-500/30",
      };
    } else if (referralStatus === "invalid") {
      return {
        icon: <XCircle size={16} className="text-red-500" />,
        textColor: "text-red-500",
        bgColor: "bg-red-50 dark:bg-red-950/30",
        borderColor: "border-red-500/30",
      };
    } else if (referralStatus === "checking") {
      return {
        icon: <Loader2 size={16} className="animate-spin text-primary" />,
        textColor: "text-primary",
        bgColor: "bg-primary/5",
        borderColor: "border-primary/20",
      };
    }
    return null;
  };

  const statusStyle = getReferralStatusStyle();

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">{t('stepLabel')}</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{t('tellUsAboutYou')}</h2>
      <p className="text-foreground/60 mb-6">{t('personalizeExperience')}</p>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('dateOfBirth')}</label>
        <input type="date" value={formData.dob} onChange={(e) => updateField("dob", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" />
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('gender')}</label>
        <select value={formData.gender} onChange={(e) => updateField("gender", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary">
          {getGenderOptions().map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('division')}</label>
          <select value={formData.division} onChange={(e) => { updateField("division", e.target.value); updateField("district", ""); }} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary">
            <option value="">{t('selectDivision')}</option>
            {Object.keys(districts).map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('district')}</label>
          <select value={formData.district} onChange={(e) => updateField("district", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary">
            <option value="">{t('selectDistrict')}</option>
            {formData.division && districts[formData.division]?.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('upazila')}</label>
        <input type="text" value={formData.upazila} onChange={(e) => updateField("upazila", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder={t('upazilaPlaceholder')} />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('occupation')}</label>
        <select value={formData.occupation} onChange={(e) => updateField("occupation", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary">
          {getOccupationOptions().map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.occupation && <p className="text-xs text-red-500 mt-1">{errors.occupation}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('monthlyIncome')}</label>
        <select value={formData.income} onChange={(e) => updateField("income", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary">
          {getIncomeOptions().map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {errors.income && <p className="text-xs text-red-500 mt-1">{errors.income}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('referralCode')}</label>
        <input 
          type="text" 
          value={formData.referralCode} 
          onChange={(e) => handleReferralChange(e.target.value)} 
          className={`w-full p-3 rounded-xl border ${statusStyle ? statusStyle.borderColor : 'border-border'} bg-background text-foreground outline-none focus:border-primary uppercase`} 
          placeholder={t('referralPlaceholder')} 
        />
        {referralStatus && (
          <div className={`mt-2 flex items-center gap-2 text-sm ${statusStyle.textColor}`}>
            {statusStyle.icon}
            <span>{referralMessage}</span>
          </div>
        )}
      </div>

      <div className="border-t border-border pt-4 mt-2">
        <h3 className="text-sm font-bold text-foreground/70 mb-3">{t('currentAddress')}</h3>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('village')}</label>
          <input type="text" value={formData.village} onChange={(e) => updateField("village", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('postOffice')}</label>
            <input type="text" value={formData.postOffice} onChange={(e) => updateField("postOffice", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('postCode')}</label>
            <input type="text" value={formData.postCode} onChange={(e) => updateField("postCode", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" />
          </div>
        </div>
      </div>

      <button onClick={validateStep} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3">{t('nextButton')}</button>
      <button onClick={handleBack} className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition">{t('previous')}</button>
    </motion.div>
  );
};

export default Step3Personal;