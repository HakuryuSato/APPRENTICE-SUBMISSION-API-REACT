import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <li
          className={`page-item ${page === currentPage ? 'active' : ''}`}
          key={page}
        >
          <button
            className="page-link"
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;
