import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChevronDown, ChevronUp, MoreHorizontal } from 'lucide-react';
import { BaseCrudAction, BaseCrudColumn } from './types/BaseCrudTypes';

interface BaseCrudTableContentProps<T> {
  data: T[];
  columns: BaseCrudColumn<T>[];
  actions: BaseCrudAction<T>[];
  viewMode: 'table' | 'grid';
  columnVisibility: Record<string, boolean>;
  loading: boolean;
  onSort?: (field: string, direction: 'asc' | 'desc') => void;
  sortField?: string;
  sortDirection?: 'asc' | 'desc';
}

export function BaseCrudTableContent<T extends Record<string, any>>({
  data,
  columns,
  actions,
  viewMode,
  columnVisibility,
  loading,
  onSort,
  sortField,
  sortDirection
}: BaseCrudTableContentProps<T>) {
  
  const renderCell = (item: T, column: BaseCrudColumn<T>) => {
    if (column.render) {
      return column.render(item);
    }
    
    const value = item[column.key as keyof T];
    return value !== undefined && value !== null ? String(value) : '-';
  };

  const getSortIcon = (field: string) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  const handleSort = (field: string) => {
    if (!onSort || !columns.find(col => String(col.key) === field)?.sortable) return;
    
    const newDirection = sortField === field && sortDirection === 'asc' ? 'desc' : 'asc';
    onSort(field, newDirection);
  };

  // Filtrar colunas visíveis
  const visibleColumns = columns.filter(col => columnVisibility[String(col.key)] !== false);

  if (viewMode === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-end">
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          data.map((item, index) => (
            <Card key={item.id || index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  {visibleColumns.slice(0, 3).map(column => (
                    <div key={String(column.key)}>
                      <p className="text-sm font-medium text-muted-foreground">
                        {column.label}
                      </p>
                      <p className="text-sm">
                        {renderCell(item, column)}
                      </p>
                    </div>
                  ))}
                  {actions.length > 0 && (
                    <div className="flex justify-end pt-2">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          {actions
                            .filter(action => !action.show || action.show(item))
                            .map((action, actionIndex) => (
                              <DropdownMenuItem
                                key={actionIndex}
                                onClick={() => action.onClick(item)}
                                className={action.variant === 'destructive' ? 'text-destructive' : ''}
                              >
                                {action.icon}
                                {action.label}
                              </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    );
  }

  // Modo tabela
  return (
    <div className="overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            {visibleColumns.map(column => (
              <TableHead key={String(column.key)} className="whitespace-nowrap">
                {column.sortable ? (
                  <button
                    onClick={() => handleSort(String(column.key))}
                    className="flex items-center gap-1 hover:text-primary transition-colors"
                  >
                    {column.label}
                    {getSortIcon(String(column.key))}
                  </button>
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
            {actions.length > 0 && (
              <TableHead className="w-20">Ações</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <TableRow key={index}>
                {visibleColumns.map(column => (
                  <TableCell key={String(column.key)}>
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell>
                    <Skeleton className="h-8 w-8" />
                  </TableCell>
                )}
              </TableRow>
            ))
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={visibleColumns.length + (actions.length > 0 ? 1 : 0)} className="text-center py-8">
                <div className="text-muted-foreground">
                  Nenhum registro encontrado
                </div>
              </TableCell>
            </TableRow>
          ) : (
            data.map((item, index) => (
              <TableRow key={item.id || index}>
                {visibleColumns.map(column => (
                  <TableCell key={String(column.key)}>
                    {renderCell(item, column)}
                  </TableCell>
                ))}
                {actions.length > 0 && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {actions
                          .filter(action => !action.show || action.show(item))
                          .map((action, actionIndex) => (
                            <DropdownMenuItem
                              key={actionIndex}
                              onClick={() => action.onClick(item)}
                              className={action.variant === 'destructive' ? 'text-destructive' : ''}
                            >
                              {action.icon}
                              {action.label}
                            </DropdownMenuItem>
                          ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
} 