import { api } from '@/lib/api';
import { useCallback, useState } from 'react';

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
      
      // Preparar parâmetros para o backend
      const apiParams: any = {};
      
      // Parâmetros de paginação
      if (params.page) apiParams.page = params.page;
      if (params.limit) apiParams.limit = params.limit;
      if (params.sort) apiParams.sort = params.sort;
      
      // Parâmetro de busca - enviar na propriedade filter
      if (params.filter) {
        apiParams.filter = params.filter;
      }
      
      // Filtros adicionais - também enviar na propriedade filter como objeto
      const additionalFilters: any = {};
      Object.entries(params).forEach(([key, value]) => {
        if (!['page', 'limit', 'sort', 'filter'].includes(key) && value) {
          if (Array.isArray(value)) {
            additionalFilters[key] = value.join(',');
          } else {
            additionalFilters[key] = String(value);
          }
        }
      });
      
      // Se há filtros adicionais, adicionar ao filter
      if (Object.keys(additionalFilters).length > 0) {
        if (apiParams.filter) {
          // Se já existe filter, combinar
          const existingFilter = typeof apiParams.filter === 'string' 
            ? { search: apiParams.filter }
            : apiParams.filter;
          apiParams.filter = { ...existingFilter, ...additionalFilters };
        } else {
          apiParams.filter = additionalFilters;
        }
      }
      
      // Serializar objetos para evitar [object Object] na query string
      Object.entries(apiParams).forEach(([key, value]) => {
        if (typeof value === 'object' && value !== null) {
          apiParams[key] = JSON.stringify(value);
        }
      });
      
      console.log('🔍 API Request:', {
        endpoint,
        params: apiParams
      });
      
      const response = await api.get(endpoint, { params: apiParams });
      const responseData = (response as any).data;
      
      console.log('📦 API Response:', responseData);
      
      // Transformar dados do backend
      const transformedData = options?.transformData 
        ? options.transformData(responseData.data || responseData)
        : (responseData.data || responseData);
      
      // Transformar paginação do backend
      const transformedPagination = options?.transformPagination
        ? options.transformPagination(responseData.pagination || responseData)
        : (responseData.pagination || {
            currentPage: params.page || 1,
            totalPages: 1,
            totalItems: transformedData.length,
            pageSize: params.limit || 10,
            startIndex: 1,
            endIndex: transformedData.length,
            hasNextPage: false,
            hasPreviousPage: false,
          });
      
      setData(transformedData);
      setPagination(transformedPagination);
    } catch (error) {
      console.error('❌ Erro ao buscar dados do backend:', error);
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
    } catch (error) {
      console.error('Erro ao excluir item:', error);
      throw error;
    }
  }, [endpoint, fetchData, pagination.currentPage, pagination.pageSize]);

  const createItem = useCallback(async (itemData: Partial<T>): Promise<T> => {
    try {
      const response = await api.post(endpoint, itemData);
      return ((response as any).data);
    } catch (error) {
      console.error('Erro ao criar item:', error);
      throw error;
    }
  }, [endpoint]);

  const updateItem = useCallback(async (id: string | number, itemData: Partial<T>): Promise<T> => {
    try {
      const response = await api.put(`${endpoint}/${id}`, itemData);
      return ((response as any).data);
    } catch (error) {
      console.error('Erro ao atualizar item:', error);
      throw error;
    }
  }, [endpoint]);

  const getItem = useCallback(async (id: string | number): Promise<T> => {
    try {
      const response = await api.get(`${endpoint}/${id}`);
      return ((response as any).data);
    } catch (error) {
      console.error('Erro ao buscar item:', error);
      throw error;
    }
  }, [endpoint]);

  return {
    data,
    loading,
    pagination,
    fetchData,
    deleteItem,
    createItem,
    updateItem,
    getItem,
  };
} 