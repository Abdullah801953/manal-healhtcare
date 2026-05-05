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
import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

const categories = [
  { id: "treatments", label: "Treatments", icon: Stethoscope },
  { id: "doctors",    label: "Doctors",    icon: UserRound  },
  { id: "hospitals",  label: "Hospitals",  icon: Building2  },
];

interface Suggestion {
  label: string;
  slug: string;
}

export const TopBar = () => {
  const router = useRouter();
  const [query, setQuery]             = useState("");
  const [category, setCategory]       = useState("treatments");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [allItems, setAllItems]       = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlighted, setHighlighted] = useState(-1);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Fetch all items whenever category changes
  useEffect(() => {
    setAllItems([]);
    setSuggestions([]);
    setQuery("");

    const fetchItems = async () => {
      try {
        if (category === "treatments") {
          const res  = await fetch("/api/treatments");
          const data = await res.json();
          const items = (data.data || data || []).map((t: any) => ({
            label: t.title,
            slug:  t.slug || t._id,
          }));
          setAllItems(items);
        } else if (category === "doctors") {
          const res  = await fetch("/api/doctors");
          const data = await res.json();
          const items = (data.data || []).map((d: any) => ({
            label: d.name,
            slug:  d.slug || d._id,
          }));
          setAllItems(items);
        } else if (category === "hospitals") {
          const res  = await fetch("/api/hospitals");
          const data = await res.json();
          const items = (data.data || data || []).map((h: any) => ({
            label: h.name,
            slug:  h.slug || h._id,
          }));
          setAllItems(items);
        }
      } catch {
        // silently ignore
      }
    };

    fetchItems();
  }, [category]);

  // Filter suggestions as user types
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = allItems
      .filter((item) => item.label?.toLowerCase().includes(q))
      .slice(0, 8);
    setSuggestions(filtered);
    setHighlighted(-1);
  }, [query, allItems]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setShowSuggestions(false);
    router.push(`/${category}?search=${encodeURIComponent(query)}`);
  };

  const handleSelect = useCallback((item: Suggestion) => {
    setQuery(item.label);
    setShowSuggestions(false);
    router.push(`/${category}/${item.slug}`);
  }, [category, router]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlighted((h) => Math.min(h + 1, suggestions.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlighted((h) => Math.max(h - 1, -1));
    } else if (e.key === "Enter" && highlighted >= 0) {
      e.preventDefault();
      handleSelect(suggestions[highlighted]);
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    }
  };

  const activeCategory = categories.find((c) => c.id === category)!;

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
        <div ref={wrapperRef} className="relative w-[600px]">
          <form
            onSubmit={handleSearch}
            className="flex items-center bg-white shadow-sm border border-gray-200
                       rounded-full overflow-hidden
                       transition-all duration-300
                       focus-within:shadow-lg focus-within:border-green-600"
          >
            {/* ── Category Select ── */}
            <div className="pl-2 shrink-0">
              <Select value={category} onValueChange={(val) => { setCategory(val); setShowSuggestions(false); }}>
                <SelectTrigger
                  className="
                    h-9 gap-1.5 pl-3 pr-2 rounded-full border-0 shadow-none
                    bg-green-50 text-green-700 font-medium text-sm
                    hover:bg-green-100 focus:ring-0 focus:ring-offset-0
                    transition-colors duration-200 w-[140px]
                  "
                >
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
              onChange={(e) => { setQuery(e.target.value); setShowSuggestions(true); }}
              onFocus={() => { if (query.trim()) setShowSuggestions(true); }}
              onKeyDown={handleKeyDown}
              className="border-0 shadow-none focus-visible:ring-0 focus-visible:outline-none h-11 text-sm"
              autoComplete="off"
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

          {/* ── Suggestions Dropdown ── */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-2xl shadow-xl z-50 overflow-hidden">
              {suggestions.map((item, i) => {
                const Icon = activeCategory.icon;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    onMouseDown={() => handleSelect(item)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors
                      ${i === highlighted ? "bg-green-50 text-green-700" : "hover:bg-gray-50 text-gray-700"}`}
                  >
                    <Icon className="w-4 h-4 text-green-500 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
