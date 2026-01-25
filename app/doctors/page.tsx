import { Suspense } from 'react';
import DoctorsContent from './components/DoctorsContent';

export default function DoctorsPage() {
<<<<<<< HEAD
=======
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<DoctorCategory>('All Doctors');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Set search query from URL on component mount
  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Filter doctors based on selected category and search query
  const filteredDoctors = useMemo(() => {
    let filtered = doctorsData;

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
        doctor.bio?.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

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

>>>>>>> 7fef644516cecb026fb8e2f0375a1ef87542a449
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#209f00] mb-4"></div>
          <p className="text-gray-600">Loading doctors...</p>
        </div>
      </div>
    }>
      <DoctorsContent />
    </Suspense>
  );
}