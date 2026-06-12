// components/shared/ProtectedRoute/ProtectedRoute.js
"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import useAuth from "../../../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isRedirecting, setIsRedirecting] = useState(false);


  const publicRoutes = [
    '/', '/login', '/register', '/forgot-password', 
    '/how-it-works', '/plans', '/goals', '/about-us', '/faq', '/contact'
  ];
  const isPublicRoute = publicRoutes.includes(pathname);

  useEffect(() => {

    if (isLoading || isRedirecting) return;


    if (!isAuthenticated && !isPublicRoute) {
      setIsRedirecting(true);
      router.replace('/login');
      return;
    }


    if (isAuthenticated && allowedRoles.length > 0) {
      const userRole = user?.role || 'user';
      if (!allowedRoles.includes(userRole)) {
        setIsRedirecting(true);
        if (userRole === 'admin') {
          router.replace('/admin');
        } else {
          router.replace('/dashboard');
        }
        return;
      }
    }

    if (isAuthenticated && (pathname === '/login' || pathname === '/register')) {
      const userRole = user?.role || 'user';
      setIsRedirecting(true);
      if (userRole === 'admin') {
        router.replace('/admin');
      } else {
        router.replace('/dashboard');
      }
      return;
    }


    if (isRedirecting) {
      setIsRedirecting(false);
    }
  }, [isAuthenticated, isLoading, pathname, router, user, allowedRoles, isPublicRoute, isRedirecting]);


  if (isLoading || isRedirecting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading...</p>
        </div>
      </div>
    );
  }


  if (isPublicRoute || (isAuthenticated && (allowedRoles.length === 0 || allowedRoles.includes(user?.role || 'user')))) {
    return <>{children}</>;
  }

  return null;
};

export default ProtectedRoute;