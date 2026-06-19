"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import useAuth from "../../../hooks/useAuth";
import LanguageSwitcher from "../LanguageSwitcher";

const Navbar = () => {
  const { user, isAuthenticated, logout: logoutUser, isLoading } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [language, setLanguage] = useState('en');

  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  // Translations
  const translations = {
    en: {
      navItems: [
        { id: 1, name: "How it Works", path: "/how-it-works" },
        { id: 2, name: "Plan", path: "/plans" },
        { id: 3, name: "Goal", path: "/goals" },
        { id: 4, name: "About Us", path: "/about-us" },
        { id: 5, name: "Q&A", path: "/faq" },
        { id: 6, name: "Contact", path: "/contact" },
      ],
      login: "Log In",
      startSavings: "Start Savings",
      menu: "Menu",
      profile: "Profile",
      dashboard: "Dashboard",
      settings: "Settings",
      logout: "Logout",
      sonchoy: "Sonchoy",
      bondhu: "Bondhu",
    },
    bn: {
      navItems: [
        { id: 1, name: "কীভাবে কাজ করে", path: "/how-it-works" },
        { id: 2, name: "প্ল্যান", path: "/plans" },
        { id: 3, name: "লক্ষ্য", path: "/goals" },
        { id: 4, name: "আমাদের সম্পর্কে", path: "/about-us" },
        { id: 5, name: "প্রশ্নোত্তর", path: "/faq" },
        { id: 6, name: "যোগাযোগ", path: "/contact" },
      ],
      login: "লগইন",
      startSavings: "সঞ্চয় শুরু করুন",
      menu: "মেনু",
      profile: "প্রোফাইল",
      dashboard: "ড্যাশবোর্ড",
      settings: "সেটিংস",
      logout: "লগআউট",
      sonchoy: "সঞ্চয়",
      bondhu: "বন্ধু",
    }
  };

  // Get current language
  useEffect(() => {
    const savedLang = localStorage.getItem('appLanguage') || 'en';
    setLanguage(savedLang);
  }, []);

  // Get translation
  const t = (key) => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  // Get nav items with translations
  const navItems = t('navItems');

  useEffect(() => {
    // dark mode
    const darkMode = localStorage.getItem("theme") === "dark";
    const tryCall = async () => {
      setIsDark(darkMode);
    };
    tryCall()
    if (darkMode) {
      document.documentElement.classList.add("dark");
    }

    // scroll effect
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target) &&
        !event.target.closest(".menu-button")
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Body scroll lock when menu open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);
  };

  const handleLogout = async () => {
    await logoutUser(true);
    setDropdownOpen(false);
    router.push("/");
  };

  // Helper function to check if a path is active
  const isActivePath = (path) => {
    if (path === "/") {
      return pathname === path;
    }
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return (
      pathname === normalizedPath || pathname.startsWith(`${normalizedPath}/`)
    );
  };

  // Get user initial for avatar (fallback)
  const getUserInitial = () => {
    if (user?.firstName) {
      return user.firstName[0].toUpperCase();
    }
    if (user?.fullName) {
      return user.fullName[0].toUpperCase();
    }
    if (user?.email) {
      return user.email[0].toUpperCase();
    }
    return "U";
  };

  // Get user display name
  const getUserDisplayName = () => {
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.fullName) {
      return user.fullName.split(" ")[0];
    }
    return "User";
  };

  // Get profile picture URL with validation
  const getProfilePictureUrl = () => {
    if (user?.profilePicture && !imageError) {
      return user.profilePicture;
    }
    return null;
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-border bg-background/95 backdrop-blur-md shadow-lg"
            : "bg-background/90 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo - Left Side */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="text-xl sm:text-2xl font-bold tracking-tight whitespace-nowrap"
            >
              <span className="text-primary">{t('sonchoy')}</span>
              <span className="text-secondary dark:text-white"> {t('bondhu')}</span>
            </Link>
          </div>

          {/* Desktop Menu - Center */}
          <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <li key={item.id} className="relative group">
                    <Link
                      href={item.path}
                      className={`text-sm font-semibold transition duration-300 relative py-2 ${
                        isActive
                          ? "text-primary"
                          : "text-foreground/80 hover:text-primary"
                      }`}
                    >
                      {item.name}
                      {/* Animated underline on hover */}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 ease-out group-hover:w-full" />
                      {/* Active indicator */}
                      {isActive && (
                        <motion.span
                          layoutId="activeUnderline"
                          className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                          transition={{
                            type: "spring",
                            stiffness: 380,
                            damping: 30,
                          }}
                        />
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher */}
            <LanguageSwitcher />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-border transition hover:bg-card shrink-0"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700 dark:text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            {/* Auth Buttons for Desktop - Only when not logged in */}
            {!isAuthenticated && !isLoading && (
              <div className="hidden md:flex items-center gap-2">
                <Link
                  href="/login"
                  className="rounded-xl border border-border px-4 py-1.5 text-sm font-medium transition hover:bg-card shrink-0"
                >
                  {t('login')}
                </Link>
                <Link
                  href="/register"
                  className="rounded-xl bg-linear-to-r from-primary to-primary-hover px-5 py-1.5 text-sm font-semibold text-white transition hover:shadow-lg hover:scale-105 shrink-0"
                >
                  {t('startSavings')}
                </Link>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="hidden md:flex items-center">
                <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
              </div>
            )}

            {/* User Section for Logged In */}
            {isAuthenticated && user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-primary-hover text-white transition hover:shadow-lg shrink-0 pl-2 pr-3 py-1"
                  aria-label="User menu"
                >
                  {/* Profile Picture or Initial */}
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold overflow-hidden">
                    {getProfilePictureUrl() ? (
                      <Image
                        src={getProfilePictureUrl()}
                        alt={getUserDisplayName()}
                        width={100}
                        height={100}
                        className="w-full h-full object-cover"
                        onError={() => setImageError(true)}
                      />
                    ) : (
                      getUserInitial()
                    )}
                  </div>
                  <span className="hidden sm:inline text-sm font-medium">
                    {getUserDisplayName()}
                  </span>
                  <svg
                    className={`w-4 h-4 transition-transform duration-200 ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 sm:mt-3 w-56 rounded-2xl border border-border bg-card p-1 shadow-xl z-50"
                  >
                    {/* User Info with Profile Picture */}
                    <div className="px-3 py-2 border-b border-border mb-1">
                      <div className="flex items-center gap-3">
                        {/* Profile Picture in dropdown */}
                        <div className="w-10 h-10 rounded-full bg-linear-to-r from-primary to-primary-hover flex items-center justify-center text-white font-bold overflow-hidden">
                          {getProfilePictureUrl() ? (
                            <Image
                              src={getProfilePictureUrl()}
                              alt={getUserDisplayName()}
                              width={100}
                              height={100}
                              className="w-full h-full object-cover"
                              onError={() => setImageError(true)}
                            />
                          ) : (
                            <span className="text-sm">{getUserInitial()}</span>
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-foreground">
                            {user.fullName ||
                              `${user.firstName} ${user.lastName || ""}`}
                          </p>
                          <p className="text-xs text-foreground/60 truncate">
                            {user.email || user.phone}
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      href="/profile"
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-background hover:text-primary ${
                        isActivePath("/profile")
                          ? "text-primary bg-background"
                          : "text-foreground/80"
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      {t('profile')}
                    </Link>

                    <Link
                      href="/dashboard"
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-background hover:text-primary ${
                        isActivePath("/dashboard")
                          ? "text-primary bg-background"
                          : "text-foreground/80"
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                        />
                      </svg>
                      {t('dashboard')}
                    </Link>

                    <Link
                      href="/settings"
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-background hover:text-primary ${
                        isActivePath("/settings")
                          ? "text-primary bg-background"
                          : "text-foreground/80"
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                      {t('settings')}
                    </Link>

                    <div className="my-1 border-t border-border" />

                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-500 transition hover:bg-background"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                      </svg>
                      {t('logout')}
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Hamburger Menu Button - visible only on mobile/tablet */}
            <button
              onClick={() => setIsOpen(true)}
              className="menu-button flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl border border-border transition hover:bg-card md:hidden shrink-0"
              aria-label="Open menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer - Smooth Animation from Right */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-100 md:hidden"
            />

            {/* Drawer - Slides from right */}
            <motion.div
              ref={mobileMenuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 h-full w-70 sm:w-[320px] bg-card shadow-2xl z-101 md:hidden"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between border-b border-border p-5">
                <h2 className="text-lg font-semibold text-primary">{t('menu')}</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition hover:bg-background"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              {/* User Info in Mobile Menu when logged in */}
              {isAuthenticated && user && (
                <div className="p-4 border-b border-border">
                  <div className="flex items-center gap-3">
                    {/* Profile Picture in Mobile Menu */}
                    <div className="w-12 h-12 rounded-full bg-linear-to-r from-primary to-primary-hover flex items-center justify-center text-white text-lg font-bold overflow-hidden">
                      {getProfilePictureUrl() ? (
                        <Image
                          src={getProfilePictureUrl()}
                          alt={getUserDisplayName()}
                          width={100}
                          height={100}
                          className="w-full h-full object-cover"
                          onError={() => setImageError(true)}
                        />
                      ) : (
                        getUserInitial()
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">
                        {user.fullName ||
                          `${user.firstName} ${user.lastName || ""}`}
                      </p>
                      <p className="text-xs text-foreground/60 truncate">
                        {user.email || user.phone}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mobile Navigation Items */}
              <nav className="p-4">
                <ul className="space-y-1">
                  {navItems.map((item) => {
                    const isActive = isActivePath(item.path);
                    return (
                      <li key={item.id}>
                        <Link
                          href={item.path}
                          onClick={() => setIsOpen(false)}
                          className={`block rounded-xl px-4 py-3 text-base font-medium transition duration-200 ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-background hover:text-primary"
                          }`}
                        >
                          {item.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>

                {/* Buttons for Mobile */}
                {!isAuthenticated && !isLoading ? (
                  <div className="mt-6 space-y-2 pt-4 border-t border-border">
                    <Link
                      href="/login"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center rounded-xl border border-border px-4 py-3 text-base font-medium transition hover:bg-background w-full"
                    >
                      {t('login')}
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary-hover px-4 py-3 text-base font-semibold text-white transition hover:shadow-lg w-full"
                    >
                      {t('startSavings')}
                    </Link>
                  </div>
                ) : (
                  isAuthenticated && (
                    <div className="mt-6 space-y-2 pt-4 border-t border-border">
                      <Link
                        href="/profile"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium hover:bg-background hover:text-primary transition w-full"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {t('profile')}
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium hover:bg-background hover:text-primary transition w-full"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                          />
                        </svg>
                        {t('dashboard')}
                      </Link>
                      <Link
                        href="/settings"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium hover:bg-background hover:text-primary transition w-full"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {t('settings')}
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="flex items-center gap-2 rounded-xl px-4 py-3 text-base font-medium text-red-500 hover:bg-background transition w-full"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        {t('logout')}
                      </button>
                    </div>
                  )
                )}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;