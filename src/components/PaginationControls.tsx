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
import { cn } from '@/lib/utils';

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
  pageSizeOptions = [5, 10, 20, 50],
  showPageSizeSelector = true,
  showInfo = true,
}) => {
  // Generate page numbers to show (more compact)
  const getVisiblePages = () => {
    const delta = 1; // Reduced from 2 to 1 for more compact display
    const range = [];
    
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      range.unshift('...');
    }
    if (currentPage + delta < totalPages - 1) {
      range.push('...');
    }

    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }

    return range;
  };

  if (totalPages <= 1 && !showInfo) return null;

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between gap-3 py-2">
      {showInfo && (
        <div className="text-xs sm:text-sm text-muted-foreground order-2 lg:order-1">
          {startIndex}-{endIndex} de {totalItems}
        </div>
      )}
      
      <div className="flex items-center gap-3 order-1 lg:order-2">
        {showPageSizeSelector && (
          <div className="flex items-center gap-2">
            <span className="text-xs sm:text-sm text-muted-foreground whitespace-nowrap">Por página:</span>
            <Select
              value={pageSize.toString()}
              onValueChange={(value) => onPageSizeChange(Number(value))}
            >
              <SelectTrigger className="w-16 h-8 text-xs">
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

        {totalPages > 1 && (
          <Pagination>
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => hasPreviousPage && onPageChange(currentPage - 1)}
                  className={cn(
                    "h-8 px-2 text-xs",
                    !hasPreviousPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                  )}
                />
              </PaginationItem>

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

              <PaginationItem>
                <PaginationNext
                  onClick={() => hasNextPage && onPageChange(currentPage + 1)}
                  className={cn(
                    "h-8 px-2 text-xs",
                    !hasNextPage ? 'pointer-events-none opacity-50' : 'cursor-pointer'
                  )}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
};

export default PaginationControls;
