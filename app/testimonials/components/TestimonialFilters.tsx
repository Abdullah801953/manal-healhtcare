"use client";

import { useState } from 'react';
import { TestimonialFilters as Filters, testimonialCategories, countries } from '../types';
import { Search, Filter, X } from 'lucide-react';

interface TestimonialFiltersProps {
  filters: Filters;
  onFilterChange: (filters: Filters) => void;
}

export function TestimonialFilters({ filters, onFilterChange }: TestimonialFiltersProps) {
  const [showFilters, setShowFilters] = useState(false);

  const handleReset = () => {
    onFilterChange({
      category: 'All',
      rating: null,
      country: 'All Countries',
      search: '',
    });
  };

  const hasActiveFilters =
    filters.category !== 'All' ||
    filters.rating !== null ||
    filters.country !== 'All Countries' ||
    filters.search !== '';

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#209f00]" />
          <h3 className="text-lg font-bold text-gray-900">Filters</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-gray-600 hover:text-[#209f00] flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Reset
          </button>
        )}
      </div>

      {/* Search */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, treatment..."
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ ...filters, search: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Treatment Category
        </label>
        <div className="space-y-2">
          {testimonialCategories.map((category) => (
            <button
              key={category}
              onClick={() => onFilterChange({ ...filters, category })}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.category === category
                  ? 'bg-[#209f00] text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Minimum Rating
        </label>
        <div className="space-y-2">
          {[null, 5, 4.5, 4].map((rating) => (
            <button
              key={rating || 'all'}
              onClick={() => onFilterChange({ ...filters, rating })}
              className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.rating === rating
                  ? 'bg-[#209f00] text-white'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {rating ? `${rating}+ Stars` : 'All Ratings'}
            </button>
          ))}
        </div>
      </div>

      {/* Country Filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Patient Country
        </label>
        <select
          value={filters.country}
          onChange={(e) =>
            onFilterChange({ ...filters, country: e.target.value })
          }
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent"
        >
          {countries.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>

      {/* Mobile Toggle (for responsive design) */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden fixed bottom-4 right-4 z-50 bg-[#209f00] text-white p-4 rounded-full shadow-lg"
      >
        <Filter className="w-6 h-6" />
      </button>
    </div>
  );
}
