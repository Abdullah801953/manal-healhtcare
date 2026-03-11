import { TreatmentCategory } from '../types';
import { Search, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

interface CategoryFilterProps {
  selectedCategory: TreatmentCategory;
  onCategoryChange: (category: TreatmentCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categories: string[];
  treatments?: Array<{ title: string; category: string }>;
}

export default function CategoryFilter({
  selectedCategory,
  onCategoryChange,
  searchQuery,
  onSearchChange,
  categories = [],
  treatments = [],
}: CategoryFilterProps) {
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  // Update dropdown position when input ref changes or suggestions change
  useEffect(() => {
    if (inputRef.current && filteredSuggestions.length > 0) {
      const rect = inputRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    }
  }, [filteredSuggestions.length]);

  // Get unique treatment titles and categories for suggestions
  const allSuggestions = Array.from(
    new Set([
      ...treatments.map(t => t.title),
      ...treatments.map(t => t.category),
    ])
  ).filter(item => item && item.trim() !== '');

  // Debug: Show if we have treatments
  const hasTreatments = treatments && treatments.length > 0;

  // Filter suggestions based on current search query
  const filteredSuggestions = searchQuery.trim()
    ? allSuggestions.filter(suggestion =>
        suggestion.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8) // Limit to 8 suggestions
    : [];

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    onSearchChange(value);
    setSelectedSuggestionIndex(-1);
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion: string) => {
    onSearchChange(suggestion);
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (filteredSuggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedSuggestionIndex(prev =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedSuggestionIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedSuggestionIndex >= 0) {
          handleSuggestionClick(filteredSuggestions[selectedSuggestionIndex]);
        }
        break;
      case 'Escape':
        setSelectedSuggestionIndex(-1);
        break;
    }
  };

  // Clear search
  const clearSearch = () => {
    onSearchChange('');
    setSelectedSuggestionIndex(-1);
    inputRef.current?.focus();
  };

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setSelectedSuggestionIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
            ref={inputRef}
            type="text"
            placeholder="Search treatments..."
            value={searchQuery}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {}}
            className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent transition-all text-sm"
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* Suggestions Dropdown */}
          {searchQuery.trim() && (
            <div
              ref={suggestionsRef}
              className="fixed bg-white border border-gray-200 rounded-lg shadow-lg z-[9999] max-h-64 overflow-y-auto"
              style={{
                top: dropdownPosition.top,
                left: dropdownPosition.left,
                width: dropdownPosition.width,
              }}
            >
              {filteredSuggestions.length > 0 ? (
                filteredSuggestions.map((suggestion, index) => (
                  <button
                    key={suggestion}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 transition-colors ${
                      index === selectedSuggestionIndex
                        ? 'bg-[#209f00] text-white hover:bg-[#209f00]'
                        : 'text-gray-700'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <Search className="w-3 h-3 opacity-50" />
                      <span>{suggestion}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No suggestions found ({treatments.length} treatments loaded)
                </div>
              )}
            </div>
          )}
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
