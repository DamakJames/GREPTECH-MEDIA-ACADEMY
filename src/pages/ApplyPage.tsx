import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Upload,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  User,
  Shield,
  X,
  Loader2,
  Database,
  BookOpen,
} from 'lucide-react';
import { coursesData } from '../data/courses';
import { AdmissionsService } from '../services/admissions.service';
import { isFirebaseConfigured } from '../lib/firebase';

export const ApplyPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course') || '';

  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    dateOfBirth: '',
    residentialAddress: '',
    selectedCourse: preselectedCourse,
    previousExperience: 'beginner',
    educationalBackground: 'High School',
    emergencyName: '',
    emergencyPhone: '',
    emergencyRelationship: 'Parent',
    privacyConsent: false,
  });

  const [passportPreview, setPassportPreview] = useState<string | null>(null);
  const [passportFile, setPassportFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [referenceId, setReferenceId] = useState<string>('');

  useEffect(() => {
    if (preselectedCourse) {
      setFormData((prev) => ({ ...prev, selectedCourse: preselectedCourse }));
    }
  }, [preselectedCourse]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    // Clear error
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          passport: 'Photograph must be under 2MB in size.',
        }));
        return;
      }
      setPassportFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPassportPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy.passport;
        return copy;
      });
    }
  };

  const removePhoto = () => {
    setPassportFile(null);
    setPassportPreview(null);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      newErrors.fullName = 'Full Name is required (minimum 3 characters)';
    }

    if (!formData.phone.trim() || formData.phone.trim().length < 7) {
      newErrors.phone = 'Valid phone number is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Valid email address is required';
    }

    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.residentialAddress.trim() || formData.residentialAddress.trim().length < 5) {
      newErrors.residentialAddress = 'Residential address is required';
    }

    if (!formData.selectedCourse) {
      newErrors.selectedCourse = 'Please select a course';
    }

    if (!formData.emergencyName.trim()) {
      newErrors.emergencyName = 'Emergency contact name is required';
    }

    if (!formData.emergencyPhone.trim()) {
      newErrors.emergencyPhone = 'Emergency contact phone is required';
    }

    if (!passportPreview) {
      newErrors.passport = 'Passport photograph is required';
    }

    if (!formData.privacyConsent) {
      newErrors.privacyConsent = 'You must accept the privacy policy to submit';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 300, behavior: 'smooth' });
      return;
    }

    setSubmitting(true);
    try {
      const result = await AdmissionsService.submitApplication({
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        residentialAddress: formData.residentialAddress,
        selectedCourse: formData.selectedCourse,
        previousExperience: formData.previousExperience as any,
        educationalBackground: formData.educationalBackground,
        passportPhoto: passportFile,
        emergencyContact: {
          name: formData.emergencyName,
          phone: formData.emergencyPhone,
          relationship: formData.emergencyRelationship,
        },
        privacyConsent: formData.privacyConsent,
      });

      setReferenceId(result.referenceId);
      setIsSubmitted(true);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } catch (err) {
      console.error('Submission error:', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-brand-light min-h-screen py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-orange">
            <span className="w-5 h-[2px] bg-brand-orange"></span>
            ADMISSIONS 2026
            <span className="w-5 h-[2px] bg-brand-orange"></span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-black tracking-tight">
            Online Admission Application
          </h1>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Take the first step toward becoming an industry-ready media professional. Complete the form below to apply.
          </p>
        </div>

        {/* Backend Status Banner */}
        <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-3">
          <Database className="w-5 h-5 text-brand-orange shrink-0 mt-0.5" />
          <div className="text-xs text-orange-950 leading-relaxed">
            <span className="font-bold">
              {isFirebaseConfigured
                ? 'Cloud Firestore & Storage Connected:'
                : 'Stage 2 Architecture Ready:'}
            </span>{' '}
            {isFirebaseConfigured
              ? 'Applications write atomically to Firestore with passport photo uploads in Firebase Storage.'
              : 'Firebase SDK and data services are initialized. Add your project keys to .env.local to route directly to your live Firebase project.'}
          </div>
        </div>

        {isSubmitted ? (
          /* Submission Confirmation Card */
          <div className="bg-white rounded-2xl p-8 sm:p-12 border border-gray-200 shadow-sm text-center space-y-6 animate-in fade-in duration-300">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-brand-black">
                Application Successfully Submitted
              </h2>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you for applying to Greptech Media Academy. Your application has been logged for faculty review.
              </p>
            </div>

            <div className="bg-brand-light rounded-xl p-6 max-w-md mx-auto border border-gray-200 space-y-2">
              <span className="text-xs uppercase font-bold text-gray-400 block">
                Application Reference ID
              </span>
              <span className="text-2xl font-black text-brand-orange tracking-wider block">
                {referenceId}
              </span>
              <p className="text-xs text-gray-500">
                Please save this reference number to track your admission status.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap justify-center gap-4">
              <Link
                to="/courses"
                className="px-6 py-3 rounded-xl text-xs font-bold text-white bg-brand-black hover:bg-gray-800 transition-colors"
              >
                Explore More Courses
              </Link>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({
                    fullName: '',
                    phone: '',
                    email: '',
                    dateOfBirth: '',
                    residentialAddress: '',
                    selectedCourse: '',
                    previousExperience: 'beginner',
                    educationalBackground: 'High School',
                    emergencyName: '',
                    emergencyPhone: '',
                    emergencyRelationship: 'Parent',
                    privacyConsent: false,
                  });
                  setPassportPreview(null);
                }}
                className="px-6 py-3 rounded-xl text-xs font-bold text-brand-orange bg-orange-50 hover:bg-orange-100 transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          </div>
        ) : (
          /* Application Form */
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm space-y-8"
          >
            {/* Step 1: Personal Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <User className="w-5 h-5 text-brand-orange" />
                <span>1. Personal Information</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="e.g. Samuel Olawale"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 focus:border-brand-orange focus:ring-orange-100'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. samuel@example.com"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.email
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 focus:border-brand-orange focus:ring-orange-100'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Phone Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +234 800 000 0000"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 focus:border-brand-orange focus:ring-orange-100'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.dateOfBirth
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 focus:border-brand-orange focus:ring-orange-100'
                    }`}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-xs text-red-500 mt-1">{errors.dateOfBirth}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Residential Address *
                  </label>
                  <textarea
                    rows={2}
                    name="residentialAddress"
                    value={formData.residentialAddress}
                    onChange={handleInputChange}
                    placeholder="Street address, city, state"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.residentialAddress
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 focus:border-brand-orange focus:ring-orange-100'
                    }`}
                  />
                  {errors.residentialAddress && (
                    <p className="text-xs text-red-500 mt-1">
                      {errors.residentialAddress}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 2: Course Selection & Background */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <BookOpen className="w-5 h-5 text-brand-orange" />
                <span>2. Course & Creative Background</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Selected Course *
                  </label>
                  <select
                    name="selectedCourse"
                    value={formData.selectedCourse}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.selectedCourse
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 focus:border-brand-orange focus:ring-orange-100'
                    }`}
                  >
                    <option value="">-- Choose a Course --</option>
                    {coursesData.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                  {errors.selectedCourse && (
                    <p className="text-xs text-red-500 mt-1">{errors.selectedCourse}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Educational Background *
                  </label>
                  <select
                    name="educationalBackground"
                    value={formData.educationalBackground}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-brand-orange focus:ring-orange-100"
                  >
                    <option value="High School">High School (SSCE / O-Levels)</option>
                    <option value="National Diploma">National Diploma (OND)</option>
                    <option value="Higher National Diploma">Higher National Diploma (HND)</option>
                    <option value="Bachelors Degree">Bachelor's Degree (B.Sc / B.A)</option>
                    <option value="Postgraduate">Postgraduate</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">
                    Prior Experience Level in this Discipline *
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {['beginner', 'intermediate', 'advanced'].map((lvl) => (
                      <label
                        key={lvl}
                        className={`flex items-center justify-center p-3 rounded-xl border cursor-pointer text-xs font-bold uppercase transition-colors ${
                          formData.previousExperience === lvl
                            ? 'bg-orange-50 border-brand-orange text-brand-orange'
                            : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="previousExperience"
                          value={lvl}
                          checked={formData.previousExperience === lvl}
                          onChange={handleInputChange}
                          className="sr-only"
                        />
                        <span>{lvl}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3: Passport Photograph Upload */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Upload className="w-5 h-5 text-brand-orange" />
                <span>3. Passport Photograph</span>
              </h3>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {passportPreview ? (
                  <div className="relative w-32 h-32 rounded-xl overflow-hidden border-2 border-brand-orange shadow-md">
                    <img
                      src={passportPreview}
                      alt="Passport Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={removePhoto}
                      className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <div className="w-32 h-32 rounded-xl bg-gray-100 border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 p-2 text-center">
                    <User className="w-8 h-8 mb-1" />
                    <span className="text-[10px] font-medium">Passport Preview</span>
                  </div>
                )}

                <div className="space-y-2 flex-1">
                  <label className="inline-block px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-bold text-gray-700 hover:border-brand-orange hover:text-brand-orange cursor-pointer transition-colors bg-white shadow-sm">
                    <span>Upload Recent Passport (Max 2MB)</span>
                    <input
                      type="file"
                      accept="image/png, image/jpeg"
                      onChange={handleFileChange}
                      className="sr-only"
                    />
                  </label>
                  <p className="text-[11px] text-gray-500">
                    A clear, front-facing passport photograph with a light background. Supported formats: JPEG, PNG.
                  </p>
                  {errors.passport && (
                    <p className="text-xs text-red-500 font-medium">{errors.passport}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Step 4: Emergency Contact */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-brand-black flex items-center gap-2 border-b border-gray-100 pb-3">
                <Shield className="w-5 h-5 text-brand-orange" />
                <span>4. Emergency Contact</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Contact Name *
                  </label>
                  <input
                    type="text"
                    name="emergencyName"
                    value={formData.emergencyName}
                    onChange={handleInputChange}
                    placeholder="Full name"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.emergencyName
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 focus:border-brand-orange focus:ring-orange-100'
                    }`}
                  />
                  {errors.emergencyName && (
                    <p className="text-xs text-red-500 mt-1">{errors.emergencyName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Contact Phone *
                  </label>
                  <input
                    type="tel"
                    name="emergencyPhone"
                    value={formData.emergencyPhone}
                    onChange={handleInputChange}
                    placeholder="Phone number"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-900 focus:outline-none focus:ring-2 ${
                      errors.emergencyPhone
                        ? 'border-red-400 focus:ring-red-200'
                        : 'border-gray-300 focus:border-brand-orange focus:ring-orange-100'
                    }`}
                  />
                  {errors.emergencyPhone && (
                    <p className="text-xs text-red-500 mt-1">{errors.emergencyPhone}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Relationship *
                  </label>
                  <select
                    name="emergencyRelationship"
                    value={formData.emergencyRelationship}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:border-brand-orange focus:ring-orange-100"
                  >
                    <option value="Parent">Parent</option>
                    <option value="Guardian">Guardian</option>
                    <option value="Spouse">Spouse</option>
                    <option value="Sibling">Sibling</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Privacy Consent */}
            <div className="pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="privacyConsent"
                  checked={formData.privacyConsent}
                  onChange={handleInputChange}
                  className="mt-1 w-4 h-4 text-brand-orange rounded border-gray-300 focus:ring-brand-orange"
                />
                <span className="text-xs text-gray-600 leading-relaxed">
                  I confirm that all information provided in this admission form is accurate and complete. I consent to Greptech Media Academy processing my data for admissions and academy communications.
                </span>
              </label>
              {errors.privacyConsent && (
                <p className="text-xs text-red-500 mt-1">{errors.privacyConsent}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-xs text-gray-500">
                Need help? WhatsApp us at <span className="font-semibold text-brand-black">+234 807 756 6926</span>
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-bold text-white bg-brand-orange hover:bg-brand-orange-hover transition-colors shadow-brand-glow transform hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Application</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
