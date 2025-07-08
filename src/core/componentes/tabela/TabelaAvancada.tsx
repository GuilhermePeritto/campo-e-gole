
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
    VisibilityState
} from '@tanstack/react-table';
import { useMemo } from 'react';

import { BaseListAction, BaseListColumn } from '@/components/BaseList';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { useEstadoTabela } from '@/core/hooks/useEstadoTabela';
import { gerarNomeEntidade, inferirTipoColuna, obterValorAninhado, useTamanhoContainer } from '@/core/hooks/useUtilsTabela';
import { cn } from '@/lib/utils';
import CabecalhoArrastavel from './CabecalhoArrastavel';
import CelulaArrastavel from './CelulaArrastavel';
import CelulaInteligente from './CelulaInteligente';
import EstadoVazio from './EstadoVazio';
import SkeletonTabela from './SkeletonTabela';

interface PropsTabelaAvancada<T> {
  dados: T[];
  colunas: BaseListColumn<T>[];
  acoes: BaseListAction<T>[];
  obterIdItem: (item: T) => string | number;
  visibilidadeColunas?: VisibilityState;
  nomeEntidade?: string;
  carregando?: boolean;
  habilitarCelulasInteligentes?: boolean;
  termosBusca?: string;
  filtrosAvancados?: Record<string, string[]>;
}

