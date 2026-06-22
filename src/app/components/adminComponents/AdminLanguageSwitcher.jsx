// components/AdminLanguageSwitcher.jsx
"use client";

import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

const AdminLanguageSwitcher = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLang = localStorage.getItem('admin_lang') || 'en';
    setLanguage(savedLang);
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'bn' : 'en';
    setLanguage(newLang);
    localStorage.setItem('admin_lang', newLang);
    // Dispatch custom event for other components to listen
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLang }));
    // Also dispatch storage event for cross-tab sync
    window.dispatchEvent(new StorageEvent('storage', { key: 'admin_lang', newValue: newLang }));
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

export default AdminLanguageSwitcher;
