"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useSettings } from "@/app/contexts/SettingsContext";
import Translate from "./Translate";
import { toast } from "sonner";

export const HeroQueryForm = () => {
  const { settings } = useSettings();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "",
    country: "",
    medicalCondition: "",
    medicalReport: null as File | null,
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData({ ...formData, medicalReport: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let reportUrl = "";

      // Upload file if exists
      if (formData.medicalReport) {
        const uploadData = new FormData();
        uploadData.append("file", formData.medicalReport);
        uploadData.append("type", "medical");

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadJson = await uploadRes.json();
        if (uploadJson.success) {
          reportUrl = uploadJson.url;
        }
      }

      // Save Inquiry
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: `${formData.countryCode}${formData.phone}`,
          country: formData.country,
          medicalCondition: formData.medicalCondition,
          medicalReport: reportUrl,
          status: "new",
        }),
      });

      const data = await response.json();

      if (data.success) {
        const message = `Hello! I'm ${formData.name} from ${formData.country}.

Medical Condition: ${formData.medicalCondition}

${formData.email ? `Email: ${formData.email}` : ""}
${reportUrl ? `Medical Report: ${window.location.origin}${reportUrl}` : ""}

I would like to discuss my treatment options.`;

        const phoneNumber =
          settings?.whatsappNumber?.replace(/\D/g, "") || "918287508755";

        // Open WhatsApp in new tab (non-blocking)
        try {
          window.open(
            `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
            "_blank"
          );
        } catch (_) {}

        setFormData({
          name: "",
          email: "",
          phone: "",
          countryCode: "",
          country: "",
          medicalCondition: "",
          medicalReport: null,
        });

        window.location.href = '/thank-you';
      } else {
        toast.error('Failed to submit inquiry. Please try again.');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="query-form" className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 px-6 py-5">
        <h3 className="text-2xl font-bold text-white text-center">
          <Translate>Get Free Consultation</Translate>
        </h3>
        <p className="text-white/90 text-sm text-center mt-1.5">
          <Translate>Our team will contact you .</Translate>
        </p>
      </div>

      {/* Form */}
      <div className="p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

          <Input
            placeholder="Full Name *"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="rounded-full"
          />

          <Input
            type="email"
            placeholder="Email (Optional)"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="rounded-full"
          />

          <div className="flex gap-2 sm:col-span-2">
            <Input
              placeholder="+91"
              value={formData.countryCode}
              onChange={(e) =>
                setFormData({ ...formData, countryCode: e.target.value })
              }
              className="rounded-full w-28"
            />
            <Input
              placeholder="WhatsApp Number *"
              required
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="rounded-full flex-1"
            />
          </div>

          <Input
            placeholder="Country *"
            required
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            className="rounded-full sm:col-span-2"
          />

          <textarea
            rows={3}
            required
            placeholder="Medical Condition / Treatment Required *"
            value={formData.medicalCondition}
            onChange={(e) =>
              setFormData({ ...formData, medicalCondition: e.target.value })
            }
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-600 focus:ring-2 focus:ring-green-600 outline-none sm:col-span-2"
          />

          <div className="sm:col-span-2">
            <input
              type="file"
              id="medical-report"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              className="hidden"
            />
            <label
              htmlFor="medical-report"
              className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-green-600 hover:bg-green-50 transition"
            >
              <Upload className="w-4 h-4" />
              {formData.medicalReport
                ? formData.medicalReport.name
                : "Upload Medical Report (Optional)"}
            </label>
          </div>

          <div className="sm:col-span-2">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white rounded-full py-5 font-semibold"
            >
              {isSubmitting ? "Submitting..." : "Submit Query"}
              {!isSubmitting && (
                <ArrowRight className="ml-2 w-5 h-5 inline-block" />
              )}
            </Button>
          </div>

          <div className="sm:col-span-2 text-center text-xs text-gray-500">
            By submitting, you agree to our{" "}
            <Link href="/info/privacy-policy" className="text-green-600">
              Privacy Policy
            </Link>{" "}
            &{" "}
            <Link href="/info/terms-conditions" className="text-green-600">
              Terms & Conditions
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};