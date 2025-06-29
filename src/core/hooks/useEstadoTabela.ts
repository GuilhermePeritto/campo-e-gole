
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ColumnDef, SortingState, VisibilityState } from '@tanstack/react-table';
import { useCacheTabela } from './useCacheTabela';

interface PropsEstadoTabela {
  nomeEntidade: string;
  colunas: ColumnDef<any>[];
  larguraContainer: number;
  visibilidadeInicial: VisibilityState;
}

const calcularTamanhosAutomaticos = (
  colunas: ColumnDef<any>[],
  larguraContainer: number,
  tamanhoMinimo: number = 150,
  tamanhoMaximo: number = 400
): Record<string, number> => {
  const larguraDisponivel = larguraContainer - 32;
  const totalColunas = colunas.length;
  
  if (totalColunas === 0) return {};
  
  const tamanhoBase = Math.max(tamanhoMinimo, larguraDisponivel / totalColunas);
  const tamanhoFinal = Math.min(tamanhoMaximo, tamanhoBase);
  
  return colunas.reduce((acc, col) => {
    acc[col.id as string] = tamanhoFinal;
    return acc;
  }, {} as Record<string, number>);
};

export const useEstadoTabela = ({ 
  nomeEntidade, 
  colunas, 
  larguraContainer, 
  visibilidadeInicial 
}: PropsEstadoTabela) => {
  const { dadosCache, salvarNoCache, salvarForcado } = useCacheTabela(nomeEntidade);
  
  const [ordenacao, setOrdenacao] = useState<SortingState>(dadosCache.ordenacao || []);
  const [ordemColunas, setOrdemColunas] = useState<string[]>([]);
  const [tamanhosColunas, setTamanhosColunas] = useState<Record<string, number>>({});
  const [visibilidadeColunas, setVisibilidadeColunas] = useState<VisibilityState>(
    { ...visibilidadeInicial, ...dadosCache.visibilidadeColunas }
  );
  const [fixacaoColunas, setFixacaoColunas] = useState<Record<string, 'left' | 'right' | false>>(
    dadosCache.fixacaoColunas || {}
  );

  // Initialize column order and sizes
  useEffect(() => {
    const idsColunas = colunas.map(col => col.id as string);
    
    if (ordemColunas.length === 0 || !idsColunas.every(id => ordemColunas.includes(id))) {
      const ordemCache = dadosCache.ordemColunas?.filter(id => idsColunas.includes(id)) || [];
      const colunasNovas = idsColunas.filter(id => !ordemCache.includes(id));
      const ordemFinal = [...ordemCache, ...colunasNovas];
      setOrdemColunas(ordemFinal);
    }

    const tamanhosCache = dadosCache.tamanhosColunas || {};
    const tamanhosAuto = calcularTamanhosAutomaticos(colunas, larguraContainer);
    
    const tamanhosFinais = idsColunas.reduce((acc, id) => {
      acc[id] = tamanhosCache[id] || tamanhosAuto[id] || 200;
      return acc;
    }, {} as Record<string, number>);
    
    setTamanhosColunas(tamanhosFinais);
  }, [colunas, dadosCache, larguraContainer]);

  const manipularMudancaOrdenacao = useCallback((atualizador: any) => {
    const novaOrdenacao = typeof atualizador === 'function' ? atualizador(ordenacao) : atualizador;
    setOrdenacao(novaOrdenacao);
    salvarForcado({ ordenacao: novaOrdenacao });
  }, [ordenacao, salvarForcado]);

  const manipularMudancaOrdemColunas = useCallback((atualizador: any) => {
    const novaOrdem = typeof atualizador === 'function' ? atualizador(ordemColunas) : atualizador;
    setOrdemColunas(novaOrdem);
    salvarForcado({ ordemColunas: novaOrdem });
  }, [ordemColunas, salvarForcado]);

  const manipularMudancaVisibilidadeColunas = useCallback((atualizador: any) => {
    const novaVisibilidade = typeof atualizador === 'function' ? atualizador(visibilidadeColunas) : atualizador;
    setVisibilidadeColunas(novaVisibilidade);
    salvarForcado({ visibilidadeColunas: novaVisibilidade });
  }, [visibilidadeColunas, salvarForcado]);

  const manipularMudancaFixacaoColunas = useCallback((atualizador: any) => {
    if (typeof atualizador === 'function') {
      const fixacaoAtualFormatoTanStack = {
        left: Object.entries(fixacaoColunas).filter(([_, valor]) => valor === 'left').map(([chave]) => chave),
        right: Object.entries(fixacaoColunas).filter(([_, valor]) => valor === 'right').map(([chave]) => chave)
      };
      
      const novaFixacaoTanStack = atualizador(fixacaoAtualFormatoTanStack);
      
      const novaFixacaoColunas: Record<string, 'left' | 'right' | false> = {};
      
      colunas.forEach(col => {
        novaFixacaoColunas[col.id as string] = false;
      });
      
      novaFixacaoTanStack.left?.forEach((chave: string) => {
        novaFixacaoColunas[chave] = 'left';
      });
      novaFixacaoTanStack.right?.forEach((chave: string) => {
        novaFixacaoColunas[chave] = 'right';
      });
      
      setFixacaoColunas(novaFixacaoColunas);
      salvarForcado({ fixacaoColunas: novaFixacaoColunas });
    }
  }, [fixacaoColunas, salvarForcado, colunas]);

  const manipularRedimensionamentoColuna = useCallback((idColuna: string, tamanho: number) => {
    setTamanhosColunas(prev => {
      const novosTamanhos = { ...prev, [idColuna]: tamanho };
      salvarNoCache({ tamanhosColunas: novosTamanhos });
      return novosTamanhos;
    });
  }, [salvarNoCache]);

  const manipularFixacaoColuna = useCallback((idColuna: string, fixacao: 'left' | 'right' | false) => {
    setFixacaoColunas(prev => {
      const novaFixacao = { ...prev, [idColuna]: fixacao };
      salvarForcado({ fixacaoColunas: novaFixacao });
      return novaFixacao;
    });
  }, [salvarForcado]);

  const estadoFixacaoTabela = useMemo(() => {
    const resultado: { left?: string[], right?: string[] } = {};
    const fixadasEsquerda = Object.entries(fixacaoColunas).filter(([_, valor]) => valor === 'left').map(([chave]) => chave);
    const fixadasDireita = Object.entries(fixacaoColunas).filter(([_, valor]) => valor === 'right').map(([chave]) => chave);
    
    if (fixadasEsquerda.length > 0) {
      resultado.left = fixadasEsquerda;
    }
    if (fixadasDireita.length > 0) {
      resultado.right = fixadasDireita;
    }
    
    return resultado;
  }, [fixacaoColunas]);

  return {
    ordenacao,
    ordemColunas,
    tamanhosColunas,
    visibilidadeColunas,
    fixacaoColunas,
    estadoFixacaoTabela,
    manipularMudancaOrdenacao,
    manipularMudancaOrdemColunas,
    manipularMudancaVisibilidadeColunas,
    manipularMudancaFixacaoColunas,
    manipularRedimensionamentoColuna,
    manipularFixacaoColuna,
  };
};
