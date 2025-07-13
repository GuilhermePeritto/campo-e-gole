import { api } from '@/lib/api';
import { useCallback, useState } from 'react';
import { toast } from 'sonner';

export interface BaseCrudHook<T> {
  data: T[];
  loading: boolean;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    pageSize: number;
    startIndex: number;
    endIndex: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
  fetchData: (params: any) => Promise<void>;
  fetchSummaryData: (params: any) => Promise<void>;
  deleteItem: (id: string | number) => Promise<void>;
  createItem?: (data: Partial<T>) => Promise<T>;
  updateItem?: (id: string | number, data: Partial<T>) => Promise<T>;
  getItem?: (id: string | number) => Promise<T>;
}

export function useBaseCrud<T>(
  endpoint: string,
  options?: {
    transformData?: (data: any) => T[];
    transformPagination?: (pagination: any) => any;
  }
): BaseCrudHook<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    pageSize: 10,
    startIndex: 1,
    endIndex: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const fetchData = useCallback(async (params: any) => {
    try {
      setLoading(true);
      
      // Preparar parâmetros para o backend conforme especificação
      const apiParams: Record<string, any> = {};
      
      // Parâmetros básicos de paginação (sempre enviar)
      apiParams.page = params.page || 1;
      apiParams.limit = params.limit || 10;
      
      // Parâmetro de ordenação
      if (params.sort && params.sort !== 'id') {
        apiParams.sort = params.sort;
      }
      
      // Parâmetro de campos específicos
      if (params.fields) {
        apiParams.fields = params.fields;
      }
      
      // Parâmetro de filtro - enviar como string simples
      if (params.filter) {
        // Se for objeto, extrair o valor de busca
        if (typeof params.filter === 'object' && params.filter !== null) {
          // Se tem search, usar como filtro principal
          if (params.filter.search && params.filter.search.trim()) {
            apiParams.filter = params.filter.search.trim();
          }
          // Para outros filtros, adicionar como parâmetros separados
          Object.entries(params.filter).forEach(([key, value]) => {
            if (key !== 'search' && value && (Array.isArray(value) ? value.length > 0 : true)) {
              if (Array.isArray(value)) {
                apiParams[key] = value.join(',');
              } else {
                apiParams[key] = value;
              }
            }
          });
        } else if (typeof params.filter === 'string' && params.filter.trim()) {
          // Se for string, usar diretamente
          apiParams.filter = params.filter.trim();
        }
      }
      
      // Remover parâmetros vazios
      Object.keys(apiParams).forEach(key => {
        if (apiParams[key] === undefined || apiParams[key] === null || apiParams[key] === '') {
          delete apiParams[key];
        }
      });
      
      console.log('🔍 API Request:', {
        endpoint,
        params: apiParams,
        originalParams: params,
        url: `${endpoint}?${new URLSearchParams(apiParams).toString()}`
      });
      
      const response = await api.get(endpoint, apiParams);
      const responseData = response as any;
      
      console.log('📦 API Response:', responseData);
      
      // Transformar dados do backend
      const transformedData = options?.transformData 
        ? options.transformData(responseData.data || responseData)
        : (responseData.data || responseData);
      
      // Transformar paginação do backend
      const transformedPagination = {
        currentPage: responseData.pageNumber || 1,
        totalPages: responseData.totalPages || 1,
        totalItems: responseData.totalCount || 0,
        pageSize: responseData.pageSize || 10,
        startIndex: ((responseData.pageNumber || 1) - 1) * (responseData.pageSize || 10) + 1,
        endIndex: Math.min((responseData.pageNumber || 1) * (responseData.pageSize || 10), responseData.totalCount || 0),
        hasNextPage: (responseData.pageNumber || 1) < (responseData.totalPages || 1),
        hasPreviousPage: (responseData.pageNumber || 1) > 1,
      };
      
      setData(transformedData);
      setPagination(transformedPagination);
    } catch (error: any) {
      console.error('❌ Erro ao buscar dados do backend:', error);
      
      // Verificar se é um erro de timeout ou conexão
      const isTimeoutOrNetworkError = error?.message?.includes('Tempo limite') || 
                                     error?.message?.includes('Erro de conexão') ||
                                     error?.message?.includes('timeout') ||
                                     error?.message?.includes('network');
      
      if (isTimeoutOrNetworkError) {
        // Mostrar toast com botão de retry para timeouts e erros de rede
        toast.error(error.message || 'Erro de conexão', {
          duration: 8000,
          action: {
            label: 'Tentar Novamente',
            onClick: () => fetchData(params),
          },
        });
      } else {
        // Para outros erros, mostrar toast normal
        toast.error(error.message || 'Erro ao carregar dados', {
          duration: 5000,
        });
      }
      
      // Em caso de erro, deixar dados vazios - SEM fallback para mock
      setData([]);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        pageSize: 10,
        startIndex: 1,
        endIndex: 0,
        hasNextPage: false,
        hasPreviousPage: false,
      });
    } finally {
      setLoading(false);
    }
  }, [endpoint, options?.transformData, options?.transformPagination]);

  const deleteItem = useCallback(async (id: string | number) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      // Recarregar dados após exclusão usando os parâmetros atuais
      await fetchData({ 
        page: pagination.currentPage, 
        limit: pagination.pageSize
      });
    } catch (error: any) {
      console.error('Erro ao excluir item:', error);
      
      // Verificar se é um erro de timeout ou conexão
      const isTimeoutOrNetworkError = error?.message?.includes('Tempo limite') || 
                                     error?.message?.includes('Erro de conexão');
      
      if (isTimeoutOrNetworkError) {
        toast.error(error.message || 'Erro de conexão ao excluir', {
          duration: 8000,
          action: {
            label: 'Tentar Novamente',
            onClick: () => deleteItem(id),
          },
        });
      } else {
        toast.error(error.message || 'Erro ao excluir item', {
          duration: 5000,
        });
      }
      
      throw error;
    }
  }, [endpoint, fetchData, pagination.currentPage, pagination.pageSize]);

  const createItem = useCallback(async (itemData: Partial<T>): Promise<T> => {
    try {
      const response = await api.post(endpoint, itemData);
      return ((response as any).data);
    } catch (error: any) {
      console.error('Erro ao criar item:', error);
      
      // Verificar se é um erro de timeout ou conexão
      const isTimeoutOrNetworkError = error?.message?.includes('Tempo limite') || 
                                     error?.message?.includes('Erro de conexão');
      
      if (isTimeoutOrNetworkError) {
        toast.error(error.message || 'Erro de conexão ao criar', {
          duration: 8000,
          action: {
            label: 'Tentar Novamente',
            onClick: () => createItem(itemData),
          },
        });
      } else {
        toast.error(error.message || 'Erro ao criar item', {
          duration: 5000,
        });
      }
      
      throw error;
    }
  }, [endpoint]);

  const updateItem = useCallback(async (id: string | number, itemData: Partial<T>): Promise<T> => {
    try {
      const response = await api.put(`${endpoint}/${id}`, itemData);
      return ((response as any).data);
    } catch (error: any) {
      console.error('Erro ao atualizar item:', error);
      
      // Verificar se é um erro de timeout ou conexão
      const isTimeoutOrNetworkError = error?.message?.includes('Tempo limite') || 
                                     error?.message?.includes('Erro de conexão');
      
      if (isTimeoutOrNetworkError) {
        toast.error(error.message || 'Erro de conexão ao atualizar', {
          duration: 8000,
          action: {
            label: 'Tentar Novamente',
            onClick: () => updateItem(id, itemData),
          },
        });
      } else {
        toast.error(error.message || 'Erro ao atualizar item', {
          duration: 5000,
        });
      }
      
      throw error;
    }
  }, [endpoint]);

  const getItem = useCallback(async (id: string | number): Promise<T> => {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return ((response as any).data);
    } catch (error: any) {
      console.error('Erro ao buscar item:', error);
      
      // Verificar se é um erro de timeout ou conexão
      const isTimeoutOrNetworkError = error?.message?.includes('Tempo limite') || 
                                     error?.message?.includes('Erro de conexão');
      
      if (isTimeoutOrNetworkError) {
        toast.error(error.message || 'Erro de conexão ao buscar', {
          duration: 8000,
          action: {
            label: 'Tentar Novamente',
            onClick: () => getItem(id),
          },
        });
      } else {
        toast.error(error.message || 'Erro ao buscar item', {
          duration: 5000,
        });
      }
      
      throw error;
    }
  }, [endpoint]);

  const fetchSummaryData = useCallback(async (params: any) => {
    try {
      console.log('🔍 API Request (Resumo):', { endpoint: `${endpoint}/resumo`, params });
      const response = await api.get(`${endpoint}/resumo`, params);
      console.log('✅ API Response (Resumo):', response);
      return ((response as any).data);
    } catch (error: any) {
      console.error('❌ API Error (Resumo):', error);
      toast.error(error.message || 'Erro ao buscar dados do resumo', {
        duration: 5000,
      });
      throw error;
    }
  }, [endpoint]);

  return {
    data,
    loading,
    pagination,
    fetchData,
    fetchSummaryData,
    deleteItem,
    createItem,
    updateItem,
    getItem,
  };
} 
