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
import doctor from "@/public/doctor.png";
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
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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

  // Get suggestions based on search query and category
  const suggestions = useMemo(() => {
    if (!searchQuery.trim() || searchQuery.length < 2) return [];

    const query = searchQuery.toLowerCase();
    let results: Array<{ id: string; title: string; subtitle?: string; url: string }> = [];

    switch (searchCategory) {
      case "treatments":
        results = treatmentsData
          .filter((t) => t.category.toLowerCase().includes(query))
          .slice(0, 5)
          .map((t) => ({
            id: t.id,
            title: t.category,
            url: `/treatments/${t.id}`,
          }));
        break;

      case "doctors":
        results = doctorsData
          .filter(
            (d) =>
              d.name.toLowerCase().includes(query) ||
              d.specialty?.toLowerCase().includes(query)
          )
          .slice(0, 5)
          .map((d) => ({
            id: d.id,
            title: d.name,
            subtitle: d.specialty || d.specialization?.[0] || "",
            url: `/doctors/${d.id}`,
          }));
        break;

      case "hospitals":
        results = hospitalsData
          .filter(
            (h) =>
              h.name.toLowerCase().includes(query) ||
              h.city.toLowerCase().includes(query) ||
              h.type.toLowerCase().includes(query)
          )
          .slice(0, 5)
          .map((h) => ({
            id: h.id,
            title: h.name,
            subtitle: `${h.city} • ${h.type}`,
            url: `/hospitals/${h.id}`,
          }));
        break;
    }

    return results;
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

  const imageVariants = {
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
    <section className="relative bg-gradient-to-br from-green-50/30 via-white to-blue-50/30 overflow-hidden pb-32 sm:pb-40 lg:pb-48">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-50 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-10 md:py-14 lg:py-16 xl:py-20 overflow-hidden relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
          >
            <motion.div className="space-y-3 sm:space-y-4 lg:space-y-5">
              {/* Main Hero Heading with enhanced styling */}
              <motion.h1 
                variants={itemVariants}
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-gray-900 px-2 sm:px-0 drop-shadow-sm"
              >
                <Translate>Enhancing Lives, Reviving</Translate>{" "}
                <span className="bg-gradient-to-r from-[#209F00] to-[#1a7f00] bg-clip-text text-transparent">
                  <Translate>Health</Translate>
                </span>{" "}
                <Translate>for a</Translate>{" "}
                <span className="bg-gradient-to-r from-[#209F00] to-[#1a7f00] bg-clip-text text-transparent">
                  <Translate>Better</Translate>
                </span>{" "}
                <Translate>Tomorrow</Translate>
              </motion.h1>

              {/* Subheading */}
              <motion.h2 
                variants={itemVariants}
                className="text-base sm:text-lg md:text-xl lg:text-2xl font-medium text-gray-800 leading-relaxed px-2 sm:px-0"
              >
                <Translate>Your trusted partner in Medical Tourism in India, connecting you with top hospitals and experienced doctors.</Translate>
              </motion.h2>

              {/* Description */}
              <motion.p
                variants={itemVariants}
                className="text-gray-500 text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0 px-2 sm:px-0"
              >
                <Translate>Discover world-class healthcare services where your well-being comes first. At Manal Healthcare, we provide personalized, compassionate medical care and seamless medical tourism services in India, ensuring safe, affordable, and high-quality treatment for every patient.</Translate>
              </motion.p>
            </motion.div>

            <motion.div variants={itemVariants} className="pt-2 px-2 sm:px-0">
              <Button
                size="lg"
                onClick={() => window.dispatchEvent(new Event('openQueryModal'))}
                className="bg-gradient-to-r from-[#209F00] to-[#1a7f00] hover:from-[#1a7f00] hover:to-[#155f00] text-white rounded-full px-8 sm:px-10 py-5 sm:py-6 text-sm sm:text-base lg:text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:scale-105 group w-full sm:w-auto"
              >
                <Translate>Get a Free Quote</Translate>
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            variants={imageVariants}
            initial="hidden"
            animate="visible"
            className="relative flex justify-center lg:justify-end order-1 lg:order-2 px-4 sm:px-0"
          >
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-lg">
              {/* Decorative background elements */}
              <div className="absolute -z-10 top-0 right-0 w-3/4 h-3/4 bg-gradient-to-br from-green-200/40 to-blue-200/40 rounded-full filter blur-3xl"></div>
              <div className="absolute -z-10 bottom-0 left-0 w-3/4 h-3/4 bg-gradient-to-tr from-green-100/40 to-blue-100/40 rounded-full filter blur-3xl"></div>
              
              <Image
                src={doctor}
                alt="Professional Healthcare Doctor"
                width={600}
                height={700}
                className="w-full h-auto object-contain drop-shadow-2xl relative z-10 hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 600px"
              />
            </div>
          </motion.div>
        </div>

        {/* Search Bar */}
        <motion.div
          variants={searchBarVariants}
          initial="hidden"
          animate="visible"
          className="mt-6 sm:mt-8 lg:mt-10 xl:mt-14 max-w-5xl mx-auto px-2 sm:px-0 mb-12 sm:mb-16 lg:mb-20"
          ref={searchRef}
        >
          <form onSubmit={handleSearch} className="relative">
            <div className="flex flex-col sm:flex-row items-center bg-white rounded-2xl sm:rounded-full shadow-2xl hover:shadow-3xl overflow-hidden border-2 border-gray-100 focus-within:border-green-500 transition-all duration-300">
              
              {/* Dropdown */}
              <Select
                onValueChange={(val) => setSearchCategory(val)}
                defaultValue="treatments"
              >
                <SelectTrigger className="w-full sm:w-40 lg:w-44 border-0 shadow-none px-4 sm:px-6 h-12 sm:h-14 lg:h-16 focus:ring-0 focus:ring-offset-0 rounded-t-2xl sm:rounded-l-full sm:rounded-tr-none text-sm sm:text-base font-medium text-gray-700 hover:bg-gray-50/80 transition-colors flex items-center justify-center backdrop-blur-sm">
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
                  className="flex-1 border-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0 px-4 sm:px-6 h-9 sm:h-11 lg:h-12 text-sm sm:text-base placeholder:text-gray-400 rounded-none w-full flex items-center"
                />
              </div>

              {/* Button */}
              <Button
                type="submit"
                size="lg"
                className="bg-gradient-to-r from-[#209F00] to-[#1a8000] hover:from-green-700 hover:to-green-800 text-white rounded-b-2xl sm:rounded-full px-10 sm:px-16 lg:px-20 h-9 sm:h-11 lg:h-12 m-0 sm:m-1.5 font-semibold transition-all duration-300 w-full sm:w-auto text-sm sm:text-base shadow-none flex items-center justify-center"
              >
                <span><Translate>Search</Translate></span>
                <Search className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
              </Button>
            </div>

            {/* Suggestions Dropdown */}
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 mb-8 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 w-[calc(100%-2rem)] sm:w-[calc(100%-11rem)] lg:w-[calc(100%-12rem)]">
                <div className="max-h-[280px] overflow-y-auto scrollbar-hide py-1">
                  {suggestions.map((item, index) => (
                    <Link
                      key={item.id}
                      href={item.url}
                      onClick={() => setShowSuggestions(false)}
                      className="group flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-all duration-150"
                    >
                      <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors flex-shrink-0">
                        <Search className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors truncate">
                          {item.title}
                        </p>
                        {item.subtitle && (
                          <p className="text-xs text-gray-500 truncate">{item.subtitle}</p>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </form>
          
          {/* Quick Search Tips */}
          <div className="mt-4 text-center">
            <p className="text-xs sm:text-sm text-gray-600 px-2 font-medium">
              Try: <span className="text-emerald-600">"Heart Surgery"</span>, <span className="text-emerald-600">"Orthopedic"</span>, <span className="text-emerald-600">"Cancer Treatment"</span>
            </p>
          </div>
        </motion.div>
      </div>

      {/* Query Form Section - Positioned to overlap */}
      <div className="absolute left-0 right-0 bottom-0 translate-y-1/2 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="max-w-lg mx-auto"
          >
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-[#209F00] to-[#1a8000] px-6 py-5">
                <h3 className="text-xl sm:text-2xl font-bold text-white text-center">
                  <Translate>Get Free Consultation</Translate>
                </h3>
                <p className="text-white/90 text-sm text-center mt-1.5">
                  <Translate>Fill out the form and our team will contact you within 24 hours</Translate>
                </p>
              </div>

              {/* Form Body */}
              <div className="p-6 sm:p-8">
                <form onSubmit={handleFormSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="hero-name" className="text-sm font-medium text-gray-700">
                      <Translate>Full Name</Translate> <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="hero-name"
                      type="text"
                      placeholder="Enter your full name"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-10 text-sm rounded-full border-gray-300 focus:border-[#209F00] focus:ring-[#209F00]"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="hero-email" className="text-sm font-medium text-gray-700">
                      <Translate>Email Address</Translate> <span className="text-gray-400 text-xs">(Optional)</span>
                    </label>
                    <Input
                      id="hero-email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-10 text-sm rounded-full border-gray-300 focus:border-[#209F00] focus:ring-[#209F00]"
                    />
                  </div>

                  {/* Phone */}
                  <div className="space-y-1.5">
                    <label htmlFor="hero-phone" className="text-sm font-medium text-gray-700">
                      <Translate>WhatsApp Number</Translate> <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="hero-phone"
                      type="tel"
                      placeholder="Enter WhatsApp number"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="h-10 text-sm rounded-full border-gray-300 focus:border-[#209F00] focus:ring-[#209F00]"
                    />
                  </div>

                  {/* Country */}
                  <div className="space-y-1.5">
                    <label htmlFor="hero-country" className="text-sm font-medium text-gray-700">
                      <Translate>Country</Translate> <span className="text-red-500">*</span>
                    </label>
                    <Select required value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                      <SelectTrigger 
                        id="hero-country"
                        className="h-10 text-sm rounded-full border-gray-300 focus:border-[#209F00] focus:ring-[#209F00]"
                      >
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent className="max-h-[300px]">
                        <SelectItem value="saudi-arabia">Saudi Arabia</SelectItem>
                        <SelectItem value="uae">United Arab Emirates</SelectItem>
                        <SelectItem value="qatar">Qatar</SelectItem>
                        <SelectItem value="kuwait">Kuwait</SelectItem>
                        <SelectItem value="oman">Oman</SelectItem>
                        <SelectItem value="bahrain">Bahrain</SelectItem>
                        <SelectItem value="iraq">Iraq</SelectItem>
                        <SelectItem value="yemen">Yemen</SelectItem>
                        <SelectItem value="jordan">Jordan</SelectItem>
                        <SelectItem value="lebanon">Lebanon</SelectItem>
                        <SelectItem value="palestine">Palestine</SelectItem>
                        <SelectItem value="syria">Syria</SelectItem>
                        <SelectItem value="egypt">Egypt</SelectItem>
                        <SelectItem value="morocco">Morocco</SelectItem>
                        <SelectItem value="algeria">Algeria</SelectItem>
                        <SelectItem value="tunisia">Tunisia</SelectItem>
                        <SelectItem value="libya">Libya</SelectItem>
                        <SelectItem value="sudan">Sudan</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Medical Condition */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="hero-condition" className="text-sm font-medium text-gray-700">
                      <Translate>Medical Condition / Treatment Required</Translate> <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="hero-condition"
                      rows={3}
                      placeholder="Describe your medical condition or treatment"
                      required
                      value={formData.medicalCondition}
                      onChange={(e) => setFormData({ ...formData, medicalCondition: e.target.value })}
                      className="w-full px-3 py-2.5 text-sm rounded-lg border border-gray-300 focus:border-[#209F00] focus:ring-2 focus:ring-[#209F00] focus:ring-offset-0 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Medical Report Upload */}
                  <div className="space-y-1.5 sm:col-span-2">
                    <label htmlFor="hero-medical-report" className="text-sm font-medium text-gray-700">
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
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#209F00] hover:bg-[#209F00]/5 transition-colors"
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
                  <div className="sm:col-span-2 pt-2">
                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#209F00] to-[#1a8000] hover:from-green-700 hover:to-green-800 text-white rounded-full px-8 py-5 text-base font-semibold transition-all duration-300 shadow-lg hover:shadow-xl group disabled:opacity-50 disabled:cursor-not-allowed"
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
                      <Link href="/info/privacy-policy" className="text-[#209F00] hover:underline font-medium">
                        <Translate>Privacy Policy</Translate>
                      </Link>{" "}
                      <Translate>and</Translate>{" "}
                      <Link href="/info/terms-conditions" className="text-[#209F00] hover:underline font-medium">
                        <Translate>Terms & Conditions</Translate>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-green-100 rounded-full filter blur-3xl opacity-30 -z-10" />
    </section>
  );
};