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
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Header,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  ArrowLeftToLine,
  ArrowRightToLine,
  ChevronDown,
  ChevronUp,
  Ellipsis,
  GripVertical,
  PinOff
} from 'lucide-react';
import { CSSProperties, useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';

import { BaseListAction, BaseListColumn } from '@/components/BaseList';
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
import { FileText } from 'lucide-react';

interface BaseListTableAdvancedProps<T> {
  data: T[];
  columns: BaseListColumn<T>[];
  actions: BaseListAction<T>[];
  getItemId: (item: T) => string | number;
  columnVisibility?: VisibilityState;
  entityName?: string; // Nome da entidade para gerar listId automaticamente
}

// Interfaces para cache
interface ColumnState {
  size: number;
  pinned?: 'left' | 'right' | false;
}

interface TableCache {
  columnSizes: Record<string, number>;
  columnOrder: string[];
  columnVisibility: VisibilityState;
  sorting: SortingState;
  columnPinning: Record<string, 'left' | 'right' | false>;
}

// Utilitários de cache
const CACHE_PREFIX = 'baselist_table_';
const CACHE_VERSION = '1.0';

const getCacheKey = (listId: string) => `${CACHE_PREFIX}${listId}_v${CACHE_VERSION}`;

const loadTableCache = (listId: string): Partial<TableCache> => {
  try {
    const cached = localStorage.getItem(getCacheKey(listId));
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const saveTableCache = (listId: string, cache: Partial<TableCache>) => {
  try {
    const existing = loadTableCache(listId);
    const updated = { ...existing, ...cache };
    localStorage.setItem(getCacheKey(listId), JSON.stringify(updated));
  } catch (error) {
    console.warn('Failed to save table cache:', error);
  }
};

// Hook customizado para debounce
const useDebounce = (value: any, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

// Hook para salvar cache de forma otimizada
const useOptimizedCacheSave = (
  listId: string,
  columnOrder: string[],
  columnSizes: Record<string, number>,
  sorting: SortingState,
  columnVisibility: VisibilityState,
  columnPinning: Record<string, 'left' | 'right' | false>
) => {
  // Debounce column sizes (o que mais muda durante resize)
  const debouncedColumnSizes = useDebounce(columnSizes, 500); // 500ms de delay
  
  // Ref para controlar salvamentos
  const lastSavedRef = useRef<string>('');
  
  useEffect(() => {
    if (columnOrder.length > 0 && Object.keys(debouncedColumnSizes).length > 0) {
      const cacheData = {
        columnOrder,
        columnSizes: debouncedColumnSizes,
        sorting,
        columnVisibility,
        columnPinning,
      };
      
      // Criar hash simples para evitar salvamentos desnecessários
      const currentHash = JSON.stringify(cacheData);
      
      if (currentHash !== lastSavedRef.current) {
        saveTableCache(listId, cacheData);
        lastSavedRef.current = currentHash;
      }
    }
  }, [listId, columnOrder, debouncedColumnSizes, sorting, columnVisibility, columnPinning]);

  // Função para forçar salvamento imediato (usada em drag/drop e pinning)
  const forceSave = useCallback(() => {
    if (columnOrder.length > 0 && Object.keys(columnSizes).length > 0) {
      const cacheData = {
        columnOrder,
        columnSizes,
        sorting,
        columnVisibility,
        columnPinning,
      };
      saveTableCache(listId, cacheData);
      lastSavedRef.current = JSON.stringify(cacheData);
    }
  }, [listId, columnOrder, columnSizes, sorting, columnVisibility, columnPinning]);

  return { forceSave };
};

// Hook para calcular o tamanho do container automaticamente
const useContainerSize = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(1200);

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerWidth(rect.width);
      }
    };

    // Calcular tamanho inicial
    updateSize();

    // Observer para mudanças de tamanho
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Listener para redimensionamento da janela
    window.addEventListener('resize', updateSize);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateSize);
    };
  }, []);

  return { containerRef, containerWidth };
};

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
  const pinningOffset = isPinned === 'left' ? column.getStart('left') : isPinned === 'right' ? column.getAfter('right') : 0;
  
  return {
    left: isPinned === 'left' ? `${pinningOffset}px` : undefined,
    right: isPinned === 'right' ? `${pinningOffset}px` : undefined,
    position: isPinned ? 'sticky' : 'relative',
    width: column.getSize(),
    zIndex: isPinned ? 10 : 0,
    backgroundColor: isPinned ? 'var(--background)' : undefined,
  };
};

// Generate listId from entity name or columns
const generateListId = (entityName?: string, columns?: BaseListColumn<any>[]): string => {
  if (entityName) {
    return entityName.toLowerCase().replace(/[^a-z0-9]/g, '_');
  }
  
  // Generate from column keys as fallback
  if (columns && columns.length > 0) {
    const columnKeys = columns.map(col => String(col.key)).slice(0, 3).join('_');
    return `table_${columnKeys.toLowerCase().replace(/[^a-z0-9_]/g, '_')}`;
  }
  
  return 'default_table';
};

