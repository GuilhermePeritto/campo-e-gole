import React, { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import PaginationControls from '@/components/PaginationControls';
import BaseListHeader from '@/components/BaseListHeader';
import BaseListSearchControls, { AdvancedFilter } from '@/components/BaseListSearchControls';
import BaseListTableAdvanced from '@/components/BaseListTableAdvanced';
import BaseListGrid from '@/components/BaseListGrid';
import BaseListEmptyState from '@/components/BaseListEmptyState';
import { usePagination } from '@/hooks/usePagination';
import { VisibilityState } from '@tanstack/react-table';

export interface BaseListColumn<T> {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
  className?: string;
  filterable?: boolean;
  filterType?: 'text' | 'select' | 'multiselect';
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
  loading?: boolean;
  entityName?: string;
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
  loading = false,
  entityName,
}: BaseListProps<T>) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [advancedFilters, setAdvancedFilters] = useState<Record<string, string[]>>({});

  // Generate advanced filters based on filterable columns
  const availableAdvancedFilters = useMemo((): AdvancedFilter[] => {
    return columns
      .filter(col => col.filterable && col.filterType === 'select')
      .map(col => {
        const uniqueValues = Array.from(new Set(
          data.map(item => {
            const value = item[col.key as keyof T];
            return value ? String(value) : '';
          }).filter(Boolean)
        ));

        const valueCounts = uniqueValues.reduce((acc, value) => {
          acc[value] = data.filter(item => String(item[col.key as keyof T]) === value).length;
          return acc;
        }, {} as Record<string, number>);

        return {
          id: String(col.key),
          label: col.label,
          type: 'select' as const,
          options: uniqueValues.map(value => ({
            value,
            label: value,
            count: valueCounts[value]
          })),
          value: advancedFilters[String(col.key)] || []
        };
      });
  }, [columns, data, advancedFilters]);

  // Filter data based on search and advanced filters
  const filteredData = useMemo(() => {
    let filtered = data;

    // Apply search filter
    if (searchTerm.trim()) {
      filtered = filtered.filter(item => {
        if (searchFields.length === 0) {
          return Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );
        }
        
        return searchFields.some(field => {
          const value = item[field];
          return String(value).toLowerCase().includes(searchTerm.toLowerCase());
        });
      });
    }

    // Apply advanced filters
    Object.entries(advancedFilters).forEach(([fieldKey, selectedValues]) => {
      if (selectedValues.length > 0) {
        filtered = filtered.filter(item => {
          const itemValue = String(item[fieldKey as keyof T] || '');
          return selectedValues.includes(itemValue);
        });
      }
    });

    return filtered;
  }, [data, searchTerm, searchFields, advancedFilters]);

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

  // Prepare columns for visibility control
  const columnsForVisibility = useMemo(() => {
    const baseColumns = columns.map(col => ({
      id: String(col.key),
      label: col.label,
      canHide: true,
      isVisible: columnVisibility[String(col.key)] !== false
    }));

    if (actions.length > 0) {
      baseColumns.push({
        id: 'actions',
        label: 'Ações',
        canHide: false,
        isVisible: true
      });
    }

    return baseColumns;
  }, [columns, actions, columnVisibility]);

  const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnId]: visible
    }));
  };

  const handleAdvancedFilterChange = (filterId: string, values: string[]) => {
    setAdvancedFilters(prev => ({
      ...prev,
      [filterId]: values
    }));
  };

  const handleClearAllFilters = () => {
    setAdvancedFilters({});
    setSearchTerm('');
  };

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
        columns={columnsForVisibility}
        onColumnVisibilityChange={handleColumnVisibilityChange}
        advancedFilters={availableAdvancedFilters}
        onAdvancedFilterChange={handleAdvancedFilterChange}
        onClearAllFilters={handleClearAllFilters}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-[400px]">
        <div className="flex-1 overflow-hidden">
          {paginatedData.length === 0 ? (
            <BaseListEmptyState
              searchTerm={searchTerm}
              createButton={createButton}
            />
          ) : viewMode === 'table' ? (
            <BaseListTableAdvanced
              data={paginatedData}
              columns={columns}
              actions={actions}
              getItemId={getItemId}
              columnVisibility={columnVisibility}
              entityName={entityName}
              loading={loading}
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

        {/* Pagination */}
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
