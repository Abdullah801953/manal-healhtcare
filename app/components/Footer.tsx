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
  { href: "/contact", label: "Contact US" },
  { href: "/blogs", label: "Blogs" },
  { href: "/doctors", label: "Doctors" },
];

const Footer = () => {
  const { settings } = useSettings();
  const [treatments, setTreatments] = useState<any[]>([]);
  const [hospitals, setHospitals] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Treatments
        const treatmentRes = await fetch("/api/treatments?status=active");
        const treatmentData = await treatmentRes.json();
        if (treatmentData.success) {
          const uniqueCategories = Array.from(
            new Map(
              treatmentData.data.map((t: any) => [t.category, t])
            ).values()
          ).slice(0, 6);
          setTreatments(uniqueCategories);
        }

        // Fetch Hospitals
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
      <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">

          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src={logo}
                alt="Manal Healthcare Logo"
                width={120}
                height={40}
                priority
                className="object-contain"
              />
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Manal Healthcare provides trusted Medical Tourism services in
              India, connecting patients with top hospitals and experienced
              doctors.{" "}
              <Link href="/contact" className="text-[#209F00] underline">
                Book your consultation today
              </Link>
              .
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-[#209F00] transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Get In Touch</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{settings?.address || "Loading..."}</span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 shrink-0" />
                    <Link
                      href={`tel:${settings?.sitePhone?.replace(/\D/g, "")}`}
                      className="hover:text-[#209F00] transition-colors"
                    >
                      {settings?.sitePhone || "Loading..."}
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 shrink-0" />
                    <Link
                      href={`mailto:${settings?.siteEmail}`}
                      className="hover:text-[#209F00] transition-colors"
                    >
                      {settings?.siteEmail || "Loading..."}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Top Hospitals */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Top Hospitals</h3>
            <ul className="space-y-3">
              {hospitals.length > 0 ? (
                hospitals.map((hospital) => (
                  <li key={hospital._id}>
                    <Link
                      href={`/hospitals/${hospital.slug}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-[#209F00] transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">
                        {hospital.name === "Cosmoden" ? "Metro Hospital" : hospital.name}
                      </span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">Loading hospitals...</li>
              )}
            </ul>
          </div>

          {/* Our Treatments */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Our Treatments</h3>
            <ul className="space-y-3">
              {treatments.length > 0 ? (
                treatments.map((treatment) => (
                  <li key={treatment._id}>
                    <Link
                      href={`/treatments/${treatment.slug}`}
                      className="flex items-center gap-2 text-gray-600 hover:text-[#209F00] transition-colors group"
                    >
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      <span className="text-sm">{treatment.category}</span>
                    </Link>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-500">Loading treatments...</li>
              )}
            </ul>
          </div>

        </div>
      </div>

      <div className="bg-gray-200 border-t border-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-10 py-4">
          <p className="text-center text-sm text-gray-700">
            Copyright © <span className="font-semibold">FAAB</span> | Designed & Powered by <span className="font-semibold">FAAB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;