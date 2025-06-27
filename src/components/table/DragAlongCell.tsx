
import { Cell, flexRender } from '@tanstack/react-table';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';
import { cn } from '@/lib/utils';
import { TableCell } from '@/components/ui/table';
import { getPinningStyles } from '@/utils/tableUtils';

interface DragAlongCellProps<T> {
  cell: Cell<T, unknown>;
}

const DragAlongCell = <T,>({ cell }: DragAlongCellProps<T>) => {
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
        isPinned && "bg-background/90 backdrop-blur-xs",
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
    >
      {flexRender(cell.column.columnDef.cell, cell.getContext())}
    </TableCell>
  );
};

export default DragAlongCell;
