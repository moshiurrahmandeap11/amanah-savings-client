"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { 
  Award, 
  Star, 
  Gem, 
  Crown,
  Home,
  Heart,
  Moon,
  GraduationCap,
  AlertCircle,
  Smartphone,
  Car,
  Briefcase,
  Baby,
  Plane,
  Target,
  Calculator,
} from "lucide-react";

// Translations
const translations = {
  en: {
    // Step Header
    stepLabel: "Step 5 / 8",
    chooseSavingsPlan: "Choose Savings Plan",
    selectPlanDesc: "Select a plan based on your monthly savings capacity. Upgrade anytime.",
    
    // Plans
    bronze: "Bronze",
    silver: "Silver",
    gold: "Gold",
    platinum: "Platinum",
    bronzeRange: "৳500–৳2,000/mo",
    silverRange: "৳2,000–৳10,000/mo",
    goldRange: "৳10,000–৳50,000/mo",
    platinumRange: "৳50,000+/mo",
    selected: "✓ Selected",
    
    // Goal Section
    setFirstGoal: "Set Your First Savings Goal",
    goalType: "Goal Type",
    chooseFirstGoal: "Choose your first goal",
    homeFund: "Home Fund",
    weddingFund: "Wedding Fund",
    hajjFund: "Hajj Fund",
    educationFund: "Education Fund",
    emergencyFund: "Emergency Fund",
    gadgetFund: "Gadget Fund",
    carFund: "Car Fund",
    businessFund: "Business Fund",
    childrenFuture: "Children's Future",
    travelFund: "Travel Fund",
    customGoal: "Custom Goal",
    targetAmount: "Target Amount (BDT)",
    targetPlaceholder: "e.g. 200000",
    monthlyDeposit: "Monthly Deposit",
    monthlyPlaceholder: "e.g. 5000",
    duration: "Duration (months)",
    durationPlaceholder: "e.g. 24",
    
    // Calculation Display
    monthlyBreakdown: "📊 Monthly Breakdown",
    monthlySavings: "Monthly Savings",
    totalSavings: "Total Savings",
    durationMonths: "Duration",
    willSave: "You will save {amount} per month for {duration} months to reach {target}.",
    
    // Buttons
    nextButton: "Next — Set PIN →",
    previous: "← Previous",
  },
  bn: {
    // Step Header
    stepLabel: "ধাপ ৫ / ৮",
    chooseSavingsPlan: "সঞ্চয় প্ল্যান নির্বাচন",
    selectPlanDesc: "আপনার মাসিক সঞ্চয় ক্ষমতার ভিত্তিতে একটি প্ল্যান নির্বাচন করুন। যেকোনো সময় আপগ্রেড করুন।",
    
    // Plans
    bronze: "ব্রোঞ্জ",
    silver: "সিলভার",
    gold: "গোল্ড",
    platinum: "প্লাটিনাম",
    bronzeRange: "৳৫০০–৳২,০০০/মাস",
    silverRange: "৳২,০০০–৳১০,০০০/মাস",
    goldRange: "৳১০,০০০–৳৫০,০০০/মাস",
    platinumRange: "৳৫০,০০০+/মাস",
    selected: "✓ নির্বাচিত",
    
    // Goal Section
    setFirstGoal: "আপনার প্রথম সঞ্চয় লক্ষ্য নির্ধারণ করুন",
    goalType: "লক্ষ্যের ধরন",
    chooseFirstGoal: "আপনার প্রথম লক্ষ্য নির্বাচন",
    homeFund: "ঘর ফান্ড",
    weddingFund: "বিয়ে ফান্ড",
    hajjFund: "হজ ফান্ড",
    educationFund: "শিক্ষা ফান্ড",
    emergencyFund: "জরুরি ফান্ড",
    gadgetFund: "গ্যাজেট ফান্ড",
    carFund: "গাড়ি ফান্ড",
    businessFund: "ব্যবসা ফান্ড",
    childrenFuture: "সন্তানের ভবিষ্যৎ",
    travelFund: "ভ্রমণ ফান্ড",
    customGoal: "কাস্টম লক্ষ্য",
    targetAmount: "লক্ষ্যমাত্রা (বিডিটি)",
    targetPlaceholder: "যেমন: ২০০০০০",
    monthlyDeposit: "মাসিক জমা",
    monthlyPlaceholder: "যেমন: ৫০০০",
    duration: "মেয়াদ (মাস)",
    durationPlaceholder: "যেমন: ২৪",
    
    // Calculation Display
    monthlyBreakdown: "📊 মাসিক বিবরণী",
    monthlySavings: "মাসিক সঞ্চয়",
    totalSavings: "মোট সঞ্চয়",
    durationMonths: "মেয়াদ",
    willSave: "আপনি {target} পৌঁছাতে {duration} মাসে প্রতি মাসে {amount} সঞ্চয় করবেন।",
    
    // Buttons
    nextButton: "পরবর্তী — পিন সেট করুন →",
    previous: "← পূর্ববর্তী",
  }
};

