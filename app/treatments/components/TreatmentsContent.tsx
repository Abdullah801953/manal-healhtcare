'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { TreatmentCategory } from '../types';
import TreatmentCard from './TreatmentCard';
import CategoryFilter from './CategoryFilter';
import TreatmentHero from './TreatmentHero';
import Pagination from './Pagination';

const ITEMS_PER_PAGE = 9;

interface Treatment {
  _id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  shortDescription: string;
  overview: string;
  image?: string;
  duration?: string;
  price?: string;
  featured: boolean;
  benefits: string[];
  procedures: string[];
  status: string;
}

export default function TreatmentsContent() {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<TreatmentCategory>('All Treatments');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [treatments, setTreatments] = useState<Treatment[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch treatments from API
  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/treatments');
        const data = await response.json();
        
        if (data.success) {
          // Filter only active treatments for public view
          const activeTreatments = data.data.filter((t: Treatment) => t.status === 'active');
          setTreatments(activeTreatments);
        }
      } catch (error) {
        console.error('Error fetching treatments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTreatments();
  }, []);

  // Set search query from URL on component mount
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Get unique categories from treatments data
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(
      new Set(treatments.map((treatment) => treatment.category))
    ).sort();
    return ['All Treatments', ...uniqueCategories];
  }, [treatments]);

  // Filter treatments based on category and search
  const filteredTreatments = useMemo(() => {
    let filtered = treatments;

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
  }, [treatments, selectedCategory, searchQuery]);

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
        <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-10">
          {loading ? (
            <div className="flex items-center justify-center py-16">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#209f00] mb-4"></div>
                <p className="text-gray-600">Loading treatments...</p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar Filters */}
              <aside className="lg:w-80 shrink-0">
                <div className="sticky top-4">
                  <CategoryFilter
                    selectedCategory={selectedCategory}
                    onCategoryChange={setSelectedCategory}
                    searchQuery={searchQuery}
                    onSearchChange={setSearchQuery}
                    categories={categories}
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
                      <TreatmentCard 
                        key={treatment._id} 
                        treatment={{
                          ...treatment,
                          id: treatment._id,
                          image: treatment.image || '/default-treatment.jpg'
                        }} 
                      />
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
          )}
        </div>
      </section>
    </div>
  );
}
