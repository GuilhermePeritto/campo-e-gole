
import React, { CSSProperties, useEffect, useId, useState } from 'react';
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
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  Cell,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
  Column,
  VisibilityState,
} from '@tanstack/react-table';
import { 
  ChevronDown, 
  ChevronUp, 
  GripVertical, 
  ArrowLeftToLine, 
  ArrowRightToLine, 
  MoreHorizontal, 
  PinOff
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { BaseListColumn, BaseListAction } from '@/components/BaseList';
import { FileText } from 'lucide-react';

interface BaseListTableAdvancedProps<T> {
  data: T[];
  columns: BaseListColumn<T>[];
  actions: BaseListAction<T>[];
  getItemId: (item: T) => string | number;
  columnVisibility?: VisibilityState;
}

// Helper function to safely get nested property value
const getNestedValue = (obj: any, path: string | keyof any): any => {
  if (!obj) return undefined;
  
  if (typeof path === 'string' && path.includes('.')) {
    return path.split('.').reduce((current, key) => {
      return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
  }
  
  return obj[path];
};

// Helper function to compute pinning styles for columns
const getPinningStyles = <T,>(column: Column<T>): CSSProperties => {
  const isPinned = column.getIsPinned();
  const pinningStyles: CSSProperties = {
    left: isPinned === 'left' ? `${column.getStart('left')}px` : undefined,
    right: isPinned === 'right' ? `${column.getAfter('right')}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 10 : 0,
  };

  // Add visual effects for pinned columns
  if (isPinned) {
    pinningStyles.backdropFilter = 'blur(8px)';
    pinningStyles.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    pinningStyles.borderRight = isPinned === 'left' ? '2px solid rgba(0, 0, 0, 0.1)' : undefined;
    pinningStyles.borderLeft = isPinned === 'right' ? '2px solid rgba(0, 0, 0, 0.1)' : undefined;
    pinningStyles.boxShadow = isPinned === 'left' 
      ? '2px 0 8px rgba(0, 0, 0, 0.1)' 
      : isPinned === 'right' 
        ? '-2px 0 8px rgba(0, 0, 0, 0.1)'
        : undefined;
  }

  return pinningStyles;
};

const BaseListTableAdvanced = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  getItemId,
  columnVisibility = {}
}: BaseListTableAdvancedProps<T>) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);

  // Convert BaseListColumn to TanStack ColumnDef with improved data access
  const tanStackColumns: ColumnDef<T>[] = React.useMemo(() => {
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
        return value !== undefined && value !== null ? String(value) : '';
      },
      enableSorting: col.sortable ?? true,
      enableResizing: true,
      enablePinning: true,
      minSize: 150,
      maxSize: 800,
      size: 200,
    }));

    // Add actions column if there are actions
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
  }, [columns, actions]);

  // Initialize column order
  useEffect(() => {
    if (columnOrder.length === 0) {
      setColumnOrder(tanStackColumns.map(col => col.id as string));
    }
  }, [tanStackColumns, columnOrder.length]);

  const table = useReactTable({
    data,
    columns: tanStackColumns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    onColumnVisibilityChange: () => {},
    state: {
      sorting,
      columnOrder,
      columnVisibility,
    },
    onColumnOrderChange: setColumnOrder,
    enableSortingRemoval: false,
  });

  // Handle drag and drop reordering
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex);
      });
    }
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  if (data.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center">
        <div className="text-center py-12">
          <div className="mx-auto w-16 h-16 mb-4 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
            <FileText className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Nenhum registro encontrado</h3>
          <p className="text-gray-500">Não há dados para exibir no momento.</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col overflow-hidden">
      {/* Main scrollable container */}
      <div className="flex-1 overflow-auto">
        <DndContext
          id={useId()}
          collisionDetection={closestCenter}
          modifiers={[restrictToHorizontalAxis]}
          onDragEnd={handleDragEnd}
          sensors={sensors}
        >
          <Table
            style={{ width: table.getTotalSize() }}
            className="table-fixed border-separate border-spacing-0"
          >
            {/* Sticky Header */}
            <TableHeader className="sticky top-0 bg-background z-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  <SortableContext
                    items={columnOrder}
                    strategy={horizontalListSortingStrategy}
                  >
                    {headerGroup.headers.map((header) => (
                      <DraggableTableHeader key={header.id} header={header} />
                    ))}
                  </SortableContext>
                </TableRow>
              ))}
            </TableHeader>
            
            {/* Table Body */}
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
                  <TableCell colSpan={tanStackColumns.length} className="h-24 text-center">
                    Nenhum resultado encontrado.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </DndContext>
      </div>
    </Card>
  );
};

const DraggableTableHeader = <T,>({
  header,
}: {
  header: Header<T, unknown>;
}) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: header.column.id,
  });

  const { column } = header;
  const isPinned = column.getIsPinned();
  const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right');

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition,
    whiteSpace: 'nowrap',
    zIndex: isDragging ? 30 : (isPinned ? 20 : 0),
    ...getPinningStyles(column),
  };

  return (
    <TableHead
      ref={setNodeRef}
      className={cn(
        "relative h-12 px-4 truncate border-t",
        "[&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l",
        "[&:not([data-pinned]):has(+[data-pinned])_div.cursor-col-resize:last-child]:opacity-0",
        "[&[data-last-col=left]_div.cursor-col-resize:last-child]:opacity-0",
        "[&[data-pinned=right]:last-child_div.cursor-col-resize:last-child]:opacity-0"
      )}
      style={style}
      data-pinned={isPinned || undefined}
      data-last-col={
        isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined
      }
      aria-sort={
        header.column.getIsSorted() === 'asc'
          ? 'ascending'
          : header.column.getIsSorted() === 'desc'
          ? 'descending'
          : 'none'
      }
    >
      <div className="flex items-center justify-between gap-2 min-w-0">
        <div className="flex items-center gap-1 min-w-0">
          <Button
            size="icon"
            variant="ghost"
            className="-ml-2 size-7 shadow-none flex-shrink-0"
            {...attributes}
            {...listeners}
            aria-label="Arrastar para reordenar"
          >
            <GripVertical className="opacity-60" size={16} aria-hidden="true" />
          </Button>
          <span className="truncate min-w-0">
            {header.isPlaceholder
              ? null
              : flexRender(header.column.columnDef.header, header.getContext())}
          </span>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {/* Sorting Button */}
          {header.column.getCanSort() && (
            <Button
              size="icon"
              variant="ghost"
              className="group -mr-1 size-7 shadow-none"
              onClick={header.column.getToggleSortingHandler()}
            >
              {{
                asc: <ChevronUp className="shrink-0 opacity-60" size={16} />,
                desc: <ChevronDown className="shrink-0 opacity-60" size={16} />,
              }[header.column.getIsSorted() as string] ?? (
                <ChevronUp className="shrink-0 opacity-0 group-hover:opacity-60" size={16} />
              )}
            </Button>
          )}

          {/* Pin/Unpin Controls */}
          {!header.isPlaceholder && header.column.getCanPin() && (
            <>
              {header.column.getIsPinned() ? (
                <Button
                  size="icon"
                  variant="ghost"
                  className="-mr-1 size-7 shadow-none"
                  onClick={() => header.column.pin(false)}
                  aria-label={`Desfixar coluna ${header.column.columnDef.header as string}`}
                >
                  <PinOff className="opacity-60" size={16} />
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="-mr-1 size-7 shadow-none"
                      aria-label={`Opções de fixação para ${header.column.columnDef.header as string}`}
                    >
                      <MoreHorizontal className="opacity-60" size={16} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background">
                    <DropdownMenuItem onClick={() => header.column.pin('left')}>
                      <ArrowLeftToLine size={16} className="opacity-60 mr-2" />
                      Fixar à esquerda
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => header.column.pin('right')}>
                      <ArrowRightToLine size={16} className="opacity-60 mr-2" />
                      Fixar à direita
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </>
          )}
        </div>

        {/* Column Resize Handle */}
        {header.column.getCanResize() && (
          <div
            {...{
              onDoubleClick: () => header.column.resetSize(),
              onMouseDown: header.getResizeHandler(),
              onTouchStart: header.getResizeHandler(),
              className:
                'absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px hover:before:bg-primary',
            }}
          />
        )}
      </div>
    </TableHead>
  );
};

const DragAlongCell = <T,>({ cell }: { cell: Cell<T, unknown> }) => {
  const { isDragging, setNodeRef, transform, transition } = useSortable({
    id: cell.column.id,
  });

  const { column } = cell;
  const isPinned = column.getIsPinned();
  const isLastLeftPinned = isPinned === 'left' && column.getIsLastColumn('left');
  const isFirstRightPinned = isPinned === 'right' && column.getIsFirstColumn('right');

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 30 : 0,
    ...getPinningStyles(column),
  };

  return (
    <TableCell
      ref={setNodeRef}
      className={cn(
        "px-4 truncate",
        "[&[data-pinned=left][data-last-col=left]]:border-r [&[data-pinned=right][data-last-col=right]]:border-l"
      )}
      style={style}
      data-pinned={isPinned || undefined}
      data-last-col={
        isLastLeftPinned ? 'left' : isFirstRightPinned ? 'right' : undefined
      }
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default BaseListTableAdvanced;
