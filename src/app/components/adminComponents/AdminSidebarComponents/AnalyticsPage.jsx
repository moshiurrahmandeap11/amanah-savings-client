"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Chart from "chart.js/auto";
import { Loader2 } from "lucide-react";
import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://server-amanah-savings.onrender.com/api";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const AnalyticsPage = () => {
  const [isDark, setIsDark] = useState(false);
  const [stats, setStats] = useState([]);
  const [deviceBreakdown, setDeviceBreakdown] = useState([]);
  const [divisionBreakdown, setDivisionBreakdown] = useState([]);
  const [dauData, setDauData] = useState({ labels: [], values: [] });
  const [loading, setLoading] = useState(false);
  const dauChartRef = useRef(null);
  const trafficChartRef = useRef(null);
  let dauChart = useRef(null);
  let trafficChart = useRef(null);

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/admin/analytics`, { headers: getAuthHeaders() });
      if (res.data.success) {
        const data = res.data.data;
        setStats(data.sessionStats || []);
        setDeviceBreakdown(data.deviceBreakdown || []);
        setDivisionBreakdown(data.divisionBreakdown || []);
        setDauData(data.dau || { labels: [], values: [] });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    setIsDark(savedTheme === "dark");
    if (savedTheme === "dark") document.documentElement.classList.add("dark");
    fetchAnalytics();
  }, [fetchAnalytics]);

  useEffect(() => {
    if (!loading) {
      initCharts();
    }
    return () => {
      if (dauChart.current) dauChart.current.destroy();
      if (trafficChart.current) trafficChart.current.destroy();
    };
  }, [loading, dauData, deviceBreakdown]);

  const initCharts = () => {
    const isDarkMode = document.documentElement.getAttribute("data-theme") === "dark";
    const textColor = isDarkMode ? "#94a3b8" : "#64748b";
    const gridColor = isDarkMode ? "#1e2d3d" : "#e2e8f0";

    // DAU Chart
    const dauCanvas = document.getElementById("dauChart");
    if (dauCanvas && !dauChart.current) {
      const ctx = dauCanvas.getContext("2d");
      dauChart.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: dauData.labels.length ? dauData.labels : ["May 23", "24", "25", "26", "27", "28", "29", "30", "31", "Jun 1", "2", "3", "4", "5"],
          datasets: [{
            label: "Daily Active Users",
            data: dauData.values.length ? dauData.values : [980, 1050, 1120, 1090, 1180, 1240, 1200, 1310, 1280, 1380, 1290, 1420, 1380, 1247],
            borderColor: "#059669",
            backgroundColor: "rgba(5,150,105,0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 3,
            pointBackgroundColor: "#059669",
            pointBorderColor: "#fff",
            pointBorderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: { callbacks: { label: (c) => `${c.raw} users` } }
          },
          scales: {
            x: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: gridColor } },
            y: { ticks: { color: textColor, font: { size: 10 } }, grid: { color: gridColor }, beginAtZero: true }
          }
        }
      });
    }

    // Traffic Sources Chart (device breakdown as doughnut)
    const trafficCanvas = document.getElementById("trafficChart");
    if (trafficCanvas && !trafficChart.current) {
      const ctx = trafficCanvas.getContext("2d");
      const labels = deviceBreakdown.map(d => d.name);
      const values = deviceBreakdown.map(d => d.percentage);
      const colors = deviceBreakdown.map(d => d.color || "#059669");
      trafficChart.current = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: labels.length ? labels : ["Android", "iOS", "Desktop"],
          datasets: [{
            data: values.length ? values : [58, 26, 16],
            backgroundColor: colors.length ? colors : ["#10b981", "#3b82f6", "#8b5cf6"],
            borderWidth: 0,
            borderRadius: 4
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom", labels: { color: textColor, font: { size: 11 }, padding: 12 } }
          },
          cutout: "60%"
        }
      });
    }
  };

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-5">📈 Analytics</h2>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 size={32} className="animate-spin text-primary" />
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-5">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-card border border-border rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div className={`w-10 h-10 rounded-xl ${stat.bg || "bg-primary/10"} flex items-center justify-center text-xl`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.trendUp ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
                {stat.trend}
              </span>
            </div>
            <div className="text-2xl font-bold text-foreground mt-3">{stat.value}</div>
            <div className="text-xs text-foreground/50 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid lg:grid-cols-2 gap-5 mb-5">
        {/* DAU Chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">📊 Daily Active Users (Last 14 days)</div>
          <div className="h-64 relative">
            <canvas id="dauChart" />
          </div>
        </div>

        {/* Traffic Sources Chart */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">🔵 Device Breakdown</div>
          <div className="h-64 relative">
            <canvas id="trafficChart" />
          </div>
        </div>
      </div>

      {/* Device & Divisions Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {/* Device Breakdown */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">📱 Device Breakdown</div>
          <div className="space-y-4">
            {deviceBreakdown.map((device, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-20 text-sm text-foreground">{device.name}</span>
                <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${device.percentage}%`, background: device.color }} />
                </div>
                <span className="text-xs text-foreground/50">{device.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Divisions */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="font-bold text-foreground mb-4">🌍 Top Divisions</div>
          <div className="space-y-4">
            {divisionBreakdown.map((division, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <span className="w-20 text-sm text-foreground">{division.name}</span>
                <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${division.percentage}%`, background: division.color }} />
                </div>
                <span className="text-xs text-foreground/50">{division.percentage}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
