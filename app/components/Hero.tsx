"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Search, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import herobg from "@/public/herobg.png";

import { treatmentsData } from "../treatments/data"
import { doctorsData } from "@/app/doctors/data";
import { hospitalsData } from "@/app/hospitals/data";
import Translate from "./Translate";
import { useSettings } from "../contexts/SettingsContext";

export const Hero = () => {
  const { settings } = useSettings();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchCategory, setSearchCategory] = useState("treatments");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<{ id: string; title: string; subtitle?: string; url: string }>>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  phone: '',
  countryCode: '', // Add this line
  country: '',
  medicalCondition: '',
  medicalReport: null as File | null,
});
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch suggestions from API when search query or category changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchQuery.trim() || searchQuery.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoadingSuggestions(true);
      try {
        const query = searchQuery.toLowerCase();
        let results: Array<{ id: string; title: string; subtitle?: string; url: string }> = [];

        switch (searchCategory) {
          case "treatments":
            const treatmentsRes = await fetch('/api/treatments');
            const treatmentsData = await treatmentsRes.json();
            if (treatmentsData.success && Array.isArray(treatmentsData.data)) {
              results = treatmentsData.data
                .filter((t: any) => t.category?.toLowerCase().includes(query))
                .slice(0, 5)
                .map((t: any) => ({
                  id: t._id || t.id,
                  title: t.category,
                  url: `/treatments/${t.slug || t._id || t.id}`,
                }));
            }
            break;

          case "doctors":
            const doctorsRes = await fetch('/api/doctors');
            const doctorsData = await doctorsRes.json();
            if (doctorsData.success && Array.isArray(doctorsData.data)) {
              results = doctorsData.data
                .filter((d: any) =>
                  d.name?.toLowerCase().includes(query) ||
                  d.specialty?.toLowerCase().includes(query) ||
                  d.specialization?.some((s: string) => s.toLowerCase().includes(query))
                )
                .slice(0, 5)
                .map((d: any) => ({
                  id: d._id || d.id,
                  title: d.name,
                  subtitle: d.specialty || d.specialization?.[0] || d.designation || "",
                  url: `/doctors/${d.slug || d._id || d.id}`,
                }));
            }
            break;

          case "hospitals":
            const hospitalsRes = await fetch('/api/hospitals');
            const hospitalsData = await hospitalsRes.json();
            if (hospitalsData.success && Array.isArray(hospitalsData.data)) {
              results = hospitalsData.data
                .filter((h: any) =>
                  h.name?.toLowerCase().includes(query) ||
                  h.city?.toLowerCase().includes(query) ||
                  h.type?.toLowerCase().includes(query)
                )
                .slice(0, 5)
                .map((h: any) => ({
                  id: h._id || h.id,
                  title: h.name,
                  subtitle: `${h.city || ''} • ${h.type || ''}`,
                  url: `/hospitals/${h.slug || h._id || h.id}`,
                }));
            }
            break;
        }

        setSuggestions(results);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
        setSuggestions([]);
      } finally {
        setIsLoadingSuggestions(false);
      }
    };

    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [searchQuery, searchCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;

    setShowSuggestions(false);
    const encodedQuery = encodeURIComponent(searchQuery.trim());
    
    switch (searchCategory) {
      case "treatments":
        router.push(`/treatments?search=${encodedQuery}`);
        break;
      case "hospitals":
        router.push(`/hospitals?search=${encodedQuery}`);
        break;
      case "doctors":
        router.push(`/doctors?search=${encodedQuery}`);
        break;
      default:
        router.push(`/treatments?search=${encodedQuery}`);
    }
  };

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
          alert('Failed to upload medical report: ' + uploadData.message);
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
        // Prepare WhatsApp message
        const message = `Hello! I'm ${formData.name} from ${formData.country}.

Medical Condition: ${formData.medicalCondition}

${formData.email ? `Email: ${formData.email}` : ''}
${reportUrl ? `Medical Report: ${window.location.origin}${reportUrl}` : 'No medical report attached'}

I would like to discuss my treatment options.`;

        // Redirect to WhatsApp
        const phoneNumber = settings?.whatsappNumber?.replace(/\D/g, '') || '918287508755';
        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');

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
        const fileInput = document.getElementById('hero-medical-report') as HTMLInputElement;
        if (fileInput) fileInput.value = '';

        alert('Thank you! Your inquiry has been submitted successfully.');
      } else {
        alert('Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, medicalReport: e.target.files[0] });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(true);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const formVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
      },
    },
  };

  const searchBarVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.8,
      },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={herobg}
          alt="Healthcare Background"
          fill
          className="object-cover"
          priority
          quality={100}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10 py-6 xs:py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1 text-white"
          >
            <motion.div className="space-y-3 sm:space-y-4 lg:space-y-5">
              {/* Main Hero Heading with enhanced styling */}
              <motion.h1 
                variants={itemVariants}
                className="text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight drop-shadow-sm"
              >
                <Translate>Enhancing Lives, Reviving</Translate>{" "}
                <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  <Translate>Health</Translate>
                </span>{" "}
                <Translate>for a</Translate>{" "}
                <span className="bg-gradient-to-r from-green-400 to-green-300 bg-clip-text text-transparent">
                  <Translate>Better</Translate>
                </span>{" "}
                <Translate>Tomorrow</Translate>
              </motion.h1>

              {/* Subheading */}
              <motion.h2 
                variants={itemVariants}
                className="text-sm xs:text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-200 leading-relaxed px-1 xs:px-2 sm:px-0"
              >
                <Translate>Your trusted partner in Medical Tourism in India, connecting you with top hospitals and experienced doctors.</Translate>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-gray-300 text-xs xs:text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 px-1 xs:px-2 sm:px-0"
              >
                <Translate>Discover world-class healthcare services where your well-being comes first. At Manal Healthcare, we provide personalized, compassionate medical care and seamless medical tourism services in India, ensuring safe, affordable, and high-quality treatment for every patient.</Translate>
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2 px-1 xs:px-2 sm:px-0">
              <Button
                size="lg"
                onClick={() => {
                  const queryForm = document.getElementById('query-form');
                  if (queryForm) {
                    queryForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full px-6 xs:px-8 sm:px-10 py-4 xs:py-5 sm:py-6 text-xs xs:text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 group w-full sm:w-auto"
              >
                <Translate>Get a Query</Translate>
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Query Form */}
     <motion.div
  variants={formVariants}
  initial="hidden"
  animate="visible"
  className="hidden lg:block order-1 lg:order-2 px-2 xs:px-4 sm:px-0"
>
            <div className="bg-white/95 block md:hidden lg:block order-1 lg:order-2 px-2 xs:px-4 sm:px-0 backdrop-blur-sm rounded-2xl xs:rounded-3xl shadow-xl xs:shadow-2xl border border-white/20 overflow-hidden  sm:blocked md:blocked">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-green-600 to-green-700 px-4 xs:px-6 py-4 xs:py-5">
                <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white text-center">
                  <Translate>Get Free Consultation</Translate>
                </h3>
                <p className="text-white/90 text-sm text-center mt-1.5">
                  <Translate>Fill out the form and our team will contact you within 24 hours</Translate>
                </p>
              </div>

              {/* Form Body */}
              <div className="p-4 xs:p-6 sm:p-8">
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-3 xs:gap-4">
                  {/* Name */}
                  <div className="space-y-1 xs:space-y-1.5">
                    <label htmlFor="hero-name" className="text-xs xs:text-sm font-medium text-gray-700">
                      <Translate>Full Name</Translate> <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="hero-name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-10 text-sm rounded-full border-gray-300 focus:border-green-600 focus:ring-green-600"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1 xs:space-y-1.5">
                    <label htmlFor="hero-email" className="text-xs xs:text-sm font-medium text-gray-700">
                      <Translate>Email Address</Translate> <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <Input
                      id="hero-email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-10 text-sm rounded-full border-gray-300 focus:border-green-600 focus:ring-green-600"
                    />
                  </div>

                  {/* Phone */}
                 <div className="space-y-1 xs:space-y-1.5">
  <label htmlFor="hero-phone" className="text-xs xs:text-sm font-medium text-gray-700">
    <Translate>WhatsApp Number</Translate> <span className="text-red-500">*</span>
  </label>
  <div className="flex gap-2">
    <div className="relative w-28">
      <Input
        id="country-code"
        type="text"
        placeholder="+1"
        value={formData.countryCode}
        onChange={(e) => {
          // Allow only + and numbers
          const value = e.target.value;
          if (value === '' || /^[\d+]*$/.test(value)) {
            setFormData({ ...formData, countryCode: value });
          }
        }}
        className="h-10 text-sm rounded-full border-gray-300 focus:border-green-600 focus:ring-green-600 text-center"
      />
    </div>
    <Input
      id="hero-phone"
      type="tel"
      placeholder="Enter WhatsApp number"
      required
      value={formData.phone}
      onChange={(e) => {
        // Allow only numbers
        const value = e.target.value;
        if (value === '' || /^\d*$/.test(value)) {
          setFormData({ ...formData, phone: value });
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
  <label htmlFor="hero-country" className="text-xs xs:text-sm font-medium text-gray-700">
    <Translate>Country</Translate> <span className="text-red-500">*</span>
  </label>
  <div className="relative">
    <Input
      id="hero-country"
      type="text"
      placeholder="Enter your country"
      required
      value={formData.country}
      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
      className="h-10 text-sm rounded-full border-gray-300 focus:border-green-600 focus:ring-green-600 pr-10"
    />
    {formData.country && (
      <button
        type="button"
        onClick={() => setFormData({ ...formData, country: '' })}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        ×
      </button>
    )}
  </div>
  {/* Quick suggestions */}

</div>

                  {/* Medical Condition */}
                  <div className="space-y-1 xs:space-y-1.5 sm:col-span-2">
                    <label htmlFor="hero-condition" className="text-xs xs:text-sm font-medium text-gray-700">
                      <Translate>Medical Condition / Treatment Required</Translate> <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="hero-condition"
                      rows={3}
                      placeholder="Describe your medical condition or treatment"
                      required
                      value={formData.medicalCondition}
                      onChange={(e) => setFormData({ ...formData, medicalCondition: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 focus:ring-offset-0 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Medical Report Upload */}
                  <div className="space-y-1 xs:space-y-1.5 sm:col-span-2">
                    <label htmlFor="hero-medical-report" className="text-xs xs:text-sm font-medium text-gray-700">
                      <Translate>Upload Medical Report</Translate> <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id="hero-medical-report"
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                        className="hidden"
                      />
                      <label
                        htmlFor="hero-medical-report"
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
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          variants={searchBarVariants}
          initial="hidden"
          animate="visible"
          className="mt-4 xs:mt-6 sm:mt-8 lg:mt-10 xl:mt-14 max-w-5xl mx-auto px-1 xs:px-2 sm:px-0 mb-8 xs:mb-12 sm:mb-16 lg:mb-20"
          ref={searchRef}
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="flex flex-col sm:flex-row items-center bg-white rounded-xl xs:rounded-2xl sm:rounded-full shadow-xl xs:shadow-2xl hover:shadow-3xl overflow-hidden border-2 border-gray-100 focus-within:border-green-500 transition-all duration-300">
              
              {/* Dropdown */}
              <Select
                onValueChange={(val) => setSearchCategory(val)}
                defaultValue="treatments"
              >
                <SelectTrigger className="w-full sm:w-40 lg:w-44 border-0 shadow-none px-3 xs:px-4 sm:px-6 h-10 xs:h-12 sm:h-14 lg:h-16 focus:ring-0 focus:ring-offset-0 rounded-t-xl xs:rounded-t-2xl sm:rounded-l-full sm:rounded-tr-none text-xs xs:text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50/80 transition-colors flex items-center justify-center backdrop-blur-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="rounded-xl">
                  <SelectItem value="treatments" className="text-sm sm:text-base py-2 cursor-pointer"><Translate>Treatments</Translate></SelectItem>
                  <SelectItem value="hospitals" className="text-sm sm:text-base py-2 cursor-pointer"><Translate>Hospitals</Translate></SelectItem>
                  <SelectItem value="doctors" className="text-sm sm:text-base py-2 cursor-pointer"><Translate>Doctors</Translate></SelectItem>
                </SelectContent>
              </Select>

              {/* Input */}
              <div className="relative flex-1">
                <Input
                  type="text"
                  placeholder="Type treatments, doctors, hospitals name"
                  value={searchQuery}
                  onChange={handleInputChange}
                  onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                  className="flex-1 px-3 xs:px-4 sm:px-6 h-8 xs:h-9 sm:h-11 lg:h-12 text-xs xs:text-sm sm:text-base placeholder:text-gray-400 rounded-none w-full flex items-center !border-0 !shadow-none !outline-none focus:!ring-0 focus:!ring-offset-0 focus-visible:!ring-0 focus-visible:!outline-none"
                />
              </div>

              {/* Button */}
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-b-xl xs:rounded-b-2xl sm:rounded-full px-6 xs:px-10 sm:px-16 lg:px-20 h-8 xs:h-9 sm:h-11 lg:h-12 m-0 sm:m-1.5 font-semibold transition-all duration-300 w-full sm:w-auto text-xs xs:text-sm sm:text-base shadow-none flex items-center justify-center"
              >
                <span><Translate>Search</Translate></span>
                <Search className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && (searchQuery.length >= 2) && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 mb-8 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 w-[calc(100%-2rem)] sm:w-[calc(100%-11rem)] lg:w-[calc(100%-12rem)]">
                <div className="max-h-[280px] overflow-y-auto scrollbar-hide py-1">
                  {isLoadingSuggestions ? (
                    <div className="flex items-center justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
                    </div>
                  ) : suggestions.length > 0 ? (
                    suggestions.map((item) => (
                      <Link
                        key={item.id}
                        href={item.url}
                        onClick={() => setShowSuggestions(false)}
                        className="group flex items-center gap-3 px-4 py-3 hover:bg-green-50 transition-all duration-150"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-green-50 group-hover:bg-green-100 transition-colors flex-shrink-0">
                          <Search className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-700 group-hover:text-green-600 transition-colors truncate">
                            {item.title}
                          </p>
                          {item.subtitle && (
                            <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
                          )}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="px-4 py-6 text-center text-gray-500">
                      <p className="text-sm">No results found</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </form>
          
          {/* Quick Search Tips */}
          <div className="mt-3 xs:mt-4 text-center">
            <p className="text-[10px] xs:text-xs sm:text-sm text-gray-200 px-1 xs:px-2 font-medium">
              Try: <span className="text-green-400">"Heart Surgery"</span>, <span className="text-green-400">"Orthopedic"</span>, <span className="text-green-400">"Cancer Treatment"</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};