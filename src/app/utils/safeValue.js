// Safe value helpers for preventing null/undefined/NaN display issues

export const safeString = (val, fallback = "") => {
  if (val === null || val === undefined || val === "null" || val === "undefined") {
    return fallback;
  }
  return String(val);
};

export const safeNumber = (val, fallback = 0) => {
  const num = Number(val);
  if (val === null || val === undefined || val === "" || Number.isNaN(num)) {
    return fallback;
  }
  return num;
};

export const safeBool = (val) => {
  if (val === null || val === undefined) return false;
  if (typeof val === "boolean") return val;
  if (typeof val === "string") return val.toLowerCase() === "true";
  return Boolean(val);
};

export const safeDate = (val, fallback = null) => {
  if (!val || val === "null" || val === "undefined") return fallback;
  const date = new Date(val);
  if (Number.isNaN(date.getTime())) return fallback;
  return date;
};

export const safeObject = (val, fallback = null) => {
  if (val === null || val === undefined || (typeof val === "object" && Object.keys(val).length === 0)) {
    return fallback;
  }
  return val;
};

export const safeArray = (val, fallback = []) => {
  if (!Array.isArray(val)) return fallback;
  return val;
};

// Format currency safely
export const formatCurrencySafe = (amount, currency = "৳") => {
  const num = safeNumber(amount, 0);
  return `${currency}${num.toLocaleString("en-IN")}`;
};

// Format date safely
export const formatDateSafe = (dateVal, options = {}) => {
  const date = safeDate(dateVal);
  if (!date) return "N/A";
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    ...options,
  });
};

// Format percentage safely
export const formatPercentSafe = (val, fallback = "0%") => {
  const num = safeNumber(val, 0);
  if (num === 0) return fallback;
  return `${num}%`;
};

// Get display name safely
export const getDisplayName = (user, fallback = "User") => {
  if (!user) return fallback;
  const fullName = safeString(user.fullName);
  const firstName = safeString(user.firstName);
  const lastName = safeString(user.lastName);
  
  if (fullName) return fullName;
  if (firstName && lastName) return `${firstName} ${lastName}`.trim();
  if (firstName) return firstName;
  if (lastName) return lastName;
  return fallback;
};

// Get plan display name safely
export const getPlanDisplayName = (user) => {
  if (!user) return "Bronze";
  if (user.selectedPlan === "custom" && user.customPlanName) {
    return user.customPlanName;
  }
  return safeString(user.selectedPlan, "bronze");
};

// Get goal type display name safely
export const getGoalTypeDisplayName = (goal) => {
  if (!goal) return "No Goal";
  if (goal.type === "Custom Goal" && goal.customGoalName) {
    return goal.customGoalName;
  }
  return safeString(goal.type, "No Goal");
};

// Safe access for nested objects
export const getNestedValue = (obj, path, fallback = null) => {
  if (!obj || typeof obj !== "object") return fallback;
  const keys = path.split(".");
  let current = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== "object") {
      return fallback;
    }
    current = current[key];
  }
  return current !== null && current !== undefined ? current : fallback;
};
