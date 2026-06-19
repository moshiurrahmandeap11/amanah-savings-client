// components/LanguageSwitcher.jsx
"use client";

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

const LanguageSwitcher = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Load saved language
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'bn' : 'en';
    setLanguage(newLang);
    localStorage.setItem('appLanguage', newLang);
    // Reload page to apply changes
    window.location.reload();
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 text-sm font-semibold text-foreground/70 shrink-0"
      aria-label="Toggle language"
    >
      <Globe size={16} />
      <span>{language === 'en' ? 'EN' : 'বাং'}</span>
    </button>
  );
};

export default LanguageSwitcher;