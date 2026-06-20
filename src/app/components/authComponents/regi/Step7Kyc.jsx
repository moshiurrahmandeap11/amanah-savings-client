"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Check, Camera, X, Loader2, Smartphone, SkipForward, AlertCircle } from "lucide-react";
import axiosInstance from "../../shared/AxiosInstance/AxiosInstance";

const translations = {
  en: {
    stepLabel: "Step 7 / 8",
    verifyIdentity: "Verify Identity 🪪",
    kycDesc: "KYC is mandatory to activate your account. Our team will verify within 4 hours.",
    kycOptional: "You can skip KYC for now and complete it later from your profile.",
    nidLabel: "National ID (NID)",
    nidFront: "Front Side",
    nidBack: "Back Side",
    nidClear: "Clear photo required",
    nidUploaded: "✅ Uploaded",
    nidRequired: "Please upload both sides of your NID",
    nidNumber: "NID Number",
    nidPlaceholder: "Enter NID number",
    nidHint: "NID number is written on the front side",
    nidNumberRequired: "NID number is required",
    nidInvalid: "Please enter a valid NID number (10 or 17 digits)",
    birthCertificate: "Birth Certificate",
    birthOptional: "(Optional)",
    birthNote: "If no NID",
    birthUpload: "Upload Birth Certificate",
    birthHint: "Optional — Not needed if you have NID",
    birthRequired: "Birth certificate is required when NID is not provided",
    selfieLabel: "Live Selfie",
    selfieMain: "Start Camera",
    selfieHint: "Hold NID in hand · Take in good light",
    selfieDone: "✅ Selfie taken!",
    selfieRequired: "Please take a live selfie",
    selfieRetake: "Retake",
    selfieCancel: "Cancel",
    selfieCapture: "📸 Take Photo",
    selfieUpload: "📤 Upload Selfie",
    selfieUploadHint: "Upload a clear photo of yourself holding your NID",
    noCamera: "No Camera?",
    uploadSelfie: "Upload Selfie Photo",
    passportLabel: "Passport",
    passportOpt: "(Optional — For additional verification)",
    passportUpload: "Upload Passport",
    passportHint: "Optional — For enhanced verification",
    kycConsent: "I confirm that the documents provided are my own and the information is accurate.",
    kycConsentRequired: "Please agree to KYC consent",
    secureDocs: "🔐 Your documents are completely secure. All KYC files are encrypted. Never shared with third parties.",
    nextButton: "Next — Payment Info →",
    skipButton: "Skip KYC →",
    previous: "← Previous",
    fileTooLarge: "File Too Large",
    selectValidImage: "Please select a valid image file (JPEG, PNG, WEBP)",
    imageSizeLimit: "Image size should be less than 5MB",
    cameraError: "Camera access denied",
    takePhoto: "Take Photo",
    uploading: "Uploading...",
    noCameraDetected: "No camera detected. Please upload a selfie photo instead.",
  },
  bn: {
    stepLabel: "ধাপ ৭ / ৮",
    verifyIdentity: "পরিচয় যাচাই করুন 🪪",
    kycDesc: "আপনার অ্যাকাউন্ট সক্রিয় করতে কেওয়াইসি বাধ্যতামূলক। আমাদের টিম ৪ ঘন্টার মধ্যে যাচাই করবে।",
    kycOptional: "আপনি এখন KYC স্কিপ করে পরে প্রোফাইল থেকে সম্পূর্ণ করতে পারেন।",
    nidLabel: "জাতীয় পরিচয়পত্র (NID)",
    nidFront: "সামনের পাশ",
    nidBack: "পেছনের পাশ",
    nidClear: "স্পষ্ট ছবি আবশ্যক",
    nidUploaded: "✅ আপলোড হয়েছে",
    nidRequired: "দয়া করে NID এর উভয় পাশ আপলোড করুন",
    nidNumber: "NID নম্বর",
    nidPlaceholder: "NID নম্বর দিন",
    nidHint: "সামনের পাশে NID নম্বর লেখা আছে",
    nidNumberRequired: "NID নম্বর প্রয়োজন",
    nidInvalid: "দয়া করে একটি বৈধ NID নম্বর দিন (১০ বা ১৭ অঙ্ক)",
    birthCertificate: "জন্ম নিবন্ধন সনদ",
    birthOptional: "(ঐচ্ছিক)",
    birthNote: "NID না থাকলে",
    birthUpload: "জন্ম নিবন্ধন আপলোড করুন",
    birthHint: "ঐচ্ছিক — NID থাকলে লাগবে না",
    birthRequired: "NID না থাকলে জন্ম নিবন্ধন প্রয়োজন",
    selfieLabel: "লাইভ সেলফি",
    selfieMain: "ক্যামেরা চালু করুন",
    selfieHint: "হাতে NID ধরে তুলুন · ভালো আলোতে তুলুন",
    selfieDone: "✅ সেলফি তোলা হয়েছে!",
    selfieRequired: "দয়া করে একটি লাইভ সেলফি তুলুন",
    selfieRetake: "পুনরায় তুলুন",
    selfieCancel: "বাতিল",
    selfieCapture: "📸 ছবি তুলুন",
    selfieUpload: "📤 সেলফি আপলোড করুন",
    selfieUploadHint: "NID হাতে ধরে নিজের একটি স্পষ্ট ছবি আপলোড করুন",
    noCamera: "ক্যামেরা নেই?",
    uploadSelfie: "সেলফি ছবি আপলোড করুন",
    passportLabel: "পাসপোর্ট",
    passportOpt: "(ঐচ্ছিক — বাড়তি যাচাইয়ের জন্য)",
    passportUpload: "পাসপোর্ট আপলোড করুন",
    passportHint: "ঐচ্ছিক — উন্নত যাচাইয়ের জন্য",
    kycConsent: "আমি নিশ্চিত করছি যে দেওয়া ডকুমেন্ট আমার নিজের এবং তথ্য সঠিক।",
    kycConsentRequired: "দয়া করে কেওয়াইসি সম্মতিতে সম্মত হন",
    secureDocs: "🔐 আপনার ডকুমেন্ট সম্পূর্ণ নিরাপদ। সব KYC ফাইল এনক্রিপ্টেড ও নিরাপদে সংরক্ষিত। তৃতীয় পক্ষের সাথে কখনো শেয়ার করা হবে না।",
    nextButton: "পরবর্তী — পেমেন্ট তথ্য →",
    skipButton: "KYC স্কিপ করুন →",
    previous: "← আগের ধাপ",
    uploadError: "আপলোড ব্যর্থ হয়েছে",
    uploadSuccess: "আপলোড সফল হয়েছে",
    fileTooLarge: "ফাইল খুব বড়",
    selectValidImage: "দয়া করে একটি বৈধ ইমেজ ফাইল নির্বাচন করুন (JPEG, PNG, WEBP)",
    imageSizeLimit: "ইমেজের আকার ৫MB এর কম হওয়া উচিত",
    cameraError: "ক্যামেরা অ্যাক্সেস অস্বীকৃত",
    takePhoto: "ছবি তুলুন",
    uploading: "আপলোড হচ্ছে...",
    noCameraDetected: "ক্যামেরা পাওয়া যায়নি। দয়া করে পরিবর্তে একটি সেলফি ছবি আপলোড করুন।",
  }
};

