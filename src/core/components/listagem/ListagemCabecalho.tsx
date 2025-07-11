import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ArrowDown, ArrowUp, ArrowUpDown, GripVertical } from 'lucide-react';
import { ColunaListagem } from './ListagemContext';

interface PropsListagemCabecalho<T> {
  coluna: ColunaListagem<T>;
  ordenacao: {
    campo: string;
    direcao: 'asc' | 'desc';
  };
  onSort: (campo: string) => void;
}

export function ListagemCabecalho<T>({ coluna, ordenacao, onSort }: PropsListagemCabecalho<T>) {
  const chaveColuna = String(coluna.chave);
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: chaveColuna });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    // Garantir que o texto não mude durante o drag
    userSelect: 'none' as const,
    pointerEvents: isDragging ? 'none' as const : 'auto' as const,
  };
  
  const isOrdenado = ordenacao.campo === chaveColuna;
  const direcao = ordenacao.direcao;
  
  return (
    <th
      ref={setNodeRef}
      style={style}
      className={cn(
        "h-10 px-3 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 select-none relative group bg-background",
        coluna.ordenavel !== false && "cursor-pointer hover:bg-muted/50"
      )}
    >
      <div className="flex items-center gap-2">
        {/* Grip para arrastar */}
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
        
        {/* Título da coluna com ordenação */}
        {coluna.ordenavel !== false ? (
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 font-medium hover:bg-transparent"
            onClick={() => onSort(chaveColuna)}
          >
            {coluna.titulo}
            {isOrdenado ? (
              direcao === 'asc' ? (
                <ArrowUp className="ml-1 h-3 w-3" />
              ) : (
                <ArrowDown className="ml-1 h-3 w-3" />
              )
            ) : (
              <ArrowUpDown className="ml-1 h-3 w-3 opacity-50" />
            )}
          </Button>
        ) : (
          <span className="font-medium">{coluna.titulo}</span>
        )}
      </div>
    </th>
  );
} 