"use client";

import { useState, useEffect } from 'react';
import { X, Send, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function QueryFormModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    whatsapp: '',
    email: '',
    problem: '',
    reports: null as File | null,
  });

  // Show modal after 2 seconds on every page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasBeenClosed) {
        setIsOpen(true);
      }
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [hasBeenClosed]);

  const handleClose = () => {
    setIsOpen(false);
    setHasBeenClosed(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted:', formData);
      alert('Thank you! We will contact you soon.');
      setFormData({
        name: '',
        country: '',
        whatsapp: '',
        email: '',
        problem: '',
        reports: null,
      });
      setIsSubmitting(false);
      handleClose();
    }, 1000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, reports: e.target.files[0] });
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-hidden relative pointer-events-auto">
          {/* Close Button - Fixed Position */}
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-3 right-3 z-10 text-white bg-red-500 hover:bg-red-600 rounded-full p-2 transition-colors shadow-lg"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="bg-gradient-to-br from-[#209f00] to-[#1a8000] text-white p-6 pr-14">
            <h2 className="text-2xl font-bold mb-2">Get Free Consultation</h2>
            <p className="text-white/90 text-sm">
              Fill out the form and our team will contact you within 24 hours
            </p>
          </div>

          {/* Form */}
          <form 
            onSubmit={handleSubmit} 
            className="p-6 space-y-4 max-h-[calc(90vh-140px)] overflow-y-auto scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Country */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                required
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent"
              >
                <option value="">Select your country</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Saudi Arabia">Saudi Arabia</option>
                <option value="UAE">UAE</option>
                <option value="Nigeria">Nigeria</option>
                <option value="Kenya">Kenya</option>
                <option value="Bangladesh">Bangladesh</option>
                <option value="India">India</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                WhatsApp Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent"
                placeholder="+1 234 567 8900"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent"
                placeholder="your.email@example.com"
              />
            </div>

            {/* Problem Description */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Describe Your Current Problem <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                value={formData.problem}
                onChange={(e) => setFormData({ ...formData, problem: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent resize-none"
                placeholder="Please describe your medical condition or query in detail..."
              />
            </div>

            {/* Reports Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Medical Reports <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <div className="relative">
                <input
                  type="file"
                  id="reports"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  className="hidden"
                />
                <label
                  htmlFor="reports"
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#209f00] hover:bg-[#209f00]/5 transition-colors"
                >
                  <Upload className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-600 text-sm">
                    {formData.reports ? formData.reports.name : 'Click to upload files (PDF, JPG, PNG, DOC)'}
                  </span>
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">Max file size: 10MB</p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#209f00] hover:bg-[#1a8000] text-white py-4 rounded-lg font-semibold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 mr-2" />
                  Submit Query
                </>
              )}
            </Button>

            <p className="text-xs text-gray-500 text-center mt-4">
              🔒 Your information is secure and will never be shared
            </p>
          </form>
        </div>
      </div>
    </>
  );
}
