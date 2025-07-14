import { Permissao } from '@/types/permissao';
import { useCallback, useMemo } from 'react';
import { useBaseCrud } from '../core/hooks/useBaseCrud';

export const usePermissoes = () => {
  const baseHook = useBaseCrud<Permissao>('/permissoes', {
    transformData: (data) => data,
    transformPagination: (pagination) => pagination
  });

  const getPermissaoById = useCallback((id: string) => 
    baseHook.data.find(p => p.id === id), [baseHook.data]);

  const getPermissoesByModulo = useCallback((modulo: string) => 
    baseHook.data.filter(p => p.moduloPai === modulo), [baseHook.data]);

  const getPermissoesForSearch = useCallback(async () => {
    await baseHook.fetchData({ limit: 1000 });
    return baseHook.data.map(permissao => ({
      id: permissao.id,
      label: permissao.nome,
      subtitle: permissao.descricao
    }));
  }, [baseHook.fetchData, baseHook.data]);

  const getPermissoesAgrupadas = useCallback(() => {
    const agrupadas: Record<string, Permissao[]> = {};
    
    baseHook.data.forEach(permissao => {
      if (!agrupadas[permissao.moduloPai]) {
        agrupadas[permissao.moduloPai] = [];
      }
      agrupadas[permissao.moduloPai].push(permissao);
    });

    return agrupadas;
  }, [baseHook.data]);

  // Memoizar o objeto retornado para evitar re-renderizações
  const hookValue = useMemo(() => ({
    ...baseHook,
    getPermissaoById,
    getPermissoesByModulo,
    getPermissoesForSearch,
    getPermissoesAgrupadas,
    // Aliases para compatibilidade
    permissoes: baseHook.data,
    fetchPermissoes: baseHook.fetchData,
  }), [
    baseHook,
    getPermissaoById,
    getPermissoesByModulo,
    getPermissoesForSearch,
    getPermissoesAgrupadas
  ]);

  return hookValue;
}; 