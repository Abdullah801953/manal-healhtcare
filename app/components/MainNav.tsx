"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
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
  LucideIcon,
  MessageCircleMore,
  Minus,
  Plus,
  ChevronRight,
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
  {
    href: "/info/medical-tourism-india",
    label: "Medical Tourism in India",
    icon: "Globe",
  },
  {
    href: "/info/advantages-medical-tourism",
    label: "Advantages of Medical Tourism",
    icon: "TrendingUp",
  },
  {
    href: "/info/halal-certification",
    label: "Halal Certification",
    icon: "Award",
  },
  { href: "/info/second-opinion", label: "Second Opinion", icon: "FileText" },
  {
    href: "/info/faqs-for-patient",
    label: "FAQs for Patient",
    icon: "HelpCircle",
  },
  {
    href: "/info/medical-tourism",
    label: "Medical Tourism",
    icon: "Stethoscope",
  },
  { href: "/info/best-hospital", label: "Best Hospital", icon: "Building2" },
  {
    href: "/info/privacy-policy",
    label: "Privacy Policy",
    icon: "ShieldCheck",
  },
  {
    href: "/info/terms-conditions",
    label: "Terms & Conditions",
    icon: "ScrollText",
  },
];

interface CategoryGroup {
  category: string;
  treatments: { _id: string; slug: string; title: string }[];
}

export const MainNav = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [infoSearchQuery, setInfoSearchQuery] = useState("");
  const [categoryGroups, setCategoryGroups] = useState<CategoryGroup[]>([]);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  // Fetch treatments from API
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await fetch('/api/treatments');
        const data = await response.json();

        if (data.success) {
          const activeTreatments = data.data.filter((t: any) => t.status === 'active');
          const groupMap = new Map<string, CategoryGroup>();
          activeTreatments.forEach((t: any) => {
            if (!groupMap.has(t.category)) {
              groupMap.set(t.category, { category: t.category, treatments: [] });
            }
            groupMap.get(t.category)!.treatments.push({
              _id: t._id,
              slug: t.slug,
              title: t.title,
            });
          });
          const groups = Array.from(groupMap.values());
          setCategoryGroups(groups);
          if (groups.length > 0) setHoveredCategory(groups[0].category);
        }
      } catch (error) {
        console.error('Error fetching treatments:', error);
      }
    };

    fetchTreatments();
  }, []);

  const filteredCategoryGroups = categoryGroups.filter((g) =>
    g.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const effectiveHovered = filteredCategoryGroups.find(
    (g) => g.category === hoveredCategory
  )
    ? hoveredCategory
    : filteredCategoryGroups[0]?.category ?? null;

  const currentTreatments =
    filteredCategoryGroups.find((g) => g.category === effectiveHovered)
      ?.treatments ?? [];

  const filteredInfoItems = infoMenuItems.filter((item) =>
    item.label.toLowerCase().includes(infoSearchQuery.toLowerCase()),
  );

  return (
    <div className="hidden xl:flex items-center gap-0">
      {/* NAVIGATION MENU */}
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-1 xl:gap-2 2xl:gap-3">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-sm xl:text-base 2xl:text-[17px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent px-2 xl:px-3 2xl:px-4",
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
                  "bg-transparent text-sm xl:text-base 2xl:text-[17px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent px-2 xl:px-3 2xl:px-4",
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
                  "bg-transparent text-sm xl:text-base 2xl:text-[17px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent px-2 xl:px-3 2xl:px-4",
                )}
              >
                Our Blogs
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Treatments Dropdown */}
          <NavigationMenuItem>
            <Link href="/treatments" className="contents">
              <NavigationMenuTrigger className="bg-transparent font-medium text-gray-900 text-sm xl:text-base 2xl:text-[17px] hover:text-[#209F00] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent px-2 xl:px-3 2xl:px-4">
                Treatments
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <div className="w-[720px]">
                {/* Search Bar */}
                <div className="p-3 border-b border-gray-100">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search categories..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 w-full bg-gray-50 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-full text-sm"
                    />
                  </div>
                </div>

                {/* Two-column mega menu */}
                <div className="flex h-[400px]">
                  {/* Left: Category list */}
                  <div className="w-[260px] shrink-0 overflow-y-auto border-r border-gray-100 bg-gray-50">
                    {filteredCategoryGroups.length > 0 ? (
                      filteredCategoryGroups.map((group) => {
                        const isActive = group.category === effectiveHovered;
                        return (
                          <button
                            key={group.category}
                            onMouseEnter={() => setHoveredCategory(group.category)}
                            onClick={() => setHoveredCategory(group.category)}
                            className={cn(
                              "flex items-center justify-between w-full px-4 py-3 text-left text-sm font-medium border-b border-gray-100 transition-colors",
                              isActive
                                ? "bg-white text-green-700 border-l-[3px] border-l-green-600"
                                : "text-gray-700 hover:bg-white hover:text-green-600"
                            )}
                          >
                            <span className="leading-snug pr-2">{group.category}</span>
                            {isActive ? (
                              <Minus className="w-4 h-4 shrink-0 text-green-600" />
                            ) : (
                              <Plus className="w-4 h-4 shrink-0 text-gray-400" />
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="px-4 py-6 text-center text-gray-400 text-sm">
                        No categories found
                      </div>
                    )}
                  </div>

                  {/* Right: Treatments in hovered category */}
                  <div className="flex-1 overflow-y-auto bg-white">
                    {effectiveHovered && (
                      <div className="px-4 py-2 border-b border-gray-100 bg-gray-50/70 sticky top-0">
                        <p className="text-xs font-semibold text-green-700 uppercase tracking-wider">
                          {effectiveHovered}
                        </p>
                      </div>
                    )}
                    {currentTreatments.map((t) => (
                      <Link
                        key={t._id}
                        href={`/treatments/${t.slug}`}
                        className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 hover:text-green-700 hover:bg-green-50 transition-colors border-b border-gray-50"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                        <span>{t.title}</span>
                      </Link>
                    ))}
                    {currentTreatments.length === 0 && effectiveHovered && (
                      <div className="flex items-center justify-center h-24 text-gray-400 text-sm">
                        No treatments in this category
                      </div>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-gray-100 px-4 py-2.5 bg-gray-50 flex items-center justify-between">
                  <Link
                    href="/treatments"
                    className="flex items-center gap-1.5 text-sm font-medium text-green-600 hover:text-green-700 transition-colors"
                  >
                    View all treatments
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                  <span className="text-xs text-gray-400">
                    {categoryGroups.length} categories
                  </span>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/hospitals"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-sm xl:text-base 2xl:text-[17px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent px-2 xl:px-3 2xl:px-4",
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
                  "bg-transparent text-sm xl:text-base 2xl:text-[17px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent px-2 xl:px-3 2xl:px-4",
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
                  "bg-transparent text-sm xl:text-base 2xl:text-[17px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent px-2 xl:px-3 2xl:px-4",
                )}
              >
                Testimonials
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          {/* Info Dropdown */}
        

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/contact"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-sm xl:text-base 2xl:text-[17px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent px-2 xl:px-3 2xl:px-4",
                )}
              >
                Contact Us
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
{/* 
      <Button
        variant="outline"
        size="lg"
        className="border-2 border-[#209F00] text-[#209F00] hover:bg-[#209F00] hover:text-white font-medium rounded-full px-11 py-6 text-lg "
      >
        <MessageCircleMore size={"40"}/>
        <span>Get a Query</span>
      </Button> */}
      {/* LANGUAGE BUTTON */}
      {/* <LanguageSelector /> */}
    </div>
  );
};
