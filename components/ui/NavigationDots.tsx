interface NavigationDotsProps {
  totalPages: number;
  currentPage: number;
  onPageClick: (pageIndex: number) => void;
  className?: string;
}

export const NavigationDots = ({
  totalPages,
  currentPage,
  onPageClick,
  className = "",
}: NavigationDotsProps) => {
  return (
    <div className={`flex justify-center gap-2 ${className}`}>
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          onClick={() => onPageClick(i)}
          className={`w-2 h-2 rounded-full transition-all ${
            currentPage === i 
              ? "bg-green-600 w-4" 
              : "bg-gray-300"
          }`}
          aria-label={`Go to page ${i + 1}`}
        />
      ))}
    </div>
  );
};