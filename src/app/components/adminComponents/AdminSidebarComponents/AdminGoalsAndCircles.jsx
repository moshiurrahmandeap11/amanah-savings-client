"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Check,
  CircleDollarSign,
  Clock,
  Eye,
  Lock,
  Pencil,
  RefreshCw,
  Search,
  ShieldCheck,
  Target,
  Trash2,
  Users,
  X,
} from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

const tabs = [
  { id: "goals", label: "Goals", icon: Target },
  { id: "circles", label: "Circles", icon: Users },
  { id: "requests", label: "Join Requests", icon: Clock },
];

const getTokenHeaders = () => {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const formatCurrency = (value) => {
  const amount = Number(value) || 0;
  return `Tk ${amount.toLocaleString("en-BD")}`;
};

const formatDate = (value) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-BD", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const getOwnerName = (owner, fallback = "Unknown owner") => {
  if (!owner) return fallback;
  return owner.fullName || `${owner.firstName || ""} ${owner.lastName || ""}`.trim() || owner.phone || owner.email || fallback;
};

const getErrorMessage = (error, fallback) => error.response?.data?.message || error.message || fallback;

const isReferralBonusGoal = (goal) =>
  String(goal?.goalType || "").toLowerCase() === "bonus" ||
  String(goal?.goalName || "").toLowerCase() === "referral bonus";

