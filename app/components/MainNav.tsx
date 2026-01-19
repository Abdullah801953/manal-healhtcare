"use client";

import Link from "next/link";
import { useState } from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { treatmentCategories } from "@/app/lib/treatments";
import { 
  Languages, 
  Search,
  Brain,
  Activity,
  Heart,
  Sparkles,
  Smile,
  Ear,
  Eye,
  Pill,
  Scissors,
  Baby,
  Droplet,
  Zap,
  HeartPulse,
  Bone,
  Bot,
  Dna,
  Syringe,
  Scale,
  Plane,
  Globe,
  TrendingUp,
  Award,
  FileText,
  HelpCircle,
  Stethoscope,
  Building2,
  ShieldCheck,
  ScrollText,
  LucideIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LanguageSelector } from "./LanguageSelector";

const iconMap: Record<string, LucideIcon> = {
  Brain,
  Activity,
  Heart,
  Sparkles,
  Smile,
  Ear,
  Eye,
  Pill,
  Scissors,
  Baby,
  Droplet,
  Zap,
  HeartPulse,
  Bone,
  Bot,
  Dna,
  Syringe,
  Scale,
  Plane,
  Globe,
  TrendingUp,
  Award,
  FileText,
  HelpCircle,
  Stethoscope,
  Building2,
  ShieldCheck,
  ScrollText,
};

const infoMenuItems = [
  { href: "/info/plan-your-travel", label: "Plan Your Travel", icon: "Plane" },
  { href: "/info/medical-tourism-india", label: "Medical Tourism in India", icon: "Globe" },
  { href: "/info/advantages-medical-tourism", label: "Advantages of Medical Tourism", icon: "TrendingUp" },
  { href: "/info/halal-certification", label: "Halal Certification", icon: "Award" },
  { href: "/info/second-opinion", label: "Second Opinion", icon: "FileText" },
  { href: "/info/faqs-for-patient", label: "FAQs for Patient", icon: "HelpCircle" },
  { href: "/info/medical-tourism", label: "Medical Tourism", icon: "Stethoscope" },
  { href: "/info/best-hospital", label: "Best Hospital", icon: "Building2" },
  { href: "/info/privacy-policy", label: "Privacy Policy", icon: "ShieldCheck" },
  { href: "/info/terms-conditions", label: "Terms & Conditions", icon: "ScrollText" },
];

export const MainNav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [infoSearchQuery, setInfoSearchQuery] = useState("");
  
  const filteredTreatments = treatmentCategories.filter((treatment) =>
    treatment.category.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const filteredInfoItems = infoMenuItems.filter((item) =>
    item.label.toLowerCase().includes(infoSearchQuery.toLowerCase())
  );

  return (
    <div className="hidden lg:flex items-center gap-15">
      
      {/* NAVIGATION MENU */}
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-3">
          <NavigationMenuItem >
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-[18px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent"
                )}
              >
                Home
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/about"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-[18px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent"
                )}
              >
                About Us
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/blogs"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-[18px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent"
                )}
              >
                Our Blogs
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Treatments Dropdown */}
          <NavigationMenuItem>
            <Link href="/treatments" legacyBehavior passHref>
              <NavigationMenuTrigger className="bg-transparent font-medium text-gray-900 text-[18px] hover:text-[#209F00] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                Treatments
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              {/* Search Bar */}
              <div className="w-[420px] p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 w-full bg-gray-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full text-sm"
                  />
                </div>
              </div>
              
              {/* Treatments List */}
              <div className="w-[420px] max-h-[420px] overflow-y-auto scrollbar-hide ">
                {filteredTreatments.length > 0 ? (
                  filteredTreatments.map((treatment) => {
                    const Icon = iconMap[treatment.icon];
                    return (
                      <Link
                        key={treatment.id}
                        href={`/treatments/${treatment.id}`}
                        className="group flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-all duration-150"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                          {Icon && <Icon className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700 transition-colors" />}
                        </div>
                        <span className="text-sm font-normal text-gray-700 group-hover:text-gray-900 transition-colors flex-1">
                          {treatment.category}
                        </span>
                      </Link>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500 text-sm">
                    No treatments found
                  </div>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/hospitals"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-[18px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent"
                )}
              >
                Hospitals
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/doctors"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-[18px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent"
                )}
              >
                Doctors
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/testimonials"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-[18px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent"
                )}
              >
                Testimonials
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Info Dropdown */}
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-transparent font-medium text-gray-900 text-[18px] hover:text-[#209F00] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
              Info
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              {/* Search Bar */}
              <div className="w-[420px] p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={infoSearchQuery}
                    onChange={(e) => setInfoSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2.5 w-full bg-gray-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full text-sm"
                  />
                </div>
              </div>
              
              {/* Info List */}
              <div className="w-[420px] max-h-[420px] overflow-y-auto scrollbar-hide">
                {filteredInfoItems.length > 0 ? (
                  filteredInfoItems.map((item, index) => {
                    const Icon = iconMap[item.icon];
                    return (
                      <Link
                        key={index}
                        href={item.href}
                        className="group flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-all duration-150"
                      >
                        <div className="flex items-center justify-center w-9 h-9 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
                          {Icon && <Icon className="w-4 h-4 text-emerald-600 group-hover:text-emerald-700 transition-colors" />}
                        </div>
                        <span className="text-sm font-normal text-gray-700 group-hover:text-gray-900 transition-colors flex-1">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })
                ) : (
                  <div className="px-4 py-8 text-center text-gray-500 text-sm">
                    No results found
                  </div>
                )}
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/contact"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-[18px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent"
                )}
              >
                Contact Us
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* LANGUAGE BUTTON */}
      <LanguageSelector />
    </div>
  );
};
