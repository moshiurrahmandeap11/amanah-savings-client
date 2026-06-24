"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import axiosInstance from "../AxiosInstance/AxiosInstance";
import useAuth from "../../../hooks/useAuth";

const REFRESH_MS = 15000;
const DEFAULT_MESSAGE = "We are currently under maintenance. Please check back soon.";

const MaintenanceGate = ({ children }) => {
  const pathname = usePathname();
  const { user, isAuthenticated } = useAuth();
  const [maintenanceState, setMaintenanceState] = useState({
    mode: false,
    message: DEFAULT_MESSAGE,
  });

  const isAdminPath = useMemo(() => pathname?.startsWith("/admin"), [pathname]);
  const isLoginPath = pathname === "/login";

  useEffect(() => {
    let mounted = true;

    const fetchStatus = async () => {
      try {
        const res = await axiosInstance.get("/system/status");
        if (!mounted || !res?.data?.success) return;

        setMaintenanceState({
          mode: Boolean(res.data.data?.maintenanceMode),
          message: res.data.data?.maintenanceMessage || DEFAULT_MESSAGE,
        });
      } catch (_error) {
        if (!mounted) return;
        setMaintenanceState((prev) => ({
          mode: prev.mode,
          message: prev.message || DEFAULT_MESSAGE,
        }));
      }
    };

    fetchStatus();
    const interval = setInterval(fetchStatus, REFRESH_MS);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
  }, []);

  const isAdminUser = isAuthenticated && (user?.role || "user") === "admin";
  const canBypassMaintenance = isAdminPath || isLoginPath || isAdminUser;

  if (maintenanceState.mode && !canBypassMaintenance) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 px-4">
        <div className="max-w-xl w-full rounded-2xl bg-white border border-slate-200 shadow-xl p-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">Site Under Maintenance</h1>
          <p className="text-slate-600 leading-relaxed">{maintenanceState.message}</p>
          <a
            href="/admin"
            className="inline-flex mt-6 px-5 py-2.5 rounded-lg bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
          >
            Admin Login
          </a>
        </div>
      </div>
    );
  }

  return children;
};

export default MaintenanceGate;
