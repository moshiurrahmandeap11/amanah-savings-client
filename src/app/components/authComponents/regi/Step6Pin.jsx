"use client";

import React from "react";
import { motion } from "framer-motion";

// Translations
const translations = {
  en: {
    // Step Header
    stepLabel: "Step 6 / 8",
    setTransactionPin: "Set Transaction PIN",
    pinDesc: "This 6-digit PIN is required for every deposit & withdrawal. Do not share it.",
    
    // PIN Entry
    enterNewPin: "Enter new PIN",
    confirmPin: "Confirm PIN",
    pinMismatch: "PIN Mismatch",
    pinMismatchDesc: "Your PINs do not match. Please try again.",
    invalidPin: "Invalid PIN",
    invalidPinDesc: "Please enter 6-digit PIN",
    
    // Buttons
    confirmPinBtn: "Confirm PIN →",
    continueBtn: "Continue →",
    previous: "← Previous",
  },
  bn: {
    // Step Header
    stepLabel: "ধাপ ৬ / ৮",
    setTransactionPin: "ট্রানজেকশন পিন সেট করুন",
    pinDesc: "প্রতিটি ডিপোজিট ও উত্তোলনের জন্য এই ৬-অঙ্কের পিন প্রয়োজন। এটি কাউকে বলবেন না।",
    
    // PIN Entry
    enterNewPin: "নতুন পিন দিন",
    confirmPin: "পিন নিশ্চিত করুন",
    pinMismatch: "পিন মিলছে না",
    pinMismatchDesc: "আপনার পিন মিলছে না। আবার চেষ্টা করুন।",
    invalidPin: "অবৈধ পিন",
    invalidPinDesc: "দয়া করে ৬-অঙ্কের পিন দিন",
    
    // Buttons
    confirmPinBtn: "পিন নিশ্চিত করুন →",
    continueBtn: "চালিয়ে যান →",
    previous: "← পূর্ববর্তী",
  }
};

const Step6Pin = ({ 
  formData, 
  updateField, 
  errors, 
  pinStep, 
  setPinStep, 
  handleNext, 
  handleBack, 
  showAlert,
  lang = "bn" 
}) => {
  // Translation function
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => {
      text = text.replace(`{${param}}`, params[param]);
    });
    return text;
  };

  const handlePinInput = (digit) => {
    if (pinStep === 1 && formData.pin.length < 6) updateField("pin", formData.pin + digit);
    else if (pinStep === 2 && formData.confirmPin.length < 6) updateField("confirmPin", formData.confirmPin + digit);
  };

  const handlePinDelete = () => {
    if (pinStep === 1) updateField("pin", formData.pin.slice(0, -1));
    else updateField("confirmPin", formData.confirmPin.slice(0, -1));
  };

  const handlePinConfirm = () => {
    if (formData.pin === formData.confirmPin && formData.pin.length === 6) { 
      handleNext(); 
    } else { 
      showAlert(t('pinMismatch'), t('pinMismatchDesc'), "error"); 
      setPinStep(1); 
      updateField("pin", ""); 
      updateField("confirmPin", ""); 
    }
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6 text-center">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">{t('stepLabel')}</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{t('setTransactionPin')}</h2>
      <p className="text-foreground/60 mb-4">{t('pinDesc')}</p>
      
      <div className="flex justify-center gap-3 mb-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className={`w-4 h-4 rounded-full transition-all ${(pinStep === 1 ? formData.pin.length : formData.confirmPin.length) > i ? "bg-primary" : "bg-border"}`} 
          />
        ))}
      </div>
      
      <p className="text-sm text-foreground/60 mb-4">
        {pinStep === 1 ? t('enterNewPin') : t('confirmPin')}
      </p>
      
      <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto mb-6">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((num) => (
          <button 
            key={num} 
            onClick={() => handlePinInput(num)} 
            className="p-4 rounded-xl border border-border text-xl font-bold hover:border-primary hover:bg-primary/5 transition"
          >
            {num}
          </button>
        ))}
        <div></div>
        <button 
          onClick={() => handlePinInput("0")} 
          className="p-4 rounded-xl border border-border text-xl font-bold hover:border-primary hover:bg-primary/5 transition"
        >
          0
        </button>
        <button 
          onClick={handlePinDelete} 
          className="p-4 rounded-xl border border-red-500/30 text-red-500 text-xl font-bold hover:bg-red-500/10 transition"
        >
          ⌫
        </button>
      </div>
      
      {errors.pin && <p className="text-sm text-red-500 mb-4">{errors.pin}</p>}
      
      {pinStep === 2 && (
        <button 
          onClick={handlePinConfirm} 
          className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
        >
          {t('confirmPinBtn')}
        </button>
      )}
      
      {pinStep === 1 && (
        <button 
          onClick={() => { 
            if (formData.pin.length === 6) setPinStep(2); 
            else showAlert(t('invalidPin'), t('invalidPinDesc'), "error"); 
          }} 
          className="w-full py-3 bg-linear-to-r from-primary to-primary-light text-white rounded-xl font-semibold mb-3"
        >
          {t('continueBtn')}
        </button>
      )}
      
      <button 
        onClick={handleBack} 
        className="w-full py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition"
      >
        {t('previous')}
      </button>
    </motion.div>
  );
};

export default Step6Pin;