import { HospitalType, HOSPITAL_TYPES, FilterOptions } from '../types';
import { Search, Filter, Star, Bed, MapPin } from 'lucide-react';
import { cities } from '../data';

interface AdvancedFiltersProps {
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function AdvancedFilters({
  filters,
  onFilterChange,
  searchQuery,
  onSearchChange,
}: AdvancedFiltersProps) {
  const handleTypeChange = (type: HospitalType) => {
    onFilterChange({ ...filters, type });
  };

  const handleEmergencyToggle = () => {
    onFilterChange({ 
      ...filters, 
      emergency: filters.emergency === null ? true : filters.emergency ? false : null 
    });
  };

  const handleParkingToggle = () => {
    onFilterChange({ 
      ...filters, 
      parking: filters.parking === null ? true : filters.parking ? false : null 
    });
  };

  const handleMinBedsChange = (beds: number) => {
    onFilterChange({ ...filters, minBeds: beds });
  };

  const handleMinRatingChange = (rating: number) => {
    onFilterChange({ ...filters, minRating: rating });
  };

  const handleCityChange = (city: string) => {
    onFilterChange({ ...filters, city });
  };

  const resetFilters = () => {
    onFilterChange({
      type: 'All Hospitals',
      emergency: null,
      parking: null,
      minBeds: 0,
      minRating: 0,
      city: '',
    });
    onSearchChange('');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-[#209f00]" />
          <h3 className="text-lg font-bold text-gray-900">Advanced Filters</h3>
        </div>
        <button
          onClick={resetFilters}
          className="text-sm text-[#209f00] hover:text-[#1a8000] font-medium"
        >
          Reset All
        </button>
      </div>

      {/* Search Bar */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 block">
          Search Hospitals
        </label>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name or specialty..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent transition-all text-sm"
          />
        </div>
      </div>

      {/* Hospital Type */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Hospital Type
        </label>
        <div className="space-y-2">
          {HOSPITAL_TYPES.map((type) => (
            <button
              key={type}
              onClick={() => handleTypeChange(type)}
              className={`w-full text-left px-4 py-2.5 rounded-lg font-medium transition-all duration-300 text-sm ${
                filters.type === type
                  ? 'bg-[#209f00] text-white shadow-md'
                  : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* City Filter */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-[#209f00]" />
          City/Location
        </label>
        <select
          value={filters.city}
          onChange={(e) => handleCityChange(e.target.value)}
          className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#209f00] focus:border-transparent transition-all text-sm bg-white"
        >
          <option value="">All Cities</option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Minimum Rating */}
    

    

      {/* Amenities */}
      <div>
        <label className="text-sm font-semibold text-gray-700 mb-3 block">
          Amenities
        </label>
        <div className="space-y-2">
          <button
            onClick={handleEmergencyToggle}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm flex items-center justify-between ${
              filters.emergency === true
                ? 'bg-[#209f00] text-white'
                : filters.emergency === false
                ? 'bg-red-50 text-red-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>24/7 Emergency</span>
            <span className="text-xs">
              {filters.emergency === null ? 'Any' : filters.emergency ? '✓' : '✗'}
            </span>
          </button>
          <button
            onClick={handleParkingToggle}
            className={`w-full text-left px-4 py-2.5 rounded-lg transition-all text-sm flex items-center justify-between ${
              filters.parking === true
                ? 'bg-[#209f00] text-white'
                : filters.parking === false
                ? 'bg-red-50 text-red-700'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
            }`}
          >
            <span>Parking Available</span>
            <span className="text-xs">
              {filters.parking === null ? 'Any' : filters.parking ? '✓' : '✗'}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
