"use client";

import Link from "next/link";
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
import { Plus, Languages } from "lucide-react";
import { Button } from "@/components/ui/button";

export const MainNav = () => {
  return (
    <div className="hidden lg:flex items-center gap-15">
      
      {/* NAVIGATION MENU */}
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-8 ">
          <NavigationMenuItem >
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-[18px] font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent text-[18px]",
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
              <div className="w-[400px] p-4 bg-[#2D2D2D]  text-gray-900 bg-transparent max-h-[500px] overflow-y-auto">
                {treatmentCategories.map((treatment) => (
                  <Link
                    key={treatment.id}
                    href={`/treatments/${treatment.id}`}
                    className="flex items-center justify-between py-3 px-4 text-[18px] hover:bg-emerald-500 transition-colors "
                  >
                    <span className="text-sm font-medium tracking-wide">
                      {treatment.name}
                    </span>
                  </Link>
                ))}
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
              <div className="w-[320px] p-4 bg-[#2D2D2D] text-gray-900 bg-transparent max-h-[500px] overflow-y-auto">
                <Link
                  href="/info/plan-your-travel"
                  className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    Plan Your Travel
                  </span>
                </Link>
                <Link
                  href="/info/medical-tourism-india"
                  className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    Medical Tourism in India
                  </span>
                </Link>
                <Link
                  href="/info/advantages-medical-tourism"
                  className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    Advantages of Medical Tourism
                  </span>
                </Link>
                <Link
                  href="/info/halal-certification"
                  className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    Halal Certification
                  </span>
                </Link>
                <Link
                  href="/info/second-opinion"
                  className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    Second Opinion
                  </span>
                </Link>
                <Link
                  href="/info/faqs-for-patient"
                  className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    FAQs for Patient
                  </span>
                </Link>
                <Link
                  href="/info/medical-tourism"
                  className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    Medical Tourism
                  </span>
                </Link>
                <Link
                  href="/info/best-hospital"
                  className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    Best Hospital
                  </span>
                </Link>
                <Link
                  href="/info/privacy-policy"
                  className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    Privacy Policy
                  </span>
                </Link>
                <Link
                  href="/info/terms-conditions"
                  className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors"
                >
                  <span className="text-sm font-medium tracking-wide">
                    Terms & Conditions
                  </span>
                </Link>
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
      <Button
        variant="outline"
        className="gap-2 border-2 border-[#209F00] text-[#209F00] hover:bg-[#209F00] hover:text-white font-medium rounded-full px-8 py-3 text-lg"
      >
        <Languages className="w-6 h-6" />
        Language
      </Button>
    </div>
  );
};
