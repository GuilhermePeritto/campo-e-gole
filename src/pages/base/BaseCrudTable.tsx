import ExportButton from '@/components/ExportButton';
import PaginationControls from '@/components/PaginationControls';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { Columns, Filter, Grid, List, Plus, Search, X } from 'lucide-react';
import React, { useMemo, useState } from 'react';
import { BaseCrudEmptyState } from './BaseCrudEmptyState';
import { BaseCrudTableContent } from './BaseCrudTableContent';
import { BaseCrudAction, BaseCrudColumn } from './types/BaseCrudTypes';

export interface AdvancedFilter {
  id: string;
  label: string;
  type: 'select';
  options: Array<{ value: string; label: string; count?: number }>;
  value: string[];
}

interface BaseCrudTableProps<T> {
  data: T[];
  columns: BaseCrudColumn<T>[];
  actions?: BaseCrudAction<T>[];
  loading?: boolean;
  pagination?: any;
  searchTerm: string;
  filters: Record<string, string[]>;
  searchFields?: (keyof T)[];
  searchPlaceholder?: string;
  showExport?: boolean;
  exportFilename?: string;
  createButton?: {
    label: string;
    icon?: React.ReactNode;
    onClick: () => void;
  };
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  onSearch: (term: string) => void;
  onSort: (field: string, direction: 'asc' | 'desc') => void;
  onFilterChange: (field: string, values: string[]) => void;
  onClearFilters: () => void;
  onDelete: (item: T) => void;
}

