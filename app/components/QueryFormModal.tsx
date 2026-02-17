"use client";

import { useState } from "react";
import { X, Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "../contexts/SettingsContext";

interface QueryFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function QueryFormModal({
  isOpen,
  onClose,
}: QueryFormModalProps) {
  const { settings } = useSettings();

  const [setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    country: "",
    whatsapp: "",
    email: "",
    problem: "",
    reports: null as File | null,
  });

const handleClose = () => {
  onClose();
};

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let reportUrl = "";

      // Upload medical report
      if (formData.reports) {
        const uploadFormData = new FormData();
        uploadFormData.append("file", formData.reports);
        uploadFormData.append("type", "medical");

        const uploadResponse = await fetch("/api/upload", {
          method: "POST",
          body: uploadFormData,
        });

        const uploadData = await uploadResponse.json();

        if (uploadData.success) {
          reportUrl = uploadData.url;
        } else {
          alert(
            "Failed to upload medical report: " + uploadData.message
          );
          setIsSubmitting(false);
          return;
        }
      }

      // Save inquiry
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.whatsapp,
          country: formData.country,
          medicalCondition: formData.problem,
          medicalReport: reportUrl,
          status: "new",
        }),
      });

      const data = await response.json();

      if (data.success) {
        // WhatsApp message
        const message = `Hello! I'm ${formData.name} from ${formData.country}.

Medical Condition: ${formData.problem}

${formData.email ? `Email: ${formData.email}` : ""}

${
  reportUrl
    ? `Medical Report: ${window.location.origin}${reportUrl}`
    : "No medical report attached"
}

I would like to discuss my treatment options.`;

        const phoneNumber =
          settings?.whatsappNumber?.replace(/\D/g, "") ||
          "918287508755";

        const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
          message
        )}`;

        window.open(whatsappUrl, "_blank");

        // Reset form
        setFormData({
          name: "",
          country: "",
          whatsapp: "",
          email: "",
          problem: "",
          reports: null,
        });

        handleClose();
      } else {
        alert("Failed to submit inquiry. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        reports: e.target.files[0],
      });
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

          {/* Close Button */}
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
            <h2 className="text-2xl font-bold mb-2">
              Get Free Consultation
            </h2>
            <p className="text-white/90 text-sm">
              Fill out the form and our team will contact you
              within 24 hours
            </p>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 space-y-4 max-h-[calc(90vh-140px)] overflow-y-auto"
          >
            {/* Name */}
            <input
              type="text"
              required
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />

            {/* WhatsApp */}
            <input
              type="tel"
              required
              placeholder="WhatsApp Number"
              value={formData.whatsapp}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  whatsapp: e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />

            {/* Problem */}
            <textarea
              required
              rows={4}
              placeholder="Describe your medical condition..."
              value={formData.problem}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  problem: e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />

            {/* Upload */}
            <div>
              <input
                type="file"
                id="reports"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="reports"
                className="flex items-center justify-center gap-2 border-2 border-dashed rounded-lg py-3 cursor-pointer"
              >
                <Upload size={18} />
                {formData.reports
                  ? formData.reports.name
                  : "Upload Medical Report (Optional)"}
              </label>
            </div>

            {/* Submit */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#209f00] text-white py-3"
            >
              {isSubmitting ? "Submitting..." : "Submit Query"}
              {!isSubmitting && (
                <Send size={16} className="ml-2" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