const Step5Plan = ({ formData, updateField, handleNext, handleBack, lang = "bn" }) => {
  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  // Calculate monthly breakdown
  const calculation = useMemo(() => {
    const target = parseFloat(formData.targetAmount) || 0;
    const monthly = parseFloat(formData.monthlyDeposit) || 0;
    const duration = parseInt(formData.duration) || 0;

    let calculatedMonthly = monthly;
    let calculatedDuration = duration;
    let calculatedTarget = target;

    // If target and duration are provided, calculate monthly
    if (target > 0 && duration > 0 && monthly === 0) {
      calculatedMonthly = Math.ceil(target / duration);
    }
    // If target and monthly are provided, calculate duration
    else if (target > 0 && monthly > 0 && duration === 0) {
      calculatedDuration = Math.ceil(target / monthly);
    }
    // If monthly and duration are provided, calculate target
    else if (monthly > 0 && duration > 0 && target === 0) {
      calculatedTarget = monthly * duration;
    }

    // If all three are provided, use them as is
    if (target > 0 && monthly > 0 && duration > 0) {
      calculatedMonthly = monthly;
      calculatedDuration = duration;
      calculatedTarget = target;
    }

    return {
      monthly: calculatedMonthly,
      duration: calculatedDuration,
      target: calculatedTarget,
      isValid: (calculatedMonthly > 0 && calculatedDuration > 0 && calculatedTarget > 0)
    };
  }, [formData.targetAmount, formData.monthlyDeposit, formData.duration]);

  // Plan icons mapping
  const planIcons = {
    bronze: <Award size={24} className="text-amber-600" />,
    silver: <Star size={24} className="text-gray-400" />,
    gold: <Gem size={24} className="text-yellow-500" />,
    platinum: <Crown size={24} className="text-purple-500" />,
  };

  // Goal type icons mapping
  const goalIcons = {
    "Home Fund": <Home size={16} className="text-blue-500 inline mr-2" />,
    "Wedding Fund": <Heart size={16} className="text-pink-500 inline mr-2" />,
    "Hajj Fund": <Moon size={16} className="text-emerald-500 inline mr-2" />,
    "Education Fund": <GraduationCap size={16} className="text-indigo-500 inline mr-2" />,
    "Emergency Fund": <AlertCircle size={16} className="text-red-500 inline mr-2" />,
    "Gadget Fund": <Smartphone size={16} className="text-purple-500 inline mr-2" />,
    "Car Fund": <Car size={16} className="text-blue-600 inline mr-2" />,
    "Business Fund": <Briefcase size={16} className="text-amber-600 inline mr-2" />,
    "Children's Future": <Baby size={16} className="text-pink-400 inline mr-2" />,
    "Travel Fund": <Plane size={16} className="text-cyan-500 inline mr-2" />,
    "Custom Goal": <Target size={16} className="text-gray-500 inline mr-2" />,
  };

  // Get plan options with translations
  const getPlans = () => [
    { id: "bronze", label: t('bronze'), range: t('bronzeRange'), icon: planIcons.bronze, color: "border-amber-600/30 hover:border-amber-600", selectedBg: "bg-amber-50 dark:bg-amber-950/20" },
    { id: "silver", label: t('silver'), range: t('silverRange'), icon: planIcons.silver, color: "border-gray-400/30 hover:border-gray-400", selectedBg: "bg-gray-50 dark:bg-gray-800/20" },
    { id: "gold", label: t('gold'), range: t('goldRange'), icon: planIcons.gold, color: "border-yellow-500/30 hover:border-yellow-500", selectedBg: "bg-yellow-50 dark:bg-yellow-950/20" },
    { id: "platinum", label: t('platinum'), range: t('platinumRange'), icon: planIcons.platinum, color: "border-purple-500/30 hover:border-purple-500", selectedBg: "bg-purple-50 dark:bg-purple-950/20" },
  ];

  // Get goal options with translations and icons
  const getGoalOptions = () => [
    { value: "", label: t('chooseFirstGoal'), icon: null },
    { value: "Home Fund", label: t('homeFund'), icon: goalIcons["Home Fund"] },
    { value: "Wedding Fund", label: t('weddingFund'), icon: goalIcons["Wedding Fund"] },
    { value: "Hajj Fund", label: t('hajjFund'), icon: goalIcons["Hajj Fund"] },
    { value: "Education Fund", label: t('educationFund'), icon: goalIcons["Education Fund"] },
    { value: "Emergency Fund", label: t('emergencyFund'), icon: goalIcons["Emergency Fund"] },
    { value: "Gadget Fund", label: t('gadgetFund'), icon: goalIcons["Gadget Fund"] },
    { value: "Car Fund", label: t('carFund'), icon: goalIcons["Car Fund"] },
    { value: "Business Fund", label: t('businessFund'), icon: goalIcons["Business Fund"] },
    { value: "Children's Future", label: t('childrenFuture'), icon: goalIcons["Children's Future"] },
    { value: "Travel Fund", label: t('travelFund'), icon: goalIcons["Travel Fund"] },
    { value: "Custom Goal", label: t('customGoal'), icon: goalIcons["Custom Goal"] },
  ];

  // Format currency
  const formatCurrency = (amount) => {
    if (!amount || amount === 0) return "৳0";
    return `৳${amount.toLocaleString("en-IN")}`;
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">{t('stepLabel')}</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{t('chooseSavingsPlan')}</h2>
      <p className="text-foreground/60 mb-6">{t('selectPlanDesc')}</p>

      <div className="grid grid-cols-2 gap-3 mb-6">
        {getPlans().map((plan) => (
          <div 
            key={plan.id} 
            onClick={() => updateField("selectedPlan", plan.id)} 
            className={`p-4 rounded-xl border-2 text-center cursor-pointer transition-all ${
              formData.selectedPlan === plan.id 
                ? `${plan.selectedBg} ${plan.color} border-primary shadow-md` 
                : "border-border hover:border-primary/50"
            }`}
          >
            <div className="flex justify-center mb-2">{plan.icon}</div>
            <div className="font-bold capitalize">{plan.label}</div>
            <div className="text-xs text-foreground/50">{plan.range}</div>
            {formData.selectedPlan === plan.id && <div className="text-primary text-xs mt-1 font-semibold">{t('selected')}</div>}
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-4">
        <h3 className="text-sm font-bold text-foreground/70 mb-3">{t('setFirstGoal')}</h3>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('goalType')}</label>
          <select 
            value={formData.goalType} 
            onChange={(e) => updateField("goalType", e.target.value)} 
            className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
          >
            {getGoalOptions().map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.icon ? (
                  <>
                    {opt.icon}
                    {opt.label}
                  </>
                ) : (
                  opt.label
                )}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('targetAmount')}</label>
          <input type="number" value={formData.targetAmount} onChange={(e) => updateField("targetAmount", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder={t('targetPlaceholder')} />
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('monthlyDeposit')}</label>
            <input type="number" value={formData.monthlyDeposit} onChange={(e) => updateField("monthlyDeposit", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder={t('monthlyPlaceholder')} />
          </div>
          <div>
            <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('duration')}</label>
            <input type="number" value={formData.duration} onChange={(e) => updateField("duration", e.target.value)} className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary" placeholder={t('durationPlaceholder')} />
          </div>
        </div>

        {/* Monthly Breakdown Display */}
        {calculation.isValid && (
          <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary-light/10 border border-primary/20">
            <div className="flex items-center gap-2 mb-3">
              <Calculator size={18} className="text-primary" />
              <h4 className="font-semibold text-foreground text-sm">{t('monthlyBreakdown')}</h4>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="text-center">
                <div className="text-xs text-foreground/50">{t('monthlySavings')}</div>
                <div className="text-lg font-bold text-primary">{formatCurrency(calculation.monthly)}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-foreground/50">{t('durationMonths')}</div>
                <div className="text-lg font-bold text-primary">{calculation.duration} months</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-foreground/50">{t('totalSavings')}</div>
                <div className="text-lg font-bold text-primary">{formatCurrency(calculation.target)}</div>
              </div>
            </div>
            <div className="mt-3 pt-3 border-t border-primary/20 text-center">
              <p className="text-xs text-foreground/70">
                {t('willSave', {
                  amount: formatCurrency(calculation.monthly),
                  duration: calculation.duration,
                  target: formatCurrency(calculation.target)
                })}
              </p>
            </div>
          </div>
        )}
      </div>

      <button onClick={handleNext} className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mt-4 mb-3">{t('nextButton')}</button>
      <button onClick={handleBack} className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition">{t('previous')}</button>
    </motion.div>
  );
};

export default Step5Plan;