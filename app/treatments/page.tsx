'use client';

import { useState, useMemo } from 'react';
import { treatmentsData } from './data';
import { TreatmentCategory } from './types';
import TreatmentCard from './components/TreatmentCard';
import CategoryFilter from './components/CategoryFilter';
import TreatmentHero from './components/TreatmentHero';
import Pagination from './components/Pagination';

const ITEMS_PER_PAGE = 9;

export default function TreatmentsPage() {
  const [selectedCategory, setSelectedCategory] = useState<TreatmentCategory>('All Treatments');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Filter treatments based on category and search
  const filteredTreatments = useMemo(() => {
    let filtered = treatmentsData;

    // Filter by category
    if (selectedCategory !== 'All Treatments') {
      filtered = filtered.filter(
        (treatment) => treatment.category === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (treatment) =>
          treatment.title.toLowerCase().includes(query) ||
          treatment.category.toLowerCase().includes(query) ||
          treatment.description.toLowerCase().includes(query) ||
          treatment.shortDescription.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  // Reset to page 1 when filters change
  useMemo(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredTreatments.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTreatments = filteredTreatments.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <TreatmentHero />

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Filters */}
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-4">
                <CategoryFilter
                  selectedCategory={selectedCategory}
                  onCategoryChange={setSelectedCategory}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                />
                
                {/* Results Count */}
                <div className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100">
                  <p className="text-sm text-gray-600">
                    Showing <span className="font-semibold text-gray-900">{filteredTreatments.length}</span> treatment{filteredTreatments.length !== 1 ? 's' : ''}
                    {searchQuery && (
                      <span className="block mt-1"> for &quot;<span className="font-semibold text-[#209f00]">{searchQuery}</span>&quot;</span>
                    )}
                  </p>
                </div>
              </div>
            </aside>

            {/* Treatment List */}
            <div className="flex-1">
              {currentTreatments.length > 0 ? (
                <>
                  <div className="space-y-6 mb-12">
                    {currentTreatments.map((treatment) => (
                      <TreatmentCard key={treatment.id} treatment={treatment} />
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
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No treatments found
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
