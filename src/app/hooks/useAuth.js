"use client";

import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from "next/navigation";

import Swal from "sweetalert2";
import axiosInstance from "../components/shared/AxiosInstance/AxiosInstance";

// Create Auth Context
const AuthContext = createContext();

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Get current user from API
  const getCurrentUser = async () => {
    try {
      const storedToken = localStorage.getItem("token");
      if (!storedToken) {
        setIsLoading(false);
        return null;
      }

      // Set token in axios headers
      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${storedToken}`;
      setToken(storedToken);

      const response = await axiosInstance.get("/users/me");

      if (response.data.success) {
        const userData = response.data.data;
        setUser(userData);
        setIsAuthenticated(true);
        return userData;
      } else {
        // Token invalid or expired
        logout();
        return null;
      }
    } catch (error) {
      console.error("Get current user error:", error);
      if (error.response?.status === 401 || error.response?.status === 403) {
        logout();
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (identifier, password) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/login", {
        identifier,
        password,
      });

      if (response.data.success) {
        const { token: authToken, user: userData } = response.data.data;

        // Store token and user data
        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(userData));

        // Set axios default header
        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${authToken}`;

        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);

        return { success: true, user: userData };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Login error:", error);
      let message = "Login failed. Please try again.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (formData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/register", formData);

      if (response.data.success) {
        const { token: authToken, user: userData } = response.data.data;

        localStorage.setItem("token", authToken);
        localStorage.setItem("user", JSON.stringify(userData));

        axiosInstance.defaults.headers.common["Authorization"] =
          `Bearer ${authToken}`;

        setToken(authToken);
        setUser(userData);
        setIsAuthenticated(true);

        return { success: true, user: userData };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Registration error:", error);
      let message = "Registration failed. Please try again.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async (showAlert = true) => {
    setIsLoading(true);
    try {
      // Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      // Clear axios header
      delete axiosInstance.defaults.headers.common["Authorization"];

      setUser(null);
      setToken(null);
      setIsAuthenticated(false);

      if (showAlert) {
        Swal.fire({
          title: "Logged Out",
          text: "You have been successfully logged out.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        });
      }

      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (profileData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put("/users/profile", profileData);

      if (response.data.success) {
        setUser(response.data.data);
        localStorage.setItem("user", JSON.stringify(response.data.data));

        Swal.fire({
          title: "Profile Updated",
          text: "Your profile has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        });

        return { success: true, user: response.data.data };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Update profile error:", error);
      let message = "Failed to update profile.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      Swal.fire({
        title: "Update Failed",
        text: message,
        icon: "error",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Change password function
  const changePassword = async (currentPassword, newPassword) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put("/users/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.data.success) {
        Swal.fire({
          title: "Password Changed",
          text: "Your password has been changed successfully.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        });
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Change password error:", error);
      let message = "Failed to change password.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      Swal.fire({
        title: "Password Change Failed",
        text: message,
        icon: "error",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Change PIN function
  const changePin = async (currentPin, newPin) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put("/users/change-pin", {
        currentPin,
        newPin,
      });

      if (response.data.success) {
        Swal.fire({
          title: "PIN Changed",
          text: "Your transaction PIN has been changed successfully.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        });
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Change PIN error:", error);
      let message = "Failed to change PIN.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      Swal.fire({
        title: "PIN Change Failed",
        text: message,
        icon: "error",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Upload profile picture
  const uploadProfilePicture = async (file) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);

      const response = await axiosInstance.post(
        "/users/profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      if (response.data.success) {
        setUser((prev) => ({
          ...prev,
          profilePicture: response.data.data.url,
        }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, profilePicture: response.data.data.url }),
        );

        Swal.fire({
          title: "Photo Updated",
          text: "Your profile picture has been updated successfully.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        });
        return { success: true, url: response.data.data.url };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Upload profile picture error:", error);
      Swal.fire({
        title: "Upload Failed",
        text: "Failed to upload profile picture.",
        icon: "error",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return { success: false, message: "Upload failed" };
    } finally {
      setIsLoading(false);
    }
  };

  // Delete profile picture
  const deleteProfilePicture = async () => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.delete("/users/profile-picture");

      if (response.data.success) {
        setUser((prev) => ({ ...prev, profilePicture: null }));
        localStorage.setItem(
          "user",
          JSON.stringify({ ...user, profilePicture: null }),
        );

        Swal.fire({
          title: "Photo Deleted",
          text: "Your profile picture has been deleted.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        });
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Delete profile picture error:", error);
      Swal.fire({
        title: "Delete Failed",
        text: "Failed to delete profile picture.",
        icon: "error",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return { success: false, message: "Delete failed" };
    } finally {
      setIsLoading(false);
    }
  };

  // Update KYC documents
  const updateKycDocuments = async (kycData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/users/kyc-documents", kycData);

      if (response.data.success) {
        // Refresh user data to get updated KYC info
        await getCurrentUser();

        Swal.fire({
          title: "KYC Documents Updated",
          text: "Your KYC documents have been submitted for review.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        });
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Update KYC documents error:", error);
      let message = "Failed to update KYC documents.";
      if (error.response?.data?.message) {
        message = error.response.data.message;
      }
      Swal.fire({
        title: "Update Failed",
        text: message,
        icon: "error",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  };

  // Update nominee
  const updateNominee = async (nomineeData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put("/users/nominee", nomineeData);

      if (response.data.success) {
        setUser((prev) => ({ ...prev, nominee: nomineeData }));

        Swal.fire({
          title: "Nominee Updated",
          text: "Your nominee information has been updated.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        });
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Update nominee error:", error);
      Swal.fire({
        title: "Update Failed",
        text: "Failed to update nominee information.",
        icon: "error",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return { success: false, message: "Update failed" };
    } finally {
      setIsLoading(false);
    }
  };

  // Update payment method
  const updatePaymentMethod = async (paymentData) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.put(
        "/users/payment-method",
        paymentData,
      );

      if (response.data.success) {
        setUser((prev) => ({
          ...prev,
          paymentMethod: paymentData.paymentMethod,
          paymentDetails:
            paymentData.paymentMethod !== "bank"
              ? {
                  walletNumber: paymentData.walletNumber,
                  accountName: paymentData.walletName,
                }
              : {
                  bankName: paymentData.bankName,
                  accountNumber: paymentData.bankAccNum,
                  accountName: paymentData.bankAccName,
                },
        }));

        Swal.fire({
          title: "Payment Method Updated",
          text: "Your payment method has been updated.",
          icon: "success",
          confirmButtonColor: "#059669",
          confirmButtonText: "OK",
        });
        return { success: true };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      console.error("Update payment method error:", error);
      Swal.fire({
        title: "Update Failed",
        text: "Failed to update payment method.",
        icon: "error",
        confirmButtonColor: "#059669",
        confirmButtonText: "OK",
      });
      return { success: false, message: "Update failed" };
    } finally {
      setIsLoading(false);
    }
  };

  // Initialize auth on mount
  useEffect(() => {
      getCurrentUser();
  }, []);

  // Axios interceptor for token refresh
  useEffect(() => {
    const interceptor = axiosInstance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Token expired, logout user
          logout(false);
          router.push("/login");
        }

        return Promise.reject(error);
      },
    );

    return () => {
      axiosInstance.interceptors.response.eject(interceptor);
    };
  }, [router]);

  const value = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    getCurrentUser,
    updateProfile,
    changePassword,
    changePin,
    uploadProfilePicture,
    deleteProfilePicture,
    updateKycDocuments,
    updateNominee,
    updatePaymentMethod,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