// Calculate auto column sizes
const calculateAutoColumnSizes = (
  columns: ColumnDef<any>[],
  containerWidth: number,
  minColumnSize: number = 150,
  maxColumnSize: number = 400
): Record<string, number> => {
  const availableWidth = containerWidth - 32; // Account for padding
  const totalColumns = columns.length;
  
  if (totalColumns === 0) return {};
  
  // Calculate base size
  const baseSize = Math.max(minColumnSize, availableWidth / totalColumns);
  
  // Ensure we don't exceed max size
  const finalSize = Math.min(maxColumnSize, baseSize);
  
  return columns.reduce((acc, col) => {
    acc[col.id as string] = finalSize;
    return acc;
  }, {} as Record<string, number>);
};

const BaseListTableAdvanced = <T extends Record<string, any>>({
  data,
  columns,
  actions,
  getItemId,
  columnVisibility = {},
  entityName,
}: BaseListTableAdvancedProps<T>) => {
  // Auto-calculate container size
  const { containerRef, containerWidth } = useContainerSize();
  
  // Generate listId automatically
  const listId = useMemo(() => generateListId(entityName, columns), [entityName, columns]);
  
  // Load cached data
  const cachedData = useMemo(() => loadTableCache(listId), [listId]);
  
  // State with cache initialization
  const [sorting, setSorting] = useState<SortingState>(cachedData.sorting || []);
  const [columnOrder, setColumnOrder] = useState<string[]>([]);
  const [columnSizes, setColumnSizes] = useState<Record<string, number>>({});
  const [columnPinning, setColumnPinning] = useState<Record<string, 'left' | 'right' | false>>(
    cachedData.columnPinning || {}
  );

  // Hook para salvamento otimizado do cache
  const { forceSave } = useOptimizedCacheSave(
    listId,
    columnOrder,
    columnSizes,
    sorting,
    columnVisibility,
    columnPinning
  );

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
        return value !== undefined && value !== null ? String(value) : '';
      },
      enableSorting: col.sortable ?? true,
      enableResizing: true,
      enablePinning: true,
      minSize: 100,
      maxSize: 800,
      size: 200, // Default, will be overridden
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

  // Initialize column order and sizes
  useEffect(() => {
    const columnIds = tanStackColumns.map(col => col.id as string);
    
    // Set column order from cache or default
    if (columnOrder.length === 0) {
      const cachedOrder = cachedData.columnOrder?.filter(id => columnIds.includes(id)) || [];
      const newColumns = columnIds.filter(id => !cachedOrder.includes(id));
      setColumnOrder([...cachedOrder, ...newColumns]);
    }

    // Calculate and set column sizes when container width changes
    const cachedSizes = cachedData.columnSizes || {};
    const autoSizes = calculateAutoColumnSizes(tanStackColumns, containerWidth);
    
    const finalSizes = columnIds.reduce((acc, id) => {
      // Use cached size if available, otherwise use auto-calculated size
      acc[id] = cachedSizes[id] || autoSizes[id] || 200;
      return acc;
    }, {} as Record<string, number>);
    
    setColumnSizes(finalSizes);
  }, [tanStackColumns, cachedData, containerWidth]);

  // Update column sizes in tanStackColumns
  const columnsWithSizes = useMemo(() => {
    return tanStackColumns.map(col => ({
      ...col,
      size: columnSizes[col.id as string] || col.size,
    }));
  }, [tanStackColumns, columnSizes]);

  const table = useReactTable({
    data,
    columns: columnsWithSizes,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: (updater) => {
      setSorting(updater);
      // Forçar salvamento imediato para sorting
      setTimeout(forceSave, 0);
    },
    onColumnVisibilityChange: () => {},
    state: {
      sorting,
      columnOrder,
      columnVisibility,
      columnPinning: Object.entries(columnPinning).reduce((acc, [key, value]) => {
        if (value && value !== false) {
          acc[key] = value;
        }
        return acc;
      }, {} as Record<string, 'left' | 'right'>),
    },
    onColumnOrderChange: (updater) => {
      setColumnOrder(updater);
      // Forçar salvamento imediato para reordenação
      setTimeout(forceSave, 0);
    },
    onColumnPinningChange: (updater) => {
      if (typeof updater === 'function') {
        const currentPinning = Object.entries(columnPinning).reduce((acc, [key, value]) => {
          if (value && value !== false) {
            acc[key] = value;
          }
          return acc;
        }, {} as Record<string, 'left' | 'right'>);
        
        const newPinning = updater(currentPinning);
        
        // Convert back to our format
        const updatedColumnPinning = { ...columnPinning };
        
        // Reset all columns first
        Object.keys(updatedColumnPinning).forEach(key => {
          updatedColumnPinning[key] = false;
        });
        
        // Apply new pinning
        Object.entries(newPinning).forEach(([key, value]) => {
          updatedColumnPinning[key] = value;
        });
        
        setColumnPinning(updatedColumnPinning);
        // Forçar salvamento imediato para pinning
        setTimeout(forceSave, 0);
      }
    },
    enableColumnPinning: true,
    enableSortingRemoval: false,
  });

  // Handle column resize
  const handleColumnResize = useCallback((columnId: string, size: number) => {
    setColumnSizes(prev => ({
      ...prev,
      [columnId]: size
    }));
    // Não força salvamento aqui - deixa o debounce cuidar disso
  }, []);

  // Handle column pinning
  const handleColumnPin = useCallback((columnId: string, pinning: 'left' | 'right' | false) => {
    setColumnPinning(prev => ({
      ...prev,
      [columnId]: pinning
    }));
    
    // Also update the table's pinning state directly
    const column = table.getColumn(columnId);
    if (column) {
      column.pin(pinning);
    }
    
    // Forçar salvamento imediato para pinning
    setTimeout(forceSave, 0);
  }, [table, forceSave]);

  // Handle drag and drop reordering
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const newOrder = arrayMove(columnOrder, 
          columnOrder.indexOf(active.id as string),
          columnOrder.indexOf(over.id as string)
        );
        // Forçar salvamento imediato após drag and drop
        setTimeout(forceSave, 0);
        return newOrder;
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
    <div ref={containerRef} className="flex-1 overflow-x-auto h-full">
      <DndContext
        id={useId()}
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
          {/* Header */}
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
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
                <TableCell colSpan={columnsWithSizes.length} className="h-24 text-center">
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </DndContext>
    </div>
  );
};

