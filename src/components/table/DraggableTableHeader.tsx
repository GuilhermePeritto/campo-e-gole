
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';
import { getPinningStyles } from '@/utils/tableUtils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Header, flexRender } from '@tanstack/react-table';
import {
    ArrowLeftToLine,
    ArrowRightToLine,
    ChevronDown,
    ChevronUp,
    Ellipsis,
    GripVertical,
    PinOff
} from 'lucide-react';
import { CSSProperties, useCallback } from 'react';

interface DraggableTableHeaderProps<T> {
  header: Header<T, unknown>;
  onColumnResize: (columnId: string, size: number) => void;
  onColumnPin: (columnId: string, pinning: 'left' | 'right' | false) => void;
}

const DraggableTableHeader = <T,>({
  header,
  onColumnResize,
  onColumnPin,
}: DraggableTableHeaderProps<T>) => {
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

  const handleResize = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    const startSize = column.getSize();
    const startX = event.clientX;
    let lastUpdateTime = 0;
    const throttleDelay = 16;

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
  }, [column, onColumnResize]);

  return (
    <TableHead
      ref={setNodeRef}
      className={cn(
        "relative h-10 truncate border-t",
        isPinned && "bg-muted/90 backdrop-blur-xs",
        isLastLeftPinned && "border-r border-border",
        isFirstRightPinned && "border-l border-border"
      )}
      style={style}
      data-pinned={isPinned || undefined}
      data-last-col={
        isLastLeftPinned
          ? "left"
          : isFirstRightPinned
          ? "right"
          : undefined
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

        {header.column.getCanResize() && (
          <div
            className="absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px"
            onMouseDown={handleResize}
            onDoubleClick={() => {
              const autoSize = Math.max(150, Math.min(400, 1200 / 6));
              onColumnResize(column.id, autoSize);
            }}
          />
        )}
      </div>
    </TableHead>
  );
};

export default DraggableTableHeader;
