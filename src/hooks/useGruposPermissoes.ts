import { GrupoPermissao } from '@/types/grupo-permissao';
import { toast } from 'sonner';
import { useBaseCrud } from '../core/hooks/useBaseCrud';
import { api, ApiResponse } from '../lib/api';

export const useGruposPermissoes = () => {
  const baseHook = useBaseCrud<GrupoPermissao>('/grupos-permissoes', {
    transformData: (data) => data,
    transformPagination: (pagination) => pagination
  });

  const getGrupoById = (id: string) => baseHook.data.find(g => g.id === id);

  const getGruposForSearch = async () => {
    await baseHook.fetchData({ limit: 1000 });
    return baseHook.data.map(grupo => ({
      id: grupo.id,
      label: grupo.nome,
      subtitle: grupo.descricao
    }));
  };

  const createGrupo = async (grupoData: Omit<GrupoPermissao, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    try {
      const loadingToast = toast.loading('Criando grupo...');
      
      const response = await api.post<ApiResponse<GrupoPermissao>>('/grupos-permissoes', grupoData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Grupo criado com sucesso!');
        await baseHook.fetchData({ 
          page: baseHook.pagination.currentPage, 
          limit: baseHook.pagination.pageSize 
        });
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao criar grupo');
        throw new Error(response.message || 'Erro ao criar grupo');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar grupo';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateGrupo = async (id: string, grupoData: Partial<GrupoPermissao>) => {
    try {
      const loadingToast = toast.loading('Atualizando grupo...');
      
      const response = await api.put<ApiResponse<GrupoPermissao>>(`/grupos-permissoes/${id}`, grupoData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Grupo atualizado com sucesso!');
        await baseHook.fetchData({ 
          page: baseHook.pagination.currentPage, 
          limit: baseHook.pagination.pageSize 
        });
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao atualizar grupo');
        throw new Error(response.message || 'Erro ao atualizar grupo');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar grupo';
      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    ...baseHook,
    getGrupoById,
    getGruposForSearch,
    createGrupo,
    updateGrupo,
    // Aliases para compatibilidade
    grupos: baseHook.data,
    fetchGrupos: baseHook.fetchData,
    deleteGrupo: baseHook.deleteItem,
  };
}; 