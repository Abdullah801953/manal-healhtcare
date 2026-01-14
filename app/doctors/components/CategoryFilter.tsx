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
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-12">
      {/* Categories */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm font-medium text-white whitespace-nowrap">Doctors Category:</span>
        <div className="flex flex-wrap gap-2">
          {DOCTOR_CATEGORIES.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
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
      <div className="relative w-full sm:w-auto">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search Doctors..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full sm:w-64 pl-11 pr-4 py-2.5 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
      </div>
    </div>
  );
}