export function BaseCrudTable<T extends Record<string, any>>({
  data,
  columns,
  actions = [],
  loading = false,
  pagination,
  searchTerm,
  filters,
  searchFields = [],
  searchPlaceholder = "Buscar...",
  showExport = false,
  exportFilename,
  createButton,
  onPageChange,
  onPageSizeChange,
  onSearch,
  onSort,
  onFilterChange,
  onClearFilters,
  onDelete
}: BaseCrudTableProps<T>) {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');
  const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({});
  
  // Preparar filtros avançados
  const availableAdvancedFilters = useMemo(() => {
    return columns
      .filter(col => col.filterable && col.filterType)
      .map(col => ({
        id: String(col.key),
        label: col.label,
        type: col.filterType as 'select',
        options: [], // Será preenchido com dados reais
        value: filters[String(col.key)] || []
      }));
  }, [columns, filters]);
  
  // Calcular filtros ativos
  const activeFilters = useMemo(() => {
    const active: Array<{ id: string; label: string; value: string }> = [];
    
    availableAdvancedFilters.forEach(filter => {
      filter.value.forEach(value => {
        const option = filter.options.find(opt => opt.value === value);
        if (option) {
          active.push({
            id: `${filter.id}-${value}`,
            label: `${filter.label}: ${option.label}`,
            value: value
          });
        }
      });
    });
    
    return active;
  }, [availableAdvancedFilters]);
  
  const handleColumnVisibilityChange = (columnId: string, visible: boolean) => {
    setColumnVisibility(prev => ({
      ...prev,
      [columnId]: visible
    }));
  };
  
  const handleAdvancedFilterChange = (filterId: string, values: string[]) => {
    onFilterChange(filterId, values);
  };
  
  const handleRemoveFilter = (filterId: string, value: string) => {
    const filter = availableAdvancedFilters.find(f => filterId.startsWith(f.id));
    if (filter) {
      const newValues = filter.value.filter(v => v !== value);
      onFilterChange(filter.id, newValues);
    }
  };
  
  const handleAdvancedFilterCheckboxChange = (filterId: string, value: string, checked: boolean) => {
    const filter = availableAdvancedFilters.find(f => f.id === filterId);
    if (filter) {
      const newValues = checked 
        ? [...filter.value, value]
        : filter.value.filter(v => v !== value);
      onFilterChange(filterId, newValues);
    }
  };
  
  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Gerenciar Entidades</h2>
          <p className="text-muted-foreground mt-1">
            Visualize e gerencie todas as entidades do sistema
          </p>
        </div>
        <div className="flex items-center gap-3">
          {showExport && (
            <ExportButton 
              data={data} 
              filename={exportFilename || 'entidades'}
              title="Entidades"
            />
          )}
          {createButton && (
            <Button 
              onClick={createButton.onClick}
              className="gap-2"
            >
              {createButton.icon || <Plus className="h-4 w-4" />}
              {createButton.label}
            </Button>
          )}
        </div>
      </div>

      {/* Search Controls */}
      <div className="flex-shrink-0 space-y-4 mb-6">
        {/* Main Controls Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Left Side - Search and Filters */}
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1 min-w-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Advanced Filters */}
            {availableAdvancedFilters.length > 0 && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Filter className="h-4 w-4" />
                    Filtros
                    {activeFilters.length > 0 && (
                      <Badge variant="secondary" className="ml-1 px-1 py-0 text-xs">
                        {activeFilters.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="start">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium leading-none">Filtros Avançados</h4>
                      {activeFilters.length > 0 && (
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={onClearFilters}
                          className="h-auto p-1 text-xs"
                        >
                          Limpar tudo
                        </Button>
                      )}
                    </div>
                    
                    {availableAdvancedFilters.map(filter => (
                      <div key={filter.id} className="space-y-2">
                        <Label className="text-sm font-medium">{filter.label}</Label>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {filter.options.map(option => (
                            <div key={option.value} className="flex items-center justify-between space-x-2">
                              <div className="flex items-center space-x-2 flex-1">
                                <Checkbox
                                  id={`${filter.id}-${option.value}`}
                                  checked={filter.value.includes(option.value)}
                                  onCheckedChange={(checked) => 
                                    handleAdvancedFilterCheckboxChange(filter.id, option.value, !!checked)
                                  }
                                />
                                <Label 
                                  htmlFor={`${filter.id}-${option.value}`}
                                  className="text-sm font-normal cursor-pointer flex-1"
                                >
                                  {option.label}
                                </Label>
                              </div>
                              {option.count !== undefined && (
                                <span className="text-xs text-muted-foreground">
                                  {option.count}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            )}

            {/* Column Visibility Control - only show for table view */}
            {viewMode === 'table' && columns.length > 0 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Columns className="h-4 w-4" />
                    Colunas
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-background">
                  <DropdownMenuLabel>Visibilidade das Colunas</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {columns.filter(column => column.canHide !== false).map((column) => (
                    <DropdownMenuCheckboxItem
                      key={String(column.key)}
                      checked={columnVisibility[String(column.key)] !== false}
                      onCheckedChange={(value) => handleColumnVisibilityChange(String(column.key), !!value)}
                    >
                      {column.label}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Right Side - View Mode Toggle */}
          <div className="flex items-center gap-1 border rounded-lg p-1">
            <Button
              variant={viewMode === 'table' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('table')}
              className="h-8 w-8 p-0"
            >
              <List className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Active Filters */}
        {(searchTerm || activeFilters.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {searchTerm && (
              <Badge variant="secondary" className="gap-1">
                Busca: {searchTerm}
                <button
                  onClick={() => onSearch('')}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            )}
            {activeFilters.map(filter => (
              <Badge key={filter.id} variant="secondary" className="gap-1">
                {filter.label}
                <button
                  onClick={() => handleRemoveFilter(filter.id, filter.value)}
                  className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
            {(searchTerm || activeFilters.length > 0) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilters}
                className="h-auto px-2 py-1 text-xs"
              >
                Limpar tudo
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="flex-1 overflow-hidden min-h-0">
          {loading ? (
            <BaseCrudTableContent
              data={[]}
              columns={columns}
              actions={actions}
              viewMode={viewMode}
              columnVisibility={columnVisibility}
              loading={true}
            />
          ) : data.length === 0 ? (
            <BaseCrudEmptyState
              searchTerm={searchTerm}
              createButton={createButton}
            />
          ) : (
            <BaseCrudTableContent
              data={data}
              columns={columns}
              actions={actions}
              viewMode={viewMode}
              columnVisibility={columnVisibility}
              loading={false}
            />
          )}
        </div>

        {/* Pagination */}
        {data.length > 0 && pagination && (
          <div className="flex-shrink-0 mt-4 pt-3 border-t bg-background">
            <PaginationControls
              currentPage={pagination.currentPage || 1}
              totalPages={pagination.totalPages || 1}
              totalItems={pagination.totalItems || data.length}
              pageSize={pagination.pageSize || 10}
              startIndex={pagination.startIndex || 1}
              endIndex={pagination.endIndex || data.length}
              hasNextPage={pagination.hasNextPage || false}
              hasPreviousPage={pagination.hasPreviousPage || false}
              onPageChange={onPageChange}
              onPageSizeChange={onPageSizeChange}
            />
          </div>
        )}
      </div>
    </div>
  );
} 