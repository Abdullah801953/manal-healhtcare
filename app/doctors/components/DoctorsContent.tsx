'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { HeroBanner } from './HeroBanner';
import { CategoryFilter } from './CategoryFilter';
import { DoctorCard } from './DoctorCard';
import { Pagination } from './Pagination';
import { Doctor, DoctorCategory } from '../types';

const ITEMS_PER_PAGE = 9;

export default function DoctorsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<DoctorCategory>('All Doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch doctors from API
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/doctors');
        const result = await response.json();
        
        if (result.success) {
          setDoctors(result.data);
          setError(null);
        } else {
          setError(result.message || 'Failed to fetch doctors');
        }
      } catch (err) {
        console.error('Error fetching doctors:', err);
        setError('Failed to load doctors. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  // Set search query from URL on component mount
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Filter doctors based on selected category and search query
  const filteredDoctors = useMemo(() => {
    let filtered = doctors;

    // Filter by category
    if (selectedCategory !== 'All Doctors') {
      filtered = filtered.filter((doctor) => doctor.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((doctor) => 
        doctor.name.toLowerCase().includes(query) ||
        doctor.specialty?.toLowerCase().includes(query) ||
        doctor.bio?.toLowerCase().includes(query) ||
        doctor.specialization?.some(s => s.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery, doctors]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredDoctors.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentDoctors = filteredDoctors.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  const handleCategoryChange = (category: DoctorCategory) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Container */}
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Hero Banner */}
        <HeroBanner />

        {/* Main Content Section */}
        <div className="p-8 md:p-12">
          {/* Section Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Your Trusted Medical Team
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              esteemed specialists delivering personalized advanced healthcare for every patient
            </p>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
          />

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#209f00] mb-4"></div>
                <p className="text-gray-600">Loading doctors...</p>
              </div>
            </div>
          )}

          {/* Error State */}
          {error && !loading && (
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
                <p className="text-red-600 mb-4">{error}</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Retry
                </button>
              </div>
            </div>
          )}

          {/* Doctors Grid */}
          {!loading && !error && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {currentDoctors.map((doctor) => (
                  <DoctorCard key={doctor._id || doctor.id} doctor={doctor} />
                ))}
              </div>

              {/* Pagination */}
              {filteredDoctors.length > 0 && (
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                />
              )}

              {/* No Results Message */}
              {filteredDoctors.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">
                    No doctors found matching your criteria.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
