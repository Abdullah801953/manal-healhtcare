"use client";

import Link from "next/link";
import { ChevronRight, MapPin, Phone, Mail } from "lucide-react";

// Footer data organized for reusability
const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact US" },
  { href: "/blogs", label: "Blogs" },
  { href: "/doctors", label: "Doctors" },
];

const utilityPages = [
  { href: "/password-protected", label: "Password Protected" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact US" },
  { href: "/blogs", label: "Blogs" },
  { href: "/doctors", label: "Doctors" },
];

const services = [
  { href: "/services/prenatal-care", label: "Prenatal Care" },
  { href: "/services/prenatal-care", label: "Prenatal Care" },
  { href: "/services/neuro-surgery", label: "Neuro Surgery" },
  { href: "/services/cardiology", label: "Cardiology" },
  { href: "/services/dental-care", label: "Dental Care" },
  { href: "/services/ophthalmology", label: "Ophthalmology" },
];

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
          {/* Company Info Section */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-linear-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-2xl">M</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">Manal Healthcare</span>
              </div>
            </Link>
            <p className="text-sm text-gray-600 leading-relaxed">
              Eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud.
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
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
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
              {/* Location */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Location</h4>
                <div className="flex items-start gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>1615 Lyon Avenue<br />Framingham, MA<br />01702</span>
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Phone className="w-4 h-4 shrink-0" />
                    <Link href="tel:5088727876" className="hover:text-primary transition-colors">
                      508-872-7876
                    </Link>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Mail className="w-4 h-4 shrink-0" />
                    <Link href="mailto:monvit@gmail.com" className="hover:text-primary transition-colors">
                      monvit@gmail.com
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Utility Pages */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Utility Pages</h3>
            <ul className="space-y-3">
              {utilityPages.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={`${service.href}-${index}`}>
                  <Link
                    href={service.href}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors group"
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    <span className="text-sm">{service.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-gray-200 border-t border-gray-300">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-gray-700">
            Copyright © <span className="font-semibold">FAB</span> | Designed by{" "}
            <span className="font-semibold">xyz</span> - Powered by{" "}
            <span className="font-semibold">FAAB</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;