const TabelaAvancada = <T extends Record<string, any>>({
  dados,
  colunas,
  acoes,
  obterIdItem,
  visibilidadeColunas = {},
  nomeEntidade,
  carregando = false,
  habilitarCelulasInteligentes = true,
  termosBusca = '',
  filtrosAvancados = {},
}: PropsTabelaAvancada<T>) => {
  const { containerRef, larguraContainer } = useTamanhoContainer();
  const nomeEntidadeFinal = useMemo(() => gerarNomeEntidade(nomeEntidade, colunas), [nomeEntidade, colunas]);
  
  // Apply search and advanced filters to data
  const dadosFiltrados = useMemo(() => {
    let filtrados = dados;

    // Apply search filter
    if (termosBusca.trim()) {
      filtrados = filtrados.filter(item => {
        return Object.values(item).some(valor => 
          String(valor).toLowerCase().includes(termosBusca.toLowerCase())
        );
      });
    }

    // Apply advanced filters
    Object.entries(filtrosAvancados).forEach(([chave, valoresSelecionados]) => {
      if (valoresSelecionados.length > 0) {
        filtrados = filtrados.filter(item => {
          const valorItem = String(item[chave as keyof T] || '');
          return valoresSelecionados.includes(valorItem);
        });
      }
    });

    return filtrados;
  }, [dados, termosBusca, filtrosAvancados]);
  
  // Infer column types for smart rendering
  const tiposColunas = useMemo(() => {
    if (!habilitarCelulasInteligentes || !dadosFiltrados.length) return {};
    
    return colunas.reduce((acc, col) => {
      acc[String(col.key)] = inferirTipoColuna(dadosFiltrados, String(col.key));
      return acc;
    }, {} as Record<string, string>);
  }, [colunas, dadosFiltrados, habilitarCelulasInteligentes]);

  // Convert BaseListColumn to TanStack ColumnDef
  const colunasTanStack: ColumnDef<T>[] = useMemo(() => {
    const colunasBase: ColumnDef<T>[] = colunas.map((col) => ({
      id: String(col.key),
      header: col.label,
      accessorFn: (linha) => {
        const valor = obterValorAninhado(linha, col.key);
        return valor;
      },
      cell: ({ row, getValue }) => {
        if (col.render) {
          return col.render(row.original);
        }
        
        const valor = getValue();
        
        // Use SmartCell if enabled and no custom render function
        if (habilitarCelulasInteligentes && !col.render) {
          return (
            <CelulaInteligente 
              valor={valor}
              tipo={tiposColunas[String(col.key)]}
              chaveColuna={String(col.key)}
            />
          );
        }
        
        return valor !== undefined && valor !== null ? String(valor) : '';
      },
      enableSorting: col.sortable ?? true,
      enableResizing: true,
      enablePinning: true,
      minSize: 100,
      maxSize: 800,
      size: 200,
    }));

    if (acoes.length > 0) {
      colunasBase.push({
        id: 'acoes',
        header: 'Ações',
        cell: ({ row }) => (
          <div className="flex items-center gap-2">
            {acoes.map((acao, indiceAcao) => (
              <Button
                key={indiceAcao}
                variant={acao.variant || 'outline'}
                size="sm"
                onClick={() => acao.onClick(row.original)}
                className={cn("gap-1", acao.className)}
              >
                {acao.icon}
                {acao.label}
              </Button>
            ))}
          </div>
        ),
        enableSorting: false,
        enableResizing: true,
        enablePinning: true,
        minSize: Math.max(acoes.length * 90 + 60, 150),
        size: Math.max(acoes.length * 110, 200),
      });
    }

    return colunasBase;
  }, [colunas, acoes, habilitarCelulasInteligentes, tiposColunas]);

  const {
    ordenacao,
    ordemColunas,
    tamanhosColunas,
    visibilidadeColunas: visibilidadeColunasTabela,
    estadoFixacaoTabela,
    manipularMudancaOrdenacao,
    manipularMudancaOrdemColunas,
    manipularMudancaVisibilidadeColunas,
    manipularMudancaFixacaoColunas,
    manipularRedimensionamentoColuna,
    manipularFixacaoColuna,
  } = useEstadoTabela({
    nomeEntidade: nomeEntidadeFinal,
    colunas: colunasTanStack,
    larguraContainer,
    visibilidadeInicial: visibilidadeColunas,
  });

  // Update column sizes in tanStackColumns
  const colunasComTamanhos = useMemo(() => {
    return colunasTanStack.map(col => ({
      ...col,
      size: tamanhosColunas[col.id as string] || col.size || 200,
    }));
  }, [colunasTanStack, tamanhosColunas]);

  const tabela = useReactTable({
    data: dadosFiltrados,
    columns: colunasComTamanhos,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: manipularMudancaOrdenacao,
    onColumnVisibilityChange: manipularMudancaVisibilidadeColunas,
    state: {
      sorting: ordenacao,
      columnOrder: ordemColunas,
      columnVisibility: visibilidadeColunasTabela,
      columnPinning: estadoFixacaoTabela,
    },
    onColumnOrderChange: manipularMudancaOrdemColunas,
    onColumnPinningChange: manipularMudancaFixacaoColunas,
    enableColumnPinning: true,
    enableSortingRemoval: false,
  });

  function manipularFimArrastamento(evento: DragEndEvent) {
    const { active, over } = evento;
    if (active && over && active.id !== over.id) {
      manipularMudancaOrdemColunas((ordemColunas: string[]) => {
        return arrayMove(ordemColunas, 
          ordemColunas.indexOf(active.id as string),
          ordemColunas.indexOf(over.id as string)
        );
      });
    }
  }

  const sensores = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  if (carregando) {
    return (
      <div ref={containerRef} className="flex-1 overflow-x-auto overflow-y-auto h-full">
        <SkeletonTabela colunas={colunas.length + (acoes.length > 0 ? 1 : 0)} />
      </div>
    );
  }

  if (dadosFiltrados.length === 0) {
    return <EstadoVazio />;
  }

  const idContextoDnd = `tabela-dnd-${nomeEntidadeFinal}`;

  return (
    <div ref={containerRef} className="flex-1 overflow-x-auto overflow-y-auto h-full min-w-0">
      <DndContext
        id={idContextoDnd}
        collisionDetection={closestCenter}
        modifiers={[restrictToHorizontalAxis]}
        onDragEnd={manipularFimArrastamento}
        sensors={sensores}
      >
        <Table
          className="[&_td]:border-border [&_th]:border-border table-fixed border-separate border-spacing-0 [&_tfoot_td]:border-t [&_th]:border-b [&_tr]:border-none [&_tr:not(:last-child)_td]:border-b"
          style={{
            width: Math.max(tabela.getTotalSize(), larguraContainer),
            minWidth: '100%'
          }}
        >
          <TableHeader className="bg-background/90 sticky top-0 z-10 backdrop-blur-xs">
            {tabela.getHeaderGroups().map((gruposCabecalho) => (
              <TableRow key={gruposCabecalho.id} className="hover:bg-transparent">
                <SortableContext
                  items={ordemColunas}
                  strategy={horizontalListSortingStrategy}
                >
                  {gruposCabecalho.headers.map((cabecalho) => (
                    <CabecalhoArrastavel 
                      key={cabecalho.id} 
                      cabecalho={cabecalho}
                      aoRedimensionarColuna={manipularRedimensionamentoColuna}
                      aoFixarColuna={manipularFixacaoColuna}
                    />
                  ))}
                </SortableContext>
              </TableRow>
            ))}
          </TableHeader>
          
          <TableBody>
            {tabela.getRowModel().rows?.length ? (
              tabela.getRowModel().rows.map((linha) => (
                <TableRow
                  key={linha.id}
                  className="border-b hover:bg-muted/50"
                  data-state={linha.getIsSelected() && "selected"}
                >
                  {linha.getVisibleCells().map((celula) => (
                    <SortableContext
                      key={celula.id}
                      items={ordemColunas}
                      strategy={horizontalListSortingStrategy}
                    >
                      <CelulaArrastavel key={celula.id} celula={celula} />
                    </SortableContext>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <td colSpan={colunasComTamanhos.length} className="h-24 text-center">
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

export default TabelaAvancada;
