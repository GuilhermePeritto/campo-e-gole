
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BaseListColumn, BaseListAction } from '@/components/BaseList';

interface BaseListGridProps<T> {
  data: T[];
  columns: BaseListColumn<T>[];
  actions: BaseListAction<T>[];
  getItemId: (item: T) => string | number;
  renderCard?: (item: T, actions: BaseListAction<T>[]) => React.ReactNode;
}

const BaseListGrid = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  getItemId,
  renderCard
}: BaseListGridProps<T>) => {
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
    <div className="h-full overflow-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4 p-1">
        {data.map(renderGridCard)}
      </div>
    </div>
  );
};

export default BaseListGrid;
