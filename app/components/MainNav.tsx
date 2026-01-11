"use client";

import Link from "next/link";
import { ArrowRight, Languages } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigationLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/blogs", label: "Our Blogs" },
  { href: "/treatments", label: "Treatments" },
  { href: "/hospitals", label: "Hospitals" },
  { href: "/doctors", label: "Doctors" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/info", label: "Info" },
  { href: "/contact", label: "Contact Us" },
];

export const MainNav = () => {
  return (
    <div className="hidden lg:flex items-center gap-15">
      
      {/* NAVIGATION MENU */}
      <NavigationMenu>
        <NavigationMenuList className="gap-8">
          {navigationLinks.map((link) => (
            <NavigationMenuItem key={link.href}>
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-md font-medium text-gray-900",
                    "hover:text-[#209F00] hover:bg-transparent",
                    "focus:bg-transparent"
                  )}
                >
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* LANGUAGE BUTTON */}
         <Button variant="outline" className="h-11 rounded-full border-2 border-green-600 px-5 text-sm font-medium flex items-center gap-3 hover:bg-green-50" >
        Language
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-green-100">
          <Languages className="h-4 w-4 text-green-700" /> {/* ✅ World icon */}
        </span>
      </Button>

    </div>
  );
};