export default function AdminGoalsAndCircles() {
  const [activeTab, setActiveTab] = useState("goals");
  const [search, setSearch] = useState("");
  const [goals, setGoals] = useState([]);
  const [circles, setCircles] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });
  const [detailsItem, setDetailsItem] = useState(null);
  const [editCircleItem, setEditCircleItem] = useState(null);
  const [editCircleForm, setEditCircleForm] = useState({
    circleName: "",
    purpose: "",
    targetAmount: "",
    maxMembers: "",
    minDeposit: "",
    description: "",
    circleType: "private",
    status: "active",
  });
  const [editCircleLoading, setEditCircleLoading] = useState(false);

  const fetchAdminData = useCallback(async () => {
    setLoading(true);
    setMessage({ type: "", text: "" });

    try {
      const headers = getTokenHeaders();
      const [goalsResponse, circlesResponse, requestsResponse] = await Promise.all([
        axiosInstance.get("/admin/goals", { params: { limit: 200 }, headers }),
        axiosInstance.get("/admin/circles", { params: { limit: 200 }, headers }),
        axiosInstance.get("/admin/circle-join-requests", {
          params: { status: "pending", limit: 200 },
          headers,
        }),
      ]);

      setGoals((goalsResponse.data?.data?.goals || []).filter((goal) => !isReferralBonusGoal(goal)));
      setCircles(circlesResponse.data?.data?.circles || []);
      setRequests(requestsResponse.data?.data?.requests || []);
    } catch (error) {
      setMessage({
        type: "error",
        text: getErrorMessage(error, "Failed to load admin goals and circles"),
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    queueMicrotask(() => {
      fetchAdminData();
    });
  }, [fetchAdminData]);

  const filteredGoals = useMemo(() => {
    const term = search.trim().toLowerCase();
    const realGoals = goals.filter((goal) => !isReferralBonusGoal(goal));
    if (!term) return realGoals;

    return realGoals.filter((goal) => {
      const owner = getOwnerName(goal.owner, "");
      return [goal.goalName, goal.goalType, goal.status, owner, goal.owner?.phone, goal.owner?.email]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [goals, search]);

  const filteredCircles = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return circles;

    return circles.filter((circle) => {
      const owner = getOwnerName(circle.owner, "");
      return [circle.circleName, circle.purpose, circle.circleType, circle.status, owner, circle.owner?.phone, circle.owner?.email]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term));
    });
  }, [circles, search]);

  const filteredRequests = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return requests;

    return requests.filter((request) =>
      [request.circleName, request.userName, request.userPhone, request.userEmail, request.status]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(term)),
    );
  }, [requests, search]);

  const stats = useMemo(
    () => [
      {
        label: "Total Goals",
        value: goals.length,
        icon: Target,
        tone: "emerald",
      },
      {
        label: "Total Circles",
        value: circles.length,
        icon: Users,
        tone: "cyan",
      },
      {
        label: "Pending Requests",
        value: requests.length,
        icon: Clock,
        tone: "amber",
      },
      {
        label: "Private Circles",
        value: circles.filter((circle) => circle.circleType === "private").length,
        icon: Lock,
        tone: "slate",
      },
    ],
    [goals, circles, requests],
  );

  const deleteGoal = async (goal) => {
    if (!window.confirm(`Delete goal "${goal.goalName}"?`)) return;

    setActionLoading(`goal-${goal._id}`);
    try {
      await axiosInstance.delete(`/admin/goals/${goal._id}`, { headers: getTokenHeaders() });
      setGoals((current) => current.filter((item) => item._id !== goal._id));
      setMessage({ type: "success", text: "Goal deleted successfully" });
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error, "Failed to delete goal") });
    } finally {
      setActionLoading("");
    }
  };

  const deleteCircle = async (circle) => {
    if (!window.confirm(`Delete circle "${circle.circleName}"?`)) return;

    setActionLoading(`circle-${circle._id}`);
    try {
      await axiosInstance.delete(`/admin/circles/${circle._id}`, { headers: getTokenHeaders() });
      setCircles((current) => current.filter((item) => item._id !== circle._id));
      setRequests((current) => current.filter((item) => String(item.circleId) !== String(circle._id)));
      setMessage({ type: "success", text: "Circle deleted successfully" });
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error, "Failed to delete circle") });
    } finally {
      setActionLoading("");
    }
  };

  const openEditCircle = (circle) => {
    setEditCircleItem(circle);
    setEditCircleForm({
      circleName: circle.circleName || "",
      purpose: circle.purpose || "",
      targetAmount: String(circle.targetAmount || ""),
      maxMembers: String(circle.maxMembers || ""),
      minDeposit: String(circle.minDeposit || ""),
      description: circle.description || "",
      circleType: circle.circleType || "private",
      status: circle.status || "active",
    });
  };

  const closeEditCircle = () => {
    setEditCircleItem(null);
    setEditCircleLoading(false);
  };

  const submitEditCircle = async (e) => {
    e.preventDefault();
    if (!editCircleItem) return;

    setEditCircleLoading(true);
    try {
      const payload = {};
      if (editCircleForm.circleName) payload.circleName = editCircleForm.circleName;
      if (editCircleForm.purpose) payload.purpose = editCircleForm.purpose;
      if (editCircleForm.targetAmount) payload.targetAmount = parseFloat(editCircleForm.targetAmount);
      if (editCircleForm.maxMembers) payload.maxMembers = parseInt(editCircleForm.maxMembers);
      if (editCircleForm.minDeposit) payload.minDeposit = parseFloat(editCircleForm.minDeposit);
      if (editCircleForm.description !== undefined) payload.description = editCircleForm.description;
      if (editCircleForm.circleType) payload.circleType = editCircleForm.circleType;
      if (editCircleForm.status) payload.status = editCircleForm.status;

      await axiosInstance.patch(`/circles/${editCircleItem._id}`, payload, { headers: getTokenHeaders() });
      setMessage({ type: "success", text: "Circle updated successfully" });
      closeEditCircle();
      fetchAdminData();
    } catch (error) {
      setMessage({ type: "error", text: getErrorMessage(error, "Failed to update circle") });
    } finally {
      setEditCircleLoading(false);
    }
  };

  const reviewRequest = async (request, action) => {
    setActionLoading(`${action}-${request._id}`);
    try {
      await axiosInstance.patch(
        `/admin/circle-join-requests/${request._id}`,
        { action },
        { headers: getTokenHeaders() },
      );
      setRequests((current) => current.filter((item) => item._id !== request._id));
      setMessage({
        type: "success",
        text: action === "approve" ? "Join request approved" : "Join request rejected",
      });
      if (action === "approve") fetchAdminData();
    } catch (error) {
      setMessage({
        type: "error",
        text: getErrorMessage(error, `Failed to ${action} join request`),
      });
    } finally {
      setActionLoading("");
    }
  };

  const currentCount = activeTab === "goals" ? filteredGoals.length : activeTab === "circles" ? filteredCircles.length : filteredRequests.length;

  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 py-6 text-[#0f172a] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-full">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Admin Control
            </div>
            <h1 className="text-2xl font-black tracking-tight sm:text-3xl">
              Goals, Circles & Join Requests
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Monitor every user goal, public/private circle, and approval request in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={fetchAdminData}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-bold text-slate-700 shadow-sm transition hover:border-emerald-500 hover:text-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{item.label}</p>
                    <p className="mt-1 text-2xl font-black">{item.value}</p>
                  </div>
                  <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${toneClass(item.tone)}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {message.text && (
          <div
            className={`mb-4 flex items-start gap-2 rounded-lg border p-3 text-sm font-semibold ${
              message.type === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            {message.type === "error" ? <AlertCircle className="mt-0.5 h-4 w-4" /> : <Check className="mt-0.5 h-4 w-4" />}
            {message.text}
          </div>
        )}

        <div className="rounded-lg border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200 p-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveTab(tab.id)}
                    className={`inline-flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-bold transition ${
                      active
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-emerald-50 hover:text-emerald-700"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 lg:w-80">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={`Search ${activeTab}...`}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
            <p className="text-sm font-bold text-slate-700">
              Showing <span className="text-emerald-700">{currentCount}</span> records
            </p>
          </div>

          {loading ? (
            <div className="flex min-h-[360px] items-center justify-center">
              <div className="text-center">
                <RefreshCw className="mx-auto mb-3 h-9 w-9 animate-spin text-emerald-600" />
                <p className="text-sm font-semibold text-slate-500">Loading admin data...</p>
              </div>
            </div>
          ) : (
            <>
              {activeTab === "goals" && (
                <GoalsTable
                  goals={filteredGoals}
                  actionLoading={actionLoading}
                  onDelete={deleteGoal}
                  onDetails={(goal) => setDetailsItem({ type: "goal", item: goal })}
                />
              )}
              {activeTab === "circles" && (
                <CirclesTable
                  circles={filteredCircles}
                  actionLoading={actionLoading}
                  onDelete={deleteCircle}
                  onDetails={(circle) => setDetailsItem({ type: "circle", item: circle })}
                  onEdit={openEditCircle}
                />
              )}
              {activeTab === "requests" && (
                <RequestsTable requests={filteredRequests} actionLoading={actionLoading} onReview={reviewRequest} />
              )}
            </>
          )}
        </div>
      </div>
      {detailsItem && (
        <DetailsModal
          type={detailsItem.type}
          item={detailsItem.item}
          onClose={() => setDetailsItem(null)}
        />
      )}

      {/* Edit Circle Modal */}
      {editCircleItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
              <div>
                <p className="text-xs font-black uppercase tracking-wide text-blue-700">Edit Circle</p>
                <h2 className="mt-1 text-xl font-black text-slate-900">{editCircleItem.circleName || "Untitled circle"}</h2>
              </div>
              <button
                type="button"
                onClick={closeEditCircle}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={submitEditCircle} className="max-h-[calc(90vh-88px)] overflow-y-auto p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">Circle Name</label>
                  <input
                    type="text"
                    value={editCircleForm.circleName}
                    onChange={(e) => setEditCircleForm((p) => ({ ...p, circleName: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">Purpose</label>
                  <input
                    type="text"
                    value={editCircleForm.purpose}
                    onChange={(e) => setEditCircleForm((p) => ({ ...p, purpose: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">Target Amount</label>
                  <input
                    type="number"
                    value={editCircleForm.targetAmount}
                    onChange={(e) => setEditCircleForm((p) => ({ ...p, targetAmount: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">Max Members</label>
                  <input
                    type="number"
                    value={editCircleForm.maxMembers}
                    onChange={(e) => setEditCircleForm((p) => ({ ...p, maxMembers: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">Min Deposit</label>
                  <input
                    type="number"
                    value={editCircleForm.minDeposit}
                    onChange={(e) => setEditCircleForm((p) => ({ ...p, minDeposit: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    min="1"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">Status</label>
                  <select
                    value={editCircleForm.status}
                    onChange={(e) => setEditCircleForm((p) => ({ ...p, status: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">Circle Type</label>
                  <select
                    value={editCircleForm.circleType}
                    onChange={(e) => setEditCircleForm((p) => ({ ...p, circleType: e.target.value }))}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-black uppercase tracking-wide text-slate-400">Description</label>
                  <textarea
                    value={editCircleForm.description}
                    onChange={(e) => setEditCircleForm((p) => ({ ...p, description: e.target.value }))}
                    rows={3}
                    className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-bold text-slate-800 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  type="button"
                  onClick={closeEditCircle}
                  disabled={editCircleLoading}
                  className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editCircleLoading}
                  className="flex-1 rounded-lg bg-blue-600 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {editCircleLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function GoalsTable({ goals, actionLoading, onDelete, onDetails }) {
  if (!goals.length) return <EmptyState text="No goals found." />;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Goal</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3">Target</th>
            <th className="px-4 py-3">Saved</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Created</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {goals.map((goal) => (
            <tr key={goal._id} className="align-top hover:bg-slate-50">
              <td className="px-4 py-4">
                <div className="font-black text-slate-900">{goal.goalName || "Untitled goal"}</div>
                <div className="mt-1 text-xs text-slate-500">{goal.goalType || "General"} / {goal.progress || 0}% complete</div>
              </td>
              <td className="px-4 py-4">
                <OwnerBlock owner={goal.owner} />
              </td>
              <td className="px-4 py-4 font-bold">{formatCurrency(goal.targetAmount)}</td>
              <td className="px-4 py-4">
                <div className="font-bold">{formatCurrency(goal.currentSaved)}</div>
                <div className="text-xs text-slate-500">{formatCurrency(goal.monthlyDeposit)} monthly</div>
              </td>
              <td className="px-4 py-4">
                <StatusBadge value={goal.status} />
              </td>
              <td className="px-4 py-4 text-slate-500">{formatDate(goal.createdAt)}</td>
              <td className="px-4 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <DetailsButton onClick={() => onDetails(goal)} />
                  <DeleteButton loading={actionLoading === `goal-${goal._id}`} onClick={() => onDelete(goal)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CirclesTable({ circles, actionLoading, onDelete, onDetails, onEdit }) {
  if (!circles.length) return <EmptyState text="No circles found." />;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Circle</th>
            <th className="px-4 py-3">Owner</th>
            <th className="px-4 py-3">Type</th>
            <th className="px-4 py-3">Members</th>
            <th className="px-4 py-3">Amount</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {circles.map((circle) => (
            <tr key={circle._id} className="align-top hover:bg-slate-50">
              <td className="px-4 py-4">
                <div className="font-black text-slate-900">{circle.circleName || "Untitled circle"}</div>
                <div className="mt-1 text-xs text-slate-500">{circle.purpose || "General"} / Created {formatDate(circle.createdAt)}</div>
              </td>
              <td className="px-4 py-4">
                <OwnerBlock owner={circle.owner} />
              </td>
              <td className="px-4 py-4">
                <TypeBadge type={circle.circleType} />
              </td>
              <td className="px-4 py-4 font-bold">
                {circle.currentMembers || 0}/{circle.maxMembers || 0}
              </td>
              <td className="px-4 py-4">
                <div className="font-bold">{formatCurrency(circle.targetAmount)}</div>
                <div className="text-xs text-slate-500">{formatCurrency(circle.minDeposit)} min deposit</div>
              </td>
              <td className="px-4 py-4">
                <StatusBadge value={circle.status} />
              </td>
              <td className="px-4 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <DetailsButton onClick={() => onDetails(circle)} />
                  <EditButton onClick={() => onEdit(circle)} />
                  <DeleteButton loading={actionLoading === `circle-${circle._id}`} onClick={() => onDelete(circle)} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function RequestsTable({ requests, actionLoading, onReview }) {
  if (!requests.length) return <EmptyState text="No pending join requests." />;

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200 text-sm">
        <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-wide text-slate-500">
          <tr>
            <th className="px-4 py-3">Circle</th>
            <th className="px-4 py-3">Requested User</th>
            <th className="px-4 py-3">Requested At</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3 text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {requests.map((request) => (
            <tr key={request._id} className="align-top hover:bg-slate-50">
              <td className="px-4 py-4">
                <div className="font-black text-slate-900">{request.circleName || "Circle"}</div>
                <div className="mt-1 text-xs text-slate-500">{request.circleType || "public"} circle</div>
              </td>
              <td className="px-4 py-4">
                <div className="font-bold text-slate-900">{request.userName || "Unknown user"}</div>
                <div className="mt-1 text-xs text-slate-500">{request.userPhone || request.userEmail || "No contact"}</div>
              </td>
              <td className="px-4 py-4 text-slate-500">{formatDate(request.requestedAt || request.createdAt)}</td>
              <td className="px-4 py-4">
                <StatusBadge value={request.status} />
              </td>
              <td className="px-4 py-4">
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => onReview(request, "approve")}
                    disabled={Boolean(actionLoading)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-2 text-xs font-bold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {actionLoading === `approve-${request._id}` ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Check className="h-3.5 w-3.5" />}
                    Approve
                  </button>
                  <button
                    type="button"
                    onClick={() => onReview(request, "reject")}
                    disabled={Boolean(actionLoading)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {actionLoading === `reject-${request._id}` ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <X className="h-3.5 w-3.5" />}
                    Reject
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function OwnerBlock({ owner }) {
  return (
    <div>
      <div className="font-bold text-slate-900">{getOwnerName(owner)}</div>
      <div className="mt-1 text-xs text-slate-500">{owner?.phone || owner?.email || "No contact"}</div>
    </div>
  );
}

function DetailsButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-bold text-emerald-700 transition hover:bg-emerald-100"
    >
      <Eye className="h-3.5 w-3.5" />
      Details
    </button>
  );
}

function EditButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs font-bold text-blue-700 transition hover:bg-blue-100"
    >
      <Pencil className="h-3.5 w-3.5" />
      Edit
    </button>
  );
}

function DeleteButton({ loading, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {loading ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : <Trash2 className="h-3.5 w-3.5" />}
      Delete
    </button>
  );
}

function DetailsModal({ type, item, onClose }) {
  const isGoal = type === "goal";
  const title = isGoal ? item.goalName || "Untitled goal" : item.circleName || "Untitled circle";
  const subtitle = isGoal ? item.goalType || "General goal" : `${item.circleType || "public"} circle`;
  const members = Array.isArray(item.members) ? item.members : [];
  const detailRows = isGoal
    ? [
        ["Owner", getOwnerName(item.owner)],
        ["Owner Contact", item.owner?.phone || item.owner?.email || "No contact"],
        ["Target Amount", formatCurrency(item.targetAmount)],
        ["Current Saved", formatCurrency(item.currentSaved)],
        ["Monthly Deposit", formatCurrency(item.monthlyDeposit)],
        ["Progress", `${Number(item.progress) || 0}%`],
        ["Status", item.status || "unknown"],
        ["Target Date", formatDate(item.targetDate)],
        ["Estimated Completion", formatDate(item.estimatedCompletionDate)],
        ["Created", formatDate(item.createdAt)],
        ["Updated", formatDate(item.updatedAt)],
      ]
    : [
        ["Owner", getOwnerName(item.owner)],
        ["Owner Contact", item.owner?.phone || item.owner?.email || "No contact"],
        ["Purpose", item.purpose || "General"],
        ["Target Amount", formatCurrency(item.targetAmount)],
        ["Total Pool", formatCurrency(item.totalPool)],
        ["Minimum Deposit", formatCurrency(item.minDeposit)],
        ["Members", `${item.currentMembers || members.length || 0}/${item.maxMembers || 0}`],
        ["Status", item.status || "unknown"],
        ["Created", formatDate(item.createdAt)],
        ["Updated", formatDate(item.updatedAt)],
      ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-wide text-emerald-700">
              {isGoal ? "Goal Details" : "Circle Details"}
            </p>
            <h2 className="mt-1 text-xl font-black text-slate-900">{title}</h2>
            <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            aria-label="Close details"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[calc(90vh-88px)] overflow-y-auto p-5">
          {item.description && (
            <div className="mb-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-black uppercase tracking-wide text-slate-400">Description</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">{item.description}</p>
            </div>
          )}

          <div className="grid gap-3 sm:grid-cols-2">
            {detailRows.map(([label, value]) => (
              <div key={label} className="rounded-lg border border-slate-200 p-3">
                <p className="text-xs font-black uppercase tracking-wide text-slate-400">{label}</p>
                <p className="mt-1 break-words text-sm font-bold text-slate-800">{value}</p>
              </div>
            ))}
          </div>

          {!isGoal && members.length > 0 && (
            <div className="mt-5">
              <p className="mb-3 text-xs font-black uppercase tracking-wide text-slate-400">Members</p>
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="min-w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50 text-left text-xs font-black uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-3 py-2">Name</th>
                      <th className="px-3 py-2">Phone</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Role</th>
                      <th className="px-3 py-2">Joined</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {members.slice(0, 12).map((member, index) => {
                      const user = member.user || {};
                      const name = user.fullName || `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Unknown";
                      return (
                        <tr key={`${member.userId || index}`}>
                          <td className="px-3 py-2 font-semibold text-slate-700">{name}</td>
                          <td className="px-3 py-2 text-slate-500">{user.phone || "N/A"}</td>
                          <td className="px-3 py-2 text-slate-500">{user.email || "N/A"}</td>
                          <td className="px-3 py-2 text-slate-500">{member.role || "member"}</td>
                          <td className="px-3 py-2 text-slate-500">{formatDate(member.joinedAt || member.createdAt)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {members.length > 12 && (
                <p className="mt-2 text-xs font-semibold text-slate-500">
                  Showing 12 of {members.length} members.
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ value = "unknown" }) {
  const normalized = String(value || "unknown").toLowerCase();
  const styles = normalized === "active" || normalized === "pending"
    ? "bg-emerald-50 text-emerald-700"
    : normalized === "completed" || normalized === "approved"
      ? "bg-blue-50 text-blue-700"
      : normalized === "rejected" || normalized === "paused"
        ? "bg-red-50 text-red-700"
        : "bg-slate-100 text-slate-600";

  return <span className={`rounded-full px-2.5 py-1 text-xs font-black capitalize ${styles}`}>{normalized}</span>;
}

function TypeBadge({ type = "public" }) {
  const isPrivate = type === "private";
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-black capitalize ${isPrivate ? "bg-slate-100 text-slate-700" : "bg-cyan-50 text-cyan-700"}`}>
      {isPrivate ? <Lock className="h-3 w-3" /> : <CircleDollarSign className="h-3 w-3" />}
      {type || "public"}
    </span>
  );
}

function EmptyState({ text }) {
  return (
    <div className="flex min-h-[260px] items-center justify-center p-8 text-center">
      <div>
        <AlertCircle className="mx-auto mb-3 h-9 w-9 text-slate-300" />
        <p className="text-sm font-bold text-slate-500">{text}</p>
      </div>
    </div>
  );
}

function toneClass(tone) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700",
    cyan: "bg-cyan-50 text-cyan-700",
    amber: "bg-amber-50 text-amber-700",
    slate: "bg-slate-100 text-slate-700",
  };
  return tones[tone] || tones.emerald;
}
