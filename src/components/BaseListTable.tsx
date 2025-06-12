
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { BaseListColumn, BaseListAction } from '@/components/BaseList';

interface BaseListTableProps<T> {
  data: T[];
  columns: BaseListColumn<T>[];
  actions: BaseListAction<T>[];
  getItemId: (item: T) => string | number;
}

const BaseListTable = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  getItemId
}: BaseListTableProps<T>) => {
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

  return (
    <Card className="h-full flex flex-col">
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-background border-b z-10">
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)} className="px-4 py-3 text-left font-medium bg-background">
                  {column.label}
                </th>
              ))}
              {actions.length > 0 && (
                <th className="px-4 py-3 text-left font-medium bg-background">Ações</th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.map(renderTableRow)}
          </tbody>
        </table>
      </div>
    </Card>
  );
};

export default BaseListTable;
