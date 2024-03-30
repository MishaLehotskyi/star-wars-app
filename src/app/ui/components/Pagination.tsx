'use client'
import getPages from "@/app/lib/utils/getPages";
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import clsx from 'clsx';

export default function Pagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pages = getPages(totalPages);
  const currentPage = +(searchParams.get('page') || 1);
  const pathname = usePathname();
  const { replace } = useRouter();

  function handlePageChange(num: number) {
    const params = new URLSearchParams(searchParams);

    if (num) {
      params.set('page', num.toString());
    } else {
      params.delete('page');
    }

    replace(`${pathname}?${params.toString()}`);
  }

  function handlePrevClick() {
    if (currentPage > 1) {
      handlePageChange(currentPage - 1);
    }
  }

  function handleNextClick() {
    if (currentPage <= totalPages) {
      handlePageChange(currentPage + 1);
    }
  }

  return (
    <div className="flex justify-center items-center mt-auto mb-6">
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === 1}
        onClick={handlePrevClick}
      >
        Prev
      </button>
        {pages.map(num => (
          <button
            key={num}
            onClick={() => {
              handlePageChange(num);
            }}
            className={
              clsx('bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2',
              {
                'bg-blue-800': currentPage === num,
              },
            )}
          >
            {num}
          </button>)
        )}
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-2 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={currentPage === totalPages}
        onClick={handleNextClick}
      >
        Next
      </button>
    </div>
  );
};
