
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TableHead } from '@/components/ui/table';
import { obterEstilosFixacao } from '@/core/hooks/useUtilsTabela';
import { cn } from '@/lib/utils';
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

interface PropsCabecalhoArrastavel<T> {
  cabecalho: Header<T, unknown>;
  aoRedimensionarColuna: (idColuna: string, tamanho: number) => void;
  aoFixarColuna: (idColuna: string, fixacao: 'left' | 'right' | false) => void;
}

const CabecalhoArrastavel = <T,>({
  cabecalho,
  aoRedimensionarColuna,
  aoFixarColuna,
}: PropsCabecalhoArrastavel<T>) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({
    id: cabecalho.column.id,
  });

  const { column } = cabecalho;
  const estaFixa = column.getIsPinned();
  const eUltimaFixaEsquerda = estaFixa === 'left' && column.getIsLastColumn('left');
  const ePrimeiraFixaDireita = estaFixa === 'right' && column.getIsFirstColumn('right');

  const estilo: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: 'relative',
    transform: CSS.Translate.toString(transform),
    transition,
    whiteSpace: 'nowrap',
    zIndex: isDragging ? 30 : (estaFixa ? 1 : 0),
    ...obterEstilosFixacao(column),
  };

  const manipularRedimensionamento = useCallback((evento: React.MouseEvent<HTMLDivElement>) => {
    const tamanhoInicial = column.getSize();
    const xInicial = evento.clientX;
    let ultimaAtualizacao = 0;
    const delayThrottle = 16;

    const manipularMovimentoMouse = (e: MouseEvent) => {
      const agora = Date.now();
      if (agora - ultimaAtualizacao < delayThrottle) return;
      
      const deltaX = e.clientX - xInicial;
      const novoTamanho = Math.max(100, Math.min(800, tamanhoInicial + deltaX));
      aoRedimensionarColuna(column.id, novoTamanho);
      ultimaAtualizacao = agora;
    };

    const manipularSoltarMouse = () => {
      document.removeEventListener('mousemove', manipularMovimentoMouse);
      document.removeEventListener('mouseup', manipularSoltarMouse);
    };

    document.addEventListener('mousemove', manipularMovimentoMouse);
    document.addEventListener('mouseup', manipularSoltarMouse);
  }, [column, aoRedimensionarColuna]);

  return (
    <TableHead
      ref={setNodeRef}
      className={cn(
        "relative h-10 truncate border-t",
        estaFixa && "bg-muted/90 backdrop-blur-xs",
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
      aria-sort={
        cabecalho.column.getIsSorted() === 'asc'
          ? 'ascending'
          : cabecalho.column.getIsSorted() === 'desc'
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
            {cabecalho.isPlaceholder
              ? null
              : flexRender(cabecalho.column.columnDef.header, cabecalho.getContext())}
          </span>
        </div>

        <div className="flex items-center gap-1 flex-shrink-0">
          {cabecalho.column.getCanSort() && (
            <Button
              size="icon"
              variant="ghost"
              className="group -mr-1 size-7 shadow-none"
              onClick={cabecalho.column.getToggleSortingHandler()}
            >
              {{
                asc: <ChevronUp className="shrink-0 opacity-60" size={16} />,
                desc: <ChevronDown className="shrink-0 opacity-60" size={16} />,
              }[cabecalho.column.getIsSorted() as string] ?? (
                <ChevronUp className="shrink-0 opacity-0 group-hover:opacity-60" size={16} />
              )}
            </Button>
          )}

          {!cabecalho.isPlaceholder && cabecalho.column.getCanPin() && (
            <>
              {cabecalho.column.getIsPinned() ? (
                <Button
                  size="icon"
                  variant="ghost"
                  className="-mr-1 size-7 shadow-none"
                  onClick={() => {
                    aoFixarColuna(cabecalho.column.id, false);
                  }}
                  aria-label={`Desfixar coluna ${cabecalho.column.columnDef.header as string}`}
                  title={`Desfixar coluna ${cabecalho.column.columnDef.header as string}`}
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
                      aria-label={`Opções de fixação para ${cabecalho.column.columnDef.header as string}`}
                      title={`Opções de fixação para ${cabecalho.column.columnDef.header as string}`}
                    >
                      <Ellipsis className="opacity-60" size={16} aria-hidden="true" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => {
                      aoFixarColuna(cabecalho.column.id, 'left');
                    }}>
                      <ArrowLeftToLine size={16} className="opacity-60" aria-hidden="true" />
                      Fixar à esquerda
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => {
                      aoFixarColuna(cabecalho.column.id, 'right');
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

        {cabecalho.column.getCanResize() && (
          <div
            className="absolute top-0 h-full w-4 cursor-col-resize user-select-none touch-none -right-2 z-10 flex justify-center before:absolute before:w-px before:inset-y-0 before:bg-border before:-translate-x-px"
            onMouseDown={manipularRedimensionamento}
            onDoubleClick={() => {
              const tamanhoAuto = Math.max(150, Math.min(400, 1200 / 6));
              aoRedimensionarColuna(column.id, tamanhoAuto);
            }}
          />
        )}
      </div>
    </TableHead>
  );
};

export default CabecalhoArrastavel;
