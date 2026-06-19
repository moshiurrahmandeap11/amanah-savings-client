"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  DollarSign,
  Users,
  Target,
  CreditCard,
  Shield,
  Edit2,
  Save,
  X,
  Camera,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  Lock,
  Upload,
  Trash2,
} from "lucide-react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import axiosInstance from "../shared/AxiosInstance/AxiosInstance";
import Image from "next/image";

const UserProfilePage = () => {
  const {
    user,
    getCurrentUser,
    updateProfile,
    changePassword,
    changePin,
    uploadProfilePicture,
    deleteProfilePicture,
  } = useAuth();

  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef(null);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [pinData, setPinData] = useState({
    currentPin: "",
    newPin: "",
    confirmPin: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    division: "",
    district: "",
    upazila: "",
    village: "",
    postOffice: "",
    postCode: "",
    occupation: "",
    income: "",
    nomineeFirstName: "",
    nomineeLastName: "",
    nomineeRelation: "",
    nomineePhone: "",
    nomineeNid: "",
    nomineeShare: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      await getCurrentUser();
      setLoading(false);
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (user) {
      const tryCall = async () => {
        setFormData({
          firstName: user.firstName || "",
          lastName: user.lastName || "",
          email: user.email || "",
          phone: user.phone || "",
          dob: user.dob || "",
          gender: user.gender || "",
          division: user.division || "",
          district: user.district || "",
          upazila: user.upazila || "",
          village: user.village || "",
          postOffice: user.postOffice || "",
          postCode: user.postCode || "",
          occupation: user.occupation || "",
          income: user.income || "",
          nomineeFirstName: user.nominee?.firstName || "",
          nomineeLastName: user.nominee?.lastName || "",
          nomineeRelation: user.nominee?.relation || "",
          nomineePhone: user.nominee?.phone || "",
          nomineeNid: user.nominee?.nid || "",
          nomineeShare: user.nominee?.share?.toString() || "100",
        });
      };
      tryCall();
    }
  }, [user]);

  const showAlert = (title, message, type = "success") => {
    Swal.fire({
      title: title,
      text: message,
      icon: type,
      confirmButtonColor: "#059669",
      confirmButtonText: "OK",
    });
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const validateProfileForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First name is required";
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.dob) newErrors.dob = "Date of birth is required";
    if (!formData.occupation) newErrors.occupation = "Occupation is required";
    if (!formData.income) newErrors.income = "Income range is required";
    if (!formData.nomineeFirstName)
      newErrors.nomineeFirstName = "Nominee first name is required";
    if (!formData.nomineeRelation)
      newErrors.nomineeRelation = "Nominee relation is required";
    if (!formData.nomineePhone)
      newErrors.nomineePhone = "Nominee phone is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveProfile = async () => {
    if (!validateProfileForm()) {
      showAlert("Validation Error", "Please fill all required fields", "error");
      return;
    }

    const updateData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      dob: formData.dob,
      gender: formData.gender,
      division: formData.division,
      district: formData.district,
      upazila: formData.upazila,
      village: formData.village,
      postOffice: formData.postOffice,
      postCode: formData.postCode,
      occupation: formData.occupation,
      income: formData.income,
    };

    const result = await updateProfile(updateData);
    if (result.success) {
      setEditMode(false);
      await getCurrentUser();
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showAlert("Error", "New passwords do not match", "error");
      return;
    }
    if (passwordData.newPassword.length < 8) {
      showAlert("Error", "Password must be at least 8 characters", "error");
      return;
    }

    const result = await changePassword(
      passwordData.currentPassword,
      passwordData.newPassword,
    );
    if (result.success) {
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    }
  };

  const handleChangePin = async () => {
    if (pinData.newPin !== pinData.confirmPin) {
      showAlert("Error", "New PINs do not match", "error");
      return;
    }
    if (!/^\d{6}$/.test(pinData.newPin)) {
      showAlert("Error", "PIN must be 6 digits", "error");
      return;
    }

    const result = await changePin(pinData.currentPin, pinData.newPin);
    if (result.success) {
      setShowPinModal(false);
      setPinData({
        currentPin: "",
        newPin: "",
        confirmPin: "",
      });
    }
  };

  // Handle profile picture upload
  const handleFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showAlert(
        "Invalid File",
        "Please select a valid image file (JPEG, PNG, WEBP)",
        "error",
      );
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      showAlert(
        "File Too Large",
        "Image size should be less than 2MB",
        "error",
      );
      return;
    }

    setUploadingImage(true);

    try {
      const result = await uploadProfilePicture(file);
      if (result.success) {
        showAlert(
          "Success!",
          "Profile picture updated successfully",
          "success",
        );
        await getCurrentUser(); // Refresh user data
      } else {
        showAlert(
          "Failed",
          result.message || "Failed to upload image",
          "error",
        );
      }
    } catch (error) {
      console.error("Upload error:", error);
      showAlert("Error", "Something went wrong. Please try again.", "error");
    } finally {
      setUploadingImage(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  const handleDeleteProfilePicture = async () => {
    const result = await Swal.fire({
      title: "Delete Profile Picture?",
      text: "Are you sure you want to delete your profile picture?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#059669",
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
    });

    if (result.isConfirmed) {
      setUploadingImage(true);
      try {
        const deleteResult = await deleteProfilePicture();
        if (deleteResult.success) {
          showAlert("Deleted!", "Profile picture has been removed", "success");
          await getCurrentUser(); // Refresh user data
        } else {
          showAlert(
            "Failed",
            deleteResult.message || "Failed to delete image",
            "error",
          );
        }
      } catch (error) {
        console.error("Delete error:", error);
        showAlert("Error", "Something went wrong. Please try again.", "error");
      } finally {
        setUploadingImage(false);
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("bn-BD");
  };

  const formatCurrency = (amount) => {
    if (!amount) return "৳0";
    return `৳${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-foreground/60">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            User not found
          </h2>
          <p className="text-foreground/60 mb-4">
            Please login to view your profile
          </p>
        </div>
      </div>
    );
  }

  // Tab configuration
  const tabs = [
    { id: "profile", label: "Personal Info", icon: User },
    { id: "address", label: "Address", icon: MapPin },
    { id: "nominee", label: "Nominee", icon: Users },
    { id: "financial", label: "Financial", icon: DollarSign },
    { id: "kyc", label: "KYC Status", icon: Shield },
    { id: "security", label: "Security", icon: Lock },
  ];

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-2xl p-6 mb-6"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              {/* Profile Picture Section */}
              <div className="relative group">
                <div className="relative">
                  {user.profilePicture ? (
                    <Image
                      src={user.profilePicture}
                      alt="Profile"
                      width={100}
                      height={100}
                      className="w-20 h-20 rounded-full object-cover border-2 border-primary"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full bg-linear-to-r from-primary to-primary-light flex items-center justify-center text-white text-3xl font-bold">
                      {user.firstName?.[0] || user.fullName?.[0] || "U"}
                    </div>
                  )}

                  {/* Upload Button Overlay */}
                  <button
                    onClick={handleFileSelect}
                    disabled={uploadingImage}
                    className="absolute bottom-0 right-0 p-1.5 bg-primary rounded-full text-white hover:bg-primary-light transition disabled:opacity-50"
                    aria-label="Change profile picture"
                  >
                    {uploadingImage ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <Camera size={14} />
                    )}
                  </button>

                  {/* Hidden file input */}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Delete Button (only if has profile picture) */}
                {user.profilePicture && (
                  <button
                    onClick={handleDeleteProfilePicture}
                    disabled={uploadingImage}
                    className="absolute -top-1 -right-1 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition disabled:opacity-50"
                    aria-label="Delete profile picture"
                  >
                    <Trash2 size={12} />
                  </button>
                )}
              </div>

              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  {user.fullName || `${user.firstName} ${user.lastName || ""}`}
                </h1>
                <p className="text-foreground/60 flex items-center gap-2 mt-1">
                  <User size={14} />{" "}
                  {user.role === "user" ? "Member" : user.role}
                  {user.kyc?.status === "verified" && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-500 rounded-full text-xs">
                      <Shield size={10} /> KYC Verified
                    </span>
                  )}
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              {!editMode ? (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-4 py-2 bg-primary text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
                >
                  <Edit2 size={16} /> Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-green-500 text-white rounded-xl font-semibold hover:opacity-90 transition flex items-center gap-2"
                  >
                    <Save size={16} /> Save
                  </button>
                  <button
                    onClick={() => {
                      setEditMode(false);
                      if (user) {
                        setFormData({
                          firstName: user.firstName || "",
                          lastName: user.lastName || "",
                          email: user.email || "",
                          phone: user.phone || "",
                          dob: user.dob || "",
                          gender: user.gender || "",
                          division: user.division || "",
                          district: user.district || "",
                          upazila: user.upazila || "",
                          village: user.village || "",
                          postOffice: user.postOffice || "",
                          postCode: user.postCode || "",
                          occupation: user.occupation || "",
                          income: user.income || "",
                          nomineeFirstName: user.nominee?.firstName || "",
                          nomineeLastName: user.nominee?.lastName || "",
                          nomineeRelation: user.nominee?.relation || "",
                          nomineePhone: user.nominee?.phone || "",
                          nomineeNid: user.nominee?.nid || "",
                          nomineeShare:
                            user.nominee?.share?.toString() || "100",
                        });
                      }
                    }}
                    className="px-4 py-2 border border-border rounded-xl font-semibold text-foreground/70 hover:border-red-500 hover:text-red-500 transition flex items-center gap-2"
                  >
                    <X size={16} /> Cancel
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-xl font-semibold transition flex items-center gap-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-primary text-white"
                    : "bg-card border border-border text-foreground/60 hover:border-primary"
                }`}
              >
                <IconComponent size={16} /> {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content - Rest of your existing code remains the same */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-card border border-border rounded-2xl p-6"
        >
          {/* Personal Info Tab */}
          {activeTab === "profile" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <User size={20} /> Personal Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  label="First Name"
                  value={formData.firstName}
                  field="firstName"
                  editMode={editMode}
                  onChange={handleInputChange}
                  error={errors.firstName}
                />
                <InfoField
                  label="Last Name"
                  value={formData.lastName}
                  field="lastName"
                  editMode={editMode}
                  onChange={handleInputChange}
                />
                <InfoField
                  label="Email"
                  value={formData.email}
                  field="email"
                  type="email"
                  editMode={editMode}
                  onChange={handleInputChange}
                />
                <InfoField
                  label="Phone"
                  value={formData.phone}
                  field="phone"
                  editMode={editMode}
                  onChange={handleInputChange}
                  error={errors.phone}
                />
                <InfoField
                  label="Date of Birth"
                  value={formData.dob}
                  field="dob"
                  type="date"
                  editMode={editMode}
                  onChange={handleInputChange}
                  error={errors.dob}
                />
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Gender
                  </label>
                  {editMode ? (
                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                    >
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                      {formData.gender || "Not specified"}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Occupation *
                  </label>
                  {editMode ? (
                    <select
                      value={formData.occupation}
                      onChange={(e) =>
                        handleInputChange("occupation", e.target.value)
                      }
                      className={`w-full p-3 rounded-xl border ${
                        errors.occupation ? "border-red-500" : "border-border"
                      } bg-background text-foreground outline-none focus:border-primary`}
                    >
                      <option value="">Select Occupation</option>
                      <option>Student</option>
                      <option>Govt. Employee</option>
                      <option>Private Employee</option>
                      <option>Business Owner</option>
                      <option>Freelancer</option>
                      <option>Homemaker</option>
                      <option>Farmer</option>
                      <option>Engineer</option>
                      <option>Doctor</option>
                      <option>Teacher</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                      {formData.occupation || "Not specified"}
                    </p>
                  )}
                  {errors.occupation && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.occupation}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Monthly Income *
                  </label>
                  {editMode ? (
                    <select
                      value={formData.income}
                      onChange={(e) =>
                        handleInputChange("income", e.target.value)
                      }
                      className={`w-full p-3 rounded-xl border ${
                        errors.income ? "border-red-500" : "border-border"
                      } bg-background text-foreground outline-none focus:border-primary`}
                    >
                      <option value="">Select Income Range</option>
                      <option>Below ৳10,000</option>
                      <option>৳10,000 – ৳25,000</option>
                      <option>৳25,000 – ৳50,000</option>
                      <option>৳50,000 – ৳1,00,000</option>
                      <option>Above ৳1,00,000</option>
                      <option>Prefer not to say</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                      {formData.income || "Not specified"}
                    </p>
                  )}
                  {errors.income && (
                    <p className="text-xs text-red-500 mt-1">{errors.income}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Address Tab */}
          {activeTab === "address" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <MapPin size={20} /> Address Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  label="Division"
                  value={formData.division}
                  field="division"
                  editMode={editMode}
                  onChange={handleInputChange}
                />
                <InfoField
                  label="District"
                  value={formData.district}
                  field="district"
                  editMode={editMode}
                  onChange={handleInputChange}
                />
                <InfoField
                  label="Upazila / Area"
                  value={formData.upazila}
                  field="upazila"
                  editMode={editMode}
                  onChange={handleInputChange}
                />
                <InfoField
                  label="Village / Area / Street"
                  value={formData.village}
                  field="village"
                  editMode={editMode}
                  onChange={handleInputChange}
                />
                <InfoField
                  label="Post Office"
                  value={formData.postOffice}
                  field="postOffice"
                  editMode={editMode}
                  onChange={handleInputChange}
                />
                <InfoField
                  label="Post Code"
                  value={formData.postCode}
                  field="postCode"
                  editMode={editMode}
                  onChange={handleInputChange}
                />
              </div>
            </div>
          )}

          {/* Nominee Tab */}
          {activeTab === "nominee" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Users size={20} /> Nominee Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoField
                  label="Nominee First Name *"
                  value={formData.nomineeFirstName}
                  field="nomineeFirstName"
                  editMode={editMode}
                  onChange={handleInputChange}
                  error={errors.nomineeFirstName}
                />
                <InfoField
                  label="Nominee Last Name"
                  value={formData.nomineeLastName}
                  field="nomineeLastName"
                  editMode={editMode}
                  onChange={handleInputChange}
                />
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Relationship *
                  </label>
                  {editMode ? (
                    <select
                      value={formData.nomineeRelation}
                      onChange={(e) =>
                        handleInputChange("nomineeRelation", e.target.value)
                      }
                      className={`w-full p-3 rounded-xl border ${
                        errors.nomineeRelation
                          ? "border-red-500"
                          : "border-border"
                      } bg-background text-foreground outline-none focus:border-primary`}
                    >
                      <option value="">Select Relationship</option>
                      <option>Spouse</option>
                      <option>Father</option>
                      <option>Mother</option>
                      <option>Son</option>
                      <option>Daughter</option>
                      <option>Brother</option>
                      <option>Sister</option>
                      <option>Other</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                      {formData.nomineeRelation || "Not specified"}
                    </p>
                  )}
                  {errors.nomineeRelation && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.nomineeRelation}
                    </p>
                  )}
                </div>
                <InfoField
                  label="Nominee Phone *"
                  value={formData.nomineePhone}
                  field="nomineePhone"
                  editMode={editMode}
                  onChange={handleInputChange}
                  error={errors.nomineePhone}
                />
                <InfoField
                  label="Nominee NID"
                  value={formData.nomineeNid}
                  field="nomineeNid"
                  editMode={editMode}
                  onChange={handleInputChange}
                />
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Share of Savings (%)
                  </label>
                  {editMode ? (
                    <select
                      value={formData.nomineeShare}
                      onChange={(e) =>
                        handleInputChange("nomineeShare", e.target.value)
                      }
                      className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                    >
                      <option value="100">100% — Full savings</option>
                      <option value="75">75%</option>
                      <option value="50">50%</option>
                      <option value="25">25%</option>
                    </select>
                  ) : (
                    <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                      {formData.nomineeShare}%
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Financial Tab */}
          {activeTab === "financial" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <DollarSign size={20} /> Financial Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Savings Plan
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground capitalize">
                    {user.selectedPlan || "Not selected"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Goal Type
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {user.goal?.type || "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Target Amount
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {formatCurrency(user.goal?.targetAmount)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Monthly Deposit
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {formatCurrency(user.goal?.monthlyDeposit)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Duration
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {user.goal?.duration
                      ? `${user.goal.duration} months`
                      : "Not set"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Current Saved
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {formatCurrency(user.goal?.currentSaved)}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    Progress
                  </label>
                  <div className="p-3 bg-secondary/20 rounded-xl">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm text-foreground">
                        {user.goal?.progress || 0}%
                      </span>
                    </div>
                    <div className="w-full bg-border rounded-full h-2">
                      <div
                        className="bg-primary rounded-full h-2 transition-all"
                        style={{ width: `${user.goal?.progress || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-bold text-foreground mb-3">
                  Payment Method
                </h3>
                <div className="p-4 bg-secondary/20 rounded-xl">
                  <p className="capitalize">
                    <strong>Method:</strong> {user.paymentMethod || "Not set"}
                  </p>
                  {user.paymentMethod !== "bank" ? (
                    <>
                      <p>
                        <strong>Wallet Number:</strong>{" "}
                        {user.paymentDetails?.walletNumber || "N/A"}
                      </p>
                      <p>
                        <strong>Account Name:</strong>{" "}
                        {user.paymentDetails?.accountName || "N/A"}
                      </p>
                    </>
                  ) : (
                    <>
                      <p>
                        <strong>Bank Name:</strong>{" "}
                        {user.paymentDetails?.bankName || "N/A"}
                      </p>
                      <p>
                        <strong>Account Number:</strong>{" "}
                        {user.paymentDetails?.accountNumber || "N/A"}
                      </p>
                      <p>
                        <strong>Account Name:</strong>{" "}
                        {user.paymentDetails?.accountName || "N/A"}
                      </p>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* KYC Tab */}
          {activeTab === "kyc" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Shield size={20} /> KYC Status
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    NID Number
                  </label>
                  <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
                    {user.kyc?.nidNumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground/70 mb-1">
                    KYC Status
                  </label>
                  <div className="p-3 bg-secondary/20 rounded-xl">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        user.kyc?.status === "verified"
                          ? "bg-green-500/10 text-green-500"
                          : user.kyc?.status === "pending"
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {user.kyc?.status === "verified" && <Check size={14} />}
                      {user.kyc?.status || "pending"}
                    </span>
                  </div>
                </div>
                {user.kyc?.status === "pending" && (
                  <div className="md:col-span-2">
                    <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
                      <p className="text-yellow-500 text-sm">
                        ⏳ Your KYC is under review. Our team will verify within
                        4 hours.
                      </p>
                    </div>
                  </div>
                )}
                {user.kyc?.status === "verified" && (
                  <div className="md:col-span-2">
                    <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl">
                      <p className="text-green-500 text-sm">
                        ✓ Your KYC has been verified. Your account is fully
                        active.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Security Tab */}
          {activeTab === "security" && (
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <Lock size={20} /> Security Settings
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  onClick={() => setShowPasswordModal(true)}
                  className="p-4 border border-border rounded-xl text-left hover:border-primary transition"
                >
                  <h3 className="font-semibold text-foreground mb-1">
                    Change Password
                  </h3>
                  <p className="text-sm text-foreground/60">
                    Update your account password
                  </p>
                </button>
                <button
                  onClick={() => setShowPinModal(true)}
                  className="p-4 border border-border rounded-xl text-left hover:border-primary transition"
                >
                  <h3 className="font-semibold text-foreground mb-1">
                    Change Transaction PIN
                  </h3>
                  <p className="text-sm text-foreground/60">
                    Update your 6-digit transaction PIN
                  </p>
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">
              Change Password
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleChangePassword}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold"
              >
                Update Password
              </button>
              <button
                onClick={() => setShowPasswordModal(false)}
                className="flex-1 py-3 border border-border rounded-xl font-semibold text-foreground/70"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Change PIN Modal */}
      {showPinModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-card border border-border rounded-2xl p-6 max-w-md w-full"
          >
            <h2 className="text-xl font-bold text-foreground mb-4">
              Change Transaction PIN
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Current PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={pinData.currentPin}
                  onChange={(e) =>
                    setPinData({
                      ...pinData,
                      currentPin: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  placeholder="6-digit PIN"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  New PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={pinData.newPin}
                  onChange={(e) =>
                    setPinData({
                      ...pinData,
                      newPin: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  placeholder="6-digit PIN"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-1">
                  Confirm New PIN
                </label>
                <input
                  type="password"
                  maxLength={6}
                  value={pinData.confirmPin}
                  onChange={(e) =>
                    setPinData({
                      ...pinData,
                      confirmPin: e.target.value.replace(/\D/g, ""),
                    })
                  }
                  className="w-full p-3 rounded-xl border border-border bg-background text-foreground outline-none focus:border-primary"
                  placeholder="6-digit PIN"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleChangePin}
                className="flex-1 py-3 bg-primary text-white rounded-xl font-semibold"
              >
                Update PIN
              </button>
              <button
                onClick={() => setShowPinModal(false)}
                className="flex-1 py-3 border border-border rounded-xl font-semibold text-foreground/70"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

// Info Field Component
const InfoField = ({
  label,
  value,
  field,
  type = "text",
  editMode,
  onChange,
  error,
}) => {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground/70 mb-1">
        {label}
      </label>
      {editMode ? (
        <input
          type={type}
          value={value || ""}
          onChange={(e) => onChange(field, e.target.value)}
          className={`w-full p-3 rounded-xl border ${
            error ? "border-red-500" : "border-border"
          } bg-background text-foreground outline-none focus:border-primary`}
        />
      ) : (
        <p className="p-3 bg-secondary/20 rounded-xl text-foreground">
          {value || "Not provided"}
        </p>
      )}
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
};

export default UserProfilePage;
