// app/dashboard/layout.js
"use client";

import { useState, useEffect } from "react";
import UserDashboardSidebar from "../components/userDashboardComponents/UserDashboardSidebar/UserDashboardSidebar";
import UserDashboardHeader from "../components/userDashboardComponents/UserDashboardHeader/UserDashboardHeader";
import ProtectedRoute from "../components/shared/ProtectedRoute/ProtectedRoute";
import useAuth from "../hooks/useAuth";

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isLoading } = useAuth();

  // Close sidebar on window resize (mobile to desktop)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Body scroll lock when sidebar open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute allowedRoles={['user', 'admin']}>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden transition-all duration-300"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar - Fixed/Sticky with Dark/Light Mode Support */}
        <div
          className={`fixed md:sticky top-0 left-0 h-full z-50 transition-transform duration-300 ease-in-out ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <UserDashboardSidebar 
            closeSidebar={() => setSidebarOpen(false)} 
            user={user}
          />
        </div>

        {/* Main Content Area - Separate Scroll */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <UserDashboardHeader 
            openSidebar={() => setSidebarOpen(true)} 
            user={user}
          />
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 hide-scrollbar">
            {children}
          </main>
        </div>
      </div>

      {/* Hide Scrollbar Styles */}
      <style jsx global>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </ProtectedRoute>
  );
};

export default DashboardLayout;