
import { useCallback, useMemo, useState } from 'react';

interface PaginationOptions {
  initialPage?: number;
  pageSize?: number;
  totalItems: number;
  simulateApiDelay?: boolean;
}

interface PaginationResult<T> {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startIndex: number;
  endIndex: number;
  paginatedData: T[];
  goToPage: (page: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  setPageSize: (size: number) => void;
  // Novos métodos para simular API
  getPageInfo: () => { page: number; limit: number; start: number };
  isLoading: boolean;
}

export function usePagination<T>(
  data: T[],
  options: PaginationOptions
): PaginationResult<T> {
  const { 
    initialPage = 1, 
    pageSize: initialPageSize = 10, 
    totalItems,
    simulateApiDelay = true
  } = options;
  
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [pageSize, setPageSizeState] = useState(initialPageSize);
  const [isLoading, setIsLoading] = useState(false);

  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const paginatedData = useMemo(() => {
    if (simulateApiDelay) {
      // Simula delay de API
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 300);
    }
    
    // Simula paginação de API com page, limit, start
    const start = startIndex;
    const limit = pageSize;
    const page = currentPage;
    
    console.log(`📄 Paginação: page=${page}, limit=${limit}, start=${start}`);
    
    return data.slice(start, start + limit);
  }, [data, startIndex, pageSize, currentPage, simulateApiDelay]);

  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  }, [totalPages]);

  const nextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }, [currentPage, totalPages]);

  const previousPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }, [currentPage]);

  const setPageSize = useCallback((size: number) => {
    setPageSizeState(size);
    setCurrentPage(1); // Reset to first page when changing page size
  }, []);

  const getPageInfo = useCallback(() => {
    return {
      page: currentPage,
      limit: pageSize,
      start: startIndex
    };
  }, [currentPage, pageSize, startIndex]);

  return {
    currentPage,
    pageSize,
    totalPages,
    totalItems,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
    startIndex: startIndex + 1, // 1-based index for display
    endIndex,
    paginatedData,
    goToPage,
    nextPage,
    previousPage,
    setPageSize,
    getPageInfo,
    isLoading,
  };
}
