import { Permissao } from '@/types/permissao';
import { useBaseCrud } from '../core/hooks/useBaseCrud';

export const usePermissoes = () => {
  const baseHook = useBaseCrud<Permissao>('/permissoes', {
    transformData: (data) => data,
    transformPagination: (pagination) => pagination
  });

  const getPermissaoById = (id: string) => baseHook.data.find(p => p.id === id);

  const getPermissoesByModulo = (modulo: string) => {
    return baseHook.data.filter(p => p.moduloPai === modulo);
  };

  const getPermissoesForSearch = async () => {
    await baseHook.fetchData({ limit: 1000 });
    return baseHook.data.map(permissao => ({
      id: permissao.id,
      label: permissao.nome,
      subtitle: permissao.descricao
    }));
  };

  const getPermissoesAgrupadas = () => {
    const agrupadas: Record<string, Permissao[]> = {};
    
    baseHook.data.forEach(permissao => {
      if (!agrupadas[permissao.moduloPai]) {
        agrupadas[permissao.moduloPai] = [];
      }
      agrupadas[permissao.moduloPai].push(permissao);
    });

    return agrupadas;
  };

  return {
    ...baseHook,
    getPermissaoById,
    getPermissoesByModulo,
    getPermissoesForSearch,
    getPermissoesAgrupadas,
    // Aliases para compatibilidade
    permissoes: baseHook.data,
    fetchPermissoes: baseHook.fetchData,
  };
}; 