'use client';

import { DoctorCategory, DOCTOR_CATEGORIES } from '../types';
import { Search } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: DoctorCategory;
  onCategoryChange: (category: DoctorCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export function CategoryFilter({ 
  selectedCategory, 
  onCategoryChange,
  searchQuery,
  onSearchChange 
}: CategoryFilterProps) {

  return (
    <div className="flex flex-col gap-4 mb-12">
      {/* Categories - scroll on mobile, wrap on desktop */}
      <div className="flex items-start gap-3">
        <span className="hidden md:block text-sm font-medium text-white whitespace-nowrap shrink-0 mt-2">Category:</span>
        <div className="flex gap-2 overflow-x-auto md:overflow-x-visible md:flex-wrap scrollbar-hide pb-1 md:pb-0">
          {DOCTOR_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${
                selectedCategory === category
                  ? 'bg-[#209F00] text-white shadow-md'
                  : 'bg-white hover:text-white border border-gray-200 hover:border-[#209F00] hover:bg-[#209F00]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search Doctors..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
