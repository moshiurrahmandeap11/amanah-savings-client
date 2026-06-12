"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const navItems = [
    { id: 1, name: "How it Works", path: "how-it-works" },
    { id: 2, name: "Plan", path: "plans" },
    { id: 3, name: "Goal", path: "goals" },
    { id: 4, name: "About Us", path: "about-us" },
    { id: 5, name: "Q&A", path: "faq" },
    { id: 6, name: "Contact", path: "contact" },
  ];

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);

    // dark mode
    const darkMode = localStorage.getItem("theme") === "dark";
    setIsDark(darkMode);
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

  const logout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/");
    setDropdownOpen(false);
  };

  // Helper function to check if a path is active
  const isActivePath = (path) => {
    if (path === "/") {
      return pathname === path;
    }
    return pathname.startsWith(path);
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
              <span className="text-primary">Amanah</span>
              <span className="text-secondary dark:text-white"> Savings</span>
            </Link>
          </div>

          {/* Desktop Menu - Center */}
          <nav className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center gap-6 lg:gap-8">
              {navItems.map((item) => {
                const isActive = isActivePath(item.path);
                return (
                  <li key={item.id}>
                    <Link
                      href={item.path}
                      className={`text-sm font-semibold transition duration-300 relative group ${
                        isActive
                          ? "text-primary"
                          : "text-foreground/80 hover:text-primary"
                      }`}
                    >
                      {item.name}
                      <span
                        className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        }`}
                      ></span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-3">
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
                  className="h-4 w-4 sm:h-5 sm:w-5 text-slate-700"
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
            {!isLoggedIn && (
              <div className="hidden md:flex items-center gap-2">
                {/* Log In button - Left side */}
                <Link
                  href="/login"
                  className="rounded-xl border border-border px-4 py-1.5 text-sm font-medium transition hover:bg-card shrink-0"
                >
                  Log In
                </Link>

                {/* Start Savings Button - Right side */}
                <Link
                  href="/register"
                  className="rounded-xl bg-linear-to-r from-primary to-primary-hover px-5 py-1.5 text-sm font-semibold text-white transition hover:shadow-lg hover:scale-105 shrink-0"
                >
                  Start Savings
                </Link>
              </div>
            )}

            {/* User Section for Logged In */}
            {isLoggedIn && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full bg-linear-to-r from-primary to-primary-hover text-white transition hover:shadow-lg shrink-0"
                  aria-label="User menu"
                >
                  👤
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 sm:mt-3 w-48 sm:w-56 rounded-2xl border border-border bg-card p-1 shadow-xl z-50">
                    <Link
                      href="/profile"
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-background hover:text-primary ${
                        isActivePath("/profile")
                          ? "text-primary bg-background"
                          : ""
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Profile
                    </Link>

                    <Link
                      href="/dashboard"
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-background hover:text-primary ${
                        isActivePath("/dashboard")
                          ? "text-primary bg-background"
                          : ""
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>

                    <Link
                      href="/settings"
                      className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm transition hover:bg-background hover:text-primary ${
                        isActivePath("/settings")
                          ? "text-primary bg-background"
                          : ""
                      }`}
                      onClick={() => setDropdownOpen(false)}
                    >
                      Settings
                    </Link>

                    <div className="my-1 border-t border-border" />

                    <button
                      onClick={logout}
                      className="flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left text-sm text-red-500 transition hover:bg-background"
                    >
                      Logout
                    </button>
                  </div>
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
      <div
        className={`fixed inset-0 z-100 md:hidden transition-all duration-300 ${
          isOpen ? "visible" : "invisible"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setIsOpen(false)}
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer - comes from right */}
        <div
          ref={mobileMenuRef}
          className={`absolute right-0 top-0 h-full w-70 sm:w-[320px] bg-card shadow-2xl transition-all duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          {/* Drawer Header */}
          <div className="flex items-center justify-between border-b border-border p-5">
            <h2 className="text-lg font-semibold text-primary">Menu</h2>
            <button
              onClick={() => setIsOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-border transition hover:bg-background"
              aria-label="Close menu"
            >
              ✕
            </button>
          </div>

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

            {/* Buttons for Mobile - Only for non-logged in users */}
            {!isLoggedIn && (
              <div className="mt-6 space-y-2 pt-4 border-t border-border">
                <Link
                  href="/login"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-border px-4 py-3 text-base font-medium transition hover:bg-background w-full"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-linear-to-r from-primary to-primary-hover px-4 py-3 text-base font-semibold text-white transition hover:shadow-lg w-full"
                >
                  Start Savings
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
