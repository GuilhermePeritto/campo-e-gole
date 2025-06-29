
import { useCallback, useEffect, useRef, useState } from 'react';
import { SortingState, VisibilityState } from '@tanstack/react-table';

interface CacheTabela {
  tamanhosColunas: Record<string, number>;
  ordemColunas: string[];
  visibilidadeColunas: VisibilityState;
  ordenacao: SortingState;
  fixacaoColunas: Record<string, 'left' | 'right' | false>;
  filtrosAvancados: Record<string, string[]>;
}

const PREFIXO_CACHE = 'tabela_baselist_';
const VERSAO_CACHE = '2.0';

const obterChaveCache = (nomeEntidade: string) => `${PREFIXO_CACHE}${nomeEntidade}_v${VERSAO_CACHE}`;

const carregarCacheTabela = (nomeEntidade: string): Partial<CacheTabela> => {
  try {
    const cached = localStorage.getItem(obterChaveCache(nomeEntidade));
    return cached ? JSON.parse(cached) : {};
  } catch {
    return {};
  }
};

const salvarCacheTabela = (nomeEntidade: string, cache: Partial<CacheTabela>) => {
  try {
    const existente = carregarCacheTabela(nomeEntidade);
    const atualizado = { ...existente, ...cache };
    localStorage.setItem(obterChaveCache(nomeEntidade), JSON.stringify(atualizado));
  } catch (error) {
    console.warn('Falha ao salvar cache da tabela:', error);
  }
};

export const useCacheTabela = (nomeEntidade: string) => {
  const [dadosCache, setDadosCache] = useState<Partial<CacheTabela>>(() => 
    carregarCacheTabela(nomeEntidade)
  );
  
  const ultimoSalvoRef = useRef<string>('');
  const timeoutSalvamentoRef = useRef<NodeJS.Timeout | null>(null);
  const dadosCacheRef = useRef<Partial<CacheTabela>>(dadosCache);

  useEffect(() => {
    dadosCacheRef.current = dadosCache;
  }, [dadosCache]);

  const salvarNoCache = useCallback((dados: Partial<CacheTabela>, imediato = false) => {
    const stringDados = JSON.stringify(dados);
    
    if (stringDados === ultimoSalvoRef.current) return;
    
    const executarSalvamento = () => {
      const dadosCompletos = { ...dadosCacheRef.current, ...dados };
      salvarCacheTabela(nomeEntidade, dadosCompletos);
      setDadosCache(dadosCompletos);
      ultimoSalvoRef.current = stringDados;
    };

    if (imediato) {
      if (timeoutSalvamentoRef.current) {
        clearTimeout(timeoutSalvamentoRef.current);
        timeoutSalvamentoRef.current = null;
      }
      executarSalvamento();
    } else {
      if (timeoutSalvamentoRef.current) {
        clearTimeout(timeoutSalvamentoRef.current);
      }
      timeoutSalvamentoRef.current = setTimeout(() => {
        executarSalvamento();
        timeoutSalvamentoRef.current = null;
      }, 500);
    }
  }, [nomeEntidade]);

  const salvarForcado = useCallback((dados: Partial<CacheTabela>) => {
    salvarNoCache(dados, true);
  }, [salvarNoCache]);

  useEffect(() => {
    return () => {
      if (timeoutSalvamentoRef.current) {
        clearTimeout(timeoutSalvamentoRef.current);
      }
    };
  }, []);

  return {
    dadosCache,
    salvarNoCache,
    salvarForcado,
  };
};
