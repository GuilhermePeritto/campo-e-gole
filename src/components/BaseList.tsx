
import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import PaginationControls from '@/components/PaginationControls';
import BaseListHeader from '@/components/BaseListHeader';
import BaseListSearchControls from '@/components/BaseListSearchControls';
import BaseListTable from '@/components/BaseListTable';
import BaseListGrid from '@/components/BaseListGrid';
import BaseListEmptyState from '@/components/BaseListEmptyState';
import { usePagination } from '@/hooks/usePagination';

export interface BaseListColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
}

export interface BaseListAction<T> {
  label: string;
  icon?: React.ReactNode;
  onClick: (item: T) => void;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
}

interface CreateButtonProps {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
}

interface BaseListProps<T> {
  data: T[];
  columns: BaseListColumn<T>[];
  actions?: BaseListAction<T>[];
  title: string;
  description?: string;
  searchPlaceholder?: string;
  searchFields?: (keyof T)[];
  getItemId: (item: T) => string | number;
  pageSize?: number;
  createButton?: CreateButtonProps;
  renderCard?: (item: T, actions: BaseListAction<T>[]) => React.ReactNode;
  className?: string;
  showExport?: boolean;
  exportFilename?: string;
}

const BaseList = <T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  title,
  description,
  searchPlaceholder = "Buscar...",
  searchFields = [],
  getItemId,
  pageSize = 10,
  createButton,
  renderCard,
  className,
  showExport = false,
  exportFilename,
}: BaseListProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  // Filter data based on search
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    
    return data.filter(item => {
      if (searchFields.length === 0) {
        // If no specific search fields, search in all string values
        return Object.values(item).some(value => 
          String(value).toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      
      return searchFields.some(field => {
        const value = item[field];
        return String(value).toLowerCase().includes(searchTerm.toLowerCase());
      });
    });
  }, [data, searchTerm, searchFields]);

  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    paginatedData,
    hasNextPage,
    hasPreviousPage,
    goToPage,
    setPageSize,
    pageSize: currentPageSize
  } = usePagination(filteredData, {
    pageSize,
    totalItems: filteredData.length
  });

  return (
    <div className={cn("w-full h-full flex flex-col", className)}>
      <BaseListHeader
        title={title}
        description={description}
        showExport={showExport}
        exportData={filteredData}
        exportFilename={exportFilename}
        createButton={createButton}
      />

      <BaseListSearchControls
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder={searchPlaceholder}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Main Content Area - completely flexible */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Content Area - adapts to parent height */}
        <div className="flex-1 overflow-hidden">
          {paginatedData.length === 0 ? (
            <BaseListEmptyState
              searchTerm={searchTerm}
              createButton={createButton}
            />
          ) : viewMode === 'table' ? (
            <BaseListTable
              data={paginatedData}
              columns={columns}
              actions={actions}
              getItemId={getItemId}
            />
          ) : (
            <BaseListGrid
              data={paginatedData}
              columns={columns}
              actions={actions}
              getItemId={getItemId}
              renderCard={renderCard}
            />
          )}
        </div>

        {/* Compact Pagination at Bottom */}
        {filteredData.length > 0 && (
          <div className="flex-shrink-0 mt-4 pt-3 border-t bg-background">
            <PaginationControls
              currentPage={currentPage}
              totalPages={totalPages}
              totalItems={filteredData.length}
              pageSize={currentPageSize}
              startIndex={startIndex}
              endIndex={endIndex}
              hasNextPage={hasNextPage}
              hasPreviousPage={hasPreviousPage}
              onPageChange={goToPage}
              onPageSizeChange={setPageSize}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseList;
