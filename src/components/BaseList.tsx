
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Search, Grid3X3, List } from 'lucide-react';
import { usePagination } from '@/hooks/usePagination';
import PaginationControls from '@/components/PaginationControls';

export interface BaseListColumn<T> {
  key: string;
  label: string;
  render: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface BaseListAction<T> {
  label: string;
  icon: React.ReactNode;
  onClick: (item: T) => void;
  variant?: 'ghost' | 'default' | 'destructive' | 'outline' | 'secondary';
}

interface BaseListProps<T> {
  data: T[];
  columns: BaseListColumn<T>[];
  actions?: BaseListAction<T>[];
  title: string;
  description?: string;
  searchPlaceholder?: string;
  searchFields: (keyof T)[];
  getItemId: (item: T) => string | number;
  pageSize?: number;
  className?: string;
  renderCard?: (item: T, actions: BaseListAction<T>[]) => React.ReactNode;
}

type ViewType = 'list' | 'cards';

function BaseList<T>({
  data,
  columns,
  actions = [],
  title,
  description,
  searchPlaceholder = "Buscar...",
  searchFields,
  getItemId,
  pageSize = 10,
  className = "",
  renderCard
}: BaseListProps<T>) {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [viewType, setViewType] = React.useState<ViewType>('list');

  const filteredData = React.useMemo(() => {
    if (!searchTerm) return data;
    
    return data.filter(item =>
      searchFields.some(field => {
        const value = item[field];
        return value && 
          value.toString().toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [data, searchTerm, searchFields]);

  const pagination = usePagination(filteredData, {
    totalItems: filteredData.length,
    pageSize
  });

  return (
    <div className={className}>
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewType === 'list' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('list')}
            className="gap-2"
          >
            <List className="h-4 w-4" />
            Lista
          </Button>
          <Button
            variant={viewType === 'cards' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setViewType('cards')}
            className="gap-2"
            disabled={!renderCard}
          >
            <Grid3X3 className="h-4 w-4" />
            Cards
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description && (
            <CardDescription>{description}</CardDescription>
          )}
        </CardHeader>
        <CardContent>
          {viewType === 'list' ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((column) => (
                    <TableHead key={column.key}>{column.label}</TableHead>
                  ))}
                  {actions.length > 0 && (
                    <TableHead className="text-right">Ações</TableHead>
                  )}
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagination.paginatedData.map((item) => (
                  <TableRow key={getItemId(item)}>
                    {columns.map((column) => (
                      <TableCell key={column.key}>
                        {column.render(item)}
                      </TableCell>
                    ))}
                    {actions.length > 0 && (
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {actions.map((action, index) => (
                            <button
                              key={index}
                              onClick={() => action.onClick(item)}
                              className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
                              title={action.label}
                            >
                              {action.icon}
                            </button>
                          ))}
                        </div>
                      </TableCell>
                    )}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {pagination.paginatedData.map((item) => (
                <div key={getItemId(item)}>
                  {renderCard ? renderCard(item, actions) : (
                    <Card className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-2">
                          {columns.slice(0, 3).map((column) => (
                            <div key={column.key}>
                              <strong>{column.label}:</strong> {column.render(item)}
                            </div>
                          ))}
                        </div>
                        {actions.length > 0 && (
                          <div className="flex gap-2 mt-4">
                            {actions.map((action, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => action.onClick(item)}
                                className="gap-1"
                              >
                                {action.icon}
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  )}
                </div>
              ))}
            </div>
          )}

          <PaginationControls
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
            totalItems={pagination.totalItems}
            pageSize={pagination.pageSize}
            startIndex={pagination.startIndex}
            endIndex={pagination.endIndex}
            hasNextPage={pagination.hasNextPage}
            hasPreviousPage={pagination.hasPreviousPage}
            onPageChange={pagination.goToPage}
            onPageSizeChange={pagination.setPageSize}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default BaseList;
