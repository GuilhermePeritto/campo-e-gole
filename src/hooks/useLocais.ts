
import { toast } from 'sonner';
import { useBaseCrud } from '../core/hooks/useBaseCrud';
import { api, ApiResponse } from '../lib/api';
import { Local } from '../types';

export const useLocais = () => {
  const baseHook = useBaseCrud<Local>('/api/locais', {
    transformData: (data) => data,
    transformPagination: (pagination) => pagination
  });

  const getLocalById = (id: string) => baseHook.data.find(l => l.id === id);

  const getLocaisForSearch = async () => {
    await baseHook.fetchData({ limit: 1000 });
    return baseHook.data.map(local => ({
      id: local.id,
      label: local.nome,
      subtitle: local.endereco
    }));
  };

  const createLocal = async (localData: Omit<Local, 'id' | 'dataCriacao'>) => {
    try {
      const loadingToast = toast.loading('Criando local...');
      
      const response = await api.post<ApiResponse<Local>>('/api/locais', localData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Local criado com sucesso!');
        await baseHook.fetchData({ 
          page: baseHook.pagination.currentPage, 
          limit: baseHook.pagination.pageSize 
        });
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao criar local');
        throw new Error(response.message || 'Erro ao criar local');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar local';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateLocal = async (id: string, localData: Partial<Local>) => {
    try {
      const loadingToast = toast.loading('Atualizando local...');
      
      const response = await api.put<ApiResponse<Local>>(`/api/locais/${id}`, localData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Local atualizado com sucesso!');
        await baseHook.fetchData({ 
          page: baseHook.pagination.currentPage, 
          limit: baseHook.pagination.pageSize 
        });
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao atualizar local');
        throw new Error(response.message || 'Erro ao atualizar local');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar local';
      toast.error(errorMessage);
      throw error;
    }
  };

  return {
    ...baseHook,
    getLocalById,
    getLocaisForSearch,
    createLocal,
    updateLocal,
    // Aliases para compatibilidade
    locais: baseHook.data,
    fetchLocais: baseHook.fetchData,
    deleteLocal: baseHook.deleteItem,
  };
};
