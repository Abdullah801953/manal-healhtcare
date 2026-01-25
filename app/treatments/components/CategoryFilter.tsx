import { TreatmentCategory } from '../types';
import { Search } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: TreatmentCategory;
  onCategoryChange: (category: TreatmentCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  categories,
}: CategoryFilterProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-1">Filter Treatments</h3>
        <p className="text-sm text-gray-600">Find the right treatment for you</p>
      </div>

      {/* Search Bar */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          Search
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      {/* Category List */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Categories
        </label>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => onCategoryChange(category)}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                selectedCategory === category
                  ? 'bg-[#209f00] text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