const DraggableTableHeader = <T,>({
  header,
  onColumnResize,
  onColumnPin,
}: {
  header: Header<T, unknown>;
  onColumnResize: (columnId: string, size: number) => void;
  onColumnPin: (columnId: string, pinning: 'left' | 'right' | false) => void;
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
    zIndex: isDragging ? 30 : (isPinned ? 1 : 0),
    ...getPinningStyles(column),
  };

  // Custom resize handler com throttling para melhor performance
  const handleResize = (event: MouseEvent) => {
    const startSize = column.getSize();
    const startX = event.clientX;
    let lastUpdateTime = 0;
    const throttleDelay = 16; // ~60fps

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastUpdateTime < throttleDelay) return;
      
      const deltaX = e.clientX - startX;
      const newSize = Math.max(100, Math.min(800, startSize + deltaX));
      onColumnResize(column.id, newSize);
      lastUpdateTime = now;
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <TableHead
      ref={setNodeRef}
      className={cn(
        "relative h-10 truncate border-t",
        // Background e blur para colunas pinadas
        isPinned && "bg-muted/90 backdrop-blur-sm shadow-md",
        // Bordas condicionais para colunas pinadas
        isLastLeftPinned && "border-r-2 border-border shadow-r",
        isFirstRightPinned && "border-l-2 border-border shadow-l"
      )}
      style={style}
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
                  onClick={() => {
                    onColumnPin(header.column.id, false);
                  }}
                  aria-label={`Desfixar coluna ${header.column.columnDef.header as string}`}
                  title={`Desfixar coluna ${header.column.columnDef.header as string}`}
                >
                  <PinOff className="opacity-60" size={16} aria-hidden="true" />
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="-mr-1 size-7 shadow-none"
                      aria-label={`Opções de fixação para ${header.column.columnDef.header as string}`}
                      title={`Opções de fixação para ${header.column.columnDef.header as string}`}
                    >
                      <Ellipsis className="opacity-60" size={16} aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      onColumnPin(header.column.id, 'left');
                    }}>
                      <ArrowLeftToLine size={16} className="opacity-60" aria-hidden="true" />
                      Fixar à esquerda
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      onColumnPin(header.column.id, 'right');
                    }}>
                      <ArrowRightToLine size={16} className="opacity-60" aria-hidden="true" />
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
            className="absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px"
            onMouseDown={handleResize}
            onDoubleClick={() => {
              // Reset to auto-calculated size
              const autoSize = Math.max(150, Math.min(400, 1200 / 6)); // Approximate auto size
              onColumnResize(column.id, autoSize);
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
        "truncate",
        // Background e blur para colunas pinadas
        isPinned && "bg-background/90 backdrop-blur-sm",
        // Bordas condicionais para colunas pinadas
        isLastLeftPinned && "border-r border-border",
        isFirstRightPinned && "border-l border-border"
      )}
      style={style}
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default BaseListTableAdvanced;