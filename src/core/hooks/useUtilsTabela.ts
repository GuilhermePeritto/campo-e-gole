
import { Column } from '@tanstack/react-table';
import { CSSProperties, useEffect, useRef, useState } from 'react';

export const obterEstilosFixacao = <T,>(coluna: Column<T>): CSSProperties => {
  const estaFixa = coluna.getIsPinned();
  const offsetFixacao = estaFixa === 'left' ? coluna.getStart('left') : estaFixa === 'right' ? coluna.getAfter('right') : 0;
  
  return {
    left: estaFixa === 'left' ? `${offsetFixacao}px` : undefined,
    right: estaFixa === 'right' ? `${offsetFixacao}px` : undefined,
    position: estaFixa ? 'sticky' : 'relative',
    width: coluna.getSize(),
    zIndex: estaFixa ? 10 : 0,
  };
};

export const obterValorAninhado = (obj: any, caminho: string | keyof any): any => {
  if (!obj) return undefined;
  
  if (typeof caminho === 'string' && caminho.includes('.')) {
    return caminho.split('.').reduce((atual, chave) => {
      return atual && atual[chave] !== undefined ? atual[chave] : undefined;
    }, obj);
  }
  
  return obj[caminho];
};

export const gerarNomeEntidade = (nomeEntidade?: string, colunas?: any[]): string => {
  if (nomeEntidade) {
    return nomeEntidade.toLowerCase().replace(/[^a-z0-9]/g, '_');
  }
  
  return 'tabela_padrao';
};

export const useTamanhoContainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [larguraContainer, setLarguraContainer] = useState(1200);

  useEffect(() => {
    const atualizarTamanho = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setLarguraContainer(rect.width);
      }
    };

    atualizarTamanho();

    const observadorRedimensionamento = new ResizeObserver(atualizarTamanho);
    if (containerRef.current) {
      observadorRedimensionamento.observe(containerRef.current);
    }

    window.addEventListener('resize', atualizarTamanho);

    return () => {
      observadorRedimensionamento.disconnect();
      window.removeEventListener('resize', atualizarTamanho);
    };
  }, []);

  return { containerRef, larguraContainer };
};

export const detectarTipoDado = (valor: any): string => {
  if (valor === null || valor === undefined) return 'texto';
  
  const valorString = String(valor).toLowerCase();
  
  if (typeof valor === 'boolean' || valorString === 'true' || valorString === 'false' || 
      valorString === 'ativo' || valorString === 'inativo' || valorString === 'sim' || valorString === 'não') {
    return 'booleano';
  }
  
  if (valor instanceof Date || /^\d{4}-\d{2}-\d{2}/.test(valorString) || /^\d{2}\/\d{2}\/\d{4}/.test(valorString)) {
    return 'data';
  }
  
  if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}/.test(valorString) || /^\d{2}\/\d{2}\/\d{4} \d{2}:\d{2}/.test(valorString)) {
    return 'dataHora';
  }
  
  if (typeof valor === 'number' || /^R\$/.test(valorString) || (!isNaN(parseFloat(valorString)) && isFinite(parseFloat(valorString)))) {
    if (valorString.includes('r$') || valorString.includes('$') || /^\d+(\.\d{2})?$/.test(valorString)) {
      return 'moeda';
    }
    return 'numero';
  }
  
  if (/@/.test(valorString) && /\.[a-z]{2,}/.test(valorString)) {
    return 'email';
  }
  
  if (/^\(\d{2}\)\s?\d{4,5}-?\d{4}$/.test(valorString) || /^\d{10,11}$/.test(valorString.replace(/[^\d]/g, ''))) {
    return 'telefone';
  }
  
  if (/^https?:\/\//.test(valorString)) {
    return 'url';
  }
  
  if (['ativo', 'inativo', 'pendente', 'aprovado', 'rejeitado', 'concluído', 'cancelado'].includes(valorString)) {
    return 'status';
  }
  
  return 'texto';
};

export const inferirTipoColuna = (dados: any[], chaveColuna: string): string => {
  if (!dados.length) return 'texto';
  
  const valoresAmostra = dados
    .slice(0, 10)
    .map(item => obterValorAninhado(item, chaveColuna))
    .filter(val => val !== null && val !== undefined);
    
  if (!valoresAmostra.length) return 'texto';
  
  const tipos = valoresAmostra.map(detectarTipoDado);
  
  const contagemTipos = tipos.reduce((acc, tipo) => {
    acc[tipo] = (acc[tipo] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  return Object.entries(contagemTipos).sort(([,a], [,b]) => b - a)[0][0];
};
