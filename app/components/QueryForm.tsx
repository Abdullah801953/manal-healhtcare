"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import Translate from "./Translate";

export const QueryForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '',
    country: '',
    medicalCondition: '',
    medicalReport: null as File | null,
  });

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let reportUrl = '';
      
      // Upload medical report if provided
      if (formData.medicalReport) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', formData.medicalReport);
        uploadFormData.append('type', 'medical');
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadFormData,
        });
        
        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          reportUrl = uploadData.url;
        } else {
          toast.error('Failed to upload medical report. Please try again.');
          setIsSubmitting(false);
          return;
        }
      }

      // Save inquiry to database
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          country: formData.country,
          medicalCondition: formData.medicalCondition,
          medicalReport: reportUrl,
          status: 'new',
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Reset form
        setFormData({
          name: '',
          email: '',
          phone: '',
          country: '',
          countryCode: '',
          medicalCondition: '',
          medicalReport: null,
        });
        
        // Reset file input
        const fileInput = document.getElementById('query-medical-report') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

        toast.success('Thank you! Your inquiry has been submitted successfully.', {
          description: 'Our team will contact you .',
          duration: 5000,
        });
      } else {
        toast.error('Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, medicalReport: e.target.files[0] });
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="bg-white/95 backdrop-blur-sm rounded-2xl xs:rounded-3xl shadow-xl xs:shadow-2xl border border-white/20 overflow-hidden">
      {/* Form Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 xs:px-6 py-4 xs:py-5">
        <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white text-center">
          <Translate>Get Free Consultation</Translate>
        </h3>
        <p className="text-white/90 text-sm text-center mt-1.5">
          <Translate>Our team will contact you</Translate>
        </p>
      </div>

      {/* Form Body */}
      <div className="p-4 xs:p-6 sm:p-8">
        <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
          {/* Name */}
          <div className="space-y-1 xs:space-y-1.5">
            <label htmlFor="query-name" className="text-xs xs:text-sm font-medium text-gray-700">
              <Translate>Full Name</Translate> <span className="text-red-500">*</span>
            </label>
            <Input
              id="query-name"
              type="text"
              placeholder="Enter your full name"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="h-10 text-sm rounded-full border-gray-300 focus:border-green-600 focus:ring-green-600"
            />
          </div>

          {/* Email */}
          <div className="space-y-1 xs:space-y-1.5">
            <label htmlFor="query-email" className="text-xs xs:text-sm font-medium text-gray-700">
              <Translate>Email Address</Translate> <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <Input
              id="query-email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="h-10 text-sm rounded-full border-gray-300 focus:border-green-600 focus:ring-green-600"
            />
          </div>

          {/* Phone */}
          <div className="space-y-1 xs:space-y-1.5">
            <label htmlFor="query-phone" className="text-xs xs:text-sm font-medium text-gray-700">
              <Translate>WhatsApp Number</Translate> <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              <div className="relative w-28">
                <Input
                  id="query-country-code"
                  type="text"
                  placeholder="+1"
                  value={formData.countryCode}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (value === '' || /^[\d+]*$/.test(value)) {
                      handleInputChange('countryCode', value);
                    }
                  }}
                  className="h-10 text-sm rounded-full border-gray-300 focus:border-green-600 focus:ring-green-600 text-center"
                />
              </div>
              <Input
                id="query-phone"
                type="tel"
                placeholder="Enter WhatsApp number"
                required
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === '' || /^\d*$/.test(value)) {
                    handleInputChange('phone', value);
                  }
                }}
                className="h-10 text-sm rounded-full border-gray-300 focus:border-green-600 focus:ring-green-600 flex-1"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              <Translate>Enter country code (e.g., +1, +44, +91) and phone number</Translate>
            </p>
          </div>

          {/* Country */}
          <div className="space-y-1 xs:space-y-1.5">
            <label htmlFor="query-country" className="text-xs xs:text-sm font-medium text-gray-700">
              <Translate>Country</Translate> <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Input
                id="query-country"
                type="text"
                placeholder="Enter your country"
                required
                value={formData.country}
                onChange={(e) => handleInputChange('country', e.target.value)}
                className="h-10 text-sm rounded-full border-gray-300 focus:border-green-600 focus:ring-green-600 pr-10"
              />
              {formData.country && (
                <button
                  type="button"
                  onClick={() => handleInputChange('country', '')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              )}
            </div>
          </div>

          {/* Medical Condition */}
          <div className="space-y-1 xs:space-y-1.5 sm:col-span-2">
            <label htmlFor="query-condition" className="text-xs xs:text-sm font-medium text-gray-700">
              <Translate>Medical Condition / Treatment Required</Translate> <span className="text-red-500">*</span>
            </label>
            <textarea
              id="query-condition"
              rows={3}
              placeholder="Describe your medical condition or treatment"
              required
              value={formData.medicalCondition}
              onChange={(e) => handleInputChange('medicalCondition', e.target.value)}
              className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:ring-offset-0 outline-none transition-colors resize-none"
            />
          </div>

          {/* Medical Report Upload */}
          <div className="space-y-1 xs:space-y-1.5 sm:col-span-2">
            <label htmlFor="query-medical-report" className="text-xs xs:text-sm font-medium text-gray-700">
              <Translate>Upload Medical Report</Translate> <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <div className="relative">
              <input
                type="file"
                id="query-medical-report"
                onChange={handleFileChange}
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                className="hidden"
              />
              <label
                htmlFor="query-medical-report"
                className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-600 hover:bg-green-50 transition-colors"
              >
                <Upload className="w-4 h-4 text-gray-500" />
                <span className="text-gray-600 text-sm">
                  {formData.medicalReport ? formData.medicalReport.name : 'Click to upload (PDF, JPG, PNG, DOC)'}
                </span>
              </label>
            </div>
            <p className="text-xs text-gray-500">Max file size: 10MB</p>
          </div>

          {/* Submit Button */}
          <div className="sm:col-span-2 pt-1 xs:pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-full px-6 xs:px-8 py-4 xs:py-5 text-sm xs:text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <Translate>Submitting...</Translate>
                </>
              ) : (
                <>
                  <Translate>Submit Query</Translate>
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </div>

          {/* Privacy Note */}
          <div className="sm:col-span-2 text-center pt-1">
            <p className="text-xs text-gray-500">
              <Translate>By submitting this form, you agree to our</Translate>{" "}
              <Link href="/info/privacy-policy" className="text-green-600 hover:underline font-medium">
                <Translate>Privacy Policy</Translate>
              </Link>{" "}
              <Translate>and</Translate>{" "}
              <Link href="/info/terms-conditions" className="text-green-600 hover:underline font-medium">
                <Translate>Terms & Conditions</Translate>
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};