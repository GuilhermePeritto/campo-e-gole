
import { useEffect } from 'react';
import { toast } from 'sonner';
import { api, ApiResponse } from '../lib/api';
import { Recebivel } from '../types/reservas';
import { useBaseCrud } from './useBaseCrud';

export const useRecebiveis = (filtros?: {
  pageNumber?: number;
  pageSize?: number;
  search?: string;
  situacao?: string;
  dataInicio?: string;
  dataFim?: string;
  ordenarPor?: string;
  direcao?: 'asc' | 'desc';
}) => {
  const baseHook = useBaseCrud<Recebivel>('/recebiveis', {
    transformData: (data) => data,
    transformPagination: (pagination) => pagination
  });



  // Método específico para buscar recebíveis com filtros customizados
  const fetchRecebiveis = async (params: any = filtros) => {
    const apiParams: any = {
      page: params?.pageNumber || params?.page || 1,
      limit: params?.pageSize || params?.limit || 10,
      sort: params?.ordenarPor || params?.sort || 'dataVencimento'
    };
    
    // Tratar filtros
    const filtrosAvancados: any = {};
    
    if (params?.search) {
      apiParams.filter = params.search;
    }
    
    if (params?.situacao) {
      filtrosAvancados.situacao = params.situacao;
    }
    
    if (params?.dataInicio) {
      filtrosAvancados.dataInicio = params.dataInicio;
    }
    
    if (params?.dataFim) {
      filtrosAvancados.dataFim = params.dataFim;
    }
    
    // Se tem filtros avançados, combinar com filtro de busca
    if (Object.keys(filtrosAvancados).length > 0) {
      if (apiParams.filter) {
        apiParams.filter = JSON.stringify({
          search: apiParams.filter,
          ...filtrosAvancados
        });
      } else {
        apiParams.filter = JSON.stringify(filtrosAvancados);
      }
    }
    
    await baseHook.fetchData(apiParams);
  };

  // Carregar dados quando filtros mudarem
  useEffect(() => {
    if (filtros) {
      fetchRecebiveis(filtros);
    }
  }, [filtros]);

  // Métodos específicos que não existem no useBaseCrud
  const createRecebivel = async (recebivelData: Omit<Recebivel, 'id' | 'dataCadastro'>) => {
    try {
      const loadingToast = toast.loading('Criando recebível...');
      
      const response = await api.post<ApiResponse<Recebivel>>('/recebiveis', recebivelData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Recebível criado com sucesso!');
        // Recarregar a lista
        await baseHook.fetchData({ 
          page: baseHook.pagination.currentPage, 
          limit: baseHook.pagination.pageSize 
        });
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao criar recebível');
        throw new Error(response.message || 'Erro ao criar recebível');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar recebível';
      toast.error(errorMessage);
      throw error;
    }
  };

  const updateRecebivel = async (id: string, recebivelData: Partial<Recebivel>) => {
    try {
      const loadingToast = toast.loading('Atualizando recebível...');
      
      const response = await api.put<ApiResponse<Recebivel>>(`/recebiveis/${id}`, recebivelData);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Recebível atualizado com sucesso!');
        // Recarregar a lista
        await baseHook.fetchData({ 
          page: baseHook.pagination.currentPage, 
          limit: baseHook.pagination.pageSize 
        });
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao atualizar recebível');
        throw new Error(response.message || 'Erro ao atualizar recebível');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar recebível';
      toast.error(errorMessage);
      throw error;
    }
  };

  const getRecebivel = async (id: string) => {
    try {
      const response = await api.get<ApiResponse<Recebivel>>(`/recebiveis/${id}`);
      
      if (response.success && response.data) {
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao carregar recebível');
        throw new Error(response.message || 'Erro ao carregar recebível');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar recebível';
      toast.error(errorMessage);
      throw error;
    }
  };

  const receberPagamento = async (id: string, dadosPagamento: {
    valorRecebido: number;
    dataRecebimento: string;
    formaPagamento: string;
    observacoes?: string;
  }) => {
    try {
      const loadingToast = toast.loading('Registrando pagamento...');
      
      const response = await api.post<ApiResponse<Recebivel>>(`/recebiveis/${id}/receber`, dadosPagamento);
      
      toast.dismiss(loadingToast);

      if (response.success && response.data) {
        toast.success('Pagamento registrado com sucesso!');
        // Recarregar a lista
        await baseHook.fetchData({ 
          page: baseHook.pagination.currentPage, 
          limit: baseHook.pagination.pageSize 
        });
        return response.data;
      } else {
        toast.error(response.message || 'Erro ao registrar pagamento');
        throw new Error(response.message || 'Erro ao registrar pagamento');
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao registrar pagamento';
      toast.error(errorMessage);
      throw error;
    }
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
    fetchData: fetchRecebiveis,
    fetchSummaryData: baseHook.fetchSummaryData,
    
    // Métodos específicos
    createRecebivel,
    updateRecebivel,
    deleteItem: baseHook.deleteItem,
    getRecebivel,
    receberPagamento,
    
    // Aliases para compatibilidade
    recebiveis: baseHook.data,
    fetchRecebiveis,
    deleteRecebivel: baseHook.deleteItem,
  };
};
