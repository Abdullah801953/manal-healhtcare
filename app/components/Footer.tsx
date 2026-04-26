"use client";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
} from "lucide-react";
import logo from "@/public/logo.png";
import { useSettings } from "../contexts/SettingsContext";
import { useState, useEffect } from "react";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/info/privacy-policy", label: "Privacy Policy" },
  { href: "/info/terms-conditions", label: "Terms & Conditions" },
  { href: "/info/disclaimer", label: "Disclaimer" },
];

const Footer = () => {
  const { settings } = useSettings();

  const [showFullText, setShowFullText] = useState(false);
  const [treatments, setTreatments] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const treatmentRes = await fetch("/api/treatments?status=active");
        const treatmentData = await treatmentRes.json();
        if (treatmentData.success) {
          const uniqueCategories = Array.from(
            new Map(
              treatmentData.data.map((t: any) => [t.category, t]),
            ).values(),
          ).slice(0, 6);
          setTreatments(uniqueCategories);
        }

        const hospitalRes = await fetch("/api/hospitals?status=active");
        const hospitalData = await hospitalRes.json();
        if (hospitalData.success) {
          setHospitals(hospitalData.data.slice(0, 6));
        }
      } catch (error) {
        console.error("Error fetching footer data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-2 sm:px-2 lg:px-2 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <Image src={logo} alt="Logo" width={120} height={40} />
            </Link>

            {/* ✅ FIXED DISCLAIMER */}
            <div className="mt-3">
              <p
                className={`text-sm text-gray-600 leading-relaxed transition-all duration-300 ${
                  showFullText ? "" : "line-clamp-5"
                }`}
              >
                Manal Health Care acts solely as a medical tourism facilitator and
                does not provide medical advice, diagnosis, or treatment. All
                healthcare services are rendered exclusively by independent
                hospitals and licensed medical professionals. We make no
                representations or warranties regarding treatment outcomes and
                expressly disclaim any liability for complications, losses, or
                damages arising from such services. Use of our services does not
                establish a doctor–patient relationship. By using our services,
                you agree to and accept our Terms & Conditions.
              </p>

              <button
                onClick={() => setShowFullText(!showFullText)}
                className="mt-2 text-xs font-semibold text-[#209F00] hover:underline flex items-center gap-1"
              >
                {showFullText ? "View Less" : "View More"}
                <ChevronRight
                  className={`w-3 h-3 transition ${
                    showFullText ? "rotate-90" : ""
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="flex items-center gap-2 text-gray-600 hover:text-[#209F00]">
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Get In Touch</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex gap-2">
                <MapPin size={16} /> {settings?.address}
              </div>
              <div className="flex gap-2">
                <Phone size={16} /> {settings?.sitePhone}
              </div>
              <div className="flex gap-2">
                <Mail size={16} /> {settings?.siteEmail}
              </div>
            </div>
          </div>

          {/* Hospitals */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Hospitals</h3>
            <ul className="space-y-3">
              {hospitals.map((h) => (
                <li key={h._id}>
                  <Link href={`/hospitals/${h.slug}`} className="flex gap-2 text-sm text-gray-600 hover:text-[#209F00]">
                    <ChevronRight size={14} />
                    {h.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Treatments */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Treatments</h3>
            <ul className="space-y-3">
              {treatments.map((t) => (
                <li key={t._id}>
                  <Link href={`/treatments/${t.slug}`} className="flex gap-2 text-sm text-gray-600 hover:text-[#209F00]">
                    <ChevronRight size={14} />
                    {t.category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Social Banner */}
      <div className="bg-[#b8d9f0] border-t">
        <div className="container mx-auto px-4 py-4 flex flex-wrap justify-between gap-4">

          <div className="flex items-center gap-3">
  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow">
    <Mail className="w-5 h-5 text-gray-700" />
  </div>
  <span className="text-sm text-gray-800 font-medium">
    {settings?.siteEmail}
  </span>
</div>
          <div className="text-sm">📞 {settings?.sitePhone}</div>

          <a
            href={`https://wa.me/${settings?.sitePhone?.replace(/\D/g, "")}`}
            target="_blank"
            className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm"
          >
            Chat Now
          </a>

          <div className="flex gap-2">
            <Youtube />
            <Linkedin />
            <Facebook />
            <Instagram />
            <Twitter />
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-200 text-center py-3 text-sm">
      Copyright © FAAB | Designed & Powered by FAAB
      </div>
    </footer>
  );
};

export default Footer;