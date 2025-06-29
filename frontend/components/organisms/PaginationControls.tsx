'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useApartmentContext } from '@/contexts/ApartmentContext';

interface PaginationControlsProps {
  total: number;
  page: number;
  limit: number;
}

export function PaginationControls({ total, page, limit }: PaginationControlsProps) {
  const { dispatch } = useApartmentContext();
  
  const totalPages = Math.ceil(total / limit);
  const startItem = (page - 1) * limit + 1;
  const endItem = Math.min(page * limit, total);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      dispatch({ type: 'SET_PAGE', payload: newPage });
      // Scroll to top of results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const generatePageNumbers = () => {
    const maxVisiblePages = 5;
    
    // Calculate which group of 5 pages we're in
    const currentGroup = Math.ceil(page / maxVisiblePages);
    const startPage = (currentGroup - 1) * maxVisiblePages + 1;
    const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages);
    
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return {
      pages,
      hasNextGroup: endPage < totalPages,
      hasPrevGroup: startPage > 1,
      nextGroupStart: endPage + 1,
      prevGroupEnd: startPage - 1
    };
  };

  const goToNextGroup = () => {
    const { nextGroupStart } = generatePageNumbers();
    handlePageChange(nextGroupStart);
  };

  const goToPrevGroup = () => {
    const { prevGroupEnd } = generatePageNumbers();
    handlePageChange(prevGroupEnd);
  };

  // Don't show pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }

  const { pages, hasNextGroup, hasPrevGroup } = generatePageNumbers();

  return (
    <div className="bg-white/80 backdrop-blur-sm border border-stone-200/50 rounded-3xl shadow-xl p-10">
      <div className="space-y-8">
        {/* Results Summary */}
        <div className="text-center">
          <div className="text-2xl font-light text-stone-800 mb-3">
            Showing {startItem}-{endItem} of {total} apartments
          </div>
          <div className="text-sm text-stone-500 font-medium">
            Page {page} of {totalPages}
          </div>
        </div>

        {/* Main Pagination */}
        <div className="flex justify-center">
          <Pagination>
            <PaginationContent className="gap-3">
              {/* First Page Button */}
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(1)}
                  disabled={page === 1}
                  className="px-4 py-3 h-12 border-stone-200 rounded-xl hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Go to first page"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
              </PaginationItem>

              {/* Previous Group Button */}
              {hasPrevGroup && (
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToPrevGroup}
                    className="px-4 py-3 h-12 border-stone-200 rounded-xl hover:bg-stone-50 text-stone-600"
                    title="Previous 5 pages"
                  >
                    <ChevronLeft className="h-4 w-4 mr-1" />
                    Prev 5
                  </Button>
                </PaginationItem>
              )}

              {/* Previous Page */}
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => handlePageChange(page - 1)}
                  className={`${
                    page === 1 
                      ? 'pointer-events-none opacity-50' 
                      : 'cursor-pointer hover:bg-stone-50 hover:text-stone-700 transition-colors'
                  } px-5 py-3 h-12 border-stone-200 rounded-xl`}
                />
              </PaginationItem>
              
              {/* Page Numbers (Max 5) */}
              {pages.map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => handlePageChange(pageNum)}
                    isActive={pageNum === page}
                    className={`cursor-pointer transition-all duration-300 px-5 py-3 h-12 min-w-[48px] border rounded-xl font-medium ${
                      pageNum === page
                        ? 'bg-gradient-to-r from-stone-700 to-stone-800 text-white border-stone-700 shadow-lg hover:shadow-xl'
                        : 'border-stone-200 hover:bg-stone-50 hover:text-stone-700 hover:border-stone-300 text-stone-600'
                    }`}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              {/* Next Page */}
              <PaginationItem>
                <PaginationNext 
                  onClick={() => handlePageChange(page + 1)}
                  className={`${
                    page === totalPages 
                      ? 'pointer-events-none opacity-50' 
                      : 'cursor-pointer hover:bg-stone-50 hover:text-stone-700 transition-colors'
                  } px-5 py-3 h-12 border-stone-200 rounded-xl`}
                />
              </PaginationItem>

              {/* Next Group Button */}
              {hasNextGroup && (
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={goToNextGroup}
                    className="px-4 py-3 h-12 border-stone-200 rounded-xl hover:bg-stone-50 text-stone-600"
                    title="Next 5 pages"
                  >
                    Next 5
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </PaginationItem>
              )}

              {/* Last Page Button */}
              <PaginationItem>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handlePageChange(totalPages)}
                  disabled={page === totalPages}
                  className="px-4 py-3 h-12 border-stone-200 rounded-xl hover:bg-stone-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  title="Go to last page"
                >
                  <ChevronsRight className="h-4 w-4" />
                </Button>
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        {/* Page Group Info */}
        {totalPages > 5 && (
          <div className="text-center text-sm text-stone-500">
            Showing pages {pages[0]} - {pages[pages.length - 1]} of {totalPages} total pages
          </div>
        )}

        {/* Quick Navigation for Large Page Counts */}
        {totalPages > 10 && (
          <div className="flex justify-center items-center gap-6 pt-8 border-t border-stone-200">
            <span className="text-sm text-stone-600 font-medium">Quick jump:</span>
            <div className="flex gap-3">
              <button
                onClick={() => handlePageChange(1)}
                className={`px-6 py-3 text-sm rounded-xl transition-all duration-300 border font-medium ${
                  page === 1
                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed border-stone-200'
                    : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-800 border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md'
                }`}
                disabled={page === 1}
              >
                First
              </button>
              <button
                onClick={() => handlePageChange(Math.ceil(totalPages / 2))}
                className={`px-6 py-3 text-sm rounded-xl transition-all duration-300 border font-medium ${
                  page === Math.ceil(totalPages / 2)
                    ? 'bg-gradient-to-r from-stone-700 to-stone-800 text-white border-stone-700 shadow-lg'
                    : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-800 border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md'
                }`}
              >
                Middle
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-6 py-3 text-sm rounded-xl transition-all duration-300 border font-medium ${
                  page === totalPages
                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed border-stone-200'
                    : 'bg-white text-stone-700 hover:bg-stone-50 hover:text-stone-800 border-stone-200 hover:border-stone-300 shadow-sm hover:shadow-md'
                }`}
                disabled={page === totalPages}
              >
                Last
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}