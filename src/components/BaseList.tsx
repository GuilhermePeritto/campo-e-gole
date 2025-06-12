import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Grid, List, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import PaginationControls from '@/components/PaginationControls';
import ExportButton from '@/components/ExportButton';
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
  minHeight?: string;
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
  minHeight = "100px"
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

  const renderTableRow = (item: T, index: number) => (
    <tr key={getItemId(item)} className="border-b hover:bg-muted/50">
      {columns.map((column) => (
        <td key={String(column.key)} className={cn("px-4 py-3", column.className)}>
          {column.render ? column.render(item) : String(item[column.key as keyof T] || '')}
        </td>
      ))}
      {actions.length > 0 && (
        <td className="px-4 py-3">
          <div className="flex items-center gap-2">
            {actions.map((action, actionIndex) => (
              <Button
                key={actionIndex}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={() => action.onClick(item)}
                className={cn("gap-1", action.className)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </td>
      )}
    </tr>
  );

  const renderGridCard = (item: T, index: number) => {
    if (renderCard) {
      return (
        <div key={getItemId(item)}>
          {renderCard(item, actions)}
        </div>
      );
    }

    return (
      <Card key={getItemId(item)} className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="space-y-2">
            {columns.slice(0, 3).map((column) => (
              <div key={String(column.key)} className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{column.label}:</span>
                <div className="text-sm font-medium">
                  {column.render ? column.render(item) : String(item[column.key as keyof T] || '')}
                </div>
              </div>
            ))}
            {actions.length > 0 && (
              <div className="flex gap-2 mt-3 pt-3 border-t">
                {actions.map((action, actionIndex) => (
                  <Button
                    key={actionIndex}
                    variant={action.variant || 'outline'}
                    size="sm"
                    onClick={() => action.onClick(item)}
                    className={cn("flex-1 gap-1", action.className)}
                  >
                    {action.icon}
                    {action.label}
                  </Button>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className={cn("flex flex-col h-full", className)} style={{ height: `calc(100vh - 200px)`, minHeight }}>
      {/* Header */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          {showExport && (
            <ExportButton 
              data={filteredData} 
              filename={exportFilename || title.toLowerCase().replace(/\s+/g, '-')}
              title={title}
            />
          )}
          {createButton && (
            <Button 
              onClick={createButton.onClick}
              className="gap-2"
            >
              {createButton.icon}
              {createButton.label}
            </Button>
          )}
        </div>
      </div>

      {/* Search and View Controls */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('table')}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Tabela
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="gap-2"
          >
            <Grid className="h-4 w-4" />
            Cards
          </Button>
        </div>
      </div>

      {/* Content - with constrained height and scroll */}
      <div className="flex-1 min-h-0 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-auto">
          {paginatedData.length === 0 ? (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-12">
                <div className="text-center">
                  <h3 className="text-lg font-semibold mb-2">Nenhum item encontrado</h3>
                  <p className="text-muted-foreground mb-4">
                    {searchTerm ? 'Tente ajustar sua pesquisa.' : 'Não há dados para exibir.'}
                  </p>
                  {createButton && !searchTerm && (
                    <Button onClick={createButton.onClick} className="gap-2">
                      {createButton.icon}
                      {createButton.label}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : viewMode === 'table' ? (
            <Card className="h-full">
              <div className="h-full overflow-auto">
                <table className="w-full">
                  <thead className="sticky top-0 bg-background">
                    {columns.map((column) => (
                      <th key={String(column.key)} className="px-4 py-3 text-left font-medium">
                        {column.label}
                      </th>
                    ))}
                    {actions.length > 0 && (
                      <th className="px-4 py-3 text-left font-medium">Ações</th>
                    )}
                  </thead>
                  <tbody>
                    {paginatedData.map(renderTableRow)}
                  </tbody>
                </table>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedData.map(renderGridCard)}
            </div>
          )}
        </div>

        {/* Pagination - fixed at bottom */}
        {filteredData.length > 0 && (
          <div className="flex-shrink-0 mt-4 pt-4 border-t bg-background">
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
