'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { FilterOptions } from '../types';
import HospitalCard from './HospitalCard';
import AdvancedFilters from './AdvancedFilters';
import HospitalHero from './HospitalHero';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 6;

export default function HospitalsContent() {
  const searchParams = useSearchParams();
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterOptions>({
    type: 'All Hospitals',
    emergency: null,
    parking: null,
    minBeds: 0,
    minRating: 0,
    city: '',
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch hospitals from API
  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/hospitals?status=active');
        const data = await response.json();
        
        if (data.success) {
          setHospitals(data.data);
        }
      } catch (error) {
        console.error('Error fetching hospitals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHospitals();
  }, []);

  // Set search query from URL on component mount
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Filter hospitals based on all criteria
  const filteredHospitals = useMemo(() => {
    let filtered = hospitals;

    // Filter by type
    if (filters.type !== 'All Hospitals') {
      filtered = filtered.filter((hospital) => hospital.type === filters.type);
    }

    // Filter by emergency
    if (filters.emergency !== null) {
      filtered = filtered.filter((hospital) => hospital.emergency === filters.emergency);
    }

    // Filter by parking
    if (filters.parking !== null) {
      filtered = filtered.filter((hospital) => hospital.parking === filters.parking);
    }

    // Filter by minimum beds
    if (filters.minBeds > 0) {
      filtered = filtered.filter((hospital) => hospital.beds >= filters.minBeds);
    }

    // Filter by minimum rating
    if (filters.minRating > 0) {
      filtered = filtered.filter((hospital) => hospital.rating >= filters.minRating);
    }

    // Filter by city
    if (filters.city) {
      filtered = filtered.filter((hospital) => hospital.city === filters.city);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (hospital) =>
          hospital.name.toLowerCase().includes(query) ||
          hospital.location.toLowerCase().includes(query) ||
          hospital.city.toLowerCase().includes(query) ||
          hospital.description.toLowerCase().includes(query) ||
          hospital.specialties.some((s) => s.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [filters, searchQuery]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [filters, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredHospitals.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentHospitals = filteredHospitals.slice(startIndex, endIndex);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#209f00] mb-4"></div>
          <p className="text-gray-600">Loading hospitals...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <HospitalHero />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-80 shrink-0">
              <div className="sticky top-4">
                <AdvancedFilters
                  filters={filters}
                  onFilterChange={setFilters}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                
                {/* Results Count */}
                <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-600">
                    Found <span className="font-semibold text-gray-900">{filteredHospitals.length}</span> hospital{filteredHospitals.length !== 1 ? 's' : ''}
                    {searchQuery && (
                      <span className="block mt-1"> matching &quot;<span className="font-semibold text-[#209f00]">{searchQuery}</span>&quot;</span>
                    )}
                  </p>
                </div>
              </div>
            </aside>

            {/* Hospital List */}
            <div className="flex-1">
              {currentHospitals.length > 0 ? (
                <>
                  <div className="space-y-6 mb-12">
                    {currentHospitals.map((hospital) => (
                      <HospitalCard key={hospital.id} hospital={hospital} />
                    ))}
                  </div>

                  {/* Pagination */}
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                  />
                </>
              ) : (
                <div className="text-center py-16">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                    <svg
                      className="w-8 h-8 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No hospitals found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or search query
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
