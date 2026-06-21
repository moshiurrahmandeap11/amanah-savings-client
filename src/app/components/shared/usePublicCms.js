"use client";

import { useEffect, useState } from "react";
import axiosInstance from "./AxiosInstance/AxiosInstance";

const isAnnouncementActive = (announcement) => {
  if (!announcement?.enabled || !announcement?.text) return false;

  const now = new Date();
  const start = announcement.startDate ? new Date(announcement.startDate) : null;
  const end = announcement.endDate ? new Date(announcement.endDate) : null;

  if (start && now < start) return false;
  if (end && now > end) return false;

  return true;
};

export default function usePublicCms() {
  const [cms, setCms] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchCms = async () => {
      try {
        const response = await axiosInstance.get("/cms");
        if (!isMounted) return;
        setCms(response.data?.data || null);
        setError("");
      } catch (err) {
        if (!isMounted) return;
        setError(err.response?.data?.message || "Failed to load site content");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    const timer = setTimeout(fetchCms, 0);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, []);

  return {
    cms,
    loading,
    error,
    announcement: isAnnouncementActive(cms?.announcements) ? cms.announcements : null,
  };
}
