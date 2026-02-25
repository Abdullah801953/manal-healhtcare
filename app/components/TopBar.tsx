"use client";

import { Search, Stethoscope, UserRound, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";

export const TopBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("treatments");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/${category}?search=${encodeURIComponent(query)}`);
  };

  const categories = [
    { id: "treatments", icon: Stethoscope },
    { id: "doctors", icon: UserRound },
    { id: "hospitals", icon: Building2 },
  ];

  return (
    <div className="hidden md:block bg-white border-b backdrop-blur-md">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">

{/* LEFT - Premium Brand Block */}
<div className="flex flex-col shrink-0">

  {/* Brand Name */}
  <span
    className="text-2xl xl:text-3xl 2xl:text-4xl font-bold tracking-tight text-green-600"
  >
    Manal Healthcare
  </span>

  {/* Elegant Underline */}
  <div className="relative ">
    <div className="h-[3px] w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-full" />
    
    {/* Subtle Glow Effect */}
    <div className="absolute inset-0 blur-sm opacity-30 
                    bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-full" />
  </div>

  {/* Tagline */}
  <span className="text-md xl:text-lg uppercase tracking-[0.25em] text-gray-500 font-medium">
    For Medical Travelers
  </span>

</div>

  {/* CENTER - Get Free Quote Button */}
  <div className="flex justify-center flex-1">
    <Link href="/contact">
    <button
      className="px-6 py-2 text-sm xl:text-base font-semibold
                 bg-gradient-to-r from-red-600 to-red-600
                 text-white rounded-full shadow-md
                 hover:from-red-700 hover:to-red-700
                 hover:scale-105
                 transition-all duration-300"
    >
      Get a FREE Quote
    </button>
    </Link>
  </div>

  {/* RIGHT - Search */}
  <form
    onSubmit={handleSearch}
    className="flex items-center bg-white shadow-sm border border-gray-200
               rounded-full overflow-hidden w-[600px]
               transition-all duration-300
               focus-within:shadow-lg focus-within:border-green-600"
  >
    <div className="flex items-center gap-2 pl-3">
      {categories.map((item) => {
        const Icon = item.icon;
        const active = category === item.id;

        return (
          <button
            type="button"
            key={item.id}
            onClick={() => setCategory(item.id)}
            className={`p-2 rounded-full transition-all duration-300 ${
              active
                ? "bg-green-600 text-white shadow-md"
                : "text-gray-500 hover:bg-gray-100"
            }`}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>

    <Input
      type="text"
      placeholder={`Search ${category}...`}
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="border-0 shadow-none focus-visible:ring-0 focus-visible:outline-none h-11 text-sm"
    />

    <button
      type="submit"
      className="bg-gradient-to-r from-green-600 to-green-700
                 hover:from-green-700 hover:to-green-800
                 text-white px-6 h-11 flex items-center transition-all duration-300"
    >
      <Search className="w-4 h-4" />
    </button>
  </form>

</div>
    </div>
  );
};