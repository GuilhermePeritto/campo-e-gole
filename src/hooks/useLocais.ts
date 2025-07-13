
import { toast } from 'sonner';
import { api, ApiResponse } from '../lib/api';
import { Local } from '../types/reservas';
import { useBaseCrud } from './useBaseCrud';

export const useLocais = () => {
  const baseHook = useBaseCrud<Local>('/locais', {
    transformData: (data) => data,
    transformPagination: (pagination) => pagination
  });



  // Métodos específicos que não existem no useBaseCrud
  const createLocal = async (localData: Omit<Local, 'id' | 'dataCadastro'>) => {
    try {
      const loadingToast = toast.loading('Criando local...');
      
      const response = await api.post<ApiResponse<Local>>('/locais', localData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Local criado com sucesso!');
        // Recarregar a lista
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
      
      const response = await api.put<ApiResponse<Local>>(`/locais/${id}`, localData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Local atualizado com sucesso!');
        // Recarregar a lista
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

  const getLocal = async (id: string) => {
    try {
      const response = await api.get<ApiResponse<Local>>(`/locais/${id}`);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao carregar local');
        throw new Error(response.message || 'Erro ao carregar local');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar local';
      toast.error(errorMessage);
      throw error;
    }
  };

  const buscarPorId = (id: string) => baseHook.data.find(l => l.id === id);

  const listar = async () => {
    await baseHook.fetchData({ limit: 1000 });
    return baseHook.data;
  };

  return {
    // Dados do hook base
    data: baseHook.data,
    loading: baseHook.loading,
    error: null, // useBaseCrud já trata erros
    pagination: {
      pageNumber: baseHook.pagination.currentPage,
      pageSize: baseHook.pagination.pageSize,
      totalCount: baseHook.pagination.totalItems,
      totalPages: baseHook.pagination.totalPages
    },
    
    // Métodos do hook base
    fetchData: baseHook.fetchData,
    fetchSummaryData: baseHook.fetchSummaryData,
    
    // Métodos específicos
    createLocal,
    updateLocal,
    deleteItem: baseHook.deleteItem,
    getLocal,
    buscarPorId,
    listar,
    
    // Aliases para compatibilidade
    locais: baseHook.data,
    fetchLocais: baseHook.fetchData,
    deleteLocal: baseHook.deleteItem,
  };
};
