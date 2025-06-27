
import React, { useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Search, Grid, List, Columns, Filter, X } from 'lucide-react';

export interface AdvancedFilter {
  id: string;
  label: string;
  type: 'select';
  options: Array<{ value: string; label: string; count?: number }>;
  value: string[];
}

interface BaseListSearchControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  viewMode: 'table' | 'grid';
  onViewModeChange: (mode: 'table' | 'grid') => void;
  // Column visibility props
  columns?: Array<{ id: string; label: string; canHide: boolean; isVisible: boolean }>;
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
  // Advanced filters props
  advancedFilters?: AdvancedFilter[];
  onAdvancedFilterChange?: (filterId: string, values: string[]) => void;
  onClearAllFilters?: () => void;
}

const BaseListSearchControls: React.FC<BaseListSearchControlsProps> = ({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  viewMode,
  onViewModeChange,
  columns = [],
  onColumnVisibilityChange,
  advancedFilters = [],
  onAdvancedFilterChange,
  onClearAllFilters
}) => {
  // Calculate active filters
  const activeFilters = useMemo(() => {
    const filters: Array<{ id: string; label: string; value: string }> = [];
    
    advancedFilters.forEach(filter => {
      filter.value.forEach(value => {
        const option = filter.options.find(opt => opt.value === value);
        if (option) {
          filters.push({
            id: `${filter.id}-${value}`,
            label: `${filter.label}: ${option.label}`,
            value: value
          });
        }
      });
    });
    
    return filters;
  }, [advancedFilters]);

  const handleRemoveFilter = (filterId: string, value: string) => {
    const filter = advancedFilters.find(f => filterId.startsWith(f.id));
    if (filter && onAdvancedFilterChange) {
      const newValues = filter.value.filter(v => v !== value);
      onAdvancedFilterChange(filter.id, newValues);
    }
  };

  const handleAdvancedFilterChange = (filterId: string, value: string, checked: boolean) => {
    const filter = advancedFilters.find(f => f.id === filterId);
    if (filter && onAdvancedFilterChange) {
      const newValues = checked 
        ? [...filter.value, value]
        : filter.value.filter(v => v !== value);
      onAdvancedFilterChange(filterId, newValues);
    }
  };

  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Advanced Filters */}
          {advancedFilters.length > 0 && (
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
                    {activeFilters.length > 0 && onClearAllFilters && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={onClearAllFilters}
                        className="h-auto p-1 text-xs"
                      >
                        Limpar tudo
                      </Button>
                    )}
                  </div>
                  
                  {advancedFilters.map(filter => (
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
                                  handleAdvancedFilterChange(filter.id, option.value, !!checked)
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
          {viewMode === 'table' && columns.length > 0 && onColumnVisibilityChange && (
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
                {columns.filter(column => column.canHide).map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.isVisible}
                    onCheckedChange={(value) => onColumnVisibilityChange(column.id, !!value)}
                  >
                    {column.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Right Side - View Mode */}
        <div className="flex items-center gap-2">
          <Button
            variant={viewMode === 'table' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('table')}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Tabela
          </Button>
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="sm"
            onClick={() => onViewModeChange('grid')}
            className="gap-2"
          >
            <Grid className="h-4 w-4" />
            Cards
          </Button>
        </div>
      </div>

      {/* Active Filters Row - ALWAYS RESERVE SPACE */}
      <div className="min-h-[2.5rem] flex items-start">
        {activeFilters.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {activeFilters.map(filter => (
              <Badge key={filter.id} variant="secondary" className="gap-1">
                {filter.label}
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 w-4 h-4 hover:bg-transparent"
                  onClick={() => handleRemoveFilter(filter.id, filter.value)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseListSearchControls;
