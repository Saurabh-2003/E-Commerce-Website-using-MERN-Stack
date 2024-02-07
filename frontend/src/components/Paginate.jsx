import React from 'react';

const Paginate = ({ currentPage, setCurrentPage, total, count, maxPagesToShow = 5 }) => {
  const totalPages = Math.ceil(total / count);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const getPageNumbersToShow = () => {
    const minPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    const maxPage = Math.min(minPage + maxPagesToShow - 1, totalPages);

    return Array.from({ length: maxPage - minPage + 1 }, (_, index) => minPage + index);
  };

  const renderPageNumbers = () => {
    const pagesToShow = getPageNumbersToShow();

    return pagesToShow.map((page) => (
      <li
        key={page}
        onClick={() => setCurrentPage(page)}
        className={`w-7 dark:text-slate-200 text-center rounded-sm cursor-pointer ${
          currentPage === page ? 'bg-violet-500 text-white' : ''
        }`}
      >
        {page}
      </li>
    ));
  };

  return (
    <div className='w-full'>
      <ul className='flex gap-3 items-center justify-center'>
        <li
          onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
          className='cursor-pointer w-20 dark:text-slate-200 text-center hover:bg-violet-600 hover:text-white py-1 px-2 rounded-full'
        >
          Previous
        </li>

        {renderPageNumbers()}

        <li
          onClick={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages))}
          className='cursor-pointer dark:text-slate-200 w-20 text-center hover:bg-violet-600 hover:text-white py-1 px-2 rounded-full'
        >
          Next
        </li>
      </ul>
    </div>
  );
};

export default Paginate;
