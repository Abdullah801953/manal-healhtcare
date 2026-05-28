"use client";

import { Search, Stethoscope, UserRound, Building2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

const categories = [
  { id: "treatments", label: "Treatments", icon: Stethoscope },
  { id: "doctors",    label: "Doctors",    icon: UserRound  },
  { id: "hospitals",  label: "Hospitals",  icon: Building2  },
];

export const TopBar = () => {
  const router = useRouter();
  const [query, setQuery]       = useState("");
  const [category, setCategory] = useState("treatments");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    router.push(`/${category}?search=${encodeURIComponent(query)}`);
  };

  const activeCategory = categories.find((c) => c.id === category)!;
  const ActiveIcon = activeCategory.icon;

  return (
    <div className="hidden md:block bg-white border-b backdrop-blur-md">
      <div className="container mx-auto px-6 py-3 flex items-center justify-between">

        {/* LEFT – Brand */}
        <div className="flex flex-col shrink-0">
          <span className="text-2xl xl:text-3xl 2xl:text-4xl font-bold tracking-tight text-green-600">
            Manal Healthcare
          </span>

          <div className="relative">
            <div className="h-[3px] w-full bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-full" />
            <div className="absolute inset-0 blur-sm opacity-30 bg-gradient-to-r from-green-600 via-emerald-500 to-green-600 rounded-full" />
          </div>

          <span className="text-md xl:text-lg uppercase tracking-[0.25em] text-gray-500 font-medium">
            For Medical care
          </span>
        </div>

        {/* CENTER – CTA */}
        <div className="flex justify-center flex-1">
          <Link href="/contact">
            <button
              className="px-6 py-2 text-sm xl:text-base font-semibold
                         bg-gradient-to-r from-red-900 to-red-600
                         text-white rounded-full shadow-md
                         hover:from-red-700 hover:to-red-700
                         hover:scale-105 transition-all duration-300"
            >
              Get a FREE Quote
            </button>
          </Link>
        </div>

        {/* RIGHT – Search */}
        <form
          onSubmit={handleSearch}
          className="flex items-center bg-white shadow-sm border border-gray-200
                     rounded-full overflow-hidden w-[600px]
                     transition-all duration-300
                     focus-within:shadow-lg focus-within:border-green-600"
        >
          {/* ── Shadcn Select dropdown ── */}
          <div className="pl-2 shrink-0">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger
                className="
                  h-9 gap-1.5 pl-3 pr-2 rounded-full border-0 shadow-none
                  bg-green-50 text-green-700 font-medium text-sm
                  hover:bg-green-100 focus:ring-0 focus:ring-offset-0
                  transition-colors duration-200 w-[140px]
                "
              >
                {/* show the icon of the active category inline */}
               
                <SelectValue />
              </SelectTrigger>

              <SelectContent className="rounded-xl shadow-lg border-gray-100">
                {categories.map(({ id, label, icon: Icon }) => (
                  <SelectItem
                    key={id}
                    value={id}
                    className="cursor-pointer rounded-lg text-sm font-medium gap-2"
                  >
                    <span className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-green-600" />
                      {label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* thin divider */}
          <div className="w-px h-6 bg-gray-200 mx-1 shrink-0" />

          <Input
            type="text"
            placeholder={`Search ${activeCategory.label.toLowerCase()}...`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border-0 shadow-none focus-visible:ring-0 focus-visible:outline-none h-11 text-sm"
          />

          <button
            type="submit"
            className="bg-gradient-to-r from-green-600 to-green-700
                       hover:from-green-700 hover:to-green-800
                       text-white px-6 h-11 flex items-center transition-all duration-300 shrink-0"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

      </div>
    </div>
  );
};