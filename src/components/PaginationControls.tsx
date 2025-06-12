
import React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  startIndex: number;
  endIndex: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  pageSizeOptions?: number[];
  showPageSizeSelector?: boolean;
  showInfo?: boolean;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  startIndex,
  endIndex,
  hasNextPage,
  hasPreviousPage,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 25, 50, 100, 200],
  showPageSizeSelector = true,
  showInfo = true,
}) => {
  // Generate page numbers to show
  const getVisiblePages = () => {
    if (totalPages <= 5) {
      // Show all pages if 5 or less
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, '...');
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  if (totalPages <= 1 && !showInfo) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-6 py-6">
      {/* Info and Page Size Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {showInfo && (
          <div className="text-xs sm:text-sm text-muted-foreground">
            {startIndex}-{endIndex} de {totalItems}
          </div>
        )}
        
        {showPageSizeSelector && (
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Por página:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger className="w-20 h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={size.toString()}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Pagination Navigation - Centralized */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center">
          <Pagination>
            <PaginationContent className="gap-1">
              {/* First page button - only show if more than 5 pages and not on first page */}
              {totalPages > 5 && currentPage > 1 && (
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(1)}
                    className="h-8 w-8 p-0"
                    title="Primeira página"
                  >
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              )}

              {/* Previous button */}
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => hasPreviousPage && onPageChange(currentPage - 1)}
                  className={cn(
                    "h-8 px-2 text-xs",
                    !hasPreviousPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                  )}
                />
              </PaginationItem>

              {/* Page numbers */}
              {getVisiblePages().map((page, index) => (
                <PaginationItem key={index}>
                  {page === '...' ? (
                    <PaginationEllipsis className="h-8 w-8" />
                  ) : (
                    <PaginationLink
                      onClick={() => onPageChange(page as number)}
                      isActive={currentPage === page}
                      className="cursor-pointer h-8 w-8 text-xs"
                    >
                      {page}
                    </PaginationLink>
                  )}
                </PaginationItem>
              ))}

              {/* Next button */}
              <PaginationItem>
                <PaginationNext
                  onClick={() => hasNextPage && onPageChange(currentPage + 1)}
                  className={cn(
                    "h-8 px-2 text-xs",
                    !hasNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                  )}
                />
              </PaginationItem>

              {/* Last page button - only show if more than 5 pages and not on last page */}
              {totalPages > 5 && currentPage < totalPages && (
                <PaginationItem>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(totalPages)}
                    className="h-8 w-8 p-0"
                    title="Última página"
                  >
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default PaginationControls;