const Step7Kyc = ({ formData, updateField, errors, handleNext, handleBack, lang = "bn", showAlert }) => {
  const t = (key, params = {}) => {
    let text = translations[lang]?.[key] || translations.en[key] || key;
    Object.keys(params).forEach(param => text = text.replace(`{${param}}`, params[param]));
    return text;
  };

  const [nidFrontUpload, setNidFrontUpload] = useState(null);
  const [nidBackUpload, setNidBackUpload] = useState(null);
  const [birthCertificateUpload, setBirthCertificateUpload] = useState(null);
  const [passportUpload, setPassportUpload] = useState(null);
  const [selfieImage, setSelfieImage] = useState(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [hasCamera, setHasCamera] = useState(null);
  const [cameraError, setCameraError] = useState(false);
  const [showUploadOption, setShowUploadOption] = useState(false);
  const [uploadErrors, setUploadErrors] = useState({});

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const nidFrontInputRef = useRef(null);
  const nidBackInputRef = useRef(null);
  const birthInputRef = useRef(null);
  const passportInputRef = useRef(null);
  const selfieInputRef = useRef(null);

  useEffect(() => {
    const checkCamera = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        setHasCamera(videoDevices.length > 0);
        if (videoDevices.length === 0) setShowUploadOption(true);
      } catch (error) {
        console.error("Camera check error:", error);
        setHasCamera(false);
        setShowUploadOption(true);
      }
    };
    checkCamera();
  }, []);

  const uploadFileToServer = async (file, folder) => {
    // Validate file size (max 5MB for KYC documents)
    const MAX_KYC_FILE_SIZE = 5 * 1024 * 1024; // 5MB
    if (file.size > MAX_KYC_FILE_SIZE) {
      console.error(`[Client Upload] File too large: ${file.size} bytes (max ${MAX_KYC_FILE_SIZE})`);
      const errorMessage = t('fileTooLarge') || 'File is too large. Maximum size is 5MB.';
      setUploadErrors(prev => ({ ...prev, [folder]: errorMessage }));
      if (showAlert) showAlert(t('uploadError'), errorMessage, "error");
      return null;
    }
    
    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      console.error(`[Client Upload] Invalid file type: ${file.type}`);
      const errorMessage = t('invalidFile') || 'Invalid file type. Please upload JPEG, PNG, or WEBP.';
      setUploadErrors(prev => ({ ...prev, [folder]: errorMessage }));
      if (showAlert) showAlert(t('uploadError'), errorMessage, "error");
      return null;
    }
    
    const formDataUpload = new FormData();
    formDataUpload.append('files', file);

    console.log(`[Client Upload] Starting upload to folder: ${folder}, file: ${file.name}, size: ${file.size}`);

    try {
      setUploading(true);
      setUploadErrors(prev => ({ ...prev, [folder]: null }));
      
      const response = await axiosInstance.post(`/upload/kyc/${folder}`, formDataUpload, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setUploadProgress(prev => ({ ...prev, [folder]: percentCompleted }));
        },
      });

      console.log(`[Client Upload] Response for ${folder}:`, response.data);

      if (response.data.success && response.data.data && response.data.data.length > 0) {
        const result = response.data.data[0];
        console.log(`[Client Upload] SUCCESS for ${folder}:`, { url: result.url ? "PRESENT" : "MISSING", publicId: result.publicId ? "PRESENT" : "MISSING" });
        return result;
      }
      
      console.error(`[Client Upload] FAILED for ${folder}: Invalid response`, response.data);
      return null;
    } catch (error) {
      console.error(`[Client Upload] ERROR for ${folder}:`, error);
      const errorMessage = error.response?.data?.message || error.message || t('uploadError');
      setUploadErrors(prev => ({ ...prev, [folder]: errorMessage }));
      if (showAlert) showAlert(t('uploadError'), errorMessage, "error");
      return null;
    } finally {
      setUploading(false);
      setUploadProgress(prev => ({ ...prev, [folder]: 0 }));
    }
  };

  const handleNidFrontUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => { setNidFrontUpload(event.target.result); };
    reader.readAsDataURL(file);

    const result = await uploadFileToServer(file, 'kyc_nid_front');
    if (result) {
      updateField("nidFrontImage", result.url);
      updateField("nidFrontPublicId", result.publicId);
      updateField("nidFrontUploaded", true);
      console.log("NID Front URL:", result.url);
    }
  };

  const handleNidBackUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => { setNidBackUpload(event.target.result); };
    reader.readAsDataURL(file);

    const result = await uploadFileToServer(file, 'kyc_nid_back');
    if (result) {
      updateField("nidBackImage", result.url);
      updateField("nidBackPublicId", result.publicId);
      updateField("nidBackUploaded", true);
      console.log("NID Back URL:", result.url);
    }
  };

  const handleBirthUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => { setBirthCertificateUpload(event.target.result); };
    reader.readAsDataURL(file);

    const result = await uploadFileToServer(file, 'kyc_birth_certificate');
    if (result) {
      updateField("birthCertificateImage", result.url);
      updateField("birthCertificatePublicId", result.publicId);
      updateField("birthCertificateUploaded", true);
      console.log("Birth Certificate URL:", result.url);
    }
  };

  const handlePassportUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => { setPassportUpload(event.target.result); };
    reader.readAsDataURL(file);

    const result = await uploadFileToServer(file, 'kyc_passport');
    if (result) {
      updateField("passportImage", result.url);
      updateField("passportPublicId", result.publicId);
      updateField("passportUploaded", true);
      console.log("Passport URL:", result.url);
    }
  };

  const handleSelfieUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => { setSelfieImage(event.target.result); };
    reader.readAsDataURL(file);

    const result = await uploadFileToServer(file, 'kyc_selfie');
    if (result) {
      updateField("selfieImage", result.url);
      updateField("selfiePublicId", result.publicId);
      updateField("selfieTaken", true);
      console.log("Selfie URL:", result.url);
      if (showAlert) showAlert(t('uploadSuccess'), t('uploadSuccess'), 'success');
    }
  };

  const startCamera = async () => {
    if (hasCamera === false) {
      setShowUploadOption(true);
      if (showAlert) showAlert(t('noCameraDetected'), t('noCameraDetected'), 'error');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user", width: 320, height: 400 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setCameraActive(true);
        setCameraError(false);
      }
    } catch (error) {
      console.error("Camera error:", error);
      setCameraError(true);
      setShowUploadOption(true);
      if (showAlert) showAlert(t('cameraError'), t('noCameraDetected'), 'error');
    }
  };

  const capturePhoto = async () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const imageData = canvas.toDataURL('image/jpeg');
      
      const blob = await fetch(imageData).then(res => res.blob());
      const file = new File([blob], 'selfie.jpg', { type: 'image/jpeg' });
      
      const result = await uploadFileToServer(file, 'kyc_selfie');
      if (result) {
        setSelfieImage(imageData);
        updateField("selfieImage", result.url);
        updateField("selfiePublicId", result.publicId);
        updateField("selfieTaken", true);
        console.log("Selfie URL:", result.url);
      }
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
  };

  const retakePhoto = () => {
    setSelfieImage(null);
    updateField("selfieImage", "");
    updateField("selfiePublicId", "");
    updateField("selfieTaken", false);
    startCamera();
  };

  const toggleUploadOption = () => {
    setShowUploadOption(!showUploadOption);
    if (cameraActive) stopCamera();
  };

  const handleSkip = () => {
    updateField("kycSkipped", true);
    handleNext();
  };

  const validateStep = () => {
    if (formData.kycSkipped) return true;

    const newErrors = {};
    const hasNidFront = formData.nidFrontImage && formData.nidFrontImage.trim() !== '';
    const hasNidBack = formData.nidBackImage && formData.nidBackImage.trim() !== '';
    const hasNid = hasNidFront || hasNidBack;
    const hasBirthCert = formData.birthCertificateImage && formData.birthCertificateImage.trim() !== '';
    
    if (!hasNid && !hasBirthCert) newErrors.nidUpload = t('nidRequired');
    
    if (hasNid) {
      if (!formData.nidNumber || formData.nidNumber.trim() === "") {
        newErrors.nidNumber = t('nidNumberRequired');
      } else {
        const cleaned = formData.nidNumber.replace(/\D/g, '');
        if (cleaned.length !== 10 && cleaned.length !== 17) newErrors.nidNumber = t('nidInvalid');
      }
    }
    
    if (!formData.selfieImage || formData.selfieImage.trim() === '') newErrors.selfie = t('selfieRequired');
    if (!formData.kycConsent) newErrors.kycConsent = t('kycConsentRequired');
    
    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.values(newErrors)[0];
      if (showAlert) showAlert("Validation Error", firstError, "error");
      return false;
    }
    return true;
  };

  const handleNextClick = () => {
    if (uploading) {
      if (showAlert) showAlert("Please Wait", t('uploading'), "warning");
      return;
    }
    if (validateStep()) handleNext();
  };

  const handleBackClick = () => {
    if (cameraActive) stopCamera();
    handleBack();
  };

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-card border border-border rounded-2xl p-6">
      <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">{t('stepLabel')}</div>
      <h2 className="text-2xl font-bold text-foreground mb-2">{t('verifyIdentity')}</h2>
      <p className="text-foreground/60 mb-2">{t('kycDesc')}</p>
      <p className="text-sm text-amber-500 mb-4 flex items-center gap-2"><AlertCircle size={16} /> {t('kycOptional')}</p>

      {/* NID Upload */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-2">{t('nidLabel')} <span className="text-red-500">*</span></label>
        <div className="grid grid-cols-2 gap-3">
          <div className={`upload-zone border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition hover:border-primary relative ${nidFrontUpload ? "border-primary bg-primary/5" : "border-border"}`} onClick={() => nidFrontInputRef.current?.click()}>
            <input ref={nidFrontInputRef} type="file" accept="image/*" onChange={handleNidFrontUpload} className="hidden" disabled={uploading} />
            {uploadProgress['kyc_nid_front'] > 0 && uploadProgress['kyc_nid_front'] < 100 && (
              <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-10">
                <div className="text-white text-center"><Loader2 size={24} className="animate-spin mx-auto mb-1" /><div className="text-xs">{uploadProgress['kyc_nid_front']}%</div></div>
              </div>
            )}
            {nidFrontUpload ? (
              <div className="relative"><img src={nidFrontUpload} alt="NID Front" className="w-full h-24 object-cover rounded-lg" /><div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">✅ {t('nidUploaded')}</div></div>
            ) : (
              <><div className="text-3xl mb-2">🪪</div><div className="text-sm font-semibold">{t('nidFront')}</div><div className="text-xs text-foreground/50">{t('nidClear')}</div></>
            )}
          </div>

          <div className={`upload-zone border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition hover:border-primary relative ${nidBackUpload ? "border-primary bg-primary/5" : "border-border"}`} onClick={() => nidBackInputRef.current?.click()}>
            <input ref={nidBackInputRef} type="file" accept="image/*" onChange={handleNidBackUpload} className="hidden" disabled={uploading} />
            {uploadProgress['kyc_nid_back'] > 0 && uploadProgress['kyc_nid_back'] < 100 && (
              <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-10">
                <div className="text-white text-center"><Loader2 size={24} className="animate-spin mx-auto mb-1" /><div className="text-xs">{uploadProgress['kyc_nid_back']}%</div></div>
              </div>
            )}
            {nidBackUpload ? (
              <div className="relative"><img src={nidBackUpload} alt="NID Back" className="w-full h-24 object-cover rounded-lg" /><div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">✅ {t('nidUploaded')}</div></div>
            ) : (
              <><div className="text-3xl mb-2">🪪</div><div className="text-sm font-semibold">{t('nidBack')}</div><div className="text-xs text-foreground/50">{t('nidClear')}</div></>
            )}
          </div>
        </div>
        {errors.nidUpload && <p className="text-xs text-red-500 mt-1">{errors.nidUpload}</p>}
      </div>

      {/* NID Number */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-1">{t('nidNumber')} <span className="text-red-500">*</span></label>
        <input type="text" value={formData.nidNumber || ""} onChange={(e) => { const value = e.target.value.replace(/\D/g, ''); updateField("nidNumber", value); }} className={`w-full p-3 rounded-xl border ${errors.nidNumber ? "border-red-500" : "border-border"} bg-background text-foreground outline-none focus:border-primary`} placeholder={t('nidPlaceholder')} maxLength="17" />
        <div className="text-xs text-foreground/50 mt-1">{t('nidHint')}</div>
        {errors.nidNumber && <p className="text-xs text-red-500 mt-1">{errors.nidNumber}</p>}
      </div>

      {/* Birth Certificate */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-2">{t('birthCertificate')} <span className="text-foreground/50">({t('birthOptional')})</span> <span className="text-xs text-foreground/40 ml-2">{t('birthNote')}</span></label>
        <div className={`upload-zone border-2 border-dashed rounded-xl p-4 cursor-pointer transition hover:border-primary relative ${birthCertificateUpload ? "border-primary bg-primary/5" : "border-border"}`} onClick={() => birthInputRef.current?.click()}>
          <input ref={birthInputRef} type="file" accept="image/*" onChange={handleBirthUpload} className="hidden" disabled={uploading} />
          {uploadProgress['kyc_birth_certificate'] > 0 && uploadProgress['kyc_birth_certificate'] < 100 && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-10">
              <div className="text-white text-center"><Loader2 size={24} className="animate-spin mx-auto mb-1" /><div className="text-xs">{uploadProgress['kyc_birth_certificate']}%</div></div>
            </div>
          )}
          {birthCertificateUpload ? (
            <div className="flex items-center gap-3"><img src={birthCertificateUpload} alt="Birth Certificate" className="w-16 h-16 object-cover rounded-lg" /><div className="flex-1"><div className="text-sm font-semibold text-foreground">✅ Uploaded</div><div className="text-xs text-foreground/50">{t('birthUpload')}</div></div></div>
          ) : (
            <div className="flex items-center gap-3"><div className="text-3xl">📜</div><div className="text-left"><div className="text-sm font-semibold">{t('birthUpload')}</div><div className="text-xs text-foreground/50">{t('birthHint')}</div></div></div>
          )}
        </div>
      </div>

      {/* Selfie Section */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-semibold text-foreground/70">{t('selfieLabel')} <span className="text-red-500">*</span></label>
          {hasCamera === false || cameraError ? <button onClick={toggleUploadOption} className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"><Smartphone size={14} /> {t('uploadSelfie')}</button> : null}
        </div>
        
        <div className="selfie-zone border-2 border-dashed rounded-xl overflow-hidden bg-background relative" style={{ minHeight: '200px' }}>
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          
          {uploadProgress['kyc_selfie'] > 0 && uploadProgress['kyc_selfie'] < 100 && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-10">
              <div className="text-white text-center"><Loader2 size={32} className="animate-spin mx-auto mb-2" /><div className="text-sm">{t('uploading')} {uploadProgress['kyc_selfie']}%</div></div>
            </div>
          )}
          
          {cameraActive && (
            <div className="relative">
              <video ref={videoRef} autoPlay playsInline muted className="w-full h-48 object-cover bg-black" />
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none"><div className="w-48 h-48 rounded-full border-2 border-white/50"></div></div>
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
                <button onClick={capturePhoto} className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition"><Camera size={16} /> {t('takePhoto')}</button>
                <button onClick={stopCamera} className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm font-semibold hover:bg-red-600 transition"><X size={16} /></button>
              </div>
            </div>
          )}

          {selfieImage && !cameraActive && (
            <div className="relative">
              <img src={selfieImage} alt="Selfie" className="w-full h-48 object-cover" />
              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-3">
                <button onClick={retakePhoto} className="px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold flex items-center gap-2 hover:bg-primary/90 transition"><Camera size={16} /> {t('selfieRetake')}</button>
              </div>
              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 rounded-full">✅ {t('selfieDone')}</div>
            </div>
          )}

          {showUploadOption && !selfieImage && !cameraActive && (
            <div className="flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-primary/5 transition p-4" onClick={() => selfieInputRef.current?.click()}>
              <input ref={selfieInputRef} type="file" accept="image/*" onChange={handleSelfieUpload} className="hidden" disabled={uploading} />
              <div className="text-4xl mb-3">📤</div>
              <div className="text-base font-semibold text-center">{t('selfieUpload')}</div>
              <div className="text-sm text-foreground/50 text-center mt-1">{t('selfieUploadHint')}</div>
              <div className="mt-3 px-4 py-2 bg-primary text-white rounded-lg text-sm font-semibold">{t('uploadSelfie')}</div>
            </div>
          )}

          {!cameraActive && !selfieImage && !showUploadOption && (
            <div className="flex flex-col items-center justify-center h-48 cursor-pointer hover:bg-primary/5 transition" onClick={startCamera}>
              <div className="text-5xl mb-3">🤳</div>
              <div className="text-base font-semibold">{t('selfieMain')}</div>
              <div className="text-sm text-foreground/50">{t('selfieHint')}</div>
              {hasCamera === false && <div className="mt-2 text-xs text-amber-500">{t('noCamera')}</div>}
            </div>
          )}
        </div>
        <div className="text-xs text-foreground/50 mt-1">{t('selfieHint')}</div>
        {errors.selfie && <p className="text-xs text-red-500 mt-1">{errors.selfie}</p>}
      </div>

      {/* Passport */}
      <div className="mb-4">
        <label className="block text-sm font-semibold text-foreground/70 mb-2">{t('passportLabel')} <span className="text-foreground/50">{t('passportOpt')}</span></label>
        <div className={`upload-zone border-2 border-dashed rounded-xl p-4 cursor-pointer transition hover:border-primary relative ${passportUpload ? "border-primary bg-primary/5" : "border-border"}`} onClick={() => passportInputRef.current?.click()}>
          <input ref={passportInputRef} type="file" accept="image/*" onChange={handlePassportUpload} className="hidden" disabled={uploading} />
          {uploadProgress['kyc_passport'] > 0 && uploadProgress['kyc_passport'] < 100 && (
            <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center z-10">
              <div className="text-white text-center"><Loader2 size={24} className="animate-spin mx-auto mb-1" /><div className="text-xs">{uploadProgress['kyc_passport']}%</div></div>
            </div>
          )}
          {passportUpload ? (
            <div className="flex items-center gap-3"><img src={passportUpload} alt="Passport" className="w-16 h-16 object-cover rounded-lg" /><div className="flex-1"><div className="text-sm font-semibold text-foreground">✅ Uploaded</div><div className="text-xs text-foreground/50">{t('passportUpload')}</div></div></div>
          ) : (
            <div className="flex items-center gap-3"><div className="text-3xl">🛂</div><div className="text-left"><div className="text-sm font-semibold">{t('passportUpload')}</div><div className="text-xs text-foreground/50">{t('passportHint')}</div></div></div>
          )}
        </div>
      </div>

      {/* Info Box */}
      <div className="info-box p-3 bg-primary/5 border border-primary/20 rounded-xl text-xs text-foreground/60 flex gap-2 mb-4">
        <Shield size={16} className="text-primary shrink-0 mt-0.5" />
        <span>{t('secureDocs')}</span>
      </div>

      {/* KYC Consent */}
      <div className="mb-6">
        <div className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition ${formData.kycConsent ? "bg-primary/5 border border-primary/20" : "bg-background border border-border"}`} onClick={() => updateField("kycConsent", !formData.kycConsent)}>
          <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 ${formData.kycConsent ? "bg-primary border-primary" : "border-border"}`}>
            {formData.kycConsent && <Check size={12} className="text-white" />}
          </div>
          <div><p className="text-sm text-foreground/70">{t('kycConsent')}</p></div>
        </div>
        {errors.kycConsent && <p className="text-xs text-red-500 mt-1">{errors.kycConsent}</p>}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button onClick={handleSkip} className="flex-1 py-3 border-2 border-amber-500/30 text-amber-500 rounded-xl font-semibold hover:bg-amber-500/10 transition flex items-center justify-center gap-2"><SkipForward size={18} /> {t('skipButton')}</button>
        <button onClick={handleNextClick} disabled={uploading} className="flex-1 py-3 bg-gradient-to-r from-primary to-primary-light text-white rounded-xl font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2">
          {uploading ? <Loader2 size={18} className="animate-spin" /> : null} {t('nextButton')}
        </button>
      </div>
      <button onClick={handleBackClick} disabled={uploading} className="w-full mt-3 py-3 border border-border rounded-xl font-semibold text-foreground/70 hover:border-primary transition disabled:opacity-50">{t('previous')}</button>
    </motion.div>
  );
};

export default Step7Kyc;