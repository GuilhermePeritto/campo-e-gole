
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Search, Grid, List, Columns } from 'lucide-react';

interface BaseListSearchControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  viewMode: 'table' | 'grid';
  onViewModeChange: (mode: 'table' | 'grid') => void;
  // Column visibility props
  columns?: Array<{ id: string; label: string; canHide: boolean; isVisible: boolean }>;
  onColumnVisibilityChange?: (columnId: string, visible: boolean) => void;
}

const BaseListSearchControls: React.FC<BaseListSearchControlsProps> = ({
  searchTerm,
  onSearchChange,
  searchPlaceholder = "Buscar...",
  viewMode,
  onViewModeChange,
  columns = [],
  onColumnVisibilityChange
}) => {
  return (
    <div className="flex-shrink-0 flex flex-col sm:flex-row gap-4 mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10"
        />
      </div>
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
        
        {/* Column Visibility Control - only show for table view */}
        {viewMode === 'table' && columns.length > 0 && onColumnVisibilityChange && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="gap-2">
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
    </div>
  );
};

export default BaseListSearchControls;
