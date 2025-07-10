
import { TableCell } from '@/components/ui/table';
import { obterEstilosFixacao } from '@/core/hooks/useUtilsTabela';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Cell, flexRender } from '@tanstack/react-table';
import { CSSProperties } from 'react';

interface PropsCelulaArrastavel<T> {
  celula: Cell<T, unknown>;
}

const CelulaArrastavel = <T,>({ celula }: PropsCelulaArrastavel<T>) => {
  const { isDragging, setNodeRef, transform, transition } = useSortable({
    id: celula.column.id,
  });

  const { column } = celula;
  const estaFixa = column.getIsPinned();
  const eUltimaFixaEsquerda = estaFixa === 'left' && column.getIsLastColumn('left');
  const ePrimeiraFixaDireita = estaFixa === 'right' && column.getIsFirstColumn('right');

  const estilo: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition,
    zIndex: isDragging ? 30 : 0,
    ...obterEstilosFixacao(column),
  };

  return (
    <TableCell
      ref={setNodeRef}
      className={cn(
        "truncate",
        estaFixa && "bg-background/90 backdrop-blur-xs",
        eUltimaFixaEsquerda && "border-r border-border",
        ePrimeiraFixaDireita && "border-l border-border"
      )}
      style={estilo}
      data-pinned={estaFixa || undefined}
      data-last-col={
        eUltimaFixaEsquerda
          ? "left"
          : ePrimeiraFixaDireita
          ? "right"
          : undefined
      }
    >
      {flexRender(celula.column.columnDef.cell, celula.getContext())}
    </TableCell>
  );
};

export default CelulaArrastavel;
