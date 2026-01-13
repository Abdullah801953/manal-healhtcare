"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
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
              <NavigationMenuLink asChild>
                <Link
                  href={link.href}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-md font-medium text-gray-900",
                    "hover:text-[#209F00] hover:bg-transparent",
                    "focus:bg-transparent"
                  )}
                >
                  {link.label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* LANGUAGE SWITCHER */}
      <LanguageSwitcher />

    </div>
  );
};
