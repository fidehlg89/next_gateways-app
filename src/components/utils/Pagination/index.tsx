import { IPaginationProps } from "@/src/types";

export const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}: IPaginationProps) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      onPageChange(pageNumber);
    }
  };

  return (
    <nav className="flex items-center">
      {/* Previous page button */}
      <button
        className={`${
          currentPage === 1 ? "opacity-50 cursor-default" : "cursor-pointer"
        } px-2 py-1 text-sm text-gray-700`}
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      {/* Page buttons */}
      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index + 1}
          className={`${
            currentPage === index + 1
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          } px-2 py-1 text-sm rounded-full mr-1`}
          onClick={() => handlePageChange(index + 1)}
        >
          {index + 1}
        </button>
      ))}

      {/* Next page button */}
      <button
        className={`${
          currentPage === totalPages
            ? "opacity-50 cursor-default"
            : "cursor-pointer"
        } px-2 py-1 text-sm text-gray-700`}
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </button>
    </nav>
  );
};
