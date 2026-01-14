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
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { cn } from "@/lib/utils";
import { treatmentCategories } from "@/app/lib/treatments";
import { Plus } from "lucide-react";

export const MainNav = () => {
  return (
    <div className="hidden lg:flex items-center gap-15">
      
      {/* NAVIGATION MENU */}
      <NavigationMenu viewport={false}>
        <NavigationMenuList className="gap-8">
          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-md font-medium text-gray-900",
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
                  "bg-transparent text-md font-medium text-gray-900",
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
                  "bg-transparent text-md font-medium text-gray-900",
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
              <NavigationMenuTrigger className="bg-transparent text-md font-medium text-gray-900 hover:text-[#209F00] hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                Treatments
              </NavigationMenuTrigger>
            </Link>
            <NavigationMenuContent>
              <div className="w-[400px] p-4 bg-[#2D2D2D] text-gray-900 bg-transparent max-h-[500px] overflow-y-auto">
                {treatmentCategories.map((treatment) => (
                  <Link
                    key={treatment.id}
                    href={`/treatments/${treatment.id}`}
                    className="flex items-center justify-between py-3 px-4 hover:bg-emerald-500 transition-colors "
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
                  "bg-transparent text-md font-medium text-gray-900",
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
                  "bg-transparent text-md font-medium text-gray-900",
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
                  "bg-transparent text-md font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent"
                )}
              >
                Testimonials
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/info"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-md font-medium text-gray-900",
                  "hover:text-[#209F00] hover:bg-transparent",
                  "focus:bg-transparent"
                )}
              >
                Info
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/contact"
                className={cn(
                  navigationMenuTriggerStyle(),
                  "bg-transparent text-md font-medium text-gray-900",
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

      {/* LANGUAGE SWITCHER */}
      <LanguageSwitcher />

    </div>
  );
};
