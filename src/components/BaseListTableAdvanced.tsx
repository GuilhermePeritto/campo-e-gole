
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from '@dnd-kit/sortable';
import {
  ColumnDef,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  flexRender,
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { BaseListAction, BaseListColumn } from '@/components/BaseList';
import DragAlongCell from '@/components/table/DragAlongCell';
import DraggableTableHeader from '@/components/table/DraggableTableHeader';
import TableEmptyState from '@/components/table/TableEmptyState';
import TableSkeleton from '@/components/table/TableSkeleton';
import SmartCell from '@/components/table/SmartCell';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useTableState } from '@/hooks/useTableState';
import { cn } from '@/lib/utils';
import { generateEntityName, getNestedValue, useContainerSize, inferColumnType } from '@/utils/tableUtils';

interface BaseListTableAdvancedProps<T> {
  data: T[];
  columns: BaseListColumn<T>[];
  actions: BaseListAction<T>[];
  getItemId: (item: T) => string | number;
  columnVisibility?: VisibilityState;
  entityName?: string;
  loading?: boolean;
  enableSmartCells?: boolean;
}

const BaseListTableAdvanced = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  getItemId,
  columnVisibility = {},
  entityName,
  loading = false,
  enableSmartCells = true,
}: BaseListTableAdvancedProps<T>) => {
  const { containerRef, containerWidth } = useContainerSize();
  const finalEntityName = useMemo(() => generateEntityName(entityName, columns), [entityName, columns]);
  
  // Infer column types for smart rendering
  const columnTypes = useMemo(() => {
    if (!enableSmartCells || !data.length) return {};
    
    return columns.reduce((acc, col) => {
      acc[String(col.key)] = inferColumnType(data, String(col.key));
      return acc;
    }, {} as Record<string, string>);
  }, [columns, data, enableSmartCells]);

  // Convert BaseListColumn to TanStack ColumnDef
  const tanStackColumns: ColumnDef<T>[] = useMemo(() => {
    const baseColumns: ColumnDef<T>[] = columns.map((col) => ({
      id: String(col.key),
      header: col.label,
      accessorFn: (row) => {
        const value = getNestedValue(row, col.key);
        return value;
      },
      cell: ({ row, getValue }) => {
        if (col.render) {
          return col.render(row.original);
        }
        
        const value = getValue();
        
        // Use SmartCell if enabled and no custom render function
        if (enableSmartCells && !col.render) {
          return (
            <SmartCell 
              value={value}
              type={columnTypes[String(col.key)]}
              columnKey={String(col.key)}
            />
          );
        }
        
        return value !== undefined && value !== null ? String(value) : '';
      },
      enableSorting: col.sortable ?? true,
      enableResizing: true,
      enablePinning: true,
      minSize: 100,
      maxSize: 800,
      size: 200,
    }));

    if (actions.length > 0) {
      baseColumns.push({
        id: 'actions',
        header: 'Ações',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {actions.map((action, actionIndex) => (
              <Button
                key={actionIndex}
                variant={action.variant || 'outline'}
                size="sm"
                onClick={() => action.onClick(row.original)}
                className={cn("gap-1", action.className)}
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        ),
        enableSorting: false,
        enableResizing: true,
        enablePinning: true,
        minSize: Math.max(actions.length * 90 + 60, 150),
        size: Math.max(actions.length * 110, 200),
      });
    }

    return baseColumns;
  }, [columns, actions, enableSmartCells, columnTypes]);

  const {
    sorting,
    columnOrder,
    columnSizes,
    columnVisibility: tableColumnVisibility,
    tablePinningState,
    handleSortingChange,
    handleColumnOrderChange,
    handleColumnVisibilityChange,
    handleColumnPinningChange,
    handleColumnResize,
    handleColumnPin,
  } = useTableState({
    entityName: finalEntityName,
    columns: tanStackColumns,
    containerWidth,
    initialVisibility: columnVisibility,
  });

  // Update column sizes in tanStackColumns
  const columnsWithSizes = useMemo(() => {
    return tanStackColumns.map(col => ({
      ...col,
      size: columnSizes[col.id as string] || col.size || 200,
    }));
  }, [tanStackColumns, columnSizes]);

  const table = useReactTable({
    data,
    columns: columnsWithSizes,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: handleSortingChange,
    onColumnVisibilityChange: handleColumnVisibilityChange,
    state: {
      sorting,
      columnOrder,
      columnVisibility: tableColumnVisibility,
      columnPinning: tablePinningState,
    },
    onColumnOrderChange: handleColumnOrderChange,
    onColumnPinningChange: handleColumnPinningChange,
    enableColumnPinning: true,
    enableSortingRemoval: false,
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      handleColumnOrderChange((columnOrder: string[]) => {
        return arrayMove(columnOrder, 
          columnOrder.indexOf(active.id as string),
          columnOrder.indexOf(over.id as string)
        );
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  if (loading) {
    return (
      <div ref={containerRef} className="flex-1 overflow-x-auto h-full">
        <TableSkeleton columns={columns.length + (actions.length > 0 ? 1 : 0)} />
      </div>
    );
  }

  if (data.length === 0) {
    return <TableEmptyState />;
  }

  const dndContextId = `table-dnd-${finalEntityName}`;

  return (
    <div ref={containerRef} className="flex-1 overflow-x-auto h-full">
      <DndContext
        id={dndContextId}
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
      >
        <Table
          className="[&_td]:border-border [&_th]:border-border table-fixed border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b"
          style={{
            width: table.getTotalSize(),
          }}
        >
          <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                <SortableContext
                  items={columnOrder}
                  strategy={horizontalListSortingStrategy}
                >
                  {headerGroup.headers.map((header) => (
                    <DraggableTableHeader 
                      key={header.id} 
                      header={header}
                      onColumnResize={handleColumnResize}
                      onColumnPin={handleColumnPin}
                    />
                  ))}
                </SortableContext>
              </TableRow>
            ))}
          </TableHeader>
          
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b hover:bg-muted/50"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <SortableContext
                      key={cell.id}
                      items={columnOrder}
                      strategy={horizontalListSortingStrategy}
                    >
                      <DragAlongCell key={cell.id} cell={cell} />
                    </SortableContext>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <td colSpan={columnsWithSizes.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </td>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DndContext>
    </div>
  );
};

export default BaseListTableAdvanced;
